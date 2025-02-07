# Markdown / Contenuto Rich Text

## Come Funziona Markdown

Intlayer supporta il contenuto rich text definito utilizzando la sintassi Markdown. Questo è ottenuto tramite la funzione `md`, che converte una stringa Markdown in un formato gestibile da Intlayer. Utilizzando Markdown, puoi facilmente scrivere e mantenere contenuti con formattazione avanzata, come blog, articoli e altro.

[Il Visual editor di Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/it/intlayer_visual_editor.md) e [Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/it/intlayer_CMS.md) supportano entrambi la gestione del contenuto Markdown.

Quando integrato con un'applicazione React, puoi utilizzare un provider di rendering Markdown (come [`markdown-to-jsx`](https://www.npmjs.com/package/markdown-to-jsx)) per rendere il contenuto Markdown in HTML. Questo consente di scrivere il contenuto in Markdown assicurandosi che venga visualizzato correttamente nell'app.

## Configurazione del Contenuto Markdown

Per configurare contenuti Markdown nel progetto Intlayer, definisci un dizionario di contenuti che utilizzi la funzione `md`.

### Esempio TypeScript

```typescript fileName="markdownDictionary.content.ts" contentDeclarationFormat="typescript"
import { md, type Dictionary } from "intlayer";

const markdownDictionary = {
  key: "app",
  content: {
    myMarkdownContent: md("## My title \n\nLorem Ipsum"),
  },
} satisfies Dictionary;

export default markdownDictionary;
```

### Esempio JavaScript (ESM)

```javascript fileName="markdownDictionary.content.mjs" contentDeclarationFormat="esm"
import { md } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const markdownDictionary = {
  key: "app",
  content: {
    myMarkdownContent: md("## My title \n\nLorem Ipsum"),
  },
};

export default markdownDictionary;
```

### Esempio CommonJS

```javascript fileName="markdownDictionary.content.cjs" contentDeclarationFormat="commonjs"
const { md } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const markdownDictionary = {
  key: "app",
  content: {
    myMarkdownContent: md("## My title \n\nLorem Ipsum"),
  },
};

module.exports = markdownDictionary;
```

### Esempio JSON

Quando si utilizza JSON, il contenuto Markdown è definito impostando un `nodeType` (ad esempio, `"markdown"`) e fornendo la stringa Markdown. Per esempio:

```json fileName="markdownDictionary.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "app",
  "content": {
    "myMarkdownContent": {
      "nodeType": "markdown",
      "markdown": "## My title \n\nLorem Ipsum"
    }
  }
}
```

## Utilizzo di Markdown con React Intlayer

Per rendere il contenuto Markdown in un'applicazione React, puoi sfruttare il hook `useIntlayer` dal pacchetto `react-intlayer` insieme a un provider di rendering Markdown. In questo esempio, utilizziamo il pacchetto [`markdown-to-jsx`](https://www.npmjs.com/package/markdown-to-jsx) per convertire Markdown in HTML.

```tsx fileName="App.tsx" codeFormat="typescript"
import { FC } from "react";
import { useIntlayer, MarkdownProvider } from "react-intlayer";
import { LocaleRouter } from "./Router";
import Markdown from "markdown-to-jsx";
import "./App.css";

const AppContent: FC = () => {
  const { myMarkdownContent } = useIntlayer("app");

  return <>{myMarkdownContent}</>;
};

const App: FC = () => (
  <LocaleRouter>
    <MarkdownProvider
      renderMarkdown={(markdown) => <Markdown>{markdown}</Markdown>}
    >
      <AppContent />
    </MarkdownProvider>
  </LocaleRouter>
);

export default App;
```

In questa implementazione:

- Il `MarkdownProvider` avvolge l'applicazione (o la porzione rilevante) e accetta una funzione `renderMarkdown`. Questa funzione è utilizzata per convertire stringhe Markdown in JSX utilizzando il pacchetto `markdown-to-jsx`.
- Il hook `useIntlayer` viene utilizzato per recuperare il contenuto Markdown (`myMarkdownContent`) dal dizionario con la chiave `"app"`.
- Il contenuto Markdown è direttamente reso nel componente, e il rendering del Markdown è gestito dal provider.

## Risorse Aggiuntive

- [Documentazione CLI di Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/it/intlayer_cli.md)
- [Documentazione React Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/it/intlayer_with_create_react_app.md)
- [Documentazione Next Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/it/intlayer_with_nextjs_15.md)
- [markdown-to-jsx su npm](https://www.npmjs.com/package/markdown-to-jsx)

Queste risorse forniscono ulteriori approfondimenti su come configurare e utilizzare Intlayer con vari tipi di contenuto e framework.
