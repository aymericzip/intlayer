# كيف يعمل Intlayer

## نظرة عامة

دور Intlayer هو تفسير ملفات إعلان محتوى JavaScript إلى قواميس.

لهذا، يمر Intlayer بعدة خطوات:

1. إعلان ملفات المحتوى

   - يمكن تعريف ملفات المحتوى بتنسيقات مختلفة، مثل TypeScript، ECMAScript، CommonJS، أو JSON.
   - يمكن تعريف ملفات المحتوى في أي مكان في المشروع، مما يسمح بصيانة وقابلية التوسع بشكل أفضل. من المهم احترام اتفاقيات امتداد الملفات لملفات المحتوى. هذا الامتداد هو افتراضيًا `*.content.{js|cjs|mjs|ts|tsx|json}`، ولكن يمكن تعديله في [ملف التكوين](https://github.com/aymericzip/intlayer/blob/main/docs/ar/configuration.md).

2. إنشاء القواميس

   - يتم إنشاء القواميس من ملفات المحتوى. افتراضيًا، يتم إنشاء قواميس intlayer في دليل `.intlayer/dictionary` الخاص بالمشروع.
   - يمكن إنشاء نوعين من القواميس: قواميس intlayer وقواميس i18n (بيتا).

3. إنشاء أنواع القواميس

   - يتم إنشاء أنواع القواميس من قواميس intlayer. افتراضيًا، يتم إنشاء أنواع قواميس intlayer في دليل `types` الخاص بالمشروع.

4. إنشاء تعزيز وحدة Intlayer

   - [تعزيز وحدة Intlayer](https://www.typescriptlang.org/docs/handbook/declaration-merging.html) هو ميزة TypeScript تتيح لك تعريف أنواع إضافية لـ Intlayer. هذا يجعل تجربة التطوير أسهل من خلال اقتراح الوسائط المتاحة أو الوسائط المطلوبة.
     من بين الأنواع التي تم إنشاؤها، يتم إضافة أنواع قواميس intlayer أو حتى أنواع تكوين اللغة إلى ملف `types/intlayer.d.ts`، وتستخدمها الحزم الأخرى. للقيام بذلك، من الضروري أن يتم تكوين ملف `tsconfig.json` لتضمين دليل `types` الخاص بالمشروع.

5. مراقبة ملفات المحتوى

   - يتم مراقبة ملفات المحتوى ليتم إعادة إنشائها في كل مرة يتم تعديلها.

6. تفسير القواميس
   - يتم تفسير القواميس أخيرًا لاستخدامها في التطبيقات.

## الحزم

يتكون Intlayer من عدة حزم، كل منها له دور محدد في عملية الترجمة. فيما يلي تمثيل رسومي لهيكل هذه الحزمة:

![حزم intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/assets/packages_dependency_graph.svg)

### intlayer

تُستخدم حزمة `intlayer` في التطبيقات لإعلان المحتوى في ملفات المحتوى.

### react-intlayer

تُستخدم حزمة `react-intlayer` لتفسير قواميس intlayer وجعلها قابلة للاستخدام في تطبيقات React.

### next-intlayer

تُستخدم حزمة `next-intlayer` كطبقة فوق `react-intlayer` لجعل قواميس intlayer قابلة للاستخدام في تطبيقات Next.js. يتضمن ميزات أساسية لجعل Intlayer يعمل في بيئة Next.js، مثل وسيط الترجمة، التوجيه، أو تكوين ملف `next.config.js`.

### vite-intlayer

تشمل مكون Vite لإدماج Intlayer مع [Vite bundler](https://vite.dev/guide/why.html#why-bundle-for-production)، بالإضافة إلى وسيط لاكتشاف اللغة المفضلة للمستخدم، وإدارة الكوكيز، ومعالجة إعادة توجيه URL.

### react-scripts-intlayer

تشمل أوامر ومكونات `react-scripts-intlayer` لإدماج Intlayer مع تطبيقات Create React App. تعتمد هذه المكونات على [craco](https://craco.js.org/) وتشمل تكوينًا إضافيًا لـ [Webpack](https://webpack.js.org/).

### intlayer-editor

تُستخدم حزمة `intlayer-editor` للسماح باستخدام المحرر المرئي. هذه الحزمة اختيارية ويمكن تثبيتها في التطبيقات وستُستخدم بواسطة حزمة `react-intlayer`.
تتكون من جزئين: الخادم والعميل.

يحتوي العميل على عناصر واجهة المستخدم التي ستُستخدم بواسطة `react-intlayer`.

الخادم، المستند إلى Express، يُستخدم لتلقي طلبات المحرر المرئية وإدارة أو تعديل ملفات المحتوى.

### intlayer-cli

يمكن استخدام حزمة `intlayer-cli` لإنشاء القواميس باستخدام الأمر `npx intlayer build`. إذا تم تثبيت `intlayer` بالفعل، يتم تثبيت cli تلقائيًا وهذه الحزمة ليست ضرورية.

### @intlayer/core

حزمة `@intlayer/core` هي الحزمة الرئيسية لـ Intlayer. تحتوي على وظائف الترجمة وإدارة القواميس. `@intlayer/core` متعددة المنصات وتُستخدم من قبل الحزم الأخرى لتنفيذ تفسير القواميس.

### @intlayer/config

تُستخدم حزمة `@intlayer/config` لتكوين إعدادات Intlayer، مثل اللغات المتاحة، معلمات وسيط Next.js أو إعدادات المحرر المدمج.

### @intlayer/webpack

تُستخدم حزمة `@intlayer/webpack` لتوفير تكوين Webpack لجعل تطبيق يعتمد على Webpack يعمل مع Intlayer. توفر الحزمة أيضًا مكونًا إضافيًا لإضافته إلى تطبيق Webpack موجود.

### @intlayer/cli

حزمة `@intlayer/cli` هي حزمة NPM تُستخدم لإعلان السكربتات المتعلقة بواجهات أوامر intlayer. تضمن توحيد جميع أوامر CLI الخاصة بـ intlayer. يتم استهلاك هذه الحزمة بشكل خاص من قبل [intlayer-cli](https://github.com/aymericzip/intlayer/tree/main/docs/ar/packages/intlayer-cli/index.md)، و [intlayer](https://github.com/aymericzip/intlayer/tree/main/docs/ar/packages/intlayer/index.md).

### @intlayer/dictionaries-entry

حزمة `@intlayer/dictionaries-entry` هي حزمة تُرجع فقط مسار الإدخال لقواميس intlayer. نظرًا لأن البحث في نظام الملفات غير ممكن من المتصفح، فإن استخدام أدوات التجميع مثل Webpack أو Rollup لاسترداد مسار الإدخال للقواميس غير ممكن. تهدف هذه الحزمة إلى أن تكون مستبدلة.

### @intlayer/chokidar

تُستخدم حزمة `@intlayer/chokidar` لمراقبة ملفات المحتوى وإعادة إنشاء القاموس المعدل عند كل تعديل.

### @intlayer/editor

توفر حزمة `@intlayer/editor` الأدوات المتعلقة بمحرر القواميس. تشمل بشكل خاص API لربط تطبيق مع محرر Intlayer، وأدوات للتعامل مع القواميس. هذه الحزمة متعددة المنصات.

### @intlayer/editor-react

توفر حزمة `@intlayer/editor-react` حالات، وسياقات، وخطافات، ومكونات لربط تطبيق React مع محرر Intlayer.

## الدردشة مع وثائقنا الذكية

- [اطرح أسئلتك على وثائقنا الذكية](https://intlayer.org/ar/docs/chat)
