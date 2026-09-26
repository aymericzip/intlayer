---
createdAt: 2026-09-19
updatedAt: 2026-09-19
priority: 5
title: Документація хука useIntlayer | remix-intlayer
description: Дізнайтеся, як використовувати хук useIntlayer у додатках Remix 3 для доступу до локалізованого контенту за ключем.
keywords:
  - useIntlayer
  - dictionary
  - remix
  - remix-3
  - Intlayer
  - intlayer
  - інтернаціоналізація
  - документація
slugs:
  - doc
  - packages
  - remix-intlayer
  - useIntlayer
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "Початкова документація хука useIntlayer"
author: aymericzip
---

# Документація хука useIntlayer

Хук `useIntlayer` дозволяє отримувати локалізований контент зі словника Intlayer за ключем у додатках Remix 3.

Він автоматично зчитує активну локаль із контексту поточного запиту (через `AsyncLocalStorage`), тому вам не потрібно передавати локаль через обробники маршрутів, шаблони представлень або компоненти.

## Використання

### В обробниках маршрутів

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

### У шаблонах представлень та компонентах

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

## Параметри

```ts
useIntlayer(key, localeOrSelector?)
```

1. **`key`**: Унікальний ключ словника (як визначено у ваших файлах оголошень `.content.ts`).
2. **`localeOrSelector`** (необов'язково): Конкретна локаль або об'єкт селектора (`{ item }`, `{ variant }`, необов'язково з `locale`). Якщо вказано, він перевизначає локаль, визначену з контексту запиту.

## Опис

Хук виконує такі завдання:

1. **Визначення локалі з контексту**: Визначає поточну локаль з області `AsyncLocalStorage`, прив'язаної до запиту middleware `intlayer()`.
2. **Отримання словника**: Отримує попередньо скомпільований словник, що відповідає наданому ключу.
3. **Обробка перекладів**: Обчислює переклади, перелічення, markdown та умовний контент для визначеної локалі.
4. **Обробка Fallback**: Якщо викликається поза контекстом активного HTTP-запиту (наприклад, фонові завдання або модульні тести без middleware), він безпечно повертається до налаштованої `defaultLocale`.

## Пов'язана документація

- [Middleware `intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/remix-intlayer/intlayerMiddleware.md)
- [Хук `useDictionary`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/remix-intlayer/useDictionary.md)
- [Хук `useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/remix-intlayer/useLocale.md)
