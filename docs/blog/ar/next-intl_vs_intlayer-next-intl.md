---
createdAt: 2026-09-13
updatedAt: 2026-09-22
priority: 8
title: "next-intl مقابل @intlayer/next-intl: نفس الواجهة البرمجية، حزمة مختلفة"
description: ما الذي يتغير عندما يتم تقديم واردات next-intl من تطبيق Next.js بواسطة محول التوافق @intlayer/next-intl. تم قياس حجم الحزمة والتسرب وحجم المكون والترطيب على نفس الكود، بالإضافة إلى ما يحتفظ به المحول ويتجاهله ولا يمكنه الاستبدال.
keywords:
  - next-intl
  - use-intl
  - "@intlayer/next-intl"
  - Intlayer
  - Compat adapter
  - Migration
  - Internationalization
  - i18n
  - Benchmark
  - Bundle size
  - Blog
  - Next.js
  - TanStack Start
  - React
slugs:
  - blog
  - next-intl-vs-intlayer-next-intl
author: aymericzip
---

# next-intl مقابل @intlayer/next-intl | نفس الواجهة البرمجية، حزمة مختلفة

![next-intl VS Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/assets/i18next-next-intl-intlayer.webp?raw=true)

`@intlayer/next-intl` هو محول توافقية: يكشف API `next-intl` (`useTranslations`، `getTranslations`، `useLocale`، `t.rich()`، ICU plurals، `NextIntlClientProvider`...) ويقدمه من القواميس المجمعة بواسطة Intlayer. كود التطبيق لا يتغير. الـ bundle يتغير.

تقارن هذه المقالة بين الاثنين على نفس تطبيق Next.js، تم بناؤه مرة مع `next-intl` ومرة مع المحول. تأتي الأرقام من [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom)، مجموعة مفتوحة المصدر تسجل ما يقوم المتصفح بتنزيله فعلياً. إذا كنت تريد مقارنة `next-intl` مقابل Intlayer كمكتبات، اقرأ [next-intl vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ar/next-intl_vs_intlayer.md). هذا يتعلق بما يغيره المحول عندما تحافظ على مكوناتك كما هي.

<TOC/>

> **الخلاصة**: في نفس تطبيق Next.js، استبدال `next-intl` بـ `@intlayer/next-intl` قلّل JavaScript لكل صفحة من **153.6 كيلوبايت إلى 147.5 كيلوبايت** gzip، ومتوسط المكون من **21.8 كيلوبايت إلى 8.1 كيلوبايت**، وتسرب سلاسل الصفحات الأجنبية من **~90% إلى 0%**، والترطيب من **14.7 ميلي ثانية إلى 12.8 ميلي ثانية**، دون تعديل أي مكون. على TanStack Start، ما يعادل `use-intl` (`@intlayer/use-intl`) قلّل المكونات من **76-87 كيلوبايت إلى 9-11 كيلوبايت** وتبديل اللغة من **7-21 ميلي ثانية إلى 4-9 ميلي ثانية**. يكلف المحول **8.0 كيلوبايت** من وقت التشغيل مقابل **14.7 كيلوبايت** لـ `next-intl` و **5.5 كيلوبايت** لـ `next-intlayer` الأصلي. تمت إعادة تنفيذ التنقل والبرنامج الوسيط على إعدادات التوجيه الخاصة بـ Intlayer؛ `pathnames` المحلية هي الميزة الوحيدة التي لم يتم نقلها.

## ما هو `@intlayer/next-intl`

`next-intl` عبارة عن runtime: `getRequestConfig` يحمل `messages/{locale}.json` لكل طلب، `NextIntlClientProvider` يرسله إلى العميل، و `useTranslations("about")` يقرأ المفاتيح من هذا الكائن وقت التصيير. كل تحسين (namespaces، `pick(messages, [...])` لكل صفحة، التحميل البطيء) يجب أن تكتبه بنفسك.

`@intlayer/next-intl` يحافظ على الجزء الأول والأخير من هذه السلسلة ويستبدل الجزء الأوسط. مكوناتك لا تزال تستدعي `useTranslations("about")`؛ ما يتلقونه يأتي من قاموس Intlayer مجمع وقت البناء، محدود النطاق لذلك المكون، في اللغة النشطة فقط.

ثلاث آليات تجعل ذلك يعمل:

