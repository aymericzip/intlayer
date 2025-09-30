import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';
import { ChevronDown, Menu, Settings, User } from 'lucide-react';
import { useState } from 'react';
import { DropDown, DropDownAlign } from './';

/**
 * DropDown Component Stories
 *
 * The DropDown component provides a flexible dropdown/popover solution with multiple trigger mechanisms.
 * It's composed of a container, trigger, and panel that work together to create accessible dropdown interfaces.
 * Perfect for menus, selectors, tooltips, and other overlay content.
 *
 * ## Key Features
 * - **Multiple Trigger Methods**: Hover, focus, and controlled visibility
 * - **Flexible Positioning**: Start and end alignment options
 * - **Accessibility**: Full ARIA support with keyboard navigation and screen reader compatibility
 * - **Smooth Animations**: Animated show/hide transitions with MaxHeightSmoother
 * - **Compound Pattern**: Clean API with DropDown.Trigger and DropDown.Panel sub-components
 *
 * ## When to Use
 * - Navigation menus and submenus
 * - User account/profile menus
 * - Action menus and context menus
 * - Language/locale selectors
 * - Settings and preferences panels
 * - Tooltips and info popovers
 */
const meta = {
  title: 'Components/DropDown',
  component: DropDown,
  parameters: {
    docs: {
      description: {
        component: `
A compound component that provides dropdown functionality with flexible trigger mechanisms and accessibility features.

### Component Architecture:
- **DropDown**: Container component that manages the dropdown context
- **DropDown.Trigger**: Button element that triggers the dropdown panel
- **DropDown.Panel**: Content area that appears when triggered

### Trigger Methods:
- **Hover (isOverable)**: Panel appears on mouse hover - great for quick access
- **Focus (isFocusable)**: Panel appears when trigger receives focus - essential for accessibility
- **Controlled (isHidden)**: Panel visibility controlled externally - for complex state management

### Accessibility Features:
- **Keyboard Navigation**: Full Tab, Enter, and Space key support
- **Screen Readers**: Proper ARIA labels, roles, and state announcements
- **Focus Management**: Maintains proper focus flow and visible indicators
- **State Announcements**: Dynamic ARIA attributes that announce dropdown state
- **Semantic HTML**: Uses proper button and region roles with associated labels

### Positioning Options:
- **Start Aligned**: Panel aligns to the start (left in LTR) of the trigger
- **End Aligned**: Panel aligns to the end (right in LTR) of the trigger
- **Responsive**: Works correctly in different text directions (LTR/RTL)
        `,
      },
    },
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
          {
            id: 'aria-attributes',
            enabled: true,
          },
        ],
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    identifier: {
      description:
        'Unique identifier linking trigger and panel for accessibility',
      control: 'text',
    },
    className: {
      description: 'Additional CSS classes for the dropdown container',
      control: 'text',
    },
    children: {
      description: 'Trigger and Panel components',
      control: false,
    },
  },
} satisfies Meta<typeof DropDown>;

export default meta;
type Story = StoryObj<typeof DropDown>;

/**
 * ## Basic Examples
 *
 * These stories demonstrate the core functionality of the DropDown component
 * with different trigger methods and configurations.
 */

/**
 * ### Default Hover Dropdown
 *
 * The most common dropdown pattern - shows content on hover for quick access.
 * Ideal for navigation menus and quick actions.
 */
export const Default: Story = {
  args: {
    identifier: 'default-dropdown',
    className: 'w-48',
  },
  render: (args) => (
    <div className="flex justify-center p-8">
      <DropDown {...args}>
        <DropDown.Trigger identifier={args.identifier}>
          <div className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
            <Menu size={16} />
            <span>Hover Menu</span>
            <ChevronDown size={16} />
          </div>
        </DropDown.Trigger>
        <DropDown.Panel
          identifier={args.identifier}
          isOverable
          className="bg-white border border-gray-200 rounded-lg shadow-lg"
        >
          <div className="p-2">
            <div className="px-3 py-2 text-gray-700 hover:bg-gray-100 rounded cursor-pointer">
              Profile
            </div>
            <div className="px-3 py-2 text-gray-700 hover:bg-gray-100 rounded cursor-pointer">
              Settings
            </div>
            <div className="px-3 py-2 text-gray-700 hover:bg-gray-100 rounded cursor-pointer">
              Help
            </div>
            <hr className="my-1 border-gray-200" />
            <div className="px-3 py-2 text-red-600 hover:bg-red-50 rounded cursor-pointer">
              Sign Out
            </div>
          </div>
        </DropDown.Panel>
      </DropDown>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole('button', { name: /hover menu/i });

    // Test initial state
    await expect(trigger).toBeInTheDocument();
    await expect(trigger).toHaveAttribute('aria-haspopup', 'true');
    await expect(trigger).toHaveAttribute(
      'aria-controls',
      'dropdown-panel-default-dropdown'
    );

    // Test hover interaction
    await userEvent.hover(trigger);

    // Wait for panel to appear
    await new Promise((resolve) => setTimeout(resolve, 200));

    // Panel should be visible in DOM but might be animating
    const panel = canvas.getByRole('region');
    await expect(panel).toBeInTheDocument();
  },
};

