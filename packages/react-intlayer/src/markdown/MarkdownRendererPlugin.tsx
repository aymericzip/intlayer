import configuration from '@intlayer/config/built';
import type { KeyPath } from '@intlayer/types/keyPath';
import type { LocalesValues } from '@intlayer/types/module_augmentation';
import { type FC, lazy, type ReactNode, Suspense } from 'react';
import type { HTMLComponents } from '../html/HTMLComponentTypes';
import {
  type MarkdownProviderOptions,
  useMarkdownContext,
} from './MarkdownProvider';

type MarkdownRendererPluginProps = {
  dictionaryKey: string;
  keyPath: KeyPath[];
  locale?: LocalesValues;
  children: string;
  options?: MarkdownProviderOptions;
  components?: HTMLComponents<'permissive', {}>;
};

export const MarkdownRendererPlugin: FC<MarkdownRendererPluginProps> = (
  props
): ReactNode => {
  const { children, options, components } = props;
  const context = useMarkdownContext();
  const renderMarkdown = context?.renderMarkdown ?? ((md) => md);
  const contentToRender = children;

  return renderMarkdown(contentToRender, options, {
    ...(context?.components ?? {}),
    ...(components ?? {}),
  });
};

type MarkdownMetadataRendererProps = MarkdownRendererPluginProps & {
  metadataKeyPath: KeyPath[];
};

const DynamicMarkdownMetadataRendererInternal = lazy(() =>
  import('./MarkdownMetadataRendererInternal').then((m) => ({
    default: m.MarkdownMetadataRendererInternal,
  }))
);

export const MarkdownMetadataRenderer: FC<MarkdownMetadataRendererProps> = (
  props
): ReactNode => {
  const { editor } = configuration ?? {};
  const isEnabled = editor?.enabled ?? false;

  if (typeof window !== 'undefined' && isEnabled) {
    return (
      <Suspense fallback={null}>
        <DynamicMarkdownMetadataRendererInternal {...props} />
      </Suspense>
    );
  }

  return null;
};
