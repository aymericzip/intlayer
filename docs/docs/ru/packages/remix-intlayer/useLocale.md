---
createdAt: 2026-09-19
updatedAt: 2026-09-19
priority: 5
title: Документация хука useLocale | remix-intlayer
description: Узнайте, как использовать хук useLocale в приложениях Remix 3 для получения локали текущего запроса, локали по умолчанию и доступных локалей.
keywords:
  - useLocale
  - locale
  - remix
  - remix-3
  - Intlayer
  - intlayer
  - интернационализация
  - Документация
slugs:
  - doc
  - packages
  - remix-intlayer
  - useLocale
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "Начальная документация по хуку useLocale"
author: aymericzip
---

# Документация хука useLocale

Хук `useLocale` из `remix-intlayer` предоставляет доступ к локали обрабатываемого в данный момент HTTP-запроса, а также к локали по умолчанию и списку доступных локалей, настроенных в проекте.

## Использование

В компоненте Remix (например, переключателе языков):

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

В обработчике маршрута:

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

## Возвращаемые значения

Хук возвращает объект типа `UseLocaleResult`:

| Свойство           | Тип                 | Описание                                                           |
| ------------------ | ------------------- | ------------------------------------------------------------------ |
| `locale`           | `DeclaredLocales`   | Локаль, определенная для текущего запроса.                         |
| `defaultLocale`    | `DeclaredLocales`   | Резервная локаль по умолчанию, настроенная в `intlayer.config.ts`. |
| `availableLocales` | `DeclaredLocales[]` | Массив всех доступных локалей, настроенных в `intlayer.config.ts`. |

## Описание

1. **Определение в рамках запроса**: Во время активного запроса, обрабатываемого промежуточным ПО `intlayer()`, хук `useLocale` считывает разрешенную локаль из хранилища контекста запроса.
2. **Резервное значение (Fallback)**: При вызове вне контекста запроса (например, во время скриптов инициализации или выполнения тестов) возвращается настроенная `defaultLocale`.

## Связанная документация

- [Промежуточное ПО `intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/remix-intlayer/intlayerMiddleware.md)
- [Хук `useIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/remix-intlayer/useIntlayer.md)
- [Хук `useDictionary`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/remix-intlayer/useDictionary.md)
