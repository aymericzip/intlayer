---
createdAt: 2026-07-08
updatedAt: 2026-08-22
title: Intlayer Analytics | सामग्री के प्रदर्शन को ट्रैक करें और A/B परीक्षण चलाएं
description: जानें कि @intlayer/analytics कैसे पेज/लोकेल व्यू और सामग्री के प्रदर्शन को ट्रैक करता है, और अपने Intlayer सामग्री पर A/B परीक्षण चलाने के लिए इसका उपयोग कैसे करें।
keywords:
  - Analytics (एनालिटिक्स)
  - A/B Testing (A/B परीक्षण)
  - Audience (दर्शक)
  - Internationalization (अंतर्राष्ट्रीयकरण)
  - Documentation (दस्तावेज़ीकरण)
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - analytics
history:
  - version: 9.3.3
    date: 2026-08-22
    changes: "`@intlayer/analytics` इंस्टॉल होने पर एनालिटिक्स डिफ़ॉल्ट रूप से सक्षम किया गया"
  - version: 9.0.0
    date: 2026-07-08
    changes: "Init doc — @intlayer/analytics पैकेज, प्रोवाइडर/नोड-लेवल ट्रैकिंग, A/B परीक्षण, डैशबोर्ड"
author: aymericzip
---

# Intlayer Analytics दस्तावेज़ीकरण

`@intlayer/analytics` एक वैकल्पिक सहयोगी पैकेज है जो आपको बताता है कि आपके आगंतुकों को **वास्तव में कौन सी सामग्री दिखाई जा रही है** — कौन सा पृष्ठ, किस लोकेल में, और अनुवादित सामग्री का कौन सा विशिष्ट हिस्सा — ताकि आप अपने दर्शकों को समझ सकें और **सामग्री पर A/B परीक्षण चला सकें**।

## विषय-सूची (Table of Contents)

<TOC/>

---

## यह क्या ट्रैक करता है

`@intlayer/analytics` तीन प्रकार की अनाम घटनाओं को बैच में एकत्रित करता है:

| घटना (Event)       | कहाँ कैप्चर होता है                            | यह आपको क्या बताता है                                                                                                                                       |
| ------------------ | ---------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `page_view`        | प्रोवाइडर स्तर (`IntlayerProvider`)            | प्रारंभिक लोड, मार्ग (route) परिवर्तन, या लोकेल स्विच पर एक सत्र (session) ने कौन सा पृष्ठ और लोकेल देखा।                                                   |
| `content_exposure` | नोड स्तर (`useIntlayer` / इंटरप्रेटर प्लगइन्स) | कौन सी डिक्शनरी कुंजी (dictionary key) / कुंजी पथ वास्तव में हल (resolved) और प्रदर्शित किया गया था — और यदि एक प्रयोग का हिस्सा है, तो कौन सा **वेरिएंट**। |
| `conversion`       | जहाँ भी आप `useConversion()` कॉल करते हैं      | एक लक्ष्य पूरा हुआ (साइनअप, क्लिक, खरीदारी...) जो उस A/B वेरिएंट को जिम्मेदार ठहराया गया है जिसके संपर्क में सत्र आया था।                                   |

घटनाएँ मेमोरी में एकत्रित की जाती हैं और **लगभग हर 20 सेकंड में एक एकल बैच अनुरोध** के रूप में भेजी जाती हैं — प्रत्येक कीस्ट्रोक या रेंडर पर कभी नहीं — इसलिए एनालिटिक्स कभी भी पहले रेंडर के समय को प्रभावित नहीं करता है या प्रति इंटरैक्शन एक अनुरोध नहीं जोड़ता है।

## यह सामग्री पर A/B परीक्षण को कैसे सशक्त बनाता है

Intlayer आपको पहले से ही सामग्री [वेरिएंट (Variants)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dynamic_dictionaries/index.md) घोषित करने की अनुमति देता है (उदाहरण के लिए `control` और `black_friday` वेरिएंट के साथ एक `hero-banner` डिक्शनरी)। `@intlayer/analytics` इस प्रक्रिया को पूरा करता है:

