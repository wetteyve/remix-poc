import { css } from 'styled-components';

export type FontType = 'Regular' | 'Light' | 'Medium' | 'Bold';

export type FontWeight = 400 | 300 | 500 | 700 | 'inherit';

const fontWeightMapper: Record<FontType, FontWeight> = {
  Regular: 400,
  Light: 300,
  Medium: 500,
  Bold: 700,
};

export type FontSize =
  | 11
  | 12
  | 14
  | 16
  | 18
  | 20
  | 22
  | 24
  | 28
  | 34
  | 36
  | 40
  | 60
  | 120
  | 'inherit';

type ElementType = 'default' | 'interactive';

export const Fonts = {
  regular: (fontSize?: FontSize, elementType?: ElementType) =>
    Font(fontWeightMapper.Regular, fontSize, elementType),
  light: (fontSize?: FontSize, elementType?: ElementType) =>
    Font(fontWeightMapper.Light, fontSize, elementType),
  medium: (fontSize?: FontSize, elementType?: ElementType) =>
    Font(fontWeightMapper.Medium, fontSize, elementType),
  bold: (fontSize?: FontSize, elementType?: ElementType) =>
    Font(fontWeightMapper.Bold, fontSize, elementType),
  byType: (
    fontType: FontType,
    fontSize?: FontSize,
    elementType?: ElementType,
  ) => Font(fontWeightMapper[fontType], fontSize, elementType),
};

const Font = (
  fontWeight: FontWeight = 'inherit',
  fontSize: FontSize = 'inherit',
  elementType: ElementType = 'default',
) => {
  return css`
    font-variation-settings: 'wght' ${fontWeight};
    font-weight: ${fontWeight};
    letter-spacing: ${getLetterSpacing(fontSize, elementType)};
    font-size: ${getFontSize(fontSize)};
  `;
};

const getLetterSpacing = (fontSize: FontSize, elementType: ElementType) => {
  if (elementType === 'interactive') {
    return '0.8px';
  }
  if (typeof fontSize === 'number') {
    if (fontSize > 24) {
      return 'normal';
    } else if (fontSize >= 20) {
      return '0.2px';
    } else if (fontSize >= 12) {
      return '0.4px';
    }
  }
  return 'initial';
};

export const getFontSize = (fontSize: FontSize = 'inherit') => {
  if (fontSize === 'inherit') {
    return 'inherit';
  }
  return `${fontSize}px`;
};
