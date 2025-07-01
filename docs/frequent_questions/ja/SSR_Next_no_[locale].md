---
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: ページパスに `[locale]` を含めずに Next.js で Intlayer を使用することは可能ですか？
description: ページパスに `[locale]` を含めずに Next.js で Intlayer を使用する方法を学びます。
keywords:
  - ロケール
  - パス
  - intlayer
  - next.js
  - vite
  - フレームワーク
  - ミドルウェア
  - 設定
  - prefixDefault
  - noPrefix
slugs:
  - doc
  - faq
  - ssr-next-no-[locale]
---

# ページパスに `[locale]` を含めずに Next.js で Intlayer を使用することは可能ですか？

はい、ページパスに `[locale]` を含めずに Next.js で Intlayer を使用することは可能です。ただし、ページを分割することで検索エンジンでより多くのキーワードをトリガーできるため、推奨はされません。また、SSR（サーバーサイドレンダリング）にも影響が出る可能性があります。

もしそれを行いたい場合は、[Intlayer with Next.js](https://intlayer.org/doc/environment/nextjs) ガイドに記載されている手順に従ってください。

- `src/middleware.ts` は使用しない
- `generateStaticParams` は使用しない

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

    document.documentElement.lang = locale; // ドキュメントの言語属性を設定
    document.documentElement.dir = getHTMLTextDir(locale); // ドキュメントのテキスト方向を設定
  }, [locale]);
};
```
