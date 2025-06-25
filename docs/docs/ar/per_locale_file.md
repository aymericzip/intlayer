# يدعم Intlayer طريقتين لإعلان المحتوى متعدد اللغات:

- ملف واحد يحتوي على جميع الترجمات
- ملف واحد لكل لغة (صيغة per-locale)

تتيح هذه المرونة:

- سهولة الانتقال من أدوات i18n الأخرى
- دعم سير العمل التلقائي للترجمة
- تنظيم واضح للترجمات في ملفات منفصلة خاصة بكل لغة

## ملف واحد يحتوي على ترجمات متعددة

هذه الصيغة مثالية لـ:

- التكرار السريع في الكود.
- التكامل السلس مع نظام إدارة المحتوى (CMS).

هذا هو النهج الموصى به لمعظم حالات الاستخدام. فهو يركز الترجمات، مما يجعل من السهل التكرار والتكامل مع نظام إدارة المحتوى.

```tsx fileName="hello-world.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const helloWorldContent = {
  key: "hello-world",
  content: {
    multilingualContent: t({
      ar: "عنوان مكوني",
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
const helloWorldContent = {
  key: "hello-world",
  content: {
    multilingualContent: t({
      ar: "عنوان مكوني",
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
const helloWorldContent = {
  key: "hello-world",
  content: {
    multilingualContent: t({
      ar: "عنوان مكوني",
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
        "ar": "عنوان مكوني",
        "en": "Title of my component",
        "es": "Título de mi componente"
      }
    }
  }
}
```

> موصى به: هذه الصيغة هي الأفضل عند استخدام محرر Intlayer المرئي أو إدارة الترجمات مباشرة في الكود.

## صيغة Per-Locale

تكون هذه الصيغة مفيدة عندما:

- تريد إصدار أو تجاوز الترجمات بشكل مستقل.
- تقوم بدمج سير العمل التلقائي أو البشري للترجمة.

يمكنك أيضًا تقسيم الترجمات إلى ملفات لغة فردية عن طريق تحديد حقل اللغة:

```tsx fileName="hello-world.en.content.ts" contentDeclarationFormat="typescript"
import { t, Locales, type Dictionary } from "intlayer";

const helloWorldContent = {
  key: "hello-world",
  locale: Locales.ENGLISH, // مهم
  content: { multilingualContent: "Title of my component" },
} satisfies Dictionary;

export default helloWorldContent;
```

```tsx fileName="hello-world.es.content.ts" contentDeclarationFormat="typescript"
import { t, Locales, type Dictionary } from "intlayer";

const helloWorldContent = {
  key: "hello-world",
  locale: Locales.SPANISH, // مهم
  content: { multilingualContent: "Título de mi componente" },
};
```

```js fileName="hello-world.en.content.mjs" contentDeclarationFormat="esm"
import { t, Locales } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const helloWorldContent = {
  key: "hello-world",
  locale: Locales.ENGLISH, // مهم
  content: { multilingualContent: "Title of my component" },
};

export default helloWorldContent;
```

```tsx fileName="hello-world.es.content.mjs" contentDeclarationFormat="esm"
import { t, Locales } from "intlayer";

/** @type {import('intlayer').Dictionary} */
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
const helloWorldContent = {
  key: "hello-world",
  locale: Locales.ENGLISH, // مهم
  content: {
    multilingualContent: "Title of my component",
  },
};

module.exports = helloWorldContent;
```

```tsx fileName="hello-world.es.content.cjs" contentDeclarationFormat="commonjs"
const { t, Locales } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
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
    "multilingualContent": "Title of my component",
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

> مهم: تأكد من تعريف حقل اللغة. يوضح هذا الحقل لـ Intlayer اللغة التي يمثلها الملف.

> ملاحظة: في كلتا الحالتين، يجب أن يتبع ملف إعلان المحتوى نمط التسمية `*.content.{ts,tsx,js,jsx,mjs,cjs,json}` ليتم التعرف عليه بواسطة Intlayer. اللاحقة `.[locale]` اختيارية وتستخدم فقط كاتفاقية تسمية.

## مزج الصيغ

يمكنك مزج كلا النهجين لنفس مفتاح المحتوى. على سبيل المثال:

إعلان المحتوى الافتراضي أو الأساسي بشكل ثابت (مثل `index.content.ts`)

إضافة أو تجاوز محتوى خاص بلغة معينة في `index.content.json`، `index.fr.content.ts`، إلخ.

هذا مفيد بشكل خاص عندما:

- تريد إعلان المحتوى الأساسي الخاص بك بشكل ثابت في قاعدة الكود الخاصة بك وملء الترجمات تلقائيًا في نظام إدارة المحتوى.

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
    multilingualContent: "Title of my component",
    projectName: "My project",
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
        "ar": "عنوان مكوني",
        "fr": "Titre de mon composant",
        "es": "Título de mi componente"
      }
    }
  }
}
```

يقوم Intlayer بدمج الملفات متعددة اللغات وملفات per-locale تلقائيًا.

```tsx fileName="Components/MyComponent/index.ts"
import { getIntlayer, Locales } from "intlayer";

const intlayer = getIntlayer("hello-world"); // اللغة الافتراضية هي ENGLISH، لذلك ستعيد المحتوى باللغة الإنجليزية

console.log(JSON.stringify(intlayer, null, 2));
// النتيجة:
// {
//  "multilingualContent": "Title of my component",
//  "projectName": "My project"
// }

const intlayer = getIntlayer("hello-world", Locales.SPANISH);

console.log(JSON.stringify(intlayer, null, 2));
// النتيجة:
// {
//  "multilingualContent": "Título de mi componente",
//  "projectName": "My project"
// }

const intlayer = getIntlayer("hello-world", Locales.FRENCH);

console.log(JSON.stringify(intlayer, null, 2));
// النتيجة:
// {
//  "multilingualContent": "Titre de mon composant",
//  "projectName": "My project"
// }
```

### إنشاء الترجمة تلقائيًا

استخدم [intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/ar/intlayer_cli.md) لملء الترجمات المفقودة تلقائيًا بناءً على الخدمات المفضلة لديك.
