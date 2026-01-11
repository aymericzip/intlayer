---
createdAt: 2025-02-07
updatedAt: 2025-06-29
title: Хук useDictionary — документація React Intlayer
description: Повний посібник із використання хуку useDictionary у React-застосунках з Intlayer для ефективної роботи з локалізованим контентом без візуального редактора.
keywords:
  - useDictionary
  - React
  - hook
  - intlayer
  - localization
  - i18n
  - dictionary
  - translation
slugs:
  - doc
  - package
  - react-intlayer
  - useDictionary
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: Ініціалізація історії
---

# Інтеграція з React: Документація хуку `useDictionary`

У цьому розділі наведено докладні вказівки щодо використання хуку `useDictionary` у React-застосунках, що дозволяє ефективно працювати з локалізованим контентом без використання візуального редактора.

## Імпорт `useDictionary` у React

Хук `useDictionary` можна інтегрувати в React‑додатки, імпортуючи його відповідно до контексту:

- **Клієнтський компонент:**

  ```typescript codeFormat="typescript"
  import { useDictionary } from "react-intlayer"; // Використовується в клієнтських React-компонентах
  ```

  ```javascript codeFormat="esm"
  import { useDictionary } from "react-intlayer"; // Використовується в клієнтських React-компонентах
  ```

  ```javascript codeFormat="commonjs"
  const { useDictionary } = require("react-intlayer"); // Використовується в клієнтських React-компонентах
  ```

- **Серверний компонент:**

  ```typescript codeFormat="typescript"
  import { useDictionary } from "react-intlayer/server"; // Використовується в серверних React-компонентах
  ```

  ```javascript codeFormat="esm"
  import { useDictionary } from "react-intlayer/server"; // Використовується в серверних React-компонентах
  ```

  ```javascript codeFormat="commonjs"
  const { useDictionary } = require("react-intlayer/server"); // Використовується в серверних React-компонентах
  ```

## Параметри

Хук приймає два параметри:

1. **`dictionary`**: Оголошений об'єкт словника, що містить локалізований вміст для конкретних ключів.
2. **`locale`** (необов'язково): Бажана локаль. За замовчуванням використовується локаль поточного контексту, якщо не вказано.

## Словник

Усі об'єкти словника повинні бути оголошені у структурованих файлах вмісту, щоб забезпечити типобезпеку та запобігти помилкам під час виконання. Інструкції з налаштування можна знайти [тут](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/content_file.md). Ось приклад декларації вмісту:

```typescript fileName="./component.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const componentContent = {
  key: "component-example",
  content: {
    title: t({
      uk: "Приклад клієнтського компонента",
      en: "Client Component Example",
      fr: "Exemple de composant client",
      es: "Ejemplo de componente cliente",
    }),
    content: t({
      uk: "Це вміст прикладу клієнтського компонента",
      en: "This is the content of a client component example",
      fr: "Ceci est le contenu d'un exemple de composant client",
      uk: "Це вміст прикладу клієнтського компонента",
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
      uk: "Приклад клієнтського компонента",
      en: "Client Component Example",
      fr: "Exemple de composant client",
      es: "Ejemplo de componente cliente",
    }),
    content: t({
      uk: "Це вміст прикладу клієнтського компонента",
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

// Тип даних: словник Intlayer
/** @type {import('intlayer').Dictionary} */
const componentContent = {
  key: "component-example",
  content: {
    title: t({
      uk: "Приклад клієнтського компонента",
      en: "Client Component Example",
      fr: "Exemple de composant client",
      es: "Ejemplo de componente cliente",
    }),
    content: t({
      uk: "Це вміст прикладу клієнтського компонента",
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
        "uk": "Приклад клієнтського компонента",
        "en": "Client Component Example",
        "fr": "Exemple de composant client",
        "es": "Ejemplo de componente cliente"
      }
    },
    "content": {
      "nodeType": "translation",
      "translation": {
        "uk": "Це вміст прикладу клієнтського компонента",
        "en": "This is the content of a client component example",
        "fr": "Ceci est le contenu d'un exemple de composant client",
        "es": "Este es el contenido de un ejemplo de componente cliente"
      }
    }
  }
}
```

## Приклад використання в React

Нижче наведено приклад того, як використовувати хук `useDictionary` у React-компоненті:

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

## Інтеграція на сервері

Якщо ви використовуєте хук `useDictionary` поза межами `IntlayerProvider`, локаль має бути явно передана як параметр під час рендерингу компонента:

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
import { useDictionary } from "react.intlayer/server";
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
const { useDictionary } = require("react.intlayer/server");
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

## Примітки щодо атрибутів

На відміну від інтеграцій з візуальними редакторами, атрибути на кшталт `buttonTitle.value` тут не застосовуються. Натомість безпосередньо звертайтеся до локалізованих рядків, як оголошено у вашому контенті.

```jsx
<button title={content.title}>{content.content}</button>
```

## Додаткові поради

- **Type Safety**: Завжди використовуйте `Dictionary` для визначення ваших словників, щоб забезпечити Type Safety.
- **Localization Updates**: Під час оновлення контенту переконайтеся, що всі локалі узгоджені, щоб уникнути відсутніх перекладів.

Ця документація зосереджена на інтеграції хука `useDictionary`, надаючи оптимізований підхід до керування локалізованим контентом без покладання на функціональність візуальних редакторів.
