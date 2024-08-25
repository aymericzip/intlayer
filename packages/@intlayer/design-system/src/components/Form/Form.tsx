'use client';

/* eslint-disable @typescript-eslint/no-explicit-any */
import { zodResolver } from '@hookform/resolvers/zod';
import type { HTMLAttributes } from 'react';
import {
  FormProvider,
  type FormProviderProps,
  useForm as useFormReactHookForm,
  type UseFormProps,
} from 'react-hook-form';
import type { ZodType, z } from 'zod';

type FormProps<T extends ZodType> = HTMLAttributes<HTMLFormElement> &
  FormProviderProps<any> & {
    schema: T;
    onSubmit?: (data: z.infer<T>) => void | Promise<void>;
    onSubmitSuccess?: (data: z.infer<T>) => void | Promise<void>;
    onSubmitError?: (error: Error) => void | Promise<void>;
  };

const awaitFunction = async (fn: any) => {
  // Check if result is a Promise (Thenable)

  if (fn && typeof fn.then === 'function') {
    // It's a Promise, so wait for it to resolve
    await fn;
  }
  // If not a Promise, it will just execute without awaiting
};

export const Form = <T extends ZodType>({
  schema,
  onSubmit: onSubmitProp,
  onSubmitSuccess: onSubmitSuccessProp,
  onSubmitError: onSubmitErrorProp,
  className,
  children,
  ...props
}: FormProps<T>) => {
  const onSubmit = async (values: T) => {
    const parsedValues = schema.safeParse(values);

    // onSubmitProp?.(values);
    await awaitFunction(onSubmitProp?.(values));

    if (parsedValues.success) {
      await awaitFunction(onSubmitSuccessProp?.(parsedValues.data));
    } else {
      await awaitFunction(
        onSubmitErrorProp?.(
          new Error(
            parsedValues.error.errors.map((error) => error.message).join(', ')
          )
        )
      );
    }
  };

  return (
    <FormProvider {...props}>
      <form className={className} onSubmit={props.handleSubmit(onSubmit)}>
        {children}
      </form>
    </FormProvider>
  );
};

Form.displayName = 'Form';

export const useForm = <T extends ZodType>(
  schema: T,
  props?: UseFormProps<T>
) => {
  const form = useFormReactHookForm<T>({
    resolver: zodResolver(schema),
    ...props,
  });

  const isSubmitting = form.formState.isSubmitting;
  const isSubmitted = form.formState.isSubmitted;
  const isLoading = form.formState.isLoading;
  const isValid = form.formState.isValid;

  return {
    form,
    isSubmitting,
    isSubmitted,
    isLoading,
    isValid,
  };
};
