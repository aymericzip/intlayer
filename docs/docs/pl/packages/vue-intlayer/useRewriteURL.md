---
updatedAt: 2025-08-23
createdAt: 2025-08-23
title: Dokumentacja composable useRewriteURL
description: Composable specyficzny dla Vue do zarządzania zlokalizowanym przepisywaniem adresów URL w Intlayer.
keywords:
  - useRewriteURL
  - vue-intlayer
  - vue
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - vue-intlayer
  - useRewriteURL
---

# Composable useRewriteURL

Composable `useRewriteURL` dla Vue 3 służy do obsługi zlokalizowanego przepisywania adresów URL po stronie klienta. Automatycznie koryguje URL w przeglądarce do „ładnej” zlokalizowanej wersji na podstawie bieżącego locale użytkownika oraz konfiguracji w `intlayer.config.ts`.

Działa poprzez użycie `window.history.replaceState`, co zapobiega wywoływaniu niechcianych nawigacji Vue Router.

## Użycie

Wywołaj composable wewnątrz funkcji `setup()` lub w `<script setup>`.

```vue
<script setup>
import { useRewriteURL } from "vue-intlayer";

// Automatycznie poprawia /fr/tests na /fr/essais w pasku adresu, jeśli istnieje reguła przepisywania
useRewriteURL();
</script>

<template>
  <router-view />
</template>
```

## Jak to działa

1. **Reaktywne monitorowanie**: Composable ustawia `watch` na `locale` użytkownika.
2. **Dopasowywanie przepisań**: Za każdym razem, gdy zmienia się `locale` (lub przy montowaniu), sprawdza, czy bieżący `window.location.pathname` odpowiada kanonicznej trasie, która ma ładniejszy zlokalizowany alias.
3. **Korekta URL**: Jeśli znaleziono ładniejszy alias, composable wywołuje `window.history.replaceState`, aby zaktualizować pasek adresu bez przeładowania strony ani utraty stanu routera.

## Dlaczego warto używać?

- **Optymalizacja SEO**: Zapewnia, że wyszukiwarki indeksują autorytatywną, zlokalizowaną wersję Twoich adresów URL.
- **Ulepszone UX**: Poprawia ręcznie wpisane adresy URL, aby odzwierciedlały preferowane nazewnictwo (np. `/fr/a-propos` zamiast `/fr/about`).
- **Niskie narzuty**: Aktualizuje adres URL w tle bez ponownego uruchamiania cykli życia komponentów ani strażników nawigacji.

---
