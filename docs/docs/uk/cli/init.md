---
createdAt: 2025-12-30
updatedAt: 2025-12-30
title: Ініціалізація Intlayer
description: Дізнайтесь, як ініціалізувати Intlayer у вашому проєкті.
keywords:
  - Ініціалізація
  - CLI
  - Intlayer
  - AI
slugs:
  - doc
  - concept
  - cli
  - init
history:
  - version: 7.5.9
    date: 2025-12-30
    changes: Додано команду init
---

# Ініціалізація Intlayer

```bash
npx intlayer init
```

Команда `init` автоматично налаштовує Intlayer у вашому проєкті, конфігуруючи необхідні файли та параметри. Це рекомендований спосіб почати роботу з `Intlayer`.

## Аліаси:

- `npx intlayer init`

## Аргументи:

- `--project-root [projectRoot]` - Опційно. Вкажіть кореневу директорію проєкту. Якщо не вказано, команда шукатиме корінь проєкту, починаючи з поточної робочої директорії.

## Що робить:

Команда `init` виконує такі дії з налаштування:

1. **Validates project structure** - Переконується, що ви перебуваєте в дійсній директорії проекту з файлом `package.json`
2. **Updates `.gitignore`** - Додає `.intlayer` до вашого файлу `.gitignore`, щоб виключити згенеровані файли з контролю версій
3. **Configures TypeScript** - Оновлює всі файли `tsconfig.json`, щоб включити визначення типів Intlayer (`.intlayer/**/*.ts`)
4. **Creates configuration file** - Генерує `intlayer.config.ts` (для проєктів на TypeScript) або `intlayer.config.mjs` (для проєктів на JavaScript) з налаштуваннями за замовчуванням
5. **Updates Vite config** - Якщо виявлено файл конфігурації Vite, додає імпорт плагіна `vite-intlayer`
6. **Оновлює конфігурацію Next.js** - Якщо виявлено файл конфігурації Next.js, додає імпорт плагіна `next-intlayer`

## Приклади:

### Базова ініціалізація:

```bash
npx intlayer init
```

Це ініціалізує Intlayer у поточному каталозі, автоматично виявляючи корінь проєкту.

### Ініціалізація з користувацьким коренем проєкту:

```bash
npx intlayer init --project-root ./my-project
```

Це ініціалізує Intlayer у вказаному каталозі.

## Приклад виведення:

```bash
npx intlayer init
Checking Intlayer configuration...
✓ Added .intlayer to .gitignore
✓ Updated tsconfig.json to include intlayer types
Created intlayer.config.ts
✓ Injected import into vite.config.ts
✓ Intlayer init setup complete.
```

## Примітки:

- Команда ідемпотентна - її можна безпечно запускати кілька разів. Вона пропустить кроки, які вже налаштовано.
- Якщо файл конфігурації вже існує, він не буде перезаписаний.
- Файли конфігурації TypeScript без масиву `include` (наприклад, конфіги у стилі solution з references) пропускаються.
- Команда завершиться з помилкою, якщо у корені проєкту не знайдено `package.json`.
