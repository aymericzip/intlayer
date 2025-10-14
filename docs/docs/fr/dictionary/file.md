---
createdAt: 2025-03-13
updatedAt: 2025-06-29
title: Fichier
description: Apprenez comment intégrer des fichiers externes dans votre dictionnaire de contenu en utilisant la fonction `file`. Cette documentation explique comment Intlayer lie et gère dynamiquement le contenu des fichiers.
keywords:
  - Fichier
  - Internationalisation
  - Documentation
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - content
  - file
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: Historique initial
---

# Contenu de fichier / Intégration de fichiers dans Intlayer

## Comment fonctionne l'intégration de fichiers

Dans Intlayer, la fonction `file` permet d'intégrer le contenu d'un fichier externe dans un dictionnaire. Cette approche garantit qu'Intlayer reconnaît le fichier source, permettant une intégration fluide avec l'éditeur visuel Intlayer et le CMS. Contrairement aux méthodes directes `import`, `require` ou de lecture de fichier via `fs`, l'utilisation de `file` associe le fichier au dictionnaire, ce qui permet à Intlayer de suivre et de mettre à jour dynamiquement le contenu lorsque le fichier est modifié.

## Configuration du contenu de fichier

Pour intégrer le contenu d'un fichier dans votre projet Intlayer, utilisez la fonction `file` dans un module de contenu. Voici des exemples démontrant différentes implémentations.

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

## Utilisation du contenu de fichier dans React Intlayer

Pour utiliser un contenu de fichier intégré dans un composant React, importez et utilisez le hook `useIntlayer` depuis le paquet `react-intlayer`. Cela permet de récupérer le contenu à partir de la clé spécifiée et de l'afficher dynamiquement.

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

## Exemple de Markdown multilingue

Pour prendre en charge des fichiers Markdown éditables multilingues, vous pouvez utiliser `file` en combinaison avec `t()` et `md()` pour définir différentes versions linguistiques d'un fichier de contenu Markdown.

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
import { file, t, md, type Dictionary } from "intlayer";

const myMultilingualContent = {
  key: "ma_clef_multilingue",
  content: {
    myContent: md(
      t({
        en: file("src/components/test.en.md"),
        fr: file("src/components/test.fr.md"),
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
  key: "ma_clef_multilingue",
  content: {
    myContent: md(
      t({
        en: file("src/components/test.en.md"),
        fr: file("src/components/test.fr.md"),
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
  key: "ma_clef_multilingue",
  content: {
    myContent: md(
      t({
        en: file("src/components/test.en.md"),
        fr: file("src/components/test.fr.md"),
        es: file("src/components/test.es.md"),
      })
    ),
  },
};
```

Cette configuration permet de récupérer dynamiquement le contenu en fonction de la préférence linguistique de l'utilisateur. Lorsqu'elle est utilisée dans l'éditeur visuel Intlayer ou le CMS, le système reconnaît que le contenu provient des fichiers Markdown spécifiés et garantit qu'ils restent modifiables.

## Comment Intlayer gère le contenu des fichiers

La fonction `file` est basée sur le module `fs` de Node.js pour lire le contenu du fichier spécifié et l'insérer dans le dictionnaire. Lorsqu'elle est utilisée en conjonction avec l'éditeur visuel Intlayer ou le CMS, Intlayer peut suivre la relation entre le dictionnaire et le fichier. Cela permet à Intlayer de :

- Reconnaître que le contenu provient d'un fichier spécifique.
- Mettre automatiquement à jour le contenu du dictionnaire lorsque le fichier lié est modifié.
- Assurer la synchronisation entre le fichier et le dictionnaire, préservant ainsi l'intégrité du contenu.

## Ressources supplémentaires

Pour plus de détails sur la configuration et l'utilisation de l'intégration de fichiers dans Intlayer, consultez les ressources suivantes :

- [Documentation CLI Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_cli.md)
- [Documentation React Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_with_create_react_app.md)
- [Documentation Next Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/intlayer_with_nextjs_15.md)
- [Documentation Contenu Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dictionary/markdown.md)
- [Documentation du contenu de traduction](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dictionary/translation.md)

Ces ressources offrent des informations complémentaires sur l'intégration de fichiers, la gestion de contenu et l'intégration d'Intlayer avec divers frameworks.
