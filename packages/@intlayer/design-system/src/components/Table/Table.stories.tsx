import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';
import { useState } from 'react';
import { Table } from './Table';

/**
 * ## Table Component
 *
 * The Table component provides an enhanced table experience with modal expansion
 * and collapsible content capabilities. Perfect for displaying tabular data with
 * responsive behavior and enhanced user experience.
 *
 * ### Key Features
 * - **Modal Expansion**: Click the diagonal arrow to view tables in full-screen modal
 * - **Collapsible Content**: Use `isRollable` prop for space-saving collapsed tables
 * - **Responsive Design**: Handles large tables gracefully with proper overflow
 * - **Accessibility**: Maintains proper table semantics and keyboard navigation
 * - **Flexible Styling**: Supports all HTML table attributes and custom CSS classes
 *
 * ### Accessibility Features
 * - Proper table semantics with thead, tbody structure
 * - Supports scope attributes for column headers
 * - Keyboard navigation for modal controls
 * - Screen reader compatibility with table structure
 *
 * ### Best Practices
 * - Use semantic HTML table structure (thead, tbody, tfoot)
 * - Provide clear column headers with scope attributes
 * - Consider pagination for very large datasets
 * - Use consistent styling patterns across similar tables
 * - Enable `isRollable` for tables that might need space management
 */
