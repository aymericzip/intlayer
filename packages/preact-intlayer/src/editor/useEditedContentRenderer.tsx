import { getBasePlugins, getContent } from '@intlayer/core/interpreter';
import type { Locale } from '@intlayer/types/allLocales';
import type { Dictionary } from '@intlayer/types/dictionary';
import type { KeyPath } from '@intlayer/types/keyPath';
import type { FunctionalComponent } from 'preact';
import { useEditedContentActions } from './EditedContentContext';

type EditedContentRendererProps = {
  dictionaryKey: Dictionary['key'];
  keyPath: KeyPath[];
  children: string;
  locale?: Locale;
};

export const useEditedContentRenderer = ({
  dictionaryKey,
  keyPath,
  children,
}: EditedContentRendererProps) => {
  const editedContentContext = useEditedContentActions();

  if (editedContentContext) {
    const editedValue = editedContentContext.getEditedContentValue(
      dictionaryKey,
      keyPath
    ) as string;

    const value = editedValue ?? children;

    return value;
  }

  return children;
};

export const EditedContentRenderer: FunctionalComponent<
  EditedContentRendererProps
> = (props) => {
  const content = useEditedContentRenderer(props);

  if (typeof content === 'object') {
    const transformedEditedContent = getContent(
      content,
      { ...props, locale: props.locale },
      getBasePlugins(props.locale)
    );

    if (typeof transformedEditedContent !== 'string') {
      console.error(
        `Incorrect edited content format. Content type: ${typeof transformedEditedContent}. Expected string. Value ${JSON.stringify(transformedEditedContent)}`
      );

      return props.children;
    }

    return transformedEditedContent;
  }

  return content;
};
