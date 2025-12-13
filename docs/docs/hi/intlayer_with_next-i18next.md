---
createdAt: 2025-10-05
updatedAt: 2025-10-05
title: अपने Next.js 15 को next-i18next का उपयोग करके कैसे अनुवादित करें – i18n गाइड 2025
description: i18next/next-i18next के साथ Next.js 15 App Router ऐप को अंतरराष्ट्रीय बनाने और Intlayer के साथ इसे बेहतर बनाने के लिए एक व्यावहारिक, उत्पादन-तैयार गाइड।
keywords:
  - अंतरराष्ट्रीयकरण
  - दस्तावेज़ीकरण
  - Intlayer
  - Next.js 15
  - next-i18next
  - i18next
  - JavaScript
  - React
slugs:
  - doc
  - next-i18next
applicationTemplate: https://github.com/aymericzip/intlayer-next-i18next-template
---

# Intlayer का उपयोग करके अपने Next.js 15 को next-i18next वेबसाइट के साथ अनुवादित करें | अंतरराष्ट्रीयकरण (i18n)

### यह गाइड किसके लिए है

- **जूनियर**: सटीक चरणों का पालन करें और कोड ब्लॉकों को कॉपी करें। आपको एक कार्यशील बहुभाषी ऐप मिलेगा।
- **मिड-लेवल**: सामान्य गलतियों से बचने के लिए चेकलिस्ट और सर्वोत्तम प्रथाओं के कॉलआउट का उपयोग करें।
- **सीनियर**: उच्च-स्तरीय संरचना, SEO, और ऑटोमेशन सेक्शन को स्किम करें; आपको समझदारी से चुने गए डिफ़ॉल्ट और विस्तार बिंदु मिलेंगे।

### आप क्या बनाएंगे

- स्थानीयकृत रूट्स के साथ App Router प्रोजेक्ट (जैसे, `/`, `/fr/...`)
- स्थानीय भाषाओं, डिफ़ॉल्ट भाषा, RTL सपोर्ट के साथ i18n कॉन्फ़िग
- सर्वर-साइड i18n इनिशियलाइज़ेशन और क्लाइंट प्रोवाइडर
- नामस्थानित अनुवाद ऑन-डिमांड लोड होते हैं
- `hreflang`, स्थानीयकृत `sitemap`, `robots` के साथ SEO
- स्थानीय भाषा रूटिंग के लिए मिडलवेयर
- अनुवाद वर्कफ़्लोज़ को स्वचालित करने के लिए Intlayer इंटीग्रेशन (टेस्ट, AI भराई, JSON सिंक)

> नोट: next-i18next, i18next के ऊपर बनाया गया है। यह गाइड App Router में next-i18next के साथ संगत i18next प्रिमिटिव्स का उपयोग करता है, जबकि आर्किटेक्चर को सरल और प्रोडक्शन-रेडी बनाए रखता है।
> एक व्यापक तुलना के लिए, देखें [next-i18next vs next-i18next vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en/next-i18next_vs_next-i18next_vs_intlayer.md)।

---

## 1) प्रोजेक्ट संरचना

next-i18next डिपेंडेंसीज़ इंस्टॉल करें:

```bash packageManager="npm"
npm install next-i18next i18next react-i18next i18next-resources-to-backend
```

```bash packageManager="pnpm"
pnpm add next-i18next i18next react-i18next i18next-resources-to-backend
```

```bash packageManager="yarn"
yarn add next-i18next i18next react-i18next i18next-resources-to-backend
```

स्पष्ट संरचना के साथ शुरू करें। संदेशों को locale और namespace द्वारा विभाजित रखें।

```bash
.
├── i18n.config.ts
└── src
    ├── locales
    │   ├── en
    │   │  ├── common.json
    │   │  └── about.json
    │   └── fr
    │      ├── common.json
    │      └── about.json
    ├── app
    │   ├── i18n
    │   │   └── server.ts
    │   └── [locale]
    │       ├── layout.tsx
    │       └── about.tsx
    └── components
        ├── I18nProvider.tsx
        ├── ClientComponent.tsx
        └── ServerComponent.tsx
```

चेकलिस्ट (मिड/सीनियर):

- प्रत्येक locale के लिए प्रत्येक namespace में एक JSON रखें
- संदेशों को अधिक केंद्रीकृत न करें; छोटे, पेज/फीचर-स्कोप्ड namespace का उपयोग करें
- सभी locales को एक साथ इम्पोर्ट करने से बचें; केवल आवश्यक चीज़ें लोड करें

