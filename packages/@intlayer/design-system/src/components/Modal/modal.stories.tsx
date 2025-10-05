import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Button, ButtonColor, ButtonSize, ButtonVariant } from '../Button';
import { Container } from '../Container';
import { H3 } from '../Headers';
import { Modal, ModalSize } from './Modal';

/**
 * Modal Component Stories
 *
 * Interactive modal dialog component with portal rendering and Framer Motion animations.
 * Supports multiple size variants, optional title/close button, and comprehensive accessibility features.
 */
const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A highly customizable modal dialog component with portal rendering, smooth animations, and full accessibility support. Features size variants, scroll management, and extensible styling.',
      },
    },
  },
  argTypes: {
    isOpen: {
      control: 'boolean',
      description: 'Controls modal visibility',
      defaultValue: false,
    },
    size: {
      control: 'select',
      options: Object.values(ModalSize),
      description: 'Size variant of the modal',
      defaultValue: ModalSize.MD,
    },
    title: {
      control: 'text',
      description: 'Optional title displayed in modal header',
    },
    hasCloseButton: {
      control: 'boolean',
      description: 'Whether to show close button in header',
      defaultValue: false,
    },
    disableScroll: {
      control: 'boolean',
      description: 'Whether to prevent background scrolling',
      defaultValue: true,
    },
    onClose: {
      action: 'closed',
      description: 'Callback when modal should close',
    },
    children: {
      control: 'text',
      description: 'Content to display in modal',
    },
  },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof Modal>;

/**
 * Interactive wrapper component for Storybook stories
 * Manages modal open/closed state and provides toggle functionality
 */
const ModalStory = (args: any) => {
  const [isOpen, setIsOpen] = useState(args.isOpen || false);

  return (
    <>
      <Container className="p-4">
        <Button
          onClick={() => setIsOpen(true)}
          label="Open Modal"
          color={ButtonColor.PRIMARY}
        >
          Open Modal
        </Button>
        <p className="mt-2 text-neutral-600 text-sm">
          Click the button to open the modal, then test closing behaviors
        </p>
      </Container>

      <Modal {...args} isOpen={isOpen} onClose={() => setIsOpen(false)}>
        {args.children || (
          <Container className="p-6">
            <p>This is a modal dialog. You can close it by:</p>
            <ul className="mt-2 list-inside list-disc space-y-1 text-sm">
              <li>Clicking outside the modal</li>
              <li>Pressing the ESC key</li>
              {args.hasCloseButton && <li>Clicking the close button</li>}
            </ul>
          </Container>
        )}
      </Modal>
    </>
  );
};

/**
 * Default Modal
 * Basic modal with medium size and default styling
 */
export const Default: Story = {
  render: ModalStory,
  args: {
    size: ModalSize.MD,
    hasCloseButton: false,
    disableScroll: true,
  },
};

/**
 * With Title and Close Button
 * Modal featuring both title header and close button for enhanced UX
 */
export const WithTitleAndClose: Story = {
  render: ModalStory,
  args: {
    title: 'Modal Title',
    hasCloseButton: true,
    size: ModalSize.MD,
    children: (
      <Container className="p-6">
        <p>
          This modal has both a title and a close button for better user
          experience.
        </p>
        <p className="mt-2 text-neutral-600 text-sm">
          The title is displayed prominently, and the close button provides an
          explicit way to dismiss the modal.
        </p>
      </Container>
    ),
  },
};

/**
 * Small Size Modal
 * Compact modal perfect for confirmations and brief messages
 */
export const SmallSize: Story = {
  render: ModalStory,
  args: {
    size: ModalSize.SM,
    title: 'Confirm',
    hasCloseButton: true,
    children: (
      <Container className="p-4">
        <p className="text-center">
          Are you sure you want to delete this item?
        </p>
        <div className="mt-4 flex justify-center gap-2">
          <Button
            color={ButtonColor.DESTRUCTIVE}
            size={ButtonSize.SM}
            label="Delete"
          >
            Delete
          </Button>
          <Button
            variant={ButtonVariant.OUTLINE}
            size={ButtonSize.SM}
            label="Cancel"
          >
            Cancel
          </Button>
        </div>
      </Container>
    ),
  },
};

/**
 * Large Size Modal
 * Spacious modal ideal for forms and detailed content
 */
