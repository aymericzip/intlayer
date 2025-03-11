## Come Funziona il Markdown

Intlayer supporta contenuti di testo ricco definiti utilizzando la sintassi Markdown. Questo è realizzato attraverso la funzione `md`, che converte una stringa Markdown in un formato che può essere gestito da Intlayer. Utilizzando Markdown, puoi facilmente scrivere e mantenere contenuti con formattazione ricca, come blog, articoli e altro.

[Il Visual editor di Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/it/intlayer_visual_editor.md) e il [CMS di Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/it/intlayer_CMS.md) supportano entrambi la gestione dei contenuti Markdown.

Quando integrato con un'applicazione React, puoi utilizzare un provider di rendering Markdown (come [`markdown-to-jsx`](https://www.npmjs.com/package/markdown-to-jsx)) per rendere il contenuto Markdown in HTML. Questo ti consente di scrivere contenuti in Markdown assicurandoti che vengano visualizzati correttamente nella tua app.

## Configurazione del Contenuto Markdown

Per configurare il contenuto Markdown nel tuo progetto Intlayer, definisci un dizionario di contenuti che utilizza la funzione `md`.

```typescript fileName="markdownDictionary.content.ts" contentDeclarationFormat="typescript"
import { md, type Dictionary } from "intlayer";

const markdownDictionary = {
  key: "app",
  content: {
    myMarkdownContent: md("## Il mio titolo \n\nLorem Ipsum"),
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
    myMarkdownContent: md("## Il mio titolo \n\nLorem Ipsum"),
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
    myMarkdownContent: md("## Il mio titolo \n\nLorem Ipsum"),
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
      "markdown": "## Il mio titolo \n\nLorem Ipsum"
    }
  }
}
```

## Importare file `.md` multilingua

```typescript fileName="md.d.ts" contentDeclarationFormat="typescript"
// Questa dichiarazione consente a TypeScript di riconoscere e importare file Markdown (.md) come moduli.
// Senza questa dichiarazione, TypeScript genererebbe un errore tentando di importare file Markdown,
// poiché non supporta nativamente l'importazione di file non di codice.

declare module "*.md";
```

```typescript fileName="markdownDictionary.content.ts" contentDeclarationFormat="typescript"
import { md, t, type Dictionary } from "intlayer";
import markdown_it from "./myMarkdown.it.md";
import markdown_en from "./myMarkdown.en.md";
import markdown_fr from "./myMarkdown.fr.md";
import markdown_es from "./myMarkdown.es.md";

const markdownDictionary = {
  key: "app",
  content: {
    myMarkdownContent: t({
      it: md(markdown_it),
      en: md(markdown_en),
      fr: md(markdown_fr),
      es: md(markdown_es),
    }),
  },
} satisfies Dictionary;

export default markdownDictionary;
```

```javascript fileName="markdownDictionary.content.mjs" contentDeclarationFormat="esm"
import { md, t } from "intlayer";
import markdown_it from "./myMarkdown.it.md";
import markdown_en from "./myMarkdown.en.md";
import markdown_fr from "./myMarkdown.fr.md";
import markdown_es from "./myMarkdown.es.md";

/** @type {import('intlayer').Dictionary} */
const markdownDictionary = {
  key: "app",
  content: {
    myMarkdownContent: t({
      it: md(markdown_it),
      en: md(markdown_en),
      fr: md(markdown_fr),
      es: md(markdown_es),
    }),
  },
};

export default markdownDictionary;
```

```javascript fileName="markdownDictionary.content.cjs" contentDeclarationFormat="commonjs"
const { md, t } = require("intlayer");
const markdown_it = require("./myMarkdown.it.md");
const markdown_en = require("./myMarkdown.en.md");
const markdown_fr = require("./myMarkdown.fr.md");
const markdown_es = require("./myMarkdown.es.md");

/** @type {import('intlayer').Dictionary} */
const markdownDictionary = {
  key: "app",
  content: {
    myMarkdownContent: t({
      it: md(markdown_it),
      en: md(markdown_en),
      fr: md(markdown_fr),
      es: md(markdown_es),
    }),
  },
};

module.exports = markdownDictionary;
```

```jsonc fileName="markdownDictionary.content.json" contentDeclarationFormat="json"
// L'importazione di file Markdown esterni (.md) è possibile solo utilizzando file di dichiarazione JS o TS.

{
  "$schema": "https://intlayer.org/schema.json",
  "key": "app",
  "content": {
    "myMarkdownContent": {
      "nodeType": "translation",
      "translation": {
        "it": {
          "nodeType": "markdown",
          "markdown": "# Il mio Markdown\n\nQuesto è un contenuto Markdown.",
        },
        "en": {
          "nodeType": "markdown",
          "markdown": "# My Markdown\n\nThis is a Markdown content.",
        },
        "fr": {
          "nodeType": "markdown",
          "markdown": "# Mon Markdown\n\nC'est un contenu Markdown.",
        },
        "es": {
          "nodeType": "markdown",
          "markdown": "# Mi Markdown\n\nEsto es un contenido Markdown.",
        },
      },
    },
  },
}
```

## Utilizzare Markdown con React Intlayer

Per rendere il contenuto Markdown in un'applicazione React, puoi sfruttare il hook `useIntlayer` dal pacchetto `react-intlayer` insieme a un provider di rendering Markdown. In questo esempio, utilizziamo il pacchetto [`markdown-to-jsx`](https://www.npmjs.com/package/markdown-to-jsx) per convertire il Markdown in HTML.

```tsx fileName="App.tsx" codeFormat="typescript"
import type { FC } from "react";
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

Queste risorse forniscono ulteriori approfondimenti sulla configurazione e l'utilizzo di Intlayer con vari tipi di contenuti e framework.
