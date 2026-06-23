---
createdAt: 2026-06-22
updatedAt: 2026-06-22
title: Documentazione della funzione usePathname | svelte-intlayer
description: Scopri come utilizzare la funzione usePathname dal pacchetto svelte-intlayer
keywords:
  - usePathname
  - pathname
  - locale
  - Intlayer
  - Internazionalizzazione
  - Documentazione
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
    changes: "Aggiunta dell'utilità usePathname"
  - version: 8.2.0
    date: 2026-06-22
    changes: "Inizializzazione della cronologia"
author: aymericzip
---

# Integrazione Svelte: Documentazione di `usePathname`

La funzione `usePathname` restituisce il pathname corrente del browser con il segmento della locale rimosso, sotto forma di store Svelte `Readable<string>`. È utile per costruire una navigazione consapevole della locale — per esempio, determinare quale elemento di navigazione è attivo — senza dover rimuovere manualmente il prefisso della locale.

## Importare `usePathname` in Svelte

```typescript
import { usePathname } from "svelte-intlayer";
```

## Panoramica

`usePathname` crea uno store Svelte leggibile inizializzato da `window.location.pathname`, rimuove il prefisso della locale tramite `getPathWithoutLocale`, ed emette un nuovo valore ogni volta che il browser genera un evento `popstate` (navigazione avanti/indietro). Sottoscriviti con la sintassi di store `$` nei componenti.

## Utilizzo

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

## Valore Restituito

| Tipo               | Descrizione                                                                               |
| ------------------ | ----------------------------------------------------------------------------------------- |
| `Readable<string>` | Store leggibile di Svelte contenente il pathname corrente senza il prefisso della locale. |

## Comportamento

- **Rimozione della locale**: Rimuove il segmento iniziale della locale (es. `/it/dashboard` → `/dashboard`).
- **Reattività**: Emette un nuovo valore a ogni evento `popstate` (navigazione avanti / indietro del browser).
- **Sicurezza SSR**: Restituisce `""` quando `window` non è disponibile.
- **Pulizia (Cleanup)**: Il listener `popstate` viene rimosso automaticamente quando l'ultimo sottoscrittore si annulla.

## Esempio

```svelte fileName="src/components/Sidebar.svelte"
<script lang="ts">
  import { usePathname } from "svelte-intlayer";

  const links = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/settings", label: "Impostazioni" },
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

## Correlati

- [`useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/svelte-intlayer/useLocale.md) — locale corrente + selettore della locale
- [`getPathWithoutLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/intlayer/getPathWithoutLocale.md) — l'utilità di base utilizzata da questo hook
