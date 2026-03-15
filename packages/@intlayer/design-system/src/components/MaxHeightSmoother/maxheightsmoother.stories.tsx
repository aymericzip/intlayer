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
          'A container that provides smooth, single-phase height transitions for collapsible content. Uses CSS Grid animation when minHeight is 0, and a CSS-variable-driven max-height strategy when minHeight > 0 — eliminating the "dead time" artifact that occurs when a child min-height clamps the grid track.',
      },
    },
  },
} satisfies Meta<typeof MaxHeightSmoother>;

export default meta;

type Story = StoryObj<typeof MaxHeightSmoother>;

// ─── Shared content ─────────────────────────────────────────────────────────

const sampleContent = (
  <div className="rounded-lg bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
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
      <p className="text-gray-600 text-sm">Published on December 1, 2023 • 5 min read</p>
    </header>
    <div className="prose prose-gray max-w-none">
      <p>
        The MaxHeightSmoother component provides a sophisticated solution for
        creating smooth height transitions in web applications.
      </p>
      <h3>Key Features</h3>
      <ul>
        <li><strong>CSS Grid Animation:</strong> Uses fractional grid rows for smooth transitions</li>
        <li><strong>Multiple Interaction Modes:</strong> Controlled, hover, and focus-based expansion</li>
        <li><strong>Accessibility First:</strong> Full keyboard navigation and screen reader support</li>
        <li><strong>Performance Optimized:</strong> No JavaScript calculations or DOM measurements</li>
      </ul>
      <h3>Technical Implementation</h3>
      <p>
        When <code>minHeight</code> is 0, the component transitions between{' '}
        <code>grid-rows-[0fr]</code> and <code>grid-rows-[1fr]</code>.
        When <code>minHeight</code> is greater than 0, it uses a CSS-variable-driven
        <code>max-height</code> strategy to avoid the dead-time artifact.
      </p>
      <h3>Use Cases</h3>
      <ul>
        <li>FAQ sections and accordions</li>
        <li>Article previews with "read more" functionality</li>
        <li>Dashboard widgets and expandable cards</li>
        <li>Progressive disclosure in forms</li>
      </ul>
    </div>
  </article>
);

// ─── Basic Examples ──────────────────────────────────────────────────────────

export const Default: Story = {
  args: { children: sampleContent },
  parameters: {
    docs: {
      description: {
        story: 'Default state — no interaction triggers, content fully expanded.',
      },
    },
  },
};

