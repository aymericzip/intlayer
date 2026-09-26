---
createdAt: 2026-09-13
updatedAt: 2026-09-22
priority: 8
title: "next-intl vs @intlayer/next-intl: समान API, विभिन्न Bundle"
description: जब एक Next.js ऐप्लिकेशन के next-intl imports को @intlayer/next-intl compat adapter द्वारा परोसा जाता है तो क्या बदलता है। Bundle size, leakage, component size और hydration को समान कोड पर मापा गया है, साथ ही adapter क्या रखता है, अनदेखा करता है और क्या प्रतिस्थापित नहीं कर सकता है।
keywords:
  - next-intl
  - use-intl
  - "@intlayer/next-intl"
  - Intlayer
  - Compat adapter
  - Migration
  - Internationalization
  - i18n
  - Benchmark
  - Bundle size
  - Blog
  - Next.js
  - TanStack Start
  - React
slugs:
  - blog
  - next-intl-vs-intlayer-next-intl
author: aymericzip
---

# next-intl VS @intlayer/next-intl | समान API, विभिन्न Bundle

![next-intl VS Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/assets/i18next-next-intl-intlayer.webp?raw=true)

`@intlayer/next-intl` एक compat adapter है: यह `next-intl` API (`useTranslations`, `getTranslations`, `useLocale`, `t.rich()`, ICU plurals, `NextIntlClientProvider`...) को expose करता है और इसे Intlayer द्वारा compiled dictionaries से serve करता है। application code नहीं बदलता है। bundle बदलता है।

यह article दोनों की तुलना एक ही Next.js application पर करता है, जो एक बार `next-intl` के साथ और एक बार adapter के साथ built है। नंबर [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom) से आते हैं, एक open-source suite जो record करता है कि browser actually क्या download करता है। अगर आप `next-intl` vs Intlayer की तुलना libraries के रूप में चाहते हैं, तो [next-intl vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/hi/next-intl_vs_intlayer.md) पढ़ें। यह एक इस बारे में है कि adapter क्या बदलता है जब आप अपने components को जैसे हैं वैसे ही रखते हैं।

<TOC/>

> **tl;dr**: एक ही Next.js ऐप्लिकेशन पर, `next-intl` को `@intlayer/next-intl` से बदलने से प्रति-पृष्ठ JavaScript **153.6 KB से 147.5 KB** gzip तक कम हो गया, औसत कंपोनेंट **21.8 KB से 8.1 KB** तक, विदेशी-पृष्ठ स्ट्रिंग लीकेज **~90% से 0%** तक, और हाइड्रेशन **14.7 ms से 12.8 ms** तक, बिना किसी कंपोनेंट को संपादित किए। TanStack Start पर, `use-intl` समकक्ष (`@intlayer/use-intl`) कंपोनेंट्स को **76-87 KB से 9-11 KB** तक और लोकेल स्विचिंग को **7-21 ms से 4-9 ms** तक कम कर देता है। एडेप्टर runtime के लिए **8.0 KB** की लागत लेता है जबकि `next-intl` **14.7 KB** और native `next-intlayer` **5.5 KB** की लागत लेते हैं। Navigation और middleware को Intlayer की routing config पर पुनः लागू किया गया है; localized `pathnames` एकमात्र सुविधा है जो स्थानांतरित नहीं की गई है।

## `@intlayer/next-intl` क्या है

`next-intl` एक runtime है: `getRequestConfig` प्रति request `messages/{locale}.json` को load करता है, `NextIntlClientProvider` इसे client को भेजता है, और `useTranslations("about")` render time पर उस object से keys को read करता है। हर optimization (namespaces, `pick(messages, [...])` per page, lazy loading) आपको लिखना होता है।

`@intlayer/next-intl` उस chain के पहले और आखिरी हिस्से को रखता है और बीच वाले को replace करता है। आपके components अभी भी `useTranslations("about")` को call करते हैं; जो वे receive करते हैं वह एक Intlayer dictionary से आता है जो build time पर compile होता है, उस component के लिए scoped होता है, केवल active locale में।

तीन mechanisms इसे काम करते हैं:

