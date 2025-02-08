# Documentation: `getTranslation` Funzione in `intlayer`

## Descrizione:

La funzione `getTranslation` recupera il contenuto corrispondente a una specifica locale da un insieme di contenuti linguistici personalizzabili. Se la locale specificata non viene trovata, restituisce per impostazione predefinita il contenuto per la locale predefinita configurata nel progetto.

## Parametri:

- `languageContent: CustomizableLanguageContent<Content>`

  - **Descrizione**: Un oggetto contenente traduzioni per varie localizzazioni. Ogni chiave rappresenta una locale e il suo valore è il contenuto corrispondente.
  - **Tipo**: `CustomizableLanguageContent<Content>`
    - `Content` può essere di qualsiasi tipo, predefinito a `string`.

- `locale: Locales`

  - **Descrizione**: La locale per la quale il contenuto deve essere recuperato.
  - **Tipo**: `Locales`

## Restituisce:

- **Tipo**: `Content`
- **Descrizione**: Il contenuto corrispondente alla locale specificata. Se la locale non viene trovata, viene restituito il contenuto della locale predefinita.

## Esempio di Utilizzo:

### Utilizzo Base:

```typescript codeFormat="typescript"
import { getTranslation, Locales } from "intlayer";

const content = getTranslation(
  {
    it: "Ciao",
    fr: "Bonjour",
  },
  Locales.ITALIAN
);

console.log(content); // Output: "Bonjour"
```

```javascript codeFormat="esm"
import { getTranslation, Locales } from "intlayer";

const content = getTranslation(
  {
    it: "Ciao",
    fr: "Bonjour",
  },
  Locales.ITALIAN
);

console.log(content); // Output: "Bonjour"
```

```javascript codeFormat="commonjs"
const { getTranslation, Locales } = require("intlayer");

const content = getTranslation(
  {
    it: "Ciao",
    fr: "Bonjour",
  },
  Locales.ITALIAN
);

console.log(content); // Output: "Bonjour"
```

### Locale Mancante:

```typescript codeFormat="typescript"
import { getTranslation, Locales } from "intlayer";

const content = getTranslation(
  {
    it: "Ciao",
    fr: "Bonjour",
  },
  Locales.SPANISH
);

console.log(content); // Output: "Ciao" (contenuto della locale predefinita)
```

```javascript codeFormat="esm"
import { getTranslation, Locales } from "intlayer";

const content = getTranslation(
  {
    it: "Ciao",
    fr: "Bonjour",
  },
  Locales.SPANISH
);

console.log(content); // Output: "Ciao" (contenuto della locale predefinita)
```

```javascript codeFormat="commonjs"
const { getTranslation, Locales } = require("intlayer");

const content = getTranslation(
  {
    it: "Ciao",
    fr: "Bonjour",
  },
  Locales.SPANISH
);

console.log(content); // Output: "Ciao" (contenuto della locale predefinita)
```

### Utilizzo di Tipi di Contenuto Personalizzati:

```typescript codeFormat="typescript"
import { getTranslation, Locales } from "intlayer";

const customContent = getTranslation<Record<string, string>>(
  {
    it: { greeting: "Ciao" },
    fr: { greeting: "Bonjour" },
  },
  Locales.FRENCH
);

console.log(customContent.greeting); // Output: "Bonjour"
```

```javascript codeFormat="esm"
import { getTranslation, Locales } from "intlayer";

const customContent = getTranslation<Record<string, string>>(
  {
    it: { greeting: "Ciao" },
    fr: { greeting: "Bonjour" },
  },
  Locales.FRENCH
);

console.log(customContent.greeting); // Output: "Bonjour"
```

```javascript codeFormat="commonjs"
const { getTranslation, Locales } = require("intlayer");

const customContent = getTranslation<Record<string, string>>(
  {
    it: { greeting: "Ciao" },
    fr: { greeting: "Bonjour" },
  },
  Locales.FRENCH
);

console.log(customContent.greeting); // Output: "Bonjour"
```

## Casi Limite:

- **Locale Non Trovata:**
  - Quando la `locale` non viene trovata in `languageContent`, la funzione restituisce il contenuto per la locale predefinita.
- **Contenuto Linguistico Incompleto:**

  - Se una locale è parzialmente definita, la funzione non unisce i contenuti. Recupera rigorosamente il valore della locale specificata o torna alla predefinita.

- **Conformità TypeScript:**
  - Se le localizzazioni in `languageContent` non corrispondono alla configurazione del progetto, TypeScript impone che tutte le localizzazioni richieste siano definite, garantendo che il contenuto sia completo e sicuro dal punto di vista del tipo.
