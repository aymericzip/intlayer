---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: Документация по хуку useIntlayer | react-intlayer
description: Узнайте, как использовать хук useIntlayer в пакете react-intlayer
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
slugs:
  - doc
  - packages
  - react-intlayer
  - useIntlayer
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: Инициализация истории
---

# Интеграция с React: Документация по хуку `useIntlayer`

В этом разделе представлено подробное руководство по использованию хука `useIntlayer` в приложениях React, что позволяет эффективно локализовать контент.

## Импорт `useIntlayer` в React

Хук `useIntlayer` можно интегрировать в приложения React, импортируя его в зависимости от контекста:

- **Клиентский компонент:**

  ```typescript codeFormat="typescript"
  import { useIntlayer } from "react-intlayer"; // Используется в клиентских компонентах React
  ```

  ```javascript codeFormat="esm"
  import { useIntlayer } from "react-intlayer"; // Используется в клиентских компонентах React
  ```

  ```javascript codeFormat="commonjs"
  const { useIntlayer } = require("react-intlayer"); // Используется в клиентских компонентах React
  ```

- **Серверный компонент:**

  ```typescript codeFormat="commonjs"
  import { useIntlayer } from "react-intlayer/server"; // Используется в серверных компонентах React
  ```

  ```javascript codeFormat="esm"
  import { useIntlayer } from "react-intlayer/server"; // Используется в серверных компонентах React
  ```

  ```javascript codeFormat="commonjs"
  const { useIntlayer } = require("react-intlayer/server"); // Используется в серверных компонентах React
  ```

## Параметры

Хук принимает два параметра:

1. **`key`**: Ключ словаря для получения локализованного контента.
2. **`locale`** (необязательно): Желаемая локаль. По умолчанию используется локаль из контекста, если не указано.

## Словарь

Все ключи словаря должны быть объявлены в файлах декларации контента для повышения типобезопасности и избежания ошибок. Инструкции по настройке можно найти [здесь](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dictionary/get_started.md).

## Пример использования в React

Демонстрация использования хука `useIntlayer` в React-компоненте:

```tsx fileName="src/app.tsx" codeFormat="typescript"
import type { FC } from "react";
import { ClientComponentExample, ServerComponentExample } from "@components";
import { IntlayerProvider } from "react-intlayer";
import { useIntlayer, IntlayerServerProvider } from "react-intlayer/server";
import { Locales } from "intlayer";

const App: FC<{ locale: Locales }> = ({ locale }) => {
  const content = useIntlayer("homepage", locale);

  return (
    <>
      <p>{content.introduction}</p>
      <IntlayerProvider locale={locale}>
        <ClientComponentExample />
      </IntlayerProvider>
      <IntlayerServerProvider locale={locale}>
        <ServerComponentExample />
      </IntlayerServerProvider>
    </>
  );
};
```

```jsx fileName="src/app.mjx" codeFormat="esm"
import { ClientComponentExample, ServerComponentExample } from "@components";
import { IntlayerProvider } from "react-intlayer";
import { IntlayerServerProvider, useIntlayer } from "react-intlayer/server";

const App = ({ locale }) => {
  const content = useIntlayer("homepage", locale);

  return (
    <>
      <p>{content.introduction}</p>
      <IntlayerProvider locale={locale}>
        <ClientComponentExample />
      </IntlayerProvider>
      <IntlayerServerProvider locale={locale}>
        <ServerComponentExample />
      </IntlayerServerProvider>
    </>
  );
};
```

```jsx fileName="src/app.csx" codeFormat="commonjs"
const { IntlayerProvider } = require("react-intlayer");
const {
  IntlayerServerProvider,
  useIntlayer,
jsx fileName="src/app.csx" codeFormat="commonjs"
const {
  IntlayerServerProvider,
  useIntlayer,
} = require("react-intlayer/server");

const App = ({ locale }) => {
  const content = useIntlayer("homepage", locale);

  return (
    <>
      <p>{content.introduction}</p>
      <IntlayerProvider locale={locale}>
        <ClientComponentExample />
      </IntlayerProvider>
      <IntlayerServerProvider locale={locale}>
        <ServerComponentExample />
      </IntlayerServerProvider>
    </>
  );
};
```

```tsx fileName="src/components/ComponentExample.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const ComponentExample: FC = () => {
  const content = useIntlayer("component-example");

  return (
    <div>
      <h1>{content.title}</h1> {/* Заголовок компонента */}
      <p>{content.description}</p> {/* Описание компонента */}
    </div>
  );
};
```

```jsx fileName="src/components/ComponentExample.mjx" codeFormat="esm"
import { useIntlayer } from "react-intlayer";

const ComponentExample = () => {
  const content = useIntlayer("component-example");

  return (
    <div>
      <h1>{content.title}</h1> {/* Заголовок компонента */}
      <p>{content.description}</p> {/* Описание компонента */}
    </div>
  );
};
```

```jsx fileName="src/components/ComponentExample.csx" codeFormat="commonjs"
const { useIntlayer } = require("react-intlayer");

const ComponentExample = () => {
  const content = useIntlayer("component-example");

  return (
    <div>
      <h1>{content.title}</h1> {/* Заголовок компонента */}
      <p>{content.description}</p> {/* Описание компонента */}
    </div>
  );
};
```

```tsx fileName="src/components/ServerComponentExample.tsx" codeFormat="typescript"
import { useIntlayer } from "react-intlayer/server";

const ServerComponentExample = () => {
  const content = useIntlayer("server-component");

  return (
    <div>
      <h1>{content.title}</h1> {/* Заголовок компонента на сервере */}
      <p>{content.description}</p> {/* Описание компонента на сервере */}
    </div>
  );
};
```

```jsx fileName="src/components/ServerComponentExample.mjx" codeFormat="esm"
import { useIntlayer } from "react-intlayer/server";

const ServerComponentExample = () => {
  const content = useIntlayer("server-component");

  return (
    <div>
      <h1>{content.title}</h1> {/* Заголовок компонента на сервере */}
      <p>{content.description}</p> {/* Описание компонента на сервере */}
    </div>
  );
};
```

```jsx fileName="src/components/ServerComponentExample.csx" codeFormat="commonjs"
const { useIntlayer } = require("react-intlayer/server");

const ServerComponentExample = () => {
  const content = useIntlayer("server-component");

  return (
    <div>
      <h1>{content.title}</h1> {/* Заголовок компонента на сервере */}
      <p>{content.description}</p> {/* Описание компонента на сервере */}
    </div>
  );
};
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
};
```

## Обработка атрибутов

При локализации атрибутов корректно обращайтесь к значениям контента:

```jsx
<button title={content.buttonTitle.value}>{content.buttonText}</button>
```

## Дополнительные ресурсы

- **Визуальный редактор Intlayer**: Для более интуитивного управления контентом обратитесь к документации по визуальному редактору [здесь](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_visual_editor.md).

Этот раздел специально посвящён интеграции хука `useIntlayer` в React-приложениях, упрощая процесс локализации и обеспечивая согласованность контента между различными локалями.