1. `getVariant(experimentKey, variants)` प्रत्येक अनाम सत्र को निश्चित रूप से एक वेरिएंट सौंपता है — यह सत्र आईडी और प्रयोग कुंजी का एक शुद्ध फ़ंक्शन (pure function) है, इसलिए यह असाइनमेंट **सत्र भर में स्थिर** रहता है और पहले रेंडर से पहले **सर्वर राउंड-ट्रिप** की आवश्यकता नहीं होती है (कोई झिलमिलाहट (flicker) नहीं, कोई लेआउट शिफ्ट नहीं)।
2. प्रत्येक `content_exposure` घटना उस `variant` को वहन करती है जो दिखाया गया था।
3. `useConversion()` आपको उस वेरिएंट में एक लक्ष्य (जैसे `"cta_click"`) को जिम्मेदार ठहराने (attribute) की अनुमति देता है।
4. डैशबोर्ड का प्रयोग परिणाम एंडपॉइंट सांख्यिकीय महत्व (ज़ेड-टेस्ट) सहित प्रति वेरिएंट रूपांतरण दरों (conversion rates) की तुलना करता है।

## इंस्टालेशन (Installation)

`@intlayer/analytics` हर फ्रेमवर्क पैकेज (`react-intlayer`, `next-intlayer`, `vue-intlayer`, …) की एक **वैकल्पिक निर्भरता (optional dependency)** है, इसलिए अधिकांश प्रोजेक्ट्स में यह पहले से मौजूद होती है। यदि आपका सेटअप वैकल्पिक निर्भरताओं को छोड़ देता है (`npm install --no-optional`, …), तो इसे स्पष्ट रूप से इंस्टॉल करें:

```bash packageManager="npm"
npm install @intlayer/analytics
```

```bash packageManager="yarn"
yarn add @intlayer/analytics
```

```bash packageManager="pnpm"
pnpm add @intlayer/analytics
```

```bash packageManager="bun"
bun add @intlayer/analytics
```

एनालिटिक्स चालू करने के लिए पैकेज इंस्टॉल करना ही पर्याप्त है: `analytics.enabled` का डिफ़ॉल्ट `true` है, और जब पैकेज आपके प्रोजेक्ट में नहीं मिलता तो `@intlayer/config` इसे `false` कर देता है। यदि आप इसे स्थापित नहीं करते हैं, तो प्रत्येक एकीकरण बिंदु (integration point) एक नो-ऑप (no-op) के रूप में हल हो जाता है — नीचे [स्थापित न होने पर शून्य लागत](#स्थापित-न-होने-पर-शून्य-लागत) देखें।

## कॉन्फ़िगरेशन (Configuration)

शुरू करने के लिए एनालिटिक्स को किसी कॉन्फ़िगरेशन की आवश्यकता नहीं है: यह **डिफ़ॉल्ट रूप से सक्षम** है और अपने एंडपॉइंट तथा प्रोजेक्ट कुंजी के लिए **मौजूदा `editor` कॉन्फ़िगरेशन ब्लॉक का ही पुनः उपयोग करता है**।

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  editor: {
    backendURL: "https://back.intlayer.org", // एनालिटिक्स घटनाओं के लिए अंतर्ग्रहण (ingestion) एंडपॉइंट के रूप में भी उपयोग किया जाता है
    clientId: "your-client-id", // एनालिटिक्स प्रोजेक्ट कुंजी के रूप में भी उपयोग किया जाता है
    clientSecret: "your-client-secret",
  },
};

