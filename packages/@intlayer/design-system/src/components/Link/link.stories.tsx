import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';
import { Home, Settings, User } from 'lucide-react';
import { Link, LinkColor, LinkUnderlined, LinkVariant } from './Link';

/**
 * Link Component Stories
 *
 * A versatile link component that handles both internal and external navigation
 * with comprehensive internationalization support and multiple visual variants.
 *
 * ## Key Features
 * - **Multiple Variants**: Default, invisible, button, outlined button, and hoverable styles
 * - **Color Themes**: Comprehensive color palette for different contexts and meanings
 * - **External Link Detection**: Automatic detection and handling of external URLs
 * - **Internationalization**: Built-in support for localized URLs via Intlayer
 * - **Security**: Automatic security attributes for external links
 * - **Accessibility**: Full ARIA support with proper labels and current page indication
 * - **Visual Feedback**: Hover effects, underline options, and active states
 *
 * ## When to Use
 * - Navigation within applications (internal links)
 * - External links to other websites with security measures
 * - Button-styled links for call-to-action scenarios
 * - Subtle hoverable links for navigation menus
 * - Multi-language website navigation with automatic URL localization
 */
const meta = {
  title: 'Components/Link',
  component: Link,
  parameters: {
    docs: {
      description: {
        component: `
A comprehensive link component that provides secure navigation with internationalization support and multiple visual styles.

### Navigation Types:
- **Internal Links**: Application navigation with optional locale-aware URL generation
- **External Links**: Secure external navigation with automatic security attributes
- **Button Links**: Call-to-action links styled as buttons
- **Navigation Links**: Subtle links for menus and navigation systems

### Security Features:
External links automatically receive security attributes:
- \`rel="noopener noreferrer nofollow"\` prevents security vulnerabilities
- \`target="_blank"\` opens in new tab/window
- Visual external link icon for user clarity

### Internationalization:
When used with Intlayer, the component automatically:
- Localizes internal URLs based on current or specified locale
- Sets appropriate \`hrefLang\` attributes for SEO
- Maintains proper URL structure for multi-language sites

### Accessibility Features:
- **ARIA Labels**: Required labels for screen reader context
- **Current Page**: \`aria-current\` support for active navigation states
- **Keyboard Navigation**: Full keyboard support with focus indicators
- **Screen Readers**: Proper announcements for external links and active states
- **Focus Management**: Clear focus indicators with proper contrast

### Visual Variants:
- **Default**: Standard underlined links with hover effects
- **Invisible**: Clean links without underlines for subtle navigation
- **Button**: Solid button styling for prominent call-to-action links
- **Button Outlined**: Bordered button styling for secondary actions
- **Hoverable**: Subtle background hover effects for menu items
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
            id: 'link-name',
            enabled: true,
          },
        ],
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      description: 'Content displayed inside the link',
      control: 'text',
    },
    href: {
      description: 'URL or path to navigate to',
      control: 'text',
    },
    label: {
      description: "Accessible label describing the link's purpose (required)",
      control: 'text',
    },
    variant: {
      description: 'Visual style variant of the link',
      control: 'select',
      options: Object.values(LinkVariant),
    },
    color: {
      description: 'Color theme for the link',
      control: 'select',
      options: Object.values(LinkColor),
    },
    underlined: {
      description: 'Underline visibility option',
      control: 'select',
      options: Object.values(LinkUnderlined),
    },
    isExternalLink: {
      description:
        'Override external link detection (auto-detected if undefined)',
      control: 'boolean',
    },
    isActive: {
      description: 'Whether this link represents the current page',
      control: 'boolean',
    },
    locale: {
      description: 'Locale for URL internationalization',
      control: 'select',
      options: ['en', 'fr', 'es', 'de'],
    },
    className: {
      description: 'Additional CSS classes',
      control: 'text',
    },
  },
} satisfies Meta<typeof Link>;

export default meta;
type Story = StoryObj<typeof Link>;

/**
 * ## Basic Examples
 *
 * These stories demonstrate the core functionality and common usage patterns
 * of the Link component.
 */

/**
 * ### Default Link
 *
 * The basic link with default styling. Shows standard underline behavior
 * and hover effects for internal navigation.
 */
export const Default: Story = {
  args: {
    children: 'Default Link',
    href: '/example',
    label: 'Navigate to example page',
    variant: LinkVariant.DEFAULT,
    color: LinkColor.PRIMARY,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const link = canvas.getByRole('link', {
      name: /navigate to example page/i,
    });

    // Test initial state
    await expect(link).toBeInTheDocument();
    await expect(link).toHaveAttribute('href', '/example');
    await expect(link).toHaveAttribute(
      'aria-label',
      'Navigate to example page'
    );
    await expect(link).not.toHaveAttribute('target', '_blank');

    // Test accessibility
    await expect(link).toHaveAccessibleName('Navigate to example page');
  },
};

/**
 * ### External Link
 *
 * Link to an external website with automatic security attributes and visual indicator.
 */
export const External: Story = {
  args: {
    children: 'Visit Intlayer',
    href: 'https://intlayer.org',
    label: 'Visit Intlayer official website',
    variant: LinkVariant.DEFAULT,
    color: LinkColor.PRIMARY,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const link = canvas.getByRole('link', {
      name: /visit intlayer official website/i,
    });

    // Test external link attributes
    await expect(link).toHaveAttribute('href', 'https://intlayer.org');
    await expect(link).toHaveAttribute('target', '_blank');
    await expect(link).toHaveAttribute('rel', 'noopener noreferrer nofollow');

    // Test external link icon is present
    const externalIcon = canvas.getByRole('img', { hidden: true });
    await expect(externalIcon).toBeInTheDocument();
  },
};

/**
 * ### All Variants
 *
 * Showcase of all available link variants to demonstrate visual differences.
 */
export const AllVariants: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4 items-center">
        <Link
          href="/default"
          variant={LinkVariant.DEFAULT}
          color={LinkColor.PRIMARY}
          label="Default variant link"
        >
          Default
        </Link>
        <Link
          href="/invisible"
          variant={LinkVariant.INVISIBLE_LINK}
          color={LinkColor.PRIMARY}
          label="Invisible variant link"
        >
          Invisible
        </Link>
        <Link
          href="/button"
          variant={LinkVariant.BUTTON}
          color={LinkColor.PRIMARY}
          label="Button variant link"
        >
          Button
        </Link>
        <Link
          href="/outlined"
          variant={LinkVariant.BUTTON_OUTLINED}
          color={LinkColor.PRIMARY}
          label="Outlined button variant link"
        >
          Outlined
        </Link>
        <Link
          href="/hoverable"
          variant={LinkVariant.HOVERABLE}
          color={LinkColor.PRIMARY}
          label="Hoverable variant link"
        >
          Hoverable
        </Link>
      </div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const links = canvas.getAllByRole('link');

    // Test all variants are present
    await expect(links).toHaveLength(5);

    // Test each variant has proper attributes
    for (const link of links) {
      await expect(link).toHaveAccessibleName();
      await expect(link).toHaveAttribute('href');
      await expect(link).not.toHaveAttribute('target', '_blank');
    }
  },
};

/**
 * ### Color Themes
 *
 * Available color themes for different contexts and semantic meanings.
 */
export const ColorThemes: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4 max-w-2xl">
      {Object.values(LinkColor)
        .filter((color) => color !== LinkColor.CUSTOM)
        .map((color) => (
          <div key={color} className="space-y-2">
            <h4 className="text-sm font-medium capitalize">
              {color.replace('_', ' ')}
            </h4>
            <div className="flex gap-3">
              <Link
                href={`/${color}`}
                color={color}
                variant={LinkVariant.DEFAULT}
                label={`${color} default link`}
              >
                Default
              </Link>
              <Link
                href={`/${color}-button`}
                color={color}
                variant={LinkVariant.BUTTON}
                label={`${color} button link`}
              >
                Button
              </Link>
            </div>
          </div>
        ))}
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const links = canvas.getAllByRole('link');

    // Should have 2 links per color (excluding CUSTOM)
    const colorCount = Object.values(LinkColor).filter(
      (c) => c !== LinkColor.CUSTOM
    ).length;
    const expectedCount = colorCount * 2;
    await expect(links).toHaveLength(expectedCount);

    // Test accessibility
    for (const link of links) {
      await expect(link).toHaveAccessibleName();
    }
  },
};

/**
 * ## Interactive States
 *
 * Stories demonstrating different interactive states and behaviors.
 */

/**
 * ### Active/Current Page
 *
 * Link representing the current page with active state styling.
 */
export const ActiveState: Story = {
  args: {
    children: 'Current Page',
    href: '/current',
    label: 'Current page link',
    isActive: true,
    variant: LinkVariant.HOVERABLE,
    color: LinkColor.PRIMARY,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const link = canvas.getByRole('link', { name: /current page link/i });

    // Test active state
    await expect(link).toHaveAttribute('aria-current', 'page');
    await expect(link).toHaveAccessibleName('Current page link');
  },
};

/**
 * ### Underline Variations
 *
 * Different underline styles for various design requirements.
 */
export const UnderlineVariations: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <h4 className="font-medium">Default Underline Behavior</h4>
        <Link
          href="/default-underline"
          underlined={LinkUnderlined.DEFAULT}
          label="Default underline behavior"
        >
          Default (varies by variant)
        </Link>
      </div>

      <div className="space-y-2">
        <h4 className="font-medium">Always Underlined</h4>
        <Link
          href="/always-underlined"
          underlined={LinkUnderlined.TRUE as any}
          variant={LinkVariant.INVISIBLE_LINK}
          label="Always underlined link"
        >
          Always underlined
        </Link>
      </div>

      <div className="space-y-2">
        <h4 className="font-medium">Never Underlined</h4>
        <Link
          href="/never-underlined"
          underlined={LinkUnderlined.FALSE as any}
          variant={LinkVariant.DEFAULT}
          label="Never underlined link"
        >
          Never underlined
        </Link>
      </div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const links = canvas.getAllByRole('link');

    await expect(links).toHaveLength(3);

    // Test each link has proper accessibility
    for (const link of links) {
      await expect(link).toHaveAccessibleName();
      await expect(link).toHaveAttribute('href');
    }
  },
};

/**
 * ## Navigation Patterns
 *
 * Stories showing common navigation patterns and usage scenarios.
 */

/**
 * ### Navigation Menu
 *
 * Typical navigation menu with hoverable links and active state.
 */
export const NavigationMenu: Story = {
  render: () => (
    <nav className="bg-gray-50 p-4 rounded-lg">
      <div className="flex space-x-6">
        <Link
          href="/"
          variant={LinkVariant.HOVERABLE}
          color={LinkColor.TEXT}
          label="Go to home page"
          isActive={true}
          className="px-3 py-2"
        >
          <Home className="w-4 h-4 inline mr-2" />
          Home
        </Link>
        <Link
          href="/dashboard"
          variant={LinkVariant.HOVERABLE}
          color={LinkColor.TEXT}
          label="Go to dashboard"
          className="px-3 py-2"
        >
          Dashboard
        </Link>
        <Link
          href="/profile"
          variant={LinkVariant.HOVERABLE}
          color={LinkColor.TEXT}
          label="Go to user profile"
          className="px-3 py-2"
        >
          <User className="w-4 h-4 inline mr-2" />
          Profile
        </Link>
        <Link
          href="/settings"
          variant={LinkVariant.HOVERABLE}
          color={LinkColor.TEXT}
          label="Go to settings page"
          className="px-3 py-2"
        >
          <Settings className="w-4 h-4 inline mr-2" />
          Settings
        </Link>
      </div>
    </nav>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const nav = canvas.getByRole('navigation');
    const links = canvas.getAllByRole('link');

    await expect(nav).toBeInTheDocument();
    await expect(links).toHaveLength(4);

    // Test active link
    const homeLink = canvas.getByRole('link', { name: /go to home page/i });
    await expect(homeLink).toHaveAttribute('aria-current', 'page');

    // Test navigation interaction
    const dashboardLink = canvas.getByRole('link', {
      name: /go to dashboard/i,
    });
    await userEvent.hover(dashboardLink);
  },
};

/**
 * ### Call-to-Action Links
 *
 * Button-styled links for prominent actions and conversions.
 */
export const CallToAction: Story = {
  render: () => (
    <div className="space-y-6 p-6 bg-gray-50 rounded-lg max-w-md">
      <div className="text-center space-y-4">
        <h3 className="text-xl font-semibold">Ready to Get Started?</h3>
        <p className="text-gray-600">
          Join thousands of users who trust our platform for their projects.
        </p>

        <div className="space-y-3">
          <Link
            href="/signup"
            variant={LinkVariant.BUTTON}
            color={LinkColor.PRIMARY}
            label="Sign up for free account"
            className="w-full"
          >
            Start Free Trial
          </Link>

          <Link
            href="/demo"
            variant={LinkVariant.BUTTON_OUTLINED}
            color={LinkColor.PRIMARY}
            label="Watch product demo"
            className="w-full"
          >
            Watch Demo
          </Link>

          <Link
            href="/pricing"
            variant={LinkVariant.INVISIBLE_LINK}
            color={LinkColor.TEXT}
            label="View pricing information"
            className="text-sm"
          >
            View Pricing →
          </Link>
        </div>
      </div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const links = canvas.getAllByRole('link');

    await expect(links).toHaveLength(3);

    // Test CTA buttons
    const signupLink = canvas.getByRole('link', {
      name: /sign up for free account/i,
    });
    const demoLink = canvas.getByRole('link', { name: /watch product demo/i });

    await expect(signupLink).toBeInTheDocument();
    await expect(demoLink).toBeInTheDocument();

    // Test interaction
    await userEvent.hover(signupLink);
  },
};

/**
 * ### Footer Links
 *
 * Typical footer link patterns with external resources.
 */
export const FooterLinks: Story = {
  render: () => (
    <footer className="bg-gray-900 text-white p-6 rounded-lg">
      <div className="grid grid-cols-3 gap-6">
        <div>
          <h4 className="font-semibold mb-3">Company</h4>
          <div className="space-y-2">
            <Link
              href="/about"
              variant={LinkVariant.INVISIBLE_LINK}
              color={LinkColor.LIGHT}
              label="Learn about our company"
              className="block text-sm"
            >
              About Us
            </Link>
            <Link
              href="/careers"
              variant={LinkVariant.INVISIBLE_LINK}
              color={LinkColor.LIGHT}
              label="View career opportunities"
              className="block text-sm"
            >
              Careers
            </Link>
            <Link
              href="/contact"
              variant={LinkVariant.INVISIBLE_LINK}
              color={LinkColor.LIGHT}
              label="Contact our team"
              className="block text-sm"
            >
              Contact
            </Link>
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Resources</h4>
          <div className="space-y-2">
            <Link
              href="/docs"
              variant={LinkVariant.INVISIBLE_LINK}
              color={LinkColor.LIGHT}
              label="View documentation"
              className="block text-sm"
            >
              Documentation
            </Link>
            <Link
              href="https://github.com/intlayer/intlayer"
              variant={LinkVariant.INVISIBLE_LINK}
              color={LinkColor.LIGHT}
              label="View source code on GitHub"
              className="block text-sm"
            >
              GitHub
            </Link>
            <Link
              href="/api"
              variant={LinkVariant.INVISIBLE_LINK}
              color={LinkColor.LIGHT}
              label="API reference"
              className="block text-sm"
            >
              API Reference
            </Link>
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Legal</h4>
          <div className="space-y-2">
            <Link
              href="/privacy"
              variant={LinkVariant.INVISIBLE_LINK}
              color={LinkColor.LIGHT}
              label="Privacy policy"
              className="block text-sm"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              variant={LinkVariant.INVISIBLE_LINK}
              color={LinkColor.LIGHT}
              label="Terms of service"
              className="block text-sm"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const footer = canvas.getByRole('contentinfo');
    const links = canvas.getAllByRole('link');

    await expect(footer).toBeInTheDocument();
    await expect(links.length).toBeGreaterThan(8);

    // Test external link (GitHub)
    const githubLink = canvas.getByRole('link', {
      name: /view source code on github/i,
    });
    await expect(githubLink).toHaveAttribute('target', '_blank');
    await expect(githubLink).toHaveAttribute(
      'rel',
      'noopener noreferrer nofollow'
    );
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
 * Testing keyboard accessibility and focus management across multiple links.
 */
export const KeyboardNavigation: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="text-sm text-gray-600 mb-4">
        Use Tab to navigate between links, Enter to activate them.
      </div>
      <div className="space-y-3">
        <Link
          href="/first"
          label="First link in sequence"
          color={LinkColor.PRIMARY}
        >
          First Link
        </Link>
        <Link
          href="/second"
          variant={LinkVariant.BUTTON}
          color={LinkColor.SECONDARY}
          label="Second link in sequence"
        >
          Second Link (Button)
        </Link>
        <Link
          href="https://example.com"
          variant={LinkVariant.BUTTON_OUTLINED}
          color={LinkColor.PRIMARY}
          label="Third link - external"
        >
          External Link
        </Link>
        <Link
          href="/fourth"
          variant={LinkVariant.HOVERABLE}
          isActive={true}
          color={LinkColor.PRIMARY}
          label="Fourth link - current page"
        >
          Current Page
        </Link>
      </div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const links = canvas.getAllByRole('link');

    await expect(links).toHaveLength(4);

    // Test keyboard navigation
    const firstLink = links[0];
    await userEvent.click(firstLink);
    await expect(firstLink).toHaveFocus();

    // Tab through links
    await userEvent.keyboard('{Tab}');
    await expect(links[1]).toHaveFocus();

    await userEvent.keyboard('{Tab}');
    await expect(links[2]).toHaveFocus();

    // Test external link attributes
    const externalLink = links[2];
    await expect(externalLink).toHaveAttribute('target', '_blank');

    // Test active link
    const activeLink = links[3];
    await expect(activeLink).toHaveAttribute('aria-current', 'page');
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
      <div className="text-sm text-gray-700 mb-4">
        Screen readers will announce link purposes, external link warnings, and
        current page status appropriately.
      </div>

      <div className="space-y-4">
        <div>
          <h4 className="font-medium mb-2">Internal Navigation</h4>
          <Link
            href="/dashboard"
            label="Navigate to user dashboard to manage account settings"
            variant={LinkVariant.DEFAULT}
          >
            Dashboard
          </Link>
        </div>

        <div>
          <h4 className="font-medium mb-2">External Resource</h4>
          <Link
            href="https://developer.mozilla.org"
            label="Visit MDN Web Docs - opens in new window"
            variant={LinkVariant.DEFAULT}
          >
            MDN Web Docs
          </Link>
        </div>

        <div>
          <h4 className="font-medium mb-2">Current Page Indicator</h4>
          <Link
            href="/accessibility"
            label="Accessibility guide - you are currently on this page"
            isActive={true}
            variant={LinkVariant.HOVERABLE}
          >
            Accessibility Guide
          </Link>
        </div>

        <div>
          <h4 className="font-medium mb-2">Action Links</h4>
          <div className="flex gap-3">
            <Link
              href="/download"
              label="Download the application installer file"
              variant={LinkVariant.BUTTON}
              color={LinkColor.SUCCESS}
            >
              Download
            </Link>
            <Link
              href="/delete-account"
              label="Permanently delete your account - this action cannot be undone"
              variant={LinkVariant.BUTTON}
              color={LinkColor.ERROR}
            >
              Delete Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test descriptive labels
    const dashboardLink = canvas.getByRole('link', {
      name: /navigate to user dashboard to manage account settings/i,
    });
    await expect(dashboardLink).toBeInTheDocument();

    // Test external link
    const mdnLink = canvas.getByRole('link', {
      name: /visit mdn web docs - opens in new window/i,
    });
    await expect(mdnLink).toHaveAttribute('target', '_blank');

    // Test current page
    const activeLink = canvas.getByRole('link', {
      name: /accessibility guide - you are currently on this page/i,
    });
    await expect(activeLink).toHaveAttribute('aria-current', 'page');

    // Test action buttons with clear intent
    const downloadLink = canvas.getByRole('link', {
      name: /download the application installer file/i,
    });
    const deleteLink = canvas.getByRole('link', {
      name: /permanently delete your account - this action cannot be undone/i,
    });

    await expect(downloadLink).toBeInTheDocument();
    await expect(deleteLink).toBeInTheDocument();
  },
};
