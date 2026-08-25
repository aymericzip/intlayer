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

```ts fileName="src/index.ts"
import { Elysia } from "elysia";
import { intlayer } from "elysia-intlayer";

const app = new Elysia().use(intlayer()).get("/", ({ intlayer }) =>
  intlayer!.t({
    ru: "Привет",
    en: "Hello",
    fr: "Bonjour",
    es: "Hola",
  })
);
```

> Плагин регистрирует свой контекст через **глобальный** `derive`, который Elysia типизирует как `Partial<{ intlayer: IntlayerContext }>`. Во время выполнения значение всегда присутствует для маршрутов, зарегистрированных после `.use(intlayer())`, поэтому используйте non-null assertion (`intlayer!.t`) — или optional chaining — чтобы удовлетворить TypeScript в режиме `strict`.

Те же хелперы доступны как отдельные экспорты, поэтому их можно вызывать без деструктуризации контекста маршрута:

```ts fileName="src/index.ts"
import { Elysia } from "elysia";
import { intlayer, t } from "elysia-intlayer";

const app = new Elysia().use(intlayer()).get("/", () =>
  t({
    ru: "Привет",
    en: "Hello",
    fr: "Bonjour",
    es: "Hola",
  })
);
```

## Описание

Плагин выполняет следующие задачи:

1. **Определение локали**: Он считывает локаль, явно заданную клиентом, из storage (cookie, header), а затем возвращается к локали, согласованной по заголовку `Accept-Language`.
2. **Внедрение в контекст**: Добавляет свойство `intlayer` в контекст маршрута Elysia (см. таблицу «Контекст маршрута» ниже).
3. **Управление контекстом**: Использует `AsyncLocalStorage` для управления асинхронным контекстом, позволяя глобальным функциям Intlayer (`t`, `getIntlayer`, `getDictionary`) получать доступ к локали, специфичной для запроса, без передачи объекта контекста.
4. **Подготовка словарей**: Вызывает `prepareIntlayer` при создании плагина, поэтому словари собираются при старте приложения.

### Контекст маршрута

| Свойство          | Тип                    | Описание                                                                                        |
| ----------------- | ---------------------- | ----------------------------------------------------------------------------------------------- |
| `locale`          | `Locale`               | Локаль, используемая для этого запроса; `locale_storage` имеет приоритет над `locale_detected`. |
| `locale_storage`  | `Locale` (опционально) | Локаль, явно запрошенная клиентом через cookie или header.                                      |
| `locale_detected` | `Locale`               | Локаль, согласованная по заголовкам запроса.                                                    |
| `defaultLocale`   | `Locale`               | Локаль, настроенная как fallback в `intlayer.config.ts`.                                        |
| `t`               | `TranslateFunction`    | Функция перевода.                                                                               |
| `getIntlayer`     | `typeof getIntlayer`   | Функция для получения словарей по ключу.                                                        |
| `getDictionary`   | `typeof getDictionary` | Функция для обработки объектов словарей.                                                        |

> В отличие от плагинов Intlayer, основанных на Node, `elysia-intlayer` опирается на `AsyncLocalStorage` вместо `cls-hooked`, потому что `cls-hooked` зависит от `async_hooks.createHook`, который Bun не реализует.

Контекст запроса освобождается сразу после маппинга ответа, поэтому отдельные хелперы никогда не разрешаются относительно уже завершённого запроса. При вызове вне запроса, обрабатываемого плагином, они возвращаются к настроенной локали по умолчанию.

## Порядок определения локали

По умолчанию плагин определяет локаль в следующем порядке:

1. Cookie `INTLAYER_LOCALE`.
2. Заголовок `x-intlayer-locale`.
3. Согласование через заголовок `Accept-Language`.
4. Настроенная `defaultLocale`.

```bash
# Согласовано из `Accept-Language`
curl -H "Accept-Language: fr" http://localhost:3000/
# Bonjour

# Cookie имеет приоритет над `Accept-Language`
curl -H "Accept-Language: fr" -H "Cookie: INTLAYER_LOCALE=es" http://localhost:3000/
# Hola

# Заголовок имеет приоритет над `Accept-Language`
curl -H "Accept-Language: fr" -H "x-intlayer-locale: es" http://localhost:3000/
# Hola
```

## Конфигурация

Плагин читает ваш файл `intlayer.config.ts`. Вы можете настроить cookie и header, используемые для определения локали:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  routing: {
    storage: [
      { type: "header", name: "my-locale-header" },
      { type: "cookie", name: "my-locale-cookie" },
    ],
  },
};

export default config;
```

> Дополнительную информацию о конфигурации смотрите в [документации по конфигурации](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/configuration.md).

## Связанная документация

- [Документация пакета elysia-intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/elysia-intlayer/exports.md)
- [Elysia i18n - Полное руководство по переводу вашего приложения](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_with_elysia.md)
