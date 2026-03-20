// ═══════════════════════════════════════════════════
//  House watercolor style templates
//  Gemini only analyzes photo features and colors
// ═══════════════════════════════════════════════════

const HOUSE_INK = '#3b2b24';

function pick(value, allowed, fallback) {
  return allowed.includes(value) ? value : fallback;
}

function normalizeHexColor(value, fallback) {
  return /^#[0-9a-fA-F]{6}$/.test(value || '') ? value : fallback;
}

function alpha(hex, opacity) {
  const raw = (hex || '').replace('#', '');
  if (!/^[0-9a-fA-F]{6}$/.test(raw)) return `rgba(59,43,36,${opacity})`;
  const r = parseInt(raw.slice(0, 2), 16);
  const g = parseInt(raw.slice(2, 4), 16);
  const b = parseInt(raw.slice(4, 6), 16);
  return `rgba(${r},${g},${b},${opacity})`;
}

function shell({ viewBox = '0 0 220 320', origin = '110px 312px', sway = 1.2, dur = 4.2, body }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}">
<defs>
  <filter id="wc">
    <feTurbulence type="fractalNoise" baseFrequency="0.015" numOctaves="2" seed="7" result="noise"/>
    <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.8" xChannelSelector="R" yChannelSelector="G"/>
  </filter>
  <filter id="soft">
    <feGaussianBlur stdDeviation="1.3"/>
  </filter>
</defs>
<style>
  @keyframes sway{0%,100%{transform:rotate(-${sway}deg)}50%{transform:rotate(${sway}deg)}}
  .fig{animation:sway ${dur}s ease-in-out infinite;transform-origin:${origin}}
  .line{stroke:${alpha(HOUSE_INK, 0.7)};stroke-linecap:round;stroke-linejoin:round}
</style>
<g class="fig" filter="url(#wc)">${body}</g>
</svg>`;
}

function splatters(color, points) {
  return points.map(([cx, cy, r, o = 0.2]) =>
    `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${alpha(color, o)}"/>`
  ).join('');
}

function normalizeStyle(style = {}) {
  return {
    hairLength: pick(style.hairLength, ['short', 'medium', 'long'], 'medium'),
    hairTexture: pick(style.hairTexture, ['straight', 'wavy', 'curly'], 'straight'),
    headwear: pick(style.headwear, ['none', 'cap', 'beanie', 'hat'], 'none'),
    eyewear: pick(style.eyewear, ['none', 'glasses', 'sunglasses'], 'none'),
    outerwear: pick(style.outerwear, ['shirt', 'sweater', 'hoodie', 'jacket', 'coat', 'dress'], 'sweater'),
    carry: pick(style.carry, ['none', 'bag', 'strap'], 'none'),
    fluff: pick(style.fluff, ['soft', 'fluffy', 'sleek'], 'soft'),
    markings: pick(style.markings, ['none', 'light', 'patch', 'striped'], 'light'),
  };
}

function buildHumanAccessories(c, s) {
  const hat = s.headwear === 'cap'
    ? `<g>
        <path d="M90 66 Q111 38 138 56 Q145 61 145 69 Q119 77 87 70Z" fill="${alpha(c.acc, 0.68)}"/>
        <path d="M114 68 Q144 66 156 74 Q146 79 128 79 Q111 79 96 75Z" fill="${alpha(c.acc, 0.58)}"/>
      </g>`
    : s.headwear === 'beanie'
      ? `<g>
          <ellipse cx="112" cy="61" rx="31" ry="21" fill="${alpha(c.acc, 0.72)}"/>
          <path d="M90 72 Q112 82 136 71" fill="none" class="line" stroke-width="1.2" opacity=".28"/>
        </g>`
      : s.headwear === 'hat'
        ? `<g>
            <ellipse cx="112" cy="71" rx="40" ry="9" fill="${alpha(c.acc, 0.4)}"/>
            <path d="M88 67 Q108 34 136 50 Q144 55 146 69 Q116 76 88 67Z" fill="${alpha(c.acc, 0.58)}"/>
          </g>`
        : '';

  const glasses = s.eyewear === 'sunglasses'
    ? `<g opacity=".82">
        <ellipse cx="101" cy="82" rx="10" ry="7" fill="${alpha(c.shoes, 0.88)}"/>
        <ellipse cx="123" cy="82" rx="10" ry="7" fill="${alpha(c.shoes, 0.88)}"/>
        <path d="M111 82 Q112 80 113 82" fill="none" class="line" stroke-width="1"/>
      </g>`
    : s.eyewear === 'glasses'
      ? `<g opacity=".72">
          <ellipse cx="101" cy="82" rx="10" ry="8" fill="none" class="line" stroke-width="1"/>
          <ellipse cx="123" cy="82" rx="10" ry="8" fill="none" class="line" stroke-width="1"/>
          <path d="M111 82 Q112 80 113 82" fill="none" class="line" stroke-width="1"/>
        </g>`
      : '';

  const strap = s.carry !== 'none'
    ? `<path d="M133 113 Q122 145 118 184" fill="none" stroke="${alpha(c.acc, 0.9)}" stroke-width="3.2" stroke-linecap="round"/>`
    : '';

  return hat + glasses + strap;
}

