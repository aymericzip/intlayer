---
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: क्या Next.js के साथ पेज पाथ में `[locale]` के बिना Intlayer का उपयोग करना संभव है?
description: जानें कि Next.js के साथ पेज पाथ में `[locale]` के बिना Intlayer का उपयोग कैसे करें।
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
  - doc
  - faq
  - ssr-next-no-[locale]
---

# क्या Next.js के साथ पेज पाथ में `[locale]` के बिना Intlayer का उपयोग करना संभव है?

हाँ, Next.js के साथ पेज पाथ में `[locale]` के बिना Intlayer का उपयोग करना संभव है। हालांकि, ऐसा करने की सलाह नहीं दी जाती है, क्योंकि आपके पेज को विभाजित करने से सर्च इंजन पर अधिक कीवर्ड ट्रिगर करने की अनुमति मिलती है। आपका SSR भी प्रभावित हो सकता है।

यदि आप ऐसा करना चाहते हैं, तो [Intlayer with Next.js](https://intlayer.org/doc/environment/nextjs) गाइड में वर्णित समान चरणों का पालन करें,

- कोई `src/middleware.ts` नहीं
- कोई `generateStaticParams` नहीं

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

    // दस्तावेज़ की भाषा सेट करें
    document.documentElement.lang = locale;
    // दस्तावेज़ की दिशा सेट करें (LTR या RTL)
    document.documentElement.dir = getHTMLTextDir(locale);
  }, [locale]);
};
```
