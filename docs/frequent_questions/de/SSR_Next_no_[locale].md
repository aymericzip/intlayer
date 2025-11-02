---
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: Ist es möglich, Intlayer mit Next.js ohne `[locale]` im Seitenpfad zu verwenden?
description: Erfahren Sie, wie Sie Intlayer mit Next.js ohne `[locale]` im Seitenpfad verwenden können.
keywords:
  - locale
  - pfad
  - intlayer
  - next.js
  - vite
  - framework
  - middleware
  - konfiguration
  - prefixDefault
  - noPrefix
slugs:
  - frequent-questions
  - ssr-next-no-[locale]
---

# Ist es möglich, Intlayer mit Next.js ohne `[locale]` im Seitenpfad zu verwenden?

Ja, es ist möglich, Intlayer mit Next.js ohne `[locale]` im Seitenpfad zu verwenden. Es wird jedoch nicht empfohlen, da die Aufteilung Ihrer Seite es ermöglicht, mehr Schlüsselwörter in Suchmaschinen auszulösen. Ihr SSR könnte ebenfalls beeinträchtigt werden.

Wenn Sie dies tun möchten, folgen Sie den gleichen Schritten wie im Leitfaden [Intlayer mit Next.js](https://intlayer.org/doc/environment/nextjs) beschrieben,

- kein `src/middleware.ts`
- kein `generateStaticParams`

```tsx fileName="src/app/layout.tsx"
import type { FC, PropsWithChildren } from "react";

const LocaleLayout: FC<PropsWithChildren> = ({ children }) => (
  <html lang={undefined} dir={undefined}>
    <body className={inter.className}>{children}</body>
  </html>
);

export default LocaleLayout;
```

```tsx fileName="src/app/page.tsx"
import type { FC } from "react";
import { ClientComponentExample } from "@components/ClientComponentExample";
import { ServerComponentExample } from "@components/ServerComponentExample";
import { PageContent } from "@components/pageContent";
import { type NextPageIntlayer, IntlayerClientProvider } from "next-intlayer";
import { IntlayerServerProvider } from "next-intlayer/server";

const Page: FC = () => {
  return (
    <IntlayerServerProvider>
      <PageContent />
      <ServerComponentExample />

      <IntlayerClientProvider>
        <ClientComponentExample />
      </IntlayerClientProvider>
    </IntlayerServerProvider>
  );
};

export default Page;
```

```tsx fileName="src/component/pageContent.ts"
"use client";

import { type FC } from "react";
import { useIntlayer } from "next-intlayer";
import { useHTMLLanguage } from "@hooks/htmlTextDir";

const PageContent: FC = () => {
  useHTMLLanguage();
  const content = useIntlayer("page");

  return (
    <>
      <p>{content.getStarted.main}</p>
      <code>{content.getStarted.pageLink}</code>
    </>
  );
};
```

```tsx fileName="src/hooks/htmlTextDir.ts"
"use client";

import { useEffect } from "react";
import { getHTMLTextDir } from "intlayer";
import { useLocale } from "next-intlayer";

export const useHTMLLanguage = () => {
  const { locale } = useLocale();

  useEffect(() => {
    if (!document) return;

    document.documentElement.lang = locale; // Setzt die Sprache des HTML-Dokuments
    document.documentElement.dir = getHTMLTextDir(locale); // Setzt die Schreibrichtung basierend auf der Sprache
  }, [locale]);
};
```
