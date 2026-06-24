---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: "Migracja z Polyglot.js do Intlayer"
description: "Dowiedz się, jak przeprowadzić migrację z Polyglot.js do Intlayer za pomocą adaptera kompatybilności."
keywords:
  - polyglot
  - airbnb
  - intlayer
  - migracja
  - compat
slugs:
  - doc
  - compatibility
  - polyglot
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Init history"
author: aymericzip
---

# Migracja z Polyglot.js do Intlayer

Jeśli używasz Airbnb Polyglot.js, migracja do Intlayer jest niezwykle prosta za pomocą warstwy compat.

## Co zrobić

Po prostu uruchom polecenie inicjalizacji w swoim projekcie:

```bash
npx intlayer init
```

To generuje `intlayer.config.ts`. Możesz następnie wykorzystać alias wtyczki bundlera aby transparentnie przekierować importy Polyglot do `@intlayer/polyglot`.

## Co się dzieje za kulisami

Składnia Polyglot.js zazwyczaj opiera się na `polyglot.t('key', {name})` z interpolacjami `%{name}` i liczby mnogiej `smart_count` rozdzielonymi przez `"singular |||| plural"`.

Za kulisami:

- **Interpolacja:** Warstwa compat obsługuje symbole zastępcze `%{var}` natywnie.
- **Liczba mnoga:** Ciąg jest dzielony w `||||` i obliczany względem natywnego `Intl.PluralRules` zgodnie z aktywną lokalą, odzwierciedlając własny porządek zasobnika Polyglot na lokalę.
- **Słowniki:** Omijasz potrzebę dostarczania ogromnych konfiguracji JSON do `new Polyglot()` – Intlayer obsługuje słowniki dynamicznie i automatycznie je oczyści.
