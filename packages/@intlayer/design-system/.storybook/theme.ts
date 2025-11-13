import { create } from '@storybook/theming/create';

const theme = create({
  base: 'light',
  brandTitle: 'Intlayer Design System',
  brandUrl: 'https://intlayer.org',
  brandImage: '/logo_with_text.svg',
  brandTarget: '_self',
}) as ReturnType<typeof create>;

export default theme;
