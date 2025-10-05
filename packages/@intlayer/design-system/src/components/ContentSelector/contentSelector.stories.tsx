import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';
import { useState } from 'react';
import { ContentSelector } from './ContentSelector';

/**
 * ContentSelector Component Stories
 *
 * The ContentSelector component is a high-level wrapper around PressableSpan that provides
 * a semantic interface for making any content selectable. It's designed for content
 * management interfaces where users need to select text, images, or other elements
 * to perform actions like editing, moving, or applying operations.
 *
 * ## Key Features
 * - **Content Selection**: Makes any React content selectable via long press
 * - **Visual Feedback**: Outline-based selection indicators
 * - **Accessibility**: Full keyboard navigation and screen reader support
 * - **Click Outside**: Automatic deselection when clicking elsewhere
 * - **External Control**: Can be controlled externally for complex selection states
 *
 * ## When to Use
 * - Content management systems with inline editing
 * - Text and media selection interfaces
 * - Interactive documentation with selectable sections
 * - Dashboard widgets with configurable content
 * - Form builders with selectable form elements
 */
const meta = {
  title: 'Components/ContentSelector',
  component: ContentSelector,
  parameters: {
    docs: {
      description: {
        component: `
A semantic wrapper around PressableSpan specifically designed for content selection scenarios.

### Accessibility Features:
- **Keyboard Navigation**: Full support for Tab, Enter, Space, and Escape key interactions
- **Screen Readers**: Proper ARIA labels and selection state announcements
- **Focus Management**: Visible focus indicators and proper blur handling
- **Content Context**: Semantic labeling for different types of selectable content

### Selection Patterns:
- **Long Press**: Hold down to select content (configurable duration)
- **Keyboard Shortcuts**: Enter/Space to select, Escape to deselect
- **Click Outside**: Automatic deselection when clicking elsewhere
- **Visual Feedback**: Clear selection indicators with smooth transitions

### Use Cases:
- Inline content editing activation
- Multi-selection interfaces
- Content organization tools
- Interactive documentation
- Dashboard customization
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
      description: 'The content to be displayed and made selectable',
      control: 'text',
    },
    onSelect: {
      description: 'Callback function triggered when content is selected',
      action: 'selected',
    },
    onUnselect: {
      description:
        'Optional callback triggered when clicking outside while selected',
      action: 'unselected',
    },
    isSelecting: {
      description: 'External control for the selection state',
      control: 'boolean',
    },
    pressDuration: {
      description: 'Duration in milliseconds for long press detection',
      control: { type: 'number', min: 100, max: 2000, step: 100 },
    },
    className: {
      description: 'Additional CSS classes for styling',
      control: 'text',
    },
    'aria-label': {
      description: 'ARIA label for accessibility context',
      control: 'text',
    },
    'aria-describedby': {
      description: 'ID of element providing additional description',
      control: 'text',
    },
  },
} satisfies Meta<typeof ContentSelector>;

export default meta;
type Story = StoryObj<typeof ContentSelector>;

/**
 * ## Basic Examples
 *
 * These stories demonstrate the core functionality and appearance of the ContentSelector
 * component in its most common configurations.
 */

/**
 * ### Default Behavior
 *
 * Basic ContentSelector with text content. Long press to select the content
 * and see the visual selection feedback.
 */
export const Default: Story = {
  args: {
    children: 'Long press to select this content',
    onSelect: () => console.log('Content selected!'),
    pressDuration: 400,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const selector = canvas.getByRole('button');

    // Test initial state
    await expect(selector).toBeInTheDocument();
    await expect(selector).toHaveAttribute('aria-pressed', 'false');
    await expect(selector).toHaveAccessibleName();

    // Test that selector is focusable
    await expect(selector).toHaveAttribute('tabIndex', '0');
  },
};

/**
 * ### Content Types
 *
 * Demonstrates ContentSelector with different types of content including
 * text, structured content, and mixed media.
 */
export const ContentTypes: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <h3 className="mb-2 font-medium text-gray-700 text-sm">
            Text Content
          </h3>
          <ContentSelector onSelect={() => alert('Text selected!')}>
            <p className="text-gray-800">
              This is a paragraph of selectable text content. Long press to
              select it.
            </p>
          </ContentSelector>
        </div>

        <div>
          <h3 className="mb-2 font-medium text-gray-700 text-sm">
            Structured Content
          </h3>
          <ContentSelector onSelect={() => alert('Card selected!')}>
            <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
              <h4 className="mb-2 font-semibold text-gray-900">Content Card</h4>
              <p className="text-gray-600 text-sm">
                This entire card becomes selectable as a unit. Perfect for
                content management interfaces.
              </p>
              <div className="mt-3 text-gray-500 text-xs">
                Created: March 15, 2024
              </div>
            </div>
          </ContentSelector>
        </div>

        <div>
          <h3 className="mb-2 font-medium text-gray-700 text-sm">
            Media Content
          </h3>
          <ContentSelector onSelect={() => alert('Media selected!')}>
            <div className="relative">
              <div className="flex h-32 w-full items-center justify-center rounded-lg bg-gradient-to-r from-blue-400 to-purple-500">
                <span className="font-medium text-white">
                  Image Placeholder
                </span>
              </div>
              <div className="absolute bottom-2 left-2 rounded bg-black bg-opacity-50 px-2 py-1 text-white text-xs">
                Selectable media content
              </div>
            </div>
          </ContentSelector>
        </div>
      </div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const selectors = canvas.getAllByRole('button');

    // Test that all content types are selectable
    await expect(selectors).toHaveLength(3);

    for (const selector of selectors) {
      await expect(selector).toBeInTheDocument();
      await expect(selector).toHaveAttribute('tabIndex', '0');
      await expect(selector).toHaveAttribute('aria-pressed', 'false');
    }
  },
};

/**
 * ## Selection States
 *
 * Stories demonstrating different selection states and behaviors.
 */

/**
 * ### Controlled Selection
 *
 * Example showing external control of the selection state through props.
 * The parent component manages the selection state.
 */
export const ControlledSelection: Story = {
  render: () => {
    const [selectedItems, setSelectedItems] = useState<string[]>([]);

    const toggleSelection = (itemId: string) => {
      setSelectedItems((prev) =>
        prev.includes(itemId)
          ? prev.filter((id) => id !== itemId)
          : [...prev, itemId]
      );
    };

    const clearAllSelections = () => setSelectedItems([]);

    const items = [
      {
        id: 'item1',
        title: 'First Content Block',
        content: 'This is the first selectable content block.',
      },
      {
        id: 'item2',
        title: 'Second Content Block',
        content: 'This is the second selectable content block.',
      },
      {
        id: 'item3',
        title: 'Third Content Block',
        content: 'This is the third selectable content block.',
      },
    ];

    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <span className="font-medium text-sm">
            Selected: {selectedItems.length} item
            {selectedItems.length !== 1 ? 's' : ''}
          </span>
          <button
            className="rounded bg-red-500 px-3 py-1 text-sm text-white hover:bg-red-600"
            onClick={clearAllSelections}
          >
            Clear All
          </button>
        </div>

        <div className="grid gap-4">
          {items.map((item) => (
            <ContentSelector
              key={item.id}
              isSelecting={selectedItems.includes(item.id)}
              onSelect={() => toggleSelection(item.id)}
              onUnselect={() =>
                setSelectedItems((prev) => prev.filter((id) => id !== item.id))
              }
              className={`rounded-lg border-2 p-4 transition-colors ${
                selectedItems.includes(item.id)
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <h4 className="font-medium text-gray-900">{item.title}</h4>
              <p className="mt-1 text-gray-600 text-sm">{item.content}</p>
            </ContentSelector>
          ))}
        </div>
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const selectors = canvas
      .getAllByRole('button')
      .filter((btn) => btn.textContent?.includes('Content Block'));
    const clearButton = canvas.getByRole('button', { name: /clear all/i });

    // Test initial state
    await expect(selectors).toHaveLength(3);
    await expect(clearButton).toBeInTheDocument();

    // Test that all items start unselected
    for (const selector of selectors) {
      await expect(selector).toHaveAttribute('aria-pressed', 'false');
    }

    // Test clear button functionality
    await userEvent.click(clearButton);
  },
};

