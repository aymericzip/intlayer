---
createdAt: 2024-12-24
updatedAt: 2025-10-29
title: Come automatizzare le tue traduzioni JSON di i18next usando Intlayer
description: Automatizza le tue traduzioni JSON con Intlayer e i18next per una migliore internazionalizzazione nelle applicazioni JavaScript.
keywords:
  - Intlayer
  - i18next
  - Internazionalizzazione
  - i18n
  - Localizzazione
  - Traduzione
  - React
  - Next.js
  - JavaScript
  - TypeScript
  - Migrazione
  - Integrazione
slugs:
  - blog
  - intlayer-with-i18next
history:
  - version: 7.0.0
    date: 2025-10-29
    changes: Modifica al plugin syncJSON
---

# Come automatizzare le tue traduzioni JSON di i18next usando Intlayer

## Cos'è Intlayer?

**Intlayer** è una libreria di internazionalizzazione innovativa e open-source progettata per superare le limitazioni delle soluzioni i18n tradizionali. Offre un approccio moderno alla gestione dei contenuti nelle applicazioni JavaScript.

Consulta un confronto concreto con i18next nel nostro post sul blog [next-i18next vs. next-intl vs. Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/it/next-i18next_vs_next-intl_vs_intlayer.md).

## Perché combinare Intlayer con i18next?

Sebbene Intlayer offra una soluzione i18n autonoma eccellente (vedi la nostra [guida all'integrazione con Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_with_nextjs_16.md)), potresti volerlo combinare con i18next per diversi motivi:

1. **Codice esistente**: Hai un'implementazione consolidata di i18next e desideri migrare gradualmente alla migliore esperienza sviluppatore offerta da Intlayer.
2. **Requisiti legacy**: Il tuo progetto richiede compatibilità con plugin o flussi di lavoro i18next esistenti.
3. **Familiarità del team**: Il tuo team è abituato a i18next ma desidera una migliore gestione dei contenuti.

**Per questo, Intlayer può essere implementato come un adattatore per i18next per aiutarti ad automatizzare le traduzioni JSON nella CLI o nelle pipeline CI/CD, testare le tue traduzioni e altro ancora.**

Questa guida ti mostra come sfruttare il sistema superiore di dichiarazione dei contenuti di Intlayer mantenendo la compatibilità con i18next.

## Indice

<TOC/>

## Guida passo-passo per configurare Intlayer con i18next

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
- **@intlayer/sync-json-plugin**: Plugin per esportare le dichiarazioni di contenuto di Intlayer in formato JSON compatibile con i18next

### Passo 2: Implementa il plugin Intlayer per incapsulare il JSON

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
      source: ({ key, locale }) => `./intl/messages/${locale}/${key}.json`,
    }),
  ],
};

export default config;
```

Il plugin `syncJSON` incapsulerà automaticamente il JSON. Leggerà e scriverà i file JSON senza modificare l'architettura del contenuto.

Se vuoi far coesistere quel JSON con i file di dichiarazione dei contenuti di intlayer (file `.content`), Intlayer procederà in questo modo:

    1. caricherà sia i file JSON che i file di dichiarazione dei contenuti e li trasformerà in un dizionario intlayer.
    2. se ci sono conflitti tra il JSON e i file di dichiarazione del contenuto, Intlayer procederà alla fusione di tutti questi dizionari. A seconda della priorità dei plugin e di quella del file di dichiarazione del contenuto (tutti configurabili).

Se vengono effettuate modifiche utilizzando la CLI per tradurre il JSON, o utilizzando il CMS, Intlayer aggiornerà il file JSON con le nuove traduzioni.

## Configurazione Git

Si consiglia di ignorare i file Intlayer generati automaticamente:

```plaintext fileName=".gitignore"
# Ignora i file generati da Intlayer
.intlayer
```

Questi file possono essere rigenerati durante il processo di build e non è necessario includerli nel controllo di versione.

### Estensione VS Code

Per migliorare l'esperienza dello sviluppatore, installa l'**Estensione ufficiale Intlayer per VS Code**:

[Installa dal Marketplace di VS Code](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

[Installa dal Marketplace di VS Code](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)
