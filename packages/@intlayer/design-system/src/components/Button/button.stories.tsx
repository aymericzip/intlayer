import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    children: {
      description: 'The text inside the button',
      control: 'text',
      defaultValue: 'Button', // Default value for better autodocs
    },
    variant: {
      description: 'The visual style variant of the button',
      control: { type: 'select', options: ['default', 'outline', 'text'] },
      defaultValue: 'default',
    },
    size: {
      description: 'The size of the button',
      control: { type: 'select', options: ['sm', 'md', 'lg'] },
      defaultValue: 'md',
    },
    color: {
      description: 'The color theme of the button',
      control: 'color',
      defaultValue: 'primary',
    },
    isLoading: {
      description: 'Shows loading spinner when true',
      control: 'boolean',
      defaultValue: false,
    },
    isActive: {
      description: 'Sets the active state of the button',
      control: 'boolean',
      defaultValue: false,
    },
    isDisabled: {
      description: 'Disables the button when true',
      control: 'boolean',
      defaultValue: false,
    },
    isFullWidth: {
      description: 'Expands the button to the full width of its container',
      control: 'boolean',
      defaultValue: false,
    },
    label: {
      description: 'Accessible label for the button',
      control: 'text',
      defaultValue: 'Button',
    },
  },
} satisfies Meta<typeof Button>;

const Template: StoryObj<typeof Button> = {
  args: {
    children: 'Button',
    variant: 'default',
    size: 'md',
    color: 'primary',
    isLoading: false,
    isActive: false,
    disabled: false,
    isFullWidth: false,
    label: 'Button',
  },
};

export default meta;

export const Default = Template;
