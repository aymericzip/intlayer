---
updatedAt: 2025-08-23
createdAt: 2025-08-23
title: Documentazione del Composable useRewriteURL
description: Composable specifico per Vue per gestire le riscritture degli URL localizzati in Intlayer.
keywords:
  - useRewriteURL
  - vue-intlayer
  - vue
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - vue-intlayer
  - useRewriteURL
---

# Composable useRewriteURL

Il composable `useRewriteURL` per Vue 3 è progettato per gestire le riscritture degli URL localizzati lato client. Corregge automaticamente l'URL del browser alla sua versione localizzata "più leggibile" basandosi sulla locale corrente dell'utente e sulla configurazione in `intlayer.config.ts`.

Funziona utilizzando `window.history.replaceState`, il quale evita di innescare navigazioni indesiderate del Vue Router.

## Utilizzo

Chiama il composable all'interno della tua funzione `setup()` o di `<script setup>`.

```vue
<script setup>
import { useRewriteURL } from "vue-intlayer";

// Corregge automaticamente /fr/tests in /fr/essais nella barra degli indirizzi se esiste una regola di rewrite
useRewriteURL();
</script>

<template>
  <router-view />
</template>
```

## Come funziona

1. **Monitoraggio reattivo**: Il composable imposta un `watch` sulla `locale` dell'utente.
2. **Corrispondenza delle riscritture**: Ogni volta che la locale cambia (o al mount), verifica se l'attuale `window.location.pathname` corrisponde a una route canonica che ha un alias localizzato più leggibile.
3. **Correzione dell'URL**: Se viene trovato un alias più leggibile, il composable invoca `window.history.replaceState` per aggiornare la barra degli indirizzi senza ricaricare la pagina o perdere lo stato del router.

## Perché usarlo?

- **Ottimizzazione SEO**: Garantisce che i motori di ricerca indicizzino la versione localizzata autorevole dei tuoi URL.
- **UX migliorata**: Corregge gli URL inseriti manualmente per riflettere la denominazione preferita (es. `/fr/a-propos` invece di `/fr/about`).
- **Basso overhead**: Aggiorna l'URL in modo silenzioso senza riattivare i lifecycle dei componenti o i navigation guards.

---
