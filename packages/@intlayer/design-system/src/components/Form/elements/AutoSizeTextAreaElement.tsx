import type { FC } from 'react';
import { AutoSizedTextArea } from '../../TextArea/AutoSizeTextArea';
import { FormElement, type FormElementProps } from './FormElement';

type AutoSizedTextAreaElementsProps = Omit<
  FormElementProps<typeof AutoSizedTextArea>,
  'Element'
> &
  React.ComponentProps<typeof AutoSizedTextArea> & {
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
