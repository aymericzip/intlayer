---
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: Czy można używać Intlayer z Next.js bez `[locale]` w ścieżce strony?
description: Dowiedz się, jak używać Intlayer z Next.js bez `[locale]` w ścieżce strony.
keywords:
  - locale
  - ścieżka
  - intlayer
  - next.js
  - vite
  - framework
  - middleware
  - konfiguracja
  - prefixDefault
  - noPrefix
slugs:
  - frequent-questions
  - next-no-locale-path
---

# Czy można używać Intlayer z Next.js bez `[locale]` w ścieżce strony?

Tak, można używać Intlayer z Next.js bez `[locale]` w ścieżce strony. Jednak nie jest to zalecane, ponieważ rozdzielenie strony pozwala na wywołanie większej liczby słów kluczowych w wyszukiwarkach. Może to również wpłynąć na Twoje SSR.

Jeśli chcesz to zrobić, postępuj zgodnie z tymi samymi krokami opisanymi w przewodniku [Intlayer z Next.js](https://intlayer.org/doc/environment/nextjs),

- bez `src/middleware.ts`
- bez `generateStaticParams`

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

    document.documentElement.lang = locale; // ustawienie atrybutu języka dokumentu
    document.documentElement.dir = getHTMLTextDir(locale); // ustawienie kierunku tekstu w dokumencie
  }, [locale]);
};
```
