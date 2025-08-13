import type { Meta, StoryObj } from '@storybook/react';
import { Label } from '.';

const meta: Meta<typeof Label> = {
  title: 'Components/Label',
  component: Label,
  tags: ['autodocs'],
  argTypes: {
    children: {
      description: 'Text content of the label',
      control: 'text',
      defaultValue: 'Label',
    },
    htmlFor: {
      description: 'ID of the associated form control',
      control: 'text',
      defaultValue: 'input-id',
    },
    className: {
      description: 'Additional CSS classes',
      control: 'text',
    },
  },
} satisfies Meta<typeof Label>;

type Story = StoryObj<typeof Label>;

const Template: Story = {
  args: {
    children: 'Label',
    htmlFor: 'input-id',
  },
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <Label htmlFor={args.htmlFor} className={args.className}>
        {args.children}
      </Label>
      <input id={args.htmlFor} type="text" placeholder="Type here…" />
    </div>
  ),
};

export default meta;

export const Default: Story = { ...Template };
