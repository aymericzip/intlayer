---
createdAt: 2025-08-23
updatedAt: 2026-05-31
title: "next-i18next बनाम next-intl बनाम Intlayer - अनुवाद का पूर्ण गाइड: next-i18next vs next-intl vs Intlayer: 2026 Comparison"
description: बंडल साइज़, SEO, परफॉर्मेंस & मेंटेनेबिलिटी के लिए सबसे अच्छा समाधान। 2026 में अपने Next.js वेबसाइट को बहुभाषी बनाएं, LLM ट्रांसलेशन, Agent Skills & MCP.
keywords:
  - next-intl
  - next-i18next
  - Intlayer
  - अंतरराष्ट्रीयकरण
  - ब्लॉग
  - Next.js
  - जावास्क्रिप्ट
  - रिएक्ट
slugs:
  - blog
  - next-i18next-vs-next-intl-vs-intlayer
author: aymericzip
---

# next-i18next बनाम next-intl बनाम intlayer | Next.js अंतरराष्ट्रीयकरण (i18n)

<TOC/>

यह गाइड **Next.js** के लिए तीन व्यापक रूप से उपयोग किए जाने वाले i18n विकल्पों की तुलना करता है: **next-intl**, **next-i18next**, और **Intlayer**।
हम **Next.js 13+ App Router** (जिसमें **React Server Components** शामिल हैं) पर ध्यान केंद्रित करते हैं और मूल्यांकन करते हैं:

1. **आर्किटेक्चर और सामग्री संगठन**
2. **TypeScript और सुरक्षा**
3. **अनुवाद की कमी को संभालना**
4. **रूटिंग और मिडलवेयर**
5. **प्रदर्शन और लोडिंग व्यवहार**
6. **डेवलपर अनुभव (DX), टूलिंग और रखरखाव**
7. **SEO और बड़े प्रोजेक्ट की स्केलेबिलिटी**

> **संक्षेप में**: ये सभी तीनों Next.js ऐप को स्थानीयकृत कर सकते हैं। यदि आप चाहते हैं **कंपोनेंट-स्कोप्ड कंटेंट**, **कठोर TypeScript प्रकार**, **बिल्ड-टाइम मिसिंग-की जांच**, **ट्री-शेक्ड डिक्शनरीज़**, और **फर्स्ट-क्लास App Router + SEO हेल्पर्स**, तो **Intlayer** सबसे पूर्ण, आधुनिक विकल्प है।

---

## उच्च स्तरीय स्थिति

- **next-intl** - हल्का, सरल संदेश स्वरूपण जो मजबूत Next.js समर्थन के साथ आता है। केंद्रीकृत कैटलॉग आम हैं; DX सरल है, लेकिन सुरक्षा और बड़े पैमाने पर रखरखाव मुख्य रूप से आपकी जिम्मेदारी बनी रहती है।
- **next-i18next** - Next.js के लिए i18next का रूप। परिपक्व इकोसिस्टम और प्लगइन्स (जैसे ICU) के माध्यम से फीचर्स, लेकिन कॉन्फ़िगरेशन लंबा हो सकता है और जैसे-जैसे प्रोजेक्ट बढ़ते हैं कैटलॉग केंद्रीकृत हो जाते हैं।
- **Intlayer** - Next.js के लिए कंपोनेंट-केंद्रित कंटेंट मॉडल, **कठोर TS टाइपिंग**, **बिल्ड-टाइम चेक्स**, **ट्री-शेकिंग**, **इन-बिल्ट मिडलवेयर और SEO हेल्पर्स**, वैकल्पिक **विज़ुअल एडिटर/CMS**, और **AI-सहायता प्राप्त अनुवाद**।

---

## साइड-बाय-साइड फीचर तुलना (Next.js केंद्रित)

