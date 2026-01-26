---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: توثيق Hook useLocale | solid-intlayer
description: اطلع على كيفية استخدام hook useLocale لحزمة solid-intlayer
keywords:
  - useLocale
  - locale
  - Intlayer
  - intlayer
  - Internationalization
  - توثيق
  - Solid
  - Solid.js
slugs:
  - doc
  - packages
  - solid-intlayer
  - useLocale
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: توحيد التوثيق لجميع الصادرات
---

# توثيق Hook useLocale

يسمح لك hook `useLocale` بإدارة اللغة الحالية في تطبيق Solid الخاص بك. ويوفر الوصول إلى اللغة الحالية (كـ accessor)، واللغة الافتراضية، واللغات المتاحة، ودالة لتحديث اللغة.

## الاستخدام

```tsx
import { useLocale } from "solid-intlayer";

const LocaleSwitcher = () => {
  const { locale, setLocale, availableLocales } = useLocale();

  return (
    <select value={locale()} onChange={(e) => setLocale(e.currentTarget.value)}>
      {availableLocales.map((loc) => (
        <option value={loc} selected={loc === locale()}>
          {loc}
        </option>
      ))}
    </select>
  );
};
```

## الوصف

تُرجِع الـ hook كائنًا يحتوي على الخصائص التالية:

1. **locale**: accessor من Solid (`() => string`) يعيد الـ locale الحالي.
2. **defaultLocale**: الـ locale الافتراضي المعرفة في `intlayer.config.ts`.
3. **availableLocales**: مصفوفة بجميع الـ locales المدعومة بواسطة تطبيقك.
4. **setLocale**: دالة لتحديث الـ locale الخاص بالتطبيق. كما تتولى الحفظ (الكوكيز/التخزين المحلي) إذا كانت مُفعّلة.

## المعاملات

- **props** (اختياري):
  - **onLocaleChange**: دالة رد نداء تُستدعى كلما تغيّرت اللغة.
  - **isCookieEnabled**: ما إذا كان سيتم الاحتفاظ باللغة في كوكيز.
