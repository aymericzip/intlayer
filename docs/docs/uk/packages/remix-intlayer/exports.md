---
createdAt: 2026-09-19
updatedAt: 2026-09-19
priority: 5
title: Документація пакета remix-intlayer
description: Документація щодо експортів пакета remix-intlayer, що забезпечує інтернаціоналізацію (i18n) для додатків Remix 3.
keywords:
  - remix-intlayer
  - remix
  - remix-3
  - intlayer
  - інтернаціоналізація
  - i18n
slugs:
  - doc
  - packages
  - remix-intlayer
  - exports
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "Початкова документація щодо експортів remix-intlayer"
author: aymericzip
---

# Пакет remix-intlayer

Пакет `remix-intlayer` надає інструменти для інтеграції Intlayer у додатки Remix 3. Він включає проміжне програмне забезпечення (middleware) для визначення локалі запиту, доступ до контексту запиту та хуки для отримання словників і керування локалями.

## Встановлення

```bash
npm install remix-intlayer
```

## Експорти пакета

### Проміжне програмне забезпечення (Middleware)

| Експорт    | Тип                | Опис                                                                                                                          | Пов'язаний документ                                                                                                                |
| ---------- | ------------------ | ----------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `intlayer` | Функція Middleware | Проміжне програмне забезпечення для Remix 3, яке визначає локаль запиту, керує перенаправленнями та заповнює контекст запиту. | [Middleware intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/remix-intlayer/intlayerMiddleware.md) |

### Зберігання контексту

| Експорт                     | Тип                           | Опис                                                                                                                                               | Пов'язаний документ                                                                                                    |
| --------------------------- | ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `Intlayer`                  | Ключ RequestContext / Сховище | Ключ контексту запиту, який використовується для отримання стану Intlayer з контексту запиту Remix 3 (`context.get(Intlayer)`).                    | [Контекст Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/remix-intlayer/Intlayer.md) |
| `INTLAYER_CONTEXT_PROPERTY` | `string`                      | Ім'я властивості (`'intlayer'`), встановлене безпосередньо в контексті запиту, що надає доступ через `context.intlayer` і `context.get(Intlayer)`. | -                                                                                                                      |

### Хуки

| Експорт         | Тип | Опис                                                                                                        | Пов'язаний документ                                                                                                         |
| --------------- | --- | ----------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| `useIntlayer`   | Хук | Отримує та декорує вміст словника за ключем для поточної локалі запиту.                                     | [Хук useIntlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/remix-intlayer/useIntlayer.md)     |
| `useDictionary` | Хук | Повертає вміст попередньо імпортованого об'єкта словника для поточної локалі запиту.                        | [Хук useDictionary](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/remix-intlayer/useDictionary.md) |
| `useLocale`     | Хук | Надає доступ до поточної локалі запиту, локалі за замовчуванням та списку всіх доступних у проєкті локалей. | [Хук useLocale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/remix-intlayer/useLocale.md)         |

### Утиліти

Імпорт:

```tsx
import { createLocaleRouting, getIntlayerState } from "remix-intlayer";
```

| Функція               | Опис                                                                                                                                               | Пов'язана документація |
| --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------- |
| `createLocaleRouting` | Чиста функція, яка обчислює рішення щодо маршрутизації локалі (`redirect`, `rewrite` або `pass`) на основі запиту, конфігурації та параметрів.     | -                      |
| `getIntlayerState`    | Зчитує поточний стан `IntlayerState` (`locale`, `defaultLocale`, `availableLocales`) з області запиту `AsyncLocalStorage` поза компонентами React. | -                      |

### Форматери (remix-intlayer/format)

Імпорт:

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

| Хук               | Опис                                                                                                      |
| ----------------- | --------------------------------------------------------------------------------------------------------- |
| `useIntl`         | Повертає екземпляр Intl, прив'язаний до локалі запиту або клієнта, з можливістю кешування та підписки.    |
| `useDate`         | Повертає функцію форматування дати, прив'язану до поточної локалі (`Intl.DateTimeFormat`).                |
| `useNumber`       | Повертає функцію форматування чисел, прив'язану до поточної локалі (`Intl.NumberFormat`).                 |
| `useCurrency`     | Повертає функцію форматування валюти, прив'язану до поточної локалі.                                      |
| `usePercentage`   | Повертає функцію форматування відсотків, прив'язану до поточної локалі.                                   |
| `useRelativeTime` | Повертає функцію форматування відносного часу, прив'язану до поточної локалі (`Intl.RelativeTimeFormat`). |
| `useList`         | Повертає функцію форматування списків, прив'язану до поточної локалі (`Intl.ListFormat`).                 |
| `useUnit`         | Повертає функцію форматування одиниць вимірювання, прив'язану до поточної локалі.                         |
| `useCompact`      | Повертає функцію компактного форматування чисел, прив'язану до поточної локалі (наприклад, `1.5K`).       |

### Утиліти HTML (remix-intlayer/html)

Імпорт:

```tsx
import { renderHTML, useHTML, useHTMLRenderer } from "remix-intlayer/html";
```

| Експорт           | Тип        | Опис                                                               |
| ----------------- | ---------- | ------------------------------------------------------------------ |
| `renderHTML`      | `Function` | Автономна утиліта для рендерингу вузлів HTML.                      |
| `useHTML`         | `Hook`     | Хук для отримання контексту постачальника HTML та конфігурації.    |
| `useHTMLRenderer` | `Hook`     | Хук для отримання попередньо налаштованої функції рендерингу HTML. |

### Утиліти Markdown (remix-intlayer/markdown)

Імпорт:

```tsx
import {
  compileMarkdown,
  renderMarkdown,
  parseMarkdown,
  useMarkdown,
  useMarkdownRenderer,
} from "remix-intlayer/markdown";
```

| Експорт               | Тип        | Опис                                                                   |
| --------------------- | ---------- | ---------------------------------------------------------------------- |
| `compileMarkdown`     | `Function` | Компілює рядки markdown у структуроване представлення.                 |
| `renderMarkdown`      | `Function` | Рендерить вміст markdown у вихідні вузли.                              |
| `parseMarkdown`       | `Function` | Аналізує необроблений вміст markdown у дерево AST.                     |
| `useMarkdown`         | `Hook`     | Хук для отримання контексту постачальника markdown.                    |
| `useMarkdownRenderer` | `Hook`     | Хук для отримання попередньо налаштованої функції рендерингу Markdown. |

### Типи

Імпорт:

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

| Тип                         | Опис                                                                                                           |
| --------------------------- | -------------------------------------------------------------------------------------------------------------- |
| `IntlayerState`             | Об'єкт стану, що містить `locale`, `defaultLocale` та `availableLocales`, збережений у контексті запиту Remix. |
| `IntlayerMiddlewareOptions` | Параметри конфігурації, передані у проміжне ПЗ `intlayer()`.                                                   |
| `LocaleRoutingOptions`      | Параметри для налаштування префіксів локалей, виявлення та перенаправлень.                                     |
| `LocaleRoutingAction`       | Дискриміноване об'єднання, що представляє рішення маршрутизації: `redirect`, `rewrite` або `pass`.             |
| `LocaleRoutingRequest`      | Мінімальне представлення запиту, необхідне для `createLocaleRouting`.                                          |
| `UseLocaleResult`           | Тип повернення `useLocale()`, що містить `locale`, `defaultLocale` та `availableLocales`.                      |
