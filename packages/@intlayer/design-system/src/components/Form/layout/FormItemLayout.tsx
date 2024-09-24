import type { FC, ReactNode } from 'react';

import { Form } from '../';
import { FormLabelLayout, type FormLabelLayoutProps } from './FormLabelLayout';

type FormItemLayoutProps = FormLabelLayoutProps & {
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
    <div className="space-y-1 leading-none">
      <FormLabelLayout
        label={label}
        isRequired={isRequired}
        info={info}
        htmlFor={htmlFor}
      />
      {description && <Form.Description>{description}</Form.Description>}
    </div>
    <Form.Control>{children}</Form.Control>

    {showErrorMessage && <Form.Message data-testid="error-message" />}
  </Form.Item>
);
