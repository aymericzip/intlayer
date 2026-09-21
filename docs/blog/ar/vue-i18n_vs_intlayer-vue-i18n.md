---
createdAt: 2026-09-13
updatedAt: 2026-09-13
title: "vue-i18n مقابل @intlayer/vue-i18n: نفس الواجهة البرمجية، حزمة مختلفة"
description: ما الذي يتغير عندما تحتفظ تطبيقات Vue 3 باستدعاءات vue-i18n الخاصة بها لكنها تخدمها من خلال محول التوافق @intlayer/vue-i18n. JavaScript لكل صفحة، حجم وقت التشغيل، حجم المكون والتسرب المقاس على نفس كود Vite + Vue، بالإضافة إلى ما يحتفظ به المحول وما يتجاهله وما لا يمكنه استبداله.
keywords:
  - vue-i18n
  - "@intlayer/vue-i18n"
  - Intlayer
  - محول التوافق
  - الهجرة
  - الدولية
  - i18n
  - مقارنة الأداء
  - حجم الحزمة
  - مدونة
  - Vue
  - Nuxt
  - Vite
slugs:
  - blog
  - vue-i18n-vs-intlayer-vue-i18n
author: aymericzip
---

# vue-i18n مقابل @intlayer/vue-i18n | نفس الواجهة البرمجية، حزمة مختلفة

`@intlayer/vue-i18n` هو محول توافقي: يعرّض واجهة برمجية (API) من `vue-i18n` (`createI18n`، `useI18n`، `t()`، `d()`، `n()`، `$t`، `v-t`، `i18n.global.locale`...) ويقدمها من القواميس المترجمة بواسطة Intlayer. ملفات `.vue` الخاصة بك لا تتغير. ما يرتبط به `t("footer.github")` هو ما يتغير.

