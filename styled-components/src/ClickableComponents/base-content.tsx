import React from 'react';
import IconText, { IconTextProps } from '../IconText/IconText';
import IconWrapper from '../IconWrapper/IconWrapper';
import { FontSize, FontType } from '../styles/Fonts';
import { MediaQuery } from '../styles/Viewports';

type ContentProps = {
  icon?: JSX.Element;
  iconSize?: number;
  iconColor?: string;
  iconPositionRight?: boolean;
  text?: string;
  fontSize?: MediaQuery<FontSize>;
  fontType?: FontType;
  multilineText?: boolean;
  iconIndicator?: boolean;
};

export const getContent = (props: ContentProps) => {
  if (props.icon && props.text) {
    return <IconText {...(props as IconTextProps)} spaceBetween={0} />;
  } else if (props.text) {
    return props.text;
  } else if (props.icon) {
    return (
      <IconWrapper
        icon={props.icon}
        color={props.iconColor}
        size={props.iconSize}
        iconIndicator={props.iconIndicator}
      />
    );
  }
};
