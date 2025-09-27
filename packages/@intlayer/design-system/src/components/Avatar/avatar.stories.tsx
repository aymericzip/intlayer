import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';
import { getAvatarImageUrl } from '../../utils/image';
import { Avatar } from './index';

/**
 * Avatar component displays user profile information in a circular format.
 * It supports images, initials, loading states, and interactive features.
 *
 * ## Features
 * - **Responsive sizing**: sm, md, lg, xl variants
 * - **Multiple display modes**: Image, initials, default icon, loading spinner
 * - **Accessibility**: ARIA labels, keyboard navigation, focus management
 * - **Interactive**: Optional click handlers with visual feedback
 * - **Customizable**: Flexible styling and theming options
 */
const meta: Meta<typeof Avatar> = {
  title: 'Components/Avatar',
  component: Avatar,
  parameters: {
    docs: {
      description: {
        component: `
The Avatar component is a versatile user profile display that adapts to different content types and states.
It follows accessibility best practices and supports multiple interaction patterns.

### Usage Guidelines
- Use images when available for better user recognition
- Provide meaningful alt text for screen readers
- Consider loading states for async image loading
- Use initials as fallback when images aren't available
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
    src: {
      control: { type: 'text' },
      description: 'Image source URL for the avatar',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
    },
    fullname: {
      control: { type: 'text' },
      description: 'Full name used to generate initials and alt text',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'Size variant of the avatar',
      table: {
        type: { summary: "'sm' | 'md' | 'lg' | 'xl'" },
        defaultValue: { summary: "'md'" },
      },
    },
    isLoading: {
      control: { type: 'boolean' },
      description: 'Displays a loading spinner when true',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    isLoggedIn: {
      control: { type: 'boolean' },
      description: 'Whether the user is authenticated',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    alt: {
      control: { type: 'text' },
      description: 'Alternative text for accessibility',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
    },
    focusable: {
      control: { type: 'boolean' },
      description: 'Whether the avatar should be focusable when not clickable',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    onClick: {
      action: 'clicked',
      description: 'Click handler - when provided, makes the avatar clickable',
      table: {
        type: { summary: '(event: MouseEvent<HTMLButtonElement>) => void' },
      },
    },
    className: {
      control: { type: 'text' },
      description: 'Additional CSS classes for styling',
      table: {
        type: { summary: 'string' },
      },
    },
  },
  args: {
    isLoggedIn: true,
    isLoading: false,
    size: 'md',
    focusable: false,
  },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

/**
 * Default avatar with an image source
 */
export const Default: Story = {
  args: {
    src: '',
    fullname: 'John Doe',
    alt: 'John Doe profile picture',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Basic avatar with a profile image. This is the most common use case when user images are available.',
      },
    },
  },
};

/**
 * Avatar displaying initials when no image is provided
 */
export const WithInitials: Story = {
  args: {
    fullname: 'Sarah Wilson',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Avatar showing user initials when no image source is provided. Great fallback option for user profiles.',
      },
    },
  },
};

/**
 * Avatar displaying default user icon
 */
export const WithIcon: Story = {
  args: {
    isLoggedIn: true,
    fullname: '',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Default user icon displayed when no image or name is available.',
      },
    },
  },
};

/**
 * Avatar in loading state
 */
export const Loading: Story = {
  args: {
    isLoading: true,
    fullname: 'Loading User',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Loading state with spinner animation. Use this while fetching user data or profile images.',
      },
    },
  },
};

/**
 * Avatar for logged out user
 */
export const LoggedOut: Story = {
  args: {
    isLoggedIn: false,
    fullname: 'Anonymous User',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Avatar state for unauthenticated users. Shows empty state or placeholder.',
      },
    },
  },
};

/**
 * Clickable avatar with interaction
 */
export const Clickable: Story = {
  args: {
    src: getAvatarImageUrl(),
    fullname: 'Emma Chen',
    onClick: () => console.log('Avatar clicked!'),
  },
  parameters: {
    docs: {
      description: {
        story:
          'Interactive avatar that responds to clicks. Includes hover effects and accessibility features.',
      },
    },
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const avatar = canvas.getByRole('button');

    // Test accessibility
    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveAttribute('aria-label');

    // Test interaction
    await userEvent.click(avatar);
    expect(args.onClick).toHaveBeenCalled();
  },
};
/**
 * Size variations showcase
 */
export const SizeVariants: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <div className="flex flex-col items-center gap-2">
        <Avatar size="sm" src={getAvatarImageUrl()} fullname="Small Avatar" />
        <span className="text-xs text-gray-600">Small</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Avatar size="md" src={getAvatarImageUrl()} fullname="Medium Avatar" />
        <span className="text-xs text-gray-600">Medium</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Avatar size="lg" src={getAvatarImageUrl()} fullname="Large Avatar" />
        <span className="text-xs text-gray-600">Large</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Avatar
          size="xl"
          src={getAvatarImageUrl()}
          fullname="Extra Large Avatar"
        />
        <span className="text-xs text-gray-600">Extra Large</span>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'All available size variants from small to extra large. Choose the appropriate size based on your layout needs.',
      },
    },
  },
};

/**
 * Accessibility demonstration
 */
export const AccessibilityExample: Story = {
  args: {
    src: getAvatarImageUrl(),
    fullname: 'Alex Johnson',
    alt: 'Alex Johnson, Software Engineer at TechCorp',
    focusable: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Avatar with comprehensive accessibility features including custom alt text, focus management, and ARIA labels.',
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
            id: 'focus-visible',
            enabled: true,
          },
        ],
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const avatar = canvas.getByRole('img');

    // Test accessibility attributes
    expect(avatar).toHaveAttribute('aria-label');
    expect(avatar).toHaveAttribute('tabindex', '0');

    // Test focus behavior
    await userEvent.tab();
    expect(avatar).toHaveFocus();
  },
};

/**
 * Multiple content states
 */
export const ContentStates: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
      <div className="flex flex-col items-center gap-2">
        <Avatar src={getAvatarImageUrl()} fullname="Image User" />
        <span className="text-sm text-center">With Image</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Avatar fullname="Initials User" />
        <span className="text-sm text-center">Initials Only</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Avatar isLoading fullname="Loading User" />
        <span className="text-sm text-center">Loading State</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Avatar />
        <span className="text-sm text-center">Default Icon</span>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Comparison of different content states: image, initials, loading, and default icon.',
      },
    },
  },
};

/**
 * Interactive gallery with various personas
 */
export const UserGallery: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-4 md:grid-cols-6">
      {[
        { name: 'John Doe', img: getAvatarImageUrl() },
        { name: 'Jane Smith', img: getAvatarImageUrl() },
        { name: 'Bob Wilson', img: getAvatarImageUrl() },
        { name: 'Alice Brown', img: getAvatarImageUrl() },
        { name: 'Charlie Davis', img: getAvatarImageUrl() },
        { name: 'Eva Garcia', img: getAvatarImageUrl() },
        { name: 'Frank Miller', img: getAvatarImageUrl() },
        { name: 'Grace Lee', img: getAvatarImageUrl() },
        { name: 'Henry Taylor', img: getAvatarImageUrl() },
        { name: 'Ivy Chen', img: getAvatarImageUrl() },
        { name: 'Jack Robinson', img: getAvatarImageUrl() },
        { name: 'Kate Johnson', img: getAvatarImageUrl() },
      ].map((user, index) => (
        <Avatar
          key={index}
          src={user.img}
          fullname={user.name}
          onClick={() => console.log(`Clicked on ${user.name}`)}
          className="hover:scale-110 transition-transform duration-200"
        />
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Gallery of user avatars demonstrating various combinations of images and initials with interactive hover effects.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const avatars = canvas.getAllByRole('button');

    // Test that all avatars are rendered
    expect(avatars).toHaveLength(12);

    // Test interaction with first avatar
    const firstAvatar = avatars[0];
    await userEvent.hover(firstAvatar);
    await userEvent.click(firstAvatar);
  },
};

/**
 * Different background themes
 */
export const ThemeVariations: Story = {
  render: () => (
    <div className="grid grid-cols-1 gap-8">
      <div className="bg-white p-6 rounded-lg">
        <h3 className="mb-4 text-lg font-semibold">Light Theme</h3>
        <div className="flex gap-4">
          <Avatar src={getAvatarImageUrl()} fullname="Light Theme User" />
          <Avatar fullname="Light Initials" />
          <Avatar isLoading />
        </div>
      </div>
      <div className="bg-gray-900 p-6 rounded-lg">
        <h3 className="mb-4 text-lg font-semibold text-white">Dark Theme</h3>
        <div className="flex gap-4">
          <Avatar src={getAvatarImageUrl()} fullname="Dark Theme User" />
          <Avatar fullname="Dark Initials" />
          <Avatar isLoading />
        </div>
      </div>
      <div className="bg-blue-50 p-6 rounded-lg">
        <h3 className="mb-4 text-lg font-semibold text-blue-900">
          Colored Background
        </h3>
        <div className="flex gap-4">
          <Avatar src={getAvatarImageUrl()} fullname="Colored Theme User" />
          <Avatar fullname="Colored Initials" />
          <Avatar isLoading />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Avatar appearance across different background themes and color schemes.',
      },
    },
  },
};

/**
 * Comprehensive test scenario
 */
export const TestScenario: Story = {
  args: {
    src: getAvatarImageUrl(),
    fullname: 'Test User',
    onClick: () => console.log('Test avatar clicked'),
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
    const avatar = canvas.getByRole('button');

    // Test initial state
    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveAttribute('type', 'button');

    // Test accessibility
    expect(avatar).toHaveAttribute('aria-label');
    expect(avatar).toHaveClass('cursor-pointer');

    // Test keyboard navigation
    await userEvent.tab();
    expect(avatar).toHaveFocus();

    // Test click interaction
    await userEvent.click(avatar);
    expect(args.onClick).toHaveBeenCalled();

    // Test hover state
    await userEvent.hover(avatar);
    expect(avatar).toHaveClass('hover:opacity-80');
  },
};
