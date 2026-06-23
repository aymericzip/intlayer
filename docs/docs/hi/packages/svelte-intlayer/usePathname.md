---
createdAt: 2026-06-22
updatedAt: 2026-06-22
title: usePathname Function Documentation | svelte-intlayer
description: svelte-intlayer पैकेज के लिए usePathname फ़ंक्शन का उपयोग करना सीखें
keywords:
  - usePathname
  - pathname
  - locale
  - Intlayer
  - Internationalization
  - Documentation
  - Svelte
  - JavaScript
slugs:
  - doc
  - packages
  - svelte-intlayer
  - usePathname
history:
  - version: 10.0.0
    date: 2026-06-23
    changes: "usePathname उपयोगिता जोड़ें"
  - version: 8.2.0
    date: 2026-06-22
    changes: "Init history"
author: aymericzip
---

# Svelte Integration: `usePathname` Documentation

`usePathname` फ़ंक्शन वर्तमान ब्राउज़र पथनाम (pathname) को locale खंड हटाकर Svelte `Readable<string>` स्टोर के रूप में लौटाता है। यह locale-जागरूक नेविगेशन बनाने के लिए उपयोगी है — उदाहरण के लिए, यह निर्धारित करना कि कौन सा नेव आइटम सक्रिय है — बिना locale उपसर्ग को मैन्युअल रूप से हटाए।

## Svelte में `usePathname` आयात (Import) करना

```typescript
import { usePathname } from "svelte-intlayer";
```

## अवलोकन (Overview)

`usePathname` एक Svelte readable स्टोर बनाता है जो `window.location.pathname` को पढ़ता है, `getPathWithoutLocale` के माध्यम से locale उपसर्ग हटाता है, और जब भी ब्राउज़र `popstate` इवेंट (बैक/फ़ॉरवर्ड नेविगेशन) फायर करता है, तो एक नया मान उत्सर्जित करता है। घटकों में `$` स्टोर सिंटैक्स के साथ सदस्यता लें।

## उपयोग (Usage)

```svelte fileName="src/components/NavItem.svelte"
<script lang="ts">
  import { usePathname } from "svelte-intlayer";

  export let href: string;
  export let label: string;

  const pathname = usePathname();
</script>

<a {href} aria-current={$pathname === href ? "page" : undefined}>
  {label}
</a>
```

## रिटर्न वैल्यू (Return Value)

| प्रकार             | विवरण                                                                                 |
| ------------------ | ------------------------------------------------------------------------------------- |
| `Readable<string>` | Svelte readable store जिसमें locale उपसर्ग के बिना वर्तमान पथनाम (pathname) शामिल है। |

## व्यवहार (Behavior)

- **Locale stripping**: शुरुआत के locale खंड को हटाता है (उदा. `/hi/dashboard` → `/dashboard`)।
- **Reactive**: हर `popstate` इवेंट (ब्राउज़र बैक / फॉरवर्ड नेविगेशन) पर एक नया मान उत्सर्जित करता है।
- **SSR-safe**: `window` उपलब्ध न होने पर `""` लौटाता है।
- **Cleanup**: जब अंतिम सब्सक्राइबर अनसब्सक्राइब करता है तो `popstate` श्रोता (listener) स्वचालित रूप से हटा दिया जाता है।

## उदाहरण (Example)

```svelte fileName="src/components/Sidebar.svelte"
<script lang="ts">
  import { usePathname } from "svelte-intlayer";

  const links = [
    { href: "/dashboard", label: "डैशबोर्ड" },
    { href: "/settings", label: "सेटिंग्स" },
  ];

  const pathname = usePathname();
</script>

<nav>
  {#each links as link}
    <a
      href={link.href}
      style:font-weight={$pathname === link.href ? "bold" : "normal"}
    >
      {link.label}
    </a>
  {/each}
</nav>
```

## संबंधित (Related)

- [`useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/svelte-intlayer/useLocale.md) — वर्तमान locale + locale स्विचर
- [`getPathWithoutLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/intlayer/getPathWithoutLocale.md) — इस हुक द्वारा उपयोग की जाने वाली अंतर्निहित उपयोगिता
