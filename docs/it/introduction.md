# Intlayer Documentazione

Benvenuto nella Documentazione di Intlayer. Questa guida fornisce una panoramica di Intlayer, delle sue principali caratteristiche e di come utilizzare efficacemente questi documenti per migliorare la tua esperienza di sviluppo.

## Introduzione

### Cos'è Intlayer?

**Intlayer** è una libreria di internazionalizzazione progettata specificamente per sviluppatori JavaScript. Permette di dichiarare il tuo contenuto ovunque nel tuo codice. Converte la dichiarazione di contenuti multilingue in dizionari strutturati per essere integrati facilmente nel tuo codice. Utilizzando TypeScript, **Intlayer** rende il tuo sviluppo più forte ed efficiente.

Intlayer offre anche un editor visivo opzionale che consente di modificare e gestire facilmente i tuoi contenuti. Questo editor è particolarmente utile per gli sviluppatori che preferiscono un'interfaccia visiva per la gestione dei contenuti, o per i team che generano contenuti senza doversi preoccupare del codice.

## Esempio di utilizzo

```bash
.
├── ClientComponent
│   ├── index.content.ts
│   └── index.tsx
└── ServerComponent
    ├── index.content.ts
    └── index.tsx
```

```tsx
// ./ClientComponent/index.content.ts

import { type DeclarationContent, t } from "intlayer";

const clientComponentContent = {
  key: "client-component",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
  },
} satisfies DeclarationContent;

export default clientComponentContent;
```

```tsx
// ./ClientComponent/index.tsx
"use client";

import { useIntlayer } from "next-intlayer";

export const ClientComponent = () => {
  const { myTranslatedContent } = useIntlayer("client-component");

  return <span>{myTranslatedContent}</span>;
};
```

### Caratteristiche Principali

Intlayer offre una varietà di funzionalità progettate per soddisfare le esigenze dello sviluppo web moderno. Di seguito sono riportate le caratteristiche chiave, con collegamenti alla documentazione dettagliata per ciascuna:

- **Supporto per l'internazionalizzazione**: Incrementa la portata globale della tua applicazione con il supporto integrato per l'internazionalizzazione.
- **Editor Visivo**: Migliora il tuo flusso di lavoro di sviluppo con plugin per editor progettati per Intlayer. Dai un'occhiata alla [Guida all'Editor Visivo](https://github.com/aymericzip/intlayer/blob/main/docs/it/intlayer_editor.md).
- **Flessibilità di Configurazione**: Personalizza la tua configurazione con ampie opzioni dettagliate nella [Guida alla Configurazione](https://github.com/aymericzip/intlayer/blob/main/docs/it/configuration.md).
- **Strumenti CLI Avanzati**: Gestisci i tuoi progetti in modo efficiente utilizzando l'interfaccia a riga di comando di Intlayer. Esplora le capacità nella [Documentazione degli Strumenti CLI](https://github.com/aymericzip/intlayer/blob/main/docs/it/intlayer_cli.md).
- **Compatibilità con i18n**: Intlayer funziona senza problemi con altre librerie di internazionalizzazione. Dai un'occhiata alla [Guida a i18n](https://github.com/aymericzip/intlayer/blob/main/docs/it/intlayer_with_i18next.md) per ulteriori informazioni.

### Piattaforme Supportate

Intlayer è progettato per funzionare senza problemi con applicazioni Next.js e React. Supporta anche Vite e Create React App.

- **Integrazione con Next.js**: Utilizza la potenza di Next.js all'interno di Intlayer per il rendering lato server e la generazione di siti statici. I dettagli sono disponibili nella nostra [Guida all'Integrazione di Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/it/intlayer_with_nextjs_15.md).
- **Integrazione con Vite e React**: Sfrutta Vite all'interno di Intlayer per il rendering lato server e la generazione di siti statici. I dettagli sono disponibili nella nostra [Guida all'Integrazione di Vite e React](https://github.com/aymericzip/intlayer/blob/main/docs/it/intlayer_with_vite+react.md).
- **Integrazione con Create React App**: Utilizza la potenza di Create React App all'interno di Intlayer per il rendering lato server e la generazione di siti statici. I dettagli sono disponibili nella nostra [Guida all'Integrazione di Create React App](https://github.com/aymericzip/intlayer/blob/main/docs/it/intlayer_with_create_react_app.md).

### Come Utilizzare Questa Documentazione

Per ottenere il massimo da questa documentazione:

1. **Naviga alle Sezioni Rilevanti**: Usa i link forniti sopra per andare direttamente alle sezioni che rispondono alle tue esigenze.
2. **Esempi Interattivi**: Dove disponibile, utilizza esempi interattivi per vedere come funzionano le funzionalità in tempo reale.
3. **Feedback e Contributi**: Il tuo feedback è prezioso. Se hai suggerimenti o correzioni, ti preghiamo di considerare di contribuire alla documentazione.
