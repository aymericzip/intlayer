import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';
import { useState } from 'react';
import { WithResizer } from '.';

/**
 * ## WithResizer Component
 *
 * A powerful container component that enables dynamic width resizing through mouse or touch
 * drag interactions. Perfect for creating flexible layouts, adjustable panels, and split-pane interfaces.
 *
 * ### Key Features
 * - **Drag-to-Resize**: Intuitive drag handle for width adjustment
 * - **Touch Support**: Full mobile and tablet touch interaction
 * - **Constraint System**: Configurable minimum and maximum width limits
 * - **Visual Feedback**: Clear resize handle with interactive states
 * - **Accessibility**: ARIA slider implementation with keyboard support
 * - **Performance Optimized**: Passive event listeners and efficient calculations
 *
 * ### Technical Capabilities
 * - Real-time width calculation during drag operations
 * - Proper event cleanup to prevent memory leaks
 * - Boundary enforcement with smooth constraint handling
 * - Dark mode support with appropriate theming
 * - CSS transitions for polished interactions
 *
 * ### Use Cases
 * - **Application Sidebars**: Collapsible navigation panels
 * - **Split Layouts**: Multi-column content arrangements
 * - **Tool Panels**: Inspector and property panels
 * - **File Browsers**: Adjustable column widths
 * - **Dashboard Widgets**: Customizable component sizes
 * - **Code Editors**: Resizable panels for different views
 *
 * ### Accessibility Features
 * - ARIA slider role with proper value semantics
 * - Screen reader announcements for width changes
 * - Keyboard focus management
 * - Clear visual affordances for interaction
 */
const meta: Meta<typeof WithResizer> = {
  title: 'Components/WithResizer',
  component: WithResizer,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'A resizable container component with drag-based width adjustment, perfect for flexible layouts and adjustable panels.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    initialWidth: {
      description: 'Starting width of the resizable container in pixels',
      control: { type: 'number', min: 50, max: 800, step: 10 },
      table: {
        type: { summary: 'number' },
      },
    },
    minWidth: {
      description: 'Minimum allowed width in pixels (optional)',
      control: { type: 'number', min: 0, max: 500, step: 10 },
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '0' },
      },
    },
    maxWidth: {
      description: 'Maximum allowed width in pixels (optional)',
      control: { type: 'number', min: 100, max: 1200, step: 10 },
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: 'undefined (no limit)' },
      },
    },
    children: {
      description: 'Content to display inside the resizable container',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
  },
} satisfies Meta<typeof WithResizer>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * ## Basic Examples
 *
 * Fundamental resizing behavior and configuration options.
 */

/**
 * ### Default Resizer
 *
 * Basic resizable container with drag handle for width adjustment.
 */
export const Default: Story = {
  render: () => (
    <div className="h-64 bg-gray-50 p-4 dark:bg-gray-900">
      <div className="flex h-full overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700">
        <WithResizer initialWidth={280}>
          <div className="h-full bg-white p-4 dark:bg-gray-800">
            <h3 className="mb-3 font-semibold text-lg">Resizable Panel</h3>
            <p className="text-gray-600 text-sm leading-relaxed dark:text-gray-300">
              Drag the handle on the right edge to resize this panel. The
              content will adapt to the new width dynamically.
            </p>

            <div className="mt-4 rounded bg-blue-50 p-3 dark:bg-blue-900/20">
              <div className="font-medium text-blue-800 text-xs dark:text-blue-200">
                💡 Tip: Look for the rounded handle on the right border
              </div>
            </div>
          </div>
        </WithResizer>

        <div className="flex-1 bg-gray-100 p-4 dark:bg-gray-700">
          <h3 className="mb-3 font-semibold text-lg">Fixed Content</h3>
          <p className="text-gray-600 text-sm dark:text-gray-300">
            This area remains fixed while the left panel resizes. Perfect for
            main content areas that need to adapt to sidebar changes.
          </p>
        </div>
      </div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const resizer = canvas.getByRole('slider');

    await expect(resizer).toBeInTheDocument();
    await expect(resizer).toHaveAttribute('aria-valuenow', '280');
  },
};

/**
 * ### Width Constraints
 *
 * Demonstrating minimum and maximum width boundaries.
 */
