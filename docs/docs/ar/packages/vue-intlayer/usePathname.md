---
createdAt: 2026-06-22
updatedAt: 2026-06-22
title: توثيق دالة usePathname | vue-intlayer
description: تعرف على كيفية استخدام دالة usePathname من حزمة vue-intlayer
keywords:
  - usePathname
  - pathname
  - locale
  - Intlayer
  - التدويل (Internationalization)
  - توثيق
  - Vue
  - JavaScript
slugs:
  - doc
  - packages
  - vue-intlayer
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

# تكامل Vue: توثيق `usePathname`

تعيد دالة `usePathname` مسار المتصفح الحالي (pathname) بعد إزالة جزء الـ locale منه، كقيمة محسوبة (Computed Ref) من نوع `ComputedRef<string>` في Vue. يُعد هذا مفيدًا لبناء تنقل (navigation) يراعي الـ locale — على سبيل المثال، لتحديد عنصر التنقل النشط حاليًا — دون الحاجة إلى إزالة بادئة الـ locale يدويًا.

## استيراد `usePathname` في Vue

```typescript
import { usePathname } from "vue-intlayer";
```

## نظرة عامة

تقوم `usePathname` بإنشاء (computed ref) في Vue تقرأ من `window.location.pathname`، وتزيل بادئة الـ locale باستخدام `getPathWithoutLocale`، وتُحَدِّث قيمتها كلما أطلق المتصفح حدث `popstate` (التنقل للخلف/للأمام). يمكن استخدام هذه القيمة مباشرة في قوالب Vue أو داخل دالة `setup`.

## الاستخدام

```vue fileName="src/components/NavItem.vue"
<script setup lang="ts">
import { usePathname } from "vue-intlayer";

const props = defineProps<{
  href: string;
  label: string;
}>();

const pathname = usePathname();
</script>

<template>
  <a :href="href" :aria-current="pathname === href ? 'page' : undefined">
    {{ label }}
  </a>
</template>
```

## القيمة المُرجعة

| النوع                 | الوصف                                                                                  |
| --------------------- | -------------------------------------------------------------------------------------- |
| `ComputedRef<string>` | قيمة محسوبة من Vue تحتوي على مسار URL الحالي (pathname) للمتصفح بدون بادئة الـ locale. |

## السلوك

- **إزالة الـ Locale**: تزيل مقطع الـ locale الأمامي (مثلًا `/ar/dashboard` ← `/dashboard`).
- **تفاعلية (Reactive)**: تُحدِّث القيمة عند كل حدث `popstate` (التنقل للخلف / للأمام في المتصفح).
- **آمنة في SSR**: تعيد `""` عندما يكون `window` غير متوفر.
- **التنظيف (Cleanup)**: تتم إضافة مستمع (listener) الـ `popstate` بشكل عام عند التهيئة وعادةً لا تتطلب تنظيفًا يدويًا لكل مكون، بفضل كيفية إدارة Vue لدورة حياة المكونات.

## مثال

```vue fileName="src/components/Sidebar.vue"
<script setup lang="ts">
import { usePathname } from "vue-intlayer";

const links = [
  { href: "/dashboard", label: "لوحة التحكم" },
  { href: "/settings", label: "الإعدادات" },
];

const pathname = usePathname();
</script>

<template>
  <nav>
    <a
      v-for="link in links"
      :key="link.href"
      :href="link.href"
      :style="{ fontWeight: pathname === link.href ? 'bold' : 'normal' }"
    >
      {{ link.label }}
    </a>
  </nav>
</template>
```

## مواضيع ذات صلة

- [`useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/vue-intlayer/useLocale.md) — الـ locale الحالي + مبدّل الـ locale
- [`getPathWithoutLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/intlayer/getPathWithoutLocale.md) — الأداة الأساسية المُستخدمة داخل هذا الـ composable
