'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { cn } from '@utils/cn';
import type { HTMLAttributes, KeyboardEvent } from 'react';
import {
  FormProvider,
  type FormProviderProps,
  type UseFormProps,
  useForm as useFormReactHookForm,
  useFormState,
} from 'react-hook-form';
import type { ZodMiniObject, z } from 'zod/mini';

/**
 * Declarative WebMCP registration: a form carrying `toolname` becomes a tool
 * browser agents can fill and submit, its controls' `name` attributes forming
 * the input schema.
 *
 * @see https://github.com/webmachinelearning/webmcp/blob/main/declarative-api-explainer.md
 */
export type FormWebMCPProps = {
  /** Tool name exposed to agents (verb + noun, e.g. `subscribeToNewsletter`). */
  toolName?: string;
  /** What submitting the form does, for the agent. */
  toolDescription?: string;
  /**
   * Lets an agent submit without the user reviewing the filled form first.
   * Leave unset for anything consequential (payments, messages, sign-ups).
   */
  toolAutoSubmit?: boolean;
};

type FormProps<T extends ZodMiniObject> = HTMLAttributes<HTMLFormElement> &
  FormProviderProps<z.infer<T>> &
  FormWebMCPProps & {
    schema?: T;
    onSubmit?: (data: z.infer<T>) => void | Promise<void>;
    onSubmitSuccess?: (data: z.infer<T>) => void | Promise<void>;
    onSubmitError?: (error: Error) => void | Promise<void>;
    autoComplete?: boolean;
  };

/**
 * Maps the camelCase props onto the lowercase attributes the browser reads.
 * Typed as a plain record: React's JSX types do not know these attributes yet.
 */
export const getFormWebMCPAttributes = ({
  toolName,
  toolDescription,
  toolAutoSubmit,
}: FormWebMCPProps): Record<string, string | undefined> =>
  toolName
    ? {
        toolname: toolName,
        tooldescription: toolDescription,
        // A boolean attribute: present (empty) when enabled, absent otherwise.
        toolautosubmit: toolAutoSubmit ? '' : undefined,
      }
    : {};

const awaitFunction = async (fn: any) => {
  // Check if result is a Promise (Thenable)

  if (fn && typeof fn.then === 'function') {
    // It's a Promise, so wait for it to resolve
    return await fn;
  }
  // If not a Promise, it will just execute without awaiting
  return fn;
};

export const Form = <T extends ZodMiniObject>({
  schema,
  onSubmit: onSubmitProp,
  onSubmitSuccess: onSubmitSuccessProp,
  onSubmitError: onSubmitErrorProp,
  className,
  children,
  autoComplete,
  method,
  toolName,
  toolDescription,
  toolAutoSubmit,
  ...props
}: FormProps<T> & { method?: string }) => {
  const onSubmit = async (values: z.infer<T>) => {
    const parsedValues = schema.safeParse(values) ?? {
      success: true,
      data: undefined,
    };

    // onSubmitProp?.(values);
    await awaitFunction(onSubmitProp?.(values));

    if (parsedValues.success) {
      await awaitFunction(onSubmitSuccessProp?.(parsedValues.data!));
    } else {
      await awaitFunction(
        onSubmitErrorProp?.(
          new Error(
            parsedValues.error.issues.map((error) => error.message).join(', ')
          )
        )
      );
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLFormElement>) => {
    if (e.key !== 'Enter') return;
    const target = e.target as HTMLElement;
    if (target.tagName !== 'INPUT') return;
    e.preventDefault();
    const formEl = e.currentTarget;
    const focusable = Array.from(
      formEl.querySelectorAll<HTMLElement>(
        'input:not([disabled]):not([type="hidden"]), textarea:not([disabled])'
      )
    );
    const idx = focusable.indexOf(target);
    if (idx >= 0 && idx < focusable.length - 1) {
      focusable[idx + 1]?.focus();
    }
  };

  return (
    <FormProvider {...props}>
      <form
        className={cn('flex flex-col gap-y-6', className)}
        onSubmit={props.handleSubmit(onSubmit)}
        onKeyDown={handleKeyDown}
        autoComplete={autoComplete ? 'on' : 'off'}
        noValidate
        method={method}
        {...getFormWebMCPAttributes({
          toolName,
          toolDescription,
          toolAutoSubmit,
        })}
      >
        {children}
      </form>
    </FormProvider>
  );
};

export const useForm = <T extends ZodMiniObject>(
  schema: T,
  props?: UseFormProps<z.infer<T>>
) => {
  const form = useFormReactHookForm<z.infer<T>>({
    resolver: zodResolver(schema as any),
    ...props,
  });

  const { isSubmitting, isSubmitted, isLoading, isValid } = useFormState({
    control: form.control,
  });

  return {
    form,
    isSubmitting,
    isSubmitted,
    isLoading,
    isValid,
  };
};