export const WithConstraints: Story = {
  render: () => (
    <div className="h-80 bg-gray-50 p-6 dark:bg-gray-900">
      <div className="mb-4">
        <h3 className="mb-2 font-semibold text-lg">Constrained Resizing</h3>
        <p className="text-gray-600 text-sm dark:text-gray-400">
          This resizer has minimum width of 200px and maximum width of 500px.
        </p>
      </div>

      <div className="flex h-full max-h-56 overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700">
        <WithResizer initialWidth={300} minWidth={200} maxWidth={500}>
          <div className="flex h-full flex-col bg-white p-4 dark:bg-gray-800">
            <div className="flex-1">
              <h4 className="mb-2 font-semibold">Constrained Panel</h4>
              <p className="mb-4 text-gray-600 text-sm dark:text-gray-300">
                Try resizing - you'll find the width is limited between 200px
                and 500px.
              </p>

              <div className="space-y-2">
                <div className="rounded bg-green-100 p-2 text-xs dark:bg-green-900/30">
                  <strong>Min Width:</strong> 200px
                </div>
                <div className="rounded bg-red-100 p-2 text-xs dark:bg-red-900/30">
                  <strong>Max Width:</strong> 500px
                </div>
                <div className="rounded bg-blue-100 p-2 text-xs dark:bg-blue-900/30">
                  <strong>Current:</strong> ~300px
                </div>
              </div>
            </div>
          </div>
        </WithResizer>

        <div className="flex-1 bg-gray-100 p-4 dark:bg-gray-700">
          <h4 className="mb-2 font-semibold">Benefits of Constraints</h4>
          <ul className="space-y-2 text-gray-600 text-sm dark:text-gray-300">
            <li>• Prevents panels from becoming too narrow to use</li>
            <li>• Ensures layouts don't break at extreme sizes</li>
            <li>• Maintains readable content width</li>
            <li>• Provides predictable user experience</li>
          </ul>
        </div>
      </div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const resizer = canvas.getByRole('slider');

    await expect(resizer).toHaveAttribute('aria-valuemin', '200');
    await expect(resizer).toHaveAttribute('aria-valuemax', '500');
  },
};

/**
 * ## Real-World Applications
 *
 * Practical examples showing common usage patterns.
 */

/**
 * ### Application Layout
 *
 * A realistic application layout with resizable sidebar and main content area.
 */
