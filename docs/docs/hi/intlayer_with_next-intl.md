---
createdAt: 2025-10-05
updatedAt: 2025-10-05
title: अपने Next.js 15 को next-intl का उपयोग करके कैसे अनुवादित करें – i18n गाइड 2025
description: जानें कि अपने Next.js 15 App Router वेबसाइट को बहुभाषी कैसे बनाएं। अंतरराष्ट्रीयकरण (i18n) और अनुवाद के लिए दस्तावेज़ का पालन करें।
keywords:
  - अंतरराष्ट्रीयकरण
  - दस्तावेज़ीकरण
  - Intlayer
  - Next.js 15
  - next-intl
  - JavaScript
  - React
slugs:
  - doc
  - next-intl
applicationTemplate: https://github.com/aymericzip/intlayer-next-intl-template
---

# Intlayer का उपयोग करके अपने Next.js 15 को next-intl वेबसाइट के साथ अनुवादित करें | अंतरराष्ट्रीयकरण (i18n)

यह गाइड आपको Next.js 15 (App Router) ऐप में next-intl के सर्वोत्तम अभ्यासों के माध्यम से मार्गदर्शन करता है, और दिखाता है कि Intlayer को मजबूत अनुवाद प्रबंधन और स्वचालन के लिए कैसे ऊपर जोड़ा जाए।

[next-i18next vs next-intl vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/hi/next-i18next_vs_next-intl_vs_intlayer.md) में तुलना देखें।

- जूनियर्स के लिए: एक कार्यशील बहुभाषी ऐप प्राप्त करने के लिए चरण-दर-चरण अनुभागों का पालन करें।
- मध्य स्तर के डेवलपर्स के लिए: payload अनुकूलन और सर्वर/क्लाइंट पृथक्करण पर ध्यान दें।
- वरिष्ठों के लिए: स्थैतिक जनरेशन, मिडलवेयर, SEO एकीकरण, और स्वचालन हुक्स पर ध्यान दें।

हम क्या कवर करेंगे:

- सेटअप और फ़ाइल संरचना
- संदेशों को लोड करने के तरीके का अनुकूलन
- क्लाइंट और सर्वर कंपोनेंट का उपयोग
- SEO के लिए मेटाडेटा, साइटमैप, रोबोट्स
- स्थानीय रूटिंग के लिए मिडलवेयर
- Intlayer को ऊपर जोड़ना (CLI और स्वचालन)

## next-intl का उपयोग करके अपना एप्लिकेशन सेट करें

next-intl निर्भरताएँ इंस्टॉल करें:

```bash packageManager="npm"
npm install next-intl
```

```bash packageManager="pnpm"
pnpm add next-intl
```

```bash packageManager="yarn"
yarn add next-intl
```

```bash
.
├── locales
│   ├── en
│   │  ├── common.json
│   │  └── about.json
│   ├── fr
│   │  ├── common.json
│   │  └── about.json
│   └── es
│      ├── common.json
│      └── about.json
└── src
    ├── i18n.ts
    ├── middleware.ts
    ├── app
    │   └── [locale]
    │       ├── layout.tsx
    │       └── about
    │           └── page.tsx
    └── components
        ├── ClientComponentExample.tsx
        └── ServerComponent.tsx
```

#### सेटअप और कंटेंट लोड करना

केवल उन namespaces को लोड करें जिनकी आपकी routes को आवश्यकता है और प्रारंभ में locales को मान्य करें। जब संभव हो तो सर्वर कंपोनेंट्स को synchronous रखें और केवल आवश्यक संदेशों को क्लाइंट पर भेजें।

```tsx fileName="src/i18n.ts"
import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";

export const locales = ["en", "fr", "es"] as const;
export const defaultLocale = "en" as const;

async function loadMessages(locale: string) {
  // केवल उन namespaces को लोड करें जिनकी आपकी layout/pages को आवश्यकता है
  const [common, about] = await Promise.all([
    import(`../locales/${locale}/common.json`).then((m) => m.default),
    import(`../locales/${locale}/about.json`).then((m) => m.default),
  ]);

  return { common, about } as const;
}

export default getRequestConfig(async ({ locale }) => {
  if (!locales.includes(locale as any)) notFound();

  return {
    messages: await loadMessages(locale),
  };
});
```

```tsx fileName="src/app/[locale]/layout.tsx"
import type { ReactNode } from "react";
import { locales } from "@/i18n";
import {
  getLocaleDirection,
  unstable_setRequestLocale,
} from "next-intl/server";

export const dynamic = "force-static";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  const { locale } = params;

  // इस सर्वर रेंडर (RSC) के लिए सक्रिय अनुरोध locale सेट करें
  unstable_setRequestLocale(locale);

  const dir = getLocaleDirection(locale);

  return (
    <html lang={locale} dir={dir}>
      <body>{children}</body>
    </html>
  );
}
```

