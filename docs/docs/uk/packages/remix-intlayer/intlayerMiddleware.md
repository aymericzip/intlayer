---
createdAt: 2026-09-19
updatedAt: 2026-09-19
priority: 5
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

# Документація middleware intlayer для Remix 3

Middleware `intlayer` для Remix 3 керує шаром інтернаціоналізації у всьому вашому додатку. Побудований на веб-стандартах (`Request` і `Response`), він обробляє маршрутизацію за локалями (перенаправлення та внутрішні перезаписи), визначає локаль запиту, зберігає її в cookie та заголовках, а також створює область `AsyncLocalStorage`, щоб подальші обробники й компоненти могли отримувати доступ до перекладів без передавання props по ланцюжку.

## Використання

Зареєструйте middleware `intlayer` під час ініціалізації маршрутизатора Remix 3:

```ts fileName="src/server.ts"
import { createRouter } from "remix/router";
import { intlayer, useIntlayer, useLocale } from "remix-intlayer";

const router = createRouter({
  middleware: [intlayer()],
});

// Обслуговує `/`, `/fr`, `/es`, локаль визначається із запиту
router.get("/", () => {
  const { title } = useIntlayer("home");
  return new Response(title);
});
```

## Опис

Middleware `intlayer` виконує такі завдання:

1. **Підготовка словників**: Запускає `prepareIntlayer` під час старту, щоб усі згенеровані словники були зібрані та доступні.
2. **Маршрутизація за локалями**: Оцінює запит відповідно до налаштованої стратегії маршрутизації (`prefix_always`, `prefix_as_needed`, `no_prefix`):
   - **Перенаправлення**: Якщо користувач відкриває `/about` і має бути спрямований на шлях із префіксом локалі (наприклад, `/fr/about`), middleware повертає відповідь із перенаправленням і відповідними заголовками `location` та `Set-Cookie`.
   - **Внутрішні перезаписи**: Коли користувач звертається до `/fr/about`, URL внутрішньо перезаписується, щоб ваш обробник маршруту збігався з `/about`, а визначена локаль фіксується як `fr`.
   - **Локалізовані псевдоніми URL**: Враховує правила перезапису URL, визначені в `intlayer.config.ts` (наприклад, перезапис `/fr/about` на `/fr/a-propos`).
3. **Визначення локалі**: Визначає активну локаль за префіксом URL, збереженими cookie, користувацькими заголовками або вподобаннями браузера `Accept-Language`.
4. **Впровадження контексту**:
   - Прикріплює `IntlayerState` (`locale`, `defaultLocale`, `availableLocales`) до `RequestContext` Remix під ключем `Intlayer` та в `context.intlayer`.
   - Виконує решту запиту всередині області `AsyncLocalStorage` (`requestStorage`), що дозволяє коректно викликати `useIntlayer`, `useDictionary` і `useLocale` в обробниках, представленнях і компонентах.
5. **Збереження**: Додає вихідні заголовки та cookie локалі до фінальної HTTP-відповіді, щоб зберегти вподобання користувача.

## Параметри

Функція `intlayer` приймає необов'язкові параметри `IntlayerMiddlewareOptions`:

```ts
import { intlayer, type IntlayerMiddlewareOptions } from "remix-intlayer";

const options: IntlayerMiddlewareOptions = {
  // Перевизначення користувацької конфігурації маршрутизації
};

const middleware = intlayer(options);
```

## Прямий доступ до контексту

Окрім використання хуків, ви можете отримати визначений стан `IntlayerState` безпосередньо з контексту запиту Remix:

```ts
import { Intlayer } from "remix-intlayer";

router.get("/api/locale", (context) => {
  // Через context.get()
  const state = context.get(Intlayer);

  // Або через пряму властивість context.intlayer
  const { locale } = context.intlayer;

  return Response.json({ locale });
});
```

## Пов'язана документація

- [Контекст запиту `Intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/remix-intlayer/Intlayer.md)
- [Хук `useIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/remix-intlayer/useIntlayer.md)
- [Хук `useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/remix-intlayer/useLocale.md)
