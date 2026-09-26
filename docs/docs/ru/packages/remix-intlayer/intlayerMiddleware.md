---
createdAt: 2026-09-19
updatedAt: 2026-09-19
priority: 5
title: Документация промежуточного ПО intlayer | remix-intlayer
description: Узнайте, как использовать промежуточное ПО intlayer в Remix 3 для определения локали, обработки перенаправлений и внедрения состояния Intlayer в контекст запроса.
keywords:
  - intlayer
  - middleware
  - remix
  - remix-3
  - интернационализация
  - i18n
slugs:
  - doc
  - packages
  - remix-intlayer
  - intlayerMiddleware
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "Начальная документация по промежуточному ПО intlayer"
author: aymericzip
---

# Промежуточное ПО intlayer

Функция промежуточного ПО `intlayer` настраивает интернационализацию запросов в приложениях Remix 3. Она определяет локаль каждого входящего запроса, применяет правила перенаправления URL и сохраняет состояние локали в контексте запроса.

## Использование

Зарегистрируйте промежуточное ПО в вашем маршрутизаторе Remix:

```ts fileName="src/server.ts"
import { createRouter } from "remix/router";
import { intlayer } from "remix-intlayer";

export const router = createRouter({
  middleware: [intlayer()],
});
```

## Как это работает

Промежуточное ПО выполняет несколько задач для каждого входящего запроса:

1. **Определение локали**: Извлекает локаль из префикса URL-пути (например, `/fr/about`), файлов cookie или заголовка `Accept-Language` в соответствии с вашей конфигурацией Intlayer.
2. **Перенаправление URL**: Если запрошенный путь не содержит префикса локали, а конфигурация требует префиксации маршрутов, промежуточное ПО возвращает ответ-перенаправление (302/307/308) на соответствующий URL с префиксом.
3. **Заполнение контекста запроса**: Сохраняет текущую разрешенную локаль в контексте запроса Remix с использованием ключа `Intlayer`, что позволяет хукам (`useLocale`, `useIntlayer`, `useDictionary`) прозрачно использовать ее.
4. **Управление куками**: Сохраняет заголовок `Set-Cookie` при необходимости запомнить предпочтительную локаль пользователя.

## Связанная документация

- [Контекст запроса `Intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/remix-intlayer/Intlayer.md)
- [Хук `useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/remix-intlayer/useLocale.md)
- [Хук `useIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/remix-intlayer/useIntlayer.md)
