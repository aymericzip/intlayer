import type { Meta, StoryObj } from '@storybook/react';
import { Link, LinkColor, LinkUnderlined, LinkVariant } from './Link';

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
      description: 'The visual style variant of the link',
      control: { type: 'select' },
      options: Object.values(LinkVariant),
      defaultValue: LinkVariant.DEFAULT,
    },

    color: {
      description: 'The color theme of the link',
      control: { type: 'select' },
      options: Object.values(LinkColor),
      defaultValue: LinkColor.PRIMARY,
    },
    underlined: {
      description: 'Underline style',
      control: { type: 'select' },
      options: Object.values(LinkUnderlined),
      defaultValue: LinkUnderlined.DEFAULT,
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
    children: 'Link',
    variant: LinkVariant.DEFAULT,
    color: LinkColor.PRIMARY,
    isExternalLink: false,
    label: 'Link',
  },
};

export default meta;

export const Default = Template;

export const External: StoryObj<typeof Link> = {
  args: {
    ...Template.args,
    href: 'https://intlayer.org',
    isExternalLink: true,
  },
};
