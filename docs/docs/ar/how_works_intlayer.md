---
createdAt: 2024-08-12
updatedAt: 2025-06-29
title: كيف يعمل Intlayer
description: تعلم كيف يعمل Intlayer داخليًا. افهم البنية والمكونات التي تجعل Intlayer قويًا.
keywords:
  - Intlayer
  - كيف يعمل
  - الهندسة المعمارية
  - المكونات
  - العمليات الداخلية
slugs:
  - doc
  - concept
  - how-works-intlayer
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: بدء التاريخ
---

# كيف يعمل Intlayer

## نظرة عامة

الفكرة الرئيسية وراء Intlayer هي تبني إدارة المحتوى لكل مكون على حدة. لذا الفكرة وراء Intlayer هي السماح لك بإعلان المحتوى الخاص بك في أي مكان في قاعدة الكود الخاصة بك، كما في نفس الدليل مثل المكون الخاص بك.

```bash
.
└── Components
    └── MyComponent
        ├── index.content.ts
        └── index.tsx
```

للقيام بذلك، دور Intlayer هو العثور على جميع `ملفات إعلان المحتوى`، بجميع التنسيقات المختلفة الموجودة في مشروعك، ثم سيقوم بإنشاء `القواميس` منها.

لذا هناك خطوتان رئيسيتان:

- خطوة البناء
- خطوة التفسير

### خطوة بناء القواميس

يمكن تنفيذ خطوة البناء بثلاث طرق:

