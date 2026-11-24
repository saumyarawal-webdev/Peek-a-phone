/* =========================================================================
   LOW TIDE — hand-built SVG artwork + icon set
   No external images, no build step. Every scene is drawn here.
   ========================================================================= */

const ICONS = {
  messages: '<path d="M20 12a7.2 7.2 0 0 1-7.5 7H8l-3.5 2v-4.3A7 7 0 0 1 4 12a7.2 7.2 0 0 1 7.5-7h1A7.2 7.2 0 0 1 20 12Z"/><path d="M8.5 12h.01M12 12h.01M15.5 12h.01"/>',
  photos: '<rect x="3.5" y="4.5" width="17" height="15" rx="2.5"/><circle cx="8.8" cy="9.5" r="1.6"/><path d="m4 17 5.2-5 4.1 3.7 2.7-2.4 4 4"/>',
  notes: '<path d="M6 3.5h9.5L19 7v13.5H6Z"/><path d="M15 3.5V7h4"/><path d="M9 11h6M9 14.5h6M9 18h3.5"/>',
  phone: '<path d="M8.2 3.5H6.4A2 2 0 0 0 4.6 6c1 6.6 5.3 10.9 11.9 12a2 2 0 0 0 2.5-1.9v-1.8l-3.4-1.4-1.6 1.6a12 12 0 0 1-4.9-4.9l1.6-1.6Z"/>',
  safari: '<circle cx="12" cy="12" r="8.5"/><path d="m15.5 8.5-2 5-5 2 2-5Z"/>',
  maps: '<path d="m3.5 6.5 5-2 7 2 5-2v13l-5 2-7-2-5 2Z"/><path d="M8.5 4.5v13M15.5 6.5v13"/>',
  memos: '<path d="M4 12h2.5M9 7.5v9M12 5v14M15 8.5v7M18 10.5v3M21 12h-1.5"/>',
  weather: '<path d="M7.5 18a4 4 0 0 1-.4-8 5.2 5.2 0 0 1 10-1.2 3.6 3.6 0 0 1 .4 7.2Z"/><path d="M8 21h.01M12 21h.01M16 21h.01"/>',
  clock: '<circle cx="12" cy="12" r="8.6"/><path d="M12 7.5V12l3 2"/>',
  music: '<path d="M9 18V6.5l9-2v11.3"/><circle cx="6.6" cy="18" r="2.4"/><circle cx="15.6" cy="15.8" r="2.4"/>',
  files: '<path d="M4 7.5A1.5 1.5 0 0 1 5.5 6h4l2 2h7A1.5 1.5 0 0 1 20 9.5v8A1.5 1.5 0 0 1 18.5 19h-13A1.5 1.5 0 0 1 4 17.5Z"/>',
  recipes: '<path d="M6 10a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v1H6Z"/><path d="M5 14h14v3.5A2.5 2.5 0 0 1 16.5 20h-9A2.5 2.5 0 0 1 5 17.5Z"/><path d="M9.5 3.5v2M14.5 3.5v2"/>',
  settings: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 0 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6V21a2 2 0 0 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1a2 2 0 0 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.6-1H3a2 2 0 0 1 0-4h.1a1.7 1.7 0 0 0 1.6-1.1 1.7 1.7 0 0 0-.3-1.9l-.1-.1a2 2 0 0 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.9.3H9a1.7 1.7 0 0 0 1-1.6V3a2 2 0 0 1 4 0v.1a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1a2 2 0 0 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.9V9a1.7 1.7 0 0 0 1.6 1H21a2 2 0 0 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1Z"/>',
  chevron: '<path d="m14.5 5.5-7 6.5 7 6.5"/>',
  close: '<path d="m6 6 12 12M18 6 6 18"/>',
  lock: '<rect x="5" y="10" width="14" height="10" rx="2.5"/><path d="M8.5 10V7.5a3.5 3.5 0 0 1 7 0V10"/><path d="M12 14v2.5"/>',
  unlock: '<rect x="5" y="10" width="14" height="10" rx="2.5"/><path d="M8.5 10V7.5a3.5 3.5 0 0 1 6.7-1.4"/><path d="M12 14v2.5"/>',
  info: '<circle cx="12" cy="12" r="8.5"/><path d="M12 11v5.5M12 7.8h.01"/>',
  play: '<path d="M8 5.6 18 12 8 18.4Z"/>',
  pause: '<path d="M9 5v14M15 5v14"/>',
  check: '<path d="m5 12.5 4.5 4.5L19 7"/>',
  arrow: '<path d="M4 12h15M13 6l6 6-6 6"/>',
  share: '<path d="M12 15V4M8 8l4-4 4 4"/><path d="M5 13v5.5A1.5 1.5 0 0 0 6.5 20h11a1.5 1.5 0 0 0 1.5-1.5V13"/>',
  warning: '<path d="M12 8v5"/><path d="M12 17h.01"/><path d="M10.3 3.9 2.6 17.2A2 2 0 0 0 4.3 20h15.4a2 2 0 0 0 1.7-2.8L13.7 3.9a2 2 0 0 0-3.4 0Z"/>',
  mic: '<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5.5 11.5a6.5 6.5 0 0 0 13 0M12 18v3M9 21h6"/>',
  trash: '<path d="M4 7h16M9 7V5h6v2M6 7l1 12h10l1-12"/>',
  magnifier: '<circle cx="11" cy="11" r="6.5"/><path d="m16 16 4.5 4.5"/>',
  pin: '<path d="M12 21s6.5-6 6.5-11a6.5 6.5 0 1 0-13 0C5.5 15 12 21 12 21Z"/><circle cx="12" cy="10" r="2.2"/>',
  home: '<path d="m3.5 11 8.5-7 8.5 7"/><path d="M6 9.5V20h12V9.5"/>',
  reload: '<path d="M20 11a8 8 0 1 0-2.3 6"/><path d="M20 4v7h-7"/>',
  down: '<path d="M12 4v15M6 13l6 6 6-6"/>',
  call: '<path d="M8.2 3.5H6.4A2 2 0 0 0 4.6 6c1 6.6 5.3 10.9 11.9 12a2 2 0 0 0 2.5-1.9v-1.8l-3.4-1.4-1.6 1.6a12 12 0 0 1-4.9-4.9l1.6-1.6Z"/>',
  camera: '<rect x="3" y="7" width="18" height="12" rx="2.5"/><circle cx="12" cy="13" r="3.4"/><path d="M8.5 7 9.5 4.5h5L15.5 7"/>',
  eye: '<path d="M2.5 12S6 6.5 12 6.5 21.5 12 21.5 12 18 17.5 12 17.5 2.5 12 2.5 12Z"/><circle cx="12" cy="12" r="2.8"/>',
  wave: '<path d="M2 12c2.5-4 5-4 7.5 0s5 4 7.5 0 3-3 5-1"/>'
};

