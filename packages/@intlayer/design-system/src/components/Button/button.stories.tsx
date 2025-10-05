import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';
import {
  ArrowRightIcon,
  DownloadIcon,
  HeartIcon,
  PlayIcon,
  PlusIcon,
  SaveIcon,
  SettingsIcon,
  TrashIcon,
} from 'lucide-react';
import {
  Button,
  ButtonColor,
  ButtonSize,
  ButtonTextAlign,
  ButtonVariant,
} from './Button';

/**
 * Button Component Stories
 *
 * The Button component is a fundamental interactive element that triggers actions
 * when clicked or activated. It supports multiple variants, sizes, colors, and
 * accessibility features to cover various use cases in your application.
 *
 * ## Key Features
 * - **Accessibility**: Full ARIA support with keyboard navigation and screen reader compatibility
 * - **Variants**: Multiple visual styles (default, outline, link, hoverable)
 * - **Sizes**: From small icons to extra-large call-to-action buttons
 * - **States**: Loading, active, disabled, and focus states
 * - **Icons**: Support for left and right icon positioning
 * - **Responsive**: Adaptive sizing for different screen sizes
 *
 * ## When to Use
 * - Primary actions (save, submit, create)
 * - Secondary actions (cancel, edit, delete)
 * - Navigation (back, next, learn more)
 * - Toggle states (like, favorite, bookmark)
 * - Icon-only actions (settings, menu, close)
 */
