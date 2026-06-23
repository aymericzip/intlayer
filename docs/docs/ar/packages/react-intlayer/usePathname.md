---
createdAt: 2026-06-22
updatedAt: 2026-06-22
title: توثيق الخطاف usePathname | react-intlayer
description: تعرف على كيفية استخدام الخطاف usePathname من حزمة react-intlayer للحصول على مسار URL الحالي بدون جزء الإعداد المحلي (locale).
keywords:
  - usePathname
  - مسار الرابط
  - react
  - intlayer
  - التوجيه
  - التدويل
slugs:
  - doc
  - packages
  - react-intlayer
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

# تكامل React: توثيق الخطاف `usePathname`

الخطاف `usePathname` من `react-intlayer` يعيد المسار الحالي للمتصفح (pathname) مع إزالة جزء الإعداد المحلي (locale). يعتمد على الخاصية الأصلية `window.location.pathname` ويتفاعل مع أحداث تنقل المتصفح عبر `popstate`.

## استيراد `usePathname`

```typescript
import { usePathname } from "react-intlayer";
```

## نظرة عامة

على عكس خطافات التوجيه الخاصة بأطر العمل (مثل تلك الموجودة في `next-intlayer` أو `react-router`)، يُعد هذا الخطاف حلاً خفيف الوزن ومستقلاً عن أطر العمل لتطبيقات React الخالصة. يقوم باستخراج مسار URL الحالي ويزيل أي بادئة محلية مطابقة (على سبيل المثال، `/ar/about` تصبح `/about`).

## الاستخدام

```tsx fileName="src/components/Navigation.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { usePathname } from "react-intlayer";

const Navigation: FC = () => {
  const pathname = usePathname();

  return (
    <nav>
      <a
        href="/home"
        style={{ fontWeight: pathname === "/home" ? "bold" : "normal" }}
      >
        الرئيسية
      </a>
      <a
        href="/about"
        style={{ fontWeight: pathname === "/about" ? "bold" : "normal" }}
      >
        من نحن
      </a>
    </nav>
  );
};

export default Navigation;
```

## القيمة المرجعة

| النوع    | الوصف                                                                                                |
| -------- | ---------------------------------------------------------------------------------------------------- |
| `string` | مسار المتصفح الحالي مع إزالة بادئة الإعداد المحلي (على سبيل المثال، `/ar/dashboard` → `/dashboard`). |

## السلوك

- **إزالة الإعداد المحلي**: يستخدم أداة `getPathWithoutLocale` داخليًا لاكتشاف وإزالة الإعداد المحلي تلقائيًا من المسار بناءً على تكوين Intlayer للتطبيق.
- **التفاعلية**: يستمع إلى الحدث `popstate`. عندما يتنقل المستخدم باستخدام أزرار الرجوع/التقدم في المتصفح أو عندما يتم استدعاء `pushState`/`replaceState`، يقوم الخطاف بتحديث المسار المرجع.
- **SSR Fallback**: على الخادم (حيث تكون `window` غير معرفة)، فإنه يرجع `/` افتراضيًا لأنه لا يمتلك وصولًا إلى URL الخاص بالطلب بشكل افتراضي في سياق React خالص.

## الوثائق ذات الصلة

- [`useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/react-intlayer/useLocale.md)
- [`getPathWithoutLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/intlayer/getPathWithoutLocale.md)
