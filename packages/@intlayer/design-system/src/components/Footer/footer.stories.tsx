import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';
import { Footer, type FooterLink } from '.';

const meta: Meta<typeof Footer> = {
  title: 'Components/Footer',
  component: Footer,
  tags: ['autodocs'],
  argTypes: {
    links: {
      description: 'Array of link groups to display in the footer',
      control: 'object',
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'A comprehensive footer component with Intlayer branding, social links, and organized navigation groups. Responsive design for all screen sizes.',
      },
    },
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Footer>;

export default meta;
type Story = StoryObj<typeof meta>;

// Sample data for stories
const sampleProductLinks: FooterLink[] = [
  {
    href: '/features',
    text: 'Features',
    label: 'Product features and capabilities',
  },
  { href: '/pricing', text: 'Pricing', label: 'Pricing plans and options' },
  {
    href: '/documentation',
    text: 'Documentation',
    label: 'Technical documentation',
  },
  {
    href: '/api',
    text: 'API Reference',
    label: 'API documentation and reference',
  },
  { href: '/examples', text: 'Examples', label: 'Code examples and tutorials' },
];

const sampleCompanyLinks: FooterLink[] = [
  { href: '/about', text: 'About Us', label: 'About Intlayer company' },
  { href: '/careers', text: 'Careers', label: 'Job opportunities at Intlayer' },
  { href: '/blog', text: 'Blog', label: 'Company blog and updates' },
  { href: '/press', text: 'Press', label: 'Press releases and media kit' },
];

const sampleSupportLinks: FooterLink[] = [
  { href: '/help', text: 'Help Center', label: 'Get help and support' },
  { href: '/contact', text: 'Contact Us', label: 'Contact support team' },
  { href: '/community', text: 'Community', label: 'Join our community' },
  { href: '/status', text: 'Status Page', label: 'Service status and uptime' },
];

const sampleLegalLinks: FooterLink[] = [
  {
    href: '/privacy',
    text: 'Privacy Policy',
    label: 'Privacy policy and data handling',
  },
  { href: '/terms', text: 'Terms of Service', label: 'Terms and conditions' },
  { href: '/cookies', text: 'Cookie Policy', label: 'Cookie usage policy' },
  {
    href: '/security',
    text: 'Security',
    label: 'Security practices and policies',
  },
];

// Basic Examples
export const Default: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story:
          'The basic footer with just the Intlayer branding, copyright, and social networks.',
      },
    },
  },
};

export const WithSingleGroup: Story = {
  args: {
    links: [
      {
        title: 'Product',
        links: sampleProductLinks,
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Footer with a single group of navigation links.',
      },
    },
  },
};

export const WithMultipleGroups: Story = {
  args: {
    links: [
      {
        title: 'Product',
        links: sampleProductLinks,
      },
      {
        title: 'Company',
        links: sampleCompanyLinks,
      },
      {
        title: 'Support',
        links: sampleSupportLinks,
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Footer with multiple groups of organized navigation links.',
      },
    },
  },
};

export const ComprehensiveFooter: Story = {
  args: {
    links: [
      {
        title: 'Product',
        links: sampleProductLinks,
      },
      {
        title: 'Company',
        links: sampleCompanyLinks,
      },
      {
        title: 'Support',
        links: sampleSupportLinks,
      },
      {
        title: 'Legal',
        links: sampleLegalLinks,
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          'A complete footer with all typical website sections including product, company, support, and legal links.',
      },
    },
  },
};

// Custom Content Examples
export const WithJSXTitles: Story = {
  args: {
    links: [
      {
        title: (
          <span className="flex items-center gap-2">
            🚀 <span>Product</span>
          </span>
        ),
        links: [
          {
            href: '/features',
            text: '✨ Features',
            label: 'Product features with sparkle emoji',
          },
          {
            href: '/pricing',
            text: '💰 Pricing',
            label: 'Pricing with money emoji',
          },
        ],
      },
      {
        title: <span className="font-bold text-blue-600">Company</span>,
        links: [
          { href: '/about', text: 'About Us', label: 'About the company' },
          {
            href: '/careers',
            text: "We're Hiring! 👋",
            label: 'Career opportunities',
          },
        ],
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          'Footer with custom JSX content in titles and link text, including emojis and styling.',
      },
    },
  },
};

