import React, { Fragment } from 'react';
import { styled } from 'styled-components';
import { Colors } from '../styles/Colors';

type Props = {
  size?: number;
  color?: string;
  icon: React.FunctionComponentElement<SVGSVGElement>;
  className?: string;
  title?: string;
  iconIndicator?: boolean;
};

const IconWrapper = ({
  size = 24,
  color,
  icon,
  className,
  title,
  iconIndicator,
}: Props) => {
  return (
    <Fragment>
      <StyledIcon className={className} size={size} color={color} title={title}>
        {icon}
        {iconIndicator && <Indicator />}
      </StyledIcon>
    </Fragment>
  );
};

export default IconWrapper;

const StyledIcon = styled(({ className, children, title }: any) => (
  <div className={className} children={children} title={title} />
))`
  font-size: ${(props) => props.size}px;
  display: flex;
  align-items: center;
  color: ${(props) => props.color || 'inherit'};
  justify-content: center;
`;

const Indicator = styled.span`
  height: 12px;
  width: 12px;
  background-color: ${Colors.RED_b10017};
  border-radius: 50%;
  margin: 0 -12px auto 0;
`;
