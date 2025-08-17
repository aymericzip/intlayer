import type { Meta, StoryObj } from '@storybook/react';
import {
  Tag,
  TagBackground,
  TagBorder,
  TagColor,
  TagRoundedSize,
  TagSize,
} from '.';

const meta: Meta<typeof Tag> = {
  title: 'Components/Tag',
  component: Tag,
  tags: ['autodocs'],
  argTypes: {
    children: {
      description: 'Content inside the tag',
      control: 'text',
      defaultValue: 'Tag',
    },
    color: {
      description: 'Color theme of the tag',
      control: {
        type: 'select',
      },
      options: Object.values(TagColor),
      defaultValue: TagColor.TEXT,
    },
    roundedSize: {
      description: 'Border radius size',
      control: {
        type: 'select',
      },
      options: Object.values(TagRoundedSize),
      defaultValue: TagRoundedSize.FULL,
    },
    size: {
      description: 'Size of the tag',
      control: { type: 'select' },
      options: Object.values(TagSize),
      defaultValue: TagSize.MD,
    },
    border: {
      description: 'Border visibility',
      control: { type: 'select' },
      options: Object.values(TagBorder),
      defaultValue: TagBorder.NONE,
    },
    background: {
      description: 'Background visibility',
      control: { type: 'select' },
      options: Object.values(TagBackground),
      defaultValue: TagBackground.NONE,
    },
  },
} satisfies Meta<typeof Tag>;

const Template: StoryObj<typeof Tag> = {
  args: {
    children: 'Tag',
    color: TagColor.TEXT,
    roundedSize: TagRoundedSize.FULL,
    size: TagSize.MD,
    border: TagBorder.NONE,
    background: TagBackground.NONE,
  },
};

export default meta;

export const Default: StoryObj<typeof Tag> = Template;
