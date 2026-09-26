---
createdAt: 2026-09-23
updatedAt: 2026-09-23
priority: 8
title: هل Intlayer أخف من Paraglide؟
description: يبدو Paraglide شبه مجاني في اختبارات أداء التدويل (i18n) لأن كوده يتم توليده مباشرة في مستودع مشروعك. نوضح هنا إلى أين يذهب ذلك الحجم فعلياً، ولماذا يكلفك فحص اللغة لكل عقدة أداءً إضافياً، وكيف يشحن التحميل الديناميكي في Intlayer لغة واحدة بدلاً من جميع اللغات.
keywords:
  - Paraglide
  - Intlayer
  - تدويل
  - i18n
  - Bundle size
  - Tree shaking
  - Benchmark
  - Blog
slugs:
  - blog
  - is-intlayer-lighter-than-paraglide
author: aymericzip
---

# هل Intlayer أخف من Paraglide؟

نعم.

يحظى `Paraglide` بسمعة جيدة باعتباره أخف حلول التدويل المتاحة، وللوهلة الأولى يتفق [اختبار الأداء](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/benchmark/tanstack.md) مع ذلك: فحجم مكتبته يقارب الصفر. لكن حجم مكتبة يقارب الصفر لا يعني إرسال صفر بايت إلى المتصفح. هذا يعني ببساطة أن البايتات تستقر في مكان لا ترصده تلك المعايير.

<TOC/>

## النقاط الرئيسية

**حجم المكتبة مخفي، وليس محذوفاً:**

يولد Paraglide وقت التشغيل (runtime) ودوال الرسائل الخاصة به مباشرة في قاعدة الكود (codebase) لديك. يتم شحن هذا الكود إلى المتصفح، لكنه يُحسب ككود _خاص بك_، وليس ككود للمكتبة.

**غياب الـ Provider ليس مكسباً مجانياً:**

كل استدعاء للدالة `m.my_key()` يحدد اللغة بنفسه، حيث يقرأ ملف تعريف الارتباط (cookie) أو التخزين المحلي لكل عقدة يتم تصييرها (render)، بدلاً من قراءتها مرة واحدة فقط من السياق (context).

**لا يوجد تحميل ديناميكي (Dynamic Loading):**

يستورد Paraglide كل لغات الرسالة في حزمة العميل (client bundle). بينما يقوم Intlayer مع خيار `importMode: 'dynamic'` أو `'fetch'` بتحميل اللغة التي يتم عرضها حالياً فقط.

**الـ Tree Shaking ليس مضموناً دائماً:**

في بعض اختبارات الأداء لدينا، لم تعمل ميزة Tree Shaking المعلن عنها في Paraglide بالشكل المطلوب. نوصي بفحص الحزمة الخاصة بك.

## أين يذهب حجم Paraglide الفعلي؟

في تقارير المقارنة المعيارية، يقيس مقياس "حجم المكتبة" الـ provider والـ hooks لكل مكتبة i18n في مكون فارغ، قبل إضافة أي محتوى.

| المكتبة (TanStack Start)      | حجم المكتبة (gz) | حجم المكتبة (min) |
| ----------------------------- | ---------------- | ----------------- |
| `@inlang/paraglide-js@2.15.1` | 1.8 KB           | 4.5 KB            |
| `react-intlayer@9.5.1`        | 5.0 KB           | 15.2 KB           |

إذا قرأت هذه الأرقام بمعزل عن السياق، يبدو أن Paraglide هو الفائز. لكن Paraglide عبارة عن مترجم (compiler): فهو يقرأ ملفات `messages/*.json` الخاصة بك وينشئ مجلد `paraglide/` داخل مستودع مشروعك، ويحتوي على ملف `runtime.js` (اكتشاف اللغة، استراتيجيات الكوكيز والتخزين، وتوطين الروابط) ودالة جافاسكريبت واحدة لكل رسالة.

```bash
src/paraglide/
├── runtime.js      # اكتشاف اللغة، الاستراتيجيات، مساعدات الروابط
├── server.js
├── messages.js     # إعادة تصدير كافة الرسائل
└── messages/
    ├── _index.js
    ├── en.js
    └── fr.js
```

