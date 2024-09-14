import type { Meta, StoryObj } from '@storybook/react';
import { Link } from './Link';

const meta: Meta<typeof Link> = {
  title: 'Components/Link',
  component: Link,
  tags: ['autodocs'],
  argTypes: {
    children: {
      description: 'The text inside the button',
      control: 'text',
      defaultValue: 'Link',
    },
    variant: {
      description: 'The visual style variant of the button',
      control: { type: 'select', options: ['default', 'outline', 'text'] },
      defaultValue: 'default',
    },

    color: {
      description: 'The color theme of the button',
      control: 'color',
      defaultValue: 'primary',
    },

    isExternalLink: {
      description: 'Opens the link in a new tab when true',
      control: 'boolean',
      defaultValue: false,
    },

    label: {
      description: 'Accessible label for the button',
      control: 'text',
      defaultValue: 'Button',
    },
  },
} satisfies Meta<typeof Link>;

const Template: StoryObj<typeof Link> = {
  args: {
    children: 'Button',
    variant: 'default',
    color: 'primary',
    isExternalLink: false,
    label: 'Button',
  },
};

export default meta;

export const Default = Template;
