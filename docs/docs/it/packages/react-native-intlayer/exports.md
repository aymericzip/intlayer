---
createdAt: 2026-01-21
updatedAt: 2026-06-25
title: Documentazione del pacchetto react-native-intlayer
description: Supporto per React Native in Intlayer, fornendo provider, hook, polyfill e configurazione Metro.
keywords:
  - react-native-intlayer
  - react-native
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - react-native-intlayer
  - exports
history:
  - version: 9.0.0
    date: 2026-06-25
    changes: "Riesporta l'intera API react-intlayer (hook, utilità, subpath format/html/markdown) in modo che un'app React Native dipenda solo da react-native-intlayer"
  - version: 8.0.0
    date: 2026-01-21
    changes: "Documentazione unificata per tutte le esportazioni"
author: aymericzip
---

# Pacchetto react-native-intlayer

Il pacchetto `react-native-intlayer` fornisce gli strumenti necessari per integrare Intlayer nelle applicazioni React Native. Riesporta l'intera API `react-intlayer` (hook e utilità) con un `IntlayerProvider` pronto per React Native, oltre ai polyfill e alla configurazione Metro richiesti da React Native.

> In un'app React Native, importa **tutto** da `react-native-intlayer`. Non è necessario installare o importare `react-intlayer` direttamente.

## Installazione

```bash
npm install react-native-intlayer
```

## Esportazioni

### Provider

| Componente         | Descrizione                                                                                                                        |
| ------------------ | ---------------------------------------------------------------------------------------------------------------------------------- |
| `IntlayerProvider` | Componente Provider che avvolge la tua applicazione e fornisce il contesto Intlayer. Applica automaticamente i polyfill necessari. |

```tsx
import { IntlayerProvider } from "react-native-intlayer";
```

### Hook e utilità

Questi sono riesportati da `react-intlayer`, quindi puoi importarli direttamente da `react-native-intlayer`:

| Esportazione                                                                                                      | Descrizione                                                    |
| ----------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------- |
| `useIntlayer`                                                                                                     | Accedi al contenuto localizzato per una chiave del dizionario. |
| `useLocale`                                                                                                       | Leggi e cambia la localizzazione corrente.                     |
| `useDictionary`, `useDictionaryAsync`, `useDictionaryDynamic`, `useLoadDynamic`                                   | Carica il contenuto del dizionario in vari modi.               |
| `useI18n`                                                                                                         | Hook compatibile con i18next.                                  |
| `t`                                                                                                               | Helper per la traduzione inline.                               |
| `getIntlayer`, `getDictionary`                                                                                    | Getter imperativi del contenuto.                               |
| `localeCookie`, `localeInStorage`, `setLocaleCookie`, `setLocaleInStorage`, `useLocaleCookie`, `useLocaleStorage` | Helper per la persistenza della localizzazione.                |

```tsx
import { useIntlayer, useLocale, t } from "react-native-intlayer";
```

### Polyfill

| Funzione           | Descrizione                                                                         |
| ------------------ | ----------------------------------------------------------------------------------- |
| `intlayerPolyfill` | Funzione che applica i polyfill necessari per React Native per supportare Intlayer. |

```tsx
import { intlayerPolyfill } from "react-native-intlayer";
```

> Il polyfill viene applicato automaticamente quando importi `IntlayerProvider`. Chiama `intlayerPolyfill` manualmente solo se hai bisogno dei polyfill prima che il provider venga montato.

### Formatter

Gli hook di formattazione numerica, data e altri basati su Intl sono disponibili dal subpath `/format`:

```tsx
import { useNumber, useDate } from "react-native-intlayer/format";
```

### Rendering Markdown e HTML

```tsx
import { MarkdownProvider } from "react-native-intlayer/markdown";
import { HTMLProvider } from "react-native-intlayer/html";
```

### Configurazione Metro

Il pacchetto `react-native-intlayer` fornisce utilità di configurazione per Metro per garantire che Intlayer funzioni correttamente con React Native.

| Funzione                  | Descrizione                                                                                     |
| ------------------------- | ----------------------------------------------------------------------------------------------- |
| `configMetroIntlayer`     | Funzione asincrona che prepara Intlayer e unisce la configurazione di Metro.                    |
| `configMetroIntlayerSync` | Funzione sincrona che unisce la configurazione di Metro senza preparare le risorse di Intlayer. |
| `exclusionList`           | Crea un pattern RegExp per la blockList di Metro per escludere file di contenuto dal bundle.    |

```tsx
import { configMetroIntlayer } from "react-native-intlayer/metro";
```
