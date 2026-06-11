---
createdAt: 2026-05-10
updatedAt: 2026-05-10
title: Plugin Sync PO
description: Sincronizza i dizionari Intlayer con i file Gettext PO. Mantieni la tua i18n esistente utilizzando Intlayer per gestire, tradurre e testare i tuoi messaggi.
keywords:
  - Intlayer
  - Sync PO
  - Gettext
  - i18n
  - traduzioni
slugs:
  - doc
  - plugin
  - sync-po
youtubeVideo: https://www.youtube.com/watch?v=MpGMxniDHNg
history:
  - version: 8.9.4
    date: 2026-05-10
    changes: "Documentazione iniziale del plugin Sync PO"
author:
  name: Aymeric PINEAU
  github: aymericzip
---

# Sync PO (ponti i18n) - Sync PO con supporto ICU / i18next

Usa Intlayer come componente aggiuntivo per il tuo stack i18n esistente. Questo plugin mantiene i tuoi messaggi Gettext PO sincronizzati con i dizionari Intlayer in modo da poter:

- Mantenere il tuo attuale workflow di traduzione basato su PO.
- Gestire e tradurre i tuoi messaggi con Intlayer (CLI, CI, provider, CMS), senza rifattorizzare la tua app.
- Distribuire tutorial e contenuti SEO mirati a ciascun ecosistema, suggerendo Intlayer come livello di gestione PO.

Note e ambito attuale:

- L'esternalizzazione al CMS funziona per le traduzioni e il testo classico.
- Non c'è ancora supporto per inserimenti, plurali/ICU o funzionalità avanzate di runtime di altre librerie all'interno delle voci PO stesse.
- L'editor visuale non è ancora supportato per gli output i18n di terze parti.

### Quando usare questo plugin

- Usi già i file Gettext PO per le tue traduzioni.
- Desideri il riempimento assistito da IA, i test in CI e le operazioni sui contenuti senza modificare il runtime di rendering.

## Installazione

```bash
pnpm add -D @intlayer/sync-po-plugin
# oppure
npm i -D @intlayer/sync-po-plugin
```

## Plugin

Questo pacchetto fornisce due plugin:

- `loadPO`: Carica i file PO nei dizionari Intlayer.
  - Questo plugin viene utilizzato per caricare file PO da una sorgente e verranno inseriti nei dizionari Intlayer. Può scansionare l'intera base di codice e cercare file PO specifici.
    Questo plugin può essere utilizzato:
    - se utilizzi una libreria i18n che impone una posizione specifica per il caricamento dei tuoi file PO, ma vuoi posizionare la tua dichiarazione di contenuto dove preferisci nella tua base di codice.
    - Può essere utilizzato anche se vuoi recuperare i tuoi messaggi da una sorgente remota (es: un CMS, un'API, ecc.) e memorizzare i tuoi messaggi in file PO.

  > Sotto il cofano, questo plugin scansionerà tutta la base di codice, cercherà file PO specifici e li caricherà nei dizionari Intlayer.
  > Nota che questo plugin non scriverà l'output e le traduzioni nei file PO.

- `syncPO`: Sincronizza i file PO con i dizionari Intlayer.
  - Questo plugin viene utilizzato per sincronizzare i file PO con i dizionari Intlayer. Può scansionare la posizione specificata e caricare i PO che corrispondono al pattern per file PO specifici. Questo plugin è utile se vuoi ottenere i vantaggi di Intlayer utilizzando un'altra libreria i18n.

## Utilizzo di entrambi i plugin

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { loadPO, syncPO } from "@intlayer/sync-po-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },

  // Mantieni i tuoi attuali file PO sincronizzati con i dizionari Intlayer
  plugins: [
    /**
     * Caricherà tutti i file PO in src che corrispondono al pattern {key}.i18n.po
     */
    loadPO({
      source: ({ key }) => `./src/**/${key}.i18n.po`,
      locale: Locales.ENGLISH,
      priority: 1, // Assicura che questi file PO abbiano la precedenza sui file in `./locales/en/${key}.po`
    }),
    /**
     * Caricherà e scriverà l'output e le traduzioni nei file PO nella directory locales
     */
    syncPO({
      source: ({ key, locale }) => `./locales/${locale}/${key}.po`,
      priority: 0,
    }),
  ],
};

