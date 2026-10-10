/**
 * The Führerschein-Trainer mark: Flitzi, the app's little car, in priority-
 * road yellow on a road-sign-blue disc.
 *
 * An original mark: no federal eagle, no TÜV or DEKRA styling, and not a real
 * traffic sign, so nobody mistakes the app for an official one.
 */

export const COLOURS = {
  blue: '#1E88E5',
  blueDeep: '#1565C0',
  yellow: '#FFC63D',
  yellowDeep: '#E8A600',
  glass: '#E3F2FF',
  ink: '#1B2430',
  tyre: '#26303B',
  cream: '#FFFFFF',
};

const C = COLOURS;

/** Flitzi from the front, drawn in the mascot's 160-unit box. */
function car(body = C.yellow, deep = C.yellowDeep, face = true) {
  return `
  <rect x="30" y="112" width="24" height="26" rx="6" fill="${C.tyre}"/>
  <rect x="106" y="112" width="24" height="26" rx="6" fill="${C.tyre}"/>
  <path d="M42 76 L54 42 Q58 32 70 32 L90 32 Q102 32 106 42 L118 76 Z" fill="${body}"/>
  <rect x="20" y="70" width="120" height="52" rx="20" fill="${body}"/>
  <rect x="24" y="110" width="112" height="12" rx="6" fill="${deep}"/>
  <rect x="12" y="64" width="14" height="10" rx="4" fill="${deep}"/>
  <rect x="134" y="64" width="14" height="10" rx="4" fill="${deep}"/>
  <path d="M50 72 L60 46 Q63 40 70 40 L90 40 Q97 40 100 46 L110 72 Z" fill="${C.glass}"/>
  ${
    face
      ? `<circle cx="69" cy="57" r="9" fill="#FFFFFF"/><circle cx="91" cy="57" r="9" fill="#FFFFFF"/>
  <circle cx="69" cy="57" r="4.6" fill="${C.ink}"/><circle cx="91" cy="57" r="4.6" fill="${C.ink}"/>
  <circle cx="71" cy="55" r="1.6" fill="#FFFFFF"/><circle cx="93" cy="55" r="1.6" fill="#FFFFFF"/>
  <circle cx="40" cy="88" r="10" fill="#FFFFFF"/><circle cx="120" cy="88" r="10" fill="#FFFFFF"/>
  <path d="M62 94 Q80 110 98 94" fill="none" stroke="${C.ink}" stroke-width="4" stroke-linecap="round"/>`
      : ''
  }`;
}

function placed(scale, body, deep, face) {
  return `<g transform="translate(256 262) scale(${scale}) translate(-80 -85)">${car(body, deep, face)}</g>`;
}

/** Full badge, used for the app icon and favicon. */
export function badge() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  <rect width="512" height="512" fill="${C.cream}"/>
  <circle cx="256" cy="256" r="250" fill="${C.blue}"/>
  <circle cx="256" cy="256" r="226" fill="none" stroke="#FFFFFF" stroke-width="10"/>
  ${placed(2.3)}
</svg>`;
}

/** Android adaptive foreground: the car only, inset for the system mask. */
export function foreground() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  ${placed(1.7)}
</svg>`;
}

/** Android monochrome layer: one flat silhouette for themed icons. */
export function monochrome() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  <g transform="translate(256 262) scale(1.7) translate(-80 -85)">${car('#000000', '#000000', false)}</g>
</svg>`;
}

/** Splash: the badge on a plain field. */
export function splash() {
  return badge();
}
