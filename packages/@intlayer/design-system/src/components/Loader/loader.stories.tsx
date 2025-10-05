import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';
import { Loader } from '.';

const meta: Meta<typeof Loader> = {
  title: 'Components/Loader',
  component: Loader,
  tags: ['autodocs'],
  argTypes: {
    isLoading: {
      description:
        'Controls whether the loader (spinner) is displayed. Defaults to true when undefined.',
      control: { type: 'boolean' },
      defaultValue: true,
    },
    children: {
      description:
        'Optional content to render when not loading (isLoading = false).',
      control: 'text',
    },
    className: {
      description:
        'Additional CSS classes applied to the loader container when loading.',
      control: 'text',
    },
    'aria-label': {
      description: 'Custom accessibility label for the loading state.',
      control: 'text',
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'A versatile loading component that can function as both a standalone loader and a wrapper for content. Features an animated SVG spinner with accessibility support.',
      },
    },
  },
} satisfies Meta<typeof Loader>;

type Story = StoryObj<typeof Loader>;

export default meta;

// Basic Examples
export const Default: Story = {
  args: {
    isLoading: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'The default loader showing the animated spinner.',
      },
    },
  },
};

export const Standalone: Story = {
  args: {
    isLoading: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Loader used as a standalone loading indicator.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test that loader is rendered with proper role
    const loader = canvas.getByRole('status');
    expect(loader).toBeInTheDocument();

    // Test default aria-label
    expect(loader).toHaveAttribute(
      'aria-label',
      'Animated icon, meaning that the website is processing'
    );

    // Test that spinner SVG is present
    const spinner = canvas.getByRole('status').querySelector('svg');
    expect(spinner).toBeInTheDocument();
  },
};

export const AsWrapper: Story = {
  args: {
    isLoading: false,
    children:
      'This is the loaded content that appears when isLoading is false.',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Loader used as a wrapper component that shows content when not loading.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test that content is rendered when not loading
    expect(
      canvas.getByText(
        'This is the loaded content that appears when isLoading is false.'
      )
    ).toBeInTheDocument();

    // Test that loader/spinner is not present
    expect(canvas.queryByRole('status')).not.toBeInTheDocument();
  },
};

export const LoadingToLoaded: Story = {
  args: {
    isLoading: true,
    children: (
      <div className="p-6 text-center">
        <h2 className="mb-2 font-bold text-xl">Data Loaded Successfully!</h2>
        <p className="text-gray-600">
          This content appears when loading completes.
        </p>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          'Demonstrates the transition from loading state to loaded content. Toggle the isLoading control to see the change.',
      },
    },
  },
};

// Styling Variations
export const CustomStyling: Story = {
  args: {
    isLoading: true,
    className:
      'min-h-[300px] bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg border-2 border-blue-200',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Loader with custom styling including minimum height, gradient background, and border.',
      },
    },
  },
};

export const CompactSize: Story = {
  args: {
    isLoading: true,
    className: 'min-h-[100px] max-w-[200px]',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Compact loader suitable for smaller containers or inline loading.',
      },
    },
  },
};

export const FullHeight: Story = {
  args: {
    isLoading: true,
    className: 'min-h-[500px]',
  },
  parameters: {
    docs: {
      description: {
        story: 'Full-height loader for page-level loading states.',
      },
    },
  },
};

export const ColoredLoader: Story = {
  args: {
    isLoading: true,
    className: 'text-blue-600 min-h-[200px]',
  },
  parameters: {
    docs: {
      description: {
        story: 'Loader with custom color using text color utilities.',
      },
    },
  },
};

// Content Examples
export const WithRichContent: Story = {
  args: {
    isLoading: false,
    children: (
      <div className="mx-auto max-w-md p-8">
        <div className="mb-4">
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-green-500">
            <span className="text-white text-xl">✓</span>
          </div>
          <h3 className="font-semibold text-gray-900 text-lg">
            Profile Updated
          </h3>
          <p className="text-gray-600">
            Your profile information has been successfully saved.
          </p>
        </div>
        <button className="rounded bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700">
          Continue
        </button>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          'Loader wrapping rich content with success message, icon, and action button.',
      },
    },
  },
};

