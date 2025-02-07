# Markdown / Rich Text Content

## Wie Markdown funktioniert

Intlayer unterstützt Rich-Text-Inhalte, die mit Markdown-Syntax definiert sind. Dies wird durch die `md`-Funktion erreicht, die einen Markdown-String in ein Format umwandelt, das von Intlayer verwaltet werden kann. Mit Markdown können Sie ganz einfach Inhalte mit umfangreicher Formatierung, wie Blogs, Artikel und mehr, schreiben und pflegen.

[Der Intlayer-Visual-Editor](https://github.com/aymericzip/intlayer/blob/main/docs/de/intlayer_visual_editor.md) und das [Intlayer-CMS](https://github.com/aymericzip/intlayer/blob/main/docs/de/intlayer_CMS.md) unterstützen beide die Verwaltung von Markdown-Inhalten.

In Kombination mit einer React-Anwendung können Sie einen Markdown-Render-Anbieter (wie zum Beispiel [`markdown-to-jsx`](https://www.npmjs.com/package/markdown-to-jsx)) verwenden, um die Markdown-Inhalte in HTML darzustellen. Dies ermöglicht es Ihnen, Inhalte in Markdown zu schreiben und sicherzustellen, dass sie in Ihrer Anwendung korrekt angezeigt werden.

## Einrichten von Markdown-Inhalten

Um Markdown-Inhalte in Ihrem Intlayer-Projekt einzurichten, definieren Sie ein Inhaltswörterbuch, das die `md`-Funktion verwendet.

### TypeScript Beispiel

```typescript fileName="markdownDictionary.content.ts" contentDeclarationFormat="typescript"
import { md, type Dictionary } from "intlayer";

// Erstellung eines Inhaltswörterbuchs in TypeScript
const markdownDictionary = {
  key: "app",
  content: {
    myMarkdownContent: md("## Mein Titel \n\nLorem Ipsum"),
  },
} satisfies Dictionary;

export default markdownDictionary;
```

### JavaScript (ESM) Beispiel

```javascript fileName="markdownDictionary.content.mjs" contentDeclarationFormat="esm"
import { md } from "intlayer";

/** @type {import('intlayer').Dictionary} */
// Erstellung eines Inhaltswörterbuchs in JavaScript ESM
const markdownDictionary = {
  key: "app",
  content: {
    myMarkdownContent: md("## Mein Titel \n\nLorem Ipsum"),
  },
};

export default markdownDictionary;
```

### CommonJS Beispiel

```javascript fileName="markdownDictionary.content.cjs" contentDeclarationFormat="commonjs"
const { md } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
// Erstellung eines Inhaltswörterbuchs in CommonJS
const markdownDictionary = {
  key: "app",
  content: {
    myMarkdownContent: md("## Mein Titel \n\nLorem Ipsum"),
  },
};

module.exports = markdownDictionary;
```

### JSON Beispiel

Bei der Verwendung von JSON werden die Markdown-Inhalte durch die Festlegung eines `nodeType` (z. B. `"markdown"`) und das Bereitstellen des Markdown-Strings definiert. Zum Beispiel:

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

## Verwendung von Markdown mit React Intlayer

Um die Markdown-Inhalte in einer React-Anwendung darzustellen, können Sie den `useIntlayer` Hook aus dem `react-intlayer` Paket zusammen mit einem Markdown-Render-Anbieter nutzen. In diesem Beispiel verwenden wir das [`markdown-to-jsx`](https://www.npmjs.com/package/markdown-to-jsx) Paket, um Markdown in HTML umzuwandeln.

```tsx fileName="App.tsx" codeFormat="typescript"
import { FC } from "react";
import { useIntlayer, MarkdownProvider } from "react-intlayer";
import { LocaleRouter } from "./Router";
import Markdown from "markdown-to-jsx";
import "./App.css";

// Hauptapplikation mit Markdown-Inhalten
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

In dieser Implementierung:

- Der `MarkdownProvider` umschließt die Anwendung (oder den entsprechenden Teil davon) und akzeptiert eine `renderMarkdown`-Funktion. Diese Funktion wird verwendet, um Markdown-Strings mittels der `markdown-to-jsx` Bibliothek in JSX umzuwandeln.
- Der `useIntlayer` Hook wird verwendet, um die Markdown-Inhalte (`myMarkdownContent`) aus dem Wörterbuch mit dem Schlüssel `"app"` abzurufen.
- Die Markdown-Inhalte werden direkt im Komponenteninhalt dargestellt, und das Rendern des Markdown-Contents wird durch den Provider übernommen.

## Zusätzliche Ressourcen

- [Intlayer CLI-Dokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/de/intlayer_cli.md)
- [React Intlayer-Dokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/de/intlayer_with_create_react_app.md)
- [Next Intlayer-Dokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/de/intlayer_with_nextjs_15.md)
- [markdown-to-jsx auf npm](https://www.npmjs.com/package/markdown-to-jsx)

Diese Ressourcen bieten weitere Einblicke in die Einrichtung und Verwendung von Intlayer mit verschiedenen Inhaltsarten und Frameworks.
