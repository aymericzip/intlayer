import type { Meta, StoryObj } from '@storybook/react';
import { Button, ButtonColor, ButtonSize, ButtonVariant } from '../Button';
import { Container } from '../Container';
import { H3 } from '../Headers';
import { Popover, PopoverXAlign, PopoverYAlign } from '.';

/**
 * Popover Component Stories
 *
 * Interactive popover component with hover/focus triggering and multiple positioning options.
 * Perfect for tooltips, context menus, help text, and contextual information.
 */
const meta: Meta<typeof Popover> = {
  title: 'Components/Popover',
  component: Popover,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A versatile popover component with accessibility features, smooth animations, and flexible positioning options. Supports hover and focus interactions.',
      },
    },
  },
  argTypes: {
    identifier: {
      control: 'text',
      description:
        'Unique identifier linking trigger and popover for accessibility',
    },
    children: {
      description: 'Trigger content (button, text, etc.)',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes for trigger styling',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Popover>;

/**
 * Basic Popover
 * Simple hover-triggered popover with default settings
 */
export const Basic: Story = {
  args: {
    identifier: 'basic-popover',
  },
  render: (args) => (
    <Container className="flex items-center justify-center p-16">
      <Popover {...args} identifier="basic-popover">
        <Button variant={ButtonVariant.OUTLINE} label="Hover for info">
          Hover for info
        </Button>

        <Popover.Detail identifier="basic-popover">
          <Container className="p-3">
            <p className="text-sm">
              This is a basic popover with helpful information!
            </p>
          </Container>
        </Popover.Detail>
      </Popover>
    </Container>
  ),
};

/**
 * Focus Triggered
 * Popover that appears when the trigger receives focus
 */
export const FocusTriggered: Story = {
  render: () => (
    <Container className="flex items-center justify-center p-16">
      <Popover identifier="focus-popover">
        <input
          className="rounded border border-neutral-300 px-3 py-2"
          placeholder="Focus me to see popover"
        />

        <Popover.Detail
          identifier="focus-popover"
          isFocusable
          isOverable={false}
        >
          <Container className="p-3">
            <p className="text-sm">This appears when the input is focused!</p>
          </Container>
        </Popover.Detail>
      </Popover>
    </Container>
  ),
};

/**
 * Positioning Variants
 * Demonstrates all positioning combinations
 */
export const PositioningVariants: Story = {
  render: () => (
    <Container className="grid grid-cols-2 gap-8 p-16">
      {/* Below Start */}
      <div className="flex justify-center">
        <Popover identifier="below-start">
          <Button size={ButtonSize.SM} label="Below Start" color="light">
            Below Start
          </Button>
          <Popover.Detail
            identifier="below-start"
            xAlign={PopoverXAlign.START}
            yAlign={PopoverYAlign.BELOW}
          >
            <Container className="p-2">
              <p className="text-xs">Below, Start aligned</p>
            </Container>
          </Popover.Detail>
        </Popover>
      </div>

      {/* Below End */}
      <div className="flex justify-center">
        <Popover identifier="below-end">
          <Button size={ButtonSize.SM} label="Below End" color="error">
            Below End
          </Button>
          <Popover.Detail
            identifier="below-end"
            xAlign={PopoverXAlign.END}
            yAlign={PopoverYAlign.BELOW}
          >
            <Container className="p-2">
              <p className="text-xs">Below, End aligned</p>
            </Container>
          </Popover.Detail>
        </Popover>
      </div>

      {/* Above Start */}
      <div className="flex justify-center">
        <Popover identifier="above-start">
          <Button size={ButtonSize.SM} label="Above Start" color="secondary">
            Above Start
          </Button>
          <Popover.Detail
            identifier="above-start"
            xAlign={PopoverXAlign.START}
            yAlign={PopoverYAlign.ABOVE}
          >
            <Container className="p-2">
              <p className="text-xs">Above, Start aligned</p>
            </Container>
          </Popover.Detail>
        </Popover>
      </div>

      {/* Above End */}
      <div className="flex justify-center">
        <Popover identifier="above-end">
          <Button size={ButtonSize.SM} label="Above End" color="text">
            Above End
          </Button>
          <Popover.Detail
            identifier="above-end"
            xAlign={PopoverXAlign.END}
            yAlign={PopoverYAlign.ABOVE}
          >
            <Container className="p-2">
              <p className="text-xs">Above, End aligned</p>
            </Container>
          </Popover.Detail>
        </Popover>
      </div>
    </Container>
  ),
};

/**
 * Rich Content Popover
 * Popover with complex content including headings, buttons, and formatting
 */
export const RichContent: Story = {
  render: () => (
    <Container className="flex items-center justify-center p-16">
      <Popover identifier="rich-popover">
        <Button color={ButtonColor.PRIMARY} label="User Profile">
          User Profile
        </Button>

        <Popover.Detail identifier="rich-popover" xAlign={PopoverXAlign.END}>
          <Container className="w-64 p-4">
            <div className="mb-3 flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-primary"></div>
              <div>
                <H3 className="font-semibold text-sm">John Doe</H3>
                <p className="text-neutral-600 text-xs">john@example.com</p>
              </div>
            </div>

            <div className="space-y-2">
              <Button
                variant={ButtonVariant.OUTLINE}
                size={ButtonSize.SM}
                className="w-full"
                label="Edit Profile"
              >
                Edit Profile
              </Button>
              <Button
                variant={ButtonVariant.OUTLINE}
                size={ButtonSize.SM}
                className="w-full"
                label="Settings"
              >
                Settings
              </Button>
              <Button
                color={ButtonColor.DESTRUCTIVE}
                variant={ButtonVariant.OUTLINE}
                size={ButtonSize.SM}
                className="w-full"
                label="Sign Out"
              >
                Sign Out
              </Button>
            </div>
          </Container>
        </Popover.Detail>
      </Popover>
    </Container>
  ),
};

/**
 * Context Menu Style
 * Popover styled as a context menu without arrows
 */
export const ContextMenu: Story = {
  render: () => (
    <Container className="flex items-center justify-center p-16">
      <Popover identifier="context-menu">
        <div className="cursor-pointer rounded border-2 border-neutral-300 border-dashed p-8 text-center transition-colors hover:border-primary">
          <p className="text-neutral-500 text-xs">Hover for menu</p>
        </div>

        <Popover.Detail
          identifier="context-menu"
          displayArrow={false}
          xAlign={PopoverXAlign.START}
        >
          <Container className="py-1" transparency="xl">
            <button className="flex w-full px-4 py-2 text-left text-sm transition-colors hover:bg-neutral-100">
              Cut
            </button>
            <button className="flex w-full px-4 py-2 text-left text-sm transition-colors hover:bg-neutral-100">
              Copy
            </button>
            <button className="flex w-full px-4 py-2 text-left text-sm transition-colors hover:bg-neutral-100">
              Paste
            </button>
            <hr className="my-1 border-neutral-200" />
            <button className="flex w-full px-4 py-2 text-left text-destructive text-sm transition-colors hover:bg-destructive/10">
              Delete
            </button>
          </Container>
        </Popover.Detail>
      </Popover>
    </Container>
  ),
};

/**
 * Help Tooltip
 * Simple tooltip-style popover for providing help text
 */
export const HelpTooltip: Story = {
  render: () => (
    <Container className="flex items-center justify-center p-16">
      <div className="flex items-center gap-2">
        <label className="font-medium text-sm">Password</label>

        <Popover identifier="help-tooltip">
          <div className="flex h-5 w-5 cursor-help items-center justify-center rounded-full bg-neutral-200 text-neutral-600 text-xs">
            ?
          </div>

          <Popover.Detail
            identifier="help-tooltip"
            xAlign={PopoverXAlign.START}
            yAlign={PopoverYAlign.BELOW}
          >
            <Container className="max-w-xs p-3">
              <p className="text-sm">
                Password must be at least 8 characters long and contain:
              </p>
              <ul className="mt-2 list-inside list-disc text-neutral-600 text-xs">
                <li>One uppercase letter</li>
                <li>One lowercase letter</li>
                <li>One number</li>
                <li>One special character</li>
              </ul>
            </Container>
          </Popover.Detail>
        </Popover>
      </div>
    </Container>
  ),
};

/**
 * Interactive Controls
 * Simple interactive popover demonstration
 */
export const Interactive: Story = {
  render: () => (
    <Container className="flex items-center justify-center p-16">
      <Popover identifier="interactive-popover">
        <Button variant={ButtonVariant.OUTLINE} label="Interactive Popover">
          Interactive Popover
        </Button>

        <Popover.Detail identifier="interactive-popover">
          <Container className="p-3">
            <p className="text-sm">This is an interactive popover!</p>
          </Container>
        </Popover.Detail>
      </Popover>
    </Container>
  ),
};

/**
 * Multiple Popovers
 * Demonstrates multiple popovers on the same page without conflicts
 */
export const MultiplePopovers: Story = {
  render: () => (
    <Container className="space-y-8 p-16">
      <H3>Multiple Popovers Demo</H3>

      <div className="flex flex-wrap gap-4">
        <Popover identifier="popover-1">
          <Button size={ButtonSize.SM} label="Popover 1">
            <span className="text-white">Popover 1</span>
          </Button>
          <Popover.Detail identifier="popover-1">
            <Container className="p-2">
              <p className="text-xs">First popover content</p>
            </Container>
          </Popover.Detail>
        </Popover>

        <Popover identifier="popover-2">
          <Button size={ButtonSize.SM} label="Popover 2">
            <span className="text-white">Popover 2</span>
          </Button>
          <Popover.Detail identifier="popover-2" yAlign={PopoverYAlign.ABOVE}>
            <Container className="p-2">
              <p className="text-xs">Second popover (above)</p>
            </Container>
          </Popover.Detail>
        </Popover>

        <Popover identifier="popover-3">
          <Button size={ButtonSize.SM} label="Popover 3">
            <span className="text-white">Popover 3</span>
          </Button>
          <Popover.Detail identifier="popover-3" xAlign={PopoverXAlign.END}>
            <Container className="p-2">
              <p className="text-xs">Third popover (end aligned)</p>
            </Container>
          </Popover.Detail>
        </Popover>
      </div>

      <p className="text-neutral-600 text-sm">
        Each popover has a unique identifier and can be independently
        configured. Hover over the buttons to see different positioning options.
      </p>
    </Container>
  ),
};
