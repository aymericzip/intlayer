---
createdAt: 2025-08-23
updatedAt: 2025-08-23
title: Introduzione
description: Scopri come funziona Intlayer. Guarda i passaggi che Intlayer utilizza nella tua applicazione. Scopri cosa fanno i diversi pacchetti.
keywords:
  - Introduzione
  - Iniziare
  - Intlayer
  - Applicazione
  - Pacchetti
slugs:
  - doc
  - get-started
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: "Init history"
author:
  name: Aymeric PINEAU
  github: aymericzip
---

# Documentazione di Intlayer

Benvenuto nella documentazione ufficiale di Intlayer! Qui troverai tutto il necessario per integrare, configurare e padroneggiare Intlayer per tutte le tue esigenze di internazionalizzazione (i18n), sia che tu stia lavorando con Next.js, React, Vite, Express o un altro ambiente JavaScript.

## Introduzione

### Cos'è Intlayer?

**Intlayer** è una libreria di internazionalizzazione progettata specificamente per gli sviluppatori JavaScript. Consente la dichiarazione del tuo contenuto ovunque nel tuo codice. Converte la dichiarazione di contenuti multilingue in dizionari strutturati da integrare facilmente nel tuo codice. Utilizzando TypeScript, **Intlayer** rende il tuo sviluppo più robusto ed efficiente.

Intlayer fornisce anche un editor visivo opzionale che ti consente di modificare e gestire facilmente i tuoi contenuti. Questo editor è particolarmente utile per gli sviluppatori che preferiscono un'interfaccia visiva per la gestione dei contenuti, o per i team che generano contenuti senza doversi preoccupare del codice.

### Esempio di utilizzo

```bash
.
└── Components
    └── MyComponent
        ├── index.content.ts
        └── index.tsx
```

```tsx fileName="src/components/MyComponent/index.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const componentContent = {
  key: "component-key",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      es: "Hola Mundo",
      fr: "Bonjour le monde",
      it: "Ciao Mondo",
    }),
  },
} satisfies Dictionary;

export default componentContent;
```

```json fileName="src/components/MyComponent/index.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "component-key",
  "content": {
    "myTranslatedContent": {
      "nodeType": "translation",
      "translation": {
        "en": "Hello World",
        "fr": "Bonjour le monde",
        "es": "Hola Mundo",
        "it": "Ciao Mondo"
      }
    }
  }
}
```

```tsx fileName="src/components/MyComponent/index.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

export const MyComponent: FC = () => {
  const { myTranslatedContent } = useIntlayer("component-key");

  return <span>{myTranslatedContent}</span>;
};
```

### Perché Intlayer rispetto alle alternative?

Rispetto alle principali soluzioni come `next-intl` o `i18next`, Intlayer è una soluzione dotata di ottimizzazioni integrate come:

<AccordionGroup>

<Accordion header="Dimensioni del bundle">

Invece di caricare enormi file JSON nelle tue pagine, carica solo il contenuto necessario. Intlayer aiuta a **ridurre le dimensioni del bundle e della pagina fino al 50%**.

</Accordion>

<Accordion header="Manutenibilità">

Dichiarare il contenuto vicino ai tuoi componenti **facilita la manutenzione** per le applicazioni su larga scala. Puoi duplicare o eliminare una singola cartella di funzionalità senza il carico mentale di dover rivedere tutta l'infrastruttura dei tuoi contenuti. Inoltre, Intlayer è **completamente tipizzato (fully typed)** per garantire l'esattezza dei tuoi contenuti.

</Accordion>

<Accordion header="Agente IA">

La co-locazione dei contenuti **riduce il contesto necessario** dai grandi modelli linguistici (LLM). Intlayer è inoltre fornito di una suite di strumenti, come una **CLI** per testare le traduzioni mancanti, un **[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/lsp.md)**, un **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/mcp_server.md)** e **[competenze degli agenti (agent skills)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/agent_skills.md)**, per rendere l'esperienza dello sviluppatore (DX) ancora più fluida per gli agenti basati su IA.

</Accordion>

<Accordion header="Automazione">

Usa l'automazione per tradurre nella tua pipeline CI/CD usando l'LLM di tua scelta al costo del tuo provider di IA. Intlayer offre anche un **compilatore** per automatizzare l'estrazione dei contenuti, così come una [piattaforma web](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_CMS.md) per aiutarti a **tradurre in background**.

</Accordion>

<Accordion header="Prestazioni">

Connettere enormi file JSON ai componenti può portare a problemi di prestazioni e reattività. Intlayer ottimizza il caricamento dei tuoi contenuti al momento della build.

</Accordion>

<Accordion header="Scalabilità con non-sviluppatori">

Molto più che una semplice soluzione i18n, Intlayer fornisce un **[editor visivo](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_visual_editor.md) self-hosted** e un **[CMS completo](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_CMS.md)** per aiutarti a gestire i tuoi contenuti multilingue in **tempo reale**, rendendo perfetta la collaborazione con traduttori, copywriter e altri membri del team. I contenuti possono essere archiviati localmente e/o in remoto.

