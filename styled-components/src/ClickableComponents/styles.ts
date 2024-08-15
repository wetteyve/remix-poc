import { css, DefaultTheme, Interpolation } from 'styled-components';
import { ThemedStyledProps } from 'styled-components/macro';
import { Colors, hexWithOpacity } from '../styles/Colors';
import { Device } from '../styles/Device';
import { Fonts, FontSize, FontType } from '../styles/Fonts';
import { MediaQuery, Viewports } from '../styles/Viewports';
import { BaseStyle, ColorSet, Size, Variant } from './typings';

type StyleBySize = Record<
  Size,
  Interpolation<
    ThemedStyledProps<
      { size: Size; fontSize: MediaQuery<FontSize> },
      DefaultTheme
    >
  >
>;

export const defaultHorizontalPadding = 12;

const boxModelBase = css`
  padding: 8px ${defaultHorizontalPadding}px;
  height: 40px;
  min-height: 40px;
`;
export const boxModelBySize: StyleBySize = {
  default: css`
    ${boxModelBase}
    ${Viewports.for('mediumUp')} {
      height: 48px;
      min-height: 48px;
    }
  `,
  small: css`
    ${boxModelBase}
    ${Viewports.for('mediumUp')} {
      height: 42px;
      min-height: 42px;
    }
  `,
  large: css`
    ${boxModelBase}
    ${Viewports.for('mediumUp')} {
      height: 48px;
      min-height: 48px;
    }
  `,
};

type FontBySize = Record<Size, MediaQuery<FontSize>>;
export const fontBySize: FontBySize = {
  default: { mediaQuery: [], default: 16 },
  small: { mediaQuery: [], default: 14 },
  large: { mediaQuery: [], default: 18 },
};

const responsiveFontSize = css<{
  fontSize: MediaQuery<FontSize>;
}>`
  ${({ fontSize }) => `font-size: ${fontSize.default}px;
  ${fontSize.mediaQuery.map(
    (query) =>
      `${Viewports.for(query[0])} {
      font-size: ${query[1]}px;
    }`,
  )}`}
`;

export const responsiveFontType = css<{
  fontType: FontType;
  fontSize: MediaQuery<FontSize>;
}>`
  ${({ fontSize, fontType }) => {
    return css`
      ${Fonts.byType(fontType, fontSize.default)};
      ${fontSize.mediaQuery.map(
        (query) =>
          `${Viewports.for(query[0])} {
            ${Fonts.byType(fontType, query[1])}
        }`,
      )}
    `;
  }}
`;

const disabledStyle = css`
  pointer-events: none;
`;

export const baseStyle = css<BaseStyle>`
  ${responsiveFontSize};
  ${responsiveFontType};
  color: ${({ colorSet, isActive, isDisabled }) => {
    switch (true) {
      case isActive:
        return colorSet.activeColor ?? colorSet.color;
      case isDisabled:
        return (
          colorSet.disabledColor ||
          (colorSet.color ? hexWithOpacity(colorSet.color, 50) : undefined)
        );
      default:
        return colorSet.color;
    }
  }};
  font-variant-numeric: tabular-nums;
  letter-spacing: 0.8px;
  white-space: ${({ multilineText }) =>
    multilineText ? 'pre-wrap' : 'nowrap'};
  display: grid;
  grid-auto-flow: column;
  grid-column-gap: ${({ spaceBetween }) => spaceBetween ?? 10}px;
  align-items: center;
  justify-content: ${({ leftAligned }) => (leftAligned ? 'start' : 'center')};
  transition: background-color 0.2s ease-in;
  width: ${({ expand }) => expand && '100%'};
  ${({ size }) => boxModelBySize[size] as any};
  background-color: ${({ colorSet, isActive, isDisabled }) => {
    switch (true) {
      case isActive:
        return colorSet.activeBackgroundColor ?? colorSet.backgroundColor;
      case isDisabled:
        return colorSet.disabledBackgroundColor ?? colorSet.backgroundColor;
      default:
        return colorSet.backgroundColor;
    }
  }};
  height: ${({ multilineText }) => multilineText && 'auto'};
  border-radius: 2px;

  ${({ isActive, isDisabled, colorSet }) => {
    if (isActive && !!colorSet.activeiconcolor)
      return `svg { color: ${colorSet.activeiconcolor}; }`;
    if (isDisabled && !!colorSet.disablediconcolor)
      return `svg { color: ${colorSet.disablediconcolor}; }`;
  }}

  ${Device.mouse} {
    :hover {
      background-color: ${({ colorSet }) =>
        colorSet.hoverBackgroundColor ?? colorSet.backgroundColor};
      color: ${({ colorSet }) => colorSet.hoverColor ?? colorSet.color};
      ${({ colorSet }) => {
        if (colorSet.hovericoncolor || colorSet.hoverColor) {
          return `svg { color: ${colorSet.hovericoncolor || colorSet.hoverColor}; }`;
        }
      }}
    }
  }

  :active {
    background-color: ${({ colorSet }) =>
      colorSet.activeBackgroundColor ?? colorSet.backgroundColor};
  }

  ${({ isDisabled }) => isDisabled && disabledStyle}
`;

