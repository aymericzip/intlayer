import type { Meta, StoryObj } from '@storybook/react';
import { Accordion } from './Accordion';

const meta: Meta<typeof Accordion> = {
  title: 'Components/Accordion',
  component: Accordion,
  tags: ['autodocs'],
  argTypes: {
    header: {
      description: 'The content of the header',
      control: 'text',
      defaultValue: 'Accordion Header',
    },
    children: {
      description: 'The content to be expanded and collapsed',
      control: 'text',
      defaultValue: 'Accordion content',
    },
    isOpen: {
      description: 'Whether the content is expanded or collapsed by default',
      control: 'boolean',
      defaultValue: false,
    },
  },
} satisfies Meta<typeof Accordion>;

const Template: StoryObj<typeof Accordion> = {
  args: {
    header: 'Accordion Header',
    children: 'Accordion content',
    isOpen: false,
  },
};

export default meta;

export const Default = Template;
