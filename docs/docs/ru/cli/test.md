---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: Тестирование отсутствующих переводов
description: Узнайте, как тестировать и выявлять отсутствующие переводы в ваших словарях.
keywords:
  - Тест
  - Отсутствующие переводы
  - CLI
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - test
---

# Тестирование отсутствующих переводов

```bash
npx intlayer content test
```

## Псевдонимы:

- `npx intlayer test`

Эта команда анализирует ваши файлы деклараций контента, чтобы выявить отсутствующие переводы во всех настроенных локалях. Она предоставляет подробный отчет, показывающий, какие ключи переводов отсутствуют для каких локалей, помогая вам поддерживать согласованность вашего многоязычного контента.

## Пример вывода:

```bash
pnpm intlayer content test
Missing translations:
 - home-page                      - tr         - src/components/HomePage/homePage.content.ts
 - server-component               - es, tr     - src/components/ServerComponent/serverComponent.content.ts
 - client-component               - pl, tr     - src/components/ClientComponent/clientComponent.content.ts
Локали: en, ru, ja, fr, ko, zh, es, de, ar, it, en-GB, pt, hi, tr, pl
Обязательные локали: en
Отсутствующие локали: pl, tr, es
Отсутствующие обязательные локали: -
Всего отсутствующих локалей: 3
Всего отсутствующих обязательных локалей: 0
```

## Аргументы:

**Опции конфигурации:**

- **`--env`**: Указать окружение (например, `development`, `production`).
- **`--env-file [envFile]`**: Указать пользовательский файл окружения для загрузки переменных.
- **`--base-dir`**: Указать базовую директорию проекта.

> Пример: `npx intlayer content test --base-dir ./src --env-file .env.production.local`

- **`--no-cache`**: Отключить кэш.

  > Пример: `npx intlayer build --no-cache`

**Опции подготовки:**

- **`--build`**: Собрать словари перед отправкой, чтобы гарантировать актуальность контента. Значение true принудительно запускает сборку, false пропускает сборку, undefined позволяет использовать кэш сборки.

**Опции логирования:**

- **`--verbose`**: Включить подробное логирование для отладки. (по умолчанию true при использовании CLI)

  > Пример: `npx intlayer content test --verbose`

## Пример:

```bash
npx intlayer content test --verbose
```

Вывод помогает быстро определить, какие переводы необходимо завершить, чтобы ваше приложение корректно работало во всех настроенных локалях.