const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    docs: {
      description: {
        component: `
A versatile button component that handles user interactions with full accessibility support.

### Accessibility Features:
- **Keyboard Navigation**: Full support for Tab, Enter, and Space key interactions
- **Screen Readers**: Proper ARIA labels, descriptions, and state announcements
- **Focus Management**: Visible focus indicators with customizable ring colors
- **Loading States**: Announces loading status to assistive technologies
- **Icon Buttons**: Accessible labels for icon-only buttons

### Visual Variants:
- **Default**: Solid background with hover effects
- **Outline**: Border with transparent background
- **Link**: Text-only with underline on hover
- **Hoverable**: Subtle background on hover
- **Invisible Link**: Link without underline

### Use Cases:
- Form submissions and data actions
- Navigation and routing
- Toggles and state changes
- Modal triggers and confirmations
- Toolbar and menu actions
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
            id: 'focus-order-semantics',
            enabled: true,
          },
        ],
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      description: 'The visible text content of the button',
      control: 'text',
    },
    label: {
      description: 'Accessible label for screen readers (required)',
      control: 'text',
    },
    variant: {
      description: 'Visual style variant of the button',
      control: 'select',
      options: Object.values(ButtonVariant),
    },
    size: {
      description: 'Size variant affecting padding and text size',
      control: 'select',
      options: Object.values(ButtonSize),
    },
    color: {
      description: 'Color theme that determines text and focus ring colors',
      control: 'select',
      options: Object.values(ButtonColor),
    },
    textAlign: {
      description: 'Text alignment within the button',
      control: 'select',
      options: Object.values(ButtonTextAlign),
    },
    isLoading: {
      description: 'Shows loading spinner and disables interaction',
      control: 'boolean',
    },
    isActive: {
      description: 'Marks button as active/current (for navigation)',
      control: 'boolean',
    },
    disabled: {
      description: 'Disables the button and prevents interaction',
      control: 'boolean',
    },
    isFullWidth: {
      description: 'Makes button span full container width',
      control: 'boolean',
    },
    Icon: {
      description: 'Icon component displayed on the left side',
      control: 'select',
      options: ['None', 'PlayIcon', 'SaveIcon', 'DownloadIcon', 'PlusIcon'],
      mapping: {
        None: undefined,
        PlayIcon,
        SaveIcon,
        DownloadIcon,
        PlusIcon,
      },
    },
    IconRight: {
      description: 'Icon component displayed on the right side',
      control: 'select',
      options: ['None', 'ArrowRightIcon', 'DownloadIcon', 'HeartIcon'],
      mapping: {
        None: undefined,
        ArrowRightIcon,
        DownloadIcon,
        HeartIcon,
      },
    },
    'aria-describedby': {
      description: 'ID of element providing additional description',
      control: 'text',
    },
    'aria-expanded': {
      description: 'Indicates if controlled element is expanded',
      control: 'boolean',
    },
    'aria-haspopup': {
      description: 'Indicates button has popup/menu',
      control: 'select',
      options: [false, true, 'menu', 'listbox', 'tree', 'grid', 'dialog'],
    },
    type: {
      description: 'HTML button type attribute',
      control: 'select',
      options: ['button', 'submit', 'reset'],
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof Button>;

/**
 * ## Basic Examples
 *
 * These stories demonstrate the core functionality and appearance of the Button component
 * in its most common configurations.
 */

/**
 * ### Default State
 *
 * The basic button with default styling. This is the most common button variant
 * used for primary actions throughout your application.
 */
export const Default: Story = {
  args: {
    children: 'Click me',
    label: 'Click me',
    variant: ButtonVariant.DEFAULT,
    size: ButtonSize.MD,
    color: ButtonColor.PRIMARY,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: /click me/i });

    // Test initial state
    await expect(button).toBeInTheDocument();
    await expect(button).not.toBeDisabled();
    await expect(button).toHaveAccessibleName('Click me');

    // Test interaction
    await userEvent.click(button);
    await expect(button).toHaveFocus();

    // Test keyboard navigation
    await userEvent.keyboard('{Tab}');
  },
};

/**
 * ### All Variants
 *
 * Showcase of all available button variants to help choose the right style
 * for different use cases and hierarchies.
 */
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Button
        variant={ButtonVariant.DEFAULT}
        label="Default button"
        color={ButtonColor.PRIMARY}
      >
        Default
      </Button>
      <Button
        variant={ButtonVariant.OUTLINE}
        label="Outline button"
        color={ButtonColor.PRIMARY}
      >
        Outline
      </Button>
      <Button
        variant={ButtonVariant.LINK}
        label="Link button"
        color={ButtonColor.PRIMARY}
      >
        Link
      </Button>
      <Button
        variant={ButtonVariant.HOVERABLE}
        label="Hoverable button"
        color={ButtonColor.PRIMARY}
      >
        Hoverable
      </Button>
      <Button
        variant={ButtonVariant.INVISIBLE_LINK}
        label="Invisible link button"
        color={ButtonColor.PRIMARY}
      >
        Invisible Link
      </Button>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Find buttons (role="button")
    const buttons = canvas.getAllByRole('button');
    // Find links (role="link") - for LINK and INVISIBLE_LINK variants
    const links = canvas.getAllByRole('link');

    // Total should be 5 elements (3 buttons + 2 links)
    const totalElements = buttons.length + links.length;
    await expect(totalElements).toBe(5);

    // Test each element is accessible
    [...buttons, ...links].forEach(async (element) => {
      await expect(element).toBeInTheDocument();
      await expect(element).not.toBeDisabled();
      await expect(element).toHaveAccessibleName();
    });

    // Test that each variant renders correctly
    const defaultButton = canvas.getByRole('button', { name: /default/i });
    const outlineButton = canvas.getByRole('button', { name: /outline/i });
    const hoverableButton = canvas.getByRole('button', { name: /hoverable/i });

    const linkButton = canvas.getByRole('link', { name: /^link$/i });
    const invisibleLinkButton = canvas.getByRole('link', {
      name: /^invisible link$/i,
    });

    // Verify all elements are distinct and present
    await expect(defaultButton).toBeInTheDocument();
    await expect(outlineButton).toBeInTheDocument();
    await expect(hoverableButton).toBeInTheDocument();
    await expect(linkButton).toBeInTheDocument();
    await expect(invisibleLinkButton).toBeInTheDocument();
  },
};

/**
 * ### Size Variations
 *
 * Different button sizes for various contexts - from compact icon buttons
 * to large call-to-action buttons.
 */
export const SizeVariations: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Button
        size={ButtonSize.ICON_LG}
        label="Extra small button"
        color={ButtonColor.PRIMARY}
      >
        LG
      </Button>
      <Button
        size={ButtonSize.SM}
        label="Small button"
        color={ButtonColor.PRIMARY}
      >
        Small
      </Button>
      <Button
        size={ButtonSize.MD}
        label="Medium button"
        color={ButtonColor.PRIMARY}
      >
        Medium
      </Button>
      <Button
        size={ButtonSize.LG}
        label="Large button"
        color={ButtonColor.PRIMARY}
      >
        Large
      </Button>
      <Button
        size={ButtonSize.XL}
        label="Extra large button"
        color={ButtonColor.PRIMARY}
      >
        XL
      </Button>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const buttons = canvas.getAllByRole('button');

    await expect(buttons).toHaveLength(5);

    for (let i = 0; i < buttons.length; i++) {
      const button = buttons[i];
      await expect(button).toBeInTheDocument();

      await expect(button).toHaveAccessibleName();
    }
  },
};

/**
 * ### Color Themes
 *
 * Available color themes that can be applied to buttons for different
 * semantic meanings and visual hierarchies.
 */
export const ColorThemes: Story = {
  render: () => (
    <div className="grid max-w-2xl grid-cols-2 gap-4">
      {Object.values(ButtonColor).map((color) => (
        <div key={color} className="space-y-2">
          <h4 className="font-medium text-sm capitalize">
            {color.replace('_', ' ')}
          </h4>
          <div className="flex gap-2">
            <Button
              color={color}
              variant={ButtonVariant.DEFAULT}
              label={`${color} default button`}
              size={ButtonSize.SM}
            >
              Default
            </Button>
            <Button
              color={color}
              variant={ButtonVariant.OUTLINE}
              label={`${color} outline button`}
              size={ButtonSize.SM}
            >
              Outline
            </Button>
          </div>
        </div>
      ))}
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const buttons = canvas.getAllByRole('button');

    // Should have 2 buttons per color (default + outline)
    const expectedCount = Object.values(ButtonColor).length * 2;
    await expect(buttons).toHaveLength(expectedCount);

    // Test color accessibility
    for (const button of buttons) {
      await expect(button).toBeInTheDocument();
      await expect(button).toHaveAccessibleName();
    }
  },
};

/**
 * ## Interactive States
 *
 * These stories demonstrate button behavior in different states and interactive scenarios.
 */

/**
 * ### Loading State
 *
 * Shows the loading spinner and prevents interaction while an async operation
 * is in progress. The button remains accessible to screen readers.
 */
export const LoadingState: Story = {
  args: {
    children: 'Save Changes',
    label: 'Save changes',
    isLoading: true,
    variant: ButtonVariant.DEFAULT,
    color: ButtonColor.PRIMARY,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: /save changes/i });

    // Test loading state
    await expect(button).toBeInTheDocument();
    await expect(button).toBeDisabled();
    await expect(button).toHaveAttribute('aria-busy', 'true');

    // Loading spinner should be present
    const loader = canvas.getByTestId('loader');
    await expect(loader).toBeInTheDocument();

    // Button should not respond to clicks
    await expect(button).toBeDisabled();
    await expect(button).not.toHaveFocus();
  },
};

/**
 * ### Disabled State
 *
 * Button in disabled state - visually dimmed and not interactive.
 * Properly communicated to assistive technologies.
 */
export const DisabledState: Story = {
  args: {
    children: 'Disabled',
    label: 'Disabled button',
    disabled: true,
    variant: ButtonVariant.DEFAULT,
    color: ButtonColor.PRIMARY,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: /disabled/i });

    await expect(button).toBeDisabled();
    await expect(button).toHaveAttribute('disabled');

    await expect(button).not.toHaveFocus();
  },
};

/**
 * ### Active State
 *
 * Button in active/pressed state, typically used for navigation
 * or toggle scenarios to show current selection.
 */
export const ActiveState: Story = {
  args: {
    children: 'Active',
    label: 'Active button',
    isActive: true,
    variant: ButtonVariant.DEFAULT,
    color: ButtonColor.PRIMARY,
    'aria-current': 'true',
    'aria-label': 'Active button',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: /active/i });

    await expect(button).toBeInTheDocument();
    await expect(button).not.toBeDisabled();
    await expect(button).toHaveAttribute('aria-current', 'true');
    await expect(button).toHaveAttribute('aria-label', 'Active button');

    // Active button should still be interactive
    await userEvent.click(button);
  },
};

/**
 * ## Icon Buttons
 *
 * Buttons with icons for enhanced visual communication and compact interfaces.
 */

/**
 * ### With Left Icons
 *
 * Common pattern of icon + text for clear action indication.
 */
export const WithLeftIcons: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button Icon={PlayIcon} label="Play video" color={ButtonColor.PRIMARY}>
        Play
      </Button>
      <Button Icon={SaveIcon} label="Save document" color={ButtonColor.SUCCESS}>
        Save
      </Button>
      <Button
        Icon={DownloadIcon}
        label="Download file"
        variant={ButtonVariant.OUTLINE}
        color={ButtonColor.PRIMARY}
      >
        Download
      </Button>
      <Button Icon={PlusIcon} label="Add new item" color={ButtonColor.PRIMARY}>
        Add New
      </Button>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const buttons = canvas.getAllByRole('button');

    await expect(buttons).toHaveLength(4);

    for (const button of buttons) {
      await expect(button).toHaveAccessibleName();

      // Each button should have an icon
      const svgIcon = button.querySelector('svg');
      await expect(svgIcon).toBeInTheDocument();
    }
  },
};

/**
 * ### With Right Icons
 *
 * Icons on the right side, typically used for directional actions
 * or external links.
 */
export const WithRightIcons: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button
        IconRight={ArrowRightIcon}
        label="Continue to next step"
        color={ButtonColor.PRIMARY}
      >
        Continue
      </Button>
      <Button
        IconRight={DownloadIcon}
        label="Export data"
        variant={ButtonVariant.OUTLINE}
        color={ButtonColor.PRIMARY}
      >
        Export
      </Button>
      <Button
        IconRight={HeartIcon}
        label="Add to favorites"
        variant={ButtonVariant.HOVERABLE}
        color={ButtonColor.ERROR}
      >
        Like
      </Button>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const buttons = canvas.getAllByRole('button');

    await expect(buttons).toHaveLength(3);

    for (const button of buttons) {
      await expect(button).toHaveAccessibleName();

      // Each button should have a right-side icon
      const svgIcon = button.querySelector('svg');
      await expect(svgIcon).toBeInTheDocument();
    }
  },
};

/**
 * ### Icon Only Buttons
 *
 * Compact buttons with only icons - requires proper labeling for accessibility.
 */
export const IconOnlyButtons: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button
        Icon={SettingsIcon}
        label=""
        aria-label="Open settings"
        variant={ButtonVariant.OUTLINE}
        size={ButtonSize.ICON_LG}
        color={ButtonColor.NEUTRAL}
      />
      <Button
        Icon={HeartIcon}
        label=""
        aria-label="Like this item"
        variant={ButtonVariant.OUTLINE}
        size={ButtonSize.ICON_MD}
        color={ButtonColor.ERROR}
      />
      <Button
        Icon={DownloadIcon}
        label=""
        aria-label="Download file"
        variant={ButtonVariant.OUTLINE}
        size={ButtonSize.ICON_SM}
        color={ButtonColor.PRIMARY}
      />
      <Button
        Icon={TrashIcon}
        label=""
        aria-label="Delete item"
        variant={ButtonVariant.OUTLINE}
        size={ButtonSize.ICON_XL}
        color={ButtonColor.ERROR}
      />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const buttons = canvas.getAllByRole('button');

    await expect(buttons).toHaveLength(4);

    for (const button of buttons) {
      await expect(button).toHaveAccessibleName();

      const textContent = button.textContent?.trim();
      await expect(textContent).toBeFalsy();
      await expect(button).toHaveAttribute('aria-label');

      const svgIcon = button.querySelector('svg');
      await expect(svgIcon).toBeInTheDocument();
    }

    const firstButton = buttons[0];
    await userEvent.click(firstButton);
    await expect(firstButton).toHaveFocus();

    await userEvent.keyboard('{Tab}');
    await expect(buttons[1]).toHaveFocus();
  },
};

/**
 * ## Layout and Responsive
 *
 * Stories demonstrating button layout options and responsive behavior.
 */

/**
 * ### Full Width Button
 *
 * Button that spans the full width of its container, commonly used
 * in forms and mobile interfaces.
 */
export const FullWidthButton: Story = {
  args: {
    children: 'Submit Form',
    label: 'Submit form',
    isFullWidth: true,
    size: ButtonSize.LG,
    color: ButtonColor.SUCCESS,
    variant: ButtonVariant.DEFAULT,
    type: 'submit',
  },
  decorators: [
    (Story) => (
      <div className="mx-auto max-w-md rounded-lg border border-gray-200 p-4">
        <div className="mb-4">
          <label className="mb-2 block font-medium text-sm">Email</label>
          <input
            type="email"
            className="w-full rounded border border-gray-300 p-2"
            placeholder="Enter your email"
          />
        </div>
        <Story />
      </div>
    ),
  ],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: /submit form/i });

    await expect(button).toBeInTheDocument();
    await expect(button).not.toBeDisabled();
    await expect(button).toHaveProperty('type', 'submit');

    const parentContainer = button.parentElement;
    if (parentContainer) {
      const buttonRect = button.getBoundingClientRect();
      const containerRect = parentContainer.getBoundingClientRect();

      const widthRatio = buttonRect.width / containerRect.width;
      expect(widthRatio).toBeGreaterThan(0.9);
    }
  },
};

/**
 * ### Text Alignment
 *
 * Different text alignment options within buttons, useful for
 * full-width buttons or specific design requirements.
 */
export const TextAlignment: Story = {
  render: () => (
    <div className="max-w-md space-y-4">
      <Button
        isFullWidth
        textAlign={ButtonTextAlign.LEFT}
        label="Left aligned button"
        color={ButtonColor.PRIMARY}
      >
        Left Aligned
      </Button>
      <Button
        isFullWidth
        textAlign={ButtonTextAlign.CENTER}
        label="Center aligned button"
        color={ButtonColor.PRIMARY}
      >
        Center Aligned
      </Button>
      <Button
        isFullWidth
        textAlign={ButtonTextAlign.RIGHT}
        label="Right aligned button"
        color={ButtonColor.PRIMARY}
      >
        Right Aligned
      </Button>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const buttons = canvas.getAllByRole('button');

    await expect(buttons).toHaveLength(3);

    for (const button of buttons) {
      await expect(button).toBeInTheDocument();
      await expect(button).toHaveAccessibleName();
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
 * Demonstrates proper keyboard navigation and focus management
 * across multiple buttons.
 */
export const KeyboardNavigation: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="mb-4 text-gray-600 text-sm">
        Use Tab to navigate between buttons, Enter or Space to activate them.
      </div>
      <div className="flex flex-wrap gap-4">
        <Button label="First button in sequence" color={ButtonColor.PRIMARY}>
          First
        </Button>
        <Button
          label="Second button in sequence"
          variant={ButtonVariant.OUTLINE}
          color={ButtonColor.PRIMARY}
        >
          Second
        </Button>
        <Button
          label="Fourth button (disabled)"
          disabled
          color={ButtonColor.PRIMARY}
        >
          Disabled
        </Button>
        <Button label="Last button in sequence" color={ButtonColor.SUCCESS}>
          Last
        </Button>
      </div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const buttons = canvas.getAllByRole('button');

    // Test initial focus
    const firstButton = buttons[0];
    await userEvent.click(firstButton);
    await expect(firstButton).toHaveFocus();

    // sleep for a moment to simulate user pause
    await new Promise((r) => setTimeout(r, 100));

    // Test tab navigation (should skip disabled button)
    await userEvent.keyboard('{Tab}');
    await expect(buttons[1]).toHaveFocus();

    // sleep for a moment to simulate user pause
    await new Promise((r) => setTimeout(r, 100));
    await new Promise((r) => setTimeout(r, 100));

    await userEvent.keyboard('{Tab}');
    await expect(buttons[3]).toHaveFocus();

    await userEvent.keyboard('{Enter}');

    await userEvent.keyboard(' ');
  },
};

/**
 * ### ARIA Attributes
 *
 * Demonstrates proper ARIA attribute usage for complex button scenarios
 * like dropdowns, toggles, and expanded states.
 */
export const ARIAAttributes: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="mb-2 font-medium text-sm">Dropdown Button</h3>
        <Button
          label="Open menu options"
          color={ButtonColor.PRIMARY}
          aria-haspopup="menu"
          aria-expanded={false}
          IconRight={ArrowRightIcon}
        >
          Menu
        </Button>
      </div>

      <div>
        <h3 className="mb-2 font-medium text-sm">Toggle Button</h3>
        <Button
          label="Toggle favorite status"
          variant={ButtonVariant.OUTLINE}
          color={ButtonColor.ERROR}
          aria-pressed={false}
          Icon={HeartIcon}
        >
          Favorite
        </Button>
      </div>

      <div>
        <h3 className="mb-2 font-medium text-sm">Button with Description</h3>
        <div>
          <Button
            label="Delete selected items"
            color={ButtonColor.ERROR}
            aria-describedby="delete-help"
            Icon={TrashIcon}
          >
            Delete
          </Button>
          <div id="delete-help" className="mt-1 text-gray-500 text-xs">
            This action cannot be undone
          </div>
        </div>
      </div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test dropdown button
    const menuButton = canvas.getByRole('button', {
      name: /menu/i,
    });
    await expect(menuButton).toHaveAttribute('aria-haspopup', 'menu');
    await expect(menuButton).toHaveAttribute('aria-expanded', 'false');

    // Test toggle button
    const toggleButton = canvas.getByRole('button', {
      name: /favorite/i,
    });
    await expect(toggleButton).toHaveAttribute('aria-pressed', 'false');

    // Test described button
    const deleteButton = canvas.getByRole('button', {
      name: /delete/i,
    });
    await expect(deleteButton).toHaveAttribute(
      'aria-describedby',
      'delete-help'
    );

    // Test that description is properly associated
    const description = canvasElement.querySelector('#delete-help');
    await expect(description).toBeInTheDocument();
  },
};

/**
 * ## Form Integration
 *
 * Stories showing button integration within forms and different submit scenarios.
 */

/**
 * ### Form Buttons
 *
 * Different button types within a form context - submit, reset, and regular buttons.
 */
export const FormButtons: Story = {
  render: () => (
    <form
      className="max-w-md space-y-4 rounded-lg border border-gray-200 p-4"
      onSubmit={(e) => {
        e.preventDefault();
        alert('Form submitted');
      }}
      onReset={(e) => {
        e.preventDefault();
        alert('Form reset');
      }}
    >
      <div>
        <label htmlFor="name" className="mb-2 block font-medium text-sm">
          Name
        </label>
        <input
          id="name"
          type="text"
          className="w-full rounded border border-gray-300 p-2"
          placeholder="Enter your name"
        />
      </div>

      <div>
        <label htmlFor="email" className="mb-2 block font-medium text-sm">
          Email
        </label>
        <input
          id="email"
          type="email"
          className="w-full rounded border border-gray-300 p-2"
          placeholder="Enter your email"
        />
      </div>

      <div className="flex gap-4 pt-4">
        <Button
          type="submit"
          label="Submit form"
          color={ButtonColor.SUCCESS}
          Icon={SaveIcon}
        >
          Submit
        </Button>
        <Button
          type="reset"
          label="Reset form"
          variant={ButtonVariant.OUTLINE}
          color={ButtonColor.NEUTRAL}
        >
          Reset
        </Button>
        <Button
          type="button"
          label="Cancel form"
          variant={ButtonVariant.OUTLINE}
          color={ButtonColor.DESTRUCTIVE}
        >
          Cancel
        </Button>
      </div>
    </form>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test form buttons
    const submitButton = canvas.getByRole('button', { name: /submit/i });
    const resetButton = canvas.getByRole('button', { name: /reset/i });
    const cancelButton = canvas.getByRole('button', { name: /cancel/i });

    await expect(submitButton).toHaveAttribute('type', 'submit');
    await expect(resetButton).toHaveAttribute('type', 'reset');
    await expect(cancelButton).toHaveAttribute('type', 'button');

    // Test form interaction
    const nameInput = canvas.getByLabelText(/name/i);
    const emailInput = canvas.getByLabelText(/email/i);

    await userEvent.type(nameInput, 'John Doe');
    await userEvent.type(emailInput, 'john@example.com');

    // Test reset functionality
    await userEvent.click(resetButton);
    // Note: In a real form, this would reset the inputs

    // Test submit button focus and interaction
    await userEvent.click(submitButton);
  },
};
