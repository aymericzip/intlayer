---
docName: dictionary__markdown
url: https://intlayer.org/doc/concept/content/markdown
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/markdown.md
createdAt: 2025-02-7
updatedAt: 2025-02-7
title: Markdown
description: Erfahren Sie, wie Sie Markdown-Inhalte in Ihrer mehrsprachigen Website mit Intlayer deklarieren und verwenden. Folgen Sie den Schritten in dieser Online-Dokumentation, um Markdown nahtlos in Ihr Projekt zu integrieren.
keywords:
  - Markdown
  - Internationalisierung
  - Dokumentation
  - Intlayer
  - Next.js
  - JavaScript
  - React
---

# Markdown / Rich Text Inhalt

## Wie Markdown funktioniert

Intlayer unterstützt Rich-Text-Inhalte, die mit Markdown-Syntax definiert sind. Dies wird durch die `md`-Funktion erreicht, die einen Markdown-String in ein Format umwandelt, das von Intlayer verwaltet werden kann. Mit Markdown können Sie Inhalte mit reichhaltiger Formatierung wie Blogs, Artikel und mehr einfach schreiben und pflegen.

[Der Intlayer Visual Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_visual_editor.md) und das [Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_CMS.md) unterstützen beide die Verwaltung von Markdown-Inhalten.

