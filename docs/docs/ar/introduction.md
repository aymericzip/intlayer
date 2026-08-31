---
createdAt: 2025-08-23
updatedAt: 2025-08-23
title: مقدمة
description: اكتشف كيف يعمل Intlayer. تعرف على الخطوات التي يستخدمها Intlayer في تطبيقك. اكتشف ما تفعله الحزم المختلفة.
keywords:
  - مقدمة
  - البدء
  - Intlayer
  - تطبيق
  - حزم
slugs:
  - doc
  - get-started
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: "Init history"
author: aymericzip
---

# توثيق Intlayer

مرحبًا بك في التوثيق الرسمي لـ Intlayer! هنا، ستجد كل ما تحتاجه لدمج وتكوين وإتقان Intlayer لجميع احتياجات التدويل (i18n) الخاصة بك، سواء كنت تعمل مع Next.js، أو React، أو Vite، أو Express، أو أي بيئة JavaScript أخرى.

## مقدمة

### ما هو Intlayer؟

**Intlayer** هي مكتبة تدويل مصممة خصيصًا لمطوري JavaScript. تتيح لك الإعلان عن المحتوى الخاص بك في أي مكان في الكود الخاص بك. تقوم بتحويل إعلانات المحتوى متعدد اللغات إلى قواميس منظمة يسهل دمجها في الكود الخاص بك. باستخدام TypeScript، تجعل **Intlayer** تطويرك أكثر قوة وكفاءة.

توفر Intlayer أيضًا محررًا مرئيًا اختياريًا يتيح لك تعديل المحتوى الخاص بك وإدارته بسهولة. هذا المحرر مفيد بشكل خاص للمطورين الذين يفضلون واجهة مرئية لإدارة المحتوى، أو للفرق التي تقوم بإنشاء المحتوى دون الحاجة إلى القلق بشأن الكود.

### مثال على الاستخدام

```bash
.
└── Components
    └── MyComponent
        ├── index.content.ts
        └── index.tsx
```

```tsx fileName="src/components/MyComponent/index.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const componentContent = {
  key: "component-key",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      es: "Hola Mundo",
      fr: "Bonjour le monde",
      ar: "مرحبا بالعالم",
    }),
  },
} satisfies Dictionary;

export default componentContent;
```

```json fileName="src/components/MyComponent/index.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "component-key",
  "content": {
    "myTranslatedContent": {
      "nodeType": "translation",
      "translation": {
        "en": "Hello World",
        "fr": "Bonjour le monde",
        "es": "Hola Mundo",
        "ar": "مرحبا بالعالم"
      }
    }
  }
}
```

```tsx fileName="src/components/MyComponent/index.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

export const MyComponent: FC = () => {
  const { myTranslatedContent } = useIntlayer("component-key");

  return <span>{myTranslatedContent}</span>;
};
```

### لماذا Intlayer على البدائل؟

مقارنةً بالحلول الرئيسية مثل `next-intl` أو `i18next`، يُعد Intlayer حلاً يأتي مع تحسينات مدمجة مثل:

<AccordionGroup>

<Accordion header="حجم البندل (Bundle size)">

بدلاً من تحميل ملفات JSON ضخمة في صفحاتك، قم بتحميل المحتوى الضروري فقط. تساعد Intlayer في **تقليل حجم الحزمة وصفحاتك بنسبة تصل إلى 50%**.

</Accordion>

<Accordion header="قابلية الصيانة (Maintainability)">

تحديد نطاق محتوى تطبيقك بالقرب من المكونات **يسهل الصيانة** للتطبيقات واسعة النطاق. يمكنك تكرار أو حذف مجلد ميزة واحدة دون العبء العقلي المتمثل في مراجعة قاعدة بيانات المحتوى بالكامل. بالإضافة إلى ذلك، تم كتابة Intlayer **بالكامل باستخدام الأنواع (fully typed)** لضمان دقة المحتوى الخاص بك.

</Accordion>

<Accordion header="وكيل الذكاء الاصطناعي (AI Agent)">

يؤدي تحديد الموقع المشترك للمحتوى إلى **تقليل السياق المطلوب** بواسطة نماذج اللغة الكبيرة (LLMs). تأتي Intlayer أيضًا مع مجموعة من الأدوات، مثل **CLI** لاختبار الترجمات المفقودة، و **[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/lsp.md)**، و **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/mcp_server.md)**، و **[agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/agent_skills.md)**، لجعل تجربة المطور (DX) أكثر سلاسة لوكلاء الذكاء الاصطناعي.

