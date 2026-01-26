---
updatedAt: 2025-08-23
createdAt: 2025-08-23
title: توثيق الـ composable useRewriteURL
description: Composable خاص بـ Vue لإدارة إعادة كتابة عناوين URL المحلية في Intlayer.
keywords:
  - useRewriteURL
  - vue-intlayer
  - vue
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - vue-intlayer
  - useRewriteURL
---

# الـ composable useRewriteURL

تم تصميم الـ composable `useRewriteURL` لـ Vue 3 للتعامل مع إعادة كتابة عناوين URL المحلية على جانب العميل. يقوم تلقائيًا بتصحيح عنوان المتصفح إلى نسخته المحلية "الأجمل" بناءً على اللغة الحالية للمستخدم والتكوين الموجود في `intlayer.config.ts`.

يعمل ذلك باستخدام `window.history.replaceState`، مما يتجنّب تحفيز تنقلات Vue Router غير المرغوب فيها.

## الاستخدام

استدعِ الـ composable داخل دالة `setup()` أو داخل `<script setup>`.

```vue
<script setup>
import { useRewriteURL } from "vue-intlayer";

// يصحح تلقائيًا /fr/tests إلى /fr/essais في شريط العنوان إذا كانت هناك قاعدة لإعادة الكتابة
useRewriteURL();
</script>

<template>
  <router-view />
</template>
```

## كيف يعمل

1. **المراقبة التفاعلية**: يهيئ الـ composable مراقبة (`watch`) على `locale` الخاص بالمستخدم.
2. **مطابقة إعادة الكتابة**: كلما تغيّر الـ `locale` (أو عند التركيب mount)، يتحقق مما إذا كان `window.location.pathname` الحالي يطابق مسارًا canonical له اسم محلي أجمل.
3. **تصحيح الـ URL**: إذا وُجد اسم محلي أجمل، يستدعي الـ composable `window.history.replaceState` لتحديث شريط العنوان دون إعادة تحميل الصفحة أو فقدان حالة الراوتر.

## لماذا تستخدمه؟

- **تحسين محركات البحث (SEO)**: يضمن أن تقوم محركات البحث بفهرسة النسخة المعتمدة والمحلية من عناوين URL الخاصة بك.
- **تحسين تجربة المستخدم (UX)**: يصحح عناوين URL التي تم إدخالها يدويًا لتعكس التسمية المفضلة لديك (مثل `/fr/a-propos` بدلاً من `/fr/about`).
- **عبء منخفض**: يحدث عنوان URL بهدوء دون إعادة تشغيل دورات حياة المكوّنات أو إعادة استدعاء حراس التنقّل.

---
