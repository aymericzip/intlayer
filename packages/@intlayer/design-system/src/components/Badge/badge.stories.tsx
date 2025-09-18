import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';
import { Badge, BadgeColor, BadgeSize, BadgeVariant } from '.';

/**
 * Badge component displays status indicators, labels, and notifications.
 * It supports multiple visual styles, interactive features, and accessibility standards.
 *
 * ## Features
 * - **Multiple variants**: Default, outline, hoverable, and none
 * - **Color themes**: Primary, secondary, destructive, neutral, light, dark, text, and custom
 * - **Size options**: Small, medium, and large
 * - **Interactive features**: Clickable and dismissible badges
 * - **Accessibility**: Proper ARIA labels, keyboard navigation, and focus management
 * - **Customizable**: Flexible styling and comprehensive prop support
 */
const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  parameters: {
    docs: {
      description: {
        component: `
The Badge component is a versatile status indicator that can be used for labels, notifications, status displays, and interactive elements.
It follows accessibility best practices and provides comprehensive customization options.

### Usage Guidelines
- Use appropriate colors to convey meaning (destructive for errors, neutral for info)
- Provide meaningful content and aria-labels for screen readers
- Consider interactive states for clickable badges
- Use dismissible badges sparingly to avoid overwhelming users
        `,
      },
    },
    layout: 'centered',
    backgrounds: {
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'dark', value: '#333333' },
        { name: 'neutral', value: '#f5f5f5' },
      ],
    },
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: { type: 'text' },
      description: 'Content inside the badge',
      table: {
        type: { summary: 'ReactNode' },
        defaultValue: { summary: 'undefined' },
      },
    },
    color: {
      control: { type: 'select' },
      options: Object.values(BadgeColor),
      description: 'Color theme of the badge',
      table: {
        type: { summary: 'BadgeColor' },
        defaultValue: { summary: 'BadgeColor.PRIMARY' },
      },
    },
    variant: {
      control: { type: 'select' },
      options: Object.values(BadgeVariant),
      description: 'Visual variant of the badge',
      table: {
        type: { summary: 'BadgeVariant' },
        defaultValue: { summary: 'BadgeVariant.DEFAULT' },
      },
    },
    size: {
      control: { type: 'select' },
      options: Object.values(BadgeSize),
      description: 'Size of the badge',
      table: {
        type: { summary: 'BadgeSize' },
        defaultValue: { summary: 'BadgeSize.MEDIUM' },
      },
    },
    clickable: {
      control: { type: 'boolean' },
      description: 'Whether the badge is clickable',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    dismissible: {
      control: { type: 'boolean' },
      description: 'Whether the badge is dismissible (shows close button)',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    onClick: {
      action: 'clicked',
      description: 'Click handler for the badge',
      table: {
        type: { summary: '(event: MouseEvent) => void' },
      },
    },
    onDismiss: {
      action: 'dismissed',
      description: 'Handler for when badge is dismissed',
      table: {
        type: { summary: '() => void' },
      },
    },
    className: {
      control: { type: 'text' },
      description: 'Additional CSS classes for custom styling',
      table: {
        type: { summary: 'string' },
      },
    },
    'aria-label': {
      control: { type: 'text' },
      description: 'ARIA label for accessibility',
      table: {
        type: { summary: 'string' },
      },
    },
    role: {
      control: { type: 'select' },
      options: ['status', 'button', 'generic'],
      description: 'Badge role for accessibility',
      table: {
        type: { summary: "'status' | 'button' | 'generic'" },
        defaultValue: { summary: "'status'" },
      },
    },
  },
  args: {
    children: 'Badge',
    color: BadgeColor.PRIMARY,
    variant: BadgeVariant.DEFAULT,
    size: BadgeSize.MEDIUM,
    clickable: false,
    dismissible: false,
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

/**
 * Default badge with primary color and medium size
 */
export const Default: Story = {
  args: {
    children: 'Badge',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Basic badge with default styling. This is the most common use case for status indicators and labels.',
      },
    },
  },
};

/**
 * All color variations showcase
 */
