---
createdAt: 2026-09-13
updatedAt: 2026-09-22
title: "Lingui مقابل Intlayer: اختبار الأداء والمقارنة لعام 2026"
description: "مقارنة بين مكتبتي تدويل (i18n) تعتمدان على المترجم تم قياسهما على Next.js وTanStack Start. حجم الحزمة، تسرب المحتوى، حجم المكونات، الترطيب، سرعة تبديل اللغة وتجربة المطور."
keywords:
  - Lingui
  - Intlayer
  - Internationalization
  - i18n
  - Benchmark
  - Bundle size
  - Compiler
  - Blog
  - Next.js
  - TanStack Start
  - JavaScript
  - React
slugs:
  - blog
  - lingui-vs-intlayer
author: aymericzip
---

# Lingui مقابل Intlayer | مقارنة أداء التدويل (i18n) في React وNext.js

![JavaScript i18n library ecosystem](https://github.com/aymericzip/intlayer/blob/main/docs/assets/cloud_i18n_logo.webp?raw=true)

تعد Lingui وIntlayer المكتبتين الوحيدتين في هذا الاختبار اللتين تعتمدان على **مترجم (Compiler)** بدلاً من بيئة تشغيل بحتة (Pure Runtime). تستخرج Lingui الرسائل من وحدات الماكرو في وقت البناء وتقوم بتجميع الكتالوجات لكل لغة. بينما يقوم Intlayer بتجميع القواميس لكل مكون مع تقليم الشجرة (Tree-shaking) لكل لغة. نظرياً، يجب أن تكون النتائج متقاربة، لكن الأرقام توضح أين يختلفان.

البيانات مأخوذة من [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom)، وهي مجموعة اختبارات مفتوحة المصدر تبني التطبيق نفسه مع كل مكتبة وتسجل ما يقوم المتصفح بتنزيله وتنفيذه فعلياً.

<TOC/>

> **باختصار (tl;dr)**: Lingui هي الأقرب إلى Intlayer في حجم JavaScript الخام لكل صفحة: **115-120 كيلوبايت** مقابل **118.6 كيلوبايت** على TanStack Start بمجرد تهيئة التحميل الكسول (Lazy loading)، و**148.6 كيلوبايت** مقابل **141.3 كيلوبايت** على Next.js. لكن الفجوة تتسع في جوانب أخرى: مكون Lingui مجمع بمعزل يزن **58-153 كيلوبايت** مقابل **6-8 كيلوبايت** لـ Intlayer، ويستغرق الترطيب (Hydration) مدة **28-34 مللي ثانية** مقابل **11-14 مللي ثانية**، كما يتسرب من لغة المصدر الاحتياطية **3-15%** من نصوص `en` إلى صفحات `fr` في جميع التهيئات المحسنة. والوصول إلى هذه التهيئة المحسنة يعني استخراج الكتالوجات وتجميعها واختيارها يدوياً لكل مسار، بينما يحقق Intlayer ذلك دون أي إعدادات إضافية.

## نظرة عامة

- **Lingui** - يعتمد على وحدات الماكرو (`` t`...` ``, `<Trans>`, `msg`)، ومعيار ICU MessageFormat، وكتالوجات `.po` / JSON، وسير عمل `lingui extract` + `lingui compile`. يقوم بتجميع معرفات الرسائل إلى تجزئات قصيرة (hashes)، ويدعم التحميل الديناميكي للكتالوجات لكل لغة. مشروع راسخ، ومستقل عن أطر العمل، وله توافقية ممتازة مع أدوات المترجمين حول ملفات `.po`.
- **Intlayer** - نموذج محتوى يتمحور حول المكونات. توضع قواميس `.content.ts` بجانب المكون الذي تخدمه، ويقوم مترجم وقت البناء بتقليم الشجرة والتحميل الكسول لكل مكون ولكل لغة، مع توليد أنواع TypeScript صارمة تلقائياً من محتواك، وفشل البناء عند فقدان أي ترجمات. يتضمن برمجيات وسيطة، ومساعدات SEO، ومحرراً مرئياً / CMS، وترجمة مدعومة بالذكاء الاصطناعي.

| المكتبة               | نجوم GitHub                                                                                                                                                                    | إجمالي التعديلات (Commits)                                                                                                                                                         | آخر تعديل                                                                                                                                           | الإصدار الأول | إصدار NPM                                                                                                           | تنزيلات NPM                                                                                                                    |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- | ------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `aymericzip/intlayer` | [![GitHub Repo stars](https://img.shields.io/github/stars/aymericzip/intlayer?style=for-the-badge&label=%E2%AD%90%20stars)](https://github.com/aymericzip/intlayer/stargazers) | [![GitHub commit activity](https://img.shields.io/github/commit-activity/t/aymericzip/intlayer?style=for-the-badge&label=commits)](https://github.com/aymericzip/intlayer/commits) | [![Last Commit](https://img.shields.io/github/last-commit/aymericzip/intlayer?style=for-the-badge)](https://github.com/aymericzip/intlayer/commits) | أبريل 2024    | [![npm](https://img.shields.io/npm/v/intlayer?style=for-the-badge)](https://www.npmjs.com/package/intlayer)         | [![npm downloads](https://img.shields.io/npm/dm/intlayer?style=for-the-badge)](https://www.npmjs.com/package/intlayer)         |
| `lingui/js-lingui`    | [![GitHub Repo stars](https://img.shields.io/github/stars/lingui/js-lingui?style=for-the-badge&label=%E2%AD%90%20stars)](https://github.com/lingui/js-lingui/stargazers)       | [![GitHub commit activity](https://img.shields.io/github/commit-activity/t/lingui/js-lingui?style=for-the-badge&label=commits)](https://github.com/lingui/js-lingui/commits)       | [![Last Commit](https://img.shields.io/github/last-commit/lingui/js-lingui?style=for-the-badge)](https://github.com/lingui/js-lingui/commits)       | ديسمبر 2016   | [![npm](https://img.shields.io/npm/v/@lingui/core?style=for-the-badge)](https://www.npmjs.com/package/@lingui/core) | [![npm downloads](https://img.shields.io/npm/dm/@lingui/core?style=for-the-badge)](https://www.npmjs.com/package/@lingui/core) |

> يتم تحديث الشارات تلقائياً. تختلف اللقطات بمرور الوقت.

## مقارنة الميزات وجهاً لوجه

| الميزة                                                 | Intlayer (`react-intlayer` / `next-intlayer`)                             | Lingui (`@lingui/core` / `@lingui/react`)                                            |
| ------------------------------------------------------ | ------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| **الترجمات بجانب المكونات**                            | ✅ نعم، ملف `.content.ts` موجود بجوار كل مكون                             | ⚠️ نصوص المصدر مضمنة داخل JSX عبر الماكرو؛ الترجمات في كتالوجات `.po` مركزية         |
| **التكامل مع TypeScript**                              | ✅ أنواع صارمة يتم إنشاؤها تلقائياً من المحتوى                            | ⚠️ وحدات الماكرو ذات أنواع محددة؛ لكن معرفات الرسائل والترجمات المفقودة لا يتم كشفها |
| **اكتشاف الترجمات المفقودة**                           | ✅ خطأ TypeScript + خطأ/تحذير في وقت البناء                               | ⚠️ يعرض `lingui extract` إحصائيات؛ بينما تعود بيئة التشغيل إلى نص المصدر تلقائياً    |
| **المحتوى الغني (JSX / Markdown / مكونات)**            | ✅ دعم مباشر                                                              | ✅ `<Trans>` مع مكونات متداخلة                                                       |
| **دعم معيار ICU**                                      | ⚠️ قيد التطوير                                                            | ✅ نعم (وحدات ماكرو `plural` و`select` و`selectOrdinal`)                             |
| **التنسيق (التواريخ، الأرقام، العملات)**               | ✅ `useNumber` و`useDate` وغيرها (تعتمد على Intl داخلياً)                 | ✅ `i18n.date()` و`i18n.number()`                                                    |
| **التوجيه المترجم والبرمجيات الوسيطة**                 | ✅ وكيل وبرمجية وسيطة مدمجة، دالة `getMultilingualUrls`                   | ❌ ليست جزءاً من النواة                                                              |
| **مساعدات تحسين محركات البحث SEO**                     | ✅ مساعدات مدمجة (hreflang وsitemap وrobots)                              | ❌ يدوية                                                                             |
| **مكونات الخادم المتزامنة (Server Components)**        | ✅ دالة `useIntlayer` من `next-intlayer/server` تعمل في أي مكون خادم فرعي | ⚠️ تحتاج إلى كائن `I18n` لكل طلب، يتم تمريره لأسفل أو تعيينه عبر `setI18n`           |
| **تقليم الشجرة Tree-shaking (إرسال المحتوى المستخدم)** | ✅ لكل مكون، ولكل لغة، وبشكل تلقائي بواسطة المترجم                        | ⚠️ لكل لغة عبر `lingui compile`؛ وتتطلب تقسيماً يدوياً لكل مسار                      |
| **التحميل الكسول (Lazy loading)**                      | ✅ `importMode: 'dynamic'` (سطر إعداد واحد)                               | ⚠️ استخدام `import()` يدوي للكتالوجات المجمعة + `i18n.load()` / `i18n.activate()`    |
| **تنظيف المحتوى غير المستخدم**                         | ✅ يتم التخلص من القواميس غير المستخدمة أثناء البناء                      | ✅ أمر `lingui extract --clean` يزيل الرسائل المهملة                                 |
| **اختبار الترجمات المفقودة (CLI / CI)**                | ✅ `npx intlayer content test`                                            | ⚠️ إحصائيات `lingui extract` (لا يوجد رمز خروج بالخطأ افتراضياً)                     |
| **مسار البناء (Build pipeline)**                       | ✅ إضافة واحدة (`@intlayer/swc` / `@intlayer/babel` / `vite-intlayer`)    | ⚠️ إضافة ماكرو (Babel أو SWC) + خطوات `extract` + `compile`                          |
| **ترجمة مدعومة بالذكاء الاصطناعي**                     | ✅ مدمجة وتستخدم مفاتيح الموفر الخاصة بك                                  | ❌ لا يوجد                                                                           |
| **محرر مرئي / CMS**                                    | ✅ محرر مرئي مجاني + نظام إدارة محتوى (CMS) اختياري                       | ❌ لا يوجد (ملفات `.po` تعمل مع أنظمة TMS خارجية)                                    |
| **خادم MCP ومهارات الوكلاء (Agent Skills)**            | ✅ نعم                                                                    | ❌ لا يوجد                                                                           |
| **النظام البيئي والمجتمع**                             | ⚠️ أصغر لكنه ينمو بسرعة                                                   | ✅ راسخ ومستقل عن أطر العمل                                                          |

## الاختبار

### ما تم قياسه

تبني مجموعة [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom) **التطبيق نفسه** باستخدام كل مكتبة: **10 صفحات** (الرئيسية، من نحن، المدونة، الوظائف، اتصل بنا، الأسئلة الشائعة، الأسعار، المنتجات، الإعدادات، الفريق)، و**10 لغات** (`en`، `fr`، `es`، `de`، `it`، `pt`، `zh`، `ja`، `ko`، `ru`)، مع مكونات متطابقة ومحتوى متطابق. يتم قياس الصفحات باللغتين `en` و`fr`. يتم تنفيذ كل مكتبة في ما يصل إلى أربع **استراتيجيات تحميل**، بدءاً من التهيئة البسيطة وحتى التهيئة المثلى:

| الاستراتيجية       | الوصف                                                                               | من يستخدمها                                      |
| ------------------ | ----------------------------------------------------------------------------------- | ------------------------------------------------ |
| **static**         | يتم استيراد الكتالوج المجمع لكل لغة وتحميله مسبقاً بالكامل                          | النماذج الأولية السريعة، الأكواد المولدة بالذكاء |
| **dynamic**        | يتم استيراد كتالوج اللغة النشطة فقط عبر `import()`، ولكنه يحتوي على جميع الصفحات    | معظم المشاريع                                    |
| **scoped-static**  | كتالوج واحد لكل مسار، يتم تجميعها جميعاً مسبقاً                                     | نادرة الاستخدام                                  |
| **scoped-dynamic** | كتالوج واحد لكل مسار + تحميل كسول عبر `import()`. فقط الصفحة الحالية واللغة الحالية | التطبيقات ذات ميزانية الأداء الصارمة             |

لا يحتوي Intlayer على متغير "مخصص النطاق" (scoped): يقوم المترجم بتحديد نطاق المحتوى **لكل مكون** تلقائياً، وبالتالي فإن صفي `static` و`dynamic` محصوران بالفعل بطبيعتهما.

لكل بناء، تسجل المجموعة:

- **حجم المكتبة (Lib size)**: حجم gzip لمكون فارغ يستورد مكتبة i18n فقط. وهي التكلفة الثابتة لبيئة التشغيل.
- **حجم JS للصفحة (Page JS)**: متوسط حجم JavaScript بتنسيق gzip الذي تم تنزيله لكل صفحة عبر جميع الصفحات واللغات.
- **نسبة تسرب اللغة (Locale leak %)**: نسبة السلاسل المترجمة الموجودة في ملف JS والتي تنتمي إلى لغة **لا** يعرضها المستخدم (تمت المقارنة على `en` و`fr`، لذا فإن 50% تعني "اللغة الأخرى موجودة بالكامل"؛ ومع وجود 10 لغات مجمعة، يكون الهدر الفعلي أكبر بكثير).
- **نسبة تسرب الصفحة (Page leak %)**: نسبة السلاسل المترجمة الموجودة في ملف JS والتي تنتمي إلى صفحة **لا** يتصفحها المستخدم.
- **متوسط حجم المكون (Component avg)**: متوسط حجم gzip لكل مكون تم تجميعه بمعزل. يوضح حجم بيئة التشغيل والكتالوج الذي يجلبه مكون واحد.
- **تفاعلية E2E**: الوقت المنقضي بين اختيار لغة جديدة وتحديث `html[lang]` في الـ DOM (اختبار Playwright، 5 تكرارات).
- **الترطيب (Hydration)**: مدة مرحلة ترطيب React.

> الأرقام أدناه مأخوذة من اختبار بتاريخ **2026-09-12** باستخدام `@lingui/react` 6.6.0 و`intlayer` 9.5.1. تطبيق الاختبار صغير عن قصد (بضع عشرات من النصوص لكل لغة)، لذا تصف نسب التسرب **نمطاً سلوكياً**: حيث تزداد مع نمو المحتوى بينما تظل تكلفة بيئة التشغيل ثابتة.

### النتائج على Next.js

اختر المقاييس والمكتبات التي تهمك:

<I18nBenchmark framework="nextjs" vertical/>

| المكتبة              | الاستراتيجية   | حجم المكتبة (gz) | متوسط JS للصفحة (gz) | تسرب اللغة | تسرب الصفحة | متوسط المكون (gz) | تفاعلية E2E | الترطيب |
| -------------------- | -------------- | ---------------: | -------------------: | ---------: | ----------: | ----------------: | ----------: | ------: |
| **base** (بدون i18n) | -              |           0.0 KB |             141.0 KB |       0.0% |        0.0% |            0.9 KB |     13.4 ms | 11.8 ms |
| Lingui               | static         |          11.9 KB |             207.4 KB |      50.0% |       90.0% |           73.3 KB |     15.3 ms | 15.2 ms |
| Lingui               | dynamic        |          11.9 KB |             145.4 KB |       2.8% |       89.9% |           19.9 KB |     15.7 ms | 12.7 ms |
| Lingui               | scoped-static  |          11.9 KB |             148.2 KB |       2.7% |       89.1% |           20.4 KB |     15.1 ms | 13.1 ms |
| Lingui               | scoped-dynamic |          11.9 KB |             148.6 KB |      14.8% |        0.0% |          152.6 KB |     16.1 ms | 14.8 ms |
| **`next-intlayer`**  | static         |       **5.5 KB** |         **141.3 KB** |   **0.0%** |    **0.0%** |        **8.5 KB** | **15.5 ms** | 16.9 ms |
| **`next-intlayer`**  | dynamic        |       **5.5 KB** |         **141.3 KB** |   **0.0%** |    **0.0%** |        **6.9 KB** | **15.3 ms** | 15.9 ms |

**كيف تقرأ هذه النتائج**

- **تكلفة بيئة التشغيل.** يكلف المكون الفارغ 11.9 كيلوبايت مع Lingui، مقابل 5.5 كيلوبايت مع Intlayer. وفي الصفحة الكاملة، تزيد أفضل تهيئة لـ Lingui بمقدار **+7.3 كيلوبايت** عن Intlayer (148.6 مقابل 141.3 كيلوبايت)؛ بينما تزيد Intlayer بمقدار **+0.3 كيلوبايت** فقط عن التطبيق الأساسي الخالي من التدويل.
- **التهيئة البسيطة مكلفة للغاية.** يؤدي تحميل كل كتالوج مجمع مسبقاً إلى **207.4 كيلوبايت لكل صفحة**، أي زيادة قدرها +66 كيلوبايت عن التطبيق الأساسي. نصف النصوص تعود للغة الخاطئة، و90% منها تعود لصفحات أخرى.
- **التحميل الديناميكي يحل مشكلة اللغة لا الصفحة.** مع وجود كتالوج واحد لكل لغة، يظل تسرب الصفحة عند ~90%: يتم إرسال كتالوج `fr` بأكمله في كل صفحة فرنسية. ويتطلب الوصول إلى تسرب 0% استخدام تهيئة `scoped-dynamic`: كتالوج منفصل لكل مسار، واستخراجه وتجميعه يدوياً لكل صفحة.
- **تسرب اللغة المصدرية.** حتى في التهيئات المحسنة، **تتسرب 3-15% من نصوص `en` داخل صفحات `fr`**. تحتفظ وحدات ماكرو Lingui بالرسالة المصدرية كخيار احتياطي، مما يجعلها تستقر في الحزمة بجوار الترجمة. بينما يقوم Intlayer بحل الخيارات الاحتياطية أثناء البناء ويرسل اللغة النشطة فقط.
- **تضخم حجم المكون في `scoped-dynamic`.** يبلغ متوسط حجم المكون المجمع بمعزل **152.6 كيلوبايت**، لأن كتالوج كل مسار يصبح قابلاً للوصول من المكون الذي يستورده. في المقابل يبلغ متوسط المكون نفسه مع `useIntlayer()` حوالي **6.9 كيلوبايت**.

<ClickToOpenIframe
src="https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-nextjs.md"
width="100%"
height="600px"
style="border:none;"
/>

> الجدول الكامل، لكل مكتبة واستراتيجية، في [تقرير قياس أداء Next.js](https://intlayer.org/ar/doc/benchmark/nextjs).

### النتائج على TanStack Start

| المكتبة                    | الاستراتيجية   | حجم المكتبة (gz) | متوسط JS للصفحة (gz) | تسرب اللغة | تسرب الصفحة | متوسط المكون (gz) | تفاعلية E2E | الترطيب |
| -------------------------- | -------------- | ---------------: | -------------------: | ---------: | ----------: | ----------------: | ----------: | ------: |
| **base** (بدون i18n)       | -              |           0.0 KB |             111.0 KB |       0.0% |        0.0% |            0.7 KB |      8.1 ms | 21.6 ms |
| Lingui                     | static         |          11.2 KB |             152.2 KB |      50.0% |       90.0% |           58.0 KB |      3.9 ms | 19.9 ms |
| Lingui                     | dynamic        |          11.2 KB |             115.2 KB |       9.3% |        0.0% |           85.5 KB |      5.9 ms | 28.0 ms |
| Lingui                     | scoped-static  |          11.2 KB |             120.8 KB |       4.0% |        0.0% |          147.9 KB |      7.1 ms | 33.9 ms |
| Lingui                     | scoped-dynamic |          11.2 KB |             120.2 KB |       8.6% |        0.0% |           83.7 KB |     42.1 ms | 32.9 ms |
| **`intlayer`**             | static         |       **5.0 KB** |         **125.8 KB** |      50.0% |    **0.0%** |        **8.1 KB** |  **3.2 ms** | 11.5 ms |
| **`intlayer`**             | dynamic        |       **5.0 KB** |         **118.6 KB** |   **0.0%** |    **0.0%** |        **6.3 KB** |  **3.6 ms** | 14.1 ms |
| `@intlayer/lingui` (توافق) | dynamic        |          10.3 KB |             137.0 KB |       9.9% |        0.0% |           12.8 KB |      2.9 ms | 19.7 ms |

**كيف تقرأ هذه النتائج**

- **في حجم JavaScript لكل صفحة، يتفوق Lingui بفارق ضئيل.** يصل Lingui بنمط `dynamic` إلى **115.2 كيلوبايت**، أي أقل بـ 3.4 كيلوبايت من Intlayer (118.6 كيلوبايت). كتالوجات Lingui المجمعة ذات المعرفات المجزأة مدمجة جداً، كما يقسم موجه TanStack Start المسارات بكفاءة كافية تجعل تسرب الصفحات 0% في نمط `dynamic`.
- **لكن جميع المعايير الأخرى تنقلب لصالح Intlayer.** يستغرق الترطيب **28-34 مللي ثانية** مع Lingui مقابل **11-14 مللي ثانية** مع Intlayer: حيث يتم تشغيل `i18n.load()` و`i18n.activate()` في المتصفح قبل أن يتمكن React من إتمام الترطيب. المكونات المجمعة بمعزل تزن **58-148 كيلوبايت** مقابل **6-8 كيلوبايت**. ولا يصل تسرب اللغة أبداً إلى 0% (يظل بين 4-9%) بسبب نصوص اللغة المصدرية.
- **تبديل اللغة بطيء في التهيئة المحسنة.** يستغرق `scoped-dynamic` في Lingui مدة **42 مللي ثانية** لتحديث `html[lang]`، حيث يجب جلب كتالوج المسار الجديد وتحميله وتنشيطه قبل أن يظهر التغيير. بينما يقوم Intlayer بالتبديل في **3-4 مللي ثانية** في كلا الوضعين.
- **يمتلك صف `static` في Intlayer نسبة تسرب 0% للصفحة تلقائياً** لأنه لا يتم تضمين سوى القواميس التي تستوردها مكونات الصفحة المعنية. سطر إعداد واحد (`importMode: 'dynamic'`) يزيل تسرب اللغة أيضاً.
- **مكتبة `@intlayer/lingui`** تحافظ على صياغة ماكرو Lingui وتخدمها من قواميس Intlayer، مما يوفر مكونات أصغر حجماً (12.8 كيلوبايت) وترطيباً أسرع بكثير من Lingui الأصلي. إنها خطوة انتقال ممتازة وليست الوجهة النهائية.

<ClickToOpenIframe
src="https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-tanstack.md"
width="100%"
height="600px"
style="border:none;"
/>

> الجدول الكامل في [تقرير قياس أداء TanStack Start](https://intlayer.org/ar/doc/benchmark/tanstack).

## لماذا هذا الفارق؟ مترجمان بوحدتي عمل مختلفتين

![The Intlayer compiler extracts content from components](https://github.com/aymericzip/intlayer/blob/main/docs/assets/compiler.webp?raw=true)

تعتمد كلتا المكتبتين على الترجمة البرمجية (Compilation)، لكن الفارق يكمن في **ما** تقومان بترجمته.

**يقوم Lingui بتجميع الكتالوجات.** يتم استخراج الماكرو في الكود المصدري إلى ملف `.po` لكل لغة، ثم تجميعه في وحدة JS لكل لغة. وحدة العمل هنا هي **اللغة**. ولتقسيمها بشكل أدق، حسب المسار أو المكون، يلزم إنشاء كتالوجات متعددة وتعديل `lingui.config.ts` والتحميل اليدوي لكل مسار. كائن `I18n` عام، وكل استدعاء لـ `useLingui()` يربط المكون به.

```bash
.
├── lingui.config.ts
└── src
    ├── i18n.ts                          # setupI18n(), load(), activate()
    ├── locales
    │   ├── en
    │   │   ├── messages.po
    │   │   └── messages.mjs             # مخرجات lingui compile
    │   └── fr
    │       ├── messages.po
    │       └── messages.mjs
    ├── components
    │   └── Counter.tsx                  # const { t } = useLingui(); t`Increment`
    └── routes
        └── $locale
            └── about.tsx                # await import(`../locales/${locale}/messages.mjs`)
```

**يقوم Intlayer بتجميع القواميس.** كل ملف `.content.ts` هو قاموس مرتبط بمفتاح محدد؛ يحدد المترجم المكونات التي تستورد كل مفتاح ويصدر، لكل قاموس ولكل لغة، كود JSON الذي يحتاجه هذا المكون فقط. وحدة العمل هنا هي **المكون**. وتحديد النطاق لكل مسار هو نتيجة طبيعية: تسحب الصفحة فقط قواميس المكونات التي تعرضها فعلياً.

```bash
.
├── intlayer.config.ts
└── src
    ├── components
    │   └── Counter
    │       ├── index.tsx                # useIntlayer("counter")
    │       └── index.content.ts
    └── routes
        └── $locale
            ├── about.tsx
            └── about.content.ts
```

لذلك فإن نمط `scoped-dynamic` هو نتاج بناء تلقائي لـ Intlayer، ومشروع تهيئة يدوي معقد لـ Lingui. وتتسع الفجوة على محورين في وقت واحد، الصفحات واللغات:

![Theoretical content leakage by architecture](https://github.com/aymericzip/intlayer/blob/main/docs/assets/theorical_content_leakage.webp?raw=true)

> للحصول على أرقام صف `dynamic`، قم بضبط `dictionary.importMode: 'dynamic'` في ملف `intlayer.config.ts`. راجع [دليل تحسين الحزمة](https://intlayer.org/ar/doc/concept/bundle-optimization).

## تجربة المطور

### الإعداد

<Tabs defaultTab="intlayer" group="techno">
<Tab label="Lingui" value="lingui">

```ts fileName="lingui.config.ts"
import { defineConfig } from "@lingui/cli";

export default defineConfig({
  sourceLocale: "en",
  locales: ["en", "fr"],
  catalogs: [
    {
      path: "<rootDir>/src/locales/{locale}/messages",
      include: ["src"],
    },
  ],
});
```

```ts fileName="src/i18n.ts"
import { setupI18n } from "@lingui/core";

export const loadCatalog = async (locale: string) => {
  const { messages } = await import(`./locales/${locale}/messages.mjs`);
  const i18n = setupI18n();
  i18n.load(locale, messages);
  i18n.activate(locale);
  return i18n;
};
```

ثم إضافة `@lingui/babel-plugin-lingui-macro` (أو `@lingui/swc-plugin`) لأداة التحزيم، وتشغيل `lingui extract` بعد التعديل، و`lingui compile` قبل البناء، وتغليف الشجرة بـ `<I18nProvider i18n={i18n}>`.

</Tab>
<Tab label="Intlayer" value="intlayer">

```ts fileName="intlayer.config.ts"
import { type IntlayerConfig, Locales } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

أضف `intlayer()` في `vite.config.ts` (أو `withIntlayer()` في `next.config.ts`) وغلف التطبيق بـ `<IntlayerProvider>`. لا حاجة لأي خطوة استخراج أو تجميع: تُبنى القواميس تلقائياً أثناء عمل أداة التحزيم.

</Tab>
</Tabs>
### المكونات

<Tabs defaultTab="intlayer" group="techno">
<Tab label="Lingui" value="lingui">

```tsx fileName="src/components/Counter.tsx"
import { useState } from "react";
import { useLingui } from "@lingui/react/macro";
import { Trans } from "@lingui/react/macro";

export const Counter = () => {
  const { t, i18n } = useLingui();
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>{i18n.number(count)}</p>
      <button aria-label={t`Counter`} onClick={() => setCount((c) => c + 1)}>
        <Trans>Increment</Trans>
      </button>
    </div>
  );
};
```

يعيش النص الإنجليزي في المكون؛ ويعيش الفرنسي في `src/locales/fr/messages.po` تحت معرف مجزأ بعد تشغيل `lingui extract`. نسيان تشغيله أو نسيان `compile` يعيد النص بصمت إلى الإنجليزية.

</Tab>
<Tab label="Intlayer" value="intlayer">

```ts fileName="src/components/Counter/index.content.ts"
import { t, type Dictionary } from "intlayer";

const counterContent = {
  key: "counter",
  content: {
    label: t({ en: "Counter", fr: "Compteur" }),
    increment: t({ en: "Increment", fr: "Incrémenter" }),
  },
} satisfies Dictionary;

export default counterContent;
```

```tsx fileName="src/components/Counter/index.tsx"
import { useState } from "react";
import { useIntlayer } from "react-intlayer";
import { useNumber } from "react-intlayer/format";

export const Counter = () => {
  const { label, increment } = useIntlayer("counter");
  const number = useNumber();
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>{number(count)}</p>
      <button aria-label={label} onClick={() => setCount((c) => c + 1)}>
        {increment}
      </button>
    </div>
  );
};
```

توجد كلتا اللغتين في ملف واحد بجوار المكون. غياب ترجمة `fr` يسبب خطأ في البناء، والمفتاح الخاطئ يسبب خطأ في TypeScript.

</Tab>
</Tabs>
### خارج المكونات

البيانات الوصفية (Metadata)، والـ loaders، ودوال الخادم: أي مكان خارج شجرة React.

<Tabs defaultTab="intlayer" group="techno">
<Tab label="Lingui" value="lingui">

```ts fileName="src/routes/$locale/about.tsx"
import { setupI18n } from "@lingui/core";
import { msg } from "@lingui/core/macro";

const title = msg`About us`;

export const loader = async ({ params }: { params: { locale: string } }) => {
  const { messages } = await import(
    `../../locales/${params.locale}/messages.mjs`
  );
  const i18n = setupI18n({
    locale: params.locale,
    messages: { [params.locale]: messages },
  });

  return { title: i18n._(title) };
};
```

إنشاء كائن `I18n` جديد لكل استدعاء، وتحميل الكتالوج يدوياً، واستخدام `msg` + `i18n._()` بدلاً من `t`. كما تشير [ملاحظات الاختبار](https://github.com/intlayer-org/benchmark-bloom/blob/main/report/NOTE.md)، معرفة متى تستخدم `t` أو `` t` ` `` أو `i18n.t()` أو `msg` أو `<Trans>` "ليس بالأمر البديهي".

</Tab>
<Tab label="Intlayer" value="intlayer">

```ts fileName="src/routes/$locale/about.tsx"
import { getIntlayer } from "intlayer";

export const loader = async ({ params }: { params: { locale: string } }) => {
  const { title } = getIntlayer("about-metadata", params.locale);

  return { title };
};
```

</Tab>
</Tabs>

## الاحتفاظ بماكرو Lingui مع قواميس Intlayer

تعد حزمة `@intlayer/lingui` محولاً مباشراً لـ `@lingui/core` و`@lingui/react`. تواصل وحدات الماكرو التجميع كالمعتاد، بينما يتم توفير تنفيذ `i18n._()` من قواميس Intlayer، مع مزامنة ملفات `.po` للاحتفاظ بكتالوجاتك الحالية. تعمل خيارات وصيغ الجمع في ICU بالطريقة نفسها.

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import { lingui } from "@intlayer/lingui/plugin";

export default defineConfig({
  plugins: [lingui()],
});
```

احتفظ بـ `@lingui/babel-plugin-lingui-macro` أو `@lingui/swc-plugin` ليعمل قبل مترجم Intlayer. راجع [دليل التوافق مع Lingui](https://intlayer.org/ar/doc/compatibility/lingui).

## متى تختار أياً منهما؟

<AccordionGroup>
<Accordion header="اختر Lingui">

أنت تريد **ICU MessageFormat** مع وحدات الماكرو المكتوبة، ومترجموك يعملون على ملفات **`.po`** مع مسار TMS حالي، وتفضل السلاسل المصدرية مضمنة داخل JSX، وفريقك مرتاح في إدارة تدفق الاستخراج والترجمة وتقسيم الكتالوجات. وحجم JS لكل صفحة تنافسي للغاية بمجرد إعداد التحميل الكسول.

</Accordion>
<Accordion header="اختر Intlayer">

أنت تريد **محتوى بنطاق محدد على مستوى المكونات**، و**TypeScript صارماً**، و**أخطاء المفاتيح المفقودة وقت البناء**، و**tree-shaking وتحميلاً كسولاً دون جهد**، ومكونات خفيفة، وتفعيل hydration سريعاً، وتبديلاً فورياً للغة، وأدوات تحرير مدمجة ([المحرر المرئي](https://intlayer.org/ar/doc/concept/editor)، [نظام إدارة المحتوى CMS](https://intlayer.org/ar/doc/concept/cms)، [الترجمة بالذكاء الاصطناعي](https://intlayer.org/ar/doc/concept/auto-fill)، [خادم MCP](https://intlayer.org/ar/doc/mcp-server)). ملائم للغاية لقواعد الكود الكبيرة والمعيارية وأنظمة التصميم.

</Accordion>
<Accordion header="اختر @intlayer/lingui">

أنت تستخدم Lingui حالياً وتريد الانتقال إلى قواميس Intlayer تدريجياً دون المساس بوحدات الماكرو. تظل كتالوجات `.po` الخاصة بك المصدر الوحيد للحقيقة عبر [إضافة مزامنة PO](https://intlayer.org/ar/doc/compatibility/lingui). تم قياسه جنباً إلى جنب في [Lingui مقابل @intlayer/lingui](https://intlayer.org/ar/blog/lingui-vs-intlayer-lingui).

</Accordion>
</AccordionGroup>

## الأسئلة الشائعة

<FAQ>

<Question title="Lingui تقوم بالترجمة والتجميع أيضاً، فلماذا تختلف النتائج إلى هذا الحد؟">

لأن وحدة التجميع والترجمة تختلف تماماً. تجمع Lingui **كتالوجاً واحداً لكل لغة**: وكل ما هو دون ذلك (كتالوجات لكل مسار، التحميل الكسول، استبعاد النصوص الاحتياطية من الحزمة) يتطلب تكويناً يدوياً. بينما تجمع Intlayer **قاموساً واحداً لكل مكون**، مما يجعل تحديد نطاق المسار مخرجاً طبيعياً للبناء. لهذا السبب يزن مكون Lingui المترجم بشكل منفصل 58-153 كيلوبايت مقابل 6-8 كيلوبايت فقط في Intlayer.

</Question>

<Question title="لماذا لا يصل تسريب اللغات أبداً إلى 0% مع Lingui؟">

تحتفظ وحدات الماكرو بالرسالة المصدرية كخيار احتياطي (fallback) في وقت التشغيل، مما يؤدي إلى شحن السلسلة الإنجليزية جنباً إلى جنب مع ترجمتها. يسجل الاختبار **3-15% من سلاسل `en` داخل صفحات `fr`** في كل إعداد مُحسَّن. بينما تعالج Intlayer الخيارات الاحتياطية أثناء البناء ولا ترسل سوى اللغة النشطة فقط.

</Question>

<Question title="هل كود JavaScript لكل صفحة في Lingui تنافسي حقاً؟">

نعم، بل إنه يتفوق بفارق ضئيل على TanStack Start: 115.2 كيلوبايت في وضع `dynamic` مقابل 118.6 كيلوبايت لـ Intlayer. فالكتالوجات المجمعة ذات المعرفات المجزأة مدمجة وصغيرة. لكن التكلفة تظهر في جوانب أخرى: الـ Hydration يستغرق 28-34 مللي ثانية مقابل 11-14 مللي ثانية، وتبديل اللغة يستغرق **42 مللي ثانية** في إعداد `scoped-dynamic`.

</Question>

<Question title="هل يجب علي التخلي عن الماكرو للانتقال؟">

لا. يحافظ `@intlayer/lingui` على ترجمة `` t`...` `` و `<Trans>` و `msg` و `plural` و `select` و `selectOrdinal` كما كانت تماماً؛ فقط ما يحلله `i18n._()` هو ما يتغير. احتفظ بـ `@lingui/babel-plugin-lingui-macro` أو `@lingui/swc-plugin` في البناء. راجع [وثائق توافق Lingui](https://intlayer.org/ar/doc/compatibility/lingui).

</Question>

<Question title="ماذا عن خطوات الاستخراج والتجميع؟">

تظل موجودة لوحدات الماكرو، وتختفي تماماً لمحتوى Intlayer الخاص. يتم بناء قواميس `.content.ts` تلقائياً عند تشغيل أداة الحزم، دون الحاجة إلى تشغيل أوامر CLI منفصلة، ويوقف أمر [`intlayer test`](https://intlayer.org/ar/doc/concept/cli) خط أنابيب CI عند وجود أي مفتاح مفقود بدلاً من الرجوع الصامت إلى السلسلة المصدرية.

</Question>

</FAQ>

## مقارنات ذات صلة

نفس الاختبار المرجعي، مكتبات أخرى:

- [next-intl vs Intlayer](https://intlayer.org/ar/blog/next-intl-vs-intlayer)
- [i18next vs Intlayer](https://intlayer.org/ar/blog/i18next-vs-intlayer)
- [vue-i18n vs Intlayer benchmark](https://intlayer.org/ar/blog/vue-i18n-vs-intlayer-benchmark)
- [next-i18next vs next-intl vs Intlayer](https://intlayer.org/ar/blog/next-i18next-vs-next-intl-vs-intlayer)
- [react-i18next vs react-intl vs Intlayer](https://intlayer.org/ar/blog/react-i18next-vs-react-intl-vs-intlayer)

للمزيد من التفاصيل:

- [Lingui vs @intlayer/lingui](https://intlayer.org/ar/blog/lingui-vs-intlayer-lingui), المحول المقاس على نفس التطبيق
- [Compiler-driven vs declarative i18n](https://intlayer.org/ar/blog/compiler-vs-declarative-i18n)
- [Per-component vs centralized i18n](https://intlayer.org/ar/blog/per-component-vs-centralized-i18n)
- [ICU message format explained](https://intlayer.org/ar/blog/icu-message-format)

وثائق مرجعية:

- [تقرير قياس أداء Next.js](https://intlayer.org/ar/doc/benchmark/nextjs) و [تقرير قياس أداء TanStack Start](https://intlayer.org/ar/doc/benchmark/tanstack)
- [Compat adapter: Lingui](https://intlayer.org/ar/doc/compatibility/lingui)
- [تحسين الحزمة](https://intlayer.org/ar/doc/concept/bundle-optimization) و [مترجم Intlayer](https://intlayer.org/ar/doc/compiler)

## نجوم GitHub

تعد نجوم GitHub مؤشراً قوياً على شعبية المشروع وثقة المجتمع وأهميته على المدى الطويل. على الرغم من أنها ليست مقياساً مباشراً للجودة التقنية، إلا أنها تعكس عدد المطورين الذين يجدون المشروع مفيداً ويتابعون تطوره.

[![رسم بياني لتاريخ النجوم](https://api.star-history.com/chart?repos=lingui%2Fjs-lingui%2Caymericzip%2Fintlayer&type=date&legend=top-left)](https://star-history.com/#lingui/js-lingui&aymericzip/intlayer)

## الخاتمة

Lingui هي أقوى مكتبة تجمع بين بيئة التشغيل والمترجم في هذا الاختبار. تمنحها كتالوجاتها المجمعة والمجزأة حجماً صغيراً لـ JavaScript لكل صفحة يفصل بينه وبين Intlayer بضع كيلوبايت فقط، بل وتتفوق عليه قليلاً في TanStack Start. وإذا كان حجم البايتات لكل صفحة هو المعيار الوحيد، لكانت النتيجة تعادلاً.

لكن الأمر يتجاوز ذلك. يقف مترجم Lingui عند حدود اللغة؛ وكل ما دون ذلك (الكتالوجات لكل مسار، التحميل الكسول، منع تسرب لغة المصدر الاحتياطية) يتطلب تهيئة يدوية. ويظهر الاختبار ثمن هذا الحد: مكونات **أكبر بـ 10-20 ضعفاً**، وترطيب **أبطأ بـ 2-3 أضعاف**، و**تسرب للغة بنسبة 3-15%** لا يختفي أبداً، وتبديل لغة يستغرق **42 مللي ثانية** في التهيئة المحسنة. في المقابل يعمل مترجم Intlayer على مستوى المكون مباشرة، لتكون تلك الأرقام **6-8 كيلوبايت**، و**11-14 مللي ثانية**، و**0%**، و**3-4 مللي ثانية** بدون أي تهيئة يدوية.

جميع البيانات الأولية والتطبيقات وسيناريوهات الاختبار متوفرة في [مستودع Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom). يمكنك تشغيله بنفسك.

راجع وثيقة ['لماذا Intlayer؟'](https://intlayer.org/ar/doc/why) لمزيد من التفاصيل.
