---
createdAt: 2026-09-23
updatedAt: 2026-11-13
priority: 5
title: CLI - Обновление пакетов Intlayer
description: Узнайте, как использовать команду upgrade в Intlayer CLI для вывода списка всех пакетов Intlayer вашего проекта или монорепозитория и их обновления до последней версии.
keywords:
  - CLI
  - Upgrade
  - Обновление
  - Пакеты
  - Монорепозиторий
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - upgrade
history:
  - version: 9.8.1
    date: 2026-11-13
    changes: "Установка и регистрация плагинов lint / Prettier, обновление записей MCP-сервера"
  - version: 9.5.8
    date: 2026-09-23
    changes: "Добавить команду upgrade"
author: aymericzip
---

# Обновление пакетов Intlayer

```bash packageManager="npm"
npx intlayer upgrade
```

```bash packageManager="yarn"
yarn intlayer upgrade
```

```bash packageManager="pnpm"
pnpm intlayer upgrade
```

```bash packageManager="bun"
bun x intlayer upgrade
```

Команда `upgrade` выводит пакеты Intlayer, объявленные в каждом `package.json` проекта, включая workspaces монорепозитория, и обновляет их до последней опубликованной версии: интеграции с фреймворками, `eslint-plugin-intlayer`, `prettier-plugin-intlayer`, `intlayer-editor`, `@intlayer/mcp` и все остальные пакеты `@intlayer/*`. Затем обновляет связанные инструменты.

## Аргументы:

- `--project-root [projectRoot]` - Необязательно. Корневой каталог проекта. По умолчанию команда начинает поиск с ближайшего `package.json` выше текущего рабочего каталога.
- `--dry-run` - Необязательно. Выводит список пакетов и их целевую версию без изменения файлов.
- `--tag <tag>` - Необязательно. npm dist-tag для обновления (например, `canary`). По умолчанию `latest`.
- `--no-eslint` - Необязательно. Не устанавливает и не регистрирует правила линтинга Intlayer.
- `--no-prettier` - Необязательно. Не устанавливает и не регистрирует плагин Prettier от Intlayer.

## Что делает команда:

1. **Составляет список пакетов Intlayer** - Сканирует каждый `package.json` проекта (пропуская `node_modules` и результаты сборки) на наличие зависимостей и dev-зависимостей `intlayer`, `@intlayer/*`, `*-intlayer` и `intlayer-*`.
2. **Получает целевую версию** - Считывает версию выбранного dist-tag (по умолчанию `latest`) каждого пакета из реестра npm.
3. **Переписывает диапазоны** - Обновляет каждый устаревший диапазон прямо в файле, сохраняя его оператор (`^`, `~` или без оператора) и форматирование файла.
4. **Устанавливает за один раз** - Выполняет единую установку из корня воркспейса (ближайшего каталога с lock-файлом), используя пакетный менеджер, которому принадлежит lock-файл:

| Lock-файл                   | Команда        |
| --------------------------- | -------------- |
| `bun.lock` / `bun.lockb`    | `bun install`  |
| `pnpm-lock.yaml`            | `pnpm install` |
| `yarn.lock`                 | `yarn install` |
| `package-lock.json` или нет | `npm install`  |

Если lock-файл отсутствует, используется поле `packageManager` из `package.json` (например, `"bun@1.2.0"`), прежде чем вернуться к npm.

Диапазоны, не указывающие на реестр, такие как `workspace:*`, `file:`, `link:`, `catalog:` или git-URL, никогда не изменяются.

5. **Плагины линтинга и Prettier** - Если проект использует ESLint / oxlint или Prettier, устанавливает недостающие `eslint-plugin-intlayer` / `prettier-plugin-intlayer` и регистрирует их: `...intlayer.configs.recommended` во flat-конфиге ESLint, правила в `.oxlintrc.json` и плагин в конфиге Prettier (JSON, YAML, JavaScript или TypeScript). Если конфиг нельзя безопасно изменить, выводится фрагмент для вставки.
6. **MCP-сервер** - Направляет stdio-записи MCP Intlayer в проекте (`.mcp.json`, `.cursor/mcp.json`, `.vscode/mcp.json`…) на `@intlayer/mcp@<tag>`, чтобы `npx` запускал обновлённый сервер, а не кэшированную копию.

## Примеры:

### Вывести список доступных обновлений без их применения:

```bash packageManager="npm"
npx intlayer upgrade --dry-run
```

```bash packageManager="yarn"
yarn intlayer upgrade --dry-run
```

```bash packageManager="pnpm"
pnpm intlayer upgrade --dry-run
```

```bash packageManager="bun"
bun x intlayer upgrade --dry-run
```

### Обновить до canary-релиза:

```bash packageManager="npm"
npx intlayer upgrade --tag canary
```

```bash packageManager="yarn"
yarn intlayer upgrade --tag canary
```

```bash packageManager="pnpm"
pnpm intlayer upgrade --tag canary
```

```bash packageManager="bun"
bun x intlayer upgrade --tag canary
```

## Пример вывода:

```bash
npx intlayer upgrade
Intlayer packages:
  package.json
    intlayer ^9.0.0 → ^9.5.7
  apps/web/package.json
    next-intlayer ^9.5.7 (latest)
    vite-intlayer ~9.2.0 → ~9.5.7
Running bun install...
✓ Upgraded 2 Intlayer dependencies to latest
```

## Примечания:

- Запустите команду из корня вашего репозитория, чтобы обновить все воркспейсы. Запустите ее из конкретного воркспейса, чтобы обновить только его.
- Пакеты, версию которых не удалось получить (офлайн, приватный или неопубликованный пакет), выводятся в списке и остаются без изменений.
- Если установка завершается с ошибкой, обновленные диапазоны сохраняются в `package.json`. Запустите команду установки вашего пакетного менеджера вручную.
