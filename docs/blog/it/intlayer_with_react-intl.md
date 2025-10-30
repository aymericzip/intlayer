---
createdAt: 2025-01-02
updatedAt: 2025-10-29
title: Come automatizzare le traduzioni JSON di react-intl usando Intlayer
description: Automatizza le tue traduzioni JSON con Intlayer e react-intl per una migliore internazionalizzazione nelle applicazioni React.
keywords:
  - react-intl
  - Intlayer
  - Internazionalizzazione
  - Blog
  - i18n
  - JavaScript
  - React
  - FormatJS
slugs:
  - blog
  - intlayer-with-react-intl
history:
  - version: 7.0.0
    date: 2025-10-29
    changes: Cambio al plugin syncJSON
---

# Come automatizzare le traduzioni JSON di react-intl usando Intlayer

## Cos'è Intlayer?

**Intlayer** è una libreria di internazionalizzazione innovativa e open-source progettata per superare le limitazioni delle soluzioni i18n tradizionali. Offre un approccio moderno alla gestione dei contenuti nelle applicazioni React.

Consulta un confronto concreto con react-intl nel nostro post del blog [react-i18next vs. react-intl vs. Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/it/react-i18next_vs_react-intl_vs_intlayer.md).

## Perché combinare Intlayer con react-intl?

Sebbene Intlayer fornisca una soluzione i18n autonoma eccellente (vedi la nostra [guida all'integrazione con React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_with_vite+react.md)), potresti volerlo combinare con react-intl per diversi motivi:

1. **Codice esistente**: Hai un'implementazione consolidata di react-intl e vuoi migrare gradualmente alla migliore esperienza sviluppatore offerta da Intlayer.
2. **Requisiti legacy**: Il tuo progetto richiede compatibilità con plugin o flussi di lavoro esistenti di react-intl.
3. **Familiarità del team**: Il tuo team è abituato a react-intl ma desidera una migliore gestione dei contenuti.

**Per questo, Intlayer può essere implementato come un adattatore per react-intl per aiutarti ad automatizzare le traduzioni JSON nella CLI o nelle pipeline CI/CD, testare le traduzioni e altro ancora.**

Questa guida ti mostra come sfruttare il sistema superiore di dichiarazione dei contenuti di Intlayer mantenendo la compatibilità con react-intl.

## Indice

<TOC/>

## Guida passo-passo per configurare Intlayer con react-intl

### Passo 1: Installa le dipendenze

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

- **intlayer**: Libreria core per la gestione dell'internazionalizzazione, dichiarazione dei contenuti e build
- **@intlayer/sync-json-plugin**: Plugin per esportare le dichiarazioni di contenuto di Intlayer in formato JSON compatibile con react-intl

### Passo 2: Implementa il plugin Intlayer per incapsulare il JSON

Crea un file di configurazione Intlayer per definire le tue localizzazioni supportate:

**Se vuoi anche esportare dizionari JSON per react-intl**, aggiungi il plugin `syncJSON`:

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
      source: ({ key, locale }) => `./intl/messages/${locale}/${key}.json`,
    }),
  ],
};

export default config;
```

Il plugin `syncJSON` incapsulerà automaticamente il JSON. Leggerà e scriverà i file JSON senza modificare l'architettura del contenuto.

Se vuoi far coesistere quel JSON con i file di dichiarazione dei contenuti di Intlayer (file `.content`), Intlayer procederà in questo modo:

    1. caricherà sia i file JSON che quelli di dichiarazione dei contenuti e li trasformerà in un dizionario Intlayer.
    2. se ci sono conflitti tra i file JSON e i file di dichiarazione del contenuto, Intlayer procederà alla fusione di tutti questi dizionari. A seconda della priorità dei plugin e di quella del file di dichiarazione del contenuto (tutti configurabili).

Se vengono apportate modifiche utilizzando la CLI per tradurre il JSON, o utilizzando il CMS, Intlayer aggiornerà il file JSON con le nuove traduzioni.

Per maggiori dettagli sul plugin `syncJSON`, si prega di fare riferimento alla [documentazione del plugin syncJSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/plugins/sync-json.md).

## Configurazione Git

Si consiglia di ignorare i file Intlayer generati automaticamente:

```plaintext fileName=".gitignore"
# Ignora i file generati da Intlayer
.intlayer
```

Questi file possono essere rigenerati durante il processo di build e non è necessario che vengano inseriti nel controllo di versione.

### Estensione VS Code

Per migliorare l'esperienza dello sviluppatore, installa l'**Estensione ufficiale Intlayer per VS Code**:

[Installa dal Marketplace di VS Code](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)
