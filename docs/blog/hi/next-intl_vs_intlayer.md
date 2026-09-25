---
createdAt: 2026-09-13
updatedAt: 2026-09-22
title: "next-intl बनाम Intlayer: 2026 बेंचमार्क और तुलना"
description: "Next.js App Router और TanStack Start पर next-intl और Intlayer की तुलना। बंडल साइज़, कंटेंट लीकेज, कंपोनेंट साइज़, हाइड्रेशन, लोकेल स्विचिंग और डेवलपर अनुभव।"
keywords:
  - next-intl
  - use-intl
  - Intlayer
  - Internationalization
  - i18n
  - Benchmark
  - Bundle size
  - Next.js
  - TanStack Start
  - React
slugs:
  - blog
  - next-intl-vs-intlayer
author: aymericzip
---

# next-intl बनाम Intlayer | React और Next.js अंतर्राष्ट्रीयकरण (i18n) बेंचमार्क

![next-intl VS Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/assets/i18next-next-intl-intlayer.webp?raw=true)

`next-intl` Next.js के लिए सबसे लोकप्रिय i18n लाइब्रेरी है। Intlayer एक कंपाइलर-आधारित, घटक-क्षेत्रीय विकल्प है। दोनों App Router एप्लिकेशन का स्थानीयकरण करते हैं। सवाल यह है कि ऐप बनने के बाद प्रत्येक की लागत क्या है।

यह लेख कोई ट्यूटोरियल नहीं है। यह [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom) के आंकड़ों द्वारा समर्थित एक तुलना है, जो एक ओपन-सोर्स बेंचमार्क सूट है जो प्रत्येक लाइब्रेरी के साथ एक ही एप्लिकेशन बनाता है और मापता है कि ब्राउज़र वास्तव में क्या डाउनलोड और निष्पादित करता है।

<TOC/>

> **संक्षेप में (tl;dr)**: `next-intl` केवल अपने रनटाइम के लिए प्रत्येक पेज पर **+12.6 KB gzip** जोड़ता है, और अपने सामान्य सेटअप (`static` और `dynamic`) में **~90% अन्य पेजों की स्ट्रिंग्स** लीक करता है। उस लीकेज को हटाने के लिए कैटलॉग को नेमस्पेस में विभाजित करना और प्रत्येक पेज के लिए मैन्युअल रूप से चुनना पड़ता है, जो एक कठिन काम है। इसके विपरीत, `Intlayer` का कंपाइलर बिना किसी अतिरिक्त कॉन्फ़िगरेशन के **0% लीकेज**, **3 गुना छोटे कंपोनेंट्स**, और बेस ऐप से केवल **+0.3 KB** अधिक साइज़ सुनिश्चित करता है।

## संक्षेप में

- **next-intl** - Next.js समुदाय का मानक। प्रति भाषा केंद्रीकृत JSON डिक्शनरी, पूर्ण ICU MessageFormat समर्थन, और Next.js अनुरोध हैंडलिंग और राउटिंग के साथ गहरा एकीकरण।
- **Intlayer** - कंपोनेंट-केंद्रित कंटेंट मॉडल। `.content.ts` फाइलें अपने कंपोनेंट्स के बगल में बैठती हैं, बिल्ड-टाइम कंपाइलर उन्हें प्रति कंपोनेंट और प्रति लोकेल ट्री-शेक और लेज़ी-लोड करता है, और स्वचालित रूप से सख्त TypeScript प्रकार उत्पन्न करता है।

