type ViewportRange = { from: number; to: number };

export const smallRange: ViewportRange = { from: 0, to: 719 };
export const mediumRange: ViewportRange = { from: 720, to: 1023 };
export const largeRange: ViewportRange = { from: 1024, to: 1279 };
export const xLargeRange: Omit<ViewportRange, 'to'> = { from: 1280 };

export type Viewport =
  | 'small'
  | 'medium'
  | 'mediumUp'
  | 'mediumDown'
  | 'large'
  | 'largeUp'
  | 'xLargeUp';

export const mediaQueries: Record<Viewport, string> = {
  small: `only screen and (min-width:${smallRange.from}px) and (max-width: ${smallRange.to}px)`,
  medium: `only screen and (min-width:${mediumRange.from}px) and (max-width: ${mediumRange.to}px)`,
  large: `only screen and (min-width:${largeRange.from}px) and (max-width: ${largeRange.to}px)`,
  mediumUp: `only screen and (min-width:${mediumRange.from}px)`,
  mediumDown: `only screen and (max-width:${mediumRange.to}px)`,
  largeUp: `only screen and (min-width:${largeRange.from}px)`,
  xLargeUp: `only screen and (min-width:${xLargeRange.from}px)`,
};

export const Viewports = {
  for: (viewport: Viewport) => `@media ${mediaQueries[viewport]}`,
};

export type ViewportOrientation = 'portrait' | 'landscape';

const orientationMediaQueries: Record<ViewportOrientation, string> = {
  portrait: '(orientation: portrait)',
  landscape: '(orientation: landscape)',
};

export const Orientations = {
  for: (orientation: ViewportOrientation) =>
    `@media ${orientationMediaQueries[orientation]}`,
};

type QueryType = Viewport | ViewportOrientation;
export type MediaQuery<T1, T2 extends QueryType = Viewport> = {
  mediaQuery: [T2, T1][];
  default: T1;
};
