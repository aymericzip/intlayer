---
createdAt: 2025-08-23
updatedAt: 2025-08-23
title: Введение
description: Узнайте, как работает Intlayer. Ознакомьтесь с этапами, которые использует Intlayer в вашем приложении. Узнайте, для чего предназначены различные пакеты.
keywords:
  - Введение
  - Начало работы
  - Intlayer
  - Приложение
  - Пакеты
slugs:
  - doc
  - get-started
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: "Init history"
---

# Документация Intlayer

Добро пожаловать в официальную документацию Intlayer! Здесь вы найдете всё необходимое для интеграции, настройки и освоения Intlayer для всех ваших задач интернационализации (i18n), независимо от того, работаете ли вы с Next.js, React, Vite, Express или в другой среде JavaScript.

## Введение

### Что такое Intlayer?

**Intlayer** — это библиотека интернационализации, разработанная специально для JavaScript-разработчиков. Она позволяет объявлять ваш контент в любом месте вашего кода. Она преобразует объявление многоязычного контента в структурированные словари для легкой интеграции в ваш код. Использование TypeScript делает **Intlayer** более надежным и эффективным инструментом для вашей разработки.

Intlayer также предоставляет опциональный визуальный редактор, который позволяет легко редактировать и управлять вашим контентом. Этот редактор особенно полезен для разработчиков, предпочитающих визуальный интерфейс для управления контентом, или для команд, создающих контент без необходимости беспокоиться о коде.

### Пример использования

```bash
.
└── Components
    └── MyComponent
        ├── index.content.ts
        └── index.tsx
```

```tsx fileName="src/components/MyComponent/index.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const componentContent = {
  key: "component-key",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      es: "Hola Mundo",
      fr: "Bonjour le monde",
      ru: "Привет мир",
    }),
  },
} satisfies Dictionary;

export default componentContent;
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
        "ru": "Привет мир"
      }
    }
  }
}
```

```tsx fileName="src/components/MyComponent/index.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

export const MyComponent: FC = () => {
  const { myTranslatedContent } = useIntlayer("component-key");

  return <span>{myTranslatedContent}</span>;
};
```

### Почему Intlayer лучше альтернатив?

По сравнению с основными решениями, такими как `next-intl` или `i18next`, Intlayer — это решение, в котором изначально присутствуют интегрированные оптимизации, такие как:

<AccordionGroup>

<Accordion header="Размер сборки (Bundle size)">

Вместо того чтобы загружать массивные JSON-файлы на свои страницы, загружайте только необходимый контент. Intlayer помогает **сократить размер ваших сборок и страниц до 50%**.

</Accordion>

<Accordion header="Простота обслуживания (Maintainability)">

Локализация контента рядом с компонентами вашего приложения **облегчает обслуживание** крупномасштабных приложений. Вы можете дублировать или удалить папку отдельной функции без необходимости проверять всю кодовую базу контента. Кроме того, Intlayer является **полностью типизированным (fully typed)**, чтобы гарантировать точность вашего контента.

</Accordion>

<Accordion header="AI Agent (ИИ Агенты)">

Совместное размещение контента **сокращает контекст, необходимый** для больших языковых моделей (LLMs). Intlayer также поставляется с набором инструментов, таких как **CLI** для проверки отсутствующих переводов, **[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/lsp.md)**, **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/mcp_server.md)** и **[навыки для агентов (agent skills)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/agent_skills.md)**, чтобы сделать процесс разработки (DX) еще более плавным для ИИ-агентов.

</Accordion>

<Accordion header="Автоматизация (Automation)">

Используйте автоматизацию для перевода в вашем CI/CD конвейере с помощью выбранной вами LLM по стоимости вашего провайдера ИИ. Intlayer также предлагает **компилятор (compiler)** для автоматизации извлечения контента, а также [веб-платформу](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_CMS.md), чтобы помочь **переводить в фоновом режиме**.

</Accordion>

<Accordion header="Производительность (Performance)">

Подключение массивных JSON-файлов к компонентам может привести к проблемам с производительностью и реактивностью. Intlayer оптимизирует загрузку вашего контента во время сборки (build time).

</Accordion>

<Accordion header="Масштабируемость без участия разработчиков (Scaling with non-dev)">

Intlayer — это больше, чем просто i18n-решение. Он предоставляет **[визуальный редактор (visual editor)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_visual_editor.md)**, который можно развернуть самостоятельно (self-hosted), и **[полноценную CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_CMS.md)**, чтобы помочь вам управлять вашим многоязычным контентом в **реальном времени**, делая сотрудничество с переводчиками, копирайтерами и другими членами команды бесшовным. Контент может храниться локально и/или удаленно.

</Accordion>
</AccordionGroup>

## Основные возможности

Intlayer предлагает множество функций, адаптированных для нужд современной веб-разработки. Ниже приведены ключевые функции со ссылками на подробную документацию по каждой из них:

