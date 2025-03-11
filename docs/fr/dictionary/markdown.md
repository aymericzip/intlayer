# Markdown / Contenu Rich Text

## Comment fonctionne Markdown

Intlayer prend en charge le contenu rich text défini à l'aide de la syntaxe Markdown. Cela est réalisé grâce à la fonction `md`, qui convertit une chaîne Markdown en un format pouvant être géré par Intlayer. En utilisant Markdown, vous pouvez facilement rédiger et maintenir du contenu avec un formatage riche, tel que des blogs, des articles, et plus encore.

[L'éditeur visuel Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/fr/intlayer_visual_editor.md) et le [CMS Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/fr/intlayer_CMS.md) prennent tous deux en charge la gestion de contenu Markdown.

Lorsqu'il est intégré à une application React, vous pouvez utiliser un fournisseur de rendu Markdown (tel que [`markdown-to-jsx`](https://www.npmjs.com/package/markdown-to-jsx)) pour rendre le contenu Markdown en HTML. Cela vous permet d'écrire du contenu en Markdown tout en garantissant qu'il s'affiche correctement dans votre application.

## Configuration du contenu Markdown

Pour configurer le contenu Markdown dans votre projet Intlayer, définissez un dictionnaire de contenu qui utilise la fonction `md`.

```typescript fileName="markdownDictionary.content.ts" contentDeclarationFormat="typescript"
import { md, type Dictionary } from "intlayer";

// Définition du dictionnaire Markdown
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

// Définition du dictionnaire Markdown
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

// Définition du dictionnaire Markdown
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

## Utilisation de Markdown avec React Intlayer

Pour rendre le contenu Markdown dans une application React, vous pouvez utiliser le hook `useIntlayer` du package `react-intlayer` avec un fournisseur de rendu Markdown. Dans cet exemple, nous utilisons le package [`markdown-to-jsx`](https://www.npmjs.com/package/markdown-to-jsx) pour convertir le Markdown en HTML.

```tsx fileName="App.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer, MarkdownProvider } from "react-intlayer";
import Markdown from "markdown-to-jsx";

// Composant principal de l'application
const AppContent: FC = () => {
  const { myMarkdownContent } = useIntlayer("app");

  return <>{myMarkdownContent}</>;
};

// Fournisseur de l'application
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

// Composant principal de l'application
const AppContent = () => {
  const { myMarkdownContent } = useIntlayer("app");

  return <>{myMarkdownContent}</>;
};

// Fournisseur de l'application
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

// Composant principal de l'application
const AppContent = () => {
  const { myMarkdownContent } = useIntlayer("app");

  return <>{myMarkdownContent}</>;
};

// Fournisseur de l'application
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

Dans cette implémentation :

- Le `MarkdownProvider` enveloppe l'application (ou la partie concernée) et accepte une fonction `renderMarkdown`. Cette fonction est utilisée pour convertir les chaînes Markdown en JSX à l'aide du package `markdown-to-jsx`.
- Le hook `useIntlayer` est utilisé pour récupérer le contenu Markdown (`myMarkdownContent`) du dictionnaire avec la clé `"app"`.
- Le contenu Markdown est directement rendu dans le composant, et le rendu Markdown est géré par le fournisseur.

## Ressources supplémentaires

- [Documentation CLI Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/fr/intlayer_cli.md)
- [Documentation React Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/fr/intlayer_with_create_react_app.md)
- [Documentation Next Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/fr/intlayer_with_nextjs_15.md)
- [markdown-to-jsx sur npm](https://www.npmjs.com/package/markdown-to-jsx)

Ces ressources fournissent des informations supplémentaires sur la configuration et l'utilisation d'Intlayer avec divers types de contenu et frameworks.
