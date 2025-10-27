import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';
import { useState } from 'react';
import { ButtonColor, ButtonSize, ButtonVariant } from '../Button';
import { CopyButton } from '.';

/**
 * CopyButton Component Stories
 *
 * The CopyButton component is a specialized button for copying text content to the clipboard
 * with visual feedback and accessibility features. It uses the modern Clipboard API with
 * graceful error handling and provides clear indication of successful copy operations.
 *
 * ## Key Features
 * - **Clipboard Integration**: Uses modern Clipboard API for reliable text copying
 * - **Visual Feedback**: Icon changes from copy to check mark on successful copy
 * - **Auto-Reset**: Automatically reverts to copy icon after 1 second
 * - **Error Handling**: Graceful error handling with visual indicators
 * - **Accessibility**: Full keyboard navigation and screen reader support
 * - **Internationalization**: Multi-language support via Intlayer
 *
 * ## When to Use
 * - Code snippet copying in documentation
 * - Sharing URLs or links
 * - Copying configuration values or API keys
 * - Form data duplication
 * - Text content sharing in interfaces
 * - Any scenario requiring one-click text copying
 */
const meta: Meta<typeof CopyButton> = {
  title: 'Components/CopyButton',
  component: CopyButton,
  parameters: {
    docs: {
      description: {
        component: `
A specialized button component for copying text content to the clipboard with enhanced UX.

### Accessibility Features:
- **Keyboard Navigation**: Full support for Tab, Enter, and Space key interactions
- **Screen Readers**: Dynamic ARIA labels that announce copy success/failure states
- **Focus Management**: Clear focus indicators and proper button semantics
- **State Announcements**: Screen readers announce when content is copied or copy fails

### Visual Feedback:
- **Icon Changes**: Copy icon transforms to check mark on success
- **Color Indicators**: Green for success, red for errors, default for ready state
- **Auto-Reset**: Returns to initial state after 1 second
- **Smooth Transitions**: Visual state changes with smooth animations

### Use Cases:
- Documentation code snippets
- URL/link sharing buttons
- API endpoint copying
- Configuration value copying
- Form data duplication
- Social media content sharing
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
    content: {
      description: 'Text content to copy to the clipboard',
      control: 'text',
    },
    label: {
      description: 'Accessible label for the button (overrides default i18n)',
      control: 'text',
    },
    size: {
      description: 'Icon button size variant',
      control: 'select',
      options: Object.values(ButtonSize),
    },
    variant: {
      description: 'Visual style variant of the button',
      control: 'select',
      options: Object.values(ButtonVariant),
    },
    color: {
      description: 'Color theme of the button',
      control: 'select',
      options: Object.values(ButtonColor),
    },
    isLoading: {
      description: 'Shows loading spinner when true',
      control: 'boolean',
    },
    isActive: {
      description: 'Sets the active state of the button',
      control: 'boolean',
    },
    disabled: {
      description: 'Disables the button when true',
      control: 'boolean',
    },
    className: {
      description: 'Additional CSS classes for custom styling',
      control: 'text',
    },
  },
} satisfies Meta<typeof CopyButton>;

export default meta;
type Story = StoryObj<typeof CopyButton>;

/**
 * ## Basic Examples
 *
 * These stories demonstrate the core functionality and appearance of the CopyButton component
 * in its most common configurations.
 */

/**
 * ### Default Behavior
 *
 * The basic CopyButton with default settings. Click to copy the content to your clipboard
 * and watch the icon change to indicate success.
 */
export const Default: Story = {
  args: {
    content: 'Hello, World! This text will be copied to your clipboard.',
    label: 'Copy to clipboard',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');

    // Test initial state
    await expect(button).toBeInTheDocument();
    await expect(button).toHaveAccessibleName();
    await expect(button).not.toBeDisabled();

    // Test that button is keyboard accessible
    await expect(button).toHaveAttribute('tabindex', '0');
  },
};

/**
 * ### Different Sizes
 *
 * CopyButton in various sizes for different UI contexts.
 */
export const DifferentSizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <div className="text-center">
        <div className="mb-2 font-medium text-sm">Extra Small</div>
        <CopyButton
          content="Extra small copy button"
          size={ButtonSize.ICON_SM}
          label="Copy (XS)"
        />
      </div>
      <div className="text-center">
        <div className="mb-2 font-medium text-sm">Medium</div>
        <CopyButton
          content="Medium copy button"
          size={ButtonSize.ICON_MD}
          label="Copy (MD)"
        />
      </div>
      <div className="text-center">
        <div className="mb-2 font-medium text-sm">Large</div>
        <CopyButton
          content="Large copy button"
          size={ButtonSize.ICON_LG}
          label="Copy (LG)"
        />
      </div>
      <div className="text-center">
        <div className="mb-2 font-medium text-sm">Extra Large</div>
        <CopyButton
          content="Extra large copy button"
          size={ButtonSize.ICON_XL}
          label="Copy (XL)"
        />
      </div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const buttons = canvas.getAllByRole('button');

    // Test that all size variants are present
    await expect(buttons).toHaveLength(4);

    for (const button of buttons) {
      await expect(button).toBeInTheDocument();
      await expect(button).toHaveAccessibleName();
    }
  },
};

/**
 * ### Button Variants
 *
 * Different visual variants of the CopyButton for various design contexts.
 */
export const ButtonVariants: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-3">
          <h3 className="font-medium text-sm">Light Variants</h3>
          <div className="flex items-center gap-3 rounded-lg border bg-white p-4">
            <CopyButton
              content="Default variant"
              variant={ButtonVariant.DEFAULT}
              label="Copy (Default)"
            />
            <CopyButton
              content="Outline variant"
              variant={ButtonVariant.OUTLINE}
              label="Copy (Outline)"
            />
            <CopyButton
              content="Hoverable variant"
              variant={ButtonVariant.HOVERABLE}
              label="Copy (Hoverable)"
            />
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="font-medium text-sm">Dark Background</h3>
          <div className="flex items-center gap-3 rounded-lg bg-gray-900 p-4">
            <CopyButton
              content="Default on dark"
              variant={ButtonVariant.DEFAULT}
              color={ButtonColor.PRIMARY}
              label="Copy (Primary)"
            />
            <CopyButton
              content="Outline on dark"
              variant={ButtonVariant.OUTLINE}
              color={ButtonColor.SUCCESS}
              label="Copy (Success)"
            />
            <CopyButton
              content="Hoverable on dark"
              variant={ButtonVariant.HOVERABLE}
              color={ButtonColor.NEUTRAL}
              label="Copy (Neutral)"
            />
          </div>
        </div>
      </div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const buttons = canvas.getAllByRole('button');

    // Test that all variant buttons are accessible
    for (const button of buttons) {
      await expect(button).toBeInTheDocument();
      await expect(button).toHaveAccessibleName();
      await expect(button).not.toBeDisabled();
    }
  },
};

/**
 * ## Interactive States
 *
 * Stories demonstrating different states and behaviors of the CopyButton.
 */

/**
 * ### Copy Feedback Demonstration
 *
 * Interactive example showing the copy feedback mechanism with different content types.
 */
export const CopyFeedbackDemo: Story = {
  render: () => {
    const [lastCopied, setLastCopied] = useState<string>('');
    const [copyCount, setCopyCount] = useState(0);

    const copyItems = [
      { label: 'Short Text', content: 'Hello World!' },
      {
        label: 'URL',
        content:
          'https://example.com/very/long/url/path?param=value&another=param',
      },
      {
        label: 'Code Snippet',
        content: 'const copyButton = <CopyButton content="text" />;',
      },
      {
        label: 'JSON Data',
        content: '{"name": "John", "age": 30, "city": "New York"}',
      },
      {
        label: 'Multi-line Text',
        content: 'Line 1\nLine 2\nLine 3\nThis is a longer text block.',
      },
    ];

    // Mock the clipboard API for demonstration
    const handleCopyClick = (content: string) => {
      setLastCopied(content);
      setCopyCount((prev) => prev + 1);
    };

    return (
      <div className="space-y-6">
        <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
          <h3 className="mb-2 font-medium">Copy Activity Monitor</h3>
          <div className="space-y-1 text-sm">
            <div>
              Total copies: <strong>{copyCount}</strong>
            </div>
            <div>
              Last copied:{' '}
              <strong>
                {lastCopied
                  ? `"${lastCopied.substring(0, 50)}${lastCopied.length > 50 ? '...' : ''}"`
                  : 'None'}
              </strong>
            </div>
          </div>
        </div>

        <div className="grid gap-4">
          {copyItems.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between rounded-lg border border-gray-200 p-3 hover:bg-gray-50"
            >
              <div className="mr-4 flex-1">
                <div className="mb-1 font-medium text-gray-900 text-sm">
                  {item.label}
                </div>
                <div className="break-all rounded bg-gray-100 p-2 font-mono text-gray-600 text-xs">
                  {item.content}
                </div>
              </div>
              <div onClick={() => handleCopyClick(item.content)}>
                <CopyButton
                  content={item.content}
                  label={`Copy ${item.label}`}
                  size={ButtonSize.ICON_SM}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="rounded bg-gray-50 p-3 text-gray-500 text-xs">
          <strong>Note:</strong> Click any copy button to see the feedback
          animation. The icon will briefly change to a check mark and the
          activity monitor will update.
        </div>
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const copyButtons = canvas.getAllByRole('button');

    // Test that all copy buttons are present and accessible
    await expect(copyButtons.length).toBeGreaterThan(0);

    for (const button of copyButtons) {
      await expect(button).toBeInTheDocument();
      await expect(button).toHaveAccessibleName();
    }

    // Test interaction with the first copy button
    const firstButton = copyButtons[0];
    await userEvent.click(firstButton);
  },
};

/**
 * ### Disabled State
 *
 * CopyButton in disabled state for contexts where copying should be prevented.
 */
export const DisabledState: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-6">
        <div>
          <h3 className="mb-3 font-medium text-sm">Normal State</h3>
          <div className="flex items-center gap-3">
            <CopyButton
              content="This can be copied"
              label="Copy available content"
            />
            <span className="text-gray-600 text-sm">Ready to copy</span>
          </div>
        </div>

        <div>
          <h3 className="mb-3 font-medium text-sm">Disabled State</h3>
          <div className="flex items-center gap-3">
            <CopyButton
              content="This cannot be copied"
              label="Copy unavailable (disabled)"
              disabled
            />
            <span className="text-gray-500 text-sm">Copy not available</span>
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
        <h4 className="mb-2 font-medium">Use Cases for Disabled State:</h4>
        <ul className="space-y-1 text-sm">
          <li>• Content is loading or not yet available</li>
          <li>• User lacks permission to copy sensitive information</li>
          <li>• Copy functionality is temporarily unavailable</li>
          <li>• Content is empty or invalid</li>
        </ul>
      </div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const buttons = canvas.getAllByRole('button');

    // Test that we have both enabled and disabled buttons
    await expect(buttons).toHaveLength(2);

    const enabledButton = buttons[0];
    const disabledButton = buttons[1];

    // Test enabled button
    await expect(enabledButton).not.toBeDisabled();
    await expect(enabledButton).toHaveAccessibleName();

    // Test disabled button
    await expect(disabledButton).toBeDisabled();
    await expect(disabledButton).toHaveAccessibleName();
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
 * Demonstrates proper keyboard navigation and interaction patterns.
 */
export const KeyboardNavigation: Story = {
  render: () => {
    const [keyboardActions, setKeyboardActions] = useState<string[]>([]);

    const logAction = (action: string) => {
      setKeyboardActions((prev) => [
        ...prev.slice(-4),
        `${new Date().toLocaleTimeString()}: ${action}`,
      ]);
    };

    const copyItems = [
      'First copyable item',
      'Second copyable item',
      'Third copyable item',
    ];

    return (
      <div className="space-y-6">
        <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4">
          <h3 className="mb-2 font-medium">Keyboard Instructions:</h3>
          <ul className="space-y-1 text-sm">
            <li>
              •{' '}
              <kbd className="rounded bg-white px-2 py-1 text-xs shadow">
                Tab
              </kbd>{' '}
              - Navigate between copy buttons
            </li>
            <li>
              •{' '}
              <kbd className="rounded bg-white px-2 py-1 text-xs shadow">
                Enter
              </kbd>{' '}
              or{' '}
              <kbd className="rounded bg-white px-2 py-1 text-xs shadow">
                Space
              </kbd>{' '}
              - Trigger copy action
            </li>
            <li>
              •{' '}
              <kbd className="rounded bg-white px-2 py-1 text-xs shadow">
                Shift+Tab
              </kbd>{' '}
              - Navigate backwards
            </li>
          </ul>
        </div>

        <div className="grid gap-3">
          {copyItems.map((content, index) => (
            <div
              key={index}
              className="flex items-center justify-between rounded-lg border border-gray-300 p-3"
            >
              <div className="flex-1">
                <div className="font-medium text-sm">{content}</div>
                <div className="mt-1 text-gray-500 text-xs">
                  Use keyboard to focus and copy this content
                </div>
              </div>
              <div onClick={() => logAction(`Copied: ${content}`)}>
                <CopyButton
                  content={content}
                  label={`Copy item ${index + 1}`}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-lg bg-gray-50 p-3">
          <h4 className="mb-2 font-medium text-sm">Keyboard Action Log:</h4>
          <div className="max-h-24 space-y-1 overflow-y-auto text-gray-600 text-xs">
            {keyboardActions.length === 0 ? (
              <div>Use keyboard to interact with copy buttons above</div>
            ) : (
              keyboardActions.map((action, index) => (
                <div key={index}>• {action}</div>
              ))
            )}
          </div>
        </div>
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const buttons = canvas.getAllByRole('button');

    // Test keyboard accessibility
    for (const button of buttons) {
      await expect(button).toHaveAttribute('tabindex', '0');
      await expect(button).toBeInTheDocument();
    }

    // Test keyboard navigation
    const firstButton = buttons[0];
    await userEvent.click(firstButton);
    await expect(firstButton).toHaveFocus();

    // Test tab navigation
    await userEvent.keyboard('{Tab}');
    if (buttons[1]) {
      await expect(buttons[1]).toHaveFocus();
    }
  },
};

/**
 * ### Screen Reader Support
 *
 * Demonstrates proper ARIA labeling and state announcements for screen readers.
 */
export const ScreenReaderSupport: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <h3 className="mb-2 font-medium text-sm">Standard Copy Button</h3>
          <CopyButton
            content="Standard content to copy"
            label="Copy standard content to clipboard"
          />
          <div className="mt-1 text-gray-500 text-xs">
            Screen reader announces: "Copy standard content to clipboard,
            button"
          </div>
        </div>

        <div>
          <h3 className="mb-2 font-medium text-sm">Context-Specific Label</h3>
          <CopyButton
            content="https://api.example.com/v1/users"
            label="Copy API endpoint URL"
          />
          <div className="mt-1 text-gray-500 text-xs">
            Screen reader announces: "Copy API endpoint URL, button"
          </div>
        </div>

        <div>
          <h3 className="mb-2 font-medium text-sm">
            With Additional Description
          </h3>
          <div>
            <CopyButton
              content="SECRET_API_KEY_12345"
              label="Copy API key"
              aria-describedby="api-key-help"
            />
            <div id="api-key-help" className="mt-1 text-gray-500 text-xs">
              Keep this API key secure and do not share it publicly
            </div>
          </div>
        </div>
      </div>

      <div className="rounded bg-blue-50 p-4 text-gray-600 text-sm">
        <strong>Screen Reader Features:</strong>
        <ul className="mt-2 space-y-1">
          <li>• Dynamic label updates when copy succeeds/fails</li>
          <li>• Proper button role and accessible name</li>
          <li>• State changes announced automatically</li>
          <li>• Support for additional descriptions via aria-describedby</li>
        </ul>
      </div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const buttons = canvas.getAllByRole('button');

    // Test ARIA attributes
    for (const button of buttons) {
      await expect(button).toHaveAttribute('role', 'button');
      await expect(button).toHaveAccessibleName();
    }

    // Test described button
    const describedButton = buttons[2];
    await expect(describedButton).toHaveAttribute(
      'aria-describedby',
      'api-key-help'
    );

    const description = canvas.getByText(/keep this api key secure/i);
    await expect(description).toBeInTheDocument();
    await expect(description).toHaveAttribute('id', 'api-key-help');
  },
};

/**
 * ## Real-World Examples
 *
 * Stories showing practical applications of the CopyButton component.
 */

/**
 * ### Code Documentation
 *
 * CopyButton integrated into code documentation interface.
 */
export const CodeDocumentation: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <h3 className="mb-2 font-semibold text-lg">Installation</h3>
          <div className="relative">
            <pre className="overflow-x-auto rounded-lg bg-gray-900 p-4 text-gray-100">
              <code>npm install @intlayer/design-system</code>
            </pre>
            <CopyButton
              content="npm install @intlayer/design-system"
              className="absolute top-2 right-2"
              label="Copy installation command"
              color={ButtonColor.NEUTRAL}
            />
          </div>
        </div>

        <div>
          <h3 className="mb-2 font-semibold text-lg">Basic Usage</h3>
          <div className="relative">
            <pre className="overflow-x-auto rounded-lg bg-gray-900 p-4 text-gray-100">
              <code>{`import { CopyButton } from '@intlayer/design-system';

function MyComponent() {
  return (
    <CopyButton 
      content="Hello World!" 
      label="Copy greeting"
    />
  );
}`}</code>
            </pre>
            <CopyButton
              content={`import { CopyButton } from '@intlayer/design-system';

function MyComponent() {
  return (
    <CopyButton 
      content="Hello World!" 
      label="Copy greeting"
    />
  );
}`}
              className="absolute top-2 right-2"
              label="Copy code example"
              color={ButtonColor.NEUTRAL}
            />
          </div>
        </div>

        <div>
          <h3 className="mb-2 font-semibold text-lg">Configuration</h3>
          <div className="relative">
            <pre className="overflow-x-auto rounded-lg bg-gray-900 p-4 text-gray-100">
              <code>{`{
  "name": "@intlayer/design-system",
  "version": "1.0.0",
  "dependencies": {
    "react": "18.0.0",
    "lucide-react": "0.263.0"
  }
}`}</code>
            </pre>
            <CopyButton
              content={`{
  "name": "@intlayer/design-system",
  "version": "1.0.0",
  "dependencies": {
    "react": "18.0.0",
    "lucide-react": "0.263.0"
  }
}`}
              className="absolute top-2 right-2"
              label="Copy package.json configuration"
              color={ButtonColor.NEUTRAL}
            />
          </div>
        </div>
      </div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const copyButtons = canvas.getAllByRole('button');

    // Test that all documentation copy buttons are accessible
    for (const button of copyButtons) {
      await expect(button).toBeInTheDocument();
      await expect(button).toHaveAccessibleName();

      // Code documentation buttons should be positioned absolutely
      const styles = getComputedStyle(button);
      expect(styles.position).toBe('absolute');
    }
  },
};

/**
 * ### API Reference Interface
 *
 * CopyButton in an API reference interface for copying endpoints and examples.
 */
export const APIReferenceInterface: Story = {
  render: () => {
    const [copiedEndpoint, setCopiedEndpoint] = useState<string>('');

    const endpoints = [
      {
        method: 'GET',
        path: '/api/v1/users',
        description: 'Retrieve all users',
        example: 'curl -X GET https://api.example.com/v1/users',
      },
      {
        method: 'POST',
        path: '/api/v1/users',
        description: 'Create a new user',
        example:
          'curl -X POST https://api.example.com/v1/users -d \'{"name":"John"}\'',
      },
      {
        method: 'PUT',
        path: '/api/v1/users/:id',
        description: 'Update user by ID',
        example:
          'curl -X PUT https://api.example.com/v1/users/123 -d \'{"name":"Jane"}\'',
      },
    ];

    return (
      <div className="space-y-6">
        <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
          <h3 className="mb-2 font-medium">API Reference</h3>
          <div className="text-gray-600 text-sm">
            Copy endpoints and curl examples for quick testing.
            {copiedEndpoint && (
              <div className="mt-2 font-medium text-green-600">
                ✓ Copied: {copiedEndpoint}
              </div>
            )}
          </div>
        </div>

        <div className="space-y-4">
          {endpoints.map((endpoint, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-lg border border-gray-200"
            >
              <div className="border-gray-200 border-b bg-gray-50 px-4 py-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span
                      className={`rounded px-2 py-1 font-medium text-xs ${
                        endpoint.method === 'GET'
                          ? 'bg-green-100 text-green-700'
                          : endpoint.method === 'POST'
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-orange-100 text-orange-700'
                      }`}
                    >
                      {endpoint.method}
                    </span>
                    <code className="font-mono text-sm">{endpoint.path}</code>
                  </div>
                  <CopyButton
                    content={`https://api.example.com${endpoint.path}`}
                    label={`Copy ${endpoint.method} endpoint`}
                    size={ButtonSize.ICON_SM}
                    onClick={() => setCopiedEndpoint(endpoint.path)}
                  />
                </div>
                <div className="mt-1 text-gray-600 text-sm">
                  {endpoint.description}
                </div>
              </div>

              <div className="p-4">
                <div className="mb-2 flex items-center justify-between">
                  <h4 className="font-medium text-sm">cURL Example</h4>
                  <CopyButton
                    content={endpoint.example}
                    label="Copy cURL example"
                    size={ButtonSize.ICON_SM}
                    onClick={() => setCopiedEndpoint(endpoint.example)}
                  />
                </div>
                <pre className="overflow-x-auto rounded bg-gray-900 p-3 text-gray-100 text-sm">
                  <code>{endpoint.example}</code>
                </pre>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const copyButtons = canvas.getAllByRole('button');

    // Should have 2 copy buttons per endpoint (endpoint + curl)
    const expectedButtons = 6;
    await expect(copyButtons).toHaveLength(expectedButtons);

    for (const button of copyButtons) {
      await expect(button).toBeInTheDocument();
      await expect(button).toHaveAccessibleName();
      await expect(button).not.toBeDisabled();
    }

    // Test interaction with the first endpoint copy button
    const firstEndpointButton = copyButtons[0];
    await userEvent.click(firstEndpointButton);
  },
};
