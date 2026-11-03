---
createdAt: 2025-05-20
updatedAt: 2026-11-03
priority: 4
title: "שימוש ב-Intlayer ב-Next.js ללא [locale] בנתיב"
description: למד כיצד להשתמש ב-Intlayer עם Next.js ללא `[locale]` בנתיב הדף.
keywords:
  - locale
  - נתיב
  - intlayer
  - next.js
  - vite
  - framework
  - middleware
  - הגדרות
  - prefixDefault
  - noPrefix
slugs:
  - frequent-questions
  - next-no-locale-path
author: aymericzip
---

# האם אפשר להשתמש ב-Intlayer עם Next.js ללא `[locale]` בנתיב הדף?

כן, אפשר להשתמש ב-Intlayer עם Next.js ללא `[locale]` בנתיב הדף. עם זאת, הדבר אינו מומלץ, מכיוון שפיצול הדפים לפי שפה מאפשר למקד מילות מפתח רבות יותר במנועי חיפוש. כמו כן, ה-SSR עשוי להיות מושפע מכך.

אם ברצונך לעשות זאת, פעל לפי אותם השלבים המתוארים במדריך [Intlayer עם Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/he-IL/intlayer_with_nextjs_16.md):

- ללא `src/middleware.ts`
- ללא `generateStaticParams`

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
