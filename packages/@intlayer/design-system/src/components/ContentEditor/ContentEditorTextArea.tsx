'use client';

import { Check, X } from 'lucide-react';
import {
  type HTMLAttributes,
  useState,
  type FC,
  type ChangeEventHandler,
  useEffect,
} from 'react';
import tw from 'twin.macro';
import { AutoSizedTextArea } from '../TextArea';

export type ContentEditorTextAreaProps = {
  children: string;
  onContentChange: (content: string) => void;
} & HTMLAttributes<HTMLTextAreaElement>;

const StyledContainer = tw.div`flex flex-col items-center justify-between gap-2 w-full h-full`;
const StyledButtonContainer = tw.div`flex items-center justify-end w-full gap-2`;
const StyledValidIcon = tw(Check)`hover:scale-110 cursor-pointer`;
const StyledCancelIcon = tw(X)`hover:scale-110 cursor-pointer`;

export const ContentEditorTextArea: FC<ContentEditorTextAreaProps> = ({
  children,
  onContentChange,
  ...props
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

  const handleOnContentChange: ChangeEventHandler<HTMLTextAreaElement> = (e) =>
    setNewValue(e.currentTarget.value ?? '');

  useEffect(() => {
    setNewValue(children);
  }, [children]);

  return (
    <StyledContainer key={children}>
      <AutoSizedTextArea
        onChange={handleOnContentChange}
        key={resetIncrementor}
        {...props}
      >
        {children}
      </AutoSizedTextArea>
      {isEdited && (
        <StyledButtonContainer>
          <StyledValidIcon size={20} onClick={handleValid} />
          <StyledCancelIcon size={20} onClick={handleCancel} />
        </StyledButtonContainer>
      )}
    </StyledContainer>
  );
};
