import type { Meta, StoryObj } from '@storybook/react';
import { Avatar } from './index';

const meta: Meta<typeof Avatar> = {
  title: 'Components/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  argTypes: {
    src: {
      description: 'Image source URL for the avatar',
      control: 'text',
    },
    fullname: {
      description: 'Full name used to generate initials and alt text',
      control: 'text',
      defaultValue: 'Ada Lovelace',
    },
    isLoading: {
      description: 'Displays a loading spinner',
      control: 'boolean',
      defaultValue: false,
    },
    isLoggedIn: {
      description: 'Whether the user is authenticated',
      control: 'boolean',
      defaultValue: true,
    },
    onClick: {
      description: 'Click handler (makes the avatar clickable when provided)',
      action: 'clicked',
    },
    className: {
      description: 'Additional CSS classes',
      control: 'text',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Avatar>;

const Template: Story = {
  args: {
    isLoggedIn: true,
    isLoading: false,
    fullname: 'Ada Lovelace',
  },
};

export const WithImage: Story = {
  ...Template,
  args: {
    ...Template.args,
    src: 'https://i.pravatar.cc/64?img=1',
  },
};

export const WithInitials: Story = {
  ...Template,
  args: {
    ...Template.args,
    src: undefined,
  },
};

export const WithIcon: Story = {
  ...Template,
  args: {
    isLoggedIn: true,
    isLoading: false,
    fullname: '',
    src: undefined,
  },
};

export const Loading: Story = {
  ...Template,
  args: {
    ...Template.args,
    isLoading: true,
  },
};

export const LoggedOut: Story = {
  ...Template,
  args: {
    ...Template.args,
    isLoggedIn: false,
  },
};

export const Clickable: Story = {
  ...Template,
  args: {
    ...Template.args,
    src: 'https://i.pravatar.cc/64?img=2',
    onClick: () => {},
  },
};
