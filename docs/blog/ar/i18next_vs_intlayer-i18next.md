---
createdAt: 2026-09-13
updatedAt: 2026-09-13
title: "مقارنة i18next مقابل @intlayer/i18next: نفس واجهة البرمجة (API)، وحزمة برمجية مختلفة تماماً"
description: "ما الذي يتغير عندما يحتفظ تطبيق React أو Next.js باستدعاءات i18next و react-i18next و next-i18next ولكنه يخدمها من خلال محولات @intlayer/i18next. قياسات حجم JavaScript لكل صفحة، وحجم المكونات، وتسريب النصوص، والترطيب على نفس الشيفرة البرمجية."
keywords:
  - i18next
  - react-i18next
  - next-i18next
  - "@intlayer/i18next"
  - "@intlayer/react-i18next"
  - "@intlayer/next-i18next"
  - Intlayer
  - محول التوافق
  - هجرة
  - تدويل
  - i18n
  - اختبار الأداء
  - حجم الحزمة
  - مدونة
  - Next.js
  - React
slugs:
  - blog
  - i18next-vs-intlayer-i18next
author: aymericzip
---

# مقارنة i18next مقابل @intlayer/i18next | نفس واجهة البرمجة (API)، وحزمة برمجية مختلفة تماماً

تُعد `@intlayer/i18next` و `@intlayer/react-i18next` و `@intlayer/next-i18next` محولات توافقية. إنها توفر نفس واجهة برمجة التطبيقات (API) الخاصة بـ `i18next` التي تستخدمها بالفعل في شيفرتك البرمجية (`useTranslation`، `t()`، `<Trans>`، `i18n.changeLanguage()`، `getFixedT`، `serverSideTranslations`...) وتقدمها من خلال قواميس مبنية ومترجمة بواسطة Intlayer. المكونات لا تتغير إطلاقاً، بل إن بيئة التشغيل الأساسية تحتها هي التي تتغير.

