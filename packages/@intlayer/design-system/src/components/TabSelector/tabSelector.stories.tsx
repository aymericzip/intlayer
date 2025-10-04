import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Button, ButtonVariant } from '../Button';
import { TabSelector, TabSelectorColor } from '.';

const meta: Meta<typeof TabSelector> = {
  title: 'Components/TabSelector',
  component: TabSelector,
  tags: ['autodocs'],
  argTypes: {
    tabs: {
      description: 'The tab elements to render',
      control: false,
    },
    selectedChoice: {
      description: 'The key of the currently selected tab',
      control: 'text',
      defaultValue: 'one',
    },
    onTabClick: {
      description: 'Callback when a tab is clicked',
      control: false,
    },
    color: {
      description: 'Color theme',
      control: {
        type: 'select',
      },
      options: Object.values(TabSelectorColor),
      defaultValue: TabSelectorColor.PRIMARY,
    },
    hoverable: {
      description: 'Highlights the tab on hover',
      control: 'boolean',
      defaultValue: false,
    },
  },
} satisfies Meta<typeof TabSelector>;

const sampleTabs = [
  <Button key="one" label="One" variant={ButtonVariant.HOVERABLE}>
    One
  </Button>,
  <Button key="two" label="Two" variant={ButtonVariant.HOVERABLE}>
    Two
  </Button>,
  <Button key="three" label="Three" variant={ButtonVariant.HOVERABLE}>
    Three
  </Button>,
];

const Template: StoryObj<typeof TabSelector> = {
  render: (args) => {
    const [selected, setSelected] = useState(args.selectedChoice ?? 'one');

    return (
      <div style={{ width: 400 }}>
        <TabSelector
          {...args}
          tabs={args.tabs ?? sampleTabs}
          selectedChoice={selected}
          onTabClick={(key) => {
            setSelected(key);
            // Call the provided callback if any
            // @ts-expect-error Storybook args can include callbacks without strict typing here
            args.onTabClick?.(key);
          }}
        />
      </div>
    );
  },
  args: {
    tabs: sampleTabs,
    selectedChoice: 'one',
    color: TabSelectorColor.PRIMARY,
    hoverable: false,
  },
};

export default meta;

export const Default = Template;
