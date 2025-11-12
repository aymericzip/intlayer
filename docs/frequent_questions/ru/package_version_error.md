---
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: Я получаю ошибку, связанную с суб-пакетами `@intlayer/*`
description: Исправление ошибки, связанной с суб-пакетами `@intlayer/*`.
keywords:
  - @intlayer/*
  - суб-пакеты
  - intlayer
slugs:
  - frequent-questions
  - package-version-error
---

# Я получаю ошибку, связанную с суб-пакетами `@intlayer/*`

Эта проблема обычно возникает после обновления пакетов Intlayer.

Пример сообщения об ошибке:

```bash
Error: Cannot find module '@intlayer/types'
```

```bash
TypeError: (0 , __intlayer_config_client.colorize) is not a function

at import { colorize } from '@intlayer/config';
```

```bash
✖ ERROR  No matching export in "node_modules/@intlayer/config/dist/esm/client.mjs" for import "clearModuleCache"

node_modules/@intlayer/unmerged-dictionaries-entry/dist/esm/index.mjs:3:9:
3 | import { clearModuleCache, configESMxCJSRequire } from "@intlayer/config";
  |          ~~~~~~~~~~~~~~~~

✖ ERROR  Нет соответствующего экспорта в "node_modules/@intlayer/config/dist/esm/client.mjs" для импорта "configESMxCJSRequire"

node_modules/@intlayer/unmerged-dictionaries-entry/dist/esm/index.mjs:3:27:
3 | import { clearModuleCache, configESMxCJSRequire } from "@intlayer/config";
  |                            ~~~~~~~~~~~~~~~~~~~~
```

## Причина

Базовые пакеты, такие как `intlayer`, `react-intlayer`, `react-native-intlayer`, `vue-intlayer`, повторно используют одни и те же суб-пакеты, такие как `@intlayer/config`, `@intlayer/core`, `@intlayer/types`, чтобы избежать дублирования кода.

Между двумя версиями экспорты суб-пакетов не гарантируются быть одинаковыми. Чтобы ограничить эту проблему, intlayer фиксирует версию суб-пакетов на версии основного пакета.

> Пример: `intlayer@1.0.0` использует `@intlayer/config@1.0.0`, `@intlayer/core@1.0.0`, `@intlayer/types@1.0.0`

> (За исключением `@intlayer/swc`), суб-пакеты `@intlayer/*` не предназначены для прямого использования. Поэтому мы рекомендуем не устанавливать их напрямую.

## Решение

1. Убедитесь, что версии основного пакета и суб-пакетов совпадают.

```json5
{
  "dependencies": {
    "intlayer": "7.0.1",
    "react-intlayer": "7.0.0", // Неверная версия, должна быть 7.0.1
  },
  "devDependencies": {
    "intlayer-editor": "7.0.1",
  },
}
```

2. Попробуйте удалить lockfile и папку node_modules, затем переустановить зависимости.

Иногда менеджер пакетов сохраняет старую версию суб-пакетов в lockfile или кэше. Чтобы исправить это, можно попробовать удалить lockfile и папку node_modules, а затем заново установить зависимости.

```bash
rm -rf package-lock.json node_modules
npm install
```

3. Проверьте глобальную установку

Рекомендуется устанавливать `intlayer` или `intlayer-cli` глобально для доступа к CLI-командам. Если глобальная версия отличается от локальной, менеджер пакетов может использовать неправильную версию.

**Проверка, установлен ли пакет глобально**

```bash
npm list -g --depth=0
```

```bash
npm list -g --depth=0 | grep intlayer
```

```bash
yarn global list
```

```bash
pnpm list -g --depth=0
```

**Исправление возможных конфликтов глобальных зависимостей**

```bash
npm uninstall -g intlayer intlayer-cli
```

```bash
yarn global remove intlayer intlayer-cli
```

```bash
pnpm remove -g intlayer intlayer-cli
```

5. Попробуйте очистить кэш

В некоторых средах, таких как docker, github actions или платформах веб-хостинга, например Vercel, может присутствовать кэш. Вы можете попробовать очистить кэш и повторить установку.

Также можно попробовать очистить кэш вашего менеджера пакетов с помощью следующей команды:

```bash
npm cache clean --force
```

```bash
yarn cache clean
```

```bash
pnpm cache clean
```
