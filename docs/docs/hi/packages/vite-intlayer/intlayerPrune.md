---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: intlayerPrune Vite प्लगइन दस्तावेज़ | vite-intlayer
description: देखें कि vite-intlayer पैकेज के लिए intlayerPrune प्लगइन का उपयोग कैसे करें
keywords:
  - intlayerPrune
  - vite
  - प्लगइन
  - ट्री-शेकिंग
  - Intlayer
  - intlayer
  - अंतर्राष्ट्रीयकरण
  - दस्तावेज़
slugs:
  - doc
  - packages
  - vite-intlayer
  - intlayerPrune
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: "प्रारंभिक डॉक्यूमेंटेशन"
author: aymericzip
---

# intlayerPrune Vite प्लगइन दस्तावेज़

`intlayerPrune` Vite प्लगइन का उपयोग आपकी एप्लिकेशन बंडल से उपयोग में न आने वाले डिक्शनरीज़ को ट्री-शेक और प्रून (हटाने) करने के लिए किया जाता है। यह केवल आवश्यक बहुभाषी सामग्री को ही शामिल करके अंतिम बंडल आकार को कम करने में मदद करता है।

> जब आप [`intlayer()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/vite-intlayer/intlayer.md) का उपयोग करते हैं तो plugin स्वचालित रूप से शामिल और कॉन्फ़िगर किया जाता है। यदि आप plugin stack को स्वयं compose कर रहे हैं तो आपको इसे मैन्युअल रूप से रजिस्टर करने की आवश्यकता है।

## उपयोग

### `intlayer()` के भाग के रूप में (अनुशंसित)

अपने Intlayer कॉन्फ़िगरेशन के माध्यम से pruning सक्षम करें और मुख्य प्लगइन सब कुछ संभालता है:

```ts
// intlayer.config.ts
import { defineConfig } from "intlayer";

export default defineConfig({
  build: {
    optimize: true, // prune और minify दोनों को सक्षम करता है
  },
});
```

```ts
// vite.config.ts
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayer()],
});
```

### स्वतंत्र

यदि आप प्लगइन स्टैक को मैन्युअल रूप से कंपोज़ कर रहे हैं, तो `intlayerPrune` और `intlayerMinify` एक `PruneContext` ऑब्जेक्ट साझा करते हैं जिसे एक बार बनाया जाना चाहिए और दोनों को पारित किया जाना चाहिए:

```ts
// vite.config.ts
import { defineConfig } from "vite";
import { intlayerPrune, intlayerMinify } from "vite-intlayer";
import { createPruneContext } from "@intlayer/babel";
import { getConfiguration } from "@intlayer/config/node";

const intlayerConfig = getConfiguration();
const pruneContext = createPruneContext();

export default defineConfig({
  plugins: [
    intlayerPrune(intlayerConfig, pruneContext),
    intlayerMinify(intlayerConfig, pruneContext), // वैकल्पिक, समान संदर्भ से पढ़ता है
  ],
});
```

## यह कैसे काम करता है

### 1. उपयोग विश्लेषण (buildStart)

`buildStart` के दौरान, `intlayerOptimize` plugin (जो `intlayer()` का भी हिस्सा है) `build.filesList` में सूचीबद्ध प्रत्येक component source file को स्कैन करता है। प्रत्येक `useIntlayer('key')` या `getIntlayer('key')` कॉल के लिए, यह रिकॉर्ड करता है कि कौन से fields को exactly एक्सेस किया गया है, जैसे:

```ts
const { title, description } = useIntlayer("myDict");
// records: myDict → { title, description }
```

यह किसी भी `transform` कॉल के चलने से पहले `pruneContext.fieldUsageMap` बनाता है।

### 2. JSON pruning (transform, enforce: 'pre')

जब Vite एक compiled dictionary JSON फ़ाइल को प्रोसेस करता है, तो `intlayerPrune` इसे Vite के built-in JSON → ESM conversion से पहले intercept करता है। यह `pruneContext` से field-usage map को पढ़ता है और किसी भी content field को हटाता है जो recorded usage set में नहीं है।

दो content shapes समर्थित हैं:

- **Static dictionaries** — `{ nodeType: "translation", translation: { en: {...}, fr: {...} } }`. Fields को `translation` के अंदर per-locale pruned किया जाता है।
- **Dynamic (per-locale) dictionaries** — flat `{ fieldA: ..., fieldB: ... }`. Fields को top level पर pruned किया जाता है।

### 3. Edge cases

यदि किसी dictionary की content structure को पहचाना नहीं जा सकता (उदाहरण के लिए, एक असामान्य nested shape), तो इसे `pruneContext.dictionariesWithEdgeCases` में जोड़ा जाता है और **अछूता छोड़ दिया जाता है**। एक warning लॉग की जाती है। `intlayerMinify` भी इन dictionaries को छोड़ देता है।

### 4. Field-rename map

जब pruning सफल होता है, `intlayerPrune` `pruneContext.dictionaryKeyToFieldRenameMap` भी लिखता है — मूल field names से short aliases तक एक mapping। `intlayerMinify` इस map को output JSON में fields को rename करने के लिए पढ़ता है, और `intlayerOptimize` का Babel rename pass source files में property accesses को अपडेट करता है।

## सक्रियण शर्तें

`intlayerPrune` सक्रिय है **केवल** जब निम्नलिखित सभी सत्य हों:

1. Vite कमांड `build` है।
2. `build.optimize` `true` है (या `undefined`, जो builds के लिए डिफ़ॉल्ट रूप से `true` है)।
3. `build.purge` आपके Intlayer config में `true` है।

जब `editor.enabled` `true` होता है तब भी यह सक्रिय रहता है: विज़ुअल एडिटर बिना-मर्ज किए डिक्शनरी के विरुद्ध `dictionaryKey` + `keyPath` के माध्यम से हर संपादन को हल करता है, जिन्हें यह प्लगइन कभी नहीं छूता, और हटाया गया फ़ील्ड वह होता है जिसे कोई भी कंपोनेंट नहीं पढ़ता — इसलिए वह न कभी रेंडर होता है और न ही पेज पर चुना जा सकता है।
