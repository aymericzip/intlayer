import { InformationTag } from '@components/InformationTag';
import { clsx } from 'clsx';
import type { FC, ReactNode } from 'react';
import { FormLabel } from '../FormLabel';
import { RequiredStar } from './RequiredStar';

export type FormLabelLayoutProps = {
  children?: ReactNode;
  isRequired?: boolean;
  info?: string;
  htmlFor?: string;
  className?: string;
};

export const FormLabelLayout: FC<FormLabelLayoutProps> = ({
  children,
  isRequired,
  info,
  htmlFor,
  className,
}) => (
  <div className="ml-1 flex gap-1 align-middle text-base leading-none">
    {children && (
      <FormLabel
        htmlFor={htmlFor}
        id={`${htmlFor}-label`}
        className={clsx('font-bold', className)}
      >
        {children}
        <RequiredStar isRequired={isRequired} />
      </FormLabel>
    )}
    {info && <InformationTag content={info} />}
  </div>
);
