import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';
import { useState } from 'react';
import { Select } from '.';
import { SelectContentPosition } from './Select';

/**
 * Select Component Stories
 *
 * The Select component provides a comprehensive dropdown selection interface built on Radix UI
 * primitives. It offers extensive customization options, accessibility features, and seamless
 * integration with form validation and design systems.
 *
 * ## Key Features
 * - **Accessibility First**: Full keyboard navigation, screen reader support, and ARIA compliance
 * - **Flexible Positioning**: Multiple strategies for optimal dropdown placement
 * - **Validation Integration**: Visual feedback for form validation states
 * - **Rich Content**: Support for icons, labels, separators, and complex layouts
 * - **Design System**: Consistent theming with design tokens and style variants
 * - **Responsive**: Works seamlessly across desktop and mobile devices
 *
 * ## When to Use
 * - Form field selections (theme, language, category, country)
 * - Settings and configuration interfaces
 * - Filter and sort controls in data tables
 * - User preference selections
 * - Any single-choice dropdown requirement
 */
const meta: Meta<typeof Select> = {
  title: 'Components/Select',
  component: Select,
  parameters: {
    docs: {
      description: {
        component: `
A comprehensive dropdown selection component with advanced functionality.

### Accessibility Features:
- **Keyboard Navigation**: Arrow keys for option navigation, Enter to select, Escape to close
- **Screen Reader Support**: Proper ARIA labels, roles, and state announcements
- **Focus Management**: Clear focus indicators and logical tab flow
- **High Contrast**: Supports system accessibility preferences

### Component Architecture:
- **Compound Pattern**: Composed of multiple subcomponents for flexibility
- **Context-Based**: Internal state management with React context
- **Portal Rendering**: Dropdown renders in document portal for z-index management
- **Event Handling**: Comprehensive keyboard, mouse, and touch support

### Styling System:
- **Design Tokens**: Consistent colors, spacing, and typography
- **State Variants**: Visual feedback for hover, focus, selected, and disabled states
- **Validation Styling**: Automatic error/success states based on form validation
- **Responsive Design**: Adapts layout and behavior for different screen sizes
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
    defaultValue: {
      description: 'The default selected value',
      control: 'text',
    },
    value: {
      description: 'The controlled selected value',
      control: 'text',
    },
    onValueChange: {
      description: 'Callback fired when selection changes',
      action: 'value changed',
    },
    disabled: {
      description: 'Whether the select is disabled',
      control: 'boolean',
    },
    required: {
      description: 'Whether the select is required in forms',
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof Select>;

/**
 * ## Basic Examples
 *
 * These stories demonstrate the core functionality and common usage patterns of the Select component.
 */

/**
 * ### Default Behavior
 *
 * Basic select with theme options. Demonstrates the standard usage pattern
 * with placeholder text and simple string values.
 */
export const Default: Story = {
  render: () => (
    <div className="w-80">
      <Select defaultValue="system">
        <Select.Trigger>
          <Select.Value placeholder="Select a theme" />
        </Select.Trigger>
        <Select.Content>
          <Select.Item value="light">☀️ Light</Select.Item>
          <Select.Item value="dark">🌙 Dark</Select.Item>
          <Select.Item value="system">⚙️ System</Select.Item>
        </Select.Content>
      </Select>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole('combobox');

    await expect(trigger).toBeInTheDocument();
    await expect(trigger).toHaveAttribute('aria-expanded', 'false');

    // Test opening the select
    await userEvent.click(trigger);
    await expect(trigger).toHaveAttribute('aria-expanded', 'true');
  },
};

/**
 * ### Controlled Selection
 *
 * Example showing external state control where the parent component
 * manages the selected value through state.
 */
export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState<string>('');

    return (
      <div className="space-y-4">
        <div className="w-80">
          <Select value={value} onValueChange={setValue}>
            <Select.Trigger>
              <Select.Value placeholder="Choose your language" />
            </Select.Trigger>
            <Select.Content>
              <Select.Item value="en">🇺🇸 English</Select.Item>
              <Select.Item value="es">🇪🇸 Spanish</Select.Item>
              <Select.Item value="fr">🇫🇷 French</Select.Item>
              <Select.Item value="de">🇩🇪 German</Select.Item>
              <Select.Item value="ja">🇯🇵 Japanese</Select.Item>
            </Select.Content>
          </Select>
        </div>

        <div className="text-sm text-gray-600">
          Selected value: <strong>{value || 'None'}</strong>
        </div>

        <div className="flex gap-2">
          <button
            className="text-xs bg-blue-500 text-white px-2 py-1 rounded"
            onClick={() => setValue('en')}
          >
            Set English
          </button>
          <button
            className="text-xs bg-gray-500 text-white px-2 py-1 rounded"
            onClick={() => setValue('')}
          >
            Clear
          </button>
        </div>
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole('combobox');
    const clearButton = canvas.getByText('Clear');

    // Test that controlled value can be cleared
    await userEvent.click(clearButton);
    await expect(trigger).toHaveAttribute('data-placeholder');
  },
};

/**
 * ## Advanced Features
 *
 * Stories showcasing advanced functionality and configuration options.
 */

/**
 * ### Grouped Options with Labels
 *
 * Demonstrates organization of options into logical groups with labels and separators
 * for improved usability in complex selection scenarios.
 */
export const GroupedOptions: Story = {
  render: () => (
    <div className="w-80">
      <Select>
        <Select.Trigger>
          <Select.Value placeholder="Choose a framework" />
        </Select.Trigger>
        <Select.Content>
          <Select.Label>Frontend Frameworks</Select.Label>
          <Select.Item value="react">⚛️ React</Select.Item>
          <Select.Item value="vue">💚 Vue.js</Select.Item>
          <Select.Item value="angular">🔴 Angular</Select.Item>
          <Select.Item value="svelte">🧡 Svelte</Select.Item>

          <Select.Separator />

          <Select.Label>Backend Frameworks</Select.Label>
          <Select.Item value="nodejs">💚 Node.js</Select.Item>
          <Select.Item value="django">🐍 Django</Select.Item>
          <Select.Item value="rails">💎 Rails</Select.Item>
          <Select.Item value="laravel">🚀 Laravel</Select.Item>

          <Select.Separator />

          <Select.Label>Mobile Development</Select.Label>
          <Select.Item value="react-native">📱 React Native</Select.Item>
          <Select.Item value="flutter">🎯 Flutter</Select.Item>
          <Select.Item value="ionic">⚡ Ionic</Select.Item>
        </Select.Content>
      </Select>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole('combobox');

    await userEvent.click(trigger);

    // Check that groups are properly labeled (these will be in the document but not easily testable in stories)
    await expect(trigger).toHaveAttribute('aria-expanded', 'true');
  },
};

/**
 * ### Form Validation States
 *
 * Shows how the select integrates with form validation, displaying different
 * visual states based on validation status.
 */
export const ValidationStates: Story = {
  render: () => {
    const [country, setCountry] = useState<string>('');
    const [showValidation, setShowValidation] = useState(false);

    const isValid = country !== '';
    const isInvalid = showValidation && !isValid;

    return (
      <form className="space-y-6 w-80">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Country (Required) *
            </label>
            <Select value={country} onValueChange={setCountry} required>
              <Select.Trigger
                validationStyleEnabled
                aria-invalid={isInvalid}
                className={
                  isInvalid
                    ? 'border-red-500'
                    : isValid && showValidation
                      ? 'border-green-500'
                      : ''
                }
              >
                <Select.Value placeholder="Select your country" />
              </Select.Trigger>
              <Select.Content position={SelectContentPosition.ITEM_ALIGNED}>
                <Select.Item value="us">🇺🇸 United States</Select.Item>
                <Select.Item value="ca">🇨🇦 Canada</Select.Item>
                <Select.Item value="uk">🇬🇧 United Kingdom</Select.Item>
                <Select.Item value="au">🇦🇺 Australia</Select.Item>
                <Select.Item value="de">🇩🇪 Germany</Select.Item>
                <Select.Item value="fr">🇫🇷 France</Select.Item>
                <Select.Item value="jp">🇯🇵 Japan</Select.Item>
              </Select.Content>
            </Select>

            {isInvalid && (
              <p className="text-red-500 text-xs mt-1">
                Please select a country
              </p>
            )}
            {isValid && showValidation && (
              <p className="text-green-500 text-xs mt-1">Valid selection ✓</p>
            )}
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              className="bg-blue-500 text-white px-4 py-2 rounded text-sm hover:bg-blue-600"
              onClick={() => setShowValidation(true)}
            >
              Validate Form
            </button>
            <button
              type="button"
              className="bg-gray-500 text-white px-4 py-2 rounded text-sm hover:bg-gray-600"
              onClick={() => {
                setCountry('');
                setShowValidation(false);
              }}
            >
              Reset
            </button>
          </div>

          <div className="text-sm space-y-1">
            <div>
              Selected: <strong>{country || 'None'}</strong>
            </div>
            <div>
              Valid: <strong>{isValid ? 'Yes' : 'No'}</strong>
            </div>
            <div>
              Validation shown: <strong>{showValidation ? 'Yes' : 'No'}</strong>
            </div>
          </div>
        </div>
      </form>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole('combobox');
    const validateButton = canvas.getByText('Validate Form');

    // Test validation flow
    await userEvent.click(validateButton);

    // Should show validation state
    await expect(trigger).toHaveAttribute('aria-invalid', 'true');
  },
};

/**
 * ### Disabled State
 *
 * Demonstrates the disabled state with proper accessibility attributes
 * and visual styling.
 */
export const Disabled: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <div>
        <label className="block text-sm font-medium mb-2">
          Available Options
        </label>
        <Select defaultValue="option2">
          <Select.Trigger>
            <Select.Value />
          </Select.Trigger>
          <Select.Content>
            <Select.Item value="option1">Option 1</Select.Item>
            <Select.Item value="option2">Option 2</Select.Item>
            <Select.Item value="option3">Option 3</Select.Item>
          </Select.Content>
        </Select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2 text-gray-500">
          Disabled Selection
        </label>
        <Select disabled>
          <Select.Trigger>
            <Select.Value placeholder="Cannot interact with this" />
          </Select.Trigger>
          <Select.Content>
            <Select.Item value="disabled1">Disabled 1</Select.Item>
            <Select.Item value="disabled2">Disabled 2</Select.Item>
          </Select.Content>
        </Select>
      </div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const triggers = canvas.getAllByRole('combobox');
    const disabledTrigger = triggers[1];

    await expect(disabledTrigger).toBeDisabled();
    await expect(disabledTrigger).toHaveAttribute('aria-disabled', 'true');
  },
};
