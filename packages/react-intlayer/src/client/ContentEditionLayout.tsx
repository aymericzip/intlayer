import {
  ContentEditionLayout as ContentEditionLayoutBase,
  type ContentEditionLayoutProps,
} from 'intlayer-editor/client';
import type { FC } from 'react';

const BlankLayout: FC<ContentEditionLayoutProps> = ({ children }) => (
  <>{children}</>
);

// intlayer-editor is an optional dependency. If it's not installed, return the blank layout
export const ContentEditionLayout: FC<ContentEditionLayoutProps> =
  typeof ContentEditionLayoutBase === 'undefined'
    ? BlankLayout
    : ContentEditionLayoutBase;
