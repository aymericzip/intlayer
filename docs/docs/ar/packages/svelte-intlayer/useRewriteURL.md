---
updatedAt: 2025-08-23
createdAt: 2025-08-23
title: توثيق هوك useRewriteURL
description: هوك مخصص لـ Svelte لإدارة إعادة كتابة روابط URL المحلية في Intlayer.
keywords:
  - useRewriteURL
  - svelte-intlayer
  - svelte
  - sveltekit
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - svelte-intlayer
  - useRewriteURL
---

# هوك useRewriteURL

تم تصميم هوك `useRewriteURL` لـ Svelte لإدارة إعادة كتابة روابط URL المحلية على جانب العميل. يقوم تلقائيًا بتصحيح عنوان المتصفح إلى نسخته المحلية "المنسقة" استنادًا إلى اللغة الحالية والإعدادات في `intlayer.config.ts`.

يقوم بتحديث عنوان URL بشكل صامت باستخدام `window.history.replaceState`، متجنبًا التنقل الكامل عبر SvelteKit.

## الاستخدام

استدعِ الهوك داخل مكوّن Svelte.

```svelte
<script>
  import { useRewriteURL } from 'svelte-intlayer';

  // يصحّح تلقائيًا /fr/tests إلى /fr/essais في شريط العنوان إذا كانت هناك قاعدة لإعادة الكتابة
  useRewriteURL();
</script>

<slot />
```

## كيف يعمل

1. **التحديثات التفاعلية**: الـ hook يشترك في مخزن `locale` الخاص بـ Intlayer.
2. **الاكتشاف**: كلما تغيّر الـ locale (أو عند on mount)، يتحقق مما إذا كان `window.location.pathname` الحالي له اسم مستعار محلي أجمل معرف في قواعد إعادة الكتابة الخاصة بك.
3. **تصحيح URL**: إذا وُجد مسار أجمل، يستدعي الـ hook `window.history.replaceState` لتحديث شريط العنوان دون إعادة تحميل الصفحة بالكامل أو تفعيل منطق التنقل الخاص بـ SvelteKit.

## لماذا استخدامه؟

- **SEO Best Practices**: يضمن أن تقوم محركات البحث بفهرسة النسخة المحلية الأجمل فقط من عناوين URL الخاصة بك.
- **تحسين تجربة المستخدم**: يصحح عناوين URL التي تم إدخالها يدويًا لتعكس بنية التسمية المفضلة لديك.
- **تحديثات صامتة**: يُعدّل شريط العنوان دون التأثير على شجرة المكونات أو سجل التنقل.
