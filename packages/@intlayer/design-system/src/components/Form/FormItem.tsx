'use client';

import {
  createContext,
  type FC,
  type HTMLAttributes,
  useId,
  useMemo,
} from 'react';

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
      <div className="flex flex-col gap-2 p-2" {...props} />
    </FormItemContext>
  );
};

type FormItemContextValue = {
  id: string;
};

export const FormItemContext = createContext<FormItemContextValue>(
  {} as FormItemContextValue
);
