import type { FC } from 'react';
import { Input, type InputProps } from '../../../components/Input';
import { FormElement, type FormElementProps } from '.';

interface InputElementsProps
  extends Omit<FormElementProps<typeof Input>, 'Element'>,
    React.ComponentProps<typeof Input> {
  name: string;
}

const InputWrapper: FC<InputProps> = ({ value, ...props }) => (
  <Input defaultValue={value} {...props} />
);

export const InputElement: FC<InputElementsProps> = ({ value, ...props }) => (
  <FormElement
    Element={InputWrapper}
    id={props.name}
    data-testid={props.name}
    {...props}
  />
);
