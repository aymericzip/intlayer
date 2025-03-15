import {
  getContentNodeByKeyPath,
  NodeType,
  type FileContent,
  type KeyPath,
} from '@intlayer/core';
import type { FC } from 'react';
import { useEditedContent } from '@intlayer/editor-react';
import { StringWrapper, type StringWrapperProps } from './StringWrapper';

type FileWrapperProps = Omit<StringWrapperProps, 'section'> & {
  section: FileContent;
};

export const FileWrapper: FC<FileWrapperProps> = (props) => {
  const { keyPath, section } = props;
  const { addEditedContent } = useEditedContent();
  const editedContentValue = getContentNodeByKeyPath(
    props.editedContent,
    keyPath
  ) as FileContent | undefined;

  const subSection = section[NodeType.File];
  const { content } = section;

  const newKeyPath: KeyPath[] = [
    ...keyPath,
    {
      type: NodeType.File,
    },
  ];

  return (
    <div className="ml-2 grid grid-cols-[auto,1fr] gap-2">
      <span className="text-neutral text-sm">{subSection} </span>
      <StringWrapper
        {...props}
        keyPath={newKeyPath}
        section={content}
        editedContentValue={editedContentValue?.content}
        onContentChange={(content) => {
          console.log('lll', {
            subSection,
            file: {
              ...section,
              content: content.newValue,
            },
            keyPath,
            newKeyPath,
          });
          addEditedContent(
            props.dictionary.key,
            {
              ...section,
              content: content.newValue,
            } as FileContent,
            keyPath
          );
        }}
      />
    </div>
  );
};
