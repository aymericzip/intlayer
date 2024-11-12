'use client';

import { getConfiguration } from '@intlayer/config/client';
import {
  type DictionaryValue,
  type EnumerationContent,
  type KeyPath,
  NodeType,
  type TranslationContent,
} from '@intlayer/core';
import { type FC, useEffect, useState } from 'react';
// @ts-ignore react-intlayer not build yet
import { useDictionary } from 'react-intlayer';
import { getSectionType } from '../../utils/dictionary';
import { useEditedContentStore } from '../DictionaryEditor';
import { Select } from '../Select';
import { nodeTypeSelectorContent } from './nodeTypeSelector.content';

type NodeTypeSelectorProps = {
  keyPath: KeyPath[];
  dictionaryKey: string;
  section: DictionaryValue;
};

export const NodeTypeSelector: FC<NodeTypeSelectorProps> = ({
  keyPath,
  dictionaryKey,
  section,
}) => {
  const {
    multilingualText,
    text,
    node,
    array,
    enumeration,
    triggerPlaceHolder,
  } = useDictionary(nodeTypeSelectorContent);
  const nodeType = getSectionType(section);
  const [keyType, setKeyType] = useState<NodeType>(nodeType);
  const { addEditedContent } = useEditedContentStore((s) => ({
    addEditedContent: s.addEditedContent,
  }));
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
          } as TranslationContent<DictionaryValue>,
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
          } as EnumerationContent<DictionaryValue>,
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
      default:
        addEditedContent(dictionaryKey, {}, keyPath);
    }
  };

  useEffect(() => {
    setKeyType(nodeType);
  }, [nodeType]);

  return (
    <Select value={keyType} onValueChange={onValueChange}>
      <Select.Trigger className="w-40">
        <Select.Value placeholder={triggerPlaceHolder.value} />
      </Select.Trigger>
      <Select.Content>
        <Select.Item value={NodeType.Translation}>
          {multilingualText}
        </Select.Item>
        <Select.Item value={NodeType.Text}>{text}</Select.Item>
        <Select.Item value={NodeType.Object}>{node}</Select.Item>
        <Select.Item value={NodeType.Array}>{array}</Select.Item>
        <Select.Item value={NodeType.Enumeration}>{enumeration}</Select.Item>
      </Select.Content>
    </Select>
  );
};
