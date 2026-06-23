---
createdAt: 2026-06-22
updatedAt: 2026-06-22
title: Documentazione dell'Hook usePathname | react-intlayer
description: Scopri come utilizzare l'hook usePathname dal pacchetto react-intlayer per ottenere il percorso dell'URL corrente senza il segmento della lingua.
keywords:
  - usePathname
  - pathname
  - react
  - intlayer
  - routing
  - internazionalizzazione
slugs:
  - doc
  - packages
  - react-intlayer
  - usePathname
history:
  - version: 10.0.0
    date: 2026-06-23
    changes: "Aggiunta l'utilità usePathname"
  - version: 8.2.0
    date: 2026-06-22
    changes: "Inizializza la cronologia"
author: aymericzip
---

# Integrazione React: Documentazione dell'Hook `usePathname`

L'hook `usePathname` da `react-intlayer` restituisce il percorso corrente (pathname) del browser con il segmento della locale rimosso. Si basa sulla proprietà nativa `window.location.pathname` e reagisce agli eventi di navigazione del browser tramite `popstate`.

## Importare `usePathname`

```typescript
import { usePathname } from "react-intlayer";
```

## Panoramica

A differenza degli hook di routing specifici del framework (come quelli in `next-intlayer` o `react-router`), questo hook è una soluzione leggera, indipendente dal framework, per semplici applicazioni React. Estrae l'URL corrente e rimuove qualsiasi prefisso di locale corrispondente (ad esempio, `/it/about` diventa `/about`).

## Uso

```tsx fileName="src/components/Navigation.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { usePathname } from "react-intlayer";

const Navigation: FC = () => {
  const pathname = usePathname();

  return (
    <nav>
      <a
        href="/home"
        style={{ fontWeight: pathname === "/home" ? "bold" : "normal" }}
      >
        Home
      </a>
      <a
        href="/about"
        style={{ fontWeight: pathname === "/about" ? "bold" : "normal" }}
      >
        Chi siamo
      </a>
    </nav>
  );
};

export default Navigation;
```

## Valore di Ritorno

| Tipo     | Descrizione                                                                                                 |
| -------- | ----------------------------------------------------------------------------------------------------------- |
| `string` | Il percorso corrente del browser con il prefisso della lingua rimosso (es. `/it/dashboard` → `/dashboard`). |

## Comportamento

- **Rimozione della Locale**: Utilizza l'utilità `getPathWithoutLocale` dietro le quinte per rilevare e rimuovere automaticamente la locale dal pathname in base alla configurazione Intlayer dell'applicazione.
- **Reattività**: Ascolta l'evento `popstate`. Quando l'utente naviga utilizzando i pulsanti avanti/indietro del browser o quando viene chiamato `pushState`/`replaceState`, l'hook aggiorna il percorso restituito.
- **Fallback SSR**: Sul server (dove `window` è indefinito), per impostazione predefinita restituisce `/` poiché non ha accesso all'URL della richiesta di default in un contesto React puro.

## Documentazione Correlata

- [`useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/react-intlayer/useLocale.md)
- [`getPathWithoutLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/intlayer/getPathWithoutLocale.md)
