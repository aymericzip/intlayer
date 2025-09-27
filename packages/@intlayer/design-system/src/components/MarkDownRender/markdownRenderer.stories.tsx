import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';
import type React from 'react';
import { MarkdownRenderer } from '.';

const meta: Meta<typeof MarkdownRenderer> = {
  title: 'Components/MarkdownRenderer',
  component: MarkdownRenderer,
  tags: ['autodocs'],
  argTypes: {
    children: {
      description: 'The raw markdown string to render',
      control: 'text',
    },
    isDarkMode: {
      description:
        'Enable dark mode styling for code blocks and other elements',
      control: 'boolean',
    },
    locale: {
      description: 'Current locale for internationalized link handling',
      control: 'select',
      options: ['en', 'fr', 'es', 'de', 'ja', 'ko', 'zh'],
    },
    options: {
      description: 'Additional options to pass to markdown-to-jsx',
      control: 'object',
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'A comprehensive markdown renderer with syntax highlighting, internationalized links, and custom styling. Supports frontmatter removal and extensive customization.',
      },
    },
  },
} satisfies Meta<typeof MarkdownRenderer>;

export default meta;
type Story = StoryObj<typeof meta>;

// Sample markdown content for stories
const basicMarkdown = `# Welcome to Intlayer

Intlayer is a **modern**, *flexible* internationalization framework for JavaScript applications.

## Features

- ✅ Type-safe translations
- ✅ AI-powered content management
- ✅ Framework agnostic
- ✅ Developer-friendly API

### Getting Started

1. Install Intlayer
2. Configure your project
3. Start translating!

> **Note**: This is just the beginning of your i18n journey.

Visit our [documentation](https://intlayer.org/docs) for more details.`;

const codeExampleMarkdown = `# Code Examples

## JavaScript
\`\`\`javascript
import { useIntlayer } from 'react-intlayer';

function MyComponent() {
  const { title, description } = useIntlayer('my-content');
  
  return (
    <div>
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  );
}
\`\`\`

## TypeScript
\`\`\`typescript
interface User {
  id: number;
  name: string;
  email: string;
}

const users: User[] = [
  { id: 1, name: 'John', email: 'john@example.com' }
];
\`\`\`

## Python
\`\`\`python
def greet(name: str) -> str:
    return f"Hello, {name}!"

if __name__ == "__main__":
    print(greet("World"))
\`\`\`

## Inline Code

Use \`npm install intlayer\` to get started quickly.

The \`useIntlayer\` hook is your main tool for accessing translations.`;

const tableMarkdown = `# Data Tables

## User Statistics

| Name | Role | Email | Status |
|------|------|-------|---------|
| John Doe | Admin | john@example.com | Active |
| Jane Smith | Editor | jane@example.com | Active |
| Bob Johnson | Viewer | bob@example.com | Inactive |
| Alice Brown | Admin | alice@example.com | Active |

## Feature Comparison

| Feature | Basic | Pro | Enterprise |
|---------|-------|-----|------------|
| Translations | ✅ | ✅ | ✅ |
| AI Content | ❌ | ✅ | ✅ |
| Custom Domains | ❌ | ❌ | ✅ |
| Support | Community | Priority | Dedicated |
| Price | Free | $29/mo | $99/mo |`;

const linksMarkdown = `# Links and References

## Internal Links
- [Getting Started](/docs/getting-started)
- [API Reference](/docs/api)
- [Examples](/examples)
- [Migration Guide](/docs/migration)

## External Links
- [GitHub Repository](https://github.com/intlayer/intlayer)
- [npm Package](https://npmjs.com/package/intlayer)
- [Official Website](https://intlayer.org)
- [Discord Community](https://discord.gg/intlayer)

## Email and Special Links
- Email us: [support@intlayer.org](mailto:support@intlayer.org)
- Call us: [+1-555-0123](tel:+1-555-0123)
- Find us: [123 Main St, City](https://maps.google.com/?q=123+Main+St+City)`;

const frontmatterMarkdown = `---
title: "Blog Post with Frontmatter"
date: "2023-12-01"
author: "John Doe"
tags: ["intlayer", "i18n", "react"]
published: true
---

# This is a Blog Post

This content appears after the frontmatter, which should be automatically stripped by the MarkdownRenderer component.

The frontmatter above contains metadata that would typically be used by static site generators but shouldn't be displayed in the rendered output.

## Post Content

Here's the actual content that users should see:

- The frontmatter is invisible
- Only this content is rendered
- Metadata is processed but not displayed

> The frontmatter removal feature ensures clean content presentation.`;

