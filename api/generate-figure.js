const GEMINI_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';
const DASHSCOPE_IMAGE_URL = 'https://dashscope.aliyuncs.com/api/v1/services/aigc/text2image/image-synthesis';

const ANALYSIS_RESPONSE_SCHEMA = {
  type: 'object',
  required: ['subjectType', 'animalType', 'pose', 'features', 'mustKeep', 'palette'],
  properties: {
    subjectType: { type: 'string' },
    animalType: { type: 'string' },
    pose: { type: 'string' },
    features: { type: 'array', items: { type: 'string' } },
    mustKeep: { type: 'array', items: { type: 'string' } },
    palette: { type: 'array', items: { type: 'string' } },
    composition: { type: 'string' },
  },
};

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function extractGeminiText(data) {
  return data?.candidates?.[0]?.content?.parts?.map((part) => part.text || '').join('').trim() || '';
}

function parseJsonLoose(raw) {
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    const match = raw.match(/\{[\s\S]*\}/);
    if (!match) return null;
    try {
      return JSON.parse(match[0]);
    } catch {
      return null;
    }
  }
}

function sanitizeList(value, limit = 8) {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => String(item || '').trim())
    .filter(Boolean)
    .slice(0, limit);
}

function normalizeAnalysis(analysis = {}) {
  const subjectType = analysis.subjectType === 'animal' ? 'animal' : 'human';
  return {
    subjectType,
    animalType: String(analysis.animalType || '').trim().toLowerCase() || 'other',
    pose: String(analysis.pose || '').trim() || (subjectType === 'animal' ? 'full body' : 'standing'),
    features: sanitizeList(analysis.features),
    mustKeep: sanitizeList(analysis.mustKeep),
    palette: sanitizeList(analysis.palette, 6),
    composition: String(analysis.composition || '').trim() || 'single subject, clean white background',
  };
}

async function analyzeImageWithGemini(imageBase64, mediaType, apiKey) {
  const analysisPrompt = `Analyze the uploaded image for a fixed watercolor-generation pipeline.

Return ONLY a JSON object matching the provided schema.

What to extract:
- subjectType: "human" or "animal"
- animalType: cat | dog | rabbit | bird | fox | other
- pose: concise phrase like "standing full body", "walking full body", "seated", "close-up portrait"
- features: 4 to 8 concise Chinese phrases describing visible traits
- mustKeep: 3 to 6 concise Chinese phrases describing traits that should not be lost
- palette: 3 to 6 concise Chinese color phrases
- composition: short phrase describing framing

Rules:
- Be faithful to clothing colors. If clothes are black, charcoal, navy, or very dark, keep them dark.
- For humans, prioritize hair, bangs/fringe, glasses, hat, outerwear, bag, clothing silhouette, and overall vibe.
- For animals, prioritize species, fur or feather colors, fluffiness, markings, ear shape, tail feel, and body proportions.
- Keep phrases short and concrete.
- No markdown. No prose. No code fences. JSON only.`;

  const response = await fetch(GEMINI_URL, {
    method: 'POST',
    headers: {
      'x-goog-api-key': apiKey,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contents: [{
        role: 'user',
        parts: [
          { text: analysisPrompt },
          { inline_data: { mime_type: mediaType, data: imageBase64 } },
        ],
      }],
      generationConfig: {
        temperature: 0.2,
        maxOutputTokens: 900,
        responseMimeType: 'application/json',
        responseJsonSchema: ANALYSIS_RESPONSE_SCHEMA,
      },
    }),
  });

  if (!response.ok) {
    const errText = await response.text();
    console.error('Gemini HTTP error:', response.status, errText);
    throw new Error(`Gemini API error (${response.status})`);
  }

  const data = await response.json();
  if (data.error || data.promptFeedback?.blockReason) {
    console.error('Gemini error:', JSON.stringify(data.error || data.promptFeedback));
    throw new Error(data.error?.message || data.promptFeedback?.blockReason || 'Gemini rejected the request');
  }

  const raw = extractGeminiText(data);
  console.log('Gemini analysis:', raw.slice(0, 600));
  return normalizeAnalysis(parseJsonLoose(raw) || {});
}

