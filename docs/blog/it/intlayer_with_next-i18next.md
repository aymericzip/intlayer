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
history:
  - version: 7.0.0
    date: 2025-10-29
    changes: Cambio al plugin syncJSON e riscrittura completa
---

# Internazionalizzazione (i18n) in Next.js con next-i18next e Intlayer

## Indice

<TOC/>

## Cos'è next-i18next?

**next-i18next** è uno dei framework di internazionalizzazione (i18n) più popolari per applicazioni Next.js. Costruito sopra il potente ecosistema **i18next**, offre una soluzione completa per la gestione delle traduzioni, della localizzazione e del cambio lingua nei progetti Next.js.

Tuttavia, next-i18next presenta alcune sfide:

- **Configurazione complessa**: Configurare next-i18next richiede più file di configurazione e un'attenta impostazione delle istanze i18n sia lato server che lato client.
- **Traduzioni sparse**: I file di traduzione sono tipicamente archiviati in directory separate dai componenti, rendendo più difficile mantenere la coerenza.
- **Gestione manuale dei namespace**: Gli sviluppatori devono gestire manualmente i namespace e assicurarsi del corretto caricamento delle risorse di traduzione.
- **Sicurezza dei tipi limitata**: Il supporto a TypeScript richiede una configurazione aggiuntiva e non fornisce una generazione automatica dei tipi per le traduzioni.

## Cos'è Intlayer?

**Intlayer** è una libreria di internazionalizzazione innovativa e open-source progettata per superare le limitazioni delle soluzioni i18n tradizionali. Offre un approccio moderno alla gestione dei contenuti nelle applicazioni Next.js.

Consulta un confronto concreto con next-intl nel nostro post sul blog [next-i18next vs. next-intl vs. Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/it/next-i18next_vs_next-intl_vs_intlayer.md).

## Perché combinare Intlayer con next-i18next?

Mentre Intlayer offre una soluzione i18n autonoma eccellente (consulta la nostra [guida all'integrazione con Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_with_nextjs_16.md)), potresti volerla combinare con next-i18next per diversi motivi:

1. **Codice esistente**: Hai un'implementazione consolidata di next-i18next e desideri migrare gradualmente verso la migliore esperienza sviluppatore offerta da Intlayer.
2. **Requisiti legacy**: Il tuo progetto richiede compatibilità con plugin o flussi di lavoro i18next esistenti.
3. **Familiarità del team**: Il tuo team è abituato a next-i18next ma desidera una migliore gestione dei contenuti.

**Per questo, Intlayer può essere implementato come un adattatore per next-i18next per aiutarti ad automatizzare le tue traduzioni JSON in CLI o pipeline CI/CD, testare le tue traduzioni e altro ancora.**

Questa guida ti mostra come sfruttare il sistema superiore di dichiarazione dei contenuti di Intlayer mantenendo la compatibilità con next-i18next.

---

## Guida passo-passo per configurare Intlayer con next-i18next

### Passo 1: Installa le dipendenze

Installa i pacchetti necessari usando il tuo gestore di pacchetti preferito:

```bash packageManager="npm"
npm install intlayer @intlayer/sync-json-plugin
```

```bash packageManager="pnpm"
pnpm add intlayer @intlayer/sync-json-plugin
```

```bash packageManager="yarn"
yarn add intlayer @intlayer/sync-json-plugin
```

**Spiegazioni dei pacchetti:**

- **intlayer**: Libreria core per la dichiarazione e gestione dei contenuti
- **next-intlayer**: Layer di integrazione per Next.js con plugin di build
- **i18next**: Framework core per l'internazionalizzazione
- **next-i18next**: Wrapper Next.js per i18next
- **i18next-resources-to-backend**: Caricamento dinamico delle risorse per i18next
- **@intlayer/sync-json-plugin**: Plugin per sincronizzare le dichiarazioni di contenuto Intlayer nel formato JSON di i18next

### Passo 2: Implementare il plugin Intlayer per incapsulare il JSON

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
      source: ({ key, locale }) => `./messages/${locale}/${key}.json`,
    }),
  ],
};

export default config;
```

Il plugin `syncJSON` incapsulerà automaticamente il JSON. Leggerà e scriverà i file JSON senza modificare l'architettura del contenuto.

Se vuoi far coesistere quel JSON con i file di dichiarazione dei contenuti di intlayer (file `.content`), Intlayer procederà in questo modo:

    1. caricherà sia i file JSON che i file di dichiarazione dei contenuti e li trasformerà in un dizionario intlayer.
    2. se ci sono conflitti tra i file JSON e i file di dichiarazione dei contenuti, Intlayer procederà alla fusione di tutti questi dizionari. A seconda della priorità dei plugin e di quella del file di dichiarazione dei contenuti (tutti configurabili).

Se vengono apportate modifiche utilizzando la CLI per tradurre il JSON, o utilizzando il CMS, Intlayer aggiornerà il file JSON con le nuove traduzioni.

---

## Configurazione Git

Escludi i file generati dal controllo versione:

```plaintext fileName=".gitignore"
# Ignora i file generati da Intlayer
.intlayer
intl
```

Questi file vengono rigenerati automaticamente durante il processo di build e non devono essere inseriti nel tuo repository.

### Estensione VS Code

Per migliorare l'esperienza dello sviluppatore, installa la **Estensione ufficiale Intlayer per VS Code**:

[Installa dal Marketplace di VS Code](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

[Installa dal Marketplace di VS Code](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)
