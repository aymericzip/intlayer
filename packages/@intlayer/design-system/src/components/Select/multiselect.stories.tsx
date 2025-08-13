import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { MultiSelect } from '.';

type MultiSelectStoryArgs = {
  placeholder: string;
  options: string[];
  loop: boolean;
  validationStyleEnabled: boolean;
};

const meta: Meta<typeof MultiSelect> = {
  title: 'Components/MultiSelect',
  component: MultiSelect,
  tags: ['autodocs'],
  argTypes: {
    placeholder: {
      description: 'Placeholder for the input field',
      control: 'text',
      defaultValue: 'Select your frameworks',
    },
    options: {
      description: 'Available options in the list',
      control: { type: 'object' },
      defaultValue: ['React', 'Vue', 'Svelte', 'Angular'],
    },
    loop: {
      description: 'Keyboard navigation loops across selected badges',
      control: 'boolean',
      defaultValue: false,
    },
    validationStyleEnabled: {
      description: 'Enable success/error border styles via validity state',
      control: 'boolean',
      defaultValue: false,
    },
  },
} satisfies Meta<typeof MultiSelect>;

export default meta;

type Story = StoryObj<typeof MultiSelect & MultiSelectStoryArgs>;

export const Default: Story = {
  args: {
    placeholder: 'Select your frameworks',
    options: ['React', 'Vue', 'Svelte', 'Angular'],
    loop: false,
    validationStyleEnabled: false,
  },
  render: ({ placeholder, options, loop, validationStyleEnabled }) => {
    const [values, setValues] = useState<string[]>([]);

    return (
      <MultiSelect values={values} onValueChange={setValues} loop={loop}>
        <MultiSelect.Trigger validationStyleEnabled={validationStyleEnabled}>
          <MultiSelect.Input placeholder={placeholder} />
        </MultiSelect.Trigger>
        <MultiSelect.Content>
          <MultiSelect.List>
            {options.map((opt) => (
              <MultiSelect.Item key={opt} value={opt}>
                {opt}
              </MultiSelect.Item>
            ))}
          </MultiSelect.List>
        </MultiSelect.Content>
      </MultiSelect>
    );
  },
};
