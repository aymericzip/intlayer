import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, waitFor, within } from '@storybook/test';
import { useState } from 'react';
import {
  CollapsibleTable,
  type CollapsibleTableProps,
} from './CollapsibleTable';

/**
 * The CollapsibleTable component provides an expandable table interface with smooth animations,
 * comprehensive styling options, and built-in accessibility support. Perfect for displaying
 * tabular data that can be expanded/collapsed to save space and improve user experience.
 *
 * ### Key Features
 * - **Smooth Animations**: Uses MaxHeightSmoother for fluid expand/collapse transitions
 * - **Flexible Styling**: Multiple variants, sizes, and granular className controls
 * - **Custom Renderers**: Support for custom cell content through columnRenderers
 * - **Accessibility**: Full ARIA support with proper roles and keyboard navigation
 * - **Responsive**: Adapts to different screen sizes and table layouts
 *
 * ### Accessibility Features
 * - Uses proper ARIA attributes (`aria-expanded`, `aria-controls`, `aria-labelledby`)
 * - Supports keyboard navigation (Enter, Space for toggle)
 * - Provides screen reader support with descriptive labels
 * - Maintains focus management for better user experience
 *
 * ### Styling System
 * - **Variants**: `default`, `dark`, `ghost`, `outlined` for different visual styles
 * - **Sizes**: `sm`, `md`, `lg` for different component scales
 * - **Spacing**: `compact`, `comfortable`, `spacious` for content density
 * - **Granular Control**: Individual className props for header, content, table elements
 *
 * ### Best Practices
 * - Use descriptive headers that clearly indicate collapsible content
 * - Provide meaningful data in tables with appropriate column headers
 * - Consider using custom renderers for complex cell content
 * - Ensure table data is substantial enough to benefit from collapsing
 * - Use appropriate variant and size combinations for your design system
 */
const meta: Meta<CollapsibleTableProps> = {
  title: 'Components/CollapsibleTable',
  component: CollapsibleTable,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A sophisticated collapsible table component with smooth animations, flexible styling, and comprehensive accessibility support for organizing tabular data efficiently.',
      },
    },
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'dark', value: '#242424' },
        { name: 'gray', value: '#f5f5f5' },
      ],
    },
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '1rem' }}>
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description:
        'The content title displayed in the collapsible header section',
      table: {
        type: { summary: 'ReactNode' },
        defaultValue: { summary: 'undefined' },
      },
    },
    data: {
      control: 'object',
      description: 'Array of objects representing table rows data',
      table: {
        type: { summary: 'Array<Record<string, any>>' },
        defaultValue: { summary: '[]' },
      },
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'dark', 'ghost', 'outlined'],
      description: 'Visual style variant of the collapsible table',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'default' },
      },
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg', 'xl', 'full'],
      description: 'Size variant affecting overall component scale',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'md' },
      },
    },
    spacing: {
      control: { type: 'select' },
      options: ['none', 'sm', 'md', 'lg', 'auto'],
      description: 'Content density and spacing within the component',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'auto' },
      },
    },
    borderStyle: {
      control: { type: 'select' },
      options: ['none', 'dashed', 'solid'],
      description: 'Border styling intensity for the component',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'dashed' },
      },
    },
    tableSpacing: {
      control: { type: 'select' },
      options: ['none', 'sm', 'md', 'lg'],
      description: 'Specific spacing configuration for table content',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'md' },
      },
    },
    tableLayout: {
      control: { type: 'select' },
      options: ['auto', 'fixed'],
      description: 'CSS table-layout property for column width behavior',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'auto' },
      },
    },
    defaultExpanded: {
      control: 'boolean',
      description: 'Whether the table should be expanded on initial render',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    columnRenderers: {
      control: false,
      description: 'Object mapping column keys to custom render functions',
      table: {
        type: {
          summary: 'Record<string, (value: any, row: any) => ReactNode>',
        },
        defaultValue: { summary: 'undefined' },
      },
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes for the root container',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
    },
    headerClassName: {
      control: 'text',
      description: 'Additional CSS classes for the header section',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
    },
    contentClassName: {
      control: 'text',
      description: 'Additional CSS classes for the collapsible content area',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
    },
    tableClassName: {
      control: 'text',
      description: 'Additional CSS classes for the table element',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
    },
    thClassName: {
      control: 'text',
      description: 'Additional CSS classes for table header cells',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
    },
    tdClassName: {
      control: 'text',
      description: 'Additional CSS classes for table data cells',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
    },
    trClassName: {
      control: 'text',
      description: 'Additional CSS classes for table rows',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
    },
    onExpandToggle: {
      action: 'toggled',
      description:
        'Callback function called when the table is expanded/collapsed',
      table: {
        type: { summary: '(isOpen: boolean) => void' },
        defaultValue: { summary: 'undefined' },
      },
    },
  },
} satisfies Meta<typeof CollapsibleTable>;

