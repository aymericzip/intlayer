'use client';

import { getNodeType } from '@intlayer/core';
import { type ContentNode, NodeType } from '@intlayer/types';
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
        <Select.Item value={NodeType.Translation}>{multilingual}</Select.Item>
        <Select.Item value={NodeType.Text}>{text}</Select.Item>
        <Select.Item value={NodeType.Number}>{number}</Select.Item>
        <Select.Item value={NodeType.Boolean}>{boolean}</Select.Item>
        <Select.Item value={NodeType.Object}>{node}</Select.Item>
        <Select.Item value={NodeType.Array}>{array}</Select.Item>
        <Select.Item value={NodeType.Enumeration}>{enumeration}</Select.Item>
        <Select.Item value={NodeType.Gender}>{gender}</Select.Item>
        <Select.Item value={NodeType.Insertion}>{insertion}</Select.Item>
        <Select.Item value={NodeType.Markdown}>{markdown}</Select.Item>
        <Select.Item value={NodeType.Nested}>{nest}</Select.Item>
        <Select.Item value={NodeType.Condition}>{condition}</Select.Item>
        <Select.Item value={NodeType.ReactNode} disabled>
          {reactNode}
        </Select.Item>
        <Select.Item value={NodeType.File}>{file}</Select.Item>
      </Select.Content>
    </Select>
  );
};
