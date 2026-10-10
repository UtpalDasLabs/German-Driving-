import React from 'react';
import Svg, { Circle, Ellipse, G, Line, Path, Polygon, Rect, Text } from 'react-native-svg';

import { KitProvider, type Kit } from '@/art/kit';

/**
 * react-native-svg as the drawing kit for src/art. The video workspace passes
 * the DOM kit instead, so both draw from the same code.
 */
export const rnKit = { Svg, G, Rect, Circle, Ellipse, Path, Polygon, Line, Text } as unknown as Kit;

export function ArtProvider({ children }: { children: React.ReactNode }) {
  return <KitProvider kit={rnKit}>{children}</KitProvider>;
}
