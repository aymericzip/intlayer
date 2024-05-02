'use client';

import type { Locales } from '@intlayer/config/client';
import {
  type EnumerationContent,
  type TranslationContent,
  type ContentValue,
  NodeType,
  type KeyPath,
} from '@intlayer/core';
import { ContentEditor } from '../ContentEditor';
import { Container, ItemLayout } from './ItemLayout';
import type { FileContent } from '.';

export const traceKeys: string[] = ['filePath', 'id', 'nodeType'];

interface ItemWrapperProps {
  keyPath: KeyPath[];
  section:
    | ContentValue
    | undefined
    | TranslationContent<unknown>
    | EnumerationContent<unknown>;
  onContentChange: (content: { keyPath: KeyPath[]; newValue: string }) => void;
  locale: Locales;
  editedContent?: FileContent[];
  focusedKeyPath: KeyPath[] | undefined;
  onFocusKeyPath: (keyPath: KeyPath[]) => void;
}

export const ItemWrapper = (props: ItemWrapperProps) => {
  const {
    keyPath,
    section,
    onContentChange,
    onFocusKeyPath,
    locale,
    focusedKeyPath,
    editedContent,
  } = props;

  const isSelectedKeyPath = (keyPath: KeyPath[]) =>
    keyPath.every(
      (element, index) =>
        (focusedKeyPath ?? [])[index] &&
        (focusedKeyPath ?? [])[index].key === element.key &&
        (focusedKeyPath ?? [])[index].type === element.type
    );

  if (typeof section === 'object') {
    if (
      (section as TranslationContent<unknown>).nodeType === NodeType.Translation
    ) {
      return (
        <ItemWrapper
          {...props}
          keyPath={[...keyPath, { key: locale, type: NodeType.Translation }]}
          section={section[locale as keyof typeof section]}
        />
      );
    }

    if (
      (section as EnumerationContent<unknown>).nodeType === NodeType.Enumeration
    ) {
      return (
        <ItemLayout
          level={keyPath.length}
          title="enumeration"
          description=""
          isSelected={isSelectedKeyPath(keyPath)}
          onClick={(e) => {
            e.stopPropagation();
            onFocusKeyPath(keyPath);
          }}
        >
          <>enumeration</>
        </ItemLayout>
      );
    }

    return Object.keys(section)
      .filter((key) => !traceKeys.includes(key))
      .map((key) => {
        const newKeyPath: KeyPath[] = [
          ...keyPath,
          { key, type: 'ObjectExpression' },
        ];

        return (
          <ItemLayout
            level={keyPath.length}
            key={key}
            title={key}
            description=""
            isSelected={isSelectedKeyPath(newKeyPath)}
            onClick={(e) => {
              e.stopPropagation();
              onFocusKeyPath(newKeyPath);
            }}
          >
            <ItemWrapper
              {...props}
              keyPath={newKeyPath}
              section={section[key as keyof typeof section]}
            />
          </ItemLayout>
        );
      });
  }

  if (typeof section === 'string') {
    const editedContentValue = editedContent?.find((content) =>
      isSelectedKeyPath(content.keyPath)
    )?.newValue;

    return (
      <Container
        $level={keyPath.length}
        onClick={(e) => {
          e.stopPropagation();
          onFocusKeyPath(keyPath);
        }}
      >
        <ContentEditor
          onContentChange={(newValue) => onContentChange({ keyPath, newValue })}
        >
          {editedContentValue ?? section}
        </ContentEditor>
      </Container>
    );
  }
};
