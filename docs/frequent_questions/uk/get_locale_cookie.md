---
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: Як отримати локаль із cookie / заголовків?
description: Дізнайтеся, як отримати локаль із cookie / заголовків.
keywords:
  - cookie
  - headers
  - intlayer
  - locale
  - hook
  - useLocale
  - useLocaleCookie
  - next.js
  - react-intlayer
  - vue-intlayer
slugs:
  - frequent-questions
  - get-locale-cookie
---

# Як отримати локаль із cookie / заголовків

## Використання хуків (рекомендується)

У більшості випадків рекомендовано отримувати поточну локаль за допомогою хука `useLocale`, оскільки вона вирішується автоматично. Це працює аналогічно до `useLocale` composable у Vue.js.

```ts
import { useLocale } from "next-intlayer";
// or import { useLocale } from "react-intlayer";
// або імпортуйте { useLocale } з "vue-intlayer";

// Використання на клієнті
const { locale } = useLocale();
```

Для серверних компонентів ви можете імпортувати його з:

```tsx
import { useLocale } from "next-intlayer/server";

const Test = () => {
  const { locale } = useLocale();
  return <>{locale}</>;
};

const Page = async ({ params }) => {
  const { locale } = await params;

  return (
    <IntlayerServerProvider locale={locale}>
      <Test />
    </IntlayerServerProvider>
  );
};
```

Також існує хук `useLocaleCookie`, який лише повертає значення cookie.

## Ручна конфігурація cookie

Ви можете задати власну назву cookie, наприклад

```ts
import { type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  middleware: {
    cookieName: "myCustomLocaleCookie", // за замовчуванням 'intlayer-locale'
  },
};

export default config;
```

отримати його наступним чином

### На стороні клієнта

```ts
// Використання імені cookie за замовчуванням
const locale = document.cookie
  .split("; ")
  .find((row) => row.startsWith("intlayer-locale="))
  ?.split("=")[1];

// Використання користувацького імені cookie
const locale = document.cookie
  .split("; ")
  .find((row) => row.startsWith("myCustomLocaleCookie="))
  ?.split("=")[1];
```

### На сервері (Next.js)

```ts
import { cookies } from "next/headers";

// Використання імені cookie за замовчуванням
const locale = cookies().get("intlayer-locale")?.value;

// Використання користувацького імені cookie
const locale = cookies().get("myCustomLocaleCookie")?.value;
```

### Якщо локаль ще не встановлена

Локаль встановлюється в cookie лише після того, як користувач явно вибере локаль. За замовчуванням для нових відвідувачів локаль визначається за полями заголовків.

Ви можете визначити бажану локаль користувача з заголовків запиту. Ось приклад, як це можна реалізувати:

```ts
/**
 * Визначає локаль з заголовків запиту
 *
 * Заголовок accept-language є найважливішим для визначення локалі.
 * Він містить список кодів мов зі значеннями якості (q-values), які вказують
 * пріоритетні мови користувача в порядку переваги.
 *
 * Приклад: "en-US,en;q=0.9,fr;q=0.8,es;q=0.7"
 * - en-US — основна мова (q=1.0 мається на увазі)
 * - en — другий вибір (q=0.9)
 * - fr — третій вибір (q=0.8)
 * - es — четвертий вибір (q=0.7)
 */
import { localeDetector } from "@intlayer/core";

/**
 * Приклад negotiator headers, які зазвичай надсилають браузери
 * Ці заголовки допомагають визначити переважну мову користувача
 */
const exampleNegotiatorHeaders: Record<string, string> = {
  "accept-language": "en-US,en;q=0.9,fr;q=0.8,es;q=0.7",
  "accept":
    "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
  "user-agent":
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
};

// Приклад використання:
const detectedLocale = localeDetector(exampleNegotiatorHeaders);
```