</Accordion>

<Accordion header="الأتمتة (Automation)">

استخدم الأتمتة للترجمة في مسار CI/CD الخاص بك باستخدام LLM من اختيارك على حساب مزود الذكاء الاصطناعي الخاص بك. تقدم Intlayer أيضًا **مترجمًا (compiler)** لأتمتة استخراج المحتوى، بالإضافة إلى [منصة ويب](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_CMS.md) للمساعدة في **الترجمة في الخلفية**.

</Accordion>

<Accordion header="الأداء (Performance)">

يمكن أن يؤدي ربط ملفات JSON الضخمة بالمكونات إلى مشاكل في الأداء والتفاعلية. تقوم Intlayer بتحسين تحميل المحتوى الخاص بك في وقت البناء (build time).

</Accordion>

<Accordion header="التوسع مع غير المطورين (Scaling with non-dev)">

أكثر من مجرد حل i18n، توفر Intlayer **[محررًا مرئيًا ذاتي الاستضافة](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_visual_editor.md)** و **[CMS كاملًا](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_CMS.md)** لمساعدتك في إدارة المحتوى متعدد اللغات في **الوقت الفعلي (real-time)**، مما يجعل التعاون مع المترجمين وكتاب النصوص وأعضاء الفريق الآخرين سلسًا. يمكن تخزين المحتوى محليًا و/أو عن بُعد.

</Accordion>
</AccordionGroup>

## الميزات الرئيسية

تقدم Intlayer مجموعة متنوعة من الميزات المصممة لتلبية احتياجات تطوير الويب الحديث. فيما يلي الميزات الرئيسية، مع روابط لتوثيق مفصل لكل منها:

- **دعم التدويل**: عزز الوصول العالمي لتطبيقك مع دعم مدمج للتدويل.
- **المحرر المرئي**: قم بتحسين سير عمل التطوير الخاص بك باستخدام إضافات المحرر المصممة لـ Intlayer. تحقق من [دليل المحرر المرئي](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_visual_editor.md).
- **مرونة التكوين**: قم بتخصيص إعداداتك بخيارات تكوين شاملة ومفصلة في [دليل التكوين](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/configuration.md).
- **أدوات CLI المتقدمة**: أدر مشاريعك بكفاءة باستخدام واجهة سطر الأوامر الخاصة بـ Intlayer. استكشف الإمكانيات في [توثيق أدوات CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/cli/index.md).

## المفاهيم الأساسية

### القاموس (Dictionary)

قم بتنظيم المحتوى متعدد اللغات الخاص بك بالقرب من الكود للحفاظ على تناسق كل شيء وسهولة صيانته.

- **[البدء](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dictionary/content_file.md)**  
  تعلم أساسيات إعلان المحتوى الخاص بك في Intlayer.

- **[الترجمة (Translation)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dictionary/translation.md)**  
  افهم كيف يتم إنشاء الترجمات وتخزينها واستخدامها في تطبيقك.

- **[التعداد (Enumeration)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dictionary/enumeration.md)**  
  قم بإدارة مجموعات البيانات المتكررة أو الثابتة بسهولة عبر لغات مختلفة.

- **[الشرط (Condition)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dictionary/condition.md)**  
  تعلم كيفية استخدام المنطق الشرطي في Intlayer لإنشاء محتوى ديناميكي.

- **[الإدراج (Insertion)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dictionary/insertion.md)**  
  اكتشف كيفية إدراج القيم في سلسلة نصية باستخدام العناصر النائبة (placeholders).

- **[جلب الدوال (Function Fetching)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dictionary/function_fetching.md)**  
  تعرف على كيفية جلب المحتوى ديناميكيًا باستخدام منطق مخصص ليتناسب مع سير عمل مشروعك.

- **[ماركداون (Markdown)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dictionary/markdown.md)**  
  تعلم كيفية استخدام Markdown في Intlayer لإنشاء محتوى غني.

- **[تضمين الملفات (File Embeddings)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dictionary/file.md)**  
  اكتشف كيفية تضمين الملفات الخارجية في Intlayer لاستخدامها في محرر المحتوى.

- **[التداخل (Nesting)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dictionary/nesting.md)**  
  افهم كيفية تداخل المحتوى في Intlayer لإنشاء هياكل معقدة.

### البيئات والتكاملات (Environments & Integrations)

