---
createdAt: 2026-09-13
updatedAt: 2026-09-13
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

`@intlayer/next-intl` هو محول توافقية: يكشف API `next-intl` (`useTranslations`، `getTranslations`، `useLocale`، `t.rich()`، ICU plurals، `NextIntlClientProvider`...) ويقدمه من القواميس المجمعة بواسطة Intlayer. كود التطبيق لا يتغير. الـ bundle يتغير.

تقارن هذه المقالة بين الاثنين على نفس تطبيق Next.js، تم بناؤه مرة مع `next-intl` ومرة مع المحول. تأتي الأرقام من [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom)، مجموعة مفتوحة المصدر تسجل ما يقوم المتصفح بتنزيله فعلياً. إذا كنت تريد مقارنة `next-intl` مقابل Intlayer كمكتبات، اقرأ [next-intl vs Intlayer](https://intlayer.org/blog/next-intl-vs-intlayer). هذا يتعلق بما يغيره المحول عندما تحافظ على مكوناتك كما هي.

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

## لماذا تتحرك الأرقام

لم يتغير شيء في المكون، لذا تأتي المكاسب بالكامل من ما هو `useTranslations` مرتبطة به.

**مع `next-intl`**، الربط هو مع المزود. يتلقى `NextIntlClientProvider` كائن `messages` كاملًا للإعدادات المحلية؛ كل استدعاء `useTranslations("about")` يقرأ منه. يرى bundler مكونًا واحدًا يستورد hook واحدًا يقرأ سياقًا واحدًا، ولا يمكنه معرفة أن فرع `about` فقط هو المستخدم. تشارك المسارات أدناه نفس كائن الرسائل، لذلك يقرأ عمود تسرب الصفحة ~90% حتى تقسم الملف بنفسك.

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

- **يتم نقل إعدادات التوجيه إلى `intlayer.config.ts`.** تحتفظ دوال `createNavigation(routing)` و `createMiddleware(routing)` بتوقيعها لكنها تتجاهل الوسيط: تأتي locales واللغة الافتراضية واستراتيجية البادئة من إعدادات `routing` في Intlayer. إذا كنت تستخدم `pathnames` الموضعية في `next-intl` (`/about` → `/a-propos`)، فإن المحول لا يقوم بالاستيفاء؛ `routing.rewrite` في Intlayer يغطي هذه الحالة لكنها تغيير منفصل.
- **`useTranslations()` بدون مساحة اسم غير مرتبط.** تحتاج مرحلة التحسين إلى مساحة اسم ثابتة لمعرفة أي قاموس يجب استيراده. لا يزال الاستدعاء الأساسي يعمل، من خلال سجل وقت التشغيل الذي يشير إلى كل قاموس، وهو بالضبط التسرب الذي كنت تحاول إزالته. مرر مساحة الاسم.
- **المحول ليس مجانيًا.** 8.0 كيلوبايت من وقت التشغيل مقابل 5.5 كيلوبايت لـ `next-intlayer`، و+6-7 كيلوبايت لكل صفحة فوق البناء الأصلي. يغطي سطح API `next-intl`. إذا وصلت إلى نقطة حيث تم نقل كل مكون إلى `useIntlayer`، أسقط المحول.
- **`messages`, `timeZone`, `now` على المزود يتم تجاهلها.** يتم دعم المنسقات بواسطة `Intl` الأصلي والإعدادات المحلية فقط تؤثر على مخرجاتها؛ إذا كنت تعتمد على منطقة زمنية مفروضة أو `now` ثابتة لتواريخ مستقرة من حيث الترطيب، فتعامل معها في موقع الاستدعاء.

## متى تستخدم أيًا منها؟

- **ابقَ على `next-intl`** إذا كان تطبيقك صغيرًا، والحزمة ليست مصدر قلق، وفريقك مرتاح لامتلاك المساحات والقيام بـ `pick()` لكل صفحة.
- **استخدم `@intlayer/next-intl`** إذا كنت تستخدم `next-intl` حالياً وتريد تحسينات الحزمة والتسرب والتنويم، والمفاتيح المكتوبة بشكل صحيح وأدوات CLI / CMS دون إعادة كتابة. هذه هي نقطة الدخول الموصى بها لأي codebase `next-intl` موجود.
- **استخدم المحلل الأصلي (`next-intlayer`)** للمشاريع الجديدة، أو بعد انتهاء المحول من مهمته. إنها الأخف من بين الثلاثة (5.5 KB، +0.3 KB لكل صفحة) وتفتح مكونات الخادم المتزامنة وملفات `.content.ts` لكل مكون ومجموعة الميزات الكاملة.

## المقارنات ذات الصلة

- [next-intl vs Intlayer](https://intlayer.org/blog/next-intl-vs-intlayer) (المكتبات، نفس المعيار)
- [i18next vs @intlayer/i18next](https://intlayer.org/blog/i18next-vs-intlayer-i18next) (نفس سلسلة المحول)
- [Lingui vs @intlayer/lingui](https://intlayer.org/blog/lingui-vs-intlayer-lingui) (نفس سلسلة المحول)
- [vue-i18n vs @intlayer/vue-i18n](https://intlayer.org/blog/vue-i18n-vs-intlayer-vue-i18n) (نفس سلسلة المحول)
- [دليل الهجرة: next-intl إلى Intlayer](https://intlayer.org/doc/migration/next-intl)
- [مرجع محول التوافقية: next-intl](https://intlayer.org/doc/compatibility/next-intl)

## الخلاصة

`@intlayer/next-intl` يفعل شيء واحد: يغير ما يرتبط به `useTranslations`، من موفر يحتوي على كل رسالة إلى قاموس مترجم لهذا المكون. على نفس تطبيق Next.js الذي يستحق **6 KB لكل صفحة**، **مكونات أصغر بـ 2.7 مرة**، **0% تسرب** و **2 ms من المرطوبة**، قبل أن يفتح أي شخص ملف مكون. التنقل والبرنامج الوسيط يحتفظان بـ API الخاص بهما على أساس تكوين التوجيه الخاص بـ Intlayer، و runtime `next-intlayer` الأصلي يبقى أخف وزنا.

جميع البيانات الأولية وتطبيقات الاختبار والبرامج النصية موجودة في [مستودع Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom). قم بتشغيلها بنفسك.

راجع [وثيقة 'Why Intlayer?'](https://intlayer.org/doc/why) للمزيد من التفاصيل.
