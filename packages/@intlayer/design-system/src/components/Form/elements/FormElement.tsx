'use client';

import type { ComponentProps, ElementType, ReactNode } from 'react';
import {
  type ControllerRenderProps,
  type FieldValues,
  useFormContext,
} from 'react-hook-form';
import { Form } from '../Form';
import { useFormField } from '../FormField';
import { FormItemLayout, type FormItemLayoutProps } from '../layout';

export type FormElementProps<T extends ElementType> = {
  name: string;
  Element: T;
  label?: ReactNode;
  isRequired?: boolean;
  info?: string;
  showErrorMessage?: boolean;
  focus?: boolean;
} & Omit<FormItemLayoutProps, 'children'>;

type FormFieldElementProps<T extends ElementType> = FormElementProps<T> &
  ComponentProps<T> & {
    field: ControllerRenderProps<FieldValues, string>;
  };

const FormFieldElement = <T extends ElementType>({
  field,
  name,
  label,
  Element,
  isRequired = false,
  info,
  description,
  showErrorMessage = true,
  ...props
}: FormFieldElementProps<T>) => {
  const { error } = useFormField();

  return (
    <FormItemLayout
      htmlFor={name}
      label={label}
      description={description}
      isRequired={isRequired}
      info={info}
      showErrorMessage={showErrorMessage}
      aria-invalid={!!error}
    >
      <Element data-testid="element" id={name} {...field} {...props}>
        {props.children}
      </Element>
    </FormItemLayout>
  );
};

/**
 * FormElement is a component that allows you to create a form element with a label, description, error message, and validation.
 *
 * The Element prop is the type of the element that will be rendered.
 * This element will interact with the FormContext and will be controlled by the FormControl component.
 * The props used to control the element will be `value` and `onChange`.
 */
export const FormElement = <T extends ElementType>(
  props: FormElementProps<T> & ComponentProps<T>
) => {
  const { control } = useFormContext();

  return (
    <Form.Field
      control={control}
      name={props.name}
      render={({ field }) => <FormFieldElement {...props} field={field} />}
    />
  );
};
