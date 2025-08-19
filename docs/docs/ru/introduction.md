---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: Введение
description: Узнайте, как работает Intlayer. Посмотрите шаги, используемые Intlayer в вашем приложении. Узнайте, что делают разные пакеты.
keywords:
  - Введение
  - Начало работы
  - Intlayer
  - Приложение
  - Пакеты
slugs:
  - doc
  - get-started
---

# Документация Intlayer

Добро пожаловать в официальную документацию Intlayer! Здесь вы найдете все необходимое для интеграции, настройки и освоения Intlayer для всех ваших задач интернационализации (i18n), будь то работа с Next.js, React, Vite, Express или другой средой JavaScript.

## Введение

### Что такое Intlayer?

**Intlayer** — это библиотека интернационализации, разработанная специально для JavaScript-разработчиков. Она позволяет объявлять ваш контент в любом месте вашего кода. Она преобразует объявления многоязычного контента в структурированные словари для легкой интеграции в ваш код. Используя TypeScript, **Intlayer** делает вашу разработку более надежной и эффективной.

Intlayer также предоставляет опциональный визуальный редактор, который позволяет легко редактировать и управлять вашим контентом. Этот редактор особенно полезен для разработчиков, предпочитающих визуальный интерфейс для управления контентом, или для команд, создающих контент без необходимости беспокоиться о коде.

### Пример использования

```bash
.
└── Components
    └── MyComponent
        ├── index.content.cjs
        └── index.mjs
```

```tsx fileName="src/components/MyComponent/index.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const componentContent = {
  key: "component-key",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      es: "Hola Mundo",
      fr: "Bonjour le monde",
    }),
  },
} satisfies Dictionary;

// Экспорт содержимого компонента по умолчанию
export default componentContent;
```

```javascript fileName="src/components/MyComponent/index.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
// Определение содержимого компонента с типом Dictionary
const componentContent = {
  key: "component-key",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      es: "Hola Mundo",
      fr: "Bonjour le monde",
    }),
  },
};

// Экспорт содержимого компонента по умолчанию
export default componentContent;
```

```javascript fileName="src/components/MyComponent/index.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
// Определение содержимого компонента с типом Dictionary
const componentContent = {
  key: "component-key",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      es: "Hola Mundo",
      fr: "Bonjour le monde",
    }),
  },
};

// Экспорт содержимого компонента
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
        "es": "Hola Mundo"
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

## Основные возможности

Intlayer предлагает множество функций, адаптированных для современных веб-разработок. Ниже приведены ключевые возможности с ссылками на подробную документацию по каждой из них:

- **Поддержка интернационализации**: Расширьте глобальный охват вашего приложения с помощью встроенной поддержки интернационализации.
- **Визуальный редактор**: Улучшите свой рабочий процесс разработки с помощью плагинов редактора, разработанных для Intlayer. Ознакомьтесь с [Руководством по визуальному редактору](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_visual_editor.md).
- **Гибкость конфигурации**: Настраивайте вашу систему с помощью обширных опций конфигурации, подробно описанных в [Руководстве по конфигурации](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/configuration.md).
- **Расширенные инструменты CLI**: Эффективно управляйте своими проектами с помощью командной строки Intlayer. Изучите возможности в [Документации по инструментам CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_cli.md).

## Основные концепции

### Словарь

Организуйте ваш многоязычный контент рядом с кодом, чтобы всё оставалось последовательным и удобным для поддержки.

- **[Начало работы](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dictionary/get_started.md)**  
  Изучите основы объявления вашего контента в Intlayer.

- **[Перевод](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dictionary/translation.md)**  
  Поймите, как создаются, хранятся и используются переводы в вашем приложении.

- **[Перечисление](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dictionary/enumeration.md)**  
  Легко управляйте повторяющимися или фиксированными наборами данных на разных языках.

- **[Условие](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dictionary/conditional.md)**  
  Узнайте, как использовать условную логику в Intlayer для создания динамического контента.

- **[Вставка](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dictionary/insertion.md)**  
  Узнайте, как вставлять значения в строку с помощью заполнителей вставки.

- **[Получение функций](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dictionary/function_fetching.md)**  
  Узнайте, как динамически получать контент с помощью пользовательской логики, чтобы соответствовать рабочему процессу вашего проекта.

- **[Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dictionary/markdown.md)**  
  Изучите, как использовать Markdown в Intlayer для создания насыщенного контента.

- **[Встраивание файлов](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dictionary/file_embeddings.md)**  
  Узнайте, как встраивать внешние файлы в Intlayer для использования их в редакторе контента.

- **[Вложенность](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dictionary/nesting.md)**  
  Поймите, как создавать вложенный контент в Intlayer для построения сложных структур.

### Окружения и интеграции

Мы создали Intlayer с учетом гибкости, предлагая бесшовную интеграцию с популярными фреймворками и инструментами сборки:

- **[Intlayer с Next.js 15](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_with_nextjs_15.md)**
- **[Intlayer с Next.js 14 (App Router)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_with_nextjs_14.md)**
- **[Intlayer с Next.js Page Router](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_with_nextjs_page_router.md)**
- **[Intlayer с React CRA](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_with_create_react_app.md)**
- **[Intlayer с Vite + React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_with_vite+react.md)**
- **[Intlayer с React Native и Expo](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_with_react_native+expo.md)**
- **[Intlayer с Lynx и React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_with_lynx+react.md)**
- **[Intlayer с Express](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_with_express.md)**

Каждое руководство по интеграции включает лучшие практики использования возможностей Intlayer, таких как **рендеринг на стороне сервера**, **динамическая маршрутизация** или **рендеринг на стороне клиента**, чтобы вы могли поддерживать быстрое, SEO-дружественное и высокомасштабируемое приложение.

## Вклад и обратная связь

Мы ценим силу открытого исходного кода и разработки, управляемой сообществом. Если вы хотите предложить улучшения, добавить новое руководство или исправить любые ошибки в нашей документации, не стесняйтесь отправить Pull Request или открыть issue в нашем [репозитории на GitHub](https://github.com/aymericzip/intlayer/blob/main/docs/docs).

**Готовы переводить ваше приложение быстрее и эффективнее?** Погрузитесь в нашу документацию и начните использовать Intlayer уже сегодня. Ощутите надежный и упрощённый подход к интернационализации, который помогает организовать ваш контент и повысить продуктивность вашей команды.

---

## История документации

- 5.5.10 - 2025-06-29: Инициализация истории