1. **Import aliasing.** `createNextIntlPlugin()` من `@intlayer/next-intl/plugin` يغلف `withIntlayer` ويضيف aliases لـ Webpack / Turbopack بحيث يتم حل `next-intl`، `next-intl/server`، `next-intl/navigation` و `next-intl/middleware` إلى `@intlayer/next-intl`. لا يتم إعادة تسمية أي import في codebase الخاص بك.
2. **JSON كمصدر الحقيقة.** plugin `syncJSON` يقرأ `messages/{locale}.json` الموجودة لديك، يقسم مفاتيحها على المستوى الأعلى إلى قاموس واحد لكل namespace، ويكتب الترجمات مرة أخرى إلى نفس الملفات عند تحديثها من قبل CLI أو CMS. سير العمل الخاص بالمترجمين لديك لم يتغير.
3. **Call-site binding.** يقوم تمرير التحسين في Intlayer (Babel أو SWC) بإعادة كتابة `useTranslations("about")` إلى استدعاء يتلقى قاموس `about` مباشرة. لا يعود المكون يصل إلى شجرة الرسائل العامة؛ بل يصل إلى محتواه الخاص.

```tsx fileName="app/[locale]/about/page.tsx"
// الكود الخاص بك، دون تغيير
import { useTranslations } from "next-intl";

const AboutPage = () => {
  const t = useTranslations("about");
  return <h1>{t("title")}</h1>;
};
```

```tsx fileName="ما يصدره المترجم (مبسط)"
import _dicHash_about from "../.intlayer/dictionaries/about.mjs";
import { useDictionary as useTranslations } from "@intlayer/next-intl";

const AboutPage = () => {
  const t = useTranslations(_dicHash_about);
  return <h1>{t("title")}</h1>;
};
```

إعادة الكتابة هذه هي السبب في أن أعمدة حجم المكون وتسرب الصفحة أدناه تتحرك: تسحب الصفحة فقط قواميس المكونات التي تقدمها، وفقط في اللغة التي يتم تقديمها.

## ما يحتفظ به المحول وما يتجاهله وما لا يستبدله

| `next-intl` API                                                      | مع `@intlayer/next-intl`                                                                                                         |
| -------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `useTranslations("ns")` / `getTranslations("ns")`                    | ✅ محفوظ. مرتبط بقاموس `ns` في وقت البناء. المفاتيح مكتوبة ضد محتواك.                                                            |
| `getTranslations({ locale, namespace })`                             | ✅ محفوظ                                                                                                                         |
| `t("key", { name })`, `t.rich()`, `t.markup()`, `t.raw()`            | ✅ محفوظ. ICU plurals، `select`، `selectordinal`، `#`، `{ts, date, long}` تعمل من خلال محلل Intlayer's ICU                       |
| `useLocale()` / `getLocale()` / `setRequestLocale()` / `setLocale`   | ✅ محفوظ                                                                                                                         |
| `useFormatter()`                                                     | ✅ محفوظ. `dateTime`، `number`، `relativeTime`، `list`، `dateTimeRange` تربط إلى `Intl` الأصلي                                   |
| `NextIntlClientProvider`                                             | ✅ محفوظ. يتم قبول props `messages` و `timeZone` و `now` **لكن يتم تجاهلها** (رسالة تحذير للمطور تخبرك بذلك)                     |
| `getMessages()`                                                      | ✅ محفوظ للتوافقية؛ لم يعد مطلوباً                                                                                               |
| `getRequestConfig()` في `src/i18n.ts`                                | ⚠️ غير مطلوب. يتم ترجمة القواميس في وقت البناء؛ لا يوجد تحميل رسائل لكل طلب                                                      |
| `defineRouting()`                                                    | ✅ محفوظ. يتم قراءة الحقول المحذوفة (`locales` و `defaultLocale` و `localePrefix`) من `intlayer.config.ts`                       |
| `createNavigation()`, `Link`, `redirect`, `usePathname`, `useRouter` | ✅ تم الاحتفاظ به. تم إعادة تنفيذه على أساس إعدادات التوجيه الخاصة بـ Intlayer؛ تم قبول الوسيط `routing` ولكن يتم تجاهله         |
| `pathnames` (أسماء المسارات المترجمة)                                | ❌ مقبول للكتابة، **لا يتم استيفاؤه**. احتفظ بأسماء المسارات العادية أو انقل تلك الخريطة إلى Intlayer's `rewrite`                |
| `createMiddleware()`                                                 | ✅ تم الاحتفاظ به. يُرجع وكيل Intlayer؛ يضبط ملف تعريف الارتباط `NEXT_LOCALE` بحيث يستمر `useLocale()` والمبدل الخاص بك في العمل |
| `NEXT_LOCALE` cookie                                                 | ✅ يتم قراءته بشكل افتراضي (ما لم تقم بتكوين `routing.storage` بنفسك)                                                            |
| استدعاء `useTranslations()` بدون namespace                           | ⚠️ يعمل، لكن موقع الاستدعاء غير مرتبط: يتم حله من خلال سجل runtime. مرر namespace للحصول على مكاسب bundle                        |