/**
 * ### Focus-Accessible Dropdown
 *
 * Keyboard-accessible dropdown that appears when the trigger receives focus.
 * Essential for accessibility and keyboard-only users.
 */
export const FocusAccessible: Story = {
  args: {
    identifier: 'focus-dropdown',
    className: 'w-48',
  },
  render: (args) => (
    <div className="flex justify-center p-8">
      <DropDown {...args}>
        <DropDown.Trigger identifier={args.identifier}>
          <div className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:ring-2 focus:ring-green-300 transition-colors">
            <User size={16} />
            <span>Focus to Open</span>
            <ChevronDown size={16} />
          </div>
        </DropDown.Trigger>
        <DropDown.Panel
          identifier={args.identifier}
          isFocusable
          className="bg-white border border-gray-200 rounded-lg shadow-lg"
        >
          <div className="p-2">
            <div className="px-3 py-2 text-gray-700 hover:bg-gray-100 rounded cursor-pointer">
              Account Settings
            </div>
            <div className="px-3 py-2 text-gray-700 hover:bg-gray-100 rounded cursor-pointer">
              Billing
            </div>
            <div className="px-3 py-2 text-gray-700 hover:bg-gray-100 rounded cursor-pointer">
              Privacy
            </div>
          </div>
        </DropDown.Panel>
      </DropDown>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole('button', { name: /focus to open/i });

    // Test keyboard focus
    await userEvent.tab();
    await expect(trigger).toHaveFocus();

    // Panel should become visible when trigger is focused
    await new Promise((resolve) => setTimeout(resolve, 200));

    const panel = canvas.getByRole('region');
    await expect(panel).toBeInTheDocument();
  },
};

/**
 * ### Controlled Dropdown
 *
 * Externally controlled dropdown where visibility is managed by parent component state.
 * Useful for complex interactions and state management.
 */
export const ControlledDropdown: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className="flex flex-col items-center gap-4 p-8">
        <div className="flex gap-2">
          <button
            onClick={() => setIsOpen(true)}
            className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
          >
            Open
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="px-3 py-1 bg-gray-500 text-white rounded text-sm hover:bg-gray-600"
          >
            Close
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="px-3 py-1 bg-purple-500 text-white rounded text-sm hover:bg-purple-600"
          >
            Toggle
          </button>
        </div>

        <DropDown identifier="controlled-dropdown" className="w-48">
          <DropDown.Trigger identifier="controlled-dropdown">
            <div className="flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded">
              <Settings size={16} />
              <span>Controlled Menu</span>
              <ChevronDown
                size={16}
                className={isOpen ? 'rotate-180' : 'rotate-0'}
              />
            </div>
          </DropDown.Trigger>
          <DropDown.Panel
            identifier="controlled-dropdown"
            isHidden={!isOpen}
            className="bg-white border border-gray-200 rounded-lg shadow-lg"
          >
            <div className="p-2">
              <div className="px-3 py-2 text-gray-700">
                Status: {isOpen ? 'Open' : 'Closed'}
              </div>
              <div className="px-3 py-2 text-gray-700 hover:bg-gray-100 rounded cursor-pointer">
                Option 1
              </div>
              <div className="px-3 py-2 text-gray-700 hover:bg-gray-100 rounded cursor-pointer">
                Option 2
              </div>
            </div>
          </DropDown.Panel>
        </DropDown>
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const openButton = canvas.getByRole('button', { name: 'Open' });
    const closeButton = canvas.getByRole('button', { name: 'Close' });
    const toggleButton = canvas.getByRole('button', { name: 'Toggle' });

    // Test controlled opening
    await userEvent.click(openButton);
    await new Promise((resolve) => setTimeout(resolve, 200));

    const panel = canvas.getByRole('region');
    await expect(panel).toBeInTheDocument();

    // Test controlled closing
    await userEvent.click(closeButton);
    await new Promise((resolve) => setTimeout(resolve, 200));

    // Test toggle
    await userEvent.click(toggleButton);
    await new Promise((resolve) => setTimeout(resolve, 200));
  },
};