function buildHair(c, s, variant = 'standing') {
  const longBack = s.hairLength === 'long'
    ? `<path d="M84 75 Q77 110 80 170 Q84 214 92 221 L99 219 Q92 164 95 112 Q95 88 97 70Z" fill="${alpha(c.hair, 0.56)}"/>
       <path d="M142 75 Q149 108 147 171 Q144 212 137 220 L130 218 Q138 164 134 111 Q133 88 129 70Z" fill="${alpha(c.hair, 0.56)}"/>`
    : s.hairLength === 'medium'
      ? `<path d="M87 75 Q81 95 84 134 Q86 150 92 154 L97 151 Q94 120 96 90 Q96 80 98 70Z" fill="${alpha(c.hair, 0.54)}"/>
         <path d="M139 75 Q145 95 143 134 Q140 150 134 154 L129 151 Q132 120 130 90 Q130 80 128 70Z" fill="${alpha(c.hair, 0.54)}"/>`
      : '';

  const crown = variant === 'walking'
    ? `<path d="M88 69 Q94 46 113 44 Q131 46 139 60 Q141 72 134 83 Q127 73 113 72 Q99 71 92 79 Q86 76 88 69Z" fill="${alpha(c.hair, 0.8)}"/>`
    : `<path d="M86 68 Q91 45 113 43 Q134 47 141 63 Q141 74 133 82 Q126 72 112 71 Q99 71 91 80 Q84 76 86 68Z" fill="${alpha(c.hair, 0.8)}"/>`;

  const flyaways = s.hairTexture === 'wavy'
    ? `<path d="M78 74 Q88 64 96 70" fill="none" class="line" stroke-width="1" opacity=".3"/>
       <path d="M132 63 Q143 66 149 76" fill="none" class="line" stroke-width="1" opacity=".3"/>`
    : s.hairTexture === 'curly'
      ? `<path d="M79 78 Q88 67 98 74" fill="none" class="line" stroke-width="1.2" opacity=".34"/>
         <path d="M128 66 Q141 67 149 81" fill="none" class="line" stroke-width="1.2" opacity=".34"/>`
      : `<path d="M81 74 Q89 66 96 69" fill="none" class="line" stroke-width=".9" opacity=".24"/>`;

  return longBack + crown + flyaways;
}

function renderGirlStanding(c, s) {
  return shell({
    body: `
      <ellipse cx="112" cy="309" rx="26" ry="6" fill="${alpha('#8d7b67', 0.12)}" filter="url(#soft)"/>
      ${splatters(c.acc, [[54, 236, 2.2, 0.18], [163, 251, 1.8, 0.16], [147, 46, 2.5, 0.1]])}
      <path d="M97 202 Q93 244 91 290" fill="none" stroke="${alpha(c.bottom, 0.72)}" stroke-width="10" stroke-linecap="round"/>
      <path d="M124 202 Q126 244 129 290" fill="none" stroke="${alpha(c.bottom, 0.78)}" stroke-width="11" stroke-linecap="round"/>
      <path d="M92 292 Q102 287 111 292" fill="none" stroke="${alpha(c.shoes, 0.92)}" stroke-width="8" stroke-linecap="round"/>
      <path d="M122 292 Q132 288 141 292" fill="none" stroke="${alpha(c.shoes, 0.92)}" stroke-width="8" stroke-linecap="round"/>
      <path d="M80 126 Q72 161 82 198 Q100 212 138 203 Q149 160 141 124 Q127 109 103 111 Q88 112 80 126Z" fill="${alpha(c.top, 0.54)}"/>
      <path d="M83 128 Q89 147 97 182 Q102 198 107 204" fill="none" stroke="${alpha(c.top, 0.28)}" stroke-width="18" stroke-linecap="round"/>
      <path d="M117 122 Q133 146 142 186" fill="none" stroke="${alpha(c.top, 0.24)}" stroke-width="19" stroke-linecap="round"/>
      <path d="M84 201 Q97 208 112 210 Q132 208 146 201 Q139 231 128 252 Q114 259 100 255 Q89 236 84 201Z" fill="${alpha(c.bottom, 0.44)}"/>
      <path d="M79 137 Q66 159 57 192" fill="none" stroke="${alpha(c.skin, 0.82)}" stroke-width="7.5" stroke-linecap="round"/>
      <path d="M145 136 Q156 160 163 193" fill="none" stroke="${alpha(c.skin, 0.82)}" stroke-width="7.5" stroke-linecap="round"/>
      <circle cx="55" cy="195" r="6" fill="${alpha(c.skin, 0.84)}"/>
      <circle cx="165" cy="196" r="6" fill="${alpha(c.skin, 0.84)}"/>
      ${s.carry !== 'none' ? `<path d="M147 183 Q159 190 159 205 Q156 219 141 218 Q133 209 138 194" fill="${alpha(c.acc, 0.58)}"/>` : ''}
      <rect x="105" y="106" width="15" height="18" rx="6" fill="${alpha(c.skin, 0.82)}"/>
      ${buildHair(c, s, 'standing')}
      <ellipse cx="112" cy="80" rx="24" ry="28" fill="${alpha(c.skin, 0.94)}"/>
      <ellipse cx="101" cy="82" rx="2.8" ry="3.2" fill="${alpha(HOUSE_INK, 0.82)}"/>
      <ellipse cx="123" cy="82" rx="2.8" ry="3.2" fill="${alpha(HOUSE_INK, 0.82)}"/>
      <path d="M106 94 Q112 100 118 94" fill="none" stroke="${alpha('#c86b63', 0.72)}" stroke-width="1.3" stroke-linecap="round"/>
      <ellipse cx="95" cy="91" rx="6" ry="4" fill="${alpha('#efab9f', 0.28)}"/>
      <ellipse cx="129" cy="91" rx="6" ry="4" fill="${alpha('#efab9f', 0.28)}"/>
      ${buildHumanAccessories(c, s)}
      <path d="M75 123 Q111 98 147 124" fill="none" class="line" stroke-width="1.2" opacity=".26"/>
    `
  });
}

