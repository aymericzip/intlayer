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
      <div className="flex h-full items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="p-6 text-center">
          <h1 className="mb-4 font-bold text-2xl text-gray-800">
            KeyboardScreenAdapter Demo
          </h1>
          <p className="mb-6 text-gray-600">
            This component adapts to virtual keyboard visibility on mobile
            devices.
          </p>
          <input
            type="text"
            placeholder="Try typing here on a mobile device"
            className="w-full max-w-md rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
        <div className="mx-auto max-w-md rounded-lg bg-white p-6 shadow-md">
          <h2 className="mb-6 font-semibold text-gray-800 text-xl">
            Contact Form
          </h2>
          <form className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="mb-2 block font-medium text-gray-700 text-sm"
              >
                Full Name
              </label>
              <input
                id="name"
                type="text"
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your full name"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="mb-2 block font-medium text-gray-700 text-sm"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label
                htmlFor="phone"
                className="mb-2 block font-medium text-gray-700 text-sm"
              >
                Phone Number
              </label>
              <input
                id="phone"
                type="tel"
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your phone number"
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="mb-2 block font-medium text-gray-700 text-sm"
              >
                Message
              </label>
              <textarea
                id="message"
                rows={4}
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your message"
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-md bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
      <div className="flex h-screen flex-col bg-gray-100">
        {/* Header */}
        <div className="bg-blue-600 p-4 text-white">
          <h2 className="font-semibold text-lg">Chat Support</h2>
          <p className="text-blue-100 text-sm">
            Online • Typically replies instantly
          </p>
        </div>

        {/* Messages */}
        <div className="flex-1 space-y-4 overflow-auto p-4">
          <div className="flex">
            <div className="max-w-xs rounded-lg bg-white p-3 shadow-sm">
              <p className="text-sm">Hello! How can we help you today?</p>
              <p className="mt-1 text-gray-500 text-xs">10:30 AM</p>
            </div>
          </div>

          <div className="flex justify-end">
            <div className="max-w-xs rounded-lg bg-blue-600 p-3 text-white">
              <p className="text-sm">I need help with my account settings</p>
              <p className="mt-1 text-blue-100 text-xs">10:32 AM</p>
            </div>
          </div>

          <div className="flex">
            <div className="max-w-xs rounded-lg bg-white p-3 shadow-sm">
              <p className="text-sm">
                I'd be happy to help you with that! What specific setting would
                you like to change?
              </p>
              <p className="mt-1 text-gray-500 text-xs">10:33 AM</p>
            </div>
          </div>
        </div>

        {/* Message Input */}
        <div className="border-t bg-white p-4">
          <div className="flex space-x-2">
            <input
              type="text"
              placeholder="Type your message..."
              className="flex-1 rounded-full border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="rounded-full bg-blue-600 px-6 py-2 text-white transition-colors hover:bg-blue-700">
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
        <div className="sticky top-0 border-b bg-white p-4">
          <div className="mx-auto max-w-2xl">
            <div className="relative">
              <input
                type="search"
                placeholder="Search for anything..."
                className="w-full rounded-full border border-gray-300 px-4 py-3 pr-4 pl-12 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="-translate-y-1/2 absolute top-1/2 left-4 transform">
                <svg
                  className="h-5 w-5 text-gray-400"
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
        <div className="mx-auto max-w-2xl p-4">
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
                className="rounded-lg border border-gray-200 p-4 hover:bg-gray-50"
              >
                <h3 className="font-medium text-gray-900">{result}</h3>
                <p className="mt-1 text-gray-600 text-sm">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  do eiusmod tempor incididunt ut labore.
                </p>
                <div className="mt-2 flex items-center text-gray-500 text-xs">
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
      <div className="flex h-full items-center justify-center p-8">
        <div className="w-full max-w-md rounded-xl bg-white/80 p-8 shadow-xl backdrop-blur-sm">
          <h2 className="mb-6 text-center font-bold text-2xl text-gray-800">
            Custom Styled Container
          </h2>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Username"
              className="w-full rounded-lg border border-gray-200 bg-white/50 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full rounded-lg border border-gray-200 bg-white/50 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button className="w-full rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 py-3 font-medium text-white transition-all hover:from-purple-700 hover:to-pink-700">
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
      <div className="h-full p-6">
        <h3 className="mb-4 font-semibold text-lg">Compact Form</h3>
        <div className="space-y-3">
          <input
            type="email"
            placeholder="Email address"
            className="w-full rounded border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full rounded border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="w-full rounded bg-blue-600 py-2 text-white hover:bg-blue-700">
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
      <div className="mx-auto max-w-lg p-6">
        <h1 className="mb-4 font-bold text-xl">Accessible Form</h1>
        <form className="space-y-4">
          <div>
            <label
              htmlFor="acc-name"
              className="mb-1 block font-medium text-sm"
            >
              Name (required)
            </label>
            <input
              id="acc-name"
              type="text"
              required
              aria-describedby="name-help"
              className="w-full rounded border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p id="name-help" className="mt-1 text-gray-600 text-sm">
              Enter your full legal name
            </p>
          </div>
          <div>
            <label
              htmlFor="acc-email"
              className="mb-1 block font-medium text-sm"
            >
              Email (required)
            </label>
            <input
              id="acc-email"
              type="email"
              required
              aria-describedby="email-help"
              className="w-full rounded border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p id="email-help" className="mt-1 text-gray-600 text-sm">
              We'll use this to contact you
            </p>
          </div>
          <button
            type="submit"
            className="w-full rounded bg-green-600 py-2 text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
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
        <h1 className="mb-4 font-bold text-2xl">Long Scrollable Content</h1>
        <div className="space-y-6">
          {Array.from({ length: 10 }, (_, i) => (
            <div key={i} className="rounded-lg bg-white p-4 shadow">
              <h3 className="mb-2 font-semibold">Section {i + 1}</h3>
              <p className="mb-4 text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
              {i === 5 && (
                <input
                  type="text"
                  placeholder="Input in the middle of long content"
                  className="w-full rounded border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              )}
            </div>
          ))}
          <div className="rounded-lg bg-blue-50 p-4">
            <h3 className="mb-2 font-semibold">Final Input</h3>
            <input
              type="text"
              placeholder="Try typing here after scrolling"
              className="w-full rounded border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
        <div className="mx-auto max-w-md">
          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-center space-x-4">
              {[1, 2, 3].map((step, index) => (
                <div key={step} className="flex items-center">
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-full font-medium text-sm ${
                      index === 0
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    {step}
                  </div>
                  {index < 2 && <div className="mx-2 h-px w-12 bg-gray-300" />}
                </div>
              ))}
            </div>
            <p className="mt-2 text-center text-gray-600 text-sm">
              Step 1 of 3: Personal Information
            </p>
          </div>

          {/* Form Content */}
          <div className="rounded-lg bg-white p-6 shadow-md">
            <h2 className="mb-6 font-semibold text-xl">Personal Information</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block font-medium text-gray-700 text-sm">
                    First Name
                  </label>
                  <input
                    type="text"
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label className="mb-1 block font-medium text-gray-700 text-sm">
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1 block font-medium text-gray-700 text-sm">
                  Date of Birth
                </label>
                <input
                  type="date"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="mb-1 block font-medium text-gray-700 text-sm">
                  Phone Number
                </label>
                <input
                  type="tel"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="+1 (555) 123-4567"
                />
              </div>

              <div className="flex justify-between pt-6">
                <button className="rounded-md border border-gray-300 px-6 py-2 text-gray-700 hover:bg-gray-50">
                  Back
                </button>
                <button className="rounded-md bg-blue-600 px-6 py-2 text-white hover:bg-blue-700">
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
