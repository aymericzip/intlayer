---
createdAt: 2026-04-02
updatedAt: 2026-04-02
title: Власні домени
description: Дізнайтеся, як налаштувати маршрутизацію локалей на основі доменів в Intlayer для обслуговування різних локалей з виділених імен хостів.
keywords:
  - Власні домени
  - Доменна маршрутизація
  - Маршрутизація
  - Інтернаціоналізація
  - i18n
slugs:
  - doc
  - concept
  - custom_domains
history:
  - version: 8.5.0
    date: 2026-04-02
    changes: "Додано маршрутизацію локалей на основі доменів через конфігурацію routing.domains."
---

# Власні домени

Intlayer підтримує маршрутизацію локалей на основі доменів, що дозволяє обслуговувати певні локалі з виділених імен хостів. Наприклад, китайські відвідувачі можуть бути спрямовані на `intlayer.zh` замість `intlayer.org/zh`.

## Як це працює

Карта `domains` у `routing` пов'язує кожну локаль з ім'ям хоста. Intlayer використовує цю карту у двох місцях:

1. **Генерація URL** (`getLocalizedUrl`): коли цільова локаль знаходиться на _іншому_ домені, ніж поточна сторінка, повертається абсолютний URL (наприклад, `https://intlayer.zh/about`). Коли обидва домени збігаються, повертається відносний URL (наприклад, `/fr/about`).
2. **Серверний проксі** (Next.js та Vite): вхідні запити перенаправляються або перезаписуються на основі домену, на який вони надходять.

### Ексклюзивні та спільні домени

Ключова відмінність полягає в **ексклюзивності**:

- **Ексклюзивний домен** — лише одна локаль відображається на це ім'я хоста (наприклад, `zh → intlayer.zh`). Сам домен ідентифікує локаль, тому префікс локалі не додається до шляху. `https://intlayer.zh/about` обслуговує китайський контент.
- **Спільний домен** — кілька локалей відображаються на одне й те саме ім'я хоста (наприклад, і `en`, і `fr` відображаються на `intlayer.org`). Застосовується звичайна маршрутизація на основі префіксів. `intlayer.org/fr/about` обслуговує французький контент.

## Конфігурація

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
      // Спільний домен — en та fr використовують префіксну маршрутизацію на intlayer.org
      en: "intlayer.org",
      // Ексклюзивний домен — zh має власне ім'я хоста, префікс /zh/ не потрібен
      zh: "intlayer.zh",
    },
  },
};

export default config;
```

Локалі, які не вказані в `domains`, продовжують використовувати стандартну префіксну маршрутизацію без будь-якого перевизначення домену.

## Генерація URL

`getLocalizedUrl` автоматично створює правильний тип URL на основі контексту виклику.

### Локаль на тому самому домені (відносний URL)

```ts
// Поточна сторінка: intlayer.org/about
getLocalizedUrl("/about", "fr", { currentDomain: "intlayer.org" });
// → "/fr/about"

getLocalizedUrl("/about", "en", { currentDomain: "intlayer.org" });
// → "/about"  (локаль за замовчуванням, без префікса)
```

### Міждоменна локаль (абсолютний URL)

```ts
// Поточна сторінка: intlayer.org/about
getLocalizedUrl("/about", "zh", { currentDomain: "intlayer.org" });
// → "https://intlayer.zh/about"  (ексклюзивний домен, без префікса /zh/)
```

### Обслуговування з власного домену локалі

```ts
// Поточна сторінка: intlayer.zh/about
getLocalizedUrl("/about", "zh", { currentDomain: "intlayer.zh" });
// → "/about"  (вже на правильному домені — відносний URL)

getLocalizedUrl("/about", "fr", { currentDomain: "intlayer.zh" });
// → "https://intlayer.org/fr/about"  (міждоменне посилання назад на intlayer.org)
```

### Автоматичне визначення поточного домену

`currentDomain` є необов'язковим. Якщо його пропущено, `getLocalizedUrl` вирішує його в такому порядку:

1. Ім'я хоста з абсолютного вхідного URL (наприклад, `https://intlayer.org/about` → `intlayer.org`).
2. `window.location.hostname` у браузерному середовищі.
3. Якщо жоден з варіантів не доступний (SSR без явно вказаного параметра), повертається відносний URL для локалей на тому самому домені, а абсолютний URL не створюється — це безпечний резервний варіант.

