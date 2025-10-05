import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';
import { H1, H2, H3, H4, H5 } from './';

/**
 * Headers Component Stories
 *
 * A collection of semantic heading components (H1-H5) with optional anchor link functionality.
 * These components provide proper content hierarchy with deep-linking capabilities for
 * documentation, articles, and content-heavy pages.
 *
 * ## Key Features
 * - **Semantic HTML**: Proper heading hierarchy with h1-h5 elements
 * - **Anchor Links**: Optional clickable # links for deep linking (H2-H5)
 * - **URL Generation**: Automatic slug generation from heading text
 * - **Smooth Scrolling**: Animated scroll-to-section behavior
 * - **Copy to Clipboard**: Click anchor to copy section URL
 * - **Accessibility**: Proper ARIA labels and keyboard support
 *
 * ## When to Use
 * - Documentation and article content
 * - Blog posts and long-form content
 * - Landing pages with multiple sections
 * - Help pages and knowledge bases
 * - Any content that benefits from section navigation
 */
const meta = {
  title: 'Components/Headers',
  component: H1,
  parameters: {
    docs: {
      description: {
        component: `
A collection of semantic heading components that provide proper content hierarchy and optional deep-linking functionality.

### Component Hierarchy:
- **H1**: Primary page heading (no anchor links)
- **H2**: Major section headers with optional anchors
- **H3**: Subsection headers with optional anchors
- **H4**: Minor section headers with optional anchors
- **H5**: Detailed subsection headers with optional anchors

### Anchor Link Features:
- **Automatic ID Generation**: Creates URL-friendly IDs from heading text
- **Click-to-Copy**: Hover over # symbol and click to copy section URL
- **Smooth Scrolling**: Animated navigation to sections
- **Deep Linking**: Direct URL access to specific content sections
- **Visual Feedback**: Hover effects on anchor symbols

### Accessibility Features:
- **Semantic HTML**: Proper heading hierarchy for screen readers
- **Keyboard Navigation**: Full keyboard support for anchor links
- **ARIA Labels**: Accessible descriptions for interactive elements
- **Focus Management**: Proper focus indicators and navigation
- **Content Structure**: Clear document outline for assistive technologies

### Styling Features:
- **Consistent Typography**: Graduated font sizes and weights
- **Proper Spacing**: Optimized margins for content flow
- **Responsive Design**: Adapts to different screen sizes
- **Custom Styling**: Supports additional CSS classes
        `,
      },
    },
    a11y: {
      config: {
        rules: [
          {
            id: 'heading-order',
            enabled: true,
          },
          {
            id: 'empty-heading',
            enabled: true,
          },
        ],
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      description: 'Text content of the heading',
      control: 'text',
    },
    isClickable: {
      description: 'Whether the heading should have anchor link functionality',
      control: 'boolean',
    },
    className: {
      description: 'Additional CSS classes for custom styling',
      control: 'text',
    },
  },
} satisfies Meta<typeof H1>;

export default meta;
type Story = StoryObj<typeof H1>;

/**
 * ## Basic Examples
 *
 * These stories demonstrate the basic functionality of each heading level
 * with their default styling and behavior.
 */

/**
 * ### All Heading Levels
 *
 * Overview of all available heading components showing the visual hierarchy.
 */
export const AllHeadingLevels: Story = {
  render: () => (
    <div className="space-y-4 p-6">
      <H1>H1 - Primary Page Heading</H1>
      <H2>H2 - Major Section Header</H2>
      <H3>H3 - Subsection Header</H3>
      <H4>H4 - Minor Section Header</H4>
      <H5>H5 - Detailed Subsection Header</H5>

      <div className="mt-8 rounded-lg bg-gray-50 p-4 text-gray-600 text-sm">
        <p className="mb-2 font-medium">Visual Hierarchy:</p>
        <p>
          Each heading level has progressively smaller font size and appropriate
          spacing for content organization.
        </p>
      </div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test that all heading levels are present
    const h1 = canvas.getByRole('heading', { level: 1 });
    const h2 = canvas.getByRole('heading', { level: 2 });
    const h3 = canvas.getByRole('heading', { level: 3 });
    const h4 = canvas.getByRole('heading', { level: 4 });
    const h5 = canvas.getByRole('heading', { level: 5 });

    await expect(h1).toBeInTheDocument();
    await expect(h2).toBeInTheDocument();
    await expect(h3).toBeInTheDocument();
    await expect(h4).toBeInTheDocument();
    await expect(h5).toBeInTheDocument();

    // Test heading hierarchy
    await expect(h1).toHaveTextContent('H1 - Primary Page Heading');
    await expect(h2).toHaveTextContent('H2 - Major Section Header');
    await expect(h3).toHaveTextContent('H3 - Subsection Header');
    await expect(h4).toHaveTextContent('H4 - Minor Section Header');
    await expect(h5).toHaveTextContent('H5 - Detailed Subsection Header');
  },
};

/**
 * ### H1 Primary Heading
 *
 * The main page heading without anchor functionality.
 */
export const H1Primary: Story = {
  args: {
    children: 'Welcome to Our Documentation',
  },
  render: (args) => (
    <div className="p-6">
      <H1 {...args} />
      <p className="mt-4 text-gray-600">
        H1 headings are used for primary page titles and do not include anchor
        link functionality.
      </p>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const heading = canvas.getByRole('heading', { level: 1 });

    await expect(heading).toBeInTheDocument();
    await expect(heading).toHaveTextContent('Welcome to Our Documentation');

    // H1 should not have clickable functionality
    await expect(heading).not.toHaveAttribute('aria-label');
  },
};

/**
 * ## Anchor Link Functionality
 *
 * Stories demonstrating the anchor link features available for H2-H5 headings.
 */

/**
 * ### Clickable Headers with Anchors
 *
 * H2-H5 headings with anchor link functionality enabled.
 */
export const ClickableHeadersWithAnchors: Story = {
  render: () => (
    <div className="space-y-8 p-6">
      <div className="mb-6 rounded-lg bg-blue-50 p-4 text-gray-600 text-sm">
        <p className="mb-2 font-medium">How to use anchor links:</p>
        <ol className="list-inside list-decimal space-y-1">
          <li>Hover over any heading to see the # symbol appear</li>
          <li>Click the # symbol to copy the section URL to clipboard</li>
          <li>The page will scroll smoothly to the section</li>
          <li>The URL will be updated with the section anchor</li>
        </ol>
      </div>

      <H2 isClickable>Getting Started Guide</H2>
      <p className="text-gray-600">
        This is a major section with anchor link functionality. Hover to see the
        anchor link.
      </p>

      <H3 isClickable>Installation Instructions</H3>
      <p className="text-gray-600">
        This subsection also has anchor functionality for easy linking.
      </p>

      <H4 isClickable>Configuration Options</H4>
      <p className="text-gray-600">
        Even minor sections can have anchor links for detailed documentation.
      </p>

      <H5 isClickable>Advanced Settings</H5>
      <p className="text-gray-600">
        The smallest heading level also supports anchor functionality.
      </p>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test that clickable headings have proper attributes
    const h2 = canvas.getByRole('heading', { level: 2 });
    const h3 = canvas.getByRole('heading', { level: 3 });
    const h4 = canvas.getByRole('heading', { level: 4 });
    const h5 = canvas.getByRole('heading', { level: 5 });

    // Test that clickable headings have ARIA labels
    await expect(h2).toHaveAttribute('aria-label');
    await expect(h3).toHaveAttribute('aria-label');
    await expect(h4).toHaveAttribute('aria-label');
    await expect(h5).toHaveAttribute('aria-label');

    // Test that IDs are generated from content
    await expect(h2).toHaveAttribute('id', 'getting-started-guide');
    await expect(h3).toHaveAttribute('id', 'installation-instructions');
    await expect(h4).toHaveAttribute('id', 'configuration-options');
    await expect(h5).toHaveAttribute('id', 'advanced-settings');
  },
};

/**
 * ### Non-Clickable Headers
 *
 * Headers with anchor functionality disabled (default behavior).
 */
export const NonClickableHeaders: Story = {
  render: () => (
    <div className="space-y-6 p-6">
      <div className="mb-6 rounded-lg bg-gray-50 p-4 text-gray-600 text-sm">
        <p>
          These headers have anchor functionality disabled and behave as regular
          headings.
        </p>
      </div>

      <H2>Regular Section Header</H2>
      <p className="text-gray-600">
        This H2 does not have anchor link functionality.
      </p>

      <H3>Regular Subsection</H3>
      <p className="text-gray-600">
        This H3 also behaves as a standard heading.
      </p>

      <H4>Regular Minor Section</H4>
      <p className="text-gray-600">No anchor links for this H4.</p>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const h2 = canvas.getByRole('heading', { level: 2 });
    const h3 = canvas.getByRole('heading', { level: 3 });
    const h4 = canvas.getByRole('heading', { level: 4 });

    // Test that non-clickable headings don't have ARIA labels
    await expect(h2).not.toHaveAttribute('aria-label');
    await expect(h3).not.toHaveAttribute('aria-label');
    await expect(h4).not.toHaveAttribute('aria-label');
  },
};

/**
 * ## Custom Styling
 *
 * Stories showing custom styling options while maintaining functionality.
 */

/**
 * ### Custom Styled Headers
 *
 * Headers with custom CSS classes for different visual treatments.
 */
export const CustomStyledHeaders: Story = {
  render: () => (
    <div className="space-y-8 p-6">
      <H1 className="border-blue-200 border-b-2 pb-2 text-blue-600">
        Custom Styled H1
      </H1>

      <H2 isClickable className="rounded-lg bg-green-50 p-4 text-green-600">
        Green Background H2 with Anchor
      </H2>

      <H3 isClickable className="font-light text-purple-600 italic">
        Italic Purple H3 with Anchor
      </H3>

      <H4 isClickable className="text-red-600 text-sm uppercase tracking-wider">
        Uppercase H4 with Anchor
      </H4>

      <H5
        isClickable
        className="inline-block rounded-full bg-yellow-100 px-3 py-1 text-gray-800"
      >
        Badge Style H5 with Anchor
      </H5>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test custom styling is applied
    const h1 = canvas.getByRole('heading', { level: 1 });
    const h2 = canvas.getByRole('heading', { level: 2 });
    const h3 = canvas.getByRole('heading', { level: 3 });

    await expect(h1).toHaveClass('text-blue-600');
    await expect(h2).toHaveClass('text-green-600', 'bg-green-50');
    await expect(h3).toHaveClass('text-purple-600', 'italic');

    // Test functionality is preserved
    await expect(h2).toHaveAttribute('aria-label');
    await expect(h3).toHaveAttribute('aria-label');
  },
};

/**
 * ## Accessibility Testing
 *
 * Stories specifically designed to test and demonstrate accessibility features.
 */

/**
 * ### Heading Hierarchy
 *
 * Proper heading hierarchy for screen readers and document structure.
 */
export const HeadingHierarchy: Story = {
  render: () => (
    <article className="mx-auto max-w-4xl p-6">
      <H1>Complete Guide to Web Accessibility</H1>

      <H2 isClickable>Introduction to Accessibility</H2>
      <p className="mb-4">
        Web accessibility ensures that websites and applications can be used by
        everyone.
      </p>

      <H3 isClickable>What is Web Accessibility?</H3>
      <p className="mb-4">
        Accessibility means designing for users with diverse abilities and
        needs.
      </p>

      <H4 isClickable>Types of Disabilities</H4>
      <p className="mb-4">
        Visual, auditory, motor, and cognitive disabilities all affect web
        usage.
      </p>

      <H5 isClickable>Visual Impairments</H5>
      <p className="mb-4">
        Including blindness, low vision, and color blindness.
      </p>

      <H5 isClickable>Auditory Impairments</H5>
      <p className="mb-4">Including deafness and hearing loss.</p>

      <H4 isClickable>Assistive Technologies</H4>
      <p className="mb-4">
        Screen readers, voice recognition, and other tools that help users
        navigate.
      </p>

      <H3 isClickable>Benefits of Accessibility</H3>
      <p className="mb-4">
        Accessibility benefits everyone, not just users with disabilities.
      </p>

      <H2 isClickable>Implementation Guidelines</H2>
      <p className="mb-4">
        Practical steps to make your website more accessible.
      </p>

      <H3 isClickable>WCAG Guidelines</H3>
      <p className="mb-4">
        The Web Content Accessibility Guidelines provide comprehensive
        standards.
      </p>
    </article>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test proper heading structure
    const headings = canvas.getAllByRole('heading');

    // Should have one H1
    const h1s = headings.filter((h) => h.tagName === 'H1');
    await expect(h1s).toHaveLength(1);

    // Should have multiple H2s
    const h2s = headings.filter((h) => h.tagName === 'H2');
    await expect(h2s.length).toBeGreaterThan(1);

    // Should have proper nesting
    const firstH2 = canvas.getByText('Introduction to Accessibility');
    const firstH3 = canvas.getByText('What is Web Accessibility?');

    await expect(firstH2).toBeInTheDocument();
    await expect(firstH3).toBeInTheDocument();
  },
};

/**
 * ### Keyboard Navigation
 *
 * Testing keyboard accessibility for anchor links.
 */
export const KeyboardNavigation: Story = {
  render: () => (
    <div className="space-y-6 p-6">
      <div className="mb-6 rounded-lg bg-blue-50 p-4 text-gray-600 text-sm">
        <p className="mb-2 font-medium">Keyboard Navigation Test:</p>
        <p>
          While anchor links are primarily mouse-focused, the headings maintain
          full keyboard accessibility for navigation and screen reader support.
        </p>
      </div>

      <H2 isClickable>Keyboard Accessible Section</H2>
      <p className="mb-4">
        This section can be navigated to via keyboard shortcuts in browsers that
        support heading navigation.
      </p>

      <H3 isClickable>Screen Reader Compatible</H3>
      <p className="mb-4">
        Screen readers will announce this as a level 3 heading with proper
        context.
      </p>

      <H4 isClickable>Focus Management</H4>
      <p className="mb-4">
        The heading structure provides clear document outline for assistive
        technologies.
      </p>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test that headings are properly accessible
    const h2 = canvas.getByRole('heading', { level: 2 });
    const h3 = canvas.getByRole('heading', { level: 3 });
    const h4 = canvas.getByRole('heading', { level: 4 });

    await expect(h2).toBeInTheDocument();
    await expect(h3).toBeInTheDocument();
    await expect(h4).toBeInTheDocument();

    // Verify heading content
    await expect(h2).toHaveTextContent('Keyboard Accessible Section');
    await expect(h3).toHaveTextContent('Screen Reader Compatible');
    await expect(h4).toHaveTextContent('Focus Management');

    // Test ARIA labels are present for clickable headings
    await expect(h2).toHaveAttribute('aria-label');
    await expect(h3).toHaveAttribute('aria-label');
    await expect(h4).toHaveAttribute('aria-label');
  },
};

/**
 * ### Documentation Page
 *
 * Example of a complete documentation page with proper heading hierarchy and navigation.
 */
export const DocumentationPage: Story = {
  render: () => (
    <div className="mx-auto max-w-4xl p-6">
      <header className="mb-8 border-gray-200 border-b pb-6">
        <H1>API Documentation</H1>
        <p className="mt-2 text-gray-600">
          Complete reference for the Intlayer Design System API
        </p>
      </header>

      <nav className="mb-8 rounded-lg bg-gray-50 p-4">
        <h2 className="mb-3 font-semibold text-lg">Table of Contents</h2>
        <ul className="space-y-1 text-sm">
          <li>
            <a
              href="#getting-started"
              className="text-blue-600 hover:underline"
            >
              Getting Started
            </a>
          </li>
          <li>
            <a
              href="#installation"
              className="ml-4 text-blue-600 hover:underline"
            >
              Installation
            </a>
          </li>
          <li>
            <a
              href="#basic-usage"
              className="ml-4 text-blue-600 hover:underline"
            >
              Basic Usage
            </a>
          </li>
          <li>
            <a href="#api-reference" className="text-blue-600 hover:underline">
              API Reference
            </a>
          </li>
          <li>
            <a
              href="#components"
              className="ml-4 text-blue-600 hover:underline"
            >
              Components
            </a>
          </li>
          <li>
            <a href="#hooks" className="ml-4 text-blue-600 hover:underline">
              Hooks
            </a>
          </li>
          <li>
            <a href="#examples" className="text-blue-600 hover:underline">
              Examples
            </a>
          </li>
        </ul>
      </nav>

      <main className="prose prose-gray max-w-none">
        <H2 isClickable>Getting Started</H2>
        <p>
          Welcome to the Intlayer Design System. This guide will help you get up
          and running quickly.
        </p>

        <H3 isClickable>Installation</H3>
        <p>Install the package using your preferred package manager:</p>
        <pre className="overflow-x-auto rounded-lg bg-gray-900 p-4 text-gray-100">
          <code>npm install @intlayer/design-system</code>
        </pre>

        <H3 isClickable>Basic Usage</H3>
        <p>Import and use components in your React application:</p>
        <pre className="overflow-x-auto rounded-lg bg-gray-900 p-4 text-gray-100">
          <code>{`import { Button, Label } from '@intlayer/design-system';

function App() {
  return (
    <div>
      <Label htmlFor="email">Email</Label>
      <input id="email" type="email" />
      <Button>Submit</Button>
    </div>
  );
}`}</code>
        </pre>

        <H2 isClickable>API Reference</H2>
        <p>
          Detailed documentation for all available components and utilities.
        </p>

        <H3 isClickable>Components</H3>
        <p>The design system includes the following components:</p>

        <H4 isClickable>Button Component</H4>
        <p>A versatile button component with multiple variants and sizes.</p>

        <H5 isClickable>Props</H5>
        <ul>
          <li>
            <code>variant</code> - Visual style variant
          </li>
          <li>
            <code>size</code> - Size of the button
          </li>
          <li>
            <code>disabled</code> - Whether the button is disabled
          </li>
        </ul>

        <H4 isClickable>Label Component</H4>
        <p>Accessible form label with required field indicators.</p>

        <H3 isClickable>Hooks</H3>
        <p>Utility hooks for common functionality.</p>

        <H2 isClickable>Examples</H2>
        <p>
          Real-world examples showing how to use the design system effectively.
        </p>
      </main>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test document structure
    const mainHeading = canvas.getByRole('heading', { level: 1 });
    await expect(mainHeading).toHaveTextContent('API Documentation');

    // Test section navigation - find headings specifically by role and content
    const allH2Headings = canvas.getAllByRole('heading', { level: 2 });
    const gettingStarted = allH2Headings.find(
      (h) => h.textContent === 'Getting Started'
    );
    await expect(gettingStarted).toHaveAttribute('id', 'getting-started');

    const allH3Headings = canvas.getAllByRole('heading', { level: 3 });
    const installation = allH3Headings.find(
      (h) => h.textContent === 'Installation'
    );
    await expect(installation).toHaveAttribute('id', 'installation');

    // Test nested structure
    const allH5Headings = canvas.getAllByRole('heading', { level: 5 });
    const propsHeading = allH5Headings.find((h) => h.textContent === 'Props');
    await expect(propsHeading).toHaveAttribute('id', 'props');
  },
};

/**
 * ### Blog Article
 *
 * Example of a blog article with proper heading structure and readable content flow.
 */
export const BlogArticle: Story = {
  render: () => (
    <article className="mx-auto max-w-3xl p-6">
      <header className="mb-8">
        <H1>Building Accessible React Components</H1>
        <div className="mt-2 mb-4 text-gray-600 text-sm">
          Published by Jane Developer
        </div>
        <div className="mb-4 flex gap-2">
          <span className="rounded bg-blue-100 px-2 py-1 text-blue-800 text-xs">
            React
          </span>
          <span className="rounded bg-green-100 px-2 py-1 text-green-800 text-xs">
            Accessibility
          </span>
          <span className="rounded bg-purple-100 px-2 py-1 text-purple-800 text-xs">
            Web Development
          </span>
        </div>
      </header>

      <H2 isClickable>Introduction</H2>
      <p className="mb-4">
        Creating accessible React components is crucial for building inclusive
        web applications. In this article, we'll explore best practices and
        practical techniques.
      </p>

      <H2 isClickable>Core Principles</H2>
      <p className="mb-4">
        Accessibility in React follows the same principles as general web
        accessibility, but with some React-specific considerations.
      </p>

      <H3 isClickable>Semantic HTML</H3>
      <p className="mb-4">
        Use semantic HTML elements whenever possible. This provides built-in
        accessibility features.
      </p>

      <H3 isClickable>ARIA Attributes</H3>
      <p className="mb-4">
        When semantic HTML isn't enough, ARIA attributes help provide additional
        context.
      </p>

      <H4 isClickable>Common ARIA Patterns</H4>
      <p className="mb-4">
        Some frequently used ARIA patterns in React applications include:
      </p>

      <H5 isClickable>Button Roles</H5>
      <p className="mb-4">
        Use role="button" for non-button elements that act as buttons.
      </p>

      <H5 isClickable>Live Regions</H5>
      <p className="mb-4">Use aria-live to announce dynamic content changes.</p>

      <H2 isClickable>Implementation Tips</H2>
      <p className="mb-4">
        Here are some practical tips for implementing accessibility in your
        React components.
      </p>

      <H3 isClickable>Testing Your Components</H3>
      <p className="mb-4">
        Regular testing with screen readers and accessibility tools is
        essential.
      </p>

      <H2 isClickable>Conclusion</H2>
      <p className="mb-4">
        Building accessible React components requires attention to detail but
        results in applications that work for everyone.
      </p>
    </article>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test article structure
    const articleTitle = canvas.getByRole('heading', { level: 1 });
    await expect(articleTitle).toHaveTextContent(
      'Building Accessible React Components'
    );

    // Test section headings have anchors - use getByText to find headings
    const introduction = canvas.getByText('Introduction');
    const principles = canvas.getByText('Core Principles');
    const conclusion = canvas.getByText('Conclusion');

    await expect(introduction).toHaveAttribute('id', 'introduction');
    await expect(principles).toHaveAttribute('id', 'core-principles');
    await expect(conclusion).toHaveAttribute('id', 'conclusion');

    // Test nested headings
    const semanticHeading = canvas.getByText('Semantic HTML');
    const ariaHeading = canvas.getByText('ARIA Attributes');

    await expect(semanticHeading).toBeInTheDocument();
    await expect(ariaHeading).toBeInTheDocument();
  },
};