</Accordion>
</AccordionGroup>

## Caratteristiche principali

Intlayer offre una varietà di funzionalità su misura per soddisfare le esigenze dello sviluppo web moderno. Di seguito sono elencate le funzionalità chiave, con link alla documentazione dettagliata per ciascuna:

- **Supporto all'internazionalizzazione**: Migliora la portata globale della tua applicazione con il supporto integrato per l'internazionalizzazione.
- **Editor Visivo**: Migliora il tuo flusso di lavoro di sviluppo con i plugin dell'editor progettati per Intlayer. Dai un'occhiata alla [Guida all'Editor Visivo](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_visual_editor.md).
- **Flessibilità di configurazione**: Personalizza la tua configurazione con ampie opzioni dettagliate nella [Guida alla configurazione](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/configuration.md).
- **Strumenti CLI avanzati**: Gestisci i tuoi progetti in modo efficiente utilizzando l'interfaccia a riga di comando di Intlayer. Esplora le capacità nella [Documentazione degli strumenti CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/cli/index.md).

## Concetti Base

### Dizionario

Organizza i tuoi contenuti multilingue vicino al tuo codice per mantenere tutto coerente e manutenibile.

- **[Iniziare](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dictionary/content_file.md)**  
  Impara le basi per dichiarare i tuoi contenuti in Intlayer.

- **[Traduzione](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dictionary/translation.md)**  
  Comprendi come le traduzioni vengono generate, memorizzate e utilizzate nella tua applicazione.

- **[Enumerazione](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dictionary/enumeration.md)**  
  Gestisci facilmente set di dati ripetuti o fissi in varie lingue.

- **[Condizione](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dictionary/condition.md)**  
  Impara come utilizzare la logica condizionale in Intlayer per creare contenuti dinamici.

- **[Inserimento](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dictionary/insertion.md)**
  Scopri come inserire valori in una stringa utilizzando i segnaposto di inserimento.

- **[Recupero tramite Funzioni](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dictionary/function_fetching.md)**  
  Scopri come recuperare dinamicamente contenuti con logica personalizzata per adattarli al flusso di lavoro del tuo progetto.

- **[Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dictionary/markdown.md)**  
  Impara a utilizzare Markdown in Intlayer per creare contenuti arricchiti.

- **[File incorporati](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dictionary/file.md)**  
  Scopri come incorporare file esterni in Intlayer per utilizzarli nell'editor dei contenuti.

- **[Annidamento](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dictionary/nesting.md)**  
  Comprendi come annidare contenuti in Intlayer per creare strutture complesse.

### Ambienti e Integrazioni

Abbiamo costruito Intlayer pensando alla flessibilità, offrendo un'integrazione fluida con i framework e gli strumenti di build più popolari:

- **[Intlayer con Next.js 16](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_with_nextjs_16.md)**
- **[Intlayer con Next.js 15](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_with_nextjs_15.md)**
- **[Intlayer con Next.js 14 (App Router)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_with_nextjs_14.md)**
- **[Intlayer con Next.js Page Router](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_with_nextjs_page_router.md)**
- **[Intlayer con React CRA](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_with_create_react_app.md)**
- **[Intlayer con Vite + React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_with_vite+react.md)**
- **[Intlayer con React Router v7](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_with_react_router_v7.md)**
- **[Intlayer con Tanstack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_with_tanstack.md)**
- **[Intlayer con React Native ed Expo](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_with_react_native+expo.md)**
- **[Intlayer con Lynx e React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_with_lynx+react.md)**
- **[Intlayer con Vite + Preact](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_with_vite+preact.md)**
- **[Intlayer con Vite + Vue](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_with_vite+vue.md)**
- **[Intlayer con Nuxt](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_with_nuxt.md)**
- **[Intlayer con Vite + Svelte](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_with_vite+svelte.md)**
- **[Intlayer con SvelteKit](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_with_svelte_kit.md)**
- **[Intlayer con Express](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_with_express.md)**
- **[Intlayer con NestJS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_with_nestjs.md)**
- **[Intlayer con Hono](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_with_hono.md)**
- **[Intlayer con Angular](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_with_angular_21.md)**

Ogni guida all'integrazione include le best practice per utilizzare le funzionalità di Intlayer, come il **server-side rendering**, il **dynamic routing** o il **client-side rendering**, così puoi mantenere un'applicazione veloce, SEO-friendly e altamente scalabile.

## Contribuire e Feedback

Apprezziamo il potere dell'open source e dello sviluppo guidato dalla comunità. Se desideri proporre miglioramenti, aggiungere una nuova guida o correggere eventuali problemi nella nostra documentazione, sentiti libero di inviare una Pull Request o di aprire una issue sul nostro [repository GitHub](https://github.com/aymericzip/intlayer/blob/main/docs/docs).

**Pronto a tradurre la tua applicazione in modo più rapido ed efficiente?** Immergiti nella nostra documentazione per iniziare a usare Intlayer oggi. Scopri un approccio robusto e semplificato all'internazionalizzazione che mantiene i tuoi contenuti organizzati e il tuo team più produttivo.
