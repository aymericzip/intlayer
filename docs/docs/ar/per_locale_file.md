---
createdAt: 2025-04-18
updatedAt: 2025-06-29
title: إعلان محتوى "لكل لغة" في Intlayer
description: اكتشف كيفية إعلان المحتوى لكل لغة في Intlayer. اتبع الوثائق لفهم التنسيقات المختلفة وحالات الاستخدام.
keywords:
  - التدويل
  - التوثيق
  - Intlayer
  - لكل لغة
  - TypeScript
  - JavaScript
slugs:
  - doc
  - concept
  - per-locale-file
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: بدء التاريخ
---

# إعلان محتوى "لكل لغة" في Intlayer

يدعم Intlayer طريقتين لإعلان المحتوى متعدد اللغات:

- ملف واحد يحتوي على جميع الترجمات
- ملف واحد لكل لغة (تنسيق لكل لغة)

تتيح هذه المرونة:

- سهولة الترحيل من أدوات التدويل الأخرى
- دعم سير عمل الترجمة الآلية
- تنظيم واضح للترجمات في ملفات منفصلة خاصة بكل لغة

## ملف واحد مع ترجمات متعددة

هذا التنسيق مثالي لـ:

- التكرار السريع في الكود.
- التكامل السلس مع نظام إدارة المحتوى (CMS).

هذه هي الطريقة الموصى بها لمعظم حالات الاستخدام. فهو يركز الترجمات في مكان واحد، مما يسهل التكرار والتكامل مع نظام إدارة المحتوى.

```tsx fileName="hello-world.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const helloWorldContent = {
  key: "hello-world",
  content: {
    multilingualContent: t({
      en: "Title of my component",
      es: "Título de mi componente",
    }),
  },
} satisfies Dictionary;

export default helloWorldContent;
```

```js fileName="hello-world.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
// محتوى مرحب بالعالم
const helloWorldContent = {
  key: "hello-world",
  content: {
    multilingualContent: t({
      en: "Title of my component",
      es: "Título de mi componente",
    }),
  },
};

export default helloWorldContent;
```

```js fileName="hello-world.content.cjs" contentDeclarationFormat="json"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
// محتوى مرحب بالعالم
const helloWorldContent = {
  key: "hello-world",
  content: {
    multilingualContent: t({
      en: "Title of my component",
      es: "Título de mi componente",
    }),
  },
};

module.exports = helloWorldContent;
```

```json fileName="hello-world.content.ts" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "hello-world",
  "content": {
    "multilingualContent": {
      "nodeType": "translation",
      "translation": {
        "en": "Title of my component",
        "es": "Título de mi componente"
      }
    }
  }
}
```

> موصى به: هذا التنسيق هو الأفضل عند استخدام محرر Intlayer المرئي أو إدارة الترجمات مباشرة في الكود.

## تنسيق حسب اللغة

هذا التنسيق مفيد عندما:

- تريد إصدار أو تجاوز الترجمات بشكل مستقل.
- تقوم بدمج سير عمل الترجمة الآلية أو البشرية.

يمكنك أيضًا تقسيم الترجمات إلى ملفات لغة فردية عن طريق تحديد حقل اللغة:

```tsx fileName="hello-world.en.content.ts" contentDeclarationFormat="typescript"
import { t, Locales, type Dictionary } from "intlayer";

const helloWorldContent = {
  key: "hello-world",
  locale: Locales.ENGLISH, // مهم
  content: { multilingualContent: "عنوان المكون الخاص بي" },
} satisfies Dictionary;

export default helloWorldContent;
```

```tsx fileName="hello-world.es.content.ts" contentDeclarationFormat="typescript"
import { t, Locales, type Dictionary } from "intlayer";

const helloWorldContent = {
  key: "hello-world",
  locale: Locales.SPANISH, // مهم
  content: { multilingualContent: "Título de mi componente" },
} satisfies Dictionary;

export default helloWorldContent;
```

```js fileName="hello-world.en.content.mjs" contentDeclarationFormat="esm"
import { t, Locales } from "intlayer";

/** @type {import('intlayer').Dictionary} */
// محتوى "مرحبا بالعالم" للغة الإنجليزية
const helloWorldContent = {
  key: "hello-world",
  locale: Locales.ENGLISH, // مهم
  content: { multilingualContent: "عنوان المكون الخاص بي" },
};

export default helloWorldContent;
```

```tsx fileName="hello-world.es.content.mjs" contentDeclarationFormat="esm"
import { t, Locales } from "intlayer";

/** @type {import('intlayer').Dictionary} */
// محتوى "مرحبا بالعالم" للغة الإسبانية
const helloWorldContent = {
  key: "hello-world",
  locale: Locales.SPANISH, // مهم
  content: { multilingualContent: "Título de mi componente" },
};

export default helloWorldContent;
```

