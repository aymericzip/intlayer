/* eslint-disable import/no-cycle */
import type { ComponentProps, FC } from 'react';
import { Input } from '../../../components/Input';
import { FormElementProps, FormElement } from './FormElement';

type InputElementsProps = Omit<FormElementProps<typeof Input>, 'Element'> &
  ComponentProps<typeof Input> & {
    name: string;
  };

export const InputElement: FC<InputElementsProps> = (props) => (
  <FormElement
    id={props.name}
    data-testid={props.name}
    Element={Input}
    {...props}
  />
);
