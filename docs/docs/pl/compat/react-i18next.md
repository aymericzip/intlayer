---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: "Migracja z react-i18next do Intlayer"
description: "Dowiedz się, jak przeprowadzić migrację aplikacji React z react-i18next do Intlayer za pomocą adaptera kompatybilności."
keywords:
  - react-i18next
  - i18next
  - intlayer
  - migracja
  - compat
slugs:
  - doc
  - compatibility
  - react-i18next
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Init history"
author: aymericzip
---

# Migracja z react-i18next do Intlayer

Aby zapoznać się z kompletnym i szczegółowym samouczkiem krok po kroku, zapraszamy do naszego pełnego [Przewodnika migracji z react-i18next](../migration_from_react-i18next_to_intlayer.md).

Korzystając z adaptera compat Intlayer możesz przeprowadzić migrację z `react-i18next` bez żadnych zmian importów kodu źródłowego.

## Co zrobić

Aby zainicjować projekt, uruchom:

```bash
npx intlayer init
```

Podczas inicjalizacji, Intlayer zainstaluje `@intlayer/react-i18next` i stworzy `intlayer.config.ts`. W swoim bundlerze (takim jak Vite), zastosuj wtyczkę Intlayer:

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { reactI18nextVitePlugin } from "@intlayer/react-i18next/plugin";

export default defineConfig({
  plugins: [react(), reactI18nextVitePlugin()],
});
```

## Co się dzieje za kulisami

Plugin `reactI18nextVitePlugin` opakuje podstawową wtyczkę `vite-intlayer` i wstrzykuje aliasy rozwiązania dla `react-i18next` i `i18next`, przekierowując je do `@intlayer/react-i18next` i `@intlayer/i18next`.

Za kulisami:

- **`useTranslation` & `withTranslation`:** Przepisane aby korzystać z natywnych hoków Intlayer, dając ci automatyczne uzupełnianie TypeScript dla kluczy słownika. Bezproblemowo obsługuje przestrzenie nazw (np. `t('namespace:key')`).
- **Liczba mnoga i kontekst:** Obsługuje sufiks-bazowaną pluralizację i18next (`key_one`, `key_other`) używając natywnego `Intl.PluralRules` i sufiksów kontekstu (`key_male`).
- **Komponent `<Trans>`:** Ponownie wdrożony aby obsługiwać prop `components`, formy obiektu i tablic, i numerowane tagi `<1>...</1>` bezpośrednio mapujące do węzłów React.
- **Instancja `i18n`:** Rozwiązuje klucze bezpośrednio ze słowników Intlayer bez pobierania dużych plików JSON, powodując znacznie mniejsze rozmiary bundle.
