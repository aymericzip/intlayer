import type { Meta, StoryObj } from '@storybook/react';
import { Loader } from '.';

const meta: Meta<typeof Loader> = {
  title: 'Components/Loader',
  component: Loader,
  tags: ['autodocs'],
  argTypes: {
    isLoading: {
      description:
        'Controls whether the loader (spinner) is displayed. Defaults to true when undefined.',
      control: 'boolean',
      defaultValue: true,
    },
    children: {
      description:
        'Optional content to render when not loading (isLoading = false).',
      control: 'text',
      defaultValue: 'Loaded content',
    },
    className: {
      description:
        'Additional CSS classes applied to the wrapper when loading.',
      control: 'text',
    },
  },
} satisfies Meta<typeof Loader>;

type Story = StoryObj<typeof Loader>;

export default meta;

export const Standalone: Story = {
  args: {
    isLoading: true,
  },
  render: (args) => <Loader {...args} />,
};

export const AsWrapper: Story = {
  args: {
    isLoading: false,
    children: 'Loaded content',
  },
  render: (args) => <Loader {...args}>{args.children}</Loader>,
};
