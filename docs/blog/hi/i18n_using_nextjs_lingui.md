---
createdAt: 2026-09-26
updatedAt: 2026-09-27
priority: 9
title: "Lingui के साथ Next.js 16 i18n: App Router सेटअप गाइड"
description: "Next.js 16 App Router में Lingui सेट करें: Server Components, SWC macros, proxy routing, generateMetadata, hreflang, sitemap और robots.txt, बेंचमार्क डेटा के साथ।"
keywords:
  - Lingui
  - LinguiJS
  - Next.js
  - Next.js 16
  - App Router
  - React Server Components
  - अंतर्राष्ट्रीयकरण
  - i18n
  - SEO
  - ब्लॉग
slugs:
  - blog
  - nextjs-internationalization-using-lingui
history:
  - version: 9.5.10
    date: 2026-09-26
    changes: "प्रारंभिक संस्करण"
author: aymericzip
---

# 2026 में Lingui का उपयोग करके अपने Next.js एप्लिकेशन का अंतर्राष्ट्रीयकरण कैसे करें

## विषय सूची

<TOC/>

## Lingui क्या है?

**Lingui** एक i18n लाइब्रेरी है जो **macros** और **message extraction** के इर्द-गिर्द बनाई गई है। आप अपने घटकों (components) में स्रोत टेक्स्ट लिखते हैं (`` t`Hello` ``, `<Trans>Hello</Trans>`), `lingui extract` प्रत्येक संदेश को कैटलॉग (डिफ़ॉल्ट रूप से PO फ़ाइलें) में एकत्र करता है, और एक लोडर उन्हें कॉम्पैक्ट जावास्क्रिप्ट में संकलित (compile) करता है। संदेश ICU MessageFormat का उपयोग करते हैं, और Lingui App Router में **React Server Components** का समर्थन करता है।

यह गाइड एक **Next.js 16 App Router** प्रोजेक्ट में Lingui को सेट अप करती है, जिसमें शामिल हैं:

- **SWC द्वारा संकलित Macros**, ताकि Turbopack अपनी गति बनाए रखे।
- **Server और Client Components** जो समान `Trans` और `useLingui` API साझा करते हैं।
- `proxy.ts` के माध्यम से **Locale routing**: डिफ़ॉल्ट लोकेल के लिए `/about`, दूसरों के लिए `/fr/about`, और पहली बार आने वाले उपयोगकर्ताओं के लिए भाषा पहचान।
- `generateStaticParams` के साथ प्रत्येक लोकेल का **Static rendering**।
- **पूर्ण बहुभाषी SEO**: अनुवादित `generateMetadata`, canonical, `x-default` के साथ `hreflang`, Open Graph locales, JSON-LD, `sitemap.ts`, `robots.ts` और स्थानीयकृत (localized) 404 पेज।

> किसी अन्य लाइब्रेरी की तलाश है?

