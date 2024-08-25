import { forwardRef, type HTMLAttributes } from 'react';
import tw from 'twin.macro';
import { useFormField } from '.';

const StyledDescription = tw.p`text-sm text-gray-500 dark:text-gray-400`;

export const FormDescription = forwardRef<
  HTMLParagraphElement,
  HTMLAttributes<HTMLParagraphElement>
>((props, ref) => {
  const { formDescriptionId } = useFormField();

  return <StyledDescription ref={ref} id={formDescriptionId} {...props} />;
});

FormDescription.displayName = 'FormDescription';
