---
createdAt: 2026-09-13
updatedAt: 2026-09-13
title: "vue-i18n बनाम Intlayer: 2026 बेंचमार्क"
description: एक ही Vite + Vue 3 ऐप पर vue-i18n और Intlayer को मापा गया। लाइब्रेरी का आकार, प्रति पेज JavaScript, कंटेंट लीकेज, कंपोनेंट का आकार और लोकेल-स्विच रिएक्टिविटी, संख्याओं की व्याख्या के साथ।
keywords:
  - vue-i18n
  - Intlayer
  - Internationalization
  - i18n
  - Benchmark
  - Bundle size
  - Blog
  - Vue
  - Nuxt
  - Vite
  - JavaScript
slugs:
  - blog
  - vue-i18n-vs-intlayer-benchmark
author: aymericzip
---

# vue-i18n VS Intlayer | Vue अंतर्राष्ट्रीयकरण (i18n) बेंचमार्क

`vue-i18n` Vue के लिए संदर्भ i18n लाइब्रेरी है। Intlayer एक कंपाइलर-आधारित, कंपोनेंट-स्कोप्ड विकल्प है जिसमें Vue इंटीग्रेशन (`vue-intlayer`) है। हम पहले ही उनकी [फीचर्स और डेवलपर अनुभव](https://github.com/aymericzip/intlayer/blob/main/docs/blog/hi/vue-i18n_vs_intlayer.md) की तुलना कर चुके हैं। यह लेख देखता है कि ऐप बिल्ड होने के बाद हर एक की लागत क्या है।

डेटा [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom) से आता है, जो एक ओपन-सोर्स सूट है जो हर लाइब्रेरी के साथ एक ही एप्लिकेशन बनाता है और रिकॉर्ड करता है कि ब्राउज़र वास्तव में क्या डाउनलोड और निष्पादित करता है।

<TOC/>

> **tl;dr**: एक ही Vite + Vue 3 ऐप पर, `vue-i18n` प्रति पेज **134.9 KB** gzip किया हुआ JavaScript भेजता है जबकि बिना i18n वाले ऐप के लिए यह **41.3 KB** है। Intlayer **57.1 KB** भेजता है। अकेले `vue-i18n` रनटाइम का वज़न **24.3 KB gzip** है (Intlayer के 3.9 KB का 6 गुना), हर पेज **दूसरे पेजों की 90% स्ट्रिंग्स** ढोता है, और अलग से कंपाइल किया गया एक कंपोनेंट **196 KB** खींच लाता है क्योंकि यह ग्लोबल मैसेज ट्री से बंधा है। `@intlayer/vue-i18n` एडाप्टर `vue-i18n` API बनाए रखता है और प्रति पेज **47.0 KB** मापा गया।

## संक्षेप में

- **vue-i18n** - Vue 2 / Vue 3 के लिए वास्तविक मानक i18n लाइब्रेरी और `@nuxtjs/i18n` का कोर। ICU-शैली के मैसेज, SFC `<i18n>` ब्लॉक, `v-t` डायरेक्टिव, `d()` / `n()` फ़ॉर्मेटर, बड़ा इकोसिस्टम। मैसेज `createI18n()` पर एक ग्लोबल इंस्टेंस में रजिस्टर होते हैं; प्रति लोकेल lazy loading एक मैन्युअल `setLocaleMessage()` पैटर्न है, और प्रति-रूट विभाजन आपको खुद बनाना होता है।
- **Intlayer** - कंपोनेंट-केंद्रित कंटेंट मॉडल। `.content.ts` डिक्शनरी उस कंपोनेंट के बगल में रहती हैं जिसकी वे सेवा करती हैं, एक बिल्ड-टाइम कंपाइलर (`vite-intlayer`) उन्हें प्रति कंपोनेंट और प्रति लोकेल tree-shake और lazy-load करता है, आपके कंटेंट से सख्त TypeScript टाइप जेनरेट होते हैं, और गायब अनुवाद बिल्ड टाइम पर फेल होते हैं। राउटर / SEO हेल्पर, Visual Editor / CMS और AI-सहायता प्राप्त अनुवाद के साथ आता है।

| लाइब्रेरी             | GitHub Stars                                                                                                                                                                   | कुल कमिट                                                                                                                                                                           | अंतिम कमिट                                                                                                                                          | पहला संस्करण | NPM संस्करण                                                                                                 | NPM डाउनलोड                                                                                                            |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ | ----------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `aymericzip/intlayer` | [![GitHub Repo stars](https://img.shields.io/github/stars/aymericzip/intlayer?style=for-the-badge&label=%E2%AD%90%20stars)](https://github.com/aymericzip/intlayer/stargazers) | [![GitHub commit activity](https://img.shields.io/github/commit-activity/t/aymericzip/intlayer?style=for-the-badge&label=commits)](https://github.com/aymericzip/intlayer/commits) | [![Last Commit](https://img.shields.io/github/last-commit/aymericzip/intlayer?style=for-the-badge)](https://github.com/aymericzip/intlayer/commits) | अप्रैल 2024  | [![npm](https://img.shields.io/npm/v/intlayer?style=for-the-badge)](https://www.npmjs.com/package/intlayer) | [![npm downloads](https://img.shields.io/npm/dm/intlayer?style=for-the-badge)](https://www.npmjs.com/package/intlayer) |
| `intlify/vue-i18n`    | [![GitHub Repo stars](https://img.shields.io/github/stars/intlify/vue-i18n?style=for-the-badge&label=%E2%AD%90%20stars)](https://github.com/intlify/vue-i18n/stargazers)       | [![GitHub commit activity](https://img.shields.io/github/commit-activity/t/intlify/vue-i18n?style=for-the-badge&label=commits)](https://github.com/intlify/vue-i18n/commits)       | [![Last Commit](https://img.shields.io/github/last-commit/intlify/vue-i18n?style=for-the-badge)](https://github.com/intlify/vue-i18n/commits)       | दिसंबर 2016  | [![npm](https://img.shields.io/npm/v/vue-i18n?style=for-the-badge)](https://www.npmjs.com/package/vue-i18n) | [![npm downloads](https://img.shields.io/npm/dm/vue-i18n?style=for-the-badge)](https://www.npmjs.com/package/vue-i18n) |

> बैज स्वचालित रूप से अपडेट होते हैं। स्नैपशॉट समय के साथ बदलते रहेंगे।

## फीचर्स की आमने-सामने तुलना

| फीचर                                                | `vue-intlayer` (Intlayer)                                 | `vue-i18n`                                                                |
| --------------------------------------------------- | --------------------------------------------------------- | ------------------------------------------------------------------------- |
| **कंपोनेंट के पास अनुवाद**                          | ✅ हाँ, `.content.ts` हर कंपोनेंट के साथ रखा जाता है      | ✅ SFC `<i18n>` ब्लॉक के ज़रिए (वैकल्पिक); ग्लोबल कैटलॉग आम सेटअप है      |
| **TypeScript इंटीग्रेशन**                           | ✅ कंटेंट से स्वतः जेनरेट किए गए सख्त टाइप                | ✅ अच्छी टाइपिंग; सख्त key सुरक्षा के लिए स्कीमा टाइपिंग और अनुशासन चाहिए |
| **गायब अनुवाद का पता लगाना**                        | ✅ TypeScript त्रुटि + बिल्ड-टाइम त्रुटि/चेतावनी          | ⚠️ रनटाइम फ़ॉलबैक + कंसोल चेतावनी                                         |
| **रिच कंटेंट (कंपोनेंट / Markdown)**                | ✅ सीधा समर्थन                                            | ⚠️ `<i18n-t>` कंपोनेंट इंटरपोलेशन; Markdown बाहरी प्लगइन के ज़रिए         |
| **ICU समर्थन**                                      | ⚠️ प्रगति पर                                              | ✅ हाँ                                                                    |
| **फ़ॉर्मेटिंग (तारीख, संख्या, मुद्रा)**             | ✅ Intl-आधारित फ़ॉर्मेटर                                  | ✅ `datetimeFormats` / `numberFormats` के साथ `d()` / `n()`               |
| **स्थानीयकृत रूटिंग**                               | ✅ Vue Router / Nuxt के लिए हेल्पर, `getMultilingualUrls` | ⚠️ कोर नहीं (`@nuxtjs/i18n` या कस्टम राउटर सेटअप)                         |
| **SEO हेल्पर (hreflang, sitemap, robots)**          | ✅ बिल्ट-इन हेल्पर                                        | ❌ कोर नहीं                                                               |
| **Tree-shaking (केवल उपयोग किया गया कंटेंट भेजें)** | ✅ प्रति कंपोनेंट, प्रति लोकेल, कंपाइलर द्वारा स्वचालित   | ⚠️ मैन्युअल: कैटलॉग विभाजित करें, प्रति रूट `setLocaleMessage()`          |
| **Lazy loading**                                    | ✅ `importMode: 'dynamic'` (कॉन्फ़िग की एक पंक्ति)        | ✅ मैन्युअल `import()` + `setLocaleMessage()`                             |
| **अप्रयुक्त कंटेंट हटाना**                          | ✅ मृत डिक्शनरी बिल्ड टाइम पर हटा दी जाती हैं             | ❌ बिल्ट-इन नहीं                                                          |
| **गायब अनुवादों का परीक्षण (CLI / CI)**             | ✅ `npx intlayer content test`                            | ⚠️ थर्ड-पार्टी (`vue-i18n-extract`)                                       |
| **AI-संचालित अनुवाद**                               | ✅ बिल्ट-इन, आपकी अपनी प्रोवाइडर keys का उपयोग करता है    | ❌ नहीं                                                                   |
| **Visual Editor / CMS**                             | ✅ मुफ़्त Visual Editor + वैकल्पिक CMS                    | ❌ नहीं (बाहरी लोकलाइज़ेशन प्लेटफ़ॉर्म)                                   |
| **MCP सर्वर और Agent Skills**                       | ✅ हाँ                                                    | ❌ नहीं                                                                   |
| **इकोसिस्टम / समुदाय**                              | ⚠️ छोटा लेकिन तेज़ी से बढ़ रहा है                         | ✅ Vue इकोसिस्टम में बड़ा और परिपक्व                                      |

## बेंचमार्क

### क्या मापा गया

[Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom) सूट हर लाइब्रेरी के साथ **एक ही Vite + Vue 3 एप्लिकेशन** बनाता है: **10 पेज** (home, about, blog, careers, contact, FAQ, pricing, products, settings, team), **10 लोकेल** (`en`, `fr`, `es`, `de`, `it`, `pt`, `zh`, `ja`, `ko`, `ru`), समान कंपोनेंट और समान कंटेंट। पेज `en` और `fr` में मापे जाते हैं।

दोनों लाइब्रेरी **static** कॉन्फ़िगरेशन में परखी गईं, जो अधिकांश Vue प्रोजेक्ट शिप करते हैं: `vue-i18n` के लिए, हर लोकेल का JSON इम्पोर्ट करके `createI18n({ messages })` को दिया गया; Intlayer के लिए, डिफ़ॉल्ट `importMode: 'static'`। इस मोड में Intlayer भी हर लोकेल बंडल करता है, लेकिन कंपाइलर फिर भी कंटेंट को **प्रति कंपोनेंट** स्कोप करता है, इसलिए एक पेज केवल उन कंपोनेंट की डिक्शनरी ढोता है जिन्हें वह रेंडर करता है।

हर बिल्ड के लिए, सूट रिकॉर्ड करता है:

- **Lib size**: एक खाली कंपोनेंट का gzip आकार जो केवल i18n लाइब्रेरी इम्पोर्ट करता है। रनटाइम की निश्चित लागत।
- **Page JS**: प्रति पेज डाउनलोड किया गया gzip JavaScript, सभी पेजों और लोकेल पर औसत।
- **Locale leak %**: डाउनलोड किए गए JS में मिली अनुवादित स्ट्रिंग्स का वह हिस्सा जो ऐसे लोकेल का है जिसे उपयोगकर्ता **नहीं** देख रहा (`en` और `fr` पर फ़िंगरप्रिंट किया गया, इसलिए 50% का मतलब है "दूसरा मापा गया लोकेल पूरी तरह मौजूद है"; 10 लोकेल बंडल होने पर वास्तविक बर्बादी अधिक है)।
- **Page leak %**: डाउनलोड किए गए JS में मिली अनुवादित स्ट्रिंग्स का वह हिस्सा जो ऐसे पेज का है जिस पर उपयोगकर्ता **नहीं** है।
- **Component avg**: अलग से कंपाइल किए गए हर कंपोनेंट का औसत gzip आकार। दिखाता है कि एक अकेला कंपोनेंट कितना i18n रनटाइम और कैटलॉग खींच लाता है।
- **E2E reactivity**: नया लोकेल चुनने और DOM में `html[lang]` अपडेट होने के बीच का वास्तविक समय (Playwright, 5 पुनरावृत्तियाँ)।
- **Page load**: `PerformanceNavigationTiming.duration`।

> नीचे की संख्याएँ `vue-i18n` 11.4.0 और `intlayer` 9.5.0 / 9.5.1 के साथ **2026-09-12** के रन से आती हैं। टेस्ट एप्लिकेशन जानबूझकर छोटा है (प्रति लोकेल कुछ दर्जन स्ट्रिंग्स), इसलिए लीकेज प्रतिशत एक **पैटर्न** दर्शाते हैं: वे आपके कंटेंट के साथ बढ़ते हैं जबकि रनटाइम लागत स्थिर रहती है।

### Vite + Vue 3 पर परिणाम

| लाइब्रेरी                     | रणनीति | Lib size (gz) | Lib size (min) | Page JS औसत (gz) | Locale leak | Page leak | Component औसत (gz) | E2E रिएक्टिविटी | Page load |
| ----------------------------- | ------ | ------------: | -------------: | ---------------: | ----------: | --------: | -----------------: | --------------: | --------: |
| **base** (बिना i18n)          | -      |        0.0 KB |         0.0 KB |          41.3 KB |        0.0% |         - |             1.1 KB |          1.8 ms |   10.8 ms |
| `vue-i18n`                    | static |       24.3 KB |        83.2 KB |         134.9 KB |       50.0% |     90.0% |           196.0 KB |          2.8 ms |   13.6 ms |
| **`vue-intlayer`**            | static |    **3.9 KB** |    **11.1 KB** |      **57.1 KB** |       56.8% |  **0.0%** |         **7.7 KB** |      **4.5 ms** |   13.8 ms |
| `@intlayer/vue-i18n` (compat) | static |        7.9 KB |        23.2 KB |          47.0 KB |       15.0% |      0.0% |             8.4 KB |          1.5 ms |    9.3 ms |

> बेस ऐप का page-leak कॉलम खाली छोड़ा गया है: बिना i18n लाइब्रेरी के, फ़िंगरप्रिंटिंग साझा chunks में हार्ड-कोडेड स्ट्रिंग्स पकड़ लेती है और संख्या सार्थक नहीं होती।

**इसे कैसे पढ़ें**

- **रनटाइम लागत।** `vue-i18n` पूरे बेंचमार्क में सबसे भारी रनटाइम में से एक है: केवल इसे इम्पोर्ट करने वाले खाली कंपोनेंट के लिए **24.3 KB gzip / 83.2 KB minified**। `vue-intlayer` की लागत 3.9 KB gzip है। यह अंतर हर पेज पर चुकाना पड़ता है, चाहे आपके पास कितनी भी स्ट्रिंग्स हों।
- **प्रति पेज JavaScript।** बिना i18n वाला ऐप 41.3 KB का है। `vue-i18n` इसे तीन गुना से अधिक बढ़ाकर **134.9 KB** कर देता है; Intlayer **57.1 KB** पर आता है, +15.8 KB, जिसका अधिकांश दस बंडल किए गए लोकेल हैं (अगला बिंदु देखें)।
- **लीकेज।** `createI18n({ messages: { en, fr, ... } })` के साथ, हर पेज हर लोकेल और हर पेज की स्ट्रिंग्स भेजता है: **50% लोकेल लीकेज** (दो फ़िंगरप्रिंट किए गए लोकेल पर) और **90% पेज लीकेज**। Intlayer का `static` मोड भी हर लोकेल बंडल करता है (इसलिए तुलनीय लोकेल-लीक आँकड़ा) लेकिन इसमें **0% पेज लीकेज** है: एक पेज केवल उन कंपोनेंट की डिक्शनरी खींचता है जिन्हें वह रेंडर करता है। `importMode: 'dynamic'` पर स्विच करने से लोकेल लीकेज भी हट जाता है; वह कॉन्फ़िगरेशन इस Vue रन का हिस्सा नहीं था।
- **कंपोनेंट का आकार वह जगह है जहाँ आर्किटेक्चर दिखता है।** `useI18n()` कॉल करने वाला कंपोनेंट औसतन **196 KB** में कंपाइल होता है, क्योंकि `t()` उस ग्लोबल इंस्टेंस से बंधा है जो हर लोकेल का हर मैसेज रखता है। वही कंपोनेंट `useIntlayer()` के साथ **7.7 KB** में कंपाइल होता है: यह केवल अपनी डिक्शनरी तक पहुँचता है।
- **रिएक्टिविटी** दोनों के लिए कोई मुद्दा नहीं है (2-5 ms)। एक बार मैसेज मेमोरी में आ जाएँ तो Vue का रिएक्टिविटी सिस्टम लोकेल स्विचिंग को सस्ता बना देता है।
- **`@intlayer/vue-i18n`**, ड्रॉप-इन एडाप्टर, `vue-i18n` API बनाए रखता है और एप्लिकेशन कोड को छुए बिना **प्रति पेज 47.0 KB** और **प्रति कंपोनेंट 8.4 KB** मापा गया।

> संदर्भ के लिए, उसी रन ने `fluent-vue` को प्रति पेज 171.8 KB, 29.7 KB रनटाइम और प्रति कंपोनेंट 217 KB मापा।

## अंतर क्यों? ग्लोबल इंस्टेंस बनाम कंपाइल की गई डिक्शनरी

`vue-i18n` एक रनटाइम है। `createI18n()` एक ग्लोबल इंस्टेंस बनाता है जो प्रति लोकेल एक मैसेज ट्री रखता है; `useI18n()` हर कंपोनेंट को उससे बाँधता है; `t("footer.github")` रेंडर टाइम पर key खोजता है। यही SFC `<i18n>` ब्लॉक, `v-t` और रनटाइम मैसेज लोडिंग को संभव बनाता है, और यही कारण है कि हर कंपोनेंट के डिपेंडेंसी ग्राफ़ में पूरा ट्री शामिल होता है:

```bash
.
├── locales
│   ├── en.json
│   ├── fr.json
│   └── ...                        # प्रति लोकेल एक फ़ाइल, सभी पेज अंदर
└── src
    ├── i18n.ts                    # createI18n({ messages: { en, fr, ... } })
    ├── main.ts
    └── components
        └── Footer.vue             # const { t } = useI18n(); t("footer.github")
```

ऑप्टिमाइज़ करने का मतलब है कि **आप** `en.json` को प्रति-रूट फ़ाइलों में बाँटते हैं, **आप** राउटर गार्ड में `setLocaleMessage()` कॉल करते हैं, और **आप** कंपोनेंट के हिलने पर रूट-से-फ़ाइल मैप को सही रखते हैं। रनटाइम आपके लिए यह नहीं कर सकता क्योंकि उसे पता ही नहीं कि कोई कंपोनेंट कौन-सी keys माँगेगा।

Intlayer उस ज्ञान को बिल्ड में ले जाता है। कंटेंट कंपोनेंट के बगल में घोषित होता है, और `vite-intlayer` तय करता है कि कौन-सा कंपोनेंट कौन-सी डिक्शनरी इम्पोर्ट करता है:

```bash
.
├── intlayer.config.ts
└── src
    ├── main.ts                    # createApp(App).use(intlayer)
    └── components
        └── Footer
            ├── Footer.vue         # useIntlayer("footer")
            └── Footer.content.ts
```

कंपाइलर प्रति डिक्शनरी और प्रति लोकेल ठीक वही JSON उत्सर्जित करता है जिसकी उस कंपोनेंट को ज़रूरत है, और उन डिक्शनरी को हटा देता है जिन्हें कोई इम्पोर्ट नहीं करता। प्रति-रूट स्कोपिंग प्रति-कंपोनेंट स्कोपिंग का परिणाम है, कोई कार्य नहीं।

> अप्रयुक्त लोकेल भी हटाने के लिए, `intlayer.config.ts` में `dictionary.importMode: 'dynamic'` सेट करें। [बंडल ऑप्टिमाइज़ेशन डॉक](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/bundle_optimization.md) देखें।

## डेवलपर अनुभव

### सेटअप

**vue-i18n**

```ts fileName="src/i18n.ts"
import { createI18n } from "vue-i18n";
import en from "../locales/en.json";
import fr from "../locales/fr.json";

export const i18n = createI18n({
  legacy: false,
  locale: "en",
  fallbackLocale: "en",
  messages: { en, fr },
});
```

```ts fileName="src/main.ts"
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { i18n } from "./i18n";

createApp(App).use(router).use(i18n).mount("#app");
```

**Intlayer**

```ts fileName="intlayer.config.ts"
import { type IntlayerConfig, Locales } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayer(), vue()],
});
```

```ts fileName="src/main.ts"
import { createApp } from "vue";
import { intlayer } from "vue-intlayer";
import App from "./App.vue";
import router from "./router";

createApp(App).use(intlayer).use(router).mount("#app");
```

### कंपोनेंट

**vue-i18n**

```json fileName="locales/en.json"
{
  "counter": {
    "label": "Counter",
    "increment": "Increment"
  }
}
```

```vue fileName="src/components/Counter.vue"
<script setup lang="ts">
import { ref } from "vue";
import { useI18n } from "vue-i18n";

const { t, n } = useI18n();
const count = ref(0);
</script>

<template>
  <div>
    <p>{{ n(count) }}</p>
    <button :aria-label="t('counter.label')" @click="count++">
      {{ t("counter.increment") }}
    </button>
  </div>
</template>
```

`t('counter.label')` तब तक एक स्ट्रिंग है जब तक आप खुद मैसेज स्कीमा टाइप न करें; एक टाइपो key को रेंडर कर देता है।

**Intlayer**

```ts fileName="src/components/Counter/Counter.content.ts"
import { t, type Dictionary } from "intlayer";

const counterContent = {
  key: "counter",
  content: {
    label: t({ en: "Counter", fr: "Compteur" }),
    increment: t({ en: "Increment", fr: "Incrémenter" }),
  },
} satisfies Dictionary;

export default counterContent;
```

```vue fileName="src/components/Counter/Counter.vue"
<script setup lang="ts">
import { ref } from "vue";
import { useIntlayer } from "vue-intlayer";
import { useNumber } from "vue-intlayer/format";

const { label, increment } = useIntlayer("counter");
const number = useNumber();
const count = ref(0);
</script>

<template>
  <div>
    <p>{{ number.value(count) }}</p>
    <button :aria-label="label" @click="count++">
      {{ increment }}
    </button>
  </div>
</template>
```

`label` और `increment` टाइप्ड हैं; एक टाइपो TypeScript त्रुटि है, एक गायब फ़्रेंच मान बिल्ड त्रुटि है।

### प्रति लोकेल lazy loading

**vue-i18n**

```ts fileName="src/i18n.ts"
import { nextTick } from "vue";
import { createI18n } from "vue-i18n";

export const i18n = createI18n({
  legacy: false,
  locale: "en",
  fallbackLocale: "en",
});

export const loadLocaleMessages = async (locale: string) => {
  const messages = await import(`../locales/${locale}.json`);
  i18n.global.setLocaleMessage(locale, messages.default);
  await nextTick();
  i18n.global.locale.value = locale;
};
```

फिर राउटर गार्ड से `loadLocaleMessages()` कॉल करें, और अगर आपको प्रति-पेज स्कोपिंग चाहिए तो `locales/{locale}.json` को खुद रूट के हिसाब से बाँटें।

**Intlayer**

```ts fileName="intlayer.config.ts"
const config: IntlayerConfig = {
  // ...
  dictionary: {
    importMode: "dynamic",
  },
};
```

## vue-i18n API रखें, Intlayer का आउटपुट पाएँ

`@intlayer/vue-i18n` एक ड्रॉप-इन एडाप्टर है: `useI18n()`, `t()`, `d()`, `n()`, `{name}` और `{0}` इंटरपोलेशन, पाइप बहुवचन (`"car | cars"`), `v-t` और `i18n.global.locale` काम करते रहते हैं, `vite-intlayer` द्वारा कंपाइल की गई Intlayer डिक्शनरी से परोसे जाते हैं।

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueI18nVitePlugin from "@intlayer/vue-i18n/plugin";

export default defineConfig({
  plugins: [vue(), vueI18nVitePlugin()],
});
```

बेंचमार्क में, उसी ऐप का compat बिल्ड प्रति पेज **134.9 KB से 47.0 KB** और प्रति कंपोनेंट **196 KB से 8.4 KB** पर आ गया, कंपोनेंट को छुए बिना। आपकी मौजूदा `locales/{locale}.json` JSON सिंक प्लगइन के ज़रिए सत्य का स्रोत बनी रह सकती हैं।

[vue-i18n माइग्रेशन गाइड](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/migration_from_vue-i18n_to_intlayer.md) और [संगतता डॉक](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/compat/vue-i18n.md) देखें। Nuxt उपयोगकर्ताओं के लिए [`@nuxtjs/i18n` संगतता](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/compat/nuxtjs-i18n.md) के ज़रिए वही रास्ता है।

## कब कौन-सा चुनें?

- **vue-i18n चुनें** यदि आप मानक Vue दृष्टिकोण चाहते हैं, ICU मैसेज या SFC `<i18n>` ब्लॉक पर निर्भर हैं, पहले से `@nuxtjs/i18n` उपयोग करते हैं, या कोई अनुवाद प्लेटफ़ॉर्म केंद्रीकृत JSON की अपेक्षा करता है। अगर बंडल आकार मायने रखता है तो कैटलॉग बाँटने और प्रति रूट lazy-load करने का समय रखें।
- **Intlayer चुनें** यदि आप **कंपोनेंट-स्कोप्ड कंटेंट**, **सख्त TypeScript**, **बिल्ड-टाइम गायब-key त्रुटियाँ**, **बिना मेहनत tree-shaking और lazy loading**, और बिल्ट-इन संपादकीय टूल (Visual Editor, CMS, AI अनुवाद, MCP सर्वर) चाहते हैं। बड़े, मॉड्यूलर Vue / Nuxt कोडबेस और डिज़ाइन सिस्टम के लिए विशेष रूप से प्रासंगिक।
- **`@intlayer/vue-i18n` चुनें** यदि आप पहले से `vue-i18n` पर हैं और बिना पुनर्लेखन के बंडल लाभ चाहते हैं।

## संबंधित तुलनाएँ

- [next-intl बनाम Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/hi/next-intl_vs_intlayer.md) (वही बेंचमार्क)
- [i18next बनाम Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/hi/i18next_vs_intlayer.md) (वही बेंचमार्क)
- [Lingui बनाम Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/hi/lingui_vs_intlayer.md) (वही बेंचमार्क)
- [vue-i18n बनाम Intlayer (फीचर्स और DX)](https://github.com/aymericzip/intlayer/blob/main/docs/blog/hi/vue-i18n_vs_intlayer.md)
- [क्या vue-i18n पुराना हो गया है?](https://github.com/aymericzip/intlayer/blob/main/docs/blog/hi/is_vue-i18n_outdated.md)

## GitHub STARs

GitHub stars किसी प्रोजेक्ट की लोकप्रियता, सामुदायिक विश्वास और दीर्घकालिक प्रासंगिकता का एक मज़बूत संकेतक हैं। हालाँकि ये तकनीकी गुणवत्ता का प्रत्यक्ष माप नहीं हैं, ये दर्शाते हैं कि कितने डेवलपर प्रोजेक्ट को उपयोगी पाते हैं, इसकी प्रगति पर नज़र रखते हैं और इसे अपनाने की संभावना रखते हैं।

[![Star History Chart](https://api.star-history.com/chart?repos=intlify%2Fvue-i18n%2Caymericzip%2Fintlayer&type=date&legend=top-left)](https://star-history.com/#intlify/vue-i18n&aymericzip/intlayer)

## निष्कर्ष

`vue-i18n` परिपक्व, लचीला और Vue के साथ गहराई से एकीकृत है। बेंचमार्क दिखाता है कि Vite बिल्ड पर इसके रनटाइम-फ़र्स्ट डिज़ाइन की क्या लागत है: **24 KB gzip रनटाइम**, बिना i18n के 41 KB वाले ऐप के लिए **प्रति पेज 134.9 KB**, हर पेज पर **90% दूसरे पेजों का कंटेंट**, और ऐसे कंपोनेंट जो हर एक **196 KB** तक पहुँचते हैं क्योंकि वे ग्लोबल मैसेज ट्री से लटके हैं।

Intlayer काम को कंपाइलर में ले जाता है। प्रति-कंपोनेंट डिक्शनरी और मृत-कंटेंट हटाना बिल्ड आउटपुट हैं, परंपराएँ नहीं। उसी ऐप पर: **3.9 KB रनटाइम**, **प्रति पेज 57.1 KB**, **0% पेज लीकेज**, कंपोनेंट **25 गुना छोटे**। और अगर पुनर्लेखन विकल्प नहीं है, तो `@intlayer/vue-i18n` कंपोनेंट को छुए बिना अधिकांश रास्ता तय कर लेता है।

सारा कच्चा डेटा, टेस्ट ऐप और स्क्रिप्ट [Benchmark Bloom रिपॉज़िटरी](https://github.com/intlayer-org/benchmark-bloom) में हैं। इसे खुद चलाएँ।

अधिक जानकारी के लिए ['Intlayer क्यों?' डॉक](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/interest_of_intlayer.md) देखें।
