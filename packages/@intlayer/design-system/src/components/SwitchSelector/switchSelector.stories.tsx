import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';
import { useState } from 'react';
import { SwitchSelector, SwitchSelectorColor, SwitchSelectorSize } from '.';

/**
 * SwitchSelector Component Stories
 *
 * The SwitchSelector component provides an elegant way to choose between multiple options
 * with smooth animations and visual feedback. It's perfect for settings toggles, status
 * selectors, view mode switches, and any multi-option interface requiring clear visual
 * distinction between choices.
 *
 * ## Key Features
 * - **Smooth Animations**: Fluid indicator transitions with customizable timing
 * - **Accessible Design**: Full keyboard navigation and ARIA support
 * - **Flexible Content**: Support for text, icons, and rich React elements
 * - **Type Safety**: Generic TypeScript support for any value type
 * - **Multiple Variants**: Color themes and size options for different contexts
 * - **State Management**: Both controlled and uncontrolled usage patterns
 *
 * ## When to Use
 * - Settings panels (theme selection, feature toggles)
 * - Status management (draft/published, active/inactive)
 * - View mode selection (list/grid/card views)
 * - Filter controls (all/active/completed items)
 * - Multi-step process navigation
 * - Any binary or multi-choice selection interface
 */
const meta: Meta<typeof SwitchSelector> = {
  title: 'Components/SwitchSelector',
  component: SwitchSelector,
  parameters: {
    docs: {
      description: {
        component: `
A versatile toggle component for elegant multi-option selection interfaces.

### Accessibility Features:
- **Keyboard Navigation**: Tab to focus, arrow keys to navigate between options
- **Screen Reader Support**: Proper ARIA roles, labels, and state announcements
- **Focus Management**: Clear visual focus indicators and logical tab flow
- **State Communication**: Selection changes are announced to assistive technology

### Animation System:
- **Smooth Transitions**: 300ms ease-in-out animations for indicator movement
- **Reduced Motion**: Respects user's motion preferences for accessibility
- **Performance Optimized**: Hardware-accelerated transforms for smooth movement
- **Visual Feedback**: Immediate response to user interactions

### Styling System:
- **Color Variants**: Multiple theme options to match brand and context
- **Size Options**: Small, medium, and large variants for different use cases
- **Custom Content**: Full support for icons, text, and complex React elements
- **Design Tokens**: Consistent spacing, colors, and typography from design system
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
            id: 'keyboard-navigation',
            enabled: true,
          },
        ],
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    choices: {
      description: 'Array of selectable choices with content and values',
      control: { type: 'object' },
    },
    value: {
      description: 'Controlled value (use with onChange for controlled mode)',
      control: false,
    },
    defaultValue: {
      description: 'Initial selected value for uncontrolled mode',
      control: false,
    },
    onChange: {
      description: 'Callback fired when selection changes',
      action: 'selection changed',
    },
    color: {
      description: 'Color theme variant',
      control: { type: 'select' },
      options: ['primary', 'secondary', 'neutral', 'light', 'dark', 'text'],
    },
    size: {
      description: 'Size variant (affects padding and text size)',
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg'],
    },
    className: {
      description: 'Additional CSS classes for custom styling',
      control: 'text',
    },
  },
} satisfies Meta<typeof SwitchSelector>;

export default meta;
type Story = StoryObj<typeof SwitchSelector>;

/**
 * ## Basic Examples
 *
 * These stories demonstrate the core functionality and common usage patterns of the SwitchSelector.
 */

/**
 * ### Default Boolean Toggle
 *
 * The simplest usage with default On/Off choices. Perfect for settings and feature toggles.
 */
export const Default: Story = {
  render: () => (
    <div className="space-y-4">
      <SwitchSelector defaultValue={false} />

      <div className="text-gray-600 text-sm">
        Default boolean toggle with smooth indicator animation
      </div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const switches = canvas.getAllByRole('tablist');

    await expect(switches[0]).toBeInTheDocument();
    await expect(switches[0]).toHaveAttribute('role', 'tablist');

    // Test that buttons are present
    const buttons = canvas.getAllByRole('tab');
    await expect(buttons).toHaveLength(2);
    await expect(buttons[0]).toHaveTextContent('Off');
    await expect(buttons[1]).toHaveTextContent('On');
  },
};

/**
 * ### Theme Selector
 *
 * Demonstrates a three-option theme selector with icons and descriptive content.
 */
export const ThemeSelector: Story = {
  render: () => {
    const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('system');

    return (
      <div className="space-y-6">
        <div>
          <label className="mb-3 block font-medium text-sm">Choose Theme</label>
          <SwitchSelector
            choices={[
              { content: '☀️ Light', value: 'light' },
              { content: '🌙 Dark', value: 'dark' },
              { content: '⚙️ System', value: 'system' },
            ]}
            value={theme}
            onChange={setTheme}
            color="secondary"
            size="md"
          />
        </div>

        <div className="rounded-lg bg-gray-50 p-4">
          <div className="text-sm">
            <div>
              Current theme: <strong>{theme}</strong>
            </div>
            <div className="mt-1 text-gray-600">
              {theme === 'light' && '☀️ Using light theme with bright colors'}
              {theme === 'dark' && '🌙 Using dark theme with muted colors'}
              {theme === 'system' && '⚙️ Following system preference'}
            </div>
          </div>
        </div>
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const buttons = canvas.getAllByRole('tab');

    await expect(buttons).toHaveLength(3);

    // Test clicking different themes
    await userEvent.click(buttons[0]); // Light theme
    await expect(canvas.getByText(/using light theme/i)).toBeInTheDocument();
  },
};

/**
 * ## Size and Color Variants
 *
 * Stories showcasing different visual variants and styling options.
 */

/**
 * ### Size Comparison
 *
 * Shows all three size variants side by side for visual comparison.
 */
export const SizeComparison: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="mb-3 font-medium text-sm">Small Size</h3>
        <SwitchSelector
          choices={[
            { content: 'List', value: 'list' },
            { content: 'Grid', value: 'grid' },
            { content: 'Card', value: 'card' },
          ]}
          defaultValue="grid"
          size="sm"
          color="primary"
        />
      </div>

      <div>
        <h3 className="mb-3 font-medium text-sm">Medium Size (Default)</h3>
        <SwitchSelector
          choices={[
            { content: 'List', value: 'list' },
            { content: 'Grid', value: 'grid' },
            { content: 'Card', value: 'card' },
          ]}
          defaultValue="grid"
          size="md"
          color="secondary"
        />
      </div>

      <div>
        <h3 className="mb-3 font-medium text-sm">Large Size</h3>
        <SwitchSelector
          choices={[
            { content: 'List', value: 'list' },
            { content: 'Grid', value: 'grid' },
            { content: 'Card', value: 'card' },
          ]}
          defaultValue="grid"
          size="lg"
          color="neutral"
        />
      </div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const switches = canvas.getAllByRole('tablist');

    // Verify all three size variants are present
    await expect(switches).toHaveLength(3);
  },
};

/**
 * ### Color Themes
 *
 * Demonstrates all available color variants with the same content for comparison.
 */
export const ColorThemes: Story = {
  render: () => (
    <div className="space-y-4">
      {['primary', 'secondary', 'neutral', 'light', 'dark', 'text'].map(
        (color) => (
          <div key={color} className="flex items-center gap-4">
            <div className="w-20 font-medium text-sm capitalize">{color}</div>
            <SwitchSelector
              choices={[
                { content: 'Draft', value: 'draft' },
                { content: 'Review', value: 'review' },
                { content: 'Published', value: 'published' },
              ]}
              defaultValue="review"
              color={color}
              size="sm"
            />
          </div>
        )
      )}
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const switches = canvas.getAllByRole('tablist');

    // Verify all color variants are present
    await expect(switches).toHaveLength(
      ['primary', 'secondary', 'neutral', 'light', 'dark', 'text'].length
    );
  },
};

/**
 * ## Real-World Examples
 *
 * Stories showing practical applications and advanced usage patterns.
 */

/**
 * ### Status Management Interface
 *
 * A practical example for content status management with visual feedback and state tracking.
 */
export const StatusManagement: Story = {
  render: () => {
    const [status, setStatus] = useState<
      'draft' | 'review' | 'published' | 'archived'
    >('draft');
    const [changeCount, setChangeCount] = useState(0);

    const handleStatusChange = (
      newStatus: 'draft' | 'review' | 'published' | 'archived'
    ) => {
      setStatus(newStatus);
      setChangeCount((prev) => prev + 1);
    };

    const getStatusInfo = (currentStatus: string) => {
      switch (currentStatus) {
        case 'draft':
          return {
            icon: '📝',
            description: 'Content is being worked on',
            color: 'text-gray-600',
          };
        case 'review':
          return {
            icon: '👀',
            description: 'Ready for review and feedback',
            color: 'text-blue-600',
          };
        case 'published':
          return {
            icon: '✅',
            description: 'Live and visible to users',
            color: 'text-green-600',
          };
        case 'archived':
          return {
            icon: '📦',
            description: 'Stored but not accessible',
            color: 'text-orange-600',
          };
        default:
          return {
            icon: '❓',
            description: 'Unknown status',
            color: 'text-gray-400',
          };
      }
    };

    const statusInfo = getStatusInfo(status);

    return (
      <div className="max-w-md space-y-6">
        <div>
          <label className="mb-3 block font-medium text-sm">
            Article Status
          </label>
          <SwitchSelector
            choices={[
              { content: '📝 Draft', value: 'draft' },
              { content: '👀 Review', value: 'review' },
              { content: '✅ Published', value: 'published' },
              { content: '📦 Archived', value: 'archived' },
            ]}
            value={status}
            onChange={handleStatusChange}
            color="primary"
            size="sm"
          />
        </div>

        <div className="space-y-3 rounded-lg border border-gray-200 bg-white p-4">
          <div className="flex items-center gap-2">
            <span className="text-lg">{statusInfo.icon}</span>
            <span className="font-medium capitalize">{status}</span>
          </div>

          <p className={`text-sm ${statusInfo.color}`}>
            {statusInfo.description}
          </p>

          <div className="border-gray-100 border-t pt-2 text-gray-500 text-xs">
            Status changes: <strong>{changeCount}</strong>
          </div>
        </div>

        <div className="space-y-1 text-gray-500 text-xs">
          <div>💡 Tips:</div>
          <div>• Move through draft → review → published workflow</div>
          <div>• Archive old content to keep workspace clean</div>
          <div>• Use review status for collaborative editing</div>
        </div>
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const buttons = canvas.getAllByRole('tab');

    // Test status workflow
    await userEvent.click(buttons[1]); // Click Review
    await expect(canvas.getByText(/ready for review/i)).toBeInTheDocument();

    await userEvent.click(buttons[2]); // Click Published
    await expect(canvas.getByText(/live and visible/i)).toBeInTheDocument();
  },
};

/**
 * ### View Mode Controller
 *
 * Interface for switching between different data display modes with responsive design considerations.
 */
export const ViewModeController: Story = {
  render: () => {
    const [viewMode, setViewMode] = useState<'list' | 'grid' | 'card'>('grid');
    const [itemCount] = useState(42);

    const getModeDescription = (mode: string) => {
      switch (mode) {
        case 'list':
          return 'Compact rows with essential information';
        case 'grid':
          return 'Balanced layout with medium-sized items';
        case 'card':
          return 'Detailed cards with rich information';
        default:
          return 'Select a view mode';
      }
    };

    return (
      <div className="max-w-lg space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium text-sm">Display Mode</h3>
            <p className="text-gray-600 text-xs">
              Choose how to view your items
            </p>
          </div>
          <div className="text-gray-500 text-xs">{itemCount} items</div>
        </div>

        <SwitchSelector
          choices={[
            { content: '📋 List', value: 'list' },
            { content: '⊞ Grid', value: 'grid' },
            { content: '🃏 Cards', value: 'card' },
          ]}
          value={viewMode}
          onChange={setViewMode}
          color="neutral"
          size="md"
        />

        <div className="rounded-lg bg-gray-50 p-4">
          <div className="mb-2 flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-blue-500"></div>
            <span className="font-medium capitalize">{viewMode} View</span>
          </div>
          <p className="text-gray-600 text-sm">
            {getModeDescription(viewMode)}
          </p>
        </div>

        {/* Mock content display */}
        <div className="rounded-lg border border-gray-200 p-4">
          <div className="mb-3 text-gray-500 text-xs">
            Preview ({viewMode} mode)
          </div>
          <div
            className={
              viewMode === 'list'
                ? 'space-y-2'
                : viewMode === 'grid'
                  ? 'grid grid-cols-3 gap-3'
                  : 'grid grid-cols-2 gap-4'
            }
          >
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className={`rounded border border-gray-200 bg-white ${
                  viewMode === 'list'
                    ? 'flex items-center gap-2 p-2'
                    : viewMode === 'grid'
                      ? 'aspect-square p-2'
                      : 'aspect-[3/2] p-3'
                }`}
              >
                <div
                  className={`rounded bg-gray-300 ${
                    viewMode === 'list'
                      ? 'h-8 w-8'
                      : viewMode === 'grid'
                        ? 'h-6 w-full'
                        : 'h-8 w-full'
                  }`}
                />
                {viewMode !== 'list' && (
                  <div className="mt-2 space-y-1">
                    <div className="h-3 rounded bg-gray-200" />
                    {viewMode === 'card' && (
                      <div className="h-2 rounded bg-gray-100" />
                    )}
                  </div>
                )}
                {viewMode === 'list' && (
                  <div className="flex-1 space-y-1">
                    <div className="h-3 rounded bg-gray-200" />
                    <div className="h-2 w-2/3 rounded bg-gray-100" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const buttons = canvas.getAllByRole('tab');

    // Test view mode switching
    await userEvent.click(buttons[0]); // List view
    await expect(canvas.getByText(/compact rows/i)).toBeInTheDocument();

    await userEvent.click(buttons[2]); // Card view
    await expect(canvas.getByText(/detailed cards/i)).toBeInTheDocument();
  },
};
