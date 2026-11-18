'use client';

import { SwitchSelector } from '@components/SwitchSelector';
import type { ComponentProps, ReactNode } from 'react';
import { FormField } from '../FormField';
import { FormItemLayout } from '../layout/FormItemLayout';
import type { FormElementProps } from './FormElement';

type SwitchSelectorElementProps = Omit<
  FormElementProps<typeof SwitchSelector>,
  'Element'
> &
  ComponentProps<typeof SwitchSelector> & {
    name: string;
    description?: string;
    placeholder?: string;
    className?: string;
    children?: ReactNode;
  };

export const SwitchSelectorElement = ({
  name,
  description,
  label,
  isRequired,
  info,
  showErrorMessage,
  children,
  onChange,
  ...props
}: SwitchSelectorElementProps) => (
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
        <SwitchSelector
          name={name}
          value={field.value}
          {...props}
          onChange={(value) => {
            field.onChange(value);
            onChange?.(value);
          }}
        >
          {children}
        </SwitchSelector>
      </FormItemLayout>
    )}
  />
);
