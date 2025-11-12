import type { Preview } from '@storybook/react';
import '../tailwind.css';

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