function joinTraits(items, fallback) {
  return items.length ? items.join('，') : fallback;
}

function buildGenerationPrompt(analysis) {
  const featureText = joinTraits(analysis.features, analysis.subjectType === 'animal' ? '毛茸茸、颜色准确、单只小动物' : '发型自然、衣着准确、单人');
  const keepText = joinTraits(analysis.mustKeep, analysis.subjectType === 'animal' ? '保留物种特征和主色' : '保留发色、衣服颜色和主要配饰');
  const paletteText = joinTraits(analysis.palette, analysis.subjectType === 'animal' ? '柔和暖色' : '克制中性色');

  if (analysis.subjectType === 'animal') {
    return [
      '基于参考照片，生成一张单只动物的精致水彩插画。',
      '白底留白，主体完整，边缘带柔软毛感和细碎线稿，带少量自然飞墨与水彩晕染。',
      '不要做成儿童贴纸或扁平卡通，要像手绘水彩小动物。',
      `动物类型与姿态：${analysis.animalType}，${analysis.pose}。`,
      `可见特征：${featureText}。`,
      `必须保留：${keepText}。`,
      `整体配色：${paletteText}。`,
      '单主体，画面干净，背景不要复杂场景，不要文字水印。',
    ].join(' ');
  }

  return [
    '基于参考照片，生成一张单人的高级水彩时尚插画。',
    '白底大量留白，人物完整入画，成人自然比例，轻盈通透，像时装水彩插画，不要Q版，不要幼儿园卡通，不要扁平矢量。',
    '保留照片中的人物身份感觉和穿搭信息，但整体转成松弛、干净、克制的水彩笔触。',
    '面部可以简化，但必须精致自然，头发要柔和流动；如果额前造型不明显，默认使用自然好看的八字刘海或额前碎发处理。',
    `人物姿态与构图：${analysis.pose}，${analysis.composition}。`,
    `可见特征：${featureText}。`,
    `必须保留：${keepText}。`,
    `整体配色：${paletteText}。`,
    '衣服颜色要忠于原图，深色上衣或深色裤子不能洗成白色或米色。不要复杂背景，不要文字水印。',
  ].join(' ');
}

function buildNegativePrompt(subjectType) {
  const shared = [
    'Q版',
    '大头娃娃',
    '儿童贴纸',
    '幼儿园简笔画',
    '扁平矢量',
    '火柴人',
    '廉价卡通',
    '表情包',
    '多余手指',
    '多余肢体',
    '畸形手',
    '畸形脸',
    '文字',
    '水印',
    '边框',
    '多人',
    '复杂背景',
  ];

  if (subjectType === 'animal') {
    return shared.concat([
      '塑料玩具感',
      '贴纸描边',
      '3D玩偶',
      '低幼图标',
    ]).join(', ');
  }

  return shared.concat([
    '儿童插画比例',
    '夸张五官',
    '卡通校服',
    '僵硬四肢',
    '几何色块衣服',
    '廉价头像',
  ]).join(', ');
}

async function createWanxTask({ prompt, negativePrompt, imageBase64, mediaType, apiKey }) {
  const response = await fetch(DASHSCOPE_IMAGE_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'X-DashScope-Async': 'enable',
    },
    body: JSON.stringify({
      model: 'wanx-v1',
      input: {
        prompt,
        negative_prompt: negativePrompt,
        ref_img: `data:${mediaType};base64,${imageBase64}`,
      },
      parameters: {
        style: '<watercolor>',
        size: '1024*1024',
        n: 1,
        ref_mode: 'repaint',
        ref_strength: 0.78,
        seed: Math.floor(Math.random() * 1000000000),
      },
    }),
  });

  const payload = await response.json().catch(() => null);
  if (!response.ok) {
    console.error('Wanx create task error:', response.status, payload);
    throw new Error(payload?.message || `Wanx API error (${response.status})`);
  }

  const taskId = payload?.output?.task_id;
  if (!taskId) {
    console.error('Wanx create task missing task_id:', payload);
    throw new Error('Wanx did not return task_id');
  }
  return taskId;
}

