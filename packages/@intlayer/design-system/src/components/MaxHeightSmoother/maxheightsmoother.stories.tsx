import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent } from '@storybook/test';
import React from 'react';
import { MaxHeightSmoother } from '.';

const meta: Meta<typeof MaxHeightSmoother> = {
  title: 'Components/MaxHeightSmoother',
  component: MaxHeightSmoother,
  tags: ['autodocs'],
  argTypes: {
    children: {
      description: 'Content that may overflow and be smoothly revealed',
      control: false,
    },
    isHidden: {
      description:
        'When defined, controls whether content is collapsed (true) or expanded (false). Leave undefined for uncontrolled behavior.',
      control: 'boolean',
    },
    isOverable: {
      description: 'Expands on hover',
      control: 'boolean',
      defaultValue: false,
    },
    isFocusable: {
      description: 'Expands on focus/tab (accessible toggle)',
      control: 'boolean',
      defaultValue: false,
    },
    minHeight: {
      description: 'Minimum height in pixels for the collapsed state',
      control: { type: 'number', min: 0, step: 10 },
      defaultValue: 0,
    },
    className: {
      description: 'Additional CSS classes for the container',
      control: 'text',
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'A sophisticated container that provides smooth height transitions for collapsible content using CSS Grid animations. Supports controlled, hover, and focus interaction modes.',
      },
    },
  },
} satisfies Meta<typeof MaxHeightSmoother>;

type Story = StoryObj<typeof MaxHeightSmoother>;

// Sample content for demonstrations
const sampleContent = (
  <div className="rounded-lg bg-linear-to-br from-blue-50 to-indigo-100 p-4">
    <h3 className="mb-3 font-semibold text-gray-800 text-lg">
      Expandable Content
    </h3>
    <p className="mb-2 text-gray-600">
      This is the beginning of the content that might be quite long and needs to
      be progressively disclosed.
    </p>
    <p className="mb-2 text-gray-600">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua.
    </p>
    <p className="mb-2 text-gray-600">
      Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
      aliquip ex ea commodo consequat.
    </p>
    <p className="text-gray-600">
      Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
      dolore eu fugiat nulla pariatur.
    </p>
  </div>
);

const longArticle = (
  <article className="rounded-lg bg-white p-6 shadow-sm">
    <header className="mb-4">
      <h2 className="mb-2 font-bold text-2xl text-gray-900">
        Understanding MaxHeightSmoother
      </h2>
      <p className="text-gray-600 text-sm">
        Published on December 1, 2023 • 5 min read
      </p>
    </header>

    <div className="prose prose-gray max-w-none">
      <p>
        The MaxHeightSmoother component provides a sophisticated solution for
        creating smooth height transitions in web applications. Unlike
        traditional JavaScript-based height animations, this component leverages
        modern CSS Grid techniques to achieve performant, fluid animations.
      </p>

      <h3>Key Features</h3>
      <ul>
        <li>
          <strong>CSS Grid Animation:</strong> Uses fractional grid rows for
          smooth transitions
        </li>
        <li>
          <strong>Multiple Interaction Modes:</strong> Controlled, hover, and
          focus-based expansion
        </li>
        <li>
          <strong>Accessibility First:</strong> Full keyboard navigation and
          screen reader support
        </li>
        <li>
          <strong>Performance Optimized:</strong> No JavaScript calculations or
          DOM measurements
        </li>
      </ul>

      <h3>Technical Implementation</h3>
      <p>
        The component transitions between <code>grid-rows-[0fr]</code> and{' '}
        <code>grid-rows-[1fr]</code> states, allowing content to expand and
        collapse smoothly without requiring predetermined heights.
      </p>

      <h3>Use Cases</h3>
      <p>This component is perfect for:</p>
      <ul>
        <li>FAQ sections and accordions</li>
        <li>Article previews with "read more" functionality</li>
        <li>Dashboard widgets and expandable cards</li>
        <li>Progressive disclosure in forms</li>
      </ul>

      <p>
        The animation duration is carefully tuned to 700ms with an ease-in-out
        timing function, providing a natural feel that works well across
        different content types and lengths.
      </p>
    </div>
  </article>
);

