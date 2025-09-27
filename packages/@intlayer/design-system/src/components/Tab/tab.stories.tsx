import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';
import { useState } from 'react';
import { Tab, TabItem } from './Tab';

/**
 * ## Tab Component
 *
 * The Tab component provides a complete tabbed interface with automatic state management,
 * accessibility support, and multiple visual variants. Perfect for organizing content
 * into separate, navigable sections.
 *
 * ### Key Features
 * - **Automatic State Management**: Handles active tab state internally with React Context
 * - **Full Accessibility**: ARIA-compliant with proper roles, labels, and keyboard navigation
 * - **Visual Variants**: Multiple styling options for different design needs
 * - **Flexible Content**: Support for any React components as tab content
 * - **Disabled States**: Individual tabs can be disabled when needed
 *
 * ### Accessibility Features
 * - Uses proper ARIA roles (`tab`, `tabpanel`, `tablist`)
 * - Supports keyboard navigation (Tab, Enter, Space)
 * - Provides screen reader support with proper labeling
 * - Maintains focus management between tab switches
 *
 * ### Best Practices
 * - Use descriptive labels that clearly identify tab content
 * - Limit the number of tabs to maintain usability (recommended: 3-7 tabs)
 * - Ensure tab content is substantial enough to warrant separation
 * - Consider using pills variant for secondary navigation
 * - Use disabled state sparingly and provide clear indication why
 */
const meta: Meta<typeof Tab> = {
  title: 'Components/Tab',
  component: Tab,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A comprehensive tab component for organizing content into navigable sections with multiple visual styles and full accessibility support.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'bordered', 'ghost'],
      description: 'Visual style variant of the tab container',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'default' },
      },
    },
    defaultTab: {
      control: { type: 'text' },
      description: 'The value of the tab to be active by default',
      table: {
        type: { summary: 'string' },
      },
    },
    children: {
      control: false,
      description: 'TabItem components that define the tabs and their content',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes for custom styling',
    },
  },
} satisfies Meta<typeof Tab>;

export default meta;
type Story = StoryObj<typeof Tab>;

/**
 * ## Basic Examples
 *
 * These stories demonstrate the core functionality and common usage patterns.
 */

/**
 * ### Default Tab Interface
 *
 * The most common usage with default styling and multiple content sections.
 */