لقد قمنا ببناء Intlayer مع وضع المرونة في الاعتبار، لنوفر دمجًا سلسًا عبر إطارات العمل وأدوات البناء الشائعة:

- **[Intlayer مع Next.js 16](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_with_nextjs_16.md)**
- **[Intlayer مع Next.js 15](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_with_nextjs_15.md)**
- **[Intlayer مع Next.js 14 (App Router)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_with_nextjs_14.md)**
- **[Intlayer مع Next.js Page Router](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_with_nextjs_page_router.md)**
- **[Intlayer مع React CRA](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_with_create_react_app.md)**
- **[Intlayer مع Vite + React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_with_vite+react.md)**
- **[Intlayer مع React Router v7](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_with_react_router_v7.md)**
- **[Intlayer مع Tanstack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_with_tanstack.md)**
- **[Intlayer مع React Native و Expo](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_with_react_native+expo.md)**
- **[Intlayer مع Lynx و React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_with_lynx+react.md)**
- **[Intlayer مع Vite + Preact](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_with_vite+preact.md)**
- **[Intlayer مع Vite + Vue](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_with_vite+vue.md)**
- **[Intlayer مع Nuxt](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_with_nuxt.md)**
- **[Intlayer مع Vite + Svelte](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_with_vite+svelte.md)**
- **[Intlayer مع SvelteKit](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_with_svelte_kit.md)**
- **[Intlayer مع Express](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_with_express.md)**
- **[Intlayer مع NestJS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_with_nestjs.md)**
- **[Intlayer مع Hono](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_with_hono.md)**
- **[Intlayer مع Angular](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_with_angular_21.md)**

يتضمن كل دليل للتكامل أفضل الممارسات لاستخدام ميزات Intlayer، مثل **الرندرة من جانب الخادم (SSR)**، أو **التوجيه الديناميكي (Dynamic Routing)**، أو **الرندرة من جانب العميل (Client-Side Rendering)**، لتتمكن من الحفاظ على تطبيق سريع وصديق لمحركات البحث (SEO) وقابل للتوسع بدرجة كبيرة.

## المساهمة والملاحظات

