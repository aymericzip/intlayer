---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: توثيق حزمة nuxt-intlayer
description: تكامل Nuxt مع Intlayer، يوفر وحدة لتطبيقات Nuxt.
keywords:
  - nuxt-intlayer
  - nuxt
  - التدويل
  - i18n
slugs:
  - doc
  - packages
  - nuxt-intlayer
  - exports
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: توثيق موحد لكل الصادرات
---

# حزمة nuxt-intlayer

توفر حزمة `nuxt-intlayer` وحدة Nuxt لدمج Intlayer في مشروع Nuxt الخاص بك.

## التثبيت

```bash
npm install nuxt-intlayer
```

## الصادرات

### الوحدة

توفر حزمة `nuxt-intlayer` وحدة Nuxt لدمج Intlayer في مشروع Nuxt الخاص بك.

استيراد:

```tsx
import "nuxt-intlayer";
```

أو إضافتها إلى `nuxt.config.ts`:

```ts
export default defineNuxtConfig({
  modules: ["nuxt-intlayer"],
});
```

| التصدير   | النوع        | الوصف                                                 |
| --------- | ------------ | ----------------------------------------------------- |
| `default` | `NuxtModule` | التصدير الافتراضي هو `NuxtModule` الذي يهيئ Intlayer. |