export default config;
```

- `editor.backendURL` — वह बेस URL जहाँ एनालिटिक्स घटनाएँ भेजी जाती हैं (`POST {backendURL}/api/analytics/events`)।
- `editor.clientId` — प्रत्येक अंतर्ग्रहण घटना के लिए जिम्मेदार सार्वजनिक प्रोजेक्ट कुंजी। यह **सक्षम स्विच (enable switch)** के रूप में भी कार्य करता है: जब तक `clientId` कॉन्फ़िगर नहीं किया जाता है, तब तक एनालिटिक्स पूरी तरह से अक्षम (और ट्री-शेक (tree-shaken), नीचे देखें) रहता है।

यदि आप Intlayer को सेल्फ-होस्ट करते हैं, तो एनालिटिक्स स्वचालित रूप से आपके स्वयं के इंस्टेंस को इंगित करता है क्योंकि यह `editor.backendURL` साझा करता है।

### ऑप्ट-आउट कैसे करें

वैकल्पिक `analytics` ब्लॉक संग्रहण को समायोजित करता है — या बंद कर देता है:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  analytics: {
    enabled: false, // डिफ़ॉल्ट: true — संपूर्ण इंटीग्रेशन को बंडल से बाहर कर देता है
    flushInterval: 20_000, // दो बैच फ़्लश के बीच मिलीसेकंड
    sampleRate: 1, // रिकॉर्ड की जाने वाली सत्रों का अंश, 0 (कोई नहीं) से 1 (सभी) तक
  },
};

export default config;
```

`@intlayer/analytics` को अनइंस्टॉल करने का प्रभाव `enabled: false` के समान ही है। पूरी फ़ील्ड सूची के लिए [कॉन्फ़िगरेशन संदर्भ](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/configuration.md) देखें।

## फ्रेमवर्क सपोर्ट (Framework support)

एनालिटिक्स `react-intlayer` के साझा `IntlayerProvider` में वायर्ड है, इसलिए यह आज हर उस जगह उपलब्ध है जहाँ उस प्रदाता (provider) का उपयोग किया जाता है:

| फ्रेमवर्क                                                | स्थिति (Status)                                                                                                                    |
| -------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| React                                                    | ✅ उपलब्ध                                                                                                                          |
| Next.js (`next-intlayer`)                                | ✅ उपलब्ध (`react-intlayer` के माध्यम से)                                                                                          |
| React Native / Expo (`react-native-intlayer`)            | ✅ उपलब्ध (`react-intlayer` के माध्यम से)                                                                                          |
| Vue, Svelte, Angular, Solid, Preact, Lit, Astro, Vanilla | 🚧 योजनाबद्ध (Planned) — समान क्लाइंट, प्रदाता-स्तर (provider-level) बाइंडिंग `@intlayer/editor` के रिलीज़ पैटर्न का पालन करते हुए |

## उपयोग (Usage)

### स्वचालित प्रोवाइडर-स्तर ट्रैकिंग (Automatic provider-level tracking)

कोड में कोई परिवर्तन आवश्यक नहीं है। एक बार जब `@intlayer/analytics` स्थापित हो जाता है और `editor.clientId` कॉन्फ़िगर हो जाता है, तो `IntlayerProvider` स्वचालित रूप से:

- माउंट होने पर एनालिटिक्स क्लाइंट को इनिशियलाइज़ करता है,
- प्रारंभिक लोड पर एक `page_view` रिकॉर्ड करता है,
- हर लोकेल परिवर्तन पर एक `page_view` रिकॉर्ड करता है,
- ~20 सेकंड का फ्लश लूप शुरू करता है और अनमाउंट/टैब बंद होने पर किसी भी शेष घटनाओं को फ्लश करता है (`navigator.sendBeacon` के माध्यम से, `fetch(..., { keepalive: true })` पर फ़ॉलबैक करते हुए)।

### स्वचालित नोड-स्तर ट्रैकिंग (Automatic node-level tracking)

हर बार जब `useIntlayer` प्रदर्शन के लिए सामग्री के एक टुकड़े को हल करता है, तो इंटरप्रेटर उस सटीक `dictionaryKey` + कुंजी पथ + लोकेल के लिए एक `content_exposure` घटना की रिपोर्ट करता है — फिर से, कोई कोड परिवर्तन आवश्यक नहीं है। फ्लश विंडो (लगभग 20 सेकंड) के भीतर एक ही नोड के दोहराए गए एक्सपोज़र को `count` के साथ एक ही घटना में मिला दिया जाता है (coalesced), इसलिए 50 बार फिर से रेंडर होने वाली सूची 50 घटनाएँ नहीं भेजती है।

