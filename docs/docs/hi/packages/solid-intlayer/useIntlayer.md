---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: useIntlayer हुक दस्तावेज़ीकरण | solid-intlayer
description: solid-intlayer पैकेज के लिए useIntlayer हुक का उपयोग कैसे करें
keywords:
  - useIntlayer
  - dictionary
  - Intlayer
  - intlayer
  - अंतरराष्ट्रीयकरण
  - डॉक्यूमेंटेशन
  - Solid
  - Solid.js
slugs:
  - doc
  - packages
  - solid-intlayer
  - useIntlayer
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Unified documentation for all exports
---

# useIntlayer हुक दस्तावेज़ीकरण

`useIntlayer` हुक आपको एक `dictionary` से उसकी कुंजी (key) का उपयोग करके स्थानीयकृत सामग्री प्राप्त करने की अनुमति देता है। Solid में, यह हुक एक reactive **accessor** फ़ंक्शन लौटाता है जो जब भी locale बदलता है तब स्वतः अपडेट होता है।

## उपयोग

```tsx
import { useIntlayer } from "solid-intlayer";

const MyComponent = () => {
  const content = useIntlayer("my-dictionary-key");

  return (
    <div>
      <h1>{content().title}</h1>
      <p>{content().description}</p>
    </div>
  );
};
```

## विवरण

यह hook निम्नलिखित कार्य करता है:

1. **Locale Detection**: यह `IntlayerProvider` संदर्भ से वर्तमान locale का उपयोग करता है।
2. **Dictionary Injection**: यह स्वचालित रूप से प्रदान किए गए key के अनुरूप डिक्शनरी की सामग्री इंजेक्ट करता है, Intlayer कंपाइलर द्वारा जनरेट किए गए optimized declarations का उपयोग करते हुए।
3. **Reactivity**: यह एक Solid accessor (`Accessor<T>`) लौटाता है जो वैश्विक locale state बदलने पर स्वचालित रूप से पुनः-निरूपित (re-evaluate) होता है।
4. **अनुवाद प्रसंस्करण**: यह पता चले हुए `locale` के आधार पर सामग्री को निर्धारित करता है, और डिक्शनरी में पाए जाने वाले किसी भी `t()`, `enu()`, आदि परिभाषाओं को प्रोसेस करता है।

## पैरामिटर्स

- **key**: डिक्शनरी की यूनिक key (जैसा कि आपकी content declaration फ़ाइलों में परिभाषित है)।
- **locale** (optional): वर्तमान locale को ओवरराइड करने के लिए।

## रिटर्न

एक accessor फ़ंक्शन (`() => Content`) जो स्थानीयकृत सामग्री लौटाता है।
