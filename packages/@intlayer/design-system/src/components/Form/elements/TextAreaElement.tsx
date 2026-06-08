import { TextArea } from '@components/TextArea/TextArea';
import type { ComponentProps, FC } from 'react';
import { FormElement, type FormElementProps } from './FormElement';

type TextAreaElementsProps = Omit<
  FormElementProps<typeof TextArea>,
  'Element'
> &
  Omit<
    ComponentProps<typeof TextArea> & {
      name: string;
    },
    'aria-label' | 'aria-labelledby'
  >;

export const TextAreaElement: FC<TextAreaElementsProps> = (props) => (
  <FormElement
    Element={TextArea}
    id={props.name}
    aria-labelledby={props.label ? `${props.name}-label` : undefined}
    aria-label={props.label ? undefined : props.name}
    data-testid={props.name}
    {...props}
  />
);
