# Intlayer supporta due modi per dichiarare contenuti multilingue:

- File unico con tutte le traduzioni
- Un file per locale (formato per-locale)

Questa flessibilità consente:

- Migrazione semplice da altri strumenti i18n
- Supporto per flussi di lavoro di traduzione automatizzati
- Organizzazione chiara delle traduzioni in file separati e specifici per locale

## File Unico con Traduzioni Multiple

Questo formato è ideale per:

- Iterazioni rapide nel codice.
- Integrazione senza problemi con il CMS.

Questo è l'approccio raccomandato per la maggior parte dei casi d'uso. Centralizza le traduzioni, rendendo facile iterare e integrare con il CMS.

```tsx fileName="hello-world.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const helloWorldContent = {
  key: "hello-world",
  content: {
    multilingualContent: t({
      it: "Titolo del mio componente",
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
const helloWorldContent = {
  key: "hello-world",
  content: {
    multilingualContent: t({
      it: "Titolo del mio componente",
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
const helloWorldContent = {
  key: "hello-world",
  content: {
    multilingualContent: t({
      it: "Titolo del mio componente",
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
        "it": "Titolo del mio componente",
        "en": "Title of my component",
        "es": "Título de mi componente"
      }
    }
  }
}
```

> Raccomandato: Questo formato è il migliore quando si utilizza l'editor visivo di Intlayer o si gestiscono le traduzioni direttamente nel codice.

## Formato Per-Locale

Questo formato è utile quando:

- Si desidera versionare o sovrascrivere traduzioni in modo indipendente.
- Si stanno integrando flussi di lavoro di traduzione automatica o manuale.

È possibile anche suddividere le traduzioni in file individuali per locale specificando il campo locale:

```tsx fileName="hello-world.en.content.ts" contentDeclarationFormat="typescript"
import { t, Locales, type Dictionary } from "intlayer";

const helloWorldContent = {
  key: "hello-world",
  locale: Locales.ENGLISH, // Importante
  content: { multilingualContent: "Title of my component" },
} satisfies Dictionary;

export default helloWorldContent;
```

```tsx fileName="hello-world.es.content.ts" contentDeclarationFormat="typescript"
import { t, Locales, type Dictionary } from "intlayer";

const helloWorldContent = {
  key: "hello-world",
  locale: Locales.SPANISH, // Importante
  content: { multilingualContent: "Título de mi componente" },
};
```

```js fileName="hello-world.en.content.mjs" contentDeclarationFormat="esm"
import { t, Locales } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const helloWorldContent = {
  key: "hello-world",
  locale: Locales.ENGLISH, // Importante
  content: { multilingualContent: "Title of my component" },
};

export default helloWorldContent;
```

```tsx fileName="hello-world.en.content.mjs" contentDeclarationFormat="esm"
import { t, Locales } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const helloWorldContent = {
  key: "hello-world",
  locale: Locales.ENGLISH, // Importante
  content: { multilingualContent: "Title of my component" },
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
    multilingualContent: "Title of my component",
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
    "multilingualContent": "Title of my component",
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

> Importante: Assicurarsi che il campo locale sia definito. Indica a Intlayer quale lingua rappresenta il file.

> Nota: In entrambi i casi, il file di dichiarazione del contenuto deve seguire il pattern di denominazione `*.content.{ts,tsx,js,jsx,mjs,cjs,json}` per essere riconosciuto da Intlayer. Il suffisso `.[locale]` è opzionale e utilizzato solo come convenzione di denominazione.

## Formati Misti

È possibile mescolare entrambi gli approcci per la stessa chiave di contenuto. Ad esempio:

Dichiarare contenuti predefiniti o di base staticamente (es. `index.content.ts`)

Aggiungere o sovrascrivere contenuti specifici per locale in `index.content.json`, `index.fr.content.ts`, ecc.

Questo è particolarmente utile quando:

- Si desidera dichiarare il contenuto di base staticamente nel proprio codice e riempire automaticamente con traduzioni nel CMS.

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
    multilingualContent: "Title of my component",
    projectName: "My project",
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
        "it": "Titolo del mio componente",
        "fr": "Titre de mon composant",
        "es": "Título de mi componente"
      }
    }
  }
}
```

Intlayer unisce automaticamente file multilingue e per-locale.

```tsx fileName="Components/MyComponent/index.ts"
import { getIntlayer, Locales } from "intlayer";

const intlayer = getIntlayer("hello-world"); // La lingua predefinita è ENGLISH, quindi restituirà il contenuto in ENGLISH

console.log(JSON.stringify(intlayer, null, 2));
// Risultato:
// {
//  "multilingualContent": "Title of my component",
//  "projectName": "My project"
// }

const intlayer = getIntlayer("hello-world", Locales.SPANISH);

console.log(JSON.stringify(intlayer, null, 2));
// Risultato:
// {
//  "multilingualContent": "Título de mi componente",
//  "projectName": "My project"
// }

const intlayer = getIntlayer("hello-world", Locales.FRENCH);

console.log(JSON.stringify(intlayer, null, 2));
// Risultato:
// {
//  "multilingualContent": "Titre de mon composant",
//  "projectName": "My project"
// }
```

### Generazione Automatica delle Traduzioni

Utilizza il [CLI di Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/it/intlayer_cli.md) per riempire automaticamente le traduzioni mancanti in base ai tuoi servizi preferiti.
