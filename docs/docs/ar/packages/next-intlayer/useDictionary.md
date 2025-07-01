---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: توثيق هوك useDictionary | next-intlayer
description: تعرف على كيفية استخدام هوك useDictionary لحزمة next-intlayer
keywords:
  - useDictionary
  - dictionary
  - key
  - Intlayer
  - التدويل
  - التوثيق
  - Next.js
  - جافاسكريبت
  - React
slugs:
  - doc
  - packages
  - next-intlayer
  - useDictionary
---

# تكامل React: توثيق هوك `useDictionary`

يوفر هذا القسم إرشادات مفصلة حول استخدام هوك `useDictionary` داخل تطبيقات React، مما يتيح التعامل الفعال مع المحتوى المحلي دون الحاجة إلى محرر بصري.

## استيراد `useDictionary` في React

يمكن دمج هوك `useDictionary` في تطبيقات React عن طريق استيراده بناءً على السياق:

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

## المعاملات

تقبل الدالة (الهوك) معاملين:

1. **`dictionary`**: كائن قاموس معلن يحتوي على محتوى مترجم لمفاتيح محددة.
2. **`locale`** (اختياري): اللغة المطلوبة. يتم الافتراض أنها لغة السياق الحالي إذا لم يتم تحديدها.

## القاموس

يجب إعلان جميع كائنات القاموس في ملفات محتوى منظمة لضمان سلامة النوع ومنع أخطاء وقت التشغيل. يمكنك العثور على [تعليمات الإعداد هنا](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dictionary/get_started.md). إليك مثال على إعلان المحتوى:

```typescript fileName="component.content.ts" codeFormat="typescript"
import { t, type Dictionary } from "intlayer";

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
      en: "مثال على مكون العميل",
      fr: "Exemple de composant client",
      es: "Ejemplo de componente cliente",
    }),
    content: t({
      en: "هذا هو محتوى مثال مكون العميل",
      fr: "Ceci est le contenu d'un exemple de composant client",
      es: "Este es el contenido de un ejemplo de componente cliente",
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
    }),
    content: t({
      en: "هذا هو محتوى مثال مكون العميل",
      fr: "Ceci est le contenu d'un exemple de composant client",
      es: "Este es el contenido de un ejemplo de componente cliente",
    }),
  },
};

module.exports = exampleContent;
```

## مثال على الاستخدام في مكون عميل React

فيما يلي مثال على كيفية استخدام الخطاف `useDictionary` في مكون React:

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

إذا كنت تستخدم الخطاف `useDictionary` خارج `IntlayerServerProvider`، يجب توفير اللغة صراحة كمعامل عند عرض المكون:

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

على عكس التكاملات التي تستخدم المحررات المرئية، لا تنطبق السمات مثل `buttonTitle.value` هنا. بدلاً من ذلك، قم بالوصول مباشرة إلى السلاسل المحلية كما هو معلن في المحتوى الخاص بك.

```jsx
<button title={content.title}>{content.content}</button>
```

## نصائح إضافية

- **سلامة النوع**: استخدم دائمًا `Dictionary` لتعريف القواميس الخاصة بك لضمان سلامة النوع.
- **تحديثات الترجمة**: عند تحديث المحتوى، تأكد من اتساق جميع اللغات لتجنب فقدان الترجمات.

تركز هذه الوثائق على دمج الخطاف `useDictionary`، مما يوفر نهجًا مبسطًا لإدارة المحتوى المحلي دون الاعتماد على وظائف المحرر المرئي.

## تاريخ الوثيقة

- 5.5.10 - 2025-06-29: بداية التاريخ
