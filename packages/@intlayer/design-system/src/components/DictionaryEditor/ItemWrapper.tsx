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

const isEqualKeyPath = (keyPath1: KeyPath[], keyPath2: KeyPath[]) =>
  keyPath1.every(
    (element, index) =>
      keyPath2[index] &&
      keyPath2[index].key === element.key &&
      keyPath2[index].type === element.type
  );

export const ItemWrapper = (props: ItemWrapperProps) => {
  const {
    keyPath,
    section,
    onContentChange,
    onFocusKeyPath,
    locale,
    focusedKeyPath = [],
    editedContent,
  } = props;

  if (typeof section === 'object') {
    if (
      (section as TranslationContent<unknown>).nodeType === NodeType.Translation
    ) {
      const newKeyPathEl: KeyPath = {
        type: NodeType.Translation,
        key: locale,
      };
      const newKeyPath: KeyPath[] = [...keyPath, newKeyPathEl];

      return (
        <ItemWrapper
          {...props}
          keyPath={newKeyPath}
          section={section[locale as keyof typeof section]}
        />
      );
    }

    if (
      (section as EnumerationContent<unknown>).nodeType === NodeType.Enumeration
    ) {
      const newKeyPathEl: KeyPath = {
        type: NodeType.Enumeration,
        key: locale,
      };
      const newKeyPath: KeyPath[] = [...keyPath, newKeyPathEl];

      return (
        <>
          {Object.keys(section)
            .filter((key) => !traceKeys.includes(key))
            .map((key) => {
              <ItemWrapper
                {...props}
                key={key}
                keyPath={newKeyPath}
                section={section[key as keyof typeof section]}
              />;
            })}
        </>
      );
    }

    if (Array.isArray(section)) {
      return section.map((subSection, key) => {
        const newKeyPathEl: KeyPath = {
          key,
          type: 'ArrayExpression',
        };
        const newKeyPath: KeyPath[] = [...keyPath, newKeyPathEl];

        return (
          <ItemWrapper
            {...props}
            key={key}
            keyPath={newKeyPath}
            section={subSection}
          />
        );
      });
    }

    return Object.keys(section)
      .filter((key) => !traceKeys.includes(key))
      .map((key) => {
        const newKeyPathEl: KeyPath = { key, type: 'ObjectExpression' };
        const newKeyPath: KeyPath[] = [...keyPath, newKeyPathEl];

        return (
          <ItemLayout
            level={keyPath.length}
            key={key}
            title={key}
            description=""
            isSelected={isEqualKeyPath(newKeyPath, focusedKeyPath)}
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
      isEqualKeyPath(content.keyPath, focusedKeyPath)
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
