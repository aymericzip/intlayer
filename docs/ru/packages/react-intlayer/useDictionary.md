# Интеграция React: Документация по хуку `useDictionary`

Этот раздел предоставляет подробное руководство по использованию хука `useDictionary` в приложениях React, позволяя эффективно управлять локализованным контентом без визуального редактора.

## Импорт `useDictionary` в React

Хук `useDictionary` может быть интегрирован в приложения React путем импорта в зависимости от контекста:

- **Клиентский компонент:**

  ```typescript codeFormat="typescript"
  import { useDictionary } from "react-intlayer"; // Используется в клиентских компонентах React
  ```

  ```javascript codeFormat="esm"
  import { useDictionary } from "react-intlayer"; // Используется в клиентских компонентах React
  ```

  ```javascript codeFormat="commonjs"
  const { useDictionary } = require("react-intlayer"); // Используется в клиентских компонентах React
  ```

- **Серверный компонент:**

  ```typescript codeFormat="typescript"
  import { useDictionary } from "react-intlayer/server"; // Используется в серверных компонентах React
  ```

  ```javascript codeFormat="esm"
  import { useDictionary } from "react-intlayer/server"; // Используется в серверных компонентах React
  ```

  ```javascript codeFormat="commonjs"
  const { useDictionary } = require("react-intlayer/server"); // Используется в серверных компонентах React
  ```

## Параметры

Хук принимает два параметра:

1. **`dictionary`**: Объявленный объект словаря, содержащий локализованный контент для определенных ключей.
2. **`locale`** (необязательно): Желаемая локаль. По умолчанию используется локаль текущего контекста, если не указано.

## Словарь

Все объекты словаря должны быть объявлены в структурированных файлах контента для обеспечения безопасности типов и предотвращения ошибок во время выполнения. Инструкции по настройке можно найти [здесь](https://github.com/aymericzip/intlayer/blob/main/docs/ru/dictionary/get_started.md). Вот пример объявления контента:

```typescript fileName="./component.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const componentContent = {
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

Ниже приведен пример использования хука `useDictionary` в компоненте React:

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

Если вы используете хук `useDictionary` вне `IntlayerProvider`, локаль должна быть явно указана в качестве параметра при рендеринге компонента:

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

## Заметки по атрибутам

В отличие от интеграций с использованием визуальных редакторов, такие атрибуты, как `buttonTitle.value`, здесь не применяются. Вместо этого напрямую используйте локализованные строки, как они объявлены в вашем контенте.

```jsx
<button title={content.title}>{content.content}</button>
```

## Дополнительные советы

- **Безопасность типов**: Всегда используйте `Dictionary` для определения ваших словарей, чтобы обеспечить безопасность типов.
- **Обновления локализации**: При обновлении контента убедитесь, что все локали согласованы, чтобы избежать отсутствия переводов.

Эта документация сосредоточена на интеграции хука `useDictionary`, предоставляя упрощенный подход к управлению локализованным контентом без использования функционала визуального редактора.