```js fileName="hello-world.en.content.cjs" contentDeclarationFormat="commonjs"
const { t, Locales } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
// محتوى "مرحبا بالعالم" للغة الإنجليزية
const helloWorldContent = {
  key: "hello-world",
  locale: Locales.ENGLISH, // مهم
  content: {
    multilingualContent: "عنوان المكون الخاص بي",
  },
};

module.exports = helloWorldContent;
```

```tsx fileName="hello-world.es.content.cjs" contentDeclarationFormat="commonjs"
const { t, Locales } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
// محتوى "مرحبا بالعالم" للغة الإسبانية
const helloWorldContent = {
  key: "hello-world",
  locale: Locales.SPANISH, // مهم
  content: {
    multilingualContent: "Título de mi componente",
  },
};

module.exports = helloWorldContent;
```

```json5 fileName="hello-world.en.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "hello-world",
  "locale": "en", // مهم
  "content": {
    "multilingualContent": "عنوان المكون الخاص بي",
  },
}
```

```json5 fileName="hello-world.es.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "hello-world",
  "locale": "es", // مهم
  "content": {
    "multilingualContent": "Título de mi componente",
  },
}
```

> مهم: تأكد من تعريف حقل locale. فهو يخبر Intlayer باللغة التي يمثلها الملف.

> ملاحظة: في كلتا الحالتين، يجب أن يتبع ملف إعلان المحتوى نمط التسمية `*.content.{ts,tsx,js,jsx,mjs,cjs,json}` ليتم التعرف عليه من قبل Intlayer. اللاحقة `.[locale]` اختيارية وتستخدم فقط كاتفاقية تسمية.

## مزج الصيغ

يمكنك دمج كلا النهجين للإعلان عن نفس مفتاح المحتوى. على سبيل المثال:

- أعلن عن المحتوى الأساسي الخاص بك بشكل ثابت في ملف مثل index.content.ts.
- أضف أو استبدل الترجمات المحددة في ملفات منفصلة مثل index.fr.content.ts أو index.content.json.

هذا الإعداد مفيد بشكل خاص عندما:

- تريد تعريف هيكل المحتوى الأولي في الكود.
- تخطط لإثراء أو إكمال الترجمات لاحقًا باستخدام نظام إدارة المحتوى (CMS) أو الأدوات الآلية.

```bash codeFormat="typescript"
.
└── Components
    └── MyComponent
        ├── index.content.ts
        ├── index.content.json
        └── index.ts
```

### مثال

هنا ملف إعلان محتوى متعدد اللغات:

```tsx fileName="Components/MyComponent/index.content.ts"
import { t, type Dictionary } from "intlayer";

const helloWorldContent = {
  key: "hello-world",
  locale: Locales.ENGLISH,
  content: {
    multilingualContent: "عنوان المكون الخاص بي",
    projectName: "مشروعي",
  },
} satisfies Dictionary;

export default helloWorldContent;
```

```json fileName="Components/MyComponent/index.content.json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "hello-world",
  "content": {
    "multilingualContent": {
      "nodeType": "translation",
      "translation": {
        "fr": "Titre de mon composant",
        "es": "Título de mi componente"
      }
    }
  }
}
```

يقوم Intlayer بدمج الملفات متعددة اللغات وملفات كل لغة تلقائيًا.

```tsx fileName="Components/MyComponent/index.ts"
import { getIntlayer, Locales } from "intlayer";

const intlayer = getIntlayer("hello-world"); // اللغة الافتراضية هي الإنجليزية، لذا ستُرجع المحتوى باللغة الإنجليزية

console.log(JSON.stringify(intlayer, null, 2));
// النتيجة:
// {
//  "multilingualContent": "عنوان المكون الخاص بي",
//  "projectName": "مشروعي"
// }

const intlayer = getIntlayer("hello-world", Locales.SPANISH);

console.log(JSON.stringify(intlayer, null, 2));
// النتيجة:
// {
//  "multilingualContent": "Título de mi componente",
//  "projectName": "مشروعي"
// }

const intlayer = getIntlayer("hello-world", Locales.FRENCH);

console.log(JSON.stringify(intlayer, null, 2));
// النتيجة:
// {
//  "multilingualContent": "Titre de mon composant",
//  "projectName": "مشروعي"
// }
```

### التوليد التلقائي للترجمة

استخدم [intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/intlayer_cli.md) لملء الترجمات المفقودة تلقائيًا بناءً على الخدمات المفضلة لديك.
