---
createdAt: 2026-08-12
updatedAt: 2026-08-12
title: ESLint प्लगइन | Intlayer के लिए लिंट नियम
description: eslint-plugin-intlayer के साथ हार्डकोडेड स्ट्रिंग्स, ऐसे डायनामिक कॉल्स जिन्हें Intlayer कंपाइलर ऑप्टिमाइज़ नहीं कर सकता, और अप्रयुक्त शब्दकोश सामग्री का पता लगाएं। React, Vue, Svelte, Angular और Astro में ESLint और oxlint के साथ काम करता है।
keywords:
  - Intlayer
  - ESLint
  - oxlint
  - लिंटिंग
  - i18n
  - अंतर्राष्ट्रीयकरण
  - no-raw-text
  - हार्डकोडेड स्ट्रिंग्स
  - अप्रयुक्त अनुवाद
  - अप्रयुक्त सामग्री
  - React
  - Vue
  - Svelte
  - Angular
slugs:
  - doc
  - eslint
history:
  - version: 9.3.1
    date: 2026-08-12
    changes: "प्रारंभिक इतिहास"
author: aymericzip
---

# ESLint x OXLint प्लगइन

`eslint-plugin-intlayer` उन i18n गलतियों को पकड़ता है जिन्हें TypeScript नहीं पकड़ सकता:

1. **हार्डकोडेड टेक्स्ट** जो कभी डिक्शनरी में नहीं गया।
2. **डायनामिक कॉल्स** जो टाइप-चेक पास करते हैं और रन होते हैं, लेकिन Intlayer कंपाइलर उन्हें ऑप्टिमाइज़ नहीं कर सकता।
3. **अप्रयुक्त सामग्री (Dead content)** — डिक्शनरी और फ़ील्ड्स जिन्हें प्रोजेक्ट में कहीं भी नहीं पढ़ा जाता (वैकल्पिक/ऑप्ट-इन)।

अज्ञात डिक्शनरी कीज, अज्ञात फ़ील्ड पाथ और अनुपलब्ध लोकेल्स पहले से ही कंपाइल एरर हैं, इसलिए प्लगइन उन्हें दोबारा रिपोर्ट नहीं करता है।

## इंस्टॉलेशन

```bash packageManager="npm"
npm install --save-dev eslint-plugin-intlayer
```

```bash packageManager="pnpm"
pnpm add --save-dev eslint-plugin-intlayer
```

```bash packageManager="yarn"
yarn add --dev eslint-plugin-intlayer
```

ESLint 9 या बाद के संस्करण (flat config) की आवश्यकता है।

## उपयोग

