---
createdAt: 2024-08-11
updatedAt: 2026-01-06
title: CLI - Усі CLI-команди Intlayer для вашого багатомовного вебсайту
description: Дізнайтеся, як використовувати Intlayer CLI для керування вашим багатомовним вебсайтом. Дотримуйтесь кроків цієї онлайн-документації, щоб налаштувати проєкт за кілька хвилин.
keywords:
  - CLI
  - Command Line Interface
  - Internationalization
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
  - version: 7.5.11
    date: 2026-01-06
    changes: Додано команду CI
  - version: 7.5.11
    date: 2026-01-06
    changes: Додано команду списку проєктів
  - version: 7.5.9
    date: 2025-12-30
    changes: Додано команду init
  - version: 7.2.3
    date: 2025-11-22
    changes: Додано команду transform
  - version: 7.1.0
    date: 2025-11-05
    changes: Додано опцію skipIfExists для команди translate
  - version: 6.1.4
    date: 2025-01-27
    changes: Додано aliases для аргументів і команд CLI
  - version: 6.1.3
    date: 2025-10-05
    changes: Додано опцію build для команд
  - version: 6.1.2
    date: 2025-09-26
    changes: Додано команду version
  - version: 6.1.0
    date: 2025-09-26
    changes: Встановлено опцію verbose за замовчуванням у true через CLI
  - version: 6.1.0
    date: 2025-09-23
    changes: Додано команду watch та опцію with
  - version: 6.0.1
    date: 2025-09-23
    changes: Додано команду editor
  - version: 6.0.0
    date: 2025-09-17
    changes: Додано команди content test і list
  - version: 5.5.11
    date: 2025-07-11
    changes: Оновлено документацію параметрів команд CLI
  - version: 5.5.10
    date: 2025-06-29
    changes: Ініціалізація історії
---

# Intlayer CLI — Усі команди Intlayer CLI для вашого багатомовного сайту

---

## Table of Contents

<TOC/>

---

## Встановлення пакету

Встановіть необхідні пакети за допомогою одного з пакетних менеджерів:

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

> Якщо пакет `intlayer` уже встановлено, CLI встановлюється автоматично. Ви можете пропустити цей крок.

## Пакет intlayer-cli

Пакет `intlayer-cli` призначений для трансляції ваших [оголошень intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/dictionary/content_file.md) у словники.

Цей пакет транспілює всі файли Intlayer, наприклад `src/**/*.content.{ts|js|mjs|cjs|json}`. [Див. як оголосити ваші файли декларацій Intlayer](https://github.com/aymericzip/intlayer/blob/main/packages/intlayer/README.md).

Щоб інтерпретувати словники Intlayer, ви можете використовувати інтерпретатори, такі як [react-intlayer](https://www.npmjs.com/package/react-intlayer) або [next-intlayer](https://www.npmjs.com/package/next-intlayer).

## Підтримка конфігураційних файлів

Intlayer підтримує кілька форматів конфігураційних файлів:

- `intlayer.config.ts`
- `intlayer.config.js`
- `intlayer.config.json`
- `intlayer.config.cjs`
- `intlayer.config.mjs`
- `.intlayerrc`

Щоб дізнатися, як налаштувати доступні локалі або інші параметри, перегляньте [документацію з конфігурації](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/configuration.md).

## Запуск команд intlayer

### Аутентифікація

- **[Вхід](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/login.md)** - Аутентифікація в Intlayer CMS і отримання облікових даних доступу

### Основні команди

- **[Побудова словників](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/build.md)** - Побудуйте словники з файлів декларацій контенту
- **[Спостереження за словниками](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/watch.md)** - Слідкувати за змінами та автоматично збирати словники
- **[Перевірити версію CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/version.md)** - Перевірити встановлену версію Intlayer CLI
- **[Список проєктів](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/list_projects.md)** - Перелічити всі проєкти Intlayer у директорії або git-репозиторії

### Керування словниками

- **[Відправити словники](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/push.md)** - Відправити словники до редактора та CMS Intlayer
- **[Завантажити словники](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/pull.md)** - Завантажити словники з редактора та CMS Intlayer
- **[Заповнити словники](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/fill.md)** - Заповнюйте, перевіряйте та перекладайте словники за допомогою AI
- **[Перевірити відсутні переклади](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/test.md)** - Перевіряйте та виявляйте відсутні переклади
- **[Перелічити файли декларації контенту](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/list.md)** - Перелічити всі файли декларації контенту у вашому проєкті

### Керування компонентами

- **[Трансформувати компоненти](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/transform.md)** - Трансформувати існуючі компоненти для використання Intlayer

### Конфігурація

- **[Ініціалізація Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/init.md)** - Налаштуйте Intlayer у вашому проєкті з автоматичною конфігурацією
- **[Управління конфігурацією](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/configuration.md)** - Отримуйте та надсилайте конфігурацію Intlayer до CMS

### Управління документацією

- **[Переклад документа](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/doc-translate.md)** - Автоматично перекладайте файли документації за допомогою AI
- **[Перевірка документа](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/doc-review.md)** - Перевіряйте файли документації на якість та узгодженість

### Редактор та Live Sync

- **[Команди редактора](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/editor.md)** - Використовуйте команди редактора Intlayer
- **[Команди Live Sync](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/live.md)** - Використовуйте Live Sync, щоб відображати зміни контенту CMS під час виконання

### CI/CD та автоматизація

- **[CI Command](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/ci.md)** - Запускайте команди Intlayer з автоматично підставленими обліковими даними для CI/CD пайплайнів

### Інструменти розробки

- **[CLI SDK](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/sdk.md)** - Використовуйте Intlayer CLI SDK у власному коді
- **[Команда налагодження Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/debug.md)** - Налагоджуйте та усувайте проблеми CLI Intlayer

## Використовуйте команди intlayer у вашому `package.json`

```json fileName="package.json"
"scripts": {
  "intlayer:init": "npx intlayer init",
  "intlayer:login": "npx intlayer login",
  "intlayer:build": "npx intlayer build",
  "intlayer:watch": "npx intlayer build --watch",
  "intlayer:push": "npx intlayer push",
  "intlayer:pull": "npx intlayer pull",
  "intlayer:fill": "npx intlayer fill",
  "intlayer:list": "npx intlayer content list",
  "intlayer:test": "npx intlayer content test",
  "intlayer:transform": "npx intlayer transform",
  "intlayer:projects": "npx intlayer projects list",
  "intlayer:doc:translate": "npx intlayer doc translate",
  "intlayer:doc:review": "npx intlayer doc review"
}
```

> **Примітка**: Ви також можете використовувати коротші псевдоніми:
>
> - `npx intlayer list` замість `npx intlayer content list`
> - `npx intlayer test` замість `npx intlayer content test`
> - `npx intlayer projects-list` або `npx intlayer pl` замість `npx intlayer projects list`
