---
createdAt: 2026-06-22
updatedAt: 2026-06-22
title: Документація функції usePathname | svelte-intlayer
description: Дізнайтеся, як використовувати функцію usePathname з пакету svelte-intlayer
keywords:
  - usePathname
  - pathname
  - locale
  - Intlayer
  - Інтернаціоналізація
  - Документація
  - Svelte
  - JavaScript
slugs:
  - doc
  - packages
  - svelte-intlayer
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

# Інтеграція зі Svelte: Документація `usePathname`

Функція `usePathname` повертає поточний шлях (pathname) браузера із видаленим сегментом локалі у вигляді Svelte-стору `Readable<string>`. Це корисно для створення навігації, що враховує локаль — наприклад, для визначення активного пункту меню — без необхідності вручну видаляти префікс локалі.

## Імпорт `usePathname` у Svelte

```typescript
import { usePathname } from "svelte-intlayer";
```

## Огляд

`usePathname` створює Svelte readable store, який зчитує `window.location.pathname`, видаляє префікс локалі за допомогою `getPathWithoutLocale`, та видає нове значення кожного разу, коли браузер ініціює подію `popstate` (навігація назад/вперед). Підписуйтесь на стор за допомогою синтаксису `$` у компонентах.

## Використання

```svelte fileName="src/components/NavItem.svelte"
<script lang="ts">
  import { usePathname } from "svelte-intlayer";

  export let href: string;
  export let label: string;

  const pathname = usePathname();
</script>

<a {href} aria-current={$pathname === href ? "page" : undefined}>
  {label}
</a>
```

## Значення, що повертається

| Тип                | Опис                                                                                              |
| ------------------ | ------------------------------------------------------------------------------------------------- |
| `Readable<string>` | Svelte readable store (реактивний стор), що містить поточний шлях (pathname) без префікса локалі. |

## Поведінка

- **Видалення локалі**: Видаляє початковий сегмент локалі (наприклад, `/uk/dashboard` → `/dashboard`).
- **Реактивність**: Автоматично видає нове значення при подіях `popstate` (навігація назад/вперед у браузері).
- **Безпека для SSR**: Повертає `""`, якщо об'єкт `window` недоступний.
- **Очищення**: Слухач `popstate` автоматично видаляється, коли відписується останній підписник.

## Приклад

```svelte fileName="src/components/Sidebar.svelte"
<script lang="ts">
  import { usePathname } from "svelte-intlayer";

  const links = [
    { href: "/dashboard", label: "Дашборд" },
    { href: "/settings", label: "Налаштування" },
  ];

  const pathname = usePathname();
</script>

<nav>
  {#each links as link}
    <a
      href={link.href}
      style:font-weight={$pathname === link.href ? "bold" : "normal"}
    >
      {link.label}
    </a>
  {/each}
</nav>
```

## Пов'язані функції

- [`useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/svelte-intlayer/useLocale.md) — поточна локаль + перемикач локалей
- [`getPathWithoutLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/intlayer/getPathWithoutLocale.md) — базова утиліта, що використовується цим хуком
