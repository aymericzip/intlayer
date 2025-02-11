import type { FC } from 'react';
import { TextArea } from '../../TextArea/TextArea';
import { FormElement, type FormElementProps } from './FormElement';

type TextAreaElementsProps = Omit<
  FormElementProps<typeof TextArea>,
  'Element'
> &
  React.ComponentProps<typeof TextArea> & {
    name: string;
  };

export const TextAreaElement: FC<TextAreaElementsProps> = (props) => (
  <FormElement
    Element={TextArea}
    id={props.name}
    data-testid={props.name}
    {...props}
  />
);
