---
createdAt: 2025-08-23
updatedAt: 2025-08-23
title: Інструкція по використанню хуку useIntlayer | next-intlayer
description: Дізнайтеся, як використовувати хук useIntlayer для пакета next-intlayer
keywords:
  - useIntlayer
  - словник
  - ключ
  - Intlayer
  - Internationalization
  - Документація
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - packages
  - next-intlayer
  - useIntlayer
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: Ініціалізація історії
---

# Інтеграція з Next.js: документація хуку `useIntlayer`

Хук `useIntlayer` призначений для застосунків Next.js для ефективного отримання та керування локалізованим контентом. Ця документація зосереджена на тому, як використовувати хук у проектах Next.js, забезпечуючи належні практики локалізації.

## Імпорт `useIntlayer` в Next.js

Залежно від того, чи працюєте ви з компонентами на боці клієнта чи на боці сервера в додатку Next.js, хук `useIntlayer` можна імпортувати таким чином:

- **Клієнтський компонент:**

  ```typescript codeFormat="typescript"
  import { useIntlayer } from "next-intlayer"; // Використовується в компонентах на боці клієнта
  ```

  ```javascript codeFormat="esm"
  import { useIntlayer } from "next-intlayer"; // Використовується в компонентах на боці клієнта
  ```

  ```javascript codeFormat="commonjs"
  const { useIntlayer } = require("next-intlayer"); // Використовується в компонентах на боці клієнта
  ```

- **Серверний компонент:**

  ```tsx codeFormat="typescript"
  import { useIntlayer } from "next-intlayer/server"; // Використовується в компонентах на боці сервера
  ```

  ```javascript codeFormat="esm"
  import { useIntlayer } from "next-intlayer/server"; // Використовується у серверних компонентах
  ```

  ```javascript codeFormat="commonjs"
  const { useIntlayer } = require("next-intlayer/server"); // Використовується у серверних компонентах
  ```

## Параметри

1. **`key`**: Рядковий ідентифікатор ключа словника, з якого потрібно отримати вміст.
2. **`locale`** (необов'язковий): Конкретна локаль для використання. Якщо пропущено, хук за замовчуванням використовує локаль, встановлену в клієнтському або серверному контексті.

## Файли словника

Критично, щоб всі ключі вмісту були визначені у файлах декларації контенту, щоб уникнути помилок під час виконання та забезпечити безпеку типів. Такий підхід також полегшує інтеграцію з TypeScript для валідації на етапі компіляції.

Інструкції щодо налаштування файлів декларації контенту доступні [тут](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/content_file.md).

## Приклад використання в Next.js

Ось як ви можете реалізувати хук `useIntlayer` на сторінці Next.js, щоб динамічно завантажувати локалізований контент залежно від поточної локалі застосунку:

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

## Локалізація атрибутів

Щоб локалізувати атрибути, такі як `alt`, `title`, `href`, `aria-label` тощо, переконайтеся, що ви правильно посилаєтеся на вміст:

```tsx
<img src={content.image.src.value} alt={content.image.alt.value} />
```

## Додаткова інформація

- **Intlayer Visual Editor**: Дізнайтеся, як використовувати візуальний редактор для зручнішого керування контентом [тут](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_visual_editor.md).

Ця документація описує використання хуку `useIntlayer` саме в середовищах Next.js, пропонуючи надійне рішення для керування локалізацією у ваших застосунках Next.js.
