---
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: Apakah mungkin menggunakan Intlayer dengan Next.js tanpa `[locale]` di jalur halaman?
description: Pelajari cara menggunakan Intlayer dengan Next.js tanpa `[locale]` di jalur halaman.
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

# Apakah mungkin menggunakan Intlayer dengan Next.js tanpa `[locale]` di jalur halaman?

Ya, memungkinkan untuk menggunakan Intlayer dengan Next.js tanpa `[locale]` di jalur halaman. Namun, hal ini tidak disarankan karena memisahkan halaman Anda memungkinkan untuk memicu lebih banyak kata kunci di mesin pencari. SSR Anda juga mungkin terpengaruh.

Jika Anda ingin melakukannya, ikuti langkah yang sama seperti yang dijelaskan dalam panduan [Intlayer dengan Next.js](https://intlayer.org/doc/environment/nextjs),

- tanpa `src/middleware.ts`
- tanpa `generateStaticParams`

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

    document.documentElement.lang = locale; // mengatur atribut bahasa dokumen HTML
    document.documentElement.dir = getHTMLTextDir(locale); // mengatur arah teks dokumen HTML berdasarkan locale
  }, [locale]);
};
```
