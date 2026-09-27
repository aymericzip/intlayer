---
createdAt: 2026-09-26
updatedAt: 2026-09-27
priority: 9
title: "Lingui के साथ TanStack Start i18n: संपूर्ण 2026 सेटअप गाइड"
description: "Lingui के साथ अपने TanStack Start ऐप का अनुवाद करें: macros, PO catalogs, SSR, locale routing, hreflang, sitemap और robots.txt, साथ ही वास्तविक bundle-size benchmark डेटा।"
keywords:
  - Lingui
  - LinguiJS
  - TanStack Start
  - TanStack Router
  - अंतर्राष्ट्रीयकरण
  - i18n
  - SEO
  - PO फ़ाइलें
  - React
  - ब्लॉग
slugs:
  - blog
  - tanstack-start-internationalization-using-lingui
history:
  - version: 9.5.10
    date: 2026-09-26
    changes: "प्रारंभिक संस्करण"
author: aymericzip
---

# 2026 में Lingui का उपयोग करके अपने TanStack Start एप्लिकेशन का अंतर्राष्ट्रीयकरण कैसे करें

## विषय सूची

<TOC/>

## Lingui क्या है?

**Lingui** एक i18n लाइब्रेरी है जो **macros** और **message extraction** के इर्द-गिर्द बनाई गई है। आप स्रोत टेक्स्ट को सीधे अपने कंपोनेंट्स में लिखते हैं (`` t`Hello` ``, `<Trans>Hello</Trans>`), `lingui extract` प्रत्येक संदेश को कैटलॉग (डिफ़ॉल्ट रूप से PO फ़ाइलें) में एकत्र करता है, अनुवादक उन्हें भरते हैं, और Vite प्लगइन उन्हें कॉम्पैक्ट जावास्क्रिप्ट में संकलित (compile) करता है। संदेश ICU MessageFormat का उपयोग करते हैं, इसलिए plurals और selects समर्थित हैं।

TanStack Start में कोई अंतर्निहित i18n लेयर नहीं आती है, इसलिए यह गाइड शुरू से Lingui को इसमें एकीकृत करती है:

- **Babel द्वारा संकलित Macros** `@rolldown/plugin-babel` के माध्यम से (`@vitejs/plugin-react` v6 और Vite 8 के साथ आवश्यक)।
- **Locale routing** एक वैकल्पिक `{-$locale}` सेगमेंट के साथ (`/about`, `/fr/about`)।
- **प्रति लोकेल एक कैटलॉग, मांग पर लोड किया गया (on demand)**, और प्रति रेंडर एक `I18n` इंस्टेंस ताकि समवर्ती (concurrent) SSR अनुरोध कभी भी लोकेल साझा न करें।
- **संपूर्ण बहुभाषी SEO**: अनुवादित `<title>` और विवरण, कैनोनिकल URL, `x-default` के साथ `hreflang`, Open Graph लोकेल्स, JSON-LD, साइटमैप, `robots.txt`, प्री-रेंडरिंग और स्थानीयकृत 404 पेज।

> क्या आप किसी अन्य स्टैक की तलाश में हैं?

