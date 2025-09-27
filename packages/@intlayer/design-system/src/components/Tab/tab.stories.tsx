import type { Meta, StoryObj } from '@storybook/react';
import { Tab, TabItem } from './Tab';

const meta: Meta<typeof Tab> = {
  title: 'Components/Tab',
  component: Tab,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'bordered', 'ghost'],
    },
    defaultTab: {
      control: { type: 'text' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    defaultTab: 'tab1',
  },
  render: (args) => (
    <div className="w-96">
      <Tab {...args}>
        <TabItem label="First Tab" value="tab1">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">First Tab Content</h3>
            <p>
              This is the content for the first tab. You can put any React
              components here.
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>Feature 1</li>
              <li>Feature 2</li>
              <li>Feature 3</li>
            </ul>
          </div>
        </TabItem>
        <TabItem label="Second Tab" value="tab2">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Second Tab Content</h3>
            <p>
              This is the content for the second tab with different information.
            </p>
            <div className="bg-neutral/10 p-4 rounded-lg">
              <p className="font-medium">Important Note:</p>
              <p>This is a highlighted section within the tab content.</p>
            </div>
          </div>
        </TabItem>
        <TabItem label="Third Tab" value="tab3">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Third Tab Content</h3>
            <p>The third tab demonstrates how multiple tabs work together.</p>
            <code className="block bg-neutral/10 p-2 rounded text-sm">
              console.log('Hello from tab 3!');
            </code>
          </div>
        </TabItem>
      </Tab>
    </div>
  ),
};

export const Bordered: Story = {
  args: {
    variant: 'bordered',
    defaultTab: 'overview',
  },
  render: (args) => (
    <div className="w-96">
      <Tab {...args}>
        <TabItem label="Overview" value="overview">
          <div className="space-y-3">
            <h4 className="font-semibold">Project Overview</h4>
            <p>This tab has a bordered variant styling.</p>
          </div>
        </TabItem>
        <TabItem label="Details" value="details">
          <div className="space-y-3">
            <h4 className="font-semibold">Project Details</h4>
            <p>Detailed information about the project.</p>
          </div>
        </TabItem>
      </Tab>
    </div>
  ),
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    defaultTab: 'docs',
  },
  render: (args) => (
    <div className="w-96">
      <Tab {...args}>
        <TabItem label="Documentation" value="docs">
          <div className="space-y-3">
            <h4 className="font-semibold">Documentation</h4>
            <p>
              Ghost variant has minimal styling, perfect for subtle tab
              interfaces.
            </p>
          </div>
        </TabItem>
        <TabItem label="Examples" value="examples">
          <div className="space-y-3">
            <h4 className="font-semibold">Examples</h4>
            <p>Code examples and usage patterns.</p>
          </div>
        </TabItem>
        <TabItem label="API" value="api">
          <div className="space-y-3">
            <h4 className="font-semibold">API Reference</h4>
            <p>Complete API documentation and reference.</p>
          </div>
        </TabItem>
      </Tab>
    </div>
  ),
};

export const WithDisabledTab: Story = {
  args: {
    defaultTab: 'active1',
  },
  render: (args) => (
    <div className="w-96">
      <Tab {...args}>
        <TabItem label="Active Tab" value="active1">
          <div className="space-y-3">
            <h4 className="font-semibold">Active Tab</h4>
            <p>This tab is active and clickable.</p>
          </div>
        </TabItem>
        <TabItem label="Disabled Tab" value="disabled" disabled>
          <div className="space-y-3">
            <h4 className="font-semibold">Disabled Tab</h4>
            <p>This tab is disabled and cannot be clicked.</p>
          </div>
        </TabItem>
        <TabItem label="Another Active" value="active2">
          <div className="space-y-3">
            <h4 className="font-semibold">Another Active Tab</h4>
            <p>This tab is also active and clickable.</p>
          </div>
        </TabItem>
      </Tab>
    </div>
  ),
};
