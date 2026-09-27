---
createdAt: 2026-09-26
updatedAt: 2026-09-26
priority: 9
title: "use-intl के साथ TanStack Start i18n: 2026 की संपूर्ण सेटअप गाइड"
description: "use-intl के साथ अपने TanStack Start ऐप का अनुवाद करें: लोकेल रूटिंग, टाइप्ड मैसेजेस, SSR, hreflang, साइटमैप और robots.txt, साथ ही वास्तविक बंडल-साइज़ बेंचमार्क डेटा।"
keywords:
  - use-intl
  - TanStack Start
  - TanStack Router
  - अंतर्राष्ट्रीयकरण
  - i18n
  - SEO
  - साइटमैप
  - React
  - ब्लॉग
slugs:
  - blog
  - tanstack-start-internationalization-using-use-intl
history:
  - version: 9.5.10
    date: 2026-09-26
    changes: "प्रारंभिक संस्करण"
author: aymericzip
---

# 2026 में use-intl का उपयोग करके अपने TanStack Start एप्लिकेशन का अंतर्राष्ट्रीयकरण कैसे करें

## विषय सूची

<TOC/>

## use-intl क्या है?

**use-intl** `next-intl` का फ्रेमवर्क-एग्नॉस्टिक कोर है। यह Next.js पर किसी भी निर्भरता के बिना समान `useTranslations`, `useFormatter` और `IntlProvider` APIs, ICU MessageFormat समर्थन और मजबूत TypeScript एकीकरण प्रदान करता है। यह इसे **TanStack Start** एप्लिकेशन का अनुवाद करने के लिए सबसे आम चॉइस में से एक बनाता है, और यह वही लाइब्रेरी है जिसे AI असिस्टेंट इस स्टैक के लिए सबसे अधिक बार सुझाते हैं।

TanStack Start में कोई अंतर्निहित i18n लेयर नहीं आती है। रूटिंग, लोकेल डिटेक्शन, SEO मेटाडेटा और साइटमैप जनरेशन आपके ऊपर छोड़ दिया जाता है। यह गाइड इस सब को शुरू से अंत तक कवर करती है:

- एक वैकल्पिक `{-$locale}` सेगमेंट (`/about`, `/fr/about`) के साथ **लोकेल-अवेयर रूटिंग**।
- **रूट-वार मैसेज लोडिंग** ताकि एक पेज केवल उन्हीं नेमस्पेस और लोकेल को डाउनलोड करे जिसे वह रेंडर करता है।
- बिना टेक्स्ट मिसमैच के **सर्वर रेंडरिंग और हाइड्रेशन**।
- **संपूर्ण बहुभाषी SEO**: अनुवादित `<title>` और विवरण, कैनोनिकल URL, `x-default` के साथ `hreflang` ऑल्टरनेट्स, Open Graph लोकेल्स, JSON-LD, `xhtml:link` ऑल्टरनेट्स के साथ साइटमैप, `robots.txt` और प्रत्येक लोकेल का प्री-रेंडरिंग।

