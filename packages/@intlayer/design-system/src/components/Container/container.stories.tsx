import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';
import {
  Container,
  ContainerBackground,
  ContainerBorderColor,
  ContainerGap,
  ContainerPadding,
  ContainerRoundedSize,
  ContainerSeparator,
  ContainerTransparency,
} from './';

/**
 * Container Component Stories
 *
 * The Container component is a versatile layout wrapper that provides flexible
 * styling options for organizing content. It supports various visual states,
 * backgrounds, borders, and spacing configurations to create consistent
 * layouts throughout your application.
 *
 * ## Key Features
 * - **Flexible Layout**: Configurable padding, gaps, and separators for content organization
 * - **Visual Variants**: Multiple transparency levels, borders, and background states
 * - **Responsive Design**: Adaptive rounded corners and spacing options
 * - **Accessibility**: Full support for ARIA attributes and semantic structure
 * - **Customization**: Extensive styling variants for different use cases
 *
 * ## When to Use
 * - Content sections and cards
 * - Layout containers with specific styling needs
 * - Modal dialogs and overlays
 * - Dashboard components and panels
 * - Form containers and input groups
 */
const meta = {
  title: 'Components/Container',
  component: Container,
  parameters: {
    docs: {
      description: {
        component: `
A flexible container component for organizing content with extensive customization options.

### Layout Features:
- **Padding**: Internal spacing from none to extra-large
- **Gap**: Space between child elements for flex layouts
- **Separators**: Dashed dividers in X, Y, or both directions
- **Borders**: Optional borders with semantic color options

### Visual Variants:
- **Transparency**: Background opacity levels from solid to fully transparent
- **Rounded Corners**: Border radius from none to full circular
- **Background States**: Static, hoverable, or inherited backgrounds
- **Border Colors**: Semantic colors (primary, error, warning, etc.)

### Use Cases:
- Card components and content sections
- Modal dialogs and overlays
- Dashboard panels and widgets
- Form containers and input groups
- Navigation containers and sidebars
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
            id: 'landmark-one-main',
            enabled: false, // Container is not a landmark element
          },
        ],
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      description: 'Content inside the container',
      control: 'text',
    },
    roundedSize: {
      description: 'Border radius size for rounded corners',
      control: 'select',
      options: ['none', 'sm', 'md', 'lg', 'xl', 'full'],
    },
    transparency: {
      description:
        'Background transparency level (none=solid, full=transparent)',
      control: 'select',
      options: ['none', 'sm', 'md', 'lg', 'xl', 'full'],
    },
    padding: {
      description: 'Internal padding around content',
      control: 'select',
      options: ['none', 'sm', 'md', 'lg', 'xl'],
    },
    separator: {
      description: 'Dashed dividers between children elements',
      control: 'select',
      options: ['without', 'x', 'y', 'both'],
    },
    border: {
      description: 'Show border around the container',
      control: 'boolean',
    },
    borderColor: {
      description: 'Color theme for the border',
      control: 'select',
      options: [
        'primary',
        'secondary',
        'neutral',
        'card',
        'text',
        'error',
        'warning',
        'success',
      ],
    },
    background: {
      description: 'Background interaction behavior',
      control: 'select',
      options: ['none', 'hoverable', 'with'],
    },
    gap: {
      description: 'Space between child elements in flex layout',
      control: 'select',
      options: ['none', 'sm', 'md', 'lg', 'xl'],
    },
    className: {
      description: 'Additional CSS classes',
      control: 'text',
    },
    'aria-label': {
      description: 'Accessible label for the container',
      control: 'text',
    },
    'aria-labelledby': {
      description: 'ID of element that labels the container',
      control: 'text',
    },
    'aria-describedby': {
      description: 'ID of element that describes the container',
      control: 'text',
    },
    role: {
      description: 'ARIA role for the container',
      control: 'select',
      options: ['region', 'group', 'section', 'main', 'complementary'],
    },
  },
} satisfies Meta<typeof Container>;

export default meta;
type Story = StoryObj<typeof Container>;

/**
 * ## Basic Examples
 *
 * These stories demonstrate the core functionality and appearance of the Container component
 * in its most common configurations.
 */

/**
 * ### Default State
 *
 * The basic container with default styling. This is the most common container variant
 * used for general content organization throughout your application.
 */
export const Default: Story = {
  args: {
    children: 'Container content',
    roundedSize: 'md',
    transparency: 'md',
    padding: 'md',
    separator: 'without',
    border: false,
    borderColor: 'text',
    background: 'none',
    gap: 'none',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const container = canvas.getByText('Container content').parentElement;

    // Test initial state
    await expect(container).toBeInTheDocument();
    await expect(container).toBeVisible();
  },
};

/**
 * ### All Rounded Sizes
 *
 * Showcase of all available rounded corner sizes to help choose the right
 * border radius for different design contexts.
 */
export const AllRoundedSizes: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      {(['none', 'sm', 'md', 'lg', 'xl', 'full'] as const).map((size) => (
        <Container
          key={size}
          roundedSize={size}
          padding="md"
          transparency="sm"
          border
          borderColor="primary"
          className="text-center"
        >
          <div className="font-medium text-sm">{size}</div>
          <div className="text-xs opacity-70">rounded-{size}</div>
        </Container>
      ))}
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const containers = canvas.getAllByText(/rounded-/);

    await expect(containers).toHaveLength(
      ['none', 'sm', 'md', 'lg', 'xl', 'full'].length
    );

    for (const container of containers) {
      await expect(container.parentElement).toBeInTheDocument();
      await expect(container.parentElement).toBeVisible();
    }
  },
};

/**
 * ### Transparency Levels
 *
 * Different background transparency levels for various visual contexts
 * and layering needs.
 */
export const TransparencyLevels: Story = {
  render: () => (
    <div className="relative rounded-lg bg-linear-to-br from-blue-100 to-purple-100 p-8">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
        {['none', 'sm', 'md', 'lg', 'xl', 'full'].map((transparency) => (
          <Container
            key={transparency}
            transparency={transparency}
            padding="md"
            roundedSize="lg"
            border
            borderColor="neutral"
            className="text-center"
          >
            <div className="font-medium text-sm">{transparency}</div>
            <div className="text-xs opacity-70">
              {transparency === 'none'
                ? 'Solid'
                : transparency === 'full'
                  ? 'Transparent'
                  : `${transparency.toUpperCase()} opacity`}
            </div>
          </Container>
        ))}
      </div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const containers = canvas.getAllByText(/opacity|Solid|Transparent/);

    await expect(containers.length).toBeGreaterThanOrEqual(
      ['none', 'sm', 'md', 'lg', 'xl', 'full'].length
    );
  },
};

/**
 * ### Padding Variations
 *
 * Different padding sizes for various content density needs and
 * spacing requirements.
 */
export const PaddingVariations: Story = {
  render: () => (
    <div className="space-y-4">
      {['none', 'sm', 'md', 'lg', 'xl'].map((padding) => (
        <Container
          key={padding}
          padding={padding}
          transparency="sm"
          roundedSize="md"
          border
          borderColor="text"
          className="w-fit"
        >
          <div className="rounded bg-blue-100 text-sm">
            Padding: {padding} - This content shows the padding size
          </div>
        </Container>
      ))}
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const containers = canvas.getAllByText(/Padding:/);

    await expect(containers).toHaveLength(
      ['none', 'sm', 'md', 'lg', 'xl'].length
    );
  },
};

/**
 * ## Layout Features
 *
 * Stories demonstrating container layout capabilities including gaps, separators, and spacing.
 */

/**
 * ### Gap Between Children
 *
 * Different gap sizes for flex layouts with multiple child elements.
 */
export const GapBetweenChildren: Story = {
  render: () => (
    <div className="space-y-6">
      {['none', 'sm', 'md', 'lg', 'xl'].map((gap) => (
        <div key={gap}>
          <h3 className="mb-2 font-medium text-sm">Gap: {gap}</h3>
          <Container
            gap={gap}
            padding="md"
            transparency="sm"
            roundedSize="md"
            border
            borderColor="neutral"
          >
            <div className="rounded bg-blue-100 p-2">Item 1</div>
            <div className="rounded bg-green-100 p-2">Item 2</div>
            <div className="rounded bg-yellow-100 p-2">Item 3</div>
          </Container>
        </div>
      ))}
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const gapLabels = canvas.getAllByText(/Gap:/);

    await expect(gapLabels).toHaveLength(
      ['none', 'sm', 'md', 'lg', 'xl'].length
    );

    // Test that each container has the expected children
    for (const label of gapLabels) {
      const container = label
        .closest('div')
        ?.querySelector('[class*="gap-"]') as HTMLElement;
      await expect(container).toBeInTheDocument();

      const items = container?.querySelectorAll('[class*="bg-"]');
      await expect(items?.length).toBe(3);
    }
  },
};

/**
 * ### Separator Options
 *
 * Different separator configurations for visually dividing container children.
 */
export const SeparatorOptions: Story = {
  render: () => (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {['without', 'x', 'y', 'both'].map((separator) => (
        <div key={separator}>
          <h3 className="mb-2 font-medium text-sm">Separator: {separator}</h3>
          <Container
            separator={separator}
            padding="md"
            transparency="sm"
            roundedSize="md"
            border
            borderColor="neutral"
            className={separator === 'x' ? 'flex-row' : ''}
          >
            <div className="p-3 text-center">Section 1</div>
            <div className="p-3 text-center">Section 2</div>
            <div className="p-3 text-center">Section 3</div>
          </Container>
        </div>
      ))}
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const separatorLabels = canvas.getAllByText(/Separator:/);

    await expect(separatorLabels).toHaveLength(
      ['without', 'x', 'y', 'both'].length
    );
  },
};

/**
 * ## Visual States
 *
 * Stories demonstrating different visual states and interactive behaviors.
 */

/**
 * ### Border Colors
 *
 * Available border color themes for different semantic meanings
 * and visual hierarchies.
 */
export const BorderColors: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      {[
        'primary',
        'secondary',
        'neutral',
        'card',
        'text',
        'error',
        'warning',
        'success',
      ].map((color) => (
        <Container
          key={color}
          border
          borderColor={color}
          padding="md"
          transparency="sm"
          roundedSize="md"
          className="text-center"
        >
          <div className="font-medium text-sm capitalize">
            {color.replace('_', ' ')}
          </div>
          <div className="text-xs opacity-70">border-{color}</div>
        </Container>
      ))}
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const containers = canvas.getAllByText(/border-/);

    await expect(containers).toHaveLength(
      [
        'primary',
        'secondary',
        'neutral',
        'card',
        'text',
        'error',
        'warning',
        'success',
      ].length
    );

    // Test border accessibility
    for (const container of containers) {
      const parentContainer = container.parentElement;
      await expect(parentContainer).toBeInTheDocument();
      await expect(parentContainer).toBeVisible();
    }
  },
};

/**
 * ### Background States
 *
 * Different background interaction states for various use cases.
 */
export const BackgroundStates: Story = {
  render: () => (
    <div className="space-y-4">
      {['none', 'hoverable', 'with'].map((background) => (
        <Container
          key={background}
          background={background}
          padding="lg"
          transparency="sm"
          roundedSize="md"
          border
          borderColor="neutral"
        >
          <div className="font-medium text-sm">Background: {background}</div>
          <div className="mt-1 text-xs opacity-70">
            {background === 'hoverable'
              ? 'Hover over this container to see the effect'
              : background === 'with'
                ? 'Container with background styling'
                : 'No special background styling'}
          </div>
        </Container>
      ))}
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const containers = canvas.getAllByText(/Background:/);

    await expect(containers).toHaveLength(['none', 'hoverable', 'with'].length);

    // Test hoverable interaction
    const hoverableContainer = canvas
      .getByText('Background: hoverable')
      .closest('div') as HTMLElement;
    if (hoverableContainer) {
      await expect(hoverableContainer).toBeInTheDocument();
    }
  },
};

/**
 * ## Accessibility Features
 *
 * Stories demonstrating accessibility features and ARIA attribute usage.
 */

/**
 * ### ARIA Attributes
 *
 * Demonstrates proper ARIA attribute usage for complex container scenarios
 * and semantic structure.
 */
export const ARIAAttributes: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="mb-2 font-medium text-sm">Container with Label</h3>
        <Container
          aria-label="User profile information"
          role="region"
          padding="md"
          transparency="sm"
          roundedSize="md"
          border
          borderColor="primary"
        >
          <div>This container has an accessible label for screen readers</div>
        </Container>
      </div>

      <div>
        <h3 className="mb-2 font-medium text-sm">Container with Description</h3>
        <Container
          aria-labelledby="settings-title"
          aria-describedby="settings-help"
          role="group"
          padding="md"
          transparency="sm"
          roundedSize="md"
          border
          borderColor="neutral"
        >
          <div id="settings-title" className="font-medium">
            Settings Panel
          </div>
          <div id="settings-help" className="mt-1 text-gray-600 text-xs">
            Configure your application preferences here
          </div>
        </Container>
      </div>

      <div>
        <h3 className="mb-2 font-medium text-sm">Main Content Section</h3>
        <Container
          role="main"
          aria-label="Primary content area"
          padding="lg"
          transparency="none"
          roundedSize="lg"
          border
          borderColor="success"
        >
          <div>This container serves as the main content landmark</div>
        </Container>
      </div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test labeled container
    const labeledContainer = canvas.getByRole('region', {
      name: /user profile information/i,
    });
    await expect(labeledContainer).toBeInTheDocument();

    // Test described container
    const describedContainer = canvas.getByRole('group');
    await expect(describedContainer).toHaveAttribute(
      'aria-labelledby',
      'settings-title'
    );
    await expect(describedContainer).toHaveAttribute(
      'aria-describedby',
      'settings-help'
    );

    // Test main container
    const mainContainer = canvas.getByRole('main');
    await expect(mainContainer).toHaveAttribute(
      'aria-label',
      'Primary content area'
    );
  },
};

/**
 * ## Real-World Examples
 *
 * Stories demonstrating practical use cases and common patterns.
 */

/**
 * ### Card Components
 *
 * Container used as the foundation for card-based layouts.
 */
export const CardComponents: Story = {
  render: () => (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      <Container
        padding="lg"
        transparency="none"
        roundedSize="lg"
        border
        borderColor="neutral"
        background="hoverable"
        gap="md"
        role="article"
        aria-labelledby="card-1-title"
      >
        <div id="card-1-title" className="font-bold text-lg">
          Product Card
        </div>
        <div className="text-sm opacity-70">
          A sample product card with hover effects
        </div>
        <div className="text-blue-600 text-xs">Learn more →</div>
      </Container>

      <Container
        padding="lg"
        transparency="sm"
        roundedSize="xl"
        border
        borderColor="success"
        gap="sm"
        role="article"
        aria-labelledby="card-2-title"
      >
        <div id="card-2-title" className="font-bold text-green-700 text-lg">
          Success Story
        </div>
        <div className="text-sm">
          A success card with green accent and transparency
        </div>
      </Container>

      <Container
        padding="lg"
        transparency="lg"
        roundedSize="two-xl"
        border
        borderColor="error"
        gap="md"
        role="article"
        aria-labelledby="card-3-title"
      >
        <div id="card-3-title" className="font-bold text-lg text-red-700">
          Alert Card
        </div>
        <div className="text-sm">
          An alert card with error styling and high transparency
        </div>
      </Container>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const cards = canvas.getAllByRole('article');

    await expect(cards).toHaveLength(3);

    for (const card of cards) {
      await expect(card).toBeInTheDocument();
      await expect(card).toHaveAccessibleName();
    }
  },
};

/**
 * ### Form Container
 *
 * Container used for form organization with separators and proper spacing.
 */
export const FormContainer: Story = {
  render: () => (
    <Container
      padding="lg"
      transparency="none"
      roundedSize="lg"
      border
      borderColor="neutral"
      gap="lg"
      separator="y"
      role="form"
      aria-labelledby="form-title"
    >
      <div id="form-title" className="font-bold text-xl">
        User Information
      </div>

      <div className="space-y-4">
        <div>
          <label className="mb-1 block font-medium text-sm">Name</label>
          <input
            type="text"
            className="w-full rounded border border-gray-300 p-2"
            placeholder="Enter your name"
          />
        </div>
        <div>
          <label className="mb-1 block font-medium text-sm">Email</label>
          <input
            type="email"
            className="w-full rounded border border-gray-300 p-2"
            placeholder="Enter your email"
          />
        </div>
      </div>

      <div className="flex gap-4">
        <button className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
          Save
        </button>
        <button className="rounded border border-gray-300 px-4 py-2 hover:bg-gray-50">
          Cancel
        </button>
      </div>
    </Container>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const form = canvas.getByRole('form', { name: /user information/i });

    await expect(form).toBeInTheDocument();

    // Test form inputs
    const nameInput = canvas.getByPlaceholderText(/enter your name/i);
    const emailInput = canvas.getByPlaceholderText(/enter your email/i);

    await expect(nameInput).toBeInTheDocument();
    await expect(emailInput).toBeInTheDocument();

    // Test buttons
    const saveButton = canvas.getByRole('button', { name: /save/i });
    const cancelButton = canvas.getByRole('button', { name: /cancel/i });

    await expect(saveButton).toBeInTheDocument();
    await expect(cancelButton).toBeInTheDocument();
  },
};
