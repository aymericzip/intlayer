---
createdAt: 2026-09-19
updatedAt: 2026-09-19
priority: 5
title: Документация хука useIntlayer | remix-intlayer
description: Узнайте, как использовать хук useIntlayer в приложениях Remix 3 для доступа к локализованному контенту по ключу.
keywords:
  - useIntlayer
  - dictionary
  - remix
  - remix-3
  - Intlayer
  - intlayer
  - интернационализация
  - Документация
slugs:
  - doc
  - packages
  - remix-intlayer
  - useIntlayer
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "Начальная документация по хуку useIntlayer"
author: aymericzip
---

# Документация хука useIntlayer

Хук `useIntlayer` позволяет получать локализованный контент из словаря Intlayer по ключу в приложениях Remix 3.

Он автоматически считывает активную локаль из контекста текущего запроса (через `AsyncLocalStorage`), поэтому вам не требуется передавать локаль через обработчики маршрутов, шаблоны представлений или компоненты.

## Использование

### В обработчиках маршрутов

```ts fileName="src/server.ts"
import { createRouter } from "remix/router";
import { intlayer, useIntlayer } from "remix-intlayer";

const router = createRouter({
  middleware: [intlayer()],
});

router.get("/api/welcome", () => {
  const content = useIntlayer("home");

  return Response.json({
    title: content.title,
    subtitle: content.subtitle,
  });
});
```

### В шаблонах представлений и компонентах

```tsx fileName="src/views/home.ts"
import { useIntlayer } from "remix-intlayer";

export const HomeView = () => {
  const content = useIntlayer("home");

  return `
    <main>
      <h1>${content.title}</h1>
      <p>${content.subtitle}</p>
    </main>
  `;
};
```

## Параметры

```ts
useIntlayer(key, localeOrSelector?)
```

1. **`key`**: Уникальный ключ словаря (определенный в ваших файлах `.content.ts`).
2. **`localeOrSelector`** (необязательно): Конкретная локаль или объект селектора (`{ item }`, `{ variant }`, при необходимости с `locale`). Если указан, переопределяет локаль, определенную из контекста запроса.

## Описание

Хук выполняет следующие задачи:

1. **Получение локали из контекста**: Определяет текущую локаль из области `AsyncLocalStorage`, привязанной к запросу промежуточным ПО `intlayer()`.
2. **Получение словаря**: Извлекает предварительно скомпилированный словарь, соответствующий переданному ключу.
3. **Обработка переводов**: Обрабатывает переводы, перечисления, markdown и условный контент для полученной локали.
4. **Резервная обработка (Fallback)**: При вызове вне контекста активного HTTP-запроса (например, в фоновых задачах или модульных тестах без промежуточного ПО) безопасно возвращается к настроенной `defaultLocale`.

## Связанная документация

- [Промежуточное ПО `intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/remix-intlayer/intlayerMiddleware.md)
- [Хук `useDictionary`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/remix-intlayer/useDictionary.md)
- [Хук `useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/remix-intlayer/useLocale.md)
