---
createdAt: 2026-08-24
updatedAt: 2026-08-24
title: Документация плагина intlayer для Elysia | elysia-intlayer
description: Узнайте, как использовать плагин intlayer из пакета elysia-intlayer
keywords:
  - intlayer
  - elysia
  - plugin
  - Intlayer
  - Интернационализация
  - Документация
slugs:
  - doc
  - packages
  - elysia-intlayer
  - intlayer
history:
  - version: 9.4.0
    date: 2026-08-24
    changes: "Инициализация документации"
author: aymericzip
---

# Документация плагина intlayer для Elysia

Плагин `intlayer` для Elysia определяет локаль пользователя и внедряет объект `intlayer` в контекст маршрута. Он также позволяет использовать глобальные функции перевода в контексте запроса.

## Использование

```ts
import { Elysia } from "elysia";
import { intlayer } from "elysia-intlayer";

const app = new Elysia().use(intlayer()).get("/", ({ intlayer }) =>
  intlayer.t({
    ru: "Привет",
    en: "Hello",
    fr: "Bonjour",
  })
);
```

Те же хелперы доступны как отдельные экспорты, поэтому их можно вызывать без деструктуризации контекста маршрута:

```ts
import { Elysia } from "elysia";
import { intlayer, t } from "elysia-intlayer";

const app = new Elysia().use(intlayer()).get("/", () =>
  t({
    ru: "Привет",
    en: "Hello",
    fr: "Bonjour",
  })
);
```

## Описание

Плагин выполняет следующие задачи:

1. **Определение локали**: Он считывает локаль, явно заданную клиентом, из storage (cookie, header), а затем возвращается к локали, согласованной по заголовку `Accept-Language`.
2. **Внедрение в контекст**: Добавляет свойство `intlayer` в контекст маршрута Elysia, содержащее:
   - `locale`: Локаль, используемая для этого запроса; `locale_storage` имеет приоритет над `locale_detected`.
   - `locale_storage`: Локаль, явно запрошенная клиентом через cookie или header.
   - `locale_detected`: Локаль, согласованная по заголовкам запроса.
   - `defaultLocale`: Локаль, настроенная как fallback в `intlayer.config.ts`.
   - `t`: Функция перевода.
   - `getIntlayer`: Функция для получения словарей по ключу.
   - `getDictionary`: Функция для обработки объектов словарей.
3. **Управление контекстом**: Использует `AsyncLocalStorage` для управления асинхронным контекстом, позволяя глобальным функциям Intlayer (`t`, `getIntlayer`, `getDictionary`) получать доступ к локали, специфичной для запроса, без передачи объекта контекста.

> В отличие от плагинов Intlayer, основанных на Node, `elysia-intlayer` опирается на `AsyncLocalStorage` вместо `cls-hooked`, потому что `cls-hooked` зависит от `async_hooks.createHook`, который Bun не реализует.

Контекст запроса освобождается сразу после маппинга ответа, поэтому отдельные хелперы никогда не разрешаются относительно уже завершённого запроса. При вызове вне запроса, обрабатываемого плагином, они возвращаются к настроенной локали по умолчанию.

## Конфигурация

Плагин читает ваш файл `intlayer.config.ts`. Вы можете настроить cookie и header, используемые для определения локали:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.ENGLISH,
  },
  middleware: {
    headerName: "my-locale-header",
    cookieName: "my-locale-cookie",
  },
};

export default config;
```

> Дополнительную информацию о конфигурации смотрите в [документации по конфигурации](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/configuration.md).
