import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';
import { InformationTag } from '.';

const meta: Meta<typeof InformationTag> = {
  title: 'Components/InformationTag',
  component: InformationTag,
  tags: ['autodocs'],
  argTypes: {
    children: {
      description: 'Content inside the information tag',
      control: 'text',
      defaultValue: 'This is an info note',
    },
    className: {
      description: 'Additional CSS classes',
      control: 'text',
    },
    title: {
      description: 'Tooltip text that appears on hover',
      control: 'text',
    },
    onClick: {
      description: 'Click event handler',
      action: 'clicked',
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'A lightweight component for displaying informational text with a distinctive info icon. Perfect for contextual hints, supplementary information, or subtle guidance.',
      },
    },
  },
} satisfies Meta<typeof InformationTag>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic Examples
export const Default: Story = {
  args: {
    children: 'This is helpful information for the user',
  },
  parameters: {
    docs: {
      description: {
        story:
          'The default appearance with standard styling and informational text.',
      },
    },
  },
};

export const ShortMessage: Story = {
  args: {
    children: 'Required field',
  },
  parameters: {
    docs: {
      description: {
        story: 'Compact information tag with brief message.',
      },
    },
  },
};

export const LongMessage: Story = {
  args: {
    children:
      'This is a much longer informational message that might wrap to multiple lines depending on the container width',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Information tag with longer text content that demonstrates text wrapping behavior.',
      },
    },
  },
};

// Color Variations
export const SuccessStyle: Story = {
  args: {
    children: 'Changes saved successfully',
    className: 'text-green-600',
  },
  parameters: {
    docs: {
      description: {
        story: 'Success-themed information tag with green coloring.',
      },
    },
  },
};

export const WarningStyle: Story = {
  args: {
    children: 'Please review your input',
    className: 'text-yellow-600 font-medium',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Warning-themed information tag with yellow coloring and medium font weight.',
      },
    },
  },
};

export const ErrorStyle: Story = {
  args: {
    children: 'This field contains invalid data',
    className: 'text-red-600 font-medium',
  },
  parameters: {
    docs: {
      description: {
        story: 'Error-themed information tag with red coloring.',
      },
    },
  },
};

export const InfoStyle: Story = {
  args: {
    children: 'Pro tip: Use keyboard shortcuts for faster navigation',
    className: 'text-blue-600',
  },
  parameters: {
    docs: {
      description: {
        story: 'Info-themed information tag with blue coloring.',
      },
    },
  },
};

// Size Variations
export const LargerText: Story = {
  args: {
    children: 'Important system notification',
    className: 'text-sm text-neutral-600 font-medium',
  },
  parameters: {
    docs: {
      description: {
        story: 'Larger text variant for more prominent information.',
      },
    },
  },
};

export const SmallerText: Story = {
  args: {
    children: 'Subtle hint',
    className: 'text-[10px] text-neutral-300',
  },
  parameters: {
    docs: {
      description: {
        story: 'Very small text variant for minimal, subtle information.',
      },
    },
  },
};

