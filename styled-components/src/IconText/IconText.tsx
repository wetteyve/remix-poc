import React, { Fragment } from 'react';
import { styled } from 'styled-components';
import { fontBySize, responsiveFontType } from '../ClickableComponents/styles';
import { Colors } from '../styles/Colors';
import { ellipsis } from '../styles/style-helper';
import { TextIconProps } from './IconTextWrapper';

export type IconTextProps = TextIconProps & {
  iconpositionright?: boolean;
  fontColor?: string;
  multilineText?: boolean;
  iconIndicator?: boolean;
};

const IconText = ({
  icon,
  iconsize = 24,
  iconcolor = 'inherit',
  iconpositionright = false,
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
      iconsize={iconsize}
      iconcolor={iconcolor}
      iconpositionright={iconpositionright ? 'true' : 'false'}
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
  iconsize: number;
  iconcolor: string;
  iconpositionright: 'true' | 'false';
}>`
  font-size: ${({ iconsize }) => iconsize}px;
  height: ${({ iconsize }) => iconsize}px;
  color: ${({ iconcolor }) => iconcolor};
  box-sizing: content-box;
  display: flex;
  order: ${({ iconpositionright }) => (iconpositionright === 'true' ? 1 : 0)};
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
