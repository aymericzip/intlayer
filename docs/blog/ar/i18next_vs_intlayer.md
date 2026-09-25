---
createdAt: 2026-09-13
updatedAt: 2026-09-22
title: "i18next مقابل Intlayer: اختبار الأداء والمقارنة الشاملة لعام 2026"
description: "قياس أداء react-i18next و next-i18next ومقارنتهما مع Intlayer على Next.js و TanStack Start. حجم الحزمة (Bundle size)، تسرب المحتوى، سرعة الاستجابة عند تبديل اللغة، وتجربة المطور."
keywords:
  - i18next
  - react-i18next
  - next-i18next
  - Intlayer
  - تدويل
  - i18n
  - اختبار الأداء
  - حجم الحزمة
  - مدونة
  - Next.js
  - TanStack Start
  - JavaScript
  - React
slugs:
  - blog
  - i18next-vs-intlayer
author: aymericzip
---

# i18next مقابل Intlayer | اختبار أداء تدويل (i18n) تطبيقات React و Next.js

![i18next VS Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/assets/i18next-next-intl-intlayer.webp?raw=true)

يُعد `i18next` إطار عمل التدويل (i18n) الأكثر استخداما في بيئة عمل JavaScript. فمن خلال `react-i18next` و `next-i18next`، يدعم شريحة ضخمة من تطبيقات React و Next.js. في المقابل، يمثل Intlayer بديلا حديثا قائما على المترجم (Compiler) ونطاق المكونات (Component-scoped).

تقارن هذه المقالة بينهما بناء على قياسات واقعية بدلا من مجرد سرد الميزات. الأرقام مأخوذة من [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom)، وهي حزمة اختبارات مفتوحة المصدر تبني نفس التطبيق باستخدام كل مكتبة وتسجل ما يقوم المتصفح بتنزيله بالفعل.

<TOC/>

> **ملخص سريع (tl;dr)**: يُعد `i18next` أثقل بيئة تشغيل (runtime) في اختبار الأداء: يضيف **+77 كيلوبايت gzip لكل صفحة** في Next.js في الإعداد الأولي البسيط، و **+22 كيلوبايت** حتى بعد التحسين الكامل لنطاقات الأسماء والتحميل الكسول (Lazy-loading). بينما يضيف Intlayer ما مقداره **+0.3 كيلوبايت** فقط. جميع إعدادات `i18next` باستثناء الإعداد المعزول تماما (scoped) تقوم بإرسال **نحو 90% من نصوص الصفحات غير المعروضة**؛ بينما يرسل Intlayer نسبة **0%** بشكل افتراضي. استغرق تبديل اللغة مع خلفية محملة كسولا **123-185 مللي ثانية** مع `react-i18next` مقابل **3-4 مللي ثانية** مع Intlayer. محول التوافق `@intlayer/next-i18next` يحتفظ بنفس واجهة برمجة تطبيقات `i18next` وخفض الحجم إلى **150.7 كيلوبايت** لكل صفحة مقارنة بـ **218.5 كيلوبايت** للأصل.

## باختصار

- **i18next / react-i18next / next-i18next** - ناضج، غني بالإضافات، ومستقل عن أطر العمل. يوفر مساحات الأسماء (Namespaces)، مكتشفات اللغة، الخلفيات، دعم ICU عبر الإضافات، ومكون `<Trans>` للمحتوى المنسق. يتم تجميع المحتوى مركزيا في `locales/{lng}/{ns}.json`. إنه قوي للغاية، لكن كل تحسين (تقسيم مساحات الأسماء، التحميل لكل صفحة، أمان الأنواع) هو إعداد يقع عبء كتابته وصيانته عليك.
- **Intlayer** - نموذج محتوى يتمحور حول المكونات. توضع قواميس `.content.ts` بجوار المكون الذي تخدمه مباشرة، ويقوم المترجم في وقت البناء بتطبيق تقنية Tree-shaking والتحميل الكسول لكل مكون ولكل لغة، مع توليد أنواع TypeScript صارمة تلقائيا من محتواك، وفشل عملية البناء عند وجود ترجمات مفقودة. يوفر وسائط برمجية (middleware)، ومساعدات SEO، ومحررا مرئيا / CMS، وترجمة مدعومة بالذكاء الاصطناعي.

