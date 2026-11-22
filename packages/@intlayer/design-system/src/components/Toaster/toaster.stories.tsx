import type { Meta, StoryObj } from '@storybook/react';
import { RefreshCw, Trash2, Upload, X } from 'lucide-react';
import { useState } from 'react';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import { Button } from '../Button';
import { ToastAction } from './Toast';
import { Toaster } from './Toaster';
import { useToast } from './useToast';

const meta: Meta<typeof Toaster> = {
  title: 'Components/Toaster',
  component: Toaster,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
The Toaster component provides a comprehensive notification system with multiple variants, 
actions, and automatic state management. It's built on local primitives with full 
accessibility support and smooth animations.

## Key Features
- **Multiple Variants**: Default, success, and error notifications
- **Interactive Actions**: Buttons for user actions (retry, undo, view details)
- **Auto-dismiss**: Configurable timeout with manual dismiss options
- **Accessibility**: Full ARIA support and keyboard navigation
- **Stacking**: Up to 3 toasts; older ones collapse behind the newest and
  spread out on hover. A 4th toast dismisses the oldest
- **Animations**: Slide in from the anchored edge (top on mobile, bottom-end
  from \`sm\`), fade out to the right; disabled with reduced motion
        `,
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ minHeight: '100vh', padding: '2rem' }}>
        <Story />
        <Toaster />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Toaster>;

/**
 * Interactive demo showing all toast variants with different content configurations.
 * Test each variant to see the different styling and icon treatments.
 */
