---
createdAt: 2026-08-12
updatedAt: 2026-08-12
title: ESLint प्लगइन | Intlayer के लिए lint नियम
description: eslint-plugin-intlayer के साथ हार्डकोडेड स्ट्रिंग्स और उन डायनामिक कॉल्स को पकड़ें जिन्हें Intlayer कंपाइलर ऑप्टिमाइज़ नहीं कर सकता। ESLint और oxlint के साथ काम करता है — React, Vue, Svelte, Angular और Astro में।
keywords:
  - Intlayer
  - ESLint
  - oxlint
  - Lint
  - i18n
  - अंतर्राष्ट्रीयकरण
  - no-raw-text
  - हार्डकोडेड स्ट्रिंग्स
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

`eslint-plugin-intlayer` उन दो तरह की i18n गलतियों को पकड़ता है जिन्हें TypeScript नहीं देख सकता:

1. **हार्डकोडेड टेक्स्ट** जो कभी किसी dictionary में नहीं पहुँचा।
2. **डायनामिक कॉल्स** जो टाइप-चेक पास कर लेती हैं और चलती भी हैं, लेकिन जिन्हें Intlayer कंपाइलर ऑप्टिमाइज़ नहीं कर सकता।

अज्ञात dictionary key, अज्ञात field path और गायब locale पहले से ही कंपाइल एरर हैं, इसलिए यह प्लगइन उन्हें दोहराता नहीं है।

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

ESLint 9 या उससे नया संस्करण चाहिए (flat config)।

## उपयोग

