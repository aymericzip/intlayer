import type { ChangeEvent, ComponentProps, FC, ReactNode } from 'react';
import { Checkbox } from '../../Input';
import { FormElement, type FormElementProps } from './FormElement';

type CheckboxElementProps = Omit<FormElementProps<typeof Checkbox>, 'Element'> &
  ComponentProps<typeof Checkbox> & {
    name: string;
    inputLabel?: ReactNode;
  };

type CheckboxComponentProps = Omit<
  ComponentProps<typeof Checkbox>,
  'label' | 'value' | 'onChange'
> & {
  name: string;
  inputLabel?: ComponentProps<typeof Checkbox>['label'];
  // FormElement passes value/onChange, but checkbox needs checked
  value?: boolean;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
};

/**
 * Wrapper component that converts FormElement's value/onChange pattern
 * to checkbox's checked/onChange pattern
 */
const CheckboxComponent: FC<CheckboxComponentProps> = ({
  inputLabel,
  value,
  onChange,
  ...props
}) => (
  <Checkbox
    {...props}
    label={inputLabel}
    // Convert value (boolean) to checked prop
    checked={Boolean(value)}
    // Pass through onChange - it receives the event with target.checked
    onChange={onChange}
  />
);

export const CheckboxElement: FC<CheckboxElementProps> = ({
  autoComplete,
  ...props
}) => (
  <FormElement
    Element={CheckboxComponent}
    id={props.name}
    data-testid={props.name}
    autoComplete={autoComplete}
    {...props}
  />
);
