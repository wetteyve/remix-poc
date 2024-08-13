import React from 'react';

const SvgExternalLink = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" {...props}>
    <path
      fill="currentColor"
      d="M18.8 5.2V18c0 .5-.3.8-.8.8s-.8-.3-.8-.8V7.9L6.7 18.5c-.1.1-.3.2-.5.2s-.4-.1-.6-.2-.3-.3-.3-.5.1-.4.2-.6L16.1 6.8H6c-.4 0-.8-.3-.8-.8 0-.4.3-.8.8-.8h12.8z"
    />
  </svg>
);

export default SvgExternalLink;
