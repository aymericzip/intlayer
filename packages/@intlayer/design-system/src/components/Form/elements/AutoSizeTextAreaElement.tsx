import { AutoSizedTextArea } from '@components/TextArea/AutoSizeTextArea';
import type { ComponentProps, FC } from 'react';
import { FormElement, type FormElementProps } from './FormElement';

type AutoSizedTextAreaElementsProps = Omit<
  FormElementProps<typeof AutoSizedTextArea>,
  'Element'
> &
  ComponentProps<typeof AutoSizedTextArea> & {
    name: string;
  };

export const AutoSizedTextAreaElement: FC<AutoSizedTextAreaElementsProps> = (
  props
) => (
  <FormElement
    Element={AutoSizedTextArea}
    id={props.name}
    data-testid={props.name}
    {...props}
  />
);
