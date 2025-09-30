import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';
import { useState } from 'react';
import { ClickOutsideDiv } from './index';

const meta: Meta<typeof ClickOutsideDiv> = {
  title: 'Components/ClickOutsideDiv',
  component: ClickOutsideDiv,
  tags: ['autodocs'],
  argTypes: {
    children: {
      description: 'Content to be rendered inside the container',
      control: 'text',
      defaultValue: 'Click outside this area',
    },
    onClickOutSide: {
      description:
        'Callback function called when a click occurs outside the component',
      action: 'onClickOutSide',
    },
    listenForEscape: {
      description:
        'Whether to listen for Escape key presses to trigger onClickOutSide',
      control: 'boolean',
      defaultValue: false,
    },
    disabled: {
      description:
        "Whether the component is disabled (won't trigger onClickOutSide)",
      control: 'boolean',
      defaultValue: false,
    },
    className: {
      description: 'Additional CSS classes to apply to the container',
      control: 'text',
      defaultValue: '',
    },
    style: {
      description: 'Inline styles to apply to the container',
      control: 'object',
      defaultValue: {},
    },
    role: {
      description: 'ARIA role for the container',
      control: 'text',
      defaultValue: 'region',
    },
  },
} satisfies Meta<typeof ClickOutsideDiv>;

export default meta;

type Story = StoryObj<typeof ClickOutsideDiv>;

// Wrapper component to demonstrate the click outside functionality
const ClickOutsideDemo = ({
  listenForEscape = false,
  disabled = false,
  children = 'Click outside this box to trigger the callback',
  ...args
}: any) => {
  const [clickCount, setClickCount] = useState(0);
  const [lastAction, setLastAction] = useState('');

  const handleClickOutside = () => {
    setClickCount((prev) => prev + 1);
    setLastAction('Clicked outside');
  };

  const handleEscapePress = () => {
    setClickCount((prev) => prev + 1);
    setLastAction('Pressed Escape');
  };

  return (
    <div style={{ padding: '20px', minHeight: '300px' }}>
      <p>Click count: {clickCount}</p>
      <p>Last action: {lastAction || 'None'}</p>
      <p style={{ marginBottom: '20px', color: '#666' }}>
        Try clicking outside the bordered area below
        {listenForEscape && ' or pressing the Escape key'}
        {disabled && ' (currently disabled)'}
      </p>
      <ClickOutsideDiv
        onClickOutSide={
          listenForEscape ? handleEscapePress : handleClickOutside
        }
        listenForEscape={listenForEscape}
        disabled={disabled}
        style={{
          border: '2px solid #007ACC',
          borderRadius: '8px',
          padding: '20px',
          backgroundColor: '#f5f5f5',
          display: 'inline-block',
          minWidth: '200px',
          ...args.style,
        }}
        {...args}
      >
        {children}
      </ClickOutsideDiv>
    </div>
  );
};

export const Default: Story = {
  render: (args) => <ClickOutsideDemo {...args} />,
  args: {
    children: 'Click outside this box to trigger the callback',
  },
};

export const WithEscapeKey: Story = {
  render: (args) => <ClickOutsideDemo {...args} />,
  args: {
    children: 'Click outside or press Escape',
    listenForEscape: true,
  },
};

export const Disabled: Story = {
  render: (args) => <ClickOutsideDemo {...args} />,
  args: {
    children: 'This component is disabled',
    disabled: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Initially, click count should be 0
    await expect(canvas.getByText('Click count: 0')).toBeInTheDocument();

    // Find the instruction text (which is outside the ClickOutsideDiv)
    const instructionText = canvas.getByText(
      /Try clicking outside the bordered area/
    );

    // Simulate a mousedown event directly
    const mouseDownEvent = new MouseEvent('mousedown', {
      bubbles: true,
      cancelable: true,
    });

    // Set the target property after creation
    Object.defineProperty(mouseDownEvent, 'target', {
      value: instructionText,
      enumerable: true,
    });

    // Dispatch the mousedown event on the document
    document.dispatchEvent(mouseDownEvent);

    // Add a small delay to allow the event to be processed
    await new Promise((resolve) => setTimeout(resolve, 100));

    // Click count should remain 0 since component is disabled
    await expect(canvas.getByText('Click count: 0')).toBeInTheDocument();
  },
};

export const WithCustomStyling: Story = {
  render: (args) => <ClickOutsideDemo {...args} />,
  args: {
    children: 'Custom styled container',
    style: {
      border: '3px dashed #ff6b6b',
      borderRadius: '12px',
      padding: '30px',
      backgroundColor: '#ffe0e0',
      color: '#d63031',
      fontWeight: 'bold',
      textAlign: 'center' as const,
    },
  },
};

export const NestedContent: Story = {
  render: (args) => <ClickOutsideDemo {...args} />,
  args: {
    children: (
      <div>
        <h3>Nested Content</h3>
        <p>This container has multiple nested elements.</p>
        <button onClick={() => alert('Button clicked!')}>
          Click me (won't trigger outside callback)
        </button>
        <ul>
          <li>Item 1</li>
          <li>Item 2</li>
          <li>Item 3</li>
        </ul>
      </div>
    ),
  },
};
export const EmptyContent: Story = {
  render: (args) => <ClickOutsideDemo {...args} />,
  args: {
    children: '',
    style: {
      border: '2px solid #ccc',
      borderRadius: '4px',
      padding: '20px',
      backgroundColor: '#f9f9f9',
      minHeight: '60px',
      minWidth: '200px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  },
};

export const AccessibilityDemo: Story = {
  render: (args) => <ClickOutsideDemo {...args} />,
  args: {
    children: 'Accessible container with proper ARIA role',
    role: 'dialog',
    'aria-label': 'Click outside detector',
    'aria-describedby': 'outside-detector-description',
  },
  decorators: [
    (Story) => (
      <div>
        <p
          id="outside-detector-description"
          style={{ marginBottom: '10px', fontSize: '14px', color: '#666' }}
        >
          This container will detect clicks outside of its boundaries and has
          proper ARIA attributes for accessibility.
        </p>
        <Story />
      </div>
    ),
  ],
};
