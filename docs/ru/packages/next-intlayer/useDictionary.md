# Интеграция React: Документация хука `useDictionary`

Этот раздел предоставляет подробные инструкции по использованию хука `useDictionary` в приложениях React, позволяя эффективно управлять локализованным контентом без визуального редактора.

## Импортирование `useDictionary` в React

Хук `useDictionary` можно интегрировать в приложения React, импортировав его в зависимости от контекста:

- **Клиентский компонент:**

  ```javascript
  import { useDictionary } from "next-intlayer"; // Используется в клиентских компонентах React
  ```

- **Серверный компонент:**

  ```javascript
  import { useDictionary } from "next-intlayer/server"; // Используется в серверных компонентах React
  ```

## Параметры

Хук принимает два параметра:

1. **`dictionary`**: Объект словаря, содержащий локализованный контент для конкретных ключей.
2. **`locale`** (по желанию): Желаемая локаль. По умолчанию используется локаль текущего контекста, если не указана.

## Объявление контента

Все объекты словаря должны быть объявлены в структурированных файлах контента для обеспечения безопасности типов и предотвращения ошибок во время выполнения. Вы можете найти инструкции по настройке [здесь](https://github.com/aymericzip/intlayer/blob/main/docs/ru/content_declaration/get_started.md). Вот пример объявления контента:

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

import { useDictionary } from "next-intlayer";
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

## Интеграция на сервере

Если вы используете хук `useDictionary` вне `IntlayerServerProvider`, локаль должна быть явно указана в качестве параметра при рендеринге компонента:

```tsx
import { useDictionary } from "next-intlayer/server";
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

В отличие от интеграций с использованием визуальных редакторов, такие атрибуты, как `buttonTitle.value`, здесь не применяются. Вместо этого обращайтесь к локализованным строкам напрямую, как объявлено в вашем контенте.

```tsx
<button title={content.title}>{content.content}</button>
```

## Дополнительные советы

- **Безопасность типов**: Всегда используйте `DeclarationContent` для определения ваших словарей, чтобы обеспечить безопасность типов.
- **Обновления локализации**: При обновлении контента убедитесь, что все локали согласованы, чтобы избежать отсутствующих переводов.

Эта документация сосредоточена на интеграции хука `useDictionary`, предоставляя оптимизированный подход к управлению локализованным контентом без reliance on визуальными функциональными редакторами.