/**
 * ## Positioning and Alignment
 *
 * Stories demonstrating different positioning options for the dropdown panel.
 */

/**
 * ### Alignment Options
 *
 * Shows both start (left) and end (right) alignment options side by side.
 */
export const AlignmentOptions: Story = {
  render: () => (
    <div className="flex justify-between items-start p-8 gap-4">
      {/* Start Aligned */}
      <DropDown identifier="start-aligned" className="w-48">
        <DropDown.Trigger identifier="start-aligned">
          <div className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            <span>Start Aligned</span>
            <ChevronDown size={16} />
          </div>
        </DropDown.Trigger>
        <DropDown.Panel
          identifier="start-aligned"
          isOverable
          align={DropDownAlign.START}
          className="bg-white border border-gray-200 rounded-lg shadow-lg"
        >
          <div className="p-3 min-w-48">
            <div className="text-sm text-gray-600 mb-2">
              Start aligned panel
            </div>
            <div className="px-3 py-2 text-gray-700 hover:bg-gray-100 rounded">
              Option 1
            </div>
            <div className="px-3 py-2 text-gray-700 hover:bg-gray-100 rounded">
              Option 2
            </div>
          </div>
        </DropDown.Panel>
      </DropDown>

      {/* End Aligned */}
      <DropDown identifier="end-aligned" className="w-48">
        <DropDown.Trigger identifier="end-aligned">
          <div className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
            <span>End Aligned</span>
            <ChevronDown size={16} />
          </div>
        </DropDown.Trigger>
        <DropDown.Panel
          identifier="end-aligned"
          isOverable
          align={DropDownAlign.END}
          className="bg-white border border-gray-200 rounded-lg shadow-lg"
        >
          <div className="p-3 min-w-48">
            <div className="text-sm text-gray-600 mb-2">End aligned panel</div>
            <div className="px-3 py-2 text-gray-700 hover:bg-gray-100 rounded">
              Option A
            </div>
            <div className="px-3 py-2 text-gray-700 hover:bg-gray-100 rounded">
              Option B
            </div>
          </div>
        </DropDown.Panel>
      </DropDown>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const startButton = canvas.getByRole('button', { name: /start aligned/i });
    const endButton = canvas.getByRole('button', { name: /end aligned/i });

    // Test both alignment options
    await userEvent.hover(startButton);
    await new Promise((resolve) => setTimeout(resolve, 200));

    await userEvent.hover(endButton);
    await new Promise((resolve) => setTimeout(resolve, 200));
  },
};

/**
 * ## Interactive States and Behaviors
 *
 * Stories showing different interaction patterns and combined behaviors.
 */

/**
 * ### Combined Hover and Focus
 *
 * Dropdown that responds to both hover and focus for maximum accessibility.
 * Works for both mouse and keyboard users.
 */
