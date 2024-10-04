/* eslint-disable import/no-cycle */
import type { ComponentProps, ReactNode } from 'react';
import { useFormContext } from 'react-hook-form';
import { Select } from '../../Select/Select';
import { Form } from '../Form';
import { useFormField } from '../FormField';
import { FormItemLayout } from '../layout/FormItemLayout';
import type { FormElementProps } from './FormElement';

type SelectElementsProps = Omit<FormElementProps<typeof Select>, 'Element'> &
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
}: SelectElementsProps) => {
  const { control } = useFormContext();

  return (
    <Form.Field
      control={control}
      name={name}
      render={({ field }) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks, sonarjs/rules-of-hooks
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
            <Select
              onValueChange={field.onChange}
              defaultValue={field.value}
              {...props}
            >
              {children}
            </Select>
          </FormItemLayout>
        );
      }}
    />
  );
};
