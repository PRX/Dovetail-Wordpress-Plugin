declare module '*.svg' {
  import React = require('react');

  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  export default content;
}

declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.gif';

/**
 * Value is expected but could be `null`.
 */
type Maybe<T> = T | null;
