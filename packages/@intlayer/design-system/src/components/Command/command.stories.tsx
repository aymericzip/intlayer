import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';
import {
  Calculator,
  Calendar,
  CreditCard,
  FileText,
  Home,
  Mail,
  MessageSquare,
  Plus,
  Search,
  Settings,
  Smile,
  User,
} from 'lucide-react';
import { useState } from 'react';
import { Command, CommandRoot } from './index';

/**
 * Command Component Stories
 *
 * The Command component is a composable command palette built on top of cmdk and Radix UI.
 * It provides a searchable interface for executing commands and displaying structured data.
 *
 * ## Key Features
 * - **Searchable**: Built-in search functionality with fuzzy matching
 * - **Keyboard Navigation**: Full arrow key and enter support
 * - **Composable**: Multiple sub-components for flexible layouts
 * - **Dialog Mode**: Can be used as a modal dialog
 * - **Grouping**: Organize commands into logical groups
 * - **Accessibility**: ARIA compliant with screen reader support
 * - **Shortcuts**: Display keyboard shortcuts for commands
 *
 * ## Sub-components
 * - `Command` (Root): Container for the entire command palette
 * - `Command.Dialog`: Modal dialog wrapper
 * - `Command.Input`: Search input with icon
 * - `Command.List`: Scrollable list container
 * - `Command.Group`: Grouped section with optional heading
 * - `Command.Item`: Individual command items
 * - `Command.Empty`: Placeholder when no results found
 * - `Command.Separator`: Visual separator between groups
 * - `Command.Shortcut`: Keyboard shortcut display
 *
 * ## When to Use
 * - Application command palettes (Cmd+K interfaces)
 * - Search interfaces with structured data
 * - Quick action menus
 * - Autocomplete dropdowns
 * - Modal command selection interfaces
 */
const meta = {
  title: 'Components/Command',
  component: CommandRoot,
  parameters: {
    docs: {
      description: {
        component: `
A powerful command palette component for creating searchable interfaces with keyboard navigation.
Built with accessibility in mind and supporting both standalone and modal dialog modes.

### Usage Examples
- Global command palette (triggered by Cmd+K)
- Search-driven navigation menus
- Quick action selection
- Autocomplete interfaces
- File/document selection
        `,
      },
    },
    layout: 'centered',
    backgrounds: {
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'dark', value: '#1a1a1a' },
        { name: 'neutral', value: '#f8f9fa' },
      ],
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
            id: 'focus-order-semantics',
            enabled: true,
          },
        ],
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    className: {
      description: 'Additional CSS classes for styling customization',
      control: 'text',
    },
  },
} satisfies Meta<typeof CommandRoot>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * ## Basic Examples
 *
 * These stories demonstrate the core functionality and various configurations
 * of the Command component.
 */

/**
 * ### Default Command Palette
 *
 * A basic command palette with search input and grouped commands.
 * Demonstrates the standard layout with icons, shortcuts, and organization.
 */
export const Default: Story = {
  render: () => (
    <div className="w-96 border rounded-lg shadow-lg">
      <CommandRoot>
        <Command.Input placeholder="Type a command or search..." />
        <Command.List>
          <Command.Empty>No results found.</Command.Empty>

          <Command.Group heading="Suggestions">
            <Command.Item>
              <Calendar className="mr-2 h-4 w-4" />
              <span>Calendar</span>
            </Command.Item>
            <Command.Item>
              <Smile className="mr-2 h-4 w-4" />
              <span>Search Emoji</span>
            </Command.Item>
            <Command.Item>
              <Calculator className="mr-2 h-4 w-4" />
              <span>Calculator</span>
            </Command.Item>
          </Command.Group>

          <Command.Separator />

          <Command.Group heading="Settings">
            <Command.Item>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
              <Command.Shortcut>⌘P</Command.Shortcut>
            </Command.Item>
            <Command.Item>
              <CreditCard className="mr-2 h-4 w-4" />
              <span>Billing</span>
              <Command.Shortcut>⌘B</Command.Shortcut>
            </Command.Item>
            <Command.Item>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
              <Command.Shortcut>⌘S</Command.Shortcut>
            </Command.Item>
          </Command.Group>
        </Command.List>
      </CommandRoot>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const searchInput = canvas.getByPlaceholderText(
      'Type a command or search...'
    );

    // Verify input is focusable and accessible
    await expect(searchInput).toBeInTheDocument();
    await expect(searchInput).not.toBeDisabled();

    // Test search functionality
    await userEvent.click(searchInput);
    await userEvent.type(searchInput, 'cal');

    // Verify filtered results appear
    const calendarItem = canvas.getByText('Calendar');
    await expect(calendarItem).toBeVisible();

    // Test keyboard navigation
    await userEvent.keyboard('{ArrowDown}');
    await userEvent.keyboard('{Enter}');
  },
};

