'use client';

import { useState, type FC } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import { PressableDiv } from '../PressableDiv';

type ContentEditorProps = {
  children: string;
  onContentChange: (content: string) => void;
};

const StyledPressableDiv = styled(PressableDiv)<{ $isEditing: boolean }>`
  ${({ $isEditing }) =>
    $isEditing
      ? tw`bg-transparent cursor-text inline`
      : tw`bg-transparent cursor-pointer inline`}
`;

export const ContentEditor: FC<ContentEditorProps> = ({
  children,
  onContentChange,
}) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleOnLongPress = () => setIsEditing(true);

  const handleOnContentChange = (e: React.FormEvent<HTMLDivElement>) =>
    onContentChange(e.currentTarget.textContent ?? '');

  return (
    <StyledPressableDiv
      role="textbox"
      contentEditable={isEditing}
      onPress={handleOnLongPress}
      onInput={handleOnContentChange}
      suppressContentEditableWarning={true} // To suppress the warning for controlled components
      $isEditing={isEditing}
    >
      {children}
    </StyledPressableDiv>
  );
};
