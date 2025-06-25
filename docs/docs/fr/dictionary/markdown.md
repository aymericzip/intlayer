---
docName: dictionary__markdown
url: https://intlayer.org/doc/concept/content/markdown
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dictionary/markdown.md
createdAt: 2025-02-7
updatedAt: 2025-02-7
title: Markdown
description: Découvrez comment déclarer et utiliser du contenu Markdown dans votre site web multilingue avec Intlayer. Suivez les étapes de cette documentation en ligne pour intégrer Markdown facilement dans votre projet.
keywords:
  - Markdown
  - Internationalisation
  - Documentation
  - Intlayer
  - Next.js
  - JavaScript
  - React
---

# Markdown / Contenu Rich Text

## Comment fonctionne Markdown

Intlayer prend en charge le contenu rich text défini à l'aide de la syntaxe Markdown. Cela est réalisé grâce à la fonction `md`, qui convertit une chaîne Markdown en un format pouvant être géré par Intlayer. En utilisant Markdown, vous pouvez facilement rédiger et maintenir du contenu avec un formatage riche, tel que des blogs, des articles, et plus encore.

[L'éditeur visuel Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_visual_editor.md) et le [CMS Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_CMS.md) prennent tous deux en charge la gestion de contenu Markdown.

Lorsqu'il est intégré à une application React, vous pouvez utiliser un fournisseur de rendu Markdown (tel que [`markdown-to-jsx`](https://www.npmjs.com/package/markdown-to-jsx)) pour rendre le contenu Markdown en HTML. Cela vous permet d'écrire du contenu en Markdown tout en garantissant qu'il s'affiche correctement dans votre application.

## Configuration du contenu Markdown

Pour configurer le contenu Markdown dans votre projet Intlayer, définissez un dictionnaire de contenu qui utilise la fonction `md`.

```typescript fileName="markdownDictionary.content.ts" contentDeclarationFormat="typescript"
import { md, type Dictionary } from "intlayer";

const markdownDictionary = {
  key: "app",
  content: {
    myMarkdownContent: md("## Mon titre \n\nLorem Ipsum"),
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
    myMarkdownContent: md("## Mon titre \n\nLorem Ipsum"),
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
    myMarkdownContent: md("## Mon titre \n\nLorem Ipsum"),
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
      "markdown": "## Mon titre \n\nLorem Ipsum"
    }
  }
}
```

## Importer un fichier `.md` (multilingue)

```typescript fileName="md.d.ts" contentDeclarationFormat="typescript"
// Cette déclaration permet à TypeScript de reconnaître et d'importer des fichiers Markdown (.md) en tant que modules.
// Sans cela, TypeScript renverrait une erreur lors de l'importation de fichiers Markdown,
// car il ne prend pas en charge nativement les importations de fichiers non codés.

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
      fr: md(markdown_fr),
      en: md(markdown_en),
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
      fr: md(markdown_fr),
      en: md(markdown_en),
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
      fr: md(markdown_fr),
      en: md(markdown_en),
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
// - L'importation de fichiers Markdown externes (.md) n'est possible qu'en utilisant des fichiers de déclaration JS ou TS.
// - La récupération de contenu Markdown externe n'est possible qu'en utilisant des fichiers de déclaration JS ou TS.

{
  "$schema": "https://intlayer.org/schema.json",
  "key": "app",
  "content": {
    "myMarkdownContent": {
      "nodeType": "translation",
      "translation": {
        "fr": {
          "nodeType": "markdown",
          "markdown": "# Mon Markdown\n\nC'est un contenu Markdown.",
        },
        "en": {
          "nodeType": "markdown",
          "markdown": "# My Markdown\n\nThis is a Markdown content.",
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

## Utiliser Markdown avec React Intlayer

Pour rendre le contenu Markdown dans une application React, vous pouvez utiliser le hook `useIntlayer` du package `react-intlayer` avec un fournisseur de rendu Markdown. Dans cet exemple, nous utilisons le package [`markdown-to-jsx`](https://www.npmjs.com/package/markdown-to-jsx) pour convertir le Markdown en HTML.

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

AppProvider,
};

````

Dans cette implémentation :

- Le `MarkdownProvider` enveloppe l'application (ou la partie concernée) et accepte une fonction `renderMarkdown`. Cette fonction est utilisée pour convertir des chaînes Markdown en JSX à l'aide du package `markdown-to-jsx`.
- Le hook `useIntlayer` est utilisé pour récupérer le contenu Markdown (`myMarkdownContent`) du dictionnaire avec la clé `"app"`.
- Le contenu Markdown est rendu directement dans le composant, et le rendu Markdown est géré par le fournisseur.

### Utilisation de Markdown avec Next Intlayer

L'implémentation utilisant le package `next-intlayer` est similaire à celle ci-dessus. La seule différence est que la fonction `renderMarkdown` doit être passée au composant `MarkdownProvider` dans un composant client.

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

## Ressources supplémentaires

- [Documentation CLI Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_cli.md)
- [Documentation React Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_with_create_react_app.md)
- [Documentation Next Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_with_nextjs_15.md)
- [markdown-to-jsx sur npm](https://www.npmjs.com/package/markdown-to-jsx)

Ces ressources fournissent des informations supplémentaires sur la configuration et l'utilisation d'Intlayer avec divers types de contenu et frameworks.
