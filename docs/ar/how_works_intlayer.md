# كيف تعمل Intlayer

## نظرة عامة

دور Intlayer هو تفسير ملفات إعلان محتوى JavaScript إلى قواميس.

لذلك، تمر Intlayer بعدة خطوات:

1. إعلان ملفات المحتوى

   - يمكن تعريف ملفات المحتوى بتنسيقات مختلفة، مثل TypeScript، ECMAScript، CommonJS، أو JSON.
   - يمكن تعريف ملفات المحتوى في أي مكان في المشروع، مما يسمح بتحسين الصيانة وقابلية التوسع. من المهم احترام تقاليد امتدادات الملفات لملفات المحتوى. هذه الإضافة هي بشكل افتراضي `*.content.{js|cjs|mjs|ts|tsx|json}`، ولكن يمكن تعديلها في [ملف التكوين](https://github.com/aymericzip/intlayer/blob/main/docs/ar/configuration.md).

2. إنتاج القواميس

   - يتم إنتاج القواميس من ملفات المحتوى. بشكل افتراضي، يتم إنتاج قواميس intlayer في دليل `.intlayer/dictionary` من المشروع.
   - يمكن إنتاج نوعين من القواميس: قواميس intlayer وقواميس i18n (بيتا).

3. إنتاج أنواع القواميس

   - يتم إنتاج أنواع القواميس من قواميس intlayer. بشكل افتراضي، يتم إنتاج أنواع قواميس intlayer في دليل `types` من المشروع.

4. إنتاج تعزيز وحدة Intlayer

   - [تعزيز وحدة Intlayer](https://www.typescriptlang.org/docs/handbook/declaration-merging.html) هو ميزة في TypeScript تتيح لك تعريف أنواع إضافية لـ Intlayer. ويجعل ذلك تجربة التطوير أسهل من خلال اقتراح الحجج المتاحة أو الحجج المطلوبة.
     من بين الأنواع المنتجة، يتم إضافة أنواع قواميس intlayer أو حتى أنواع تكوين اللغة إلى ملف `types/intlayer.d.ts`، وتستخدم من قبل حزم أخرى. للقيام بذلك، من الضروري أن يكون ملف `tsconfig.json` مكونًا لتضمين دليل` types` من المشروع.

5. مراقبة ملفات المحتوى

   - يتم مراقبة ملفات المحتوى ليتم إعادة إنتاجها في كل مرة يتم تعديلها.

6. تفسير القواميس
   - يتم تفسير القواميس في النهاية لاستخدامها في التطبيقات.

## الحزم

تتكون Intlayer من عدة حزم، كل منها له دور محدد في عملية الترجمة. إليك تمثيل رسومي لبنية هذه الحزمة:

![حزم intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/assets/packages_dependency_graph.svg)

### intlayer

تُستخدم حزمة `intlayer` في التطبيقات للإعلان عن المحتوى في ملفات المحتوى.

### react-intlayer

تُستخدم حزمة `react-intlayer` لتفسير قواميس intlayer وجعلها قابلة للاستخدام في تطبيقات React.

### next-intlayer

تُستخدم حزمة `next-intlayer` كطبقة فوق `react-intlayer` لجعل قواميس intlayer قابلة للاستخدام في تطبيقات Next.js. يدمج ميزات أساسية لجعل Intlayer يعمل في بيئة Next.js، مثل برنامج ترجمة الوساطة، والتوجيه، أو تكوين ملف `next.config.js`.

### vite-intlayer

يتضمن إضافة Vite لدمج Intlayer مع [تجميع Vite](https://vite.dev/guide/why.html#why-bundle-for-production)، بالإضافة إلى الوسيط لاكتشاف اللغة المفضلة للمستخدم، وإدارة ملفات تعريف الارتباط، والتعامل مع إعادة توجيه عنوان URL.

### react-scripts-intlayer

يتضمن أوامر وملحقات `react-scripts-intlayer` لدمج Intlayer مع تطبيق يعتمد على Create React App. تستند هذه الملحقات إلى [craco](https://craco.js.org/) وتتضمن تكوينًا إضافيًا لتجميع [Webpack](https://webpack.js.org/).

### intlayer-editor

تُستخدم حزمة `intlayer-editor` للسماح باستخدام المحرر المرئي. يمكن تثبيت هذه الحزمة الاختيارية في التطبيقات وستستخدم من قبل حزمة `react-intlayer`.
تتكون من قسمين: الخادم والعميل.

يحتوي العميل على عناصر واجهة المستخدم التي ستستخدمها `react-intlayer`.

يستخدم الخادم، المستند إلى Express، لاستقبال الطلبات المرئية للمحرر وإدارة أو تعديل ملفات المحتوى.

### intlayer-cli

يمكن استخدام حزمة `intlayer-cli` لإنتاج قواميس باستخدام الأمر `npx intlayer build`. إذا كانت حزمة `intlayer` مثبتة بالفعل، يتم تثبيت cli تلقائيًا ولا تكون هذه الحزمة ضرورية.

### @intlayer/core

حزمة `@intlayer/core` هي الحزمة الرئيسية لـ Intlayer. تحتوي على وظائف إدارة الترجمة والقواميس. حزمة `@intlayer/core` متعددة المنصات وتستخدم من قبل حزم أخرى لتنفيذ تفسير القواميس.

### @intlayer/config

تُستخدم حزمة `@intlayer/config` لتكوين إعدادات Intlayer، مثل اللغات المتاحة، ومعلمات الوسيط لـ Next.js أو إعدادات المحرر المدمج.

### @intlayer/webpack

تستخدم حزمة `@intlayer/webpack` لتوفير تكوين Webpack لجعل العمل على تطبيق قائم على Webpack مع Intlayer. توفر الحزمة أيضًا ملحقًا للإضافة إلى تطبيق Webpack موجود.

### @intlayer/cli

تُعتبر حزمة `@intlayer/cli` حزمة NPM تستخدم لإعلان النص المرتبط بواجهات الأوامر الخاصة بـ intlayer. تضمن التناسق لجميع أوامر CLI الخاصة بـ intlayer. يتم استهلاك هذه الحزمة بشكل ملحوظ من قبل [intlayer-cli](https://github.com/aymericzip/intlayer/tree/main/docs/ar/packages/intlayer-cli/index.md)، و [intlayer](https://github.com/aymericzip/intlayer/tree/main/docs/ar/packages/intlayer/index.md) الحزم.

### @intlayer/dictionaries-entry

تُعتبر حزمة `@intlayer/dictionaries-entry` حزمة تعيد فقط مسار إدخال قواميس intlayer. نظرًا لأن البحث في نظام الملفات غير ممكن من المتصفح، فإن استخدام تجميعات مثل Webpack أو Rollup لاسترداد مسار الإدخال للقواميس غير ممكن. تهدف هذه الحزمة إلى أن تُعطى تسميات مستعارة.

### @intlayer/chokidar

تُستخدم حزمة `@intlayer/chokidar` لمراقبة ملفات المحتوى وإعادة إنتاج القاموس المعدل عند كل تعديل.

## التحدث مع وثائقنا الذكية

- [اطرح أسئلتك على وثائقنا الذكية](https://intlayer.org/docs/chat)
