---
createdAt: 2026-09-13
updatedAt: 2026-09-13
title: "vue-i18n مقابل Intlayer: معيار الأداء 2026"
description: قياس vue-i18n و Intlayer على نفس تطبيق Vite + Vue 3. حجم المكتبة، JavaScript لكل صفحة، تسرب المحتوى، حجم المكوّنات وتفاعلية تبديل اللغة، مع شرح الأرقام.
keywords:
  - vue-i18n
  - Intlayer
  - Internationalization
  - i18n
  - Benchmark
  - Bundle size
  - Blog
  - Vue
  - Nuxt
  - Vite
  - JavaScript
slugs:
  - blog
  - vue-i18n-vs-intlayer-benchmark
author: aymericzip
---

# vue-i18n مقابل Intlayer | معيار أداء التدويل (i18n) في Vue

`vue-i18n` هي مكتبة i18n المرجعية لـ Vue. Intlayer بديل قائم على المُصرِّف، بمحتوى محدود بنطاق المكوّن، مع تكامل Vue (`vue-intlayer`). سبق أن قارنّا [ميزاتهما وتجربة المطور](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ar/vue-i18n_vs_intlayer.md). تنظر هذه المقالة في تكلفة كل منهما بعد بناء التطبيق.

تأتي البيانات من [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom)، وهي مجموعة مفتوحة المصدر تبني نفس التطبيق بكل مكتبة وتسجّل ما يقوم المتصفح فعليًا بتنزيله وتنفيذه.

<TOC/>

> **الخلاصة**: على نفس تطبيق Vite + Vue 3، يرسل `vue-i18n` **134.9 كيلوبايت** من JavaScript المضغوط بـ gzip لكل صفحة مقابل **41.3 كيلوبايت** للتطبيق بدون i18n. يرسل Intlayer **57.1 كيلوبايت**. يزن وقت تشغيل `vue-i18n` وحده **24.3 كيلوبايت gzip** (6 أضعاف 3.9 كيلوبايت لـ Intlayer)، وتحمل كل صفحة **90% من نصوص الصفحات الأخرى**، والمكوّن المُصرَّف بمعزل يجرّ معه **196 كيلوبايت** لأنه مرتبط بشجرة الرسائل العامة. يحافظ محوّل `@intlayer/vue-i18n` على واجهة `vue-i18n` وسجّل **47.0 كيلوبايت** لكل صفحة.

## باختصار

- **vue-i18n** - مكتبة i18n الفعلية لـ Vue 2 / Vue 3 ونواة `@nuxtjs/i18n`. رسائل بنمط ICU، كتل `<i18n>` في SFC، توجيه `v-t`، مُنسِّقات `d()` / `n()`، منظومة كبيرة. تُسجَّل الرسائل على مثيل عام عند `createI18n()`؛ التحميل الكسول لكل لغة هو نمط يدوي عبر `setLocaleMessage()`، والتقسيم لكل مسار عليك بناؤه بنفسك.
- **Intlayer** - نموذج محتوى يتمحور حول المكوّنات. تقع قواميس `.content.ts` بجوار المكوّن الذي تخدمه، ويقوم مُصرِّف وقت البناء (`vite-intlayer`) بعمل tree-shaking وتحميل كسول لها لكل مكوّن ولكل لغة، وتُولَّد أنواع TypeScript صارمة من محتواك، وتفشل الترجمات المفقودة في وقت البناء. يأتي مع مساعدات للتوجيه / SEO، ومحرر مرئي / CMS، وترجمة بمساعدة الذكاء الاصطناعي.

