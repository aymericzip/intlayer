import type { Meta, StoryObj } from '@storybook/react';
import { CopyButton } from '.';
import { ButtonColor, ButtonSize, ButtonVariant } from '../Button';

const meta: Meta<typeof CopyButton> = {
  title: 'Components/CopyButton',
  component: CopyButton,
  tags: ['autodocs'],
  argTypes: {
    content: {
      description: 'Text content to copy to the clipboard',
      control: 'text',
      defaultValue: 'Copy this text',
    },
    label: {
      description: 'Accessible label for the button',
      control: 'text',
      defaultValue: 'Copy to clipboard',
    },
    size: {
      description: 'Icon button size',
      control: {
        type: 'select',
      },
      options: Object.values(ButtonSize),
      defaultValue: ButtonSize.ICON_SM,
    },
    variant: {
      description: 'Visual style variant',
      control: {
        type: 'select',
      },
      options: Object.values(ButtonVariant),
      defaultValue: ButtonVariant.HOVERABLE,
    },
    color: {
      description: 'Color theme of the button',
      control: {
        type: 'select',
      },
      options: Object.values(ButtonColor),
      defaultValue: ButtonColor.TEXT,
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
    disabled: {
      description: 'Disables the button when true',
      control: 'boolean',
      defaultValue: false,
    },
    iconClassName: {
      description: 'Custom className applied to the icon',
      control: 'text',
    },
  },
} satisfies Meta<typeof CopyButton>;

export default meta;

type Story = StoryObj<typeof CopyButton>;

export const Default: Story = {
  args: {
    content: 'Copy me',
    label: 'Copy to clipboard',
    size: ButtonSize.ICON_SM,
    variant: ButtonVariant.HOVERABLE,
    color: ButtonColor.TEXT,
    isLoading: false,
    isActive: false,
    disabled: false,
  },
};
