---
createdAt: 2026-06-22
updatedAt: 2026-06-22
title: توثيق Hook usePathname | angular-intlayer
description: تعرف على كيفية استخدام hook usePathname في حزمة angular-intlayer
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
    changes: "إضافة الأداة المساعدة usePathname"
  - version: 8.2.0
    date: 2026-06-22
    changes: "تهيئة السجل"
author: aymericzip
---

# تكامل Angular: توثيق Hook `usePathname`

يُرجع الـ hook `usePathname` مسار المتصفح الحالي مع إزالة جزء اللغة، كإشارة (Signal) من نوع `Signal<string>` في Angular. يُعد هذا مفيدًا لبناء تنقل (navigation) يعتمد على اللغة — على سبيل المثال، لتحديد عنصر التنقل النشط — دون الحاجة إلى إزالة بادئة اللغة يدويًا.

## استيراد `usePathname` في Angular

```typescript
import { usePathname } from "angular-intlayer";
```

## نظرة عامة

يقوم `usePathname` بقراءة `window.location.pathname`، ويزيل بادئة اللغة عبر `getPathWithoutLocale`، ويُحدّث الإشارة (signal) كلما أطلق المتصفح حدث `popstate` (التنقل للخلف/للأمام). يستخدم `DestroyRef` الخاص بـ Angular لتنظيف مستمع الحدث تلقائيًا عند تدمير المكون.

## الاستخدام

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

## القيمة المُرجعة

| النوع            | الوصف                                                   |
| ---------------- | ------------------------------------------------------- |
| `Signal<string>` | إشارة Angular تحتوي على المسار الحالي بدون بادئة اللغة. |

## السلوك

- **إزالة اللغة**: يزيل جزء اللغة الأولي (مثل `/ar/dashboard` → `/dashboard`).
- **تفاعلي**: يتم التحديث تلقائيًا عند أحداث `popstate` (تنقل المتصفح للخلف / للأمام).
- **آمن لـ SSR**: يُرجع `""` عندما لا يكون `window` متاحًا.
- **التنظيف**: يتم إزالة مستمع الحدث `popstate` عبر `DestroyRef.onDestroy` عند تدمير المكون المُضيف.

## مثال

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
    { href: "/dashboard", label: "لوحة التحكم" },
    { href: "/settings", label: "الإعدادات" },
  ];

  readonly pathname = usePathname();
}
```

## مواضيع ذات صلة

- [`useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/angular-intlayer/exports.md) — اللغة الحالية + مبدل اللغة
- [`getPathWithoutLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/intlayer/getPathWithoutLocale.md) — الأداة المساعدة الأساسية التي يستخدمها هذا الـ hook
