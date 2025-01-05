/* eslint-disable import/no-cycle */
import type { FC, ReactNode } from 'react';
import { Form } from '../Form';
import { FormLabelLayout, type FormLabelLayoutProps } from './FormLabelLayout';

export type FormItemLayoutProps = Omit<FormLabelLayoutProps, 'children'> & {
  label?: ReactNode;
  description?: ReactNode;
  children: ReactNode;
  showErrorMessage?: boolean;
};

export const FormItemLayout: FC<FormItemLayoutProps> = ({
  label,
  description,
  isRequired,
  info,
  children,
  showErrorMessage = true,
  htmlFor,
}) => (
  <Form.Item className="w-full space-y-2">
    {(description || label) && (
      <div className="space-y-1 leading-none">
        {label && (
          <FormLabelLayout
            isRequired={isRequired}
            info={info}
            htmlFor={htmlFor}
          >
            {label}
          </FormLabelLayout>
        )}
        {description && <Form.Description>{description}</Form.Description>}
      </div>
    )}
    <Form.Control>{children}</Form.Control>

    {showErrorMessage && <Form.Message data-testid="error-message" />}
  </Form.Item>
);
