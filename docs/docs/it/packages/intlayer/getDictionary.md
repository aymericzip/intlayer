---
createdAt: 2026-08-23
updatedAt: 2026-08-23
title: Documentazione della Funzione getDictionary | intlayer
description: Scopri come utilizzare la funzione getDictionary per il package intlayer
keywords:
  - getDictionary
  - dictionary
  - interpreter
  - content
  - Intlayer
  - intlayer
  - Internationalization
  - Documentation
  - JavaScript
  - TypeScript
slugs:
  - doc
  - packages
  - intlayer
  - getDictionary
history:
  - version: 9.4.0
    date: 2026-08-23
    changes: "Documentazione iniziale"
author: aymericzip
---

# Documentazione: Funzione `getDictionary` in `intlayer`

## Descrizione

La funzione `getDictionary` interpreta un oggetto dizionario **che passi tu stesso** e restituisce il suo contenuto risolto per una determinata locale. Percorre il contenuto in un singolo passaggio e applica ogni plugin interprete secondo necessità, risolvendo traduzioni `t()`, enumerazioni, condizioni, inserimenti, annidamento, markdown, HTML e nodi di file.

A differenza di [`getIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/intlayer/getIntlayer.md), che cerca un dizionario per chiave nel registro generato, `getDictionary` accetta il dizionario stesso. Questo lo rende lo strumento giusto per contenuti costruiti a runtime, recuperati da un'API o un CMS, o dichiarati inline in un test.

**Caratteristiche principali:**

- Funziona con qualsiasi oggetto che segua la struttura del dizionario (`{ key, content }`)
- Accetta anche un gruppo di dizionari qualificato (collezioni, varianti) insieme a un selettore
- Completamente tipizzato: l'oggetto restituito rispecchia il `content` che hai passato
- Accetta plugin interpreti personalizzati

---

## Function Signature

```typescript
getDictionary(
  dictionary: Dictionary | QualifiedDictionaryGroup, // Obbligatorio
  localeOrSelector?: LocalesValues | DictionarySelector, // Opzionale
  plugins?: Plugins[]                                // Opzionale
): DeepTransformContent<...>
```

---

## Parametri

- `dictionary: Dictionary | QualifiedDictionaryGroup`
  - **Descrizione**: Il dizionario (o il gruppo di dizionari qualificati) da interpretare.
  - **Tipo**: `Dictionary | QualifiedDictionaryGroup`
  - **Richiesto**: Sì

- `localeOrSelector: LocalesValues | DictionarySelector`
  - **Descrizione**: La locale per interpretare il contenuto, o un oggetto selettore (`{ item }`, `{ variant }`, opzionalmente con `locale`). Vedi [dizionari dinamici](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dynamic_dictionaries/index.md).
  - **Tipo**: `LocalesValues | DictionarySelector`
  - **Richiesto**: No (Opzionale) — predefinito su `defaultLocale` configurato.

- `plugins: Plugins[]`
  - **Descrizione**: Un array di trasformatori di nodi che definiscono come i nodi riconosciuti vengono interpretati. Se omesso, viene utilizzato il set predefinito di plugin dell'interprete.
  - **Tipo**: `Plugins[]`
  - **Richiesto**: No (Opzionale)

### Restituisce

- **Type**: Il contenuto interpretato del dizionario.
- **Description**: Il `content` che hai passato, con ogni nodo Intlayer risolto per la locale richiesta. Per un gruppo di raccolta senza un selettore `item`, viene restituito un array ordinato di voci interpretate; `null` viene restituito quando il selettore non trova nulla.

---

## Utilizzo di Esempio

### Utilizzo di base

```typescript codeFormat={["typescript", "esm", "commonjs"]}
import { getDictionary, t } from "intlayer";

const content = getDictionary(
  {
    key: "my_key",
    content: {
      greeting: t({
        en: "Hello",
        fr: "Bonjour",
      }),
    },
  },
  "fr"
);

console.log(content.greeting); // "Bonjour"
```

### Interpretazione del contenuto recuperato a runtime

```typescript
import { getDictionary, type Dictionary } from "intlayer";

const remoteDictionary: Dictionary = await fetch("/api/cms/banner").then(
  (res) => res.json()
);

const banner = getDictionary(remoteDictionary, "fr");
```

### Con un selettore

```typescript
import { getDictionary } from "intlayer";

// Un gruppo di dizionario qualificato viene risolto a una singola voce…
const secondItem = getDictionary(blogPostGroup, { item: 2, locale: "fr" });

// …o a un array ordinato quando nessun `item` è fornito
const allItems = getDictionary(blogPostGroup, { locale: "fr" });
```

---

## Funzioni Correlate

- [`getIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/intlayer/getIntlayer.md): Stessa interpretazione, ma il dizionario viene cercato per chiave nel registro generato.
- [`getDictionaryAsync`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/intlayer/getDictionaryAsync.md): Controparte per mappe di loader per locale.
- [`useDictionary`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/react-intlayer/useDictionary.md): L'equivalente hook React, che legge la locale dal provider.

---

## TypeScript

```typescript
function getDictionary<
  const T extends Dictionary | QualifiedDictionaryGroup,
  const A extends LocalesValues | DictionarySelector = DeclaredLocales,
>(
  dictionary: T,
  localeOrSelector?: A,
  plugins?: Plugins[]
): DeepTransformContent<
  ResolveQualifiedDictionaryContent<T, A>,
  IInterpreterPluginState,
  ExtractSelectorLocale<A>
>;
```
