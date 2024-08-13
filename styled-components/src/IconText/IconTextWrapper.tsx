import React from 'react';
import { styled } from 'styled-components';
import { FontSize, FontType } from '../styles/Fonts';
import { MediaQuery } from '../styles/Viewports';
import IconText from './IconText';

export type TextIconProps = {
  icon: JSX.Element;
  iconSize?: number;
  iconColor?: string;
  text: string;
  fontSize?: MediaQuery<FontSize>;
  fontType?: FontType;
  spaceBetween?: number;
  onClick?: React.MouseEventHandler<any>;
};

const IconTextWrapper = ({ onClick, ...rest }: TextIconProps) => {
  return (
    <Wrapper onClick={onClick}>
      <IconText {...rest} />
    </Wrapper>
  );
};

export default IconTextWrapper;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;
