import { createRootRoute, HeadContent, Scripts } from '@tanstack/react-router';

import appCss from '../styles.css?url';

export const Route = createRootRoute({
  head: () => ({
    links: [
      {
        href: appCss,
        rel: 'stylesheet',
      },
    ],
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        content: 'width=device-width, initial-scale=1',
        name: 'viewport',
      },
      {
        title: 'TanStack Start Starter',
      },
    ],
  }),
  shellComponent: RootDocument,
});

function RootDocument({ children }: React.PropsWithChildren) {
  return (
    <html suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        {children}

        <Scripts />
      </body>
    </html>
  );
}
