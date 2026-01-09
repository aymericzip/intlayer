---
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: È possibile usare Intlayer con Next.js senza `[locale]` nel percorso della pagina?
description: Scopri come usare Intlayer con Next.js senza `[locale]` nel percorso della pagina.
keywords:
  - locale
  - percorso
  - intlayer
  - next.js
  - vite
  - framework
  - middleware
  - configurazione
  - prefixDefault
  - noPrefix
slugs:
  - frequent-questions
  - next-no-locale-path
---

# È possibile usare Intlayer con Next.js senza `[locale]` nel percorso della pagina?

Sì, è possibile usare Intlayer con Next.js senza `[locale]` nel percorso della pagina. Tuttavia, non è consigliato farlo, perché suddividere la pagina permette di attivare più parole chiave sui motori di ricerca. Anche il tuo SSR potrebbe essere influenzato.

Se vuoi farlo, segui gli stessi passaggi descritti nella guida [Intlayer con Next.js](https://intlayer.org/doc/environment/nextjs),

- nessun `src/middleware.ts`
- nessun `generateStaticParams`

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

    document.documentElement.lang = locale; // Imposta l'attributo lang del documento
    document.documentElement.dir = getHTMLTextDir(locale); // Imposta la direzione del testo (ltr o rtl) in base alla lingua
  }, [locale]);
};
```