const ART = (() => {
  const wrap = (inner, w, h, label) =>
    `<svg viewBox="0 0 ${w} ${h}" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${label}" focusable="false">${inner}</svg>`;

  /* ---------------- the marina wallpaper ---------------- */
  const marina = wrap(`
    <defs>
      <linearGradient id="mSky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#051218"/><stop offset=".34" stop-color="#0e2830"/>
        <stop offset=".62" stop-color="#26423f"/><stop offset=".82" stop-color="#6d5a3c"/>
        <stop offset="1" stop-color="#b07a44"/>
      </linearGradient>
      <linearGradient id="mWater" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#12333a"/><stop offset=".45" stop-color="#08202a"/><stop offset="1" stop-color="#030e13"/>
      </linearGradient>
      <radialGradient id="mSun" cx=".5" cy=".5" r=".5">
        <stop offset="0" stop-color="#ffd79a" stop-opacity=".65"/><stop offset=".45" stop-color="#ffb166" stop-opacity=".22"/>
        <stop offset="1" stop-color="#ffb166" stop-opacity="0"/>
      </radialGradient>
      <radialGradient id="mLamp" cx=".5" cy=".5" r=".5">
        <stop offset="0" stop-color="#ffd79a" stop-opacity=".85"/><stop offset=".35" stop-color="#f2b661" stop-opacity=".32"/>
        <stop offset="1" stop-color="#f2b661" stop-opacity="0"/>
      </radialGradient>
      <linearGradient id="mFade" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#02090c" stop-opacity="0"/><stop offset="1" stop-color="#02090c" stop-opacity=".92"/>
      </linearGradient>
      <linearGradient id="mReflect" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#ffc98a" stop-opacity=".4"/><stop offset="1" stop-color="#ffc98a" stop-opacity="0"/>
      </linearGradient>
    </defs>
    <rect width="390" height="844" fill="url(#mSky)"/>
    <circle cx="96" cy="436" r="170" fill="url(#mSun)"/>
    <g fill="#0a1a20" opacity=".65">
      <ellipse cx="70" cy="150" rx="120" ry="26"/><ellipse cx="300" cy="112" rx="150" ry="22"/>
      <ellipse cx="230" cy="196" rx="180" ry="18"/><ellipse cx="110" cy="250" rx="150" ry="14" opacity=".6"/>
    </g>
    <g fill="#081820">
      <path d="M0 442V414q34-22 70-8t66 2 62-20 70 16 62 4 60-14v48Z"/>
      <path d="M0 462V440q52-16 104-2t96 0 96-12 94 10v26Z" fill="#092028"/>
    </g>
    <rect y="456" width="390" height="388" fill="url(#mWater)"/>
    <ellipse cx="96" cy="470" rx="150" ry="42" fill="#c98a4e" opacity=".16"/>
    <path d="M78 466h36l-8 150h-18Z" fill="url(#mReflect)" opacity=".55"/>
    <path d="M150 470h18l-5 96h-8Z" fill="url(#mReflect)" opacity=".28"/>
    <g stroke="#b99a68" stroke-linecap="round" opacity=".16">
      <path d="M18 492h64M126 488h52M252 496h80M60 516h50M180 514h44M300 524h58M30 546h70M150 552h60M268 560h70M14 592h48M96 604h52M210 596h80M310 620h50M40 642h74M160 650h44M250 664h60M80 690h60M300 700h50" stroke-width="1.6"/>
    </g>
    <g fill="#050f13">
      <path d="M28 456h54l-6 22H34Z"/><rect x="52" y="418" width="4" height="40"/>
      <path d="M132 462h44l-5 18h-34Z"/><rect x="152" y="430" width="3" height="34"/>
      <path d="M300 454h48l-5 20h-38Z"/><rect x="322" y="422" width="3" height="34"/>
    </g>
    <g stroke="#0c1b20" stroke-width="2" opacity=".8">
      <path d="M54 418v-56M153 430v-48M323 422v-42"/>
    </g>
    <g>
      <rect x="52" y="352" width="1.4" height="10" fill="#f2e2c6"/>
      <circle cx="52.7" cy="354" r="2" fill="#ffe0a8"/>
      <circle cx="52.7" cy="354" r="34" fill="url(#mLamp)" opacity=".8"/>
      <rect x="151" y="374" width="1.4" height="8" fill="#f2e2c6"/>
      <circle cx="151.7" cy="376" r="1.8" fill="#ffe0a8"/>
      <circle cx="151.7" cy="376" r="26" fill="url(#mLamp)" opacity=".55"/>
      <rect x="321" y="374" width="1.4" height="8" fill="#f2e2c6"/>
      <circle cx="321.7" cy="376" r="1.8" fill="#ffe0a8"/>
      <circle cx="321.7" cy="376" r="26" fill="url(#mLamp)" opacity=".5"/>
    </g>
    <g>
      <path d="M-20 646 410 612v34L-20 692Z" fill="#201711"/>
      <path d="M-20 692 410 660v86L-20 790Z" fill="#120c09"/>
      <g stroke="#3a2718" stroke-width="1.2" opacity=".7">
        <path d="M18 650 4 690M74 646 58 686M132 641 116 681M190 636 173 677M248 632 231 672M306 627 289 668M364 622 347 663"/>
        <path d="M-10 702 410 668M-10 724 410 690M-10 748 410 713M-10 772 410 737"/>
      </g>
      <g fill="#0a1418">
        <rect x="34" y="682" width="11" height="120" rx="2"/><rect x="118" y="676" width="11" height="126" rx="2"/>
        <rect x="204" y="670" width="11" height="132" rx="2"/><rect x="290" y="664" width="11" height="138" rx="2"/>
        <rect x="372" y="658" width="11" height="144" rx="2"/>
      </g>
      <g fill="#2a3a3b" opacity=".5">
        <rect x="35" y="682" width="3" height="120"/><rect x="119" y="676" width="3" height="126"/>
        <rect x="205" y="670" width="3" height="132"/><rect x="291" y="664" width="3" height="138"/>
      </g>
    </g>
    <g>
      <ellipse cx="86" cy="716" rx="62" ry="15" fill="#f2b661" opacity=".08"/>
      <path d="M44 704h84l-14 34H58Z" fill="#0b1a1e" stroke="#e6d3a8" stroke-opacity=".28" stroke-width="1"/>
      <path d="M104 704v34M70 704l-4 34M86 704v34" stroke="#e6d3a8" stroke-opacity=".18"/>
      <rect x="60" y="742" width="52" height="4" fill="#0a1519"/>
    </g>
    <g transform="translate(240 534) rotate(-2 52 15)">
      <rect width="104" height="30" rx="2" fill="#141d1b" stroke="#d8b46a" stroke-opacity=".75" stroke-width="1.4"/>
      <rect x="4" y="4" width="96" height="22" rx="1" fill="none" stroke="#d8b46a" stroke-opacity=".3"/>
      <text x="52" y="20" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="14" letter-spacing="1.4" fill="#f6d9a1">GATE 27</text>
    </g>
    <g transform="translate(22 668) rotate(1.4 59 15)">
      <rect width="118" height="30" rx="2" fill="#0b1518" stroke="#e8d3a4" stroke-opacity=".5" stroke-width="1.2"/>
      <text x="59" y="20" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="14" letter-spacing="1.2" fill="#edddb9">SLIP 4-B</text>
    </g>
    <g opacity=".55">
      <rect x="316" y="690" width="5" height="46" fill="#0b1519"/>
      <text x="326" y="700" font-family="'JetBrains Mono', monospace" font-size="10" fill="#e0c48a" transform="rotate(90 326 700)" letter-spacing="2">4-B</text>
    </g>
    <g stroke="#cfe4e2" stroke-width="1" opacity=".13">
      <path d="M20 40v70M90 12v58M150 70v64M210 22v88M280 60v70M340 18v74M375 80v60M60 180v60M260 190v50M120 260v50"/>
    </g>
    <rect y="640" width="390" height="204" fill="url(#mFade)" opacity=".55"/>
    <rect width="390" height="844" fill="none"/>
  `, 390, 844, 'The marina at dusk, seen from the pier');

  /* ---------------- photos ---------------- */

  const selfie = wrap(`
    <defs>
      <linearGradient id="sWall" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#22302f"/><stop offset="1" stop-color="#101a1c"/>
      </linearGradient>
      <radialGradient id="sLamp" cx=".5" cy=".5" r=".5">
        <stop offset="0" stop-color="#ffcf92" stop-opacity=".55"/><stop offset="1" stop-color="#ffcf92" stop-opacity="0"/>
      </radialGradient>
      <linearGradient id="sSkin" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#7d5a42"/><stop offset="1" stop-color="#4a3226"/>
      </linearGradient>
    </defs>
    <rect width="400" height="500" fill="url(#sWall)"/>
    <g stroke="#3b4b48" stroke-width="1" opacity=".5">
      <path d="M0 60h400M0 140h400M0 220h400M0 300h400M0 380h400M0 460h400"/>
      <path d="M60 0v500M140 0v500M220 0v500M300 0v500M380 0v500"/>
    </g>
    <circle cx="320" cy="80" r="140" fill="url(#sLamp)"/>
    <g opacity=".7">
      <path d="M320 0v110" stroke="#3b4b48" stroke-width="2"/>
      <path d="M282 110h76l-12 34h-52Z" fill="#2b3836" stroke="#4a5c58"/>
      <circle cx="320" cy="150" r="8" fill="#ffe3b0"/>
      <circle cx="320" cy="150" r="38" fill="url(#sLamp)"/>
    </g>
    <g>
      <ellipse cx="200" cy="230" rx="66" ry="80" fill="#161011"/>
      <ellipse cx="200" cy="238" rx="54" ry="66" fill="url(#sSkin)"/>
      <path d="M158 250q6 56 42 56t42-56q-14 34-42 34t-42-34Z" fill="#3a261c" opacity=".55"/>
      <ellipse cx="173" cy="232" rx="4" ry="6" fill="#1c1412"/>
      <g fill="#171012">
        <ellipse cx="200" cy="162" rx="58" ry="42"/>
        <circle cx="153" cy="206" r="20"/><circle cx="247" cy="206" r="20"/>
        <circle cx="162" cy="174" r="16"/><circle cx="238" cy="174" r="16"/>
        <circle cx="176" cy="156" r="15"/><circle cx="224" cy="156" r="15"/>
        <circle cx="200" cy="150" r="18"/>
      </g>
      <path d="M150 300q50 22 100 0l14 34q-64 26-128 0Z" fill="#a13b3a"/>
      <path d="M258 330q18 34 4 66l-22-6q12-28 2-52Z" fill="#8c3232"/>
      <path d="M118 500q6-104 54-140l28 20 28-20q48 36 54 140Z" fill="#1b2b2c"/>
      <path d="M118 500q6-104 54-140l10 7q-40 46-44 133Z" fill="#26393a"/>
      <circle cx="154" cy="276" r="5" fill="#e0b46a"/><circle cx="248" cy="276" r="5" fill="#e0b46a"/>
      <g transform="rotate(-5 200 250)">
        <rect x="150" y="176" width="100" height="148" rx="16" fill="#05090b" stroke="#2c3b3d" stroke-width="2"/>
        <rect x="157" y="186" width="86" height="126" rx="10" fill="#0c1b20"/>
        <circle cx="200" cy="264" r="22" fill="#6f8b8e" opacity=".22"/>
        <rect x="192" y="180" width="16" height="4" rx="2" fill="#1c2a2c"/>
        <path d="M140 214q-12 30 4 54l18-8q-10-20 0-40Z" fill="#5a3e2e"/>
        <path d="M142 262q14 14 28 6l-4-16q-12 6-20-2Z" fill="#6b4a37"/>
      </g>
    </g>
    <g stroke="#ffd79a" stroke-width="3" opacity=".18">
      <path d="M200 60v40M80 220h50M200 440h60"/>
    </g>
    <rect width="400" height="500" fill="#0b1a1f" opacity=".1"/>
  `, 400, 500, 'Mirror selfie in a motel bathroom');

  const cat = wrap(`
    <defs>
      <radialGradient id="cLamp" cx=".5" cy=".5" r=".5">
        <stop offset="0" stop-color="#ffcf92" stop-opacity=".7"/><stop offset="1" stop-color="#ffcf92" stop-opacity="0"/>
      </radialGradient>
      <linearGradient id="cBed" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#4a4034"/><stop offset="1" stop-color="#2a241d"/>
      </linearGradient>
    </defs>
    <rect width="400" height="300" fill="#171b19"/>
    <rect y="176" width="400" height="124" fill="url(#cBed)"/>
    <rect x="0" y="150" width="400" height="30" fill="#33291f"/>
    <path d="M0 176q40-14 80 0t80 0 80 0 80 0 80 0v40H0Z" fill="#57493a" opacity=".5"/>
    <g fill="#6a5b47" opacity=".35">
      <circle cx="46" cy="226" r="7"/><circle cx="96" cy="258" r="9"/><circle cx="330" cy="218" r="8"/>
      <circle cx="286" cy="264" r="6"/><circle cx="196" cy="278" r="7"/><circle cx="352" cy="250" r="5"/>
    </g>
    <rect x="18" y="126" width="92" height="34" rx="18" fill="#2b2821"/>
    <circle cx="300" cy="96" r="150" fill="url(#cLamp)"/>
    <g>
      <ellipse cx="222" cy="212" rx="86" ry="30" fill="#22201c" opacity=".5"/>
      <ellipse cx="216" cy="202" rx="64" ry="24" fill="#6f736b"/>
      <ellipse cx="216" cy="194" rx="56" ry="22" fill="#7d8178"/>
      <path d="M262 208q40 6 34-26" stroke="#6f736b" stroke-width="11" stroke-linecap="round" fill="none"/>
      <circle cx="156" cy="180" r="27" fill="#83877d"/>
      <path d="M138 162 130 142l24 10Z" fill="#83877d"/><path d="M172 160l10-18 8 22Z" fill="#83877d"/>
      <path d="M140 170q8-6 16 0" stroke="#3b3d38" stroke-width="2" fill="none" opacity=".6"/>
      <path d="M168 170q6-6 12 0" stroke="#3b3d38" stroke-width="2" fill="none" opacity=".6"/>
      <path d="M162 184q5 4 10 0" stroke="#3b3d38" stroke-width="1.6" fill="none"/>
      <path d="M176 178h14M176 182h12M142 178h-12M142 182h-10" stroke="#cfc7b4" stroke-width=".8" opacity=".5"/>
      <g stroke="#5c6058" stroke-width="3" opacity=".55">
        <path d="M196 190q10 4 18 0M216 186q10 4 18 0M234 192q8 3 14 0"/>
      </g>
    </g>
    <rect width="400" height="300" fill="#1a1410" opacity=".14"/>
  `, 400, 300, 'A grey tabby asleep on a motel bed');

  const van = wrap(`
    <defs>
      <linearGradient id="vSky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#071820"/><stop offset="1" stop-color="#123039"/>
      </linearGradient>
      <linearGradient id="vVan" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#284a62"/><stop offset=".55" stop-color="#163448"/><stop offset="1" stop-color="#0b1f2c"/>
      </linearGradient>
      <radialGradient id="vGlow" cx=".5" cy=".5" r=".5">
        <stop offset="0" stop-color="#ff8a79" stop-opacity=".55"/><stop offset="1" stop-color="#ff8a79" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <rect width="400" height="300" fill="url(#vSky)"/>
    <circle cx="344" cy="66" r="120" fill="url(#vGlow)"/>
    <rect y="120" width="400" height="90" fill="#0b1b22"/>
    <g fill="#0f242b" stroke="#1b343c" stroke-width="1">
      <rect x="0" y="104" width="400" height="12"/>
      <rect x="20" y="128" width="64" height="82"/><rect x="96" y="128" width="10" height="82"/>
      <rect x="116" y="128" width="64" height="82"/><rect x="192" y="128" width="10" height="82"/>
      <rect x="212" y="128" width="64" height="82"/><rect x="288" y="128" width="10" height="82"/>
      <rect x="308" y="128" width="72" height="82"/>
    </g>
    <g fill="#f2b661" opacity=".5">
      <rect x="126" y="140" width="10" height="22"/><rect x="222" y="140" width="10" height="22"/>
      <rect x="318" y="140" width="10" height="22"/>
    </g>
    <circle cx="60" cy="140" r="34" fill="url(#vGlow)" opacity=".7"/>
    <g>
      <rect y="208" width="400" height="92" fill="#080f13"/>
      <ellipse cx="250" cy="286" rx="150" ry="18" fill="#ff8a79" opacity=".12"/>
      <path d="M148 208h64l22 4h64c14 0 22 8 22 20v26H148Z" fill="url(#vVan)" opacity=".9"/>
      <path d="M112 208h46l-10 42h-36Z" fill="#132f42"/>
      <rect x="118" y="216" width="34" height="22" rx="2" fill="#0a1d29" opacity=".8"/>
      <rect x="160" y="216" width="48" height="24" rx="2" fill="#0a1d29" opacity=".7"/>
      <rect x="216" y="216" width="40" height="24" rx="2" fill="#0a1d29" opacity=".7"/>
      <path d="M148 244h190v14H148Z" fill="#0a1e2b"/>
      <circle cx="176" cy="266" r="17" fill="#050a0d"/><circle cx="176" cy="266" r="7" fill="#2c3b3f"/>
      <circle cx="304" cy="266" r="17" fill="#050a0d"/><circle cx="304" cy="266" r="7" fill="#2c3b3f"/>
      <rect x="104" y="224" width="10" height="10" rx="2" fill="#ffd79a" opacity=".85"/>
      <rect x="352" y="230" width="6" height="16" rx="2" fill="#ff7a6b" opacity=".8"/>
    </g>
    <g stroke="#cfe4e2" stroke-width="1" opacity=".18">
      <path d="M20 30v60M70 10v80M120 50v70M180 20v90M240 40v70M300 10v70M360 60v60M45 110v50M210 120v60M340 130v60"/>
    </g>
    <g fill="#ff8a79" opacity=".08">
      <path d="M0 300v-20q30-10 60 0t60 0 60 0 60 0 60 0 60 0v20Z"/>
    </g>
    <rect width="400" height="300" fill="#04090c" opacity=".18"/>
  `, 400, 300, 'A blue van in the motel car park at night');

  const locker = wrap(`
    <defs>
      <linearGradient id="lWall" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#1c2a2e"/><stop offset="1" stop-color="#0a1316"/>
      </linearGradient>
      <linearGradient id="lDoor" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#335b66"/><stop offset=".5" stop-color="#244751"/><stop offset="1" stop-color="#17323a"/>
      </linearGradient>
      <radialGradient id="lLamp" cx=".5" cy=".5" r=".5">
        <stop offset="0" stop-color="#ffd79a" stop-opacity=".8"/><stop offset="1" stop-color="#ffd79a" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <rect width="400" height="300" fill="url(#lWall)"/>
    <path d="M0 0h400v30H0Z" fill="#0a1417"/>
    <path d="M0 268h400v32H0Z" fill="#0a1316"/>
    <circle cx="200" cy="80" r="180" fill="url(#lLamp)" opacity=".5"/>
    <g transform="translate(28 96)">
      <g stroke="#0b1518" stroke-width="3">
        <rect x="0" y="0" width="66" height="150" rx="2" fill="url(#lDoor)"/>
        <rect x="72" y="0" width="66" height="150" rx="2" fill="url(#lDoor)"/>
        <rect x="144" y="0" width="66" height="150" rx="2" fill="url(#lDoor)"/>
        <rect x="216" y="0" width="66" height="150" rx="2" fill="url(#lDoor)"/>
        <rect x="288" y="0" width="66" height="150" rx="2" fill="url(#lDoor)"/>
      </g>
      <g stroke="#0c1b20" stroke-width="1.5" opacity=".6">
        <path d="M14 18h38M14 26h38M14 34h38M86 18h38M86 26h38M158 18h38M230 18h38M230 26h38M302 18h38M302 26h38"/>
      </g>
      <g fill="#0a1417">
        <rect x="52" y="72" width="7" height="22" rx="2"/><rect x="124" y="72" width="7" height="22" rx="2"/>
        <rect x="196" y="72" width="7" height="22" rx="2"/><rect x="268" y="72" width="7" height="22" rx="2"/>
        <rect x="340" y="72" width="7" height="22" rx="2"/>
      </g>
      <g fill="#d9c28c" font-family="'JetBrains Mono', monospace" font-size="9" letter-spacing="1">
        <text x="33" y="118" text-anchor="middle">B-11</text>
        <text x="105" y="118" text-anchor="middle">B-12</text>
        <text x="177" y="118" text-anchor="middle">B-13</text>
        <text x="321" y="118" text-anchor="middle">B-15</text>
      </g>
      <g>
        <rect x="216" y="0" width="66" height="150" rx="2" fill="#081215"/>
        <path d="M282 0v150" stroke="#4d7680" stroke-width="2" opacity=".5"/>
        <path d="M216 0v150" stroke="#4d7680" stroke-width="2" opacity=".5"/>
        <rect x="222" y="8" width="54" height="134" fill="#050d10"/>
        <g fill="#20363b">
          <rect x="228" y="56" width="42" height="8" rx="1"/><rect x="228" y="74" width="42" height="8" rx="1"/>
        </g>
        <rect x="226" y="104" width="26" height="16" rx="1" fill="#e8d3a4"/>
        <text x="239" y="116" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="9" fill="#1a1710">B-14</text>
      </g>
    </g>
    <g opacity=".3">
      <ellipse cx="200" cy="270" rx="170" ry="16" fill="#6fb0b8"/>
      <ellipse cx="150" cy="276" rx="60" ry="6" fill="#8fd0d0" opacity=".5"/>
    </g>
    <g stroke="#cfe4e2" stroke-width="1" opacity=".2">
      <path d="M12 20v50M60 0v40M110 24v46M340 10v50M380 40v50M90 250v40M300 244v46"/>
    </g>
    <rect width="400" height="300" fill="#04090c" opacity=".22"/>
  `, 400, 300, 'A row of blue marina lockers, one of them open');

  const boathouse = wrap(`
    <defs>
      <linearGradient id="bSky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#123236"/><stop offset=".45" stop-color="#3d625f"/>
        <stop offset=".72" stop-color="#a98a67"/><stop offset="1" stop-color="#d8b088"/>
      </linearGradient>
      <linearGradient id="bWater" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#33595a"/><stop offset="1" stop-color="#0c2328"/>
      </linearGradient>
      <radialGradient id="bGlow" cx=".5" cy=".5" r=".5">
        <stop offset="0" stop-color="#ffe2ae" stop-opacity=".7"/><stop offset="1" stop-color="#ffe2ae" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <rect width="400" height="300" fill="url(#bSky)"/>
    <g fill="#254a4b" opacity=".5">
      <ellipse cx="90" cy="108" rx="150" ry="12"/><ellipse cx="290" cy="150" rx="170" ry="9"/>
    </g>
    <rect y="196" width="400" height="104" fill="url(#bWater)"/>
    <g stroke="#d9c295" stroke-width="1" opacity=".18">
      <path d="M0 208h400M30 220h140M210 218h120M0 238h120M160 244h180M40 260h90M240 264h110M0 278h80M120 284h150"/>
    </g>
    <g fill="#4a3c2c" opacity=".55">
      <path d="M0 290q60-30 140-24t120 12 140-6v28H0Z"/>
    </g>
    <g>
      <path d="M110 196V150l82-52 82 52v46Z" fill="#1a2527"/>
      <path d="M96 154 192 92l96 62-10 10-86-52-86 52Z" fill="#0e1a1d"/>
      <path d="M110 150h164v8H110Z" fill="#2b3a39" opacity=".7"/>
      <g fill="#101b1e">
        <rect x="126" y="164" width="30" height="32"/><rect x="166" y="164" width="26" height="32"/>
        <rect x="222" y="164" width="30" height="32"/>
      </g>
      <rect x="206" y="164" width="10" height="10" fill="#ffcf8a"/>
      <circle cx="211" cy="169" r="22" fill="url(#bGlow)"/>
      <path d="M124 196v26M160 196v24M232 196v24M256 196v22" stroke="#0b1417" stroke-width="5"/>
      <path d="M270 200h96v8h-96Z" fill="#1a2527"/>
      <path d="M270 208v42M366 208v42M300 208v36M336 208v36" stroke="#0b1417" stroke-width="4"/>
    </g>
    <g stroke="#0e1a1d" stroke-width="2" fill="none">
      <path d="M60 88q6-10 12 0M80 84q5-8 10 0M300 64q6-10 12 0"/>
    </g>
    <g fill="#d8b088" opacity=".25">
      <ellipse cx="200" cy="204" rx="210" ry="10"/>
    </g>
    <rect width="400" height="300" fill="#04090c" opacity=".16"/>
  `, 400, 300, 'The boathouse at Pier 9, low tide');

  const camera = wrap(`
    <defs>
      <linearGradient id="pWood" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#33241a"/><stop offset="1" stop-color="#140d09"/>
      </linearGradient>
      <radialGradient id="pFlash" cx=".5" cy=".5" r=".5">
        <stop offset="0" stop-color="#ffe9c4" stop-opacity=".65"/><stop offset="1" stop-color="#ffe9c4" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <rect width="400" height="300" fill="#080d10"/>
    <rect width="400" height="300" fill="url(#pWood)"/>
    <g stroke="#0c0805" stroke-width="2" opacity=".8">
      <path d="M0 40h400M0 92h400M0 148h400M0 208h400M0 268h400"/>
      <path d="M40 0v40M150 0v40M260 0v40M370 0v40M95 40v52M205 40v52M315 40v52M40 92v56M150 92v56M260 92v56M370 92v56"/>
    </g>
    <ellipse cx="200" cy="170" rx="190" ry="130" fill="url(#pFlash)"/>
    <g>
      <path d="M118 174q-6-52 44-54h80q46 4 42 52l-6 46H124Z" fill="#5a5b4c"/>
      <path d="M124 152q50-30 158-8l-6 26q-72-18-146 2Z" fill="#70715d"/>
      <path d="M132 200h138v10H132Z" fill="#3f4034"/>
      <rect x="146" y="160" width="30" height="16" rx="2" fill="#2f3028"/>
      <path d="M140 174q-26 24-10 52" stroke="#3f4034" stroke-width="8" fill="none" stroke-linecap="round"/>
      <rect x="216" y="150" width="54" height="38" rx="5" fill="#1b1c17"/>
      <circle cx="243" cy="169" r="14" fill="#0a0b09" stroke="#3d3f36" stroke-width="2"/>
      <circle cx="243" cy="169" r="6" fill="#354b4a"/>
      <rect x="216" y="140" width="18" height="10" rx="2" fill="#2c2e27"/>
      <circle cx="260" cy="146" r="3" fill="#ffe0a8"/>
    </g>
    <g stroke="#cfe4e2" stroke-width="1" opacity=".25">
      <path d="M30 30v50M76 12v40M340 24v44M368 100v40M80 240v40M320 236v40M160 274v20"/>
    </g>
    <rect width="400" height="300" fill="#04090c" opacity=".24"/>
  `, 400, 300, 'A camera bag on the wet pier');

  const pier1147 = wrap(`
    <defs>
      <linearGradient id="nSky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#030a0e"/><stop offset="1" stop-color="#0a1b21"/>
      </linearGradient>
      <radialGradient id="nFlash" cx=".32" cy=".88" r=".8">
        <stop offset="0" stop-color="#e8f2ee" stop-opacity=".5"/><stop offset=".45" stop-color="#bcd6d2" stop-opacity=".12"/>
        <stop offset="1" stop-color="#bcd6d2" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <rect width="400" height="300" fill="url(#nSky)"/>
    <rect y="150" width="400" height="150" fill="#071318"/>
    <g fill="#0e2026">
      <rect x="250" y="118" width="150" height="60" rx="4"/>
      <path d="M250 178h150v20H250Z" fill="#0a171c"/>
      <rect x="286" y="86" width="4" height="34" fill="#0a171c"/>
      <text x="325" y="152" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="7" fill="#94a9a5" opacity=".55" letter-spacing="1">MARTHA R.</text>
    </g>
    <path d="M0 300 400 258v42H0Z" fill="#241811"/>
    <g stroke="#3e2a1c" stroke-width="1.4" opacity=".7">
      <path d="M0 282 400 242M0 292 400 252M60 300 120 288M180 300 240 284M300 300 360 284"/>
    </g>
    <g>
      <rect x="80" y="188" width="82" height="60" fill="#5c4a33" stroke="#231a12" stroke-width="2"/>
      <rect x="86" y="196" width="70" height="8" fill="#6d5940"/>
      <rect x="88" y="228" width="66" height="6" fill="#43351f" opacity=".8"/>
      <text x="146" y="238" font-family="'JetBrains Mono', monospace" font-size="16" fill="#c9b08a" opacity=".7">6</text>
      <rect x="66" y="236" width="86" height="26" fill="#4c3d2a" stroke="#1c150e" stroke-width="2"/>
      <rect x="172" y="206" width="62" height="48" fill="#4f402d" stroke="#1a140e" stroke-width="2"/>
      <rect x="178" y="214" width="50" height="6" fill="#5f5038"/>
    </g>
    <g fill="#05090b">
      <path d="M236 250c-2-38 8-66 26-74 12-6 22 2 24 14 4 22 2 42 4 60Z"/>
      <path d="M244 186q14-22 34-12 12 8 10 24-2 16-6 20-18 4-38-32Z"/>
      <path d="M250 208q-22 12-26 40" stroke="#05090b" stroke-width="9" fill="none" stroke-linecap="round"/>
      <path d="M288 218q16 10 20 32" stroke="#05090b" stroke-width="8" fill="none" stroke-linecap="round"/>
    </g>
    <g stroke="#9fb8b3" stroke-width="1" opacity=".35">
      <path d="M274 178q10-4 14 6M244 244q16 4 34 0"/>
    </g>
    <rect width="400" height="300" fill="url(#nFlash)" style="mix-blend-mode:screen"/>
    <g stroke="#d8eae6" stroke-width="1" opacity=".2">
      <path d="M20 30v56M80 8v50M150 40v64M330 30v56M370 96v44M40 180v40M320 200v50M120 250v40"/>
    </g>
    <rect width="400" height="300" fill="#03080b" opacity=".22"/>
  `, 400, 300, 'Flash photograph of crates on the dock at night');

  const motel = wrap(`
    <defs>
      <linearGradient id="tSky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#050f15"/><stop offset="1" stop-color="#0f2830"/>
      </linearGradient>
      <radialGradient id="tNeon" cx=".5" cy=".5" r=".5">
        <stop offset="0" stop-color="#ff8a79" stop-opacity=".55"/><stop offset="1" stop-color="#ff8a79" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <rect width="400" height="300" fill="url(#tSky)"/>
    <circle cx="330" cy="74" r="100" fill="url(#tNeon)"/>
    <g>
      <rect x="26" y="96" width="348" height="120" fill="#0c1d23"/>
      <path d="M18 216h364v10H18Z" fill="#1a3038"/>
      <g fill="#0b1a20" stroke="#24414a" stroke-width="1">
        <rect x="44" y="150" width="46" height="66"/><rect x="102" y="150" width="46" height="66"/>
        <rect x="160" y="150" width="46" height="66"/><rect x="218" y="150" width="46" height="66"/>
        <rect x="276" y="150" width="46" height="66"/><rect x="334" y="150" width="34" height="66"/>
      </g>
      <g fill="#f2b661" opacity=".6">
        <rect x="54" y="158" width="26" height="4"/><rect x="112" y="158" width="26" height="4"/>
        <rect x="170" y="158" width="26" height="4"/><rect x="228" y="158" width="26" height="4"/>
        <rect x="286" y="158" width="26" height="4"/>
      </g>
      <g fill="#0a171c">
        <rect x="44" y="130" width="232" height="16"/>
      </g>
      <text x="150" y="142" font-family="'Fraunces', Georgia, serif" font-size="15" letter-spacing="6" fill="#ffb4a4">VESPER</text>
    </g>
    <g>
      <rect y="216" width="400" height="84" fill="#080f13"/>
      <path d="M0 300v-26q40-12 80 0t80 0 80 0 80 0 80 0v26Z" fill="#0b1720"/>
      <ellipse cx="330" cy="264" rx="80" ry="14" fill="#ff8a79" opacity=".16"/>
      <ellipse cx="120" cy="246" rx="50" ry="8" fill="#f2b661" opacity=".1"/>
      <path d="M150 236h30l14 8h36q10 0 10 10v12H150Z" fill="#132b36" opacity=".8"/>
      <circle cx="172" cy="266" r="8" fill="#050a0d"/><circle cx="226" cy="266" r="8" fill="#050a0d"/>
    </g>
    <g stroke="#cfe4e2" stroke-width="1" opacity=".2">
      <path d="M16 30v50M60 12v44M110 40v60M250 20v50M300 42v50M360 20v40M80 110v30M280 110v30"/>
    </g>
    <rect width="400" height="300" fill="#04090c" opacity=".2"/>
  `, 400, 300, 'The Vesper Motel sign glowing in the rain');

  const tideShot = wrap(`
    <rect width="400" height="300" fill="#0b171c"/>
    <rect width="400" height="58" fill="#102329"/>
    <text x="20" y="26" font-family="'Outfit', sans-serif" font-size="11" fill="#e8efec">Tides · Vesper Bay</text>
    <text x="20" y="44" font-family="'JetBrains Mono', monospace" font-size="7" fill="#7f9697" letter-spacing="1">FRI 24 OCT · STATION 941</text>
    <g font-family="'JetBrains Mono', monospace">
      <rect x="20" y="78" width="360" height="66" rx="4" fill="#14333a" stroke="#2a5a60"/>
      <text x="34" y="98" font-size="7" fill="#7fd1c6" letter-spacing="1">LOW TIDE</text>
      <text x="34" y="128" font-size="26" fill="#ffe0ae">4:58</text>
      <text x="140" y="120" font-size="9" fill="#c8d8d5">AM</text>
      <text x="140" y="134" font-size="7" fill="#88a09f">-0.4 FT · 05:00 SLACK</text>
      <text x="34" y="158" font-family="'Outfit', sans-serif" font-size="7" fill="#6f8788">Small craft advisory until 06:00</text>
    </g>
    <g font-family="'JetBrains Mono', monospace" font-size="8" fill="#b9c9c6">
      <path d="M28 186h344" stroke="#294146"/>
      <text x="24" y="206" fill="#71888a">02:10</text><text x="110" y="206" fill="#71888a">03:20</text>
      <text x="200" y="206" fill="#71888a">04:10</text><text x="288" y="206" fill="#ffe0ae">04:58</text>
      <text x="24" y="228" fill="#5d7375">1.8 ft</text><text x="110" y="228" fill="#5d7375">0.9 ft</text>
      <text x="200" y="228" fill="#5d7375">0.1 ft</text><text x="288" y="228" fill="#ffe0ae">-0.4 ft</text>
    </g>
    <g stroke="#43656a" fill="none" stroke-width="1.4">
      <path d="M24 262q30-26 60 0t60 0 60 0 60 0 60 0 60 0"/>
    </g>
    <g fill="#617b7c" font-family="'JetBrains Mono', monospace" font-size="6">
      <text x="20" y="286">NOAA TIDE PREDICTIONS · VESPER BAY, WA</text>
      <text x="330" y="286">SHOT 11:52 PM</text>
    </g>
  `, 400, 300, 'Screenshot of the tide table');

  const pierDusk = wrap(`
    <defs>
      <linearGradient id="dSky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#0b2027"/><stop offset=".6" stop-color="#3f5a55"/><stop offset="1" stop-color="#c08a55"/>
      </linearGradient>
      <radialGradient id="dSun" cx=".5" cy=".5" r=".5">
        <stop offset="0" stop-color="#ffd79a" stop-opacity=".5"/><stop offset="1" stop-color="#ffd79a" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <rect width="400" height="300" fill="url(#dSky)"/>
    <circle cx="250" cy="236" r="120" fill="url(#dSun)"/>
    <path d="M0 246h400v54H0Z" fill="#0b2027"/>
    <g stroke="#f2b661" opacity=".2">
      <path d="M230 248h60M206 258h110M240 268h60M180 280h150" stroke-width="2"/>
    </g>
    <path d="M0 230 400 210v30L0 250Z" fill="#1a1410"/>
    <g fill="#0d1b1f">
      <rect x="60" y="160" width="8" height="78"/><rect x="180" y="152" width="8" height="72"/>
      <rect x="300" y="150" width="8" height="68"/>
      <rect x="56" y="156" width="16" height="6"/><rect x="176" y="148" width="16" height="6"/><rect x="296" y="146" width="16" height="6"/>
    </g>
    <g fill="#ffd79a">
      <circle cx="64" cy="168" r="2.4"/><circle cx="184" cy="160" r="2.2"/><circle cx="304" cy="158" r="2.2"/>
    </g>
    <g fill="#0e1e23" opacity=".9">
      <path d="M10 214h60l-6 20H16Z"/><rect x="36" y="186" width="3" height="30"/>
    </g>
    <text x="200" y="286" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="6" fill="#e0c9a4" opacity=".5" letter-spacing="2">PIER 9 · VESPER BAY</text>
  `, 400, 300, 'Pier 9 at dusk');

  return { marina, selfie, cat, van, locker, boathouse, camera, pier1147, motel, tideShot, pierDusk };
})();
