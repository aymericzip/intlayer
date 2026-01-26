---
updatedAt: 2025-08-23
createdAt: 2025-08-23
title: useRewriteURL हुक दस्तावेज़
description: Intlayer में स्थानीयकृत URL रीराइट्स को प्रबंधित करने के लिए Solid-विशिष्ट हुक।
keywords:
  - useRewriteURL
  - solid-intlayer
  - solidjs
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - solid-intlayer
  - useRewriteURL
---

# useRewriteURL हुक

`useRewriteURL` हुक SolidJS के लिए क्लाइंट-साइड पर स्थानीयकृत URL रीराइट्स को प्रबंधित करने के लिए डिज़ाइन किया गया है। यह वर्तमान locale और `intlayer.config.ts` में कॉन्फ़िगरेशन के आधार पर ब्राउज़र के URL को उसके "pretty" स्थानीयकृत संस्करण में स्वतः सुधार देता है।

`window.history.replaceState` का उपयोग करके यह अनावश्यक Solid Router नेविगेशनों से बचता है।

## उपयोग

अपने एप्लिकेशन के किसी component (घटक) के भीतर इस हुक को कॉल करें।

```tsx
import { useRewriteURL } from "solid-intlayer";

const Layout = (props) => {
  // यदि कोई पुनर्लेखन नियम मौजूद है तो पता बार में /fr/tests को स्वचालित रूप से /fr/essais से ठीक करें
  useRewriteURL();

  return <>{props.children}</>;
};
```

## यह कैसे काम करता है

1. **पहचान**: यह हुक प्रतिक्रियाशील `locale()` में परिवर्तनों की निगरानी के लिए `createEffect` का उपयोग करता है।
2. **मेल खोजना**: यह पहचानता है कि क्या वर्तमान `window.location.pathname` किसी canonical route से मेल खाता है जिसके लिए वर्तमान भाषा का prettier localized alias मौजूद है।
3. **URL सुधार**: यदि कोई prettier alias मिलता है, तो हुक `window.history.replaceState` को कॉल करता है ताकि पता बार को अपडेट किया जा सके बिना आंतरिक नेविगेशन स्टेट को प्रभावित किए या कंपोनेंट के पुनः-रेंडर का कारण बने।

## इसे क्यों इस्तेमाल करें?

- **प्रमाणिक URLs**: आपकी सामग्री के प्रत्येक स्थानीयकृत संस्करण के लिए एकल URL लागू करता है, जो SEO के लिए महत्वपूर्ण है।
- **डेवलपर सुविधा**: यह आपको अपनी आंतरिक रूट परिभाषाओं को canonical बनाए रखने की अनुमति देता है, जबकि बाहरी दुनिया के लिए उपयोगकर्ता-अनुकूल, स्थानीयकृत पथ प्रदर्शित करता है।
- **संगति**: जब उपयोगकर्ता मैन्युअल रूप से ऐसा पथ टाइप करते हैं जो आपकी प्राथमिक स्थानीयकरण नियमों का पालन नहीं करता, तो यह URL को सही करता है।

---
