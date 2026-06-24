---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: "Migracja z Svelte I18n do Intlayer"
description: "Dowiedz się, jak przeprowadzić migrację aplikacji Svelte z svelte-i18n do Intlayer za pomocą adaptera kompatybilności."
keywords:
  - svelte-i18n
  - svelte
  - intlayer
  - migracja
  - compat
slugs:
  - doc
  - compatibility
  - svelte-i18n
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Init history"
author: aymericzip
---

# Migracja z Svelte I18n do Intlayer

Przeniesienie aplikacji Svelte z `svelte-i18n` do Intlayer trwa zaledwie chwilę, korzystając z adaptera compat.

## Co zrobić

Po prostu uruchom polecenie inicjalizacji w swoim projekcie:

```bash
npx intlayer init
```

To generuje `intlayer.config.ts`. Upewnij się, że twoje wtyczki SvelteKit / Vite są opakowane wtyczką aliasu Intlayer aby bezproblemowo mapować `svelte-i18n` do `@intlayer/svelte-i18n`.

## Co się dzieje za kulisami

Svelte-i18n opiera się na intensywnie używanych sklepach (`$_`, `$t`, `$format`, itd.) i ICU MessageFormat.

Za kulisami:

- **Sklepy:** Intlayer pośredniczy sklepy `svelte-i18n`. `$_` staje się wyprowadzonym sklepem aktualnej lokali zwracającym resolver Intlayer.
- **Klucze:** Twoje płaskie klucze (np. `$_('home.title')`) są obliczane tak aby pierwszy segment ścieżki reprezentuje słownik Intlayer.
- **Składnia ICU:** W pełni obsługiwana przez wspólny resolver ICU (parsowanie równoważne `intl-messageformat`).
- **Formatery:** Wywołania `$date`, `$time`, `$number` bezpiecznie przekierowują do natywnych formatów rdzenia Intlayer.
- **Analiza Babel/SWC:** Analizator Intlayer czyta wywoływaczy sklepy Svelte (`$_`) wewnątrz plików źródłowych `.svelte` przed kompilacją aby automatycznie zbudować odpowiednie fragmenty słownika.
