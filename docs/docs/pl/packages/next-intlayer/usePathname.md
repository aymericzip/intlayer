---
createdAt: 2026-06-22
updatedAt: 2026-06-22
title: Dokumentacja hooka usePathname | next-intlayer
description: Dowiedz się, jak korzystać z hooka usePathname w pakiecie next-intlayer
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
    changes: "Dodano narzędzie usePathname"
  - version: 8.2.0
    date: 2026-06-22
    changes: "Inicjalizacja historii"
author: aymericzip
---

# Integracja Next.js: Dokumentacja hooka `usePathname`

Hook `usePathname` zwraca aktualną ścieżkę Next.js z usuniętym segmentem lokalizacji. Jest to przydatne do budowania nawigacji świadomej lokalizacji — na przykład określania, który element nawigacji jest aktywny — bez konieczności ręcznego usuwania prefiksu lokalizacji.

## Importowanie `usePathname` w Next.js

```typescript
import { usePathname } from "next-intlayer";
```

## Przegląd

`usePathname` opakowuje wbudowaną w Next.js funkcję `usePathname()` z `next/navigation`, dodaje wszelkie parametry wyszukiwania (search params) i usuwa prefiks lokalizacji poprzez `getPathWithoutLocale`. Wyzwala on ponowne renderowanie przy każdej nawigacji po stronie klienta. Hook jest dostępny tylko w Client Components (wymaga `"use client"`).

## Użycie

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

## Zwracana Wartość

| Typ      | Opis                                                                                                                   |
| -------- | ---------------------------------------------------------------------------------------------------------------------- |
| `string` | Aktualna ścieżka z usuniętym prefiksem lokalizacji i bez parametrów zapytania (query params) związanych z lokalizacją. |

## Zachowanie

- **Usuwanie lokalizacji**: Usuwa początkowy segment lokalizacji (np. `/pl/dashboard` → `/dashboard`).
- **Usuwanie parametrów wyszukiwania**: Usuwa również parametr zapytania `?locale=...`, gdy używany jest tryb routingu oparty na parametrach wyszukiwania.
- **Reaktywność**: Automatycznie aktualizuje się przy każdej nawigacji po stronie klienta za pomocą Next.js App Router.
- **Bezpieczny dla SSR**: Zwraca ścieżkę po stronie serwera podczas pierwszego renderowania, a następnie synchronizuje parametry wyszukiwania po stronie klienta.

## Porównanie z `useLocale`

`useLocale` z `next-intlayer` już udostępnia `pathWithoutLocale` jako część zwracanej wartości. Użyj `usePathname`, gdy potrzebujesz tylko ścieżki i nie wymagasz funkcji przełączania lokalizacji.

```tsx codeFormat={["typescript", "esm"]}
// Gdy potrzebujesz zarówno stanu lokalizacji, jak i ścieżki:
import { useLocale } from "next-intlayer";
const { locale, pathWithoutLocale } = useLocale();

// Gdy potrzebujesz tylko ścieżki:
import { usePathname } from "next-intlayer";
const pathname = usePathname();
```

## Przykład

```tsx fileName="src/components/Sidebar.tsx" codeFormat={["typescript", "esm"]}
"use client";

import type { FC } from "react";
import { usePathname } from "next-intlayer";

const links = [
  { href: "/dashboard", label: "Pulpit" },
  { href: "/settings", label: "Ustawienia" },
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

## Powiązane

- [`useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/next-intlayer/useLocale.md) — aktualna lokalizacja + przełącznik lokalizacji (udostępnia również `pathWithoutLocale`)
- [`getPathWithoutLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/intlayer/getPathWithoutLocale.md) — bazowe narzędzie używane przez ten hook
