---
createdAt: 2025-12-30
updatedAt: 2025-12-30
title: Перелік проєктів Intlayer
description: Дізнайтеся, як перелічити всі проєкти Intlayer у директорії або git-репозиторії.
keywords:
  - Список
  - Проєкти
  - CLI
  - Intlayer
  - Git
slugs:
  - doc
  - concept
  - cli
  - list-projects
history:
  - version: 7.5.12
    date: 2026-01-06
    changes: "Додано опцію виведення абсолютних шляхів для команди list projects"
author: aymericzip
---

# Перелік проєктів Intlayer

```bash packageManager="npm"
npx intlayer projects list
```

```bash packageManager="yarn"
yarn intlayer projects list
```

```bash packageManager="pnpm"
pnpm intlayer projects list
```

```bash packageManager="bun"
bun x intlayer projects list
```

Ця команда шукає та перераховує всі проєкти Intlayer, знаходячи каталоги, які містять конфігураційні файли Intlayer. Це корисно для виявлення всіх проєктів Intlayer у monorepo, workspace або git-репозиторії.

## Псевдоніми:

- `npx intlayer projects-list`
- `npx intlayer pl`

## Аргументи:

- **`--base-dir [path]`**: Вкажіть базову директорію для пошуку. За замовчуванням, поточна робоча директорія.

  > Приклад: `npx intlayer projects list --base-dir /path/to/workspace`

- **`--git-root`**: Шукати від кореня git-репозиторію замість базової директорії. Це корисно для знаходження всіх проєктів Intlayer у монорепо або git-репозиторії.

  > Приклад: `npx intlayer projects list --git-root`

- **`--json`**: Вивести результати у форматі JSON замість форматованого тексту. Корисно для скриптів та програмного доступу.

  > Приклад: `npx intlayer projects list --json`

- **`--absolute`**: Виводити результати як абсолютні шляхи замість відносних.

  > Приклад: `npx intlayer projects list --absolute`

## Як це працює:

Команда шукає файли конфігурації Intlayer у вказаній директорії (або в корені git, якщо використано `--git-root`). Вона шукає такі шаблони файлів конфігурації:

- `intlayer.config.ts`
- `intlayer.config.js`
- `intlayer.config.json`
- `intlayer.config.cjs`
- `intlayer.config.mjs`
- `.intlayerrc`

Кожна директорія, що містить один із цих файлів, вважається проектом Intlayer і буде включена до виводу.

## Приклади:

### Список проектів у поточній директорії:

```bash packageManager="npm"
npx intlayer projects list
```

```bash packageManager="yarn"
yarn intlayer projects list
```

```bash packageManager="pnpm"
pnpm intlayer projects list
```

```bash packageManager="bun"
bun x intlayer projects list
```

### Список проектів у вказаній директорії:

```bash packageManager="npm"
npx intlayer projects list --base-dir ./packages
```

```bash packageManager="yarn"
yarn intlayer projects list --base-dir ./packages
```

```bash packageManager="pnpm"
pnpm intlayer projects list --base-dir ./packages
```

```bash packageManager="bun"
bun x intlayer projects list --base-dir ./packages
```

### Список усіх проектів у git-репозиторії:

```bash packageManager="npm"
npx intlayer projects list --git-root
```

```bash packageManager="yarn"
yarn intlayer projects list --git-root
```

```bash packageManager="pnpm"
pnpm intlayer projects list --git-root
```

```bash packageManager="bun"
bun x intlayer projects list --git-root
```

### Використання скороченого аліасу:

```bash packageManager="npm"
npx intlayer pl --git-root
```

```bash packageManager="yarn"
yarn intlayer pl --git-root
```

```bash packageManager="pnpm"
pnpm intlayer pl --git-root
```

```bash packageManager="bun"
bun x intlayer pl --git-root
```

### Вивід у форматі JSON:

```bash packageManager="npm"
npx intlayer projects list --json
```

```bash packageManager="yarn"
yarn intlayer projects list --json
```

```bash packageManager="pnpm"
pnpm intlayer projects list --json
```

```bash packageManager="bun"
bun x intlayer projects list --json
```

## Приклад виводу:

### Відформатований вивід:

```bash
$ npx intlayer projects list --git-root

Found 3 Intlayer project(s):

  - /Users/user/workspace/packages/app
  - /Users/user/workspace/packages/admin
  - /Users/user/workspace/packages/shared
```

### JSON-вивід:

```bash
$ npx intlayer projects list --json

["/Users/user/workspace/packages/app","/Users/user/workspace/packages/admin","/Users/user/workspace/packages/shared"]
```

## Сценарії використання:

- **Управління монорепозиторієм**: Виявлення всіх проектів Intlayer у структурі монорепозиторію
- **Виявлення проектів**: Знайти всі проекти з підтримкою Intlayer у робочому просторі
- **CI/CD**: Перевірка проектів Intlayer у автоматизованих workflow
- **Документація**: Генерувати документацію зі списком усіх проектів, які використовують Intlayer

Вивід надає абсолютні шляхи до кожного каталогу проекту, що полегшує навігацію або автоматизацію операцій над кількома проектами Intlayer.
