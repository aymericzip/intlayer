# دمج React: توثيق `useDictionary` Hook

يوفر هذا القسم إرشادات مفصلة حول استخدام `useDictionary` hook داخل تطبيقات React، مما يتيح التعامل الفعّال مع المحتوى المحلي دون محرر مرئي.

## استيراد `useDictionary` في React

يمكن دمج `useDictionary` hook في تطبيقات React عن طريق استيراده بناءً على السياق:

- **مكون العميل:**

  ```typescript codeFormat="typescript"
  import { useDictionary } from "react-intlayer"; // يُستخدم في مكونات React على جانب العميل
  ```

  ```javascript codeFormat="esm"
  import { useDictionary } from "react-intlayer"; // يُستخدم في مكونات React على جانب العميل
  ```

  ```javascript codeFormat="commonjs"
  const { useDictionary } = require("react-intlayer"); // يُستخدم في مكونات React على جانب العميل
  ```

- **مكون الخادم:**

  ```typescript codeFormat="typescript"
  import { useDictionary } from "react-intlayer/server"; // يُستخدم في مكونات React على جانب الخادم
  ```

  ```javascript codeFormat="esm"
  import { useDictionary } from "react-intlayer/server"; // يُستخدم في مكونات React على جانب الخادم
  ```

  ```javascript codeFormat="commonjs"
  const { useDictionary } = require("react-intlayer/server"); // يُستخدم في مكونات React على جانب الخادم
  ```

## المعلمات

يقبل الـ hook معلمتين:

1. **`dictionary`**: كائن قاموس مُعلن يحتوي على المحتوى المحلي لمفاتيح محددة.
2. **`locale`** (اختياري): اللغة المطلوبة. يتم افتراض اللغة الحالية للسياق إذا لم يتم تحديدها.

## القاموس

يجب إعلان جميع كائنات القاموس في ملفات محتوى منظمة لضمان أمان النوع وتجنب أخطاء وقت التشغيل. يمكنك العثور على تعليمات الإعداد [هنا](https://github.com/aymericzip/intlayer/blob/main/docs/ar/dictionary/get_started.md). فيما يلي مثال على إعلان المحتوى:

```typescript fileName="./component.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const componentContent = {
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
        "es": "Ejemplo de componente cliente",
        "ar": "مثال على مكون العميل"
      }
    },
    "content": {
      "nodeType": "translation",
      "translation": {
        "en": "This is the content of a client component example",
        "fr": "Ceci est le contenu d'un exemple de composant client",
        "es": "Este es el contenido de un ejemplo de componente cliente",
        "ar": "هذا هو محتوى مثال على مكون العميل"
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

## دمج الخادم

إذا كنت تستخدم `useDictionary` hook خارج `IntlayerProvider`، فيجب تحديد اللغة بشكل صريح كمعلمة عند عرض المكون:

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

على عكس عمليات الدمج باستخدام المحررات المرئية، فإن السمات مثل `buttonTitle.value` لا تنطبق هنا. بدلاً من ذلك، قم بالوصول مباشرة إلى النصوص المحلية كما تم إعلانها في المحتوى الخاص بك.

```jsx
<button title={content.title}>{content.content}</button>
```

## نصائح إضافية

- **أمان النوع**: استخدم دائمًا `Dictionary` لتعريف القواميس لضمان أمان النوع.
- **تحديثات التوطين**: عند تحديث المحتوى، تأكد من أن جميع اللغات متسقة لتجنب فقدان الترجمات.

تركز هذه الوثيقة على دمج `useDictionary` hook، مما يوفر نهجًا مبسطًا لإدارة المحتوى المحلي دون الاعتماد على وظائف المحرر المرئي.
