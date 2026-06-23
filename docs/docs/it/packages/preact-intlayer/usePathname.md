---
createdAt: 2026-06-22
updatedAt: 2026-06-22
title: Documentazione dell'Hook usePathname | preact-intlayer
description: Scopri come utilizzare l'hook usePathname con il pacchetto preact-intlayer
keywords:
  - usePathname
  - pathname
  - locale
  - Intlayer
  - Internazionalizzazione
  - Documentazione
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
    changes: "Aggiunta utility usePathname"
  - version: 8.2.0
    date: 2026-06-22
    changes: "Inizializzazione della cronologia"
author: aymericzip
---

# Integrazione Preact: Documentazione dell'Hook `usePathname`

L'hook `usePathname` restituisce il percorso corrente (pathname) del browser con il segmento della locale rimosso. È utile per creare navigazioni basate sulla locale — ad esempio, per determinare quale elemento del menu è attivo — senza dover rimuovere manualmente il prefisso della locale.

## Importare `usePathname` in Preact

```typescript
import { usePathname } from "preact-intlayer";
```

## Panoramica

`usePathname` legge `window.location.pathname`, rimuove il prefisso della locale tramite `getPathWithoutLocale` e forza un re-rendering del componente ogni volta che il browser emette un evento `popstate` (navigazione indietro/avanti). Restituisce una stringa vuota durante il rendering lato server (SSR).

## Utilizzo

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

## Valore di Ritorno

| Tipo     | Descrizione                                                                                                |
| -------- | ---------------------------------------------------------------------------------------------------------- |
| `string` | Il percorso corrente senza il prefisso della locale. Stringa vuota durante il rendering lato server (SSR). |

## Comportamento

- **Rimozione della locale (Locale stripping)**: Rimuove il segmento iniziale della locale (es. `/it/dashboard` → `/dashboard`).
- **Reattività**: Si aggiorna automaticamente agli eventi `popstate` (navigazione indietro / avanti del browser).
- **Sicuro per SSR**: Restituisce `""` quando `window` non è disponibile.
- **Pulizia (Cleanup)**: Il listener per `popstate` viene rimosso automaticamente quando il componente viene smontato.

## Esempio

```tsx fileName="src/components/Sidebar.tsx"
import type { FunctionComponent } from "preact";
import { usePathname } from "preact-intlayer";

const links = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/settings", label: "Impostazioni" },
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

## Correlati

- [`useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/preact-intlayer/exports.md) — locale corrente + selettore della locale
- [`getPathWithoutLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/intlayer/getPathWithoutLocale.md) — l'utility di base impiegata da questo hook