export default meta;

// Basic Examples
export const Default: Story = {
  args: {
    children: sampleContent,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Default MaxHeightSmoother without any interaction triggers. Content is fully expanded by default.',
      },
    },
  },
};

export const ControlledCollapsed: Story = {
  args: {
    isHidden: true,
    children: sampleContent,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Controlled mode with content collapsed. Toggle the isHidden control to see the smooth expansion.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const smoother = canvasElement.querySelector('.group\\/height-smoother');

    // Test that content is collapsed
    expect(smoother).toHaveClass('grid-rows-[0fr]');
    expect(smoother).not.toHaveClass('grid-rows-[1fr]');
  },
};

export const ControlledExpanded: Story = {
  args: {
    isHidden: false,
    children: sampleContent,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Controlled mode with content expanded. Toggle the isHidden control to see the smooth collapse.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const smoother = canvasElement.querySelector('.group\\/height-smoother');

    // Test that content is expanded
    expect(smoother).toHaveClass('grid-rows-[1fr]');
  },
};

export const HoverToExpand: Story = {
  args: {
    isOverable: true,
    children: sampleContent,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Hover-triggered expansion. Move your cursor over the container to see the content expand smoothly.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const smoother = canvasElement.querySelector('.group\\/height-smoother');

    // Test hover classes are applied
    expect(smoother).toHaveClass('hover:grid-rows-[1fr]');
    expect(smoother).toHaveClass('hover:overflow-x-auto');

    // Simulate hover
    await userEvent.hover(smoother as Element);
  },
};

export const FocusToExpand: Story = {
  args: {
    isFocusable: true,
    children: sampleContent,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Focus-triggered expansion. Tab to focus the container or click it to see the content expand. Great for accessibility.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const smoother = canvasElement.querySelector(
      '.group\\/height-smoother'
    ) as HTMLElement;

    // Test accessibility attributes
    expect(smoother).toHaveAttribute('role', 'button');
    expect(smoother).toHaveAttribute('tabIndex', '0');

    // Test focus classes are applied
    expect(smoother).toHaveClass('focus:grid-rows-[1fr]');
    expect(smoother).toHaveClass('focus-within:grid-rows-[1fr]');

    // Test focus functionality
    smoother.focus();
    await userEvent.tab();
  },
};

export const WithMinHeight: Story = {
  args: {
    minHeight: 120,
    isOverable: true,
    children: sampleContent,
  },
  parameters: {
    docs: {
      description: {
        story:
          'With minimum height set to 120px. This ensures some content is always visible, providing a preview of what will expand.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const innerDiv = canvasElement.querySelector(
      '.group\\/height-smoother > div'
    ) as HTMLElement;

    // Test minimum height is applied
    expect(innerDiv.style.minHeight).toBe('120px');
  },
};

// Advanced Examples
export const HoverAndFocus: Story = {
  args: {
    isOverable: true,
    isFocusable: true,
    minHeight: 80,
    children: (
      <div className="rounded-lg border border-purple-200 bg-gradient-to-r from-purple-50 to-pink-50 p-4">
        <h3 className="mb-2 font-semibold text-lg text-purple-800">
          Interactive Card
        </h3>
        <p className="mb-2 text-purple-700">
          This card expands on both hover and keyboard focus, making it
          accessible to all users.
        </p>
        <p className="mb-2 text-purple-600">
          Try hovering with your mouse or tabbing to focus with your keyboard.
        </p>
        <p className="text-purple-600">
          The minimum height ensures a preview is always visible, enticing users
          to explore further.
        </p>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          'Combined hover and focus behavior with minimum height. Accessible to both mouse and keyboard users.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const smoother = canvasElement.querySelector(
      '.group\\/height-smoother'
    ) as HTMLElement;

    // Test both interaction modes are enabled
    expect(smoother).toHaveAttribute('role', 'button');
    expect(smoother).toHaveAttribute('tabIndex', '0');
    expect(smoother).toHaveClass('hover:grid-rows-[1fr]');
    expect(smoother).toHaveClass('focus:grid-rows-[1fr]');
  },
};

export const ArticlePreview: Story = {
  args: {
    isOverable: true,
    minHeight: 200,
    className: 'max-w-2xl mx-auto',
    children: longArticle,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Article preview card that expands on hover to show full content. Perfect for blog listings or news feeds.',
      },
    },
  },
};

