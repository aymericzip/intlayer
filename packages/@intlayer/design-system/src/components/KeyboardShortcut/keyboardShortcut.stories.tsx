import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { KeyboardShortcut } from './KeyboardShortcut';

/**
 * KeyboardShortcut Component Stories
 *
 * The KeyboardShortcut component displays keyboard shortcuts visually and listens
 * for key combinations to trigger actions. It automatically adapts to Mac (⌘) and
 * Windows/Linux (Ctrl) conventions.
 *
 * ## Key Features
 * - **Cross-platform**: Automatically displays ⌘ on Mac and Ctrl on Windows/Linux
 * - **Autonomous**: Handles keyboard event listening internally
 * - **Type-safe**: Enforces valid keyboard shortcut combinations
 * - **Accessible**: Uses semantic <kbd> element for keyboard shortcuts
 * - **Customizable**: Supports different sizes and custom styling
 *
 * ## When to Use
 * - Documentation and help sections showing available shortcuts
 * - Search triggers (⌘+F / Ctrl+F)
 * - Command palettes (⌘+K / Ctrl+K)
 * - Quick actions (⌘+S / Ctrl+S for save)
 * - Navigation shortcuts
 */
const meta = {
  title: 'Components/KeyboardShortcut',
  component: KeyboardShortcut,
  parameters: {
    docs: {
      description: {
        component: `
A component that displays keyboard shortcuts and listens for key combinations.
Automatically adapts to the user's operating system (Mac vs Windows/Linux).

### Basic Usage
\`\`\`tsx
<KeyboardShortcut 
  shortcut="⌘ + F" 
  onTriggered={() => console.log('Search triggered')} 
/>
\`\`\`

### Features
- Displays keyboard shortcuts with proper styling
- Listens for keyboard events and triggers callbacks
- Automatically converts between ⌘ (Mac) and Ctrl (Windows/Linux)
- Type-safe shortcut definitions
- Customizable size and appearance
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    shortcut: {
      control: 'text',
      description: 'The keyboard shortcut combination (e.g., "⌘ + F")',
      table: {
        type: { summary: 'KeyboardShortcutType' },
      },
    },
    onTriggered: {
      action: 'triggered',
      description: 'Callback function when the shortcut is pressed',
      table: {
        type: { summary: '() => void' },
      },
    },
    display: {
      control: 'boolean',
      description: 'Whether to display the shortcut visually',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the keyboard shortcut display',
      table: {
        type: { summary: "'sm' | 'md' | 'lg'" },
        defaultValue: { summary: "'md'" },
      },
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
      table: {
        type: { summary: 'string' },
      },
    },
  },
} satisfies Meta<typeof KeyboardShortcut>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default keyboard shortcut showing the most common search shortcut.
 * This example uses ⌘ + F, which will automatically display as Ctrl + F on Windows/Linux.
 */
export const Default: Story = {
  args: {
    shortcut: '⌘ + F',
  },
};

/**
 * Small size variant for compact UI elements like popovers or tooltips.
 */
export const Small: Story = {
  args: {
    shortcut: '⌘ + K',
    size: 'sm',
  },
};

/**
 * Medium size variant (default) for standard UI elements.
 */
export const Medium: Story = {
  args: {
    shortcut: '⌘ + S',
    size: 'md',
  },
};

/**
 * Large size variant for prominent UI elements or documentation.
 */
export const Large: Story = {
  args: {
    shortcut: '⌘ + L',
    size: 'lg',
  },
};

/**
 * Common keyboard shortcuts used in applications.
 * Shows a variety of modifier key combinations.
 */
export const CommonShortcuts: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <span className="w-32">Search:</span>
        <KeyboardShortcut shortcut="⌘ + F" />
      </div>
      <div className="flex items-center gap-2">
        <span className="w-32">Save:</span>
        <KeyboardShortcut shortcut="⌘ + S" />
      </div>
      <div className="flex items-center gap-2">
        <span className="w-32">Open Command:</span>
        <KeyboardShortcut shortcut="⌘ + K" />
      </div>
      <div className="flex items-center gap-2">
        <span className="w-32">Toggle Panel:</span>
        <KeyboardShortcut shortcut="⌘ + L" />
      </div>
      <div className="flex items-center gap-2">
        <span className="w-32">Copy:</span>
        <KeyboardShortcut shortcut="⌘ + C" />
      </div>
      <div className="flex items-center gap-2">
        <span className="w-32">Paste:</span>
        <KeyboardShortcut shortcut="⌘ + V" />
      </div>
      <div className="flex items-center gap-2">
        <span className="w-32">Undo:</span>
        <KeyboardShortcut shortcut="⌘ + Z" />
      </div>
    </div>
  ),
};

/**
 * Multi-key combinations showing shortcuts with multiple modifier keys.
 */
export const MultiKeyShortcuts: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <span className="w-40">Shift modifier:</span>
        <KeyboardShortcut shortcut="⌘ + Shift + P" />
      </div>
      <div className="flex items-center gap-2">
        <span className="w-40">Alt modifier:</span>
        <KeyboardShortcut shortcut="⌘ + Alt + K" />
      </div>
      <div className="flex items-center gap-2">
        <span className="w-40">Multiple modifiers:</span>
        <KeyboardShortcut shortcut="Ctrl + Shift + Alt + F" />
      </div>
    </div>
  ),
};

/**
 * Interactive example showing the keyboard shortcut in action.
 * Press ⌘+K (Mac) or Ctrl+K (Windows/Linux) to trigger the action.
 * Notice how keys light up when pressed!
 */
export const Interactive: Story = {
  render: () => {
    const [count, setCount] = useState(0);

    return (
      <div className="flex flex-col items-center gap-4 p-6">
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          Press the keyboard shortcut to increment the counter:
        </p>
        <KeyboardShortcut
          shortcut="⌘ + K"
          onTriggered={() => setCount((prev) => prev + 1)}
        />
        <div className="text-2xl font-bold">
          Count: <span className="text-primary-600">{count}</span>
        </div>
        <p className="text-xs text-neutral-500 dark:text-neutral-500">
          (Try pressing ⌘+K on Mac or Ctrl+K on Windows/Linux)
        </p>
        <p className="text-xs text-neutral-400 dark:text-neutral-600">
          💡 Watch the keys light up as you press them!
        </p>
      </div>
    );
  },
};

/**
 * Live key press visualization - shows how keys highlight when pressed.
 * Try pressing any of the modifier keys or letters shown.
 */
export const LiveKeyPressVisualization: Story = {
  render: () => {
    return (
      <div className="flex flex-col gap-6 p-6">
        <div>
          <h3 className="mb-4 text-lg font-semibold">
            Try pressing these shortcuts:
          </h3>
          <p className="mb-4 text-sm text-neutral-600 dark:text-neutral-400">
            Press any key combination below and watch them light up in
            real-time!
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <span className="w-32 text-sm">Search:</span>
            <KeyboardShortcut shortcut="⌘ + F" size="md" />
          </div>

          <div className="flex items-center gap-3">
            <span className="w-32 text-sm">Save:</span>
            <KeyboardShortcut shortcut="⌘ + S" size="md" />
          </div>

          <div className="flex items-center gap-3">
            <span className="w-32 text-sm">Command:</span>
            <KeyboardShortcut shortcut="⌘ + K" size="md" />
          </div>

          <div className="flex items-center gap-3">
            <span className="w-32 text-sm">Multi-key:</span>
            <KeyboardShortcut shortcut="⌘ + Shift + P" size="md" />
          </div>

          <div className="flex items-center gap-3">
            <span className="w-32 text-sm">Alt combo:</span>
            <KeyboardShortcut shortcut="⌘ + Alt + K" size="md" />
          </div>
        </div>

        <div className="mt-4 rounded-lg border border-neutral-200 bg-neutral-50 p-4 dark:border-neutral-700 dark:bg-neutral-900">
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            <strong>How it works:</strong> Each key in the shortcut will
            highlight with a primary color when you press it. The visual
            feedback helps users learn and confirm keyboard shortcuts.
          </p>
        </div>
      </div>
    );
  },
};

/**
 * Size comparison showing all available sizes side by side.
 */
export const SizeComparison: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <div className="flex flex-col items-center gap-2">
        <KeyboardShortcut shortcut="⌘ + F" size="sm" />
        <span className="text-xs text-neutral-500">Small</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <KeyboardShortcut shortcut="⌘ + F" size="md" />
        <span className="text-xs text-neutral-500">Medium</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <KeyboardShortcut shortcut="⌘ + F" size="lg" />
        <span className="text-xs text-neutral-500">Large</span>
      </div>
    </div>
  ),
};

/**
 * Example showing how to use keyboard shortcuts in a search trigger button.
 */
export const InSearchButton: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className="flex flex-col gap-4">
        <button
          type="button"
          className="flex items-center justify-between gap-2 rounded-lg border px-4 py-2 transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-800"
          onClick={() => setIsOpen(true)}
        >
          <span className="text-sm text-neutral-600 dark:text-neutral-400">
            Search documentation...
          </span>
          <KeyboardShortcut
            shortcut="⌘ + F"
            onTriggered={() => setIsOpen(true)}
            size="sm"
          />
        </button>
        {isOpen && (
          <div className="rounded-lg border bg-neutral-50 p-4 dark:bg-neutral-800">
            <p className="text-sm">Search modal opened!</p>
            <button
              type="button"
              className="text-primary-600 mt-2 text-xs hover:underline"
              onClick={() => setIsOpen(false)}
            >
              Close
            </button>
          </div>
        )}
      </div>
    );
  },
};

/**
 * Custom styled keyboard shortcut with additional classes.
 */
export const CustomStyled: Story = {
  args: {
    shortcut: '⌘ + K',
    className:
      'bg-primary-100 dark:bg-primary-900 border-primary-300 dark:border-primary-700 text-primary-900 dark:text-primary-100',
  },
};

/**
 * Display only mode without keyboard event listening.
 * Useful for static documentation or help sections.
 */
export const DisplayOnly: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <span>Navigate forward:</span>
        <KeyboardShortcut shortcut="Ctrl + ArrowRight" display={true} />
      </div>
      <div className="flex items-center gap-2">
        <span>Navigate back:</span>
        <KeyboardShortcut shortcut="Ctrl + ArrowLeft" display={true} />
      </div>
      <p className="mt-4 text-xs text-neutral-500">
        These shortcuts are displayed but don't listen for keyboard events
      </p>
    </div>
  ),
};

/**
 * Special keys like Enter, Escape, Tab, etc.
 */
export const SpecialKeys: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <span className="w-32">Submit:</span>
        <KeyboardShortcut shortcut="Enter" />
      </div>
      <div className="flex items-center gap-2">
        <span className="w-32">Cancel:</span>
        <KeyboardShortcut shortcut="Escape" />
      </div>
      <div className="flex items-center gap-2">
        <span className="w-32">Next field:</span>
        <KeyboardShortcut shortcut="Tab" />
      </div>
      <div className="flex items-center gap-2">
        <span className="w-32">Previous field:</span>
        <KeyboardShortcut shortcut="Shift + Tab" />
      </div>
    </div>
  ),
};