function renderGirlWalking(c, s) {
  return shell({
    sway: 1.5,
    dur: 3.8,
    body: `
      <ellipse cx="115" cy="309" rx="28" ry="6" fill="${alpha('#8d7b67', 0.12)}" filter="url(#soft)"/>
      ${splatters(c.acc, [[48, 240, 2, 0.14], [173, 214, 2.2, 0.12], [160, 54, 2.4, 0.12]])}
      <path d="M106 198 Q96 231 91 279" fill="none" stroke="${alpha(c.bottom, 0.74)}" stroke-width="10" stroke-linecap="round"/>
      <path d="M126 196 Q135 232 144 271" fill="none" stroke="${alpha(c.bottom, 0.78)}" stroke-width="11" stroke-linecap="round"/>
      <path d="M87 281 Q97 279 104 286" fill="none" stroke="${alpha(c.shoes, 0.92)}" stroke-width="8" stroke-linecap="round"/>
      <path d="M140 272 Q150 271 157 277" fill="none" stroke="${alpha(c.shoes, 0.92)}" stroke-width="8" stroke-linecap="round"/>
      <path d="M81 124 Q78 157 87 197 Q106 208 135 198 Q147 162 142 126 Q126 112 105 110 Q90 111 81 124Z" fill="${alpha(c.top, 0.56)}"/>
      <path d="M84 127 Q100 148 115 199" fill="none" stroke="${alpha(c.top, 0.25)}" stroke-width="20" stroke-linecap="round"/>
      <path d="M118 121 Q136 141 143 181" fill="none" stroke="${alpha(c.top, 0.23)}" stroke-width="16" stroke-linecap="round"/>
      <path d="M78 135 Q63 160 57 185" fill="none" stroke="${alpha(c.skin, 0.82)}" stroke-width="7.5" stroke-linecap="round"/>
      <path d="M145 136 Q160 151 170 171" fill="none" stroke="${alpha(c.skin, 0.82)}" stroke-width="7.5" stroke-linecap="round"/>
      <circle cx="56" cy="187" r="5.8" fill="${alpha(c.skin, 0.84)}"/>
      <circle cx="171" cy="173" r="5.8" fill="${alpha(c.skin, 0.84)}"/>
      ${s.carry !== 'none' ? `<path d="M132 117 Q120 152 111 203" fill="none" stroke="${alpha(c.acc, 0.88)}" stroke-width="3.2" stroke-linecap="round"/>
      <ellipse cx="107" cy="212" rx="13" ry="17" fill="${alpha(c.acc, 0.58)}"/>` : ''}
      <rect x="105" y="104" width="15" height="17" rx="6" fill="${alpha(c.skin, 0.82)}"/>
      ${buildHair(c, s, 'walking')}
      <ellipse cx="112" cy="79" rx="24" ry="28" fill="${alpha(c.skin, 0.94)}"/>
      <ellipse cx="101" cy="81" rx="2.8" ry="3.2" fill="${alpha(HOUSE_INK, 0.82)}"/>
      <ellipse cx="123" cy="81" rx="2.8" ry="3.2" fill="${alpha(HOUSE_INK, 0.82)}"/>
      <path d="M107 94 Q112 99 118 94" fill="none" stroke="${alpha('#c86b63', 0.72)}" stroke-width="1.3" stroke-linecap="round"/>
      <ellipse cx="95" cy="89" rx="6" ry="4" fill="${alpha('#efab9f', 0.28)}"/>
      <ellipse cx="129" cy="89" rx="6" ry="4" fill="${alpha('#efab9f', 0.28)}"/>
      ${buildHumanAccessories(c, s)}
    `
  });
}

