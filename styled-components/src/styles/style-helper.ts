import { css } from 'styled-components';
import { Colors } from './Colors';
import { MediaQuery, Viewports } from './Viewports';

export const globalOutline = css`
  outline: #4d90fe auto 1px;
`;

export const globalOutlineBorder = css`
  border: 1px #4d90fe solid;
`;

/* getEllipsis vs getMultilineTruncation:
 - getEllipsis have to set width, content grow up to this width. cuts at any character
 - getMultilineTruncation does not let element grow, cuts at the end of the word
*/
export const getMultilineTruncation = (
  maxLines: number,
  lineHeight: number,
) => css`
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  line-height: ${lineHeight}px;
  -webkit-line-clamp: ${maxLines};
  max-height: ${maxLines * lineHeight}px;
  white-space: initial;
`;

export const ellipsis = css`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const hideScrollbar = () => css`
  scrollbar-width: none;
  -webkit-overflow-scrolling: touch;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const smallScrollbar = () => css`
  ::-webkit-scrollbar {
    width: 11px;
  }

  ::-webkit-scrollbar-track {
    background-color: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background-color: ${Colors.GREY_515151};
    border-left: 3px solid transparent;
    border-right: 3px solid transparent;
    border-radius: 5.5px;
    background-clip: content-box;
  }
`;

type Kebab<
  T extends string,
  A extends string = '',
> = T extends `${infer F}${infer R}`
  ? Kebab<R, `${A}${F extends Lowercase<F> ? '' : '-'}${Lowercase<F>}`>
  : A;

type KebabKeys<T> = { [K in keyof T as K extends string ? Kebab<K> : K]: T[K] };

export const getMappedMediaQuery = <T>(
  mediaQuery: MediaQuery<T>,
  property: keyof KebabKeys<React.CSSProperties>,
) => css`
  ${`${property}: ${mediaQuery.default}`};
  ${mediaQuery.mediaQuery.map(
    ([viewport, value]) => `${Viewports.for(viewport)} {
    ${property}: ${value};
  }`,
  )}
`;
