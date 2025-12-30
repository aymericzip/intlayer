---
createdAt: 2025-08-23
updatedAt: 2025-10-29
title: Intlayer e next-i18next
description: Integra Intlayer con next-i18next per una soluzione completa di internazionalizzazione in Next.js
keywords:
  - i18next
  - next-i18next
  - Intlayer
  - Internazionalizzazione
  - Blog
  - Next.js
  - JavaScript
  - React
slugs:
  - blog
  - intlayer-with-next-i18next
youtubeVideo: https://www.youtube.com/watch?v=MpGMxniDHNg
history:
  - version: 7.0.6
    date: 2025-11-01
    changes: Aggiunto plugin loadJSON
  - version: 7.0.0
    date: 2025-10-29
    changes: Modificato in plugin syncJSON e riscrittura completa
---

# Internazionalizzazione (i18n) in Next.js con next-i18next e Intlayer

<iframe title="Come automatizzare le traduzioni JSON di next-i18next usando Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/MpGMxniDHNg?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

## Indice

<TOC/>

## Cos'è next-i18next?

**next-i18next** è uno dei framework di internazionalizzazione (i18n) più popolari per le applicazioni Next.js. Costruito sopra il potente ecosistema **i18next**, offre una soluzione completa per la gestione delle traduzioni, della localizzazione e del cambio lingua nei progetti Next.js.

Tuttavia, next-i18next presenta alcune sfide:

- **Configurazione complessa**: Configurare next-i18next richiede più file di configurazione e un'attenta impostazione delle istanze i18n sia lato server che lato client.
- **Traduzioni sparse**: I file di traduzione sono tipicamente archiviati in directory separate dai componenti, rendendo più difficile mantenere la coerenza.
- **Gestione manuale dei namespace**: Gli sviluppatori devono gestire manualmente i namespace e assicurarsi del corretto caricamento delle risorse di traduzione.
- **Sicurezza dei tipi limitata**: Il supporto a TypeScript richiede una configurazione aggiuntiva e non fornisce una generazione automatica dei tipi per le traduzioni.

## Cos'è Intlayer?

**Intlayer** è una libreria di internazionalizzazione innovativa e open-source progettata per affrontare le carenze delle soluzioni i18n tradizionali. Offre un approccio moderno alla gestione dei contenuti nelle applicazioni Next.js.

Consulta un confronto concreto con next-intl nel nostro post del blog [next-i18next vs. next-intl vs. Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/it/next-i18next_vs_next-intl_vs_intlayer.md).

## Perché combinare Intlayer con next-i18next?

Mentre Intlayer offre un'eccellente soluzione i18n autonoma (consulta la nostra [guida all'integrazione con Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_with_nextjs_16.md)), potresti volerlo combinare con next-i18next per diversi motivi:

1. **Codice esistente**: Hai un'implementazione consolidata di next-i18next e desideri migrare gradualmente verso la migliore esperienza sviluppatore di Intlayer.
2. **Requisiti legacy**: Il tuo progetto richiede compatibilità con plugin o flussi di lavoro i18next esistenti.
3. **Familiarità del team**: Il tuo team è a suo agio con next-i18next ma desidera una migliore gestione dei contenuti.

**Per questo, Intlayer può essere implementato come un adattatore per next-i18next per aiutarti ad automatizzare le tue traduzioni JSON in CLI o pipeline CI/CD, testare le tue traduzioni e altro ancora.**

Questa guida ti mostra come sfruttare il sistema superiore di dichiarazione dei contenuti di Intlayer mantenendo la compatibilità con next-i18next.

---

## Guida passo-passo per configurare Intlayer con next-i18next

### Passo 1: Installa le dipendenze

Installa i pacchetti necessari usando il tuo gestore di pacchetti preferito:

```bash packageManager="npm"
npm install intlayer @intlayer/sync-json-plugin --save-dev
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer @intlayer/sync-json-plugin --save-dev
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer @intlayer/sync-json-plugin --dev
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer @intlayer/sync-json-plugin --dev
bunx intlayer init
```

**Spiegazioni dei pacchetti:**

- **intlayer**: Libreria core per la dichiarazione e gestione dei contenuti
- **@intlayer/sync-json-plugin**: Plugin per sincronizzare le dichiarazioni di contenuto Intlayer nel formato JSON di i18next

### Passo 2: Implementa il plugin Intlayer per avvolgere il JSON

Crea un file di configurazione Intlayer per definire le tue localizzazioni supportate:

**Se vuoi anche esportare dizionari JSON per i18next**, aggiungi il plugin `syncJSON`:

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  plugins: [
    syncJSON({
      format: "i18next",
      source: ({ key, locale }) => `./public/locales/${locale}/${key}.json`,
    }),
  ],
};

export default config;
```

Il plugin `syncJSON` avvolgerà automaticamente il JSON. Leggerà e scriverà i file JSON senza modificare l'architettura del contenuto.

Se vuoi far coesistere quel JSON con i file di dichiarazione dei contenuti di Intlayer (file `.content`), Intlayer procederà in questo modo:

    1. caricherà sia i file JSON che i file di dichiarazione dei contenuti e li trasformerà in un dizionario Intlayer.
    2. se ci sono conflitti tra i file JSON e i file di dichiarazione dei contenuti, Intlayer procederà alla fusione di tutti quei dizionari. A seconda della priorità dei plugin e di quella del file di dichiarazione dei contenuti (tutti configurabili).

Se vengono apportate modifiche utilizzando la CLI per tradurre il JSON, o utilizzando il CMS, Intlayer aggiornerà il file JSON con le nuove traduzioni.

Per maggiori dettagli sul plugin `syncJSON`, si prega di fare riferimento alla [documentazione del plugin syncJSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/plugins/sync-json.md).

---

### (Opzionale) Passo 3: Implementare traduzioni JSON per componente

Per impostazione predefinita, Intlayer caricherà, unirà e sincronizzerà sia i file JSON che i file di dichiarazione dei contenuti. Vedi [la documentazione sulla dichiarazione dei contenuti](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dictionary/content_file.md) per maggiori dettagli. Ma se preferisci, utilizzando un plugin di Intlayer, puoi anche implementare la gestione per componente di JSON localizzati ovunque nel tuo codice.

Per questo, puoi usare il plugin `loadJSON`.

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
     * Caricherà tutti i file JSON nella cartella src che corrispondono al pattern {key}.i18n.json
     */
    loadJSON({
      source: ({ key }) => `./src/**/${key}.i18n.json`,
      locale: Locales.ENGLISH,
      priority: 1, // Garantisce che questi file JSON abbiano priorità rispetto ai file in `./public/locales/en/${key}.json`
    }),
    /**
     * Caricherà e scriverà l'output e le traduzioni nei file JSON nella directory delle localizzazioni
     */
    syncJSON({
      format: "i18next",
      source: ({ key, locale }) => `./public/locales/${locale}/${key}.json`,
      priority: 0,
    }),
  ],
};

export default config;
```

Questo caricherà tutti i file JSON nella directory `src` che corrispondono al modello `{key}.i18n.json` e li caricherà come dizionari Intlayer.

---

## Configurazione Git

Escludi i file generati dal controllo di versione:

```plaintext fileName=".gitignore"
# Ignora i file generati da Intlayer
.intlayer
```

Questi file vengono rigenerati automaticamente durante il processo di build e non devono essere aggiunti al tuo repository.

### Estensione VS Code

Per una migliore esperienza di sviluppo, installa l'**Estensione ufficiale Intlayer per VS Code**:

[Installa dal Marketplace di VS Code](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)
