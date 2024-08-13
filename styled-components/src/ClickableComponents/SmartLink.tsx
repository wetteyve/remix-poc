import React, { Fragment, ReactNode } from 'react';
import { Link, LinkProps } from 'react-router-dom';

export type SmartLinkProps = {
  to: string;
  isInternal: boolean;
  children?: ReactNode;
} & React.PropsWithoutRef<JSX.IntrinsicElements['a']> &
  Pick<LinkProps, 'state'>;

const SmartLink = ({ to, isInternal, children, ...rest }: SmartLinkProps) => (
  <Fragment>
    {isInternal ? (
      <Link to={to} {...rest}>
        {children}
      </Link>
    ) : (
      <a href={to} {...rest}>
        {children}
      </a>
    )}
  </Fragment>
);

export default SmartLink;
