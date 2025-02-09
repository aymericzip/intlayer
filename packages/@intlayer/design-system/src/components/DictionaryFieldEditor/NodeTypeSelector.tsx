'use client';

import { getConfiguration } from '@intlayer/config/client';
import {
  ConditionContent,
  type ContentNode,
  type EnumerationContent,
  type KeyPath,
  NestedContent,
  NodeType,
  type TranslationContent,
  getSectionType,
} from '@intlayer/core';
import { useEditedContentActions } from '@intlayer/editor-react';
import { type FC, useEffect, useState } from 'react';
import { useDictionary } from 'react-intlayer';
import { Select } from '../Select';
import { nodeTypeSelectorContent } from './nodeTypeSelector.content';

type NodeTypeSelectorProps = {
  keyPath: KeyPath[];
  dictionaryKey: string;
  section: ContentNode;
};

export const NodeTypeSelector: FC<NodeTypeSelectorProps> = ({
  keyPath,
  dictionaryKey,
  section,
}) => {
  const {
    multilingual,
    text,
    node,
    array,
    enumeration,
    triggerPlaceHolder,
    nest,
    condition,
    markdown,
  } = useDictionary(nodeTypeSelectorContent);
  const nodeType = getSectionType(section);
  const [keyType, setKeyType] = useState<NodeType>(nodeType);
  const { addEditedContent } = useEditedContentActions();
  const { locales } = getConfiguration().internationalization;

  const onValueChange = (keyType: NodeType) => {
    setKeyType(keyType);

    switch (keyType) {
      case NodeType.Translation:
        addEditedContent(
          dictionaryKey,
          {
            nodeType: NodeType.Translation,
            [NodeType.Translation]: Object.assign(
              {},
              ...locales.map((locale) => ({
                [locale]: '',
              }))
            ),
          } as TranslationContent<ContentNode>,
          keyPath
        );
        break;
      case NodeType.Enumeration:
        addEditedContent(
          dictionaryKey,
          {
            nodeType: NodeType.Enumeration,
            [NodeType.Enumeration]: {
              '1': '',
              '>1': '',
            },
          } as EnumerationContent<ContentNode>,
          keyPath
        );
        break;
      case NodeType.Condition:
        addEditedContent(
          dictionaryKey,
          {
            nodeType: NodeType.Condition,
            [NodeType.Condition]: {
              true: '',
              false: '',
            },
          } as ConditionContent<ContentNode>,
          keyPath
        );
        break;
      case NodeType.Nested:
        addEditedContent(
          dictionaryKey,
          {
            nodeType: NodeType.Nested,
            [NodeType.Nested]: {
              dictionaryKey: undefined,
            },
          } as NestedContent,
          keyPath
        );
        break;
      case NodeType.Object:
        addEditedContent(dictionaryKey, {}, keyPath);
        break;
      case NodeType.Array:
        addEditedContent(dictionaryKey, [''], keyPath);
        break;
      case NodeType.Text:
        addEditedContent(dictionaryKey, '', keyPath);
        break;
      case NodeType.Markdown:
        addEditedContent(dictionaryKey, '', keyPath);
        break;
      case NodeType.Number:
        addEditedContent(dictionaryKey, 0, keyPath);
        break;
      default:
        addEditedContent(dictionaryKey, {}, keyPath);
    }
  };

  useEffect(() => {
    setKeyType(nodeType);
  }, [nodeType]);

  return (
    <Select value={keyType} onValueChange={onValueChange}>
      <Select.Trigger>
        <Select.Value placeholder={triggerPlaceHolder} />
      </Select.Trigger>
      <Select.Content>
        <Select.Item value={NodeType.Translation}>{multilingual}</Select.Item>
        <Select.Item value={NodeType.Text}>{text}</Select.Item>
        <Select.Item value={NodeType.Object}>{node}</Select.Item>
        <Select.Item value={NodeType.Array}>{array}</Select.Item>
        <Select.Item value={NodeType.Enumeration}>{enumeration}</Select.Item>
        <Select.Item value={NodeType.Markdown}>{markdown}</Select.Item>
        <Select.Item value={NodeType.Nested}>{nest}</Select.Item>
        <Select.Item value={NodeType.Condition}>{condition}</Select.Item>
      </Select.Content>
    </Select>
  );
};
