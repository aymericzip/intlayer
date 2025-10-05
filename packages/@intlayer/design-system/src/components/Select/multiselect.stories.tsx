import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';
import { useState } from 'react';
import { MultiSelect } from '.';

/**
 * MultiSelect Component Stories
 *
 * The MultiSelect component provides a comprehensive multi-selection interface with search functionality,
 * keyboard navigation, and visual feedback through badges. Built on Command component primitives,
 * it offers an intuitive way to handle complex selection scenarios.
 *
 * ## Key Features
 * - **Multi-Selection**: Select multiple values with instant visual feedback
 * - **Search & Filter**: Real-time filtering of options as you type
 * - **Keyboard Navigation**: Full arrow key navigation with optional looping
 * - **Badge Display**: Selected items shown as removable badges
 * - **Accessibility**: Screen reader support and comprehensive ARIA attributes
 * - **Flexible State**: Both controlled and uncontrolled usage patterns
 *
 * ## When to Use
 * - Tag/category selection in content management
 * - Multi-user assignment in project management
 * - Permission/feature selection in settings
 * - Filter selection in search and data interfaces
 * - Skills/interests selection in profiles
 * - Any scenario requiring multiple choice selection
 */
const meta: Meta<typeof MultiSelect> = {
  title: 'Components/MultiSelect',
  component: MultiSelect,
  parameters: {
    docs: {
      description: {
        component: `
A powerful multi-selection component with search and filtering capabilities.

### Accessibility Features:
- **Keyboard Navigation**: Arrow keys for navigation, Enter to select/deselect
- **Search Integration**: Real-time filtering with screen reader announcements
- **Badge Management**: Backspace and Delete keys for removing selections
- **Focus Management**: Clear focus indicators and logical tab flow
- **ARIA Support**: Proper roles, labels, and state announcements

### Interaction Patterns:
- **Type to Search**: Filter options by typing in the input field
- **Click to Select**: Click options to add/remove from selection
- **Badge Removal**: Click X on badges or use keyboard shortcuts
- **Keyboard Navigation**: Arrow keys move through options, Enter selects

### State Management:
- **Controlled**: Use \`values\` and \`onValueChange\` props for external state
- **Uncontrolled**: Use \`defaultValues\` for internal state management
- **Real-time Updates**: Selection changes immediately update the UI

### Use Cases:
- Multi-user assignment interfaces
- Tag and category selection
- Permission and feature toggles
- Advanced filtering systems
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
    values: {
      description: 'Array of selected values (controlled mode)',
      control: false,
    },
    defaultValues: {
      description: 'Default selected values (uncontrolled mode)',
      control: { type: 'object' },
    },
    onValueChange: {
      description: 'Callback fired when selection changes',
      action: 'values changed',
    },
    loop: {
      description: 'Whether keyboard navigation loops through options',
      control: 'boolean',
    },
  },
} satisfies Meta<typeof MultiSelect>;

export default meta;
type Story = StoryObj<typeof MultiSelect>;

/**
 * ## Basic Examples
 *
 * These stories demonstrate the core functionality and common usage patterns of MultiSelect.
 */

/**
 * ### Default Behavior
 *
 * Basic multi-select with framework options. Shows the standard usage pattern
 * with search functionality and badge display.
 */
export const Default: Story = {
  render: () => {
    const [values, setValues] = useState<string[]>(['react']);

    const handleValueChange = (newValues: string[] | string): void => {
      setValues(Array.isArray(newValues) ? newValues : [newValues]);
    };

    return (
      <div className="w-80">
        <MultiSelect values={values} onValueChange={handleValueChange}>
          <MultiSelect.Trigger>
            <MultiSelect.Input placeholder="Select frameworks..." />
          </MultiSelect.Trigger>
          <MultiSelect.Content>
            <MultiSelect.List>
              <MultiSelect.Item value="react">⚛️ React</MultiSelect.Item>
              <MultiSelect.Item value="vue">💚 Vue.js</MultiSelect.Item>
              <MultiSelect.Item value="svelte">🧡 Svelte</MultiSelect.Item>
              <MultiSelect.Item value="angular">🔴 Angular</MultiSelect.Item>
              <MultiSelect.Item value="solid">🔷 SolidJS</MultiSelect.Item>
            </MultiSelect.List>
          </MultiSelect.Content>
        </MultiSelect>

        <div className="mt-4 text-gray-600 text-sm">
          Selected: <strong>{values.length}</strong> framework
          {values.length !== 1 ? 's' : ''}
        </div>
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('combobox');

    await expect(input).toBeInTheDocument();
    await expect(input).toHaveAttribute('placeholder', 'Select frameworks...');
  },
};
