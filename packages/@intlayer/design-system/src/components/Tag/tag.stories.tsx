import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';
import { useState } from 'react';
import {
  Tag,
  TagBackground,
  TagBorder,
  TagColor,
  TagRoundedSize,
  TagSize,
} from '.';

/**
 * ## Tag Component
 *
 * The Tag component is a versatile labeling element perfect for displaying status indicators,
 * categories, badges, and metadata. It supports multiple visual variants with semantic colors
 * and flexible styling options.
 *
 * ### Key Features
 * - **Semantic Colors**: Success, error, warning, neutral, and text themes
 * - **Flexible Sizing**: Five size variants for different hierarchical needs
 * - **Border Radius Options**: From sharp corners to fully rounded pills
 * - **Optional Borders**: Enhanced visual separation when needed
 * - **Backdrop Blur**: Subtle transparency effects for modern styling
 *
 * ### Use Cases
 * - Status indicators (completed, pending, failed)
 * - Content categorization and organization
 * - Badges and notifications
 * - Keywords and topic tags
 * - Metadata display (dates, authors, types)
 *
 * ### Accessibility Features
 * - Proper HTML semantics for screen readers
 * - High contrast color combinations
 * - Keyboard navigation support
 * - Clear visual hierarchy through sizing
 */
const meta: Meta<typeof Tag> = {
  title: 'Components/Tag',
  component: Tag,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A versatile tag component for labels, status indicators, categories, and badges with multiple styling variants.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      description: 'Content to display inside the tag',
      control: 'text',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
    color: {
      description: 'Color theme variant of the tag',
      control: { type: 'select' },
      options: Object.values(TagColor),
      table: {
        type: { summary: 'TagColor' },
        defaultValue: { summary: 'TagColor.TEXT' },
      },
    },
    roundedSize: {
      description: 'Border radius size of the tag',
      control: { type: 'select' },
      options: Object.values(TagRoundedSize),
      table: {
        type: { summary: 'TagRoundedSize' },
        defaultValue: { summary: 'TagRoundedSize.FULL' },
      },
    },
    size: {
      description: 'Size variant affecting padding and font size',
      control: { type: 'select' },
      options: Object.values(TagSize),
      table: {
        type: { summary: 'TagSize' },
        defaultValue: { summary: 'TagSize.MD' },
      },
    },
    border: {
      description: 'Whether to show a border around the tag',
      control: { type: 'select' },
      options: Object.values(TagBorder),
      table: {
        type: { summary: 'TagBorder' },
        defaultValue: { summary: 'TagBorder.NONE' },
      },
    },
    background: {
      description: 'Background visibility option',
      control: { type: 'select' },
      options: Object.values(TagBackground),
      table: {
        type: { summary: 'TagBackground' },
        defaultValue: { summary: 'TagBackground.NONE' },
      },
    },
    className: {
      description: 'Additional CSS classes for custom styling',
      control: 'text',
    },
  },
} satisfies Meta<typeof Tag>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * ## Basic Examples
 *
 * These stories demonstrate core functionality and common usage patterns.
 */

/**
 * ### Default Tag
 *
 * The simplest usage with default styling and text content.
 */
export const Default: Story = {
  render: () => (
    <div className="space-y-4">
      <Tag>Default Tag</Tag>

      <div className="text-sm text-gray-600 max-w-md">
        Default configuration with text color theme, full rounding, and medium
        size.
      </div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const tag = canvas.getByText('Default Tag');

    await expect(tag).toBeInTheDocument();
    await expect(tag).toHaveTextContent('Default Tag');
  },
};

/**
 * ### Semantic Color Variations
 *
 * Different color themes for various semantic meanings and states.
 */