| फीचर                                                   | `next-intlayer` (Intlayer)                                                                                                                                        | `next-intl`                                                                                                     | `next-i18next`                                                                                                  |
| ------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| **कंपोनेंट के पास अनुवाद**                             | ✅ हाँ, प्रत्येक कंपोनेंट के साथ सामग्री सह-स्थित                                                                                                                 | ❌ नहीं                                                                                                         | ❌ नहीं                                                                                                         |
| **टाइपस्क्रिप्ट एकीकरण**                               | ✅ उन्नत, स्वचालित रूप से उत्पन्न सख्त प्रकार                                                                                                                     | ✅ अच्छा                                                                                                        | ⚠️ बुनियादी                                                                                                     |
| **अनुवाद की कमी का पता लगाना**                         | ✅ टाइपस्क्रिप्ट त्रुटि हाइलाइट और बिल्ड-टाइम त्रुटि/चेतावनी                                                                                                      | ⚠️ रनटाइम फॉलबैक                                                                                                | ⚠️ रनटाइम फॉलबैक                                                                                                |
| **समृद्ध सामग्री (JSX/मार्कडाउन/कंपोनेंट्स)**          | ✅ सीधे समर्थन                                                                                                                                                    | ❌ समृद्ध नोड्स के लिए डिज़ाइन नहीं किया गया                                                                    | ⚠️ सीमित                                                                                                        |
| **एआई-संचालित अनुवाद**                                 | ✅ हाँ, कई एआई प्रदाताओं का समर्थन करता है। अपने स्वयं के API कुंजी का उपयोग करके उपयोग किया जा सकता है। आपके एप्लिकेशन और सामग्री के संदर्भ को ध्यान में रखता है | ❌ नहीं                                                                                                         | ❌ नहीं                                                                                                         |
| **विज़ुअल एडिटर**                                      | ✅ हाँ, स्थानीय विज़ुअल एडिटर + वैकल्पिक CMS; कोडबेस सामग्री को बाहरी रूप से प्रबंधित कर सकता है; एम्बेड करने योग्य                                               | ❌ नहीं / बाहरी स्थानीयकरण प्लेटफार्मों के माध्यम से उपलब्ध                                                     | ❌ नहीं / बाहरी स्थानीयकरण प्लेटफार्मों के माध्यम से उपलब्ध                                                     |
| **स्थानीयकृत रूटिंग**                                  | ✅ हाँ, बॉक्स से बाहर स्थानीयकृत पथों का समर्थन करता है (Next.js और Vite के साथ काम करता है)                                                                      | ✅ अंतर्निर्मित, ऐप राउटर `[locale]` सेगमेंट का समर्थन करता है                                                  | ✅ अंतर्निर्मित                                                                                                 |
| **डायनामिक रूट जनरेशन**                                | ✅ हाँ                                                                                                                                                            | ✅ हाँ                                                                                                          | ✅ हाँ                                                                                                          |
| **बहुवचन**                                             | ✅ एनेमरेशन-आधारित पैटर्न                                                                                                                                         | ✅ अच्छा                                                                                                        | ✅ अच्छा                                                                                                        |
| **स्वरूपण (तिथियाँ, संख्याएँ, मुद्राएँ)**              | ✅ अनुकूलित स्वरूपक (अंदर से Intl)                                                                                                                                | ✅ अच्छा (Intl सहायक)                                                                                           | ✅ अच्छा (Intl सहायक)                                                                                           |
| **सामग्री स्वरूप**                                     | ✅ .tsx, .ts, .js, .json, .md, .txt, (.yaml WIP)                                                                                                                  | ✅ .json, .js, .ts                                                                                              | ⚠️ .json                                                                                                        |
| **ICU समर्थन**                                         | ⚠️ प्रगति पर                                                                                                                                                      | ✅ हाँ                                                                                                          | ⚠️ प्लगइन के माध्यम से (`i18next-icu`)                                                                          |
| **SEO सहायक (hreflang, साइटमैप)**                      | ✅ अंतर्निर्मित उपकरण: साइटमैप, robots.txt, मेटाडेटा के लिए सहायक                                                                                                 | ✅ अच्छा                                                                                                        | ✅ अच्छा                                                                                                        |
| **इकोसिस्टम / समुदाय**                                 | ⚠️ छोटा लेकिन तेजी से बढ़ रहा और प्रतिक्रियाशील                                                                                                                   | ✅ मध्यम आकार, Next.js-केंद्रित                                                                                 | ✅ मध्यम आकार, Next.js-केंद्रित                                                                                 |
| **सर्वर-साइड रेंडरिंग और सर्वर कंपोनेंट्स**            | ✅ हाँ, SSR / React सर्वर कंपोनेंट्स के लिए सुव्यवस्थित                                                                                                           | ⚠️ पेज स्तर पर समर्थित लेकिन चाइल्ड सर्वर कंपोनेंट्स के लिए कंपोनेंट ट्री में t-फंक्शंस पास करने की आवश्यकता है | ⚠️ पेज स्तर पर समर्थित लेकिन चाइल्ड सर्वर कंपोनेंट्स के लिए कंपोनेंट ट्री में t-फंक्शंस पास करने की आवश्यकता है |
| **ट्री-शेकिंग (केवल उपयोग किए गए कंटेंट को लोड करना)** | ✅ हाँ, Babel/SWC प्लगइन्स के माध्यम से बिल्ड समय पर प्रति-कंपोनेंट                                                                                               | ⚠️ आंशिक                                                                                                        | ⚠️ आंशिक                                                                                                        |
| **लेज़ी लोडिंग**                                       | ✅ हाँ, प्रति-लोकल / प्रति-डिक्शनरी                                                                                                                               | ✅ हाँ (प्रति-रूट/प्रति-लोकल), नेमस्पेस प्रबंधन की आवश्यकता                                                     | ✅ हाँ (प्रति-रूट/प्रति-लोकल), नेमस्पेस प्रबंधन की आवश्यकता                                                     |
| **अप्रयुक्त कंटेंट को हटाना**                          | ✅ हाँ, बिल्ड समय पर प्रति-डिक्शनरी                                                                                                                               | ❌ नहीं, नेमस्पेस प्रबंधन के साथ मैन्युअली प्रबंधित किया जा सकता है                                             | ❌ नहीं, नेमस्पेस प्रबंधन के साथ मैन्युअली प्रबंधित किया जा सकता है                                             |
| **बड़े प्रोजेक्ट्स का प्रबंधन**                        | ✅ मॉड्यूलर को प्रोत्साहित करता है, डिज़ाइन-सिस्टम के लिए उपयुक्त                                                                                                 | ✅ सेटअप के साथ मॉड्यूलर                                                                                        | ✅ सेटअप के साथ मॉड्यूलर                                                                                        |

---

## गहराई से तुलना

### 1) आर्किटेक्चर और स्केलेबिलिटी

- **next-intl / next-i18next**: डिफ़ॉल्ट रूप से प्रति-लोकल **केंद्रीकृत कैटलॉग** (साथ ही i18next में **नेमस्पेस**) का उपयोग करता है। शुरू में यह ठीक काम करता है, लेकिन अक्सर बढ़ती कूप्लिंग और की चर्न के साथ एक बड़ा साझा सतह क्षेत्र बन जाता है।
- **Intlayer**: प्रत्येक घटक (या प्रत्येक फीचर) के लिए शब्दकोशों को प्रोत्साहित करता है जो उस कोड के साथ सह-स्थित होते हैं जिसे वे सेवा देते हैं। इससे संज्ञानात्मक भार कम होता है, UI के टुकड़ों की नकल/स्थानांतरण आसान होता है, और टीमों के बीच संघर्ष कम होता है। अप्रयुक्त सामग्री को स्वाभाविक रूप से पहचानना और हटाना आसान होता है।

**महत्व क्यों है:** बड़े कोडबेस या डिज़ाइन-सिस्टम सेटअप में, **मॉड्यूलर सामग्री** मोनोलिथिक कैटलॉग की तुलना में बेहतर स्केल करती है।

---

## Bundle आकार और dependencies

अनुप्रयोग बनाने के बाद, bundle वह JavaScript है जो ब्राउज़र पृष्ठ को प्रस्तुत करने के लिए लोड करेगा। इसलिए bundle का आकार अनुप्रयोग के प्रदर्शन के लिए महत्वपूर्ण है।

बहु-भाषा अनुप्रयोग bundle के संदर्भ में दो घटक महत्वपूर्ण हैं:

- अनुप्रयोग कोड
- ब्राउज़र द्वारा लोड की गई सामग्री

## एप्लिकेशन कोड

इस मामले में एप्लिकेशन कोड का महत्व न्यूनतम है। तीनों समाधान tree-shakable हैं, जिसका अर्थ है कि कोड के अप्रयुक्त हिस्से bundle में शामिल नहीं होते हैं।

यहाँ तीनों समाधानों के साथ एक मल्टी-लैंग्वेज एप्लिकेशन के लिए ब्राउज़र द्वारा लोड किए गए JavaScript bundle size की तुलना दी गई है।

यदि एप्लिकेशन में हमें किसी formatter की आवश्यकता नहीं है, तो tree-shaking के बाद निर्यात किए गए फ़ंक्शन की सूची होगी:

- **next-intlayer**: `useIntlayer`, `useLocale`, `NextIntlClientProvider`, (Bundle size 180.6 kB -> 15.24 kB (gzip))
- **next-intl**: `useTranslations`, `useLocale`, `NextIntlClientProvider`, (Bundle size 101.3 kB -> 31.4 kB (gzip))
- **next-i18next**: `useTranslation`, `useI18n`, `I18nextProvider`, (Bundle size 80.7 kB -> 25.5 kB (gzip))

ये फ़ंक्शन केवल React context/state के चारों ओर wrappers हैं, इसलिए bundle size पर i18n library का कुल प्रभाव न्यूनतम है।

