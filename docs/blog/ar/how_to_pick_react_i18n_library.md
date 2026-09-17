---
createdAt: 2026-09-16
updatedAt: 2026-09-16
title: "كيفية اختيار مكتبة React i18n المناسبة في عام 2026"
description: دليل اتخاذ القرار لتدويل تطبيقات React. ما هي الأسئلة التي يجب الإجابة عليها قبل المقارنة بين react-i18next و react-intl و Lingui و use-intl و Paraglide و Intlayer، وتكلفة كل خيار من حيث حجم الحزمة (bundle size) والأمان البرمجي (typing) والصيانة.
keywords:
  - react i18n
  - react internationalization
  - react-i18next
  - react-intl
  - Lingui
  - use-intl
  - Paraglide
  - Intlayer
  - مقارنة مكتبات i18n
slugs:
  - blog
  - how-to-pick-react-i18n-library
author: aymericzip
---

# كيفية اختيار مكتبة React i18n المناسبة

لا توفر React أي عنصر أولي (primitive) مدمج للتدويل (i18n). المكتبة التي تختارها من اليوم الأول تحدد كيفية تخزين الترجمات، وكيفية وصولها إلى الحزمة (bundle)، ومقدار العمل اليدوي الذي سيبقى على عاتقك للسنوات القليلة القادمة. تختار معظم الفرق بناءً على الشعبية فقط، ثم تكتشف التنازلات المعمارية عند الوصول إلى 2,000 مفتاح.

يسلك هذا الدليل الاتجاه المعاكس: أجب عن بعض الأسئلة حول مشروعك أولاً، ثم طابق الإجابات مع المكتبات المناسبة. يركز هذا الدليل على تطبيقات React البسيطة (Vite و React Router و TanStack Start). لدى Next.js قيودها الخاصة، والتي تم تناولها في [مقارنة Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ar/next-i18next_vs_next-intl_vs_intlayer.md).

