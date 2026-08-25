---
createdAt: 2026-08-24
updatedAt: 2026-08-24
title: Документация пакета elysia-intlayer
description: Плагин Elysia для Intlayer, предоставляющий функции перевода и определение локали.
keywords:
  - elysia-intlayer
  - elysia
  - plugin
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - elysia-intlayer
  - exports
history:
  - version: 9.4.0
    date: 2026-08-24
    changes: "Унифицированная документация для всех экспортов"
author: aymericzip
---

# Пакет elysia-intlayer

Пакет `elysia-intlayer` предоставляет плагин для приложений на Elysia для работы с интернационализацией. Он определяет локаль пользователя и внедряет объект `intlayer` в контекст маршрута.

## Установка

```bash packageManager="npm"
npm install intlayer elysia-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer elysia-intlayer
```

```bash packageManager="yarn"
yarn add intlayer elysia-intlayer
```

```bash packageManager="bun"
bun add intlayer elysia-intlayer
```

> `elysia` — это peer dependency (`>=1.0.0`). Elysia рассчитан на runtime **Bun**.

## Экспорты

### Плагин

Импорт:

```ts
import { intlayer } from "elysia-intlayer";
```

| Функция    | Описание                                                                                                                                                                                                                                                                                                                             | Связанная документация                                                                                         |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------- |
| `intlayer` | Плагин Elysia, который интегрирует Intlayer в ваше приложение Elysia. Обрабатывает определение локали из storage (cookies, headers), затем из `Accept-Language`, внедряет объект `intlayer`, предоставляющий `locale`, `t`, `getIntlayer` и `getDictionary`, в контекст маршрута и настраивает контекст запроса `AsyncLocalStorage`. | [intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/elysia-intlayer/intlayer.md) |

### Функции

Импорт:

```ts
import { t, getIntlayer, getDictionary } from "elysia-intlayer";
```

| Функция         | Описание                                                                                                                                                                                                                                                                 | Связанная документация                                                                                 |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------ |
| `t`             | Глобальная функция перевода, которая получает содержимое для текущей локали в Elysia. Использует `AsyncLocalStorage` для доступа к контексту запроса, настроенному плагином `intlayer`, и вне его возвращается к локали по умолчанию. Также доступна через `intlayer.t`. | [translation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/dictionary/translation.md) |
| `getIntlayer`   | Получает словарь по его ключу из сгенерированной декларации и возвращает его содержимое для текущей локали. Оптимизированная версия `getDictionary`. Использует `AsyncLocalStorage` для доступа к контексту запроса. Также доступна через `intlayer.getIntlayer`.        | -                                                                                                      |
| `getDictionary` | Обрабатывает объекты словарей и возвращает содержимое для текущей локали. Обрабатывает переводы `t()`, перечисления, markdown, HTML и т.д. Использует `AsyncLocalStorage` для доступа к контексту запроса. Также доступна через `intlayer.getDictionary`.                | -                                                                                                      |

### Типы

Импорт:

```ts
import type { IntlayerContext, TranslateFunction } from "elysia-intlayer";
```

| Тип                 | Описание                                                                                                                                                               |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `IntlayerContext`   | Форма объекта `intlayer`, внедряемого в каждый контекст маршрута: `locale`, `locale_storage`, `locale_detected`, `defaultLocale`, `t`, `getIntlayer`, `getDictionary`. |
| `TranslateFunction` | Сигнатура функции перевода, преобразующей locale map в содержимое, соответствующее локали текущего запроса.                                                            |

## Использование

```ts fileName="src/index.ts"
import { Elysia } from "elysia";
import { getDictionary, getIntlayer, intlayer, t } from "elysia-intlayer";
import dictionaryExample from "./index.content";

const app = new Elysia()
  // Загрузка плагина интернационализации
  .use(intlayer())
  // Читаем локаль и helpers из контекста маршрута
  .get("/", ({ intlayer }) => ({
    locale: intlayer!.locale,
    greeting: intlayer!.t({
      ru: "Привет",
      en: "Hello",
      fr: "Bonjour",
      es: "Hola",
    }),
    content: intlayer!.getIntlayer("index").exampleOfContent,
  }))
  // Или используем standalone helpers, привязанные к текущему запросу
  .get("/t_example", () =>
    t({
      ru: "Пример возвращаемого контента на русском",
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      es: "Ejemplo de contenido devuelto en español",
    })
  )
  .get("/getIntlayer_example", () => getIntlayer("index").exampleOfContent)
  .get(
    "/getDictionary_example",
    () => getDictionary(dictionaryExample).exampleOfContent
  )
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
```

> Плагин регистрирует свой контекст через **глобальный** `derive`, который Elysia типизирует как `Partial<{ intlayer: IntlayerContext }>`. Во время выполнения значение всегда присутствует для маршрутов, зарегистрированных после `.use(intlayer())`, поэтому используйте non-null assertion (`intlayer!.locale`) — или optional chaining — чтобы удовлетворить TypeScript в режиме `strict`.

## Связанная документация

- [Elysia i18n - Полное руководство по переводу вашего приложения](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/intlayer_with_elysia.md)
- [Конфигурация](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/configuration.md)
