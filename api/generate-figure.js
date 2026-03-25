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
    '请基于输入照片，对主体做高质量水彩风重绘。',
    '如果输入是人物：保留原照片中的发色、发型趋势、刘海感觉、眼镜、帽子、脸部朝向、穿搭轮廓、上衣颜色、下装颜色、包或配饰。',
    '整体尽量贴近原照片，只做温和水彩化，不要大改人物，不要换人，不要明显重设计。',
    '如果脸和发型清晰，请尽量保留脸型、五官关系、神态、发际线、刘海、发型轮廓和发色，不要改脸，不要换发型。',
    '不要新增原图里没有的发型、帽子、眼镜、耳饰、项链、包等配饰，只能保留和轻微整理原有元素。',
    '衣服和身材可以轻微美化，但必须自然克制，不能夸张，不能漫画化。',
    '保持输入照片的大致构图和取景范围，不要强行补齐未拍到的身体部分。',
    '如果衣服是黑色、深灰、藏蓝等深色，必须保持深色，不要洗成白色、米色或浅灰。',
    '如果额前发型不明显，请自然补成好看的八字刘海或轻碎发，但不要夸张。',
    '整体画风：白底留白很多、干净、高级、轻盈、松弛、精致的时尚水彩插画，不要Q版，不要扁平矢量，不要廉价卡通，不要幼儿园简笔画。',
    '画面只保留单个主体，背景纯白，不要桌子，不要墙面，不要环境，不要复杂场景，不要文字，不要水印，不要边框。',
  ].join(' ');
}

function buildAnimalEditPrompt() {
  return [
    '请基于输入照片，对主体做高质量水彩风重绘。',
    '如果输入是动物：保留物种、主色、花纹、绒感和身体比例，输出成毛茸茸、带细线稿感、带少量飞墨与晕染的精致水彩动物插画。',
    '整体尽量贴近原照片，只做温和水彩化，不要大改物种特征和颜色。',
    '保持输入照片的大致构图和取景范围，不要强行补齐未拍到的身体部分。',
    '不要复刻原照片的真实背景，不要写实照片感，不要做动物写真。',
    '画面只保留单个主体，背景纯白，不要环境，不要文字，不要水印，不要边框。',
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
    '新增帽子',
    '新增眼镜',
    '新增耳饰',
    '新增项链',
    '新增包',
    '整容感',
    '过度美颜',
    '改脸',
    '换脸',
    '换发型',
    '改变刘海',
    '改变发际线',
    '换衣服',
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
