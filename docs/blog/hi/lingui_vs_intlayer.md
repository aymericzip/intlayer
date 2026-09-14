---
createdAt: 2026-09-13
updatedAt: 2026-09-13
title: "Lingui बनाम Intlayer: 2026 बेंचमार्क और तुलना"
description: "Next.js और TanStack Start पर मापी गई दो कंपाइलर-आधारित i18n लाइब्रेरी। बंडल साइज़, कंटेंट लीकेज, कंपोनेंट साइज़, हाइड्रेशन, लोकेल-स्विच प्रतिक्रियाशीलता और डेवलपर अनुभव।"
keywords:
  - Lingui
  - Intlayer
  - Internationalization
  - i18n
  - Benchmark
  - Bundle size
  - Compiler
  - Blog
  - Next.js
  - TanStack Start
  - JavaScript
  - React
slugs:
  - blog
  - lingui-vs-intlayer
author: aymericzip
---

# Lingui VS Intlayer | React और Next.js अंतर्राष्ट्रीयकरण (i18n) बेंचमार्क

Lingui और Intlayer इस बेंचमार्क में दो ऐसी लाइब्रेरी हैं जो केवल रनटाइम पर निर्भर रहने के बजाय एक **कंपाइलर** का उपयोग करती हैं। Lingui बिल्ड टाइम पर मैक्रोज़ से संदेश निकालता है और प्रति लोकेल कैटलॉग कंपाइल करता है। Intlayer प्रति-कंपोनेंट डिक्शनरी कंपाइल करता है और उन्हें प्रति लोकेल ट्री-शेक करता है। कागज़ पर वे काफी करीब दिखने चाहिए। आंकड़े दिखाते हैं कि वे कहाँ भिन्न होते हैं।

डेटा [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom) से आता है, जो एक ओपन-सोर्स सुइट है जो प्रत्येक लाइब्रेरी के साथ समान एप्लिकेशन बनाता है और रिकॉर्ड करता है कि ब्राउज़र वास्तव में क्या डाउनलोड और निष्पादित करता है।

<TOC/>

> **संक्षेप में (tl;dr)**: Lingui रॉ पर-पेज जावास्क्रिप्ट पर Intlayer के सबसे करीब है: लेज़ी लोडिंग कॉन्फ़िगर होने के बाद TanStack Start पर **115-120 KB** बनाम **118.6 KB**, Next.js पर **148.6 KB** बनाम **141.3 KB**। अंतर अन्य स्थानों पर खुलता है: अलग से कंपाइल किया गया Lingui कंपोनेंट Intlayer के **6-8 KB** के मुकाबले **58-153 KB** का होता है, हाइड्रेशन Intlayer के **11-14 ms** के मुकाबले **28-34 ms** लेता है, सोर्स-लोकेल फ़ॉलबैक हर ऑप्टिमाइज़्ड सेटअप में `fr` पेजों में `en` स्ट्रिंग्स का **3-15%** लीक करता है, और उस ऑप्टिमाइज़्ड सेटअप तक पहुँचने का मतलब है कैटलॉग को मैन्युअल रूप से एक्सट्रैक्ट करना, कंपाइल करना और रूट के अनुसार चुनना। Intlayer बिना किसी कॉन्फ़िगरेशन के यह हासिल करता है।

## संक्षेप में

- **Lingui** - मैक्रो-आधारित (`` t`...` ``, `<Trans>`, `msg`), ICU MessageFormat, `.po` / JSON कैटलॉग, `lingui extract` + `lingui compile` वर्कफ़्लो। संदेश आईडी को छोटे हैश में कंपाइल करता है, प्रति लोकेल डायनेमिक कैटलॉग लोडिंग का समर्थन करता है। सुस्थापित, फ्रेमवर्क-अज्ञेयवादी, `.po` के आसपास अनुवादक टूलिंग का मजबूत इतिहास।
- **Intlayer** - कंपोनेंट-केंद्रित कंटेंट मॉडल। `.content.ts` डिक्शनरी उस कंपोनेंट के बगल में बैठती है जिसकी वे सेवा करती हैं, एक बिल्ड-टाइम कंपाइलर उन्हें प्रति कंपोनेंट और प्रति लोकेल ट्री-शेक और लेज़ी-लोड करता है, आपकी सामग्री से सख्त TypeScript प्रकार उत्पन्न होते हैं, और गायब अनुवाद बिल्ड समय पर विफल होते हैं। मिडलवेयर, SEO हेल्पर्स, विजुअल एडिटर / CMS और AI-असिस्टेड अनुवाद शामिल हैं।

