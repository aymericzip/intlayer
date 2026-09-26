---
createdAt: 2026-09-16
updatedAt: 2026-09-16
priority: 8
title: "كيفية اختيار مكتبة Svelte i18n المناسبة في عام 2026"
description: دليل اتخاذ القرار لتدويل تطبيقات Svelte و SvelteKit. ما هي الأسئلة التي يجب الإجابة عليها قبل المقارنة بين svelte-i18n و Paraglide و typesafe-i18n و wuchale و Intlayer، وتكلفة كل خيار من حيث حجم الحزمة (bundle size) ونظام الأنواع (typing) وأمان SSR.
keywords:
  - svelte i18n
  - sveltekit i18n
  - svelte internationalization
  - svelte-i18n
  - Paraglide
  - typesafe-i18n
  - wuchale
  - Intlayer
  - مقارنة مكتبات i18n
slugs:
  - blog
  - how-to-pick-svelte-i18n-library
author: aymericzip
---

# كيفية اختيار مكتبة Svelte i18n المناسبة

لا توفر Svelte أي أدوات مدمجة للتدويل (i18n). لا يوجد `$t`، ولا عنصر أولي للغة (locale primitive)، ولا تنسيق للرسائل. كل خيار هو خيار من طرف ثالث (third-party)، والنظام البيئي لـ Svelte هو المكان الذي ذهب فيه التدويل في وقت التحويل البرمجي (compile-time i18n) إلى أبعد مدى، لذا تختلف الخيارات عن بعضها البعض بشكل أكبر مما هي عليه في React أو Vue.

يسرد هذا الدليل الأسئلة التي يجب الإجابة عليها أولاً، ثم يطابق الإجابات مع `svelte-i18n` و Paraglide و `typesafe-i18n` و `wuchale` و Intlayer، لكل من Vite + Svelte و SvelteKit.

