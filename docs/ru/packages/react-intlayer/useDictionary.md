# Интеграция React: Документация по хуку `useDictionary`

Этот раздел предоставляет подробные инструкции по использованию хука `useDictionary` в приложениях React, что позволяет эффективно управлять локализованным контентом без визуального редактора.

## Импорт `useDictionary` в React

Хук `useDictionary` можно интегрировать в приложения React, импортируя его в зависимости от контекста:

- **Клиентский компонент:**

  ```javascript
  import { useDictionary } from "react-intlayer"; // Используется в клиентских компонентах React
  ```

- **Серверный компонент:**

  ```javascript
  import { useDictionary } from "react-intlayer/server"; // Используется в серверных компонентах React
  ```

## Параметры

Хук принимает два параметра:

1. **`dictionary`**: Объявленный объект словаря, содержащий локализованный контент для конкретных ключей.
2. **`locale`** (необязательно): Желаемая локаль. По умолчанию используется локаль текущего контекста, если не указано.

## Объявление контента

Все объекты словаря должны быть объявлены в структурированных файлах контента, чтобы обеспечить безопасность типов и избежать ошибок времени выполнения. Инструкции по настройке можно найти [здесь](https://github.com/aymericzip/intlayer/blob/main/docs/ru/content_declaration/get_started.md). Вот пример объявления контента:

```typescript
// ./component.content.ts

import { t, type DeclarationContent } from "intlayer";

const clientComponentExampleContent = {
  key: "client-component-example",
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

export default clientComponentExampleContent;
```

## Пример использования в React

Ниже приведен пример того, как использовать хук `useDictionary` в компоненте React:

```tsx
// ./ClientComponentExample.tsx

import { useDictionary } from "react-intlayer";
import clientComponentExampleContent from "./component.content";

const ClientComponentExample = () => {
  const { title, content } = useDictionary(clientComponentExampleContent);

  return (
    <div>
      <h1>{title}</h1>
      <p>{content}</p>
    </div>
  );
};

export default ClientComponentExample;
```

## Серверная интеграция

Если вы используете хук `useDictionary` вне `IntlayerProvider`, локаль должна быть явно указана в качестве параметра при рендеринге компонента:

```tsx
import { useDictionary } from "react-intlayer/server";
import clientComponentExampleContent from "./component.content";

const ServerComponentExample = ({ locale }: { locale: string }) => {
  const { content } = useDictionary(clientComponentExampleContent, locale);

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.content}</p>
    </div>
  );
};

export default ServerComponentExample;
```

## Примечания по атрибутам

В отличие от интеграций с использованием визуальных редакторов, атрибуты, такие как `buttonTitle.value`, здесь не применяются. Вместо этого получайте доступ к локализованным строкам так, как они объявлены в вашем контенте.

```tsx
<button title={content.title}>{content.content}</button>
```

## Дополнительные советы

- **Безопасность типов**: Всегда используйте `DeclarationContent` для определения ваших словарей, чтобы обеспечить безопасность типов.
- **Обновления локализации**: При обновлении контента убедитесь, что все локали согласованы, чтобы избежать отсутствующих переводов.

Эта документация фокусируется на интеграции хука `useDictionary`, предоставляя упрощенный подход к управлению локализованным контентом без необходимости полагаться на функциональные возможности визуального редактора.
