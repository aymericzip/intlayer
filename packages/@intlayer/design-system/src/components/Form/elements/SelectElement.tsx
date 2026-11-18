'use client';

import { Select } from '@components/Select/Select';
import type { ComponentProps, ReactNode } from 'react';
import { FormField } from '../FormField';
import { FormItemLayout } from '../layout/FormItemLayout';
import type { FormElementProps } from './FormElement';

type SelectElementProps = Omit<FormElementProps<typeof Select>, 'Element'> &
  ComponentProps<typeof Select> & {
    name: string;
    description?: string;
    placeholder?: string;
    className?: string;
    children?: ReactNode;
  };

export const SelectElement = ({
  name,
  description,
  label,
  isRequired,
  info,
  showErrorMessage,
  children,
  ...props
}: SelectElementProps) => (
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
        <Select
          onValueChange={field.onChange}
          defaultValue={field.value as string | undefined}
          {...props}
        >
          {children}
        </Select>
      </FormItemLayout>
    )}
  />
);
