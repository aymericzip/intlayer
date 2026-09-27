---
createdAt: 2026-06-13
updatedAt: 2026-09-27
priority: 7
title: "محوّلات التوافق من Intlayer لمكتبات i18n"
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

> لفهم أصل هذه المكتبات، اقرأ تاريخ i18n في JavaScript.

- [تاريخ i18n في JavaScript](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ar/history_of_i18n.md)

## محولات التوافق المتاحة

اختر مكتبتك الحالية أدناه لترى كيفية الترحيل بسلاسة:

- [Vue I18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/compat/vue-i18n.md)
- [React Intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/compat/react-intl.md)
- [Svelte I18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/compat/svelte-i18n.md)
- [React i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/compat/react-i18next.md)
- [NuxtJS I18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/compat/nuxtjs-i18n.md)
- [NGX Translate](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/compat/ngx-translate.md)
- [Next Intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/compat/next-intl.md)
- [Next i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/compat/next-i18next.md)
- [i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/compat/i18next.md)
- [Lingui](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/compat/lingui.md)
