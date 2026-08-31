---
createdAt: 2024-08-12
updatedAt: 2025-06-29
title: Як працює Intlayer
description: Дізнайтеся, як Intlayer працює всередині. Зрозумійте архітектуру та компоненти, що роблять Intlayer потужним.
keywords:
  - Intlayer
  - Як це працює
  - Архітектура
  - Компоненти
  - Внутрішні механізми
slugs:
  - doc
  - concept
  - how-works-intlayer
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: "Ініціалізація історії"
author: aymericzip
---

# Як працює Intlayer

## Зміст

<TOC/>

## Огляд

Головна ідея Intlayer, застосувати керування контентом на рівні компонентів. Іншими словами, Intlayer дозволяє вам декларувати контент будь-де у вашому codebase, наприклад у тій самій директорії, що й компонент.

```bash
.
└── Components
    └── MyComponent
        ├── index.content.ts
        └── index.tsx
```

Для цього роль Intlayer полягає в тому, щоб знайти всі ваші `content declaration files` у всіх доступних форматах у проєкті, а потім згенерувати з них `dictionaries`.

Отже, є два основні етапи:

- Етап побудови
- Етап інтерпретації

### Етап побудови словників

Етап побудови можна виконати трьома способами:

- за допомогою CLI з `npx intlayer build`
- використовуючи [розширення VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/vs_code_extension.md)
- using the app plugins such as [`vite-intlayer` package](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/vite-intlayer/index.md), or their equivalents for [Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/next-intlayer/index.md). When you use one of those plugins, Intlayer will automatically build your dictionaries when you start (dev) or build (prod) your application.

1. Declaration of content files
   - Content files can be defined in various formats, such as TypeScript, ECMAScript, CommonJS, or JSON.
   - Файли контенту можуть бути визначені в будь-якому місці проєкту, що дозволяє кращу підтримку та масштабованість. Важливо дотримуватися конвенцій щодо розширень файлів контенту. Це розширення за замовчуванням, `*.content.{js|cjs|mjs|ts|tsx|json}`, але його можна змінити у [файлі конфігурації](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/configuration.md).

2. Генерація `dictionaries`
   - Словники генеруються з файлів контенту. За замовчуванням словники Intlayer створюються в директорії `.intlayer/dictionaries` проєкту.
   - Ці словники генеруються в різних форматах, щоб задовольнити всі потреби та оптимізувати продуктивність застосунку.

3. Генерація типів словників

На основі ваших `dictionaries` Intlayer згенерує типи, щоб зробити їх доступними у вашому застосунку.

- Типи словників генеруються з файлів оголошень вмісту Intlayer (`content declaration files`). За замовчуванням типи словників Intlayer генеруються в директорії `.intlayer/types` проєкту.