يقيس هذا المقال ذلك الاستبدال على نفس تطبيق Next.js، حيث تم بناؤه مرة باستخدام `next-i18next` ومرة أخرى باستخدام `@intlayer/next-i18next`. الأرقام مأخوذة من مشروع [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom). للمقارنة بين `i18next` و Intlayer كمكتبات مستقلة، يرجى قراءة [مقارنة i18next مقابل Intlayer](https://intlayer.org/ar/blog/i18next-vs-intlayer). أما هذا المقال، فيركز على ما يغيره المحول عندما تحتفظ بشيفرتك البرمجية كما هي.

<TOC/>

> **ملخص سريع (tl;dr)**: في نفس تطبيق Next.js، أدى استبدال `next-i18next` بـ `@intlayer/next-i18next` إلى خفض حجم JavaScript المضغوط (gzip) لكل صفحة من **218.5 كيلوبايت إلى 150.7 كيلوبايت** (في التكوين الأولي البسيط) وتفوق على تكوين `next-i18next` المحسّن بالكامل (163.4 كيلوبايت) بفارق **12.7 كيلوبايت**. وانخفض متوسط حجم المكون من **78.5 كيلوبايت إلى 9.7 كيلوبايت**، وتراجع تسريب نصوص الصفحات غير المعروضة من **~90% إلى 0%**، وانخفض وقت الترطيب (hydration) من **15.6 مللي ثانية إلى 11.3 مللي ثانية**، وتراجع حجم بيئة التشغيل من **19.7 كيلوبايت إلى 9.4 كيلوبايت**. لم يتم تعديل أي مكون؛ تم تعديل ملف مزود واحد فقط. يتم قبول إضافات `i18next` (مثل الخلفيات وكواشف اللغة) ولكنها لا تفعل شيئاً: لا يوجد شيء إضافي ليتم تحميله أو اكتشافه في وقت التشغيل.

## ما هو `@intlayer/i18next`

`i18next` هي بيئة تشغيل runtime. تقوم الدالة `i18n.init({ resources })` أو إضافة الواجهة الخلفية بتحميل ملفات `locales/{lng}/{ns}.json` في كائن عام (global instance)؛ وتقوم `useTranslation("about")` بربط المكون به؛ وتقوم `t("title")` بالبحث عن المفتاح أثناء التصيير. تقع على عاتقك مسؤولية ضبط وإدارة مساحات الأسماء والتحميل الكسول وقوائم مساحات الأسماء لكل صفحة وسلامة الأنواع.

تحافظ المحولات على نفس واجهة البرمجة وتستبدل الكائن العام:

1. **الأسماء المستعارة للاستيراد (Import Aliasing).** تقوم `createNextI18nPlugin()` من حزمة `@intlayer/next-i18next/plugin` (أو `withI18next`) بتغليف `withIntlayer` وإضافة أسماء مستعارة لـ Webpack / Turbopack بحيث يتم توجيه استيرادات `next-i18next` و `react-i18next` و `i18next` إلى نظيراتها في `@intlayer/*`. وفي Vite، تؤدي `reactI18nextVitePlugin()` من حزمة `@intlayer/react-i18next/plugin` نفس الغرض. لا حاجة لتغيير أي عبارة استيراد.
2. **اعتماد JSON كمصدر وحيد للحقيقة.** يقرأ ملحق `syncJSON` ملفاتك الحالية `locales/{lng}/{ns}.json` مع إعداد `format: "i18next"` (بحيث يتم تحليل `{{name}}` وتداخل `$t()` وصيغ `_one` / `_other` وسياقات النصوص بدقة) ويكتب الترجمات مرة أخرى عندما تقوم واجهة الأوامر CLI أو نظام إدارة المحتوى CMS بتحديثها.
3. **الربط عند نقطة الاستدعاء.** تقوم مرحلة التحسين في Intlayer بإعادة كتابة `useTranslation("about")` لتصبح استدعاءً يستلم مباشرة قاموس `about` في اللغة النشطة. يتوقف المكون تماماً عن الوصول إلى المخزن العام.

```tsx fileName="components/About.tsx"
// الشيفرة البرمجية الخاصة بك، بدون أي تغيير
import { useTranslation } from "react-i18next";

const About = () => {
  const { t } = useTranslation("about");
  return <h1>{t("title")}</h1>;
};
```

```tsx fileName="ما يخرجه المترجم (صيغة مبسطة)"
import _dicHash_about from "../.intlayer/dictionaries/about.mjs";
import { useDictionary as useTranslation } from "@intlayer/react-i18next";

const About = () => {
  const { t } = useTranslation(_dicHash_about);
  return <h1>{t("title")}</h1>;
};
```

هذه الإعادة في الكتابة هي المسؤولة عن تقليص حجم المكونات والقضاء التام على تسريب نصوص الصفحات في النتائج التالية.

## ما تحتفظ به المحولات، وما تتجاهله، وما لا يمكنها استبداله

| واجهة برمجة `i18next`                                                           | مع حزم `@intlayer/*`                                                                                           |
| ------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| `useTranslation("ns")`, `useTranslation("ns", { keyPrefix })`                   | ✅ تم الاحتفاظ بها. مرتبطة بقاموس `ns` وقت البناء؛ ومفحوصة الأنواع وفق محتواك                                  |
| `t("key", { name })`, `{{interpolation}}`, تداخل `$t(key)`                      | ✅ تم الاحتفاظ بها                                                                                             |
| صيغ الجمع `key_one` / `key_other`, سياق `key_male`, `returnObjects`             | ✅ تم الاحتفاظ بها. تُحسب صيغ الجمع باستخدام `Intl.PluralRules`                                                |
| `<Trans>` مع `components`، والوسوم المرقمة `<1>...</1>`، و `values`             | ✅ تم الاحتفاظ بها                                                                                             |
| `withTranslation`, `Translation`, `I18nContext`                                 | ✅ تم الاحتفاظ بها                                                                                             |
| `i18n.changeLanguage()`, `i18n.language`, `i18n.dir()`, `on("languageChanged")` | ✅ تم الاحتفاظ بها. تقود `changeLanguage` لغة Intlayer                                                         |
| `getFixedT(lng, ns, keyPrefix)`, `i18n.exists()`, `hasLoadedNamespace()`        | ✅ تم الاحتفاظ بها                                                                                             |
| `i18n.use(Backend).use(LanguageDetector).init({...})`                           | ⚠️ تقوم `use()` باستدعاء `init` للملحق ثم تنتهي؛ لا يوجد شيء لتحميله أو اكتشافه في الخلفيات                    |
| `init({ resources })`, `addResourceBundle()`                                    | ⚠️ يتم **تجاهل** `resources` مع إظهار تحذير في بيئة التطوير؛ احذف استيرادات JSON للحصول على فوائد تصغير الحزمة |
| `I18nextProvider i18n={i18n}`                                                   | ⚠️ تقوم بتصيير `IntlayerProvider`؛ ويتم تجاهل خاصية `i18n`. في App Router، مرر اللغة مباشرة (انظر أدناه)       |
| `serverSideTranslations(locale, ["common"])` (next-i18next)                     | ⚠️ تعيد الهيكل المتوقع ولا تقوم بتحميل أي شيء. آمنة للإبقاء، وآمنة للحذف                                       |
| `appWithTranslation(App)` (next-i18next)                                        | ✅ تم الاحتفاظ بها                                                                                             |
| `next-i18next.config.js`                                                        | ⚠️ لا يتم قراءتها. يتم ضبط اللغات في ملف `intlayer.config.ts`                                                  |
| استدعاء `useTranslation()` البسيط بدون مساحة أسماء                              | ✅ يعمل بالاعتماد على قاموس `translation` الكامل للملف (`splitKeys: false`)                                    |

## اختبار الأداء المقارن

### ما تم قياسه

تقوم حزمة [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom) ببناء **نفس التطبيق تماماً** في كل إعداد: **10 صفحات** (الرئيسية، من نحن، المدونة، الوظائف، اتصل بنا، الأسئلة الشائعة، الأسعار، المنتجات، الإعدادات، الفريق)، و **10 لغات** (`en`, `fr`, `es`, `de`, `it`, `pt`, `zh`, `ja`, `ko`, `ru`)، ومكونات ومحتوى متطابق تماماً. تم قياس الصفحات في اللغتين الإنجليزية والفرنسية.

تم اختبار `next-i18next` عبر أربع استراتيجيات تحميل، بدءاً من استيراد ملفات JSON لجميع اللغات مباشرة في `resources` (`static`) إلى تقسيم مساحات الأسماء لكل مسار مع التحميل الكسول عبر واجهة خلفية (`scoped-dynamic`). بينما تم بناء المحول على **نفس مكونات الإعداد الأولي البسيط**، مع تعديل ملفات `next.config.ts` و `intlayer.config.ts` وملف المزود فقط. لا يحتاج المحول إلى تقسيم يدوي: يتولى المترجم تخصيص نطاق المحتوى لكل مكون تلقائياً.

سجل الاختبار لكل بناء:

- **حجم المكتبة**: حجم gzip لمكون فارغ يستورد مكتبة i18n فقط.
- **حجم JS لكل صفحة**: متوسط ملفات JavaScript المنزلة لكل صفحة عبر جميع اللغات والصفحات (gzip).
- **نسبة تسريب اللغات**: نسبة السلاسل النصية المترجمة في ملف JS المنزّل والتي تنتمي إلى لغة **لا** يشاهدها المستخدم حالياً.
- **نسبة تسريب الصفحات**: نسبة السلاسل النصية المترجمة في ملف JS المنزّل والتي تنتمي إلى صفحة **لا** يتواجد فيها المستخدم حالياً.
- **متوسط حجم المكون**: متوسط حجم gzip لكل مكون تم تجميعه بشكل معزول.
- **تفاعلية E2E**: الوقت الفعلي المستغرق بين اختيار لغة جديدة وتحديث سمة `html[lang]` في صفحة الويب (Playwright، عبر 5 تكرارات).
- **الترطيب (Hydration)**: المدة الزمنية لمرحلة ترطيب React.

> الأرقام أدناه مأخوذة من اختبار أُجري بتاريخ **12-09-2026** باستخدام `next-i18next` 16.3.0 (`react-i18next` 17.0.13, `i18next` 26.4.2) و `@intlayer/next-i18next` 9.5.1. تم تصميم تطبيق الاختبار عمداً ليكون صغيراً، لذا فإن نسب التسريب توضح **نمطاً سلوكياً**: تتسع هذه النسب مع نمو محتوى تطبيقك، في حين تبقى التكلفة الثابتة لبيئة التشغيل مستقرة.

### النتائج على Next.js

| الإعداد                      | الاستراتيجية   | حجم المكتبة (gz) | متوسط JS للصفحة (gz) | تسريب اللغات | تسريب الصفحات | متوسط المكون (gz) | تفاعلية E2E |     الترطيب |
| ---------------------------- | -------------- | ---------------: | -------------------: | -----------: | ------------: | ----------------: | ----------: | ----------: |
| **الأساس** (بدون i18n)       | -              |           0.0 KB |             141.0 KB |         0.0% |          0.0% |            0.9 KB |     13.4 ms |     11.8 ms |
| `next-i18next`               | static         |          19.7 KB |             218.5 KB |         0.0% |         89.8% |           78.5 KB |     16.4 ms |     15.6 ms |
| `next-i18next`               | dynamic        |          19.7 KB |             169.5 KB |        50.0% |         89.8% |           26.1 KB |     15.4 ms |     27.7 ms |
| `next-i18next`               | scoped-static  |          19.7 KB |             220.1 KB |         0.0% |         89.8% |           78.9 KB |     16.4 ms |     14.7 ms |
| `next-i18next`               | scoped-dynamic |          19.7 KB |             163.4 KB |         0.0% |          0.0% |           27.1 KB |     15.9 ms |     15.1 ms |
| **`@intlayer/next-i18next`** | static         |       **9.4 KB** |         **150.7 KB** |     **0.0%** |      **0.0%** |        **9.7 KB** | **10.7 ms** | **11.3 ms** |
| **`@intlayer/next-i18next`** | dynamic        |       **9.4 KB** |         **150.7 KB** |     **0.0%** |      **0.0%** |        **9.7 KB** | **11.9 ms** | **10.6 ms** |
| `next-intlayer` (الأصلي)     | static         |           5.5 KB |             141.3 KB |         0.0% |          0.0% |            8.5 KB |     15.5 ms |     16.9 ms |
| `next-intlayer` (الأصلي)     | dynamic        |           5.5 KB |             141.3 KB |         0.0% |          0.0% |            6.9 KB |     15.3 ms |     15.9 ms |

**قراءة البيانات وتحليلها**

- **توفير 68 كيلوبايت لكل صفحة مقارنة بالإعداد البسيط.** يقوم الإعداد البسيط `resources: { en, fr, ... }` بإرسال جميع اللغات وجميع مساحات الأسماء في كل صفحة ليصل إلى **218.5 كيلوبايت**. أما بناء نفس المكونات باستخدام المحول فيصل إلى **150.7 كيلوبايت**. كما يتفوق على أفضل تكوين مخصص لـ `next-i18next` (163.4 كيلوبايت) بفارق 12.7 كيلوبايت، لأن بيئة تشغيل `i18next` وحدها تزن 19.7 كيلوبايت مقابل 9.4 كيلوبايت للمحول.
- **تراجع التسريب إلى 0% دون لمس أي مكون.** ترسل جميع إعدادات `next-i18next` (باستثناء الإعداد المقسم يدوياً بالكامل) ما يقارب 90% من نصوص الصفحات الأخرى غير المطلوبة. ونمط `dynamic` أسوأ مما يبدو: فهو لا يقضي على تسريب الصفحات ويضيف **50% تسريب لغات**، لأن الواجهة الخلفية الخاصة باللغة ما زالت تسحب كامل مساحة الأسماء `translation`. يبلغ المحول نسبة 0% / 0% انطلاقاً من الشيفرة الأصلية مباشرة.
- **مكونات أصغر بمقدار 8 أضعاف.** يزن المكون المعتمد على `useTranslation()` والمبني بمفرده متوسط **78.5 كيلوبايت** عند تضمين `resources`، و **26-27 كيلوبايت** مع الواجهة الخلفية، نظراً لارتباط `t` بالمخزن العام. ومع المحول، ينخفض متوسط الحجم إلى **9.7 كيلوبايت**.
- **ترطيب أسرع وتبديل لغات أكثر سلاسة.** انخفض وقت الترطيب من 15.6 مللي ثانية إلى **11.3 مللي ثانية** (ومن 27.7 مللي ثانية في نمط `dynamic` حيث يعيق جلب البيانات المسار الحرج). وتحسن وقت تبديل اللغة من 15-16 مللي ثانية إلى **11-12 مللي ثانية**.
- **المحول ليس هو بيئة التشغيل الأصلية.** تبلغ حزمة `next-intlayer` الأصلية **141.3 كيلوبايت** (+0.3 كيلوبايت فقط فوق التطبيق الأساسي الخالي من اللغات). بينما يحمل المحول طبقة توافق واجهة `i18next` فوق نواة Intlayer ليضيف 9.4 كيلوبايت لكل صفحة مقارنة بالنسخة الأصلية. المحول هو جسر عبور مريح، وليس المحطة النهائية.

> لم يكن محول `react-i18next` على Vite / TanStack Start جزءاً من هذا الاختبار المحدد. يمكن الاطلاع على قياسات `react-i18next` على TanStack Start في مقال [i18next vs Intlayer](https://intlayer.org/ar/blog/i18next-vs-intlayer).

## لماذا تتحسن هذه المؤشرات

لم تتغير أي شيفرة داخل مجلد `components/`، وبالتالي فإن كل هذه المكاسب ناتجة عن الكيان الذي ترتبط به الدالة `useTranslation`.

**مع `i18next`**، يتم الربط مع الكائن العام. كل ما يتم تحميله فيه (جميع اللغات في `static`، ومساحة الأسماء الكاملة للغة في `dynamic`) يصبح في متناول أي مكون يستدعي `useTranslation()`. ولا يستطيع مجمع الحزم تقسيم الملفات إلى وحدات أصغر مما يحتفظ به الكائن، كما تعجز بيئة التشغيل عن التنبؤ بالمفاتيح المطلوبة أثناء التصيير.

```bash
.
├── next-i18next.config.js
├── public/locales
│   ├── en/translation.json           # نصوص كافة الصفحات مجتمعة
│   └── fr/translation.json
├── i18n/i18n.ts                      # i18n.use(initReactI18next).init({ resources })
└── components
    ├── AppProviders.tsx              # <I18nextProvider i18n={i18n}>
    └── About.tsx                     # useTranslation(); t("about.title")
```

**مع `@intlayer/next-i18next`**، يتم الربط مباشرة بالقاموس. يقوم ملحق `syncJSON` بتحويل كل ملف مساحة أسماء إلى قاموس مخصص؛ وتمرر مرحلة التحسين للمكون القاموس المعني مباشرة في صورة استيراد يستطيع مجمع الحزم تتبعه وتقسيمه لكل صفحة ولكل لغة بدقة.

```bash
.
├── intlayer.config.ts                # syncJSON({ format: "i18next", source: ... })
├── public/locales
│   ├── en/translation.json           # بدون تغيير، يظل المصدر الحقيقي
│   └── fr/translation.json
├── .intlayer/                        # مولد تلقائياً: قاموس لكل مساحة أسماء ولكل لغة
└── components
    ├── AppProviders.tsx              # <IntlayerClientProvider locale={locale}>
    └── About.tsx                     # useTranslation(); t("about.title")  ← دون تغيير
```

يتحول ملف `i18n/i18n.ts` واستيراد `resources` إلى شيفرة ميتة يتم التخلص منها تلقائياً. وهذا ما يوفر 68 كيلوبايت كاملة.

## الهجرة في ثلاث خطوات

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

يكتشف الأمر وجود `i18next` / `react-i18next` / `next-i18next`، ويثبت `intlayer` وحزمة إطار العمل المعنية (`next-intlayer` أو `react-intlayer`) ومحول `@intlayer/*` المناسب مع ملحق `@intlayer/sync-json-plugin`، ويجهز إعدادات `intlayer.config.ts`. احتفظ بالحزم الأصلية مثبتة لديك، لأنها توفر تعريفات TypeScript وتعمل كاعتماديات نظيرة.

</Step>
<Step number={2} title="توجيه Intlayer إلى ملفات الترجمة الحالية">

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  dictionary: {
    importMode: "dynamic",
    format: "i18next",
  },
  plugins: [
    syncJSON({
      // نمط i18next: يدعم {{name}} و $t(key) وصيغ الجمع _one / _other والسياق
      format: "i18next",
      // ملف لكل مساحة أسماء: `useTranslation("about")` ← about.json
      source: ({ locale, key }) => `./public/locales/${locale}/${key}.json`,
      location: "public/locales",
    }),
  ],
};

export default config;
```

إذا كنت تمتلك ملفاً واحداً باسم `translation.json` لكل لغة (مساحة الأسماء الافتراضية في i18next)، فقم بتعيين `splitKeys: false` بحيث يظل الملف بأكمله قاموساً واحداً وتستمر استدعاءات `useTranslation()` المباشرة في العمل دون مشاكل.

</Step>
<Step number={3} title="إضافة الملحق">

<Tabs>
<Tab label="Next.js">

```ts fileName="next.config.ts"
import type { NextConfig } from "next";
import { withI18next } from "@intlayer/next-i18next/plugin";

const nextConfig: NextConfig = {};

export default withI18next(nextConfig);
```

في بنية App Router، تستقبل مكونات العميل اللغة من جزء المسار `[locale]`. لا يستقبل `I18nextProvider` الخاص بالمحول خاصية اللغة، لذا قم باستبداله لمرة واحدة فقط في ملف المزود الرئيسي:

```tsx fileName="components/AppProviders.tsx"
"use client";

import { IntlayerClientProvider } from "next-intlayer";
import type { LocalesValues } from "intlayer";

export const AppProviders = ({
  locale,
  children,
}: {
  locale: LocalesValues;
  children: React.ReactNode;
}) => (
  <IntlayerClientProvider locale={locale}>{children}</IntlayerClientProvider>
);
```

جميع المكونات الموجودة تحته تستمر في استدعاء `useTranslation()` بشكل طبيعي وبدون أي تغيير.

</Tab>
<Tab label="Vite / TanStack Start">

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { reactI18nextVitePlugin } from "@intlayer/react-i18next/plugin";

export default defineConfig({
  plugins: [react(), reactI18nextVitePlugin()],
});
```

تغلف `reactI18nextVitePlugin()` ملحق `vite-intlayer` وتنشئ الأسماء المستعارة لـ `react-i18next` و `i18next`. للمشاريع غير المعتمدة على React، تقوم `i18nextVitePlugin()` من حزمة `@intlayer/i18next/plugin` بتعيين الاسم المستعار لـ `i18next` بمفردها.

</Tab>
</Tabs>

</Step>
</Steps>

### ما يمكنك حذفه بعد الانتهاء

| الملف / النمط                                          | السبب                                                                                    |
| ------------------------------------------------------ | ---------------------------------------------------------------------------------------- |
| `resources: { en, fr, ... }` واستيرادات JSON           | يتم تجاهلها بواسطة المحول؛ ومن هنا جاءت إزالة الـ 68 كيلوبايت الفائضة                    |
| `i18next-http-backend`, `i18next-resources-to-backend` | لم يعد هناك شيء لجلبه في وقت التشغيل عبر الشبكة                                          |
| `i18next-browser-languagedetector`                     | أصبح اكتشاف اللغة يدار عبر توجيه Intlayer (بادئة الرابط، ملفات تعريف الارتباط، الترويسة) |
| استدعاء `serverSideTranslations()` في `getStaticProps` | يعيد كائناً فارغاً؛ وجوده غير ضار لكنه غير ضروري                                         |
| `next-i18next.config.js`                               | لا يتم قراءته؛ تُدار اللغات مركزياً في `intlayer.config.ts`                              |
| قوائم `ns: [...]` المحددة لكل صفحة                     | يحدد المترجم مساحات الأسماء المطلوبة لكل مكون تلقائياً                                   |

### ما تكسبه بجانب تقليص الحجم

- **مفاتيح محكمة الأنواع.** يتم ربط `useTranslation("about")` بالأنواع البرمجية الخاصة بالقاموس `about`؛ واستخدام مفتاح غير موجود مثل `t("does.not.exist")` يولد خطأ TypeScript فوري أثناء التطوير بدلاً من إعادة نص المفتاح كخطأ صامت.
- **أوامر الفحص `npx intlayer test`** التي توقف عمليات الـ CI عند وجود مفتاح مفقود في أي لغة. ويتولى أمر **`npx intlayer fill`** ترجمة المفاتيح الناقصة باستخدام مفتاح الذكاء الاصطناعي الخاص بك (OpenAI, Anthropic, Mistral, Gemini...) وكتابتها في ملفات `locales/{lng}/{ns}.json`.
- **محرر بصري ونظام CMS** يعملان على نفس ملفات JSON، مما يتيح للمترجمين التعديل عبر واجهة مستخدم مباشرة مع تحديث ملفات Git تلقائياً.
- **هجرة تدريجية نحو ملفات `.content.ts`.** يمكن لأي مكون أن ينتقل بمفرده من `useTranslation("about")` إلى `useIntlayer("about")` بملف محتوى مجاور له، مع تعايش ملفات JSON و `.content.ts` معاً بانسجام.

## قيود يجب معرفتها قبل البدء

- **الواجهات الخلفية والكواشف غير فعالة.** تستدعي `i18n.use(HttpBackend)` دالة `init` الخاصة بالملحق فقط. وإذا كان تطبيقك يعتمد على جلب الترجمات في وقت الطلب من نظام CMS خارجي، فإن هذا المسار يتوقف؛ استخدم بدلاً من ذلك نظام Intlayer CMS أو أوامر `intlayer pull` / `push`.
- **يتم تجاهل `resources` بدلاً من دمجها.** على عكس بعض المحولات السطحية، لا يستخدم `@intlayer/i18next` كائن `resources` المضمن كحل احتياطي. يجب أن يتواجد كل مفتاح في القواميس المتزامنة فعلياً، وهو ما يؤكده أمر `intlayer test`.
- **يحتاج App Router إلى تعديل ملف المزود.** ملف واحد فقط، كما هو موضح أعلاه. بينما لا يتطلب Pages Router مع `appWithTranslation` أي تعديل.
- **لا يتم قراءة `next-i18next.config.js`.** خيارات مثل `localePath` و `fallbackLng` و `reloadOnPrerender` تتوقف عن العمل؛ وتُدار اللغات والبدائل حصرياً داخل `intlayer.config.ts`.
- **المحول ليس مجانياً تماماً من حيث الحجم.** يزن المحول 9.4 كيلوبايت وقت التشغيل ويضيف +9.4 كيلوبايت لكل صفحة مقارنة بنواة `next-intlayer` الصافية. وبمجرد تحويل جميع المكونات إلى `useIntlayer`، يمكنك حذفه تماماً.

## متى تستخدم كل خيار؟

- **ابقَ على `i18next`**: إذا كان تطبيقك يعتمد بالضرورة على واجهات خلفية لجلب النصوص وقت الطلب عبر الشبكة، أو على منظومة إضافات مخصصة، أو على بيئة عمل خارج نطاق React لا تدعمها المحولات.
- **استخدم `@intlayer/*`**: إذا كنت تستخدم `react-i18next` / `next-i18next` وتريد خفض 68 كيلوبايت، وتصغير المكونات 8 مرات، والقضاء على التسريب بنسبة 0%، والحصول على أمان الأنواع واختبارات الـ CI دون الحاجة لإعادة كتابة مكوناتك. هذا هو الخيار الأمثل للمشاريع القائمة.
- **انتقل إلى البنية الأصلية (`next-intlayer` / `react-intlayer`)**: للمشاريع الجديدة، أو بمجرد استقرارك بعد مرحلة المحول. إنها الخيار الأخف على الإطلاق (5.5 كيلوبايت، و+0.3 كيلوبايت فقط لكل صفحة) وتتيح المكونات السيرفرية المتزامنة وملفات `.content.ts` لكل مكون.

## مقارنات ذات صلة

- [i18next vs Intlayer](https://intlayer.org/ar/blog/i18next-vs-intlayer) (مقارنة المكتبات على نفس مقياس الأداء)
- [next-intl vs @intlayer/next-intl](https://intlayer.org/ar/blog/next-intl-vs-intlayer-next-intl) (نفس سلسلة المحولات)
- [Lingui vs @intlayer/lingui](https://intlayer.org/ar/blog/lingui-vs-intlayer-lingui) (نفس سلسلة المحولات)
- [vue-i18n vs @intlayer/vue-i18n](https://intlayer.org/ar/blog/vue-i18n-vs-intlayer-vue-i18n) (نفس سلسلة المحولات)
- أدلة الهجرة: [i18next](https://intlayer.org/ar/doc/migration/i18next), [react-i18next](https://intlayer.org/ar/doc/migration/react-i18next), [next-i18next](https://intlayer.org/ar/doc/migration/next-i18next)
- مراجع المحولات التوافقية: [i18next](https://intlayer.org/ar/doc/compatibility/i18next), [react-i18next](https://intlayer.org/ar/doc/compatibility/react-i18next), [next-i18next](https://intlayer.org/ar/doc/compatibility/next-i18next)

## الخاتمة

يعد `i18next` أثقل بيئة تشغيل في اختبار الأداء هذا، وتقوم المحولات بالتخلص من معظم وزنه الزائد دون أن تطلب منك التخلي عن واجهة البرمجة التي اعتدت عليها. في نفس تطبيق Next.js، يعني ذلك **توفير 68 كيلوبايت لكل صفحة** مقارنة بالإعداد البسيط، و **12.7 كيلوبايت أقل** من أفضل إعداد محسّن يدوياً، مع **مكونات أصغر بـ 8 مرات**، و **0% تسريب نصوص**، و **تحسن الترطيب بـ 4 مللي ثانية**، مقابل ملف إعدادات وسطر ملحق وتعديل بسيط لملف المزود.

جميع البيانات الأولية والتطبيقات الاختبارية والبرمجيات النصية متوفرة في [مستودع Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom). يمكنك مراجعتها واختبارها بنفسك.

راجع توثيق [لماذا Intlayer؟](https://intlayer.org/ar/doc/why) لمزيد من التفاصيل.