```tsx fileName="src/app/[locale]/about/page.tsx"
import { getTranslations, getMessages, getFormatter } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import pick from "lodash/pick";
import ServerComponent from "@/components/ServerComponent";
import ClientComponentExample from "@/components/ClientComponentExample";

export const dynamic = "force-static";

export default async function AboutPage({
  params,
}: {
  params: { locale: string };
}) {
  const { locale } = params;

  // संदेश सर्वर-साइड लोड किए जाते हैं। केवल आवश्यक चीज़ें क्लाइंट को भेजें।
  const messages = await getMessages();
  const clientMessages = pick(messages, ["common", "about"]);

  // सख्ती से सर्वर-साइड अनुवाद/फॉर्मेटिंग
  const tAbout = await getTranslations("about");
  const tCounter = await getTranslations("about.counter");
  const format = await getFormatter();

  const initialFormattedCount = format.number(0);

  return (
    <NextIntlClientProvider locale={locale} messages={clientMessages}>
      <main>
        <h1>{tAbout("title")}</h1>
        <ClientComponentExample />
        <ServerComponent
          formattedCount={initialFormattedCount}
          label={tCounter("label")}
          increment={tCounter("increment")}
        />
      </main>
    </NextIntlClientProvider>
  );
}
```

### क्लाइंट कंपोनेंट में उपयोग

आइए एक क्लाइंट कंपोनेंट का उदाहरण लें जो एक काउंटर रेंडर करता है।

**अनुवाद (आकार पुन: उपयोग किया गया; इन्हें next-intl संदेशों में अपनी पसंद के अनुसार लोड करें)**

```json fileName="locales/en/about.json"
{
  "counter": {
    "label": "Counter",
    "increment": "Increment"
  }
}
```

```json fileName="locales/fr/about.json"
{
  "counter": {
    "label": "Compteur",
    "increment": "Incrémenter"
  }
}
```

**क्लाइंट कंपोनेंट**

```tsx fileName="src/components/ClientComponentExample.tsx"
"use client";

import React, { useState } from "react";
import { useTranslations, useFormatter } from "next-intl";

const ClientComponentExample = () => {
  // सीधे नेस्टेड ऑब्जेक्ट के लिए स्कोप करें
  const t = useTranslations("about.counter");
  const format = useFormatter();
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>{format.number(count)}</p>
      <button
        aria-label={t("label")}
        onClick={() => setCount((count) => count + 1)}
      >
        {t("increment")}
      </button>
    </div>
  );
};
```

> पेज क्लाइंट संदेश में "about" संदेश जोड़ना न भूलें
> (केवल उन namespaces को शामिल करें जिनकी आपके क्लाइंट को वास्तव में आवश्यकता है)।

### एक सर्वर कंपोनेंट में उपयोग

यह UI कंपोनेंट एक सर्वर कंपोनेंट है और इसे क्लाइंट कंपोनेंट के अंतर्गत रेंडर किया जा सकता है (पेज → क्लाइंट → सर्वर)। इसे सिंक्रोनस रखें प्रीकंप्यूटेड स्ट्रिंग्स पास करके।

```tsx fileName="src/components/ServerComponent.tsx"
type ServerComponentProps = {
  formattedCount: string;
  label: string;
  increment: string;
};

const ServerComponent = ({
  formattedCount,
  label,
  increment,
}: ServerComponentProps) => {
  return (
    <div>
      <p>{formattedCount}</p>
      <button aria-label={label}>{increment}</button>
    </div>
  );
};
```

नोट्स:

- `formattedCount` सर्वर-साइड पर कंप्यूट करें (जैसे, `const initialFormattedCount = format.number(0)`).
- सर्वर कंपोनेंट्स में फंक्शन्स या नॉन-सीरियलाइजेबल ऑब्जेक्ट्स पास करने से बचें।

```tsx fileName="src/app/[locale]/about/layout.tsx"
import type { Metadata } from "next";
import { locales, defaultLocale } from "@/i18n";
import { getTranslations } from "next-intl/server";

function localizedPath(locale: string, path: string) {
  return locale === defaultLocale ? path : "/" + locale + path;
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = params;
  const t = await getTranslations({ locale, namespace: "about" });

  const url = "/about";
  const languages = Object.fromEntries(
    locales.map((locale) => [locale, localizedPath(locale, url)])
  );

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: localizedPath(locale, url),
      languages: { ...languages, "x-default": url },
    },
  };
}

// ... पेज कोड का बाकी हिस्सा
```

