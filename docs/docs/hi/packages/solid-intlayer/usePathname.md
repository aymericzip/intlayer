---
createdAt: 2026-06-22
updatedAt: 2026-06-22
title: usePathname Hook दस्तावेज़ | solid-intlayer
description: जानें कि solid-intlayer पैकेज से usePathname हुक का उपयोग कैसे करें
keywords:
  - usePathname
  - pathname
  - locale
  - Intlayer
  - अंतर्राष्ट्रीयकरण
  - दस्तावेज़
  - Solid
  - Solid.js
  - JavaScript
slugs:
  - doc
  - packages
  - solid-intlayer
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

# Solid Integration: `usePathname` हुक दस्तावेज़

`usePathname` हुक वर्तमान ब्राउज़र पाथनेम (pathname) को locale सेगमेंट हटा कर, एक Solid `Accessor<string>` के रूप में लौटाता है। यह locale-आधारित नेविगेशन बनाने के लिए उपयोगी है — उदाहरण के लिए, यह निर्धारित करना कि कौन सा नेव (nav) आइटम सक्रिय है — बिना locale उपसर्ग को मैन्युअल रूप से हटाए।

## Solid में `usePathname` को आयात करना

```typescript
import { usePathname } from "solid-intlayer";
```

## अवलोकन

`usePathname` `window.location.pathname` से प्रारंभ किया गया एक प्रतिक्रियाशील (reactive) सिग्नल बनाता है, `getPathWithoutLocale` के माध्यम से locale उपसर्ग को हटाता है, और जब भी ब्राउज़र `popstate` इवेंट (बैक/फॉरवर्ड नेविगेशन) फायर करता है तो सिग्नल को अपडेट करता है। `onCleanup` के माध्यम से इवेंट श्रोता (event listener) स्वचालित रूप से साफ हो जाता है।

## उपयोग

```tsx fileName="src/components/NavItem.tsx"
import type { Component } from "solid-js";
import { usePathname } from "solid-intlayer";

type NavItemProps = {
  href: string;
  label: string;
};

const NavItem: Component<NavItemProps> = ({ href, label }) => {
  const pathname = usePathname();

  return (
    <a href={href} aria-current={pathname() === href ? "page" : undefined}>
      {label}
    </a>
  );
};

export default NavItem;
```

## रिटर्न वैल्यू

| प्रकार             | विवरण                                                                                          |
| ------------------ | ---------------------------------------------------------------------------------------------- |
| `Accessor<string>` | Solid Accessor (reactive getter) जो locale उपसर्ग के बिना वर्तमान पाथनेम (pathname) लौटाता है। |

## व्यवहार

- **Locale को हटाना**: लीडिंग locale सेगमेंट को हटा देता है (उदा. `/hi/dashboard` → `/dashboard`)।
- **प्रतिक्रियाशील (Reactive)**: `popstate` इवेंट्स (ब्राउज़र बैक / फॉरवर्ड नेविगेशन) पर स्वचालित रूप से अपडेट होता है।
- **SSR-सुरक्षित**: `window` उपलब्ध न होने पर `""` लौटाता है।
- **क्लीनअप**: `popstate` श्रोता Solid के `onCleanup` के माध्यम से स्वचालित रूप से हटा दिया जाता है।

## उदाहरण

```tsx fileName="src/components/Sidebar.tsx"
import type { Component } from "solid-js";
import { For } from "solid-js";
import { usePathname } from "solid-intlayer";

const links = [
  { href: "/dashboard", label: "डैशबोर्ड" },
  { href: "/settings", label: "सेटिंग्स" },
];

const Sidebar: Component = () => {
  const pathname = usePathname();

  return (
    <nav>
      <For each={links}>
        {({ href, label }) => (
          <a
            href={href}
            style={{ "font-weight": pathname() === href ? "bold" : "normal" }}
          >
            {label}
          </a>
        )}
      </For>
    </nav>
  );
};

export default Sidebar;
```

## संबंधित

- [`useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/solid-intlayer/useLocale.md) — वर्तमान locale + locale स्विचर
- [`getPathWithoutLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/intlayer/getPathWithoutLocale.md) — वह अंतर्निहित उपयोगिता जिसका उपयोग इस हुक द्वारा किया जाता है
