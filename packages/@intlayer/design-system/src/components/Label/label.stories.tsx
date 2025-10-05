import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';
import { Label } from './';

/**
 * Label Component Stories
 *
 * The Label component provides accessible labeling for form controls, establishing
 * proper relationships between labels and their associated form elements. It includes
 * visual indicators for required and disabled states with full accessibility support.
 *
 * ## Key Features
 * - **Semantic HTML**: Uses proper <label> element for accessibility
 * - **Form Association**: Creates accessible relationship via htmlFor/id
 * - **Visual Indicators**: Shows required (*) and disabled states
 * - **Click-to-Focus**: Automatically focuses associated form control when clicked
 * - **Screen Reader Support**: Proper ARIA relationships and announcements
 *
 * ## When to Use
 * - All form input fields (text, email, password, etc.)
 * - Checkboxes and radio buttons
 * - Select dropdowns and textareas
 * - Custom form controls that need accessible labeling
 * - Any interactive form element that needs description
 */
const meta = {
  title: 'Components/Label',
  component: Label,
  parameters: {
    docs: {
      description: {
        component: `
A semantic form label component that provides accessible labeling for form controls.

### Accessibility Features:
- **Semantic HTML**: Uses native <label> element for proper screen reader support
- **Form Association**: Creates accessible relationship between label and control via htmlFor/id
- **Click-to-Focus**: Clicking the label automatically focuses the associated form control
- **Visual Indicators**: Clear visual cues for required and disabled states
- **Screen Reader Support**: Proper announcements for required fields and disabled states

### Visual States:
- **Default**: Standard label styling with medium font weight
- **Required**: Includes red asterisk (*) with accessible title and ARIA label
- **Disabled**: Reduced opacity and disabled cursor for associated disabled controls
- **Custom**: Supports custom styling while maintaining accessibility

### Form Integration:
- Works with all HTML form elements (input, select, textarea)
- Supports custom form controls when properly associated via ID
- Maintains focus management and keyboard navigation
- Provides visual feedback for form validation states
        `,
      },
    },
    a11y: {
      config: {
        rules: [
          {
            id: 'label',
            enabled: true,
          },
          {
            id: 'label-title-only',
            enabled: true,
          },
        ],
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      description: 'Text content of the label',
      control: 'text',
    },
    htmlFor: {
      description: 'ID of the associated form control',
      control: 'text',
    },
    required: {
      description: 'Whether the associated form control is required',
      control: 'boolean',
    },
    disabled: {
      description: 'Whether the associated form control is disabled',
      control: 'boolean',
    },
    className: {
      description: 'Additional CSS classes for custom styling',
      control: 'text',
    },
  },
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof Label>;

/**
 * ## Basic Examples
 *
 * These stories demonstrate the core functionality of the Label component
 * in common form scenarios.
 */

/**
 * ### Default Label
 *
 * Basic label usage with an associated text input. Click the label to focus the input.
 */
export const Default: Story = {
  args: {
    children: 'Email Address',
    htmlFor: 'email-input',
  },
  render: (args) => (
    <div className="space-y-2">
      <Label {...args} />
      <input
        id={args.htmlFor}
        type="email"
        className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Enter your email"
      />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const label = canvas.getByText('Email Address');
    const input = canvas.getByRole('textbox');

    // Test initial state
    await expect(label).toBeInTheDocument();
    await expect(input).toBeInTheDocument();
    await expect(input).not.toHaveFocus();

    // Test click-to-focus behavior
    await userEvent.click(label);
    await expect(input).toHaveFocus();
  },
};

/**
 * ### Required Field
 *
 * Label for a required form field with visual indicator and accessibility support.
 */
export const RequiredField: Story = {
  args: {
    children: 'Password',
    htmlFor: 'password-input',
    required: true,
  },
  render: (args) => (
    <div className="space-y-2">
      <Label {...args} />
      <input
        id={args.htmlFor}
        type="password"
        required
        className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Enter your password"
      />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const label = canvas.getByText(/password/i);
    const requiredIndicator = canvas.getByTitle('This field is required');
    const input = canvas.getByLabelText(/password/i);

    // Test required indicator
    await expect(requiredIndicator).toBeInTheDocument();
    await expect(requiredIndicator).toHaveTextContent('*');
    await expect(requiredIndicator).toHaveAttribute('aria-label', 'required');

    // Test form association
    await expect(input).toHaveAttribute('required');

    // Test click behavior
    await userEvent.click(label);
    await expect(input).toHaveFocus();
  },
};

/**
 * ### Disabled Field
 *
 * Label for a disabled form field with appropriate visual styling.
 */
export const DisabledField: Story = {
  args: {
    children: 'Disabled Field',
    htmlFor: 'disabled-input',
    disabled: true,
  },
  render: (args) => (
    <div className="space-y-2">
      <Label {...args} />
      <input
        id={args.htmlFor}
        type="text"
        disabled
        className="w-full cursor-not-allowed rounded-md border border-gray-300 bg-gray-100 px-3 py-2"
        placeholder="This field is disabled"
      />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const label = canvas.getByText('Disabled Field');
    const input = canvas.getByRole('textbox');

    // Test disabled state
    await expect(input).toBeDisabled();

    // Label should have disabled styling but still be clickable
    await expect(label).toBeInTheDocument();

    // Clicking disabled label shouldn't focus the input
    await userEvent.click(label);
    await expect(input).not.toHaveFocus();
  },
};

/**
 * ### Custom Styling
 *
 * Label with custom CSS classes for different visual styles.
 */
export const CustomStyling: Story = {
  args: {
    children: 'Custom Styled Label',
    htmlFor: 'custom-input',
    className: 'text-blue-600 font-semibold text-base',
  },
  render: (args) => (
    <div className="space-y-2">
      <Label {...args} />
      <input
        id={args.htmlFor}
        type="text"
        className="w-full rounded-md border border-blue-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Custom styled input"
      />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const label = canvas.getByText('Custom Styled Label');
    const input = canvas.getByRole('textbox');

    // Test custom styling is applied
    await expect(label).toHaveClass(
      'text-blue-600',
      'font-semibold',
      'text-base'
    );

    // Test functionality still works
    await userEvent.click(label);
    await expect(input).toHaveFocus();
  },
};

/**
 * ## Form Control Types
 *
 * Stories showing Label component with different types of form controls.
 */

/**
 * ### Different Form Controls
 *
 * Examples of Label component used with various form control types.
 */
export const DifferentFormControls: Story = {
  render: () => (
    <div className="max-w-md space-y-6">
      {/* Text Input */}
      <div className="space-y-2">
        <Label htmlFor="text-input">Full Name</Label>
        <input
          id="text-input"
          type="text"
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your full name"
        />
      </div>

      {/* Email Input */}
      <div className="space-y-2">
        <Label htmlFor="email-input" required>
          Email Address
        </Label>
        <input
          id="email-input"
          type="email"
          required
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your email"
        />
      </div>

      {/* Select */}
      <div className="space-y-2">
        <Label htmlFor="select-input">Country</Label>
        <select
          id="select-input"
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select a country</option>
          <option value="us">United States</option>
          <option value="ca">Canada</option>
          <option value="uk">United Kingdom</option>
        </select>
      </div>

      {/* Textarea */}
      <div className="space-y-2">
        <Label htmlFor="textarea-input">Message</Label>
        <textarea
          id="textarea-input"
          rows={4}
          className="resize-vertical w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your message"
        />
      </div>

      {/* Checkbox */}
      <div className="flex items-center space-x-2">
        <input
          id="checkbox-input"
          type="checkbox"
          className="h-4 w-4 rounded border border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500"
        />
        <Label htmlFor="checkbox-input">
          I agree to the terms and conditions
        </Label>
      </div>

      {/* Radio Buttons */}
      <div className="space-y-2">
        <div className="font-medium text-sm">Preferred Contact Method</div>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <input
              id="contact-email"
              type="radio"
              name="contact"
              value="email"
              className="h-4 w-4 border border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500"
            />
            <Label htmlFor="contact-email">Email</Label>
          </div>
          <div className="flex items-center space-x-2">
            <input
              id="contact-phone"
              type="radio"
              name="contact"
              value="phone"
              className="h-4 w-4 border border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500"
            />
            <Label htmlFor="contact-phone">Phone</Label>
          </div>
        </div>
      </div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test text input
    const fullNameLabel = canvas.getByText('Full Name');
    const fullNameInput = canvas.getByPlaceholderText('Enter your full name');
    await userEvent.click(fullNameLabel);
    await expect(fullNameInput).toHaveFocus();

    // Test required field
    const requiredStar = canvas.getByTitle('This field is required');
    await expect(requiredStar).toBeInTheDocument();

    // Test checkbox
    const checkboxLabel = canvas.getByText(
      'I agree to the terms and conditions'
    );
    const checkbox = canvas.getByRole('checkbox');
    await userEvent.click(checkboxLabel);
    await expect(checkbox).toBeChecked();

    // Test radio button
    const radioLabel = canvas.getByText('Email');
    const radioButton = canvas.getByDisplayValue('email');
    await userEvent.click(radioLabel);
    await expect(radioButton).toBeChecked();
  },
};

/**
 * ## Accessibility Testing
 *
 * Stories specifically designed to test and demonstrate accessibility features.
 */

/**
 * ### Screen Reader Support
 *
 * Demonstrates proper screen reader support with ARIA attributes and announcements.
 */
export const ScreenReaderSupport: Story = {
  render: () => (
    <div className="max-w-md space-y-6">
      <div className="mb-4 text-gray-600 text-sm">
        This form demonstrates proper label-control relationships for screen
        readers. Each label is properly associated with its control.
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="username" required>
            Username
          </Label>
          <input
            id="username"
            type="text"
            required
            aria-describedby="username-help"
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your username"
          />
          <div id="username-help" className="text-gray-500 text-xs">
            Username must be at least 3 characters long
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="password-strength" required>
            Password
          </Label>
          <input
            id="password-strength"
            type="password"
            required
            aria-describedby="password-help"
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500"
            placeholder="Enter a strong password"
          />
          <div id="password-help" className="text-gray-500 text-xs">
            Password must contain at least 8 characters, including uppercase,
            lowercase, and numbers
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone-number">Phone Number</Label>
          <input
            id="phone-number"
            type="tel"
            aria-describedby="phone-help"
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500"
            placeholder="(555) 123-4567"
          />
          <div id="phone-help" className="text-gray-500 text-xs">
            Optional. Format: (555) 123-4567
          </div>
        </div>
      </div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test form associations
    const usernameInput = canvas.getByLabelText(/username/i);
    const passwordInput = canvas.getByLabelText(/password/i);
    const phoneInput = canvas.getByLabelText(/phone number/i);

    await expect(usernameInput).toBeInTheDocument();
    await expect(passwordInput).toBeInTheDocument();
    await expect(phoneInput).toBeInTheDocument();

    // Test required fields
    await expect(usernameInput).toHaveAttribute('required');
    await expect(passwordInput).toHaveAttribute('required');
    await expect(phoneInput).not.toHaveAttribute('required');

    // Test ARIA descriptions
    await expect(usernameInput).toHaveAttribute(
      'aria-describedby',
      'username-help'
    );
    await expect(passwordInput).toHaveAttribute(
      'aria-describedby',
      'password-help'
    );
    await expect(phoneInput).toHaveAttribute('aria-describedby', 'phone-help');
  },
};

/**
 * ### Keyboard Navigation
 *
 * Tests keyboard navigation and focus management with labels.
 */
export const KeyboardNavigation: Story = {
  render: () => (
    <form className="max-w-md space-y-4">
      <div className="mb-4 text-gray-600 text-sm">
        Use Tab to navigate between fields. Click any label to focus its
        associated input.
      </div>

      <div className="space-y-2">
        <Label htmlFor="first-name" required>
          First Name
        </Label>
        <input
          id="first-name"
          type="text"
          required
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="last-name" required>
          Last Name
        </Label>
        <input
          id="last-name"
          type="text"
          required
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email-nav">Email</Label>
        <input
          id="email-nav"
          type="email"
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex items-center space-x-2">
        <input
          id="newsletter"
          type="checkbox"
          className="h-4 w-4 rounded border border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500"
        />
        <Label htmlFor="newsletter">Subscribe to newsletter</Label>
      </div>

      <button
        type="submit"
        className="w-full rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:ring-2 focus:ring-blue-500"
      >
        Submit
      </button>
    </form>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test tab navigation
    const firstNameInput = canvas.getByLabelText(/first name/i);
    const lastNameInput = canvas.getByLabelText(/last name/i);
    const emailInput = canvas.getByLabelText('Email');

    // Test initial state
    await expect(firstNameInput).not.toHaveFocus();

    // Tab to first field
    await userEvent.tab();
    await expect(firstNameInput).toHaveFocus();

    // Tab to second field
    await userEvent.tab();
    await expect(lastNameInput).toHaveFocus();

    // Tab to third field
    await userEvent.tab();
    await expect(emailInput).toHaveFocus();

    // Test label clicking
    const firstNameLabel = canvas.getByText(/first name/i);
    await userEvent.click(firstNameLabel);
    await expect(firstNameInput).toHaveFocus();
  },
};

/**
 * ## Real-World Examples
 *
 * Practical examples showing how the component would be used in real applications.
 */

/**
 * ### Registration Form
 *
 * Complete registration form demonstrating various label usages in context.
 */
export const RegistrationForm: Story = {
  render: () => (
    <div className="mx-auto max-w-md rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="mb-6 font-bold text-2xl">Create Account</h2>

      <form className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="reg-first-name" required>
              First Name
            </Label>
            <input
              id="reg-first-name"
              type="text"
              required
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="reg-last-name" required>
              Last Name
            </Label>
            <input
              id="reg-last-name"
              type="text"
              required
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="reg-email" required>
            Email Address
          </Label>
          <input
            id="reg-email"
            type="email"
            required
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500"
            placeholder="you@example.com"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="reg-password" required>
            Password
          </Label>
          <input
            id="reg-password"
            type="password"
            required
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="reg-confirm-password" required>
            Confirm Password
          </Label>
          <input
            id="reg-confirm-password"
            type="password"
            required
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="reg-phone">Phone Number</Label>
          <input
            id="reg-phone"
            type="tel"
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500"
            placeholder="(555) 123-4567"
          />
        </div>

        <div className="flex items-start space-x-2 pt-2">
          <input
            id="reg-terms"
            type="checkbox"
            required
            className="mt-1 h-4 w-4 rounded border border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500"
          />
          <Label
            htmlFor="reg-terms"
            required
            className="text-sm leading-relaxed"
          >
            I agree to the{' '}
            <a href="#" className="text-blue-600 hover:underline">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="#" className="text-blue-600 hover:underline">
              Privacy Policy
            </a>
          </Label>
        </div>

        <div className="flex items-center space-x-2">
          <input
            id="reg-newsletter"
            type="checkbox"
            className="h-4 w-4 rounded border border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500"
          />
          <Label htmlFor="reg-newsletter" className="text-sm">
            Subscribe to our newsletter for updates and promotions
          </Label>
        </div>

        <button
          type="submit"
          className="w-full rounded-md bg-blue-500 px-4 py-2 font-medium text-white hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Create Account
        </button>
      </form>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test form has proper labels
    const requiredFields = [
      'First Name',
      'Last Name',
      'Email Address',
      'Password',
      'Confirm Password',
    ];

    for (const fieldName of requiredFields) {
      const label = canvas.getByText(new RegExp(fieldName, 'i'));
      const requiredStar = label.querySelector('[aria-label="required"]');
      await expect(requiredStar).toBeInTheDocument();
    }

    // Test optional field doesn't have required indicator
    const phoneLabel = canvas.getByText('Phone Number');
    const phoneRequiredStar = phoneLabel.querySelector(
      '[aria-label="required"]'
    );
    await expect(phoneRequiredStar).not.toBeInTheDocument();

    // Test checkbox labels work
    const termsCheckbox = canvas.getByLabelText(/terms of service/i);
    const newsletterCheckbox = canvas.getByLabelText(/newsletter/i);

    await userEvent.click(canvas.getByText(/terms of service/i));
    await expect(termsCheckbox).toBeChecked();

    await userEvent.click(canvas.getByText(/newsletter/i));
    await expect(newsletterCheckbox).toBeChecked();
  },
};
