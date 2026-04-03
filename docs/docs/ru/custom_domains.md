---
createdAt: 2026-04-02
updatedAt: 2026-04-02
title: Пользовательские домены
description: Узнайте, как настроить маршрутизацию локалей на основе доменов в Intlayer для обслуживания различных локалей с выделенных хост-имен.
keywords:
  - Пользовательские домены
  - Доменная маршрутизация
  - Маршрутизация
  - Интернационализация
  - i18n
slugs:
  - doc
  - concept
  - custom_domains
history:
  - version: 8.5.0
    date: 2026-04-02
    changes: "Добавлена маршрутизация локалей на основе доменов через конфигурацию routing.domains."
---

# Пользовательские домены

Intlayer поддерживает маршрутизацию локалей на основе доменов, что позволяет обслуживать определенные локали с выделенных хост-имен. Например, китайские посетители могут быть направлены на `intlayer.zh` вместо `intlayer.org/zh`.

## Как это работает

Карта `domains` в `routing` связывает каждую локаль с хост-именем. Intlayer использует эту карту в двух местах:

1. **Генерация URL** (`getLocalizedUrl`): когда целевая локаль находится на _другом_ домене по сравнению с текущей страницей, возвращается абсолютный URL (например, `https://intlayer.zh/about`). Когда домены совпадают, возвращается относительный URL (например, `/fr/about`).
2. **Серверный прокси** (Next.js и Vite): входящие запросы перенаправляются или перезаписываются в зависимости от домена, на который они поступают.

### Эксклюзивные и общие домены

Ключевое различие заключается в **эксклюзивности**:

- **Эксклюзивный домен** — только одна локаль сопоставляется с этим хост-именем (например, `zh → intlayer.zh`). Сам домен идентифицирует локаль, поэтому префикс локали не добавляется к пути. `https://intlayer.zh/about` обслуживает китайский контент.
- **Общий домен** — несколько локалей сопоставляются с одним и тем же хост-именем (например, и `en`, и `fr` сопоставляются с `intlayer.org`). Применяется стандартная маршрутизация на основе префиксов. `intlayer.org/fr/about` обслуживает французский контент.

## Конфигурация

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      Locales.CHINESE,
    ],
    defaultLocale: Locales.ENGLISH,
  },
  routing: {
    mode: "prefix-no-default",
    domains: {
      // Общий домен — en и fr используют префиксную маршрутизацию на intlayer.org
      en: "intlayer.org",
      // Эксклюзивный домен — у zh есть собственное имя хоста, префикс /zh/ не нужен
      zh: "intlayer.zh",
    },
  },
};

export default config;
```

Локали, не указанные в `domains`, продолжают использовать стандартную префиксную маршрутизацию без переопределения домена.

## Генерация URL

`getLocalizedUrl` автоматически создает правильный тип URL в зависимости от контекста вызова.

### Локаль на том же домене (относительный URL)

```ts
// Текущая страница: intlayer.org/about
getLocalizedUrl("/about", "fr", { currentDomain: "intlayer.org" });
// → "/fr/about"

getLocalizedUrl("/about", "en", { currentDomain: "intlayer.org" });
// → "/about"  (локаль по умолчанию, без префикса)
```

### Междоменная локаль (абсолютный URL)

```ts
// Текущая страница: intlayer.org/about
getLocalizedUrl("/about", "zh", { currentDomain: "intlayer.org" });
// → "https://intlayer.zh/about"  (эксклюзивный домен, без префикса /zh/)
```

### Обслуживание с собственного домена локали

```ts
// Текущая страница: intlayer.zh/about
getLocalizedUrl("/about", "zh", { currentDomain: "intlayer.zh" });
// → "/about"  (уже на правильном домене — относительный URL)

getLocalizedUrl("/about", "fr", { currentDomain: "intlayer.zh" });
// → "https://intlayer.org/fr/about"  (междоменная ссылка обратно на intlayer.org)
```

### Автоматическое определение текущего домена

Параметр `currentDomain` является необязательным. Если он опущен, `getLocalizedUrl` разрешает его в следующем порядке:

1. Имя хоста из абсолютного входного URL (например, `https://intlayer.org/about` → `intlayer.org`).
2. `window.location.hostname` в браузерной среде.
3. Если ни один из вариантов недоступен (SSR без явного указания параметра), возвращается относительный URL для локалей на том же домене, а абсолютный URL не создается — это безопасный резервный вариант.

```ts
// Браузер — window.location.hostname === 'intlayer.org'
getLocalizedUrl("/about", "zh");
// → "https://intlayer.zh/about"  (автоматически определено из window)

// Из абсолютного URL — домен определяется автоматически
getLocalizedUrl("https://intlayer.org/about", "zh");
// → "https://intlayer.zh/about"
```