| लाइब्रेरी             | GitHub स्टार्स                                                                                                                                                                 | कुल कमिट्स                                                                                                                                                                         | अंतिम कमिट                                                                                                                                          | पहला संस्करण | NPM संस्करण                                                                                                   | NPM डाउनलोड्स                                                                                                            |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ | ------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `aymericzip/intlayer` | [![GitHub Repo stars](https://img.shields.io/github/stars/aymericzip/intlayer?style=for-the-badge&label=%E2%AD%90%20stars)](https://github.com/aymericzip/intlayer/stargazers) | [![GitHub commit activity](https://img.shields.io/github/commit-activity/t/aymericzip/intlayer?style=for-the-badge&label=commits)](https://github.com/aymericzip/intlayer/commits) | [![Last Commit](https://img.shields.io/github/last-commit/aymericzip/intlayer?style=for-the-badge)](https://github.com/aymericzip/intlayer/commits) | अप्रैल 2024  | [![npm](https://img.shields.io/npm/v/intlayer?style=for-the-badge)](https://www.npmjs.com/package/intlayer)   | [![npm downloads](https://img.shields.io/npm/dm/intlayer?style=for-the-badge)](https://www.npmjs.com/package/intlayer)   |
| `amannn/next-intl`    | [![GitHub Repo stars](https://img.shields.io/github/stars/amannn/next-intl?style=for-the-badge&label=%E2%AD%90%20stars)](https://github.com/amannn/next-intl/stargazers)       | [![GitHub commit activity](https://img.shields.io/github/commit-activity/t/amannn/next-intl?style=for-the-badge&label=commits)](https://github.com/amannn/next-intl/commits)       | [![Last Commit](https://img.shields.io/github/last-commit/amannn/next-intl?style=for-the-badge)](https://github.com/amannn/next-intl/commits)       | मार्च 2021   | [![npm](https://img.shields.io/npm/v/next-intl?style=for-the-badge)](https://www.npmjs.com/package/next-intl) | [![npm downloads](https://img.shields.io/npm/dm/next-intl?style=for-the-badge)](https://www.npmjs.com/package/next-intl) |

> बैज स्वचालित रूप से अपडेट होते हैं।

## आमने-सामने सुविधा तुलना

| सुविधा                                       | Intlayer (`react-intlayer` / `next-intlayer`)                                            | next-intl (`next-intl` / `use-intl`)                                                   |
| -------------------------------------------- | ---------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| **कंपोनेंट के पास अनुवाद**                   | ✅ हाँ, प्रत्येक कंपोनेंट के बगल में `.content.ts` मौजूद                                 | ❌ `messages/` में केंद्रीकृत JSON डिक्शनरी                                            |
| **TypeScript एकीकरण**                        | ✅ कंटेंट से ऑटो-जनरेटेड सख्त प्रकार                                                     | ⚠️ संदेश पथों के लिए मैन्युअल `global.d.ts` सेटअप के माध्यम से समर्थित                 |
| **गायब अनुवादों का पता लगाना**               | ✅ TypeScript एरर + बिल्ड-टाइम एरर/चेतावनी                                               | ⚠️ रनटाइम गायब कुंजी लौटाता है या कॉन्फ़िगरेशन के आधार पर त्रुटि फेंकता है             |
| **रिच कंटेंट (JSX / Markdown / कंपोनेंट्स)** | ✅ सीधा समर्थन                                                                           | ⚠️ मैपिंग कंपोनेंट्स के साथ `t.rich()` के माध्यम से                                    |
| **ICU समर्थन**                               | ⚠️ कार्य प्रगति पर                                                                       | ✅ हाँ, पूर्ण ICU समर्थन                                                               |
| **सिंक्रोनस सर्वर कंपोनेंट्स**               | ✅ `next-intlayer/server` से `useIntlayer` किसी भी चाइल्ड सर्वर कंपोनेंट में काम करता है | ❌ एसिंक्रोनस सर्वर पैरेंट से प्रॉप्स के माध्यम से अनुवाद पास करने की आवश्यकता होती है |
| **ट्री-शेकिंग (Tree-shaking)**               | ✅ कंपाइलर द्वारा स्वचालित (प्रति कंपोनेंट, प्रति लोकेल)                                 | ⚠️ नेमस्पेस को मैन्युअल रूप से विभाजित करने और `pick()` का उपयोग करने की आवश्यकता है   |
| **लेज़ी लोडिंग (Lazy loading)**              | ✅ कॉन्फ़िगरेशन की एक पंक्ति (`importMode: 'dynamic'`)                                   | ⚠️ `getRequestConfig` में मैन्युअल डायनेमिक इम्पोर्ट की आवश्यकता होती है               |
| **विजुअल एडिटर / CMS**                       | ✅ निःशुल्क विजुअल एडिटर + वैकल्पिक CMS                                                  | ❌ नहीं                                                                                |
| **AI-संचालित अनुवाद**                        | ✅ बिल्ट-इन, आपकी अपनी प्रदाता कुंजियों का उपयोग करता है                                 | ❌ नहीं                                                                                |
| **MCP सर्वर और एजेंट स्किल्स**               | ✅ हाँ                                                                                   | ❌ नहीं                                                                                |

## बेंचमार्क

### क्या मापा गया था

[Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom) टेस्ट सुइट प्रत्येक लाइब्रेरी के साथ **समान एप्लिकेशन** बनाता है: **10 पेज** (home, about, blog, careers, contact, FAQ, pricing, products, settings, team), **10 लोकेल** (`en`, `fr`, `es`, `de`, `it`, `pt`, `zh`, `ja`, `ko`, `ru`), समान कंपोनेंट और समान कंटेंट। पेजों को `en` और `fr` में मापा जाता है। प्रत्येक लाइब्रेरी को चार **लोडिंग रणनीतियों** तक लागू किया गया है:

| रणनीति             | विवरण                                                                             | यह कौन करता है                    |
| ------------------ | --------------------------------------------------------------------------------- | --------------------------------- |
| **static**         | प्रत्येक लोकेल और प्रत्येक पेज को एक साथ बंडल करके लोड किया जाता है               | त्वरित प्रोटोटाइप, AI-जनरेटेड कोड |
| **dynamic**        | केवल सक्रिय लोकेल लोड किया जाता है, लेकिन सभी पेज एक साथ                          | अधिकांश प्रोजेक्ट्स               |
| **scoped-static**  | प्रति रूट नेमस्पेस, कोई लेज़ी लोडिंग नहीं                                         | दुर्लभ                            |
| **scoped-dynamic** | प्रति रूट नेमस्पेस + लेज़ी लोडिंग। केवल वर्तमान पेज और वर्तमान लोकेल भेजा जाता है | सख्त प्रदर्शन बजट वाले ऐप्स       |

Intlayer में कोई "scoped" संस्करण नहीं है: कंपाइलर स्वचालित रूप से **प्रति कंपोनेंट** सामग्री को स्कोप करता है, इसलिए इसकी `static` और `dynamic` पंक्तियाँ पहले से ही स्कोप्ड हैं।

प्रत्येक बिल्ड के लिए, सुइट रिकॉर्ड करता है:

- **Lib size**: केवल i18n लाइब्रेरी इम्पोर्ट करने वाले खाली कंपोनेंट का gzip आकार।
- **Page JS**: प्रति पेज डाउनलोड किया गया gzip जावास्क्रिप्ट।
- **Locale leak %**: डाउनलोड किए गए JS में पाए गए अनूदित स्ट्रिंग्स का हिस्सा जो उस लोकेल से संबंधित हैं जिसे उपयोगकर्ता नहीं देख रहा है।
- **Page leak %**: डाउनलोड किए गए JS में पाए गए अनूदित स्ट्रिंग्स का हिस्सा जो उस पेज से संबंधित हैं जिस पर उपयोगकर्ता नहीं है।
- **Component avg**: अलग से कंपाइल किए गए प्रत्येक कंपोनेंट का औसत gzip आकार।
- **E2E reactivity**: नया लोकेल चुनने और DOM में `html[lang]` अपडेट होने के बीच का समय।
- **Hydration**: React हाइड्रेशन चरण की अवधि।

> नीचे दिए गए आंकड़े **2026-09-12** के रन से हैं, जिसमें `next-intl` 4.14.2 और `intlayer` 9.5.1 शामिल हैं।

### Next.js (App Router) पर परिणाम

अपनी पसंद के मेट्रिक्स और लाइब्रेरी चुनें:

<I18nBenchmark framework="nextjs" vertical/>

| लाइब्रेरी                      | रणनीति         | लाइब्रेरी साइज़ (gz) | पेज JS औसत (gz) | लोकेल लीक |  पेज लीक | कंपोनेंट औसत (gz) | E2E प्रतिक्रियाशीलता | हाइड्रेशन |
| ------------------------------ | -------------- | -------------------: | --------------: | --------: | -------: | ----------------: | -------------------: | --------: |
| **base** (बिना i18n)           | -              |               0.0 KB |        141.0 KB |      0.0% |     0.0% |            0.9 KB |              13.4 ms |   11.8 ms |
| `next-intl`                    | static         |              14.7 KB |        153.6 KB |      4.2% |    89.8% |           21.8 KB |              16.0 ms |   14.7 ms |
| `next-intl`                    | dynamic        |              14.7 KB |        153.6 KB |      9.7% |    89.9% |           21.8 KB |              15.6 ms |   14.8 ms |
| `next-intl`                    | scoped-static  |              14.7 KB |        153.6 KB |      0.0% |     0.0% |           80.1 KB |              17.9 ms |   17.4 ms |
| `next-intl`                    | scoped-dynamic |              14.7 KB |        153.6 KB |      0.0% |     0.0% |           22.9 KB |              17.8 ms |   16.8 ms |
| **`next-intlayer`**            | static         |           **5.5 KB** |    **141.3 KB** |  **0.0%** | **0.0%** |        **8.5 KB** |          **15.5 ms** |   16.9 ms |
| **`next-intlayer`**            | dynamic        |           **5.5 KB** |    **141.3 KB** |  **0.0%** | **0.0%** |        **6.9 KB** |          **15.3 ms** |   15.9 ms |
| `@intlayer/next-intl` (संगतता) | static         |               8.0 KB |        147.5 KB |      0.0% |     0.0% |            8.1 KB |              14.5 ms |   12.8 ms |
| `@intlayer/next-intl` (संगतता) | dynamic        |               8.0 KB |        148.7 KB |      0.0% |     0.0% |            8.1 KB |              11.7 ms |   12.8 ms |

**परिणामों को कैसे समझें**

- **रनटाइम लागत।** बेस एप्लिकेशन 141.0 KB प्रति पेज है। `next-intl` इसे 153.6 KB (**प्रत्येक पेज पर +12.6 KB gzip**) तक ले जाता है, जबकि Intlayer इसे केवल 141.3 KB (**+0.3 KB**) तक ले जाता है।
- **लीकेज।** सबसे आम सेटअप (`static` और `dynamic`) में, `next-intl` हर पेज पर **~90% अन्य पेजों की सामग्री** भेजता है, क्योंकि पूरी `en.json` क्लाइंट प्रोवाइडर में जाती है। 0% तक पहुँचने के लिए सावधानीपूर्वक मैनुअल विभाजन की आवश्यकता होती है, जबकि Intlayer स्वचालित रूप से 0% पर है।
- **कंपोनेंट साइज़।** `useTranslations()` को कॉल करने वाला कंपोनेंट औसतन 21.8 KB का होता है; `useIntlayer()` के साथ वही कंपोनेंट केवल 6.9 KB का होता है।

<ClickToOpenIframe
src="https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-nextjs.md"
width="100%"
height="600px"
style="border:none;"
/>

> पूरी तालिका, प्रत्येक लाइब्रेरी और रणनीति, [Next.js बेंचमार्क रिपोर्ट](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/benchmark/nextjs.md) में उपलब्ध है।

### TanStack Start (`use-intl`) पर परिणाम

`use-intl` `next-intl` का फ्रेमवर्क-अज्ञेय कोर है। वही API, वही संदेश प्रारूप। TanStack Start पर `intlayer` के साथ इसकी तुलना Next.js-विशिष्ट भागों को समीकरण से हटा देती है।

| लाइब्रेरी                     | रणनीति         | लाइब्रेरी साइज़ (gz) | पेज JS औसत (gz) | लोकेल लीक |  पेज लीक | कंपोनेंट औसत (gz) | E2E प्रतिक्रियाशीलता |
| ----------------------------- | -------------- | -------------------: | --------------: | --------: | -------: | ----------------: | -------------------: |
| **base** (बिना i18n)          | -              |               0.0 KB |        111.0 KB |      0.0% |     0.0% |            0.7 KB |               8.1 ms |
| `use-intl`                    | static         |              14.1 KB |        179.8 KB |     50.0% |    89.8% |           76.0 KB |               6.7 ms |
| `use-intl`                    | dynamic        |              14.1 KB |        119.4 KB |      0.0% |    89.8% |           75.9 KB |               7.0 ms |
| `use-intl`                    | scoped-static  |              14.1 KB |        128.7 KB |      0.0% |     0.0% |           87.1 KB |              20.9 ms |
| `use-intl`                    | scoped-dynamic |              14.1 KB |        128.7 KB |      0.0% |     0.0% |           87.1 KB |              13.3 ms |
| **`intlayer`**                | static         |           **5.0 KB** |    **125.8 KB** |     50.0% | **0.0%** |        **8.1 KB** |           **3.2 ms** |
| **`intlayer`**                | dynamic        |           **5.0 KB** |    **118.6 KB** |  **0.0%** | **0.0%** |        **6.3 KB** |           **3.6 ms** |
| `@intlayer/use-intl` (संगतता) | dynamic        |               7.3 KB |        129.7 KB |      0.0% |     0.0% |            9.3 KB |               8.7 ms |

**परिणामों को कैसे समझें**

- सरल `use-intl` सेटअप बेस ऐप की तुलना में **प्रति पेज 68.8 KB अधिक JS** भेजता है।
- `dynamic` मोड में, `use-intl` 119.4 KB पर आता है, लेकिन फिर भी **89.8% पेज लीकेज** वहन करता है।
- कंपोनेंट के स्तर पर वास्तुकला का अंतर स्पष्ट है: `use-intl` के साथ 76-87 KB बनाम Intlayer के साथ 6-8 KB।
- **लोकेल स्विचिंग** Intlayer के साथ 2x-4x तेज़ है (3 ms बनाम 7-21 ms)।

<ClickToOpenIframe
src="https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-tanstack.md"
width="100%"
height="600px"
style="border:none;"
/>

> पूरी तालिका [TanStack Start बेंचमार्क रिपोर्ट](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/benchmark/tanstack.md) में उपलब्ध है।

## अंतर क्यों है? केंद्रीकृत कैटलॉग बनाम कंपाइल की गई डिक्शनरी

![Centralized catalogs versus per-component dictionaries](https://github.com/aymericzip/intlayer/blob/main/docs/assets/project_stucture_18n_vs_intlayer.png?raw=true)

`next-intl` क्लासिक मॉडल का पालन करता है: प्रति लोकेल एक JSON, जो `getRequestConfig` में लोड होता है, `NextIntlClientProvider` में पास होता है, और `t("namespace.key")` द्वारा पढ़ा जाता है।

```bash
.
├── messages
│   ├── en.json
│   └── fr.json
└── src
    ├── i18n
    │   ├── request.ts
    │   └── routing.ts
    ├── middleware.ts
    └── app
        └── [locale]
            ├── layout.tsx
            └── about
                └── page.tsx
```

रनटाइम यह नहीं जान सकता कि कोई पेज किन कुंजियों का उपयोग करेगा, इसलिए संपूर्ण कैटलॉग भेजना ही सुरक्षित डिफ़ॉल्ट है।

वहां तक न पहुँचने की लागत दो अक्षों पर एक साथ बढ़ती है, पृष्ठ और भाषाएँ:

![Theoretical content leakage by architecture](https://github.com/aymericzip/intlayer/blob/main/docs/assets/theorical_content_leakage.webp?raw=true)

Intlayer जिम्मेदारी को बदल देता है। सामग्री सीधे कंपोनेंट के बगल में घोषित की जाती है:

```bash
.
├── intlayer.config.ts
└── src
    ├── middleware.ts
    └── app
        └── [locale]
            ├── layout.tsx
            └── about
                ├── page.tsx
                └── page.content.ts
    └── components
        └── Counter
            ├── index.tsx
            └── index.content.ts
```

बिल्ड समय पर, कंपाइलर देखता है कि कौन सा कंपोनेंट कौन सी डिक्शनरी इम्पोर्ट करता है, और केवल सक्रिय लोकेल के लिए उन डिक्शनरी को बंडल करता है।

> `dynamic` पंक्ति के आंकड़े प्राप्त करने के लिए, `intlayer.config.ts` में `dictionary.importMode: 'dynamic'` सेट करें। [बंडल ऑप्टिमाइज़ेशन दस्तावेज़](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/bundle_optimization.md) देखें।

## डेवलपर अनुभव

### क्लाइंट कंपोनेंट

<Tabs defaultTab="intlayer" group="techno">
<Tab label="next-intl" value="next-intl">

```json fileName="messages/en.json"
{
  "counter": {
    "label": "Counter",
    "increment": "Increment"
  }
}
```

```tsx fileName="src/components/ClientCounter.tsx"
"use client";

import { useState } from "react";
import { useTranslations, useFormatter } from "next-intl";

export const Counter = () => {
  const t = useTranslations("counter");
  const format = useFormatter();
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>{format.number(count)}</p>
      <button aria-label={t("label")} onClick={() => setCount((c) => c + 1)}>
        {t("increment")}
      </button>
    </div>
  );
};
```

> इस घटक को प्रस्तुत करने वाले प्रत्येक पृष्ठ पर `NextIntlClientProvider` को दिए जाने वाले संदेशों में `counter` नेमस्पेस शामिल करना याद रखें।

</Tab>
<Tab label="Intlayer" value="intlayer">

```ts fileName="src/components/Counter/index.content.ts"
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

```tsx fileName="src/components/Counter/index.tsx"
"use client";

import { useState } from "react";
import { useIntlayer } from "next-intlayer";
import { useNumber } from "next-intlayer/format";

export const Counter = () => {
  const { label, increment } = useIntlayer("counter");
  const number = useNumber();
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>{number(count)}</p>
      <button aria-label={label} onClick={() => setCount((c) => c + 1)}>
        {increment}
      </button>
    </div>
  );
};
```

पृष्ठ पर कुछ भी पंजीकृत करने की आवश्यकता नहीं है: घटक अपनी सामग्री स्वयं लाता है।

</Tab>
</Tabs>
### सिंक्रोनस सर्वर कंपोनेंट

डिज़ाइन सिस्टम के घटक (जैसे नेवबार, फूटर, कार्ड) अक्सर सर्वर कंपोनेंट होते हैं जिन्हें क्लाइंट कंपोनेंट के चिल्ड्रन के रूप में रेंडर किया जाता है, इसलिए वे `async` नहीं हो सकते।

<Tabs defaultTab="intlayer" group="techno">
<Tab label="next-intl" value="next-intl">

```tsx fileName="src/components/ServerCounter.tsx"
type ServerCounterProps = {
  t: (key: string) => string;
  formattedCount: string;
};

export const ServerCounter = ({ t, formattedCount }: ServerCounterProps) => (
  <div>
    <p>{formattedCount}</p>
    <button aria-label={t("label")}>{t("increment")}</button>
  </div>
);
```

पृष्ठ को `await getTranslations("counter")` और `await getFormatter()` करना होगा, फिर परिणामों को प्रॉप्स के रूप में नीचे भेजना होगा। घटक अब आत्मनिर्भर नहीं रहा।

</Tab>
<Tab label="Intlayer" value="intlayer">

```tsx fileName="src/components/ServerCounter.tsx"
import { useIntlayer } from "next-intlayer/server";
import { useNumber } from "next-intlayer/server/format";

export const ServerCounter = ({ count }: { count: number }) => {
  const { label, increment } = useIntlayer("counter");
  const number = useNumber();

  return (
    <div>
      <p>{number(count)}</p>
      <button aria-label={label}>{increment}</button>
    </div>
  );
};
```

</Tab>
</Tabs>
### मेटाडेटा (Metadata)

<Tabs defaultTab="intlayer" group="techno">
<Tab label="next-intl" value="next-intl">

```tsx fileName="src/app/[locale]/about/page.tsx"
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";

const localizedPath = (locale: string, path: string) =>
  locale === routing.defaultLocale ? path : `/${locale}${path}`;

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> => {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });

  const languages = Object.fromEntries(
    routing.locales.map((l) => [l, localizedPath(l, "/about")])
  );

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: localizedPath(locale, "/about"),
      languages: { ...languages, "x-default": "/about" },
    },
  };
};
```

</Tab>
<Tab label="Intlayer" value="intlayer">

```tsx fileName="src/app/[locale]/about/page.tsx"
import { getIntlayer, getMultilingualUrls } from "intlayer";
import type { Metadata } from "next";
import type { LocalPromiseParams } from "next-intlayer";

export const generateMetadata = async ({
  params,
}: LocalPromiseParams): Promise<Metadata> => {
  const { locale } = await params;
  const metadata = getIntlayer("about-metadata", locale);
  const multilingualUrls = getMultilingualUrls("/about");

  return {
    ...metadata,
    alternates: {
      canonical: multilingualUrls[locale as keyof typeof multilingualUrls],
      languages: { ...multilingualUrls, "x-default": "/about" },
    },
  };
};
```

</Tab>
</Tabs>

## next-intl API बनाए रखें, Intlayer का आउटपुट प्राप्त करें

उपरोक्त बेंचमार्क परिणाम प्राप्त करने के लिए आपको अपने कंपोनेंट्स को दोबारा लिखने की आवश्यकता नहीं है। `@intlayer/next-intl` एक ड्रॉप-इन एडेप्टर है: यह `useTranslations`, `getTranslations`, `useFormatter`, `t.rich()` और ICU प्लुरल्स को बनाए रखता है, और उन्हें Intlayer डिक्शनरी से परोसता है।

```ts fileName="next.config.ts"
import type { NextConfig } from "next";
import { createNextIntlPlugin } from "@intlayer/next-intl/plugin";

const withIntlayer = createNextIntlPlugin();

const nextConfig: NextConfig = {};

export default withIntlayer(nextConfig);
```

बेंचमार्क में, बिना किसी कोड परिवर्तन के, इसी ऐप का कंपैट बिल्ड प्रति पेज **153.6 KB से घटकर 147.5 KB**, कंपोनेंट साइज़ **21.8 KB से घटकर 8.1 KB**, और पेज लीकेज **~90% से घटकर 0%** हो गया। आपकी मौजूदा `messages/{locale}.json` फाइलें [JSON सिंक प्लगइन](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/compat/next-intl.md) के माध्यम से सत्य का स्रोत बनी रह सकती हैं।

चरण-दर-चरण प्रक्रिया के लिए [next-intl माइग्रेशन गाइड](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/migration_from_next-intl_to_intlayer.md) देखें।

## कब किसे चुनें?

<AccordionGroup>
<Accordion header="next-intl चुनें">

आप Next.js के लिए इकोसिस्टम मानक चाहते हैं, ICU MessageFormat पर निर्भर करते हैं, आपका ऐप छोटे से मध्यम आकार का है, या आप किसी ऐसे अनुवाद प्लेटफ़ॉर्म (Crowdin, Phrase, Lokalise...) के साथ एकीकृत होते हैं जो केंद्रीकृत JSON की अपेक्षा करता है। यदि प्रदर्शन मायने रखता है तो कैटलॉग को नेमस्पेस में विभाजित करने और प्रति पृष्ठ `pick()` के साथ संदेश चुनने के लिए समय निकालें।

</Accordion>
<Accordion header="Intlayer चुनें">

आप **कंपोनेंट-स्कोप्ड सामग्री**, **सख्त TypeScript**, **बिल्ड-टाइम गुम कुंजी त्रुटियां**, **प्रयासहीन ट्री-शेकिंग और लेज़ी लोडिंग**, सिंक्रोनस सर्वर कंपोनेंट और अंतर्निहित संपादकीय उपकरण ([विजुअल एडिटर](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_visual_editor.md), [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_CMS.md), [AI अनुवाद](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/autoFill.md), [MCP सर्वर](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/mcp_server.md)) चाहते हैं। बड़े, मॉड्यूलर कोडबेस और डिज़ाइन सिस्टम के लिए विशेष रूप से प्रासंगिक।

</Accordion>
<Accordion header="@intlayer/next-intl चुनें">

आप पहले से ही `next-intl` पर हैं और बिना दोबारा लिखे बंडल लाभ चाहते हैं। [कम्पैटिबिलिटी एडेप्टर](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/compat/next-intl.md) आपके इम्पोर्ट और आपकी `messages/{locale}.json` फ़ाइल को सत्य के एकल स्रोत के रूप में रखता है। [next-intl vs @intlayer/next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/blog/hi/next-intl_vs_intlayer-next-intl.md) में एक साथ मापा गया।

</Accordion>
</AccordionGroup>

## अक्सर पूछे जाने वाले प्रश्न (FAQ)

<FAQ>

<Question title="क्या next-intl Intlayer से धीमा है?">

रेंडर समय पर नहीं। अंतर इसमें है कि क्लाइंट को क्या भेजा जाता है: `next-intl` प्रत्येक पृष्ठ पर **+12.6 KB gzip** रनटाइम की लागत लेता है और अधिकांश सेटअप में प्रत्येक पृष्ठ के साथ विदेशी पृष्ठों के लगभग 90% टेक्स्ट भेजता है। भाषा बदलना और हाइड्रेशन Next.js पर तुलनीय हैं (15-18 ms); TanStack Start पर `use-intl` 7-21 ms लेता है जबकि Intlayer केवल 3-4 ms लेता है।

</Question>

<Question title="क्या मैं next-intl के साथ 0% लीकेज प्राप्त कर सकता हूँ?">

हाँ, `scoped-dynamic` सेटअप के साथ: `messages/{locale}.json` को प्रति रूट एक नेमस्पेस में विभाजित करें, फिर प्रत्येक पृष्ठ में `pick(messages, [...])` का उपयोग करें और कंपोनेंट बदलने पर उस मैपिंग को सही बनाए रखें। बेंचमार्क की `scoped-*` पंक्तियाँ ठीक उसी काम को दर्शाती हैं। Intlayer बिना किसी अतिरिक्त प्रयास के 0% तक पहुँच जाता है क्योंकि कंपाइलर कंपोनेंट के अनुसार सामग्री को सीमित करता है। [बंडल ऑप्टिमाइज़ेशन](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/bundle_optimization.md) देखें।

</Question>

<Question title="क्या मुझे माइग्रेट करने के लिए अपने कंपोनेंट फिर से लिखने होंगे?">

नहीं। `@intlayer/next-intl` `useTranslations`, `getTranslations`, `useFormatter`, `t.rich()`, ICU बहुवचन और नेविगेशन सहायकों को बरकरार रखता है, और उन्हें संकलित शब्दकोशों से प्रस्तुत करता है। `next.config.ts` में केवल एक प्लगइन पंक्ति। चरण दर चरण [next-intl माइग्रेशन गाइड](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/migration_from_next-intl_to_intlayer.md) में देखें।

</Question>

<Question title="क्या Intlayer ICU MessageFormat का समर्थन करता है?">

मूल API पर ICU समर्थन पर कार्य प्रगति पर है। कम्पैटिबिलिटी एडेप्टर (`@intlayer/next-intl`, `@intlayer/use-intl`) ICU चलाते हैं: बहुवचन, `select`, `selectordinal`, `#` और `{ts, date, long}` Intlayer के ICU रिज़ॉल्वर से गुजरते हैं। विवरण के लिए [ICU संदेश प्रारूप](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en/icu_message_format.md) पढ़ें।

</Question>

<Question title="क्या मैं अपनी messages/{locale}.json फ़ाइलें रख सकता हूँ?">

हाँ। [JSON सिंक प्लगइन](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/compat/next-intl.md) उन्हें पढ़ता है, उनकी शीर्ष-स्तरीय कुंजियों को शब्दकोशों में विभाजित करता है, और जब CLI या CMS उन्हें अपडेट करता है तो अनुवादों को उन्हीं फ़ाइलों में वापस लिखता है। आपके अनुवादकों का कार्यप्रवाह नहीं बदलता है।

</Question>

</FAQ>

## संबंधित तुलनाएँ

वही बेंचमार्क, अन्य लाइब्रेरीज़:

- [i18next vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/hi/i18next_vs_intlayer.md)
- [Lingui vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/hi/lingui_vs_intlayer.md)
- [vue-i18n vs Intlayer benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/blog/hi/vue-i18n_vs_intlayer_benchmark.md)
- [next-i18next vs next-intl vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/hi/next-i18next_vs_next-intl_vs_intlayer.md)
- [react-i18next vs react-intl vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/hi/react-i18next_vs_react-intl_vs_intlayer.md)

next-intl पर गहराई से जानें:

- [next-intl vs @intlayer/next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/blog/hi/next-intl_vs_intlayer-next-intl.md), उसी ऐप पर मापा गया एडेप्टर
- [Is next-intl outdated?](https://github.com/aymericzip/intlayer/blob/main/docs/blog/hi/is_next-intl_outdated.md)
- [Using Intlayer with next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/blog/hi/intlayer_with_next-intl.md)
- [How to internationalize a Next.js app with next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/blog/hi/i18n_using_next-intl.md)

संदर्भ दस्तावेज़:

- [Next.js बेंचमार्क रिपोर्ट](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/benchmark/nextjs.md) और [TanStack Start बेंचमार्क रिपोर्ट](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/benchmark/tanstack.md)
- [कम्पैटिबिलिटी एडेप्टर: next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/compat/next-intl.md) और [माइग्रेशन गाइड](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/migration_from_next-intl_to_intlayer.md)
- [बंडल ऑप्टिमाइज़ेशन](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/bundle_optimization.md) और [Intlayer कंपाइलर](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/compiler.md)
- [प्रति-कंपोनेंट बनाम केंद्रीकृत i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/hi/per-component_vs_centralized_i18n.md)
- [कंपाइलर-संचालित बनाम घोषणात्मक i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/hi/compiler_vs_declarative_i18n.md)

## GitHub STARS

GitHub स्टार किसी प्रोजेक्ट की लोकप्रियता, सामुदायिक विश्वास और दीर्घकालिक प्रासंगिकता का एक मजबूत संकेतक हैं।

[![स्टार हिस्ट्री चार्ट](https://api.star-history.com/chart?repos=amannn%2Fnext-intl%2Caymericzip%2Fintlayer&type=date&legend=top-left)](https://star-history.com/#amannn/next-intl&aymericzip/intlayer)

## निष्कर्ष

`next-intl` एक ठोस, अच्छी तरह से अनुरक्षित लाइब्रेरी है, और बेंचमार्क पुष्टि करता है कि यह Next.js पर एक अच्छा विकल्प है। लेकिन इसका केंद्रीकृत कैटलॉग मॉडल हर अनुकूलन का भार डेवलपर पर डालता है: सरल सेटअप लगभग 90% अन्य पेजों की सामग्री लीक करता है, और अकेले रनटाइम की लागत प्रत्येक पेज पर +12.6 KB gzip होती है।

Intlayer उस काम को कंपाइलर में स्थानांतरित करता है। प्रति-कंपोनेंट डिक्शनरी, प्रति-लोकेल लेज़ी लोडिंग और अप्रयुक्त सामग्री को हटाना बिल्ड आउटपुट हैं। परिणाम: **+0.3 KB प्रति पेज**, **0% लीकेज**, कंपोनेंट्स **3 गुना छोटे**, और TanStack Start पर लोकेल स्विचिंग **2x-4x तेज़**।

सभी कच्चे डेटा, परीक्षण ऐप्स और स्क्रिप्ट [Benchmark Bloom रिपॉजिटरी](https://github.com/intlayer-org/benchmark-bloom) में उपलब्ध हैं।

अधिक विवरण के लिए ['Why Intlayer?' दस्तावेज़](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/interest_of_intlayer.md) देखें।
