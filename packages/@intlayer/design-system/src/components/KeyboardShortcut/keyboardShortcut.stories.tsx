import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { KeyboardShortcut } from './index';

const meta: Meta<typeof KeyboardShortcut> = {
  title: 'Components/KeyboardShortcut',
  component: KeyboardShortcut,
  tags: ['autodocs'],
  args: { onTriggered: fn() },
  argTypes: {
    shortcut: {
      description: 'The keyboard shortcut to display',
      control: 'text',
    },
    onTriggered: {
      description: 'Function to call when the shortcut is triggered',
      action: 'triggered',
    },
  },
} satisfies Meta<typeof KeyboardShortcut>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    shortcut: '⌘ + K',
  },
};

export const CtrlVariant: Story = {
  args: {
    shortcut: 'Ctrl + K',
  },
};

export const AnotherShortcut: Story = {
  args: {
    shortcut: '⌘ + F',
  },
};
