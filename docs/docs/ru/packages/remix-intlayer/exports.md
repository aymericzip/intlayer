---
createdAt: 2026-09-19
updatedAt: 2026-09-19
priority: 5
title: Документация пакета remix-intlayer
description: Документация по экспортам пакета remix-intlayer, обеспечивающего интернационализацию (i18n) для приложений Remix 3.
keywords:
  - remix-intlayer
  - remix
  - remix-3
  - intlayer
  - интернационализация
  - i18n
slugs:
  - doc
  - packages
  - remix-intlayer
  - exports
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "Начальная документация по экспортам remix-intlayer"
author: aymericzip
---

# Пакет remix-intlayer

Пакет `remix-intlayer` предоставляет инструменты для интеграции Intlayer в приложения Remix 3. Он включает промежуточное ПО (middleware) для определения локали запроса, доступ к контексту запроса и хуки для получения словарей и управления локалями.

## Установка

```bash
npm install remix-intlayer
```

## Экспорты пакета

### Промежуточное ПО (Middleware)

| Экспорт    | Тип                | Описание                                                                                                                 | Связанная документация                                                                                                                   |
| ---------- | ------------------ | ------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `intlayer` | Функция Middleware | Промежуточное ПО для Remix 3, определяющее локаль запроса, управляющее перенаправлениями и заполняющее контекст запроса. | [Промежуточное ПО intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/remix-intlayer/intlayerMiddleware.md) |

### Хранилище контекста

| Экспорт                     | Тип                             | Описание                                                                                                                                                  | Связанная документация                                                                                                 |
| --------------------------- | ------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `Intlayer`                  | Ключ RequestContext / Хранилище | Ключ контекста запроса, используемый для извлечения состояния Intlayer из контекста запроса Remix 3 (`context.get(Intlayer)`).                            | [Контекст Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/remix-intlayer/Intlayer.md) |
| `INTLAYER_CONTEXT_PROPERTY` | `string`                        | Имя свойства (`'intlayer'`), установленное непосредственно в контексте запроса, обеспечивающее доступ через `context.intlayer` и `context.get(Intlayer)`. | -                                                                                                                      |

### Хуки

| Экспорт         | Тип | Описание                                                                                       | Связанная документация                                                                                                      |
| --------------- | --- | ---------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| `useIntlayer`   | Хук | Получает и декорирует контент словаря по ключу с учетом текущей локали запроса.                | [Хук useIntlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/remix-intlayer/useIntlayer.md)     |
| `useDictionary` | Хук | Возвращает контент предварительно импортированного словаря для текущей локали запроса.         | [Хук useDictionary](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/remix-intlayer/useDictionary.md) |
| `useLocale`     | Хук | Предоставляет доступ к текущей локали запроса, локали по умолчанию и списку доступных локалей. | [Хук useLocale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/remix-intlayer/useLocale.md)         |

### Утилиты

Импорт:

```tsx
import { createLocaleRouting, getIntlayerState } from "remix-intlayer";
```

| Функция               | Описание                                                                                                                                                  | Связанная документация |
| --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------- |
| `createLocaleRouting` | Чистая функция, которая вычисляет решение о маршрутизации локали (`redirect`, `rewrite` или `pass`) на основе запроса, конфигурации и параметров.         | -                      |
| `getIntlayerState`    | Считывает текущее состояние `IntlayerState` (`locale`, `defaultLocale`, `availableLocales`) из области запроса `AsyncLocalStorage` вне компонентов React. | -                      |

### Форматтеры (remix-intlayer/format)

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
} from "remix-intlayer/format";
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

### HTML-утилиты (remix-intlayer/html)

Импорт:

```tsx
import { renderHTML, useHTML, useHTMLRenderer } from "remix-intlayer/html";
```

| Экспорт           | Тип        | Описание                                                              |
| ----------------- | ---------- | --------------------------------------------------------------------- |
| `renderHTML`      | `Function` | Автономная служебная функция для рендеринга HTML-узлов.               |
| `useHTML`         | `Hook`     | Хук для получения контекста и конфигурации HTML-провайдера.           |
| `useHTMLRenderer` | `Hook`     | Хук для получения предварительно настроенной функции рендеринга HTML. |

### Markdown-утилиты (remix-intlayer/markdown)

Импорт:

```tsx
import {
  compileMarkdown,
  renderMarkdown,
  parseMarkdown,
  useMarkdown,
  useMarkdownRenderer,
} from "remix-intlayer/markdown";
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
  IntlayerState,
  IntlayerMiddlewareOptions,
  LocaleRoutingOptions,
  LocaleRoutingAction,
  LocaleRoutingRequest,
  UseLocaleResult,
} from "remix-intlayer";
```

| Тип                         | Описание                                                                                                            |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| `IntlayerState`             | Объект состояния, содержащий `locale`, `defaultLocale` и `availableLocales`, сохраненный в контексте запроса Remix. |
| `IntlayerMiddlewareOptions` | Параметры конфигурации, передаваемые в промежуточное ПО `intlayer()`.                                               |
| `LocaleRoutingOptions`      | Параметры для настройки префиксов локалей, обнаружения и перенаправлений.                                           |
| `LocaleRoutingAction`       | Дискриминированное объединение, представляющее решение о маршрутизации: `redirect`, `rewrite` или `pass`.           |
| `LocaleRoutingRequest`      | Минимальное представление запроса, необходимое для `createLocaleRouting`.                                           |
| `UseLocaleResult`           | Тип возвращаемого значения `useLocale()`, содержащий `locale`, `defaultLocale` и `availableLocales`.                |
