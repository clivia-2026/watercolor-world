const SILICONFLOW_IMAGE_URL = 'https://api.siliconflow.cn/v1/images/generations';

function buildEditPrompt() {
  return [
    '请基于输入照片，对主体做高质量水彩风重绘。',
    '如果输入是人物：保留原照片中的发色、发型趋势、刘海感觉、眼镜、帽子、脸部朝向、穿搭轮廓、上衣颜色、下装颜色、包或配饰。',
    '如果衣服是黑色、深灰、藏蓝等深色，必须保持深色，不要洗成白色、米色或浅灰。',
    '如果额前发型不明显，请自然补成好看的八字刘海或轻碎发，但不要夸张。',
    '整体画风：白底留白很多、干净、高级、轻盈、松弛、精致的时尚水彩插画，不要Q版，不要扁平矢量，不要廉价卡通，不要幼儿园简笔画。',
    '如果输入是动物：保留物种、主色、花纹、绒感和身体比例，输出成毛茸茸、带细线稿感、带少量飞墨与晕染的精致水彩动物插画。',
    '画面只保留单个主体，背景纯白简洁，不要复杂场景，不要文字，不要水印，不要边框。',
    '面部可以适度简化，但整体必须自然耐看，不能变成儿童贴纸风。',
  ].join(' ');
}

function buildNegativePrompt() {
  return [
    'Q版',
    '大头娃娃',
    '儿童贴纸',
    '幼儿园简笔画',
    '扁平矢量',
    '火柴人',
    '廉价卡通',
    '僵硬四肢',
    '塑料玩具感',
    '3D玩偶',
    '错误手指',
    '多余肢体',
    '畸形脸',
    '文字',
    '水印',
    '边框',
    '多人',
    '复杂背景',
  ].join(', ');
}

function getImageUrlFromPayload(payload) {
  if (Array.isArray(payload?.images)) {
    for (const item of payload.images) {
      if (item?.url) return item.url;
      if (item?.image_url) return item.image_url;
    }
  }
  if (Array.isArray(payload?.data)) {
    for (const item of payload.data) {
      if (item?.url) return item.url;
      if (item?.image_url) return item.image_url;
      if (item?.b64_json) return `data:image/png;base64,${item.b64_json}`;
    }
  }
  return null;
}

async function fetchImageAsDataUrl(url) {
  if (url.startsWith('data:image/')) {
    const mimeMatch = url.match(/^data:([^;]+);base64,/);
    return {
      imageDataUrl: url,
      imageMimeType: mimeMatch?.[1] || 'image/png',
    };
  }

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
    if (!process.env.SILICONFLOW_API_KEY) {
      return res.status(500).json({ error: 'Missing SILICONFLOW_API_KEY' });
    }

    const prompt = buildEditPrompt();
    const negativePrompt = buildNegativePrompt();

    const apiRes = await fetch(SILICONFLOW_IMAGE_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.SILICONFLOW_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'Qwen/Qwen-Image-Edit-2509',
        prompt,
        negative_prompt: negativePrompt,
        image: `data:${mediaType};base64,${imageBase64}`,
      }),
    });

    const payload = await apiRes.json().catch(() => null);
    if (!apiRes.ok) {
      console.error('SiliconFlow HTTP error:', apiRes.status, payload);
      return res.status(500).json({
        error: payload?.message || payload?.error?.message || payload?.code || `SiliconFlow error (${apiRes.status})`,
      });
    }

    const imageUrl = getImageUrlFromPayload(payload);
    if (!imageUrl) {
      console.error('SiliconFlow missing image url:', JSON.stringify(payload));
      return res.status(500).json({ error: 'SiliconFlow returned no image url' });
    }

    let image = null;
    try {
      image = await fetchImageAsDataUrl(imageUrl);
    } catch (err) {
      console.error('Generated image relay failed, falling back to url:', err);
    }

    return res.json({
      imageDataUrl: image?.imageDataUrl || null,
      imageMimeType: image?.imageMimeType || null,
      imageUrl: imageUrl.startsWith('data:image/') ? null : imageUrl,
      source: 'Qwen/Qwen-Image-Edit-2509',
    });
  } catch (err) {
    console.error('Handler error:', err);
    return res.status(500).json({ error: err.message || 'Unknown server error' });
  }
}
