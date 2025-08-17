import type { Meta, StoryObj } from '@storybook/react';
import { Breadcrumb } from '.';
import { ButtonColor } from '../Button';

const meta: Meta<typeof Breadcrumb> = {
  title: 'Components/Breadcrumb',
  component: Breadcrumb,
  tags: ['autodocs'],
  argTypes: {
    links: {
      description:
        'Array of breadcrumb items. Can be strings or objects with { text, href?, onClick? }',
      control: { type: 'object' },
      defaultValue: ['Home', 'Library', 'Data'],
    },
    color: {
      description: 'Color theme of the links/buttons',
      control: {
        type: 'select',
      },
      options: [
        ButtonColor.PRIMARY,
        ButtonColor.DESTRUCTIVE,
        ButtonColor.NEUTRAL,
        ButtonColor.LIGHT,
        ButtonColor.DARK,
        ButtonColor.TEXT,
        ButtonColor.CUSTOM,
      ],
      defaultValue: ButtonColor.TEXT,
    },
    locale: {
      description: 'Locale forwarded to link items',
      control: 'text',
    },
    elementType: {
      description: 'Value used for aria-current on the last item',
      control: { type: 'select' },
      options: ['page', 'location'],
      defaultValue: 'page',
    },
    className: {
      description: 'Additional class names for the list element',
      control: 'text',
    },
  },
} satisfies Meta<typeof Breadcrumb>;

export default meta;

type Story = StoryObj<typeof Breadcrumb>;

export const Default: Story = {
  args: {
    links: ['Home', 'Library', 'Data'],
    color: ButtonColor.TEXT,
    elementType: 'page',
  },
};

export const WithLinks: Story = {
  args: {
    links: [
      { text: 'Home', href: '/' },
      { text: 'Library', href: '/library' },
      { text: 'Data', href: '/library/data' },
    ],
    color: ButtonColor.PRIMARY,
  },
};

export const WithButtons: Story = {
  args: {
    links: [
      { text: 'Home', onClick: () => undefined },
      { text: 'Library', onClick: () => undefined },
      { text: 'Refresh', onClick: () => undefined },
    ],
    color: ButtonColor.NEUTRAL,
  },
};

export const Mixed: Story = {
  args: {
    links: [
      { text: 'Home', href: '/' },
      'Library',
      { text: 'Data', onClick: () => undefined },
    ],
    color: ButtonColor.DARK,
  },
};

export const WithLocale: Story = {
  args: {
    links: [
      { text: 'Accueil', href: '/' },
      { text: 'Bibliothèque', href: '/bibliotheque' },
      { text: 'Données', href: '/bibliotheque/donnees' },
    ],
    color: ButtonColor.TEXT,
    locale: 'fr',
  },
};
