---
docName: dictionary__file
url: https://intlayer.org/doc/concept/content/file
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/en/dictionary/file.md
createdAt: 2025-03-13
updatedAt: 2025-03-13
title: File
description: Scopri come incorporare file esterni nel tuo dizionario di contenuti utilizzando la funzione `file`. Questa documentazione spiega come Intlayer collega e gestisce dinamicamente il contenuto dei file.
keywords:
  - File
  - Internazionalizzazione
  - Documentazione
  - Intlayer
  - Next.js
  - JavaScript
  - React
---

## Come Funziona l'Incorporazione dei File

In Intlayer, la funzione `file` consente di incorporare il contenuto di file esterni in un dizionario. Questo approccio garantisce che Intlayer riconosca il file sorgente, consentendo un'integrazione senza soluzione di continuità con l'Editor Visivo e il CMS di Intlayer. A differenza dei metodi diretti di lettura dei file come `import`, `require` o `fs`, l'uso di `file` associa il file al dizionario, permettendo a Intlayer di tracciare e aggiornare dinamicamente il contenuto quando il file viene modificato.

## Configurazione del Contenuto del File

Per incorporare il contenuto di un file nel tuo progetto Intlayer, utilizza la funzione `file` in un modulo di contenuto. Di seguito sono riportati esempi che dimostrano diverse implementazioni.

### Implementazione in TypeScript

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

### Implementazione in ECMAScript Module (ESM)

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

### Implementazione in CommonJS

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

### Configurazione in JSON

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

## Utilizzo del Contenuto del File in React Intlayer

Per utilizzare il contenuto incorporato del file in un componente React, importa e utilizza il hook `useIntlayer` dal pacchetto `react-intlayer`. Questo recupera il contenuto dalla chiave specificata e consente di visualizzarlo dinamicamente.

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

## Esempio di Markdown Multilingue

Per supportare file Markdown multilingue modificabili, puoi utilizzare `file` in combinazione con `t()` e `md()` per definire diverse versioni linguistiche di un file di contenuto Markdown.

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
import { file, t, md, type Dictionary } from "intlayer";

const myMultilingualContent = {
  key: "my_multilingual_key",
  content: {
    myContent: md(
      t({
        it: file("src/components/test.it.md"),
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
  key: "my_multilingual_key",
  content: {
    myContent: md(
      t({
        it: file("src/components/test.it.md"),
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
  key: "my_multilingual_key",
  content: {
    myContent: md(
      t({
        it: file("src/components/test.it.md"),
        en: file("src/components/test.en.md"),
        fr: file("src/components/test.fr.md"),
        es: file("src/components/test.es.md"),
      })
    ),
  },
};
```

Questa configurazione consente di recuperare dinamicamente il contenuto in base alla preferenza linguistica dell'utente. Quando utilizzato nell'Editor Visivo o nel CMS di Intlayer, il sistema riconoscerà che il contenuto proviene dai file Markdown specificati e garantirà che rimangano modificabili.

## Come Intlayer Gestisce il Contenuto dei File

La funzione `file` si basa sul modulo `fs` di Node.js per leggere il contenuto del file specificato e inserirlo nel dizionario. Quando utilizzata in combinazione con l'Editor Visivo o il CMS di Intlayer, Intlayer può tracciare la relazione tra il dizionario e il file. Questo consente a Intlayer di:

- Riconoscere che il contenuto proviene da un file specifico.
- Aggiornare automaticamente il contenuto del dizionario quando il file collegato viene modificato.
- Garantire la sincronizzazione tra il file e il dizionario, preservando l'integrità del contenuto.

## Risorse Aggiuntive

Per ulteriori dettagli sulla configurazione e l'utilizzo dell'incorporazione dei file in Intlayer, consulta le seguenti risorse:

- [Documentazione CLI di Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/it/intlayer_cli.md)
- [Documentazione React Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/it/intlayer_with_create_react_app.md)
- [Documentazione Next Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/it/intlayer_with_nextjs_15.md)
- [Documentazione Contenuto Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/it/dictionary/markdown.md)
- [Documentazione Contenuto Traduzione](https://github.com/aymericzip/intlayer/blob/main/docs/it/dictionary/translation.md)

Queste risorse forniscono ulteriori approfondimenti sull'incorporazione dei file, la gestione dei contenuti e l'integrazione di Intlayer con vari framework.