const complexMarkdown = `# Comprehensive Markdown Demo

## Text Formatting
This paragraph demonstrates **bold text**, *italic text*, ***bold italic***, ~~strikethrough~~, and \`inline code\`.

## Lists

### Unordered List
- First item
- Second item
  - Nested item
  - Another nested item
- Third item

### Ordered List
1. First step
2. Second step
   1. Sub-step A
   2. Sub-step B
3. Third step

## Blockquotes

> This is a simple blockquote.

> This is a longer blockquote that demonstrates how the styling looks with more content. It can contain multiple sentences and should wrap nicely.
> 
> It can also contain multiple paragraphs within the same blockquote block.

## Code and Syntax Highlighting

Inline code: \`const greeting = "Hello World";\`

\`\`\`javascript
// JavaScript example with syntax highlighting
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log(fibonacci(10)); // 55
\`\`\`

## Images

![Intlayer Logo](https://github.com/intlayer/intlayer/blob/main/docs/assets/logo.png)

## Horizontal Rules

Above this line

---

Below this line

## Mixed Content

Here's a paragraph with [a link](https://intlayer.org), some **bold text**, and \`inline code\`.

| Column 1 | Column 2 | Column 3 |
|----------|----------|----------|
| Value 1  | Value 2  | Value 3  |
| Value 4  | Value 5  | Value 6  |

> **Important Note**: This blockquote contains *emphasized* text and a [link](https://example.com).`;

// Basic Examples
export const Default: Story = {
  args: {
    children: basicMarkdown,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Basic markdown rendering with headers, lists, emphasis, blockquotes, and links.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test headers are rendered
    expect(canvas.getByText('Welcome to Intlayer')).toBeInTheDocument();
    expect(canvas.getByText('Features')).toBeInTheDocument();
    expect(canvas.getByText('Getting Started')).toBeInTheDocument();

    // Test links are rendered
    const docLink = canvas.getByText('documentation');
    expect(docLink.closest('a')).toHaveAttribute(
      'href',
      'https://intlayer.org/docs'
    );
  },
};

export const CodeHighlighting: Story = {
  args: {
    children: codeExampleMarkdown,
    isDarkMode: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Markdown with code blocks demonstrating syntax highlighting for different languages.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test code blocks are rendered
    expect(canvas.getByText('Code Examples')).toBeInTheDocument();
    expect(canvas.getByText('JavaScript')).toBeInTheDocument();
    expect(canvas.getByText('TypeScript')).toBeInTheDocument();
    expect(canvas.getByText('Python')).toBeInTheDocument();

    // Test inline code
    const inlineCode = canvas.getByText('npm install intlayer');
    expect(inlineCode.tagName).toBe('STRONG'); // Should be wrapped in strong tag
  },
};

export const CodeHighlightingDark: Story = {
  args: {
    children: codeExampleMarkdown,
    isDarkMode: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Code highlighting with dark mode enabled for better visibility in dark themes.',
      },
    },
    backgrounds: {
      default: 'dark',
    },
  },
};

