import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';
import { Breadcrumb } from '.';
import { ButtonColor } from '../Button';
import { LinkColor } from '../Link';

/**
 * Breadcrumb Component Stories
 *
 * The Breadcrumb component provides navigational context that shows users
 * where they are in a website hierarchy and helps them navigate back to
 * previous levels. It supports multiple types of breadcrumb items:
 * - Static text spans for current page
 * - Clickable links for navigation
 * - Interactive buttons with custom actions
 *
 * ## Features
 * - **Accessibility**: Full ARIA support with keyboard navigation
 * - **SEO**: Schema.org structured data for search engines
 * - **Internationalization**: Built-in i18n support
 * - **Customization**: Multiple size and spacing variants
 * - **Responsive**: Adapts to different screen sizes
 * - **Truncation**: Supports maximum item limits with ellipsis
 */
const meta: Meta<typeof Breadcrumb> = {
  title: 'Components/Breadcrumb',
  component: Breadcrumb,
  parameters: {
    docs: {
      description: {
        component: `
A navigation component that provides hierarchical context and allows users to navigate back through a path.

### Key Features:
- **Three Item Types**: Supports links, buttons, and static text
- **Full Accessibility**: ARIA attributes, keyboard navigation, focus management
- **SEO Optimized**: Schema.org structured data markup
- **Internationalization**: Built-in support for multiple languages
- **Customizable**: Size variants, custom separators, color schemes
- **Responsive Design**: Adapts to different viewport sizes
- **Smart Truncation**: Handles long breadcrumb paths gracefully

### When to Use:
- Multi-level website navigation (e.g., Home > Products > Electronics > Smartphones)
- E-commerce category navigation
- Documentation sections
- Multi-step processes or wizards
- Any hierarchical content structure

### Accessibility:
- Uses \`<nav>\` element with \`aria-label\`
- Supports \`aria-current\` for active items
- Full keyboard navigation support
- Screen reader friendly with descriptive labels
- Focus management with visible focus indicators
        `,
      },
    },
    a11y: {
      config: {
        rules: [
          {
            id: 'landmark-one-main',
            enabled: false, // Disabled as breadcrumbs are navigation, not main content
          },
        ],
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    links: {
      description:
        'Array of breadcrumb items (strings or objects with href/onClick)',
      control: 'object',
      defaultValue: ['Home', 'Library', 'Data'],
    },
    color: {
      description: 'Color scheme for breadcrumb links',
      control: 'select',
      options: Object.values(LinkColor),
      defaultValue: ButtonColor.TEXT,
    },
    size: {
      description: 'Size variant affecting text size and spacing',
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    spacing: {
      description: 'Spacing between breadcrumb items',
      control: 'select',
      options: ['compact', 'normal', 'loose'],
    },
    locale: {
      description: 'Locale forwarded to link items',
      control: 'text',
    },
    elementType: {
      description: 'ARIA current type for active breadcrumb item',
      control: 'select',
      options: ['page', 'location'],
      defaultValue: 'page',
    },
    ariaLabel: {
      description: 'ARIA label for the breadcrumb navigation',
      control: 'text',
    },
    includeStructuredData: {
      description: 'Whether to include schema.org structured data markup',
      control: 'boolean',
    },
    maxItems: {
      description: 'Maximum number of items before truncation',
      control: 'number',
      min: 3,
      max: 10,
    },
    className: {
      description: 'Additional CSS classes',
      control: 'text',
    },
  },
} satisfies Meta<typeof Breadcrumb>;

export default meta;
type Story = StoryObj<typeof Breadcrumb>;

/**
 * Default breadcrumb with simple text items showing a basic navigation path
 */
export const Default: Story = {
  args: {
    links: ['Home', 'Library', 'Data'],
    ariaLabel: 'Main navigation',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Basic breadcrumb with text-only items. The last item is automatically marked as the current page.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test accessibility structure
    const nav = canvas.getByRole('navigation');
    await expect(nav).toBeInTheDocument();
    await expect(nav).toHaveAttribute('aria-label', 'Main navigation');

    // Test breadcrumb items
    const list = canvas.getByRole('list');
    await expect(list).toBeInTheDocument();

    const items = canvas.getAllByRole('listitem');
    await expect(items).toHaveLength(3);

    // Test current page marking
    const currentItem = canvas.getByText('Data');
    await expect(currentItem).toHaveAttribute('aria-current', 'page');
  },
};

/**
 * Breadcrumb with clickable links for navigation between pages
 */
export const WithLinks: Story = {
  args: {
    links: [
      'Home',
      { text: 'Products', href: '/products' },
      { text: 'Electronics', href: '/products/electronics' },
      'Smartphones',
    ],
    ariaLabel: 'Product navigation',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Breadcrumb with a mix of links and static text. Links are keyboard-accessible and include proper ARIA attributes.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test links are present and accessible
    const productsLink = canvas.getByRole('link', { name: /Products/ });
    const electronicsLink = canvas.getByRole('link', { name: /Electronics/ });

    await expect(productsLink).toBeInTheDocument();
    await expect(productsLink).toHaveAttribute('href', '/products');

    await expect(electronicsLink).toBeInTheDocument();
    await expect(electronicsLink).toHaveAttribute(
      'href',
      '/products/electronics'
    );

    // Test focus behavior
    await userEvent.tab();
    await expect(productsLink).toHaveFocus();

    await userEvent.tab();
    await expect(electronicsLink).toHaveFocus();

    // Test current page
    const currentItem = canvas.getByText('Smartphones');
    await expect(currentItem).toHaveAttribute('aria-current', 'page');
  },
};

/**
 * Breadcrumb with interactive buttons for custom actions
 */
export const WithButtons: Story = {
  args: {
    links: [
      {
        text: 'Dashboard',
        onClick: () => console.log('Navigate to Dashboard'),
      },
      { text: 'Settings', onClick: () => console.log('Navigate to Settings') },
      { text: 'Profile', onClick: () => console.log('Navigate to Profile') },
      'Account Details',
    ],
    ariaLabel: 'Settings navigation',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Breadcrumb with interactive buttons that can trigger custom actions. Useful for SPAs or complex navigation logic.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test buttons are present
    const dashboardBtn = canvas.getByRole('button', { name: /Dashboard/ });
    const settingsBtn = canvas.getByRole('button', { name: /Settings/ });
    const profileBtn = canvas.getByRole('button', { name: /Profile/ });

    await expect(dashboardBtn).toBeInTheDocument();
    await expect(settingsBtn).toBeInTheDocument();
    await expect(profileBtn).toBeInTheDocument();

    // Test keyboard navigation
    await userEvent.tab();
    await expect(dashboardBtn).toHaveFocus();

    await userEvent.tab();
    await expect(settingsBtn).toHaveFocus();

    // Test click interaction
    await userEvent.click(dashboardBtn);
    // Note: In real app, this would trigger navigation
  },
};

/**
 * Breadcrumb with mixed item types: links, buttons, and static text
 */
export const Mixed: Story = {
  args: {
    links: [
      { text: 'Home', href: '/' },
      {
        text: 'Categories',
        onClick: () => console.log('Show categories menu'),
      },
      { text: 'Electronics', href: '/electronics' },
      'Smartphones',
    ],
    color: LinkColor.PRIMARY,
    ariaLabel: 'E-commerce navigation',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Demonstrates mixing different breadcrumb item types in a single component, typical in e-commerce applications.',
      },
    },
  },
};

/**
 * Breadcrumb with size variants
 */
export const SizeVariants: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-medium text-gray-900 mb-2">Small</h3>
        <Breadcrumb
          links={['Home', 'Library', 'Documents']}
          size="small"
          ariaLabel="Small breadcrumb navigation"
        />
      </div>
      <div>
        <h3 className="text-sm font-medium text-gray-900 mb-2">
          Medium (Default)
        </h3>
        <Breadcrumb
          links={['Home', 'Library', 'Documents']}
          size="medium"
          ariaLabel="Medium breadcrumb navigation"
        />
      </div>
      <div>
        <h3 className="text-sm font-medium text-gray-900 mb-2">Large</h3>
        <Breadcrumb
          links={['Home', 'Library', 'Documents']}
          size="large"
          ariaLabel="Large breadcrumb navigation"
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Shows different size variants of the breadcrumb component.',
      },
    },
  },
};

