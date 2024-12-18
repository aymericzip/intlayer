# Documentazione: `getTranslationContent` Funzione in `intlayer`

## Descrizione:

La funzione `getTranslationContent` recupera il contenuto corrispondente a una specifica locale da un insieme di contenuti linguistici personalizzabili. Se la locale specificata non viene trovata, restituisce di default il contenuto per la locale predefinita configurata nel progetto.

## Parametri:

- `languageContent: CustomizableLanguageContent<Content>`

  - **Descrizione**: Un oggetto contenente traduzioni per varie locali. Ogni chiave rappresenta una locale e il suo valore è il contenuto corrispondente.
  - **Tipo**: `CustomizableLanguageContent<Content>`
    - `Content` può essere di qualsiasi tipo, predefinito a `string`.

- `locale: Locales`

  - **Descrizione**: La locale per la quale deve essere recuperato il contenuto.
  - **Tipo**: `Locales`

## Restituisce:

- **Tipo**: `Content`
- **Descrizione**: Il contenuto corrispondente alla locale specificata. Se la locale non viene trovata, viene restituito il contenuto della locale predefinita.

## Esempio di Utilizzo:

### Utilizzo di Base:

```typescript
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

### Locale Mancante:

```typescript
import { getTranslationContent, Locales } from "intlayer";

const content = getTranslationContent(
  {
    en: "Hello",
    fr: "Bonjour",
  },
  Locales.SPANISH
);

console.log(content); // Output: "Hello" (contenuto della locale predefinita)
```

### Utilizzo di Tipi di Contenuto Personalizzati:

```typescript
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

## Casi Limite:

- **Locale Non Trovata:**
  - Quando la `locale` non viene trovata in `languageContent`, la funzione restituisce il contenuto per la locale predefinita.
- **Contenuto Linguistico Incompleto:**

  - Se una locale è parzialmente definita, la funzione non unisce i contenuti. Recupera rigorosamente il valore della locale specificata o ricade nel valore predefinito.

- **Forzatura TypeScript:**
  - Se le locali in `languageContent` non corrispondono alla configurazione del progetto, TypeScript impone che tutte le locali richieste siano definite, assicurando che il contenuto sia completo e sicuro per il tipo.

**Link alle documentazioni:**

- [getTranslationContent Function](https://github.com/aymericzip/intlayer/blob/main/docs/it/getTranslationContent.md)
