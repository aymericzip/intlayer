import type { Meta, StoryObj } from '@storybook/react';
import { MaxHeightSmoother } from '.';

const meta: Meta<typeof MaxHeightSmoother> = {
  title: 'Components/MaxHeightSmoother',
  component: MaxHeightSmoother,
  tags: ['autodocs'],
  argTypes: {
    children: {
      description: 'Content that may overflow and be smoothly revealed',
      control: 'text',
      defaultValue:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi.',
    },
    isHidden: {
      description:
        'When defined, controls whether content is collapsed (true) or expanded (false). Leave undefined for uncontrolled behavior.',
      control: 'boolean',
    },
    isOverable: {
      description: 'Expands on hover',
      control: 'boolean',
      defaultValue: false,
    },
    isFocusable: {
      description: 'Expands on focus/tab (accessible toggle)',
      control: 'boolean',
      defaultValue: false,
    },
    minHeight: {
      description: 'Minimum height in pixels for the collapsed state',
      control: { type: 'number', min: 0, step: 10 },
      defaultValue: 0,
    },
    className: {
      description: 'Additional CSS classes for the container',
      control: 'text',
    },
  },
} satisfies Meta<typeof MaxHeightSmoother>;

type Story = StoryObj<typeof MaxHeightSmoother>;

const Template: Story = {
  args: {
    // Leave isHidden undefined by default so hover/focus variants can control expansion
    isOverable: false,
    isFocusable: false,
    minHeight: 0,
  },
};

export default meta;

export const Default: Story = {
  ...Template,
};

export const ControlledCollapsed: Story = {
  ...Template,
  args: {
    ...Template.args,
    isHidden: true,
    children:
      'This content starts collapsed because isHidden is true. Toggle the control to false to expand smoothly.',
  },
};

export const ControlledExpanded: Story = {
  ...Template,
  args: {
    ...Template.args,
    isHidden: false,
    children:
      'This content is expanded because isHidden is false. Adjust minHeight to see the collapsed baseline height when toggled.',
  },
};

export const HoverToExpand: Story = {
  ...Template,
  args: {
    ...Template.args,
    isOverable: true,
    children:
      'Hover over this area to expand the content smoothly. This demonstrates the hover-driven expansion behavior.',
  },
};

export const FocusToExpand: Story = {
  ...Template,
  args: {
    ...Template.args,
    isFocusable: true,
    children:
      'Tab to focus this container (it has role="button") to expand content in an accessible way.',
  },
};

export const WithMinHeight: Story = {
  ...Template,
  args: {
    ...Template.args,
    minHeight: 80,
    isOverable: true,
    children:
      'This example applies a minHeight so the collapsed state keeps some visible space. Hover to expand beyond the minimum height.',
  },
};
