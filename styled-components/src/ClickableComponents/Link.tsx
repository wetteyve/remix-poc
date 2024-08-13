import React, { SyntheticEvent } from 'react';
import { LinkProps as ReactLinkProps } from 'react-router-dom';
import { styled } from 'styled-components';
import SvgChevron from '../icons/Chevron';
import SvgExternalLink from '../icons/ExternalLink';
import SmartLink from './SmartLink';
import { getContent } from './base-content';
import { baseStyle, colorSets, fontBySize } from './styles';
import {
  ExtendedSharedProps,
  OnlyIcon,
  RequiredText,
  SharedProps,
} from './typings';

type LinkProps = {
  to: string;
  rel?: 'nofollow';
  isInternal?: boolean;
  showDefaultIcon?: boolean;
  openInNewTab?: boolean;
  icon?: React.FunctionComponentElement<SVGSVGElement>;
  onClick?: (event?: SyntheticEvent<any>) => void;
} & Pick<ReactLinkProps, 'state' | 'download'>;
type CustomLinkIconProps = ExtendedSharedProps & LinkProps & OnlyIcon;
export type CustomLinkTextProps = ExtendedSharedProps &
  LinkProps &
  RequiredText;

const getDefaultIcon = (isInternal: boolean) =>
  isInternal ? <SvgChevron orientation="right" /> : <SvgExternalLink />;

export function Link({
  ariaLabel,
  colorSet = colorSets.primary,
  expand = false,
  fontType = 'Regular',
  icon,
  iconPositionRight = false,
  iconSize = 24,
  iconIndicator = false,
  isDisabled = false,
  isInternal = false,
  leftAligned = false,
  openInNewTab = false,
  showDefaultIcon = false,
  size = 'default',
  to,
  fontSize = fontBySize[size],
  ...rest
}: CustomLinkIconProps | CustomLinkTextProps) {
  const text = rest.type === 'text' ? rest.text : undefined;

  return (
    <StyledLink
      {...{
        colorSet,
        expand,
        fontType,
        fontSize,
        iconPositionRight,
        isDisabled,
        isInternal,
        leftAligned,
        openInNewTab,
        size,
        textColor: colorSet.color,
        to,
        ...rest,
      }}
      isActive={false}
      ariaLabel={ariaLabel}
    >
      {getContent({
        fontType,
        fontSize,
        icon: showDefaultIcon ? getDefaultIcon(isInternal) : icon,
        iconColor: colorSet.iconColor,
        iconPositionRight,
        iconIndicator,
        multilineText: rest.multilineText,
        text,
      })}
    </StyledLink>
  );
}

const StyledLink = styled(
  ({
    ariaLabel,
    children,
    className,
    isDisabled,
    isInternal,
    onClick,
    openInNewTab,
    rel,
    state,
    to,
    download,
  }: any) => (
    <SmartLink
      aria-label={ariaLabel}
      children={children}
      className={className}
      isInternal={isInternal}
      onClick={onClick}
      rel={rel}
      state={state}
      tabIndex={isDisabled ? -1 : 0}
      target={openInNewTab ? '_blank' : '_self'}
      to={to}
      download={download}
    />
  ),
)`
  ${baseStyle as any};
`;

type LinkIconProps = SharedProps & LinkProps & OnlyIcon;
export type LinkTextProps = SharedProps & LinkProps & RequiredText;
export const PrimaryLink = (props: LinkIconProps | LinkTextProps) => {
  return Link({ colorSet: colorSets.primary, ...props });
};
export const SecondaryLink = (props: LinkIconProps | LinkTextProps) => {
  return Link({ colorSet: colorSets.secondary, ...props });
};
export const AlertLink = (props: LinkIconProps | LinkTextProps) => {
  return Link({ colorSet: colorSets.alert, ...props });
};
export const TransparentLink = (props: LinkIconProps | LinkTextProps) => {
  return Link({ colorSet: colorSets.transparent, ...props });
};