function renderBoyStanding(c, s) {
  return shell({
    sway: 1.15,
    dur: 4.0,
    body: `
      <ellipse cx="111" cy="309" rx="27" ry="6" fill="${alpha('#8d7b67', 0.12)}" filter="url(#soft)"/>
      ${splatters(c.acc, [[57, 248, 2.2, 0.12], [162, 225, 2.2, 0.12], [70, 54, 2, 0.08]])}
      <path d="M96 201 Q93 240 93 289" fill="none" stroke="${alpha(c.bottom, 0.78)}" stroke-width="12" stroke-linecap="round"/>
      <path d="M126 201 Q130 241 132 289" fill="none" stroke="${alpha(c.bottom, 0.78)}" stroke-width="12" stroke-linecap="round"/>
      <path d="M89 291 Q102 287 112 291" fill="none" stroke="${alpha(c.shoes, 0.94)}" stroke-width="9" stroke-linecap="round"/>
      <path d="M120 291 Q133 287 144 292" fill="none" stroke="${alpha(c.shoes, 0.94)}" stroke-width="9" stroke-linecap="round"/>
      <path d="M80 120 Q78 154 87 198 Q111 210 139 197 Q147 154 144 121 Q127 108 107 108 Q89 108 80 120Z" fill="${alpha(c.top, 0.58)}"/>
      <path d="M84 127 Q95 157 102 200" fill="none" stroke="${alpha(c.top, 0.25)}" stroke-width="20" stroke-linecap="round"/>
      <path d="M119 120 Q136 149 142 190" fill="none" stroke="${alpha(c.top, 0.2)}" stroke-width="18" stroke-linecap="round"/>
      ${s.outerwear === 'coat' ? `<path d="M83 126 Q77 180 87 236" fill="none" stroke="${alpha(c.acc, 0.34)}" stroke-width="26" stroke-linecap="round"/>
      <path d="M139 123 Q147 181 136 241" fill="none" stroke="${alpha(c.acc, 0.32)}" stroke-width="26" stroke-linecap="round"/>` : ''}
      <path d="M82 135 Q69 160 61 187" fill="none" stroke="${alpha(c.skin, 0.82)}" stroke-width="7" stroke-linecap="round"/>
      <path d="M145 136 Q155 155 160 181" fill="none" stroke="${alpha(c.skin, 0.82)}" stroke-width="7" stroke-linecap="round"/>
      <circle cx="59" cy="189" r="5.3" fill="${alpha(c.skin, 0.84)}"/>
      <circle cx="161" cy="182" r="5.3" fill="${alpha(c.skin, 0.84)}"/>
      <rect x="104" y="102" width="15" height="17" rx="6" fill="${alpha(c.skin, 0.82)}"/>
      <path d="M88 68 Q92 46 113 44 Q132 47 139 61 Q141 74 132 79 Q122 69 112 69 Q98 69 91 78 Q86 76 88 68Z" fill="${alpha(c.hair, 0.84)}"/>
      ${s.hairLength !== 'short' ? `<path d="M88 72 Q84 92 89 125" fill="none" stroke="${alpha(c.hair, 0.5)}" stroke-width="8" stroke-linecap="round"/>
      <path d="M138 72 Q142 92 138 124" fill="none" stroke="${alpha(c.hair, 0.48)}" stroke-width="8" stroke-linecap="round"/>` : ''}
      <ellipse cx="112" cy="78" rx="23" ry="27" fill="${alpha(c.skin, 0.94)}"/>
      <ellipse cx="102" cy="80" rx="2.7" ry="3.1" fill="${alpha(HOUSE_INK, 0.82)}"/>
      <ellipse cx="122" cy="80" rx="2.7" ry="3.1" fill="${alpha(HOUSE_INK, 0.82)}"/>
      <path d="M107 94 Q112 97 118 94" fill="none" stroke="${alpha('#b96a54', 0.72)}" stroke-width="1.2" stroke-linecap="round"/>
      ${buildHumanAccessories(c, s)}
      ${s.carry !== 'none' ? `<path d="M137 114 Q151 157 157 204" fill="none" stroke="${alpha(c.acc, 0.86)}" stroke-width="3.2" stroke-linecap="round"/>` : ''}
    `
  });
}

function renderPersonSitting(c, s) {
  return shell({
    viewBox: '0 0 220 270',
    origin: '110px 254px',
    sway: 0.95,
    dur: 4.7,
    body: `
      <ellipse cx="112" cy="252" rx="34" ry="6" fill="${alpha('#8d7b67', 0.12)}" filter="url(#soft)"/>
      ${splatters(c.acc, [[54, 198, 2, 0.12], [175, 205, 2.3, 0.12]])}
      <path d="M82 206 Q101 201 127 201 Q148 202 159 208" fill="none" stroke="${alpha(c.bottom, 0.8)}" stroke-width="12" stroke-linecap="round"/>
      <path d="M148 212 Q157 229 157 246" fill="none" stroke="${alpha(c.bottom, 0.74)}" stroke-width="10" stroke-linecap="round"/>
      <path d="M151 247 Q160 245 166 249" fill="none" stroke="${alpha(c.shoes, 0.9)}" stroke-width="8" stroke-linecap="round"/>
      <path d="M80 120 Q79 147 83 198 Q101 204 132 197 Q141 160 138 121 Q126 110 105 110 Q88 111 80 120Z" fill="${alpha(c.top, 0.56)}"/>
      <path d="M85 124 Q95 150 103 194" fill="none" stroke="${alpha(c.top, 0.22)}" stroke-width="18" stroke-linecap="round"/>
      <path d="M118 120 Q131 144 138 184" fill="none" stroke="${alpha(c.top, 0.2)}" stroke-width="16" stroke-linecap="round"/>
      <path d="M80 136 Q69 157 72 186 Q79 195 91 197" fill="none" stroke="${alpha(c.skin, 0.84)}" stroke-width="7" stroke-linecap="round"/>
      <path d="M145 136 Q154 155 151 181 Q146 191 134 196" fill="none" stroke="${alpha(c.skin, 0.84)}" stroke-width="7" stroke-linecap="round"/>
      ${s.carry !== 'none' ? `<path d="M140 118 Q128 148 124 198" fill="none" stroke="${alpha(c.acc, 0.84)}" stroke-width="3"/>` : ''}
      <rect x="105" y="101" width="15" height="17" rx="6" fill="${alpha(c.skin, 0.82)}"/>
      ${buildHair(c, s, 'standing')}
      <ellipse cx="112" cy="78" rx="24" ry="28" fill="${alpha(c.skin, 0.94)}"/>
      <ellipse cx="101" cy="80" rx="2.8" ry="3.2" fill="${alpha(HOUSE_INK, 0.82)}"/>
      <ellipse cx="123" cy="80" rx="2.8" ry="3.2" fill="${alpha(HOUSE_INK, 0.82)}"/>
      <path d="M107 92 Q112 96 118 92" fill="none" stroke="${alpha('#c86b63', 0.72)}" stroke-width="1.3" stroke-linecap="round"/>
      ${buildHumanAccessories(c, s)}
    `
  });
}

