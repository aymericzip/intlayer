---
createdAt: 2026-06-22
updatedAt: 2026-06-22
title: توثيق Hook usePathname | solid-intlayer
description: تعرف على كيفية استخدام hook usePathname من حزمة solid-intlayer
keywords:
  - usePathname
  - pathname
  - locale
  - Intlayer
  - تدويل
  - توثيق
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
    changes: "إضافة أداة usePathname"
  - version: 8.2.0
    date: 2026-06-22
    changes: "تهيئة السجل"
author: aymericzip
---

# تكامل Solid: توثيق Hook `usePathname`

يُعيد الـ hook `usePathname` مسار المتصفح الحالي (pathname) مع إزالة جزء اللغة (locale)، على شكل `Accessor<string>` خاص بـ Solid. إنه مفيد للتنقل القائم على اللغة — على سبيل المثال، لتحديد عنصر التنقل النشط — دون الحاجة إلى إزالة بادئة اللغة يدويًا.

## استيراد `usePathname` في Solid

```typescript
import { usePathname } from "solid-intlayer";
```

## نظرة عامة

يقوم `usePathname` بإنشاء إشارة تفاعلية (reactive signal) مُهيأة من `window.location.pathname`، ويزيل بادئة اللغة عبر `getPathWithoutLocale`، ثم يُحدّث الإشارة كلما أصدر المتصفح حدث `popstate` (التنقل للخلف/للأمام). يتم تنظيف مستمع الحدث (event listener) تلقائيًا عبر `onCleanup`.

## الاستخدام

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

## القيمة المرجعة

| النوع              | الوصف                                                                                         |
| ------------------ | --------------------------------------------------------------------------------------------- |
| `Accessor<string>` | Accessor خاص بـ Solid (حصول تفاعلي - getter) يُعيد المسار الحالي (pathname) بدون بادئة اللغة. |

## السلوك

- **إزالة اللغة**: يُزيل الجزء الأمامي للغة من المسار (مثال: `/ar/dashboard` ← `/dashboard`).
- **تفاعلي**: يتم التحديث تلقائيًا عند وقوع أحداث `popstate` (التنقل للخلف / للأمام في المتصفح).
- **آمن لـ SSR**: يُعيد `""` عندما لا يكون كائن `window` متاحًا.
- **التنظيف**: يُزال مستمع `popstate` تلقائيًا من خلال وظيفة `onCleanup` في Solid.

## مثال

```tsx fileName="src/components/Sidebar.tsx"
import type { Component } from "solid-js";
import { For } from "solid-js";
import { usePathname } from "solid-intlayer";

const links = [
  { href: "/dashboard", label: "لوحة التحكم" },
  { href: "/settings", label: "الإعدادات" },
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

## مواضيع ذات صلة

- [`useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/solid-intlayer/useLocale.md) — اللغة الحالية + مفتاح تغيير اللغة
- [`getPathWithoutLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/intlayer/getPathWithoutLocale.md) — الأداة الأساسية التي يستخدمها هذا الـ hook
