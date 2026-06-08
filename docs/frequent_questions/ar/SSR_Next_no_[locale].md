---
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: هل من الممكن استخدام Intlayer مع Next.js بدون `[locale]` في مسار الصفحة؟
description: تعلّم كيفية استخدام Intlayer مع Next.js بدون `[locale]` في مسار الصفحة.
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
  - next-no-locale-path
---

# هل من الممكن استخدام Intlayer مع Next.js بدون `[locale]` في مسار الصفحة؟

نعم، من الممكن استخدام Intlayer مع Next.js بدون `[locale]` في مسار الصفحة. ومع ذلك، لا يُنصح بذلك، لأن تقسيم الصفحة يسمح بتحفيز المزيد من الكلمات المفتاحية على محركات البحث. قد يتأثر أيضًا SSR الخاص بك.

إذا كنت ترغب في القيام بذلك، فاتبع نفس الخطوات الموضحة في دليل [Intlayer مع Next.js](https://intlayer.org/doc/environment/nextjs)،

- لا يوجد `src/middleware.ts`
- لا يوجد `generateStaticParams`

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

    document.documentElement.lang = locale; // تعيين لغة المستند
    document.documentElement.dir = getHTMLTextDir(locale); // تعيين اتجاه النص بناءً على اللغة
  }, [locale]);
};
```
