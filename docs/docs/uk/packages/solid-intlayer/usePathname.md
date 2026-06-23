---
createdAt: 2026-06-22
updatedAt: 2026-06-22
title: Документація хука usePathname | solid-intlayer
description: Дізнайтеся, як використовувати хук usePathname з пакета solid-intlayer
keywords:
  - usePathname
  - pathname
  - locale
  - Intlayer
  - Інтернаціоналізація
  - Документація
  - Solid
  - Solid.js
  - JavaScript
slugs:
  - doc
  - packages
  - solid-intlayer
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

# Інтеграція з Solid: Документація хука `usePathname`

Хук `usePathname` повертає поточний шлях (pathname) браузера із видаленим сегментом локалі, у вигляді `Accessor<string>` для Solid. Це корисно для навігації з урахуванням локалі — наприклад, для визначення активного пункту меню — без необхідності вручну видаляти префікс локалі.

## Імпорт `usePathname` в Solid

```typescript
import { usePathname } from "solid-intlayer";
```

## Огляд

`usePathname` створює реактивний сигнал, що ініціалізується з `window.location.pathname`, видаляє префікс локалі через `getPathWithoutLocale` і оновлює сигнал кожного разу, коли браузер викликає подію `popstate` (навігація назад/вперед). Слухач подій автоматично очищається за допомогою `onCleanup`.

## Використання

```tsx fileName="src/components/NavItem.tsx"
import type { Component } from "solid-js";
import { usePathname } from "solid-intlayer";

type NavItemProps = {
  href: string;
  label: string;
};

const NavItem: Component<NavItemProps> = ({ href, label }) => {
  const pathname = usePathname();

  return (
    <a href={href} aria-current={pathname() === href ? "page" : undefined}>
      {label}
    </a>
  );
};

export default NavItem;
```

## Значення, що повертається

| Тип                | Опис                                                                                              |
| ------------------ | ------------------------------------------------------------------------------------------------- |
| `Accessor<string>` | Accessor для Solid (реактивний геттер), що повертає поточний шлях (pathname) без префікса локалі. |

## Поведінка

- **Видалення локалі**: Видаляє початковий сегмент локалі (наприклад, `/uk/dashboard` → `/dashboard`).
- **Реактивність**: Автоматично оновлюється під час подій `popstate` (навігація назад/вперед у браузері).
- **Безпека для SSR**: Повертає `""`, якщо об'єкт `window` недоступний.
- **Очищення**: Слухач `popstate` автоматично видаляється через `onCleanup` у Solid.

## Приклад

```tsx fileName="src/components/Sidebar.tsx"
import type { Component } from "solid-js";
import { For } from "solid-js";
import { usePathname } from "solid-intlayer";

const links = [
  { href: "/dashboard", label: "Дашборд" },
  { href: "/settings", label: "Налаштування" },
];

const Sidebar: Component = () => {
  const pathname = usePathname();

  return (
    <nav>
      <For each={links}>
        {({ href, label }) => (
          <a
            href={href}
            style={{ "font-weight": pathname() === href ? "bold" : "normal" }}
          >
            {label}
          </a>
        )}
      </For>
    </nav>
  );
};

export default Sidebar;
```

## Пов'язані хуки

- [`useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/solid-intlayer/useLocale.md) — поточна локаль + перемикач локалей
- [`getPathWithoutLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/intlayer/getPathWithoutLocale.md) — базова утиліта, яку використовує цей хук
