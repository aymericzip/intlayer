---
docName: package__react-intlayer__useDictionary
url: https://intlayer.org/doc/package/react-intlayer/useDictionary
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/packages/react-intlayer/useDictionary.md
createdAt: 2025-02-07
updatedAt: 2025-06-29
title: هوك useDictionary - توثيق React Intlayer
description: دليل كامل لاستخدام هوك useDictionary في تطبيقات React مع Intlayer لإدارة المحتوى المحلي بكفاءة بدون محرر بصري.
keywords:
  - useDictionary
  - React
  - hook
  - intlayer
  - localization
  - i18n
  - dictionary
  - translation
---

# تكامل React: توثيق هوك `useDictionary`

يوفر هذا القسم إرشادات مفصلة حول استخدام هوك `useDictionary` داخل تطبيقات React، مما يتيح إدارة فعالة للمحتوى المحلي بدون محرر بصري.

## استيراد `useDictionary` في React

يمكن دمج هوك `useDictionary` في تطبيقات React عن طريق استيراده بناءً على السياق:

- **مكون العميل:**

  ```typescript codeFormat="typescript"
  import { useDictionary } from "react-intlayer"; // يستخدم في مكونات React على جانب العميل
  ```

  ```javascript codeFormat="esm"
  import { useDictionary } from "react-intlayer"; // يستخدم في مكونات React على جانب العميل
  ```

  ```javascript codeFormat="commonjs"
  const { useDictionary } = require("react-intlayer"); // يستخدم في مكونات React على جانب العميل
  ```

- **مكون الخادم:**

  ```typescript codeFormat="typescript"
  import { useDictionary } from "react-intlayer/server"; // يستخدم في مكونات React على جانب الخادم
  ```

  ```javascript codeFormat="esm"
  import { useDictionary } from "react-intlayer/server"; // يستخدم في مكونات React على جانب الخادم
  ```

  ```javascript codeFormat="commonjs"
  const { useDictionary } = require("react-intlayer/server"); // يستخدم في مكونات React على جانب الخادم
  ```

## المعاملات

يقبل الهوك معاملين:

1. **`dictionary`**: كائن قاموس معلن يحتوي على محتوى محلي لمفاتيح محددة.
2. **`locale`** (اختياري): اللغة المطلوبة. الافتراضي هو لغة السياق الحالي إذا لم يتم تحديدها.

## القاموس

يجب إعلان جميع كائنات القاموس في ملفات محتوى منظمة لضمان سلامة الأنواع ومنع أخطاء وقت التشغيل. يمكنك العثور على [تعليمات الإعداد هنا](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/dictionary/get_started.md). إليك مثال على إعلان المحتوى:

```typescript fileName="./component.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const componentContent = {
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

export default componentContent;
```

```javascript fileName="./component.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
// تعريف محتوى المكون
const componentContent = {
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

export default componentContent;
```

```javascript fileName="./component.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
// تعريف محتوى المكون
const componentContent = {
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

module.exports = componentContent;
```

```json fileName="./component.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "component-example",
  "content": {
    "title": {
      "nodeType": "translation",
      "translation": {
        "ar": "مثال على مكون العميل",
        "en": "Client Component Example",
        "fr": "Exemple de composant client",
        "es": "Ejemplo de componente cliente"
      }
    },
    "content": {
      "nodeType": "translation",
      "translation": {
        "ar": "هذا هو محتوى مثال على مكون العميل",
        "en": "This is the content of a client component example",
        "fr": "Ceci est le contenu d'un exemple de composant client",
        "es": "Este es el contenido de un ejemplo de componente cliente"
      }
    }
  }
}
```

## مثال على الاستخدام في React

فيما يلي مثال على كيفية استخدام الخطاف `useDictionary` في مكون React:

```tsx fileName="./ComponentExample.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useDictionary } from "react-intlayer";
import componentContent from "./component.content";

const ComponentExample: FC = () => {
  const { title, content } = useDictionary(componentContent);

  return (
    <div>
      <h1>{title}</h1>
      <p>{content}</p>
    </div>
  );
};
```

```jsx fileName="./ComponentExample.mjx" codeFormat="esm"
import { useDictionary } from "react-intlayer";
import componentContent from "./component.content";

const ComponentExample = () => {
  const { title, content } = useDictionary(componentContent);

  return (
    <div>
      <h1>{title}</h1>
      <p>{content}</p>
    </div>
  );
};
```

```jsx fileName="./ComponentExample.csx" codeFormat="commonjs"
const { useDictionary } = require("react-intlayer");
const componentContent = require("./component.content");

const ComponentExample = () => {
  const { title, content } = useDictionary(componentContent);

  return (
    <div>
      <h1>{title}</h1>
      <p>{content}</p>
    </div>
  );
};
```

## التكامل مع الخادم

إذا كنت تستخدم الخطاف `useDictionary` خارج `IntlayerProvider`، يجب توفير اللغة صراحة كمعامل عند عرض المكون:

```tsx fileName="./ServerComponentExample.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useDictionary } from "react-intlayer/server";
import clientComponentExampleContent from "./component.content";

const ServerComponentExample: FC<{ locale: string }> = ({ locale }) => {
  const { content } = useDictionary(clientComponentExampleContent, locale);

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.content}</p>
    </div>
  );
};
```

```jsx fileName="./ServerComponentExample.mjx" codeFormat="esm"
import { useDictionary } from "react-intlayer/server";
import componentContent from "./component.content";

const ServerComponentExample = ({ locale }) => {
  const { content } = useDictionary(componentContent, locale);

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.content}</p>
    </div>
  );
};
```

```jsx fileName="./ServerComponentExample.csx" codeFormat="commonjs"
const { useDictionary } = require("react-intlayer/server");
const componentContent = require("./component.content");

const ServerComponentExample = ({ locale }) => {
  const { content } = useDictionary(componentContent, locale);

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.content}</p>
    </div>
  );
};
```

## ملاحظات حول السمات

على عكس التكاملات التي تستخدم المحررات المرئية، فإن السمات مثل `buttonTitle.value` لا تنطبق هنا. بدلاً من ذلك، قم بالوصول مباشرة إلى السلاسل المحلية كما هو معلن في المحتوى الخاص بك.

```jsx
<button title={content.title}>{content.content}</button>
```

## نصائح إضافية

- **سلامة النوع**: استخدم دائمًا `Dictionary` لتعريف القواميس الخاصة بك لضمان سلامة النوع.
- **تحديثات التوطين**: عند تحديث المحتوى، تأكد من اتساق جميع اللغات لتجنب فقدان الترجمات.

تركز هذه الوثائق على تكامل الخطاف `useDictionary`، مما يوفر نهجًا مبسطًا لإدارة المحتوى المحلي دون الاعتماد على وظائف المحرر المرئي.

## تاريخ الوثيقة

- 5.5.10 - 2025-06-29: بداية التاريخ
