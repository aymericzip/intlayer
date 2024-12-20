# Getting Started internationalizing (i18n) with Intlayer and Next.js 15 App Router

## What is Intlayer?

**Intlayer** एक नवीनतम, ओपन-सोर्स अंतर्राष्ट्रीयकरण (i18n) पुस्तकालय है जिसे आधुनिक वेब अनुप्रयोगों में बहुभाषी समर्थन को सरल बनाने के लिए डिज़ाइन किया गया है। Intlayer नवीनतम **Next.js 15** ढांचे के साथ स्वचालित रूप से एकीकृत होता है, जिसमें इसकी शक्तिशाली **App Router** शामिल है। यह कुशल रेंडरिंग के लिए **Server Components** के साथ काम करने के लिए अनुकूलित है और [**Turbopack**](https://nextjs.org/docs/architecture/turbopack) के साथ पूरी तरह से संगत है।

Intlayer के साथ, आप कर सकते हैं:

- **घटक स्तर पर घोषणात्मक डिक्शनरी का उपयोग करके अनुवादों का आसानी से प्रबंधन करें**।
- **मेटाडेटा, मार्गों, और सामग्री का गतिशील स्थानीयकरण करें**।
- **क्लाइंट-साइड और सर्वर-साइड घटकों में अनुवादों तक पहुंचें**।
- **TypeScript समर्थन सुनिश्चित करें** स्वचालित प्रकारों के साथ, स्वचालित पूरा करना और त्रुटि पहचान में सुधार।
- **उन्नत सुविधाओं का लाभ उठाएं**, जैसे गतिशील स्थानीयकरण पहचान और स्विचिंग।

> नोट: Intlayer Next.js 12, 13, 14, और 15 के साथ संगत है। यदि आप Next.js Page Router का उपयोग कर रहे हैं, तो आप इस [गाइड](https://github.com/aymericzip/intlayer/blob/main/docs/hi/intlayer_with_nextjs_page_router.md) को देख सकते हैं। Next.js 12, 13, 14 App Router के साथ, इस [गाइड](https://github.com/aymericzip/intlayer/blob/main/docs/hi/intlayer_with_nextjs_14.md) का संदर्भ लें।

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
      // आपके अन्य स्थानीयकृत
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

सभी उपलब्ध पैरामीटर देखने के लिए, इस [कॉन्फ़िगरेशन दस्तावेज़ को यहाँ](https://github.com/aymericzip/intlayer/blob/main/docs/hi/configuration.md) देखें।

### Step 3: Integrate Intlayer in Your Next.js Configuration

अपने Next.js सेटअप को Intlayer का उपयोग करने के लिए कॉन्फ़िगर करें:

```typescript
// next.config.mjs
import { withIntlayer } from "next-intlayer/server";

/** @type {import('next').NextConfig} */
const nextConfig = {};

export default withIntlayer(nextConfig);
```

### Step 4: Configure Middleware for Locale Detection

उपयोगकर्ता की पसंदीदा स्थान पहचानने के लिए मिडलवेयर सेट करें:

```typescript
// src/middleware.ts
export { intlayerMiddleware as middleware } from "next-intlayer/middleware";

export const config = {
  matcher: "/((?!api|static|.*\\..*|_next).*)",
};
```

### Step 5: Define Dynamic Locale Routes

स्थानीयकृत सामग्री के लिए गतिशील रूटिंग कार्यान्वित करें:

`src/app/page.ts` को `src/app/[locale]/page.ts` में बदलें

फिर, अपने अनुप्रयोग लेआउट में generateStaticParams फ़ंक्शन को कार्यान्वित करें।

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

फिर अपने `[locale]` डायरेक्टरी में एक नई लेआउट जोड़ें:

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

अपनी सामग्री डिक्शनरीज बनाएं और प्रबंधित करें:

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

[अपनी Intlayer घोषणा फ़ाइलों को घोषित करने का तरीका देखें](https://github.com/aymericzip/intlayer/blob/main/docs/hi/content_declaration/get_started.md)。

### Step 7: Utilize Content in Your Code

अपने अनुप्रयोग में अपनी सामग्री डिक्शनरी तक पहुँचें:

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
       *   IntlayerServerProvider का उपयोग सर्वर बच्चों को स्थिति प्रदान करने के लिए किया जाता है
       *   लेआउट में सेट करने पर काम नहीं करता है
       */}
      <IntlayerServerProvider locale={locale}>
        <PageContent />
        <ServerComponentExample />
      </IntlayerServerProvider>
      {/**
       *   IntlayerClientProvider का उपयोग क्लाइंट बच्चों को स्थिति प्रदान करने के लिए किया जाता है
       *   इसे किसी भी पेरेंट कॉम्पोनेंट में सेट किया जा सकता है, जिसमें लेआउट भी शामिल है
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

> नोट: यदि आप अपनी सामग्री का उपयोग किसी `string` विशेषता में करना चाहते हैं, जैसे `alt`, `title`, `href`, `aria-label`, आदि, तो आपको फ़ंक्शन के मान को कॉल करना चाहिए, जैसे:
>
> ```tsx
> <img src={content.image.src.value} alt={content.image.value} />
> ```

क्लाइंट या सर्वर घटक में intlayer के उपयोग के लिए अधिक विस्तृत जानकारी के लिए [Next.js उदाहरण यहाँ](https://github.com/aymericzip/intlayer/tree/main/examples/nextjs-15-app) देखें।

### (Optional) Step 8: Internationalization of your metadata

यदि आप अपने मेटाडेटा, जैसे अपने पृष्ठ का शीर्षक, का अंतर्राष्ट्रीयकरण करना चाहते हैं, तो आप Next.js द्वारा प्रदान की गई `generateMetadata` फ़ंक्शन का उपयोग कर सकते हैं। फ़ंक्शन के अंदर अपने मेटाडेटा का अनुवाद करने के लिए `getTranslationContent` फ़ंक्शन का उपयोग करें।

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

  /**
   * प्रत्येक स्थानीय के लिए सभी यूआरएल वाली वस्तु उत्पन्न करता है।
   *
   * उदाहरण:
   * ```ts
   *  getMultilingualUrls('/about');
   *
   *  // वापस करें
   *  // {
   *  //   en: '/about',
   *  //   fr: '/fr/about',
   *  //   es: '/es/about',
   *  // }
   * ```
   */
  const multilingualUrls = getMultilingualUrls("/");

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
      languages: { ...multilingualUrls, "x-default": "/" },
    },
    openGraph: {
      url: multilingualUrls[locale],
    },
  };
};

// ... बाकी कोड
````

> मेटाडेटा ऑप्टिमाइजेशन के बारे में अधिक जानें [आधिकारिक Next.js दस्तावेज़ पर](https://nextjs.org/docs/app/building-your-application/optimizing/metadata)।

### (Optional) Step 9: Internationalization of your sitemap.xml and robots.txt

अपने `sitemap.xml` और `robots.txt` का अंतर्राष्ट्रीयकरण करने के लिए, आप Intlayer द्वारा प्रदान किए गए `getMultilingualUrls` फ़ंक्शन का उपयोग कर सकते हैं। यह फ़ंक्शन आपको अपने साइटमैप के लिए बहुभाषी यूआरएल उत्पन्न करने में मदद करता है।

```tsx
// src/app/sitemap.ts

import { getMultilingualUrls } from "intlayer";
import type { MetadataRoute } from "next";

const sitemap = (): MetadataRoute.Sitemap => [
  {
    url: "https://example.com",
    alternates: {
      languages: getMultilingualUrls("https://example.com"),
    },
  },
  {
    url: "https://example.com/login",
    alternates: {
      languages: getMultilingualUrls("https://example.com/login"),
    },
  },
  {
    url: "https://example.com/register",
    alternates: {
      languages: getMultilingualUrls("https://example.com/register"),
    },
  },
];

export default sitemap;
```

```tsx
// src/app/robots.ts
import type { MetadataRoute } from "next";
import { getMultilingualUrls } from "intlayer";

const getAllMultilingualUrls = (urls: string[]) =>
  urls.flatMap((url) => Object.values(getMultilingualUrls(url)) as string[]);

const robots = (): MetadataRoute.Robots => ({
  rules: {
    userAgent: "*",
    allow: ["/"],
    disallow: getAllMultilingualUrls(["/login", "/register"]),
  },
  host: "https://example.com",
  sitemap: `https://example.com/sitemap.xml`,
});

