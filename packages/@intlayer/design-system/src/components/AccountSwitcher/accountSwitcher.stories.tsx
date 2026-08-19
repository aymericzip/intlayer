import type { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from '@storybook/test';
import { AccountSwitcher, type DeviceSession } from './index';

// ---------------------------------------------------------------------------
// Mock data
// ---------------------------------------------------------------------------

const mockSessions: DeviceSession[] = [
  {
    token: 'token-1',
    user: {
      id: '1',
      name: 'Alice Martin',
      email: 'alice@example.com',
      image: null,
    },
  },
  {
    token: 'token-2',
    user: {
      id: '2',
      name: 'Bob Chen',
      email: 'bob@company.org',
      image: null,
    },
  },
  {
    token: 'token-3',
    user: {
      id: '3',
      name: null,
      email: 'dev@intlayer.org',
      image: null,
    },
  },
];

const manySessions: DeviceSession[] = [
  ...mockSessions,
  {
    token: 'token-4',
    user: {
      id: '4',
      name: 'Diana Prince',
      email: 'diana@company.org',
      image: null,
    },
  },
  {
    token: 'token-5',
    user: {
      id: '5',
      name: 'Eve Nakamura',
      email: 'eve.nakamura@longdomainname.co.jp',
      image: null,
    },
  },
  {
    token: 'token-6',
    user: {
      id: '6',
      name: 'Frank Müller',
      email: 'frank@startup.io',
      image: null,
    },
  },
  {
    token: 'token-7',
    user: {
      id: '7',
      name: null,
      email: 'admin@intlayer.org',
      image: null,
    },
  },
];

/**
 * AccountSwitcher displays a list of signed-in device sessions and lets the
 * user switch between them, sign out individually, or add another account.
 *
 * ## Features
 * - **Multi-session list**: Shows all sessions on this device with avatar, name, and email
 * - **Active indicator**: Marks the currently active session with a check icon
 * - **Switch accounts**: Click any row to switch to that session
 * - **Sign out per session**: Hover to reveal a sign-out button for each session
 * - **Add account**: Optional call-to-action to sign into another account
 * - **Loading state**: Reduced opacity and disabled interactions while switching
 * - **Accessibility**: Proper ARIA roles, keyboard navigation, and focus management
 */
const meta: Meta<typeof AccountSwitcher> = {
  title: 'Components/AccountSwitcher',
  component: AccountSwitcher,
  parameters: {
    docs: {
      description: {
        component: `
The AccountSwitcher is a reusable, data-agnostic component that renders a list of
signed-in sessions. It does **not** fetch sessions itself — pass in \`sessions\` and
callbacks so it can be used in any context (app, editor, Storybook, tests).

### Design
- Built on the existing Avatar component for visual consistency.
- Each row is a button with \`role="option"\` inside a \`role="listbox"\` container.
- Sign-out buttons appear on hover to keep the default view clean.
- Fully keyboard-navigable with visible focus indicators.
        `,
      },
    },
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    sessions: {
      description: 'All sessions currently signed in on this device',
      control: false,
    },
    activeSessionToken: {
      description: 'The token of the currently active session',
      control: { type: 'text' },
    },
    onSwitch: {
      description: 'Called when the user picks a different session',
      action: 'switched',
    },
    onAddAccount: {
      description: 'Called when the user clicks "Add another account"',
      action: 'add-account',
    },
    onSignOut: {
      description: 'Called when the user signs out of a specific session',
      action: 'sign-out',
    },
    isSwitching: {
      description: 'Whether a switch is currently in progress',
      control: { type: 'boolean' },
      table: { defaultValue: { summary: 'false' } },
    },
    className: {
      description: 'Additional CSS classes',
      control: { type: 'text' },
    },
  },
  args: {
    sessions: mockSessions,
    activeSessionToken: 'token-2',
    isSwitching: false,
  },
};

export default meta;
type Story = StoryObj<typeof AccountSwitcher>;

// ---------------------------------------------------------------------------
// Stories
// ---------------------------------------------------------------------------

/**
 * Default state with three accounts, second one active.
 */
export const Default: Story = {
  args: {
    sessions: mockSessions,
    activeSessionToken: 'token-2',
    onSwitch: fn(),
    onAddAccount: fn(),
    onSignOut: fn(),
  },
  parameters: {
    docs: {
      description: {
        story:
          'Three signed-in accounts with the second one marked as active. Hover over a row to reveal the sign-out button.',
      },
    },
  },
};

/**
 * Only one account signed in — the simplest case.
 */
export const SingleAccount: Story = {
  args: {
    sessions: [mockSessions[0]!],
    activeSessionToken: 'token-1',
    onSwitch: fn(),
    onAddAccount: fn(),
    onSignOut: fn(),
  },
  parameters: {
    docs: {
      description: {
        story:
          'A single signed-in account. The "Add another account" button invites the user to sign into a second account.',
      },
    },
  },
};

/**
 * Loading state while switching accounts.
 */
export const Switching: Story = {
  args: {
    sessions: mockSessions,
    activeSessionToken: 'token-1',
    isSwitching: true,
    onSwitch: fn(),
    onAddAccount: fn(),
    onSignOut: fn(),
  },
  parameters: {
    docs: {
      description: {
        story:
          'When `isSwitching` is true the list dims and becomes non-interactive, with a small loader shown below the sessions.',
      },
    },
  },
};

/**
 * No sign-out callback — the per-session sign-out buttons are hidden.
 */
export const WithoutSignOut: Story = {
  args: {
    sessions: mockSessions,
    activeSessionToken: 'token-2',
    onSwitch: fn(),
    onAddAccount: fn(),
  },
  parameters: {
    docs: {
      description: {
        story:
          'When `onSignOut` is omitted, no sign-out buttons appear. Useful if the host app handles sign-out elsewhere.',
      },
    },
  },
};

/**
 * No add-account callback — the "Add another account" row is hidden.
 */
export const WithoutAddAccount: Story = {
  args: {
    sessions: mockSessions,
    activeSessionToken: 'token-2',
    onSwitch: fn(),
    onSignOut: fn(),
  },
  parameters: {
    docs: {
      description: {
        story:
          'When `onAddAccount` is omitted, the "Add another account" row and divider are hidden.',
      },
    },
  },
};

/**
 * Stress test with many accounts.
 */
export const ManyAccounts: Story = {
  args: {
    sessions: manySessions,
    activeSessionToken: 'token-3',
    onSwitch: fn(),
    onAddAccount: fn(),
    onSignOut: fn(),
  },
  decorators: [
    (Story) => (
      <div className="max-h-80 overflow-y-auto rounded-xl border border-neutral/20 p-1">
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story:
          'Seven accounts to demonstrate overflow behaviour. Wrap in a scrollable container as needed.',
      },
    },
  },
};