1. **Import aliasing.** `createNextIntlPlugin()` from `@intlayer/next-intl/plugin` `withIntlayer` को wrap करता है और Webpack / Turbopack aliases जोड़ता है ताकि `next-intl`, `next-intl/server`, `next-intl/navigation` और `next-intl/middleware` `@intlayer/next-intl` को resolve करें। आपके codebase में कोई भी import rename नहीं है।
2. **JSON as source of truth.** `syncJSON` plugin आपके existing `messages/{locale}.json` को पढ़ता है, इसकी top-level keys को one dictionary per namespace में split करता है, और जब CLI या CMS उन्हें update करते हैं तो translations को same files में वापस लिखता है। आपके translators का workflow untouched रहता है।
3. **कॉल-साइट बाइंडिंग।** Intlayer optimize pass (Babel या SWC) `useTranslations("about")` को एक कॉल में फिर से लिखता है जो `about` dictionary को सीधे प्राप्त करता है। कंपोनेंट अब global message tree तक नहीं पहुँचता; यह अपनी खुद की content तक पहुँचता है।

```tsx fileName="app/[locale]/about/page.tsx"
// आपका कोड, अपरिवर्तित
import { useTranslations } from "next-intl";

const AboutPage = () => {
  const t = useTranslations("about");
  return <h1>{t("title")}</h1>;
};
```

```tsx fileName="कंपाइलर क्या emit करता है (सरलीकृत)"
import _dicHash_about from "../.intlayer/dictionaries/about.mjs";
import { useDictionary as useTranslations } from "@intlayer/next-intl";

const AboutPage = () => {
  const t = useTranslations(_dicHash_about);
  return <h1>{t("title")}</h1>;
};
```

वह रीराइट ही है जिससे नीचे दिए गए component-size और page-leakage कॉलम आगे बढ़ते हैं: एक पेज केवल उन components के dictionaries को pull करता है जो वह render करता है, और केवल उस locale में जो serve किया जा रहा है।

## adapter क्या रखता है, क्या नजरअंदाज करता है, और क्या replace नहीं करता

| `next-intl` API                                                      | `@intlayer/next-intl` के साथ                                                                                                                   |
| -------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| `useTranslations("ns")` / `getTranslations("ns")`                    | ✅ Kept। Build time पर `ns` dictionary से bound। Keys आपके content के विरुद्ध typed हैं।                                                       |
| `getTranslations({ locale, namespace })`                             | ✅ रखा गया                                                                                                                                     |
| `t("key", { name })`, `t.rich()`, `t.markup()`, `t.raw()`            | ✅ रखा गया। ICU plurals, `select`, `selectordinal`, `#`, `{ts, date, long}` Intlayer के ICU resolver के माध्यम से चलते हैं                     |
| `useLocale()` / `getLocale()` / `setRequestLocale()` / `setLocale`   | ✅ रखा गया                                                                                                                                     |
| `useFormatter()`                                                     | ✅ रखा गया। `dateTime`, `number`, `relativeTime`, `list`, `dateTimeRange` native `Intl` को bridge करते हैं                                     |
| `NextIntlClientProvider`                                             | ✅ रखा गया। `messages`, `timeZone` और `now` props **स्वीकार किए जाते हैं लेकिन अनदेखा किए जाते हैं** (एक dev warning आपको बताता है)            |
| `getMessages()`                                                      | ✅ संगतता के लिए रखा गया; अब आवश्यक नहीं है                                                                                                    |
| `getRequestConfig()` in `src/i18n.ts`                                | ⚠️ आवश्यक नहीं। Dictionaries build time पर संकलित होते हैं; कोई per-request message loading नहीं है                                            |
| `defineRouting()`                                                    | ✅ रखा गया। छोड़े गए fields (`locales`, `defaultLocale`, `localePrefix`) `intlayer.config.ts` से पढ़े जाते हैं                                 |
| `createNavigation()`, `Link`, `redirect`, `usePathname`, `useRouter` | ✅ रखा गया। Intlayer की routing कॉन्फ़िगरेशन पर फिर से लागू किया गया; `routing` argument स्वीकार किया जाता है लेकिन अनदेखा किया जाता है        |
| `pathnames` (स्थानीयकृत मार्ग नाम)                                   | ❌ टाइपिंग के लिए स्वीकार किया जाता है, **interpolated नहीं**। सादे pathnames रखें या उस mapping को Intlayer के `rewrite` में स्थानांतरित करें |
| `createMiddleware()`                                                 | ✅ रखा गया। Intlayer के proxy को return करता है; `NEXT_LOCALE` कुकी सेट करता है ताकि `useLocale()` और आपका switcher काम करता रहे               |
| `NEXT_LOCALE` कुकी                                                   | ✅ डिफ़ॉल्ट रूप से पढ़ा जाता है (जब तक आप `routing.storage` को स्वयं कॉन्फ़िगर न करें)                                                         |
| बिना namespace के Bare `useTranslations()`                           | ⚠️ काम करता है, लेकिन call site bound नहीं है: यह runtime registry के माध्यम से resolve होता है। bundle gains के लिए एक namespace pass करें    |

