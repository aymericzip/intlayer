---
createdAt: 2025-09-07
updatedAt: 2025-09-07
title: Next.js ile `[locale]` olmadan Intlayer kullanmak mümkün mü?
description: Next.js ile `[locale]` olmadan Intlayer nasıl kullanılır, öğrenin.
keywords:
  - locale
  - yol
  - intlayer
  - next.js
  - vite
  - framework
  - middleware
  - yapılandırma
  - prefixDefault
  - noPrefix
slugs:
  - frequent-questions
  - ssr-next-no-[locale]
---

# Next.js ile `[locale]` olmadan Intlayer kullanmak mümkün mü?

Evet, Next.js ile `[locale]` olmadan Intlayer kullanmak mümkündür. Ancak, sayfalarınızı bölmek arama motorlarında daha fazla anahtar kelime tetiklenmesini sağlar ve SSR performansınız etkilenebilir.

Bunu yapmak isterseniz, [Intlayer ile Next.js](https://intlayer.org/doc/environment/nextjs) rehberinde anlatılan adımları izleyin:

- `src/middleware.ts` dosyası yok
- `generateStaticParams` yok

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
