import type { Meta, StoryObj } from '@storybook/react';
import {
  Container,
  ContainerBackground,
  ContainerBorderColor,
  ContainerGap,
  ContainerPadding,
  ContainerRoundedSize,
  ContainerSeparator,
  ContainerTransparency,
} from '.';

const meta: Meta<typeof Container> = {
  title: 'Components/Container',
  component: Container,
  tags: ['autodocs'],
  argTypes: {
    children: {
      description: 'Content inside the container',
      control: 'text',
      defaultValue: 'Container content',
    },
    roundedSize: {
      description: 'Border radius size',
      control: {
        type: 'select',
      },
      options: Object.values(ContainerRoundedSize),
      defaultValue: ContainerRoundedSize.MD,
    },
    transparency: {
      description: 'Background transparency level',
      control: {
        type: 'select',
      },
      options: Object.values(ContainerTransparency),
      defaultValue: ContainerTransparency.MD,
    },
    padding: {
      description: 'Padding around content',
      control: { type: 'select' },
      options: Object.values(ContainerPadding),
      defaultValue: ContainerPadding.MD,
    },
    separator: {
      description: 'Dashed dividers between children',
      control: { type: 'select' },
      options: Object.values(ContainerSeparator),
      defaultValue: ContainerSeparator.WITHOUT,
    },
    border: {
      description: 'Show border',
      control: 'boolean',
      defaultValue: false,
    },
    borderColor: {
      description: 'Border color',
      control: {
        type: 'select',
      },
      options: Object.values(ContainerBorderColor),
      defaultValue: ContainerBorderColor.TEXT,
    },
    background: {
      description: 'Background behavior',
      control: { type: 'select' },
      options: Object.values(ContainerBackground),
      defaultValue: ContainerBackground.NONE,
    },
    gap: {
      description: 'Gap between children',
      control: {
        type: 'select',
      },
      options: Object.values(ContainerGap),
      defaultValue: ContainerGap.NONE,
    },
  },
} satisfies Meta<typeof Container>;

const Template: StoryObj<typeof Container> = {
  args: {
    children: 'Container content',
    roundedSize: ContainerRoundedSize.MD,
    transparency: ContainerTransparency.MD,
    padding: ContainerPadding.MD,
    separator: ContainerSeparator.WITHOUT,
    border: false,
    borderColor: ContainerBorderColor.TEXT,
    background: ContainerBackground.NONE,
    gap: ContainerGap.NONE,
  },
};

export default meta;

export const Default = Template;
