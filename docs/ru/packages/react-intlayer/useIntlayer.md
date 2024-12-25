# React Интеграция: Документация на Хук `useIntlayer`

Этот раздел предоставляет подробные рекомендации по использованию хука `useIntlayer` в React приложениях, позволяя эффективно локализовать контент.

## Импортирование `useIntlayer` в React

Хук `useIntlayer` можно интегрировать в React приложения, импортируя его в зависимости от контекста:

- **Клиентский Компонент:**

  ```typescript codeFormat="typescript"
  import { useIntlayer } from "react-intlayer"; // Используется в клиентских React компонентах
  ```

  ```javascript codeFormat="esm"
  import { useIntlayer } from "react-intlayer"; // Используется в клиентских React компонентах
  ```

  ```javascript codeFormat="commonjs"
  const { useIntlayer } = require("react-intlayer"); // Используется в клиентских React компонентах
  ```

- **Серверный Компонент:**

  ```typescript codeFormat="commonjs"
  import { useIntlayer } from "react-intlayer/server"; // Используется в серверных React компонентах
  ```

  ```javascript codeFormat="esm"
  import { useIntlayer } from "react-intlayer/server"; // Используется в серверных React компонентах
  ```

  ```javascript codeFormat="commonjs"
  const { useIntlayer } = require("react-intlayer/server"); // Используется в серверных React компонентах
  ```

## Параметры

Хук принимает два параметра:

1. **`key`**: Ключ словаря для получения локализованного контента.
2. **`locale`** (необязательный): Желаемая локаль. По умолчанию используется локаль контекста, если не указано.

## Объявление Контента

Все ключи словаря должны быть объявлены в файлах объявления контента для повышения безопасности типов и предотвращения ошибок. Вы можете найти инструкции по настройке [здесь](https://github.com/aymericzip/intlayer/blob/main/docs/ru/content_declaration/get_started.md).

## Пример Использования в React

Демонстрация хука `useIntlayer` внутри React компонента:

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
      <h1>{content.title}</h1>
      <p>{content.description}</p>
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
      <h1>{content.title}</h1>
      <p>{content.description}</p>
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
      <h1>{content.title}</h1>
      <p>{content.description}</p>
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
      <h1>{content.title}</h1>
      <p>{content.description}</p>
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
      <h1>{content.title}</h1>
      <p>{content.description}</p>
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
      <h1>{content.title}</h1>
      <p>{content.description}</p>
    </div>
  );
};
```

## Обработка Атрибутов

При локализации атрибутов доступ к значениям контента осуществляется правильно:

```jsx
<button title={content.buttonTitle.value}>{content.buttonText}</button>
```

## Дополнительные Ресурсы

- **Интерактивный Редактор Intlayer**: Для более интуитивного управления контентом обратитесь к документации редактора [здесь](https://github.com/aymericzip/intlayer/blob/main/docs/ru/intlayer_editor.md).

Этот раздел специально нацелен на интеграцию хука `useIntlayer` в React приложениях, упрощая процесс локализации и обеспечивая консистентность контента в разных локалях.