- **Поддержка интернационализации**: Увеличьте глобальный охват вашего приложения с помощью встроенной поддержки интернационализации.
- **Визуальный редактор**: Улучшите свой рабочий процесс разработки с помощью плагинов редактора, разработанных для Intlayer. Ознакомьтесь с [Руководством по визуальному редактору](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_visual_editor.md).
- **Гибкость конфигурации**: Настройте свою среду с помощью широких возможностей конфигурации, подробно описанных в [Руководстве по настройке](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/configuration.md).
- **Продвинутые CLI-инструменты**: Эффективно управляйте своими проектами с помощью интерфейса командной строки Intlayer. Изучите возможности в [Документации по инструментам CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/cli/index.md).

## Основные концепции

### Словарь (Dictionary)

Организуйте свой многоязычный контент рядом с кодом, чтобы все было согласованно и удобно для обслуживания.

- **[Начало работы](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dictionary/content_file.md)**  
  Изучите основы объявления вашего контента в Intlayer.

- **[Перевод (Translation)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dictionary/translation.md)**  
  Поймите, как переводы генерируются, хранятся и используются в вашем приложении.

- **[Перечисление (Enumeration)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dictionary/enumeration.md)**  
  Легко управляйте повторяющимися или фиксированными наборами данных на разных языках.

- **[Условие (Condition)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dictionary/condition.md)**  
  Узнайте, как использовать условную логику в Intlayer для создания динамического контента.

- **[Вставка (Insertion)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dictionary/insertion.md)**  
  Узнайте, как вставлять значения в строку с помощью плейсхолдеров (маркеров вставки).

- **[Получение с помощью функций (Function Fetching)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dictionary/function_fetching.md)**  
  Посмотрите, как динамически получать контент с помощью пользовательской логики, чтобы соответствовать рабочему процессу вашего проекта.

- **[Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dictionary/markdown.md)**  
  Узнайте, как использовать Markdown в Intlayer для создания богатого контента.

- **[Встраивание файлов (File embeddings)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dictionary/file.md)**  
  Узнайте, как встраивать внешние файлы в Intlayer для их использования в редакторе контента.

- **[Вложенность (Nesting)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dictionary/nesting.md)**  
  Поймите, как вкладывать контент в Intlayer для создания сложных структур.

### Окружения и интеграции

Мы создали Intlayer с учетом гибкости, обеспечив бесшовную интеграцию в популярные фреймворки и инструменты сборки:

- **[Intlayer с Next.js 16](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_with_nextjs_16.md)**
- **[Intlayer с Next.js 15](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_with_nextjs_15.md)**
- **[Intlayer с Next.js 14 (App Router)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_with_nextjs_14.md)**
- **[Intlayer с Next.js Page Router](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_with_nextjs_page_router.md)**
- **[Intlayer с React CRA](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_with_create_react_app.md)**
- **[Intlayer с Vite + React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_with_vite+react.md)**
- **[Intlayer с React Router v7](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_with_react_router_v7.md)**
- **[Intlayer с Tanstack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_with_tanstack.md)**
- **[Intlayer с React Native и Expo](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_with_react_native+expo.md)**
- **[Intlayer с Lynx и React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_with_lynx+react.md)**
- **[Intlayer с Vite + Preact](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_with_vite+preact.md)**
- **[Intlayer с Vite + Vue](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_with_vite+vue.md)**
- **[Intlayer с Nuxt](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_with_nuxt.md)**
- **[Intlayer с Vite + Svelte](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_with_vite+svelte.md)**
- **[Intlayer с SvelteKit](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_with_svelte_kit.md)**
- **[Intlayer с Express](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_with_express.md)**
- **[Intlayer с NestJS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_with_nestjs.md)**
- **[Intlayer с Hono](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_with_hono.md)**
- **[Intlayer с Angular](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_with_angular_21.md)**

Каждое руководство по интеграции содержит лучшие практики использования функций Intlayer, такие как **рендеринг на стороне сервера (SSR)**, **динамическая маршрутизация** или **рендеринг на стороне клиента**, чтобы вы могли поддерживать быстрое, SEO-оптимизированное и высокомасштабируемое приложение.

## Участие в разработке и отзывы

Мы ценим силу open-source и разработки, управляемой сообществом. Если вы хотите предложить улучшения, добавить новое руководство или исправить какие-либо проблемы в нашей документации, смело отправляйте Pull Request или открывайте Issue в нашем [репозитории на GitHub](https://github.com/aymericzip/intlayer/blob/main/docs/docs).

**Готовы переводить свое приложение быстрее и эффективнее?** Погрузитесь в нашу документацию, чтобы начать использовать Intlayer уже сегодня. Испытайте надежный и оптимизированный подход к интернационализации, который обеспечивает организованность вашего контента и повышает продуктивность вашей команды.
