# Intlayer: Un modo più vicino per tradurre la tua applicazione

**Intlayer** è una libreria di internazionalizzazione progettata specificamente per gli sviluppatori JavaScript. Consente la dichiarazione dei tuoi contenuti ovunque nel tuo codice. Converte la dichiarazione di contenuti multilingue in dizionari strutturati da integrare facilmente nel tuo codice. Utilizzando TypeScript, **Intlayer** rende il tuo sviluppo più solido ed efficiente.

## Esempio di utilizzo

```bash
.
├── Component1
│   ├── index.content.ts
│   └── index.tsx
└── Component2
    ├── index.content.ts
    └── index.tsx
```

```tsx
// ./Component1/index.content.ts

import { type DeclarationContent, t } from "intlayer";

const component1Content = {
  key: "component1",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
  },
} satisfies DeclarationContent;

export default component1Content;
```

```tsx
// ./Component1/index.tsx

import { useIntlayer } from "react-intlayer";

export const Component1 = () => {
  const { myTranslatedContent } = useIntlayer("component1");

  return <span>{myTranslatedContent}</span>;
};
```

## Perché scegliere Intlayer?

- **Gestione dei contenuti potenziata da JavaScript**: Sfrutta la flessibilità di JavaScript per definire e gestire i tuoi contenuti in modo efficiente.
- **Ambiente sicuro per i tipi**: Sfrutta TypeScript per garantire che tutte le tue definizioni di contenuto siano precise e prive di errori.
- **File di contenuto integrati**: Tieni le tue traduzioni vicine ai loro rispettivi componenti, migliorando la manutenibilità e la chiarezza.
- **Impostazione semplificata**: Inizia e funzionare rapidamente con una configurazione minima, particolarmente ottimizzata per i progetti Next.js.
- **Supporto per componenti server**: Perfettamente adatto per i componenti server di Next.js, garantendo un rendering fluido lato server.
- **Routing avanzato**: Supporto completo per il routing delle app Next.js, adattandosi senza problemi a strutture di applicazioni complesse.
- **Interoperabilità**: Consente l'interoperabilità di i18next. (beta)
