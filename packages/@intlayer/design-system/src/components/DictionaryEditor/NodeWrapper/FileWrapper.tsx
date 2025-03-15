import { type KeyPath, NodeType, FileContent } from '@intlayer/core';
import type { FC } from 'react';
import { NodeWrapper, type NodeWrapperProps } from './index';

type FileWrapperProps = Omit<NodeWrapperProps, 'section'> & {
  section: FileContent;
};

export const FileWrapper: FC<FileWrapperProps> = (props) => {
  const { keyPath, section } = props;

  const newKeyPath: KeyPath[] = [
    ...keyPath,
    {
      type: NodeType.File,
    },
  ];

  const subSection = section[NodeType.File];
  const { content } = section;

  return (
    <div className="ml-2 grid grid-cols-[auto,1fr] gap-2">
      <span className="text-neutral text-sm">URL: {subSection} </span>
      <NodeWrapper {...props} keyPath={newKeyPath} section={content} />;
    </div>
  );
};
