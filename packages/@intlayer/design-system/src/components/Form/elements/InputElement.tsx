import { Input } from '@components/Input';
import type { ComponentProps, FC } from 'react';
import { FormElement, type FormElementProps } from './FormElement';

type InputElementProps = Omit<FormElementProps<typeof Input>, 'Element'> &
  Omit<
    ComponentProps<typeof Input> & {
      name: string;
    },
    'aria-label' | 'aria-labelledby'
  >;

export const InputElement: FC<InputElementProps> = (props) => (
  <FormElement
    id={props.name}
    data-testid={props.name}
    Element={Input}
    aria-labelledby={props.label ? `${props.name}-label` : undefined}
    aria-label={props.label ? undefined : props.name}
    {...props}
  />
);