## सामग्री और अनुवाद

यह भाग अक्सर developers द्वारा नज़रअंदाज़ किया जाता है, लेकिन आइए 10 भाषाओं में 10 पृष्ठों से बने एक application के मामले पर विचार करें। मान लीजिए कि प्रत्येक पृष्ठ गणना को सरल बनाने के लिए 100% अद्वितीय सामग्री को एकीकृत करता है (वास्तव में, पृष्ठों के बीच बहुत सी सामग्री redundant होती है, जैसे page title, header, footer, आदि)।

एक user जो `/fr/about` पृष्ठ पर जाना चाहता है, दिए गए language में एक पृष्ठ की सामग्री load करेगा। सामग्री optimization को ignore करने का मतलब होगा 8,200% `((1 + (((10 pages - 1) × (10 languages - 1)))) × 100)` application सामग्री को unnecessarily load करना। क्या आप समस्या देखते हैं? भले ही यह सामग्री text रहे, और जबकि आप शायद अपनी site की images को optimize करने के बारे में सोचना पसंद करते हैं, आप दुनिया भर में useless सामग्री भेज रहे हैं और users के computers को इसे कुछ नहीं के लिए process करने के लिए बना रहे हैं।

दो महत्वपूर्ण समस्याएं:

- **Route के आधार पर विभाजन:**

  > यदि मैं `/about` पृष्ठ पर हूं, तो मुझे `/home` पृष्ठ की सामग्री load नहीं करनी चाहिए

- **Locale के आधार पर विभाजन:**

  > यदि मैं `/fr/about` पृष्ठ पर हूं, तो मुझे `/en/about` पृष्ठ की सामग्री load नहीं करनी चाहिए

फिर से, तीनों solutions इन समस्याओं के बारे में जानते हैं और इन optimizations को manage करने की अनुमति देते हैं। तीनों solutions के बीच अंतर DX (Developer Experience) में है।

`next-intl` और `next-i18next` translations को manage करने के लिए एक centralized approach का उपयोग करते हैं, जो locale के आधार पर और sub-files के आधार पर JSON को split करने की अनुमति देता है। `next-i18next` में, हम JSON files को 'namespaces' कहते हैं; `next-intl` messages को declare करने की अनुमति देता है। `intlayer` में, हम JSON files को 'dictionaries' कहते हैं।

- `next-intl` के मामले में, `next-i18next` की तरह, content को page/layout level पर load किया जाता है, फिर इस content को एक context provider में load किया जाता है। इसका मतलब है कि developer को manually JSON files को manage करना चाहिए जो प्रत्येक पृष्ठ के लिए load होंगी।

> व्यवहार में, इसका अर्थ है कि developers अक्सर इस optimization को छोड़ देते हैं, सरलता के लिए page के context provider में सभी content को load करना पसंद करते हैं।

- `intlayer` के मामले में, सभी content को application में load किया जाता है। फिर एक plugin (`@intlayer/babel` / `@intlayer/swc`) bundle को optimize करने का ध्यान रखता है, केवल पृष्ठ पर उपयोग की जाने वाली content को load करके। इसलिए developer को manually dictionaries को manage करने की जरूरत नहीं है जो load होंगी। यह बेहतर optimization, बेहतर maintainability, और development time को कम करने की अनुमति देता है।

जैसे-जैसे application बढ़ता है (विशेष रूप से जब multiple developers application पर काम करते हैं), यह common है कि JSON files से ऐसी सामग्री को remove करना भूल जाएं जो अब उपयोग नहीं की जाती है।

> ध्यान दें कि सभी JSON सभी cases में load होते हैं (next-intl, next-i18next, intlayer)।

यही कारण है कि Intlayer का approach अधिक performant है: यदि एक component अब उपयोग नहीं किया जाता है, तो इसकी dictionary bundle में load नहीं होती है।

कैसे library fallbacks को handle करती है यह भी महत्वपूर्ण है। आइए मान लें कि application default रूप से English में है, और user `/fr/about` पृष्ठ पर जाता है। यदि French में translations missing हैं, तो हम English fallback पर विचार करेंगे।

`next-intl` और `next-i18next` के मामले में, library को current locale से संबंधित JSON को load करने की जरूरत है, लेकिन fallback locale से भी। इस प्रकार, यह मानते हुए कि सभी content का translation किया गया है, प्रत्येक पृष्ठ 100% unnecessary सामग्री को load करेगा। **तुलना में, `intlayer` dictionary build time पर fallback को process करता है। इस प्रकार, प्रत्येक पृष्ठ केवल उपयोग की जाने वाली सामग्री को load करेगा।**

> ध्यान दें: `intlayer` का उपयोग करके bundle को optimize करने के लिए, आपको अपनी `intlayer.config.ts` file में `importMode: 'dynamic'` option को set करने की जरूरत है। और सुनिश्चित करें कि plugin `@intlayer/babel` / `@intlayer/swc` installed हैं (default रूप से `vite-intlayer` का उपयोग करके installed)।

यहां एक vite + react application में `intlayer` का उपयोग करके bundle size optimization के प्रभाव का एक उदाहरण दिया गया है:

