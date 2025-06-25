---
docName: dictionary__file
url: /doc/concept/content/file
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/en/dictionary/file.md
createdAt: 2025-03-13
updatedAt: 2025-03-13
title: Fichier
description: Apprenez à incorporer des fichiers externes dans votre dictionnaire de contenu en utilisant la fonction `file`. Cette documentation explique comment Intlayer gère le contenu des fichiers de manière dynamique.
keywords:
  - Fichier
  - Internationalisation
  - Documentation
  - Intlayer
  - Next.js
  - JavaScript
  - React
---

# Intégration de Fichiers dans Intlayer

## Comment Fonctionne l'Intégration de Fichiers

Dans Intlayer, la fonction `file` permet d'intégrer le contenu d'un fichier externe dans un dictionnaire. Cette approche garantit qu'Intlayer reconnaît le fichier source, permettant une intégration transparente avec l'éditeur visuel et le CMS d'Intlayer. Contrairement aux méthodes directes d'`import`, `require` ou de lecture de fichiers avec `fs`, l'utilisation de `file` associe le fichier au dictionnaire, permettant à Intlayer de suivre et de mettre à jour le contenu dynamiquement lorsque le fichier est modifié.

## Configuration du Contenu du Fichier

Pour intégrer le contenu d'un fichier dans votre projet Intlayer, utilisez la fonction `file` dans un module de contenu. Voici des exemples démontrant différentes implémentations.

### Implémentation TypeScript

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
import { file, type Dictionary } from "intlayer";

const myFileContent = {
  key: "my_key",
  content: {
    myFile: file("./path/to/file.txt"),
  },
} satisfies Dictionary;

export default myFileContent;
```

### Implémentation ECMAScript Module (ESM)

```javascript fileName="**/*.content.mjs" contentDeclarationFormat="esm"
import { file } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const myFileContent = {
  key: "my_key",
  content: {
    myFile: file("./path/to/file.txt"),
  },
};

export default myFileContent;
```

### Implémentation CommonJS

```javascript fileName="**/*.content.cjs" contentDeclarationFormat="commonjs"
const { file } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const myFileContent = {
  key: "my_key",
  content: {
    myFile: file("./path/to/file.txt"),
  },
};

module.exports = myFileContent;
```

### Configuration JSON

```json5 fileName="**/*.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "my_key",
  "content": {
    "myFile": {
      "nodeType": "file",
      "value": "./path/to/file.txt",
    },
  },
}
```

## Utilisation du Contenu de Fichier dans React Intlayer

Pour utiliser le contenu intégré d'un fichier dans un composant React, importez et utilisez le hook `useIntlayer` du package `react-intlayer`. Cela permet de récupérer le contenu à partir de la clé spécifiée et de l'afficher dynamiquement.

```tsx fileName="**/*.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

const FileComponent: FC = () => {
  const { myFile } = useIntlayer("my_key");

  return (
    <div>
      <pre>{myFile}</pre>
    </div>
  );
};

export default FileComponent;
```

```javascript fileName="**/*.mjx" codeFormat="esm"
import { useIntlayer } from "react-intlayer";

const FileComponent = () => {
  const { myFile } = useIntlayer("my_key");

  return (
    <div>
      <pre>{myFile}</pre>
    </div>
  );
};

export default FileComponent;
```

```javascript fileName="**/*.cjs" codeFormat="commonjs"
const { useIntlayer } = require("react-intlayer");

const FileComponent = () => {
  const { myFile } = useIntlayer("my_key");

  return (
    <div>
      <pre>{myFile}</pre>
    </div>
  );
};

module.exports = FileComponent;
```

## Exemple de Markdown Multilingue

Pour prendre en charge des fichiers Markdown éditables multilingues, vous pouvez utiliser `file` en combinaison avec `t()` et `md()` pour définir différentes versions linguistiques d'un fichier de contenu Markdown.

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
import { file, t, md, type Dictionary } from "intlayer";

const myMultilingualContent = {
  key: "my_multilingual_key",
  content: {
    myContent: md(
      t({
        fr: file("src/components/test.fr.md"),
        en: file("src/components/test.en.md"),
        es: file("src/components/test.es.md"),
      })
    ),
  },
} satisfies Dictionary;

export default myMultilingualContent;
```

```javascript fileName="**/*.content.mjs" contentDeclarationFormat="esm"
import { file, t, md } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const myMultilingualContent = {
  key: "my_multilingual_key",
  content: {
    myContent: md(
      t({
        fr: file("src/components/test.fr.md"),
        en: file("src/components/test.en.md"),
        es: file("src/components/test.es.md"),
      })
    ),
  },
};

export default myMultilingualContent;
```

```javascript fileName="**/*.content.cjs" contentDeclarationFormat="commonjs"
const { file, t, md } = require("intlayer");

const myMultilingualContent = {
  key: "my_multilingual_key",
  content: {
    myContent: md(
      t({
        fr: file("src/components/test.fr.md"),
        en: file("src/components/test.en.md"),
        es: file("src/components/test.es.md"),
      })
    ),
  },
};
```

Cette configuration permet de récupérer dynamiquement le contenu en fonction de la préférence linguistique de l'utilisateur. Lorsqu'il est utilisé dans l'éditeur visuel ou le CMS d'Intlayer, le système reconnaît que le contenu provient des fichiers Markdown spécifiés et garantit qu'ils restent éditables.

## Comment Intlayer Gère le Contenu des Fichiers

La fonction `file` est basée sur le module `fs` de Node.js pour lire le contenu du fichier spécifié et l'insérer dans le dictionnaire. Lorsqu'elle est utilisée avec l'éditeur visuel ou le CMS d'Intlayer, Intlayer peut suivre la relation entre le dictionnaire et le fichier. Cela permet à Intlayer de :

- Reconnaître que le contenu provient d'un fichier spécifique.
- Mettre à jour automatiquement le contenu du dictionnaire lorsque le fichier lié est modifié.
- Assurer la synchronisation entre le fichier et le dictionnaire, préservant l'intégrité du contenu.

## Ressources Supplémentaires

Pour plus de détails sur la configuration et l'utilisation de l'intégration de fichiers dans Intlayer, consultez les ressources suivantes :

- [Documentation CLI Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/fr/intlayer_cli.md)
- [Documentation React Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/fr/intlayer_with_create_react_app.md)
- [Documentation Next Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/fr/intlayer_with_nextjs_15.md)
- [Documentation Contenu Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/fr/dictionary/markdown.md)
- [Documentation Contenu de Traduction](https://github.com/aymericzip/intlayer/blob/main/docs/fr/dictionary/translation.md)

Ces ressources fournissent des informations supplémentaires sur l'intégration de fichiers, la gestion de contenu et l'intégration d'Intlayer avec divers frameworks.
