import { createRequire } from 'module';
import type { ContentEditionLayoutProps } from 'intlayer-editor/client';
import type { FC } from 'react';

const BlankLayout: FC<ContentEditionLayoutProps> = ({ children }) => (
  <>{children}</>
);

const requireFunction = (packagePath: string) => {
  try {
    return typeof import.meta.url === 'undefined'
      ? require(packagePath)
      : createRequire(import.meta.url)(packagePath);
  } catch (error) {
    return undefined;
  }
};
// intlayer-editor is an optional dependency. If it's not installed, return the blank layout
export const ContentEditionLayout: FC<ContentEditionLayoutProps> =
  typeof requireFunction('intlayer-editor/client')?.ContentEditionLayoutBase ===
  'undefined'
    ? BlankLayout
    : requireFunction('intlayer-editor/client').ContentEditionLayoutBase;