### A/B परीक्षण के लिए रूपांतरण ट्रैक करना (Tracking conversions for A/B tests)

उस वेरिएंट को लक्ष्य (goal) सौंपने के लिए `useConversion()` का उपयोग करें जिसे एक सत्र (session) ने देखा था:

```tsx fileName="CTAButton.tsx" codeFormat="tsx"
import { useConversion } from "react-intlayer";

const CTAButton = () => {
  const trackConversion = useConversion();

  return (
    <button
      onClick={() =>
        trackConversion({
          experimentKey: "homepage-hero",
          variant: "black_friday",
          goal: "cta_click",
        })
      }
    >
      शुरू करें (Get started)
    </button>
  );
};
```

### क्लाइंट-साइड वेरिएंट को हल करना (Resolving a variant client-side)

```tsx fileName="useHeroVariant.ts" codeFormat="tsx"
import { getGlobalAnalyticsClient } from "@intlayer/analytics/client";

const client = getGlobalAnalyticsClient();
const variant = client?.getVariant("homepage-hero", [
  "control",
  "black_friday",
]);
```

## गोपनीयता और प्रदर्शन (Privacy & performance)

- **डिज़ाइन द्वारा अनाम (Anonymous by design)**: सत्र (sessions) एक घूर्णन आईडी (rotating id) द्वारा पहचाने जाते हैं; बैकएंड कभी भी केवल उस आईडी का **SHA-256 हैश** संग्रहीत करता है — कच्चा आईडी (raw id) कभी नहीं, और आईपी (IP) पता कभी नहीं।
- **स्थान अनुमानित है (Location is coarse)**: केवल एक देश कोड, जिसे CDN जियोलोकेशन हेडर (`cf-ipcountry`, `x-vercel-ip-country`, ...) से प्राप्त किया जाता है — कोई IP पढ़ा या संग्रहीत नहीं किया जाता है।
- **URL खोज मापदंडों (search params) को बाहर करते हैं** डिफ़ॉल्ट रूप से, इसलिए क्वेरी स्ट्रिंग कभी भी कैप्चर नहीं की जाती हैं।
- **सैंपलिंग (Sampling)**: `sampleRate` आपको उच्च-ट्रैफ़िक ऐप्स पर सामग्री-एक्सपोज़र घटनाओं का केवल एक अंश (fraction) रखने की अनुमति देता है।
- **बैचिंग (Batched)**: लगभग हर 20 सेकंड में एक अनुरोध (`flushInterval`), या यदि बफ़र भर जाता है तो पहले (`maxBufferSize`) — प्रति घटना कभी भी एक अनुरोध नहीं।

### स्थापित न होने पर शून्य लागत (Zero-cost when not installed)

`@intlayer/analytics` पूरी तरह से उसी वैकल्पिक-निर्भरता पैटर्न का पालन करता है जैसा कि `@intlayer/editor`:

- प्रत्येक एकीकरण बिंदु पैकेज को **`try/catch` में लिपटे गतिशील (dynamic) `import()`** के माध्यम से लोड करता है — एक ऐप जो कभी भी `@intlayer/analytics` स्थापित नहीं करता है वह बंडल-आकार या रनटाइम लागत का भुगतान नहीं करता है, और कभी कोई त्रुटि नहीं देखता है;
- एक कंपाइल-टाइम एनवायरनमेंट वेरिएबल (`INTLAYER_ANALYTICS_ENABLED`), जिसे `@intlayer/config` तब स्वतः `'false'` कर देता है जब पैकेज इंस्टॉल न हो, `analytics.enabled` `false` हो, या `editor.clientId` कॉन्फ़िगर न हो — जिससे बंडलर संपूर्ण इंटीग्रेशन को **डेड कोड के रूप में हटा (dead-code-eliminate)** सकते हैं;
- एनालिटिक्स Intlayer संपादक/CMS पूर्वावलोकन (preview) iframe के अंदर अक्षम है, इसलिए संपादक सत्रों को कभी भी वास्तविक ट्रैफ़िक के रूप में नहीं गिना जाता है।

