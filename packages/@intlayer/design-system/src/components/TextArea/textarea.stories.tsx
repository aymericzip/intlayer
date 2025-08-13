import type { Meta, StoryObj } from '@storybook/react';
import { TextArea } from '.';
import { InputVariant } from '../Input';

const meta: Meta<typeof TextArea> = {
  title: 'Components/TextArea',
  component: TextArea,
  tags: ['autodocs'],
  argTypes: {
    placeholder: {
      description: 'Placeholder text',
      control: 'text',
      defaultValue: 'Type here…',
    },
    defaultValue: {
      description: 'Initial content (uncontrolled)',
      control: 'text',
      defaultValue: '',
    },
    rows: {
      description: 'Number of visible text lines',
      control: { type: 'number', min: 1, max: 20 },
      defaultValue: 3,
    },
    disabled: {
      description: 'Disable the textarea',
      control: 'boolean',
      defaultValue: false,
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
  },
};

export default meta;

type Story = StoryObj<typeof TextArea>;

export const Default: Story = {
  args: {
    placeholder: 'Type your message…',
    rows: 3,
    variant: InputVariant.DEFAULT,
    validationStyleEnabled: false,
  },
};

export const Invisible: Story = {
  args: {
    placeholder: 'Invisible variant',
    variant: InputVariant.INVISIBLE,
  },
};

export const Invalid: Story = {
  args: {
    placeholder: 'Invalid state (with validation styles)',
    validationStyleEnabled: true,
    'aria-invalid': true,
  },
};