| लाइब्रेरी             | GitHub स्टार्स                                                                                                                                                                 | कुल कमिट्स                                                                                                                                                                         | अंतिम कमिट                                                                                                                                          | पहला संस्करण | NPM संस्करण                                                                                                         | NPM डाउनलोड्स                                                                                                                  |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ | ------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `aymericzip/intlayer` | [![GitHub Repo stars](https://img.shields.io/github/stars/aymericzip/intlayer?style=for-the-badge&label=%E2%AD%90%20stars)](https://github.com/aymericzip/intlayer/stargazers) | [![GitHub commit activity](https://img.shields.io/github/commit-activity/t/aymericzip/intlayer?style=for-the-badge&label=commits)](https://github.com/aymericzip/intlayer/commits) | [![Last Commit](https://img.shields.io/github/last-commit/aymericzip/intlayer?style=for-the-badge)](https://github.com/aymericzip/intlayer/commits) | अप्रैल 2024  | [![npm](https://img.shields.io/npm/v/intlayer?style=for-the-badge)](https://www.npmjs.com/package/intlayer)         | [![npm downloads](https://img.shields.io/npm/dm/intlayer?style=for-the-badge)](https://www.npmjs.com/package/intlayer)         |
| `lingui/js-lingui`    | [![GitHub Repo stars](https://img.shields.io/github/stars/lingui/js-lingui?style=for-the-badge&label=%E2%AD%90%20stars)](https://github.com/lingui/js-lingui/stargazers)       | [![GitHub commit activity](https://img.shields.io/github/commit-activity/t/lingui/js-lingui?style=for-the-badge&label=commits)](https://github.com/lingui/js-lingui/commits)       | [![Last Commit](https://img.shields.io/github/last-commit/lingui/js-lingui?style=for-the-badge)](https://github.com/lingui/js-lingui/commits)       | दिसंबर 2016  | [![npm](https://img.shields.io/npm/v/@lingui/core?style=for-the-badge)](https://www.npmjs.com/package/@lingui/core) | [![npm downloads](https://img.shields.io/npm/dm/@lingui/core?style=for-the-badge)](https://www.npmjs.com/package/@lingui/core) |

> बैज स्वचालित रूप से अपडेट होते हैं। समय के साथ स्नैपशॉट भिन्न हो सकते हैं।

## आमने-सामने सुविधा तुलना

| सुविधा                                           | Intlayer (`react-intlayer` / `next-intlayer`)                                            | Lingui (`@lingui/core` / `@lingui/react`)                                                  |
| ------------------------------------------------ | ---------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| **कंपोनेंट के पास अनुवाद**                       | ✅ हाँ, प्रत्येक कंपोनेंट के साथ `.content.ts` मौजूद                                     | ⚠️ मैक्रोज़ के माध्यम से JSX में इनलाइन स्ट्रिंग्स; केंद्रीकृत `.po` कैटलॉग में अनुवाद     |
| **TypeScript एकीकरण**                            | ✅ कंटेंट से ऑटो-जनरेटेड सख्त प्रकार                                                     | ⚠️ मैक्रोज़ टाइप किए गए हैं; मैसेज आईडी नहीं हैं, गायब कैटलॉग प्रविष्टियाँ सामने नहीं आतीं |
| **गायब अनुवादों का पता लगाना**                   | ✅ TypeScript एरर + बिल्ड-टाइम एरर/चेतावनी                                               | ⚠️ `lingui extract` आँकड़े रिपोर्ट करता है; रनटाइम सोर्स स्ट्रिंग पर फ़ॉलबैक करता है       |
| **रिच कंटेंट (JSX / Markdown / कंपोनेंट्स)**     | ✅ सीधा समर्थन                                                                           | ✅ नेस्टेड कंपोनेंट्स के साथ `<Trans>`                                                     |
| **ICU समर्थन**                                   | ⚠️ कार्य प्रगति पर                                                                       | ✅ हाँ (`plural`, `select`, `selectOrdinal` मैक्रोज़)                                      |
| **फ़ॉर्मेटिंग (तिथियाँ, संख्याएँ, मुद्राएँ)**    | ✅ `useNumber`, `useDate`, ... (हुड के तहत Intl)                                         | ✅ `i18n.date()`, `i18n.number()`                                                          |
| **स्थानीयकृत रूटिंग और मिडलवेयर**                | ✅ बिल्ट-इन प्रॉक्सी/मिडलवेयर, `getMultilingualUrls`                                     | ❌ कोर का हिस्सा नहीं                                                                      |
| **SEO हेल्पर्स (hreflang, sitemap, robots)**     | ✅ बिल्ट-इन हेल्पर्स                                                                     | ❌ मैन्युअल                                                                                |
| **सिंक्रोनस सर्वर कंपोनेंट्स**                   | ✅ `next-intlayer/server` से `useIntlayer` किसी भी चाइल्ड सर्वर कंपोनेंट में काम करता है | ⚠️ प्रति अनुरोध एक `I18n` इंस्टेंस की आवश्यकता होती है, जिसे पास किया जाए या सेट किया जाए  |
| **ट्री-शेकिंग (केवल उपयोग की गई सामग्री भेजना)** | ✅ प्रति कंपोनेंट, प्रति लोकेल, कंपाइलर द्वारा स्वचालित                                  | ⚠️ `lingui compile` द्वारा प्रति लोकेल; प्रति रूट मैन्युअल कैटलॉग विभाजन की आवश्यकता है    |
| **लेज़ी लोडिंग**                                 | ✅ `importMode: 'dynamic'` (कॉन्फ़िगरेशन की एक पंक्ति)                                   | ⚠️ कंपाइल किए गए कैटलॉग का मैन्युअल `import()` + `i18n.load()` / `i18n.activate()`         |
| **अप्रयुक्त सामग्री को हटाना**                   | ✅ अप्रयुक्त डिक्शनरी बिल्ड समय पर हटा दी जाती हैं                                       | ✅ `lingui extract --clean` अप्रचलित संदेशों को हटाता है                                   |
| **गायब अनुवादों का परीक्षण (CLI / CI)**          | ✅ `npx intlayer content test`                                                           | ⚠️ `lingui extract` आँकड़े (डिफ़ॉल्ट रूप से कोई फ़ेलिंग एग्जिट कोड नहीं)                   |
| **बिल्ड पाइपलाइन**                               | ✅ एक प्लगइन (`@intlayer/swc` / `@intlayer/babel` / `vite-intlayer`)                     | ⚠️ मैक्रो प्लगइन (Babel या SWC) + `extract` + `compile` चरण                                |
| **AI-संचालित अनुवाद**                            | ✅ बिल्ट-इन, आपकी अपनी प्रदाता कुंजियों का उपयोग करता है                                 | ❌ नहीं                                                                                    |
| **विजुअल एडिटर / CMS**                           | ✅ निःशुल्क विजुअल एडिटर + वैकल्पिक CMS                                                  | ❌ नहीं (`.po` बाहरी TMS के साथ काम करता है)                                               |
| **MCP सर्वर और एजेंट स्किल्स**                   | ✅ हाँ                                                                                   | ❌ नहीं                                                                                    |
| **इकोसिस्टम / समुदाय**                           | ⚠️ छोटा लेकिन तेजी से बढ़ रहा है                                                         | ✅ स्थापित, फ्रेमवर्क-अज्ञेयवादी                                                           |

## बेंचमार्क

### क्या मापा गया था

[Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom) सुइट प्रत्येक लाइब्रेरी के साथ **समान एप्लिकेशन** बनाता है: **10 पेज** (home, about, blog, careers, contact, FAQ, pricing, products, settings, team), **10 लोकेल** (`en`, `fr`, `es`, `de`, `it`, `pt`, `zh`, `ja`, `ko`, `ru`), समान कंपोनेंट और समान कंटेंट। पेजों को `en` और `fr` में मापा जाता है। प्रत्येक लाइब्रेरी को चार **लोडिंग रणनीतियों** तक लागू किया गया है, सरल सेटअप से लेकर इष्टतम तक:

| रणनीति             | विवरण                                                                                   | यह कौन करता है                    |
| ------------------ | --------------------------------------------------------------------------------------- | --------------------------------- |
| **static**         | प्रत्येक लोकेल का कंपाइल किया गया कैटलॉग शुरू में ही इम्पोर्ट और लोड किया जाता है       | त्वरित प्रोटोटाइप, AI-जनरेटेड कोड |
| **dynamic**        | केवल सक्रिय लोकेल का कैटलॉग `import()` किया जाता है, लेकिन इसमें सभी पेज शामिल होते हैं | अधिकांश प्रोजेक्ट्स               |
| **scoped-static**  | प्रति रूट एक कैटलॉग, सभी को शुरू में बंडल किया गया                                      | दुर्लभ                            |
| **scoped-dynamic** | प्रति रूट एक कैटलॉग + लेज़ी `import()`। केवल वर्तमान पेज, वर्तमान लोकेल                 | सख्त प्रदर्शन बजट वाले ऐप्स       |

Intlayer में कोई "scoped" संस्करण नहीं है: कंपाइलर स्वचालित रूप से **प्रति कंपोनेंट** सामग्री को स्कोप करता है, इसलिए इसकी `static` और `dynamic` पंक्तियाँ पहले से ही स्कोप्ड हैं।

प्रत्येक बिल्ड के लिए, सुइट रिकॉर्ड करता है:

- **Lib size**: केवल i18n लाइब्रेरी इम्पोर्ट करने वाले खाली कंपोनेंट का gzip आकार। रनटाइम की निश्चित लागत।
- **Page JS**: प्रति पेज डाउनलोड किया गया gzip जावास्क्रिप्ट, सभी पेजों और लोकेल्स पर औसत।
- **Locale leak %**: डाउनलोड किए गए JS में पाए गए अनूदित स्ट्रिंग्स का हिस्सा जो उस लोकेल से संबंधित हैं जिसे उपयोगकर्ता **नहीं** देख रहा है (`en` और `fr` पर फिंगरप्रिंट किया गया, इसलिए 50% का मतलब है "अन्य मापा गया लोकेल पूरी तरह मौजूद है"; 10 लोकेल्स के साथ, वास्तविक बर्बादी अधिक होती है)।
- **Page leak %**: डाउनलोड किए गए JS में पाए गए अनूदित स्ट्रिंग्स का हिस्सा जो उस पेज से संबंधित हैं जिस पर उपयोगकर्ता **नहीं** है।
- **Component avg**: अलग से कंपाइल किए गए प्रत्येक कंपोनेंट का औसत gzip आकार। दिखाता है कि एक अकेला कंपोनेंट कितना i18n रनटाइम और कैटलॉग लाता है।
- **E2E reactivity**: नया लोकेल चुनने और DOM में `html[lang]` अपडेट होने के बीच का समय (Playwright, 5 पुनरावृत्तियाँ)।
- **Hydration**: React हाइड्रेशन चरण की अवधि।

> नीचे दिए गए आंकड़े **2026-09-12** के रन से हैं, जिसमें `@lingui/react` 6.6.0 और `intlayer` 9.5.1 शामिल हैं। परीक्षण एप्लिकेशन जानबूझकर छोटा है (प्रति लोकेल कुछ दर्जन स्ट्रिंग्स), इसलिए लीकेज प्रतिशत एक **पैटर्न** का वर्णन करते हैं: वे आपकी सामग्री के साथ बढ़ते हैं जबकि रनटाइम लागत स्थिर रहती है।

### Next.js पर परिणाम

| लाइब्रेरी            | रणनीति         | लाइब्रेरी साइज़ (gz) | पेज JS औसत (gz) | लोकेल लीक |  पेज लीक | कंपोनेंट औसत (gz) | E2E प्रतिक्रियाशीलता | हाइड्रेशन |
| -------------------- | -------------- | -------------------: | --------------: | --------: | -------: | ----------------: | -------------------: | --------: |
| **base** (बिना i18n) | -              |               0.0 KB |        141.0 KB |      0.0% |     0.0% |            0.9 KB |              13.4 ms |   11.8 ms |
| Lingui               | static         |              11.9 KB |        207.4 KB |     50.0% |    90.0% |           73.3 KB |              15.3 ms |   15.2 ms |
| Lingui               | dynamic        |              11.9 KB |        145.4 KB |      2.8% |    89.9% |           19.9 KB |              15.7 ms |   12.7 ms |
| Lingui               | scoped-static  |              11.9 KB |        148.2 KB |      2.7% |    89.1% |           20.4 KB |              15.1 ms |   13.1 ms |
| Lingui               | scoped-dynamic |              11.9 KB |        148.6 KB |     14.8% |     0.0% |          152.6 KB |              16.1 ms |   14.8 ms |
| **`next-intlayer`**  | static         |           **5.5 KB** |    **141.3 KB** |  **0.0%** | **0.0%** |        **8.5 KB** |          **15.5 ms** |   16.9 ms |
| **`next-intlayer`**  | dynamic        |           **5.5 KB** |    **141.3 KB** |  **0.0%** | **0.0%** |        **6.9 KB** |          **15.3 ms** |   15.9 ms |

**परिणामों को कैसे समझें**

- **रनटाइम लागत।** एक खाली कंपोनेंट Lingui के साथ 11.9 KB gzip और Intlayer के साथ 5.5 KB लेता है। पूरे पेज पर, Lingui का सबसे अच्छा कॉन्फ़िगरेशन Intlayer से **+7.3 KB** अधिक (148.6 बनाम 141.3 KB) है; Intlayer बेस ऐप से केवल **+0.3 KB** अधिक है।
- **सरल सेटअप महंगा है।** हर कंपाइल किए गए कैटलॉग को पहले से लोड करने पर **प्रति पेज 207.4 KB** मिलता है, जो बेस ऐप से +66 KB अधिक है। आधे फिंगरप्रिंट किए गए स्ट्रिंग्स गलत लोकेल से संबंधित हैं, 90% गलत पेज से।
- **डायनेमिक लोडिंग लोकेल को ठीक करती है, पेज को नहीं।** प्रति लोकेल एक कैटलॉग के साथ, पेज लीकेज ~90% पर रहता है: हर फ्रेंच पेज पर पूरा `fr` कैटलॉग भेजा जाता है। 0% पेज लीकेज तक पहुँचने के लिए `scoped-dynamic` सेटअप की आवश्यकता होती है: प्रति रूट एक कैटलॉग, अलग से निकाला और कंपाइल किया गया, प्रत्येक पेज में मैन्युअल रूप से चुना गया।
- **सोर्स-लोकेल फ़ॉलबैक लीक होता है।** अनुकूलित सेटअप में भी, **`en` स्ट्रिंग्स का 3-15% `fr` पेजों के अंदर भेजा जाता है**। Lingui मैक्रोज़ सोर्स मैसेज को फ़ॉलबैक के रूप में उपलब्ध रखते हैं, इसलिए यह अनुवाद के बगल में बंडल में आ जाता है। Intlayer बिल्ड समय पर फ़ॉलबैक को हल करता है और केवल सक्रिय लोकेल को भेजता है।
- **`scoped-dynamic` में कंपोनेंट साइज़ बहुत बढ़ जाता है।** अलग से कंपाइल किए गए प्रत्येक कंपोनेंट का औसत **152.6 KB** होता है, क्योंकि हर रूट का कैटलॉग उस कंपोनेंट से पहुँच योग्य होता है जो इसे इम्पोर्ट करता है। `useIntlayer()` के साथ वही कंपोनेंट औसतन **6.9 KB** का होता है।

### TanStack Start पर परिणाम

| लाइब्रेरी                   | रणनीति         | लाइब्रेरी साइज़ (gz) | पेज JS औसत (gz) | लोकेल लीक |  पेज लीक | कंपोनेंट औसत (gz) | E2E प्रतिक्रियाशीलता | हाइड्रेशन |
| --------------------------- | -------------- | -------------------: | --------------: | --------: | -------: | ----------------: | -------------------: | --------: |
| **base** (बिना i18n)        | -              |               0.0 KB |        111.0 KB |      0.0% |     0.0% |            0.7 KB |               8.1 ms |   21.6 ms |
| Lingui                      | static         |              11.2 KB |        152.2 KB |     50.0% |    90.0% |           58.0 KB |               3.9 ms |   19.9 ms |
| Lingui                      | dynamic        |              11.2 KB |        115.2 KB |      9.3% |     0.0% |           85.5 KB |               5.9 ms |   28.0 ms |
| Lingui                      | scoped-static  |              11.2 KB |        120.8 KB |      4.0% |     0.0% |          147.9 KB |               7.1 ms |   33.9 ms |
| Lingui                      | scoped-dynamic |              11.2 KB |        120.2 KB |      8.6% |     0.0% |           83.7 KB |              42.1 ms |   32.9 ms |
| **`intlayer`**              | static         |           **5.0 KB** |    **125.8 KB** |     50.0% | **0.0%** |        **8.1 KB** |           **3.2 ms** |   11.5 ms |
| **`intlayer`**              | dynamic        |           **5.0 KB** |    **118.6 KB** |  **0.0%** | **0.0%** |        **6.3 KB** |           **3.6 ms** |   14.1 ms |
| `@intlayer/lingui` (संगतता) | dynamic        |              10.3 KB |        137.0 KB |      9.9% |     0.0% |           12.8 KB |               2.9 ms |   19.7 ms |

**परिणामों को कैसे समझें**

- **प्रति-पेज जावास्क्रिप्ट पर, Lingui थोड़े अंतर से जीतता है।** `dynamic` Lingui **115.2 KB** पर आता है, जो Intlayer के 118.6 KB से 3.4 KB कम है। हैशेड आईडी वाले Lingui के कंपाइल किए गए कैटलॉग कॉम्पैक्ट होते हैं, और TanStack Start राउटर रूट्स को इतनी अच्छी तरह से विभाजित करता है कि `dynamic` पंक्ति में पेज लीकेज पहले से ही 0% है।
- **पेज साइज़ के अलावा बाकी सब कुछ विपरीत दिशा में जाता है।** हाइड्रेशन Lingui के साथ **28-34 ms** लेता है बनाम Intlayer के साथ **11-14 ms**: React के हाइड्रेट होने से पहले क्लाइंट पर `i18n.load()` + `i18n.activate()` चलते हैं। अलग से कंपाइल किए गए कंपोनेंट्स का वजन **6-8 KB** के मुकाबले **58-148 KB** होता है। सोर्स-लोकेल फ़ॉलबैक के कारण लोकेल लीकेज कभी भी 0% (4-9%) तक नहीं पहुँचता है।
- **अनुकूलित सेटअप में लोकेल स्विचिंग धीमी है।** `scoped-dynamic` Lingui को `html[lang]` अपडेट करने में **42 ms** लगते हैं: स्विच दिखाई देने से पहले नए रूट कैटलॉग को फ़ेच, लोड और सक्रिय करना पड़ता है। Intlayer दोनों मोड में **3-4 ms** में स्विच करता है।
- **Intlayer की `static` पंक्ति में पहले से ही 0% पेज लीकेज है** क्योंकि केवल पेज के कंपोनेंट्स द्वारा इम्पोर्ट की गई डिक्शनरी ही बंडल की जाती हैं। कॉन्फ़िगरेशन की एक पंक्ति (`importMode: 'dynamic'`) लोकेल लीकेज को भी हटा देती है।
- **`@intlayer/lingui`** Lingui के मैक्रो सिंटैक्स को बनाए रखता है और इसे Intlayer डिक्शनरी से परोसता है। यह मूल Lingui की तुलना में छोटे कंपोनेंट्स (12.8 KB) और तेज़ हाइड्रेशन के लिए थोड़े पेज साइज़ (137 KB) का समझौता करता है। यह एक माइग्रेशन चरण है, अंतिम मंजिल नहीं।

## अंतर क्यों है? दो कंपाइलर, काम की दो इकाइयाँ

दोनों लाइब्रेरी कंपाइल करती हैं। अंतर यह है कि वे **क्या** कंपाइल करती हैं।

**Lingui कैटलॉग कंपाइल करता है।** आपके सोर्स में मैक्रोज़ प्रति लोकेल एक `.po` फ़ाइल में निकाले जाते हैं, फिर प्रति लोकेल एक JS मॉड्यूल में कंपाइल किए जाते हैं। इकाई **लोकेल** है। रूट या कंपोनेंट के अनुसार आगे विभाजित करने का मतलब है कई कैटलॉग बनाना, फ़ाइलों के एक अलग सेट से प्रत्येक को निकालने के लिए `lingui.config.ts` को कॉन्फ़िगर करना, और प्रत्येक रूट में सही कैटलॉग लोड करना। रनटाइम `I18n` इंस्टेंस ग्लोबल है; प्रत्येक `useLingui()` कॉल कंपोनेंट को इससे जोड़ती है।

```bash
.
├── lingui.config.ts
└── src
    ├── i18n.ts                          # setupI18n(), load(), activate()
    ├── locales
    │   ├── en
    │   │   ├── messages.po
    │   │   └── messages.mjs             # lingui compile आउटपुट
    │   └── fr
    │       ├── messages.po
    │       └── messages.mjs
    ├── components
    │   └── Counter.tsx                  # const { t } = useLingui(); t`Increment`
    └── routes
        └── $locale
            └── about.tsx                # await import(`../locales/${locale}/messages.mjs`)
```

**Intlayer डिक्शनरी कंपाइल करता है।** प्रत्येक `.content.ts` फ़ाइल एक कुंजी से बंधी एक डिक्शनरी है; कंपाइलर यह हल करता है कि कौन सा कंपोनेंट किस कुंजी को इम्पोर्ट करता है और प्रति डिक्शनरी और प्रति लोकेल ठीक वही JSON उत्सर्जित करता है जिसकी उस कंपोनेंट को आवश्यकता होती है। इकाई **कंपोनेंट** है। रूट स्कोपिंग इसका स्वाभाविक परिणाम है: एक पेज केवल उन कंपोनेंट्स की डिक्शनरी खींचता है जिन्हें वह रेंडर करता है।

```bash
.
├── intlayer.config.ts
└── src
    ├── components
    │   └── Counter
    │       ├── index.tsx                # useIntlayer("counter")
    │       └── index.content.ts
    └── routes
        └── $locale
            ├── about.tsx
            └── about.content.ts
```

यही कारण है कि `scoped-dynamic` पैटर्न Intlayer के लिए एक स्वचालित बिल्ड आउटपुट है और Lingui के लिए एक कॉन्फ़िगरेशन प्रोजेक्ट है।

> `dynamic` पंक्ति के आंकड़े प्राप्त करने के लिए, `intlayer.config.ts` में `dictionary.importMode: 'dynamic'` सेट करें। [बंडल ऑप्टिमाइज़ेशन दस्तावेज़](https://intlayer.org/hi/doc/concept/bundle-optimization) देखें।

## डेवलपर अनुभव

### सेटअप

**Lingui**

```ts fileName="lingui.config.ts"
import { defineConfig } from "@lingui/cli";

export default defineConfig({
  sourceLocale: "en",
  locales: ["en", "fr"],
  catalogs: [
    {
      path: "<rootDir>/src/locales/{locale}/messages",
      include: ["src"],
    },
  ],
});
```

```ts fileName="src/i18n.ts"
import { setupI18n } from "@lingui/core";

export const loadCatalog = async (locale: string) => {
  const { messages } = await import(`./locales/${locale}/messages.mjs`);
  const i18n = setupI18n();
  i18n.load(locale, messages);
  i18n.activate(locale);
  return i18n;
};
```

फिर बंडलर में `@lingui/babel-plugin-lingui-macro` (या `@lingui/swc-plugin`) जोड़ें, सोर्स एडिट करने के बाद `lingui extract` चलाएं, बिल्ड करने से पहले `lingui compile` चलाएं, और ट्री को `<I18nProvider i18n={i18n}>` में लपेटें।

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

`vite.config.ts` में `intlayer()` (या `next.config.ts` में `withIntlayer()`) जोड़ें और ट्री को `<IntlayerProvider>` में लपेटें। कोई एक्सट्रैक्ट या कंपाइल चरण नहीं: बंडलर चलने पर डिक्शनरी अपने आप बन जाती हैं।

### कंपोनेंट

**Lingui**

```tsx fileName="src/components/Counter.tsx"
import { useState } from "react";
import { useLingui } from "@lingui/react/macro";
import { Trans } from "@lingui/react/macro";

export const Counter = () => {
  const { t, i18n } = useLingui();
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>{i18n.number(count)}</p>
      <button aria-label={t`Counter`} onClick={() => setCount((c) => c + 1)}>
        <Trans>Increment</Trans>
      </button>
    </div>
  );
};
```

अंग्रेजी टेक्स्ट कंपोनेंट में रहता है; फ्रेंच वाला `lingui extract` चलने के बाद एक हैशेड आईडी के तहत `src/locales/fr/messages.po` में रहता है। इसे चलाना या `compile` करना भूल जाने पर चुपचाप अंग्रेजी फ़ॉलबैक हो जाता है।

**Intlayer**

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
import { useState } from "react";
import { useIntlayer } from "react-intlayer";
import { useNumber } from "react-intlayer/format";

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

दोनों लोकेल कंपोनेंट के बगल में एक ही फ़ाइल में बैठते हैं। गायब `fr` मान एक बिल्ड एरर है, गलत कुंजी एक TypeScript एरर है।

### कंपोनेंट्स के बाहर

मेटाडेटा, लोडर्स, सर्वर फ़ंक्शंस: बिना React ट्री के कहीं भी।

**Lingui**

```ts fileName="src/routes/$locale/about.tsx"
import { setupI18n } from "@lingui/core";
import { msg } from "@lingui/core/macro";

const title = msg`About us`;

export const loader = async ({ params }: { params: { locale: string } }) => {
  const { messages } = await import(
    `../../locales/${params.locale}/messages.mjs`
  );
  const i18n = setupI18n({
    locale: params.locale,
    messages: { [params.locale]: messages },
  });

  return { title: i18n._(title) };
};
```

प्रति कॉल एक नया `I18n` इंस्टेंस, हाथ से लोड किया गया सही कैटलॉग, और `t` के बजाय `msg` + `i18n._()`। जैसा कि [बेंचमार्क नोट्स](https://github.com/intlayer-org/benchmark-bloom/blob/main/report/NOTE.md) बताते हैं, यह जानना कि कब `t`, `` t` ` ``, `i18n.t()`, `msg` या `<Trans>` का उपयोग करना है, "सहज नहीं है"।

**Intlayer**

```ts fileName="src/routes/$locale/about.tsx"
import { getIntlayer } from "intlayer";

export const loader = async ({ params }: { params: { locale: string } }) => {
  const { title } = getIntlayer("about-metadata", params.locale);

  return { title };
};
```

## Lingui मैक्रोज़ रखें, Intlayer डिक्शनरी प्राप्त करें

`@intlayer/lingui` `@lingui/core` और `@lingui/react` के लिए एक ड्रॉप-इन एडेप्टर है। मैक्रोज़ पहले की तरह कंपाइल होते रहते हैं; रनटाइम `i18n._()` जिसे वे कंपाइल करते हैं, Intlayer डिक्शनरी से परोसा जाता है, जिसमें `.po` सिंक प्लगइन्स आपके मौजूदा कैटलॉग को सत्य के स्रोत के रूप में रखते हैं। ICU प्लुरल्स और सेलेक्ट्स समान रूप से रेंडर होते हैं।

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import { lingui } from "@intlayer/lingui/plugin";

export default defineConfig({
  plugins: [lingui()],
});
```

बिल्ड में `@lingui/babel-plugin-lingui-macro` / `@lingui/swc-plugin` रखें, जो Intlayer कंपाइलर से पहले चल रहा हो। [Lingui संगतता दस्तावेज़](https://intlayer.org/hi/doc/compatibility/lingui) देखें।

## कब किसे चुनें?

- **Lingui चुनें** यदि आप टाइप्ड मैक्रोज़ के साथ **ICU MessageFormat** चाहते हैं, आपके अनुवादक मौजूदा TMS पाइपलाइन के साथ **`.po`** में काम करते हैं, आप JSX में इनलाइन सोर्स स्ट्रिंग्स पसंद करते हैं, और आपकी टीम एक्सट्रैक्ट / कंपाइल / कैटलॉग-विभाजन वर्कफ़्लो को प्रबंधित करने में सहज है।
- **Intlayer चुनें** यदि आप **कंपोनेंट-स्कोप्ड कंटेंट**, **सख्त TypeScript**, **बिल्ड-टाइम गायब-कुंजी एरर**, **शून्य-प्रयास ट्री-शेकिंग और लेज़ी लोडिंग**, छोटे कंपोनेंट्स, तेज़ हाइड्रेशन, त्वरित लोकेल स्विचिंग, और बिल्ट-इन एडिटोरियल टूलिंग (विजुअल एडिटर, CMS, AI अनुवाद, MCP सर्वर) चाहते हैं। बड़े, मॉड्यूलर कोडबेस और डिज़ाइन सिस्टम के लिए विशेष रूप से प्रासंगिक।
- **`@intlayer/lingui` चुनें** यदि आप Lingui पर हैं और मैक्रोज़ को छुए बिना वृद्धिशील रूप से Intlayer डिक्शनरी में माइग्रेट करना चाहते हैं।

## संबंधित तुलनाएँ

- [next-intl बनाम Intlayer](https://intlayer.org/hi/blog/next-intl-vs-intlayer) (समान बेंचमार्क)
- [i18next बनाम Intlayer](https://intlayer.org/hi/blog/i18next-vs-intlayer) (समान बेंचमार्क)
- [vue-i18n बनाम Intlayer बेंचमार्क](https://intlayer.org/hi/blog/vue-i18n-vs-intlayer-benchmark) (समान बेंचमार्क)
- [कंपाइलर बनाम डिक्लेरेटिव i18n](https://intlayer.org/hi/blog/compiler-vs-declarative-i18n)

## GitHub STARS

GitHub स्टार किसी प्रोजेक्ट की लोकप्रियता, सामुदायिक विश्वास और दीर्घकालिक प्रासंगिकता का एक मजबूत संकेतक हैं। यद्यपि वे तकनीकी गुणवत्ता का सीधा माप नहीं हैं, वे दर्शाते हैं कि कितने डेवलपर्स प्रोजेक्ट को उपयोगी पाते हैं और इसकी प्रगति का अनुसरण करते हैं।

[![स्टार हिस्ट्री चार्ट](https://api.star-history.com/chart?repos=lingui%2Fjs-lingui%2Caymericzip%2Fintlayer&type=date&legend=top-left)](https://star-history.com/#lingui/js-lingui&aymericzip/intlayer)

## निष्कर्ष

Lingui इस बेंचमार्क में सबसे मजबूत रनटाइम-प्लस-कंपाइलर लाइब्रेरी है। इसके कंपाइल किए गए, हैशेड कैटलॉग इसे प्रति-पेज जावास्क्रिप्ट में Intlayer के कुछ KB के भीतर लाते हैं, और TanStack Start पर इससे थोड़े कम भी हैं। यदि प्रति-पेज बाइट्स ही एकमात्र मीट्रिक होते, तो यह बराबरी पर होता।

लेकिन वे नहीं हैं। Lingui का कंपाइलर लोकेल की सीमा पर रुक जाता है; इसके नीचे सब कुछ (प्रति-रूट कैटलॉग, लेज़ी लोडिंग, फ़ॉलबैक को बंडल से बाहर रखना) कॉन्फ़िगरेशन है, और बेंचमार्क उस सीमा की लागत दिखाता है: कंपोनेंट्स **10-20 गुना बड़े**, हाइड्रेशन **2-3 गुना धीमा**, **3-15% लोकेल लीकेज** जो कभी समाप्त नहीं होता, और अनुकूलित सेटअप में **42 ms** का लोकेल स्विच। Intlayer का कंपाइलर कंपोनेंट स्तर पर काम करता है, इसलिए वे संख्याएँ बिना किसी कॉन्फ़िगरेशन के **6-8 KB**, **11-14 ms**, **0%** और **3-4 ms** हैं।

सभी कच्चे डेटा, परीक्षण ऐप्स और स्क्रिप्ट [Benchmark Bloom रिपॉजिटरी](https://github.com/intlayer-org/benchmark-bloom) में उपलब्ध हैं। इसे स्वयं चलाकर देखें।

अधिक विवरण के लिए ['Why Intlayer?' दस्तावेज़](https://intlayer.org/hi/doc/why) देखें।
