---
createdAt: 2025-03-13
updatedAt: 2026-06-21
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
  - version: 9.0.0
    date: 2026-06-21
    changes: "Aggiunta l'opzione splitKeys (un dizionario per chiave namespace di primo livello) per layout a file singolo di next-intl / react-intl"
  - version: 7.5.0
    date: 2025-12-13
    changes: "Aggiunto supporto per i formati ICU e i18next"
  - version: 6.1.6
    date: 2025-10-05
    changes: "Documentazione iniziale del plugin Sync JSON"
author: aymericzip
---

# Sync JSON (ponti i18n) - Sync JSON con supporto ICU / i18next

<iframe title="Come mantenere sincronizzate le tue traduzioni JSON con Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/MpGMxniDHNg?autoplay=0&amp;origin=https://intlayer.org&amp;controls=0&amp;rel=1"/>

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

## Plugins

Questo pacchetto fornisce due plugin:

- `loadJSON`: Carica file JSON nei dizionari Intlayer.
  - Questo plugin viene utilizzato per caricare file JSON da una sorgente e verrà caricato nei dizionari Intlayer. Può scansionare l'intera codebase e cercare file JSON specifici.
    Questo plugin può essere utilizzato
    - se utilizzi una libreria i18n che impone una posizione specifica per il caricamento dei tuoi JSON (es: `next-intl`, `i18next`, `react-intl`, `vue-i18n`, ecc.), ma vuoi posizionare la dichiarazione del tuo contenuto dove vuoi nella tua codebase.
    - Può anche essere utilizzato se vuoi recuperare i tuoi messaggi da una sorgente remota (es: un CMS, un'API, ecc.) e memorizzare i tuoi messaggi in file JSON.

  > Sotto il cofano, questo plugin scansionerà l'intera codebase e cercherà file JSON specifici e li caricherà nei dizionari Intlayer.
  > Nota che questo plugin non scriverà l'output e le traduzioni nei file JSON.

- `syncJSON`: Sincronizza i file JSON con i dizionari Intlayer.
  - Questo plugin viene utilizzato per sincronizzare i file JSON con i dizionari Intlayer. Può scansionare la posizione data e caricare i JSON che corrispondono al pattern per file JSON specifici. Questo plugin è utile se vuoi ottenere i benefici di Intlayer mentre usi un'altra libreria i18n.

## Usare entrambi i plugin

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { loadJSON, syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },

  // Mantieni i tuoi file JSON attuali sincronizzati con i dizionari Intlayer
  plugins: [
    /**
     * Caricherà tutti i file JSON in src che corrispondono al pattern {key}.i18n json
     */
    loadJSON({
      source: ({ key }) => `./src/**/${key}.i18n.json`,
      locale: Locales.ENGLISH,
      priority: 1, // Assicura che questi file JSON abbiano la precedenza sui file in `./locales/en/${key}.json`
      format: "intlayer", // Formato del contenuto JSON
    }),
    /**
     * Caricherà e scriverà l'output e le traduzioni nei file JSON nella directory locales
     */
    syncJSON({
      source: ({ key, locale }) => `./locales/${locale}/${key}.json`,
      priority: 0,
      format: "i18next",
    }),
  ],
};

export default config;
```

## `syncJSON` plugin

### Avvio rapido

Aggiungi il plugin al tuo `intlayer.config.ts` e indirizzalo alla tua struttura JSON esistente.

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },

  // Mantieni i tuoi file JSON attuali sincronizzati con i dizionari Intlayer
  plugins: [
    syncJSON({
      // Layout per locale, per namespace (es. next-intl, i18next con namespaces)
      source: ({ key, locale }) => `./locales/${locale}/${key}.json`,
      format: "icu",
    }),
  ],
};

export default config;
```

Alternativa: file singolo per locale (comune con configurazioni i18next/react-intl):

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.ENGLISH,
  },
  plugins: [
    syncJSON({
      format: "i18next",
      source: ({ locale }) => `./locales/${locale}.json`,
      format: "i18next",
    }),
  ],
};

