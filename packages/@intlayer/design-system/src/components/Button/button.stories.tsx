import type { Meta, StoryObj } from '@storybook/react';
import { Button, ButtonColor, ButtonSize, ButtonVariant } from './Button';

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
      control: { type: 'select' },
      options: Object.values(ButtonVariant),
      defaultValue: ButtonVariant.DEFAULT,
    },
    size: {
      description: 'The size of the button',
      control: { type: 'select' },
      options: Object.values(ButtonSize),
      defaultValue: ButtonSize.MD,
    },
    color: {
      description: 'The color theme of the button',
      control: { type: 'select' },
      options: Object.values(ButtonColor),
      defaultValue: ButtonColor.PRIMARY,
    },
    isLoading: {
      description: 'Shows loading spinner when true',
      control: { type: 'boolean', allowUndefined: true },
      defaultValue: false,
    },
    isActive: {
      description: 'Sets the active state of the button',
      control: { type: 'boolean', allowUndefined: true },
      defaultValue: false,
    },
    isDisabled: {
      description: 'Disables the button when true',
      control: { type: 'boolean', allowUndefined: true },
      defaultValue: false,
    },
    isFullWidth: {
      description: 'Expands the button to the full width of its container',
      control: { type: 'boolean', allowUndefined: true },
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
    variant: ButtonVariant.DEFAULT,
    size: ButtonSize.MD,
    color: ButtonColor.PRIMARY,
    isLoading: false,
    isActive: false,
    disabled: false,
    isFullWidth: false,
    label: 'Button',
  },
};

export default meta;

export const Default = Template;

export const Loading: StoryObj<typeof Button> = {
  args: {
    ...Template.args,
    isLoading: true,
  },
};

export const WithIcons: StoryObj<typeof Button> = {
  args: {
    ...Template.args,
    children: 'Proceed',
  },
};
