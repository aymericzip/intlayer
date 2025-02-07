# Markdown / Contenu Rich Text

## Comment fonctionne Markdown

Intlayer prend en charge le contenu rich text défini en utilisant la syntaxe Markdown. Cela est réalisé à travers la fonction `md`, qui convertit une chaîne Markdown en un format qui peut être géré par Intlayer. En utilisant Markdown, vous pouvez facilement rédiger et maintenir du contenu avec un formatage avancé, tel que des blogs, des articles et plus encore.

[L'éditeur visuel Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/fr/intlayer_visual_editor.md) et le [CMS Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/fr/intlayer_CMS.md) prennent en charge la gestion de contenu Markdown.

Lorsqu'il est intégré à une application React, vous pouvez utiliser un fournisseur de rendu Markdown (comme [`markdown-to-jsx`](https://www.npmjs.com/package/markdown-to-jsx)) pour rendre le contenu Markdown en HTML. Cela vous permet de rédiger du contenu en Markdown tout en vous assurant qu'il s'affiche correctement dans votre application.

## Configuration du contenu Markdown

Pour configurer du contenu Markdown dans votre projet Intlayer, définissez un dictionnaire de contenu qui utilise la fonction `md`.

### Exemple en TypeScript

```typescript fileName="markdownDictionary.content.ts" contentDeclarationFormat="typescript"
import { md, type Dictionary } from "intlayer";

// Un exemple d'utilisation de Markdown pour les titres et le contenu riche.
const markdownDictionary = {
  key: "app",
  content: {
    myMarkdownContent: md("## Mon titre \n\nLorem Ipsum"),
  },
} satisfies Dictionary;

export default markdownDictionary;
```

### Exemple en JavaScript (ESM)

```javascript fileName="markdownDictionary.content.mjs" contentDeclarationFormat="esm"
import { md } from "intlayer";

/** @type {import('intlayer').Dictionary} */
// Un exemple d'utilisation de Markdown dans un fichier JavaScript ESM.
const markdownDictionary = {
  key: "app",
  content: {
    myMarkdownContent: md("## Mon titre \n\nLorem Ipsum"),
  },
};

export default markdownDictionary;
```

### Exemple en CommonJS

```javascript fileName="markdownDictionary.content.cjs" contentDeclarationFormat="commonjs"
const { md } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
// Un exemple d'utilisation de Markdown dans un fichier CommonJS.
const markdownDictionary = {
  key: "app",
  content: {
    myMarkdownContent: md("## Mon titre \n\nLorem Ipsum"),
  },
};

module.exports = markdownDictionary;
```

### Exemple en JSON

Lors de l'utilisation de JSON, le contenu Markdown est défini en définissant un `nodeType` (par ex., `"markdown"`) et en fournissant la chaîne Markdown. Par exemple :

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

Pour rendre le contenu Markdown dans une application React, vous pouvez utiliser le hook `useIntlayer` du package `react-intlayer` ainsi qu'un fournisseur de rendu Markdown. Dans cet exemple, nous utilisons le package [`markdown-to-jsx`](https://www.npmjs.com/package/markdown-to-jsx) pour convertir le Markdown en HTML.

```tsx fileName="App.tsx" codeFormat="typescript"
import { FC } from "react";
import { useIntlayer, MarkdownProvider } from "react-intlayer";
import { LocaleRouter } from "./Router";
import Markdown from "markdown-to-jsx";
import "./App.css";

// Affiche le contenu Markdown récupéré depuis Intlayer.
const AppContent: FC = () => {
  const { myMarkdownContent } = useIntlayer("app");

  return <>{myMarkdownContent}</>;
};

// Configuration globale de l'application avec un fournisseur Markdown.
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

Dans cette mise en œuvre :

- Le `MarkdownProvider` enveloppe l'application (ou la partie concernée) et accepte une fonction `renderMarkdown`. Cette fonction est utilisée pour convertir les chaînes Markdown en JSX à l'aide du package `markdown-to-jsx`.
- Le hook `useIntlayer` est utilisé pour récupérer le contenu Markdown (`myMarkdownContent`) depuis le dictionnaire avec la clé `"app"`.
- Le contenu Markdown est directement rendu dans le composant, et le rendu Markdown est géré par le fournisseur.

## Ressources supplémentaires

- [Documentation sur l'Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/fr/intlayer_cli.md)
- [Documentation sur React Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/fr/intlayer_with_create_react_app.md)
- [Documentation sur Next Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/fr/intlayer_with_nextjs_15.md)
- [markdown-to-jsx sur npm](https://www.npmjs.com/package/markdown-to-jsx)

Ces ressources offrent des informations supplémentaires pour configurer et utiliser Intlayer avec divers types de contenu et frameworks.
