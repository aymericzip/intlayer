# Интеграция React: Документация Hook'а `useDictionary`

Этот раздел предоставляет подробные рекомендации по использованию hook'а `useDictionary` в React-приложениях, позволяя эффективно обрабатывать локализованный контент без визуального редактора.

## Импортирование `useDictionary` в React

Hook `useDictionary` можно интегрировать в React-приложения, импортируя его в зависимости от контекста:

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

Hook принимает два параметра:

1. **`dictionary`**: Объявленный объект словаря, содержащий локализованный контент для конкретных ключей.
2. **`locale`** (необязательно): Желаемая локализация. По умолчанию используется локализация текущего контекста, если не указано.

## Объявление контента

Все объекты словаря должны быть объявлены в структурированных файлах контента для обеспечения безопасности типов и предотвращения ошибок во время выполнения. Вы можете найти инструкции по настройке [здесь](https://github.com/aymericzip/intlayer/blob/main/docs/ru/content_declaration/get_started.md). Вот пример объявления контента:

```typescript fileName="./component.content.ts" contentDeclarationFormat="typescript"
import { t, type DeclarationContent } from "intlayer";

// Объект контента компонента
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
} satisfies DeclarationContent;

export default componentContent;
```

```javascript fileName="./component.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').DeclarationContent} */
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

/** @type {import('intlayer').DeclarationContent} */
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

## Пример использования в React

Ниже представлен пример того, как использовать hook `useDictionary` в React-компоненте:

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

Если вы используете hook `useDictionary` вне `IntlayerProvider`, локализация должна быть явно предоставлена в качестве параметра при рендеринге компонента:

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

В отличие от интеграций с использованием визуальных редакторов, такие атрибуты, как `buttonTitle.value`, здесь не применяются. Вместо этого напрямую получайте доступ к локализованным строкам, как указано в вашем контенте.

```jsx
<button title={content.title}>{content.content}</button>
```

## Дополнительные советы

- **Безопасность типов**: Всегда используйте `DeclarationContent` для определения ваших словарей, чтобы обеспечить безопасность типов.
- **Обновления локализации**: При обновлении контента убедитесь, что все локализации согласованы, чтобы избежать пропущенных переводов.

Эта документация сосредоточена на интеграции hook'а `useDictionary`, предоставляя упрощенный подход к управлению локализованным контентом без полагания на функционал визуального редактора.
