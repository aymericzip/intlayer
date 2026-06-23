---
createdAt: 2026-06-22
updatedAt: 2026-06-22
title: Dokumentacja funkcji usePathname | svelte-intlayer
description: Dowiedz się, jak korzystać z funkcji usePathname w pakiecie svelte-intlayer
keywords:
  - usePathname
  - pathname
  - locale
  - Intlayer
  - Internacjonalizacja
  - Dokumentacja
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
    changes: "Dodano narzędzie usePathname"
  - version: 8.2.0
    date: 2026-06-22
    changes: "Inicjalizacja historii"
author: aymericzip
---

# Integracja ze Svelte: Dokumentacja `usePathname`

Funkcja `usePathname` zwraca bieżącą ścieżkę przeglądarki (pathname) z usuniętym segmentem locale jako `Readable<string>` ze Svelte. Jest to przydatne do budowania nawigacji uwzględniającej locale — na przykład określania, który element nawigacji jest aktywny — bez konieczności ręcznego usuwania prefiksu locale.

## Importowanie `usePathname` w Svelte

```typescript
import { usePathname } from "svelte-intlayer";
```

## Przegląd

`usePathname` tworzy store w Svelte w trybie tylko do odczytu (readable store), który odczytuje `window.location.pathname`, usuwa prefiks locale za pomocą `getPathWithoutLocale` i emituje nową wartość za każdym razem, gdy przeglądarka wywoła zdarzenie `popstate` (nawigacja wstecz/dalej). Subskrybuj przy użyciu składni `$` w komponentach.

## Użycie

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

## Zwracana wartość

| Typ                | Opis                                                                                  |
| ------------------ | ------------------------------------------------------------------------------------- |
| `Readable<string>` | Readable store ze Svelte, zawierający bieżącą ścieżkę (pathname) bez prefiksu locale. |

## Zachowanie

- **Usuwanie locale**: Usuwa początkowy segment locale (np. `/pl/dashboard` → `/dashboard`).
- **Reaktywność**: Emituje nową wartość po każdym zdarzeniu `popstate` (nawigacja w przeglądarce w tył/w przód).
- **Bezpieczeństwo w SSR**: Zwraca `""`, gdy obiekt `window` nie jest dostępny.
- **Czyszczenie (Cleanup)**: Nasłuchiwacz `popstate` jest automatycznie usuwany po odsubskrybowaniu ostatniego subskrybenta.

## Przykład

```svelte fileName="src/components/Sidebar.svelte"
<script lang="ts">
  import { usePathname } from "svelte-intlayer";

  const links = [
    { href: "/dashboard", label: "Panel sterowania" },
    { href: "/settings", label: "Ustawienia" },
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

## Zobacz również

- [`useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/svelte-intlayer/useLocale.md) — bieżące locale + przełącznik locale
- [`getPathWithoutLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/intlayer/getPathWithoutLocale.md) — bazowe narzędzie używane przez ten hook
