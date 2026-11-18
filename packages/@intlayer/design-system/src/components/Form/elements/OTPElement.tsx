'use client';

import {
  InputIndicator,
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@components/Input/OTPInput';
import { useItemSelector } from '@hooks/useItemSelector';
import {
  type ComponentProps,
  Fragment,
  type ReactNode,
  useEffect,
  useRef,
} from 'react';
import { type FieldBinding, FormField } from '../FormField';
import { FormItemLayout } from '../layout/FormItemLayout';
import type { FormElementProps } from './FormElement';

type OTPElementProps = Omit<FormElementProps<typeof InputOTP>, 'Element'> &
  Omit<ComponentProps<typeof InputOTP>, 'children' | 'render'> & {
    name: string;
    description?: string;
    placeholder?: string;
    className?: string;
    children?: ReactNode;
  };

const isSelectedSlot = (option: HTMLElement) =>
  option?.getAttribute('aria-selected') === 'true';

/** Two groups of three slots, separated by a dash. */
const SLOT_GROUPS = [
  [0, 1, 2],
  [3, 4, 5],
];

const OTPFieldContent = ({
  field,
  name,
  label,
  description,
  isRequired,
  info,
  showErrorMessage,
  children,
  maxLength = 6,
  ...props
}: OTPElementProps & { field: FieldBinding }) => {
  const slotElements = useRef<HTMLElement[]>([]);
  const { choiceIndicatorPosition, scheduleMeasurement } = useItemSelector(
    slotElements,
    { selector: isSelectedSlot, isHoverable: true }
  );

  useEffect(() => {
    scheduleMeasurement();
  }, []);

  return (
    <FormItemLayout
      htmlFor={name}
      label={label}
      description={description}
      isRequired={isRequired}
      info={info}
      showErrorMessage={showErrorMessage}
    >
      <InputOTP
        onChange={field.onChange}
        defaultValue={field.value as string | undefined}
        maxLength={maxLength}
        pattern="^[0-9]+$"
        onActiveSlotChange={scheduleMeasurement}
        {...props}
        render={() =>
          children ?? (
            <>
              {SLOT_GROUPS.map((slotIndexes, groupIndex) => (
                <Fragment key={slotIndexes.join('-')}>
                  {groupIndex > 0 && <InputOTPSeparator />}
                  <InputOTPGroup>
                    {slotIndexes.map((slotIndex) => (
                      <InputOTPSlot
                        key={slotIndex}
                        index={slotIndex}
                        ref={(element) => {
                          if (element)
                            slotElements.current[slotIndex] = element;
                        }}
                      />
                    ))}
                  </InputOTPGroup>
                </Fragment>
              ))}
              {choiceIndicatorPosition && (
                <InputIndicator style={choiceIndicatorPosition} />
              )}
            </>
          )
        }
      />
    </FormItemLayout>
  );
};

export const OTPElement = (props: OTPElementProps) => (
  <FormField
    name={props.name}
    render={({ field }) => <OTPFieldContent {...props} field={field} />}
  />
);