| Optimized bundle                                                                                      | Bundle not optimized                                                                                                     |
| ----------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| ![optimized bundle](https://github.com/aymericzip/intlayer/blob/main/docs/assets/bundle.png?raw=true) | ![no optimized bundle](https://github.com/aymericzip/intlayer/blob/main/docs/assets/bundle_no_optimization.png?raw=true) |

---

### 2) टाइपस्क्रिप्ट और सुरक्षा

- **next-intl**: मजबूत टाइपस्क्रिप्ट समर्थन, लेकिन **चाबियाँ डिफ़ॉल्ट रूप से सख्ती से टाइप नहीं होतीं**; आपको सुरक्षा पैटर्न मैन्युअली बनाए रखने होंगे।
- **next-i18next**: हुक्स के लिए बेस टाइपिंग; **सख्त कुंजी टाइपिंग के लिए अतिरिक्त टूलिंग/कॉन्फ़िग की आवश्यकता होती है**।
- **Intlayer**: आपके कंटेंट से **सख्त प्रकार (strict types)** उत्पन्न करता है। **IDE ऑटोकम्प्लीशन** और **कंपाइल-टाइम त्रुटियाँ** तैनाती से पहले टाइपो और गायब कुंजियों को पकड़ती हैं।

**महत्व क्यों है:** मजबूत टाइपिंग विफलताओं को **बाएं** (CI/build) स्थानांतरित करती है बजाय इसके कि वे **दाएं** (runtime) हों।

---

### 3) गायब अनुवाद प्रबंधन

- **next-intl / next-i18next**: **रनटाइम फॉलबैक** पर निर्भर करते हैं (जैसे, कुंजी या डिफ़ॉल्ट लोकल दिखाना)। बिल्ड विफल नहीं होता।
- **Intlayer**: **बिल्ड-टाइम डिटेक्शन** के साथ **चेतावनी/त्रुटियाँ** प्रदान करता है जब लोकल या कुंजी गायब हो।

**महत्व क्यों है:** बिल्ड के दौरान अंतर पकड़ना उत्पादन में “रहस्यमय स्ट्रिंग्स” को रोकता है और सख्त रिलीज गेट्स के अनुरूप होता है।

---

### 4) रूटिंग, मिडलवेयर और URL रणनीति

- तीनों ही **Next.js स्थानीयकृत रूटिंग** के साथ App Router पर काम करते हैं।
- **Intlayer** आगे बढ़ता है **i18n मिडलवेयर** (हेडर/कुकीज़ के माध्यम से लोकल डिटेक्शन) और **हेल्पर्स** के साथ जो स्थानीयकृत URLs और `<link rel="alternate" hreflang="…">` टैग्स उत्पन्न करते हैं।

**महत्व क्यों है:** कम कस्टम ग्लू लेयर्स; **सुसंगत UX** और **साफ SEO** सभी लोकल्स में।

---

## Server Components (RSC) संरेखण

<Columns>
  <Column>

**next-i18next**

- पृष्ठ और लेआउट server components को सपोर्ट करता है।
- बाल server components के लिए synchronous API प्रदान नहीं करता है।

  </Column>
  <Column>

**next-intl**

- पृष्ठ और लेआउट server components को सपोर्ट करता है।
- बाल server components के लिए synchronous API प्रदान नहीं करता है।

  </Column>
  <Column>

**intlayer**

- पृष्ठ और लेआउट server components को सपोर्ट करता है।
- बाल server components के लिए synchronous API प्रदान करता है।

  </Column>
</Columns>

**यह क्यों महत्वपूर्ण है:** Server component सपोर्ट Next.js 13+ की एक मुख्य सुविधा है, जो performance में सुधार करती है। parent से बाल server components में locale या `t` फ़ंक्शन को props के रूप में पास करने से आपके components कम reusable हो जाते हैं।

---

## स्थानीयकरण प्लेटफॉर्म (TMS) के साथ एकीकरण

बड़ी संगठनें अक्सर **Crowdin**, **Phrase**, **Lokalise**, **Localizely**, या **Localazy** जैसी Translation Management Systems (TMS) पर निर्भर करती हैं।

- **कंपनियों को क्यों परवाह है**
  - **सहयोग और भूमिकाएँ**: कई actors शामिल हैं: developers, product managers, translators, reviewers, marketing teams।
  - **स्केल और दक्षता**: continuous localization, in-context review।

- **next-intl / next-i18next**
  - आमतौर पर **centralized JSON catalogs** का उपयोग करते हैं, इसलिए TMS के साथ export/import सीधा है।
  - परिपक्व ecosystems और उपरोक्त प्लेटफॉर्म के लिए examples/integrations।

- **Intlayer**
  - **decentralized, per-component dictionaries** को प्रोत्साहित करता है और **TypeScript/TSX/JS/JSON/MD** content को समर्थन करता है।
  - यह code में modularity में सुधार करता है, लेकिन जब कोई tool centralized, flat JSON files की अपेक्षा करता है तो plug-and-play TMS integration को कठिन बना सकता है।
  - Intlayer विकल्प प्रदान करता है: **AI-assisted translations** (अपनी provider keys का उपयोग करके), एक **Visual Editor/CMS**, और **CLI/CI** workflows को catch और prefill gaps के लिए।

> नोट: `next-intl` और `i18next` TypeScript catalogs को भी स्वीकार करते हैं। यदि आपकी team `.ts` files में messages को store करती है या उन्हें feature द्वारा decentralize करती है, तो आप समान TMS friction का सामना कर सकते हैं। हालांकि, कई `next-intl` setups `locales/` folder में centralized रहते हैं, जो TMS के लिए JSON में refactor करना थोड़ा आसान है।

---

### 5) सर्वर कंपोनेंट्स (RSC) संरेखण

- **सभी** Next.js 13+ का समर्थन करते हैं।
- **Intlayer** **सर्वर/क्लाइंट सीमा** को एक सुसंगत API और RSC के लिए डिज़ाइन किए गए प्रोवाइडर्स के साथ सहज बनाता है, ताकि आप फॉर्मेटर्स या t-फंक्शंस को कंपोनेंट ट्रीज़ के माध्यम से शटल न करें।

**महत्व क्यों है:** साफ मानसिक मॉडल और हाइब्रिड ट्रीज़ में कम एज केस।

---

### ऐप्लिकेशन संरचना

ऐप्लिकेशन संरचना आपके codebase के लिए अच्छी maintainability सुनिश्चित करने के लिए महत्वपूर्ण है।

<Tabs defaultTab="next-intl" group='techno'>

  <Tab label="next-i18next" value="next-i18next">

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

  </Tab>
  <Tab label="next-intl" value="next-intl">

```bash
.
├── i18n.ts
├── locales
│   ├── en
    │   │  ├── home.json
    │   │  └── navbar.json
    │   ├── fr
    │   │  ├── home.json
    │   │  └── navbar.json
    │   └── es
    │      ├── home.json
    │      └── navbar.json
└── src
    ├── middleware.ts
    ├── app
    │   ├── i18n
    │   │   └── server.ts
    │   └── [locale]
    │       └── home.tsx
    └── components
        └── Navbar
            └── index.tsx
```

  </Tab>
  <Tab label="intlayer" value="intlayer">

```bash
.
├── intlayer.config.ts
└── src
    ├── middleware.ts
    ├── app
    │   └── [locale]
    │       ├── layout.tsx
    │       └── home
    │           ├── index.tsx
    │           └── index.content.ts
    └── components
        └── Navbar
            ├── index.tsx
            └── index.content.ts
```

  </Tab>
</Tabs>

### 6) प्रदर्शन और लोडिंग व्यवहार

- **next-intl / next-i18next**: आंशिक नियंत्रण **namespaces** और **route-level splits** के माध्यम से; अनुशासन में कमी होने पर अप्रयुक्त स्ट्रिंग्स के बंडलिंग का जोखिम।
- **Intlayer**: बिल्ड के समय **tree-shakes** करता है और **प्रत्येक शब्दकोश/लोकल के लिए lazy-loads** करता है। अप्रयुक्त सामग्री भेजी नहीं जाती।

**महत्व क्यों:** छोटे बंडल और तेज़ स्टार्टअप, विशेष रूप से मल्टी-लोकल साइट्स पर।

---

#### सेटअप और कंटेंट लोडिंग

जैसा कि पहले उल्लेख किया गया है, आपको अपने कोड में प्रत्येक JSON फाइल को कैसे import किया जाता है इसे optimize करना चाहिए।
यह महत्वपूर्ण है कि library कंटेंट लोडिंग को कैसे handle करती है।

<Tabs defaultTab="next-intl" group='techno'>
  <Tab label="next-i18next" value="next-i18next">

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

```ts fileName="src/app/i18n/server.ts"
import { createInstance } from "i18next";
import { initReactI18next } from "react-i18next/initReactI18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { defaultLocale } from "@/i18n.config";

// src/locales/<locale>/<namespace>.json से JSON resources को लोड करें
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

```tsx fileName="src/app/[locale]/layout.tsx"
import type { ReactNode } from "react";
import { locales, defaultLocale, isRtl, type Locale } from "@/i18n.config";

export const dynamicParams = false;

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
  const locale: Locale = (locales as readonly string[]).includes(params.locale)
    ? params.locale
    : defaultLocale;

  const dir = isRtl(locale) ? "rtl" : "ltr";

  return (
    <html lang={locale} dir={dir}>
      <body>{children}</body>
    </html>
  );
}
```

```tsx fileName="src/app/[locale]/about.tsx"
import I18nProvider from "@/components/I18nProvider";
import { initI18next } from "@/app/i18n/server";
import type { Locale } from "@/i18n.config";
import ClientComponent from "@/components/ClientComponent";
import ServerComponent from "@/components/ServerComponent";