export const CombinedInteractions: Story = {
  args: {
    identifier: 'combined-dropdown',
  },
  render: (args) => (
    <div className="flex justify-center p-8">
      <DropDown {...args}>
        <DropDown.Trigger identifier={args.identifier}>
          <div className="flex items-center gap-2 px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600 focus:ring-2 focus:ring-indigo-300 transition-all">
            <User size={16} />
            <span>Hover or Focus</span>
            <ChevronDown size={16} />
          </div>
        </DropDown.Trigger>
        <DropDown.Panel
          identifier={args.identifier}
          isOverable
          isFocusable
          className="bg-white border border-gray-200 rounded-lg shadow-lg"
        >
          <div className="p-2">
            <div className="px-3 py-2 text-gray-700 font-medium border-b border-gray-100 mb-1">
              User Account
            </div>
            <div className="px-3 py-2 text-gray-700 hover:bg-gray-100 rounded cursor-pointer">
              View Profile
            </div>
            <div className="px-3 py-2 text-gray-700 hover:bg-gray-100 rounded cursor-pointer">
              Edit Profile
            </div>
            <div className="px-3 py-2 text-gray-700 hover:bg-gray-100 rounded cursor-pointer">
              Account Settings
            </div>
            <hr className="my-1 border-gray-200" />
            <div className="px-3 py-2 text-red-600 hover:bg-red-50 rounded cursor-pointer">
              Log Out
            </div>
          </div>
        </DropDown.Panel>
      </DropDown>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole('button', { name: /hover or focus/i });

    // Test hover
    await userEvent.hover(trigger);
    await new Promise((resolve) => setTimeout(resolve, 200));

    let panel = canvas.getByRole('region');
    await expect(panel).toBeInTheDocument();

    // Test unhover
    await userEvent.unhover(trigger);
    await new Promise((resolve) => setTimeout(resolve, 200));

    // Test focus
    await userEvent.click(trigger);
    await expect(trigger).toHaveFocus();

    await new Promise((resolve) => setTimeout(resolve, 200));
    panel = canvas.getByRole('region');
    await expect(panel).toBeInTheDocument();
  },
};

/**
 * ## Accessibility Testing
 *
 * Stories specifically designed to test and demonstrate accessibility features.
 */

/**
 * ### Keyboard Navigation
 *
 * Demonstrates proper keyboard navigation through multiple dropdowns.
 * Tests Tab navigation, Enter/Space activation, and focus management.
 */
export const KeyboardNavigation: Story = {
  render: () => (
    <div className="space-y-4 p-8">
      <div className="text-sm text-gray-600 mb-4">
        Use Tab to navigate between dropdowns, Enter or Space to activate them.
        Focus should show the dropdown content automatically.
      </div>

      <div className="flex flex-wrap gap-4">
        <DropDown identifier="kbd-nav-1" className="w-32">
          <DropDown.Trigger identifier="kbd-nav-1">
            <div className="px-3 py-2 bg-blue-500 text-white rounded text-sm focus:ring-2 focus:ring-blue-300">
              Menu 1
            </div>
          </DropDown.Trigger>
          <DropDown.Panel
            identifier="kbd-nav-1"
            isFocusable
            className="bg-white border border-gray-200 rounded shadow-lg"
          >
            <div className="p-2 text-sm">
              <div className="px-2 py-1 hover:bg-gray-100 rounded">Item 1</div>
              <div className="px-2 py-1 hover:bg-gray-100 rounded">Item 2</div>
            </div>
          </DropDown.Panel>
        </DropDown>

        <DropDown identifier="kbd-nav-2" className="w-32">
          <DropDown.Trigger identifier="kbd-nav-2">
            <div className="px-3 py-2 bg-green-500 text-white rounded text-sm focus:ring-2 focus:ring-green-300">
              Menu 2
            </div>
          </DropDown.Trigger>
          <DropDown.Panel
            identifier="kbd-nav-2"
            isFocusable
            className="bg-white border border-gray-200 rounded shadow-lg"
          >
            <div className="p-2 text-sm">
              <div className="px-2 py-1 hover:bg-gray-100 rounded">
                Action A
              </div>
              <div className="px-2 py-1 hover:bg-gray-100 rounded">
                Action B
              </div>
            </div>
          </DropDown.Panel>
        </DropDown>

        <DropDown identifier="kbd-nav-3" className="w-32">
          <DropDown.Trigger identifier="kbd-nav-3">
            <div className="px-3 py-2 bg-purple-500 text-white rounded text-sm focus:ring-2 focus:ring-purple-300">
              Menu 3
            </div>
          </DropDown.Trigger>
          <DropDown.Panel
            identifier="kbd-nav-3"
            isFocusable
            className="bg-white border border-gray-200 rounded shadow-lg"
          >
            <div className="p-2 text-sm">
              <div className="px-2 py-1 hover:bg-gray-100 rounded">
                Option X
              </div>
              <div className="px-2 py-1 hover:bg-gray-100 rounded">
                Option Y
              </div>
            </div>
          </DropDown.Panel>
        </DropDown>
      </div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const buttons = canvas.getAllByRole('button');

    // Test tab navigation
    await userEvent.tab();
    await expect(buttons[0]).toHaveFocus();

    // Panel should be visible due to focus
    await new Promise((resolve) => setTimeout(resolve, 200));
    let panels = canvas.getAllByRole('region');
    await expect(panels[0]).toBeInTheDocument();

    // Continue tabbing
    await userEvent.tab();
    await expect(buttons[1]).toHaveFocus();

    await new Promise((resolve) => setTimeout(resolve, 200));
    panels = canvas.getAllByRole('region');
    await expect(panels).toHaveLength(1); // Only focused panel should be visible

    await userEvent.tab();
    await expect(buttons[2]).toHaveFocus();
  },
};