export default config;
```

#### Come funziona

- Lettura: il plugin individua i file JSON dal tuo builder `source` e li carica come dizionari Intlayer.
- Scrittura: dopo le build e i riempimenti, scrive i JSON localizzati negli stessi percorsi (con una newline finale per evitare problemi di formattazione).
- Auto‑fill: il plugin dichiara un percorso `autoFill` per ogni dizionario. Eseguendo `intlayer fill` aggiorna solo le traduzioni mancanti nei tuoi file JSON per impostazione predefinita.

API:

```ts
syncJSON({
  source: ({ key, locale }) => string, // richiesto
  location?: string, // etichetta opzionale, predefinito: "plugin"
  priority?: number, // priorità opzionale per la risoluzione dei conflitti, predefinito: 0
  format?: 'intlayer' | 'icu' | 'i18next', // formattatore opzionale, usato per la compatibilità con il runtime Intlayer
  splitKeys?: boolean, // opzionale, divide un singolo file in un dizionario per chiave di primo livello (rilevamento automatico)
});
```

#### `format` ('intlayer' | 'icu' | 'i18next')

Specifica il formattatore da utilizzare per il contenuto del dizionario durante la sincronizzazione dei file JSON. Ciò consente di utilizzare diverse sintassi di formattazione dei messaggi compatibili con il runtime Intlayer.

- `undefined`: Nessun formattatore verrà utilizzato, il contenuto JSON sarà usato così com'è.
- `'intlayer'`: Il formattatore Intlayer predefinito (predefinito).
- `'icu'`: Utilizza la formattazione dei messaggi ICU (compatibile con librerie come react-intl, vue-i18n).
- `'i18next'`: Utilizza la formattazione dei messaggi i18next (compatibile con i18next, next-i18next, Solid-i18next).

> Nota che l'uso di un formattatore trasformerà il tuo contenuto JSON in input e output. Per regole JSON complesse come i plurali ICU, il parsing potrebbe non garantire una mappatura 1 a 1 tra input e output.
> Se non usi il runtime Intlayer, potresti preferire non impostare un formattatore.

**Esempio:**

```ts
syncJSON({
  source: ({ key, locale }) => `./locales/${locale}/${key}.json`,
  format: "i18next", // Usare la formattazione i18next per la compatibilità
}),
```

#### `splitKeys` (boolean)

Controlla se un singolo file JSON le cui **chiavi di primo livello sono namespace** debba diventare un dizionario per ogni chiave di primo livello, invece di un singolo dizionario che contiene l'intero file.

Questo corrisponde al modello di namespace di librerie come `next-intl` e `react-intl`, dove un file `messages/{locale}.json` raggruppa diversi namespace tramite le sue chiavi di primo livello, ciascuna indirizzata indipendentemente (ad esempio `useTranslations('Hero')` si risolve nel dizionario `Hero`).

- `undefined` (predefinito): **rilevamento automatico** — il file viene diviso quando il pattern `source` non ha un segmento `{key}` (un file contiene ogni namespace), e mantenuto come un singolo dizionario altrimenti (un file per chiave).
- `true`: divide sempre ogni chiave di primo livello nel proprio dizionario.
- `false`: non divide mai; l'intero file diventa un singolo dizionario.

Dato un singolo file `messages/{locale}.json`:

```json fileName="messages/en.json"
{
  "Hero": { "title": "Full-stack developer" },
  "Nav": { "work": "Work", "about": "About" },
  "About": { "lead": "I build apps end to end." }
}
```

```ts fileName="intlayer.config.ts"
syncJSON({
  format: "icu",
  source: ({ locale }) => `./messages/${locale}.json`,
  // splitKeys: true, // implicito perché il pattern non ha un segmento `{key}`
}),
```

Questo produce tre dizionari — `Hero`, `Nav` e `About` — quindi `useTranslations('Hero')` (next-intl) si risolve correttamente. Durante la riscrittura, tutti i namespace vengono riassemblati nello stesso file per locale.

> Quando mantieni il segmento `{key}` esplicito nel tuo `source` (ad esempio `./locales/${locale}/${key}.json`), ogni file è già un namespace, quindi la divisione è disabilitata per impostazione predefinita.

### Multiple JSON sources and priority

Puoi aggiungere più plugin `syncJSON` per sincronizzare diverse sorgenti JSON. Questo è utile quando hai più librerie i18n o diverse strutture JSON nel tuo progetto.

#### Sistema di priorità

Quando più plugin puntano alla stessa chiave del dizionario, il parametro `priority` determina quale plugin ha la precedenza:

- I numeri di priorità più alti prevalgono su quelli più bassi
- La priorità predefinita dei file `.content` è `0`
- La priorità predefinita dei plugin è `0`
- I plugin con la stessa priorità vengono elaborati nell'ordine in cui appaiono nella configurazione

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.ENGLISH,
  },

  plugins: [
    // Sorgente JSON primaria (priorità più alta)
    syncJSON({
      format: "i18next",
      source: ({ key, locale }) => `./locales/${locale}/${key}.json`,
      location: "main-translations",
      priority: 10,
    }),

    // Sorgente JSON di fallback (priorità più bassa)
    syncJSON({
      format: "i18next",
      source: ({ locale }) => `./fallback-locales/${locale}.json`,
      location: "fallback-translations",
      priority: 5,
    }),

    // Sorgente JSON legacy (priorità più bassa)
    syncJSON({
      format: "i18next",
      source: ({ locale }) => `/my/other/app/legacy/${locale}/messages.json`,
      location: "legacy-translations",
      priority: 1,
    }),
  ],
};

export default config;
```

