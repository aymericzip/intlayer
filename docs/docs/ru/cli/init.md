---
createdAt: 2025-12-30
updatedAt: 2026-09-29
priority: 5
title: "intlayer init: настройка Intlayer в проекте"
description: "Запустите intlayer init, чтобы добавить Intlayer в существующий проект: команда определит фреймворк, установит пакеты и запишет конфигурацию."
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
  - version: 9.5.13
    date: 2026-09-29
    changes: "init только устанавливает пакеты и настраивает фреймворк; добавлена отдельная подкоманда для каждого шага; --interactive завершается ошибкой без терминала"
  - version: 9.5.6
    date: 2026-09-21
    changes: "Добавить подкоманду init infra"
  - version: 8.6.4
    date: 2026-03-31
    changes: "Добавлена опция --no-gitignore"
  - version: 7.5.9
    date: 2025-12-30
    changes: "Добавлена команда init"
author: aymericzip
---

# Инициализация Intlayer

```bash packageManager="npm"
npx intlayer init
```

```bash packageManager="yarn"
yarn intlayer init
```

```bash packageManager="pnpm"
pnpm intlayer init
```

```bash packageManager="bun"
bun x intlayer init
```

Команда `init` устанавливает пакеты Intlayer и настраивает ваш фреймворк (файл конфигурации, TypeScript, плагин бандлера, middleware/proxy, провайдеры). Это рекомендуемый способ начать работу с Intlayer.

Всё остальное (CI-воркфлоу, AI-скиллы, MCP-сервер, инструменты редактора, правила линтера, CMS, инфраструктура) подключается по желанию: выберите это в чек-листе `--interactive` или запустите отдельную подкоманду (см. ниже).

## Алиасы:

- `npx intlayer init`

## Аргументы:

- `--project-root [projectRoot]` - Необязательно. Укажите корневую директорию проекта. Если не указано, команда будет искать корень проекта, начиная с текущей рабочей директории.
- `--no-gitignore` - Необязательно. Пропустить автоматическое обновление файла `.gitignore`. Если этот флаг установлен, `.intlayer` не будет добавлен в `.gitignore`.
- `--no-framework-setup` - Необязательно. Только устанавливает пакеты, не изменяя файлы проекта.
- `--routing <routing>` - Необязательно. Маршрутизация локалей: `prefix-no-default` (по умолчанию), `prefix-all`, `no-prefix`, `search-params` или `none`.
- `--content <layout>` - Необязательно. Как объявляется контент:
  - `multilingual` - `{fileName}.content.{ts,json}` рядом с компонентом, все локали в одном файле (задает `compiler.output`).
  - `per-locale` - `{fileName}.{locale}.content.{ts,json}` рядом с компонентом (задает `compiler.output` и `dictionary.locale`).
  - `centralized` - один каталог `/locales/{locale}.{json,po}` на локаль (добавляет плагин `syncJSON` / `syncPO`).
  - `namespaces` - каталоги `/locales/{locale}/{namespace}.{json,po}` (добавляет плагин `syncJSON` / `syncPO`).
- `--content-format <format>` - Необязательно, с `--content`. `ts` или `json` для `multilingual` / `per-locale`, `json` или `po` для `centralized` / `namespaces`. По умолчанию первое.
- `--message-format <format>` - Необязательно, с `--content centralized` или `namespaces` в JSON. Синтаксис сообщений каталогов: `icu` (по умолчанию), `i18next`, `vue-i18n` или `intlayer`.
- `-i, --interactive` - Необязательно. Выберите шаги настройки из чек-листа (пакеты, CI, скиллы, MCP, VS Code, LSP, линтер, CMS, инфраструктура, …) вместо набора по умолчанию. Нужен терминал: без него (AI-агент, CI) команда завершается ошибкой и выводит список подкоманд, которые нужно запустить вместо неё.
- `--no-github-actions` - Необязательно. С `--interactive` никогда не создаёт воркфлоу GitHub Actions, даже если они выбраны.

## Что она делает:

Команда `init` выполняет следующие задачи по настройке:

1. **Проверяет структуру проекта** - Убеждается, что вы находитесь в директории валидного проекта с файлом `package.json`.
2. **Устанавливает пакеты** - Устанавливает недостающие для вашего стека пакеты Intlayer (например, `react-intlayer`, `vite-intlayer`) и обновляет устаревшие.
3. **Обновляет `.gitignore`** - Добавляет `.intlayer` в ваш файл `.gitignore`, чтобы исключить сгенерированные файлы из системы контроля версий (можно пропустить с помощью `--no-gitignore`).
4. **Настраивает TypeScript** - Обновляет любые файлы `tsconfig.json`, чтобы включить определения типов Intlayer (`.intlayer/**/*.ts`).
5. **Создает файл конфигурации** - Генерирует `intlayer.config.ts` (для проектов на TypeScript) или `intlayer.config.mjs` (для проектов на JavaScript) с настройками по умолчанию.
6. **Обновляет конфигурацию бандлера / фреймворка** - Добавляет плагин Intlayer в конфигурацию Vite, Next.js, Nuxt, Astro, …, и создаёт middleware/proxy и провайдеры, если фреймворк это поддерживает.

## Настройка по одному шагу

