import type { FC, ReactNode } from 'react';

import { FormControl, FormDescription, FormItem, FormMessage } from '../';
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
  <FormItem className="w-full">
    <div className="space-y-1 leading-none">
      <FormLabelLayout
        label={label}
        isRequired={isRequired}
        info={info}
        htmlFor={htmlFor}
      />
      {description && <FormDescription>{description}</FormDescription>}
    </div>
    <FormControl>{children}</FormControl>

    {showErrorMessage && <FormMessage data-testid="error-message" />}
  </FormItem>
);
