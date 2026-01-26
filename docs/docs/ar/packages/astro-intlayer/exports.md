---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: توثيق حزمة astro-intlayer
description: تكامل Astro مع Intlayer، يوفر إعداد التوجيه القائم على اللغة وإدارة القواميس.
keywords:
  - astro-intlayer
  - astro
  - التدويل
  - i18n
slugs:
  - doc
  - packages
  - astro-intlayer
  - exports
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: توثيق موحد لجميع الصادرات
---

# حزمة astro-intlayer

توفر حزمة `astro-intlayer` الأدوات اللازمة لدمج Intlayer في تطبيقات Astro. تقوم بتكوين التوجيه القائم على اللغة وإدارة القواميس.

## التثبيت

```bash
npm install astro-intlayer
```

## الصادرات

### التكامل

توفر حزمة `astro-intlayer` تكاملًا مع Astro لإعداد Intlayer في مشروعك.

استيراد:

```tsx
import "astro-intlayer";
```

أو إضافة إلى `astro.config.mjs`:

```ts
export default defineConfig({
  integrations: [intlayer()],
});
```

| الدالة     | الوصف                                       |
| ---------- | ------------------------------------------- |
| `intlayer` | تكامل Astro يقوم بإعداد Intlayer في مشروعك. |
