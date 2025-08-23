import type { Meta, StoryObj } from '@storybook/react';
import { Table } from './Table';

const meta: Meta<typeof Table> = {
  title: 'Components/Table',
  component: Table,
  tags: ['autodocs'],
  argTypes: {
    className: {
      description: 'Additional CSS classes for styling',
      control: 'text',
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'A responsive table component that automatically handles large content with a collapsible view and modal expansion option.',
      },
    },
  },
} satisfies Meta<typeof Table>;

export default meta;

const Template: StoryObj<typeof Table> = {
  args: {
    className: '',
  },
};

export const Default = Template;

export const BasicTable: StoryObj<typeof Table> = {
  args: {
    ...Template.args,
    children: (
      <>
        <thead>
          <tr className="border-b border-gray-200 dark:border-gray-700">
            <th className="px-4 py-2 text-left font-medium text-gray-900 dark:text-gray-100">
              Name
            </th>
            <th className="px-4 py-2 text-left font-medium text-gray-900 dark:text-gray-100">
              Email
            </th>
            <th className="px-4 py-2 text-left font-medium text-gray-900 dark:text-gray-100">
              Role
            </th>
            <th className="px-4 py-2 text-left font-medium text-gray-900 dark:text-gray-100">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800">
            <td className="px-4 py-2 text-gray-900 dark:text-gray-100">
              John Doe
            </td>
            <td className="px-4 py-2 text-gray-600 dark:text-gray-400">
              john@example.com
            </td>
            <td className="px-4 py-2 text-gray-600 dark:text-gray-400">
              Admin
            </td>
            <td className="px-4 py-2">
              <span className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                Active
              </span>
            </td>
          </tr>
          <tr className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800">
            <td className="px-4 py-2 text-gray-900 dark:text-gray-100">
              Jane Smith
            </td>
            <td className="px-4 py-2 text-gray-600 dark:text-gray-400">
              jane@example.com
            </td>
            <td className="px-4 py-2 text-gray-600 dark:text-gray-400">User</td>
            <td className="px-4 py-2">
              <span className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                Pending
              </span>
            </td>
          </tr>
          <tr className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800">
            <td className="px-4 py-2 text-gray-900 dark:text-gray-100">
              Bob Johnson
            </td>
            <td className="px-4 py-2 text-gray-600 dark:text-gray-400">
              bob@example.com
            </td>
            <td className="px-4 py-2 text-gray-600 dark:text-gray-400">
              Editor
            </td>
            <td className="px-4 py-2">
              <span className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                Active
              </span>
            </td>
          </tr>
        </tbody>
      </>
    ),
  },
};