## डैशबोर्ड: एनालिटिक्स पृष्ठ (Dashboard: Analytics page)

एक बार जब आपका प्रोजेक्ट घटनाओं को एकत्र कर लेता है, तो [Intlayer डैशबोर्ड](https://app.intlayer.org/analytics) में **Analytics** पृष्ठ (प्रोजेक्ट का चयन करने के बाद साइडबार में दिखाई देता है) दिखाता है:

- **सक्रिय उपयोगकर्ता (Active users)** — चयनित रोलिंग विंडो (7 / 30 / 90 दिन) में विशिष्ट आगंतुक (distinct visitors)।
- **आज के उपयोगकर्ता** और **पिछले 7 दिनों में उपयोगकर्ता**।
- चयनित विंडो के दौरान **पेज व्यू (Page views)**।
- दैनिक विशिष्ट आगंतुकों का **विकास ग्राफ (Evolution graph)**।
- **लोकेल्स (Locales)** और **स्थान (Location)** ब्रेकडाउन टैब, जो आपके दर्शकों को लोकेल और देश के अनुसार रैंक करते हैं।

## बैकएंड API संदर्भ (Backend API reference)

सभी रीड एंडपॉइंट्स (read endpoints) के लिए प्रमाणीकरण की आवश्यकता होती है; अंतर्ग्रहण (ingestion) सार्वजनिक है और बॉडी (body) में `clientId` द्वारा जिम्मेदार ठहराया जाता है।

| विधि (Method) | एंडपॉइंट (Endpoint)                         | विवरण (Description)                                                                 |
| ------------- | ------------------------------------------- | ----------------------------------------------------------------------------------- |
| `POST`        | `/api/analytics/events`                     | घटनाओं का एक बैच अंतर्ग्रहण करें (सार्वजनिक, बॉडी में `clientId` द्वारा जिम्मेदार)। |
| `GET`         | `/api/analytics/overview`                   | प्रमाणित प्रोजेक्ट के लिए पृष्ठ/लोकेल का कुल योग।                                   |
| `GET`         | `/api/analytics/audience?days=30`           | विशिष्ट आगंतुक, पेज व्यू, दैनिक श्रृंखला, लोकेल + देश ब्रेकडाउन।                    |
| `GET`         | `/api/analytics/content-stats`              | प्रति-सामग्री एक्सपोज़र का कुल योग, डिक्शनरी कुंजी / पथ / लोकेल द्वारा समूहीकृत।    |
| `GET`         | `/api/analytics/experiments/:experimentKey` | A/B प्रयोग के लिए प्रति-वेरिएंट रूपांतरण दर और सांख्यिकीय महत्व।                    |

आप इन्हें [CMS SDK](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_CMS.md) के साथ प्रोग्रामेटिक रूप से भी कॉल कर सकते हैं:

```ts fileName="analytics.ts"
import { createIntlayerCMS } from "@intlayer/api";
import { analyticsEndpoint } from "@intlayer/api/analytics";

const cms = createIntlayerCMS();

const { data: audience } = await analyticsEndpoint(cms).getAudience(30);
```

## उपयोगी कड़ियाँ (Useful links)

- [डायनामिक डिक्शनरीज़ - कलेक्शंस और वेरिएंट्स (Dynamic Dictionaries)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/dynamic_dictionaries/index.md)
- [Intlayer CMS - CMS SDK](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_CMS.md)
- [Intlayer विज़ुअल एडिटर (Visual Editor)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/intlayer_visual_editor.md)
- [कॉन्फ़िगरेशन संदर्भ (Configuration Reference)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/configuration.md)
- [सेल्फ-होस्टिंग गाइड (Self-Hosting Guide)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/self_hosting.md)
