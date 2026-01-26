---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: توثيق حزمة vite-intlayer
description: ملحق Vite لـ Intlayer، يوفر aliases للقواميس وwatchers.
keywords:
  - vite-intlayer
  - vite
  - plugin
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - vite-intlayer
  - exports
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: توحيد التوثيق لجميع exports
---

# حزمة vite-intlayer

توفّر حزمة `vite-intlayer` ملحق Vite لدمج Intlayer في تطبيقك المبني على Vite.

## التثبيت

```bash
npm install vite-intlayer
```

## الصادرات

### الملحق

استيراد:

```tsx
import "vite-intlayer";
```

| الدالة               | الوصف                                                                    | المستند المرتبط                                                                                                        |
| -------------------- | ------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------- |
| `intlayer`           | الإضافة الرئيسية لـ Vite التي تدمج Intlayer في عملية البناء.             | [intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/vite-intlayer/intlayer.md)           |
| `intlayerPlugin`     | (**مهمل**) مرادف لـ `intlayer`.                                          | [intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/vite-intlayer/intlayer.md)           |
| `intlayerProxy`      | مكوّن إضافي أثناء التطوير للتعامل مع اكتشاف اللغة والتوجيه.              | -                                                                                                                      |
| `intlayerMiddleware` | (**مهمل**) مرادف لـ `intlayerProxy`.                                     | -                                                                                                                      |
| `intlayerPrune`      | ملحق لإجراء tree-shake وتقليم القواميس غير المستخدمة أثناء عملية البناء. | [intlayerPrune](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/vite-intlayer/intlayerPrune.md) |
