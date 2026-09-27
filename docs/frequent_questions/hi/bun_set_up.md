---
createdAt: 2025-05-20
updatedAt: 2026-09-27
priority: 4
title: bun का उपयोग करते समय मुझे मॉड्यूल नहीं मिला त्रुटि मिलती है
description: 'Bun के साथ Intlayer चलाने पर आने वाली "Cannot find package" त्रुटि ठीक करें, जो Bun के require() के सीमित दायरे से होती है, सही कॉन्फ़िगरेशन के साथ।'
keywords:
  - bun
  - मॉड्यूल नहीं मिला
  - intlayer
  - कॉन्फ़िगरेशन
  - पैकेज प्रबंधक
slugs:
  - frequent-questions
  - bun-set-up
author: aymericzip
---

# bun का उपयोग करते समय मुझे मॉड्यूल नहीं मिला त्रुटि मिलती है

## समस्या विवरण

जब आप bun का उपयोग करते हैं, तो आपको इस प्रकार की त्रुटि मिल सकती है:

```bash
Cannot find package 'intlayer' from '/workspace/packages/@intlayer/config/dist/cjs/utils/ESMxCJSHelpers.cjs' undefined
```

## कारण

Intlayer आंतरिक रूप से `require` का उपयोग करता है। और bun `require` फ़ंक्शन को केवल `@intlayer/config` पैकेज के पैकेजों को हल करने के लिए सीमित करता है, पूरे प्रोजेक्ट के बजाय।

## समाधान

### कॉन्फ़िगरेशन में `require` फ़ंक्शन प्रदान करें

```ts
ts;
const config: IntlayerConfig = {
  build: {
    require, // कॉन्फ़िगरेशन में require फ़ंक्शन प्रदान करें
  },
};

export default config;
```

```ts fileName="next.config.ts" codeFormat="typescript"
import { withIntlayer } from "next-intlayer/server";

const configuration = withIntlayer({
  require, // require फ़ंक्शन के साथ Intlayer कॉन्फ़िगरेशन सेट करें
});

export default configuration;
```
