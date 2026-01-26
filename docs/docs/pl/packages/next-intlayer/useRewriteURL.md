---
updatedAt: 2025-08-23
createdAt: 2025-08-23
title: Dokumentacja hooka useRewriteURL
description: Hook specyficzny dla Next.js do zarządzania zlokalizowanym przepisywaniem adresów URL w Intlayer.
keywords:
  - useRewriteURL
  - next-intlayer
  - nextjs
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - next-intlayer
  - useRewriteURL
---

# Hook useRewriteURL

Hook `useRewriteURL` dla Next.js to hook po stronie klienta, który automatycznie zarządza zlokalizowanym przepisywaniem adresów URL. Zapewnia, że URL w przeglądarce zawsze odzwierciedla „ładną” zlokalizowaną ścieżkę zdefiniowaną w Twoim `intlayer.config.ts`, nawet jeśli użytkownik ręcznie wpisze kanoniczną ścieżkę z prefiksem lokalizacji.

Ten hook działa dyskretnie, używając `window.history.replaceState`, co pozwala uniknąć zbędnych nawigacji routera Next.js lub odświeżeń strony.

## Użycie

Po prostu wywołaj hook w Client Component, który jest częścią Twojego layoutu.

```tsx
"use client";

import { useRewriteURL } from "next-intlayer";

const MyClientComponent = () => {
  // Automatycznie koryguje /fr/privacy-notice na /fr/politique-de-confidentialite w pasku adresu
  useRewriteURL();

  return null;
};
```

## Jak to działa

1. **Monitorowanie ścieżki**: Hook nasłuchuje zmian w `locale` użytkownika.
2. **Wykrywanie przepisania (rewrite)**: Porównuje bieżący `window.location.pathname` z regułami rewrite zawartymi w Twojej konfiguracji.
3. **Korekta URL**: Jeśli dla bieżącej ścieżki zostanie znaleziony ładniejszy, zlokalizowany alias, hook wywołuje `window.history.replaceState`, aby zaktualizować pasek adresu, pozostawiając użytkownika na tej samej wewnętrznej stronie.

## Dlaczego używać tego w Next.js?

Podczas gdy `intlayerMiddleware` obsługuje przepisywania po stronie serwera i początkowe przekierowania, hook `useRewriteURL` zapewnia, że adres URL w przeglądarce pozostaje zgodny z preferowaną strukturą SEO nawet po przejściach po stronie klienta.

- **Czyste adresy URL**: Wymusza użycie zlokalizowanych segmentów, takich jak `/fr/essais` zamiast `/fr/tests`.
- **Wydajność**: Aktualizuje pasek adresu bez wywoływania pełnego cyklu routera ani ponownego pobierania danych.
- **Zgodność z SEO**: Zapobiega problemom z duplikacją treści, zapewniając, że użytkownikom i robotom wyszukiwarek widoczna jest tylko jedna wersja URL.
