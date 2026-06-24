---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: "Migracja z i18n-js do Intlayer"
description: "Dowiedz się, jak przeprowadzić migrację aplikacji z i18n-js do Intlayer za pomocą adaptera kompatybilności."
keywords:
  - i18n-js
  - intlayer
  - migracja
  - compat
slugs:
  - doc
  - compatibility
  - i18n-js
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Init history"
author: aymericzip
---

# Migracja z i18n-js do Intlayer

Przejście z biblioteki `i18n-js` do Intlayer to wysoce zoptymalizowana migracja zaprojektowana aby przenieść duże konfiguracje tłumaczeń do strukturalnego systemu rozwiązywania plików Intlayer.

## Co zrobić

Wykonaj następujące polecenie konfiguracyjne w swoim repozytorium:

```bash
npx intlayer init
```

Po przygotowaniu pliku `intlayer.config.ts`, możesz dodać alias Intlayer do konfiguracji twojego bundlera, aby wszelkie importy `i18n-js` wskazywały na pakiet compat `@intlayer/i18n-js`.

## Co się dzieje za kulisami

`i18n-js` uzyskuje dostęp do przestrzeni nazw poprzez wyrażenia takie jak `i18n.t('scope.key', {name})` wraz z rezerwowymi ustawieniami lokali i specjalnymi mapowaniami liczby mnogiej.

Za kulisami:

- **Interpolacja:** Adapter compat z łatwością parsuje mapowania `%{name}` na wartość słownika czasu wykonywania docelowego.
- **Liczba mnoga:** Zastępuje podklucze `one/other` i mapuje je względem potężnych bazowych mechanizmów liczby mnogiej Intlayer (`Intl.PluralRules`), abstrakcyjnie oddzielając ręczne mapowania.
- **Lokale:** Zamiast ładować monolityczne payload języka przy inicjalizacji, słowniki są serwowane optymalnie na podstawie obecnej konfiguracji kontekstu poprzez natywną konfigurację Intlayer.