| المكتبة               | نجوم GitHub                                                                                                                                                                    | إجمالي الإيداعات                                                                                                                                                                   | آخر إيداع                                                                                                                                           | الإصدار الأول | إصدار NPM                                                                                                   | تنزيلات NPM                                                                                                            |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- | ----------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `aymericzip/intlayer` | [![GitHub Repo stars](https://img.shields.io/github/stars/aymericzip/intlayer?style=for-the-badge&label=%E2%AD%90%20stars)](https://github.com/aymericzip/intlayer/stargazers) | [![GitHub commit activity](https://img.shields.io/github/commit-activity/t/aymericzip/intlayer?style=for-the-badge&label=commits)](https://github.com/aymericzip/intlayer/commits) | [![Last Commit](https://img.shields.io/github/last-commit/aymericzip/intlayer?style=for-the-badge)](https://github.com/aymericzip/intlayer/commits) | أبريل 2024    | [![npm](https://img.shields.io/npm/v/intlayer?style=for-the-badge)](https://www.npmjs.com/package/intlayer) | [![npm downloads](https://img.shields.io/npm/dm/intlayer?style=for-the-badge)](https://www.npmjs.com/package/intlayer) |
| `intlify/vue-i18n`    | [![GitHub Repo stars](https://img.shields.io/github/stars/intlify/vue-i18n?style=for-the-badge&label=%E2%AD%90%20stars)](https://github.com/intlify/vue-i18n/stargazers)       | [![GitHub commit activity](https://img.shields.io/github/commit-activity/t/intlify/vue-i18n?style=for-the-badge&label=commits)](https://github.com/intlify/vue-i18n/commits)       | [![Last Commit](https://img.shields.io/github/last-commit/intlify/vue-i18n?style=for-the-badge)](https://github.com/intlify/vue-i18n/commits)       | ديسمبر 2016   | [![npm](https://img.shields.io/npm/v/vue-i18n?style=for-the-badge)](https://www.npmjs.com/package/vue-i18n) | [![npm downloads](https://img.shields.io/npm/dm/vue-i18n?style=for-the-badge)](https://www.npmjs.com/package/vue-i18n) |

> تتحدث الشارات تلقائيًا. ستتغير اللقطات مع الوقت.

## مقارنة الميزات جنبًا إلى جنب

| الميزة                                        | `vue-intlayer` (Intlayer)                              | `vue-i18n`                                                             |
| --------------------------------------------- | ------------------------------------------------------ | ---------------------------------------------------------------------- |
| **الترجمات بجوار المكوّنات**                  | ✅ نعم، `.content.ts` موضوع مع كل مكوّن                | ✅ عبر كتل SFC `<i18n>` (اختياري)؛ الفهارس العامة هي الإعداد الشائع    |
| **تكامل TypeScript**                          | ✅ أنواع صارمة مولَّدة تلقائيًا من المحتوى             | ✅ أنواع جيدة؛ أمان المفاتيح الصارم يتطلب تعريف مخطط الأنواع والانضباط |
| **اكتشاف الترجمات المفقودة**                  | ✅ خطأ TypeScript + خطأ/تحذير في وقت البناء            | ⚠️ تراجع في وقت التشغيل + تحذير في وحدة التحكم                         |
| **المحتوى الغني (مكوّنات / Markdown)**        | ✅ دعم مباشر                                           | ⚠️ استيفاء مكوّن `<i18n-t>`؛ Markdown عبر إضافات خارجية                |
| **دعم ICU**                                   | ⚠️ قيد التطوير                                         | ✅ نعم                                                                 |
| **التنسيق (التواريخ، الأرقام، العملات)**      | ✅ مُنسِّقات قائمة على Intl                            | ✅ `d()` / `n()` مع `datetimeFormats` / `numberFormats`                |
| **التوجيه المُوطَّن**                         | ✅ مساعدات لـ Vue Router / Nuxt، `getMultilingualUrls` | ⚠️ ليس في النواة (`@nuxtjs/i18n` أو إعداد توجيه مخصص)                  |
| **مساعدات SEO (hreflang، sitemap، robots)**   | ✅ مساعدات مدمجة                                       | ❌ ليس في النواة                                                       |
| **Tree-shaking (إرسال المحتوى المستخدم فقط)** | ✅ لكل مكوّن، لكل لغة، مؤتمت بواسطة المُصرِّف          | ⚠️ يدوي: تقسيم الفهارس، `setLocaleMessage()` لكل مسار                  |
| **التحميل الكسول**                            | ✅ `importMode: 'dynamic'` (سطر إعداد واحد)            | ✅ `import()` يدوي + `setLocaleMessage()`                              |
| **إزالة المحتوى غير المستخدم**                | ✅ تُحذف القواميس الميتة في وقت البناء                 | ❌ غير مدمج                                                            |
| **اختبار الترجمات المفقودة (CLI / CI)**       | ✅ `npx intlayer content test`                         | ⚠️ طرف ثالث (`vue-i18n-extract`)                                       |
| **الترجمة بالذكاء الاصطناعي**                 | ✅ مدمجة، تستخدم مفاتيح مزوّدك الخاصة                  | ❌ لا                                                                  |
| **المحرر المرئي / CMS**                       | ✅ محرر مرئي مجاني + CMS اختياري                       | ❌ لا (منصات توطين خارجية)                                             |
| **خادم MCP و Agent Skills**                   | ✅ نعم                                                 | ❌ لا                                                                  |
| **المنظومة / المجتمع**                        | ⚠️ أصغر لكنه ينمو بسرعة                                | ✅ كبير وناضج في منظومة Vue                                            |

## معيار الأداء

### ما الذي تم قياسه

تبني مجموعة [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom) **نفس تطبيق Vite + Vue 3** بكل مكتبة: **10 صفحات** (home، about، blog، careers، contact، FAQ، pricing، products، settings، team)، **10 لغات** (`en`، `fr`، `es`، `de`، `it`، `pt`، `zh`، `ja`، `ko`، `ru`)، نفس المكوّنات ونفس المحتوى. تُقاس الصفحات بـ `en` و `fr`.

اختُبرت المكتبتان في إعداد **static**، وهو الإعداد الذي تشحنه معظم مشاريع Vue: بالنسبة لـ `vue-i18n`، يُستورد JSON كل لغة ويُمرَّر إلى `createI18n({ messages })`؛ وبالنسبة لـ Intlayer، الإعداد الافتراضي `importMode: 'static'`. في هذا الوضع يحزم Intlayer كل اللغات أيضًا، لكن المُصرِّف لا يزال يحدد نطاق المحتوى **لكل مكوّن**، لذا لا تحمل الصفحة سوى قواميس المكوّنات التي تعرضها.

لكل عملية بناء، تسجّل المجموعة:

- **Lib size**: حجم gzip لمكوّن فارغ يستورد مكتبة i18n فقط. التكلفة الثابتة لوقت التشغيل.
- **Page JS**: JavaScript المضغوط بـ gzip المُنزَّل لكل صفحة، بمتوسط جميع الصفحات واللغات.
- **Locale leak %**: نسبة النصوص المترجمة الموجودة في JS المُنزَّل والتي تنتمي إلى لغة **لا** يعرضها المستخدم (بُصمت على `en` و `fr`، لذا 50% تعني "اللغة المقاسة الأخرى موجودة بالكامل"؛ مع حزم 10 لغات، الهدر الفعلي أعلى).
- **Page leak %**: نسبة النصوص المترجمة الموجودة في JS المُنزَّل والتي تنتمي إلى صفحة **ليس** المستخدم عليها.
- **Component avg**: متوسط حجم gzip لكل مكوّن مُصرَّف بمعزل. يُظهر مقدار وقت تشغيل i18n والفهرس الذي يجرّه مكوّن واحد.
- **E2E reactivity**: الوقت الفعلي بين اختيار لغة جديدة وتحديث `html[lang]` في DOM (Playwright، 5 تكرارات).
- **Page load**: `PerformanceNavigationTiming.duration`.

> الأرقام أدناه من التشغيل المؤرخ **2026-09-12** بـ `vue-i18n` 11.4.0 و `intlayer` 9.5.0 / 9.5.1. تطبيق الاختبار صغير عمدًا (بضع عشرات من النصوص لكل لغة)، لذا تصف نسب التسرب **نمطًا**: تنمو مع محتواك بينما تبقى تكلفة وقت التشغيل ثابتة.

### النتائج على Vite + Vue 3

| المكتبة                       | الاستراتيجية | Lib size (gz) | Lib size (min) | متوسط Page JS (gz) | Locale leak | Page leak | متوسط Component (gz) | تفاعلية E2E | Page load |
| ----------------------------- | ------------ | ------------: | -------------: | -----------------: | ----------: | --------: | -------------------: | ----------: | --------: |
| **base** (بدون i18n)          | -            |        0.0 KB |         0.0 KB |            41.3 KB |        0.0% |         - |               1.1 KB |      1.8 ms |   10.8 ms |
| `vue-i18n`                    | static       |       24.3 KB |        83.2 KB |           134.9 KB |       50.0% |     90.0% |             196.0 KB |      2.8 ms |   13.6 ms |
| **`vue-intlayer`**            | static       |    **3.9 KB** |    **11.1 KB** |        **57.1 KB** |       56.8% |  **0.0%** |           **7.7 KB** |  **4.5 ms** |   13.8 ms |
| `@intlayer/vue-i18n` (compat) | static       |        7.9 KB |        23.2 KB |            47.0 KB |       15.0% |      0.0% |               8.4 KB |      1.5 ms |    9.3 ms |

> تُرك عمود page-leak للتطبيق الأساسي فارغًا: بدون مكتبة i18n، تلتقط البصمة نصوصًا مضمّنة في القطع المشتركة ولا يكون الرقم ذا معنى.

**كيف تقرأ النتائج**

- **تكلفة وقت التشغيل.** `vue-i18n` من أثقل أوقات التشغيل في معيار الأداء بأكمله: **24.3 كيلوبايت gzip / 83.2 كيلوبايت مُصغَّر** لمكوّن فارغ يستورده فقط. يكلّف `vue-intlayer` 3.9 كيلوبايت gzip. تُدفع هذه الفجوة على كل صفحة بغض النظر عن عدد النصوص لديك.
- **JavaScript لكل صفحة.** يزن التطبيق بدون i18n 41.3 كيلوبايت. يضاعفه `vue-i18n` أكثر من ثلاث مرات إلى **134.9 كيلوبايت**؛ يستقر Intlayer عند **57.1 كيلوبايت**، +15.8 كيلوبايت، معظمها اللغات العشر المحزومة (انظر النقطة التالية).
- **التسرب.** مع `createI18n({ messages: { en, fr, ... } })`، ترسل كل صفحة كل اللغات ونصوص كل الصفحات: **50% تسرب لغات** (على اللغتين المبصومتين) و**90% تسرب صفحات**. يحزم وضع `static` في Intlayer كل اللغات أيضًا (ومن هنا رقم تسرب اللغات المقارب) لكنه يحقق **0% تسرب صفحات**: لا تسحب الصفحة سوى قواميس المكوّنات التي تعرضها. التبديل إلى `importMode: 'dynamic'` يزيل تسرب اللغات أيضًا؛ لم يكن هذا الإعداد جزءًا من تشغيل Vue هذا.
- **حجم المكوّن هو حيث تظهر البنية.** يُصرَّف المكوّن الذي يستدعي `useI18n()` إلى **196 كيلوبايت** في المتوسط، لأن `t()` مرتبط بالمثيل العام الذي يحمل كل رسالة لكل لغة. نفس المكوّن مع `useIntlayer()` يُصرَّف إلى **7.7 كيلوبايت**: لا يصل إلا إلى قاموسه الخاص.
- **التفاعلية** ليست مشكلة لأي منهما (2-5 ms). يجعل نظام التفاعلية في Vue تبديل اللغة رخيصًا بمجرد وجود الرسائل في الذاكرة.
- **`@intlayer/vue-i18n`**، المحوّل الجاهز، يحافظ على واجهة `vue-i18n` وسجّل **47.0 كيلوبايت لكل صفحة** و**8.4 كيلوبايت لكل مكوّن**، دون المساس بكود التطبيق.

> للمرجعية، قاس نفس التشغيل `fluent-vue` عند 171.8 كيلوبايت لكل صفحة، و29.7 كيلوبايت وقت تشغيل، و217 كيلوبايت لكل مكوّن.

## لماذا الفجوة؟ المثيل العام مقابل القواميس المُصرَّفة

`vue-i18n` هو وقت تشغيل. يبني `createI18n()` مثيلًا عامًا يحمل شجرة رسائل لكل لغة؛ يربط `useI18n()` كل مكوّن به؛ ويبحث `t("footer.github")` عن المفتاح في وقت العرض. هذا ما يجعل كتل SFC `<i18n>` و `v-t` وتحميل الرسائل في وقت التشغيل ممكنًا، وهو أيضًا سبب احتواء رسم اعتماديات كل مكوّن على الشجرة بأكملها:

```bash
.
├── locales
│   ├── en.json
│   ├── fr.json
│   └── ...                        # ملف واحد لكل لغة، كل الصفحات بداخله
└── src
    ├── i18n.ts                    # createI18n({ messages: { en, fr, ... } })
    ├── main.ts
    └── components
        └── Footer.vue             # const { t } = useI18n(); t("footer.github")
```

التحسين يعني أن **أنت** من يقسّم `en.json` إلى ملفات لكل مسار، و**أنت** من يستدعي `setLocaleMessage()` في حارس التوجيه، و**أنت** من يحافظ على صحة خريطة المسار-إلى-الملف مع تحرك المكوّنات. لا يستطيع وقت التشغيل فعل ذلك عنك لأنه لا يعرف أي المفاتيح سيطلبها المكوّن.

ينقل Intlayer تلك المعرفة إلى البناء. يُعلَن المحتوى بجوار المكوّن، ويحدد `vite-intlayer` أي مكوّن يستورد أي قاموس:

```bash
.
├── intlayer.config.ts
└── src
    ├── main.ts                    # createApp(App).use(intlayer)
    └── components
        └── Footer
            ├── Footer.vue         # useIntlayer("footer")
            └── Footer.content.ts
```

يُصدر المُصرِّف، لكل قاموس ولكل لغة، JSON الذي يحتاجه ذلك المكوّن بالضبط، ويحذف القواميس التي لا يستوردها أحد. تحديد النطاق لكل مسار نتيجة لتحديد النطاق لكل مكوّن، وليس مهمة.

> لحذف اللغات غير المستخدمة أيضًا، اضبط `dictionary.importMode: 'dynamic'` في `intlayer.config.ts`. انظر [وثيقة تحسين الحزمة](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/bundle_optimization.md).

## تجربة المطور

### الإعداد

**vue-i18n**

```ts fileName="src/i18n.ts"
import { createI18n } from "vue-i18n";
import en from "../locales/en.json";
import fr from "../locales/fr.json";

export const i18n = createI18n({
  legacy: false,
  locale: "en",
  fallbackLocale: "en",
  messages: { en, fr },
});
```

```ts fileName="src/main.ts"
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { i18n } from "./i18n";

createApp(App).use(router).use(i18n).mount("#app");
```

**Intlayer**

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

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayer(), vue()],
});
```

```ts fileName="src/main.ts"
import { createApp } from "vue";
import { intlayer } from "vue-intlayer";
import App from "./App.vue";
import router from "./router";

createApp(App).use(intlayer).use(router).mount("#app");
```

### المكوّن

**vue-i18n**

```json fileName="locales/en.json"
{
  "counter": {
    "label": "Counter",
    "increment": "Increment"
  }
}
```

```vue fileName="src/components/Counter.vue"
<script setup lang="ts">
import { ref } from "vue";
import { useI18n } from "vue-i18n";

const { t, n } = useI18n();
const count = ref(0);
</script>

<template>
  <div>
    <p>{{ n(count) }}</p>
    <button :aria-label="t('counter.label')" @click="count++">
      {{ t("counter.increment") }}
    </button>
  </div>
</template>
```

`t('counter.label')` مجرد نص حتى تعرّف أنواع مخطط الرسائل بنفسك؛ الخطأ الإملائي يعرض المفتاح.

**Intlayer**

```ts fileName="src/components/Counter/Counter.content.ts"
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

```vue fileName="src/components/Counter/Counter.vue"
<script setup lang="ts">
import { ref } from "vue";
import { useIntlayer } from "vue-intlayer";
import { useNumber } from "vue-intlayer/format";

const { label, increment } = useIntlayer("counter");
const number = useNumber();
const count = ref(0);
</script>

<template>
  <div>
    <p>{{ number.value(count) }}</p>
    <button :aria-label="label" @click="count++">
      {{ increment }}
    </button>
  </div>
</template>
```

`label` و `increment` مُعرَّفا النوع؛ الخطأ الإملائي خطأ TypeScript، والقيمة الفرنسية المفقودة خطأ بناء.

### التحميل الكسول لكل لغة

**vue-i18n**

```ts fileName="src/i18n.ts"
import { nextTick } from "vue";
import { createI18n } from "vue-i18n";

export const i18n = createI18n({
  legacy: false,
  locale: "en",
  fallbackLocale: "en",
});

export const loadLocaleMessages = async (locale: string) => {
  const messages = await import(`../locales/${locale}.json`);
  i18n.global.setLocaleMessage(locale, messages.default);
  await nextTick();
  i18n.global.locale.value = locale;
};
```

ثم استدعِ `loadLocaleMessages()` من حارس التوجيه، وقسّم `locales/{locale}.json` حسب المسار بنفسك إذا أردت تحديد النطاق لكل صفحة.

**Intlayer**

```ts fileName="intlayer.config.ts"
const config: IntlayerConfig = {
  // ...
  dictionary: {
    importMode: "dynamic",
  },
};
```

## احتفظ بواجهة vue-i18n، واحصل على مخرجات Intlayer

`@intlayer/vue-i18n` محوّل جاهز: تستمر `useI18n()` و `t()` و `d()` و `n()` واستيفاء `{name}` و `{0}` وصيغ الجمع بالأنبوب (`"car | cars"`) و `v-t` و `i18n.global.locale` في العمل، مُقدَّمة من قواميس Intlayer المُصرَّفة بواسطة `vite-intlayer`.

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueI18nVitePlugin from "@intlayer/vue-i18n/plugin";

export default defineConfig({
  plugins: [vue(), vueI18nVitePlugin()],
});
```

في معيار الأداء، انتقل بناء compat لنفس التطبيق من **134.9 كيلوبايت إلى 47.0 كيلوبايت** لكل صفحة ومن **196 كيلوبايت إلى 8.4 كيلوبايت** لكل مكوّن، دون المساس بالمكوّنات. يمكن أن تبقى ملفات `locales/{locale}.json` الحالية مصدر الحقيقة عبر إضافة مزامنة JSON.

انظر [دليل الترحيل من vue-i18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/migration_from_vue-i18n_to_intlayer.md) و[وثيقة التوافق](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/compat/vue-i18n.md). لمستخدمي Nuxt نفس المسار عبر [توافق `@nuxtjs/i18n`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/compat/nuxtjs-i18n.md).

## متى تختار أيهما؟

- **اختر vue-i18n** إذا أردت النهج القياسي لـ Vue، أو كنت تعتمد على رسائل ICU أو كتل SFC `<i18n>`، أو كنت تستخدم `@nuxtjs/i18n` بالفعل، أو كانت منصة الترجمة تتوقع JSON مركزيًا. خصص وقتًا لتقسيم الفهارس والتحميل الكسول لكل مسار إذا كان حجم الحزمة مهمًا.
- **اختر Intlayer** إذا أردت **محتوى محدودًا بنطاق المكوّن**، و**TypeScript صارمًا**، و**أخطاء المفاتيح المفقودة في وقت البناء**، و**tree-shaking وتحميلًا كسولًا بلا جهد**، وأدوات تحرير مدمجة (محرر مرئي، CMS، ترجمة بالذكاء الاصطناعي، خادم MCP). مناسب خصوصًا لقواعد كود Vue / Nuxt الكبيرة والمعيارية وأنظمة التصميم.
- **اختر `@intlayer/vue-i18n`** إذا كنت على `vue-i18n` بالفعل وتريد مكاسب الحزمة دون إعادة كتابة.

## مقارنات ذات صلة

- [next-intl مقابل Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ar/next-intl_vs_intlayer.md) (نفس معيار الأداء)
- [i18next مقابل Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ar/i18next_vs_intlayer.md) (نفس معيار الأداء)
- [Lingui مقابل Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ar/lingui_vs_intlayer.md) (نفس معيار الأداء)
- [vue-i18n مقابل Intlayer (الميزات وتجربة المطور)](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ar/vue-i18n_vs_intlayer.md)
- [هل أصبح vue-i18n قديمًا؟](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ar/is_vue-i18n_outdated.md)

## نجوم GitHub

نجوم GitHub مؤشر قوي على شعبية المشروع وثقة المجتمع وأهميته على المدى الطويل. ورغم أنها ليست مقياسًا مباشرًا للجودة التقنية، فهي تعكس عدد المطورين الذين يجدون المشروع مفيدًا ويتابعون تقدمه ومن المرجح أن يتبنوه.

[![Star History Chart](https://api.star-history.com/chart?repos=intlify%2Fvue-i18n%2Caymericzip%2Fintlayer&type=date&legend=top-left)](https://star-history.com/#intlify/vue-i18n&aymericzip/intlayer)

## الخلاصة

`vue-i18n` ناضج ومرن ومتكامل بعمق مع Vue. يُظهر معيار الأداء ما يكلفه تصميمه القائم على وقت التشغيل أولًا في بناء Vite: **وقت تشغيل 24 كيلوبايت gzip**، و**134.9 كيلوبايت لكل صفحة** لتطبيق يزن 41 كيلوبايت بدون i18n، و**90% محتوى صفحات أخرى** على كل صفحة، ومكوّنات يصل كل منها إلى **196 كيلوبايت** لأنها معلّقة بشجرة الرسائل العامة.

ينقل Intlayer العمل إلى المُصرِّف. القواميس لكل مكوّن وإزالة المحتوى الميت مخرجات بناء، لا اصطلاحات. على نفس التطبيق: **وقت تشغيل 3.9 كيلوبايت**، و**57.1 كيلوبايت لكل صفحة**، و**0% تسرب صفحات**، ومكوّنات **أصغر 25 مرة**. وإذا لم تكن إعادة الكتابة مطروحة، فإن `@intlayer/vue-i18n` يقطع معظم الطريق دون المساس بالمكوّنات.

كل البيانات الخام وتطبيقات الاختبار والنصوص البرمجية موجودة في [مستودع Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom). شغّله بنفسك.

راجع [وثيقة "لماذا Intlayer؟"](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/interest_of_intlayer.md) لمزيد من التفاصيل.