export default robots;
```

> साइटमैप ऑप्टिमाइजेशन के बारे में अधिक जानें [आधिकारिक Next.js दस्तावेज़ पर](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap)। रोबोट.txt ऑप्टिमाइजेशन के बारे में अधिक जानें [आधिकारिक Next.js दस्तावेज़ पर](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots)।

### (Optional) Step 10: Change the language of your content

अपनी सामग्री की भाषा बदलने के लिए, आप `useLocale` हुक द्वारा प्रदान की गई `setLocale` फ़ंक्शन का उपयोग कर सकते हैं। यह फ़ंक्शन आपको अनुप्रयोग की स्थानीयता सेट करने और सामग्री को तदनुसार अपडेट करने में मदद करता है।

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

Intlayer TypeScript का लाभ उठाने के लिए मॉड्यूल ऑग्मेंटेशन का उपयोग करता है और आपके कोडबेस को मजबूत बनाता है।

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

Intlayer द्वारा उत्पन्न फ़ाइलों को अनदेखा करना सिफारिश की जाती है। इससे आप उन्हें अपने Git रिपॉजिटरी में कमिट करने से बच सकते हैं।

इसके लिए, आप अपनी `.gitignore` फ़ाइल में निम्नलिखित निर्देश जोड़ सकते हैं:

```gitignore
# Intlayer द्वारा उत्पन्न फ़ाइलों को अनदेखा करें
.intlayer
```
