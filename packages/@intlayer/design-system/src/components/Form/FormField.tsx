'use client';

import {
  createContext,
  type ReactNode,
  useContext,
  useSyncExternalStore,
} from 'react';
import { useFormContext, useFormSelector } from './FormBase';
import { FormItemContext } from './FormItem';
import type { AnyFormInstance } from './formStore';

export type FieldBinding = {
  name: string;
  value: unknown;
  /** Accepts either the new value or a change event (reads `checked` for checkboxes). */
  onChange: (eventOrValue: unknown) => void;
  /** Lets submit focus this field when it is the first invalid one. */
  ref: (element: HTMLElement | null) => void;
};

const isChangeEvent = (value: unknown): value is { target: HTMLInputElement } =>
  typeof value === 'object' &&
  value !== null &&
  'target' in value &&
  typeof (value as { target: unknown }).target === 'object';

const getEventValue = (eventOrValue: unknown): unknown => {
  if (!isChangeEvent(eventOrValue)) return eventOrValue;

  const { target } = eventOrValue;

  return target.type === 'checkbox' ? target.checked : target.value;
};

const useRequiredFormContext = (): AnyFormInstance => {
  const form = useFormContext();

  if (!form) throw new Error('Form fields must be rendered inside <Form>');

  return form;
};

/** Binds a field of the closest `<Form>` by its dot path. */
export const useField = (name: string): FieldBinding => {
  const form = useRequiredFormContext();
  const value = useFormSelector(form, () => form.getValues(name));

  return {
    name,
    value,
    onChange: (eventOrValue) =>
      form.setValue(name, getEventValue(eventOrValue)),
    ref: (element) => form.registerElement(name, element),
  };
};

const subscribeToNothing = () => () => {};

const FormFieldContext = createContext<string | undefined>(undefined);

type FormFieldProps = {
  name: string;
  render: (props: { field: FieldBinding }) => ReactNode;
};

const FormFieldRender = ({ name, render }: FormFieldProps) =>
  render({ field: useField(name) });

/**
 * Renders a custom control bound to a form field. Labels, messages and
 * `FormControl` rendered inside pick the field up from context.
 */
export const FormField = (props: FormFieldProps) => (
  <FormFieldContext value={props.name}>
    <FormFieldRender {...props} />
  </FormFieldContext>
);

/** Ids and validation error of the enclosing `FormField`. */
export const useFormField = () => {
  const name = useContext(FormFieldContext);
  const { id } = useContext(FormItemContext);
  const form = useFormContext();
  const getError = () =>
    form && name !== undefined ? form.getState().errors[name] : undefined;

  // Labels may render outside a field or a form: there is then no error to track.
  const error = useSyncExternalStore(
    form?.subscribe ?? subscribeToNothing,
    getError,
    getError
  );

  return {
    id,
    name,
    error,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
  };
};
