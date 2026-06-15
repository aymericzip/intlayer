import { cn } from '@utils/cn';
import type { FC, ReactNode } from 'react';
import { FormControl } from '../FormControl';
import { FormDescription } from '../FormDescription';
import { FormItem } from '../FormItem';
import { FormMessage } from '../FormMessage';
import { FormLabelLayout, type FormLabelLayoutProps } from './FormLabelLayout';

export type FormItemLayoutProps = Omit<FormLabelLayoutProps, 'children'> & {
  label?: ReactNode;
  description?: ReactNode;
  children: ReactNode;
  showErrorMessage?: boolean;
  className?: string;
};

export const FormItemLayout: FC<FormItemLayoutProps> = ({
  label,
  description,
  isRequired,
  info,
  children,
  showErrorMessage = true,
  htmlFor,
  className,
}) => (
  <FormItem
    className={cn('flex w-full flex-col flex-wrap gap-2 px-1 py-2', className)}
  >
    {(description || label) && (
      <div className="flex max-w-full flex-col gap-1 p-1 leading-none">
        {label && (
          <FormLabelLayout
            isRequired={isRequired}
            info={info}
            htmlFor={htmlFor}
          >
            {label}
          </FormLabelLayout>
        )}
        {description && <FormDescription>{description}</FormDescription>}
      </div>
    )}
    <FormControl>{children}</FormControl>

    {showErrorMessage && <FormMessage data-testid="error-message" />}
  </FormItem>
);