export const ControlledCollapsed: Story = {
  args: { isHidden: true, children: sampleContent },
  parameters: {
    docs: {
      description: {
        story: 'Controlled mode, collapsed. Toggle isHidden in the controls panel.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const smoother = canvasElement.querySelector('.group\\/mhs') as HTMLElement;

    // Strategy A (no minHeight): collapsed via grid-rows-[0fr]
    expect(smoother).toHaveClass('grid-rows-[0fr]');
    expect(smoother).not.toHaveClass('grid-rows-[1fr]');
  },
};

export const ControlledExpanded: Story = {
  args: { isHidden: false, children: sampleContent },
  parameters: {
    docs: {
      description: {
        story: 'Controlled mode, expanded. Toggle isHidden in the controls panel.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const smoother = canvasElement.querySelector('.group\\/mhs') as HTMLElement;

    // Strategy A (no minHeight): expanded via grid-rows-[1fr]
    expect(smoother).toHaveClass('grid-rows-[1fr]');
    expect(smoother).not.toHaveClass('grid-rows-[0fr]');
  },
};

export const HoverToExpand: Story = {
  args: { isOverable: true, debug: true, children: sampleContent },
  parameters: {
    docs: {
      description: {
        story: 'Hover-triggered expansion. No minHeight → Strategy A (grid).',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const smoother = canvasElement.querySelector('.group\\/mhs') as HTMLElement;

    // Strategy A: starts collapsed, hover class opens it
    expect(smoother).toHaveClass('grid-rows-[0fr]');
    expect(smoother).toHaveClass('hover:grid-rows-[1fr]');

    await userEvent.hover(smoother);
  },
};

export const FocusToExpand: Story = {
  args: { isFocusable: true, children: sampleContent },
  parameters: {
    docs: {
      description: {
        story: 'Focus-triggered expansion. Tab to expand, great for accessibility.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const smoother = canvasElement.querySelector('.group\\/mhs') as HTMLElement;

    // Accessibility attributes
    expect(smoother).toHaveAttribute('role', 'button');
    expect(smoother).toHaveAttribute('tabIndex', '0');

    // Strategy A: correct focus classes
    expect(smoother).toHaveClass('focus:grid-rows-[1fr]');
    expect(smoother).toHaveClass('focus-within:grid-rows-[1fr]');

    smoother.focus();
    await userEvent.tab();
  },
};

// ─── minHeight Examples (Strategy B) ────────────────────────────────────────

export const WithMinHeight: Story = {
  args: { minHeight: 120, isOverable: true, debug: true, children: sampleContent },
  parameters: {
    docs: {
      description: {
        story:
          'minHeight > 0 activates Strategy B (max-height via CSS variable). ' +
          'The transition starts from the already-visible floor — no dead time.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const smoother = canvasElement.querySelector('.group\\/mhs') as HTMLElement;

    // CSS variable must be read from inline style, not getComputedStyle —
    // jsdom does not resolve custom properties through getComputedStyle.
    expect(
      smoother.style.getPropertyValue('--mhs-collapsed').trim()
    ).toBe('120px');

    // Container starts collapsed via CSS variable class
    expect(smoother).toHaveClass('max-h-[var(--mhs-collapsed)]');

    // Hover class is present for expansion (also uses CSS variable)
    expect(smoother).toHaveClass('hover:max-h-[var(--mhs-expanded)]');
  },
};

export const HoverAndFocus: Story = {
  args: {
    isOverable: true,
    isFocusable: true,
    minHeight: 80,
    debug: true,
    children: (
      <div className="rounded-lg border border-purple-200 bg-gradient-to-r from-purple-50 to-pink-50 p-4">
        <h3 className="mb-2 font-semibold text-lg text-purple-800">Interactive Card</h3>
        <p className="mb-2 text-purple-700">
          This card expands on both hover and keyboard focus.
        </p>
        <p className="mb-2 text-purple-600">
          Try hovering with your mouse or tabbing to focus with your keyboard.
        </p>
        <p className="text-purple-600">
          The minimum height ensures a preview is always visible.
        </p>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Combined hover + focus with minHeight. Strategy B. Accessible to mouse and keyboard users.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const smoother = canvasElement.querySelector('.group\\/mhs') as HTMLElement;

    // Accessibility
    expect(smoother).toHaveAttribute('role', 'button');
    expect(smoother).toHaveAttribute('tabIndex', '0');

    // Strategy B classes
    expect(smoother).toHaveClass('max-h-[var(--mhs-collapsed)]');
    expect(smoother).toHaveClass('hover:max-h-[var(--mhs-expanded)]');
    expect(smoother).toHaveClass('focus-within:max-h-[var(--mhs-expanded)]');
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
        story: 'Article preview that expands on hover. Strategy B with minHeight=200.',
      },
    },
  },
};

// ─── Composed Examples ───────────────────────────────────────────────────────

export const FAQSection: Story = {
  render: () => (
    <div className="mx-auto max-w-2xl space-y-4">
      <h2 className="mb-6 font-bold text-2xl text-gray-900">Frequently Asked Questions</h2>
      {[
        {
          question: 'What is MaxHeightSmoother?',
          answer:
            'A React component that provides smooth height transitions for collapsible content using CSS Grid or max-height animations depending on configuration.',
        },
        {
          question: 'Why two animation strategies?',
          answer:
            'When minHeight > 0, grid-template-rows produces a "dead time" artifact. The max-height strategy starts from the already-visible floor value, giving a single continuous expansion.',
        },
        {
          question: 'Is it accessible?',
          answer:
            'Yes. It includes keyboard navigation support, proper ARIA attributes, and works with screen readers.',
        },
      ].map((faq, index) => (
        <MaxHeightSmoother
          key={index}
          isFocusable
          isOverable
          minHeight={60}
          className="rounded-lg border border-gray-200"
        >
          <div className="p-4">
            <h3 className="mb-2 font-semibold text-gray-900 text-lg">{faq.question}</h3>
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
        story: 'FAQ section — multiple instances, Strategy B (minHeight=60).',
      },
    },
  },
};

export const DashboardWidgets: Story = {
  render: () => (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {[
        { title: 'Revenue', preview: '$42,350', details: 'Monthly revenue is up 12% from last month. Q4 projections look strong with enterprise deals closing.' },
        { title: 'Active Users', preview: '1,249', details: 'Daily active users have grown by 8% this week. Mobile usage continues to dominate at 65%.' },
        { title: 'Conversion Rate', preview: '3.2%', details: 'Conversion rate improved by 0.3% after the latest landing page optimization campaign.' },
        { title: 'Support Tickets', preview: '23 Open', details: 'Current response time is 2.3 hours. Most common issues relate to account setup.' },
        { title: 'Server Uptime', preview: '99.9%', details: 'Excellent uptime this month with only one minor incident lasting 4 minutes.' },
        { title: 'Storage Usage', preview: '67.3 GB', details: 'Database growth is steady at 2GB per week. Consider upgrading storage plan next quarter.' },
      ].map((widget, index) => (
        <MaxHeightSmoother
          key={index}
          isOverable
          minHeight={120}
          className="rounded-lg bg-white shadow-sm transition-shadow hover:shadow-md"
        >
          <div className="p-6">
            <h3 className="mb-2 font-medium text-gray-500 text-sm uppercase tracking-wide">{widget.title}</h3>
            <div className="mb-4 font-bold text-3xl text-gray-900">{widget.preview}</div>
            <p className="text-gray-600 text-sm leading-relaxed">{widget.details}</p>
          </div>
        </MaxHeightSmoother>
      ))}
    </div>
  ),
  args: {},
  parameters: {
    docs: {
      description: {
        story: 'Dashboard widgets with hover expansion. Strategy B (minHeight=120).',
      },
    },
  },
};

// ─── Accessibility ───────────────────────────────────────────────────────────

export const AccessibilityDemo: Story = {
  args: {
    isFocusable: true,
    'aria-label': 'Expandable accessibility information',
    children: (
      <div className="rounded-lg border border-green-200 bg-green-50 p-4">
        <h3 className="mb-2 font-semibold text-green-800 text-lg">♿ Accessibility Features</h3>
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
        story: 'Demonstrates accessibility attributes and keyboard interaction.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const smoother = canvasElement.querySelector('.group\\/mhs') as HTMLElement;

    expect(smoother).toHaveAttribute('role', 'button');
    expect(smoother).toHaveAttribute('tabIndex', '0');
    expect(smoother).toHaveAttribute('aria-label', 'Expandable accessibility information');

    smoother.focus();
    expect(document.activeElement).toBe(smoother);
  },
};

// ─── Edge Cases ──────────────────────────────────────────────────────────────

export const EmptyContent: Story = {
  args: { isOverable: true, children: null },
  parameters: {
    docs: { description: { story: 'Empty / null content handled gracefully.' } },
  },
};

export const LargeContent: Story = {
  args: {
    isOverable: true,
    minHeight: 150,
    children: (
      <div className="rounded-lg bg-blue-50 p-6">
        <h3 className="mb-4 font-bold text-blue-800 text-xl">Large Content Example</h3>
        {Array.from({ length: 20 }, (_, i) => (
          <p key={i} className="mb-2 text-blue-700">
            Paragraph {i + 1}: Testing smooth animation with large amounts of content.
          </p>
        ))}
      </div>
    ),
  },
  parameters: {
    docs: { description: { story: 'Large content — verifies animation remains smooth.' } },
  },
};

export const DynamicContent: Story = {
  render: (args) => {
    const [items, setItems] = React.useState(['Item 1', 'Item 2']);

    return (
      <div className="max-w-md">
        <div className="mb-4 flex gap-2">
          <button
            onClick={() => setItems((prev) => [...prev, `Item ${prev.length + 1}`])}
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            Add Item
          </button>
          <button
            onClick={() => setItems((prev) => prev.slice(0, -1))}
            className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700 disabled:opacity-40"
            disabled={items.length === 0}
          >
            Remove Item
          </button>
        </div>
        <MaxHeightSmoother {...args} isOverable minHeight={80} className="rounded-lg border bg-gray-50">
          <div className="p-4">
            <h3 className="mb-2 font-semibold">Dynamic List ({items.length} items)</h3>
            <ul className="space-y-1">
              {items.map((item, index) => (
                <li key={index} className="text-gray-700">{item}</li>
              ))}
            </ul>
            {items.length === 0 && <p className="text-gray-500 italic">No items to display</p>}
          </div>
        </MaxHeightSmoother>
      </div>
    );
  },
  args: {},
  parameters: {
    docs: { description: { story: 'Dynamic content — component adapts as items are added/removed.' } },
  },
};