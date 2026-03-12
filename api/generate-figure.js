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

    const prompt = `You are a talented watercolor illustrator. Study this photo carefully — the subject's pose, clothing, colors, and overall vibe. Then create a CUTE, CHARMING watercolor-style SVG illustration inspired by it.

IMPORTANT STYLE GUIDELINES — follow the style of Japanese/Korean watercolor illustration:
- Cute, slightly stylized proportions (larger head ratio ~1:4 for people, round soft shapes for animals)
- Gentle, natural poses — sitting, walking, holding something, looking sideways, etc.
- Soft, muted watercolor palette extracted from the photo — earthy tones, pastels, warm browns, soft blues
- Layered transparent color washes that overlap slightly, creating depth
- Minimal but expressive outlines — thin, slightly imperfect ink lines
- Charming small details: rosy cheeks, soft hair strands, clothing wrinkles, accessories

SVG TECHNICAL RULES:
- viewBox="0 0 200 280" for people, viewBox="0 0 240 200" for animals
- Use this filter in <defs>:
  <filter id="wc"><feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" seed="5" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="2" xChannelSelector="R" yChannelSelector="G" result="d"/><feGaussianBlur in="d" stdDeviation="0.6" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
- Include <style>: @keyframes sway{0%,100%{transform:rotate(-1.5deg)}50%{transform:rotate(1.5deg)}}.fig{animation:sway 4s ease-in-out infinite;transform-origin:50% 98%;}
- Wrap all shapes in <g class="fig" filter="url(#wc)">
- Build the figure using many layered <path>, <ellipse>, and <rect rx="..."> elements
- For each color area, use 2-3 overlapping shapes with slightly different opacity (0.5-0.85) to create watercolor wash effect
- Add a subtle shadow ellipse at the bottom with fill="#8b7b6b" opacity="0.12" and blur
- Thin ink outlines: stroke="#2d1a10" stroke-width="0.6" opacity="0.5" stroke-linecap="round"
- NO <text>, NO <image>, NO <foreignObject>
- Use bezier curves (C, Q commands) for organic, flowing shapes — avoid straight rigid lines
- Hair should be flowing, with individual strand shapes
- Add tiny detail touches: blush circles on cheeks (fill="#e8a0a0" opacity="0.4"), clothing folds, shoe details

POSE: Give the character a natural, gentle pose similar to the photo — NOT just standing stiffly.

Return ONLY the raw SVG code starting with <svg and ending with </svg>. No markdown, no explanation, no backticks.`;

    const apiRes = await fetch('https://open.bigmodel.cn/api/paas/v4/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.ZHIPU_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'glm-4v-flash',
        messages: [{
          role: 'user',
          content: [
            {
              type: 'image_url',
              image_url: { url: imageBase64 }
            },
            {
              type: 'text',
              text: prompt
            }
          ]
        }]
      })
    });

    const data = await apiRes.json();
    console.log('Zhipu response status:', apiRes.status);

    if (data.error) {
      console.error('Zhipu API error:', JSON.stringify(data.error));
      return res.status(500).json({ error: data.error.message || JSON.stringify(data.error) });
    }

    let svg = (data.choices?.[0]?.message?.content || '').trim();
    // Clean up any markdown wrapping
    svg = svg.replace(/^```[a-zA-Z]*\n?/, '').replace(/\n?```$/, '').trim();
    const svgStart = svg.indexOf('<svg');
    if (svgStart > 0) svg = svg.slice(svgStart);
    const svgEnd = svg.lastIndexOf('</svg>');
    if (svgEnd > 0) svg = svg.slice(0, svgEnd + 6);
    if (!svg.startsWith('<svg'))
      return res.status(500).json({ error: '未返回有效SVG，请重试' });

    return res.json({ svg });

  } catch (err) {
    console.error('Handler error:', err);
    return res.status(500).json({ error: err.message });
  }
}
