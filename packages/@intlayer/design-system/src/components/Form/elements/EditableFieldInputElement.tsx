import type { ComponentProps, ReactNode } from 'react';
import { EditableFieldInput } from '../../EditableField/EditableFieldInput';
import { FormElement, type FormElementProps } from './FormElement';

type EditableFieldInputElementProps = Omit<
  FormElementProps<typeof EditableFieldInput>,
  'Element'
> &
  Omit<
    ComponentProps<typeof EditableFieldInput> & {
      name: string;
      description?: ReactNode;
      placeholder?: string;
      className?: string;
      children?: ReactNode;
    },
    'aria-label' | 'aria-labelledby'
  >;

export const EditableFieldInputElement = (
  props: EditableFieldInputElementProps
) => (
  <FormElement
    id={props.name}
    data-testid={props.name}
    aria-labelledby={props.label ? `${props.name}-label` : undefined}
    aria-label={props.label ? undefined : props.name}
    Element={EditableFieldInput}
    {...props}
  />
);