/**
 * Breadcrumb with spacing variants
 */
export const SpacingVariants: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-medium text-gray-900 mb-2">Compact</h3>
        <Breadcrumb
          links={['Home', 'Library', 'Documents']}
          spacing="compact"
          ariaLabel="Compact breadcrumb navigation"
        />
      </div>
      <div>
        <h3 className="text-sm font-medium text-gray-900 mb-2">
          Normal (Default)
        </h3>
        <Breadcrumb
          links={['Home', 'Library', 'Documents']}
          spacing="normal"
          ariaLabel="Normal breadcrumb navigation"
        />
      </div>
      <div>
        <h3 className="text-sm font-medium text-gray-900 mb-2">Loose</h3>
        <Breadcrumb
          links={['Home', 'Library', 'Documents']}
          spacing="loose"
          ariaLabel="Loose breadcrumb navigation"
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Shows different spacing variants between breadcrumb items.',
      },
    },
  },
};

/**
 * Breadcrumb with truncation for long navigation paths
 */
export const WithTruncation: Story = {
  args: {
    links: [
      { text: 'Home', href: '/' },
      { text: 'Category Level 1', href: '/category1' },
      { text: 'Category Level 2', href: '/category2' },
      { text: 'Category Level 3', href: '/category3' },
      { text: 'Category Level 4', href: '/category4' },
      { text: 'Category Level 5', href: '/category5' },
      'Current Page',
    ],
    maxItems: 4,
    ariaLabel: 'Truncated breadcrumb navigation',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Demonstrates breadcrumb truncation with ellipsis for long navigation paths. Shows first item, ellipsis, and last few items.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test that ellipsis is present
    const ellipsis = canvas.getByText('…');
    await expect(ellipsis).toBeInTheDocument();

    // Test that first and last items are visible
    const homeLink = canvas.getByRole('link', { name: /Home/ });
    const currentItem = canvas.getByText('Current Page');

    await expect(homeLink).toBeInTheDocument();
    await expect(currentItem).toBeInTheDocument();
  },
};

