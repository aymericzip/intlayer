---
createdAt: 2026-06-25
updatedAt: 2026-06-25
title: "@intlayer/babel पैकेज दस्तावेज़"
description: बिल्ड के दौरान सामग्री निष्कर्षण, आयात अनुकूलन, अप्रयुक्त फ़ील्ड को हटाने और फ़ील्ड नामों को विकृत (mangle) करने के लिए Intlayer हेतु Babel प्लगइन्स।
keywords:
  - "@intlayer/babel"
  - babel
  - plugin
  - अंतर्राष्ट्रीयकरण
  - i18n
  - कंपाइलर
  - अनुकूलन
  - प्रून
  - मिनिफाई
slugs:
  - doc
  - packages
  - "@intlayer/babel"
  - export
history:
  - version: 9.0.0
    date: 2026-06-25
    changes: "सभी निर्यात दस्तावेज़ीकरण का एकीकरण"
author: aymericzip
---

# @intlayer/babel पैकेज

`@intlayer/babel` पैकेज Intlayer के लिए विशेष Babel प्लगइन्स का एक सेट प्रदान करता है। ये प्लगइन्स पूरे बिल्ड चक्र को कवर करते हैं: सामग्री घोषणाओं को निकालना, `useIntlayer` / `getIntlayer` कॉल को अनुकूलित शब्दकोश आयातों में फिर से लिखना, अप्रयुक्त फ़ील्ड को हटाना, और फ़ील्ड नामों को छोटा करना।

## स्थापना

```bash
npm install @intlayer/babel
```

## निर्यात

आयात (Import):

```ts
import { ... } from "@intlayer/babel";
```

---

### प्लगइन्स

| फ़ंक्शन / वर्ग                 | विवरण                                                                                                                                                                                                             |
| ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `intlayerExtractBabelPlugin`   | Babel प्लगइन जो स्रोत फ़ाइलों से अनुवाद योग्य सामग्री निकालता है और `useIntlayer` / `getIntlayer` हुक को स्वचालित रूप से इंजेक्ट करता है। Next.js और Babel-आधारित बिल्ड टूल के साथ उपयोग के लिए डिज़ाइन किया गया। |
| `intlayerOptimizeBabelPlugin`  | `useIntlayer` और `getIntlayer` कॉल को रूपांतरित करता है और उनके आयात को अनुकूलित JSON शब्दकोश आयात (स्थिर, गतिशील, या fetch के माध्यम से) में फिर से लिखता है।                                                    |
| `intlayerPurgeBabelPlugin`     | Babel प्लгин जो स्रोत फ़ाइलों का विश्लेषण करता है और अप्रयुक्त फ़ील्ड (`build.purge`) को हटाने या उन्हें छोटे उपनामों (`build.minify`) में बदलने के लिए संकलित शब्दкош JSON फ़ाइलों को फिर से लिखता है।           |
| `intlayerMinifyBabelPlugin`    | Babel प्लगइन जो स्रोत फ़ाइलों को छोटा करने के चरण के दौरान सौंपे गए छोटे फ़ील्ड उपनामों (जैसे `content.title` ← `content.a`) का उपयोग करने के लिए फिर से लिखता है। `intlayerPurgeBabelPlugin` पर निर्भर करता है।  |
| `makeFieldRenameBabelPlugin`   | फ़ैक्टरी फ़ंक्शन जो `PruneContext` में भरे गए `dictionaryKeyToFieldRenameMap` के अनुसार स्रोत फ़ाइलों में शब्दकोश सामग्री फ़ील्ड एक्सेस का नाम बदलने के लिए एक Babel प्लगइन उत्पन्न करता है।                      |
| `makeUsageAnalyzerBabelPlugin` | फ़ैक्टरी फ़ंक्शन जो स्रोत कोड में `useIntlayer` / `getIntlayer` के उपयोग का विश्लेषण करने और साझा `PruneContext` में फ़ील्ड उपयोग डेटा एकत्र करने के लिए एक Babel प्लगइन उत्पन्न करता है।                         |
| `getSharedPruneContext`        | सहायक फ़ंक्शन जो निर्दिष्ट आधार निर्देशिका के लिए साझा `PruneContext` ऑब्जेक्ट लौटाता है, या यदि यह अभी तक आरंभ नहीं हुआ है तो `null` लौटाता है।                                                                  |

---

### प्लगइन कॉन्फ़िगरेशन उपयोगिताएँ

| फ़ंक्शन                    | विवरण                                                                                                                                                   |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `getExtractPluginOptions`  | Intlayer कॉन्फ़िगरेशन लोड करता है और `intlayerExtractBabelPlugin` के साथ उपयोग के लिए तैयार `ExtractPluginOptions` लौटाता है।                           |
| `getOptimizePluginOptions` | Intlayer कॉन्फ़िगरेशन और संकलित शब्दकोशों को लोड करता है, और `intlayerOptimizeBabelPlugin` के साथ उपयोग के लिए तैयार `OptimizePluginOptions` लौटाता है। |
| `getPurgePluginOptions`    | Intlayer कॉन्फ़िगरेशन लोड करता है और `intlayerPurgeBabelPlugin` के साथ उपयोग के लिए तैयार `PurgePluginOptions` लौटाता है।                               |
| `getMinifyPluginOptions`   | Intlayer कॉन्फ़िगरेशन लोड करता है और `intlayerMinifyBabelPlugin` के साथ उपयोग के लिए तैयार `MinifyPluginOptions` लौटाता है।                             |

---

### प्रकार

