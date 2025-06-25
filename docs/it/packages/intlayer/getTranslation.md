---
docName: package__intlayer__getTranslation
url: https://intlayer.org/doc/packages/intlayer/getTranslation
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/en/packages/intlayer/getTranslation.md
createdAt: 2024-08-11
updatedAt: 2024-08-11
title: Documentazione della funzione getTranslation | intlayer
description: Scopri come utilizzare la funzione getTranslation per il pacchetto intlayer
keywords:
  - getTranslation
  - traduzione
  - Intlayer
  - intlayer
  - internazionalizzazione
  - documentazione
  - Next.js
  - JavaScript
  - React
---

# Documentazione: Funzione `getTranslationContent` in `intlayer`

## Descrizione

La funzione `getTranslationContent` recupera il contenuto corrispondente a una specifica lingua da un set di contenuti linguistici personalizzabili. Se la lingua specificata non viene trovata, restituisce il contenuto della lingua predefinita configurata nel progetto.

## Parametri

- `languageContent: CustomizableLanguageContent<Content>`

  - **Descrizione**: Un oggetto contenente traduzioni per varie lingue. Ogni chiave rappresenta una lingua e il suo valore è il contenuto corrispondente.
  - **Tipo**: `CustomizableLanguageContent<Content>`
    - `Content` può essere di qualsiasi tipo, predefinito a `string`.

- `locale: Locales`

  - **Descrizione**: La lingua per cui recuperare il contenuto.
  - **Tipo**: `Locales`

## Ritorni

- **Tipo**: `Content`
- **Descrizione**: Il contenuto corrispondente alla lingua specificata. Se la lingua non viene trovata, viene restituito il contenuto della lingua predefinita.

## Esempio di utilizzo

### Utilizzo base

```typescript codeFormat="typescript"
import { getTranslationContent, Locales } from "intlayer";

const content = getTranslationContent(
  {
    en: "Hello",
    fr: "Bonjour",
  },
  Locales.ENGLISH
);

console.log(content); // Output: "Bonjour"
```

```javascript codeFormat="esm"
import { getTranslationContent, Locales } from "intlayer";

const content = getTranslationContent(
  {
    en: "Hello",
    fr: "Bonjour",
  },
  Locales.ENGLISH
);

console.log(content); // Output: "Bonjour"
```

```javascript codeFormat="commonjs"
const { getTranslationContent, Locales } = require("intlayer");

const content = getTranslationContent(
  {
    en: "Hello",
    fr: "Bonjour",
  },
  Locales.ENGLISH
);

console.log(content); // Output: "Bonjour"
```

### Lingua mancante:

```typescript codeFormat="typescript"
import { getTranslationContent, Locales } from "intlayer";

const content = getTranslationContent(
  {
    en: "Hello",
    fr: "Bonjour",
  },
  Locales.SPANISH
);

console.log(content); // Output: "Hello" (contenuto della lingua predefinita)
```

```javascript codeFormat="esm"
import { getTranslationContent, Locales } from "intlayer";

const content = getTranslationContent(
  {
    en: "Hello",
    fr: "Bonjour",
  },
  Locales.SPANISH
);

console.log(content); // Output: "Hello" (contenuto della lingua predefinita)
```

```javascript codeFormat="commonjs"
const { getTranslationContent, Locales } = require("intlayer");

const content = getTranslationContent(
  {
    en: "Hello",
    fr: "Bonjour",
  },
  Locales.SPANISH
);

console.log(content); // Output: "Hello" (contenuto della lingua predefinita)
```

### Utilizzo di tipi di contenuto personalizzati:

```typescript codeFormat="typescript"
import { getTranslationContent, Locales } from "intlayer";

const customContent = getTranslationContent<Record<string, string>>(
  {
    en: { greeting: "Hello" },
    fr: { greeting: "Bonjour" },
  },
  Locales.FRENCH
);

console.log(customContent.greeting); // Output: "Bonjour"
```

```javascript codeFormat="esm"
import { getTranslationContent, Locales } from "intlayer";

const customContent = getTranslationContent<Record<string, string>>(
  {
    en: { greeting: "Hello" },
    fr: { greeting: "Bonjour" },
  },
  Locales.FRENCH
);

console.log(customContent.greeting); // Output: "Bonjour"
```

```javascript codeFormat="commonjs"
const { getTranslationContent, Locales } = require("intlayer");

const customContent = getTranslationContent<Record<string, string>>(
  {
    en: { greeting: "Hello" },
    fr: { greeting: "Bonjour" },
  },
  Locales.FRENCH
);

console.log(customContent.greeting); // Output: "Bonjour"
```

## Casi limite

- **Lingua non trovata:**
  - Quando la `locale` non viene trovata in `languageContent`, la funzione restituisce il contenuto della lingua predefinita.
- **Contenuto linguistico incompleto:**
  - Se una lingua è definita parzialmente, la funzione non unisce i contenuti. Recupera rigorosamente il valore della lingua specificata o torna alla lingua predefinita.
- **Applicazione di TypeScript:**
  - Se le lingue in `languageContent` non corrispondono alla configurazione del progetto, TypeScript imporrà che tutte le lingue richieste siano definite, garantendo che il contenuto sia completo e sicuro per il tipo.