## The benchmark

### क्या मापा गया था

[Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom) suite **एक ही application** को प्रत्येक setup के साथ बनाता है: **10 pages** (home, about, blog, careers, contact, FAQ, pricing, products, settings, team), **10 locales** (`en`, `fr`, `es`, `de`, `it`, `pt`, `zh`, `ja`, `ko`, `ru`), समान components और समान content। Pages को `en` और `fr` में मापा जाता है।

`next-intl` को चार loading strategies के साथ बनाया गया था, naive setup (`messages/{locale}.json` पूरे को लोड किया गया) से optimal one (एक namespace प्रति route + प्रति-page `pick()`)। adapter को **naive setup के समान components** पर बनाया गया था, केवल `next.config.ts` और `intlayer.config.ts` बदले गए। इसका कोई "scoped" variant नहीं है: compiler content को प्रति component scope करता है, इसलिए इसकी `static` और `dynamic` rows पहले से ही scoped हैं।

प्रत्येक build के लिए, suite निम्नलिखित को record करता है:

- **Lib size**: एक खाली component का gzip size जो केवल i18n library को import करता है। runtime की fixed cost।
- **Page JS**: प्रति page downloaded gzip JavaScript, सभी pages और locales में averaged।
- **Locale leak %**: डाउनलोड की गई JS में मिलीं अनुवादित स्ट्रिंग्स का हिस्सा जो एक locale की हैं जिसे उपयोगकर्ता **नहीं** देख रहा है।
- **Page leak %**: डाउनलोड की गई JS में मिलीं अनुवादित स्ट्रिंग्स का हिस्सा जो एक page की हैं जिस पर उपयोगकर्ता **नहीं** है।
- **Component avg**: अलगाव में compiled प्रत्येक component का औसत gzip size। दिखाता है कि एक single component i18n runtime और catalog में कितना खींचता है।
- **E2E reactivity**: नया locale चुनने और DOM में `html[lang]` अपडेट होने के बीच wall-clock समय (Playwright, 5 iterations)।
- **Hydration**: React hydration phase की अवधि।

> नीचे दिए गए नंबर **2026-09-12** को चलाए गए से हैं जिसमें `next-intl` / `use-intl` 4.14.2 और `@intlayer/*` 9.5.1 के साथ हैं। टेस्ट एप्लिकेशन जानबूझकर छोटा है (प्रति locale कुछ दर्जन strings), इसलिए leakage प्रतिशत एक **pattern** का वर्णन करते हैं: वे आपकी content के साथ बढ़ते हैं जबकि runtime cost fixed रहती है।

### Next.js पर परिणाम

उन मेट्रिक्स और लाइब्रेरीज़ को चुनें जिनकी आपको परवाह है:

<I18nBenchmark framework="nextjs" vertical/>

| Setup                     | Strategy       | Lib size (gz) | Page JS avg (gz) | Locale leak | Page leak | Component avg (gz) | E2E reactivity |   Hydration |
| ------------------------- | -------------- | ------------: | ---------------: | ----------: | --------: | -----------------: | -------------: | ----------: |
| **base** (no i18n)        | -              |        0.0 KB |         141.0 KB |        0.0% |      0.0% |             0.9 KB |        13.4 ms |     11.8 ms |
| `next-intl`               | static         |       14.7 KB |         153.6 KB |        4.2% |     89.8% |            21.8 KB |        16.0 ms |     14.7 ms |
| `next-intl`               | dynamic        |       14.7 KB |         153.6 KB |        9.7% |     89.9% |            21.8 KB |        15.6 ms |     14.8 ms |
| `next-intl`               | scoped-static  |       14.7 KB |         153.6 KB |        0.0% |      0.0% |            80.1 KB |        17.9 ms |     17.4 ms |
| `next-intl`               | scoped-dynamic |       14.7 KB |         153.6 KB |        0.0% |      0.0% |            22.9 KB |        17.8 ms |     16.8 ms |
| **`@intlayer/next-intl`** | static         |    **8.0 KB** |     **147.5 KB** |    **0.0%** |  **0.0%** |         **8.1 KB** |    **14.5 ms** | **12.8 ms** |
| **`@intlayer/next-intl`** | dynamic        |    **8.0 KB** |     **148.7 KB** |    **0.0%** |  **0.0%** |         **8.1 KB** |    **11.7 ms** | **12.8 ms** |
| `next-intlayer` (native)  | static         |        5.5 KB |         141.3 KB |        0.0% |      0.0% |             8.5 KB |        15.5 ms |     16.9 ms |
| `next-intlayer` (native)  | dynamic        |        5.5 KB |         141.3 KB |        0.0% |      0.0% |             6.9 KB |        15.3 ms |     15.9 ms |

