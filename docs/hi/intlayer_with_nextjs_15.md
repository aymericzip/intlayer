# Getting Started internationalizing (i18n) with Intlayer and Next.js 15 App Router

## What is Intlayer?

**Intlayer** एक नवीन, ओपन-सोर्स अंतर्राष्ट्रीयकरण (i18n) लाइब्रेरी है जो आधुनिक वेब अनुप्रयोगों में बहुभाषी समर्थन को सरल बनाने के लिए डिज़ाइन की गई है। Intlayer नवीनतम **Next.js 15** ढांचे के साथ निर्बाध रूप से एकीकृत होता है, जिसमें इसकी शक्तिशाली **App Router** शामिल है। यह कुशल रेंडरिंग के लिए **Server Components** के साथ काम करने के लिए अनुकूलित है और [**Turbopack**](https://nextjs.org/docs/architecture/turbopack) के साथ पूरी तरह से संगत है।

Intlayer के साथ, आप:

- **कंपोनेंट स्तर पर घोषणात्मक शब्दकोशों** का उपयोग करके अनुवादों को आसानी से प्रबंधित करें।
- **मेटाडेटा**, मार्गों, और सामग्री को गतिशील रूप से स्थानीयकृत करें।
- **क्लाइंट-साइड और सर्वर-साइड घटकों** में अनुवादों तक पहुँच प्राप्त करें।
- **TypeScript समर्थन सुनिश्चित करें** स्वचालित प्रकारों के साथ, ऑटो-कंप्लीशन और त्रुटि पहचान में सुधार करें।
- **उन्नत फीचर्स का लाभ उठाएं**, जैसे गतिशील लोकेल पहचान और स्विचिंग।

> नोट: Intlayer Next.js 12, 13, 14, और 15 के साथ संगत है। यदि आप Next.js Page Router का उपयोग कर रहे हैं, तो आप इस [गाइड](https://github.com/aymericzip/intlayer/blob/main/docs/en/intlayer_with_nextjs_page_router.md) का उल्लेख कर सकते हैं। Next.js 12, 13, 14 के साथ App Router के लिए, इस [गाइड](https://github.com/aymericzip/intlayer/blob/main/docs/en/intlayer_with_nextjs_14.md) को देखें।

---

## Step-by-Step Guide to Set Up Intlayer in a Next.js Application

### Step 1: Install Dependencies

आवश्यक पैकेजों को npm का उपयोग करके स्थापित करें:

```bash
npm install intlayer next-intlayer
```

```bash
yarn add intlayer next-intlayer
```

```bash
pnpm add intlayer next-intlayer
```

### Step 2: Configure Your Project

अपने अनुप्रयोग की भाषाओं को कॉन्फ़िगर करने के लिए एक कॉन्फ़िग फ़ाइल बनाएं:

```typescript
// intlayer.config.ts

import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // आपके अन्य लोकल
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

सभी उपलब्ध पैरामीटर देखने के लिए, [कॉन्फ़िगरेशन दस्तावेज़ यहाँ](https://github.com/aymericzip/intlayer/blob/main/docs/en/configuration.md) देखें।

### Step 3: Integrate Intlayer in Your Next.js Configuration

Intlayer का उपयोग करने के लिए अपने Next.js सेटअप को कॉन्फ़िगर करें:

```typescript
// next.config.mjs
import { withIntlayer } from "next-intlayer/server";

/** @type {import('next').NextConfig} */
const nextConfig = {};

export default withIntlayer(nextConfig);
```

### Step 4: Configure Middleware for Locale Detection

उपयोगकर्ता की पसंदीदा लोकेल का पता लगाने के लिए मिडलवेयर सेट करें:

```typescript
// src/middleware.ts
export { intlayerMiddleware as middleware } from "next-intlayer/middleware";

export const config = {
  matcher: "/((?!api|static|.*\\..*|_next).*)",
};
```

### Step 5: Define Dynamic Locale Routes

स्थानीयकृत सामग्री के लिए गतिशील रूटिंग लागू करें:

`src/app/page.ts` को `src/app/[locale]/page.ts` में बदलें

फिर, अपने अनुप्रयोग लेआउट में generateStaticParams फ़ंक्शन लागू करें।

```tsx
// src/app/layout.tsx

import type { ReactNode } from "react";
import "./globals.css";

export { generateStaticParams } from "next-intlayer"; // डालने के लिए पंक्ति

const RootLayout = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => children;

export default RootLayout;
```

फिर अपने `[locale]` निर्देशिका में एक नया लेआउट जोड़ें:

```tsx
// src/app/[locale]/layout.tsx

import { type NextLayoutIntlayer } from "next-intlayer";
import { Inter } from "next/font/google";
import { getHTMLTextDir } from "intlayer";

const inter = Inter({ subsets: ["latin"] });

const LocaleLayout: NextLayoutIntlayer = async ({ children, params }) => {
  const { locale } = await params;
  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <body className={inter.className}>{children}</body>
    </html>
  );
};

export default LocaleLayout;
```

### Step 6: Declare Your Content

अपनी सामग्री शब्दकोशों को बनाएं और प्रबंधित करें:

```tsx
// src/app/[locale]/page.content.ts
import { t, type DeclarationContent } from "intlayer";

const pageContent = {
  key: "page",
  content: {
    getStarted: {
      main: t({
        en: "Get started by editing",
        fr: "Commencez par éditer",
        es: "Comience por editar",
      }),
      pageLink: "src/app/page.tsx",
    },
  },
} satisfies DeclarationContent;

export default pageContent;
```

[अपनी Intlayer घोषणा फ़ाइलों को घोषित करने के तरीके को देखें](https://github.com/aymericzip/intlayer/blob/main/docs/en/content_declaration/get_started.md)。

### Step 7: Utilize Content in Your Code

अपनी सामग्री शब्दकोशों को अपने अनुप्रयोग में एक्सेस करें:

```tsx
// src/app/[locale]/page.ts

import { ClientComponentExample } from "@component/ClientComponentExample";
import { LocaleSwitcher } from "@component/LangSwitcherDropDown";
import { NestedServerComponentExample } from "@component/NestedServerComponentExample";
import { ServerComponentExample } from "@component/ServerComponentExample";
import { type NextPageIntlayer, IntlayerClientProvider } from "next-intlayer";
import { IntlayerServerProvider, useIntlayer } from "next-intlayer/server";

const PageContent = () => {
  const { title, content } = useIntlayer("page");

  return (
    <>
      <p>{content.getStarted.main}</p>
      <code>{content.getStarted.pageLink}</code>
    </>
  );
};

const Page: NextPageIntlayer = async ({ params }) => {
  const { locale } = await params;

  return (
    <>
      {/**
       *   IntlayerServerProvider का उपयोग सर्वर बच्चे को स्थानीयता प्रदान करने के लिए किया जाता है
       *   लेआउट में सेट करने पर काम नहीं करेगा
       */}
      <IntlayerServerProvider locale={locale}>
        <PageContent />
        <ServerComponentExample />
      </IntlayerServerProvider>
      {/**
       *   IntlayerClientProvider का उपयोग क्लाइंट बच्चों को स्थानीयता प्रदान करने के लिए किया जाता है
       *   किसी भी माता-पिता घटक में सेट किया जा सकता है, जिसमें लेआउट शामिल है
       */}
      <IntlayerClientProvider locale={locale}>
        <ClientComponentExample />
      </IntlayerClientProvider>
    </>
  );
};

export default Page;
```

```tsx
// src/components/ClientComponentExample.tsx

"use client";

import { useIntlayer } from "next-intlayer";

export const ClientComponentExample = () => {
  const content = useIntlayer("client-component-example"); // संबंधित सामग्री घोषणा बनाएं

  return (
    <div>
      <h2>{content.title} </h2>
      <p>{content.content}</p>
    </div>
  );
};
```

```tsx
// src/components/ServerComponentExample.tsx

import { useIntlayer } from "next-intlayer/server";

export const ServerComponentExample = () => {
  const content = useIntlayer("server-component-example"); // संबंधित सामग्री घोषणा बनाएं

  return (
    <div>
      <h2>{content.title} </h2>
      <p>{content.content}</p>
    </div>
  );
};
```

> नोट: यदि आप अपनी सामग्री को `string` विशेषता, जैसे `alt`, `title`, `href`, `aria-label`, आदि में उपयोग करना चाहते हैं, तो आपको फ़ंक्शन के मान को कॉल करना होगा, जैसे:
>
> ```tsx
> <img src={content.image.src.value} alt={content.image.value} />
> ```

क्लाइंट या सर्वर कंपोनेंट में intlayer के उपयोग के बारे में अधिक जानकारी के लिए, [nextJS उदाहरण यहाँ देखें](https://github.com/aymericzip/intlayer/blob/main/examples/nextjs-app/src/app/%5Blocale%5D/demo-usage-components/page.tsx)।

### (Optional) Step 8: Internationalization of your metadata

यदि आप अपने मेटाडेटा का अंतर्राष्ट्रीयकरण करना चाहते हैं, जैसे अपने पृष्ठ का शीर्षक, तो आप NextJS द्वारा प्रदान किए गए `generateMetadata` फ़ंक्शन का उपयोग कर सकते हैं। फ़ंक्शन के अंदर मेटाडेटा का अनुवाद करने के लिए `getTranslationContent` फ़ंक्शन का उपयोग करें।

````typescript
// src/app/[locale]/layout.tsx या src/app/[locale]/page.tsx

import {
  type IConfigLocales,
  getTranslationContent,
  getMultilingualUrls,
} from "intlayer";
import type { Metadata } from "next";
import type { LocalParams } from "next-intlayer";

export const generateMetadata = ({
  params: { locale },
}: LocalParams): Metadata => {
  const t = <T>(content: IConfigLocales<T>) =>
    getTranslationContent(content, locale);

  const url = `/`;

  /**
   * सभी लोकल के लिए प्रत्येक url उत्पन्न करने वाला एक ऑब्जेक्ट बनाता है।
   *
   * उदाहरण:
   * ```ts
   *  getLocalizedUrl('/about');
   *
   *  // लौटता है
   *  // {
   *  //   en: '/about',
   *  //   fr: '/fr/about',
   *  //   es: '/es/about',
   *  // }
   * ```
   */
  const multilingualUrls = getMultilingualUrls(url);

  /**
   * वर्तमान लोकेल के लिए स्थानीयकृत URL प्राप्त करें
   *
   * उदाहरण:
   * ```ts
   * const localizedUrl = getLocalizedUrl('/about', locale);
   *
   * लौटता है:
   * '/fr/about' फ्रेंच लोकल के लिए
   * ```
   */
  const localizedUrl = getLocalizedUrl(url, locale);

  return {
    title: t<string>({
      en: "My title",
      fr: "Mon titre",
      es: "Mi título",
    }),
    description: t({
      en: "My description",
      fr: "Ma description",
      es: "Mi descripción",
    }),
    alternates: {
      canonical: url,
      languages: multilingualUrls,
    },
    openGraph: {
      url: localizedUrl,
    },
  };
};

// ... कोड का बाकी हिस्सा
````

> मेटाडेटा अनुकूलन के बारे में अधिक जानें [अधिकारी Next.js दस्तावेज़ में](https://nextjs.org/docs/app/building-your-application/optimizing/metadata)।

### (Optional) Step 9: Internationalization of your sitemap

अपने साइटमैप का अंतर्राष्ट्रीयकरण करने के लिए, आप Intlayer द्वारा प्रदान किए गए `getMultilingualUrls` फ़ंक्शन का उपयोग कर सकते हैं। यह फ़ंक्शन आपके साइटमैप के लिए बहुभाषी URLs उत्पन्न करने की अनुमति देता है।

```tsx
// src/app/sitemap.ts

import { getMultilingualUrls } from "intlayer";
import type { MetadataRoute } from "next";

const url = `https://example.com`;

const sitemap = (): MetadataRoute.Sitemap => [
  {
    url,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 1,
    alternates: {
      languages: getMultilingualUrls(url),
    },
  },
];

export default sitemap;
```

> साइटमैप अनुकूलन के बारे में अधिक जानें [अधिकारी Next.js दस्तावेज़ में](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap)।

### (Optional) Step 10: Change the language of your content

अपनी सामग्री की भाषा बदलने के लिए, आप `useLocale` हुक द्वारा प्रदान किए गए `setLocale` फ़ंक्शन का उपयोग कर सकते हैं। यह फ़ंक्शन आपको अनुप्रयोग का स्थानीयता सेट करने और सामग्री को तदनुसार अपडेट करने की अनुमति देता है।

```tsx
import { Locales } from "intlayer";
import { useLocale } from "next-intlayer";

const MyComponent = () => {
  const { setLocale } = useLocale();

  return <button onClick={() => setLocale(Locales.English)}>बोली बदलें</button>;
};
```

### Configure TypeScript

Intlayer अपने कोडबेस को मजबूत बनाने के लिए TypeScript के लाभों को प्राप्त करने के लिए मॉड्यूल संवर्द्धन का उपयोग करता है।

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png)

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png)

सुनिश्चित करें कि आपकी TypeScript कॉन्फ़िगरेशन में स्वचालित रूप से उत्पन्न प्रकार शामिल हैं।

```json5
// tsconfig.json

{
  // आपकी कस्टम सेटिंग
  include: [
    "src",
    "types", // <- ऑटो जनरेटेड प्रकार शामिल करें
  ],
}
```

### Git Configuration

Intlayer द्वारा उत्पन्न फ़ाइलों को नजरअंदाज करना अनुशंसित है। यह आपको उन्हें अपने Git भंडार में कमिट करने से रोकता है।

इसके लिए, आप अपनी `.gitignore` फ़ाइल में निम्नलिखित निर्देश जोड़ सकते हैं:

```gitignore
# Intlayer द्वारा उत्पन्न फ़ाइलों को नजरअंदाज करें
.intlayer
```
