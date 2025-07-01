---
docName: package__intlayer__getTranslationContent
url: https://intlayer.org/doc/package/intlayer/getTranslationContent
githubUrl: https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/intlayer/getTranslationContent.md
createdAt: 2025-02-07
updatedAt: 2025-06-29
title: Funzione getTranslation - Documentazione JavaScript di Intlayer
description: Documentazione per la funzione getTranslation in Intlayer, che recupera contenuti localizzati per specifici locali con fallback al locale predefinito.
keywords:
  - getTranslation
  - intlayer
  - funzione
  - localizzazione
  - i18n
  - JavaScript
  - traduzione
  - locale
---

# Documentazione: Funzione `getTranslation` in `intlayer`

## Descrizione

La funzione `getTranslation` recupera il contenuto corrispondente a un locale specifico da un insieme di contenuti linguistici personalizzabili. Se il locale specificato non viene trovato, restituisce per impostazione predefinita il contenuto del locale predefinito configurato nel progetto.

## Parametri

- `languageContent: CustomizableLanguageContent<Content>`

  - **Descrizione**: Un oggetto contenente traduzioni per vari locali. Ogni chiave rappresenta un locale e il suo valore è il contenuto corrispondente.
  - **Tipo**: `CustomizableLanguageContent<Content>`
    - `Content` può essere di qualsiasi tipo, con valore predefinito `string`.

- `locale: Locales`

  - **Descrizione**: Il locale per cui si desidera recuperare il contenuto.
  - **Tipo**: `Locales`

## Ritorna

- **Tipo**: `Content`
- **Descrizione**: Il contenuto corrispondente al locale specificato. Se il locale non viene trovato, viene restituito il contenuto del locale predefinito.

## Esempio di utilizzo

### Utilizzo base

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

### Locale Mancante:

```typescript codeFormat="typescript"
import { getTranslation, Locales } from "intlayer";

const content = getTranslation(
  {
    en: "Hello",
    fr: "Bonjour",
  },
  Locales.SPANISH
);

console.log(content); // Output: "Hello" (contenuto del locale predefinito)
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

console.log(content); // Output: "Hello" (contenuto del locale predefinito)
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

console.log(content); // Output: "Hello" (contenuto del locale predefinito)
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

- **Locale Non Trovato:**
  - Quando il `locale` non è presente in `languageContent`, la funzione restituisce il contenuto del locale predefinito.
- **Contenuto Linguistico Incompleto:**
  - Se un locale è definito parzialmente, la funzione non unisce i contenuti. Recupera strettamente il valore del locale specificato o ricade sul predefinito.
- **Applicazione di TypeScript:**
  - Se i locali in `languageContent` non corrispondono alla configurazione del progetto, TypeScript imporrà che tutti i locali richiesti siano definiti, garantendo che il contenuto sia completo e sicuro dal punto di vista del tipo.

## Cronologia della Documentazione

- 5.5.10 - 2025-06-29: Inizio cronologia