---

## 2) डिपेंडेंसीज़ इंस्टॉल करें

```bash
bash
pnpm add i18next react-i18next i18next-resources-to-backend
```

यदि आप next-i18next APIs या config interop का उपयोग करने की योजना बना रहे हैं, तो साथ ही:

```bash
pnpm add next-i18next
```

---

## 3) कोर i18n कॉन्फ़िगरेशन

locales, डिफ़ॉल्ट locale, RTL, और localized paths/URLs के लिए हेल्पर्स को परिभाषित करें।

```ts fileName="i18n.config.ts"
export const locales = ["en", "fr"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const rtlLocales = ["ar", "he", "fa", "ur"] as const;
export const isRtl = (locale: string) =>
  (rtlLocales as readonly string[]).includes(locale);

export function localizedPath(locale: string, path: string) {
  return locale === defaultLocale ? path : "/" + locale + path;
}

const ORIGIN = "https://example.com";
export function abs(locale: string, path: string) {
  return ORIGIN + localizedPath(locale, path);
}
```

सीनियर नोट: यदि आप `next-i18next.config.js` का उपयोग करते हैं, तो इसे `i18n.config.ts` के साथ संरेखित रखें ताकि विसंगति न हो।

---

## 4) सर्वर-साइड i18n प्रारंभिककरण

i18next को सर्वर पर एक डायनामिक बैकएंड के साथ प्रारंभ करें जो केवल आवश्यक locale/namespace JSON को इम्पोर्ट करता है।

```ts fileName="src/app/i18n/server.ts"
import { createInstance } from "i18next";
import { initReactI18next } from "react-i18next/initReactI18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { defaultLocale } from "@/i18n.config";

// JSON संसाधनों को src/locales/<locale>/<namespace>.json से लोड करें
const backend = resourcesToBackend(
  (locale: string, namespace: string) =>
    import(`../../locales/${locale}/${namespace}.json`)
);

export async function initI18next(
  locale: string,
  namespaces: string[] = ["common"]
) {
  const i18n = createInstance();
  await i18n
    .use(initReactI18next)
    .use(backend)
    .init({
      lng: locale,
      fallbackLng: defaultLocale,
      ns: namespaces,
      defaultNS: "common",
      interpolation: { escapeValue: false },
      react: { useSuspense: false },
    });
  return i18n;
}
```

मध्य नोट: पेलोड को सीमित करने के लिए प्रति पेज namespace सूची को छोटा रखें। वैश्विक "catch-all" बंडलों से बचें।

---

## 5) React कंपोनेंट्स के लिए क्लाइंट प्रदाता

क्लाइंट कंपोनेंट्स को एक प्रदाता के साथ लपेटें जो सर्वर कॉन्फ़िग के समान हो और केवल अनुरोधित namespaces को लोड करे।

```tsx fileName="src/components/I18nProvider.tsx"
"use client";

import * as React from "react";
import { I18nextProvider } from "react-i18next";
import { createInstance } from "i18next";
import { initReactI18next } from "react-i18next/initReactI18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { defaultLocale } from "@/i18n.config";

const backend = resourcesToBackend(
  (locale: string, namespace: string) =>
    import(`../../locales/${locale}/${namespace}.json`)
);

type Props = {
  locale: string;
  namespaces?: string[];
  resources?: Record<string, any>; // { ns: bundle }
  children: React.ReactNode;
};

export default function I18nProvider({
  locale,
  namespaces = ["common"],
  resources,
  children,
}: Props) {
  const [i18n] = React.useState(() => {
    const i = createInstance();

    i.use(initReactI18next)
      .use(backend)
      .init({
        lng: locale,
        fallbackLng: defaultLocale,
        ns: namespaces,
        resources: resources ? { [locale]: resources } : undefined,
        defaultNS: "common",
        interpolation: { escapeValue: false },
        react: { useSuspense: false },
      });

    return i;
  });

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
```

जूनियर टिप: आपको क्लाइंट को सभी संदेश भेजने की आवश्यकता नहीं है। केवल पृष्ठ के namespaces से शुरू करें।

---

## 6) स्थानीयकृत लेआउट और रूट्स

भाषा और दिशा सेट करें, और स्थैतिक रेंडरिंग को प्राथमिकता देने के लिए प्रति locale रूट्स को पूर्व-जनरेट करें।

