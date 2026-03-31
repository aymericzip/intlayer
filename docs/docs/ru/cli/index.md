---
createdAt: 2024-08-11
updatedAt: 2026-03-31
title: CLI — Все команды Intlayer CLI для вашего многоязычного сайта
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
---

# Intlayer CLI — Все команды Intlayer CLI для вашего многоязычного сайта

---

## Содержание

<TOC/>

---

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

Этот пакет транспилирует все файлы Intlayer, такие как `src/**/*.content.{ts|js|mjs|cjs|json}`. [Узнайте, как объявлять файлы контента Intlayer](https://github.com/aymericzip/intlayer/blob/main/packages/intlayer/README.md).

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

- **[Login](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/login.md)** — Аутентификация в Intlayer CMS и получение учетных данных для доступа

### Основные команды

- **[Build Dictionaries](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/cli/build.md)** — Сборка словарей из файлов объявления контента
- **[Watch Dictionaries](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/cli/watch.md)** — Отслеживание изменений и автоматическая сборка словарей
- **[Create Standalone Bundle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/cli/standalone.md)** — Создание автономной JavaScript-сборки, содержащей Intlayer и указанные пакеты
- **[Check CLI Version](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/cli/version.md)** — Проверка версии установленного Intlayer CLI
- **[List Projects](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/cli/list_projects.md)** — Список всех проектов Intlayer в директории или git-репозитории

### Управление словарями

- **[Push Dictionaries](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/cli/push.md)** — Отправка словарей в редактор Intlayer и CMS
- **[Pull Dictionaries](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/cli/pull.md)** — Получение словарей из редактора Intlayer и CMS
- **[Fill Dictionaries](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/cli/fill.md)** — Заполнение, аудит и перевод словарей с помощью ИИ
- **[Test Missing Translations](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/cli/test.md)** — Тестирование и выявление недостающих переводов
- **[List Content Declaration Files](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/cli/list.md)** — Список всех файлов объявления контента в вашем проекте

### Управление компонентами

- **[Extract Strings](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/cli/extract.md)** — Извлечение строк из компонентов в файл .content рядом с компонентом

### Конфигурация

- **[Initialize Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/cli/init.md)** — Настройка Intlayer в вашем проекте с автоматической конфигурацией
- **[Manage Configuration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/cli/configuration.md)** — Получение и отправка вашей конфигурации Intlayer в CMS

### Управление документацией

- **[Translate Document](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/cli/doc-translate.md)** — Автоматический перевод файлов документации с помощью ИИ
- **[Review Document](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/cli/doc-review.md)** — Проверка файлов документации на качество и согласованность

### Редактор и Live Sync

- **[Editor Commands](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/cli/editor.md)** — Использование команд редактора Intlayer
- **[Live Sync Commands](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/cli/live.md)** — Использование Live Sync для применения изменений контента из CMS во время выполнения

### CI/CD и автоматизация

- **[CI Command](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/cli/ci.md)** — Выполнение команд Intlayer с автоматически подставляемыми учетными данными для конвейеров CI/CD

### Инструменты разработчика

- **[CLI SDK](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/cli/sdk.md)** — Использование Intlayer CLI SDK в вашем собственном коде
- **[Debug Intlayer Command](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/cli/debug.md)** — Отладка и устранение неполадок Intlayer CLI

## Использование команд Intlayer в вашем `package.json`

```json fileName="package.json"
"scripts": {
  "intlayer:init": "npx intlayer init",
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
  "intlayer:doc:review": "npx intlayer doc review"
}
```

> **Примечание**: Вы также можете использовать более короткие алиасы:
>
> - `npx intlayer list` вместо `npx intlayer content list`
> - `npx intlayer test` вместо `npx intlayer content test`
> - `npx intlayer projects-list` или `npx intlayer pl` вместо `npx intlayer projects list`
