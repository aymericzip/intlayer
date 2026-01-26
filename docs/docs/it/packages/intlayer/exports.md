---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Documentazione del pacchetto intlayer
description: Il pacchetto core di Intlayer, che fornisce le funzioni e i tipi di base per l'internazionalizzazione.
keywords:
  - intlayer
  - core
  - internazionalizzazione
  - i18n
slugs:
  - doc
  - packages
  - intlayer
  - exports
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Documentazione unificata per tutte le esportazioni
---

# Pacchetto intlayer

Il pacchetto `intlayer` è la libreria core dell'ecosistema Intlayer. Fornisce le funzioni essenziali, i tipi e le utility per gestire contenuti multilingue in applicazioni JavaScript e TypeScript.

## Installazione

```bash
npm install intlayer
```

## Esportazioni

### Configurazione

Importazione:

```tsx
import "intlayer";
```

| Variable           | Type                   | Description                                                                                              | Related Doc                                                                                                             |
| ------------------ | ---------------------- | -------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `configuration`    | `IntlayerConfig`       | L'oggetto di configurazione di Intlayer.                                                                 | [getConfiguration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/intlayer/getConfiguration.md) |
| `getConfiguration` | `() => IntlayerConfig` | Restituisce l'oggetto di configurazione di Intlayer. (**Deprecato**: usare `configuration` al suo posto) | [getConfiguration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/intlayer/getConfiguration.md) |
| `locales`          | `Locales[]`            | L'elenco di tutte le localizzazioni supportate.                                                          | -                                                                                                                       |
| `requiredLocales`  | `Locales[]`            | L'elenco di tutte le localizzazioni richieste.                                                           | -                                                                                                                       |
| `defaultLocale`    | `Locales`              | La locale predefinita.                                                                                   | -                                                                                                                       |

### Tipi

Importazione:

```tsx
import "intlayer";
```

| Tipo                  | Descrizione                                                                 |
| --------------------- | --------------------------------------------------------------------------- |
| `Dictionary`          | Il tipo `Dictionary` utilizzato per definire la struttura di un dizionario. |
| `DeclarationContent`  | (**Deprecato**) Usa `Dictionary<T>` invece.                                 |
| `IntlayerConfig`      | Il tipo che definisce la configurazione di Intlayer.                        |
| `ContentNode`         | Un nodo nel contenuto del dizionario.                                       |
| `Locale`              | Il tipo che rappresenta una locale.                                         |
| `LocalesValues`       | I possibili valori per una locale.                                          |
| `StrictModeLocaleMap` | Una mappa di locales con controllo rigoroso dei tipi.                       |

### Funzioni di contenuto

Importazione:

```tsx
import "intlayer";
```

| Funzione                 | Tipo       | Descrizione                                                                                                           | Doc correlato                                                                                           |
| ------------------------ | ---------- | --------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| `t` / `getTranslation`   | `Function` | Seleziona il contenuto in base alla locale corrente.                                                                  | [traduzione](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dictionary/translation.md)   |
| `enu` / `getEnumeration` | `Function` | Seleziona il contenuto in base a una quantità.                                                                        | [enumerazione](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dictionary/enumeration.md) |
| `cond` / `getCondition`  | `Function` | Seleziona il contenuto in base a una condizione booleana.                                                             | [condizione](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dictionary/condition.md)     |
| `gender`                 | `Function` | Seleziona il contenuto in base al genere.                                                                             | [genere](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dictionary/gender.md)            |
| `insert`                 | `Function` | Inserisce valori all'interno di una stringa di contenuto.                                                             | [inserimento](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dictionary/insertion.md)    |
| `nest` / `getNesting`    | `Function` | Innestare un altro dizionario.                                                                                        | [nesting](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dictionary/nesting.md)          |
| `md`                     | `Function` | Elabora contenuto Markdown.                                                                                           | [markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dictionary/markdown.md)        |
| `html`                   | `Function` | Elabora contenuto HTML.                                                                                               | [html](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dictionary/html.md)                |
| `file`                   | `Function` | Gestisce il contenuto dei file.                                                                                       | [file](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dictionary/file.md)                |
| `getDictionary`          | `Function` | Elabora oggetti che assomigliano a dizionari (chiave, contenuto). Gestisce le traduzioni `t()`, le enumerazioni, ecc. | -                                                                                                       |
| `getIntlayer`            | `Function` | Basata su `getDictionary`, ma inietta una versione ottimizzata del dizionario dalla dichiarazione generata.           | -                                                                                                       |

### Utility di localizzazione

Importazione:

```tsx
import "intlayer";
```

| Funzione               | Tipo       | Descrizione                                               | Doc correlata                                                                                                                   |
| ---------------------- | ---------- | --------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `getLocale`            | `Function` | Rileva la locale da una stringa o da un percorso.         | [getLocale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/intlayer/getLocale.md)                       |
| `getLocaleLang`        | `Function` | Estrae la parte lingua di una locale.                     | [getLocaleLang](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/intlayer/getLocaleLang.md)               |
| `getLocaleName`        | `Function` | Restituisce il nome di visualizzazione di una locale.     | [getLocaleName](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/intlayer/getLocaleName.md)               |
| `getLocalizedPath`     | `Function` | Converte un percorso canonico in un percorso localizzato. | [getLocalizedPath](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/intlayer/getLocalizedPath.md)         |
| `getCanonicalPath`     | `Function` | Risolve un percorso localizzato nella forma canonica.     | [getCanonicalPath](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/intlayer/getCanonicalPath.md)         |
| `getLocalizedUrl`      | `Function` | Genera un URL localizzato.                                | [getLocalizedUrl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/intlayer/getLocalizedUrl.md)           |
| `getMultilingualUrls`  | `Function` | Genera URL per tutte le locali supportate.                | [getMultilingualUrls](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/intlayer/getMultilingualUrls.md)   |
| `getPathWithoutLocale` | `Function` | Rimuove il prefisso locale da un percorso.                | [getPathWithoutLocale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/intlayer/getPathWithoutLocale.md) |
| `getPrefix`            | `Function` | Ottiene il prefisso locale da un percorso.                | [getPrefix](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/intlayer/getPrefix.md)                       |
| `getHTMLTextDir`       | `Function` | Ottiene la direzione del testo (LTR/RTL).                 | [getHTMLTextDir](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/intlayer/getHTMLTextDir.md)             |
| `validatePrefix`       | `Function` | Valida un prefisso locale.                                | [validatePrefix](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/intlayer/validatePrefix.md)             |

### Utility del browser

Importa:

```tsx
import "intlayer";
```

| Function               | Tipo       | Descrizione                             |
| ---------------------- | ---------- | --------------------------------------- |
| `getBrowserLocale`     | `Function` | Rileva la locale preferita del browser. |
| `getCookie`            | `Function` | Recupera il valore di un cookie.        |
| `getLocaleFromStorage` | `Function` | Recupera la locale dallo storage.       |
| `setLocaleInStorage`   | `Function` | Salva la locale nello storage.          |

### Formattatori

Importa:

```tsx
import "intlayer";
```

| Funzione       | Descrizione                           |
| -------------- | ------------------------------------- |
| `number`       | Formatta un numero.                   |
| `currency`     | Formatta un valore in valuta.         |
| `percentage`   | Formatta una percentuale.             |
| `compact`      | Formatta un numero in forma compatta. |
| `date`         | Formatta una data.                    |
| `relativeTime` | Formatta il tempo relativo.           |
| `units`        | Formatta un valore con unità.         |
| `Intl`         | L'oggetto Intl standard.              |
