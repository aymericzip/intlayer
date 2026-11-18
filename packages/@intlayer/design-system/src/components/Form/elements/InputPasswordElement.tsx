import { InputPassword } from '@components/Input/InputPassword';
import type { ComponentProps, FC } from 'react';
import { FormElement, type FormElementProps } from './FormElement';

type InputPasswordElementProps = Omit<
  FormElementProps<typeof InputPassword>,
  'Element'
> &
  Omit<
    ComponentProps<typeof InputPassword> & {
      name: string;
      /** `off` for secrets that are not the user's password (API keys). */
      autoComplete: 'current-password' | 'new-password' | 'off';
    },
    'aria-label' | 'aria-labelledby'
  >;

export const InputPasswordElement: FC<InputPasswordElementProps> = (props) => (
  <FormElement
    Element={InputPassword}
    minLength={6}
    maxLength={255}
    {...props}
  />
);
