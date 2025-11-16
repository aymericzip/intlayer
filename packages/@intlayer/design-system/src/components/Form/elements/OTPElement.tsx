'use client';

import { type ComponentProps, type ReactNode, useEffect, useRef } from 'react';
import { useFormContext } from 'react-hook-form';
import { useItemSelector } from '../../../hooks';
import {
  InputIndicator,
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '../../Input/OTPInput';
import { Form } from '../Form';
import { useFormField } from '../FormField';
import { FormItemLayout } from '../layout/FormItemLayout';
import type { FormElementProps } from './FormElement';

type OTPElementsProps = Omit<FormElementProps<typeof InputOTP>, 'Element'> &
  Omit<ComponentProps<typeof InputOTP>, 'children'> & {
    name: string;
    description?: string;
    placeholder?: string;
    className?: string;
    children?: ReactNode;
    /** Number of OTP slots (default: 6) */
    slots?: number;
  };

const selector = (option: HTMLElement) =>
  option?.getAttribute('aria-active') === 'true';

const OTPFieldContent = ({
  field,
  name,
  label,
  description,
  isRequired,
  info,
  showErrorMessage,
  children,
  slots = 6,
  maxLength = 6,
  ...props
}: Omit<OTPElementsProps, 'control'> & { field: any }) => {
  const { error } = useFormField();

  const optionsRefs = useRef<HTMLElement[]>([]);
  const indicatorRef = useRef<HTMLDivElement | null>(null);
  const { choiceIndicatorPosition, calculatePosition } = useItemSelector(
    optionsRefs,
    {
      selector,
      isHoverable: true,
    }
  );

  useEffect(() => {
    calculatePosition();
  }, []);

  return (
    <FormItemLayout
      htmlFor={name}
      label={label}
      description={description}
      isRequired={isRequired}
      info={info}
      showErrorMessage={showErrorMessage}
      aria-invalid={!!error}
    >
      <InputOTP
        onChange={field.onChange}
        defaultValue={field.value}
        maxLength={maxLength}
        pattern="^[0-9]+$"
        onActiveSlotChange={calculatePosition}
        {...(props as any)}
      >
        {children ?? (
          <>
            <InputOTPGroup>
              <InputOTPSlot
                index={0}
                ref={(el) => {
                  optionsRefs.current[0] = el!;
                }}
              />
              <InputOTPSlot
                index={1}
                ref={(el) => {
                  optionsRefs.current[1] = el!;
                }}
              />
              <InputOTPSlot
                index={2}
                ref={(el) => {
                  optionsRefs.current[2] = el!;
                }}
              />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot
                index={3}
                ref={(el) => {
                  optionsRefs.current[3] = el!;
                }}
              />
              <InputOTPSlot
                index={4}
                ref={(el) => {
                  optionsRefs.current[4] = el!;
                }}
              />
              <InputOTPSlot
                index={5}
                ref={(el) => {
                  optionsRefs.current[5] = el!;
                }}
              />
            </InputOTPGroup>
            {choiceIndicatorPosition && (
              <InputIndicator
                style={choiceIndicatorPosition}
                ref={indicatorRef}
              />
            )}
          </>
        )}
      </InputOTP>
    </FormItemLayout>
  );
};

export const OTPElement = ({
  name,
  description,
  label,
  isRequired,
  info,
  showErrorMessage,
  children,
  slots = 6,
  maxLength = 6,
  ...props
}: OTPElementsProps) => {
  const { control } = useFormContext();

  return (
    <Form.Field
      control={control}
      name={name}
      render={({ field }) => (
        <OTPFieldContent
          field={field}
          name={name}
          label={label}
          description={description}
          isRequired={isRequired}
          info={info}
          showErrorMessage={showErrorMessage}
          slots={slots}
          maxLength={maxLength}
          {...props}
        >
          {children}
        </OTPFieldContent>
      )}
    />
  );
};