- [TanStack Start + use-intl गाइड](https://github.com/aymericzip/intlayer/blob/main/docs/blog/hi/i18n_using_tanstack-start_use-intl.md)
- [TanStack Start + Paraglide गाइड](https://github.com/aymericzip/intlayer/blob/main/docs/blog/hi/i18n_using_tanstack-start_paraglide.md)
- [TanStack Start + Intlayer गाइड](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_with_tanstack.md)

> क्या आप Next.js का उपयोग कर रहे हैं?

- [Next.js + Lingui गाइड](https://github.com/aymericzip/intlayer/blob/main/docs/blog/hi/i18n_using_nextjs_lingui.md)

> देखें। पुस्तकालयों की तुलना कर रहे हैं?

- [Lingui बनाम Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/hi/lingui_vs_intlayer.md)

> ये लाइब्रेरी कहाँ से आईं, यह समझने के लिए JavaScript i18n का इतिहास पढ़ें।

- [JavaScript i18n का इतिहास](https://github.com/aymericzip/intlayer/blob/main/docs/blog/hi/history_of_i18n.md)

## TanStack Start पर Lingui के बारे में बेंचमार्क क्या कहता है

[i18n बेंचमार्क](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/benchmark/tanstack.md) हर प्रमुख लाइब्रेरी के साथ समान 10-पेज, 10-लोकेल TanStack Start ऐप चलाता है और मापता है कि ब्राउज़र वास्तव में क्या डाउनलोड करता है।

<I18nBenchmark framework="tanstack" packages="lingui,@intlayer/lingui,intlayer" vertical/>

`@lingui/core@6.6.0` के लिए मुख्य आंकड़े, 2026-09-26 को मापे गए (gzip):

| सेटअप                           | लाइब्रेरी का आकार | प्रति पेज JS | अन्य लोकेल लीक | अन्य पेज लीक |
| :------------------------------ | ----------------: | -----------: | -------------: | -----------: |
| कोई i18n नहीं (बेस ऐप)          |                 - |     111.0 KB |             0% |           0% |
| Lingui (इस गाइड का सेटअप)       |           56.7 KB |     115.2 KB |           9.3% |           0% |
| `@intlayer/lingui` (संगतता)     |            9.8 KB |     136.7 KB |           9.9% |           0% |
| `react-intlayer` (मूल Intlayer) |            4.5 KB |     126.8 KB |             0% |           0% |

मुख्य निष्कर्ष:

- **प्रति लोकेल केवल एक कैटलॉग मांग पर लोड करें।** यह पेजों को बेस ऐप आकार के करीब रखता है।
- **रनटाइम भारी रहता है** (~57 KB gzip)। `@intlayer/lingui` संगतता एडेप्टर (चरण 16) आपके मैक्रोज़ को बनाए रखता है और इसे घटाकर ~10 KB कर देता है।

> पूरा डेटा देखें: [TanStack Start बेंचमार्क रिपोर्ट](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/benchmark/tanstack.md), और [बेंचमार्क रिपॉजिटरी](https://github.com/intlayer-org/benchmark-i18n)।

## TanStack Start पर फीचर तुलना

TanStack Start पर आमतौर पर उपयोग की जाने वाली अन्य पुस्तकालयों के साथ Lingui की तुलना:

| फीचर                                     | `react-intlayer` (Intlayer)           | `use-intl`                   | Paraglide JS                      | Lingui                              |
| ---------------------------------------- | ------------------------------------- | ---------------------------- | --------------------------------- | ----------------------------------- |
| **कंपोनेंट्स के पास अनुवाद**             | ✅ सह-स्थित (Co-located)              | ❌ केंद्रीकृत JSON           | ❌ प्रति लोकेल एक JSON फ़ाइल      | ⚠️ कंपोनेंट्स में स्रोत टेक्स्ट     |
| **TypeScript एकीकरण**                    | ✅ स्वतः जनरेट किए गए प्रकार          | ✅ `AppConfig` के माध्यम से  | ✅ टाइप किए गए संदेश फ़ंक्शन      | ⚠️ केवल Macros                      |
| **लापता अनुवाद का पता लगाना**            | ✅ टाइप त्रुटियां और बिल्ड चेतावनियां | ⚠️ रनटाइम फ़ॉलबैक            | ⚠️ बेस लोकेल पर फ़ॉलबैक करता है   | ⚠️ स्रोत टेक्स्ट पर फ़ॉलबैक करता है |
| **रिच कंटेंट (JSX, Markdown)**           | ✅ प्रत्यक्ष समर्थन                   | ⚠️ `t.rich` के माध्यम से टैग | ⚠️ स्ट्रिंग्स                     | ✅ `<Trans>` के अंदर JSX            |
| **स्थानीयकृत रूटिंग**                    | ✅ अंतर्निहित                         | ❌ मैन्युअल `{-$locale}`     | ✅ `urlPatterns` + राउटर रीराइट   | ❌ मैन्युअल `{-$locale}`            |
| **रीलोड किए बिना लोकेल स्विच**           | ✅ हाँ                                | ✅ हाँ                       | ❌ पूरा पेज रीलोड                 | ✅ हाँ                              |
| **बहुवचन (Pluralization)**               | ✅ गणना आधारित                        | ✅ ICU                       | ✅ वेरिएंट्स                      | ✅ ICU                              |
| **ICU MessageFormat**                    | ✅ `format: "icu"` के माध्यम से       | ✅ नेटिव                     | ⚠️ inlang प्लगइन के माध्यम से     | ✅ नेटिव                            |
| **कंटेंट प्रारूप**                       | ✅ `.ts`, `.json`, `.md`, `.yaml`...  | ⚠️ `.json`                   | ⚠️ inlang JSON                    | ✅ PO, JSON, CSV                    |
| **AI अनुवाद**                            | ✅ आपका अपना प्रदाता और कुंजी         | ❌ नहीं                      | ❌ नहीं                           | ❌ नहीं                             |
| **विजुअल एडिटर / CMS**                   | ✅ स्थानीय एडिटर + वैकल्पिक CMS       | ❌ बाहरी प्लेटफॉर्म          | ⚠️ inlang इकोसिस्टम ऐप्स          | ❌ बाहरी प्लेटफॉर्म                 |
| **SEO सहायक (hreflang, sitemap)**        | ✅ अंतर्निहित                         | ❌ मैन्युअल                  | ⚠️ स्थानीयकृत URLs, बाकी मैन्युअल | ❌ मैन्युअल                         |
| **रनटाइम आकार (gzip, benchmark)**        | 4.5 KB                                | 75.9 KB                      | 1.8 KB                            | 56.7 KB                             |
| **लीक, सर्वश्रेष्ठ सेटअप (लोकेल / पेज)** | 0% / 0%                               | 0% / 0%                      | 49.7% / 0%                        | 8.6% / 0%                           |
| **CI में लापता अनुवाद**                  | ✅ `npx intlayer test`                | ⚠️ अंतर्निहित नहीं           | ⚠️ अंतर्निहित नहीं                | ✅ `lingui compile --strict`        |

> रनटाइम आकार और लीक के आंकड़े [TanStack Start बेंचमार्क](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/benchmark/tanstack.md) से लिए गए हैं। लीक प्रत्येक लाइब्रेरी के सर्वोत्तम सेटअप पर मापा जाता है।

> अन्य TanStack Start गाइड:

- [use-intl](https://github.com/aymericzip/intlayer/blob/main/docs/blog/hi/i18n_using_tanstack-start_use-intl.md)
- [Paraglide JS](https://github.com/aymericzip/intlayer/blob/main/docs/blog/hi/i18n_using_tanstack-start_paraglide.md)
- [Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_with_tanstack.md)

## अभ्यास जिनका आपको पालन करना चाहिए

- **`<html>` पर `lang` और `dir` सेट करें** रूट लोकेल से, ताकि वे सर्वर HTML में सही हों।
- **प्रत्येक लोकेल के लिए एक URL रखें** प्रीफ़िक्स के साथ, ताकि प्रत्येक भाषा संस्करण अनुक्रमित (indexable) हो सके।
- **प्रति लोकेल एक `I18n` इंस्टेंस बनाएं**, SSR के दौरान कभी भी वैश्विक इंस्टेंस को म्यूटेट न करें: दो समवर्ती अनुरोध एक-दूसरे के लोकेल को ओवरराइट कर देंगे।
- **केवल सक्रिय कैटलॉग लोड करें**, क्लाइंट कोड में उन सभी को कभी इम्पोर्ट न करें।
- **एक मैक्रो शैली चुनें** (कंपोनेंट्स में `useLingui` + `t`, लेज़ी डिस्क्रिप्टर के लिए `msg`) और उसी पर टिके रहें। `t`, `i18n._`, `i18n.t` और `<Trans>` को मिलाने से कोड को इंसानों और AI सहायकों के लिए पढ़ना कठिन हो जाता है।
- **CI में `lingui extract` चलाएं** ताकि कोई नया संदेश कभी भी बिना अनुवाद के न जाए।
- **अपने मेटाडेटा का अनुवाद करें**, और प्रत्येक पेज पर `canonical`, `hreflang` और `x-default` घोषित करें।
- **एक बहुभाषी साइटमैप और robots.txt बनाएं**, और प्रत्येक लोकेल को प्री-रेंडर करें।
- **लोकेल स्विचर के लिए वास्तविक लिंक का उपयोग करें**, ताकि क्रॉलर्स हर भाषा की खोज कर सकें।

- [अंतर्राष्ट्रीयकरण और SEO](https://github.com/aymericzip/intlayer/blob/main/docs/blog/hi/internationalization_and_SEO.md)
- [hreflang गाइड](https://github.com/aymericzip/intlayer/blob/main/docs/blog/hi/hreflang_guide_multilingual_seo.md)

## TanStack Start एप्लिकेशन में Lingui सेट अप करने के लिए चरण-दर-चरण गाइड

यहाँ वह प्रोजेक्ट संरचना है जिसे हम बनाएंगे:

```bash
.
├── lingui.config.ts
├── vite.config.ts
└── src
    ├── locales
    │   ├── en
    │   │   └── messages.po     # Generated by `lingui extract`
    │   ├── fr
    │   │   └── messages.po
    │   └── es
    │       └── messages.po
    ├── start.ts                # Request middleware (locale redirect)
    ├── i18n
    │   ├── config.ts           # Locales, URL helpers
    │   ├── lingui.ts           # Catalog loader, I18n instances
    │   ├── negotiateLocale.ts  # Accept-Language parsing
    │   └── seo.ts              # head() builder
    ├── components
    │   ├── LocaleSwitcher.tsx
    │   ├── LocalizedLink.tsx
    │   └── NotFound.tsx
    └── routes
        ├── __root.tsx
        ├── sitemap[.]xml.ts
        ├── robots[.]txt.ts
        └── {-$locale}
            ├── route.tsx       # Locale layout + I18nProvider
            ├── index.tsx
            ├── about.tsx
            └── $.tsx           # Localized 404
```

<Steps>
<Step number={1} title="निर्भरताएँ स्थापित करें">

```bash packageManager="npm"
npm install @lingui/core @lingui/react
npm install -D @lingui/cli @lingui/vite-plugin @lingui/babel-plugin-lingui-macro @lingui/format-po @rolldown/plugin-babel
```

```bash packageManager="pnpm"
pnpm add @lingui/core @lingui/react
pnpm add -D @lingui/cli @lingui/vite-plugin @lingui/babel-plugin-lingui-macro @lingui/format-po @rolldown/plugin-babel
```

```bash packageManager="yarn"
yarn add @lingui/core @lingui/react
yarn add -D @lingui/cli @lingui/vite-plugin @lingui/babel-plugin-lingui-macro @lingui/format-po @rolldown/plugin-babel
```

```bash packageManager="bun"
bun add @lingui/core @lingui/react
bun add -D @lingui/cli @lingui/vite-plugin @lingui/babel-plugin-lingui-macro @lingui/format-po @rolldown/plugin-babel
```

- **@lingui/core** / **@lingui/react**: रनटाइम, `I18nProvider` और मैक्रोज़ (`@lingui/core/macro`, `@lingui/react/macro`)।
- **@lingui/cli**: कैटलॉग में संदेशों को एकत्र करने के लिए `lingui extract`।
- **@lingui/vite-plugin**: इम्पोर्ट पर `.po` कैटलॉग को कंपाइल करता है, इसलिए `lingui compile` की आवश्यकता नहीं होती है।
- **@lingui/babel-plugin-lingui-macro** + **@rolldown/plugin-babel**: बिल्ड समय पर मैक्रोज़ को ट्रांसफ़ॉर्म करते हैं।

</Step>
<Step number={2} title="अपने लोकेल कॉन्फ़िगरेशन को केंद्रीकृत करें">

डिफ़ॉल्ट लोकेल बिना प्रीफ़िक्स के रहता है (`/about`), अन्य लोकेल्स प्रीफ़िक्स किए जाते हैं (`/fr/about`)।

```ts fileName="src/i18n/config.ts"
export const locales = ["en", "fr", "es"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

/** Public origin, used for canonical URLs, hreflang and the sitemap. */
export const siteUrl = "https://example.com";

/** Cookie storing the locale explicitly chosen by the visitor. */
export const localeCookieName = "locale";

/** Open Graph expects `language_TERRITORY` codes. */
export const openGraphLocales: Record<Locale, string> = {
  en: "en_US",
  fr: "fr_FR",
  es: "es_ES",
};

export const isLocale = (value: unknown): value is Locale =>
  typeof value === "string" && (locales as readonly string[]).includes(value);

/** Maps the optional `{-$locale}` route param to a supported locale. */
export const resolveLocale = (localeParam: string | undefined): Locale =>
  isLocale(localeParam) ? localeParam : defaultLocale;

/** The value to pass as `locale` param: `undefined` for the default locale. */
export const toLocaleParam = (locale: Locale): Locale | undefined =>
  locale === defaultLocale ? undefined : locale;

const rightToLeftLanguages = new Set(["ar", "fa", "he", "ur", "ps", "yi"]);

export const getTextDirection = (locale: string): "ltr" | "rtl" =>
  rightToLeftLanguages.has(new Intl.Locale(locale).language) ? "rtl" : "ltr";

/** `localizePath("/about", "fr")` → `/fr/about`, default locale unprefixed. */
export const localizePath = (path: string, locale: Locale): string => {
  if (locale === defaultLocale) return path;

  return path === "/" ? `/${locale}` : `/${locale}${path}`;
};

export const getAbsoluteUrl = (path: string, locale: Locale): string =>
  `${siteUrl}${localizePath(path, locale)}`;

export const getLocaleName = (locale: Locale): string =>
  new Intl.DisplayNames([locale], { type: "language" }).of(locale) ?? locale;
```

</Step>
<Step number={3} title="Lingui कॉन्फ़िगर करें">

Lingui कॉन्फ़िग उसी लोकेल सूची का पुन: उपयोग करता है, इसलिए कैटलॉग, राउटर और साइटमैप कभी भी असहमत नहीं होते हैं।

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

निष्कर्षण (extraction) स्क्रिप्ट जोड़ें:

```json fileName="package.json"
{
  "scripts": {
    "i18n:extract": "lingui extract --clean",
    "i18n:check": "lingui extract --clean && git diff --exit-code src/locales"
  }
}
```

`i18n:check` CI में विफल हो जाता है जब किसी कंपोनेंट में ऐसा संदेश होता है जिसे निकाला और कमिट नहीं किया गया था।

</Step>
<Step number={4} title="Vite कॉन्फ़िगर करें">

`@vitejs/plugin-react` v6 के साथ, Babel अब अंतर्निहित नहीं है। `@rolldown/plugin-babel` Lingui मैक्रो प्लगइन चलाता है, और `linguiTransformerBabelPreset` केवल उन फ़ाइलों को प्रोसेस करता है जो मैक्रो इम्पोर्ट करती हैं, जो बिल्ड को तेज़ रखता है।

```ts fileName="vite.config.ts"
import { lingui, linguiTransformerBabelPreset } from "@lingui/vite-plugin";
import babel from "@rolldown/plugin-babel";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    tanstackStart(),
    viteReact(),
    lingui(),
    babel({ presets: [linguiTransformerBabelPreset()] }),
  ],
});
```

</Step>
<Step number={5} title="प्रति लोकेल कैटलॉग लोड करें">

`import()` में टेम्पलेट लिटरल Vite को **प्रति कैटलॉग एक हिस्सा (chunk)** उत्सर्जित करने की अनुमति देता है, और Lingui प्लगइन `.po` फ़ाइल को इसमें संकलित करता है। एक फ्रेंच विज़िटर केवल फ्रेंच कैटलॉग डाउनलोड करता है।

संकलित संदेश सामान्य डेटा होते हैं, इसलिए उन्हें रूट लोडर द्वारा लौटाया जा सकता है, HTML में क्रमबद्ध (serialized) किया जा सकता है, और हाइड्रेशन पर पुन: उपयोग किया जा सकता है।

```ts fileName="src/i18n/lingui.ts"
import { type I18n, type Messages, setupI18n } from "@lingui/core";
import type { Locale } from "./config";

/**
 * Loads the compiled catalog of one locale (one chunk per locale).
 */
export const loadCatalog = async (locale: Locale): Promise<Messages> => {
  const { messages } = await import(`../locales/${locale}/messages.po`);

  return messages;
};

/**
 * Creates an isolated I18n instance: safe for concurrent SSR requests.
 */
export const createI18n = (locale: Locale, messages: Messages): I18n =>
  setupI18n({ locale, messages: { [locale]: messages } });

/**
 * Loads a catalog and returns a ready-to-use instance, for loaders and
 * server functions.
 */
export const loadI18n = async (locale: Locale): Promise<I18n> =>
  createI18n(locale, await loadCatalog(locale));
```

TypeScript के लिए `.po` आयात को स्वीकार करने के लिए, मॉड्यूल को एक बार घोषित करें:

```ts fileName="src/i18n/po.d.ts"
declare module "*.po" {
  import type { Messages } from "@lingui/core";

  export const messages: Messages;
}
```

</Step>
<Step number={6} title="रूट दस्तावेज़ बनाएं">

रूट रूट सर्वर-रेंडर किए गए `<html>` पर `lang` और `dir` सेट करने के लिए वैकल्पिक लोकेल पैरम को पढ़ता है।

```tsx fileName="src/routes/__root.tsx"
import {
  createRootRoute,
  HeadContent,
  Scripts,
  useParams,
} from "@tanstack/react-router";
import type { ReactNode } from "react";
import { getTextDirection, resolveLocale } from "@/i18n/config";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
    ],
  }),
  shellComponent: RootDocument,
});

function RootDocument({ children }: { children: ReactNode }) {
  const { locale: localeParam } = useParams({ strict: false });
  const locale = resolveLocale(localeParam);

  return (
    <html lang={locale} dir={getTextDirection(locale)}>
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}
```

</Step>
<Step number={7} title="लोकेल लेआउट रूट बनाएं">

`{-$locale}` फ़ोल्डर एक वैकल्पिक पाथ सेगमेंट बनाता है: `/about` और `/fr/about` दोनों `/{-$locale}/about` से मेल खाते हैं। लेआउट अज्ञात प्रीफ़िक्स को अस्वीकार करता है, वर्तमान लोकेल के कैटलॉग को लोड करता है, और एक समर्पित `I18n` इंस्टेंस प्रदान करता है।

```tsx fileName="src/routes/{-$locale}/route.tsx"
import { I18nProvider } from "@lingui/react";
import { createFileRoute, notFound, Outlet } from "@tanstack/react-router";
import { useMemo } from "react";
import { Header } from "@/components/Header";
import { NotFound } from "@/components/NotFound";
import { isLocale, resolveLocale } from "@/i18n/config";
import { createI18n, loadCatalog } from "@/i18n/lingui";

export const Route = createFileRoute("/{-$locale}")({
  beforeLoad: ({ params }) => {
    if (params.locale !== undefined && !isLocale(params.locale)) {
      throw notFound();
    }
  },
  loader: async ({ params }) => {
    const locale = resolveLocale(params.locale);

    return { locale, messages: await loadCatalog(locale) };
  },
  // A catalog never changes for a given locale
  staleTime: Infinity,
  component: LocaleLayout,
  notFoundComponent: NotFound,
});

function LocaleLayout() {
  const { locale, messages } = Route.useLoaderData();

  // One instance per locale, never shared between requests
  const i18n = useMemo(() => createI18n(locale, messages), [locale, messages]);

  return (
    <I18nProvider i18n={i18n}>
      <Header />
      <main>
        <Outlet />
      </main>
    </I18nProvider>
  );
}
```

</Step>
<Step number={8} title="अपने पेजों में अनुवादों का उपयोग करें">

कंपोनेंट में स्रोत टेक्स्ट लिखें। मैक्रोज़ इसे बिल्ड समय पर मैसेज आईडी में बदल देते हैं, और `lingui extract` इसे एकत्र करता है।

- JSX सामग्री के लिए `<Trans>`, नेस्टेड तत्वों सहित;
- स्ट्रिंग्स (विशेषताओं, प्रॉप्स) के लिए `useLingui().t`;
- ICU बहुवचनों के लिए `<Plural>`।

```tsx fileName="src/routes/{-$locale}/about.tsx"
import { msg } from "@lingui/core/macro";
import { Plural, Trans, useLingui } from "@lingui/react/macro";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { resolveLocale } from "@/i18n/config";
import { loadI18n } from "@/i18n/lingui";
import { buildLocalizedHead } from "@/i18n/seo";

export const Route = createFileRoute("/{-$locale}/about")({
  // Translate the metadata in the loader: head() stays synchronous
  loader: async ({ params }) => {
    const i18n = await loadI18n(resolveLocale(params.locale));

    return {
      metadata: {
        title: i18n._(msg`About us`),
        description: i18n._(
          msg`Learn who we are and why we built this application.`
        ),
      },
    };
  },
  staleTime: Infinity,
  head: ({ params, loaderData }) =>
    loaderData
      ? buildLocalizedHead({
          path: "/about",
          locale: resolveLocale(params.locale),
          ...loaderData.metadata,
        })
      : {},
  component: AboutPage,
});

function AboutPage() {
  const { t } = useLingui();
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>
        <Trans>About us</Trans>
      </h1>
      <p>
        <Plural
          value={count}
          _0="No clicks yet"
          one="# click"
          other="# clicks"
        />
      </p>
      <button
        type="button"
        aria-label={t`Counter`}
        onClick={() => setCount((value) => value + 1)}
      >
        <Trans>Increment</Trans>
      </button>
    </>
  );
}
```

> किसी कैटलॉग का डायनेमिक `import()` मॉड्यूल सिस्टम द्वारा कैश किया जाता है, इसलिए कई लोडरों में `loadI18n` को कॉल करने से कैटलॉग दो बार डाउनलोड नहीं होता है।

</Step>
<Step number={9} title="अपने संदेश निकालें और अनुवाद करें">

निष्कर्षण (extraction) चलाएं। Lingui प्रत्येक संदेश को प्रत्येक लोकेल कैटलॉग में लिखता है:

```bash
npm run i18n:extract
```

फिर प्रत्येक प्रविष्टि के `msgstr` का अनुवाद करें:

<Tabs group="locale">
 <Tab value='fr' label='French'>

```plaintext fileName="src/locales/fr/messages.po"
msgid "About us"
msgstr "À propos"

msgid "Learn who we are and why we built this application."
msgstr "Découvrez qui nous sommes et pourquoi nous avons créé cette application."

msgid "Increment"
msgstr "Incrémenter"

msgid "Counter"
msgstr "Compteur"

msgid "{count, plural, =0 {No clicks yet} one {# click} other {# clics}}"
msgstr "{count, plural, =0 {Aucun clic} one {# clic} other {# clics}}"
```

 </Tab>
 <Tab value='es' label='Spanish'>

```plaintext fileName="src/locales/es/messages.po"
msgid "About us"
msgstr "Sobre nosotros"

msgid "Learn who we are and why we built this application."
msgstr "Descubre quiénes somos y por qué creamos esta aplicación."

msgid "Increment"
msgstr "Incrementar"

msgid "Counter"
msgstr "Contador"

msgid "{count, plural, =0 {No clicks yet} one {# click} other {# clics}}"
msgstr "{count, plural, =0 {Ningún clic} one {# clic} other {# clics}}"
```

 </Tab>
</Tabs>

> डिफ़ॉल्ट रूप से, संदेश आईडी स्रोत टेक्स्ट के हैश होते हैं: अंग्रेजी टेक्स्ट बदलने से एक नया संदेश बनता है। उन टेक्स्ट के लिए स्पष्ट आईडी (`<Trans id="about.title">About us</Trans>`) का उपयोग करें जो अक्सर बदलते हैं।

</Step>
<Step number={10} title="एक स्थानीयकृत लिंक घटक बनाएं" isOptional={true}>

प्रत्येक रूट `{-$locale}` के अंतर्गत रहता है, इसलिए लिंक में वर्तमान लोकेल पैरामीटर होना चाहिए।

```tsx fileName="src/components/LocalizedLink.tsx"
import { useLingui } from "@lingui/react";
import { Link, type LinkComponentProps } from "@tanstack/react-router";
import { type Locale, toLocaleParam } from "@/i18n/config";

type LocalizedLinkProps = Omit<LinkComponentProps, "params">;

export const LocalizedLink = (props: LocalizedLinkProps) => {
  const { i18n } = useLingui();

  return (
    <Link
      {...props}
      params={{ locale: toLocaleParam(i18n.locale as Locale) }}
    />
  );
};
```

</Step>
<Step number={11} title="अपनी सामग्री की भाषा बदलें" isOptional={true}>

स्विचर को **लिंक** के रूप में रेंडर करें, ताकि क्रॉलर्स को हर भाषा का संस्करण मिल सके। `to="."` वर्तमान पेज को बनाए रखता है और लोकेल पैरामीटर को बदलता है। लोकेल लेआउट का लोडर फिर नया कैटलॉग प्राप्त करता है।

```tsx fileName="src/components/LocaleSwitcher.tsx"
import { useLingui } from "@lingui/react/macro";
import { Link } from "@tanstack/react-router";
import {
  getLocaleName,
  type Locale,
  localeCookieName,
  locales,
  toLocaleParam,
} from "@/i18n/config";

const persistLocale = (locale: Locale) => {
  document.cookie = `${localeCookieName}=${locale}; Path=/; Max-Age=31536000; SameSite=Lax`;
};

export const LocaleSwitcher = () => {
  // The macro version also returns the i18n instance
  const { i18n, t } = useLingui();

  return (
    <nav aria-label={t`Change language`}>
      <ul>
        {locales.map((locale) => (
          <li key={locale}>
            <Link
              to="."
              params={(previous) => ({
                ...previous,
                locale: toLocaleParam(locale),
              })}
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
<Step number={12} title="अपने मेटाडेटा का अंतर्राष्ट्रीयकरण करें" isOptional={true}>

प्रत्येक भाषा संस्करण अपने दम पर रैंक कर सकता है, बशर्ते प्रत्येक पेज एक अनुवादित `<title>` और विवरण, एक स्व-संदर्भित कैनोनिकल, प्रति लोकेल एक `hreflang` प्लस `x-default`, Open Graph लोकेल्स और `inLanguage` के साथ JSON-LD प्रदर्शित करे। मेटाडेटा का अनुवाद लोडर में किया जाता है (चरण 8), और यह हेल्पर बाकी का निर्माण करता है:

```ts fileName="src/i18n/seo.ts"
import {
  defaultLocale,
  getAbsoluteUrl,
  type Locale,
  locales,
  openGraphLocales,
} from "./config";

type LocalizedHeadOptions = {
  /** Path without locale prefix, e.g. "/about" */
  path: string;
  locale: Locale;
  title: string;
  description: string;
};

export const buildLocalizedHead = ({
  path,
  locale,
  title,
  description,
}: LocalizedHeadOptions) => {
  const url = getAbsoluteUrl(path, locale);

  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: url },
      { property: "og:locale", content: openGraphLocales[locale] },
      ...locales
        .filter((alternateLocale) => alternateLocale !== locale)
        .map((alternateLocale) => ({
          property: "og:locale:alternate",
          content: openGraphLocales[alternateLocale],
        })),
    ],
    links: [
      { rel: "canonical", href: url },
      ...locales.map((alternateLocale) => ({
        rel: "alternate",
        hrefLang: alternateLocale,
        href: getAbsoluteUrl(path, alternateLocale),
      })),
      {
        rel: "alternate",
        hrefLang: "x-default",
        href: getAbsoluteUrl(path, defaultLocale),
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: title,
          description,
          url,
          inLanguage: locale,
        }),
      },
    ],
  };
};
```

</Step>
<Step number={13} title="अपने साइटमैप और robots.txt का अंतर्राष्ट्रीयकरण करें" isOptional={true}>

साइटमैप प्रत्येक लोकेल के प्रत्येक URL को सूचीबद्ध करता है, प्रत्येक प्रविष्टि `xhtml:link` के साथ अपने सभी विकल्पों को घोषित करती है। `robots.txt` हर भाषा में निजी मार्गों को रोकता है और साइटमैप की ओर इंगित करता है। यदि स्टार्टर ने एक बनाया है तो `public/robots.txt` को हटा दें।

```ts fileName="src/routes/sitemap[.]xml.ts"
import { createFileRoute } from "@tanstack/react-router";
import { defaultLocale, getAbsoluteUrl, locales } from "@/i18n/config";

type SitemapPage = {
  path: string;
  changeFrequency: "daily" | "weekly" | "monthly";
  priority: number;
};

export const sitemapPages: SitemapPage[] = [
  { path: "/", changeFrequency: "daily", priority: 1.0 },
  { path: "/about", changeFrequency: "monthly", priority: 0.8 },
];

const buildAlternateLinks = (path: string): string =>
  [
    ...locales.map(
      (locale) =>
        `<xhtml:link rel="alternate" hreflang="${locale}" href="${getAbsoluteUrl(path, locale)}"/>`
    ),
    `<xhtml:link rel="alternate" hreflang="x-default" href="${getAbsoluteUrl(path, defaultLocale)}"/>`,
  ].join("");

const buildSitemap = (): string => {
  const urls = sitemapPages.flatMap((page) =>
    locales.map(
      (locale) =>
        `<url><loc>${getAbsoluteUrl(page.path, locale)}</loc>${buildAlternateLinks(page.path)}<changefreq>${page.changeFrequency}</changefreq><priority>${page.priority}</priority></url>`
    )
  );

  return `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${urls.join("")}</urlset>`;
};

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: () =>
        new Response(buildSitemap(), {
          headers: { "Content-Type": "application/xml; charset=utf-8" },
        }),
    },
  },
});
```

```ts fileName="src/routes/robots[.]txt.ts"
import { createFileRoute } from "@tanstack/react-router";
import { locales, localizePath, siteUrl } from "@/i18n/config";

