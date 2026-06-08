---
updatedAt: 2025-08-23
createdAt: 2025-08-23
title: Documentazione del hook useRewriteURL
description: Hook specifico per Solid per gestire le riscritture degli URL localizzati in Intlayer.
keywords:
  - useRewriteURL
  - solid-intlayer
  - solidjs
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - solid-intlayer
  - useRewriteURL
---

# Hook useRewriteURL

Il hook `useRewriteURL` per SolidJS è progettato per gestire le riscritture di URL localizzate lato client. Corregge automaticamente l'URL del browser alla sua versione localizzata "prettier" in base alla locale corrente e alla configurazione in `intlayer.config.ts`.

Utilizzando `window.history.replaceState`, evita navigazioni ridondanti del Solid Router.

## Utilizzo

Invoca il hook all'interno di un componente che fa parte della tua applicazione.

```tsx
import { useRewriteURL } from "solid-intlayer";

const Layout = (props) => {
  // Corregge automaticamente /fr/tests in /fr/essais nella barra degli indirizzi se esiste una regola di riscrittura
  useRewriteURL();

  return <>{props.children}</>;
};
```

## Come funziona

1. **Rilevamento**: L'hook utilizza `createEffect` per monitorare i cambiamenti nella reattiva `locale()`.
2. **Corrispondenza**: Identifica se l'attuale `window.location.pathname` corrisponde a una route canonica che ha un alias localizzato più leggibile per la lingua corrente.
3. **Correzione dell'URL**: Se viene trovato un alias più leggibile, l'hook chiama `window.history.replaceState` per aggiornare la barra degli indirizzi senza influire sullo stato di navigazione interno o causare il re-render dei componenti.

## Perché usarlo?

- **URL autorevoli**: Impone un unico URL per ogni versione localizzata dei tuoi contenuti, cosa cruciale per la SEO.
- **Comodità per lo sviluppatore**: Ti permette di mantenere le definizioni delle route interne canoniche pur esponendo al mondo esterno percorsi localizzati e user-friendly.
- **Coerenza**: Corregge gli URL quando gli utenti digitano manualmente un percorso che non rispetta le regole di localizzazione preferite.

---