- [next-intl गाइड](https://github.com/aymericzip/intlayer/blob/main/docs/blog/hi/i18n_using_next-intl.md)
- [next-i18next गाइड](https://github.com/aymericzip/intlayer/blob/main/docs/blog/hi/i18n_using_next-i18next.md)
- [Next.js + Intlayer गाइड](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_with_nextjs_16.md)

> TanStack Start का उपयोग कर रहे हैं?

- [TanStack Start + Lingui गाइड](https://github.com/aymericzip/intlayer/blob/main/docs/blog/hi/i18n_using_tanstack-start_lingui.md)

> देखें। पुस्तकालयों की तुलना कर रहे हैं?

- [Lingui बनाम Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/hi/lingui_vs_intlayer.md)
- [next-i18next बनाम next-intl बनाम Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/hi/next-i18next_vs_next-intl_vs_intlayer.md)

> ये लाइब्रेरी कहाँ से आईं, यह समझने के लिए JavaScript i18n का इतिहास पढ़ें।

- [JavaScript i18n का इतिहास](https://github.com/aymericzip/intlayer/blob/main/docs/blog/hi/history_of_i18n.md)

## Next.js पर Lingui के बारे में बेंचमार्क क्या कहता है

[i18n बेंचमार्क](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/benchmark/nextjs.md) प्रत्येक प्रमुख लाइब्रेरी के साथ समान 10-पेज, 10-लोकेल Next.js ऐप चलाता है और मापता है कि ब्राउज़र वास्तव में क्या डाउनलोड करता है।

- [i18n बेंचमार्क](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/benchmark/nextjs.md)

<I18nBenchmark framework="nextjs" packages="lingui,@intlayer/lingui,next-intlayer" vertical/>

Next.js 16 पर `@lingui/core@6.6.0` के लिए मुख्य आंकड़े, 2026-09-26 को मापे गए (gzip):

| सेटअप                          | लाइब्रेरी का आकार | प्रति पेज JS | अन्य-लोकेल लीक | अन्य-पेज लीक |
| :----------------------------- | ----------------: | -----------: | -------------: | -----------: |
| बिना i18n (बेस ऐप)             |                 - |     141.0 KB |             0% |           0% |
| Lingui, प्रति लोकेल एक कैटलॉग  |           72.1 KB |     145.4 KB |           2.8% |        89.9% |
| `@intlayer/lingui` (कम्पैट)    |           10.7 KB |     221.6 KB |            50% |          90% |
| `next-intlayer` (मूल Intlayer) |            4.9 KB |     141.5 KB |             0% |           0% |

मुख्य निष्कर्ष:

- **प्रति लोकेल एक एकल कैटलॉग अभी भी अन्य पेजों के संदेशों को क्लाइंट प्रोवाइडर में लीक करता है।** जितना संभव हो सके टेक्स्ट को Server Components में रखें, जो रेंडर किया गया HTML भेजते हैं, कैटलॉग नहीं।
- **Lingui रनटाइम का वजन ~72 KB gzip है।** `@intlayer/lingui` कम्पैट अडैप्टर रनटाइम को घटाकर ~11 KB कर देता है, लेकिन इस बेंचमार्क में Next.js कम्पैट सेटअप अभी भी पूरे कैटलॉग को पेज पर भेजता है। मूल `next-intlayer` API वह सेटअप है जो बेस ऐप के आकार पर बना रहता है।

> पूरा डेटा देखें: [Next.js बेंचमार्क रिपोर्ट](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/benchmark/nextjs.md), और [बेंचमार्क रिपोजिटरी](https://github.com/intlayer-org/benchmark-i18n)।

- [Next.js बेंचमार्क रिपोर्ट](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/benchmark/nextjs.md)

## Next.js पर सुविधाओं की तुलना

Next.js App Router प्रोजेक्ट में आमतौर पर आवश्यक सुविधाओं पर Lingui की तुलना `next-intl` और Intlayer से कैसे होती है:

| सुविधा                               | `next-intlayer` (Intlayer)                         | Lingui                                                          | `next-intl`                                     |
| ------------------------------------ | -------------------------------------------------- | --------------------------------------------------------------- | ----------------------------------------------- |
| **घटकों के पास अनुवाद**              | ✅ सामग्री प्रत्येक घटक के साथ सह-स्थित होती है    | ⚠️ घटकों में स्रोत पाठ, केंद्रीकृत कैटलॉग                       | ❌ केंद्रीकृत JSON                              |
| **TypeScript एकीकरण**                | ✅ स्वतः-जनरेटेड सख्त प्रकार                       | ⚠️ मैक्रोज़ टाइप किए गए हैं, संदेश कैटलॉग नहीं                  | ✅ अच्छा, `AppConfig` वृद्धि के माध्यम से       |
| **लापता अनुवाद पहचान**               | ✅ TypeScript त्रुटियां और बिल्ड-टाइम चेतावनियां   | ⚠️ स्रोत पाठ पर रनटाइम फ़ॉलबैक                                  | ⚠️ रनटाइम फ़ॉलबैक                               |
| **रिच कंटेंट (JSX, Markdown)**       | ✅ प्रत्यक्ष समर्थन                                | ✅ `<Trans>` के अंदर JSX, कोई Markdown नहीं                     | ⚠️ `t.rich` के माध्यम से टैग, कोई Markdown नहीं |
| **AI अनुवाद**                        | ✅ ऐप संदर्भ के साथ आपका अपना प्रदाता और API कुंजी | ❌ नहीं                                                         | ❌ नहीं                                         |
| **विजुअल एडिटर / CMS**               | ✅ स्थानीय विजुअल एडिटर + वैकल्पिक CMS             | ❌ बाहरी प्लेटफॉर्म के माध्यम से                                | ❌ बाहरी प्लेटफॉर्म के माध्यम से                |
| **स्थानीयकृत रूटिंग**                | ✅ इन-बिल्ट                                        | ❌ अपनी खुद की `proxy.ts` लिखें                                 | ✅ इन-बिल्ट `[locale]` सेगमेंट                  |
| **बहुवचन (Pluralization)**           | ✅ गणना-आधारित                                     | ✅ ICU, `<Plural>` मैक्रो                                       | ✅ ICU                                          |
| **सामग्री प्रारूप**                  | ✅ `.ts`, `.tsx`, `.js`, `.json`, `.md`, `.yaml`   | ✅ PO, JSON, CSV                                                | ✅ `.json`, `.js`, `.ts`                        |
| **ICU MessageFormat**                | ✅ `format: "icu"` के माध्यम से                    | ✅ नेटिव                                                        | ✅ नेटिव                                        |
| **SEO हेल्पर्स (hreflang, sitemap)** | ✅ मेटाडेटा, साइटमैप और robots.txt हेल्पर्स        | ❌ मैनुअल                                                       | ✅ अच्छा                                        |
| **Server Components**                | ✅ किसी भी Server Component में सीधा एक्सेस        | ⚠️ प्रत्येक लेआउट और पेज में `setI18n`                          | ⚠️ प्रति घटक `await getTranslations()`          |
| **प्रति-घटक ट्री-शेकिंग**            | ✅ बिल्ड टाइम पर (Babel / SWC)                     | ⚠️ प्रति लोकेल एक कैटलॉग, प्रति-पेज एक्सट्रैक्टर प्रयोगात्मक है | ⚠️ मैनुअल, प्रति रूट `pick()` के साथ            |
| **रनटाइम आकार (gzip, बेंचमार्क)**    | 4.9 KB                                             | 72.1 KB                                                         | 14.7 KB                                         |
| **CI में लापता अनुवाद**              | ✅ `npx intlayer test`                             | ✅ `lingui compile --strict`                                    | ⚠️ इन-बिल्ट नहीं                                |
| **इकोसिस्टम / समुदाय**               | ⚠️ छोटा, तेजी से बढ़ रहा है                        | ✅ परिपक्व                                                      | ✅ बड़ा                                         |

> रनटाइम आकार [Next.js बेंचमार्क](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/benchmark/nextjs.md) से लिए गए हैं। विस्तृत चर्चा के लिए, [Lingui बनाम Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/hi/lingui_vs_intlayer.md) पढ़ें।

- [Next.js बेंचमार्क](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/benchmark/nextjs.md)
- [Lingui बनाम Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/hi/lingui_vs_intlayer.md)

> अन्य Next.js गाइड:

- [next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/blog/hi/i18n_using_next-intl.md)
- [next-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/blog/hi/i18n_using_next-i18next.md)
- [Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_with_nextjs_16.md)

## वे अभ्यास जिनका आपको पालन करना चाहिए

- `[locale]` लेआउट में **`<html>` पर `lang` और `dir` सेट करें**।
- टेक्स्ट के लिए **Server Components को प्राथमिकता दें**: वे सर्वर पर HTML रेंडर करते हैं और क्लाइंट पर कैटलॉग की आवश्यकता नहीं होती है।
- **प्रत्येक लेआउट और पेज में `initLingui(locale)` को कॉल करें।** नेविगेशन पर लेआउट फिर से रेंडर नहीं होते हैं, इसलिए कोई पेज अपने लेआउट द्वारा लोकेल सेट किए जाने पर निर्भर नहीं रह सकता है।
- **प्रति लोकेल एक URL रखें** और `generateStaticParams` के साथ प्रत्येक लोकेल को प्री-रेंडर करें।
- `canonical`, `hreflang` और `x-default` के साथ `generateMetadata` में **अपने मेटाडेटा का अनुवाद करें**।
- `sitemap.ts` और `robots.ts` सम्मेलनों के साथ **एक बहुभाषी साइटमैप और robots.txt जनरेट करें**।
- **लोकेल स्विचर के लिए वास्तविक लिंक का उपयोग करें**, ताकि क्रॉलर प्रत्येक भाषा को खोज सकें।
- **CI में `lingui extract` चलाएं** ताकि कोई नया संदेश कभी भी बिना अनुवाद के न जाए।

- [अंतर्राष्ट्रीयकरण और SEO](https://github.com/aymericzip/intlayer/blob/main/docs/blog/hi/internationalization_and_SEO.md)
- [hreflang गाइड](https://github.com/aymericzip/intlayer/blob/main/docs/blog/hi/hreflang_guide_multilingual_seo.md)
- [Next.js बहुभाषी SEO तुलना](https://github.com/aymericzip/intlayer/blob/main/docs/blog/hi/nextjs-multilingual-seo-comparison.md)

## Next.js एप्लिकेशन में Lingui सेट अप करने के लिए चरण-दर-चरण गाइड

यहाँ वह प्रोजेक्ट संरचना है जिसे हम बनाएंगे:

```bash
.
├── lingui.config.ts
├── next.config.ts
└── src
    ├── proxy.ts                    # Locale routing and detection
    ├── locales
    │   ├── en
    │   │   └── messages.po         # Generated by `lingui extract`
    │   ├── fr
    │   │   └── messages.po
    │   └── es
    │       └── messages.po
    ├── i18n
    │   ├── config.ts               # Locales, URL helpers
    │   ├── appRouterI18n.ts        # Server-only catalogs and instances
    │   ├── initLingui.ts
    │   ├── negotiateLocale.ts
    │   └── metadata.ts             # generateMetadata builder
    ├── components
    │   ├── LinguiClientProvider.tsx
    │   ├── LocaleSwitcher.tsx
    │   └── LocalizedLink.tsx
    └── app
        ├── sitemap.ts
        ├── robots.ts
        └── [locale]
            ├── layout.tsx
            ├── page.tsx
            ├── not-found.tsx
            ├── [...rest]
            │   └── page.tsx        # Localized 404 for unknown paths
            └── about
                └── page.tsx
```

<Steps>
<Step number={1} title="निर्भरताएं स्थापित करें (Install Dependencies)">

```bash packageManager="npm"
npm install @lingui/core @lingui/react
npm install -D @lingui/cli @lingui/swc-plugin @lingui/loader @lingui/format-po
```

```bash packageManager="pnpm"
pnpm add @lingui/core @lingui/react
pnpm add -D @lingui/cli @lingui/swc-plugin @lingui/loader @lingui/format-po
```

```bash packageManager="yarn"
yarn add @lingui/core @lingui/react
yarn add -D @lingui/cli @lingui/swc-plugin @lingui/loader @lingui/format-po
```

```bash packageManager="bun"
bun add @lingui/core @lingui/react
bun add -D @lingui/cli @lingui/swc-plugin @lingui/loader @lingui/format-po
```

- **@lingui/core** / **@lingui/react**: रनटाइम, `I18nProvider`, Server Components के लिए `setI18n`, और मैक्रोज़ (`@lingui/core/macro`, `@lingui/react/macro`)।
- **@lingui/swc-plugin**: Next.js SWC पाइपलाइन के अंदर मैक्रोज़ को संकलित करता है।
- **@lingui/loader**: आयात पर `.po` कैटलॉग संकलित करता है, इसलिए `lingui compile` की आवश्यकता नहीं है।
- **@lingui/cli**: कैटलॉग में संदेश एकत्र करने के लिए `lingui extract`।

> `@lingui/swc-plugin` एक WebAssembly प्लगइन है जो Next.js के SWC संस्करण से जुड़ा हुआ है। यदि Next.js अपग्रेड के बाद बिल्ड विफल हो जाता है, तो प्लगइन को उसके README में संगत के रूप में सूचीबद्ध संस्करण में अपडेट करें।

</Step>
<Step number={2} title="अपने लोकेल कॉन्फ़िगरेशन को केंद्रीकृत करें">

एक एकल फ़ाइल लोकेल और URL हेल्पर्स को परिभाषित करती है। रूटिंग, मेटाडेटा, साइटमैप और Lingui सभी इससे पढ़ते हैं।

```ts fileName="src/i18n/config.ts"
export const locales = ["en", "fr", "es"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

/** Public origin, used for canonical URLs, hreflang and the sitemap. */
export const siteUrl = "https://example.com";

/** Cookie storing the locale explicitly chosen by the visitor. */
export const localeCookieName = "NEXT_LOCALE";

/** Open Graph expects `language_TERRITORY` codes. */
export const openGraphLocales: Record<Locale, string> = {
  en: "en_US",
  fr: "fr_FR",
  es: "es_ES",
};

export const isLocale = (value: unknown): value is Locale =>
  typeof value === "string" && (locales as readonly string[]).includes(value);

export const resolveLocale = (value: string | undefined): Locale =>
  isLocale(value) ? value : defaultLocale;

const rightToLeftLanguages = new Set(["ar", "fa", "he", "ur", "ps", "yi"]);

export const getTextDirection = (locale: string): "ltr" | "rtl" =>
  rightToLeftLanguages.has(new Intl.Locale(locale).language) ? "rtl" : "ltr";

/** `localizePath("/about", "fr")` → `/fr/about`, default locale unprefixed. */
export const localizePath = (path: string, locale: Locale): string => {
  if (locale === defaultLocale) return path;

  return path === "/" ? `/${locale}` : `/${locale}${path}`;
};

/** `/fr/about` → `/about` */
export const stripLocale = (pathname: string): string => {
  const [, firstSegment, ...rest] = pathname.split("/");

  return isLocale(firstSegment) ? `/${rest.join("/")}` : pathname;
};

export const getAbsoluteUrl = (path: string, locale: Locale): string =>
  `${siteUrl}${localizePath(path, locale)}`;

export const getLocaleName = (locale: Locale): string =>
  new Intl.DisplayNames([locale], { type: "language" }).of(locale) ?? locale;
```

</Step>
<Step number={3} title="Lingui और Next.js कॉन्फ़िगर करें">

```ts fileName="lingui.config.ts"
import { defineConfig } from "@lingui/cli";
import { formatter } from "@lingui/format-po";
import { defaultLocale, locales } from "./src/i18n/config";

export default defineConfig({
  sourceLocale: defaultLocale,
  locales: [...locales],
  catalogs: [
    {
      path: "<rootDir>/src/locales/{locale}/messages",
      include: ["src"],
    },
  ],
  format: formatter({ lineNumbers: false }),
});
```

SWC प्लगइन मैक्रोज़ को संकलित करता है, और लोडर Turbopack (Next.js 16 में डिफ़ॉल्ट) और webpack दोनों के लिए `.po` फ़ाइलों को संकलित करता है:

```ts fileName="next.config.ts"
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    swcPlugins: [["@lingui/swc-plugin", {}]],
  },
  turbopack: {
    rules: {
      "*.po": { loaders: ["@lingui/loader"], as: "*.js" },
    },
  },
  webpack: (config) => {
    config.module.rules.push({ test: /\.po$/, use: "@lingui/loader" });

    return config;
  },
};

export default nextConfig;
```

एक्सट्रैक्शन स्क्रिप्ट जोड़ें:

```json fileName="package.json"
{
  "scripts": {
    "i18n:extract": "lingui extract --clean",
    "i18n:check": "lingui extract --clean && git diff --exit-code src/locales"
  }
}
```

</Step>
<Step number={4} title="कैटलॉग लोड करें और सर्वर इंस्टेंस बनाएं">

Server Components में कोई React context नहीं होता है, इसलिए Lingui वर्तमान रेंडर के लिए इंस्टेंस पंजीकृत करने के लिए `setI18n` प्रदान करता है। यह मॉड्यूल प्रत्येक कैटलॉग को **प्रति सर्वर प्रक्रिया में एक बार** लोड करता है और प्रति लोकेल एक `I18n` इंस्टेंस बनाता है। यह `server-only` है: अन्य लोकेल के कैटलॉग कभी भी क्लाइंट बंडल तक नहीं पहुंचते हैं।

```ts fileName="src/i18n/appRouterI18n.ts"
import "server-only";
import { type I18n, type Messages, setupI18n } from "@lingui/core";
import { type Locale, locales } from "./config";

const loadCatalog = async (locale: Locale): Promise<[Locale, Messages]> => {
  const { messages } = await import(`../locales/${locale}/messages.po`);

  return [locale, messages];
};

const catalogs = Object.fromEntries(
  await Promise.all(locales.map(loadCatalog))
) as Record<Locale, Messages>;

const i18nInstances = Object.fromEntries(
  locales.map((locale) => [
    locale,
    setupI18n({ locale, messages: { [locale]: catalogs[locale] } }),
  ])
) as Record<Locale, I18n>;

export const getMessages = (locale: Locale): Messages => catalogs[locale];

export const getI18nInstance = (locale: Locale): I18n => i18nInstances[locale];
```

```ts fileName="src/i18n/initLingui.ts"
import { setI18n } from "@lingui/react/server";
import { getI18nInstance } from "./appRouterI18n";
import type { Locale } from "./config";

/**
 * Registers the instance for the current Server Component render.
 * Call it in every layout and page.
 */
export const initLingui = (locale: Locale) => {
  const i18n = getI18nInstance(locale);

  setI18n(i18n);

  return i18n;
};
```

TypeScript द्वारा `.po` आयात को स्वीकार करने के लिए, मॉड्यूल को एक बार घोषित करें:

```ts fileName="src/i18n/po.d.ts"
declare module "*.po" {
  import type { Messages } from "@lingui/core";

  export const messages: Messages;
}
```

</Step>
<Step number={5} title="क्लाइंट प्रोवाइडर बनाएं">

Client Components एक React context से अनुवाद पढ़ते हैं। प्रोवाइडर सर्वर लेआउट से सक्रिय लोकेल का कैटलॉग प्राप्त करता है, और अपना खुद का इंस्टेंस एक बार बनाता है।

```tsx fileName="src/components/LinguiClientProvider.tsx"
"use client";

import { type Messages, setupI18n } from "@lingui/core";
import { I18nProvider } from "@lingui/react";
import { type ReactNode, useState } from "react";

type LinguiClientProviderProps = {
  children: ReactNode;
  initialLocale: string;
  initialMessages: Messages;
};

export const LinguiClientProvider = ({
  children,
  initialLocale,
  initialMessages,
}: LinguiClientProviderProps) => {
  const [i18n] = useState(() =>
    setupI18n({
      locale: initialLocale,
      messages: { [initialLocale]: initialMessages },
    })
  );

  return <I18nProvider i18n={i18n}>{children}</I18nProvider>;
};
```

</Step>
<Step number={6} title="डायनेमिक लोकेल रूट्स परिभाषित करें">

`[locale]` सेगमेंट रूट लेआउट को रखता है। `generateStaticParams` बिल्ड टाइम पर प्रत्येक लोकेल को प्री-रेंडर करता है, और `dynamicParams = false` किसी अन्य प्रीफ़िक्स के लिए 404 लौटाता है।

```tsx fileName="src/app/[locale]/layout.tsx"
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LinguiClientProvider } from "@/components/LinguiClientProvider";
import { LocaleSwitcher } from "@/components/LocaleSwitcher";
import { getMessages } from "@/i18n/appRouterI18n";
import { getTextDirection, isLocale, locales, siteUrl } from "@/i18n/config";
import { initLingui } from "@/i18n/initLingui";

export const generateStaticParams = () => locales.map((locale) => ({ locale }));

// Unknown prefixes (/xx/about) → 404
export const dynamicParams = false;

export const metadata: Metadata = {
  // Resolves relative canonical and Open Graph URLs
  metadataBase: new URL(siteUrl),
};

const LocaleLayout = async ({ children, params }: LayoutProps<"/[locale]">) => {
  const { locale } = await params;

  if (!isLocale(locale)) notFound();

  initLingui(locale);

  return (
    <html lang={locale} dir={getTextDirection(locale)}>
      <body>
        <LinguiClientProvider
          initialLocale={locale}
          initialMessages={getMessages(locale)}
        >
          <header>
            <LocaleSwitcher />
          </header>
          <main>{children}</main>
        </LinguiClientProvider>
      </body>
    </html>
  );
};

export default LocaleLayout;
```

> क्लाइंट प्रोवाइडर सक्रिय लोकेल का पूरा कैटलॉग प्राप्त करता है। बेंचमार्क इसे "अन्य-पेज लीक" के रूप में मापता है। Server Components में टेक्स्ट रखने से वह सीमित हो जाता है जिसकी क्लाइंट को वास्तव में आवश्यकता होती है। बड़े ऐप्स के लिए, Lingui का प्रयोगात्मक प्रति-पेज एक्सट्रैक्टर (`lingui.config.ts` में `experimental.extractor`) एंट्री पॉइंट द्वारा कैटलॉग को विभाजित करता है।

</Step>
<Step number={7} title="Server Components में अनुवाद का उपयोग करें">

Server Components, Client Components के समान ही मैक्रोज़ का उपयोग करते हैं। `initLingui` को पेज में भी चलना चाहिए, क्योंकि एक लेआउट अपने पेजों के बीच नेविगेट करते समय फिर से रेंडर नहीं होता है।

```tsx fileName="src/app/[locale]/about/page.tsx"
import { Trans, useLingui } from "@lingui/react/macro";
import { Counter } from "@/components/Counter";
import { resolveLocale } from "@/i18n/config";
import { initLingui } from "@/i18n/initLingui";

const AboutPage = async ({ params }: PageProps<"/[locale]/about">) => {
  const { locale } = await params;

  initLingui(resolveLocale(locale));

  return <AboutContent />;
};

const AboutContent = () => {
  const { t } = useLingui();

  return (
    <section aria-label={t`About section`}>
      <h1>
        <Trans>About us</Trans>
      </h1>
      <p>
        <Trans>
          We build <strong>fast</strong>, multilingual applications.
        </Trans>
      </p>
      <Counter />
    </section>
  );
};

export default AboutPage;
```

</Step>
<Step number={8} title="Client Components में अनुवाद का उपयोग करें">

Client Components समान आयात का उपयोग करते हैं। मैक्रोज़ `LinguiClientProvider` से इंस्टेंस पढ़ते हैं।

```tsx fileName="src/components/Counter.tsx"
"use client";

import { Plural, Trans, useLingui } from "@lingui/react/macro";
import { useState } from "react";

export const Counter = () => {
  const { t, i18n } = useLingui();
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>
        <Plural
          value={count}
          _0="No clicks yet"
          one="# click"
          other="# clicks"
        />
      </p>
      <p>{i18n.number(count)}</p>
      <button
        type="button"
        aria-label={t`Counter`}
        onClick={() => setCount((value) => value + 1)}
      >
        <Trans>Increment</Trans>
      </button>
    </div>
  );
};
```

</Step>
<Step number={9} title="अपने संदेश निकालें और अनुवाद करें">

एक्सट्रैक्शन चलाएं। Lingui `src` में पाए गए प्रत्येक संदेश को प्रत्येक लोकेल कैटलॉग में लिखता है:

```bash
npm run i18n:extract
```

फिर प्रत्येक प्रविष्टि के `msgstr` का अनुवाद करें:

<Tabs group="locale">
 <Tab value='fr' label='French'>

```plaintext fileName="src/locales/fr/messages.po"
msgid "About us"
msgstr "À propos"

msgid "We build <0>fast</0>, multilingual applications."
msgstr "Nous créons des applications <0>rapides</0> et multilingues."

msgid "Learn who we are and why we built this application."
msgstr "Découvrez qui nous sommes et pourquoi nous avons créé cette application."

msgid "{count, plural, =0 {No clicks yet} one {# click} other {# clics}}"
msgstr "{count, plural, =0 {Aucun clic} one {# clic} other {# clics}}"
```

 </Tab>
 <Tab value='es' label='Spanish'>

```plaintext fileName="src/locales/es/messages.po"
msgid "About us"
msgstr "Sobre nosotros"

msgid "We build <0>fast</0>, multilingual applications."
msgstr "Creamos aplicaciones <0>rápidas</0> y multilingües."

msgid "Learn who we are and why we built this application."
msgstr "Descubre quiénes somos y por qué creamos esta aplicación."

msgid "{count, plural, =0 {No clicks yet} one {# click} other {# clics}}"
msgstr "{count, plural, =0 {Ningún clic} one {# clic} other {# clics}}"
```

 </Tab>
</Tabs>

> `<0>` प्लेसहोल्डर `<Trans>` के JSX तत्वों को यथास्थान रखते हैं, ताकि अनुवादक मार्कअप को छुए बिना उन्हें स्थानांतरित कर सकें।

</Step>
<Step number={10} title="लोकेल रूटिंग के लिए प्रॉक्सी सेट करें" isOptional={true}>

Next.js 16 ने `middleware.ts` का नाम बदलकर `proxy.ts` कर दिया। प्रॉक्सी "आवश्यकतानुसार" प्रीफ़िक्स रणनीति लागू करता है:

- `/fr/about` को वैसे ही सर्व किया जाता है;
- `/en/about` `/about` पर पुनर्निर्देशित (redirect) करता है, इसलिए डिफ़ॉल्ट लोकेल का एक ही URL होता है;
- `/about` को URL बदले बिना आंतरिक रूप से `/en/about` पर फिर से लिखा (rewrite) जाता है;
- `/` पर पहली विज़िट पसंदीदा भाषा पर पुनर्निर्देशित करती है (पहले कुकी, फिर `Accept-Language`)।

```ts fileName="src/i18n/negotiateLocale.ts"
import { isLocale, type Locale } from "./config";

/** "fr-CA,fr;q=0.9,en;q=0.8" → "fr" */
export const negotiateLocale = (
  acceptLanguage: string | null | undefined
): Locale | undefined => {
  if (!acceptLanguage) return undefined;

  return acceptLanguage
    .split(",")
    .map((part) => {
      const [tag = "", quality] = part.trim().split(";q=");

      return {
        language: tag.toLowerCase().split("-")[0],
        quality: quality ? Number(quality) : 1,
      };
    })
    .sort((first, second) => second.quality - first.quality)
    .map(({ language }) => language)
    .find(isLocale);
};
```

```ts fileName="src/proxy.ts"
import { type NextRequest, NextResponse } from "next/server";
import {
  defaultLocale,
  isLocale,
  localeCookieName,
  localizePath,
  stripLocale,
} from "@/i18n/config";
import { negotiateLocale } from "@/i18n/negotiateLocale";

export const proxy = (request: NextRequest) => {
  const { pathname } = request.nextUrl;
  const firstSegment = pathname.split("/")[1];
  const url = request.nextUrl.clone();

  if (isLocale(firstSegment)) {
    // /en/about → /about: one URL for the default locale
    if (firstSegment === defaultLocale) {
      url.pathname = stripLocale(pathname);

      return NextResponse.redirect(url, 308);
    }

    return NextResponse.next();
  }

  // First visit on "/": send the visitor to their language
  if (pathname === "/") {
    const cookieLocale = request.cookies.get(localeCookieName)?.value;
    const preferredLocale = isLocale(cookieLocale)
      ? cookieLocale
      : negotiateLocale(request.headers.get("accept-language"));

    if (preferredLocale && preferredLocale !== defaultLocale) {
      url.pathname = localizePath("/", preferredLocale);

      return NextResponse.redirect(url, 307);
    }
  }

  // /about → served by /en/about, URL unchanged
  url.pathname = `/${defaultLocale}${pathname === "/" ? "" : pathname}`;

  return NextResponse.rewrite(url);
};

export const config = {
  // Skip API routes, Next.js internals and files (sitemap.xml, robots.txt...)
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
```

</Step>
<Step number={11} title="अपनी सामग्री की भाषा बदलें" isOptional={true}>

`usePathname` ब्राउज़र द्वारा देखे गए URL (`/about` या `/fr/about`) को लौटाता है। लोकेल को हटा दें, फिर प्रत्येक भाषा का लिंक बनाएं। स्विचर वास्तविक लिंक रेंडर करता है, जिससे क्रॉलर प्रत्येक भाषा संस्करण तक पहुंच सकते हैं, और कुकी स्पष्ट विकल्प को याद रखती है।

```tsx fileName="src/components/LocaleSwitcher.tsx"
"use client";

import { useLingui } from "@lingui/react/macro";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  getLocaleName,
  type Locale,
  localeCookieName,
  locales,
  localizePath,
  stripLocale,
} from "@/i18n/config";

const persistLocale = (locale: Locale) => {
  document.cookie = `${localeCookieName}=${locale}; Path=/; Max-Age=31536000; SameSite=Lax`;
};

export const LocaleSwitcher = () => {
  const { i18n, t } = useLingui();
  const basePath = stripLocale(usePathname());

  return (
    <nav aria-label={t`Change language`}>
      <ul>
        {locales.map((locale) => (
          <li key={locale}>
            <Link
              href={localizePath(basePath, locale)}
              hrefLang={locale}
              lang={locale}
              aria-current={locale === i18n.locale ? "page" : undefined}
              onClick={() => persistLocale(locale)}
            >
              {getLocaleName(locale)}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
```

</Step>
<Step number={12} title="एक स्थानीयकृत लिंक घटक बनाएं" isOptional={true}>

```tsx fileName="src/components/LocalizedLink.tsx"
"use client";

import { useLingui } from "@lingui/react";
import Link from "next/link";
import type { ComponentProps } from "react";
import { type Locale, localizePath } from "@/i18n/config";

type LocalizedLinkProps = Omit<ComponentProps<typeof Link>, "href"> & {
  /** Path without locale prefix, e.g. "/about" */
  href: string;
};

export const LocalizedLink = ({ href, ...props }: LocalizedLinkProps) => {
  const { i18n } = useLingui();

  return <Link href={localizePath(href, i18n.locale as Locale)} {...props} />;
};
```

यह Server Components से भी काम करता है, क्योंकि यह `LinguiClientProvider` के अंदर रेंडर होता है:

```tsx
<LocalizedLink href="/about">
  <Trans>About us</Trans>
</LocalizedLink>
```

</Step>
<Step number={13} title="अपने मेटाडेटा का अंतर्राष्ट्रीयकरण करें" isOptional={true}>

प्रत्येक भाषा संस्करण अपने दम पर रैंक कर सकता है, बशर्ते प्रत्येक पेज निम्नलिखित प्रदर्शित करे:

- एक **अनुवादित** `title` और `description`;
- स्वयं की ओर इशारा करने वाला एक **canonical** URL;
- प्रति लोकेल एक **`hreflang` alternate**, साथ ही **`x-default`**;
- **Open Graph** `locale`, `alternateLocale` और `url`;
- `inLanguage` के साथ **JSON-LD**।

`generateMetadata` React ट्री के बाहर चलता है, इसलिए यह `msg` मैक्रो के साथ सीधे सर्वर इंस्टेंस का उपयोग करता है:

```ts fileName="src/i18n/metadata.ts"
import type { Metadata } from "next";
import {
  defaultLocale,
  getAbsoluteUrl,
  type Locale,
  locales,
  openGraphLocales,
} from "./config";

type LocalizedMetadataOptions = {
  /** Path without locale prefix, e.g. "/about" */
  path: string;
  locale: Locale;
  title: string;
  description: string;
};

export const buildLocalizedMetadata = ({
  path,
  locale,
  title,
  description,
}: LocalizedMetadataOptions): Metadata => {
  const url = getAbsoluteUrl(path, locale);

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        ...Object.fromEntries(
          locales.map((alternateLocale) => [
            alternateLocale,
            getAbsoluteUrl(path, alternateLocale),
          ])
        ),
        "x-default": getAbsoluteUrl(path, defaultLocale),
      },
    },
    openGraph: {
      type: "website",
      title,
      description,
      url,
      locale: openGraphLocales[locale],
      alternateLocale: locales
        .filter((alternateLocale) => alternateLocale !== locale)
        .map((alternateLocale) => openGraphLocales[alternateLocale]),
    },
  };
};
```

```tsx fileName="src/app/[locale]/about/page.tsx"
import { msg } from "@lingui/core/macro";
import type { Metadata } from "next";
import { getI18nInstance } from "@/i18n/appRouterI18n";
import { resolveLocale } from "@/i18n/config";
import { buildLocalizedMetadata } from "@/i18n/metadata";

export const generateMetadata = async ({
  params,
}: PageProps<"/[locale]/about">): Promise<Metadata> => {
  const locale = resolveLocale((await params).locale);
  const i18n = getI18nInstance(locale);

  return buildLocalizedMetadata({
    path: "/about",
    locale,
    title: i18n._(msg`About us`),
    description: i18n._(
      msg`Learn who we are and why we built this application.`
    ),
  });
};

// ... page component from step 7
```

JSON-LD स्वयं पेज द्वारा रेंडर किया जाता है। पेज फ़ाइलें केवल Next.js फ़ील्ड निर्यात कर सकती हैं, इसलिए घटक को उसकी अपनी फ़ाइल में रखें:

```tsx fileName="src/components/WebPageJsonLd.tsx"
import { getAbsoluteUrl, type Locale } from "@/i18n/config";

type WebPageJsonLdProps = {
  path: string;
  locale: Locale;
  title: string;
};

export const WebPageJsonLd = ({ path, locale, title }: WebPageJsonLdProps) => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: title,
        url: getAbsoluteUrl(path, locale),
        inLanguage: locale,
      }),
    }}
  />
);
```

```tsx fileName="src/app/[locale]/about/page.tsx"
// In AboutContent
<WebPageJsonLd
  path="/about"
  locale={i18n.locale as Locale}
  title={t`About us`}
/>
```

</Step>
<Step number={14} title="अपने साइटमैप का अंतर्राष्ट्रीयकरण करें" isOptional={true}>

`sitemap.ts` परंपरा `alternates.languages` का समर्थन करती है, जिसे Next.js `xhtml:link` अल्टरनेट के रूप में रेंडर करता है। प्रत्येक लोकेल के प्रत्येक URL को सूचीबद्ध करें:

```ts fileName="src/app/sitemap.ts"
import type { MetadataRoute } from "next";
import { defaultLocale, getAbsoluteUrl, locales } from "@/i18n/config";

type SitemapPage = {
  path: string;
  changeFrequency: "daily" | "weekly" | "monthly";
  priority: number;
};

const sitemapPages: SitemapPage[] = [
  { path: "/", changeFrequency: "daily", priority: 1.0 },
  { path: "/about", changeFrequency: "monthly", priority: 0.8 },
];

const getAlternateLanguages = (path: string) => ({
  ...Object.fromEntries(
    locales.map((locale) => [locale, getAbsoluteUrl(path, locale)])
  ),
  "x-default": getAbsoluteUrl(path, defaultLocale),
});

const sitemap = (): MetadataRoute.Sitemap =>
  sitemapPages.flatMap(({ path, changeFrequency, priority }) =>
    locales.map((locale) => ({
      url: getAbsoluteUrl(path, locale),
      lastModified: new Date(),
      changeFrequency,
      priority,
      alternates: { languages: getAlternateLanguages(path) },
    }))
  );

export default sitemap;
```

</Step>
<Step number={15} title="अपने robots.txt का अंतर्राष्ट्रीयकरण करें" isOptional={true}>

निजी रूट्स प्रत्येक भाषा में मौजूद होते हैं, इसलिए `disallow` को प्रत्येक स्थानीयकृत पथ को कवर करना चाहिए:

```ts fileName="src/app/robots.ts"
import type { MetadataRoute } from "next";
import { locales, localizePath, siteUrl } from "@/i18n/config";

const privatePaths = ["/dashboard", "/admin"];

const robots = (): MetadataRoute.Robots => ({
  rules: {
    userAgent: "*",
    allow: "/",
    // /dashboard, /fr/dashboard, /es/dashboard...
    disallow: privatePaths.flatMap((path) =>
      locales.map((locale) => localizePath(path, locale))
    ),
  },
  sitemap: `${siteUrl}/sitemap.xml`,
});

export default robots;
```

</Step>
<Step number={16} title="स्थानीयकृत 404 पेजों को संभालें" isOptional={true}>

`not-found.tsx` `[locale]` लेआउट के अंदर रेंडर होता है, इसलिए इसके पास क्लाइंट प्रोवाइडर तक पहुंच होती है। कैच-ऑल रूट किसी लोकेल के अंदर अज्ञात पथों को इस पर भेजता है। Next.js 404 प्रतिक्रियाओं में स्वचालित रूप से `noindex` जोड़ता है।

```tsx fileName="src/app/[locale]/not-found.tsx"
"use client";

import { Trans } from "@lingui/react/macro";
import { LocalizedLink } from "@/components/LocalizedLink";

const NotFound = () => (
  <div>
    <h1>
      <Trans>Page not found</Trans>
    </h1>
    <LocalizedLink href="/">
      <Trans>Back to home</Trans>
    </LocalizedLink>
  </div>
);

export default NotFound;
```

```tsx fileName="src/app/[locale]/[...rest]/page.tsx"
import { notFound } from "next/navigation";

// /fr/does/not/exist → localized not-found.tsx
const CatchAllPage = () => notFound();

export default CatchAllPage;
```

</Step>
<Step number={17} title="Server Actions में लोकेल तक पहुंचें" isOptional={true}>

Server Actions को रूट पैरामीटर प्राप्त नहीं होते हैं। सबसे विश्वसनीय तरीका यह है कि उस पेज से फ़ॉर्म के साथ लोकेल भेजें जिसे यह पता है:

```tsx fileName="src/app/[locale]/contact/page.tsx"
import { Trans } from "@lingui/react/macro";
import { sendContactMessage } from "@/app/actions/sendContactMessage";
import { resolveLocale } from "@/i18n/config";
import { initLingui } from "@/i18n/initLingui";

const ContactPage = async ({ params }: PageProps<"/[locale]/contact">) => {
  const locale = resolveLocale((await params).locale);

  initLingui(locale);

  return (
    <form action={sendContactMessage}>
      <input type="hidden" name="locale" value={locale} />
      <textarea name="message" />
      <button type="submit">
        <Trans>Send</Trans>
      </button>
    </form>
  );
};

export default ContactPage;
```

```ts fileName="src/app/actions/sendContactMessage.ts"
"use server";

import { msg } from "@lingui/core/macro";
import { getI18nInstance } from "@/i18n/appRouterI18n";
import { resolveLocale } from "@/i18n/config";

export const sendContactMessage = async (formData: FormData) => {
  const locale = resolveLocale(formData.get("locale")?.toString());
  const i18n = getI18nInstance(locale);

  const subject = i18n._(msg`Thanks for your message`);

  // await mailer.send({ subject, locale, ... });
  console.log(`[${locale}] ${subject}`);
};
```

</Step>
<Step number={18} title="अपने मैक्रोज़ बनाए रखें, Intlayer के साथ रनटाइम घटाएं" isOptional={true}>

[`@intlayer/lingui`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/compat/lingui.md) कम्पैट अडैप्टर आपके स्रोत को अछूता रखता है: मैक्रोज़ पहले की तरह संकलित होते हैं, और परिणामी `i18n._()`, `useLingui()` और `<Trans>` कॉल Intlayer शब्दकोशों द्वारा सेवित किए जाते हैं। Next.js बेंचमार्क में, रनटाइम **~72.1 KB से घटकर ~10.7 KB** gzip हो जाता है।

- [`@intlayer/lingui`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/compat/lingui.md)

Next.js पर, अडैप्टर को `next.config.ts` (webpack और Turbopack) में `@lingui/core` और `@lingui/react` को `@intlayer/lingui` में उपनाम (alias) देकर, और कॉन्फ़िग को `next-intlayer/server` से `withIntlayer` के साथ लपेटकर जोड़ा जाता है। `@lingui/swc-plugin` बनाए रखें ताकि मैक्रोज़ अभी भी पहले संकलित हों। पूरा कॉन्फ़िगरेशन [Lingui कम्पैट गाइड](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/compat/lingui.md) में है।

- [Lingui कम्पैट गाइड](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/compat/lingui.md)

जैसा कि बेंचमार्क तालिका से पता चलता है, अडैप्टर रनटाइम को कम करता है लेकिन Next.js पर प्रत्येक पेज पर भेजे जाने वाले कैटलॉग को अभी कम नहीं करता है। इसका सबसे अच्छा उपयोग प्रवासन सेतु (migration bridge) के रूप में किया जाता है: एक बार जब यह काम करने लगे, तो घटकों को एक-एक करके मूल `useIntlayer` API में स्थानांतरित करें, जो केवल वही सामग्री भेजता है जो प्रत्येक घटक रेंडर करता है। [Next.js + Intlayer गाइड](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_with_nextjs_16.md), [Lingui बनाम @intlayer/lingui](https://github.com/aymericzip/intlayer/blob/main/docs/blog/hi/lingui_vs_intlayer-lingui.md) और सभी [कम्पैट अडैप्टर](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/compat/index.md) देखें।

- [Next.js + Intlayer गाइड](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_with_nextjs_16.md)
- [Lingui बनाम @intlayer/lingui](https://github.com/aymericzip/intlayer/blob/main/docs/blog/hi/lingui_vs_intlayer-lingui.md)
- [कम्पैट अडैप्टर](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/compat/index.md)

</Step>
<Step number={19} title="Intlayer का उपयोग करके अपने अनुवाद स्वचालित करें" isOptional={true}>

Lingui संदेश निकालता है, लेकिन दर्जनों कैटलॉग को हाथ से भरना वह जगह है जहाँ अधिकांश समय व्यतीत होता है। Intlayer **निःशुल्क** और **ओपन सोर्स** है, और इसके टूल Lingui के साथ मिलकर काम करते हैं:

- अपनी स्वयं की API कुंजी और प्रदाता का उपयोग करके **AI के साथ अनुवाद करें**। [ऑटो फिल](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/autoFill.md) और [CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/cli/index.md) देखें।
- [sync PO प्लगइन](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/plugins/sync-po.md) के साथ सत्य के स्रोत के रूप में **अपनी PO फ़ाइलें रखें**।
- CI में **लापता अनुवादों का परीक्षण करें**। [अपने अनुवादों का परीक्षण करना](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/testing.md) देखें।
- [scan कमांड](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/cli/scan.md) के साथ लापता `hreflang`, गलत canonical और लोकेल लीक के लिए **अपनी तैनात साइट का ऑडिट करें**।

</Step>
</Steps>

## अक्सर पूछे जाने वाले प्रश्न

<FAQ>

<Question title="क्या Lingui Next.js App Router और Server Components का समर्थन करता है?">

हाँ। `@lingui/react` React Server Components का समर्थन करता है। Server Components `@lingui/react/server` से `setI18n` के साथ इंस्टेंस पंजीकृत करते हैं, Client Components इसे `I18nProvider` से पढ़ते हैं, और दोनों समान `Trans` और `useLingui` मैक्रोज़ का उपयोग करते हैं।

</Question>
<Question title="मुझे प्रत्येक पेज और लेआउट में initLingui को कॉल क्यों करना पड़ता है?">

Server Components में कोई context नहीं होता है, इसलिए इंस्टेंस प्रति रेंडर पंजीकृत होता है। लेआउट पूरे नेविगेशन में सुरक्षित रहते हैं और दोबारा रेंडर नहीं होते हैं, इसलिए कोई पेज लोकेल सेट करने के लिए अपने लेआउट पर निर्भर नहीं रह सकता है। प्रत्येक लेआउट और पेज के शीर्ष पर `initLingui(locale)` को कॉल करने से वे स्वतंत्र रहते हैं।

</Question>
<Question title="क्या मुझे Next.js के साथ SWC प्लगइन या Babel का उपयोग करना चाहिए?">

`@lingui/swc-plugin` का उपयोग करें। यह SWC पाइपलाइन और Turbopack को बनाए रखता है। Babel कॉन्फ़िग जोड़ने से Next.js में SWC अक्षम हो जाता है और बिल्ड धीमा हो जाता है। एकमात्र शर्त यह है कि प्लगइन संस्करण को आपके Next.js रिलीज़ के SWC संस्करण के साथ संगत रखा जाए।

</Question>
<Question title="मैं Lingui के साथ generateMetadata का अनुवाद कैसे करूँ?">

`getI18nInstance(locale)` के साथ सर्वर इंस्टेंस प्राप्त करें और `msg` मैक्रो के साथ घोषित डिस्क्रिप्टर का अनुवाद करें: ``i18n._(msg`About us`)``। `alternates.canonical`, `x-default` के साथ `alternates.languages`, और `openGraph.locale` लौटाएं। चरण 13 एक पुन: प्रयोज्य हेल्पर प्रदान करता है।

</Question>
<Question title="Next.js बंडल में Lingui कितना बड़ा है?">

[बेंचमार्क](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/benchmark/nextjs.md) रनटाइम के लिए ~72 KB gzip मापता है। प्रति लोकेल एक कैटलॉग के साथ, बिना i18n वाले 141 KB के मुकाबले पेजों का वजन ~145 KB होता है, लेकिन प्रत्येक पेज अभी भी क्लाइंट प्रोवाइडर के माध्यम से अन्य पेजों के संदेश प्राप्त करता है।

- [बेंचमार्क](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/benchmark/nextjs.md)

</Question>
<Question title="Lingui, next-intl या next-i18next: Next.js के लिए मुझे किसे चुनना चाहिए?">

Lingui उन टीमों के लिए उपयुक्त है जो घटकों में स्रोत टेक्स्ट लिखना और PO फ़ाइलों तथा अनुवादकों के साथ काम करना पसंद करती हैं। next-intl उन टीमों के लिए उपयुक्त है जो JSON कैटलॉग और Next.js के साथ एकीकृत `t("key")` API पसंद करती हैं। next-i18next i18next प्लगइन इकोसिस्टम लाता है। [next-i18next बनाम next-intl बनाम Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/hi/next-i18next_vs_next-intl_vs_intlayer.md) और [Next.js बेंचमार्क](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/benchmark/nextjs.md) देखें।

- [next-i18next बनाम next-intl बनाम Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/hi/next-i18next_vs_next-intl_vs_intlayer.md)
- [Next.js बेंचमार्क](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/benchmark/nextjs.md)

</Question>
<Question title="क्या मैं अपने घटकों को फिर से लिखे बिना Lingui से Intlayer में माइग्रेट कर सकता हूँ?">

हाँ। [`@intlayer/lingui`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/compat/lingui.md) अडैप्टर मैक्रोज़ को बनाए रखता है और रनटाइम को स्वैप करता है, फिर आप घटकों को उत्तरोत्तर `useIntlayer` में ले जा सकते हैं। [कम्पैट अडैप्टर](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/compat/index.md) देखें।

- [`@intlayer/lingui`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/compat/lingui.md)
- [कम्पैट अडैप्टर](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/compat/index.md)

</Question>

</FAQ>
