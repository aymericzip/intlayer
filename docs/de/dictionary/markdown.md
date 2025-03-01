# Markdown / Rich Text Inhalt

## Wie Markdown funktioniert

Intlayer unterstützt Rich-Text-Inhalte, die mit der Markdown-Syntax definiert sind. Dies wird durch die `md`-Funktion erreicht, die eine Markdown-Zeichenkette in ein Format umwandelt, das von Intlayer verwaltet werden kann. Mit Markdown können Sie Inhalte mit reichhaltiger Formatierung wie Blogs, Artikel und mehr einfach schreiben und pflegen.

[Der Intlayer Visual Editor](https://github.com/aymericzip/intlayer/blob/main/docs/de/intlayer_visual_editor.md) und das [Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/de/intlayer_CMS.md) unterstützen beide die Verwaltung von Markdown-Inhalten.

Wenn Sie Intlayer in eine React-Anwendung integrieren, können Sie einen Markdown-Rendering-Provider (wie [`markdown-to-jsx`](https://www.npmjs.com/package/markdown-to-jsx)) verwenden, um die Markdown-Inhalte in HTML zu rendern. Dies ermöglicht es Ihnen, Inhalte in Markdown zu schreiben und sicherzustellen, dass sie in Ihrer App korrekt angezeigt werden.

## Einrichten von Markdown-Inhalten

Um Markdown-Inhalte in Ihrem Intlayer-Projekt einzurichten, definieren Sie ein Inhaltswörterbuch, das die `md`-Funktion verwendet.

```typescript fileName="markdownDictionary.content.ts" contentDeclarationFormat="typescript"
import { md, type Dictionary } from "intlayer";

// Das Wörterbuch für Markdown-Inhalte
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
// Das Wörterbuch für Markdown-Inhalte
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
// Das Wörterbuch für Markdown-Inhalte
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

## Verwendung von Markdown mit React Intlayer

Um die Markdown-Inhalte in einer React-Anwendung zu rendern, können Sie den `useIntlayer`-Hook aus dem `react-intlayer`-Paket zusammen mit einem Markdown-Rendering-Provider verwenden. In diesem Beispiel verwenden wir das [`markdown-to-jsx`](https://www.npmjs.com/package/markdown-to-jsx)-Paket, um das Markdown in HTML umzuwandeln.

```tsx fileName="App.tsx" codeFormat="typescript"
import { FC } from "react";
import { useIntlayer, MarkdownProvider } from "react-intlayer";
import Markdown from "markdown-to-jsx";

// Die Hauptkomponente für Inhalte
const AppContent: FC = () => {
  const { myMarkdownContent } = useIntlayer("app");

  return <>{myMarkdownContent}</>;
};

// Der Provider für die App
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

// Die Hauptkomponente für Inhalte
const AppContent = () => {
  const { myMarkdownContent } = useIntlayer("app");

  return <>{myMarkdownContent}</>;
};

// Der Provider für die App
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

// Die Hauptkomponente für Inhalte
const AppContent = () => {
  const { myMarkdownContent } = useIntlayer("app");

  return <>{myMarkdownContent}</>;
};

// Der Provider für die App
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
- Die Markdown-Inhalte werden direkt in der Komponente gerendert, und das Rendering von Markdown wird vom Provider übernommen.

## Zusätzliche Ressourcen

- [Intlayer CLI Dokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/de/intlayer_cli.md)
- [React Intlayer Dokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/de/intlayer_with_create_react_app.md)
- [Next Intlayer Dokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/de/intlayer_with_nextjs_15.md)
- [markdown-to-jsx auf npm](https://www.npmjs.com/package/markdown-to-jsx)

Diese Ressourcen bieten weitere Einblicke in die Einrichtung und Verwendung von Intlayer mit verschiedenen Inhaltstypen und Frameworks.
