import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';
import { InputSize, InputVariant } from '../Input';
import { EditableFieldInput } from '.';

/**
 * EditableField Input Component Stories
 *
 * An inline editable input field that provides a seamless editing experience.
 * Displays as read-only text until clicked, then shows an input field with
 * save and cancel actions. Perfect for content management and data entry
 * interfaces where inline editing improves user workflow.
 *
 * ## Key Features
 * - **Inline Editing**: Click-to-edit functionality with instant visual feedback
 * - **Save/Cancel Actions**: Built-in action buttons with clear visual indicators
 * - **Auto-save**: Automatically saves when clicking outside the editing area
 * - **Input Variants**: Supports all input styles (default, outline, invisible)
 * - **Size Options**: Multiple size variants for different UI contexts
 * - **Accessibility**: Full keyboard navigation and screen reader support
 *
 * ## When to Use
 * - Content management systems and admin panels
 * - Profile editing and settings pages
 * - Data tables with inline editing capabilities
 * - Form fields that need quick editing without mode switching
 * - Any scenario where users need to edit text in place
 */
const meta: Meta<typeof EditableFieldInput> = {
  title: 'Components/EditableField/Input',
  component: EditableFieldInput,
  parameters: {
    docs: {
      description: {
        component: `
An inline editable input component that seamlessly transitions between display and edit modes.

### Core Functionality:
- **Display Mode**: Shows the current value as formatted text with an edit icon on hover
- **Edit Mode**: Reveals an input field with save (✓) and cancel (✕) buttons
- **Auto-save**: Clicking outside the component automatically saves the current value
- **Value Management**: Supports both controlled and uncontrolled usage patterns

### Editing Workflow:
1. **Activation**: Click anywhere on the field or the edit icon to enter edit mode
2. **Modification**: Type or modify the text using standard input interactions
3. **Confirmation**: Click the save button (✓) to confirm changes
4. **Cancellation**: Click the cancel button (✕) to revert to the original value
5. **Auto-save**: Click anywhere outside to automatically save changes

### Accessibility Features:
- **Keyboard Navigation**: Full support for Tab, Enter, and Escape key interactions
- **Screen Reader Support**: Proper ARIA labels and role attributes
- **Focus Management**: Clear focus indicators and logical tab order
- **Semantic HTML**: Uses appropriate HTML elements for better accessibility
- **Action Feedback**: Visual and programmatic feedback for save/cancel actions

### Integration Patterns:
- **Form Integration**: Works seamlessly with form libraries and validation
- **State Management**: Compatible with React state management solutions
- **Event Handling**: Provides onSave and onCancel callbacks for custom logic
- **Styling Flexibility**: Supports all input variants and custom CSS classes
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
      description: 'Placeholder text shown when the input is empty',
      control: 'text',
    },
    defaultValue: {
      description: 'Initial value for uncontrolled usage',
      control: 'text',
    },
    value: {
      description: 'Current value for controlled usage',
      control: 'text',
    },
    variant: {
      description: 'Visual style variant of the input field',
      control: 'select',
      options: Object.values(InputVariant),
    },
    size: {
      description: 'Size variant affecting padding and text size',
      control: 'select',
      options: Object.values(InputSize),
    },
    validationStyleEnabled: {
      description: 'Enable validation styling based on form state',
      control: 'boolean',
    },
    disabled: {
      description: 'Disable the entire editable field',
      control: 'boolean',
    },
    required: {
      description: 'Mark the field as required',
      control: 'boolean',
    },
    type: {
      description: 'HTML input type (text, email, password, etc.)',
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'tel', 'url'],
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

type Story = StoryObj<typeof EditableFieldInput>;

/**
 * ## Basic Examples
 *
 * These stories demonstrate the core functionality and common use cases
 * for the EditableField Input component.
 */

/**
 * ### Default State
 *
 * The basic editable input with default styling. Click to edit and see
 * the save/cancel actions appear.
 */
export const Default: Story = {
  args: {
    placeholder: 'Click the edit icon to modify…',
    defaultValue: 'Editable text content',
    variant: InputVariant.DEFAULT,
    validationStyleEnabled: false,
    disabled: false,
  },
  render: (args) => (
    <div className="p-4">
      <EditableFieldInput
        {...args}
        onSave={(value) => {
          console.log('Saved value:', value);
        }}
        onCancel={() => {
          console.log('Edit cancelled');
        }}
      />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test initial display state
    const editableField = canvas.getByRole('button');
    await expect(editableField).toBeInTheDocument();
    await expect(editableField).toHaveTextContent('Editable text content');

    // Test edit mode activation
    await userEvent.click(editableField);

    // Look for the input field
    const inputField = canvas.getByRole('textbox');
    await expect(inputField).toBeInTheDocument();
    await expect(inputField).toHaveValue('Editable text content');

    // Test save button presence
    const saveButton = canvas.getByTestId('editable-field-save-button');
    const cancelButton = canvas.getByTestId('editable-field-cancel-button');
    await expect(saveButton).toBeInTheDocument();
    await expect(cancelButton).toBeInTheDocument();
  },
};

/**
 * ### Input Variants
 *
 * Different visual styles for the input field to match various UI contexts.
 */
export const InputVariants: Story = {
  render: () => (
    <div className="space-y-6 p-4">
      <div>
        <h3 className="text-sm font-medium mb-2">Default Variant</h3>
        <EditableFieldInput
          defaultValue="Default styled input"
          variant={InputVariant.DEFAULT}
          onSave={(value) => console.log('Default saved:', value)}
          onCancel={() => console.log('Default cancelled')}
        />
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">Invisible Variant</h3>
        <EditableFieldInput
          defaultValue="Invisible styled input"
          variant={InputVariant.INVISIBLE}
          onSave={(value) => console.log('Invisible saved:', value)}
          onCancel={() => console.log('Invisible cancelled')}
        />
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">Default Variant</h3>
        <EditableFieldInput
          defaultValue="Default styled input with borders"
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
    await expect(editableFields[0]).toHaveTextContent('Default styled input');
    await expect(editableFields[1]).toHaveTextContent('Invisible styled input');
    await expect(editableFields[2]).toHaveTextContent(
      'Default styled input with borders'
    );
  },
};

/**
 * ### Size Variations
 *
 * Different size options for various UI contexts and importance levels.
 */
export const SizeVariations: Story = {
  render: () => (
    <div className="space-y-4 p-4">
      <div>
        <h4 className="text-sm font-medium mb-2">Medium (Default)</h4>
        <EditableFieldInput
          defaultValue="Medium input text"
          onSave={(value) => console.log('Medium saved:', value)}
        />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-2">Large</h4>
        <EditableFieldInput
          defaultValue="Large input text"
          onSave={(value) => console.log('Large saved:', value)}
        />
      </div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const editableFields = canvas.getAllByRole('button');
    await expect(editableFields).toHaveLength(2);

    // Test each size variant
    for (const field of editableFields) {
      await expect(field).toBeInTheDocument();
      await expect(field).toHaveTextContent(/input text/);
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
 * How the component behaves when no value is provided, showing placeholder text.
 */
export const EmptyState: Story = {
  args: {
    placeholder: 'Click to add content...',
    defaultValue: '',
  },
  render: (args) => (
    <div className="p-4">
      <EditableFieldInput
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

    // Check placeholder is shown in input
    const inputField = canvas.getByRole('textbox');
    await expect(inputField).toHaveAttribute(
      'placeholder',
      'Click to add content...'
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
    defaultValue: 'This content cannot be edited',
    disabled: true,
  },
  render: (args) => (
    <div className="p-4">
      <EditableFieldInput
        {...args}
        onSave={(value) => console.log('Disabled saved:', value)}
        onCancel={() => console.log('Disabled cancelled')}
      />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const editableField = canvas.getByRole('button');
    await expect(editableField).toHaveTextContent(
      'This content cannot be edited'
    );

    // Test that clicking doesn't activate edit mode
    await userEvent.click(editableField);

    // Should not have input field
    const inputFields = canvas.queryAllByRole('textbox');
    await expect(inputFields).toHaveLength(1);
  },
};

/**
 * ### Long Text Content
 *
 * How the component handles longer text content and overflow scenarios.
 */
export const LongTextContent: Story = {
  args: {
    defaultValue:
      'This is a very long text content that might overflow the container and needs to be handled properly by the editable field component to ensure good user experience.',
  },
  render: (args) => (
    <div className="max-w-md p-4">
      <EditableFieldInput
        {...args}
        onSave={(value) => console.log('Long text saved:', value)}
        onCancel={() => console.log('Long text cancelled')}
      />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const editableField = canvas.getByRole('button');
    await expect(editableField).toHaveTextContent(/very long text content/);

    // Test edit mode with long text
    await userEvent.click(editableField);

    const inputField = canvas.getByRole('textbox');
    await expect(inputField).toHaveValue(
      'This is a very long text content that might overflow the container and needs to be handled properly by the editable field component to ensure good user experience.'
    );
  },
};

/**
 * ## Input Types and Validation
 *
 * Stories demonstrating different input types and validation scenarios.
 */

/**
 * ### Email Input Type
 *
 * Using the email input type with proper validation styling.
 */
export const EmailInputType: Story = {
  args: {
    type: 'email',
    defaultValue: 'user@example.com',
    placeholder: 'Enter email address...',
    validationStyleEnabled: true,
  },
  render: (args) => (
    <div className="p-4">
      <label className="block text-sm font-medium mb-2">Email Address</label>
      <EditableFieldInput
        {...args}
        onSave={(value) => console.log('Email saved:', value)}
        onCancel={() => console.log('Email cancelled')}
      />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const editableField = canvas.getByRole('button');
    await expect(editableField).toHaveTextContent('user@example.com');

    // Test email input type
    await userEvent.click(editableField);

    const inputField = canvas.getByRole('textbox');
    await expect(inputField).toHaveAttribute('type', 'email');
  },
};

/**
 * ### Required Field
 *
 * Demonstration of required field behavior and validation.
 */
export const RequiredField: Story = {
  args: {
    defaultValue: 'Required content',
    required: true,
    validationStyleEnabled: true,
  },
  render: (args) => (
    <div className="p-4">
      <label className="block text-sm font-medium mb-2">
        Required Field <span className="text-red-500">*</span>
      </label>
      <EditableFieldInput
        {...args}
        onSave={(value) => console.log('Required saved:', value)}
        onCancel={() => console.log('Required cancelled')}
      />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const editableField = canvas.getByRole('button');
    await userEvent.click(editableField);

    const inputField = canvas.getByRole('textbox');
    await expect(inputField).toHaveAttribute('required');
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
 * Full keyboard accessibility testing including Tab, Enter, and Escape keys.
 */
export const KeyboardNavigation: Story = {
  render: () => (
    <div className="space-y-4 p-4">
      <div className="text-sm text-gray-600 mb-4 p-3 bg-blue-50 rounded-lg">
        <p className="font-medium mb-1">Keyboard Navigation Test:</p>
        <ul className="text-xs space-y-1">
          <li>• Tab: Navigate between fields</li>
          <li>• Tab in edit mode: Navigate to save/cancel buttons</li>
        </ul>
      </div>

      <EditableFieldInput
        defaultValue="First editable field"
        onSave={(value) => console.log('First saved:', value)}
        onCancel={() => console.log('First cancelled')}
      />

      <EditableFieldInput
        defaultValue="Second editable field"
        onSave={(value) => console.log('Second saved:', value)}
        onCancel={() => console.log('Second cancelled')}
      />

      <EditableFieldInput
        defaultValue="Third editable field"
        onSave={(value) => console.log('Third saved:', value)}
        onCancel={() => console.log('Third cancelled')}
      />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const editableFields = canvas.getAllByRole('button');
    await expect(editableFields).toHaveLength(3);

    // Test keyboard navigation
    const firstField = editableFields[0];
    await userEvent.click(firstField);
    await userEvent.keyboard('{Tab}');

    // Should focus on first action button (save)
  },
};

/**
 * ## Real-world Examples
 *
 * Practical examples showing the component in realistic usage scenarios.
 */

/**
 * ### User Profile Form
 *
 * Example of using editable fields in a user profile editing context.
 */
export const UserProfileForm: Story = {
  render: () => (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg border border-gray-200">
      <h2 className="text-lg font-semibold mb-6">User Profile</h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Full Name
          </label>
          <EditableFieldInput
            defaultValue="John Doe"
            placeholder="Enter your full name"
            onSave={(value) => console.log('Name updated:', value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <EditableFieldInput
            type="email"
            defaultValue="john.doe@example.com"
            placeholder="Enter your email"
            validationStyleEnabled={true}
            onSave={(value) => console.log('Email updated:', value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Job Title
          </label>
          <EditableFieldInput
            defaultValue="Senior Developer"
            placeholder="Enter your job title"
            onSave={(value) => console.log('Title updated:', value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number
          </label>
          <EditableFieldInput
            type="tel"
            defaultValue="+1 (555) 123-4567"
            placeholder="Enter your phone number"
            onSave={(value) => console.log('Phone updated:', value)}
          />
        </div>
      </div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test form structure
    const heading = canvas.getByRole('heading', { level: 2 });
    await expect(heading).toHaveTextContent('User Profile');

    // Test all fields are present
    const editableFields = canvas.getAllByRole('button');
    await expect(editableFields).toHaveLength(4);

    // Test editing one field
    const nameField = editableFields[0];
    await expect(nameField).toHaveTextContent('John Doe');

    await userEvent.click(nameField);
    const inputField = canvas.getByRole('textbox');
    await expect(inputField).toHaveValue('John Doe');
  },
};

/**
 * ### Content Management Table
 *
 * Example showing inline editing within a data table context.
 */
export const ContentManagementTable: Story = {
  render: () => (
    <div className="p-6">
      <h3 className="text-lg font-medium mb-4">Content Management</h3>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 rounded-lg">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                Title
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                Author
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr>
              <td className="px-4 py-3">
                <EditableFieldInput
                  defaultValue="Getting Started Guide"
                  variant={InputVariant.INVISIBLE}
                  onSave={(value) => console.log('Title updated:', value)}
                />
              </td>
              <td className="px-4 py-3">
                <EditableFieldInput
                  defaultValue="Jane Smith"
                  variant={InputVariant.INVISIBLE}
                  onSave={(value) => console.log('Author updated:', value)}
                />
              </td>
              <td className="px-4 py-3">
                <EditableFieldInput
                  defaultValue="Published"
                  variant={InputVariant.INVISIBLE}
                  onSave={(value) => console.log('Status updated:', value)}
                />
              </td>
            </tr>
            <tr>
              <td className="px-4 py-3">
                <EditableFieldInput
                  defaultValue="API Documentation"
                  variant={InputVariant.INVISIBLE}
                  onSave={(value) => console.log('Title updated:', value)}
                />
              </td>
              <td className="px-4 py-3">
                <EditableFieldInput
                  defaultValue="Mike Johnson"
                  variant={InputVariant.INVISIBLE}
                  onSave={(value) => console.log('Author updated:', value)}
                />
              </td>
              <td className="px-4 py-3">
                <EditableFieldInput
                  defaultValue="Draft"
                  variant={InputVariant.INVISIBLE}
                  onSave={(value) => console.log('Status updated:', value)}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test table structure
    const table = canvas.getByRole('table');
    await expect(table).toBeInTheDocument();

    // Test editable fields in table
    const editableFields = canvas.getAllByRole('button');
    await expect(editableFields).toHaveLength(6); // 2 rows × 3 columns

    // Test editing a table cell
    const firstTitle = editableFields[0];
    await expect(firstTitle).toHaveTextContent('Getting Started Guide');

    await userEvent.click(firstTitle);
    const inputField = canvas.getByRole('textbox');
    await expect(inputField).toHaveValue('Getting Started Guide');
  },
};
