import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';
import { useState } from 'react';
import '../../tailwind.css';
import { Button, ButtonColor, ButtonVariant } from '../Button';
import { RightDrawer } from './RightDrawer';
import { useRightDrawerStore } from './useRightDrawerStore';

/**
 * RightDrawer Component Stories
 *
 * The RightDrawer component is a slide-out panel that appears from the right side of the screen,
 * providing an overlay for secondary content, forms, navigation, or detailed views. It features
 * responsive design, state management, and configurable behavior patterns.
 *
 * ## Key Features
 * - **Responsive Design**: Adapts from full-width mobile to fixed 400px desktop drawer
 * - **State Management**: Zustand store for managing multiple drawer instances simultaneously
 * - **Flexible Controls**: Both controlled (props) and uncontrolled (store) usage patterns
 * - **Accessibility**: Focus management, keyboard navigation, and screen reader support
 * - **Click Outside**: Configurable auto-close behavior when clicking outside the drawer
 * - **Scroll Management**: Automatic body scroll blocking to prevent background scrolling
 *
 * ## When to Use
 * - Navigation menus and mobile sidebars
 * - Detail panels and information displays
 * - Forms and multi-step workflows
 * - Shopping carts and checkout processes
 * - User profiles and settings interfaces
 * - Secondary content that shouldn't interrupt main workflow
 */
