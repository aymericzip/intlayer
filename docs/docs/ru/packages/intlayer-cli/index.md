# intlayer-cli: NPM Пакет для использования Intlayer CLI

**Intlayer** , это набор пакетов, специально разработанных для JavaScript-разработчиков. Он совместим с такими фреймворками, как React, React и Express.js.

Пакет **`intlayer-cli`** , это NPM пакет, который использует пакет `@intlayer/cli` и делает его доступным для интерфейсов командной строки `intlayer`.

> Обратите внимание, что этот пакет не требуется, если установлен пакет [`intlayer`](https://github.com/aymericzip/intlayer/tree/main/docs/ru/packages/intlayer/index.md). В отличие от пакета `intlayer`, пакет `intlayer-cli` является более легким пакетом, который содержит только инструмент CLI, без зависимостей `@intlayer/core`.

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

Пример использования пакета `intlayer-cli`:

```bash
npx intlayer dictionaries build
```

## Команды CLI

Intlayer предоставляет инструмент CLI для:

- аудита ваших деклараций контента и заполнения отсутствующих переводов
- создания словарей из ваших деклараций контента
- загрузки и выгрузки удаленных словарей из вашей CMS в ваш локальный проект

Обратитесь к [intlayer-cli](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_cli.md) для получения дополнительной информации.
