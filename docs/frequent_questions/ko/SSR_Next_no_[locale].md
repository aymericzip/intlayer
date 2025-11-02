---
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: 페이지 경로에 `[locale]` 없이 Next.js에서 Intlayer를 사용할 수 있나요?
description: 페이지 경로에 `[locale]` 없이 Next.js에서 Intlayer를 사용하는 방법을 알아보세요.
keywords:
  - locale
  - 경로
  - intlayer
  - next.js
  - vite
  - 프레임워크
  - 미들웨어
  - 구성
  - prefixDefault
  - noPrefix
slugs:
  - frequent-questions
  - ssr-next-no-[locale]
---

# 페이지 경로에 `[locale]` 없이 Next.js에서 Intlayer를 사용할 수 있나요?

네, 페이지 경로에 `[locale]` 없이 Next.js에서 Intlayer를 사용하는 것이 가능합니다. 하지만 페이지를 분리하는 것이 검색 엔진에서 더 많은 키워드를 유발할 수 있기 때문에 권장하지 않습니다. 또한 SSR에도 영향을 미칠 수 있습니다.

원하신다면, [Intlayer with Next.js](https://intlayer.org/doc/environment/nextjs) 가이드에 설명된 동일한 단계를 따르세요,

- `src/middleware.ts` 없음
- `generateStaticParams` 없음

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

    document.documentElement.lang = locale; // 문서의 언어 설정
    document.documentElement.dir = getHTMLTextDir(locale); // 문서의 텍스트 방향 설정
  }, [locale]);
};
```
