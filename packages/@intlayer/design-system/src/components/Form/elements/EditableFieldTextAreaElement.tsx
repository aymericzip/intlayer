/* eslint-disable import/no-cycle */
/* eslint-disable react-hooks/rules-of-hooks */
import type { ComponentProps, ReactNode } from 'react';
import { useFormContext } from 'react-hook-form';
import { EditableFieldTextArea } from '../../EditableField/EditableFieldTextArea';
import { Form } from '../Form';
import { useFormField } from '../FormField';
import { FormItemLayout } from '../layout/FormItemLayout';
import type { FormElementProps } from './FormElement';

type EditableFieldTextAreaElementProps = Omit<
  FormElementProps<typeof EditableFieldTextArea>,
  'Element'
> &
  Omit<ComponentProps<typeof EditableFieldTextArea>, 'onChange'> & {
    name: string;
    description?: string;
    placeholder?: string;
    className?: string;
    children?: ReactNode;
  };

export const EditableFieldTextAreaElement = ({
  name,
  description,
  label,
  isRequired,
  info,
  showErrorMessage,
  children,
  ...props
}: EditableFieldTextAreaElementProps) => {
  const { control, formState } = useFormContext();

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
            <EditableFieldTextArea
              onChange={field.onChange}
              defaultValue={formState.defaultValues?.[name]}
              {...props}
              value={undefined}
            >
              {children}
            </EditableFieldTextArea>
          </FormItemLayout>
        );
      }}
    />
  );
};
