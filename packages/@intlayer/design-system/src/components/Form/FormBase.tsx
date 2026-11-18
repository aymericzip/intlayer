'use client';

import { cn } from '@utils/cn';
import {
  createContext,
  type FormHTMLAttributes,
  type KeyboardEvent,
  useContext,
  useState,
  useSyncExternalStore,
} from 'react';
import type { z } from 'zod/mini';
import {
  type AnyFormInstance,
  createFormInstance,
  type FieldPath,
  type FieldPathValue,
  type FormInstance,
  type FormOptions,
  type FormState,
} from './formStore';

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

const FormContext = createContext<AnyFormInstance | null>(null);

/** Control of the closest `<Form>`, `null` outside of one. */
export const useFormContext = (): AnyFormInstance | null =>
  useContext(FormContext);

/**
 * Subscribes to a slice of the form state. The selector must return a stable
 * value (primitive or stored reference) to avoid re-rendering on every change.
 */
export const useFormSelector = <TValues, TSelected>(
  form: FormInstance<TValues>,
  selector: (state: FormState<TValues>) => TSelected
): TSelected =>
  useSyncExternalStore(
    form.subscribe,
    () => selector(form.getState()),
    () => selector(form.getState())
  );

/**
 * Re-renders when the watched value changes. Without `name`, watches every value.
 * Without `form`, uses the closest `<Form>`.
 */
export const useWatch: {
  <TValues>(options: { form: FormInstance<TValues> }): TValues;
  <TValues, TPath extends FieldPath<TValues>>(options: {
    form: FormInstance<TValues>;
    name: TPath;
  }): FieldPathValue<TValues, TPath>;
  (options: { name?: string }): unknown;
} = ({ form, name }: { form?: AnyFormInstance; name?: string }) => {
  const contextForm = useFormContext();
  const control = form ?? contextForm;

  if (!control) {
    throw new Error('useWatch needs a `form` option or a parent <Form>');
  }

  return useFormSelector(control, () =>
    name === undefined ? control.getValues() : control.getValues(name)
  );
};

/**
 * Creates a form bound to a zod schema.
 *
 * ```tsx
 * const { form, isSubmitting } = useForm(Schema, { defaultValues });
 * <Form form={form} onSubmitSuccess={save}>…</Form>
 * ```
 */
export const useForm = <TSchema extends z.ZodMiniType>(
  schema: TSchema,
  options?: FormOptions<z.output<TSchema>>
) => {
  const [form] = useState(() =>
    createFormInstance<z.output<TSchema>>(
      schema as z.ZodMiniType<z.output<TSchema>>,
      options
    )
  );

  const isSubmitting = useFormSelector(form, (state) => state.isSubmitting);
  const isSubmitted = useFormSelector(form, (state) => state.isSubmitted);
  const isValid = useFormSelector(form, (state) => state.isValid);

  return { form, isSubmitting, isSubmitted, isValid };
};

type FormProps<TValues> = Omit<
  FormHTMLAttributes<HTMLFormElement>,
  'onSubmit' | 'autoComplete' | 'onError'
> &
  FormWebMCPProps & {
    form: FormInstance<TValues>;
    onSubmit?: (data: TValues) => unknown;
    onSubmitSuccess?: (data: TValues) => unknown;
    /** Receives what `onSubmit` / `onSubmitSuccess` threw. */
    onSubmitError?: (error: Error) => unknown;
    autoComplete?: boolean;
  };

/** Moves focus to the next field on Enter instead of submitting. */
const focusNextFieldOnEnter = (event: KeyboardEvent<HTMLFormElement>) => {
  const target = event.target as HTMLElement;

  if (event.key !== 'Enter' || target.tagName !== 'INPUT') return;

  event.preventDefault();

  const focusableElements = Array.from(
    event.currentTarget.querySelectorAll<HTMLElement>(
      'input:not([disabled]):not([type="hidden"]), textarea:not([disabled])'
    )
  );
  const targetIndex = focusableElements.indexOf(target);

  if (targetIndex >= 0) focusableElements[targetIndex + 1]?.focus();
};

/**
 * Form bound to a {@link useForm} control.
 *
 * ```tsx
 * const { form } = useForm(Schema);
 * <Form form={form} onSubmitSuccess={save} autoComplete>
 *   <FormInput name="name" label="Name" />
 *   <FormButton type="submit" label="Submit">Submit</FormButton>
 * </Form>
 * ```
 */
export const Form = <TValues,>({
  form,
  onSubmit,
  onSubmitSuccess,
  onSubmitError,
  className,
  autoComplete,
  toolName,
  toolDescription,
  toolAutoSubmit,
  ...props
}: FormProps<TValues>) => {
  const submit = form.handleSubmit(async (data) => {
    try {
      await onSubmit?.(data);
      await onSubmitSuccess?.(data);
    } catch (error) {
      if (!onSubmitError) throw error;
      await onSubmitError(
        error instanceof Error ? error : new Error(String(error))
      );
    }
  });

  return (
    <FormContext value={form as unknown as AnyFormInstance}>
      <form
        className={cn('flex flex-col gap-y-6', className)}
        onKeyDown={focusNextFieldOnEnter}
        noValidate
        {...props}
        onSubmit={submit}
        autoComplete={autoComplete ? 'on' : 'off'}
        {...getFormWebMCPAttributes({
          toolName,
          toolDescription,
          toolAutoSubmit,
        })}
      />
    </FormContext>
  );
};