export default meta;
type Story = StoryObj<CollapsibleTableProps>;

// Sample data for stories
const sampleData = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    role: 'Developer',
    status: 'Active',
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'Designer',
    status: 'Active',
  },
  {
    id: 3,
    name: 'Bob Johnson',
    email: 'bob@example.com',
    role: 'Manager',
    status: 'Inactive',
  },
];

/**
 * The default story showcases the basic usage of CollapsibleTable with standard styling
 * and sample user data. This demonstrates the core functionality with minimal configuration.
 */
export const Default: Story = {
  args: {
    title: 'User Management',
    data: sampleData,
    variant: 'default',
    size: 'md',
    spacing: 'auto',
  },
  render: (args) => <CollapsibleTable {...args} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const toggleButton = canvas.getByRole('button');

    expect(toggleButton).toHaveAttribute('aria-expanded', 'false');

    await userEvent.click(toggleButton);

    await waitFor(() =>
      expect(toggleButton).toHaveAttribute('aria-expanded', 'true')
    );

    // Wait for the animation to complete and table to be visible
    // MaxHeightSmoother has a 700ms transition duration
    await waitFor(
      async () => {
        const table = canvas.getByRole('table');
        expect(table).toBeInTheDocument();
        expect(table).toBeVisible();
      },
      { timeout: 1000 }
    );
  },
};

/**
 * This story demonstrates all available visual variants to help choose the right
 * styling for different design contexts and brand requirements.
 */
export const Variants: Story = {
  render: () => (
    <div className="space-y-6">
      <CollapsibleTable
        title="Default Variant"
        data={sampleData}
        variant="default"
        defaultExpanded
      />
      <CollapsibleTable
        title="Dark Variant"
        data={sampleData}
        variant="dark"
        defaultExpanded
      />
      <CollapsibleTable
        title="Ghost Variant"
        data={sampleData}
        variant="ghost"
        defaultExpanded
      />
      <CollapsibleTable
        title="Outlined Variant"
        data={sampleData}
        variant="outlined"
        defaultExpanded
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Different visual variants for various design needs and contexts.',
      },
    },
  },
};

/**
 * This story shows the three available size options, demonstrating how the component
 * scales for different use cases and interface densities.
 */
export const Sizes: Story = {
  render: () => (
    <div className="space-y-6">
      <CollapsibleTable
        title="Small Size"
        data={sampleData}
        size="sm"
        defaultExpanded
      />
      <CollapsibleTable
        title="Medium Size (Default)"
        data={sampleData}
        size="md"
        defaultExpanded
      />
      <CollapsibleTable
        title="Large Size"
        data={sampleData}
        size="lg"
        defaultExpanded
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Different size variants for various interface scales and content densities.',
      },
    },
  },
};

/**
 * This story demonstrates the spacing options available for both the overall component
 * and specifically for table content, showing how to control content density.
 */
export const SpacingOptions: Story = {
  render: () => (
    <div className="space-y-6">
      <CollapsibleTable
        title="Compact Spacing"
        data={sampleData}
        spacing="sm"
        tableSpacing="sm"
        defaultExpanded
      />
      <CollapsibleTable
        title="Comfortable Spacing (Default)"
        data={sampleData}
        spacing="md"
        tableSpacing="md"
        defaultExpanded
      />
      <CollapsibleTable
        title="Spacious Spacing"
        data={sampleData}
        spacing="lg"
        tableSpacing="lg"
        defaultExpanded
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Different spacing configurations for controlling content density and visual breathing room.',
      },
    },
  },
};

/**
 * This story showcases custom column renderers for displaying complex cell content
 * like status badges, formatted text, and interactive elements.
 */
