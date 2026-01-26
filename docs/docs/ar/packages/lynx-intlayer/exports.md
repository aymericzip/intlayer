---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: وثائق حزمة lynx-intlayer
description: دعم Lynx لـ Intlayer، يوفر polyfills لدعم locale.
keywords:
  - lynx-intlayer
  - lynx
  - التدويل
  - i18n
slugs:
  - doc
  - packages
  - lynx-intlayer
  - exports
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: توحيد التوثيق لجميع الصادرات
---

# حزمة lynx-intlayer

توفر حزمة `lynx-intlayer` الأدوات اللازمة لدمج Intlayer في تطبيقات Lynx.

## التثبيت

```bash
npm install lynx-intlayer
```

## الصادرات

### تعويض التوافق (Polyfill)

استيراد:

```tsx
import "lynx-intlayer";
```

| الدالة             | الوصف                                                     |
| ------------------ | --------------------------------------------------------- |
| `intlayerPolyfill` | دالة تطبّق polyfills اللازمة لتمكين Lynx من دعم Intlayer. |

### ملحق Rsbuild

توفر حزمة `lynx-intlayer` ملحق Rsbuild لدمج Intlayer في عملية البناء الخاصة بـ Lynx.

استيراد:

```tsx
import "lynx-intlayer";
```

| الدالة               | الوصف                                               |
| -------------------- | --------------------------------------------------- |
| `pluginIntlayerLynx` | ملحق Rsbuild الذي يدمج Intlayer في عملية بناء Lynx. |