export const Default: Story = {
  render: () => (
    <div className="w-96">
      <Tab defaultTab="overview">
        <TabItem label="Overview" value="overview">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Project Overview</h3>
            <p className="text-gray-600">
              This is the main overview section containing general information
              about your project or application.
            </p>
            <ul className="list-disc list-inside space-y-2 text-sm">
              <li>Feature 1: Advanced functionality</li>
              <li>Feature 2: User-friendly interface</li>
              <li>Feature 3: Robust performance</li>
            </ul>
            <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
              <p className="text-blue-800 font-medium">💡 Pro Tip</p>
              <p className="text-blue-700 text-sm">
                Use tabs to organize related content and improve navigation.
              </p>
            </div>
          </div>
        </TabItem>
        <TabItem label="Documentation" value="docs">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Documentation</h3>
            <p className="text-gray-600">
              Comprehensive documentation and guides for effective usage.
            </p>
            <div className="bg-gray-50 p-4 rounded-lg border">
              <h4 className="font-medium mb-2">Getting Started</h4>
              <ol className="list-decimal list-inside space-y-1 text-sm text-gray-600">
                <li>Install the required dependencies</li>
                <li>Configure your environment</li>
                <li>Import the Tab components</li>
                <li>Define your tab structure</li>
              </ol>
            </div>
            <code className="block bg-gray-900 text-green-400 p-3 rounded text-xs overflow-x-auto">
              {`<Tab defaultTab="getting-started">
  <TabItem label="Getting Started" value="getting-started">
    Your content here
  </TabItem>
</Tab>`}
            </code>
          </div>
        </TabItem>
        <TabItem label="Settings" value="settings">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Configuration Settings</h3>
            <p className="text-gray-600">
              Customize and configure various aspects of the application.
            </p>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="font-medium">Enable notifications</span>
                <span className="text-green-600">✓ Enabled</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="font-medium">Auto-save</span>
                <span className="text-green-600">✓ Enabled</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="font-medium">Dark mode</span>
                <span className="text-gray-500">○ Disabled</span>
              </div>
            </div>
          </div>
        </TabItem>
      </Tab>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Check that tabs are present and accessible
    const tabs = canvas.getAllByRole('tab');
    await expect(tabs).toHaveLength(3);

    // Verify default active tab content
    await expect(canvas.getByText('Project Overview')).toBeInTheDocument();
    await expect(
      canvas.getByText('Feature 1: Advanced functionality')
    ).toBeInTheDocument();
    await expect(canvas.getByText('💡 Pro Tip')).toBeInTheDocument();
    await expect(
      canvas.getByText(
        'Use tabs to organize related content and improve navigation.'
      )
    ).toBeInTheDocument();

    // Switch to Documentation tab and verify content
    await userEvent.click(tabs[1]); // Click on Documentation tab
    await expect(
      canvas.getAllByLabelText('Documentation')[0]
    ).toBeInTheDocument();
    await expect(canvas.getByText('Getting Started')).toBeInTheDocument();
    await expect(
      canvas.getByText('Install the required dependencies')
    ).toBeInTheDocument();
    await expect(
      canvas.getByText('Configure your environment')
    ).toBeInTheDocument();

    // Switch to Settings tab and verify content
    await userEvent.click(tabs[2]); // Click on Settings tab
    await expect(canvas.getByText('Settings')).toBeInTheDocument();
    await expect(canvas.getByText('Enable notifications')).toBeInTheDocument();
    await expect(canvas.getByText('Auto-save')).toBeInTheDocument();
    await expect(canvas.getByText('Dark mode')).toBeInTheDocument();

    // Switch back to Overview tab and verify content
    await userEvent.click(tabs[0]); // Click on Overview tab
    await expect(canvas.getByText('Project Overview')).toBeInTheDocument();
    await expect(
      canvas.getByText('Feature 1: Advanced functionality')
    ).toBeInTheDocument();
    await expect(canvas.getByText('💡 Pro Tip')).toBeInTheDocument();
    await expect(
      canvas.getByText(
        'Use tabs to organize related content and improve navigation.'
      )
    ).toBeInTheDocument();
  },
};

/**
 * ## Visual Variants
 *
 * Different styling options for various design requirements.
 */

/**
 * ### Bordered Variant
 *
 * Enhanced border styling for more prominent tab appearance.
 */
export const Bordered: Story = {
  render: () => (
    <div className="w-96">
      <Tab variant="bordered" defaultTab="dashboard">
        <TabItem label="📊 Dashboard" value="dashboard">
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Analytics Dashboard</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <div className="text-2xl font-bold text-blue-600">1,234</div>
                <div className="text-sm text-blue-800">Total Users</div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <div className="text-2xl font-bold text-green-600">89%</div>
                <div className="text-sm text-green-800">Success Rate</div>
              </div>
            </div>
            <p className="text-gray-600">
              The bordered variant provides enhanced visual separation, perfect
              for primary navigation interfaces.
            </p>
          </div>
        </TabItem>
        <TabItem label="📈 Analytics" value="analytics">
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Performance Analytics</h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span>Page Views</span>
                <span className="font-semibold">5,678</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span>Bounce Rate</span>
                <span className="font-semibold text-orange-600">23.4%</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span>Avg. Session</span>
                <span className="font-semibold text-green-600">4m 32s</span>
              </div>
            </div>
          </div>
        </TabItem>
        <TabItem label="⚙️ Reports" value="reports">
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Generated Reports</h4>
            <div className="space-y-2">
              <div className="flex justify-between items-center p-3 border rounded-lg hover:bg-gray-50">
                <div>
                  <div className="font-medium">Monthly Report</div>
                  <div className="text-sm text-gray-500">
                    Generated 2 days ago
                  </div>
                </div>
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                  Download
                </button>
              </div>
              <div className="flex justify-between items-center p-3 border rounded-lg hover:bg-gray-50">
                <div>
                  <div className="font-medium">Weekly Summary</div>
                  <div className="text-sm text-gray-500">
                    Generated 1 week ago
                  </div>
                </div>
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                  Download
                </button>
              </div>
            </div>
          </div>
        </TabItem>
      </Tab>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const tabs = canvas.getAllByRole('tab');

    // Test that bordered variant renders correctly
    await expect(tabs).toHaveLength(3);
    await userEvent.click(tabs[1]); // Analytics tab
    await expect(canvas.getByText('Performance Analytics')).toBeInTheDocument();
  },
};

