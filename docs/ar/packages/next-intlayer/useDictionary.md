# تكامل React: وثائق `useDictionary` Hook

تقدم هذه القسم إرشادات مفصلة حول استخدام `useDictionary` hook داخل تطبيقات React، مما يمكّن من التعامل بكفاءة مع المحتوى المترجم بدون محرر مرئي.

## استيراد `useDictionary` في React

يمكن دمج `useDictionary` hook في تطبيقات React عن طريق استيراده بناءً على السياق:

- **مكون العميل:**

  ```typescript codeFormat="typescript"
  import { useDictionary } from "next-intlayer"; // يستخدم في مكونات React على جانب العميل
  ```

  ```javascript codeFormat="esm"
  import { useDictionary } from "next-intlayer"; // يستخدم في مكونات React على جانب العميل
  ```

  ```javascript codeFormat="commonjs"
  const { useDictionary } = require("next-intlayer"); // يستخدم في مكونات React على جانب العميل
  ```

- **مكون الخادم:**

  ```typescript codeFormat="typescript"
  import { useDictionary } from "next-intlayer/server"; // يستخدم في مكونات React على جانب الخادم
  ```

  ```javascript codeFormat="esm"
  import { useDictionary } from "next-intlayer/server"; // يستخدم في مكونات React على جانب الخادم
  ```

  ```javascript codeFormat="commonjs"
  const { useDictionary } = require("next-intlayer/server"); // يستخدم في مكونات React على جانب الخادم
  ```

## المعلمات

يقبل hook معلمتين:

1. **`dictionary`**: كائن معجم محدد يحتوي على محتوى مترجم لمفاتيح معينة.
2. **`locale`** (اختياري): اللغة المطلوبة. الافتراضي هو اللغة الحالية للسياق إذا لم يتم تحديدها.

## إعلان المحتوى

يجب إعلان جميع كائنات المعجم في ملفات محتوى منظمة لضمان أمان النوع ومنع الأخطاء في وقت التشغيل. يمكنك العثور على تعليمات الإعداد [هنا](https://github.com/aymericzip/intlayer/blob/main/docs/ar/content_declaration/get_started.md). إليك مثال على إعلان المحتوى:

```typescript fileName="component.content.ts" codeFormat="typescript"
import { t, type DeclarationContent } from "intlayer";

const exampleContent = {
  key: "component-example",
  content: {
    title: t({
      en: "Client Component Example",
      fr: "Exemple de composant client",
      es: "Ejemplo de componente cliente",
    }),
    content: t({
      en: "This is the content of a client component example",
      fr: "Ceci est le contenu d'un exemple de composant client",
      es: "Este es el contenido de un ejemplo de componente cliente",
    }),
  },
} satisfies DeclarationContent;

export default exampleContent;
```

```javascript fileName="component.content.mjs" codeFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').DeclarationContent} */
const exampleContent = {
  key: "component-example",
  content: {
    title: t({
      en: "Client Component Example",
      fr: "Exemple de composant client",
      es: "Ejemplo de componente cliente",
    }),
    content: t({
      en: "This is the content of a client component example",
      fr: "Ceci est le contenu d'un exemple de composant client",
      es: "Este es el contenido de un ejemplo de componente cliente",
    }),
  },
};

export default exampleContent;
```

```javascript fileName="component.content.cjs" codeFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').DeclarationContent} */
const exampleContent = {
  key: "component-example",
  content: {
    title: t({
      en: "Client Component Example",
      fr: "Exemple de composant client",
      es: "Ejemplo de componente cliente",
    }),
    content: t({
      en: "This is the content of a client component example",
      fr: "Ceci est le contenu d'un exemple de composant client",
      es: "Este es el contenido de un ejemplo de componente cliente",
    }),
  },
};

module.exports = exampleContent;
```

## مثال على الاستخدام في مكون عميل React

فيما يلي مثال لكيفية استخدام `useDictionary` hook في مكون React:

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

إذا كنت تستخدم `useDictionary` hook خارج `IntlayerServerProvider`، يجب تقديم اللغة بشكل صريح كمعلمة عند تقديم المكون:

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

## ملاحظات حول الخصائص

على عكس التكاملات باستخدام المحررين المرئيين، لا تنطبق الخصائص مثل `buttonTitle.value` هنا. بدلاً من ذلك، قم بالوصول مباشرة إلى السلاسل المترجمة كما هو معلن في محتواك.

```jsx
<button title={content.title}>{content.content}</button>
```

## نصائح إضافية

- **أمان النوع**: استخدم دائمًا `DeclarationContent` لتعريف قواميسك لضمان أمان النوع.
- **تحديثات الترجمة**: عند تحديث المحتوى، تأكد من أن جميع اللغات متناسقة لتجنب فقدان الترجمات.

تركز هذه الوثائق على تكامل `useDictionary` hook، مما يوفر نهجًا مبسطًا لإدارة المحتوى المترجم دون الاعتماد على وظائف محرر مرئي.
