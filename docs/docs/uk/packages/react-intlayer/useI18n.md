---
createdAt: 2025-08-23
updatedAt: 2025-08-23
title: Документація хуку useI18n | react-intlayer
description: Дізнайтесь, як використовувати хук useI18n у пакеті react-intlayer
keywords:
  - useI18n
  - i18n
  - переклад
  - словник
  - Intlayer
  - інтернаціоналізація
  - документація
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - packages
  - react-intlayer
  - useI18n
history:
  - version: 6.0.0
    date: 2025-06-29
    changes: Початкове написання документації для хука `useI18n`
---

# Інтеграція з React: Документація хуку `useI18n`

Цей розділ містить детальні вказівки щодо використання хука `useI18n` у React-застосунках для ефективної локалізації контенту.

## Імпорт `useI18n` у React

Хук `useI18n` можна імпортувати та інтегрувати в React-застосунки залежно від контексту наступним чином:

- **Клієнтські компоненти:**

  ```typescript codeFormat="typescript"
  import { useI18n } from "react-intlayer"; // Використовується в клієнтських React-компонентах
  ```

  ```javascript codeFormat="esm"
  import { useI18n } from "react-intlayer"; // Використовується в клієнтських React-компонентах
  ```

  ```javascript codeFormat="commonjs"
  const { useI18n } = require("react-intlayer"); // Використовується в клієнтських React-компонентах
  ```

- **Серверні компоненти:**

  ```typescript codeFormat="commonjs"
  import { useI18n } from "react-intlayer/server"; // Використовується в серверних React-компонентах
  ```

  ```javascript codeFormat="esm"
  import { useI18n } from "react-intlayer/server"; // Використовується у серверних React-компонентах
  ```

  ```javascript codeFormat="commonjs"
  const { useI18n } = require("react-intlayer/server"); // Використовується у серверних React-компонентах
  ```

## Параметри

Цей хук приймає два параметри:

1. **`namespace`**: Простір імен словника для обмеження області ключів перекладу.
2. **`locale`** (необов'язково): Бажана локаль. Якщо не вказано, за замовчуванням буде використано локаль з контексту.

## Словник

Усі ключі словника повинні бути оголошені у файлах декларації вмісту, щоб підвищити типобезпеку та запобігти помилкам. [Інструкції з конфігурації можна знайти тут](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/content_file.md).

## Приклади використання в React

Приклади використання хуку `useI18n` у React-компонентах:

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
      <h1>{t("title")}</h1> {/* Відобразити заголовок */}
      <p>{t("description")}</p> {/* Відобразити опис */}
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
      <h1>{t("title")}</h1> {/* Відобразити заголовок */}
      <p>{t("description")}</p> {/* Відобразити опис */}
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
      <h1>{t("title")}</h1> {/* Відобразити заголовок */}
      <p>{t("description")}</p> {/* Відобразити опис */}
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
      <h1>{t("title")}</h1> {/* Відображає заголовок */}
      <p>{t("description")}</p> {/* Відображає опис */}
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
      <h1>{t("title")}</h1> {/* Відображає заголовок */}
      <p>{t("description")}</p> {/* Відображає опис */}
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

## Обробка атрибутів

При локалізації атрибутів правильно звертайтеся до значень перекладу:

```jsx
<!-- Для атрибутів доступності (наприклад, aria-label) використовуйте .value, оскільки потрібні чисті рядки -->
<button aria-label={t("button.ariaLabel").value}>{t("button.text")}</button>
```

## Додаткові ресурси

- **Intlayer Visual Editor**: Для більш інтуїтивного керування контентом зверніться до документації візуального редактора [тут](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_visual_editor.md).

У цьому розділі докладно розглядається інтеграція хука `useI18n` у React-застосунки, що спрощує процес локалізації та забезпечує узгодженість контенту між різними локалями.
