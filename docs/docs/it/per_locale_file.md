---
createdAt: 2025-04-18
updatedAt: 2025-06-29
title: Dichiarazione di Contenuto `Per-Locale` in Intlayer
description: Scopri come dichiarare contenuti per locale in Intlayer. Segui la documentazione per comprendere i diversi formati e casi d'uso.
keywords:
  - Internazionalizzazione
  - Documentazione
  - Intlayer
  - Per-Locale
  - TypeScript
  - JavaScript
slugs:
  - doc
  - concept
  - per-locale-file
---

# Dichiarazione di Contenuto `Per-Locale` in Intlayer

Intlayer supporta due modi per dichiarare contenuti multilingue:

- Un singolo file con tutte le traduzioni
- Un file per ogni locale (formato per-locale)

Questa flessibilità consente:

- Migrazione semplice da altri strumenti i18n
- Supporto per flussi di lavoro di traduzione automatizzata
- Organizzazione chiara delle traduzioni in file separati e specifici per locale

## Singolo File con Traduzioni Multiple

Questo formato è ideale per:

- Iterazioni rapide nel codice.
- Integrazione senza soluzione di continuità con il CMS.

Questo è l'approccio consigliato per la maggior parte dei casi d'uso. Centralizza le traduzioni, rendendo facile iterare e integrare con il CMS.

```tsx fileName="hello-world.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const helloWorldContent = {
  key: "hello-world",
  content: {
    multilingualContent: t({
      en: "Title of my component",
      es: "Título de mi componente",
    }),
  },
} satisfies Dictionary;

export default helloWorldContent;
```

```js fileName="hello-world.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
// Contenuto per "hello-world" con traduzioni multiple
const helloWorldContent = {
  key: "hello-world",
  content: {
    multilingualContent: t({
      en: "Title of my component",
      es: "Título de mi componente",
    }),
  },
};

export default helloWorldContent;
```

```js fileName="hello-world.content.cjs" contentDeclarationFormat="json"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
// Contenuto per "hello-world" con traduzioni multiple
const helloWorldContent = {
  key: "hello-world",
  content: {
    multilingualContent: t({
      en: "Title of my component",
      es: "Título de mi componente",
    }),
  },
};

module.exports = helloWorldContent;
```

```json fileName="hello-world.content.ts" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "hello-world",
  "content": {
    "multilingualContent": {
      "nodeType": "translation",
      "translation": {
        "en": "Title of my component",
        "es": "Título de mi componente"
      }
    }
  }
}
```

> Consigliato: questo formato è il migliore quando si utilizza l'editor visuale di Intlayer o si gestiscono le traduzioni direttamente nel codice.

## Formato per Locale

Questo formato è utile quando:

- Vuoi versionare o sovrascrivere le traduzioni in modo indipendente.
- Stai integrando flussi di lavoro di traduzione automatica o umana.

Puoi anche suddividere le traduzioni in file di locale individuali specificando il campo locale:

```tsx fileName="hello-world.en.content.ts" contentDeclarationFormat="typescript"
import { t, Locales, type Dictionary } from "intlayer";

const helloWorldContent = {
  key: "hello-world",
  locale: Locales.ENGLISH, // Importante
  content: { multilingualContent: "Titolo del mio componente" },
} satisfies Dictionary;

export default helloWorldContent;
```

```tsx fileName="hello-world.es.content.ts" contentDeclarationFormat="typescript"
import { t, Locales, type Dictionary } from "intlayer";

const helloWorldContent = {
  key: "hello-world",
  locale: Locales.SPANISH, // Importante
  content: { multilingualContent: "Título de mi componente" },
} satisfies Dictionary;

export default helloWorldContent;
```

```js fileName="hello-world.en.content.mjs" contentDeclarationFormat="esm"
import { t, Locales } from "intlayer";

/** @type {import('intlayer').Dictionary} */
// Dizionario contenuti per "hello-world" in inglese
const helloWorldContent = {
  key: "hello-world",
  locale: Locales.ENGLISH, // Importante
  content: { multilingualContent: "Titolo del mio componente" },
};

export default helloWorldContent;
```

```tsx fileName="hello-world.es.content.mjs" contentDeclarationFormat="esm"
import { t, Locales } from "intlayer";

/** @type {import('intlayer').Dictionary} */
// Dizionario contenuti per "hello-world" in spagnolo
const helloWorldContent = {
  key: "hello-world",
  locale: Locales.SPANISH, // Importante
  content: { multilingualContent: "Título de mi componente" },
};

export default helloWorldContent;
```