## معيار الأداء

### ما تم قياسه

تقوم مجموعة [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom) ببناء **نفس التطبيق** مع كل إعداد: **10 صفحات** (home، about، blog، careers، contact، FAQ، pricing، products، settings، team)، **10 locales** (`en`، `fr`، `es`، `de`، `it`، `pt`، `zh`، `ja`، `ko`، `ru`)، مكونات متطابقة ومحتوى متطابق. يتم قياس الصفحات في `en` و`fr`.

تم بناء `next-intl` بأربع استراتيجيات تحميل، من الإعداد البسيط (`messages/{locale}.json` محمل بالكامل) إلى الإعداد الأمثل (namespace واحد لكل route + `pick()` لكل صفحة). تم بناء المحول على **نفس المكونات الخاصة بالإعداد البسيط**، مع تغيير `next.config.ts` و `intlayer.config.ts` فقط. لا توجد نسخة "scoped": يقوم المترجم بتحديد نطاق المحتوى لكل مكون، لذلك صفوف `static` و `dynamic` الخاصة به مشمولة بالفعل.

بالنسبة لكل عملية بناء، تسجل المجموعة:

- **حجم المكتبة**: حجم gzip لمكون فارغ يستورد مكتبة i18n فقط. التكلفة الثابتة للـ runtime.
- **صفحة JS**: JavaScript مضغوط تم تحميله لكل صفحة، بمتوسط على جميع الصفحات واللغات.
- **نسبة تسرب اللغة %**: حصة السلاسل المترجمة الموجودة في ملف JavaScript المحمل التي تنتمي إلى لغة المستخدم **ليس** يعرضها.
- **نسبة تسرب الصفحة %**: حصة السلاسل المترجمة الموجودة في ملف JavaScript المحمل التي تنتمي إلى صفحة المستخدم **ليس** عليها.
- **متوسط المكون**: متوسط حجم gzip لكل مكون تم ترجمته بشكل منفصل. يظهر مقدار runtime i18n والفهرس الذي يسحبه مكون واحد.
- **E2E reactivity**: وقت الساعة بين تحديد لغة جديدة وتحديث `html[lang]` في DOM (Playwright، 5 تكرارات).
- **Hydration**: مدة مرحلة hydration في React.

> الأرقام أدناه تأتي من التشغيل المؤرخ **2026-09-12** مع `next-intl` / `use-intl` 4.14.2 و `@intlayer/*` 9.5.1. تطبيق الاختبار صغير عن قصد (بضع عشرات من السلاسل لكل locale)، لذا فإن نسب التسرب تصف **نمطًا**: فهي تنمو مع محتواك بينما تبقى تكلفة وقت التشغيل ثابتة.

### النتائج على Next.js

اختر المقاييس والمكتبات التي تهمك:

<I18nBenchmark framework="nextjs" vertical/>

| الإعداد                   | الاستراتيجية   | حجم المكتبة (gz) | متوسط صفحة JS (gz) | تسرب Locale | تسرب الصفحة | متوسط المكون (gz) | التفاعل E2E | الماء (Hydration) |
| ------------------------- | -------------- | ---------------: | -----------------: | ----------: | ----------: | ----------------: | ----------: | ----------------: |
| **base** (no i18n)        | -              |           0.0 KB |           141.0 KB |        0.0% |        0.0% |            0.9 KB |     13.4 ms |           11.8 ms |
| `next-intl`               | static         |          14.7 KB |           153.6 KB |        4.2% |       89.8% |           21.8 KB |     16.0 ms |           14.7 ms |
| `next-intl`               | dynamic        |          14.7 KB |           153.6 KB |        9.7% |       89.9% |           21.8 KB |     15.6 ms |           14.8 ms |
| `next-intl`               | scoped-static  |          14.7 KB |           153.6 KB |        0.0% |        0.0% |           80.1 KB |     17.9 ms |           17.4 ms |
| `next-intl`               | scoped-dynamic |          14.7 KB |           153.6 KB |        0.0% |        0.0% |           22.9 KB |     17.8 ms |           16.8 ms |
| **`@intlayer/next-intl`** | static         |       **8.0 KB** |       **147.5 KB** |    **0.0%** |    **0.0%** |        **8.1 KB** | **14.5 ms** |       **12.8 ms** |
| **`@intlayer/next-intl`** | dynamic        |       **8.0 KB** |       **148.7 KB** |    **0.0%** |    **0.0%** |        **8.1 KB** | **11.7 ms** |       **12.8 ms** |
| `next-intlayer` (native)  | static         |           5.5 KB |           141.3 KB |        0.0% |        0.0% |            8.5 KB |     15.5 ms |           16.9 ms |
| `next-intlayer` (native)  | dynamic        |           5.5 KB |           141.3 KB |        0.0% |        0.0% |            6.9 KB |     15.3 ms |           15.9 ms |