![النظام البيئي لمكتبات Svelte i18n](https://github.com/aymericzip/intlayer/blob/main/docs/assets/cloud_i18n_logo.webp?raw=true)

## جدول المحتويات

<TOC/>

## ستة أسئلة للإجابة عليها قبل مقارنة المكتبات

1. **تطبيق Vite SPA أم SvelteKit؟** في تطبيق SPA، يُعد استخدام store على مستوى الوحدة (module-level store) أمراً صحيحاً: تبويب واحد، مستخدم واحد، لغة واحدة. أما في SvelteKit، تتم مشاركة نفس الـ singleton عبر الطلبات المتزامنة (concurrent requests) على الخادم، مما يؤدي إلى تصيير الطلب B بلغة الطلب A. إما أن توفر لك المكتبة هيكلاً لكل طلب (context أو `locals`) أو تترك مسؤولية بنائه عليك.
2. **من يكتب الترجمات؟** المطورون، أم نظام إدارة الترجمة (TMS)، أم وكالة تسلم نصوص ICU، أم خط أنابيب ذكاء اصطناعي (AI pipeline). تدعم `svelte-i18n` تنسيق ICU، بينما تستخدم Paraglide و `typesafe-i18n` صيغتها الخاصة. طابق بين الأداة ومصدر الترجمات.
3. **كم عدد اللغات والصفحات؟** لغتان وخمس صفحات يمكنها تضمين كل شيء في الحزمة. أما عشر لغات وأربعون مساراً فلا يمكنها ذلك، ويصبح الفرق بين كتالوجات وقت التشغيل (runtime catalogs) والرسائل المترجمة وقت البناء (compiled messages) هو التكلفة الأساسية.
4. **هل تحتاج إلى أمان الأنواع على المفاتيح (types on keys)؟** كتابة `$_("cart.totl")` تؤدي إلى فشل أثناء وقت التشغيل (runtime failure) في `svelte-i18n`. بينما تجعل مكتبات وقت التحويل البرمجي (compile-time) ذلك خطأ في الأنواع (type error) بشكل تلقائي.
5. **مخازن Svelte 4 stores أم Svelte 5 runes؟** تغير الـ runes طريقة كتابة حالة اللغة (locale state)، ولكنها لا تحل مشكلة المشاركة (sharing problem). كما أن `$state` في ملف `.ts` يُترجم إلى متغير عادي، لذا يجب أن يكون وقت تشغيل المكتبة (library runtime) متوافقاً مع الـ runes إذا كنت تستخدم Svelte 5.
6. **هل يمكنك قبول وجود ملفات مُنشأة تلقائياً (generated files) في المستودع؟** تنشئ كل من Paraglide و `typesafe-i18n` ملفات JavaScript أو TypeScript داخل شجرة الشيفرة المصدرية (source tree). بعض الفرق تقبل ذلك، بينما تواجه فرق أخرى تعارضات دمج (merge conflicts) في كل فرع موازٍ.

اكتب الإجابات، فكل ما يلي يستند إليها.

## المشهد العام في صورة واحدة

وصل تدويل Svelte لاحقاً مقارنة بـ React أو Vue، وتخطى المراحل الأولى مباشرة إلى موجات وقت التحويل البرمجي (compile-time).

![تاريخ مكتبات JavaScript i18n](https://github.com/aymericzip/intlayer/blob/main/docs/assets/history_i18n.webp?raw=true)

<AccordionGroup>
<Accordion header="قواميس وقت التشغيل (2019 إلى 2020): svelte-i18n و sveltekit-i18n">

كتالوجات JSON، مع تحليل ICU في المتصفح عبر `intl-messageformat`، واللغة في stores على مستوى الوحدة (`$locale` و `$_`). الأكثر انتشاراً، وموثقة جيداً، وربط التقديم من جانب الخادم (SSR wiring) مسؤوليتك بالكامل.

</Accordion>
<Accordion header="الأنواع المُنشأة تلقائياً (2020 إلى 2022): typesafe-i18n">

عملية توليد تراقب كتالوجاتك وتنشئ دوال وصول بأنواع محددة (`$LL.cart.total()`). نموذج متين، مع ملفات مُنشأة في المستودع، ولم يشهد المستودع نشاطاً كبيراً مؤخراً.

</Accordion>
<Accordion header="المترجم والمحتوى المشترك في نفس الموضع (2022 إلى 2026): Paraglide و wuchale و Intlayer">

تقوم Paraglide بترجمة كل رسالة كدالة مُصدّرة (exported function) حتى يتمكن أداة الحزم (bundler) من استبعاد الأكواد غير المستخدمة (tree-shaking) للمسارات التي لا تستدعيها. تستخرج `wuchale` النصوص من كود الواجهة (markup) أثناء البناء. بينما تعلن Intlayer عن المحتوى لكل مكون (per-component) وتنشئ الأنواع والقواميس الخاصة بكل مكون.

</Accordion>
</AccordionGroup>

يغطي مقال [تاريخ JavaScript i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ar/history_of_i18n.md) كل موجة بالتفصيل.

## القرار الأكثر أهمية: أين يعيش المحتوى ومتى يتم تحميله

يحدد خياران هيكليان معظم الفرق في حجم الحزمة بين الإعدادات المختلفة:

- **المحتوى المركزي أو المخصص لكل مكون (Centralized vs Scoped).** ملف `locales/en.json` واحد للتطبيق بالكامل، أو إعلان محتوى مستقل لكل مكون.
- **الاستيراد الثابت أو الديناميكي (Static vs Dynamic import).** تحميل كل شيء عند بدء التشغيل، أو جلب اللغة النشطة (ومسار الصفحة النشط) عند الطلب.

يوضح الرسم البياني التقديري حجم البيانات المنقولة (payload) لتطبيق نظري يحتوي على 1 إلى 10 صفحات، مترجم إلى 1 إلى 10 لغات، مع حوالي 30 كيلوبايت من النصوص لكل صفحة.

![تسرب المحتوى النظري حسب البنية المعمارية](https://github.com/aymericzip/intlayer/blob/main/docs/assets/theorical_content_leakage.webp?raw=true)

تقع `svelte-i18n` في أعلى اليسار افتراضياً: يمنحك استخدام `register("fr", () => import("./fr.json"))` تحميلاً ديناميكياً لكل لغة، ولكن كتالوج اللغة هو كائن واحد يؤدي تحميله إلى تحميل نصوص كل الصفحات. تُعد Paraglide حالة مثيرة للاهتمام: نظراً لأن كل رسالة هي تصدير مستقل، فإن الـ tree-shaking يمنحك ميزة التقسيم حسب الصفحة مجاناً، ويؤكد [اختبار أداء Svelte (benchmark)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/benchmark/svelte.md) أنها تعمل كما هو معلن مع Vite + Svelte (بينما لم تكن كذلك في اختبارات أداء React و Next.js). وتصل Intlayer إلى نفس النتيجة عبر إعلانات المحتوى لكل مكون.

إذا كانت إجابتك على السؤال الثالث هي "صفحات كثيرة"، فامنح هذا القسم وزناً أكبر من أي تفضيل لـ API. يغطي مقال [التدويل لكل مكون مقابل التدويل المركزي](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ar/per-component_vs_centralized_i18n.md) جانب الصيانة لنفس المقايضة.

## المكتبات المرشحة

أحجام المكتبات مأخوذة من [اختبار أداء Svelte (benchmark)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/benchmark/svelte.md): حجم الـ store بالإضافة إلى دالة الوصول (accessor) في مكون فارغ، بعد التجميع (bundling) والـ tree-shaking والضغط (minification)، على تطبيق مكون من 10 صفحات و 10 لغات. يتم قياس المحتوى بشكل منفصل.

| المكتبة         | مكان تواجد الرسائل                 | حالة اللغة (Locale state)                     | أمان الأنواع                    | تنسيق الرسائل                 | التقسيم لكل مسار (Per-route splitting) | حجم المكتبة                                      |
| :-------------- | :--------------------------------- | :-------------------------------------------- | :------------------------------ | :---------------------------- | :------------------------------------- | :----------------------------------------------- |
| `svelte-i18n`   | كتالوجات JSON لكل لغة              | Svelte store على مستوى الوحدة                 | 2/5 — اتحاد يدوي (Manual union) | ICU                           | لا                                     | ~16.6 kB                                         |
| `typesafe-i18n` | وحدات TS مُنشأة تلقائياً           | محول Store                                    | 4/5 — مُنشأة تلقائياً           | خاص بها                       | جزئي                                   | صغير                                             |
| Paraglide       | مشروع inlang، مترجم إلى دوال       | قراءة لكل استدعاء من cookie أو URL أو storage | 3.5/5 — مُنشأة تلقائياً         | خاص بها                       | نعم، عبر tree-shaking                  | شبه منعدم (بسبب الكود المولَّد داخل قاعدة الكود) |
| `wuchale`       | مستخرجة من الـ markup أثناء البناء | Store                                         | غير متوفر (بدون مفاتيح)         | خاص بها                       | نعم                                    | ~30.7 kB                                         |
| Intlayer        | ملف `.content.ts` بجانب المكون     | Context بالإضافة إلى store، متوافق مع runes   | 5/5 — مُنشأة تلقائياً افتراضياً | Intlayer (+ ICU, i18next, PO) | نعم، لكل مكون                          | ~3.6 kB                                          |

> الأرقام تمثل لقطة لإصدارات الاختبار. قم بتشغيل الاختبار على تطبيقك الخاص قبل اتخاذ القرار بناءً على الحجم فقط.
> أمان الأنواع: 5/5 يعني أن المفاتيح والمعاملات وكل لغة يتم التحقق منها دون إعداد يدوي، بما في ذلك منسق العناوين (URL formatter) والدوال المساعدة (helpers).

حجم مكتبة Paraglide الشبه منعدم هو نتيجة لتصميمها: يتم إنشاء وقت التشغيل (runtime) مباشرة داخل مستودعك. وتحتاج Intlayer إلى `vite-intlayer`، لذا لا يمكن تشغيلها بدون خطوة بناء (build step).

## مطابقة إجاباتك مع المكتبة المناسبة

<AccordionGroup>
<Accordion header="تطبيق Vite SPA، فريق صغير، لغات قليلة">

`svelte-i18n`. إنه الخيار الأكثر توثيقاً، وقراءة `$_` داخل الـ markup تبدو طبيعية، وتغطي دالتا `register` مع `waitLocale()` التحميل الكسول (lazy loading) لكل لغة. احرص على حجب العرض الأول (first paint) حتى تنتهي `isLoading` وإلا ستظهر المفاتيح الخام للمستخدم. إذا كان من المحتمل أن يمتد التطبيق إلى خادم لاحقاً، فضع اللغة في Svelte context منذ اليوم الأول بدلاً من الاعتماد على module store، فلن يكلفك ذلك شيئاً الآن وسيوفر عليك معالجة خطأ يظهر في بيئة الإنتاج فقط لاحقاً.

</Accordion>
<Accordion header="تطبيق SvelteKit مع توجيه اللغات و SSR">

تحسم مشكلة مشاركة الحالة هذا الاختيار. تعمل `svelte-i18n` على SvelteKit ولكن الربط لكل طلب (`hooks.server.ts` و `locals` و `load` ثم `setContext`) يقع على عاتقك لكتابته ومن السهل ارتكاب أخطاء غير ظاهرة فيه. توفر Paraglide تكاملاً مع SvelteKit يتعامل مع التوجيه ويقرأ اللغة عند كل استدعاء، مما يتجنب مشكلة الـ singleton. وتقوم Intlayer بضبط اللغة من بيانات `load` داخل الـ context. يشرح مقال [تدويل SvelteKit](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ar/list_i18n_technologies/frameworks/sveltekit.md) الاختيار بين `[[lang]]` و `reroute`، وهو قرار يجب اتخاذه قبل اختيار المكتبة.

</Accordion>
<Accordion header="الترجمات تأتي من TMS أو وكالة تسلم ملفات ICU">

تدعم `svelte-i18n` تنسيق ICU بشكل أصلي عبر `intl-messageformat`، لذا تتكامل مباشرة مع معظم المنصات. تستخدم Paraglide و `typesafe-i18n` صيغتهما الخاصة وتتطلبان تحويلاً. ويعد دعم Intlayer لتنسيق ICU جزئياً، لذا إذا كنت تتلقى نصوص ICU حالياً، فاعتبر ذلك عائقاً أساسياً.

</Accordion>
<Accordion header="حجم الحزمة (Bundle size) هو القيد الأهم">

مكتبات وقت التحويل البرمجي (Compile-time). يعمل الـ tree-shaking في Paraglide بكفاءة مع Vite + Svelte وتكلفة المكتبة شبه منعدمة. تمنحك قواميس Intlayer المخصصة لكل مكون نفس النتيجة بدون ملفات مُنشأة في المستودع. بينما تشحن `svelte-i18n` محلل ICU مع كامل الكتالوج وتصل إلى حوالي 4.5 أضعاف `svelte-intlayer` في اختبار الأداء قبل احتساب أي محتوى.

</Accordion>
<Accordion header="أمان الأنواع (Type safety) شرط أساسي لا تنازل عنه">

أي خيار باستثناء إعداد `svelte-i18n` البسيط، حيث النوع الوحيد هو اتحاد مكتوب يدوياً يبتعد عن ملف JSON بسرعة. تنشئ كل من `typesafe-i18n` و Paraglide و Intlayer الأنواع تلقائياً من المحتوى. تحقق من نشاط مستودع `typesafe-i18n` قبل اعتماده في قاعدة الشيفرة الخاصة بك. يقارن مقال [اكتشاف الترجمات المفقودة](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ar/detecting_missing_translations.md) ما تلتقطه كل مكتبة أثناء وقت البناء.

</Accordion>
<Accordion header="لا ترغب في وجود ملفات مُنشأة تلقائياً داخل المستودع">

يستبعد هذا كلاً من Paraglide و `typesafe-i18n`. تحتفظ كل من `svelte-i18n` و Intlayer بمخرجاتهما في `node_modules` أو مجلد بناء، ومع Intlayer تكون ملفات `.content.ts` شيفرة مصدرية مكتوبة يدوياً، بينما تعيش القواميس والأنواع المترجمة في `.intlayer/` ويتم تجاهلها بواسطة git.

</Accordion>
<Accordion header="سيتم إنشاء الترجمات بواسطة الذكاء الاصطناعي">

في هذه الحالة لم يعد هناك مستخدم لملفات JSON المركزية لتبرير وجودها. يُعد المحتوى المشترك في الموضع (colocated content) مع واجهة سطر الأوامر (CLI) التي تملأ اللغات المفقودة هو المسار الأقصر. يعمل أمر `fill` في Intlayer باستخدام مفتاح API الخاص بك (OpenAI و Anthropic و Mistral و Gemini) ويعيد ترجمة ما تم تغييره فقط. بينما يوفر النظام البيئي inlang لـ Paraglide حلولاً مستضافة مماثلة مع خطط تسعير خاصة بها.

</Accordion>
</AccordionGroup>

## نقاط القصور في كل مكتبة

- **`svelte-i18n`**: الأثقل في المجموعة، لا توفر أنواعاً للمفاتيح، ولا تقسيماً لكل مسار، وتستخدم store على مستوى الوحدة يسرب الحالة عبر الطلبات في SvelteKit ما لم تقم بربط الـ context بنفسك.
- **`typesafe-i18n`**: تتطلب عملية مراقبة (watcher process)، وتنشئ ملفات داخل المستودع، والمستودع لم يشهد نشاطاً كبيراً مؤخراً.
- **Paraglide**: ملفات مُنشأة يتم تضمينها في المستودع وإعادة إنشائها قبل كل push، وتعارضات دمج في الفروع المتوازية، وتتم قراءة اللغة من ملفات تعريف الارتباط أو التخزين في كل استدعاء رسالة بدلاً من قراءتها من store، مما يتطلب جهداً إضافياً عند تغيير اللغة.
- **`wuchale`**: فكرة استخراج نصوص مثيرة للاهتمام، لكنها لا تزال في مراحلها الأولى. واجه اختبار أداء React مشاكل في التفاعلية تطلبت إعادة تصيير المزود قسراً، كما أن التوثيق محدود.
- **Intlayer**: تتطلب إضافة بناء إلزامية (build plugin)، ولها نظام بيئي أصغر، ودعم جزئي لـ ICU، والمحتوى موزع عبر قاعدة الشيفرة بالتصميم، لذا يتطلب تصدير ملف JSON واحد للمترجم أدوات مخصصة.

## كيف تبدو كل مكتبة في الشيفرة البرمجية

المكون نفسه، ملخص عربة التسوق مع عنوان وصيغة جمع، مكتوب بكل مكتبة مرشحة. الجزء المثير للاهتمام ليس كود الواجهة، بل أين يعيش المحتوى، وكيف يتم تخزين اللغة، وما يعرفه فاحص الأنواع (type checker).

<Tabs defaultTab="svelte-i18n">
  <Tab label="svelte-i18n" value="svelte-i18n">

  <Tabs group="locale">
  <Tab value="en" label="الإنجليزية">

```json fileName="src/locales/en.json"
{
  "cart": {
    "title": "Your cart",
    "items": "{count, plural, one {# item} other {# items}}"
  }
}
```

  </Tab>
  <Tab value="fr" label="الفرنسية">

```json fileName="src/locales/fr.json"
{
  "cart": {
    "title": "Votre panier",
    "items": "{count, plural, one {# article} other {# articles}}"
  }
}
```

  </Tab>
  <Tab value="es" label="الإسبانية">

```json fileName="src/locales/es.json"
{
  "cart": {
    "title": "Tu carrito",
    "items": "{count, plural, one {# artículo} other {# artículos}}"
  }
}
```

  </Tab>
  </Tabs>

```svelte fileName="src/lib/CartSummary.svelte"
<script lang="ts">
  import { _ } from "svelte-i18n";

  let { count }: { count: number } = $props();
</script>

<section>
  <h2>{$_("cart.title")}</h2>
  <p>{$_("cart.items", { values: { count } })}</p>
</section>
```

تنسيق ICU عبر `intl-messageformat`، واللغة في store على مستوى الوحدة. تقبل دالة `$_` أي نص، ونظام الأنواع الوحيد هو اتحاد تكتبه يدوياً.

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

```svelte fileName="src/lib/CartSummary.svelte"
<script lang="ts">
  import { m } from "$lib/paraglide/messages.js";

  let { count }: { count: number } = $props();
</script>

<section>
  <h2>{m.cart_title()}</h2>
  <p>{m.cart_items({ count })}</p>
</section>
```

كل رسالة عبارة عن دالة مُنشأة ومحددة الأنواع، يتم استبعادها عبر tree-shaking إذا لم يتم استدعاؤها مطلقاً. يتم إنشاء مجلد `paraglide/` داخل المستودع، وتتم قراءة اللغة لكل استدعاء بدلاً من قراءتها من store.

  </Tab>
  <Tab label="typesafe-i18n" value="typesafe-i18n">

  <Tabs group="locale">
  <Tab value="en" label="الإنجليزية">

```ts fileName="src/i18n/en/index.ts"
import type { BaseTranslation } from "../i18n-types";

const en = {
  cart: {
    title: "Your cart",
    items: "{count} item{{s}}",
  },
} satisfies BaseTranslation;

export default en;
```

  </Tab>
  <Tab value="fr" label="الفرنسية">

```ts fileName="src/i18n/fr/index.ts"
import type { Translation } from "../i18n-types";

const fr = {
  cart: {
    title: "Votre panier",
    items: "{count} article{{s}}",
  },
} satisfies Translation;

export default fr;
```

  </Tab>
  <Tab value="es" label="الإسبانية">

```ts fileName="src/i18n/es/index.ts"
import type { Translation } from "../i18n-types";

const es = {
  cart: {
    title: "Tu carrito",
    items: "{count} artículo{{s}}",
  },
} satisfies Translation;

export default es;
```

  </Tab>
  </Tabs>

```svelte fileName="src/lib/CartSummary.svelte"
<script lang="ts">
  import LL from "$i18n/i18n-svelte";

  let { count }: { count: number } = $props();
</script>

<section>
  <h2>{$LL.cart.title()}</h2>
  <p>{$LL.cart.items({ count })}</p>
</section>
```

دوال وصول محددة الأنواع يتم إنشاؤها عبر عملية مراقبة (watcher process). النموذج متين، وتعيش الملفات المُنشأة داخل المستودع، وقد كان المشروع هادئاً مؤخراً.

  </Tab>
  <Tab label="Intlayer" value="intlayer">

```ts fileName="src/lib/cartSummary.content.ts"
import { plural, t, type Dictionary } from "intlayer";

const cartSummaryContent = {
  key: "cart-summary",
  content: {
    title: t({
      ar: "عربة التسوق الخاصة بك",
      en: "Your cart",
      fr: "Votre panier",
      es: "Tu carrito",
    }),
    items: t({
      ar: plural({ one: "{{count}} عنصر", other: "{{count}} عناصر" }),
      en: plural({ one: "{{count}} item", other: "{{count}} items" }),
      fr: plural({ one: "{{count}} article", other: "{{count}} articles" }),
      es: plural({ one: "{{count}} artículo", other: "{{count}} artículos" }),
    }),
  },
} satisfies Dictionary;

export default cartSummaryContent;
```

```svelte fileName="src/lib/CartSummary.svelte"
<script lang="ts">
  import { useIntlayer } from "svelte-intlayer";

  let { count }: { count: number } = $props();
  const content = useIntlayer("cart-summary");
</script>

<section>
  <h2>{$content.title}</h2>
  <p>{$content.items(count)}</p>
</section>
```

جميع اللغات في ملف واحد بجانب المكون. تُرجع `useIntlayer` مخزناً قابلاً للقراءة (readable store)، لذا فإن `$content` هو الاشتراك التلقائي (auto-subscription) الذي تعرفه بالفعل، ويتم الاحتفاظ باللغة داخل الـ context (مما يجعله آمناً مع SSR) بدلاً من استخدام singleton على مستوى الوحدة.

  </Tab>
</Tabs>

هل تستخدم `svelte-i18n` بالفعل؟ يقوم [محول التوافق `@intlayer/svelte-i18n`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/compat/svelte-i18n.md) بإنشاء اسم مستعار (alias) للحزمة على مستوى أداة الحزم (bundler) حتى تستمر `$_` و `$date` و `$number` ومفاتيحك المسطحة في العمل بينما تتولى Intlayer توفير المحتوى.

## قبل أن تلتزم باختيارك

يخبرك جدول الميزات بما تفعله المكتبة اليوم. وتخبرك هذه النقاط بما ستكون عليه تجربة العمل معها على المدى الطويل.

**تحقق من نشاط المستودع.**

الالتزامات البرمجية (commits)، وسرعة الاستجابة للمشكلات (issues)، وما إذا كان آخر إصدار فرعي قد صدر هذا العام. التصميم المتين بدون مشرف صيانة هو مجرد هجرة مستقبلية مؤجلة.

**لا تختر بناءً على عدد مرات التنزيل من npm.**

المكتبة الأكثر تنزيلاً هي التي صدرت أولاً، وليست بالضرورة الأنسب لقاعدة شيفرة Svelte في عام 2026. تقيس التنزيلات التاريخ وليس الملاءمة.

![تصنيف مكتبات JavaScript i18n](https://github.com/aymericzip/intlayer/blob/main/docs/assets/alphabet_rank_i18n_lib.webp?raw=true)

**اسأل من يمول المشرف، وماذا يبيعون.**

تحظى `svelte-i18n` بدعم من Crowdin، تماماً مثل `next-intl` و `vue-i18n`. وتدعم Locize مكتبة `i18next`. وتدير كل من Tolgee و Paraglide (inlang) و Intlayer منصتها الخاصة. المزود الذي يعتمد دخله على الترجمة المستضافة ليس لديه حافز كبير لجعل الترجمة مجانية داخل أدوات التطوير الخاصة بك. وتُعد Intlayer الوحيدة في المجموعة التي توفر ترجمة بالذكاء الاصطناعي عبر CLI باستخدام مفتاح API الخاص بك، ونظام إدارة محتوى (CMS) يمكنك استضافته ذاتياً.

**هل المكتبة جاهزة للعمل مع وكلاء الذكاء الاصطناعي (AI agents)؟**

لا يزال وكلاء الذكاء الاصطناعي يواجهون صعوبة مع التدويل: فهم ينسون اللغات، ويخترعون مفاتيح، ويخلطون بين تنسيقات الرسائل. هل توفر المكتبة [مهارات الوكيل (Agent Skills)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/agent_skills.md) أو [خادم MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/mcp_server.md) حتى يتمكن الوكيل من سرد المحتوى وملئه واختباره؟ وهل تم تحسين تحميل المحتوى افتراضياً، أم يتعين على شخص ما مراجعة مساحات الأسماء والاستيراد الكسول كل ثلاثة أشهر؟

**أمان الأنواع مباشرة بعد التثبيت (Type safety out of the box).**

ليس "يمكن دعمه بالأنواع عبر إعدادات إضافية" بل "المفتاح الخاطئ يفشل فحص `tsc` في التثبيت الجديد مباشرة". تحقق مما يحدث مع مفتاح غير موجود، ومع لغة تفتقد إلى ترجمة واحدة.

**اكتشاف المحتوى غير المستخدم.**

الكتالوجات تنمو دائماً ولا تتقلص تلقائياً. يقوم بناء Intlayer بإزالة الحقول غير المستخدمة وتسجيلها (`build.purge`). وتحقق Paraglide ذلك معمارياً، حيث يتم استبعاد دوال الرسائل غير المستدعاة عبر tree-shaking. أما باقي الخيارات فتترك مهمة التنظيف لك.

**تجربة المطور (Developer experience).**

الوقت المستغرق من التثبيت حتى ظهور أول نص مترجم، ووجود [LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/lsp.md) أو [إضافة VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/vs_code_extension.md) تعرض الترجمة عند التمرير وتنتقل إلى الإعلان، و [CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/cli/index.md) للملء والاختبار والنشر، و[مُصرِّف](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/compiler.md) أو أداة استخراج تستخرج النصوص المكتوبة مباشرة في المكونات حتى لا تضطر إلى إدارة كل نص مفتاحًا بمفتاح، وطريقة تتيح لغير المطورين تعديل المحتوى ([المحرر المرئي](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_visual_editor.md) أو [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_CMS.md)) بدون الحاجة إلى pull request.

## الأسئلة الشائعة

<FAQ>

<Question title="هل لا تزال svelte-i18n هي الخيار الافتراضي المناسب في عام 2026؟">

بالنسبة لتطبيق Vite SPA مع كتالوج صغير، نعم. إنه الخيار الأكثر توثيقاً، والتوافق مع ICU يهم العديد من الفرق. أما في SvelteKit أو عند تجاوز بضع عشرات من الصفحات، تبدأ تكاليفها (غياب الأنواع، غياب تحديد النطاق، مشاركة الـ store) في التراكم.

</Question>

<Question title="هل الـ tree-shaking في Paraglide حقيقي؟">

في Vite + Svelte، نعم، يؤكد اختبار الأداء ذلك. أما في React مع TanStack Start أو Next.js، فلم تظهر هذه النتيجة في نفس الاختبار. تحقق بنفسك في مكدس تقنياتك بدلاً من الاعتماد المطلق على أي من النتيجتين.

</Question>

<Question title="هل تغير الـ runes المكتبة التي يجب أن أختارها؟">

تغير طريقة كتابة حالة اللغة الخاصة بك، وليس مشكلة مشاركة الحالة. ما يهم هو ما إذا كان وقت تشغيل المكتبة متوافقاً مع الـ runes في Svelte 5 وما إذا كانت تستخدم الـ context بدلاً من store على مستوى الوحدة. تحقق من الأمرين معاً.

</Question>

<Question title="هل يؤثر اختيار المكتبة على تحسين محركات البحث (SEO)؟">

بشكل غير مباشر. تهتم محركات البحث بالتوجيه، ووسم `hreflang`، و `<html lang>`، وما إذا كان النص متوفراً في كود HTML المُصيّر على الخادم. راجع [دليل hreflang](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ar/hreflang_guide_multilingual_seo.md).

</Question>

</FAQ>

## للمزيد من التفاصيل

- [اختبار أداء Svelte i18n: حجم الحزمة، والتسرب، وتوقيت تبديل اللغة](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/benchmark/svelte.md)
- [تدويل Svelte: المخازن، والـ runes، وفخ مستوى الوحدة](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ar/list_i18n_technologies/frameworks/svelte.md) و [تدويل SvelteKit: التوجيه، و SSR، والحالة المشتركة](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ar/list_i18n_technologies/frameworks/sveltekit.md)
- [محول التوافق البديل لـ `svelte-i18n`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/compat/svelte-i18n.md)
- [تاريخ JavaScript i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ar/history_of_i18n.md)
- [التدويل عبر المترجم مقابل التدويل التصريحي](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ar/compiler_vs_declarative_i18n.md)
- [التدويل لكل مكون مقابل التدويل المركزي](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ar/per-component_vs_centralized_i18n.md)
- [كيف يعمل تحسين الحزمة في وقت البناء](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/bundle_optimization.md)
- [إعداد i18n في تطبيق Vite + Svelte](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_with_vite+svelte.md) وفي [تطبيق SvelteKit](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_with_svelte_kit.md)
- نفس الدليل لكل من [React](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ar/how_to_pick_react_i18n_library.md) و [Vue](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ar/how_to_pick_vue_i18n_library.md) و [Solid](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ar/how_to_pick_solid_i18n_library.md)