/**
 * Breadcrumb with custom separator
 */
export const CustomSeparator: Story = {
  args: {
    links: ['Home', 'Library', 'Books', 'Science Fiction'],
    separator: <span className="text-gray-400 mx-2">→</span>,
    ariaLabel: 'Custom separator navigation',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Shows how to customize the separator between breadcrumb items using a custom React element.',
      },
    },
  },
};

/**
 * Accessibility-focused breadcrumb story for testing
 */
export const AccessibilityTest: Story = {
  args: {
    links: [
      { text: 'Home', href: '/' },
      { text: 'Accessible Navigation', href: '/accessibility' },
      'Current Page',
    ],
    ariaLabel: 'Accessibility test navigation',
    elementType: 'location',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Focused on accessibility testing with proper ARIA attributes, keyboard navigation, and screen reader support.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test navigation structure
    const nav = canvas.getByRole('navigation');
    await expect(nav).toHaveAttribute(
      'aria-label',
      'Accessibility test navigation'
    );

    // Test list structure
    const list = canvas.getByRole('list');
    await expect(list).toBeInTheDocument();

    // Test current location marking
    const currentItem = canvas.getByText('Current Page');
    await expect(currentItem).toHaveAttribute('aria-current', 'location');

    // Test keyboard navigation
    const homeLink = canvas.getByRole('link', { name: /Home/ });
    const accessibilityLink = canvas.getByRole('link', {
      name: /Accessible Navigation/,
    });

    await userEvent.tab();
    await expect(homeLink).toHaveFocus();

    await userEvent.tab();
    await expect(accessibilityLink).toHaveFocus();

    // Test that Enter key works on links
    await userEvent.keyboard('{Enter}');
    // Note: Would navigate in real application
  },
};
