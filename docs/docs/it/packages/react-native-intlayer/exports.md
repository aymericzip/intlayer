---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Documentazione del pacchetto react-native-intlayer
description: Supporto per React Native in Intlayer, fornendo provider e polyfill.
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
  - version: 8.0.0
    date: 2026-01-21
    changes: Documentazione unificata per tutte le esportazioni
---

# Pacchetto react-native-intlayer

Il pacchetto `react-native-intlayer` fornisce gli strumenti necessari per integrare Intlayer nelle applicazioni React Native. Include un provider e polyfill per il supporto delle localizzazioni.

## Installazione

```bash
npm install react-native-intlayer
```

## Esportazioni

### Provider

| Componente         | Descrizione                                                                          |
| ------------------ | ------------------------------------------------------------------------------------ |
| `IntlayerProvider` | Componente Provider che avvolge la tua applicazione e fornisce il contesto Intlayer. |

Importazione:

```tsx
import "react-native-intlayer";
```

### Polyfill

| Funzione           | Descrizione                                                                         |
| ------------------ | ----------------------------------------------------------------------------------- |
| `intlayerPolyfill` | Funzione che applica i polyfill necessari per React Native per supportare Intlayer. |

Importazione:

```tsx
import "react-native-intlayer";
```

### Configurazione Metro

Il pacchetto `react-native-intlayer` fornisce utilità di configurazione per Metro per garantire che Intlayer funzioni correttamente con React Native.

| Funzione                  | Descrizione                                                                                     |
| ------------------------- | ----------------------------------------------------------------------------------------------- |
| `configMetroIntlayer`     | Funzione asincrona che prepara Intlayer e unisce la configurazione di Metro.                    |
| `configMetroIntlayerSync` | Funzione sincrona che unisce la configurazione di Metro senza preparare le risorse di Intlayer. |
| `exclusionList`           | Crea un pattern RegExp per la blockList di Metro per escludere file di contenuto dal bundle.    |

Import:

```tsx
import "react-native-intlayer/metro";
```