const privatePaths = ["/dashboard", "/admin"];

const buildRobots = (): string =>
  [
    "User-agent: *",
    "Allow: /",
    ...privatePaths.flatMap((path) =>
      locales.map((locale) => `Disallow: ${localizePath(path, locale)}`)
    ),
    "",
    `Sitemap: ${siteUrl}/sitemap.xml`,
  ].join("\n");

export const Route = createFileRoute("/robots.txt")({
  server: {
    handlers: {
      GET: () =>
        new Response(buildRobots(), {
          headers: { "Content-Type": "text/plain; charset=utf-8" },
        }),
    },
  },
});
```

</Step>
<Step number={14} title="प्रत्येक लोकेल को प्री-रेंडर करें" isOptional={true}>

प्रत्येक स्थानीयकृत पथ को सूचीबद्ध करें ताकि TanStack Start बिल्ड समय पर सभी भाषा संस्करणों को प्री-रेंडर कर सके:

```ts fileName="vite.config.ts"
import { lingui, linguiTransformerBabelPreset } from "@lingui/vite-plugin";
import babel from "@rolldown/plugin-babel";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { locales, localizePath } from "./src/i18n/config";

const pagePaths = ["/", "/about"];

const localizedPages = pagePaths.flatMap((path) =>
  locales.map((locale) => ({
    path: localizePath(path, locale),
    prerender: { enabled: true },
  }))
);

