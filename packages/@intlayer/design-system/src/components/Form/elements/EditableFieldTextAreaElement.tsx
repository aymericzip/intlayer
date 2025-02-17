import type { ComponentProps, ReactNode } from 'react';
import { EditableFieldTextArea } from '../../EditableField/EditableFieldTextArea';
import { FormElement, type FormElementProps } from './FormElement';

type EditableFieldTextAreaElementProps = Omit<
  FormElementProps<typeof EditableFieldTextArea>,
  'Element'
> &
  ComponentProps<typeof EditableFieldTextArea> & {
    name: string;
    description?: ReactNode;
    placeholder?: string;
    className?: string;
    children?: ReactNode;
  };

export const EditableFieldTextAreaElement = (
  props: EditableFieldTextAreaElementProps
) => (
  <FormElement
    id={props.name}
    data-testid={props.name}
    Element={EditableFieldTextArea}
    {...props}
  />
);
