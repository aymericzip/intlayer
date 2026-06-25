---
createdAt: 2026-06-25
updatedAt: 2026-06-25
title: intlayerCompiler Vite प्लगइन दस्तावेज़ | vite-intlayer
description: Vite प्लगइन जो घटक फ़ाइलों से इनलाइन Intlayer सामग्री घोषणाओं को निकालता है और उन्हें बिल्ड/ट्रांसफ़ॉर्म समय पर शब्दकोश JSON फ़ाइलों में लिखता है।
keywords:
  - intlayerCompiler
  - vite
  - प्लगइन
  - कंपाइलर
  - सामग्री
  - शब्दकोश
  - अंतर्राष्ट्रीयकरण
  - i18n
slugs:
  - doc
  - packages
  - vite-intlayer
  - intlayerCompiler
history:
  - version: 9.0.0
    date: 2026-06-25
    changes: "intlayer() में बंडल किया गया; दस्तावेज़ प्रारंभ"
author: aymericzip
---

# intlayerCompiler

`intlayerCompiler` एक Vite प्लगइन है जो घटक स्रोत फ़ाइलों को **इनलाइन Intlayer सामग्री घोषणाओं** — एक अलग `.content.ts` फ़ाइल के बजाय सीधे एक घटक के अंदर परिभाषित सामग्री — के लिए स्कैन करता है और उन्हें ट्रांसफ़ॉर्म चरण के दौरान शब्दकोश JSON फ़ाइलों में लिखता है।

> **Intlayer v9 से** `intlayerCompiler` स्वचालित रूप से मुख्य [`intlayer()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/vite-intlayer/intlayer.md) प्लगइन के अंदर शामिल होता है जब आपके Intlayer कॉन्फ़िगरेशन में `compiler.enabled` दोनों `true` और `compiler.output` सेट होते हैं। आपको इसे अलग से पंजीकृत करने की आवश्यकता केवल तब होती है जब आप कंपाइलर-विशिष्ट कॉन्फ़िगरेशन पर पूर्ण नियंत्रण चाहते हैं।

## उपयोग

### `intlayer()` के हिस्से के रूप में (अनुशंसित, v9+)

अपने Intlayer कॉन्फ़िगरेशन के माध्यम से कंपाइलर को सक्षम करें:

```ts
// intlayer.config.ts
import { defineConfig } from "intlayer";

export default defineConfig({
  compiler: {
    enabled: true,
    output: "./src/dictionaries", // जहां निकाली गई शब्दकोश लिखी जाती हैं
  },
});
```

फिर बिना किसी अतिरिक्त पंजीकरण के मानक प्लगइन का उपयोग करें:

```ts
// vite.config.ts
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayer()],
});
```

### स्टैंडअलोन (जब आवश्यकता हो)

```ts
// vite.config.ts
import { defineConfig } from "vite";
import { intlayerCompiler } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayerCompiler()],
});
```

## विकल्प

```ts
import type { IntlayerCompilerOptions } from "vite-intlayer";
```

| विकल्प           | प्रकार                    | विवरण                                                                                         |
| ---------------- | ------------------------- | --------------------------------------------------------------------------------------------- |
| `configOptions`  | `GetConfigurationOptions` | Intlayer कॉन्फ़िगरेशन ओवरराइड्स जो `getConfiguration()` को अग्रेषित किए जाते हैं।             |
| `compilerConfig` | `Partial<CompilerConfig>` | कंपाइलर-विशिष्ट कॉन्फ़िगरेशन अनुभाग (जैसे `enabled`, `output`, `filesList`) के लिए ओवरराइड्स। |

### उदाहरण

```ts
intlayerCompiler({
  configOptions: { configFile: "./config/intlayer.config.ts" },
  compilerConfig: { enabled: true, output: "./src/dictionaries" },
});
```

## यह कैसे काम करता है

### ट्रांसफ़ॉर्म चरण

प्रत्येक स्रोत फ़ाइल के लिए जो `compiler.filesList` से मेल खाती है, कंपाइलर प्लगइन:

1. फ़ाइल सामग्री को `@intlayer/babel` से `extractContent` के माध्यम से पास करता है।
2. पाई गई प्रत्येक घोषणा के लिए `onExtract` को कॉल करता है, जो परिणामी शब्दकोश JSON को `compiler.output` में लिखता है।
3. मानक `useIntlayer('key')` / `getIntlayer('key')` कॉल द्वारा प्रतिस्थापित इनलाइन घोषणाओं के साथ ट्रांसफ़ॉर्म किए गए स्रोत कोड को लौटाता है।

समर्थित फ़ाइल प्रकार: `.ts`, `.tsx`, `.js`, `.jsx`, `.vue`, `.svelte`, `.astro`।

### HMR (हॉट मॉड्यूल रिप्लेसमेंट)

जब विकास मोड में एक घटक फ़ाइल सहेजी जाती है, तो कंपाइलर:

1. Vite के `handleHotUpdate` हुक के माध्यम से फ़ाइल परिवर्तन का पता लगाता है।
2. अपडेट की गई फ़ाइल से सामग्री को फिर से निकालता है।
3. अपडेट किए गए शब्दकोश JSON को लिखता है।
4. पूर्ण पृष्ठ पुनरारंभ (`server.ws.send({ type: 'full-reload' })`) को ट्रिगर करता है।

500 ms का डिबाउंस शब्दकोश लिखने को स्वयं (जो एक फ़ाइल-परिवर्तन ईवेंट को भी ट्रिगर करता है) एक अनंत पुनः निष्कर्षण लूप पैदा करने से रोकता है।

### डिडुप्लीकेशन

`intlayerCompiler` अन्य बंडल प्लगइन्स की तरह ही `createPrimaryInstanceGuard` डिडुप्लीकेशन तंत्र का उपयोग करता है। जब `intlayer()` (जो कंपाइलर को बंडल करता है) और एक मैन्युअल `intlayerCompiler()` कॉल दोनों मौजूद होते हैं, तो केवल पहला पंजीकृत उदाहरण चलता है — कोई भी शब्दकोश दो बार नहीं लिखा जाता है।