export const FAQSection: Story = {
  render: () => (
    <div className="mx-auto max-w-2xl space-y-4">
      <h2 className="mb-6 font-bold text-2xl text-gray-900">
        Frequently Asked Questions
      </h2>

      {[
        {
          question: 'What is MaxHeightSmoother?',
          answer:
            'MaxHeightSmoother is a React component that provides smooth height transitions for collapsible content using modern CSS Grid techniques.',
        },
        {
          question: 'How does it differ from other accordion components?',
          answer:
            'Unlike traditional components that rely on JavaScript height calculations, MaxHeightSmoother uses CSS Grid fractional rows for better performance and smoother animations.',
        },
        {
          question: 'Is it accessible?',
          answer:
            'Yes! It includes full keyboard navigation support, proper ARIA attributes, and works seamlessly with screen readers.',
        },
      ].map((faq, index) => (
        <MaxHeightSmoother
          key={index}
          isFocusable={true}
          isOverable={true}
          minHeight={60}
          className="rounded-lg border border-gray-200"
        >
          <div className="p-4">
            <h3 className="mb-2 font-semibold text-gray-900 text-lg">
              {faq.question}
            </h3>
            <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
          </div>
        </MaxHeightSmoother>
      ))}
    </div>
  ),
  args: {},
  parameters: {
    docs: {
      description: {
        story:
          'FAQ section using multiple MaxHeightSmoother components. Each question can be expanded by hover or keyboard focus.',
      },
    },
  },
};

export const DashboardWidgets: Story = {
  render: () => (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {[
        {
          title: 'Revenue',
          preview: '$42,350',
          details:
            'Monthly revenue is up 12% from last month. Q4 projections look strong with enterprise deals closing.',
        },
        {
          title: 'Active Users',
          preview: '1,249',
          details:
            'Daily active users have grown by 8% this week. Mobile usage continues to dominate at 65%.',
        },
        {
          title: 'Conversion Rate',
          preview: '3.2%',
          details:
            'Conversion rate improved by 0.3% after the latest landing page optimization campaign.',
        },
        {
          title: 'Support Tickets',
          preview: '23 Open',
          details:
            'Current response time is 2.3 hours. Most common issues relate to account setup.',
        },
        {
          title: 'Server Uptime',
          preview: '99.9%',
          details:
            'Excellent uptime this month with only one minor incident lasting 4 minutes.',
        },
        {
          title: 'Storage Usage',
          preview: '67.3 GB',
          details:
            'Database growth is steady at 2GB per week. Consider upgrading storage plan next quarter.',
        },
      ].map((widget, index) => (
        <MaxHeightSmoother
          key={index}
          isOverable={true}
          minHeight={120}
          className="animate-shadow rounded-lg bg-white transition-shadow"
        >
          <div className="p-6">
            <h3 className="mb-2 font-medium text-gray-500 text-sm uppercase tracking-wide">
              {widget.title}
            </h3>
            <div className="mb-4 font-bold text-3xl text-gray-900">
              {widget.preview}
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              {widget.details}
            </p>
          </div>
        </MaxHeightSmoother>
      ))}
    </div>
  ),
  args: {},
  parameters: {
    docs: {
      description: {
        story:
          'Dashboard widgets that expand on hover to reveal detailed information. Great for dense information display.',
      },
    },
  },
};

