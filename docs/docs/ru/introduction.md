---
docName: introduction
url: https://intlayer.org/doc/get-started
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/introduction.md
createdAt: 2024-08-11
updatedAt: 2024-08-11
title: Введение
description: Узнайте, как работает Intlayer. Посмотрите шаги, которые использует Intlayer в вашем приложении. Узнайте, что делают разные пакеты.
keywords:
  - Введение
  - Начать
  - Intlayer
  - Приложение
  - Пакеты
---

# Intlayer Документация

Добро пожаловать в официальную документацию Intlayer! Здесь вы найдете все, что нужно для интеграции, настройки и освоения Intlayer для всех ваших потребностей в интернационализации (i18n), будь то работа с Next.js, React, Vite, Express или другой средой JavaScript.

## Введение

### Что такое Intlayer?

**Intlayer** , это библиотека интернационализации, разработанная специально для JavaScript-разработчиков. Она позволяет объявлять ваш контент в любом месте вашего кода. Она преобразует объявления многоязычного контента в структурированные словари, которые легко интегрируются в ваш код. Используя TypeScript, **Intlayer** делает вашу разработку более надежной и эффективной.

Intlayer также предоставляет опциональный визуальный редактор, который позволяет легко редактировать и управлять вашим контентом. Этот редактор особенно полезен для разработчиков, которые предпочитают визуальный интерфейс для управления контентом, или для команд, создающих контент без необходимости беспокоиться о коде.

### Пример использования

```bash codeFormat="typescript"
.
└── Components
    └── MyComponent
        ├── index.content.ts
        └── index.tsx
```

```bash codeFormat="commonjs"
.
└── Components
    └── MyComponent
        ├── index.content.cjs
        └── index.mjs
```

```bash codeFormat="esm"
.
└── Components
    └── MyComponent
        ├── index.content.mjs
        └── index.js
```

```tsx fileName="src/components/MyComponent/index.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const componentContent = {
  key: "component-key",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
      ru: "Привет, мир",
    }),
  },
} satisfies Dictionary;

export default componentContent;
```

```javascript fileName="src/components/MyComponent/index.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const componentContent = {
  key: "component-key",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
      ru: "Привет, мир",
    }),
  },
};

export default componentContent;
```

```javascript fileName="src/components/MyComponent/index.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const componentContent = {
  key: "component-key",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
      ru: "Привет, мир",
    }),
  },
};

module.exports = componentContent;
```

```json fileName="src/components/MyComponent/index.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "component-key",
  "content": {
    "myTranslatedContent": {
      "nodeType": "translation",
      "translation": {
        "en": "Hello World",
        "fr": "Bonjour le monde",
        "es": "Hola Mundo",
        "ru": "Привет, мир"
      }
    }
  }
}
```

```tsx fileName="src/components/MyComponent/index.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

export const MyComponent: FC = () => {
  const { myTranslatedContent } = useIntlayer("component-key");

  return <span>{myTranslatedContent}</span>;
};
```

```jsx fileName="src/components/MyComponent/index.mjx" codeFormat="esm"
import { useIntlayer } from "react-intlayer";

const MyComponent = () => {
  const { myTranslatedContent } = useIntlayer("component-key");

  return <span>{myTranslatedContent}</span>;
};
```

```jsx fileName="src/components/MyComponent/index.csx" codeFormat="commonjs"
const { useIntlayer } = require("react-intlayer");

const MyComponent = () => {
  const { myTranslatedContent } = useIntlayer("component-key");

  return <span>{myTranslatedContent}</span>;
};
```

## Основные функции

Intlayer предлагает множество функций, адаптированных к потребностям современной веб-разработки. Ниже приведены ключевые функции с ссылками на подробную документацию для каждой:

- **Поддержка интернационализации**: Расширьте глобальный охват вашего приложения с помощью встроенной поддержки интернационализации.
- **Визуальный редактор**: Улучшите свой рабочий процесс разработки с помощью плагинов редактора, разработанных для Intlayer. Ознакомьтесь с [Руководством по визуальному редактору](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_visual_editor.md).
- **Гибкость настройки**: Настройте свою конфигурацию с помощью обширных опций, описанных в [Руководстве по настройке](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/configuration.md).
- **Расширенные инструменты CLI**: Эффективно управляйте своими проектами с помощью интерфейса командной строки Intlayer. Изучите возможности в [Документации по CLI инструментам](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_cli.md).

## Основные концепции

### Словарь

Организуйте свой многоязычный контент рядом с вашим кодом, чтобы сохранить все последовательным и удобным для поддержки.

- **[Начало работы](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dictionary/get_started.md)**  
  Узнайте основы объявления контента в Intlayer.

- **[Перевод](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dictionary/translation.md)**  
  Поймите, как переводы создаются, хранятся и используются в вашем приложении.

- **[Перечисления](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dictionary/enumeration.md)**  
  Легко управляйте повторяющимися или фиксированными наборами данных на разных языках.

- **[Функциональная выборка](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dictionary/function_fetching.md)**  
  Узнайте, как динамически извлекать контент с помощью пользовательской логики, чтобы соответствовать рабочему процессу вашего проекта.

### Среды и интеграции

Мы разработали Intlayer с учетом гибкости, предлагая бесшовную интеграцию с популярными фреймворками и инструментами сборки:

- **[Intlayer с Next.js 15](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_with_nextjs_15.md)**
- **[Intlayer с Next.js 14 (App Router)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_with_nextjs_14.md)**
- **[Intlayer с Next.js Page Router](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_with_nextjs_page_router.md)**
- **[Intlayer с React CRA](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_with_create_react_app.md)**
- **[Intlayer с Vite + React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_with_vite+react.md)**
- **[Intlayer с Express](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_with_express.md)**

Каждое руководство по интеграции включает лучшие практики использования функций Intlayer, таких как **рендеринг на стороне сервера**, **динамическая маршрутизация** или **рендеринг на стороне клиента**, чтобы вы могли поддерживать быстрое, SEO-дружественное и масштабируемое приложение.

## Участие и обратная связь

Мы ценим силу open-source и разработки, управляемой сообществом. Если вы хотите предложить улучшения, добавить новое руководство или исправить любые проблемы в нашей документации, не стесняйтесь отправить Pull Request или открыть проблему в нашем [репозитории GitHub](https://github.com/aymericzip/intlayer/blob/main/docs/docs).

**Готовы переводить ваше приложение быстрее и эффективнее?** Погрузитесь в нашу документацию, чтобы начать использовать Intlayer уже сегодня. Испытайте надежный, упрощенный подход к интернационализации, который сохраняет ваш контент организованным, а вашу команду более продуктивной.

Удачного перевода!
