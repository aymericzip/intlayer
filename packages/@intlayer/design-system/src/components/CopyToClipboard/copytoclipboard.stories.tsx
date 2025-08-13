import type { Meta, StoryObj } from '@storybook/react';
import { CopyToClipboard } from '.';

const meta: Meta<typeof CopyToClipboard> = {
  title: 'Components/CopyToClipboard',
  component: CopyToClipboard,
  tags: ['autodocs'],
  argTypes: {
    text: {
      description: 'The text value to copy to the clipboard',
      control: 'text',
      defaultValue: 'Copy this text',
    },
    children: {
      description: 'Content rendered inside the clickable area',
      control: 'text',
      defaultValue: 'Copy',
    },
    className: {
      description: 'Additional CSS classes for the wrapper',
      control: 'text',
    },
  },
} satisfies Meta<typeof CopyToClipboard>;

type Story = StoryObj<typeof CopyToClipboard>;

export default meta;

export const Default: Story = {
  args: {
    text: 'Copy this text',
    children: 'Copy',
  },
};

export const WithCustomLabel: Story = {
  args: {
    text: 'npm i @intlayer/design-system',
    children: 'Install command',
  },
};
