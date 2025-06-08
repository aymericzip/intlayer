# التدويل باستخدام Intlayer و i18next

i18next هو إطار عمل مفتوح المصدر للتدويل (i18n) مصمم لتطبيقات JavaScript. ويستخدم على نطاق واسع لإدارة الترجمات، والتوطين، وتبديل اللغة في مشاريع البرمجيات. ومع ذلك، لديه بعض القيود التي يمكن أن تعقد القابلية للتوسع والتنمية.

Intlayer هو إطار عمل آخر للتدويل يعالج هذه القيود، مما يوفر نهجًا أكثر مرونة لتصريح المحتوى وإدارته. دعونا نستعرض بعض الفروقات الرئيسية بين i18next و Intlayer، وكيفية تكوين كلاهما لتحقيق أفضل تدويل.

## Intlayer مقابل i18next: الفروقات الرئيسية

### 1. تصريح المحتوى

مع i18next، يجب أن يتم التصريح عن قواميس الترجمات في مجلد محدد، مما يمكن أن يعقد من قابلية تطبيقك للتوسع. في المقابل، يتيح Intlayer التصريح عن المحتوى داخل نفس الدليل كما هو في المكون الخاص بك. وهذا له عدة مزايا:

- **تحرير محتوى مبسط**: لا يحتاج المستخدمون للبحث عن القاموس الصحيح للتحرير، مما يقلل من فرصة حدوث أخطاء.
- **التكيف التلقائي**: إذا تغير مكان المكون أو تم إزالته، يكتشف Intlayer ذلك ويتكيف تلقائيًا.

### 2. تعقيد التكوين

يمكن أن يكون تكوين i18next معقدًا، خاصة عند التكامل مع المكونات الجانبية للخادم أو تكوين middleware لإطارات العمل مثل Next.js. يبسط Intlayer هذه العملية، مما يوفر تكوينًا أكثر بساطة.

### 3. اتساق قواميس الترجمات

يمكن أن يكون ضمان اتساق قواميس الترجمات عبر لغات مختلفة تحديًا مع i18next. يمكن أن تؤدي هذه الفجوة إلى تعطل التطبيق إذا لم يتم التعامل معها بشكل صحيح. يعالج Intlayer هذا من خلال فرض قيود على المحتوى المترجم، مما يضمن عدم فقدان أي ترجمة وأن المحتوى المترجم دقيق.

### 4. تكامل TypeScript

يقدم Intlayer تكاملًا أفضل مع TypeScript، مما يسمح بالاقتراحات التلقائية للمحتوى في الكود الخاص بك، وبالتالي يعزز كفاءة التطوير.

### 5. مشاركة المحتوى عبر التطبيقات

يسهل Intlayer مشاركة ملفات تصريح المحتوى عبر تطبيقات متعددة ومكتبات مشتركة. تجعل هذه الميزة من السهل الحفاظ على ترجمات متسقة عبر قاعدة شفرة أكبر.

## كيفية إنشاء قواميس i18next باستخدام Intlayer

### تكوين Intlayer لتصدير قواميس i18next

> ملاحظات مهمة

> تصدير قواميس i18next حاليًا في النسخة التجريبية ولا يضمن توافق 1: 1 مع أطر العمل الأخرى. يُنصح بالالتزام بتكوين يعتمد على Intlayer لتقليل المشاكل.

لتصدير قواميس i18next، تحتاج إلى تكوين Intlayer بشكل مناسب. فيما يلي مثال على كيفية إعداد Intlayer لتصدير كل من قواميس Intlayer و i18next.

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  content: {
    // الإشارة إلى أن Intlayer سيصدر كل من قواميس Intlayer و i18next
    dictionaryOutput: ["intlayer", "i18next"],
    // المسار النسبي من جذر المشروع إلى الدليل الذي ستصدر فيه قواميس i18n
    i18nextResourcesDir: "./i18next/dictionaries",
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  content: {
    // الإشارة إلى أن Intlayer سيصدر كل من قواميس Intlayer و i18next
    dictionaryOutput: ["intlayer", "i18next"],
    // المسار النسبي من جذر المشروع إلى الدليل الذي ستصدر فيه قواميس i18n
    i18nextResourcesDir: "./i18next/dictionaries",
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  content: {
    // الإشارة إلى أن Intlayer سيصدر كل من قواميس Intlayer و i18next
    dictionaryOutput: ["intlayer", "i18next"],
    // المسار النسبي من جذر المشروع إلى الدليل الذي ستصدر فيه قواميس i18n
    i18nextResourcesDir: "./i18next/dictionaries",
  },
};

module.exports = config;
```

من خلال تضمين 'i18next' في التكوين، يقوم Intlayer بإنشاء قواميس i18next مخصصة بالإضافة إلى قواميس Intlayer. لاحظ أن إزالة 'intlayer' من التكوين قد تكسر التوافق مع React-Intlayer أو Next-Intlayer.

### استيراد القواميس في تكوين i18next الخاص بك

لاستيراد القواميس المنشأة في تكوين i18next الخاص بك، يمكنك استخدام 'i18next-resources-to-backend'. إليك مثال لكيفية استيراد قواميس i18next الخاصة بك:

```typescript fileName="i18n/client.ts" codeFormat="typescript"
// i18n/client.ts

import i18next from "i18next";
import resourcesToBackend from "i18next-resources-to-backend";

i18next
  // تكوين i18next الخاص بك
  .use(
    resourcesToBackend(
      (language: string, namespace: string) =>
        import(`../i18next/dictionaries/${language}/${namespace}.json`)
    )
  );
```

```javascript fileName="i18n/client.mjs" codeFormat="esm"
// i18n/client.mjs

import i18next from "i18next";
import resourcesToBackend from "i18next-resources-to-backend";

i18next
  // تكوين i18next الخاص بك
  .use(
    resourcesToBackend(
      (language, namespace) =>
        import(`../i18next/dictionaries/${language}/${namespace}.json`)
    )
  );
```

```javascript fileName="i18n/client.cjs" codeFormat="commonjs"
// i18n/client.cjs

const i18next = require("i18next");
const resourcesToBackend = require("i18next-resources-to-backend");

i18next
  // تكوين i18next الخاص بك
  .use(
    resourcesToBackend(
      (language, namespace) =>
        import(`../i18next/dictionaries/${language}/${namespace}.json`)
    )
  );
```