```ts
// Браузер — window.location.hostname === 'intlayer.org'
getLocalizedUrl("/about", "zh");
// → "https://intlayer.zh/about"  (автоматично визначено з window)

// З абсолютного URL — домен визначено автоматично
getLocalizedUrl("https://intlayer.org/about", "zh");
// → "https://intlayer.zh/about"
```

### `getMultilingualUrls` з доменами

`getMultilingualUrls` викликає `getLocalizedUrl` для кожної локалі, тому він створює суміш відносних та абсолютних URL залежно від домену зухника:

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

Ці абсолютні URL готові до використання в тегах `<link rel="alternate" hreflang="...">` для SEO.

## Поведінка проксі

### Next.js

Посередник (middleware) `intlayerProxy` автоматично обробляє доменну маршрутизацію. Додайте його до вашого `middleware.ts`:

```typescript fileName="middleware.ts"
export { intlayerProxy as default } from "next-intlayer/proxy";

export const config = {
  matcher: "/((?!api|static|assets|robots|sitemap|.*\\..*|_next).*)",
};
```

**Перенаправлення (Redirect)** — запит надходить на неправильний домен для даного префікса локалі:

```
GET intlayer.org/zh/about
→ 301 https://intlayer.zh/about
```

**Перезапис (Rewrite)** — запит надходить на ексклюзивний домен локалі без префікса:

```
GET intlayer.zh/about
→ перезапис на /zh/about  (тільки внутрішня маршрутизація Next.js, URL залишається чистим)
```

### Vite

Плагін Vite `intlayerProxy` застосовує ту саму логіку під час розробки:

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import { intlayerProxy } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayerProxy()],
});
```

> **Примітка**: під час локальної розробки ви зазвичай перебуваєте на `localhost`, тому міждоменні перенаправлення будуть вказувати на живі домени, а не на інший локальний порт. Використовуйте перевизначення файлу hosts (наприклад, `127.0.0.1 intlayer.zh`) або зворотний проксі, якщо вам потрібно протестувати багатодоменну маршрутизацію локально.

## Перемикач локалей (Locale Switcher)

Хук `useLocale` з `next-intlayer` автоматично обробляє навігацію з урахуванням домену. Коли користувач перемикається на локаль на іншому домені, хук виконує повну навігацію по сторінці (`window.location.href`) замість зміни стану роутера на стороні клієнта, оскільки роутер Next.js не може переходити між різними джерелами (origins).

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
            {localeEl.toUpperCase()}
          </button>
        </li>
      ))}
    </ul>
  );
};
```

Жодних додаткових налаштувань не потрібно — `useLocale` внутрішньо визначає `window.location.hostname` і обирає між `router.replace` (той самий домен) та `window.location.href` (інший домен).

## SEO: альтернативні посилання `hreflang`

Маршрутизація на основі доменів часто використовується разом із `hreflang`, щоб повідомити пошуковим системам, який URL індексувати для кожної мови. Використовуйте `getMultilingualUrls` для генерації повного набору альтернативних URL:

```tsx fileName="app/[locale]/layout.tsx"
import { getMultilingualUrls } from "intlayer";
import type { Metadata } from "next";

export const generateMetadata = (): Metadata => {
  const alternates = getMultilingualUrls("/", {
    currentDomain: process.env.NEXT_PUBLIC_DOMAIN, // наприклад, "intlayer.org"
  });

  return {
    alternates: {
      languages: alternates,
    },
  };
};
```

Це створює:

```html
<link rel="alternate" hreflang="en" href="https://intlayer.org/" />
<link rel="alternate" hreflang="fr" href="https://intlayer.org/fr/" />
<link rel="alternate" hreflang="es" href="https://intlayer.org/es/" />
<link rel="alternate" hreflang="zh" href="https://intlayer.zh/" />
```

## Основні утиліти

| Утиліта                                           | Опис                                                                                                       |
| ------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| `getLocalizedUrl(url, locale, { currentDomain })` | Повертає відносний або абсолютний URL залежно від того, чи знаходиться цільова локаль на поточному домені. |
| `getMultilingualUrls(url, { currentDomain })`     | Повертає карту локалізованих URL за ключем локалі, змішуючи відносні та абсолютні за потреби.              |
| `getPrefix(locale, { domains })`                  | Повертає порожній префікс для локалей з ексклюзивним доменом, інакше — звичайний префікс.                  |
