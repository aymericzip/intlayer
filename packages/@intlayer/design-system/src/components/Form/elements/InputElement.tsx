import type { ComponentProps, FC } from 'react';
import { Input } from '../../../components/Input';
import { FormElementProps, FormElement } from './FormElement';

type InputElementProps = Omit<FormElementProps<typeof Input>, 'Element'> &
  ComponentProps<typeof Input> & {
    name: string;
  };

export const InputElement: FC<InputElementProps> = (props) => (
  <FormElement
    id={props.name}
    data-testid={props.name}
    Element={Input}
    {...props}
  />
);
