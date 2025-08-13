import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import '../../tailwind.css';
import { RightDrawer } from './RightDrawer';
import { useRightDrawerStore } from './useRightDrawerStore';

const meta = {
  title: 'Components/RightDrawer',
  component: RightDrawer,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    identifier: { control: 'text' },
    title: { control: 'text' },
    closeOnOutsideClick: { control: 'boolean' },
  },
  args: {
    identifier: 'demo',
    title: 'Right drawer',
    closeOnOutsideClick: true,
  },
} satisfies Meta<typeof RightDrawer>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    const id = args.identifier ?? 'demo';

    const OpenButton = () => {
      const open = useRightDrawerStore((s) => s.open);
      return (
        <button
          className="m-4 rounded bg-primary px-4 py-2 text-white"
          onClick={() => open(id)}
        >
          Open drawer
        </button>
      );
    };

    return (
      <div className="min-h-screen bg-background text-text">
        <OpenButton />
        <RightDrawer {...args} identifier={id}>
          <div className="p-4">
            <p className="mb-4">
              This is the drawer content. Resize the window to test responsive
              behavior.
            </p>
            <ul className="list-disc space-y-2 pl-6">
              <li>Support for title and header</li>
              <li>Back button handling</li>
              <li>Close on outside click</li>
              <li>Controlled or store-driven opening</li>
            </ul>
          </div>
        </RightDrawer>
      </div>
    );
  },
};

export const WithBackButton: Story = {
  args: {
    backButton: {
      text: 'Go back',
      onBack: () => history.back(),
    },
    header: (
      <div className="px-6 text-sm opacity-80">
        Optional header content can be placed here.
      </div>
    ),
  },
  render: (args) => {
    const id = args.identifier ?? 'demo-back';

    const OpenButton = () => {
      const open = useRightDrawerStore((s) => s.open);
      return (
        <button
          className="m-4 rounded bg-primary px-4 py-2 text-white"
          onClick={() => open(id)}
        >
          Open drawer with back button
        </button>
      );
    };

    return (
      <div className="min-h-screen bg-background text-text">
        <OpenButton />
        <RightDrawer {...args} identifier={id}>
          <div className="p-4">
            <p>Back button is rendered in the header area.</p>
          </div>
        </RightDrawer>
      </div>
    );
  },
};

export const Controlled: Story = {
  args: {
    identifier: 'controlled',
  },
  render: (args) => {
    const [open, setOpen] = useState(false);

    return (
      <div className="min-h-screen bg-background text-text">
        <button
          className="m-4 rounded bg-primary px-4 py-2 text-white"
          onClick={() => setOpen(true)}
        >
          Open controlled drawer
        </button>
        <RightDrawer {...args} isOpen={open} onClose={() => setOpen(false)}>
          <div className="p-4">
            <p>
              This drawer is controlled via props. Clicking the close button or
              outside (on mobile) triggers onClose and updates local state.
            </p>
          </div>
        </RightDrawer>
      </div>
    );
  },
};

export const NoOutsideClose: Story = {
  args: {
    identifier: 'no-outside-close',
    closeOnOutsideClick: false,
  },
  render: (args) => {
    const id = args.identifier ?? 'no-outside-close';

    const OpenButton = () => {
      const open = useRightDrawerStore((s) => s.open);
      return (
        <button
          className="m-4 rounded bg-primary px-4 py-2 text-white"
          onClick={() => open(id)}
        >
          Open drawer (outside click disabled)
        </button>
      );
    };

    return (
      <div className="min-h-screen bg-background text-text">
        <OpenButton />
        <RightDrawer {...args} identifier={id}>
          <div className="p-4">
            <p>Clicking outside will not close the drawer.</p>
          </div>
        </RightDrawer>
      </div>
    );
  },
};
