'use client';

import type { ComponentProps, ReactNode } from 'react';
import { useFormContext } from 'react-hook-form';
import { SwitchSelector } from '../../SwitchSelector';
import { Form } from '../Form';
import { useFormField } from '../FormField';
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
  ...props
}: SwitchSelectorElementProps) => {
  const { control } = useFormContext();

  return (
    <Form.Field
      control={control}
      name={name}
      render={({ field }) => {
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
            <SwitchSelector {...field} {...props}>
              {children}
            </SwitchSelector>
          </FormItemLayout>
        );
      }}
    />
  );
};
