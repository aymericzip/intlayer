---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Dokumentacja komponentu IntlayerProvider | react-intlayer
description: Zobacz, jak używać komponentu IntlayerProvider z pakietu react-intlayer
keywords:
  - IntlayerProvider
  - react
  - Intlayer
  - intlayer
  - Internacjonalizacja
  - Dokumentacja
slugs:
  - doc
  - packages
  - react-intlayer
  - IntlayerProvider
history:
  - version: 7.5.14
    date: 2026-01-21
    changes: Inicjalizacja dokumentacji
---

# Dokumentacja komponentu IntlayerProvider

Komponent `IntlayerProvider` jest głównym providerem Intlayer w aplikacjach React. Udostępnia kontekst Intlayer wszystkim swoim dzieciom.

## Użycie

```tsx
import { IntlayerProvider } from "react-intlayer";

const App = ({ children }) => <IntlayerProvider>{children}</IntlayerProvider>;
```

## Właściwości

| Właściwość        | Typ                               | Opis                                          |
| ----------------- | --------------------------------- | --------------------------------------------- |
| `locale`          | `LocalesValues`                   | Początkowy locale do użycia.                  |
| `defaultLocale`   | `LocalesValues`                   | Domyślny locale używany jako fallback.        |
| `setLocale`       | `(locale: LocalesValues) => void` | Niestandardowa funkcja ustawiająca locale.    |
| `disableEditor`   | `boolean`                         | Czy wyłączyć edytor.                          |
| `isCookieEnabled` | `boolean`                         | Czy włączyć cookies do przechowywania locale. |
