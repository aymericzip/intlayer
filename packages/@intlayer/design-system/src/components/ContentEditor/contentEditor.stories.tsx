import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';
import { useState } from 'react';
import { Button, ButtonColor, ButtonSize, ButtonVariant } from '../Button';
import type { InputProps } from '../Input';
import { ContentEditor, ContentEditorInput } from './';

/**
 * ContentEditor Component Stories
 *
 * The ContentEditor components provide inline editing capabilities for both
 * single-line inputs and multi-line text areas. They offer intuitive editing
 * experiences with validation, keyboard shortcuts, and accessibility features.
 *
 * ## Key Features
 * - **Inline Editing**: Edit content directly in place with visual feedback
 * - **Validation Support**: Optional content validation with error states
 * - **Keyboard Shortcuts**: Enter to save, Escape to cancel, Ctrl+Enter for textarea
 * - **Accessibility**: Full ARIA support and keyboard navigation
 * - **Auto-sizing**: Textarea variant automatically adjusts to content size
 * - **Action Controls**: Clear save/cancel buttons with hover effects
 *
 * ## Components Included
 * - **ContentEditor**: Multi-line text editing with auto-sizing textarea
 * - **ContentEditorInput**: Single-line input editing with validation support
 *
 * ## When to Use
 * - Inline editing of content in tables, cards, or forms
 * - Quick text modifications without modal dialogs
 * - User-generated content editing (comments, descriptions, titles)
 * - Settings and configuration value editing
 * - Content management systems and admin panels
 */
