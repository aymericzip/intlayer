# Документация Intlayer

Добро пожаловать в документацию Intlayer. Этот гид предоставляет обзор Intlayer, его основных функций и как эффективно использовать эти документы для улучшения вашего опыта разработки.

## Введение

### Что такое Intlayer?

**Intlayer** — это библиотека интернационализации, специально разработанная для разработчиков JavaScript. Она позволяет объявлять ваш контент повсюду в вашем коде. Она преобразует объявления многоязычного контента в структурированные словари для легкой интеграции в ваш код. Используя TypeScript, **Intlayer** делает вашу разработку более надежной и эффективной.

Intlayer также предоставляет необязательный визуальный редактор, который позволяет вам легко редактировать и управлять вашим контентом. Этот редактор особенно полезен для разработчиков, которые предпочитают визуальный интерфейс для управления контентом, или для команд, генерирующих контент, не беспокоясь о коде.

## Пример использования

```bash
.
├── ClientComponent
│   ├── index.content.ts
│   └── index.tsx
└── ServerComponent
    ├── index.content.ts
    └── index.tsx
```

```tsx
// ./ClientComponent/index.content.ts

import { type DeclarationContent, t } from "intlayer";

const clientComponentContent = {
  key: "client-component",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
  },
} satisfies DeclarationContent;

export default clientComponentContent;
```

```tsx
// ./ClientComponent/index.tsx
"use client";

import { useIntlayer } from "next-intlayer";

export const ClientComponent = () => {
  const { myTranslatedContent } = useIntlayer("client-component");

  return <span>{myTranslatedContent}</span>;
};
```

### Основные функции

Intlayer предлагает множество функций, адаптированных для современных нужд веб-разработки. Ниже приведены ключевые функции с ссылками на детализированную документацию по каждой из них:

- **Поддержка интернационализации**: Расширьте глобальный охват вашего приложения с помощью встроенной поддержки интернационализации.
- **Визуальный редактор**: Улучшите рабочий процесс разработки с помощью плагинов редактора, разработанных для Intlayer. Ознакомьтесь с [Руководством по визуальному редактору](https://github.com/aymericzip/intlayer/blob/main/docs/ru/intlayer_editor.md).
- **Гибкость конфигурации**: Настройте вашу среду с обширными параметрами конфигурации, описанными в [Руководстве по конфигурации](https://github.com/aymericzip/intlayer/blob/main/docs/ru/configuration.md).
- **Расширенные инструменты CLI**: Эффективно управляйте вашими проектами, используя интерфейс командной строки Intlayer. Изучите функциональные возможности в [Документации по инструментам CLI](https://github.com/aymericzip/intlayer/blob/main/docs/ru/intlayer_cli.md).
- **Совместимость с i18n**: Intlayer работает без проблем с другими библиотеками интернационализации. Ознакомьтесь с [Руководством по i18n](https://github.com/aymericzip/intlayer/blob/main/docs/ru/intlayer_with_i18next.md) для получения дополнительной информации.

### Поддерживаемые платформы

Intlayer разработан для безупречной работы с приложениями Next.js и React. Он также поддерживает Vite и Create React App.

- **Интеграция с Next.js**: Используйте мощь Next.js в Intlayer для рендеринга на стороне сервера и генерации статических сайтов. Подробности доступны в нашем [Руководстве по интеграции с Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/ru/intlayer_with_nextjs_15.md).
- **Интеграция с Vite и React**: Используйте Vite в Intlayer для рендеринга на стороне сервера и генерации статических сайтов. Подробности доступны в нашем [Руководстве по интеграции с Vite и React](https://github.com/aymericzip/intlayer/blob/main/docs/ru/intlayer_with_vite+react.md).
- **Интеграция с Create React App**: Используйте мощь Create React App в Intlayer для рендеринга на стороне сервера и генерации статических сайтов. Подробности доступны в нашем [Руководстве по интеграции с Create React App](https://github.com/aymericzip/intlayer/blob/main/docs/ru/intlayer_with_create_react_app.md).

### Как использовать эту документацию

Чтобы получить максимальную пользу от этой документации:

1. **Перейдите к соответствующим разделам**: Используйте предоставленные выше ссылки, чтобы перейти непосредственно к разделам, которые соответствуют вашим потребностям.
2. **Интерактивные примеры**: Где это возможно, используйте интерактивные примеры, чтобы увидеть, как функции работают в реальном времени.
3. **Обратная связь и вклады**: Ваша обратная связь важна. Если у вас есть предложения или исправления, пожалуйста, подумайте о том, чтобы внести свой вклад в документацию.
