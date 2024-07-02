import { createRequire } from 'module';
import type { ContentEditionLayoutProps } from 'intlayer-editor/client';
import type { FC } from 'react';

const BlankLayout: FC<ContentEditionLayoutProps> = ({ children }) => (
  <>{children}</>
);

const requireFunction = () => {
  try {
    return typeof import.meta.url === 'undefined'
      ? require('intlayer-editor/client')
      : createRequire(import.meta.url)('intlayer-editor/client');
  } catch (error) {
    return undefined;
  }
};
// intlayer-editor is an optional dependency. If it's not installed, return the blank layout
export const ContentEditionLayout: FC<ContentEditionLayoutProps> =
  typeof requireFunction()?.ContentEditionLayoutBase === 'undefined'
    ? BlankLayout
    : requireFunction().ContentEditionLayoutBase;
