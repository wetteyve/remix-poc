import React, { SyntheticEvent } from 'react';
import { styled } from 'styled-components';
import { Colors } from '../styles/Colors';
import { getContent } from './base-content';
import { baseStyle, colorSets, fontBySize } from './styles';
import {
  ExtendedSharedProps,
  OnlyIcon,
  RequiredText,
  SharedProps,
} from './typings';

type ButtonProps = {
  isActive?: boolean;
  onClick?: (event?: SyntheticEvent<any>) => void;
  ariaPressed?: boolean;
};
export type CustomButtonIconProps = ExtendedSharedProps &
  ButtonProps &
  OnlyIcon;
export type CustomButtonTextProps = ExtendedSharedProps &
  ButtonProps &
  RequiredText;

function Button({
  ariaLabel,
  colorSet = colorSets.primary,
  expand = false,
  fontType = 'Regular',
  icon,
  iconSize = 24,
  iconIndicator = false,
  isActive = false,
  isDisabled = false,
  leftAligned = false,
  size = 'default',
  fontSize = fontBySize[size],
  ...rest
}: CustomButtonIconProps | CustomButtonTextProps) {
  const text = rest.type === 'text' ? rest.text : undefined;

  return (
    <StyledButton
      {...{
        ariaLabel,
        colorSet,
        expand,
        fontType,
        fontSize,
        isActive,
        isDisabled,
        leftAligned,
        size,
        ...rest,
      }}
    >
      {getContent({
        fontType,
        fontSize,
        icon,
        iconColor: colorSet.iconColor,
        iconSize,
        iconIndicator,
        multilineText: rest.multilineText,
        text,
      })}
    </StyledButton>
  );
}

export default Button;

const StyledButton = styled(
  ({
    ariaLabel,
    ariaPressed,
    children,
    className,
    isDisabled,
    onClick,
    tabIndex,
  }: any) => (
    <button
      aria-label={ariaLabel}
      aria-pressed={ariaPressed}
      children={children}
      className={className}
      disabled={isDisabled}
      onClick={onClick}
      tabIndex={tabIndex}
    />
  ),
)`
  ${baseStyle as any};
`;

type ButtonIconProps = SharedProps & ButtonProps & OnlyIcon;
export type ButtonTextProps = SharedProps & ButtonProps & RequiredText;
export const PrimaryButton = (props: ButtonIconProps | ButtonTextProps) => {
  return Button({ colorSet: colorSets.primary, ...props });
};
export const SecondaryButton = (props: ButtonIconProps | ButtonTextProps) => {
  return Button({ colorSet: colorSets.secondary, ...props });
};
export const AlertButton = (props: ButtonIconProps | ButtonTextProps) => {
  return Button({ colorSet: colorSets.alert, ...props });
};
export const TransparentButton = (props: ButtonIconProps | ButtonTextProps) => {
  return Button({ colorSet: colorSets.transparent, ...props });
};

export const ToggleButton = (props: ButtonIconProps | ButtonTextProps) => {
  return Button({
    colorSet: {
      ...colorSets.toggle,
      hoverIconColor: props.isActive ? Colors.WHITE : Colors.GREY_969696,
      hoverColor: props.isActive ? Colors.WHITE : Colors.GREY_969696,
    },
    ariaPressed: props.isActive,
    ...props,
  });
};
