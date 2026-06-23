---
createdAt: 2026-06-22
updatedAt: 2026-06-22
title: Documentazione della funzione usePathname | vue-intlayer
description: Scopri come utilizzare la funzione usePathname del pacchetto vue-intlayer
keywords:
  - usePathname
  - pathname
  - locale
  - Intlayer
  - Internazionalizzazione
  - Documentazione
  - Vue
  - JavaScript
slugs:
  - doc
  - packages
  - vue-intlayer
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

# Integrazione Vue: Documentazione di `usePathname`

La funzione `usePathname` restituisce il percorso corrente (pathname) del browser con il segmento della locale rimosso, sotto forma di `ComputedRef<string>` in Vue. È utile per costruire una navigazione che tenga conto della locale — per esempio, per determinare quale elemento di navigazione è attivo — senza dover rimuovere manualmente il prefisso della locale.

## Importare `usePathname` in Vue

```typescript
import { usePathname } from "vue-intlayer";
```

## Panoramica

`usePathname` crea un riferimento calcolato (computed ref) di Vue che legge da `window.location.pathname`, rimuove il prefisso della locale tramite `getPathWithoutLocale`, e aggiorna il suo valore ogni volta che il browser scatena un evento `popstate` (navigazione indietro/avanti). Il valore può essere utilizzato direttamente nei template o nelle funzioni di setup di Vue.

## Utilizzo

```vue fileName="src/components/NavItem.vue"
<script setup lang="ts">
import { usePathname } from "vue-intlayer";

const props = defineProps<{
  href: string;
  label: string;
}>();

const pathname = usePathname();
</script>

<template>
  <a :href="href" :aria-current="pathname === href ? 'page' : undefined">
    {{ label }}
  </a>
</template>
```

## Valore Restituito

| Tipo                  | Descrizione                                                                                                |
| --------------------- | ---------------------------------------------------------------------------------------------------------- |
| `ComputedRef<string>` | Computed ref di Vue contenente il percorso corrente (pathname) del browser senza il prefisso della locale. |

## Comportamento

- **Rimozione della locale**: Rimuove il segmento iniziale della locale (es. `/it/dashboard` → `/dashboard`).
- **Reattività**: Aggiorna il valore a ogni evento `popstate` (navigazione indietro / avanti del browser).
- **Sicuro in SSR**: Restituisce `""` quando `window` non è disponibile.
- **Pulizia (Cleanup)**: L'event listener `popstate` viene aggiunto globalmente all'inizializzazione e normalmente non richiede pulizia manuale per singolo componente, grazie a come Vue gestisce il ciclo di vita.

## Esempio

```vue fileName="src/components/Sidebar.vue"
<script setup lang="ts">
import { usePathname } from "vue-intlayer";

const links = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/settings", label: "Impostazioni" },
];

const pathname = usePathname();
</script>

<template>
  <nav>
    <a
      v-for="link in links"
      :key="link.href"
      :href="link.href"
      :style="{ fontWeight: pathname === link.href ? 'bold' : 'normal' }"
    >
      {{ link.label }}
    </a>
  </nav>
</template>
```

## Correlati

- [`useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/vue-intlayer/useLocale.md) — locale corrente + selettore della locale
- [`getPathWithoutLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/intlayer/getPathWithoutLocale.md) — l'utilità di base usata da questo hook
