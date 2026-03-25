const SILICONFLOW_IMAGE_URL = 'https://api.siliconflow.cn/v1/images/generations';

function hashString(str = '') {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function buildHumanEditPrompt() {
  return [
    '请基于输入的人物照片，生成一张接近原图抠图效果的仿真水彩人物图。',
    '要求贴近原照片，只做温和水彩化，不要明显改脸，不要明显改发型，不要换衣服，不要夸张美化，不要重设计。',
    '尽量保留原照片中的脸型、五官关系、神态、发型、发色、眼镜、帽子、主要配饰、服装颜色和构图范围。',
    '颜色必须贴近原图，尤其是发色、眉毛颜色、服装主色。',
    '人物发色默认只能保持在黑色、深棕色、棕色、深灰黑这类自然深色系；除非原图非常明确就是红、蓝、粉、金、银等彩色或漂染头发，否则绝对不要改成金发、黄发、浅发或任何明显更浅的颜色。',
    '如果原图是半身，就保持半身；如果原图是全身，就保持全身。不要强行补齐未拍到的部分。',
    '画风是仿真水彩画，真实、自然、轻柔，不要Q版，不要漫画化，不要廉价卡通，不要扁平矢量，不要儿童插画。',
    '背景要求纯白、干净、无场景、无文字、无水印，像可直接抠成透明背景的人物图。',
  ].join(' ');
}

function buildAnimalEditPrompt() {
  return [
    '请基于输入的动物照片，生成一张接近原图抠图效果的仿真水彩动物图。',
    '要求贴近原照片，只做温和水彩化，不要明显改物种，不要明显改脸，不要明显改花纹和毛色，不要重设计。',
    '尽量保留原照片中的物种、脸部感觉、眼睛鼻口关系、耳朵形状、尾巴、毛色分布、花纹、绒感和构图范围。',
    '颜色必须贴近原图，不允许擅自把毛色改浅、改黄、改橙、改白，除非原图本来就是这个颜色。',
    '如果原图是半身，就保持半身；如果原图是全身，就保持全身。不要强行补齐未拍到的部分。',
    '画风是仿真水彩画，真实、自然、轻柔，不要拟人，不要卡通化，不要Q版，不要儿童插画。',
    '背景要求纯白、干净、无场景、无文字、无水印，像可直接抠成透明背景的动物图。',
  ].join(' ');
}

function buildHumanNegativePrompt() {
  return [
    'Q版',
    '卡通',
    '漫画',
    '扁平矢量',
    '儿童插画',
    '廉价卡通',
    '拟人化重设计',
    '换脸',
    '改脸',
    '换发型',
    '换衣服',
    '金发',
    '黄发',
    '浅金发',
    '浅棕发',
    '浅色头发',
    '漂白头发',
    '漂染发色',
    '新增帽子',
    '新增眼镜',
    '新增配饰',
    '过度美颜',
    '整容感',
    '文字',
    '水印',
    '边框',
    '复杂背景',
  ].join(', ');
}

function buildAnimalNegativePrompt() {
  return [
    '人类',
    '人脸',
    '人类身体',
    '人物',
    '拟人',
    '兽人',
    '穿衣服的动物',
    '改成黄毛',
    '改成橙毛',
    '改成白毛',
    'Q版',
    '卡通',
    '儿童插画',
    '廉价卡通',
    '改变物种',
    '改变毛色',
    '改变花纹',
    '复杂背景',
    '文字',
    '水印',
    '边框',
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

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { imageBase64, mediaType, subjectType } = req.body || {};
    if (!imageBase64 || !mediaType) {
      return res.status(400).json({ error: 'Missing image data' });
    }
    if (!process.env.SILICONFLOW_API_KEY) {
      return res.status(500).json({ error: 'Missing SILICONFLOW_API_KEY' });
    }

    const normalizedType = subjectType === 'animal' ? 'animal' : 'human';
    const prompt = normalizedType === 'animal' ? buildAnimalEditPrompt() : buildHumanEditPrompt();
    const negativePrompt = normalizedType === 'animal' ? buildAnimalNegativePrompt() : buildHumanNegativePrompt();
    const seed = hashString(`${normalizedType}:${imageBase64.slice(0, 4000)}`) % 2147483647;

    const apiRes = await fetch(SILICONFLOW_IMAGE_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.SILICONFLOW_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'Kwai-Kolors/Kolors',
        prompt,
        negative_prompt: negativePrompt,
        image: `data:${mediaType};base64,${imageBase64}`,
        image_size: '1024x1024',
        batch_size: 1,
        num_inference_steps: 20,
        guidance_scale: 7.5,
        seed,
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

    return res.json({
      imageDataUrl: imageUrl.startsWith('data:image/') ? imageUrl : null,
      imageMimeType: imageUrl.startsWith('data:image/')
        ? (imageUrl.match(/^data:([^;]+);base64,/)?.[1] || 'image/png')
        : null,
      imageUrl: imageUrl.startsWith('data:image/') ? null : imageUrl,
      source: 'Kwai-Kolors/Kolors',
      subjectType: normalizedType,
      seed,
    });
  } catch (err) {
    console.error('Handler error:', err);
    return res.status(500).json({ error: err.message || 'Unknown server error' });
  }
}