نحن نُقدر قوة المصادر المفتوحة والتطوير المدفوع بالمجتمع. إذا كنت ترغب في اقتراح تحسينات، أو إضافة دليل جديد، أو تصحيح أي مشاكل في وثائقنا، فلا تتردد في تقديم طلب سحب (Pull Request) أو فتح مشكلة (Issue) في [مستودع GitHub الخاص بنا](https://github.com/aymericzip/intlayer/blob/main/docs/docs).

**هل أنت مستعد لترجمة تطبيقك بشكل أسرع وأكثر كفاءة؟** الغوص في وثائقنا للبدء في استخدام Intlayer اليوم. جرب نهجًا قويًا ومبسطًا للتدويل يحافظ على تنظيم المحتوى الخاص بك ويزيد من إنتاجية فريقك.

## الأسئلة الشائعة

<FAQ>

<Question title="فيم يستخدم Intlayer؟">

Intlayer هي مكتبة تدويل (i18n) لتطبيقات JavaScript و TypeScript. تُصرح بمحتوى المكون بجوار المكون مباشرة في ملف `.content.ts`، ويقوم Intlayer بترجمة تلك الإعلانات إلى قواميس مكتوبة ومفحوصة الأنواع في وقت البناء، وتقرأها مكوناتك عبر خطافات مثل `useIntlayer`. تتضمن المكتبة الترجمة، وقواعد الجمع، والجنس، و Markdown، والتوجيه المراعي للغات، والبيانات الوصفية لـ SEO، والترجمة بمساعدة الذكاء الاصطناعي، ومحررًا مرئيًا لغير المطورين.

</Question>

<Question title="كم يضيف i18n إلى حجم حزمة (bundle) تطبيقي؟">

أقل بكثير من الإعدادات القائمة على فضاءات الأسماء، لأن الصفحة لا تُحمّل أبدًا كتالوجًا لا تعرضه. يُحل المحتوى المعروض على الخادم مباشرة على الخادم، ويستبدل مترجم وقت البناء استدعاءات `useIntlayer` بإدخالات القاموس الدقيقة التي يستخدمها المكون، لذلك يتم التخلص من المفاتيح واللغات غير المستخدمة. تقسم [القواميس الديناميكية](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dynamic_dictionaries/index.md) الباقي حسب اللغة. مقارنة بالبدائل التقليدية، يقلل Intlayer حجم الحزمة والصفحة بنسبة تصل إلى 50%. انظر [تحسين الحزم](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/bundle_optimization.md) و [المقارنة المعيارية](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/benchmark/index.md).

</Question>

<Question title="هل يمكنني الترحيل من i18next أو next-intl أو react-i18next دون إعادة كتابة مكوناتي؟">

نعم، وبطريقتين. يمكنك ترحيل المحتوى تدريجيًا باستخدام [دليل ترحيل i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/migration_from_i18next_to_intlayer.md) أو [دليل ترحيل next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/migration_from_next-intl_to_intlayer.md). أو يمكنك الاحتفاظ بواجهة برمجة التطبيقات الحالية بالكامل: تكشف [محولات التوافق](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/compat/index.md) نفس واجهات `i18next` و `react-i18next` و `next-intl` و `next-i18next` و `react-intl` و `use-intl` و `vue-i18n` و `Lingui`، ولكنها مدعومة بقواميس Intlayer، بحيث تتغير الاستيرادات فقط بينما يظل كود المكون كما هو.

</Question>

<Question title="هل يمكنني الاحتفاظ بملفات الترجمة JSON الموجودة لدي؟">

نعم. تحافظ [مكونة مزامنة JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/plugins/sync-json.md) على ملفات `/messages/{locale}/{namespace}.json` الخاصة بك كمصدر الحقيقة وتُنشئ قواميس Intlayer منها، في كلا الاتجاهين. وتقوم [مكونة مزامنة PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/plugins/sync-po.md) بنفس الشيء لكتالوجات gettext، وتسمح لك [الملفات المقسمة حسب اللغة](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/per_locale_file.md) بتقسيم المحتوى حسب اللغة بدلاً من تجميع كل اللغات في ملف واحد.

</Question>

<Question title="هل يجب أن أنقل المحتوى الخاص بي مفتاحًا تلو الآخر؟">

لا. قم بتشغيل `npx intlayer extract` وسيقرأ Intlayer ملفات المصدر الخاصة بك، ويسحب السلاسل النصية الموجهة للمستخدم ويكتب ملف `.content` بجانب كل منها، بحيث تراجع diff بدلاً من نسخ السلاسل إلى كتالوج يدويًا. راجع [أمر extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/cli/extract.md).

لأتمتة كاملة، يقوم [Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/compiler.md) بالشيء نفسه في وقت البناء على كود JSX و TSX و Vue و Svelte، منشئًا القواميس عند كل تغيير دون الحاجة إلى إدارة المفاتيح يدويًا.

</Question>

<Question title="ما هي أدوات المحررات والوكلاء الذكيين المتاحة؟">

خمس أدوات، كلها اختيارية:

- **[امتداد VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/vs_code_extension.md)**: الانتقال من مفتاح `useIntlayer` إلى ملف المحتوى المصرح به، استخراج المحتوى من المكون، وتشغيل build و fill و test و push و pull من لوحة الأوامر أو علامة تبويب Intlayer.
- **[خادم LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/lsp.md)**: نفس التجربة في أي محرر يدعم LSP، مع الانتقال إلى التعريف وعروض القيمة المترجمة عند التمرير والإكمال التلقائي للمفاتيح. يدعم أيضًا استدعاءات `i18next` و `react-i18next` و `next-intl` و `use-intl`.
- **[خادم MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/mcp_server.md)**: يكشف وثائق Intlayer و CLI إلى Cursor و VS Code و Claude Desktop و Claude Code و ChatGPT.
- **[Agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/agent_skills.md)**: مهارات مخصصة مثل `intlayer-config` و `intlayer-cli` و `intlayer-content`.
- **[ESLint plugin](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/eslint.md)**: قاعدة `no-raw-text` ترصد النصوص المكتوبة مباشرة بدون تدويل.

</Question>

<Question title="ما هي الحلول المختلفة المتاحة لتدويل تطبيقات JavaScript؟">

ينقسم المجال إلى ثلاثة أجيال:

- **مكتبات كتالوجات وقت التشغيل**: `i18next`، `react-i18next`، `next-i18next`، `vue-i18n`، `ngx-translate`. تُخزن الرسائل في فضاءات أسماء JSON تُحمل في وقت التشغيل. ناضجة ومستقلة عن أطر العمل، لكنها تفتقر إلى الفحص الثابت للأنواع وترسل الكتالوج بأكمله إلى العميل.
- **مكتبات رسائل وقت البناء**: `Lingui`، `Paraglide`، `react-intl`، و `next-intl` مع خطوة استخراج. تحسين في الحجم وفحص جزئي للأنواع، لكنها لا تزال تعتمد على الكتالوجات المركزية.
- **مكتبات طبقة المحتوى (Content layer)**: `Intlayer`. يُصرح بالمحتوى لكل مكون ويُترجم لكل مكون؛ تجمع بين الفحص النوعي، والتصفية التلقائية، وأدوات المطورين، والتحرير المرئي في مصدر واحد للحقيقة.

انظر [لماذا Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/interest_of_intlayer.md) و [المقارنة المعيارية](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/benchmark/index.md).

</Question>

<Question title="ما هي أطر العمل التي يدعمها Intlayer؟">

React، Next.js، Vite، TanStack Start، React Router، Vue، Nuxt، Svelte، SvelteKit، Angular، Solid، Preact، Lit، و Astro مع أي مكونات جزر، و React Native مع Expo، و Lynx، وفي الواجهة الخلفية Express، Fastify، NestJS، Hono، Elysia، و AdonisJS. يحتوي قسم البيئات على دليل مخصص لكل منها.

</Question>

<Question title="لماذا أصرح بالمحتوى بجانب المكون بدلاً من ملف JSON مركزي؟">

لثلاثة أسباب: أولاً، ترسل الصفحة فقط الإدخالات التي تعرضها مكوناتها بالفعل بدلاً من فضاء أسماء كامل، مما يقلل بشكل كبير من حجم الحزمة. ثانيًا، يمكن نقل مجلد الميزة أو حذفه بشكل مستقل دون القلق بشأن فقدان المفاتيح. ثالثًا، ترى نماذج اللغة أو الوكلاء الذكيون المحتوى في نفس المجلد عند تعديل المكون، مما يمنح دقة أعلى بكثير. انظر [كيف يعمل Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/how_works_intlayer.md).

</Question>

<Question title="كيف أترجم تطبيقي تلقائياً بالذكاء الاصطناعي؟">

قم بتشغيل `npx intlayer fill`. تكتشف واجهة CLI الترجمات المفقودة وتملؤها باستخدام نموذج اللغة الذي تختاره مع مزودك ومفتاح API الخاص بك. يحد الخيار `--git-diff` العملية على المحتوى المعدل في الفرع الحالي فقط. انظر [أمر fill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/cli/fill.md) و [تكامل CI/CD](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/CI_CD.md).

</Question>

<Question title="كيف أجد الترجمات المفقودة؟">

قم بتشغيل `npx intlayer test`. يفشل هذا الأمر إذا كانت أي لغة معلنة تفتقر إلى محتوى، مما يضمن عدم وصول سلاسل غير مترجمة إلى الإنتاج. يوضح امتداد VS Code هذه الأخطاء مباشرة في المحرر، وتضع مكونة ESLint علامة على السلاسل النصية غير المغلفة. انظر [اختبار المحتوى](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/testing.md).

</Question>

<Question title="هل يجب علي تضمين اللغة في عنوان URL؟">

لا. يقبل `routing.mode` القيم `"prefix-no-default"` (الافتراضية: `/about` و `/ar/about`)، و `"prefix-all"`، و `"no-prefix"`، و `"search-params"`، ويعين `routing.domains` اللغات لنطاقات مخصصة. بغض النظر عن المخطط المختار، ينشئ `getMultilingualUrls` روابط `hreflang` بديلة للبيانات الوصفية وخرائط المواقع. انظر [مرجع الإعدادات](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/configuration.md).

</Question>

<Question title="كيف يمكن للمترجمين ومحرري المحتوى العمل دون لمس الكود؟">

يعمل المحرر المرئي على بنيتك التحتية ويسمح لأي شخص بالنقر فوق النص على الموقع المباشر لتحريره، مع حفظ التغييرات مباشرة في الكود. يفصل نظام CMS المحتوى لتحديثه دون الحاجة لإعادة النشر. انظر [المحرر المرئي](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_visual_editor.md) و [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_CMS.md).

</Question>

<Question title="هل Intlayer مفتوح المصدر ومجاني؟">

نعم. Intlayer مفتوح المصدر بموجب ترخيص Apache 2.0؛ المكتبة، و CLI، والمترجم، والمحرر المرئي مجانية تمامًا للاستخدام التجاري. الـ CMS السحابي هو خدمة مدفوعة اختيارية يمكن أيضًا [استضافتها ذاتيًا](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/self_hosting.md).

</Question>

</FAQ>
