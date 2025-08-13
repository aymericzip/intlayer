import type { Meta, StoryObj } from '@storybook/react';
import { WithResizer } from '.';

const meta: Meta<typeof WithResizer> = {
  title: 'Components/WithResizer',
  component: WithResizer,
  tags: ['autodocs'],
  argTypes: {
    initialWidth: {
      description: 'Initial width in pixels for the resizable area',
      control: { type: 'number', min: 0, step: 10 },
      defaultValue: 240,
    },
    minWidth: {
      description: 'Minimum width in pixels (optional)',
      control: { type: 'number', min: 0, step: 10 },
    },
    maxWidth: {
      description: 'Maximum width in pixels (optional)',
      control: { type: 'number', min: 0, step: 10 },
    },
    children: {
      description: 'Content inside the resizable container',
      control: 'text',
      defaultValue:
        'Drag the right handle (rounded bar) to resize this area horizontally.',
    },
  },
} satisfies Meta<typeof WithResizer>;

type Story = StoryObj<typeof WithResizer>;

const Template: Story = {
  args: {
    initialWidth: 240,
    children:
      'Drag the right handle (rounded bar) to resize this area horizontally.',
  },
  render: (args) => (
    <div
      style={{ height: 200 }}
      className="p-3 bg-neutral-50 dark:bg-neutral-900"
    >
      <WithResizer {...args} />
    </div>
  ),
};

export default meta;

export const Default: Story = {
  ...Template,
};

export const WithBounds: Story = {
  ...Template,
  args: {
    ...Template.args,
    minWidth: 120,
    maxWidth: 480,
    children:
      'This resizer has minWidth=120 and maxWidth=480. Try dragging within the bounds.',
  },
};

export const RichContent: Story = {
  ...Template,
  render: (args) => (
    <div
      style={{ height: 220 }}
      className="p-3 bg-neutral-50 dark:bg-neutral-900"
    >
      <WithResizer {...args} initialWidth={320}>
        <div className="h-full p-3 space-y-2">
          <p>
            This area contains richer content to better visualize horizontal
            resizing. Drag the handle to adjust width.
          </p>
          <div className="flex gap-2 flex-wrap">
            <span className="inline-block rounded bg-neutral-200 px-2 py-1 text-xs dark:bg-neutral-800">
              Chip A
            </span>
            <span className="inline-block rounded bg-neutral-200 px-2 py-1 text-xs dark:bg-neutral-800">
              Chip B with a longer text
            </span>
            <span className="inline-block rounded bg-neutral-200 px-2 py-1 text-xs dark:bg-neutral-800">
              Chip C
            </span>
            <span className="inline-block rounded bg-neutral-200 px-2 py-1 text-xs dark:bg-neutral-800">
              Chip D
            </span>
            <span className="inline-block rounded bg-neutral-200 px-2 py-1 text-xs dark:bg-neutral-800">
              Chip E
            </span>
          </div>
        </div>
      </WithResizer>
    </div>
  ),
};
