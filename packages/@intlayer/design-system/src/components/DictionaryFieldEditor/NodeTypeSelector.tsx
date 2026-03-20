'use client';

import { getNodeType } from '@intlayer/core/dictionaryManipulator';
import type { ContentNode } from '@intlayer/types/dictionary';
import type { NodeType } from '@intlayer/types/nodeType';
import * as NodeTypes from '@intlayer/types/nodeType';
import { type FC, useState } from 'react';
import { useIntlayer } from 'react-intlayer';
import { Select } from '../Select';

type NodeTypeSelectorProps = {
  section: ContentNode;
  onValueChange: (keyType: NodeType) => void;
};

export const NodeTypeSelector: FC<NodeTypeSelectorProps> = ({
  section,
  onValueChange: onValueChangeProp,
}) => {
  const {
    multilingual,
    text,
    number,
    boolean,
    node,
    array,
    enumeration,
    triggerPlaceHolder,
    nest,
    gender,
    condition,
    markdown,
    insertion,
    reactNode,
    file,
  } = useIntlayer('node-type-selector');
  const nodeType = getNodeType(section);
  const [keyType, setKeyType] = useState<NodeType>(nodeType);

  const onValueChange = (keyType: NodeType) => {
    setKeyType(keyType);
    onValueChangeProp(keyType);
  };

  return (
    <Select value={keyType} onValueChange={onValueChange}>
      <Select.Trigger>
        <Select.Value placeholder={triggerPlaceHolder} />
      </Select.Trigger>
      <Select.Content>
        <Select.Item value={NodeTypes.TRANSLATION}>{multilingual}</Select.Item>
        <Select.Item value={NodeTypes.TEXT}>{text}</Select.Item>
        <Select.Item value={NodeTypes.NUMBER}>{number}</Select.Item>
        <Select.Item value={NodeTypes.BOOLEAN}>{boolean}</Select.Item>
        <Select.Item value={NodeTypes.OBJECT}>{node}</Select.Item>
        <Select.Item value={NodeTypes.ARRAY}>{array}</Select.Item>
        <Select.Item value={NodeTypes.ENUMERATION}>{enumeration}</Select.Item>
        <Select.Item value={NodeTypes.GENDER}>{gender}</Select.Item>
        <Select.Item value={NodeTypes.INSERTION}>{insertion}</Select.Item>
        <Select.Item value={NodeTypes.MARKDOWN}>{markdown}</Select.Item>
        <Select.Item value={NodeTypes.NESTED}>{nest}</Select.Item>
        <Select.Item value={NodeTypes.CONDITION}>{condition}</Select.Item>
        <Select.Item value={NodeTypes.REACT_NODE} disabled>
          {reactNode}
        </Select.Item>
        <Select.Item value={NodeTypes.FILE}>{file}</Select.Item>
      </Select.Content>
    </Select>
  );
};
