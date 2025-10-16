import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import {
  HierarchicalDropdown,
  type HierarchicalItem,
} from './HierarchicalDropdown';

/**
 * HierarchicalDropdown Component Stories
 *
 * The HierarchicalDropdown component provides a dropdown with support for nested/hierarchical items.
 * It includes search functionality, parent-child selection logic, and visual checkmarks.
 *
 * ## Key Features
 * - **Hierarchical Structure**: Support for parent items with nested children
 * - **Smart Selection**: Selecting a parent automatically selects all children
 * - **Individual Selection**: Children can be selected independently
 * - **Search Functionality**: Filter across both parent and child items
 * - **Visual Feedback**: Checkmarks indicate selected items
 * - **Dark Theme**: Consistent with the design system
 *
 * ## Use Cases
 * - Tag selection with grouped items
 * - Dictionary selection with categories
 * - Multi-level category selection
 * - Hierarchical filter interfaces
 */
const meta = {
  title: 'Components/HierarchicalDropdown',
  component: HierarchicalDropdown,
  parameters: {
    docs: {
      description: {
        component: `
A dropdown component that supports hierarchical/nested items with intelligent selection logic.

### Selection Behavior:
- **Parent Selection**: When a parent is selected, all its children are automatically selected
- **Child Selection**: Children can be selected individually without selecting the parent
- **Deselection**: Deselecting a parent deselects all its children

### Search Functionality:
- Searches across both parent and child item labels
- Shows parents if any child matches the search query
- Real-time filtering as you type

### Accessibility:
- Keyboard navigation support
- Proper button semantics
- Visual focus indicators
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    items: {
      description: 'Array of hierarchical items to display',
      control: 'object',
    },
    selectedIds: {
      description: 'Array of selected item IDs',
      control: 'object',
    },
    onSelectionChange: {
      description: 'Callback when selection changes',
      action: 'selectionChanged',
    },
    searchPlaceholder: {
      description: 'Placeholder text for the search input',
      control: 'text',
    },
    showSearchButton: {
      description: 'Whether to show the search button',
      control: 'boolean',
    },
  },
} satisfies Meta<typeof HierarchicalDropdown>;

export default meta;
type Story = StoryObj<typeof HierarchicalDropdown>;

// Sample data matching the image
const sampleItems: HierarchicalItem[] = [
  {
    id: 'landing-tag',
    label: 'Landing tag',
    children: [
      { id: 'landing-title-1', label: 'Title dico (key dico)' },
      { id: 'landing-title-2', label: 'Title dico (key dico)' },
      { id: 'landing-title-3', label: 'Title dico (key dico)' },
    ],
  },
  {
    id: 'dashboard-tag',
    label: 'Dashboard tag',
    children: [
      { id: 'dashboard-title-1', label: 'Title dico (key dico)' },
      { id: 'dashboard-title-2', label: 'Title dico (key dico)' },
      { id: 'dashboard-title-3', label: 'Title dico (key dico)' },
    ],
  },
];

/**
 * Basic example with hierarchical items
 */
export const Default: Story = {
  render: (args) => {
    const [selectedIds, setSelectedIds] = useState<string[]>([
      'landing-tag',
      'landing-title-1',
      'landing-title-2',
      'landing-title-3',
    ]);

    return (
      <div className="flex min-h-[600px] items-center justify-center bg-neutral-dark p-8">
        <HierarchicalDropdown
          {...args}
          items={sampleItems}
          selectedIds={selectedIds}
          onSelectionChange={setSelectedIds}
        />
      </div>
    );
  },
  args: {
    searchPlaceholder: 'Search a tag or a dictionary',
    showSearchButton: true,
  },
};

/**
 * Example with no items selected initially
 */
export const NoSelection: Story = {
  render: (args) => {
    const [selectedIds, setSelectedIds] = useState<string[]>([]);

    return (
      <div className="flex min-h-[600px] items-center justify-center bg-neutral-dark p-8">
        <HierarchicalDropdown
          {...args}
          items={sampleItems}
          selectedIds={selectedIds}
          onSelectionChange={setSelectedIds}
        />
      </div>
    );
  },
  args: {
    searchPlaceholder: 'Search a tag or a dictionary',
    showSearchButton: true,
  },
};

/**
 * Example with partial child selection (no parent selected)
 */
export const PartialSelection: Story = {
  render: (args) => {
    const [selectedIds, setSelectedIds] = useState<string[]>([
      'landing-title-1',
      'dashboard-title-2',
    ]);

    return (
      <div className="flex min-h-[600px] items-center justify-center bg-neutral-dark p-8">
        <HierarchicalDropdown
          {...args}
          items={sampleItems}
          selectedIds={selectedIds}
          onSelectionChange={setSelectedIds}
        />
      </div>
    );
  },
  args: {
    searchPlaceholder: 'Search a tag or a dictionary',
    showSearchButton: true,
  },
};

/**
 * Example with deeply nested items
 */
export const DeeplyNested: Story = {
  render: (args) => {
    const [selectedIds, setSelectedIds] = useState<string[]>([]);

    const deepItems: HierarchicalItem[] = [
      {
        id: 'category-1',
        label: 'Category 1',
        children: [
          {
            id: 'subcategory-1-1',
            label: 'Subcategory 1.1',
            children: [
              { id: 'item-1-1-1', label: 'Item 1.1.1' },
              { id: 'item-1-1-2', label: 'Item 1.1.2' },
            ],
          },
          { id: 'subcategory-1-2', label: 'Subcategory 1.2' },
        ],
      },
      {
        id: 'category-2',
        label: 'Category 2',
        children: [
          { id: 'subcategory-2-1', label: 'Subcategory 2.1' },
          { id: 'subcategory-2-2', label: 'Subcategory 2.2' },
        ],
      },
    ];

    return (
      <div className="flex min-h-[600px] items-center justify-center bg-neutral-dark p-8">
        <HierarchicalDropdown
          {...args}
          items={deepItems}
          selectedIds={selectedIds}
          onSelectionChange={setSelectedIds}
        />
      </div>
    );
  },
  args: {
    searchPlaceholder: 'Search categories...',
    showSearchButton: false,
  },
};

/**
 * Example with many items
 */
export const ManyItems: Story = {
  render: (args) => {
    const [selectedIds, setSelectedIds] = useState<string[]>([]);

    const manyItems: HierarchicalItem[] = Array.from(
      { length: 10 },
      (_, i) => ({
        id: `parent-${i}`,
        label: `Parent Item ${i + 1}`,
        children: Array.from({ length: 5 }, (_, j) => ({
          id: `child-${i}-${j}`,
          label: `Child Item ${i + 1}.${j + 1}`,
        })),
      })
    );

    return (
      <div className="flex min-h-[600px] items-center justify-center bg-neutral-dark p-8">
        <HierarchicalDropdown
          {...args}
          items={manyItems}
          selectedIds={selectedIds}
          onSelectionChange={setSelectedIds}
        />
      </div>
    );
  },
  args: {
    searchPlaceholder: 'Search items...',
    showSearchButton: false,
  },
};

/**
 * Example without search button
 */
export const WithoutSearchButton: Story = {
  render: (args) => {
    const [selectedIds, setSelectedIds] = useState<string[]>([]);

    return (
      <div className="flex min-h-[600px] items-center justify-center bg-neutral-dark p-8">
        <HierarchicalDropdown
          {...args}
          items={sampleItems}
          selectedIds={selectedIds}
          onSelectionChange={setSelectedIds}
        />
      </div>
    );
  },
  args: {
    searchPlaceholder: 'Search a tag or a dictionary',
    showSearchButton: false,
  },
};
