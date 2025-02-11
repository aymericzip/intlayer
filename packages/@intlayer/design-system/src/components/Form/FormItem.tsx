'use client';

import { type HTMLAttributes, useId, createContext, useMemo, FC } from 'react';

export const FormItem: FC<HTMLAttributes<HTMLDivElement>> = (props) => {
  const id = useId();

  const memoValue = useMemo(
    () => ({
      id,
    }),
    [id]
  );

  return (
    <FormItemContext value={memoValue}>
      <div className="space-y-2" {...props} />
    </FormItemContext>
  );
};

type FormItemContextValue = {
  id: string;
};

export const FormItemContext = createContext<FormItemContextValue>(
  {} as FormItemContextValue
);