**इसे कैसे पढ़ें**

- **समान components, प्रति पृष्ठ 6 KB कम।** adapter build की naive app **147.5 KB** पर उतरती है, fully optimized one सहित हर `next-intl` configuration के तहत (153.6 KB)। runtime स्वयं अंतर है: 8.0 KB बनाम 14.7 KB, हर पृष्ठ पर भुगतान किया गया।
- **बिना किसी component को छुए leakage 0% हो जाता है।** naive `next-intl` setup हर page पर ~90% विदेशी-page strings भेजता है। `next-intl` के साथ 0% तक पहुंचने का मतलब है `scoped-*` setups: एक namespace प्रति route, और प्रत्येक page में `pick(messages, [...])` का उपयोग करना। adapter naive code से 0% तक पहुंचता है क्योंकि optimize pass प्रत्येक `useTranslations("ns")` को अपने dictionary से bind करता है।
- **Components 2.7x सिकुड़ते हैं।** isolation में compile किया गया एक component `next-intl` के साथ औसतन **21.8 KB** और adapter के साथ **8.1 KB** होता है। `next-intl` के `scoped-static` setup में वह संख्या _बढ़कर_ 80 KB हो जाती है, क्योंकि हर route की namespace file उस page से reachable हो जाती है जो इसे pick करता है।
- **Hydration 2 ms तेज़ है** (12.8 vs 14.7 ms): RSC payload से React hydrate कर सकने से पहले deserialize करने के लिए कोई message object नहीं है।
- **Adapter native runtime नहीं है।** `next-intlayer` **141.3 KB** पर बैठता है, base app के ऊपर +0.3 KB, एक 5.5 KB runtime के साथ। Adapter `next-intl` API surface (`useFormatter`, `t.rich`, ICU resolver) को Intlayer के core के शीर्ष पर ले जाता है, इसलिए 8.0 KB और page प्रति +6 KB। यह bridge है, destination नहीं।

<ClickToOpenIframe
src="https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-nextjs.md"
width="100%"
height="600px"
style="border:none;"
/>

> [Next.js बेंचमार्क रिपोर्ट](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/benchmark/nextjs.md) में पूरी तालिका, प्रत्येक लाइब्रेरी और प्रत्येक रणनीति देखें।

### TanStack Start पर परिणाम (`use-intl`)

`use-intl` `next-intl` का framework-agnostic core है। इसका adapter, `@intlayer/use-intl`, एक Vite plugin (`@intlayer/use-intl/plugin`) के साथ एक ही design का पालन करता है।

| सेटअप                    | रणनीति         | लाइब साइज (gz) | पेज JS औसत (gz) | लोकेल लीक |  पेज लीक | घटक औसत (gz) | E2E प्रतिक्रियाशीलता |   हाइड्रेशन |
| ------------------------ | -------------- | -------------: | --------------: | --------: | -------: | -----------: | -------------------: | ----------: |
| **base** (कोई i18n नहीं) | -              |         0.0 KB |        111.0 KB |      0.0% |     0.0% |       0.7 KB |               8.1 ms |     21.6 ms |
| `use-intl`               | static         |        14.1 KB |        179.8 KB |     50.0% |    89.8% |      76.0 KB |               6.7 ms |     15.3 ms |
| `use-intl`               | dynamic        |        14.1 KB |        119.4 KB |      0.0% |    89.8% |      75.9 KB |               7.0 ms |     15.4 ms |
| `use-intl`               | scoped-static  |        14.1 KB |        128.7 KB |      0.0% |     0.0% |      87.1 KB |              20.9 ms |     24.8 ms |
| `use-intl`               | scoped-dynamic |        14.1 KB |        128.7 KB |      0.0% |     0.0% |      87.1 KB |              13.3 ms |     25.9 ms |
| **`@intlayer/use-intl`** | static         |     **7.3 KB** |        135.8 KB |     49.7% | **0.0%** |  **10.9 KB** |           **4.2 ms** | **10.5 ms** |
| **`@intlayer/use-intl`** | dynamic        |     **7.3 KB** |    **129.7 KB** |  **0.0%** | **0.0%** |   **9.3 KB** |           **8.7 ms** |     16.1 ms |
| `intlayer` (native)      | static         |         5.0 KB |        125.8 KB |     50.0% |     0.0% |       8.1 KB |               3.2 ms |     11.5 ms |
| `intlayer` (native)      | dynamic        |         5.0 KB |        118.6 KB |      0.0% |     0.0% |       6.3 KB |               3.6 ms |     14.1 ms |