```tsx fileName="src/app/sitemap.ts"
import type { MetadataRoute } from "next";
import { locales, defaultLocale } from "@/i18n";

const origin = "https://example.com";

const formatterLocalizedPath = (locale: string, path: string) =>
  locale === defaultLocale ? origin + path : origin + "/" + locale + path;

export default function sitemap(): MetadataRoute.Sitemap {
  const aboutLanguages = Object.fromEntries(
    locales.map((l) => [l, formatterLocalizedPath(l, "/about")])
  );

  return [
    {
      url: formatterLocalizedPath(defaultLocale, "/about"),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: { languages: aboutLanguages },
    },
  ];
}
```

```tsx fileName="src/app/robots.ts"
import type { MetadataRoute } from "next";
import { locales, defaultLocale } from "@/i18n";

const origin = "https://example.com";
const withAllLocales = (path: string) => [
  path,
  ...locales
    .filter((locale) => locale !== defaultLocale)
    .map((locale) => "/" + locale + path),
];

export default function robots(): MetadataRoute.Robots {
  const disallow = [
    ...withAllLocales("/dashboard"),
    ...withAllLocales("/admin"),
  ];

  return {
    rules: { userAgent: "*", allow: ["/"], disallow },
    host: origin,
    sitemap: origin + "/sitemap.xml",
  };
}
```

### स्थानिक रूटिंग के लिए मिडलवेयर

स्थानीय पता लगाने और रूटिंग को संभालने के लिए एक मिडलवेयर जोड़ें:

```ts fileName="src/middleware.ts"
import createMiddleware from "next-intl/middleware";
import { locales, defaultLocale } from "@/i18n";

export default createMiddleware({
  locales: [...locales],
  defaultLocale,
  localeDetection: true,
});

export const config = {
  // API, Next के आंतरिक और स्थैतिक संसाधनों को छोड़ें
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
```

### सर्वोत्तम प्रथाएँ

- **html `lang` और `dir` सेट करें**: `src/app/[locale]/layout.tsx` में, `getLocaleDirection(locale)` के माध्यम से `dir` की गणना करें और `<html lang={locale} dir={dir}>` सेट करें।
- **namespace द्वारा संदेश विभाजित करें**: JSON को locale और namespace (जैसे, `common.json`, `about.json`) के अनुसार व्यवस्थित करें।
- **क्लाइंट पेलोड को कम करें**: पेजों पर, केवल आवश्यक namespaces को `NextIntlClientProvider` को भेजें (जैसे, `pick(messages, ['common', 'about'])`)।
- **स्थैतिक पेजों को प्राथमिकता दें**: `export const dynamic = 'force-static'` को एक्सपोर्ट करें और सभी `locales` के लिए स्थैतिक पैरामीटर जनरेट करें।
- **सिंक्रोनस सर्वर कंपोनेंट्स**: प्रीकंप्यूटेड स्ट्रिंग्स (अनुवादित लेबल, फॉर्मेटेड नंबर) पास करें, बजाय असिंक्रोनस कॉल्स या नॉन-सीरियलाइजेबल फंक्शन्स के।

## next-intl के ऊपर Intlayer को लागू करें

intlayer डिपेंडेंसीज़ इंस्टॉल करें:

```bash packageManager="npm"
npm install intlayer @intlayer/sync-json-plugin  -D
```

```bash packageManager="yarn"
yarn add intlayer @intlayer/sync-json-plugin  -D
```

```bash packageManager="pnpm"
pnpm add intlayer @intlayer/sync-json-plugin  -D
```

intlayer कॉन्फ़िगरेशन फ़ाइल बनाएं:

```tsx fileName="intlayer.config.ts"
import { type IntlayerConfig, Locales } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  ai: {
    apiKey: process.env.OPENAI_API_KEY,
  },
  plugins: [
    // अपने प्रति-namespace फ़ोल्डर संरचना को Intlayer के साथ सिंक में रखें
    syncJSON({
      source: ({ key, locale }) => `./locales/${locale}/${key}.json`,
    }),
  ],
};

export default config;
```

`package.json` स्क्रिप्ट जोड़ें:

```json fileName="package.json"
{
  "scripts": {
    "i18n:fill": "intlayer fill",
    "i18n:test": "intlayer test"
  }
}
```

नोट्स:

- `intlayer fill`: आपके कॉन्फ़िगर किए गए लोकल्स के आधार पर आपकी AI प्रदाता का उपयोग करके गायब अनुवादों को भरता है।
- `intlayer test`: गायब/अमान्य अनुवादों की जांच करता है (इसे CI में उपयोग करें)।

आप तर्क और प्रदाताओं को कॉन्फ़िगर कर सकते हैं; देखें [Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_cli.md)।
