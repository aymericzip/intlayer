---
createdAt: 2026-08-23
updatedAt: 2026-08-23
title: getIntlayerAsync Function Documentation | intlayer
description: See how to use the getIntlayerAsync function for intlayer package
keywords:
  - getIntlayerAsync
  - dictionary
  - dynamic import
  - metadata
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
  - getIntlayerAsync
history:
  - version: 9.4.0
    date: 2026-08-23
    changes: "Initial documentation"
author: aymericzip
---

# Documentation: funzione `getIntlayerAsync` in `intlayer`

## Descrizione

La funzione `getIntlayerAsync` seleziona un dizionario in base alla sua chiave e risolve il suo contenuto per una determinata locale, **caricando solo quella locale**.

È l'equivalente asincrono di [`getIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/intlayer/getIntlayer.md), destinato ai casi in cui un dizionario viene letto al di fuori del rendering — route `head` / metadata builders, loaders, server functions.

Dove `getIntlayer` carica il dizionario unito contenente ogni locale, i [build plugins](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/bundle_optimization.md) (`@intlayer/babel`, `@intlayer/swc`) riscrivono questa chiamata in `getDictionaryAsync(loaderMap, key, locale)`, puntandola ai chunk per-locale in `.intlayer/dynamic_dictionaries/`. Il bundle quindi contiene solo la locale effettivamente richiesta.

Senza questi plugin — una build non ottimizzata — la chiamata viene risolta attraverso il registro dizionario sincrono invece: lo stesso contenuto, senza la divisione per-locale.

**Caratteristiche principali:**

- Stesse chiavi tipizzate, selettori e contenuto restituito di `getIntlayer`
- Carica solo il chunk della locale richiesta nelle build ottimizzate
- Le chiamate concorrenti per lo stesso chunk condividono un singolo caricamento
- Sicuro da usare in `async` metadata builders, loaders e server functions

---

## Firma della Funzione

```typescript
getIntlayerAsync(
  key: DictionaryKeys,                        // Obbligatorio
  localeOrSelector?: LocalesValues | DictionarySelector, // Opzionale
  plugins?: Plugins[]                         // Opzionale
): Promise<DeepTransformContent<...>>
```

---

## Parametri

- `key: DictionaryKeys`
  - **Description**: La chiave del dizionario da leggere, come dichiarato nei tuoi file di contenuto.
  - **Type**: `DictionaryKeys` — un'unione di ogni chiave di dizionario dichiarata.
  - **Required**: Yes

- `localeOrSelector: LocalesValues | DictionarySelector`
  - **Description**: La locale per interpretare il contenuto, o un oggetto selector per [dizionari dinamici](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dynamic_dictionaries/index.md).
    - `'fr'` — una locale
    - `{ item: 2 }` — un elemento di [collection](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dynamic_dictionaries/collections.md) (ometti `item` per ottenere ogni elemento come array)
    - `{ variant: 'black-friday' }` — un [variant](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dynamic_dictionaries/variants.md) denominato (ometti per quello `default`)
    - `{ variant: { id: 'prod_abc', userId: '123' } }` — una variante strutturata
    - Qualsiasi selector può contenere una locale: `{ item: 2, locale: 'fr' }`
  - **Type**: `LocalesValues | DictionarySelector`
  - **Required**: No (Optional) — defaults to the configured `defaultLocale`.

- `plugins: Plugins[]`
  - **Description**: Custom node transformers che sostituiscono i plugin base dell'interprete. Uso avanzato soltanto.
  - **Type**: `Plugins[]`
  - **Required**: No (Optional)

### Restituisce

- **Type**: `Promise<Content>` — una promise che si risolve nel contenuto interpretato del dizionario, tipizzato dalla tua dichiarazione.

---

## Esempio di utilizzo

### Utilizzo di base

```typescript codeFormat={["typescript", "esm", "commonjs"]}
import { getIntlayerAsync } from "intlayer";

const { title } = await getIntlayerAsync("app", "fr"); // "Bonjour"
```

---

## `getIntlayer` vs `getIntlayerAsync`

|                    | [`getIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/intlayer/getIntlayer.md) | `getIntlayerAsync`                                     |
| ------------------ | --------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------ |
| Returns            | Il contenuto                                                                                                    | Una promise del contenuto                              |
| Dictionary loaded  | Il dizionario unito (tutte le lingue)                                                                           | Il chunk della lingua richiesta solamente              |
| Best suited for    | Rendering, percorsi di codice sincroni                                                                          | Metadata, loaders, funzioni server                     |
| Requires a plugin? | No                                                                                                              | No — la divisione per locale necessita i build plugins |

Entrambi accettano gli stessi argomenti e restituiscono lo stesso contenuto: il cambio da uno all'altro cambia solo **quando** e **quanto** viene caricato.

---

## Funzioni Correlate

- [`getIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/intlayer/getIntlayer.md): Equivalente sincrono che legge il dizionario unito.
- [`getDictionaryAsync`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/intlayer/getDictionaryAsync.md): La funzione di basso livello in cui i plugin di build riscrivono questa chiamata.
- [`getLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/intlayer/getLocale.md): Rileva la locale di una richiesta in arrivo.

---

## TypeScript

```typescript
function getIntlayerAsync<
  const T extends DictionaryKeys,
  const A extends LocalesValues | DictionarySelector = DeclaredLocales,
>(
  key: T,
  localeOrSelector?: A,
  plugins?: Plugins[]
): Promise<
  DeepTransformContent<
    DictionaryRegistryResult<T, A>,
    IInterpreterPluginState,
    ExtractSelectorLocale<A>
  >
>;
```