## Load JSON plugin

### Quick start

Aggiungi il plugin al tuo `intlayer.config.ts` per importare i file JSON esistenti come dizionari Intlayer. Questo plugin è di sola lettura (nessuna scrittura su disco):

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { loadJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },

  plugins: [
    // Ingerisci messaggi JSON situati ovunque nel tuo albero sorgente
    loadJSON({
      source: ({ key }) => `./src/**/${key}.i18n.json`,
      // Carica una singola locale per istanza del plugin (predefinito alla defaultLocale della configurazione)
      locale: Locales.ENGLISH,
      priority: 0,
    }),
  ],
};

export default config;
```

Alternativa: layout per locale, ancora di sola lettura (viene caricata solo la locale selezionata):

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { loadJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.ENGLISH,
  },
  plugins: [
    loadJSON({
      // Solo i file per Locales.FRENCH verranno caricati da questo pattern
      source: ({ key, locale }) => `./locales/${locale}/${key}.json`,
      locale: Locales.FRENCH,
    }),
  ],
};

export default config;
```

### How it works

- Scopri: costruisce un glob dal tuo builder `source` e raccoglie i file JSON corrispondenti.
- Ingerisci: carica ogni file JSON come dizionario Intlayer con la `locale` fornita.
- Sola lettura: non scrive né formatta i file di output; usa `syncJSON` se hai bisogno di una sincronizzazione bidirezionale.
- Pronto per l'auto-fill: definisce un pattern `fill` in modo che `intlayer content fill` possa popolare le chiavi mancanti.

### API

```ts
loadJSON({
  // Costruisci i percorsi ai tuoi JSON. `locale` è opzionale se la tua struttura non ha un segmento locale
  source: ({ key, locale }) => string,

  // Locale di destinazione per i dizionari caricati da questa istanza del plugin
  // Predefinito a configuration.internationalization.defaultLocale
  locale?: Locale,

  // Etichetta opzionale per identificare la sorgente
  location?: string, // predefinito: "plugin"

  // Priorità utilizzata per la risoluzione dei conflitti contro altre sorgenti
  priority?: number, // predefinito: 0

  // Formattatore opzionale per il contenuto JSON
  format?: 'intlayer' | 'icu' | 'i18next', // predefinito: 'intlayer'

  // Divide un singolo file in un dizionario per chiave di primo livello (rilevamento automatico)
  splitKeys?: boolean,
});
```

