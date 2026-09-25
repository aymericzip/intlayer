---
createdAt: 2026-09-13
updatedAt: 2026-09-22
title: "i18next बनाम Intlayer: 2026 बेंचमार्क और विस्तृत तुलना"
description: "Next.js और TanStack Start पर Intlayer के मुकाबले react-i18next और next-i18next का परीक्षण। बंडल साइज, कंटेंट लीकेज, भाषा बदलने की प्रतिक्रिया और डेवलपर अनुभव का विश्लेषण।"
keywords:
  - i18next
  - react-i18next
  - next-i18next
  - Intlayer
  - अंतर्राष्ट्रीयकरण
  - i18n
  - बेंचमार्क
  - बंडल साइज
  - ब्लॉग
  - Next.js
  - TanStack Start
  - JavaScript
  - React
slugs:
  - blog
  - i18next-vs-intlayer
author: aymericzip
---

# i18next बनाम Intlayer | React और Next.js अंतर्राष्ट्रीयकरण (i18n) बेंचमार्क

![i18next VS Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/assets/i18next-next-intl-intlayer.webp?raw=true)

`i18next` जावास्क्रिप्ट इकोसिस्टम में सबसे व्यापक रूप से उपयोग किया जाने वाला i18n फ्रेमवर्क है। `react-i18next` और `next-i18next` के माध्यम से यह अनगिनत React और Next.js एप्लिकेशनों को संचालित करता है। Intlayer एक आधुनिक, कंपाइलर-आधारित और कंपोनेंट-स्कोप्ड विकल्प है।

यह लेख केवल फीचर लिस्ट के बजाय वास्तविक मापों के आधार पर दोनों की तुलना करता है। सभी आंकड़े [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom) से लिए गए हैं, जो एक ओपन-सोर्स बेंचमार्क सूट है जो प्रत्येक लाइब्रेरी के साथ समान एप्लिकेशन बनाता है और ब्राउज़र द्वारा वास्तव में डाउनलोड किए गए डेटा को रिकॉर्ड करता है।

<TOC/>

> **संक्षेप में (tl;dr)**: `i18next` बेंचमार्क में सबसे भारी रनटाइम है: साधारण सेटअप में Next.js पर **प्रति पेज +77 KB gzip**, और पूर्ण नेमस्पेस + लेज़ी-लोडिंग अनुकूलन के बाद भी **+22 KB** जोड़ता है। जबकि Intlayer केवल **+0.3 KB** जोड़ता है। पूर्ण रूप से स्कोप्ड कॉन्फ़िगरेशन को छोड़कर, प्रत्येक `i18next` सेटअप **अन्य पेजों के लगभग 90% अनुवादित स्ट्रिंग्स को लीक** करता है; Intlayer डिफ़ॉल्ट रूप से **0%** लीक करता है। लेज़ी-लोडेड बैकएंड के साथ भाषा बदलने में `react-i18next` में **123-185 ms** लगे, जबकि Intlayer में केवल **3-4 ms**। `@intlayer/next-i18next` एडेप्टर `i18next` API को बनाए रखता है और मूल के **218.5 KB** के मुकाबले **150.7 KB** प्रति पेज पर आ गया।

## मुख्य बिंदु

- **i18next / react-i18next / next-i18next** - परिपक्व, प्लगइन्स से भरपूर, और फ्रेमवर्क-अज्ञेयवादी। नेमस्पेस, लैंग्वेज डिटेक्टर्स, बैकएंड्स, प्लगइन के जरिए ICU, और रिच कंटेंट के लिए `<Trans>` का समर्थन। कंटेंट `locales/{lng}/{ns}.json` में केंद्रीकृत रहता है। शक्तिशाली है, लेकिन प्रत्येक अनुकूलन (नेमस्पेस विभाजन, प्रति पेज लोडिंग, टाइप सुरक्षा) मैन्युअल कॉन्फ़िगरेशन मांगता है।
- **Intlayer** - कंपोनेंट-केंद्रित कंटेंट मॉडल। `.content.ts` शब्दकोश उसी कंपोनेंट के बगल में स्थित होते हैं जिसे वे सेवा प्रदान करते हैं, बिल्ड-टाइम कंपाइलर कंपोनेंट और लोकेल के आधार पर ट्री-शेकिंग और लेज़ी-लोडिंग करता है, कंटेंट से स्वचालित रूप से सख्त TypeScript प्रकार उत्पन्न होते हैं, और अनुवाद छूटने पर बिल्ड तुरंत फेल हो जाता है। मिडलवेयर, SEO हेल्पर्स, विजुअल एडिटर / CMS और AI अनुवाद प्रदान करता है।

