---
createdAt: 2025-08-23
updatedAt: 2025-10-29
title: Intlayer e vue-i18n
description: Integra Intlayer con vue-i18n per una soluzione completa di internazionalizzazione in Vue.js
keywords:
  - vue-i18n
  - Intlayer
  - Internazionalizzazione
  - Blog
  - Vue.js
  - Nuxt
  - JavaScript
  - Vue
slugs:
  - blog
  - intlayer-with-vue-i18n
history:
  - version: 7.0.6
    date: 2025-11-01
    changes: Aggiunto il plugin loadJSON
  - version: 7.0.0
    date: 2025-10-29
    changes: Passaggio al plugin syncJSON e riscrittura completa
---

# Internazionalizzazione (i18n) in Vue.js con vue-i18n e Intlayer

## Indice

<TOC/>

## Cos'è Intlayer?

**Intlayer** è una libreria di internazionalizzazione innovativa e open-source progettata per superare le limitazioni delle soluzioni i18n tradizionali. Offre un approccio moderno alla gestione dei contenuti nelle applicazioni Vue.js e Nuxt.

Consulta un confronto concreto con vue-i18n nel nostro post sul blog [vue-i18n vs. Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/it/vue-i18n_vs_intlayer.md).

## Perché combinare Intlayer con vue-i18n?

Sebbene Intlayer offra una soluzione i18n autonoma eccellente (vedi la nostra [guida all'integrazione con Vue.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_with_vite+vue.md)), potresti volerlo combinare con vue-i18n per diversi motivi:

1. **Codice esistente**: Hai un'implementazione vue-i18n consolidata e desideri migrare gradualmente all'esperienza sviluppatore migliorata di Intlayer.
2. **Requisiti legacy**: Il tuo progetto richiede compatibilità con plugin o flussi di lavoro vue-i18n esistenti.
3. **Familiarità del team**: Il tuo team è abituato a vue-i18n ma desidera una gestione dei contenuti migliore.
4. **Utilizzo delle funzionalità di Intlayer**: Vuoi utilizzare funzionalità di Intlayer come la dichiarazione dei contenuti, l'automazione delle traduzioni, il testing delle traduzioni e altro ancora.

**Per questo, Intlayer può essere implementato come un adattatore per vue-i18n per aiutarti ad automatizzare le tue traduzioni JSON in CLI o pipeline CI/CD, testare le tue traduzioni e altro ancora.**

Questa guida ti mostra come sfruttare il sistema superiore di dichiarazione dei contenuti di Intlayer mantenendo la compatibilità con vue-i18n.

---

## Guida passo-passo per configurare Intlayer con vue-i18n

### Passo 1: Installa le dipendenze

Installa i pacchetti necessari utilizzando il tuo gestore di pacchetti preferito:

```bash packageManager="npm"
npm install intlayer @intlayer/sync-json-plugin
```

```bash packageManager="pnpm"
pnpm add intlayer @intlayer/sync-json-plugin
```

```bash packageManager="yarn"
yarn add intlayer @intlayer/sync-json-plugin
```

```bash packageManager="bun"
bun add intlayer @intlayer/sync-json-plugin
```

**Spiegazioni dei pacchetti:**

- **intlayer**: Libreria core per la dichiarazione e gestione dei contenuti
- **@intlayer/sync-json-plugin**: Plugin per sincronizzare le dichiarazioni di contenuto di Intlayer nel formato JSON di vue-i18n

### Passo 2: Implementa il plugin Intlayer per incapsulare il JSON

Crea un file di configurazione Intlayer per definire le tue localizzazioni supportate:

**Se vuoi anche esportare dizionari JSON per vue-i18n**, aggiungi il plugin `syncJSON`:

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
      source: ({ key, locale }) => `./src/locales/${locale}/${key}.json`,
    }),
  ],
};

export default config;
```

Il plugin `syncJSON` incapsulerà automaticamente il JSON. Leggerà e scriverà i file JSON senza modificare l'architettura del contenuto.

Se vuoi far coesistere quel JSON con i file di dichiarazione del contenuto di Intlayer (file `.content`), Intlayer procederà in questo modo:

    1. caricherà sia i file JSON che i file di dichiarazione del contenuto e li trasformerà in un dizionario Intlayer.
    2. se ci sono conflitti tra i file JSON e i file di dichiarazione del contenuto, Intlayer procederà alla fusione di tutti quei dizionari. A seconda della priorità dei plugin e di quella del file di dichiarazione del contenuto (tutti configurabili).

Se vengono effettuate modifiche utilizzando la CLI per tradurre il JSON, o utilizzando il CMS, Intlayer aggiornerà il file JSON con le nuove traduzioni.

Per maggiori dettagli sul plugin `syncJSON`, si prega di fare riferimento alla [documentazione del plugin syncJSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/plugins/sync-json.md).

---

### (Opzionale) Passo 3: Implementare traduzioni JSON per componente

Per impostazione predefinita, Intlayer caricherà, unirà e sincronizzerà sia i file JSON che i file di dichiarazione del contenuto. Vedi [la documentazione sulla dichiarazione del contenuto](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dictionary/content_file.md) per maggiori dettagli. Ma se preferisci, utilizzando un plugin Intlayer, puoi anche implementare la gestione per componente del JSON localizzato ovunque nel tuo codice.

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
      priority: 1, // Garantisce che questi file JSON abbiano la precedenza sui file in `./locales/en/${key}.json`
    }),
    /**
     * Caricherà e scriverà l'output e le traduzioni di nuovo nei file JSON nella directory delle localizzazioni
     */
    syncJSON({
      source: ({ key, locale }) => `./src/locales/${locale}/${key}.json`,
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
intl
```

Questi file vengono rigenerati automaticamente durante il processo di build e non devono essere aggiunti al tuo repository.

### Estensione VS Code

Per migliorare l'esperienza dello sviluppatore, installa l'**Estensione ufficiale Intlayer per VS Code**:

[Installa dal Marketplace di VS Code](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)
