# Markdown / Contenuto Rich Text

## Come Funziona Markdown

Intlayer supporta contenuti rich text definiti utilizzando la sintassi Markdown. Questo è possibile grazie alla funzione `md`, che converte una stringa Markdown in un formato gestibile da Intlayer. Utilizzando Markdown, puoi scrivere e mantenere facilmente contenuti con formattazione avanzata, come blog, articoli e altro.

[Il Visual editor di Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/it/intlayer_visual_editor.md) e il [CMS di Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/it/intlayer_CMS.md) supportano entrambi la gestione dei contenuti Markdown.

Quando integrato con un'applicazione React, puoi utilizzare un provider di rendering Markdown (come [`markdown-to-jsx`](https://www.npmjs.com/package/markdown-to-jsx)) per rendere il contenuto Markdown in HTML. Questo ti consente di scrivere contenuti in Markdown assicurandoti che vengano visualizzati correttamente nella tua app.

## Configurazione del Contenuto Markdown

Per configurare il contenuto Markdown nel tuo progetto Intlayer, definisci un dizionario di contenuti che utilizza la funzione `md`.

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

Per rendere il contenuto Markdown in un'applicazione React, puoi utilizzare il hook `useIntlayer` dal pacchetto `react-intlayer` insieme a un provider di rendering Markdown. In questo esempio, utilizziamo il pacchetto [`markdown-to-jsx`](https://www.npmjs.com/package/markdown-to-jsx) per convertire il Markdown in HTML.

```tsx fileName="App.tsx" codeFormat="typescript"
import { FC } from "react";
import { useIntlayer, MarkdownProvider } from "react-intlayer";
import Markdown from "markdown-to-jsx";

const AppContent: FC = () => {
  const { myMarkdownContent } = useIntlayer("app");

  return <>{myMarkdownContent}</>;
};

export const AppProvider: FC = () => (
  <MarkdownProvider
    renderMarkdown={(markdown) => <Markdown>{markdown}</Markdown>}
  >
    <AppContent />
  </MarkdownProvider>
);
```

```jsx fileName="App.jsx" codeFormat="esm"
import { useIntlayer, MarkdownProvider } from "react-intlayer";
import Markdown from "markdown-to-jsx";

const AppContent = () => {
  const { myMarkdownContent } = useIntlayer("app");

  return <>{myMarkdownContent}</>;
};

export const AppProvider = () => (
  <MarkdownProvider
    renderMarkdown={(markdown) => <Markdown>{markdown}</Markdown>}
  >
    <AppContent />
  </MarkdownProvider>
);
```

```jsx fileName="App.jsx" codeFormat="commonjs"
const { useIntlayer, MarkdownProvider } = require("react-intlayer");
const Markdown = require("markdown-to-jsx");

const AppContent = () => {
  const { myMarkdownContent } = useIntlayer("app");

  return <>{myMarkdownContent}</>;
};

AppProvider = () => (
  <MarkdownProvider
    renderMarkdown={(markdown) => <Markdown>{markdown}</Markdown>}
  >
    <AppContent />
  </MarkdownProvider>
);

module.exports = {
  AppProvider,
};
```

In questa implementazione:

- Il `MarkdownProvider` avvolge l'applicazione (o la parte rilevante di essa) e accetta una funzione `renderMarkdown`. Questa funzione viene utilizzata per convertire le stringhe Markdown in JSX utilizzando il pacchetto `markdown-to-jsx`.
- Il hook `useIntlayer` viene utilizzato per recuperare il contenuto Markdown (`myMarkdownContent`) dal dizionario con la chiave `"app"`.
- Il contenuto Markdown viene reso direttamente nel componente, e il rendering del Markdown è gestito dal provider.

## Risorse Aggiuntive

- [Documentazione CLI di Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/it/intlayer_cli.md)
- [Documentazione React Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/it/intlayer_with_create_react_app.md)
- [Documentazione Next Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/it/intlayer_with_nextjs_15.md)
- [markdown-to-jsx su npm](https://www.npmjs.com/package/markdown-to-jsx)

Queste risorse forniscono ulteriori approfondimenti sulla configurazione e sull'utilizzo di Intlayer con vari tipi di contenuti e framework.