/**
 * ### Multi-Selection Interface
 *
 * Advanced example showing a multi-selection interface with batch operations.
 */
export const MultiSelectionInterface: Story = {
  render: () => {
    const [selectedContentIds, setSelectedContentIds] = useState<number[]>([]);
    const [operationLog, setOperationLog] = useState<string[]>([]);

    const addToLog = (message: string) => {
      setOperationLog((prev) => [...prev.slice(-4), message]);
    };

    const selectContent = (id: number) => {
      setSelectedContentIds((prev) => {
        if (!prev.includes(id)) {
          const newSelection = [...prev, id];
          addToLog(`Selected content ${id} (${newSelection.length} total)`);
          return newSelection;
        }
        return prev;
      });
    };

    const deselectContent = (id: number) => {
      setSelectedContentIds((prev) => {
        const newSelection = prev.filter((selectedId) => selectedId !== id);
        addToLog(`Deselected content ${id} (${newSelection.length} remaining)`);
        return newSelection;
      });
    };

    const batchOperation = (operation: string) => {
      addToLog(`${operation} applied to ${selectedContentIds.length} items`);
      setSelectedContentIds([]);
    };

    const contentItems = [
      {
        id: 1,
        type: 'Article',
        title: 'How to Use Content Selectors',
        snippet: 'A comprehensive guide...',
      },
      {
        id: 2,
        type: 'Tutorial',
        title: 'Advanced Selection Patterns',
        snippet: 'Learn about multi-selection...',
      },
      {
        id: 3,
        type: 'Example',
        title: 'Real-World Applications',
        snippet: 'See ContentSelector in action...',
      },
      {
        id: 4,
        type: 'Reference',
        title: 'API Documentation',
        snippet: 'Complete prop reference...',
      },
    ];

    return (
      <div className="space-y-6">
        <div className="rounded-lg bg-gray-50 p-4">
          <div className="mb-3 flex items-center justify-between">
            <span className="font-medium">
              {selectedContentIds.length} of {contentItems.length} selected
            </span>
            {selectedContentIds.length > 0 && (
              <div className="flex gap-2">
                <button
                  className="rounded bg-blue-500 px-3 py-1 text-sm text-white hover:bg-blue-600"
                  onClick={() => batchOperation('Edit')}
                >
                  Edit Selected
                </button>
                <button
                  className="rounded bg-green-500 px-3 py-1 text-sm text-white hover:bg-green-600"
                  onClick={() => batchOperation('Archive')}
                >
                  Archive Selected
                </button>
                <button
                  className="rounded bg-red-500 px-3 py-1 text-sm text-white hover:bg-red-600"
                  onClick={() => batchOperation('Delete')}
                >
                  Delete Selected
                </button>
              </div>
            )}
          </div>

          {operationLog.length > 0 && (
            <div className="space-y-1 text-gray-600 text-xs">
              <div className="font-medium">Recent Actions:</div>
              {operationLog.map((log, index) => (
                <div key={index}>• {log}</div>
              ))}
            </div>
          )}
        </div>

        <div className="grid gap-3">
          {contentItems.map((item) => (
            <ContentSelector
              key={item.id}
              isSelecting={selectedContentIds.includes(item.id)}
              onSelect={() => selectContent(item.id)}
              onUnselect={() => deselectContent(item.id)}
              pressDuration={300}
              aria-label={`Select ${item.type}: ${item.title}`}
            >
              <div
                className={`rounded-lg border p-4 transition-all ${
                  selectedContentIds.includes(item.id)
                    ? 'border-blue-500 bg-blue-50 shadow-md'
                    : 'border-gray-200 bg-white hover:shadow-sm'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="mb-1 flex items-center gap-2">
                      <span
                        className={`rounded px-2 py-0.5 font-medium text-xs ${
                          item.type === 'Article'
                            ? 'bg-green-100 text-green-700'
                            : item.type === 'Tutorial'
                              ? 'bg-blue-100 text-blue-700'
                              : item.type === 'Example'
                                ? 'bg-orange-100 text-orange-700'
                                : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {item.type}
                      </span>
                    </div>
                    <h4 className="font-medium text-gray-900">{item.title}</h4>
                    <p className="mt-1 text-gray-600 text-sm">{item.snippet}</p>
                  </div>
                  {selectedContentIds.includes(item.id) && (
                    <div className="ml-2 font-medium text-blue-500 text-sm">
                      ✓
                    </div>
                  )}
                </div>
              </div>
            </ContentSelector>
          ))}
        </div>
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const selectors = canvas
      .getAllByRole('button')
      .filter((btn) => btn.getAttribute('aria-label')?.includes('Select'));

    // Test that all content items are present
    await expect(selectors.length).toBeGreaterThan(0);

    for (const selector of selectors) {
      await expect(selector).toBeInTheDocument();
      await expect(selector).toHaveAttribute('aria-pressed', 'false');
      await expect(selector).toHaveAccessibleName();
    }
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
 * Demonstrates proper keyboard navigation and shortcuts inherited from PressableSpan.
 * Use Tab to focus, Enter/Space to select, Escape to deselect.
 */
export const KeyboardNavigation: Story = {
  render: () => {
    const [keyboardLog, setKeyboardLog] = useState<string[]>([]);

    const logAction = (action: string) => {
      setKeyboardLog((prev) => [
        ...prev.slice(-5),
        `${new Date().toLocaleTimeString()}: ${action}`,
      ]);
    };

    const contentSections = [
      'Introduction Section - Navigate with Tab key',
      'Content Body - Use Enter/Space to select',
      'Conclusion - Press Escape to deselect',
    ];

    return (
      <div className="space-y-6">
        <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4">
          <h3 className="mb-2 font-medium">Keyboard Instructions:</h3>
          <ul className="space-y-1 text-sm">
            <li>
              •{' '}
              <kbd className="rounded bg-white px-1 py-0.5 text-xs shadow">
                Tab
              </kbd>{' '}
              - Navigate between sections
            </li>
            <li>
              •{' '}
              <kbd className="rounded bg-white px-1 py-0.5 text-xs shadow">
                Enter
              </kbd>{' '}
              or{' '}
              <kbd className="rounded bg-white px-1 py-0.5 text-xs shadow">
                Space
              </kbd>{' '}
              - Select content
            </li>
            <li>
              •{' '}
              <kbd className="rounded bg-white px-1 py-0.5 text-xs shadow">
                Escape
              </kbd>{' '}
              - Deselect content
            </li>
          </ul>
        </div>

        <div className="space-y-3">
          {contentSections.map((content, index) => (
            <ContentSelector
              key={index}
              onSelect={() => logAction(`Selected: ${content.split(' - ')[0]}`)}
              onUnselect={() =>
                logAction(`Deselected: ${content.split(' - ')[0]}`)
              }
              className="block rounded-lg border border-gray-300 p-4 transition-colors hover:bg-gray-50"
              aria-label={`Selectable content: ${content}`}
            >
              <div className="text-gray-800">{content}</div>
            </ContentSelector>
          ))}
        </div>

        <div className="rounded-lg bg-gray-50 p-3">
          <h4 className="mb-2 font-medium text-sm">Keyboard Action Log:</h4>
          <div className="max-h-24 space-y-1 overflow-y-auto text-gray-600 text-xs">
            {keyboardLog.length === 0 ? (
              <div>Use keyboard to interact with content above</div>
            ) : (
              keyboardLog.map((log, index) => <div key={index}>• {log}</div>)
            )}
          </div>
        </div>
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const selectors = canvas
      .getAllByRole('button')
      .filter((btn) =>
        btn.getAttribute('aria-label')?.includes('Selectable content')
      );

    // Test keyboard accessibility
    for (const selector of selectors) {
      await expect(selector).toHaveAttribute('tabIndex', '0');
      await expect(selector).toBeInTheDocument();
    }

    // Test keyboard navigation
    const firstSelector = selectors[0];
    await userEvent.click(firstSelector);
    await expect(firstSelector).toHaveFocus();

    // Test tab navigation
    await userEvent.keyboard('{Tab}');
    await expect(selectors[1]).toHaveFocus();
  },
};

/**
 * ### ARIA Labels and Descriptions
 *
 * Demonstrates proper ARIA attribute usage for content selection scenarios.
 */
export const ARIALabelsAndDescriptions: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <h3 className="mb-2 font-medium text-sm">
            Content with Custom ARIA Label
          </h3>
          <ContentSelector
            onSelect={() => alert('Article selected for editing')}
            aria-label="Select article to edit content and metadata"
          >
            <div className="rounded-lg border border-gray-200 p-4">
              <h4 className="mb-2 font-semibold">Understanding React Hooks</h4>
              <p className="text-gray-600 text-sm">
                A comprehensive guide to using React Hooks in modern
                applications.
              </p>
            </div>
          </ContentSelector>
        </div>

        <div>
          <h3 className="mb-2 font-medium text-sm">Content with Description</h3>
          <div>
            <ContentSelector
              onSelect={() => alert('Media item selected')}
              aria-describedby="media-help"
              aria-label="Select media item"
            >
              <div className="rounded-lg border border-gray-200 bg-gradient-to-r from-purple-100 to-pink-100 p-4">
                <h4 className="mb-2 font-semibold">Featured Image</h4>
                <div className="text-gray-600 text-sm">
                  High-resolution banner image for the homepage
                </div>
              </div>
            </ContentSelector>
            <div id="media-help" className="mt-2 text-gray-500 text-xs">
              Long press to select this media item. Once selected, you can edit
              properties, replace the file, or move it to different sections.
            </div>
          </div>
        </div>

        <div>
          <h3 className="mb-2 font-medium text-sm">
            Interactive Content Block
          </h3>
          <ContentSelector
            onSelect={() => alert('Widget configured')}
            aria-label="Configure interactive widget settings"
            className="block"
          >
            <div className="rounded-lg border-2 border-blue-300 border-dashed bg-blue-50 p-4">
              <div className="text-center">
                <div className="mb-1 font-medium text-blue-600">
                  Interactive Widget
                </div>
                <div className="text-blue-500 text-sm">
                  Click to configure widget settings and behavior
                </div>
              </div>
            </div>
          </ContentSelector>
        </div>
      </div>

      <div className="rounded bg-blue-50 p-4 text-gray-600 text-sm">
        <strong>Accessibility Note:</strong> All ContentSelector components
        inherit proper ARIA attributes from PressableSpan, including
        role="button" and aria-pressed states that update based on selection.
      </div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const selectors = canvas.getAllByRole('button');

    // Test ARIA attributes
    for (const selector of selectors) {
      await expect(selector).toHaveAttribute('role', 'button');
      await expect(selector).toHaveAttribute('aria-pressed');
    }

    // Test custom aria-label
    const articleSelector = canvas.getByRole('button', {
      name: /select article to edit/i,
    });
    await expect(articleSelector).toBeInTheDocument();

    // Test described content
    const mediaSelector = canvas.getByRole('button', {
      name: /select media item/i,
    });
    await expect(mediaSelector).toHaveAttribute(
      'aria-describedby',
      'media-help'
    );

    const description = canvas.getByText(
      /long press to select this media item/i
    );
    await expect(description).toBeInTheDocument();
    await expect(description).toHaveAttribute('id', 'media-help');
  },
};

/**
 * ## Real-World Examples
 *
 * Stories showing practical applications of the ContentSelector component.
 */

/**
 * ### Content Management System
 *
 * A practical example showing ContentSelector in a CMS-like interface
 * where different content types can be selected for editing.
 */
export const ContentManagementSystem: Story = {
  render: () => {
    const [selectedContent, setSelectedContent] = useState<string | null>(null);
    const [editMode, setEditMode] = useState<string | null>(null);

    const handleSelect = (contentId: string) => {
      setSelectedContent(contentId);
      setEditMode(null);
    };

    const handleEdit = (contentId: string) => {
      setEditMode(contentId);
      setSelectedContent(null);
    };

    const handleDeselect = () => {
      setSelectedContent(null);
      setEditMode(null);
    };

    const contentBlocks = [
      {
        id: 'header',
        type: 'Header',
        title: 'Welcome to Our Platform',
        content: 'Discover amazing features and capabilities.',
        editable: true,
      },
      {
        id: 'hero',
        type: 'Hero Section',
        title: 'Hero Banner',
        content: 'Large banner with call-to-action buttons.',
        editable: true,
      },
      {
        id: 'features',
        type: 'Feature List',
        title: 'Key Features',
        content: 'Showcase of main product features and benefits.',
        editable: true,
      },
      {
        id: 'testimonials',
        type: 'Testimonials',
        title: 'Customer Reviews',
        content: 'Rotating testimonials from satisfied customers.',
        editable: false,
      },
    ];

    return (
      <div className="space-y-6">
        <div className="rounded-lg bg-gray-50 p-4">
          <h3 className="mb-2 font-medium">Content Management Interface</h3>
          <div className="text-gray-600 text-sm">
            Long press any content block to select it. Selected content can be
            edited, moved, or configured.
          </div>
          {selectedContent && (
            <div className="mt-3 rounded border border-blue-200 bg-blue-50 p-3">
              <strong>Selected:</strong>{' '}
              {contentBlocks.find((b) => b.id === selectedContent)?.type}
              <div className="mt-2 flex gap-2">
                <button
                  className="rounded bg-blue-500 px-3 py-1 text-sm text-white hover:bg-blue-600"
                  onClick={() => handleEdit(selectedContent)}
                >
                  Edit Content
                </button>
                <button
                  className="rounded bg-gray-500 px-3 py-1 text-sm text-white hover:bg-gray-600"
                  onClick={handleDeselect}
                >
                  Deselect
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-4">
          {contentBlocks.map((block) => (
            <div key={block.id} className="relative">
              {editMode === block.id ? (
                <div className="rounded-lg border-2 border-blue-500 bg-blue-50 p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <h4 className="font-medium text-blue-900">
                      Editing: {block.type}
                    </h4>
                    <button
                      className="rounded bg-green-500 px-3 py-1 text-sm text-white hover:bg-green-600"
                      onClick={() => setEditMode(null)}
                    >
                      Done Editing
                    </button>
                  </div>
                  <div className="space-y-2">
                    <input
                      className="w-full rounded border border-blue-300 p-2"
                      defaultValue={block.title}
                      placeholder="Content title"
                    />
                    <textarea
                      className="h-20 w-full rounded border border-blue-300 p-2"
                      defaultValue={block.content}
                      placeholder="Content description"
                    />
                  </div>
                </div>
              ) : (
                <ContentSelector
                  isSelecting={selectedContent === block.id}
                  onSelect={() => handleSelect(block.id)}
                  onUnselect={handleDeselect}
                  aria-label={`Select ${block.type} for editing`}
                >
                  <div
                    className={`rounded-lg border-2 p-4 transition-all ${
                      selectedContent === block.id
                        ? 'border-blue-500 bg-blue-50 shadow-md'
                        : 'border-gray-200 bg-white hover:shadow-sm'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="mb-2 flex items-center gap-2">
                          <span className="rounded bg-gray-100 px-2 py-1 font-medium text-gray-700 text-xs">
                            {block.type}
                          </span>
                          {!block.editable && (
                            <span className="rounded bg-yellow-100 px-2 py-1 text-xs text-yellow-700">
                              Read Only
                            </span>
                          )}
                        </div>
                        <h4 className="mb-1 font-semibold text-gray-900">
                          {block.title}
                        </h4>
                        <p className="text-gray-600 text-sm">{block.content}</p>
                      </div>
                      {selectedContent === block.id && (
                        <div className="ml-3 text-blue-500">
                          <svg
                            className="h-5 w-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      )}
                    </div>
                  </div>
                </ContentSelector>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const selectors = canvas
      .getAllByRole('button')
      .filter(
        (btn) =>
          btn.getAttribute('aria-label')?.includes('Select') &&
          btn.getAttribute('aria-label')?.includes('for editing')
      );

    // Test that all content blocks are selectable
    await expect(selectors.length).toBeGreaterThan(0);

    for (const selector of selectors) {
      await expect(selector).toBeInTheDocument();
      await expect(selector).toHaveAttribute('tabIndex', '0');
      await expect(selector).toHaveAccessibleName();
    }
  },
};