> किसी अन्य स्टैक की तलाश है? [TanStack Start + Paraglide गाइड](https://github.com/aymericzip/intlayer/blob/main/docs/blog/hi/i18n_using_tanstack-start_paraglide.md), [TanStack Start + Lingui गाइड](https://github.com/aymericzip/intlayer/blob/main/docs/blog/hi/i18n_using_tanstack-start_lingui.md), या [TanStack Start + Intlayer गाइड](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_with_tanstack.md) देखें।

> क्या आप Next.js का उपयोग कर रहे हैं? [next-intl गाइड](https://github.com/aymericzip/intlayer/blob/main/docs/blog/hi/i18n_using_next-intl.md) देखें।

## TanStack Start पर use-intl के बारे में बेंचमार्क क्या कहता है

[i18n बेंचमार्क](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/benchmark/tanstack.md) हर प्रमुख लाइब्रेरी के साथ समान 10-पेज, 10-लोकेल TanStack Start ऐप चलाता है और मापता है कि ब्राउज़र वास्तव में क्या डाउनलोड करता है।

<I18nBenchmark framework="tanstack" packages="use-intl,@intlayer/use-intl,intlayer" vertical/>

`use-intl@4.14.2` के लिए मुख्य आंकड़े, 2026-09-26 को मापे गए (gzip):

| सेटअप                           | लाइब्रेरी साइज़ | प्रति पेज JS | अन्य-लोकेल लीक | अन्य-पेज लीक |
| :------------------------------ | --------------: | -----------: | -------------: | -----------: |
| कोई i18n नहीं (बेस ऐप)          |               - |     111.0 KB |             0% |           0% |
| `use-intl` (इस गाइड का सेटअप)   |         75.9 KB |     128.7 KB |             0% |           0% |
| `@intlayer/use-intl` (कम्पैट)   |          6.7 KB |     129.4 KB |             0% |           0% |
| `react-intlayer` (मूल Intlayer) |          4.5 KB |     126.8 KB |             0% |           0% |

मुख्य निष्कर्ष:

- **मैसेजेस को पेज के अनुसार विभाजित करें और उन्हें प्रति लोकेल लोड करें।** यह दोनों लीक को हटा देता है, और नीचे दिए गए स्टेप्स यही लागू करते हैं।
- **रनटाइम स्वयं भारी रहता है** (~76 KB gzip), क्योंकि ICU पार्सर क्लाइंट पर भेजा जाता है। `@intlayer/use-intl` कम्पैट एडेप्टर (स्टेप 17) ~7 KB रनटाइम के साथ बिल्कुल समान API बनाए रखता है।

> पूरा डेटा देखें: [TanStack Start बेंचमार्क रिपोर्ट](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/benchmark/tanstack.md), और [बेंचमार्क रिपॉजिटरी](https://github.com/intlayer-org/benchmark-i18n)।

## TanStack Start पर फीचर तुलना

TanStack Start पर आमतौर पर उपयोग की जाने वाली अन्य लाइब्रेरियों के साथ `use-intl` की तुलना:

| फ़ीचर                                    | `react-intlayer` (Intlayer)          | `use-intl`                   | Paraglide JS                      | Lingui                          |
| ---------------------------------------- | ------------------------------------ | ---------------------------- | --------------------------------- | ------------------------------- |
| **कंपोनेंट्स के पास अनुवाद**             | ✅ सह-स्थित (Co-located)             | ❌ केंद्रीकृत JSON           | ❌ प्रति लोकेल एक JSON फ़ाइल      | ⚠️ कंपोनेंट्स में सोर्स टेक्स्ट |
| **TypeScript एकीकरण**                    | ✅ ऑटो-जेनरेटेड प्रकार               | ✅ `AppConfig` के माध्यम से  | ✅ टाइप्ड मैसेज फ़ंक्शंस          | ⚠️ केवल मैक्रोज़                |
| **गायब अनुवाद डिटेक्शन**                 | ✅ टाइप एरर और बिल्ड चेतावनियाँ      | ⚠️ रनटाइम फ़ॉलबैक            | ⚠️ बेस लोकेल पर फ़ॉलबैक           | ⚠️ सोर्स टेक्स्ट पर फ़ॉलबैक     |
| **रिच कंटेंट (JSX, Markdown)**           | ✅ सीधा समर्थन                       | ⚠️ `t.rich` के माध्यम से टैग | ⚠️ स्ट्रिंग्स                     | ✅ `<Trans>` के अंदर JSX        |
| **स्थानीयकृत रूटिंग**                    | ✅ अंतर्निहित                        | ❌ मैन्युअल `{-$locale}`     | ✅ `urlPatterns` + राउटर रीराइट   | ❌ मैन्युअल `{-$locale}`        |
| **बिना रीलोड के लोकेल स्विच**            | ✅ हाँ                               | ✅ हाँ                       | ❌ पूर्ण पेज रीलोड                | ✅ हाँ                          |
| **बहुवचन (Pluralization)**               | ✅ गणना-आधारित                       | ✅ ICU                       | ✅ वेरिएंट्स                      | ✅ ICU                          |
| **ICU MessageFormat**                    | ✅ `format: "icu"` के माध्यम से      | ✅ नेटिव                     | ⚠️ एक inlang प्लगइन के माध्यम से  | ✅ नेटिव                        |
| **सामग्री प्रारूप**                      | ✅ `.ts`, `.json`, `.md`, `.yaml`... | ⚠️ `.json`                   | ⚠️ inlang JSON                    | ✅ PO, JSON, CSV                |
| **AI अनुवाद**                            | ✅ आपका अपना प्रदाता और की (key)     | ❌ नहीं                      | ❌ नहीं                           | ❌ नहीं                         |
| **विजुअल एडिटर / CMS**                   | ✅ स्थानीय एडिटर + वैकल्पिक CMS      | ❌ बाहरी प्लेटफ़ॉर्म         | ⚠️ inlang इकोसिस्टम ऐप्स          | ❌ बाहरी प्लेटफ़ॉर्म            |
| **SEO हेल्पर्स (hreflang, sitemap)**     | ✅ अंतर्निहित                        | ❌ मैन्युअल                  | ⚠️ स्थानीयकृत URLs, बाकी मैन्युअल | ❌ मैन्युअल                     |
| **रनटाइम साइज़ (gzip, बेंचमार्क)**       | 4.5 KB                               | 75.9 KB                      | 1.8 KB                            | 56.7 KB                         |
| **लीक, सर्वश्रेष्ठ सेटअप (लोकेल / पेज)** | 0% / 0%                              | 0% / 0%                      | 49.7% / 0%                        | 8.6% / 0%                       |
| **CI में गायब अनुवाद**                   | ✅ `npx intlayer test`               | ⚠️ अंतर्निहित नहीं           | ⚠️ अंतर्निहित नहीं                | ✅ `lingui compile --strict`    |

> रनटाइम साइज़ और लीक के आंकड़े [TanStack Start बेंचमार्क](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/benchmark/tanstack.md) से लिए गए हैं। लीक प्रत्येक लाइब्रेरी के सर्वश्रेष्ठ सेटअप पर मापा जाता है।

> अन्य TanStack Start गाइड्स: [Lingui](https://github.com/aymericzip/intlayer/blob/main/docs/blog/hi/i18n_using_tanstack-start_lingui.md), [Paraglide JS](https://github.com/aymericzip/intlayer/blob/main/docs/blog/hi/i18n_using_tanstack-start_paraglide.md), और [Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_with_tanstack.md)।

## वे अभ्यास जिनका आपको पालन करना चाहिए

- एक्सेसिबिलिटी, स्क्रीन रीडर्स और सर्च इंजन के लिए **`<html>` पर `lang` और `dir` सेट करें**।
- **प्रति लोकेल एक URL रखें।** केवल-कुकी स्विच के बजाय लोकेल प्रीफिक्स (`/fr/about`) का उपयोग करें, ताकि प्रत्येक अनुवादित पेज क्रॉल और शेयर करने योग्य हो।
- **मैसेजेस को नेमस्पेस के अनुसार विभाजित करें** (`common`, `home`, `about`) और उन्हें प्रति रूट लोड करें।
- **केवल सक्रिय लोकेल लोड करें।** क्लाइंट पर जाने वाले मॉड्यूल में कभी भी प्रत्येक लोकेल फ़ाइल को आयात न करें।
- `IntlProvider` में **टाइम ज़ोन को फ़िक्स करें**। अन्यथा SSR के दौरान सर्वर टाइम ज़ोन में और हाइड्रेशन पर विज़िटर टाइम ज़ोन में तिथियां फ़ॉर्मेट होती हैं, जिससे हाइड्रेशन मिसमैच होता है।
- **अपने मेटाडेटा का अनुवाद करें**, और प्रत्येक पेज पर `canonical`, `hreflang` और `x-default` घोषित करें।
- **एक बहुभाषी साइटमैप और robots.txt उत्पन्न करें**, और प्रत्येक लोकेल को प्री-रेंडर करें।
- **लोकेल स्विचर के लिए वास्तविक लिंक का उपयोग करें**, न कि `<select>`, ताकि क्रॉलर्स प्रत्येक भाषा को खोज सकें।
- **अपने मैसेजेस को टाइप करें** ताकि कोई भी गायब की (key) कंपाइल समय पर विफल हो जाए।

> [अंतर्राष्ट्रीयकरण और SEO](https://github.com/aymericzip/intlayer/blob/main/docs/blog/hi/internationalization_and_SEO.md) पर हमारी गाइड और [hreflang गाइड](https://github.com/aymericzip/intlayer/blob/main/docs/blog/hi/hreflang_guide_multilingual_seo.md) देखें।

## TanStack Start एप्लिकेशन में use-intl सेट अप करने के लिए चरण-दर-चरण मार्गदर्शिका

यहाँ प्रोजेक्ट संरचना है जिसे हम बनाएंगे:

```bash
.
├── messages
│   ├── en
│   │   ├── common.json
│   │   ├── home.json
│   │   └── about.json
│   ├── fr
│   │   └── ... same files
│   └── es
│       └── ... same files
├── vite.config.ts
└── src
    ├── start.ts                  # Request middleware (locale redirect)
    ├── router.tsx
    ├── i18n
    │   ├── config.ts             # Locales, URL helpers
    │   ├── messages.ts           # Per-namespace, per-locale loader
    │   ├── negotiateLocale.ts    # Accept-Language parsing
    │   ├── seo.ts                # head() builder
    │   └── use-intl.d.ts         # Typed messages
    ├── components
    │   ├── LocaleSwitcher.tsx
    │   ├── LocalizedLink.tsx
    │   ├── ScopedMessages.tsx
    │   └── Counter.tsx
    └── routes
        ├── __root.tsx
        ├── sitemap[.]xml.ts
        ├── robots[.]txt.ts
        └── {-$locale}
            ├── route.tsx         # Locale layout + IntlProvider
            ├── index.tsx         # / and /fr
            ├── about.tsx         # /about and /fr/about
            └── $.tsx             # Localized 404
```

<Steps>
<Step number={1} title="निर्भरताएँ स्थापित करें (Install Dependencies)">

TanStack Start प्रोजेक्ट से शुरुआत करें, फिर `use-intl` जोड़ें:

```bash packageManager="npm"
npm create @tanstack/start@latest
npm install use-intl
```

```bash packageManager="pnpm"
pnpm create @tanstack/start@latest
pnpm add use-intl
```

```bash packageManager="yarn"
yarn create @tanstack/start
yarn add use-intl
```

```bash packageManager="bun"
bun create @tanstack/start@latest
bun add use-intl
```

- **use-intl**: `IntlProvider`, `useTranslations`, `useFormatter` और `createTranslator` (React के बाहर उपयोग करने योग्य, उदाहरण के लिए `head()` में) प्रदान करता है।

</Step>
<Step number={2} title="अपने लोकेल कॉन्फ़िगरेशन को केंद्रीकृत करें">

अपने लोकेल्स और URL हेल्पर्स के लिए सिंगल सोर्स ऑफ ट्रुथ बनाएं। हर दूसरी फ़ाइल (रूट्स, SEO, साइटमैप, प्री-रेंडरिंग) यहाँ से आयात करती है, इसलिए एक लोकेल जोड़ना एक-लाइन का बदलाव है।

डिफ़ॉल्ट लोकेल बिना प्रीफिक्स के रहता है (`/about`), अन्य लोकेल्स प्रीफिक्स होते हैं (`/fr/about`)। यह "आवश्यकतानुसार" (as-needed) रणनीति है: प्रति लोकेल प्रति पेज एक URL, और आपके मुख्य दर्शकों के लिए छोटे URLs।

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
<Step number={3} title="अपनी अनुवाद फ़ाइलें बनाएं">

मैसेजेस को प्रति लोकेल और प्रति नेमस्पेस व्यवस्थित करें। `common` उन चीज़ों को रखता है जिनकी प्रत्येक पेज को आवश्यकता होती है (नेविगेशन, फूटर), और प्रत्येक पेज को अपने मेटाडेटा सहित अपनी स्वयं की फ़ाइल मिलती है।

use-intl **ICU MessageFormat** का उपयोग करता है, इसलिए बहुवचन, चयन और स्वरूपित तर्क स्वयं मैसेज के अंदर रहते हैं।

<Tabs group="locale">
 <Tab value='en' label='English'>

```json fileName="messages/en/common.json"
{
  "navigation": {
    "home": "Home",
    "about": "About"
  },
  "localeSwitcher": {
    "label": "Change language"
  },
  "notFound": {
    "title": "Page not found",
    "backHome": "Back to home"
  }
}
```

```json fileName="messages/en/about.json"
{
  "metadata": {
    "title": "About us",
    "description": "Learn who we are and why we built this application."
  },
  "title": "About us",
  "counter": {
    "label": "Counter",
    "increment": "Increment",
    "clicks": "{count, plural, =0 {No clicks yet} one {# click} other {# clicks}}"
  }
}
```

 </Tab>
 <Tab value='fr' label='French'>

```json fileName="messages/fr/common.json"
{
  "navigation": {
    "home": "Accueil",
    "about": "À propos"
  },
  "localeSwitcher": {
    "label": "Changer de langue"
  },
  "notFound": {
    "title": "Page introuvable",
    "backHome": "Retour à l'accueil"
  }
}
```

```json fileName="messages/fr/about.json"
{
  "metadata": {
    "title": "À propos",
    "description": "Découvrez qui nous sommes et pourquoi nous avons créé cette application."
  },
  "title": "À propos",
  "counter": {
    "label": "Compteur",
    "increment": "Incrémenter",
    "clicks": "{count, plural, =0 {Aucun clic} one {# clic} other {# clics}}"
  }
}
```

 </Tab>
</Tabs>

उसी तरह `home.json` बनाएं, जिसमें एक `metadata` ऑब्जेक्ट और पेज कंटेंट हो।

</Step>
<Step number={4} title="नेमस्पेस और लोकेल के अनुसार संदेश लोड करें">

यह लोडर प्रदर्शन के लिए सबसे महत्वपूर्ण फ़ाइल है। `import.meta.glob` Vite को **प्रति JSON फ़ाइल एक चंक** उत्सर्जित करने का निर्देश देता है। एक रूट जो फ्रेंच में `["about"]` मांगता है, वह `messages/fr/about.json` और कुछ नहीं डाउनलोड करता है, जिससे बेंचमार्क 0% लोकेल लीक और 0% पेज लीक तक पहुँच जाता है।

```ts fileName="src/i18n/messages.ts"
import type about from "../../messages/en/about.json";
import type common from "../../messages/en/common.json";
import type home from "../../messages/en/home.json";
import type { Locale } from "./config";

/** Shape of every namespace, inferred from the English source files. */
export type AppMessages = {
  common: typeof common;
  home: typeof home;
  about: typeof about;
};

export type Namespace = keyof AppMessages;

type JsonModule = { default: AppMessages[Namespace] };

// Lazy: each JSON file becomes its own chunk, loaded on demand
const messageLoaders = import.meta.glob<JsonModule>("../../messages/*/*.json");

/**
 * Loads the requested namespaces for one locale, in parallel.
 */
export const loadMessages = async <
  const TNamespaces extends readonly Namespace[],
>(
  locale: Locale,
  namespaces: TNamespaces
): Promise<Pick<AppMessages, TNamespaces[number]>> => {
  const entries = await Promise.all(
    namespaces.map(async (namespace) => {
      const loadNamespace =
        messageLoaders[`../../messages/${locale}/${namespace}.json`];

      if (!loadNamespace) {
        throw new Error(`Missing messages: ${locale}/${namespace}.json`);
      }

      const namespaceModule = await loadNamespace();

      return [namespace, namespaceModule.default] as const;
    })
  );

  return Object.fromEntries(entries) as Pick<AppMessages, TNamespaces[number]>;
};
```

</Step>
<Step number={5} title="अपने संदेशों को टाइप करें (Type Your Messages)">

मॉड्यूल ऑग्मेंटेशन आपको `useTranslations("about")` और `t("counter.label")` पर ऑटो-कंपलीशन देता है, और किसी भी टाइपो या हटाई गई की पर कंपाइल एरर देता है।

```ts fileName="src/i18n/use-intl.d.ts"
import type { Locale } from "./config";
import type { AppMessages } from "./messages";

declare module "use-intl" {
  interface AppConfig {
    Locale: Locale;
    Messages: AppMessages;
  }
}
```

सुनिश्चित करें कि आपके `tsconfig.json` में `resolveJsonModule` सक्षम है।

</Step>
<Step number={6} title="रूट डॉक्यूमेंट बनाएं">

रूट रूट `<html>` रेंडर करता है। यह `lang` और `dir` सेट करने के लिए वैकल्पिक लोकेल पैरम को पढ़ता है, ताकि कोई भी जावास्क्रिप्ट चलने से पहले, सर्वर-रेंडर किए गए HTML में विशेषताएँ सही हों।

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
  // strict: false reads params from whichever route is matched
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

`{-$locale}` फ़ोल्डर एक **वैकल्पिक** पाथ सेगमेंट बनाता है: `/about` और `/fr/about` दोनों `/{-$locale}/about` से मेल खाते हैं। यह लेआउट:

1. असमर्थित प्रीफिक्स को अस्वीकार करता है (`/xx/about` → 404)।
2. केवल वर्तमान लोकेल के लिए `common` नेमस्पेस लोड करता है।
3. `IntlProvider` के माध्यम से मैसेजेस प्रदान करता है।

लोडर परिणाम HTML में सीरियलाइज़ होता है और हाइड्रेशन पर पुन: उपयोग किया जाता है, इसलिए क्लाइंट दूसरी बार `common.json` डाउनलोड नहीं करता है। `staleTime: Infinity` इसे क्लाइंट नेविगेशन के दौरान कैश्ड रखता है।

```tsx fileName="src/routes/{-$locale}/route.tsx"
import { createFileRoute, notFound, Outlet } from "@tanstack/react-router";
import { IntlProvider } from "use-intl";
import { Header } from "@/components/Header";
import { NotFound } from "@/components/NotFound";
import { isLocale, resolveLocale } from "@/i18n/config";
import { loadMessages } from "@/i18n/messages";

export const Route = createFileRoute("/{-$locale}")({
  beforeLoad: ({ params }) => {
    // /xx/about with an unknown prefix → 404
    if (params.locale !== undefined && !isLocale(params.locale)) {
      throw notFound();
    }
  },
  loader: async ({ params }) => {
    const locale = resolveLocale(params.locale);

    return { locale, messages: await loadMessages(locale, ["common"]) };
  },
  // Messages never change for a given locale
  staleTime: Infinity,
  component: LocaleLayout,
  notFoundComponent: NotFound,
});

function LocaleLayout() {
  const { locale, messages } = Route.useLoaderData();

  return (
    <IntlProvider
      locale={locale}
      messages={messages}
      // A fixed time zone prevents SSR / hydration date mismatches
      timeZone="UTC"
    >
      <Header />
      <main>
        <Outlet />
      </main>
    </IntlProvider>
  );
}
```

> `IntlProvider` पैरेंट प्रोवाइडर के मैसेजेस को मर्ज नहीं करता है। अगला स्टेप एक छोटा कंपोनेंट जोड़ता है जो ऐसा करता है, ताकि प्रत्येक पेज `common` के ऊपर अपना स्वयं का नेमस्पेस जोड़ सके।

</Step>
<Step number={8} title="पेज मैसेजेस को स्कोप करें (Scope Page Messages)">

प्रत्येक पेज अपने लोडर में अपने स्वयं के नेमस्पेस को लोड करता है, फिर अपनी सामग्री को `ScopedMessages` के साथ लपेटता है, जो पेज नेमस्पेस को पैरेंट मैसेजेस के साथ मर्ज करता है।

```tsx fileName="src/components/ScopedMessages.tsx"
import { type ReactNode, useMemo } from "react";
import {
  type AbstractIntlMessages,
  IntlProvider,
  useLocale,
  useMessages,
  useTimeZone,
} from "use-intl";

type ScopedMessagesProps = {
  messages: AbstractIntlMessages;
  children: ReactNode;
};

/**
 * Adds route-level namespaces on top of the messages already provided.
 */
export const ScopedMessages = ({ messages, children }: ScopedMessagesProps) => {
  const parentMessages = useMessages();
  const locale = useLocale();
  const timeZone = useTimeZone();

  const mergedMessages = useMemo(
    () => ({ ...parentMessages, ...messages }),
    [parentMessages, messages]
  );

  return (
    <IntlProvider locale={locale} timeZone={timeZone} messages={mergedMessages}>
      {children}
    </IntlProvider>
  );
};
```

</Step>
<Step number={9} title="अपने पेजों में अनुवाद का उपयोग करें">

पेज लोडर वर्तमान लोकेल के लिए `about` नेमस्पेस प्राप्त करता है, `head()` इससे अनुवादित, SEO-पूर्ण मेटाडेटा बनाता है (स्टेप 13 देखें), और कंपोनेंट सामग्री को रेंडर करता है।

```tsx fileName="src/routes/{-$locale}/about.tsx"
import { createFileRoute } from "@tanstack/react-router";
import { createTranslator, useTranslations } from "use-intl";
import { Counter } from "@/components/Counter";
import { ScopedMessages } from "@/components/ScopedMessages";
import { resolveLocale } from "@/i18n/config";
import { loadMessages } from "@/i18n/messages";
import { buildLocalizedHead } from "@/i18n/seo";

export const Route = createFileRoute("/{-$locale}/about")({
  loader: async ({ params }) => ({
    messages: await loadMessages(resolveLocale(params.locale), ["about"]),
  }),
  staleTime: Infinity,
  head: ({ params, loaderData }) => {
    const locale = resolveLocale(params.locale);

    if (!loaderData) return {};

    // createTranslator works outside React, perfect for head()
    const t = createTranslator({
      locale,
      messages: loaderData.messages,
      namespace: "about.metadata",
    });

    return buildLocalizedHead({
      path: "/about",
      locale,
      title: t("title"),
      description: t("description"),
    });
  },
  component: AboutPage,
});

function AboutPage() {
  const { messages } = Route.useLoaderData();

  return (
    <ScopedMessages messages={messages}>
      <AboutContent />
    </ScopedMessages>
  );
}

function AboutContent() {
  const t = useTranslations("about");

  return (
    <>
      <h1>{t("title")}</h1>
      <Counter />
    </>
  );
}
```

</Step>
<Step number={10} title="कंपोनेंट्स में अनुवाद और फॉर्मेटर्स का उपयोग करें">

प्रोवाइडर्स के अंतर्गत कोई भी कंपोनेंट `useTranslations` और `useFormatter` को कॉल कर सकता है। प्लूरल्स ICU द्वारा हल किए जाते हैं, और संख्याएँ सक्रिय लोकेल के अनुसार स्वरूपित होती हैं।

```tsx fileName="src/components/Counter.tsx"
import { useState } from "react";
import { useFormatter, useTranslations } from "use-intl";

export const Counter = () => {
  const t = useTranslations("about.counter");
  const format = useFormatter();
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>{t("clicks", { count })}</p>
      <p>{format.number(count)}</p>
      <button
        type="button"
        aria-label={t("label")}
        onClick={() => setCount((value) => value + 1)}
      >
        {t("increment")}
      </button>
    </div>
  );
};
```

</Step>
<Step number={11} title="एक स्थानीयकृत लिंक कंपोनेंट बनाएं" isOptional={true}>

प्रत्येक रूट `{-$locale}` के अंतर्गत रहता है, इसलिए एक लिंक को वर्तमान लोकेल पैरम ले जाना चाहिए। यह रैपर TanStack Router के टाइप्ड `to` को रखता है और आपके लिए लोकेल इंजेक्ट करता है।

```tsx fileName="src/components/LocalizedLink.tsx"
import { Link, type LinkComponentProps } from "@tanstack/react-router";
import { useLocale } from "use-intl";
import { toLocaleParam } from "@/i18n/config";

type LocalizedLinkProps = Omit<LinkComponentProps, "params">;

export const LocalizedLink = (props: LocalizedLinkProps) => {
  const locale = useLocale();

  return <Link {...props} params={{ locale: toLocaleParam(locale) }} />;
};
```

```tsx fileName="src/components/Header.tsx"
import { useTranslations } from "use-intl";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { LocalizedLink } from "./LocalizedLink";

export const Header = () => {
  const t = useTranslations("common.navigation");

  return (
    <header>
      <nav>
        <LocalizedLink to="/{-$locale}">{t("home")}</LocalizedLink>
        <LocalizedLink to="/{-$locale}/about">{t("about")}</LocalizedLink>
      </nav>
      <LocaleSwitcher />
    </header>
  );
};
```

</Step>
<Step number={12} title="अपनी सामग्री की भाषा बदलें" isOptional={true}>

स्विचर को **लिंक्स** के रूप में रेंडर करें, न कि `<select>` के रूप में। लिंक्स क्रॉल करने योग्य होते हैं, इसलिए सर्च इंजन प्रत्येक भाषा संस्करण को ढूंढ लेते हैं, और वे जावास्क्रिप्ट के बिना भी काम करते हैं। `to="."` वर्तमान पेज को बनाए रखता है और केवल लोकेल पैरम को बदलता है। कुकी स्टेप 16 के रीडायरेक्ट मिडलवेयर के लिए स्पष्ट विकल्प को याद रखती है।

```tsx fileName="src/components/LocaleSwitcher.tsx"
import { Link } from "@tanstack/react-router";
import { useLocale, useTranslations } from "use-intl";
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
  const t = useTranslations("common.localeSwitcher");
  const activeLocale = useLocale();

  return (
    <nav aria-label={t("label")}>
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
              aria-current={locale === activeLocale ? "page" : undefined}
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
<Step number={13} title="अपने मेटाडेटा का अंतर्राष्ट्रीयकरण करें" isOptional={true}>

यहीं पर i18n का फायदा मिलता है: प्रत्येक भाषा संस्करण अपने दम पर रैंक कर सकता है। प्रत्येक पेज को निम्नलिखित प्रदर्शित करना चाहिए:

- एक **अनुवादित** `<title>` और `description`;
- स्वयं की ओर इशारा करने वाला एक **कैनोनिकल** URL (डिफ़ॉल्ट लोकेल की ओर नहीं);
- प्रति लोकेल एक **`hreflang` ऑल्टरनेट**, साथ ही बेमेल भाषाओं के लिए **`x-default`**;
- सोशल प्रीव्यूज़ द्वारा उपयोग किए जाने वाले **Open Graph** `og:locale`, `og:locale:alternate` और `og:url`;
- `inLanguage` के साथ **JSON-LD**, जो सर्च इंजन और AI सहायकों को पेज की भाषा का श्रेय देने में मदद करता है।

एक एकल हेल्पर यह सब बनाता है, जिससे पेज कोड संक्षिप्त रहता है:

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
      // Canonical: each locale is its own canonical page
      { rel: "canonical", href: url },
      // hreflang: every language version, including the current one
      ...locales.map((alternateLocale) => ({
        rel: "alternate",
        hrefLang: alternateLocale,
        href: getAbsoluteUrl(path, alternateLocale),
      })),
      // x-default: fallback for visitors whose language is not supported
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

प्रत्येक पेज के `head()` में इसका उपयोग करें, जैसा कि स्टेप 9 में दिखाया गया है। होम पेज के लिए, `path: "/"` पास करें।

</Step>
<Step number={14} title="अपने साइटमैप का अंतर्राष्ट्रीयकरण करें" isOptional={true}>

एक बहुभाषी साइटमैप **प्रत्येक लोकेल के प्रत्येक URL** को सूचीबद्ध करता है, और प्रत्येक प्रविष्टि `xhtml:link` के साथ अपने सभी ऑल्टरनेट घोषित करती है। Google इन एनोटेशन का उपयोग ठीक पेज के `hreflang` टैग की तरह करता है, जो उन्हें तब एक विश्वसनीय बैकअप बनाता है जब किसी पेज को शायद ही कभी क्रॉल किया जाता है।

TanStack Start सर्वर रूट्स आपको इसे एक फ़ाइल रूट से परोसने की सुविधा देते हैं:

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

</Step>
<Step number={15} title="अपने robots.txt का अंतर्राष्ट्रीयकरण करें" isOptional={true}>

निजी रूट्स प्रत्येक भाषा में मौजूद होते हैं, इसलिए `Disallow` नियमों को प्रत्येक प्रीफिक्स को कवर करना चाहिए। यदि स्टार्टर ने एक फ़ाइल बनाई है तो `public/robots.txt` को हटा दें, फिर इसे एक रूट से परोसें:

```ts fileName="src/routes/robots[.]txt.ts"
import { createFileRoute } from "@tanstack/react-router";
import { locales, localizePath, siteUrl } from "@/i18n/config";

const privatePaths = ["/dashboard", "/admin"];

const buildRobots = (): string => {
  // /dashboard, /fr/dashboard, /es/dashboard...
  const disallowRules = privatePaths.flatMap((path) =>
    locales.map((locale) => `Disallow: ${localizePath(path, locale)}`)
  );

  return [
    "User-agent: *",
    "Allow: /",
    ...disallowRules,
    "",
    `Sitemap: ${siteUrl}/sitemap.xml`,
  ].join("\n");
};

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
<Step number={16} title="पहली बार आने वाले आगंतुकों को उनकी भाषा पर पुनर्निर्देशित करें" isOptional={true}>

एक अनुरोध मिडलवेयर `/` पर आने वाले विज़िटर को उसकी पसंदीदा भाषा में भेजता है, पहले लोकेल कुकी के आधार पर, फिर `Accept-Language` हेडर के आधार पर। केवल `/` को पुनर्निर्देशित किया जाता है: डीप लिंक्स को कभी छुआ नहीं जाता है, ताकि शेयर किए गए URLs और क्रॉलर्स को हमेशा वही पेज मिले जो उन्होंने मांगा था।

```ts fileName="src/i18n/negotiateLocale.ts"
import { isLocale, type Locale } from "./config";

/**
 * Picks the best supported locale from an Accept-Language header.
 * "fr-CA,fr;q=0.9,en;q=0.8" → "fr"
 */
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
    const { pathname } = new URL(request.url);

    if (pathname !== "/") return next();

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

> एक विज़िटर जो स्विचर में स्पष्ट रूप से अंग्रेजी चुनता है, उसे कुकी में `locale=en` मिलता है, इसलिए उन्हें फिर कभी रीडायरेक्ट नहीं किया जाता है। पूरी तरह से स्टेटिक परिनियोजन पर (स्टेप 18), `/` को एक फ़ाइल के रूप में परोसा जाता है और यह मिडलवेयर नहीं चलता है, जो कि ठीक है: पेज सुलभ रहता है और स्विचर बाकी काम करता है।

</Step>
<Step number={17} title="use-intl API बनाए रखें, Intlayer के साथ रनटाइम घटाएं" isOptional={true}>

बेंचमार्क दिखाता है कि use-intl सेटअप का सबसे भारी हिस्सा स्वयं रनटाइम है (~76 KB gzip)। [`@intlayer/use-intl`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/compat/index.md) कम्पैट एडेप्टर **समान API** (`useTranslations`, `useFormatter`, `IntlProvider`, `createTranslator`, ICU प्लूरल्स, `t.rich`) प्रदान करता है, लेकिन इसे कंपाइल किए गए Intlayer डिक्शनरी से परोसता है: **~75.9 KB के बजाय ~6.7 KB**, 0% लोकेल लीक और 0% पेज लीक, आपके कंपोनेंट्स में बिना किसी बदलाव के।

```bash packageManager="npm"
npm install @intlayer/use-intl intlayer @intlayer/sync-json-plugin
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add @intlayer/use-intl intlayer @intlayer/sync-json-plugin
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add @intlayer/use-intl intlayer @intlayer/sync-json-plugin
yarn intlayer init
```

```bash packageManager="bun"
bun add @intlayer/use-intl intlayer @intlayer/sync-json-plugin
bunx intlayer init
```

Vite प्लगइन `use-intl` को एडेप्टर में उपनाम (alias) देता है, ताकि मौजूदा आयात काम करते रहें:

```ts fileName="vite.config.ts"
import useIntlVitePlugin from "@intlayer/use-intl/plugin";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [tanstackStart(), viteReact(), useIntlVitePlugin()],
});
```

आपकी JSON फ़ाइलें [sync JSON प्लगइन](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/plugins/sync-json.md) की बदौलत सिंगल सोर्स ऑफ ट्रुथ बनी रहती हैं:

```ts fileName="intlayer.config.ts"
import { syncJSON } from "@intlayer/sync-json-plugin";
import { type IntlayerConfig, Locales } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  dictionary: {
    // One chunk per locale, loaded on demand
    importMode: "dynamic",
    format: "icu",
  },
  plugins: [
    syncJSON({
      format: "icu",
      source: ({ locale, key }) => `./messages/${locale}/${key}.json`,
    }),
  ],
};

export default config;
```

> यह एडेप्टर एक आसान माइग्रेशन मार्ग भी है: एक बार जब यह चलने लगे, तो आप कंपोनेंट्स को एक-एक करके मूल `useIntlayer` API में ले जा सकते हैं। [Intlayer TanStack Start गाइड](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_with_tanstack.md) देखें।

</Step>
<Step number={18} title="प्रत्येक लोकेल को प्री-रेंडर करें" isOptional={true}>

स्टेटिक HTML सबसे तेज़ पेज है जिसे आप परोस सकते हैं और इंडेक्स करने के लिए सबसे आसान है। प्रत्येक स्थानीयकृत पाथ को सूचीबद्ध करें ताकि TanStack Start बिल्ड समय पर सभी भाषा संस्करणों, साथ ही साइटमैप और robots फ़ाइलों को प्री-रेंडर करे:

```ts fileName="vite.config.ts"
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
  ],
});
```

चूंकि लोकेल स्विचर वास्तविक लिंक रेंडर करता है, `crawlLinks: true` उन पेजों को भी खोज लेता है जिन्हें आप सूचीबद्ध करना भूल गए थे।

</Step>
<Step number={19} title="स्थानीयकृत 404 पेजों को संभालें" isOptional={true}>

स्टेप 7 का लेआउट पहले से ही अज्ञात लोकेल प्रीफिक्स के लिए `notFound()` थ्रो करता है। एक कैच-ऑल रूट जोड़ें ताकि लोकेल के अंदर अज्ञात पाथ भी स्थानीयकृत 404 रेंडर करें, और इसे `noindex` के रूप में चिह्नित करें: React 19 `<meta>` टैग को `<head>` में ले जाता है।

```tsx fileName="src/components/NotFound.tsx"
import { useTranslations } from "use-intl";
import { LocalizedLink } from "./LocalizedLink";

