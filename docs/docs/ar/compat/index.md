---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: محولات التوافق في Intlayer
description: ارحل حل i18n الحالي الخاص بك إلى Intlayer دون احتكاك باستخدام محولات التوافق.
keywords:
  - توافق
  - ترحيل
  - تدويل
  - i18n
  - Intlayer
slugs:
  - doc
  - compatibility
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "بدء السجل"
author: aymericzip
---

# محولات التوافق في Intlayer

قد يكون ترحيل تطبيق كبير إلى مكتبة تدويل جديدة أمراً محبطاً. لتيسير هذا الانتقال، توفر Intlayer **محولات توافق** لأكثر مكتبات i18n شهرة في النظام البيئي.

تعرّض حزم المحول **نفس واجهة برمجية عامة تماماً** مثل مكتبات i18n الحالية الخاصة بك، لكنها تفوّض جميع عمل الترجمة إلى Intlayer في وقت التشغيل.

## كيف يعمل

عند استخدام محول توافق، لا تحتاج إلى إعادة كتابة واردات التطبيق الخاص بك أو تغيير طريقة استخدام خطافات الترجمة والمكونات الخاصة بك. بدلاً من ذلك، تقوم مكوّنات bundler في Intlayer تلقائياً بإنشاء اسم مستعار للواردات الحالية الخاصة بك إلى حزم التوافق في Intlayer.

على سبيل المثال، يستبدل المطور `import { useTranslation } from 'react-i18next'` بـ `import { useTranslation } from '@intlayer/react-i18next'` (يتم ذلك تلقائياً عبر مكوّن bundler)، والتطبيق يستمر في العمل مع الترجمات التي يتم تقديمها الآن من قواميس Intlayer. يتم أيضاً كتابة المفاتيح ضد قواميس Intlayer الخاصة بك!

## محولات التوافق المتاحة

اختر مكتبتك الحالية أدناه لترى كيفية الترحيل بسلاسة:

- [Vue I18n](./vue-i18n.md)
- [Transloco](./transloco.md)
- [React Intl](./react-intl.md)
- [Svelte I18n](./svelte-i18n.md)
- [React i18next](./react-i18next.md)
- [Polyglot.js](./polyglot.md)
- [NuxtJS I18n](./nuxtjs-i18n.md)
- [NGX Translate](./ngx-translate.md)
- [Next Translate](./next-translate.md)
- [Next Intl](./next-intl.md)
- [Next i18next](./next-i18next.md)
- [i18next](./i18next.md)
- [Lingui](./lingui.md)
- [I18n-js](./i18n-js.md)
