'use client';

import { MultiSelect } from '@components/Select/Multiselect';
import type { ComponentProps, ReactNode } from 'react';
import { FormField } from '../FormField';
import { FormItemLayout } from '../layout/FormItemLayout';
import type { FormElementProps } from './FormElement';

type MultiSelectElementProps = Omit<
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

export const MultiSelectElement = ({
  name,
  description,
  label,
  isRequired,
  info,
  showErrorMessage,
  children,
  ...props
}: MultiSelectElementProps) => (
  <FormField
    name={name}
    render={({ field }) => (
      <FormItemLayout
        htmlFor={name}
        label={label}
        description={description}
        isRequired={isRequired}
        info={info}
        showErrorMessage={showErrorMessage}
      >
        <MultiSelect
          onValueChange={field.onChange}
          values={field.value as string[] | undefined}
          {...props}
        >
          {children}
        </MultiSelect>
      </FormItemLayout>
    )}
  />
);
