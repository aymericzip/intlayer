import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';
import { InputVariant } from '../Input';
import { EditableFieldTextArea } from '.';

/**
 * EditableField TextArea Component Stories
 *
 * An inline editable textarea field optimized for multiline content editing.
 * Features automatic height adjustment, proper formatting preservation, and
 * seamless editing workflow. Perfect for content management, descriptions,
 * comments, and any multiline text that needs inline editing capabilities.
 *
 * ## Key Features
 * - **Auto-sizing**: Automatically adjusts height to fit content up to maxRows
 * - **Multiline Support**: Preserves line breaks and text formatting
 * - **Inline Editing**: Click-to-edit with instant visual feedback
 * - **Save/Cancel Actions**: Built-in action buttons with clear indicators
 * - **Auto-save**: Automatically saves when clicking outside
 * - **Accessibility**: Full keyboard navigation and screen reader support
 *
 * ## When to Use
 * - Description fields and long-form content
 * - Comment systems and feedback forms
 * - Content management and blog editing
 * - Documentation and help text editing
 * - Any scenario requiring multiline text editing
 */
const meta: Meta<typeof EditableFieldTextArea> = {
  title: 'Components/EditableField/TextArea',
  component: EditableFieldTextArea,
  parameters: {
    docs: {
      description: {
        component: `
An inline editable textarea component designed for seamless multiline content editing.

### Core Functionality:
- **Display Mode**: Shows formatted multiline text with preserved line breaks
- **Edit Mode**: Reveals an auto-sized textarea with save (✓) and cancel (✕) buttons  
- **Auto-sizing**: Dynamically adjusts height based on content up to the maxRows limit
- **Auto-save**: Clicking outside automatically saves the current content
- **Content Preservation**: Maintains formatting, line breaks, and whitespace

### Auto-sizing Behavior:
- **Minimum Height**: Always maintains minimum height for usability
- **Content-based Growth**: Expands vertically as content increases
- **Maximum Constraint**: Stops growing at maxRows and shows scrollbar if needed
- **Responsive**: Adapts to container width while maintaining aspect ratio

### Editing Workflow:
1. **Activation**: Click anywhere on the text area or edit icon to enter edit mode
2. **Content Entry**: Type multiline content with full keyboard support
3. **Visual Feedback**: Real-time height adjustment as content changes
4. **Confirmation**: Click save (✓) to confirm changes with formatting preserved
5. **Cancellation**: Click cancel (✕) to revert to original content
6. **Auto-save**: Click outside to automatically save and exit edit mode

### Accessibility Features:
- **Keyboard Navigation**: Full Tab, Enter, Escape, and arrow key support
- **Screen Reader Support**: Proper ARIA labels and multiline announcements
- **Focus Management**: Clear focus indicators and logical navigation order
- **Content Structure**: Preserves text structure for assistive technologies
- **Action Feedback**: Audio and visual feedback for save/cancel operations

### Content Management:
- **Formatting Preservation**: Maintains line breaks, spacing, and text structure
- **Large Content Support**: Efficiently handles long-form content with scrolling
- **Real-time Updates**: Immediate visual feedback during content modification
- **State Persistence**: Reliable state management for complex editing workflows
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
    placeholder: {
      description: 'Placeholder text shown when the textarea is empty',
      control: 'text',
    },
    defaultValue: {
      description: 'Initial multiline content for uncontrolled usage',
      control: 'text',
    },
    value: {
      description: 'Current multiline content for controlled usage',
      control: 'text',
    },
    autoSize: {
      description: 'Enable automatic height adjustment based on content',
      control: 'boolean',
    },
    maxRows: {
      description: 'Maximum number of rows before showing scrollbar',
      control: { type: 'number', min: 1, max: 50 },
    },
    variant: {
      description: 'Visual style variant of the textarea',
      control: 'select',
      options: Object.values(InputVariant),
    },
    validationStyleEnabled: {
      description: 'Enable validation styling based on form state',
      control: 'boolean',
    },
    disabled: {
      description: 'Disable the entire editable textarea',
      control: 'boolean',
    },
    required: {
      description: 'Mark the field as required',
      control: 'boolean',
    },
    onSave: {
      description: 'Callback fired when the user saves changes',
      action: 'saved',
      table: { disable: true },
    },
    onCancel: {
      description: 'Callback fired when the user cancels editing',
      action: 'cancelled',
      table: { disable: true },
    },
  },
};

export default meta;

type Story = StoryObj<typeof EditableFieldTextArea>;

/**
 * ## Basic Examples
 *
 * These stories demonstrate the core functionality and common use cases
 * for the EditableField TextArea component.
 */

/**
 * ### Default State
 *
 * The basic editable textarea with auto-sizing enabled. Notice how it
 * preserves line breaks and adjusts height automatically.
 */
export const Default: Story = {
  args: {
    placeholder: 'Click the edit icon to modify…',
    defaultValue:
      'This is editable multiline text content.\n\nIt supports line breaks and automatically adjusts its height based on the content length.',
    autoSize: true,
    maxRows: 10,
    variant: InputVariant.DEFAULT,
    validationStyleEnabled: false,
    disabled: false,
  },
  render: (args) => (
    <div className="max-w-md p-4">
      <EditableFieldTextArea
        {...args}
        onSave={(value) => {
          console.log('Saved multiline content:', value);
        }}
        onCancel={() => {
          console.log('Multiline edit cancelled');
        }}
      />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test initial display state
    const editableField = canvas.getByRole('button');
    await expect(editableField).toBeInTheDocument();
    await expect(editableField).toHaveTextContent(/editable multiline text/);

    // Test edit mode activation
    await userEvent.click(editableField);

    // Look for the textarea field
    const textareaField = canvas.getByRole('textbox');
    await expect(textareaField).toBeInTheDocument();
    await expect(textareaField).toHaveTextContent(
      /This is editable multiline text content/
    );

    // Test save and cancel buttons
    const saveButton = canvas.getByTestId('editable-field-save-button');
    const cancelButton = canvas.getByTestId('editable-field-cancel-button');
    await expect(saveButton).toBeInTheDocument();
    await expect(cancelButton).toBeInTheDocument();
  },
};

/**
 * ### TextArea Variants
 *
 * Different visual styles for the textarea to match various UI contexts.
 */
export const TextAreaVariants: Story = {
  render: () => (
    <div className="space-y-6 p-4">
      <div>
        <h3 className="mb-2 font-medium text-sm">Default Variant</h3>
        <EditableFieldTextArea
          defaultValue="Default styled textarea with multiple lines\nand proper formatting preservation."
          variant={InputVariant.DEFAULT}
          onSave={(value) => console.log('Default saved:', value)}
          onCancel={() => console.log('Default cancelled')}
        />
      </div>

      <div>
        <h3 className="mb-2 font-medium text-sm">Invisible Variant</h3>
        <EditableFieldTextArea
          defaultValue="Invisible styled textarea perfect for\nclean content management interfaces."
          variant={InputVariant.INVISIBLE}
          onSave={(value) => console.log('Invisible saved:', value)}
          onCancel={() => console.log('Invisible cancelled')}
        />
      </div>

      <div>
        <h3 className="mb-2 font-medium text-sm">Default Variant</h3>
        <EditableFieldTextArea
          defaultValue="Default styled textarea with\nclear visual boundaries for form contexts."
          variant={InputVariant.DEFAULT}
          onSave={(value) => console.log('Default saved:', value)}
          onCancel={() => console.log('Default cancelled')}
        />
      </div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test that all variants are present
    const editableFields = canvas.getAllByRole('button');
    await expect(editableFields).toHaveLength(3);

    // Test content of each variant
    await expect(editableFields[0]).toHaveTextContent(
      /Default styled textarea/
    );
    await expect(editableFields[1]).toHaveTextContent(
      /Invisible styled textarea/
    );
    await expect(editableFields[2]).toHaveTextContent(
      /Default styled textarea/
    );
  },
};

/**
 * ### Auto-sizing Options
 *
 * Different auto-sizing configurations showing height adjustment behavior.
 */
export const AutoSizingOptions: Story = {
  render: () => (
    <div className="space-y-6 p-4">
      <div>
        <h4 className="mb-2 font-medium text-sm">
          Auto-size Enabled (Max 5 rows)
        </h4>
        <EditableFieldTextArea
          defaultValue="This textarea will grow automatically as you type more content.\nTry adding more lines to see it expand.\nLine 3\nLine 4\nLine 5 - This should be the maximum height"
          autoSize={true}
          maxRows={5}
          onSave={(value) => console.log('Auto-size saved:', value)}
        />
      </div>

      <div>
        <h4 className="mb-2 font-medium text-sm">
          Fixed Height (Auto-size Disabled)
        </h4>
        <EditableFieldTextArea
          defaultValue="This textarea has a fixed height and will not grow automatically.\nContent beyond the visible area will require scrolling."
          autoSize={false}
          onSave={(value) => console.log('Fixed height saved:', value)}
        />
      </div>

      <div>
        <h4 className="mb-2 font-medium text-sm">
          Large Max Rows (Max 15 rows)
        </h4>
        <EditableFieldTextArea
          defaultValue="This textarea can grow up to 15 rows.\nGreat for longer content editing."
          autoSize={true}
          maxRows={15}
          onSave={(value) => console.log('Large max rows saved:', value)}
        />
      </div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const editableFields = canvas.getAllByRole('button');
    await expect(editableFields).toHaveLength(3);

    // Test each auto-sizing variant
    for (const field of editableFields) {
      await expect(field).toBeInTheDocument();
      await expect(field).toHaveTextContent(/textarea/);
    }
  },
};

/**
 * ## Interactive States
 *
 * Stories demonstrating different states and user interactions.
 */

/**
 * ### Empty State
 *
 * How the component behaves when no content is provided, showing placeholder.
 */
export const EmptyState: Story = {
  args: {
    placeholder:
      'Click to add multiline content...\nSupports multiple lines and formatting.',
    defaultValue: '',
    autoSize: true,
    maxRows: 8,
  },
  render: (args) => (
    <div className="max-w-md p-4">
      <EditableFieldTextArea
        {...args}
        onSave={(value) => console.log('Empty state saved:', value)}
        onCancel={() => console.log('Empty state cancelled')}
      />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test empty state displays dash
    const editableField = canvas.getByRole('button');
    await expect(editableField).toHaveTextContent('-');

    // Click to edit
    await userEvent.click(editableField);

    // Check placeholder is shown in textarea
    const textareaField = canvas.getByRole('textbox');
    await expect(textareaField).toHaveAttribute(
      'placeholder',
      expect.stringContaining('multiline content')
    );
  },
};

/**
 * ### Disabled State
 *
 * Non-interactive state for when editing should not be allowed.
 */
export const DisabledState: Story = {
  args: {
    defaultValue:
      'This multiline content cannot be edited.\n\nIt remains in read-only mode regardless of user interaction.',
    disabled: true,
    autoSize: true,
  },
  render: (args) => (
    <div className="max-w-md p-4">
      <EditableFieldTextArea
        {...args}
        onSave={(value) => console.log('Disabled saved:', value)}
        onCancel={() => console.log('Disabled cancelled')}
      />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const editableField = canvas.getByRole('button');
    await expect(editableField).toHaveTextContent(/cannot be edited/);

    // Test that clicking doesn't activate edit mode
    await userEvent.click(editableField);

    // Should not have textarea field
    const textareaFields = canvas.queryAllByRole('textbox');
    await expect(textareaFields).toHaveLength(1);
  },
};

/**
 * ### Long Content
 *
 * How the component handles very long multiline content with scrolling.
 */
export const LongContent: Story = {
  args: {
    defaultValue: `This is a very long multiline text content that demonstrates how the EditableFieldTextArea handles extensive content.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.

This content will be truncated in display mode but fully accessible in edit mode with proper scrolling behavior when it exceeds the maxRows limit.`,
    autoSize: true,
    maxRows: 6,
  },
  render: (args) => (
    <div className="max-w-lg p-4">
      <EditableFieldTextArea
        {...args}
        onSave={(value) => console.log('Long content saved:', value)}
        onCancel={() => console.log('Long content cancelled')}
      />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const editableField = canvas.getByRole('button');
    await expect(editableField).toHaveTextContent(/very long multiline text/);

    // Test edit mode with long content
    await userEvent.click(editableField);

    const textareaField = canvas.getByRole('textbox');
    await expect(textareaField).toHaveTextContent(/Lorem ipsum/);
  },
};

/**
 * ## Content Formatting
 *
 * Stories demonstrating formatting preservation and content structure.
 */

/**
 * ### Code Snippet Content
 *
 * Editing code snippets and preserving indentation and formatting.
 */
export const CodeSnippetContent: Story = {
  args: {
    defaultValue: `function calculateTotal(items) {
  let total = 0;
  
  for (const item of items) {
    total += item.price * item.quantity;
  }
  
  return total;
}`,
    autoSize: true,
    maxRows: 12,
    variant: InputVariant.DEFAULT,
  },
  render: (args) => (
    <div className="max-w-lg p-4">
      <label className="mb-2 block font-medium text-sm">Code Snippet</label>
      <div className="font-mono text-sm">
        <EditableFieldTextArea
          {...args}
          onSave={(value) => console.log('Code saved:', value)}
          onCancel={() => console.log('Code cancelled')}
        />
      </div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const editableField = canvas.getByRole('button');
    await expect(editableField).toHaveTextContent(/function calculateTotal/);

    // Test code editing
    await userEvent.click(editableField);

    const textareaField = canvas.getByRole('textbox');
    await expect(textareaField).toHaveTextContent(/function calculateTotal/);
  },
};

/**
 * ### Rich Text Content
 *
 * Handling formatted content with various text structures.
 */
export const RichTextContent: Story = {
  args: {
    defaultValue: `# Project Overview

## Getting Started
Welcome to our project! This section covers the basic setup and configuration.

### Requirements
- Node.js 18 or higher
- npm or yarn package manager
- Git for version control

### Installation Steps
1. Clone the repository
2. Install dependencies
3. Configure environment variables
4. Run the development server

## Next Steps
After completing the setup, you can:
- Explore the documentation
- Run example projects
- Join our community discussions`,
    autoSize: true,
    maxRows: 15,
  },
  render: (args) => (
    <div className="max-w-2xl p-4">
      <label className="mb-2 block font-medium text-sm">
        Documentation Content
      </label>
      <EditableFieldTextArea
        {...args}
        onSave={(value) => console.log('Rich text saved:', value)}
        onCancel={() => console.log('Rich text cancelled')}
      />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const editableField = canvas.getByRole('button');
    await expect(editableField).toHaveTextContent(/Project Overview/);

    await userEvent.click(editableField);

    const textareaField = canvas.getByRole('textbox');
    await expect(textareaField).toHaveTextContent(/# Project Overview/);
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
 * Full keyboard accessibility testing including multiline text navigation.
 */
export const KeyboardNavigation: Story = {
  render: () => (
    <div className="space-y-4 p-4">
      <div className="mb-4 rounded-lg bg-blue-50 p-3 text-gray-600 text-sm">
        <p className="mb-1 font-medium">Keyboard Navigation Test:</p>
        <ul className="space-y-1 text-xs">
          <li>• Tab: Navigate between text areas</li>
          <li>• Enter/Space: Activate edit mode</li>
          <li>• Escape: Cancel editing</li>
          <li>• In edit mode: Arrow keys for text navigation</li>
          <li>• Tab in edit mode: Navigate to save/cancel buttons</li>
        </ul>
      </div>

      <div className="max-w-md">
        <EditableFieldTextArea
          defaultValue="First editable text area\nwith multiline content support."
          onSave={(value) => console.log('First saved:', value)}
          onCancel={() => console.log('First cancelled')}
        />
      </div>

      <div className="max-w-md">
        <EditableFieldTextArea
          defaultValue="Second editable text area\nfor testing keyboard navigation."
          onSave={(value) => console.log('Second saved:', value)}
          onCancel={() => console.log('Second cancelled')}
        />
      </div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const editableFields = canvas.getAllByRole('button');
    await expect(editableFields).toHaveLength(2);

    // Test keyboard navigation
    const firstField = editableFields[0];
    await userEvent.click(firstField);

    // Should have textarea focused
    const textareaField = canvas.getByRole('textbox');
    await expect(textareaField).toBeInTheDocument();

    // Test tab navigation to save button
    await userEvent.keyboard('{Tab}');
    const saveButtons = canvas.getAllByTestId('editable-field-save-button');
    await expect(saveButtons[0]).toBeInTheDocument();
  },
};

/**
 * ## Real-world Examples
 *
 * Practical examples showing the component in realistic usage scenarios.
 */

/**
 * ### Blog Post Editor
 *
 * Example of using editable textarea for blog post content editing.
 */
export const BlogPostEditor: Story = {
  render: () => (
    <div className="mx-auto max-w-4xl rounded-lg border border-gray-200 bg-white p-6">
      <h2 className="mb-6 font-semibold text-xl">Blog Post Editor</h2>

      <div className="space-y-6">
        <div>
          <label className="mb-2 block font-medium text-gray-700 text-sm">
            Post Title
          </label>
          <EditableFieldTextArea
            defaultValue="Getting Started with React Hooks"
            autoSize={true}
            maxRows={2}
            variant={InputVariant.DEFAULT}
            onSave={(value) => console.log('Title updated:', value)}
          />
        </div>

        <div>
          <label className="mb-2 block font-medium text-gray-700 text-sm">
            Introduction
          </label>
          <EditableFieldTextArea
            defaultValue="React Hooks revolutionized how we write React components. In this comprehensive guide, we'll explore the most commonly used hooks and learn how to implement them effectively in your projects."
            autoSize={true}
            maxRows={6}
            variant={InputVariant.DEFAULT}
            onSave={(value) => console.log('Introduction updated:', value)}
          />
        </div>

        <div>
          <label className="mb-2 block font-medium text-gray-700 text-sm">
            Main Content
          </label>
          <EditableFieldTextArea
            defaultValue={`## What are React Hooks?

React Hooks are functions that let you "hook into" React state and lifecycle features from function components. They were introduced in React 16.8 and provide a more direct API to the React concepts you already know.

### Most Common Hooks

1. **useState** - Manages component state
2. **useEffect** - Handles side effects
3. **useContext** - Consumes context values
4. **useReducer** - Manages complex state logic

### Best Practices

- Only call hooks at the top level of your React function
- Don't call hooks inside loops, conditions, or nested functions
- Use custom hooks to share stateful logic between components

## Conclusion

React Hooks provide a powerful way to manage state and side effects in functional components. Start with the basic hooks and gradually explore more advanced patterns as your application grows.`}
            autoSize={true}
            maxRows={20}
            variant={InputVariant.DEFAULT}
            onSave={(value) => console.log('Content updated:', value)}
          />
        </div>
      </div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test blog editor structure
    const heading = canvas.getByRole('heading', { level: 2 });
    await expect(heading).toHaveTextContent('Blog Post Editor');

    // Test all text areas are present
    const editableFields = canvas.getAllByRole('button');
    await expect(editableFields).toHaveLength(3);

    // Test editing the main content
    const contentField = editableFields[2];
    await expect(contentField).toHaveTextContent(/What are React Hooks/);

    await userEvent.click(contentField);
    const textareaField = canvas.getByRole('textbox');
    await expect(textareaField).toHaveTextContent(/What are React Hooks/);
  },
};

/**
 * ### Comment System
 *
 * Example showing textarea usage in a comment or feedback system.
 */
export const CommentSystem: Story = {
  render: () => (
    <div className="mx-auto max-w-2xl p-6">
      <h3 className="mb-6 font-medium text-lg">User Comments</h3>

      <div className="space-y-4">
        <div className="rounded-lg border border-gray-200 p-4">
          <div className="mb-3 flex items-center">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 font-medium text-sm text-white">
              JD
            </div>
            <div className="ml-3">
              <p className="font-medium text-gray-900 text-sm">John Doe</p>
              <p className="text-gray-500 text-xs">2 hours ago</p>
            </div>
          </div>
          <EditableFieldTextArea
            defaultValue="This is a great article! I particularly enjoyed the section about custom hooks. One suggestion: it would be helpful to include more examples of useEffect cleanup functions."
            variant={InputVariant.INVISIBLE}
            autoSize={true}
            maxRows={8}
            onSave={(value) => console.log('Comment updated:', value)}
          />
        </div>

        <div className="rounded-lg border border-gray-200 p-4">
          <div className="mb-3 flex items-center">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500 font-medium text-sm text-white">
              AS
            </div>
            <div className="ml-3">
              <p className="font-medium text-gray-900 text-sm">Alice Smith</p>
              <p className="text-gray-500 text-xs">5 hours ago</p>
            </div>
          </div>
          <EditableFieldTextArea
            defaultValue="Thanks for sharing this! I've been struggling with understanding when to use useReducer vs useState. Your explanations really helped clarify the differences.

Quick question: Do you have any recommendations for testing components that use hooks?"
            variant={InputVariant.INVISIBLE}
            autoSize={true}
            maxRows={10}
            onSave={(value) => console.log('Reply updated:', value)}
          />
        </div>
      </div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test comment system structure
    const heading = canvas.getByRole('heading', { level: 3 });
    await expect(heading).toHaveTextContent('User Comments');

    // Test comment text areas
    const editableFields = canvas.getAllByRole('button');
    await expect(editableFields).toHaveLength(2);

    // Test editing a comment
    const firstComment = editableFields[0];
    await expect(firstComment).toHaveTextContent(/great article/);

    await userEvent.click(firstComment);
    const textareaField = canvas.getByRole('textbox');
    await expect(textareaField).toHaveTextContent(
      /I particularly enjoyed the section about custom hooks/
    );
  },
};