export default defineConfig({
  plugins: [
    tanstackStart({
      prerender: { enabled: true, crawlLinks: true },
      pages: [
        ...localizedPages,
        { path: "/sitemap.xml", prerender: { enabled: true } },
        { path: "/robots.txt", prerender: { enabled: true } },
      ],
    }),
    viteReact(),
    lingui(),
    babel({ presets: [linguiTransformerBabelPreset()] }),
  ],
});
```

</Step>
<Step number={15} title="पहली बार आने वाले आगंतुकों को पुनर्निर्देशित करें और 404 पेजों को संभालें" isOptional={true}>

एक अनुरोध मिडलवेयर `/` पर आने वाले आगंतुक को उनकी पसंदीदा भाषा में भेजता है (पहले कुकी, फिर `Accept-Language`)। डीप लिंक कभी भी पुनर्निर्देशित नहीं होते हैं, इसलिए क्रॉलर्स और साझा किए गए URL हमेशा वह पेज प्राप्त करते हैं जिसके लिए उन्होंने अनुरोध किया था।

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

```ts fileName="src/start.ts"
import { redirect } from "@tanstack/react-router";
import { createMiddleware, createStart } from "@tanstack/react-start";
import { getCookie } from "@tanstack/react-start/server";
import { defaultLocale, isLocale, localeCookieName } from "@/i18n/config";
import { negotiateLocale } from "@/i18n/negotiateLocale";

