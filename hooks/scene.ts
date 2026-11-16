// Escena animada: noche negra con nebulosas de neón azul y morado, un campo de
// estrellas en tres capas, estrellas fugaces, naves que cruzan el cielo, un OVNI
// y una rejilla synthwave que avanza al fondo.
// Solo CSS dentro del propio <style>: sin scripts ni recursos externos.

const W = 1600
const H = 1000
const HORIZON = 640
const VX = W / 2

// Generador pseudoaleatorio fijo: la escena es siempre la misma.
let seed = 20261115
const rand = (): number => {
  seed = (seed * 1664525 + 1013904223) % 4294967296
  return seed / 4294967296
}
const r1 = (n: number): string => n.toFixed(1)

// Líneas que salen del punto de fuga hacia el borde inferior.
const rays = Array.from({ length: 25 }, (_, i) => {
  const x = -1600 + i * 200
  return `<line x1="${VX}" y1="${HORIZON}" x2="${x}" y2="${H}"/>`
}).join('')

// Líneas horizontales; el grupo se desplaza hacia abajo en bucle.
const rows = Array.from({ length: 9 }, (_, i) => {
  const y = HORIZON + i * 48
  return `<line x1="-200" y1="${y}" x2="${W + 200}" y2="${y}"/>`
}).join('')

// Campo de estrellas: lejanas (muchas, tenues), medias y cercanas (pocas, brillantes).
const layer = (count: number, rMin: number, rMax: number, cls: string, colors: string[]): string =>
  Array.from({ length: count }, () => {
    const x = rand() * W
    const y = rand() * (HORIZON - 20)
    const r = rMin + rand() * (rMax - rMin)
    const c = colors[Math.floor(rand() * colors.length)] ?? '#ffffff'
    const delay = rand() * 6
    const dur = 2.5 + rand() * 4
    return `<circle class="${cls}" cx="${r1(x)}" cy="${r1(y)}" r="${r1(r)}" fill="${c}" style="animation-delay:${r1(delay)}s;animation-duration:${r1(dur)}s"/>`
  }).join('')

const farStars = layer(140, 0.5, 1.0, 'tw', ['#cfd8ff', '#ffffff', '#b9c6ff'])
const midStars = layer(55, 1.0, 1.7, 'tw', ['#ffffff', '#9fd8ff', '#e2c8ff'])
const nearStars = layer(14, 1.8, 2.6, 'tw big', ['#ffffff', '#7fe9ff', '#e9b8ff'])

// Destellos en cruz sobre algunas estrellas cercanas.
const SPARKLES: Array<[number, number, number]> = [
  [190, 120, 0], [1430, 110, 1.6], [620, 70, 3.1], [1180, 300, 2.2], [70, 420, 4.0], [1530, 470, 0.8],
]
const sparkles = SPARKLES.map(
  ([x, y, d]) =>
    `<g class="spark" style="animation-delay:${d}s" transform="translate(${x} ${y})"><path d="M0 -9 L1.2 -1.2 L9 0 L1.2 1.2 L0 9 L-1.2 1.2 L-9 0 L-1.2 -1.2 Z" fill="#e8f0ff"/><circle r="2.2" fill="#ffffff"/></g>`,
).join('')

// Estrellas fugaces: cada una cruza en diagonal y descansa el resto del ciclo.
const METEORS: Array<[number, number, number, number]> = [
  [300, 60, 9, 1], [1000, 30, 13, 5], [700, 160, 17, 10], [1300, 90, 11, 7.5],
]
const meteors = METEORS.map(
  ([x, y, dur, d]) =>
    `<g transform="translate(${x} ${y})"><g class="met" style="animation-duration:${dur}s;animation-delay:${d}s"><line x1="0" y1="0" x2="-170" y2="-70" stroke="url(#trail)" stroke-width="2.4" stroke-linecap="round"/><circle r="2.6" fill="#ffffff"/></g></g>`,
).join('')

// Nave de neón apuntando a la derecha, con estela del motor.
const ship = (hull: string, glow: string): string => `
<ellipse class="flame" cx="-34" cy="0" rx="22" ry="5" fill="${glow}" opacity=".85"/>
<ellipse cx="-30" cy="0" rx="9" ry="3" fill="#ffffff" opacity=".9"/>
<path d="M30 0 L-6 -11 L-24 -16 L-18 -4 L-26 0 L-18 4 L-24 16 L-6 11 Z" fill="#0c0a22" stroke="${hull}" stroke-width="2" stroke-linejoin="round"/>
<path d="M14 0 L-2 -5 L-2 5 Z" fill="${hull}" opacity=".9"/>
<circle cx="-12" cy="-13" r="1.6" class="blink" fill="${glow}"/>
<circle cx="-12" cy="13" r="1.6" class="blink" fill="${glow}" style="animation-delay:.6s"/>`