export const LargeSize: Story = {
  render: ModalStory,
  args: {
    size: ModalSize.LG,
    title: 'User Profile Settings',
    hasCloseButton: true,
    children: (
      <Container className="p-6">
        <div className="space-y-4">
          <H3>Personal Information</H3>
          <div className="space-y-2">
            <p>
              <strong>Name:</strong> John Doe
            </p>
            <p>
              <strong>Email:</strong> john.doe@example.com
            </p>
            <p>
              <strong>Role:</strong> Administrator
            </p>
          </div>
          <div className="mt-6 space-y-2">
            <H3>Preferences</H3>
            <p>Language: English</p>
            <p>Theme: Dark Mode</p>
            <p>Notifications: Enabled</p>
          </div>
          <div className="mt-6 flex justify-end gap-2">
            <Button variant={ButtonVariant.OUTLINE} label="Cancel">
              Cancel
            </Button>
            <Button color={ButtonColor.PRIMARY} label="Save Changes">
              Save Changes
            </Button>
          </div>
        </div>
      </Container>
    ),
  },
};

/**
 * Extra Large Modal
 * Maximum size modal for complex interfaces and data tables
 */
export const ExtraLargeSize: Story = {
  render: ModalStory,
  args: {
    size: ModalSize.XL,
    title: 'Data Management Dashboard',
    hasCloseButton: true,
    children: (
      <Container className="p-6">
        <div className="space-y-6">
          <div>
            <H3>Dashboard Overview</H3>
            <p className="text-neutral-600">
              Comprehensive data management interface
            </p>
          </div>

          {/* Mock table */}
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border border-neutral-200">
              <thead>
                <tr className="bg-neutral-50">
                  <th className="border border-neutral-200 p-2 text-left">
                    ID
                  </th>
                  <th className="border border-neutral-200 p-2 text-left">
                    Name
                  </th>
                  <th className="border border-neutral-200 p-2 text-left">
                    Status
                  </th>
                  <th className="border border-neutral-200 p-2 text-left">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {[1, 2, 3, 4, 5].map((id) => (
                  <tr key={id}>
                    <td className="border border-neutral-200 p-2">{id}</td>
                    <td className="border border-neutral-200 p-2">Item {id}</td>
                    <td className="border border-neutral-200 p-2">
                      <span className="rounded bg-green-100 px-2 py-1 text-green-800 text-xs">
                        Active
                      </span>
                    </td>
                    <td className="border border-neutral-200 p-2">
                      <Button
                        size={ButtonSize.SM}
                        variant={ButtonVariant.OUTLINE}
                        label="Edit"
                      >
                        Edit
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Container>
    ),
  },
};

/**
 * Scrollable Content
 * Modal with content that exceeds viewport, demonstrating scroll behavior
 */
export const ScrollableContent: Story = {
  render: ModalStory,
  args: {
    size: ModalSize.MD,
    title: 'Terms and Conditions',
    hasCloseButton: true,
    children: (
      <Container className="p-6">
        <div className="space-y-4">
          {Array.from({ length: 20 }, (_, i) => (
            <p key={i} className="text-justify">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Section {i + 1} of the
              terms and conditions.
            </p>
          ))}
          <div className="mt-6 flex justify-end gap-2">
            <Button variant={ButtonVariant.OUTLINE} label="Decline">
              Decline
            </Button>
            <Button color={ButtonColor.PRIMARY} label="Accept">
              Accept
            </Button>
          </div>
        </div>
      </Container>
    ),
  },
};

/**
 * All Size Variants
 * Showcase of all available modal sizes for comparison
 */
export const AllSizes: Story = {
  render: () => {
    const [openModals, setOpenModals] = useState<Record<string, boolean>>({});

    const toggleModal = (size: ModalSize) => {
      setOpenModals((prev) => ({ ...prev, [size]: !prev[size] }));
    };

    return (
      <Container className="space-y-4 p-4">
        <H3>Modal Size Comparison</H3>
        <div className="grid grid-cols-2 gap-2 md:grid-cols-5">
          {Object.values(ModalSize).map((size) => (
            <Button
              key={size}
              onClick={() => toggleModal(size)}
              label={`Open ${size.toUpperCase()}`}
              size={ButtonSize.SM}
              variant={ButtonVariant.OUTLINE}
            >
              {size.toUpperCase()}
            </Button>
          ))}
        </div>

        {Object.values(ModalSize).map((size) => (
          <Modal
            key={size}
            isOpen={openModals[size] || false}
            onClose={() => toggleModal(size)}
            size={size}
            title={`${size.toUpperCase()} Modal`}
            hasCloseButton
          >
            <Container className="p-6">
              <p>This is a {size} sized modal.</p>
              <p className="mt-2 text-neutral-600 text-sm">
                Max dimensions:{' '}
                {size === ModalSize.SM
                  ? '30vh height, xl width'
                  : size === ModalSize.MD
                    ? '50vh height, xl width'
                    : size === ModalSize.LG
                      ? '70vh height, 2xl width'
                      : size === ModalSize.XL
                        ? '95vh height, 6xl width'
                        : '95vh height, responsive width'}
              </p>
            </Container>
          </Modal>
        ))}
      </Container>
    );
  },
};
