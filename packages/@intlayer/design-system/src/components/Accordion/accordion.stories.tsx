import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { Accordion, type AccordionProps } from './Accordion';

const SampleContent = () => (
  <div className="space-y-2 p-4">
    <p>This is the accordion content that can be expanded and collapsed.</p>
    <p>It supports rich content including:</p>
    <ul className="ml-4 list-disc">
      <li>Lists</li>
      <li>Links</li>
      <li>Images</li>
      <li>Other components</li>
    </ul>
    <button type="button" className="rounded bg-blue-500 px-3 py-1 text-white">
      Interactive Button
    </button>
  </div>
);

const LongContentComponent = () => (
  <div className="space-y-4 p-4">
    {Array.from({ length: 10 }, (_, i) => (
      <p key={i}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </p>
    ))}
  </div>
);

const meta: Meta<AccordionProps> = {
  title: 'Components/Accordion',
  component: Accordion,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
The Accordion component provides expandable/collapsible content sections. It supports both controlled and uncontrolled modes, keyboard navigation, and full accessibility features.

## Features
- **Controlled/Uncontrolled**: Use \`isOpen\` prop for controlled mode or \`defaultIsOpen\` for uncontrolled
- **Accessible**: Full ARIA support with proper roles and states
- **Keyboard Navigation**: Enter/Space keys to toggle
- **Customizable**: Custom styling for header and content
- **Smooth Animations**: Built-in expand/collapse animations

## Usage
\`\`\`jsx

<Accordion header="Section Title" defaultIsOpen={false}>
  <p>Content goes here</p>
</Accordion>

<Accordion 
  header="Controlled Section"
  isOpen={isOpen}
  onToggle={setIsOpen}
>
  <p>Controlled content</p>
</Accordion>
\`\`\`
        `,
      },
    },

    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'dark', value: '#1a1a1a' },
        { name: 'gray', value: '#f5f5f5' },
      ],
    },
  },

  decorators: [
    (Story) => (
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
  argTypes: {
    header: {
      control: 'text',
      description: 'The content displayed in the accordion header',
      table: {
        type: { summary: 'ReactNode' },
        defaultValue: { summary: 'undefined' },
      },
    },
    children: {
      control: false,
      description: 'The collapsible content inside the accordion',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
    isOpen: {
      control: 'boolean',
      description: 'Controls whether the accordion is open (controlled mode)',
      table: {
        type: { summary: 'boolean | undefined' },
        defaultValue: { summary: 'undefined' },
      },
    },
    defaultIsOpen: {
      control: 'boolean',
      description: 'Default open state (uncontrolled mode)',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    onToggle: {
      action: 'toggled',
      description: 'Called when the accordion state changes',
      table: {
        type: { summary: '(isOpen: boolean) => void' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the accordion interaction',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    contentClassName: {
      control: 'text',
      description: 'Custom class for the content container',
      table: {
        type: { summary: 'string' },
      },
    },
    headerClassName: {
      control: 'text',
      description: 'Custom class for the header container',
      table: {
        type: { summary: 'string' },
      },
    },
    'aria-label': {
      control: 'text',
      description: 'Accessible label for screen readers',
      table: {
        type: { summary: 'string' },
      },
    },
    contentId: {
      control: 'text',
      description: 'ID for the accordion content (for aria-controls)',
      table: {
        type: { summary: 'string' },
      },
    },
  },

  args: {
    header: 'Accordion Header',
    defaultIsOpen: false,
    disabled: false,
  },
} satisfies Meta<AccordionProps>;

export default meta;
type Story = StoryObj<AccordionProps>;

export const Default: Story = {
  args: {
    children: <SampleContent />,
  },
};

export const DefaultOpen: Story = {
  args: {
    header: 'Default Open Accordion',
    defaultIsOpen: true,
    children: <SampleContent />,
  },
  parameters: {
    docs: {
      description: {
        story: 'Accordion that starts in an open state by default.',
      },
    },
  },
};

export const Disabled: Story = {
  args: {
    header: 'Disabled Accordion',
    disabled: true,
    children: <SampleContent />,
  },
  parameters: {
    docs: {
      description: {
        story: 'Accordion that cannot be interacted with.',
      },
    },
  },
};

export const LongContent: Story = {
  args: {
    header: 'Long Content Accordion',
    children: <LongContentComponent />,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Accordion with a large amount of content to test scrolling and performance.',
      },
    },
  },
};

export const RichContent: Story = {
  args: {
    header: 'Rich Content Accordion',
    children: (
      <div className="p-4">
        <h3 className="mb-2 font-bold text-lg">Rich Content Example</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <img
              src="https://picsum.photos/200/150"
              alt="Sample"
              className="w-full rounded"
            />
          </div>
          <div>
            <p className="mb-2">This accordion contains:</p>
            <ul className="space-y-1">
              <li>✅ Images</li>
              <li>✅ Complex layouts</li>
              <li>✅ Interactive elements</li>
              <li>✅ Styled content</li>
            </ul>
          </div>
        </div>
        <div className="mt-4 space-x-2">
          <button className="rounded bg-green-500 px-3 py-1 text-white">
            Primary
          </button>
          <button className="rounded bg-gray-500 px-3 py-1 text-white">
            Secondary
          </button>
        </div>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          'Accordion containing rich content with images, grids, and interactive elements.',
      },
    },
  },
};

export const CustomStyling: Story = {
  args: {
    header: 'Custom Styled Accordion',
    headerClassName:
      'bg-blue-100 hover:bg-blue-200 border-2 border-blue-300 rounded-t-lg',
    contentClassName:
      'border-x-2 border-b-2 border-blue-300 rounded-b-lg bg-blue-50',
    children: (
      <div className="p-4">
        <p>
          This accordion has custom styling applied to both header and content.
        </p>
        <p>
          The header has a blue background with borders, and the content has
          matching borders.
        </p>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          'Accordion with custom CSS classes applied to header and content containers.',
      },
    },
  },
};

export const WithAriaLabel: Story = {
  args: {
    header: 'Accessible Accordion',
    'aria-label': 'Section containing frequently asked questions',
    children: (
      <div className="p-4">
        <h4>What is this accordion for?</h4>
        <p>
          This accordion demonstrates proper accessibility features including
          ARIA labels and keyboard navigation.
        </p>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Accordion with proper ARIA labeling for screen readers.',
      },
    },
  },
};

