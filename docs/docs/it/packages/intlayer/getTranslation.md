---
docName: package__intlayer__getTranslation
url: https://intlayer.org/doc/packages/intlayer/getTranslation
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/intlayer/getTranslation.md
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: Documentazione della funzione getTranslation | intlayer
description: Scopri come utilizzare la funzione getTranslation per il pacchetto intlayer
keywords:
  - getTranslation
  - traduzione
  - Intlayer
  - intlayer
  - Internazionalizzazione
  - Documentazione
  - Next.js
  - JavaScript
  - React
---

# Documentazione: Funzione `getTranslationContent` in `intlayer`

## Descrizione

La funzione `getTranslationContent` recupera il contenuto corrispondente a una specifica localizzazione da un insieme di contenuti linguistici personalizzabili. Se la localizzazione specificata non viene trovata, restituisce per impostazione predefinita il contenuto della localizzazione predefinita configurata nel progetto.

## Parametri

- `languageContent: CustomizableLanguageContent<Content>`

  - **Descrizione**: Un oggetto contenente traduzioni per varie localizzazioni. Ogni chiave rappresenta una localizzazione e il suo valore è il contenuto corrispondente.
  - **Tipo**: `CustomizableLanguageContent<Content>`
    - `Content` può essere di qualsiasi tipo, con valore predefinito `string`.

- `locale: Locales`

  - **Descrizione**: La localizzazione per cui si desidera recuperare il contenuto.
  - **Tipo**: `Locales`

## Valore restituito

- **Tipo**: `Content`
- **Descrizione**: Il contenuto corrispondente alla localizzazione specificata. Se la localizzazione non viene trovata, viene restituito il contenuto della localizzazione predefinita.

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

  {
    en: "Hello",
    fr: "Bonjour",
  },
  Locales.ENGLISH
);

console.log(content); // Output: "Bonjour"
```

### Localizzazione Mancante:

```typescript codeFormat="typescript"
import { getTranslationContent, Locales } from "intlayer";

const content = getTranslationContent(
  {
    en: "Hello",
    fr: "Bonjour",
  },
  Locales.SPANISH
);

console.log(content); // Output: "Hello" (contenuto della localizzazione predefinita)
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

console.log(content); // Output: "Hello" (contenuto della localizzazione predefinita)
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

console.log(content); // Output: "Hello" (contenuto della localizzazione predefinita)
```

### Uso di Tipi di Contenuto Personalizzati:

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

## Casi Limite

- **Localizzazione Non Trovata:**
  - Quando la `locale` non è trovata in `languageContent`, la funzione restituisce il contenuto per la localizzazione predefinita.
- **Contenuto Linguistico Incompleto:**
  - Se una localizzazione è definita parzialmente, la funzione non unisce i contenuti. Recupera strettamente il valore della localizzazione specificata o ricade su quella predefinita.
- **Applicazione di TypeScript:**
  - Se le localizzazioni in `languageContent` non corrispondono alla configurazione del progetto, TypeScript imporrà che tutte le localizzazioni richieste siano definite, garantendo che il contenuto sia completo e sicuro dal punto di vista del tipo.

## Cronologia del Documento

- 5.5.10 - 2025-06-29: Inizializzazione della cronologia