/**
 * ### Dialog Mode
 *
 * Command palette displayed as a modal dialog, commonly triggered by
 * keyboard shortcuts like Cmd+K in applications.
 */
export const DialogMode: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <div>
        <button
          onClick={() => setOpen(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded border"
        >
          Trigger Command Palette (Dialog)
        </button>

        <Command.Dialog open={open} onOpenChange={setOpen}>
          <Command.Input placeholder="Type a command or search..." />
          <Command.List>
            <Command.Empty>No results found.</Command.Empty>

            <Command.Group heading="Quick Actions">
              <Command.Item>
                <FileText className="mr-2 h-4 w-4" />
                <span>New Document</span>
                <Command.Shortcut>⌘N</Command.Shortcut>
              </Command.Item>
              <Command.Item>
                <Plus className="mr-2 h-4 w-4" />
                <span>Create Project</span>
                <Command.Shortcut>⌘Shift+N</Command.Shortcut>
              </Command.Item>
            </Command.Group>

            <Command.Separator />

            <Command.Group heading="Navigation">
              <Command.Item>
                <Home className="mr-2 h-4 w-4" />
                <span>Go to Dashboard</span>
                <Command.Shortcut>⌘D</Command.Shortcut>
              </Command.Item>
              <Command.Item>
                <Mail className="mr-2 h-4 w-4" />
                <span>Open Inbox</span>
                <Command.Shortcut>⌘I</Command.Shortcut>
              </Command.Item>
              <Command.Item>
                <MessageSquare className="mr-2 h-4 w-4" />
                <span>Messages</span>
                <Command.Shortcut>⌘M</Command.Shortcut>
              </Command.Item>
            </Command.Group>
          </Command.List>
        </Command.Dialog>
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    // Open the dialog

    const canvas = within(canvasElement);
    const triggerButton = canvas.getByText('Trigger Command Palette (Dialog)');
    await userEvent.click(triggerButton);

    await expect(triggerButton).toBeInTheDocument();

    // Dialog should be open by default in this story
    const searchInput = canvas.getByPlaceholderText(
      'Type a command or search...'
    );
    await expect(searchInput).toBeInTheDocument();

    // Test search within dialog
    await userEvent.type(searchInput, 'new');
    const newDocItem = canvas.getByText('New Document');
    await expect(newDocItem).toBeVisible();
  },
};

/**
 * ### Empty State
 *
 * Demonstrates the command palette when no commands match the search query.
 * Shows the customizable empty state message.
 */
export const EmptyState: Story = {
  render: () => (
    <div className="w-96 border rounded-lg shadow-lg">
      <CommandRoot>
        <Command.Input placeholder="Search for something that doesn't exist..." />
        <Command.List>
          <Command.Empty>
            <div className="text-center py-6">
              <Search className="mx-auto h-8 w-8 text-gray-400 mb-2" />
              <p className="text-sm text-gray-500">No commands found.</p>
              <p className="text-xs text-gray-400 mt-1">
                Try searching for calendar, settings, or profile.
              </p>
            </div>
          </Command.Empty>

          <Command.Group heading="Available Commands">
            <Command.Item>
              <Calendar className="mr-2 h-4 w-4" />
              <span>Calendar</span>
            </Command.Item>
            <Command.Item>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </Command.Item>
            <Command.Item>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </Command.Item>
          </Command.Group>
        </Command.List>
      </CommandRoot>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const searchInput = canvas.getByPlaceholderText(/Search for something/);

    // Search for something that won't match
    await userEvent.type(searchInput, 'nonexistent');

    // Verify empty state is shown
    const emptyMessage = canvas.getByText('No commands found.');
    await expect(emptyMessage).toBeVisible();

    // Clear search to show available commands
    await userEvent.clear(searchInput);
    const calendarItem = canvas.getByText('Calendar');
    await expect(calendarItem).toBeVisible();
  },
};

/**
 * ### Simple List
 *
 * A minimal command palette without groups or separators,
 * showing just a simple list of commands.
 */
