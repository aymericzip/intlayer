import { forwardRef, type HTMLAttributes } from 'react';
import tw from 'twin.macro';
import { useFormField } from '.';

const StyledFormMessage = tw.p`text-xs font-medium text-error dark:text-error-dark`;

export const FormMessage = forwardRef<
  HTMLParagraphElement,
  HTMLAttributes<HTMLParagraphElement>
>(({ children, ...props }, ref) => {
  const { error, formMessageId } = useFormField();
  const body = error ? String(error?.message) : children;

  if (!body) {
    return null;
  }

  return (
    <StyledFormMessage role="alert" ref={ref} id={formMessageId} {...props}>
      {body}
    </StyledFormMessage>
  );
});
FormMessage.displayName = 'FormMessage';