function getWanxResultUrl(payload) {
  const output = payload?.output || {};
  if (Array.isArray(output.results)) {
    for (const item of output.results) {
      if (item?.url) return item.url;
      if (item?.image_url) return item.image_url;
    }
  }
  if (output.result_url) return output.result_url;
  if (output.url) return output.url;
  return null;
}

async function waitForWanxResult(taskId, apiKey) {
  const deadline = Date.now() + 50000;
  let lastPayload = null;

  while (Date.now() < deadline) {
    await sleep(2500);
    const response = await fetch(`https://dashscope.aliyuncs.com/api/v1/tasks/${taskId}`, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    });
    const payload = await response.json().catch(() => null);
    lastPayload = payload;

    if (!response.ok) {
      console.error('Wanx task poll error:', response.status, payload);
      throw new Error(payload?.message || `Wanx task poll failed (${response.status})`);
    }

    const status = payload?.output?.task_status;
    if (status === 'SUCCEEDED') {
      const url = getWanxResultUrl(payload);
      if (!url) {
        console.error('Wanx success without result url:', payload);
        throw new Error('Wanx finished without image url');
      }
      return { url, payload };
    }

    if (status === 'FAILED' || status === 'CANCELED' || status === 'UNKNOWN') {
      console.error('Wanx task failed:', payload);
      throw new Error(payload?.output?.message || payload?.message || `Wanx task ${status}`);
    }
  }

  console.error('Wanx task timed out:', taskId, lastPayload);
  throw new Error('Wanx generation timed out');
}

async function fetchImageAsDataUrl(url) {
  const response = await fetch(url);
  if (!response.ok) {
    const text = await response.text().catch(() => '');
    console.error('Result image fetch failed:', response.status, text);
    throw new Error(`Generated image fetch failed (${response.status})`);
  }

  const contentType = response.headers.get('content-type') || 'image/png';
  const buffer = Buffer.from(await response.arrayBuffer());
  return {
    imageDataUrl: `data:${contentType};base64,${buffer.toString('base64')}`,
    imageMimeType: contentType,
  };
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { imageBase64, mediaType } = req.body || {};
    if (!imageBase64 || !mediaType) {
      return res.status(400).json({ error: 'Missing image data' });
    }
    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ error: 'Missing GEMINI_API_KEY' });
    }
    if (!process.env.DASHSCOPE_API_KEY) {
      return res.status(500).json({ error: 'Missing DASHSCOPE_API_KEY' });
    }

    const analysis = await analyzeImageWithGemini(imageBase64, mediaType, process.env.GEMINI_API_KEY);
    const prompt = buildGenerationPrompt(analysis);
    const negativePrompt = buildNegativePrompt(analysis.subjectType);

    console.log('Generation analysis:', JSON.stringify(analysis));
    console.log('Generation prompt:', prompt);

    const taskId = await createWanxTask({
      prompt,
      negativePrompt,
      imageBase64,
      mediaType,
      apiKey: process.env.DASHSCOPE_API_KEY,
    });

    const { url } = await waitForWanxResult(taskId, process.env.DASHSCOPE_API_KEY);
    const image = await fetchImageAsDataUrl(url);

    return res.json({
      imageDataUrl: image.imageDataUrl,
      imageMimeType: image.imageMimeType,
      source: 'wanx-v1',
      taskId,
      subjectType: analysis.subjectType,
      analysis,
    });
  } catch (err) {
    console.error('Handler error:', err);
    return res.status(500).json({ error: err.message || 'Unknown server error' });
  }
}
