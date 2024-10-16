'use client';

import type { Locales } from '@intlayer/config/client';
import { type Dictionary } from '@intlayer/core';
import { ArrowLeft } from 'lucide-react';
import { useEffect, useMemo, useRef, type FC } from 'react';
import { useDictionary } from 'react-intlayer';
import { getDictionaryValueByKeyPath } from '../../utils/dictionary';
import { Button } from '../Button';
import { Container } from '../Container';
import {
  useEditedContentStore,
  useEditionPanelStore,
} from '../DictionaryEditor';
import { dictionaryFieldEditorContent } from './dictionaryFieldEditor.content';
import { EditorView, getIsEditableSection } from './EditorView';
import { KeyPathBreadcrumb } from './KeyPathBreadcrumb';
import { NodeWrapper } from './NodeWrapper';

type DictionaryFieldEditorProps = {
  dictionary: Dictionary;
  locale: Locales;
  onClickDictionaryList?: () => void;
};

export const DictionaryFieldEditor: FC<DictionaryFieldEditorProps> = ({
  dictionary,
  locale,
  onClickDictionaryList,
}) => {
  const { id, filePath, ...dictionaryContent } = dictionary;
  const containerRef = useRef<HTMLDivElement>(null);
  const editedContent = useEditedContentStore((s) => s.editedContent);
  const { returnToDictionaryList } = useDictionary(
    dictionaryFieldEditorContent
  );

  const { focusedContent, setFocusedContentKeyPath, setFocusedContent } =
    useEditionPanelStore((s) => ({
      focusedContent: s.focusedContent,
      setFocusedContentKeyPath: s.setFocusedContentKeyPath,
      setFocusedContent: s.setFocusedContent,
    }));

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
      <div className="flex flex-row flex-wrap items-center gap-2 text-sm">
        <Button
          onClick={() => {
            setFocusedContent(null);
            onClickDictionaryList?.();
          }}
          variant="hoverable"
          size="icon"
          color="text"
          label={returnToDictionaryList.label.value}
        >
          <ArrowLeft className="size-4" />
        </Button>
        <KeyPathBreadcrumb
          dictionaryId={id}
          keyPath={keyPath}
          onClickKeyPath={setFocusedContentKeyPath}
        />
      </div>
      <Container className="border-text dark:border-text-dark flex h-full flex-1 flex-col overflow-hidden rounded-xl border-[1.5px]">
        <div
          className="flex flex-1 items-start gap-0.5 overflow-x-auto p-2"
          ref={containerRef}
        >
          {prefixesKeyPath.map((keyPath, index) => {
            const section =
              getDictionaryValueByKeyPath(editedContent[id], keyPath) ??
              getDictionaryValueByKeyPath(dictionaryContent, keyPath);

            const isEditableSection = getIsEditableSection(section);

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
      </Container>
    </div>
  );
};
