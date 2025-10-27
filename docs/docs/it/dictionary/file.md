---
createdAt: 2025-03-13
updatedAt: 2025-06-29
title: File
description: Scopri come incorporare file esterni nel tuo dizionario di contenuti usando la funzione `file`. Questa documentazione spiega come Intlayer collega e gestisce dinamicamente il contenuto dei file.
keywords:
  - File
  - Internazionalizzazione
  - Documentazione
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
    changes: Inizio cronologia
---

# Contenuto File / Incorporare File in Intlayer

## Come Funziona l'Incorporamento dei File

In Intlayer, la funzione `file` permette di incorporare il contenuto di file esterni in un dizionario. Questo approccio garantisce che Intlayer riconosca il file sorgente, consentendo un'integrazione fluida con l'Intlayer Visual Editor e il CMS. A differenza dei metodi diretti come `import`, `require` o la lettura di file con `fs`, l'uso di `file` associa il file al dizionario, permettendo a Intlayer di tracciare e aggiornare dinamicamente il contenuto quando il file viene modificato.

## Configurare il Contenuto del File

Per incorporare il contenuto di un file nel tuo progetto Intlayer, utilizza la funzione `file` in un modulo di contenuto. Di seguito sono riportati esempi che mostrano diverse implementazioni.

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

## Utilizzo del Contenuto del File in React Intlayer

Per utilizzare il contenuto del file incorporato in un componente React, importa e usa l'hook `useIntlayer` dal pacchetto `react-intlayer`. Questo recupera il contenuto dalla chiave specificata e permette di visualizzarlo dinamicamente.

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

Per supportare file Markdown modificabili multilingue, puoi usare `file` in combinazione con `t()` e `md()` per definire diverse versioni linguistiche di un file di contenuto Markdown.

```typescript fileName="**/*.content.ts" contentDeclarationFormat="typescript"
import { file, t, md, type Dictionary } from "intlayer";

const myMultilingualContent = {
  key: "my_multilingual_key",
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
  key: "my_multilingual_key",
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
  key: "my_multilingual_key",
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

Questa configurazione consente di recuperare dinamicamente il contenuto in base alla preferenza linguistica dell'utente. Quando viene utilizzata nell'Intlayer Visual Editor o nel CMS, il sistema riconosce che il contenuto proviene dai file Markdown specificati e garantisce che rimangano modificabili.

## Come Intlayer Gestisce il Contenuto dei File

La funzione `file` si basa sul modulo `fs` di Node.js per leggere il contenuto del file specificato e inserirlo nel dizionario. Quando viene utilizzata in combinazione con l'Intlayer Visual Editor o il CMS, Intlayer può tracciare la relazione tra il dizionario e il file. Questo permette a Intlayer di:

- Riconoscere che il contenuto ha origine da un file specifico.
- Aggiornare automaticamente il contenuto del dizionario quando il file collegato viene modificato.
- Garantire la sincronizzazione tra il file e il dizionario, preservando l'integrità del contenuto.

## Risorse Aggiuntive

Per maggiori dettagli sulla configurazione e l'uso dell'incorporamento di file in Intlayer, fare riferimento alle seguenti risorse:

- [Documentazione CLI di Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_cli.md)
- [Documentazione React Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_with_create_react_app.md)
- [Documentazione Next Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_with_nextjs_15.md)
- [Documentazione Contenuto Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dictionary/markdown.md)
- [Documentazione sul Contenuto di Traduzione](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dictionary/translation.md)

Queste risorse offrono ulteriori approfondimenti sull'incorporamento di file, la gestione dei contenuti e l'integrazione di Intlayer con vari framework.
