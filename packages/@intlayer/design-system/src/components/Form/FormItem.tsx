'use client';

import { type HTMLAttributes, useId, createContext, useMemo, FC } from 'react';

export const FormItem: FC<HTMLAttributes<HTMLDivElement>> = (props, ref) => {
  const id = useId();

  const memoValue = useMemo(
    () => ({
      id,
    }),
    [id]
  );

  return (
    <FormItemContext.Provider value={memoValue}>
      <div className="space-y-2" ref={ref} {...props} />
    </FormItemContext.Provider>
  );
};

type FormItemContextValue = {
  id: string;
};

export const FormItemContext = createContext<FormItemContextValue>(
  {} as FormItemContextValue
);
