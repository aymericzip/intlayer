---
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: Est-il possible d'utiliser Intlayer avec Next.js sans `[locale]` dans le chemin de la page ?
description: Apprenez comment utiliser Intlayer avec Next.js sans `[locale]` dans le chemin de la page.
keywords:
  - locale
  - chemin
  - intlayer
  - next.js
  - vite
  - framework
  - middleware
  - configuration
  - prefixDefault
  - noPrefix
slugs:
  - doc
  - faq
  - ssr-next-no-[locale]
---

# Est-il possible d'utiliser Intlayer avec Next.js sans `[locale]` dans le chemin de la page ?

Oui, il est possible d'utiliser Intlayer avec Next.js sans `[locale]` dans le chemin de la page. Cependant, ce n'est pas recommandé, car diviser votre page permet de déclencher plus de mots-clés sur les moteurs de recherche. Votre SSR peut également être impacté.

Si vous souhaitez le faire, suivez les mêmes étapes que celles décrites dans le guide [Intlayer avec Next.js](https://intlayer.org/doc/environment/nextjs),

- pas de `src/middleware.ts`
- pas de `generateStaticParams`

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

    document.documentElement.lang = locale;
    document.documentElement.dir = getHTMLTextDir(locale);
  }, [locale]);
};
```
