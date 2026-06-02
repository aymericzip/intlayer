import type { Meta, StoryObj } from '@storybook/react';
import { InputPassword } from './InputPassword';

const meta: Meta<typeof InputPassword> = {
  title: 'Components/InputPassword',
  component: InputPassword,
  tags: ['autodocs'],
  argTypes: {
    placeholder: {
      description: 'Placeholder text',
      control: 'text',
      defaultValue: 'Enter your password',
    },
    size: {
      description: 'Input size',
      control: { type: 'select' },
      options: ['md', 'lg'],
      defaultValue: 'md',
    },
    variant: {
      description: 'Visual style of the input',
      control: { type: 'select' },
      options: ['default', 'invisible'],
      defaultValue: 'default',
    },
    disabled: {
      description: 'Disable the input',
      control: { type: 'boolean', allowUndefined: true },
      defaultValue: undefined,
    },
  },
} satisfies Meta<typeof InputPassword>;

export default meta;

type Story = StoryObj<typeof InputPassword>;

export const Default: Story = {
  args: {
    placeholder: 'Enter your password',
    size: 'md',
    variant: 'default',
    disabled: false,
  },
};