function renderCat(c, s) {
  return shell({
    viewBox: '0 0 220 220',
    origin: '108px 206px',
    sway: 1.8,
    dur: 3.4,
    body: `
      <ellipse cx="108" cy="206" rx="30" ry="6" fill="${alpha('#8d7b67', 0.12)}" filter="url(#soft)"/>
      ${splatters(c.acc, [[33, 62, 2.5, 0.24], [48, 92, 2.2, 0.18], [183, 78, 2.4, 0.2], [173, 58, 1.8, 0.16]])}
      <path d="M142 162 Q171 147 177 120" fill="none" stroke="${alpha(c.top, 0.78)}" stroke-width="11" stroke-linecap="round"/>
      <path d="M144 163 Q175 150 181 124" fill="none" class="line" stroke-width="1.1" opacity=".34"/>
      <path d="M84 175 Q83 128 94 102 Q105 80 131 82 Q146 84 156 99 Q165 114 162 137 Q159 164 140 180 Q118 193 96 188 Q85 185 84 175Z" fill="${alpha(c.top, s.fluff === 'fluffy' ? 0.68 : 0.58)}"/>
      <path d="M82 177 Q93 167 104 171 Q121 176 136 168 Q147 162 156 150" fill="none" class="line" stroke-width="1.2" opacity=".32"/>
      <path d="M96 77 L83 47 L102 68Z" fill="${alpha(c.top, 0.8)}"/>
      <path d="M94 77 L88 57 L98 71Z" fill="${alpha(c.acc, 0.36)}"/>
      <path d="M132 79 L145 48 L126 68Z" fill="${alpha(c.top, 0.8)}"/>
      <path d="M133 77 L139 56 L128 72Z" fill="${alpha(c.acc, 0.36)}"/>
      <ellipse cx="116" cy="105" rx="32" ry="27" fill="${alpha(c.top, 0.52)}"/>
      <ellipse cx="116" cy="111" rx="22" ry="16" fill="${alpha(c.skin, 0.46)}"/>
      ${s.markings !== 'none' ? `<path d="M99 83 Q118 92 132 86" fill="none" stroke="${alpha(c.acc, 0.34)}" stroke-width="8" stroke-linecap="round"/>` : ''}
      <ellipse cx="103" cy="101" rx="5" ry="6.5" fill="${alpha(HOUSE_INK, 0.84)}"/>
      <ellipse cx="128" cy="101" rx="5" ry="6.5" fill="${alpha(HOUSE_INK, 0.84)}"/>
      <ellipse cx="104" cy="99" rx="1.6" ry="1.6" fill="white" opacity=".8"/>
      <ellipse cx="129" cy="99" rx="1.6" ry="1.6" fill="white" opacity=".8"/>
      <path d="M113 112 L116 116 L120 112Z" fill="${alpha(c.acc, 0.8)}"/>
      <path d="M116 116 Q111 122 106 119" fill="none" class="line" stroke-width="1" opacity=".45"/>
      <path d="M116 116 Q121 122 126 119" fill="none" class="line" stroke-width="1" opacity=".45"/>
      <path d="M89 105 l-22 -4 M89 112 l-24 1 M143 105 l22 -4 M143 112 l24 1" fill="none" class="line" stroke-width=".8" opacity=".26"/>
      <path d="M93 187 Q88 196 88 203" fill="none" stroke="${alpha(c.top, 0.82)}" stroke-width="6" stroke-linecap="round"/>
      <path d="M136 186 Q141 195 141 202" fill="none" stroke="${alpha(c.top, 0.82)}" stroke-width="6" stroke-linecap="round"/>
    `
  });
}

function renderRabbit(c, s) {
  return shell({
    viewBox: '0 0 220 240',
    origin: '110px 224px',
    sway: 1.9,
    dur: 3.2,
    body: `
      <ellipse cx="110" cy="224" rx="29" ry="6" fill="${alpha('#8d7b67', 0.12)}" filter="url(#soft)"/>
      ${splatters(c.acc, [[43, 72, 2.2, 0.18], [185, 92, 2.5, 0.18], [34, 113, 1.8, 0.12]])}
      <ellipse cx="111" cy="174" rx="40" ry="44" fill="${alpha(c.top, 0.62)}"/>
      <ellipse cx="111" cy="184" rx="28" ry="24" fill="${alpha(c.skin, 0.42)}"/>
      <ellipse cx="108" cy="110" rx="31" ry="30" fill="${alpha(c.top, 0.62)}"/>
      <ellipse cx="108" cy="116" rx="18" ry="13" fill="${alpha(c.skin, 0.38)}"/>
      <path d="M90 86 Q86 52 78 22 Q76 12 83 15 Q92 25 98 72" fill="${alpha(c.top, 0.72)}"/>
      <path d="M93 84 Q89 48 84 28" fill="none" stroke="${alpha(c.acc, 0.32)}" stroke-width="7" stroke-linecap="round"/>
      <path d="M126 86 Q130 52 138 22 Q140 12 133 15 Q124 25 118 72" fill="${alpha(c.top, 0.72)}"/>
      <path d="M123 84 Q127 48 132 28" fill="none" stroke="${alpha(c.acc, 0.32)}" stroke-width="7" stroke-linecap="round"/>
      <ellipse cx="97" cy="105" rx="4.8" ry="5.6" fill="${alpha(HOUSE_INK, 0.84)}"/>
      <ellipse cx="119" cy="105" rx="4.8" ry="5.6" fill="${alpha(HOUSE_INK, 0.84)}"/>
      <ellipse cx="98" cy="103" rx="1.4" ry="1.4" fill="white" opacity=".82"/>
      <ellipse cx="120" cy="103" rx="1.4" ry="1.4" fill="white" opacity=".82"/>
      <ellipse cx="108" cy="116" rx="4" ry="2.8" fill="${alpha(c.acc, 0.82)}"/>
      <path d="M108 119 Q103 124 99 121" fill="none" class="line" stroke-width=".95" opacity=".4"/>
      <path d="M108 119 Q113 124 117 121" fill="none" class="line" stroke-width=".95" opacity=".4"/>
      <path d="M88 188 Q84 197 83 205" fill="none" stroke="${alpha(c.top, 0.82)}" stroke-width="7" stroke-linecap="round"/>
      <path d="M129 188 Q133 197 134 205" fill="none" stroke="${alpha(c.top, 0.82)}" stroke-width="7" stroke-linecap="round"/>
    `
  });
}

