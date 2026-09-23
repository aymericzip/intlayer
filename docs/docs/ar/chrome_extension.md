---
createdAt: 2026-09-22
updatedAt: 2026-09-22
title: إضافة Chrome و Firefox، ماسح i18n و SEO
description: افحص إعداد i18n لأي موقع ويب باستخدام إضافة Chrome من Intlayer. اكتشف إطار العمل ومكتبة i18n واللغات وعلامات hreflang و SEO، وقم بإجراء تدقيق كامل لـ i18n SEO.
keywords:
  - إضافة Chrome
  - ماسح i18n
  - فاحص hreflang
  - سيو متعدد اللغات
  - Intlayer
  - التوطين
  - أدوات التطوير
slugs:
  - doc
  - chrome-extension
history:
  - version: 9.5.6
    date: 2026-09-22
    changes: "بدء السجل"
author: aymericzip
---

# إضافة Chrome و Firefox: ماسح i18n و SEO

## نظرة عامة

[**Intlayer i18n Scanner**](https://chromewebstore.google.com/detail/intlayer_i18n_scanner/pmlehcgmjmfimmjnembihbakhnheiabc) هي إضافة Chrome الرسمية لـ **Intlayer**. افتحها على أي موقع ويب لمعرفة كيفية تعامل الموقع مع التدويل: ما هو إطار العمل ومكتبة i18n المستخدمة، وما هي اللغات المدعومة، وما إذا كانت علامات SEO متعددة اللغات قد تم إعدادها بشكل صحيح.

تعمل الإضافة على جميع مواقع الويب، سواء كانت تستخدم Intlayer أم لا.

![إضافة Intlayer لـ Chrome](https://github.com/aymericzip/intlayer/blob/main/docs/assets/chrome_extension.png?raw=true)

[رابط إضافة Chrome](https://chromewebstore.google.com/detail/intlayer_i18n_scanner/pmlehcgmjmfimmjnembihbakhnheiabc)

[رابط إضافة Firefox](https://addons.mozilla.org/en-US/firefox/addon/intlayer-i18n-scanner/)

## الميزات

- **اكتشاف التقنيات**: تحديد إطار العمل (Next.js, Nuxt, Astro, SvelteKit, Angular, Vue.js, Qwik, React, Gatsby, WordPress) ومكتبة i18n (Intlayer, i18next, Vue I18n, @nuxtjs/i18n, Angular @angular/localize, next-intl / next-i18next, Weglot, Localize, WPML, Polylang). تُظهر كل عملية اكتشاف الأدلة التي أدت إليها، مثل متغير عام أو ملف تعريف ارتباط (cookie) أو علامة DOM.
- **اللغات (Locales)**: عرض قائمة اللغات الموجودة في سمة `lang`، وعلامات hreflang و `og:locale`، والبادئة اللغوية في عنوان URL، وملفات تعريف الارتباط أو مدخلات التخزين الخاصة باللغة.
- **علامات SEO i18n**: فحص `html lang` و `html dir`، والرابط الأساسي (canonical)، وعلامات hreflang، و `x-default`، و `og:locale`، ونسبة الروابط الداخلية المترجمة.
- **التنقل بين اللغات**: ينقل الصفحة الحالية بنقرة واحدة إلى أي من نسخها المترجمة، استنادًا إلى وسوم hreflang الخاصة بها.
- **البحث في خريطة الموقع**: يبحث في جميع الصفحات المدرجة في خريطة الموقع ويفتحها في علامة التبويب الحالية.
- **تدقيق كامل**: تشغيل نفس التدقيق المتاح في [i18n SEO Scanner](https://intlayer.org/i18n-seo-scanner) وعرض النتيجة بشكل مباشر.

## التثبيت

<Tabs group="browser">
  <Tab label="Chrome" value="chrome">

قم بتثبيت [**Intlayer i18n Scanner**](https://chromewebstore.google.com/detail/intlayer_i18n_scanner/pmlehcgmjmfimmjnembihbakhnheiabc) من سوق Chrome الإلكتروني، ثم قم بتثبيتها في شريط الأدوات الخاص بك.

تعمل الإضافة في متصفح Chrome وفي أي متصفح يعتمد على Chromium ويدعم إضافات سوق Chrome الإلكتروني (مثل Edge و Brave و Arc و Opera).

  </Tab>
  <Tab label="Firefox" value="firefox">

قم بتثبيت [**Intlayer i18n Scanner**](https://addons.mozilla.org/en-US/firefox/addon/intlayer-i18n-scanner/) من متجر إضافات Firefox، ثم قم بتثبيتها في شريط الأدوات الخاص بك.

  </Tab>
</Tabs>

## الاستخدام

### فحص صفحة

1. افتح موقع الويب الذي ترغب في فحصه.
2. انقر على أيقونة **Intlayer i18n Scanner** في شريط الأدوات.
3. تعرض النافذة المنبثقة أقسام **التقنيات المكتشفة** و **اللغات** و **علامات SEO i18n** للصفحة الحالية.

يعمل الاكتشاف محلياً في متصفحك، وعلى علامة التبويب الحالية فقط.

### التنقل بين اللغات

![التنقل في إضافة Intlayer لـ Chrome](https://github.com/aymericzip/intlayer/blob/main/docs/assets/chrome_extension_navigation.png?raw=true)

يعرض قسم **التنقل** **النسخ المترجمة** من الصفحة الحالية، المقروءة من وسوم hreflang الخاصة بها. انقر على لغة لفتح تلك النسخة في علامة التبويب الحالية.

في **صفحات خريطة الموقع**، اكتب للبحث في عناوين URL الموجودة في خريطة الموقع، ثم انقر على نتيجة لفتحها.

### تشغيل تدقيق كامل

![درجة تدقيق إضافة Intlayer لـ Chrome](https://github.com/aymericzip/intlayer/blob/main/docs/assets/chrome_extension_audit_score.png?raw=true)

قم بالتمرير إلى قسم **تدقيق كامل** وانقر على **تشغيل تدقيق i18n كامل**. تظهر النتائج تباعاً مع اكتمال كل فحص، مقسمة إلى:

- **الصفحة**: سمات `html lang` و `dir`، واللغة الحالية، وعلامات hreflang، و `x-default`، والرابط الأساسي، والروابط الداخلية المترجمة، ومحدد اللغة، وأيقونات الأعلام، ومحتوى اللغة غير المستخدم والمضمن في حزمة JavaScript.
- **Robots.txt**: وجود الملف، وما إذا كانت مسارات اللغات تظل قابلة للزحف بواسطة محركات البحث.
- **خريطة الموقع (Sitemap)**: وجود الملف، وسرد كل اللغات، والروابط البديلة و `x-default`.
- **النطاق**: عدد اللغات المكتشفة في الموقع بأكمله.

يتم تمييز كل فحص على أنه ناجح أو تحذير أو فاشل، وتلخص النتيجة الحالة العامة لـ i18n SEO للصفحة.

## الخصوصية والأذونات

تطلب الإضافة الحد الأدنى من الأذونات:

- **activeTab** و **scripting**: يعمل الكاشف فقط على علامة التبويب التي تشاهدها، وفقط عند فتح النافذة المنبثقة.
- **back.intlayer.org**: يُستخدم فقط عند تشغيل تدقيق كامل. يتم إرسال عنوان URL للصفحة الحالية إلى واجهة برمجة تطبيقات Intlayer لفحصه.

لا يتم جمع أي سجل تصفح ولا يعمل أي شيء في الخلفية.

## الأسئلة الشائعة

<FAQ>

<Question title="هل يحتاج موقع الويب إلى استخدام Intlayer؟">

لا. تفحص الإضافة أي موقع ويب، بغض النظر عن إطار العمل أو مكتبة i18n المستخدمة.

</Question>
<Question title="لماذا لم يتم اكتشاف تقنية معينة؟">

يعتمد الاكتشاف على ما تكشفه الصفحة في المتصفح: المتغيرات العامة، وملفات تعريف الارتباط، والعلامات الوصفية، وعلامات DOM. تقوم بعض إصدارات الإنتاج بإزالة هذه العلامات، وبالتالي قد تكون المكتبة قيد الاستخدام دون ترك أثر مرئي.

</Question>
<Question title="كيف يمكنني إصلاح المشكلات التي وجدها التدقيق؟">

ترتبط معظم عمليات الفحص بإعدادات التوجيه أو البيانات الوصفية. مع Intlayer، يتم إنشاء علامات hreflang، والرابط الأساسي، و `x-default`، والروابط المترجمة، وخريطة الموقع، و robots.txt تلقائياً من [ملف التكوين](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/configuration.md). راجع دليل التكامل لإطار العمل الخاص بك، مثل [Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_with_nextjs_16.md) أو [Nuxt](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_with_nuxt.md) أو [TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_with_tanstack.md).

</Question>

</FAQ>

## أدوات ذات صلة

- [ملحق VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/vs_code_extension.md)
- [خادم MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/mcp_server.md)
- [خادم LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/lsp.md)
