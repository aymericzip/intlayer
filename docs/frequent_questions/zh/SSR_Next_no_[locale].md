---
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: 是否可以在页面路径中不使用 `[locale]` 来搭配 Next.js 使用 Intlayer？
description: 了解如何在页面路径中不使用 `[locale]` 来搭配 Next.js 使用 Intlayer。
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

# 是否可以在页面路径中不使用 `[locale]` 来搭配 Next.js 使用 Intlayer？

是的，可以在页面路径中不使用 `[locale]` 来搭配 Next.js 使用 Intlayer。然而，不推荐这样做，因为拆分页面路径可以触发更多搜索引擎关键词。您的 SSR 也可能会受到影响。

如果您想这样做，请按照[Intlayer 与 Next.js](https://intlayer.org/doc/environment/nextjs)指南中描述的相同步骤操作，

- 不要使用 `src/middleware.ts`
- 不要使用 `generateStaticParams`

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

    document.documentElement.lang = locale; // 设置HTML文档的语言属性
    document.documentElement.dir = getHTMLTextDir(locale); // 设置文本方向属性（ltr或rtl）
  }, [locale]);
};
```
