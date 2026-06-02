import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox, CheckboxColor, CheckboxSize } from './Checkbox';

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  argTypes: {
    label: {
      description: 'Optional label displayed next to the checkbox',
      control: 'text',
      defaultValue: 'Accept terms and conditions',
    },
    name: {
      description: 'Checkbox name (used for id when not provided)',
      control: 'text',
      defaultValue: 'terms',
    },
    checked: {
      description: 'Controlled checked state',
      control: { type: 'boolean', allowUndefined: true },
      defaultValue: undefined,
    },
    disabled: {
      description: 'Disable the checkbox',
      control: { type: 'boolean', allowUndefined: true },
      defaultValue: undefined,
    },
    size: {
      description: 'Checkbox size',
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg'],
      defaultValue: 'md',
    },
    color: {
      description: 'Accent color',
      control: { type: 'select' },
      options: [
        'primary',
        'secondary',
        'neutral',
        'light',
        'text',
        'text-inverse',
        'dark',
        'error',
        'success',
        'custom',
      ],
      defaultValue: 'primary',
    },
    validationStyleEnabled: {
      description: 'Enable valid/invalid styles',
      control: { type: 'boolean', allowUndefined: true },
      defaultValue: undefined,
    },
    onChange: {
      description: 'Change handler',
      action: 'changed',
    },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;

type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  args: {
    label: 'Accept terms and conditions',
    name: 'terms',
    checked: false,
    disabled: false,
    size: 'md',
    color: 'primary',
    validationStyleEnabled: false,
    onChange: () => {},
  },
};