यह प्लगइन ESLint और [oxlint](https://oxc.rs) दोनों में चलता है — वही नियम, वही विकल्प।

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

दो बातें ध्यान रखें: oxlint में JS प्लगइन का समर्थन अभी alpha चरण में है, और oxlint कस्टम parser का समर्थन नहीं करता — इसलिए `.vue`, `.svelte`, `.astro` फ़ाइलें और Angular टेम्पलेट वहाँ lint नहीं होते। अपनी JS/TS/JSX फ़ाइलों पर oxlint चलाएँ और बाकी के लिए ESLint रखें।

  </Tab>
</Tabs>

### कॉन्फ़िगरेशन

| कॉन्फ़िगरेशन    | `no-raw-text`                    | `static-dictionary-key` | `no-dynamic-field-access` | `enforce-adapter-import` |
| --------------- | -------------------------------- | ----------------------- | ------------------------- | ------------------------ |
| `recommended`   | warn                             | error                   | error                     | off                      |
| `strict`        | error (+ JSX के बाहर के literal) | error                   | error                     | error                    |
| `contract-only` | off                              | error                   | error                     | off                      |

`recommended` जानबूझकर `no-raw-text` को `warn` पर रखता है: इसे किसी मौजूदा codebase पर लगाने से सभी अनुवाद-रहित स्ट्रिंग्स एक साथ सामने आ जाती हैं, और इससे पहले ही दिन आपका build नहीं टूटना चाहिए।

`enforce-adapter-import` डिफ़ॉल्ट रूप से बंद है — ज़रूरत हो तो इसे स्पष्ट रूप से चालू करें।

## नियम

### `no-raw-text`

उपयोगकर्ता को दिखने वाले उस टेक्स्ट की रिपोर्ट करता है जो किसी dictionary में घोषित नहीं है। यह `intlayer extract` जैसी ही पहचान प्रणाली उपयोग करता है, इसलिए ब्रांड नाम, CSS क्लास और तकनीकी पहचानकर्ता नज़रअंदाज़ किए जाते हैं।

```jsx
// ✗ रिपोर्ट किया गया
<h1>Welcome to our documentation</h1>
<input placeholder="Enter your email address" />

// ✓ ठीक है
const { title } = useIntlayer("home");
<h1>{title}</h1>
```

कंटेंट डिक्लेरेशन फ़ाइलें (`*.content.ts`, …) छोड़ दी जाती हैं।

पूरी फ़ाइल को एक बार में ठीक करने के लिए `npx intlayer extract` चलाएँ और कंपाइलर को स्ट्रिंग्स को dictionary में ले जाने दें।

**विकल्प**

```javascript fileName="eslint.config.mjs" codeFormat="esm"
{
  "intlayer/no-raw-text": [
    "warn",
    {
      // वे एट्रिब्यूट जिनका मान उपयोगकर्ता को दिखने वाला टेक्स्ट है।
      // डिफ़ॉल्ट: title, placeholder, alt, aria-label, label
      attributes: ["title", "placeholder", "alt", "aria-label", "label"],

      // वे एलिमेंट जिनकी सामग्री कभी उपयोगकर्ता-टेक्स्ट नहीं होती।
      // डिफ़ॉल्ट: code, pre, script, style
      ignoreElements: ["code", "pre", "script", "style"],

      // उस टेक्स्ट के लिए रेगुलर एक्सप्रेशन जिसकी कभी रिपोर्ट न हो।
      ignorePatterns: ["^Powered by"],

      // markup के बाहर के string literal भी रिपोर्ट करें। डिफ़ॉल्ट: false
      includeStringLiterals: false,
    },
  ],
}
```

### `static-dictionary-key`

आवश्यक करता है कि dictionary key एक string literal हो।

कंपाइलर किसी dictionary को तभी पहले से लोड कर सकता है जब वह कॉल की जगह पर key को सीधे पढ़ सके। कम्प्यूटेड key होने पर वह चुपचाप ऑप्टिमाइज़ेशन छोड़ देता है और इसके बजाय हर dictionary को बंडल कर देता है।

```typescript
// ✗ रिपोर्ट किया गया
useIntlayer(dictionaryKey);
useIntlayer(`home-${suffix}`);
getTranslations({ namespace: page });

// ✗ वेरिएबल फिर भी literal नहीं है
const key = "home";
useIntlayer(key);

// ✓ ठीक है
useIntlayer("home");
getTranslations({ namespace: "home" });
```

यह `useIntlayer`, `getIntlayer` और हर compat अडैप्टर (`useTranslation`, `useTranslations`, `formatMessage`, `<FormattedMessage id>`, `<Trans i18nKey>`, …) पर लागू होता है।

### `no-dynamic-field-access`

आवश्यक करता है कि dictionary से पढ़ा जाने वाला field स्थिर रूप से ज्ञात हो।

कंपाइलर उन fields को हटा देता है जिनका उपयोग उसे दिखाई नहीं देता। कम्प्यूटेड एक्सेस उसे दिखाई नहीं देता, इसलिए रनटाइम पर पढ़ने पर `undefined` मिल सकता है।

```typescript
// ✗ रिपोर्ट किया गया
const content = useIntlayer("home");
content[fieldName];

const t = useTranslations("home");
t(messageKey);

// ✓ ठीक है
content.title;
content["title"];
content.items[0];
t("hero.title");
```

### `enforce-adapter-import`

मूल पैकेज के बजाय `@intlayer/*` compat अडैप्टर को प्राथमिकता देता है। मूल पैकेज केवल तभी Intlayer पर resolve होता है जब bundler alias कॉन्फ़िगर किया गया हो; अडैप्टर हमेशा होता है। `--fix` से स्वतः ठीक हो जाता है।

```typescript
// ✗ रिपोर्ट किया गया
import { useTranslation } from "react-i18next";
import { getTranslations } from "next-intl/server";

// ✓ ठीक है
import { useTranslation } from "@intlayer/react-i18next";
import { getTranslations } from "@intlayer/next-intl/server";
```

## फ़्रेमवर्क

सभी नियम Intlayer के सभी इंटीग्रेशन में काम करते हैं, जिसमें Vue, Svelte और Angular टेम्पलेट्स के भीतर भी शामिल है। आपको बस ESLint को यह बताना है कि कौन-सा parser किस फ़ाइल प्रकार को पढ़ता है।

| फ़्रेमवर्क                | फ़ाइलें           | Parser                            |
| ------------------------- | ----------------- | --------------------------------- |
| React, Preact, Solid, Lit | `.jsx` `.tsx`     | `typescript-eslint`               |
| Next.js                   | `.jsx` `.tsx`     | `typescript-eslint`               |
| Vue, Nuxt                 | `.vue`            | `vue-eslint-parser`               |
| Svelte, SvelteKit         | `.svelte`         | `svelte-eslint-parser`            |
| Angular                   | `.ts`             | `typescript-eslint`               |
| Angular टेम्पलेट          | `.component.html` | `@angular-eslint/template-parser` |
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

केवल वही parser इंस्टॉल करें जिनकी आपके प्रोजेक्ट को ज़रूरत है।

> **ज्ञात सीमा।** Vue और Angular टेम्पलेट्स में `{{ content[key] }}` जैसे एक्सप्रेशन की जाँच `no-dynamic-field-access` नहीं करता। script ब्लॉक में लिखे गए डायनामिक रीड सामान्य रूप से पकड़े जाते हैं।