export const LargeTable: StoryObj<typeof Table> = {
  args: {
    ...Template.args,
    children: (
      <>
        <thead>
          <tr className="border-b border-gray-200 dark:border-gray-700">
            <th className="px-4 py-2 text-left font-medium text-gray-900 dark:text-gray-100">
              ID
            </th>
            <th className="px-4 py-2 text-left font-medium text-gray-900 dark:text-gray-100">
              Name
            </th>
            <th className="px-4 py-2 text-left font-medium text-gray-900 dark:text-gray-100">
              Email
            </th>
            <th className="px-4 py-2 text-left font-medium text-gray-900 dark:text-gray-100">
              Department
            </th>
            <th className="px-4 py-2 text-left font-medium text-gray-900 dark:text-gray-100">
              Position
            </th>
            <th className="px-4 py-2 text-left font-medium text-gray-900 dark:text-gray-100">
              Salary
            </th>
            <th className="px-4 py-2 text-left font-medium text-gray-900 dark:text-gray-100">
              Start Date
            </th>
            <th className="px-4 py-2 text-left font-medium text-gray-900 dark:text-gray-100">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 20 }, (_, i) => (
            <tr
              key={i}
              className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              <td className="px-4 py-2 text-gray-900 dark:text-gray-100">
                #{i + 1}
              </td>
              <td className="px-4 py-2 text-gray-900 dark:text-gray-100">
                Employee {i + 1}
              </td>
              <td className="px-4 py-2 text-gray-600 dark:text-gray-400">
                employee{i + 1}@company.com
              </td>
              <td className="px-4 py-2 text-gray-600 dark:text-gray-400">
                {['Engineering', 'Marketing', 'Sales', 'HR', 'Finance'][i % 5]}
              </td>
              <td className="px-4 py-2 text-gray-600 dark:text-gray-400">
                {
                  [
                    'Developer',
                    'Manager',
                    'Analyst',
                    'Coordinator',
                    'Specialist',
                  ][i % 5]
                }
              </td>
              <td className="px-4 py-2 text-gray-600 dark:text-gray-400">
                ${(50000 + i * 2000).toLocaleString()}
              </td>
              <td className="px-4 py-2 text-gray-600 dark:text-gray-400">
                {new Date(
                  2020 + (i % 4),
                  i % 12,
                  (i % 28) + 1
                ).toLocaleDateString()}
              </td>
              <td className="px-4 py-2">
                <span
                  className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${
                    i % 3 === 0
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                      : i % 3 === 1
                        ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                        : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                  }`}
                >
                  {i % 3 === 0
                    ? 'Active'
                    : i % 3 === 1
                      ? 'Pending'
                      : 'Inactive'}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </>
    ),
  },
};

export const DataTable: StoryObj<typeof Table> = {
  args: {
    ...Template.args,
    children: (
      <>
        <thead>
          <tr className="border-b border-gray-200 dark:border-gray-700">
            <th className="px-4 py-2 text-left font-medium text-gray-900 dark:text-gray-100">
              Product
            </th>
            <th className="px-4 py-2 text-left font-medium text-gray-900 dark:text-gray-100">
              Category
            </th>
            <th className="px-4 py-2 text-left font-medium text-gray-900 dark:text-gray-100">
              Price
            </th>
            <th className="px-4 py-2 text-left font-medium text-gray-900 dark:text-gray-100">
              Stock
            </th>
            <th className="px-4 py-2 text-left font-medium text-gray-900 dark:text-gray-100">
              Rating
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800">
            <td className="px-4 py-2 text-gray-900 dark:text-gray-100">
              Laptop Pro
            </td>
            <td className="px-4 py-2 text-gray-600 dark:text-gray-400">
              Electronics
            </td>
            <td className="px-4 py-2 text-gray-600 dark:text-gray-400">
              $1,299
            </td>
            <td className="px-4 py-2 text-gray-600 dark:text-gray-400">45</td>
            <td className="px-4 py-2 text-gray-600 dark:text-gray-400">
              ⭐⭐⭐⭐⭐
            </td>
          </tr>
          <tr className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800">
            <td className="px-4 py-2 text-gray-900 dark:text-gray-100">
              Wireless Headphones
            </td>
            <td className="px-4 py-2 text-gray-600 dark:text-gray-400">
              Audio
            </td>
            <td className="px-4 py-2 text-gray-600 dark:text-gray-400">$199</td>
            <td className="px-4 py-2 text-gray-600 dark:text-gray-400">120</td>
            <td className="px-4 py-2 text-gray-600 dark:text-gray-400">
              ⭐⭐⭐⭐
            </td>
          </tr>
          <tr className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800">
            <td className="px-4 py-2 text-gray-900 dark:text-gray-100">
              Smart Watch
            </td>
            <td className="px-4 py-2 text-gray-600 dark:text-gray-400">
              Wearables
            </td>
            <td className="px-4 py-2 text-gray-600 dark:text-gray-400">$399</td>
            <td className="px-4 py-2 text-gray-600 dark:text-gray-400">78</td>
            <td className="px-4 py-2 text-gray-600 dark:text-gray-400">
              ⭐⭐⭐⭐⭐
            </td>
          </tr>
          <tr className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800">
            <td className="px-4 py-2 text-gray-900 dark:text-gray-100">
              Coffee Maker
            </td>
            <td className="px-4 py-2 text-gray-600 dark:text-gray-400">Home</td>
            <td className="px-4 py-2 text-gray-600 dark:text-gray-400">$89</td>
            <td className="px-4 py-2 text-gray-600 dark:text-gray-400">156</td>
            <td className="px-4 py-2 text-gray-600 dark:text-gray-400">
              ⭐⭐⭐
            </td>
          </tr>
        </tbody>
      </>
    ),
  },
};

export const CustomStyling: StoryObj<typeof Table> = {
  args: {
    ...Template.args,
    className:
      'border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden',
    children: (
      <>
        <thead>
          <tr className="bg-gray-100 dark:bg-gray-800">
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Title
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Email
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Role
            </th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
          <tr className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-150">
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
              John Doe
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
              Senior Developer
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
              john@example.com
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
              Admin
            </td>
          </tr>
          <tr className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-150">
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
              Jane Smith
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
              Product Manager
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
              jane@example.com
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
              User
            </td>
          </tr>
        </tbody>
      </>
    ),
  },
};

export const EmptyTable: StoryObj<typeof Table> = {
  args: {
    ...Template.args,
    children: (
      <>
        <thead>
          <tr className="border-b border-gray-200 dark:border-gray-700">
            <th className="px-4 py-2 text-left font-medium text-gray-900 dark:text-gray-100">
              Name
            </th>
            <th className="px-4 py-2 text-left font-medium text-gray-900 dark:text-gray-100">
              Email
            </th>
            <th className="px-4 py-2 text-left font-medium text-gray-900 dark:text-gray-100">
              Role
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td
              colSpan={3}
              className="px-4 py-8 text-center text-gray-500 dark:text-gray-400"
            >
              No data available
            </td>
          </tr>
        </tbody>
      </>
    ),
  },
};
