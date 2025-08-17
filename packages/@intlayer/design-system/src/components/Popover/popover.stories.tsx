import type { Meta, StoryObj } from '@storybook/react';
import { Popover, PopoverXAlign, PopoverYAlign } from '.';

const meta = {
  title: 'Components/Popover',
  component: Popover,
  tags: ['autodocs'],
} satisfies Meta<typeof Popover>;

export default meta;

type PopoverStoryArgs = {
  identifier: string;
  triggerLabel: string;
  content: string;
  isHidden?: boolean;
  isOverable?: boolean;
  isFocusable?: boolean;
  xAlign?: PopoverXAlign;
  yAlign?: PopoverYAlign;
  displayArrow?: boolean;
};

type Story = StoryObj<PopoverStoryArgs>;

export const Default: Story = {
  args: {
    identifier: 'popover',
    triggerLabel: 'Open popover',
    content: 'Popover content',
    isHidden: false,
    isOverable: true,
    isFocusable: false,
    xAlign: PopoverXAlign.START,
    yAlign: PopoverYAlign.BELOW,
    displayArrow: true,
  },
  argTypes: {
    identifier: {
      description:
        'Unique identifier linking trigger and detail for accessibility',
      control: 'text',
    },
    triggerLabel: {
      description: 'Text content of the clickable trigger',
      control: 'text',
    },
    content: {
      description: 'Content displayed inside the popover',
      control: 'text',
    },
    isHidden: {
      description:
        'Controls visibility. When false, popover is visible. When true, hidden. When undefined, visibility is handled by hover/focus states.',
      control: 'boolean',
    },
    isOverable: {
      description: 'Show on hover of the trigger',
      control: 'boolean',
    },
    isFocusable: {
      description: 'Show when the trigger is focused',
      control: 'boolean',
    },
    xAlign: {
      description: 'Horizontal alignment relative to the trigger',
      control: { type: 'select' },
      options: Object.values(PopoverXAlign),
    },
    yAlign: {
      description: 'Vertical alignment relative to the trigger',
      control: { type: 'select' },
      options: Object.values(PopoverYAlign),
    },
    displayArrow: {
      description: 'Show the small directional arrow on the popover',
      control: 'boolean',
    },
  },
  render: (args) => (
    <div style={{ padding: '2rem' }}>
      <Popover identifier={args.identifier}>
        {args.triggerLabel}
        <Popover.Detail
          identifier={args.identifier}
          isHidden={args.isHidden}
          isOverable={args.isOverable}
          isFocusable={args.isFocusable}
          xAlign={args.xAlign}
          yAlign={args.yAlign}
          displayArrow={args.displayArrow}
        >
          <div style={{ padding: '0.5rem 0.75rem' }}>{args.content}</div>
        </Popover.Detail>
      </Popover>
    </div>
  ),
};