const meta = {
  title: 'Components/RightDrawer',
  component: RightDrawer,
  parameters: {
    docs: {
      description: {
        component: `
A comprehensive slide-out drawer component for displaying secondary content and interfaces.

### Accessibility Features:
- **Keyboard Navigation**: Escape key closes drawer, Tab navigation within content
- **Focus Management**: Automatic focus trapping when drawer is open
- **Screen Readers**: Proper ARIA labels and state announcements
- **Touch Support**: Mobile-optimized touch interactions and gestures

### Responsive Behavior:
- **Desktop**: Fixed 400px width with backdrop overlay
- **Mobile**: Full-width drawer with tap-outside-to-close functionality
- **Smooth Transitions**: CSS-powered animations for open/close states

### State Management Patterns:
- **Store-based**: Use \`useRightDrawerStore\` for global drawer state management
- **Controlled**: Override with \`isOpen\` prop for local component state control
- **Multi-instance**: Support for multiple simultaneous drawers with unique identifiers
        `,
      },
    },
    layout: 'fullscreen',
    a11y: {
      config: {
        rules: [
          {
            id: 'color-contrast',
            enabled: true,
          },
          {
            id: 'keyboard-navigation',
            enabled: true,
          },
        ],
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    identifier: {
      description: 'Unique identifier for drawer instance in store management',
      control: 'text',
    },
    title: {
      description: 'Title displayed in the drawer header',
      control: 'text',
    },
    closeOnOutsideClick: {
      description: 'Whether clicking outside should close the drawer',
      control: 'boolean',
    },
    children: {
      description: 'Content to display inside the drawer',
      control: false,
    },
    header: {
      description: 'Optional header content below the title',
      control: false,
    },
    backButton: {
      description: 'Configuration for optional back button',
      control: false,
    },
    isOpen: {
      description: 'External control for open state (overrides store)',
      control: 'boolean',
    },
    onClose: {
      description: 'Callback when drawer is closed',
      action: 'drawer closed',
    },
  },
} satisfies Meta<typeof RightDrawer>;

export default meta;
type Story = StoryObj<typeof RightDrawer>;

/**
 * ## Basic Examples
 *
 * These stories demonstrate the core functionality and common usage patterns of the RightDrawer.
 */

/**
 * ### Default Behavior
 *
 * Basic drawer with title and content. Uses store management for open/close state.
 * Try clicking outside the drawer to close it.
 */
export const Default: Story = {
  args: {
    identifier: 'demo-default',
    title: 'Default Drawer',
    closeOnOutsideClick: true,
  },
  render: (args) => {
    const { open } = useRightDrawerStore();

    return (
      <div className="min-h-screen bg-background text-text">
        <div className="p-6">
          <button
            data-testid="open-drawer"
            className="rounded bg-primary px-6 py-3 text-white shadow-md transition-colors hover:bg-primary/90"
            onClick={() => open(args.identifier)}
          >
            Open Default Drawer
          </button>

          <div className="mt-6 space-y-4 text-gray-600 text-sm">
            <p>• Click the button above to open the drawer</p>
            <p>• Click outside the drawer to close it</p>
            <p>• Use the X button in the header to close</p>
          </div>
        </div>

        <RightDrawer {...args}>
          <div className="space-y-6 p-6">
            <div>
              <h3 className="mb-3 font-semibold text-lg">Drawer Content</h3>
              <p className="text-gray-600">
                This is the main content area of the drawer. It can contain any
                React elements, forms, navigation, or other interactive content.
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="font-medium">Features Demonstrated:</h4>
              <ul className="list-inside list-disc space-y-1 text-gray-600 text-sm">
                <li>Responsive design (try resizing the window)</li>
                <li>Click outside to close behavior</li>
                <li>Store-based state management</li>
                <li>Smooth open/close animations</li>
                <li>Scroll management and body blocking</li>
              </ul>
            </div>
          </div>
        </RightDrawer>
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const openButton = canvas.getByTestId('open-drawer');

    // Test that open button is accessible
    await expect(openButton).toBeInTheDocument();
    await expect(openButton).toHaveAccessibleName(/open default drawer/i);
  },
};

/**
 * ### Enhanced Drawer with Back Button
 *
 * Example showing a drawer with back button functionality and additional header content.
 * Demonstrates navigation patterns and complex header layouts.
 */
export const WithBackButton: Story = {
  args: {
    identifier: 'demo-back-button',
    title: 'Detail View',
    backButton: {
      text: 'Back to List',
      onBack: () => console.log('Back button clicked'),
    },
    header: (
      <div className="px-6 text-gray-600 text-sm">
        <div className="flex items-center justify-between">
          <span>Last updated: 2 hours ago</span>
          <span className="rounded-full bg-green-100 px-2 py-1 text-green-800 text-xs">
            Active
          </span>
        </div>
      </div>
    ),
  },
  render: (args) => {
    const { open } = useRightDrawerStore();

    return (
      <div className="min-h-screen bg-background text-text">
        <div className="p-6">
          <button
            data-testid="open-back-drawer"
            className="rounded bg-blue-600 px-6 py-3 text-white shadow-md transition-colors hover:bg-blue-700"
            onClick={() => open(args.identifier)}
          >
            Open Detail Drawer
          </button>

          <div className="mt-6 space-y-4 text-gray-600 text-sm">
            <p>• This drawer demonstrates back button functionality</p>
            <p>• Header includes additional metadata and status</p>
            <p>• Common pattern for detail/edit views</p>
          </div>
        </div>

        <RightDrawer {...args}>
          <div className="space-y-6 p-6">
            <div>
              <h3 className="mb-3 font-semibold text-lg">Product Details</h3>
              <div className="space-y-3 rounded-lg bg-gray-50 p-4">
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="font-medium">SKU:</span>
                    <span className="ml-2 text-gray-600">PRD-001</span>
                  </div>
                  <div>
                    <span className="font-medium">Stock:</span>
                    <span className="ml-2 text-gray-600">24 units</span>
                  </div>
                  <div>
                    <span className="font-medium">Price:</span>
                    <span className="ml-2 text-gray-600">$29.99</span>
                  </div>
                  <div>
                    <span className="font-medium">Category:</span>
                    <span className="ml-2 text-gray-600">Electronics</span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="mb-2 font-medium">Description</h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                A high-quality electronic device with advanced features and
                modern design. Perfect for both professional and personal use
                with excellent performance characteristics and reliable
                operation.
              </p>
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                variant={ButtonVariant.HOVERABLE}
                color={ButtonColor.PRIMARY}
                label="Edit Product"
              >
                Edit Product
              </Button>
              <Button
                variant={ButtonVariant.HOVERABLE}
                color={ButtonColor.TEXT}
                label="View History"
              >
                View History
              </Button>
            </div>
          </div>
        </RightDrawer>
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const openButton = canvas.getByTestId('open-back-drawer');

    await expect(openButton).toBeInTheDocument();
    await expect(openButton).toHaveAccessibleName(/open detail drawer/i);
  },
};

/**
 * ## State Management
 *
 * Stories demonstrating different state management patterns and controlled behavior.
 */

/**
 * ### Controlled Drawer
 *
 * Example showing external state control where the parent component manages
 * the open/closed state instead of relying on the internal store.
 */
export const Controlled: Story = {
  args: {
    identifier: 'controlled-drawer',
    title: 'Controlled State Example',
  },
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);
    const [submitCount, setSubmitCount] = useState(0);

    const handleSubmit = () => {
      setSubmitCount((prev) => prev + 1);
      setIsOpen(false);
    };

    return (
      <div className="min-h-screen bg-background text-text">
        <div className="p-6">
          <div className="space-y-4">
            <button
              data-testid="open-controlled"
              className="rounded bg-purple-600 px-6 py-3 text-white shadow-md transition-colors hover:bg-purple-700"
              onClick={() => setIsOpen(true)}
            >
              Open Controlled Drawer
            </button>

            <div className="text-gray-600 text-sm">
              <p>
                Form submissions: <strong>{submitCount}</strong>
              </p>
              <p>
                Drawer state: <strong>{isOpen ? 'Open' : 'Closed'}</strong>
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-4 text-gray-600 text-sm">
            <p>• This drawer uses controlled state via props</p>
            <p>• Parent component manages open/close state</p>
            <p>• Useful for forms and validation workflows</p>
          </div>
        </div>

        <RightDrawer {...args} isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <div className="space-y-6 p-6">
            <div>
              <h3 className="mb-3 font-semibold text-lg">Contact Form</h3>
              <p className="text-gray-600 text-sm">
                This form demonstrates controlled drawer behavior with external
                state management.
              </p>
            </div>

            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
            >
              <div>
                <label className="mb-2 block font-medium text-sm">Name</label>
                <input
                  type="text"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                  placeholder="Enter your name"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block font-medium text-sm">Email</label>
                <input
                  type="email"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block font-medium text-sm">
                  Message
                </label>
                <textarea
                  className="min-h-[80px] w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                  placeholder="Enter your message"
                  required
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="rounded-md bg-purple-600 px-4 py-2 text-sm text-white transition-colors hover:bg-purple-700"
                >
                  Submit Form
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="rounded-md bg-gray-300 px-4 py-2 text-gray-700 text-sm transition-colors hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </RightDrawer>
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const openButton = canvas.getByTestId('open-controlled');

    await expect(openButton).toBeInTheDocument();

    // Test opening the drawer
    await userEvent.click(openButton);
    // The drawer should now be visible but we can't easily test this in stories
    // due to the portal-like behavior
  },
};

/**
 * ### Persistent Drawer (No Outside Close)
 *
 * Example showing a drawer that doesn't close when clicking outside,
 * requiring explicit close action. Useful for important forms or processes.
 */
export const NoOutsideClose: Story = {
  args: {
    identifier: 'no-outside-close',
    title: 'Important Settings',
    closeOnOutsideClick: false,
  },
  render: (args) => {
    const { open } = useRightDrawerStore();

    return (
      <div className="min-h-screen bg-background text-text">
        <div className="p-6">
          <button
            data-testid="open-persistent"
            className="rounded bg-red-600 px-6 py-3 text-white shadow-md transition-colors hover:bg-red-700"
            onClick={() => open(args.identifier)}
          >
            Open Persistent Drawer
          </button>

          <div className="mt-6 space-y-4 text-gray-600 text-sm">
            <p>• This drawer requires explicit close action</p>
            <p>• Clicking outside will not close it</p>
            <p>• Use the X button or complete the process</p>
            <p>• Ideal for critical forms or multi-step processes</p>
          </div>
        </div>

        <RightDrawer {...args}>
          <div className="space-y-6 p-6">
            <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
              <div className="flex items-start gap-3">
                <div className="text-amber-500">⚠️</div>
                <div>
                  <h3 className="font-medium text-amber-800">
                    Important Notice
                  </h3>
                  <p className="mt-1 text-amber-700 text-sm">
                    This drawer cannot be closed by clicking outside. Please
                    complete the process or use the close button.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="mb-3 font-semibold text-lg">
                System Configuration
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="mb-2 block font-medium text-sm">
                    API Endpoint
                  </label>
                  <input
                    type="url"
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                    placeholder="https://api.example.com"
                    defaultValue="https://api.production.com"
                  />
                </div>

                <div>
                  <label className="mb-2 block font-medium text-sm">
                    Timeout (seconds)
                  </label>
                  <input
                    type="number"
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                    placeholder="30"
                    defaultValue="30"
                    min="1"
                    max="300"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <input type="checkbox" id="debug-mode" className="rounded" />
                  <label htmlFor="debug-mode" className="text-sm">
                    Enable debug mode (affects performance)
                  </label>
                </div>
              </div>
            </div>

            <div className="flex gap-3 border-gray-200 border-t pt-4">
              <button className="rounded-md bg-green-600 px-4 py-2 text-sm text-white transition-colors hover:bg-green-700">
                Save Configuration
              </button>
              <button className="rounded-md bg-gray-300 px-4 py-2 text-gray-700 text-sm transition-colors hover:bg-gray-400">
                Reset to Defaults
              </button>
            </div>
          </div>
        </RightDrawer>
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const openButton = canvas.getByTestId('open-persistent');

    await expect(openButton).toBeInTheDocument();
    await expect(openButton).toHaveAccessibleName(/open persistent drawer/i);
  },
};

/**
 * ## Advanced Examples
 *
 * Stories showing complex real-world usage patterns and advanced functionality.
 */

/**
 * ### Multi-Drawer Management
 *
 * Example demonstrating how multiple drawers can be managed simultaneously
 * using different identifiers in the store.
 */
export const MultipleDrawers: Story = {
  render: () => {
    const { open, close, isOpen } = useRightDrawerStore();

    return (
      <div className="min-h-screen bg-background text-text">
        <div className="p-6">
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <button
                data-testid="open-navigation"
                className="rounded bg-blue-600 px-4 py-3 text-white transition-colors hover:bg-blue-700"
                onClick={() => open('navigation')}
              >
                Open Navigation
              </button>
              <button
                data-testid="open-settings"
                className="rounded bg-green-600 px-4 py-3 text-white transition-colors hover:bg-green-700"
                onClick={() => open('settings')}
              >
                Open Settings
              </button>
              <button
                data-testid="open-help"
                className="rounded bg-purple-600 px-4 py-3 text-white transition-colors hover:bg-purple-700"
                onClick={() => open('help')}
              >
                Open Help
              </button>
            </div>

            <div className="mt-6 text-gray-600 text-sm">
              <h4 className="mb-2 font-medium">Drawer States:</h4>
              <ul className="space-y-1">
                <li>
                  Navigation:{' '}
                  <strong>{isOpen('navigation') ? 'Open' : 'Closed'}</strong>
                </li>
                <li>
                  Settings:{' '}
                  <strong>{isOpen('settings') ? 'Open' : 'Closed'}</strong>
                </li>
                <li>
                  Help: <strong>{isOpen('help') ? 'Open' : 'Closed'}</strong>
                </li>
              </ul>
            </div>

            <button
              className="rounded bg-red-500 px-4 py-2 text-sm text-white transition-colors hover:bg-red-600"
              onClick={() => {
                close('navigation');
                close('settings');
                close('help');
              }}
            >
              Close All Drawers
            </button>
          </div>
        </div>

        {/* Navigation Drawer */}
        <RightDrawer identifier="navigation" title="Navigation Menu">
          <nav className="space-y-3 p-6">
            <a
              href="#"
              className="block rounded px-3 py-2 transition-colors hover:bg-gray-100"
            >
              Dashboard
            </a>
            <a
              href="#"
              className="block rounded px-3 py-2 transition-colors hover:bg-gray-100"
            >
              Projects
            </a>
            <a
              href="#"
              className="block rounded px-3 py-2 transition-colors hover:bg-gray-100"
            >
              Team
            </a>
            <a
              href="#"
              className="block rounded px-3 py-2 transition-colors hover:bg-gray-100"
            >
              Analytics
            </a>
          </nav>
        </RightDrawer>

        {/* Settings Drawer */}
        <RightDrawer identifier="settings" title="Settings">
          <div className="space-y-6 p-6">
            <div>
              <h3 className="mb-3 font-medium">Appearance</h3>
              <div className="space-y-2">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="theme"
                    value="light"
                    defaultChecked
                  />
                  <span className="text-sm">Light theme</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="radio" name="theme" value="dark" />
                  <span className="text-sm">Dark theme</span>
                </label>
              </div>
            </div>

            <div>
              <h3 className="mb-3 font-medium">Notifications</h3>
              <div className="space-y-2">
                <label className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked />
                  <span className="text-sm">Email notifications</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" />
                  <span className="text-sm">Push notifications</span>
                </label>
              </div>
            </div>
          </div>
        </RightDrawer>

        {/* Help Drawer */}
        <RightDrawer identifier="help" title="Help & Support">
          <div className="space-y-6 p-6">
            <div>
              <h3 className="mb-3 font-medium">Frequently Asked Questions</h3>
              <div className="space-y-3">
                <details className="rounded-md border border-gray-200">
                  <summary className="cursor-pointer p-3 text-sm hover:bg-gray-50">
                    How do I reset my password?
                  </summary>
                  <div className="p-3 pt-0 text-gray-600 text-sm">
                    You can reset your password by clicking the "Forgot
                    Password" link on the login page.
                  </div>
                </details>

                <details className="rounded-md border border-gray-200">
                  <summary className="cursor-pointer p-3 text-sm hover:bg-gray-50">
                    How do I change my email address?
                  </summary>
                  <div className="p-3 pt-0 text-gray-600 text-sm">
                    Go to Settings → Account → Email Address to update your
                    email.
                  </div>
                </details>
              </div>
            </div>

            <div>
              <h3 className="mb-3 font-medium">Contact Support</h3>
              <p className="text-gray-600 text-sm">
                Need more help? Reach out to our support team at
                support@example.com
              </p>
            </div>
          </div>
        </RightDrawer>
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const navButton = canvas.getByTestId('open-navigation');
    const settingsButton = canvas.getByTestId('open-settings');
    const helpButton = canvas.getByTestId('open-help');

    await expect(navButton).toBeInTheDocument();
    await expect(settingsButton).toBeInTheDocument();
    await expect(helpButton).toBeInTheDocument();
  },
};
