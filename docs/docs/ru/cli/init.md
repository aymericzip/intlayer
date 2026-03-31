---
createdAt: 2025-12-30
updatedAt: 2025-12-30
title: Инициализация Intlayer
description: Узнайте, как инициализировать Intlayer в вашем проекте.
keywords:
  - Инициализация
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
    changes: "Добавлена опция --no-gitignore"
  - version: 7.5.9
    date: 2025-12-30
    changes: "Добавлена команда init"
---

# Инициализация Intlayer

```bash
npx intlayer init
```

Команда `init` автоматически настраивает Intlayer в вашем проекте, создавая необходимые файлы и настройки. Это рекомендуемый способ начать работу с Intlayer.

## Алиасы:

- `npx intlayer init`

## Аргументы:

- `--project-root [projectRoot]` - Необязательно. Укажите корневую директорию проекта. Если не указано, команда будет искать корень проекта, начиная с текущей рабочей директории.
- `--no-gitignore` - Необязательно. Пропустить автоматическое обновление файла `.gitignore`. Если этот флаг установлен, `.intlayer` не будет добавлен в `.gitignore`.

## Что она делает:

Команда `init` выполняет следующие задачи по настройке:

1. **Проверяет структуру проекта** — Убеждается, что вы находитесь в директории валидного проекта с файлом `package.json`.
2. **Обновляет `.gitignore`** — Добавляет `.intlayer` в ваш файл `.gitignore`, чтобы исключить сгенерированные файлы из системы контроля версий (можно пропустить с помощью `--no-gitignore`).
3. **Настраивает TypeScript** — Обновляет любые файлы `tsconfig.json`, чтобы включить определения типов Intlayer (`.intlayer/**/*.ts`).
4. **Создает файл конфигурации** — Генерирует `intlayer.config.ts` (для проектов на TypeScript) или `intlayer.config.mjs` (для проектов на JavaScript) с настройками по умолчанию.
5. **Обновляет конфиг Vite** — Если обнаружен файл конфигурации Vite, добавляет импорт плагина `vite-intlayer`.
6. **Обновляет конфиг Next.js** — Если обнаружен файл конфигурации Next.js, добавляет импорт плагина `next-intlayer`.

## Примеры:

### Базовая инициализация:

```bash
npx intlayer init
```

Это инициализирует Intlayer в текущей директории, автоматически определяя корень проекта.

### Инициализация с указанием корня проекта:

```bash
npx intlayer init --project-root ./my-project
```

Это инициализирует Intlayer в указанной директории.

### Инициализация без обновления .gitignore:

```bash
npx intlayer init --no-gitignore
```

Это настроит все файлы конфигурации, но не изменит ваш `.gitignore`.

## Пример вывода:

```bash
npx intlayer init
Checking Intlayer configuration...
✓ Added .intlayer to .gitignore
✓ Updated tsconfig.json to include intlayer types
✓ Created intlayer.config.ts
✓ Injected import into vite.config.ts
✓ Intlayer init setup complete.
```

## Примечания:

- Команда идемпотентна — вы можете безопасно запускать ее несколько раз. Она пропустит уже выполненные шаги.
- Если файл конфигурации уже существует, он не будет перезаписан.
- Конфигурационные файлы TypeScript без массива `include` (например, конфигурации в стиле solution со ссылками) пропускаются.
- Команда завершится с ошибкой, если в корне проекта не найден `package.json`.