function renderDog(c, s) {
  return shell({
    viewBox: '0 0 220 220',
    origin: '110px 204px',
    sway: 1.55,
    dur: 3.1,
    body: `
      <ellipse cx="110" cy="205" rx="30" ry="6" fill="${alpha('#8d7b67', 0.12)}" filter="url(#soft)"/>
      ${splatters(c.acc, [[38, 69, 2.1, 0.16], [183, 86, 2.2, 0.18], [167, 55, 1.8, 0.14]])}
      <path d="M71 153 Q49 134 47 111" fill="none" stroke="${alpha(c.top, 0.74)}" stroke-width="9" stroke-linecap="round"/>
      <ellipse cx="101" cy="159" rx="45" ry="34" fill="${alpha(c.top, 0.62)}"/>
      <ellipse cx="101" cy="166" rx="28" ry="17" fill="${alpha(c.skin, 0.34)}"/>
      <ellipse cx="138" cy="117" rx="33" ry="29" fill="${alpha(c.top, 0.62)}"/>
      <ellipse cx="153" cy="124" rx="14" ry="10" fill="${alpha(c.skin, 0.42)}"/>
      <path d="M117 102 Q106 84 99 101 Q96 114 108 117" fill="${alpha(c.acc, 0.5)}"/>
      <path d="M156 101 Q169 84 176 99 Q177 112 164 115" fill="${alpha(c.acc, 0.48)}"/>
      ${s.markings !== 'none' ? `<path d="M124 99 Q137 104 149 100" fill="none" stroke="${alpha(c.acc, 0.36)}" stroke-width="8" stroke-linecap="round"/>` : ''}
      <ellipse cx="129" cy="115" rx="4.2" ry="5" fill="${alpha(HOUSE_INK, 0.84)}"/>
      <ellipse cx="147" cy="115" rx="4.2" ry="5" fill="${alpha(HOUSE_INK, 0.84)}"/>
      <ellipse cx="130" cy="113" rx="1.4" ry="1.4" fill="white" opacity=".82"/>
      <ellipse cx="148" cy="113" rx="1.4" ry="1.4" fill="white" opacity=".82"/>
      <ellipse cx="158" cy="123" rx="4" ry="3" fill="${alpha(HOUSE_INK, 0.76)}"/>
      <path d="M154 126 Q148 132 143 129" fill="none" class="line" stroke-width="1" opacity=".42"/>
      <path d="M76 186 Q76 195 76 203" fill="none" stroke="${alpha(c.top, 0.84)}" stroke-width="9" stroke-linecap="round"/>
      <path d="M122 186 Q122 195 122 203" fill="none" stroke="${alpha(c.top, 0.84)}" stroke-width="9" stroke-linecap="round"/>
    `
  });
}

function renderBird(c) {
  return shell({
    viewBox: '0 0 220 240',
    origin: '109px 218px',
    sway: 1.7,
    dur: 3.0,
    body: `
      <ellipse cx="109" cy="218" rx="31" ry="7" fill="${alpha('#8d7b67', 0.12)}" filter="url(#soft)"/>
      ${splatters(c.acc, [[35, 62, 2.4, 0.22], [44, 91, 2.6, 0.18], [182, 58, 2.4, 0.22], [174, 76, 1.7, 0.14], [159, 90, 1.7, 0.14]])}
      <path d="M63 205 Q88 186 98 193" fill="none" stroke="${alpha(c.acc, 0.35)}" stroke-width="7" stroke-linecap="round"/>
      <path d="M121 211 Q148 190 164 196" fill="none" stroke="${alpha(c.acc, 0.3)}" stroke-width="7" stroke-linecap="round"/>
      <ellipse cx="108" cy="158" rx="46" ry="51" fill="${alpha(c.top, 0.7)}"/>
      <ellipse cx="100" cy="97" rx="35" ry="32" fill="${alpha(c.top, 0.74)}"/>
      <ellipse cx="101" cy="108" rx="18" ry="13" fill="${alpha(c.skin, 0.28)}"/>
      <path d="M129 124 Q148 141 143 171 Q131 191 110 194" fill="${alpha(c.bottom, 0.22)}"/>
      <path d="M81 67 Q100 49 121 63" fill="none" stroke="${alpha(c.bottom, 0.28)}" stroke-width="7" stroke-linecap="round"/>
      <ellipse cx="90" cy="95" rx="8" ry="10" fill="${alpha(HOUSE_INK, 0.88)}"/>
      <ellipse cx="114" cy="95" rx="8" ry="10" fill="${alpha(HOUSE_INK, 0.88)}"/>
      <ellipse cx="92" cy="92" rx="2.2" ry="2.2" fill="white" opacity=".86"/>
      <ellipse cx="116" cy="92" rx="2.2" ry="2.2" fill="white" opacity=".86"/>
      <path d="M100 107 L108 114 L117 108 L108 103Z" fill="${alpha(c.acc, 0.9)}"/>
      <path d="M92 208 Q90 216 86 219" fill="none" stroke="${alpha(c.acc, 0.86)}" stroke-width="3" stroke-linecap="round"/>
      <path d="M102 208 Q100 218 96 221" fill="none" stroke="${alpha(c.acc, 0.86)}" stroke-width="3" stroke-linecap="round"/>
      <path d="M120 208 Q118 217 114 220" fill="none" stroke="${alpha(c.acc, 0.86)}" stroke-width="3" stroke-linecap="round"/>
      <path d="M129 207 Q128 217 124 220" fill="none" stroke="${alpha(c.acc, 0.86)}" stroke-width="3" stroke-linecap="round"/>
    `
  });
}

