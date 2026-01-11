---
createdAt: 2025-08-23
updatedAt: 2025-08-23
title: Документація хуку useIntlayer | react-intlayer
description: Дізнайтеся, як використовувати хук useIntlayer у пакеті react-intlayer
keywords:
  - useIntlayer
  - dictionary
  - key
  - Intlayer
  - Internationalization
  - Documentation
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
    changes: Init history
---

# Інтеграція з React: документація хуку `useIntlayer`

У цьому розділі наведено докладні вказівки щодо використання хука `useIntlayer` у React-застосунках, що дозволяє ефективно локалізувати вміст.

## Імпорт хуку `useIntlayer` у React

Хук `useIntlayer` можна інтегрувати в React-застосунки, імпортуючи його залежно від контексту:

- **Клієнтський компонент:**

  ```typescript codeFormat="typescript"
  import { useIntlayer } from "react-intlayer"; // Використовується в клієнтських React компонентах
  ```

  ```javascript codeFormat="esm"
  import { useIntlayer } from "react-intlayer"; // Використовується в клієнтських React компонентах
  ```

  ```javascript codeFormat="commonjs"
  const { useIntlayer } = require("react-intlayer"); // Використовується в клієнтських React компонентах
  ```

- **Серверний компонент:**

  ```typescript codeFormat="commonjs"
  import { useIntlayer } from "react-intlayer/server"; // Використовується в серверних React компонентах
  ```

  ```javascript codeFormat="esm"
  import { useIntlayer } from "react-intlayer/server"; // Використовується в серверних React-компонентах
  ```

  ```javascript codeFormat="commonjs"
  const { useIntlayer } = require("react-intlayer/server"); // Використовується в серверних React-компонентах
  ```

## Параметри

Хук приймає два параметри:

1. **`key`**: Ключ словника для отримання локалізованого вмісту.
2. **`locale`** (необов'язковий): Бажана локаль. За замовчуванням використовується локаль контексту, якщо не вказано.

## Словник

Усі ключі словника повинні бути оголошені у файлах декларації контенту, щоб підвищити безпеку типів і уникнути помилок. Інструкцію з налаштування можна знайти [тут](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/content_file.md).

## Приклад використання в React

Приклад використання хука `useIntlayer` у React-компоненті:

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

## Обробка атрибутів

При локалізації атрибутів звертайтеся до значень контенту відповідним чином:

```jsx
<button title={content.buttonTitle.value}>{content.buttonText}</button>
```

## Додаткові ресурси

- **Intlayer Visual Editor**: Для інтуїтивнішого управління контентом зверніться до документації візуального редактора [тут](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_visual_editor.md).

Цей розділ спеціально присвячений інтеграції хука `useIntlayer` у React-застосунках, що спрощує процес локалізації та забезпечує узгодженість контенту між різними локалями.
