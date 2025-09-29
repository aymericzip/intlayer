---
createdAt: 2025-08-23
updatedAt: 2025-09-29
title: next-i18next مقابل next-intl مقابل Intlayer
description: مقارنة بين next-i18next و next-intl و Intlayer لتدويل تطبيق Next.js
keywords:
  - next-intl
  - next-i18next
  - Intlayer
  - التدويل
  - مدونة
  - Next.js
  - جافا سكريبت
  - React
slugs:
  - blog
  - next-i18next-vs-next-intl-vs-intlayer
---

# next-i18next مقابل next-intl مقابل intlayer | التدويل في Next.js (i18n)

لنلقي نظرة على أوجه التشابه والاختلاف بين ثلاثة خيارات للتدويل في Next.js: next-i18next، next-intl، و Intlayer.

هذا ليس درسًا كاملاً. إنها مقارنة لمساعدتك في الاختيار.

نركز على **موجه التطبيقات في Next.js 13+** (مع **مكونات خادم React**) ونقيم:

1. **البنية والتنظيم المحتوى**
2. **TypeScript والأمان**
3. **معالجة الترجمات المفقودة**
4. **التوجيه والوسيطات**
5. **الأداء وسلوك التحميل**
6. **تجربة المطور (DX)، الأدوات والصيانة**
7. **تحسين محركات البحث (SEO) وقابلية التوسع في المشاريع الكبيرة**

> **ملخص**: يمكن لجميع الثلاثة تعريب تطبيق Next.js. إذا كنت تريد **محتوى مخصص للمكونات**، **أنواع TypeScript صارمة**، **فحوصات المفاتيح المفقودة أثناء البناء**، **قواميس مُحسّنة بالتخلص من الشجر غير المستخدم**، و**موجه تطبيقات من الدرجة الأولى + مساعدات SEO**، فإن **Intlayer** هو الخيار الأكثر اكتمالًا وحداثة.