### `getMultilingualUrls` с доменами

`getMultilingualUrls` вызывает `getLocalizedUrl` для каждой локали, поэтому он создает смесь относительных и абсолютных URL в зависимости от домена вызывающей стороны:

```ts
// currentDomain: 'intlayer.org'
getMultilingualUrls("/about", { currentDomain: "intlayer.org" });
// {
//   en: "/about",
//   fr: "/fr/about",
//   es: "/es/about",
//   zh: "https://intlayer.zh/about",
// }
```

Эти абсолютные URL готовы к использованию в тегах `<link rel="alternate" hreflang="...">` для SEO.

## Поведение прокси

### Next.js

Посредник (middleware) `intlayerProxy` автоматически обрабатывает доменную маршрутизацию. Добавьте его в ваш `middleware.ts`:

```typescript fileName="middleware.ts"
export { intlayerProxy as default } from "next-intlayer/proxy";

export const config = {
  matcher: "/((?!api|static|assets|robots|sitemap|.*\\..*|_next).*)",
};
```

**Перенаправление (Redirect)** — запрос поступает на неправильный домен для данного префикса локали:

```
GET intlayer.org/zh/about
→ 301 https://intlayer.zh/about
```

**Перезапись (Rewrite)** — запрос поступает на эксклюзивный домен локали без префикса:

```
GET intlayer.zh/about
→ перезапись на /zh/about  (только внутренняя маршрутизация Next.js, URL остается чистым)
```

### Vite

Плагин Vite `intlayerProxy` применяет ту же логику во время разработки:

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import { intlayerProxy } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayerProxy()],
});
```

> **Примечание**: при локальной разработке вы обычно используете `localhost`, поэтому междоменные перенаправления будут указывать на живые домены, а не на другой локальный порт. Используйте переопределение файла hosts (например, `127.0.0.1 intlayer.zh`) или обратный прокси, если вам нужно протестировать многодоменную маршрутизацию локально.

## Переключатель локалей

Хук `useLocale` из `next-intlayer` автоматически обрабатывает навигацию с учетом доменов. Когда пользователь переключается на локаль, находящуюся на другом домене, хук выполняет полную навигацию по странице (`window.location.href`) вместо изменения состояния роутера на стороне клиента, так как роутер Next.js не может переходить между разными источниками (origins).

```tsx fileName="components/LocaleSwitcher.tsx"
"use client";

import { useLocale } from "next-intlayer";

export const LocaleSwitcher = () => {
  const { availableLocales, locale, setLocale } = useLocale();

  return (
    <ul>
      {availableLocales.map((localeEl) => (
        <li key={localeEl}>
          <button
            onClick={() => setLocale(localeEl)}
            aria-current={localeEl === locale ? "true" : undefined}
          >
            {l.toUpperCase()}
          </button>
        </li>
      ))}
    </ul>
  );
};
```

Никакой дополнительной настройки не требуется — `useLocale` внутренне определяет `window.location.hostname` и выбирает между `router.replace` (тот же домен) и `window.location.href` (другой домен).

## SEO: альтернативные ссылки `hreflang`

Маршрутизация на основе доменов часто используется вместе с `hreflang`, чтобы сообщить поисковым системам, какой URL индексировать для каждого языка. Используйте `getMultilingualUrls` для генерации полного набора альтернативных URL:

```tsx fileName="app/[locale]/layout.tsx"
import { getMultilingualUrls } from "intlayer";
import type { Metadata } from "next";

export const generateMetadata = (): Metadata => {
  const alternates = getMultilingualUrls("/", {
    currentDomain: process.env.NEXT_PUBLIC_DOMAIN, // например, "intlayer.org"
  });

  return {
    alternates: {
      languages: alternates,
    },
  };
};
```

Это создает:

```html
<link rel="alternate" hreflang="en" href="https://intlayer.org/" />
<link rel="alternate" hreflang="fr" href="https://intlayer.org/fr/" />
<link rel="alternate" hreflang="es" href="https://intlayer.org/es/" />
<link rel="alternate" hreflang="zh" href="https://intlayer.zh/" />
```

## Основные утилиты

| Утилита                                           | Описание                                                                                                          |
| ------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| `getLocalizedUrl(url, locale, { currentDomain })` | Возвращает относительный или абсолютный URL в зависимости от того, находится ли целевая локаль на текущем домене. |
| `getMultilingualUrls(url, { currentDomain })`     | Возвращает карту локализованных URL по локалям, смешивая относительные и абсолютные URL по мере необходимости.    |
| `getPrefix(locale, { domains })`                  | Возвращает пустой префикс для локалей с эксклюзивным доменом, в противном случае — обычный префикс.               |
