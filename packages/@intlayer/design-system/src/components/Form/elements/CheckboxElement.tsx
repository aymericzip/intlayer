import { Checkbox } from '@components/Input';
import type { ComponentProps, FC, ReactNode } from 'react';
import { FormElement, type FormElementProps } from './FormElement';

type CheckboxElementProps = Omit<FormElementProps<typeof Checkbox>, 'Element'> &
  // The form value is a boolean (checked), not the input's string value
  Omit<ComponentProps<typeof Checkbox>, 'value'> & {
    name: string;
    inputLabel?: ReactNode;
  };

type CheckboxComponentProps = Omit<
  ComponentProps<typeof Checkbox>,
  'label' | 'value'
> & {
  name: string;
  inputLabel?: ComponentProps<typeof Checkbox>['label'];
  value?: boolean;
};

/** Maps the form's boolean `value` onto `checked`. */
const CheckboxComponent: FC<CheckboxComponentProps> = ({
  inputLabel,
  value,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
  ...props
}) => (
  <Checkbox
    {...props}
    label={inputLabel}
    checked={Boolean(value)}
    // The visible input label names the checkbox better than the field name
    aria-label={inputLabel ? undefined : ariaLabel}
    aria-labelledby={inputLabel ? undefined : ariaLabelledBy}
  />
);

export const CheckboxElement: FC<CheckboxElementProps> = (props) => (
  <FormElement Element={CheckboxComponent} {...props} />
);