// पेज के लिए static rendering को force करें
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

  </Tab>
   <Tab label="next-intl" value="next-intl">

```tsx fileName="src/i18n.ts"
import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";

export const locales = ["en", "fr", "es"] as const;
export const defaultLocale = "en" as const;

async function loadMessages(locale: string) {
  // केवल उन namespaces को लोड करें जिनकी आपके layout/pages को जरूरत है
  const [common, about] = await Promise.all([
    import(`../locales/${locale}/common.json`).then((m) => m.default),
    import(`../locales/${locale}/about.json`).then((m) => m.default),
  ]);

  return { common, about } as const;
}

export default getRequestConfig(async ({ locale }) => {
  if (!locales.includes(locale)) notFound();

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
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // इस server render (RSC) के लिए active request locale को set करें
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
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Messages को server-side पर लोड किया जाता है। केवल आवश्यक चीजें ही client को भेजें।
  const messages = await getMessages();
  const clientMessages = pick(messages, ["common", "about"]);

  // पूरी तरह से server-side translations/formatting
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

  </Tab>
  <Tab label="intlayer" value="intlayer">

```tsx fileName="intlayer.config.ts"
import { type IntlayerConfig, Locales } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

```tsx fileName="src/app/[locale]/layout.tsx"
import { getHTMLTextDir } from "intlayer";
import {
  IntlayerClientProvider,
  generateStaticParams,
  type NextLayoutIntlayer,
} from "next-intlayer";

export const dynamic = "force-static";

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

export default LandingLayout;
```

```tsx fileName="src/app/[locale]/about/page.tsx"
import { PageContent } from "@components/PageContent";
import type { NextPageIntlayer } from "next-intlayer";
import { IntlayerServerProvider, useIntlayer } from "next-intlayer/server";
import { ClientComponent, ServerComponent } from "@components";

const LandingPage: NextPageIntlayer = async ({ params }) => {
  const { locale } = await params;
  const { title } = useIntlayer("about", locale);

  return (
    <IntlayerServerProvider locale={locale}>
      <main>
        <h1>{title}</h1>
        <ClientComponent />
        <ServerComponent />
      </main>
    </IntlayerServerProvider>
  );
};

export default LandingPage;
```

  </Tab>
</Tabs>

### 7) DX, टूलिंग और रखरखाव

- **next-intl / next-i18next**: आप आमतौर पर अनुवाद और संपादकीय वर्कफ़्लोज़ के लिए बाहरी प्लेटफार्मों को जोड़ेंगे।
- **Intlayer**: एक **मुफ्त विज़ुअल एडिटर** और **वैकल्पिक CMS** (Git-फ्रेंडली या बाहरी) प्रदान करता है। साथ ही **VSCode एक्सटेंशन** सामग्री लेखन के लिए और **AI-सहायता प्राप्त अनुवाद** आपके अपने प्रदाता कुंजी का उपयोग करके।

**यह क्यों महत्वपूर्ण है:** ऑपरेशंस की लागत कम करता है और डेवलपर्स और कंटेंट लेखकों के बीच लूप को छोटा करता है।

---

### क्लाइंट कंपोनेंट में उपयोग

आइए एक क्लाइंट कंपोनेंट का एक उदाहरण लें जो एक काउंटर रेंडर करता है।

<Tabs defaultTab="next-intl" group='techno'>
  <Tab label="next-i18next" value="next-i18next">

**अनुवाद (एक JSON प्रति namespace `src/locales/...` के तहत)**

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

**क्लाइंट कंपोनेंट (केवल आवश्यक namespace लोड करता है)**

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

> सुनिश्चित करें कि पेज/प्रोवाइडर केवल आवश्यक namespaces शामिल करता है (जैसे `about`)।
> यदि आप React < 19 का उपयोग कर रहे हैं, तो भारी formatters जैसे `Intl.NumberFormat` को memoize करें।

  </Tab>
  <Tab label="next-intl" value="next-intl">

**अनुवाद (आकृति का पुन: उपयोग; उन्हें next-intl संदेशों में अपनी पसंद के अनुसार लोड करें)**

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
  // नेस्टेड ऑब्जेक्ट के लिए सीधे स्कोप करें
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

> पेज क्लाइंट संदेश पर "about" संदेश जोड़ना न भूलें

  </Tab>
  <Tab label="intlayer" value="intlayer">

**सामग्री**

```ts fileName="src/components/ClientComponentExample/index.content.ts"
import { t, type Dictionary } from "intlayer";

const counterContent = {
  key: "counter",
  content: {
    label: t({ hi: "काउंटर", en: "Counter", fr: "Compteur" }),
    increment: t({ hi: "वृद्धि", en: "Increment", fr: "Incrémenter" }),
  },
} satisfies Dictionary;

export default counterContent;
```

**क्लाइंट कंपोनेंट**

```tsx fileName="src/components/ClientComponentExample/index.tsx"
"use client";

import React, { useState } from "react";
import { useNumber, useIntlayer } from "next-intlayer";

const ClientComponentExample = () => {
  const [count, setCount] = useState(0);
  const { label, increment } = useIntlayer("counter"); // strings return करता है
  const { number } = useNumber();

  return (
    <div>
      <p>{number(count)}</p>
      <button aria-label={label} onClick={() => setCount((count) => count + 1)}>
        {increment}
      </button>
    </div>
  );
};
```

  </Tab>
</Tabs>

## कब किसे चुनें?

