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
) => <FormElement Element={EditableFieldTextArea} {...props} />;
