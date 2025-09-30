import type { Preview } from '@storybook/react';
import '../src/tailwind.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      context: 'body',
      config: {},
      options: {},
    },
  },
};

export default preview;