/**
 * ### Ghost Variant
 *
 * Minimal styling with transparent background for subtle interfaces.
 */
export const Ghost: Story = {
  render: () => (
    <div className="w-96">
      <Tab variant="ghost" defaultTab="editor">
        <TabItem label="✏️ Editor" value="editor">
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Content Editor</h4>
            <div className="border border-gray-200 rounded-lg p-4 min-h-[120px] bg-white">
              <div className="text-gray-400 text-sm mb-2">
                Start typing your content...
              </div>
              <div className="text-gray-800">
                This is a sample content area where users can edit text, add
                formatting, and create rich content experiences.
              </div>
            </div>
            <div className="flex gap-2 text-xs">
              <span className="bg-gray-100 px-2 py-1 rounded">Bold</span>
              <span className="bg-gray-100 px-2 py-1 rounded">Italic</span>
              <span className="bg-gray-100 px-2 py-1 rounded">Link</span>
            </div>
          </div>
        </TabItem>
        <TabItem label="👁️ Preview" value="preview">
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Content Preview</h4>
            <div className="border border-gray-200 rounded-lg p-4 min-h-[120px] bg-gray-50">
              <div className="prose prose-sm">
                <p>
                  This is how your content will appear to users. The ghost
                  variant works perfectly for editor/preview interfaces where
                  you want minimal visual distraction.
                </p>
              </div>
            </div>
            <div className="text-xs text-gray-500">
              Preview mode • Last updated: 2 minutes ago
            </div>
          </div>
        </TabItem>
        <TabItem label="📱 Mobile" value="mobile">
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Mobile Preview</h4>
            <div className="border-2 border-gray-300 rounded-lg p-2 bg-gray-100 max-w-[200px] mx-auto">
              <div className="bg-white rounded p-3 min-h-[150px]">
                <div className="text-xs font-medium mb-2">Mobile View</div>
                <div className="text-xs text-gray-600 leading-relaxed">
                  Your content optimized for mobile devices. The ghost variant
                  maintains clean aesthetics across all screen sizes.
                </div>
              </div>
            </div>
          </div>
        </TabItem>
      </Tab>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const tabs = canvas.getAllByRole('tab');

    // Test ghost variant functionality
    await userEvent.click(tabs[1]); // Preview tab
    await expect(canvas.getByText('Content Preview')).toBeInTheDocument();

    await userEvent.click(tabs[2]); // Mobile tab
    await expect(canvas.getByText('Mobile Preview')).toBeInTheDocument();
  },
};

/**
 * ## Advanced Usage
 *
 * Real-world examples demonstrating practical applications.
 */

/**
 * ### Settings Panel Interface
 *
 * A comprehensive settings interface with multiple configuration sections.
 */
