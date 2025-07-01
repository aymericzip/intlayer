---
docName: package__@intlayer_chokidar
url: https://intlayer.org/doc/package/@intlayer_chokidar
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/@intlayer/chokidar/index.md
createdAt: 2025-02-07
updatedAt: 2025-06-29
title: @intlayer/chokidar - Отслеживание файлов для Intlayer i18n
description: Пакет NPM, предоставляющий возможности отслеживания файлов для Intlayer, обеспечивая автоматическое обновление и горячую перезагрузку для контента интернационализации.
keywords:
  - intlayer
  - chokidar
  - отслеживание файлов
  - горячая перезагрузка
  - i18n
  - JavaScript
  - NPM
  - разработка
---

# @intlayer/chokidar: Пакет NPM для сканирования и сборки декларационных файлов Intlayer в словари

**Intlayer** — это набор пакетов, разработанных специально для JavaScript-разработчиков. Он совместим с такими фреймворками, как React, React и Express.js.

Пакет **`@intlayer/chokidar`** используется для сканирования и построения файлов деклараций Intlayer в словари с использованием [chokidar](https://github.com/paulmillr/chokidar) и в соответствии с [конфигурацией Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/configuration.md).

## Использование

```ts
import { watch, prepareIntlayer } from "@intlayer/chokidar";

await prepareIntlayer(); // Построить словари Intlayer

watch({ persistent: true }); // Отслеживать изменения в конфигурационных файлах
```

## Установка

Установите необходимый пакет, используя предпочитаемый менеджер пакетов:

```bash packageManager="npm"
npm install @intlayer/chokidar
```

```bash packageManager="pnpm"
pnpm add @intlayer/chokidar
```

```bash packageManager="yarn"
yarn add @intlayer/chokidar
```

## История документации

- 5.5.10 - 2025-06-29: Инициализация истории
