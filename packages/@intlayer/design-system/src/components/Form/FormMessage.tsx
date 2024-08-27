import type { FC, HTMLAttributes } from 'react';
import tw from 'twin.macro';
import { useFormField } from '.';

const StyledFormMessage = tw.p`text-xs font-medium text-error dark:text-error-dark`;

export const FormMessage: FC<HTMLAttributes<HTMLParagraphElement>> = ({
  children,
  ...props
}) => {
  const { error, formMessageId } = useFormField();
  const body = error ? String(error?.message ?? '') : children;

  if (!body) {
    return null;
  }

  return (
    <StyledFormMessage role="alert" id={formMessageId} {...props}>
      {body}
    </StyledFormMessage>
  );
};
