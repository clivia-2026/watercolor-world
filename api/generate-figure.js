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
    '请不要复刻原照片，不要做写实临摹，不要做高保真头像。',
    '请只提取输入照片中的基础元素，再重新设计成一张白底、无背景、全身的水彩人物角色图。',
    '如果输入是人物：只保留基础元素，发色，发型大方向，是否戴眼镜或帽子，上衣主色，下装主色，鞋子大致颜色，包或主要配饰，整体穿搭气质。',
    '不要保留过细的人脸细节，不要还原真实皮肤纹理，不要还原照片级五官，不要像证件照或写真。',
    '人物必须是全身，完整站立在画面中，脚必须出现，不能裁掉腿脚，不能只生成头像或半身。',
    '人物比例要自然偏时尚插画，不要Q版，不要夸张大头，不要儿童贴纸风。',
    '如果衣服是黑色、深灰、藏蓝等深色，必须保持深色，不要洗成白色、米色或浅灰。',
    '如果额前发型不明显，请默认生成自然好看的八字刘海或轻碎发，但不要夸张。',
    '整体画风：白底留白很多、干净、高级、轻盈、松弛、精致的时尚水彩插画，不要Q版，不要扁平矢量，不要廉价卡通，不要幼儿园简笔画。',
    '画面只保留单个主体，背景纯白，不要复杂场景，不要文字，不要水印。',
  ].join(' ');
}

function buildAnimalEditPrompt() {
  return [
    '请不要复刻原照片，不要照搬原图构图。',
    '请只提取输入动物照片中的基础元素，再重新设计成一张白底、无背景、完整全身的小动物水彩角色图。',
    '只保留这些核心信息：物种，主色，辅助色，花纹，绒感，耳朵形状，尾巴感觉，身体比例。',
    '不要复刻原照片的真实背景，不要写实照片感，不要做动物写真。',
    '动物必须完整全身出现，不能裁掉身体和脚部。',
    '整体画风：白底留白很多，干净，高级，柔软，毛茸茸，带少量细线稿和自然飞墨的精致水彩动物插画。',
    '画面只保留单个主体，背景纯白，不要环境，不要文字，不要水印。',
  ].join(' ');
}

function buildHumanNegativePrompt() {
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
    '头像特写',
    '半身像',
    '大脸近景',
    '证件照构图',
    '写真',
    '照片感',
    '写实人像',
    '人物特写',
    '裁切脚部',
    '看不到鞋子',
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

function buildAnimalNegativePrompt() {
  return [
    '人类',
    '人脸',
    '人类身体',
    '人物',
    '时装人物',
    '人像写真',
    '拟人',
    '兽人',
    '穿衣服的动物',
    '人类站姿',
    '人类手臂',
    'Q版',
    '廉价卡通',
    '复杂背景',
    '文字',
    '水印',
    '边框',
    '多人',
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
        model: 'Qwen/Qwen-Image-Edit-2509',
        prompt,
        negative_prompt: negativePrompt,
        image: `data:${mediaType};base64,${imageBase64}`,
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
      source: 'Qwen/Qwen-Image-Edit-2509',
      subjectType: normalizedType,
      seed,
    });
  } catch (err) {
    console.error('Handler error:', err);
    return res.status(500).json({ error: err.message || 'Unknown server error' });
  }
}
