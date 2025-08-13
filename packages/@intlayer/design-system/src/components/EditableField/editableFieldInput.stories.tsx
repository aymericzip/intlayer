import type { Meta, StoryObj } from '@storybook/react';
import { EditableFieldInput } from '.';
import { InputSize, InputVariant } from '../Input';

const meta: Meta<typeof EditableFieldInput> = {
  title: 'Components/EditableField/Input',
  component: EditableFieldInput,
  tags: ['autodocs'],
  argTypes: {
    placeholder: {
      description: 'Placeholder text for the input',
      control: 'text',
      defaultValue: 'Click the edit icon to modify…',
    },
    defaultValue: {
      description: 'Initial value (uncontrolled)',
      control: 'text',
      defaultValue: 'Editable text',
    },
    variant: {
      description: 'Visual variant of the input',
      control: { type: 'select', options: Object.values(InputVariant) },
      defaultValue: InputVariant.DEFAULT,
    },
    size: {
      description: 'Size of the input',
      control: { type: 'select', options: Object.values(InputSize) },
      defaultValue: InputSize.MD,
    },
    validationStyleEnabled: {
      description: 'Enable native valid/invalid outline styles',
      control: 'boolean',
      defaultValue: false,
    },
    disabled: {
      description: 'Disable the input element',
      control: 'boolean',
      defaultValue: false,
    },
    onSave: {
      table: { disable: true },
    },
    onCancel: {
      table: { disable: true },
    },
  },
};

export default meta;

type Story = StoryObj<typeof EditableFieldInput>;

export const Default: Story = {
  args: {
    placeholder: 'Click the edit icon to modify…',
    defaultValue: 'Editable text',
    variant: InputVariant.DEFAULT,
    size: InputSize.MD,
    validationStyleEnabled: false,
    disabled: false,
  },
  render: (args) => (
    <EditableFieldInput
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

export const Large: Story = {
  args: {
    ...Default.args,
    size: InputSize.LG,
  },
};
