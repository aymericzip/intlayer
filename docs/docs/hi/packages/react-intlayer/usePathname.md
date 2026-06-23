---
createdAt: 2026-06-22
updatedAt: 2026-06-22
title: usePathname Hook दस्तावेज़ीकरण | react-intlayer
description: जानें कि react-intlayer पैकेज से usePathname hook का उपयोग करके वर्तमान URL पथनाम को बिना स्थानीयकरण खंड के कैसे प्राप्त करें।
keywords:
  - usePathname
  - pathname
  - react
  - intlayer
  - routing
  - अंतर्राष्ट्रीयकरण
slugs:
  - doc
  - packages
  - react-intlayer
  - usePathname
history:
  - version: 10.0.0
    date: 2026-06-23
    changes: "usePathname उपयोगिता जोड़ें"
  - version: 8.2.0
    date: 2026-06-22
    changes: "इतिहास प्रारंभ करें"
author: aymericzip
---

# React इंटीग्रेशन: `usePathname` Hook दस्तावेज़ीकरण

`react-intlayer` से `usePathname` हुक वर्तमान ब्राउज़र पथनाम लौटाता है जिसमें से स्थानीयकरण (locale) खंड हटा दिया गया है। यह देशी `window.location.pathname` पर निर्भर करता है और `popstate` के माध्यम से ब्राउज़र नेविगेशन घटनाओं पर प्रतिक्रिया करता है।

## `usePathname` आयात करना

```typescript
import { usePathname } from "react-intlayer";
```

## अवलोकन

ढांचा-विशिष्ट रूटिंग हुक (जैसे `next-intlayer` या `react-router` में) के विपरीत, यह हुक प्लेन React अनुप्रयोगों के लिए एक हल्का, ढांचा-अज्ञेय समाधान है। यह वर्तमान URL निकालता है और किसी भी मिलान वाले स्थानीयकरण उपसर्ग को हटा देता है (उदाहरण के लिए, `/hi/about` `/about` बन जाता है)।

## उपयोग

```tsx fileName="src/components/Navigation.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { usePathname } from "react-intlayer";

const Navigation: FC = () => {
  const pathname = usePathname();

  return (
    <nav>
      <a
        href="/home"
        style={{ fontWeight: pathname === "/home" ? "bold" : "normal" }}
      >
        होम
      </a>
      <a
        href="/about"
        style={{ fontWeight: pathname === "/about" ? "bold" : "normal" }}
      >
        हमारे बारे में
      </a>
    </nav>
  );
};

export default Navigation;
```

## रिटर्न मान

| प्रकार   | विवरण                                                                                                    |
| -------- | -------------------------------------------------------------------------------------------------------- |
| `string` | ब्राउज़र का वर्तमान पथनाम जिसमें स्थानीयकरण उपसर्ग हटा दिया गया है (उदा: `/hi/dashboard` → `/dashboard`) |

## व्यवहार

- **स्थानीयकरण हटाना**: एप्लिकेशन के Intlayer कॉन्फ़िगरेशन के आधार पर पथनाम से स्थानीयकरण का स्वचालित रूप से पता लगाने और हटाने के लिए हुड के तहत `getPathWithoutLocale` उपयोगिता का उपयोग करता है।
- **प्रतिक्रियाशीलता**: `popstate` घटना को सुनता है। जब उपयोगकर्ता ब्राउज़र के बैक/फ़ॉरवर्ड बटन का उपयोग करके नेविगेट करता है या जब `pushState`/`replaceState` को कॉल किया जाता है, तो हुक लौटाए गए पथनाम को अपडेट करता है।
- **SSR फॉलबैक**: सर्वर पर (जहां `window` अपरिभाषित है), यह डिफ़ॉल्ट रूप से `/` लौटाता है क्योंकि शुद्ध React संदर्भ में डिफ़ॉल्ट रूप से अनुरोध URL तक इसकी कोई पहुंच नहीं है।

## संबंधित दस्तावेज़

- [`useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/react-intlayer/useLocale.md)
- [`getPathWithoutLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/intlayer/getPathWithoutLocale.md)