![النظام البيئي لمكتبات React i18n](https://github.com/aymericzip/intlayer/blob/main/docs/assets/cloud_i18n_logo.png?raw=true)

## جدول المحتويات

<TOC/>

## ستة أسئلة للإجابة عليها قبل مقارنة المكتبات

جدول المقارنة لا فائدة منه دون معرفة الصفوف التي تهمك فعلاً. راجع هذه الأسئلة أولاً.

1. **كيف يتم تصيير (render) التطبيق؟** هل هو SPA فقط، أم SSR مع التروية (hydration)، أم React Server Components؟ تعمل خطافات (hooks) السياق (Context-based) في كل مكان في تطبيقات SPA. أما مع RSC، يفرض الـ hook إضافة `"use client"` على كل مكون يعرض نصاً، وبالتالي ستحتاج إلى server-side API أيضاً.
2. **من يكتب الترجمات؟** المطورون، أم فريق داخلي يستخدم نظام إدارة الترجمة (TMS)، أم وكالة تسلم ملفات ICU، أم خط أنابيب ذكاء اصطناعي (AI pipeline)؟ يحدد هذا تنسيق الكتالوج أكثر من أي تفصيل في الـ API.
3. **كم عدد اللغات والصفحات؟** لغتان وخمس صفحات يمكنها تحمل تضمين كل شيء في الحزمة. أما عشر لغات وخمسون مساراً فلا يمكنها ذلك، وتصبح استراتيجية التحميل هي التكلفة الأساسية.
4. **هل تحتاج إلى أمان الأنواع على المفاتيح (types on keys)؟** الخطأ الإملائي في `t("checkout.totl")` يتم تجميعه بنجاح في جميع المكتبات المعتمدة على المفاتيح ما لم تقم بإعداد الأنواع بنفسك. قرر ما إذا كان ذلك مقبولاً لديك.
5. **ماذا يحتوي النص؟** نص عادي، أم صيغ جمع (plurals)، أم جمل تتوسطها روابط `<Link>`؟ المحتوى الغني (Rich content) هو النقطة التي تصبح فيها معظم واجهات برمجة التطبيقات معقدة.
6. **كم من الوقت سيستمر المشروع؟** نموذج أولي مدته ثلاثة أشهر لا يحتاج إلى نفس قدر أدوات البناء التي يحتاجها منتج مدته خمس سنوات.

اكتب الإجابات، فكل ما يلي يستند إليها.

## المشهد العام في صورة واحدة

خمسة عشر عاماً من JavaScript i18n تتلخص في أربع موجات معمارية، وتأتي مكتبات React التي ستقارن بينها من موجات مختلفة.

![تاريخ مكتبات JavaScript i18n](https://github.com/aymericzip/intlayer/blob/main/docs/assets/history_i18n.png?raw=true)

<AccordionGroup>
<Accordion header="قواميس وقت التشغيل (2011 إلى 2017): i18next و react-intl">

كتالوجات JSON يتم تحميلها في الذاكرة، ويتم البحث عن `t("a.b")` أثناء وقت التشغيل (runtime)، مع تحليل ICU أو صيغة مخصصة في المتصفح. أكبر الأنظمة البيئية، وأثقل أوقات التشغيل، والأنواع (types) اختيارية.

</Accordion>
<Accordion header="ماكرو وقت البناء (2018 إلى 2021): Lingui و typesafe-i18n">

يتم استخراج الرسائل أثناء البناء، وتجميعها في كتالوجات مضغوطة مع وسائط محددة الأنواع. خطوة بناء إضافية (`extract` و `compile`) مقابل حزم أصغر حجماً.

</Accordion>
<Accordion header="التركيز على الخادم أولاً (2022 إلى 2024): use-intl / next-intl">

مصممة حول SSR و Server Components. يتم التصيير على الخادم، وتروية (hydrate) ما يحتاجه العميل فقط. لا تزال معتمدة على المفاتيح ومركزية.

</Accordion>
<Accordion header="المترجم والمحتوى المشترك في الموقع (2024 إلى 2026): Paraglide و Intlayer و wuchale">

يتم تجميع المحتوى في دوال قابلة للـ tree-shaking أو قواميس مخصصة لكل مكون. يتم إنشاء الأنواع تلقائياً، والترجمات المفقودة تفشل البناء، وتعمل ترجمة الذكاء الاصطناعي مباشرة من الـ CLI.

</Accordion>
</AccordionGroup>

يوضح مقال [تاريخ JavaScript i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ar/history_of_i18n.md) بالتفصيل كيف عالجت كل موجة مشاكل الموجة السابقة.

## القرار الأكثر أهمية: أين يعيش المحتوى ومتى يتم تحميله

تمتلك كل مكتبة React i18n نفس الهيكل الأساسي: مخزن (store)، ومزود (provider)، وخطاف (hook). كل ما يستقبله الـ provider ينتهي به المطاف في حزمة العميل (client bundle) أو في حمولة التروية (hydration payload). لذا فإن الخيارين الهيكليين هما:

- **محتوى مركزي أو محدد النطاق (scoped).** ملف `en.json` واحد للتطبيق بأكمله، أو تصريح واحد لكل مكون (أو لكل namespace).
- **استيراد ثابت (static) أو ديناميكي (dynamic).** تجميع كل شيء عند بدء التشغيل، أو جلب اللغة والمسار النشطين عند الطلب.

يوضح الرسم البياني أدناه تقديراً للحمولة لتطبيق نظري يتكون من 1 إلى 10 صفحات، مترجم إلى 1 إلى 10 لغات، مع حوالي 30 كيلوبايت من النصوص لكل صفحة.

![تسريب المحتوى النظري حسب البنية المعمارية](https://github.com/aymericzip/intlayer/blob/main/docs/assets/theorical_content_leakage.png?raw=true)

المحتوى المركزي ذو الاستيراد الثابت ينمو مع كلا المحورين: 10 صفحات مضروبة في 10 لغات تعني 300 كيلوبايت من النصوص في كل صفحة. الاستيرادات الديناميكية تلغي محور اللغات، وتحديد النطاق (scoping) يلغي محور الصفحات. الدمج بينهما فقط هو ما يبقي الحجم ثابتاً ومسطحاً.

هذه ليست ميزة مكتبة فحسب، بل هي مسألة انضباط برمجي. يمكن تقسيم `react-i18next` عبر namespaces و lazy backends. ويمكن تقسيم `use-intl` لكل مسار. ولكن لا يوجد ما يفرض ذلك تلقائياً، ومكون `<Button>` مشترك يستدعي `t("common:cta")` يجعل `common` بهدوء اعتمادية لجميع المسارات. يقيس [اختبار الأداء (benchmark)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/benchmark/index.md) هذا تحت مسمى "التسريب من المسارات الأخرى" و"التسريب من اللغات الأخرى"، وهو مصدر معظم الفجوة بين المكتبات.

إذا كانت إجابتك على السؤال 3 هي "لغات متعددة وصفحات متعددة"، فركز على هذا القسم أكثر من أي تفضيل لواجهة الـ API. يتعمق مقال [الـ i18n لكل مكون مقابل المركزي](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ar/per-component_vs_centralized_i18n.md) في جانب الصيانة لهذا الخيار.

## الخيارات المرشحة

أحجام المكتبات مأخوذة من [اختبار أداء TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/benchmark/tanstack.md): الـ provider بالإضافة إلى الـ hook في مكون فارغ، بعد التجميع والـ tree-shaking والـ minification، لـ 10 صفحات و10 لغات. يتم قياس المحتوى بشكل منفصل.

| المكتبة                 | الموجة       | نموذج المحتوى                         | أمان الأنواع على المفاتيح     | تنسيق الرسائل                 | حجم المكتبة |
| :---------------------- | :----------- | :------------------------------------ | :---------------------------- | :---------------------------- | :---------- |
| `react-i18next`         | وقت التشغيل  | JSON مركزي، namespaces                | اختياري (`CustomTypeOptions`) | i18next (لواحق الجمع)         | ~18.4 kB    |
| `react-intl` (FormatJS) | وقت التشغيل  | JSON مركزي، ICU                       | اختياري (استخراج + union)     | ICU                           | ~15.3 kB    |
| `use-intl`              | الخادم أولاً | JSON مركزي، ICU                       | اختياري (دمج التصريحات)       | ICU                           | ~14.1 kB    |
| `@tolgee/react`         | وقت التشغيل  | مركزي، تحرير مباشر في السياق          | لا                            | ICU                           | ~11.1 kB    |
| Lingui                  | ماكرو        | النص المصدري في الكود، كتالوجات مجمعة | جيد، من المترجم               | ICU عبر الماكرو               | صغير        |
| Paraglide               | مترجم        | مشروع inlang، دوال مولدة              | مُولد                         | خاص                           | يقارب الصفر |
| Intlayer                | مترجم        | `.content.ts` لكل مكون                | مُولد، مفعّل افتراضياً        | دوال مساعدة (`plural`, `enu`) | الأساس      |

> الأرقام تمثل لقطة لإصدارات benchmark وتتغير مع التحديثات. قم بتشغيل اختبار الأداء على تطبيقك الخاص قبل اتخاذ القرار بناءً على الحجم وحده.

أمران لا يظهرهما الجدول: لا تشحن `Paraglide` أي مكتبة تقريباً لأنها تولد الكود داخل مستودعك، مما يعني خطوة إعادة توليد قبل كل commit وتعارضات دمج (merge conflicts) محتملة في الملفات المولدة. كما تتطلب `Intlayer` إضافة أداة تجميع (`vite-intlayer` أو ما يعادلها)، لذا لا يمكن تشغيلها في بيئة بدون أدوات بناء (no-build setup).

## مطابقة إجاباتك مع المكتبة المناسبة

<AccordionGroup>
<Accordion header="نموذج أولي، فريق صغير، لغات قليلة">

اختر أبسط حل يعمل وتجنب الاستثمار الزائد. يُعد `react-i18next` مع ملف JSON واحد لكل لغة كافياً، وستوفر لك إجابات عقد كامل على Stack Overflow الكثير من الوقت. تجنب الـ namespaces حتى تحتاجها فعلاً. إذا تحول النموذج الأولي إلى منتج، خصص وقتاً للانتقال إلى المحتوى المحدد النطاق (scoped)؛ يتيح لك [محول التوافق لـ react-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/compat/react-i18next.md) القيام بذلك تدريجياً.

</Accordion>
<Accordion header="الترجمات تأتي من وكالة أو TMS يدعم ICU">

تنسيق الكتالوج محدد مسبقاً لك. تدعم `react-intl` تنسيق ICU بشكل أصلي وأدوات استخراج FormatJS مبنية لهذا المسار. تقرأ `use-intl` صيغة ICU أيضاً. تحتاج `react-i18next` إلى إضافة ICU ومفاتيح الجمع الخاصة بها بخلاف ذلك. دعم Intlayer لـ ICU لا يزال جزئياً، لذا إذا كنت تتلقى نصوص ICU اليوم، فاعتبر ذلك عائقاً حتى اكتمال الدعم.

</Accordion>
<Accordion header="تطبيق كبير، مسارات متعددة، وميزانية الحزمة مهمة">

فضل المحتوى محدد النطاق والتحميل الديناميكي افتراضياً، وليس بمجرد اتفاق عرفي. تحقق `Lingui` و `Paraglide` ذلك عبر التجميع. وتحقق Intlayer ذلك عبر التصريحات المخصصة لكل مكون، حيث يشحن المترجم فقط ما يعرضه المسار. مع `react-i18next` أو `use-intl`، خطط لاستراتيجية الـ namespace والتحميل الكسول (lazy loading) من اليوم الأول وافرضها في مراجعة الكود، لأن الأدوات لن تفرضها تلقائياً.

</Accordion>
<Accordion header="أمان الأنواع (Type safety) غير قابل للتفاوض">

يمكن إضافة الأنواع إلى كل مكتبة معتمدة على المفاتيح، ولكن لا توفر أي منها ذلك تقريباً بشكل افتراضي. إذا كنت لا ترغب في صيانة دمج التصريحات (declaration merging) التي يجب أن تتوافق مع الـ namespaces المحملة بشكل كسول، فاختر مكتبة يتم فيها إنشاء الأنواع من المحتوى مباشرة: `Lingui` أو `Paraglide` أو Intlayer. يقارن مقال [اكتشاف الترجمات المفقودة](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ar/detecting_missing_translations.md) ما تلتقطه كل أداة أثناء وقت البناء.

</Accordion>
<Accordion header="الكثير من المحتوى الغني: markdown، روابط داخل الجمل، مكونات خاصة بكل لغة">

العقد الغنية (Rich nodes) هي النقطة التي تفشل عندها دالة `t()` التي ترجع نصاً عادياً. تمتلك `react-i18next` و `Lingui` مكون `<Trans>`، وتمتلك `react-intl` وسوم النص الغني، وجميعها أكثر تعقيداً من حالة النص العادي. تقبل عقد المحتوى في Intlayer نصوص JSX و markdown والكائنات المتداخلة مباشرة، وهو الخيار الأنسب إذا كان المحتوى يتجاوز مجرد تسميات واجهة المستخدم.

</Accordion>
<Accordion header="سيتم إنشاء الترجمات بواسطة الذكاء الاصطناعي ومراجعتها بواسطة المطورين">

عندها لا يعد ملف JSON المركزي شرطاً لازماً، لعدم وجود نظام TMS للاستيراد إليه. المحتوى المشترك في نفس المكان (Colocated content) مع أداة CLI تملأ اللغات المفقودة هو المسار الأقصر. يعمل أمر `fill` في Intlayer باستخدام مفتاح API الخاص بك (OpenAI و Anthropic و Mistral و Gemini) ويترجم فقط ما تم تغييره. تقدم Paraglide و Tolgee حلولاً مستضافة مماثلة مع خطط أسعار خاصة بهما.

</Accordion>
<Accordion header="قد تنتقل إلى Next.js App Router لاحقاً">

لا يعبر سياق React حدود الخادم/العميل. ستحتاج المكتبات المبنية على خطاف عميل فقط (`react-i18next` و `react-intl`) إلى واجهة برمجة تطبيقات موازية للخادم فور اعتمادك لـ RSC. تمتلك `use-intl` (باسم `next-intl`) و Intlayer (باسم `next-intlayer`) هذا التقسيم بالفعل. اقرأ [مقال Next.js i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ar/list_i18n_technologies/frameworks/nextjs.md) قبل اعتماد نمط موحد.

</Accordion>
</AccordionGroup>

## نقاط القصور في كل مكتبة

حدود صريحة، لأن كل خيار ينطوي على عيوب.

- **`react-i18next`**: الأثقل بين المجموعة، تنسيق جمع خاص بها، الأنواع تتطلب إعداداً يدوياً وصيانة مستمرة، وتتراكم المفاتيح غير المستخدمة دون تنبيه.
- **`react-intl`**: تجربة مطور مطولة (`useIntl()` ثم `formatMessage({ id })`)، ومثيل عام مرتبط بعدة عقد.
- **`use-intl`**: سهلة في البداية، وصعبة في التحسين. الـ namespaces والتحميل الديناميكي والأنواع معاً تبطئ عملية التطوير كثيراً.
- **`Lingui`**: خطوة بناء إضافية لـ `extract` و `compile`، وعدة صيغ متداخلة (`t()`، القوالب ذات العلامات، `i18n.t()`، `<Trans>`) تربك كلاً من المطورين ومساعدي الذكاء الاصطناعي.
- **`Paraglide`**: ملفات مولدة داخل المستودع، لم يدخل الـ tree-shaking حيز التنفيذ الكامل في اختبار React، ويتم قراءة اللغة من التخزين في كل عقدة بدلاً من قراءتها من المخزن المركزي.
- **`Tolgee`**: لا توجد أنواع للمفاتيح، إعداد أصعب، والتحرير المباشر داخل السياق هو نقطة البيع الأساسية.
- **`Intlayer`**: إضافة بناء إلزامية، نظام بيئي أصغر، دعم جزئي لـ ICU، وتوزيع المحتوى عبر قاعدة الكود يعني أن تصدير ملف JSON واحد للمترجم يتطلب أدوات إضافية.
- **`gt-react`, `lingo.dev`**: غير موصى بهما في اختبار الأداء: أخطاء حصص الاستخدام (quota) أثناء البناء، والارتباط بمزود معين (vendor lock-in)، ومشاكل تفاعلية تطلبت إجبار الـ provider على إعادة التصيير.

## كيف يبدو كل خيار في الكود

نفس المكون، وهو ملخص عربة تسوق مع عنوان وصيغة جمع، مكتوباً بكل خيار مرشح. الجزء المثير للاهتمام ليس المكون نفسه، بل أين يعيش المحتوى وما يعرفه مدقق الأنواع عنه.

<Tabs defaultTab="react-i18next">
  <Tab label="react-i18next" value="react-i18next">

```json fileName="public/locales/en/cart.json"
{
  "title": "Your cart",
  "items_one": "{{count}} item",
  "items_other": "{{count}} items"
}
```

```tsx fileName="src/components/CartSummary.tsx"
import type { FC } from "react";
import { useTranslation } from "react-i18next";

export const CartSummary: FC<{ count: number }> = ({ count }) => {
  const { t } = useTranslation("cart");

  return (
    <section>
      <h2>{t("title")}</h2>
      <p>{t("items", { count })}</p>
    </section>
  );
};
```

صيغ الجمع هي مفاتيح لواحق يتم حلها من خلال `Intl.PluralRules`. الدالة `t` هي `(key: string) => string` ما لم تعلن عن `CustomTypeOptions`، لذا يتم تجميع `t("titel")` بنجاح دون أخطاء برمجية.

  </Tab>
  <Tab label="react-intl" value="react-intl">

```json fileName="src/locales/en.json"
{
  "cart.title": "Your cart",
  "cart.items": "{count, plural, one {# item} other {# items}}"
}
```

```tsx fileName="src/components/CartSummary.tsx"
import type { FC } from "react";
import { FormattedMessage, useIntl } from "react-intl";

export const CartSummary: FC<{ count: number }> = ({ count }) => {
  const intl = useIntl();

  return (
    <section>
      <h2>
        <FormattedMessage id="cart.title" />
      </h2>
      <p>{intl.formatMessage({ id: "cart.items" }, { count })}</p>
    </section>
  );
};
```

تنسيق ICU من البداية إلى النهاية، وهو ما تصدره معظم منصات TMS. تأتي الأنواع على `id` من خطوة استخراج `formatjs` بالإضافة إلى union مولد، وليس بشكل جاهز ومباشر.

  </Tab>
  <Tab label="use-intl" value="use-intl">

```json fileName="messages/en.json"
{
  "Cart": {
    "title": "Your cart",
    "items": "{count, plural, one {# item} other {# items}}"
  }
}
```

```tsx fileName="src/components/CartSummary.tsx"
import type { FC } from "react";
import { useTranslations } from "use-intl";

export const CartSummary: FC<{ count: number }> = ({ count }) => {
  const t = useTranslations("Cart");

  return (
    <section>
      <h2>{t("title")}</h2>
      <p>{t("items", { count })}</p>
    </section>
  );
};
```

نفس هيكل `next-intl` بدون ارتباطات Next.js. المفاتيح تصبح محددة الأنواع بمجرد توسيع `AppConfig` بنوع الرسائل؛ ويبقى تقسيم الـ namespaces مسؤوليتك.

  </Tab>
  <Tab label="Lingui" value="lingui">

```po fileName="src/locales/fr/messages.po"
msgid "Your cart"
msgstr "Votre panier"

msgid "{count, plural, one {# item} other {# items}}"
msgstr "{count, plural, one {# article} other {# articles}}"
```

```tsx fileName="src/components/CartSummary.tsx"
import type { FC } from "react";
import { Plural, Trans } from "@lingui/react/macro";

export const CartSummary: FC<{ count: number }> = ({ count }) => (
  <section>
    <h2>
      <Trans>Your cart</Trans>
    </h2>
    <p>
      <Plural value={count} one="# item" other="# items" />
    </p>
  </section>
);
```

اللغة المصدر تعيش داخل المكون؛ واللغات الأخرى تعيش في ملفات `.po` تحت معرفات مجزأة بعد تشغيل `lingui extract`. يؤدي نسيان `extract` أو `compile` إلى الرجوع بهدوء إلى اللغة الإنجليزية دون تنبيه.

  </Tab>
  <Tab label="Paraglide" value="paraglide">

```json fileName="messages/en.json"
{
  "cart_title": "Your cart",
  "cart_items": "{count} items"
}
```

```tsx fileName="src/components/CartSummary.tsx"
import type { FC } from "react";
import { m } from "../paraglide/messages.js";

export const CartSummary: FC<{ count: number }> = ({ count }) => (
  <section>
    <h2>{m.cart_title()}</h2>
    <p>{m.cart_items({ count })}</p>
  </section>
);
```

كل رسالة عبارة عن دالة مولدة ومحددة الأنواع، لذا فإن المفتاح المفقود هو خطأ في الاستيراد (import error). يتم إنشاء مجلد `paraglide/` داخل المستودع وإعادة توليده مع كل تغيير.

  </Tab>
  <Tab label="Intlayer" value="intlayer">

```ts fileName="src/components/cartSummary.content.ts"
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

```tsx fileName="src/components/CartSummary.tsx"
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

export const CartSummary: FC<{ count: number }> = ({ count }) => {
  const { title, items } = useIntlayer("cart-summary");

  return (
    <section>
      <h2>{title}</h2>
      <p>{items(count)}</p>
    </section>
  );
};
```

جميع اللغات في ملف واحد بجانب المكون. يتم إنشاء الأنواع أثناء البناء، لذا يكتمل `title` تلقائياً ويفشل أي خطأ إملائي في `tsc` دون الحاجة لدمج التصريحات. حذف المجلد يحذف نصوصه تلقائياً.

  </Tab>
</Tabs>

هل تستخدم بالفعل `react-i18next` أو `react-intl` أو `Lingui`؟ تتيح محولات التوافق ([react-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/compat/react-i18next.md)، و [react-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/compat/react-intl.md)، و [Lingui](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/compat/lingui.md)) إنشاء أسماء مستعارة (aliases) للاستيرادات على مستوى أداة التجميع بحيث تستمر واجهة الـ API الحالية في العمل أثناء نقلك للمكونات واحداً تلو الآخر. يغطي [دليل الهجرة](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/migration_from_react-i18next_to_intlayer.md) باقي التفاصيل.

## قبل أن تعتمد اختيارك النهائي

يخبرك جدول الميزات بما تفعله المكتبة اليوم. وتوضح لك هذه النقاط كيف ستكون تجربة العمل بها على المدى الطويل.

**تحقق من نشاط المستودع.**

الالتزامات (commits)، وسرعة الرد على المشكلات (issues)، وما إذا كان آخر إصدار فرعي قد صدر هذا العام. التصميم السليم بدون مسؤول صيانة يعني أنك ستواجه هجرة إجبارية مستقبلاً.

**لا تختر بناءً على عدد تنزيلات npm فقط.**

المكتبة الأكثر تثبيتاً هي أول مكتبة ظهرت، وليست بالضرورة المكتبة التي تناسب كود React في عام 2026. تقيس التنزيلات التاريخ وليس الملاءمة الحالية.

![تصنيف مكتبات JavaScript i18n](https://github.com/aymericzip/intlayer/blob/main/docs/assets/alphabet_rank_i18n_lib.png?raw=true)

**اسأل من يدعم مسؤول الصيانة، وماذا يبيعون.**

تحظى `i18next` بدعم من Locize. وتدعم Crowdin كلاً من `next-intl` / `use-intl` و `vue-i18n` و `svelte-i18n` و Lingui. تدير كل من Tolgee و Paraglide (inlang) و Intlayer منصتها الخاصة. المزود الذي يعتمد دخله على الترجمة المستضافة لديه القليل من الدوافع لجعل الترجمة مجانية داخل سلسلة أدواتك. تعد Intlayer الوحيدة في المجموعة التي توفر ترجمة بالذكاء الاصطناعي عبر الـ CLI باستخدام مفتاح API الخاص بك، مع نظام إدارة محتوى (CMS) يمكنك استضافته ذاتياً.

**هل المكتبة جاهزة لوكلاء الذكاء الاصطناعي (AI agents)؟**

لا يزال الوكلاء يواجهون صعوبات مع التدويل: ينسون اللغات، ويخترعون مفاتيح من عندهم، ويخلطون بين صيغ الرسائل. هل توفر المكتبة [Agent Skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/agent_skills.md) أو [خادم MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/mcp_server.md) حتى يتمكن الوكيل من سرد المحتوى وملئه واختباره؟ وهل يتم تحسين تحميل المحتوى افتراضياً، أم يتعين على شخص ما مراجعة الـ namespaces والاستيرادات الكسولة كل ربع سنة؟

**أمان الأنواع فور التثبيت.**

ليس "يمكن توفير الأنواع مع إعداد إضافي"، بل "المفتاح الخاطئ يفشل `tsc` في تثبيت جديد". تحقق مما يحدث مع مفتاح غير موجود، ومع لغة تفتقد ترجمة واحدة.

**اكتشاف المحتوى غير المستخدم.**

الكتالوجات تنمو باستمرار ولا تصغر من تلقاء نفسها. تقوم عملية بناء Intlayer بحذف الحقول غير المستخدمة وتسجيلها (`build.purge`). وتحقق Paraglide ذلك معمارياً، حيث يتم التخلص من دالة الرسالة غير المستدعاة عبر tree-shaking. أما باقي المكتبات فتترك مهمة تنظيف الكتالوجات عليك.

**تجربة المطور (DX).**

الوقت المستغرق من الإعداد حتى أول نص مترجم، ووجود [LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/lsp.md) أو [إضافة VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/vs_code_extension.md) تعرض الترجمة عند التمرير وتنتقل إلى التصريح مباشرة، و [CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/cli/index.md) للملء والاختبار والرفع، وطريقة لغير المطورين لتحرير المحتوى ([المحرر المرئي](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_visual_editor.md) أو [نظام إدارة المحتوى (CMS)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_CMS.md)) بدون طلب سحب (pull request).

## الأسئلة الشائعة

<FAQ>

<Question title="هل لا تزال react-i18next خياراً افتراضياً جيداً في عام 2026؟">

نعم لمعظم الفرق. تمتلك أكبر نظام بيئي وأكبر عدد من الإجابات على الإنترنت. تكاليفها حقيقية ولكن يمكن التنبؤ بها: أثقل وقت تشغيل، وتنسيق جمع مخصص، وأمان الأنواع وتحديد النطاق الذي يجب عليك إعداده وحمايته بنفسك.

</Question>

<Question title="هل أحتاج إلى مكتبة معتمدة على المترجم؟">

فقط إذا كان حجم الحزمة، أو الأنواع المولدة، أو فحوصات المفاتيح المفقودة في وقت البناء من بين متطلباتك. بالنسبة لتطبيق صغير بلغتَين، فإن مكتبة وقت التشغيل أبسط. يشرح مقال [الـ i18n المعتمد على المترجم مقابل التصريحي](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ar/compiler_vs_declarative_i18n.md) ما تمنحه لك المترجمات وما قد تخطئ فيه.

</Question>

<Question title="هل يمكنني تبديل المكتبة لاحقاً دون إعادة كتابة كل مكون؟">

جزئياً. تشترك المكتبات المعتمدة على المفاتيح في شكل كافٍ يتيح لمحول التوافق تعيين واجهة برمجة تطبيقات إلى أخرى، وهو ما تفعله محولات Intlayer. لا يتم تحويل تنسيقات الرسائل (ICU مقابل i18next مقابل الدوال المساعدة) تلقائياً، لذا فإن صيغ الجمع والاستيفاء (interpolation) هي الأجزاء التي ستقوم بتعديلها.

</Question>

<Question title="هل يؤثر اختيار المكتبة على تحسين محركات البحث (SEO)؟">

بشكل غير مباشر. ما تراه روبوتات الفهرسة يتحدد من خلال التوجيه (routing)، و `hreflang`، و `<html lang>`، وما إذا كان النص موجوداً في كود HTML المُصيّر على الخادم. توفر بعض المكتبات دوال مساعدة لذلك، بينما تترك معظمها الأمر لك. راجع [دليل hreflang](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ar/hreflang_guide_multilingual_seo.md).

</Question>

</FAQ>

## للمزيد من التفاصيل

- [اختبار أداء مكتبات i18n: حجم الحزمة والتسريب وتوقيت تبديل اللغة](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/benchmark/index.md) و [تقرير TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/benchmark/tanstack.md)
- [React i18n: كيف يعمل نموذج المزود (provider) وتكلفته](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ar/list_i18n_technologies/frameworks/react.md)
- [react-i18next مقابل react-intl مقابل Intlayer، ميزة بميزة](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ar/react-i18next_vs_react-intl_vs_intlayer.md)
- [next-i18next مقابل next-intl مقابل Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ar/next-i18next_vs_next-intl_vs_intlayer.md)
- [تاريخ JavaScript i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ar/history_of_i18n.md)
- [الـ i18n المعتمد على المترجم مقابل التصريحي](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ar/compiler_vs_declarative_i18n.md)
- [الـ i18n لكل مكون مقابل المركزي](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ar/per-component_vs_centralized_i18n.md)
- [كيف يعمل تحسين الحزمة في وقت البناء](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/bundle_optimization.md)
- [إعداد i18n في تطبيق Vite + React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_with_vite+react.md)
- نفس الدليل لكل من [Vue](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ar/how_to_pick_vue_i18n_library.md)، و [Svelte](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ar/how_to_pick_svelte_i18n_library.md)، و [Solid](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ar/how_to_pick_solid_i18n_library.md)
