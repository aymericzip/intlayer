# دمج React: توثيق `useDictionary` Hook

يوفر هذا القسم إرشادات مفصلة حول استخدام `useDictionary` hook داخل تطبيقات React، مما يتيح التعامل الفعال مع المحتوى المحلي دون الحاجة إلى محرر مرئي.

## استيراد `useDictionary` في React

يمكن دمج `useDictionary` hook في تطبيقات React عن طريق استيراده بناءً على السياق:

- **مكون العميل:**

  ```typescript codeFormat="typescript"
  import { useDictionary } from "next-intlayer"; // يُستخدم في مكونات React على جانب العميل
  ```

  ```javascript codeFormat="esm"
  import { useDictionary } from "next-intlayer"; // يُستخدم في مكونات React على جانب العميل
  ```

  ```javascript codeFormat="commonjs"
  const { useDictionary } = require("next-intlayer"); // يُستخدم في مكونات React على جانب العميل
  ```

- **مكون الخادم:**

  ```typescript codeFormat="typescript"
  import { useDictionary } from "next-intlayer/server"; // يُستخدم في مكونات React على جانب الخادم
  ```

  ```javascript codeFormat="esm"
  import { useDictionary } from "next-intlayer/server"; // يُستخدم في مكونات React على جانب الخادم
  ```

  ```javascript codeFormat="commonjs"
  const { useDictionary } = require("next-intlayer/server"); // يُستخدم في مكونات React على جانب الخادم
  ```

## المعاملات

يقبل الـ hook معاملين:

1. **`dictionary`**: كائن قاموس مُعلن يحتوي على المحتوى المحلي لمفاتيح محددة.
2. **`locale`** (اختياري): اللغة المطلوبة. يتم افتراض اللغة الحالية للسياق إذا لم يتم تحديدها.

## القاموس

يجب أن يتم إعلان جميع كائنات القاموس في ملفات محتوى منظمة لضمان سلامة النوع وتجنب أخطاء وقت التشغيل. يمكنك العثور على تعليمات الإعداد [هنا](https://github.com/aymericzip/intlayer/blob/main/docs/ar/dictionary/get_started.md). إليك مثال على إعلان المحتوى:

```typescript fileName="component.content.ts" codeFormat="typescript"
import { t, type Dictionary } from "intlayer";

const exampleContent = {
  key: "component-example",
  content: {
    title: t({
      en: "Client Component Example",
      fr: "Exemple de composant client",
      es: "Ejemplo de componente cliente",
      ar: "مثال على مكون العميل",
    }),
    content: t({
      en: "This is the content of a client component example",
      fr: "Ceci est le contenu d'un exemple de composant client",
      es: "Este es el contenido de un ejemplo de componente cliente",
      ar: "هذا هو محتوى مثال على مكون العميل",
    }),
  },
} satisfies Dictionary;

export default exampleContent;
```

```javascript fileName="component.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const exampleContent = {
  key: "component-example",
  content: {
    title: t({
      en: "Client Component Example",
      fr: "Exemple de composant client",
      es: "Ejemplo de componente cliente",
      ar: "مثال على مكون العميل",
    }),
    content: t({
      en: "This is the content of a client component example",
      fr: "Ceci est le contenu d'un exemple de composant client",
      es: "Este es el contenido de un ejemplo de componente cliente",
      ar: "هذا هو محتوى مثال على مكون العميل",
    }),
  },
};

export default exampleContent;
```

```javascript fileName="component.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const exampleContent = {
  key: "component-example",
  content: {
    title: t({
      en: "Client Component Example",
      fr: "Exemple de composant client",
      es: "Ejemplo de componente cliente",
      ar: "مثال على مكون العميل",
    }),
    content: t({
      en: "This is the content of a client component example",
      fr: "Ceci est le contenu d'un exemple de composant client",
      es: "Este es el contenido de un ejemplo de componente cliente",
      ar: "هذا هو محتوى مثال على مكون العميل",
    }),
  },
};

module.exports = exampleContent;
```

## مثال على الاستخدام في مكون عميل React

فيما يلي مثال على كيفية استخدام `useDictionary` hook في مكون React:

```tsx fileName="ClientComponentExample.tsx" codeFormat="typescript"
"use client";

import type { FC } from "react";
import { useDictionary } from "next-intlayer";
import clientComponentExampleContent from "./component.content";

const ClientComponentExample: FC = () => {
  const { title, content } = useDictionary(clientComponentExampleContent);

  return (
    <div>
      <h1>{title}</h1>
      <p>{content}</p>
    </div>
  );
};
```

```javascript fileName="ClientComponentExample.mjs" codeFormat="esm"
"use client";

import type { FC } from "react";
import { useDictionary } from "next-intlayer";
import exampleContent from "./component.content";

const ClientComponentExample: FC = () => {
  const { title, content } = useDictionary(exampleContent);

  return (
    <div>
      <h1>{title}</h1>
      <p>{content}</p>
    </div>
  );
};
```

```javascript fileName="ClientComponentExample.cjs" codeFormat="commonjs"
"use client";

const { useDictionary } = require("next-intlayer");
const exampleContent = require("./component.content");

const ClientComponentExample = () => {
  const { title, content } = useDictionary(exampleContent);

  return (
    <div>
      <h1>{title}</h1>
      <p>{content}</p>
    </div>
  );
};
```

## مثال على الاستخدام في مكون خادم React

إذا كنت تستخدم `useDictionary` hook خارج `IntlayerServerProvider`، يجب تحديد اللغة صراحةً كمعامل عند عرض المكون:

```tsx fileName="ServerComponentExample.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useDictionary } from "next-intlayer/server";
import clientComponentExampleContent from "./component.content";

const ServerComponentExample: FC = () => {
  const { content } = useDictionary(clientComponentExampleContent);

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.content}</p>
    </div>
  );
};
```

```javascript fileName="ServerComponentExample.mjs" codeFormat="esm"
import { useDictionary } from "next-intlayer/server";
import clientComponentExampleContent from "./component.content";

const ServerComponentExample = () => {
  const { content } = useDictionary(clientComponentExampleContent);

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.content}</p>
    </div>
  );
};
```

```javascript fileName="ServerComponentExample.cjs" codeFormat="commonjs"
import { useDictionary } from "next-intlayer/server";
import clientComponentExampleContent from "./component.content";

const ServerComponentExample = () => {
  const { content } = useDictionary(clientComponentExampleContent);

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.content}</p>
    </div>
  );
};
```

## ملاحظات حول السمات

على عكس التكاملات التي تستخدم المحررات المرئية، السمات مثل `buttonTitle.value` لا تنطبق هنا. بدلاً من ذلك، قم بالوصول مباشرة إلى النصوص المحلية كما تم إعلانها في المحتوى الخاص بك.

```jsx
<button title={content.title}>{content.content}</button>
```

## نصائح إضافية

- **سلامة النوع**: استخدم دائمًا `Dictionary` لتعريف القواميس لضمان سلامة النوع.
- **تحديثات التوطين**: عند تحديث المحتوى، تأكد من أن جميع اللغات متسقة لتجنب فقدان الترجمات.

يركز هذا التوثيق على دمج `useDictionary` hook، مما يوفر نهجًا مبسطًا لإدارة المحتوى المحلي دون الاعتماد على وظائف المحرر المرئي.
