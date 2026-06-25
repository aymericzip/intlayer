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
    changes: "Инициализация истории"
author: aymericzip
---

# Интеграция с React: Документация по хуку `useIntlayer`

В этом разделе представлено подробное руководство по использованию хука `useIntlayer` в приложениях React, что позволяет эффективно локализовать контент.

## Пример использования в React

Демонстрация использования хука `useIntlayer` в React-компоненте:

```tsx fileName="src/app.tsx" codeFormat={["typescript", "esm"]}
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

```tsx fileName="src/components/ComponentExample.tsx" codeFormat={["typescript", "esm"]}
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

```tsx fileName="src/components/ServerComponentExample.tsx" codeFormat={["typescript", "esm"]}
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

## Дополнительные ресурсы

- **Визуальный редактор Intlayer**: Для более интуитивного управления контентом обратитесь к документации по визуальному редактору [здесь](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_visual_editor.md).

Этот раздел специально посвящён интеграции хука `useIntlayer` в React-приложениях, упрощая процесс локализации и обеспечивая согласованность контента между различными локалями.
