---
createdAt: 2025-02-07
updatedAt: 2025-06-29
title: @intlayer/chokidar - Intlayer i18n के लिए फ़ाइल वॉचिंग
description: Intlayer के लिए फ़ाइल वॉचिंग क्षमताएँ प्रदान करने वाला NPM पैकेज, जो अंतरराष्ट्रीयकरण सामग्री के लिए स्वचालित अपडेट और हॉट रीलोडिंग सक्षम करता है।
keywords:
  - intlayer
  - chokidar
  - फ़ाइल वॉचिंग
  - हॉट रीलोड
  - i18n
  - JavaScript
  - NPM
  - विकास
slugs:
  - doc
  - package
  - @intlayer_chokidar
---

# @intlayer/chokidar: Intlayer घोषणा फ़ाइलों को शब्दकोशों में स्कैन और बनाने के लिए NPM पैकेज

**Intlayer** जावास्क्रिप्ट डेवलपर्स के लिए विशेष रूप से डिज़ाइन किए गए पैकेजों का एक सूट है। यह React, React, और Express.js जैसे फ्रेमवर्क के साथ संगत है।

**`@intlayer/chokidar`** पैकेज का उपयोग [chokidar](https://github.com/paulmillr/chokidar) का उपयोग करके और [Intlayer कॉन्फ़िगरेशन](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/configuration.md) के अनुसार Intlayer घोषणा फ़ाइलों को शब्दकोशों में स्कैन और बनाने के लिए किया जाता है।

## उपयोग

```ts
import { watch, prepareIntlayer } from "@intlayer/chokidar";

await prepareIntlayer(); // Intlayer शब्दकोश बनाएँ

watch({ persistent: true }); // कॉन्फ़िगरेशन फ़ाइलों में परिवर्तनों को देखें
```

## स्थापना

अपनी पसंदीदा पैकेज मैनेजर का उपयोग करके आवश्यक पैकेज इंस्टॉल करें:

```bash packageManager="npm"
npm install @intlayer/chokidar
```

```bash packageManager="pnpm"
pnpm add @intlayer/chokidar
```

```bash packageManager="yarn"
yarn add @intlayer/chokidar
```

## दस्तावेज़ इतिहास

- 5.5.10 - 2025-06-29: प्रारंभिक इतिहास
