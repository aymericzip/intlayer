---
createdAt: 2026-06-13
updatedAt: 2026-06-13
title: "Migracja z Vue I18n do Intlayer"
description: "Dowiedz się, jak przeprowadzić migrację aplikacji Vue z vue-i18n do Intlayer za pomocą adaptera kompatybilności."
keywords:
  - vue-i18n
  - vue
  - intlayer
  - migracja
  - compat
slugs:
  - doc
  - compatibility
  - vue-i18n
history:
  - version: 9.0.0
    date: 2026-06-13
    changes: "Init history"
author: aymericzip
---

# Migracja z Vue I18n do Intlayer

Jeśli aplikacja Vue aktualnie używa `vue-i18n`, możesz przeprowadzić migrację do Intlayer bez przepisywania komponentów ani tłumaczenia hoków. Intlayer zapewnia adapter compat, który doskonale odzwierciedla API `vue-i18n` przy jednoczesnym wykorzystaniu potężnych funkcji Intlayer za kulisami.

## Co zrobić

Aby rozpocząć, po prostu uruchom polecenie inicjalizacji w swoim projekcie:

```bash
npx intlayer init
```

Podczas inicjalizacji, Intlayer będzie ustawiać plik konfiguracji (`intlayer.config.ts`) i przygotowywać twój projekt do migracji. Będziesz musiał dodać wtyczkę Intlayer do konfiguracji Vite, aby automatycznie aliasować importy `vue-i18n`.

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueI18nVitePlugin from "@intlayer/vue-i18n/plugin";

export default defineConfig({
  plugins: [vue(), vueI18nVitePlugin()],
});
```

## Co się dzieje za kulisami

Plugin `vueI18nVitePlugin` wstrzykuje alias modułu do bundlera. Każdy import `vue-i18n` w twoim kodzie będzie transparentnie przekierowany do `@intlayer/vue-i18n`.

**Za kulisami, adapter obsługuje złożoną składnię `vue-i18n` natywnie:**

- **Interpolacja i liczba mnoga:** Rozwiązuje interpolacje `{name}` i listy `{0}`. Liczby mnoga pipe (`"car | cars"`) są konwertowane do węzłów wyliczenia/liczby mnogiej Intlayer na podstawie semantyki pozycjonalnej.
- **Formaty:** Funkcje takie jak `d()` i `n()` opakują `Intl` za kulisami, honorując `datetimeFormats` i `numberFormats` zdefiniowane w opcjach.
- **Stan globalny i lokalny:** `global.locale` jest mapowany na `WritableComputedRef` wspieraną przez klienta Intlayer, tak aby reaktywność zachowywała się dokładnie jak oczekiwana (np. `locale.value = 'fr'`).
- **Dyrektywy:** Dyrektywa `v-t` jest rejestrowana i funkcjonuje normalnie.

Twoja aplikacja kontynuuje renderowanie dokładnie jak wcześniej, ale zawartość jest zasilana twoimi słownikami Intlayer, dając ci bezpieczeństwo typów, lepszą optymalizację bundle i bezproblemową integrację CMS.
