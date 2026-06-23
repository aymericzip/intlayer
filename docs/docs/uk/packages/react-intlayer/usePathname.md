---
createdAt: 2026-06-22
updatedAt: 2026-06-22
title: Документація хука usePathname | react-intlayer
description: Дізнайтеся, як використовувати хук usePathname з пакета react-intlayer для отримання поточного шляху URL без сегмента локалі.
keywords:
  - usePathname
  - pathname
  - react
  - intlayer
  - маршрутизація
  - інтернаціоналізація
slugs:
  - doc
  - packages
  - react-intlayer
  - usePathname
history:
  - version: 10.0.0
    date: 2026-06-23
    changes: "Додано утиліту usePathname"
  - version: 8.2.0
    date: 2026-06-22
    changes: "Ініціалізація історії"
author: aymericzip
---

# Інтеграція з React: Документація хука `usePathname`

Хук `usePathname` з `react-intlayer` повертає поточний шлях браузера (pathname) із видаленим сегментом локалі. Він покладається на нативну властивість `window.location.pathname` і реагує на події навігації браузера через `popstate`.

## Імпорт `usePathname`

```typescript
import { usePathname } from "react-intlayer";
```

## Огляд

На відміну від хуків маршрутизації, специфічних для фреймворку (наприклад, у `next-intlayer` або `react-router`), цей хук є легким, незалежним від фреймворку рішенням для звичайних React-додатків. Він отримує поточну URL-адресу та видаляє будь-який співпадаючий префікс локалі (наприклад, `/uk/about` стає `/about`).

## Використання

```tsx fileName="src/components/Navigation.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { usePathname } from "react-intlayer";

const Navigation: FC = () => {
  const pathname = usePathname();

  return (
    <nav>
      <a
        href="/home"
        style={{ fontWeight: pathname === "/home" ? "bold" : "normal" }}
      >
        Головна
      </a>
      <a
        href="/about"
        style={{ fontWeight: pathname === "/about" ? "bold" : "normal" }}
      >
        Про нас
      </a>
    </nav>
  );
};

export default Navigation;
```

## Значення, що повертається

| Тип      | Опис                                                                                             |
| -------- | ------------------------------------------------------------------------------------------------ |
| `string` | Поточний шлях браузера з видаленим префіксом локалі (наприклад, `/uk/dashboard` → `/dashboard`). |

## Поведінка

- **Видалення локалі**: Під капотом використовує утиліту `getPathWithoutLocale` для автоматичного виявлення та видалення локалі зі шляху на основі конфігурації Intlayer додатка.
- **Реактивність**: Слухає подію `popstate`. Коли користувач здійснює навігацію за допомогою кнопок назад/вперед у браузері або коли викликається `pushState`/`replaceState`, хук оновлює шлях, що повертається.
- **SSR Fallback**: На сервері (де `window` не визначено), за замовчуванням повертає `/`, оскільки він не має доступу до URL-адреси запиту в чистому контексті React.

## Пов'язана документація

- [`useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/react-intlayer/useLocale.md)
- [`getPathWithoutLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/intlayer/getPathWithoutLocale.md)
