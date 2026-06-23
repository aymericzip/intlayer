---
createdAt: 2026-06-22
updatedAt: 2026-06-22
title: توثيق دالة usePathname | svelte-intlayer
description: تعرف على كيفية استخدام دالة usePathname من حزمة svelte-intlayer
keywords:
  - usePathname
  - pathname
  - locale
  - Intlayer
  - التدويل (Internationalization)
  - توثيق
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
    changes: "إضافة أداة usePathname المساعدة"
  - version: 8.2.0
    date: 2026-06-22
    changes: "تهيئة السجل التاريخي"
author: aymericzip
---

# تكامل Svelte: توثيق `usePathname`

تعيد دالة `usePathname` مسار المتصفح الحالي (pathname) بعد إزالة جزء الـ locale منه، وتُرجع ذلك كمخزن (store) من نوع `Readable<string>` في Svelte. يُعد هذا مفيدًا لبناء تنقل (navigation) يراعي الـ locale — على سبيل المثال، لتحديد عنصر التنقل النشط حاليًا — دون الحاجة إلى إزالة بادئة الـ locale يدويًا.

## استيراد `usePathname` في Svelte

```typescript
import { usePathname } from "svelte-intlayer";
```

## نظرة عامة

تقوم `usePathname` بإنشاء store قابل للقراءة في Svelte يقرأ من `window.location.pathname`، ويزيل بادئة الـ locale باستخدام `getPathWithoutLocale`، ثم يُصدر قيمة جديدة كلما أطلق المتصفح حدث `popstate` (التنقل للخلف/للأمام). اشترك في هذا الـ store باستخدام صيغة `$` داخل المكونات (components).

## الاستخدام

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

## القيمة المُرجعة

| النوع              | الوصف                                                                                 |
| ------------------ | ------------------------------------------------------------------------------------- |
| `Readable<string>` | Store Svelte قابل للقراءة يحتوي على مسار URL الحالي (pathname) بدون بادئة الـ locale. |

## السلوك

- **إزالة الـ Locale**: تزيل مقطع الـ locale الأمامي (مثلًا `/ar/dashboard` ← `/dashboard`).
- **تفاعلية (Reactive)**: تُصدر قيمة جديدة عند كل حدث `popstate` (التنقل للخلف / للأمام في المتصفح).
- **آمنة في SSR**: تعيد `""` عندما يكون `window` غير متوفر.
- **التنظيف (Cleanup)**: تتم إزالة مستمع (listener) الـ `popstate` تلقائيًا عندما يلغي آخر مشترك (subscriber) اشتراكه.

## مثال

```svelte fileName="src/components/Sidebar.svelte"
<script lang="ts">
  import { usePathname } from "svelte-intlayer";

  const links = [
    { href: "/dashboard", label: "لوحة التحكم" },
    { href: "/settings", label: "الإعدادات" },
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

## مواضيع ذات صلة

- [`useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/svelte-intlayer/useLocale.md) — الـ locale الحالي + مبدّل الـ locale
- [`getPathWithoutLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/intlayer/getPathWithoutLocale.md) — الأداة الأساسية المُستخدمة داخل هذا الـ hook
