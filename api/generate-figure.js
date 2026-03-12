// ═══════════════════════════════════════════════════
//  Beautiful pre-made watercolor SVG templates
//  AI only selects template + color palette from photo
// ═══════════════════════════════════════════════════

const TEMPLATES = {

girl_walking: (c) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 300">
<defs><filter id="wc"><feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" seed="5" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="2.5" xChannelSelector="R" yChannelSelector="G" result="d"/><feGaussianBlur in="d" stdDeviation="0.5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
<style>@keyframes sway{0%,100%{transform:rotate(-1.5deg)}50%{transform:rotate(1.5deg)}}.fig{animation:sway 3.8s ease-in-out infinite;transform-origin:100px 290px;}</style>
<g class="fig" filter="url(#wc)">
<ellipse cx="105" cy="292" rx="32" ry="6" fill="#8b7b6b" opacity="0.1"/>
<path d="M88 210 Q84 240 80 265 Q79 272 82 275 L92 276 Q93 272 92 268 Q94 242 96 215" fill="${c.bottom}" opacity="0.7" stroke="#2d1a10" stroke-width="0.5" stroke-opacity="0.4"/>
<ellipse cx="86" cy="276" rx="10" ry="5" fill="${c.shoes}" opacity="0.8" stroke="#2d1a10" stroke-width="0.4" stroke-opacity="0.4"/>
<path d="M108 208 Q115 235 122 258 Q124 266 120 270 L110 272 Q108 266 109 260 Q106 238 105 213" fill="${c.bottom}" opacity="0.75" stroke="#2d1a10" stroke-width="0.5" stroke-opacity="0.4"/>
<path d="M108 208 Q116 237 123 260" fill="none" stroke="${c.bottom}" stroke-width="3" opacity="0.3"/>
<ellipse cx="116" cy="271" rx="10" ry="5" fill="${c.shoes}" opacity="0.8" stroke="#2d1a10" stroke-width="0.4" stroke-opacity="0.4"/>
<path d="M82 130 Q78 155 80 180 Q82 200 88 212 L112 210 Q116 198 118 180 Q120 155 116 130 Z" fill="${c.top}" opacity="0.65"/>
<path d="M84 132 Q80 158 82 182 Q84 200 89 211 L111 209 Q115 197 117 180 Q119 156 115 132 Z" fill="${c.top}" opacity="0.5"/>
<path d="M82 130 Q78 155 80 180 Q82 200 88 212 L112 210 Q116 198 118 180 Q120 155 116 130 Z" fill="none" stroke="#2d1a10" stroke-width="0.6" stroke-opacity="0.35"/>
<path d="M90 130 Q100 138 108 130" fill="none" stroke="#2d1a10" stroke-width="0.5" stroke-opacity="0.3"/>
<path d="M82 138 Q72 158 68 178 Q66 184 70 186" fill="${c.top}" opacity="0.6" stroke="#2d1a10" stroke-width="0.5" stroke-opacity="0.35"/>
<ellipse cx="69" cy="185" rx="5" ry="4" fill="${c.skin}" opacity="0.75"/>
<path d="M116 138 Q126 156 130 174 Q132 180 128 183" fill="${c.top}" opacity="0.6" stroke="#2d1a10" stroke-width="0.5" stroke-opacity="0.35"/>
<ellipse cx="129" cy="182" rx="5" ry="4" fill="${c.skin}" opacity="0.75"/>
<rect x="94" y="118" width="12" height="14" rx="4" fill="${c.skin}" opacity="0.7"/>
<ellipse cx="100" cy="95" rx="28" ry="32" fill="${c.skin}" opacity="0.6"/>
<ellipse cx="100" cy="96" rx="26" ry="30" fill="${c.skin}" opacity="0.5"/>
<ellipse cx="84" cy="102" rx="7" ry="4" fill="#e8a0a0" opacity="0.35"/>
<ellipse cx="116" cy="102" rx="7" ry="4" fill="#e8a0a0" opacity="0.35"/>
<ellipse cx="90" cy="93" rx="3" ry="3.5" fill="#2d1a10" opacity="0.7"/>
<ellipse cx="110" cy="93" rx="3" ry="3.5" fill="#2d1a10" opacity="0.7"/>
<ellipse cx="91" cy="92" rx="1.2" ry="1.2" fill="white" opacity="0.8"/>
<ellipse cx="111" cy="92" rx="1.2" ry="1.2" fill="white" opacity="0.8"/>
<path d="M96 106 Q100 110 104 106" fill="none" stroke="#c4795a" stroke-width="0.8" opacity="0.5" stroke-linecap="round"/>
<path d="M72 82 Q74 60 100 55 Q126 60 128 82 Q130 72 125 62 Q110 50 100 48 Q90 50 75 62 Q70 72 72 82Z" fill="${c.hair}" opacity="0.75"/>
<path d="M72 82 Q70 95 72 115 Q73 120 76 118 Q74 100 75 88" fill="${c.hair}" opacity="0.6"/>
<path d="M128 82 Q130 95 128 115 Q127 120 124 118 Q126 100 125 88" fill="${c.hair}" opacity="0.6"/>
<path d="M78 65 Q85 58 95 55" fill="none" stroke="${c.hair}" stroke-width="2" opacity="0.3"/>
<path d="M90 135 L82 210" stroke="${c.acc}" stroke-width="2.5" opacity="0.6" stroke-linecap="round"/>
<ellipse cx="80" cy="215" rx="12" ry="15" fill="${c.acc}" opacity="0.55" stroke="#2d1a10" stroke-width="0.4" stroke-opacity="0.3"/>
</g></svg>`,

girl_standing: (c) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 300">
<defs><filter id="wc"><feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" seed="3" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="2.5" xChannelSelector="R" yChannelSelector="G" result="d"/><feGaussianBlur in="d" stdDeviation="0.5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
<style>@keyframes sway{0%,100%{transform:rotate(-1deg)}50%{transform:rotate(1deg)}}.fig{animation:sway 4.2s ease-in-out infinite;transform-origin:100px 292px;}</style>
<g class="fig" filter="url(#wc)">
<ellipse cx="100" cy="292" rx="28" ry="5" fill="#8b7b6b" opacity="0.1"/>
<path d="M90 215 Q88 245 87 268 Q86 275 90 278 L98 278 Q97 272 96 265 Q95 245 94 218" fill="${c.bottom}" opacity="0.7" stroke="#2d1a10" stroke-width="0.5" stroke-opacity="0.35"/>
<path d="M106 215 Q108 245 109 268 Q110 275 106 278 L98 278 Q99 272 100 265 Q101 245 103 218" fill="${c.bottom}" opacity="0.72" stroke="#2d1a10" stroke-width="0.5" stroke-opacity="0.35"/>
<ellipse cx="93" cy="279" rx="9" ry="4.5" fill="${c.shoes}" opacity="0.8" stroke="#2d1a10" stroke-width="0.4" stroke-opacity="0.35"/>
<ellipse cx="103" cy="279" rx="9" ry="4.5" fill="${c.shoes}" opacity="0.8" stroke="#2d1a10" stroke-width="0.4" stroke-opacity="0.35"/>
<path d="M78 185 Q76 200 74 218 L122 218 Q120 200 118 185Z" fill="${c.bottom}" opacity="0.45"/>
<path d="M80 186 Q78 200 76 216 L120 216 Q118 200 116 186Z" fill="${c.bottom}" opacity="0.55"/>
<path d="M84 128 Q80 150 80 170 Q80 182 82 188 L116 188 Q118 182 118 170 Q118 150 114 128Z" fill="${c.top}" opacity="0.6"/>
<path d="M86 130 Q82 152 82 172 Q82 182 84 187 L114 187 Q116 182 116 172 Q116 152 112 130Z" fill="${c.top}" opacity="0.5"/>
<path d="M84 128 Q80 150 80 170 Q80 182 82 188 L116 188 Q118 182 118 170 Q118 150 114 128Z" fill="none" stroke="#2d1a10" stroke-width="0.5" stroke-opacity="0.3"/>
<rect x="80" y="183" width="38" height="4" rx="2" fill="${c.acc}" opacity="0.5"/>
<path d="M84 136 Q72 150 66 170 Q64 176 68 178" fill="${c.top}" opacity="0.55" stroke="#2d1a10" stroke-width="0.5" stroke-opacity="0.3"/>
<ellipse cx="67" cy="177" rx="5" ry="4.5" fill="${c.skin}" opacity="0.7"/>
<path d="M114 136 Q126 150 132 170 Q134 176 130 178" fill="${c.top}" opacity="0.55" stroke="#2d1a10" stroke-width="0.5" stroke-opacity="0.3"/>
<ellipse cx="131" cy="177" rx="5" ry="4.5" fill="${c.skin}" opacity="0.7"/>
<rect x="94" y="116" width="12" height="14" rx="4" fill="${c.skin}" opacity="0.65"/>
<ellipse cx="100" cy="92" rx="27" ry="31" fill="${c.skin}" opacity="0.55"/>
<ellipse cx="100" cy="93" rx="25" ry="29" fill="${c.skin}" opacity="0.5"/>
<ellipse cx="85" cy="99" rx="6" ry="4" fill="#e8a0a0" opacity="0.35"/>
<ellipse cx="115" cy="99" rx="6" ry="4" fill="#e8a0a0" opacity="0.35"/>
<ellipse cx="91" cy="90" rx="2.8" ry="3.5" fill="#2d1a10" opacity="0.7"/>
<ellipse cx="109" cy="90" rx="2.8" ry="3.5" fill="#2d1a10" opacity="0.7"/>
<ellipse cx="92" cy="89" rx="1" ry="1" fill="white" opacity="0.85"/>
<ellipse cx="110" cy="89" rx="1" ry="1" fill="white" opacity="0.85"/>
<path d="M96 103 Q100 107 104 103" fill="none" stroke="#c4795a" stroke-width="0.7" opacity="0.5" stroke-linecap="round"/>
<path d="M73 80 Q76 58 100 52 Q124 58 127 80 Q130 68 122 56 Q110 46 100 44 Q90 46 78 56 Q70 68 73 80Z" fill="${c.hair}" opacity="0.7"/>
<path d="M73 80 Q70 100 68 130 Q67 142 72 140 Q73 125 74 105 Q74 90 76 82" fill="${c.hair}" opacity="0.55"/>
<path d="M127 80 Q130 100 132 130 Q133 142 128 140 Q127 125 126 105 Q126 90 124 82" fill="${c.hair}" opacity="0.55"/>
<path d="M73 80 Q68 105 66 140 Q65 148 70 146 Q68 120 70 100" fill="${c.hair}" opacity="0.35"/>
<path d="M127 80 Q132 105 134 140 Q135 148 130 146 Q132 120 130 100" fill="${c.hair}" opacity="0.35"/>
<ellipse cx="100" cy="68" rx="35" ry="8" fill="${c.acc}" opacity="0.5"/>
<path d="M78 68 Q78 48 100 42 Q122 48 122 68" fill="${c.acc}" opacity="0.6"/>
</g></svg>`,

boy_standing: (c) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 300">
<defs><filter id="wc"><feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" seed="8" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="2" xChannelSelector="R" yChannelSelector="G" result="d"/><feGaussianBlur in="d" stdDeviation="0.5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
<style>@keyframes sway{0%,100%{transform:rotate(-1.2deg)}50%{transform:rotate(1.2deg)}}.fig{animation:sway 4s ease-in-out infinite;transform-origin:100px 290px;}</style>
<g class="fig" filter="url(#wc)">
<ellipse cx="100" cy="290" rx="30" ry="5" fill="#8b7b6b" opacity="0.1"/>
<path d="M88 210 Q86 240 85 262 Q84 270 88 274 L96 274 Q95 268 94 260 Q93 240 92 214" fill="${c.bottom}" opacity="0.7" stroke="#2d1a10" stroke-width="0.5" stroke-opacity="0.35"/>
<path d="M108 210 Q110 240 111 262 Q112 270 108 274 L100 274 Q101 268 102 260 Q103 240 104 214" fill="${c.bottom}" opacity="0.72" stroke="#2d1a10" stroke-width="0.5" stroke-opacity="0.35"/>
<ellipse cx="91" cy="276" rx="10" ry="5" fill="${c.shoes}" opacity="0.8" stroke="#2d1a10" stroke-width="0.4" stroke-opacity="0.3"/>
<ellipse cx="105" cy="276" rx="10" ry="5" fill="${c.shoes}" opacity="0.8" stroke="#2d1a10" stroke-width="0.4" stroke-opacity="0.3"/>
<path d="M80 125 Q76 155 78 180 Q80 198 84 212 L114 212 Q118 198 120 180 Q122 155 118 125Z" fill="${c.top}" opacity="0.6"/>
<path d="M82 127 Q78 157 80 182 Q82 198 86 211 L112 211 Q116 198 118 182 Q120 157 116 127Z" fill="${c.top}" opacity="0.48"/>
<path d="M80 125 Q76 155 78 180 Q80 198 84 212 L114 212 Q118 198 120 180 Q122 155 118 125Z" fill="none" stroke="#2d1a10" stroke-width="0.5" stroke-opacity="0.3"/>
<rect x="86" y="170" width="10" height="8" rx="2" fill="#2d1a10" opacity="0.08"/>
<path d="M80 132 Q68 152 64 172 Q62 178 66 182" fill="${c.top}" opacity="0.55" stroke="#2d1a10" stroke-width="0.5" stroke-opacity="0.3"/>
<ellipse cx="65" cy="181" rx="5.5" ry="5" fill="${c.skin}" opacity="0.7"/>
<path d="M118 132 Q128 148 134 165 Q136 172 132 176" fill="${c.top}" opacity="0.55" stroke="#2d1a10" stroke-width="0.5" stroke-opacity="0.3"/>
<ellipse cx="133" cy="175" rx="5.5" ry="5" fill="${c.skin}" opacity="0.7"/>
<rect x="93" y="113" width="14" height="14" rx="5" fill="${c.skin}" opacity="0.65"/>
<ellipse cx="100" cy="88" rx="28" ry="30" fill="${c.skin}" opacity="0.55"/>
<ellipse cx="100" cy="89" rx="26" ry="28" fill="${c.skin}" opacity="0.5"/>
<ellipse cx="84" cy="96" rx="6" ry="3.5" fill="#e8a0a0" opacity="0.3"/>
<ellipse cx="116" cy="96" rx="6" ry="3.5" fill="#e8a0a0" opacity="0.3"/>
<ellipse cx="90" cy="87" rx="3" ry="3.5" fill="#2d1a10" opacity="0.7"/>
<ellipse cx="110" cy="87" rx="3" ry="3.5" fill="#2d1a10" opacity="0.7"/>
<ellipse cx="91" cy="86" rx="1.2" ry="1.2" fill="white" opacity="0.8"/>
<ellipse cx="111" cy="86" rx="1.2" ry="1.2" fill="white" opacity="0.8"/>
<path d="M96 100 Q100 103 104 100" fill="none" stroke="#c4795a" stroke-width="0.7" opacity="0.45" stroke-linecap="round"/>
<path d="M72 80 Q74 60 100 54 Q126 60 128 80 Q130 70 124 58 Q112 48 100 46 Q88 48 76 58 Q70 70 72 80Z" fill="${c.hair}" opacity="0.75"/>
<path d="M72 80 Q70 88 72 92 Q74 86 73 82" fill="${c.hair}" opacity="0.5"/>
<path d="M128 80 Q130 88 128 92 Q126 86 127 82" fill="${c.hair}" opacity="0.5"/>
<path d="M80 62 Q90 55 100 54" fill="none" stroke="${c.hair}" stroke-width="2.5" opacity="0.3"/>
</g></svg>`,

person_sitting: (c) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 260">
<defs><filter id="wc"><feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" seed="4" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="2" xChannelSelector="R" yChannelSelector="G" result="d"/><feGaussianBlur in="d" stdDeviation="0.5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
<style>@keyframes sway{0%,100%{transform:rotate(-0.8deg)}50%{transform:rotate(0.8deg)}}.fig{animation:sway 5s ease-in-out infinite;transform-origin:110px 252px;}</style>
<g class="fig" filter="url(#wc)">
<ellipse cx="110" cy="250" rx="40" ry="5" fill="#8b7b6b" opacity="0.08"/>
<path d="M85 195 Q95 196 120 194 Q140 192 155 198 Q158 202 155 206 L148 210 Q140 205 120 202 Q100 204 88 206 Q82 204 82 200Z" fill="${c.bottom}" opacity="0.65" stroke="#2d1a10" stroke-width="0.5" stroke-opacity="0.3"/>
<path d="M150 200 Q155 220 156 238 Q156 244 152 246" fill="${c.bottom}" opacity="0.65" stroke="#2d1a10" stroke-width="0.5" stroke-opacity="0.3"/>
<path d="M142 202 Q146 222 148 238 Q148 244 144 246" fill="${c.bottom}" opacity="0.6"/>
<ellipse cx="150" cy="247" rx="10" ry="5" fill="${c.shoes}" opacity="0.75" stroke="#2d1a10" stroke-width="0.4" stroke-opacity="0.3"/>
<rect x="72" y="198" width="55" height="5" rx="2.5" fill="#8b7b6b" opacity="0.12"/>
<path d="M82 115 Q78 140 78 160 Q78 180 82 198 L118 196 Q120 178 120 160 Q120 140 118 115Z" fill="${c.top}" opacity="0.6"/>
<path d="M84 117 Q80 142 80 162 Q80 180 83 196 L116 195 Q118 178 118 162 Q118 142 116 117Z" fill="${c.top}" opacity="0.48"/>
<path d="M82 115 Q78 140 78 160 Q78 180 82 198 L118 196 Q120 178 120 160 Q120 140 118 115Z" fill="none" stroke="#2d1a10" stroke-width="0.5" stroke-opacity="0.28"/>
<path d="M82 130 Q72 150 70 170 Q68 180 74 185 Q80 188 88 190" fill="${c.top}" opacity="0.55" stroke="#2d1a10" stroke-width="0.5" stroke-opacity="0.25"/>
<ellipse cx="86" cy="192" rx="6" ry="4" fill="${c.skin}" opacity="0.7"/>
<path d="M118 130 Q128 148 130 168 Q132 178 126 184 Q120 188 112 190" fill="${c.top}" opacity="0.55" stroke="#2d1a10" stroke-width="0.5" stroke-opacity="0.25"/>
<ellipse cx="114" cy="192" rx="6" ry="4" fill="${c.skin}" opacity="0.7"/>
<rect x="93" y="102" width="14" height="14" rx="5" fill="${c.skin}" opacity="0.65"/>
<ellipse cx="100" cy="78" rx="28" ry="30" fill="${c.skin}" opacity="0.55"/>
<ellipse cx="100" cy="79" rx="26" ry="28" fill="${c.skin}" opacity="0.48"/>
<ellipse cx="84" cy="86" rx="6" ry="3.5" fill="#e8a0a0" opacity="0.3"/>
<ellipse cx="116" cy="86" rx="6" ry="3.5" fill="#e8a0a0" opacity="0.3"/>
<ellipse cx="90" cy="77" rx="3" ry="3.5" fill="#2d1a10" opacity="0.65"/>
<ellipse cx="110" cy="77" rx="3" ry="3.5" fill="#2d1a10" opacity="0.65"/>
<ellipse cx="91" cy="76" rx="1.2" ry="1.2" fill="white" opacity="0.8"/>
<ellipse cx="111" cy="76" rx="1.2" ry="1.2" fill="white" opacity="0.8"/>
<path d="M96 90 Q100 94 104 90" fill="none" stroke="#c4795a" stroke-width="0.7" opacity="0.45" stroke-linecap="round"/>
<path d="M72 70 Q74 50 100 44 Q126 50 128 70 Q130 60 122 48 Q110 40 100 38 Q90 40 78 48 Q70 60 72 70Z" fill="${c.hair}" opacity="0.7"/>
<path d="M72 70 Q70 80 71 90 Q72 86 73 78" fill="${c.hair}" opacity="0.5"/>
<path d="M128 70 Q130 80 129 90 Q128 86 127 78" fill="${c.hair}" opacity="0.5"/>
<ellipse cx="100" cy="56" rx="36" ry="7" fill="${c.acc}" opacity="0.5"/>
<path d="M78 56 Q80 36 100 30 Q120 36 122 56" fill="${c.acc}" opacity="0.6" stroke="#2d1a10" stroke-width="0.3" stroke-opacity="0.2"/>
</g></svg>`,

cat: (c) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
<defs><filter id="wc"><feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" seed="6" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="2" xChannelSelector="R" yChannelSelector="G" result="d"/><feGaussianBlur in="d" stdDeviation="0.5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
<style>@keyframes sway{0%,100%{transform:rotate(-2deg)}50%{transform:rotate(2deg)}}.fig{animation:sway 3.5s ease-in-out infinite;transform-origin:100px 185px;}</style>
<g class="fig" filter="url(#wc)">
<ellipse cx="100" cy="184" rx="30" ry="5" fill="#8b7b6b" opacity="0.1"/>
<path d="M130 145 Q150 130 158 110 Q162 100 155 98" fill="none" stroke="${c.top}" stroke-width="5" opacity="0.6" stroke-linecap="round"/>
<path d="M130 145 Q150 130 158 110" fill="none" stroke="${c.top}" stroke-width="3" opacity="0.35" stroke-linecap="round"/>
<ellipse cx="100" cy="148" rx="35" ry="32" fill="${c.top}" opacity="0.6"/>
<ellipse cx="100" cy="150" rx="33" ry="30" fill="${c.top}" opacity="0.5"/>
<ellipse cx="100" cy="155" rx="25" ry="18" fill="${c.skin}" opacity="0.4"/>
<ellipse cx="100" cy="148" rx="35" ry="32" fill="none" stroke="#2d1a10" stroke-width="0.5" stroke-opacity="0.25"/>
<ellipse cx="82" cy="176" rx="8" ry="6" fill="${c.top}" opacity="0.65" stroke="#2d1a10" stroke-width="0.4" stroke-opacity="0.25"/>
<ellipse cx="118" cy="176" rx="8" ry="6" fill="${c.top}" opacity="0.65" stroke="#2d1a10" stroke-width="0.4" stroke-opacity="0.25"/>
<ellipse cx="100" cy="100" rx="32" ry="28" fill="${c.top}" opacity="0.6"/>
<ellipse cx="100" cy="101" rx="30" ry="26" fill="${c.top}" opacity="0.5"/>
<ellipse cx="100" cy="105" rx="18" ry="14" fill="${c.skin}" opacity="0.35"/>
<path d="M72 82 L65 55 L82 75Z" fill="${c.top}" opacity="0.7" stroke="#2d1a10" stroke-width="0.4" stroke-opacity="0.3"/>
<path d="M74 80 L68 60 L80 76Z" fill="${c.acc}" opacity="0.4"/>
<path d="M128 82 L135 55 L118 75Z" fill="${c.top}" opacity="0.7" stroke="#2d1a10" stroke-width="0.4" stroke-opacity="0.3"/>
<path d="M126 80 L132 60 L120 76Z" fill="${c.acc}" opacity="0.4"/>
<ellipse cx="88" cy="95" rx="4" ry="5" fill="#557744" opacity="0.65"/>
<ellipse cx="88" cy="95" rx="2.5" ry="4" fill="#2d1a10" opacity="0.7"/>
<ellipse cx="89" cy="93" rx="1.5" ry="1.5" fill="white" opacity="0.8"/>
<ellipse cx="112" cy="95" rx="4" ry="5" fill="#557744" opacity="0.65"/>
<ellipse cx="112" cy="95" rx="2.5" ry="4" fill="#2d1a10" opacity="0.7"/>
<ellipse cx="113" cy="93" rx="1.5" ry="1.5" fill="white" opacity="0.8"/>
<path d="M98 104 L100 107 L102 104Z" fill="#e8a0a0" opacity="0.65"/>
<path d="M100 107 Q96 112 92 110" fill="none" stroke="#2d1a10" stroke-width="0.5" opacity="0.35" stroke-linecap="round"/>
<path d="M100 107 Q104 112 108 110" fill="none" stroke="#2d1a10" stroke-width="0.5" opacity="0.35" stroke-linecap="round"/>
<line x1="75" y1="100" x2="60" y2="97" stroke="#2d1a10" stroke-width="0.4" opacity="0.2"/>
<line x1="75" y1="104" x2="58" y2="106" stroke="#2d1a10" stroke-width="0.4" opacity="0.2"/>
<line x1="125" y1="100" x2="140" y2="97" stroke="#2d1a10" stroke-width="0.4" opacity="0.2"/>
<line x1="125" y1="104" x2="142" y2="106" stroke="#2d1a10" stroke-width="0.4" opacity="0.2"/>
<ellipse cx="82" cy="105" rx="5" ry="3" fill="#e8a0a0" opacity="0.3"/>
<ellipse cx="118" cy="105" rx="5" ry="3" fill="#e8a0a0" opacity="0.3"/>
</g></svg>`,

rabbit: (c) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 220">
<defs><filter id="wc"><feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" seed="2" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="2" xChannelSelector="R" yChannelSelector="G" result="d"/><feGaussianBlur in="d" stdDeviation="0.5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
<style>@keyframes sway{0%,100%{transform:rotate(-2deg)}50%{transform:rotate(2deg)}}.fig{animation:sway 3.2s ease-in-out infinite;transform-origin:100px 205px;}</style>
<g class="fig" filter="url(#wc)">
<ellipse cx="100" cy="204" rx="28" ry="5" fill="#8b7b6b" opacity="0.1"/>
<ellipse cx="100" cy="162" rx="38" ry="40" fill="${c.top}" opacity="0.6"/>
<ellipse cx="100" cy="164" rx="36" ry="38" fill="${c.top}" opacity="0.48"/>
<ellipse cx="100" cy="170" rx="26" ry="22" fill="${c.skin}" opacity="0.35"/>
<ellipse cx="100" cy="162" rx="38" ry="40" fill="none" stroke="#2d1a10" stroke-width="0.5" stroke-opacity="0.25"/>
<ellipse cx="75" cy="196" rx="14" ry="7" fill="${c.top}" opacity="0.6" stroke="#2d1a10" stroke-width="0.4" stroke-opacity="0.25"/>
<ellipse cx="125" cy="196" rx="14" ry="7" fill="${c.top}" opacity="0.6" stroke="#2d1a10" stroke-width="0.4" stroke-opacity="0.25"/>
<ellipse cx="85" cy="194" rx="7" ry="5" fill="${c.top}" opacity="0.65"/>
<ellipse cx="115" cy="194" rx="7" ry="5" fill="${c.top}" opacity="0.65"/>
<ellipse cx="138" cy="165" rx="10" ry="9" fill="${c.skin}" opacity="0.5"/>
<ellipse cx="100" cy="105" rx="30" ry="28" fill="${c.top}" opacity="0.6"/>
<ellipse cx="100" cy="106" rx="28" ry="26" fill="${c.top}" opacity="0.5"/>
<ellipse cx="100" cy="110" rx="17" ry="13" fill="${c.skin}" opacity="0.35"/>
<path d="M82 82 Q78 45 72 20 Q70 12 75 14 Q82 18 88 55 Q90 70 86 82" fill="${c.top}" opacity="0.65" stroke="#2d1a10" stroke-width="0.5" stroke-opacity="0.3"/>
<path d="M84 80 Q80 48 76 25 Q78 22 80 25 Q85 50 87 78" fill="${c.acc}" opacity="0.4"/>
<path d="M118 82 Q122 45 128 20 Q130 12 125 14 Q118 18 112 55 Q110 70 114 82" fill="${c.top}" opacity="0.65" stroke="#2d1a10" stroke-width="0.5" stroke-opacity="0.3"/>
<path d="M116 80 Q120 48 124 25 Q122 22 120 25 Q115 50 113 78" fill="${c.acc}" opacity="0.4"/>
<ellipse cx="90" cy="100" rx="4.5" ry="5" fill="#2d1a10" opacity="0.7"/>
<ellipse cx="110" cy="100" rx="4.5" ry="5" fill="#2d1a10" opacity="0.7"/>
<ellipse cx="91.5" cy="98" rx="2" ry="2" fill="white" opacity="0.85"/>
<ellipse cx="111.5" cy="98" rx="2" ry="2" fill="white" opacity="0.85"/>
<ellipse cx="100" cy="110" rx="3.5" ry="2.5" fill="#e8a0a0" opacity="0.7"/>
<path d="M100 112 Q96 117 93 115" fill="none" stroke="#2d1a10" stroke-width="0.5" opacity="0.35" stroke-linecap="round"/>
<path d="M100 112 Q104 117 107 115" fill="none" stroke="#2d1a10" stroke-width="0.5" opacity="0.35" stroke-linecap="round"/>
<line x1="80" y1="107" x2="62" y2="104" stroke="#2d1a10" stroke-width="0.3" opacity="0.2"/>
<line x1="80" y1="112" x2="60" y2="114" stroke="#2d1a10" stroke-width="0.3" opacity="0.2"/>
<line x1="120" y1="107" x2="138" y2="104" stroke="#2d1a10" stroke-width="0.3" opacity="0.2"/>
<line x1="120" y1="112" x2="140" y2="114" stroke="#2d1a10" stroke-width="0.3" opacity="0.2"/>
<ellipse cx="83" cy="108" rx="6" ry="3.5" fill="#e8a0a0" opacity="0.35"/>
<ellipse cx="117" cy="108" rx="6" ry="3.5" fill="#e8a0a0" opacity="0.35"/>
</g></svg>`,

dog: (c) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
<defs><filter id="wc"><feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" seed="9" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="2" xChannelSelector="R" yChannelSelector="G" result="d"/><feGaussianBlur in="d" stdDeviation="0.5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
<style>@keyframes sway{0%,100%{transform:rotate(-1.5deg)}50%{transform:rotate(1.5deg)}}.fig{animation:sway 3s ease-in-out infinite;transform-origin:100px 188px;}</style>
<g class="fig" filter="url(#wc)">
<ellipse cx="100" cy="186" rx="30" ry="5" fill="#8b7b6b" opacity="0.1"/>
<path d="M60 130 Q45 115 42 100 Q40 92 45 94" fill="none" stroke="${c.top}" stroke-width="5" opacity="0.55" stroke-linecap="round"/>
<ellipse cx="98" cy="148" rx="40" ry="30" fill="${c.top}" opacity="0.6"/>
<ellipse cx="98" cy="150" rx="38" ry="28" fill="${c.top}" opacity="0.48"/>
<ellipse cx="98" cy="155" rx="28" ry="16" fill="${c.skin}" opacity="0.3"/>
<ellipse cx="98" cy="148" rx="40" ry="30" fill="none" stroke="#2d1a10" stroke-width="0.5" stroke-opacity="0.25"/>
<rect x="72" y="168" width="12" height="18" rx="5" fill="${c.top}" opacity="0.6" stroke="#2d1a10" stroke-width="0.4" stroke-opacity="0.25"/>
<rect x="112" y="168" width="12" height="18" rx="5" fill="${c.top}" opacity="0.6" stroke="#2d1a10" stroke-width="0.4" stroke-opacity="0.25"/>
<ellipse cx="78" cy="186" rx="8" ry="4.5" fill="${c.top}" opacity="0.65"/>
<ellipse cx="118" cy="186" rx="8" ry="4.5" fill="${c.top}" opacity="0.65"/>
<ellipse cx="130" cy="108" rx="30" ry="26" fill="${c.top}" opacity="0.6"/>
<ellipse cx="130" cy="109" rx="28" ry="24" fill="${c.top}" opacity="0.5"/>
<ellipse cx="148" cy="115" rx="14" ry="10" fill="${c.skin}" opacity="0.45"/>
<path d="M108 95 Q98 80 94 95 Q92 105 100 108" fill="${c.top}" opacity="0.65" stroke="#2d1a10" stroke-width="0.4" stroke-opacity="0.25"/>
<path d="M106 97 Q100 85 97 97" fill="${c.acc}" opacity="0.25"/>
<path d="M152 92 Q164 78 168 92 Q170 105 160 106" fill="${c.top}" opacity="0.65" stroke="#2d1a10" stroke-width="0.4" stroke-opacity="0.25"/>
<path d="M154 94 Q162 84 165 94" fill="${c.acc}" opacity="0.25"/>
<ellipse cx="122" cy="105" rx="4" ry="4.5" fill="#2d1a10" opacity="0.7"/>
<ellipse cx="140" cy="105" rx="4" ry="4.5" fill="#2d1a10" opacity="0.7"/>
<ellipse cx="123" cy="103.5" rx="1.5" ry="1.5" fill="white" opacity="0.85"/>
<ellipse cx="141" cy="103.5" rx="1.5" ry="1.5" fill="white" opacity="0.85"/>
<ellipse cx="152" cy="112" rx="4" ry="3" fill="#2d1a10" opacity="0.6"/>
<path d="M148 115 Q144 120 140 118" fill="none" stroke="#2d1a10" stroke-width="0.5" opacity="0.35" stroke-linecap="round"/>
<path d="M146 117 Q145 122 147 124 Q149 122 148 117" fill="#e8a0a0" opacity="0.5"/>
<ellipse cx="118" cy="112" rx="4" ry="2.5" fill="#e8a0a0" opacity="0.3"/>
<ellipse cx="144" cy="112" rx="4" ry="2.5" fill="#e8a0a0" opacity="0.3"/>
</g></svg>`

};

const DEFAULT_COLORS = {
  girl_walking: { hair:'#5c4033', skin:'#f0d5c0', top:'#e8e0d8', bottom:'#2d3748', shoes:'#8b6f5e', acc:'#c4795a' },
  girl_standing: { hair:'#6b4226', skin:'#f0d5c0', top:'#b8c8d8', bottom:'#d4c8a8', shoes:'#6b5040', acc:'#ddd0b0' },
  boy_standing:  { hair:'#3d2b1f', skin:'#e8cbb0', top:'#c4795a', bottom:'#7a8a9a', shoes:'#8b7560', acc:'#c9a05a' },
  person_sitting:{ hair:'#4a3520', skin:'#e8cbb0', top:'#c4795a', bottom:'#7a8a9a', shoes:'#8b7560', acc:'#d4c090' },
  cat:    { top:'#c8a882', skin:'#f5ece0', acc:'#e8b8a0', hair:'#c8a882', bottom:'#c8a882', shoes:'#c8a882' },
  rabbit: { top:'#c8a878', skin:'#f5ece0', acc:'#e8b0b0', hair:'#c8a878', bottom:'#c8a878', shoes:'#c8a878' },
  dog:    { top:'#d4a060', skin:'#f5e8d8', acc:'#c89060', hair:'#d4a060', bottom:'#d4a060', shoes:'#d4a060' },
};

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

    const analysisPrompt = `Analyze this photo. Respond with ONLY a JSON object — no markdown, no backticks, no other text.

Pick the best template and extract colors:
Templates: "girl_walking", "girl_standing", "boy_standing", "person_sitting", "cat", "rabbit", "dog"

JSON format:
{"template":"girl_walking","colors":{"hair":"#5c4033","skin":"#f0d5c0","top":"#e8e0d8","bottom":"#2d3748","shoes":"#8b6f5e","acc":"#c4795a"}}

- template: closest match to photo subject
- hair: hair color (animals: same as top)
- skin: skin tone, keep warm and light
- top: upper clothing / main fur color
- bottom: pants/skirt / fur color for animals
- shoes: shoe color / fur for animals
- acc: accessory accent color (bag, hat, collar)
- Use MUTED watercolor-like hex colors from the photo`;

    const apiRes = await fetch('https://open.bigmodel.cn/api/paas/v4/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.ZHIPU_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'glm-4v-flash',
        messages: [{ role: 'user', content: [
          { type: 'image_url', image_url: { url: imageBase64 } },
          { type: 'text', text: analysisPrompt }
        ]}]
      })
    });

    const data = await apiRes.json();
    if (data.error) {
      console.error('Zhipu error:', JSON.stringify(data.error));
      return res.status(500).json({ error: data.error.message || JSON.stringify(data.error) });
    }

    let raw = (data.choices?.[0]?.message?.content || '').trim();
    raw = raw.replace(/^```[a-zA-Z]*\n?/, '').replace(/\n?```$/, '').trim();
    console.log('AI response:', raw.slice(0, 300));

    let analysis;
    try { analysis = JSON.parse(raw); } catch {
      const m = raw.match(/\{[\s\S]*\}/);
      if (m) try { analysis = JSON.parse(m[0]); } catch {}
    }

    if (!analysis || !analysis.template) {
      const lower = raw.toLowerCase();
      let t = 'girl_standing';
      if (lower.includes('cat') || lower.includes('猫')) t = 'cat';
      else if (lower.includes('rabbit') || lower.includes('兔')) t = 'rabbit';
      else if (lower.includes('dog') || lower.includes('狗')) t = 'dog';
      else if (lower.includes('sit') || lower.includes('坐')) t = 'person_sitting';
      else if (lower.includes('walk') || lower.includes('走')) t = 'girl_walking';
      else if (lower.includes('boy') || lower.includes('man') || lower.includes('男')) t = 'boy_standing';
      analysis = { template: t, colors: DEFAULT_COLORS[t] };
    }

    const tpl = TEMPLATES[analysis.template] ? analysis.template : 'girl_standing';
    const def = DEFAULT_COLORS[tpl];
    const colors = {};
    for (const k of ['hair','skin','top','bottom','shoes','acc']) {
      const v = analysis.colors?.[k];
      colors[k] = (v && /^#[0-9a-fA-F]{6}$/.test(v)) ? v : def[k];
    }

    const svg = TEMPLATES[tpl](colors);
    console.log('Template:', tpl, 'Colors:', JSON.stringify(colors));
    return res.json({ svg });

  } catch (err) {
    console.error('Handler error:', err);
    return res.status(500).json({ error: err.message });
  }
}
