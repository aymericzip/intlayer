---
createdAt: 2026-09-19
updatedAt: 2026-09-19
priority: 5
title: Документація middleware onRequest | astro-intlayer
description: Дізнайтеся, як використовувати middleware onRequest у додатках Astro для визначення локалі запиту та заповнення Astro.locals.intlayer.
keywords:
  - onRequest
  - middleware
  - astro
  - astro-intlayer
  - Astro.locals
  - Інтернаціоналізація
  - Документація
slugs:
  - doc
  - packages
  - astro-intlayer
  - onRequest
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "Ініціалізація документації"
author: aymericzip
---

# Документація middleware Astro onRequest

Middleware `onRequest` з `astro-intlayer/middleware` визначає локаль кожного вхідного HTTP-запиту та заповнює `Astro.locals.intlayer`.

Коли ви реєструєте інтеграцію `intlayer()` у `astro.config.mjs`, це middleware додається автоматично. Його потрібно імпортувати напряму лише в тому випадку, якщо ви компонуєте middleware Astro вручну за допомогою `sequence(...)`.

## Використання

```ts fileName="src/middleware.ts"
import { onRequest as intlayer } from "astro-intlayer/middleware";
import { sequence } from "astro:middleware";

export const onRequest = sequence(intlayer, async (context, next) => {
  // Доступ до визначеної локалі у власному middleware
  const { locale } = context.locals.intlayer;
  console.log(`Обробка запиту для локалі: ${locale}`);

  return next();
});
```

## Опис

Middleware виконує такі завдання:

1. **Визначення локалі**:
   - **URL**: Аналізує префікс шляху URL або параметр пошуку `?locale=` (якщо `routing.mode` не встановлено в `no-prefix`).
   - **Кукі / Заголовки**: Перевіряє збережені кукі локалі або значення власних заголовків.
   - **Accept-Language**: Використовує мовні налаштування браузера за відсутності попередніх даних.
   - Для пререндерених сторінок (`context.isPrerendered`) локаль витягується виключно з URL-адреси, щоб уникнути попереджень збирання Astro.
2. **Заповнення контексту**: Заповнює `Astro.locals.intlayer` наступними даними:
   - `locale`: Визначена локаль.
   - `defaultLocale`: Резервна локаль за замовчуванням.
   - `availableLocales`: Масив налаштованих локалей.
3. **Область AsyncLocalStorage**: Обгортає подальшу обробку запиту в область `AsyncLocalStorage`, дозволяючи функціям `useIntlayer()`, `useDictionary()` та `useLocale()` отримувати стан запиту без передачі аргументів.

## Тип `IntlayerLocals`

```ts
export type IntlayerLocals = {
  locale: DeclaredLocales;
  defaultLocale: DeclaredLocales;
  availableLocales: DeclaredLocales[];
};
```

## Пов'язана документація

- [Інтеграція `intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/astro-intlayer/intlayer.md)
- [Хук `useIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/astro-intlayer/useIntlayer.md)
- [Хук `useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/astro-intlayer/useLocale.md)
