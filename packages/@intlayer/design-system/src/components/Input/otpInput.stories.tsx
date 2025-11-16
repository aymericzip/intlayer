import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from './OTPInput';

const meta: Meta<typeof InputOTP> = {
  title: 'Components/Input/OTPInput',
  component: InputOTP,
  tags: ['autodocs'],
  argTypes: {
    maxLength: {
      description: 'Maximum number of characters',
      control: { type: 'number' },
      defaultValue: 6,
    },
    value: {
      description: 'Controlled value',
      control: 'text',
    },
    pattern: {
      description: 'Regex pattern for validation',
      control: 'text',
    },
    inputMode: {
      description: 'Input mode for mobile keyboards',
      control: { type: 'select' },
      options: ['numeric', 'text', 'tel', 'email', 'url', 'search', 'decimal'],
      defaultValue: 'numeric',
    },
    disabled: {
      description: 'Disable the input',
      control: { type: 'boolean' },
      defaultValue: false,
    },
    pushPasswordManagerStrategy: {
      description: 'Strategy for handling password manager badges',
      control: { type: 'select' },
      options: ['increase-width', 'none'],
      defaultValue: 'increase-width',
    },
  },
} satisfies Meta<typeof InputOTP>;

export default meta;

type Story = StoryObj<typeof InputOTP>;

// Default 6-digit OTP
export const Default: Story = {
  args: {
    maxLength: 6,
    inputMode: 'numeric',
    pattern: '[0-9]*',
  },
  render: (args) => {
    const [value, setValue] = useState('');

    return (
      <InputOTP
        {...args}
        value={value}
        onChange={setValue}
        render={({ slots }) => (
          <InputOTPGroup>
            {slots.map((slot, idx) => (
              <InputOTPSlot key={idx} index={idx} />
            ))}
          </InputOTPGroup>
        )}
      />
    );
  },
};

// With separator (3-3 pattern)
export const WithSeparator: Story = {
  args: {
    maxLength: 6,
    inputMode: 'numeric',
    pattern: '[0-9]*',
  },
  render: (args) => {
    const [value, setValue] = useState('');

    return (
      <InputOTP
        {...args}
        value={value}
        onChange={setValue}
        render={({ slots }) => (
          <>
            <InputOTPGroup>
              {slots.slice(0, 3).map((slot, idx) => (
                <InputOTPSlot key={idx} index={idx} />
              ))}
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              {slots.slice(3).map((slot, idx) => (
                <InputOTPSlot key={idx + 3} index={idx + 3} />
              ))}
            </InputOTPGroup>
          </>
        )}
      />
    );
  },
};

// 4-digit PIN
export const FourDigitPin: Story = {
  args: {
    maxLength: 4,
    inputMode: 'numeric',
    pattern: '[0-9]*',
  },
  render: (args) => {
    const [value, setValue] = useState('');

    return (
      <InputOTP
        {...args}
        value={value}
        onChange={setValue}
        render={({ slots }) => (
          <InputOTPGroup>
            {slots.map((slot, idx) => (
              <InputOTPSlot key={idx} index={idx} />
            ))}
          </InputOTPGroup>
        )}
      />
    );
  },
};

// With completion callback
export const WithCompletion: Story = {
  args: {
    maxLength: 6,
    inputMode: 'numeric',
    pattern: '[0-9]*',
  },
  render: (args) => {
    const [value, setValue] = useState('');
    const [completedValue, setCompletedValue] = useState<string | null>(null);

    return (
      <div className="flex flex-col gap-4">
        <InputOTP
          {...args}
          value={value}
          onChange={setValue}
          onComplete={(val) => {
            setCompletedValue(val);
            alert(`OTP Complete: ${val}`);
          }}
          render={({ slots }) => (
            <InputOTPGroup>
              {slots.slice(0, 3).map((slot, idx) => (
                <InputOTPSlot key={idx} index={idx} />
              ))}
              <InputOTPSeparator />
              {slots.slice(3).map((slot, idx) => (
                <InputOTPSlot key={idx + 3} index={idx + 3} />
              ))}
            </InputOTPGroup>
          )}
        />
        {completedValue && (
          <p className="text-neutral-600 text-sm">
            Completed value: {completedValue}
          </p>
        )}
      </div>
    );
  },
};

