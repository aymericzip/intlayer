---
createdAt: 2026-06-22
updatedAt: 2026-06-22
title: Dokumentacja Hooka usePathname | preact-intlayer
description: Zobacz, jak korzystać z hooka usePathname z pakietu preact-intlayer
keywords:
  - usePathname
  - pathname
  - locale
  - Intlayer
  - Internacjonalizacja
  - Dokumentacja
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
    changes: "Dodano narzędzie usePathname"
  - version: 8.2.0
    date: 2026-06-22
    changes: "Inicjalizacja historii"
author: aymericzip
---

# Integracja z Preact: Dokumentacja Hooka `usePathname`

Hook `usePathname` zwraca bieżącą ścieżkę przeglądarki (pathname) z usuniętym segmentem locale. Jest to przydatne do tworzenia nawigacji uwzględniającej wielojęzyczność — na przykład określania, który element nawigacji jest aktywny — bez konieczności ręcznego usuwania prefiksu locale.

## Importowanie `usePathname` w Preact

```typescript
import { usePathname } from "preact-intlayer";
```

## Przegląd

`usePathname` odczytuje `window.location.pathname`, usuwa prefiks locale za pomocą `getPathWithoutLocale` i ponownie renderuje komponent za każdym razem, gdy przeglądarka wywoła zdarzenie `popstate` (nawigacja wstecz/dalej). Podczas renderowania po stronie serwera (SSR) zwraca pusty ciąg znaków.

## Użycie

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

## Zwracana Wartość

| Typ      | Opis                                                                                                  |
| -------- | ----------------------------------------------------------------------------------------------------- |
| `string` | Bieżąca ścieżka bez prefiksu locale. Pusty ciąg znaków podczas renderowania po stronie serwera (SSR). |

## Zachowanie

- **Usuwanie locale (Locale stripping)**: Usuwa początkowy segment locale (np. `/pl/dashboard` → `/dashboard`).
- **Reaktywność**: Aktualizuje się automatycznie przy zdarzeniach `popstate` (nawigacja wstecz / dalej przeglądarki).
- **Bezpieczeństwo w SSR**: Zwraca `""`, gdy obiekt `window` jest niedostępny.
- **Czyszczenie (Cleanup)**: Nasłuchiwacz `popstate` jest usuwany automatycznie podczas odmontowywania komponentu.

## Przykład

```tsx fileName="src/components/Sidebar.tsx"
import type { FunctionComponent } from "preact";
import { usePathname } from "preact-intlayer";

const links = [
  { href: "/dashboard", label: "Pulpit" },
  { href: "/settings", label: "Ustawienia" },
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

## Powiązane

- [`useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/preact-intlayer/exports.md) — bieżący locale + przełącznik locale
- [`getPathWithoutLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/intlayer/getPathWithoutLocale.md) — podstawowe narzędzie wykorzystywane przez ten hook