/**
 * ### ARIA Attributes
 *
 * Demonstrates proper ARIA attribute usage for screen reader compatibility.
 */
export const ARIAAttributes: Story = {
  render: () => (
    <div className="space-y-6 p-8">
      <div className="text-sm text-gray-600 mb-4">
        Each dropdown has proper ARIA attributes for screen reader
        compatibility. Inspect the DOM to see aria-haspopup, aria-controls,
        aria-labelledby, etc.
      </div>

      <div className="space-y-4">
        <DropDown identifier="aria-menu" className="w-48">
          <DropDown.Trigger identifier="aria-menu" label="User account menu">
            <div className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
              <User size={16} />
              <span>Account Menu</span>
              <ChevronDown size={16} />
            </div>
          </DropDown.Trigger>
          <DropDown.Panel
            identifier="aria-menu"
            isFocusable
            className="bg-white border border-gray-200 rounded-lg shadow-lg"
          >
            <div className="p-2">
              <div className="px-3 py-2 text-gray-700 hover:bg-gray-100 rounded">
                Profile
              </div>
              <div className="px-3 py-2 text-gray-700 hover:bg-gray-100 rounded">
                Settings
              </div>
            </div>
          </DropDown.Panel>
        </DropDown>

        <DropDown identifier="aria-actions" className="w-48">
          <DropDown.Trigger
            identifier="aria-actions"
            label="Available actions menu"
          >
            <div className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
              <Settings size={16} />
              <span>Actions</span>
              <ChevronDown size={16} />
            </div>
          </DropDown.Trigger>
          <DropDown.Panel
            identifier="aria-actions"
            isOverable
            className="bg-white border border-gray-200 rounded-lg shadow-lg"
          >
            <div className="p-2">
              <div className="px-3 py-2 text-gray-700 hover:bg-gray-100 rounded">
                Edit
              </div>
              <div className="px-3 py-2 text-gray-700 hover:bg-gray-100 rounded">
                Delete
              </div>
            </div>
          </DropDown.Panel>
        </DropDown>
      </div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const triggers = canvas.getAllByRole('button');

    // Test ARIA attributes
    for (const trigger of triggers) {
      await expect(trigger).toHaveAttribute('aria-haspopup', 'true');
      await expect(trigger).toHaveAttribute('aria-controls');
      await expect(trigger).toHaveAccessibleName();
    }

    // Test panel ARIA attributes
    const firstTrigger = triggers[0];
    await userEvent.click(firstTrigger);
    await expect(firstTrigger).toHaveFocus();

    await new Promise((resolve) => setTimeout(resolve, 200));
    const panel = canvas.getByRole('region');
    await expect(panel).toHaveAttribute('aria-labelledby');
    await expect(panel).toHaveAttribute('id');
  },
};

/**
 * ## Real-World Examples
 *
 * Practical examples showing how the component would be used in real applications.
 */

/**
 * ### Navigation Menu
 *
 * Example of a navigation dropdown menu with multiple sections and actions.
 */
