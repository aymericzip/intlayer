import type { Meta, StoryObj } from '@storybook/react';
import { HeightResizer } from '.';

const meta: Meta<typeof HeightResizer> = {
  title: 'Components/HeightResizer',
  component: HeightResizer,
  tags: ['autodocs'],
  argTypes: {
    initialHeight: {
      description: 'Initial height in pixels for the resizable area',
      control: { type: 'number', min: 0, step: 10 },
      defaultValue: 200,
    },
    minHeight: {
      description: 'Minimum height in pixels (optional)',
      control: { type: 'number', min: 0, step: 10 },
    },
    maxHeight: {
      description: 'Maximum height in pixels (optional)',
      control: { type: 'number', min: 0, step: 10 },
    },
    children: {
      description: 'Content inside the resizable container',
      control: 'text',
      defaultValue:
        'Drag the top handle (rounded bar) to resize this area vertically.',
    },
    className: {
      description: 'Additional CSS classes for the container',
      control: 'text',
    },
  },
} satisfies Meta<typeof HeightResizer>;

type Story = StoryObj<typeof HeightResizer>;

const Template: Story = {
  args: {
    initialHeight: 200,
    children:
      'Drag the top handle (rounded bar) to resize this area vertically.',
  },
};

export default meta;

export const Default: Story = {
  ...Template,
};

export const WithBounds: Story = {
  ...Template,
  args: {
    ...Template.args,
    minHeight: 100,
    maxHeight: 400,
    children:
      'This resizer has minHeight=100 and maxHeight=400. Try dragging within the bounds.',
  },
};

export const RichContent: Story = {
  ...Template,
  render: (args) => (
    <HeightResizer {...args} initialHeight={240}>
      <div className="p-3 space-y-2">
        <p>
          This area contains richer content to better visualize resizing. Drag
          the handle to adjust height.
        </p>
        <ul className="list-disc pl-4 space-y-1">
          <li>Item A with some explanatory text.</li>
          <li>Item B with a longer description to cause wrapping.</li>
          <li>Item C</li>
          <li>Item D</li>
          <li>Item E</li>
        </ul>
      </div>
    </HeightResizer>
  ),
};
