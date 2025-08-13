import type { Meta, StoryObj } from '@storybook/react';
import { Modal, ModalSize } from './Modal';

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
  tags: ['autodocs'],
  argTypes: {
    children: {
      description: 'Content displayed inside the modal',
      control: 'text',
      defaultValue: 'This is the modal content',
    },
    isOpen: {
      description: 'Controls whether the modal is visible',
      control: 'boolean',
      defaultValue: true,
    },
    title: {
      description: 'Optional title displayed at the top of the modal',
      control: 'text',
      defaultValue: 'Modal title',
    },
    hasCloseButton: {
      description: 'Displays a close button in the header',
      control: 'boolean',
      defaultValue: true,
    },
    disableScroll: {
      description: 'Disables background scroll when the modal is open',
      control: 'boolean',
      defaultValue: false,
    },
    size: {
      description: 'Controls the maximum height/width of the modal',
      control: { type: 'select', options: Object.values(ModalSize) },
      defaultValue: ModalSize.MD,
    },
    onClose: {
      description: 'Called when the modal backdrop or close button is clicked',
      action: 'onClose',
    },
  },
} satisfies Meta<typeof Modal>;

export default meta;

type Story = StoryObj<typeof Modal>;

export const Open: Story = {
  args: {
    isOpen: true,
    title: 'Modal title',
    hasCloseButton: true,
    disableScroll: false,
    size: ModalSize.MD,
    children: 'This is the modal content',
  },
};

export const Closed: Story = {
  args: {
    isOpen: false,
    title: 'Hidden modal',
    hasCloseButton: true,
    size: ModalSize.MD,
    children: 'The modal is closed so this is not visible',
  },
};

export const ScrollableContent: Story = {
  args: {
    isOpen: true,
    title: 'Long content',
    hasCloseButton: true,
    disableScroll: true,
    size: ModalSize.LG,
    children: (
      <div>
        {Array.from({ length: 50 }, (_, i) => (
          <p key={i}>This is line {i + 1} of a long modal content.</p>
        ))}
      </div>
    ),
  },
};
