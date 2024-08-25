import { clsx } from 'clsx';
import type { FC } from 'react';
import { InformationTag } from '../../InformationTag';
import { FormLabel } from '../FormLabel';
import { RequiredStar } from './RequiredStar';

export type FormLabelLayoutProps = {
  label?: React.ReactNode;
  isRequired?: boolean;
  info?: string;
  htmlFor: string;
  className?: string;
};

export const FormLabelLayout: FC<FormLabelLayoutProps> = ({
  label,
  isRequired,
  info,
  htmlFor,
  className,
}) => (
  <div className="flex gap-1 align-middle leading-none">
    {label && (
      <FormLabel htmlFor={htmlFor} className={clsx('font-bold', className)}>
        {label}
        <RequiredStar isRequired={isRequired} />
      </FormLabel>
    )}
    {info && <InformationTag content={info} />}
  </div>
);
