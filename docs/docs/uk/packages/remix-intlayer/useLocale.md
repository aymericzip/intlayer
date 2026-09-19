---
createdAt: 2026-09-19
updatedAt: 2026-09-19
title: Документація хука useLocale | remix-intlayer
description: Дізнайтеся, як використовувати хук useLocale у додатках Remix 3 для отримання поточної локалі запиту, локалі за замовчуванням та списку доступних локалей.
keywords:
  - useLocale
  - locale
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
  - useLocale
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "Початкова документація хука useLocale"
author: aymericzip
---

# Документація хука useLocale

Хук `useLocale` із `remix-intlayer` надає доступ до локалі HTTP-запиту, що зараз обробляється, а також до налаштованих у проєкті локалі за замовчуванням та списку доступних локалей.

## Використання

У компоненті Remix (наприклад, перемикачі мов):

```tsx fileName="src/components/LocaleSwitcher.tsx"
import { type FC } from "react";
import { Link } from "@remix-run/react";
import { useLocale } from "remix-intlayer";
import { getLocalizedUrl, getPathWithoutLocale } from "intlayer";

export const LocaleSwitcher: FC = () => {
  const { locale, availableLocales } = useLocale();
  const pathWithoutLocale = getPathWithoutLocale();

  return (
    <nav>
      <ul>
        {availableLocales.map((localeItem) => (
          <li key={localeItem} className="p-1">
            <Link
              href={getLocalizedUrl(pathWithoutLocale, localeItem)}
              aria-current={localeItem === locale ? "page" : undefined}
            >
              {localeItem.toUpperCase()}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
```

В обробнику маршруту:

```ts fileName="src/server.ts"
import { createRouter } from "remix/router";
import { intlayer, useLocale } from "remix-intlayer";

const router = createRouter({
  middleware: [intlayer()],
});

router.get("/api/locale-info", () => {
  const { locale, defaultLocale, availableLocales } = useLocale();

  return Response.json({
    locale,
    defaultLocale,
    availableLocales,
  });
});
```

## Значення, що повертаються

Хук повертає об'єкт типу `UseLocaleResult`:

| Властивість        | Тип                 | Опис                                                                  |
| ------------------ | ------------------- | --------------------------------------------------------------------- |
| `locale`           | `DeclaredLocales`   | Локаль, визначена для поточного запиту.                               |
| `defaultLocale`    | `DeclaredLocales`   | Резервна локаль за замовчуванням, налаштована в `intlayer.config.ts`. |
| `availableLocales` | `DeclaredLocales[]` | Масив усіх доступних локалей, налаштованих у `intlayer.config.ts`.    |

## Опис

1. **Визначення в межах запиту**: В активному запиті, що обробляється middleware `intlayer()`, `useLocale` зчитує визначену локаль зі сховища запиту.
2. **Плавне повернення (Fallback)**: Якщо хук викликається поза контекстом запиту (наприклад, під час скриптів ініціалізації або наборів тестів), він повертає налаштовану `defaultLocale`.

## Пов'язана документація

- [Middleware `intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/remix-intlayer/intlayerMiddleware.md)
- [Хук `useIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/remix-intlayer/useIntlayer.md)
- [Хук `useDictionary`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/remix-intlayer/useDictionary.md)