> من الالتباسات الشائعة بين المطورين هو الاعتقاد بأن `next-intl` هو نسخة Next.js من `react-intl`. هذا غير صحيح — فـ `next-intl` تتم صيانته بواسطة [Amann](https://github.com/amannn)، بينما `react-intl` تتم صيانته بواسطة [FormatJS](https://github.com/formatjs/formatjs).

---

## باختصار

- **next-intl** - تنسيق رسائل خفيف الوزن وبسيط مع دعم قوي لـ Next.js. الكتالوجات المركزية شائعة؛ تجربة المطور بسيطة، لكن الأمان والصيانة على نطاق واسع تبقى في الغالب مسؤوليتك.
- **next-i18next** - i18next في هيئة Next.js. نظام بيئي ناضج وميزات عبر الإضافات (مثل ICU)، لكن التهيئة قد تكون مطولة وتميل الكتالوجات إلى المركزية مع نمو المشاريع.
- **Intlayer** - نموذج محتوى يركز على المكونات لـ Next.js، **كتابة صارمة بـ TS**، **فحوصات وقت البناء**، **إزالة الشيفرة غير المستخدمة (tree-shaking)**، **وسائط مدمجة ومساعدات SEO**، محرر/نظام إدارة محتوى بصري اختياري، وترجمات بمساعدة الذكاء الاصطناعي.

---

| Library                | GitHub Stars                                                                                                                                                                     | Total Commits                                                                                                                                                                        | Last Commit                                                                                                                                           | First Version | NPM Version                                                                                                         | NPM Downloads                                                                                                                  |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- | ------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `aymericzip/intlayer`  | [![GitHub Repo stars](https://img.shields.io/github/stars/aymericzip/intlayer?style=for-the-badge&label=%E2%AD%90%20stars)](https://github.com/aymericzip/intlayer/stargazers)   | [![GitHub commit activity](https://img.shields.io/github/commit-activity/t/aymericzip/intlayer?style=for-the-badge&label=commits)](https://github.com/aymericzip/intlayer/commits)   | [![Last Commit](https://img.shields.io/github/last-commit/aymericzip/intlayer?style=for-the-badge)](https://github.com/aymericzip/intlayer/commits)   | April 2024    | [![npm](https://img.shields.io/npm/v/intlayer?style=for-the-badge)](https://www.npmjs.com/package/intlayer)         | [![npm downloads](https://img.shields.io/npm/dm/intlayer?style=for-the-badge)](https://www.npmjs.com/package/intlayer)         |
| `amannn/next-intl`     | [![GitHub Repo stars](https://img.shields.io/github/stars/amannn/next-intl?style=for-the-badge&label=%E2%AD%90%20stars)](https://github.com/amannn/next-intl/stargazers)         | [![GitHub commit activity](https://img.shields.io/github/commit-activity/t/amannn/next-intl?style=for-the-badge&label=commits)](https://github.com/amannn/next-intl/commits)         | [![Last Commit](https://img.shields.io/github/last-commit/amannn/next-intl?style=for-the-badge)](https://github.com/amannn/next-intl/commits)         | Nov 2020      | [![npm](https://img.shields.io/npm/v/next-intl?style=for-the-badge)](https://www.npmjs.com/package/next-intl)       | [![npm downloads](https://img.shields.io/npm/dm/next-intl?style=for-the-badge)](https://www.npmjs.com/package/next-intl)       |
| `i18next/i18next`      | [![GitHub Repo stars](https://img.shields.io/github/stars/i18next/i18next?style=for-the-badge&label=%E2%AD%90%20stars)](https://github.com/i18next/i18next/stargazers)           | [![GitHub commit activity](https://img.shields.io/github/commit-activity/t/i18next/i18next?style=for-the-badge&label=commits)](https://github.com/i18next/i18next/commits)           | [![Last Commit](https://img.shields.io/github/last-commit/i18next/i18next?style=for-the-badge)](https://github.com/i18next/i18next/commits)           | Jan 2012      | [![npm](https://img.shields.io/npm/v/i18next?style=for-the-badge)](https://www.npmjs.com/package/i18next)           | [![npm downloads](https://img.shields.io/npm/dm/i18next?style=for-the-badge)](https://www.npmjs.com/package/i18next)           |
| `i18next/next-i18next` | [![GitHub Repo stars](https://img.shields.io/github/stars/i18next/next-i18next?style=for-the-badge&label=%E2%AD%90%20stars)](https://github.com/i18next/next-i18next/stargazers) | [![GitHub commit activity](https://img.shields.io/github/commit-activity/t/i18next/next-i18next?style=for-the-badge&label=commits)](https://github.com/i18next/next-i18next/commits) | [![Last Commit](https://img.shields.io/github/last-commit/i18next/next-i18next?style=for-the-badge)](https://github.com/i18next/next-i18next/commits) | Nov 2018      | [![npm](https://img.shields.io/npm/v/next-i18next?style=for-the-badge)](https://www.npmjs.com/package/next-i18next) | [![npm downloads](https://img.shields.io/npm/dm/next-i18next?style=for-the-badge)](https://www.npmjs.com/package/next-i18next) |

> يتم تحديث الشارات تلقائيًا. ستختلف اللقطات مع مرور الوقت.

---

## مقارنة الميزات جنبًا إلى جنب (مركزة على Next.js)

| الميزة                                                       | `next-intlayer` (Intlayer)                                                                                                   | `next-intl`                                                                                    | `next-i18next`                                                                                 |
| ------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| **الترجمات بالقرب من المكونات**                              | ✅ نعم، المحتوى موضوع بجانب كل مكون                                                                                          | ❌ لا                                                                                          | ❌ لا                                                                                          |
| **تكامل TypeScript**                                         | ✅ متقدم، أنواع صارمة مولدة تلقائيًا                                                                                         | ✅ جيد                                                                                         | ⚠️ أساسي                                                                                       |
| **كشف الترجمات المفقودة**                                    | ✅ تمييز أخطاء TypeScript وتحذير/خطأ أثناء وقت البناء                                                                        | ⚠️ تراجع في وقت التشغيل                                                                        | ⚠️ تراجع في وقت التشغيل                                                                        |
| **المحتوى الغني (JSX/Markdown/المكونات)**                    | ✅ دعم مباشر                                                                                                                 | ❌ غير مصمم للعقد الغنية                                                                       | ⚠️ محدود                                                                                       |
| **الترجمة المدعومة بالذكاء الاصطناعي**                       | ✅ نعم، يدعم عدة مزودي ذكاء اصطناعي. يمكن استخدامه باستخدام مفاتيح API الخاصة بك. يأخذ في الاعتبار سياق تطبيقك ونطاق المحتوى | ❌ لا                                                                                          | ❌ لا                                                                                          |
| **المحرر المرئي**                                            | ✅ نعم، محرر مرئي محلي + نظام إدارة محتوى اختياري؛ يمكنه إخراج محتوى قاعدة الشيفرة؛ قابل للتضمين                             | ❌ لا / متوفر عبر منصات التوطين الخارجية                                                       | ❌ لا / متوفر عبر منصات التوطين الخارجية                                                       |
| **التوجيه المحلي**                                           | ✅ نعم، يدعم المسارات المحلية مباشرة (يعمل مع Next.js و Vite)                                                                | ✅ مدمج، يدعم App Router جزء `[locale]`                                                        | ✅ مدمج                                                                                        |
| **توليد المسارات الديناميكية**                               | ✅ نعم                                                                                                                       | ✅ نعم                                                                                         | ✅ نعم                                                                                         |
| **التعددية (جمع الكلمات)**                                   | ✅ أنماط قائمة على التعداد                                                                                                   | ✅ جيد                                                                                         | ✅ جيد                                                                                         |
| **تنسيق (التواريخ، الأرقام، العملات)**                       | ✅ منسقات محسّنة (Intl في الخلفية)                                                                                           | ✅ جيد (مساعدات Intl)                                                                          | ✅ جيد (مساعدات Intl)                                                                          |
| **تنسيق المحتوى**                                            | ✅ .tsx، .ts، .js، .json، .md، .txt، (.yaml قيد العمل)                                                                       | ✅ .json، .js، .ts                                                                             | ⚠️ .json                                                                                       |
| **دعم ICU**                                                  | ⚠️ جاري العمل عليه                                                                                                           | ✅ نعم                                                                                         | ⚠️ عبر الإضافة (`i18next-icu`)                                                                 |
| **مساعدو تحسين محركات البحث (hreflang، خريطة الموقع)**       | ✅ أدوات مدمجة: مساعدات لخريطة الموقع، robots.txt، البيانات الوصفية                                                          | ✅ جيد                                                                                         | ✅ جيد                                                                                         |
| **النظام البيئي / المجتمع**                                  | ⚠️ أصغر ولكن ينمو بسرعة ويتفاعل                                                                                              | ✅ جيد                                                                                         | ✅ جيد                                                                                         |
| **التصيير على جانب الخادم ومكونات الخادم**                   | ✅ نعم، مُبسّط للتصيير على جانب الخادم / مكونات خادم React                                                                   | ⚠️ مدعوم على مستوى الصفحة ولكن يحتاج إلى تمرير دوال t على شجرة المكونات لمكونات الخادم الفرعية | ⚠️ مدعوم على مستوى الصفحة ولكن يحتاج إلى تمرير دوال t على شجرة المكونات لمكونات الخادم الفرعية |
| **إزالة الشيفرة غير المستخدمة (تحميل المحتوى المستخدم فقط)** | ✅ نعم، لكل مكون أثناء وقت البناء عبر إضافات Babel/SWC                                                                       | ⚠️ جزئي                                                                                        | ⚠️ جزئي                                                                                        |
| **التحميل الكسول**                                           | ✅ نعم، لكل لغة / لكل قاموس                                                                                                  | ✅ نعم (لكل مسار/لكل لغة)، يحتاج إلى إدارة مساحة الأسماء                                       | ✅ نعم (لكل مسار/لكل لغة)، يحتاج إلى إدارة مساحة الأسماء                                       |
| **تنظيف المحتوى غير المستخدم**                               | ✅ نعم، لكل قاموس أثناء وقت البناء                                                                                           | ❌ لا، يمكن إدارته يدويًا باستخدام إدارة المساحات الاسمية                                      | ❌ لا، يمكن إدارته يدويًا باستخدام إدارة المساحات الاسمية                                      |
| **إدارة المشاريع الكبيرة**                                   | ✅ يشجع على التصميم المعياري، مناسب لأنظمة التصميم                                                                           | ✅ معياري مع الإعداد                                                                           | ✅ معياري مع الإعداد                                                                           |
| **اختبار الترجمات المفقودة (CLI/CI)**                        | ✅ CLI: `npx intlayer content test` (تدقيق مناسب لـ CI)                                                                      | ⚠️ غير مدمج؛ الوثائق تقترح `npx @lingual/i18n-check`                                           | ⚠️ غير مدمج؛ يعتمد على أدوات i18next / وقت التشغيل `saveMissing`                               |

---

## المقدمة

يوفر Next.js دعمًا مدمجًا للتوجيه الدولي (مثل مقاطع اللغة). لكن هذه الميزة لا تقوم بالترجمة بمفردها. لا يزال يتعين عليك استخدام مكتبة لعرض المحتوى المحلي للمستخدمين.

توجد العديد من مكتبات i18n، ولكن في عالم Next.js اليوم، هناك ثلاث مكتبات تكتسب شعبية: next-i18next، next-intl، و Intlayer.

---

## الهندسة والقابلية للتوسع

- **next-intl / next-i18next**: تعتمد بشكل افتراضي على **كتالوجات مركزية** لكل لغة (بالإضافة إلى **مساحات الأسماء** في i18next). تعمل بشكل جيد في البداية، لكنها غالبًا ما تصبح مساحة مشتركة كبيرة مع زيادة الترابط وتغير المفاتيح.
- **Intlayer**: تشجع على استخدام **قواميس لكل مكون** (أو لكل ميزة) **متمركزة** مع الكود الذي تخدمه. هذا يقلل من العبء المعرفي، ويسهل تكرار/ترحيل أجزاء واجهة المستخدم، ويقلل من النزاعات بين الفرق. المحتوى غير المستخدم يكون أسهل في الاكتشاف والحذف بشكل طبيعي.

**لماذا هذا مهم:** في قواعد الكود الكبيرة أو إعدادات نظام التصميم، **المحتوى المعياري** يتوسع بشكل أفضل من الكتالوجات الأحادية.

---

## أحجام الحزم والاعتمادات

بعد بناء التطبيق، الحزمة هي جافا سكريبت التي سيقوم المتصفح بتحميلها لعرض الصفحة. لذلك، حجم الحزمة مهم لأداء التطبيق.

هناك مكونان مهمان في سياق حزمة تطبيق متعدد اللغات:

- كود التطبيق
- المحتوى الذي يتم تحميله بواسطة المتصفح

## كود التطبيق

أهمية كود التطبيق ضئيلة في هذه الحالة. جميع الحلول الثلاثة تدعم تقنية tree-shaking، مما يعني أن الأجزاء غير المستخدمة من الكود لا تُدرج في الحزمة.

إليك مقارنة لحجم حزمة جافا سكريبت التي يتم تحميلها بواسطة المتصفح لتطبيق متعدد اللغات مع الحلول الثلاثة.

إذا لم نحتاج إلى أي مُنسق في التطبيق، فإن قائمة الدوال المُصدرة بعد تطبيق tree-shaking ستكون:

- **next-intlayer**: `useIntlayer`, `useLocale`, `NextIntlClientProvider`، (حجم الحزمة هو 180.6 كيلوبايت -> 78.6 كيلوبايت (gzip))
- **next-intl**: `useTranslations`, `useLocale`, `NextIntlClientProvider`، (حجم الحزمة هو 101.3 كيلوبايت -> 31.4 كيلوبايت (gzip))
- **next-i18next**: `useTranslation`, `useI18n`, `I18nextProvider`، (حجم الحزمة هو 80.7 كيلوبايت -> 25.5 كيلوبايت (gzip))

هذه الدوال هي مجرد أغلفة حول سياق/حالة React، لذا فإن التأثير الكلي لمكتبة i18n على حجم الحزمة هو ضئيل.

> Intlayer أكبر قليلاً من `next-intl` و `next-i18next` لأنه يتضمن منطقًا أكثر في دالة `useIntlayer`. هذا مرتبط بالتكامل مع markdown و `intlayer-editor`.

## المحتوى والترجمات

غالبًا ما يتجاهل المطورون هذا الجزء، ولكن دعونا نعتبر حالة تطبيق يتكون من 10 صفحات بـ 10 لغات. لنفترض أن كل صفحة تحتوي على محتوى فريد بنسبة 100% لتبسيط الحساب (في الواقع، هناك الكثير من المحتوى المكرر بين الصفحات، مثل عنوان الصفحة، الرأس، التذييل، إلخ).

المستخدم الذي يرغب في زيارة صفحة `/fr/about` سيقوم بتحميل محتوى صفحة واحدة بلغة معينة. تجاهل تحسين المحتوى يعني تحميل 8200% `((1 + (((10 صفحات - 1) × (10 لغات - 1)))) × 100)` من محتوى التطبيق بشكل غير ضروري. هل ترى المشكلة؟ حتى لو كان هذا المحتوى نصًا فقط، وبينما من المحتمل أنك تفضل التفكير في تحسين صور موقعك، فإنك ترسل محتوى غير مفيد عبر العالم وتجعل أجهزة المستخدمين تعالجه دون فائدة.

مسألتان مهمتان:

- **التقسيم حسب المسار:**

  > إذا كنت في صفحة `/about`، لا أريد تحميل محتوى صفحة `/home`

- **التقسيم حسب اللغة:**

  > إذا كنت في صفحة `/fr/about`، لا أريد تحميل محتوى صفحة `/en/about`

مرة أخرى، كل الحلول الثلاثة تدرك هذه القضايا وتسمح بإدارة هذه التحسينات. الفرق بين الحلول الثلاثة هو تجربة المطور (DX).

يستخدم كل من `next-intl` و `next-i18next` نهجًا مركزيًا لإدارة الترجمات، مما يسمح بتقسيم ملفات JSON حسب اللغة وحسب الملفات الفرعية. في `next-i18next`، نسمي ملفات JSON "مساحات الأسماء" (namespaces)؛ بينما يسمح `next-intl` بإعلان الرسائل. في `intlayer`، نسمي ملفات JSON "القواميس" (dictionaries).

- في حالة `next-intl`، مثل `next-i18next`، يتم تحميل المحتوى على مستوى الصفحة/التخطيط، ثم يتم تحميل هذا المحتوى في مزود السياق. هذا يعني أن المطور يجب أن يدير ملفات JSON التي سيتم تحميلها لكل صفحة يدويًا.

> في الممارسة العملية، هذا يعني أن المطورين غالبًا ما يتخطون هذا التحسين، مفضلين تحميل كل المحتوى في مزود سياق الصفحة من أجل البساطة.

- في حالة `intlayer`، يتم تحميل كل المحتوى في التطبيق. ثم يتولى مكون إضافي (`@intlayer/babel` / `@intlayer/swc`) مهمة تحسين الحزمة عن طريق تحميل المحتوى المستخدم فقط في الصفحة. لذلك لا يحتاج المطور إلى إدارة القواميس التي سيتم تحميلها يدويًا. هذا يسمح بتحسين أفضل، وصيانة أفضل، ويقلل من وقت التطوير.

مع نمو التطبيق (خاصة عندما يعمل عدة مطورين على التطبيق)، من الشائع نسيان إزالة المحتوى الذي لم يعد مستخدمًا من ملفات JSON.

> لاحظ أن جميع ملفات JSON يتم تحميلها في جميع الحالات (next-intl، next-i18next، intlayer).

لهذا السبب، فإن نهج Intlayer أكثر كفاءة: إذا لم يعد يتم استخدام مكون ما، فلن يتم تحميل قاموسه في الحزمة.

كيفية تعامل المكتبة مع الاستبدالات (fallbacks) أمر مهم أيضًا. لنفترض أن التطبيق باللغة الإنجليزية بشكل افتراضي، وزار المستخدم صفحة `/fr/about`. إذا كانت الترجمات مفقودة بالفرنسية، فسنعتبر الاستبدال باللغة الإنجليزية.

في حالة `next-intl` و `next-i18next`، تتطلب المكتبة تحميل ملفات JSON المتعلقة باللغة الحالية، ولكن أيضًا لغة التراجع (fallback). وبالتالي، مع افتراض أن كل المحتوى قد تُرجم، ستقوم كل صفحة بتحميل محتوى غير ضروري بنسبة 100%. **بالمقارنة، تقوم `intlayer` بمعالجة التراجع أثناء وقت بناء القاموس. لذا، ستقوم كل صفحة بتحميل المحتوى المستخدم فقط.**

فيما يلي مثال على تأثير تحسين حجم الحزمة باستخدام `intlayer` في تطبيق vite + react:

| الحزمة المحسنة                                                                         | الحزمة غير المحسنة                                                                                         |
| -------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| ![حزمة محسنة](https://github.com/aymericzip/intlayer/blob/main/docs/assets/bundle.png) | ![حزمة غير محسنة](https://github.com/aymericzip/intlayer/blob/main/docs/assets/bundle_no_optimization.png) |

---

## تايب سكريبت والسلامة

<Columns>
  <Column>

**next-intl**

- دعم قوي لـ TypeScript، لكن **المفاتيح ليست مُعرفة بدقة بشكل افتراضي**؛ ستحتاج للحفاظ على أنماط الأمان يدويًا.

  </Column>
  <Column>

**next-i18next**

- تعريفات أساسية للهوكس؛ **التعريف الصارم للمفاتيح يتطلب أدوات/تكوين إضافي**.

  </Column>
  <Column>

**intlayer**

- **ينشئ أنواعًا صارمة** من المحتوى الخاص بك. **الإكمال التلقائي في بيئة التطوير** و**أخطاء وقت الترجمة** تكتشف الأخطاء الإملائية والمفاتيح المفقودة قبل النشر.

  </Column>
</Columns>

**لماذا هذا مهم:** التحقق الصارم من الأنواع ينقل الأخطاء إلى اليسار (التكامل المستمر/البناء) بدلاً من اليمين (وقت التشغيل).

---

## التعامل مع الترجمات المفقودة

**next-intl**

- يعتمد على **الاستعادات أثناء وقت التشغيل** (مثل عرض المفتاح أو اللغة الافتراضية). البناء لا يفشل.

**next-i18next**

- يعتمد على **الاستعادات أثناء وقت التشغيل** (مثل عرض المفتاح أو اللغة الافتراضية). البناء لا يفشل.

**intlayer**

- **الكشف أثناء وقت البناء** مع **تحذيرات/أخطاء** للمواقع أو المفاتيح المفقودة.

**لماذا هذا مهم:** اكتشاف الفجوات أثناء البناء يمنع ظهور "سلاسل غامضة" في الإنتاج ويتماشى مع قواعد الإصدار الصارمة.

---

## التوجيه، الوسيط واستراتيجية عناوين URL

<Columns>
  <Column>

**next-intl**

- يعمل مع **توجيه Next.js المحلي** على App Router.

  </Column>
  <Column>

**next-i18next**

- يعمل مع **توجيه Next.js المحلي** على App Router.

  </Column>
  <Column>

**intlayer**

- كل ما سبق، بالإضافة إلى **وسيط i18n** (اكتشاف اللغة عبر الرؤوس/الكوكيز) و**مساعدين** لإنشاء عناوين URL محلية ووسوم `<link rel="alternate" hreflang="…">`.

  </Column>
</Columns>

**لماذا هذا مهم:** تقليل طبقات الربط المخصصة؛ **تجربة مستخدم متسقة** و**تحسين SEO نظيف** عبر اللغات.

---

## توافق مكونات الخادم (RSC)

<Columns>
  <Column>

**next-intl**

- يدعم Next.js 13+. غالبًا ما يتطلب تمرير دوال الترجمة/المنسقات عبر شجرة المكونات في الإعدادات المختلطة.

  </Column>
  <Column>

**next-i18next**

- يدعم Next.js 13+. قيود مماثلة مع تمرير أدوات الترجمة عبر الحدود.

  </Column>
  <Column>

**intlayer**

- يدعم Next.js 13+ ويسهل **الحد الفاصل بين الخادم/العميل** من خلال واجهة برمجة تطبيقات متسقة ومزودين موجهين لـ RSC، متجنبًا نقل أدوات التنسيق أو دوال الترجمة.

  </Column>
</Columns>

**لماذا هذا مهم:** نموذج ذهني أنظف وحالات حافة أقل في الأشجار الهجينة.

---

## تجربة المطور، الأدوات والصيانة

<Columns>
  <Column>

**next-intl**

- غالبًا ما يُستخدم مع منصات التوطين الخارجية وسير العمل التحريري.

  </Column>
  <Column>

**next-i18next**

- غالبًا ما يُستخدم مع منصات التوطين الخارجية وسير العمل التحريري.

  </Column>
  <Column>

**intlayer**

- يوفر محررًا بصريًا مجانيًا ونظام إدارة محتوى اختياري (متوافق مع Git أو خارجي)، بالإضافة إلى امتداد VSCode وترجمات بمساعدة الذكاء الاصطناعي باستخدام مفاتيح المزود الخاصة بك.

  </Column>
</Columns>

**لماذا هذا مهم:** يقلل من تكلفة العمليات ويقصر دورة التواصل بين المطورين ومؤلفي المحتوى.

## التكامل مع منصات الترجمة (TMS)

تعتمد المؤسسات الكبيرة غالبًا على أنظمة إدارة الترجمة (TMS) مثل **Crowdin**، **Phrase**، **Lokalise**، **Localizely**، أو **Localazy**.

- **لماذا تهتم الشركات**
  - **التعاون والأدوار**: يشارك عدة أطراف: المطورون، مدراء المنتجات، المترجمون، المراجعون، فرق التسويق.
  - **الحجم والكفاءة**: الترجمة المستمرة، والمراجعة في السياق.

- **next-intl / next-i18next**
  - عادةً ما تستخدم **كتالوجات JSON مركزية**، لذا فإن التصدير/الاستيراد مع أنظمة إدارة الترجمة (TMS) يكون بسيطًا.
  - أنظمة بيئية ناضجة وأمثلة/تكاملات للمنصات المذكورة أعلاه.

- **Intlayer**
  - يشجع على **القواميس اللامركزية لكل مكون** ويدعم محتوى **TypeScript/TSX/JS/JSON/MD**.
  - هذا يحسن من التجزئة في الكود، لكنه قد يجعل تكامل أنظمة إدارة الترجمة (TMS) السهل الاستخدام أكثر صعوبة عندما يتوقع الأداة ملفات JSON مركزية ومسطحة.
  - يوفر Intlayer بدائل: **ترجمات بمساعدة الذكاء الاصطناعي** (باستخدام مفاتيح المزود الخاصة بك)، و**محرر مرئي/نظام إدارة محتوى**، وعمليات **CLI/CI** لالتقاط وملء الفجوات.

> ملاحظة: `next-intl` و `i18next` يقبلان أيضًا كتالوجات TypeScript. إذا كان فريقك يخزن الرسائل في ملفات `.ts` أو يوزعها حسب الميزة، فقد تواجه احتكاكًا مشابهًا مع نظام إدارة الترجمة (TMS). ومع ذلك، تبقى العديد من إعدادات `next-intl` مركزية في مجلد `locales/`، مما يجعل إعادة هيكلتها إلى JSON لـ TMS أسهل قليلاً.

## تجربة المطور

هذا الجزء يقدم مقارنة عميقة بين الحلول الثلاثة. بدلاً من النظر في الحالات البسيطة كما هو موضح في وثائق "البدء السريع" لكل حل، سنأخذ في الاعتبار حالة استخدام حقيقية، أكثر تشابهًا مع مشروع حقيقي.

### هيكل التطبيق

هيكل التطبيق مهم لضمان سهولة صيانة قاعدة الشيفرة الخاصة بك.

<Tab defaultTab="next-intl" group='techno'>

  <TabItem label="next-i18next" value="next-i18next">

```bash
.
├── public
│   └── locales
│       ├── en
│       │  ├── home.json
│       │  └── navbar.json
│       ├── fr
│       │  ├── home.json
│       │  └── navbar.json
│       └── es
│          ├── home.json
│          └── navbar.json
├── next-i18next.config.js
└── src
    ├── middleware.ts
    ├── app
    │   └── home.tsx
    └── components
        └── Navbar
            └── index.tsx
```

  </TabItem>
  <TabItem label="next-intl" value="next-intl">

```bash
.
├── locales
│   ├── en
│   │  ├── home.json
│   │  └── navbar.json
│   ├── fr
│   │  ├── home.json
│   │  └── navbar.json
│   └── es
│      ├── home.json
│      └── navbar.json
├── i18n.ts
└── src
    ├── middleware.ts
    ├── app
    │   └── home.tsx
    └── components
        └── Navbar
            └── index.tsx
```

  </TabItem>
<TabItem label="intlayer" value="intlayer">

```bash
.
├── intlayer.config.ts
└── src
    ├── middleware.ts
    ├── app
    │   └── home
    │       └── index.tsx
    │       └── index.content.ts
    └── components
        └── Navbar
            ├── index.tsx
            └── index.content.ts
```

  </TabItem>
</Tab>

#### المقارنة

- **next-intl / next-i18next**: كتالوجات مركزية (JSON؛ مساحات الأسماء/الرسائل). هيكل واضح، يتكامل جيدًا مع منصات الترجمة، لكنه قد يؤدي إلى المزيد من التعديلات عبر الملفات مع نمو التطبيقات.
- **Intlayer**: قواميس `.content.{ts|js|json}` لكل مكون متواجدة بجانب المكونات. يسهل إعادة استخدام المكونات والتفكير المحلي؛ يضيف ملفات ويعتمد على أدوات وقت البناء.

#### الإعداد وتحميل المحتوى

كما ذُكر سابقًا، يجب عليك تحسين كيفية استيراد كل ملف JSON إلى كودك.
كيفية تعامل المكتبة مع تحميل المحتوى أمر مهم.

<Tab defaultTab="next-intl" group='techno'>
  <TabItem label="next-i18next" value="next-i18next">

```tsx fileName="next-i18next.config.js"
module.exports = {
  i18n: {
    locales: ["en", "fr", "es"],
    defaultLocale: "en",
  },
};
```

```tsx fileName="src/app/_app.tsx"
import { appWithTranslation } from "next-i18next";

const MyApp = ({ Component, pageProps }) => <Component {...pageProps} />;

export default appWithTranslation(MyApp);
```

```tsx fileName="src/app/[locale]/about/page.tsx"
import type { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { I18nextProvider, initReactI18next } from "react-i18next";
import { createInstance } from "i18next";
import { ClientComponent, ServerComponent } from "@components";

export default function HomePage({ locale }: { locale: string }) {
  // أعلن صراحة عن مساحة الأسماء المستخدمة من قبل هذا المكون
  const resources = await loadMessagesFor(locale); // محملك (JSON، إلخ)

  const i18n = createInstance();
  i18n.use(initReactI18next).init({
    lng: locale,
    fallbackLng: "en",
    resources,
    ns: ["common", "about"],
    defaultNS: "common",
    interpolation: { escapeValue: false },
  });

  const { t } = useTranslation("about");

  return (
    <I18nextProvider i18n={i18n}>
      <main>
        <h1>{t("title")}</h1>
        <ClientComponent />
        <ServerComponent />
      </main>
    </I18nextProvider>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  // قم بتحميل مساحات الأسماء الضرورية فقط لهذه الصفحة
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "en", ["common", "about"])),
    },
  };
};
```

  </TabItem>
   <TabItem label="next-intl" value="next-intl">

```tsx fileName="i18n.ts"
import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";

// يمكن استيرادها من إعداد مشترك
const locales = ["en", "fr", "es"];

export default getRequestConfig(async ({ locale }) => {
  // تحقق من أن معامل `locale` الوارد صالح
  if (!locales.includes(locale as any)) notFound();

  return {
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
```

```tsx fileName="src/app/[locale]/about/layout.tsx"
import { NextIntlClientProvider } from "next-intl";
import { getMessages, unstable_setRequestLocale } from "next-intl/server";
import pick from "lodash/pick";

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { locale } = params;

  // تعيين اللغة النشطة للطلب لهذا العرض على الخادم (RSC)
  unstable_setRequestLocale(locale);

  // يتم تحميل الرسائل على جانب الخادم عبر src/i18n/request.ts
  // (انظر وثائق next-intl). هنا ندفع فقط جزءًا فرعيًا إلى العميل
  // اللازم لمكونات العميل (تحسين الحمولة).
  const messages = await getMessages();
  const clientMessages = pick(messages, ["common", "about"]);

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider locale={locale} messages={clientMessages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
```

```tsx fileName="src/app/[locale]/about/page.tsx"
import { getTranslations } from "next-intl/server";
import { ClientComponent, ServerComponent } from "@components";

export default async function LandingPage({
  params,
}: {
  params: { locale: string };
}) {
  // تحميل صارم على جانب الخادم فقط (غير مفعّل على العميل)
  const t = await getTranslations("about");

  return (
    <main>
      <h1>{t("title")}</h1>
      <ClientComponent />
      <ServerComponent />
    </main>
  );
}
```

  </TabItem>
<TabItem label="intlayer" value="intlayer">

```tsx fileName="intlayer.config.ts"
export default {
  internationalization: {
    locales: ["en", "fr", "es"],
    defaultLocale: "en",
  },
};
```

```tsx fileName="src/app/[locale]/layout.tsx"
import { getHTMLTextDir } from "intlayer";
import {
  IntlayerClientProvider,
  generateStaticParams,
  type NextLayoutIntlayer,
} from "next-intlayer";

export const dynamic = "force-static";

const LandingLayout: NextLayoutIntlayer = async ({ children, params }) => {
  const { locale } = await params;

  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <IntlayerClientProvider locale={locale}>
        {children}
      </IntlayerClientProvider>
    </html>
  );
};

export default LandingLayout;
```

```tsx fileName="src/app/[locale]/about/page.tsx"
import { PageContent } from "@components/PageContent";
import type { NextPageIntlayer } from "next-intlayer";
import { IntlayerServerProvider, useIntlayer } from "next-intlayer/server";
import { ClientComponent, ServerComponent } from "@components";

const LandingPage: NextPageIntlayer = async ({ params }) => {
  const { locale } = await params;
  const { title } = useIntlayer("about", locale);

  return (
    <IntlayerServerProvider locale={locale}>
      <main>
        <h1>{title}</h1>
        <ClientComponent />
        <ServerComponent />
      </main>
    </IntlayerServerProvider>
  );
};

export default LandingPage;
```

  </TabItem>
</Tab>

#### مقارنة

جميع الثلاثة تدعم تحميل المحتوى حسب اللغة والمزودين.

- مع **next-intl/next-i18next**، عادةً ما تقوم بتحميل الرسائل/المساحات المختارة لكل مسار وتضع الموفرين حيثما دعت الحاجة.

- مع **Intlayer**، يتم إضافة تحليل وقت البناء لاستنتاج الاستخدام، مما يمكن أن يقلل من التوصيل اليدوي وقد يسمح بموفر جذر واحد.

اختر بين التحكم الصريح والأتمتة بناءً على تفضيل الفريق.

### الاستخدام في مكون العميل

لنأخذ مثالاً على مكون عميل يعرض عدادًا.

<Tab defaultTab="next-intl" group='techno'>
  <TabItem label="next-i18next" value="next-i18next">

**الترجمات (يجب أن تكون JSON حقيقية في `public/locales/...`)**

```json fileName="public/locales/en/about.json"
{
  "counter": {
    "label": "Counter",
    "increment": "Increment"
  }
}
```

```json fileName="public/locales/fr/about.json"
{
  "counter": {
    "label": "عداد",
    "increment": "زيادة"
  }
}
```

**مكون العميل**

```tsx fileName="src/components/ClientComponentExample.tsx"
"use client";

import React, { useMemo, useState } from "react";
import { useTranslation } from "next-i18next";

export default function ClientComponentExample() {
  const { t, i18n } = useTranslation("about");
  const [count, setCount] = useState(0);

  // next-i18next لا يوفر useNumber؛ استخدم Intl.NumberFormat
  const numberFormat = new Intl.NumberFormat(i18n.language);

  return (
    <div>
      <p>{numberFormat.format(count)}</p>
      <button
        aria-label={t("counter.label")}
        onClick={() => setCount((count) => count + 1)}
      >
        {t("counter.increment")}
      </button>
    </div>
  );
}
```

> لا تنسَ إضافة مساحة الأسماء "about" في serverSideTranslations للصفحة  
> نستخدم هنا إصدار React 19.x.x، ولكن للإصدارات الأقدم، ستحتاج إلى استخدام useMemo لتخزين نسخة من المُنسق لأنه دالة ثقيلة

  </TabItem>
  <TabItem label="next-intl" value="next-intl">

**الترجمات (تم إعادة استخدام الشكل؛ قم بتحميلها في رسائل next-intl كما تفضل)**

```json fileName="locales/en/about.json"
{
  "counter": {
    "label": "Counter",
    "increment": "Increment"
  }
}
```

```json fileName="locales/fr/about.json"
{
  "counter": {
    "label": "Compteur",
    "increment": "Incrémenter"
  }
}
```

**مكون العميل**

```tsx fileName="src/components/ClientComponentExample.tsx"
"use client";

import React, { useState } from "react";
import { useTranslations, useFormatter } from "next-intl";

export default function ClientComponentExample() {
  // نطاق مباشر للكائن المتداخل
  const t = useTranslations("about.counter");
  const format = useFormatter();
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>{format.number(count)}</p>
      <button
        aria-label={t("label")}
        onClick={() => setCount((count) => count + 1)}
      >
        {t("increment")}
      </button>
    </div>
  );
}
```

> لا تنسَ إضافة رسالة "about" في رسالة العميل للصفحة

  </TabItem>
  <TabItem label="intlayer" value="intlayer">

**المحتوى**

```ts fileName="src/components/ClientComponentExample/index.content.ts"
import { t, type Dictionary } from "intlayer";

const counterContent = {
  key: "counter",
  content: {
    label: t({ ar: "عداد", en: "Counter", fr: "Compteur" }),
    increment: t({ ar: "زيادة", en: "Increment", fr: "Incrémenter" }),
  },
} satisfies Dictionary;

export default counterContent;
```

**مكون العميل**

```tsx fileName="src/components/ClientComponentExample/index.tsx"
"use client";

import React, { useState } from "react";
import { useNumber, useIntlayer } from "next-intlayer";

export default function ClientComponentExample() {
  const [count, setCount] = useState(0);
  const { label, increment } = useIntlayer("counter"); // يعيد سلاسل نصية
  const { number } = useNumber();

  return (
    <div>
      <p>{number(count)}</p>
      <button aria-label={label} onClick={() => setCount((count) => count + 1)}>
        {increment}
      </button>
    </div>
  );
}
```

  </TabItem>
</Tab>

#### المقارنة

- **تنسيق الأرقام**
  - **next-i18next**: لا يوجد `useNumber`؛ يستخدم `Intl.NumberFormat` (أو i18next-icu).
  - **next-intl**: `useFormatter().number(value)`.
  - **Intlayer**: `useNumber()` مدمج.

- **المفاتيح**
  - احتفظ ببنية متداخلة (`about.counter.label`) وحدد نطاق الخطاف الخاص بك وفقًا لذلك (`useTranslation("about")` + `t("counter.label")` أو `useTranslations("about.counter")` + `t("label")`).

- **مواقع الملفات**
  - **next-i18next** يتوقع JSON في `public/locales/{lng}/{ns}.json`.
  - **next-intl** مرن؛ يمكنك تحميل الرسائل كيفما تريد.
  - **Intlayer** يخزن المحتوى في قواميس TS/JS ويحلها حسب المفتاح.

---

### الاستخدام في مكون الخادم

سوف نأخذ حالة مكون واجهة مستخدم. هذا المكون هو مكون خادم، ويجب أن يكون قادرًا على الإدراج كطفل لمكون عميل. (صفحة (مكون خادم) -> مكون عميل -> مكون خادم). بما أن هذا المكون يمكن إدراجه كطفل لمكون عميل، فلا يمكن أن يكون غير متزامن (async).

<Tab defaultTab="next-intl" group='techno'>
  <TabItem label="next-i18next" value="next-i18next">

```tsx fileName="src/pages/about.tsx"
import React from "react";
import type { GetStaticProps } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

type ServerComponentProps = {
  count: number;
  t: (key: string) => string;
  format: (value: number) => string;
};

export default function ServerComponent({
  t,
  format,
  count,
}: ServerComponentProps) {
  return (
    <div>
      <p>{format(count)}</p>
      <button aria-label={t("counter.label")}>{t("counter.increment")}</button>
    </div>
  );
}
```

> بما أن مكون الخادم لا يمكن أن يكون غير متزامن (async)، يجب عليك تمرير الترجمات ودالة التنسيق كخصائص (props).
>
> - `const { t, i18n } = useTranslation("about");`
> - `const formatted = new Intl.NumberFormat(i18n.language).format(initialCount);`

  </TabItem>
  <TabItem label="next-intl" value="next-intl">

```tsx fileName="src/components/ServerComponent.tsx"
import { getTranslations, getFormatter } from "next-intl/server";

export default async function ServerComponent({
  t,
  format,
  count,
}: {
  t: (key: string) => string;
  format: (value: number) => string;
  count: number;
}) {
  return (
    <div>
      <p>{format.number(count)}</p>
      <button aria-label={t("label")}>{t("increment")}</button>
    </div>
  );
}
```

> بما أن مكون الخادم لا يمكن أن يكون غير متزامن، تحتاج إلى تمرير الترجمات ودالة التنسيق كخصائص.
>
> - `const t = await getTranslations("about.counter");`
> - `const format = await getFormatter();`

  </TabItem>
  <TabItem label="intlayer" value="intlayer">

```tsx fileName="src/components/ServerComponent.tsx"
import { useIntlayer, useNumber } from "next-intlayer/server";

const ServerComponent = ({ count }: { count: number }) => {
  const { label, increment } = useIntlayer("counter");
  const { number } = useNumber();

  return (
    <div>
      <p>{number(count)}</p>
      <button aria-label={label}>{increment}</button>
    </div>
  );
};
```

  </TabItem>
</Tab>

> تعرض Intlayer خطافات **آمنة للخادم** عبر `next-intlayer/server`. للعمل، يستخدم كل من `useIntlayer` و `useNumber` صيغة تشبه الخطافات، مشابهة لخطافات العميل، لكنها تعتمد في الأساس على سياق الخادم (`IntlayerServerProvider`).

### البيانات الوصفية / خريطة الموقع / روبوتات البحث

ترجمة المحتوى أمر رائع. لكن الناس عادةً ما ينسون أن الهدف الرئيسي من التدويل هو جعل موقعك الإلكتروني أكثر ظهورًا للعالم. التدويل هو رافعة مذهلة لتحسين ظهور موقعك الإلكتروني.

إليك قائمة بالممارسات الجيدة المتعلقة بتحسين محركات البحث متعددة اللغات (SEO).

- تعيين علامات hreflang الوصفية داخل وسم `<head>`
  > يساعد هذا محركات البحث على فهم اللغات المتاحة في الصفحة
- قم بإدراج جميع ترجمات الصفحات في ملف sitemap.xml باستخدام مخطط XML `http://www.w3.org/1999/xhtml`
  >
- لا تنسَ استبعاد الصفحات ذات البادئة من ملف robots.txt (مثل `/dashboard`، و `/fr/dashboard`، و `/es/dashboard`)
  >
- استخدم مكون Link مخصص لإعادة التوجيه إلى الصفحة الأكثر تخصيصًا للغة (مثلًا بالفرنسية `<a href="/fr/about">A propos</a>`)
  >

غالبًا ما ينسى المطورون الإشارة بشكل صحيح إلى صفحاتهم عبر اللغات المختلفة.

<Tab defaultTab="next-intl" group='techno'>
 
  <TabItem label="next-i18next" value="next-i18next">

```ts fileName="i18n.config.ts"
export const locales = ["en", "fr"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export function localizedPath(locale: string, path: string) {
  return locale === defaultLocale ? path : "/" + locale + path;
}

const ORIGIN = "https://example.com";
export function abs(locale: string, path: string) {
  return ORIGIN + localizedPath(locale, path);
}
```

```tsx fileName="src/app/[locale]/about/layout.tsx"
import type { Metadata } from "next";
import { locales, defaultLocale, localizedPath } from "@/i18n.config";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = params;

  // استيراد ملف JSON الصحيح بشكل ديناميكي
  const messages = (
    await import("@/../public/locales/" + locale + "/about.json")
  ).default;

  const languages = Object.fromEntries(
    locales.map((locale) => [locale, localizedPath(locale, "/about")])
  );

  return {
    title: messages.title,
    description: messages.description,
    alternates: {
      canonical: localizedPath(locale, "/about"),
      languages: { ...languages, "x-default": "/about" },
    },
  };
}

export default async function AboutPage() {
  return <h1>حول</h1>;
}
```

```ts fileName="src/app/sitemap.ts"
import type { MetadataRoute } from "next";
import { locales, defaultLocale, abs } from "@/i18n.config";

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = Object.fromEntries(
    locales.map((locale) => [locale, abs(locale, "/about")])
  );
  return [
    {
      url: abs(defaultLocale, "/about"),
      lastModified: new Date(),
      changeFrequency: "شهري",
      priority: 0.7,
      alternates: { languages },
    },
  ];
}
```

```ts fileName="src/app/robots.ts"
import type { MetadataRoute } from "next";
import { locales, defaultLocale, localizedPath } from "@/i18n.config";

const ORIGIN = "https://example.com";

const expandAllLocales = (path: string) => [
  localizedPath(defaultLocale, path),
  ...locales
    .filter((locale) => locale !== defaultLocale)
    .map((locale) => localizedPath(locale, path)),
];

export default function robots(): MetadataRoute.Robots {
  const disallow = [
    ...expandAllLocales("/dashboard"),
    ...expandAllLocales("/admin"),
  ];

  return {
    rules: { userAgent: "*", allow: ["/"], disallow },
    host: ORIGIN,
    sitemap: ORIGIN + "/sitemap.xml",
  };
}
```

  </TabItem>
  <TabItem label="next-intl" value="next-intl">

```tsx fileName="src/app/[locale]/about/layout.tsx"
import type { Metadata } from "next";
import { locales, defaultLocale } from "@/i18n";
import { getTranslations } from "next-intl/server";

function localizedPath(locale: string, path: string) {
  return locale === defaultLocale ? path : "/" + locale + path;
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = params;
  const t = await getTranslations({ locale, namespace: "about" });

  const url = "/about";
  const languages = Object.fromEntries(
    locales.map((locale) => [locale, localizedPath(locale, url)])
  );

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: localizedPath(locale, url),
      languages: { ...languages, "x-default": url },
    },
  };
}

// ... بقية كود الصفحة
```

```tsx fileName="src/app/sitemap.ts"
import type { MetadataRoute } from "next";
import { locales, defaultLocale } from "@/i18n";

const origin = "https://example.com";

const formatterLocalizedPath = (locale: string, path: string) =>
  locale === defaultLocale ? origin + path : origin + "/" + locale + path;

export default function sitemap(): MetadataRoute.Sitemap {
  const aboutLanguages = Object.fromEntries(
    locales.map((l) => [l, formatterLocalizedPath(l, "/about")])
  );

  return [
    {
      url: formatterLocalizedPath(defaultLocale, "/about"),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: { languages: aboutLanguages },
    },
  ];
}
```

```tsx fileName="src/app/robots.ts"
import type { MetadataRoute } from "next";
import { locales, defaultLocale } from "@/i18n";

const origin = "https://example.com";
const withAllLocales = (path: string) => [
  path,
  ...locales
    .filter((locale) => locale !== defaultLocale)
    .map((locale) => "/" + locale + path),
];

export default function robots(): MetadataRoute.Robots {
  const disallow = [
    ...withAllLocales("/dashboard"),
    ...withAllLocales("/admin"),
  ];

  return {
    rules: { userAgent: "*", allow: ["/"], disallow },
    host: origin,
    sitemap: origin + "/sitemap.xml",
  };
}
```

  </TabItem>
  <TabItem label="intlayer" value="intlayer">

```typescript fileName="src/app/[locale]/about/layout.tsx"
import { getIntlayer, getMultilingualUrls } from "intlayer";
import type { Metadata } from "next";
import type { LocalPromiseParams } from "next-intlayer";

export const generateMetadata = async ({
  params,
}: LocalPromiseParams): Promise<Metadata> => {
  const { locale } = await params;

  const metadata = getIntlayer("page-metadata", locale);

  const multilingualUrls = getMultilingualUrls("/about");

  return {
    ...metadata,
    alternates: {
      canonical: multilingualUrls[locale as keyof typeof multilingualUrls],
      languages: { ...multilingualUrls, "x-default": "/about" },
    },
  };
};

// ... بقية كود الصفحة
```

```tsx fileName="src/app/sitemap.ts"
import { getMultilingualUrls } from "intlayer";
import type { MetadataRoute } from "next";

const sitemap = (): MetadataRoute.Sitemap => [
  {
    url: "https://example.com/about",
    alternates: {
      languages: { ...getMultilingualUrls("https://example.com/about") },
    },
  },
];
```

```tsx fileName="src/app/robots.ts"
import { getMultilingualUrls } from "intlayer";
import type { MetadataRoute } from "next";

// دالة لجلب جميع الروابط متعددة اللغات من قائمة الروابط
const getAllMultilingualUrls = (urls: string[]) =>
  urls.flatMap((url) => Object.values(getMultilingualUrls(url)) as string[]);

// إعدادات ملف robots.txt مع قواعد السماح والمنع للزواحف
const robots = (): MetadataRoute.Robots => ({
  rules: {
    userAgent: "*",
    allow: ["/"],
    disallow: getAllMultilingualUrls(["/dashboard"]), // منع الوصول إلى لوحة التحكم بجميع اللغات
  },
  host: "https://example.com",
  sitemap: "https://example.com/sitemap.xml",
});

export default robots;
```

  </TabItem>
</Tab>

> توفر Intlayer دالة `getMultilingualUrls` لتوليد روابط متعددة اللغات لخريطة موقعك.

---

---

## والفائز هو…

ليس الأمر بسيطًا. كل خيار له مزاياه وعيوبه. إليك كيف أراه:

<Columns>
  <Column>

**next-intl**

- أبسط، خفيف الوزن، مع قرارات أقل مفروضة عليك. إذا كنت تريد حلاً **بسيطًا**، وتشعر بالراحة مع الكتالوجات المركزية، وكان تطبيقك **صغير إلى متوسط الحجم**.

  </Column>
  <Column>

**next-i18next**

- ناضج، مليء بالميزات، يحتوي على العديد من الإضافات المجتمعية، لكن تكلفة الإعداد أعلى. إذا كنت تحتاج إلى **نظام إضافات i18next** (مثل قواعد ICU المتقدمة عبر الإضافات) وكان فريقك يعرف i18next بالفعل، مع قبول **المزيد من التكوين** من أجل المرونة.

  </Column>
  <Column>

**Intlayer**

- مبني لـ Next.js الحديث، مع محتوى معياري، أمان نوعي، أدوات، وتقليل الكود المكرر. إذا كنت تقدر **المحتوى المخصص للمكونات**، **TypeScript الصارم**، **ضمانات وقت البناء**، **tree-shaking**، وأدوات التوجيه/SEO/المحرر المدمجة - خاصة لـ **Next.js App Router**، أنظمة التصميم و**قواعد الشيفرة الكبيرة والمعيارية**.

  </Column>
</Columns>

إذا كنت تفضل إعدادًا بسيطًا وتقبل بعض التوصيلات اليدوية، فإن next-intl خيار جيد. إذا كنت تحتاج كل الميزات ولا تمانع التعقيد، فإن next-i18next يعمل بشكل جيد. ولكن إذا كنت تريد حلاً حديثًا وقابلًا للتوسع وذو محتوى معياري مع أدوات مدمجة، فإن Intlayer تهدف إلى تقديم ذلك لك مباشرةً من الصندوق.

> **بديل لفرق المؤسسات**: إذا كنت بحاجة إلى حل مثبت يعمل بشكل مثالي مع منصات التوطين المعروفة مثل **Crowdin**، **Phrase**، أو أنظمة إدارة الترجمة الاحترافية الأخرى، فكر في استخدام **next-intl** أو **next-i18next** لنظامهم البيئي الناضج والتكاملات المثبتة.

> **خارطة الطريق المستقبلية**: تخطط Intlayer أيضًا لتطوير إضافات تعمل فوق حلول **i18next** و **next-intl**. هذا سيمنحك مزايا Intlayer في الأتمتة، والبنية النحوية، وإدارة المحتوى مع الحفاظ على الأمان والاستقرار الذي توفره هذه الحلول المعروفة في كود التطبيق الخاص بك.

## نجوم GitHub

نجوم GitHub هي مؤشر قوي على شعبية المشروع، وثقة المجتمع، وأهميته على المدى الطويل. وعلى الرغم من أنها ليست مقياسًا مباشرًا للجودة التقنية، إلا أنها تعكس عدد المطورين الذين يجدون المشروع مفيدًا، ويتابعون تقدمه، ومن المحتمل أن يتبنوه. لتقدير قيمة المشروع، تساعد النجوم في مقارنة الجذب بين البدائل وتوفر رؤى حول نمو النظام البيئي.

[![مخطط تاريخ النجوم](https://api.star-history.com/svg?repos=i18next/next-i18next&repos=amannn/next-intl&repos=aymericzip/intlayer&type=Date)](https://www.star-history.com/#i18next/next-i18next&amannn/next-intl&aymericzip/intlayer)

---

## الخلاصة

تنجح المكتبات الثلاث جميعها في التوطين الأساسي. الفرق هو **كمية العمل التي يجب عليك القيام بها** لتحقيق إعداد قوي وقابل للتوسع في **Next.js الحديثة**:

- مع **Intlayer**، يكون **المحتوى المعياري**، و**TypeScript الصارم**، و**السلامة أثناء وقت البناء**، و**حزم شجرة المهملة**، و**موجه التطبيقات من الدرجة الأولى + أدوات تحسين محركات البحث** هي **الإعدادات الافتراضية**، وليست مهامًا شاقة.
- إذا كانت فرقك تقدر **قابلية الصيانة والسرعة** في تطبيق متعدد اللغات يعتمد على المكونات، فإن Intlayer تقدم التجربة **الأكمل** اليوم.

راجع [وثيقة "لماذا Intlayer؟"](https://intlayer.org/doc/why) لمزيد من التفاصيل.
