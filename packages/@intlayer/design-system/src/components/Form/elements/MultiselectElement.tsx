'use client';

import type { ComponentProps, ReactNode } from 'react';
import { useFormContext } from 'react-hook-form';
import { MultiSelect } from '../../Select/Multiselect';
import { Form } from '../Form';
import { useFormField } from '../FormField';
import { FormItemLayout } from '../layout/FormItemLayout';
import type { FormElementProps } from './FormElement';

type SelectElementsProps = Omit<
  FormElementProps<typeof MultiSelect>,
  'Element'
> &
  ComponentProps<typeof MultiSelect> & {
    name: string;
    description?: string;
    placeholder?: string;
    className?: string;
    children?: ReactNode;
  };

const MultiSelectFieldContent = ({
  field,
  name,
  label,
  description,
  isRequired,
  info,
  showErrorMessage,
  children,
  ...props
}: Omit<SelectElementsProps, 'control'> & { field: any }) => {
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
      <MultiSelect
        onValueChange={field.onChange}
        values={field.value}
        {...props}
      >
        {children}
      </MultiSelect>
    </FormItemLayout>
  );
};

export const MultiSelectElement = ({
  name,
  description,
  label,
  isRequired,
  info,
  showErrorMessage,
  children,
  ...props
}: SelectElementsProps) => {
  const { control } = useFormContext();

  return (
    <Form.Field
      control={control}
      name={name}
      render={({ field }) => (
        <MultiSelectFieldContent
          field={field}
          name={name}
          label={label}
          description={description}
          isRequired={isRequired}
          info={info}
          showErrorMessage={showErrorMessage}
          {...props}
        >
          {children}
        </MultiSelectFieldContent>
      )}
    />
  );
};
