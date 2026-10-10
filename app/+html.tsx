import { ScrollViewStyleReset } from 'expo-router/html';
import React from 'react';

import { BRAND_MARK_SVG } from '@/data/brandMark';

/**
 * The HTML shell every statically rendered page is wrapped in.
 *
 * Two things here have to happen before React mounts: the splash, so the app
 * does not flash an empty white page while the bundle parses, and the capture
 * of `beforeinstallprompt`, which Chromium fires early and only once.
 */
export default function Root({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no, viewport-fit=cover"
        />

        <meta
          name="description"
          content="Führerschein-Trainer: German driving theory test practice in 13 languages, the practical test explained, and converting a foreign licence."
        />
        <meta name="theme-color" content="#1E88E5" />

        {/* Installable app. Relative paths so it works under a repo sub-path. */}
        <link rel="manifest" href="manifest.json" />
        <link rel="apple-touch-icon" href="icon-192.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Führerschein" />
        <meta name="mobile-web-app-capable" content="yes" />

        {/* Keeps <ScrollView> from scrolling the page body. */}
        <ScrollViewStyleReset />

        <style dangerouslySetInnerHTML={{ __html: BASE_STYLE }} />
        <script dangerouslySetInnerHTML={{ __html: INSTALL_CAPTURE }} />
      </head>
      <body>
        {/* Painted immediately, removed by the app once it has mounted. */}
        <div id="fs-splash" aria-hidden="true">
          <div id="fs-splash-mark" dangerouslySetInnerHTML={{ __html: BRAND_MARK_SVG }} />
          <div id="fs-splash-name">Führerschein-Trainer</div>
          <div id="fs-splash-sub">Theorie &amp; Praxis · Klasse B</div>
        </div>
        {children}
      </body>
    </html>
  );
}

/**
 * Chromium fires `beforeinstallprompt` once, often before the bundle has
 * parsed. Stashing it here is the only way the install button can exist later.
 */
const INSTALL_CAPTURE = `
window.__fsInstallPrompt = null;
window.addEventListener('beforeinstallprompt', function (e) {
  e.preventDefault();
  window.__fsInstallPrompt = e;
  window.dispatchEvent(new Event('fs-installable'));
});
window.addEventListener('appinstalled', function () {
  window.__fsInstallPrompt = null;
});
`;

const BASE_STYLE = `
body { background-color: #FFFFFF; }

#fs-splash {
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 14px;
  background: #FFFFFF;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  transition: opacity 260ms ease;
}
#fs-splash.fs-splash-done { opacity: 0; pointer-events: none; }
#fs-splash-mark svg { width: 128px; height: 128px; display: block; }
#fs-splash-name { font-size: 26px; font-weight: 800; color: #14181F; letter-spacing: -0.2px; }
#fs-splash-sub { font-size: 12px; font-weight: 700; color: #8C97A8; letter-spacing: 1px; text-transform: uppercase; }

@media (prefers-color-scheme: dark) {
  body { background-color: #131720; }
  #fs-splash { background: #131720; }
  #fs-splash-name { color: #F3F6FB; }
  #fs-splash-sub { color: #74829A; }
}
`;
