---
createdAt: 2026-06-22
updatedAt: 2026-06-22
title: Documentazione dell'Hook usePathname | next-intlayer
description: Scopri come utilizzare l'hook usePathname per il pacchetto next-intlayer
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
    changes: "Aggiunta utility usePathname"
  - version: 8.2.0
    date: 2026-06-22
    changes: "Inizializzazione della cronologia"
author: aymericzip
---

# Integrazione Next.js: Documentazione dell'Hook `usePathname`

L'hook `usePathname` restituisce il percorso corrente di Next.js senza il segmento della lingua. È utile per creare una navigazione consapevole della lingua — ad esempio, per determinare quale elemento di navigazione è attivo — senza dover rimuovere manualmente il prefisso della lingua.

## Importare `usePathname` in Next.js

```typescript
import { usePathname } from "next-intlayer";
```

## Panoramica

`usePathname` avvolge il `usePathname()` integrato di Next.js proveniente da `next/navigation`, aggiunge eventuali parametri di ricerca (search params) e rimuove il prefisso della lingua tramite `getPathWithoutLocale`. Riavvia il rendering (re-render) ad ogni navigazione lato client. L'hook è disponibile solo nei Client Components (richiede `"use client"`).

## Utilizzo

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

## Valore Restituito

| Tipo     | Descrizione                                                                                             |
| -------- | ------------------------------------------------------------------------------------------------------- |
| `string` | Il percorso corrente senza il prefisso della lingua e senza i parametri di query correlati alla lingua. |

## Comportamento

- **Rimozione della lingua**: Rimuove il segmento iniziale della lingua (es. `/it/dashboard` → `/dashboard`).
- **Rimozione dei parametri di ricerca**: Rimuove anche un parametro di query `?locale=...` quando si utilizza la modalità di routing basata sui parametri di ricerca.
- **Reattivo**: Si aggiorna automaticamente ad ogni navigazione lato client tramite l'App Router di Next.js.
- **Sicuro per il SSR**: Restituisce il percorso lato server durante il primo rendering, sincronizzando poi i parametri di ricerca lato client.

## Confronto con `useLocale`

`useLocale` di `next-intlayer` espone già `pathWithoutLocale` come parte del suo valore restituito. Usa `usePathname` quando ti serve solo il percorso e non hai bisogno della funzionalità di cambio lingua.

```tsx codeFormat={["typescript", "esm"]}
// Quando ti servono sia lo stato della lingua che il percorso:
import { useLocale } from "next-intlayer";
const { locale, pathWithoutLocale } = useLocale();

// Quando ti serve solo il percorso:
import { usePathname } from "next-intlayer";
const pathname = usePathname();
```

## Esempio

```tsx fileName="src/components/Sidebar.tsx" codeFormat={["typescript", "esm"]}
"use client";

import type { FC } from "react";
import { usePathname } from "next-intlayer";

const links = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/settings", label: "Impostazioni" },
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

## Articoli Correlati

- [`useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/next-intlayer/useLocale.md) — lingua corrente + commutatore di lingua (espone anche `pathWithoutLocale`)
- [`getPathWithoutLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/intlayer/getPathWithoutLocale.md) — l'utility di base usata da questo hook
