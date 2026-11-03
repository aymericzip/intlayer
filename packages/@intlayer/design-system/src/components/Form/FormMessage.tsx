'use client';

import type { FC, HTMLAttributes } from 'react';
import { useFormField } from './FormField';

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
      className="text-xs font-medium text-error"
      role="alert"
      id={formMessageId}
      {...props}
    >
      {body}
    </p>
  );
};