- Intlayer [module augmentation](https://www.typescriptlang.org/docs/handbook/declaration-merging.html), це можливість TypeScript, яка дозволяє визначати додаткові типи для Intlayer. Це спрощує досвід розробки, підказуючи доступні або обов'язкові аргументи.
  Серед згенерованих типів, типи словників Intlayer або навіть типи конфігурації мов додаються до файлу `types/intlayer.d.ts` і використовуються іншими пакетами. Для цього необхідно, щоб файл `tsconfig.json` був налаштований на включення директорії `types` проекту.

### Крок інтерпретації словників

За допомогою Intlayer ви будете отримувати доступ до вашого контенту в застосунку, використовуючи хук `useIntlayer`.

```tsx
const MyComponent = () => {
  const content = useIntlayer("my-component");
  return <div>{content.title}</div>;
};
```

Цей хук керуватиме визначенням локалі за вас і повертатиме контент для поточної локалі. Використовуючи цей хук, ви також зможете інтерпретувати markdown, керувати pluralization та багато іншого.

> Щоб побачити всі можливості Intlayer, ви можете прочитати [документацію словників](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/content_file.md).

## Віддалений контент

Intlayer дозволяє оголошувати контент локально, а потім експортувати його до CMS, щоб зробити його редагованим для вашої нетехнічної команди.

Таким чином ви зможете відправляти (push) та отримувати (pull) контент між CMS та вашим додатком, подібно до того, як ви працюєте з Git для вашого коду.

Для зовнішніх словників, які використовують CMS, Intlayer виконує базову операцію fetch для отримання віддалених словників і об'єднує їх з локальними. Якщо це налаштовано в проекті, Intlayer автоматично керуватиме отриманням контенту з CMS під час запуску додатка (dev) або під час збірки (prod).

## Візуальний редактор

Intlayer також надає візуальний редактор, щоб дозволити редагувати ваш контент у візуальний спосіб. Цей [візуальний редактор](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/intlayer_visual_editor.md) доступний у зовнішньому пакеті `intlayer-editor`.

![visual editor](https://github.com/aymericzip/intlayer/blob/main/docs/assets/visual_editor.gif?raw=true)

- Сервер, це проста Express-аплікація, яка прослуховує запити від клієнта та отримує вміст вашого застосунку, такий як `dictionaries`, і конфігурацію, щоб зробити їх доступними на стороні клієнта.
- З іншого боку, клієнт, це React-аплікація, яка використовується для взаємодії з вашим контентом за допомогою візуального інтерфейсу.

Коли ви викликаєте свій контент за допомогою `useIntlayer` і редактор увімкнений, він автоматично обгортає ваші рядки об'єктом Proxy з ім'ям `IntlayerNode`. Цей вузол використовує `window.postMessage` для зв'язку з вкладеним iframe, що містить інтерфейс візуального редактора.
На стороні редактора він прослуховує ці повідомлення та імітує реальну взаємодію з вашим контентом, дозволяючи редагувати текст безпосередньо в контексті вашого додатку.

## Оптимізація збірки додатку

Щоб оптимізувати розмір бандлу вашого додатку, Intlayer надає два плагіни для оптимізації збірки: `@intlayer/babel` та `@intlayer/swc`.

Плагіни Babel та SWC працюють шляхом аналізу абстрактного синтаксичного дерева (AST) вашого додатка, щоб замінити виклики функцій Intlayer на оптимізований код. Цей процес робить ваш фінальний bundle легшим у production, забезпечуючи імпорт лише тих словників, які фактично використовуються, оптимізуючи chunking та зменшуючи розмір bundle.

У режимі розробки Intlayer використовує централізований статичний імпорт словників, щоб спростити досвід розробки.

Активувавши опцію `importMode = "dynamic"` у [configuration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/configuration.md), Intlayer використовуватиме динамічний імпорт для завантаження словників. Ця опція вимкнена за замовчуванням, щоб уникнути асинхронної обробки під час рендерингу додатка.

> `@intlayer/babel` доступний за замовчуванням у пакеті `vite-intlayer`,

> `@intlayer/babel` доступний за замовчуванням у пакеті `vite-intlayer`,
>
> `@intlayer/swc` не встановлений за замовчуванням у пакеті `next-intlayer`, оскільки плагіни SWC все ще експериментальні в Next.js.

Щоб дізнатися, як налаштувати збірку вашого застосунку, ви можете прочитати [документацію з конфігурації](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/configuration.md).

## Пакети

Intlayer складається з кількох пакетів, кожен із яких має конкретну роль у процесі перекладу. Нижче, графічне зображення структури цих пакетів:

![пакети intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/assets/packages_dependency_graph.svg)

### intlayer

Пакет `intlayer` використовується в застосунках для оголошення контенту у файлах контенту.

### react-intlayer

Пакет `react-intlayer` використовується для інтерпретації словників Intlayer і робить їх придатними для використання в React-застосунках.

### next-intlayer

Пакет `next-intlayer` використовується як шар поверх `react-intlayer`, щоб зробити словники Intlayer придатними для використання в Next.js-застосунках. Він інтегрує необхідні функції для роботи Intlayer у середовищі Next.js, такі як translation middleware, маршрутизація або конфігурація файлу `next.config.js`.

### vue-intlayer

Пакет `vue-intlayer` використовується для інтерпретації словників Intlayer і робить їх придатними для використання у Vue-застосунках.

### nuxt-intlayer

The `nuxt-intlayer` package is as Nuxt module to make Intlayer dictionaries usable in Nuxt applications. It integrates essential features to make Intlayer work in a Nuxt environment, such as translation middleware, routing, or the `nuxt.config.js` file configuration.

### svelte-intlayer

The `svelte-intlayer` package is used to interpret Intlayer dictionaries and make them usable in Svelte applications.

### solid-intlayer (WIP)

The `solid-intlayer` package is used to interpret Intlayer dictionaries and make them usable in Solid.js applications.

### preact-intlayer

The `preact-intlayer` package is used to interpret Intlayer dictionaries and make them usable in Preact applications.

### angular-intlayer (WIP)

Пакет `angular-intlayer` використовується для інтерпретації словників Intlayer та забезпечення їхнього використання в додатках Angular.

### express-intlayer

Пакет `express-intlayer` використовується для застосування Intlayer на бекенді Express.js.

### react-native-intlayer

Пакет `react-native-intlayer` надає інструменти для інтеграції плагінів, щоб Intlayer працював з бандлером Metro.

### lynx-intlayer

Пакет `lynx-intlayer` надає інструменти для інтеграції плагінів, щоб Intlayer працював з бандлером Lynx.

### vite-intlayer

Містить плагін Vite для інтеграції Intlayer з [бандлером Vite](https://vite.dev/guide/why.html#why-bundle-for-production), а також middleware для визначення пріоритетної локалі користувача, керування cookie та обробки перенаправлень URL.

### react-scripts-intlayer

Містить команди та плагіни `react-scripts-intlayer` для інтеграції Intlayer з додатком на базі Create React App. Ці плагіни засновані на [craco](https://craco.js.org/) і включають додаткову конфігурацію для бандлера [Webpack](https://webpack.js.org/).

### intlayer-editor

Пакет `intlayer-editor` використовується для забезпечення можливості використання візуального редактора. Цей пакет є опціональним, його можна встановити в застосунках, і він буде використовуватися пакетом `react-intlayer`.
Він складається з двох частин: сервера та клієнта.

Клієнт містить UI-елементи, які будуть використовуватися `react-intlayer`.

Сервер, на базі Express, використовується для отримання запитів від візуального редактора та керування або модифікації файлів контенту.

### intlayer-cli

Пакет `intlayer-cli` можна використовувати для генерації словників за допомогою команди `npx intlayer dictionaries build`. Якщо `intlayer` вже встановлено, CLI встановлюється автоматично і цей пакет не є необхідним.

### @intlayer/core

Пакет `@intlayer/core` є основним пакетом Intlayer. Він містить функції перекладу та керування словниками. `@intlayer/core` є багатоплатформним і використовується іншими пакетами для виконання інтерпретації словників.

### @intlayer/config

Пакет `@intlayer/config` використовується для налаштування параметрів Intlayer, таких як доступні мови, параметри middleware Next.js або налаштування інтегрованого редактора.

### @intlayer/webpack

The `@intlayer/webpack` package is used to provide a Webpack configuration to make a Webpack-based application work with Intlayer. The package also provides a plugin to add to an existing Webpack application.

### @intlayer/cli

Пакет `@intlayer/cli` є NPM-пакетом, який використовується для оголошення скриптів, пов’язаних із командними інтерфейсами Intlayer. Він забезпечує узгодженість усіх CLI-команд Intlayer. Цей пакет, зокрема, використовується пакетами [intlayer-cli](https://github.com/aymericzip/intlayer/tree/main/docs/uk/packages/intlayer-cli/index.md) та [intlayer](https://github.com/aymericzip/intlayer/tree/main/docs/uk/packages/intlayer/index.md).

### @intlayer/mcp

Пакет `@intlayer/mcp` забезпечує сервер MCP (Model Context Protocol), який надає підтримку IDE на базі ШІ, адаптовану до екосистеми Intlayer. Він автоматично завантажує документацію та інтегрується з Intlayer CLI.

### @intlayer/dictionaries-entry & @intlayer/unmerged-dictionaries-entry & @intlayer/dynamic-dictionaries-entry

Пакети `@intlayer/dictionaries-entry`, `@intlayer/unmerged-dictionaries-entry` та `@intlayer/dynamic-dictionaries-entry` повертають шлях entry словників Intlayer. Оскільки з браузера неможливо виконувати пошук по файловій системі, використання bundler-ів, таких як Webpack або Rollup, для отримання шляху entry словників неможливе. Ці пакети розроблені для того, щоб їх можна було alias-ити, що дозволяє оптимізувати bundling для різних збирачів, таких як Vite, Webpack та Turbopack.

### @intlayer/engine

Пакет `@intlayer/engine` використовується для моніторингу файлів контенту та перегенерації зміненого словника при кожній модифікації.

### @intlayer/editor

The `@intlayer/editor` package provides the utilities related to the dictionary editor. It notably includes the API to interface an application with the Intlayer editor, and utilities to manipulate dictionaries. This package is cross-platform.

### @intlayer/editor-react

The `@intlayer/editor-react` package provides states, contexts, hooks and components to interface a React application with the Intlayer editor.

### @intlayer/babel

The `@intlayer/babel` package provides tools that optimize bundling of dictionaries for Vite and Webpack based applications.

### @intlayer/swc

The `@intlayer/swc` package provides tools that optimize bundling of dictionaries for Next.js applications.

### @intlayer/api

The `@intlayer/api` package is an API SDK to interact with the backend.

### @intlayer/design-system

Пакет `@intlayer/design-system` використовується для обміну елементами дизайну між CMS і візуальним редактором.

### @intlayer/backend

Пакет `@intlayer/backend` експортує типи бекенду та згодом надасть бекенд як окремий пакет.

## Чат з нашою розумною документацією

- [Задавайте свої питання нашій розумній документації](https://intlayer.org/doc/chat)

## Часто задавані запитання

<FAQ>

<Question title="Коли будуються словники: під час збирання чи під час виконання?">

Під час збирання. Плагін Intlayer сканує файли `.content.ts`, компілює їх в оптимізовані словники та записує до теки `.intlayer`. У середовищі розробки цей процес виконується миттєво при кожному збереженні файлу.

</Question>

<Question title="Скільки i18n додає до розміру бандла?">

Значно менше, ніж рішення на основі просторів імен (namespaces), оскільки сторінка ніколи не завантажує каталог, який вона не рендерить. Розмітка, що рендериться на сервері, отримує свій контент безпосередньо на сервері, а компілятор під час збирання замінює виклики `useIntlayer` точними записами словника, які використовує компонент, тому невикористані ключі та мови видаляються. [Динамічні словники](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dynamic_dictionaries/index.md) розділяють залишок за окремими локалями. У порівнянні зі звичними альтернативами Intlayer зменшує розмір бандла та сторінки до 50%. Див. [оптимізацію бандла](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/bundle_optimization.md) та [бенчмарк](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/benchmark/index.md).

</Question>

<Question title="Чи можу я мігрувати з i18next, next-intl або react-i18next без переписування моїх компонентів?">

Так, і для цього є два шляхи. Ви можете переносити контент поступово, користуючись [посібником з міграції з i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/migration_from_i18next_to_intlayer.md) або [посібником з міграції з next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/migration_from_next-intl_to_intlayer.md). Або ви можете повністю зберегти свій поточний API: [адаптери сумісності](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/compat/index.md) надають абсолютно той самий інтерфейс, що й `i18next`, `react-i18next`, `next-intl`, `next-i18next`, `react-intl`, `use-intl`, `vue-i18n` та `Lingui`, але дані беруться зі словників Intlayer, завдяки чому змінюються лише імпорти, а код компонентів залишається незмінним.

</Question>

<Question title="Чи можу я зберігати мої існуючі JSON файли перекладів?">

Так. [sync JSON плагін](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/plugins/sync-json.md) зберігає ваші файли `/messages/{locale}/{namespace}.json` як джерело істини та генерує словники Intlayer з них в обох напрямках. [sync PO плагін](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/plugins/sync-po.md) робить те ж саме для gettext каталогів, а [файли для окремих локалей](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/per_locale_file.md) дозволяють розділити контент за мовами замість групування локалей в один файл.

</Question>

<Question title="Чи потрібно переносити вміст ключ за ключем?">

Ні. Запустіть `npx intlayer extract`, і Intlayer прочитає ваші файли, витягне призначені для користувача рядки і створить файл `.content` поруч із кожним компонентом, завдяки чому ви переглядаєте diff замість копіювання рядків у каталог вручну. Див. [команду extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/extract.md).

Для повністю автоматизованого робочого процесу [Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/compiler.md) робить те саме під час збирання у коді JSX, TSX, Vue та Svelte, генеруючи словники під час кожної зміни, тому вручну підтримувати ключі не потрібно. Оскільки він працює через статичний аналіз, динамічні рядки середовища виконання залишаються поза його досяжністю.

</Question>

<Question title="Які інструменти для редактора та AI агентів доступні?">

П'ять інструментів, усі опціональні:

- **[Розширення VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/vs_code_extension.md)**: перехід від ключа `useIntlayer` до файлу контенту, вилучення рядків із компонента та запуск build, fill, test, push і pull із палітри команд або вкладки Intlayer.
- **[LSP сервер](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/lsp.md)**: та сама функціональність у будь-якому редакторі з підтримкою LSP, включно з переходом до визначення, переглядом перекладеного значення під час наведення та автодоповненням ключів. Також підтримує виклики `i18next`, `react-i18next`, `next-intl` та `use-intl`.
- **[MCP сервер](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/mcp_server.md)**: надає документацію та CLI Intlayer для Cursor, VS Code, Claude Desktop, Claude Code та ChatGPT.
- **[Навички агента (Agent skills)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/agent_skills.md)**: спеціалізовані навички `intlayer-config`, `intlayer-cli` та `intlayer-content`.
- **[Плагін ESLint](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/eslint.md)**: правило `no-raw-text` відстежує жорстко закодовані рядки.

</Question>

<Question title="Що таке тека .intlayer і чи слід комітити її в git?">

Це скомпільований результат: згенеровані словники та типи TypeScript. Вона повністю генерується з ваших файлів вмісту, тому її слід додати до `.gitignore` і збирати в CI/CD за допомогою команди `intlayer build`.

</Question>

<Question title="Як визначається активна локаль?">

З джерел, зазначених у `routing.storage`, за чергою: префікс URL, файл cookie, заголовок `Accept-Language` та мова за замовчуванням.

</Question>

<Question title="У чому різниця між локальними та віддаленими словниками?">

Локальний словник оголошується у вашій кодовій базі та компілюється разом із додатком. Віддалений словник керується в CMS і підтягується через API, що дозволяє оновлювати тексти без повторного збирання додатку.

</Question>

<Question title="Чи працює Intlayer без TypeScript?">

Так. Файли вмісту можна писати на TypeScript, JavaScript, ESM, CommonJS або JSON. Проте саме TypeScript забезпечує строгу типізацію та автодоповнення ключів у вашому редакторі.

</Question>

<Question title="Як серверний рендеринг і клієнтський рендеринг ділять один і той самий контент?">

Сервер вирішує вміст компонентів, що рендеряться на стороні сервера, напряму, тому для них клієнту не відправляється жодних словників. Клієнтські компоненти отримують лише ті словники, які потрібні для інтерактивності в браузері.

</Question>

<Question title="Як Intlayer уникає помилок гідратації (hydration mismatch), пов'язаних із мовою?">

Мова визначається один раз на сервері й передається клієнтському провайдеру замість повторного визначення в браузері, що гарантує повну відповідність серверного та клієнтського HTML.

</Question>

<Question title="Чи потрібно перезбирати додаток під час додавання перекладу?">

У режимі розробки ні: плагін відстежує файли та оновлює словники на льоту. У продакшні так: локальні словники вбудовуються в кінцеві файли під час етапу збирання.

</Question>

</FAQ>