export const ColorVariations: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      {Object.values(BadgeColor)
        .filter((color) => color !== BadgeColor.CUSTOM)
        .map((color) => (
          <Badge key={color} color={color}>
            {color.charAt(0).toUpperCase() + color.slice(1)}
          </Badge>
        ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'All available color themes for the badge component. Choose colors that align with your design system and convey appropriate meaning.',
      },
    },
  },
};

/**
 * Visual variant showcase
 */
export const VariantShowcase: Story = {
  render: () => (
    <div className="space-y-4">
      {Object.values(BadgeVariant).map((variant) => (
        <div key={variant} className="flex flex-wrap gap-2">
          <span className="w-20 text-sm font-medium capitalize">
            {variant}:
          </span>
          {Object.values(BadgeColor)
            .filter((color) => color !== BadgeColor.CUSTOM)
            .slice(0, 4)
            .map((color) => (
              <Badge
                key={`${variant}-${color}`}
                variant={variant}
                color={color}
              >
                {variant}
              </Badge>
            ))}
        </div>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Different visual variants across multiple colors. Each variant provides a different visual emphasis and use case.',
      },
    },
  },
};

/**
 * Size variations demonstration
 */
export const SizeVariations: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      {Object.values(BadgeSize).map((size) => (
        <div key={size} className="flex flex-col items-center gap-2">
          <Badge size={size} color={BadgeColor.PRIMARY}>
            {size.charAt(0).toUpperCase() + size.slice(1)}
          </Badge>
          <span className="text-xs text-gray-600 capitalize">{size}</span>
        </div>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Available size options from small to large. Choose sizes based on the importance and context of the badge.',
      },
    },
  },
};

/**
 * Clickable badge with interaction
 */
export const ClickableBadge: Story = {
  args: {
    children: 'Click me',
    clickable: true,
    color: BadgeColor.SECONDARY,
    onClick: () => console.log('Badge clicked!'),
  },
  parameters: {
    docs: {
      description: {
        story:
          'Interactive badge that responds to clicks and keyboard navigation. Includes proper accessibility attributes and focus management.',
      },
    },
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const badge = canvas.getByRole('button');

    // Test accessibility
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveAttribute('role', 'button');
    expect(badge).toHaveAttribute('tabIndex', '0');

    // Test interaction
    await userEvent.click(badge);
    expect(args.onClick).toHaveBeenCalled();

    // Test keyboard interaction
    badge.focus();
    await userEvent.keyboard('{Enter}');
    expect(args.onClick).toHaveBeenCalledTimes(2);
  },
};

/**
 * Dismissible badge with close functionality
 */
export const DismissibleBadge: Story = {
  args: {
    children: 'Dismissible',
    dismissible: true,
    color: BadgeColor.NEUTRAL,
    onDismiss: () => console.log('Badge dismissed!'),
  },
  parameters: {
    docs: {
      description: {
        story:
          'Badge with dismiss functionality. Useful for removable tags, filters, or temporary notifications.',
      },
    },
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const dismissButton = canvas.getByRole('button', { name: /remove/i });

    // Test dismiss button presence
    expect(dismissButton).toBeInTheDocument();
    expect(dismissButton).toHaveAttribute('aria-label');

    // Test dismiss functionality
    await userEvent.click(dismissButton);
    expect(args.onDismiss).toHaveBeenCalled();
  },
};

/**
 * Badge with custom styling and content
 */
export const CustomStyling: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 border-none text-white">
        Gradient
      </Badge>
      <Badge className="bg-yellow-100 text-yellow-800 border-yellow-300">
        Custom Color
      </Badge>
      <Badge
        variant={BadgeVariant.OUTLINE}
        className="border-dashed border-blue-400 text-blue-600"
      >
        Dashed Border
      </Badge>
      <Badge
        size={BadgeSize.LARGE}
        className="font-bold uppercase tracking-wider"
      >
        Bold Large
      </Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Examples of custom styling using className prop. Demonstrates the flexibility of the badge component.',
      },
    },
  },
};

/**
 * Accessibility-focused examples
 */
