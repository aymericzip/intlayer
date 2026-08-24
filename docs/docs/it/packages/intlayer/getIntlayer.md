---
createdAt: 2026-08-23
updatedAt: 2026-08-23
title: Documentazione della funzione getIntlayer | intlayer
description: Scopri come utilizzare la funzione getIntlayer per il package intlayer
keywords:
  - getIntlayer
  - dictionary
  - content
  - selector
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
  - getIntlayer
history:
  - version: 9.4.0
    date: 2026-08-23
    changes: "Initial documentation"
author: aymericzip
---

# Documentazione: Funzione `getIntlayer` in `intlayer`

## Descrizione

La funzione `getIntlayer` seleziona un dizionario dalla sua chiave e restituisce il suo contenuto interpretato per una determinata locale. È l'equivalente indipendente dal framework dell'hook `useIntlayer`: stesso contenuto, stessi selettori, ma utilizzabile ovunque un contesto React non sia disponibile — script Node, funzioni server, route loader, generatori di metadati, handler Express/Fastify, test.

Legge i dizionari generati da Intlayer in `.intlayer/`, quindi l'argomento `key` è tipizzato e autocompleto dalle tue dichiarazioni di contenuto, e l'oggetto restituito è completamente tipizzato fino a ogni foglia.

**Caratteristiche principali:**

- Chiavi di dizionario tipizzate e contenuto restituito tipizzato
- Interpreta ogni nodo di contenuto (`t()`, `enu()`, `cond()`, `insert()`, `nest()`, `md()`, `html()`, `file()`, `gender()`)
- Accetta una locale o un oggetto selettore (collezioni, varianti)
- I risultati sono memorizzati nella cache per `key + locale + selector`
- Ricade su un proxy sicuro in sviluppo quando un dizionario è mancante, invece di bloccarsi

---

## Firma della Funzione

```typescript
getIntlayer(
  key: DictionaryKeys,                        // Obbligatorio
  localeOrSelector?: LocalesValues | DictionarySelector, // Opzionale
  plugins?: Plugins[]                         // Opzionale
): DeepTransformContent<...>
```

---

## Parametri

- `key: DictionaryKeys`
  - **Description**: La chiave del dizionario da leggere, come dichiarato nei tuoi file di contenuto.
  - **Type**: `DictionaryKeys` — un'unione di ogni chiave di dizionario dichiarata.
  - **Required**: Yes

- `localeOrSelector: LocalesValues | DictionarySelector`
  - **Description**: La locale per interpretare il contenuto con, o un oggetto selettore per [dizionari dinamici](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dynamic_dictionaries/index.md).
    - `'fr'` — una locale
    - `{ item: 2 }` — un elemento [collection](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dynamic_dictionaries/collections.md) (ometti `item` per ottenere ogni elemento come array)
    - `{ variant: 'black-friday' }` — un [variant](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dynamic_dictionaries/variants.md) denominato (ometti per quello `default`)
    - `{ variant: { id: 'prod_abc', userId: '123' } }` — un variant strutturato
    - Qualsiasi selettore può portare una locale: `{ item: 2, locale: 'fr' }`
  - **Type**: `LocalesValues | DictionarySelector`
  - **Required**: No (Optional) — defaults to the configured `defaultLocale`.

- `plugins: Plugins[]`
  - **Description**: Custom node transformers che sostituiscono i plugin dell'interprete base. Solo uso avanzato; omettilo per mantenere il comportamento predefinito.
  - **Type**: `Plugins[]`
  - **Required**: No (Optional)

### Restituzioni

- **Type**: Il contenuto interpretato del dizionario, tipizzato dalla tua dichiarazione.
- **Description**: Un oggetto semplice che rispecchia il campo `content` del tuo dizionario, dove ogni nodo Intlayer è stato risolto al suo valore finale per la locale richiesta.

---

## Esempio di utilizzo

### Utilizzo di Base

```typescript fileName="src/app.content.ts" codeFormat="typescript"
import { t, type Dictionary } from "intlayer";

const appContent = {
  key: "app",
  content: {
    title: t({
      it: "Ciao",
      en: "Hello",
      fr: "Bonjour",
    }),
  },
} satisfies Dictionary;

export default appContent;
```

```typescript codeFormat={["typescript", "esm", "commonjs"]}
import { getIntlayer } from "intlayer";

const { title } = getIntlayer("app", "it"); // "Ciao"
```

### Senza una locale

Omettendo la locale il contenuto viene interpretato con la `defaultLocale` dichiarata nella tua [configurazione](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/configuration.md).

```typescript
import { getIntlayer } from "intlayer";

const { title } = getIntlayer("app"); // Interpretato con la locale predefinita
```

### All'interno di un server handler

```typescript fileName="src/routes/greeting.ts" codeFormat="typescript"
import { getIntlayer, getLocale } from "intlayer";

export const greetingHandler = async (request: Request) => {
  const locale = await getLocale({
    getHeader: (name) => request.headers.get(name) ?? undefined,
  });

  const { title } = getIntlayer("app", locale);

  return Response.json({ title });
};
```

### Con un selettore (collezioni e varianti)

```typescript
import { getIntlayer } from "intlayer";

// Un singolo elemento della collezione
const secondPost = getIntlayer("blog-post", { item: 2, locale: "fr" });

// Ogni elemento della collezione, come un array ordinato
const allPosts = getIntlayer("blog-post", { locale: "fr" });

// Una variante denominata
const banner = getIntlayer("banner", { variant: "black-friday", locale: "fr" });
```

---

## Note sul comportamento

### Caching

I risultati sono memoizzati in una cache a livello di modulo con chiave `key + locale + selector`. Chiamare `getIntlayer("app", "fr")` ripetutamente interpreta il dizionario una sola volta e restituisce lo stesso oggetto in seguito.

### Dizionari mancanti

Durante lo sviluppo, richiedere una chiave che non ha un dizionario generato registra un avviso una volta e restituisce un proxy di fallback sicuro: leggere `content.title` produce la stringa `"app.title"` invece di generare un errore. Questo mantiene una pagina utilizzabile mentre la dichiarazione mancante viene corretta. Eseguire il build di Intlayer (o il server di sviluppo) affinché il dizionario sia generato.

### Dimensione del bundle

`getIntlayer` legge il dizionario unito, che contiene **ogni** locale. Nei bundle client, i [plugin di build](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/bundle_optimization.md) riscrivono la chiamata in modo che solo il contenuto richiesto venga spedito. Quando leggi contenuto al di fuori del rendering (metadata, loader, funzioni server) e vuoi che una singola locale sia caricata su richiesta, usa invece [`getIntlayerAsync`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/intlayer/getIntlayerAsync.md).

---

## Funzioni Correlate

- [`getIntlayerAsync`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/intlayer/getIntlayerAsync.md): Controparte asincrona che carica un singolo chunk di locale.
- [`getDictionary`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/intlayer/getDictionary.md): Interpreta un oggetto dictionary che passi tu stesso, invece di uno cercato per chiave.
- [`useIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/react-intlayer/useIntlayer.md): L'equivalente React hook, che legge il locale dal provider.

---

## TypeScript

```typescript
function getIntlayer<
  const T extends DictionaryKeys,
  const A extends LocalesValues | DictionarySelector = DeclaredLocales,
>(
  key: T,
  localeOrSelector?: A,
  plugins?: Plugins[]
): DeepTransformContent<
  DictionaryRegistryResult<T, A>,
  IInterpreterPluginState,
  ExtractSelectorLocale<A>
>;
```
