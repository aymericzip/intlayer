import type { Meta, StoryObj } from '@storybook/react';
import { Input, InputSize, InputVariant } from './Input';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    placeholder: {
      description: 'Placeholder text for the input field',
      control: 'text',
      defaultValue: 'Type here…',
    },
    variant: {
      description: 'Visual style of the input',
      control: { type: 'select' },
      options: Object.values(InputVariant),
      defaultValue: InputVariant.DEFAULT,
    },
    size: {
      description: 'Input size',
      control: { type: 'select' },
      options: Object.values(InputSize),
      defaultValue: InputSize.MD,
    },
    validationStyleEnabled: {
      description: 'Enable native valid/invalid outline styles',
      control: { type: 'boolean', allowUndefined: true },
      defaultValue: false,
    },
    type: {
      description: 'HTML input type',
      control: {
        type: 'select',
      },
      options: [
        'text',
        'email',
        'number',
        'search',
        'tel',
        'url',
        'date',
        'time',
      ],
      defaultValue: 'text',
    },
    disabled: {
      description: 'Disable the input',
      control: { type: 'boolean', allowUndefined: true },
      defaultValue: false,
    },
    className: {
      description: 'Additional CSS classes',
      control: 'text',
    },
  },
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof Input>;

const Template: Story = {
  args: {
    placeholder: 'Type here…',
    variant: InputVariant.DEFAULT,
    size: InputSize.MD,
    validationStyleEnabled: false,
    type: 'text',
    disabled: false,
  },
};

export const Default: Story = { ...Template };

export const Invisible: Story = {
  ...Template,
  args: {
    ...Template.args,
    variant: InputVariant.INVISIBLE,
  },
};

export const Large: Story = {
  ...Template,
  args: {
    ...Template.args,
    size: InputSize.LG,
  },
};

export const WithValidationStyle: Story = {
  ...Template,
  args: {
    ...Template.args,
    validationStyleEnabled: true,
    placeholder: 'Try invalid email and blur',
    type: 'email',
  },
};

export const Disabled: Story = {
  ...Template,
  args: {
    ...Template.args,
    disabled: true,
  },
};