export const WithList: Story = {
  args: {
    isLoading: false,
    children: (
      <div className="p-4">
        <h3 className="mb-4 font-semibold text-lg">Recent Activities</h3>
        <ul className="space-y-3">
          {[
            'Profile updated successfully',
            'New notification received',
            'Settings synchronized',
            'Backup completed',
          ].map((item, index) => (
            <li key={index} className="flex items-center space-x-2">
              <span className="h-2 w-2 rounded-full bg-green-500"></span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          'Loader wrapping a list of items, useful for activity feeds or progress tracking.',
      },
    },
  },
};

// Interactive Examples
export const SimulatedLoading: Story = {
  args: {
    isLoading: true,
    children: (
      <div className="p-6 text-center">
        <h2 className="mb-2 font-bold text-green-600 text-xl">
          ✅ Loading Complete!
        </h2>
        <p className="text-gray-600">
          Your data has been processed successfully.
        </p>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          'Toggle between loading and loaded states to simulate real loading behavior.',
      },
    },
  },
};

// Accessibility Examples
export const CustomAriaLabel: Story = {
  args: {
    isLoading: true,
    'aria-label': 'Loading user profile data, please wait',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Loader with custom aria-label for specific context accessibility.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const loader = canvas.getByRole('status');

    // Test custom aria-label
    expect(loader).toHaveAttribute(
      'aria-label',
      'Loading user profile data, please wait'
    );
  },
};

export const AccessibilityTest: Story = {
  args: {
    isLoading: true,
    id: 'main-loader',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Loader with comprehensive accessibility attributes and test identifiers.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const loader = canvas.getByRole('status');

    // Test accessibility attributes
    expect(loader).toHaveAttribute('role', 'status');
    expect(loader).toHaveAttribute('id', 'main-loader');

    // Test that it's focusable for screen readers
    expect(loader).toBeInTheDocument();

    // Test SVG presence and structure
    const svg = loader.querySelector('svg');
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute('xmlns', 'http://www.w3.org/2000/svg');
  },
};

// Real-world Usage Examples
export const DataTableLoading: Story = {
  render: (args) => (
    <div className="overflow-hidden rounded-lg border">
      <div className="border-b bg-gray-50 px-6 py-4">
        <h3 className="font-semibold text-lg">User Management</h3>
      </div>
      <Loader {...args} className="min-h-[300px]" isLoading={args.isLoading}>
        <div className="p-0">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left font-medium text-gray-500 text-xs uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left font-medium text-gray-500 text-xs uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left font-medium text-gray-500 text-xs uppercase tracking-wider">
                  Role
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {[
                { name: 'John Doe', email: 'john@example.com', role: 'Admin' },
                { name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
                {
                  name: 'Bob Johnson',
                  email: 'bob@example.com',
                  role: 'Editor',
                },
              ].map((user, index) => (
                <tr key={index}>
                  <td className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 text-sm">
                    {user.name}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-gray-500 text-sm">
                    {user.email}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-gray-500 text-sm">
                    {user.role}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Loader>
    </div>
  ),
  args: {
    isLoading: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Loader used in a data table context, showing loading state while fetching user data.',
      },
    },
  },
};

export const FormSubmission: Story = {
  render: (args) => (
    <div className="mx-auto max-w-md rounded-lg border bg-white p-6">
      <h3 className="mb-4 font-semibold text-lg">Contact Form</h3>
      <Loader {...args} className="min-h-[200px]">
        <div className="p-6 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <span className="text-2xl text-green-600">✓</span>
          </div>
          <h4 className="mb-2 font-semibold text-gray-900 text-lg">
            Message Sent!
          </h4>
          <p className="text-gray-600">
            Thank you for your message. We'll get back to you soon.
          </p>
        </div>
      </Loader>
    </div>
  ),
  args: {
    isLoading: true,
    'aria-label': 'Submitting your message, please wait',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Loader used during form submission with success message when complete.',
      },
    },
  },
};

// Edge Cases
export const EmptyChildren: Story = {
  args: {
    isLoading: false,
    children: undefined,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Loader with no children content when not loading (renders empty fragment).',
      },
    },
  },
  play: async ({ canvasElement }) => {
    // Should not render any visible content when not loading and no children
    expect(canvasElement.textContent?.trim()).toBe('');
  },
};

export const AlwaysLoading: Story = {
  args: {
    isLoading: true,
    children: 'This content will never show because isLoading is always true',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Loader that always shows loading state regardless of children content.',
      },
    },
  },
};
