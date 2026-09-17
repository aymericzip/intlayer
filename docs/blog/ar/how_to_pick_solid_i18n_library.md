---
createdAt: 2026-09-16
updatedAt: 2026-09-16
title: "كيفية اختيار مكتبة Solid i18n المناسبة في عام 2026"
description: دليل اتخاذ القرار لتدويل تطبيقات SolidJS و SolidStart. ما هي الأسئلة التي يجب الإجابة عليها قبل المقارنة بين @solid-primitives/i18n و solid-i18next و Paraglide و Lingui و Intlayer، وتكلفة كل خيار من حيث التفاعلية (reactivity) وحجم الحزمة (bundle size) ونظام الأنواع (typing).
keywords:
  - solidjs i18n
  - solid start i18n
  - solid internationalization
  - solid-primitives i18n
  - solid-i18next
  - Paraglide
  - Lingui
  - Intlayer
  - مقارنة مكتبات i18n
slugs:
  - blog
  - how-to-pick-solid-i18n-library
author: aymericzip
---

# كيفية اختيار مكتبة Solid i18n المناسبة

يغير نموذج التفاعلية (reactivity model) في Solid ما يجب أن تفعله مكتبة الـ i18n. تعمل المكونات (components) مرة واحدة فقط، لذا فإن الترجمة المخزنة في `const` أثناء مرحلة الإعداد (setup) تصبح نصاً مجمداً (frozen string)، وأي مكتبة تمنحك نصوصاً عادية بدلاً من الدوال الموصولة (accessors) ستنتج صفحة تغير اللغة في كل مكان باستثناء المكونات الثلاثة التي قام فيها شخص ما بذلك. إن اختيار مكتبة لـ Solid يتعلق جزئياً بواجهة برمجة التطبيقات (API)، وجزئياً بالمكتبة التي تجعل ارتكاب هذا الخطأ صعباً برمجياً.

يسرد هذا الدليل الأسئلة التي يجب الإجابة عليها أولاً، ثم يطابقها مع `@solid-primitives/i18n` و `solid-i18next` و Paraglide و `@lingui/solid` و Intlayer، لكل من Vite + Solid و SolidStart.

