---
createdAt: 2026-01-21
updatedAt: 2026-09-19
title: Documentazione dell'integrazione intlayer | astro-intlayer
description: Scopri come configurare e utilizzare l'integrazione Astro intlayer in astro.config.mjs.
keywords:
  - intlayer
  - astro
  - astro-intlayer
  - integrazione
  - i18n
  - internazionalizzazione
  - documentazione
slugs:
  - doc
  - packages
  - astro-intlayer
  - intlayer
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "Aggiornata documentazione dell'integrazione con dettagli su middleware e hook"
  - version: 8.0.0
    date: 2026-01-21
    changes: "Doc iniziale"
author: aymericzip
---

# Documentazione dell'integrazione Astro intlayer

L'integrazione `intlayer` per Astro configura il tuo progetto per l'internazionalizzazione (i18n) multilingue. Gestisce la preparazione dei dizionari in fase di compilazione, l'inserimento dei plugin Vite, la registrazione automatica del middleware di richiesta e l'emissione di pagine pre-renderizzate localizzate.

## Utilizzo

Aggiungi `intlayer()` a `astro.config.mjs`:

```ts fileName="astro.config.mjs"
import { defineConfig } from "astro/config";
import { intlayer } from "astro-intlayer";

export default defineConfig({
  integrations: [intlayer()],
});
```

Il codemod dell'Astro CLI (`astro add astro-intlayer`) genera anche un'importazione predefinita supportata:

```ts
import intlayer from "astro-intlayer";
```

## Descrizione

L'integrazione si inserisce nel ciclo di vita di compilazione ed esecuzione di Astro:

1. **Configurazione iniziale (`astro:config:setup`)**:
   - **Preparazione dizionari**: Prepara i dizionari Intlayer e i tipi generati prima dell'esecuzione della compilazione.
   - **Plugin Vite**: Inserisce i plugin per gli alias Vite (abilitando importazioni dirette dei dizionari), proxy di routing dei locale e rimozione degli elementi superflui della compilazione.
   - **Registrazione middleware**: Inserisce automaticamente `astro-intlayer/middleware` nella catena di middleware del progetto, popolando `Astro.locals.intlayer` a ogni richiesta in arrivo.
2. **Compilazione completata (`astro:build:done`)**:
   - **Riscritture di pagina**: Ispeziona le regole di riscrittura degli URL localizzati ed emette pagine HTML pre-renderizzate nei rispettivi percorsi localizzati.

## Cosa viene fornito out-of-the-box

Una volta configurata, la tua applicazione Astro può utilizzare immediatamente:

- Gli hook `useIntlayer`, `useDictionary` e `useLocale` nel frontmatter dei componenti `.astro`.
- L'oggetto `Astro.locals.intlayer` negli endpoint e nelle pagine Astro.
- Importazioni lato client nei blocchi `<script>` che rispecchiano la stessa API con aggiornamenti reattivi.
- Formattatori integrati sotto `astro-intlayer/format` (`useDate`, `useNumber`, `useCurrency`, ecc.).

## Documentazione correlata

- [Hook `useIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/astro-intlayer/useIntlayer.md)
- [Hook `useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/astro-intlayer/useLocale.md)
- [Middleware `onRequest`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/astro-intlayer/onRequest.md)
