import {
  forwardRef,
  type DetailedHTMLProps,
  type InputHTMLAttributes,
} from 'react';
import { styled } from 'styled-components';
import tw from 'twin.macro';

export type InputProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  validationStyleEnabled?: boolean;
};

const StyledInput = styled.input<{ $validationStyleEnabled: boolean }>(
  ({ $validationStyleEnabled }) => [
    tw`w-full rounded-xl bg-input-background dark:bg-input-background-dark text-input-text dark:text-input-text-dark border-2 px-2 py-1 text-sm resize-none shadow-none transition-all outline-0 select-text`,
    tw`border-input-border dark:border-input-border-dark hover:border-input-border-hover dark:hover:border-input-border-hover-dark focus:border-input-border-focus dark:focus:border-input-border-focus focus:[box-shadow:none] focus:outline-0`,
    tw`aria-[invalid=true]:border-error dark:aria-[invalid=true]:border-error-dark`,
    $validationStyleEnabled &&
      tw`valid:border-success dark:valid:border-success-dark invalid:border-error dark:invalid:border-error-dark`,
  ]
);

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ validationStyleEnabled = false, ...props }, ref) => (
    <StyledInput
      ref={ref}
      $validationStyleEnabled={validationStyleEnabled}
      {...props}
    />
  )
);

Input.displayName = 'Input';
