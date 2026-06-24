---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: الترحيل من React Intl إلى Intlayer
description: تعرّف على كيفية ترحيل تطبيق React الخاص بك من react-intl إلى Intlayer باستخدام محول التوافق.
keywords:
  - react-intl
  - formatjs
  - intlayer
  - ترحيل
  - توافق
slugs:
  - doc
  - compatibility
  - react-intl
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "بدء السجل"
author: aymericzip
---

# الترحيل من React Intl إلى Intlayer

إذا كان تطبيق React الخاص بك يستخدم `react-intl` (FormatJS)، فإن الانتقال إلى Intlayer سهل جداً. تتعامل طبقة التوافق الخاصة بنا بسلاسة مع ICU MessageFormat وجميع مكونات `Formatted*` الموجودة.

## ما يجب فعله

ابدأ بتشغيل أمر التهيئة في مشروعك:

```bash
npx intlayer init
```

بعد ذلك، قم بإعداد مكوّن Intlayer Vite أو Next.js في التكوين الخاص بك. يقوم هذا المكوّن بحقن أسماء مستعارة في وقت البناء لإعادة توجيه واردات `react-intl` إلى `@intlayer/react-intl`.

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import reactIntlVitePlugin from "@intlayer/react-intl/plugin";

export default defineConfig({
  plugins: [react(), reactIntlVitePlugin()],
});
```

## كيف يعمل تحت الغطاء

يقوم مكوّن bundler بإنشاء اسم مستعار لـ `react-intl` إلى `@intlayer/react-intl`. بدلاً من تحليل ملفات JSON كبيرة يدويًا وتغليف تطبيقك في `IntlProvider`، يستخرج مكوّن Intlayer بشكل ثابت المفاتيح ويستخدم قواامس Intlayer في وقت التشغيل.

تحت الغطاء:

- **ICU MessageFormat:** يستخدم Intlayer محلل `resolveMessage(..., 'icu')` الذي يدعم بشكل كامل جمع ICU والتحديد وتنسيق التاريخ/الرقم والعلامات النصية الغنية بشكل أصلي.
- **استدعاءات الطرق و JSX:** يتم تحديد `intl.formatMessage({ id: 'a.b' })` و `<FormattedMessage id="a.b">` بواسطة مكوّنات مترجم Intlayer (`@intlayer/babel` / `@intlayer/swc`)، وتحويل المفاتيح المنقوطة المسطحة بحيث يحل القسم الأول بشكل صحيح إلى مفتاح قاموس Intlayer.
- **المحولات:** `<FormattedNumber>` و `<FormattedDate>` وما إلى ذلك، تنتقل إلى مصدر `core/formatters` الأصلي باستخدام `Intl`.
