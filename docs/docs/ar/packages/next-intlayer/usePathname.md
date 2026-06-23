---
createdAt: 2026-06-22
updatedAt: 2026-06-22
title: توثيق Hook usePathname | next-intlayer
description: تعرف على كيفية استخدام Hook usePathname لحزمة next-intlayer
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
    changes: "إضافة أداة usePathname"
  - version: 8.2.0
    date: 2026-06-22
    changes: "تهيئة السجل"
author: aymericzip
---

# تكامل Next.js: توثيق Hook `usePathname`

يُرجع الخطاف `usePathname` مسار Next.js الحالي مع إزالة مقطع اللغة (locale). يعد هذا مفيدًا لبناء تنقل يراعي اللغة — على سبيل المثال، تحديد عنصر التنقل النشط — دون الحاجة إلى إزالة بادئة اللغة يدويًا.

## استيراد `usePathname` في Next.js

```typescript
import { usePathname } from "next-intlayer";
```

## نظرة عامة

يقوم `usePathname` بتغليف `usePathname()` المدمج في Next.js والمستورد من `next/navigation`، ويقوم بإضافة أية معلمات بحث (search params)، ثم يزيل بادئة اللغة عبر `getPathWithoutLocale`. يعيد هذا الخطاف تصيير المكون (re-render) عند كل انتقال (navigation) يتم من جانب العميل. هذا الخطاف متاح فقط في مكونات العميل (يتطلب `"use client"`).

## الاستخدام

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

## القيمة المرجعة

| النوع    | الوصف                                                     |
| -------- | --------------------------------------------------------- |
| `string` | المسار الحالي مع إزالة بادئة اللغة ومعلمات استعلام اللغة. |

## السلوك

- **إزالة اللغة**: يزيل مقطع اللغة الرائد (مثل `/ar/dashboard` ← `/dashboard`).
- **إزالة معلمة البحث**: يزيل أيضًا معلمة استعلام `?locale=...` عندما يتم استخدام وضع توجيه معلمات البحث.
- **تفاعلي**: يتم تحديثه في كل مرة يحدث فيها انتقال من جانب العميل عبر Next.js App Router.
- **آمن مع العرض من جانب الخادم (SSR)**: يُرجع مسار الخادم أثناء العرض الأول (first render)، ثم يُزامن معلمات البحث على جانب العميل.

## مقارنة مع `useLocale`

يقوم `useLocale` من `next-intlayer` بالفعل بتوفير `pathWithoutLocale` كجزء من قيمته المرجعة. استخدم `usePathname` عندما تحتاج فقط إلى المسار ولا تحتاج إلى وظيفة تبديل اللغة.

```tsx codeFormat={["typescript", "esm"]}
// عندما تحتاج إلى حالة اللغة والمسار معًا:
import { useLocale } from "next-intlayer";
const { locale, pathWithoutLocale } = useLocale();

// عندما تحتاج إلى المسار فقط:
import { usePathname } from "next-intlayer";
const pathname = usePathname();
```

## مثال

```tsx fileName="src/components/Sidebar.tsx" codeFormat={["typescript", "esm"]}
"use client";

import type { FC } from "react";
import { usePathname } from "next-intlayer";

const links = [
  { href: "/dashboard", label: "لوحة التحكم" },
  { href: "/settings", label: "الإعدادات" },
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

## ذو صلة

- [`useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/next-intlayer/useLocale.md) — اللغة الحالية + مبدل اللغة (كما يوفر `pathWithoutLocale`)
- [`getPathWithoutLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/intlayer/getPathWithoutLocale.md) — الأداة الأساسية التي يعتمد عليها هذا الخطاف
