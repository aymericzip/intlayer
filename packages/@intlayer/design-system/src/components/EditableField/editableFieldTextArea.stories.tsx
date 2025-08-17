import type { Meta, StoryObj } from '@storybook/react';
import { EditableFieldTextArea } from '.';
import { InputVariant } from '../Input';

const meta: Meta<typeof EditableFieldTextArea> = {
  title: 'Components/EditableField/TextArea',
  component: EditableFieldTextArea,
  tags: ['autodocs'],
  argTypes: {
    placeholder: {
      description: 'Placeholder content',
      control: 'text',
      defaultValue: 'Click the edit icon to modify…',
    },
    defaultValue: {
      description: 'Initial content (uncontrolled)',
      control: 'text',
      defaultValue: 'Editable multiline text',
    },
    autoSize: {
      description: 'Auto-resize textarea height to content',
      control: 'boolean',
      defaultValue: true,
    },
    maxRows: {
      description: 'Maximum auto-sized rows',
      control: { type: 'number', min: 1, max: 50 },
      defaultValue: 10,
    },
    variant: {
      description: 'Visual variant',
      control: { type: 'select' },
      options: Object.values(InputVariant),
      defaultValue: InputVariant.DEFAULT,
    },
    validationStyleEnabled: {
      description: 'Enable valid/invalid styling based on aria-invalid',
      control: 'boolean',
      defaultValue: false,
    },
    disabled: {
      description: 'Disable the textarea',
      control: 'boolean',
      defaultValue: false,
    },
    onSave: { table: { disable: true } },
    onCancel: { table: { disable: true } },
  },
};

export default meta;

type Story = StoryObj<typeof EditableFieldTextArea>;

export const Default: Story = {
  args: {
    placeholder: 'Click the edit icon to modify…',
    defaultValue: 'Editable multiline text',
    autoSize: true,
    maxRows: 10,
    variant: InputVariant.DEFAULT,
    validationStyleEnabled: false,
    disabled: false,
  },
  render: (args) => (
    <EditableFieldTextArea
      {...args}
      onSave={(value) => {
        console.log('Saved value:', value);
      }}
      onCancel={() => {
        console.log('Edit cancelled');
      }}
    />
  ),
};

export const Invisible: Story = {
  args: {
    ...Default.args,
    variant: InputVariant.INVISIBLE,
  },
};
