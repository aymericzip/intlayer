---
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: Можно ли использовать Intlayer с Next.js без `[locale]` в пути страницы?
description: Узнайте, как использовать Intlayer с Next.js без `[locale]` в пути страницы.
keywords:
  - locale
  - path
  - intlayer
  - next.js
  - vite
  - framework
  - middleware
  - configuration
  - prefixDefault
  - noPrefix
slugs:
  - frequent-questions
  - ssr-next-no-[locale]
---

# Можно ли использовать Intlayer с Next.js без `[locale]` в пути страницы?

Да, можно использовать Intlayer с Next.js без `[locale]` в пути страницы. Однако этого не рекомендуется делать, так как разделение страниц позволяет активировать больше ключевых слов в поисковых системах. Ваш SSR также может пострадать.

Если вы хотите это сделать, следуйте тем же шагам, что описаны в руководстве [Intlayer с Next.js](https://intlayer.org/doc/environment/nextjs),

- без `src/middleware.ts`
- без `generateStaticParams`

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

    document.documentElement.lang = locale; // Устанавливаем атрибут lang для элемента <html>
    document.documentElement.dir = getHTMLTextDir(locale); // Устанавливаем направление текста (ltr или rtl) для элемента <html>
  }, [locale]);
};
```
