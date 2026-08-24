---
createdAt: 2026-08-23
updatedAt: 2026-08-23
title: Documentazione della funzione getDictionaryAsync | intlayer
description: Scopri come utilizzare la funzione getDictionaryAsync del package intlayer
keywords:
  - getDictionaryAsync
  - dictionary
  - dynamic dictionaries
  - loader map
  - bundle optimization
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
  - getDictionaryAsync
history:
  - version: 9.4.0
    date: 2026-08-23
    changes: "Initial documentation"
author: aymericzip
---

# Documentation: funzione `getDictionaryAsync` in `intlayer`

## Descrizione

La funzione `getDictionaryAsync` carica un **singolo chunk di locale** di un dizionario e restituisce il suo contenuto interpretato.

È l'equivalente di [`getDictionary`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/intlayer/getDictionary.md) per le mappe di loader per-locale emesse in `.intlayer/dynamic_dictionaries/`: invece di ricevere un dizionario che contiene ogni locale, riceve la mappa di loader e attende solo il chunk di cui ha bisogno il locale richiesto.

> Nel codice dell'applicazione normalmente chiami [`getIntlayerAsync`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/intlayer/getIntlayerAsync.md), non questa funzione. I [plugin di build](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/bundle_optimization.md) riscrivono ogni chiamata `getIntlayerAsync('key', locale)` in una `getDictionaryAsync(loaderMap, 'key', locale)`. `getDictionaryAsync` è esportato per custom loader e per strumenti che costruiscono le proprie mappe di loader.

**Caratteristiche principali:**

- Carica solo il chunk di locale richiesto
- Supporta mappe di loader semplici (`locale → loader`) e qualificate (`locale → qualifierId → loader`)
- Deduplica i caricamenti concorrenti dello stesso chunk e mette in cache il contenuto risolto
- I caricamenti non riusciti vengono rimossi dalla cache in modo che una chiamata successiva riprovi il chunk

---

## Firma della Funzione

```typescript
getDictionaryAsync(
  dictionaryLoaders: PlainDynamicLoaderMap | QualifiedDynamicLoaderMap, // Obbligatorio
  key: string,                                           // Obbligatorio
  localeOrSelector?: LocalesValues | DictionarySelector, // Opzionale
  plugins?: Plugins[]                                    // Opzionale
): Promise<DeepTransformContent<...>>
```

---

## Parametri

- `dictionaryLoaders: PlainDynamicLoaderMap | QualifiedDynamicLoaderMap`
  - **Description**: La mappa dei loader per locale. Le mappe semplici associano una locale a un loader; le mappe qualificate (utilizzate da collezioni e varianti) associano una locale a un id qualificatore, quindi a un loader. Per una mappa qualificata, vengono caricati solo i chunk che il selettore target.
  - **Type**: `PlainDynamicLoaderMap<T> | QualifiedDynamicLoaderMap`
  - **Required**: Yes

- `key: string`
  - **Description**: La chiave del dizionario, utilizzata per namespace la cache dei chunk.
  - **Type**: `string`
  - **Required**: Yes

- `localeOrSelector: LocalesValues | DictionarySelector`
  - **Description**: La locale per interpretare il contenuto, oppure un oggetto selettore (`{ item }`, `{ variant }`, opzionalmente con `locale`). Vedi [dynamic dictionaries](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dynamic_dictionaries/index.md).
  - **Type**: `LocalesValues | DictionarySelector`
  - **Required**: No (Optional) — defaults to the configured `defaultLocale`.

- `plugins: Plugins[]`
  - **Description**: Node transformers. Defaults to the base interpreter set.
  - **Type**: `Plugins[]`
  - **Required**: No (Optional)

### Restituzioni

- **Type**: `Promise<Content>` — una promise che si risolve nel contenuto interpretato del chunk caricato.
- **Description**: Si risolve a `null` quando la mappa non emette alcun chunk per la locale richiesta né per nessuno dei suoi fallback, rispecchiando come una coordinata qualificata mancante si risolve.

---

## Utilizzo di esempio

### Con una mappa di loader generata

```typescript codeFormat={["typescript", "esm", "commonjs"]}
import { getDictionaryAsync } from "intlayer";
import appLoaderMap from "../.intlayer/dynamic_dictionaries/app";

const { title } = await getDictionaryAsync(appLoaderMap, "app", "fr");
```

### Con una mappa di loader personalizzata

```typescript
import { getDictionaryAsync } from "intlayer";

const loaderMap = {
  en: () => import("./banner.en.json").then((mod) => mod.default),
  fr: () => import("./banner.fr.json").then((mod) => mod.default),
};

const banner = await getDictionaryAsync(loaderMap, "banner", "fr");
```

### Con un selettore su una mappa qualificata

```typescript
import { getDictionaryAsync } from "intlayer";

const promoBanner = await getDictionaryAsync(bannerLoaderMap, "banner", {
  variant: "black-friday",
  locale: "fr",
});
```

---

## Note sul comportamento

### Caching and deduplication

La cache memorizza la **promise** di ogni tripla `key + locale + selector`, quindi le chiamate concorrenti per lo stesso chunk attendono un singolo caricamento. Un caricamento rifiutato viene rimosso dalla cache, quindi un chunk che fallisce viene ritentato alla chiamata successiva invece di riprodurre lo stesso errore per sempre.

### Fallback della locale

Una plain loader map viene attraversata seguendo la stessa fallback chain della modalità sincrona: la locale richiesta per prima, poi i suoi fallback, poi `null` se nessuno ha emesso un chunk.

---

## Funzioni Correlate

- [`getIntlayerAsync`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/intlayer/getIntlayerAsync.md): La funzione che le applicazioni chiamano; i plugin di build la riscrivono in `getDictionaryAsync`.
- [`getDictionary`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/intlayer/getDictionary.md): Controparte sincrona che accetta un dizionario completo.
- [Dizionari dinamici](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dynamic_dictionaries/index.md): Collezioni e varianti, e le mappe dei loader che generano.

---

## TypeScript

```typescript
function getDictionaryAsync<
  const T extends Dictionary,
  const A extends LocalesValues | DictionarySelector = DeclaredLocales,
>(
  dictionaryLoaders: PlainDynamicLoaderMap<T> | QualifiedDynamicLoaderMap,
  key: string,
  localeOrSelector?: A,
  plugins?: Plugins[]
): Promise<
  DeepTransformContent<
    T["content"],
    IInterpreterPluginState,
    ExtractSelectorLocale<A>
  >
>;
```
