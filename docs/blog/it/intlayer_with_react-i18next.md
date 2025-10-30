---
createdAt: 2025-01-02
updatedAt: 2025-10-29
title: Come automatizzare le traduzioni JSON di react-i18next usando Intlayer
description: Automatizza le tue traduzioni JSON con Intlayer e react-i18next per una migliore internazionalizzazione nelle applicazioni React.
keywords:
  - react-i18next
  - i18next
  - Intlayer
  - Internazionalizzazione
  - i18n
  - Blog
  - React
  - JavaScript
  - TypeScript
  - Gestione Contenuti
slugs:
  - blog
  - intlayer-with-react-i18next
history:
  - version: 7.0.0
    date: 2025-10-29
    changes: Modifica al plugin syncJSON
---

# Come automatizzare le traduzioni JSON di react-i18next usando Intlayer

## Cos'è Intlayer?

**Intlayer** è una libreria di internazionalizzazione innovativa e open-source progettata per superare le limitazioni delle soluzioni i18n tradizionali. Offre un approccio moderno alla gestione dei contenuti nelle applicazioni React.

Consulta un confronto concreto con react-i18next nel nostro post del blog [react-i18next vs. react-intl vs. Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/it/react-i18next_vs_react-intl_vs_intlayer.md).

## Perché combinare Intlayer con react-i18next?

Sebbene Intlayer offra una soluzione i18n autonoma eccellente (vedi la nostra [guida all'integrazione con React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_with_vite+react.md)), potresti volerlo combinare con react-i18next per diversi motivi:

1. **Codice esistente**: Hai un’implementazione consolidata di react-i18next e desideri migrare gradualmente alla migliore esperienza sviluppatore offerta da Intlayer.
2. **Requisiti legacy**: Il tuo progetto richiede la compatibilità con plugin o flussi di lavoro esistenti di react-i18next.
3. **Familiarità del team**: Il tuo team è abituato a react-i18next ma desidera una migliore gestione dei contenuti.

**Per questo, Intlayer può essere implementato come un adattatore per react-i18next per aiutarti ad automatizzare le tue traduzioni JSON in CLI o pipeline CI/CD, testare le traduzioni e altro ancora.**

Questa guida ti mostra come sfruttare il sistema superiore di dichiarazione dei contenuti di Intlayer mantenendo la compatibilità con react-i18next.

## Indice

<TOC/>

## Guida passo-passo per configurare Intlayer con react-i18next

### Passo 1: Installare le dipendenze

Installa i pacchetti necessari:

```bash packageManager="npm"
npm install intlayer @intlayer/sync-json-plugin
```

```bash packageManager="pnpm"
pnpm add intlayer @intlayer/sync-json-plugin
```

```bash packageManager="yarn"
yarn add intlayer @intlayer/sync-json-plugin
```

**Descrizione dei pacchetti:**

- **intlayer**: Libreria principale per la gestione dell'internazionalizzazione, dichiarazione dei contenuti e build
- **@intlayer/sync-json-plugin**: Plugin per esportare le dichiarazioni di contenuto di Intlayer in formato JSON compatibile con react-i18next

### Passo 2: Implementare il plugin Intlayer per incapsulare il JSON

Crea un file di configurazione Intlayer per definire le tue localizzazioni supportate:

**Se vuoi anche esportare i dizionari JSON per react-i18next**, aggiungi il plugin `syncJSON`:

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
      source: ({ key, locale }) => `./messages/${locale}/${key}.json`,
    }),
  ],
};

export default config;
```

Il plugin `syncJSON` avvolgerà automaticamente il JSON. Leggerà e scriverà i file JSON senza modificare l'architettura del contenuto.

Se vuoi far coesistere quel JSON con i file di dichiarazione dei contenuti di intlayer (file `.content`), Intlayer procederà in questo modo:

    1. caricare sia i file JSON che i file di dichiarazione dei contenuti e trasformarli in un dizionario intlayer.
    2. se ci sono conflitti tra i file JSON e i file di dichiarazione dei contenuti, Intlayer procederà alla fusione di tutti questi dizionari. A seconda della priorità dei plugin e di quella del file di dichiarazione dei contenuti (tutti configurabili).

Se vengono apportate modifiche utilizzando la CLI per tradurre il JSON, o utilizzando il CMS, Intlayer aggiornerà il file JSON con le nuove traduzioni.

Per maggiori dettagli sul plugin `syncJSON`, si prega di fare riferimento alla [documentazione del plugin syncJSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/plugins/sync-json.md).

## Configurazione Git

È consigliato ignorare i file Intlayer generati automaticamente:

```plaintext fileName=".gitignore"
# Ignorare i file generati da Intlayer
.intlayer
```

Questi file possono essere rigenerati durante il processo di build e non è necessario includerli nel controllo di versione.

### Estensione VS Code

Per migliorare l'esperienza dello sviluppatore, installa l'**Estensione ufficiale Intlayer per VS Code**:

[Installa dal Marketplace di VS Code](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)
