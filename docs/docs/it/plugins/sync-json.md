---
createdAt: 2025-03-13
updatedAt: 2025-10-05
title: Plugin Sync JSON
description: Sincronizza i dizionari Intlayer con file JSON i18n di terze parti (i18next, next-intl, react-intl, vue-i18n e altri). Mantieni il tuo i18n esistente mentre usi Intlayer per gestire, tradurre e testare i tuoi messaggi.
keywords:
  - Intlayer
  - Sync JSON
  - i18next
  - next-intl
  - react-intl
  - vue-i18n
  - next-translate
  - nuxt-i18n
  - LinguiJS
  - Polyglot.js
  - Solid-i18next
  - svelte-i18n
  - i18n
  - traduzioni
slugs:
  - doc
  - plugin
  - sync-json
youtubeVideo: https://www.youtube.com/watch?v=MpGMxniDHNg
history:
  - version: 6.1.6
    date: 2025-10-05
    changes: Documentazione iniziale del plugin Sync JSON
---

# Sync JSON (ponti i18n)

<iframe title="Come mantenere sincronizzate le tue traduzioni JSON con Intlayer" class="m-auto aspect-[16/9] w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/MpGMxniDHNg?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

Usa Intlayer come componente aggiuntivo al tuo stack i18n esistente. Questo plugin mantiene i tuoi messaggi JSON sincronizzati con i dizionari Intlayer così puoi:

- Mantenere i18next, next-intl, react-intl, vue-i18n, next-translate, nuxt-i18n, Solid-i18next, svelte-i18n, ecc.
- Gestire e tradurre i tuoi messaggi con Intlayer (CLI, CI, provider, CMS), senza rifattorizzare la tua app.
- Pubblicare tutorial e contenuti SEO mirati a ogni ecosistema, suggerendo Intlayer come livello di gestione JSON.

Note e ambito attuale:

- L’esternalizzazione verso il CMS funziona per traduzioni e testo classico.
- Non è ancora supportato l’uso di inserimenti, plurali/ICU o funzionalità runtime avanzate di altre librerie.
- L’editor visuale non è ancora supportato per output i18n di terze parti.

### Quando usare questo plugin

- Usi già una libreria i18n e memorizzi i messaggi in file JSON.
- Vuoi un completamento assistito da AI, test in CI e operazioni sui contenuti senza modificare il runtime di rendering.

## Installazione

```bash
pnpm add -D @intlayer/sync-json-plugin
# oppure
npm i -D @intlayer/sync-json-plugin
```

## Avvio rapido

Aggiungi il plugin al tuo `intlayer.config.ts` e indirizzalo alla tua struttura JSON esistente.

```ts fileName="intlayer.config.ts"
import { defineConfig, Locales } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

export default defineConfig({
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },

  // Mantieni i tuoi file JSON attuali sincronizzati con i dizionari Intlayer
  plugins: [
    syncJSON({
      // Layout per locale, per namespace (es. next-intl, i18next con namespaces)
      source: ({ key, locale }) => `./locales/${locale}/${key}.json`,
    }),
  ],
});
```

Alternativa: file singolo per locale (comune con configurazioni i18next/react-intl):

```ts fileName="intlayer.config.ts"
plugins: [
  syncJSON({
    source: ({ locale }) => `./locales/${locale}.json`,
  }),
];
```

### Come funziona

- Lettura: il plugin individua i file JSON dal tuo builder `source` e li carica come dizionari Intlayer.
- Scrittura: dopo le build e i riempimenti, scrive i JSON localizzati negli stessi percorsi (con una newline finale per evitare problemi di formattazione).
- Auto‑fill: il plugin dichiara un percorso `autoFill` per ogni dizionario. Eseguendo `intlayer fill` aggiorna solo le traduzioni mancanti nei tuoi file JSON per impostazione predefinita.

API:

```ts
syncJSON({
  source: ({ key, locale }) => string, // richiesto
  location?: string, // etichetta opzionale, predefinito: "plugin"
  priority?: number, // priorità opzionale per la risoluzione dei conflitti, predefinito: 0
});
```

## Più sorgenti JSON e priorità

Puoi aggiungere più plugin `syncJSON` per sincronizzare diverse sorgenti JSON. Questo è utile quando hai più librerie i18n o diverse strutture JSON nel tuo progetto.

