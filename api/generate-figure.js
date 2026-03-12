// 使用智谱AI GLM-4V-Flash（完全免费，支持视觉理解）
// 在 Vercel 环境变量中设置 ZHIPU_API_KEY

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { imageBase64, mediaType } = req.body;
    if (!imageBase64 || !mediaType)
      return res.status(400).json({ error: 'Missing image data' });

    const apiRes = await fetch('https://open.bigmodel.cn/api/paas/v4/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.ZHIPU_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'glm-4v-flash',
        max_tokens: 4000,
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'image_url',
                image_url: { url: `data:${mediaType};base64,${imageBase64}` }
              },
              {
                type: 'text',
                text: `You are a watercolor illustrator. Analyze this photo and create a charming animated watercolor SVG character.

STEP 1 — Detect subject: Is this a PERSON or ANIMAL? Note dominant colors (hair/fur, clothing/skin).

STEP 2 — Generate SVG:

CANVAS: viewBox="0 0 100 140" for person; viewBox="0 0 140 100" for animal

REQUIRED <defs>:
<filter id="wc">
  <feTurbulence type="fractalNoise" baseFrequency="0.055" numOctaves="4" seed="RANDOM_3_TO_25" result="noise"/>
  <feDisplacementMap in="SourceGraphic" in2="noise" scale="3.5" xChannelSelector="R" yChannelSelector="G" result="disp"/>
  <feGaussianBlur in="disp" stdDeviation="0.9" result="soft"/>
  <feMerge><feMergeNode in="soft"/><feMergeNode in="SourceGraphic" opacity="0.45"/></feMerge>
</filter>

REQUIRED <style> in SVG:
@keyframes sway{0%,100%{transform:rotate(-2.5deg) translateX(-1px)}50%{transform:rotate(2.5deg) translateX(1px)}}
@keyframes breathe{0%,100%{transform:scaleY(1)}50%{transform:scaleY(1.04) scaleX(0.97)}}
@keyframes nod{0%,100%{transform:translateY(0)}40%{transform:translateY(-2px)}}
.body-group{animation:sway 3.8s ease-in-out infinite;transform-origin:50% 95%;}
.animal-group{animation:breathe 2.8s ease-in-out infinite;transform-origin:center;}
.head{animation:nod 4.5s ease-in-out infinite;transform-origin:50% 100%;}

DRAWING RULES:
- Use only ellipses, circles, paths, rounded rects — no text, no images
- Apply filter="url(#wc)" to the main group
- Colors match photo — muted warm watercolor palette
- Strokes: 0.8–1.2 width, color #2d1f14, opacity 0.55–0.7
- Fills: opacity 0.65–0.88 for transparency effect
- Large soft ellipse behind figure (same hue, opacity 0.05) as bleed
- Artistic and loose, NOT flat cartoon

PERSON: outer g class="body-group" — watercolor bleed ellipse, hair ellipse class="head", face ellipse, neck, torso rect, arm paths, leg rects, feet ellipses
ANIMAL: outer g class="animal-group" — body ellipse, head ellipse class="head", ear paths, leg paths, tail path

Return ONLY raw SVG. Start with <svg end with </svg>. No markdown fences.`
              }
            ]
          }
        ]
      })
    });

    const data = await apiRes.json();
    if (data.error)
      return res.status(500).json({ error: data.error.message || JSON.stringify(data.error) });

    let svg = (data.choices?.[0]?.message?.content || '').trim();
    svg = svg.replace(/^```[a-z]*\n?/i, '').replace(/\n?```$/i, '').trim();
    const idx = svg.indexOf('<svg');
    if (idx > 0) svg = svg.slice(idx);
    if (!svg.startsWith('<svg'))
      return res.status(500).json({ error: 'Model did not return valid SVG. Try again.' });

    return res.json({ svg });

  } catch (err) {
    console.error('generate-figure error:', err);
    return res.status(500).json({ error: err.message });
  }
}