- **next-intl चुनें** यदि आप एक **न्यूनतम** समाधान चाहते हैं, आप केंद्रीकृत कैटलॉग्स के साथ सहज हैं, और आपका ऐप **छोटा से मध्यम आकार** का है।
- **next-i18next चुनें** यदि आपको **i18next के प्लगइन इकोसिस्टम** की आवश्यकता है (जैसे, प्लगइन्स के माध्यम से उन्नत ICU नियम) और आपकी टीम पहले से i18next जानती है, और आप **अधिक कॉन्फ़िगरेशन** को लचीलापन देने के लिए स्वीकार करते हैं।
- **Intlayer चुनें** यदि आप **कंपोनेंट-स्कोप्ड कंटेंट**, **सख्त TypeScript**, **बिल्ड-टाइम गारंटियां**, **tree-shaking**, और **बिल्ट-इन** रूटिंग/SEO/एडिटर टूलिंग को महत्व देते हैं - विशेष रूप से **Next.js App Router** और **बड़े, मॉड्यूलर कोडबेस** के लिए।

---

### सर्वर कंपोनेंट में उपयोग

हम एक UI कंपोनेंट के मामले को लेंगे। यह कंपोनेंट एक सर्वर कंपोनेंट है, और एक क्लाइंट कंपोनेंट के चाइल्ड के रूप में डाला जा सकता है। (page (server component) -> client component -> server component)। जैसा कि यह कंपोनेंट क्लाइंट कंपोनेंट के चाइल्ड के रूप में डाला जा सकता है, यह async नहीं हो सकता है।

<Tabs defaultTab="next-intl" group='techno'>
  <Tab label="next-i18next" value="next-i18next">

```tsx fileName="src/components/ServerComponent.tsx"
type ServerComponentProps = {
  t: (key: string) => string;
  locale: string;
  count: number;
};

const ServerComponent = ({ t, locale, count }: ServerComponentProps) => {
  // संख्या को फॉर्मेट करें
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

  </Tab>
  <Tab label="next-intl" value="next-intl">

```tsx fileName="src/components/ServerComponent.tsx"
type ServerComponentProps = {
  t: (key: string) => string;
  locale: string;
  count: number;
  formatter: Intl.NumberFormat;
};

const ServerComponent = ({
  t,
  locale,
  count,
  formatter,
}: ServerComponentProps) => {
  // फॉर्मेटर का उपयोग करके संख्या को फॉर्मेट करें
  const formatted = formatter.format(count);

  return (
    <div>
      <p>{formatted}</p>
      <button aria-label={t("counter.label")}>{t("counter.increment")}</button>
    </div>
  );
};

export default ServerComponent;
```

> जैसा कि सर्वर कंपोनेंट async नहीं हो सकता है, आपको translations और formatter फ़ंक्शन को props के रूप में पास करने की आवश्यकता है।
>
> आपके page / layout में:
>
> - `import { getTranslations, getFormatter } from "next-intl/server";`
> - `const t = await getTranslations("about.counter");`
> - `const formatter = await getFormatter().then((formatter) => formatter.number());`

  </Tab>
  <Tab label="intlayer" value="intlayer">

```tsx fileName="src/components/ServerComponent.tsx"
import { useIntlayer, useNumber } from "next-intlayer/server";

type ServerComponentProps = {
  count: number;
};

