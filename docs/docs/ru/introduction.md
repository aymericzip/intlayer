---
createdAt: 2025-08-23
updatedAt: 2026-08-30
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
author: aymericzip
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

Совместное размещение контента **сокращает контекст, необходимый** для больших языковых моделей (LLMs). Intlayer также поставляется с набором инструментов, таких как **CLI** для проверки отсутствующих переводов, **[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/lsp.md)**, **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/mcp_server.md)** и **[agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/agent_skills.md)**, чтобы сделать процесс разработки (DX) еще более плавным для ИИ-агентов.

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

## Часто задаваемые вопросы

<FAQ>

<Question title="Для чего используется Intlayer?">

Intlayer - это библиотека интернационализации (i18n) для приложений на JavaScript и TypeScript. Вы объявляете контент компонента рядом с этим компонентом в файле `.content.ts`, Intlayer компилирует эти объявления в типизированные словари во время сборки, а ваши компоненты читают их через хук вроде `useIntlayer`. Она покрывает перевод, правила множественного числа, род, Markdown, маршрутизацию с учётом локали, SEO-метаданные, перевод с помощью ИИ и визуальный редактор для не-разработчиков.

</Question>

<Question title="Насколько i18n увеличивает размер моего бандла?">

Гораздо меньше, чем при подходе на основе пространств имён, потому что страница никогда не загружает каталог, который не отображает. Разметка, отрендеренная на сервере, разрешает свой контент на сервере, и компилятор во время сборки заменяет вызовы `useIntlayer` точными записями словаря, которые использует компонент, поэтому неиспользуемые ключи и неиспользуемые языки отбрасываются. [Динамические словари](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dynamic_dictionaries/index.md) разделяют остальное по локалям. По сравнению с обычными альтернативами Intlayer сокращает размер бандла и страницы до 50%. См. [оптимизацию бандла](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/bundle_optimization.md) и [бенчмарк](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/benchmark/index.md).

</Question>

<Question title="Могу ли я мигрировать с `i18next`, `next-intl` или `react-i18next`, не переписывая свои компоненты?">

Да, и есть два пути. Вы можете мигрировать контент постепенно с помощью [руководства по миграции с i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/migration_from_i18next_to_intlayer.md) или [руководства по миграции с next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/migration_from_next-intl_to_intlayer.md). Или вы можете полностью сохранить свой текущий API: [адаптеры совместимости](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/compat/index.md) предоставляют точно такой же API, как `i18next`, `react-i18next`, `next-intl`, `next-i18next`, `react-intl`, `use-intl`, `vue-i18n` и `Lingui`, но обслуживаемый словарями Intlayer, поэтому меняются импорты, а код компонентов - нет.

</Question>

<Question title="Могу ли я сохранить свои существующие файлы переводов JSON?">

Да. [Плагин синхронизации JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/plugins/sync-json.md) сохраняет ваши файлы `/messages/{locale}/{namespace}.json` как источник истины и генерирует из них словари Intlayer, в обоих направлениях. [Плагин синхронизации PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/plugins/sync-po.md) делает то же самое для каталогов gettext, а [файлы по локали](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/per_locale_file.md) позволяют разделить контент по языкам вместо группировки локалей в одном файле.

</Question>

<Question title="Должен ли я переносить свой контент ключ за ключом?">

Нет. Запустите `npx intlayer extract`, и Intlayer прочитает ваши исходные файлы, извлечёт строки, видимые пользователю, и запишет файл `.content` рядом с каждым из них, так что вы просматриваете diff вместо копирования строк в каталог по одной. См. [команду extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/cli/extract.md).

Для полностью автоматизированного конвейера [Компилятор Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/compiler.md) делает то же самое во время сборки на исходном коде JSX, TSX, Vue и Svelte, генерируя словари при каждом изменении, поэтому нет ключей, которые нужно поддерживать вручную. Он работает через статический анализ, поэтому строки, существующие только во время выполнения, остаются недоступными, и ему нужно несколько аннотаций, чтобы отличать текст, видимый пользователю, от логики приложения.

</Question>

<Question title="Какие инструменты для редактора и ИИ-агентов доступны?">

Пять компонентов, все опциональные:

- **[Расширение для VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/vs_code_extension.md)**: переход от ключа `useIntlayer` к файлу контента, который его объявляет, извлечение контента из компонента и запуск build, fill, test, push и pull из палитры команд или отдельной вкладки Intlayer.
- **[LSP-сервер](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/lsp.md)**: та же осведомлённость в любом редакторе, который говорит на LSP, с переходом к определению, поиском всех ссылок, предпросмотром переведённого значения при наведении, автодополнением ключей и полей и предупреждением, когда ключ нигде не объявлен. Он также разрешает вызовы `i18next`, `react-i18next`, `next-intl` и `use-intl`, что помогает при миграции.
- **[MCP-сервер](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/mcp_server.md)**: предоставляет документацию и CLI Intlayer для Cursor, VS Code, Claude Desktop, Claude Code и ChatGPT, чтобы ассистент отвечал по актуальной документации, а не гадал, и мог сам запускать команды вроде `intlayer fill`.
- **[Навыки агентов](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/agent_skills.md)**: сфокусированные навыки, такие как `intlayer-config`, `intlayer-cli` и `intlayer-content`, плюс по одному на фреймворк, которые обучают агента вашей настройке маршрутизации и типам узлов контента.
- **[Плагин ESLint](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/eslint.md)**: `no-raw-text` помечает жёстко закодированные строки, с дополнительными правилами для статических ключей словаря и неиспользуемого контента.

