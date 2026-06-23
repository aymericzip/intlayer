---
createdAt: 2026-06-22
updatedAt: 2026-06-22
title: Документация хука usePathname | angular-intlayer
description: Узнайте, как использовать хук usePathname в пакете angular-intlayer
keywords:
  - usePathname
  - pathname
  - locale
  - Intlayer
  - Internationalization
  - Documentation
  - Angular
  - JavaScript
  - TypeScript
slugs:
  - doc
  - packages
  - angular-intlayer
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

# Интеграция Angular: Документация хука `usePathname`

Хук `usePathname` возвращает текущий путь браузера с удаленным сегментом локали в виде Angular `Signal<string>`. Это полезно для создания навигации с учетом локали — например, для определения активного элемента навигации — без необходимости ручного удаления префикса локали.

## Импорт `usePathname` в Angular

```typescript
import { usePathname } from "angular-intlayer";
```

## Обзор

`usePathname` читает `window.location.pathname`, удаляет префикс локали через `getPathWithoutLocale` и обновляет сигнал каждый раз, когда браузер вызывает событие `popstate` (навигация назад/вперед). Он использует `DestroyRef` Angular для автоматической очистки прослушивателя событий при уничтожении компонента.

## Использование

```typescript fileName="src/app/nav-item.component.ts"
import { Component, input } from "@angular/core";
import { usePathname } from "angular-intlayer";

@Component({
  standalone: true,
  selector: "app-nav-item",
  template: `
    <a
      [href]="href()"
      [attr.aria-current]="pathname() === href() ? 'page' : null"
    >
      {{ label() }}
    </a>
  `,
})
export class NavItemComponent {
  readonly href = input.required<string>();
  readonly label = input.required<string>();

  readonly pathname = usePathname();
}
```

## Возвращаемое значение

| Тип              | Описание                                                     |
| ---------------- | ------------------------------------------------------------ |
| `Signal<string>` | Сигнал Angular, содержащий текущий путь без префикса локали. |

## Поведение

- **Удаление локали**: Удаляет начальный сегмент локали (например, `/ru/dashboard` → `/dashboard`).
- **Реактивность**: Автоматически обновляется при событиях `popstate` (навигация браузера назад / вперед).
- **Безопасность SSR**: Возвращает `""`, если `window` недоступно.
- **Очистка**: Прослушиватель `popstate` удаляется через `DestroyRef.onDestroy` при уничтожении хост-компонента.

## Пример

```typescript fileName="src/app/sidebar.component.ts"
import { Component } from "@angular/core";
import { usePathname } from "angular-intlayer";

@Component({
  standalone: true,
  selector: "app-sidebar",
  template: `
    <nav>
      @for (link of links; track link.href) {
        <a
          [href]="link.href"
          [style.font-weight]="pathname() === link.href ? 'bold' : 'normal'"
        >
          {{ link.label }}
        </a>
      }
    </nav>
  `,
})
export class SidebarComponent {
  readonly links = [
    { href: "/dashboard", label: "Панель управления" },
    { href: "/settings", label: "Настройки" },
  ];

  readonly pathname = usePathname();
}
```

## Связанные ресурсы

- [`useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/angular-intlayer/exports.md) — текущая локаль + переключатель локали
- [`getPathWithoutLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ru/packages/intlayer/getPathWithoutLocale.md) — базовая утилита, используемая этим хуком