Wenn Sie Markdown in eine React-Anwendung integrieren, können Sie einen Markdown-Rendering-Provider (wie [`markdown-to-jsx`](https://www.npmjs.com/package/markdown-to-jsx)) verwenden, um die Markdown-Inhalte in HTML zu rendern. Dadurch können Sie Inhalte in Markdown schreiben und sicherstellen, dass sie in Ihrer App korrekt angezeigt werden.

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

## Importieren von (mehrsprachigen) `.md`-Dateien

```typescript fileName="md.d.ts" contentDeclarationFormat="typescript"
// Diese Deklaration ermöglicht es TypeScript, Markdown-Dateien (.md) als Module zu erkennen und zu importieren.
// Ohne diese Deklaration würde TypeScript einen Fehler auslösen, wenn versucht wird, Markdown-Dateien zu importieren,
// da TypeScript standardmäßig keine Nicht-Code-Dateien unterstützt.

declare module "*.md";
```

```typescript fileName="markdownDictionary.content.ts" contentDeclarationFormat="typescript"
import { md, t, type Dictionary } from "intlayer";
import { readFileSync } from "fs";
import { resolve } from "path";

import markdown_en from "./myMarkdown.en.md";
import markdown_fr from "./myMarkdown.fr.md";
import markdown_es from "./myMarkdown.es.md";

const markdownDictionary = {
  key: "app",
  content: {
    contentImport: t({
      de: md(markdown_en),
      en: md(markdown_en),
      fr: md(markdown_fr),
      es: md(markdown_es),
    }),
    contentRequire: md(require("./myMarkdown.md")),
    contentAsyncImport: md(
      import("./myMarkdown.md").then((module) => module.default)
    ),
    contentFetch: md(fetch("https://example.com").then((res) => res.text())),
    contentFS: md(() => {
      const filePath = resolve(process.cwd(), "doc/test.md");
      return readFileSync(filePath, "utf8");
    }),
  },
} satisfies Dictionary;

export default markdownDictionary;
```

```javascript fileName="markdownDictionary.content.mjs" contentDeclarationFormat="esm"
import { md, t } from "intlayer";
import { readFileSync } from "fs";
import { resolve } from "path";

import markdown_en from "./myMarkdown.en.md";
import markdown_fr from "./myMarkdown.fr.md";
import markdown_es from "./myMarkdown.es.md";

/** @type {import('intlayer').Dictionary} */
const markdownDictionary = {
  key: "app",
  content: {
    contentImport: t({
      de: md(markdown_en),
      en: md(markdown_en),
      fr: md(markdown_fr),
      es: md(markdown_es),
    }),
    contentRequire: md(require("./myMarkdown.md")),
    contentAsyncImport: md(
      import("./myMarkdown.md").then((module) => module.default)
    ),
    contentFetch: md(fetch("https://example.com").then((res) => res.text())),
    contentFS: md(() => {
      const filePath = resolve(process.cwd(), "doc/test.md");
      return readFileSync(filePath, "utf8");
    }),
  },
};

export default markdownDictionary;
```

```javascript fileName="markdownDictionary.content.cjs" contentDeclarationFormat="commonjs"
const { md, t } = require("intlayer");

const markdown_en = require("./myMarkdown.en.md");
const markdown_fr = require("./myMarkdown.fr.md");
const markdown_es = require("./myMarkdown.es.md");

/** @type {import('intlayer').Dictionary} */
const markdownDictionary = {
  key: "app",
  content: {
    contentImport: t({
      de: md(markdown_en),
      en: md(markdown_en),
      fr: md(markdown_fr),
      es: md(markdown_es),
    }),
    contentFetch: md(fetch("https://example.com").then((res) => res.text())),
    contentFS: md(() => {
      const filePath = resolve(process.cwd(), "doc/test.md");
      return readFileSync(filePath, "utf8");
    }),
  },
};

module.exports = markdownDictionary;
```

```jsonc fileName="markdownDictionary.content.json" contentDeclarationFormat="json"
// - Das Importieren externer Markdown-Dateien (.md) ist nur mit JS- oder TS-Deklarationsdateien möglich.
// - Das Abrufen externer Markdown-Inhalte ist nur mit JS- oder TS-Deklarationsdateien möglich.

{
  "$schema": "https://intlayer.org/schema.json",
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
```

---

module.exports = {
AppProvider,
};

````

In dieser Implementierung:

- Der `MarkdownProvider` umschließt die Anwendung (oder den relevanten Teil davon) und akzeptiert eine `renderMarkdown`-Funktion. Diese Funktion wird verwendet, um Markdown-Strings mithilfe des Pakets `markdown-to-jsx` in JSX zu konvertieren.
- Der `useIntlayer`-Hook wird verwendet, um den Markdown-Inhalt (`myMarkdownContent`) aus dem Wörterbuch mit dem Schlüssel `"app"` abzurufen.
- Der Markdown-Inhalt wird direkt in der Komponente gerendert, und das Rendern von Markdown wird vom Provider übernommen.

### Verwendung von Markdown mit Next Intlayer

Die Implementierung mit dem Paket `next-intlayer` ist ähnlich wie die oben beschriebene. Der einzige Unterschied besteht darin, dass die `renderMarkdown`-Funktion an die `MarkdownProvider`-Komponente in einer Client-Komponente übergeben werden sollte.

```tsx title="src/providers/IntlayerMarkdownProvider.tsx" codeFormat="typescript"
"use client";

import type { FC, PropsWithChildren } from "react";
import { MarkdownProvider } from "next-intlayer";

const renderMarkdown = (markdown: string) => (
  <span style={{ color: "red" }}>{markdown}</span>
);

export const IntlayerMarkdownProvider: FC<PropsWithChildren> = ({
  children,
}) => (
  <MarkdownProvider renderMarkdown={renderMarkdown}>
    {children}
  </MarkdownProvider>
);
````

```jsx title="src/providers/IntlayerMarkdownProvider.msx" codeFormat="esm"
"use client";

import { MarkdownProvider } from "next-intlayer";

const renderMarkdown = (markdown) => (
  <span style={{ color: "red" }}>{markdown}</span>
);

export const IntlayerMarkdownProvider = ({ children }) => (
  <MarkdownProvider renderMarkdown={renderMarkdown}>
    {children}
  </MarkdownProvider>
);
```

```jsx title="src/providers/IntlayerMarkdownProvider.csx" codeFormat="commonjs"
"use client";

const { MarkdownProvider } = require("next-intlayer");

const renderMarkdown = (markdown) => (
  <span style={{ color: "red" }}>{markdown}</span>
);

const IntlayerMarkdownProvider = ({ children }) => (
  <MarkdownProvider renderMarkdown={renderMarkdown}>
    {children}
  </MarkdownProvider>
);
```

## Zusätzliche Ressourcen

- [Intlayer CLI Dokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_cli.md)
- [React Intlayer Dokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_create_react_app.md)
- [Next Intlayer Dokumentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/intlayer_with_nextjs_15.md)
- [markdown-to-jsx auf npm](https://www.npmjs.com/package/markdown-to-jsx)

Diese Ressourcen bieten weitere Einblicke in die Einrichtung und Verwendung von Intlayer mit verschiedenen Inhaltstypen und Frameworks.
