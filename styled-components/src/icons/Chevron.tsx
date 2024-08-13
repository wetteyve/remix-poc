import React from 'react';

type Orientation = 'up' | 'left' | 'down' | 'right';

const rotation: Record<Orientation, number> = {
  up: 90,
  down: 270,
  left: 0,
  right: 180,
};

type Props = {
  orientation?: Orientation;
} & React.SVGProps<SVGSVGElement>;

const SvgChevron = ({ orientation = 'left', ...props }: Props) => {
  return (
    <svg
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      {...props}
      style={{
        ...props.style,
        transform: `rotate(${rotation[orientation]}deg)`,
      }}
    >
      <path
        fill="currentColor"
        d="M15.9 20.8c.1.1.3.2.5.2s.3-.1.5-.2c.3-.2.3-.7 0-.9L8.6 12l8.2-7.9c.3-.2.3-.7 0-.9s-.7-.2-.9 0l-8.7 8.4c-.3.2-.3.7 0 .9l8.7 8.3z"
      />
    </svg>
  );
};

export default SvgChevron;
