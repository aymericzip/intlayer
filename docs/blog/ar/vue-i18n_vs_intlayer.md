---
createdAt: 2024-08-11
updatedAt: 2026-09-22
title: vue-i18n مقابل Intlayer
description: مقارنة بين vue-i18n و Intlayer للتدويل (i18n) في تطبيقات Vue/Nuxt
keywords:
  - vue-i18n
  - Intlayer
  - التدويل
  - i18n
  - مدونة
  - Vue
  - Nuxt
  - جافاسكريبت
slugs:
  - blog
  - vue-i18n-vs-intlayer
author: aymericzip
---

# vue-i18n مقابل Intlayer | التدويل في Vue (i18n)

![Vue i18n library ecosystem](https://github.com/aymericzip/intlayer/blob/main/docs/assets/cloud_i18n_logo.webp?raw=true)

تُقارن هذه الدليل بين خيارين شائعين للتدويل (i18n) لـ **Vue 3** (و **Nuxt**): **vue-i18n** و **Intlayer**.
نركز على أدوات Vue الحديثة (Vite، Composition API) ونقيّم:

1. **البنية وتنظيم المحتوى**
2. **TypeScript والأمان**
3. **التعامل مع الترجمات المفقودة**
4. **التوجيه واستراتيجية عناوين URL**
5. **الأداء وسلوك التحميل**
6. **تجربة المطور (DX)، الأدوات والصيانة**
7. **تحسين محركات البحث (SEO) وقابلية التوسع في المشاريع الكبيرة**

<TOC/>

> **ملخص**: كلاهما يمكنه تعريب تطبيقات Vue. إذا كنت تريد **محتوى مخصص للمكونات**، **أنواع TypeScript صارمة**، **فحوصات مفاتيح مفقودة أثناء البناء**، **قواميس معزولة بشجرة الاهتزاز (tree-shaken)**، و**مساعدات مدمجة للتوجيه وSEO** بالإضافة إلى **محرر بصري وترجمات مدعومة بالذكاء الاصطناعي**، فإن **Intlayer** هو الخيار الأكثر تكاملاً وحداثة.

## التموقع على مستوى عالٍ

- **vue-i18n** - مكتبة التدويل الافتراضية لـ Vue. تنسيق رسائل مرن (نمط ICU)، كتل `<i18n>` في ملفات المكونات المفردة (SFC) للرسائل المحلية، ونظام بيئي كبير. الأمان والصيانة على نطاق واسع تقع بشكل رئيسي على عاتقك.
- **Intlayer** - نموذج محتوى يركز على المكونات لـ Vue/Vite/Nuxt مع **أنواع TypeScript صارمة**، **فحوصات أثناء وقت البناء**، **عزل القواميس بشجرة الاهتزاز (tree-shaking)**، **مساعدات التوجيه وSEO**، محرر بصري/نظام إدارة محتوى اختياري، وترجمات مدعومة بالذكاء الاصطناعي.

## ما هي التكلفة أثناء وقت البناء

قبل جداول الميزات، الجزء المقاس. يقوم [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom) ببناء نفس تطبيق Vite + Vue 3 (10 صفحات، 10 لغات) مع كل مكتبة ويسجل ما يقوم المتصفح بتنزيله:

<I18nBenchmark framework="vite-vue" vertical/>

| Setup                | Lib size (gz) | Page JS avg (gz) | Page leak | Component avg (gz) |
| -------------------- | ------------: | ---------------: | --------: | -----------------: |
| **base** (no i18n)   |        0.0 KB |          41.3 KB |         - |             1.1 KB |
| `vue-i18n`           |       24.3 KB |         134.9 KB |     90.0% |           196.0 KB |
| `@intlayer/vue-i18n` |        7.9 KB |          47.0 KB |      0.0% |             8.4 KB |
| **`vue-intlayer`**   |    **3.9 KB** |      **57.1 KB** |  **0.0%** |         **7.7 KB** |

يزن وقت تشغيل `vue-i18n` بمفرده **6 أضعاف** Intlayer، وتحمل كل صفحة **90% من سلاسل الصفحات الأخرى**، والمكون المترجم بمعزل يسحب **196 كيلوبايت** لأن `useI18n()` يربطه بشجرة الرسائل العامة بأكملها. التقرير الكامل مع توقيتات التفاعل وتحميل الصفحة موجود في [مقارنة vue-i18n مقابل Intlayer](https://intlayer.org/ar/blog/vue-i18n-vs-intlayer-benchmark).

<ClickToOpenIframe
src="https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-vite_vue.md"
width="100%"
height="600px"
style="border:none;"
/>

> الجدول الكامل في [تقرير قياس أداء Vue](https://intlayer.org/ar/doc/benchmark/vue).

## مقارنة الميزات جنبًا إلى جنب (مركزة على Vue)

| الميزة                                                                   | **Intlayer**                                                              | **vue-i18n**                                                           |
| ------------------------------------------------------------------------ | ------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| **الترجمات بالقرب من المكونات**                                          | ✅ نعم، المحتوى متواجد بجانب كل مكون (مثلاً، `MyComp.content.ts`)         | ✅ نعم، عبر كتل SFC `<i18n>` (اختياري)                                 |
| **تكامل TypeScript**                                                     | ✅ متقدم، أنواع **صارمة** مولدة تلقائيًا وإكمال تلقائي للمفاتيح           | ✅ أنواع جيدة؛ **السلامة الصارمة للمفاتيح تتطلب إعدادات/انضباط إضافي** |
| **كشف الترجمات المفقودة**                                                | ✅ تحذيرات/أخطاء أثناء وقت البناء وظهور في TS                             | ⚠️ استرجاع/تحذيرات أثناء وقت التشغيل                                   |
| **المحتوى الغني (المكونات/Markdown)**                                    | ✅ دعم مباشر للعناصر الغنية وملفات محتوى Markdown                         | ⚠️ محدود (المكونات عبر `<i18n-t>`, وMarkdown عبر إضافات خارجية)        |
| **الترجمة المدعومة بالذكاء الاصطناعي**                                   | ✅ سير عمل مدمج باستخدام مفاتيح مزود الذكاء الاصطناعي الخاصة بك           | ❌ غير مدمج                                                            |
| **المحرر المرئي / نظام إدارة المحتوى (CMS)**                             | ✅ محرر مرئي مجاني ونظام إدارة محتوى اختياري                              | ❌ غير مدمج (استخدم منصات خارجية)                                      |
| **التوجيه المحلي**                                                       | ✅ أدوات مساعدة لـ Vue Router/Nuxt لإنشاء مسارات وروابط محلية و`hreflang` | ⚠️ ليس جزءًا أساسيًا (استخدم Nuxt i18n أو إعداد Vue Router مخصص)       |
| **توليد المسارات الديناميكية**                                           | ✅ نعم                                                                    | ❌ غير متوفر (يوفره Nuxt i18n)                                         |
| **التعددية والتنسيق**                                                    | ✅ أنماط تعداد؛ منسقات تعتمد على Intl                                     | ✅ رسائل بأسلوب ICU؛ منسقات Intl                                       |
| **صياغات المحتوى**                                                       | ✅ `.ts`، `.js`، `.json`، `.md`، `.txt` (YAML قيد العمل)                  | ✅ `.json`، `.js` (بالإضافة إلى كتل SFC `<i18n>`)                      |
| **دعم ICU**                                                              | ⚠️ قيد العمل                                                              | ✅ نعم                                                                 |
| **أدوات تحسين محركات البحث (خريطة الموقع، الروبوتات، البيانات الوصفية)** | ✅ أدوات مساعدة مدمجة (غير مرتبطة بإطار عمل معين)                         | ❌ ليست جزءًا أساسيًا (Nuxt i18n/المجتمع)                              |
| **SSR/SSG**                                                              | ✅ يعمل مع Vue SSR و Nuxt؛ لا يعيق التقديم الثابت                         | ✅ يعمل مع Vue SSR/Nuxt                                                |
| **إزالة الشجر (شحن المحتوى المستخدم فقط)**                               | ✅ لكل مكون أثناء وقت البناء                                              | ⚠️ جزئي؛ يتطلب تقسيم الكود يدويًا / رسائل غير متزامنة                  |
| **التحميل الكسول**                                                       | ✅ لكل لغة / لكل قاموس                                                    | ✅ دعم رسائل اللغة غير المتزامنة                                       |
| **تنقية المحتوى غير المستخدم**                                           | ✅ نعم (وقت البناء)                                                       | ❌ غير مدمج                                                            |
| **قابلية صيانة المشاريع الكبيرة**                                        | ✅ يشجع على هيكلية معيارية وصديقة لأنظمة التصميم                          | ✅ ممكن، لكنه يحتاج إلى انضباط قوي في الملفات/المساحات الاسمية         |
| **النظام البيئي / المجتمع**                                              | ⚠️ أصغر لكنه ينمو بسرعة                                                   | ✅ كبير وناضج في نظام Vue البيئي                                       |

## مقارنة متعمقة

<AccordionGroup>
<Accordion header="1) البنية وقابلية التوسع">

- **vue-i18n**: الإعدادات الشائعة تستخدم **كتالوجات مركزية** لكل لغة (يمكن تقسيمها اختياريًا إلى ملفات/مساحات أسماء). كتل `<i18n>` في ملفات المكونات المفردة (SFC) تسمح برسائل محلية، لكن الفرق غالبًا ما تعود إلى الكتالوجات المشتركة مع نمو المشاريع. راجع [i18n لكل مكون مقابل المركزية](https://intlayer.org/ar/blog/per-component-vs-centralized-i18n).
- **Intlayer**: يشجع على **قواميس لكل مكون** مخزنة بجانب المكون الذي تخدمه. هذا يقلل من النزاعات بين الفرق، ويحافظ على اكتشاف المحتوى، ويحد بشكل طبيعي من الانحراف/المفاتيح غير المستخدمة.

**لماذا هذا مهم:** في تطبيقات Vue الكبيرة أو أنظمة التصميم، **المحتوى المعياري** يتوسع بشكل أفضل من الكتالوجات الأحادية.

</Accordion>
<Accordion header="2) TypeScript والأمان البرمجي">

- **vue-i18n**: دعم جيد لـ TS؛ **الكتابة الصارمة للمفاتيح** عادة ما تحتاج إلى مخططات/جنيريكس مخصصة واتفاقيات دقيقة.
- **Intlayer**: **ينشئ أنواعًا صارمة** من محتواك، مما يوفر **الإكمال التلقائي في بيئة التطوير (IDE)** و**أخطاء وقت الترجمة** للأخطاء الإملائية/المفاتيح المفقودة.

**لماذا هذا مهم:** الكتابة الصارمة تكتشف المشاكل **قبل** وقت التشغيل.

</Accordion>
<Accordion header="3) التعامل مع الترجمات المفقودة">

- **vue-i18n**: تحذيرات/استرجاعات **وقت التشغيل** (مثل الرجوع إلى لغة أو مفتاح بديل). راجع [اكتشاف الترجمات المفقودة](https://intlayer.org/ar/blog/detecting-missing-translations).
- **Intlayer**: كشف **وقت البناء** مع تحذيرات/أخطاء عبر اللغات والمفاتيح.، بالإضافة إلى `npx intlayer test` في CI.

**لماذا هذا مهم:** فرض القواعد وقت البناء يحافظ على واجهة المستخدم في الإنتاج نظيفة ومتسقة.

</Accordion>
<Accordion header="4) استراتيجية التوجيه وعناوين URL (Vue Router/Nuxt)">

- **كلاهما** يمكن أن يعمل مع مسارات محلية. راجع [دليل hreflang](https://intlayer.org/ar/blog/hreflang-guide-multilingual-seo).
- **Intlayer** يوفر مساعدات لـ **إنشاء مسارات محلية**، و**إدارة بادئات اللغة**، وإصدار **`<link rel="alternate" hreflang>`** لتحسين محركات البحث (SEO). مع Nuxt، يكمل توجيه الإطار.

**لماذا هذا مهم:** تقليل طبقات الربط المخصصة و**تحسين SEO أنظف** عبر اللغات.

</Accordion>
<Accordion header="5) الأداء وسلوك التحميل">

- **vue-i18n**: يدعم رسائل اللغة غير المتزامنة؛ تجنب التجميع الزائد مسؤوليتك (قسّم الكتالوجات بعناية). يوضح الاختبار القياسي أعلاه ذلك بالأرقام: 134.9 كيلوبايت مقابل 57.1 كيلوبايت لكل صفحة.
- **Intlayer**: يقوم بـ **تحليل الشجرة** أثناء البناء و**التحميل الكسول لكل قاموس/لغة**. المحتوى غير المستخدم لا يتم شحنه.

**لماذا هذا مهم:** حزم أصغر وتشغيل أسرع لتطبيقات Vue متعددة اللغات.

</Accordion>
<Accordion header="6) تجربة المطور والأدوات">

- **vue-i18n**: وثائق ومجتمع ناضج؛ ستعتمد عادةً على **منصات الترجمة الخارجية** لسير العمل التحريري.
- **Intlayer**: يوفر **محرر بصري مجاني**، و**نظام إدارة محتوى اختياري** (متوافق مع Git أو خارجي)، و**امتداد VSCode**، وأدوات **CLI/CI**، وترجمات **مدعومة بالذكاء الاصطناعي** باستخدام مفاتيح المزود الخاصة بك.، و**خادم MCP**

**لماذا هذا مهم:** تقليل تكلفة العمليات ودورة تطوير-محتوى أقصر.

</Accordion>
<Accordion header="7) تحسين محركات البحث (SEO)، SSR و SSG">

- **كلاهما** يعمل مع Vue SSR وNuxt. راجع [التدويل وتحسين محركات البحث (SEO)](https://intlayer.org/ar/blog/SEO-and-i18n).
- **Intlayer**: يضيف **مساعدات SEO** (خرائط الموقع/البيانات الوصفية/`hreflang`) التي لا تعتمد على إطار عمل معين وتتوافق بشكل جيد مع بناء Vue/Nuxt.

**لماذا هذا مهم:** تحسين SEO دولي بدون تعقيدات خاصة.

</Accordion>
</AccordionGroup>

## لماذا Intlayer؟ (المشكلة والمنهجية)

![Centralized catalogs versus per-component dictionaries](https://github.com/aymericzip/intlayer/blob/main/docs/assets/project_stucture_18n_vs_intlayer.png?raw=true)

تبدأ معظم حزم i18n (بما في ذلك **vue-i18n**) من **كتالوجات مركزية**:

<Tabs defaultTab="per-locale" group="catalog">
<Tab label="ملف واحد لكل لغة" value="per-locale">

```bash
.
├── locales
│   ├── en.json
│   ├── es.json
│   └── fr.json
└── src
    └── components
        └── MyComponent.vue
```

</Tab>
<Tab label="مجلد واحد لكل لغة" value="per-folder">

```bash
.
├── locales
│   ├── en
│   │  ├── footer.json
│   │  └── navbar.json
│   ├── fr
│   │  ├── footer.json
│   │  └── navbar.json
│   └── es
│      ├── footer.json
│      └── navbar.json
└── src
    └── components
        └── MyComponent.vue
```

</Tab>
</Tabs>

يستمر هذا المجلد في التضخم، مساحة اسم واحدة لكل ميزة في كل لغة:

```txt
locales
├── EN
│   ├── blog.json
│   ├── about.json
│   ├── auth.json
│   ├── blog.json
│   ├── cart.json
│   ├── categories.json
│   ├── contact.json
│   ├── dashboard.json
│   ├── errors.json
│   ├── faq.json
│   ├── footer.json
│   ├── form.json
│   ├── home.json
│   ├── language.json
│   ├── navbar.json
│   ├── ... 65 files
│   └── validation.json
└── ES
```

غالبًا ما يبطئ هذا التطوير مع نمو التطبيقات:

1. **لمكون جديد** تقوم بإنشاء/تعديل الكتالوجات البعيدة، ربط مساحات الأسماء، والترجمة (غالبًا عبر النسخ/اللصق اليدوي من أدوات الذكاء الاصطناعي).
2. **عند تغيير المكونات** تبحث عن المفاتيح المشتركة، تترجم، تحافظ على تزامن اللغات، تزيل المفاتيح غير المستخدمة، وتنسق هياكل JSON.

**Intlayer** يحدد المحتوى **لكل مكون** ويحتفظ به **بالقرب من الكود**، كما نفعل بالفعل مع CSS، والقصص، والاختبارات، والوثائق:

```bash
.
└── components
    └── MyComponent
        ├── MyComponent.content.ts
        └── MyComponent.vue
```

<Tabs defaultTab="intlayer" group="techno">
<Tab label="vue-i18n" value="vue-i18n">

```json fileName="./locales/en.json"
{
  "componentExample": {
    "greeting": "Hello World"
  }
}
```

```vue fileName="./components/MyComponent.vue"
<script setup lang="ts">
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>

<template>
  <span>{{ t("componentExample.greeting") }}</span>
</template>
```

يجب تعديل كل ملف لغة يدويًا، والمفتاح مجرد نص عادي: أي خطأ مطبعي يظهر كـ `componentExample.greting` في الإنتاج.

</Tab>
<Tab label="Intlayer" value="intlayer">

```ts fileName="./components/MyComponent/myComponent.content.ts"
import { t, type Dictionary } from "intlayer";

const componentExampleContent = {
  key: "component-example",
  content: {
    greeting: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
  },
} satisfies Dictionary;

export default componentExampleContent;
```

```vue fileName="./components/MyComponent/MyComponent.vue"
<script setup lang="ts">
import { useIntlayer } from "vue-intlayer"; // Vue integration

const { greeting } = useIntlayer("component-example");
</script>

<template>
  <span>{{ greeting }}</span>
</template>
```

توجد جميع اللغات في ملف واحد محدد الأنواع بجوار المكون.

</Tab>
</Tabs>

تتضمن هذه الطريقة:

- **تسريع التطوير** (الإعلان مرة واحدة؛ الإكمال التلقائي من IDE/AI).
- **تنظيف قاعدة الكود** (مكون واحد = قاموس واحد).
- **تسهيل التكرار/الترحيل** (نسخ المكون ومحتواه معًا).
- **تجنب المفاتيح الميتة** (المكونات غير المستخدمة لا تستورد المحتوى).
- **تحسين التحميل** (المكونات المحملة عند الطلب تجلب محتواها معها).

## ميزات إضافية لـ Intlayer (ذات صلة بـ Vue)

- **دعم عبر الأُطُر المختلفة**: يعمل مع Vue، Nuxt، Vite، React، Express، والمزيد.
- **إدارة المحتوى مدعومة بجافاسكريبت**: الإعلان في الكود مع مرونة كاملة.
- **ملف إعلان لكل لغة**: قم بتهيئة جميع اللغات ودع الأدوات تولد الباقي.
- **بيئة آمنة من حيث النوع**: إعداد TS قوي مع الإكمال التلقائي.
- **استرجاع محتوى مبسط**: هوك/مركب واحد لجلب كل المحتوى لقاموس معين.
- **قاعدة كود منظمة**: مكون واحد = قاموس واحد في نفس المجلد.
- **توجيه محسّن**: مساعدات لمسارات وبيانات وصفية محلية لـ **Vue Router/Nuxt**.
- **دعم Markdown**: استيراد Markdown عن بُعد/محلي لكل لغة؛ عرض البيانات الوصفية في الكود.
- **محرر بصري مجاني ونظام إدارة محتوى اختياري**: التأليف بدون منصة ترجمة مدفوعة؛ مزامنة صديقة لـ Git.
- **محتوى قابل للاقتصاص الشجري (Tree-shakable)**: يشحن فقط ما يُستخدم؛ يدعم التحميل عند الطلب.
- **صديق للتصيير الثابت**: لا يعيق SSG.
- **ترجمات مدعومة بالذكاء الاصطناعي**: ترجم إلى 231 لغة باستخدام مزود الذكاء الاصطناعي الخاص بك/مفتاح API.
- **خادم MCP وامتداد VSCode**: أتمتة سير عمل i18n والتأليف داخل بيئة التطوير المتكاملة الخاصة بك.
- **التشغيل البيني**: جسور مع **vue-i18n**، **react-i18next**، و **react-intl** عند الحاجة.

## متى تختار أيهما؟

<AccordionGroup>
<Accordion header="اختيار vue-i18n">

تريد **النهج القياسي لـ Vue**، وتشعر بالراحة في إدارة القواميس ومساحات الأسماء بنفسك، وتطبيقك **صغير إلى متوسط الحجم** (أو تعتمد بالفعل على Nuxt i18n). كتل SFC `<i18n>` و `setLocaleMessage()` في وقت التشغيل هي ميزات لا يحاكيها Intlayer عمدًا.

</Accordion>
<Accordion header="اختيار Intlayer">

تقدر **المحتوى المحدد بنطاق المكون**، و**TypeScript الصارم**، و**ضمانات وقت البناء**، و**tree-shaking**، وأدوات التوجيه ومحركات البحث والمحرر المدمجة، خاصة **لقواعد كود Vue/Nuxt المعيارية الكبيرة** وأنظمة التصميم. ابدأ مع [Intlayer مع Vue](https://intlayer.org/ar/doc/environment/vite-and-vue) أو [مع Nuxt](https://intlayer.org/ar/doc/environment/nuxt-and-vue).

</Accordion>
<Accordion header="اختيار @intlayer/vue-i18n">

تستخدم `vue-i18n` اليوم وتريد توفير حجم الحزمة دون تعديل ملفات `.vue`. يحافظ [محول التوافق](https://intlayer.org/ar/doc/compatibility/vue-i18n) على `createI18n` و `useI18n` و `t()` و `d()` و `n()` و `$t` و `v-t`، ويخدمها من قواميس مجمعة. تمت المقارنة جنبًا إلى جنب في [vue-i18n مقابل @intlayer/vue-i18n](https://intlayer.org/ar/blog/vue-i18n-vs-intlayer-vue-i18n).

</Accordion>
</AccordionGroup>

## التوافقية مع vue-i18n

يمكن لـ `intlayer` أيضًا أن يساعدك في إدارة مساحات أسماء `vue-i18n` الخاصة بك.

باستخدام `intlayer`، يمكنك التصريح عن محتواك بصيغة مكتبة i18n المفضلة لديك، وسيقوم intlayer بإنشاء مساحات الأسماء الخاصة بك في الموقع الذي تختاره (مثال: `/messages/{{locale}}/{{namespace}}.json`). راجع [وثائق توافق vue-i18n](https://intlayer.org/ar/doc/compatibility/vue-i18n) و [محول Nuxt i18n](https://intlayer.org/ar/doc/compatibility/nuxtjs-i18n).

## الأسئلة الشائعة

<FAQ>

<Question title="هل Intlayer بديل لـ vue-i18n أم طبقة فوقه؟">

كلاهما، اعتمادًا على كيفية اعتماده. `vue-intlayer` هو وقت تشغيل أصلي مع دالة `useIntlayer()` خاصة به. `@intlayer/vue-i18n` هو محول توافق يحافظ على واجهة برمجة تطبيقات `vue-i18n` ويستبدل ما ترتبط به، حتى تتمكن من الترحيل دون لمس المكونات ثم المضي قدمًا ملفًا تلو الآخر بعد ذلك.

</Question>

<Question title="ماذا يحدث لكتل SFC <i18n> الخاصة بي؟">

المحول لا يقرأها. انقل تلك الرسائل إلى ملف JSON الخاص باللغة، أو إلى ملف `.content.ts` بجوار المكون، وهو نفس المفهوم مع أنواع منشأة تلقائيًا. هذه هي ميزة `vue-i18n` الوحيدة التي لا يتم نقلها.

</Question>

<Question title="هل يعمل Intlayer مع Nuxt؟">

نعم. يغطي [Intlayer مع Nuxt](https://intlayer.org/ar/doc/environment/nuxt-and-vue) التوجيه متعدد اللغات والبرمجيات الوسيطة للكشف عن اللغة وإنشاء خريطة الموقع. إذا كنت تستخدم `@nuxtjs/i18n`، فإن [محول توافق Nuxt i18n](https://intlayer.org/ar/doc/compatibility/nuxtjs-i18n) هو مسار الترحيل.

</Question>

<Question title="هل يمكنني الاحتفاظ بـ locales/{locale}.json كمصدر وحيد للحقيقة؟">

نعم. يقرأها [ملحق مزامنة JSON](https://intlayer.org/ar/doc/compatibility/vue-i18n) بلهجة `vue-i18n` (`{name}`، `{0}`، وصيغ الجمع `"car | cars"`) ويكتب الترجمات مرة أخرى عندما يقوم CLI أو CMS بتحديثها.

</Question>

<Question title="هل يعمل ICU مع Intlayer على Vue؟">

دعم ICU الأصلي قيد التطوير. يتعامل محول `@intlayer/vue-i18n` مع بناء جملة الرسائل الخاصة بـ `vue-i18n`، بما في ذلك صيغ الجمع والاستيفاء المحدد والقوائم. للحصول على نموذج صيغ الجمع الخاص بـ Intlayer، راجع [محتوى التعداد](https://intlayer.org/ar/doc/concept/content/enumeration).

</Question>

</FAQ>

## GitHub STARs

تعد نجوم GitHub مؤشرًا قويًا على شعبية المشروع وثقة المجتمع وأهميته على المدى الطويل. على الرغم من أنها ليست مقياسًا مباشرًا للجودة التقنية، إلا أنها تعكس عدد المطورين الذين يجدون المشروع مفيدًا ويتابعون تقدمه ومن المرجح أن يتبنوه. لتقدير قيمة المشروع، تساعد النجوم في مقارنة الإقبال عبر البدائل وتوفر رؤى حول نمو النظام البيئي.

[![Star History Chart](https://api.star-history.com/chart?repos=intlify%2Fvue-i18n%2Caymericzip%2Fintlayer&type=date&legend=top-left)](https://star-history.com/#intlify/vue-i18n&aymericzip/intlayer)

## الخلاصة

كلا من **vue-i18n** و **Intlayer** يقومان بتوطين تطبيقات Vue بشكل جيد. الفرق هو **مدى ما يجب عليك بناؤه بنفسك** لتحقيق إعداد قوي وقابل للتوسع:

- مع **Intlayer**، يأتي **المحتوى المعياري**، و**TypeScript الصارم**، و**السلامة أثناء وقت البناء**، و**حزم معزولة من الشجرة (tree-shaken)**، و**أدوات التوجيه/SEO/المحرر** **مضمنة بشكل افتراضي**.
- إذا كانت أولويات فريقك هي **قابلية الصيانة والسرعة** في تطبيق Vue/Nuxt متعدد اللغات وموجه بالمكونات، فإن Intlayer يقدم **التجربة الأكثر اكتمالًا** اليوم.

## قراءات إضافية

- [vue-i18n vs Intlayer benchmark](https://intlayer.org/ar/blog/vue-i18n-vs-intlayer-benchmark), the measured run behind the table above
- [vue-i18n vs @intlayer/vue-i18n](https://intlayer.org/ar/blog/vue-i18n-vs-intlayer-vue-i18n), the adapter on the same app
- [Is vue-i18n outdated?](https://intlayer.org/ar/blog/is-vue-i18n-outdated)
- [How to pick a Vue i18n library](https://intlayer.org/ar/blog/how-to-pick-vue-i18n-library)
- [Using Intlayer with vue-i18n](https://intlayer.org/ar/blog/intlayer-with-vue-i18n)
- [Vue benchmark report](https://intlayer.org/ar/doc/benchmark/vue)
- [Migration guide: vue-i18n to Intlayer](https://intlayer.org/ar/doc/migration/vue-i18n)
- [Bundle optimization](https://intlayer.org/ar/doc/concept/bundle-optimization) and [the Intlayer compiler](https://intlayer.org/ar/doc/compiler)

Refer to ['Why Intlayer?' doc](https://intlayer.org/ar/doc/why) for more details.
