---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Documentazione del componente IntlayerProvider | react-intlayer
description: Scopri come usare il componente IntlayerProvider per il pacchetto react-intlayer
keywords:
  - IntlayerProvider
  - react
  - Intlayer
  - intlayer
  - Internationalization
  - Documentation
slugs:
  - doc
  - packages
  - react-intlayer
  - IntlayerProvider
history:
  - version: 7.5.14
    date: 2026-01-21
    changes: Init doc
---

# Documentazione del componente IntlayerProvider

Il componente `IntlayerProvider` è il provider principale per Intlayer nelle applicazioni React. Fornisce il contesto Intlayer a tutti i suoi figli.

## Utilizzo

```tsx
import { IntlayerProvider } from "react-intlayer";

const App = ({ children }) => <IntlayerProvider>{children}</IntlayerProvider>;
```

## Proprietà

| Proprietà         | Tipo                              | Descrizione                                                |
| ----------------- | --------------------------------- | ---------------------------------------------------------- |
| `locale`          | `LocalesValues`                   | La locale iniziale da utilizzare.                          |
| `defaultLocale`   | `LocalesValues`                   | La locale predefinita da utilizzare come fallback.         |
| `setLocale`       | `(locale: LocalesValues) => void` | Una funzione personalizzata per impostare la locale.       |
| `disableEditor`   | `boolean`                         | Specifica se disabilitare l'editor.                        |
| `isCookieEnabled` | `boolean`                         | Specifica se abilitare i cookie per memorizzare la locale. |
