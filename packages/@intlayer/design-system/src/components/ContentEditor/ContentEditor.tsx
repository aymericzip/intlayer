'use client';

import { Check, X } from 'lucide-react';
import { useState, type FC } from 'react';
import { styled } from 'styled-components';
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
const StyledContainer = tw.div`flex flex-row items-center justify-between gap-2`;
const StyledValidIcon = tw(Check)`hover:scale-110 cursor-pointer`;
const StyledCancelIcon = tw(X)`hover:scale-110 cursor-pointer`;

export const ContentEditor: FC<ContentEditorProps> = ({
  children,
  onContentChange,
}) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [newValue, setNewValue] = useState<string>(children);
  const [resetIncrementor, setResetIncrementor] = useState<number>(0); // To reset the div on cancel
  const isEdited: boolean = newValue !== children && isEditing;

  const handleOnLongPress = () => setIsEditing(true);
  const handleCancel = () => {
    setIsEditing(false);
    setNewValue(children);
    setResetIncrementor((prev) => prev + 1);
  };
  const handleValid = () => {
    setIsEditing(false);
    onContentChange(newValue);
  };

  const handleOnContentChange = (e: React.FormEvent<HTMLDivElement>) =>
    setNewValue(e.currentTarget.textContent ?? '');

  return (
    <StyledContainer>
      <StyledPressableDiv
        role="textbox"
        contentEditable={isEditing}
        onPress={handleOnLongPress}
        onInput={handleOnContentChange}
        suppressContentEditableWarning={true} // To suppress the warning for controlled components
        $isEditing={isEditing}
        key={resetIncrementor}
      >
        {children}
      </StyledPressableDiv>
      {isEdited && (
        <StyledContainer>
          <StyledValidIcon size={16} onClick={handleValid} />
          <StyledCancelIcon size={16} onClick={handleCancel} />
        </StyledContainer>
      )}
    </StyledContainer>
  );
};
