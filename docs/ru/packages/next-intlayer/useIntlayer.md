# Интеграция с Next.js: Документация для Хука `useIntlayer`

Хук `useIntlayer` предназначен для приложений Next.js для эффективной выборки и управления локализованным контентом. Эта документация сосредоточена на том, как использовать хук в проектах Next.js, обеспечивая правильные практики локализации.

## Импорт `useIntlayer` в Next.js

В зависимости от того, работаете ли вы с компонентами на стороне клиента или сервера в приложении Next.js, вы можете импортировать хук `useIntlayer` следующим образом:

- **Компонент клиента:**

  ```typescript codeFormat="typescript"
  import { useIntlayer } from "next-intlayer"; // Используется в компонентах на стороне клиента
  ```

  ```javascript codeFormat="esm"
  import { useIntlayer } from "next-intlayer"; // Используется в компонентах на стороне клиента
  ```

  ```javascript codeFormat="commonjs"
  const { useIntlayer } = require("next-intlayer"); // Используется в компонентах на стороне клиента
  ```

- **Компонент сервера:**

  ```tsx codeFormat="typescript"
  import { useIntlayer } from "next-intlayer/server"; // Используется в компонентах на стороне сервера
  ```

  ```javascript codeFormat="esm"
  import { useIntlayer } from "next-intlayer/server"; // Используется в компонентах на стороне сервера
  ```

  ```javascript codeFormat="commonjs"
  const { useIntlayer } = require("next-intlayer/server"); // Используется в компонентах на стороне сервера
  ```

## Параметры

1. **`key`**: Строковый идентификатор для ключа словаря, из которого вы хотите получить контент.
2. **`locale`** (опционально): Определенная локаль для использования. Если не указано, хук по умолчанию использует локаль, установленную в контексте клиента или сервера.

## Файлы Декларации Контента

Крайне важно, чтобы все ключи контента были определены в файлах декларации контента, чтобы предотвратить ошибки во время выполнения и обеспечить безопасность типов. Этот подход также облегчает интеграцию TypeScript для валидации на этапе компиляции.

Инструкции по настройке файлов декларации контента доступны [здесь](https://github.com/aymericzip/intlayer/blob/main/docs/ru/content_declaration/get_started.md).

## Пример Использования в Next.js

Вот как вы можете реализовать хук `useIntlayer` на странице Next.js для динамической загрузки локализованного контента в зависимости от текущей локали приложения:

```tsx fileName="src/pages/[locale]/index.tsx" codeFormat="typescript"
import { ClientComponentExample } from "@components/ClientComponentExample";
import { ServerComponentExample } from "@components/ServerComponentExample";
import { type NextPageIntlayer, IntlayerClientProvider } from "next-intlayer";
import { useIntlayer, IntlayerServerProvider } from "next-intlayer/server";

const HomePage: NextPageIntlayer = async ({ params }) => {
  const { locale } = await params;

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

```jsx fileName="src/pages/[locale]/index.csx" codeFormat="esm"
import { ClientComponentExample } from "@components/ClientComponentExample";
import { ServerComponentExample } from "@components/ServerComponentExample";
import { IntlayerClientProvider } from "next-intlayer";
import { IntlayerServerProvider, useIntlayer } from "next-intlayer/server";

const HomePage = ({ locale }) => {
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

```jsx fileName="src/components/ClientComponentExample.csx" codeFormat="commonjs"
const {
  ClientComponentExample,
} = require("@components/ClientComponentExample");
const {
  ServerComponentExample,
} = require("@components/ServerComponentExample");
const { IntlayerClientProvider } = require("next-intlayer");
const { useIntlayer } = require("next-intlayer/server");

const HomePage = ({ locale }) => {
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

```tsx fileName="src/components/ClientComponentExample.tsx" codeFormat="typescript"
"use-client";

import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

const ClientComponentExample: FC = () => {
  const content = useIntlayer("component-content");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
};
```

```jsx fileName="src/components/ClientComponentExample.msx" codeFormat="esm"
"use-client";

import { useIntlayer } from "next-intlayer";

const ServerComponentExample = () => {
  const content = useIntlayer("component-content");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
};
```

```jsx fileName="src/components/ClientComponentExample.csx" codeFormat="commonjs"
"use-client";

const { useIntlayer } = require("next-intlayer");

const ServerComponentExample = () => {
  const content = useIntlayer("component-content");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
};
```

```tsx fileName="src/components/ServerComponentExample.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "next-intlayer/server";

const ServerComponentExample: FC = () => {
  const content = useIntlayer("component-content");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
};
```

```jsx fileName="src/components/ServerComponentExample.mjx" codeFormat="esm"
import { useIntlayer } from "next-intlayer/server";

const ServerComponentExample = () => {
  const content = useIntlayer("component-content");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
};
```

```jsx fileName="src/components/ServerComponentExample.csx" codeFormat="commonjs"
const { useIntlayer } = require("next-intlayer/server");

const ServerComponentExample = () => {
  const content = useIntlayer("component-content");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
};
```

## Обработка Локализации Атрибутов

Чтобы локализовать атрибуты, такие как `alt`, `title`, `href`, `aria-label` и т. д., убедитесь, что вы правильно ссылаетесь на контент:

```tsx
<img src={content.image.src.value} alt={content.image.alt.value} />
```

## Дополнительная Информация

- **Интерактивный Редактор Intlayer**: Узнайте, как использовать визуальный редактор для более удобного управления контентом [здесь](https://github.com/aymericzip/intlayer/blob/main/docs/ru/intlayer_editor.md).

Эта документация описывает использование хука `useIntlayer` специально в среде Next.js, предоставляя надежное решение для управления локализацией в ваших приложениях Next.js.