/**
 * Interaction test — verifies switch and add-account callbacks fire correctly.
 */
export const InteractionTest: Story = {
  args: {
    sessions: mockSessions,
    activeSessionToken: 'token-2',
    onSwitch: fn(),
    onAddAccount: fn(),
    onSignOut: fn(),
  },
  parameters: {
    docs: {
      description: {
        story:
          'Automated interaction test that clicks a non-active session row and the add-account button, then asserts the correct callbacks were invoked.',
      },
    },
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    // Click the first (non-active) session row to switch
    const aliceRow = canvas.getByRole('option', {
      name: /switch to alice/i,
    });
    await expect(aliceRow).toBeInTheDocument();
    await expect(aliceRow).toHaveAttribute('aria-selected', 'false');
    await userEvent.click(aliceRow);
    expect(args.onSwitch).toHaveBeenCalledWith('token-1');

    // Click the "Add another account" button
    const addButton = canvas.getByRole('button', {
      name: /add another account/i,
    });
    await expect(addButton).toBeInTheDocument();
    await userEvent.click(addButton);
    expect(args.onAddAccount).toHaveBeenCalled();

    // Verify the active session has aria-selected="true"
    const bobRow = canvas.getByRole('option', { name: /switch to bob/i });
    await expect(bobRow).toHaveAttribute('aria-selected', 'true');
  },
};
