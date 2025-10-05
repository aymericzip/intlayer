import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';
import { useState } from 'react';
import { CopyToClipboard } from './';

/**
 * CopyToClipboard Component Stories
 *
 * The CopyToClipboard component provides an intuitive way for users to copy text content
 * to their clipboard with visual feedback and accessibility support. It's commonly used
 * for code snippets, URLs, API keys, and other text content that users need to copy.
 *
 * ## Key Features
 * - **One-click copying**: Simple click or keyboard interaction to copy text
 * - **Visual feedback**: Clear visual indicators for copy and copied states
 * - **Accessibility**: Full ARIA support with keyboard navigation and screen reader compatibility
 * - **Error handling**: Graceful fallback for older browsers and error states
 * - **Customizable**: Configurable feedback duration and styling
 *
 * ## When to Use
 * - Code snippets and installation commands
 * - API keys, URLs, and reference IDs
 * - Contact information and addresses
 * - Any text content that users frequently need to copy
 * - Documentation and tutorial content
 */
const meta = {
  title: 'Components/CopyToClipboard',
  component: CopyToClipboard,
  parameters: {
    docs: {
      description: {
        component: `
A utility component that wraps content and provides copy-to-clipboard functionality with visual feedback.

### Accessibility Features:
- **Keyboard Navigation**: Full support for Tab, Enter, and Space key interactions
- **Screen Readers**: Proper ARIA labels and state announcements for copy operations
- **Focus Management**: Visible focus indicators with customizable ring colors
- **State Announcements**: Dynamic ARIA labels that announce copy success or errors
- **Semantic HTML**: Uses proper button role with accessible labels

### Visual Feedback:
- **Copy Icon**: Default state shows copy icon
- **Success State**: Shows check icon when copy succeeds
- **Error State**: Visual indication when copy operation fails
- **Hover Effects**: Subtle background changes on hover
- **Smooth Transitions**: Animated state changes for better UX

### Browser Support:
- **Modern Clipboard API**: Uses native navigator.clipboard for secure copying
- **Legacy Fallback**: Automatic fallback for older browsers using document.execCommand
- **Error Handling**: Graceful error handling with user feedback
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
            id: 'keyboard-navigation',
            enabled: true,
          },
        ],
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    text: {
      description: 'The text to copy to the clipboard when clicked',
      control: 'text',
    },
    children: {
      description: 'Content rendered inside the clickable area',
      control: 'text',
    },
    className: {
      description: 'Additional CSS classes for the wrapper element',
      control: 'text',
    },
    'aria-label': {
      description:
        'Accessible label for screen readers when copy operation is available',
      control: 'text',
    },
    'aria-copied-label': {
      description:
        'Accessible label for screen readers when content has been copied',
      control: 'text',
    },
    feedbackDuration: {
      description: 'Duration in milliseconds to show the "copied" state',
      control: { type: 'number', min: 500, max: 10000, step: 500 },
    },
    onCopySuccess: {
      description: 'Callback function called when copy operation succeeds',
      action: 'copied',
    },
    onCopyError: {
      description: 'Callback function called when copy operation fails',
      action: 'copy-error',
    },
  },
} satisfies Meta<typeof CopyToClipboard>;

export default meta;
type Story = StoryObj<typeof CopyToClipboard>;

/**
 * ## Basic Examples
 *
 * These stories demonstrate the core functionality of the CopyToClipboard component
 * in common usage scenarios.
 */

/**
 * ### Default State
 *
 * The basic copy-to-clipboard functionality with default styling and behavior.
 * Click the content or icon to copy the text to your clipboard.
 */
export const Default: Story = {
  args: {
    text: 'Hello World!',
    children: 'Click to copy',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const copyButton = canvas.getByRole('button', {
      name: /copy to clipboard/i,
    });

    // Test initial state
    await expect(copyButton).toBeInTheDocument();
    await expect(copyButton).toHaveAccessibleName(/copy to clipboard/i);
    await expect(copyButton).not.toHaveAttribute('aria-pressed', 'true');

    // Test interaction
    await userEvent.click(copyButton);

    // Wait a moment for state change
    await new Promise((resolve) => setTimeout(resolve, 100));

    // Test copied state
    await expect(copyButton).toHaveAccessibleName(/copied to clipboard/i);
    await expect(copyButton).toHaveAttribute('aria-pressed', 'true');
  },
};

/**
 * ### Code Snippet
 *
 * Common use case for copying installation commands or code snippets.
 * The content is styled as code with monospace font.
 */
export const CodeSnippet: Story = {
  args: {
    text: 'npm install @intlayer/design-system',
    children: (
      <code className="rounded bg-gray-100 px-2 py-1 font-mono text-sm">
        npm install @intlayer/design-system
      </code>
    ),
    className: 'inline-flex items-center',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const copyButton = canvas.getByRole('button');
    const codeElement = canvas.getByText('npm install @intlayer/design-system');

    await expect(copyButton).toBeInTheDocument();
    await expect(codeElement).toBeInTheDocument();

    // Test that code element has proper styling
    await expect(codeElement.tagName.toLowerCase()).toBe('code');
  },
};

/**
 * ### Custom Feedback Duration
 *
 * Example with extended feedback duration to show the copied state for longer.
 * Useful for important content where you want users to clearly see the success state.
 */
export const CustomFeedbackDuration: Story = {
  args: {
    text: 'sk-1234567890abcdef',
    children: (
      <span className="font-medium">
        API Key: <span className="font-mono">sk-1234567890abcdef</span>
      </span>
    ),
    feedbackDuration: 5000,
    'aria-label': 'Copy API key to clipboard',
    'aria-copied-label': 'API key copied successfully',
    className: 'inline-flex items-center',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const copyButton = canvas.getByRole('button', { name: /copy api key/i });

    await userEvent.click(copyButton);

    // Wait for state change
    await new Promise((resolve) => setTimeout(resolve, 100));

    await expect(copyButton).toHaveAccessibleName(
      /api key copied successfully/i
    );
  },
};

/**
 * ### With Callbacks
 *
 * Demonstrates the copy success and error callback functionality.
 * Check the Actions panel in Storybook to see the callback events.
 */
export const WithCallbacks: Story = {
  args: {
    text: 'https://github.com/aymericzip/intlayer',
    children: (
      <span className="text-blue-600 underline">Copy Repository URL</span>
    ),
    onCopySuccess: () => console.log('Copy successful!'),
    onCopyError: (error) => console.error('Copy failed:', error),
    className: 'inline-flex items-center',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const copyButton = canvas.getByRole('button');

    await userEvent.click(copyButton);

    // Wait for callback execution
    await new Promise((resolve) => setTimeout(resolve, 100));

    // The callback should have been called (visible in Actions panel)
    await expect(copyButton).toHaveAttribute('aria-pressed', 'true');
  },
};

/**
 * ## Interactive States
 *
 * Stories demonstrating different states and user interactions.
 */

/**
 * ### Copy Feedback Demo
 *
 * Interactive demonstration of the copy feedback with multiple text options.
 * Try copying different types of content to see the feedback in action.
 */
export const CopyFeedbackDemo: Story = {
  render: () => {
    const [copyCount, setCopyCount] = useState(0);

    const sampleTexts = [
      { label: 'Short Text', content: 'Hello!' },
      { label: 'URL', content: 'https://github.com/aymericzip/intlayer' },
      { label: 'Email', content: 'contact@intlayer.org' },
      { label: 'Multi-line', content: 'Line 1\nLine 2\nLine 3' },
    ];

    return (
      <div className="space-y-4">
        <div className="mb-4 text-gray-600 text-sm">
          Total copies: {copyCount}
        </div>
        <div className="grid grid-cols-2 gap-4">
          {sampleTexts.map(({ label, content }) => (
            <div key={label} className="rounded-lg border border-gray-200 p-3">
              <h4 className="mb-2 font-medium text-sm">{label}</h4>
              <CopyToClipboard
                text={content}
                onCopySuccess={() => setCopyCount((prev) => prev + 1)}
                className="inline-flex w-full items-center"
              >
                <div className="break-all rounded bg-gray-50 p-2 font-mono text-xs">
                  {content}
                </div>
              </CopyToClipboard>
            </div>
          ))}
        </div>
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const copyButtons = canvas.getAllByRole('button');

    await expect(copyButtons).toHaveLength(4);

    // Test copying the first item
    const firstButton = copyButtons[0];
    await userEvent.click(firstButton);

    await new Promise((resolve) => setTimeout(resolve, 100));

    // Check that copy count increased
    const copyCounter = canvas.getByText(/Total copies: 1/);
    await expect(copyCounter).toBeInTheDocument();
  },
};

/**
 * ### Empty Content Handling
 *
 * Shows behavior when text content is empty or undefined.
 * The component should handle these edge cases gracefully.
 */
export const EmptyContentHandling: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h4 className="mb-2 font-medium text-sm">Empty String</h4>
        <CopyToClipboard
          text=""
          className="inline-flex items-center rounded border border-gray-300 p-2"
        >
          <span className="text-gray-500 italic">Nothing to copy</span>
        </CopyToClipboard>
      </div>

      <div>
        <h4 className="mb-2 font-medium text-sm">Whitespace Only</h4>
        <CopyToClipboard
          text="   "
          className="inline-flex items-center rounded border border-gray-300 p-2"
        >
          <span className="text-gray-500 italic">Whitespace content</span>
        </CopyToClipboard>
      </div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const copyButtons = canvas.getAllByRole('button');

    for (const button of copyButtons) {
      await expect(button).toBeInTheDocument();
      await expect(button).toHaveAccessibleName();
    }
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
 * Demonstrates proper keyboard navigation and focus management.
 * Use Tab to focus, Enter or Space to activate the copy operation.
 */
export const KeyboardNavigation: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="mb-4 text-gray-600 text-sm">
        Use Tab to navigate, Enter or Space to copy. Focus indicators should be
        clearly visible.
      </div>
      <div className="flex flex-wrap gap-4">
        <CopyToClipboard
          text="First item to copy"
          className="inline-flex items-center rounded border border-gray-300 p-2"
        >
          <span>First Copy Button</span>
        </CopyToClipboard>

        <CopyToClipboard
          text="Second item to copy"
          className="inline-flex items-center rounded border border-gray-300 p-2"
        >
          <span>Second Copy Button</span>
        </CopyToClipboard>

        <CopyToClipboard
          text="Third item to copy"
          className="inline-flex items-center rounded border border-gray-300 p-2"
        >
          <span>Third Copy Button</span>
        </CopyToClipboard>
      </div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const copyButtons = canvas.getAllByRole('button');

    // Test initial focus
    const firstButton = copyButtons[0];
    await userEvent.click(firstButton);
    await expect(firstButton).toHaveFocus();

    // Test keyboard navigation
    await userEvent.keyboard('{Tab}');
    await expect(copyButtons[1]).toHaveFocus();

    await userEvent.keyboard('{Tab}');
    await expect(copyButtons[2]).toHaveFocus();

    // Test keyboard activation
    await userEvent.keyboard('{Enter}');
    await new Promise((resolve) => setTimeout(resolve, 100));
    await expect(copyButtons[2]).toHaveAttribute('aria-pressed', 'true');

    // Test space key activation
    await userEvent.keyboard('{Tab}');
    await userEvent.keyboard(' ');
    await new Promise((resolve) => setTimeout(resolve, 100));
  },
};

/**
 * ### Screen Reader Support
 *
 * Demonstrates proper ARIA labels and state announcements for screen readers.
 * Each copy button has appropriate labels that change based on state.
 */
export const ScreenReaderSupport: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="mb-2 font-medium text-sm">Default Labels</h3>
        <CopyToClipboard
          text="Default behavior"
          className="inline-flex items-center rounded border border-gray-300 p-2"
        >
          <span>Copy with Default Labels</span>
        </CopyToClipboard>
      </div>

      <div>
        <h3 className="mb-2 font-medium text-sm">Custom Labels</h3>
        <CopyToClipboard
          text="Custom labels example"
          aria-label="Copy example text to your clipboard"
          aria-copied-label="Example text successfully copied to clipboard"
          className="inline-flex items-center rounded border border-gray-300 p-2"
        >
          <span>Copy with Custom Labels</span>
        </CopyToClipboard>
      </div>

      <div>
        <h3 className="mb-2 font-medium text-sm">Contextual Labels</h3>
        <div className="rounded bg-gray-50 p-4">
          <h4 className="mb-2 font-medium">Installation Instructions</h4>
          <p className="mb-3 text-gray-600 text-sm">
            Run this command in your terminal to install the package:
          </p>
          <CopyToClipboard
            text="npm install @intlayer/design-system"
            aria-label="Copy installation command to clipboard"
            aria-copied-label="Installation command copied to clipboard"
            className="inline-flex items-center rounded bg-gray-900 p-3 font-mono text-sm text-white"
          >
            npm install @intlayer/design-system
          </CopyToClipboard>
        </div>
      </div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const copyButtons = canvas.getAllByRole('button');

    // Test each button has proper initial ARIA labels
    await expect(copyButtons[0]).toHaveAccessibleName(/copy to clipboard/i);
    await expect(copyButtons[1]).toHaveAccessibleName(
      /copy example text to your clipboard/i
    );
    await expect(copyButtons[2]).toHaveAccessibleName(
      /copy installation command to clipboard/i
    );

    // Test state change for custom labels
    await userEvent.click(copyButtons[1]);
    await new Promise((resolve) => setTimeout(resolve, 100));
    await expect(copyButtons[1]).toHaveAccessibleName(
      /example text successfully copied to clipboard/i
    );
  },
};

/**
 * ## Real-World Examples
 *
 * Practical examples showing how the component would be used in real applications.
 */

/**
 * ### Documentation Interface
 *
 * Example of copy-to-clipboard functionality in a documentation interface
 * with code blocks, API endpoints, and configuration examples.
 */
export const DocumentationInterface: Story = {
  render: () => (
    <div className="mx-auto max-w-4xl space-y-8">
      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
        <div className="border-gray-200 border-b bg-gray-50 px-4 py-2">
          <h3 className="font-semibold text-lg">API Reference</h3>
        </div>

        <div className="space-y-6 p-6">
          {/* API Endpoint */}
          <div>
            <h4 className="mb-2 font-medium text-md">Base URL</h4>
            <CopyToClipboard
              text="https://api.intlayer.org/v1"
              className="block inline-flex items-center rounded border border-blue-200 bg-blue-50 p-3"
              aria-label="Copy API base URL to clipboard"
            >
              <code className="font-mono text-blue-800">
                https://api.intlayer.org/v1
              </code>
            </CopyToClipboard>
          </div>

          {/* Code Example */}
          <div>
            <h4 className="mb-2 font-medium text-md">Example Request</h4>
            <CopyToClipboard
              text={`fetch('https://api.intlayer.org/v1/translations', {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer YOUR_TOKEN',
    'Content-Type': 'application/json'
  }
})`}
              className="block inline-flex items-center overflow-x-auto rounded bg-gray-900 p-4 text-gray-100"
              aria-label="Copy example fetch request to clipboard"
            >
              <pre className="text-sm">
                {`fetch('https://api.intlayer.org/v1/translations', {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer YOUR_TOKEN',
    'Content-Type': 'application/json'
  }
})`}
              </pre>
            </CopyToClipboard>
          </div>

          {/* Configuration */}
          <div>
            <h4 className="mb-2 font-medium text-md">Configuration</h4>
            <CopyToClipboard
              text={`{
  "internationalization": {
    "locales": ["en", "fr", "es"],
    "defaultLocale": "en",
    "middleware": {
      "headerName": "x-intlayer-locale"
    }
  }
}`}
              className="block inline-flex items-center rounded border border-green-200 bg-green-50 p-4"
              aria-label="Copy configuration JSON to clipboard"
            >
              <pre className="text-green-800 text-sm">
                {`{
  "internationalization": {
    "locales": ["en", "fr", "es"],
    "defaultLocale": "en",
    "middleware": {
      "headerName": "x-intlayer-locale"
    }
  }
}`}
              </pre>
            </CopyToClipboard>
          </div>
        </div>
      </div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const copyButtons = canvas.getAllByRole('button');

    await expect(copyButtons).toHaveLength(3);

    // Test API URL copy
    const apiButton = copyButtons[0];
    await userEvent.click(apiButton);
    await new Promise((resolve) => setTimeout(resolve, 100));
    await expect(apiButton).toHaveAttribute('aria-pressed', 'true');

    // Test code example copy
    const codeButton = copyButtons[1];
    await userEvent.click(codeButton);
    await new Promise((resolve) => setTimeout(resolve, 100));
    await expect(codeButton).toHaveAttribute('aria-pressed', 'true');
  },
};

/**
 * ### Contact Information Card
 *
 * Example showing copy-to-clipboard in a contact card interface
 * for email addresses, phone numbers, and other contact details.
 */
export const ContactInformationCard: Story = {
  render: () => (
    <div className="mx-auto max-w-md overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
      <div className="h-24 bg-gradient-to-r from-blue-600 to-purple-600"></div>

      <div className="relative px-6 pb-6">
        <div className="-mt-12 relative mb-4">
          <div className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-white bg-white shadow-sm">
            <span className="font-bold text-2xl text-gray-600">JD</span>
          </div>
        </div>

        <h2 className="mb-1 font-bold text-gray-900 text-xl">John Doe</h2>
        <p className="mb-4 text-gray-600">Senior Developer</p>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-gray-500 text-sm">Email</span>
            <CopyToClipboard
              text="john.doe@intlayer.org"
              className="inline-flex items-center rounded px-2 py-1 text-blue-600 hover:bg-blue-50"
              aria-label="Copy email address to clipboard"
            >
              john.doe@intlayer.org
            </CopyToClipboard>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-gray-500 text-sm">Phone</span>
            <CopyToClipboard
              text="+1 (555) 123-4567"
              className="inline-flex items-center rounded px-2 py-1 text-blue-600 hover:bg-blue-50"
              aria-label="Copy phone number to clipboard"
            >
              +1 (555) 123-4567
            </CopyToClipboard>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-gray-500 text-sm">LinkedIn</span>
            <CopyToClipboard
              text="https://linkedin.com/in/johndoe"
              className="inline-flex items-center rounded px-2 py-1 text-blue-600 hover:bg-blue-50"
              aria-label="Copy LinkedIn profile URL to clipboard"
            >
              linkedin.com/in/johndoe
            </CopyToClipboard>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-gray-500 text-sm">GitHub</span>
            <CopyToClipboard
              text="https://github.com/johndoe"
              className="inline-flex items-center rounded px-2 py-1 text-blue-600 hover:bg-blue-50"
              aria-label="Copy GitHub profile URL to clipboard"
            >
              github.com/johndoe
            </CopyToClipboard>
          </div>
        </div>
      </div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const copyButtons = canvas.getAllByRole('button');

    await expect(copyButtons).toHaveLength(4);

    // Test each contact method can be copied
    for (let i = 0; i < copyButtons.length; i++) {
      const button = copyButtons[i];
      await expect(button).toBeInTheDocument();
      await expect(button).toHaveAccessibleName();

      await userEvent.click(button);
      await new Promise((resolve) => setTimeout(resolve, 100));
      await expect(button).toHaveAttribute('aria-pressed', 'true');

      // Wait for state to reset before testing next button
      await new Promise((resolve) => setTimeout(resolve, 2100));
    }
  },
};
