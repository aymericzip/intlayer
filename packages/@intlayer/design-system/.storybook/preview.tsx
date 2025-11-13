import type { Preview, StoryContext } from '@storybook/react';
import { useEffect } from 'react';
import '../tailwind.css';

const ThemeProvider = ({
  children,
  theme,
}: {
  children: React.ReactNode;
  theme: string;
}) => {
  useEffect(() => {
    // Apply theme to document root
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return <>{children}</>;
};

const preview: Preview = {
  decorators: [
    (Story, context: StoryContext) => {
      const theme = context.globals.theme || 'dark';

      return (
        <ThemeProvider theme={theme}>
          <Story />
        </ThemeProvider>
      );
    },
  ],
  globalTypes: {
    theme: {
      description: 'Global theme for components',
      defaultValue: 'dark',
      toolbar: {
        title: 'Theme',
        icon: 'circlehollow',
        items: [
          { value: 'light', icon: 'sun', title: 'Light' },
          { value: 'dark', icon: 'moon', title: 'Dark' },
        ],
        dynamicTitle: true,
      },
    },
  },
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
