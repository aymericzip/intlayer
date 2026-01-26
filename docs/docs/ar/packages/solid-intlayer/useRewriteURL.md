---
updatedAt: 2025-08-23
createdAt: 2025-08-23
title: توثيق هوك useRewriteURL
description: هوك مخصص لـ Solid لإدارة إعادة كتابة عناوين URL المحلّية في Intlayer.
keywords:
  - useRewriteURL
  - solid-intlayer
  - solidjs
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - solid-intlayer
  - useRewriteURL
---

# هوك useRewriteURL

يُعد هوك `useRewriteURL` الخاص بـ SolidJS مصمماً لإدارة إعادة كتابة عناوين URL المحلّية على جهة العميل. يقوم تلقائياً بتصحيح عنوان المتصفح إلى نسخته المترجمة "الجميلة" استناداً إلى اللغة الحالية والتكوين في `intlayer.config.ts`.

باستخدام `window.history.replaceState`، يتجنّب التنقلات المكررة عبر Solid Router.

## الاستخدام

استدعِ الهوك داخل مكوّن يكون جزءاً من تطبيقك.

```tsx
import { useRewriteURL } from "solid-intlayer";

const Layout = (props) => {
  // يصحح تلقائيًا /fr/tests إلى /fr/essais في شريط العنوان إذا كانت قاعدة إعادة كتابة موجودة
  useRewriteURL();

  return <>{props.children}</>;
};
```

## كيف يعمل

1. **الكشف**: يستخدم الـ hook `createEffect` لمراقبة التغييرات في التابع التفاعلي `locale()`.
2. **المطابقة**: يحدد ما إذا كان `window.location.pathname` الحالي يطابق مسارًا كانونيًا له اسم بديل محلي "أجمل" للغة الحالية.
3. **تصحيح URL**: إذا وُجد اسم بديل أجمل، يستدعي الـ hook `window.history.replaceState` لتحديث شريط العنوان دون التأثير على حالة التنقل الداخلية أو التسبب في إعادة رسم المكوّنات.

## لماذا تستخدمه؟

- **عناوين URL المعتمدة**: يفرض عنوان URL واحد لكل نسخة مترجمة من المحتوى، وهو أمر حاسم لتحسين محركات البحث (SEO).
- **راحة المطور**: يتيح لك الاحتفاظ بتعريفات المسارات الداخلية بصيغتها الأساسية (canonical) بينما تعرض للمستخدمين مسارات محلية سهلة الاستخدام.
- **اتساق**: يصحح عناوين URL عندما يقوم المستخدمون بكتابة مسار يدويًا لا يتبع قواعد التوطين المفضلة لديك.

---