| المكتبة                 | نجوم GitHub                                                                                                                                                                        | إجمالي الالتزامات (Commits)                                                                                                                                                            | آخر التزام                                                                                                                                              | أول إصدار   | إصدار NPM                                                                                                             | تنزيلات NPM الشهرية                                                                                                              |
| ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- | --------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `aymericzip/intlayer`   | [![GitHub Repo stars](https://img.shields.io/github/stars/aymericzip/intlayer?style=for-the-badge&label=%E2%AD%90%20stars)](https://github.com/aymericzip/intlayer/stargazers)     | [![GitHub commit activity](https://img.shields.io/github/commit-activity/t/aymericzip/intlayer?style=for-the-badge&label=commits)](https://github.com/aymericzip/intlayer/commits)     | [![Last Commit](https://img.shields.io/github/last-commit/aymericzip/intlayer?style=for-the-badge)](https://github.com/aymericzip/intlayer/commits)     | أبريل 2024  | [![npm](https://img.shields.io/npm/v/intlayer?style=for-the-badge)](https://www.npmjs.com/package/intlayer)           | [![npm downloads](https://img.shields.io/npm/dm/intlayer?style=for-the-badge)](https://www.npmjs.com/package/intlayer)           |
| `i18next/i18next`       | [![GitHub Repo stars](https://img.shields.io/github/stars/i18next/i18next?style=for-the-badge&label=%E2%AD%90%20stars)](https://github.com/i18next/i18next/stargazers)             | [![GitHub commit activity](https://img.shields.io/github/commit-activity/t/i18next/i18next?style=for-the-badge&label=commits)](https://github.com/i18next/i18next/commits)             | [![Last Commit](https://img.shields.io/github/last-commit/i18next/i18next?style=for-the-badge)](https://github.com/i18next/i18next/commits)             | يناير 2012  | [![npm](https://img.shields.io/npm/v/i18next?style=for-the-badge)](https://www.npmjs.com/package/i18next)             | [![npm downloads](https://img.shields.io/npm/dm/i18next?style=for-the-badge)](https://www.npmjs.com/package/i18next)             |
| `i18next/react-i18next` | [![GitHub Repo stars](https://img.shields.io/github/stars/i18next/react-i18next?style=for-the-badge&label=%E2%AD%90%20stars)](https://github.com/i18next/react-i18next/stargazers) | [![GitHub commit activity](https://img.shields.io/github/commit-activity/t/i18next/react-i18next?style=for-the-badge&label=commits)](https://github.com/i18next/react-i18next/commits) | [![Last Commit](https://img.shields.io/github/last-commit/i18next/react-i18next?style=for-the-badge)](https://github.com/i18next/react-i18next/commits) | ديسمبر 2015 | [![npm](https://img.shields.io/npm/v/react-i18next?style=for-the-badge)](https://www.npmjs.com/package/react-i18next) | [![npm downloads](https://img.shields.io/npm/dm/react-i18next?style=for-the-badge)](https://www.npmjs.com/package/react-i18next) |
| `i18next/next-i18next`  | [![GitHub Repo stars](https://img.shields.io/github/stars/i18next/next-i18next?style=for-the-badge&label=%E2%AD%90%20stars)](https://github.com/i18next/next-i18next/stargazers)   | [![GitHub commit activity](https://img.shields.io/github/commit-activity/t/i18next/next-i18next?style=for-the-badge&label=commits)](https://github.com/i18next/next-i18next/commits)   | [![Last Commit](https://img.shields.io/github/last-commit/i18next/next-i18next?style=for-the-badge)](https://github.com/i18next/next-i18next/commits)   | نوفمبر 2018 | [![npm](https://img.shields.io/npm/v/next-i18next?style=for-the-badge)](https://www.npmjs.com/package/next-i18next)   | [![npm downloads](https://img.shields.io/npm/dm/next-i18next?style=for-the-badge)](https://www.npmjs.com/package/next-i18next)   |

> يتم تحديث الشارات تلقائيا. قد تختلف الأرقام بمرور الوقت.

## مقارنة الميزات جنبا إلى جنب

| الميزة                                          | Intlayer (`react-intlayer` / `next-intlayer`)                               | i18next (`react-i18next` / `next-i18next`)                                      |
| ----------------------------------------------- | --------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| **وضع الترجمات بجوار المكونات**                 | ✅ نعم، ملف `.content.ts` مجاور لكل مكون                                    | ❌ لا، تجميع مركزي في `locales/{lng}/{ns}.json`                                 |
| **التكامل مع TypeScript**                       | ✅ توليد تلقائي لأنواع صارمة استنادا إلى المحتوى                            | ⚠️ أساسي؛ تتطلب المفاتيح الصارمة توسيع `CustomTypeOptions` وتحديد الأنواع يدويا |
| **اكتشاف الترجمات المفقودة**                    | ✅ خطأ TypeScript + خطأ/تحذير أثناء البناء                                  | ⚠️ احتياطي وقت التشغيل (`saveMissing`، إرجاع المفتاح نفسه)                      |
| **المحتوى المنسق (JSX / Markdown / مكونات)**    | ✅ دعم مباشر أصيل                                                           | ⚠️ عبر مكون `<Trans>` مع عناصر نائبة مفهرسة                                     |
| **دعم صيغ ICU**                                 | ⚠️ قيد التطوير                                                              | ⚠️ عبر إضافة (`i18next-icu`)                                                    |
| **الجموع (Pluralization)**                      | ✅ أنماط معتمدة على التعداد (Enumeration)                                   | ✅ لواحق `_one` / `_other` (باستخدام Intl.PluralRules)                          |
| **التنسيق (التواريخ، الأرقام، العملات)**        | ✅ `useNumber`، `useDate`، إلخ (تعتمد على Intl داخليا)                      | ⚠️ منسقات الاستيفاء (Interpolation) أو استدعاء `Intl.*` يدويا                   |
| **التوجيه المترجم والوسائط البرمجية**           | ✅ وكيل ووسيط برمجي مدمج، مع دالة `getMultilingualUrls`                     | ⚠️ غير مدمج؛ يتطلب وسيطا برمجيا مخصصا أو حزما خارجية                            |
| **مساعدات SEO (hreflang، sitemap، robots)**     | ✅ مساعدات مدمجة وجاهزة                                                     | ❌ إعداد يدوي بالكامل                                                           |
| **مكونات الخادم المتزامنة (Server Components)** | ✅ تعمل `useIntlayer` من `next-intlayer/server` في أي مكون خادم فرعي مباشرة | ⚠️ استدعاء `getFixedT` في الصفحة ثم تمرير `t` عبر Props                         |
| **Tree-shaking (شحن المحتوى المستخدم فقط)**     | ✅ لكل مكون ولكل لغة تلقائيا بواسطة المترجم                                 | ⚠️ يدوي: مساحات أسماء + قائمة `ns` لكل صفحة + خلفية برمجية                      |
| **التحميل الكسول (Lazy loading)**               | ✅ `importMode: 'dynamic'` (سطر إعداد واحد)                                 | ✅ عبر إضافات الخلفيات البرمجية (`i18next-resources-to-backend` وغيرها)         |
| **تنظيف المحتوى غير المستخدم (Purge)**          | ✅ حذف القواميس المهملة تلقائيا أثناء البناء                                | ❌ غير مدعوم افتراضيا                                                           |
| **اختبار الترجمات المفقودة (CLI / CI)**         | ✅ `npx intlayer content test`                                              | ⚠️ عبر أداة `i18next-parser` أو أدوات خارجية                                    |
| **الترجمة بالذكاء الاصطناعي**                   | ✅ مدمجة، وتستخدم مفاتيح مزود الخدمة الخاصة بك                              | ❌ لا (Locize هي خدمة مدفوعة منفصلة)                                            |
| **محرر مرئي / CMS**                             | ✅ محرر مرئي مجاني + نظام إدارة محتوى (CMS) اختياري                         | ❌ لا (تتطلب Locize أو منصات خارجية)                                            |
| **خادم MCP ومهارات الوكلاء (Agent Skills)**     | ✅ متوفر                                                                    | ❌ غير متوفر                                                                    |
| **النظام البيئي والمجتمع**                      | ⚠️ أحدث ولكنه ينمو بسرعة فائقة                                              | ✅ الأكبر والأكثر نضجا وتجربة                                                   |

## اختبار الأداء (Benchmark)

### ما تم قياسه

تقوم حزمة [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom) ببناء **نفس التطبيق تماما** باستخدام كل مكتبة: **10 صفحات** (الرئيسية، عن الموقع، المدونة، الوظائف، التواصل، الأسئلة الشائعة، الأسعار، المنتجات، الإعدادات، الفريق)، **10 لغات** (`en`, `fr`, `es`, `de`, `it`, `pt`, `zh`, `ja`, `ko`, `ru`)، ومكونات ومحتوى متطابق تماما. يتم قياس الصفحات باللغتين الإنجليزية والفرنسية. تم اختبار كل مكتبة عبر أربع **استراتيجيات تحميل**:

| الاستراتيجية       | الوصف                                                                                 | من يستخدمها عادة                                 |
| ------------------ | ------------------------------------------------------------------------------------- | ------------------------------------------------ |
| **static**         | تجميع كل اللغات والصفحات معا في حزمة واحدة (تضمين `resources` مباشرة في `init()`)     | النماذج الأولية السريعة، الأكواد المولدة بالـ AI |
| **dynamic**        | تحميل اللغة النشطة فقط عبر خلفية برمجية، مع تحميل جميع مساحات الأسماء دفعة واحدة      | أغلب المشاريع العامة                             |
| **scoped-static**  | مساحة أسماء واحدة لكل مسار، مع تضمين الكل مسبقا في الحزمة                             | حالات نادرة                                      |
| **scoped-dynamic** | مساحة أسماء لكل مسار + تحميل كسول عبر خلفية برمجية. الصفحة الحالية واللغة الحالية فقط | التطبيقات ذات الميزانيات الصارمة في الأداء       |

لا يمتلك Intlayer خيارا باسم "scoped": لأن المترجم يحدد نطاق المحتوى **لكل مكون على حدة** تلقائيا، وبالتالي فإن سطري `static` و `dynamic` معزولان ومحسنان بالفعل.

تسجل حزمة الاختبارات لكل عملية بناء المقاييس التالية:

- **Lib size**: حجم gzip لمكون فارغ يستورد مكتبة التدويل فقط، وهو ما يمثل التكلفة الثابتة لبيئة التشغيل.
- **Page JS**: حجم JavaScript بصيغة gzip الذي يتم تنزيله لكل صفحة، كمتوسط عبر جميع الصفحات واللغات.
- **Locale leak %**: نسبة النصوص المترجمة في كود JS التي تنتمي إلى لغة **لا** يعرضها المستخدم حاليا.
- **Page leak %**: نسبة النصوص المترجمة في كود JS التي تنتمي إلى صفحة **لا** يتواجد فيها المستخدم.
- **Component avg**: متوسط حجم gzip لكل مكون عند تجميعه بشكل معزول.
- **E2E reactivity**: الوقت الفعلي المستغرق بين اختيار لغة جديدة وتحديث `html[lang]` في DOM (باستخدام Playwright عبر 5 تكرارات).
- **Hydration**: مدة مرحلة إماهة (Hydration) مكونات React.

> الأرقام الواردة أدناه تعود لتشغيل الاختبار بتاريخ **2026-09-12** باستخدام `next-i18next` 16.3.0، `react-i18next` 17.0.13، و `intlayer` 9.5.1. التطبيق التجريبي صغير عمدا، لذا فإن نسب التسرب تعبر عن **نمط هيكلي**: فهي تكبر طرديا مع تزايد المحتوى بينما تظل تكلفة بيئة التشغيل ثابتة.

### النتائج على Next.js (`next-i18next`)

اختر المقاييس والمكتبات التي تهمك:

<I18nBenchmark framework="nextjs" vertical/>

| المكتبة                           | الاستراتيجية   | حجم المكتبة (gz) | متوسط JS للصفحة (gz) | تسرب اللغات | تسرب الصفحات | متوسط حجم المكون (gz) | سرعة الاستجابة E2E | مدة الإماهة (Hydration) |
| --------------------------------- | -------------- | ---------------: | -------------------: | ----------: | -----------: | --------------------: | -----------------: | ----------------------: |
| **base** (بدون i18n)              | -              |           0.0 KB |             141.0 KB |        0.0% |         0.0% |                0.9 KB |            13.4 ms |                 11.8 ms |
| `next-i18next`                    | static         |          19.7 KB |             218.5 KB |        0.0% |        89.8% |               78.5 KB |            16.4 ms |                 15.6 ms |
| `next-i18next`                    | dynamic        |          19.7 KB |             169.5 KB |       50.0% |        89.8% |               26.1 KB |            15.4 ms |                 27.7 ms |
| `next-i18next`                    | scoped-static  |          19.7 KB |             220.1 KB |        0.0% |        89.8% |               78.9 KB |            16.4 ms |                 14.7 ms |
| `next-i18next`                    | scoped-dynamic |          19.7 KB |             163.4 KB |        0.0% |         0.0% |               27.1 KB |            15.9 ms |                 15.1 ms |
| **`next-intlayer`**               | static         |       **5.5 KB** |         **141.3 KB** |    **0.0%** |     **0.0%** |            **8.5 KB** |        **15.5 ms** |                 16.9 ms |
| **`next-intlayer`**               | dynamic        |       **5.5 KB** |         **141.3 KB** |    **0.0%** |     **0.0%** |            **6.9 KB** |        **15.3 ms** |                 15.9 ms |
| `@intlayer/next-i18next` (توافقي) | static         |           9.4 KB |             150.7 KB |        0.0% |         0.0% |                9.7 KB |            10.7 ms |                 11.3 ms |
| `@intlayer/next-i18next` (توافقي) | dynamic        |           9.4 KB |             150.7 KB |        0.0% |         0.0% |                9.7 KB |            11.9 ms |                 10.6 ms |

**قراءة النتائج وتحليلها**

- **تكلفة بيئة التشغيل**: يُعد نواة `i18next` مع `react-i18next` أثقل بيئة تشغيل تم قياسها: **19.7 كيلوبايت gzip** لمكون فارغ، مقارنة بـ 5.5 كيلوبايت لـ `next-intlayer`.
- **الإعداد البسيط عالي التكلفة**: تضمين `resources` مباشرة داخل `init()` يولد **218.5 كيلوبايت لكل صفحة**، أي زيادة قدرها +77.5 كيلوبايت مقارنة بالتطبيق الأساسي. حيث تحمل كل صفحة كل مساحات الأسماء بلا استثناء.
- **التحسين اليدوي عملية معقدة**: التحول إلى خلفية برمجية (`dynamic`) يوفر 49 كيلوبايت لكنه لا يزال يسرب **90% من نصوص الصفحات الأخرى**، ونصف النصوص المحملة تخص لغة أخرى. بينما يؤدي تقسيم مساحات الأسماء لكل مسار (`scoped-dynamic`) إلى إيقاف التسرب والوصول إلى **163.4 كيلوبايت**، لكنه يظل **أكبر بمقدار +22.4 كيلوبايت لكل صفحة** مقارنة بـ Intlayer الذي سجل 141.3 كيلوبايت دون الحاجة لأي إعدادات يدوية معقدة.
- **حجم المكون الفردي**: المكون الذي يستدعي `useTranslation()` يتراوح حجمه بين 26 و 79 كيلوبايت؛ بينما يبلغ حجم نفس المكون مع `useIntlayer()` ما يعادل 6.9 كيلوبايت فقط.
- **تباطؤ الإماهة**: يقفز زمن الإماهة إلى 27.7 مللي ثانية في إعداد `dynamic`، نظرا لأن نسخة i18next تبدأ العمل وتعالج طلبات الخلفية على العميل قبل أن يتمكن React من إتمام عملية الإماهة.

<ClickToOpenIframe
src="https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-nextjs.md"
width="100%"
height="600px"
style="border:none;"
/>

> الجدول الكامل، لكل مكتبة وكل استراتيجية، في [تقرير قياس الأداء لـ Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/benchmark/nextjs.md).

### النتائج على TanStack Start (`react-i18next`)

نفس التطبيق التجريبي على TanStack Start مع استخدام `react-i18next` الصافي لإبعاد التأثيرات الخاصة بـ Next.js.

| المكتبة              | الاستراتيجية   | حجم المكتبة (gz) | متوسط JS للصفحة (gz) | تسرب اللغات | تسرب الصفحات | متوسط حجم المكون (gz) | سرعة الاستجابة E2E | مدة الإماهة (Hydration) |
| -------------------- | -------------- | ---------------: | -------------------: | ----------: | -----------: | --------------------: | -----------------: | ----------------------: |
| **base** (بدون i18n) | -              |           0.0 KB |             111.0 KB |        0.0% |         0.0% |                0.7 KB |             8.1 ms |                 21.6 ms |
| `react-i18next`      | static         |          18.4 KB |             180.3 KB |       50.0% |        89.8% |               24.3 KB |            12.9 ms |                 85.1 ms |
| `react-i18next`      | dynamic        |          18.4 KB |             136.4 KB |       23.1% |        89.8% |               24.8 KB |           123.1 ms |                 32.9 ms |
| `react-i18next`      | scoped-static  |          18.4 KB |             184.2 KB |       50.7% |        89.8% |               25.3 KB |           185.1 ms |                 25.2 ms |
| `react-i18next`      | scoped-dynamic |          18.4 KB |             127.2 KB |        0.0% |         0.0% |               26.7 KB |            17.6 ms |                 11.3 ms |
| **`intlayer`**       | static         |       **5.0 KB** |         **125.8 KB** |       50.0% |     **0.0%** |            **8.1 KB** |         **3.2 ms** |                 11.5 ms |
| **`intlayer`**       | dynamic        |       **5.0 KB** |         **118.6 KB** |    **0.0%** |     **0.0%** |            **6.3 KB** |         **3.6 ms** |                 14.1 ms |

**قراءة النتائج وتحليلها**

- يشحن تطبيق `react-i18next` غير المحسن زيادة قدرها **+69 كيلوبايت لكل صفحة** مقارنة بالتطبيق الأساسي، وتستغرق الإماهة **85 مللي ثانية** (أربعة أضعاف الأساس) لأن شجرة الموارد الكاملة يتم فحصها وتسجيلها على العميل قبل العرض الأولي.
- **تأخر التحميل الكسول عند تبديل اللغة**: عند تحميل الموارد عند الطلب عبر خلفية برمجية، يتطلب تبديل اللغة رحلة شبكة كاملة قبل أن يتم تحديث `html[lang]`: **123 مللي ثانية** في `dynamic`، و **185 مللي ثانية** في `scoped-static`. في المقابل، يقوم Intlayer بتحديث شجرة DOM في غضون **3-4 مللي ثانية** في كلا الوضعين وبشكل فوري دون التعطل في انتظار استجابة الشبكة.
- التكوين عالي التحسين `scoped-dynamic` يصل إلى 0% تسرب عند 127.2 كيلوبايت، ولكنه لا يزال **أكبر بمقدار +8.6 كيلوبايت** مقارنة بـ Intlayer في وضع `dynamic`، وتطلب لتحقيق ذلك خريطة مسارات وخلفيات موارد وحدود Suspense خاصة.
- يسجل وضع `static` في Intlayer نسبة **0% تسرب للصفحات** افتراضيا لأن القواميس التي تستوردها مكونات الصفحة فقط هي التي تُحزم في الكود. وتفعيل `importMode: 'dynamic'` يزيل تسرب اللغات أيضا.
- **حجم المكونات**: 24-27 كيلوبايت مع `react-i18next` مقابل 6-8 كيلوبايت مع Intlayer. حيث يربط `useTranslation()` كل مكون بالنسخة العالمية لـ i18next.

<ClickToOpenIframe
src="https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-tanstack.md"
width="100%"
height="600px"
style="border:none;"
/>

> الجدول الكامل في [تقرير قياس الأداء لـ TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/benchmark/tanstack.md).

## ما سبب هذا الفارق؟ النسخة العالمية مقابل القواميس المترجمة

![Centralized catalogs versus per-component dictionaries](https://github.com/aymericzip/intlayer/blob/main/docs/assets/project_stucture_18n_vs_intlayer.png?raw=true)

صُمم `i18next` في عام 2012 كبيئة تشغيل (runtime): تحتفظ نسخة عالمية واحدة بمخزن الموارد، وتتولى الإضافات توسيعها، بينما تبحث دالة `t()` عن المفاتيح أثناء العرض. هذه البنية تمنحه مرونة واسعة ولكنها تفرض تكلفة باهظة في الحجم:

```bash
.
├── i18n.ts                      # createInstance().use(...).use(...).init({...})
└── src
    ├── locales
    │   ├── en
    │   │   ├── common.json
    │   │   ├── home.json
    │   │   └── about.json
    │   └── fr
    │       ├── common.json
    │       ├── home.json
    │       └── about.json
    ├── components
    │   └── Counter.tsx          # useTranslation("about") + t("counter.label")
    └── app
        └── [locale]
            └── about
                └── page.tsx     # يجب أن تعرف مسبقا أنها تحتاج ["common", "about"]
```

لا يمكن للنسخة العالمية التنبؤ بالمفاتيح التي سيطلبها المكون، لذا تضطر لتحميل جميع مساحات الأسماء التي تحددها لها. والتحسين يفرض عليك **أنت** تقسيم الملفات، و**أنت** تحديد مساحات الأسماء لكل صفحة، و**أنت** الحفاظ على دقة هذه القائمة كلما تم نقل المكونات.

التكلفة تتضخم على محورين في آن واحد، الصفحات واللغات:

![Theoretical content leakage by architecture](https://github.com/aymericzip/intlayer/blob/main/docs/assets/theorical_content_leakage.webp?raw=true)

وكما توضح [ملاحظات الاختبار](https://github.com/intlayer-org/benchmark-bloom/blob/main/report/NOTE.md): "الحفاظ على أمان الأنواع ومعرفة أي مساحة أسماء يجب تضمينها في كل صفحة يعد كابوسا حقيقيا".

يتخلص Intlayer من النسخة العالمية تماما. يُعلن المحتوى بجوار المكون مباشرة، ويقوم المترجم بحل مخطط الاعتماديات في وقت البناء:

```bash
.
├── intlayer.config.ts
└── src
    ├── components
    │   └── Counter
    │       ├── index.tsx        # useIntlayer("counter")
    │       └── index.content.ts
    └── app
        └── [locale]
            └── about
                ├── page.tsx
                └── page.content.ts
```

يتعرف `@intlayer/swc` / `@intlayer/babel` على المكون والقاموس الذي يستورده، فيحزم هذين فقط، وللغة النشطة فقط، ويتخلص من أي محتوى لا تتم الإشارة إليه. يصبح نمط "scoped-dynamic" نتاجا تلقائيا لعملية البناء بدلا من كونه عبئا تنظيميا يديره الفريق يدويا.

> للحصول على أرقام سطر `dynamic`، اضبط `dictionary.importMode: 'dynamic'` في `intlayer.config.ts`. راجع [دليل تحسين الحزمة](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/bundle_optimization.md).

## تجربة المطور (DX)

### الإعداد

<Tabs defaultTab="intlayer" group="techno">
<Tab label="next-i18next" value="i18next">

```ts fileName="src/app/i18n/server.ts"
import { createInstance } from "i18next";
import { initReactI18next } from "react-i18next/initReactI18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { defaultLocale } from "@/i18n.config";

const backend = resourcesToBackend(
  (locale: string, namespace: string) =>
    import(`../../locales/${locale}/${namespace}.json`)
);

export const initI18next = async (
  locale: string,
  namespaces: string[] = ["common"]
) => {
  const i18n = createInstance();
  await i18n
    .use(initReactI18next)
    .use(backend)
    .init({
      lng: locale,
      fallbackLng: defaultLocale,
      ns: namespaces,
      defaultNS: "common",
      interpolation: { escapeValue: false },
      react: { useSuspense: false },
    });
  return i18n;
};
```

بالإضافة إلى كتابة `I18nProvider` لجانب العميل يعيد بناء نفس النسخة، مع إعداد `generateStaticParams` وتحديد مصفوفة `namespaces` في كل صفحة.

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

```tsx fileName="src/app/[locale]/layout.tsx"
import { getHTMLTextDir } from "intlayer";
import { IntlayerClientProvider, type NextLayoutIntlayer } from "next-intlayer";

const LocaleLayout: NextLayoutIntlayer = async ({ children, params }) => {
  const { locale } = await params;

  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <body>
        <IntlayerClientProvider locale={locale}>
          {children}
        </IntlayerClientProvider>
      </body>
    </html>
  );
};

export default LocaleLayout;
```

</Tab>
</Tabs>

### مكون العميل

<Tabs defaultTab="intlayer" group="techno">
<Tab label="react-i18next" value="i18next">

```json fileName="src/locales/en/about.json"
{
  "counter": {
    "label": "Counter",
    "increment": "Increment"
  }
}
```

```tsx fileName="src/components/Counter.tsx"
"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";

export const Counter = () => {
  const { t, i18n } = useTranslation("about");
  const [count, setCount] = useState(0);
  const numberFormat = new Intl.NumberFormat(i18n.language);

  return (
    <div>
      <p>{numberFormat.format(count)}</p>
      <button
        aria-label={t("counter.label")}
        onClick={() => setCount((c) => c + 1)}
      >
        {t("counter.increment")}
      </button>
    </div>
  );
};
```

> الصفحة التي تعرض هذا المكون ملزمة بتحميل مساحة أسماء `about`، ودالة `t("counter.label")` تبقى نصا عاديا مجردا من أنواع التحقق ما لم تقم بتوسيع `CustomTypeOptions`.

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
"use client";

import { useState } from "react";
import { useIntlayer } from "next-intlayer";
import { useNumber } from "next-intlayer/format";

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

يتمتع كل من `label` و `increment` بأنواع TypeScript صارمة ودقيقة؛ أي خطأ كتابي يظهر فورا كخطأ برمجي، والترجمة المفقودة تتسبب في إيقاف عملية البناء وتنبيهك فوريا.

</Tab>
</Tabs>

### مكون الخادم المتزامن

<Tabs defaultTab="intlayer" group="techno">
<Tab label="next-i18next" value="i18next">

```tsx fileName="src/components/ServerCounter.tsx"
type ServerCounterProps = {
  t: (key: string) => string;
  locale: string;
  count: number;
};

export const ServerCounter = ({ t, locale, count }: ServerCounterProps) => (
  <div>
    <p>{new Intl.NumberFormat(locale).format(count)}</p>
    <button aria-label={t("counter.label")}>{t("counter.increment")}</button>
  </div>
);
```

يجب أن تستدعي الصفحة دالة `i18n.getFixedT(locale, "about")` وتقوم بتمرير `t` و `locale` عبر الخصائص (Props).

</Tab>
<Tab label="Intlayer" value="intlayer">

```tsx fileName="src/components/ServerCounter.tsx"
import { useIntlayer } from "next-intlayer/server";
import { useNumber } from "next-intlayer/server/format";

export const ServerCounter = ({ count }: { count: number }) => {
  const { label, increment } = useIntlayer("counter");
  const number = useNumber();

  return (
    <div>
      <p>{number(count)}</p>
      <button aria-label={label}>{increment}</button>
    </div>
  );
};
```

</Tab>
</Tabs>

## احتفظ بواجهة i18next، واحصل على أداء Intlayer العالي

لست بحاجة إلى إعادة كتابة مكوناتك للحصول على نتائج الأداء المذكورة أعلاه. محولات التوافق `@intlayer/i18next`، `@intlayer/react-i18next`، و `@intlayer/next-i18next` جاهزة للعمل كبديل فوري: `useTranslation`، `t()`، `<Trans>`، صيغ الجمع، ولواحق السياق تواصل العمل بسلاسة، بينما يقدم المترجم قواميس Intlayer المحسنة في الخلفية.

```ts fileName="next.config.ts"
import type { NextConfig } from "next";
import { createNextI18nPlugin } from "@intlayer/next-i18next/plugin";

const withIntlayer = createNextI18nPlugin();

const nextConfig: NextConfig = {};

export default withIntlayer(nextConfig);
```

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import { reactI18nextVitePlugin } from "@intlayer/react-i18next/plugin";

export default defineConfig({
  plugins: [reactI18nextVitePlugin()],
});
```

في اختبار الأداء، انخفض بناء التوافق لنفس تطبيق Next.js من **218.5 كيلوبايت إلى 150.7 كيلوبايت** لكل صفحة، ومن **78.5 كيلوبايت إلى 9.7 كيلوبايت** لكل مكون، ومن **~90% تسرب للصفحات إلى 0%**، مع تحسن وقت الإماهة من 15.6 مللي ثانية إلى 11.3 مللي ثانية، دون أي تعديل في كود المكونات. ويمكن لملفات `locales/{lng}/{ns}.json` الحالية أن تظل المصدر الرئيسي للبيانات عبر إضافة مزامنة JSON.

راجع أدلة الترحيل: [i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/migration_from_i18next_to_intlayer.md)، [react-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/migration_from_react-i18next_to_intlayer.md)، [next-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/migration_from_next-i18next_to_intlayer.md).

## متى تختار كل منهما؟

<AccordionGroup>
<Accordion header="اختر i18next">

إذا كنت بحاجة حتمية إلى نظامه البيئي من الإضافات (مكتشفات محددة، خلفيات خاصة، ICU، Locize)، أو تقوم بالتدويل خارج بيئة React أيضا (خدمات Node، جافاسكريبت نقية، أطر عمل أخرى)، أو كان فريقك يتقنه بالفعل، أو كانت منصة الترجمة تتطلب ملفات `locales/{lng}/{ns}.json`. ولكن خصص وقتا كافيا لإدارة مساحات الأسماء والخلفيات البرمجية ومطابقة المسارات إذا كان الأداء يهمك.

</Accordion>
<Accordion header="اختر Intlayer">

أنت تبحث عن **محتوى محدد بنطاق المكونات**، و**TypeScript صارم**، و**أخطاء المفاتيح المفقودة في وقت البناء**، و**Tree-shaking وتحميل كسول بدون عناء**، وتبديل فوري للغة، ومكونات خادم متزامنة، وأدوات تحرير مدمجة ([المحرر المرئي](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_visual_editor.md)، [نظام إدارة المحتوى CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_CMS.md)، [الترجمة بالذكاء الاصطناعي](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/autoFill.md)، [خادم MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/mcp_server.md)). مناسب بشكل خاص لقواعد الأكواد البرمجية النمطية الكبيرة وأنظمة التصميم.

</Accordion>
<Accordion header="اختر محولات @intlayer/*-i18next">

أنت تستخدم i18next بالفعل وتريد مكاسب الحزمة وسرعة الاستجابة دون إعادة كتابة مكوناتك. تظل ملفات `locales/{lng}/{ns}.json` الخاصة بك هي مصدر الحقيقة الأساسي. تم قياسها جنبًا إلى جنب في [i18next مقابل @intlayer/i18next](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ar/i18next_vs_intlayer-i18next.md).

</Accordion>
</AccordionGroup>

## الأسئلة الشائعة (FAQ)

<FAQ>

<Question title="لماذا تعد i18next أثقل بكثير مقارنة بالمكتبات الأخرى؟">

تم تصميمها كبيئة تشغيل لا تعتمد على إطار عمل معين: مثيل عام، وخط معالجة للمكونات الإضافية، ومخزن موارد، وحلال مفاتيح. يتم تجميع هذه المرونة بالكامل في كل حزمة. المكون الفارغ الذي يستورد المكتبة فقط يكلف **19.7 KB gzip** مع `next-i18next` مقابل **5.5 KB** مع `next-intlayer`، وتُدفع هذه التكلفة في كل صفحة بغض النظر عن حجم محتواك.

</Question>

<Question title="هل يحل التحميل الكسول عبر الواجهة الخلفية المشكلة؟">

إنه يحل مشكلة حجم البايتات، وليس زمن الانتقال. الانتقال إلى `i18next-resources-to-backend` يوفر ~49 كيلوبايت لكل صفحة ولكنه يضيف رحلة ذهاب وإياب عبر الشبكة عند تبديل اللغة: **123 مللي ثانية** في إعداد `dynamic` و **185 مللي ثانية** في `scoped-static`، مقابل **3-4 مللي ثانية** مع Intlayer. كما يقفز وقت الترطيب (Hydration) إلى 27.7 مللي ثانية لأن المثيل يقوم بحل واجهته الخلفية قبل أن تتمكن React من الترطيب.

</Question>

<Question title="هل يمكنني الوصول إلى 0% تسرب مع i18next؟">

نعم، باستخدام `scoped-dynamic`: مساحة اسم واحدة لكل مسار، وواجهة خلفية للموارد، وخريطة من الصفحة إلى مساحة الاسم تتم صيانتها يدويًا. يستقر الحجم عند 163.4 كيلوبايت لكل صفحة على Next.js، وهو ما يزال **+22 كيلوبايت** فوق 141.3 كيلوبايت لـ Intlayer التي لم تتطلب أي إعداد. انظر [تحسين الحزمة](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/bundle_optimization.md).

</Question>

<Question title="هل يجب علي إعادة كتابة مكوناتي للترحيل؟">

لا. تحتفظ `@intlayer/i18next` و `@intlayer/react-i18next` و `@intlayer/next-i18next` بـ `useTranslation` و `t()` و `<Trans>` و `{{interpolation}}` وصيغ الجمع `_one` / `_other` ولاحقات السياق و `returnObjects`. سطر إضافي واحد في `next.config.ts` أو `vite.config.ts`. خطوة بخطوة في [دليل الترحيل لـ next-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/migration_from_next-i18next_to_intlayer.md).

</Question>

<Question title="ماذا يحدث للمكونات الإضافية لـ i18next الخاصة بي؟">

يتم قبول الواجهات الخلفية وأدوات اكتشاف اللغة ولكنها تظل خاملة: لم يعد هناك شيء لتحميله أو اكتشافه في وقت التشغيل. يصبح اكتشاف اللغة إعداد التوجيه الخاص بـ Intlayer (بادئة URL، ملف تعريف الارتباط، الترويسة). إذا كان تطبيقك يجلب الترجمات من نظام إدارة محتوى (CMS) وقت الطلب، فاستخدم [Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_CMS.md) أو أوامر `intlayer pull` / `push` بدلاً من ذلك.

</Question>

</FAQ>

## مقارنات ذات صلة

نفس المعيار، مكتبات أخرى:

- [next-intl vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ar/next-intl_vs_intlayer.md)
- [Lingui vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ar/lingui_vs_intlayer.md)
- [vue-i18n vs Intlayer benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ar/vue-i18n_vs_intlayer_benchmark.md)
- [next-i18next vs next-intl vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ar/next-i18next_vs_next-intl_vs_intlayer.md)
- [react-i18next vs react-intl vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ar/react-i18next_vs_react-intl_vs_intlayer.md)

المزيد حول i18next:

- [i18next مقابل @intlayer/i18next](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ar/i18next_vs_intlayer-i18next.md)، المحولات مقاسة على نفس التطبيق
- [هل عفا عليه الزمن i18next؟](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ar/is_i18next_outdated.md)
- [استخدام Intlayer مع i18next](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ar/intlayer_with_i18next.md) و [مع react-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ar/intlayer_with_react-i18next.md)
- [كيفية تدويل تطبيق Next.js باستخدام next-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ar/i18n_using_next-i18next.md)

الوثائق المرجعية:

- [تقرير قياس الأداء لـ Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/benchmark/nextjs.md) و [تقرير قياس الأداء لـ TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/benchmark/tanstack.md)
- محولات التوافق: [i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/compat/i18next.md)، [react-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/compat/react-i18next.md)، [next-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/compat/next-i18next.md)
- أدلة الترحيل: [i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/migration_from_i18next_to_intlayer.md)، [react-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/migration_from_react-i18next_to_intlayer.md)، [next-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/migration_from_next-i18next_to_intlayer.md)
- [تحسين الحزمة](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/bundle_optimization.md) و [مترجم Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/compiler.md)
- [i18n لكل مكون مقابل المركزية](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ar/per-component_vs_centralized_i18n.md)
- [i18n المعتمدة على المترجم مقابل التصريحية](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ar/compiler_vs_declarative_i18n.md)

## نجوم GitHub

تعد نجوم GitHub مؤشرا بارزا على شعبية المشروع، وثقة المطورين به، واستمراريته على المدى الطويل. ورغم أنها لا تقيس الجودة التقنية وحدها، إلا أنها توضح اهتمام المجتمع ورغبته في الاعتماد عليه في الإنتاج.

[![مخطط تاريخ النجوم](https://api.star-history.com/chart?repos=i18next%2Fi18next%2Ci18next%2Freact-i18next%2Ci18next%2Fnext-i18next%2Caymericzip%2Fintlayer&type=date&legend=top-left)](https://star-history.com/#i18next/i18next&i18next/react-i18next&i18next/next-i18next&aymericzip/intlayer)

## الخاتمة

اكتسب `i18next` مكانته الريادية بفضل تشغيله في كل مكان، وتوفيره إضافات لكل استخدام، ودعمه المستمر لأكثر من عقد. ولكن اختبار الأداء يوضح تكلفة هذا التصميم القائم على وقت التشغيل. الإعداد الشائع يضيف **+70-77 كيلوبايت gzip لكل صفحة**، ويسرب **~90% من محتوى الصفحات الأخرى**، ويستغرق تبديل اللغة عبر التحميل الكسول **أكثر من 100 مللي ثانية**. والوصول إلى 0% تسرب ممكن لكنه يتطلب خلفيات ومساحات أسماء يدوية، ومع ذلك يظل **أكبر بمقدار +9-22 كيلوبايت** من Intlayer.

ينقل Intlayer هذا العبء بالكامل إلى المترجم. فالقواميس لكل مكون، والتحميل الكسول لكل لغة، وحذف النصوص المهملة هي نواتج بناء تلقائية وليست قيودا يدوية. على نفس التطبيق: **+0.3 كيلوبايت لكل صفحة**، **0% تسرب**، مكونات **أصغر بـ 3 إلى 10 مرات**، وتبديل لغة خلال **3-4 مللي ثانية**.

جميع البيانات الخام، والتطبيقات التجريبية، ونصوص الاختبار متاحة في [مستودع Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom). يمكنك تشغيلها والتحقق منها بنفسك.

راجع توثيق ['لماذا Intlayer؟'](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/interest_of_intlayer.md) لمزيد من التفاصيل.