export const colorSets: Record<Variant, Required<ColorSet>> = {
  primary: {
    color: Colors.GREY_232323,
    iconcolor: Colors.GREY_232323,
    backgroundColor: Colors.GREY_d2d2d2,
    activeBackgroundColor: Colors.GREY_e1e1e1,
    activeColor: Colors.GREY_232323,
    activeiconcolor: Colors.GREY_232323,
    hoverBackgroundColor: Colors.GREY_e1e1e1,
    hoverColor: Colors.GREY_232323,
    hovericoncolor: Colors.GREY_232323,
    disabledBackgroundColor: Colors.GREY_e1e1e1,
    disabledColor: hexWithOpacity(Colors.GREY_515151, 50),
    disablediconcolor: hexWithOpacity(Colors.GREY_515151, 50),
  },
  secondary: {
    color: Colors.WHITE,
    iconcolor: Colors.WHITE,
    backgroundColor: Colors.GREY_3a3a3a,
    activeBackgroundColor: Colors.GREY_4a4a4a,
    activeColor: Colors.WHITE,
    activeiconcolor: Colors.WHITE,
    hoverBackgroundColor: Colors.GREY_4a4a4a,
    hoverColor: Colors.WHITE,
    hovericoncolor: Colors.WHITE,
    disabledBackgroundColor: Colors.GREY_2a2a2a,
    disabledColor: hexWithOpacity(Colors.WHITE, 50),
    disablediconcolor: hexWithOpacity(Colors.WHITE, 50),
  },
  transparent: {
    color: Colors.GREY_d2d2d2,
    iconcolor: Colors.GREY_d2d2d2,
    backgroundColor: 'transparent',
    activeBackgroundColor: Colors.GREY_4a4a4a,
    activeColor: Colors.GREY_d2d2d2,
    activeiconcolor: Colors.GREY_d2d2d2,
    hoverBackgroundColor: 'transparent',
    hoverColor: Colors.GREY_d2d2d2,
    hovericoncolor: Colors.GREY_d2d2d2,
    disabledBackgroundColor: Colors.GREY_4a4a4a,
    disabledColor: hexWithOpacity(Colors.GREY_d2d2d2, 50),
    disablediconcolor: hexWithOpacity(Colors.GREY_d2d2d2, 50),
  },
  alert: {
    color: Colors.WHITE,
    iconcolor: Colors.WHITE,
    backgroundColor: Colors.RED_cc001a,
    activeBackgroundColor: Colors.RED_d50000,
    activeColor: Colors.WHITE,
    activeiconcolor: Colors.WHITE,
    hoverBackgroundColor: Colors.RED_d50000,
    hoverColor: Colors.WHITE,
    hovericoncolor: Colors.WHITE,
    disabledBackgroundColor: Colors.RED_cc001a,
    disabledColor: hexWithOpacity(Colors.WHITE, 50),
    disablediconcolor: hexWithOpacity(Colors.WHITE, 50),
  },
  toggle: {
    color: Colors.GREY_969696,
    hoverColor: 'inherit',
    activeColor: Colors.WHITE,
    iconcolor: Colors.GREY_969696,
    hovericoncolor: 'inherit',
    activeiconcolor: Colors.WHITE,
    backgroundColor: 'transparent',
    hoverBackgroundColor: Colors.GREY_4a4a4a,
    activeBackgroundColor: Colors.GREY_4a4a4a,
    disabledBackgroundColor: 'transparent',
    disabledColor: hexWithOpacity(Colors.GREY_969696, 50),
    disablediconcolor: hexWithOpacity(Colors.GREY_969696, 50),
  },
};