function renderFox(c) {
  return shell({
    viewBox: '0 0 220 240',
    origin: '108px 224px',
    sway: 1.5,
    dur: 3.4,
    body: `
      <ellipse cx="109" cy="224" rx="31" ry="6" fill="${alpha('#8d7b67', 0.12)}" filter="url(#soft)"/>
      <path d="M72 192 Q73 150 97 120 Q114 98 140 104 Q152 112 156 132 Q160 155 150 177 Q143 194 126 204 Q107 210 89 204 Q72 198 72 192Z" fill="${alpha(c.top, 0.78)}"/>
      <path d="M108 106 Q132 95 154 111" fill="${alpha(c.top, 0.8)}"/>
      <path d="M96 104 Q92 79 77 60 L95 67" fill="${alpha(c.top, 0.9)}"/>
      <path d="M124 101 Q136 78 150 60 L143 82" fill="${alpha(c.top, 0.88)}"/>
      <path d="M98 111 Q114 127 116 160 Q114 189 103 206 Q95 208 88 205 Q84 178 85 143 Q86 127 98 111Z" fill="${alpha(c.skin, 0.9)}"/>
      <path d="M118 167 Q143 171 159 154 Q177 162 180 184 Q176 204 156 205 Q142 201 132 186" fill="${alpha(c.top, 0.8)}"/>
      <path d="M142 172 Q155 177 165 169" fill="none" stroke="${alpha(c.skin, 0.9)}" stroke-width="7" stroke-linecap="round"/>
      <ellipse cx="106" cy="108" rx="2.8" ry="3.2" fill="${alpha(HOUSE_INK, 0.88)}"/>
      <ellipse cx="123" cy="100" rx="2.7" ry="3.1" fill="${alpha(HOUSE_INK, 0.88)}"/>
      <path d="M98 121 Q91 124 90 129" fill="none" class="line" stroke-width="1.1" opacity=".5"/>
      <path d="M99 191 Q96 205 95 211" fill="none" stroke="${alpha(c.shoes, 0.88)}" stroke-width="6" stroke-linecap="round"/>
      <path d="M123 191 Q126 204 127 210" fill="none" stroke="${alpha(c.shoes, 0.88)}" stroke-width="6" stroke-linecap="round"/>
      ${splatters(c.acc, [[41, 81, 2.3, 0.18], [169, 72, 2.4, 0.18], [152, 203, 1.9, 0.14]])}
    `
  });
}

const TEMPLATES = {
  girl_standing: (c, s) => renderGirlStanding(c, s),
  girl_walking: (c, s) => renderGirlWalking(c, s),
  boy_standing: (c, s) => renderBoyStanding(c, s),
  person_sitting: (c, s) => renderPersonSitting(c, s),
  cat: (c, s) => renderCat(c, s),
  rabbit: (c, s) => renderRabbit(c, s),
  dog: (c, s) => renderDog(c, s),
  bird: (c, s) => renderBird(c, s),
  fox: (c, s) => renderFox(c, s),
};

const DEFAULT_COLORS = {
  girl_standing: { hair: '#4b372d', skin: '#f0d1bf', top: '#ece6db', bottom: '#39424e', shoes: '#ece7df', acc: '#a56a68' },
  girl_walking: { hair: '#4c372d', skin: '#efd0bf', top: '#e9e4da', bottom: '#2f3a46', shoes: '#f3f0eb', acc: '#8d5f67' },
  boy_standing: { hair: '#3f2f25', skin: '#e5c1ab', top: '#6a7884', bottom: '#222b35', shoes: '#2b2c31', acc: '#c59b46' },
  person_sitting: { hair: '#3f3028', skin: '#edcbb8', top: '#efe9dd', bottom: '#424c58', shoes: '#f5f1ea', acc: '#3a4f73' },
  cat: { hair: '#cc8a4f', skin: '#f4e4d2', top: '#d0894d', bottom: '#6d3a24', shoes: '#4b2f23', acc: '#f6e7cb' },
  rabbit: { hair: '#d7c5b0', skin: '#f7eee5', top: '#d8c7b0', bottom: '#bfa892', shoes: '#9a8473', acc: '#efb6b0' },
  dog: { hair: '#b27d54', skin: '#efd9c7', top: '#b67c4f', bottom: '#704934', shoes: '#4b3127', acc: '#d9b48b' },
  bird: { hair: '#d9bf55', skin: '#f4df82', top: '#efcf55', bottom: '#92753a', shoes: '#d88746', acc: '#b77d28' },
  fox: { hair: '#cf6f2f', skin: '#f8ecd8', top: '#de7330', bottom: '#2c221f', shoes: '#2c221f', acc: '#f7efdb' },
};

