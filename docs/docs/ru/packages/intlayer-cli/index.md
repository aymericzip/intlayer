---
createdAt: 2025-02-07
updatedAt: 2025-06-29
title: intlayer-cli - Инструмент командной строки для интернационализации
description: Пакет интерфейса командной строки для Intlayer, предоставляющий инструменты для управления переводами, создания словарей и автоматизации процессов интернационализации.
keywords:
  - intlayer
  - CLI
  - командная строка
  - интернационализация
  - i18n
  - инструменты
  - NPM
  - автоматизация
slugs:
  - doc
  - package
  - intlayer-cli
---

# intlayer-cli: NPM пакет для использования Intlayer CLI

**Intlayer** - это набор пакетов, разработанных специально для разработчиков на JavaScript. Он совместим с такими фреймворками, как React, React и Express.js.

Пакет **`intlayer-cli`** является NPM-пакетом, который использует пакет `@intlayer/cli` и делает его доступным для интерфейсов командной строки `intlayer`.

> Обратите внимание, что этот пакет не требуется, если установлен пакет [`intlayer`](https://github.com/aymericzip/intlayer/tree/main/docs/ru/packages/intlayer/index.md). По сравнению с пакетом `intlayer`, пакет `intlayer-cli` является более легким и содержит только инструмент CLI, без зависимостей `@intlayer/core`.

## Установка

Установите необходимый пакет, используя предпочитаемый менеджер пакетов:

```bash packageManager="npm"
npm install intlayer-cli -g
```

```bash packageManager="pnpm"
pnpm add intlayer-cli -g
```

```bash packageManager="yarn"
yarn add intlayer-cli -g
```

## Использование

Вот пример использования пакета `intlayer-cli`:

```bash
npx intlayer dictionaries build
```

## Команды CLI

Intlayer предоставляет инструмент CLI для:

- аудита ваших деклараций контента и дополнения отсутствующих переводов
- создания словарей из ваших деклараций контента
- отправки и получения удалённых словарей из вашей CMS в локальный проект

Для получения дополнительной информации обратитесь к [intlayer-cli](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_cli.md).

## История документации

- 5.5.10 - 2025-06-29: Инициализация истории
