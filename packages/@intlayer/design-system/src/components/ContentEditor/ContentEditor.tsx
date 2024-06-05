'use client';

import { Check, X } from 'lucide-react';
import { useState, type FC } from 'react';
import { styled } from 'styled-components';
import tw from 'twin.macro';

export type ContentEditorProps = {
  children: string;
  onContentChange: (content: string) => void;
  isEditing?: boolean;
};

const StyledPressableDiv = styled.div<{ $isEditing: boolean }>`
  ${tw`bg-transparent inline outline-none m-3 w-full`}
  ${({ $isEditing }) => ($isEditing ? tw`cursor-text` : tw`cursor-pointer`)}
`;
const StyledContainer = tw.div`flex flex-row items-center justify-between gap-2`;
const StyledValidIcon = tw(Check)`hover:scale-110 cursor-pointer`;
const StyledCancelIcon = tw(X)`hover:scale-110 cursor-pointer`;

export const ContentEditor: FC<ContentEditorProps> = ({
  children,
  onContentChange,
  isEditing,
}) => {
  const [newValue, setNewValue] = useState<string>(children);
  const [resetIncrementor, setResetIncrementor] = useState<number>(0); // To reset the div on cancel
  const isEdited: boolean = newValue !== children;

  const handleCancel = () => {
    setNewValue(children);
    setResetIncrementor((prev) => prev + 1);
  };
  const handleValid = () => {
    onContentChange(newValue);
  };

  const handleOnContentChange = (e: React.FormEvent<HTMLDivElement>) =>
    setNewValue(e.currentTarget.textContent ?? '');

  return (
    <StyledContainer>
      <StyledPressableDiv
        role="textbox"
        contentEditable={isEditing}
        onInput={handleOnContentChange}
        suppressContentEditableWarning={true} // To suppress the warning for controlled components
        $isEditing={isEditing ?? false}
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