نظراً لأن هذا الكود يستقر داخل مجلد `src/` الخاص بك وتقوم باستيراده بمسار نسبي، فإن أداة الحزم (bundler) تنسبه إلى تطبيقك، وليس إلى حزمة خارجية في `node_modules`. لذلك يُظهر عمود حجم المكتبة رقماً يقارب الصفر، في حين أن نفس المنطق البرمجي يُشحن فعلياً ضمن حزمة صفحتك.

توليد الكود ليس فكرة سيئة بحد ذاته: فوقت التشغيل المولد لا يتضمن سوى المنطق الذي تتطلبه إعداداتك (استراتيجية البادئة، الكوكيز مقابل التخزين المحلي، إلخ). ويحقق Intlayer نفس النتيجة بأسلوب مختلف، عن طريق حقن متغيرات البيئة أثناء مرحلة البناء، مما يسمح لأداة الحزم بحذف الفروع البرمجية التي لا تستخدمها إعداداتك. كلا الأسلوبين ينتهي بهما الأمر أخف بما يتراوح بين 3 إلى 10 مرات مقارنة بـ `i18next` أو `next-intl`.

لذا، فإن المقارنة العادلة ليست حجم المكتبة المجرد. بل هي **كمية الجافاسكريبت المرسلة فعلياً لكل صفحة**.

## وزن الصفحة المقاس فعلياً

تطبيق TanStack Start، يتكون من 10 صفحات، تم القياس على مساري `en` و `fr`، بضغط gzip:

| الإعداد                            | متوسط JS للصفحة (gz) | الزيادة عن الأساس | تسريب اللغات | تسريب الصفحات الأخرى |
| ---------------------------------- | -------------------- | ----------------- | ------------ | -------------------- |
| الأساس (بدون i18n)                 | 111.0 KB             | -                 | 0.0%         | 0.0%                 |
| `paraglide` (أي استراتيجية)        | 125.1 KB             | +14.1 KB          | 49.7%        | 0.0%                 |
| `intlayer` (`importMode: static`)  | 125.8 KB             | +14.8 KB          | 50.0%        | 0.0%                 |
| `intlayer` (`importMode: dynamic`) | **118.6 KB**         | **+7.6 KB**       | **0.0%**     | **0.0%**             |

تطبيق Next.js 16 App Router، نفس التطبيق:

| الإعداد            | متوسط JS للصفحة (gz) | الزيادة عن الأساس |
| ------------------ | -------------------- | ----------------- |
| الأساس (بدون i18n) | 141.0 KB             | -                 |
| `paraglide-next`   | 155.3 KB             | +14.3 KB          |
| `next-intlayer`    | **141.3 KB**         | **+0.3 KB**       |

<I18nBenchmark framework="tanstack" vertical/>