export const SettingsPanel: Story = {
  render: () => {
    const [notifications, setNotifications] = useState(true);
    const [autoSave, setAutoSave] = useState(false);
    const [theme, setTheme] = useState('light');

    return (
      <div className="w-[500px]">
        <Tab defaultTab="general" variant="default">
          <TabItem label="General" value="general">
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold text-lg mb-4">General Settings</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Enable Notifications</div>
                      <div className="text-sm text-gray-500">
                        Receive alerts and updates
                      </div>
                    </div>
                    <button
                      className={`relative w-11 h-6 rounded-full transition-colors ${
                        notifications ? 'bg-blue-600' : 'bg-gray-300'
                      }`}
                      onClick={() => setNotifications(!notifications)}
                    >
                      <div
                        className={`absolute w-4 h-4 bg-white rounded-full top-1 transition-transform ${
                          notifications ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Auto-Save</div>
                      <div className="text-sm text-gray-500">
                        Automatically save changes
                      </div>
                    </div>
                    <button
                      className={`relative w-11 h-6 rounded-full transition-colors ${
                        autoSave ? 'bg-blue-600' : 'bg-gray-300'
                      }`}
                      onClick={() => setAutoSave(!autoSave)}
                    >
                      <div
                        className={`absolute w-4 h-4 bg-white rounded-full top-1 transition-transform ${
                          autoSave ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>

                  <div>
                    <div className="font-medium mb-2">Theme</div>
                    <select
                      value={theme}
                      onChange={(e) => setTheme(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="light">Light</option>
                      <option value="dark">Dark</option>
                      <option value="auto">Auto</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </TabItem>

          <TabItem label="Security" value="security">
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold text-lg mb-4">
                  Security Settings
                </h4>
                <div className="space-y-4">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="font-medium text-green-800">
                        Two-Factor Authentication
                      </span>
                    </div>
                    <p className="text-sm text-green-700">
                      Your account is protected with 2FA
                    </p>
                  </div>

                  <div className="space-y-3">
                    <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                      <div className="font-medium">Change Password</div>
                      <div className="text-sm text-gray-500">
                        Update your account password
                      </div>
                    </button>

                    <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                      <div className="font-medium">Login Sessions</div>
                      <div className="text-sm text-gray-500">
                        Manage active sessions
                      </div>
                    </button>

                    <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                      <div className="font-medium">API Keys</div>
                      <div className="text-sm text-gray-500">
                        Manage API access keys
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </TabItem>

          <TabItem label="Privacy" value="privacy">
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold text-lg mb-4">Privacy Settings</h4>
                <div className="space-y-4">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h5 className="font-medium text-blue-800 mb-2">
                      Data Collection
                    </h5>
                    <p className="text-sm text-blue-700 mb-3">
                      We collect minimal data to improve your experience
                    </p>
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-sm">
                        <input
                          type="checkbox"
                          defaultChecked
                          className="rounded"
                        />
                        <span>Analytics and usage data</span>
                      </label>
                      <label className="flex items-center gap-2 text-sm">
                        <input type="checkbox" className="rounded" />
                        <span>Marketing communications</span>
                      </label>
                      <label className="flex items-center gap-2 text-sm">
                        <input
                          type="checkbox"
                          defaultChecked
                          className="rounded"
                        />
                        <span>Product updates</span>
                      </label>
                    </div>
                  </div>

                  <button className="w-full bg-red-50 border border-red-200 text-red-800 p-3 rounded-lg hover:bg-red-100 font-medium">
                    Request Data Deletion
                  </button>
                </div>
              </div>
            </div>
          </TabItem>

          <TabItem label="Advanced" value="advanced" disabled>
            <div className="space-y-4">
              <h4 className="font-semibold text-lg">Advanced Settings</h4>
              <div className="text-center py-8 text-gray-500">
                <p className="text-lg">🔒</p>
                <p>Advanced settings require administrator access</p>
                <p className="text-sm">
                  Contact your system administrator for access
                </p>
              </div>
            </div>
          </TabItem>
        </Tab>
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const tabs = canvas.getAllByRole('tab');

    // Test settings panel functionality
    await expect(tabs).toHaveLength(4);

    // Test Security tab
    await userEvent.click(tabs[1]);
    await expect(
      canvas.getByText('Two-Factor Authentication')
    ).toBeInTheDocument();

    // Test Privacy tab
    await userEvent.click(tabs[2]);
    await expect(canvas.getByText('Data Collection')).toBeInTheDocument();

    // Test disabled Advanced tab (should not be clickable)
    const advancedTab = tabs[3];
    await expect(advancedTab).toBeDisabled();
  },
};

/**
 * ### Content Management System
 *
 * A realistic CMS interface showing article editing workflow.
 */
export const ContentManagementSystem: Story = {
  render: () => {
    const [wordCount, setWordCount] = useState(245);
    const [lastSaved, setLastSaved] = useState('2 minutes ago');

    return (
      <div className="w-[600px]">
        <Tab defaultTab="content" variant="ghost">
          <TabItem label="📝 Content" value="content">
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-semibold text-lg">Article Editor</h4>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span>{wordCount} words</span>
                  <span>•</span>
                  <span>Last saved: {lastSaved}</span>
                </div>
              </div>

              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Article title..."
                  defaultValue="Getting Started with React Components"
                  className="w-full text-xl font-semibold border-none outline-none focus:ring-0 p-0"
                />

                <textarea
                  placeholder="Start writing your article..."
                  defaultValue={`React components are the building blocks of any React application. They allow you to split the UI into independent, reusable pieces that can be thought about in isolation.

In this guide, we'll explore how to create effective React components that are both maintainable and performant. We'll cover best practices, common patterns, and advanced techniques.

## Key Concepts

1. **Component Composition**: Building complex UIs from simple components
2. **Props and State**: Managing data flow and component behavior
3. **Lifecycle Methods**: Understanding component lifecycle events
4. **Performance Optimization**: Techniques for optimizing component performance

Let's dive deeper into each of these concepts...`}
                  className="w-full min-h-[300px] border border-gray-200 rounded-lg p-4 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={(e) => {
                    const words = e.target.value.trim().split(/\s+/).length;
                    setWordCount(words);
                    setLastSaved('Saving...');
                    setTimeout(() => setLastSaved('Just now'), 1000);
                  }}
                />

                <div className="flex gap-2">
                  <button className="px-3 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded-lg">
                    Bold
                  </button>
                  <button className="px-3 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded-lg">
                    Italic
                  </button>
                  <button className="px-3 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded-lg">
                    Link
                  </button>
                  <button className="px-3 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded-lg">
                    Image
                  </button>
                </div>
              </div>
            </div>
          </TabItem>

          <TabItem label="🏷️ Metadata" value="metadata">
            <div className="space-y-6">
              <h4 className="font-semibold text-lg">Article Metadata</h4>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Category
                  </label>
                  <select className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Web Development</option>
                    <option>React</option>
                    <option>JavaScript</option>
                    <option>Tutorial</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Status
                  </label>
                  <select className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Draft</option>
                    <option>In Review</option>
                    <option>Published</option>
                    <option>Archived</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Tags</label>
                <div className="flex gap-2 mb-2">
                  <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-lg">
                    react
                  </span>
                  <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-lg">
                    components
                  </span>
                  <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-lg">
                    tutorial
                  </span>
                </div>
                <input
                  type="text"
                  placeholder="Add tags (comma separated)"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  SEO Description
                </label>
                <textarea
                  placeholder="Brief description for search engines..."
                  defaultValue="Learn how to build effective React components with best practices, patterns, and optimization techniques in this comprehensive guide."
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-20 resize-none"
                  maxLength={160}
                />
                <div className="text-xs text-gray-500 mt-1">
                  160 characters max
                </div>
              </div>
            </div>
          </TabItem>

          <TabItem label="👁️ Preview" value="preview">
            <div className="space-y-4">
              <h4 className="font-semibold text-lg">Article Preview</h4>

              <div className="border border-gray-200 rounded-lg p-6 bg-white">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span>Web Development</span>
                    <span>•</span>
                    <span>5 min read</span>
                    <span>•</span>
                    <span>Published 2 hours ago</span>
                  </div>

                  <h1 className="text-2xl font-bold">
                    Getting Started with React Components
                  </h1>

                  <div className="flex gap-2">
                    <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">
                      react
                    </span>
                    <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">
                      components
                    </span>
                    <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">
                      tutorial
                    </span>
                  </div>

                  <div className="prose prose-sm max-w-none">
                    <p>
                      React components are the building blocks of any React
                      application. They allow you to split the UI into
                      independent, reusable pieces...
                    </p>
                  </div>

                  <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
                    <div className="text-sm text-gray-600">
                      By <span className="font-medium">John Developer</span>
                    </div>
                    <div className="flex gap-3 text-sm text-gray-500">
                      <span>👍 24 likes</span>
                      <span>💬 8 comments</span>
                      <span>🔗 Share</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabItem>
        </Tab>
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const tabs = canvas.getAllByRole('tab');

    // Test CMS workflow
    await expect(
      canvas.getByDisplayValue('Getting Started with React Components')
    ).toBeInTheDocument();

    // Test metadata tab
    await userEvent.click(tabs[1]);
    await expect(canvas.getByText('Article Metadata')).toBeInTheDocument();

    // Test preview tab
    await userEvent.click(tabs[2]);
    await expect(
      canvas.getByRole('heading', {
        name: 'Getting Started with React Components',
      })
    ).toBeInTheDocument();
  },
};
