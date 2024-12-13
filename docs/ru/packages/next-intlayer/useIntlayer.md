# Интеграция Next.js: Документация по хуку `useIntlayer`

Хук `useIntlayer` предназначен для приложений Next.js для эффективного получения и управления локализованным контентом. Эта документация сосредоточится на том, как использовать хук в проектах Next.js, обеспечивая надлежащие практики локализации.

## Импорт `useIntlayer` в Next.js

В зависимости от того, работаете ли вы с компонентами на стороне клиента или сервера в приложении Next.js, вы можете импортировать хук `useIntlayer` следующим образом:

- **Компонент клиента:**

  ```javascript
  import { useIntlayer } from "next-intlayer"; // Используется в компонентах на стороне клиента
  ```

- **Компонент сервера:**

  ```tsx
  import { useIntlayer } from "next-intlayer/server"; // Используется в компонентах на стороне сервера
  ```

## Параметры

1. **`key`**: Строковый идентификатор для ключа словаря, из которого вы хотите получить контент.
2. **`locale`** (по желанию): Конкретная локализация для использования. Если не указана, хук по умолчанию использует локализацию, установленную в контексте клиента или сервера.

## Файлы декларации контента

Крайне важно, чтобы все ключи контента были определены внутри файлов декларации контента, чтобы предотвратить ошибки во время выполнения и обеспечить безопасность типов. Этот подход также облегчает интеграцию TypeScript для валидации во время компиляции.

Инструкции по настройке файлов декларации контента доступны [здесь](https://github.com/aymericzip/intlayer/blob/main/docs/ru/content_declaration/get_started.md).

## Пример использования в Next.js

Вот как вы можете реализовать хук `useIntlayer` внутри страницы Next.js для динамической загрузки локализованного контента на основе текущей локализации приложения:

```tsx
// src/pages/[locale]/index.tsx

import { ClientComponentExample, ServerComponentExample } from "@components";
import { type NextPageIntlayer, IntlayerClientProvider } from "next-intlayer";
import { useIntlayer, IntlayerServerProvider } from "next-intlayer/server";

const HomePage: NextPageIntlayer = async ({ params }) => {
  const { locale } = await params;
  return (
  const content = useIntlayer("homepage", locale);

  return (
    <>
      <p>{content.introduction}</p>
      <IntlayerClientProvider locale={locale}>
        <ClientComponentExample />
      </IntlayerClientProvider>
      <IntlayerServerProvider locale={locale}>
        <ServerComponentExample />
      </IntlayerServerProvider>
    </>
  );
};
```

```tsx
// src/components/ClientComponentExample.tsx

"use-client";

import { useIntlayer } from "next-intlayer";

const ClientComponentExample = () => {
  const content = useIntlayer("client-component");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
};
```

```tsx
// src/components/ServerComponentExample.tsx

import { useIntlayer } from "next-intlayer/server";

const ServerComponentExample = () => {
  const content = useIntlayer("server-component");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
};
```

## Обработка локализации атрибутов

Чтобы локализовать атрибуты, такие как `alt`, `title`, `href`, `aria-label` и т. д., убедитесь, что вы правильно ссылаетесь на контент:

```tsx
<img src={content.image.src.value} alt={content.image.alt.value} />
```

## Дополнительная информация

- **Визуальный редактор Intlayer**: Узнайте, как использовать визуальный редактор для более простого управления контентом [здесь](https://github.com/aymericzip/intlayer/blob/main/docs/ru/intlayer_editor.md).

Эта документация описывает использование хука `useIntlayer` специально в средах Next.js, предоставляя надежное решение для управления локализацией в ваших приложениях Next.js.
