# Documentazione: Funzione `getTranslation` in `intlayer`

## Descrizione

La funzione `getTranslation` recupera il contenuto corrispondente a una specifica lingua da un set di contenuti linguistici personalizzabili. Se la lingua specificata non viene trovata, restituisce il contenuto della lingua predefinita configurata nel progetto.

## Parametri

- `languageContent: CustomizableLanguageContent<Content>`

  - **Descrizione**: Un oggetto contenente traduzioni per varie lingue. Ogni chiave rappresenta una lingua, e il suo valore è il contenuto corrispondente.
  - **Tipo**: `CustomizableLanguageContent<Content>`
    - `Content` può essere di qualsiasi tipo, predefinito come `string`.

- `locale: Locales`

  - **Descrizione**: La lingua per cui recuperare il contenuto.
  - **Tipo**: `Locales`

## Restituisce

- **Tipo**: `Content`
- **Descrizione**: Il contenuto corrispondente alla lingua specificata. Se la lingua non viene trovata, viene restituito il contenuto della lingua predefinita.

## Esempio di Utilizzo

### Utilizzo Base

```typescript codeFormat="typescript"
import { getTranslation, Locales } from "intlayer";

const content = getTranslation(
  {
    en: "Hello",
    fr: "Bonjour",
  },
  Locales.ENGLISH
);

console.log(content); // Output: "Bonjour"
```

```javascript codeFormat="esm"
import { getTranslation, Locales } from "intlayer";

const content = getTranslation(
  {
    en: "Hello",
    fr: "Bonjour",
  },
  Locales.ENGLISH
);

console.log(content); // Output: "Bonjour"
```

```javascript codeFormat="commonjs"
const { getTranslation, Locales } = require("intlayer");

const content = getTranslation(
  {
    en: "Hello",
    fr: "Bonjour",
  },
  Locales.ENGLISH
);

console.log(content); // Output: "Bonjour"
```

### Lingua Mancante:

```typescript codeFormat="typescript"
import { getTranslation, Locales } from "intlayer";

const content = getTranslation(
  {
    en: "Hello",
    fr: "Bonjour",
  },
  Locales.SPANISH
);

console.log(content); // Output: "Hello" (contenuto della lingua predefinita)
```

```javascript codeFormat="esm"
import { getTranslation, Locales } from "intlayer";

const content = getTranslation(
  {
    en: "Hello",
    fr: "Bonjour",
  },
  Locales.SPANISH
);

console.log(content); // Output: "Hello" (contenuto della lingua predefinita)
```

```javascript codeFormat="commonjs"
const { getTranslation, Locales } = require("intlayer");

const content = getTranslation(
  {
    en: "Hello",
    fr: "Bonjour",
  },
  Locales.SPANISH
);

console.log(content); // Output: "Hello" (contenuto della lingua predefinita)
```

### Utilizzo di Tipi di Contenuto Personalizzati:

```typescript codeFormat="typescript"
import { getTranslation, Locales } from "intlayer";

const customContent = getTranslation<Record<string, string>>(
  {
    en: { greeting: "Hello" },
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
    en: { greeting: "Hello" },
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
    en: { greeting: "Hello" },
    fr: { greeting: "Bonjour" },
  },
  Locales.FRENCH
);

console.log(customContent.greeting); // Output: "Bonjour"
```

## Casi Limite

- **Lingua Non Trovata:**
  - Quando la `locale` non viene trovata in `languageContent`, la funzione restituisce il contenuto della lingua predefinita.
- **Contenuto Linguistico Incompleto:**
  - Se una lingua è definita parzialmente, la funzione non unisce i contenuti. Recupera strettamente il valore della lingua specificata o ricade sulla lingua predefinita.
- **Enforcement di TypeScript:**
  - Se le lingue in `languageContent` non corrispondono alla configurazione del progetto, TypeScript richiederà che tutte le lingue necessarie siano definite, garantendo che il contenuto sia completo e sicuro per il tipo.
