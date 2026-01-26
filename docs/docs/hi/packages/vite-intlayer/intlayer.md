---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: intlayer Vite प्लगइन दस्तावेज़ीकरण | vite-intlayer
description: vite-intlayer पैकेज के लिए intlayer प्लगइन का उपयोग कैसे करें देखें
keywords:
  - intlayer
  - vite
  - प्लगइन
  - Intlayer
  - intlayer
  - अंतर्राष्ट्रीयकरण
  - दस्तावेज़ीकरण
slugs:
  - doc
  - packages
  - vite-intlayer
  - intlayer
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: प्रारम्भिक डॉक्यूमेंटेशन
---

# intlayer Vite प्लगइन दस्तावेज़ीकरण

`intlayer` Vite प्लगइन Intlayer कॉन्फ़िगरेशन को बिल्ड प्रक्रिया में एकीकृत करता है। यह डिक्शनरी एलियस को हैंडल करता है, डेवलपमेंट मोड में डिक्शनरी वॉचर शुरू करता है, और बिल्ड के लिए डिक्शनरी तैयार करता है।

## उपयोग

```ts
// vite.config.ts
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayer()],
});
```

## विवरण

यह प्लगइन निम्नलिखित कार्य करता है:

1. **डिक्शनरी तैयार करना**: यह बिल्ड या डेव (dev) प्रक्रिया की शुरुआत में डिक्शनरीज़ को optimized फाइलों में संकलित करता है।
2. **वॉच मोड**: डेवलपमेंट मोड में यह डिक्शनरी फाइलों में होने वाले परिवर्तनों पर नज़र रखता है और उन्हें स्वतः पुनः संकलित करता है।
3. **ऐलियास**: यह आपके एप्लिकेशन में डिक्शनरीज़ तक पहुँचने के लिए ऐलियास प्रदान करता है।
4. **ट्री-शेकिंग**: यह `intlayerPrune` प्लगइन के माध्यम से अप्रयुक्त अनुवादों की ट्री-शेकिंग का समर्थन करता है।
