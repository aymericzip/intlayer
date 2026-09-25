---
createdAt: 2024-08-11
updatedAt: 2026-09-23
title: CLI - Все команды Intlayer CLI для вашего многоязычного сайта
description: Узнайте, как использовать Intlayer CLI для управления вашим многоязычным сайтом. Следуйте шагам в этой онлайн-документации, чтобы настроить свой проект за считанные минуты.
keywords:
  - CLI
  - Интерфейс командной строки
  - Интернационализация
  - Документация
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - cli
history:
  - version: 9.5.8
    date: 2026-09-23
    changes: "Добавить команду upgrade"
  - version: 9.5.6
    date: 2026-09-21
    changes: "Добавить команду init infra"
  - version: 9.5.2
    date: 2026-09-12
    changes: "Замена команды `ci` флагом `--ci`"
  - version: 9.0.0
    date: 2026-06-11
    changes: "Добавлена команда scan"
  - version: 8.6.4
    date: 2026-03-31
    changes: "Добавлена команда standalone"
  - version: 7.5.11
    date: 2026-01-06
    changes: "Добавлена команда CI"
  - version: 7.5.11
    date: 2026-01-06
    changes: "Добавлена команда list projects"
  - version: 7.5.9
    date: 2025-12-30
    changes: "Добавлена команда init"
  - version: 7.2.3
    date: 2025-11-22
    changes: "Добавлена команда extract"
  - version: 7.1.0
    date: 2025-11-05
    changes: "Добавлен параметр skipIfExists в команду translate"
  - version: 6.1.4
    date: 2025-01-27
    changes: "Добавлены алиасы для аргументов и команд CLI"
  - version: 6.1.3
    date: 2025-10-05
    changes: "Добавлен параметр сборки к командам"
  - version: 6.1.2
    date: 2025-09-26
    changes: "Добавлена команда version"
  - version: 6.1.0
    date: 2025-09-26
    changes: "Параметр verbose по умолчанию установлен в true через CLI"
  - version: 6.1.0
    date: 2025-09-23
    changes: "Добавлены команда watch и параметр with"
  - version: 6.0.1
    date: 2025-09-23
    changes: "Добавлена команда editor"
  - version: 6.0.0
    date: 2025-09-17
    changes: "Добавлены команды content test и list"
  - version: 5.5.11
    date: 2025-07-11
    changes: "Обновлена документация параметров команд CLI"
  - version: 5.5.10
    date: 2025-06-29
    changes: "Инициализация истории"
author: aymericzip
---

# Intlayer CLI - Все команды Intlayer CLI для вашего многоязычного сайта

## Содержание

<TOC/>

## Установка пакета

Установите необходимые пакеты с помощью npm:

```bash packageManager="npm"
npm install intlayer-cli -g
```

```bash packageManager="yarn"
yarn add intlayer-cli -g
```

```bash packageManager="pnpm"
pnpm add intlayer-cli -g
```

```bash packageManager="bun"
bun add intlayer-cli -g
```

> Если пакет `intlayer` уже установлен, CLI устанавливается автоматически. Вы можете пропустить этот шаг.

## пакет intlayer-cli

Пакет `intlayer-cli` предназначен для транспиляции ваших [объявлений Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dictionary/content_file.md) в словари.

Этот пакет транспилирует все файлы Intlayer, такие как `src/**/*.content.{ts|js|mjs|cjs|json|tsx|jsx|md|mdx|yaml|yml}`. [Узнайте, как объявлять файлы контента Intlayer](https://github.com/aymericzip/intlayer/blob/main/packages/intlayer/README.md).

Для интерпретации словарей Intlayer вы можете использовать интерпретаторы, такие как [react-intlayer](https://www.npmjs.com/package/react-intlayer) или [next-intlayer](https://www.npmjs.com/package/next-intlayer).

## Поддержка файлов конфигурации

Intlayer принимает несколько форматов файлов конфигурации:

- `intlayer.config.ts`
- `intlayer.config.js`
- `intlayer.config.json`
- `intlayer.config.cjs`
- `intlayer.config.mjs`
- `.intlayerrc`

Чтобы узнать, как настроить доступные языки или другие параметры, обратитесь к [документации по конфигурации здесь](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/configuration.md).

## Выполнение команд Intlayer

### Аутентификация

<TechGrid>
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/cli/login" />
</TechGrid>

> `intlayer login` выдает **ключ доступа** (`clientId` / `clientSecret`), который используется всеми командами с учетными данными. Секрет является учетными данными на стороне сервера и никогда не попадает в ваш пакет клиента — см. [Keeping the access key safe](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/cli/login.md#keeping-the-access-key-safe).

### Основные команды

<TechGrid>
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/cli/build" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/cli/watch" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/cli/standalone" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/cli/version" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/cli/list_projects" />
</TechGrid>

### Управление словарями

<TechGrid>
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/cli/push" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/cli/pull" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/cli/fill" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/cli/test" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/cli/list" />
</TechGrid>

### Управление компонентами

<TechGrid>
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/cli/extract" />
</TechGrid>

### Конфигурация

<TechGrid>
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/cli/init" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/cli/infra" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/cli/upgrade" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/cli/configuration" />
</TechGrid>

### Управление документацией

<TechGrid>
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/cli/doc-translate" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/cli/doc-review" />
</TechGrid>

### Редактор и Live Sync

<TechGrid>
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/cli/editor" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/cli/live" />
</TechGrid>

### Аудит и диагностика

<TechGrid>
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/cli/scan" />
</TechGrid>

### Инструменты разработчика

<TechGrid>
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/cli/sdk" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/cli/debug" />
</TechGrid>

## Использование команд Intlayer в вашем `package.json`

```json fileName="package.json"
"scripts": {
  "intlayer:init": "npx intlayer init",
  "intlayer:infra": "npx intlayer init infra",
  "intlayer:upgrade": "npx intlayer upgrade",
  "intlayer:login": "npx intlayer login",
  "intlayer:build": "npx intlayer build",
  "intlayer:watch": "npx intlayer build --watch",
  "intlayer:standalone": "npx intlayer standalone --packages intlayer vanilla-intlayer",
  "intlayer:push": "npx intlayer push",
  "intlayer:pull": "npx intlayer pull",
  "intlayer:fill": "npx intlayer fill",
  "intlayer:list": "npx intlayer content list",
  "intlayer:test": "npx intlayer content test",
  "intlayer:extract": "npx intlayer extract",
  "intlayer:projects": "npx intlayer projects list",
  "intlayer:doc:translate": "npx intlayer doc translate",
  "intlayer:doc:review": "npx intlayer doc review",
  "intlayer:scan": "npx intlayer scan https://example.com"
}
```

> **Примечание**: Вы также можете использовать более короткие алиасы:
>
> - `npx intlayer list` вместо `npx intlayer content list`
> - `npx intlayer test` вместо `npx intlayer content test`
> - `npx intlayer projects-list` или `npx intlayer pl` вместо `npx intlayer projects list`
