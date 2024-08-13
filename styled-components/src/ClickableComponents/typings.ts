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
  iconColor?: string;
  backgroundColor?: string;
  hoverColor?: string;
  hoverIconColor?: string;
  hoverBackgroundColor?: string;
  activeColor?: string;
  activeIconColor?: string;
  activeBackgroundColor?: string;
  disabledColor?: string;
  disabledIconColor?: string;
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
  iconPositionRight?: boolean;
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
  iconSize?: number;
  iconIndicator?: boolean;
  tabIndex?: number;
};

export type ExtendedSharedProps = SharedProps & {
  colorSet?: ColorSet;
};