export const InteractionTest: Story = {
  args: {
    header: 'Click to Test Interaction',
    children: (
      <div className="p-4">
        <p>This story demonstrates the accordion's interactive behavior.</p>
        <button
          data-testid="inner-button"
          className="rounded bg-purple-500 px-3 py-1 text-white"
        >
          Inner Button
        </button>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          'Tests the complete interaction flow of opening, using content, and closing the accordion. This story includes automated testing that runs when viewed.',
      },
    },
  },
};

export const ControlledMode: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
      <div className="space-y-4">
        <div className="flex gap-2">
          <button
            onClick={() => setIsOpen(true)}
            className="rounded bg-green-500 px-3 py-1 text-white"
          >
            Open Accordion
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="rounded bg-red-500 px-3 py-1 text-white"
          >
            Close Accordion
          </button>
          <span className="rounded bg-gray-200 px-3 py-1">
            State: {isOpen ? 'Open' : 'Closed'}
          </span>
        </div>
        <Accordion {...args} isOpen={isOpen} onToggle={setIsOpen}>
          <div className="p-4">
            <p>This accordion is controlled by external state.</p>
            <p>Use the buttons above to control it programmatically.</p>
            <p>
              Current state: <strong>{isOpen ? 'Open' : 'Closed'}</strong>
            </p>
          </div>
        </Accordion>
      </div>
    );
  },
  args: {
    header: 'Controlled Accordion',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Accordion controlled by external state with buttons to programmatically open/close it.',
      },
    },
  },
};

export const MultipleAccordions: Story = {
  render: (args) => (
    <div className="space-y-2">
      <Accordion {...args} header="Section 1">
        <div className="p-4">
          <p>Content for section 1</p>
        </div>
      </Accordion>
      <Accordion {...args} header="Section 2" defaultIsOpen>
        <div className="p-4">
          <p>Content for section 2 (opens by default)</p>
        </div>
      </Accordion>
      <Accordion {...args} header="Section 3">
        <div className="p-4">
          <p>Content for section 3</p>
        </div>
      </Accordion>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Multiple accordions in a list, demonstrating how they work together.',
      },
    },
  },
};

export const ResponsiveDesign: Story = {
  args: {
    header: 'Responsive Accordion',
    children: (
      <div className="p-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded bg-gray-100 p-3">Mobile View</div>
          <div className="hidden rounded bg-gray-100 p-3 md:block">
            Tablet View
          </div>
          <div className="hidden rounded bg-gray-100 p-3 lg:block">
            Desktop View
          </div>
        </div>
        <p className="mt-4 text-gray-600 text-sm">
          This content adapts to different screen sizes. Try changing the
          viewport in the toolbar above.
        </p>
      </div>
    ),
  },
  parameters: {
    viewport: {
      defaultViewport: 'responsive',
    },
    docs: {
      description: {
        story:
          'Accordion with responsive content. Test different viewport sizes using the viewport toolbar.',
      },
    },
  },
};

export const PerformanceTest: Story = {
  args: {
    header: 'Performance Test (100 Items)',
    children: (
      <div className="max-h-96 overflow-y-auto p-4">
        <div className="space-y-2">
          {Array.from({ length: 100 }, (_, i) => (
            <div
              key={i}
              className="flex justify-between rounded bg-gray-100 p-2"
            >
              <span>Item {i + 1}</span>
              <button className="text-blue-500 hover:text-blue-700">
                Action
              </button>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          'Accordion with many items to test performance with large content.',
      },
    },
  },
};
