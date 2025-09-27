import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';
import { KeyboardScreenAdapter } from '.';

const meta: Meta<typeof KeyboardScreenAdapter> = {
  title: 'Components/KeyboardScreenAdapter',
  component: KeyboardScreenAdapter,
  tags: ['autodocs'],
  argTypes: {
    children: {
      description: 'Content to render within the adaptive container',
      control: false,
    },
    className: {
      description: 'Additional CSS classes for the container',
      control: 'text',
    },
    style: {
      description:
        'Inline styles (note: maxHeight may be overridden by keyboard detection)',
      control: 'object',
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'A smart wrapper component that automatically adapts viewport height when virtual keyboards appear on mobile devices. Prevents content from being hidden behind the keyboard.',
      },
    },
    layout: 'fullscreen',
  },
} satisfies Meta<typeof KeyboardScreenAdapter>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic Examples
export const Default: Story = {
  args: {
    children: (
      <div className="flex items-center justify-center h-full bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            KeyboardScreenAdapter Demo
          </h1>
          <p className="text-gray-600 mb-6">
            This component adapts to virtual keyboard visibility on mobile
            devices.
          </p>
          <input
            type="text"
            placeholder="Try typing here on a mobile device"
            className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          'Basic usage with a simple input field that demonstrates keyboard adaptation.',
      },
    },
  },
};

export const FormExample: Story = {
  args: {
    children: (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            Contact Form
          </h2>
          <form className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Full Name
              </label>
              <input
                id="name"
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your full name"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Phone Number
              </label>
              <input
                id="phone"
                type="tel"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your phone number"
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Message
              </label>
              <textarea
                id="message"
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your message"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          'A complete contact form that demonstrates how KeyboardScreenAdapter prevents form fields from being hidden when the virtual keyboard appears.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test form elements are present
    expect(canvas.getByLabelText('Full Name')).toBeInTheDocument();
    expect(canvas.getByLabelText('Email Address')).toBeInTheDocument();
    expect(canvas.getByLabelText('Phone Number')).toBeInTheDocument();
    expect(canvas.getByLabelText('Message')).toBeInTheDocument();

    // Test form submission button
    const submitButton = canvas.getByRole('button', { name: /send message/i });
    expect(submitButton).toBeInTheDocument();
  },
};

export const ChatInterface: Story = {
  args: {
    children: (
      <div className="h-screen flex flex-col bg-gray-100">
        {/* Header */}
        <div className="bg-blue-600 text-white p-4">
          <h2 className="text-lg font-semibold">Chat Support</h2>
          <p className="text-blue-100 text-sm">
            Online • Typically replies instantly
          </p>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-auto p-4 space-y-4">
          <div className="flex">
            <div className="bg-white rounded-lg p-3 max-w-xs shadow-sm">
              <p className="text-sm">Hello! How can we help you today?</p>
              <p className="text-xs text-gray-500 mt-1">10:30 AM</p>
            </div>
          </div>

          <div className="flex justify-end">
            <div className="bg-blue-600 text-white rounded-lg p-3 max-w-xs">
              <p className="text-sm">I need help with my account settings</p>
              <p className="text-xs text-blue-100 mt-1">10:32 AM</p>
            </div>
          </div>

          <div className="flex">
            <div className="bg-white rounded-lg p-3 max-w-xs shadow-sm">
              <p className="text-sm">
                I'd be happy to help you with that! What specific setting would
                you like to change?
              </p>
              <p className="text-xs text-gray-500 mt-1">10:33 AM</p>
            </div>
          </div>
        </div>

        {/* Message Input */}
        <div className="p-4 bg-white border-t">
          <div className="flex space-x-2">
            <input
              type="text"
              placeholder="Type your message..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors">
              Send
            </button>
          </div>
        </div>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          'A chat interface that demonstrates how KeyboardScreenAdapter ensures the message input remains visible and accessible when typing on mobile devices.',
      },
    },
  },
};

