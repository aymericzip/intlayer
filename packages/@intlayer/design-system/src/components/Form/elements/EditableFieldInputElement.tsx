/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable import/no-cycle */
import type { ComponentProps, ReactNode } from 'react';
import { useFormContext } from 'react-hook-form';
import { EditableFieldInput } from '../../EditableField/EditableFieldInput';
import { Form } from '../Form';
import { useFormField } from '../FormField';
import { FormItemLayout } from '../layout/FormItemLayout';
import type { FormElementProps } from './FormElement';

type EditableFieldInputElementProps = Omit<
  FormElementProps<typeof EditableFieldInput>,
  'Element'
> &
  Omit<ComponentProps<typeof EditableFieldInput>, 'onChange'> & {
    name: string;
    description?: string;
    placeholder?: string;
    className?: string;
    children?: ReactNode;
  };

export const EditableFieldInputElement = ({
  name,
  description,
  label,
  isRequired,
  info,
  showErrorMessage,
  children,
  ...props
}: EditableFieldInputElementProps) => {
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
            <EditableFieldInput
              onChange={field.onChange}
              defaultValue={field.value}
              {...props}
            >
              {children}
            </EditableFieldInput>
          </FormItemLayout>
        );
      }}
    />
  );
};
