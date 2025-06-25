---
docName: package__next-intlayer__useIntlayer
url: /doc/packages/next-intlayer/useIntlayer
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/en/packages/next-intlayer/useIntlayer.md
createdAt: 2024-08-11
updatedAt: 2024-08-11
title: Документация по хуку useIntlayer | next-intlayer
description: Узнайте, как использовать хук useIntlayer для пакета next-intlayer
keywords:
  - useIntlayer
  - словарь
  - ключ
  - Intlayer
  - Интернационализация
  - Документация
  - Next.js
  - JavaScript
  - React
---

# Интеграция Next.js: Документация по хуку `useIntlayer`

Хук `useIntlayer` разработан для приложений Next.js, чтобы эффективно получать и управлять локализованным контентом. Эта документация сосредоточена на том, как использовать хук в проектах Next.js, обеспечивая правильные практики локализации.

## Импорт `useIntlayer` в Next.js

В зависимости от того, работаете ли вы с клиентскими или серверными компонентами в приложении Next.js, вы можете импортировать хук `useIntlayer` следующим образом:

- **Клиентский компонент:**

  ```typescript codeFormat="typescript"
  import { useIntlayer } from "next-intlayer"; // Используется в клиентских компонентах
  ```

  ```javascript codeFormat="esm"
  import { useIntlayer } from "next-intlayer"; // Используется в клиентских компонентах
  ```

  ```javascript codeFormat="commonjs"
  const { useIntlayer } = require("next-intlayer"); // Используется в клиентских компонентах
  ```

- **Серверный компонент:**

  ```tsx codeFormat="typescript"
  import { useIntlayer } from "next-intlayer/server"; // Используется в серверных компонентах
  ```

  ```javascript codeFormat="esm"
  import { useIntlayer } from "next-intlayer/server"; // Используется в серверных компонентах
  ```

  ```javascript codeFormat="commonjs"
  const { useIntlayer } = require("next-intlayer/server"); // Используется в серверных компонентах
  ```

## Параметры

1. **`key`**: Строковый идентификатор для ключа словаря, из которого вы хотите получить контент.
2. **`locale`** (опционально): Конкретная локаль для использования. Если не указано, хук по умолчанию использует локаль, установленную в клиентском или серверном контексте.

## Файлы словаря

Важно, чтобы все ключи контента были определены в файлах декларации контента, чтобы избежать ошибок во время выполнения и обеспечить безопасность типов. Этот подход также упрощает интеграцию с TypeScript для проверки на этапе компиляции.

Инструкции по настройке файлов декларации контента доступны [здесь](https://github.com/aymericzip/intlayer/blob/main/docs/ru/dictionary/get_started.md).

## Пример использования в Next.js

Вот как вы можете реализовать хук `useIntlayer` на странице Next.js для динамической загрузки локализованного контента на основе текущей локали приложения:

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

## Обработка локализации атрибутов

Чтобы локализовать атрибуты, такие как `alt`, `title`, `href`, `aria-label` и т.д., убедитесь, что вы правильно ссылаетесь на контент:

```tsx
<img src={content.image.src.value} alt={content.image.alt.value} />
```

## Дополнительная информация

- **Визуальный редактор Intlayer**: Узнайте, как использовать визуальный редактор для упрощения управления контентом [здесь](https://github.com/aymericzip/intlayer/blob/main/docs/ru/intlayer_visual_editor.md).

Эта документация описывает использование хука `useIntlayer` специально в среде Next.js, предоставляя надежное решение для управления локализацией в ваших приложениях Next.js.
