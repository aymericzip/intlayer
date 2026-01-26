---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: توثيق hook useIntlayer | solid-intlayer
description: اطلع على كيفية استخدام الـ hook useIntlayer لحزمة solid-intlayer
keywords:
  - useIntlayer
  - القاموس
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
  - useIntlayer
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: توحيد التوثيق لجميع الصادرات
---

# توثيق hook useIntlayer

يتيح الـ `useIntlayer` hook استرجاع المحتوى المحلي من قاموس باستخدام مفتاحه. في Solid، يعيد هذا الـ hook دالة **accessor** تفاعلية تقوم بالتحديث تلقائيًا عند تغيير الـ locale.

## الاستخدام

```tsx
import { useIntlayer } from "solid-intlayer";

tsx;
const MyComponent = () => {
  const content = useIntlayer("my_dictionary_key");

  return (
    <div>
      <h1>{content().title}</h1>
      <p>{content().description}</p>
    </div>
  );
};
```

## الوصف

الهوك يقوم بالمهام التالية:

1. **كشف اللغة**: يستخدم اللغة الحالية من سياق `IntlayerProvider`.
2. **حقن القاموس**: يحقن تلقائيًا محتوى القاموس المقابل للمفتاح المزوَّد، باستخدام التصريحات المُحسّنة التي يولدها مجمّع Intlayer.
3. **التفاعلية**: يعيد accessor من Solid (`Accessor<T>`) يعاد تقييمه تلقائيًا عند تغيّر الحالة العامة للّغة.
4. **معالجة الترجمة**: يقوم بتحديد المحتوى بناءً على الـ locale المكتشف، مع معالجة أي تعريفات مثل `t()` و `enu()`، وما إلى ذلك، الموجودة داخل القاموس.

## المعلمات

- **key**: المفتاح الفريد للقاموس (كما هو معرف في ملفات إعلان المحتوى الخاصة بك).
- **locale** (اختياري): يتجاوز الـ locale الحالي.

## القيمة المرجعة

دالة accessor (`() => Content`) تُعيد المحتوى المحلي.