![النظام البيئي لمكتبات Solid i18n](https://github.com/aymericzip/intlayer/blob/main/docs/assets/cloud_i18n_logo.png?raw=true)

## جدول المحتويات

<TOC/>

## ستة أسئلة للإجابة عليها قبل مقارنة المكتبات

1. **تطبيق Vite SPA أم SolidStart؟** في تطبيق الـ SPA، يمكن أن تعيش اللغة (locale) في إشارة (signal) ولا شيء غير ذلك. أما في SolidStart، فيجب تحديد اللغة على الخادم (server) من عنوان URL، وكل ما يجب أن يراه زاحف محركات البحث (crawler) بدون JavaScript (مثل `<html lang>` و `hreflang`) مكانه في `entry-server.tsx`.
2. **ما مدى التفاعلية (reactivity) المطلوبة عند تغيير اللغة؟** إعادة تحميل الصفحة بالكامل عند التبديل أمر مقبول لبعض التطبيقات. إذا لم يكن كذلك، فيجب أن تكون قيم المكتبة عبارة عن signals أو accessors، ويجب تتبع قراءتها، وليس نسخها كقيم ثابتة.
3. **من يكتب الترجمات؟** المطورون، أم نظام إدارة الترجمة (TMS)، أم وكالة تقدم نصوص ICU، أم خط أنابيب ذكاء اصطناعي (AI pipeline). تدعم مكتبة `solid-i18next` تنسيق i18next، بينما تعتمد `@solid-primitives/i18n` على شكل كائن القاموس الخاص بك. طابق بين المكتبة والجهة المسؤولة عن الترجمة.
4. **كم عدد اللغات والصفحات؟** لغتان وخمس صفحات يمكنها شحن كل شيء في الحزمة. أما عشر لغات وأربعون مساراً فلا يمكنها ذلك، ويصبح التحميل الكسول للكتالوجات (lazy catalogs) وتحديد النطاق (scoping) التكلفة الأساسية.
5. **هل تحتاج إلى أمان الأنواع على المفاتيح (types on keys)؟** تستنتج `@solid-primitives/i18n` الأنواع تلقائياً من قاموس المصدر. تحتاج `solid-i18next` إلى تصريح يدوي. وتقوم مكتبات وقت التحويل البرمجي (compile-time) بإنشائها تلقائياً.
6. **ما هو نطاق الميزات التي تحتاجها؟** إدارة ملفات تعريف الارتباط (cookies)، التوجيه ببادئة اللغة (locale-prefixed routing)، عمليات إعادة التوجيه (redirects)، ودوال التنسيق (formatters). الخيار الأخف لا يحتوي على أي من ذلك، وهذا أمر جيد إلى أن يتوقف عن كونه كافياً.

اكتب الإجابات، فكل ما يلي يستند إليها.

## المشهد العام في صورة واحدة

تعد Solid أحدث نظام بيئي هنا ولديها أقل عدد من الخيارات، موزعة عبر ثلاث موجات.

![تاريخ مكتبات JavaScript i18n](https://github.com/aymericzip/intlayer/blob/main/docs/assets/history_i18n.png?raw=true)

<AccordionGroup>
<Accordion header="قواميس وقت التشغيل: solid-i18next">

مكتبة i18next مغلفة لـ Solid. مساحات الأسماء (namespaces)، والواجهات الخلفية (backends)، ومحددات اللغة (detectors)، وعقد من الإضافات (plugins). أثقل خيار في المجموعة، وتحمل نفس تكاليف `t("a.b")` كما هو الحال في React.

</Accordion>
<Accordion header="العناصر الأولية البسيطة (2022): @solid-primitives/i18n">

قاموس مسطح تمتلكه وتديره، ودالة `translator()` ترجع accessors، وأنواع مستنتجة من كائن المصدر. خفيفة جداً، لا توفر تحديد نطاق (scoping)، ولا توجيه (routing)، ولا دوال تنسيق (formatters). الخيار الافتراضي للمجتمع.

</Accordion>
<Accordion header="المترجم والمحتوى المشترك في الموقع (2024 إلى 2026): Paraglide و Intlayer و @lingui/solid">

تولد Paraglide دالة واحدة لكل رسالة. تعلن Intlayer عن المحتوى لكل مكون في ملفات `.content.ts` وترجع عُقداً مدعومة بـ signals. وصلت حزمة ربط Lingui الخاصة بـ Solid في عام 2026 وجلبت معها الاستخراج القائم على الماكرو (macro-based extraction).

</Accordion>
</AccordionGroup>

يغطي مقال [تاريخ JavaScript i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ar/history_of_i18n.md) كل موجة بالتفصيل.

## القرار الأكثر أهمية: أين يعيش المحتوى ومتى يتم تحميله

يوضح خياران هيكليان معظم الفروق في حجم الحزمة (bundle) بين الإعدادات المختلفة:

- **محتوى مركزي أو محدد النطاق (scoped).** قاموس واحد للتطبيق بأكمله، أو تصريح واحد لكل مكون.
- **استيراد ثابت (static) أو ديناميكي (dynamic).** كل شيء عند بدء التشغيل، أو جلب اللغة النشطة (ومسارها النشط قدر الإمكان) عند الطلب.

يقدر الرسم البياني الحمولة لتطبيق نظري يتكون من 1 إلى 10 صفحات، مترجم إلى 1 إلى 10 لغات، مع حوالي 30 كيلوبايت من النصوص لكل صفحة.

![تسريب المحتوى النظري حسب البنية المعمارية](https://github.com/aymericzip/intlayer/blob/main/docs/assets/theorical_content_leakage.png?raw=true)

لا تقدم `@solid-primitives/i18n` أي حل مدمج لأي من المحورين: يمكنك استخدام `createResource` لتحميل قاموس لكل لغة، مما يمنحك تحميلاً ديناميكياً، والباقي متروك لك. تمتلك `solid-i18next` مساحات أسماء وخلفيات كسولة (lazy backends)، ولكن لا يوجد ما يفرض هذا التعيين تلقائياً، وبالتالي فإن مكوناً مشتركاً يستورد `common` يجعله اعتمادية لكل مسار. تحقق Paraglide تقسيم الصفحات عبر الـ tree-shaking، على الرغم من أنه لم يكن فعالاً في تطبيق [اختبار أداء Solid](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/benchmark/solid.md). بينما تحقق Intlayer ذلك من خلال التصريحات الخاصة بكل مكون.

إذا كانت إجابتك على السؤال 4 هي "صفحات كثيرة"، فركز على هذا القسم أكثر من أي تفضيل للـ API. يغطي مقال [الـ i18n لكل مكون مقابل المركزي](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ar/per-component_vs_centralized_i18n.md) جانب الصيانة لنفس هذا الخيار.

## الخيارات المرشحة

أحجام المكتبات مأخوذة من [اختبار أداء Solid](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/benchmark/solid.md): الـ provider بالإضافة إلى الـ accessor في مكون فارغ، بعد التجميع والـ tree-shaking والـ minification، في تطبيق مكون من 10 صفحات و10 لغات. يتم قياس المحتوى بشكل منفصل.

| المكتبة                  | نموذج المحتوى                      | التفاعلية عند تغيير اللغة                       | الأنواع على المفاتيح            | تحديد النطاق والتحميل الكسول       | حجم المكتبة          |
| :----------------------- | :--------------------------------- | :---------------------------------------------- | :------------------------------ | :--------------------------------- | :------------------- |
| `@solid-primitives/i18n` | قاموس مسطح تملكه                   | Signal، دوال accessors تُرجع من translator      | مستنتجة من قاموس المصدر         | لا يوجد بشكل مدمج                  | صغير جداً            |
| `solid-i18next`          | كتالوجات ومساحات أسماء i18next     | Store، إعادة تصيير عبر provider                 | تصريح يدوي                      | مساحات أسماء، backends كسولة       | ~14.9 kB             |
| Paraglide                | مشروع inlang، دوال مولدة           | قراءة عند كل استدعاء من cookie أو storage       | مولدة تلقائياً                  | Tree-shaking (لم يظهر في الاختبار) | شبه معدوم            |
| `@lingui/solid`          | نص المصدر في الكود، كتالوجات مجمعة | قائمة على Signal                                | من المترجم (compiler)           | لكل كتالوج                         | صغير                 |
| Intlayer                 | ملف `.content.ts` واحد لكل مكون    | عُقد مدعومة بـ signals، بدون إعادة تشغيل المكون | مولدة تلقائياً، مفعلة افتراضياً | نعم، لكل مكون                      | خط الأساس (Baseline) |

> الأرقام تمثل لقطة لإصدارات اختبار الأداء. لم تكن `@lingui/solid` مدرجة في الاختبار. اختبرها على تطبيقك الخاص قبل اتخاذ القرار بناءً على الحجم وحده.

يأتي حجم مكتبة Paraglide شبه المعدوم نتيجة لطريقة بنائها: يتم توليد وقت التشغيل (runtime) داخل مستودعك. بينما تحتاج Intlayer إلى `vite-intlayer`، لذا لا يمكنها العمل بدون خطوة بناء.

## مطابقة إجاباتك مع المكتبة المناسبة

<AccordionGroup>
<Accordion header="تطبيق Vite SPA، كتالوج صغير، وتريد ألا يعيقك أي شيء">

`@solid-primitives/i18n`. قاموس مسطح، ودالة `translator()` ترجع accessors، وأنواع مستنتجة بدون أي إعدادات إضافية. إنه الخيار الصحيح لتطبيق صغير، وقراءة الكود المصدري للمكتبة لا تستغرق سوى عشر دقائق. ما ستكتبه بنفسك: حفظ اللغة المحددة، التوجيه، دوال التنسيق، والتقسيم حسب كل مسار. إذا كبرت هذه القوائم، فهذه إشارة للانتقال إلى خيار آخر.

</Accordion>
<Accordion header="قادم من React مع قاعدة كود تعتمد على i18next">

تتيح لك `solid-i18next` إعادة استخدام الكتالوجات ومساحات الأسماء والواجهات الخلفية ومحددات اللغة كما هي. إنها الخيار الأثقل وتحمل نفس تكاليف `react-i18next`: تصريح يدوي للأنواع، تحسينات ممكنة لكنها تستهلك الكثير من الوقت، ودالة `t()` ترجع نصاً عادياً، مما يجعل خطأ تجميد الترجمات سهلاً للغاية. قم بتغليف عمليات القراءة داخل JSX أو memo وتجنب تخزينها في مرحلة الإعداد (setup).

</Accordion>
<Accordion header="تطبيق SolidStart مع مسارات ذات بادئة لغوية وتصيير على الخادم (SSR)">

يجب أن تأتي اللغة من عنوان URL على الخادم حتى يتطابق كلا الجانبين؛ فاكتشافها على جانب العميل يكون متأخراً جداً. تترك كل من `@solid-primitives/i18n` و `solid-i18next` مسار `[[locale]]` و `matchFilters` وإعادة التوجيه وعلامات `entry-server.tsx` لتنفذها بنفسك. تحتوي Paraglide على إضافة Vite تعالج التوجيه. بينما توفر Intlayer البرمجيات الوسيطة (middleware) ومساعدات التوجيه المدمجة. أياً كان اختيارك، ضع `<html lang>` و `hreflang` في `entry-server.tsx`؛ حيث يتم تطبيق `@solidjs/meta` على العميل بعد التروية (hydration) في SolidStart v2. يشرح مقال [Solid i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ar/list_i18n_technologies/frameworks/solid.md) هذا الإعداد بالتفصيل.

</Accordion>
<Accordion header="يجب أن يكون تغيير اللغة فورياً ودقيقاً للغاية (fine-grained)">

اختر مكتبة تكون قيمها عبارة عن signals أو accessors ويتم تتبع قراءتها تلقائياً. تقوم كل من accessors في `@solid-primitives/i18n` وعُقد Intlayer بتحديث عُقد DOM التي تقرأها فقط، دون الحاجة لإعادة تشغيل المكون بالكامل. تعيد `solid-i18next` التصيير عبر الـ provider. وتقرأ Paraglide اللغة من الـ cookie أو التخزين عند كل استدعاء للرسالة بدلاً من القراءة من signal، وهو أمر يعمل ولكنه يستهلك معالجة إضافية لكل عُقدة أكثر مما ينبغي.

</Accordion>
<Accordion header="تطبيق كبير، مسارات متعددة، وميزانية محددة لحجم الحزمة">

محتوى محدد النطاق (scoped) يتم تجميعه في وقت البناء. لا ترسل Intlayer إلا ما يقوم المسار بتصييره. ويُفترض أن تحقق Paraglide ذلك عبر الـ tree-shaking؛ تأكد من ذلك في إعدادات مشروعك، حيث لم يتحقق ذلك في إعدادات اختبار الأداء. ومع `solid-i18next`، خطط لاستراتيجية مساحات الأسماء والتحميل الكسول من اليوم الأول واحرص على مراجعتها بانتظام.

</Accordion>
<Accordion header="أمان الأنواع (Type safety) أمر غير قابل للتفاوض">

تمنحك `@solid-primitives/i18n` أنواعاً مستنتجة مجاناً، وهو أكثر مما تقدمه معظم مكتبات React. وبالنسبة للأنواع المولدة التي تصمد أمام التحميل الكسول والتقسيم لكل مسار، فإن كلاً من Paraglide و `@lingui/solid` و Intlayer تقوم بتوليدها مباشرة من المحتوى. يقارن مقال [اكتشاف الترجمات المفقودة](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ar/detecting_missing_translations.md) ما تكتشفه كل مكتبة أثناء وقت البناء.

</Accordion>
<Accordion header="سيتم إنشاء الترجمات بواسطة الذكاء الاصطناعي">

حينها لا يبقى مستفيد من القاموس المركزي يبرر وجوده. المحتوى المشترك في الموقع بالإضافة إلى أداة سطر أوامر (CLI) تملأ اللغات المفقودة هو المسار الأقصر. يعمل أمر `fill` في Intlayer باستخدام مفتاح API الخاص بك (OpenAI و Anthropic و Mistral و Gemini) ويعيد ترجمة ما تغير فقط.

</Accordion>
</AccordionGroup>

## نقاط القصور في كل مكتبة

- **`@solid-primitives/i18n`**: لا يوجد تحميل كسول أو تحديد نطاق خارج ما تبنيه بنفسك، لا يوجد توجيه (routing)، لا توجد معالجة لملفات تعريف الارتباط (cookies)، ولا توجد دوال تنسيق (formatters). ممتازة للتطبيقات الصغيرة، وتصبح قاصرة سريعاً في التطبيقات الاحترافية.
- **`solid-i18next`**: أثقل الخيارات، تتطلب كتابة الأنواع يدوياً، تستخدم تنسيق جمع خاصاً بها، ودالة `t()` ترجع نصاً عادياً مما يؤدي إلى تجميد الترجمات إذا تم تخزينها أثناء مرحلة الإعداد (setup).
- **Paraglide**: ملفات مولدة يتم حفظها في المستودع وإعادة إنتاجها قبل كل عملية push، ولم يكن الـ tree-shaking فعالاً في اختبار أداء Solid، ويتم قراءة اللغة من التخزين عند كل استدعاء بدلاً من signal.
- **`@lingui/solid`**: جديدة في عام 2026، لذا لا توجد تجارب كافية لها في بيئات الإنتاج حتى الآن. ترث خطوة البناء `extract` / `compile` الخاصة بـ Lingui وبنياتها المتعددة والمتداخلة.
- **Intlayer**: تتطلب إضافة بناء إجبارية، وتمتلك نظاماً بيئياً أصغر، ودعماً جزئياً لـ ICU، ومحتواها موزع عبر قاعدة الكود بحكم التصميم، لذا فإن تصدير ملف JSON واحد للمترجم يحتاج إلى أدوات إضافية.

## كيف يبدو كل خيار في الكود

نفس المكون، ملخص سلة التسوق مع عنوان وصيغة جمع، مكتوب بكل خيار مرشح. لاحظ أين تتم قراءة الترجمة: في JSX يتم تتبعها، أما في متن الإعداد (setup body) فتصبح نصاً مجمداً.

<Tabs defaultTab="solid-primitives">
  <Tab label="@solid-primitives/i18n" value="solid-primitives">

```ts fileName="src/i18n/index.ts"
import * as i18n from "@solid-primitives/i18n";

export const en = {
  cart: { title: "Your cart", items: "{{ count }} items" },
};

export const dictionary = () => i18n.flatten(en);
export const t = i18n.translator(dictionary, i18n.resolveTemplate);
```

```tsx fileName="src/components/CartSummary.tsx"
import type { Component } from "solid-js";
import { t } from "../i18n";

export const CartSummary: Component<{ count: number }> = (props) => (
  <section>
    <h2>{t("cart.title")}</h2>
    <p>{t("cart.items", { count: props.count })}</p>
  </section>
);
```

تتم كتابة الأنواع للمفاتيح من الكائن الإنجليزي بدون توليد كود (codegen). لا توجد قاعدة للجمع، ولا تحميل كسول، ولا توجيه؛ كل ذلك عليك إضافته بنفسك.

  </Tab>
  <Tab label="solid-i18next" value="solid-i18next">

```json fileName="public/locales/en/cart.json"
{
  "title": "Your cart",
  "items_one": "{{count}} item",
  "items_other": "{{count}} items"
}
```

```tsx fileName="src/components/CartSummary.tsx"
import { useTransContext } from "@mbarzda/solid-i18next";
import type { Component } from "solid-js";

export const CartSummary: Component<{ count: number }> = (props) => {
  const [t] = useTransContext();

  return (
    <section>
      <h2>{t("cart:title")}</h2>
      <p>{t("cart:items", { count: props.count })}</p>
    </section>
  );
};
```

كتالوجات ومساحات أسماء وإضافات i18next كما هي. تُرجع `t` نصاً عادياً، لذا فإن `const title = t("cart:title")` أثناء الـ setup تجمد النص؛ احتفظ بالاستدعاء داخل JSX دائماً.

  </Tab>
  <Tab label="Paraglide" value="paraglide">

```json fileName="messages/en.json"
{
  "cart_title": "Your cart",
  "cart_items": "{count} items"
}
```

```tsx fileName="src/components/CartSummary.tsx"
import type { Component } from "solid-js";
import { m } from "../paraglide/messages.js";

export const CartSummary: Component<{ count: number }> = (props) => (
  <section>
    <h2>{m.cart_title()}</h2>
    <p>{m.cart_items({ count: props.count })}</p>
  </section>
);
```

كل رسالة هي دالة مولدة ومحددة الأنواع. تتم قراءة اللغة من cookie أو التخزين عند كل استدعاء بدلاً من signal، لذا فإن التفاعلية عند التبديل متروكة لك لربطها.

  </Tab>
  <Tab label="Intlayer" value="intlayer">

```ts fileName="src/components/cartSummary.content.ts"
import { type Dictionary, plural, t } from "intlayer";

const cartSummaryContent = {
  key: "cart-summary",
  content: {
    title: t({ en: "Your cart", fr: "Votre panier", es: "Tu carrito" }),
    items: plural({
      one: t({ en: "{{count}} item", fr: "{{count}} article" }),
      other: t({ en: "{{count}} items", fr: "{{count}} articles" }),
    }),
  },
} satisfies Dictionary;

export default cartSummaryContent;
```

```tsx fileName="src/components/CartSummary.tsx"
import { useIntlayer } from "solid-intlayer";
import type { Component } from "solid-js";

export const CartSummary: Component<{ count: number }> = (props) => {
  const content = useIntlayer("cart-summary");

  return (
    <section>
      <h2>{content.title}</h2>
      <p>{content.items(props.count)}</p>
    </section>
  );
};
```

جميع اللغات في ملف واحد بجانب المكون. تُرجع `useIntlayer` عُقداً مدعومة بـ signals، لذا فإن تغيير اللغة لا يحدث سوى عُقد DOM التي تقرأها فقط. قراءة `{content.title}` داخل JSX يتم تتبعها، بينما قراءة `content.title.value` في متن الإعداد (setup body) لا يتم تتبعها.

  </Tab>
</Tabs>

في قاعدة كود حالية تعتمد على i18next، يقوم [محول توافق i18next (compat adapter)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/compat/i18next.md) بعمل اسم مستعار (alias) للحزمة على مستوى أداة التجميع (bundler) بحيث تستمر الكتالوجات و `t()` في العمل بينما تتولى Intlayer تقديم المحتوى، ويغطي [دليل الترحيل](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/migration_from_i18next_to_intlayer.md) بقية التفاصيل.

## قبل أن تقرر

يخبرك جدول الميزات بما تفعله المكتبة اليوم. وتخبرك هذه النقاط كيف ستكون تجربة العمل معها على المدى الطويل.

**تحقق من نشاط المستودع.**

الالتزامات (commits)، وسرعة الاستجابة للمشكلات (issues)، وما إذا كان آخر إصدار فرعي قد صدر هذا العام. التصميم الممتاز بدون مطور نشط يعني اضطراراً للهجرة في المستقبل.

**لا تختر بناءً على عدد مرات التنزيل عبر npm.**

المكتبة الأكثر تثبيتاً هي أول مكتبة ظهرت، وليست بالضرورة الأنسب لقاعدة كود Solid في عام 2026. تقيس التنزيلات التاريخ وليس الملاءمة.

![قائمة تصنيف مكتبات JavaScript i18n](https://github.com/aymericzip/intlayer/blob/main/docs/assets/alphabet_rank_i18n_lib.png?raw=true)

**اسأل من يدفع للمطور، وماذا يبيعون.**

تحظى `i18next` (خلف `solid-i18next`) بدعم من Locize. وتحظى `next-intl` و `vue-i18n` و `svelte-i18n` و Lingui بدعم من Crowdin. بينما تدير كل من Tolgee و Paraglide (inlang) و Intlayer منصتها الخاصة. لا يملك المزود الذي يعتمد دخله على استضافة الترجمة دافعاً كبيراً لجعل الترجمة مجانية داخل أدوات التطوير الخاصة بك. تعد Intlayer الوحيدة في المجموعة التي تقدم ترجمة عبر الذكاء الاصطناعي من خلال الـ CLI باستخدام مفتاح API الخاص بك، ونظام إدارة محتوى (CMS) يمكنك استضافته بنفسك.

**هل هي جاهزة لوكلاء الذكاء الاصطناعي (AI agents)؟**

لا يزال الوكلاء يواجهون صعوبة مع التدويل: فهم ينسون اللغات، ويخترعون مفاتيح، ويخلطون بين بنيات الرسائل المختلفة. هل توفر المكتبة [مهارات الوكيل (Agent Skills)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/agent_skills.md) أو [خادم MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/mcp_server.md) حتى يتمكن الوكيل من سرد المحتوى وملئه واختباره؟ وهل تم تحسين تحميل المحتوى افتراضياً، أم أن على شخص ما مراجعة مساحات الأسماء والاستيرادات الكسولة كل ربع سنة؟

**أمان الأنواع مباشرة وبدون إعدادات.**

ليس المقصود "يمكن دعمه بالأنواع عبر إعدادات إضافية"، بل "المفتاح الخاطئ يفشل `tsc` فوراً عند التثبيت الجديد". تحقق مما يحدث مع مفتاح غير موجود، ومع لغة تنقصها ترجمة واحدة.

**اكتشاف المحتوى غير المستخدم.**

الكتالوجات تتضخم باستمرار. تحذف عملية بناء Intlayer الحقول غير المستخدمة وتسجلها (`build.purge`). وتحقق Paraglide ذلك من خلال بنيتها المعمارية، حيث يتم حذف دوال الرسائل غير المستدعاة عبر الـ tree-shaking. وتترك بقية الخيارات مهمة التنظيف لك.

**تجربة المطور (DX).**

الوقت اللازم من الإعداد إلى أول نص مترجم، ووجود [LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/lsp.md) أو [امتداد VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/vs_code_extension.md) يعرض الترجمة عند التمرير وينتقل إلى التصريح، ووجود [CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/cli/index.md) للملء والاختبار والنشر، وتوفير طريقة لغير المطورين لتعديل المحتوى ([المحرر المرئي](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_visual_editor.md) أو [نظام إدارة المحتوى CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_CMS.md)) دون الحاجة إلى pull request.

## الأسئلة الشائعة

<FAQ>

<Question title="هل مكتبة @solid-primitives/i18n كافية لتطبيق في بيئة الإنتاج؟">

لتطبيق صغير، نعم، وهي الخيار الأخف وزناً على الإطلاق. ولكنها تتوقف عن كونها كافية عندما تحتاج إلى كتالوجات كسولة لكل مسار، أو توجيه حسب اللغة على SolidStart، أو حفظ اللغة في ملفات تعريف الارتباط، أو دوال التنسيق، لأن كل ذلك سيتعين عليك بناؤه بنفسك.

</Question>

<Question title="لماذا لا يتم تحديث الترجمة الخاصة بي عند تغيير اللغة؟">

لأن مكونات Solid تعمل مرة واحدة فقط. الترجمة التي تُقرأ في متغير `const` أثناء الـ setup هي نص عادي وليست اشتراكاً تفاعلياً (subscription). اقرأها داخل JSX، أو داخل effect، أو memo، أو اختر مكتبة تكون قيمها عبارة عن accessors لتجنب كتابة الكود الخاطئ.

</Question>

<Question title="هل أحتاج إلى مكتبة معتمدة على المترجم (compiler-based)؟">

فقط إذا كان حجم الحزمة، أو الأنواع المولدة تلقائياً، أو التحقق من المفاتيح المفقودة أثناء وقت البناء من المتطلبات الفعلية لمشروعك. يشرح مقال [المترجم مقابل الـ i18n التصريحي](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ar/compiler_vs_declarative_i18n.md) ما تمنحه لك المترجمات وأين قد تخطئ.

</Question>

<Question title="هل يؤثر اختيار المكتبة على تحسين محركات البحث (SEO)؟">

بشكل غير مباشر. تهتم محركات البحث بالتوجيه (routing)، وعلامات `hreflang`، و `<html lang>`، وما إذا كان النص موجوداً في HTML المصير على الخادم، وهو ما يعني في SolidStart الاعتماد على `entry-server.tsx`. راجع [دليل hreflang](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ar/hreflang_guide_multilingual_seo.md).

</Question>

</FAQ>

## للمزيد من المعلومات

- [اختبار أداء Solid i18n: حجم الحزمة والتسريب وتوقيتات تبديل اللغة](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/benchmark/solid.md)
- [Solid i18n: لماذا تتجمد الترجمات عند تغيير اللغة](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ar/list_i18n_technologies/frameworks/solid.md)
- [محول توافق i18next الفوري](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/compat/i18next.md) و [دليل الترحيل من i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/migration_from_i18next_to_intlayer.md)
- [تاريخ JavaScript i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ar/history_of_i18n.md)
- [المترجم مقابل الـ i18n التصريحي](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ar/compiler_vs_declarative_i18n.md)
- [الـ i18n لكل مكون مقابل المركزي](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ar/per-component_vs_centralized_i18n.md)
- [كيف يعمل تحسين الحزم أثناء وقت البناء](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/bundle_optimization.md)
- [إعداد i18n في تطبيق Vite + Solid](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_with_vite+solid.md) وفي [تطبيق SolidStart](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_with_solid_start.md)
- نفس الدليل لكل من [React](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ar/how_to_pick_react_i18n_library.md) و [Vue](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ar/how_to_pick_vue_i18n_library.md) و [Svelte](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ar/how_to_pick_svelte_i18n_library.md)
