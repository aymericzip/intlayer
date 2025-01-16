# intlayer-cli: NPM пакет для использования Intlayer CLI

**Intlayer** - это набор пакетов, разработанных специально для разработчиков JavaScript. Он совместим с такими фреймворками, как React, React и Express.js.

Пакет **`intlayer-cli`** является NPM пакетом, который использует пакет `@intlayer/cli` и делает его доступным для интерфейсов командной строки `intlayer`.

> Обратите внимание, что этот пакет не нужен, если установлен пакет [`intlayer`](https://github.com/aymericzip/intlayer/tree/main/docs/ru/packages/intlayer/index.md). В отличие от пакета `intlayer`, пакет `intlayer-cli` является более легким пакетом, который содержит только инструмент CLI, без зависимостей `@intlayer/core`.

## Установка

Установите необходимый пакет, используя ваш предпочтительный менеджер пакетов:

```bash packageManager="npm"
npm install intlayer-cli
```

```bash packageManager="pnpm"
pnpm add intlayer-cli
```

```bash packageManager="yarn"
yarn add intlayer-cli
```

## Использование

Вот пример того, как использовать пакет `intlayer-cli`:

```bash
npx intlayer build
```

## Команды CLI

Intlayer предоставляет инструмент CLI для:

- аудита ваших деклараций контента и завершения недостающих переводов
- создания словарей из ваших деклараций контента
- отправки и получения удаленных словарей из вашей CMS в ваш локальный проект

Консультируйтесь с [intlayer-cli](https://github.com/aymericzip/intlayer/blob/main/docs/ru/intlayer_cli.md) для получения дополнительной информации.