// Alphanumeric (e.g., for codes with letters)
export const Alphanumeric: Story = {
  args: {
    maxLength: 6,
    inputMode: 'text',
    pattern: '[A-Z0-9]*',
  },
  render: (args) => {
    const [value, setValue] = useState('');

    return (
      <InputOTP
        {...args}
        value={value}
        onChange={(val) => setValue(val.toUpperCase())}
        render={({ slots }) => (
          <InputOTPGroup>
            {slots.map((slot, idx) => (
              <InputOTPSlot key={idx} index={idx} />
            ))}
          </InputOTPGroup>
        )}
      />
    );
  },
};

// Disabled state
export const Disabled: Story = {
  args: {
    maxLength: 6,
    inputMode: 'numeric',
    pattern: '[0-9]*',
    disabled: true,
  },
  render: (args) => {
    const [value, setValue] = useState('123456');

    return (
      <InputOTP
        {...args}
        value={value}
        onChange={setValue}
        render={({ slots }) => (
          <InputOTPGroup>
            {slots.slice(0, 3).map((slot, idx) => (
              <InputOTPSlot key={idx} index={idx} />
            ))}
            <InputOTPSeparator />
            {slots.slice(3).map((slot, idx) => (
              <InputOTPSlot key={idx + 3} index={idx + 3} />
            ))}
          </InputOTPGroup>
        )}
      />
    );
  },
};

// Multiple groups (e.g., 2-4-2 pattern)
export const MultipleGroups: Story = {
  args: {
    maxLength: 8,
    inputMode: 'numeric',
    pattern: '[0-9]*',
  },
  render: (args) => {
    const [value, setValue] = useState('');

    return (
      <InputOTP
        {...args}
        value={value}
        onChange={setValue}
        render={({ slots }) => (
          <>
            <InputOTPGroup>
              {slots.slice(0, 2).map((slot, idx) => (
                <InputOTPSlot key={idx} index={idx} />
              ))}
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              {slots.slice(2, 6).map((slot, idx) => (
                <InputOTPSlot key={idx + 2} index={idx + 2} />
              ))}
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              {slots.slice(6).map((slot, idx) => (
                <InputOTPSlot key={idx + 6} index={idx + 6} />
              ))}
            </InputOTPGroup>
          </>
        )}
      />
    );
  },
};

// With placeholder
export const WithPlaceholder: Story = {
  args: {
    maxLength: 6,
    inputMode: 'numeric',
    pattern: '[0-9]*',
    placeholder: '000000',
  },
  render: (args) => {
    const [value, setValue] = useState('');

    return (
      <InputOTP
        {...args}
        value={value}
        onChange={setValue}
        render={({ slots }) => (
          <InputOTPGroup>
            {slots.map((slot, idx) => (
              <InputOTPSlot key={idx} index={idx}>
                {slot.char ?? (
                  <span className="text-neutral-400">
                    {slot.placeholderChar}
                  </span>
                )}
              </InputOTPSlot>
            ))}
          </InputOTPGroup>
        )}
      />
    );
  },
};

// Controlled with external state
export const Controlled: Story = {
  args: {
    maxLength: 6,
    inputMode: 'numeric',
    pattern: '[0-9]*',
  },
  render: (args) => {
    const [value, setValue] = useState('');

    return (
      <div className="flex flex-col gap-4">
        <InputOTP
          {...args}
          value={value}
          onChange={setValue}
          render={({ slots }) => (
            <InputOTPGroup>
              {slots.slice(0, 3).map((slot, idx) => (
                <InputOTPSlot key={idx} index={idx} />
              ))}
              <InputOTPSeparator />
              {slots.slice(3).map((slot, idx) => (
                <InputOTPSlot key={idx + 3} index={idx + 3} />
              ))}
            </InputOTPGroup>
          )}
        />
        <div className="flex gap-2">
          <button
            onClick={() => setValue('')}
            className="rounded bg-neutral-200 px-3 py-1 text-sm hover:bg-neutral-300 dark:bg-neutral-700 dark:hover:bg-neutral-600"
          >
            Clear
          </button>
          <button
            onClick={() => setValue('123456')}
            className="rounded bg-neutral-200 px-3 py-1 text-sm hover:bg-neutral-300 dark:bg-neutral-700 dark:hover:bg-neutral-600"
          >
            Set to "123456"
          </button>
        </div>
        <p className="text-neutral-600 text-sm">
          Current value: {value || '(empty)'}
        </p>
      </div>
    );
  },
};
