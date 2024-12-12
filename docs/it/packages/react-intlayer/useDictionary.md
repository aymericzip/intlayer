# Integrazione React: Documentazione del Hook `useDictionary`

Questa sezione fornisce indicazioni dettagliate su come utilizzare l'hook `useDictionary` all'interno delle applicazioni React, consentendo una gestione efficiente dei contenuti localizzati senza un editor visivo.

## Importazione di `useDictionary` in React

L'hook `useDictionary` può essere integrato nelle applicazioni React importandolo in base al contesto:

- **Componente Client:**

  ```javascript
  import { useDictionary } from "react-intlayer"; // Utilizzato nei componenti React lato client
  ```

- **Componente Server:**

  ```javascript
  import { useDictionary } from "react-intlayer/server"; // Utilizzato nei componenti React lato server
  ```

## Parametri

L'hook accetta due parametri:

1. **`dictionary`**: Un oggetto dizionario dichiarato contenente contenuti localizzati per chiavi specifiche.
2. **`locale`** (opzionale): La localizzazione desiderata. Predefinita alla localizzazione corrente se non specificata.

## Dichiarazione dei Contenuti

Tutti gli oggetti dizionario devono essere dichiarati in file di contenuti strutturati per garantire la sicurezza dei tipi e prevenire errori a runtime. Puoi trovare le istruzioni di configurazione [qui](https://github.com/aymericzip/intlayer/blob/main/docs/it/content_declaration/get_started.md). Ecco un esempio di dichiarazione dei contenuti:

```typescript
// ./component.content.ts

import { t, type DeclarationContent } from "intlayer";

const clientComponentExampleContent = {
  key: "client-component-example",
  content: {
    title: t({
      en: "Client Component Example",
      fr: "Exemple de composant client",
      es: "Ejemplo de componente cliente",
    }),
    content: t({
      en: "This is the content of a client component example",
      fr: "Ceci est le contenu d'un exemple de composant client",
      es: "Este es el contenido de un ejemplo de componente cliente",
    }),
  },
} satisfies DeclarationContent;

export default clientComponentExampleContent;
```

## Esempio di Utilizzo in React

Di seguito è riportato un esempio di come utilizzare l'hook `useDictionary` in un componente React:

```tsx
// ./ClientComponentExample.tsx

import { useDictionary } from "react-intlayer";
import clientComponentExampleContent from "./component.content";

const ClientComponentExample = () => {
  const { title, content } = useDictionary(clientComponentExampleContent);

  return (
    <div>
      <h1>{title}</h1>
      <p>{content}</p>
    </div>
  );
};

export default ClientComponentExample;
```

## Integrazione Server

Se utilizzi l'hook `useDictionary` al di fuori di `IntlayerProvider`, la localizzazione deve essere fornita esplicitamente come parametro durante il rendering del componente:

```tsx
import { useDictionary } from "react-intlayer/server";
import clientComponentExampleContent from "./component.content";

const ServerComponentExample = ({ locale }: { locale: string }) => {
  const { content } = useDictionary(clientComponentExampleContent, locale);

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.content}</p>
    </div>
  );
};

export default ServerComponentExample;
```

## Note sugli Attributi

A differenza delle integrazioni che utilizzano editor visivi, attributi come `buttonTitle.value` non si applicano qui. Invece, accedi direttamente alle stringhe localizzate come dichiarato nei tuoi contenuti.

```tsx
<button title={content.title}>{content.content}</button>
```

## Suggerimenti Aggiuntivi

- **Sicurezza dei Tipi**: Utilizza sempre `DeclarationContent` per definire i tuoi dizionari per garantire la sicurezza dei tipi.
- **Aggiornamenti della Localizzazione**: Quando aggiorni i contenuti, assicurati che tutte le localizzazioni siano coerenti per evitare traduzioni mancanti.

Questa documentazione si concentra sull'integrazione dell'hook `useDictionary`, fornendo un approccio semplificato alla gestione dei contenuti localizzati senza fare affidamento sulle funzionalità degli editor visivi.