export const AccessibilityExample: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h4 className="mb-2 font-medium">Status Badges</h4>
        <div className="flex gap-2">
          <Badge color={BadgeColor.PRIMARY} aria-label="Online status">
            Online
          </Badge>
          <Badge color={BadgeColor.DESTRUCTIVE} aria-label="Error status">
            Error
          </Badge>
          <Badge color={BadgeColor.NEUTRAL} aria-label="Pending status">
            Pending
          </Badge>
        </div>
      </div>

      <div>
        <h4 className="mb-2 font-medium">Interactive Badges</h4>
        <div className="flex gap-2">
          <Badge
            clickable
            color={BadgeColor.SECONDARY}
            aria-label="Filter by category"
            onClick={() => console.log('Category filter clicked')}
          >
            Category
          </Badge>
          <Badge
            dismissible
            color={BadgeColor.LIGHT}
            aria-label="Remove tag"
            onDismiss={() => console.log('Tag removed')}
          >
            Tag
          </Badge>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Examples focusing on accessibility features including proper ARIA labels, roles, and keyboard navigation.',
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test that all badges have proper accessibility attributes
    const statusBadges = canvas.getAllByRole('status');
    const buttonBadges = canvas.getAllByRole('button');

    expect(statusBadges.length).toBeGreaterThan(0);
    expect(buttonBadges.length).toBeGreaterThan(0);

    // Test keyboard navigation
    if (buttonBadges.length > 0) {
      await userEvent.tab();
      expect(buttonBadges[0]).toHaveFocus();
    }
  },
};

/**
 * Real-world usage examples
 */
export const UsageExamples: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h4 className="mb-2 font-medium">Notification Count</h4>
        <div className="flex items-center gap-2">
          <span>Messages</span>
          <Badge color={BadgeColor.DESTRUCTIVE} size={BadgeSize.SMALL}>
            3
          </Badge>
        </div>
      </div>

      <div>
        <h4 className="mb-2 font-medium">Status Indicators</h4>
        <div className="flex gap-2">
          <Badge color={BadgeColor.PRIMARY}>Active</Badge>
          <Badge color={BadgeColor.NEUTRAL}>Inactive</Badge>
          <Badge color={BadgeColor.DESTRUCTIVE}>Suspended</Badge>
        </div>
      </div>

      <div>
        <h4 className="mb-2 font-medium">Category Tags</h4>
        <div className="flex flex-wrap gap-1">
          {['React', 'TypeScript', 'Storybook', 'Design System'].map((tag) => (
            <Badge
              key={tag}
              variant={BadgeVariant.OUTLINE}
              color={BadgeColor.SECONDARY}
              size={BadgeSize.SMALL}
              dismissible
              onDismiss={() => console.log(`Removed ${tag}`)}
            >
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      <div>
        <h4 className="mb-2 font-medium">Priority Levels</h4>
        <div className="flex gap-2">
          <Badge color={BadgeColor.DESTRUCTIVE} size={BadgeSize.SMALL}>
            High
          </Badge>
          <Badge color={BadgeColor.NEUTRAL} size={BadgeSize.SMALL}>
            Medium
          </Badge>
          <Badge color={BadgeColor.LIGHT} size={BadgeSize.SMALL}>
            Low
          </Badge>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Real-world usage examples including notification counts, status indicators, category tags, and priority levels.',
      },
    },
  },
};

/**
 * Comprehensive test scenario
 */
export const TestScenario: Story = {
  args: {
    children: 'Test Badge',
    clickable: true,
    color: BadgeColor.PRIMARY,
    onClick: () => console.log('Test badge clicked'),
  },
  parameters: {
    docs: {
      description: {
        story:
          'Comprehensive test scenario with automated interactions and accessibility validation.',
      },
    },
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const badge = canvas.getByRole('button');

    // Test initial state
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveTextContent('Test Badge');

    // Test accessibility
    expect(badge).toHaveAttribute('role', 'button');
    expect(badge).toHaveAttribute('aria-label');

    // Test interaction
    await userEvent.click(badge);
    expect(args.onClick).toHaveBeenCalled();

    // Test keyboard navigation
    badge.focus();
    await userEvent.keyboard('{Enter}');
    expect(args.onClick).toHaveBeenCalledTimes(2);

    // Test space key
    await userEvent.keyboard(' ');
    expect(args.onClick).toHaveBeenCalledTimes(3);
  },
};