const ANALYSIS_RESPONSE_SCHEMA = {
  type: 'object',
  required: ['subjectType', 'templateHint', 'colors', 'style'],
  properties: {
    subjectType: { type: 'string' },
    templateHint: { type: 'string' },
    colors: {
      type: 'object',
      required: ['hair', 'skin', 'top', 'bottom', 'shoes', 'acc'],
      properties: {
        hair: { type: 'string' },
        skin: { type: 'string' },
        top: { type: 'string' },
        bottom: { type: 'string' },
        shoes: { type: 'string' },
        acc: { type: 'string' },
      }
    },
    style: {
      type: 'object',
      required: ['hairLength', 'hairTexture', 'headwear', 'eyewear', 'outerwear', 'carry', 'fluff', 'markings'],
      properties: {
        hairLength: { type: 'string' },
        hairTexture: { type: 'string' },
        headwear: { type: 'string' },
        eyewear: { type: 'string' },
        outerwear: { type: 'string' },
        carry: { type: 'string' },
        fluff: { type: 'string' },
        markings: { type: 'string' },
      }
    }
  }
};

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
    try { return JSON.parse(match[0]); } catch { return null; }
  }
}

function pickFallbackTemplate(analysis = {}) {
  const raw = `${analysis.templateHint || ''} ${analysis.subjectType || ''}`.toLowerCase();
  if (raw.includes('fox') || raw.includes('狐狸')) return 'fox';
  if (raw.includes('bird') || raw.includes('chick') || raw.includes('duck') || raw.includes('鸡') || raw.includes('鸟')) return 'bird';
  if (raw.includes('cat') || raw.includes('猫')) return 'cat';
  if (raw.includes('rabbit') || raw.includes('bunny') || raw.includes('兔')) return 'rabbit';
  if (raw.includes('dog') || raw.includes('狗')) return 'dog';
  if (raw.includes('sit') || raw.includes('seated') || raw.includes('坐')) return 'person_sitting';
  if (raw.includes('walk') || raw.includes('walking') || raw.includes('走')) return 'girl_walking';
  if (raw.includes('boy') || raw.includes('man') || raw.includes('male') || raw.includes('男')) return 'boy_standing';
  return 'girl_standing';
}

function buildSvg(analysis = {}) {
  const template = TEMPLATES[analysis.templateHint] ? analysis.templateHint : pickFallbackTemplate(analysis);
  const defaults = DEFAULT_COLORS[template];
  const colors = {};
  for (const key of ['hair', 'skin', 'top', 'bottom', 'shoes', 'acc']) {
    colors[key] = normalizeHexColor(analysis.colors?.[key], defaults[key]);
  }
  const style = normalizeStyle(analysis.style || {});
  return { template, colors, style, svg: TEMPLATES[template](colors, style) };
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { imageBase64, mediaType } = req.body;
    if (!imageBase64 || !mediaType) {
      return res.status(400).json({ error: 'Missing image data' });
    }
    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ error: 'Missing GEMINI_API_KEY' });
    }

    const analysisPrompt = `Analyze the uploaded photo and return ONLY a JSON object matching the provided schema.

This app has a fixed house style:
- Humans become elegant white-background watercolor fashion illustrations.
- Animals become soft fluffy watercolor ink sketches with light splatters.
- Do NOT describe the house style in the output. Only extract subject features needed for rendering.

Choose the best templateHint from:
"girl_walking", "girl_standing", "boy_standing", "person_sitting", "cat", "rabbit", "dog", "bird", "fox"

Rules:
- Detect whether the subject is a human or animal.
- For humans, infer pose, hair color, hair length, hair texture, headwear, eyewear, outerwear feel, and whether there is a visible bag/strap.
- For animals, focus on main fur/feather colors, light belly color, accent color, fluffiness, and visible markings.
- Return tasteful muted watercolor colors, not neon.
- If unsure, prefer simple clean outputs over overfitting.

Style enums:
- hairLength: short | medium | long
- hairTexture: straight | wavy | curly
- headwear: none | cap | beanie | hat
- eyewear: none | glasses | sunglasses
- outerwear: shirt | sweater | hoodie | jacket | coat | dress
- carry: none | bag | strap
- fluff: soft | fluffy | sleek
- markings: none | light | patch | striped

Return no markdown, no prose, no code fences.`;

    const apiRes = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent', {
      method: 'POST',
      headers: {
        'x-goog-api-key': process.env.GEMINI_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          role: 'user',
          parts: [
            { text: analysisPrompt },
            { inline_data: { mime_type: mediaType, data: imageBase64 } }
          ]
        }],
        generationConfig: {
          temperature: 0.25,
          maxOutputTokens: 1400,
          responseMimeType: 'application/json',
          responseJsonSchema: ANALYSIS_RESPONSE_SCHEMA
        }
      })
    });

    if (!apiRes.ok) {
      const errText = await apiRes.text();
      console.error('Gemini HTTP error:', apiRes.status, errText);
      return res.status(500).json({ error: `Gemini API error (${apiRes.status})` });
    }

    const data = await apiRes.json();
    if (data.error || data.promptFeedback?.blockReason) {
      console.error('Gemini error:', JSON.stringify(data.error || data.promptFeedback));
      return res.status(500).json({
        error: data.error?.message || data.promptFeedback?.blockReason || 'Gemini rejected the request'
      });
    }

    const raw = extractGeminiText(data);
    console.log('Gemini analysis:', raw.slice(0, 400));
    const analysis = parseJsonLoose(raw) || {};
    const result = buildSvg(analysis);
    console.log('Template:', result.template, 'Colors:', JSON.stringify(result.colors), 'Style:', JSON.stringify(result.style));

    return res.json({
      svg: result.svg,
      source: 'house-style-template',
      subjectType: analysis.subjectType || 'unknown',
      templateHint: result.template
    });
  } catch (err) {
    console.error('Handler error:', err);
    return res.status(500).json({ error: err.message });
  }
}
