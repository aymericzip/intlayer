# Интеграция React: Документация по хуку `useDictionary`

Этот раздел предоставляет подробное руководство по использованию хука `useDictionary` в приложениях React, позволяя эффективно обрабатывать локализованный контент без визуального редактора.

## Импорт `useDictionary` в React

Хук `useDictionary`可以通过根据上下文导入到 React 应用程序中：

- **Клиентский компонент:**

  ```typescript codeFormat="typescript"
  import { useDictionary } from "next-intlayer"; // Используется в компонентах React на стороне клиента
  ```

  ```javascript codeFormat="esm"
  import { useDictionary } from "next-intlayer"; // Используется в компонентах React на стороне клиента
  ```

  ```javascript codeFormat="commonjs"
  const { useDictionary } = require("next-intlayer"); // Используется в компонентах React на стороне клиента
  ```

- **Серверный компонент:**

  ```typescript codeFormat="typescript"
  import { useDictionary } from "next-intlayer/server"; // Используется в компонентах React на стороне сервера
  ```

  ```javascript codeFormat="esm"
  import { useDictionary } from "next-intlayer/server"; // Используется в компонентах React на стороне сервера
  ```

  ```javascript codeFormat="commonjs"
  const { useDictionary } = require("next-intlayer/server"); // Используется в компонентах React на стороне сервера
  ```

## Параметры

Хук принимает два параметра:

1. **`dictionary`**: Объявленный объект словаря, содержащий локализованный контент для конкретных ключей.
2. **`locale`** (опционально): Желаемая локаль. По умолчанию используется локаль текущего контекста, если не указано.

## Объявление контента

Все объекты словаря должны быть объявлены в структурированных контентных файлах для обеспечения безопасности типов и предотвращения ошибок во время выполнения. Вы можете найти инструкции по настройке [здесь](https://github.com/aymericzip/intlayer/blob/main/docs/ru/dictionary/get_started.md). Вот пример объявления контента:

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

```javascript fileName="component.content.mjs" codeFormat="esm"
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

```javascript fileName="component.content.cjs" codeFormat="commonjs"
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

## Пример использования в клиентском компоненте React

Ниже приведен пример того, как использовать хук `useDictionary` в компоненте React:

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

Если вы используете хук `useDictionary` вне `IntlayerServerProvider`, локаль должна быть явно предоставлена в качестве параметра при рендеринге компонента:

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

В отличие от интеграций с использованием визуальных редакторов, атрибуты, такие как `buttonTitle.value`, здесь не применяются. Вместо этого прямо обращайтесь к локализованным строкам, как объявлено в вашем контенте.

```jsx
<button title={content.title}>{content.content}</button>
```

## Дополнительные советы

- **Безопасность типов**: Всегда используйте `Dictionary`, чтобы определить свои словари, чтобы обеспечить безопасность типов.
- **Обновления локализации**: При обновлении контента убедитесь, что все локали согласованы, чтобы избежать отсутствия переводов.

Этот документ фокусируется на интеграции хука `useDictionary`, предоставляя упрощенный подход к управлению локализованным контентом без зависимости от функциональности визуального редактора.
