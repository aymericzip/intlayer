---
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: Có thể sử dụng Intlayer với Next.js mà không có `[locale]` trong đường dẫn trang không?
description: Tìm hiểu cách sử dụng Intlayer với Next.js mà không có `[locale]` trong đường dẫn trang.
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

# Có thể sử dụng Intlayer với Next.js mà không có `[locale]` trong đường dẫn trang không?

Có, bạn có thể sử dụng Intlayer với Next.js mà không có `[locale]` trong đường dẫn trang. Tuy nhiên, điều này không được khuyến nghị, vì việc tách trang của bạn cho phép kích hoạt nhiều từ khóa hơn trên các công cụ tìm kiếm. SSR của bạn cũng có thể bị ảnh hưởng.

Nếu bạn muốn làm như vậy, hãy làm theo các bước giống như được mô tả trong hướng dẫn [Intlayer với Next.js](https://intlayer.org/doc/environment/nextjs),

- không có `src/middleware.ts`
- không có `generateStaticParams`

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

    // Thiết lập thuộc tính ngôn ngữ cho thẻ <html>
    document.documentElement.lang = locale;
    // Thiết lập hướng văn bản cho thẻ <html> dựa trên ngôn ngữ
    document.documentElement.dir = getHTMLTextDir(locale);
  }, [locale]);
};
```