export const AllVariants: Story = {
  render: () => {
    const { toast } = useToast();

    return (
      <div className="mx-auto w-full max-w-2xl rounded-lg border bg-white p-6">
        <div className="mb-6">
          <h2 className="mb-2 text-xl font-semibold">Toast Variants</h2>
        </div>
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <Button
              label="Show default notification"
              onClick={() =>
                toast({
                  title: 'Information',
                  description:
                    'This is a default notification with useful information.',
                })
              }
              variant="outline"
            >
              Default Toast
            </Button>

            <Button
              label="Show success notification"
              onClick={() =>
                toast({
                  title: 'Success!',
                  description: 'Your action was completed successfully.',
                  variant: 'success',
                })
              }
              variant="outline"
              className="border-green-300 text-green-700"
            >
              Success Toast
            </Button>

            <Button
              label="Show error notification"
              onClick={() =>
                toast({
                  title: 'Error Occurred',
                  description: 'Something went wrong. Please try again.',
                  variant: 'error',
                })
              }
              variant="outline"
              className="border-red-300 text-red-700"
            >
              Error Toast
            </Button>
          </div>

          <div className="mt-4 text-sm text-gray-600">
            Click any button to see the corresponding toast variant. Each
            variant has distinct styling to communicate the appropriate message
            tone.
          </div>
        </div>
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test default toast
    const defaultButton = canvas.getByText('Default Toast');
    await userEvent.click(defaultButton);

    // Verify toast appears (with a small delay for animation)
    await new Promise((resolve) => setTimeout(resolve, 100));

    // Test success toast
    const successButton = canvas.getByText('Success Toast');
    await userEvent.click(successButton, {
      delay: 500,
    });

    // Test error toast
    const errorButton = canvas.getByText('Error Toast');
    await userEvent.click(errorButton, {
      delay: 500,
    });
  },
};

/**
 * Demonstrates toasts with interactive actions like retry, undo, and view details.
 * Actions provide users with immediate ways to respond to notifications.
 */
export const WithActions: Story = {
  render: () => {
    const { toast } = useToast();
    const [uploadStatus, setUploadStatus] = useState<
      'idle' | 'uploading' | 'success' | 'error'
    >('idle');
    const [deleteStatus, setDeleteStatus] = useState<'idle' | 'deleted'>(
      'idle'
    );

    const simulateUpload = () => {
      setUploadStatus('uploading');
      toast({
        title: 'Uploading...',
        description: 'Your file is being uploaded.',
      });

      // Simulate upload failure
      setTimeout(() => {
        setUploadStatus('error');
        toast({
          title: 'Upload Failed',
          description: 'Could not upload file. Connection timeout.',
          variant: 'error',
          action: (
            <ToastAction onClick={() => simulateUpload()} color="white">
              <RefreshCw className="me-2 h-4 w-4" />
              Retry
            </ToastAction>
          ),
        });
      }, 2000);
    };

    const simulateDelete = () => {
      setDeleteStatus('deleted');
      const undoTimer = setTimeout(() => {
        // Permanent delete after 5 seconds
        toast({
          title: 'File Deleted',
          description: 'The file has been permanently deleted.',
          variant: 'success',
        });
      }, 5000);

      toast({
        title: 'File Moved to Trash',
        description: 'Your file will be permanently deleted in 5 seconds.',
        action: (
          <ToastAction
            onClick={() => {
              clearTimeout(undoTimer);
              setDeleteStatus('idle');
              toast({
                title: 'Deletion Cancelled',
                description: 'Your file has been restored.',
                variant: 'success',
              });
            }}
          >
            Undo
          </ToastAction>
        ),
      });
    };

    return (
      <div className="mx-auto w-full max-w-2xl rounded-lg border bg-white p-6">
        <div className="mb-6">
          <h2 className="mb-2 text-xl font-semibold">Interactive Actions</h2>
        </div>
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Button
              label="Upload a file and see retry action on failure"
              onClick={simulateUpload}
              disabled={uploadStatus === 'uploading'}
              variant="outline"
              Icon={Upload}
            >
              {uploadStatus === 'uploading' ? 'Uploading...' : 'Upload File'}
            </Button>

            <Button
              label="Delete a file and see undo action"
              onClick={simulateDelete}
              disabled={deleteStatus === 'deleted'}
              variant="outline"
              className="border-red-300 text-red-700"
              Icon={Trash2}
            >
              Delete File
            </Button>
          </div>

          <div className="mt-4 text-sm text-gray-600">
            <strong>Actions Demo:</strong>
            <ul className="mt-2 list-inside list-disc space-y-1">
              <li>
                <strong>Upload:</strong> Shows retry action on failure
              </li>
              <li>
                <strong>Delete:</strong> Shows undo action with countdown
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test upload with retry action
    const uploadButton = canvas.getByText('Upload File');
    await userEvent.click(uploadButton);

    // Wait for upload to "fail" and retry button to appear
    await new Promise((resolve) => setTimeout(resolve, 2500));

    // Test delete with undo action
    const deleteButton = canvas.getByText('Delete File');
    await userEvent.click(deleteButton);

    // Wait a moment to see the undo toast appear
    await new Promise((resolve) => setTimeout(resolve, 500));
  },
};

/**
 * Real-world scenarios demonstrating common use cases like form validation,
 * API responses, and user workflows with appropriate toast implementations.
 */
export const RealWorldScenarios: Story = {
  render: () => {
    const { toast } = useToast();
    const [formData, setFormData] = useState({ name: '', email: '' });
    const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>(
      'idle'
    );

    const handleFormSubmit = (e: React.SubmitEvent) => {
      e.preventDefault();

      if (!formData.name || !formData.email) {
        toast({
          title: 'Validation Error',
          description: 'Please fill in all required fields.',
          variant: 'error',
        });
        return;
      }

      setSaveStatus('saving');
      toast({
        title: 'Saving...',
        description: 'Your profile is being updated.',
      });

      // Simulate API call
      setTimeout(() => {
        setSaveStatus('saved');
        toast({
          title: 'Profile Saved',
          description: 'Your changes have been saved successfully.',
          variant: 'success',
          action: <ToastAction>View Profile</ToastAction>,
        });
      }, 2000);
    };

    const simulateNetworkError = () => {
      toast({
        title: 'Connection Error',
        description:
          'Unable to connect to server. Check your internet connection.',
        variant: 'error',
        action: (
          <ToastAction onClick={() => simulateNetworkError()}>
            <RefreshCw className="me-2 h-4 w-4" />
            Retry
          </ToastAction>
        ),
      });
    };

    return (
      <div className="mx-auto w-full max-w-2xl rounded-lg border bg-white p-6">
        <div className="mb-6">
          <h2 className="mb-2 text-xl font-semibold">Real-World Scenarios</h2>
        </div>
        <div className="space-y-6">
          {/* Form Example */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Form Validation</h3>
            <form onSubmit={handleFormSubmit} className="space-y-3">
              <div>
                <label
                  htmlFor="toaster-name"
                  className="mb-1 block text-sm font-medium"
                >
                  Name *
                </label>
                <input
                  id="toaster-name"
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, name: e.target.value }))
                  }
                  className="w-full rounded-md border border-gray-300 px-3 py-2"
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <label
                  htmlFor="toaster-email"
                  className="mb-1 block text-sm font-medium"
                >
                  Email *
                </label>
                <input
                  id="toaster-email"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, email: e.target.value }))
                  }
                  className="w-full rounded-md border border-gray-300 px-3 py-2"
                  placeholder="Enter your email"
                />
              </div>
              <Button
                label="Save user profile with validation"
                type="submit"
                disabled={saveStatus === 'saving'}
                className="w-full"
              >
                {saveStatus === 'saving' ? 'Saving...' : 'Save Profile'}
              </Button>
            </form>
          </div>

          {/* Error Scenarios */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Error Handling</h3>
            <Button
              label="Simulate network connection error"
              onClick={simulateNetworkError}
              variant="outline"
              className="border-red-300 text-red-700"
              Icon={X}
            >
              Network Error
            </Button>
          </div>
        </div>
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test form validation
    const saveButton = canvas.getByText('Save Profile');
    await userEvent.click(saveButton);

    // Wait for validation error toast
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Fill form and submit
    const nameInput = canvas.getByPlaceholderText('Enter your name');
    const emailInput = canvas.getByPlaceholderText('Enter your email');

    await userEvent.type(nameInput, 'John Doe');
    await userEvent.type(emailInput, 'john@example.com');
    await userEvent.click(saveButton);
  },
};

