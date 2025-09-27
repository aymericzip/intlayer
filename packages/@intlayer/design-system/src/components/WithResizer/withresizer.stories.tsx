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
    <div className="h-64 bg-gray-50 dark:bg-gray-900 p-4">
      <div className="flex h-full border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
        <WithResizer initialWidth={280}>
          <div className="h-full p-4 bg-white dark:bg-gray-800">
            <h3 className="text-lg font-semibold mb-3">Resizable Panel</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
              Drag the handle on the right edge to resize this panel. The
              content will adapt to the new width dynamically.
            </p>

            <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded">
              <div className="text-xs font-medium text-blue-800 dark:text-blue-200">
                💡 Tip: Look for the rounded handle on the right border
              </div>
            </div>
          </div>
        </WithResizer>

        <div className="flex-1 p-4 bg-gray-100 dark:bg-gray-700">
          <h3 className="text-lg font-semibold mb-3">Fixed Content</h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm">
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
    <div className="h-80 bg-gray-50 dark:bg-gray-900 p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Constrained Resizing</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          This resizer has minimum width of 200px and maximum width of 500px.
        </p>
      </div>

      <div className="flex h-full max-h-56 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
        <WithResizer initialWidth={300} minWidth={200} maxWidth={500}>
          <div className="h-full p-4 bg-white dark:bg-gray-800 flex flex-col">
            <div className="flex-1">
              <h4 className="font-semibold mb-2">Constrained Panel</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                Try resizing - you'll find the width is limited between 200px
                and 500px.
              </p>

              <div className="space-y-2">
                <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded text-xs">
                  <strong>Min Width:</strong> 200px
                </div>
                <div className="bg-red-100 dark:bg-red-900/30 p-2 rounded text-xs">
                  <strong>Max Width:</strong> 500px
                </div>
                <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded text-xs">
                  <strong>Current:</strong> ~300px
                </div>
              </div>
            </div>
          </div>
        </WithResizer>

        <div className="flex-1 p-4 bg-gray-100 dark:bg-gray-700">
          <h4 className="font-semibold mb-2">Benefits of Constraints</h4>
          <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-2">
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
      <div className="h-96 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
        {/* Header */}
        <div className="h-14 bg-blue-600 dark:bg-blue-700 flex items-center px-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">A</span>
            </div>
            <h1 className="text-white font-semibold">My Application</h1>
          </div>

          <div className="ml-auto flex items-center gap-2">
            <span className="text-white/80 text-sm">
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
            <div className="h-full bg-gray-50 dark:bg-gray-800 flex flex-col">
              {/* Sidebar Header */}
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
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
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                        item.active
                          ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300'
                          : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      <span className="text-lg">{item.icon}</span>
                      <span className="truncate">{item.label}</span>
                    </a>
                  ))}
                </nav>
              </div>

              {/* Sidebar Footer */}
              <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-gray-900 dark:text-white truncate">
                      John Doe
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
                      john@example.com
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </WithResizer>

          {/* Main Content */}
          <div className="flex-1 flex flex-col">
            {/* Content Header */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Dashboard-Section
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Welcome back! Here's what's happening.
                  </p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => setCurrentWidth(240)}
                    className="px-3 py-1 text-xs bg-gray-100 dark:bg-gray-700 rounded hover:bg-gray-200 dark:hover:bg-gray-600"
                  >
                    Narrow
                  </button>
                  <button
                    onClick={() => setCurrentWidth(320)}
                    className="px-3 py-1 text-xs bg-gray-100 dark:bg-gray-700 rounded hover:bg-gray-200 dark:hover:bg-gray-600"
                  >
                    Wide
                  </button>
                </div>
              </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 p-4 bg-white dark:bg-gray-900 overflow-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
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
                    className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {stat.title}
                        </p>
                        <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                          {stat.value}
                        </p>
                      </div>
                      <div
                        className={`text-sm font-medium ${
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

              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                  Recent Activity
                </h3>
                <div className="space-y-3">
                  {Array.from({ length: 5 }, (_, i) => (
                    <div key={i} className="flex items-center gap-3 py-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <div className="flex-1">
                        <div className="text-sm text-gray-900 dark:text-white">
                          User activity #{i + 1}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
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
    <div className="h-96 bg-gray-900 text-white rounded-lg overflow-hidden">
      {/* Editor Header */}
      <div className="h-10 bg-gray-800 flex items-center px-4 border-b border-gray-700">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        </div>
        <div className="ml-4 text-sm text-gray-300">
          Code Editor - project/src/components/App.tsx
        </div>
      </div>

      {/* Editor Layout */}
      <div className="flex h-full">
        {/* File Explorer */}
        <WithResizer initialWidth={200} minWidth={150} maxWidth={300}>
          <div className="h-full bg-gray-800 flex flex-col">
            <div className="p-2 border-b border-gray-700">
              <h3 className="text-xs font-semibold text-gray-300 uppercase tracking-wide">
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
        <div className="flex-1 flex flex-col">
          {/* Code Content */}
          <div className="flex-1 flex">
            <WithResizer initialWidth={400} minWidth={300}>
              <div className="h-full bg-gray-900 p-4 font-mono text-sm overflow-auto">
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
            <div className="flex-1 bg-gray-800 flex flex-col min-w-0">
              <div className="p-2 border-b border-gray-700">
                <h3 className="text-xs font-semibold text-gray-300 uppercase tracking-wide">
                  Properties
                </h3>
              </div>
              <div className="flex-1 overflow-auto p-3">
                <div className="space-y-3 text-sm">
                  <div>
                    <div className="text-gray-400 mb-1">Component</div>
                    <div className="bg-gray-700 px-2 py-1 rounded text-xs">
                      App
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-400 mb-1">Type</div>
                    <div className="bg-gray-700 px-2 py-1 rounded text-xs">
                      Function Component
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-400 mb-1">Props</div>
                    <div className="bg-gray-700 px-2 py-1 rounded text-xs">
                      None
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-400 mb-1">State</div>
                    <div className="bg-gray-700 px-2 py-1 rounded text-xs">
                      Stateless
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Terminal */}
          <div className="h-32 bg-black border-t border-gray-700">
            <div className="p-2 border-b border-gray-700 bg-gray-800">
              <h3 className="text-xs font-semibold text-gray-300 uppercase tracking-wide">
                Terminal
              </h3>
            </div>
            <div className="p-2 font-mono text-sm text-green-400">
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
    <div className="h-96 bg-gray-100 dark:bg-gray-900 p-4">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Customizable Dashboard
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Resize widgets to customize your dashboard layout
        </p>
      </div>

      <div className="flex gap-4 h-80">
        {/* Chart Widget */}
        <WithResizer initialWidth={350} minWidth={250} maxWidth={500}>
          <div className="h-full bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold text-gray-900 dark:text-white">
                Revenue Chart
              </h4>
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            </div>

            <div className="h-48 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg flex items-center justify-center">
              <div className="text-center text-gray-600 dark:text-gray-400">
                <div className="text-3xl mb-2">📊</div>
                <div className="text-sm">Interactive Chart</div>
                <div className="text-xs">Resize to see more data</div>
              </div>
            </div>
          </div>
        </WithResizer>

        {/* Activity Feed */}
        <WithResizer initialWidth={280} minWidth={200} maxWidth={400}>
          <div className="h-full bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold text-gray-900 dark:text-white">
                Activity Feed
              </h4>
              <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
            </div>

            <div className="space-y-3 overflow-auto h-48">
              {Array.from({ length: 8 }, (_, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-2 rounded-lg bg-gray-50 dark:bg-gray-700"
                >
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                    U
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm text-gray-900 dark:text-white truncate">
                      User performed action {i + 1}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {i + 2} min ago
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </WithResizer>

        {/* Stats Panel */}
        <div className="flex-1 bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-gray-900 dark:text-white">
              Quick Stats
            </h4>
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
          </div>

          <div className="grid grid-cols-2 gap-4 h-48">
            {[
              { label: 'Active Users', value: '1,234', icon: '👥' },
              { label: 'Sales Today', value: '$5,678', icon: '💰' },
              { label: 'Messages', value: '89', icon: '💬' },
              { label: 'Tasks', value: '12', icon: '✅' },
            ].map((stat, index) => (
              <div
                key={index}
                className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 text-center"
              >
                <div className="text-2xl mb-2">{stat.icon}</div>
                <div className="text-lg font-semibold text-gray-900 dark:text-white">
                  {stat.value}
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400">
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