| प्रकार                  | विवरण                                                                                                            |
| ----------------------- | ---------------------------------------------------------------------------------------------------------------- |
| `CompilerMode`          | कंपाइलर मोड: `'dev'` HMR समर्थन के साथ विकास के लिए, या `'build'` उत्पादन बिल्ड के लिए।                          |
| `ExtractPluginOptions`  | `intlayerExtractBabelPlugin` के लिए विकल्प: फ़ाइल सूची, कॉन्फ़िगरेशन, `onExtract` कॉलबैक आदि।                    |
| `ExtractResult`         | निष्कर्षण परिणाम: शब्दकोश कुंजी, फ़ाइल पथ, सामग्री और लोकेल।                                                     |
| `OptimizePluginOptions` | `intlayerOptimizeBabelPlugin` के लिए विकल्प: शब्दकोश पथ, आयात मोड, प्रति शब्दकोश मोड मानचित्र आदि।               |
| `PurgePluginOptions`    | `intlayerPurgeBabelPlugin` के लिए विकल्प: आधार निर्देशिका, प्रून/मिनिफाई/ऑप्टिमाइज़ फ़्लैग, घटक फ़ाइल सूची।      |
| `MinifyPluginOptions`   | `intlayerMinifyBabelPlugin` के लिए विकल्प: आधार निर्देशिका, मिनिफाई/ऑप्टिमाइज़/editorEnabled फ़्लैग।             |
| `PruneContext`          | विश्लेषण और प्रून प्लगइन्स के बीच साझा स्थिति: फ़ील्ड उपयोग मानचित्र, नाम बदलें मानचित्र आदि।                    |
| `DictionaryFieldUsage`  | एकल शब्दकोश के लिए फ़ील्ड उपयोग परिणाम: `Set<string>` या `'all'` जब स्थिर विश्लेषण अनिर्णायक होता है।            |
| `NestedRenameEntry`     | नाम बदलने वाले पेड़ में नोड: `shortName` और बच्चों का मानचित्र।                                                  |
| `NestedRenameMap`       | नाम बदलने वाले पेड़ में एक स्तर: `Map<string, NestedRenameEntry>`।                                               |
| `CompatCallerConfig`    | `compat-adapter` पैकेजों के लिए एक संगत उपयोग विश्लेषक कॉन्फ़िगरेशन (कॉल करने वाले का नाम और प्रसंस्करण विकल्प)। |
| `ScriptBlock`           | एक SFC फ़ाइल (Vue या Svelte) से निकाली गई स्क्रिप्ट ब्लॉक: सामग्री, प्रारंभ ऑफ़सेट और अंत ऑफ़सेट।                |

---

### उपयोगिता फ़ंक्शन

| फ़ंक्शन                           | विवरण                                                                                                                                                     |
| --------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `generateShortFieldName`          | एक पूर्णांक (शून्य से शुरू) को एक छोटे वर्णानुक्रमिक पहचानकर्ता में परिवर्तित करता है: `0` → `'a'`, `25` → `'z'`, `26` → `'aa'`, आदि।                     |
| `buildNestedRenameMapFromContent` | Intlayer नोड संरचनाओं (translation, enumeration आदि) का सम्मान करते हुए संकलित शब्दकोश के सामग्री मान से पुनरावर्ती रूप से एक `NestedRenameMap` बनाता है। |
| `createPruneContext`              | डिफ़ॉल्ट मानों के साथ आरंभ की गई एक नई खाली `PruneContext` ऑब्जेक्ट बनाता है।                                                                             |
| `extractScriptBlocks`             | बाद के Babel विश्लेषण के लिए SFC फ़ाइलों (Vue / Svelte) से `<script>` ब्लॉक निकालता है।                                                                   |
| `BABEL_PARSER_OPTIONS`            | स्थिरांक जो समर्थित फ्रेमवर्क (React/Vue/Svelte/Angular/...) को कवर करने वाले Babel पार्सर विकल्पों का प्रतिनिधित्व करता है।                              |
| `INTLAYER_CALLER_NAMES`           | मूल Intlayer कॉल करने वाले नामों की स्थिर सूची: `['useIntlayer', 'getIntlayer']`।                                                                         |

---

## उपयोग का उदाहरण

```js
// babel.config.js
const {
  intlayerExtractBabelPlugin,
  intlayerPurgeBabelPlugin,
  intlayerMinifyBabelPlugin,
  intlayerOptimizeBabelPlugin,
  getExtractPluginOptions,
  getPurgePluginOptions,
  getMinifyPluginOptions,
  getOptimizePluginOptions,
} = require("@intlayer/babel");

module.exports = {
  presets: ["next/babel"],
  plugins: [
    [intlayerExtractBabelPlugin, getExtractPluginOptions()],
    [intlayerPurgeBabelPlugin, getPurgePluginOptions()],
    [intlayerMinifyBabelPlugin, getMinifyPluginOptions()],
    [intlayerOptimizeBabelPlugin, getOptimizePluginOptions()],
  ],
};
```

> **ध्यान दें:** `intlayerPurgeBabelPlugin` को `intlayerMinifyBabelPlugin` से **पहले** घोषित किया जाना चाहिए, क्योंकि बाद वाला पहले वाले द्वारा निर्मित नाम बदलने के मानचित्र को पढ़ता है। इसके अलावा, दोनों से पहले `intlayerOptimizeBabelPlugin` होना चाहिए ताकि यह `useIntlayer` कॉल के फिर से लिखे जाने से पहले शब्दकोश कुंजियों को देख सके।
