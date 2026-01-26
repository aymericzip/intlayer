---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Документація intlayerMiddleware | next-intlayer
description: Дивіться, як використовувати функцію intlayerMiddleware для пакету next-intlayer
keywords:
  - intlayerMiddleware
  - nextjs
  - middleware
  - Intlayer
  - intlayer
  - Інтернаціоналізація
  - Документація
slugs:
  - doc
  - packages
  - next-intlayer
  - intlayerMiddleware
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Ініціалізація документації
---

# Документація intlayerMiddleware

Функція `intlayerMiddleware` — це middleware для Next.js, який обробляє маршрутизацію та редиректи на основі локалі. Вона автоматично визначає пріоритетну локаль користувача та, за потреби, перенаправляє його на відповідний локалізований шлях.

## Використання

```ts
// middleware.ts
export { intlayerMiddleware as middleware } from "next-intlayer";

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
```

## Опис

Middleware виконує такі завдання:

1. **Визначення локалі**: Перевіряє шлях URL, cookie та заголовок `Accept-Language`, щоб визначити локаль користувача.
2. **Перенаправлення**: Якщо URL не містить префіксу локалі і конфігурація вимагає його (або на основі переваг користувача), воно перенаправляє на локалізований URL.
3. **Керування cookie**: Може зберігати виявлену локаль у cookie для майбутніх запитів.

## Параметри

Функція приймає стандартний Next.js параметр `NextRequest` як аргумент при прямому використанні, або її можна експортувати, як показано вище.
