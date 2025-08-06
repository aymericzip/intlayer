---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: Документация по хуку useI18n | react-intlayer
description: Узнайте, как использовать хук useI18n в пакете react-intlayer
keywords:
  - useI18n
  - i18n
  - перевод
  - словарь
  - Intlayer
  - интернационализация
  - документация
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - packages
  - react-intlayer
  - useI18n
---

# Интеграция с React: Документация по хуку `useI18n`

В этом разделе представлено подробное руководство по использованию хука `useI18n` в приложениях React, что позволяет эффективно локализовать контент.

## Импортирование `useI18n` в React

Хук `useI18n` можно импортировать и интегрировать в приложения React в зависимости от контекста следующим образом:

- **Клиентские компоненты:**

  ```typescript codeFormat="typescript"
  import { useI18n } from "react-intlayer"; // Используйте в клиентских React-компонентах
  ```

  ```javascript codeFormat="esm"
  import { useI18n } from "react-intlayer"; // Используйте в клиентских React-компонентах
  ```

  ```javascript codeFormat="commonjs"
  const { useI18n } = require("react-intlayer"); // Используйте в клиентских React-компонентах
  ```

- **Серверные компоненты:**

  ```typescript codeFormat="commonjs"
  import { useI18n } from "react-intlayer/server"; // Используйте в серверных React-компонентах
  ```

  ```javascript codeFormat="esm"
  import { useI18n } from "react-intlayer/server"; // Используйте в серверных React-компонентах
  ```

  ```javascript codeFormat="commonjs"
  const { useI18n } = require("react-intlayer/server"); // Используйте в серверных React-компонентах
  ```

## Параметры

Этот хук принимает два параметра:

1. **`namespace`**: Пространство имён словаря для ограничения области ключей перевода.
2. **`locale`** (необязательно): Желаемая локаль. Если не указана, по умолчанию будет использоваться локаль из контекста.

## Словарь

Все ключи словаря должны быть объявлены в файлах декларации контента для повышения безопасности типов и предотвращения ошибок. [Инструкции по настройке можно найти здесь](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dictionary/get_started.md).

## Примеры использования в React

Примеры использования хука `useI18n` в React-компонентах:

```tsx fileName="src/App.tsx" codeFormat="typescript"
import type { FC } from "react";
import { ClientComponentExample, ServerComponentExample } from "@components";
import { IntlayerProvider } from "react-intlayer";
import { useI18n, IntlayerServerProvider } from "react-intlayer/server";
import { Locales } from "intlayer";

const App: FC<{ locale: Locales }> = ({ locale }) => {
  const t = useI18n("home-page", locale);

  return (
    <>
      <p>{t("introduction")}</p>
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

```jsx fileName="src/app.jsx" codeFormat="esm"
import { ClientComponentExample, ServerComponentExample } from "@components";
import { IntlayerProvider } from "react-intlayer";
import { IntlayerServerProvider, useI18n } from "react-intlayer/server";

const App = ({ locale }) => {
  const t = useI18n("home-page", locale);

  return (
    <>
      <p>{t("introduction")}</p>
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

```jsx fileName="src/app.cjs" codeFormat="commonjs"
const { IntlayerProvider } = require("react-intlayer");
const { IntlayerServerProvider, useI18n } = require("react-intlayer/server");

const App = ({ locale }) => {
  const t = useI18n("home-page", locale);

  return (
    <>
      <p>{t("introduction")}</p>
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
import { useI18n } from "react-intlayer";

const ComponentExample: FC = () => {
  const t = useI18n("component-example");

  return (
    <div>
      <h1>{t("title")}</h1> {/* Отобразить заголовок */}
      <p>{t("description")}</p> {/* Отобразить описание */}
    </div>
  );
};
```

```jsx fileName="src/components/ComponentExample.jsx" codeFormat="esm"
import { useI18n } from "react-intlayer";

const ComponentExample = () => {
  const t = useI18n("component-example");

  return (
    <div>
      <h1>{t("title")}</h1> {/* Отобразить заголовок */}
      <p>{t("description")}</p> {/* Отобразить описание */}
    </div>
  );
};
```

```jsx fileName="src/components/ComponentExample.cjs" codeFormat="commonjs"
const { useI18n } = require("react-intlayer");

const ComponentExample = () => {
  const t = useI18n("component-example");

  return (
    <div>
      <h1>{t("title")}</h1> {/* Отобразить заголовок */}
      <p>{t("description")}</p> {/* Отобразить описание */}
    </div>
  );
};
```

```tsx fileName="src/components/ServerComponentExample.tsx" codeFormat="typescript"
import { useI18n } from "react-intlayer/server";

const ServerComponentExample = () => {
  const t = useI18n("server-component");

  return (
    <div>
      <h1>{t("title")}</h1> {/* Отобразить заголовок */}
      <p>{t("description")}</p> {/* Отобразить описание */}
    </div>
  );
};
```

```jsx fileName="src/components/ServerComponentExample.jsx" codeFormat="esm"
import { useI18n } from "react-intlayer/server";

const ServerComponentExample = () => {
  const t = useI18n("server-component");

  return (
    <div>
      <h1>{t("title")}</h1> {/* Отобразить заголовок */}
      <p>{t("description")}</p> {/* Отобразить описание */}
    </div>
  );
};
```

```jsx fileName="src/components/ServerComponentExample.cjs" codeFormat="commonjs"
const { useI18n } = require("react-intlayer/server");

const ServerComponentExample = () => {
  const t = useI18n("server-component");

  return (
    <div>
      <h1>{t("title")}</h1>
      <p>{t("description")}</p>
    </div>
  );
};
```

## Обработка атрибутов

При локализации атрибутов обращайтесь к значениям перевода соответствующим образом:

```jsx
<button title={t("buttonTitle.value")}>{t("buttonText")}</button>

<!-- Для атрибутов доступности (например, aria-label) используйте .value, так как требуются чистые строки -->
<button aria-label={t("button.ariaLabel").value}>{t("button.text")}</button>
```

## Дополнительные ресурсы

- **Визуальный редактор Intlayer**: Для более интуитивного управления контентом обратитесь к документации по визуальному редактору [здесь](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_visual_editor.md).

Этот раздел специально охватывает интеграцию хука `useI18n` в React-приложениях, упрощая процесс локализации и обеспечивая согласованность контента между различными локалями.

## История документации

- 6.0.0 - 2025-06-29: Первоначальное написание документации по хуку `useI18n`
