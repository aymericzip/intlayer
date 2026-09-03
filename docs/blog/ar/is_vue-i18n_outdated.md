---
createdAt: 2026-09-02
updatedAt: 2026-09-02
title: هل أصبحت مكتبة vue-i18n قديمة في عام 2026؟
description: ظلت vue-i18n المعيار الأساسي لـ Vue وNuxt لعقد كامل. لكن في اختباراتنا الميدانية، تبين أنها أثقل بيئة تشغيل للتدويل على الويب. نوضح الأسباب هنا.
keywords:
  - vue-i18n
  - Intlayer
  - تدويل المواقع
  - i18n
  - Vue
  - Nuxt
  - حجم الحزمة
  - مدونة
slugs:
  - blog
  - is-vue-i18n-outdated
author: aymericzip
---

# هل أصبحت مكتبة vue-i18n قديمة في عام 2026؟

في مجتمع Vue، قلما تجد مكتبة تحظى بانتشار مماثل لـ `vue-i18n`. قاد تطويرها Kazupon منذ أيام Vue 2، وهي تشكل ركيزة `@nuxtjs/i18n` وتعتبر الخيار الطبيعي لكل من يريد بناء تطبيق Vue متعدد اللغات.

ومع ذلك، أظهرت اختبارات الأداء لعام 2026 مفارقة غير متوقعة: **تبيّن أن `vue-i18n` هي أثقل بيئة تشغيل للتدويل بين كل أطر العمل التي تم قياسها.**

ففي مشروع أساسي خفيف باستخدام Vite + Vue لا يتعدى 31.5 كيلوبايت، أدى إدراج `vue-i18n` إلى رفع متوسط حجم JavaScript في الصفحة إلى **136.4 كيلوبايت**، أي أكثر من 4 أضعاف الحجم الأصلي.

كيف انتهى المطاف بإطار عمل معروف بالخفة إلى حمل مثل هذا العبء الثقيل للتدويل؟ وهل لا يزال نموذج وقت التشغيل التقليدي مقبولاً اليوم؟

<TOC/>

## النقاط الرئيسية

**أثقل بيئة تشغيل تم اختبارها:**

بحجم يبلغ **24.3 كيلوبايت مضغوطة بـ gzip (نحو 83.2 كيلوبايت minified)** قبل إضافة أي ترجمات، تصبح `vue-i18n` أثقل بنحو **9 أضعاف** من محرك `intlayer` (2.7 كيلوبايت).

**زيادة 330% في حمولة الصفحة:**

رفعت `vue-i18n` حجم الصفحة الأساسية من 31.5 كيلوبايت إلى 136.4 كيلوبايت. بينما استقرت Intlayer عند 59.3 كيلوبايت، محققة **حمولة أخف بنسبة 56%**.

**مترجم متخفٍ داخل المتصفح:**

ما لم تضبط أسماء مستعارة (aliases) خاصة في أداة الحزم، ترسل `vue-i18n` افتراضياً مترجم نصوص كاملاً للمتصفح ليقوم بتحليل العبارات لحظياً أثناء التشغيل.

**وتيرة التحديثات:**

شهدت `vue-i18n` قرابة 259 تعديلاً (commit) خلال العام المنصرم، تركزت على إصلاح الأعطال ومواكبة إصدارات Vue.

**غياب الأدوات المتقدمة الرسمية:**

لا يتوفر دعم رسمي لخادم لغة (LSP)، أو خوادم MCP للذكاء الاصطناعي، أو أدوات الترجمة عبر سطر الأوامر.

## الصيانة مقارنة بالحلول الحديثة