// Styling Examples
export const CustomStyling: Story = {
  args: {
    isOverable: true,
    minHeight: 100,
    className:
      'bg-linear-to-br from-orange-50 to-red-50 border-2 border-orange-200 rounded-xl shadow-lg hover:shadow-xl transition-shadow',
    children: (
      <div className="p-6">
        <h3 className="mb-3 font-bold text-orange-800 text-xl">
          🎨 Custom Styled Card
        </h3>
        <p className="mb-2 text-orange-700">
          This example demonstrates how you can apply custom styling to the
          MaxHeightSmoother.
        </p>
        <p className="mb-2 text-orange-600">
          The gradient background, custom borders, and shadow effects create an
          engaging visual experience.
        </p>
        <p className="text-orange-600">
          Hover to see the full content with smooth animation!
        </p>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          'Custom styled MaxHeightSmoother with gradients, borders, and shadow effects.',
      },
    },
  },
};

// Accessibility Testing
export const AccessibilityDemo: Story = {
  args: {
    isFocusable: true,
    'aria-label': 'Expandable accessibility information',
    children: (
      <div className="rounded-lg border border-green-200 bg-green-50 p-4">
        <h3 className="mb-2 font-semibold text-green-800 text-lg">
          ♿ Accessibility Features
        </h3>
        <ul className="space-y-1 text-green-700">
          <li>• Keyboard navigation with Tab key</li>
          <li>• Screen reader support with proper ARIA attributes</li>
          <li>• Focus indicators for visual feedback</li>
          <li>• Semantic HTML structure</li>
          <li>• Respects prefers-reduced-motion settings</li>
        </ul>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          'Demonstrates accessibility features including keyboard navigation, ARIA attributes, and screen reader support.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const smoother = canvasElement.querySelector(
      '.group\\/height-smoother'
    ) as HTMLElement;

    // Test accessibility attributes
    expect(smoother).toHaveAttribute('role', 'button');
    expect(smoother).toHaveAttribute('tabIndex', '0');
    expect(smoother).toHaveAttribute(
      'aria-label',
      'Expandable accessibility information'
    );

    // Test keyboard interaction
    smoother.focus();
    expect(document.activeElement).toBe(smoother);
  },
};

// Edge Cases
export const EmptyContent: Story = {
  args: {
    isOverable: true,
    children: null,
  },
  parameters: {
    docs: {
      description: {
        story: 'Handling empty or null content gracefully.',
      },
    },
  },
};

export const LargeContent: Story = {
  args: {
    isOverable: true,
    minHeight: 150,
    children: (
      <div className="rounded-lg bg-blue-50 p-6">
        <h3 className="mb-4 font-bold text-blue-800 text-xl">
          Large Content Example
        </h3>
        {Array.from({ length: 20 }, (_, i) => (
          <p key={i} className="mb-2 text-blue-700">
            Paragraph {i + 1}: This is a lot of content to test how the
            MaxHeightSmoother handles large amounts of text and maintains smooth
            animations even with extensive content.
          </p>
        ))}
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          'Testing with large amounts of content to ensure smooth animations regardless of content size.',
      },
    },
  },
};

export const DynamicContent: Story = {
  render: (args) => {
    const [items, setItems] = React.useState(['Item 1', 'Item 2']);

    return (
      <div className="max-w-md">
        <div className="mb-4">
          <button
            onClick={() =>
              setItems((prev) => [...prev, `Item ${prev.length + 1}`])
            }
            className="mr-2 rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            Add Item
          </button>
          <button
            onClick={() => setItems((prev) => prev.slice(0, -1))}
            className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700"
            disabled={items.length === 0}
          >
            Remove Item
          </button>
        </div>

        <MaxHeightSmoother
          {...args}
          isOverable={true}
          minHeight={80}
          className="rounded-lg border bg-gray-50"
        >
          <div className="p-4">
            <h3 className="mb-2 font-semibold">
              Dynamic List ({items.length} items)
            </h3>
            <ul className="space-y-1">
              {items.map((item, index) => (
                <li key={index} className="text-gray-700">
                  {item}
                </li>
              ))}
            </ul>
            {items.length === 0 && (
              <p className="text-gray-500 italic">No items to display</p>
            )}
          </div>
        </MaxHeightSmoother>
      </div>
    );
  },
  args: {},
  parameters: {
    docs: {
      description: {
        story:
          'Dynamic content that changes size, demonstrating how MaxHeightSmoother adapts automatically.',
      },
    },
  },
};
