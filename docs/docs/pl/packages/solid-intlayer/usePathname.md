---
createdAt: 2026-06-22
updatedAt: 2026-06-22
title: Dokumentacja Hooka usePathname | solid-intlayer
description: Zobacz, jak korzystać z hooka usePathname z pakietu solid-intlayer
keywords:
  - usePathname
  - pathname
  - locale
  - Intlayer
  - Internacjonalizacja
  - Dokumentacja
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
    changes: "Dodanie narzędzia usePathname"
  - version: 8.2.0
    date: 2026-06-22
    changes: "Inicjalizacja historii"
author: aymericzip
---

# Integracja Solid: Dokumentacja Hooka `usePathname`

Hook `usePathname` zwraca bieżącą ścieżkę (pathname) przeglądarki z usuniętym segmentem locale, w postaci `Accessor<string>` w Solid. Jest to przydatne do budowania nawigacji z uwzględnieniem locale — na przykład w celu określenia, który element nawigacji jest aktywny — bez konieczności ręcznego usuwania prefiksu locale.

## Importowanie `usePathname` w Solid

```typescript
import { usePathname } from "solid-intlayer";
```

## Przegląd

`usePathname` tworzy reaktywny sygnał zainicjowany na podstawie `window.location.pathname`, usuwa prefiks locale za pomocą `getPathWithoutLocale` i aktualizuje sygnał, gdy przeglądarka wywoła zdarzenie `popstate` (nawigacja wstecz/dalej). Nasłuchiwacz zdarzeń (event listener) jest automatycznie czyszczony przez `onCleanup`.

## Użycie

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

## Zwracana wartość

| Typ                | Opis                                                                                          |
| ------------------ | --------------------------------------------------------------------------------------------- |
| `Accessor<string>` | Akcesor w Solid (reaktywny getter) zwracający bieżącą ścieżkę (pathname) bez prefiksu locale. |

## Zachowanie

- **Usuwanie Locale**: Usuwa początkowy segment locale (np. `/pl/dashboard` → `/dashboard`).
- **Reaktywność**: Aktualizuje się automatycznie przy zdarzeniach `popstate` (nawigacja wstecz / dalej w przeglądarce).
- **Bezpieczne dla SSR**: Zwraca `""` gdy `window` jest niedostępne.
- **Czyszczenie**: Nasłuchiwacz `popstate` jest usuwany automatycznie przez funkcję `onCleanup` w Solid.

## Przykład

```tsx fileName="src/components/Sidebar.tsx"
import type { Component } from "solid-js";
import { For } from "solid-js";
import { usePathname } from "solid-intlayer";

const links = [
  { href: "/dashboard", label: "Pulpit" },
  { href: "/settings", label: "Ustawienia" },
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

## Powiązane

- [`useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/solid-intlayer/useLocale.md) — bieżący locale + przełącznik locale
- [`getPathWithoutLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/intlayer/getPathWithoutLocale.md) — narzędzie pomocnicze, na którym opiera się ten hook
