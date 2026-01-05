'use client';

import { createContext, type FC, type HTMLAttributes, useId } from 'react';

export const FormItem: FC<HTMLAttributes<HTMLDivElement>> = ({
  id: idProp,
  ...props
}) => {
  const generatedId = useId();
  const stableId = idProp ?? generatedId;

  const memoValue = {
    id: stableId,
  };

  return (
    <FormItemContext value={memoValue}>
      <div
        className="flex flex-col gap-2 p-2"
        id={stableId}
        suppressHydrationWarning
        {...props}
      />
    </FormItemContext>
  );
};

type FormItemContextValue = {
  id: string;
};

export const FormItemContext = createContext<FormItemContextValue>(
  {} as FormItemContextValue
);
