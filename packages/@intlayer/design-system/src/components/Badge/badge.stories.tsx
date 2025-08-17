import type { Meta, StoryObj } from '@storybook/react';
import { Badge, BadgeColor, BadgeVariant } from '.';

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    children: {
      description: 'Content inside the badge',
      control: 'text',
      defaultValue: 'Badge',
    },
    variant: {
      description: 'Visual variant of the badge',
      control: {
        type: 'select',
      },
      options: Object.values(BadgeVariant),
      defaultValue: BadgeVariant.DEFAULT,
    },
    color: {
      description: 'Color theme of the badge',
      control: {
        type: 'select',
      },
      options: Object.values(BadgeColor),
      defaultValue: BadgeColor.PRIMARY,
    },
    className: {
      description: 'Additional CSS classes',
      control: 'text',
    },
  },
} satisfies Meta<typeof Badge>;

const Template: StoryObj<typeof Badge> = {
  args: {
    children: 'Badge',
    variant: BadgeVariant.DEFAULT,
    color: BadgeColor.PRIMARY,
  },
};

export default meta;

export const Default = Template;
