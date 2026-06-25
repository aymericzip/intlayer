---
createdAt: 2026-06-25
updatedAt: 2026-06-25
title: intlayerMinify Vite प्लगइन दस्तावेज़ | vite-intlayer
description: Vite प्लगइन जो संकलित Intlayer शब्दकोश JSON फ़ाइलों को छोटा (minify) करता है और बंडल आकार को कम करने के लिए वैकल्पिक रूप से सामग्री फ़ील्ड नामों को विकृत (mangle) करता है।
keywords:
  - intlayerMinify
  - vite
  - प्लगइन
  - छोटा करना
  - बंडल आकार
  - शब्दकोश
  - अंतर्राष्ट्रीयकरण
  - i18n
slugs:
  - doc
  - packages
  - vite-intlayer
  - intlayerMinify
history:
  - version: 9.0.0
    date: 2026-06-25
    changes: "दस्तावेज़ प्रारंभ"
author: aymericzip
---

# intlayerMinify

`intlayerMinify` एक Vite प्लगइन है जो उत्पादन बिल्ड (production build) के दौरान संकलित शब्दकोश JSON फ़ाइलों को छोटा (minify) करता है। यह सभी अनावश्यक रिक्त स्थान को हटा देता है और, जब `intlayerPrune` के साथ जोड़ा जाता है, तो बंडल आकार को और कम करने के लिए वैकल्पिक रूप से सामग्री फ़ील्ड नामों को लघु वर्णानुक्रमिक उपनामों (`a`, `b`, `c`, …) में बदल देता है।

> जब आप [`intlayer()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/vite-intlayer/intlayer.md) का उपयोग करते हैं तो यह प्लगइन पहले से ही स्वचालित रूप से शामिल और कॉन्फ़िगर होता है। यदि आप स्वयं प्लगइन स्टैक की रचना कर रहे हैं तो आपको इसे मैन्युअल रूप से पंजीकृत करने की आवश्यकता है।

## उपयोग

```ts
// vite.config.ts
import { defineConfig } from "vite";
import { intlayerMinify, intlayerPrune } from "vite-intlayer";
import { createPruneContext } from "@intlayer/babel";

const pruneContext = createPruneContext();

export default defineConfig({
  plugins: [
    intlayerPrune(intlayerConfig, pruneContext),
    intlayerMinify(intlayerConfig, pruneContext),
  ],
});
```

## सक्रियण शर्तें

`intlayerMinify` **केवल** तब सक्रिय होता है जब निम्नलिखित तीनों सत्य हों:

1. Vite कमांड `build` है (ना कि `serve` / dev)।
2. `build.optimize` `true` है (या `undefined` है, जो बिल्ड के लिए डिफ़ॉल्ट रूप से `true` होता है)।
3. आपके Intlayer कॉन्फ़िगरेशन में `build.minify` `true` है।

यह स्वचालित रूप से **अक्षम** हो जाता है जब `editor.enabled` `true` होता है क्योंकि संपादक को पूर्ण, मानव-पठनीय शब्दकोश सामग्री की आवश्यकता होती है।

## क्या छोटा किया जाता है

प्लगइन दो शब्दकोश स्थानों को लक्षित करता है (जैसा कि `intlayer.system` से हल किया गया है):

- `dictionariesDir` — स्थिर सभी-लोकेल शब्दकोश (जैसे `.intlayer/dictionaries/*.json`)
- `dynamicDictionariesDir` — प्रति-लोकेल गतिशील शब्दकोश

> फ़ेच-मोड शब्दकोश (`fetchDictionariesDir`) को **कभी** छोटा नहीं किया जाता है क्योंकि वे रनटाइम पर अपने मूल फ़ील्ड नामों का उपयोग करके एक रिमोट API से परोसे जाते हैं। फ़ील्ड का नाम बदलने से सर्वर प्रतिक्रिया और क्लाइंट-साइड प्रॉपर्टी एक्सेस के बीच बेमेल पैदा होगा।

## फ़ील्ड-नाम विकृत करना (प्रॉपर्टी छोटा करना)

जब `intlayerPrune` ने कोडबेस का विश्लेषण किया है और `pruneContext.dictionaryKeyToFieldRenameMap` को पॉप्युलेट किया है, तो `intlayerMinify` सामग्री फ़ील्ड नामों का नाम बदलकर छोटे उपनाम भी रख देता है। उदाहरण के लिए:

```json
// पहले
{ "key": "myDict", "content": { "title": "Hello", "description": "World" } }

// बाद में (विकृत करने के साथ)
{ "key": "myDict", "content": { "a": "Hello", "b": "World" } }
```

संगत स्रोत-फ़ाइल प्रॉपर्टी एक्सेस को `intlayerOptimize` के अंदर Babel पास द्वारा बदल दिया जाता है, इसलिए रनटाइम व्यवहार अपरिवर्तित रहता है।

आंतरिक Intlayer फ़ील्ड (`nodeType`, `translation`, आदि) का नाम कभी नहीं बदला जाता है।

## सीमांत-मामला शब्दकोश

`pruneContext.dictionariesWithEdgeCases` (प्रून चरण के दौरान पाई गई संरचनात्मक विसंगतियां) में फ़्लैग किए गए शब्दकोशों को पूरी तरह से छोड़ दिया जाता है — ना तो छोटा किया जाता है और ना ही विकृत किया जाता है — ताकि टूटे हुए डेटा को शिप करने से बचा जा सके।

## योग्य समूह (संग्रह / वेरिएंट / मेटा रिकॉर्ड)

एक `qualifierTypes` सरणी वाले शब्दकोशों (संग्रह, वेरिएंट और मेटा रिकॉर्ड) के लिए, प्लगइन `qualifierTypes` सरणी और `meta` साइड-मैप को शब्दशः सुरक्षित रखता है। केवल `content` प्रविष्टियों के फ़ील्ड नामों को विकृत किया जाता है। रनटाइम पर चयनकर्ता मिलान के लिए उपयोग की जाने वाली समग्र कुंजियों को कभी नहीं छुआ जाता है।
