---
updatedAt: 2025-08-23
createdAt: 2025-08-23
title: useRewriteURL हुक प्रलेखन
description: Intlayer में स्थानीयकृत URL रीव्राइट्स को प्रबंधित करने के लिए React-विशिष्ट हुक।
keywords:
  - useRewriteURL
  - react-intlayer
  - react
  - अंतर्राष्ट्रीयकरण
  - i18n
slugs:
  - doc
  - packages
  - react-intlayer
  - useRewriteURL
---

# useRewriteURL हुक

`useRewriteURL` हुक क्लाइंट-साइड पर स्थानीयकृत URL रीव्राइट्स को प्रबंधित करने के लिए बनाया गया है। यह स्वचालित रूप से पता लगाता है कि क्या वर्तमान URL को उपयोगकर्ता की locale और `intlayer.config.ts` में परिभाषित रीव्राइट नियमों के आधार पर एक "pretty" स्थानीयकृत संस्करण में सुधारा जाना चाहिए।

मानक नेविगेशन के विपरीत, यह हुक एड्रेस बार में URL को अपडेट करने के लिए `window.history.replaceState` का उपयोग करता है, जिससे पूरा पेज रीलोड या राउटर नेविगेशन साइकल ट्रिगर नहीं होता।

## उपयोग

सिर्फ़ क्लाइंट-साइड कंपोनेंट में इस हुक को कॉल करें।

```tsx
import { useRewriteURL } from "react.intlayer";

const MyComponent = () => {
  // यदि किसी rewrite नियम का पता चलता है तो एड्रेस बार में स्वचालित रूप से /fr/tests को /fr/essais में सही करें
  useRewriteURL();

  return <div>मेरा Component</div>;
};
```

## यह कैसे काम करता है

1. **पता लगाना**: हुक वर्तमान `window.location.pathname` और उपयोगकर्ता की `locale` की निगरानी करता है।
2. **मिलान**: यह आंतरिक Intlayer इंजन का उपयोग करके जांचता है कि क्या वर्तमान pathname किसी canonical route से मेल खाता है जिसके लिए वर्तमान `locale` के लिए एक बेहतर localized alias मौजूद है।
3. **URL सुधार**: यदि एक बेहतर alias मिलता है (और यह वर्तमान पथ से अलग है), तो हुक ब्राउज़र URL को अपडेट करने के लिए `window.history.replaceState` को कॉल करता है, जबकि वही canonical सामग्री और state बरकरार रहती है।

## इसका उपयोग क्यों करें?

- **SEO**: सुनिश्चित करता है कि उपयोगकर्ता हमेशा किसी दिए गए भाषा के लिए एकल, अधिकारिक, सुंदर URL पर land करें।
- **Consistency**: ऐसी असंगतियों को रोकता है जहाँ उपयोगकर्ता मैन्युअली canonical पथ (जैसे `/fr/privacy-notice`) टाइप कर सकता है स्थानीयकृत संस्करण (`/fr/politique-de-confidentialite`) के बजाय।
- **Performance**: एड्रेस बार को अपडेट करता है बिना अनचाहे router side-effects या component re-mounts को ट्रिगर किए।
