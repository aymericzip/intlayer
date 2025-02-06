# تكامل React: توثيق `useDictionary` Hook

هذا القسم يقدم إرشادات مفصلة حول استخدام `useDictionary` hook ضمن تطبيقات React، مما يمكّن من التعامل بفعالية مع المحتوى المحلي دون محرر مرئي.

## استيراد `useDictionary` في React

يمكن دمج `useDictionary` hook في تطبيقات React عن طريق استيراده بناءً على السياق:

- **مكون العميل:**

  ```typescript codeFormat="typescript"
  import { useDictionary } from "react-intlayer"; // مستخدم في مكونات React على جانب العميل
  ```

```javascript codeFormat="esm"
import { useDictionary } from "react-intlayer"; // مستخدم في مكونات React على جانب العميل
```

```javascript codeFormat="commonjs"
const { useDictionary } = require("react-intlayer"); // مستخدم في مكونات React على جانب العميل
```

- **مكون الخادم:**

  ```typescript codeFormat="typescript"
  import { useDictionary } from "react-intlayer/server"; // مستخدم في مكونات React على جانب الخادم
  ```

  ```javascript codeFormat="esm"
  import { useDictionary } from "react-intlayer/server"; // مستخدم في مكونات React على جانب الخادم
  ```

  ```javascript codeFormat="commonjs"
  const { useDictionary } = require("react-intlayer/server"); // مستخدم في مكونات React على جانب الخادم
  ```

## المعلمات

الهوك يقبل معلمين:

1. **`dictionary`**: كائن قاموس تم إعلانه يحتوي على محتوى محلي لمفاتيح معينة.
2. **`locale`** (اختياري): اللغة المرغوبة. افتراضياً تكون لغة السياق الحالية إذا لم يتم تحديدها.

## إعلان المحتوى

يجب إعلانات جميع كائنات القاموس في ملفات محتوى هيكلية لضمان السلامة النوعية وتجنب الأخطاء في وقت التشغيل. يمكنك العثور على تعليمات الإعداد [هنا](https://github.com/aymericzip/intlayer/blob/main/docs/ar/dictionary/get_started.md). إليك مثال على إعلان المحتوى:

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
        "en": "Client Component Example",
        "fr": "Exemple de composant client",
        "es": "Ejemplo de componente cliente"
      }
    },
    "content": {
      "nodeType": "translation",
      "translation": {
        "en": "This is the content of a client component example",
        "fr": "Ceci est le contenu d'un exemple de composant client",
        "es": "Este es el contenido de un ejemplo de componente cliente"
      }
    }
  }
}
```

## مثال على الاستخدام في React

فيما يلي مثال على كيفية استخدام `useDictionary` hook في مكون React:

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

## تكامل الخادم

إذا كنت تستخدم `useDictionary` hook خارج `IntlayerProvider`، يجب تقديم اللغة بشكل صريح كمعلمة عند عرض المكون:

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

## ملاحظات حول الخصائص

على عكس التكاملات التي تستخدم محررات مرئية، لا تنطبق الخصائص مثل `buttonTitle.value` هنا. بدلاً من ذلك، الوصول مباشرةً إلى السلاسل المحلية كما تم إعلانها في المحتوى الخاص بك.

```jsx
<button title={content.title}>{content.content}</button>
```

## نصائح إضافية

- **سلامة النوع**: استخدم دائماً `Dictionary` لتعريف قواميسك لضمان سلامة النوع.
- **تحديثات التوطين**: عند تحديث المحتوى، تأكد من أن جميع اللغات متسقة لتجنب الترجمات المفقودة.

تركز هذه الوثيقة على تكامل `useDictionary` hook، مقدمةً نهجاً سلساً لإدارة المحتوى المحلي دون الاعتماد على وظائف محرر المرئي.
