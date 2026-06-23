---
createdAt: 2026-06-22
updatedAt: 2026-06-22
title: Документация функции usePathname | svelte-intlayer
description: Узнайте, как использовать функцию usePathname из пакета svelte-intlayer
keywords:
  - usePathname
  - pathname
  - locale
  - Intlayer
  - Интернационализация
  - Документация
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
    changes: "Добавлена утилита usePathname"
  - version: 8.2.0
    date: 2026-06-22
    changes: "Инициализация истории"
author: aymericzip
---

# Интеграция с Svelte: Документация функции `usePathname`

Функция `usePathname` возвращает текущий путь (pathname) браузера с удаленным сегментом локали, в виде Svelte-хранилища `Readable<string>`. Это полезно для создания навигации, учитывающей локаль — например, для определения активного пункта меню — без необходимости вручную удалять префикс локали.

## Импорт `usePathname` в Svelte

```typescript
import { usePathname } from "svelte-intlayer";
```

## Обзор

`usePathname` создает Svelte readable store, который читает `window.location.pathname`, удаляет префикс локали с помощью `getPathWithoutLocale`, и выдает новое значение каждый раз, когда браузер вызывает событие `popstate` (навигация назад/вперед). Подписывайтесь с помощью синтаксиса `$` в компонентах.

## Использование

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

## Возвращаемое значение

| Тип                | Описание                                                                                              |
| ------------------ | ----------------------------------------------------------------------------------------------------- |
| `Readable<string>` | Svelte readable store (реактивное хранилище), содержащее текущий путь (pathname) без префикса локали. |

## Поведение

- **Удаление локали**: Удаляет ведущий сегмент локали (например, `/ru/dashboard` → `/dashboard`).
- **Реактивность**: Автоматически выдает новое значение при событиях `popstate` (навигация назад/вперед в браузере).
- **Безопасность для SSR**: Возвращает `""`, если объект `window` недоступен.
- **Очистка**: Слушатель `popstate` автоматически удаляется, когда отписывается последний подписчик.

## Пример

```svelte fileName="src/components/Sidebar.svelte"
<script lang="ts">
  import { usePathname } from "svelte-intlayer";

  const links = [
    { href: "/dashboard", label: "Дашборд" },
    { href: "/settings", label: "Настройки" },
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

## Связанные функции

- [`useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/svelte-intlayer/useLocale.md) — текущая локаль + переключатель локалей
- [`getPathWithoutLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/intlayer/getPathWithoutLocale.md) — базовая утилита, используемая этим хуком