**كيفية قراءتها**

- **نفس المكونات، 6 KB أقل لكل صفحة.** يصل بناء المحول للتطبيق الساذج إلى **147.5 KB**، وهو أقل من كل إعداد `next-intl` بما في ذلك الإعداد المحسّن بالكامل (153.6 KB). وقت التشغيل نفسه هو الفرق: 8.0 KB مقابل 14.7 KB، يُدفع على كل صفحة.
- **يختفي التسرب إلى 0% دون لمس أي مكون.** إعداد `next-intl` الساذج يشحن حوالي 90% من سلاسل الصفحات الأجنبية على كل صفحة. الوصول إلى 0% مع `next-intl` يعني إعدادات `scoped-*`: مساحة اسم واحدة لكل مسار، و `pick(messages, [...])` في كل صفحة. يصل المحول إلى 0% من الكود الساذج لأن عملية التحسين تربط كل `useTranslations("ns")` بقاموسها الخاص.
- **تتقلص المكونات بمعامل 2.7x.** يبلغ متوسط المكون المترجم بشكل معزول **21.8 كيلوبايت** مع `next-intl` (يصل إلى موفر الخدمة وشجرة الرسائل) و **8.1 كيلوبايت** مع المحول. في إعداد `scoped-static` الخاص بـ `next-intl`، يرتفع هذا الرقم _إلى_ 80 كيلوبايت، لأن ملف مساحة الاسم لكل مسار يصبح قابلاً للوصول من الصفحة التي تختاره.
- **الـ Hydration أسرع بمقدار 2 ms** (12.8 مقابل 14.7 ms): لا توجد كائن رسائل يجب فكّه من حمولة RSC قبل أن يتمكن React من الـ hydrate.
- **المحول ليس وقت التشغيل الأصلي.** `next-intlayer` يجلس عند **141.3 KB**، +0.3 KB فوق تطبيق الأساس، مع وقت تشغيل 5.5 KB. يحمل المحول سطح API الخاص بـ `next-intl` (`useFormatter`, `t.rich`, محلل ICU) فوق نواة Intlayer، وبالتالي 8.0 KB و +6 KB لكل صفحة. إنه الجسر، وليس الوجهة.

<ClickToOpenIframe
src="https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-nextjs.md"
width="100%"
height="600px"
style="border:none;"
/>

> الجدول الكامل، لكل مكتبة واستراتيجية، في [تقرير قياس أداء Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/benchmark/nextjs.md).

### النتائج على TanStack Start (`use-intl`)

`use-intl` هو النواة المستقلة عن الإطار العمل الخاصة بـ `next-intl`. محولها، `@intlayer/use-intl`، يتبع نفس التصميم مع plugin Vite (`@intlayer/use-intl/plugin`).

