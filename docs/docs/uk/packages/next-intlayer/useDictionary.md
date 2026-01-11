---
createdAt: 2025-08-23
updatedAt: 2025-08-23
title: Документація хука useDictionary | next-intlayer
description: Дізнайтеся, як використовувати хук useDictionary з пакету next-intlayer
keywords:
  - useDictionary
  - словник
  - ключ
  - Intlayer
  - Інтернаціоналізація
  - Документація
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - packages
  - next-intlayer
  - useDictionary
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: Init history
---

# Інтеграція з React: документація хука `useDictionary`

У цьому розділі наведено детальні вказівки щодо використання хука `useDictionary` у React-застосунках, що дозволяє ефективно працювати з локалізованим вмістом без візуального редактора.

## Імпорт хука `useDictionary` у React

Хук `useDictionary` можна інтегрувати в React-застосунки, імпортуючи його залежно від контексту:

- **Клієнтський компонент:**

  ```typescript codeFormat="typescript"
  import { useDictionary } from "next-intlayer"; // Використовується в клієнтських React-компонентах
  ```

  ```javascript codeFormat="esm"
  import { useDictionary } from "next-intlayer"; // Використовується в клієнтських React-компонентах
  ```

  ```javascript codeFormat="commonjs"
  const { useDictionary } = require("next-intlayer"); // Використовується в клієнтських React-компонентах
  ```

- **Серверний компонент:**

  ```typescript codeFormat="typescript"
  import { useDictionary } from "next-intlayer/server"; // Використовується в серверних React-компонентах
  ```

  ```javascript codeFormat="esm"
  import { useDictionary } from "next-intlayer/server"; // Використовується в серверних React-компонентах
  ```

  ```javascript codeFormat="commonjs"
  const { useDictionary } = require("next-intlayer/server"); // Використовується в серверних React-компонентах
  ```

## Параметри

Хук приймає два параметри:

1. **`dictionary`**: Оголошений об'єкт словника, що містить локалізований вміст для певних ключів.
2. **`locale`** (необов'язковий): Бажана локаль. За замовчуванням використовується локаль поточного контексту, якщо не вказано.

## Словник

Усі об'єкти словників мають бути оголошені у структурованих файлах вмісту, щоб забезпечити типобезпеку та запобігти помилкам під час виконання. Інструкції зі встановлення можна знайти [тут](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/content_file.md). Ось приклад декларації вмісту:

```typescript fileName="component.content.ts" codeFormat="typescript"
import { t, type Dictionary } from "intlayer";

const exampleContent = {
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

export default exampleContent;
```

```javascript fileName="component.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const exampleContent = {
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

export default exampleContent;
```

```javascript fileName="component.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

// Тип: словник (Dictionary) з пакунка intlayer
/** @type {import('intlayer').Dictionary} */
const exampleContent = {
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

module.exports = exampleContent;
```

## Приклад використання в клієнтському React-компоненті

Нижче наведено приклад того, як використовувати хук `useDictionary` у React-компоненті:

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

## Приклад використання в React Server Component

Якщо ви використовуєте хук `useDictionary` поза `IntlayerServerProvider`, локаль має бути явно передана як параметр під час рендерингу компонента:

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

## Примітки щодо атрибутів

На відміну від інтеграцій, що використовують візуальні редактори, атрибути на кшталт `buttonTitle.value` тут не застосовуються. Натомість звертайтесь безпосередньо до локалізованих рядків, як вони оголошені у вашому контенті.

```jsx
<button title={content.title}>{content.content}</button>
```

## Додаткові поради

- **Type Safety**: Завжди використовуйте `Dictionary` для визначення ваших словників, щоб забезпечити безпеку типів.
- **Оновлення локалізацій**: При оновленні контенту переконайтеся, що всі locales узгоджені, щоб уникнути відсутніх перекладів.

Ця документація зосереджена на інтеграції хука `useDictionary`, що забезпечує оптимізований підхід до керування локалізованим контентом без покладання на функціональність візуального редактора.