export const CustomRenderers: Story = {
  args: {
    title: 'Users with Custom Rendering',
    data: sampleData,
    defaultExpanded: true,
    columnRenderers: {
      status: (value: unknown, _row: Record<string, unknown>) => {
        const statusValue = value as string;
        return (
          <span
            className={`inline-flex items-center rounded-full px-2.5 py-0.5 font-medium text-xs ${
              statusValue === 'Active'
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
            }`}
          >
            {statusValue}
          </span>
        );
      },
      role: (value: unknown, _row: Record<string, unknown>) => {
        const roleValue = value as string;
        return <span className="font-semibold text-blue-600">{roleValue}</span>;
      },
      email: (value: unknown, _row: Record<string, unknown>) => {
        const emailValue = value as string;
        return (
          <a
            href={`mailto:${emailValue}`}
            className="text-blue-500 underline hover:text-blue-700"
          >
            {emailValue}
          </a>
        );
      },
    },
  },
  parameters: {
    docs: {
      description: {
        story: `Custom column renderers allow you to display complex content in table cells, 
such as status badges, formatted text, links, or any React component. This example shows 
status badges, styled roles, and clickable email links.`,
      },
    },
  },
};

/**
 * This story demonstrates controlled usage where the parent component manages
 * the open/closed state, useful for complex state management scenarios.
 */
export const Controlled: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className="space-y-4">
        <div className="flex gap-2">
          <button
            onClick={() => setIsOpen(true)}
            className="rounded bg-blue-500 px-3 py-1 text-sm text-white"
          >
            Expand
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="rounded bg-gray-500 px-3 py-1 text-sm text-white"
          >
            Collapse
          </button>
        </div>
        <CollapsibleTable
          title="Controlled Table"
          data={sampleData}
          isExpanded={isOpen}
          onExpandToggle={setIsOpen}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: `This example shows how to control the table's expanded state externally. 
The parent component manages the state and can programmatically expand or collapse 
the table using external controls.`,
      },
    },
  },
};

/**
 * This story demonstrates the component with a larger dataset and complex data structure,
 * showing how it handles real-world data scenarios with multiple column types.
 */
export const LargeDataset: Story = {
  args: {
    title: 'Product Inventory (25 items)',
    data: Array.from({ length: 25 }, (_, i) => ({
      id: i + 1,
      product: `Product ${i + 1}`,
      category: ['Electronics', 'Clothing', 'Books', 'Home & Garden'][i % 4],
      price: `$${(Math.random() * 100 + 10).toFixed(2)}`,
      stock: Math.floor(Math.random() * 100),
      supplier: `Supplier ${Math.floor(i / 5) + 1}`,
      lastUpdated: new Date(
        Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000
      ).toLocaleDateString(),
    })),
    variant: 'outlined',
    spacing: 'sm',
    tableSpacing: 'sm',
    tableLayout: 'fixed',
    defaultExpanded: true,
  },
  parameters: {
    docs: {
      description: {
        story: `This example demonstrates the component's performance with a larger dataset 
and how it maintains usability with more complex table structures. The compact spacing 
and fixed table layout help manage the display of extensive data.`,
      },
    },
  },
};

/**
 * This story shows how to apply custom styling using the various className props
 * for fine-grained control over the component's appearance.
 */
export const CustomStyling: Story = {
  args: {
    title: 'Custom Styled Table',
    data: sampleData.slice(0, 2),
    defaultExpanded: true,
    className: 'border-2 border-purple-300 rounded-lg overflow-hidden',
    headerClassName: 'bg-gradient-to-r from-purple-500 to-pink-500 text-white',
    contentClassName: 'bg-purple-50',
    tableClassName: 'border-separate border-spacing-0',
    thClassName: 'bg-purple-100 text-purple-800 font-bold',
    tdClassName: 'bg-white border-b border-purple-200',
    trClassName: 'hover:bg-purple-25 transition-colors',
  },
  parameters: {
    docs: {
      description: {
        story: `This example showcases the granular styling control available through 
the various className props. You can customize the header, content area, table, 
and individual cell styling to match your design requirements.`,
      },
    },
  },
};

/**
 * This story demonstrates all border styling options available for the component,
 * showing how borders can enhance or minimize the visual separation.
 */
export const BorderStyles: Story = {
  render: () => (
    <div className="space-y-6">
      <CollapsibleTable
        title="No Borders"
        data={sampleData}
        borderStyle="none"
        defaultExpanded
      />
      <CollapsibleTable
        title="Dashed Borders (Default)"
        data={sampleData}
        borderStyle="dashed"
        defaultExpanded
      />
      <CollapsibleTable
        title="Strong Borders"
        data={sampleData}
        borderStyle="solid"
        defaultExpanded
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Different border styling options for various visual emphasis needs.',
      },
    },
  },
};
