import type { Meta, StoryObj } from '@storybook/react';
import { SwitchSelector, SwitchSelectorColor, SwitchSelectorSize } from '.';

const meta: Meta<typeof SwitchSelector> = {
  title: 'Components/SwitchSelector',
  component: SwitchSelector,
  tags: ['autodocs'],
  argTypes: {
    choices: {
      description:
        'Array of selectable choices. Each choice has content and value.',
      control: { type: 'object' },
      defaultValue: [
        { content: 'Off', value: false },
        { content: 'On', value: true },
      ],
    },
    defaultValue: {
      description: 'Initial selected value (uncontrolled mode).',
      control: 'boolean',
      defaultValue: false,
    },
    color: {
      description: 'Color theme.',
      control: { type: 'select' },
      options: Object.values(SwitchSelectorColor),
      defaultValue: SwitchSelectorColor.PRIMARY,
    },
    size: {
      description: 'Size of choices.',
      control: { type: 'select' },
      options: Object.values(SwitchSelectorSize),
      defaultValue: SwitchSelectorSize.MD,
    },
    className: {
      description: 'Additional class names for the container.',
      control: 'text',
    },
    value: {
      description:
        'Controlled value. Use with onChange. If provided, component becomes controlled.',
      control: false,
      table: { category: 'Advanced' },
    },
    onChange: {
      description: 'Callback when selection changes.',
      action: 'changed',
    },
  },
} satisfies Meta<typeof SwitchSelector>;

export default meta;

type Story = StoryObj<typeof SwitchSelector>;

export const Default: Story = {
  args: {
    choices: [
      { content: 'Off', value: false },
      { content: 'On', value: true },
    ],
    defaultValue: false,
    color: SwitchSelectorColor.PRIMARY,
    size: SwitchSelectorSize.MD,
  },
};

export const ThreeOptions: Story = {
  args: {
    choices: [
      { content: 'Option 1', value: 'option1' },
      { content: 'Option 2', value: 'option2' },
      { content: 'Option 3', value: 'option3' },
    ],
    defaultValue: 'option1',
    color: SwitchSelectorColor.SECONDARY,
    size: SwitchSelectorSize.MD,
  },
};
