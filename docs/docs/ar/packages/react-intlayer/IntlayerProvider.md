---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: وثائق مكوّن IntlayerProvider | react-intlayer
description: انظر كيفية استخدام مكوّن IntlayerProvider لحزمة react-intlayer
keywords:
  - IntlayerProvider
  - react
  - Intlayer
  - intlayer
  - Internationalization
  - توثيق
slugs:
  - doc
  - packages
  - react-intlayer
  - IntlayerProvider
history:
  - version: 7.5.14
    date: 2026-01-21
    changes: بدء التوثيق
---

# وثائق مكوّن IntlayerProvider

مكوّن `IntlayerProvider` هو المزود الرئيسي لـ Intlayer في تطبيقات React. يوفّر سياق Intlayer لجميع عناصره الفرعية (children).

## الاستخدام

```tsx
import { IntlayerProvider } from "react-intlayer";

const App = ({ children }) => <IntlayerProvider>{children}</IntlayerProvider>;
```

## الخصائص (Props)

| الخاصية           | النوع                             | الوصف                                      |
| ----------------- | --------------------------------- | ------------------------------------------ |
| `locale`          | `LocalesValues`                   | اللغة الابتدائية للاستخدام.                |
| `defaultLocale`   | `LocalesValues`                   | اللغة الافتراضية للاستخدام كنسخة احتياطية. |
| `setLocale`       | `(locale: LocalesValues) => void` | دالة مخصصة لتعيين اللغة.                   |
| `disableEditor`   | `boolean`                         | ما إذا كان يجب تعطيل المحرر.               |
| `isCookieEnabled` | `boolean`                         | ما إذا تم تمكين الكوكيز لتخزين اللغة.      |