यह प्लगइन ESLint और [oxlint](https://oxc.rs) दोनों में समान नियमों और विकल्पों के साथ चलता है।

<Tabs defaultTab="eslint">
  <Tab label="ESLint" value="eslint">

```javascript fileName="eslint.config.mjs" codeFormat="esm"
import intlayer from "eslint-plugin-intlayer";

export default [...intlayer.configs.recommended];
```

या नियमों को एक-एक करके सक्षम करें:

```javascript fileName="eslint.config.mjs" codeFormat="esm"
import intlayer from "eslint-plugin-intlayer";

export default [
  {
    plugins: { intlayer },
    rules: {
      "intlayer/no-raw-text": "warn",
      "intlayer/static-dictionary-key": "error",
      "intlayer/no-dynamic-field-access": "error",
      "intlayer/enforce-adapter-import": "warn",
      "intlayer/no-unused-content": "warn",
    },
  },
];
```

  </Tab>
  <Tab label="oxlint" value="oxlint">

```json fileName=".oxlintrc.json"
{
  "jsPlugins": ["eslint-plugin-intlayer"],
  "rules": {
    "intlayer/no-raw-text": "warn",
    "intlayer/static-dictionary-key": "error",
    "intlayer/no-dynamic-field-access": "error",
    "intlayer/enforce-adapter-import": "warn"
  }
}
```

दो सावधानियां: oxlint का JS प्लगइन समर्थन अभी भी अल्फा चरण में है, और oxlint कस्टम पार्सर्स का समर्थन नहीं करता है — इसलिए `.vue`, `.svelte`, `.astro` और Angular टेम्प्लेट्स को वहां लिंट नहीं किया जाता है। अपनी JS/TS/JSX फ़ाइलों पर oxlint चलाएं और बाकी के लिए ESLint बनाए रखें।

`no-unused-content` को ऊपर जानबूझकर छोड़ दिया गया है: इसे नियम संदर्भ से कार्यशील निर्देशिका और जांची गई फ़ाइल पथ की आवश्यकता होती है, जिसकी गारंटी अल्फा JS प्लगइन ब्रिज नहीं देता है। इसे ESLint के तहत चलाएं।

  </Tab>
</Tabs>

### कॉन्फ़िग्स

| कॉन्फ़िग        | `no-raw-text`             | `static-dictionary-key` | `no-dynamic-field-access` | `enforce-adapter-import` | `no-unused-content` |
| --------------- | ------------------------- | ----------------------- | ------------------------- | ------------------------ | ------------------- |
| `recommended`   | warn                      | error                   | error                     | off                      | off                 |
| `strict`        | error (+ गैर-JSX लिटरल्स) | error                   | error                     | error                    | off                 |
| `contract-only` | off                       | error                   | error                     | off                      | off                 |

`recommended` जानबूझकर `no-raw-text` को `warn` पर रखता है: इसे किसी मौजूदा कोडबेस पर लागू करने से सभी अनुवादित न किए गए स्ट्रिंग्स एक साथ सामने आ जाते हैं, जिससे पहले दिन ही आपका बिल्ड टूटना नहीं चाहिए।

`enforce-adapter-import` डिफ़ॉल्ट रूप से बंद है — यदि आप चाहें तो इसे स्पष्ट रूप से सक्षम करें।

`no-unused-content` हर कॉन्फ़िग में बंद है, जिसमें `strict` भी शामिल है। यह एकमात्र ऐसा नियम है जो आपके Intlayer कॉन्फ़िगरेशन को पढ़ता है और डिस्क से आपकी सोर्स फ़ाइलों को स्कैन करता है, इसलिए इसे चालू करना एक विचारशील निर्णय होना चाहिए।

## नियम

### `no-raw-text`

उपयोगकर्ता-उन्मुख ऐसे टेक्स्ट की रिपोर्ट करता है जो डिक्शनरी में घोषित नहीं है। यह `intlayer extract` के समान डिटेक्शन का उपयोग करता है, इसलिए ब्रांड नाम, CSS क्लास और तकनीकी पहचानकर्ताओं को अनदेखा कर दिया जाता है।

```jsx
// ✗ रिपोर्ट किया गया
<h1>Welcome to our documentation</h1>
<input placeholder="Enter your email address" />

// ✓ सही
const { title } = useIntlayer("home");
<h1>{title}</h1>
```

सामग्री घोषणा फ़ाइलें (`*.content.ts`, …) छोड़ दी जाती हैं।

एक बार में पूरी फ़ाइल को ठीक करने के लिए, `npx intlayer extract` चलाएं और कंपाइलर को स्ट्रिंग्स को डिक्शनरी में स्थानांतरित करने दें।

**विकल्प**

```javascript fileName="eslint.config.mjs" codeFormat="esm"
{
  "intlayer/no-raw-text": [
    "warn",
    {
      // वे विशेषताएं जिनका मान उपयोगकर्ता-उन्मुख टेक्स्ट है।
      // डिफ़ॉल्ट: title, placeholder, alt, aria-label, label
      attributes: ["title", "placeholder", "alt", "aria-label", "label"],

      // वे तत्व जिनकी सामग्री कभी भी उपयोगकर्ता-उन्मुख टेक्स्ट नहीं होती है।
      // डिफ़ॉल्ट: code, pre, script, style
      ignoreElements: ["code", "pre", "script", "style"],

      // कभी रिपोर्ट न किए जाने वाले टेक्स्ट के लिए रेगुलर एक्सप्रेशन।
      ignorePatterns: ["^Powered by"],

      // मार्कअप के बाहर स्ट्रिंग लिटरल्स की भी रिपोर्ट करें। डिफ़ॉल्ट: false
      includeStringLiterals: false,
    },
  ],
}
```

### `static-dictionary-key`

आवश्यकता है कि डिक्शनरी कुंजी एक स्ट्रिंग लिटरल होनी चाहिए।

कंपाइलर केवल तभी डिक्शनरी को प्री-लोड कर सकता है जब वह कॉल साइट पर सीधे कुंजी पढ़ सके। एक गणना की गई कुंजी के साथ यह चुपचाप अनुकूलन को छोड़ देता है और इसके बजाय हर डिक्शनरी को बंडल कर देता है।

```typescript
// ✗ रिपोर्ट किया गया
useIntlayer(dictionaryKey);
useIntlayer(`home-${suffix}`);
getTranslations({ namespace: page });

// ✗ वेरिएबल अभी भी लिटरल नहीं है
const key = "home";
useIntlayer(key);

// ✓ सही
useIntlayer("home");
getTranslations({ namespace: "home" });
```

यह `useIntlayer`, `getIntlayer` और प्रत्येक संगतता एडॉप्टर (`useTranslation`, `useTranslations`, `formatMessage`, `<FormattedMessage id>`, `<Trans i18nKey>`, …) पर लागू होता है।

### `no-dynamic-field-access`

आवश्यकता है कि डिक्शनरी से आप जो फ़ील्ड पढ़ते हैं वह स्थैतिक रूप से ज्ञात हो।

कंपाइलर उन फ़ील्ड्स को हटा देता है जिनका उपयोग वह नहीं देखता है। एक कंप्यूटेड एक्सेस इसके लिए अदृश्य होता है, इसलिए रनटाइम पर यह `undefined` लौटा सकता है।

```typescript
// ✗ रिपोर्ट किया गया
const content = useIntlayer("home");
content[fieldName];

const t = useTranslations("home");
t(messageKey);

// ✓ सही
content.title;
content["title"];
content.items[0];
t("hero.title");
```

### `enforce-adapter-import`

मूल पैकेज के बजाय `@intlayer/*` संगतता एडॉप्टर को प्राथमिकता देता है। मूल पैकेज केवल तभी Intlayer पर रीज़ॉल्व होता है जब बंडलर उपनाम कॉन्फ़िगर किया गया हो; एडॉप्टर हमेशा करता है। `--fix` के साथ ऑटोफ़िक्सेबल।

```typescript
// ✗ रिपोर्ट किया गया
import { useTranslation } from "react-i18next";
import { getTranslations } from "next-intl/server";

// ✓ सही
import { useTranslation } from "@intlayer/react-i18next";
import { getTranslations } from "@intlayer/next-intl/server";
```

### `no-unused-content`

**डिफ़ॉल्ट रूप से बंद।** ऐसी सामग्री की रिपोर्ट करता है जिसे आपके प्रोजेक्ट में कुछ भी नहीं पढ़ता है, साथ ही एक से अधिक स्थानों पर घोषित डिक्शनरी कीज की रिपोर्ट करता है।

```typescript fileName="src/home.content.ts"
export default {
  key: "home", // ✗ तब रिपोर्ट किया जाता है जब प्रोजेक्ट में कोई कॉलर "home" का अनुरोध नहीं करता है
  content: {
    title: t({ hi: "शीर्षक", en: "Title" }),

    // ✗ तब रिपोर्ट किया जाता है जब कुछ भी `hero` को नहीं पढ़ता है
    hero: {
      subtitle: t({ hi: "उपशीर्षक", en: "Subtitle" }),
    },
  },
};
```

अन्य नियमों के विपरीत, यह नियम केवल सामने की फ़ाइल से निर्णय नहीं ले सकता — एक फ़ील्ड केवल पूरे प्रोजेक्ट के सापेक्ष ही अप्रयुक्त होती है। लिंट रन की पहली सामग्री घोषणा पर यह आपके Intlayer कॉन्फ़िगरेशन को लोड करता है, उन सोर्स फ़ाइलों को स्कैन करता है जिन्हें वह कॉन्फ़िगरेशन घोषित करता है (`build.traversePattern`, `compiler.transformPattern`) और उसी उपयोग विश्लेषक को चलाता है जो `@intlayer/lsp` और VS Code एक्सटेंशन में "अप्रयुक्त" स्ट्राइकथ्रू को शक्ति प्रदान करता है। परिणाम को `cacheTtl` मिलीसेकंड के लिए कैश किया जाता है, इसलिए स्कैन प्रत्येक फ़ाइल के बजाय प्रति रन एक बार होता है।

**विकल्प**

```javascript fileName="eslint.config.mjs" codeFormat="esm"
{
  "intlayer/no-unused-content": [
    "warn",
    {
      // उन डिक्शनरी कीज की रिपोर्ट करें जिन्हें कोई संदर्भित नहीं करता है। डिफ़ॉल्ट: true
      reportUnusedDictionaries: true,

      // उन कंटेंट फ़ील्ड्स की रिपोर्ट करें जिन्हें कुछ भी नहीं पढ़ता है। डिफ़ॉल्ट: true
      reportUnusedFields: true,

      // एक से अधिक स्थानों पर घोषित कीज की रिपोर्ट करें। डिफ़ॉल्ट: true
      reportDuplicateKeys: true,

      // कभी रिपोर्ट न किए जाने वाले फ़ील्ड पाथ के लिए रेगुलर एक्सप्रेशन।
      ignoreFields: ["^meta"],

      // प्रोजेक्ट रूट जहां से स्कैन शुरू होता है। डिफ़ॉल्ट: ESLint की कार्यशील निर्देशिका
      baseDir: process.cwd(),

      // एक प्रोजेक्ट स्कैन का पुन: उपयोग कितने समय तक किया जाता है (ms में)। डिफ़ॉल्ट: 30000
      cacheTtl: 30000,
    },
  ],
}
```

जब आप लंबे समय तक चलने वाले एडिटर सर्वर से लिंट करते हैं और चाहते हैं कि आपके संपादन जल्दी दिखाई दें, तो `cacheTtl` कम करें; जब एक ही लिंट रन मोनोरेपो में कई Intlayer प्रोजेक्ट्स में फैला हो तो `baseDir` सेट करें।

> **यह गलत रिपोर्ट से बचने को प्राथमिकता देता है।** यहां एक झूठी सकारात्मक रिपोर्ट एक अनुवाद को हटा सकती है, इसलिए जब डिक्शनरी का उपयोग ऐसे तरीके से किया जाता है जिसे विश्लेषण ट्रैक नहीं कर सकता है, तो कुछ भी रिपोर्ट नहीं किया जाता है: पूरा कंटेंट ऑब्जेक्ट पास करना, इससे बाउंड अनुवाद फ़ंक्शन (`const t = useTranslations("home")`), सीधे आयात के माध्यम से पहुंचा गया डिक्लेरेशन (`useDictionary(myDictionary)`), किसी अन्य डिक्शनरी से `nest()`, या स्प्रेड ऑपरेटर द्वारा गैर-विस्तृत बनाई गई फ़ील्ड सूची। सिंगल-फ़ाइल घटक (`.vue`, `.svelte`, `.astro`) उनके द्वारा उल्लिखित डिक्शनरी के प्रत्येक फ़ील्ड का उपयोग करते हुए गिने जाते हैं, क्योंकि उनके स्क्रिप्ट ब्लॉक यहां पार्स नहीं किए जाते हैं।

`reportDuplicateKeys` उन अनमर्ज्ड डिक्शनरीज़ को पढ़ता है जिन्हें बिल्ड `.intlayer/` के तहत लिखता है, इसलिए यह तब तक शांत रहता है जब तक कि प्रोजेक्ट कम से कम एक बार बिल्ड न हो जाए। एक कुंजी साझा करने वाले दो डिक्लेरेशन मर्ज किए जाते हैं, जो एक वैध पैटर्न है — रिपोर्ट इसलिए मौजूद है क्योंकि दोनों पक्षों पर परिभाषित फ़ील्ड चुपचाप दो मानों में से केवल एक को रखता है।

विश्लेषक `@intlayer/lsp` से लोड होता है, जो ESM के रूप में वितरित होता है। इसलिए नियम को एक ऐसे Node संस्करण की आवश्यकता होती है जो ES मॉड्यूल को `require()` कर सके — Node 20.19+ या 22.12+। इससे पुराने किसी भी संस्करण पर यह लिंट रन को विफल करने के बजाय कुछ भी रिपोर्ट नहीं करता है।

## फ्रेमवर्क

प्रत्येक नियम सभी Intlayer एकीकरणों में काम करता है, जिसमें Vue, Svelte और Angular टेम्प्लेट्स शामिल हैं। आपको केवल ESLint को यह बताना होगा कि प्रत्येक फ़ाइल प्रकार को कौन सा पार्सर पढ़ता है।

| फ्रेमवर्क                 | फ़ाइलें           | पार्सर                            |
| ------------------------- | ----------------- | --------------------------------- |
| React, Preact, Solid, Lit | `.jsx` `.tsx`     | `typescript-eslint`               |
| Next.js                   | `.jsx` `.tsx`     | `typescript-eslint`               |
| Vue, Nuxt                 | `.vue`            | `vue-eslint-parser`               |
| Svelte, SvelteKit         | `.svelte`         | `svelte-eslint-parser`            |
| Angular                   | `.ts`             | `typescript-eslint`               |
| Angular टेम्प्लेट्स       | `.component.html` | `@angular-eslint/template-parser` |
| Astro                     | `.astro`          | `astro-eslint-parser`             |

```javascript fileName="eslint.config.mjs" codeFormat="esm"
import intlayer from "eslint-plugin-intlayer";
import tseslint from "typescript-eslint";
import vueParser from "vue-eslint-parser";
import svelteParser from "svelte-eslint-parser";
import angularTemplateParser from "@angular-eslint/template-parser";

export default [
  ...intlayer.configs.recommended,

  {
    files: ["**/*.{ts,tsx,jsx}"],
    languageOptions: { parser: tseslint.parser },
  },
  {
    files: ["**/*.vue"],
    languageOptions: {
      parser: vueParser,
      parserOptions: { parser: tseslint.parser },
    },
  },
  {
    files: ["**/*.svelte"],
    languageOptions: {
      parser: svelteParser,
      parserOptions: { parser: tseslint.parser },
    },
  },
  {
    files: ["**/*.component.html"],
    languageOptions: { parser: angularTemplateParser },
  },
];
```

केवल वही पार्सर स्थापित करें जिनकी आपके प्रोजेक्ट को आवश्यकता है।

> **ज्ञात सीमा।** Vue और Angular टेम्प्लेट्स में, `{{ content[key] }}` जैसा एक्सप्रेशन `no-dynamic-field-access` द्वारा जाँचा नहीं जाता है। स्क्रिप्ट ब्लॉक में लिखे गए डायनामिक रीड सामान्य रूप से पकड़े जाते हैं।
