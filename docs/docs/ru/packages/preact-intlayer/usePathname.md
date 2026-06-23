---
createdAt: 2026-06-22
updatedAt: 2026-06-22
title: Документация хука usePathname | preact-intlayer
description: Узнайте, как использовать хук usePathname в пакете preact-intlayer
keywords:
  - usePathname
  - pathname
  - locale
  - Intlayer
  - Интернационализация
  - Документация
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
    changes: "Добавлена утилита usePathname"
  - version: 8.2.0
    date: 2026-06-22
    changes: "Инициализация истории"
author: aymericzip
---

# Интеграция с Preact: Документация хука `usePathname`

Хук `usePathname` возвращает текущий путь (pathname) браузера с удалённым сегментом локали. Это полезно для создания навигации, учитывающей локаль — например, для определения активного элемента меню — без необходимости вручную удалять префикс локали.

## Импорт `usePathname` в Preact

```typescript
import { usePathname } from "preact-intlayer";
```

## Обзор

`usePathname` читает `window.location.pathname`, удаляет префикс локали с помощью `getPathWithoutLocale` и вызывает повторный рендеринг компонента каждый раз, когда браузер вызывает событие `popstate` (навигация назад/вперед). Во время серверного рендеринга (SSR) возвращает пустую строку.

## Использование

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

## Возвращаемое значение

| Тип      | Описание                                                                                           |
| -------- | -------------------------------------------------------------------------------------------------- |
| `string` | Текущий путь без префикса локали. Во время серверного рендеринга (SSR) возвращается пустая строка. |

## Поведение

- **Удаление локали (Locale stripping)**: Убирает начальный сегмент локали (например, `/ru/dashboard` → `/dashboard`).
- **Реактивность**: Автоматически обновляется при событиях `popstate` (навигация назад / вперед в браузере).
- **Безопасность для SSR**: Возвращает `""`, если `window` недоступен.
- **Очистка (Cleanup)**: Слушатель `popstate` автоматически удаляется при размонтировании компонента.

## Пример

```tsx fileName="src/components/Sidebar.tsx"
import type { FunctionComponent } from "preact";
import { usePathname } from "preact-intlayer";

const links = [
  { href: "/dashboard", label: "Панель управления" },
  { href: "/settings", label: "Настройки" },
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

## Связанные материалы

- [`useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/preact-intlayer/exports.md) — текущая локаль + переключатель локали
- [`getPathWithoutLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/intlayer/getPathWithoutLocale.md) — базовая утилита, используемая этим хуком
