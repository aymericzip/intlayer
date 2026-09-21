---
createdAt: 2026-09-19
updatedAt: 2026-09-19
title: Документація middleware intlayer | remix-intlayer
description: Дізнайтеся, як використовувати middleware intlayer у Remix 3 для визначення локалі, обробки перенаправлень та додавання стану Intlayer до контексту запиту.
keywords:
  - intlayer
  - middleware
  - remix
  - remix-3
  - інтернаціоналізація
  - i18n
slugs:
  - doc
  - packages
  - remix-intlayer
  - intlayerMiddleware
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "Початкова документація middleware intlayer"
author: aymericzip
---

# Middleware intlayer

Функція middleware `intlayer` налаштовує інтернаціоналізацію для кожного запиту в додатках Remix 3. Вона визначає локаль кожного вхідного запиту, застосовує правила перенаправлення URL та зберігає стан локалі в контексті запиту.

## Використання

Зареєструйте middleware у своєму маршрутизаторі Remix:

```ts fileName="src/server.ts"
import { createRouter } from "remix/router";
import { intlayer } from "remix-intlayer";

export const router = createRouter({
  middleware: [intlayer()],
});
```

## Як це працює

Middleware виконує такі завдання для кожного вхідного запиту:

1. **Визначення локалі**: Витягує локаль із префікса шляху URL (наприклад, `/uk/about`), файлів cookie або заголовка `Accept-Language` відповідно до вашої конфігурації Intlayer.
2. **Перенаправлення URL**: Якщо запитаний шлях не містить префікса локалі, а конфігурація вимагає маршрутизації з префіксом, middleware повертає відповідь із перенаправленням (302/307/308) на відповідний URL із префіксом.
3. **Заповнення контексту запиту**: Зберігає поточну визначену локаль у контексті запиту Remix за допомогою ключа `Intlayer`, що дозволяє хукам (`useLocale`, `useIntlayer`, `useDictionary`) прозоро її використовувати.
4. **Керування cookie**: Встановлює заголовок `Set-Cookie`, коли потрібно зберегти бажану локаль користувача.

## Пов'язана документація

- [Контекст запиту `Intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/remix-intlayer/Intlayer.md)
- [Хук `useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/remix-intlayer/useLocale.md)
- [Хук `useIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/remix-intlayer/useIntlayer.md)
