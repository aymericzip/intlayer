---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: IntlayerProvider कंपोनेंट दस्तावेज़ | react-intlayer
description: react-intlayer पैकेज के लिए IntlayerProvider कंपोनेंट का उपयोग कैसे करें देखें
keywords:
  - IntlayerProvider
  - react
  - Intlayer
  - intlayer
  - अंतर्राष्ट्रीयकरण
  - डॉक्यूमेंटेशन
slugs:
  - doc
  - packages
  - react-intlayer
  - IntlayerProvider
history:
  - version: 7.5.14
    date: 2026-01-21
    changes: प्रारंभिक दस्तावेज़
---

# IntlayerProvider कंपोनेंट दस्तावेज़

`IntlayerProvider` कंपोनेंट React अनुप्रयोगों में Intlayer के लिए मुख्य प्रदाता है। यह अपने सभी children को Intlayer context प्रदान करता है।

## उपयोग

```tsx
import { IntlayerProvider } from "react-intlayer";

const App = ({ children }) => <IntlayerProvider>{children}</IntlayerProvider>;
```

## प्रॉप्स

| प्रॉप             | प्रकार                            | विवरण                                                        |
| ----------------- | --------------------------------- | ------------------------------------------------------------ |
| `locale`          | `LocalesValues`                   | प्रारम्भिक locale जिसे उपयोग किया जाएगा।                     |
| `defaultLocale`   | `LocalesValues`                   | फॉलबैक के रूप में उपयोग करने के लिए डिफ़ॉल्ट locale।         |
| `setLocale`       | `(locale: LocalesValues) => void` | Locale सेट करने के लिए एक कस्टम फ़ंक्शन।                     |
| `disableEditor`   | `boolean`                         | क्या एडिटर को अक्षम किया जाना चाहिए।                         |
| `isCookieEnabled` | `boolean`                         | Locale संग्रहीत करने के लिए कुकीज़ को सक्षम करना है या नहीं। |