const meta = {
  title: 'Components/ContentEditor',
  component: ContentEditor,
  parameters: {
    docs: {
      description: {
        component: `
Flexible inline editing components for both single-line and multi-line text content.

### ContentEditor Features:
- **Auto-sizing Textarea**: Automatically adjusts height to content
- **Keyboard Shortcuts**: Ctrl+Enter to save, Escape to cancel
- **Visual Feedback**: Check/X icons appear when content is modified
- **Accessibility**: Full ARIA labels and keyboard navigation

### ContentEditorInput Features:
- **Single-line Editing**: Optimized for short text inputs
- **Validation Support**: Optional validation with visual error states
- **Additional Actions**: Support for custom action buttons
- **Enter to Save**: Quick save with Enter key

### Accessibility Features:
- Screen reader announcements for state changes
- Keyboard navigation between edit controls
- ARIA labels and descriptions for all interactive elements
- Visual indicators for validation states
- Focus management during editing

### Use Cases:
- Table cell editing and data grids
- Comment and description editing
- Setting values and configuration
- Content management interfaces
- Quick inline text modifications
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
      description: 'The content to display and edit',
      control: 'text',
    },
    onContentChange: {
      description: 'Callback function called when content is saved',
      action: 'content changed',
    },
    isEditing: {
      description: 'Whether the editor is in editing mode',
      control: 'boolean',
    },
    disabled: {
      description: 'Whether the input is disabled (ContentEditorInput only)',
      control: 'boolean',
    },
    placeholder: {
      description: 'Placeholder text for the input',
      control: 'text',
    },
    'aria-label': {
      description: 'Accessible label for the editor',
      control: 'text',
    },
  },
} satisfies Meta<typeof ContentEditor>;

export default meta;
type Story = StoryObj<typeof ContentEditor>;

/**
 * ## ContentEditor (Textarea) Examples
 *
 * These stories demonstrate the multi-line ContentEditor component capabilities.
 */

/**
 * ### Default ContentEditor
 *
 * The basic multi-line content editor with auto-sizing textarea.
 * Click to edit, type content, and use Ctrl+Enter to save or Escape to cancel.
 */
export const Default: Story = {
  render: () => {
    const [content, setContent] = useState(
      'Click to edit this multi-line content. You can press Ctrl+Enter to save or Escape to cancel.'
    );

    return (
      <div className="max-w-md p-4 border border-gray-200 rounded-lg">
        <h3 className="text-sm font-medium mb-2">Editable Content</h3>
        <ContentEditor
          onContentChange={setContent}
          placeholder="Enter your content here..."
          aria-label="Multi-line content editor"
        >
          {content}
        </ContentEditor>
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const textArea = canvas.getByLabelText(
      /Multi-line/i
    ) as HTMLTextAreaElement;

    // Test initial state
    await expect(textArea).toBeInTheDocument();
    await expect(textArea).toBeVisible();

    // Test editing functionality
    await userEvent.click(textArea);
    await userEvent.clear(textArea);
    await userEvent.type(textArea, 'New test content for the editor');

    // Check that save button appears
    const saveButton = canvas.getByRole('button', { name: /save changes/i });
    await expect(saveButton).toBeInTheDocument();

    // Test save functionality
    await userEvent.click(saveButton);

    // Verify content was updated
    await expect(textArea.value).toBe('New test content for the editor');
  },
};

/**
 * ### ContentEditor with Long Text
 *
 * Demonstrates auto-sizing behavior with longer content that spans multiple lines.
 */
export const WithLongText: Story = {
  render: () => {
    const [content, setContent] =
      useState(`This is a longer piece of content that demonstrates the auto-sizing functionality of the ContentEditor component.

It can handle multiple paragraphs and will automatically adjust its height as you type more content.

You can use Ctrl+Enter to save your changes or press Escape to cancel and revert to the original content.`);

    return (
      <div className="max-w-lg p-4 border border-gray-200 rounded-lg">
        <h3 className="text-sm font-medium mb-2">Long Content Editor</h3>
        <ContentEditor
          onContentChange={setContent}
          placeholder="Enter your long-form content here..."
          aria-label="Long content editor"
        >
          {content}
        </ContentEditor>
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const textArea = canvas.getByLabelText(/long content editor/i);

    await expect(textArea).toBeInTheDocument();
    await expect(textArea.textContent).toContain('longer piece of content');

    // Test that the textarea adjusts to content
    const initialHeight = textArea.getBoundingClientRect().height;
    await expect(initialHeight).toBeGreaterThan(100); // Should be taller due to long content
  },
};

/**
 * ### Keyboard Shortcuts Demo
 *
 * Interactive example showing keyboard shortcuts in action.
 */
export const KeyboardShortcuts: Story = {
  render: () => {
    const [content, setContent] = useState(
      'Try editing this text and use keyboard shortcuts:'
    );

    return (
      <div className="max-w-md p-4 border border-gray-200 rounded-lg">
        <h3 className="text-sm font-medium mb-2">Keyboard Shortcuts</h3>
        <div className="text-xs text-gray-600 mb-3 space-y-1">
          <div>
            •{' '}
            <kbd className="px-1 py-0.5 bg-gray-100 rounded text-xs">
              Ctrl+Enter
            </kbd>{' '}
            - Save changes
          </div>
          <div>
            •{' '}
            <kbd className="px-1 py-0.5 bg-gray-100 rounded text-xs">
              Escape
            </kbd>{' '}
            - Cancel changes
          </div>
          <div>
            • <kbd className="px-1 py-0.5 bg-gray-100 rounded text-xs">Tab</kbd>{' '}
            - Navigate to buttons
          </div>
        </div>
        <ContentEditor
          onContentChange={setContent}
          placeholder="Edit me and try the shortcuts!"
          aria-label="Keyboard shortcuts demo editor"
        >
          {content}
        </ContentEditor>
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const textArea = canvas.getByLabelText(
      /Keyboard shortcuts/i
    ) as HTMLTextAreaElement;

    // Test keyboard interaction
    await userEvent.click(textArea);
    await userEvent.type(textArea, 'Testing keyboard shortcuts!');

    // Test Escape key
    await userEvent.keyboard('{Escape}');

    // Content should revert after Escape
    await expect(textArea.value).not.toContain('abc');
  },
};

/**
 * ## ContentEditorInput Examples
 *
 * These stories demonstrate the single-line ContentEditorInput component.
 */

/**
 * ### Default ContentEditorInput
 *
 * Basic single-line input editor for short text content.
 */
export const InputDefault: Story = {
  render: () => {
    const [value, setValue] = useState('Editable input value');

    return (
      <div className="max-w-md p-4 border border-gray-200 rounded-lg">
        <h3 className="text-sm font-medium mb-2">Editable Input</h3>
        <ContentEditorInput
          onContentChange={(content) => setValue(String(content || ''))}
          placeholder="Enter text here..."
          aria-label="Single-line content editor"
        >
          {value}
        </ContentEditorInput>
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByLabelText(
      /single-line content editor/i
    ) as HTMLInputElement;

    await expect(input).toBeInTheDocument();
    await expect(input.value).toBe('Editable input value');

    // Test editing
    await userEvent.click(input);
    await userEvent.clear(input);
    await userEvent.type(input, 'New input value');

    // Check save button appears
    const saveButton = canvas.getByRole('button', { name: /save changes/i });
    await expect(saveButton).toBeInTheDocument();

    // Test Enter key to save
    await userEvent.keyboard('{Enter}');
  },
};

/**
 * ### Input with Validation
 *
 * ContentEditorInput with validation function that only allows alphanumeric characters.
 */
export const InputWithValidation: Story = {
  render: () => {
    const [value, setValue] = useState('ValidText123');

    const validateAlphanumeric = (content: InputProps['value']) => {
      const text = String(content || '');
      return /^[a-zA-Z0-9\s]*$/.test(text);
    };

    return (
      <div className="max-w-md p-4 border border-gray-200 rounded-lg">
        <h3 className="text-sm font-medium mb-2">Input with Validation</h3>
        <p className="text-xs text-gray-600 mb-3">
          Only alphanumeric characters allowed
        </p>
        <ContentEditorInput
          onContentChange={(content) => setValue(String(content || ''))}
          validate={validateAlphanumeric}
          placeholder="Enter alphanumeric text..."
          aria-label="Validated content input"
        >
          {value}
        </ContentEditorInput>
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByLabelText(
      /validated content input/i
    ) as HTMLInputElement;

    await userEvent.click(input);
    await userEvent.clear(input);

    // Test invalid input (special characters)
    await userEvent.type(input, 'Invalid@Text!');

    // Save button should be disabled due to validation
    const saveButton = canvas.getByRole('button', { name: /save changes/i });
    await expect(saveButton).toBeDisabled();

    // Test valid input
    await userEvent.clear(input);
    await userEvent.type(input, 'ValidText123');
    await expect(saveButton).not.toBeDisabled();
  },
};

/**
 * ### Input with Additional Buttons
 *
 * ContentEditorInput with custom additional action buttons.
 */
export const InputWithAdditionalButtons: Story = {
  render: () => {
    const [value, setValue] = useState('Text with extra actions');

    const handleClear = () => {
      setValue('');
    };

    const handleUppercase = () => {
      setValue((prev) => prev.toUpperCase());
    };

    const additionalButtons = (
      <>
        <Button
          label="Clear text"
          variant={ButtonVariant.OUTLINE}
          color={ButtonColor.DESTRUCTIVE}
          size={ButtonSize.SM}
          onClick={handleClear}
        >
          Clear
        </Button>
        <Button
          label="Convert to uppercase"
          variant={ButtonVariant.OUTLINE}
          color={ButtonColor.PRIMARY}
          size={ButtonSize.SM}
          onClick={handleUppercase}
        >
          UPPER
        </Button>
      </>
    );

    return (
      <div className="max-w-md p-4 border border-gray-200 rounded-lg">
        <h3 className="text-sm font-medium mb-2">Input with Actions</h3>
        <ContentEditorInput
          onContentChange={(content) => setValue(String(content || ''))}
          additionalButtons={additionalButtons}
          placeholder=""
          aria-label="Content input with additional actions"
        >
          {value}
        </ContentEditorInput>
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByLabelText(/Content input with/i);

    await expect(input).toBeInTheDocument();

    // Test additional buttons are present
    const clearButton = canvas.getByRole('button', { name: /clear/i });
    const upperButton = canvas.getByRole('button', {
      name: /UPPER/i,
    });

    await expect(clearButton).toBeInTheDocument();
    await expect(upperButton).toBeInTheDocument();

    await userEvent.click(upperButton);

    await expect(input).toHaveValue('Text with extra actions');

    // Test clear function
    await userEvent.click(clearButton);
  },
};

/**
 * ### Disabled State
 *
 * ContentEditorInput in disabled state.
 */
export const InputDisabled: Story = {
  render: () => {
    const [value, setValue] = useState('This input is disabled');

    return (
      <div className="max-w-md p-4 border border-gray-200 rounded-lg">
        <h3 className="text-sm font-medium mb-2">Disabled Input</h3>
        <ContentEditorInput
          onContentChange={(content) => setValue(String(content || ''))}
          disabled
          placeholder="Disabled input..."
          aria-label="Disabled content input"
        >
          {value}
        </ContentEditorInput>
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByLabelText(/disabled content input/i);

    await expect(input).toBeInTheDocument();
    await expect(input).toBeDisabled();
  },
};

/**
 * ## Accessibility Testing
 *
 * Stories specifically for testing accessibility features.
 */

/**
 * ### ARIA Attributes and Screen Reader Support
 *
 * Demonstrates proper ARIA attributes and screen reader support.
 */
export const AccessibilityDemo: Story = {
  render: () => {
    const [textValue, setTextValue] = useState(
      'Screen reader accessible text content'
    );
    const [inputValue, setInputValue] = useState('Accessible input value');

    return (
      <div className="space-y-6 max-w-lg">
        <div className="p-4 border border-gray-200 rounded-lg">
          <h3 className="text-sm font-medium mb-2">
            ContentEditor Accessibility
          </h3>
          <ContentEditor
            onContentChange={setTextValue}
            aria-label="Accessible multi-line text editor"
            aria-describedby="text-editor-help"
          >
            {textValue}
          </ContentEditor>
          <div id="text-editor-help" className="text-xs text-gray-500 mt-1">
            Use Ctrl+Enter to save or Escape to cancel
          </div>
        </div>

        <div className="p-4 border border-gray-200 rounded-lg">
          <h3 className="text-sm font-medium mb-2">
            ContentEditorInput Accessibility
          </h3>
          <ContentEditorInput
            onContentChange={(content) => setInputValue(String(content || ''))}
            validate={(value) => {
              const str = String(value || '');
              return str.length >= 3;
            }}
            aria-label="Accessible single-line input editor"
            aria-describedby="input-editor-help"
          >
            {inputValue}
          </ContentEditorInput>
          <div id="input-editor-help" className="text-xs text-gray-500 mt-1">
            Minimum 3 characters required. Press Enter to save or Escape to
            cancel.
          </div>
        </div>
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test ContentEditor accessibility
    const textEditor = canvas.getByLabelText(
      /accessible multi-line text editor/i
    );
    await expect(textEditor).toHaveAttribute(
      'aria-describedby',
      'text-editor-help'
    );

    // Test ContentEditorInput accessibility
    const inputEditor = canvas.getByLabelText(
      /accessible single-line input editor/i
    );
    await expect(inputEditor).toHaveAttribute(
      'aria-describedby',
      'input-editor-help'
    );

    // Test keyboard navigation
    await userEvent.click(inputEditor);
    await userEvent.clear(inputEditor);
    await userEvent.type(inputEditor, 'Hi'); // Less than 3 chars - should be invalid

    const saveButton = canvas.getByRole('button', { name: /save changes/i });
    await expect(saveButton).toBeDisabled();
    await expect(inputEditor).toHaveAttribute('aria-invalid', 'true');

    // Fix validation
    await userEvent.type(inputEditor, 'Hello');
    await expect(saveButton).not.toBeDisabled();
    await expect(inputEditor).toHaveAttribute('aria-invalid', 'false');
  },
};

/**
 * ## Real-World Examples
 *
 * Practical examples showing common usage patterns.
 */

/**
 * ### Table Cell Editing
 *
 * ContentEditor used for inline table cell editing.
 */
export const TableCellEditing: Story = {
  render: () => {
    const [data, setData] = useState([
      { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Developer' },
      {
        id: 2,
        name: 'Jane Smith',
        email: 'jane@example.com',
        role: 'Designer',
      },
      { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Manager' },
    ]);

    const updateField = (id: number, field: string, value: string) => {
      setData((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, [field]: value } : item
        )
      );
    };

    return (
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-50">
              <th className="border border-gray-300 px-4 py-2 text-left">
                Name
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Email
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Role
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.id}>
                <td className="border border-gray-300 px-2 py-1">
                  <ContentEditorInput
                    onContentChange={(value) =>
                      updateField(row.id, 'name', String(value))
                    }
                    aria-label={`Edit name for row ${row.id}`}
                  >
                    {row.name}
                  </ContentEditorInput>
                </td>
                <td className="border border-gray-300 px-2 py-1">
                  <ContentEditorInput
                    onContentChange={(value) =>
                      updateField(row.id, 'email', String(value))
                    }
                    validate={(value) =>
                      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value))
                    }
                    aria-label={`Edit email for row ${row.id}`}
                  >
                    {row.email}
                  </ContentEditorInput>
                </td>
                <td className="border border-gray-300 px-2 py-1">
                  <ContentEditorInput
                    onContentChange={(value) =>
                      updateField(row.id, 'role', String(value))
                    }
                    aria-label={`Edit role for row ${row.id}`}
                  >
                    {row.role}
                  </ContentEditorInput>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test table editing
    const firstNameInput = canvas.getByLabelText(/edit name for row 1/i);
    await expect(firstNameInput).toBeInTheDocument();

    // Test editing a cell
    await userEvent.click(firstNameInput);
    await userEvent.clear(firstNameInput);
    await userEvent.type(firstNameInput, 'Johnny Doe');

    const saveButton = canvas.getByRole('button', { name: /save changes/i });
    await userEvent.click(saveButton);

    await expect(firstNameInput).toHaveValue('Johnny Doe');
  },
};

/**
 * ### Comment System
 *
 * ContentEditor used for a comment editing system with rich interactions.
 */
export const CommentSystem: Story = {
  render: () => {
    const [comments, setComments] = useState([
      {
        id: 1,
        author: 'Alice',
        content: 'This is a great feature! Love the inline editing.',
        timestamp: '2 hours ago',
      },
      {
        id: 2,
        author: 'Bob',
        content: 'I agree! The keyboard shortcuts make it super efficient.',
        timestamp: '1 hour ago',
      },
    ]);

    const updateComment = (id: number, content: string) => {
      setComments((prev) =>
        prev.map((comment) =>
          comment.id === id ? { ...comment, content } : comment
        )
      );
    };

    return (
      <div className="space-y-4 max-w-2xl">
        <h3 className="text-lg font-semibold">Comments</h3>
        {comments.map((comment) => (
          <div
            key={comment.id}
            className="border border-gray-200 rounded-lg p-4"
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="font-medium">{comment.author}</div>
              <div className="text-sm text-gray-500">{comment.timestamp}</div>
            </div>
            <ContentEditor
              onContentChange={(content) => updateComment(comment.id, content)}
              aria-label={`Edit comment by ${comment.author}`}
              className="min-h-[60px]"
            >
              {comment.content}
            </ContentEditor>
          </div>
        ))}
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test comment editing
    const firstComment = canvas.getByLabelText(/edit comment by alice/i);
    await expect(firstComment).toBeInTheDocument();

    // Test editing
    await userEvent.click(firstComment);
    await userEvent.type(firstComment, ' Updated with more details!');

    // Test save with Ctrl+Enter
    await userEvent.keyboard('{Control>}{Enter}{/Control}');
  },
};