export const SimpleList: Story = {
  render: () => (
    <div className="w-80 border rounded-lg shadow-lg">
      <CommandRoot>
        <Command.Input placeholder="Search commands..." />
        <Command.List>
          <Command.Empty>No results found.</Command.Empty>

          <Command.Item>
            <Calendar className="mr-2 h-4 w-4" />
            <span>Open Calendar</span>
          </Command.Item>
          <Command.Item>
            <Mail className="mr-2 h-4 w-4" />
            <span>Check Email</span>
          </Command.Item>
          <Command.Item>
            <FileText className="mr-2 h-4 w-4" />
            <span>New Document</span>
          </Command.Item>
          <Command.Item>
            <Settings className="mr-2 h-4 w-4" />
            <span>Open Settings</span>
          </Command.Item>
          <Command.Item>
            <User className="mr-2 h-4 w-4" />
            <span>View Profile</span>
          </Command.Item>
        </Command.List>
      </CommandRoot>
    </div>
  ),
};

/**
 * ### With Keyboard Shortcuts
 *
 * Showcases commands with keyboard shortcut indicators,
 * commonly used in application command palettes.
 */
export const WithShortcuts: Story = {
  render: () => (
    <div className="w-96 border rounded-lg shadow-lg">
      <CommandRoot>
        <Command.Input placeholder="Type a command..." />
        <Command.List>
          <Command.Empty>No results found.</Command.Empty>

          <Command.Group heading="File">
            <Command.Item>
              <FileText className="mr-2 h-4 w-4" />
              <span>New File</span>
              <Command.Shortcut>⌘N</Command.Shortcut>
            </Command.Item>
            <Command.Item>
              <span>Open File</span>
              <Command.Shortcut>⌘O</Command.Shortcut>
            </Command.Item>
            <Command.Item>
              <span>Save File</span>
              <Command.Shortcut>⌘S</Command.Shortcut>
            </Command.Item>
          </Command.Group>

          <Command.Separator />

          <Command.Group heading="Edit">
            <Command.Item>
              <span>Copy</span>
              <Command.Shortcut>⌘C</Command.Shortcut>
            </Command.Item>
            <Command.Item>
              <span>Paste</span>
              <Command.Shortcut>⌘V</Command.Shortcut>
            </Command.Item>
            <Command.Item>
              <span>Select All</span>
              <Command.Shortcut>⌘A</Command.Shortcut>
            </Command.Item>
          </Command.Group>

          <Command.Separator />

          <Command.Group heading="View">
            <Command.Item>
              <span>Toggle Sidebar</span>
              <Command.Shortcut>⌘B</Command.Shortcut>
            </Command.Item>
            <Command.Item>
              <span>Zoom In</span>
              <Command.Shortcut>⌘+</Command.Shortcut>
            </Command.Item>
            <Command.Item>
              <span>Zoom Out</span>
              <Command.Shortcut>⌘-</Command.Shortcut>
            </Command.Item>
          </Command.Group>
        </Command.List>
      </CommandRoot>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify shortcuts are displayed
    const newFileShortcut = canvas.getByText('⌘N');
    await expect(newFileShortcut).toBeVisible();

    const copyShortcut = canvas.getByText('⌘C');
    await expect(copyShortcut).toBeVisible();

    // Test search filtering
    const searchInput = canvas.getByPlaceholderText('Type a command...');
    await userEvent.type(searchInput, 'file');

    // Should show file-related commands
    const newFileItem = canvas.getByText('New File');
    await expect(newFileItem).toBeVisible();
  },
};

/**
 * ### Accessibility Testing
 *
 * Story focused on testing keyboard navigation, screen reader support,
 * and other accessibility features of the command palette.
 */