| लाइब्रेरी               | GitHub स्टार्स                                                                                                                                                                     | कुल कमिट्स                                                                                                                                                                             | अंतिम कमिट                                                                                                                                              | पहला संस्करण | NPM संस्करण                                                                                                           | NPM मासिक डाउनलोड                                                                                                                |
| ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ | --------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `aymericzip/intlayer`   | [![GitHub Repo stars](https://img.shields.io/github/stars/aymericzip/intlayer?style=for-the-badge&label=%E2%AD%90%20stars)](https://github.com/aymericzip/intlayer/stargazers)     | [![GitHub commit activity](https://img.shields.io/github/commit-activity/t/aymericzip/intlayer?style=for-the-badge&label=commits)](https://github.com/aymericzip/intlayer/commits)     | [![Last Commit](https://img.shields.io/github/last-commit/aymericzip/intlayer?style=for-the-badge)](https://github.com/aymericzip/intlayer/commits)     | अप्रैल 2024  | [![npm](https://img.shields.io/npm/v/intlayer?style=for-the-badge)](https://www.npmjs.com/package/intlayer)           | [![npm downloads](https://img.shields.io/npm/dm/intlayer?style=for-the-badge)](https://www.npmjs.com/package/intlayer)           |
| `i18next/i18next`       | [![GitHub Repo stars](https://img.shields.io/github/stars/i18next/i18next?style=for-the-badge&label=%E2%AD%90%20stars)](https://github.com/i18next/i18next/stargazers)             | [![GitHub commit activity](https://img.shields.io/github/commit-activity/t/i18next/i18next?style=for-the-badge&label=commits)](https://github.com/i18next/i18next/commits)             | [![Last Commit](https://img.shields.io/github/last-commit/i18next/i18next?style=for-the-badge)](https://github.com/i18next/i18next/commits)             | जनवरी 2012   | [![npm](https://img.shields.io/npm/v/i18next?style=for-the-badge)](https://www.npmjs.com/package/i18next)             | [![npm downloads](https://img.shields.io/npm/dm/i18next?style=for-the-badge)](https://www.npmjs.com/package/i18next)             |
| `i18next/react-i18next` | [![GitHub Repo stars](https://img.shields.io/github/stars/i18next/react-i18next?style=for-the-badge&label=%E2%AD%90%20stars)](https://github.com/i18next/react-i18next/stargazers) | [![GitHub commit activity](https://img.shields.io/github/commit-activity/t/i18next/react-i18next?style=for-the-badge&label=commits)](https://github.com/i18next/react-i18next/commits) | [![Last Commit](https://img.shields.io/github/last-commit/i18next/react-i18next?style=for-the-badge)](https://github.com/i18next/react-i18next/commits) | दिसंबर 2015  | [![npm](https://img.shields.io/npm/v/react-i18next?style=for-the-badge)](https://www.npmjs.com/package/react-i18next) | [![npm downloads](https://img.shields.io/npm/dm/react-i18next?style=for-the-badge)](https://www.npmjs.com/package/react-i18next) |
| `i18next/next-i18next`  | [![GitHub Repo stars](https://img.shields.io/github/stars/i18next/next-i18next?style=for-the-badge&label=%E2%AD%90%20stars)](https://github.com/i18next/next-i18next/stargazers)   | [![GitHub commit activity](https://img.shields.io/github/commit-activity/t/i18next/next-i18next?style=for-the-badge&label=commits)](https://github.com/i18next/next-i18next/commits)   | [![Last Commit](https://img.shields.io/github/last-commit/i18next/next-i18next?style=for-the-badge)](https://github.com/i18next/next-i18next/commits)   | नवंबर 2018   | [![npm](https://img.shields.io/npm/v/next-i18next?style=for-the-badge)](https://www.npmjs.com/package/next-i18next)   | [![npm downloads](https://img.shields.io/npm/dm/next-i18next?style=for-the-badge)](https://www.npmjs.com/package/next-i18next)   |

> बैज अपने आप अपडेट होते हैं। आंकड़े समय के साथ बदल सकते हैं।

## तुलनात्मक फीचर विश्लेषण

| फीचर                                          | Intlayer (`react-intlayer` / `next-intlayer`)                                 | i18next (`react-i18next` / `next-i18next`)                              |
| --------------------------------------------- | ----------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| **कंपोनेंट के पास अनुवाद**                    | ✅ हाँ, `.content.ts` प्रत्येक कंपोनेंट के साथ स्थित                          | ❌ नहीं, `locales/{lng}/{ns}.json` में केंद्रीकृत                       |
| **TypeScript एकीकरण**                         | ✅ कंटेंट से स्वतः सख्त प्रकार उत्पन्न                                        | ⚠️ बुनियादी; सख्त कुंजियों के लिए `CustomTypeOptions` विस्तार आवश्यक    |
| **छूटे हुए अनुवाद का पता लगाना**              | ✅ TypeScript त्रुटि + बिल्ड समय पर त्रुटि/चेतावनी                            | ⚠️ रनटाइम फ़ॉलबैक (`saveMissing`, कुंजी की प्रतिध्वनि)                  |
| **रिच कंटेंट (JSX / Markdown / कंपोनेंट्स)**  | ✅ प्रत्यक्ष मूल समर्थन                                                       | ⚠️ अनुक्रमित प्लेसहोल्डर्स के साथ `<Trans>`                             |
| **ICU समर्थन**                                | ⚠️ प्रगति पर है                                                               | ⚠️ प्लगइन के माध्यम से (`i18next-icu`)                                  |
| **बहुवचन (Pluralization)**                    | ✅ गणना आधारित पैटर्न                                                         | ✅ `_one` / `_other` प्रत्यय (Intl.PluralRules)                         |
| **प्रारूपण (दिनांक, संख्याएँ, मुद्राएँ)**     | ✅ `useNumber`, `useDate`, आदि (आंतरिक रूप से Intl आधारित)                    | ⚠️ इंटरपोलेशन फॉर्मैटर्स या मैन्युअल `Intl.*` कॉल                       |
| **स्थानीयकृत रूटिंग और मिडलवेयर**             | ✅ अंतर्निहित प्रॉक्सी/मिडलवेयर, `getMultilingualUrls`                        | ⚠️ मुख्य लाइब्रेरी में नहीं; कस्टम मिडलवेयर या तीसरे पक्ष के टूल आवश्यक |
| **SEO हेल्पर्स (hreflang, sitemap, robots)**  | ✅ अंतर्निहित सहायता                                                          | ❌ मैन्युअल                                                             |
| **सिंक्रोनस सर्वर कंपोनेंट्स**                | ✅ `next-intlayer/server` से `useIntlayer` किसी भी सर्वर कंपोनेंट में चलता है | ⚠️ पेज स्तर पर `getFixedT`, फिर Props के रूप में `t` को नीचे भेजना      |
| **ट्री-शेकिंग (केवल प्रयुक्त सामग्री शामिल)** | ✅ कंपोनेंट और भाषा स्तर पर कंपाइलर द्वारा स्वचालित                           | ⚠️ मैन्युअल: नेमस्पेस + पेज स्तर पर `ns` सूची + बैकएंड                  |
| **लेज़ी लोडिंग (Lazy loading)**               | ✅ `importMode: 'dynamic'` (कॉन्फ़िगरेशन की एक पंक्ति)                        | ✅ बैकएंड प्लगइन्स के माध्यम से (`i18next-resources-to-backend` आदि)    |
| **अप्रयुक्त सामग्री हटाना (Purge)**           | ✅ अप्रयुक्त शब्दकोश बिल्ड के समय हटा दिए जाते हैं                            | ❌ अंतर्निहित नहीं                                                      |
| **अनुवाद परीक्षण (CLI / CI)**                 | ✅ `npx intlayer content test`                                                | ⚠️ `i18next-parser` या बाहरी उपकरण                                      |
| **AI-संचालित अनुवाद**                         | ✅ अंतर्निहित, आपकी अपनी API कुंजियों का उपयोग करता है                        | ❌ नहीं (Locize एक अलग सशुल्क सेवा है)                                  |
| **विजुअल एडिटर / CMS**                        | ✅ मुफ़्त विजुअल एडिटर + वैकल्पिक CMS                                         | ❌ नहीं (Locize या बाहरी प्लेटफ़ॉर्म)                                   |
| **MCP सर्वर और Agent Skills**                 | ✅ समर्थित                                                                    | ❌ असमर्थित                                                             |
| **इकोसिस्टम और समुदाय**                       | ⚠️ नया लेकिन तेजी से बढ़ रहा है                                               | ✅ सबसे बड़ा और सबसे परिपक्व                                            |

## बेंचमार्क परिणाम

### क्या मापा गया

[Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom) सूट प्रत्येक लाइब्रेरी के साथ **समान एप्लिकेशन** बनाता है: **10 पेज** (home, about, blog, careers, contact, FAQ, pricing, products, settings, team), **10 भाषाएँ** (`en`, `fr`, `es`, `de`, `it`, `pt`, `zh`, `ja`, `ko`, `ru`), समान कंपोनेंट्स और समान कंटेंट। परीक्षण अंग्रेजी और फ्रेंच में किए गए। प्रत्येक लाइब्रेरी को चार **लोडिंग रणनीतियों** में परखा गया:

| रणनीति             | विवरण                                                                         | सामान्य उपयोग                     |
| ------------------ | ----------------------------------------------------------------------------- | --------------------------------- |
| **static**         | सभी भाषाएँ और सभी पेज एक साथ बंडल किए गए (`init()` में इनलाइन `resources`)    | त्वरित प्रोटोटाइप, AI-जनरेटेड कोड |
| **dynamic**        | केवल सक्रिय भाषा बैकएंड के माध्यम से लोड होती है, लेकिन सभी नेमस्पेस एक साथ   | अधिकांश सामान्य प्रोजेक्ट्स       |
| **scoped-static**  | प्रति रूट एक नेमस्पेस, सभी पहले से बंडल                                       | दुर्लभ                            |
| **scoped-dynamic** | प्रति रूट एक नेमस्पेस + बैकएंड लेज़ी लोडिंग। केवल वर्तमान पेज और वर्तमान भाषा | सख्त प्रदर्शन बजट वाले एप्लिकेशन  |

Intlayer में कोई "scoped" संस्करण नहीं है: कंपाइलर स्वचालित रूप से **प्रति कंपोनेंट** सामग्री को अलग करता है, इसलिए इसके `static` और `dynamic` विकल्प पहले से ही अनुकूलित हैं।

प्रत्येक बिल्ड के लिए दर्ज किए गए मेट्रिक्स:

- **Lib size**: केवल i18n लाइब्रेरी आयात करने वाले खाली कंपोनेंट का gzip आकार।
- **Page JS**: प्रति पेज डाउनलोड किया गया औसत JavaScript gzip आकार।
- **Locale leak %**: डाउनलोड किए गए JS में उन अनुवादित स्ट्रिंग्स का अनुपात जो उस भाषा से संबंधित हैं जिसे उपयोगकर्ता **नहीं** देख रहा है।
- **Page leak %**: डाउनलोड किए गए JS में उन अनुवादित स्ट्रिंग्स का अनुपात जो उस पेज से संबंधित हैं जिस पर उपयोगकर्ता **नहीं** है।
- **Component avg**: अलग से कंपाइल किए गए प्रत्येक कंपोनेंट का औसत gzip आकार।
- **E2E reactivity**: नई भाषा चुनने और DOM में `html[lang]` अपडेट होने के बीच का वास्तविक समय (Playwright, 5 पुनरावृत्तियाँ)।
- **Hydration**: React के हाइड्रेशन चरण की अवधि।

> नीचे दिए गए आंकड़े **2026-09-12** के परीक्षण से हैं, जिसमें `next-i18next` 16.3.0, `react-i18next` 17.0.13 और `intlayer` 9.5.1 का उपयोग किया गया। परीक्षण ऐप जानबूझकर छोटा रखा गया है, इसलिए लीकेज प्रतिशत एक **पैटर्न** दिखाते हैं: जैसे-जैसे आपकी सामग्री बढ़ेगी, लीकेज बढ़ेगा जबकि रनटाइम लागत स्थिर रहेगी।

### Next.js पर परिणाम (`next-i18next`)

वे मेट्रिक्स और लाइब्रेरीज़ चुनें जो आपके लिए महत्वपूर्ण हैं:

<I18nBenchmark framework="nextjs" vertical/>

| लाइब्रेरी                       | रणनीति         | Lib size (gz) | Page JS avg (gz) | Locale leak | Page leak | Component avg (gz) | E2E प्रतिक्रिया | Hydration |
| ------------------------------- | -------------- | ------------: | ---------------: | ----------: | --------: | -----------------: | --------------: | --------: |
| **base** (बिना i18n)            | -              |        0.0 KB |         141.0 KB |        0.0% |      0.0% |             0.9 KB |         13.4 ms |   11.8 ms |
| `next-i18next`                  | static         |       19.7 KB |         218.5 KB |        0.0% |     89.8% |            78.5 KB |         16.4 ms |   15.6 ms |
| `next-i18next`                  | dynamic        |       19.7 KB |         169.5 KB |       50.0% |     89.8% |            26.1 KB |         15.4 ms |   27.7 ms |
| `next-i18next`                  | scoped-static  |       19.7 KB |         220.1 KB |        0.0% |     89.8% |            78.9 KB |         16.4 ms |   14.7 ms |
| `next-i18next`                  | scoped-dynamic |       19.7 KB |         163.4 KB |        0.0% |      0.0% |            27.1 KB |         15.9 ms |   15.1 ms |
| **`next-intlayer`**             | static         |    **5.5 KB** |     **141.3 KB** |    **0.0%** |  **0.0%** |         **8.5 KB** |     **15.5 ms** |   16.9 ms |
| **`next-intlayer`**             | dynamic        |    **5.5 KB** |     **141.3 KB** |    **0.0%** |  **0.0%** |         **6.9 KB** |     **15.3 ms** |   15.9 ms |
| `@intlayer/next-i18next` (संगत) | static         |        9.4 KB |         150.7 KB |        0.0% |      0.0% |             9.7 KB |         10.7 ms |   11.3 ms |
| `@intlayer/next-i18next` (संगत) | dynamic        |        9.4 KB |         150.7 KB |        0.0% |      0.0% |             9.7 KB |         11.9 ms |   10.6 ms |

**डेटा का विश्लेषण**

- **रनटाइम लागत**: `react-i18next` के साथ `i18next` का कोर सबसे भारी रनटाइम है: खाली कंपोनेंट के लिए **19.7 KB gzip**, जबकि `next-intlayer` के लिए केवल 5.5 KB।
- **साधारण सेटअप की उच्च लागत**: `init()` में इनलाइन `resources` से **218.5 KB प्रति पेज** बनता है, जो बेस ऐप से +77.5 KB अधिक है। हर पेज हर नेमस्पेस को ढोता है।
- **अनुकूलन में भारी मेहनत**: बैकएंड (`dynamic`) पर जाने से 49 KB की बचत होती है लेकिन फिर भी **अन्य पेजों के 90% स्ट्रिंग्स लीक** होते हैं। रूट स्तर पर नेमस्पेस विभाजित करने (`scoped-dynamic`) पर 0% लीकेज के साथ आकार **163.4 KB** हो जाता है, जो फिर भी Intlayer (141.3 KB) से **+22.4 KB प्रति पेज भारी** है।
- **कंपोनेंट आकार**: `useTranslation()` का उपयोग करने वाला कंपोनेंट 26-79 KB में कंपाइल होता है; वही कंपोनेंट `useIntlayer()` के साथ केवल 6.9 KB में कंपाइल होता है।
- **हाइड्रेशन**: `dynamic` सेटअप में हाइड्रेशन 27.7 ms तक बढ़ जाता है क्योंकि React के हाइड्रेट होने से पहले i18next इंस्टेंस को क्लाइंट पर बैकएंड हल करना पड़ता है।

<ClickToOpenIframe
src="https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-nextjs.md"
width="100%"
height="600px"
style="border:none;"
/>

> पूरी तालिका, प्रत्येक लाइब्रेरी और प्रत्येक रणनीति [Next.js बेंचमार्क रिपोर्ट](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/benchmark/nextjs.md) में उपलब्ध है।

### TanStack Start पर परिणाम (`react-i18next`)

Next.js की विशेषताओं को अलग करके TanStack Start पर शुद्ध `react-i18next` के साथ समान परीक्षण:

| लाइब्रेरी            | रणनीति         | Lib size (gz) | Page JS avg (gz) | Locale leak | Page leak | Component avg (gz) | E2E प्रतिक्रिया | Hydration |
| -------------------- | -------------- | ------------: | ---------------: | ----------: | --------: | -----------------: | --------------: | --------: |
| **base** (बिना i18n) | -              |        0.0 KB |         111.0 KB |        0.0% |      0.0% |             0.7 KB |          8.1 ms |   21.6 ms |
| `react-i18next`      | static         |       18.4 KB |         180.3 KB |       50.0% |     89.8% |            24.3 KB |         12.9 ms |   85.1 ms |
| `react-i18next`      | dynamic        |       18.4 KB |         136.4 KB |       23.1% |     89.8% |            24.8 KB |        123.1 ms |   32.9 ms |
| `react-i18next`      | scoped-static  |       18.4 KB |         184.2 KB |       50.7% |     89.8% |            25.3 KB |        185.1 ms |   25.2 ms |
| `react-i18next`      | scoped-dynamic |       18.4 KB |         127.2 KB |        0.0% |      0.0% |            26.7 KB |         17.6 ms |   11.3 ms |
| **`intlayer`**       | static         |    **5.0 KB** |     **125.8 KB** |       50.0% |  **0.0%** |         **8.1 KB** |      **3.2 ms** |   11.5 ms |
| **`intlayer`**       | dynamic        |    **5.0 KB** |     **118.6 KB** |    **0.0%** |  **0.0%** |         **6.3 KB** |      **3.6 ms** |   14.1 ms |

**डेटा का विश्लेषण**

- साधारण `react-i18next` ऐप बेस ऐप की तुलना में **प्रति पेज +69 KB** अधिक डेटा भेजता है, और हाइड्रेशन में **85 ms** (बेस का 4 गुना) का समय लगता है क्योंकि पहली रेंडरिंग से पहले पूरे रिसोर्स ट्री को प्रोसेस किया जाता है।
- **भाषा बदलने में देरी**: बैकएंड के जरिए लेज़ी-लोडिंग करते समय भाषा बदलने पर नेटवर्क राउंड-ट्रिप की आवश्यकता होती है: `dynamic` में **123 ms** और `scoped-static` में **185 ms**। जबकि Intlayer दोनों मोड में **3-4 ms** में DOM अपडेट करता है।
- पूरी तरह से अनुकूलित `scoped-dynamic` 127.2 KB पर पहुँचता है, जो फिर भी Intlayer के `dynamic` से **+8.6 KB अधिक** है, और इसके लिए रूट-टू-नेमस्पेस मैप व Suspense बाउंड्री की आवश्यकता पड़ी।
- Intlayer का `static` विकल्प पहले से ही **0% पेज लीकेज** देता है क्योंकि केवल वर्तमान पेज के कंपोनेंट्स द्वारा आयातित शब्दकोश ही बंडल होते हैं। `importMode: 'dynamic'` चालू करने से भाषा लीकेज भी पूरी तरह समाप्त हो जाती है।
- **कंपोनेंट आकार**: `react-i18next` में प्रति कंपोनेंट 24-27 KB बनाम Intlayer में 6-8 KB।

<ClickToOpenIframe
src="https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-tanstack.md"
width="100%"
height="600px"
style="border:none;"
/>

> पूरी तालिका [TanStack Start बेंचमार्क रिपोर्ट](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/benchmark/tanstack.md) में उपलब्ध है।

## यह अंतर क्यों है? ग्लोबल इंस्टेंस बनाम कंपाइल किए गए शब्दकोश

![Centralized catalogs versus per-component dictionaries](https://github.com/aymericzip/intlayer/blob/main/docs/assets/project_stucture_18n_vs_intlayer.png?raw=true)

`i18next` को 2012 में एक रनटाइम के रूप में डिजाइन किया गया था: एक ग्लोबल इंस्टेंस संसाधन भंडार रखता है, प्लगइन्स इसे विस्तारित करते हैं, और रेंडर समय पर `t()` कुंजियों को खोजता है। यह इसे अत्यधिक लचीला बनाता है लेकिन भारी भी बनाता है:

```bash
.
├── i18n.ts                      # createInstance().use(...).use(...).init({...})
└── src
    ├── locales
    │   ├── en
    │   │   ├── common.json
    │   │   ├── home.json
    │   │   └── about.json
    │   └── fr
    │       ├── common.json
    │       ├── home.json
    │       └── about.json
    ├── components
    │   └── Counter.tsx          # useTranslation("about") + t("counter.label")
    └── app
        └── [locale]
            └── about
                └── page.tsx     # इसे जानना होगा कि इसे ["common", "about"] की आवश्यकता है
```

ग्लोबल इंस्टेंस यह अनुमान नहीं लगा सकता कि कंपोनेंट को किन कुंजियों की आवश्यकता होगी, इसलिए यह उन सभी नेमस्पेस को बनाए रखता है जिन्हें लोड करने के लिए कहा गया है। अनुकूलन का अर्थ है कि **आप** फाइलों को विभाजित करें, **आप** प्रत्येक पेज के लिए आवश्यक नेमस्पेस सूचीबद्ध करें, और कंपोनेंट बदलने पर उस सूची को बनाए रखें।

लागत एक साथ दो अक्षों पर बढ़ती है, पेज और भाषाएँ:

![Theoretical content leakage by architecture](https://github.com/aymericzip/intlayer/blob/main/docs/assets/theorical_content_leakage.webp?raw=true)

जैसा कि [बेंचमार्क रिपोर्ट](https://github.com/intlayer-org/benchmark-bloom/blob/main/report/NOTE.md) में कहा गया है: "टाइप सुरक्षा बनाए रखना और यह जानना कि किस पेज पर कौन सा नेमस्पेस चाहिए, एक दुःस्वप्न है।"

Intlayer ग्लोबल इंस्टेंस को पूरी तरह समाप्त कर देता है। कंटेंट सीधे कंपोनेंट के बगल में घोषित होता है, और कंपाइलर बिल्ड समय पर निर्भरता ट्री को हल करता है:

```bash
.
├── intlayer.config.ts
└── src
    ├── components
    │   └── Counter
    │       ├── index.tsx        # useIntlayer("counter")
    │       └── index.content.ts
    └── app
        └── [locale]
            └── about
                ├── page.tsx
                └── page.content.ts
```

`@intlayer/swc` / `@intlayer/babel` यह पहचानता है कि कौन सा कंपोनेंट किस शब्दकोश को आयात करता है, केवल उन्हें और केवल सक्रिय भाषा के लिए बंडल करता है, और बाकी को हटा देता है। "scoped-dynamic" पैटर्न बिल्ड का स्वचालित परिणाम बन जाता है।

> `dynamic` पंक्ति के परिणाम प्राप्त करने के लिए `intlayer.config.ts` में `dictionary.importMode: 'dynamic'` सेट करें। अधिक जानकारी के लिए [बंडल ऑप्टिमाइज़ेशन दस्तावेज़](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/bundle_optimization.md) देखें।

## डेवलपर अनुभव (DX)

### सेटअप

<Tabs defaultTab="intlayer" group="techno">
<Tab label="next-i18next" value="i18next">

```ts fileName="src/app/i18n/server.ts"
import { createInstance } from "i18next";
import { initReactI18next } from "react-i18next/initReactI18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { defaultLocale } from "@/i18n.config";

const backend = resourcesToBackend(
  (locale: string, namespace: string) =>
    import(`../../locales/${locale}/${namespace}.json`)
);

export const initI18next = async (
  locale: string,
  namespaces: string[] = ["common"]
) => {
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
};
```

इसके अलावा क्लाइंट-साइड `I18nProvider`, `generateStaticParams`, और हर पेज पर `namespaces` सूची को बनाए रखना पड़ता है।

</Tab>
<Tab label="Intlayer" value="intlayer">

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

```tsx fileName="src/app/[locale]/layout.tsx"
import { getHTMLTextDir } from "intlayer";
import { IntlayerClientProvider, type NextLayoutIntlayer } from "next-intlayer";

const LocaleLayout: NextLayoutIntlayer = async ({ children, params }) => {
  const { locale } = await params;

  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <body>
        <IntlayerClientProvider locale={locale}>
          {children}
        </IntlayerClientProvider>
      </body>
    </html>
  );
};

export default LocaleLayout;
```

</Tab>
</Tabs>

### क्लाइंट कंपोनेंट

<Tabs defaultTab="intlayer" group="techno">
<Tab label="react-i18next" value="i18next">

```json fileName="src/locales/en/about.json"
{
  "counter": {
    "label": "Counter",
    "increment": "Increment"
  }
}
```

```tsx fileName="src/components/Counter.tsx"
"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";

export const Counter = () => {
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
```

> इस कंपोनेंट को रेंडर करने वाले पेज को `about` नेमस्पेस लोड करना होगा, और `CustomTypeOptions` का विस्तार किए बिना `t("counter.label")` केवल एक सामान्य स्ट्रिंग है।

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

`label` और `increment` पूरी तरह से टाइप-सुरक्षित हैं; वर्तनी की गलती TypeScript त्रुटि देती है और फ्रेंच अनुवाद गायब होने पर बिल्ड रुक जाता है।

</Tab>
</Tabs>

### सिंक्रोनस सर्वर कंपोनेंट

<Tabs defaultTab="intlayer" group="techno">
<Tab label="next-i18next" value="i18next">

```tsx fileName="src/components/ServerCounter.tsx"
type ServerCounterProps = {
  t: (key: string) => string;
  locale: string;
  count: number;
};

export const ServerCounter = ({ t, locale, count }: ServerCounterProps) => (
  <div>
    <p>{new Intl.NumberFormat(locale).format(count)}</p>
    <button aria-label={t("counter.label")}>{t("counter.increment")}</button>
  </div>
);
```

पेज को `i18n.getFixedT(locale, "about")` कॉल करके `t` और `locale` को Props के रूप में नीचे भेजना पड़ता है।

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

## i18next API बनाए रखें, Intlayer का बेहतर प्रदर्शन पाएं

बेंचमार्क परिणामों का लाभ उठाने के लिए आपको अपने कंपोनेंट्स को फिर से लिखने की आवश्यकता नहीं है। `@intlayer/i18next`, `@intlayer/react-i18next`, और `@intlayer/next-i18next` ड्रॉप-इन एडेप्टर हैं: `useTranslation`, `t()`, `<Trans>`, `{{interpolation}}`, बहुवचन और संदर्भ प्रत्यय बिना किसी बदलाव के काम करते रहते हैं।

```ts fileName="next.config.ts"
import type { NextConfig } from "next";
import { createNextI18nPlugin } from "@intlayer/next-i18next/plugin";

const withIntlayer = createNextI18nPlugin();

const nextConfig: NextConfig = {};

export default withIntlayer(nextConfig);
```

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import { reactI18nextVitePlugin } from "@intlayer/react-i18next/plugin";

export default defineConfig({
  plugins: [reactI18nextVitePlugin()],
});
```

बेंचमार्क में, उसी Next.js ऐप का संगत बिल्ड एप्लिकेशन कोड को छुए बिना **218.5 KB से 150.7 KB** प्रति पेज, कंपोनेंट **78.5 KB से 9.7 KB**, पेज लीकेज **~90% से 0%**, और हाइड्रेशन 15.6 ms से घटकर 11.3 ms हो गया। आपकी मौजूदा `locales/{lng}/{ns}.json` फाइलें JSON सिंक प्लगइन के माध्यम से प्राथमिक डेटा स्रोत बनी रह सकती हैं।

माइग्रेशन गाइड देखें: [i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/migration_from_i18next_to_intlayer.md), [react-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/migration_from_react-i18next_to_intlayer.md), [next-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/migration_from_next-i18next_to_intlayer.md)।

## कब किसका चयन करें?

<AccordionGroup>
<Accordion header="i18next चुनें">

यदि आपको इसके विशाल प्लगइन इकोसिस्टम की आवश्यकता है, आप React के बाहर भी स्थानीयकरण करते हैं (Node सेवाएँ, Vanilla JS, अन्य फ्रेमवर्क), आपकी टीम पहले से इसमें कुशल है, या कोई अनुवाद प्लेटफ़ॉर्म `locales/{lng}/{ns}.json` फ़ाइलों की अपेक्षा करता है। प्रदर्शन महत्वपूर्ण होने पर नेमस्पेस विभाजन और पेज मैपिंग के लिए समय निकालें।

</Accordion>
<Accordion header="Intlayer चुनें">

आप **कंपोनेंट-स्कोप सामग्री**, **सख्त TypeScript**, **बिल्ड-टाइम छूटी हुई कुंजियों पर त्रुटियाँ**, **शून्य-प्रयास ट्री-शेकिंग और लेज़ी लोडिंग**, त्वरित भाषा स्विचिंग, सिंक्रोनस सर्वर कंपोनेंट और अंतर्निहित संपादन उपकरण ([विज़ुअल एडिटर](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_visual_editor.md), [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_CMS.md), [AI अनुवाद](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/autoFill.md), [MCP सर्वर](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/mcp_server.md)) चाहते हैं। विशेष रूप से बड़े, मॉड्यूलर कोडबेस और डिज़ाइन सिस्टम के लिए उपयुक्त।

</Accordion>
<Accordion header="@intlayer/*-i18next एडेप्टर चुनें">

आप पहले से ही i18next पर हैं और कंपोनेंट्स को दोबारा लिखे बिना बंडल और प्रतिक्रियाशीलता का लाभ चाहते हैं। आपकी `locales/{lng}/{ns}.json` फ़ाइलें सच्चाई का स्रोत बनी रहती हैं। [i18next vs @intlayer/i18next](https://github.com/aymericzip/intlayer/blob/main/docs/blog/hi/i18next_vs_intlayer-i18next.md) में एक साथ मापा गया।

</Accordion>
</AccordionGroup>

## FAQ (अक्सर पूछे जाने वाले प्रश्न)

<FAQ>

<Question title="i18next अन्य लाइब्रेरीज़ की तुलना में इतनी भारी क्यों है?">

इसे फ्रेमवर्क-अज्ञेय रनटाइम के रूप में डिज़ाइन किया गया था: एक वैश्विक इंस्टेंस, एक प्लगइन पाइपलाइन, एक संसाधन स्टोर, एक कुंजी समाधानकर्ता। यह लचीलापन प्रत्येक बंडल में संकलित होता है। एक खाली कंपोनेंट जो केवल लाइब्रेरी को आयात करता है, `next-i18next` के साथ **19.7 KB gzip** और `next-intlayer` के साथ **5.5 KB** खर्च करता है, और यह लागत प्रत्येक पेज पर चुकानी पड़ती है चाहे आपकी सामग्री का वजन कुछ भी हो।

</Question>

<Question title="क्या बैकएंड के साथ लेज़ी लोडिंग इसे ठीक कर देती है?">

यह बाइट्स को ठीक करता है, लेटेंसी को नहीं। `i18next-resources-to-backend` पर जाने से प्रति पेज ~49 KB की बचत होती है लेकिन भाषा स्विच पर नेटवर्क राउंड-ट्रिप जुड़ जाता है: `dynamic` सेटअप में **123 ms** और `scoped-static` में **185 ms**, जबकि Intlayer के साथ **3-4 ms**। हाइड्रेशन भी 27.7 ms तक बढ़ जाता है क्योंकि React के हाइड्रेट होने से पहले इंस्टेंस अपने बैकएंड को हल करता है।

</Question>

<Question title="क्या मैं i18next के साथ 0% लीकेज तक पहुँच सकता हूँ?">

हाँ, `scoped-dynamic` के साथ: प्रति रूट एक नेमस्पेस, एक संसाधन बैकएंड और हाथ से बनाए रखा जाने वाला पेज-टू-नेमस्पेस मैप। यह Next.js पर प्रति पेज 163.4 KB पर पहुँचता है, जो अभी भी Intlayer के 141.3 KB से **+22 KB** अधिक है, जिसके लिए किसी कॉन्फ़िगरेशन की आवश्यकता नहीं थी। देखें [बंडल अनुकूलन](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/bundle_optimization.md)।

</Question>

<Question title="क्या मुझे माइग्रेट करने के लिए अपने कंपोनेंट्स को दोबारा लिखना होगा?">

नहीं। `@intlayer/i18next`, `@intlayer/react-i18next` और `@intlayer/next-i18next` `useTranslation`, `t()`, `<Trans>`, `{{interpolation}}`, `_one` / `_other` बहुवचन, संदर्भ प्रत्यय और `returnObjects` को बनाए रखते हैं। `next.config.ts` या `vite.config.ts` में केवल एक प्लगइन लाइन। [next-i18next माइग्रेशन गाइड](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/migration_from_next-i18next_to_intlayer.md) में चरण-दर-चरण।

</Question>

<Question title="मेरे i18next प्लगइन्स का क्या होता है?">

बैकएंड और भाषा डिटेक्टर स्वीकार किए जाते हैं लेकिन निष्क्रिय रहते हैं: रनटाइम पर लोड या पता लगाने के लिए कुछ नहीं बचता है। भाषा का पता लगाना Intlayer का रूटिंग कॉन्फ़िगरेशन (URL उपसर्ग, कुकी, हेडर) बन जाता है। यदि आपका ऐप अनुरोध के समय CMS से अनुवाद प्राप्त करता है, तो इसके बजाय [Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_CMS.md) या `intlayer pull` / `push` का उपयोग करें।

</Question>

</FAQ>

## संबंधित तुलनात्मक लेख

वही बेंचमार्क, अन्य लाइब्रेरीज़:

- [next-intl vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/hi/next-intl_vs_intlayer.md)
- [Lingui vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/hi/lingui_vs_intlayer.md)
- [vue-i18n vs Intlayer benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/blog/hi/vue-i18n_vs_intlayer_benchmark.md)
- [next-i18next vs next-intl vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/hi/next-i18next_vs_next-intl_vs_intlayer.md)
- [react-i18next vs react-intl vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/hi/react-i18next_vs_react-intl_vs_intlayer.md)

i18next पर और आगे जानें:

- [i18next vs @intlayer/i18next](https://github.com/aymericzip/intlayer/blob/main/docs/blog/hi/i18next_vs_intlayer-i18next.md), उसी ऐप पर मापे गए एडेप्टर
- [क्या i18next पुराना हो चुका है?](https://github.com/aymericzip/intlayer/blob/main/docs/blog/hi/is_i18next_outdated.md)
- [i18next के साथ Intlayer का उपयोग करना](https://github.com/aymericzip/intlayer/blob/main/docs/blog/hi/intlayer_with_i18next.md) और [react-i18next के साथ](https://github.com/aymericzip/intlayer/blob/main/docs/blog/hi/intlayer_with_react-i18next.md)
- [next-i18next के साथ Next.js ऐप का अंतर्राष्ट्रीयकरण कैसे करें](https://github.com/aymericzip/intlayer/blob/main/docs/blog/hi/i18n_using_next-i18next.md)

संदर्भ दस्तावेज़:

- [Next.js बेंचमार्क रिपोर्ट](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/benchmark/nextjs.md) और [TanStack Start बेंचमार्क रिपोर्ट](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/benchmark/tanstack.md)
- संगतता एडेप्टर: [i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/compat/i18next.md), [react-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/compat/react-i18next.md), [next-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/compat/next-i18next.md)
- माइग्रेशन गाइड: [i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/migration_from_i18next_to_intlayer.md), [react-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/migration_from_react-i18next_to_intlayer.md), [next-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/migration_from_next-i18next_to_intlayer.md)
- [बंडल अनुकूलन](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/bundle_optimization.md) और [Intlayer कंपाइलर](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/compiler.md)
- [प्रति-कंपोनेंट बनाम केंद्रीकृत i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/hi/per-component_vs_centralized_i18n.md)
- [कंपाइलर-संचालित बनाम घोषणात्मक i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/hi/compiler_vs_declarative_i18n.md)

## GitHub स्टार्स

GitHub स्टार्स किसी प्रोजेक्ट की लोकप्रियता, सामुदायिक विश्वास और दीर्घकालिक प्रासंगिकता का एक स्पष्ट संकेत हैं। हालांकि वे सीधे तकनीकी गुणवत्ता का पैमाना नहीं हैं, वे दिखाते हैं कि कितने डेवलपर्स इसे उपयोगी पाते हैं और अपना रहे हैं।

[![स्टार इतिहास चार्ट](https://api.star-history.com/chart?repos=i18next%2Fi18next%2Ci18next%2Freact-i18next%2Ci18next%2Fnext-i18next%2Caymericzip%2Fintlayer&type=date&legend=top-left)](https://star-history.com/#i18next/i18next&i18next/react-i18next&i18next/next-i18next&aymericzip/intlayer)

## निष्कर्ष

`i18next` ने अपना सम्मानजनक स्थान बनाया है: यह हर जगह काम करता है, हर चीज़ के लिए प्लगइन प्रदान करता है, और इसे एक दशक से अधिक समय से संवारा गया है। लेकिन बेंचमार्क इसके रनटाइम-केंद्रित डिज़ाइन की लागत को उजागर करता है। सामान्य सेटअप **प्रति पेज +70-77 KB gzip** जोड़ता है, **~90% अन्य पेजों की सामग्री लीक** करता है, और भाषा बदलने में **100 ms से अधिक** समय लेता है। इसे शून्य तक ले जाना संभव है लेकिन उसके लिए भारी मैन्युअल प्रबंधन की आवश्यकता होती है।

Intlayer इस पूरे कार्य को कंपाइलर पर स्थानांतरित करता है। प्रति-कंपोनेंट शब्दकोश, प्रति-भाषा लेज़ी लोडिंग और अप्रयुक्त सामग्री को हटाना बिल्ड के स्वाभाविक परिणाम हैं। उसी ऐप पर: **प्रति पेज केवल +0.3 KB**, **0% लीकेज**, कंपोनेंट्स **3-10 गुना छोटे**, और भाषा स्विचिंग मात्र **3-4 ms** में।

सभी आंकड़े, परीक्षण एप्लिकेशन और स्क्रिप्ट [Benchmark Bloom रिपॉजिटरी](https://github.com/intlayer-org/benchmark-bloom) में सार्वजनिक रूप से उपलब्ध हैं।

अधिक जानकारी के लिए ['Intlayer क्यों चुनें?' दस्तावेज़](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/interest_of_intlayer.md) देखें।