**इसे कैसे पढ़ें**

- **प्रति-पृष्ठ बाइट्स अनुकूलित `use-intl` के विरुद्ध समान हैं।** `dynamic` मोड में `@intlayer/use-intl` (129.7 KB) `use-intl` के `scoped-dynamic` (128.7 KB) के भीतर है, और `use-intl` के सादे `dynamic` (119.4 KB) से 10 KB _ऊपर_ है। वह सादा `dynamic` पंक्ति अभी भी विदेशी-पृष्ठ स्ट्रिंग्स का 90% लीक करती है; बाइट गणना कम है क्योंकि परीक्षण ऐप्लिकेशन की सामग्री छोटी है। एडेप्टर का 0% वह है जो सामग्री बढ़ने के साथ सपाट रहता है।
- **Components 7-9 गुना छोटे हैं।** `use-intl` components औसतन **76-87 KB** हर strategy में हैं, क्योंकि `useTranslations` provider के पूरे message object से bound है। Adapter औसतन **9-11 KB** है।
- **Locale switching तेजी है।** Optimized `use-intl` setups को `html[lang]` अपडेट करने में **13-21 ms** लगते हैं; adapter को **4-9 ms** लगते हैं। कम components re-render होते हैं, और कुछ भी message tree से re-picked नहीं होता है।
- **`static` हर locale रखता है।** Adapter की `static` row 49.7% locale leakage दिखाती है, native Intlayer के `static` mode के समान: सभी locales bundled हैं, केवल page के dictionaries हैं। Config की एक line (`importMode: 'dynamic'`) इसे हटा देती है।

<ClickToOpenIframe
src="https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-tanstack.md"
width="100%"
height="600px"
style="border:none;"
/>

> [TanStack Start बेंचमार्क रिपोर्ट](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/benchmark/tanstack.md) में पूरी तालिका देखें।

## संख्याएं क्यों बदलती हैं

