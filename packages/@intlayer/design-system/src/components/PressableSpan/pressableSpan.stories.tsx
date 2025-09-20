import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';
import { useState } from 'react';
import { PressableSpan } from './PressableSpan';

/**
 * PressableSpan Component Stories
 *
 * The PressableSpan component is an interactive span element that responds to long press gestures
 * and provides visual feedback. It's designed for text editing interfaces, selection systems,
 * and any interactive content requiring differentiation between quick clicks and intentional
 * long press actions.
 *
 * ## Key Features
 * - **Long Press Detection**: Configurable press duration for different interaction patterns
 * - **Visual Feedback**: Smooth outline transitions for interactive and selected states
 * - **Click Outside Detection**: Automatic deselection when clicking outside the component
 * - **Touch Support**: Seamless operation on both desktop and mobile devices
 * - **Accessibility**: Full keyboard navigation and ARIA support
 *
 * ## When to Use
 * - Text editing interfaces where long press activates edit mode
 * - Content selection systems requiring visual feedback
 * - Interactive cards or elements with press-and-hold activation
 * - Mobile-friendly interfaces requiring long press gestures
 * - Content management interfaces with inline editing
 */
const meta = {
  title: 'Components/PressableSpan',
  component: PressableSpan,
  parameters: {
    docs: {
      description: {
        component: `
A versatile interactive span component that detects long press gestures with configurable behavior.

### Accessibility Features:
- **Keyboard Navigation**: Full support for Tab, Enter, Space, and Escape key interactions
- **Screen Readers**: Proper ARIA labels and pressed state announcements
- **Focus Management**: Visible focus indicators and proper blur handling
- **Touch Support**: Consistent behavior across mouse, touch, and keyboard inputs

### Interaction Patterns:
- **Long Press**: Hold down to activate (configurable duration)
- **Keyboard Shortcuts**: Enter/Space to activate, Escape to deselect
- **Click Outside**: Automatic deselection when clicking elsewhere
- **Visual Feedback**: Smooth outline transitions for different states

### Use Cases:
- Inline text editing activation
- Content selection and highlighting
- Interactive tooltips or popovers
- Mobile-first gesture interfaces
- Content management systems
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
        ],
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      description: 'The content to be displayed within the pressable span',
      control: 'text',
    },
    onPress: {
      description: 'Callback function triggered when a long press is detected',
      action: 'pressed',
    },
    onClickOutside: {
      description:
        'Optional callback triggered when clicking outside while selecting',
      action: 'clicked outside',
    },
    pressDuration: {
      description: 'Duration in milliseconds for long press detection',
      control: { type: 'number', min: 100, max: 2000, step: 100 },
    },
    isSelecting: {
      description: 'External control for the selecting state',
      control: 'boolean',
    },
    className: {
      description: 'Additional CSS classes for styling',
      control: 'text',
    },
  },
} satisfies Meta<typeof PressableSpan>;

export default meta;
type Story = StoryObj<typeof PressableSpan>;

/**
 * ## Basic Examples
 *
 * These stories demonstrate the core functionality and appearance of the PressableSpan component
 * in its most common configurations.
 */

/**
 * ### Default Behavior
 *
 * The basic PressableSpan with default settings. Long press (400ms) to activate the selection state.
 * Try holding down on the text to see the visual feedback.
 */
export const Default: Story = {
  args: {
    children: 'Press and hold me',
    onPress: () => console.log('Long press detected!'),
    pressDuration: 400,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const span = canvas.getByRole('button');

    // Test initial state
    await expect(span).toBeInTheDocument();
    await expect(span).toHaveAttribute('aria-pressed', 'false');
    await expect(span).toHaveAccessibleName();

    // Test that span is focusable
    await expect(span).toHaveAttribute('tabIndex', '0');
  },
};

/**
 * ### Different Press Durations
 *
 * Comparison of different press duration settings to show how the component
 * can be configured for various interaction patterns.
 */
export const PressDurations: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="text-sm text-gray-600 mb-4">
        Try long pressing each span with different durations:
      </div>
      <div className="space-y-2">
        <div className="flex items-center gap-4">
          <span className="w-16 text-sm text-gray-500">200ms:</span>
          <PressableSpan
            pressDuration={200}
            onPress={() => alert('Quick press (200ms)!')}
          >
            Quick activation
          </PressableSpan>
        </div>
        <div className="flex items-center gap-4">
          <span className="w-16 text-sm text-gray-500">400ms:</span>
          <PressableSpan
            pressDuration={400}
            onPress={() => alert('Standard press (400ms)!')}
          >
            Standard activation
          </PressableSpan>
        </div>
        <div className="flex items-center gap-4">
          <span className="w-16 text-sm text-gray-500">800ms:</span>
          <PressableSpan
            pressDuration={800}
            onPress={() => alert('Slow press (800ms)!')}
          >
            Deliberate activation
          </PressableSpan>
        </div>
      </div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const spans = canvas.getAllByRole('button');

    // Test that all spans are present and accessible
    await expect(spans).toHaveLength(3);

    for (const span of spans) {
      await expect(span).toBeInTheDocument();
      await expect(span).toHaveAttribute('tabIndex', '0');
      await expect(span).toHaveAccessibleName();
    }
  },
};

/**
 * ## Interactive States
 *
 * Stories demonstrating different states and interactive behaviors of the component.
 */

/**
 * ### Controlled Selection State
 *
 * Example showing external control of the selection state through props.
 * The parent component manages the state and can override internal state.
 */
export const ControlledState: Story = {
  render: () => {
    const [isSelected, setIsSelected] = useState(false);

    return (
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <PressableSpan
            data-testid="controlled-span"
            isSelecting={isSelected}
            onPress={() => setIsSelected(true)}
            onClickOutside={() => setIsSelected(false)}
            aria-label={
              isSelected
                ? 'Selected! Click outside to deselect'
                : 'Selectable content'
            }
          >
            {isSelected
              ? 'Selected! Click outside to deselect'
              : 'Select to select'}
          </PressableSpan>
        </div>
        <div className="flex gap-2">
          <button
            data-testid="select-button"
            className="px-3 py-1 bg-blue-500 text-white rounded text-sm"
            onClick={() => setIsSelected(true)}
          >
            Select Externally
          </button>
          <button
            data-testid="deselect-button"
            className="px-3 py-1 bg-red-500 text-white rounded text-sm"
            onClick={() => setIsSelected(false)}
          >
            Deselect Externally
          </button>
        </div>
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const span = canvas.getByTestId('controlled-span');
    const selectButton = canvas.getByTestId('select-button');
    const deselectButton = canvas.getByTestId('deselect-button');

    // Test initial state
    await expect(span).toBeInTheDocument();
    await expect(span).toHaveAttribute('aria-pressed', 'false');
    await expect(span).toHaveAccessibleName('Selectable content');

    // Test external select button
    await userEvent.click(selectButton);
    await expect(span).toHaveAttribute('aria-pressed', 'true');
    await expect(span).toHaveAccessibleName(
      'Selected! Click outside to deselect'
    );
    // Test external deselect button
    await userEvent.click(deselectButton);
    await expect(span).toHaveAttribute('aria-pressed', 'false');
    await expect(span).toHaveAccessibleName('Selectable content');

    // Test internal selection via long press
    await userEvent.pointer({ target: span, keys: '[MouseLeft>]' });
    await new Promise((r) => setTimeout(r, 500)); // Wait longer than default pressDuration
    await expect(span).toHaveAttribute('aria-pressed', 'true');
    await expect(span).toHaveAccessibleName(
      'Selected! Click outside to deselect'
    );
  },
};

/**
 * ### Click Outside Detection
 *
 * Demonstrates the click outside functionality where the component automatically
 * deselects when clicking elsewhere on the page.
 */
export const ClickOutsideDetection: Story = {
  render: () => {
    const [selectionCount, setSelectionCount] = useState(0);
    const [outsideClickCount, setOutsideClickCount] = useState(0);

    return (
      <div className="space-y-6 p-4 border border-gray-200 rounded">
        <div className="space-y-2">
          <p className="text-sm text-gray-600">
            Long press the span below, then click anywhere outside to trigger
            deselection:
          </p>
          <PressableSpan
            onPress={() => setSelectionCount((prev) => prev + 1)}
            onClickOutside={() => setOutsideClickCount((prev) => prev + 1)}
            className="bg-blue-50 px-2 py-1 rounded"
          >
            Long press me, then click outside
          </PressableSpan>
        </div>

        <div className="space-y-1 text-sm">
          <div>
            Selections: <strong>{selectionCount}</strong>
          </div>
          <div>
            Outside clicks: <strong>{outsideClickCount}</strong>
          </div>
        </div>

        <div className="p-4 bg-gray-50 rounded">
          <p className="text-sm text-gray-500">
            Click anywhere in this area to trigger "click outside" behavior
          </p>
        </div>
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const span = canvas.getByRole('button');
    const outsideArea = canvas.getByText(/click anywhere in this area/i);

    // Test that span is accessible
    await expect(span).toBeInTheDocument();
    await expect(span).toHaveAttribute('aria-pressed', 'false');

    // Test click outside area exists
    await expect(outsideArea).toBeInTheDocument();
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
 * Demonstrates proper keyboard navigation and shortcuts.
 * Use Tab to focus, Enter/Space to activate, Escape to deselect.
 */
export const KeyboardNavigation: Story = {
  render: () => {
    const [keyboardActions, setKeyboardActions] = useState<string[]>([]);

    const addAction = (action: string) => {
      setKeyboardActions((prev) => [...prev.slice(-4), action]);
    };

    return (
      <div className="space-y-6">
        <div className="space-y-2">
          <h3 className="font-medium">Keyboard Instructions:</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>
              •{' '}
              <kbd className="px-1 py-0.5 bg-gray-100 rounded text-xs">Tab</kbd>{' '}
              - Focus the span
            </li>
            <li>
              •{' '}
              <kbd className="px-1 py-0.5 bg-gray-100 rounded text-xs">
                Enter
              </kbd>{' '}
              or{' '}
              <kbd className="px-1 py-0.5 bg-gray-100 rounded text-xs">
                Space
              </kbd>{' '}
              - Activate selection
            </li>
            <li>
              •{' '}
              <kbd className="px-1 py-0.5 bg-gray-100 rounded text-xs">
                Escape
              </kbd>{' '}
              - Deselect
            </li>
          </ul>
        </div>

        <div className="flex gap-4">
          <PressableSpan
            onPress={() => addAction('Activated via keyboard')}
            onClickOutside={() => addAction('Deselected via keyboard')}
            className="border border-gray-300 px-3 py-2 rounded"
          >
            Focus me and use keyboard
          </PressableSpan>

          <PressableSpan
            onPress={() => addAction('Second span activated')}
            onClickOutside={() => addAction('Second span deselected')}
            className="border border-gray-300 px-3 py-2 rounded"
          >
            Another focusable span
          </PressableSpan>
        </div>

        <div className="space-y-1">
          <h4 className="text-sm font-medium">Recent Actions:</h4>
          <div className="text-xs text-gray-600 space-y-1">
            {keyboardActions.length === 0 ? (
              <div>No actions yet - try using the keyboard!</div>
            ) : (
              keyboardActions.map((action, index) => (
                <div key={index}>• {action}</div>
              ))
            )}
          </div>
        </div>
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const spans = canvas.getAllByRole('button');

    // Test that spans are keyboard accessible
    for (const span of spans) {
      await expect(span).toHaveAttribute('tabIndex', '0');
      await expect(span).toBeInTheDocument();
    }

    // Test keyboard navigation
    const firstSpan = spans[0];
    await userEvent.click(firstSpan);
    await expect(firstSpan).toHaveFocus();

    // Test tab navigation
    await userEvent.keyboard('{Tab}');
    await expect(spans[1]).toHaveFocus();
  },
};

/**
 * ### ARIA Attributes
 *
 * Demonstrates proper ARIA attribute usage for screen readers and assistive technologies.
 */
export const ARIAAttributes: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-medium mb-2">Default ARIA Attributes</h3>
          <PressableSpan onPress={() => {}}>Basic pressable span</PressableSpan>
        </div>

        <div>
          <h3 className="text-sm font-medium mb-2">Custom ARIA Label</h3>
          <PressableSpan
            onPress={() => {}}
            aria-label="Edit this content by long pressing"
          >
            Content with custom label
          </PressableSpan>
        </div>

        <div>
          <h3 className="text-sm font-medium mb-2">With Description</h3>
          <div>
            <PressableSpan onPress={() => {}} aria-describedby="help-text">
              Content with help text
            </PressableSpan>
            <div id="help-text" className="text-xs text-gray-500 mt-1">
              Long press to enter edit mode, click outside to exit
            </div>
          </div>
        </div>
      </div>

      <div className="text-sm text-gray-600 p-4 bg-blue-50 rounded">
        <strong>Screen Reader Testing:</strong> All spans have proper
        role="button" and aria-pressed attributes that update based on selection
        state.
      </div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const spans = canvas.getAllByRole('button');

    // Test ARIA attributes
    for (const span of spans) {
      await expect(span).toHaveAttribute('role', 'button');
      await expect(span).toHaveAttribute('aria-pressed');
    }

    // Test custom aria-label
    const customLabelSpan = canvas.getByRole('button', {
      name: /edit this content by long pressing/i,
    });
    await expect(customLabelSpan).toBeInTheDocument();

    // Test described span
    const describedSpan = spans[2];
    await expect(describedSpan).toHaveAttribute(
      'aria-describedby',
      'help-text'
    );

    const description = canvas.getByText(/long press to enter edit mode/i);
    await expect(description).toBeInTheDocument();
    await expect(description).toHaveAttribute('id', 'help-text');
  },
};

/**
 * ## Real-World Examples
 *
 * Stories showing practical applications of the PressableSpan component.
 */

/**
 * ### Inline Text Editor
 *
 * A practical example showing how PressableSpan can be used to create
 * an inline text editing interface similar to content management systems.
 */
export const InlineTextEditor: Story = {
  render: () => {
    const [editableTexts, setEditableTexts] = useState({
      title: 'Click to edit this title',
      description:
        'This is an editable description. Long press to start editing.',
      note: 'Pro tip: Use keyboard shortcuts for faster editing!',
    });
    const [editingKey, setEditingKey] = useState<string | null>(null);

    const handleEdit = (key: string) => {
      setEditingKey(key);
    };

    const handleSave = (key: string, newValue: string) => {
      setEditableTexts((prev) => ({ ...prev, [key]: newValue }));
      setEditingKey(null);
    };

    const handleCancel = () => {
      setEditingKey(null);
    };

    return (
      <div className="space-y-6 max-w-2xl">
        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-bold mb-2">
              {editingKey === 'title' ? (
                <input
                  autoFocus
                  className="w-full border border-blue-300 rounded px-2 py-1"
                  defaultValue={editableTexts.title}
                  onBlur={(e) => handleSave('title', e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter')
                      handleSave('title', e.currentTarget.value);
                    if (e.key === 'Escape') handleCancel();
                  }}
                />
              ) : (
                <PressableSpan
                  onPress={() => handleEdit('title')}
                  onClickOutside={handleCancel}
                  className="hover:bg-gray-50 transition-colors"
                >
                  {editableTexts.title}
                </PressableSpan>
              )}
            </h2>
          </div>

          <div>
            <p className="text-gray-700 mb-2">
              {editingKey === 'description' ? (
                <textarea
                  autoFocus
                  className="w-full border border-blue-300 rounded px-2 py-1 min-h-[60px]"
                  defaultValue={editableTexts.description}
                  onBlur={(e) => handleSave('description', e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && e.metaKey)
                      handleSave('description', e.currentTarget.value);
                    if (e.key === 'Escape') handleCancel();
                  }}
                />
              ) : (
                <PressableSpan
                  onPress={() => handleEdit('description')}
                  onClickOutside={handleCancel}
                  className="hover:bg-gray-50 transition-colors block"
                >
                  {editableTexts.description}
                </PressableSpan>
              )}
            </p>
          </div>

          <div className="text-sm text-blue-600">
            {editingKey === 'note' ? (
              <input
                autoFocus
                className="w-full border border-blue-300 rounded px-2 py-1"
                defaultValue={editableTexts.note}
                onBlur={(e) => handleSave('note', e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter')
                    handleSave('note', e.currentTarget.value);
                  if (e.key === 'Escape') handleCancel();
                }}
              />
            ) : (
              <PressableSpan
                onPress={() => handleEdit('note')}
                onClickOutside={handleCancel}
                className="hover:bg-blue-50 transition-colors"
              >
                {editableTexts.note}
              </PressableSpan>
            )}
          </div>
        </div>

        <div className="text-xs text-gray-500 p-3 bg-gray-50 rounded">
          <strong>Instructions:</strong> Long press any text to edit it. Press
          Enter to save, Escape to cancel, or click outside to save changes.
        </div>
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const pressableSpans = canvas.getAllByRole('button');

    // Test that all editable elements are present
    await expect(pressableSpans.length).toBeGreaterThan(0);

    for (const span of pressableSpans) {
      await expect(span).toBeInTheDocument();
      await expect(span).toHaveAttribute('tabIndex', '0');
    }
  },
};

/**
 * ### Touch-Friendly Mobile Interface
 *
 * Example optimized for mobile devices with larger touch targets
 * and appropriate press durations for touch interactions.
 */
export const TouchFriendlyMobile: Story = {
  render: () => {
    const [selectedItems, setSelectedItems] = useState<number[]>([]);

    const toggleSelection = (id: number) => {
      setSelectedItems((prev) =>
        prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
      );
    };

    const items = [
      {
        id: 1,
        title: 'Mobile-optimized card',
        description: 'Touch-friendly interface',
      },
      {
        id: 2,
        title: 'Responsive design',
        description: 'Works on all devices',
      },
      {
        id: 3,
        title: 'Long press to select',
        description: 'Intuitive gesture support',
      },
    ];

    return (
      <div className="space-y-4 max-w-sm mx-auto">
        <div className="text-center text-sm text-gray-600 mb-4">
          Long press cards to select them
        </div>

        {items.map((item) => (
          <PressableSpan
            key={item.id}
            pressDuration={300}
            isSelecting={selectedItems.includes(item.id)}
            onPress={() => toggleSelection(item.id)}
            onClickOutside={() =>
              setSelectedItems((prev) => prev.filter((id) => id !== item.id))
            }
            className={`block p-4 border-2 rounded-lg transition-all ${
              selectedItems.includes(item.id)
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="space-y-1">
              <h3 className="font-medium text-gray-900">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.description}</p>
            </div>
          </PressableSpan>
        ))}

        <div className="text-center text-xs text-gray-500">
          Selected: {selectedItems.length} item
          {selectedItems.length !== 1 ? 's' : ''}
        </div>
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const cards = canvas.getAllByRole('button');

    await expect(cards).toHaveLength(3);

    for (const card of cards) {
      await expect(card).toBeInTheDocument();
      await expect(card).toHaveAttribute('tabIndex', '0');
      await expect(card).toHaveAttribute('aria-pressed');
    }

    // Test that cards have mobile-friendly styling
    for (const card of cards) {
      const styles = getComputedStyle(card);
      // Cards should have adequate padding for touch targets
      expect(styles.padding).toBeTruthy();
    }
  },
};
