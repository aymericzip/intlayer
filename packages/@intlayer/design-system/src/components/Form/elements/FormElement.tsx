'use client';

import type { ComponentProps, ElementType, ReactNode } from 'react';
import {
  useFormContext,
  type ControllerRenderProps,
  type FieldValues,
} from 'react-hook-form';
import { Form, useFormField } from '../';
import { FormItemLayout } from '../layout';

export interface FormElementProps<T extends ElementType> {
  name: string;
  Element: T;
  label?: ReactNode;
  isRequired?: boolean;
  info?: string;
  showErrorMessage?: boolean;
  focus?: boolean;
}

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
  className,
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
