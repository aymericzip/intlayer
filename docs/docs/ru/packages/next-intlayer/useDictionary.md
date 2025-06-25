---
docName: package__next-intlayer__useDictionary
url: https://intlayer.org/doc/packages/next-intlayer/useDictionary
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/en/packages/next-intlayer/useDictionary.md
createdAt: 2024-08-11
updatedAt: 2024-08-11
title: Документация по хуку useDictionary | next-intlayer
description: Посмотрите, как использовать хук useDictionary для пакета next-intlayer
keywords:
  - useDictionary
  - словарь
  - ключ
  - Intlayer
  - интернационализация
  - документация
  - Next.js
  - JavaScript
  - Реакция
---

# React Интеграция: Документация по хуку `useDictionary`

Этот раздел предоставляет подробное руководство по использованию хука `useDictionary` в React-приложениях, позволяя эффективно управлять локализованным контентом без визуального редактора.

## Импорт `useDictionary` в React

Хук `useDictionary` можно интегрировать в React-приложения, импортируя его в зависимости от контекста:

- **Клиентский компонент:**

  ```typescript codeFormat="typescript"
  import { useDictionary } from "next-intlayer"; // Используется в клиентских React-компонентах
  ```

  ```javascript codeFormat="esm"
  import { useDictionary } from "next-intlayer"; // Используется в клиентских React-компонентах
  ```

  ```javascript codeFormat="commonjs"
  const { useDictionary } = require("next-intlayer"); // Используется в клиентских React-компонентах
  ```

- **Серверный компонент:**

  ```typescript codeFormat="typescript"
  import { useDictionary } from "next-intlayer/server"; // Используется в серверных React-компонентах
  ```

  ```javascript codeFormat="esm"
  import { useDictionary } from "next-intlayer/server"; // Используется в серверных React-компонентах
  ```

  ```javascript codeFormat="commonjs"
  const { useDictionary } = require("next-intlayer/server"); // Используется в серверных React-компонентах
  ```

## Параметры

Хук принимает два параметра:

1. **`dictionary`**: Объявленный объект словаря, содержащий локализованный контент для определенных ключей.
2. **`locale`** (необязательно): Желаемая локаль. По умолчанию используется локаль текущего контекста, если не указано.

## Словарь

Все объекты словарей должны быть объявлены в структурированных файлах контента для обеспечения типобезопасности и предотвращения ошибок во время выполнения. Инструкции по настройке можно найти [здесь](https://github.com/aymericzip/intlayer/blob/main/docs/ru/dictionary/get_started.md). Вот пример объявления контента:

```typescript fileName="component.content.ts" codeFormat="typescript"
import { t, type Dictionary } from "intlayer";

const exampleContent = {
  key: "component-example",
  content: {
    title: t({
      en: "Client Component Example",
      fr: "Exemple de composant client",
      es: "Ejemplo de componente cliente",
      ru: "Пример клиентского компонента",
    }),
    content: t({
      en: "This is the content of a client component example",
      fr: "Ceci est le contenu d'un exemple de composant client",
      es: "Este es el contenido de un ejemplo de componente cliente",
      ru: "Это содержимое примера клиентского компонента",
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
      ru: "Пример клиентского компонента",
    }),
    content: t({
      en: "This is the content of a client component example",
      fr: "Ceci est le contenu d'un exemple de composant client",
      es: "Este es el contenido de un ejemplo de componente cliente",
      ru: "Это содержимое примера клиентского компонента",
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
      ru: "Пример клиентского компонента",
    }),
    content: t({
      en: "This is the content of a client component example",
      fr: "Ceci est le contenu d'un exemple de composant client",
      es: "Este es el contenido de un ejemplo de componente cliente",
      ru: "Это содержимое примера клиентского компонента",
    }),
  },
};

module.exports = exampleContent;
```

## Пример использования в клиентском компоненте React

Ниже приведен пример использования хука `useDictionary` в React-компоненте:

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

## Пример использования в серверном компоненте React

Если вы используете хук `useDictionary` вне `IntlayerServerProvider`, локаль должна быть явно указана как параметр при рендеринге компонента:

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

## Заметки по атрибутам

В отличие от интеграций с использованием визуальных редакторов, такие атрибуты, как `buttonTitle.value`, здесь не применяются. Вместо этого напрямую используйте локализованные строки, как они объявлены в вашем контенте.

```jsx
<button title={content.title}>{content.content}</button>
```

## Дополнительные советы

- **Типобезопасность**: Всегда используйте `Dictionary` для определения ваших словарей, чтобы обеспечить типобезопасность.
- **Обновления локализации**: При обновлении контента убедитесь, что все локали согласованы, чтобы избежать отсутствия переводов.

Эта документация фокусируется на интеграции хука `useDictionary`, предоставляя упрощенный подход к управлению локализованным контентом без использования функциональностей визуального редактора.
