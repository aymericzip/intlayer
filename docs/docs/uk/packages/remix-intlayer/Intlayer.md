---
createdAt: 2026-09-19
updatedAt: 2026-09-19
priority: 5
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

Коли виконується middleware `intlayer()`, воно зберігає об'єкт `IntlayerState` у контексті запиту під ключем `Intlayer`. Ви можете отримати його в будь-якому обробнику маршруту:

```ts fileName="src/server.ts"
import { createRouter } from "remix/router";
import { intlayer, Intlayer } from "remix-intlayer";

const router = createRouter({
  middleware: [intlayer()],
});

router.get("/api/profile", (context) => {
  // Доступ через context.get(Intlayer)
  const { locale, defaultLocale, availableLocales } = context.get(Intlayer);

  return Response.json({
    locale,
    defaultLocale,
    availableLocales,
  });
});
```

Також до нього можна звернутися за допомогою скороченого запису через пряму властивість `context.intlayer`:

```ts
router.get("/api/status", (context) => {
  const currentLocale = context.intlayer.locale;
  return Response.json({ status: "ok", locale: currentLocale });
});
```

## Структура `IntlayerState`

Об'єкт `IntlayerState` містить:

| Властивість        | Тип                 | Опис                                                         |
| ------------------ | ------------------- | ------------------------------------------------------------ |
| `locale`           | `DeclaredLocales`   | Локаль, визначена для поточного запиту.                      |
| `defaultLocale`    | `DeclaredLocales`   | Резервна локаль, задана в `intlayer.config.ts`.              |
| `availableLocales` | `DeclaredLocales[]` | Список усіх підтримуваних локалей, налаштованих для проєкту. |

## Пов'язана документація

- [Middleware `intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/remix-intlayer/intlayerMiddleware.md)
- [Хук `useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/remix-intlayer/useLocale.md)
- [Хук `useIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/remix-intlayer/useIntlayer.md)
