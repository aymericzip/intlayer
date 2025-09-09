---
createdAt: 2025-09-09
updatedAt: 2025-09-09
title: Traduci il tuo backend Nest (i18n)
description: Scopri come rendere il tuo backend vite multilingue. Segui la documentazione per internazionalizzare (i18n) e tradurlo.
keywords:
  - Internazionalizzazione
  - Documentazione
  - Intlayer
  - NestJS
  - JavaScript
  - Backend
slugs:
  - doc
  - environment
  - nest
applicationTemplate: https://github.com/AydinTheFirst/nestjs-intlayer
author: AydinTheFirst
---

# Iniziare a internazionalizzare (i18n) con Intlayer e NestJS

`express-intlayer` è un potente middleware di internazionalizzazione (i18n) per applicazioni Express, progettato per rendere i tuoi servizi backend accessibili a livello globale fornendo risposte localizzate in base alle preferenze del client. Poiché NestJS è costruito sopra Express, puoi integrare senza problemi `express-intlayer` nelle tue applicazioni NestJS per gestire efficacemente contenuti multilingue.

## Perché internazionalizzare il tuo backend?

Internazionalizzare il tuo backend è essenziale per servire efficacemente un pubblico globale. Permette alla tua applicazione di fornire contenuti e messaggi nella lingua preferita di ogni utente. Questa capacità migliora l'esperienza utente e amplia la portata della tua applicazione rendendola più accessibile e rilevante per persone di diversi contesti linguistici.

### Casi d'Uso Pratici

- **Visualizzare gli Errori del Backend nella Lingua dell'Utente**: Quando si verifica un errore, mostrare i messaggi nella lingua madre dell'utente migliora la comprensione e riduce la frustrazione. Questo è particolarmente utile per messaggi di errore dinamici che potrebbero essere mostrati in componenti front-end come toast o modali.

- **Recuperare Contenuti Multilingue**: Per applicazioni che estraggono contenuti da un database, l'internazionalizzazione garantisce che tu possa fornire questi contenuti in più lingue. Questo è cruciale per piattaforme come siti di e-commerce o sistemi di gestione dei contenuti che devono mostrare descrizioni di prodotti, articoli e altri contenuti nella lingua preferita dall'utente.

- **Invio di Email Multilingue**: Che si tratti di email transazionali, campagne di marketing o notifiche, inviare email nella lingua del destinatario può aumentare significativamente l'engagement e l'efficacia.

- **Notifiche Push Multilingue**: Per le applicazioni mobili, inviare notifiche push nella lingua preferita dell'utente può migliorare l'interazione e la fidelizzazione. Questo tocco personale può rendere le notifiche più rilevanti e azionabili.

- **Altre Comunicazioni**: Qualsiasi forma di comunicazione dal backend, come messaggi SMS, avvisi di sistema o aggiornamenti dell'interfaccia utente, beneficia di essere nella lingua dell'utente, garantendo chiarezza e migliorando l'esperienza complessiva dell'utente.

Internazionalizzando il backend, la tua applicazione non solo rispetta le differenze culturali, ma si allinea anche meglio alle esigenze del mercato globale, rendendolo un passaggio chiave per scalare i tuoi servizi a livello mondiale.

## Iniziare

### Creare un nuovo progetto NestJS

```bash packageManager="npm"
npm install -g @nestjs/cli
nest new my-nest-app
```

### Installazione

Per iniziare a usare `express-intlayer`, installa il pacchetto usando npm:

```bash packageManager="npm"
npm install intlayer express-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer express-intlayer
```

```bash packageManager="yarn"
yarn add intlayer express-intlayer
```

### Configurare tsconfig.json

Per utilizzare Intlayer con TypeScript, assicurati che il tuo `tsconfig.json` sia configurato per supportare i moduli ES. Puoi farlo impostando le opzioni `module` e `moduleResolution` su `nodenext`.

```json5 fileName="tsconfig.json"
{
  compilerOptions: {
    module: "nodenext",
    moduleResolution: "nodenext",
    // ... altre opzioni
  },
}
```

### Configurazione

Configura le impostazioni di internazionalizzazione creando un file `intlayer.config.ts` nella radice del tuo progetto:

