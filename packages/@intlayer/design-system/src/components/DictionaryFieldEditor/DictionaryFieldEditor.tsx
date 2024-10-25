'use client';

import type { Locales } from '@intlayer/config/client';
import { Dictionary } from '@intlayer/core';
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
import { EditorView } from './EditorView/EditorView';
import { getIsEditableSection } from './getIsEditableSection';
import { KeyPathBreadcrumb } from './KeyPathBreadcrumb';
import { NavigationViewNode } from './NavigationView/NavigationViewNode';

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
  const { content: dictionaryContent, key } = dictionary;
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
          size="icon-md"
          color="text"
          Icon={ArrowLeft}
          label={returnToDictionaryList.label.value}
        />
        <KeyPathBreadcrumb
          dictionaryId={key}
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
              getDictionaryValueByKeyPath(editedContent[key], keyPath) ??
              getDictionaryValueByKeyPath(dictionaryContent, keyPath);

            const isEditableSection = getIsEditableSection(section);

            if (isEditableSection) return <></>;

            const keyPathName = keyPath
              .map((key) => JSON.stringify(key))
              .join('.');
            const selectedKey = selectedKeys[index];

            return (
              <NavigationViewNode
                key={keyPathName}
                keyPath={keyPath}
                selectedKey={selectedKey}
                section={section}
                dictionaryId={key}
                locale={locale}
              />
            );
          })}
        </div>
        <EditorView
          dictionary={dictionary}
          keyPath={keyPath}
          dictionaryId={key}
        />
      </Container>
    </div>
  );
};
