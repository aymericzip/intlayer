import type { Meta, StoryObj } from '@storybook/react';
import { InputSize, InputVariant } from './Input';
import { SearchInput } from './SearchInput';

const meta: Meta<typeof SearchInput> = {
  title: 'Components/SearchInput',
  component: SearchInput,
  tags: ['autodocs'],
  argTypes: {
    placeholder: {
      description: 'Placeholder text for the search input field',
      control: 'text',
      defaultValue: 'Search…',
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
      defaultValue: undefined,
    },
    disabled: {
      description: 'Disable the input',
      control: { type: 'boolean', allowUndefined: true },
      defaultValue: undefined,
    },
    className: {
      description: 'Additional CSS classes',
      control: 'text',
    },
  },
} satisfies Meta<typeof SearchInput>;

export default meta;

type Story = StoryObj<typeof SearchInput>;

const Template: Story = {
  args: {
    placeholder: 'Search…',
    variant: InputVariant.DEFAULT,
    size: InputSize.MD,
    validationStyleEnabled: false,
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
    placeholder: 'Search and blur to validate',
  },
};

export const Disabled: Story = {
  ...Template,
  args: {
    ...Template.args,
    disabled: true,
  },
};
