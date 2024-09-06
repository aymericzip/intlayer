'use client';

import type { FC, HTMLAttributes } from 'react';
import { useFormField } from '.';

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
    <p
      className="text-error dark:text-error-dark text-xs font-medium"
      role="alert"
      id={formMessageId}
      {...props}
    >
      {body}
    </p>
  );
};
