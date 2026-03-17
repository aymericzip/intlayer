'use client';

import configuration from '@intlayer/config/built';
import type { Locale } from '@intlayer/types/allLocales';
import type { KeyPath } from '@intlayer/types/keyPath';
import { type FC, lazy, Suspense } from 'react';

type EditedContentRendererProps = {
  dictionaryKey: string;
  keyPath: KeyPath[];
  children: string;
  locale?: Locale;
};

export const useEditedContentRenderer = ({
  children,
}: EditedContentRendererProps) => {
  return children;
};

const DynamicEditedContentRendererInternal = lazy(() =>
  import('./EditedContentRendererInternal').then((module) => ({
    default: module.EditedContentRendererInternal,
  }))
);

export const EditedContentRenderer: FC<EditedContentRendererProps> = (
  props
) => {
  const { editor } = configuration ?? {};
  const isEnabled = editor?.enabled ?? false;

  if (typeof window !== 'undefined' && isEnabled) {
    return (
      <Suspense fallback={props.children}>
        <DynamicEditedContentRendererInternal {...props} />
      </Suspense>
    );
  }

  return <>{props.children}</>;
};
