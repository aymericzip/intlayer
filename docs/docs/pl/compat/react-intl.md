---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: "Migracja z React Intl do Intlayer"
description: "Dowiedz się, jak przeprowadzić migrację aplikacji React z react-intl do Intlayer za pomocą adaptera kompatybilności."
keywords:
  - react-intl
  - formatjs
  - intlayer
  - migracja
  - compat
slugs:
  - doc
  - compatibility
  - react-intl
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Init history"
author: aymericzip
---

# Migracja z React Intl do Intlayer

Jeśli aplikacja React używa `react-intl` (FormatJS), przejście do Intlayer jest proste. Nasza warstwa compat bezproblemowo obsługuje ICU MessageFormat i wszystkie istniejące komponenty `Formatted*`.

## Co zrobić

Zacznij uruchamiając polecenie inicjalizacji w swoim projekcie:

```bash
npx intlayer init
```

Następnie, ustaw wtyczkę Vite lub Next.js Intlayer w konfiguracji. Ta wtyczka wstrzykuje aliasy czasu budowania aby przekierować importy `react-intl` do `@intlayer/react-intl`.

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import reactIntlVitePlugin from "@intlayer/react-intl/plugin";

export default defineConfig({
  plugins: [react(), reactIntlVitePlugin()],
});
```

## Co się dzieje za kulisami

Wtyczka bundlera aliasuje `react-intl` do `@intlayer/react-intl`. Zamiast ręcznego parsowania dużych plików JSON i opakowywania aplikacji w `IntlProvider`, wtyczka Intlayer statycznie wyodrębnia klucze i używa słowników Intlayer w czasie wykonywania.

Za kulisami:

- **ICU MessageFormat:** Intlayer używa `resolveMessage(..., 'icu')` resolver, który w pełni obsługuje pluralizację ICU, selekcję, formatowanie daty/liczb i tagi bogatego tekstu natywnie.
- **Metoda i wywoływane JSX:** `intl.formatMessage({ id: 'a.b' })` i `<FormattedMessage id="a.b">` są identyfikowane przez wtyczki kompilera Intlayer (`@intlayer/babel` / `@intlayer/swc`), konwertując płaskie klucze punktowe tak aby pierwszy segment prawidłowo rozwiązywał klucz słownika Intlayer.
- **Formatery:** `<FormattedNumber>`, `<FormattedDate>` itd., stanowią most do natywnego `core/formatters` używając `Intl`.