// Interactive Examples
export const WithTooltip: Story = {
  args: {
    children: 'Hover for more details',
    title:
      'This tooltip provides additional context about the information displayed',
    className: 'cursor-help',
  },
  parameters: {
    docs: {
      description: {
        story: 'Information tag with tooltip that appears on hover.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const tag = canvas.getByText('ⓘ Hover for more details');

    // Test tooltip presence
    expect(tag.title).toBe(
      'This tooltip provides additional context about the information displayed'
    );

    // Test cursor style
    expect(tag).toHaveClass('cursor-help');
  },
};

export const Clickable: Story = {
  args: {
    children: 'Click for more information',
    className:
      'cursor-pointer text-blue-600 hover:text-blue-800 transition-colors',
    onClick: () => alert('Information tag clicked!'),
  },
  parameters: {
    docs: {
      description: {
        story: 'Clickable information tag that responds to user interaction.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const tag = canvas.getByText('ⓘ Click for more information');

    // Test cursor style
    expect(tag).toHaveClass('cursor-pointer');
    expect(tag).toHaveClass('text-blue-600');

    // Test hover state (simulated)
    await userEvent.hover(tag);
  },
};

// Context Usage Examples
export const FormFieldContext: Story = {
  render: (args) => (
    <div className="space-y-2">
      <label
        htmlFor="email-input"
        className="block font-medium text-gray-700 text-sm"
      >
        Email Address
      </label>
      <input
        id="email-input"
        type="email"
        placeholder="your@email.com"
        className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
      />
      <InformationTag {...args} />
    </div>
  ),
  args: {
    children: "We'll never share your email address",
  },
  parameters: {
    docs: {
      description: {
        story:
          'Information tag used in the context of a form field to provide additional guidance.',
      },
    },
  },
};

export const StatusIndicator: Story = {
  render: (args) => (
    <div className="rounded-lg bg-gray-50 p-4">
      <h3 className="mb-2 font-semibold text-lg">Document Status</h3>
      <div className="space-y-1">
        <div className="text-green-600">✓ Saved</div>
        <InformationTag {...args} />
      </div>
    </div>
  ),
  args: {
    children: 'Last saved 2 minutes ago',
    className: 'text-gray-500',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Information tag used as a status indicator with contextual information.',
      },
    },
  },
};

export const FeatureAnnouncement: Story = {
  render: (args) => (
    <div className="border-blue-500 border-l-4 bg-blue-50 p-4">
      <h4 className="font-medium text-blue-800">New Feature Available</h4>
      <p className="mt-1 text-blue-700">
        Try our new keyboard shortcuts for faster navigation.
      </p>
      <InformationTag {...args} />
    </div>
  ),
  args: {
    children: 'Press Ctrl+K to open the command palette',
    className: 'text-blue-600 mt-2',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Information tag used within a feature announcement or notification.',
      },
    },
  },
};

// Accessibility Testing
export const AccessibilityTest: Story = {
  args: {
    children: 'Screen reader accessible information',
    title: 'Additional context for assistive technologies',
    role: 'note',
    'aria-label': 'Important information about this section',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Information tag with comprehensive accessibility attributes for screen readers.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const tag = canvas.getByText('ⓘ Screen reader accessible information');

    // Test accessibility attributes
    expect(tag).toHaveAttribute(
      'title',
      'Additional context for assistive technologies'
    );
    expect(tag).toHaveAttribute('role', 'note');
    expect(tag).toHaveAttribute(
      'aria-label',
      'Important information about this section'
    );

    // Test that content is properly readable
    expect(tag.textContent).toContain('Screen reader accessible information');
    expect(tag.textContent).toContain('ⓘ');
  },
};

export const MultipleInformation: Story = {
  render: (args) => (
    <div className="space-y-3">
      <InformationTag className="text-green-600">
        ✓ Email verified
      </InformationTag>
      <InformationTag className="text-yellow-600">
        ⚠ Phone number pending verification
      </InformationTag>
      <InformationTag className="text-blue-600">
        💡 Complete your profile for better recommendations
      </InformationTag>
      <InformationTag {...args} />
    </div>
  ),
  args: {
    children: 'All changes are automatically saved',
    className: 'text-gray-600',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Multiple information tags used together to show different types of status information.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify all information tags are rendered
    expect(canvas.getByText('ⓘ ✓ Email verified')).toBeInTheDocument();
    expect(
      canvas.getByText('ⓘ ⚠ Phone number pending verification')
    ).toBeInTheDocument();
    expect(
      canvas.getByText('ⓘ 💡 Complete your profile for better recommendations')
    ).toBeInTheDocument();
    expect(
      canvas.getByText('ⓘ All changes are automatically saved')
    ).toBeInTheDocument();
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
        story: 'Information tag with empty content (shows only the info icon).',
      },
    },
  },
};

export const SpecialCharacters: Story = {
  args: {
    children: 'Special chars: äöü ñ ñç 中文 العربية 🎉 ✨ & <script>',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Information tag with special characters, emoji, and potentially harmful content (properly escaped).',
      },
    },
  },
};
