'use client';

import { forwardRef, type HTMLAttributes, useId, createContext } from 'react';

export const FormItem = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>((props, ref) => {
  const id = useId();

  return (
    <FormItemContext.Provider value={{ id }}>
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
