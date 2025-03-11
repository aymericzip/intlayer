## Wie Markdown funktioniert

Intlayer unterstützt Rich-Text-Inhalte, die mit Markdown-Syntax definiert sind. Dies wird durch die `md`-Funktion erreicht, die eine Markdown-Zeichenkette in ein Format umwandelt, das von Intlayer verwaltet werden kann. Mit Markdown können Sie Inhalte mit reichhaltiger Formatierung wie Blogs, Artikel und mehr einfach schreiben und pflegen.

[Der Intlayer Visual Editor](https://github.com/aymericzip/intlayer/blob/main/docs/de/intlayer_visual_editor.md) und das [Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/de/intlayer_CMS.md) unterstützen beide die Verwaltung von Markdown-Inhalten.

Wenn Sie Intlayer in eine React-Anwendung integrieren, können Sie einen Markdown-Rendering-Provider (wie [`markdown-to-jsx`](https://www.npmjs.com/package/markdown-to-jsx)) verwenden, um die Markdown-Inhalte in HTML zu rendern. Dies ermöglicht es Ihnen, Inhalte in Markdown zu schreiben und sicherzustellen, dass sie in Ihrer App korrekt angezeigt werden.

## Einrichtung von Markdown-Inhalten

Um Markdown-Inhalte in Ihrem Intlayer-Projekt einzurichten, definieren Sie ein Inhaltswörterbuch, das die `md`-Funktion verwendet.

```typescript fileName="markdownDictionary.content.ts" contentDeclarationFormat="typescript"
import { md, type Dictionary } from "intlayer";

const markdownDictionary = {
  key: "app",
  content: {
    myMarkdownContent: md("## Mein Titel \n\nLorem Ipsum"),
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
    myMarkdownContent: md("## Mein Titel \n\nLorem Ipsum"),
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
    myMarkdownContent: md("## Mein Titel \n\nLorem Ipsum"),
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
      "markdown": "## Mein Titel \n\nLorem Ipsum"
    }
  }
}
```

## Importieren einer mehrsprachigen `.md`-Datei

```typescript fileName="md.d.ts" contentDeclarationFormat="typescript"
// Diese Deklaration ermöglicht es TypeScript, Markdown-Dateien (.md) als Module zu erkennen und zu importieren.
// Ohne diese Deklaration würde TypeScript einen Fehler auslösen, wenn versucht wird, Markdown-Dateien zu importieren,
// da TypeScript standardmäßig keine Nicht-Code-Dateien unterstützt.

declare module "*.md";
```

```typescript fileName="markdownDictionary.content.ts" contentDeclarationFormat="typescript"
import { md, t, type Dictionary } from "intlayer";
import markdown_de from "./myMarkdown.de.md";
import markdown_en from "./myMarkdown.en.md";
import markdown_fr from "./myMarkdown.fr.md";
import markdown_es from "./myMarkdown.es.md";

const markdownDictionary = {
  key: "app",
  content: {
    myMarkdownContent: t({
      de: md(markdown_de),
      en: md(markdown_en),
      fr: md(markdown_fr),
      es: md(markdown_es),
    }),
  },
} satisfies Dictionary;

export default markdownDictionary;
```

```javascript fileName="markdownDictionary.content.mjs" contentDeclarationFormat="esm"
import { md, t, type Dictionary } from "intlayer";
import markdown_de from "./myMarkdown.de.md";
import markdown_en from "./myMarkdown.en.md";
import markdown_fr from "./myMarkdown.fr.md";
import markdown_es from "./myMarkdown.es.md";

const markdownDictionary = {
  key: "app",
  content: {
    myMarkdownContent: t({
      de: md(markdown_de),
      en: md(markdown_en),
      fr: md(markdown_fr),
      es: md(markdown_es),
    }),
  },
};

export default markdownDictionary;
```

```javascript fileName="markdownDictionary.content.cjs" contentDeclarationFormat="commonjs"
const { md, t, type Dictionary } = require("intlayer");

const markdown_de = require("./myMarkdown.de.md");
const markdown_en = require("./myMarkdown.en.md");
const markdown_fr = require("./myMarkdown.fr.md");
const markdown_es = require("./myMarkdown.es.md");

const markdownDictionary = {
  key: "app",
  content: {
    myMarkdownContent: t({
      de: md(markdown_de),
      en: md(markdown_en),
      fr: md(markdown_fr),
      es: md(markdown_es),
    }),
  },
};

module.exports = markdownDictionary;
```

```jsonc fileName="markdownDictionary.content.json" contentDeclarationFormat="json"
// Das Importieren externer Markdown-Dateien (.md) ist nur mit JS- oder TS-Deklarationsdateien möglich.

{
  "key": "app",
  "content": {
    "myMarkdownContent": {
      "nodeType": "translation",
      "translation": {
        "de": {
          "nodeType": "markdown",
          "markdown": "# Mein Markdown\n\nDies ist ein Markdown-Inhalt.",
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

## Verwendung von Markdown mit React Intlayer

Um die Markdown-Inhalte in einer React-Anwendung zu rendern, können Sie den `useIntlayer`-Hook aus dem `react-intlayer`-Paket zusammen mit einem Markdown-Rendering-Provider verwenden. In diesem Beispiel verwenden wir das [`markdown-to-jsx`](https://www.npmjs.com/package/markdown-to-jsx)-Paket, um das Markdown in HTML umzuwandeln.

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

In dieser Implementierung:

- Der `MarkdownProvider` umschließt die Anwendung (oder den relevanten Teil davon) und akzeptiert eine `renderMarkdown`-Funktion. Diese Funktion wird verwendet, um Markdown-Zeichenketten mit dem `markdown-to-jsx`-Paket in JSX umzuwandeln.
- Der `useIntlayer`-Hook wird verwendet, um die Markdown-Inhalte (`myMarkdownContent`) aus dem Wörterbuch mit dem Schlüssel `"app"` abzurufen.
- Die Markdown-Inhalte werden direkt in der Komponente gerendert, und das Markdown-Rendering wird vom Provider übernommen.

## Zusätzliche Ressourcen

- [Intlayer CLI Dokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/de/intlayer_cli.md)
- [React Intlayer Dokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/de/intlayer_with_create_react_app.md)
- [Next Intlayer Dokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/de/intlayer_with_nextjs_15.md)
- [markdown-to-jsx auf npm](https://www.npmjs.com/package/markdown-to-jsx)

Diese Ressourcen bieten weitere Einblicke in die Einrichtung und Nutzung von Intlayer mit verschiedenen Inhaltstypen und Frameworks.
