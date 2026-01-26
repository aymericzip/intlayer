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
    changes: प्रारंभिक डॉक्यूमेंटेशन
---

# intlayerPrune Vite प्लगइन दस्तावेज़

`intlayerPrune` Vite प्लगइन का उपयोग आपकी एप्लिकेशन बंडल से उपयोग में न आने वाले डिक्शनरीज़ को ट्री-शेक और प्रून (हटाने) करने के लिए किया जाता है। यह केवल आवश्यक बहुभाषी सामग्री को ही शामिल करके अंतिम बंडल आकार को कम करने में मदद करता है।

## उपयोग

```ts
// vite.config.ts (Vite कॉन्फ़िगरेशन फ़ाइल)
import { defineConfig } from "vite";
import { intlayer, intlayerPrune } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayer(), intlayerPrune()],
});
```

## विवरण

यह plugin आपके स्रोत कोड का विश्लेषण करता है ताकि यह पहचान किया जा सके कि कौन सी dictionary keys वास्तव में उपयोग की जा रही हैं। इसके बाद यह bundled dictionary files से किसी भी अप्रयुक्त सामग्री को हटा देता है। यह उन बड़े प्रोजेक्ट्स के लिए विशेष रूप से उपयोगी है जिनमें कई dictionaries हों और केवल उनका एक subset ही विशिष्ट पेजों या components में इस्तेमाल हो रहा हो।
