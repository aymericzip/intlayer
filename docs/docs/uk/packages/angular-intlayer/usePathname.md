---
createdAt: 2026-06-22
updatedAt: 2026-06-22
title: Документація хука usePathname | angular-intlayer
description: Дізнайтеся, як використовувати хук usePathname для пакета angular-intlayer
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
    changes: "Додано утиліту usePathname"
  - version: 8.2.0
    date: 2026-06-22
    changes: "Ініціалізація історії"
author: aymericzip
---

# Інтеграция Angular: Документація хука `usePathname`

Хук `usePathname` повертає поточний шлях браузера з видаленим сегментом локалі як Angular `Signal<string>`. Це корисно для створення навігації з урахуванням локалі — наприклад, для визначення активного елемента навігації — без необхідності вручну видаляти префікс локалі.

## Імпорт `usePathname` в Angular

```typescript
import { usePathname } from "angular-intlayer";
```

## Огляд

`usePathname` зчитує `window.location.pathname`, видаляє префікс локалі через `getPathWithoutLocale` та оновлює сигнал щоразу, коли браузер викликає подію `popstate` (навігація назад/вперед). Він використовує `DestroyRef` Angular для автоматичного очищення слухача подій під час знищення компонента.

## Використання

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

## Значення, що повертається

| Тип              | Опис                                                          |
| ---------------- | ------------------------------------------------------------- |
| `Signal<string>` | Сигнал Angular, що містить поточний шлях без префікса локалі. |

## Поведінка

- **Видалення локалі**: Видаляє початковий сегмент локалі (наприклад, `/uk/dashboard` → `/dashboard`).
- **Реактивність**: Автоматично оновлюється під час подій `popstate` (навігація браузера назад / вперед).
- **Безпека для SSR**: Повертає `""`, коли `window` недоступне.
- **Очищення**: Слухач `popstate` видаляється через `DestroyRef.onDestroy` під час знищення хост-компонента.

## Приклад

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
    { href: "/dashboard", label: "Панель приладів" },
    { href: "/settings", label: "Налаштування" },
  ];

  readonly pathname = usePathname();
}
```

## Пов'язані ресурси

- [`useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/angular-intlayer/exports.md) — поточна локаль + перемикач локалі
- [`getPathWithoutLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/uk/packages/intlayer/getPathWithoutLocale.md) — базова утиліта, яку використовує цей хук