const meta: Meta<typeof Table> = {
  title: 'Components/Table',
  component: Table,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A comprehensive table component with modal expansion and collapsible content capabilities for displaying tabular data effectively.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    isRollable: {
      control: 'boolean',
      description: 'Whether the table content can be collapsed/expanded',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes for custom styling',
      table: {
        type: { summary: 'string' },
      },
    },
    children: {
      control: false,
      description: 'Table content including thead, tbody, tfoot elements',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
  },
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof Table>;

/**
 * ## Basic Examples
 *
 * These stories demonstrate the core functionality and common usage patterns.
 */

/**
 * ### Simple Data Table
 *
 * A basic table with user data demonstrating standard table structure and styling.
 */
export const Default: Story = {
  render: () => (
    <div className="max-w-4xl">
      <Table>
        <thead>
          <tr className="border-gray-200 border-b bg-gray-50">
            <th
              scope="col"
              className="px-6 py-3 text-left font-medium text-gray-500 text-xs uppercase tracking-wider"
            >
              Name
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left font-medium text-gray-500 text-xs uppercase tracking-wider"
            >
              Email
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left font-medium text-gray-500 text-xs uppercase tracking-wider"
            >
              Role
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left font-medium text-gray-500 text-xs uppercase tracking-wider"
            >
              Status
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          <tr className="transition-colors hover:bg-gray-50">
            <td className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 text-sm">
              John Doe
            </td>
            <td className="whitespace-nowrap px-6 py-4 text-gray-500 text-sm">
              john@example.com
            </td>
            <td className="whitespace-nowrap px-6 py-4 text-gray-500 text-sm">
              Administrator
            </td>
            <td className="whitespace-nowrap px-6 py-4">
              <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 font-medium text-green-800 text-xs">
                Active
              </span>
            </td>
          </tr>
          <tr className="transition-colors hover:bg-gray-50">
            <td className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 text-sm">
              Jane Smith
            </td>
            <td className="whitespace-nowrap px-6 py-4 text-gray-500 text-sm">
              jane@example.com
            </td>
            <td className="whitespace-nowrap px-6 py-4 text-gray-500 text-sm">
              Editor
            </td>
            <td className="whitespace-nowrap px-6 py-4">
              <span className="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 font-medium text-xs text-yellow-800">
                Pending
              </span>
            </td>
          </tr>
          <tr className="transition-colors hover:bg-gray-50">
            <td className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 text-sm">
              Bob Johnson
            </td>
            <td className="whitespace-nowrap px-6 py-4 text-gray-500 text-sm">
              bob@example.com
            </td>
            <td className="whitespace-nowrap px-6 py-4 text-gray-500 text-sm">
              Viewer
            </td>
            <td className="whitespace-nowrap px-6 py-4">
              <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 font-medium text-red-800 text-xs">
                Inactive
              </span>
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const table = canvas.getByRole('table');

    // Verify table structure
    await expect(table).toBeInTheDocument();
    await expect(canvas.getAllByRole('columnheader')).toHaveLength(4);
    await expect(canvas.getAllByRole('row')).toHaveLength(4); // 1 header + 3 data rows

    // Test modal expansion button
    const modalButton = canvas.getByLabelText('Move');
    await expect(modalButton).toBeInTheDocument();
    await userEvent.click(modalButton);

    // Modal should be open (though we can't easily test modal content in this context)
  },
};

/**
 * ## Advanced Features
 *
 * Stories demonstrating advanced functionality and real-world usage scenarios.
 */

/**
 * ### Product Inventory Table
 *
 * A comprehensive product table with sorting, filtering, and interactive elements.
 */
export const ProductInventory: Story = {
  render: () => {
    const [sortColumn, setSortColumn] = useState<string>('name');
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
    const [filterCategory, setFilterCategory] = useState<string>('all');

    const products = [
      {
        id: 1,
        name: 'Laptop Pro',
        category: 'Electronics',
        price: 1299,
        stock: 45,
        rating: 4.8,
      },
      {
        id: 2,
        name: 'Wireless Mouse',
        category: 'Electronics',
        price: 29,
        stock: 120,
        rating: 4.5,
      },
      {
        id: 3,
        name: 'Standing Desk',
        category: 'Furniture',
        price: 399,
        stock: 15,
        rating: 4.6,
      },
      {
        id: 4,
        name: 'Coffee Maker',
        category: 'Appliances',
        price: 89,
        stock: 67,
        rating: 4.2,
      },
      {
        id: 5,
        name: 'Ergonomic Chair',
        category: 'Furniture',
        price: 249,
        stock: 8,
        rating: 4.7,
      },
      {
        id: 6,
        name: 'Bluetooth Speaker',
        category: 'Electronics',
        price: 79,
        stock: 34,
        rating: 4.4,
      },
    ];

    const categories = ['all', ...new Set(products.map((p) => p.category))];

    const filteredProducts =
      filterCategory === 'all'
        ? products
        : products.filter((p) => p.category === filterCategory);

    const sortedProducts = [...filteredProducts].sort((a, b) => {
      const aVal = a[sortColumn as keyof typeof a];
      const bVal = b[sortColumn as keyof typeof b];
      const multiplier = sortDirection === 'asc' ? 1 : -1;
      return aVal > bVal ? multiplier : -multiplier;
    });

    const handleSort = (column: string) => {
      if (sortColumn === column) {
        setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
      } else {
        setSortColumn(column);
        setSortDirection('asc');
      }
    };

    const getStockStatus = (stock: number) => {
      if (stock <= 10)
        return { text: 'Low Stock', color: 'bg-red-100 text-red-800' };
      if (stock <= 50)
        return { text: 'Medium', color: 'bg-yellow-100 text-yellow-800' };
      return { text: 'In Stock', color: 'bg-green-100 text-green-800' };
    };

    return (
      <div className="max-w-6xl space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-lg">Product Inventory</h3>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <label htmlFor="category-filter" className="font-medium text-sm">
                Filter:
              </label>
              <select
                id="category-filter"
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="rounded-lg border border-gray-300 px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </option>
                ))}
              </select>
            </div>
            <div className="text-gray-500 text-sm">
              {sortedProducts.length} products
            </div>
          </div>
        </div>

        <Table className="overflow-hidden rounded-lg border border-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="cursor-pointer px-6 py-3 text-left font-medium text-gray-500 text-xs uppercase tracking-wider hover:bg-gray-100"
                onClick={() => handleSort('name')}
              >
                <div className="flex items-center gap-1">
                  Product Name
                  {sortColumn === 'name' && (
                    <span className="text-gray-400">
                      {sortDirection === 'asc' ? '↑' : '↓'}
                    </span>
                  )}
                </div>
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left font-medium text-gray-500 text-xs uppercase tracking-wider"
              >
                Category
              </th>
              <th
                scope="col"
                className="cursor-pointer px-6 py-3 text-left font-medium text-gray-500 text-xs uppercase tracking-wider hover:bg-gray-100"
                onClick={() => handleSort('price')}
              >
                <div className="flex items-center gap-1">
                  Price
                  {sortColumn === 'price' && (
                    <span className="text-gray-400">
                      {sortDirection === 'asc' ? '↑' : '↓'}
                    </span>
                  )}
                </div>
              </th>
              <th
                scope="col"
                className="cursor-pointer px-6 py-3 text-left font-medium text-gray-500 text-xs uppercase tracking-wider hover:bg-gray-100"
                onClick={() => handleSort('stock')}
              >
                <div className="flex items-center gap-1">
                  Stock
                  {sortColumn === 'stock' && (
                    <span className="text-gray-400">
                      {sortDirection === 'asc' ? '↑' : '↓'}
                    </span>
                  )}
                </div>
              </th>
              <th
                scope="col"
                className="cursor-pointer px-6 py-3 text-left font-medium text-gray-500 text-xs uppercase tracking-wider hover:bg-gray-100"
                onClick={() => handleSort('rating')}
              >
                <div className="flex items-center gap-1">
                  Rating
                  {sortColumn === 'rating' && (
                    <span className="text-gray-400">
                      {sortDirection === 'asc' ? '↑' : '↓'}
                    </span>
                  )}
                </div>
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left font-medium text-gray-500 text-xs uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {sortedProducts.map((product) => {
              const stockStatus = getStockStatus(product.stock);
              return (
                <tr
                  key={product.id}
                  className="transition-colors hover:bg-gray-50"
                >
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="font-medium text-gray-900 text-sm">
                      {product.name}
                    </div>
                    <div className="text-gray-500 text-sm">
                      ID: #{product.id}
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-gray-500 text-sm">
                    {product.category}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 text-sm">
                    ${product.price.toLocaleString()}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className="text-gray-900 text-sm">
                        {product.stock}
                      </span>
                      <span
                        className={`inline-flex items-center rounded-full px-2 py-1 font-medium text-xs ${stockStatus.color}`}
                      >
                        {stockStatus.text}
                      </span>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-gray-900 text-sm">
                    <div className="flex items-center gap-1">
                      <span>{product.rating}</span>
                      <span className="text-yellow-400">
                        {'★'.repeat(Math.floor(product.rating))}
                      </span>
                    </div>
                  </td>
                  <td className="space-x-2 whitespace-nowrap px-6 py-4 font-medium text-sm">
                    <button className="text-blue-600 hover:text-blue-900">
                      Edit
                    </button>
                    <button className="text-red-600 hover:text-red-900">
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test sorting functionality
    const nameHeader = canvas.getByText('Product Name');
    await userEvent.click(nameHeader);

    // Test filtering
    const filterSelect = canvas.getByLabelText('Filter:');
    await userEvent.selectOptions(filterSelect, 'Electronics');

    // Verify filtered results
    await expect(canvas.getByText('Laptop Pro')).toBeInTheDocument();
  },
};

/**
 * ### Financial Report Table
 *
 * A financial data table with formatted numbers and trend indicators.
 */
export const FinancialReport: Story = {
  render: () => {
    const financialData = [
      {
        period: 'Q1 2024',
        revenue: 2450000,
        expenses: 1980000,
        profit: 470000,
        growth: 12.5,
      },
      {
        period: 'Q2 2024',
        revenue: 2780000,
        expenses: 2100000,
        profit: 680000,
        growth: 13.5,
      },
      {
        period: 'Q3 2024',
        revenue: 3120000,
        expenses: 2350000,
        profit: 770000,
        growth: 18.2,
      },
      {
        period: 'Q4 2024',
        revenue: 3450000,
        expenses: 2680000,
        profit: 770000,
        growth: 15.8,
      },
    ];

    const formatCurrency = (amount: number) => {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(amount);
    };

    const getGrowthColor = (growth: number) => {
      if (growth > 15) return 'text-green-600';
      if (growth > 10) return 'text-blue-600';
      if (growth > 5) return 'text-yellow-600';
      return 'text-red-600';
    };

    return (
      <div className="max-w-5xl space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-lg">Quarterly Financial Report</h3>
          <div className="text-gray-500 text-sm">Fiscal Year 2024</div>
        </div>

        <Table className="overflow-hidden rounded-lg border border-gray-300 shadow-sm">
          <thead>
            <tr className="bg-gradient-to-r from-gray-50 to-gray-100">
              <th
                scope="col"
                className="px-8 py-4 text-left font-bold text-gray-700 text-sm uppercase tracking-wider"
              >
                Period
              </th>
              <th
                scope="col"
                className="px-8 py-4 text-right font-bold text-gray-700 text-sm uppercase tracking-wider"
              >
                Revenue
              </th>
              <th
                scope="col"
                className="px-8 py-4 text-right font-bold text-gray-700 text-sm uppercase tracking-wider"
              >
                Expenses
              </th>
              <th
                scope="col"
                className="px-8 py-4 text-right font-bold text-gray-700 text-sm uppercase tracking-wider"
              >
                Net Profit
              </th>
              <th
                scope="col"
                className="px-8 py-4 text-right font-bold text-gray-700 text-sm uppercase tracking-wider"
              >
                Growth Rate
              </th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {financialData.map((quarter, index) => (
              <tr
                key={quarter.period}
                className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} border-gray-200 border-b transition-colors hover:bg-blue-50`}
              >
                <td className="whitespace-nowrap px-8 py-6">
                  <div className="font-bold text-gray-900 text-sm">
                    {quarter.period}
                  </div>
                  <div className="text-gray-500 text-xs">
                    Quarter {index + 1}
                  </div>
                </td>
                <td className="whitespace-nowrap px-8 py-6 text-right">
                  <div className="font-bold text-gray-900 text-lg">
                    {formatCurrency(quarter.revenue)}
                  </div>
                  <div className="text-gray-500 text-xs">Total Revenue</div>
                </td>
                <td className="whitespace-nowrap px-8 py-6 text-right">
                  <div className="font-medium text-lg text-red-600">
                    {formatCurrency(quarter.expenses)}
                  </div>
                  <div className="text-gray-500 text-xs">Operating Costs</div>
                </td>
                <td className="whitespace-nowrap px-8 py-6 text-right">
                  <div className="font-bold text-green-600 text-lg">
                    {formatCurrency(quarter.profit)}
                  </div>
                  <div className="text-gray-500 text-xs">
                    Margin:{' '}
                    {((quarter.profit / quarter.revenue) * 100).toFixed(1)}%
                  </div>
                </td>
                <td className="whitespace-nowrap px-8 py-6 text-right">
                  <div
                    className={`font-bold text-lg ${getGrowthColor(quarter.growth)}`}
                  >
                    +{quarter.growth}%
                  </div>
                  <div className="flex items-center justify-end gap-1">
                    <span
                      className={`text-lg ${getGrowthColor(quarter.growth)}`}
                    >
                      {quarter.growth > 10
                        ? '↗️'
                        : quarter.growth > 5
                          ? '→'
                          : '↘️'}
                    </span>
                    <span className="text-gray-500 text-xs">
                      vs prev quarter
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot className="bg-gray-800 text-white">
            <tr>
              <td className="px-8 py-4 font-bold text-sm">TOTAL</td>
              <td className="px-8 py-4 text-right font-bold text-lg">
                {formatCurrency(
                  financialData.reduce((sum, q) => sum + q.revenue, 0)
                )}
              </td>
              <td className="px-8 py-4 text-right font-bold text-lg">
                {formatCurrency(
                  financialData.reduce((sum, q) => sum + q.expenses, 0)
                )}
              </td>
              <td className="px-8 py-4 text-right font-bold text-green-400 text-lg">
                {formatCurrency(
                  financialData.reduce((sum, q) => sum + q.profit, 0)
                )}
              </td>
              <td className="px-8 py-4 text-right font-bold text-lg">
                {(
                  financialData.reduce((sum, q) => sum + q.growth, 0) /
                  financialData.length
                ).toFixed(1)}
                %
              </td>
            </tr>
          </tfoot>
        </Table>

        <div className="flex items-center gap-6 text-gray-600 text-sm">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded bg-green-600"></div>
            <span>High Growth ({'>'}15%)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded bg-blue-600"></div>
            <span>Good Growth (10-15%)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded bg-yellow-600"></div>
            <span>Moderate Growth (5-10%)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded bg-red-600"></div>
            <span>Low Growth ({'<'}5%)</span>
          </div>
        </div>
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify financial data is displayed
    await expect(canvas.getByText('Q1 2024')).toBeInTheDocument();
    await expect(canvas.getByText('$2,450,000')).toBeInTheDocument();

    // Check total row
    await expect(canvas.getByText('TOTAL')).toBeInTheDocument();
  },
};

/**
 * ## Special Cases
 *
 * Stories demonstrating edge cases and special scenarios.
 */

/**
 * ### Collapsible Large Table
 *
 * A large table with collapsible content to save space.
 */
export const CollapsibleLargeTable: Story = {
  render: () => {
    const employees = Array.from({ length: 25 }, (_, i) => ({
      id: i + 1,
      name: `Employee ${i + 1}`,
      email: `employee${i + 1}@company.com`,
      department: ['Engineering', 'Marketing', 'Sales', 'HR', 'Finance'][i % 5],
      position: ['Manager', 'Senior', 'Junior', 'Lead', 'Director'][i % 5],
      salary: 50000 + i * 2000,
      startDate: new Date(2020 + (i % 5), i % 12, (i % 28) + 1),
      status: ['Active', 'On Leave', 'Inactive'][i % 3],
    }));

    return (
      <div className="max-w-7xl space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-lg">Employee Directory</h3>
          <div className="text-gray-500 text-sm">
            {employees.length} employees • Click to expand/collapse
          </div>
        </div>

        <Table isRollable className="rounded-lg border border-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left font-medium text-gray-500 text-xs uppercase"
              >
                ID
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left font-medium text-gray-500 text-xs uppercase"
              >
                Employee
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left font-medium text-gray-500 text-xs uppercase"
              >
                Department
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left font-medium text-gray-500 text-xs uppercase"
              >
                Position
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left font-medium text-gray-500 text-xs uppercase"
              >
                Salary
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left font-medium text-gray-500 text-xs uppercase"
              >
                Start Date
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left font-medium text-gray-500 text-xs uppercase"
              >
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {employees.map((employee) => (
              <tr key={employee.id} className="hover:bg-gray-50">
                <td className="whitespace-nowrap px-6 py-4 text-gray-900 text-sm">
                  #{employee.id.toString().padStart(3, '0')}
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <div className="font-medium text-gray-900 text-sm">
                    {employee.name}
                  </div>
                  <div className="text-gray-500 text-sm">{employee.email}</div>
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-gray-500 text-sm">
                  {employee.department}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-gray-500 text-sm">
                  {employee.position}
                </td>
                <td className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 text-sm">
                  ${employee.salary.toLocaleString()}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-gray-500 text-sm">
                  {employee.startDate.toLocaleDateString()}
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 font-medium text-xs ${
                      employee.status === 'Active'
                        ? 'bg-green-100 text-green-800'
                        : employee.status === 'On Leave'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {employee.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify large table is present
    const rows = canvas.getAllByRole('row');
    await expect(rows.length).toBeGreaterThan(20); // Header + data rows

    // Test that modal expansion button works
    const modalButton = canvas.getByLabelText('Move');
    await expect(modalButton).toBeInTheDocument();
  },
};

/**
 * ### Empty State Table
 *
 * A table showing empty state with appropriate messaging.
 */
export const EmptyState: Story = {
  render: () => (
    <div className="max-w-4xl">
      <Table className="rounded-lg border border-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left font-medium text-gray-500 text-xs uppercase tracking-wider"
            >
              Name
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left font-medium text-gray-500 text-xs uppercase tracking-wider"
            >
              Email
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left font-medium text-gray-500 text-xs uppercase tracking-wider"
            >
              Status
            </th>
          </tr>
        </thead>
        <tbody className="bg-white">
          <tr>
            <td colSpan={3} className="px-6 py-16 text-center">
              <div className="space-y-4">
                <div className="text-6xl text-gray-300">📋</div>
                <div>
                  <h3 className="mb-2 font-medium text-gray-900 text-lg">
                    No data available
                  </h3>
                  <p className="mb-6 text-gray-500 text-sm">
                    There are currently no items to display in this table.
                    <br />
                    Try adjusting your filters or adding some data.
                  </p>
                  <button className="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 font-medium text-sm text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    Add New Item
                  </button>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify empty state message
    await expect(canvas.getByText('No data available')).toBeInTheDocument();
    await expect(canvas.getByText('Add New Item')).toBeInTheDocument();
  },
};
