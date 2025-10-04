import type { ComponentProps, FC } from 'react';
import { InputPassword } from '../../Input';
import { FormElement, type FormElementProps } from './FormElement';

type InputPasswordElementProps = Omit<
  FormElementProps<typeof InputPassword>,
  'Element'
> &
  Omit<
    ComponentProps<typeof InputPassword> & {
      name: string;
      autoComplete: 'current-password' | 'new-password';
    },
    'aria-label' | 'aria-labelledby'
  >;

export const InputPasswordElement: FC<InputPasswordElementProps> = ({
  autoComplete,
  ...props
}) => (
  <FormElement
    Element={InputPassword}
    id={props.name}
    data-testid={props.name}
    aria-labelledby={props.label ? `${props.name}-label` : undefined}
    aria-label={props.label ? undefined : props.name}
    autoComplete={autoComplete}
    minLength={6}
    maxLength={255}
    {...props}
  />
);
