---
updatedAt: 2025-08-23
createdAt: 2025-08-23
title: توثيق هوك useRewriteURL
description: هوك مخصص لـ React لإدارة إعادة كتابة عناوين URL المخصصة في Intlayer.
keywords:
  - useRewriteURL
  - react-intlayer
  - react
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - react-intlayer
  - useRewriteURL
---

# هوك useRewriteURL

تم تصميم هوك `useRewriteURL` لإدارة إعادة كتابة عناوين URL المحلية على جانب العميل. يقوم باكتشاف تلقائيًا ما إذا كان يجب تصحيح عنوان URL الحالي إلى نسخة محلية أكثر جاذبية بناءً على لغة المستخدم (locale) وقواعد إعادة الكتابة المعرفة في `intlayer.config.ts`.

على عكس التنقّل القياسي، يستخدم هذا الهوك `window.history.replaceState` لتحديث عنوان URL في شريط العنوان دون التسبب في إعادة تحميل الصفحة بالكامل أو تشغيل دورة تنقّل في الراوتر.

## الاستخدام

قم باستدعاء الهُوك ببساطة داخل مكوّن يعمل على جهة العميل.

```tsx
import { useRewriteURL } from "react-intlayer";

const MyComponent = () => {
  // يصحّح تلقائيًا /fr/tests إلى /fr/essais في شريط العنوان إذا كانت هناك قاعدة إعادة كتابة
  useRewriteURL();

  return <div>المكوّن الخاص بي</div>;
};
```

## كيف يعمل

1. **الكشف**: يقوم الهُوك بمراقبة قيمة `window.location.pathname` الحالية و`locale` الخاص بالمستخدم.
2. **المطابقة**: يستخدم محرك Intlayer الداخلي للتحقق مما إذا كان المسار الحالي يطابق مسارًا canonical له alias محلي أكثر تناسقًا للـ `locale` الحالية.
3. **تصحيح URL**: إذا تم العثور على اسم مستعار أفضل (وكان مختلفًا عن المسار الحالي)، يقوم الـhook باستدعاء `window.history.replaceState` لتحديث عنوان المتصفح مع الحفاظ على نفس المحتوى والحالة canonical.

## لماذا استخدامه؟

- **SEO**: يضمن أن يصل المستخدمون دائمًا إلى عنوان URL الودي والموثوق الوحيد (canonical) للغة معينة.
- **التناسق**: يمنع التباينات حيث قد يكتب المستخدم يدويًا مسارًا canonical (مثل `/fr/privacy-notice`) بدلًا من النسخة المحلية (`/fr/politique-de-confidentialite`).
- **الأداء**: يحدث شريط العنوان دون تحفيز تأثيرات جانبية غير مرغوب فيها من الراوتر أو إعادة تركيب المكونات.
