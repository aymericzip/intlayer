---
createdAt: 2026-06-22
updatedAt: 2026-06-22
title: Документація Хука usePathname | preact-intlayer
description: Дізнайтеся, як використовувати хук usePathname з пакета preact-intlayer
keywords:
  - usePathname
  - pathname
  - locale
  - Intlayer
  - Інтернаціоналізація
  - Документація
  - Preact
  - JavaScript
slugs:
  - doc
  - packages
  - preact-intlayer
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

# Інтеграція Preact: Документація Хука `usePathname`

Хук `usePathname` повертає поточний шлях браузера (pathname) з видаленим сегментом локалі. Він корисний для створення навігації, що залежить від локалі — наприклад, для визначення, який елемент навігації активний — без необхідності вручну видаляти префікс локалі.

## Імпорт `usePathname` у Preact

```typescript
import { usePathname } from "preact-intlayer";
```

## Огляд

`usePathname` читає `window.location.pathname`, видаляє префікс локалі за допомогою `getPathWithoutLocale` та викликає повторний рендеринг компонента кожного разу, коли браузер генерує подію `popstate` (навігація назад/вперед). Під час серверного рендерингу (SSR) повертає порожній рядок.

## Використання

```tsx fileName="src/components/NavItem.tsx"
import type { FunctionComponent } from "preact";
import { usePathname } from "preact-intlayer";

type NavItemProps = {
  href: string;
  label: string;
};

const NavItem: FunctionComponent<NavItemProps> = ({ href, label }) => {
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

| Тип      | Опис                                                                                   |
| -------- | -------------------------------------------------------------------------------------- |
| `string` | Поточний шлях без префіксу локалі. Порожній рядок під час серверного рендерингу (SSR). |

## Поведінка

- **Видалення локалі (Locale stripping)**: Видаляє початковий сегмент локалі (наприклад, `/uk/dashboard` → `/dashboard`).
- **Реактивність**: Автоматично оновлюється під час подій `popstate` (навігація браузера назад / вперед).
- **Безпека для SSR**: Повертає `""`, коли об'єкт `window` недоступний.
- **Очищення (Cleanup)**: Слухач `popstate` автоматично видаляється при розмонтуванні (unmount) компонента.

## Приклад

```tsx fileName="src/components/Sidebar.tsx"
import type { FunctionComponent } from "preact";
import { usePathname } from "preact-intlayer";

const links = [
  { href: "/dashboard", label: "Дашборд" },
  { href: "/settings", label: "Налаштування" },
];

const Sidebar: FunctionComponent = () => {
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

- [`useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/preact-intlayer/exports.md) — поточна локаль + перемикач локалі
- [`getPathWithoutLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/intlayer/getPathWithoutLocale.md) — базова утиліта, що використовується цим хуком
