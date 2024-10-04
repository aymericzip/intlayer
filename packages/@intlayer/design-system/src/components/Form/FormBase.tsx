'use client';

/* eslint-disable @typescript-eslint/no-explicit-any */
import { zodResolver } from '@hookform/resolvers/zod';
import { forwardRef, type Ref, type HTMLAttributes } from 'react';
import {
  FormProvider,
  type FormProviderProps,
  useForm as useFormReactHookForm,
  type UseFormProps,
} from 'react-hook-form';
import type { ZodType, z } from 'zod';
import { cn } from '../../utils/cn';

type FormProps<T extends ZodType> = HTMLAttributes<HTMLFormElement> &
  FormProviderProps<z.infer<T>> & {
    schema: T;
    onSubmit?: (data: z.infer<T>) => void | Promise<void>;
    onSubmitSuccess?: (data: z.infer<T>) => void | Promise<void>;
    onSubmitError?: (error: Error) => void | Promise<void>;
    autoComplete?: boolean;
  };

const awaitFunction = async (fn: any) => {
  // Check if result is a Promise (Thenable)

  if (fn && typeof fn.then === 'function') {
    // It's a Promise, so wait for it to resolve
    await fn;
  }
  // If not a Promise, it will just execute without awaiting
};

export const Form = forwardRef(
  <T extends ZodType>(
    {
      schema,
      onSubmit: onSubmitProp,
      onSubmitSuccess: onSubmitSuccessProp,
      onSubmitError: onSubmitErrorProp,
      className,
      children,
      autoComplete,
      ...props
    }: FormProps<T>,
    ref: Ref<HTMLFormElement>
  ) => {
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
        <form
          className={cn('flex flex-col gap-y-6', className)}
          // eslint-disable-next-line sonarjs/no-misused-promises
          onSubmit={props.handleSubmit(onSubmit)}
          autoComplete={autoComplete ? 'on' : 'off'}
          ref={ref}
        >
          {children}
        </form>
      </FormProvider>
    );
  }
);

Form.displayName = 'Form';

export const useForm = <T extends ZodType>(
  schema: T,
  props?: UseFormProps<z.infer<T>>
) => {
  const form = useFormReactHookForm<z.infer<T>>({
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
