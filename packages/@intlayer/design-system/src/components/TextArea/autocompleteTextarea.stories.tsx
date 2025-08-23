import { useArgs } from '@storybook/preview-api';
import type { Meta, StoryObj } from '@storybook/react';
import { AutoCompleteTextarea } from '.';
import { InputVariant } from '../Input';

const meta: Meta<typeof AutoCompleteTextarea> = {
  title: 'Components/AutoCompleteTextarea',
  component: AutoCompleteTextarea,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Textarea with inline AI suggestions. Press Tab to accept suggestions when available.',
      },
    },
  },
  argTypes: {
    placeholder: {
      control: 'text',
      defaultValue: 'Type to see inline suggestions…',
    },
    isActive: { control: 'boolean', defaultValue: true },
    suggestion: { control: 'text', description: 'Optional forced suggestion' },
    variant: {
      control: { type: 'select' },
      options: Object.values(InputVariant),
    },
  },
};

export default meta;

type Story = StoryObj<typeof AutoCompleteTextarea>;

export const Default: Story = {
  render: (args) => {
    const [, setArgs] = useArgs();
    return (
      <AutoCompleteTextarea
        {...args}
        onChange={(e) => setArgs({ value: e.target.value })}
      />
    );
  },
  args: {
    isActive: true,
    value: '',
    placeholder: 'Type to see inline suggestions…',
  },
};

export const WithProvidedSuggestion: Story = {
  args: {
    suggestion: ' - example inline suggestion',
    defaultValue: 'Start typing',
  },
};