```typescript fileName="intlayer.config.ts"  codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

### Dichiara il tuo contenuto

Crea e gestisci le tue dichiarazioni di contenuto per memorizzare le traduzioni:

```typescript fileName="src/app.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const appContent: Dictionary = {
  key: "app",
  content: {
    greet: t({
      en: "Hello World!",
      fr: "Bonjour le monde !",
      es: "¡Hola Mundo!",
    }),
  },
};

export default appContent;
```

> Le tue dichiarazioni di contenuto possono essere definite ovunque nella tua applicazione purché siano incluse nella directory `contentDir` (di default, `./src`). E corrispondano all'estensione del file di dichiarazione del contenuto (di default, `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`).

> Per maggiori dettagli, consulta la [documentazione sulla dichiarazione del contenuto](/doc/concept/content).

### Configurazione del Middleware Express

Integra il middleware `express-intlayer` nella tua applicazione NestJS per gestire l'internazionalizzazione:

```typescript fileName="src/app.module.ts" codeFormat="typescript"
import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { intlayer } from "express-intlayer";

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(intlayer()).forRoutes("*"); // Applica a tutte le rotte
  }
}
```

### Usa le Traduzioni nei Tuoi Servizi o Controller

Ora puoi usare la funzione `getIntlayer` per accedere alle traduzioni nei tuoi servizi o controller:

```typescript fileName="src/app.service.ts" codeFormat="typescript"
import { Injectable } from "@nestjs/common";
import { getIntlayer } from "express-intlayer";

@Injectable()
export class AppService {
  getHello(): string {
    return getIntlayer("app").greet;
  }
}
```

### Compatibilità

`express-intlayer` è completamente compatibile con:

- [`react-intlayer`](/doc/packages/react-intlayer) per applicazioni React
- [`next-intlayer`](/doc/packages/next-intlayer) per applicazioni Next.js
- [`vite-intlayer`](/doc/packages/vite-intlayer) per applicazioni Vite

Funziona inoltre perfettamente con qualsiasi soluzione di internazionalizzazione in diversi ambienti, inclusi browser e richieste API. Puoi personalizzare il middleware per rilevare la locale tramite header o cookie:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... Altre opzioni di configurazione
  middleware: {
    headerName: "my-locale-header",
    cookieName: "my-locale-cookie",
  },
};

export default config;
```

Per impostazione predefinita, `express-intlayer` interpreterà l'intestazione `Accept-Language` per determinare la lingua preferita del client.

> Per maggiori informazioni sulla configurazione e argomenti avanzati, visita la nostra [documentazione](/doc/concept/configuration).

### Configurare TypeScript

`express-intlayer` sfrutta le potenti capacità di TypeScript per migliorare il processo di internazionalizzazione. Il typing statico di TypeScript garantisce che ogni chiave di traduzione sia considerata, riducendo il rischio di traduzioni mancanti e migliorando la manutenibilità.

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png)

![alt text](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png)

Assicurati che i tipi generati automaticamente (di default in ./types/intlayer.d.ts) siano inclusi nel tuo file tsconfig.json.

```json5 fileName="tsconfig.json"
{
  // ... Le tue configurazioni TypeScript esistenti
  include: [
    // ... Le tue configurazioni TypeScript esistenti
    ".intlayer/**/*.ts", // Includi i tipi generati automaticamente
  ],
}
```

### Estensione VS Code

Per migliorare la tua esperienza di sviluppo con Intlayer, puoi installare la **Estensione ufficiale Intlayer per VS Code**.

[Installa dal Marketplace di VS Code](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Questa estensione offre:

- **Completamento automatico** per le chiavi di traduzione.
- **Rilevamento errori in tempo reale** per traduzioni mancanti.
- **Anteprime inline** dei contenuti tradotti.
- **Azioni rapide** per creare e aggiornare facilmente le traduzioni.

Per maggiori dettagli su come utilizzare l'estensione, consulta la [documentazione dell'Estensione Intlayer per VS Code](https://intlayer.org/doc/vs-code-extension).

### Configurazione Git

Si consiglia di ignorare i file generati da Intlayer. Questo ti permette di evitare di committarli nel tuo repository Git.

Per fare ciò, puoi aggiungere le seguenti istruzioni al tuo file `.gitignore`:

```plaintext fileName=".gitignore"
# Ignora i file generati da Intlayer
.intlayer
```

## Cronologia della Documentazione

| Versione | Data       | Modifiche               |
| -------- | ---------- | ----------------------- |
| 5.8.0    | 2025-09-09 | Documentazione iniziale |