تقيس هذه المقالة هذا التبديل على نفس تطبيق Vite + Vue 3، تم بناؤه مرة واحدة باستخدام `vue-i18n` ومرة أخرى باستخدام المحول. تأتي الأرقام من [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom). لمقارنة `vue-i18n` و Intlayer كمكتبات، اقرأ [vue-i18n vs Intlayer](https://intlayer.org/blog/vue-i18n-vs-intlayer) و[vue-i18n vs Intlayer benchmark](https://intlayer.org/blog/vue-i18n-vs-intlayer-benchmark). هذا يتعلق بما يغيره المحول عندما تحتفظ بمكوناتك كما هي.

<TOC/>

> **ملخص سريع**: على نفس تطبيق Vite + Vue 3، استبدال `vue-i18n` بـ `@intlayer/vue-i18n` أخذ JavaScript لكل صفحة من **134.9 KB إلى 47.0 KB** gzip (التطبيق بدون i18n يزن 41.3 KB)، وقت التشغيل من **24.3 KB إلى 7.9 KB**، متوسط المكون من **196 KB إلى 8.4 KB**، وتسرب السلاسل النصية للصفحات الأجنبية من **90% إلى 0%**، بدون تعديل أي ملف `.vue`. `createI18n({ messages })` يستمر في العمل كخيار بديل؛ أزل استيراد JSON للحصول على الأرقام أعلاه. كتل SFC `<i18n>` و `setLocaleMessage()` في وقت التشغيل هما الميزتان اللتان لا تنتقلان.

## ما هو `@intlayer/vue-i18n`

`vue-i18n` هي runtime. `createI18n({ messages: { en, fr, ... } })` تبني instance عام يحتفظ بكل رسالة من كل locale؛ `useI18n()` تربط كل component بها؛ `t("footer.github")` تمشي عبر الشجرة في وقت rendering. هذا التصميم هو ما يجعل SFC `<i18n>` blocks و `setLocaleMessage()` ممكنة، وهو أيضاً السبب في أن dependency graph لكل component يتضمن الشجرة بأكملها.

`@intlayer/vue-i18n` تحافظ على API وتستبدل الشجرة:

1. **Import aliasing.** `vueI18nVitePlugin()` من `@intlayer/vue-i18n/plugin` تغلف `vite-intlayer` وتضيف `resolve.alias` بحيث أن `vue-i18n` يتم حلها إلى `@intlayer/vue-i18n`. لم يتم إعادة تسمية أي import.
2. **JSON كمصدر الحقيقة.** يقرأ plugin `syncJSON` ملف `locales/{locale}.json` الموجود لديك باستخدام `format: "vue-i18n"` (لذلك يتم تحليل استيفاء `{name}`، `{0}` list والجمع بين الأنابيب `"car | cars"` بشكل صحيح) ويكتب الترجمات مرة أخرى عندما يحدثها CLI أو CMS.
3. **ربط موقع الاستدعاء.** تعيد مرحلة تحسين Intlayer كتابة مواقع استدعاء `useI18n()` بحيث يحصل المكون على القواميس الخاصة به مفاتيح الأسماء، في الإعدادات المحلية النشطة، كواردات يمكن للـ bundler تتبعها وتقسيمها.

```vue fileName="src/components/Footer.vue"
<!-- الكود الخاص بك، بدون تغيير -->
<script setup lang="ts">
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>

<template>
  <a href="https://github.com/intlayer-org/benchmark-bloom">{{
    t("footer.github")
  }}</a>
</template>
```

```ts fileName="ما يصدره المترجم (مبسط)"
import _dicHash_footer from "../.intlayer/dictionaries/footer.mjs";
import { useDictionary as useI18n } from "@intlayer/vue-i18n";

const { t } = useI18n(_dicHash_footer);
```

لم تعد المكون تصل إلى شجرة الرسائل العامة. تصل إلى `footer`. هذا هو السبب في انخفاض عمود حجم المكون أدناه من 196 كيلوبايت إلى 8 كيلوبايت.

## ما يحافظ عليه المحول وما يتجاهله وما لا يستبدله

| `vue-i18n` API                                                      | مع `@intlayer/vue-i18n`                                                                                                                    |
| ------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| `useI18n()` → `{ t, d, n, te, tm, rt, locale, availableLocales }`   | ✅ تم الاحتفاظ به. مفاتيح `t` مُكتوبة ضد قاموسك                                                                                            |
| `t("key", { name })`, `t("key", [a, b])`, `t("key", count)`         | ✅ تم الاحتفاظ به. يتم حل `{name}`، `{0}` والجمع الفاصل بينها كما هو الحال من قبل                                                          |
| `d(date, "long")`, `n(value, "currency")`                           | ✅ تم الاحتفاظ به. يتم احترام `datetimeFormats` / `numberFormats` من `createI18n()`، مدعومة بـ `Intl` الأصلي                               |
| `i18n.global.locale.value = "fr"`                                   | ✅ تم الحفاظ عليه. `WritableComputedRef` مدعوم بـ Intlayer الخاص بالعميل؛ التفاعلية تتصرف كما هي                                           |
| `$t`, `$tc`, `$te`, `$tm`, `$rt`, `$d`, `$n`, `$i18n` (Options API) | ✅ تم الحفاظ عليه. تم تسجيله على `app.config.globalProperties` بواسطة `app.use(i18n)`                                                      |
| `v-t` directive                                                     | ✅ تم الحفاظ عليه                                                                                                                          |
| `legacy: true`                                                      | ✅ مقبول                                                                                                                                   |
| `createI18n({ messages })`                                          | ⚠️ يتم استخدام `messages` كـ **fallback في وقت التشغيل** مع تحذير في بيئة التطوير. قم بإزالة استيرادات JSON للحصول على مكاسب في حجم الحزمة |
| `setLocaleMessage()`, `mergeLocaleMessage()`                        | ❌ تحذير وعدم القيام بأي شيء. يتم استبدال تحميل الرسائل في وقت التشغيل بقواميس build-time                                                  |
| كتل `<i18n>` المخصصة في SFC                                         | ❌ لا يتم قراءتها. انقل تلك الرسائل إلى JSON اللغة (أو `.content.ts` بجانب المكون)                                                         |
| `@nuxtjs/i18n`                                                      | ⚠️ محول منفصل، انظر [وثائق توافق Nuxt](https://intlayer.org/doc/compatibility/nuxtjs-i18n)                                                 |

## المعايير

### ما تم قياسه

تبني مجموعة [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom) **نفس تطبيق Vite + Vue 3** مع كل إعداد: **10 صفحات** (الرئيسية، حول، مدونة، الوظائف، اتصل، الأسئلة الشائعة، التسعير، المنتجات، الإعدادات، الفريق)، **10 لغات** (`en`، `fr`، `es`، `de`، `it`، `pt`، `zh`، `ja`، `ko`، `ru`)، مكونات متطابقة وأمتعة متطابقة. تُقاس الصفحات في `en` و `fr`.

تم بناء كليهما في **الإعداد الثابت**، الذي تشحنه معظم مشاريع Vue: بالنسبة لـ `vue-i18n`، يتم استيراد JSON لكل لغة وتمريره إلى `createI18n({ messages })`؛ بالنسبة للمحول، نفس المكونات مع تغيير `vite.config.ts` و `intlayer.config.ts` وإزالة استيراد `messages`. يتم تضمين `vue-intlayer` الأصلي للمرجع.

لكل بناء، تسجل المجموعة:

- **حجم المكتبة**: حجم gzip (والمصغر) لمكون فارغ يستورد فقط مكتبة i18n.
- **صفحة JS**: JavaScript بصيغة gzip يتم تنزيله لكل صفحة، بمتوسط على جميع الصفحات والإعدادات المحلية.
- **تسرب الإعدادات المحلية %**: حصة السلاسل المترجمة في JavaScript المُنزَّل التي تنتمي إلى إعداد محلي لا يعرضه المستخدم.
- **تسرب الصفحة %**: حصة السلاسل المترجمة في JavaScript المُنزَّل التي تنتمي إلى صفحة لا يوجد عليها المستخدم.
- **متوسط المكون**: متوسط حجم gzip لكل مكون تم تجميعه بشكل منفصل.
- **تفاعلية E2E**: وقت الساعة الحائط بين تحديد إعداد محلي جديد وتحديث `html[lang]` في DOM (Playwright، 5 تكرارات).
- **تحميل الصفحة**: `PerformanceNavigationTiming.duration`.

> الأرقام أدناه تأتي من التشغيل بتاريخ **2026-09-12** مع `vue-i18n` 11.4.0 و `@intlayer/vue-i18n` 9.5.1. تطبيق الاختبار صغير عن قصد (عدة عشرات من السلاسل النصية لكل locale)، لذا فإن نسب تسرب الـ locale تصف **نمطًا**: فهي تزداد مع محتواك بينما تبقى تكلفة التشغيل ثابتة.

### النتائج على Vite + Vue 3

| الإعداد                  | الإستراتيجية | حجم المكتبة (gz) | حجم المكتبة (min) | متوسط صفحة JS (gz) | تسرب Locale | تسرب الصفحة | متوسط المكون (gz) | استجابة E2E | تحميل الصفحة |
| ------------------------ | ------------ | ---------------: | ----------------: | -----------------: | ----------: | ----------: | ----------------: | ----------: | -----------: |
| **base** (no i18n)       | -            |           0.0 KB |            0.0 KB |            41.3 KB |        0.0% |           - |            1.1 KB |      1.8 ms |      10.8 ms |
| `vue-i18n`               | static       |          24.3 KB |           83.2 KB |           134.9 KB |       50.0% |       90.0% |          196.0 KB |      2.8 ms |      13.6 ms |
| **`@intlayer/vue-i18n`** | static       |       **7.9 KB** |       **23.2 KB** |        **47.0 KB** |   **15.0%** |    **0.0%** |        **8.4 KB** |  **1.5 ms** |   **9.3 ms** |
| `vue-intlayer` (native)  | static       |           3.9 KB |           11.1 KB |            57.1 KB |       56.8% |        0.0% |            7.7 KB |      4.5 ms |      13.8 ms |
| `vue-intlayer` (native)  | dynamic      |           3.9 KB |           11.1 KB |            59.8 KB |       50.0% |        0.0% |            6.5 KB |      4.0 ms |      15.8 ms |

> عمود تسرب الصفحة في تطبيق الأساس مترك فارغاً: بدون مكتبة i18n، يلتقط بصمة الأصابع السلاسل المشفرة في الأجزاء المشتركة والرقم ليس ذا معنى.

**كيفية قراءته**

- **88 KB أقل لكل صفحة، نفس المكونات.** يأخذ `vue-i18n` تطبيق 41.3 KB إلى **134.9 KB**. يصل بناء المحول للمكونات نفسها إلى **47.0 KB**، 5.7 KB فوق تطبيق الأساس. معظم الفرق هو 74.9 KB من `src/locales` التي يسحبها `createI18n({ messages })` إلى كل صفحة والمحول لا يجمعها أبداً كتكتل.
- **Runtime ينكمش 3 مرات.** مكون فارغ يستورد فقط `vue-i18n` يكلف **24.3 KB gzip / 83.2 KB minified**: `@intlify/core-base`، مترجم الرسائل والـ runtime. المحول يكلف **7.9 KB / 23.2 KB**، معظمها نواة Intlayer بالإضافة إلى سطح API `vue-i18n`.
- **المكونات: أصغر 23 مرة.** مكون `useI18n()` مترجم بشكل معزول يبلغ متوسطه **196 KB**، لأن `t` مرتبط بالمثيل الذي يحتفظ بكل رسالة من كل locale. مع المحول، نفس المكون يبلغ متوسطه **8.4 KB**: فهو يصل إلى قاموسه الخاص.
- **تسرب البيانات.** يشحن `vue-i18n` كل locale وسلاسل كل صفحة على كل صفحة: تسرب locale بنسبة 50% (على locale المرقمة الاثنين؛ مع عشرة locales مجمعة فإن الهدر الفعلي أعلى)، تسرب صفحة بنسبة 90%. يقلل المحول تسرب الصفحة إلى **0%** لأن كل مكون يستورد فقط قاموسه الخاص. يجلس تسرب Locale عند 15% في هذا التشغيل `static`؛ `importMode: 'dynamic'` هو الإعداد الذي يزيله، وكان هذا التكوين ليس جزءاً من تشغيل Vue هذا.
- **التفاعلية وتحميل الصفحة.** تبديل Locale رخيص لكليهما (1.5-2.8 ms)؛ نظام التفاعلية في Vue يجعل الأمر كذلك بمجرد أن تكون الرسائل في الذاكرة. يذهب تحميل الصفحة من 13.6 ms إلى **9.3 ms**، متماشياً مع 88 KB أقل من JavaScript للتحليل.
- **حول الصفوف الأصلية.** `vue-intlayer` في هذا التشغيل جمعت كل اللغة في وضع `static` وحققت 57.1 كيلوبايت مع وقت تشغيل 3.9 كيلوبايت؛ قاموس المحول المتزامن حمل سلاسل لغات أجنبية أقل، وبالتالي الرقم الأقل لكل صفحة. وقت التشغيل الأصلي يبقى الأخف من بين الثلاثة، وموديل `.content.ts` الخاص به هو حيث تجد كتل SFC `<i18n>` معادلتها.

## لماذا تتحرك الأرقام

لم يتغير شيء في `src/components/`، لذا الفوائد تأتي من ما ترتبط به `useI18n`.

**مع `vue-i18n`**, الربط هو المثيل العام. `createI18n({ messages: { en, fr, ... } })` هو استيراد واحد يحتوي على كل شيء؛ كل مكون يستدعي `useI18n()` يمكنه الوصول إلى كل شيء، لذلك لا يمكن للـ bundler أن ينقسم دون المثيل. التحسين يعني _أنت_ تقسم `en.json` حسب المسار، تستدعي `setLocaleMessage()` في حارس التوجيه، وتحافظ على خريطة المسار إلى الملف صحيحة عند تحرك المكونات.

```bash
.
├── locales
│   ├── en.json                    # سلاسل كل صفحة
│   └── fr.json
└── src
    ├── i18n.ts                    # createI18n({ messages: { en, fr, ... } })
    ├── main.ts                    # app.use(i18n)
    └── components
        └── Footer.vue             # useI18n(); t("footer.github")
```

**مع `@intlayer/vue-i18n`**، الربط هو القاموس. `syncJSON` يحول كل مفتاح من المستوى الأعلى في `en.json` إلى قاموس؛ تمرير التحسين يسلم المكون الذي يسمي مفاتيحه، حيث يتتبع bundler الواردات ويقسمها حسب الصفحة.

```bash
.
├── intlayer.config.ts             # syncJSON({ format: "vue-i18n", source: ... })
├── locales
│   ├── en.json                    # لم يتغير، لا يزال مصدر الحقيقة
│   └── fr.json
├── .intlayer/                     # تم إنشاؤه: قاموس واحد لكل مفتاح من المستوى الأعلى، لكل locale
└── src
    ├── i18n.ts                    # createI18n({})   ← تم إزالة استيراد messages
    ├── main.ts                    # app.use(i18n)    ← لم يتغير
    └── components
        └── Footer.vue             # useI18n(); t("footer.github")  ← لم يتغير
```

سطر `messages` المستورد في `i18n.ts` هو السطر الوحيد الذي يجب حذفه. هذا هو 88 كيلوبايت.

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

يكتشف الأمر `vue-i18n`، ويثبت `intlayer`، و`vue-intlayer`، و`@intlayer/vue-i18n` و`@intlayer/sync-json-plugin`، ويملأ `intlayer.config.ts` مسبقاً. احتفظ بـ `vue-i18n` مثبتاً: فهو peer dependency ويوفر الأنواع.

</Step>
<Step number={2} title="وجّه Intlayer إلى ملفات اللغة الخاصة بك">

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  dictionary: {
    // "static" تجميع كل locale؛ "dynamic" تحميل النشط عند الطلب
    importMode: "dynamic",
    format: "vue-i18n",
  },
  plugins: [
    syncJSON({
      // لهجة vue-i18n: {name}, {0}, "car | cars"
      format: "vue-i18n",
      source: ({ locale }) => `./locales/${locale}.json`,
      location: "locales",
    }),
  ],
};

export default config;
```

يبقى `locales/{locale}.json` في مكانه. كل مفتاح على المستوى الأعلى (`footer`, `hero`...) يصبح قاموس.
<Step number={3} title="أضف الـ plugin وحذف استيراد الرسائل">

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { vueI18nVitePlugin } from "@intlayer/vue-i18n/plugin";

export default defineConfig({
  plugins: [vue(), vueI18nVitePlugin()],
});
```

```ts fileName="src/i18n.ts"
import { createI18n } from "vue-i18n";

// قبل: createI18n({ locale: "en", messages: { en, fr, es } })
export const i18n = createI18n({ locale: "en" });
```

`vueI18nVitePlugin()` يغلف `vite-intlayer` (مراقبة المحتوى، تجميع القاموس، عملية التحسين) ويقوم بإنشاء alias لـ `vue-i18n` إلى الـ adapter. إزالة استيراد `messages` هو ما يقلل 88 KB؛ تركه في الكود يبقي التطبيق يعمل لكنه يشحن الاثنين معاً.

</Step>
</Steps>

### ما يمكنك حذفه لاحقًا

| الملف / النمط                                          | السبب                                                                 |
| ------------------------------------------------------ | --------------------------------------------------------------------- |
| `import en from "./locales/en.json"` والملفات المشابهة | يُستخدم فقط كآلية احتياطية من قِبل adapter. هنا كان موقع 88 كيلوبايت  |
| `setLocaleMessage()` في route guards                   | عملية بلا تأثير. تحميل لكل مسار هو وظيفة المترجم الآن                 |
| `@intlify/unplugin-vue-i18n`                           | غير مطلوب: فهو يقوم بتجميع الرسائل وكتل SFC التي لا يقرأها adapter    |
| كتل `<i18n>` في المكونات أحادية الملف (SFC)            | لا تُقرأ؛ انقلها إلى ملفات JSON المحلية أو إلى `.content.ts` لكل مكون |

### ما الذي تكسبه بعيداً عن البايتات

- **مفاتيح مكتوبة.** `t("footer.github")` مكتوب مقابل قاموس `footer` المترجم؛ المسار الخاطئ هو خطأ في TypeScript بدلاً من عرض المفتاح كنص.
- **`npx intlayer test`** يفشل في CI عند وجود مفتاح مفقود في أي محلية. **`npx intlayer fill`** يترجم الناقصة باستخدام مفتاح مزود خاص بك (OpenAI أو Anthropic أو Mistral أو Gemini...) ويكتبها مرة أخرى في `locales/{locale}.json`.
- **محرر مرئي و CMS** يعملان على نفس JSON، لذا يقوم المطورون بعدم التحرير من خلال واجهة المستخدم وتحديث الملفات.
- **الانتقال التدريجي إلى `.content.ts`.** يمكن لأي مكون الانتقال من `useI18n()` إلى `useIntlayer("footer")` مع ملف محتوى مرافق. قواميس JSON و`.content.ts` موجودة وتندمج معاً.

## الحدود التي يجب معرفتها قبل البدء

- **كتل SFC `<i18n>` لا تُقرأ.** إذا كانت رسائلك موجودة داخل المكونات، فيجب نقلها إلى ملفات الإعدادات الإقليمية (أو إلى `.content.ts`، وهي نفس الفكرة مع الأنواع).
- **تحميل الرسائل في وقت التشغيل قد اختفى.** `setLocaleMessage()` و `mergeLocaleMessage()` تحذر وتعود. الترجمات المجلوبة من نظام إدارة المحتوى في وقت التشغيل تحتاج إلى نظام إدارة محتوى Intlayer، أو أوامر `intlayer pull` / `push`.
- **`messages` هو بديل، وليس مجاني.** الاحتفاظ باستيرادات JSON في `createI18n()` يحتفظ بـ 75 KB في الحزمة. احذفها بمجرد نجاح `intlayer test`.
- **المحول ليس runtime الأصلي.** 7.9 KB مقابل 3.9 KB لـ `vue-intlayer`. بمجرد انتقال كل component إلى `useIntlayer`، يمكنك حذفه.

## متى تستخدم أي منها؟

- **ابق على `vue-i18n`** إذا كان تطبيقك يعتمد على كتل SFC `<i18n>`، على تدفقات runtime `setLocaleMessage()`، أو إذا لم يكن 90 KB لكل صفحة مصدر قلق لجمهورك.
- **استخدم `@intlayer/vue-i18n`** إذا كنت على `vue-i18n` وتريد توفير 88 KB، و23x أصغر components، 0% page leakage، typed keys وفحوصات CI دون تعديل ملف `.vue`. هذه هي نقطة الدخول لـ codebase `vue-i18n` موجود.
- **اذهب للنسخة الأصلية (`vue-intlayer`)** للمشاريع الجديدة، أو بمجرد انتهاء المحول من عمله. لديها أخف runtime (3.9 KB) والنموذج `.content.ts` لكل component الذي يحل محل كتل `<i18n>` بمحتوى مكتوب (typed).

## المقارنات ذات الصلة

- [vue-i18n مقابل Intlayer](https://intlayer.org/blog/vue-i18n-vs-intlayer) (الميزات وتجربة المطور)
- [معيار vue-i18n مقابل Intlayer](https://intlayer.org/blog/vue-i18n-vs-intlayer-benchmark) (المكتبات، نفس المعيار)
- [next-intl مقابل @intlayer/next-intl](https://intlayer.org/blog/next-intl-vs-intlayer-next-intl) (نفس سلسلة المحولات)
- [i18next مقابل @intlayer/i18next](https://intlayer.org/blog/i18next-vs-intlayer-i18next) (نفس سلسلة المحولات)
- [Lingui مقابل @intlayer/lingui](https://intlayer.org/blog/lingui-vs-intlayer-lingui) (نفس سلسلة المحولات)
- [دليل الترحيل: من vue-i18n إلى Intlayer](https://intlayer.org/doc/migration/vue-i18n)
- [مرجع محول التوافق: vue-i18n](https://intlayer.org/doc/compatibility/vue-i18n), [Nuxt i18n](https://intlayer.org/doc/compatibility/nuxtjs-i18n)

## الخلاصة

يغير `@intlayer/vue-i18n` ما يرتبط به `useI18n()`: من مثيل عام يحمل كل رسالة من كل locale إلى قاموس مُجمّع لتلك المكون. في نفس تطبيق Vite + Vue 3 الذي هو **88 KB أقل لكل صفحة**، وقت تشغيل **أصغر 3 مرات**، مكونات **أصغر 23 مرة** و**تسرب صفحة 0%**، لملف إعدادات وسطر plugin وواحد استيراد محذوف. كتل SFC `<i18n>` وتحميل الرسائل في وقت التشغيل هما الشيئان اللذان لا يحملهما، وبقي runtime `vue-intlayer` الأصلي نصف حجمه.

جميع البيانات الأولية وتطبيقات الاختبار والسكريبتات موجودة في [مستودع Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom). قم بتشغيلها بنفسك.

راجع وثيقة ['Why Intlayer?'](https://intlayer.org/doc/why) للحصول على مزيد من التفاصيل.