export const NotFound = () => {
  const t = useTranslations("common.notFound");

  return (
    <div>
      <meta name="robots" content="noindex" />
      <h1>{t("title")}</h1>
      <LocalizedLink to="/{-$locale}">{t("backHome")}</LocalizedLink>
    </div>
  );
};
```

```tsx fileName="src/routes/{-$locale}/$.tsx"
import { createFileRoute, notFound } from "@tanstack/react-router";

// /fr/does/not/exist → rendered by the layout notFoundComponent
export const Route = createFileRoute("/{-$locale}/$")({
  beforeLoad: () => {
    throw notFound();
  },
});
```

</Step>
<Step number={20} title="सर्वर फ़ंक्शंस में लोकेल एक्सेस करें" isOptional={true}>

सर्वर फ़ंक्शंस को रूट पैरम्स प्राप्त नहीं होते हैं। एक स्थानीयकृत ईमेल भेजने या भाषा प्राथमिकता संग्रहीत करने के लिए, लोकेल कुकी पढ़ें, और `Accept-Language` हेडर पर फ़ॉलबैक करें:

```ts fileName="src/server/getServerLocale.ts"
import { createServerFn } from "@tanstack/react-start";
import { getCookie, getRequestHeader } from "@tanstack/react-start/server";
import { defaultLocale, isLocale, localeCookieName } from "@/i18n/config";
import { negotiateLocale } from "@/i18n/negotiateLocale";

