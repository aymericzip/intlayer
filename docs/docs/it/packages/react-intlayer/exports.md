---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Documentazione del pacchetto react-intlayer
description: Implementazione specifica per React di Intlayer, che fornisce hook e provider per applicazioni React.
keywords:
  - react-intlayer
  - react
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - react-intlayer
  - exports
history:
  - version: 7.5.14
    date: 2026-01-21
    changes: Documentazione unificata per tutte le esportazioni
---

# Pacchetto react-intlayer

Il pacchetto `react-intlayer` fornisce gli strumenti necessari per integrare Intlayer nelle applicazioni React. Include provider di contesto, hook e componenti per la gestione dei contenuti multilingue.

## Installazione

```bash
npm install react-intlayer
```

## Esportazioni

### Provider

Importazione:

```tsx
import "react-intlayer";
```

| Componente                | Descrizione                                                                                                                         | Documento correlato                                                                                                           |
| ------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `IntlayerProvider`        | Il provider principale che avvolge la tua applicazione e fornisce il contesto Intlayer. Include il supporto dell'editor di default. | [IntlayerProvider](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/react-intlayer/IntlayerProvider.md) |
| `IntlayerProviderContent` | Un componente provider focalizzato sul contenuto senza le funzionalità dell'editor. Usalo quando non ti serve il visual editor.     | -                                                                                                                             |
| `HTMLProvider`            | Provider per le impostazioni di internazionalizzazione relative all'HTML. Consente la sovrascrittura dei componenti per i tag HTML. | -                                                                                                                             |

### Hooks

Importazione:

```tsx
import "react-intlayer";
```

| Hook                   | Descrizione                                                                                                                                        | Documentazione correlata                                                                                                |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `useIntlayer`          | Hook lato client che seleziona un dizionario tramite la sua chiave e ne restituisce il contenuto. Usa la locale dal contesto se non fornita.       | [useIntlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/react-intlayer/useIntlayer.md)     |
| `useDictionary`        | Hook che trasforma un oggetto dizionario e restituisce il contenuto per la locale corrente. Elabora le traduzioni `t()`, le enumerazioni, ecc.     | [useDictionary](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/react-intlayer/useDictionary.md) |
| `useDictionaryAsync`   | Hook che gestisce dizionari asincroni. Accetta una mappa di dizionari basata su promise e la risolve per la locale corrente.                       | -                                                                                                                       |
| `useDictionaryDynamic` | Hook che gestisce dizionari dinamici caricati per chiave. Utilizza internamente React Suspense per gli stati di caricamento.                       | -                                                                                                                       |
| `useLocale`            | Hook client-side per ottenere la locale corrente, la locale predefinita, le località disponibili e una funzione per aggiornare la locale.          | [useLocale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/react-intlayer/useLocale.md)         |
| `useLocaleBase`        | Hook per ottenere la locale corrente e tutti i campi correlati (locale, defaultLocale, availableLocales, setLocale) dal contesto.                  | -                                                                                                                       |
| `useRewriteURL`        | Hook client-side per gestire le riscritture degli URL. Se esiste una regola di riscrittura per il pathname corrente e la locale, aggiornerà l'URL. | [useRewriteURL](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/react-intlayer/useRewriteURL.md) |
| `useI18n`              | Hook che fornisce una funzione di traduzione `t()` per accedere a contenuti nidificati tramite chiave. Imita il pattern di i18next/next-intl.      | [useI18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/react-intlayer/useI18n.md)             |
| `useIntl`              | Hook che fornisce un oggetto `Intl` legato alla locale. Inietta automaticamente la locale corrente e utilizza caching ottimizzato.                 | -                                                                                                                       |
| `useLocaleStorage`     | Hook che fornisce la persistenza della locale nel local storage o nei cookie. Restituisce funzioni getter e setter.                                | -                                                                                                                       |
| `useLocaleCookie`      | Deprecato. Usa `useLocaleStorage` invece. Hook che gestisce la persistenza della locale nei cookie.                                                | -                                                                                                                       |
| `useLoadDynamic`       | Hook per caricare dizionari dinamici usando React Suspense. Accetta una chiave e una promise, memorizza i risultati nella cache.                   | -                                                                                                                       |
| `useIntlayerContext`   | Hook che fornisce i valori del contesto client Intlayer correnti (locale, setLocale, ecc.).                                                        | -                                                                                                                       |
| `useHTMLContext`       | Hook per accedere agli override dei componenti HTML dal contesto HTMLProvider.                                                                     | -                                                                                                                       |

### Funzioni

Importazione:

```tsx
import "react-intlayer";
```

| Funzione | Descrizione | Doc correlata |
| `t` | Funzione di traduzione lato client che restituisce la traduzione del contenuto multilingue fornito. Usa la locale dal contesto se non fornita. | [traduzione](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/dictionary/translation.md) |
| `getDictionary` | Elabora gli oggetti del dizionario e restituisce il contenuto per la locale specificata. Elabora le traduzioni `t()`, le enumerazioni, il markdown, l'HTML, ecc. | - |
| `getIntlayer` | Recupera un dizionario tramite la sua chiave dalla dichiarazione generata e restituisce il suo contenuto per la locale specificata. Versione ottimizzata di `getDictionary`. | - |
| `setLocaleInStorage` | Imposta la locale nello storage (local storage o cookie in base alla configurazione). | - |
| `setLocaleCookie` | Deprecato. Usa `setLocaleInStorage` al suo posto. Imposta la locale in un cookie. | - |
| `localeInStorage` | Recupera la locale dallo storage (local storage o cookie). | - |
| `localeCookie` | Deprecato. Usa `localeInStorage` invece. Recupera la locale dal cookie. | - |

### Componenti

Importazione:

```tsx
import "react-intlayer";
```

or

```tsx
import "react-intlayer/markdown";
```

| Componente         | Descrizione                                                                                                                                                        | Documentazione correlata                                                                                                      |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------- |
| `MarkdownProvider` | Provider per il contesto di rendering del Markdown. Consente override di componenti personalizzati per gli elementi Markdown.                                      | -                                                                                                                             |
| `MarkdownRenderer` | Esegue il rendering di contenuti Markdown con componenti personalizzati. Supporta tutte le funzionalità standard del Markdown e la sintassi specifica di Intlayer. | [MarkdownRenderer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/it/packages/react-intlayer/MarkdownRenderer.md) |

### Tipi

Importazione:

```tsx
import "react-intlayer";
```

| Tipo           | Descrizione                                                                                                                     |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `IntlayerNode` | Tipo che rappresenta un nodo nell'albero dei contenuti di Intlayer. Usato per la manipolazione dei contenuti in modo type-safe. |

### Lato server (react-intlayer/server)

Importazione:

```tsx
import "react-intlayer/server";
```

| Esportazione             | Tipo        | Descrizione                                             |
| ------------------------ | ----------- | ------------------------------------------------------- |
| `IntlayerServerProvider` | `Component` | Provider per il rendering lato server.                  |
| `IntlayerServer`         | `Component` | Wrapper lato server per i contenuti Intlayer.           |
| `t`                      | `Function`  | Versione lato server della funzione di traduzione.      |
| `useLocale`              | `Hook`      | Hook per accedere alla locale sul lato server.          |
| `useIntlayer`            | `Hook`      | Versione lato server di `useIntlayer`.                  |
| `useDictionary`          | `Hook`      | Versione lato server di `useDictionary`.                |
| `useI18n`                | `Hook`      | Versione lato server di `useI18n`.                      |
| `locale`                 | `Function`  | Funzione per ottenere o impostare la locale sul server. |
