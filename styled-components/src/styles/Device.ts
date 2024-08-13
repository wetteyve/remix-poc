export const mediaNoHover = '(any-hover: none)';
export const mediaShittyPointer = '(pointer: coarse)';
export const mediaHover = '(hover: hover)';

export const Device = {
  // '@media (any-hover: none), (any-pointer: coarse)', Touch with mouse. i.e. Notebook with touchscreen as secondary pointer
  touch: `@media ${mediaNoHover}, ${mediaShittyPointer}`,
  mouse: `@media ${mediaHover}`,
};
