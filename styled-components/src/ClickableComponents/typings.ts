import { FontSize, FontType } from '../styles/Fonts';
import { MediaQuery } from '../styles/Viewports';

export type OnlyIcon = {
  type: 'icon';
  ariaLabel: string;
  icon: JSX.Element;
};
export type RequiredText = {
  type: 'text';
  text: string;
  icon?: JSX.Element;
};
export type RequiredTextIcon = {
  type: 'textIcon';
  text: string;
  icon: JSX.Element;
};

export type ColorSet = {
  color?: string;
  iconcolor?: string;
  backgroundColor?: string;
  hoverColor?: string;
  hovericoncolor?: string;
  hoverBackgroundColor?: string;
  activeColor?: string;
  activeiconcolor?: string;
  activeBackgroundColor?: string;
  disabledColor?: string;
  disablediconcolor?: string;
  disabledBackgroundColor?: string;
};

export const SIZES = ['small', 'default', 'large'] as const;
type Sizes = typeof SIZES;
export type Size = Sizes[number];
export const VARIANTS = [
  'primary',
  'secondary',
  'alert',
  'transparent',
  'toggle',
] as const;
type Variants = typeof VARIANTS;
export type Variant = Variants[number];

type Base = {
  expand: boolean;
  fontType: FontType;
  fontSize: MediaQuery<FontSize>;
  iconpositionright?: boolean;
  isDisabled: boolean;
  leftAligned: boolean;
  multilineText: boolean;
  size: Size;
  spaceBetween?: number;
};

export type BaseStyle = Base & {
  colorSet: ColorSet;
  isActive: boolean;
};

export type SharedProps = Partial<Base> & {
  ariaLabel?: string;
  className?: string;
  iconsize?: number;
  iconIndicator?: boolean;
  tabIndex?: number;
};

export type ExtendedSharedProps = SharedProps & {
  colorSet?: ColorSet;
};