const localeRedirectMiddleware = createMiddleware().server(
  ({ request, next }) => {
    if (new URL(request.url).pathname !== "/") return next();

    const cookieLocale = getCookie(localeCookieName);
    const preferredLocale = isLocale(cookieLocale)
      ? cookieLocale
      : negotiateLocale(request.headers.get("accept-language"));

    if (preferredLocale && preferredLocale !== defaultLocale) {
      throw redirect({ href: `/${preferredLocale}`, statusCode: 307 });
    }

    return next();
  }
);

export const startInstance = createStart(() => ({
  requestMiddleware: [localeRedirectMiddleware],
}));
```

404 पेजों के लिए, एक कैच-ऑल रूट लेआउट के स्थानीयकृत `notFoundComponent` को रेंडर करता है। इसे `noindex` के रूप में चिह्नित करें: React 19 `<meta>` को `<head>` में होस्ट करता है।

```tsx fileName="src/components/NotFound.tsx"
import { Trans } from "@lingui/react/macro";
import { LocalizedLink } from "./LocalizedLink";

export const NotFound = () => (
  <div>
    <meta name="robots" content="noindex" />
    <h1>
      <Trans>Page not found</Trans>
    </h1>
    <LocalizedLink to="/{-$locale}">
      <Trans>Back to home</Trans>
    </LocalizedLink>
  </div>
);
```

```tsx fileName="src/routes/{-$locale}/$.tsx"
import { createFileRoute, notFound } from "@tanstack/react-router";