export const NavigationMenu: Story = {
  render: () => (
    <div className="bg-gray-50 min-h-24">
      <nav className="bg-white border-b border-gray-200 px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="font-bold text-xl text-gray-900">Brand</div>
            <div className="hidden md:flex items-center gap-4">
              <a href="#" className="text-gray-700 hover:text-gray-900">
                Home
              </a>
              <a href="#" className="text-gray-700 hover:text-gray-900">
                About
              </a>
              <a href="#" className="text-gray-700 hover:text-gray-900">
                Services
              </a>
            </div>
          </div>

          <DropDown identifier="user-nav" className="relative">
            <DropDown.Trigger identifier="user-nav">
              <div className="flex items-center gap-2 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                  JD
                </div>
                <span className="hidden sm:block">John Doe</span>
                <ChevronDown size={16} />
              </div>
            </DropDown.Trigger>
            <DropDown.Panel
              identifier="user-nav"
              isOverable
              isFocusable
              align={DropDownAlign.END}
              className="bg-white border border-gray-200 rounded-lg shadow-lg min-w-48"
            >
              <div className="p-2">
                <div className="px-3 py-2 border-b border-gray-100 mb-1">
                  <div className="font-medium text-gray-900">John Doe</div>
                  <div className="text-sm text-gray-500">john@example.com</div>
                </div>
                <div className="px-3 py-2 text-gray-700 hover:bg-gray-100 rounded cursor-pointer flex items-center gap-2">
                  <User size={16} />
                  Profile
                </div>
                <div className="px-3 py-2 text-gray-700 hover:bg-gray-100 rounded cursor-pointer flex items-center gap-2">
                  <Settings size={16} />
                  Settings
                </div>
                <hr className="my-1 border-gray-200" />
                <div className="px-3 py-2 text-red-600 hover:bg-red-50 rounded cursor-pointer">
                  Sign Out
                </div>
              </div>
            </DropDown.Panel>
          </DropDown>
        </div>
      </nav>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const userButton = canvas.getByRole('button');

    // Test navigation menu interaction
    await userEvent.hover(userButton);
    await new Promise((resolve) => setTimeout(resolve, 200));

    const panel = canvas.getByRole('region');
    await expect(panel).toBeInTheDocument();

    // Check if user info is displayed
    await expect(canvas.getByText('john@example.com')).toBeInTheDocument();
  },
};

/**
 * ### Context Menu
 *
 * Example of a context menu dropdown with various actions and keyboard shortcuts.
 */
export const ContextMenu: Story = {
  render: () => (
    <div className="p-8">
      <div className="bg-gray-100 border border-gray-300 rounded-lg p-6 relative">
        <h3 className="text-lg font-medium mb-2">Document.pdf</h3>
        <p className="text-gray-600 text-sm mb-4">Last modified: 2 hours ago</p>

        <div className="absolute top-2 right-2">
          <DropDown identifier="context-menu">
            <DropDown.Trigger identifier="context-menu">
              <div className="p-2 text-gray-500 hover:bg-gray-200 rounded-lg transition-colors">
                <Menu size={16} />
              </div>
            </DropDown.Trigger>
            <DropDown.Panel
              identifier="context-menu"
              isOverable
              isFocusable
              align={DropDownAlign.END}
              className="bg-white border border-gray-200 rounded-lg shadow-lg min-w-48"
            >
              <div className="p-1">
                <div className="px-3 py-2 text-gray-700 hover:bg-gray-100 rounded cursor-pointer flex items-center justify-between">
                  <span>Open</span>
                  <span className="text-xs text-gray-400">⌘O</span>
                </div>
                <div className="px-3 py-2 text-gray-700 hover:bg-gray-100 rounded cursor-pointer flex items-center justify-between">
                  <span>Download</span>
                  <span className="text-xs text-gray-400">⌘D</span>
                </div>
                <div className="px-3 py-2 text-gray-700 hover:bg-gray-100 rounded cursor-pointer flex items-center justify-between">
                  <span>Rename</span>
                  <span className="text-xs text-gray-400">F2</span>
                </div>
                <div className="px-3 py-2 text-gray-700 hover:bg-gray-100 rounded cursor-pointer">
                  Make a copy
                </div>
                <hr className="my-1 border-gray-200" />
                <div className="px-3 py-2 text-gray-700 hover:bg-gray-100 rounded cursor-pointer">
                  Share
                </div>
                <div className="px-3 py-2 text-gray-700 hover:bg-gray-100 rounded cursor-pointer">
                  Move to folder
                </div>
                <hr className="my-1 border-gray-200" />
                <div className="px-3 py-2 text-red-600 hover:bg-red-50 rounded cursor-pointer flex items-center justify-between">
                  <span>Delete</span>
                  <span className="text-xs text-red-400">⌫</span>
                </div>
              </div>
            </DropDown.Panel>
          </DropDown>
        </div>
      </div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const menuButton = canvas.getByRole('button');

    // Test context menu
    await userEvent.hover(menuButton);
    await new Promise((resolve) => setTimeout(resolve, 200));

    const panel = canvas.getByRole('region');
    await expect(panel).toBeInTheDocument();

    // Check if keyboard shortcuts are displayed
    await expect(canvas.getByText('⌘O')).toBeInTheDocument();
    await expect(canvas.getByText('⌘D')).toBeInTheDocument();
  },
};
