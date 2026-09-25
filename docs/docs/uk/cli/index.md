---
createdAt: 2024-08-11
updatedAt: 2026-09-23
title: CLI - Усі команди Intlayer CLI для вашого багатомовного вебсайту
description: Дізнайтеся, як використовувати Intlayer CLI для керування вашим багатомовним вебсайтом. Дотримуйтесь кроків у цій онлайн-документації, щоб налаштувати свій проєкт за лічені хвилини.
keywords:
  - CLI
  - Інтерфейс командного рядка
  - Інтернаціоналізація
  - Документація
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
    changes: "Додати команду upgrade"
  - version: 9.5.6
    date: 2026-09-21
    changes: "Додати команду init infra"
  - version: 9.5.2
    date: 2026-09-12
    changes: "Заміна команди `ci` прапорцем `--ci`"
  - version: 9.0.0
    date: 2026-06-11
    changes: "Додано вміст команди scan"
  - version: 8.6.4
    date: 2026-03-31
    changes: "Додано вміст команди standalone"
  - version: 7.5.11
    date: 2026-01-06
    changes: "Додано вміст команди CI"
  - version: 7.5.11
    date: 2026-01-06
    changes: "Додано вміст команди list projects"
  - version: 7.5.9
    date: 2025-12-30
    changes: "Додано вміст команди init"
  - version: 7.2.3
    date: 2025-11-22
    changes: "Додано вміст команди extract"
  - version: 7.1.0
    date: 2025-11-05
    changes: "Додано опцію skipIfExists до команди translate"
  - version: 6.1.4
    date: 2025-01-27
    changes: "Додано аліаси для аргументів та команд CLI"
  - version: 6.1.3
    date: 2025-10-05
    changes: "Додано опцію build до команд"
  - version: 6.1.2
    date: 2025-09-26
    changes: "Додано вміст команди version"
  - version: 6.1.0
    date: 2025-09-26
    changes: "Встановлено опцію verbose в true за замовчуванням через CLI"
  - version: 6.1.0
    date: 2025-09-23
    changes: "Додано команду watch та опцію with"
  - version: 6.0.1
    date: 2025-09-23
    changes: "Додано вміст команди editor"
  - version: 6.0.0
    date: 2025-09-17
    changes: "Додано команди content test та list"
  - version: 5.5.11
    date: 2025-07-11
    changes: "Оновлено документацію параметрів команд CLI"
  - version: 5.5.10
    date: 2025-06-29
    changes: "Ініціалізація історії"
author: aymericzip
---

# Intlayer CLI - Усі команди Intlayer CLI для вашого багатомовного вебсайту

## Зміст

<TOC/>

## Встановлення пакета

Встановіть необхідні пакети за допомогою npm:

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

> Якщо пакет `intlayer` вже встановлено, CLI буде встановлено автоматично. Ви можете пропустити цей крок.

## Пакет intlayer-cli

Пакет `intlayer-cli` призначений для транспіляції ваших [оголошень Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/content_file.md) у словники.

Цей пакет транспілює всі файли Intlayer, такі як `src/**/*.content.{ts|js|mjs|cjs|json|tsx|jsx|md|mdx|yaml|yml}`. [Дізнайтеся, як оголошувати файли контенту Intlayer](https://github.com/aymericzip/intlayer/blob/main/packages/intlayer/README.md).

Для інтерпретації словників Intlayer ви можете використовувати інтерпретатори, такі як [react-intlayer](https://www.npmjs.com/package/react-intlayer) або [next-intlayer](https://www.npmjs.com/package/next-intlayer).

## Підтримка файлів конфігурації

Intlayer приймає кілька форматів файлів конфігурації:

- `intlayer.config.ts`
- `intlayer.config.js`
- `intlayer.config.json`
- `intlayer.config.cjs`
- `intlayer.config.mjs`
- `.intlayerrc`

Щоб дізнатися, як налаштувати доступні мови або інші параметри, ознайомтеся з [документацією з конфігурації тут](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/configuration.md).

## Виконання команд Intlayer

### Автентифікація

<TechGrid>
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/login" />
</TechGrid>

> `intlayer login` видає **ключ доступу** (`clientId` / `clientSecret`), який використовують всі команди з обліковими даними. Секрет — це облікові дані на стороні сервера і ніколи не потрапляють до вашого bundle клієнта — див. [Keeping the access key safe](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/login.md#keeping-the-access-key-safe).

### Основні команди

<TechGrid>
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/build" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/watch" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/standalone" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/version" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/list_projects" />
</TechGrid>

### Керування словниками

<TechGrid>
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/push" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/pull" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/fill" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/test" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/list" />
</TechGrid>

### Керування компонентами

<TechGrid>
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/extract" />
</TechGrid>

### Конфігурація

<TechGrid>
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/init" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/infra" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/upgrade" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/configuration" />
</TechGrid>

### Керування документацією

<TechGrid>
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/doc-translate" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/doc-review" />
</TechGrid>

### Редактор та Live Sync

<TechGrid>
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/editor" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/live" />
</TechGrid>

### Аудит та діагностика

<TechGrid>
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/scan" />
</TechGrid>

### Інструменти розробки

<TechGrid>
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/sdk" />
  <TechLink href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/debug" />
</TechGrid>

## Використовуйте команди Intlayer у вашому файлі `package.json`

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

> **Примітка**: Ви також можете використовувати коротші аліаси:
>
> - `npx intlayer list`: замінює `npx intlayer content list`
> - `npx intlayer test`: замінює `npx intlayer content test`
> - `npx intlayer projects-list` або `npx intlayer pl`: замінює `npx intlayer projects list`
