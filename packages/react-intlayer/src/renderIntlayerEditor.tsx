import { createRequire } from 'module';
import type { IntlayerEditorElementProps } from 'intlayer-editor/client';

const requireFunction = () => {
  try {
    return typeof import.meta.url === 'undefined'
      ? require('intlayer-editor/client')
      : createRequire(import.meta.url)('intlayer-editor/client');
  } catch (error) {
    return undefined;
  }
};

const IntlayerEditorElement = ({
  content,
  ..._props
}: IntlayerEditorElementProps) => {
  return content;
};

IntlayerEditorElement.content = '';

export const renderIntlayerEditor = (props: IntlayerEditorElementProps) => {
  const _renderIntlayerEditor = requireFunction()?.renderIntlayerEditor;

  if (typeof _renderIntlayerEditor === 'undefined') {
    const Result = <IntlayerEditorElement {...props} />;

    return { ...Result, value: props.content };
  }

  return _renderIntlayerEditor(props);
};
