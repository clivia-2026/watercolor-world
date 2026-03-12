// 智谱AI GLM-4V-Flash - 免费视觉模型
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
        model: 'glm-4v',
        max_tokens: 4096,
        messages: [{
          role: 'user',
          content: [
            {
              type: 'image_url',
              image_url: { url: `data:${mediaType};base64,${imageBase64}` }
            },
            {
              type: 'text',
              text: `You are a master watercolor illustrator in the style of classic European storybook art.
Study the photo carefully, then create an SVG watercolor character with these EXACT specifications.

━━━ VISUAL STYLE REFERENCE ━━━
Think: soft Japanese/European watercolor illustration books.
- Loose, organic brushwork — shapes have slightly uneven, painterly edges
- Warm muted palette: dusty rose, warm beige, soft sage, faded denim, caramel, dusty lavender
- Transparent layered washes — lighter areas show through
- Thin ink outlines (0.6–1px) in dark warm brown #2d1a10, NOT pure black
- Figures feel gentle, quiet, slightly dreamy — NOT cartoon, NOT flat design
- Similar mood to: Beatrix Potter, Shaun Tan, or Taiwanese watercolor illustration

━━━ DETECT SUBJECT ━━━
Person → use viewBox="0 0 100 160"
Animal → use viewBox="0 0 150 120"
Extract exact colors: hair/fur color, skin/body color, main clothing colors, eye color

━━━ SVG STRUCTURE ━━━

<svg viewBox="0 0 100 160" xmlns="http://www.w3.org/2000/svg">
<defs>
  <!-- Watercolor texture filter -->
  <filter id="wc" x="-15%" y="-15%" width="130%" height="130%">
    <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="5" seed="[RANDOM 2-28]" result="noise"/>
    <feDisplacementMap in="SourceGraphic" in2="noise" scale="2.8" xChannelSelector="R" yChannelSelector="G" result="d"/>
    <feGaussianBlur in="d" stdDeviation="0.7" result="b"/>
    <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic" opacity="0.4"/></feMerge>
  </filter>
  <!-- Soft edge for washes -->
  <filter id="soft">
    <feGaussianBlur stdDeviation="2.5"/>
  </filter>
</defs>

<style>
@keyframes breathe {
  0%,100% { transform: translateY(0px) rotate(0deg); }
  30% { transform: translateY(-3px) rotate(0.8deg); }
  60% { transform: translateY(-1.5px) rotate(-0.5deg); }
}
@keyframes sway {
  0%,100% { transform: rotate(-1.8deg) translateX(-0.5px); }
  50% { transform: rotate(1.8deg) translateX(0.5px); }
}
@keyframes tail-wag {
  0%,100% { transform: rotate(-15deg); }
  50% { transform: rotate(15deg); }
}
@keyframes ear-twitch {
  0%,85%,100% { transform: rotate(0deg); }
  90% { transform: rotate(-8deg); }
}
.figure { animation: breathe 4s ease-in-out infinite; transform-origin: 50% 98%; }
.sway { animation: sway 5s ease-in-out infinite; transform-origin: 50% 98%; }
.tail { animation: tail-wag 1.2s ease-in-out infinite; transform-origin: 0% 50%; }
.ear { animation: ear-twitch 3s ease-in-out infinite; transform-origin: 50% 100%; }
</style>

<!-- LAYER 1: Background watercolor bleed (very soft, opacity 0.06-0.09) -->
<ellipse ... fill="[dominant color]" opacity="0.07" filter="url(#soft)"/>

<!-- LAYER 2: Main figure group with wc filter, class="figure" or class="sway" -->
<g class="figure" filter="url(#wc)">
  <!-- Build figure from bottom to top using ellipses and paths -->
  <!-- Use opacity 0.72-0.88 on fills for watercolor transparency -->
  <!-- Strokes: color="#2d1a10" stroke-width="0.7" opacity="0.6" fill="none" for outlines -->
  <!-- Add small color variation ellipses for cheek blush, shadow areas -->
</g>
</svg>

━━━ PERSON FIGURE LAYERS (bottom→top) ━━━
1. Shadow: small dark ellipse under feet, opacity 0.08, filter soft
2. Shoes/feet: small rounded ellipses, dark neutral color
3. Legs: two rounded rects, trouser/skin color
4. Torso: rounded rect with slight taper, main clothing color + a lighter wash ellipse on chest
5. Arms: two curved paths with rounded ends, clothing color
6. Hands: small ellipses, skin color
7. Neck: small ellipse, skin color
8. Head: ellipse, skin tone — add a soft blush circle (cheek) with opacity 0.18
9. Hair: one large hair ellipse covering top half of head + smaller hair detail paths
10. Face details: two tiny dark ellipses for eyes (opacity 0.7), tiny curved path for mouth
11. Clothing details: small buttons, collar, or pocket using simple shapes

━━━ ANIMAL FIGURE LAYERS ━━━
1. Shadow: soft ellipse under body
2. Body: large ellipse, main fur color
3. Belly: slightly lighter ellipse overlay, opacity 0.5
4. Legs/paws: short rounded rects or ellipses × 4
5. Head: medium ellipse
6. Ears: two petal-shaped paths class="ear"
7. Face: eyes (tiny dark ellipses), nose (small ellipse), mouth (tiny path)
8. Tail: curved bezier path class="tail"
9. Fur texture: 2-3 thin curved strokes, opacity 0.2

━━━ CRITICAL RULES ━━━
- NO text elements, NO image elements, NO foreignObject
- Every fill color must come from the actual photo
- All shapes slightly imperfect — watercolor doesn't have perfect circles
- Return ONLY raw SVG code, starting with <svg, ending with </svg>
- NO markdown, NO explanation, NO code fences`
            }
          ]
        }]
      })
    });

    const data = await apiRes.json();

    if (data.error) {
      console.error('Zhipu API error:', data.error);
      return res.status(500).json({ error: data.error.message || JSON.stringify(data.error) });
    }

    let svg = (data.choices?.[0]?.message?.content || '').trim();

    // Strip markdown fences
    svg = svg.replace(/^```[a-zA-Z]*\n?/, '').replace(/\n?```$/, '').trim();

    // Find SVG start
    const svgStart = svg.indexOf('<svg');
    if (svgStart > 0) svg = svg.slice(svgStart);
    if (!svg.startsWith('<svg'))
      return res.status(500).json({ error: '模型未返回有效SVG，请重试' });

    return res.json({ svg });

  } catch (err) {
    console.error('Handler error:', err);
    return res.status(500).json({ error: err.message });
  }
}