</Question>

<Question title="Какие существуют решения для интернационализации приложения на JavaScript?">

Область делится на три поколения:

- **Библиотеки каталогов времени выполнения**: `i18next`, `react-i18next`, `next-i18next`, `vue-i18n`, `ngx-translate`. Сообщения живут в пространствах имён JSON, загружаемых во время выполнения. Зрелые и независимые от фреймворка, но нетипизированные и поставляемые целиком.
- **Библиотеки сообщений времени компиляции**: `Lingui`, `Paraglide`, `react-intl` и `next-intl` с этапом извлечения. Лучшее поведение бандла и некоторая типизация, всё ещё централизованные каталоги.
- **Библиотеки слоя контента**: `Intlayer`. Контент объявляется по компонентам и компилируется по компонентам, поэтому типизация, tree-shaking, инструменты и редактирование берутся из одного источника.

См. [почему Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/interest_of_intlayer.md) для подробного сравнения и [бенчмарк](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/benchmark/index.md) для измеренных цифр по бандлу и производительности.

</Question>

<Question title="Какие фреймворки поддерживает Intlayer?">

React, Next.js, Vite, TanStack Start, React Router, Vue, Nuxt, Svelte, SvelteKit, Angular, Solid, Preact, Lit, Astro с каждым островным фреймворком, React Native с Expo, Lynx, а на сервере - Express, Fastify, NestJS, Hono, Elysia и AdonisJS. У каждого есть собственное руководство в разделе [окружения](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/introduction.md).

</Question>

<Question title="Почему контент объявляется рядом с компонентом, а не в центральном файле JSON?">

Три причины. Страница поставляет только те записи, которые отображают её компоненты, вместо целого пространства имён, что и сокращает размер бандла. Папку функции можно скопировать или удалить целиком, не выискивая в общем каталоге осиротевшие ключи. И LLM или агент, редактирующий компонент, видит его контент в той же папке, поэтому со-размещение делает работу с помощью ИИ надёжной. См. [как работает Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/how_works_intlayer.md).

</Question>

<Question title="Как автоматически перевести моё приложение с помощью ИИ?">

Запустите `npx intlayer fill`. CLI обнаруживает недостающие переводы и заполняет их с помощью выбранной вами LLM, используя ваш собственный провайдер и API-ключ, поэтому вы платите ИИ-провайдеру напрямую. `--git-diff` ограничивает запуск контентом, изменённым в ветке, что делает его дешёвым в CI. См. [команду fill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/cli/fill.md) и [интеграцию CI/CD](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/CI_CD.md).

</Question>

<Question title="Как найти недостающие переводы?">

Запустите `npx intlayer test`. Она проваливается, когда объявленной локали не хватает контента, поэтому непереведённая строка никогда не попадёт в продакшен. [Расширение для VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/vs_code_extension.md) показывает те же ошибки inline, а [плагин ESLint](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/eslint.md) помечает жёстко закодированные строки своим правилом `no-raw-text`. См. [тестирование вашего контента](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/testing.md).

</Question>

<Question title="Нужно ли мне помещать локаль в URL?">

Нет. `routing.mode` принимает `"prefix-no-default"` (по умолчанию, `/about` и `/fr/about`), `"prefix-all"`, `"no-prefix"` и `"search-params"`, а `routing.domains` сопоставляет каждую локаль с её собственным доменом. Какой бы ни была схема, `getMultilingualUrls` строит альтернативы `hreflang` для ваших метаданных и карты сайта. См. [справочник по конфигурации](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/configuration.md).

</Question>

<Question title="Как переводчики и редакторы контента могут работать, не касаясь кода?">

[Визуальный редактор](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_visual_editor.md) работает на вашей собственной инфраструктуре и позволяет любому кликнуть на текст вашего работающего приложения, чтобы отредактировать его, записывая изменение обратно в кодовую базу. [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_CMS.md) выносит контент вовне, чтобы он мог меняться без развёртывания, при этом [живая синхронизация](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/cli/live.md) применяет обновления во время выполнения.

</Question>

<Question title="Является ли Intlayer бесплатным и с открытым исходным кодом?">

Да. Intlayer имеет открытый исходный код по лицензии Apache 2.0, и библиотека, CLI, компилятор и визуальный редактор бесплатны в использовании, включая коммерческие проекты. Размещённая CMS - это необязательный платный сервис, и его также можно [разместить самостоятельно](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/self_hosting.md).

</Question>

</FAQ>