| الإعداد                  | الإستراتيجية   | حجم المكتبة (gz) | متوسط JS الصفحة (gz) | تسرب اللغة | تسرب الصفحة | متوسط المكون (gz) | استجابة E2E |     الترطيب |
| ------------------------ | -------------- | ---------------: | -------------------: | ---------: | ----------: | ----------------: | ----------: | ----------: |
| **base** (بدون i18n)     | -              |           0.0 KB |             111.0 KB |       0.0% |        0.0% |            0.7 KB |      8.1 ms |     21.6 ms |
| `use-intl`               | static         |          14.1 KB |             179.8 KB |      50.0% |       89.8% |           76.0 KB |      6.7 ms |     15.3 ms |
| `use-intl`               | dynamic        |          14.1 KB |             119.4 KB |       0.0% |       89.8% |           75.9 KB |      7.0 ms |     15.4 ms |
| `use-intl`               | scoped-static  |          14.1 KB |             128.7 KB |       0.0% |        0.0% |           87.1 KB |     20.9 ms |     24.8 ms |
| `use-intl`               | scoped-dynamic |          14.1 KB |             128.7 KB |       0.0% |        0.0% |           87.1 KB |     13.3 ms |     25.9 ms |
| **`@intlayer/use-intl`** | static         |       **7.3 KB** |             135.8 KB |      49.7% |    **0.0%** |       **10.9 KB** |  **4.2 ms** | **10.5 ms** |
| **`@intlayer/use-intl`** | dynamic        |       **7.3 KB** |         **129.7 KB** |   **0.0%** |    **0.0%** |        **9.3 KB** |  **8.7 ms** |     16.1 ms |
| `intlayer` (native)      | static         |           5.0 KB |             125.8 KB |      50.0% |        0.0% |            8.1 KB |      3.2 ms |     11.5 ms |
| `intlayer` (native)      | dynamic        |           5.0 KB |             118.6 KB |       0.0% |        0.0% |            6.3 KB |      3.6 ms |     14.1 ms |

**كيفية قراءتها**

- **بايتات كل صفحة متساوية مقابل `use-intl` المُحسّن.** `@intlayer/use-intl` في وضع `dynamic` (129.7 KB) ضمن 1 KB من `use-intl`'s `scoped-dynamic` (128.7 KB)، و 10 KB _أعلى_ من `use-intl`'s العادي `dynamic` (119.4 KB). هذا الصف `dynamic` العادي لا يزال يسرب 90% من النصوص الخارجية؛ عدد البايتات منخفض لأن محتوى تطبيق الاختبار صغير. معدل 0% للمحول هو ما يبقى ثابتاً مع نمو المحتوى.
- **المكونات أصغر بـ 7-9 مرات.** مكونات `use-intl` بمتوسط **76-87 KB** في كل استراتيجية، لأن `useTranslations` مرتبطة بكائن الرسائل الكامل للمزود. يبلغ متوسط المحول **9-11 KB**.
- **تبديل اللغة أسرع.** إعدادات `use-intl` المُحسَّنة تستغرق **13-21 ms** لتحديث `html[lang]`؛ المحول يستغرق **4-9 ms**. عدد أقل من المكونات يعاد تصيير، ولا شيء يتم اختياره مرة أخرى من شجرة الرسائل.
- **`static` يحتفظ بكل لغة.** صف `static` في المحول يُظهر تسرب لغة بنسبة 49.7%، نفس نسبة Intlayer الأصلية في وضع `static`: يتم تجميع جميع اللغات، فقط قواميس الصفحة. سطر واحد من الإعدادات (`importMode: 'dynamic'`) يزيله.

<ClickToOpenIframe
src="https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-tanstack.md"
width="100%"
height="600px"
style="border:none;"
/>

> الجدول الكامل في [تقرير قياس أداء TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/benchmark/tanstack.md).

## لماذا تتحرك الأرقام