![The Intlayer compiler extracts content from components](https://github.com/aymericzip/intlayer/blob/main/docs/assets/compiler.webp?raw=true)

Component में कुछ नहीं बदला, इसलिए gains पूरी तरह से इस बात से आते हैं कि `useTranslations` किस चीज से bound है।

**`next-intl` के साथ**, binding provider है। `NextIntlClientProvider` पूरे locale के लिए संपूर्ण `messages` object प्राप्त करता है; हर `useTranslations("about")` इससे पढ़ता है। Bundler एक component को देखता है जो एक hook import करता है जो एक context पढ़ता है, और यह नहीं जान सकता कि केवल `about` branch का उपयोग किया जा रहा है। नीचे दिए गए routes सभी एक ही message object को साझा करते हैं, इसलिए page-leak column तब तक ~90% पढ़ता है जब तक आप स्वयं file को split न करें, और अपव्यय एक साथ दो अक्षों, पृष्ठों और भाषाओं पर बढ़ता है:

![Theoretical content leakage by architecture](https://github.com/aymericzip/intlayer/blob/main/docs/assets/theorical_content_leakage.webp?raw=true)

```bash
.
├── messages
│   ├── en.json                       # हर namespace, हर page
│   └── fr.json
└── src
    ├── i18n.ts                       # getRequestConfig({ messages: await import(...) })
    ├── middleware.ts                 # createMiddleware(routing)
    └── app/[locale]
        ├── layout.tsx                # <NextIntlClientProvider messages={messages}>
        └── about/page.tsx            # useTranslations("about")
```

**`@intlayer/next-intl` के साथ**, बाइंडिंग dictionary है। `syncJSON` `messages/en.json` को एक dictionary में बदल देता है top-level key के लिए; compiler resolve करता है कि कौन सा component `useTranslations("about")` को कॉल करता है और इसे `about` directly देता है, active locale में, एक import के रूप में जिसे bundler trace कर सकता है और split कर सकता है।

```bash
.
├── intlayer.config.ts                # syncJSON({ source: ({ locale }) => `./messages/${locale}.json` })
├── messages
│   ├── en.json                       # unchanged, still the source of truth
│   └── fr.json
├── .intlayer/                        # generated: one dictionary per namespace, per locale
└── src
    ├── middleware.ts                 # createMiddleware() अब Intlayer के proxy को return करता है
    └── app/[locale]
        ├── layout.tsx                # <NextIntlClientProvider> (कोई messages prop नहीं)
        └── about/page.tsx            # useTranslations("about")  ← अपरिवर्तित
```

`src/i18n.ts` और `messages` prop हट जाते हैं। बाकी सब कुछ समान है।

## तीन चरणों में Migration

<Steps>
<Step number={1} title="Install करें">

```bash packageManager="npm"
npx intlayer init --interactive
```

```bash packageManager="pnpm"
pnpm dlx intlayer init --interactive
```

```bash packageManager="yarn"
yarn dlx intlayer init --interactive
```

```bash packageManager="bun"
bunx intlayer init --interactive
```

यह कमांड `next-intl` का पता लगाता है और `intlayer`, `next-intlayer`, `@intlayer/next-intl` और `@intlayer/sync-json-plugin` को install करता है। `next-intl` को installed रखें: यह adapter का एक peer dependency है और types प्रदान करता है।

</Step>
<Step number={2} title="Intlayer को अपने messages की ओर निर्देशित करें">

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  dictionary: {
    // "static" सभी locales को bundle करता है; "dynamic" सक्रिय को demand पर load करता है
    importMode: "dynamic",
  },
  plugins: [
    syncJSON({
      // ICU placeholders: {name}, {count, plural, one {# item} other {# items}}
      format: "icu",
      source: ({ locale }) => `./messages/${locale}.json`,
      location: "messages",
    }),
  ],
};

export default config;
```

`messages/{locale}.json` अपनी जगह पर रहता है। प्रत्येक top-level key एक dictionary बन जाती है; `useTranslations("about")` `about` dictionary से मैप होता है।

</Step>
<Step number={3} title="next.config.ts को wrap करें">

```ts fileName="next.config.ts"
import type { NextConfig } from "next";
import { createNextIntlPlugin } from "@intlayer/next-intl/plugin";

const withIntlayer = createNextIntlPlugin();

const nextConfig: NextConfig = {};

export default withIntlayer(nextConfig);
```

`createNextIntlPlugin()` `withIntlayer` को compose करता है (content watching, dictionary compilation, the optimize pass) और `next-intl` → `@intlayer/next-intl` aliases को Webpack और Turbopack के लिए। Build करें, और ऊपर दी गई tables में संख्याएं आपकी होंगी।

</Step>
</Steps>

### आप बाद में क्या delete कर सकते हैं

| File / pattern                               | क्यों                                                                                                              |
| -------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `getRequestConfig` in `src/i18n.ts`          | कोई per-request message loading नहीं। File को केवल तभी रखें यदि यह `createNavigation` helpers को भी export करता है |
| `messages={...}` on `NextIntlClientProvider` | adapter compiled output को पढ़ता है; prop को ignore किया जाता है और development में warning log होती है            |
| `await getMessages()` in layouts             | Same reason                                                                                                        |
| Per-page `pick(messages, [...])`             | Compiler per component picking करता है                                                                             |

### What you gain beyond bytes

- **Typed keys.** `useTranslations("about")` compiled `about` dictionary के विरुद्ध typed है। `t("does.not.exist")` एक TypeScript error है, runtime fallback नहीं।
- **`npx intlayer test`** CI विफल करता है जब किसी locale में कोई key गायब हो। **`npx intlayer fill`** अपनी पसंद के provider (OpenAI, Anthropic, Mistral, Gemini...) के साथ अपनी खुद की key का उपयोग करके गायब keys को translate करता है, और परिणाम को `messages/{locale}.json` में वापस लिखता है।
- **Visual Editor और CMS** एक ही dictionaries पर काम करते हैं, इसलिए गैर-डेवलपर्स एक UI के माध्यम से `messages/fr.json` को edit कर सकते हैं और फ़ाइल अपडेट हो जाती है।
- **`.content.ts` में incremental move।** कोई भी component `useTranslations("about")` से `useIntlayer("about")` में switch कर सकता है एक co-located content file के साथ, एक बार में एक। JSON और `.content.ts` dictionaries coexist करते हैं और merge होते हैं।

## शुरुआत करने से पहले जानने योग्य सीमाएं

<AccordionGroup>
<Accordion header="रूटिंग कॉन्फ़िग intlayer.config.ts में जाता है">

`createNavigation(routing)` और `createMiddleware(routing)` अपने सिग्नेचर बनाए रखते हैं लेकिन तर्क को अनदेखा करते हैं: भाषाएँ, डिफ़ॉल्ट भाषा और उपसर्ग रणनीति Intlayer के `routing` कॉन्फ़िग से आती हैं। यदि आप `next-intl` के स्थानीयकृत `pathnames` (`/about` से `/a-propos`) का उपयोग करते हैं, तो एडॉप्टर उन्हें इंटरपोलेट नहीं करता है; Intlayer का `routing.rewrite` उस मामले को कवर करता है लेकिन यह एक अलग बदलाव है।

</Accordion>
<Accordion header="बिना नेमस्पेस वाला useTranslations() बाउंड नहीं है">

ऑप्टिमाइज़ पास को यह जानने के लिए एक स्थिर नेमस्पेस की आवश्यकता होती है कि किस डिक्शनरी को आयात करना है। बिना नेमस्पेस वाला कॉल अभी भी काम करता है, एक रनटाइम रजिस्ट्री के माध्यम से जो प्रत्येक डिक्शनरी को संदर्भित करती है, जो वास्तव में वही रिसाव है जिसे आप हटाने की कोशिश कर रहे थे। नेमस्पेस पास करें।

</Accordion>
<Accordion header="एडॉप्टर मुफ़्त नहीं है">

`next-intlayer` के 5.5 KB के मुकाबले 8.0 KB का रनटाइम, और नेटिव बिल्ड पर प्रति पृष्ठ +6-7 KB। यह `next-intl` API सतह की कीमत चुकाता है। यदि आप उस बिंदु पर पहुँचते हैं जहाँ प्रत्येक घटक को `useIntlayer` में स्थानांतरित कर दिया गया है, तो एडॉप्टर को हटा दें।

</Accordion>
<Accordion header="प्रदाता पर messages, timeZone और now को अनदेखा किया जाता है">

फॉर्मेटर्स नेटिव `Intl` द्वारा समर्थित हैं और केवल भाषा उनके आउटपुट को प्रभावित करती है। यदि आप हाइड्रेशन-स्थिर तिथियों के लिए मजबूर समय क्षेत्र या एक निश्चित `now` पर भरोसा करते हैं, तो इसे कॉल साइट पर संभालें। [दिनांक, समय और संख्या स्वरूपण](https://github.com/aymericzip/intlayer/blob/main/docs/blog/hi/date_time_number_formatting_locales.md) देखें।

</Accordion>
</AccordionGroup>

## कौन सा उपयोग करें?

<AccordionGroup>
<Accordion header="next-intl पर बने रहें">

यदि आपका ऐप छोटा है, आपका बंडल चिंता का विषय नहीं है, और आपकी टीम प्रति पृष्ठ नेमस्पेस और `pick()` का प्रबंधन करने में सहज है।

</Accordion>
<Accordion header="@intlayer/next-intl का उपयोग करें">

यदि आप आज `next-intl` पर हैं और बिना दोबारा लिखे बंडल, रिसाव और हाइड्रेशन लाभ, टाइप की गई कुंजियाँ और CLI / CMS टूल चाहते हैं। यह किसी भी मौजूदा `next-intl` कोडबेस के लिए अनुशंसित प्रवेश बिंदु है।

</Accordion>
<Accordion header="नेटिव (next-intlayer) पर जाएँ">

नई परियोजनाओं के लिए, या एक बार एडॉप्टर द्वारा अपना काम पूरा कर लेने के बाद। यह तीनों में सबसे हल्का है (5.5 KB, +0.3 KB प्रति पृष्ठ) और सिंक्रोनस सर्वर घटकों, प्रति-घटक `.content.ts` फाइलों और पूर्ण फीचर सेट को अनलॉक करता है। [Next.js के साथ Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_with_nextjs_16.md) से शुरुआत करें।

</Accordion>
</AccordionGroup>

## FAQ

<FAQ>

<Question title="क्या मेरा एप्लिकेशन कोड वास्तव में अछूता रहता है?">

Next.js पर, घटकों के लिए हाँ: बेंचमार्क बिल्ड ने केवल `next.config.ts` और `intlayer.config.ts` को बदला। `src/i18n.ts` में `getRequestConfig`, प्रदाता पर `messages` प्रॉप और प्रति-पृष्ठ `pick()` कॉल डेड कोड बन जाते हैं जिन्हें आप बाद में हटा सकते हैं।

</Question>

<Question title="ICU संदेशों का क्या होता है?">

वे काम करते रहते हैं। `t("key", { count })`, `t.rich()`, `t.markup()`, `select`, `selectordinal`, `#` और `{ts, date, long}` Intlayer के ICU रिज़ॉल्वर द्वारा हल किए जाते हैं। [ICU संदेश प्रारूप](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en/icu_message_format.md) देखें।

</Question>

<Question title="एडॉप्टर नेटिव next-intlayer से भारी क्यों है?">

यह Intlayer के कोर के ऊपर `next-intl` API सतह को ले जाता है: `useFormatter`, `t.rich`, ICU रिज़ॉल्वर, नेविगेशन हेल्पर्स। यह 5.5 KB के मुकाबले 8.0 KB है, और प्रति पृष्ठ +6 KB है। यह एक पुल है, गंतव्य नहीं।

</Question>

<Question title="क्या मैं घटक दर घटक माइग्रेट कर सकता हूँ?">

हाँ। कोई भी घटक सह-स्थित `.content.ts` के साथ `useTranslations("about")` से `useIntlayer("about")` पर स्विच कर सकता है। JSON और `.content.ts` डिक्शनरी सह-अस्तित्व में रहती हैं और विलीन हो जाती हैं।

</Question>

<Question title="क्या स्थानीयकृत पाथनेम काम करते हैं?">

`next-intl` के `pathnames` के माध्यम से नहीं: एडॉप्टर टाइपिंग के लिए इसे स्वीकार करता है लेकिन इसे इंटरपोलेट नहीं करता है। इसके बजाय Intlayer के `routing.rewrite` का उपयोग करें।

</Question>

</FAQ>

## संबंधित तुलनाएं

समान एडॉप्टर श्रृंखला:

- [i18next vs @intlayer/i18next](https://github.com/aymericzip/intlayer/blob/main/docs/blog/hi/i18next_vs_intlayer-i18next.md)
- [Lingui vs @intlayer/lingui](https://github.com/aymericzip/intlayer/blob/main/docs/blog/hi/lingui_vs_intlayer-lingui.md)
- [vue-i18n vs @intlayer/vue-i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/hi/vue-i18n_vs_intlayer-vue-i18n.md)

लाइब्रेरीज़ की आमने-सामने तुलना:

- [next-intl vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/hi/next-intl_vs_intlayer.md), समान बेंचमार्क
- [next-i18next vs next-intl vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/hi/next-i18next_vs_next-intl_vs_intlayer.md)
- [Is next-intl outdated?](https://github.com/aymericzip/intlayer/blob/main/docs/blog/hi/is_next-intl_outdated.md)

संदर्भ दस्तावेज़:

- [Compat adapter: next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/compat/next-intl.md)
- [माइग्रेशन गाइड: next-intl से Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/migration_from_next-intl_to_intlayer.md)
- [Next.js बेंचमार्क रिपोर्ट](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/benchmark/nextjs.md) और [TanStack Start बेंचमार्क रिपोर्ट](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/benchmark/tanstack.md)
- [बंडल अनुकूलन](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/bundle_optimization.md) और [Intlayer कंपाइलर](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/compiler.md)
- [विजुअल एडिटर](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_visual_editor.md), [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_CMS.md) और [AI अनुवाद](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/autoFill.md)

## निष्कर्ष

`@intlayer/next-intl` एक काम करता है: यह `useTranslations` को एक provider से बांधता है जो हर संदेश को रखता है, एक dictionary के लिए जो उस component के लिए संकलित है। एक ही Next.js ऐप पर जो **प्रति पृष्ठ 6 KB** के लायक है, **2.7x छोटे components**, **0% leakage** और **2 ms of hydration**, इससे पहले कि कोई component फ़ाइल खोले। Navigation और middleware अपना API Intlayer के routing config के शीर्ष पर रखते हैं, और native `next-intlayer` runtime अभी भी हल्का रहता है।

सभी raw data, test apps और scripts [Benchmark Bloom repository](https://github.com/intlayer-org/benchmark-bloom) में हैं। इसे स्वयं चलाएं।

अधिक विवरण के लिए ['Why Intlayer?' doc](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/interest_of_intlayer.md) देखें।