/** Waits for a toast exit transition (400ms) to finish. */
const waitForTransition = () =>
  new Promise((resolve) => setTimeout(resolve, 600));

/**
 * Several toasts stack: the newest in front, older ones collapsed behind it.
 * Hovering the stack spreads it out and pauses the timers. Resize the
 * viewport below `sm` to see the stack anchored at the top.
 */
export const Stacking: Story = {
  render: () => {
    const { toast, dismiss } = useToast();
    const [toastCount, setToastCount] = useState(0);

    const showToast = (description: string) => {
      const toastNumber = toastCount + 1;
      setToastCount(toastNumber);
      toast({
        title: `Notification ${toastNumber}`,
        description,
        variant: toastNumber % 3 === 0 ? 'success' : 'default',
      });
    };

    return (
      <div className="mx-auto w-full max-w-2xl rounded-lg border bg-white p-6">
        <h2 className="mb-6 text-xl font-semibold">Stacking</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Button
            label="Show a short toast"
            onClick={() => showToast('A short message.')}
            variant="outline"
          >
            Short toast
          </Button>
          <Button
            label="Show a long toast"
            onClick={() =>
              showToast(
                'A longer message that wraps over several lines, to check that the collapsed toasts take the height of the front one and that the expanded stack spaces toasts by their own height.'
              )
            }
            variant="outline"
          >
            Long toast
          </Button>
          <Button
            label="Dismiss every toast"
            onClick={() => dismiss()}
            variant="outline"
            className="border-red-300 text-red-700"
          >
            Dismiss all
          </Button>
        </div>
        <p className="mt-4 text-sm text-gray-600">
          Add a few toasts, then hover the stack to spread it out. Swipe a toast
          to the right to dismiss it.
        </p>
      </div>
    );
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const viewport = canvas.getByRole('list', { name: 'Notifications' });
    const getOpenToasts = () =>
      viewport.querySelectorAll<HTMLLIElement>('li[data-state="open"]');

    await userEvent.click(canvas.getByText('Dismiss all'));
    await waitForTransition();

    await step('Stacks the newest toast in front', async () => {
      await userEvent.click(canvas.getByText('Short toast'));
      await userEvent.click(canvas.getByText('Long toast'));
      await userEvent.click(canvas.getByText('Short toast'));

      await waitFor(() => expect(getOpenToasts()).toHaveLength(3));

      const frontToast = getOpenToasts().item(0);
      const middleToast = getOpenToasts().item(1);
      await expect(frontToast).not.toHaveAttribute('data-collapsed');
      await expect(middleToast).toHaveAttribute('data-collapsed');
      // Collapsed toasts borrow the front toast's height.
      await waitFor(() =>
        expect(middleToast.offsetHeight).toBe(frontToast.offsetHeight)
      );
    });

    await step('Spreads out while hovered', async () => {
      await userEvent.hover(viewport);

      await waitFor(() => expect(viewport).toHaveAttribute('data-expanded'));
      await expect(getOpenToasts().item(1)).not.toHaveAttribute(
        'data-collapsed'
      );

      await userEvent.unhover(viewport);
      await waitFor(() =>
        expect(viewport).not.toHaveAttribute('data-expanded')
      );
    });

    await step('Dismisses the oldest past three toasts', async () => {
      await userEvent.click(canvas.getByText('Short toast'));

      await waitFor(() => expect(getOpenToasts()).toHaveLength(3));
      const openTitles = [...getOpenToasts()].map((toast) => toast.textContent);
      await expect(openTitles.join()).not.toContain('Notification 1');
    });

    await step('Animates out when dismissed', async () => {
      await userEvent.click(canvas.getByText('Dismiss all'));

      await expect(getOpenToasts()).toHaveLength(0);
      await waitFor(() =>
        expect(viewport.querySelectorAll('li')).toHaveLength(0)
      );
    });

    // Leave a stack on screen to inspect, added slowly enough to watch it enter.
    await step('Leaves a stack to inspect', async () => {
      for (const buttonText of ['Long toast', 'Short toast', 'Short toast']) {
        await userEvent.click(canvas.getByText(buttonText));
        await waitForTransition();
      }

      await expect(getOpenToasts()).toHaveLength(3);
    });
  },
};
