'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import type { FC, FormEvent, HTMLProps } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';

const Schema = z.object({
  test: z.string().min(3, 'test error'),
});

type FormElementWrapperProps = HTMLProps<HTMLFormElement> & {
  schema?: z.AnyZodObject;
  values?: z.infer<z.AnyZodObject>;
};

export const FormElementWrapper: FC<FormElementWrapperProps> = (props) => {
  const objectFormSchema = props.schema ?? Schema;

  const form = useForm<z.infer<typeof objectFormSchema>>({
    resolver: zodResolver(objectFormSchema),
    values: props.values ?? { test: '' },
  });

  const { children, onSubmit, ...rest } = props;

  const onSubmitForm = (
    values: z.infer<typeof objectFormSchema>,
    event: FormEvent<HTMLFormElement>
  ) => {
    const parsedValues = objectFormSchema.safeParse(values);
    if (parsedValues.success) {
      onSubmit?.(event);
    }
  };

  return (
    <FormProvider {...form}>
      <form
        {...rest}
        onSubmit={(e) => form.handleSubmit((values) => onSubmitForm(values, e))}
      >
        {children}
      </form>
    </FormProvider>
  );
};
