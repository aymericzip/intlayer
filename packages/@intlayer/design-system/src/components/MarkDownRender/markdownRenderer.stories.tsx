import type { Meta, StoryObj } from '@storybook/react';
import { MarkdownRenderer } from './MarkDownRender';

const meta: Meta<typeof MarkdownRenderer> = {
  title: 'Components/MarkdownRenderer',
  component: MarkdownRenderer,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof MarkdownRenderer>;

const sampleMarkdown = `
# Heading 1

This is a paragraph with **bold text** and *italic text*.

## Heading 2

Here's a [link to Google](https://google.com) and some \`inline code\`.

### Heading 3

A code block:

\`\`\`javascript
function hello() {
  console.log("Hello, World!");
}
\`\`\`

### Lists

Unordered list:
- Item 1
- Item 2
- Item 3

Ordered list:
1. First
2. Second
3. Third

### Table

| Name | Age | City |
|------|-----|------|
| Alice | 25 | NYC |
| Bob | 30 | LA |

### Blockquote

> This is a blockquote.
> It can span multiple lines.

---

That's all folks!
`;

export const Default: Story = {
  args: {
    children: sampleMarkdown,
  },
};

export const WithDarkMode: Story = {
  args: {
    children: sampleMarkdown,
    isDarkMode: true,
  },
};

export const SimpleText: Story = {
  args: {
    children: '# Hello World\n\nThis is **markdown** rendering.',
  },
};

export const CodeBlock: Story = {
  args: {
    children: `
## Code Example

\`\`\`typescript
interface User {
  name: string;
  age: number;
}

const user: User = {
  name: "John",
  age: 30
};
\`\`\`
`,
  },
};

export const Table: Story = {
  args: {
    children: `
## Data Table

| Feature | Status | Notes |
|---------|--------|-------|
| Headers | ✅ | Working |
| Code | ✅ | With highlighting |
| Tables | ✅ | Scrollable |
| Links | ✅ | External supported |
`,
  },
};