```tsx fileName="src/app/[locale]/layout.tsx"
import type { ReactNode } from "react";
import { locales, defaultLocale, isRtl, type Locale } from "@/i18n.config";

export const dynamicParams = false;

// स्थैतिक पैरामीटर उत्पन्न करें
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  // यदि params.locale locales में है तो उसे उपयोग करें, अन्यथा defaultLocale का उपयोग करें
  const locale: Locale = (locales as readonly string[]).includes(params.locale)
    ? (params.locale as any)
    : defaultLocale;

  // दिशा निर्धारित करें: यदि भाषा RTL है तो "rtl", अन्यथा "ltr"
  const dir = isRtl(locale) ? "rtl" : "ltr";

  return (
    <html lang={locale} dir={dir}>
      <body>{children}</body>
    </html>
  );
}
```

---

## 7) सर्वर + क्लाइंट उपयोग के साथ उदाहरण पृष्ठ

```tsx fileName="src/app/[locale]/about.tsx"
import I18nProvider from "@/components/I18nProvider";
import { initI18next } from "@/app/i18n/server";
import type { Locale } from "@/i18n.config";
import ClientComponent from "@/components/ClientComponent";
import ServerComponent from "@/components/ServerComponent";

// पेज के लिए स्थैतिक रेंडरिंग को मजबूर करें
export const dynamic = "force-static";

export default async function AboutPage({
  params: { locale },
}: {
  params: { locale: Locale };
}) {
  const namespaces = ["common", "about"] as const;

  const i18n = await initI18next(locale, [...namespaces]);
  const tAbout = i18n.getFixedT(locale, "about");

  return (
    <I18nProvider locale={locale} namespaces={[...namespaces]}>
      <main>
        <h1>{tAbout("title")}</h1>

        <ClientComponent />
        <ServerComponent t={tAbout} locale={locale} count={0} />
      </main>
    </I18nProvider>
  );
}
```

अनुवाद (प्रत्येक namespace के लिए एक JSON `src/locales/...` के अंतर्गत):

```json fileName="src/locales/en/about.json"
{
  "title": "About",
  "description": "About page description",
  "counter": {
    "label": "Counter",
    "increment": "Increment"
  }
}
```

```json fileName="src/locales/fr/about.json"
{
  "title": "À propos",
  "description": "Description de la page À propos",
  "counter": {
    "label": "Compteur",
    "increment": "Incrémenter"
  }
}
```

क्लाइंट कंपोनेंट (केवल आवश्यक namespace लोड करता है):

```tsx fileName="src/components/ClientComponent.tsx"
"use client";

import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const ClientComponent = () => {
  const { t, i18n } = useTranslation("about");
  const [count, setCount] = useState(0);

  const numberFormat = new Intl.NumberFormat(i18n.language);

  return (
    <div>
      <p>{numberFormat.format(count)}</p>
      <button
        aria-label={t("counter.label")}
        onClick={() => setCount((c) => c + 1)}
      >
        {t("counter.increment")}
      </button>
    </div>
  );
};

export default ClientComponent;
```

> सुनिश्चित करें कि पेज/प्रदाता में केवल आवश्यक namespaces शामिल हों (जैसे, `about`)।
> यदि आप React < 19 का उपयोग कर रहे हैं, तो भारी फॉर्मेटर्स जैसे `Intl.NumberFormat` को मेमोइज़ करें।

सिंक्रोनस सर्वर कंपोनेंट जो क्लाइंट सीमा के अंतर्गत एम्बेड किया गया है:

```tsx fileName="src/components/ServerComponent.tsx"
type ServerComponentProps = {
  t: (key: string) => string;
  locale: string;
  count: number;
};

const ServerComponent = ({ t, locale, count }: ServerComponentProps) => {
  const formatted = new Intl.NumberFormat(locale).format(count);

  return (
    <div>
      <p>{formatted}</p>
      <button aria-label={t("counter.label")}>{t("counter.increment")}</button>
    </div>
  );
};

export default ServerComponent;
```

---

## 8) SEO: मेटाडेटा, Hreflang, साइटमैप, रोबोट्स

सामग्री का अनुवाद पहुंच बढ़ाने का एक तरीका है। बहुभाषी SEO को पूरी तरह से कनेक्ट करें।

सर्वोत्तम प्रथाएँ:

