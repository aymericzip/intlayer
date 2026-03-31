---
createdAt: 2025-12-30
updatedAt: 2025-12-30
title: Ініціалізація Intlayer
description: Дізнайтеся, як ініціалізувати Intlayer у вашому проєкті.
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
  - version: 8.6.4
    date: 2026-03-31
    changes: "Додано опцію --no-gitignore"
  - version: 7.5.9
    date: 2025-12-30
    changes: "Додано вміст команди init"
---

# Ініціалізація Intlayer

```bash
npx intlayer init
```

Команда `init` автоматично налаштовує Intlayer у вашому проєкті, створюючи необхідні файли та налаштування. Це рекомендований спосіб почати роботу з Intlayer.

## Аліаси (Aliases):

- `npx intlayer init`

## Аргументи (Arguments):

- `--project-root [projectRoot]` — Опціонально. Вкажіть кореневу директорію проєкту. Якщо не вказано, команда шукатиме корінь проєкту, починаючи з поточної робочої директорії.
- `--no-gitignore` — Опціонально. Пропускає автоматичне оновлення файлу `.gitignore`. Якщо цей прапорець встановлено, `.intlayer` не буде додано до `.gitignore`.

## Що вона робить:

Команда `init` виконує наступні завдання з налаштування:

1. **Перевірка структури проєкту** — Переконується, що ви перебуваєте в коректній директорії проєкту з файлом `package.json`.
2. **Оновлення `.gitignore`** — Додає `.intlayer` до вашого файлу `.gitignore`, щоб виключити згенеровані файли з системи контролю версій (можна пропустити за допомогою `--no-gitignore`).
3. **Конфігурація TypeScript** — Оновлює будь-які файли `tsconfig.json`, щоб включити визначення типів Intlayer (`.intlayer/**/*.ts`).
4. **Створення файлу конфігурації** — Генерує `intlayer.config.ts` (для проєктів на TypeScript) або `intlayer.config.mjs` (для проєктів на JavaScript) з налаштуваннями за замовчуванням.
5. **Оновлення конфігурації Vite** — Якщо виявлено файл конфігурації Vite, додає імпорт для плагіна `vite-intlayer`.
6. **Оновлення конфігурації Next.js** — Якщо виявлено файл конфігурації Next.js, додає імпорт для плагіна `next-intlayer`.

## Приклади:

### Базова ініціалізація:

```bash
npx intlayer init
```

Це ініціалізує Intlayer у поточній директорії з автоматичним визначенням кореня проєкту.

### Ініціалізація з користувацьким коренем проєкту:

```bash
npx intlayer init --project-root ./my-project
```

Це ініціалізує Intlayer у вказаній директорії.

### Ініціалізація без оновлення .gitignore:

```bash
npx intlayer init --no-gitignore
```

Це налаштує всі файли конфігурації, але не змінить ваш файл `.gitignore`.

## Приклад виводу:

```bash
npx intlayer init
Checking Intlayer configuration...
✓ Added .intlayer to .gitignore
✓ Updated tsconfig.json to include intlayer types
✓ Created intlayer.config.ts
✓ Injected import into vite.config.ts
✓ Intlayer init setup complete.
```

## Примітки:

- Команда є ідемпотентною — ви можете безпечно запускати її кілька разів. Вже налаштовані кроки будуть пропущені.
- Якщо файл конфігурації вже існує, він не буде перезаписаний.
- Конфігурації TypeScript без масиву `include` (наприклад, конфігурації у стилі solution з посиланнями) пропускаються.
- Команда зупиниться з помилкою, якщо в корені проєкту не буде знайдено `package.json`.
