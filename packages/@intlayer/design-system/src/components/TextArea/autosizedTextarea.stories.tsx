import { useArgs } from '@storybook/preview-api';
import type { Meta, StoryObj } from '@storybook/react';
import { AutoSizedTextArea } from '.';
import { InputVariant } from '../Input';

const meta: Meta<typeof AutoSizedTextArea> = {
  title: 'Components/AutoSizedTextArea',
  component: AutoSizedTextArea,
  tags: ['autodocs'],
  argTypes: {
    placeholder: { control: 'text', defaultValue: 'Auto-size as you type…' },
    autoSize: { control: 'boolean', defaultValue: true },
    maxRows: { control: { type: 'number', min: 1, max: 40 }, defaultValue: 10 },
    variant: {
      control: { type: 'select' },
      options: Object.values(InputVariant),
    },
    validationStyleEnabled: { control: 'boolean', defaultValue: false },
  },
};

export default meta;

type Story = StoryObj<typeof AutoSizedTextArea>;

export const Default: Story = {
  render: (args) => {
    const [, setArgs] = useArgs();
    return (
      <AutoSizedTextArea
        {...args}
        onChange={(e) => setArgs({ value: e.target.value })}
      />
    );
  },
  args: {
    autoSize: true,
    maxRows: 10,
    placeholder: 'Auto-size as you type…',
    value: '',
  },
};

export const WithMaxRows: Story = {
  args: {
    autoSize: true,
    maxRows: 3,
    defaultValue:
      'This textarea grows with content up to 3 rows. Keep typing to see it stop growing beyond the max.',
  },
};
