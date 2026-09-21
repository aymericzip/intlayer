---
createdAt: 2026-09-16
updatedAt: 2026-09-16
title: "كيفية اختيار مكتبة Vue i18n المناسبة في عام 2026"
description: دليل لاتخاذ القرار حول تدويل Vue وNuxt. ما هي الأسئلة التي يجب الإجابة عليها قبل المقارنة بين vue-i18n و@nuxtjs/i18n وfluent-vue وParaglide وIntlayer، وما تكلفة كل خيار في حجم الحزمة وتحديد الأنواع (typing) وحمولة SSR.
keywords:
  - vue i18n
  - vue internationalization
  - vue-i18n
  - nuxt i18n
  - fluent-vue
  - Paraglide
  - Intlayer
  - مقارنة مكتبات i18n
slugs:
  - blog
  - how-to-pick-vue-i18n-library
author: aymericzip
---

# كيفية اختيار مكتبة Vue i18n المناسبة

يُعد "Vue i18n" مصطلحاً عاماً واسماً للمكتبة التي يثبتها الجميع تقريباً في نفس الوقت. هذا أمر مريح ومضلل في آن واحد: `vue-i18n` خيار افتراضي جيد، ولكنه ليس الخيار الوحيد، ونادراً ما تُطرح الأسئلة التي يجب أن تقود هذا الاختيار (مثل دعم SSR من عدمه، وعدد الصفحات، ومن يكتب الترجمات) قبل تشغيل `npm install`.

يطرح هذا الدليل هذه الأسئلة أولاً، ثم يطابق الإجابات مع المكتبات المناسبة، لكل من تطبيق Vite + Vue البسيط وتطبيق Nuxt.

