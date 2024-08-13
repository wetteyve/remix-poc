import React, { Fragment } from 'react';
import { styled } from 'styled-components';
import { fontBySize, responsiveFontType } from '../ClickableComponents/styles';
import { Colors } from '../styles/Colors';
import { ellipsis } from '../styles/style-helper';
import { TextIconProps } from './IconTextWrapper';

export type IconTextProps = TextIconProps & {
  iconPositionRight?: boolean;
  fontColor?: string;
  multilineText?: boolean;
  iconIndicator?: boolean;
};

const IconText = ({
  icon,
  iconSize = 24,
  iconColor = 'inherit',
  iconPositionRight = false,
  text,
  fontSize = fontBySize.default,
  fontType = 'Regular',
  fontColor = 'inherit',
  spaceBetween = 10,
  multilineText = false,
  iconIndicator,
}: IconTextProps) => (
  <Fragment>
    <Icon
      iconSize={iconSize}
      iconColor={iconColor}
      iconPositionRight={iconPositionRight}
    >
      {icon}
      {iconIndicator && <Indicator />}
    </Icon>
    <Text
      fontType={fontType}
      fontSize={fontSize}
      fontColor={fontColor}
      spaceBetween={spaceBetween}
      multilineText={multilineText}
    >
      {text}
    </Text>
  </Fragment>
);

export default IconText;

const Icon = styled.div<{
  iconSize: number;
  iconColor: string;
  iconPositionRight: boolean;
}>`
  font-size: ${({ iconSize }) => iconSize}px;
  height: ${({ iconSize }) => iconSize}px;
  color: ${({ iconColor }) => iconColor};
  box-sizing: content-box;
  display: flex;
  order: ${({ iconPositionRight }) => (iconPositionRight ? 1 : 0)};
`;

export const Text = styled(({ className, children }: any) => (
  <div className={className} children={children} />
))`
  align-items: center;
  ${responsiveFontType as any};
  letter-spacing: inherit;
  padding-left: ${({ spaceBetween }) => spaceBetween}px;
  white-space: pre-wrap;
  color: ${(props) => props.fontColor};
  ${({ multilineText }) => !multilineText && (ellipsis as any)};
`;

const Indicator = styled.span`
  height: 8px;
  width: 8px;
  background-color: ${Colors.RED_b10017};
  border-radius: 50%;
  margin: 0 -8px auto 0;
`;
