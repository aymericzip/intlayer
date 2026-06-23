---
createdAt: 2026-06-22
updatedAt: 2026-06-22
title: Документация хука usePathname | solid-intlayer
description: Узнайте, как использовать хук usePathname из пакета solid-intlayer
keywords:
  - usePathname
  - pathname
  - locale
  - Intlayer
  - Интернационализация
  - Документация
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
    changes: "Добавлена утилита usePathname"
  - version: 8.2.0
    date: 2026-06-22
    changes: "Инициализация истории"
author: aymericzip
---

# Интеграция с Solid: Документация хука `usePathname`

Хук `usePathname` возвращает текущий путь (pathname) браузера с удаленным сегментом локали, в виде `Accessor<string>` для Solid. Это полезно для навигации с учетом локали — например, для определения активного пункта меню — без необходимости вручную удалять префикс локали.

## Импорт `usePathname` в Solid

```typescript
import { usePathname } from "solid-intlayer";
```

## Обзор

`usePathname` создает реактивный сигнал, инициализируемый из `window.location.pathname`, удаляет префикс локали через `getPathWithoutLocale` и обновляет сигнал каждый раз, когда браузер вызывает событие `popstate` (навигация назад/вперед). Слушатель событий автоматически очищается с помощью `onCleanup`.

## Использование

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

## Возвращаемое значение

| Тип                | Описание                                                                                          |
| ------------------ | ------------------------------------------------------------------------------------------------- |
| `Accessor<string>` | Accessor для Solid (реактивный геттер), возвращающий текущий путь (pathname) без префикса локали. |

## Поведение

- **Удаление локали**: Удаляет ведущий сегмент локали (например, `/ru/dashboard` → `/dashboard`).
- **Реактивность**: Автоматически обновляется при событиях `popstate` (навигация назад/вперед в браузере).
- **Безопасность для SSR**: Возвращает `""`, если объект `window` недоступен.
- **Очистка**: Слушатель `popstate` автоматически удаляется через `onCleanup` в Solid.

## Пример

```tsx fileName="src/components/Sidebar.tsx"
import type { Component } from "solid-js";
import { For } from "solid-js";
import { usePathname } from "solid-intlayer";

const links = [
  { href: "/dashboard", label: "Дашборд" },
  { href: "/settings", label: "Настройки" },
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

## Связанные хуки

- [`useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/solid-intlayer/useLocale.md) — текущая локаль + переключатель локалей
- [`getPathWithoutLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/intlayer/getPathWithoutLocale.md) — базовая утилита, используемая этим хуком
