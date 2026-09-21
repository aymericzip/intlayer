---
createdAt: 2026-09-19
updatedAt: 2026-09-19
title: Документація контексту Intlayer | remix-intlayer
description: Документація ключа сховища контексту запиту Intlayer у додатках Remix 3.
keywords:
  - Intlayer
  - remix
  - remix-3
  - контекст запиту
  - інтернаціоналізація
  - i18n
slugs:
  - doc
  - packages
  - remix-intlayer
  - Intlayer
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "Початкова документація ключа контексту Intlayer"
author: aymericzip
---

# Ключ контексту запиту Intlayer

Експорт `Intlayer` слугує ідентифікатором сховища контексту запиту в Remix 3. Він дозволяє отримувати стан Intlayer безпосередньо з об'єкта контексту Remix усередині обробників маршрутів або спеціального middleware.

## Використання

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

## Опис

`Intlayer` використовується middleware `intlayer()` для прив'язки поточного стану сесії до контексту запиту Remix (`RequestContext`). Зазвичай рекомендується використовувати хуки, такі як `useLocale()` або `useIntlayer()`. Прямий доступ через `context.get(Intlayer)` корисний у низькорівневих обробниках middleware або маршрутах API, де екземпляр контексту передається явно.

## Пов'язана документація

- [Middleware `intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/remix-intlayer/intlayerMiddleware.md)
- [Хук `useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/remix-intlayer/useLocale.md)
