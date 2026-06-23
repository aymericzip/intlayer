---
createdAt: 2026-06-22
updatedAt: 2026-06-22
title: Documentazione dell'Hook usePathname | solid-intlayer
description: Scopri come utilizzare l'hook usePathname dal pacchetto solid-intlayer
keywords:
  - usePathname
  - pathname
  - locale
  - Intlayer
  - Internazionalizzazione
  - Documentazione
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
    changes: "Aggiunta dell'utilità usePathname"
  - version: 8.2.0
    date: 2026-06-22
    changes: "Inizializzazione della cronologia"
author: aymericzip
---

# Integrazione Solid: Documentazione dell'Hook `usePathname`

L'hook `usePathname` restituisce il percorso del browser attuale (pathname) con il segmento locale rimosso, sotto forma di `Accessor<string>` in Solid. È utile per la navigazione basata sul locale — per esempio, determinare quale voce di menu è attiva — senza dover rimuovere manualmente il prefisso locale.

## Importare `usePathname` in Solid

```typescript
import { usePathname } from "solid-intlayer";
```

## Panoramica

`usePathname` crea un segnale reattivo inizializzato da `window.location.pathname`, rimuove il prefisso locale tramite `getPathWithoutLocale` e aggiorna il segnale ogni volta che il browser scatena un evento `popstate` (navigazione indietro/avanti). Il listener degli eventi viene pulito automaticamente tramite `onCleanup`.

## Utilizzo

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

## Valore Restituito

| Tipo               | Descrizione                                                                                         |
| ------------------ | --------------------------------------------------------------------------------------------------- |
| `Accessor<string>` | Accessor Solid (getter reattivo) che restituisce il pathname corrente senza il prefisso del locale. |

## Comportamento

- **Rimozione Locale**: Rimuove il segmento del locale iniziale (es. `/it/dashboard` → `/dashboard`).
- **Reattivo**: Si aggiorna automaticamente agli eventi `popstate` (navigazione indietro/avanti nel browser).
- **Sicuro in SSR**: Restituisce `""` quando `window` non è disponibile.
- **Pulizia**: Il listener `popstate` viene rimosso automaticamente tramite `onCleanup` di Solid.

## Esempio

```tsx fileName="src/components/Sidebar.tsx"
import type { Component } from "solid-js";
import { For } from "solid-js";
import { usePathname } from "solid-intlayer";

const links = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/settings", label: "Impostazioni" },
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

## Correlati

- [`useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/solid-intlayer/useLocale.md) — locale corrente + commutatore di locale
- [`getPathWithoutLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/intlayer/getPathWithoutLocale.md) — l'utilità sottostante utilizzata da questo hook
