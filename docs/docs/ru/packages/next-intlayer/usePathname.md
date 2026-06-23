---
createdAt: 2026-06-22
updatedAt: 2026-06-22
title: Документация хука usePathname | next-intlayer
description: Узнайте, как использовать хук usePathname в пакете next-intlayer
keywords:
  - usePathname
  - pathname
  - locale
  - Intlayer
  - Internationalization
  - Documentation
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
    changes: "Добавлена утилита usePathname"
  - version: 8.2.0
    date: 2026-06-22
    changes: "Инициализация истории"
author: aymericzip
---

# Интеграция Next.js: Документация хука `usePathname`

Хук `usePathname` возвращает текущий путь Next.js с удаленным сегментом локали. Это полезно для создания навигации с учетом локали — например, для определения активного элемента навигации — без необходимости вручную удалять префикс локали.

## Импорт `usePathname` в Next.js

```typescript
import { usePathname } from "next-intlayer";
```

## Обзор

`usePathname` оборачивает встроенный хук `usePathname()` из `next/navigation`, добавляет параметры поиска (search params) и удаляет префикс локали с помощью `getPathWithoutLocale`. Он запускает повторный рендеринг при каждой навигации на стороне клиента. Хук доступен только в клиентских компонентах (Client Components, требует `"use client"`).

## Использование

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

## Возвращаемое значение

| Тип      | Описание                                                      |
| -------- | ------------------------------------------------------------- |
| `string` | Текущий путь без префикса локали и параметров запроса локали. |

## Поведение

- **Удаление локали**: Удаляет начальный сегмент локали (например, `/ru/dashboard` → `/dashboard`).
- **Удаление параметров поиска**: Также удаляет параметр запроса `?locale=...` при использовании режима маршрутизации на основе параметров поиска.
- **Реактивность**: Автоматически обновляется при каждой навигации на стороне клиента через Next.js App Router.
- **Безопасность для SSR**: Возвращает серверный путь во время первого рендера, а затем синхронизирует параметры поиска на клиенте.

## Сравнение с `useLocale`

Хук `useLocale` из `next-intlayer` уже предоставляет `pathWithoutLocale` как часть возвращаемого значения. Используйте `usePathname`, когда вам нужен только путь, и не требуется функционал переключения локали.

```tsx codeFormat={["typescript", "esm"]}
// Когда вам нужны и состояние локали, и путь:
import { useLocale } from "next-intlayer";
const { locale, pathWithoutLocale } = useLocale();

// Когда вам нужен только путь:
import { usePathname } from "next-intlayer";
const pathname = usePathname();
```

## Пример

```tsx fileName="src/components/Sidebar.tsx" codeFormat={["typescript", "esm"]}
"use client";

import type { FC } from "react";
import { usePathname } from "next-intlayer";

const links = [
  { href: "/dashboard", label: "Панель управления" },
  { href: "/settings", label: "Настройки" },
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

## Связанные ресурсы

- [`useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/next-intlayer/useLocale.md) — текущая локаль + переключатель локали (также предоставляет `pathWithoutLocale`)
- [`getPathWithoutLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/intlayer/getPathWithoutLocale.md) — базовая утилита, используемая этим хуком
