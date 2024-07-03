import { createRequire } from 'module';
import type {
  IntlayerEditorElementProps,
  RenderIntlayerEditorResult,
} from 'intlayer-editor/client';
import type { FC } from 'react';

const requireFunction = () => {
  try {
    return typeof import.meta.url === 'undefined'
      ? require('intlayer-editor/client')
      : createRequire(import.meta.url)('intlayer-editor/client');
  } catch (error) {
    return undefined;
  }
};

const IntlayerEditorElement: FC<IntlayerEditorElementProps> = ({
  content,
  ..._props
}) => content;

export const renderIntlayerEditor = (
  props: IntlayerEditorElementProps
): RenderIntlayerEditorResult => {
  const _renderIntlayerEditor = requireFunction()?.renderIntlayerEditor;

  if (typeof _renderIntlayerEditor === 'undefined') {
    const Result = <IntlayerEditorElement {...props} />;

    return { ...Result, value: props.content };
  }

  return _renderIntlayerEditor(props);
};