// OVNI con luces que se encienden en ronda.
const ufo = `
<ellipse cx="0" cy="-6" rx="16" ry="12" fill="#1a1440" stroke="#7fe9ff" stroke-width="1.6"/>
<ellipse cx="0" cy="2" rx="40" ry="10" fill="#0d0b22" stroke="#c46bff" stroke-width="2"/>
<circle cx="-24" cy="3" r="2.4" class="ring" fill="#7fe9ff"/>
<circle cx="-8" cy="6" r="2.4" class="ring" fill="#ff4fd8" style="animation-delay:.3s"/>
<circle cx="8" cy="6" r="2.4" class="ring" fill="#7fe9ff" style="animation-delay:.6s"/>
<circle cx="24" cy="3" r="2.4" class="ring" fill="#ff4fd8" style="animation-delay:.9s"/>
<path d="M-14 12 L14 12 L30 70 L-30 70 Z" fill="url(#beam)" class="beam"/>`

export const SCENE = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid slice">
<style>
.o1{animation:d1 26s ease-in-out infinite alternate}
.o2{animation:d2 32s ease-in-out infinite alternate}
.o3{animation:d3 38s ease-in-out infinite alternate}
.o4{animation:d2 44s ease-in-out infinite alternate-reverse}
@keyframes d1{from{transform:translate(0,0) scale(1)}to{transform:translate(160px,90px) scale(1.15)}}
@keyframes d2{from{transform:translate(0,0) scale(1.1)}to{transform:translate(-180px,60px) scale(.95)}}
@keyframes d3{from{transform:translate(0,0)}to{transform:translate(90px,-80px)}}
.tw{animation-name:tw;animation-timing-function:ease-in-out;animation-iteration-count:infinite}
@keyframes tw{0%,100%{opacity:.25}50%{opacity:1}}
.big{filter:url(#soft)}
.spark{animation:spark 5s ease-in-out infinite;opacity:0}
@keyframes spark{0%,100%{opacity:0}45%,55%{opacity:1}}
.met{opacity:0;animation-name:met;animation-timing-function:ease-out;animation-iteration-count:infinite}
@keyframes met{0%{opacity:0;transform:translate(0,0)}3%{opacity:1}12%{opacity:0;transform:translate(420px,175px)}100%{opacity:0;transform:translate(420px,175px)}}
.s1{animation:fly1 46s linear infinite}
.s2{animation:fly2 63s linear infinite;animation-delay:-20s}
.s3{animation:fly1 81s linear infinite;animation-delay:-55s}
@keyframes fly1{from{transform:translate(-160px,0)}to{transform:translate(${W + 160}px,-60px)}}
@keyframes fly2{from{transform:translate(${W + 160}px,0) scale(-1,1)}to{transform:translate(-160px,40px) scale(-1,1)}}
.bob{animation:bob 3.2s ease-in-out infinite alternate}
@keyframes bob{from{transform:translateY(-4px)}to{transform:translateY(4px)}}
.flame{animation:flame .18s steps(2) infinite alternate;transform-origin:-24px 0}
@keyframes flame{from{transform:scaleX(.8)}to{transform:scaleX(1.15)}}
.blink{animation:blink 1.2s steps(1) infinite}
@keyframes blink{0%,60%{opacity:1}61%,100%{opacity:.15}}
.ufo{animation:ufo 70s ease-in-out infinite alternate}
@keyframes ufo{0%{transform:translate(1180px,170px)}50%{transform:translate(1420px,110px)}100%{transform:translate(1260px,230px)}}
.ring{animation:ring 1.2s ease-in-out infinite;opacity:.3}
@keyframes ring{0%,100%{opacity:.3}50%{opacity:1}}
.beam{animation:beam 9s ease-in-out infinite;opacity:0}
@keyframes beam{0%,70%,100%{opacity:0}78%,92%{opacity:.55}}
.rows{animation:run 2.4s linear infinite}
@keyframes run{from{transform:translateY(0)}to{transform:translateY(48px)}}
.sun{animation:pulse 6s ease-in-out infinite}
@keyframes pulse{0%,100%{opacity:.75}50%{opacity:1}}
@media (prefers-reduced-motion: reduce){*{animation:none!important}.met,.spark,.beam{opacity:0}}
</style>
<defs>
<linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
<stop offset="0" stop-color="#03020a"/><stop offset=".55" stop-color="#0a0720"/><stop offset="1" stop-color="#12062a"/>
</linearGradient>
<radialGradient id="gb"><stop offset="0" stop-color="#2f6bff" stop-opacity=".55"/><stop offset="1" stop-color="#2f6bff" stop-opacity="0"/></radialGradient>
<radialGradient id="gp"><stop offset="0" stop-color="#a23bff" stop-opacity=".5"/><stop offset="1" stop-color="#a23bff" stop-opacity="0"/></radialGradient>
<radialGradient id="gc"><stop offset="0" stop-color="#00e5ff" stop-opacity=".28"/><stop offset="1" stop-color="#00e5ff" stop-opacity="0"/></radialGradient>
<radialGradient id="gm"><stop offset="0" stop-color="#ff4fd8" stop-opacity=".22"/><stop offset="1" stop-color="#ff4fd8" stop-opacity="0"/></radialGradient>
<linearGradient id="trail" x1="0" y1="0" x2="1" y2="1">
<stop offset="0" stop-color="#7fe9ff" stop-opacity="0"/><stop offset="1" stop-color="#ffffff" stop-opacity="1"/>
</linearGradient>
<linearGradient id="beam" x1="0" y1="0" x2="0" y2="1">
<stop offset="0" stop-color="#7fe9ff" stop-opacity=".8"/><stop offset="1" stop-color="#7fe9ff" stop-opacity="0"/>
</linearGradient>
<linearGradient id="sunfill" x1="0" y1="0" x2="0" y2="1">
<stop offset="0" stop-color="#ff4fd8"/><stop offset="1" stop-color="#6a2cff"/>
</linearGradient>
<linearGradient id="fade" x1="0" y1="0" x2="0" y2="1">
<stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".35" stop-color="#fff" stop-opacity=".7"/><stop offset="1" stop-color="#fff" stop-opacity="1"/>
</linearGradient>
<mask id="floor"><rect x="0" y="${HORIZON}" width="${W}" height="${H - HORIZON}" fill="url(#fade)"/></mask>
<clipPath id="below"><rect x="0" y="${HORIZON}" width="${W}" height="${H - HORIZON}"/></clipPath>
<clipPath id="above"><rect x="0" y="0" width="${W}" height="${HORIZON}"/></clipPath>
<filter id="glow" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="2.5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
<filter id="soft" x="-200%" y="-200%" width="500%" height="500%"><feGaussianBlur stdDeviation="1.6" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
</defs>
<rect width="${W}" height="${H}" fill="url(#sky)"/>
<ellipse class="o1" cx="260" cy="260" rx="520" ry="420" fill="url(#gb)"/>
<ellipse class="o2" cx="1360" cy="320" rx="560" ry="460" fill="url(#gp)"/>
<ellipse class="o3" cx="820" cy="140" rx="420" ry="260" fill="url(#gc)"/>
<ellipse class="o4" cx="560" cy="420" rx="380" ry="200" fill="url(#gm)"/>
<g clip-path="url(#above)">
${farStars}
${midStars}
${nearStars}
${sparkles}
${meteors}
<g class="ufo"><g class="bob" filter="url(#glow)">${ufo}</g></g>
<g transform="translate(0 150)"><g class="s1"><g class="bob" filter="url(#glow)">${ship('#7fe9ff', '#2fa8ff')}</g></g></g>
<g transform="translate(0 330)"><g class="s2"><g class="bob" filter="url(#glow)" style="animation-delay:-1s">${ship('#e9a3ff', '#b84dff')}</g></g></g>
<g transform="translate(0 520) scale(.7)"><g class="s3"><g class="bob" filter="url(#glow)">${ship('#9fb6ff', '#3d8bff')}</g></g></g>
</g>
<g class="sun" opacity=".85">
<circle cx="${VX}" cy="${HORIZON}" r="130" fill="url(#sunfill)" opacity=".35"/>
</g>
<rect x="0" y="${HORIZON}" width="${W}" height="${H - HORIZON}" fill="#05030d"/>
<g mask="url(#floor)" filter="url(#glow)" stroke-width="1.6" fill="none">
<g stroke="#7b5cff" opacity=".8">${rays}</g>
<g clip-path="url(#below)"><g class="rows" stroke="#2fa8ff" opacity=".85">${rows}</g></g>
</g>
<line x1="0" y1="${HORIZON}" x2="${W}" y2="${HORIZON}" stroke="#c46bff" stroke-width="2" filter="url(#glow)"/>
</svg>`
