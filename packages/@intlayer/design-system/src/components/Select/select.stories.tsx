import type { Meta, StoryObj } from '@storybook/react';
import { Select } from '.';
import { SelectContentPosition } from './Select';

type SelectStoryArgs = {
  placeholder: string;
  options: string[];
  validationStyleEnabled: boolean;
  invalid: boolean;
  position: SelectContentPosition;
};

const meta: Meta<typeof Select> = {
  title: 'Components/Select',
  component: Select,
  tags: ['autodocs'],
  argTypes: {
    placeholder: {
      description: 'Placeholder text displayed in the trigger',
      control: 'text',
      defaultValue: 'Select an option',
    },
    options: {
      description: 'List of options rendered in the menu',
      control: { type: 'object' },
      defaultValue: ['Light', 'Dark', 'System'],
    },
    validationStyleEnabled: {
      description: 'Enable success/error border styles via validity state',
      control: 'boolean',
      defaultValue: false,
    },
    invalid: {
      description: 'Sets aria-invalid on the trigger for error state styling',
      control: 'boolean',
      defaultValue: false,
    },
    position: {
      description: 'Positioning strategy for the content',
      control: {
        type: 'select',
        options: Object.values(SelectContentPosition),
      },
      defaultValue: SelectContentPosition.POPPER,
    },
  },
} satisfies Meta<typeof Select>;

export default meta;

type Story = StoryObj<typeof Select & SelectStoryArgs>;

export const Default: Story = {
  args: {
    placeholder: 'Select a theme',
    options: ['Light', 'Dark', 'System'],
    validationStyleEnabled: false,
    invalid: false,
    position: SelectContentPosition.POPPER,
  },
  render: ({
    placeholder,
    options,
    validationStyleEnabled,
    invalid,
    position,
  }) => (
    <Select>
      <Select.Trigger
        aria-invalid={invalid}
        validationStyleEnabled={validationStyleEnabled}
      >
        <Select.Value placeholder={placeholder} />
      </Select.Trigger>
      <Select.Content position={position}>
        {options.map((opt) => (
          <Select.Item key={opt} value={opt.toLowerCase()}>
            {opt}
          </Select.Item>
        ))}
      </Select.Content>
    </Select>
  ),
};
