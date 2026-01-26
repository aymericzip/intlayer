---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: useLocale हुक दस्तावेज़ | solid-intlayer
description: देखें कि solid-intlayer पैकेज में useLocale हुक का उपयोग कैसे करें
keywords:
  - useLocale
  - locale
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
  - useLocale
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: सभी एक्सपोर्ट्स के लिए एकीकृत दस्तावेज़ीकरण
---

# useLocale हुक दस्तावेज़

`useLocale` हुक आपको आपके Solid एप्लिकेशन में वर्तमान locale को मैनेज करने की अनुमति देता है। यह वर्तमान locale (एक accessor के रूप में), default locale, उपलब्ध locales और locale को अपडेट करने के लिए एक फ़ंक्शन तक पहुँच प्रदान करता है।

## उपयोग

```tsx
import { useLocale } from "solid-intlayer";

const LocaleSwitcher = () => {
  const { locale, setLocale, availableLocales } = useLocale();

  return (
    <select value={locale()} onChange={(e) => setLocale(e.currentTarget.value)}>
      {availableLocales.map((loc) => (
        <option value={loc} selected={loc === locale()}>
          {loc}
        </option>
      ))}
    </select>
  );
};
```

## विवरण

यह हुक निम्नलिखित गुणों वाला एक ऑब्जेक्ट लौटाता है:

1. **locale**: एक Solid accessor (`() => string`) जो वर्तमान locale लौटाता है।
2. **defaultLocale**: आपके `intlayer.config.ts` में परिभाषित डिफ़ॉल्ट locale।
3. **availableLocales**: उन सभी locales की एक array जो आपके एप्लिकेशन द्वारा समर्थित हैं।
4. **setLocale**: एप्लिकेशन का locale अपडेट करने के लिए एक फ़ंक्शन। यदि सक्षम है तो यह persistence (cookies/local storage) भी संभालता है।

## पैरामीटर

- **props** (वैकल्पिक):
  - **onLocaleChange**: एक callback फ़ंक्शन जो जब भी locale बदलता है तब कॉल किया जाता है।
  - **isCookieEnabled**: क्या locale को cookie में सहेजा जाना चाहिए।