export const Route = createFileRoute("/{-$locale}/$")({
  beforeLoad: () => {
    throw notFound();
  },
});
```

</Step>
<Step number={16} title="अपने मैक्रोज़ रखें, Intlayer के साथ रनटाइम कम करें" isOptional={true}>

[`@intlayer/lingui`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/compat/lingui.md) संगतता एडेप्टर आपके स्रोत को अछूता रखता है: मैक्रोज़ पहले की तरह बिल्कुल संकलित होते हैं, और परिणामी `i18n._()`, `useLingui()` और `<Trans>` कॉल संकलित Intlayer शब्दकोशों द्वारा परोसे जाते हैं। बेंचमार्क में, रनटाइम **~56.7 KB से घटकर ~9.8 KB** gzip हो जाता है।

```bash packageManager="npm"
npm install @intlayer/lingui intlayer @intlayer/sync-json-plugin
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add @intlayer/lingui intlayer @intlayer/sync-json-plugin
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add @intlayer/lingui intlayer @intlayer/sync-json-plugin
yarn intlayer init
```

```bash packageManager="bun"
bun add @intlayer/lingui intlayer @intlayer/sync-json-plugin
bunx intlayer init
```

मैक्रो ट्रांसफ़ॉर्म के बाद प्लगइन जोड़ें, ताकि यह `@lingui/core` और `@lingui/react` को एडेप्टर पर उपनाम (alias) दे सके:

```ts fileName="vite.config.ts"
import { lingui as linguiIntlayer } from "@intlayer/lingui/plugin";
import { linguiTransformerBabelPreset } from "@lingui/vite-plugin";
import babel from "@rolldown/plugin-babel";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    tanstackStart(),
    viteReact(),
    babel({ presets: [linguiTransformerBabelPreset()] }),
    linguiIntlayer(),
  ],
});
```

कैटलॉग को [sync JSON प्लगइन](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/plugins/sync-json.md) (JSON कैटलॉग) या [sync PO प्लगइन](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/plugins/sync-po.md) (PO कैटलॉग) के साथ सिंक्रनाइज़ किया जाता है। पूरा सेटअप [Lingui संगतता गाइड](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/compat/lingui.md) में देखें, और [Lingui बनाम @intlayer/lingui](https://github.com/aymericzip/intlayer/blob/main/docs/blog/hi/lingui_vs_intlayer-lingui.md) में आमने-सामने तुलना देखें।

</Step>
<Step number={17} title="Intlayer का उपयोग करके अपने अनुवादों को स्वचालित करें" isOptional={true}>

Lingui संदेश निकालता है, लेकिन दर्जनों कैटलॉग को हाथ से भरने में सबसे अधिक समय जाता है। Intlayer **मुफ़्त** और **ओपन सोर्स** है, और इसके टूल्स Lingui के साथ काम करते हैं:

- **AI से अनुवाद करें** अपनी स्वयं की API कुंजी और प्रदाता का उपयोग करके। [auto fill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/autoFill.md) और [CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/cli/index.md) देखें।
- **अपनी PO फ़ाइलें बनाए रखें** सत्य के स्रोत के रूप में [sync PO प्लगइन](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/plugins/sync-po.md) के साथ।
- **लापता अनुवादों का परीक्षण करें** CI में। [अपने अनुवादों का परीक्षण करना](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/testing.md) देखें।
- **अपनी परिनियोजित (deployed) साइट का ऑडिट करें** लापता `hreflang`, गलत कैनोनिकल और लोकेल लीक के लिए [scan कमांड](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/cli/scan.md) के साथ।

</Step>
</Steps>

## अक्सर पूछे जाने वाले प्रश्न

<FAQ>

<Question title="क्या Lingui TanStack Start के साथ काम करता है?">

हाँ। Lingui का कोई समर्पित TanStack Start एकीकरण नहीं है, लेकिन इसका Vite प्लगइन और Babel मैक्रो प्लगइन ज्यों के त्यों काम करते हैं। सही करने के लिए दो बिंदु हैं `@rolldown/plugin-babel` के माध्यम से मैक्रोज़ चलाना (Vite 8 और `@vitejs/plugin-react` v6 में अब Babel शामिल नहीं है), और SSR के दौरान वैश्विक इंस्टेंस को सक्रिय करने के बजाय प्रति लोकेल एक `I18n` इंस्टेंस बनाना।

</Question>
<Question title="@lingui/core से वैश्विक i18n ऑब्जेक्ट का उपयोग क्यों न करें?">

सर्वर पर, एक प्रक्रिया एक ही समय में कई अनुरोधों को रेंडर करती है। एक साझा ऑब्जेक्ट पर `i18n.activate("fr")` को कॉल करने से समानांतर में अंग्रेजी में रेंडर होने वाले अनुरोध की भाषा बदल जाएगी। `setupI18n` प्रति लोकेल एक अलग इंस्टेंस बनाता है, जो सुरक्षित है।

</Question>
<Question title="क्या मुझे lingui compile चलाने की आवश्यकता है?">

नहीं। `@lingui/vite-plugin` आयात किए जाने पर `.po` कैटलॉग को संकलित करता है। आप केवल नए संदेश एकत्र करने के लिए `lingui extract` चलाते हैं।

</Question>
<Question title="मैं Lingui के साथ पेज शीर्षक और मेटा विवरण का अनुवाद कैसे करूँ?">

उन्हें `msg` मैक्रो के साथ घोषित करें, और रूट लोडर में ``i18n._(msg`...`)`` के साथ उनका अनुवाद करें। लोडर सादे स्ट्रिंग्स लौटाता है, इसलिए `head()` सिंक्रोनस रहता है और मान हाइड्रेशन के लिए क्रमबद्ध होते हैं। चरण 8 और चरण 12 पूरा सेटअप दिखाते हैं।

</Question>
<Question title="TanStack Start बंडल में Lingui कितना बड़ा है?">

[बेंचमार्क](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/benchmark/tanstack.md) रनटाइम के लिए ~56.7 KB gzip मापता है। मांग पर लोड किए गए प्रति लोकेल एक कैटलॉग के साथ, पेजों का वजन बिना i18n के 111 KB के मुकाबले ~115 KB होता है। हर कैटलॉग को स्थिर रूप से आयात करने से यह बढ़कर ~152 KB हो जाता है।

</Question>
<Question title="क्या मैं Lingui मैक्रोज़ रख सकता हूँ और Intlayer पर माइग्रेट कर सकता हूँ?">

हाँ। [`@intlayer/lingui`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/compat/lingui.md) एडेप्टर मैक्रोज़ को रखता है और रनटाइम को स्वैप करता है। फिर आप कंपोनेंट्स को एक-एक करके `useIntlayer` में स्थानांतरित कर सकते हैं। [संगतता एडेप्टर](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/compat/index.md) देखें।

</Question>

</FAQ>
