import { EditableFieldTextArea } from '@components/EditableField/EditableFieldTextArea';
import type { ComponentProps, ReactNode } from 'react';
import { FormElement, type FormElementProps } from './FormElement';

type EditableFieldTextAreaElementProps = Omit<
  FormElementProps<typeof EditableFieldTextArea>,
  'Element'
> &
  Omit<
    ComponentProps<typeof EditableFieldTextArea> & {
      name: string;
      description?: ReactNode;
      placeholder?: string;
      className?: string;
      children?: ReactNode;
    },
    'aria-label' | 'aria-labelledby'
  >;

export const EditableFieldTextAreaElement = (
  props: EditableFieldTextAreaElementProps
) => (
  <FormElement
    id={props.name}
    data-testid={props.name}
    aria-labelledby={props.label ? `${props.name}-label` : undefined}
    aria-label={props.label ? undefined : props.name}
    Element={EditableFieldTextArea}
    {...props}
  />
);
