import {
  forwardRef,
  type ElementRef,
  type ComponentPropsWithoutRef,
} from 'react';
import { styled } from 'styled-components';
import tw from 'twin.macro';
import { Label } from '../Label';
import { useFormField } from '.';

const StyledLabel = styled(Label)<{ $hasError: boolean }>(
  ({ $hasError }) => $hasError && tw`text-error dark:text-error-dark`
);

export const FormLabel = forwardRef<
  ElementRef<typeof Label>,
  ComponentPropsWithoutRef<typeof Label>
>((props, ref) => {
  const { error, formItemId } = useFormField();

  return (
    <StyledLabel
      ref={ref}
      htmlFor={formItemId}
      $hasError={!!error}
      {...props}
    />
  );
});
FormLabel.displayName = 'FormLabel';