export const SearchInterface: Story = {
  args: {
    children: (
      <div className="min-h-screen bg-white">
        {/* Search Header */}
        <div className="sticky top-0 bg-white border-b p-4">
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <input
                type="search"
                placeholder="Search for anything..."
                className="w-full px-4 py-3 pl-12 pr-4 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Search Results */}
        <div className="max-w-2xl mx-auto p-4">
          <div className="space-y-4">
            {[
              'Getting started with KeyboardScreenAdapter',
              'Mobile-first responsive design patterns',
              'Handling virtual keyboards in web applications',
              'Accessibility best practices for mobile forms',
              'Progressive Web App development guide',
            ].map((result, index) => (
              <div
                key={index}
                className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
              >
                <h3 className="font-medium text-gray-900">{result}</h3>
                <p className="text-gray-600 text-sm mt-1">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  do eiusmod tempor incididunt ut labore.
                </p>
                <div className="flex items-center mt-2 text-xs text-gray-500">
                  <span>example.com</span>
                  <span className="mx-2">•</span>
                  <span>2 min read</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          'A search interface showing how the component maintains usability during search input on mobile devices.',
      },
    },
  },
};

// Styling Variations
export const CustomStyling: Story = {
  args: {
    className: 'bg-gradient-to-br from-purple-50 to-pink-50',
    children: (
      <div className="flex items-center justify-center h-full p-8">
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-8 shadow-xl max-w-md w-full">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Custom Styled Container
          </h2>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Username"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white/50"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white/50"
            />
            <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 transition-all">
              Sign In
            </button>
          </div>
        </div>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          'KeyboardScreenAdapter with custom styling including gradients and glassmorphism effects.',
      },
    },
  },
};

export const MinimalHeight: Story = {
  args: {
    className: 'min-h-[400px] max-w-md mx-auto bg-gray-50',
    children: (
      <div className="p-6 h-full">
        <h3 className="text-lg font-semibold mb-4">Compact Form</h3>
        <div className="space-y-3">
          <input
            type="email"
            placeholder="Email address"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
            Login
          </button>
        </div>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          'Compact version with custom height constraints, useful for modal or sidebar implementations.',
      },
    },
  },
};

// Accessibility Testing
export const AccessibilityTest: Story = {
  args: {
    role: 'main',
    'aria-label': 'Main application content with keyboard adaptation',
    children: (
      <div className="p-6 max-w-lg mx-auto">
        <h1 className="text-xl font-bold mb-4">Accessible Form</h1>
        <form className="space-y-4">
          <div>
            <label
              htmlFor="acc-name"
              className="block text-sm font-medium mb-1"
            >
              Name (required)
            </label>
            <input
              id="acc-name"
              type="text"
              required
              aria-describedby="name-help"
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p id="name-help" className="text-sm text-gray-600 mt-1">
              Enter your full legal name
            </p>
          </div>
          <div>
            <label
              htmlFor="acc-email"
              className="block text-sm font-medium mb-1"
            >
              Email (required)
            </label>
            <input
              id="acc-email"
              type="email"
              required
              aria-describedby="email-help"
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p id="email-help" className="text-sm text-gray-600 mt-1">
              We'll use this to contact you
            </p>
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Submit Form
          </button>
        </form>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          'Form with comprehensive accessibility features including proper labels, ARIA attributes, and keyboard navigation support.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test accessibility attributes on the container
    const main = canvas.getByRole('main');
    expect(main).toHaveAttribute(
      'aria-label',
      'Main application content with keyboard adaptation'
    );

    // Test form accessibility
    const nameInput = canvas.getByLabelText(/name \(required\)/i);
    const emailInput = canvas.getByLabelText(/email \(required\)/i);

    expect(nameInput).toHaveAttribute('required');
    expect(nameInput).toHaveAttribute('aria-describedby', 'name-help');

    expect(emailInput).toHaveAttribute('required');
    expect(emailInput).toHaveAttribute('aria-describedby', 'email-help');

    // Test help text association
    expect(canvas.getByText('Enter your full legal name')).toHaveAttribute(
      'id',
      'name-help'
    );
    expect(canvas.getByText("We'll use this to contact you")).toHaveAttribute(
      'id',
      'email-help'
    );
  },
};

// Edge Cases and Real-world Examples
export const LongContent: Story = {
  args: {
    children: (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Long Scrollable Content</h1>
        <div className="space-y-6">
          {Array.from({ length: 10 }, (_, i) => (
            <div key={i} className="bg-white p-4 rounded-lg shadow">
              <h3 className="font-semibold mb-2">Section {i + 1}</h3>
              <p className="text-gray-600 mb-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
              {i === 5 && (
                <input
                  type="text"
                  placeholder="Input in the middle of long content"
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              )}
            </div>
          ))}
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Final Input</h3>
            <input
              type="text"
              placeholder="Try typing here after scrolling"
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          'Long scrollable content with inputs at various positions to test keyboard adaptation with scrolling.',
      },
    },
  },
};

export const MultiStepForm: Story = {
  args: {
    children: (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-md mx-auto">
          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-center space-x-4">
              {[1, 2, 3].map((step, index) => (
                <div key={step} className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      index === 0
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    {step}
                  </div>
                  {index < 2 && <div className="w-12 h-px bg-gray-300 mx-2" />}
                </div>
              ))}
            </div>
            <p className="text-center text-sm text-gray-600 mt-2">
              Step 1 of 3: Personal Information
            </p>
          </div>

          {/* Form Content */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-6">Personal Information</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date of Birth
                </label>
                <input
                  type="date"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="+1 (555) 123-4567"
                />
              </div>

              <div className="flex justify-between pt-6">
                <button className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50">
                  Back
                </button>
                <button className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                  Next Step
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          'Multi-step form wizard that demonstrates keyboard adaptation across different form sections and input types.',
      },
    },
  },
};
