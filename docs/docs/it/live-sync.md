---
createdAt: 2026-07-08
updatedAt: 2026-07-08
title: Sincronizzazione live | Rifletti le modifiche dei contenuti del CMS in tempo reale
description: Consenti alla tua applicazione di riflettere le modifiche dei contenuti del CMS Intlayer in tempo reale, senza ricompilazione né nuova distribuzione.
keywords:
  - Sincronizzazione live
  - Live Sync
  - CMS
  - Editor Visivo
  - Internazionalizzazione
  - Documentazione
  - Intlayer
  - Next.js
  - Vite
history:
  - version: 9.0.0
    date: 2026-07-08
    changes: "Spostato dalla documentazione del CMS Intlayer in una pagina dedicata"
  - version: 6.0.1
    date: 2025-09-22
    changes: "Aggiunta documentazione sulla sincronizzazione live"
  - version: 6.0.0
    date: 2025-09-04
    changes: "Sostituito il campo `hotReload` con `liveSync`"
author: aymericzip
---

# Sincronizzazione live

La Sincronizzazione Live consente alla tua app di riflettere le modifiche ai contenuti del CMS in tempo reale. Non è necessario ricostruire o ridistribuire. Quando abilitata, gli aggiornamenti vengono trasmessi a un server di Sincronizzazione Live che aggiorna i dizionari letti dalla tua applicazione.

## Indice

<TOC/>

---

## Attivare la sincronizzazione live

> Live Sync richiede una connessione continua al server ed è disponibile nel piano enterprise.

Abilita Live Sync aggiornando la configurazione di Intlayer:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... altre impostazioni di configurazione
  editor: {
    /**
     * Abilita il caricamento a caldo delle configurazioni locali quando vengono rilevate modifiche.
     * Ad esempio, quando un dizionario viene aggiunto o aggiornato, l'applicazione aggiorna
     * il contenuto visualizzato nella pagina.
     *
     * Poiché il caricamento a caldo richiede una connessione continua al server, è
     * disponibile solo per i clienti del piano `enterprise`.
     *
     * Predefinito: false
     */
    liveSync: true,
  },
  dictionary: {
    /**
     * Controlla come vengono importati i dizionari:
     *
     * - "live": I dizionari vengono recuperati dinamicamente utilizzando l'API Live Sync.
     *   Sostituisce useIntlayer con useDictionaryDynamic.
     *
     * Nota: La modalità live utilizza l'API Live Sync per recuperare i dizionari. Se la chiamata API
     * fallisce, i dizionari vengono importati dinamicamente.
     * Nota: Solo i dizionari con contenuto remoto e flag "live" utilizzano la modalità live.
     * Gli altri usano la modalità dinamica per le prestazioni.
     */
    importMode: "fetch",
  },
};

export default config;
```

Avvia il server Live Sync per avvolgere la tua applicazione:

Esempio con Next.js:

```json5 fileName="package.json"
{
  "scripts": {
    // ... altri script
    "build": "next build",
    "dev": "next dev",
    "start": "npx intlayer live --with 'next start'",
  },
}
```

Esempio con Vite:

```json5 fileName="package.json"
{
  "scripts": {
    // ... altri script
    "build": "vite build",
    "dev": "vite dev",
    "start": "npx intlayer live --with 'vite start'",
  },
}
```

Il server Live Sync avvolge la tua applicazione e applica automaticamente i contenuti aggiornati non appena arrivano.

Per ricevere notifiche di modifica dal CMS, il server Live Sync mantiene una connessione SSE con il backend. Quando il contenuto cambia nel CMS, il backend inoltra l'aggiornamento al server Live Sync, che scrive i nuovi dizionari. La tua applicazione rifletterà l'aggiornamento alla successiva navigazione o al reload del browser, non è necessario ricostruire.

Diagramma di flusso (CMS/Backend -> Server Live Sync -> Server Applicazione -> Frontend):

![Schema Logica Live Sync](https://github.com/aymericzip/intlayer/blob/main/docs/assets/live_sync_logic_schema.svg)

Come funziona:

![Schema Flusso Live Sync CMS/Backend/Server Live Sync/Server Applicazione/Frontend](https://github.com/aymericzip/intlayer/blob/main/docs/assets/live_sync_flow_scema.svg)

## Flusso di lavoro di sviluppo (locale)

- In fase di sviluppo, tutti i dizionari remoti vengono recuperati all'avvio dell'applicazione, così puoi testare rapidamente gli aggiornamenti.
- Per testare Live Sync localmente con Next.js, avvolgi il tuo server di sviluppo:

```json5 fileName="package.json"
{
  "scripts": {
    // ... altri script
    "dev": "npx intlayer live --with 'next dev'",
    // "dev": "npx intlayer live --with 'vite dev'", // Per Vite
  },
}
```

Abilita l'ottimizzazione affinché Intlayer applichi le trasformazioni di importazione Live durante lo sviluppo:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  editor: {
    applicationURL: "http://localhost:5173",
    liveSyncURL: "http://localhost:4000",
    liveSync: true,
  },
  dictionary: {
    importMode: "fetch",
  },
  build: {
    optimize: true,
  },
};

export default config;
```

Questa configurazione avvolge il tuo server di sviluppo con il server Live Sync, recupera i dizionari remoti all'avvio e trasmette aggiornamenti dal CMS tramite SSE. Aggiorna la pagina per vedere le modifiche.

## Note e vincoli

- Aggiungi l'origine del live sync alla tua politica di sicurezza del sito (CSP). Assicurati che l'URL del live sync sia consentito in `connect-src` (e in `frame-ancestors` se pertinente).
- Live Sync non funziona con output statico. Per Next.js, la pagina deve essere dinamica per ricevere aggiornamenti in fase di esecuzione (ad esempio, usa `generateStaticParams`, `generateMetadata`, `getServerSideProps` o `getStaticProps` in modo appropriato per evitare vincoli di solo statico completo).
- Nel CMS, ogni dizionario ha un flag `live`. Solo i dizionari con `live=true` vengono recuperati tramite l'API di live sync; gli altri vengono importati dinamicamente e rimangono invariati a runtime.
- Il flag `live` viene valutato per ogni dizionario al momento della build. Se il contenuto remoto non era contrassegnato come `live=true` durante la build, è necessario ricostruire per abilitare Live Sync per quel dizionario.
- Il server di live sync deve poter scrivere nella cartella `.intlayer`. Nei container, assicurarsi che sia garantito l'accesso in scrittura a `/.intlayer`.

## Link utili

- [CMS Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_CMS.md)
- [Editor Visivo di Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_visual_editor.md)
- [Riferimento di configurazione](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/configuration.md)
- [Guida al Self-Hosting](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/self_hosting.md)
