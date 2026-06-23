---
createdAt: 2026-06-22
updatedAt: 2026-06-22
title: usePathname हुक दस्तावेज़ीकरण | preact-intlayer
description: जानें कि preact-intlayer पैकेज के लिए usePathname हुक का उपयोग कैसे करें
keywords:
  - usePathname
  - pathname
  - locale
  - Intlayer
  - अंतरराष्ट्रीयकरण
  - दस्तावेज़ीकरण
  - Preact
  - JavaScript
slugs:
  - doc
  - packages
  - preact-intlayer
  - usePathname
history:
  - version: 10.0.0
    date: 2026-06-23
    changes: "usePathname उपयोगिता (utility) जोड़ी गई"
  - version: 8.2.0
    date: 2026-06-22
    changes: "इतिहास का आरंभीकरण (Init history)"
author: aymericzip
---

# Preact एकीकरण: `usePathname` हुक दस्तावेज़ीकरण

`usePathname` हुक ब्राउज़र के वर्तमान पाथनेम (pathname) को locale सेगमेंट हटाकर लौटाता है। यह locale-aware नेविगेशन बनाने के लिए उपयोगी है — उदाहरण के लिए, यह निर्धारित करना कि कौन सा नेव आइटम सक्रिय (active) है — बिना locale उपसर्ग (prefix) को मैन्युअली हटाए।

## Preact में `usePathname` आयात करना

```typescript
import { usePathname } from "preact-intlayer";
```

## अवलोकन (Overview)

`usePathname` `window.location.pathname` को पढ़ता है, `getPathWithoutLocale` के माध्यम से locale उपसर्ग (prefix) को हटाता है, और जब भी ब्राउज़र `popstate` घटना (बैक/फॉरवर्ड नेविगेशन) को ट्रिगर करता है, तो यह घटक (component) को फिर से रेंडर करता है। सर्वर-साइड रेंडरिंग (SSR) के दौरान यह एक खाली स्ट्रिंग लौटाता है।

## उपयोग (Usage)

```tsx fileName="src/components/NavItem.tsx"
import type { FunctionComponent } from "preact";
import { usePathname } from "preact-intlayer";

type NavItemProps = {
  href: string;
  label: string;
};

const NavItem: FunctionComponent<NavItemProps> = ({ href, label }) => {
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

## रिटर्न वैल्यू (Return Value)

| प्रकार   | विवरण                                                                                             |
| -------- | ------------------------------------------------------------------------------------------------- |
| `string` | वर्तमान पाथनेम बिना locale उपसर्ग के। सर्वर-साइड रेंडरिंग (SSR) के दौरान खाली स्ट्रिंग लौटाता है। |

## व्यवहार (Behavior)

- **Locale को हटाना (Locale stripping)**: URL के शुरुआत में मौजूद locale सेगमेंट को हटाता है (उदा. `/hi/dashboard` → `/dashboard`)।
- **रिएक्टिव (Reactive)**: `popstate` घटनाओं (ब्राउज़र बैक / फॉरवर्ड नेविगेशन) पर स्वचालित रूप से अपडेट होता है।
- **SSR-सुरक्षित (SSR-safe)**: जब `window` उपलब्ध नहीं होता है तो `""` लौटाता है।
- **क्लीनअप (Cleanup)**: जब कंपोनेंट अनमाउंट होता है, तो `popstate` श्रोता (listener) स्वचालित रूप से हटा दिया जाता है।

## उदाहरण (Example)

```tsx fileName="src/components/Sidebar.tsx"
import type { FunctionComponent } from "preact";
import { usePathname } from "preact-intlayer";

const links = [
  { href: "/dashboard", label: "डैशबोर्ड" },
  { href: "/settings", label: "सेटिंग्स" },
];

const Sidebar: FunctionComponent = () => {
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

## संबंधित (Related)

- [`useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/preact-intlayer/exports.md) — वर्तमान locale + locale स्विचर
- [`getPathWithoutLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/intlayer/getPathWithoutLocale.md) — इस हुक द्वारा उपयोग की जाने वाली मुख्य उपयोगिता (utility)
