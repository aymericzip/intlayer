---
createdAt: 2026-01-21
updatedAt: 2026-09-19
priority: 5
title: Документація пакета astro-intlayer
description: Інтеграція Astro для Intlayer, що забезпечує маршрутизацію на основі локалей, middleware, хуки, клієнтське сховище та керування словниками.
keywords:
  - astro-intlayer
  - astro
  - інтернаціоналізація
  - i18n
slugs:
  - doc
  - packages
  - astro-intlayer
  - exports
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "Додано документацію для хуків useIntlayer, useDictionary, useLocale, middleware та форматерів"
  - version: 8.0.0
    date: 2026-01-21
    changes: "Уніфікована документація для всіх експортів"
author: aymericzip
---

# Пакет astro-intlayer

Пакет `astro-intlayer` надає необхідні інструменти для інтеграції Intlayer у додатки Astro. Він налаштовує маршрутизацію на основі локалей, керування словниками, переписування сторінок під час збирання, middleware запитів та хуки для доступу до багатомовного контенту як у компонентах `.astro`, що рендеряться на сервері, так і в клієнтських скриптах.

## Встановлення

```bash
npm install astro-intlayer
```

## Експорти

### Інтеграція

Пакет `astro-intlayer` надає інтеграцію Astro, яка налаштовує Intlayer у вашому проекті.

Імпорт:

```tsx
import { intlayer } from "astro-intlayer";
```

або імпорт за замовчуванням у `astro.config.mjs`:

```ts
import { defineConfig } from "astro/config";
import intlayer from "astro-intlayer";

export default defineConfig({
  integrations: [intlayer()],
});
```

| Функція    | Опис                                                                                                                                                                                                            | Пов'язана документація                                                                                        |
| ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| `intlayer` | Інтеграція Astro, яка готує словники, налаштовує плагіни Vite (псевдоніми, проксі маршрутизації, оптимізацію збирання), автоматично реєструє middleware та створює пререндерені сторінки за локалізованими URL. | [intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/astro-intlayer/intlayer.md) |

### Хуки (Сервер та Клієнт)

Імпорт:

```tsx
import { useIntlayer, useDictionary, useLocale } from "astro-intlayer";
```

| Хук             | Опис                                                                                                                                                                           | Пов'язана документація                                                                                                  |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------- |
| `useIntlayer`   | Отримує словник за ключем і повертає локалізований контент. У frontmatter `.astro` зчитує локаль запиту з `Astro.locals`. У клієнтському `<script>` зчитує зі сховища клієнта. | [useIntlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/astro-intlayer/useIntlayer.md)     |
| `useDictionary` | Перетворює об'єкт словника та повертає вміст для визначеної локалі. Працює як у frontmatter, так і в клієнтських скриптах.                                                     | [useDictionary](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/astro-intlayer/useDictionary.md) |
| `useLocale`     | Повертає поточну локаль, локаль за замовчуванням, доступні локалі та функцію для оновлення локалі.                                                                             | [useLocale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/astro-intlayer/useLocale.md)         |

### Middleware (astro-intlayer/middleware)

Імпорт:

```tsx
import { onRequest } from "astro-intlayer/middleware";
```

| Експорт     | Тип                 | Опис                                                                                                                                                        | Пов'язана документація                                                                                          |
| ----------- | ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `onRequest` | `MiddlewareHandler` | Middleware Astro, яке визначає локаль запиту та додає `Astro.locals.intlayer`. Реєструється автоматично через `intlayer()` або імпортується для композиції. | [onRequest](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/astro-intlayer/onRequest.md) |

### Утиліти

Імпорт:

```tsx
import { getIntlayerLocals } from "astro-intlayer";
```

| Функція             | Опис                                                                                                            | Пов'язана документація |
| ------------------- | --------------------------------------------------------------------------------------------------------------- | ---------------------- |
| `getIntlayerLocals` | Допоміжна функція для отримання поточного об'єкта `IntlayerLocals` з контексту запиту поза межами Astro.locals. | -                      |

### Клієнтські утиліти (astro-intlayer/client)

Імпорт:

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

При імпорті в браузері або всередині тегів `<script>` клієнта, `astro-intlayer` автоматично перенаправляється на `astro-intlayer/client` (на базі `vanilla-intlayer`), надаючи клієнтські гетери словників, підписки на сховище та інструменти збереження локалі.

### Форматери (astro-intlayer/format)

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
} from "astro-intlayer/format";
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

### Утиліти HTML (astro-intlayer/html)

Імпорт:

```tsx
import { renderHTML, useHTML, useHTMLRenderer } from "astro-intlayer/html";
```

| Експорт           | Тип        | Опис                                                               |
| ----------------- | ---------- | ------------------------------------------------------------------ |
| `renderHTML`      | `Function` | Автономна утиліта для рендерингу вузлів HTML.                      |
| `useHTML`         | `Hook`     | Хук для отримання контексту постачальника HTML та конфігурації.    |
| `useHTMLRenderer` | `Hook`     | Хук для отримання попередньо налаштованої функції рендерингу HTML. |

### Утиліти Markdown (astro-intlayer/markdown)

Імпорт:

```tsx
import {
  compileMarkdown,
  renderMarkdown,
  parseMarkdown,
  useMarkdown,
  useMarkdownRenderer,
} from "astro-intlayer/markdown";
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
  IntlayerLocals,
  UseLocaleProps,
  UseLocaleResult,
} from "astro-intlayer";
```

| Тип               | Опис                                                                                                         |
| ----------------- | ------------------------------------------------------------------------------------------------------------ |
| `IntlayerLocals`  | Об'єкт, прикріплений до `Astro.locals.intlayer`, що містить `locale`, `defaultLocale` та `availableLocales`. |
| `UseLocaleProps`  | Необов'язкові властивості конфігурації, які приймає `useLocale()`.                                           |
| `UseLocaleResult` | Тип повернення `useLocale()`, що надає властивості локалі та методи її оновлення.                            |
