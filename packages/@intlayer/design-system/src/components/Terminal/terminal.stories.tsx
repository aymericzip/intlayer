import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';
import { useState } from 'react';
import { Terminal } from './Terminal';

/**
 * Terminal Component Stories
 *
 * The Terminal component displays command-line interface output with support for
 * ANSI color codes, interactive input, and customizable styling.
 *
 * ## Key Features
 * - **ANSI Color Support**: Parses and renders ANSI color codes for styled terminal output
 * - **Interactive Input**: Built-in command input field with Enter key submission
 * - **Dark/Light Mode**: Automatic color adaptation for different themes
 * - **Closeable Tabs**: Optional close button for tab-based terminal interfaces
 * - **Custom Titles**: Configurable tab title (defaults to 'bash')
 * - **Scrollable Content**: Handles long output with hidden scrollbars
 *
 * ## When to Use
 * - Displaying command-line output or logs
 * - Interactive terminal simulations
 * - Code examples with syntax highlighting
 * - Build and deployment logs
 * - CLI documentation and tutorials
 */
const meta = {
  title: 'Components/Terminal',
  component: Terminal,
  parameters: {
    docs: {
      description: {
        component: `
A terminal emulator component that renders command-line output with ANSI color code support.

### ANSI Color Support:
The component supports a wide range of ANSI color codes including:
- Basic colors (red, green, blue, yellow, cyan, magenta)
- Extended colors (grey variants, orange, amber)
- Text formatting (bold)
- Color reset codes

### Interactive Features:
- **Command Input**: Type commands and press Enter to submit
- **Event Handling**: \`onSubmit\` callback receives the entered command
- **Tab Management**: Optional close button with \`onClose\` callback

### Styling:
- Automatic adaptation between light and dark modes
- Hidden scrollbars for clean appearance
- macOS-style window controls (red, yellow, green dots)
- Monospace font for authentic terminal look

### Use Cases:
- Interactive CLI demonstrations
- Build process visualization
- Log file viewers
- Code execution output
- Installation guides
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      description: 'Terminal output text with optional ANSI color codes',
      control: 'text',
    },
    title: {
      description: 'Tab title displayed in the terminal header',
      control: 'text',
    },
    isDarkMode: {
      description: 'Enables dark mode color scheme for ANSI codes',
      control: 'boolean',
    },
    onClose: {
      description:
        'Callback when close button is clicked (shows close button if provided)',
      action: 'closed',
    },
    onSubmit: {
      description: 'Callback when Enter key is pressed in input field',
      action: 'submitted',
    },
  },
} satisfies Meta<typeof Terminal>;

export default meta;
type Story = StoryObj<typeof Terminal>;

/**
 * ## Basic Examples
 *
 * These stories demonstrate the core functionality and appearance of the Terminal component.
 */

/**
 * ### Simple Output
 *
 * Basic terminal with plain text output, no colors or special formatting.
 */
export const SimpleOutput: Story = {
  args: {
    children: `$ ls -la
total 48
drwxr-xr-x  12 user  staff   384 Dec  4 10:30 .
drwxr-xr-x   5 user  staff   160 Dec  3 14:20 ..
-rw-r--r--   1 user  staff  1234 Dec  4 09:15 README.md
-rw-r--r--   1 user  staff  5678 Dec  4 10:30 package.json`,
    title: 'bash',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Check terminal content is rendered
    await expect(canvas.getByText(/README.md/)).toBeInTheDocument();
    await expect(canvas.getByText(/package.json/)).toBeInTheDocument();

    // Check tab title
    await expect(canvas.getByText('bash')).toBeInTheDocument();
  },
};

/**
 * ### With ANSI Colors
 *
 * Terminal output with ANSI color codes for syntax highlighting and visual emphasis.
 */
export const WithAnsiColors: Story = {
  args: {
    children: `\x1b[32m✓\x1b[0m Build completed successfully!
\x1b[34mℹ\x1b[0m Starting development server...
\x1b[33m⚠\x1b[0m Warning: Deprecated API usage detected
\x1b[31m✗\x1b[0m Error: Module not found
\x1b[90m[DEBUG]\x1b[0m Internal state: \x1b[1m{ ready: true }\x1b[0m`,
    title: 'build-output',
    isDarkMode: false,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Check content is rendered
    await expect(
      canvas.getByText(/Build completed successfully/)
    ).toBeInTheDocument();
    await expect(
      canvas.getByText(/Error: Module not found/)
    ).toBeInTheDocument();

    // Check tab title
    await expect(canvas.getByText('build-output')).toBeInTheDocument();
  },
};

/**
 * ### Dark Mode
 *
 * Terminal with dark mode color scheme applied to ANSI codes.
 */
export const DarkMode: Story = {
  args: {
    children: `\x1b[32m$ npm install intlayer\x1b[0m
\x1b[90mInstalling dependencies...\x1b[0m
\x1b[34m→\x1b[0m Fetching packages
\x1b[32m✓\x1b[0m Successfully installed \x1b[1m245\x1b[0m packages
\x1b[36mℹ\x1b[0m Total size: \x1b[1m42.3 MB\x1b[0m`,
    title: 'terminal',
    isDarkMode: true,
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

/**
 * ### Custom Title
 *
 * Terminal with a custom tab title for specific shell types or contexts.
 */
export const CustomTitle: Story = {
  args: {
    children: `zsh: command started at Thu Dec 4 10:30:45 PST 2026
> Running tests...
> All tests passed!`,
    title: 'zsh',
  },
};

/**
 * ## Interactive Features
 *
 * Stories demonstrating interactive capabilities and event handling.
 */

/**
 * ### With Close Button
 *
 * Terminal with a close button in the tab, useful for multi-tab interfaces.
 */
export const WithCloseButton: Story = {
  args: {
    children: `$ echo "This terminal can be closed"
This terminal can be closed
$`,
    title: 'closeable-terminal',
    onClose: () => alert('Terminal closed!'),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Find close button
    const closeButton = canvas.getByRole('button', { name: /close tab/i });
    await expect(closeButton).toBeInTheDocument();

    // Test close button is clickable
    await expect(closeButton).not.toBeDisabled();
  },
};

/**
 * ### Interactive Terminal
 *
 * Fully interactive terminal that accepts commands and displays output.
 */
export const InteractiveTerminal: Story = {
  render: () => {
    const [output, setOutput] = useState(`Welcome to Interactive Terminal!
Type 'help' for available commands.
$ `);

    const handleSubmit = (command: string) => {
      let response = '';
      switch (command.toLowerCase().trim()) {
        case 'help':
          response = `Available commands:
  help     - Show this help message
  date     - Display current date
  echo     - Echo back your message
  clear    - Clear terminal (not implemented)`;
          break;
        case 'date':
          response = new Date().toString();
          break;
        case 'clear':
          setOutput('$ ');
          return;
        default:
          if (command.toLowerCase().startsWith('echo ')) {
            response = command.substring(5);
          } else {
            response = `\x1b[31mCommand not found: ${command}\x1b[0m\nType 'help' for available commands.`;
          }
      }

      setOutput((prev) => `${prev}${command}\n${response}\n$ `);
    };

    return (
      <Terminal title="interactive-bash" onSubmit={handleSubmit}>
        {output}
      </Terminal>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Find input field
    const input = canvas.getByRole('textbox');
    await expect(input).toBeInTheDocument();

    // Type a command
    await userEvent.type(input, 'help');
    await userEvent.keyboard('{Enter}');

    // Check help message appears
    await expect(canvas.getByText(/Available commands/)).toBeInTheDocument();

    // Type date command
    await userEvent.type(input, 'date');
    await userEvent.keyboard('{Enter}');
  },
};

/**
 * ## Advanced Use Cases
 *
 * Complex scenarios demonstrating advanced terminal usage.
 */

/**
 * ### Build Process Output
 *
 * Simulates a typical build process with colored status indicators.
 */
export const BuildProcessOutput: Story = {
  args: {
    children: `\x1b[1m> Building application...\x1b[0m

\x1b[34m[1/5]\x1b[0m Cleaning output directory... \x1b[32m✓\x1b[0m
\x1b[34m[2/5]\x1b[0m Compiling TypeScript... \x1b[32m✓\x1b[0m
\x1b[34m[3/5]\x1b[0m Bundling with webpack... \x1b[32m✓\x1b[0m
\x1b[34m[4/5]\x1b[0m Optimizing assets... \x1b[32m✓\x1b[0m
\x1b[34m[5/5]\x1b[0m Generating source maps... \x1b[32m✓\x1b[0m

\x1b[1m\x1b[32m✓ Build completed in 12.3s\x1b[0m

\x1b[90mOutput: dist/
Size: 2.4 MB (gzipped: 856 KB)\x1b[0m`,
    title: 'build',
  },
};

/**
 * ### Git Command Output
 *
 * Shows Git command output with ANSI colors for status indicators.
 */
export const GitCommandOutput: Story = {
  args: {
    children: `$ git status
On branch \x1b[32mmain\x1b[0m
Your branch is up to date with '\x1b[31morigin/main\x1b[0m'.

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
        \x1b[31mmodified:   src/components/Terminal.tsx\x1b[0m
        \x1b[31mmodified:   src/stories/terminal.stories.tsx\x1b[0m

Untracked files:
  (use "git add <file>..." to include in what will be committed)
        \x1b[31msrc/components/Terminal/\x1b[0m

no changes added to commit (use "git add" and/or "git commit -a")`,
    title: 'git-bash',
  },
};

/**
 * ### NPM Install Output
 *
 * Displays typical npm package installation output with progress indicators.
 */
export const NpmInstallOutput: Story = {
  args: {
    children: `$ npm install @intlayer/core react react-dom

\x1b[90madded 248 packages, and audited 249 packages in 8s\x1b[0m

\x1b[90m42 packages are looking for funding\x1b[0m
\x1b[90m  run \`npm fund\` for details\x1b[0m

\x1b[32mfound 0 vulnerabilities\x1b[0m`,
    title: 'npm',
  },
};

/**
 * ### Test Runner Output
 *
 * Shows test execution results with pass/fail indicators.
 */
export const TestRunnerOutput: Story = {
  args: {
    children: `\x1b[1m\x1b[32m PASS\x1b[0m  src/components/Terminal.test.tsx
\x1b[32m  ✓\x1b[0m renders without crashing (23ms)
\x1b[32m  ✓\x1b[0m displays provided text content (12ms)
\x1b[32m  ✓\x1b[0m handles ANSI color codes (18ms)
\x1b[32m  ✓\x1b[0m calls onSubmit when Enter is pressed (34ms)
\x1b[32m  ✓\x1b[0m calls onClose when close button clicked (15ms)

\x1b[1m\x1b[31m FAIL\x1b[0m  src/utils/parser.test.tsx
\x1b[32m  ✓\x1b[0m parses simple text (8ms)
\x1b[31m  ✗\x1b[0m handles nested ANSI codes (42ms)
    \x1b[90mExpected: "\x1b[34mblue\x1b[0m"
    Received: "blue"\x1b[0m

\x1b[1mTest Suites:\x1b[0m \x1b[31m1 failed\x1b[0m, \x1b[32m1 passed\x1b[0m, 2 total
\x1b[1mTests:\x1b[0m       \x1b[31m1 failed\x1b[0m, \x1b[32m6 passed\x1b[0m, 7 total
\x1b[1mTime:\x1b[0m        2.456s`,
    title: 'jest',
  },
};

/**
 * ### Long Output with Scrolling
 *
 * Terminal with extensive output to demonstrate scrolling behavior.
 */
export const LongOutputWithScrolling: Story = {
  args: {
    children: Array.from(
      { length: 50 },
      (_, i) =>
        `\x1b[90m[${String(i + 1).padStart(3, '0')}]\x1b[0m Processing item ${i + 1} ${i % 3 === 0 ? '\x1b[32m✓\x1b[0m' : '\x1b[34m→\x1b[0m'}`
    ).join('\n'),
    title: 'long-output',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Terminal with many lines of output to demonstrate scrolling behavior. The scrollbar is hidden for a cleaner look.',
      },
    },
  },
};

/**
 * ### Empty Terminal
 *
 * Terminal with no output, just the input prompt.
 */
export const EmptyTerminal: Story = {
  args: {
    children: '$ ',
    title: 'empty-terminal',
    onSubmit: (cmd) => console.log('Command:', cmd),
  },
};

/**
 * ### Multiple Lines Input
 *
 * Terminal showing multi-line command execution.
 */
export const MultiLineInput: Story = {
  args: {
    children: `$ cat << EOF > config.json
{
  "name": "intlayer",
  "version": "1.0.0",
  "type": "module"
}
EOF
$ cat config.json
{
  "name": "intlayer",
  "version": "1.0.0",
  "type": "module"
}`,
    title: 'bash',
  },
};

/**
 * ## Accessibility
 *
 * Stories demonstrating accessibility features and keyboard navigation.
 */

/**
 * ### Keyboard Navigation
 *
 * Tests keyboard interaction with the terminal input field.
 */
export const KeyboardNavigation: Story = {
  args: {
    children: 'Type a command and press Enter to submit.\n$ ',
    title: 'keyboard-test',
    onSubmit: (cmd) => alert(`Command submitted: ${cmd}`),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Find input field
    const input = canvas.getByRole('textbox');
    await expect(input).toBeInTheDocument();

    // Test typing
    await userEvent.type(input, 'ls -la');
    await expect(input).toHaveValue('ls -la');

    // Test Enter key (will trigger alert in this case)
    // await userEvent.keyboard('{Enter}');
    // Note: Commented out to avoid alert in automated testing
  },
};