const ServerComponent = ({ count }: ServerComponentProps) => {
  // counter से translations प्राप्त करें
  const { label, increment } = useIntlayer("counter");
  // number फॉर्मेटर प्राप्त करें
  const { number } = useNumber();

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

> Intlayer `next-intlayer/server` के माध्यम से **server-safe** hooks को expose करता है। काम करने के लिए, `useIntlayer` और `useNumber` hooks-like syntax का उपयोग करते हैं, जो क्लाइंट hooks के समान हैं, लेकिन server context (`IntlayerServerProvider`) पर निर्भर हैं।

### मेटाडेटा / साइटमैप / रोबोट्स

content का अनुवाद करना बहुत अच्छा है। लेकिन लोग अक्सर भूल जाते हैं कि internationalization का मुख्य लक्ष्य आपकी website को दुनिया के लिए अधिक दृश्यमान बनाना है। I18n आपकी website visibility में सुधार के लिए एक अद्भुत साधन है।

यहाँ बहुभाषी SEO के संबंध में अच्छी practices की एक सूची दी गई है।

- `<head>` tag में hreflang मेटा tags सेट करें
  > यह search engines को समझने में मदद करता है कि पृष्ठ पर कौन सी भाषाएं उपलब्ध हैं
- `http://www.w3.org/1999/xhtml` XML schema का उपयोग करके sitemap.xml में सभी पृष्ठों के अनुवाद सूचीबद्ध करें
  >
- robots.txt से prefixed pages को exclude करना न भूलें (उदा. `/dashboard`, `/fr/dashboard`, `/es/dashboard`)
  >
- सबसे localized page पर redirect करने के लिए custom Link component का उपयोग करें (उदा. फ्रेंच में `<a href="/fr/about">A propos</a>` )
  >

Developers अक्सर locales के across अपने पृष्ठों को ठीक से reference करना भूल जाते हैं।

<Tabs defaultTab="next-intl" group='techno'>
 
  <Tab label="next-i18next" value="next-i18next">

```ts fileName="i18n.config.ts"
export const locales = ["en", "fr"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export function localizedPath(locale: string, path: string) {
  return locale === defaultLocale ? path : "/" + locale + path;
}

const ORIGIN = "https://example.com";
export function abs(locale: string, path: string) {
  return ORIGIN + localizedPath(locale, path);
}
```

```tsx fileName="src/app/[locale]/about/layout.tsx"
import type { Metadata } from "next";
import { locales, defaultLocale, localizedPath } from "@/i18n.config";

type GenerateMetadataParams = {
  params: Promise<{
    locale: string;
  }>;
};

export const generateMetadata = async ({
  params,
}: GenerateMetadataParams): Promise<Metadata> => {
  const { locale } = await params;

  // src/locales से सही JSON bundle import करें
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
};

export default async function AboutPage() {
  return <h1>About</h1>;
}
```

```ts fileName="src/app/sitemap.ts"
import type { MetadataRoute } from "next";
import { locales, defaultLocale, abs } from "@/i18n.config";

export const sitemap = (): MetadataRoute.Sitemap => {
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
};
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

export const robots = (): MetadataRoute.Robots => {
  const disallow = [
    ...expandAllLocales("/dashboard"),
    ...expandAllLocales("/admin"),
  ];

  return {
    rules: { userAgent: "*", allow: ["/"], disallow },
    host: ORIGIN,
    sitemap: ORIGIN + "/sitemap.xml",
  };
};
```

  </Tab>
  <Tab label="next-intl" value="next-intl">

```tsx fileName="src/app/[locale]/about/layout.tsx"
import type { Metadata } from "next";
import { locales, defaultLocale } from "@/i18n";
import { getTranslations } from "next-intl/server";

const localizedPath = (locale: string, path: string) => {
  return locale === defaultLocale ? path : "/" + locale + path;
};

type GenerateMetadataParams = {
  params: Promise<{
    locale: string;
  }>;
};

export const generateMetadata = async ({
  params,
}: GenerateMetadataParams): Promise<Metadata> => {
  const { locale } = await params;
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
};

// ... बाकी page code
```

```tsx fileName="src/app/sitemap.ts"
import type { MetadataRoute } from "next";
import { locales, defaultLocale } from "@/i18n";

const origin = "https://example.com";

const formatterLocalizedPath = (locale: string, path: string) =>
  locale === defaultLocale ? origin + path : origin + "/" + locale + path;

export const sitemap = (): MetadataRoute.Sitemap => {
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
};
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

export const robots = (): MetadataRoute.Robots => {
  const disallow = [
    ...withAllLocales("/dashboard"),
    ...withAllLocales("/admin"),
  ];

  return {
    rules: { userAgent: "*", allow: ["/"], disallow },
    host: origin,
    sitemap: origin + "/sitemap.xml",
  };
};
```

  </Tab>
  <Tab label="intlayer" value="intlayer">

```typescript fileName="src/app/[locale]/about/layout.tsx"
import { getIntlayer, getMultilingualUrls } from "intlayer";
import type { Metadata } from "next";
import type { LocalPromiseParams } from "next-intlayer";

export const generateMetadata = async ({
  params,
}: LocalPromiseParams): Promise<Metadata> => {
  const { locale } = await params;

  const metadata = getIntlayer("page-metadata", locale);

  const multilingualUrls = getMultilingualUrls("/about");

  return {
    ...metadata,
    alternates: {
      canonical: multilingualUrls[locale as keyof typeof multilingualUrls],
      languages: { ...multilingualUrls, "x-default": "/about" },
    },
  };
};

// ... बाकी page code
```

```tsx fileName="src/app/sitemap.ts"
import { getMultilingualUrls } from "intlayer";
import type { MetadataRoute } from "next";

const sitemap = (): MetadataRoute.Sitemap => [
  {
    url: "https://example.com/about",
    alternates: {
      languages: { ...getMultilingualUrls("https://example.com/about") },
    },
  },
];
```

```tsx fileName="src/app/robots.ts"
import { getMultilingualUrls } from "intlayer";
import type { MetadataRoute } from "next";

const getAllMultilingualUrls = (urls: string[]) =>
  urls.flatMap((url) => Object.values(getMultilingualUrls(url)) as string[]);

const robots = (): MetadataRoute.Robots => ({
  rules: {
    userAgent: "*",
    allow: ["/"],
    disallow: getAllMultilingualUrls(["/dashboard"]),
  },
  host: "https://example.com",
  sitemap: "https://example.com/sitemap.xml",
});

export default robots;
```

  </Tab>
</Tabs>

> Intlayer आपके sitemap के लिए बहुभाषी URLs उत्पन्न करने के लिए एक `getMultilingualUrls` function प्रदान करता है।

### लोकेल रूटिंग के लिए Middleware

<Tabs defaultTab="next-intl" group='techno'>
  <Tab label="next-i18next" value="next-i18next">

लोकेल डिटेक्शन और रूटिंग को संभालने के लिए एक middleware जोड़ें:

```ts fileName="src/middleware.ts"
import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, locales } from "@/i18n.config";

const PUBLIC_FILE = /\.[^/]+$/; // एक्सटेंशन वाली फाइलों को बाहर करें

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
    (l) => pathname === "/" + l || pathname.startsWith("/" + l + "/")
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
    // इन से शुरू होने वाले पाथ और एक्सटेंशन वाली फाइलों को छोड़कर सभी पाथ से मेल खाएं
    "/((?!api|_next|static|.*\\..*).*)",
  ],
};
```

  </Tab>
  <Tab label="next-intl" value="next-intl">

लोकेल डिटेक्शन और रूटिंग को संभालने के लिए एक middleware जोड़ें:

```ts fileName="src/middleware.ts"
import createMiddleware from "next-intl/middleware";
import { locales, defaultLocale } from "@/i18n";

export default createMiddleware({
  locales: [...locales],
  defaultLocale,
  localeDetection: true,
});

export const config = {
  // API, Next internals और static assets को छोड़ दें
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
```

  </Tab>
  <Tab label="intlayer" value="intlayer">

Intlayer `next-intlayer` package कॉन्फ़िगरेशन के माध्यम से built-in middleware हैंडलिंग प्रदान करता है।

```ts fileName="src/middleware.ts"
import { intlayerProxy } from "next-intlayer/proxy";

export const middleware = intlayerProxy();

// यह middleware केवल app डायरेक्टरी में फाइलों पर लागू होता है
export const config = {
  matcher: "/((?!api|_next|static|.*\\..*).*)",
};
```

Middleware की सेटअप `intlayer.config.ts` फाइल में केंद्रीकृत है।

  </Tab>
</Tabs>

### सेटअप चेकलिस्ट और सर्वोत्तम प्रथाएं

<Tabs defaultTab="next-intl" group='techno'>
  <Tab label="next-i18next" value="next-i18next">

- सुनिश्चित करें कि `lang` और `dir` को `src/app/[locale]/layout.tsx` में रूट `<html>` पर सेट किया गया है।
- अनुवादों को नेमस्पेस में विभाजित करें (उदाहरण के लिए `common.json`, `about.json`) `src/locales/<locale>/` के अंतर्गत।
- क्लाइंट घटकों में `useTranslation('<ns>')` का उपयोग करके और `I18nProvider` को समान नेमस्पेस के साथ स्कोप करके केवल आवश्यक नेमस्पेस लोड करें।
- पेजों को जहां संभव हो स्टैटिक रखें: पेजों पर `export const dynamic = 'force-static'` निर्यात करें; `dynamicParams = false` सेट करें और `generateStaticParams` को लागू करें।
- क्लाइंट सीमाओं के तहत नेस्टेड सिंक सर्वर घटकों का उपयोग करें पहले से गणना की गई स्ट्रिंग्स या `t` फ़ंक्शन और `locale` को पास करके।
- SEO के लिए, मेटाडेटा में `alternates.languages` सेट करें, `sitemap.ts` में स्थानीयकृत URLs की सूची बनाएं, और `robots.ts` में डुप्लिकेट स्थानीयकृत मार्गों को अनुमति न दें।
- लोकेल-जागरूक फॉर्मेटर्स (उदाहरण के लिए, `Intl.NumberFormat(locale)`) को वरीयता दें और यदि React < 19 का उपयोग कर रहे हैं तो उन्हें क्लाइंट पर मेमोइज़ करें।

  </Tab>
  <Tab label="next-intl" value="next-intl">

- **HTML `lang` और `dir` सेट करें**: `src/app/[locale]/layout.tsx` में, `getLocaleDirection(locale)` के माध्यम से `dir` की गणना करें और `<html lang={locale} dir={dir}>` सेट करें।
- **नेमस्पेस द्वारा संदेशों को विभाजित करें**: प्रति लोकेल और नेमस्पेस JSON को व्यवस्थित करें (उदाहरण के लिए, `common.json`, `about.json`)।
- **क्लाइंट पेलोड को कम करें**: पेजों पर, केवल आवश्यक नेमस्पेस को `NextIntlClientProvider` को भेजें (उदाहरण के लिए, `pick(messages, ['common', 'about'])`)।
- **स्टैटिक पेजों को वरीयता दें**: `export const dynamic = 'force-static'` निर्यात करें और सभी `locales` के लिए स्टैटिक params जेनरेट करें।
- **सिंक्रोनस सर्वर घटक**: पूर्व-गणना की गई स्ट्रिंग्स (अनुवादित लेबल, स्वरूपित संख्याएं) को पास करके सर्वर घटकों को सिंक रखें न कि async कॉल या गैर-सीरियलाइज़ेबल फ़ंक्शन।

  </Tab>
  <Tab label="intlayer" value="intlayer">

- **मॉड्यूलर सामग्री**: `.content.{ts|js|json}` फाइलों का उपयोग करके सामग्री शब्दकोशों को घटकों के साथ सह-स्थित करें।
- **प्रकार सुरक्षा**: कंपाइल-समय सामग्री सत्यापन के लिए TypeScript एकीकरण का उपयोग करें।
- **बिल्ड-समय अनुकूलन**: स्वचालित ट्री-शेकिंग और बंडल अनुकूलन के लिए Intlayer के बिल्ड टूल्स का उपयोग करें।
- **एकीकृत टूलिंग**: बिल्ट-इन रूटिंग, SEO सहायकों और विजुअल एडिटर समर्थन का लाभ उठाएं।

  </Tab>
</Tabs>

---

## और विजेता है…

यह सरल नहीं है। प्रत्येक विकल्प के अपने trade-offs हैं। यहाँ मेरा दृष्टिकोण है:

<Columns>
  <Column>

**next-i18next**

- परिपक्व, सुविधाओं से भरपूर, बहुत सारे कम्युनिटी प्लगइन, लेकिन उच्च सेटअप लागत। यदि आपको **i18next के प्लगइन इकोसिस्टम** की आवश्यकता है (उदाहरण के लिए, प्लगइन के माध्यम से उन्नत ICU नियम) और आपकी टीम पहले से i18next को जानती है, तो लचीलेपन के लिए **अधिक कॉन्फ़िगरेशन** स्वीकार करें।

  </Column>
  <Column>

**next-intl**

- सबसे सरल, हल्का-फुल्का, कम निर्णय आप पर थोपे गए। यदि आप एक **न्यूनतम** समाधान चाहते हैं, केंद्रीभूत कैटलॉग के साथ सहज हैं, और आपका ऐप्लिकेशन **छोटा से मध्यम आकार** का है।

  </Column>
  <Column>

**Intlayer**

- आधुनिक Next.js के लिए निर्मित, मॉड्यूलर कंटेंट, type safety, tooling, और कम boilerplate के साथ। यदि आप **component-scoped content**, **strict TypeScript**, **build-time guarantees**, **tree-shaking**, और **batteries-included** routing/SEO/editor tooling को महत्व देते हैं - विशेष रूप से **Next.js App Router**, design-systems और **बड़े, मॉड्यूलर codebases** के लिए।

  </Column>
</Columns>

यदि आप न्यूनतम सेटअप पसंद करते हैं और कुछ मैनुअल wiring स्वीकार करते हैं, तो next-intl एक अच्छा विकल्प है। यदि आपको सभी सुविधाओं की आवश्यकता है और जटिलता में कोई बुराई नहीं है, तो next-i18next काम करता है। लेकिन यदि आप एक आधुनिक, स्केलेबल, मॉड्यूलर समाधान चाहते हैं जिसमें निर्मित tools हैं, तो Intlayer इसे आपको सीधे प्रदान करने का लक्ष्य रखता है।

> **एंटरप्राइज टीमों के लिए विकल्प**: यदि आपको एक well-proven समाधान की आवश्यकता है जो **Crowdin**, **Phrase**, या अन्य पेशेवर translation management systems जैसे स्थापित localization platforms के साथ पूरी तरह से काम करता है, तो अपने mature ecosystem और proven integrations के लिए **next-intl** या **next-i18next** पर विचार करें।

> **Future roadmap**: Intlayer **i18next** और **next-intl** समाधानों के ऊपर काम करने वाले plugins विकसित करने की भी योजना बना रहा है। यह आपको automation, syntax, और content management के लिए Intlayer के फायदे देगा जबकि आपके application code में इन स्थापित समाधानों द्वारा प्रदान की गई security और stability को बनाए रखेगा।

## व्यावहारिक माइग्रेशन नोट्स (next-intl / next-i18next → Intlayer)

- **प्रत्येक फीचर से शुरू करें**: एक बार में एक रूट या कंपोनेंट को **स्थानीय शब्दकोशों** में स्थानांतरित करें।
- **पुराने कैटलॉग्स को समानांतर रखें**: माइग्रेशन के दौरान पुल का काम करें; एक बड़ा बदलाव करने से बचें।
- **सख्त जांचें चालू करें**: बिल्ड-टाइम पर अंतराल जल्दी पता चलने दें।
- **मिडलवेयर और हेल्पर्स अपनाएं**: साइट-वाइड लोकल डिटेक्शन और SEO टैग्स को मानकीकृत करें।
- **बंडल्स को मापें**: जब अप्रयुक्त सामग्री हटाई जाती है तो **बंडल आकार में कमी** की उम्मीद करें।

---

## निष्कर्ष

तीनों लाइब्रेरीज़ मूल स्थानीयकरण में सफल हैं। फर्क यह है कि **आपको कितना काम करना होगा** एक मजबूत, स्केलेबल सेटअप प्राप्त करने के लिए **आधुनिक Next.js** में:

- **Intlayer** के साथ, **मॉड्यूलर कंटेंट**, **सख्त TS**, **बिल्ड-टाइम सुरक्षा**, **ट्री-शेक्ड बंडल**, और **प्रथम श्रेणी का App Router + SEO टूलिंग** **डिफ़ॉल्ट** हैं, न कि बोझ।
- यदि आपकी टीम एक मल्टी-लोकल, कंपोनेंट-चालित ऐप में **रखरखाव और गति** को महत्व देती है, तो Intlayer आज सबसे **पूर्ण** अनुभव प्रदान करता है।

अधिक जानकारी के लिए ['Why Intlayer?' दस्तावेज़](https://intlayer.org/doc/why) देखें।
