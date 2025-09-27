import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Button, ButtonColor, ButtonSize, ButtonVariant } from '../Button';
import { Container } from '../Container';
import { H3 } from '../Headers';
import { Navbar } from './index';

/**
 * Navbar Component Stories
 *
 * Responsive navigation component that automatically switches between desktop and mobile layouts.
 * Features comprehensive navigation structure with flexible content areas and scroll-aware behavior.
 */
const meta: Meta<typeof Navbar> = {
  title: 'Components/Navbar',
  component: Navbar,
  parameters: {
    docs: {
      description: {
        component:
          'A responsive navigation component with automatic desktop/mobile switching, flexible content areas, and modern design patterns.',
      },
    },
    layout: 'fullscreen',
  },
  argTypes: {
    selectedChoice: {
      control: 'text',
      description: 'Currently selected navigation tab key',
    },
    logo: {
      description: 'Logo component or element to display',
    },
    desktopSections: {
      description: 'Navigation sections for desktop layout',
    },
    mobileTopSections: {
      description: 'Top navigation sections for mobile layout',
    },
    mobileBottomSections: {
      description: 'Bottom navigation sections for mobile layout',
    },
    rightItemsDesktop: {
      description: 'Right-aligned items for desktop',
    },
    rightItemsMobile: {
      description: 'Right-aligned items for mobile',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Navbar>;

/**
 * Mock navigation data for stories
 */
const mockNavSections = [
  { key: 'home', label: 'Home', href: '/' },
  { key: 'products', label: 'Products', href: '/products' },
  { key: 'about', label: 'About', href: '/about' },
  { key: 'contact', label: 'Contact', href: '/contact' },
];

const mockUtilityNavSections = [
  { key: 'support', label: 'Support', href: '/support' },
  { key: 'docs', label: 'Documentation', href: '/docs' },
  { key: 'blog', label: 'Blog', href: '/blog' },
];

/**
 * Mock components for story demonstration
 */
const MockLogo = () => (
  <div className="flex items-center gap-2">
    <div className="h-8 w-8 rounded bg-primary"></div>
    <span className="font-bold">Brand</span>
  </div>
);

const MockRightItems = () => (
  <>
    <Button
      size={ButtonSize.SM}
      variant={ButtonVariant.OUTLINE}
      label="Sign In"
    >
      Sign In
    </Button>
    <Button size={ButtonSize.SM} color={ButtonColor.PRIMARY} label="Sign Up">
      Sign Up
    </Button>
  </>
);

const MockSearchBar = () => (
  <Container className="w-full max-w-md">
    <input
      type="search"
      placeholder="Search..."
      className="w-full rounded border border-neutral-300 px-3 py-2 text-sm"
    />
  </Container>
);

const MockUserProfile = () => (
  <Container className="text-center">
    <div className="mx-auto mb-2 h-12 w-12 rounded-full bg-primary"></div>
    <p className="text-sm font-medium">John Doe</p>
    <p className="text-xs text-neutral-600">john@example.com</p>
  </Container>
);

/**
 * Interactive story wrapper for navbar demonstration
 */
const NavbarStory = (args: any) => {
  const [selectedChoice, setSelectedChoice] = useState(
    args.selectedChoice || 'home'
  );

  // Convert mock data to tab elements
  const createTabElements = (sections: typeof mockNavSections) =>
    sections.map((section) => (
      <div
        key={section.key}
        role="tab"
        tabIndex={selectedChoice === section.key ? 0 : -1}
        className={`cursor-pointer px-3 py-2 text-sm font-medium transition-colors ${
          selectedChoice === section.key
            ? 'text-primary'
            : 'text-neutral-700 hover:text-primary'
        }`}
        onClick={() => setSelectedChoice(section.key)}
      >
        {section.label}
      </div>
    ));

  return (
    <div className="min-h-screen bg-background">
      <Navbar
        {...args}
        selectedChoice={selectedChoice}
        desktopSections={createTabElements(mockNavSections)}
        mobileTopSections={createTabElements(mockNavSections)}
      />

      {/* Demo content */}
      <Container className="p-8">
        <H3>Navbar Demo Page</H3>
        <p className="mt-4 text-neutral-600">
          This is demo content to show the navbar in context. The navbar will
          automatically switch between desktop and mobile layouts based on
          screen size.
        </p>
        <p className="mt-2 text-sm text-neutral-500">
          Current selection: <strong>{selectedChoice}</strong>
        </p>

        <div className="mt-8 space-y-4">
          <p>
            <strong>Desktop behavior (≥1024px):</strong> Horizontal layout with
            center navigation and right-aligned utility items.
          </p>
          <p>
            <strong>Mobile behavior (&lt;1024px):</strong> Collapsible hamburger
            menu with full-screen overlay, scroll-aware hiding/showing.
          </p>
        </div>

        {/* Add some scroll content */}
        <div className="mt-16 space-y-8">
          {Array.from({ length: 10 }, (_, i) => (
            <div key={i} className="rounded border border-neutral-200 p-6">
              <H3>Content Section {i + 1}</H3>
              <p className="mt-2 text-neutral-600">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam.
              </p>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

/**
 * Story wrapper with bottom sections for mobile
 */
const NavbarWithBottomSectionsStory = (args: any) => {
  const [selectedChoice, setSelectedChoice] = useState(
    args.selectedChoice || 'home'
  );

  // Convert mock data to tab elements
  const createTabElements = (sections: typeof mockNavSections) =>
    sections.map((section) => (
      <div
        key={section.key}
        role="tab"
        tabIndex={selectedChoice === section.key ? 0 : -1}
        className={`cursor-pointer px-3 py-2 text-sm font-medium transition-colors ${
          selectedChoice === section.key
            ? 'text-primary'
            : 'text-neutral-700 hover:text-primary'
        }`}
        onClick={() => setSelectedChoice(section.key)}
      >
        {section.label}
      </div>
    ));

  return (
    <div className="min-h-screen bg-background">
      <Navbar
        {...args}
        selectedChoice={selectedChoice}
        desktopSections={createTabElements(mockNavSections)}
        mobileTopSections={createTabElements(mockNavSections)}
        mobileBottomSections={createTabElements(mockUtilityNavSections)}
      />

      {/* Demo content */}
      <Container className="p-8">
        <H3>Navbar with Mobile Content Areas</H3>
        <p className="mt-4 text-neutral-600">
          This story shows a navbar with additional content areas in the mobile
          menu. The mobile view includes search bar at the top and user profile
          at the bottom.
        </p>
        <p className="mt-2 text-sm text-neutral-500">
          Current selection: <strong>{selectedChoice}</strong>
        </p>
      </Container>
    </div>
  );
};

/**
 * Basic Navbar
 * Simple navbar with logo, navigation sections, and right items
 */
export const Basic: Story = {
  render: NavbarStory,
  args: {
    logo: <MockLogo />,
    selectedChoice: 'home',
    rightItemsDesktop: <MockRightItems />,
    rightItemsMobile: <MockRightItems />,
  },
};

/**
 * With Mobile Content Areas
 * Navbar featuring additional content in mobile top and bottom areas
 */
export const WithMobileContent: Story = {
  render: NavbarWithBottomSectionsStory,
  args: {
    logo: <MockLogo />,
    selectedChoice: 'products',
    rightItemsDesktop: <MockRightItems />,
    rightItemsMobile: <MockRightItems />,
    mobileTopChildren: <MockSearchBar />,
    mobileBottomChildren: <MockUserProfile />,
  },
};

/**
 * Logo Only
 * Minimal navbar with only logo, useful for auth pages or landing pages
 */
export const LogoOnly: Story = {
  render: NavbarStory,
  args: {
    logo: <MockLogo />,
    selectedChoice: 'home',
    desktopSections: [],
    mobileTopSections: [],
  },
};

/**
 * Extensive Navigation
 * Navbar with many navigation items to test overflow behavior
 */
export const ExtensiveNavigation: Story = {
  render: (args: any) => {
    const [selectedChoice, setSelectedChoice] = useState('home');

    const extensiveNavSections = [
      { key: 'home', label: 'Home', href: '/' },
      { key: 'products', label: 'Products', href: '/products' },
      { key: 'solutions', label: 'Solutions', href: '/solutions' },
      { key: 'pricing', label: 'Pricing', href: '/pricing' },
      { key: 'resources', label: 'Resources', href: '/resources' },
      { key: 'company', label: 'Company', href: '/company' },
      { key: 'support', label: 'Support', href: '/support' },
      { key: 'contact', label: 'Contact', href: '/contact' },
    ];

    const createTabElements = (sections: typeof extensiveNavSections) =>
      sections.map((section) => (
        <div
          key={section.key}
          role="tab"
          className={`cursor-pointer px-3 py-2 text-sm font-medium transition-colors ${
            selectedChoice === section.key
              ? 'text-primary'
              : 'text-neutral-700 hover:text-primary'
          }`}
          onClick={() => setSelectedChoice(section.key)}
        >
          {section.label}
        </div>
      ));

    return (
      <div className="min-h-screen bg-background">
        <Navbar
          {...args}
          selectedChoice={selectedChoice}
          desktopSections={createTabElements(extensiveNavSections)}
          mobileTopSections={createTabElements(extensiveNavSections)}
        />

        <Container className="p-8">
          <H3>Extensive Navigation Demo</H3>
          <p className="mt-4 text-neutral-600">
            This example shows how the navbar handles many navigation items. On
            desktop, horizontal scrolling is available if items overflow. On
            mobile, all items are displayed in the expandable menu.
          </p>
          <p className="mt-2 text-sm text-neutral-500">
            Current selection: <strong>{selectedChoice}</strong>
          </p>
        </Container>
      </div>
    );
  },
  args: {
    logo: <MockLogo />,
    rightItemsDesktop: <MockRightItems />,
    rightItemsMobile: <MockRightItems />,
  },
};

/**
 * Custom Styling
 * Navbar with custom logo and themed elements
 */
export const CustomStyling: Story = {
  render: NavbarStory,
  args: {
    logo: (
      <div className="flex items-center gap-2">
        <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600"></div>
        <div>
          <div className="text-lg font-bold">CustomBrand</div>
          <div className="text-xs text-neutral-500">tagline</div>
        </div>
      </div>
    ),
    selectedChoice: 'about',
    rightItemsDesktop: (
      <div className="flex items-center gap-3">
        <div className="rounded-full bg-yellow-100 p-2">
          <div className="h-4 w-4 rounded-full bg-yellow-500"></div>
        </div>
        <Button
          size={ButtonSize.SM}
          color={ButtonColor.SECONDARY}
          label="Get Started"
        >
          Get Started
        </Button>
      </div>
    ),
    rightItemsMobile: (
      <div className="rounded-full bg-yellow-100 p-2">
        <div className="h-4 w-4 rounded-full bg-yellow-500"></div>
      </div>
    ),
  },
};

/**
 * Responsive Behavior Test
 * Story specifically designed to test responsive switching behavior
 */
export const ResponsiveBehavior: Story = {
  render: NavbarStory,
  args: {
    logo: <MockLogo />,
    selectedChoice: 'products',
    rightItemsDesktop: <MockRightItems />,
    rightItemsMobile: <MockRightItems />,
    mobileTopChildren: (
      <Container className="border-l-4 border-primary bg-primary/5 p-3">
        <p className="text-sm">
          📱 <strong>Mobile View:</strong> This content only appears in the
          mobile menu
        </p>
      </Container>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          'Resize your browser or use device emulation to test the responsive switching between desktop and mobile layouts. Notice how content adapts automatically.',
      },
    },
  },
};
