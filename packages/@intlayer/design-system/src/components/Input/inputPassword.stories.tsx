import type { Meta, StoryObj } from '@storybook/react';
import { InputSize, InputVariant } from './Input';
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
      options: Object.values(InputSize),
      defaultValue: InputSize.MD,
    },
    variant: {
      description: 'Visual style of the input',
      control: { type: 'select' },
      options: Object.values(InputVariant),
      defaultValue: InputVariant.DEFAULT,
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
    size: InputSize.MD,
    variant: InputVariant.DEFAULT,
    disabled: false,
  },
};