- रूट पर `lang` और `dir` सेट करें
- प्रत्येक लोकल के लिए `alternates.languages` जोड़ें (+ `x-default`)
- `sitemap.xml` में अनुवादित URLs सूचीबद्ध करें और `hreflang` का उपयोग करें
- स्थानीयकृत निजी क्षेत्रों (जैसे, `/fr/admin`) को `robots.txt` में बाहर करें

```tsx fileName="src/app/[locale]/about/layout.tsx"
import type { Metadata } from "next";
import { locales, defaultLocale, localizedPath } from "@/i18n.config";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = params;

  // src/locales से सही JSON बंडल आयात करें
  const messages = (await import("@/locales/" + locale + "/about.json"))
    .default;

  const languages = Object.fromEntries(
    locales.map((locale) => [locale, localizedPath(locale, "/about")])
  );

  return {
    title: messages.title,
    description: messages.description,
    alternates: {
      canonical: localizedPath(locale, "/about"),
      languages: { ...languages, "x-default": "/about" },
    },
  };
}

export default async function AboutPage() {
  return <h1>About</h1>;
}
import type { MetadataRoute } from "next";
import { locales, defaultLocale, abs } from "@/i18n.config";

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = Object.fromEntries(
    locales.map((locale) => [locale, abs(locale, "/about")])
  );

  return [
    {
      url: abs(defaultLocale, "/about"),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: { languages },
    },
  ];
}
```

```ts fileName="src/app/robots.ts"
import type { MetadataRoute } from "next";
import { locales, defaultLocale, localizedPath } from "@/i18n.config";

const ORIGIN = "https://example.com";

const expandAllLocales = (path: string) => [
  localizedPath(defaultLocale, path),
  ...locales
    .filter((locale) => locale !== defaultLocale)
    .map((locale) => localizedPath(locale, path)),
];

export default function robots(): MetadataRoute.Robots {
  const disallow = [
    ...expandAllLocales("/dashboard"),
    ...expandAllLocales("/admin"),
  ];

  return {
    rules: { userAgent: "*", allow: ["/"], disallow },
    host: ORIGIN,
    sitemap: ORIGIN + "/sitemap.xml",
  };
}
```

---

## 9) लोकल रूटिंग के लिए मिडलवेयर

लोकल का पता लगाएं और यदि गायब हो तो लोकलाइज्ड रूट पर रीडायरेक्ट करें।

```ts fileName="src/middleware.ts"
import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, locales } from "@/i18n.config";

const PUBLIC_FILE = /\.[^/]+$/; // एक्सटेंशन वाले फाइलों को बाहर करें

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/static") ||
    PUBLIC_FILE.test(pathname)
  ) {
    return;
  }

  const hasLocale = locales.some(
    (locale) =>
      pathname === "/" + locale || pathname.startsWith("/" + locale + "/")
  );
  if (!hasLocale) {
    const locale = defaultLocale;
    const url = request.nextUrl.clone();
    url.pathname = "/" + locale + (pathname === "/" ? "" : pathname);
    return NextResponse.redirect(url);
  }
}

export const config = {
  matcher: [
    // इन पथों को छोड़कर सभी पथों से मेल खाता है जो इनसे शुरू होते हैं और जिन फाइलों में एक्सटेंशन होता है
    "/((?!api|_next|static|.*\\..*).*)",
  ],
};
```

---

## 10) प्रदर्शन और DX सर्वोत्तम प्रथाएँ

- **html `lang` और `dir` सेट करें**: `src/app/[locale]/layout.tsx` में किया गया है।
- **संदेशों को namespace द्वारा विभाजित करें**: बंडलों को छोटा रखें (`common.json`, `about.json`, आदि)।
- **क्लाइंट payload को न्यूनतम करें**: पेजों पर, केवल आवश्यक namespaces को provider को पास करें।
- **स्थैतिक पेजों को प्राथमिकता दें**: प्रत्येक locale के लिए `export const dynamic = 'force-static'` और `generateStaticParams` का उपयोग करें।
- **सर्वर कंपोनेंट्स को सिंक करें**: रेंडर समय पर async कॉल के बजाय पूर्व-गणना की गई स्ट्रिंग्स/फॉर्मेटिंग पास करें।
- **भारी ऑपरेशंस को मेमोइज़ करें**: विशेष रूप से पुराने React संस्करणों के लिए क्लाइंट कोड में।
- **कैश और हेडर**: जब संभव हो, डायनामिक रेंडरिंग की तुलना में स्थैतिक या `revalidate` को प्राथमिकता दें।

