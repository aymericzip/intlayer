---
createdAt: 2026-06-22
updatedAt: 2026-06-22
title: comparePaths फ़ंक्शन दस्तावेज़ | intlayer
description: जानें कि intlayer पैकेज के लिए comparePaths फ़ंक्शन का उपयोग कैसे करें
keywords:
  - comparePaths
  - normalizePath
  - सक्रिय लिंक (active link)
  - नेविगेशन
  - Intlayer
  - intlayer
  - अंतर्राष्ट्रीयकरण (Internationalization)
  - दस्तावेज़
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - packages
  - intlayer
  - comparePaths
history:
  - version: 9.0.0
    date: 2026-06-22
    changes: "प्रारंभिक दस्तावेज़"
author: aymericzip
---

# दस्तावेज़: `intlayer` में `comparePaths` फ़ंक्शन

## विवरण

`comparePaths` फ़ंक्शन लोकेल (locale) सेगमेंट, प्रोटोकॉल/होस्ट, क्वेरी स्ट्रिंग, हैश और ट्रेलिंग स्लैश (trailing slashes) को अनदेखा करते हुए दो URL या पाथनेम की समानता के लिए तुलना करता है। यह निर्धारित करने का अनुशंसित तरीका है कि कोई नेविगेशन लिंक वर्तमान पृष्ठ को इंगित करता है या नहीं — उदाहरण के लिए सक्रिय लिंक को हाइलाइट करने के लिए — बिना अपना स्वयं का (त्रुटि-प्रवण) सामान्यीकरण लॉजिक (normalization logic) लिखे।

आंतरिक रूप से यह लोकेल सेगमेंट को हटाने के लिए [`getPathWithoutLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/intlayer/getPathWithoutLocale.md) का पुन: उपयोग करता है, इसलिए यह आपके कॉन्फ़िगर किए गए रूटिंग मोड और लोकेल्स का सम्मान करता है।

पैकेज अंतर्निहित [`normalizePath`](#normalizepath) हेल्पर को भी निर्यात (export) करता है, जो तुलना के लिए उपयोग किए जाने वाले कैनोनिकल, लोकेल-स्वतंत्र पाथनेम को लौटाता है।

**मुख्य विशेषताएँ:**

- लोकेल-स्वतंत्र तुलना (`/hi/about`, `/about` से मेल खाता है)
- एब्सोल्यूट URL और रिलेटिव पाथ दोनों के साथ काम करता है
- क्वेरी स्ट्रिंग, हैश और ट्रेलिंग स्लैश को अनदेखा करता है
- गायब लीडिंग स्लैश और खाली मानों को सहन करता है (`/` में सामान्यीकृत)
- हल्का (Lightweight) — `getPathWithoutLocale` के ऊपर बनाया गया

---

## फ़ंक्शन सिग्नेचर

```typescript
comparePaths(
  pathname: string,  // आवश्यक
  href: string,      // आवश्यक
  locales?: Locales[] // वैकल्पिक
): boolean

normalizePath(
  inputUrl: string,   // आवश्यक
  locales?: Locales[] // वैकल्पिक
): string
```

---

## पैरामीटर्स

- `pathname: string`
  - **विवरण**: तुलना करने के लिए पहली URL स्ट्रिंग या पाथनेम (आमतौर पर वर्तमान पाथनेम)।
  - **प्रकार**: `string`
  - **आवश्यक**: हाँ

- `href: string`
  - **विवरण**: तुलना करने के लिए दूसरी URL स्ट्रिंग या पाथनेम (आमतौर पर नेविगेशन लिंक का `href`)।
  - **प्रकार**: `string`
  - **आवश्यक**: हाँ

- `locales: Locales[]`
  - **विवरण**: समर्थित लोकेल्स का वैकल्पिक एरे। डिफ़ॉल्ट रूप से प्रोजेक्ट में कॉन्फ़िगर किए गए लोकेल्स लेता है।
  - **प्रकार**: `Locales[]`
  - **आवश्यक**: नहीं (वैकल्पिक)

### रिटर्न (Returns)

- **प्रकार**: `boolean`
- **विवरण**: `true` जब दोनों इनपुट एक ही लोकेल-स्वतंत्र पाथ पर रिज़ॉल्व होते हैं, अन्यथा `false`।

---

## उदाहरण उपयोग

### मूल उपयोग

```typescript codeFormat={["typescript", "esm", "commonjs"]}
import { comparePaths } from "intlayer";

comparePaths("/ru/path", "/path"); // true
comparePaths("/ru/path/", "/path"); // true
comparePaths("/ru/path", "/path/"); // true
comparePaths("/ru/", "/"); // true
comparePaths("/ru", "/"); // true
comparePaths("ru/path", "/path"); // true
comparePaths("", "/"); // true
comparePaths("/ru", ""); // true
comparePaths("/ru/path", "/other"); // false
```

### एब्सोल्यूट और रिलेटिव URL

```typescript
import { comparePaths } from "intlayer";

comparePaths("https://example.com/ru/path", "/path"); // true
```

### सक्रिय नेविगेशन लिंक को हाइलाइट करना

```tsx
import { comparePaths } from "intlayer";
import { useLocation } from "react-router";

const NavLink = ({ href, children }) => {
  const { pathname } = useLocation();
  const isActive = comparePaths(pathname, href);

  return (
    <a href={href} aria-current={isActive ? "page" : undefined}>
      {children}
    </a>
  );
};
```

---

## normalizePath

`normalizePath` वह कैनोनिकल, लोकेल-स्वतंत्र पाथनेम लौटाता है जिसका उपयोग `comparePaths` द्वारा किया जाता है। यह लोकेल सेगमेंट, प्रोटोकॉल/होस्ट, क्वेरी स्ट्रिंग और हैश को हटा देता है, एक सिंगल लीडिंग स्लैश सुनिश्चित करता है, किसी भी ट्रेलिंग स्लैश को हटा देता है (रूट को छोड़कर) और खाली मानों के लिए `/` पर वापस आ जाता है।

```typescript codeFormat={["typescript", "esm", "commonjs"]}
import { normalizePath } from "intlayer";

normalizePath("/ru/path"); // "/path"
normalizePath("/ru/path/"); // "/path"
normalizePath("ru/path"); // "/path"
normalizePath("/ru/"); // "/"
normalizePath("/ru"); // "/"
normalizePath(""); // "/"
normalizePath("https://example.com/ru/path"); // "/path"
```

---

## संबंधित फ़ंक्शन्स

- [`getPathWithoutLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/intlayer/getPathWithoutLocale.md): URL या पाथनेम से लोकेल सेगमेंट को हटाता है।
- [`getPrefix`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/intlayer/getPrefix.md): किसी दिए गए लोकेल के लिए URL उपसर्ग (prefix) निर्धारित करता है।
- [`getLocalizedUrl`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/intlayer/getLocalizedUrl.md): विशिष्ट लोकेल के लिए स्थानीयकृत (localized) URL जनरेट करता है।

---

## TypeScript

```typescript
function normalizePath(inputUrl: string, locales?: Locales[]): string;

function comparePaths(
  pathname: string,
  href: string,
  locales?: Locales[]
): boolean;
```