export default config;
```

## Plugin `syncPO`

### Avvio rapido

Aggiungi il plugin al tuo `intlayer.config.ts` e puntalo alla tua struttura PO esistente.

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { syncPO } from "@intlayer/sync-po-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },

  // Mantieni i tuoi attuali file PO sincronizzati con i dizionari Intlayer
  plugins: [
    syncPO({
      // Layout per lingua e per namespace
      source: ({ key, locale }) => `./locales/${locale}/${key}.po`,
    }),
  ],
};

export default config;
```

Alternativa: file singolo per lingua:

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { syncPO } from "@intlayer/sync-po-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.ENGLISH,
  },
  plugins: [
    syncPO({
      source: ({ locale }) => `./locales/${locale}.po`,
    }),
  ],
};

export default config;
```

#### Come funziona

- Lettura: il plugin scopre i file PO dal tuo costruttore `source` e li carica come dizionari Intlayer.
- Scrittura: dopo le build e i riempimenti, scrive i PO localizzati negli stessi percorsi (con gli header Gettext appropriati).
- Riempimento automatico: il plugin dichiara un percorso `autoFill` per ogni dizionario. L'esecuzione di `intlayer fill` aggiorna per impostazione predefinita solo le traduzioni mancanti nei tuoi file PO.

API:

```ts
syncPO({
  source: ({ key, locale }) => string, // richiesto
  location?: string, // etichetta opzionale, default: "sync-po::path/to/source"
  priority?: number, // priorità opzionale per la risoluzione dei conflitti, default: 0
});
```

### Sorgenti PO multiple e priorità

Puoi aggiungere più plugin `syncPO` per sincronizzare diverse sorgenti PO. Questo è utile quando hai più sorgenti di traduzione o diverse strutture PO nel tuo progetto.

#### Sistema di priorità

Quando più plugin puntano alla stessa chiave del dizionario, il parametro `priority` determina quale plugin ha la precedenza:

- I numeri di priorità più alti vincono su quelli più bassi
- La priorità predefinita dei file `.content` è `0`
- La priorità predefinita dei plugin è `0`
- I plugin con la stessa priorità vengono elaborati nell'ordine in cui appaiono nella configurazione

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { syncPO } from "@intlayer/sync-po-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.ENGLISH,
  },

  plugins: [
    // Sorgente PO primaria (priorità massima)
    syncPO({
      source: ({ key, locale }) => `./locales/${locale}/${key}.po`,
      location: "main-translations",
      priority: 10,
    }),

    // Sorgente PO di fallback (priorità inferiore)
    syncPO({
      source: ({ locale }) => `./fallback-locales/${locale}.po`,
      location: "fallback-translations",
      priority: 5,
    }),

    // Sorgente PO legacy (priorità minima)
    syncPO({
      source: ({ locale }) => `/my/other/app/legacy/${locale}/messages.po`,
      location: "legacy-translations",
      priority: 1,
    }),
  ],
};

export default config;
```

## Plugin Load PO

### Avvio rapido

Aggiungi il plugin al tuo `intlayer.config.ts` per ingerire file PO esistenti come dizionari Intlayer. Questo plugin è di sola lettura (nessuna scrittura su disco):

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { loadPO } from "@intlayer/sync-po-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },

  plugins: [
    // Ingerisci i messaggi PO situati ovunque nel tuo albero dei sorgenti
    loadPO({
      source: ({ key }) => `./src/**/${key}.i18n.po`,
      // Carica una singola lingua per istanza di plugin (impostata di default sulla defaultLocale della configurazione)
      locale: Locales.ENGLISH,
      priority: 0,
    }),
  ],
};

