---
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: Как получить локаль из cookies / заголовков?
description: Узнайте, как получить локаль из cookies / заголовков.
keywords:
  - cookie
  - заголовки
  - intlayer
  - локаль
  - хук
  - useLocale
  - useLocaleCookie
  - next.js
  - react-intlayer
  - vue-intlayer
slugs:
  - frequent-questions
  - get-locale-cookie
---

# Как получить локаль из cookies / заголовков

## Использование хуков (рекомендуется)

В большинстве случаев рекомендуется получать текущую локаль с помощью хука `useLocale`, так как он разрешается автоматически. Это работает аналогично композиции `useLocale` во Vue.js.

```ts
import { useLocale } from "next-intlayer";
// или import { useLocale } from "react-intlayer";
// или import { useLocale } from "vue-intlayer";

// Использование на стороне клиента
const { locale } = useLocale();
```

Для серверных компонентов вы можете импортировать его из:

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

Также существует хук `useLocaleCookie`, который разрешает только значение cookie.

## Ручная настройка cookie

Вы можете объявить пользовательское имя cookie следующим образом:

```ts
import { type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  middleware: {
    cookieName: "myCustomLocaleCookie", // по умолчанию 'intlayer-locale'
  },
};

export default config;
```

получить его следующим образом

### На стороне клиента

```ts
// Использование имени cookie по умолчанию
const locale = document.cookie
  .split("; ")
  .find((row) => row.startsWith("intlayer-locale="))
  ?.split("=")[1];

// Использование пользовательского имени cookie
const locale = document.cookie
  .split("; ")
  .find((row) => row.startsWith("myCustomLocaleCookie="))
  ?.split("=")[1];
```

### На стороне сервера (Next.js)

```ts
import { cookies } from "next/headers";

// Использование имени cookie по умолчанию
const locale = cookies().get("intlayer-locale")?.value;

// Использование пользовательского имени cookie
const locale = cookies().get("myCustomLocaleCookie")?.value;
```

### Если локаль ещё не установлена

Локаль устанавливается в cookie только после того, как пользователь явно выбирает локаль. По умолчанию для новых посетителей локаль определяется из полей заголовков.

Вы можете определить предпочитаемую пользователем локаль из заголовков запроса. Вот пример того, как это сделать:

```ts
/**
 * Определяет локаль из заголовков запроса
 *
 * Заголовок accept-language является самым важным для определения локали.
 * Он содержит список языковых кодов с качественными значениями (q-значениями), которые указывают
 * предпочтительные языки пользователя в порядке предпочтения.
 *
 * Пример: "en-US,en;q=0.9,fr;q=0.8,es;q=0.7"
 * - en-US - основной язык (q=1.0 подразумевается)
 * - en - второй выбор (q=0.9)
 * - fr - третий выбор (q=0.8)
 * - es - четвёртый выбор (q=0.7)
 */
import { localeDetector } from "@intlayer/core";

/**
 * Пример заголовков negotiator, которые обычно отправляют браузеры
 * Эти заголовки помогают определить предпочтительный язык пользователя
 */
const exampleNegotiatorHeaders: Record<string, string> = {
  "accept-language": "en-US,en;q=0.9,fr;q=0.8,es;q=0.7",
  "accept":
    "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
  "user-agent":
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, как Gecko) Chrome/91.0.4472.124 Safari/537.36",
};

// Пример использования:
const detectedLocale = localeDetector(exampleNegotiatorHeaders);
```
