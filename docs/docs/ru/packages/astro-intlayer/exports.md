---
createdAt: 2026-01-21
updatedAt: 2026-09-19
priority: 5
title: Документация пакета astro-intlayer
description: Интеграция Astro для Intlayer, обеспечивающая маршрутизацию на основе локалей, промежуточное ПО, хуки, клиентское хранилище и управление словарями.
keywords:
  - astro-intlayer
  - astro
  - интернационализация
  - i18n
slugs:
  - doc
  - packages
  - astro-intlayer
  - exports
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "Добавлена документация хуков useIntlayer, useDictionary, useLocale, промежуточного ПО и форматтеров"
  - version: 8.0.0
    date: 2026-01-21
    changes: "Унифицированная документация для всех экспортов"
author: aymericzip
---

# Пакет astro-intlayer

Пакет `astro-intlayer` предоставляет необходимые инструменты для интеграции Intlayer в приложения Astro. Он настраивает маршрутизацию на основе локалей, управление словарями, перезапись страниц во время сборки, промежуточное ПО для запросов и хуки для доступа к мультиязычному контенту как в серверных компонентах `.astro`, так и в клиентских скриптах.

## Установка

```bash
npm install astro-intlayer
```

## Экспорты пакета

### Интеграция

Пакет `astro-intlayer` предоставляет интеграцию для Astro, настраивающую Intlayer в вашем проекте.

Импорт:

```tsx
import { intlayer } from "astro-intlayer";
```

или импорт по умолчанию в `astro.config.mjs`:

```ts
import { defineConfig } from "astro/config";
import intlayer from "astro-intlayer";

export default defineConfig({
  integrations: [intlayer()],
});
```

| Функция    | Описание                                                                                                                                                                                                      | Связанная документация                                                                                        |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| `intlayer` | Интеграция Astro, подготавливающая словари, настраивающая плагины Vite (алиасы, прокси маршрутизации, очистку), автоматически регистрирующая middleware и генерирующая предрендеренные страницы с новыми URL. | [intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/astro-intlayer/intlayer.md) |

### Хуки (Сервер и Клиент)

Импорт:

```tsx
import { useIntlayer, useDictionary, useLocale } from "astro-intlayer";
```

| Хук             | Описание                                                                                                                                                                                       | Связанная документация                                                                                                  |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `useIntlayer`   | Выбирает словарь по ключу и возвращает локализованный контент. В frontmatter `.astro` читает локаль запроса из `Astro.locals`. В клиентском `<script>` читает данные из клиентского хранилища. | [useIntlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/astro-intlayer/useIntlayer.md)     |
| `useDictionary` | Преобразует объект словаря и возвращает контент для разрешенной локали. Работает как в frontmatter, так и в клиентских скриптах.                                                               | [useDictionary](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/astro-intlayer/useDictionary.md) |
| `useLocale`     | Возвращает текущую локаль, локаль по умолчанию, доступные локали и функцию для обновления локали.                                                                                              | [useLocale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/astro-intlayer/useLocale.md)         |

### Промежуточное ПО (astro-intlayer/middleware)

Импорт:

```tsx
import { onRequest } from "astro-intlayer/middleware";
```

| Экспорт     | Тип                 | Описание                                                                                                                                                                | Связанная документация                                                                                          |
| ----------- | ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `onRequest` | `MiddlewareHandler` | Middleware Astro, определяющее локаль запроса и прикрепляющее `Astro.locals.intlayer`. Регистрируется автоматически интеграцией `intlayer()` или импортируется вручную. | [onRequest](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/astro-intlayer/onRequest.md) |

### Утилиты

Импорт:

```tsx
import { getIntlayerLocals } from "astro-intlayer";
```

| Функция             | Описание                                                                                                                         | Связанная документация |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------------- | ---------------------- |
| `getIntlayerLocals` | Вспомогательная функция для получения текущего объекта `IntlayerLocals` из области хранения запроса за пределами `Astro.locals`. | -                      |

### Клиентские утилиты (astro-intlayer/client)

Импорт:

```tsx
import {
  useIntlayer,
  useDictionary,
  useDictionaryDynamic,
  useLocale,
  useLocaleStorage,
  useLocaleCookie,
  getIntlayer,
  getDictionary,
  installIntlayer,
  setLocaleInStorage,
  setLocaleCookie,
  localeInStorage,
  localeCookie,
} from "astro-intlayer/client";
```

