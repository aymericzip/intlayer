---
createdAt: 2026-06-22
updatedAt: 2026-06-22
title: توثيق الهوك usePathname | preact-intlayer
description: تعرف على كيفية استخدام الهوك usePathname مع حزمة preact-intlayer
keywords:
  - usePathname
  - pathname
  - locale
  - Intlayer
  - التدويل
  - توثيق
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
    changes: "إضافة أداة usePathname"
  - version: 8.2.0
    date: 2026-06-22
    changes: "تهيئة السجل التاريخي"
author: aymericzip
---

# تكامل Preact: توثيق الهوك `usePathname`

يُرجع الهوك `usePathname` المسار الحالي للمتصفح (pathname) مع إزالة مقطع اللغة (locale). يعد هذا مفيدًا لبناء تنقل (navigation) متوافق مع اللغة — على سبيل المثال، تحديد أي عنصر تنقل هو النشط — دون الحاجة إلى إزالة بادئة اللغة يدويًا.

## استيراد `usePathname` في Preact

```typescript
import { usePathname } from "preact-intlayer";
```

## نظرة عامة

يقرأ `usePathname` القيمة `window.location.pathname`، ويزيل بادئة اللغة عبر الدالة `getPathWithoutLocale`، ويعيد تصيير المكون (re-renders) كلما أطلق المتصفح حدث `popstate` (التنقل للخلف / للأمام). يُرجع سلسلة نصية فارغة أثناء التصيير من جانب الخادم (SSR).

## الاستخدام

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

## القيمة المرجعة

| النوع    | الوصف                                                                                |
| -------- | ------------------------------------------------------------------------------------ |
| `string` | المسار الحالي بدون بادئة اللغة. سلسلة نصية فارغة أثناء التصيير من جانب الخادم (SSR). |

## السلوك

- **إزالة اللغة (Locale stripping)**: يزيل مقطع اللغة الرائد (مثل `/ar/dashboard` ← `/dashboard`).
- **تفاعلي (Reactive)**: يتحدث تلقائيًا عند أحداث `popstate` (تنقل المتصفح للخلف / للأمام).
- **آمن لـ SSR**: يعود بـ `""` عندما لا يكون `window` متاحًا.
- **التنظيف (Cleanup)**: يتم إزالة مستمع الـ `popstate` تلقائيًا عند إلغاء تحميل المكون (unmount).

## مثال

```tsx fileName="src/components/Sidebar.tsx"
import type { FunctionComponent } from "preact";
import { usePathname } from "preact-intlayer";

const links = [
  { href: "/dashboard", label: "لوحة التحكم" },
  { href: "/settings", label: "الإعدادات" },
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

## مواضيع ذات صلة

- [`useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/preact-intlayer/exports.md) — اللغة الحالية + مبدّل اللغة
- [`getPathWithoutLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/intlayer/getPathWithoutLocale.md) — الأداة الأساسية التي يستخدمها هذا الهوك
