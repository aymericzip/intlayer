---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Documentazione del componente IntlayerProvider | solid-intlayer
description: Scopri come usare il componente IntlayerProvider del package solid-intlayer
keywords:
  - IntlayerProvider
  - provider
  - Intlayer
  - intlayer
  - Internazionalizzazione
  - Documentazione
  - Solid
  - Solid.js
slugs:
  - doc
  - packages
  - solid-intlayer
  - IntlayerProvider
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Unified documentation for all exports
---

# Documentazione del componente IntlayerProvider

Il `IntlayerProvider` è il componente radice che fornisce il contesto di internazionalizzazione alla tua applicazione Solid. Gestisce lo stato della locale corrente e garantisce che tutti i componenti figli possano accedere alle traduzioni.

## Uso

```tsx
import { IntlayerProvider } from "solid-intlayer";

const App = () => (
  <IntlayerProvider>
    <MyComponent />
  </IntlayerProvider>
);
```

## Descrizione

Il `IntlayerProvider` svolge i seguenti ruoli:

1. **Gestione dello stato**: Inizializza e memorizza la locale corrente, usando signals per la reattività.
2. **Risoluzione della locale**: Determina la locale iniziale basandosi su cookie, preferenze del browser o sulla configurazione di default.
3. **Iniezione del contesto**: Rende la locale e la funzione `setLocale` disponibili a qualsiasi componente tramite hook come `useIntlayer` o `useLocale`.
4. **Persistenza**: Sincronizza automaticamente le modifiche della locale con cookie o local storage per mantenere la preferenza dell'utente tra le sessioni.

## Proprietà

- **locale** (opzionale): Imposta manualmente la locale corrente.
- **defaultLocale** (opzionale): Sovrascrive la locale predefinita dalla configurazione.
- **setLocale** (opzionale): Fornisce una funzione personalizzata per impostare la locale.
- **disableEditor** (opzionale): Disabilita l'integrazione dell'editor visivo.
- **isCookieEnabled** (opzionale): Abilita o disabilita la persistenza tramite cookie.
