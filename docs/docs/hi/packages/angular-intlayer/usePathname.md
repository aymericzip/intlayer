---
createdAt: 2026-06-22
updatedAt: 2026-06-22
title: usePathname Hook प्रलेखन | angular-intlayer
description: देखें कि angular-intlayer पैकेज के लिए usePathname hook का उपयोग कैसे करें
keywords:
  - usePathname
  - pathname
  - locale
  - Intlayer
  - Internationalization
  - Documentation
  - Angular
  - JavaScript
  - TypeScript
slugs:
  - doc
  - packages
  - angular-intlayer
  - usePathname
history:
  - version: 10.0.0
    date: 2026-06-23
    changes: "usePathname उपयोगिता जोड़ी गई"
  - version: 8.2.0
    date: 2026-06-22
    changes: "इतिहास प्रारंभ"
author: aymericzip
---

# Angular एकीकरण: `usePathname` Hook प्रलेखन

`usePathname` हुक वर्तमान ब्राउज़र पाथनेम को Angular `Signal<string>` के रूप में लौटाता है, जिसमें से स्थान (locale) खंड हटा दिया गया होता है। यह स्थानीयता-जागरूक (locale-aware) नेविगेशन बनाने के लिए उपयोगी है — उदाहरण के लिए, यह निर्धारित करना कि कौन सा नेविगेशन आइटम सक्रिय है — बिना स्थानीयता उपसर्ग को मैन्युअल रूप से हटाए।

## Angular में `usePathname` आयात करना

```typescript
import { usePathname } from "angular-intlayer";
```

## अवलोकन

`usePathname` `window.location.pathname` पढ़ता है, `getPathWithoutLocale` के माध्यम से स्थानीयता उपसर्ग को हटाता है, और जब भी ब्राउज़र `popstate` ईवेंट (बैक/फॉरवर्ड नेविगेशन) फायर करता है तो सिग्नल को अपडेट करता है। यह Angular के `DestroyRef` का उपयोग करता है ताकि घटक के नष्ट होने पर ईवेंट श्रोता को स्वचालित रूप से साफ़ किया जा सके।

## उपयोग

```typescript fileName="src/app/nav-item.component.ts"
import { Component, input } from "@angular/core";
import { usePathname } from "angular-intlayer";

@Component({
  standalone: true,
  selector: "app-nav-item",
  template: `
    <a
      [href]="href()"
      [attr.aria-current]="pathname() === href() ? 'page' : null"
    >
      {{ label() }}
    </a>
  `,
})
export class NavItemComponent {
  readonly href = input.required<string>();
  readonly label = input.required<string>();

  readonly pathname = usePathname();
}
```

## रिटर्न वैल्यू

| प्रकार           | विवरण                                                                   |
| ---------------- | ----------------------------------------------------------------------- |
| `Signal<string>` | Angular सिग्नल जिसमें स्थानीयता उपसर्ग के बिना वर्तमान पाथनेम शामिल है। |

## व्यवहार

- **स्थानीयता हटाना (Locale stripping)**: अग्रणी स्थानीयता खंड को हटाता है (उदा. `/hi/dashboard` → `/dashboard`)।
- **प्रतिक्रियाशील**: `popstate` ईवेंट्स (ब्राउज़र बैक / फॉरवर्ड नेविगेशन) पर स्वचालित रूप से अपडेट होता है।
- **SSR-सुरक्षित**: `window` उपलब्ध न होने पर `""` लौटाता है।
- **सफाई**: होस्ट घटक के नष्ट होने पर `DestroyRef.onDestroy` के माध्यम से `popstate` श्रोता को हटा दिया जाता है।

## उदाहरण

```typescript fileName="src/app/sidebar.component.ts"
import { Component } from "@angular/core";
import { usePathname } from "angular-intlayer";

@Component({
  standalone: true,
  selector: "app-sidebar",
  template: `
    <nav>
      @for (link of links; track link.href) {
        <a
          [href]="link.href"
          [style.font-weight]="pathname() === link.href ? 'bold' : 'normal'"
        >
          {{ link.label }}
        </a>
      }
    </nav>
  `,
})
export class SidebarComponent {
  readonly links = [
    { href: "/dashboard", label: "डैशबोर्ड" },
    { href: "/settings", label: "सेटिंग्स" },
  ];

  readonly pathname = usePathname();
}
```

## संबंधित

- [`useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/angular-intlayer/exports.md) — वर्तमान स्थानीयता + स्थानीयता स्विचर
- [`getPathWithoutLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/hi/packages/intlayer/getPathWithoutLocale.md) — इस हुक द्वारा उपयोग की जाने वाली अंतर्निहित उपयोगिता
