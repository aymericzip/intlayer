import { createRequire } from 'module';
import type { IntlayerEditorElementProps } from 'intlayer-editor/client';

const requireFunction = (packagePath: string) => {
  try {
    return typeof import.meta.url === 'undefined'
      ? require(packagePath)
      : createRequire(import.meta.url)(packagePath);
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
  const _renderIntlayerEditor = requireFunction(
    'intlayer-editor/client'
  )?.renderIntlayerEditor;

  if (typeof _renderIntlayerEditor === 'undefined') {
    const Result = <IntlayerEditorElement {...props} />;

    return { ...Result, value: props.content };
  }

  return _renderIntlayerEditor(props);
};