- باستخدام CLI مع `npx intlayer build`
- باستخدام [إضافة VSCode](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/vs_code_extension.md)
- باستخدام إضافات التطبيقات مثل حزمة [`vite-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/vite-intlayer/index.md)، أو ما يعادلها لـ [Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/next-intlayer/index.md). عند استخدامك لإحدى هذه الإضافات، سيقوم Intlayer تلقائيًا ببناء القواميس عند بدء (التطوير) أو بناء (الإنتاج) تطبيقك.

1. إعلان ملفات المحتوى
   - يمكن تعريف ملفات المحتوى بتنسيقات مختلفة، مثل TypeScript، ECMAScript، CommonJS، أو JSON.
   - يمكن تعريف ملفات المحتوى في أي مكان في المشروع، مما يسمح بصيانة أفضل وقابلية للتوسع. من المهم احترام قواعد امتداد الملفات لملفات المحتوى. هذا الامتداد هو افتراضيًا `*.content.{js|cjs|mjs|ts|tsx|json}`، ولكن يمكن تعديله في [ملف التكوين](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/configuration.md).

2. إنشاء `القواميس`
   - يتم إنشاء القواميس من ملفات المحتوى. افتراضيًا، يتم إنشاء قواميس Intlayer في دليل `.intlayer/dictionaries` الخاص بالمشروع.
   - يتم إنشاء هذه القواميس بتنسيقات مختلفة لتلبية جميع الاحتياجات وتحسين أداء التطبيق.

3. إنشاء أنواع القواميس
   بناءً على `القواميس` الخاصة بك، سيقوم Intlayer بإنشاء أنواع لجعلها قابلة للاستخدام في تطبيقك.

- يتم إنشاء أنواع القواميس من `ملفات إعلان المحتوى` الخاصة بـ Intlayer. افتراضيًا، يتم إنشاء أنواع القواميس الخاصة بـ Intlayer في دليل `.intlayer/types` الخاص بالمشروع.

- [توسيع الوحدة](https://www.typescriptlang.org/docs/handbook/declaration-merging.html) الخاص بـ Intlayer هو ميزة في TypeScript تتيح لك تعريف أنواع إضافية لـ Intlayer. هذا يجعل تجربة التطوير أسهل من خلال اقتراح الوسائط المتاحة أو الوسائط المطلوبة.
  من بين الأنواع التي يتم إنشاؤها، يتم إضافة أنواع القواميس الخاصة بـ Intlayer أو حتى أنواع تكوين اللغة إلى ملف `types/intlayer.d.ts`، وتستخدمها الحزم الأخرى. للقيام بذلك، من الضروري أن يتم تكوين ملف `tsconfig.json` لتضمين دليل `types` الخاص بالمشروع.

### خطوة تفسير القواميس

باستخدام Intlayer، ستتمكن من الوصول إلى المحتوى الخاص بك في تطبيقك باستخدام الخطاف `useIntlayer`.

```tsx
const MyComponent = () => {
  const content = useIntlayer("my-component");
  return <div>{content.title}</div>;
};
```

سيقوم هذا الخطاف بإدارة اكتشاف اللغة المحلية نيابة عنك وسيعيد المحتوى للغة المحلية الحالية. باستخدام هذا الخطاف، ستتمكن أيضًا من تفسير Markdown، إدارة الجمع، والمزيد.

> لرؤية جميع ميزات Intlayer، يمكنك قراءة [وثائق القواميس](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dictionary/get_started.md).

## المحتوى البعيد

يسمح لك Intlayer بإعلان المحتوى محليًا، ثم تصديره إلى نظام إدارة المحتوى (CMS) لجعله قابلاً للتعديل من قبل فريقك غير التقني.

لذا ستتمكن من دفع وسحب المحتوى من نظام إدارة المحتوى إلى تطبيقك، بطريقة مشابهة لما تفعله مع Git للكود الخاص بك.

بالنسبة للقواميس الخارجية التي تستخدم نظام إدارة المحتوى، يقوم Intlayer بعملية جلب أساسية لاسترجاع القواميس البعيدة ودمجها مع القواميس المحلية الخاصة بك. إذا تم تكوينه في مشروعك، سيقوم Intlayer تلقائيًا بإدارة جلب المحتوى من نظام إدارة المحتوى عند بدء التطبيق (التطوير) / البناء (الإنتاج).

## المحرر المرئي

يوفر Intlayer أيضًا محررًا مرئيًا يتيح لك تعديل المحتوى الخاص بك بطريقة مرئية. هذا [المحرر المرئي](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_visual_editor.md) متاح في الحزمة الخارجية `intlayer-editor`.

![المحرر المرئي](https://github.com/aymericzip/intlayer/blob/main/docs/assets/visual_editor.gif?raw=true)

- الخادم هو تطبيق Express بسيط يستمع إلى الطلبات من العميل ويسترجع محتوى تطبيقك، مثل `dictionaries` والتكوين لجعله متاحًا على جانب العميل.
- من ناحية أخرى، العميل هو تطبيق React يُستخدم للتفاعل مع المحتوى الخاص بك باستخدام واجهة مرئية.
  عندما تستدعي المحتوى الخاص بك باستخدام `useIntlayer` ويكون المحرر مفعّلًا، فإنه يلف تلقائيًا سلاسل النصوص الخاصة بك بكائن Proxy يُسمى `IntlayerNode`. يستخدم هذا الكائن `window.postMessage` للتواصل مع iframe مغلف يحتوي على واجهة المحرر المرئي.
  على جانب المحرر، يستمع المحرر إلى هذه الرسائل ويُحاكي التفاعل الحقيقي مع المحتوى الخاص بك، مما يتيح لك تحرير النص مباشرة في سياق تطبيقك.

## تحسين بناء التطبيق

لتحسين حجم الحزمة لتطبيقك، يوفر Intlayer مكونين إضافيين لتحسين بناء تطبيقك: مكونات `@intlayer/babel` و `@intlayer/swc`.
تعمل مكونات Babel و SWC عن طريق تحليل شجرة بناء الجملة المجردة (AST) لتطبيقك لاستبدال استدعاءات دوال Intlayer بكود محسن. تجعل هذه العملية الحزمة النهائية أخف في الإنتاج من خلال التأكد من استيراد القواميس المستخدمة فقط، مما يحسن تقسيم الحزم ويقلل من حجم الحزمة.

في وضع التطوير، يستخدم Intlayer استيرادًا ثابتًا مركزيًا للقواميس لتبسيط تجربة التطوير.

بتفعيل الخيار `importMode = "dynamic"` في [التكوين](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/configuration.md)، سيستخدم Intlayer الاستيراد الديناميكي لتحميل القواميس. هذا الخيار معطل افتراضيًا لتجنب المعالجة غير المتزامنة عند عرض التطبيق.

> `@intlayer/babel` متاح افتراضيًا في حزمة `vite-intlayer`،

> `@intlayer/swc` غير مثبت افتراضيًا في حزمة `next-intlayer` حيث أن مكونات SWC لا تزال تجريبية في Next.js.

لرؤية كيفية تكوين بناء تطبيقك، يمكنك قراءة [وثائق التكوين](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/configuration.md).

## الحزم

يتكون Intlayer من عدة حزم، كل منها له دور محدد في عملية الترجمة. فيما يلي تمثيل رسومي لهيكل هذه الحزمة:

![حزم Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/assets/packages_dependency_graph.svg)

### intlayer

تُستخدم حزمة `intlayer` في التطبيقات لإعلان المحتوى في ملفات المحتوى.

### react-intlayer

تُستخدم حزمة `react-intlayer` لتفسير قواميس Intlayer وجعلها قابلة للاستخدام في تطبيقات React.

### next-intlayer

تُستخدم حزمة `next-intlayer` كطبقة فوق `react-intlayer` لجعل قواميس Intlayer قابلة للاستخدام في تطبيقات Next.js. تتكامل مع الميزات الأساسية لجعل Intlayer يعمل في بيئة Next.js، مثل الوسيطات الخاصة بالترجمة، التوجيه، أو تكوين ملف `next.config.js`.

### vue-intlayer

تُستخدم حزمة `vue-intlayer` لتفسير قواميس Intlayer وجعلها قابلة للاستخدام في تطبيقات Vue.

### nuxt-intlayer

تُستخدم حزمة `nuxt-intlayer` كوحدة Nuxt لجعل قواميس Intlayer قابلة للاستخدام في تطبيقات Nuxt. تدمج ميزات أساسية لجعل Intlayer يعمل في بيئة Nuxt، مثل وسيط الترجمة، التوجيه، أو تكوين ملف `nuxt.config.js`.

### svelte-intlayer (قيد العمل)

تُستخدم حزمة `svelte-intlayer` لتفسير قواميس Intlayer وجعلها قابلة للاستخدام في تطبيقات Svelte.

### solid-intlayer (قيد العمل)

تُستخدم حزمة `solid-intlayer` لتفسير قواميس Intlayer وجعلها قابلة للاستخدام في تطبيقات Solid.js.

### preact-intlayer

تُستخدم حزمة `preact-intlayer` لتفسير قواميس Intlayer وجعلها قابلة للاستخدام في تطبيقات Preact.

### angular-intlayer (قيد العمل)

تُستخدم حزمة `angular-intlayer` لتفسير قواميس Intlayer وجعلها قابلة للاستخدام في تطبيقات Angular.

### express-intlayer

تُستخدم حزمة `express-intlayer` لاستخدام Intlayer على واجهة خلفية Express.js.

### react-native-intlayer

توفر حزمة `react-native-intlayer` أدوات تتكامل مع مكونات إضافية لـ Intlayer للعمل مع Metro bundler.

### lynx-intlayer

توفر حزمة `lynx-intlayer` أدوات تتكامل مع مكونات إضافية لـ Intlayer للعمل مع Lynx bundler.

### vite-intlayer

تشمل مكون Vite الإضافي لتكامل Intlayer مع [Vite bundler](https://vite.dev/guide/why.html#why-bundle-for-production)، بالإضافة إلى الوسيطات لاكتشاف اللغة المفضلة للمستخدم، إدارة الكوكيز، ومعالجة إعادة توجيه الروابط.

### react-scripts-intlayer

تتضمن أوامر ومكونات `react-scripts-intlayer` الإضافية لتكامل Intlayer مع التطبيقات المستندة إلى Create React App. هذه المكونات الإضافية مبنية على [craco](https://craco.js.org/) وتشمل تكوينًا إضافيًا لأداة التجميع [Webpack](https://webpack.js.org/).

### intlayer-editor

تُستخدم حزمة `intlayer-editor` للسماح باستخدام المحرر المرئي. هذه الحزمة اختيارية ويمكن تثبيتها في التطبيقات وسيتم استخدامها بواسطة حزمة `react-intlayer`.  
تتكون من جزئين: الخادم والعميل.

يحتوي العميل على عناصر واجهة المستخدم التي سيتم استخدامها بواسطة `react-intlayer`.

الخادم، المستند إلى Express، يُستخدم لاستقبال طلبات المحرر المرئي وإدارة أو تعديل ملفات المحتوى.

### intlayer-cli

يمكن استخدام حزمة `intlayer-cli` لإنشاء القواميس باستخدام الأمر `npx intlayer dictionaries build`. إذا تم تثبيت `intlayer` بالفعل، يتم تثبيت CLI تلقائيًا وهذه الحزمة ليست ضرورية.

### @intlayer/core

حزمة `@intlayer/core` هي الحزمة الرئيسية لـ Intlayer. تحتوي على وظائف إدارة الترجمة والقواميس. `@intlayer/core` متعددة المنصات وتُستخدم من قبل حزم أخرى لتنفيذ تفسير القواميس.

### @intlayer/config

تُستخدم حزمة `@intlayer/config` لتكوين إعدادات Intlayer، مثل اللغات المتاحة، معلمات الوسيط لـ Next.js، أو إعدادات المحرر المتكامل.

### @intlayer/webpack

تُستخدم حزمة `@intlayer/webpack` لتوفير إعدادات Webpack لجعل تطبيق يعتمد على Webpack يعمل مع Intlayer. كما توفر الحزمة مكونًا إضافيًا لإضافته إلى تطبيق Webpack موجود.

### @intlayer/cli

حزمة `@intlayer/cli` هي حزمة NPM تُستخدم لإعلان السكربتات المتعلقة بواجهات سطر الأوامر الخاصة بـ Intlayer. تضمن توحيد جميع أوامر CLI الخاصة بـ Intlayer. يتم استهلاك هذه الحزمة بشكل خاص من قبل حزم [intlayer-cli](https://github.com/aymericzip/intlayer/tree/main/docs/ar/packages/intlayer-cli/index.md)، و[intlayer](https://github.com/aymericzip/intlayer/tree/main/docs/ar/packages/intlayer/index.md).

### @intlayer/mcp

تُوفر حزمة `@intlayer/mcp` خادم MCP (بروتوكول سياق النموذج) الذي يقدم مساعدة IDE مدعومة بالذكاء الاصطناعي مصممة خصيصًا لنظام Intlayer البيئي. يقوم بتحميل الوثائق تلقائيًا ويتكامل مع واجهة سطر الأوامر Intlayer CLI.

### @intlayer/dictionaries-entry & @intlayer/unmerged-dictionaries-entry & @intlayer/dynamic-dictionaries-entry

تُعيد حزم `@intlayer/dictionaries-entry` و `@intlayer/unmerged-dictionaries-entry` و `@intlayer/dynamic-dictionaries-entry` مسار الدخول لقواميس Intlayer. نظرًا لأن البحث في نظام الملفات من المتصفح مستحيل، فإن استخدام أدوات التجميع مثل Webpack أو Rollup لاسترجاع مسار الدخول للقواميس غير ممكن. تم تصميم هذه الحزم لتكون قابلة للاختصار (aliased)، مما يسمح بتحسين التجميع عبر أدوات تجميع مختلفة مثل Vite وWebpack وTurbopack.

### @intlayer/chokidar

تُستخدم حزمة `@intlayer/chokidar` لمراقبة ملفات المحتوى وإعادة توليد القاموس المعدل عند كل تعديل.

### @intlayer/editor

تُوفر حزمة `@intlayer/editor` الأدوات المتعلقة بمحرر القواميس. وتشمل بشكل خاص واجهة برمجة التطبيقات (API) لربط التطبيق بمحرر Intlayer، وأدوات لمعالجة القواميس. هذه الحزمة متعددة المنصات.

### @intlayer/editor-react

تُوفر حزمة `@intlayer/editor-react` الحالات، والسياقات، والهوكس، والمكونات لربط تطبيق React بمحرر Intlayer.

### @intlayer/babel

تُوفر حزمة `@intlayer/babel` أدوات لتحسين تجميع القواميس لتطبيقات تعتمد على Vite وWebpack.

### @intlayer/swc (قيد العمل)

تُوفر حزمة `@intlayer/swc` أدوات لتحسين تجميع القواميس لتطبيقات Next.js.

### @intlayer/api

حزمة `@intlayer/api` هي SDK API للتفاعل مع الخلفية.

### @intlayer/design-system

تُستخدم حزمة `@intlayer/design-system` لمشاركة عناصر التصميم بين نظام إدارة المحتوى والمحرر المرئي.

### @intlayer/backend

تُصدر حزمة `@intlayer/backend` أنواع الخلفية وستقدم في المستقبل الخلفية كحزمة مستقلة.

## تحدث مع وثائقنا الذكية

- [اطرح أسئلتك على وثائقنا الذكية](https://intlayer.org/doc/chat)
