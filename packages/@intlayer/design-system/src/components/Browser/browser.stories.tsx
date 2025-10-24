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
    height: {
      control: { type: 'number', min: 300, max: 1200, step: 20 },
      description:
        'Height of the browser window (in pixels or CSS string like "80vh")',
      defaultValue: 600,
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
 * Basic browser component with standard height displaying example.com
 */
export const Default: Story = {
  args: {
    initialUrl: 'https://example.com',
    height: 600,
  },
};

/**
 * Custom Height
 * Browser with a smaller viewport height, useful for compact layouts
 */
export const SmallHeight: Story = {
  args: {
    initialUrl: 'https://example.com',
    height: 400,
  },
};

/**
 * Large Height
 * Browser with a larger viewport height, ideal for full content viewing
 */
export const LargeHeight: Story = {
  args: {
    initialUrl: 'https://example.com',
    height: 800,
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
    height: 600,
  },
};

/**
 * Responsive Height
 * Browser using viewport-relative height units for responsive layouts
 */
export const ResponsiveHeight: Story = {
  args: {
    initialUrl: 'https://example.com',
    height: '70vh',
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
    height: 600,
  },
};
