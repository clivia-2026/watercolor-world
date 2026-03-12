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

    const prompt = `Look at this photo. Create a watercolor SVG character based on it.

Rules:
- If person: viewBox="0 0 100 160", if animal: viewBox="0 0 150 120"
- Include <defs> with this filter:
  <filter id="wc"><feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="4" seed="7" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="3" xChannelSelector="R" yChannelSelector="G" result="d"/><feGaussianBlur in="d" stdDeviation="0.8" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic" opacity="0.4"/></feMerge></filter>
- Include <style> with animation:
  @keyframes sway{0%,100%{transform:rotate(-2deg)}50%{transform:rotate(2deg)}}.fig{animation:sway 4s ease-in-out infinite;transform-origin:50% 98%;}
- Apply filter="url(#wc)" and class="fig" to main group
- Use colors from the photo, muted watercolor palette
- Shapes: ellipses, paths, rounded rects only. No text, no images.
- Fill opacity 0.7-0.88 for watercolor effect
- Stroke: color="#2d1a10" stroke-width="0.8" opacity="0.6"

Return ONLY raw SVG starting with <svg and ending with </svg>. No explanation.`;

    const apiRes = await fetch('https://open.bigmodel.cn/api/paas/v4/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.ZHIPU_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'glm-4v-flash',
        max_tokens: 3000,
        messages: [{
          role: 'user',
          content: [
            {
              type: 'image_url',
              image_url: { url: `data:${mediaType};base64,${imageBase64}` }
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
    svg = svg.replace(/^```[a-zA-Z]*\n?/, '').replace(/\n?```$/, '').trim();
    const svgStart = svg.indexOf('<svg');
    if (svgStart > 0) svg = svg.slice(svgStart);
    if (!svg.startsWith('<svg'))
      return res.status(500).json({ error: '未返回有效SVG，请重试' });

    return res.json({ svg });

  } catch (err) {
    console.error('Handler error:', err);
    return res.status(500).json({ error: err.message });
  }
}