У каждого шага чек-листа `--interactive` есть своя подкоманда. Они ничего не спрашивают, если значения переданы флагами, поэтому их можно безопасно запускать из AI-агента или CI-задачи.

| Команда                                                               | Что настраивает                                                                             |
| --------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| `intlayer init packages`                                              | Устанавливает недостающие пакеты Intlayer и обновляет устаревшие                            |
| `intlayer init project [--routing <routing>] [--content <layout>]`    | Файл конфигурации, TypeScript, плагин бандлера, middleware/proxy, провайдеры и `.gitignore` |
| `intlayer init github-actions`                                        | Воркфлоу GitHub Actions `fill` и `test`                                                     |
| `intlayer init vscode-extension`                                      | Рекомендует расширение Intlayer в `.vscode/extensions.json`                                 |
| `intlayer init lsp`                                                   | Языковой сервер Intlayer в `.vscode/settings.json`                                          |
| `intlayer init eslint`                                                | Правила линтера Intlayer (ESLint / oxlint), если в проекте уже есть линтер                  |
| `intlayer init skills [--platform <platform>] [--skills <skills…>]`   | Документацию Intlayer в виде скиллов для AI-агентов                                         |
| `intlayer init mcp [--platform <platform>] [--transport <stdio/sse>]` | MCP-сервер Intlayer                                                                         |
| `intlayer init extension [--browser <chrome/firefox>]`                | Открывает страницу расширения Intlayer для браузера в магазине                              |
| `intlayer init cms`                                                   | Вход в Intlayer CMS через браузер и сохранение учётных данных в `.env`                      |
| `intlayer init infra --mode <desktop/docker/compose>`                 | Десктопное приложение или self-hosted стек                                                  |

### Из AI-агента или CI-задачи

У оболочки AI-агента нет терминала, поэтому ответить на вопрос невозможно. Используйте команду по умолчанию, а затем нужные подкоманды:

```bash
npx intlayer init
npx intlayer init skills --platform Claude
npx intlayer init mcp --platform Claude --transport stdio
```

Без терминала:

- `init skills` устанавливает скиллы, подходящие вашему стеку, если не задан `--skills` (например, `--skills Usage Content React`).
- `init skills` и `init mcp` используют обнаруженную AI-платформу (Claude Code, Cursor, VS Code, Windsurf, …), если не задан `--platform`, и завершаются ошибкой со списком платформ, если ни одна не обнаружена.
- `init mcp` использует транспорт `stdio`, если не задан `--transport`.
- `init infra` требует `--mode`, а `init extension` только выводит ссылки на магазин, если не задан `--browser`.

MCP-сервер всегда настраивается внутри проекта (для Claude Code в `.mcp.json`).

## Примеры:

### Базовая инициализация:

```bash packageManager="npm"
npx intlayer init
```

```bash packageManager="yarn"
yarn intlayer init
```

```bash packageManager="pnpm"
pnpm intlayer init
```

```bash packageManager="bun"
bun x intlayer init
```

Это инициализирует Intlayer в текущей директории, автоматически определяя корень проекта.

### Инициализация с указанием корня проекта:

```bash packageManager="npm"
npx intlayer init --project-root ./my-project
```

```bash packageManager="yarn"
yarn intlayer init --project-root ./my-project
```

```bash packageManager="pnpm"
pnpm intlayer init --project-root ./my-project
```

```bash packageManager="bun"
bun x intlayer init --project-root ./my-project
```

Это инициализирует Intlayer в указанной директории.

### Инициализация без обновления .gitignore:

```bash packageManager="npm"
npx intlayer init --no-gitignore
```

```bash packageManager="yarn"
yarn intlayer init --no-gitignore
```

```bash packageManager="pnpm"
pnpm intlayer init --no-gitignore
```

```bash packageManager="bun"
bun x intlayer init --no-gitignore
```

Это настроит все файлы конфигурации, но не изменит ваш `.gitignore`.

### Настройка инфраструктуры (десктопное приложение или собственный хостинг):

```bash
npx intlayer init infra
```

Загружает и запускает размещенный установщик (`https://intlayer.org/install.sh`, или `install.ps1` в Windows), который предлагает выбрать способ запуска Intlayer:

- **Десктопное приложение** - устанавливает нативное приложение панели управления на ваш компьютер, подключенное к Intlayer Cloud.
- **Docker «все в одном» (All-in-one)** - панель управления + API + MongoDB + Redis + MinIO в едином контейнере.
- **Docker Compose** - отдельный контейнер для каждого сервиса для масштабируемого собственного хостинга.

Пропустите меню с помощью флага `--mode`:

```bash
npx intlayer init infra --mode compose
```

Этот же шаг доступен в `npx intlayer init --interactive`. Смотрите [справочник `init infra`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/cli/infra.md) для параметров установщика и [руководство по самостоятельному хостингу](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/self_hosting.md) для описания каждого режима.

- [справочник `init infra`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/cli/infra.md)
- [руководство по самостоятельному хостингу](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/self_hosting.md)

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

- Команда идемпотентна - вы можете безопасно запускать ее несколько раз. Она пропустит уже выполненные шаги.
- Если файл конфигурации уже существует, он не будет перезаписан.
- Конфигурационные файлы TypeScript без массива `include` (например, конфигурации в стиле solution со ссылками) пропускаются.
- Команда завершится с ошибкой, если в корне проекта не найден `package.json`.
