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

<TechGrid>
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/compat/vue-i18n" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/compat/transloco" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/compat/react-intl" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/compat/svelte-i18n" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/compat/react-i18next" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/compat/polyglot" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/compat/nuxtjs-i18n" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/compat/ngx-translate" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/compat/next-translate" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/compat/next-intl" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/compat/next-i18next" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/compat/i18next" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/compat/lingui" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/compat/i18n-js" />
</TechGrid>