### Sistema di priorità

Quando più plugin puntano alla stessa chiave del dizionario, il parametro `priority` determina quale plugin ha la precedenza:

- I numeri di priorità più alti prevalgono su quelli più bassi
- La priorità predefinita dei file `.content` è `0`
- La priorità predefinita dei file di contenuto dei plugin è `-1`
- I plugin con la stessa priorità vengono elaborati nell'ordine in cui appaiono nella configurazione

```ts fileName="intlayer.config.ts"
import { defineConfig, Locales } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

export default defineConfig({
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.ENGLISH,
  },

  plugins: [
    // Sorgente JSON primaria (priorità più alta)
    syncJSON({
      source: ({ key, locale }) => `./locales/${locale}/${key}.json`,
      location: "main-translations",
      priority: 10,
    }),

    // Sorgente JSON di fallback (priorità più bassa)
    syncJSON({
      source: ({ locale }) => `./fallback-locales/${locale}.json`,
      location: "fallback-translations",
      priority: 5,
    }),

    // Sorgente JSON legacy (priorità più bassa)
    syncJSON({
      source: ({ locale }) => `/my/other/app/legacy/${locale}/messages.json`,
      location: "legacy-translations",
      priority: 1,
    }),
  ],
});
```

### Risoluzione dei conflitti

Quando la stessa chiave di traduzione esiste in più sorgenti JSON:

1. Il plugin con la priorità più alta determina il valore finale
2. Le sorgenti con priorità inferiore vengono usate come fallback per le chiavi mancanti
3. Questo permette di mantenere le traduzioni legacy mentre si migra gradualmente verso nuove strutture

## Integrazioni

Di seguito sono riportate le mappature comuni. Mantieni il tuo runtime intatto; aggiungi solo il plugin.

### i18next

Layout tipico dei file: `./public/locales/{locale}/{namespace}.json` o `./locales/{locale}/{namespace}.json`.

```ts fileName="intlayer.config.ts"
import { syncJSON } from "@intlayer/sync-json-plugin";

export default {
  plugins: [
    syncJSON({
      source: ({ key, locale }) => `./locales/${locale}/${key}.json`,
    }),
  ],
};
```

### next-intl

Messaggi JSON per locale (spesso `./messages/{locale}.json`) o per namespace.

```ts fileName="intlayer.config.ts"
plugins: [
  syncJSON({
    source: ({ locale, key }) => `./messages/${locale}/${key}.json`,
  }),
];
```

Vedi anche: `docs/it/intlayer_with_next-intl.md`.

### react-intl

È comune un singolo JSON per locale:

```ts fileName="intlayer.config.ts"
plugins: [
  syncJSON({
    source: ({ locale }) => `./locales/${locale}.json`,
  }),
];
```

### vue-i18n

Può essere un singolo file per locale o per namespace:

```ts fileName="intlayer.config.ts"
plugins: [
  syncJSON({
    source: ({ key, locale }) => `./src/locales/${locale}/${key}.json`,
  }),
];
```

## CLI

I file JSON sincronizzati saranno considerati come altri file `.content`. Ciò significa che tutti i comandi di intlayer saranno disponibili per i file JSON sincronizzati. Inclusi:

- `intlayer content test` per verificare se ci sono traduzioni mancanti
- `intlayer content list` per elencare i file JSON sincronizzati
- `intlayer content fill` per completare le traduzioni mancanti
- `intlayer content push` per inviare i file JSON sincronizzati
- `intlayer content pull` per scaricare i file JSON sincronizzati

Vedi [Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_cli.md) per maggiori dettagli.

## Limitazioni (attuali)

- Nessun supporto per inserimenti o plurali/ICU quando si utilizzano librerie di terze parti.
- L'editor visuale non è ancora disponibile per runtime non Intlayer.
- Sincronizzazione solo di file JSON; i formati di catalogo non JSON non sono supportati.

## Perché è importante

- Possiamo raccomandare soluzioni i18n consolidate e posizionare Intlayer come un componente aggiuntivo.
- Sfruttiamo la loro SEO/parole chiave con tutorial che terminano suggerendo Intlayer per gestire JSON.
- Espande il pubblico indirizzabile da “nuovi progetti” a “qualsiasi team che utilizza già i18n”.
