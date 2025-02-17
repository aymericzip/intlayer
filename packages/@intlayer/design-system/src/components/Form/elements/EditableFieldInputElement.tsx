import type { ComponentProps, ReactNode } from 'react';
import { EditableFieldInput } from '../../EditableField/EditableFieldInput';
import { FormElement, type FormElementProps } from './FormElement';

type EditableFieldInputElementProps = Omit<
  FormElementProps<typeof EditableFieldInput>,
  'Element'
> &
  ComponentProps<typeof EditableFieldInput> & {
    name: string;
    description?: ReactNode;
    placeholder?: string;
    className?: string;
    children?: ReactNode;
  };

export const EditableFieldInputElement = (
  props: EditableFieldInputElementProps
) => (
  <FormElement
    id={props.name}
    data-testid={props.name}
    Element={EditableFieldInput}
    {...props}
  />
);
