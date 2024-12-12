# React Интеграция: Документация по хуку `useIntlayer`

Этот раздел предоставляет подробные инструкции по использованию хука `useIntlayer` в приложениях React, что позволяет эффективно локализовать контент.

## Импорт `useIntlayer` в React

Хук `useIntlayer` можно интегрировать в приложения React, импортируя его в зависимости от контекста:

- **Клиентский Компонент:**

  ```javascript
  import { useIntlayer } from "react-intlayer"; // Используется в клиентских компонентах React
  ```

- **Серверный Компонент:**

  ```javascript
  import { useIntlayer } from "react-intlayer/server"; // Используется в серверных компонентах React
  ```

## Параметры

Хук принимает два параметра:

1. **`key`**: Ключ словаря для получения локализованного контента.
2. **`locale`** (необязательно): Желаемая локаль. По умолчанию используется локаль контекста, если не указана.

## Объявление контента

Все ключи словаря должны быть объявлены в файлах объявления контента для повышения безопасности типов и избежания ошибок. Вы можете найти инструкции по настройке [здесь](https://github.com/aymericzip/intlayer/blob/main/docs/ru/content_declaration/get_started.md).

## Пример использования в React

Демонстрация хука `useIntlayer` внутри компонента React:

```tsx
// src/pages/[locale]/index.tsx

import { ClientComponentExample, ServerComponentExample } from "@components";
import { IntlayerProvider } from "react-intlayer";
import { useIntlayer, IntlayerServerProvider } from "react-intlayer/server";
import { type FC } from "react";
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

```tsx
// src/components/ClientComponentExample.tsx

import { useIntlayer } from "react-intlayer";

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

## Обработка атрибутов

При локализации атрибутов, получайте значения контента соответствующим образом:

```tsx
<button title={content.buttonTitle.value}>{content.buttonText}</button>
```

## Дополнительные ресурсы

- **Intlayer Визуальный Редактор**: Для более интуитивного опыта управления контентом, обратитесь к документации визуального редактора [здесь](https://github.com/aymericzip/intlayer/blob/main/docs/ru/intlayer_editor.md).

Этот раздел специально нацелен на интеграцию хука `useIntlayer` в приложения React, упрощая процесс локализации и обеспечивая согласованность контента в разных локалях.