> البيانات الكاملة متوفرة في [تقرير مقارنة TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/benchmark/tanstack.md) و[تقرير مقارنة Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/benchmark/nextjs.md). يمكن فحص كل حزمة في [مستودع اختبارات الأداء](https://github.com/intlayer-org/benchmark-i18n).

هناك نقطتان واضحتان:

- في الوضع الثابت (`static`)، يرسل Intlayer نفس المحتوى تقريباً مقارنة بـ Paraglide (125.8 KB مقابل 125.1 KB). وهذا أمر متوقع: فكلاهما يضم جميع لغات الرسائل التي تستخدمها الصفحة.
- يظل Paraglide عند 125.1 KB مهما كانت الاستراتيجية المستخدمة، لأنه لا يحتوي على وضع ديناميكي. كل سطر في الجدول أعلاه يمثل النمط الثابت.

## غياب الـ Provider: فكرة تبدو جذابة ولكنها ليست كذلك

لا يتطلب Paraglide استخدام Provider. كل ما تفعله هو استيراد الرسالة واستدعاؤها:

```tsx fileName="Hero.tsx"
import { m } from "../paraglide/messages.js";

export const Hero = () => (
  <section>
    <h1>{m.hero_title()}</h1>
    <p>{m.hero_description()}</p>
    <button>{m.hero_cta()}</button>
  </section>
);
```

لا سياق، لا غلاف، ولا خطافات (hooks). يبدو الأمر أبسط. لكن اللغة لا تزال بحاجة إلى تحديد مصدرها. تبدو كل دالة رسالة مولدة تقريباً على هذا النحو (بشكل مبسط):

```js fileName="paraglide/messages/_index.js"
export const hero_title = (inputs = {}, options = {}) => {
  const locale = options.locale ?? getLocale(); // يتم تحديدها عند كل استدعاء

  if (locale === "en") return en.hero_title(inputs);
  if (locale === "fr") return fr.hero_title(inputs);
  // ...فرع برمجي لكل لغة
};
```

وتقوم `getLocale()` بفحص الاستراتيجيات المحددة (الكوكيز، التخزين المحلي، الرابط، اللغة الأساسية) لمعرفة اللغة الحالية. هذا يعني أن كل عقدة نصية تصيّرها (`<>{m.my_key()}</>`) تقوم بتشغيل عملية تحديد لغة مستقلة، بما في ذلك قراءة `document.cookie` في المتصفح. صفحة تحتوي على 200 نص مترجم تقوم بتحديد اللغة 200 مرة في كل عملية تصيير، وتتكرر العملية مع كل إعادة تصيير.

في المقابل، فإن المكتبة التي تعتمد على Provider تقرأ اللغة **مرة واحدة فقط**، وتخزنها في سياق (أو signal، أو store)، وتقرأ كل عقدة قيمة مخزنة مسبقاً في الذاكرة. يكلف الـ Provider بضع مئات من البايتات فقط. وتخطي استخدامه يستهلك دورات المعالج مع كل تصيير، وهو ما يتضح جلياً في اختبار الأداء: فأوقات تحميل الصفحة وسرعة تبديل اللغة في Paraglide تتأخر باستمرار مقارنة بـ Intlayer على TanStack Start (22.1 مللي ثانية مقابل 14.6 مللي ثانية في تحميل الصفحة، و 4.3 مللي ثانية مقابل 3.2 مللي ثانية في الاستجابة E2E).

## تجربة المطور (DX)

مصدر الحقيقة في Paraglide هو ملفات JSON، لكنك لا تستورد ملف الـ JSON مطلقاً، بل تستورد ملف الـ `.js` المولد:

<Tabs defaultTab="intlayer" group="techno">
  <Tab label="Paraglide" value="paraglide">

```json fileName="messages/en.json"
{
  "hero_title": "Ship your app in every language"
}
```

```json fileName="messages/ar.json"
{
  "hero_title": "انشر تطبيقك بكل اللغات"
}
```

```tsx fileName="Hero.tsx"
// لا يوجد هذا الملف إلا بعد أن يعيد المترجم توليده من ملف الـ JSON
import { m } from "../paraglide/messages.js";

export const Hero = () => <h1>{m.hero_title()}</h1>;
```

  </Tab>
  <Tab label="Intlayer" value="intlayer">

```ts fileName="Hero.content.ts"
import { t, type Dictionary } from "intlayer";

export default {
  key: "hero",
  content: {
    title: t({
      ar: "انشر تطبيقك بكل اللغات",
      en: "Ship your app in every language",
    }),
  },
} satisfies Dictionary;
```

```tsx fileName="Hero.tsx"
import { useIntlayer } from "react-intlayer";

export const Hero = () => {
  const { title } = useIntlayer("hero");

  return <h1>{title}</h1>;
};
```

  </Tab>
</Tabs>

هذا النمط في العمل له ثمن:

- كل تعديل على ملف JSON يتطلب إعادة توليد قبل أن يتم التعرف على الاستيراد أو تتحدث الأنواع (types).
- مجلد `paraglide/` المولد إما أن يتم إدراجه في git (مما يؤدي لتعارضات دمج في الملفات المولدة مع كل طلب سحب PR يمس النصوص)، أو يتم تجاهله (مما يتطلب خطوة توليد إلزامية قبل كل فحص للأنواع أو اختبار أو مهمة CI).
- كل نص يتحول إلى استدعاء دالة. وتتحول الثوابت إلى `m.key()` في كل مكان، حتى في الأماكن التي تكفي فيها قيمة ثابتة بسيطة.

## Tree Shaking: افحص الحزمة الخاصة بك

الوعد الأساسي لـ Paraglide هو أن الرسائل غير المستخدمة يتم التخلص منها عبر الـ Tree Shaking لأن كل رسالة تصدر كعنصر مستقل. وفي اختبار Svelte + Vite، عملت هذه الميزة كما هو متوقع.

لكن في بيئات أخرى، لم يتحقق ذلك. ففي اختبارنا على [Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/benchmark/nextjs.md)، زادت صفحات Paraglide بمقدار 14 KB مقارنة بالتطبيق الأساسي، بينما أضاف `next-intlayer` فقط 0.3 KB. كما أظهرت اختبارات سابقة على TanStack Start تسرب رسائل من صفحات أخرى إلى حزمة المسار الحالي.

يعتمد الـ Tree Shaking على أداة الحزم لديك (Turbopack، Rolldown، Rollup)، وعلى طريقة استيراد الرسائل (`import { m }` مقابل `import * as m`)، وعلى تحليل الآثار الجانبية (side-effects). إذا اخترت Paraglide لصغر حجمه، افتح أداة فحص الحزم وتأكد من تحقق ذلك في تطبيقك الفعلي.

## غياب التحميل الديناميكي

هذا هو العائق البنيوي الأبرز. لا يمتلك Paraglide وسيلة لتحميل لغة واحدة في كل مرة: فكل دالة رسالة تستورد تنفيذ كل اللغات بشكل ثابت، مما يجعل جميع اللغات تنتهي داخل حزمة العميل الخاصة بك.

عند دعم لغتين، يتم هدر نصف بيانات الترجمة المنقولة، وهو ما يطابق نسبة تسريب اللغات المقدرة بـ ~50% أعلاه. ومع 10 لغات، يرتفع الهدر إلى 90%. ومع 30 لغة، يصل إلى 97%.

والانتقال إلى التحميل الديناميكي لن يحل المشكلة أيضاً: فمع وجود دالة مستقلة لكل رسالة، فإن تحميل كل دالة بشكل كسول سيعني إطلاق آلاف الطلبات عبر الشبكة.

يتيح لك Intlayer حرية الاختيار، سواء على المستوى العام للتطبيق أو لكل قاموس على حدة:

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  dictionary: {
    importMode: "dynamic", // 'static' | 'dynamic' | 'fetch'
  },
};