При импорте в браузере или внутри клиентских тегов `<script>` пакет `astro-intlayer` автоматически перенаправляет на `astro-intlayer/client` (на базе `vanilla-intlayer`), предоставляя клиентские геттеры словарей, подписки на хранилище и инструменты сохранения локали.

### Форматтеры (astro-intlayer/format)

Импорт:

```tsx
import {
  useIntl,
  useDate,
  useNumber,
  useCurrency,
  usePercentage,
  useRelativeTime,
  useList,
  useUnit,
  useCompact,
} from "astro-intlayer/format";
```

| Хук               | Описание                                                                                                            |
| ----------------- | ------------------------------------------------------------------------------------------------------------------- |
| `useIntl`         | Возвращает экземпляр Intl, привязанный к локали запроса или клиента с возможностями кэширования и подписки.         |
| `useDate`         | Возвращает функцию форматирования даты, предварительно привязанную к текущей локали (`Intl.DateTimeFormat`).        |
| `useNumber`       | Возвращает функцию форматирования чисел, предварительно привязанную к текущей локали (`Intl.NumberFormat`).         |
| `useCurrency`     | Возвращает функцию форматирования валюты, предварительно привязанную к текущей локали.                              |
| `usePercentage`   | Возвращает функцию форматирования процентов, предварительно привязанную к текущей локали.                           |
| `useRelativeTime` | Возвращает функцию форматирования относительного времени, привязанную к текущей локали (`Intl.RelativeTimeFormat`). |
| `useList`         | Возвращает функцию форматирования списков, привязанную к текущей локали (`Intl.ListFormat`).                        |
| `useUnit`         | Возвращает функцию форматирования единиц измерения, привязанную к текущей локали.                                   |
| `useCompact`      | Возвращает функцию компактного форматирования чисел, привязанную к текущей локали (например, `1.5K`).               |

### HTML-утилиты (astro-intlayer/html)

Импорт:

```tsx
import { renderHTML, useHTML, useHTMLRenderer } from "astro-intlayer/html";
```

| Экспорт           | Тип        | Описание                                                              |
| ----------------- | ---------- | --------------------------------------------------------------------- |
| `renderHTML`      | `Function` | Автономная служебная функция для рендеринга HTML-узлов.               |
| `useHTML`         | `Hook`     | Хук для получения контекста и конфигурации HTML-провайдера.           |
| `useHTMLRenderer` | `Hook`     | Хук для получения предварительно настроенной функции рендеринга HTML. |

### Markdown-утилиты (astro-intlayer/markdown)

Импорт:

```tsx
import {
  compileMarkdown,
  renderMarkdown,
  parseMarkdown,
  useMarkdown,
  useMarkdownRenderer,
} from "astro-intlayer/markdown";
```

| Экспорт               | Тип        | Описание                                                                  |
| --------------------- | ---------- | ------------------------------------------------------------------------- |
| `compileMarkdown`     | `Function` | Компилирует строки markdown в структурированное представление.            |
| `renderMarkdown`      | `Function` | Рендерит содержимое markdown в выходные узлы.                             |
| `parseMarkdown`       | `Function` | Анализирует необработанный markdown в AST.                                |
| `useMarkdown`         | `Hook`     | Хук для получения контекста провайдера markdown.                          |
| `useMarkdownRenderer` | `Hook`     | Хук для получения предварительно настроенной функции рендеринга Markdown. |

### Типы

Импорт:

```tsx
import type {
  IntlayerLocals,
  UseLocaleProps,
  UseLocaleResult,
} from "astro-intlayer";
```

| Тип               | Описание                                                                                                    |
| ----------------- | ----------------------------------------------------------------------------------------------------------- |
| `IntlayerLocals`  | Объект, прикрепленный к `Astro.locals.intlayer`, содержащий `locale`, `defaultLocale` и `availableLocales`. |
| `UseLocaleProps`  | Необязательные свойства конфигурации, принимаемые `useLocale()`.                                            |
| `UseLocaleResult` | Тип возвращаемого значения `useLocale()`, предоставляющий свойства локали и методы обновления.              |
