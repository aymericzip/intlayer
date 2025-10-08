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
  <Form.Item id={htmlFor} className="flex w-full flex-col gap-2 p-2">
    {(description || label) && (
      <div className="flex flex-col gap-1 p-1 leading-none">
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
