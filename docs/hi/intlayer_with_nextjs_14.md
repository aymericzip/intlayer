# Getting Started internationalizing (i18n) with Intlayer and Next.js 14 with App Router

## What is Intlayer?

**Intlayer** एक नवोन्मेषी, ओपन-सोर्स अंतर्राष्ट्रीयकरण (i18n) पुस्तकालय है जो आधुनिक वेब अनुप्रयोगों में बहुभाषी समर्थन को सरल बनाता है। Intlayer नवीनतम **Next.js 14** ढाँचे के साथ सहजता से एकीकृत होता है, जिसमें इसकी शक्तिशाली **App Router** शामिल होती है। इसे **Server Components** के साथ कुशलता से रेंडर करने के लिए अनुकूलित किया गया है और यह [**Turbopack**](https://nextjs.org/docs/architecture/turbopack) (Next.js >= 15) के साथ पूरी तरह से संगत है।

Intlayer के साथ, आप:

- **घटक स्तर पर घोषणात्मक शब्दकोशों** का उपयोग करके अनुवादों को आसानी से प्रबंधित कर सकते हैं।
- **मेटाडेटा**, मार्ग और सामग्री को **गति से स्थानीयकृत** कर सकते हैं।
- **क्लाइंट-साइड और सर्वर-साइड घटकों** में अनुवादों तक पहुंच प्राप्त कर सकते हैं।
- **TypeScript समर्थन सुनिश्चित करें** स्वचालित प्रकारों के साथ, ऑटोकंप्लीशन और त्रुटि पहचान में सुधार।
- **उन्नत सुविधाओं का लाभ उठाएं**, जैसे गतिशील अवस्था पता लगाने और स्विच करने की क्षमता।

> नोट: Intlayer Next.js 12, 13, 14 और 15 के साथ संगत है। यदि आप Next.js पृष्ठ राउटर का उपयोग कर रहे हैं, तो आप इस [गाइड](https://github.com/aymericzip/intlayer/blob/main/docs/hi/intlayer_with_nextjs_page_router.md) का संदर्भ ले सकते हैं। Next.js 15 के लिए, टरबोपैक के साथ या बिना, इस [गाइड](https://github.com/aymericzip/intlayer/blob/main/docs/hi/intlayer_with_nextjs_15.md) का संदर्भ लें।

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
      // आपके अन्य क्षेत्र
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

सभी उपलब्ध पैरामीटर देखने के लिए, [यहाँ कॉन्फ़िगरेशन दस्तावेज़](https://github.com/aymericzip/intlayer/blob/main/docs/hi/configuration.md) देखें।

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

उपयोगकर्ता की पसंदीदा भाषा का पता लगाने के लिए मिडलवेयर सेट करें:

```typescript
// src/middleware.ts
export { intlayerMiddleware as middleware } from "next-intlayer/middleware";

export const config = {
  matcher: "/((?!api|static|.*\\..*|_next).*)",
};
```

### Step 5: Define Dynamic Locale Routes

स्थानीयकरण सामग्री के लिए गतिशील रूटिंग लागू करें:

`src/app/page.ts` को `src/app/[locale]/page.ts` में बदलें।

फिर, अपने अनुप्रयोग लेआउट में `generateStaticParams` कार्यक्षमता लागू करें।

```tsx
// src/app/layout.tsx

import type { ReactNode } from "react";
import "./globals.css";

export { generateStaticParams } from "next-intlayer"; // पंक्ति जोड़ें

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

अपने सामग्री शब्दकोशों को बनाएं और प्रबंधित करें:

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

[अपनी Intlayer घोषणात्मक फ़ाइलों की घोषणा कैसे करें](https://github.com/aymericzip/intlayer/blob/main/docs/hi/content_declaration/get_started.md) देखें।

### Step 7: Utilize Content in Your Code

अपने अनुप्रयोग में अपने सामग्री शब्दकोशों का उपयोग करें:

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
       * IntlayerServerProvider सर्वर बच्चों को लोकल को प्रदान करने के लिए उपयोग किया जाता है
       * यदि लेआउट में सेट किया गया है तो काम नहीं करेगा
       */}
      <IntlayerServerProvider locale={locale}>
        <ServerComponentExample />
      </IntlayerServerProvider>
      {/**
       * IntlayerClientProvider क्लाइंट बच्चों को लोकल को प्रदान करने के लिए उपयोग किया जाता है
       * किसी भी पैरेंट कॉम्पोनेंट में सेट किया जा सकता है, जिसमें लेआउट शामिल है
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
  const content = useIntlayer("client-component-example"); // संबंधित सामग्री घोषणा बनाएँ

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
  const content = useIntlayer("server-component-example"); // संबंधित सामग्री घोषणा बनाएँ

  return (
    <div>
      <h2>{content.title} </h2>
      <p>{content.content}</p>
    </div>
  );
};
```

> नोट: यदि आप किसी `string` विशेषता में अपनी सामग्री का उपयोग करना चाहते हैं, जैसे `alt`, `title`, `href`, `aria-label`, आदि, तो आपको फ़ंक्शन के मान को कॉल करना होगा, जैसे:
>
> ```tsx
> <img src={content.image.src.value} alt={content.image.value} />
> ```

क्लाइंट या सर्वर घटक में intlayer के उपयोग के बारे में अधिक विस्तृत जानकारी के लिए, [Next.js उदाहरण यहाँ देखें](https://github.com/aymericzip/intlayer/blob/main/examples/nextjs-app/src/app/%5Blocale%5D/demo-usage-components/page.tsx)।

### (Optional) Step 8: Internationalization of your metadata

यदि आप अपने मेटाडेटा का अंतर्राष्ट्रीयकरण करना चाहते हैं, जैसे कि आपके पृष्ठ का शीर्षक, तो आप Next.js द्वारा प्रदान की गई `generateMetadata` कार्यक्षमता का उपयोग कर सकते हैं। कार्यक्षमता के भीतर, अपने मेटाडेटा का अनुवाद करने के लिए `getTranslationContent` कार्यक्षमता का उपयोग करें।

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
   * प्रत्येक क्षेत्र के लिए सभी url वाले एक ऑब्जेक्ट उत्पन्न करता है।
   *
   * उदाहरण:
   * ```ts
   *  getMultilingualUrls('/about');
   *
   *  // लौटाता है
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

// ... कोड का बाकी हिस्सा
````

> मेटाडेटा अनुकूलन के बारे में अधिक जानकारी [अधिकारी Next.js दस्तावेज़](https://nextjs.org/docs/app/building-your-application/optimizing/metadata) पर प्राप्त करें।

### (Optional) Step 9: Internationalization of your sitemap.xml and robots.txt

अपने `sitemap.xml` और `robots.txt` का अंतर्राष्ट्रीयकरण करने के लिए, आप Intlayer द्वारा प्रदान की गई `getMultilingualUrls` कार्यक्षमता का उपयोग कर सकते हैं। यह कार्यक्षमता आपको अपने साइटमैप के लिए बहुभाषी URLs उत्पन्न करने की अनुमति देती है।

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

> साइटमैप अनुकूलन के बारे में अधिक जानकारी [अधिकारी Next.js दस्तावेज़](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap) पर प्राप्त करें। `robots.txt` अनुकूलन के बारे में अधिक जानकारी [अधिकारी Next.js दस्तावेज़](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots) पर प्राप्त करें।

### (Optional) Step 10: Change the language of your content

आपकी सामग्री की भाषा बदलने के लिए, आप `useLocale` हुक द्वारा प्रदान की गई `setLocale` कार्यक्षमता का उपयोग कर सकते हैं। यह कार्यक्षमता आपको अनुप्रयोग की स्थानीयता सेट करने और सामग्री को उस अनुसार अपडेट करने की अनुमति देती है।

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

Intlayer TypeScript के लाभ प्राप्त करने के लिए मॉड्यूल वृद्धि का उपयोग करता है और आपके कोडबेस को मजबूत बनाता है।

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png)

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png)

सुनिश्चित करें कि आपकी TypeScript कॉन्फ़िगरेशन में स्वचालित रूप से उत्पन्न प्रकार शामिल हैं।

```json5
// tsconfig.json

{
  // आपकी कस्टम कॉन्फ़िग
  include: [
    "src",
    "types", // <- स्वचालित रूप से उत्पन्न प्रकारों को शामिल करें
  ],
}
```

### Git Configuration

Intlayer द्वारा उत्पन्न फ़ाइलों को अनदेखा करना अनुशंसित है। इससे आप उन्हें अपने Git भंडार में प्रतिबद्ध करने से बच सकते हैं।

इसके लिए, आप अपनी `.gitignore` फ़ाइल में निम्नलिखित निर्देश जोड़ सकते हैं:

```gitignore
# Intlayer द्वारा उत्पन्न फ़ाइलों को अनदेखा करें
.intlayer
```
