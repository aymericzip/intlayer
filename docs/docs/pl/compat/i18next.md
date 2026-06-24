---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: "Migracja z i18next do Intlayer"
description: "Dowiedz się, jak przeprowadzić migrację aplikacji Vanilla JS/TS z i18next do Intlayer za pomocą adaptera kompatybilności."
keywords:
  - i18next
  - vanilla
  - javascript
  - typescript
  - intlayer
  - migracja
  - compat
slugs:
  - doc
  - compatibility
  - i18next
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Init history"
author: aymericzip
---

# Migracja z i18next do Intlayer

Aby zapoznać się z szczegółowym samouczkiem krok po kroku, zapraszamy do naszego pełnego [Przewodnika migracji z i18next](../migration_from_i18next_to_intlayer.md).

Intlayer doskonale replikuje podstawowe charakterystyki czasu wykonywania `i18next`. Wykorzystując pakiet compat, twoje aplikacje Vanilla lub moduły wewnętrzne mogą nadal korzystać ze znanej składni.

## Co zrobić

Aby rozpocząć, zainicjuj Intlayer w swoim projekcie:

```bash
npx intlayer init
```

Jeśli używasz Vite, dołącz plugin Intlayer aby przekierować importy do `@intlayer/i18next`:

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import { i18nextVitePlugin } from "@intlayer/i18next/plugin";

export default defineConfig({
  plugins: [i18nextVitePlugin()],
});
```

## Co się dzieje za kulisami

Plugin `i18nextVitePlugin` aliasuje importy `i18next` do `@intlayer/i18next`, unikając obciążenia bundle z włączeniami plików JSON.

Za kulisami:

- **Konfiguracja instancji:** `createInstance` poprawnie parsuje i stosuje rezerwowe ustawienia przestrzeni nazw, korzystając z rurociągu kompilacji Intlayer dla pobierania słownika.
- **Interpolacja:** Natywna obsługa zamian `{{name}}` i zagnieżdżania `$t(key)` rekursywnie.
- **Kontekst i liczba mnoga:** Identyfikuje i rozwiązuje formaty sufiksów takie jak `key_male` i `key_one`/`key_other`, obliczając względem standardu `Intl.PluralRules`.
- **Zwracanie obiektów:** Tryb `returnObjects: true` bezpiecznie wyodrębnia drzewa ze słowników Intlayer.
