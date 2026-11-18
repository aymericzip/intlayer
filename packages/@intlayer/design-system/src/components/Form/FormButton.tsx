'use client';

import { Button, type ButtonProps } from '@components/Button';
import type { FC } from 'react';
import { useFormContext, useFormSelector } from './FormBase';

/**
 * `Button` that, as the submit button of a `<Form>`, shows the loading state
 * (and so stays disabled) while the form submits.
 */
export const FormButton: FC<ButtonProps> = ({ isLoading, ...props }) => {
  const form = useFormContext();
  const isSubmitting = useFormSelector(
    props.type === 'submit' ? form : null,
    (state) => state.isSubmitting,
    false
  );

  return <Button isLoading={isLoading || isSubmitting} {...props} />;
};