export const TablesDemo: Story = {
  args: {
    children: tableMarkdown,
  },
  parameters: {
    docs: {
      description: {
        story: 'Markdown tables with responsive styling and hover effects.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test table headers
    expect(canvas.getByText('Name')).toBeInTheDocument();
    expect(canvas.getByText('Role')).toBeInTheDocument();
    expect(canvas.getByText('Email')).toBeInTheDocument();
    expect(canvas.getByText('Status')).toBeInTheDocument();

    // Test table content
    expect(canvas.getByText('John Doe')).toBeInTheDocument();
    expect(canvas.getByText('jane@example.com')).toBeInTheDocument();
  },
};

export const LinksAndReferences: Story = {
  args: {
    children: linksMarkdown,
    locale: 'en',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Various types of links including internal navigation, external links, and special protocols.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test internal links
    const gettingStartedLink = canvas.getByText('Getting Started').closest('a');
    expect(gettingStartedLink).toHaveAttribute('href', '/docs/getting-started');

    // Test external links
    const githubLink = canvas.getByText('GitHub Repository').closest('a');
    expect(githubLink).toHaveAttribute(
      'href',
      'https://github.com/intlayer/intlayer'
    );

    // Test email link
    const emailLink = canvas.getByText('support@intlayer.org').closest('a');
    expect(emailLink).toHaveAttribute('href', 'mailto:///support@intlayer.org');
  },
};

export const FrontmatterHandling: Story = {
  args: {
    children: frontmatterMarkdown,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Demonstrates automatic frontmatter removal - the YAML metadata block is stripped before rendering.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test that frontmatter content is NOT rendered
    expect(canvas.queryByText('title:')).not.toBeInTheDocument();
    expect(canvas.queryByText('date:')).not.toBeInTheDocument();
    expect(canvas.queryByText('author:')).not.toBeInTheDocument();
    expect(canvas.queryByText('---')).not.toBeInTheDocument();

    // Test that actual content IS rendered
    expect(canvas.getByText('This is a Blog Post')).toBeInTheDocument();
    expect(
      canvas.getByText(/This content appears after the frontmatter/)
    ).toBeInTheDocument();
  },
};

export const ComprehensiveDemo: Story = {
  args: {
    children: complexMarkdown,
  },
  parameters: {
    docs: {
      description: {
        story:
          'A comprehensive example showcasing all supported markdown features including text formatting, lists, blockquotes, code, images, tables, and mixed content.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test various elements are present
    expect(canvas.getByText('Comprehensive Markdown Demo')).toBeInTheDocument();
    expect(canvas.getByText('Text Formatting')).toBeInTheDocument();
    expect(canvas.getByText('Unordered List')).toBeInTheDocument();
    expect(canvas.getByText('Ordered List')).toBeInTheDocument();
    expect(canvas.getByText('Blockquotes')).toBeInTheDocument();

    // Test mixed content
    expect(canvas.getByText(/Here's a paragraph with/)).toBeInTheDocument();
  },
};

// Customization Examples
export const CustomOptions: Story = {
  args: {
    children:
      '# Custom Header\n\nThis demonstrates custom component overrides.',
    options: {
      overrides: {
        h1: ({ children }: { children: React.ReactNode }) => (
          <h1 className="text-4xl font-bold text-purple-600 border-b-4 border-purple-300 pb-2">
            🎨 {children}
          </h1>
        ),
        p: ({ children }: { children: React.ReactNode }) => (
          <p className="text-lg text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-lg">
            {children}
          </p>
        ),
      },
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          'Demonstrates how to customize markdown rendering with custom component overrides.',
      },
    },
  },
};

export const LocalizedLinks: Story = {
  args: {
    children: `# Navigation

Visit our [homepage](/) or check the [documentation](/docs).

External links like [Google](https://google.com) work too.`,
    locale: 'fr',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Shows how internal links are handled with different locales (French in this example).',
      },
    },
  },
};

// Edge Cases
export const EmptyContent: Story = {
  args: {
    children: '',
  },
  parameters: {
    docs: {
      description: {
        story: 'Handling empty markdown content gracefully.',
      },
    },
  },
};

export const OnlyFrontmatter: Story = {
  args: {
    children: `---
title: "Only Frontmatter"
description: "This markdown has only frontmatter"
---`,
  },
  parameters: {
    docs: {
      description: {
        story: 'Markdown containing only frontmatter (should render as empty).',
      },
    },
  },
  play: async ({ canvasElement }) => {
    // Should not render any visible content
    expect(canvasElement.textContent?.trim()).toBe('');
  },
};

export const SpecialCharacters: Story = {
  args: {
    children: `# Special Characters & Symbols

## Unicode Support
- Emoji: 🚀 ✨ 🎉 💎 🔥
- Math: α β γ δ ε ∑ ∏ ∫ ∞
- Arrows: ← → ↑ ↓ ⟵ ⟶ ⇒ ⇔
- Currency: $ € £ ¥ ₹ ₽ ₩

## HTML Entities
- Quotes: &ldquo;Hello&rdquo; &lsquo;World&rsquo;
- Symbols: &copy; &reg; &trade; &amp; &lt; &gt;

## Code with Special Characters
\`\`\`javascript
const regex = /[áéíóú]/g;
const text = "Café & naïve résumé";
const result = text.replace(regex, match => match.normalize());
\`\`\``,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Tests rendering of special characters, Unicode symbols, and HTML entities.',
      },
    },
  },
};

// Performance and Large Content
export const LargeContent: Story = {
  args: {
    children: Array.from(
      { length: 50 },
      (_, i) => `
## Section ${i + 1}

This is section ${i + 1} with some content. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

### Subsection ${i + 1}.1
- Item 1
- Item 2
- Item 3

\`\`\`javascript
// Code block ${i + 1}
function section${i + 1}() {
  return "Section ${i + 1} content";
}
\`\`\`

---
`
    ).join('\n'),
  },
  parameters: {
    docs: {
      description: {
        story:
          'Large markdown content to test performance and rendering of many elements.',
      },
    },
  },
};
