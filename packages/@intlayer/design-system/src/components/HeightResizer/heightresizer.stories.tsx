import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';
import { HeightResizer } from '.';

/**
 * HeightResizer Component Stories
 *
 * An interactive resizable container component that allows users to dynamically adjust
 * the height by dragging a visual handle. Perfect for creating flexible layouts with
 * user-customizable panel sizes.
 *
 * ## Key Features
 * - **Interactive Resizing**: Drag handle at the top to resize container vertically
 * - **Touch Support**: Full support for touch devices and mobile interactions
 * - **Height Constraints**: Optional minimum and maximum height limits
 * - **Visual Feedback**: Clear handle with hover and active states
 * - **Accessibility**: ARIA slider role with proper value announcements
 * - **Smooth Interaction**: CSS transitions for polished user experience
 *
 * ## When to Use
 * - Code editors with resizable panels
 * - Chat interfaces with adjustable message areas
 * - Dashboard widgets with user-customizable sizes
 * - Documentation viewers with resizable content panes
 * - Settings panels with expandable sections
 * - Any layout requiring user-controlled vertical space
 */
const meta = {
  title: 'Components/HeightResizer',
  component: HeightResizer,
  parameters: {
    docs: {
      description: {
        component: `
A resizable container component that provides drag-to-resize functionality for creating flexible user interfaces.

### Interaction Model:
The component uses a drag interaction model where users click and drag the visual handle (rounded bar) at the top of the container. The resize calculation is based on the difference between the current cursor position and the container's top edge.

### Visual Design:
- **Handle**: A rounded bar at the top that serves as the drag target
- **Border**: Visual separator indicating the resizable boundary  
- **Transitions**: Smooth animations for state changes and interactions
- **Responsive**: Adapts to both desktop mouse and mobile touch interactions

### Accessibility Features:
- **ARIA Slider**: Proper slider role for assistive technologies
- **Value Announcements**: Current, min, and max values announced to screen readers
- **Keyboard Support**: Focusable element with standard accessibility patterns
- **Visual Indicators**: Clear visual cues for interactive elements

### Technical Implementation:
- **Event Handling**: Supports both mouse and touch events with proper cleanup
- **Height Constraints**: Enforces minimum and maximum height limits during resize
- **Performance**: Uses passive event listeners and optimized calculations
- **State Management**: Clean internal state handling with proper cleanup
        `,
      },
    },
    a11y: {
      config: {
        rules: [
          {
            id: 'color-contrast',
            enabled: true,
          },
          {
            id: 'interactive-controls-name',
            enabled: true,
          },
        ],
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    initialHeight: {
      description: 'Initial height in pixels for the resizable area',
      control: { type: 'number', min: 50, max: 1000, step: 10 },
    },
    minHeight: {
      description:
        'Minimum height in pixels that users can resize to (optional)',
      control: { type: 'number', min: 0, max: 500, step: 10 },
    },
    maxHeight: {
      description:
        'Maximum height in pixels that users can resize to (optional)',
      control: { type: 'number', min: 100, max: 2000, step: 50 },
    },
    children: {
      description: 'Content inside the resizable container',
      control: 'text',
    },
    className: {
      description: 'Additional CSS classes for custom styling',
      control: 'text',
    },
  },
} satisfies Meta<typeof HeightResizer>;

export default meta;
type Story = StoryObj<typeof HeightResizer>;

/**
 * ## Basic Examples
 *
 * These stories demonstrate the core functionality and common usage patterns
 * of the HeightResizer component.
 */

/**
 * ### Default State
 *
 * The basic resizable container with default settings. Drag the handle at the top
 * to resize the container vertically.
 */
export const Default: Story = {
  args: {
    initialHeight: 200,
    children:
      'Drag the top handle (rounded bar) to resize this area vertically. This is the default configuration without height constraints.',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const resizer = canvas.getByRole('slider', {
      name: /resizable component/i,
    });

    // Test initial state
    await expect(resizer).toBeInTheDocument();
    await expect(resizer).toHaveAttribute('aria-valuenow', '200');
    await expect(resizer).toHaveAttribute('tabindex', '0');

    // Test accessibility attributes
    await expect(resizer).toHaveAttribute('role', 'slider');
    await expect(resizer).toHaveAttribute('aria-label');

    // Test visual elements
    const content = canvas.getByText(/drag the top handle/i);
    await expect(content).toBeInTheDocument();
  },
};

/**
 * ### With Height Constraints
 *
 * Resizer with both minimum and maximum height limits to prevent over-resizing.
 */
export const WithBounds: Story = {
  args: {
    initialHeight: 250,
    minHeight: 100,
    maxHeight: 500,
    children:
      "This resizer has minHeight=100px and maxHeight=500px. Try dragging - you'll notice the resize stops at the defined boundaries.",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const resizer = canvas.getByRole('slider');

    // Test constraint attributes
    await expect(resizer).toHaveAttribute('aria-valuemin', '100');
    await expect(resizer).toHaveAttribute('aria-valuemax', '500');
    await expect(resizer).toHaveAttribute('aria-valuenow', '250');

    // Test initial constraints
    await expect(resizer).toHaveStyle({ minHeight: '100px' });
  },
};

/**
 * ### Minimum Height Only
 *
 * Resizer with only a minimum height constraint, allowing unlimited upward growth.
 */
export const MinHeightOnly: Story = {
  args: {
    initialHeight: 180,
    minHeight: 120,
    children:
      'This container has a minimum height of 120px but no maximum limit. You can resize it as large as you want, but not smaller than the minimum.',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const resizer = canvas.getByRole('slider');

    await expect(resizer).toHaveAttribute('aria-valuemin', '120');
    await expect(resizer).not.toHaveAttribute('aria-valuemax');
    await expect(resizer).toHaveStyle({ minHeight: '120px' });
  },
};

/**
 * ### Large Initial Size
 *
 * Resizer starting with a larger initial height for content-heavy scenarios.
 */
export const LargeInitialSize: Story = {
  args: {
    initialHeight: 400,
    minHeight: 200,
    maxHeight: 800,
    children:
      'This resizer starts with a larger initial height (400px) suitable for content-heavy layouts like code editors or documentation viewers.',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const resizer = canvas.getByRole('slider');

    await expect(resizer).toHaveAttribute('aria-valuenow', '400');
    await expect(resizer).toHaveStyle({ height: '400px' });
  },
};

/**
 * ## Content Examples
 *
 * Stories showing the HeightResizer with different types of content to demonstrate
 * real-world usage scenarios.
 */

/**
 * ### Rich Content
 *
 * Resizer containing structured content like lists and paragraphs.
 */
export const RichContent: Story = {
  render: (args) => (
    <HeightResizer {...args}>
      <div className="p-4 space-y-3">
        <h3 className="text-lg font-semibold">Resizable Content Panel</h3>
        <p className="text-gray-600">
          This area contains rich content to better visualize resizing behavior.
          Drag the handle above to adjust the visible height.
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Interactive resizing with visual handle</li>
          <li>Touch-friendly for mobile devices</li>
          <li>Accessibility support with ARIA attributes</li>
          <li>Optional height constraints (min/max)</li>
          <li>Smooth CSS transitions for polished UX</li>
          <li>Overflow handling for content that exceeds bounds</li>
        </ul>
        <div className="mt-4 p-3 bg-blue-50 rounded border-l-4 border-blue-400">
          <p className="text-blue-800 text-sm">
            <strong>Tip:</strong> This content will be clipped when the
            container height is smaller than the content height.
          </p>
        </div>
      </div>
    </HeightResizer>
  ),
  args: {
    initialHeight: 280,
    minHeight: 150,
    maxHeight: 600,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test content is present
    const heading = canvas.getByText(/resizable content panel/i);
    const listItems = canvas.getAllByRole('listitem');

    await expect(heading).toBeInTheDocument();
    await expect(listItems).toHaveLength(6);

    // Test resizer functionality
    const resizer = canvas.getByRole('slider');
    await expect(resizer).toBeInTheDocument();
    await expect(resizer).toHaveAttribute('aria-valuenow', '280');
  },
};

/**
 * ### Code Editor Simulation
 *
 * Simulates a code editor interface with resizable code panel.
 */
export const CodeEditorSimulation: Story = {
  render: (args) => (
    <div className="border rounded-lg overflow-hidden">
      <div className="bg-gray-100 px-4 py-2 border-b flex items-center justify-between">
        <span className="text-sm font-medium">code-editor.tsx</span>
        <div className="flex space-x-1">
          <div className="w-3 h-3 rounded-full bg-red-400"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
          <div className="w-3 h-3 rounded-full bg-green-400"></div>
        </div>
      </div>
      <HeightResizer {...args}>
        <div className="bg-gray-900 text-green-400 p-4 font-mono text-sm h-full overflow-auto">
          <div className="space-y-1">
            <div>
              <span className="text-purple-300">import</span>{' '}
              <span className="text-yellow-300">React</span>{' '}
              <span className="text-purple-300">from</span>{' '}
              <span className="text-green-300">'react'</span>;
            </div>
            <div>
              <span className="text-purple-300">import</span>{' '}
              {'{ HeightResizer }'}{' '}
              <span className="text-purple-300">from</span>{' '}
              <span className="text-green-300">'@intlayer/design-system'</span>;
            </div>
            <div></div>
            <div>
              <span className="text-purple-300">export const</span>{' '}
              <span className="text-yellow-300">CodePanel</span> = () =&gt;{' '}
              {'{'}
            </div>
            <div className="ml-4">
              <span className="text-purple-300">return</span> (
            </div>
            <div className="ml-8">{'<HeightResizer'}</div>
            <div className="ml-10">{'initialHeight={400}'}</div>
            <div className="ml-10">{'minHeight={200}'}</div>
            <div className="ml-10">{'maxHeight={800}'}</div>
            <div className="ml-8">{'>'}</div>
            <div className="ml-10">{'<CodeEditor />'}</div>
            <div className="ml-8">{'</HeightResizer>'}</div>
            <div className="ml-4">);</div>
            <div>{'}'};</div>
          </div>
        </div>
      </HeightResizer>
    </div>
  ),
  args: {
    initialHeight: 250,
    minHeight: 120,
    maxHeight: 500,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test code editor elements
    const filename = canvas.getByText(/code-editor\.tsx/i);
    const importStatement = canvas.getByText(/import React from/);

    await expect(filename).toBeInTheDocument();
    await expect(importStatement).toBeInTheDocument();

    // Test resizer in code context
    const resizer = canvas.getByRole('slider');
    await expect(resizer).toHaveAttribute('aria-valuenow', '250');
  },
};

/**
 * ### Chat Interface
 *
 * Demonstrates usage in a chat application with resizable message area.
 */
export const ChatInterface: Story = {
  render: (args) => (
    <div className="max-w-md mx-auto border rounded-lg overflow-hidden bg-white">
      <div className="bg-blue-600 text-white px-4 py-3 flex items-center space-x-3">
        <div className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center">
          <span className="text-sm font-bold">JD</span>
        </div>
        <div>
          <div className="font-medium">John Doe</div>
          <div className="text-xs text-blue-200">Online</div>
        </div>
      </div>

      <HeightResizer {...args}>
        <div className="p-3 space-y-3 h-full overflow-auto">
          <div className="flex justify-start">
            <div className="bg-gray-200 rounded-lg p-2 max-w-xs">
              <p className="text-sm">
                Hey! How's the new component coming along?
              </p>
              <span className="text-xs text-gray-500">10:30 AM</span>
            </div>
          </div>

          <div className="flex justify-end">
            <div className="bg-blue-600 text-white rounded-lg p-2 max-w-xs">
              <p className="text-sm">
                Great! Just finished the HeightResizer component.
              </p>
              <span className="text-xs text-blue-200">10:32 AM</span>
            </div>
          </div>

          <div className="flex justify-start">
            <div className="bg-gray-200 rounded-lg p-2 max-w-xs">
              <p className="text-sm">Awesome! Can users resize it?</p>
              <span className="text-xs text-gray-500">10:33 AM</span>
            </div>
          </div>

          <div className="flex justify-end">
            <div className="bg-blue-600 text-white rounded-lg p-2 max-w-xs">
              <p className="text-sm">
                Absolutely! Just drag the handle at the top.
              </p>
              <span className="text-xs text-blue-200">10:34 AM</span>
            </div>
          </div>

          <div className="flex justify-start">
            <div className="bg-gray-200 rounded-lg p-2 max-w-xs">
              <p className="text-sm">Perfect for adjustable chat windows!</p>
              <span className="text-xs text-gray-500">10:35 AM</span>
            </div>
          </div>
        </div>
      </HeightResizer>

      <div className="border-t p-3">
        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="Type a message..."
            className="flex-1 border rounded-full px-4 py-2 text-sm focus:outline-none focus:border-blue-400"
          />
          <button className="bg-blue-600 text-white rounded-full px-4 py-2 text-sm hover:bg-blue-700">
            Send
          </button>
        </div>
      </div>
    </div>
  ),
  args: {
    initialHeight: 300,
    minHeight: 150,
    maxHeight: 600,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test chat interface elements
    const messages = canvas.getAllByText(/hey!/i);
    const sendButton = canvas.getByText(/send/i);
    const messageInput = canvas.getByPlaceholderText(/type a message/i);

    await expect(messages.length).toBeGreaterThan(0);
    await expect(sendButton).toBeInTheDocument();
    await expect(messageInput).toBeInTheDocument();

    // Test resizer functionality
    const resizer = canvas.getByRole('slider');
    await expect(resizer).toHaveAttribute('aria-valuenow', '300');
  },
};

/**
 * ## Custom Styling
 *
 * Stories showing custom styling options while maintaining functionality.
 */

/**
 * ### Custom Styled Resizer
 *
 * HeightResizer with custom styling for different design systems.
 */
export const CustomStyled: Story = {
  args: {
    initialHeight: 220,
    minHeight: 100,
    maxHeight: 400,
    className:
      'border-2 border-dashed border-purple-300 rounded-lg bg-purple-50',
    children:
      'This resizer has custom styling with a purple theme and dashed border. The functionality remains the same while adapting to your design system.',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const resizer = canvas.getByRole('slider');

    // Test custom styling is applied
    await expect(resizer).toHaveClass('border-purple-300', 'bg-purple-50');

    // Test functionality is preserved
    await expect(resizer).toHaveAttribute('aria-valuenow', '220');
    await expect(resizer).toHaveAttribute('role', 'slider');
  },
};

/**
 * ## Accessibility Testing
 *
 * Stories specifically designed to test and demonstrate accessibility features.
 */

/**
 * ### Keyboard Navigation
 *
 * Testing keyboard accessibility and focus management for the resizer component.
 */
export const KeyboardNavigation: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="text-sm text-gray-600 mb-4">
        Use Tab to focus the resizer, then use arrow keys or drag to resize.
      </div>

      <HeightResizer initialHeight={200} minHeight={100} maxHeight={400}>
        <div className="p-4">
          <h3 className="font-medium mb-2">Keyboard Accessible Resizer</h3>
          <p className="text-gray-600 text-sm">
            This resizer component is fully accessible via keyboard navigation.
            Focus it with Tab and interact using standard slider controls.
          </p>
          <ul className="mt-2 text-xs text-gray-500 space-y-1">
            <li>• Tab: Focus the resizer</li>
            <li>• Arrow keys: Fine-tune height (if implemented)</li>
            <li>• Mouse/Touch: Drag the handle to resize</li>
          </ul>
        </div>
      </HeightResizer>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const resizer = canvas.getByRole('slider');

    // Test keyboard focus
    await expect(resizer).toHaveAttribute('tabindex', '0');

    // Focus the resizer
    await userEvent.tab();
    await expect(resizer).toHaveFocus();

    // Test ARIA attributes are present
    await expect(resizer).toHaveAttribute('aria-label');
    await expect(resizer).toHaveAttribute('aria-valuenow');
    await expect(resizer).toHaveAttribute('aria-valuemin');
    await expect(resizer).toHaveAttribute('aria-valuemax');
  },
};

