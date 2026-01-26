---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: توثيق مكوّن IntlayerProvider | solid-intlayer
description: اطّلع على كيفية استخدام مكوّن IntlayerProvider لحزمة solid-intlayer
keywords:
  - IntlayerProvider
  - provider
  - Intlayer
  - intlayer
  - التدويل
  - التوثيق
  - Solid
  - Solid.js
slugs:
  - doc
  - packages
  - solid-intlayer
  - IntlayerProvider
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: توثيق موحّد لجميع الصادرات
---

# توثيق مكوّن IntlayerProvider

مكوّن `IntlayerProvider` هو المكوّن الجذري الذي يوفّر سياق التدويل (internationalization) لتطبيق Solid الخاص بك. يقوم بإدارة حالة الـ `locale` الحالية ويضمن أن جميع المكوّنات الفرعية قادرة على الوصول إلى الترجمات.

## الاستخدام

```tsx
import { IntlayerProvider } from "solid-intlayer";

const App = () => (
  <IntlayerProvider>
    <MyComponent />
  </IntlayerProvider>
);
```

## الوصف

يقوم `IntlayerProvider` بالأدوار التالية:

1. **إدارة الحالة**: يقوم بتهيئة وتخزين الـ locale الحالي، باستخدام signals من أجل التفاعلية.
2. **تحديد الـ locale**: يحدد الـ locale الابتدائي بناءً على الكوكيز، تفضيلات المتصفح، أو الإعداد الافتراضي.
3. **حقن السياق**: يجعل الـ locale والدالة `setLocale` متاحة لأي مكوّن عبر هوكس مثل `useIntlayer` أو `useLocale`.
4. **الاحتفاظ بالتفضيل**: يقوم بمزامنة تغييرات الـ locale تلقائيًا مع الكوكيز أو التخزين المحلي للحفاظ على تفضيل المستخدم عبر الجلسات.

## الخصائص

- **locale** (اختياري): تعيين الـ locale الحالي يدويًا.
- **defaultLocale** (اختياري): تجاوز اللغة الافتراضية في التكوين.
- **setLocale** (اختياري): توفير دالة مخصصة لتعيين اللغة.
- **disableEditor** (اختياري): تعطيل تكامل المحرر المرئي.
- **isCookieEnabled** (اختياري): تمكين أو تعطيل حفظ التفضيل في ملفات تعريف الارتباط.
