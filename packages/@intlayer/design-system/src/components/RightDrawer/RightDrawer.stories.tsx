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
            className="rounded bg-primary px-6 py-3 text-white shadow-md hover:bg-primary/90 transition-colors"
            onClick={() => open(args.identifier)}
          >
            Open Default Drawer
          </button>

          <div className="mt-6 space-y-4 text-sm text-gray-600">
            <p>• Click the button above to open the drawer</p>
            <p>• Click outside the drawer to close it</p>
            <p>• Use the X button in the header to close</p>
          </div>
        </div>

        <RightDrawer {...args}>
          <div className="space-y-6 p-6">
            <div>
              <h3 className="text-lg font-semibold mb-3">Drawer Content</h3>
              <p className="text-gray-600">
                This is the main content area of the drawer. It can contain any
                React elements, forms, navigation, or other interactive content.
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="font-medium">Features Demonstrated:</h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
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
      <div className="px-6 text-sm text-gray-600">
        <div className="flex justify-between items-center">
          <span>Last updated: 2 hours ago</span>
          <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
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
            className="rounded bg-blue-600 px-6 py-3 text-white shadow-md hover:bg-blue-700 transition-colors"
            onClick={() => open(args.identifier)}
          >
            Open Detail Drawer
          </button>

          <div className="mt-6 space-y-4 text-sm text-gray-600">
            <p>• This drawer demonstrates back button functionality</p>
            <p>• Header includes additional metadata and status</p>
            <p>• Common pattern for detail/edit views</p>
          </div>
        </div>

        <RightDrawer {...args}>
          <div className="space-y-6 p-6">
            <div>
              <h3 className="text-lg font-semibold mb-3">Product Details</h3>
              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
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
              <h4 className="font-medium mb-2">Description</h4>
              <p className="text-sm text-gray-600 leading-relaxed">
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
              className="rounded bg-purple-600 px-6 py-3 text-white shadow-md hover:bg-purple-700 transition-colors"
              onClick={() => setIsOpen(true)}
            >
              Open Controlled Drawer
            </button>

            <div className="text-sm text-gray-600">
              <p>
                Form submissions: <strong>{submitCount}</strong>
              </p>
              <p>
                Drawer state: <strong>{isOpen ? 'Open' : 'Closed'}</strong>
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-4 text-sm text-gray-600">
            <p>• This drawer uses controlled state via props</p>
            <p>• Parent component manages open/close state</p>
            <p>• Useful for forms and validation workflows</p>
          </div>
        </div>

        <RightDrawer {...args} isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <div className="space-y-6 p-6">
            <div>
              <h3 className="text-lg font-semibold mb-3">Contact Form</h3>
              <p className="text-sm text-gray-600">
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
                <label className="block text-sm font-medium mb-2">Name</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                  placeholder="Enter your name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Message
                </label>
                <textarea
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm min-h-[80px]"
                  placeholder="Enter your message"
                  required
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="bg-purple-600 text-white px-4 py-2 rounded-md text-sm hover:bg-purple-700 transition-colors"
                >
                  Submit Form
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md text-sm hover:bg-gray-400 transition-colors"
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
            className="rounded bg-red-600 px-6 py-3 text-white shadow-md hover:bg-red-700 transition-colors"
            onClick={() => open(args.identifier)}
          >
            Open Persistent Drawer
          </button>

          <div className="mt-6 space-y-4 text-sm text-gray-600">
            <p>• This drawer requires explicit close action</p>
            <p>• Clicking outside will not close it</p>
            <p>• Use the X button or complete the process</p>
            <p>• Ideal for critical forms or multi-step processes</p>
          </div>
        </div>

        <RightDrawer {...args}>
          <div className="space-y-6 p-6">
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <div className="text-amber-500">⚠️</div>
                <div>
                  <h3 className="font-medium text-amber-800">
                    Important Notice
                  </h3>
                  <p className="text-sm text-amber-700 mt-1">
                    This drawer cannot be closed by clicking outside. Please
                    complete the process or use the close button.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">
                System Configuration
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    API Endpoint
                  </label>
                  <input
                    type="url"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                    placeholder="https://api.example.com"
                    defaultValue="https://api.production.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Timeout (seconds)
                  </label>
                  <input
                    type="number"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
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

            <div className="flex gap-3 pt-4 border-t border-gray-200">
              <button className="bg-green-600 text-white px-4 py-2 rounded-md text-sm hover:bg-green-700 transition-colors">
                Save Configuration
              </button>
              <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md text-sm hover:bg-gray-400 transition-colors">
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button
                data-testid="open-navigation"
                className="rounded bg-blue-600 px-4 py-3 text-white hover:bg-blue-700 transition-colors"
                onClick={() => open('navigation')}
              >
                Open Navigation
              </button>
              <button
                data-testid="open-settings"
                className="rounded bg-green-600 px-4 py-3 text-white hover:bg-green-700 transition-colors"
                onClick={() => open('settings')}
              >
                Open Settings
              </button>
              <button
                data-testid="open-help"
                className="rounded bg-purple-600 px-4 py-3 text-white hover:bg-purple-700 transition-colors"
                onClick={() => open('help')}
              >
                Open Help
              </button>
            </div>

            <div className="mt-6 text-sm text-gray-600">
              <h4 className="font-medium mb-2">Drawer States:</h4>
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
              className="rounded bg-red-500 px-4 py-2 text-white text-sm hover:bg-red-600 transition-colors"
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
          <nav className="p-6 space-y-3">
            <a
              href="#"
              className="block py-2 px-3 rounded hover:bg-gray-100 transition-colors"
            >
              Dashboard
            </a>
            <a
              href="#"
              className="block py-2 px-3 rounded hover:bg-gray-100 transition-colors"
            >
              Projects
            </a>
            <a
              href="#"
              className="block py-2 px-3 rounded hover:bg-gray-100 transition-colors"
            >
              Team
            </a>
            <a
              href="#"
              className="block py-2 px-3 rounded hover:bg-gray-100 transition-colors"
            >
              Analytics
            </a>
          </nav>
        </RightDrawer>

        {/* Settings Drawer */}
        <RightDrawer identifier="settings" title="Settings">
          <div className="p-6 space-y-6">
            <div>
              <h3 className="font-medium mb-3">Appearance</h3>
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
              <h3 className="font-medium mb-3">Notifications</h3>
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
          <div className="p-6 space-y-6">
            <div>
              <h3 className="font-medium mb-3">Frequently Asked Questions</h3>
              <div className="space-y-3">
                <details className="border border-gray-200 rounded-md">
                  <summary className="p-3 cursor-pointer hover:bg-gray-50 text-sm">
                    How do I reset my password?
                  </summary>
                  <div className="p-3 pt-0 text-sm text-gray-600">
                    You can reset your password by clicking the "Forgot
                    Password" link on the login page.
                  </div>
                </details>

                <details className="border border-gray-200 rounded-md">
                  <summary className="p-3 cursor-pointer hover:bg-gray-50 text-sm">
                    How do I change my email address?
                  </summary>
                  <div className="p-3 pt-0 text-sm text-gray-600">
                    Go to Settings → Account → Email Address to update your
                    email.
                  </div>
                </details>
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-3">Contact Support</h3>
              <p className="text-sm text-gray-600">
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