export const AccessibilityTest: Story = {
  render: () => (
    <div className="w-96 border rounded-lg shadow-lg">
      <CommandRoot>
        <Command.Input
          placeholder="Search commands..."
          aria-label="Command palette search"
        />
        <Command.List role="listbox" aria-label="Command options">
          <Command.Empty>No commands match your search.</Command.Empty>

          <Command.Group
            heading="Actions"
            role="group"
            aria-labelledby="actions-heading"
          >
            <Command.Item role="option" aria-describedby="calendar-desc">
              <Calendar className="mr-2 h-4 w-4" />
              <span>Open Calendar</span>
              <Command.Shortcut>⌘K C</Command.Shortcut>
            </Command.Item>
            <Command.Item role="option" aria-describedby="mail-desc">
              <Mail className="mr-2 h-4 w-4" />
              <span>Check Mail</span>
              <Command.Shortcut>⌘K M</Command.Shortcut>
            </Command.Item>
            <Command.Item role="option" aria-describedby="settings-desc">
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
              <Command.Shortcut>⌘,</Command.Shortcut>
            </Command.Item>
          </Command.Group>
        </Command.List>
      </CommandRoot>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const searchInput = canvas.getByLabelText('Command palette search');

    // Test focus management
    await userEvent.click(searchInput);
    await expect(searchInput).toHaveFocus();

    // Test keyboard navigation
    await userEvent.keyboard('{ArrowDown}');
    // The first command item should be focused (though we can't easily test focus state in play functions)

    await userEvent.keyboard('{ArrowDown}');
    await userEvent.keyboard('{ArrowUp}');

    // Test escape key
    await userEvent.keyboard('{Escape}');

    // Test search and selection
    await userEvent.type(searchInput, 'calendar');
    await userEvent.keyboard('{ArrowDown}');
    await userEvent.keyboard('{Enter}');
  },
};

/**
 * ### Interactive Search Demo
 *
 * Demonstrates real-time search filtering with a larger dataset
 * to showcase the search capabilities.
 */
export const InteractiveSearch: Story = {
  render: () => {
    const items = [
      {
        icon: Calendar,
        name: 'Open Calendar',
        category: 'Apps',
        shortcut: '⌘K C',
      },
      { icon: Mail, name: 'Check Email', category: 'Apps', shortcut: '⌘K E' },
      {
        icon: FileText,
        name: 'New Document',
        category: 'File',
        shortcut: '⌘N',
      },
      {
        icon: Settings,
        name: 'Open Settings',
        category: 'System',
        shortcut: '⌘,',
      },
      {
        icon: User,
        name: 'User Profile',
        category: 'Account',
        shortcut: '⌘K U',
      },
      {
        icon: Calculator,
        name: 'Calculator',
        category: 'Tools',
        shortcut: '⌘K Calc',
      },
      { icon: Home, name: 'Go Home', category: 'Navigation', shortcut: '⌘H' },
      {
        icon: CreditCard,
        name: 'Billing',
        category: 'Account',
        shortcut: '⌘K B',
      },
      {
        icon: MessageSquare,
        name: 'Messages',
        category: 'Communication',
        shortcut: '⌘K M',
      },
      {
        icon: Plus,
        name: 'Create New',
        category: 'Actions',
        shortcut: '⌘Shift+N',
      },
    ];

    // Group items by category
    const groupedItems = items.reduce(
      (acc, item) => {
        if (!acc[item.category]) {
          acc[item.category] = [];
        }
        acc[item.category].push(item);
        return acc;
      },
      {} as Record<string, typeof items>
    );

    return (
      <div className="w-96 border rounded-lg shadow-lg">
        <CommandRoot>
          <Command.Input placeholder="Search from 10 commands..." />
          <Command.List>
            <Command.Empty>
              <div className="text-center py-6">
                <Search className="mx-auto h-6 w-6 text-gray-400 mb-2" />
                <p className="text-sm text-gray-500">No matching commands</p>
              </div>
            </Command.Empty>

            {Object.entries(groupedItems).map(([category, categoryItems]) => (
              <div key={category}>
                <Command.Group heading={category}>
                  {categoryItems.map((item) => {
                    const IconComponent = item.icon;
                    return (
                      <Command.Item key={item.name} value={item.name}>
                        <IconComponent className="mr-2 h-4 w-4" />
                        <span>{item.name}</span>
                        <Command.Shortcut>{item.shortcut}</Command.Shortcut>
                      </Command.Item>
                    );
                  })}
                </Command.Group>
                <Command.Separator />
              </div>
            ))}
          </Command.List>
        </CommandRoot>
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const searchInput = canvas.getByPlaceholderText(
      'Search from 10 commands...'
    );

    // Test progressive search refinement
    await userEvent.type(searchInput, 'ca');

    // Should show Calendar and Calculator
    await expect(canvas.getByText('Open Calendar')).toBeVisible();
    await expect(canvas.getByText('Calculator')).toBeVisible();

    // Refine search
    await userEvent.type(searchInput, 'l'); // "cal"

    // Test clearing search
    await userEvent.clear(searchInput);

    // All items should be visible again
    await expect(canvas.getByText('Open Calendar')).toBeVisible();
    await expect(canvas.getByText('Check Email')).toBeVisible();
    await expect(canvas.getByText('User Profile')).toBeVisible();
  },
};
