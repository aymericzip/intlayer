import type { ComponentProps, FC } from 'react';
import { InputPassword } from '../../Input';
import { FormElement, type FormElementProps } from '.';

type InputPasswordElementsProps = Omit<
  FormElementProps<typeof InputPassword>,
  'Element'
> &
  ComponentProps<typeof InputPassword> & {
    name: string;
    autoComplete: 'current-password' | 'new-password';
  };

export const InputPasswordElement: FC<InputPasswordElementsProps> = ({
  autoComplete,
  ...props
}) => (
  <FormElement
    Element={InputPassword}
    id={props.name}
    data-testid={props.name}
    autoComplete={autoComplete}
    minLength={6}
    maxLength={255}
    {...props}
  />
);
