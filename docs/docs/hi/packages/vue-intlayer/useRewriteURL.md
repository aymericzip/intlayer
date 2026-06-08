---
updatedAt: 2025-08-23
createdAt: 2025-08-23
title: useRewriteURL Composable दस्तावेज़ीकरण
description: Intlayer में स्थानीयकृत URL पुनर्लेखन को प्रबंधित करने के लिए Vue-विशिष्ट composable।
keywords:
  - useRewriteURL
  - vue-intlayer
  - vue
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - vue-intlayer
  - useRewriteURL
---

# useRewriteURL Composable

Vue 3 के लिए `useRewriteURL` composable क्लाइंट-साइड पर स्थानीयकृत URL पुनर्लेखन को संभालने के लिए डिज़ाइन किया गया है। यह उपयोगकर्ता की वर्तमान locale और `intlayer.config.ts` में कॉन्फ़िगरेशन के आधार पर ब्राउज़र के URL को स्वचालित रूप से उसकी "pretty" स्थानीयकृत वर्ज़न में सही कर देता है।

यह `window.history.replaceState` का उपयोग करके काम करता है, जो अनचाही Vue Router नेविगेशन को ट्रिगर होने से रोकता है।

## उपयोग

अपने `setup()` फ़ंक्शन या `<script setup>` के भीतर इस composable को कॉल करें।

```vue
<script setup>
import { useRewriteURL } from "vue-intlayer";

// यदि कोई री-राइट नियम मौजूद है तो एड्रेस बार में /fr/tests को स्वचालित रूप से /fr/essais में सही करें
useRewriteURL();
</script>

<template>
  <router-view />
</template>
```

## यह कैसे काम करता है

1. **रिएक्टिव मॉनिटरिंग**: यह composable उपयोगकर्ता की `locale` पर एक `watch` सेट करता है।
2. **रीराइट मिलान**: जब भी `locale` बदलता है (या mount पर), यह जाँचता है कि वर्तमान `window.location.pathname` किसी canonical route से मेल खाता है जिसमें एक बेहतर दिखने वाला स्थानीयकृत alias है या नहीं।
3. **URL सुधार**: यदि कोई बेहतर alias मिलता है, तो composable पते की पट्टी को पेज रीलोड किए बिना या router state खोए बिना अपडेट करने के लिए `window.history.replaceState` को कॉल करता है।

## इसे क्यों इस्तेमाल करें?

- **SEO ऑप्टिमाइज़ेशन**: यह सुनिश्चित करता है कि सर्च इंजन आपकी URLs के आधिकारिक स्थानीयकृत संस्करण को इंडेक्स करें।
- **बेहतर UX**: मैन्युअली दर्ज किए गए URLs को आपके पसंदीदा नामकरण के अनुसार सुधारता है (उदाहरण के लिए, `/fr/a-propos` के बजाय `/fr/about`)।
- **कम ओवरहेड**: बिना component lifecycles या navigation guards को पुनः ट्रिगर किए, URL को शांतिपूर्वक अपडेट करता है।

---