export const SemanticColors: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h4 className="text-sm font-medium mb-3">Status Indicators</h4>
        <div className="flex flex-wrap gap-3">
          <Tag color={TagColor.SUCCESS}>Completed</Tag>
          <Tag color={TagColor.ERROR}>Failed</Tag>
          <Tag color={TagColor.WARNING}>In Progress</Tag>
          <Tag color={TagColor.NEUTRAL}>Pending</Tag>
          <Tag color={TagColor.TEXT}>Draft</Tag>
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">With Borders</h4>
        <div className="flex flex-wrap gap-3">
          <Tag color={TagColor.SUCCESS} border={TagBorder.WITH}>
            Success
          </Tag>
          <Tag color={TagColor.ERROR} border={TagBorder.WITH}>
            Error
          </Tag>
          <Tag color={TagColor.WARNING} border={TagBorder.WITH}>
            Warning
          </Tag>
          <Tag color={TagColor.NEUTRAL} border={TagBorder.WITH}>
            Neutral
          </Tag>
          <Tag color={TagColor.TEXT} border={TagBorder.WITH}>
            Text
          </Tag>
        </div>
      </div>

      <div className="text-xs text-gray-500 max-w-md">
        Use semantic colors to convey meaning: green for success, red for
        errors, yellow for warnings, gray for neutral states.
      </div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test semantic colors are present
    await expect(canvas.getByText('Completed')).toBeInTheDocument();
    await expect(canvas.getByText('Failed')).toBeInTheDocument();
    await expect(canvas.getByText('In Progress')).toBeInTheDocument();

    // Test bordered variants
    const successBordered = canvas.getAllByText('Success')[0];
    await expect(successBordered).toBeInTheDocument();
  },
};

/**
 * ## Size and Shape Variants
 *
 * Stories showcasing different size options and border radius variations.
 */

/**
 * ### Size Comparison
 *
 * All available size variants for visual hierarchy and emphasis.
 */
export const SizeComparison: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h4 className="text-sm font-medium mb-4">Size Hierarchy</h4>
        <div className="flex flex-wrap items-center gap-4">
          <Tag size={TagSize.XS} color={TagColor.NEUTRAL}>
            Extra Small
          </Tag>
          <Tag size={TagSize.SM} color={TagColor.TEXT}>
            Small
          </Tag>
          <Tag size={TagSize.MD} color={TagColor.SUCCESS}>
            Medium
          </Tag>
          <Tag size={TagSize.LG} color={TagColor.WARNING}>
            Large
          </Tag>
          <Tag size={TagSize.XL} color={TagColor.ERROR}>
            Extra Large
          </Tag>
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium mb-4">
          Same Size, Different Content
        </h4>
        <div className="flex flex-wrap gap-3">
          <Tag size={TagSize.SM}>UI</Tag>
          <Tag size={TagSize.SM}>Design System</Tag>
          <Tag size={TagSize.SM}>Components</Tag>
          <Tag size={TagSize.SM}>Accessibility</Tag>
        </div>
      </div>

      <div className="text-xs text-gray-500 max-w-md">
        Choose sizes based on visual hierarchy: XS for subtle labels, SM for
        standard tags, MD for balanced visibility, LG for emphasis, XL for hero
        elements.
      </div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test different sizes are present
    await expect(canvas.getByText('Extra Small')).toBeInTheDocument();
    await expect(canvas.getByText('Medium')).toBeInTheDocument();
    await expect(canvas.getByText('Extra Large')).toBeInTheDocument();
  },
};

/**
 * ### Border Radius Variations
 *
 * Different rounding options from sharp to fully rounded.
 */
export const BorderRadiusVariations: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h4 className="text-sm font-medium mb-4">Rounding Options</h4>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Tag roundedSize={TagRoundedSize.NONE} color={TagColor.NEUTRAL}>
              Sharp
            </Tag>
            <Tag roundedSize={TagRoundedSize.SM} color={TagColor.NEUTRAL}>
              Small Round
            </Tag>
            <Tag roundedSize={TagRoundedSize.MD} color={TagColor.NEUTRAL}>
              Medium Round
            </Tag>
            <Tag roundedSize={TagRoundedSize.LG} color={TagColor.NEUTRAL}>
              Large Round
            </Tag>
          </div>
          <div className="space-y-2">
            <Tag roundedSize={TagRoundedSize.XL} color={TagColor.TEXT}>
              XL Round
            </Tag>
            <Tag roundedSize={TagRoundedSize.XXL} color={TagColor.TEXT}>
              2XL Round
            </Tag>
            <Tag roundedSize={TagRoundedSize.XXXL} color={TagColor.TEXT}>
              3XL Round
            </Tag>
            <Tag roundedSize={TagRoundedSize.FULL} color={TagColor.SUCCESS}>
              Pill Shape
            </Tag>
          </div>
        </div>
      </div>

      <div className="text-xs text-gray-500 max-w-md">
        Use FULL for pill-shaped tags, MD-LG for modern rounded look, NONE for
        technical or data-focused interfaces.
      </div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test different roundings are present
    await expect(canvas.getByText('Sharp')).toBeInTheDocument();
    await expect(canvas.getByText('Pill Shape')).toBeInTheDocument();
    await expect(canvas.getByText('Medium Round')).toBeInTheDocument();
  },
};

