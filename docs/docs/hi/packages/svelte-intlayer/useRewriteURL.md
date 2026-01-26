---
updatedAt: 2025-08-23
createdAt: 2025-08-23
title: useRewriteURL हुक दस्तावेज़ीकरण
description: Intlayer में स्थानीयकृत URL रीराइट्स को प्रबंधित करने के लिए Svelte-विशिष्ट हुक।
keywords:
  - useRewriteURL
  - svelte-intlayer
  - svelte
  - sveltekit
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - svelte-intlayer
  - useRewriteURL
---

# useRewriteURL हुक

Svelte के लिए `useRewriteURL` हुक क्लाइंट साइड पर स्थानीयकृत URL रीराइट्स को प्रबंधित करने के लिए बनाया गया है। यह वर्तमान locale और `intlayer.config.ts` में कॉन्फ़िगरेशन के आधार पर ब्राउज़र के URL को इसके "सुंदर" स्थानीयकृत रूप पर स्वचालित रूप से सही कर देगा।

यह `window.history.replaceState` का उपयोग करके URL को चुपचाप अपडेट करता है, जिससे पूर्ण SvelteKit नेविगेशन्स से बचा जाता है।

## उपयोग

Svelte कंपोनेंट के भीतर हुक को कॉल करें।

```svelte
<script>
  import { useRewriteURL } from 'svelte-intlayer';

  // यदि कोई rewrite नियम मौजूद है तो पता पट्टी में स्वचालित रूप से /fr/tests को /fr/essais में सही करें
  useRewriteURL();
</script>

<slot />
```

## यह कैसे काम करता है

1. **रिएक्टिव अपडेट्स**: हुक Intlayer `locale` स्टोर को सब्सक्राइब करता है।
2. **पता लगाना**: जब भी locale बदलता है (या माउंट पर), यह हिसाब लगाता है कि क्या वर्तमान `window.location.pathname` को आपके rewrite नियमों में कोई prettier स्थानीयकृत alias परिभाषित किया गया है।
3. **URL सुधार**: यदि कोई prettier पाथ मिलता है, तो हुक पता पट्टी को पूर्ण पृष्ठ रीलोड या SvelteKit नेविगेशन लॉजिक को ट्रिगर किए बिना अपडेट करने के लिए `window.history.replaceState` को कॉल करता है।

## इसे क्यों उपयोग करें?

- **SEO सर्वोत्तम प्रथाएँ**: सुनिश्चित करता है कि सर्च इंजन केवल आपके URL के सुंदर, स्थानीयकृत संस्करण को इंडेक्स करें।
- **Improved UX**: मैन्युअली दर्ज किए गए URLs को आपके पसंदीदा नामकरण संरचना के अनुरूप सुधारता है।
- **Silent Updates**: address bar को component tree या navigation history को प्रभावित किए बिना संशोधित करता है।