export const ApplicationLayout: Story = {
  render: () => {
    const [currentWidth, setCurrentWidth] = useState(280);

    // Mock navigation items
    const navItems = [
      { icon: '📊', label: 'Dashboard', active: true },
      { icon: '👥', label: 'Users', active: false },
      { icon: '📝', label: 'Content', active: false },
      { icon: '⚙️', label: 'Settings', active: false },
      { icon: '📈', label: 'Analytics', active: false },
      { icon: '🔒', label: 'Security', active: false },
    ];

    return (
      <div className="h-96 overflow-hidden rounded-lg border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900">
        {/* Header */}
        <div className="flex h-14 items-center bg-blue-600 px-4 dark:bg-blue-700">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/20">
              <span className="font-bold text-sm text-white">A</span>
            </div>
            <h1 className="font-semibold text-white">My Application</h1>
          </div>

          <div className="ml-auto flex items-center gap-2">
            <span className="text-sm text-white/80">
              Sidebar: {currentWidth}px
            </span>
          </div>
        </div>

        {/* Main Layout */}
        <div className="flex h-full">
          <WithResizer
            initialWidth={currentWidth}
            minWidth={200}
            maxWidth={400}
            key={currentWidth} // Force re-render when changing width externally
          >
            <div className="flex h-full flex-col bg-gray-50 dark:bg-gray-800">
              {/* Sidebar Header */}
              <div className="border-gray-200 border-b p-4 dark:border-gray-700">
                <h2 className="font-semibold text-gray-900 dark:text-white">
                  Navigation
                </h2>
              </div>

              {/* Navigation */}
              <div className="flex-1 overflow-auto">
                <nav className="p-2">
                  {navItems.map((item, index) => (
                    <a
                      key={index}
                      href="#"
                      className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                        item.active
                          ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300'
                          : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700'
                      }`}
                    >
                      <span className="text-lg">{item.icon}</span>
                      <span className="truncate">{item.label}</span>
                    </a>
                  ))}
                </nav>
              </div>

              {/* Sidebar Footer */}
              <div className="border-gray-200 border-t p-4 dark:border-gray-700">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-gray-300 dark:bg-gray-600"></div>
                  <div className="min-w-0 flex-1">
                    <div className="truncate font-medium text-gray-900 text-sm dark:text-white">
                      John Doe
                    </div>
                    <div className="truncate text-gray-500 text-xs dark:text-gray-400">
                      john@example.com
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </WithResizer>

          {/* Main Content */}
          <div className="flex flex-1 flex-col">
            {/* Content Header */}
            <div className="border-gray-200 border-b bg-white p-4 dark:border-gray-700 dark:bg-gray-900">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-semibold text-gray-900 text-xl dark:text-white">
                    Dashboard-Section
                  </h2>
                  <p className="text-gray-500 text-sm dark:text-gray-400">
                    Welcome back! Here's what's happening.
                  </p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => setCurrentWidth(240)}
                    className="rounded bg-gray-100 px-3 py-1 text-xs hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600"
                  >
                    Narrow
                  </button>
                  <button
                    onClick={() => setCurrentWidth(320)}
                    className="rounded bg-gray-100 px-3 py-1 text-xs hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600"
                  >
                    Wide
                  </button>
                </div>
              </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-auto bg-white p-4 dark:bg-gray-900">
              <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {[
                  {
                    title: 'Total Users',
                    value: '12,345',
                    change: '+5.2%',
                    color: 'blue',
                  },
                  {
                    title: 'Revenue',
                    value: '$98,765',
                    change: '+12.1%',
                    color: 'green',
                  },
                  {
                    title: 'Sessions',
                    value: '54,321',
                    change: '-2.3%',
                    color: 'red',
                  },
                ].map((stat, index) => (
                  <div
                    key={index}
                    className="rounded-lg bg-gray-50 p-4 dark:bg-gray-800"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-600 text-sm dark:text-gray-400">
                          {stat.title}
                        </p>
                        <p className="font-semibold text-2xl text-gray-900 dark:text-white">
                          {stat.value}
                        </p>
                      </div>
                      <div
                        className={`font-medium text-sm ${
                          stat.color === 'green'
                            ? 'text-green-600'
                            : stat.color === 'red'
                              ? 'text-red-600'
                              : 'text-blue-600'
                        }`}
                      >
                        {stat.change}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="rounded-lg bg-gray-50 p-6 dark:bg-gray-800">
                <h3 className="mb-4 font-semibold text-gray-900 text-lg dark:text-white">
                  Recent Activity
                </h3>
                <div className="space-y-3">
                  {Array.from({ length: 5 }, (_, i) => (
                    <div key={i} className="flex items-center gap-3 py-2">
                      <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                      <div className="flex-1">
                        <div className="text-gray-900 text-sm dark:text-white">
                          User activity #{i + 1}
                        </div>
                        <div className="text-gray-500 text-xs dark:text-gray-400">
                          {i + 1} minutes ago
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test the layout elements are present
    await expect(canvas.getByText('My Application')).toBeInTheDocument();
    await expect(canvas.getByText('Dashboard')).toBeInTheDocument();

    // Test sidebar width control buttons
    const narrowButton = canvas.getByText('Narrow');
    await userEvent.click(narrowButton);
  },
};

/**
 * ### Code Editor Layout
 *
 * A code editor interface with multiple resizable panels.
 */
export const CodeEditorLayout: Story = {
  render: () => (
    <div className="h-96 overflow-hidden rounded-lg bg-gray-900 text-white">
      {/* Editor Header */}
      <div className="flex h-10 items-center border-gray-700 border-b bg-gray-800 px-4">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-red-500"></div>
          <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
          <div className="h-3 w-3 rounded-full bg-green-500"></div>
        </div>
        <div className="ml-4 text-gray-300 text-sm">
          Code Editor - project/src/components/App.tsx
        </div>
      </div>

      {/* Editor Layout */}
      <div className="flex h-full">
        {/* File Explorer */}
        <WithResizer initialWidth={200} minWidth={150} maxWidth={300}>
          <div className="flex h-full flex-col bg-gray-800">
            <div className="border-gray-700 border-b p-2">
              <h3 className="font-semibold text-gray-300 text-xs uppercase tracking-wide">
                Explorer
              </h3>
            </div>
            <div className="flex-1 overflow-auto p-2">
              <div className="space-y-1 text-sm">
                <div className="flex items-center gap-1 text-gray-400">
                  <span>📁</span>
                  <span>src</span>
                </div>
                <div className="ml-4 space-y-1">
                  <div className="flex items-center gap-1 text-blue-400">
                    <span>📄</span>
                    <span>App.tsx</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-400">
                    <span>📄</span>
                    <span>index.ts</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-400">
                    <span>📁</span>
                    <span>components</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </WithResizer>

        {/* Code Area */}
        <div className="flex flex-1 flex-col">
          {/* Code Content */}
          <div className="flex flex-1">
            <WithResizer initialWidth={400} minWidth={300}>
              <div className="h-full overflow-auto bg-gray-900 p-4 font-mono text-sm">
                <div className="space-y-1">
                  <div>
                    <span className="text-purple-400">import</span>{' '}
                    <span className="text-blue-400">React</span>{' '}
                    <span className="text-purple-400">from</span>{' '}
                    <span className="text-green-400">'react'</span>;
                  </div>
                  <div>
                    <span className="text-purple-400">import</span>{' '}
                    <span className="text-blue-400">'./App.css'</span>;
                  </div>
                  <div className="mt-4"></div>
                  <div>
                    <span className="text-purple-400">function</span>{' '}
                    <span className="text-yellow-400">App</span>() {'{'}
                  </div>
                  <div className="ml-4">
                    <span className="text-purple-400">return</span> (
                  </div>
                  <div className="ml-8">
                    &lt;<span className="text-red-400">div</span>{' '}
                    <span className="text-blue-400">className</span>=
                    <span className="text-green-400">"App"</span>&gt;
                  </div>
                  <div className="ml-12">
                    &lt;<span className="text-red-400">header</span>&gt;
                  </div>
                  <div className="ml-16">
                    &lt;<span className="text-red-400">h1</span>&gt;Hello
                    World&lt;/<span className="text-red-400">h1</span>&gt;
                  </div>
                  <div className="ml-12">
                    &lt;/<span className="text-red-400">header</span>&gt;
                  </div>
                  <div className="ml-8">
                    &lt;/<span className="text-red-400">div</span>&gt;
                  </div>
                  <div className="ml-4">);</div>
                  <div>{'}'}</div>
                  <div className="mt-4"></div>
                  <div>
                    <span className="text-purple-400">export</span>{' '}
                    <span className="text-purple-400">default</span>{' '}
                    <span className="text-yellow-400">App</span>;
                  </div>
                </div>
              </div>
            </WithResizer>

            {/* Properties Panel */}
            <div className="flex min-w-0 flex-1 flex-col bg-gray-800">
              <div className="border-gray-700 border-b p-2">
                <h3 className="font-semibold text-gray-300 text-xs uppercase tracking-wide">
                  Properties
                </h3>
              </div>
              <div className="flex-1 overflow-auto p-3">
                <div className="space-y-3 text-sm">
                  <div>
                    <div className="mb-1 text-gray-400">Component</div>
                    <div className="rounded bg-gray-700 px-2 py-1 text-xs">
                      App
                    </div>
                  </div>
                  <div>
                    <div className="mb-1 text-gray-400">Type</div>
                    <div className="rounded bg-gray-700 px-2 py-1 text-xs">
                      Function Component
                    </div>
                  </div>
                  <div>
                    <div className="mb-1 text-gray-400">Props</div>
                    <div className="rounded bg-gray-700 px-2 py-1 text-xs">
                      None
                    </div>
                  </div>
                  <div>
                    <div className="mb-1 text-gray-400">State</div>
                    <div className="rounded bg-gray-700 px-2 py-1 text-xs">
                      Stateless
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Terminal */}
          <div className="h-32 border-gray-700 border-t bg-black">
            <div className="border-gray-700 border-b bg-gray-800 p-2">
              <h3 className="font-semibold text-gray-300 text-xs uppercase tracking-wide">
                Terminal
              </h3>
            </div>
            <div className="p-2 font-mono text-green-400 text-sm">
              <div>$ npm run dev</div>
              <div className="text-gray-500">Local: http://localhost:3000/</div>
              <div className="text-gray-500">
                ready - started server on 0.0.0.0:3000
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test code editor elements
    await expect(canvas.getByText('Explorer')).toBeInTheDocument();
    await expect(canvas.getByText('Properties')).toBeInTheDocument();
    await expect(canvas.getByText('Terminal')).toBeInTheDocument();
  },
};

/**
 * ### Dashboard Widget Layout
 *
 * Resizable widgets in a dashboard interface.
 */
export const DashboardWidgets: Story = {
  render: () => (
    <div className="h-96 bg-gray-100 p-4 dark:bg-gray-900">
      <div className="mb-4">
        <h3 className="font-semibold text-gray-900 text-lg dark:text-white">
          Customizable Dashboard
        </h3>
        <p className="text-gray-600 text-sm dark:text-gray-400">
          Resize widgets to customize your dashboard layout
        </p>
      </div>

      <div className="flex h-80 gap-4">
        {/* Chart Widget */}
        <WithResizer initialWidth={350} minWidth={250} maxWidth={500}>
          <div className="h-full rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
            <div className="mb-4 flex items-center justify-between">
              <h4 className="font-semibold text-gray-900 dark:text-white">
                Revenue Chart
              </h4>
              <div className="h-2 w-2 rounded-full bg-green-500"></div>
            </div>

            <div className="flex h-48 items-center justify-center rounded-lg bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20">
              <div className="text-center text-gray-600 dark:text-gray-400">
                <div className="mb-2 text-3xl">📊</div>
                <div className="text-sm">Interactive Chart</div>
                <div className="text-xs">Resize to see more data</div>
              </div>
            </div>
          </div>
        </WithResizer>

        {/* Activity Feed */}
        <WithResizer initialWidth={280} minWidth={200} maxWidth={400}>
          <div className="h-full rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
            <div className="mb-4 flex items-center justify-between">
              <h4 className="font-semibold text-gray-900 dark:text-white">
                Activity Feed
              </h4>
              <div className="h-2 w-2 animate-pulse rounded-full bg-orange-500"></div>
            </div>

            <div className="h-48 space-y-3 overflow-auto">
              {Array.from({ length: 8 }, (_, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 rounded-lg bg-gray-50 p-2 dark:bg-gray-700"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 font-bold text-white text-xs">
                    U
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-gray-900 text-sm dark:text-white">
                      User performed action {i + 1}
                    </div>
                    <div className="text-gray-500 text-xs dark:text-gray-400">
                      {i + 2} min ago
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </WithResizer>

        {/* Stats Panel */}
        <div className="flex-1 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div className="mb-4 flex items-center justify-between">
            <h4 className="font-semibold text-gray-900 dark:text-white">
              Quick Stats
            </h4>
            <div className="h-2 w-2 rounded-full bg-blue-500"></div>
          </div>

          <div className="grid h-48 grid-cols-2 gap-4">
            {[
              { label: 'Active Users', value: '1,234', icon: '👥' },
              { label: 'Sales Today', value: '$5,678', icon: '💰' },
              { label: 'Messages', value: '89', icon: '💬' },
              { label: 'Tasks', value: '12', icon: '✅' },
            ].map((stat, index) => (
              <div
                key={index}
                className="rounded-lg bg-gray-50 p-3 text-center dark:bg-gray-700"
              >
                <div className="mb-2 text-2xl">{stat.icon}</div>
                <div className="font-semibold text-gray-900 text-lg dark:text-white">
                  {stat.value}
                </div>
                <div className="text-gray-600 text-xs dark:text-gray-400">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test dashboard elements
    await expect(
      canvas.getByText('Customizable Dashboard')
    ).toBeInTheDocument();
    await expect(canvas.getByText('Revenue Chart')).toBeInTheDocument();
    await expect(canvas.getByText('Activity Feed')).toBeInTheDocument();
    await expect(canvas.getByText('Quick Stats')).toBeInTheDocument();
  },
};
