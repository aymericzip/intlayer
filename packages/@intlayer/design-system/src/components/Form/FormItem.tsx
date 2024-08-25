'use client';

import { forwardRef, type HTMLAttributes, useId, createContext } from 'react';
import tw from 'twin.macro';

const StyledFormItem = tw.div`space-y-2`;

export const FormItem = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>((props, ref) => {
  const id = useId();

  return (
    <FormItemContext.Provider value={{ id }}>
      <StyledFormItem ref={ref} {...props} />
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