| المستودع              | النجوم                                                                                                                                                 | إجمالي التعديلات                                                                                                                                                    | التعديلات / سنة                                                                                                                                                    | آخر تعديل                                                                                                                                    |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `intlify/vue-i18n`    | [![stars](https://img.shields.io/github/stars/intlify/vue-i18n?style=for-the-badge&label=stars)](https://github.com/intlify/vue-i18n/stargazers)       | [![commits](https://img.shields.io/github/commit-activity/t/intlify/vue-i18n?style=for-the-badge&label=commits)](https://github.com/intlify/vue-i18n/commits)       | [![yearly](https://img.shields.io/github/commit-activity/y/intlify/vue-i18n?style=for-the-badge&label=%2Fyear)](https://github.com/intlify/vue-i18n/commits)       | [![last](https://img.shields.io/github/last-commit/intlify/vue-i18n?style=for-the-badge)](https://github.com/intlify/vue-i18n/commits)       |
| `aymericzip/intlayer` | [![stars](https://img.shields.io/github/stars/aymericzip/intlayer?style=for-the-badge&label=stars)](https://github.com/aymericzip/intlayer/stargazers) | [![commits](https://img.shields.io/github/commit-activity/t/aymericzip/intlayer?style=for-the-badge&label=commits)](https://github.com/aymericzip/intlayer/commits) | [![yearly](https://img.shields.io/github/commit-activity/y/aymericzip/intlayer?style=for-the-badge&label=%2Fyear)](https://github.com/aymericzip/intlayer/commits) | [![last](https://img.shields.io/github/last-commit/aymericzip/intlayer?style=for-the-badge)](https://github.com/aymericzip/intlayer/commits) |

الأداء خلال الاثني عشر شهراً الأخيرة:

- `intlify/vue-i18n`: **259 تعديلاً** (صيانة دورية لـ Vue 3 وNuxt).
- `aymericzip/intlayer`: **4,343 تعديلاً** (تطوير مستمر لتحسينات المترجم وخادم LSP وأدوات الوكلاء الأذكياء).

[![Star History Chart](https://api.star-history.com/chart?repos=intlify%2Fvue-i18n%2Caymericzip%2Fintlayer&type=date&legend=top-left)](https://www.star-history.com/#intlify/vue-i18n&aymericzip/intlayer)

المكتبة العريقة تمنح شعوراً بالاستقرار. لكن تطوير الواجهات الحديثة بات يستند إلى تحويلات شجرة الإعراب (AST) أثناء البناء، والتخلص من الشيفرات الخاملة، والترجمة بالذكاء الاصطناعي. ومن الصعب على البنى المحصورة في وقت التشغيل استيعاب هذه الآليات.

## القياسات في بيئة Vite + Vue

أُجري الاختبار على تطبيق يضم 10 صفحات و10 لغات باستخدام Vite وVue 3:

<I18nBenchmark framework="vite-vue" vertical/>

<ClickToOpenIframe
src="https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-vite_vue.md"
width="100%"
height="600px"
style="border:none;"
/>

> تم الاختبار في متصفحات فعلية مع تفعيل ضغط gzip. التفاصيل متوفرة في [توثيق مقارنة أداء Vue](https://intlayer.org/ar/doc/benchmark/vue).

### العبء الأولي للمكتبات

الحجم قبل تضمين ملفات الترجمة:

| المكتبة           | الحجم (gzip) | الحجم المصغر (Minified) |
| ----------------- | ------------ | ----------------------- |
| `vue-i18n@11.4.0` | 24.3 KB      | 83.2 KB                 |
| `intlayer@8.7.12` | **2.7 KB**   | **7.6 KB**              |

محرك تشغيل `vue-i18n` وحده يستهلك **24.3 كيلوبايت (gzip)**، وهو ما يقارب حجم نواة Vue ذاتها. بينما تكتفي Intlayer بـ **2.7 كيلوبايت**.

### حجم الصفحات وتسريب المحتوى

| الإعداد           | متوسط JS / صفحة (gz) | تسريب اللغات | تسريب الصفحات الأخرى | متوسط المكون (gz) |
| ----------------- | -------------------- | ------------ | -------------------- | ----------------- |
| الأساس (دون i18n) | 31.5 KB              | 0.0%         | 90.0%                | 0.9 KB            |
| `vue-i18n`        | **136.4 KB**         | 50.2%        | 90.0%                | 196.0 KB          |
| Intlayer          | **59.3 KB**          | 51.1%        | **0.0%**             | **6.5 KB**        |

### أهم الملاحظات

**تضخم نسبي مرتفع:**

بما أن حجم Vue المبدئي خفيف جداً (~31 كيلوبايت)، فإن إضافة `vue-i18n` تضاعف حمولة الصفحة بأكثر من أربع مرات.

**تسريب البيانات إلى مسارات أخرى:**

بشكل افتراضي، **90% من الترجمات** التي يستقبلها المسار تخص صفحات أخرى. تلغي Intlayer هذا الهدر كلياً لتبلغ النسبة **0.0%**.

**ضخامة المكونات المعزولة:**

بلغ متوسط حجم المكونات ذات النطاق المحلي نحو 196 كيلوبايت في `vue-i18n` نتيجة تكرار القواميس، مقابل **6.5 كيلوبايت** في Intlayer.

## لماذا تعد vue-i18n ثقيلة؟

### شحن مترجم AST إلى المتصفح

تحتوي `vue-i18n` على مترجم داخلي لتنسيق الرسائل. قواعد الجمع والتبديل تُحول إلى أشجار إعراب (AST) مباشرة في المتصفح أثناء العمل.

لتجنب ذلك، يتطلب الأمر توجيه اسم مستعار في أداة الحزم نحو `vue-i18n/dist/vue-i18n.runtime.esm-bundler.js` والترجمة المسبقة عبر `@intlify/unplugin-vue-i18n`. وهو إجراء تتجاهله مشاريع كثيرة.

### منظومة وظائف أحادية

تجمع `vue-i18n` بين محركات التواريخ والأرقام، والرسائل المرتبطة، وجسور Options API القديمة (`$t`, `v-t`)، والوكلاء التفاعليين. حتى إن أردت نصوصاً بسيطة في `<script setup>`، تُحمل المكتبة بكامل ثقلها.

### المفاتيح الديناميكية تمنع الـ Tree-shaking

تفسير مفتاح مثل `"home.hero.title"` في وقت التشغيل يعمي أدوات الحزم عن تحديد النصوص المستعملة فعلياً. فتبقى الترجمات غير المستخدمة داخل الملفات المنشورة.

<Tabs defaultTab="intlayer" group="techno">
  <Tab label="vue-i18n" value="vue-i18n">

```vue fileName="Hero.vue"
<script setup>
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>

<template>
  <h1>{{ t("home.hero.title") }}</h1>
</template>
```

  </Tab>
  <Tab label="Intlayer" value="intlayer">

```vue fileName="Hero.vue"
<script setup>
import { useIntlayer } from "vue-intlayer";

const { title } = useIntlayer("hero");
</script>

<template>
  <h1>{{ title }}</h1>
</template>
```

  </Tab>
</Tabs>

يستطيع [مترجم Intlayer](https://intlayer.org/ar/doc/compiler) تتبع الخصائص المطلوبة تحديداً واستبعاد ما عداها قبل بناء ملفات العميل. تعرف على المزيد في [تحسين الحزم](https://intlayer.org/ar/doc/concept/bundle-optimization).

## تجربة المطورين

### ملفات منفصلة مقابل التجاور المباشر

في `vue-i18n`، توضع الترجمات في مجلد `locales/` بعيد. أما Intlayer فتتيح وضع ملفات المحتوى بجوار المكونات مباشرة:

<Tabs defaultTab="intlayer" group="techno">
  <Tab label="vue-i18n" value="vue-i18n">

```json fileName="locales/en.json"
{
  "hero": {
    "title": "Ship in every language"
  }
}
```

```json fileName="locales/ar.json"
{
  "hero": {
    "title": "أطلق منتجك بكل اللغات"
  }
}
```

```vue fileName="Hero.vue"
<script setup>
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>

<template>
  <h1>{{ t("hero.title") }}</h1>
</template>
```

  </Tab>
  <Tab label="Intlayer" value="intlayer">

```ts fileName="Hero.content.ts"
import { t, type Dictionary } from "intlayer";

export default {
  key: "hero",
  content: {
    title: t({
      en: "Ship in every language",
      ar: "أطلق منتجك بكل اللغات",
    }),
  },
} satisfies Dictionary;
```

```vue fileName="Hero.vue"
<script setup>
import { useIntlayer } from "vue-intlayer";

const { title } = useIntlayer("hero");
</script>

<template>
  <h1>{{ title }}</h1>
</template>
```

  </Tab>
</Tabs>

عند إعادة تسمية أو حذف `Hero.vue`، يتم التعامل مع ملف المحتوى الخاص به بصورة متزامنة.

### الإكمال التلقائي في مواجهة أمان الأنواع الشامل

توفر `DefineLocaleMessage` اقتراحات بناءً على ملف اللغة الأساسية. لكنها تعجز عن رصد النقص في بقية اللغات. فغياب مفتاح من `ar.json` لن يعرقل بناء TypeScript.

في Intlayer، تخضع القواميس لتدقيق حازم. وتفعيل [`strictMode`](https://intlayer.org/ar/doc/concept/configuration) يوقف البناء فوراً إذا كانت هناك ترجمة ناقصة في أي لغة مستهدفة.

### أدوات المحررات والذكاء الاصطناعي

| الأداة                        | `vue-i18n`                 | Intlayer                                                               |
| ----------------------------- | -------------------------- | ---------------------------------------------------------------------- |
| **إضافة VS Code**             | إضافات مجتمعية (i18n Ally) | ✅ [إضافة رسمية](https://intlayer.org/ar/doc/vs-code-extension)        |
| **خادم اللغة (LSP)**          | ❌ غير متوفر               | ✅ [LSP مخصص](https://intlayer.org/ar/doc/lsp)                         |
| **خادم MCP للذكاء الاصطناعي** | ❌ غير متوفر               | ✅ [خادم MCP مدمج](https://intlayer.org/ar/doc/mcp-server)             |
| **مهارات الوكلاء (Skills)**   | ❌ غير متوفر               | ✅ [مهارات ذاتية](https://intlayer.org/ar/doc/agent_skills)            |
| **نظام CMS مرئي**             | ❌ غير متوفر               | ✅ [نظام CMS مفتوح ومجاني](https://intlayer.org/ar/doc/concept/editor) |

## إدارة الترجمات

لا توفر `vue-i18n` أوامر داخلية لإنشاء أو ملء الترجمات. وعادة ما يضطر الفريق لتصدير الملفات إلى منصات مثل Crowdin أو Phrase.

تأتي Intlayer بهذه المزايا مدمجة:

**الإكمال الآلي بالذكاء الاصطناعي محلياً (`intlayer fill`):**

يترجم المفاتيح الناقصة باستخدام مفاتيح API الخاصة بك من OpenAI أو Anthropic أو Mistral أو Gemini.

**نظام إدارة محتوى مرئي ذاتي الاستضافة:**

شغّل [Intlayer CMS](https://intlayer.org/ar/doc/concept/cms) لتمكين كتاب المحتوى من تعديل العبارات برؤية حية مع الحفظ المباشر في Git.

**ترخيص مفتوح:**

كافة الأدوات والمكونات متاحة تحت رخصة Apache 2.0.

## متى تظل vue-i18n ملائمة؟

<AccordionGroup>
<Accordion header="مشاريع Nuxt 2/3 القديمة والمستقرة">

إذا كان التوجيه في مشروعك مرتبطاً بشدة بـ `@nuxtjs/i18n`، فقد لا يكون التغيير مجدياً في الوقت الراهن.

</Accordion>
<Accordion header="استخدامات ICU المتخصصة">

إذا كان التطبيق يعتمد بشكل مكثف على الرسائل المتسلسلة وقواعد التنسيق الخاصة.

</Accordion>
<Accordion header="المشاريع الشخصية البسيطة">

حين لا يمثل حجم الحزمة عاملاً حاسماً في نجاح التطبيق.

</Accordion>
</AccordionGroup>

## كيف أطور إعدادات vue-i18n الحالية في مشروعي؟

توفر Intlayer حزم توافق مباشرة تحتفظ بنفس تواقيع دوال مكتبات `vue-i18n` و`@nuxtjs/i18n` مثل `useI18n` و`$t` و`<i18n-t>`. لن تحتاج إلى إعادة كتابة القوالب أو الدوال التركيبية (composables) للاستفادة من مزايا البنية الخفيفة المعتمدة على المترجم.

يتم الإعداد عبر أمر واحد فقط:

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

تقوم هذه الأداة التفاعلية بما يلي تلقائياً:

1. تثبيت حزمة التوافق `@intlayer/vue-i18n` أو `@intlayer/nuxt-i18n`.
2. ضبط الأسماء المستعارة (aliases) في أداة الحزم (Vite أو Nuxt) لتوجه استدعاءاتك وقوالبك الحالية مباشرة نحو Intlayer، مما يتيح لك إزالة `vue-i18n` من ملف `package.json`.
3. تفعيل تشخيصات خادم اللغة (LSP) داخل المحرر مباشرة، والتخلص من محلل AST الذي يزن 24 كيلوبايت من حزمة العميل، وتشغيل أدوات الترجمة الآلية بالذكاء الاصطناعي محلياً دون تعديلات معقدة.

للاطلاع على الخطوات التفصيلية، راجع أدلتنا المتخصصة:

- **توافق مباشر وسريع:** حافظ على شفرات القوالب عبر استخدام [طبقة التوافق مع `vue-i18n`](https://intlayer.org/ar/doc/compatibility/vue-i18n) أو [`@nuxtjs/i18n`](https://intlayer.org/ar/doc/compatibility/nuxtjs-i18n).
- **أدلة النقل والتحويل:** حول ملفات JSON الحالية إلى قواميس منظمة بمساعدة أدلتنا: [من vue-i18n](https://intlayer.org/ar/doc/migration/vue-i18n) أو [من @nuxtjs/i18n](https://intlayer.org/ar/doc/migration/nuxtjs-i18n).
- **الدمج المرحلي:** يمكنك ترك `vue-i18n` في وقت التشغيل، مع [استخدام Intlayer مع vue-i18n](https://intlayer.org/ar/blog/intlayer-with-vue-i18n) لإدخال تدقيق الأنواع الصارم والترجمة بالذكاء الاصطناعي محلياً.

افحص حمولة وتوافق موقعك عبر [ماسح SEO للتدويل المجاني](https://intlayer.org/i18n-seo-scanner):

<ClickToOpenIframe src="https://intlayer.org/i18n-seo-scanner" width="100%" height="600px" style="border:none;"/>

## مقالات مقترحة

- [مقارنة أداء تدويل Vue وVite: دراسة معمقة](https://intlayer.org/ar/doc/benchmark/vue)
- [مقارنة تفصيلية بين vue-i18n و Intlayer](https://intlayer.org/ar/blog/vue-i18n-vs-intlayer)
- [هل أصبحت مكتبة next-intl قديمة في 2026؟](https://intlayer.org/ar/blog/is-next-intl-outdated)
- [التدويل المعتمد على المترجم في مقابل النموذج الإعلاني](https://intlayer.org/ar/blog/compiler-vs-declarative-i18n)
