/* eslint-disable import/no-cycle */
import { type ComponentProps, type FC } from 'react';
import { Checkbox } from '../../Input';
import { FormElementProps, FormElement } from './FormElement';

type CheckboxElementProps = Omit<FormElementProps<typeof Checkbox>, 'Element'> &
  ComponentProps<typeof Checkbox> & {
    name: string;
    inputLabel?: string;
  };

type CheckboxComponentProps = Omit<ComponentProps<typeof Checkbox>, 'label'> & {
  name: string;
  inputLabel?: ComponentProps<typeof Checkbox>['label'];
};

const CheckboxComponent: FC<CheckboxComponentProps> = ({
  inputLabel,
  ...props
}) => <Checkbox {...props} label={inputLabel} />;

export const CheckboxElement: FC<CheckboxElementProps> = ({
  autoComplete,
  ...props
}) => (
  <FormElement
    Element={CheckboxComponent}
    id={props.name}
    data-testid={props.name}
    autoComplete={autoComplete}
    minLength={6}
    maxLength={255}
    {...props}
  />
);
