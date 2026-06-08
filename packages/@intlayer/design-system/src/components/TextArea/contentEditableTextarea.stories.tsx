import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { ContentEditableTextArea } from './ContentEditableTextArea';

const meta: Meta<typeof ContentEditableTextArea> = {
  title: 'Components/TextArea/ContentEditableTextArea',
  component: ContentEditableTextArea,
  tags: ['autodocs'],
  argTypes: {
    dir: { control: 'select', options: ['ltr', 'rtl', 'auto'] },
  },
};

export default meta;
type Story = StoryObj<typeof ContentEditableTextArea>;

export const Default: Story = {
  args: {
    placeholder: 'Start typing...',
    minRows: 3,
    maxRows: 10,
  },
};

export const WithGhostText: Story = {
  render: () => (
    <ContentEditableTextArea
      value="Hello "
      ghostText="world, how are you?"
      ghostLine={0}
      ghostOffset={6}
    />
  ),
};

export const MultilineGhost: Story = {
  render: () => (
    <ContentEditableTextArea
      value={'First line\nSecond line: '}
      ghostText="autocomplete suggestion"
      ghostLine={1}
      ghostOffset={13}
      minRows={4}
    />
  ),
};

export const RTL: Story = {
  args: {
    dir: 'rtl',
    placeholder: 'اكتب هنا...',
    defaultValue: 'مرحبا بالعالم',
    minRows: 3,
  },
};

export const Disabled: Story = {
  args: {
    value: 'This content cannot be edited',
    disabled: true,
  },
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState('Edit me!');
    return (
      <div className="space-y-2">
        <ContentEditableTextArea
          value={value}
          onChange={setValue}
          minRows={3}
          maxRows={8}
        />
        <p className="text-neutral-500 text-sm">{value.length} characters</p>
      </div>
    );
  },
};
