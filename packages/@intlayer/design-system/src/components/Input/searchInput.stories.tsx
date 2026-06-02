import type { Meta, StoryObj } from '@storybook/react';
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
      options: ['default', 'invisible'],
      defaultValue: 'default',
    },
    size: {
      description: 'Input size',
      control: { type: 'select' },
      options: ['md', 'lg'],
      defaultValue: 'md',
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
    variant: 'default',
    size: 'md',
    validationStyleEnabled: false,
    disabled: false,
  },
};

export const Default: Story = { ...Template };

export const Invisible: Story = {
  ...Template,
  args: {
    ...Template.args,
    variant: 'invisible',
  },
};

export const Large: Story = {
  ...Template,
  args: {
    ...Template.args,
    size: 'lg',
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