export const WithInteractiveLinks: Story = {
  args: {
    links: [
      {
        title: 'Actions',
        links: [
          {
            href: '#newsletter',
            text: 'Subscribe to Newsletter',
            label: 'Subscribe to our newsletter',
            onClick: () => alert('Newsletter subscription clicked!'),
          },
          {
            href: '#demo',
            text: 'Request Demo',
            label: 'Request a product demo',
            onClick: () => alert('Demo request clicked!'),
          },
          {
            href: '#feedback',
            text: 'Give Feedback',
            label: 'Provide product feedback',
            onClick: () => alert('Feedback form opened!'),
          },
        ],
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          'Footer with interactive links that have custom click handlers alongside href navigation.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Find and test interactive links
    const newsletterLink = canvas.getByLabelText('Subscribe to our newsletter');
    const demoLink = canvas.getByLabelText('Request a product demo');

    expect(newsletterLink).toBeInTheDocument();
    expect(demoLink).toBeInTheDocument();

    // Test accessibility attributes
    expect(newsletterLink).toHaveAttribute('href', '#newsletter');
    expect(demoLink).toHaveAttribute('href', '#demo');
  },
};

// Layout and Styling Examples
export const ManyLinksPerGroup: Story = {
  args: {
    links: [
      {
        title: 'Extensive Product Suite',
        links: [
          {
            href: '/i18n',
            text: 'Internationalization',
            label: 'I18n framework',
          },
          { href: '/cms', text: 'Content Management', label: 'CMS features' },
          {
            href: '/ai-translate',
            text: 'AI Translation',
            label: 'AI-powered translation',
          },
          { href: '/analytics', text: 'Analytics', label: 'Usage analytics' },
          {
            href: '/integrations',
            text: 'Integrations',
            label: 'Third-party integrations',
          },
          { href: '/cli', text: 'Command Line Tools', label: 'CLI utilities' },
          {
            href: '/sdk',
            text: 'Software Development Kit',
            label: 'SDK documentation',
          },
          {
            href: '/plugins',
            text: 'Plugins & Extensions',
            label: 'Available plugins',
          },
        ],
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          'Footer with a group containing many links to test layout handling.',
      },
    },
  },
};

export const ManyGroups: Story = {
  args: {
    links: [
      {
        title: 'Frontend',
        links: [{ href: '/react', text: 'React', label: 'React integration' }],
      },
      {
        title: 'Backend',
        links: [{ href: '/node', text: 'Node.js', label: 'Node.js support' }],
      },
      {
        title: 'Mobile',
        links: [
          {
            href: '/react-native',
            text: 'React Native',
            label: 'Mobile development',
          },
        ],
      },
      {
        title: 'Desktop',
        links: [
          {
            href: '/electron',
            text: 'Electron',
            label: 'Desktop applications',
          },
        ],
      },
      {
        title: 'Cloud',
        links: [{ href: '/aws', text: 'AWS', label: 'AWS deployment' }],
      },
      {
        title: 'DevOps',
        links: [
          { href: '/docker', text: 'Docker', label: 'Docker containers' },
        ],
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Footer with many small groups to test responsive grid layout.',
      },
    },
  },
};

// Accessibility Testing
export const AccessibilityTest: Story = {
  args: {
    links: [
      {
        title: 'Accessibility Features',
        links: [
          {
            href: '/a11y',
            text: 'Accessibility Guide',
            label: 'Web accessibility guidelines and best practices',
          },
          {
            href: '/screen-readers',
            text: 'Screen Reader Support',
            label: 'Support for assistive technologies',
          },
          {
            href: '/keyboard',
            text: 'Keyboard Navigation',
            label: 'Keyboard navigation features',
          },
          {
            href: '/contrast',
            text: 'Color Contrast',
            label: 'Color contrast and visibility options',
          },
        ],
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          'Footer designed to test accessibility features including keyboard navigation and screen reader support.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test semantic structure
    const footer = canvas.getByRole('contentinfo');
    expect(footer).toBeInTheDocument();

    // Test all links have proper labels
    const links = canvas.getAllByRole('link');
    links.forEach((link) => {
      expect(link).toHaveAttribute('aria-label');
      expect(link.getAttribute('aria-label')).not.toBe('');
    });

    // Test copyright text
    expect(canvas.getByText('© 2025 Intlayer, Inc.')).toBeInTheDocument();

    // Test keyboard navigation on first link
    if (links.length > 0) {
      await userEvent.tab();
      // Note: We can't easily test focus in Storybook, but we verify the link is focusable
      expect(links[0]).toHaveAttribute('href');
    }
  },
};

// Edge Cases
export const EmptyLinksArray: Story = {
  args: {
    links: [],
  },
  parameters: {
    docs: {
      description: {
        story:
          'Footer with empty links array - shows only branding and social networks.',
      },
    },
  },
};

export const SingleLinkGroup: Story = {
  args: {
    links: [
      {
        title: 'Quick Access',
        links: [
          {
            href: '/dashboard',
            text: 'Dashboard',
            label: 'Access your dashboard',
          },
        ],
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Footer with a group containing only one link.',
      },
    },
  },
};

export const LongLinkText: Story = {
  args: {
    links: [
      {
        title: 'Comprehensive Resources',
        links: [
          {
            href: '/guide',
            text: 'Complete Step-by-Step Implementation Guide for Enterprise Applications',
            label: 'Comprehensive implementation guide for enterprise users',
          },
          {
            href: '/migration',
            text: 'Migration Guide from Legacy Internationalization Solutions to Modern Intlayer Framework',
            label: 'Detailed migration guide for legacy system modernization',
          },
        ],
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          'Footer with very long link text to test text wrapping and layout handling.',
      },
    },
  },
};

// Context Examples
export const ECommerceFooter: Story = {
  args: {
    links: [
      {
        title: 'Shop',
        links: [
          {
            href: '/products',
            text: 'All Products',
            label: 'Browse all products',
          },
          {
            href: '/categories',
            text: 'Categories',
            label: 'Product categories',
          },
          {
            href: '/deals',
            text: 'Deals & Offers',
            label: 'Current deals and special offers',
          },
          {
            href: '/gift-cards',
            text: 'Gift Cards',
            label: 'Purchase gift cards',
          },
        ],
      },
      {
        title: 'Customer Service',
        links: [
          {
            href: '/shipping',
            text: 'Shipping Info',
            label: 'Shipping policies and information',
          },
          {
            href: '/returns',
            text: 'Returns & Exchanges',
            label: 'Return and exchange policies',
          },
          {
            href: '/size-guide',
            text: 'Size Guide',
            label: 'Product sizing information',
          },
          {
            href: '/track-order',
            text: 'Track Your Order',
            label: 'Order tracking system',
          },
        ],
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          'Footer configured for an e-commerce website with shopping and customer service links.',
      },
    },
  },
};

export const SaaSFooter: Story = {
  args: {
    links: [
      {
        title: 'Platform',
        links: [
          { href: '/dashboard', text: 'Dashboard', label: 'User dashboard' },
          {
            href: '/integrations',
            text: 'Integrations',
            label: 'Available integrations',
          },
          {
            href: '/api-docs',
            text: 'API Documentation',
            label: 'Complete API reference',
          },
          {
            href: '/webhooks',
            text: 'Webhooks',
            label: 'Webhook configuration',
          },
        ],
      },
      {
        title: 'Resources',
        links: [
          {
            href: '/tutorials',
            text: 'Tutorials',
            label: 'Step-by-step tutorials',
          },
          {
            href: '/webinars',
            text: 'Webinars',
            label: 'Educational webinars',
          },
          {
            href: '/case-studies',
            text: 'Case Studies',
            label: 'Customer success stories',
          },
          {
            href: '/best-practices',
            text: 'Best Practices',
            label: 'Implementation best practices',
          },
        ],
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          'Footer tailored for a SaaS platform with platform features and educational resources.',
      },
    },
  },
};
