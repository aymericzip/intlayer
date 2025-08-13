import type { Meta, StoryObj } from '@storybook/react';
import { InformationTag } from '.';

const meta: Meta<typeof InformationTag> = {
  title: 'Components/InformationTag',
  component: InformationTag,
  tags: ['autodocs'],
  argTypes: {
    children: {
      description: 'Content inside the information tag',
      control: 'text',
      defaultValue: 'This is an info note',
    },
    className: {
      description: 'Additional CSS classes',
      control: 'text',
    },
  },
} satisfies Meta<typeof InformationTag>;

const Template: StoryObj<typeof InformationTag> = {
  args: {
    children: 'This is an info note',
  },
};

export default meta;

export const Default = Template;
