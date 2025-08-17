import type { Meta, StoryObj } from '@storybook/react';
import { DropDown, DropDownAlign } from '.';

const meta: Meta<typeof DropDown> = {
  title: 'Components/DropDown',
  component: DropDown,
  tags: ['autodocs'],
} satisfies Meta<typeof DropDown>;

export default meta;

type DropDownStoryArgs = {
  identifier: string;
  triggerLabel: string;
  content: string;
  isHidden?: boolean;
  isOverable?: boolean;
  isFocusable?: boolean;
  align?: DropDownAlign;
};

type Story = StoryObj<DropDownStoryArgs>;

const baseArgTypes = {
  identifier: {
    description:
      'Unique identifier linking trigger and panel for accessibility',
    control: 'text',
  },
  triggerLabel: {
    description: 'Text content of the clickable trigger',
    control: 'text',
  },
  content: {
    description: 'Content displayed inside the dropdown panel',
    control: 'text',
  },
  isHidden: {
    description:
      'Controls visibility. When false, panel is visible. When true, hidden. When undefined, visibility can be handled by hover/focus states.',
    control: 'boolean',
  },
  isOverable: {
    description: 'Show on hover of the trigger (uncontrolled behavior)',
    control: 'boolean',
  },
  isFocusable: {
    description: 'Show when the trigger is focused (accessible toggle)',
    control: 'boolean',
  },
  align: {
    description: 'Horizontal alignment of the panel relative to the trigger',
    control: { type: 'select' },
    options: Object.values(DropDownAlign),
  },
} as const;

export const Default: Story = {
  args: {
    identifier: 'dropdown',
    triggerLabel: 'Open dropdown',
    content: 'Dropdown content',
    isOverable: true,
    isFocusable: false,
    align: DropDownAlign.START,
  },
  argTypes: baseArgTypes,
  render: (args) => (
    <div style={{ padding: '2rem' }}>
      <DropDown identifier={args.identifier}>
        <DropDown.Trigger identifier={args.identifier}>
          {args.triggerLabel}
        </DropDown.Trigger>
        <DropDown.Panel
          identifier={args.identifier}
          isHidden={args.isHidden}
          isOverable={args.isOverable}
          isFocusable={args.isFocusable}
          align={args.align}
        >
          <div style={{ padding: '0.5rem 0.75rem' }}>{args.content}</div>
        </DropDown.Panel>
      </DropDown>
    </div>
  ),
};

export const FocusToOpen: Story = {
  args: {
    identifier: 'dropdown-focus',
    triggerLabel: 'Focus to open',
    content: 'Opens when the trigger receives focus',
    isOverable: false,
    isFocusable: true,
    align: DropDownAlign.START,
  },
  argTypes: baseArgTypes,
  render: Default.render,
};

export const ControlledVisible: Story = {
  args: {
    identifier: 'dropdown-visible',
    triggerLabel: 'Controlled visible',
    content: 'Panel visibility is controlled via isHidden = false',
    isHidden: false,
    isOverable: false,
    isFocusable: false,
    align: DropDownAlign.START,
  },
  argTypes: baseArgTypes,
  render: Default.render,
};

export const ControlledHidden: Story = {
  args: {
    identifier: 'dropdown-hidden',
    triggerLabel: 'Controlled hidden',
    content: 'Panel is hidden via isHidden = true',
    isHidden: true,
    isOverable: false,
    isFocusable: false,
    align: 'start',
  },
  argTypes: baseArgTypes,
  render: Default.render,
};

export const AlignEnd: Story = {
  args: {
    identifier: 'dropdown-end',
    triggerLabel: 'Aligned end',
    content: 'The panel aligns to the end (right) of the trigger',
    isOverable: true,
    isFocusable: false,
    align: DropDownAlign.END,
  },
  argTypes: baseArgTypes,
  render: Default.render,
};
