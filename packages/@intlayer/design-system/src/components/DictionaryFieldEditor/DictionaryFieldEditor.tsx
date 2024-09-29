'use client';

import type { Locales } from '@intlayer/config/client';
import type { Dictionary } from '@intlayer/core';
import { useEffect, useMemo, useRef, type FC } from 'react';
import { getDictionaryValueByKeyPath } from '../../utils/dictionary';
import {
  useEditedContentStore,
  useEditionPanelStore,
} from '../DictionaryEditor';
import { EditorView } from './EditorView';
import { KeyPathBreadcrumb } from './KeyPathBreadcrumb';
import { NodeWrapper } from './NodeWrapper';

type DictionaryFieldEditorProps = {
  dictionary: Dictionary;
  locale: Locales;
};

export const DictionaryFieldEditor: FC<DictionaryFieldEditorProps> = ({
  dictionary,
  locale,
}) => {
  const { id } = dictionary;
  const containerRef = useRef<HTMLDivElement>(null);
  const editedContent = useEditedContentStore((s) => s.editedContent);

  const { focusedContent, setFocusedContentKeyPath } = useEditionPanelStore(
    (s) => ({
      focusedContent: s.focusedContent,
      setFocusedContentKeyPath: s.setFocusedContentKeyPath,
    })
  );

  const keyPath = useMemo(
    () => focusedContent?.keyPath ?? [],
    [focusedContent]
  );

  const prefixesKeyPath = useMemo(
    () => [[], ...keyPath.map((_, i) => keyPath.slice(0, i + 1))],
    [keyPath]
  );
  const selectedKeys = prefixesKeyPath
    .slice(1)
    .map((keyPath) => keyPath[keyPath.length - 1]?.key);

  useEffect(() => {
    const container = containerRef.current;
    if (container && container.scrollWidth > container.clientWidth) {
      container.scrollTo({
        left: container.scrollWidth,
        behavior: 'smooth',
      });
    }
  }, [focusedContent]);

  return (
    <div className="flex size-full flex-1 flex-col gap-10">
      <KeyPathBreadcrumb
        dictionaryId={id}
        keyPath={keyPath}
        onClickKeyPath={setFocusedContentKeyPath}
      />
      <div className="border-text dark:border-text-dark flex h-full flex-1 flex-col overflow-hidden rounded-xl border-[1.5px]">
        <div
          className="flex flex-1 items-start gap-0.5 overflow-x-auto p-2"
          ref={containerRef}
        >
          {prefixesKeyPath.map((keyPath, index) => {
            const section =
              getDictionaryValueByKeyPath(editedContent[id], keyPath) ??
              getDictionaryValueByKeyPath(dictionary, keyPath);

            const isEditableSection = typeof section === 'string';
            if (isEditableSection) return <></>;

            const key = keyPath.map((key) => JSON.stringify(key)).join('.');
            const selectedKey = selectedKeys[index];

            return (
              <NodeWrapper
                key={key}
                keyPath={keyPath}
                selectedKey={selectedKey}
                section={section}
                dictionaryId={id}
                locale={locale}
              />
            );
          })}
        </div>
        <EditorView
          dictionary={dictionary}
          keyPath={keyPath}
          dictionaryId={id}
          locale={locale}
        />
      </div>
    </div>
  );
};
