---
docName: package__react-intlayer__useDictionary
url: https://intlayer.org/doc/package/react-intlayer/useDictionary
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/react-intlayer/useDictionary.md
createdAt: 2025-02-07
updatedAt: 2025-06-29
title: Хук useDictionary - Документация React Intlayer
description: Полное руководство по использованию хука useDictionary в React-приложениях с Intlayer для эффективной работы с локализованным контентом без визуального редактора.
keywords:
  - useDictionary
  - React
  - хук
  - intlayer
  - локализация
  - i18n
  - словарь
  - перевод
---

# Интеграция с React: Документация по хуку `useDictionary`

Этот раздел предоставляет подробные инструкции по использованию хука `useDictionary` в React-приложениях, позволяя эффективно работать с локализованным контентом без визуального редактора.

## Импортирование `useDictionary` в React

Хук `useDictionary` можно интегрировать в React-приложения, импортируя его в зависимости от контекста:

- **Клиентский компонент:**

  ```typescript codeFormat="typescript"
  import { useDictionary } from "react-intlayer"; // Используется в клиентских React-компонентах
  ```

  ```javascript codeFormat="esm"
  import { useDictionary } from "react-intlayer"; // Используется в клиентских React-компонентах
  ```

  ```javascript codeFormat="commonjs"
  const { useDictionary } = require("react-intlayer"); // Используется в клиентских React-компонентах
  ```

- **Серверный компонент:**

  ```typescript codeFormat="typescript"
  import { useDictionary } from "react-intlayer/server"; // Используется в серверных React-компонентах
  ```

  ```javascript codeFormat="esm"
  import { useDictionary } from "react-intlayer/server"; // Используется в серверных React-компонентах
  ```

  ```javascript codeFormat="commonjs"
  const { useDictionary } = require("react-intlayer/server"); // Используется в серверных React-компонентах
  ```

## Параметры

Хук принимает два параметра:

1. **`dictionary`**: Объявленный объект словаря, содержащий локализованный контент для определённых ключей.
2. **`locale`** (необязательный): Желаемая локаль. По умолчанию используется локаль текущего контекста.

## Словарь

Все объекты словарей должны быть объявлены в структурированных файлах контента для обеспечения типобезопасности и предотвращения ошибок во время выполнения. Вы можете найти [инструкции по настройке здесь](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dictionary/get_started.md). Вот пример объявления контента:

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
      ru: "Пример клиентского компонента", // комментарий на русском
    }),
    content: t({
      en: "This is the content of a client component example",
      fr: "Ceci est le contenu d'un exemple de composant client",
      es: "Este es el contenido de un ejemplo de componente cliente",
      ru: "Это содержимое примера клиентского компонента", // комментарий на русском
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
        "ru": "Пример клиентского компонента"
      }
    },
    "content": {
      "nodeType": "translation",
      "translation": {
        "en": "This is the content of a client component example",
        "fr": "Ceci est le contenu d'un exemple de composant client",
        "es": "Este es el contenido de un ejemplo de componente cliente",
        "ru": "Это содержимое примера клиентского компонента"
      }
    }
  }
}
```

## Пример использования в React

Ниже приведён пример использования хука `useDictionary` в React-компоненте:

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

## Интеграция на сервере

Если вы используете хук `useDictionary` вне `IntlayerProvider`, локаль должна быть явно передана в качестве параметра при рендеринге компонента:

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

## Примечания по атрибутам

В отличие от интеграций с визуальными редакторами, такие атрибуты, как `buttonTitle.value`, здесь не применяются. Вместо этого напрямую обращайтесь к локализованным строкам, как они объявлены в вашем контенте.

```jsx
<button title={content.title}>{content.content}</button>
```

## Дополнительные советы

- **Типобезопасность**: Всегда используйте `Dictionary` для определения ваших словарей, чтобы обеспечить типобезопасность.
- **Обновления локализации**: При обновлении контента убедитесь, что все локали согласованы, чтобы избежать отсутствующих переводов.

Данная документация сосредоточена на интеграции хука `useDictionary`, предоставляя упрощённый подход к управлению локализованным контентом без зависимости от функционала визуального редактора.

## История документации

- 5.5.10 - 2025-06-29: Инициализация истории