![The Intlayer compiler extracts content from components](https://github.com/aymericzip/intlayer/blob/main/docs/assets/compiler.webp?raw=true)

لم يتغير شيء في المكون، لذا تأتي المكاسب بالكامل من ما هو `useTranslations` مرتبطة به.

**مع `next-intl`**، الربط هو مع المزود. يتلقى `NextIntlClientProvider` كائن `messages` كاملًا للإعدادات المحلية؛ كل استدعاء `useTranslations("about")` يقرأ منه. يرى bundler مكونًا واحدًا يستورد hook واحدًا يقرأ سياقًا واحدًا، ولا يمكنه معرفة أن فرع `about` فقط هو المستخدم. تشارك المسارات أدناه نفس كائن الرسائل، لذلك يقرأ عمود تسرب الصفحة ~90% حتى تقسم الملف بنفسك, ويتزايد الهدر على محورين في وقت واحد، الصفحات واللغات:

![Theoretical content leakage by architecture](https://github.com/aymericzip/intlayer/blob/main/docs/assets/theorical_content_leakage.webp?raw=true)

```bash
.
├── messages
│   ├── en.json                       # كل namespace، كل صفحة
│   └── fr.json
└── src
    ├── i18n.ts                       # getRequestConfig({ messages: await import(...) })
    ├── middleware.ts                 # createMiddleware(routing)
    └── app/[locale]
        ├── layout.tsx                # <NextIntlClientProvider messages={messages}>
        └── about/page.tsx            # useTranslations("about")
```

**مع `@intlayer/next-intl`**، الربط هو القاموس. يحول `syncJSON` ملف `messages/en.json` إلى قاموس واحد لكل مفتاح على المستوى الأعلى؛ يقوم المترجم بحل المكون الذي يستدعي `useTranslations("about")` وينقل إليه `about` مباشرة، في اللغة النشطة، كاستيراد يمكن للـ bundler تتبعه وتقسيمه.

```bash
.
├── intlayer.config.ts                # syncJSON({ source: ({ locale }) => `./messages/${locale}.json` })
├── messages
│   ├── en.json                       # لم يتغير، لا يزال مصدر الحقيقة
│   └── fr.json
├── .intlayer/                        # تم إنشاؤه: قاموس واحد لكل namespace، لكل لغة
└── src
    ├── middleware.ts                 # createMiddleware() الآن يعيد proxy من Intlayer
    └── app/[locale]
        ├── layout.tsx                # <NextIntlClientProvider> (بدون خاصية messages)
        └── about/page.tsx            # useTranslations("about")  ← لم يتغير
```

`src/i18n.ts` والخاصية `messages` تختفي. كل شيء آخر متطابق.

## الترحيل في ثلاث خطوات

<Steps>
<Step number={1} title="التثبيت">

```bash packageManager="npm"
npx intlayer init --interactive
```

```bash packageManager="pnpm"
pnpm dlx intlayer init --interactive
```

```bash packageManager="yarn"
yarn dlx intlayer init --interactive
```

```bash packageManager="bun"
bunx intlayer init --interactive
```

يكتشف الأمر `next-intl` ويثبت `intlayer`، `next-intlayer`، `@intlayer/next-intl` و `@intlayer/sync-json-plugin`. احتفظ بـ `next-intl` مثبتًا: فهو اعتماد نظير للمحول ويوفر الأنواع.

</Step>
<Step number={2} title="وجّه Intlayer نحو رسائلك">

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  dictionary: {
    // "static" تجميع كل locale؛ "dynamic" تحميل النشطة عند الطلب
    importMode: "dynamic",
  },
  plugins: [
    syncJSON({
      // عناصر نائبة ICU: {name}, {count, plural, one {# item} other {# items}}
      format: "icu",
      source: ({ locale }) => `./messages/${locale}.json`,
      location: "messages",
    }),
  ],
};

export default config;
```

يبقى `messages/{locale}.json` في مكانه. يصبح كل مفتاح على المستوى الأعلى قاموسًا؛ `useTranslations("about")` يُعيّن إلى قاموس `about`.

</Step>
<Step number={3} title="تغليف next.config.ts">

```ts fileName="next.config.ts"
import type { NextConfig } from "next";
import { createNextIntlPlugin } from "@intlayer/next-intl/plugin";

const withIntlayer = createNextIntlPlugin();

const nextConfig: NextConfig = {};

export default withIntlayer(nextConfig);
```

`createNextIntlPlugin()` ينشئ `withIntlayer` (مراقبة المحتوى، وتجميع القواموس، وتمرير التحسين) والأسماء المستعارة `next-intl` → `@intlayer/next-intl` لـ Webpack و Turbopack. قم بالبناء، والأرقام في الجداول أعلاه هي لك.

</Step>
</Steps>

### ما يمكنك حذفه بعد ذلك

| الملف / النمط                                 | السبب                                                                                                 |
| --------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| `getRequestConfig` في `src/i18n.ts`           | لا توجد عملية تحميل الرسائل لكل طلب. احتفظ بالملف فقط إذا كان يُصدّر أيضًا مساعدات `createNavigation` |
| `messages={...}` على `NextIntlClientProvider` | المحول يقرأ المخرجات المجمعة؛ الخاصية يتم تجاهلها وتسجيل تحذير في بيئة التطوير                        |
| `await getMessages()` في التخطيطات            | نفس السبب                                                                                             |
| `pick(messages, [...])` لكل صفحة              | المجمع يقوم بالاختيار، لكل مكون                                                                       |

### ما تحصل عليه بما يتجاوز البايتات

- **Typed keys.** `useTranslations("about")` له نوع مقابل قاموس `about` المجمع. `t("does.not.exist")` هو خطأ في TypeScript، وليس بديل في وقت التشغيل.
- **`npx intlayer test`** يفشل في CI عندما تكون هناك مفتاح مفقود في إحدى اللغات. **`npx intlayer fill`** يترجم المفاتيح المفقودة باستخدام مزود خدمة من اختيارك (OpenAI, Anthropic, Mistral, Gemini...) باستخدام مفتاحك الخاص، ويكتب النتيجة مباشرة في `messages/{locale}.json`.
- **محرر مرئي و CMS** يعملان على نفس القواميس، لذا يمكن للمطورين غير التقنيين تعديل `messages/fr.json` من خلال واجهة مستخدم وسيتم تحديث الملف تلقائياً.
- **انتقال تدريجي إلى `.content.ts`.** أي مكون يمكنه التبديل من `useTranslations("about")` إلى `useIntlayer("about")` باستخدام ملف محتوى مرافق، واحداً تلو الآخر. تتعايش قواموس JSON و `.content.ts` وتندمج معاً.

## الحدود التي يجب أن تعرفها قبل البدء

<AccordionGroup>
<Accordion header="تنتقل إعدادات التوجيه إلى intlayer.config.ts">

تحتفظ `createNavigation(routing)` و `createMiddleware(routing)` بتوقيعها ولكنها تتجاهل الوسيط: اللغات، واللغة الافتراضية، واستراتيجية البادئة تأتي من إعدادات `routing` في Intlayer. وإذا كنت تستخدم مسارات `pathnames` المترجمة في `next-intl` (`/about` إلى `/a-propos`)، فإن المحول لا يستنبطها؛ بينما يغطي `routing.rewrite` في Intlayer تلك الحالة ولكنه تغيير منفصل.

</Accordion>
<Accordion header="useTranslations() بدون مساحة أسماء ليست مرتبطة">

تحتاج مرحلة التحسين إلى مساحة أسماء ثابتة لمعرفة أي قاموس يجب استيراده. الاستدعاء البسيط بدون مساحة أسماء يستمر في العمل عبر سجل وقت التشغيل الذي يشير إلى كل قاموس، وهو بالضبط التسريب الذي تحاول التخلص منه. قم بتمرير مساحة الاسم.

</Accordion>
<Accordion header="المحول ليس مجانياً من حيث الحجم">

8.0 كيلوبايت لوقت التشغيل مقابل 5.5 كيلوبايت لـ `next-intlayer`، و +6-7 كيلوبايت لكل صفحة مقارنة بالبناء الأصلي. هذا هو ثمن توفير واجهة برمجة تطبيقات `next-intl`. وعندما يتم نقل كل مكون إلى `useIntlayer`، قم بإزالة المحول.

</Accordion>
<Accordion header="يتم تجاهل messages و timeZone و now في المزود">

تعتمد أدوات التنسيق على `Intl` الأصلي وتؤثر اللغة فقط على مخرجاتها. إذا كنت تعتمد على منطقة زمنية مفروضة أو قيمة `now` ثابتة لتواريخ مستقرة أثناء الـ Hydration، فتعامل مع ذلك في موضع الاستدعاء. راجع [تنسيق التاريخ والوقت والأرقام](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ar/date_time_number_formatting_locales.md).

</Accordion>
</AccordionGroup>

## متى تستخدم أيًا منها؟

<AccordionGroup>
<Accordion header="البقاء على next-intl">

إذا كان تطبيقك صغيراً، وحجم الحزمة لا يشكل مصدر قلق، وفريقك مرتاح في إدارة مساحات الأسماء و `pick()` لكل صفحة.

</Accordion>
<Accordion header="استخدام @intlayer/next-intl">

أنت تستخدم `next-intl` اليوم وتريد مكاسب الحزمة ومنع التسريب والـ Hydration السريع والمفاتيح المكتوبة وأدوات CLI / CMS دون الحاجة إلى إعادة كتابة الكود. هذه هي نقطة البداية الموصى بها لأي قاعدة كود `next-intl` حالية.

</Accordion>
<Accordion header="الانتقال إلى الحل الأصلي (next-intlayer)">

للمشاريع الجديدة، أو بمجرد أن يكمل المحول مهمته الانتقالية. إنه الأخف بين الخيارات الثلاثة (5.5 كيلوبايت، +0.3 كيلوبايت لكل صفحة) ويفعل مكونات الخادم المتزامنة، وملفات `.content.ts` لكل مكون، وكامل مجموعة الميزات. ابدأ مع [Intlayer مع Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_with_nextjs_16.md).

</Accordion>
</AccordionGroup>

## الأسئلة الشائعة

<FAQ>

<Question title="هل يظل كود تطبيقي دون أي تعديل بالفعل؟">

في Next.js، نعم بالنسبة للمكونات: عدل بناء الاختبار `next.config.ts` و `intlayer.config.ts` فقط. وتصبح `getRequestConfig` في `src/i18n.ts`، وخاصية `messages` في المزود، واستدعاءات `pick()` لكل صفحة بمثابة كود غير مستخدم يمكنك حذفه لاحقاً.

</Question>

<Question title="ماذا يحدث لرسائل ICU؟">

تستمر في العمل. يتم حل `t("key", { count })` و `t.rich()` و `t.markup()` و `select` و `selectordinal` و `#` و `{ts, date, long}` بواسطة محلل ICU الخاص بـ Intlayer. راجع [تنسيق رسائل ICU](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en/icu_message_format.md).

</Question>

<Question title="لماذا المحول أثقل من next-intlayer الأصلي؟">

لأنه يحمل واجهة برمجة تطبيقات `next-intl` فوق نواة Intlayer: `useFormatter` و `t.rich` ومحلل ICU ومساعدات التنقل. وهذا يعادل 8.0 كيلوبايت مقابل 5.5 كيلوبايت، و +6 كيلوبايت لكل صفحة. إنه جسر عبور وليس الوجهة النهائية.

</Question>

<Question title="هل يمكنني الترحيل مكوناً تلو الآخر؟">

نعم. يمكن لأي مكون الانتقال من `useTranslations("about")` إلى `useIntlayer("about")` مع ملف `.content.ts` مجاور له. تتعايش قواميس JSON و `.content.ts` وتندمج بسلاسة.

</Question>

<Question title="هل تعمل أسماء المسارات المترجمة (pathnames)؟">

ليس من خلال `pathnames` الخاصة بـ `next-intl`: يقبلها المحول لغرض التحقق من الأنواع فقط ولكنه لا يستنبطها. استخدم بدلاً من ذلك `routing.rewrite` من Intlayer.

</Question>

</FAQ>

## المقارنات ذات الصلة

نفس سلسلة المحولات:

- [i18next vs @intlayer/i18next](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ar/i18next_vs_intlayer-i18next.md)
- [Lingui vs @intlayer/lingui](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ar/lingui_vs_intlayer-lingui.md)
- [vue-i18n vs @intlayer/vue-i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ar/vue-i18n_vs_intlayer-vue-i18n.md)

مقارنة مباشرة بين المكتبات:

- [next-intl vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ar/next-intl_vs_intlayer.md), نفس الاختبار المرجعي
- [next-i18next vs next-intl vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ar/next-i18next_vs_next-intl_vs_intlayer.md)
- [Is next-intl outdated?](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ar/is_next-intl_outdated.md)

وثائق مرجعية:

- [Compat adapter: next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/compat/next-intl.md)
- [دليل الترحيل: من next-intl إلى Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/migration_from_next-intl_to_intlayer.md)
- [تقرير قياس أداء Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/benchmark/nextjs.md) و [تقرير قياس أداء TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/benchmark/tanstack.md)
- [تحسين الحزمة](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/bundle_optimization.md) و [مترجم Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/compiler.md)
- [المحرر المرئي](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_visual_editor.md)، [نظام إدارة المحتوى CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_CMS.md) و [الترجمة بالذكاء الاصطناعي](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/autoFill.md)

## الخلاصة

`@intlayer/next-intl` يفعل شيء واحد: يغير ما يرتبط به `useTranslations`، من موفر يحتوي على كل رسالة إلى قاموس مترجم لهذا المكون. على نفس تطبيق Next.js الذي يستحق **6 KB لكل صفحة**، **مكونات أصغر بـ 2.7 مرة**، **0% تسرب** و **2 ms من المرطوبة**، قبل أن يفتح أي شخص ملف مكون. التنقل والبرنامج الوسيط يحتفظان بـ API الخاص بهما على أساس تكوين التوجيه الخاص بـ Intlayer، و runtime `next-intlayer` الأصلي يبقى أخف وزنا.

جميع البيانات الأولية وتطبيقات الاختبار والبرامج النصية موجودة في [مستودع Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom). قم بتشغيلها بنفسك.

راجع [وثيقة 'Why Intlayer?'](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/interest_of_intlayer.md) للمزيد من التفاصيل.
