---
createdAt: 2026-07-08
updatedAt: 2026-07-08
title: Synchronizacja na żywo | Odzwierciedlaj zmiany treści CMS w czasie rzeczywistym
description: Pozwól swojej aplikacji odzwierciedlać zmiany treści w Intlayer CMS w czasie działania, bez konieczności przebudowy czy ponownego wdrożenia.
keywords:
  - Synchronizacja na żywo
  - Live Sync
  - CMS
  - Edytor Wizualny
  - Internacjonalizacja
  - Dokumentacja
  - Intlayer
  - Next.js
  - Vite
history:
  - version: 9.0.0
    date: 2026-07-08
    changes: "Przeniesiono z dokumentacji Intlayer CMS na osobną stronę"
  - version: 6.0.1
    date: 2025-09-22
    changes: "Dodano dokumentację synchronizacji na żywo"
  - version: 6.0.0
    date: 2025-09-04
    changes: "Zastąpiono pole `hotReload` polem `liveSync`"
author: aymericzip
---

# Synchronizacja na żywo

Synchronizacja na żywo pozwala Twojej aplikacji odzwierciedlać zmiany treści CMS w czasie rzeczywistym. Nie jest wymagane ponowne budowanie ani wdrażanie. Po włączeniu aktualizacje są przesyłane do serwera synchronizacji na żywo, który odświeża słowniki odczytywane przez Twoją aplikację.

## Spis treści

<TOC/>

---

Włącz synchronizację na żywo, aktualizując konfigurację Intlayer:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... inne ustawienia konfiguracyjne
  editor: {
    /**
     * Włącza hot reloading konfiguracji lokalizacji, gdy wykryte zostaną zmiany.
     * Na przykład, gdy słownik zostanie dodany lub zaktualizowany, aplikacja aktualizuje
     * wyświetlaną na stronie zawartość.
     *
     * Ponieważ hot reloading wymaga ciągłego połączenia z serwerem,
     * jest dostępny tylko dla klientów planu `enterprise`.
     *
     * Domyślnie: false
     */
    liveSync: true,
  },
  dictionary: {
    /**
     * Kontroluje sposób importowania słowników:
     *
     * - "live": Słowniki są pobierane dynamicznie za pomocą API Live Sync.
     *   Zastępuje useIntlayer funkcją useDictionaryDynamic.
     *
     * Uwaga: Tryb live korzysta z API Live Sync do pobierania słowników. Jeśli wywołanie API
     * zakończy się niepowodzeniem, słowniki są importowane dynamicznie.
     * Uwaga: Tryb live jest używany tylko dla słowników zdalnych i oznaczonych flagą "live".
     * Pozostałe używają trybu dynamicznego dla wydajności.
     */
    importMode: "fetch",
  },
};

export default config;
```

Uruchom serwer Live Sync, aby otoczyć swoją aplikację:

Przykład użycia samodzielnego serwera:

```json5 fileName="package.json"
{
  "scripts": {
    // ... inne skrypty
    "live:start": "npx intlayer live",
  },
}
```

Możesz również używać swojego serwera aplikacji równolegle, korzystając z argumentu `--process`.

Przykład użycia Next.js:

```json5 fileName="package.json"
{
  "scripts": {
    // ... inne skrypty
    "build": "next build",
    "dev": "next dev",
    "start": "npx intlayer live --with 'next start'",
  },
}
```

Przykład użycia Vite:

```json5 fileName="package.json"
{
  "scripts": {
    // ... inne skrypty
    "build": "vite build",
    "dev": "vite dev",
    "start": "npx intlayer live --with 'vite start'",
  },
}
```

Serwer Live Sync otacza Twoją aplikację i automatycznie stosuje zaktualizowaną zawartość w momencie jej pojawienia się.

Aby otrzymywać powiadomienia o zmianach z CMS, serwer Live Sync utrzymuje połączenie SSE z backendem. Gdy zawartość w CMS ulega zmianie, backend przekazuje aktualizację do serwera Live Sync, który zapisuje nowe słowniki. Twoja aplikacja odzwierciedli aktualizację przy następnej nawigacji lub przeładowaniu przeglądarki, nie jest wymagane ponowne budowanie.

Schemat przepływu (CMS/Backend -> Serwer Live Sync -> Serwer aplikacji -> Frontend):

![Schemat przepływu Live Sync CMS/Backend/Serwer Live Sync/Serwer aplikacji/Frontend](https://github.com/aymericzip/intlayer/blob/main/docs/assets/live_sync_flow_scema.svg)

Jak to działa:

![Schemat logiki Live Sync](https://github.com/aymericzip/intlayer/blob/main/docs/assets/live_sync_logic_schema.svg)

## Przebieg pracy podczas developmentu (lokalnie)

- Podczas developmentu wszystkie zdalne słowniki są pobierane przy starcie aplikacji, dzięki czemu możesz szybko testować aktualizacje.
- Aby przetestować Live Sync lokalnie z Next.js, opakuj swój serwer deweloperski:

```json5 fileName="package.json"
{
  "scripts": {
    // ... inne skrypty
    "dev": "npx intlayer live --with 'next dev'",
    // "dev": "npx intlayer live --with 'vite dev'", // Dla Vite
  },
}
```

Włącz optymalizację, aby Intlayer stosował transformacje importu Live podczas developmentu:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  editor: {
    applicationURL: "http://localhost:5173",
    liveSyncURL: "http://localhost:4000",
    liveSync: true,
  },
  dictionary: {
    importMode: "fetch",
  },
  build: {
    optimize: true,
  },
};

export default config;
```

To ustawienie owija Twój serwer deweloperski serwerem Live Sync, pobiera zdalne słowniki podczas uruchamiania i przesyła aktualizacje z CMS za pomocą SSE. Odśwież stronę, aby zobaczyć zmiany.

Uwagi i ograniczenia:

- Dodaj pochodzenie live sync do polityki bezpieczeństwa swojej strony (CSP). Upewnij się, że adres URL live sync jest dozwolony w `connect-src` (oraz `frame-ancestors`, jeśli ma to zastosowanie).
- Live Sync nie działa ze statycznym outputem. W Next.js strona musi być dynamiczna, aby otrzymywać aktualizacje w czasie wykonywania (np. użyj `generateStaticParams`, `generateMetadata`, `getServerSideProps` lub `getStaticProps` odpowiednio, aby uniknąć pełnych ograniczeń statycznych).
- W CMS każdy słownik ma flagę `live`. Tylko słowniki z `live=true` są pobierane przez API live sync; pozostałe są importowane dynamicznie i pozostają niezmienione w czasie wykonywania.
- Flaga `live` jest oceniana dla każdego słownika podczas budowania (build time). Jeśli zdalna zawartość nie była oznaczona jako `live=true` podczas budowania (build time), musisz przebudować projekt, aby włączyć Live Sync dla tego słownika.
- Serwer live sync musi mieć możliwość zapisu do `.intlayer`. W kontenerach upewnij się, że masz dostęp do zapisu do `/.intlayer`.

## Przydatne linki

- [Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_CMS.md)
- [Edytor Wizualny Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_visual_editor.md)
- [Dokumentacja konfiguracji](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/configuration.md)
- [Przewodnik po samodzielnym hostowaniu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/self_hosting.md)
