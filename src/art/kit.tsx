import React, { createContext, useContext } from 'react';

/**
 * The drawing primitives the artwork is written against.
 *
 * Road signs and traffic scenes are drawn once and rendered in two places: the
 * app, through react-native-svg, and the videos, through plain DOM <svg>. Both
 * accept the same SVG attribute names (fill, stroke, strokeWidth, transform as
 * a string, textAnchor...), so the art only has to be handed the right set of
 * components. Nothing under src/art imports react-native, which is what lets
 * the video workspace bundle it without a React Native shim.
 */
type P = Record<string, unknown> & { children?: React.ReactNode };
type C = React.ComponentType<P>;

export type Kit = {
  Svg: C;
  G: C;
  Rect: C;
  Circle: C;
  Ellipse: C;
  Path: C;
  Polygon: C;
  Line: C;
  Text: C;
};

const KitContext = createContext<Kit | null>(null);

export function KitProvider({ kit, children }: { kit: Kit; children: React.ReactNode }) {
  return <KitContext.Provider value={kit}>{children}</KitContext.Provider>;
}

export function useKit(): Kit {
  const kit = useContext(KitContext);
  if (!kit) throw new Error('Artwork rendered outside a <KitProvider>');
  return kit;
}

/** The DOM implementation, used by the video workspace and by tests. */
export const domKit: Kit = {
  Svg: ({ accessibilityLabel: _a, accessibilityRole: _r, ...p }) => (
    <svg xmlns="http://www.w3.org/2000/svg" {...(p as object)} />
  ),
  G: (p) => <g {...(p as object)} />,
  Rect: (p) => <rect {...(p as object)} />,
  Circle: (p) => <circle {...(p as object)} />,
  Ellipse: (p) => <ellipse {...(p as object)} />,
  Path: (p) => <path {...(p as object)} />,
  Polygon: (p) => <polygon {...(p as object)} />,
  Line: (p) => <line {...(p as object)} />,
  Text: (p) => <text {...(p as object)} />,
};
