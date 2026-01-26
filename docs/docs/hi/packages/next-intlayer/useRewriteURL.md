---
updatedAt: 2025-08-23
createdAt: 2025-08-23
title: useRewriteURL हुक दस्तावेज़
description: Intlayer में स्थानीयकृत URL पुनर्लेखन को प्रबंधित करने के लिए Next.js-विशिष्ट हुक।
keywords:
  - useRewriteURL
  - next-intlayer
  - nextjs
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - next-intlayer
  - useRewriteURL
---

# useRewriteURL हुक

Next.js के लिए `useRewriteURL` हुक एक क्लाइंट-साइड हुक है जो स्वचालित रूप से स्थानीयकृत URL पुनर्लेखनों का प्रबंधन करता है। यह सुनिश्चित करता है कि ब्राउज़र का URL हमेशा आपके `intlayer.config.ts` में परिभाषित "pretty" स्थानीयकृत पथ को दर्शाए, भले ही उपयोगकर्ता मैन्युअली किसी locale प्रीफिक्स के साथ canonical path टाइप करे।

यह हुक चुपचाप `window.history.replaceState` का उपयोग करके काम करता है, और अनावश्यक Next.js router नेविगेशन या पेज रिफ्रेश से बचता है।

## उपयोग

बस अपने layout का हिस्सा होने वाले एक Client Component में इस हुक को कॉल करें।

```tsx
"use client";

import { useRewriteURL } from "next-intlayer";

const MyClientComponent = () => {
  // पता बार में स्वचालित रूप से /fr/privacy-notice को /fr/politique-de-confidentialite में बदल देता है
  useRewriteURL();

  return null;
};
```

## यह कैसे काम करता है

1. **पथ निगरानी**: हुक उपयोगकर्ता के `locale` में होने वाले परिवर्तनों को सुनता है।
2. **रीराइट पहचान**: यह वर्तमान `window.location.pathname` की तुलना आपके कॉन्फ़िगरेशन में मौजूद रीराइट नियमों से करता है।
3. **URL सुधार**: यदि वर्तमान पथ के लिए कोई बेहतर (pretty) लोकलाइज़्ड उपनाम मिला होता है, तो हुक पता बार को अपडेट करने के लिए `window.history.replaceState` को ट्रिगर करता है जबकि उपयोगकर्ता उसी आंतरिक पृष्ठ पर बना रहता है।

## Next.js में इसका उपयोग क्यों करें?

जब कि `intlayerMiddleware` सर्वर-साइड रीराइट्स और प्रारम्भिक रीडायरेक्ट्स को हैंडल करता है, `useRewriteURL` हुक यह सुनिश्चित करता है कि क्लाइंट-साइड ट्रांज़िशन्स के बाद भी ब्राउज़र URL आपके पसंदीदा SEO स्ट्रक्चर के अनुरूप बना रहे।

- **साफ़ URL**: ऐसे लोकलाइज़्ड सेगमेंट्स के उपयोग को लागू करता है, जैसे `/fr/essais` न कि `/fr/tests`।
- **परफॉर्मेंस**: पूरे राउटर साइकिल को ट्रिगर किए बिना या डेटा को फिर से फेच किए बिना एड्रेस बार को अपडेट करता है।
- **SEO अनुरूपता**: सुनिश्चित करके डुप्लिकेट कंटेंट समस्याओं को रोकता है कि केवल एक URL वर्शन ही उपयोगकर्ता और सर्च इंजन बॉट्स के लिए दिखे।