export default config;
```

Alternativa: layout per lingua, ancora di sola lettura (viene caricata solo la lingua selezionata):

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { loadPO } from "@intlayer/sync-po-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.ENGLISH,
  },
  plugins: [
    loadPO({
      // Solo i file per Locales.FRENCH verranno caricati da questo pattern
      source: ({ key, locale }) => `./locales/${locale}/${key}.po`,
      locale: Locales.FRENCH,
    }),
  ],
};

export default config;
```

### Come funziona

- Scoperta: costruisce un glob dal tuo costruttore `source` e raccoglie i file PO corrispondenti.
- Ingestione: carica ogni file PO come dizionario Intlayer con la `locale` fornita.
- Sola lettura: non scrive né formatta i file di output; usa `syncPO` se hai bisogno della sincronizzazione round-trip.
- Pronto per il riempimento automatico: definisce un percorso `fill` in modo che `intlayer content fill` possa popolare le chiavi mancanti.

### API

```ts
loadPO({
  // Costruisce i percorsi per i tuoi PO. `locale` è opzionale se la tua struttura non ha un segmento per la lingua
  source: ({ key, locale }) => string,

  // Lingua di destinazione per i dizionari caricati da questa istanza di plugin
  // Di default configuration.internationalization.defaultLocale
  locale?: Locale,

  // Etichetta opzionale per identificare la sorgente
  location?: string, // default: "plugin"

  // Priorità utilizzata per la risoluzione dei conflitti con altre sorgenti
  priority?: number, // default: 0
});
```

### Comportamento e convenzioni

- Se la tua maschera `source` include un segnaposto per la lingua, vengono ingeriti solo i file per la `locale` selezionata.
- Se non c'è un segmento `{key}` nella tua maschera, la chiave del dizionario è "index".
- Le chiavi sono derivate dai percorsi dei file sostituendo il segnaposto `{key}` nel tuo costruttore `source`.
- Il plugin utilizza solo i file scoperti e non fabbrica lingue o chiavi mancanti.
- Il percorso `fill` è dedotto dalla tua `source` e utilizzato per aggiornare i valori mancanti tramite CLI quando acconsenti.

## Risoluzione dei conflitti

Quando la stessa chiave di traduzione esiste in più sorgenti PO:

1. Il plugin con la priorità più alta determina il valore finale
2. Le sorgenti con priorità inferiore vengono utilizzate come fallback per le chiavi mancanti
3. Questo ti consente di mantenere le traduzioni legacy mentre migri gradualmente verso nuove strutture

## CLI

I file PO sincronizzati saranno considerati come gli altri file `.content`. Ciò significa che tutti i comandi intlayer saranno disponibili per i file PO sincronizzati. Inclusi:

- `intlayer content test` per testare se mancano traduzioni
- `intlayer content list` per elencare i file PO sincronizzati
- `intlayer content fill` per riempire le traduzioni mancanti
- `intlayer content push` per inviare i file PO sincronizzati
- `intlayer content pull` per recuperare i file PO sincronizzati

Vedi [Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/cli/index.md) per maggiori dettagli.

## Limitazioni (attuali)

- Nessun supporto per inserimenti o plurali/ICU quando si puntano librerie di terze parti.
- L'editor visuale non è ancora disponibile per runtime diversi da Intlayer.
- Solo sincronizzazione PO; i formati di catalogo non-PO non sono supportati.

## Perché è importante

- Possiamo raccomandare soluzioni i18n consolidate e posizionare Intlayer come componente aggiuntivo.
- Sfruttiamo la loro SEO/parole chiave con tutorial che terminano suggerendo Intlayer per gestire i PO.
- Espande il pubblico potenziale dai "nuovi progetti" a "qualsiasi team che utilizzi già i18n".
