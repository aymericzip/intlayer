---
createdAt: 2026-09-23
updatedAt: 2026-09-23
title: CLI - Оновлення пакетів Intlayer
description: Дізнайтеся, як використовувати команду upgrade в Intlayer CLI, щоб отримати список усіх пакетів Intlayer вашого проєкту або монорепозиторію та оновити їх до останньої версії.
keywords:
  - CLI
  - Upgrade
  - Оновлення
  - Пакети
  - Монорепозиторій
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - upgrade
history:
  - version: 9.5.8
    date: 2026-09-23
    changes: "Додати команду upgrade"
author: aymericzip
---

# Оновлення пакетів Intlayer

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

Команда `upgrade` виводить список пакетів Intlayer, оголошених у кожному `package.json` вашого проєкту, включно з робочими просторами (workspaces) монорепозиторію, та оновлює їх до останньої опублікованої версії. Вона автономно виконує той самий крок оновлення пакетів, що й `intlayer init`.

## Аргументи:

- `--project-root [projectRoot]` - Необов'язково. Кореневий каталог проєкту. За замовчуванням команда починає з найближчого `package.json` вище поточного робочого каталогу.
- `--dry-run` - Необов'язково. Виводить список пакетів та їхніх цільових версій без зміни будь-яких файлів.
- `--tag <tag>` - Необов'язково. npm dist-tag для оновлення (наприклад, `canary`). За замовчуванням `latest`.

## Що вона робить:

1. **Складає список пакетів Intlayer** - Сканує кожен `package.json` проєкту (пропускаючи `node_modules` та результати збірки) на наявність залежностей і devDependencies `intlayer`, `@intlayer/*`, `*-intlayer` та `intlayer-*`.
2. **Отримує цільову версію** - Зчитує версію обраного dist-tag (за замовчуванням `latest`) кожного пакета з реєстру npm.
3. **Переписує діапазони версій** - Оновлює кожен застарілий діапазон безпосередньо у файлі, зберігаючи його оператор (`^`, `~` або без оператора) та форматування відступів.
4. **Встановлює за один раз** - Виконує єдине встановлення з кореня робочого простору (найближчого каталогу з lock-файлом), використовуючи менеджер пакетів, якому належить lock-файл:

| Lock-файл                     | Команда        |
| ----------------------------- | -------------- |
| `bun.lock` / `bun.lockb`      | `bun install`  |
| `pnpm-lock.yaml`              | `pnpm install` |
| `yarn.lock`                   | `yarn install` |
| `package-lock.json` або немає | `npm install`  |

Якщо lock-файлу немає, використовується поле `packageManager` з `package.json` (наприклад, `"bun@1.2.0"`), перш ніж перейти до npm.

Діапазони, які не вказують на реєстр, такі як `workspace:*`, `file:`, `link:`, `catalog:` або URL-адреси git, ніколи не змінюються.

## Приклади:

### Показати список доступних оновлень без їх застосування:

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

### Оновити до релізу canary:

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

## Приклад виводу:

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

## Примітки:

- Запустіть команду з кореня вашого репозиторію, щоб оновити всі робочі простори. Запустіть її з конкретного робочого простору, щоб оновити лише його.
- Пакети, версію яких неможливо отримати (офлайн, приватний або неопублікований пакет), додаються до списку та залишаються без змін.
- Якщо встановлення не вдалося, оновлені діапазони зберігаються в `package.json`. Запустіть команду встановлення вашого менеджера пакетів вручну.