```js fileName="hello-world.en.content.cjs" contentDeclarationFormat="commonjs"
const { t, Locales } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const helloWorldContent = {
  key: "hello-world",
  locale: Locales.ENGLISH, // Importante
  content: {
    multilingualContent: "Titolo del mio componente",
  },
};

module.exports = helloWorldContent;
```

```tsx fileName="hello-world.es.content.cjs" contentDeclarationFormat="commonjs"
const { t, Locales } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const helloWorldContent = {
  key: "hello-world",
  locale: Locales.SPANISH, // Importante
  content: {
    multilingualContent: "Título de mi componente",
  },
};

module.exports = helloWorldContent;
```

```json5 fileName="hello-world.en.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "hello-world",
  "locale": "en", // Importante
  "content": {
    "multilingualContent": "Titolo del mio componente",
  },
}
```

```json5 fileName="hello-world.es.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "hello-world",
  "locale": "es", // Importante
  "content": {
    "multilingualContent": "Título de mi componente",
  },
}
```

> Importante: Assicurati che il campo locale sia definito. Indica a Intlayer quale lingua rappresenta il file.

> Nota: In entrambi i casi, il file di dichiarazione del contenuto deve seguire il modello di denominazione `*.content.{ts,tsx,js,jsx,mjs,cjs,json}` per essere riconosciuto da Intlayer. Il suffisso `.[locale]` è opzionale ed è usato solo come convenzione di denominazione.

## Mescolare Formati

Puoi combinare entrambi gli approcci di dichiarazione per la stessa chiave di contenuto. Per esempio:

- Dichiara il tuo contenuto base staticamente in un file come index.content.ts.
- Aggiungi o sovrascrivi traduzioni specifiche in file separati come index.fr.content.ts o index.content.json.

Questa configurazione è particolarmente utile quando:

- Vuoi definire la struttura iniziale del contenuto nel codice.
- Hai intenzione di arricchire o completare le traduzioni successivamente utilizzando il CMS o strumenti automatizzati.

```bash codeFormat="typescript"
.
└── Components
    └── MyComponent
        ├── index.content.ts
        ├── index.content.json
        └── index.ts
```

### Esempio

Ecco un file di dichiarazione di contenuto multilingue:

```tsx fileName="Components/MyComponent/index.content.ts"
import { t, type Dictionary } from "intlayer";

const helloWorldContent = {
  key: "hello-world",
  locale: Locales.ENGLISH,
  content: {
    multilingualContent: "Titolo del mio componente",
    projectName: "Il mio progetto",
  },
} satisfies Dictionary;

export default helloWorldContent;
```

```json fileName="Components/MyComponent/index.content.json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "hello-world",
  "content": {
    "multilingualContent": {
      "nodeType": "translation",
      "translation": {
        "fr": "Titre de mon composant",
        "es": "Título de mi componente"
      }
    }
  }
}
```

Intlayer unisce automaticamente i file multilingue e per locale.

```tsx fileName="Components/MyComponent/index.ts"
import { getIntlayer, Locales } from "intlayer";

const intlayer = getIntlayer("hello-world"); // La lingua predefinita è INGLESE, quindi restituirà il contenuto in INGLESE

console.log(JSON.stringify(intlayer, null, 2));
// Risultato:
// {
//  "multilingualContent": "Titolo del mio componente",
//  "projectName": "Il mio progetto"
// }

const intlayer = getIntlayer("hello-world", Locales.SPANISH);

console.log(JSON.stringify(intlayer, null, 2));
// Risultato:
// {
//  "multilingualContent": "Título de mi componente",
//  "projectName": "Il mio progetto"
// }

const intlayer = getIntlayer("hello-world", Locales.FRENCH);

console.log(JSON.stringify(intlayer, null, 2));
// Risultato:
// {
//  "multilingualContent": "Titre de mon composant",
//  "projectName": "Il mio progetto"
// }
```

### Generazione Automatica delle Traduzioni

### Generazione Automatica delle Traduzioni

Usa il [intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/intlayer_cli.md) per compilare automaticamente le traduzioni mancanti basandoti sui servizi che preferisci.

## Cronologia del Documento

- 5.5.10 - 2025-06-29: Inizio cronologia