---

## 11) परीक्षण और CI

- `t` का उपयोग करने वाले कंपोनेंट्स के लिए यूनिट टेस्ट जोड़ें ताकि यह सुनिश्चित किया जा सके कि keys मौजूद हैं।
- सत्यापित करें कि प्रत्येक namespace में सभी locales में समान keys हों।
- डिप्लॉय से पहले CI के दौरान गायब keys को प्रदर्शित करें।

Intlayer इन कार्यों का अधिकांश भाग स्वचालित करेगा (अगले अनुभाग को देखें)।

---

## 12) Intlayer को ऊपर जोड़ें (स्वचालन)

Intlayer आपकी JSON अनुवादों को सिंक में रखने, गायब keys के लिए परीक्षण करने, और आवश्यकतानुसार AI के साथ भरने में मदद करता है।

Intlayer dependencies इंस्टॉल करें:

```bash packageManager="npm"
npm install intlayer @intlayer/sync-json-plugin  -D
```

```bash packageManager="pnpm"
pnpm add intlayer @intlayer/sync-json-plugin  -D
```

```bash packageManager="yarn"
yarn add intlayer @intlayer/sync-json-plugin  -D
```

```ts fileName="intlayer.config.ts"
import { type IntlayerConfig, Locales } from "intlayer";
import { locales, defaultLocale } from "@/i18n";
import { syncJSON } from "@intlayer/sync-json";

export const locales = [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH];

const config: IntlayerConfig = {
  internationalization: {
    locales,
    defaultLocale,
  },
  ai: {
    apiKey: process.env.OPENAI_API_KEY, // AI API कुंजी पर्यावरण चर से
  },
  plugins: [
    syncJSON({
      format: "i18next",
      source: ({ locale }) => `./locales/${locale}.json`, // JSON स्रोत फ़ाइल पथ
    }),
  ],
};

export default config;
```

पैकेज स्क्रिप्ट जोड़ें:

```json fileName="package.json"
{
  "scripts": {
    "i18n:fill": "intlayer fill", // AI अनुवाद भरने के लिए स्क्रिप्ट
    "i18n:test": "intlayer test" // अनुपस्थित keys के लिए परीक्षण स्क्रिप्ट
  }
}
```

सामान्य प्रवाह:

- `pnpm i18n:test` CI में अनुपस्थित keys पर बिल्ड विफल करने के लिए
- `pnpm i18n:fill` स्थानीय रूप से नए जोड़े गए keys के लिए AI अनुवाद प्रस्तावित करने के लिए

> आप CLI आर्गुमेंट्स प्रदान कर सकते हैं; देखें [Intlayer CLI दस्तावेज़](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_cli.md)।

---

## 13) समस्या निवारण

- **कुंजियाँ नहीं मिलीं**: सुनिश्चित करें कि पृष्ठ/प्रदाता सही namespaces सूचीबद्ध करता है और JSON फ़ाइल `src/locales/<locale>/<namespace>.json` के अंतर्गत मौजूद है।
- **गलत भाषा/अंग्रेज़ी का फ्लैश**: `middleware.ts` में locale पहचान और प्रदाता `lng` को दोबारा जांचें।
- **RTL लेआउट समस्याएँ**: सत्यापित करें कि `dir` `isRtl(locale)` से प्राप्त होता है और आपकी CSS `[dir="rtl"]` का सम्मान करती है।
- **SEO वैकल्पिक भाषाएँ गायब**: पुष्टि करें कि `alternates.languages` में सभी locales और `x-default` शामिल हैं।
- **बंडल बहुत बड़े हैं**: namespaces को और विभाजित करें और क्लाइंट पर पूरे `locales` ट्री को इम्पोर्ट करने से बचें।

---

## 14) आगे क्या है

- जैसे-जैसे फीचर्स बढ़ें, और अधिक लोकल और नेमस्पेस जोड़ें
- त्रुटि पृष्ठों, ईमेल और API-चालित सामग्री का स्थानीयकरण करें
- अनुवाद अपडेट के लिए PRs को स्वचालित रूप से खोलने के लिए Intlayer वर्कफ़्लो का विस्तार करें

यदि आप एक स्टार्टर पसंद करते हैं, तो इस टेम्पलेट को आज़माएं: `https://github.com/aymericzip/intlayer-next-i18next-template`।
