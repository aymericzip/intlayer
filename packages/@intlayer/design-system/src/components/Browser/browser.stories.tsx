import type { Meta, StoryObj } from '@storybook/react';
import { Browser } from './Browser';

/**
 * Browser Component Stories
 *
 * Interactive browser component that renders an iframe with an editable URL bar.
 * Users can view, edit, and navigate to different URLs, making it ideal for embedded browsing,
 * locale switching demonstrations, and content preview.
 */
const meta: Meta<typeof Browser> = {
  title: 'Components/Browser',
  component: Browser,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'A reusable UI component that renders an iframe alongside a display of its current URL. The component allows users to view and edit the URL, which will reload the iframe to the new location. Features include URL validation, automatic protocol addition, reload functionality, error handling, and full accessibility support.',
      },
    },
  },
  argTypes: {
    initialUrl: {
      control: 'text',
      description: 'Initial URL to load in the iframe',
      defaultValue: 'https://example.com',
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description:
        'Size of the browser window: xs (400px), sm (500px), md (600px), lg (800px), xl (1000px)',
      defaultValue: 'md',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes for custom styling',
    },
    'aria-label': {
      control: 'text',
      description: 'ARIA label for accessibility',
      defaultValue: 'Embedded browser',
    },
  },
} satisfies Meta<typeof Browser>;

export default meta;
type Story = StoryObj<typeof Browser>;

/**
 * Default Browser
 * Basic browser component with medium size displaying example.com
 */
export const Default: Story = {
  args: {
    initialUrl: 'https://example.com',
    size: 'md',
  },
};

/**
 * Extra Small Size
 * Browser with extra small size (400px), useful for compact layouts
 */
export const ExtraSmall: Story = {
  args: {
    initialUrl: 'https://example.com',
    size: 'xs',
  },
};

/**
 * Small Size
 * Browser with small size (500px), ideal for sidebars or compact views
 */
export const Small: Story = {
  args: {
    initialUrl: 'https://example.com',
    size: 'sm',
  },
};

/**
 * Large Size
 * Browser with large size (800px), ideal for prominent content viewing
 */
export const Large: Story = {
  args: {
    initialUrl: 'https://example.com',
    size: 'lg',
  },
};

/**
 * Extra Large Size
 * Browser with extra large size (1000px), ideal for full content viewing
 */
export const ExtraLarge: Story = {
  args: {
    initialUrl: 'https://example.com',
    size: 'xl',
  },
};

/**
 * Invalid URL Handling
 * Demonstrates automatic protocol addition - the component will add "https://"
 * to incomplete URLs when the user tries to navigate
 */
export const InvalidUrl: Story = {
  args: {
    initialUrl: 'example.com',
    size: 'md',
  },
};

/**
 * Invalid Format
 * Shows how the component reacts to an invalid URL that cannot be parsed,
 * displaying a custom error message instead of loading the iframe.
 */
export const InvalidFormat: Story = {
  args: {
    initialUrl: '???!!!', // clearly invalid URL to trigger validation error
    size: 'md',
  },
};