/**
 * ## Real-World Examples
 *
 * Practical applications and interactive usage scenarios.
 */

/**
 * ### Content Categorization System
 *
 * A practical example showing tags used for content organization.
 */
export const ContentCategorization: Story = {
  render: () => {
    const [selectedTags, setSelectedTags] = useState<string[]>([
      'react',
      'design-system',
    ]);

    const categories = [
      { name: 'react', color: TagColor.SUCCESS, label: 'React' },
      { name: 'typescript', color: TagColor.TEXT, label: 'TypeScript' },
      {
        name: 'design-system',
        color: TagColor.WARNING,
        label: 'Design System',
      },
      {
        name: 'accessibility',
        color: TagColor.NEUTRAL,
        label: 'Accessibility',
      },
      { name: 'testing', color: TagColor.ERROR, label: 'Testing' },
      { name: 'storybook', color: TagColor.SUCCESS, label: 'Storybook' },
    ];

    const toggleTag = (tagName: string) => {
      setSelectedTags((prev) =>
        prev.includes(tagName)
          ? prev.filter((t) => t !== tagName)
          : [...prev, tagName]
      );
    };

    return (
      <div className="max-w-2xl space-y-6">
        <div>
          <h4 className="text-lg font-semibold mb-2">Article Tags</h4>
          <p className="text-sm text-gray-600 mb-4">
            Click tags to select/deselect them for categorizing content.
          </p>

          <div className="flex flex-wrap gap-3 mb-4">
            {categories.map((category) => {
              const isSelected = selectedTags.includes(category.name);
              return (
                <Tag
                  key={category.name}
                  color={category.color}
                  border={isSelected ? TagBorder.WITH : TagBorder.NONE}
                  size={TagSize.SM}
                  className={`cursor-pointer transition-all duration-200 ${
                    isSelected
                      ? 'ring-2 ring-blue-300 scale-105'
                      : 'hover:scale-105 hover:shadow-md'
                  }`}
                  onClick={() => toggleTag(category.name)}
                  data-testid={category.name}
                >
                  {category.label} {isSelected ? '✓' : '+'}
                </Tag>
              );
            })}
          </div>

          {selectedTags.length > 0 ? (
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-sm font-medium mb-2">Selected Tags:</div>
              <div className="flex flex-wrap gap-2">
                {selectedTags.map((tagName) => {
                  const category = categories.find((c) => c.name === tagName);
                  return category ? (
                    <Tag
                      key={tagName}
                      color={category.color}
                      size={TagSize.XS}
                      border={TagBorder.WITH}
                    >
                      {category.label}
                    </Tag>
                  ) : null;
                })}
              </div>
            </div>
          ) : (
            <div className="text-gray-500 text-sm">No tags selected</div>
          )}
        </div>

        <div className="text-xs text-gray-500">
          💡 Interactive tags help users organize and filter content
          effectively. Use visual feedback like borders, scaling, and rings for
          selection states.
        </div>
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test interactive functionality
    const reactTag = canvas.getByTestId('react');
    await userEvent.click(reactTag);

    // Should still be in selected tags since it starts selected
    await expect(canvas.getByText('Selected Tags:')).toBeInTheDocument();
  },
};

/**
 * ### Status Dashboard
 *
 * A dashboard-style interface showing various system statuses.
 */
export const StatusDashboard: Story = {
  render: () => {
    const services = [
      { name: 'API Gateway', status: 'healthy', uptime: '99.9%' },
      { name: 'Database', status: 'healthy', uptime: '100%' },
      { name: 'Cache Service', status: 'warning', uptime: '98.1%' },
      { name: 'Message Queue', status: 'healthy', uptime: '99.7%' },
      { name: 'File Storage', status: 'error', uptime: '85.2%' },
      { name: 'Auth Service', status: 'healthy', uptime: '99.8%' },
    ];

    const getStatusConfig = (status: string) => {
      switch (status) {
        case 'healthy':
          return { color: TagColor.SUCCESS, label: 'Healthy', icon: '✅' };
        case 'warning':
          return { color: TagColor.WARNING, label: 'Warning', icon: '⚠️' };
        case 'error':
          return { color: TagColor.ERROR, label: 'Error', icon: '❌' };
        default:
          return { color: TagColor.NEUTRAL, label: 'Unknown', icon: '❓' };
      }
    };

    const healthyCount = services.filter((s) => s.status === 'healthy').length;
    const warningCount = services.filter((s) => s.status === 'warning').length;
    const errorCount = services.filter((s) => s.status === 'error').length;

    return (
      <div className="max-w-4xl space-y-6">
        <div className="flex items-center justify-between">
          <h4 className="text-lg font-semibold">System Status Dashboard</h4>
          <div className="flex gap-3">
            <Tag color={TagColor.SUCCESS} size={TagSize.SM}>
              {healthyCount} Healthy
            </Tag>
            <Tag color={TagColor.WARNING} size={TagSize.SM}>
              {warningCount} Warning
            </Tag>
            <Tag color={TagColor.ERROR} size={TagSize.SM}>
              {errorCount} Error
            </Tag>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((service) => {
            const statusConfig = getStatusConfig(service.status);
            return (
              <div
                key={service.name}
                className="border border-gray-200 rounded-lg p-4 bg-white"
              >
                <div className="flex items-center justify-between mb-2">
                  <h5 className="font-medium text-gray-900">{service.name}</h5>
                  <Tag
                    color={statusConfig.color}
                    size={TagSize.XS}
                    roundedSize={TagRoundedSize.MD}
                    data-testid={`${service.name}-status`}
                  >
                    {statusConfig.icon} {statusConfig.label}
                  </Tag>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Uptime:</span>
                    <span
                      className={`font-medium ${
                        parseFloat(service.uptime) >= 99
                          ? 'text-green-600'
                          : parseFloat(service.uptime) >= 95
                            ? 'text-yellow-600'
                            : 'text-red-600'
                      }`}
                    >
                      {service.uptime}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600">Last Check:</span>
                    <span className="text-gray-800">2 min ago</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Tag color={TagColor.SUCCESS} size={TagSize.XS}>
              ℹ️ Info
            </Tag>
            <span className="font-medium text-blue-900">System Overview</span>
          </div>
          <p className="text-blue-800 text-sm">
            Overall system health:{' '}
            <strong>
              {errorCount === 0
                ? 'Good'
                : warningCount > 0
                  ? 'Degraded'
                  : 'Critical'}
            </strong>
            .{errorCount > 0 && ' Some services require immediate attention.'}
            {warningCount > 0 &&
              errorCount === 0 &&
              ' Some services need monitoring.'}
            {errorCount === 0 &&
              warningCount === 0 &&
              ' All systems operating normally.'}
          </p>
        </div>
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test dashboard elements
    await expect(
      canvas.getByText('System Status Dashboard')
    ).toBeInTheDocument();
    await expect(canvas.getByText('API Gateway')).toBeInTheDocument();
    await expect(canvas.getByTestId('File Storage-status')).toHaveTextContent(
      '❌ Error'
    );
    await expect(canvas.getByTestId('Database-status')).toHaveTextContent(
      '✅ Healthy'
    );
    await expect(canvas.getByTestId('Cache Service-status')).toHaveTextContent(
      '⚠️ Warning'
    );
  },
};

/**
 * ### User Profile Tags
 *
 * Example of tags used in user profiles for skills and interests.
 */
export const UserProfileTags: Story = {
  render: () => {
    const userSkills = [
      { name: 'React', level: 'expert', category: 'frontend' },
      { name: 'TypeScript', level: 'expert', category: 'language' },
      { name: 'Node.js', level: 'advanced', category: 'backend' },
      { name: 'Python', level: 'intermediate', category: 'language' },
      { name: 'AWS', level: 'intermediate', category: 'cloud' },
      { name: 'Docker', level: 'advanced', category: 'devops' },
    ];

    const interests = [
      'Open Source',
      'AI/ML',
      'Design Systems',
      'Accessibility',
      'Performance',
    ];

    const getLevelColor = (level: string) => {
      switch (level) {
        case 'expert':
          return TagColor.SUCCESS;
        case 'advanced':
          return TagColor.WARNING;
        case 'intermediate':
          return TagColor.NEUTRAL;
        default:
          return TagColor.TEXT;
      }
    };

    return (
      <div className="max-w-2xl space-y-8">
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
              JD
            </div>
            <div>
              <h3 className="text-xl font-semibold">Jane Developer</h3>
              <p className="text-gray-600">Senior Frontend Engineer</p>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                💼 Technical Skills
                <Tag size={TagSize.XS} color={TagColor.NEUTRAL}>
                  {userSkills.length} skills
                </Tag>
              </h4>
              <div className="flex flex-wrap gap-2">
                {userSkills.map((skill) => (
                  <Tag
                    key={skill.name}
                    color={getLevelColor(skill.level)}
                    size={TagSize.SM}
                    roundedSize={TagRoundedSize.MD}
                    border={TagBorder.WITH}
                    className="group relative"
                  >
                    {skill.name}
                    <span className="ml-1 text-xs opacity-70">
                      {skill.level === 'expert'
                        ? '⭐'
                        : skill.level === 'advanced'
                          ? '🔥'
                          : skill.level === 'intermediate'
                            ? '📈'
                            : '🌱'}
                    </span>
                  </Tag>
                ))}
              </div>

              <div className="mt-3 flex gap-4 text-xs text-gray-500">
                <div className="flex items-center gap-1">
                  <Tag size={TagSize.XS} color={TagColor.SUCCESS}>
                    ⭐
                  </Tag>
                  <span>Expert</span>
                </div>
                <div className="flex items-center gap-1">
                  <Tag size={TagSize.XS} color={TagColor.WARNING}>
                    🔥
                  </Tag>
                  <span>Advanced</span>
                </div>
                <div className="flex items-center gap-1">
                  <Tag size={TagSize.XS} color={TagColor.NEUTRAL}>
                    📈
                  </Tag>
                  <span>Intermediate</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-gray-700 mb-3">
                🎯 Interests & Focus Areas
              </h4>
              <div className="flex flex-wrap gap-2">
                {interests.map((interest) => (
                  <Tag
                    key={interest}
                    color={TagColor.TEXT}
                    size={TagSize.SM}
                    roundedSize={TagRoundedSize.FULL}
                    className="hover:scale-105 transition-transform cursor-pointer"
                  >
                    {interest}
                  </Tag>
                ))}
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 border-l-4 border-blue-500">
              <div className="flex items-center gap-2 mb-2">
                <Tag size={TagSize.XS} color={TagColor.SUCCESS}>
                  📊
                </Tag>
                <span className="text-sm font-medium">Profile Strength</span>
              </div>
              <p className="text-sm text-gray-600">
                Your profile showcases{' '}
                {userSkills.filter((s) => s.level === 'expert').length}{' '}
                expert-level skills and {interests.length} professional
                interests, making you highly discoverable for relevant
                opportunities.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test profile elements
    await expect(canvas.getByText('Jane Developer')).toBeInTheDocument();
    await expect(canvas.getByText('React')).toBeInTheDocument();
    await expect(canvas.getByText('Open Source')).toBeInTheDocument();
  },
};