export const getServerLocale = createServerFn().handler(() => {
  const cookieLocale = getCookie(localeCookieName);

  if (isLocale(cookieLocale)) return cookieLocale;

  return negotiateLocale(getRequestHeader("accept-language")) ?? defaultLocale;
});
```

सर्वर फ़ंक्शन के अंदर अनुवाद करने के लिए, इसे `use-intl` से `loadMessages` और `createTranslator` के साथ जोड़ें।

</Step>
<Step number={21} title="Intlayer का उपयोग करके अपने अनुवादों को स्वचालित करें" isOptional={true}>

use-intl अनुवाद रेंडर करता है, लेकिन यह उन्हें **उत्पन्न (produce)** करने में आपकी सहायता नहीं करता है। Intlayer **निःशुल्क** और **ओपन सोर्स** है, और भले ही आप use-intl बनाए रखें, यह उस अंतर को भरता है:

- CI या यूनिट परीक्षणों में **गायब अनुवादों का परीक्षण करें**। [अपने अनुवादों का परीक्षण करना](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/testing.md) देखें।
- अपनी खुद की API की और प्रदाता का उपयोग करके **AI के साथ अनुवाद करें**: `npx intlayer fill` आपके ऐप के संदर्भ के साथ गायब कीज़ का अनुवाद करता है। [ऑटो फिल](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/autoFill.md) और [CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/cli/index.md) देखें।
- [sync JSON प्लगइन](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/plugins/sync-json.md) के साथ अपनी JSON फ़ाइलों को सिंगल सोर्स ऑफ ट्रुथ के रूप में रखें।
- [विजुअल एडिटर](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_visual_editor.md) और [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_CMS.md) के साथ सामग्री को विजुअल रूप से संपादित करें, ताकि गैर-डेवलपर्स भी अनुवाद अपडेट कर सकें।
- [MCP सर्वर](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/mcp_server.md) और [एजेंट स्किल्स](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/agent_skills.md) के साथ अपने AI एजेंट को संदर्भ दें।
- [स्कैन कमांड](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/cli/scan.md) के साथ गायब `hreflang`, गलत कैनोनिकल और लोकेल लीक के लिए अपनी तैनात साइट को स्कैन करें।

सभी सुविधाओं को जानने के लिए, [Intlayer क्यों चुनें](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/interest_of_intlayer.md) देखें।

</Step>
</Steps>

## अक्सर पूछे जाने वाले प्रश्न

<FAQ>

<Question title="क्या TanStack Start के लिए use-intl एक अच्छा विकल्प है?">

हाँ, यदि आप Next.js के बाहर `next-intl` API चाहते हैं। यह आपको ICU संदेश, प्रारूपक (formatters) और अच्छा TypeScript समर्थन देता है, और यह Next.js-विशिष्ट बाधाओं जैसे `setRequestLocale` से बचाता है। इसका नकारात्मक पहलू वज़न है: [बेंचमार्क](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/benchmark/tanstack.md) रनटाइम के लिए ~76 KB gzip मापता है, और एक सामान्य सेटअप प्रत्येक लोकेल और प्रत्येक पेज को ब्राउज़र में भेज देता है। लीक से बचने के लिए, इस गाइड की तरह, रूट और लोकेल के अनुसार नेमस्पेस लोड करें।

</Question>
<Question title="use-intl और next-intl में क्या अंतर है?">

`use-intl`, `next-intl` का कोर है। `next-intl` शीर्ष पर Next.js एकीकरण जोड़ता है: एक मिडलवेयर, नेविगेशन हेल्पर्स, सर्वर कंपोनेंट्स के लिए `getTranslations` और अनुरोध कॉन्फ़िगरेशन। TanStack Start पर आप सीधे `use-intl` का उपयोग करते हैं और TanStack Router के साथ रूटिंग लागू करते हैं, जैसा कि ऊपर दिखाया गया है।

</Question>
<Question title="क्या मुझे भाषा संग्रहीत करने के लिए लोकेल प्रीफिक्स या कुकी का उपयोग करना चाहिए?">

URL में प्रीफिक्स का उपयोग करें। इस तरह प्रत्येक भाषा संस्करण का अपना URL होता है जिसे सर्च इंजन इंडेक्स कर सकते हैं और उपयोगकर्ता शेयर कर सकते हैं। एक स्पष्ट विकल्प को याद रखने के लिए एक कुकी अभी भी उपयोगी है, जो कि स्टेप 16 का रीडायरेक्ट मिडलवेयर करता है।

</Question>
<Question title="तिथियों को स्वरूपित करते समय मुझे हाइड्रेशन मिसमैच क्यों मिलता है?">

सर्वर और ब्राउज़र अलग-अलग टाइम ज़ोन में तिथियों को फ़ॉर्मेट करते हैं। `IntlProvider` में एक स्पष्ट `timeZone` पास करें (या कुकी में संग्रहीत विज़िटर टाइम ज़ोन), ताकि दोनों पक्ष समान टेक्स्ट उत्पन्न करें।

</Question>
<Question title="मैं use-intl के बंडल साइज़ को कैसे कम करूँ?">

सबसे पहले, संदेशों को नेमस्पेस द्वारा विभाजित करें और उन्हें `import.meta.glob` के साथ प्रति रूट और प्रति लोकेल लोड करें, जो लोकेल और पेज लीक को हटा देता है। फिर, यदि रनटाइम साइज़ मायने रखता है, तो [`@intlayer/use-intl`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/compat/index.md) एडेप्टर पर स्विच करें: समान API, बेंचमार्क में ~75.9 KB के बजाय ~6.7 KB।

</Question>
<Question title="मैं use-intl के साथ शीर्षक और मेटा विवरण का अनुवाद कैसे करूँ?">

रूट लोडर द्वारा लौटाए गए संदेशों के साथ रूट `head()` फ़ंक्शन के अंदर `createTranslator` को कॉल करें, फिर `title`, `description`, कैनोनिकल और `hreflang` लिंक लौटाएं। स्टेप 13 एक पुन: प्रयोज्य हेल्पर प्रदान करता है।

</Question>
<Question title="क्या मैं use-intl से Intlayer में धीरे-धीरे माइग्रेट कर सकता हूँ?">

हाँ। पहले कम्पैट एडेप्टर स्थापित करें (स्टेप 17): आपके कंपोनेंट्स `useTranslations` को कॉल करना जारी रखते हैं, जो अब Intlayer द्वारा समर्थित है। फिर कंपोनेंट्स को एक-एक करके `useIntlayer` में ले जाएं, और सामग्री को उनके बगल में घोषित करें। [कम्पैट एडेप्टर](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/compat/index.md) और [Intlayer TanStack Start गाइड](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_with_tanstack.md) देखें।

</Question>

</FAQ>
