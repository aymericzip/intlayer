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
      control: 'boolean',
      defaultValue: false,
    },
    disabled: {
      description: 'Disable the checkbox',
      control: 'boolean',
      defaultValue: false,
    },
    size: {
      description: 'Checkbox size',
      control: { type: 'select' },
      options: Object.values(CheckboxSize),
      defaultValue: CheckboxSize.MD,
    },
    color: {
      description: 'Accent color',
      control: { type: 'select' },
      options: Object.values(CheckboxColor),
      defaultValue: CheckboxColor.PRIMARY,
    },
    validationStyleEnabled: {
      description: 'Enable valid/invalid styles',
      control: 'boolean',
      defaultValue: false,
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
    size: CheckboxSize.MD,
    color: CheckboxColor.PRIMARY,
    validationStyleEnabled: false,
    onChange: () => {},
  },
};
