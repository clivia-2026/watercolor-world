const SILICONFLOW_IMAGE_URL = 'https://api.siliconflow.cn/v1/images/generations';
const STYLE_BIBLE = [
  '固定风格要求如下，并且每次输出都必须严格一致：',
  '统一为简单、温柔、干净的手绘动画角色感，不是Q版，不是廉价卡通，不是扁平矢量。',
  '统一为接近真人的自然比例，轮廓略微简化，人物和动物都像来自同一个温暖动画世界。',
  '统一使用轻柔线条、低饱和配色、简单平滑上色、极简纯白背景。',
  '统一保持柔和、自然、亲切，不允许漂成厚涂、照片精修、强写实、儿童插画、夸张二次元或廉价漫画风。',
].join(' ');

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
    STYLE_BIBLE,
    '请基于输入人类照片，对主体做高质量的手绘动画角色化重绘。',
    '整体原则是贴近原照片，只做温和的动画角色化处理，不要大改人物本身，不要换人，不要明显重设计。',
    '执行优先级必须固定：第一优先级是脸和发型高度相似；第二优先级才是补齐全身；第三优先级才是轻微美化身材和衣服。如果三者冲突，必须优先保脸和发型。',
    '最重要的是高度保留原照片中的脸和发型。脸型、五官相对位置、眼睛感觉、鼻子嘴巴关系、年龄感、神态、发际线、刘海、发型轮廓、发色必须非常相似。',
    '保留原照片中的发色、发型趋势、刘海感觉、眼镜、帽子、脸部朝向、上衣颜色、下装颜色和主要配饰。',
    '人物的脸和头发不允许明显改动，不允许换脸，不允许改成另一种发型；只把照片转成更干净柔和的手绘动画角色，不要大幅美颜，不要整容感。',
    '不要新增原图里没有的发型、帽子、眼镜、耳饰、项链、包或其他配饰，只能保留和轻微整理原有元素。',
    '衣服的轮廓、褶皱和版型可以适度整理得更顺一点，身材比例和体态也可以轻微美化，但必须自然，不能夸张，不能漫画化，不能超模比例化。',
    '如果输入本身已经是全身照，也不要1比1机械照抄，要在保持真人感的前提下稍微美化体态和比例，但变化必须克制。',
    '如果输入照片本身是半身、胸像或头肩构图，请自动补齐下半身、腿部和鞋子，用同风格自然续画，最终输出必须是完整全身人物。但补齐时绝不能牺牲脸和发型的相似度，也不要新加配饰。',
    '补齐规则必须固定：先根据上半身服装、颜色和气质，合理推断下半身的裤装、裙装或鞋子，再补出完整站姿。允许合理推断未拍到的下装，但不能胡乱夸张设计。',
    '人物必须完整站立在画面中，脚必须清楚出现，腿部必须完整，画面中从头到脚都要看到，不能裁掉腿脚，不能只生成头像或半身。',
    '如果衣服是黑色、深灰、藏蓝等深色，必须保持深色，不要洗成白色、米色或浅灰。',
    '整体画风：简单、温柔、自然的手绘动画角色感，脸部简化但要像本人，线条轻柔，颜色低饱和，背景纯白。',
    '画面只保留单个主体，背景纯白，不要桌子，不要墙面，不要环境，不要复杂场景，不要文字，不要水印，不要边框。',
  ].join(' ');
}

function buildAnimalEditPrompt() {
  return [
    '请不要复刻原动物照片，不要照搬原图构图。',
    STYLE_BIBLE,
    '请只提取输入动物照片中的基础元素，再重新设计成一张白底、无背景、完整全身的小动物手绘动画角色图。',
    '整体原则是贴近原照片，只做温和的动画角色化处理，不要大改动物本身，不要明显重设计。',
    '最重要的是高度保留原照片中的物种特征、脸部感觉、耳朵形状、眼睛距离、鼻口关系、毛色分布、花纹位置、尾巴感觉和整体体型。',
    '只保留这些核心信息：物种，主色，辅助色，花纹，绒感，耳朵形状，尾巴感觉，身体比例。',
    '这一定是动物，不是人类。输出必须仍然是动物本体，不能变成人，不能拟人，不能长成人脸，不能穿人类服装，不能站成人类姿态，不能做兽人。',
    '不要复刻原照片的真实背景，不要写实照片感，不要做动物写真。',
    '动物必须完整全身出现，不能裁掉身体和脚部。',
    '整体画风：简单、温柔、自然的手绘动画动物角色感，线条轻柔，形体简洁，颜色低饱和，背景纯白，风格要固定统一。',
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
    '漫画身材',
    '夸张长腿',
    '超模比例',
    '二次元比例',
    '廉价卡通',
    '僵硬四肢',
    '塑料玩具感',
    '3D玩偶',
    '头像特写',
    '半身像',
    '大脸近景',
    '证件照构图',
    '人物特写',
    '只到膝盖',
    '只到大腿',
    '裁切脚部',
    '看不到鞋子',
    '缺失下半身',
    '没有腿',
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
    '二次元风格',
    '厚涂风格',
    '儿童插画风格',
    '照片精修风格',
    '风格漂移',
    '强写实动画脸',
    '夸张漫画脸',
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
    '改变物种',
    '改变花纹',
    '改变毛色',
    '改变耳朵形状',
    '改变尾巴',
    'Q版',
    '廉价卡通',
    '二次元风格',
    '厚涂风格',
    '儿童插画风格',
    '照片精修风格',
    '风格漂移',
    '强写实动物',
    '照片级动物',
    '复杂背景',
    '文字',
    '水印',
    '边框',
    '多人',
    '裁切身体',
    '半身',
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
