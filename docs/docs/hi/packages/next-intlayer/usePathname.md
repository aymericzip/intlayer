---
createdAt: 2026-06-22
updatedAt: 2026-06-22
title: usePathname Hook दस्तावेज़ | next-intlayer
description: next-intlayer पैकेज के लिए usePathname हुक का उपयोग करना सीखें
keywords:
  - usePathname
  - pathname
  - locale
  - Intlayer
  - Internationalization
  - Documentation
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - packages
  - next-intlayer
  - usePathname
history:
  - version: 10.0.0
    date: 2026-06-23
    changes: "usePathname उपयोगिता जोड़ी गई"
  - version: 8.2.0
    date: 2026-06-22
    changes: "इतिहास का आरंभ"
author: aymericzip
---

# Next.js इंटीग्रेशन: `usePathname` हुक दस्तावेज़

`usePathname` हुक वर्तमान Next.js पथ (pathname) को बिना लोकेल (locale) सेगमेंट के लौटाता है। यह लोकेल-जागरूक नेविगेशन बनाने के लिए उपयोगी है — उदाहरण के लिए, यह निर्धारित करना कि कौन सा नेविगेशन आइटम सक्रिय है — बिना मैन्युअल रूप से लोकेल उपसर्ग को हटाए।

## Next.js में `usePathname` को आयात करना

```typescript
import { usePathname } from "next-intlayer";
```

## अवलोकन

`usePathname`, `next/navigation` से Next.js के अंतर्निहित `usePathname()` को रैप करता है, किसी भी खोज पैरामीटर (search params) को जोड़ता है, और `getPathWithoutLocale` के माध्यम से लोकेल उपसर्ग को हटा देता है। यह हर क्लाइंट-साइड नेविगेशन पर फिर से रेंडर (re-render) को ट्रिगर करता है। यह हुक केवल Client Components में उपलब्ध है (`"use client"` की आवश्यकता है)।

## उपयोग

```tsx fileName="src/components/NavItem.tsx" codeFormat={["typescript", "esm"]}
"use client";

import type { FC } from "react";
import { usePathname } from "next-intlayer";

type NavItemProps = {
  href: string;
  label: string;
};

const NavItem: FC<NavItemProps> = ({ href, label }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <a href={href} aria-current={isActive ? "page" : undefined}>
      {label}
    </a>
  );
};

export default NavItem;
```

## रिटर्न वैल्यू

| प्रकार   | विवरण                                                                                                         |
| -------- | ------------------------------------------------------------------------------------------------------------- |
| `string` | वर्तमान पाथनेम जिसमें से लोकेल प्रीफ़िक्स और लोकेल पैरामीटर्स से जुड़े क्वेरी पैरामीटर्स हटा दिए गए होते हैं। |

## व्यवहार

- **लोकेल स्ट्रिपिंग**: शुरुआती लोकेल सेगमेंट को हटा देता है (उदा: `/hi/dashboard` → `/dashboard`)।
- **सर्च पैरामीटर स्ट्रिपिंग**: जब सर्च पैरामीटर-आधारित रूटिंग मोड का उपयोग किया जाता है, तो यह `?locale=...` क्वेरी पैरामीटर को भी हटा देता है।
- **रिएक्टिव**: Next.js App Router के माध्यम से प्रत्येक क्लाइंट-साइड नेविगेशन पर स्वचालित रूप से अपडेट होता है।
- **SSR सुरक्षित**: पहले रेंडर के दौरान सर्वर-साइड पथ लौटाता है, फिर क्लाइंट पर सर्च पैरामीटर्स को सिंक करता है।

## `useLocale` के साथ तुलना

`next-intlayer` से `useLocale` पहले से ही अपने रिटर्न वैल्यू के हिस्से के रूप में `pathWithoutLocale` को प्रदर्शित करता है। जब आपको केवल पथ (path) की आवश्यकता हो और लोकेल-स्विचिंग कार्यक्षमता की आवश्यकता न हो, तो `usePathname` का उपयोग करें।

```tsx codeFormat={["typescript", "esm"]}
// जब आपको लोकेल स्थिति और पथ दोनों की आवश्यकता हो:
import { useLocale } from "next-intlayer";
const { locale, pathWithoutLocale } = useLocale();

// जब आपको केवल पथ की आवश्यकता हो:
import { usePathname } from "next-intlayer";
const pathname = usePathname();
```

## उदाहरण

```tsx fileName="src/components/Sidebar.tsx" codeFormat={["typescript", "esm"]}
"use client";

import type { FC } from "react";
import { usePathname } from "next-intlayer";

const links = [
  { href: "/dashboard", label: "डैशबोर्ड" },
  { href: "/settings", label: "सेटिंग्स" },
];

const Sidebar: FC = () => {
  const pathname = usePathname();

  return (
    <nav>
      {links.map(({ href, label }) => (
        <a
          key={href}
          href={href}
          style={{ fontWeight: pathname === href ? "bold" : "normal" }}
        >
          {label}
        </a>
      ))}
    </nav>
  );
};

export default Sidebar;
```

## संबंधित दस्तावेज़

- [`useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/next-intlayer/useLocale.md) — वर्तमान लोकेल + लोकेल स्विचर (यह `pathWithoutLocale` भी प्रदर्शित करता है)
- [`getPathWithoutLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/intlayer/getPathWithoutLocale.md) — इस हुक द्वारा उपयोग की जाने वाली अंतर्निहित उपयोगिता
