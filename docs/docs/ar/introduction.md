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

يؤدي تحديد الموقع المشترك للمحتوى إلى **تقليل السياق المطلوب** بواسطة نماذج اللغة الكبيرة (LLMs). تأتي Intlayer أيضًا مع مجموعة من الأدوات، مثل **CLI** لاختبار الترجمات المفقودة، و **[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/lsp.md)**، و **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/mcp_server.md)**، و **[مهارات الوكيل (agent skills)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/agent_skills.md)**، لجعل تجربة المطور (DX) أكثر سلاسة لوكلاء الذكاء الاصطناعي.

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
