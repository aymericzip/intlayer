---
docName: interest_of_intlayer
url: https://intlayer.org/doc/concept/interest
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/interest_of_intlayer.md
createdAt: 2024-08-14
updatedAt: 2024-08-14
title: Интерес к Intlayer
description: Узнайте о преимуществах и достоинствах использования Intlayer в ваших проектах. Поймите, почему Intlayer выделяется среди других фреймворков.
keywords:
  - Преимущества
  - Плюсы
  - Intlayer
  - Фреймворк
  - Сравнение
---

# Intlayer: Персонализированный способ перевода вашего веб-сайта

**Intlayer** - это библиотека интернационализации, специально разработанная для JavaScript-разработчиков. Она позволяет объявлять ваш контент в любом месте вашего кода. Преобразует объявление многоязычного контента в структурированные словари для легкой интеграции в ваш код. Используя TypeScript, **Intlayer** делает вашу разработку более надежной и эффективной.

## Пример использования

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

```tsx fileName="./Components/MyComponent/index.content.ts" codeFormat="typescript"
import { t, type Dictionary } from "intlayer";

const componentExampleContent = {
  key: "component-example",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
  },
} satisfies Dictionary;

export default componentExampleContent;
```

```jsx fileName="./Components/MyComponent/index.mjx" codeFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const componentExampleContent = {
  key: "component-example",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
  },
};

export default componentExampleContent;
```

```jsx fileName="./Components/MyComponent/index.csx" codeFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const componentExampleContent = {
  key: "component-example",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
  },
};

module.exports = componentExampleContent;
```

```tsx fileName="./Components/MyComponent/index.tsx" codeFormat="typescript"
import { useIntlayer } from "react-intlayer";

export const ComponentExample = () => {
  const { myTranslatedContent } = useIntlayer("component-example");

  return <span>{myTranslatedContent}</span>;
};
```

```jsx fileName="./Components/MyComponent/index.mjx" codeFormat="esm"
import { useIntlayer } from "react-intlayer";

const ComponentExample = () => {
  const { myTranslatedContent } = useIntlayer("component-example");

  return <span>{myTranslatedContent}</span>;
};
```

```jsx fileName="./Components/MyComponent/index.csx" codeFormat="commonjs"
const { useIntlayer } = require("react-intlayer");

const ComponentExample = () => {
  const { myTranslatedContent } = useIntlayer("component-example");

  return <span>{myTranslatedContent}</span>;
};
```

## Почему стоит выбрать Intlayer?

- **Управление контентом на основе JavaScript**: Используйте гибкость JavaScript для эффективного определения и управления вашим контентом.
- **Типобезопасная среда**: Используйте TypeScript для обеспечения точности и отсутствия ошибок во всех ваших определениях контента.
- **Интегрированные файлы контента**: Храните ваши переводы рядом с их соответствующими компонентами, улучшая поддерживаемость и ясность.
- **Упрощенная настройка**: Быстро начните с минимальной конфигурации, особенно оптимизированной для проектов Next.js.
- **Поддержка серверных компонентов**: Идеально подходит для серверных компонентов Next.js, обеспечивая плавный серверный рендеринг.
- **Улучшенная маршрутизация**: Полная поддержка маршрутизации приложений Next.js, идеально адаптирующаяся к сложным структурам приложений.
- **Организованная кодовая база**: Поддерживайте вашу кодовую базу более организованной: 1 компонент = 1 словарь в той же папке.
- **Автоматические типы TypeScript**: Типы TypeScript реализуются автоматически, предотвращая поломку кода из-за переименованных или удаленных ключей.
- **Автоматический перевод CI**: Автоматически заполняйте переводы в вашем CI, используя ваш собственный API-ключ OpenAI, устраняя необходимость в платформе L10n.
- **Интеграция MCP-сервера**: Предоставляет MCP (Model Context Protocol) сервер для автоматизации IDE, обеспечивая бесшовное управление контентом и i18n-процессы прямо в вашей среде разработки. [Узнать больше](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/mcp_server.md).
- **Поддержка Markdown**: Импортируйте и интерпретируйте файлы markdown для многоязычного контента, такого как политики конфиденциальности.
- **Бесплатный визуальный редактор и CMS**: Бесплатный визуальный редактор и CMS доступны, если вам нужно работать с авторами контента для ваших переводов, снова устраняя необходимость в платформе локализации и позволяя выносить контент из кодовой базы.
- **Упрощенное получение контента**: Нет необходимости вызывать вашу функцию `t` для каждой части контента; получайте весь ваш контент напрямую, используя один хук.
- **Согласованная реализация**: Одинаковая реализация для клиентских и серверных компонентов, нет необходимости передавать вашу функцию `t` через каждый серверный компонент.
- **Tree-shakable контент**: Контент является tree-shakable, делая финальный бандл легче.
- **Неблокирующий статический рендеринг**: Intlayer не блокирует статический рендеринг, как это делает `next-intl`.
- **Совместимость**: Обеспечивает совместимость с [react-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_react-i18next.md), [next-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_next-i18next.md), [next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_next-intl.md), и [react-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_react-intl.md).
