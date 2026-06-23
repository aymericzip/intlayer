---
createdAt: 2026-06-22
updatedAt: 2026-06-22
title: Документація Хука usePathname | next-intlayer
description: Дізнайтеся, як використовувати хук usePathname з пакета next-intlayer
keywords:
  - usePathname
  - pathname
  - locale
  - Intlayer
  - Інтернаціоналізація
  - Документація
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - packages
  - next-intlayer
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

# Інтеграція Next.js: Документація Хука `usePathname`

Хук `usePathname` повертає поточний шлях Next.js (pathname) з видаленим сегментом локалі. Він корисний для створення навігації, що залежить від локалі — наприклад, для визначення, який елемент навігації активний — без необхідності вручну видаляти префікс локалі.

## Імпорт `usePathname` у Next.js

```typescript
import { usePathname } from "next-intlayer";
```

## Огляд

`usePathname` обгортає вбудований у Next.js `usePathname()` з `next/navigation`, додає будь-які параметри пошуку (search params) та видаляє префікс локалі за допомогою `getPathWithoutLocale`. Він перерендерюється при кожній навігації на стороні клієнта. Хук доступний лише у Client Components (вимагає `"use client"`).

## Використання

```tsx fileName="src/components/NavItem.tsx" codeFormat={["typescript", "esm"]}
"use client";

import type { FC } from "react";
import { usePathname } from "next-intlayer";

type NavItemProps = {
  href: string;
  label: string;
};

const NavItem: FC<NavItemProps> = ({ href, label }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <a href={href} aria-current={isActive ? "page" : undefined}>
      {label}
    </a>
  );
};

export default NavItem;
```

## Значення, що повертається

| Тип      | Опис                                                                                         |
| -------- | -------------------------------------------------------------------------------------------- |
| `string` | Поточний шлях без префіксу локалі та з очищеним від параметра локалі запитом (query params). |

## Поведінка

- **Видалення локалі (Locale stripping)**: Видаляє початковий сегмент локалі (наприклад, `/uk/dashboard` → `/dashboard`).
- **Видалення параметра пошуку (Search param stripping)**: Також видаляє параметр запиту `?locale=...`, коли використовується режим маршрутизації за допомогою search-params.
- **Реактивність**: Оновлюється при кожній навігації на стороні клієнта через Next.js App Router.
- **Безпека для SSR**: Повертає серверний шлях під час першого рендерингу, потім синхронізує параметри пошуку на клієнті.

## Порівняння з `useLocale`

`useLocale` з `next-intlayer` вже експонує `pathWithoutLocale` як частину свого результату. Використовуйте `usePathname`, коли вам потрібен лише шлях і не потрібна функціональність перемикання локалей.

```tsx codeFormat={["typescript", "esm"]}
// Коли вам потрібні як стан локалі, так і шлях:
import { useLocale } from "next-intlayer";
const { locale, pathWithoutLocale } = useLocale();

// Коли вам потрібен тільки шлях:
import { usePathname } from "next-intlayer";
const pathname = usePathname();
```

## Приклад

```tsx fileName="src/components/Sidebar.tsx" codeFormat={["typescript", "esm"]}
"use client";

import type { FC } from "react";
import { usePathname } from "next-intlayer";

const links = [
  { href: "/dashboard", label: "Дашборд" },
  { href: "/settings", label: "Налаштування" },
];

const Sidebar: FC = () => {
  const pathname = usePathname();

  return (
    <nav>
      {links.map(({ href, label }) => (
        <a
          key={href}
          href={href}
          style={{ fontWeight: pathname === href ? "bold" : "normal" }}
        >
          {label}
        </a>
      ))}
    </nav>
  );
};

export default Sidebar;
```

## Пов'язане

- [`useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/next-intlayer/useLocale.md) — поточна локаль + перемикач локалі (також експонує `pathWithoutLocale`)
- [`getPathWithoutLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/intlayer/getPathWithoutLocale.md) — базова утиліта, що використовується цим хуком