![منظومة مكتبات Vue i18n](https://github.com/aymericzip/intlayer/blob/main/docs/assets/cloud_i18n_logo.webp?raw=true)

## جدول المحتويات

<TOC/>

## ستة أسئلة يجب الإجابة عليها قبل مقارنة المكتبات

1. **هل هو تطبيق Vite SPA أم Nuxt؟** في تطبيق SPA، تكون تكلفة القاموس مشكلة تتعلق بحجم حزمة JS. أما في Nuxt، فهي أيضاً مشكلة تتعلق بحمولة HTML، لأن الرسائل يتم تسلسلها (serialized) داخل حالة SSR ويتم عمل hydration لها. لهذا السبب تأتي معظم التقارير التي تفيد بأن "vue-i18n بطيء" من تطبيقات Nuxt.
2. **من يكتب الترجمات؟** المطورون، أم نظام إدارة الترجمة (TMS)، أم وكالة تقدم سلاسل نصية بتنسيق ICU، أم عبر pipeline ذكاء اصطناعي. يستخدم `vue-i18n` صيغة الجمع الخاصة به المفصولة بخط عمودي (pipe-separated) وليس ICU. وهذا أمر مهم إذا كانت النصوص تأتي من مصدر خارجي.
3. **كم عدد اللغات والصفحات؟** يمكن لتطبيق يحتوي على لغتين وخمس صفحات تضمين كل شيء دفعة واحدة. لكن تطبيقاً به عشر لغات وأربعون مساراً لا يمكنه ذلك، وتصبح استراتيجية التحميل هي التكلفة الأساسية.
4. **هل تحتاج إلى types على المفاتيح؟** يستمر `t("cart.totl")` في عمل compile بنجاح في `vue-i18n` ما لم تقم بتمرير generic لمخطط الرسائل (message schema generic)، وهذا المخطط يتعارض مع القواميس التي يتم تحميلها بشكل كسول (lazily loaded).
5. **ما الذي تحتويه النصوص؟** هل هي نصوص واجهة مستخدم (UI labels) فقط، أم markdown، أم روابط داخل الجمل، ومكونات مخصصة لكل لغة. المحتوى الغني (Rich content) هو المكان الذي يصبح فيه استخدام `t()` التي تُرجع نصاً عادياً أمراً غير مريح.
6. **هل يمثل CSP قيداً لديك؟** تقوم بنية `vue-i18n` الافتراضية بترجمة الرسائل داخل المتصفح باستخدام `new Function`. تحتاج البنيات المقتصرة على وقت التشغيل (runtime-only) إلى `@intlify/unplugin-vue-i18n` للترجمة المسبقة أثناء وقت البناء (build time).

اكتب الإجابات، فكل ما يلي يعتمد عليها.

## المشهد العام في صورة واحدة

يحتوي نظام Vue البيئي على عدد أقل من مكتبات i18n مقارنة بـ React، وهي تنتمي إلى موجات معمارية مختلفة.

![تاريخ مكتبات JavaScript i18n](https://github.com/aymericzip/intlayer/blob/main/docs/assets/history_i18n.webp?raw=true)

<AccordionGroup>
<Accordion header="قواميس وقت التشغيل (2015 إلى 2019): vue-i18n، @nuxt/i18n">

ظهر `vue-i18n` في عام 2015 وظل الخيار الافتراضي منذ ذلك الحين. يقوم `@nuxt/i18n` بتغليفه مع توجيه المسارات حسب اللغة، وإضافة وسوم SEO، والتحميل الكسول لكل لغة. يتم تجميع الرسائل وتحويلها إلى render functions، إما في وقت البناء إذا أضفت unplugin، أو في المتصفح خلاف ذلك.

</Accordion>
<Accordion header="تنسيقات بديلة (2020): fluent-vue">

قدمت ملفات Mozilla Fluent بصيغة `.ftl` بنية رسائل أكثر سهولة مع متغيرات تراعي قواعد اللغة. لا توجد key types، ويقوم ملحق Vite بتحميل كل اللغات في كل صفحة.

</Accordion>
<Accordion header="المترجم والمحتوى الموزع محلياً (2024 إلى 2026): Paraglide، Intlayer">

يقوم Paraglide بإنشاء دالة واحدة لكل رسالة ويتيح للـ bundler إزالة الأجزاء غير المستخدمة عبر tree-shaking. يعلن Intlayer عن المحتوى لكل مكون في ملفات `.content.ts`، ويولد الأنواع (types)، ويرسل فقط ما يعرضه المسار الحالي.

</Accordion>
</AccordionGroup>

يغطي منشور [تاريخ تدويل JavaScript](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ar/history_of_i18n.md) كل موجة بالتفصيل.

## القرار الأكثر أهمية: أين يقع المحتوى ومتى يتم تحميله

يفسر خياران هيكليان معظم الفروق في حجم الحزمة بين الإعدادات المختلفة:

- **محتوى مركزي أو محدد النطاق (scoped).** ملف واحد `locales/en.json` للتطبيق بالكامل، أو إعلان مستقل لكل مكون.
- **استيراد ثابت (static) أو ديناميكي (dynamic).** تحميل كل شيء عند بدء التشغيل، أو جلب اللغة النشطة (ومسار الصفحة النشط مثالياً) عند الطلب.

يوضح الرسم البياني التقديري حجم الحمولة لتطبيق نظري يتكون من 1 إلى 10 صفحات، مترجم إلى 1 إلى 10 لغات، مع حوالي 30 كيلوبايت من النصوص لكل صفحة.

![تسريب المحتوى النظري حسب البنية المعمارية](https://github.com/aymericzip/intlayer/blob/main/docs/assets/theorical_content_leakage.webp?raw=true)

يدعم `vue-i18n` المحور الديناميكي: استخدام `setLocaleMessage` بعد `import()` يعني التوقف عن إرسال تسع لغات لا يقرأها أحد. ولكن ما لا يوفره لك هو محور الصفحات. يُعد قاموس اللغة كائناً واحداً، وتحميله يعني تحميل نصوص جميع الصفحات. في تطبيق SPA قد لا يلاحظ أحد ذلك. أما في Nuxt، مع استخدام `@nuxtjs/i18n` وأكثر من عشر صفحات، يحمل كل مسار نصوص جميع المسارات الأخرى مرتين: في حزمة JS وفي حمولة SSR.

يقيس [مقارنة أداء Vue](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/benchmark/vue.md) هذا تحت مسمى "تسريب من المسارات الأخرى" و"تسريب من اللغات الأخرى". إذا كانت إجابتك على السؤال الثالث هي "صفحات كثيرة"، فإن هذا القسم يفوق في أهميته أي تفضيل لـ API. ويغطي مقال [تدويل كل مكون على حدة مقابل التدويل المركزي](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ar/per-component_vs_centralized_i18n.md) جانب الصيانة لنفس المقايضة.

## المكتبات المرشحة

أحجام المكتبات مأخوذة من [مقارنة أداء Vue](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/benchmark/vue.md): الملحق بالإضافة إلى composable في مكون فارغ، بعد التجميع (bundling) وtree-shaking والتصغير (minification)، في تطبيق مكون من 10 صفحات و10 لغات. يتم قياس المحتوى بشكل منفصل.

| المكتبة        | نموذج المحتوى                                    | أمان الأنواع                     | تنسيق الرسائل                       | تقسيم حسب المسار (Per-route) | حجم المكتبة                                      |
| :------------- | :----------------------------------------------- | :------------------------------- | :---------------------------------- | :--------------------------- | :----------------------------------------------- |
| `vue-i18n`     | قواميس مركزية لكل لغة، كتل SFC `<i18n>` اختيارية | 2/5 — اختياري عبر schema generic | خاص (pipe plurals)                  | لا                           | ~24.3 kB                                         |
| `@nuxtjs/i18n` | مثل `vue-i18n`، بالإضافة إلى التوجيه ووسوم SEO   | 2/5 — مماثل                      | مماثل                               | لا، لكل لغة فقط              | ~24.3 kB                                         |
| `fluent-vue`   | ملفات `.ftl` (Mozilla Fluent)                    | 1/5 — لا يوجد                    | Fluent                              | لا                           | ~29.7 kB                                         |
| Paraglide      | مشروع inlang، دوال مولدة                         | 3.5/5 — مولدة                    | خاص                                 | عبر tree-shaking             | شبه معدوم (بسبب الكود المولَّد داخل قاعدة الكود) |
| Intlayer       | ملف `.content.ts` واحد لكل مكون                  | 5/5 — مولدة، ومفعلة افتراضياً    | Intlayer (+ ICU, i18next, vue-i18n) | نعم، لكل مكون                | ~3.9 kB                                          |

> الأرقام هي لقطة لإصدارات المقارنة المعيارية. قم بإجراء الاختبار على تطبيقك الخاص قبل اتخاذ القرار بناءً على الحجم وحده.
> أمان الأنواع: 5/5 يعني أن المفاتيح والمعاملات وكل لغة يتم التحقق منها دون إعداد يدوي، بما في ذلك منسق العناوين (URL formatter) والدوال المساعدة (helpers).

يرجع حجم مكتبة Paraglide الشبه معدوم إلى طبيعة بنائها: يتم توليد runtime مباشرة داخل المستودع الخاص بك، مما يعني خطوة إعادة توليد قبل كل عملية push ومشاكل تضارب الدمج (merge conflicts) في الملفات المولدة. يتطلب Intlayer ملحق `vite-intlayer` (أو وحدة Nuxt)، لذلك لا يمكنه العمل بدون خطوة build.

## مطابقة إجاباتك مع المكتبة المناسبة

<AccordionGroup>
<Accordion header="تطبيق Vite SPA، فريق صغير، لغات قليلة">

استخدم `vue-i18n` في وضع Composition (`legacy: false`)، مع `@intlify/unplugin-vue-i18n` لشحن نسخة runtime-only. قم بتحميل اللغات بشكل كسول عبر `import()`. يغطي هذا معظم التطبيقات الصغيرة وتتوفر حلول المجتمع في كل مكان. تتيح كتل SFC `<i18n>` وضع الرسائل بجانب المكون، وهو أمر مفيد، ولكن أدوات الاستخراج وتكامل TMS حولها أضعف مقارنة بقواميس JSON، لذا حدد مبكراً ما سيستخدمه الفريق.

</Accordion>
<Accordion header="تطبيق Nuxt مع توجيه اللغات، وsitemap، وhreflang">

يوفر لك `@nuxtjs/i18n` استراتيجية التوجيه، ووسوم `hreflang`، والتعرف على لغة المستخدم دون الحاجة لكتابة كود مخصص، وهذا وحده يبرر استخدامه لمواقع المحتوى التي تحتوي على صفحات محدودة. لكن عيبه يكمن في قاموس كل لغة: فبعد تجاوز حوالي عشر صفحات، تحمل حمولة SSR نصوص كل المسارات الأخرى. إذا كان هذا هو وضعك، فإما أن تقوم بإعداد `vue-i18n` يدوياً برسائل مقسمة لكل مسار، أو تنتقل إلى المحتوى محدد النطاق (scoped content). يستعرض منشور [Nuxt i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ar/list_i18n_technologies/frameworks/nuxt.md) خيارات استراتيجية التوجيه أولاً.

</Accordion>
<Accordion header="الترجمات تأتي من TMS أو وكالة تقدم تنسيق ICU">

صيغة الجمع في `vue-i18n` (مثل `"no item | one item | {count} items"`) ليست ICU وليست قابلة للنقل بسهولة. يجب إبلاغ المترجمين بها، وتصدير TMS لن ينتجها تلقائياً. إما أن تتفق على التنسيق قبل إنشاء أول قاموس، أو تختار مكتبة يتطابق تنسيقها مع موفر الخدمة الخاص بك. دعم Intlayer لتنسيق ICU جزئي، فإذا كنت تتلقى سلاسل ICU اليوم، فاعتبر ذلك عائقاً أيضاً.

</Accordion>
<Accordion header="تطبيق كبير، مسارات متعددة، ميزانية محددة لحجم الحزمة أو حمولة SSR">

يفضل استخدام المحتوى محدد النطاق (scoped content) المترجم في وقت البناء. يحقق Paraglide ذلك عبر tree-shaking، والذي يعمل بسلاسة على Vite. ويحقق Intlayer ذلك من خلال الإعلانات على مستوى كل مكون ولا يرسل سوى ما يعرضه المسار الحالي. مع `vue-i18n`، يمكنك تقسيم الرسائل حسب المسار يدوياً، ولكن لا يوجد ما يفرض ذلك برمجياً، وأي مكون مشترك يستورد namespace عاماً سيلغي هذا التقسيم بهدوء.

</Accordion>
<Accordion header="أمان الأنواع (Type safety) أمر غير قابل للتفاوض">

يمكن إضافة types إلى `vue-i18n` عن طريق تمرير schema generic إلى `createI18n`. هذا يعمل، لكنه يتعطل في اللحظة التي يتم فيها تحميل القواميس بشكل كسول (lazily loaded)، لأن المخطط يصف رسائل قد لا تكون موجودة بعد. إذا كنت لا ترغب في صيانة ذلك يدوياً، فاختر مكتبة تولد الأنواع من المحتوى نفسه مثل: Paraglide أو Intlayer. يقارن منشور [اكتشاف الترجمات المفقودة](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ar/detecting_missing_translations.md) ما تلتقطه كل أداة أثناء وقت البناء.

</Accordion>
<Accordion header="المحتوى يتجاوز كونه نصوص واجهة مستخدم بسيطة">

صفحات Markdown، جمل تحتوي على `<RouterLink>` في المنتصف، ومكونات مخصصة لكل لغة. يوفر `vue-i18n` المكون `<i18n-t>` لإدراج المكونات (component interpolation)، وهو يعمل ولكنه مطول في الكتابة. تقبل عُقد محتوى Intlayer نصوص markdown وHTML والكائنات المتداخلة مباشرة، وهو ما يتناسب بشكل أفضل مع التطبيقات الغنية بالمحتوى.

</Accordion>
<Accordion header="سيتم إنشاء الترجمات بواسطة الذكاء الاصطناعي">

في هذه الحالة لم يعد هناك مستخدم لملف JSON المركزي يبرر وجوده. المحتوى الموزع محلياً إلى جانب CLI يملأ اللغات المفقودة هو المسار الأقصر. يعمل أمر `fill` في Intlayer باستخدام مفتاح API الخاص بك (OpenAI، Anthropic، Mistral، Gemini) ولا يعيد ترجمة سوى ما تغير.

</Accordion>
</AccordionGroup>

## نقاط ضعف كل مكتبة

- **`vue-i18n`**: الأثقل حجماً في المجموعة، تنسيق جمع خاص، إضافة الأنواع اختيارية وهشة مع التحميل الكسول، لا يوجد عزل حسب المسار، وتراكم المفاتيح غير المستخدمة بصمت. ترك `legacy: true` في تطبيق Vue 3 يبقي طبقة توافق Vue 2 ويفقد ميزة types في `useI18n()`.
- **`@nuxtjs/i18n`**: يرث كل ما سبق، وحمولة SSR تنقل نصوص جميع الصفحات بمجرد تجاوز عشرات المسارات.
- **`fluent-vue`**: بنية رسائل ممتازة، لا توجد key types، وملحق Vite يحمل كل المحتوى بجميع اللغات في كل صفحة. الأثقل في المقارنة المعيارية.
- **Paraglide**: ملفات مولدة يتم حفظها في المستودع، وإعادة التوليد مطلوبة قبل كل push، وتتم قراءة اللغة من ملفات تعريف الارتباط (cookie) أو التخزين مع كل استدعاء للرسالة بدلاً من store تفاعلي، مما يستهلك معالجة إضافية عند تغيير اللغة.
- **Intlayer**: ملحق بناء إلزامي، منظومة بيئية أصغر، دعم جزئي لـ ICU، وانتشار المحتوى عبر codebase حسب التصميم، لذا يتطلب تصدير ملف JSON واحد للمترجم أدوات مخصصة.

## كيف يبدو كل خيار في الكود

نفس المكون، ملخص سلة التسوق يحتوي على عنوان وصيغة جمع، مكتوب بكل من المكتبات المرشحة. الجزء المثير للاهتمام ليس القالب (template)، بل أين يقع المحتوى وما يعرفه `vue-tsc` عنه.

<Tabs defaultTab="vue-i18n">
  <Tab label="vue-i18n" value="vue-i18n">

  <Tabs group="locale">
  <Tab value="en" label="الإنجليزية">

```json fileName="src/locales/en.json"
{
  "cart": {
    "title": "Your cart",
    "items": "no item | one item | {count} items"
  }
}
```

  </Tab>
  <Tab value="fr" label="الفرنسية">

```json fileName="src/locales/fr.json"
{
  "cart": {
    "title": "Votre panier",
    "items": "aucun article | un article | {count} articles"
  }
}
```

  </Tab>
  <Tab value="es" label="الإسبانية">

```json fileName="src/locales/es.json"
{
  "cart": {
    "title": "Tu carrito",
    "items": "ningún artículo | un artículo | {count} artículos"
  }
}
```

  </Tab>
  </Tabs>

```vue fileName="src/components/CartSummary.vue"
<script setup lang="ts">
import { useI18n } from "vue-i18n";

const props = defineProps<{ count: number }>();
const { t } = useI18n();
</script>

<template>
  <section>
    <h2>{{ t("cart.title") }}</h2>
    <p>{{ t("cart.items", { count: props.count }, props.count) }}</p>
  </section>
</template>
```

صيغ الجمع المفصولة بخط عمودي هي تنسيق خاص بـ vue-i18n وليست ICU. تقبل الدالة `t` أي نص ما لم تقم بتمرير generic لمخطط الرسائل إلى `createI18n`.

  </Tab>
  <Tab label="fluent-vue" value="fluent-vue">

  <Tabs group="locale">
  <Tab value="en" label="الإنجليزية">

```ftl fileName="src/locales/en.ftl"
cart-title = Your cart
cart-items = { $count ->
    [one] { $count } item
   *[other] { $count } items
}
```

  </Tab>
  <Tab value="fr" label="الفرنسية">

```ftl fileName="src/locales/fr.ftl"
cart-title = Votre panier
cart-items = { $count ->
    [one] { $count } article
   *[other] { $count } articles
}
```

  </Tab>
  <Tab value="es" label="الإسبانية">

```ftl fileName="src/locales/es.ftl"
cart-title = Tu carrito
cart-items = { $count ->
    [one] { $count } artículo
   *[other] { $count } artículos
}
```

  </Tab>
  </Tabs>

```vue fileName="src/components/CartSummary.vue"
<script setup lang="ts">
import { useFluent } from "fluent-vue";

const props = defineProps<{ count: number }>();
const { $t } = useFluent();
</script>

<template>
  <section>
    <h2>{{ $t("cart-title") }}</h2>
    <p>{{ $t("cart-items", { count: props.count }) }}</p>
  </section>
</template>
```

تتعامل بنية Fluent مع صيغ الجمع والمتغيرات النحوية بكفاءة. معرفات الرسائل عبارة عن نصوص بدون types، ويقوم ملحق Vite بتضمين جميع اللغات في كل صفحة.

  </Tab>
  <Tab label="Paraglide" value="paraglide">

  <Tabs group="locale">
  <Tab value="en" label="الإنجليزية">

```json fileName="messages/en.json"
{
  "cart_title": "Your cart",
  "cart_items": "{count} items"
}
```

  </Tab>
  <Tab value="fr" label="الفرنسية">

```json fileName="messages/fr.json"
{
  "cart_title": "Votre panier",
  "cart_items": "{count} articles"
}
```

  </Tab>
  <Tab value="es" label="الإسبانية">

```json fileName="messages/es.json"
{
  "cart_title": "Tu carrito",
  "cart_items": "{count} artículos"
}
```

  </Tab>
  </Tabs>

```vue fileName="src/components/CartSummary.vue"
<script setup lang="ts">
import { m } from "../paraglide/messages.js";

const props = defineProps<{ count: number }>();
</script>

<template>
  <section>
    <h2>{{ m.cart_title() }}</h2>
    <p>{{ m.cart_items({ count: props.count }) }}</p>
  </section>
</template>
```

كل رسالة هي دالة مولدة ومحددة الأنواع (typed function)، لذا فإن المفتاح المفقود يظهر كخطأ في الاستيراد (import error). يتم إنشاء المجلد `paraglide/` داخل مستودعك وإعادة إنشائه عند كل تغيير.

  </Tab>
  <Tab label="Intlayer" value="intlayer">

```ts fileName="src/components/cartSummary.content.ts"
import { plural, t, type Dictionary } from "intlayer";

const cartSummaryContent = {
  key: "cart-summary",
  content: {
    title: t({ en: "Your cart", fr: "Votre panier", es: "Tu carrito" }),
    items: t({
      en: plural({ one: "{{count}} item", other: "{{count}} items" }),
      fr: plural({ one: "{{count}} article", other: "{{count}} articles" }),
      es: plural({ one: "{{count}} artículo", other: "{{count}} artículos" }),
    }),
  },
} satisfies Dictionary;

export default cartSummaryContent;
```

```vue fileName="src/components/CartSummary.vue"
<script setup lang="ts">
import { useIntlayer } from "vue-intlayer";

const props = defineProps<{ count: number }>();
const { title, items } = useIntlayer("cart-summary");
</script>

<template>
  <section>
    <h2><title /></h2>
    <p>{{ items(props.count) }}</p>
  </section>
</template>
```

جميع اللغات في ملف واحد بجانب المكون. يتم إنشاء الأنواع عند البناء، لذا تتوفر الإكمال التلقائي لـ `title` وتفشل أداة `vue-tsc` في حال وجود خطأ مطبعي. يقوم `<title />` بعرض عقدة يمكن للمحرر المرئي استهدافها؛ بينما يُرجع `{{ items(props.count) }}` النص العادي.

  </Tab>
</Tabs>

هل تستخدم `vue-i18n` بالفعل؟ يقوم [محول التوافق `@intlayer/vue-i18n`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/compat/vue-i18n.md) بعمل alias للحزمة على مستوى أداة التجميع (bundler)، بحيث يستمر عمل `useI18n()` و`$t` وجمع الخطوط العمودية و`v-t` أثناء تقديم Intlayer للمحتوى. يغطي [دليل الترحيل](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/migration_from_vue-i18n_to_intlayer.md) خطوات الاستغناء عن المحول بعد ذلك، وهناك أيضاً [دليل مخصص لـ Nuxt](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/migration_from_nuxtjs_i18n_to_intlayer.md).

## قبل اتخاذ القرار النهائي

يوضح لك جدول الميزات ما تفعله المكتبة اليوم، بينما توضح لك هذه النقاط كيف ستكون تجربة التعامل معها على المدى الطويل.

**تحقق من نشاط المستودع.**

الالتزامات (commits)، وسرعة الرد على المشاكل (issues)، وما إذا كان آخر إصدار فرعي قد تم هذا العام. التصميم الجيد بدون مسؤول صيانة ليس سوى مشروع ترحيل مستقبلي قيد الانتظار.

**لا تختر بناءً على عدد مرات التنزيل على npm.**

المكتبة الأكثر تنزيلاً هي التي تم إطلاقها أولاً، وليست بالضرورة الأنسب لـ codebase في Vue لعام 2026. تقيس التنزيلات التاريخ، وليس الملاءمة.

![ترتيب تصنيف مكتبات JavaScript i18n](https://github.com/aymericzip/intlayer/blob/main/docs/assets/alphabet_rank_i18n_lib.webp?raw=true)

**اسأل من يدعم مسؤول الصيانة مالياً، وما الذي يبيعونه.**

يحظى `vue-i18n` بدعم Crowdin، مثل `next-intl` و`svelte-i18n`. ويحظى `i18next` بدعم Locize. بينما تدير كل من Tolgee وParaglide (inlang) وIntlayer منصاتها الخاصة. الموفر الذي تعتمد إيراداته على الترجمة المستضافة لديه دافع ضئيل لجعل الترجمة مجانية داخل أدوات التطوير الخاصة بك. يُعد Intlayer الوحيد في هذه المجموعة الذي يقدم ترجمة بالذكاء الاصطناعي عبر CLI باستخدام مفتاح API الخاص بك، ونظام CMS يمكنك استضافته ذاتياً.

**هل هي مهيأة لوكلاء الذكاء الاصطناعي (AI agents)؟**

لا يزال الوكلاء يواجهون صعوبة مع i18n: فهم ينسون اللغات، ويبتكرون مفاتيح غير موجودة، ويخلطون بين تنسيقات الرسائل. هل توفر المكتبة [مهارات الوكيل (Agent Skills)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/agent_skills.md) أو [خادم MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/mcp_server.md) حتى يتمكن الوكيل من سرد المحتوى وملئه واختباره؟ وهل تم تحسين تحميل المحتوى افتراضياً، أم يتعين على شخص مراجعة namespaces والتحميل الكسول كل ثلاثة أشهر؟

**أمان الأنواع (Type safety) المدمج.**

ليس المقصود "يمكن دعمه بالأنواع مع تكوينات إضافية" بل "المفتاح الخاطئ يفشل في `tsc` عند التثبيت المباشر". تحقق مما يحدث مع مفتاح غير موجود، ومع لغة تفتقد إلى ترجمة واحدة.

**اكتشاف المحتوى غير المستخدم.**

القواميس تميل إلى التضخم فقط. يعمل build في Intlayer على تنظيف الحقول غير المستخدمة وتسجيلها (`build.purge`). ويصل Paraglide إلى ذلك بفضل بنيته المعمارية، حيث يتم استبعاد دالة الرسالة التي لا يتم استدعاؤها عبر tree-shaking. أما بقية الخيارات فتترك مهمة التنظيف لك بالكامل.

**تجربة المطور (Developer experience).**

وقت الإعداد حتى الحصول على أول نص مترجم، ووجود [LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/lsp.md) أو [إضافة VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/vs_code_extension.md) تعرض الترجمة عند التمرير وتنتقل إلى الإعلان، و[CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/cli/index.md) للملء والاختبار والرفع (push)، و[مُصرِّف](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/compiler.md) أو أداة استخراج تستخرج النصوص المكتوبة مباشرة في المكونات حتى لا تضطر إلى إدارة كل نص مفتاحًا بمفتاح، وطريقة لغير المطورين لتعديل المحتوى ([محرر مرئي](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_visual_editor.md) أو [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_CMS.md)) دون الحاجة إلى فتح pull request.

## الأسئلة الشائعة

<FAQ>

<Question title="هل لا يزال vue-i18n الخيار الافتراضي الصحيح في عام 2026؟">

بالنسبة لمعظم تطبيقات Vue، نعم. النظام البيئي هو الأكبر، والتوثيق شامل، والتكاليف متوقعة: runtime ثقيل، وتنسيق جمع مخصص، وعزل حسب المسار يتعين عليك بناؤه وحمايته بنفسك.

</Question>

<Question title="هل يجب علي استخدام @nuxtjs/i18n أم إعداد vue-i18n يدوياً في Nuxt؟">

استخدم الـ module ما لم يكن التوجيه لديك غير معتاد أو كان تطبيقك يحتوي على صفحات قليلة جداً. يعني الإعداد اليدوي إعادة بناء مسارات اللغات، والـ middleware، و`hreflang`، وsitemap بنفسك، وهي أمور أكثر تعقيداً مما تبدو عليه.

</Question>

<Question title="هل أحتاج إلى مكتبة تعتمد على المترجم (compiler-based)؟">

فقط إذا كان حجم الحزمة، أو حمولة SSR، أو الأنواع المولدة (generated types)، أو فحص المفاتيح المفقودة في وقت البناء متطلبات فعلية لديك. يشرح منشور [المترجم مقابل التدويل التعريفي](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ar/compiler_vs_declarative_i18n.md) ما تقدمه المترجمات وأين يمكن أن تخطئ.

</Question>

<Question title="هل يؤثر اختيار المكتبة على تحسين محركات البحث (SEO)؟">

بشكل غير مباشر. تهتم روبوتات الفهرسة بالتوجيه، و`hreflang`، و`<html lang>`، وما إذا كان النص موجوداً في HTML المعروض من الخادم. راجع [دليل hreflang](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ar/hreflang_guide_multilingual_seo.md).

</Question>

</FAQ>

## للمزيد من التفاصيل

- [مقارنة أداء Vue i18n: حجم الحزمة، التسريب، وتوقيت تبديل اللغة](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/benchmark/vue.md)
- [Vue i18n: كيف يعمل vue-i18n وأين تكمن مشاكله](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ar/list_i18n_technologies/frameworks/vue.md) ومنشور [Nuxt i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ar/list_i18n_technologies/frameworks/nuxt.md)
- [مقارنة بين vue-i18n وIntlayer ميزة بميزة](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ar/vue-i18n_vs_intlayer.md) و[مقارنة أداء vue-i18n مقابل Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ar/vue-i18n_vs_intlayer_benchmark.md)
- [هل أصبح vue-i18n قديماً؟](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ar/is_vue-i18n_outdated.md)
- [تاريخ تدويل JavaScript](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ar/history_of_i18n.md)
- [المترجم مقابل التدويل التعريفي](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ar/compiler_vs_declarative_i18n.md)
- [تدويل كل مكون على حدة مقابل التدويل المركزي](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ar/per-component_vs_centralized_i18n.md)
- [إعداد i18n في تطبيق Vite + Vue](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_with_vite+vue.md) وفي [تطبيق Nuxt](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_with_nuxt.md)
- الدليل نفسه لـ [React](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ar/how_to_pick_react_i18n_library.md)، و[Svelte](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ar/how_to_pick_svelte_i18n_library.md) و[Solid](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ar/how_to_pick_solid_i18n_library.md)