/**
 * ### Screen Reader Support
 *
 * Demonstrates proper ARIA attributes and announcements for assistive technologies.
 */
export const ScreenReaderSupport: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="text-sm text-gray-700">
        Screen readers will announce the resizer as a slider with current,
        minimum, and maximum values. The aria-label provides context about the
        interaction.
      </div>

      <HeightResizer
        initialHeight={180}
        minHeight={80}
        maxHeight={360}
        aria-label="Content panel height adjuster - drag to resize the content area"
      >
        <div className="p-4 bg-blue-50 border border-blue-200 rounded">
          <h3 className="text-blue-900 font-medium mb-2">
            Accessible Content Panel
          </h3>
          <p className="text-blue-700 text-sm mb-3">
            This resizer provides comprehensive accessibility support for screen
            readers.
          </p>
          <div className="text-xs text-blue-600 space-y-1">
            <div>
              <strong>Current Height:</strong>{' '}
              <span id="current-height">180px</span>
            </div>
            <div>
              <strong>Range:</strong> 80px - 360px
            </div>
            <div>
              <strong>Role:</strong> slider
            </div>
            <div>
              <strong>ARIA Support:</strong> Full value announcements
            </div>
          </div>
        </div>
      </HeightResizer>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const resizer = canvas.getByRole('slider');

    // Test comprehensive ARIA support
    await expect(resizer).toHaveAttribute('role', 'slider');
    await expect(resizer).toHaveAttribute(
      'aria-label',
      'Content panel height adjuster - drag to resize the content area'
    );
    await expect(resizer).toHaveAttribute('aria-valuenow', '180');
    await expect(resizer).toHaveAttribute('aria-valuemin', '80');
    await expect(resizer).toHaveAttribute('aria-valuemax', '360');

    // Test content is accessible
    const heading = canvas.getByText(/accessible content panel/i);
    await expect(heading).toBeInTheDocument();
  },
};
