'use client';

import {
  forwardRef,
  type HTMLAttributes,
  useId,
  createContext,
  useMemo,
} from 'react';

export const FormItem = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>((props, ref) => {
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
});
FormItem.displayName = 'FormItem';

type FormItemContextValue = {
  id: string;
};

export const FormItemContext = createContext<FormItemContextValue>(
  {} as FormItemContextValue
);
