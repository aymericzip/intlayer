---
createdAt: 2026-09-19
updatedAt: 2026-09-19
title: Документация контекста Intlayer | remix-intlayer
description: Документация по ключу хранилища контекста запроса Intlayer в приложениях Remix 3.
keywords:
  - Intlayer
  - remix
  - remix-3
  - контекст запроса
  - интернационализация
  - i18n
slugs:
  - doc
  - packages
  - remix-intlayer
  - Intlayer
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "Начальная документация по ключу контекста Intlayer"
author: aymericzip
---

# Ключ контекста запроса Intlayer

Экспорт `Intlayer` служит идентификатором хранилища контекста запроса в Remix 3. Он позволяет извлекать состояние Intlayer напрямую из объекта контекста Remix внутри обработчиков маршрутов или пользовательского промежуточного ПО.

## Использование

```ts fileName="src/server.ts"
import { createRouter } from "remix/router";
import { intlayer, Intlayer } from "remix-intlayer";

const router = createRouter({
  middleware: [intlayer()],
});

router.get("/api/current-locale", (context) => {
  const intlayerState = context.get(Intlayer);

  return Response.json({
    locale: intlayerState?.locale,
  });
});
```

## Описание

`Intlayer` используется промежуточным ПО `intlayer()` для привязки текущего состояния сессии к контексту запроса Remix (`RequestContext`). Обычно предпочтительнее использовать хуки, такие как `useLocale()` или `useIntlayer()`. Прямой доступ к `context.get(Intlayer)` полезен в низкоуровневых промежуточных обработчиках или API-маршрутах, где передача экземпляра контекста является явной.

## Связанная документация

- [Промежуточное ПО `intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/remix-intlayer/intlayerMiddleware.md)
- [Хук `useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/remix-intlayer/useLocale.md)
