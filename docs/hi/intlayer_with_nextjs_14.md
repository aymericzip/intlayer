# Getting Started internationalizing (i18n) with Intlayer and Next.js 14 with App Router

## What is Intlayer?

**Intlayer** एक अभिनव, ओपन-सोर्स अंतर्राष्ट्रीयकरण (i18n) पुस्तकालय है जिसे आधुनिक वेब अनुप्रयोगों में बहुभाषी समर्थन को सरल बनाने के लिए डिज़ाइन किया गया है। Intlayer नवीनतम **Next.js 14** ढांचे के साथ seamlessly एकीकृत होता है, जिसमें इसकी शक्तिशाली **App Router** शामिल है। यह कुशल रेंडरिंग के लिए **Server Components** के साथ काम करने के लिए अनुकूलित है और [**Turbopack**](https://nextjs.org/docs/architecture/turbopack) (Next.js >= 15 से) के साथ पूरी तरह से संगत है।

Intlayer के साथ, आप:

- **सहजता से अनुवाद प्रबंधित करें** घटक स्तर पर वर्णात्मक शब्दकोश का उपयोग करके।
- **गति से स्थानीयकरण करें** मेटाडेटा, मार्गों, और सामग्री।
- **क्लाइंट-साइड और सर्वर-साइड घटकों में अनुवादों तक पहुँच प्राप्त करें**।
- **TypeScript समर्थन सुनिश्चित करें** स्वचालित प्रकारों के साथ, ऑटोपूर्णता और त्रुटि पहचान को बेहतर बनाते हुए।
- **उन्नत सुविधाओं का लाभ उठाएँ**, जैसे कि गतिशील लोकल डिटेक्शन और स्विचिंग।

> नोट: Intlayer Next.js 12, 13, 14, और 15 के साथ संगत है। यदि आप Next.js Page Router का उपयोग कर रहे हैं, तो आप इस [गाइड](https://github.com/aymericzip/intlayer/blob/main/docs/hi/intlayer_with_nextjs_page_router.md) का संदर्भ ले सकते हैं। Next.js 15 के साथ या बिना turbopack के लिए, इस [गाइड](https://github.com/aymericzip/intlayer/blob/main/docs/hi/intlayer_with_nextjs_15.md) का संदर्भ लें।

---

## Step-by-Step Guide to Set Up Intlayer in a Next.js Application

### Step 1: Install Dependencies

npm का उपयोग करके आवश्यक पैकेज स्थापित करें:

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

अपनी एप्लिकेशन की भाषाओं को कॉन्फ़िगर करने के लिए एक कॉन्फ़िग फ़ाइल बनाएं:

```typescript
// intlayer.config.ts

import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // आपके अन्य भाषाएँ
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

सभी उपलब्ध पैरामीटर देखने के लिए, [कॉन्फ़िगरेशन दस्तावेज़ यहाँ](https://github.com/aymericzip/intlayer/blob/main/docs/hi/configuration.md) देखें।

### Step 3: Integrate Intlayer in Your Next.js Configuration

Intlayer का उपयोग करते हुए अपने Next.js सेटअप को कॉन्फ़िगर करें:

```typescript
// next.config.mjs
import { withIntlayer } from "next-intlayer/server";

/** @type {import('next').NextConfig} */
const nextConfig = {};

export default withIntlayer(nextConfig);
```

### Step 4: Configure Middleware for Locale Detection

उपयोगकर्ता की पसंदीदा लोकल को पहचानने के लिए मिडलवेयर सेट करें:

```typescript
// src/middleware.ts
export { intlayerMiddleware as middleware } from "next-intlayer/middleware";

export const config = {
  matcher: "/((?!api|static|.*\\..*|_next).*)",
};
```

### Step 5: Define Dynamic Locale Routes

स्थानीयकृत सामग्री के लिए गतिशील रूटिंग लागू करें:

`src/app/page.ts` को `src/app/[locale]/page.ts` में बदलें।

फिर, अपने एप्लिकेशन लेआउट में generateStaticParams फ़ंक्शन लागू करें।

```tsx
// src/app/layout.tsx

import type { ReactNode } from "react";
import "./globals.css";

export { generateStaticParams } from "next-intlayer"; // डालने की पंक्ति

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

import { type Next14LayoutIntlayer } from "next-intlayer";
import { Inter } from "next/font/google";
import { getHTMLTextDir } from "intlayer";

const inter = Inter({ subsets: ["latin"] });

const LocaleLayout: Next14LayoutIntlayer = ({
  children,
  params: { locale },
}) => (
  <html lang={locale} dir={getHTMLTextDir(locale)}>
    <body className={inter.className}>{children}</body>
  </html>
);

export default LocaleLayout;
```

### Step 6: Declare Your Content

अपनी सामग्री की शब्दकोश बनाएं और प्रबंधित करें:

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

[अपनी Intlayer डिक्लरेशन फाइलें कैसे घोषित करें, देखें](https://github.com/aymericzip/intlayer/blob/main/docs/hi/content_declaration/get_started.md)。

### Step 7: Utilize Content in Your Code

अपने अनुप्रयोग में अपनी सामग्री की शब्दकोश का उपयोग करें:

```tsx
// src/app/[locale]/page.ts

import { ClientComponentExample } from "@component/ClientComponentExample";
import { LocaleSwitcher } from "@component/LangSwitcherDropDown";
import { NestedServerComponentExample } from "@component/NestedServerComponentExample";
import { ServerComponentExample } from "@component/ServerComponentExample";
import { type Next14PageIntlayer, IntlayerClientProvider } from "next-intlayer";
import { IntlayerServerProvider, useIntlayer } from "next-intlayer/server";

const Page: Next14PageIntlayer = ({ params: { locale } }) => {
  const content = useIntlayer("page", locale);

  return (
    <>
      <p>
        {content.getStarted.main}
        <code>{content.getStarted.pageLink}</code>
      </p>
      {/**
       *   IntlayerServerProvider का उपयोग सर्वर बच्चों को लोकल प्रदान करने के लिए किया जाता है
       *   यदि लेआउट में सेट किया जाए तो काम नहीं करेगा
       */}
      <IntlayerServerProvider locale={locale}>
        <ServerComponentExample />
      </IntlayerServerProvider>
      {/**
       *   IntlayerClientProvider का उपयोग क्लाइंट बच्चों को लोकल प्रदान करने के लिए किया जाता है
       *   इसे किसी भी माता-पिता घटक में सेट किया जा सकता है, जिसमें लेआउट भी शामिल है
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
  const content = useIntlayer("client-component-example"); // संबंधित सामग्री डिक्लरेशन बनाएँ

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
  const content = useIntlayer("server-component-example"); // संबंधित सामग्री डिक्लरेशन बनाएँ

  return (
    <div>
      <h2>{content.title} </h2>
      <p>{content.content}</p>
    </div>
  );
};
```

> नोट: यदि आप अपनी सामग्री को `string` विशेषता में उपयोग करना चाहते हैं, जैसे `alt`, `title`, `href`, `aria-label`, आदि, तो आपको फ़ंक्शन के मान को कॉल करना चाहिए, जैसे:
>
> ```tsx
> <img src={content.image.src.value} alt={content.image.value} />
> ```

क्लाइंट या सर्वर घटक में intlayer के उपयोग के अधिक विस्तृत तरीके के लिए, [nextJS उदाहरण यहाँ देखें](https://github.com/aymericzip/intlayer/blob/main/examples/nextjs-app/src/app/%5Blocale%5D/demo-usage-components/page.tsx)।

### (Optional) Step 8: Internationalization of your metadata

यदि आप अपने मेटाडेटा का अंतर्राष्ट्रीयकरण करना चाहते हैं, जैसे कि आपके पृष्ठ का शीर्षक, तो आप NextJS द्वारा प्रदान की गई `generateMetadata` फ़ंक्शन का उपयोग कर सकते हैं। फ़ंक्शन के अंदर अपने मेटाडेटा का अनुवाद करने के लिए `getTranslationContent` फ़ंक्शन का उपयोग करें।

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
   * प्रत्येक लोकल के लिए सभी यूआरएल वाला एक ऑब्जेक्ट उत्पन्न करता है।
   *
   * उदाहरण:
   * ```ts
   *  getLocalizedUrl('/about');
   *
   *  // लौटाता है
   *  // {
   *  //   en: '/about',
   *  //   fr: '/fr/about',
   *  //   es: '/es/about',
   *  // }
   * ```
   */
  const multilingualUrls = getMultilingualUrls(url);

  /**
   * वर्तमान लोकल के लिए स्थानीयकृत URL प्राप्त करें
   *
   * उदाहरण:
   * ```ts
   * const localizedUrl = getLocalizedUrl('/about', locale);
   *
   * लौटाता है:
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

// ... शेष कोड
````

> मेटाडेटा अनुकूलन के बारे में अधिक जानें [आधिकारिक Next.js दस्तावेज़ पर](https://nextjs.org/docs/app/building-your-application/optimizing/metadata)।

### (Optional) Step 9: Internationalization of your sitemap

अपने साईटमैप का अंतर्राष्ट्रीयकरण करने के लिए, आप Intlayer द्वारा प्रदान की गई `getMultilingualUrls` फ़ंक्शन का उपयोग कर सकते हैं। यह फ़ंक्शन आपको अपने साईटमैप के लिए बहुभाषी URL उत्पन्न करने की अनुमति देता है।

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

> साईटमैप अनुकूलन के बारे में अधिक जानें [आधिकारिक Next.js दस्तावेज़ पर](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap)।

### (Optional) Step 10: Change the language of your content

अपनी सामग्री की भाषा बदलने के लिए, आप `useLocale` हुक द्वारा प्रदान की गई `setLocale` फ़ंक्शन का उपयोग कर सकते हैं। यह फ़ंक्शन आपको एप्लिकेशन की लोकल सेट करने और सामग्री को तदनुसार अपडेट करने की अनुमति देता है।

```tsx
import { Locales } from "intlayer";
import { useLocale } from "next-intlayer";

const MyComponent = () => {
  const { setLocale } = useLocale();

  return (
    <button onClick={() => setLocale(Locales.English)}>Change Language</button>
  );
};
```

### Configure TypeScript

Intlayer TypeScript के लाभों को प्राप्त करने और आपके कोडबेस को मजबूत बनाने के लिए मॉड्यूल ऑग्मेंटेशन का उपयोग करता है।

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png)

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png)

सुनिश्चित करें कि आपकी TypeScript कॉन्फ़िगरेशन में स्वचालित रूप से उत्पन्न प्रकार शामिल हैं।

```json5
// tsconfig.json

{
  // आपकी कस्टम कॉन्फ़िगरेशन
  include: [
    "src",
    "types", // <- स्वचालित रूप से उत्पन्न प्रकारों को शामिल करें
  ],
}
```

### Git Configuration

Intlayer द्वारा उत्पन्न फ़ाइलों को नजरअंदाज करने की सिफारिश की जाती है। यह आपको उन्हें अपनी Git रिपॉजिटरी में कमिट करने से बचा सकता है।

ऐसा करने के लिए, आप अपने `.gitignore` फ़ाइल में निम्नलिखित निर्देश जोड़ सकते हैं:

```gitignore
# Intlayer द्वारा उत्पन्न फ़ाइलों को नजरअंदाज करें
.intlayer
```