#### `format` ('intlayer' | 'icu' | 'i18next')

Specifica il formattatore da utilizzare per il contenuto del dizionario durante il caricamento dei file JSON. Ciò consente di utilizzare diverse sintassi di formattazione dei messaggi compatibili con varie librerie i18n.

- `'intlayer'`: Il formattatore Intlayer predefinito (predefinito).
- `'icu'`: Utilizza la formattazione dei messaggi ICU (compatibile con librerie come react-intl, vue-i18n).
- `'i18next'`: Utilizza la formattazione dei messaggi i18next (compatibile con i18next, next-i18next, Solid-i18next).

**Esempio:**

```ts
loadJSON({
  source: ({ key }) => `./src/**/${key}.i18n.json`,
  locale: Locales.ENGLISH,
  format: "icu", // Usa la formattazione ICU per la compatibilità
}),
```

#### `splitKeys` (boolean)

Stesso comportamento di [`syncJSON`](#splitkeys-boolean): quando un singolo file JSON raggruppa diversi namespace tramite le sue chiavi di primo livello, ogni chiave di primo livello diventa il proprio dizionario.

- `undefined` (predefinito): **rilevamento automatico** — divide quando il pattern `source` non ha un segmento `{key}`, singolo dizionario altrimenti.
- `true` / `false`: forza o disabilita la divisione.

```ts
loadJSON({
  source: ({ locale }) => `./messages/${locale}.json`,
  format: "icu",
  // splitKeys auto-enabled: `Hero`, `Nav`, `About`, … ciascuno diventa un dizionario
}),
```

### Behavior and conventions

- Se la tua maschera `source` include un segnaposto per la locale, vengono ingeriti solo i file per la `locale` selezionata.
- Se non c'è un segmento `{key}` nella tua maschera, ogni chiave di primo livello del file diventa il proprio dizionario per impostazione predefinita (vedi [`splitKeys`](#splitkeys-boolean)). Imposta `splitKeys: false` per caricare invece l'intero file come un singolo dizionario `index`.
- Le chiavi sono derivate dai percorsi dei file sostituendo il segnaposto `{key}` nel tuo builder `source`.
- Il plugin utilizza solo i file scoperti e non fabbrica locali o chiavi mancanti.
- Il percorso `fill` è inferito dal tuo `source` e utilizzato per aggiornare i valori mancanti tramite CLI quando scegli di farlo.

## Conflict resolution

Quando la stessa chiave di traduzione esiste in più sorgenti JSON:

1. Il plugin con la priorità più alta determina il valore finale
2. Le sorgenti con priorità inferiore vengono usate come fallback per le chiavi mancanti
3. Questo permette di mantenere le traduzioni legacy mentre si migra gradualmente verso nuove strutture

## CLI

I file JSON sincronizzati saranno considerati come altri file `.content`. Ciò significa che tutti i comandi di intlayer saranno disponibili per i file JSON sincronizzati. Inclusi:

- `intlayer content test` per verificare se ci sono traduzioni mancanti
- `intlayer content list` per elencare i file JSON sincronizzati
- `intlayer content fill` per completare le traduzioni mancanti
- `intlayer content push` per inviare i file JSON sincronizzati
- `intlayer content pull` per scaricare i file JSON sincronizzati

Vedi [Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/cli/index.md) per maggiori dettagli.

## Limitations (current)

- Nessun supporto per inserimenti o plurali/ICU quando si utilizzano librerie di terze parti.
- L'editor visuale non è ancora disponibile per runtime non Intlayer.
- Sincronizzazione solo di file JSON; i formati di catalogo non JSON non sono supportati.

## Why this matters

- Possiamo raccomandare soluzioni i18n consolidate e posizionare Intlayer come un componente aggiuntivo.
- Sfruttiamo la loro SEO/parole chiave con tutorial che terminano suggerendo Intlayer per gestire JSON.
- Espande il pubblico indirizzabile da “nuovi progetti” a “qualsiasi team che utilizza già i18n”.
