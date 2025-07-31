---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: Документация по хуку useDictionary | next-intlayer
description: Узнайте, как использовать хук useDictionary в пакете next-intlayer
keywords:
  - useDictionary
  - словарь
  - ключ
  - Intlayer
  - Интернационализация
  - Документация
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - packages
  - next-intlayer
  - useDictionary
---

# Интеграция с React: Документация по хуку `useDictionary`

В этом разделе представлено подробное руководство по использованию хука `useDictionary` в приложениях React, что позволяет эффективно работать с локализованным контентом без визуального редактора.

## Импорт хуку `useDictionary` в React

Хук `useDictionary` можно интегрировать в приложения React, импортируя его в зависимости от контекста:

- **Клиентский компонент:**

  ```typescript codeFormat="typescript"
  import { useDictionary } from "next-intlayer"; // Используется в клиентских компонентах React
  ```

  ```javascript codeFormat="esm"
  import { useDictionary } from "next-intlayer"; // Используется в клиентских компонентах React
  ```

  ```javascript codeFormat="commonjs"
  const { useDictionary } = require("next-intlayer"); // Используется в клиентских компонентах React
  ```

- **Серверный компонент:**

  ```typescript codeFormat="typescript"
  import { useDictionary } from "next-intlayer/server"; // Используется в серверных компонентах React
  ```

  ```javascript codeFormat="esm"
  import { useDictionary } from "next-intlayer/server"; // Используется в серверных компонентах React
  ```

  ```javascript codeFormat="commonjs"
  const { useDictionary } = require("next-intlayer/server"); // Используется в серверных компонентах React
  ```

## Параметры

Хук принимает два параметра:

1. **`dictionary`**: Объявленный объект словаря, содержащий локализованный контент для конкретных ключей.
2. **`locale`** (необязательный): Желаемая локаль. По умолчанию используется локаль текущего контекста.

## Словарь

Все объекты словаря должны быть объявлены в структурированных файлах контента для обеспечения типобезопасности и предотвращения ошибок во время выполнения. Вы можете найти [инструкции по настройке здесь](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dictionary/get_started.md). Вот пример объявления контента:

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
      en: "This is the content of a client component example",
      fr: "Ceci est le contenu d'un exemple de composant client",
      es: "Este es el contenido de un ejemplo de componente cliente",
    }),
  },
};

module.exports = exampleContent;
```

## Пример использования в React клиентском компоненте

Ниже приведён пример того, как использовать хук `useDictionary` в React компоненте:

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

// Клиентский компонент, использующий useDictionary для получения локализованного контента
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

## Пример использования в React Server Component

Если вы используете хук `useDictionary` вне `IntlayerServerProvider`, локаль должна быть явно передана в качестве параметра при рендеринге компонента:

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

## Примечания по атрибутам

В отличие от интеграций с визуальными редакторами, такие атрибуты, как `buttonTitle.value`, здесь не применяются. Вместо этого напрямую обращайтесь к локализованным строкам, как они объявлены в вашем контенте.

```jsx
<button title={content.title}>{content.content}</button>
```

## Дополнительные советы

- **Типобезопасность**: Всегда используйте `Dictionary` для определения ваших словарей, чтобы обеспечить типобезопасность.
- **Обновления локализации**: При обновлении контента убедитесь, что все локали согласованы, чтобы избежать отсутствующих переводов.

Данная документация сосредоточена на интеграции хука `useDictionary`, предоставляя упрощённый подход к управлению локализованным контентом без использования функционала визуального редактора.

## История документации

- 5.5.10 - 2025-06-29: Инициализация истории