export default config;
```

| `importMode` | ما يتم إرساله إلى العميل                            | مقارنة بـ Paraglide            |
| ------------ | --------------------------------------------------- | ------------------------------ |
| `static`     | جميع لغات القواميس التي تستخدمها الصفحة             | نفس المحتوى نظرياً             |
| `dynamic`    | اللغة الحالية فقط، محملة بكسل لكل قاموس             | **أخف بـ N مرة** مع وجود N لغة |
| `fetch`      | اللغة الحالية فقط، مجلوبة عبر واجهة برمجة Live Sync | **أخف بـ N مرة** مع وجود N لغة |

بفضل [التحويل أثناء البناء](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/bundle_optimization.md) وخيار `importMode: 'static'`، يحمّل Intlayer نظرياً نفس المحتوى تماماً مثل Paraglide. ومع استخدام `'dynamic'` أو `'fetch'`، فإنه يحمّل فقط ما تتطلبه اللغة الحالية: لتطبيق يدعم N لغة، تصبح حمولة الترجمة أصغر بـ N مرة مقارنة بـ Paraglide.

## متى يظل Paraglide خياراً مناسباً؟

<AccordionGroup>
<Accordion header="تطبيقات Svelte + Vite مع عدد قليل من اللغات">

إذا كانت بيئة تطويرك تعتمد على Svelte مع Vite وتدعم لغتين أو ثلاث، فإن الـ Tree Shaking يعمل كما ينبغي ويبقى العبء الإضافي للغات محدوداً.

</Accordion>
<Accordion header="سير العمل القائم حالياً على inlang">

إذا كان فريقك يستخدم بالفعل منظومة inlang (مثل Fink و Sherlock وإضافات صيغ الرسائل)، فإن Paraglide يتكامل معها بشكل أصيل وسلس.

</Accordion>
</AccordionGroup>

## جربه على تطبيقك

تحقق من حجم تطبيقك الحي ومستوى تسريب اللغات باستخدام أداة [i18n SEO Scanner](https://intlayer.org/i18n-seo-scanner) المجانية:

<ClickToOpenIframe src="https://intlayer.org/i18n-seo-scanner" width="100%" height="600px" style="border:none;"/>

لتثبيت Intlayer:

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

## قراءات إضافية

- [اختبار أداء i18n في TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/benchmark/tanstack.md)
- [اختبار أداء i18n في Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/benchmark/nextjs.md)
- [تحسين الحزم و `importMode`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/bundle_optimization.md)
- [كيفية اختيار مكتبة i18n المناسبة لـ React](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ar/how_to_pick_react_i18n_library.md)
- [دواعي ومبررات التدويل المعتمد على المترجم](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ar/compiler_vs_declarative_i18n.md)
