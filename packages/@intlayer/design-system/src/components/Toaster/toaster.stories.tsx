import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, within } from '@storybook/test';
import { RefreshCw, Trash2, Upload, X } from 'lucide-react';
import { useState } from 'react';

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
actions, and automatic state management. It's built on Radix UI primitives with full 
accessibility support and smooth animations.

## Key Features
- **Multiple Variants**: Default, success, and error notifications
- **Interactive Actions**: Buttons for user actions (retry, undo, view details)
- **Auto-dismiss**: Configurable timeout with manual dismiss options
- **Accessibility**: Full ARIA support and keyboard navigation
- **Queue Management**: Handles multiple toasts with proper stacking
- **Animations**: Smooth slide-in/out with hardware acceleration
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
      <div className="w-full max-w-2xl mx-auto bg-white rounded-lg border p-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Toast Variants</h2>
        </div>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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

          <div className="text-sm text-gray-600 mt-4">
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
            <ToastAction
              altText="Retry upload"
              onClick={() => simulateUpload()}
              color="white"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
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
            altText="Undo delete"
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
      <div className="w-full max-w-2xl mx-auto bg-white rounded-lg border p-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Interactive Actions</h2>
        </div>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

          <div className="text-sm text-gray-600 mt-4">
            <strong>Actions Demo:</strong>
            <ul className="list-disc list-inside mt-2 space-y-1">
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

    const handleFormSubmit = (e: React.FormEvent) => {
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
          action: (
            <ToastAction altText="View profile">View Profile</ToastAction>
          ),
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
          <ToastAction
            altText="Retry connection"
            onClick={() => simulateNetworkError()}
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Retry
          </ToastAction>
        ),
      });
    };

    return (
      <div className="w-full max-w-2xl mx-auto bg-white rounded-lg border p-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Real-World Scenarios</h2>
        </div>
        <div className="space-y-6">
          {/* Form Example */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Form Validation</h3>
            <form onSubmit={handleFormSubmit} className="space-y-3">
              <div>
                <label className="block text-sm font-medium mb-1">Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, name: e.target.value }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, email: e.target.value }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
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
