---
createdAt: 2024-08-11
updatedAt: 2026-03-31
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
---

# Intlayer CLI - Усі команди Intlayer CLI для вашого багатомовного вебсайту

---

## Зміст

<TOC/>

---

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

Цей пакет транспілює всі файли Intlayer, такі як `src/**/*.content.{ts|js|mjs|cjs|json}`. [Дізнайтеся, як оголошувати файли контенту Intlayer](https://github.com/aymericzip/intlayer/blob/main/packages/intlayer/README.md).

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

- **[Login](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/login.md)** — Автентифікація в Intlayer CMS та отримання облікових даних доступу

### Основні команди

- **[Build Dictionaries](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/build.md)** — Створення словників з ваших файлів оголошення контенту
- **[Watch Dictionaries](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/watch.md)** — Відстеження змін та автоматична перезбірка словників
- **[Create Standalone Bundle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/standalone.md)** — Створення автономної JavaScript-збірки, що містить Intlayer та вказані пакети
- **[Check CLI Version](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/version.md)** — Перевірка встановленої версії Intlayer CLI
- **[List Projects](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/list_projects.md)** — Перегляд списку всіх проєктів Intlayer у директорії або git-репозиторії

### Керування словниками

- **[Push Dictionaries](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/push.md)** — Відправка словників у Редактор Intlayer та CMS
- **[Pull Dictionaries](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/pull.md)** — Завантаження словників з Редактора Intlayer та CMS
- **[Fill Dictionaries](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/fill.md)** — Заповнення, аудит та переклад словників за допомогою AI
- **[Test Missing Translations](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/test.md)** — Тестування та виявлення відсутніх перекладів
- **[List Content Declaration Files](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/list.md)** — Вивід списку всіх файлів оголошення контенту у вашому проєкті

### Керування компонентами

- **[Extract Strings](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/extract.md)** — Вилучення рядків з компонентів у файл .content поруч із компонентом

### Конфігурація

- **[Initialize Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/init.md)** — Налаштування Intlayer у вашому проєкті з автоматичною конфігурацією
- **[Manage Configuration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/configuration.md)** — Отримання вашої конфігурації Intlayer та її відправка в CMS

### Керування документацією

- **[Translate Document](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/doc-translate.md)** — Автоматичний переклад файлів документації за допомогою AI
- **[Review Document](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/doc-review.md)** — Рецензування файлів документації на предмет якості та послідовності

### Редактор та Live Sync

- **[Editor Commands](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/editor.md)** — Використання команд Редактора Intlayer
- **[Live Sync Commands](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/live.md)** — Використання Live Sync для застосування змін контенту з CMS у реальному часі

### CI/CD та автоматизація

- **[CI Command](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/ci.md)** — Виконання команд Intlayer з автоматично підставленими обліковими даними для CI/CD-пайплайнів

### Інструменти розробки

- **[CLI SDK](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/sdk.md)** — Використання Intlayer CLI SDK у вашому власному коді
- **[Debug Intlayer Command](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/cli/debug.md)** — Налагодження та вирішення проблем з Intlayer CLI

## Використовуйте команди Intlayer у вашому файлі `package.json`

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

> **Примітка**: Ви також можете використовувати коротші аліаси:
>
> - `npx intlayer list`: замінює `npx intlayer content list`
> - `npx intlayer test`: замінює `npx intlayer content test`
> - `npx intlayer projects-list` або `npx intlayer pl`: замінює `npx intlayer projects list`
