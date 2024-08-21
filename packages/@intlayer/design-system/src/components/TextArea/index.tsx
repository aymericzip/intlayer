import {
  forwardRef,
  type DetailedHTMLProps,
  type TextareaHTMLAttributes,
} from 'react';
import { styled } from 'styled-components';
import tw from 'twin.macro';

export { AutoSizedTextArea } from './AutoSizeTextArea';

type TextAreaProps = DetailedHTMLProps<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
> & {
  validationStyleEnabled?: boolean;
};

const StyledTextArea = styled.textarea<{ $validationStyleEnabled: boolean }>(
  ({ $validationStyleEnabled }) => [
    tw`bg-input-background dark:bg-input-background-dark text-input-text dark:text-input-text-dark w-full select-text resize-none rounded-xl border-2 px-2 py-1 text-sm shadow-none outline-0 transition-all`,
    tw`border-input-border dark:border-input-border-dark hover:border-input-border-hover dark:hover:border-input-border-hover-dark focus:border-input-border-focus dark:focus:border-input-border-focus focus:outline-0 focus:[box-shadow:none]`,
    $validationStyleEnabled &&
      tw`valid:border-input-border-success dark:valid:border-input-border-success-dark invalid:border-input-border-error dark:invalid:border-input-border-error-dark`,
  ]
);

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className, validationStyleEnabled = false, ...props }, ref) => (
    <StyledTextArea
      ref={ref}
      rows={1}
      $validationStyleEnabled={validationStyleEnabled}
      {...props}
    />
  )
);

TextArea.displayName = 'TextArea';
