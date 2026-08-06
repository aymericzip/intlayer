// @refresh reload
import { createHandler, StartServer } from '@solidjs/start/server';
import { defaultLocale, getHTMLTextDir, getLocaleFromPath } from 'intlayer';
import { getRequestEvent } from 'solid-js/web';
import { AlternateLinks } from '~/components/AlternateLinks';

export default createHandler(() => (
  <StartServer
    document={({ assets, children, scripts }) => {
      // The document shell is rendered outside the Router, so the locale comes
      // from the request URL rather than from the router location.
      const url = getRequestEvent()?.request.url ?? '/';
      const locale = getLocaleFromPath(url) ?? defaultLocale;

      return (
        <html dir={getHTMLTextDir(locale)} lang={locale}>
          <head>
            <meta charset="utf-8" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
            <link rel="icon" href="/favicon.ico" />
            <AlternateLinks url={url} />
            {assets}
          </head>
          <body>
            <div id="app">{children}</div>
            {scripts}
          </body>
        </html>
      );
    }}
  />
));
