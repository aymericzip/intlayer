---
createdAt: 2024-08-11
updatedAt: 2026-03-31
title: CLI - Wszystkie polecenia Intlayer CLI dla Twojej wielojęzycznej strony
description: Dowiedz się, jak używać Intlayer CLI do zarządzania wielojęzyczną stroną internetową. Postępuj zgodnie z krokami w tej dokumentacji online, aby skonfigurować swój projekt w kilka minut.
keywords:
  - CLI
  - Interfejs wiersza poleceń
  - Międzynarodowienie
  - Dokumentacja
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - cli
history:
  - version: 8.6.4
    date: 2026-03-31
    changes: "Dodano polecenie standalone"
  - version: 7.5.11
    date: 2026-01-06
    changes: "Dodano polecenie CI"
  - version: 7.5.11
    date: 2026-01-06
    changes: "Dodano polecenie list projects"
  - version: 7.5.9
    date: 2025-12-30
    changes: "Dodano polecenie init"
  - version: 7.2.3
    date: 2025-11-22
    changes: "Dodano polecenie extract"
  - version: 7.1.0
    date: 2025-11-05
    changes: "Dodano opcję skipIfExists do polecenia translate"
  - version: 6.1.4
    date: 2025-01-27
    changes: "Dodano aliasy dla argumentów i poleceń CLI"
  - version: 6.1.3
    date: 2025-10-05
    changes: "Dodano opcję budowania do poleceń"
  - version: 6.1.2
    date: 2025-09-26
    changes: "Dodano polecenie version"
  - version: 6.1.0
    date: 2025-09-26
    changes: "Ustawiono domyślnie verbose na true przez CLI"
  - version: 6.1.0
    date: 2025-09-23
    changes: "Dodano polecenie watch i opcję with"
  - version: 6.0.1
    date: 2025-09-23
    changes: "Dodano polecenie editor"
  - version: 6.0.0
    date: 2025-09-17
    changes: "Dodano polecenia content test i list"
  - version: 5.5.11
    date: 2025-07-11
    changes: "Zaktualizowano dokumentację parametrów poleceń CLI"
  - version: 5.5.10
    date: 2025-06-29
    changes: "Inicjalizacja historii"
---

# Intlayer CLI - Wszystkie polecenia Intlayer CLI dla Twojej wielojęzycznej strony

---

## Spis treści

<TOC/>

---

## Instalacja pakietu

Zainstaluj niezbędne pakiety za pomocą npm:

```bash packageManager="npm"
npm install intlayer-cli -g
```

```bash packageManager="yarn"
yarn add intlayer-cli -g
```

```bash packageManager="pnpm"
pnpm add intlayer-cli -g
```

```bash packageManager="bun"
bun add intlayer-cli -g
```

> Jeśli pakiet `intlayer` jest już zainstalowany, CLI jest instalowane automatycznie. Możesz pominąć ten krok.

## pakiet intlayer-cli

Pakiet `intlayer-cli` służy do transpilacji [deklaracji intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/content_file.md) do słowników.

Ten pakiet transpiluje wszystkie pliki intlayer, takie jak `src/**/*.content.{ts|js|mjs|cjs|json}`. [Zobacz jak deklarować pliki deklaracji Intlayer](https://github.com/aymericzip/intlayer/blob/main/packages/intlayer/README.md).

Do interpretacji słowników intlayer możesz użyć interpreterów, takich jak [react-intlayer](https://www.npmjs.com/package/react-intlayer) lub [next-intlayer](https://www.npmjs.com/package/next-intlayer).

## Obsługa plików konfiguracyjnych

Intlayer akceptuje wiele formatów plików konfiguracyjnych:

- `intlayer.config.ts`
- `intlayer.config.js`
- `intlayer.config.json`
- `intlayer.config.cjs`
- `intlayer.config.mjs`
- `.intlayerrc`

Aby dowiedzieć się, jak skonfigurować dostępne języki lub inne parametry, zapoznaj się z [dokumentacją konfiguracji tutaj](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/configuration.md).

## Wykonywanie poleceń Intlayer

### Uwierzytelnianie

- **[Zaloguj](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/login.md)** - Uwierzytelnij się w Intlayer CMS i uzyskaj dane dostępu

### Polecenia Podstawowe

- **[Buduj Słowniki](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/cli/build.md)** - Zbuduj swoje słowniki z plików deklaracji treści
- **[Obserwuj Słowniki](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/cli/watch.md)** - Obserwuj zmiany i automatycznie przebudowuj słowniki
- **[Utwórz Samodzielny Pakiet](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/cli/standalone.md)** - Utwórz samodzielny pakiet JavaScript zawierający Intlayer i określone pakiety
- **[Sprawdź Wersję CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/cli/version.md)** - Sprawdź zainstalowaną wersję Intlayer CLI
- **[Lista Projektów](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/cli/list_projects.md)** - Lista wszystkich projektów Intlayer w katalogu lub repozytorium git

### Zarządzanie Słownikami

- **[Wypchnij Słowniki (Push)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/cli/push.md)** - Wyślij słowniki do edytora Intlayer i CMS
- **[Pobierz Słowniki (Pull)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/cli/pull.md)** - Pobierz słowniki z edytora Intlayer i CMS
- **[Wypełnij Słowniki (Fill)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/cli/fill.md)** - Wypełnij, audytuj i tłumacz słowniki za pomocą AI
- **[Testuj Brakujące Tłumaczenia](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/cli/test.md)** - Testuj i identyfikuj brakujące tłumaczenia
- **[Lista Plików Deklaracji Treści](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/cli/list.md)** - Lista wszystkich plików deklaracji treści w Twoim projekcie

### Zarządzanie Komponentami

- **[Wyodrębnij Ciągi Znaków (Extract)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/cli/extract.md)** - Wyodrębnij ciągi znaków z komponentów do pliku .content w ich pobliżu

### Konfiguracja

- **[Zainicjuj Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/cli/init.md)** - Skonfiguruj Intlayer w swoim projekcie za pomocą automatycznej konfiguracji
- **[Zarządzaj Konfiguracją](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/cli/configuration.md)** - Pobierz swoją konfigurację Intlayer i wyślij ją do CMS

### Zarządzanie Dokumentacją

- **[Przetłumacz Dokument](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/cli/doc-translate.md)** - Automatycznie tłumacz pliki dokumentacji za pomocą AI
- **[Przejrzyj Dokument](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/cli/doc-review.md)** - Przeglądaj pliki dokumentacji pod kątem jakości i spójności

### Edytor i Live Sync

- **[Polecenia Edytora](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/cli/editor.md)** - Używaj poleceń edytora Intlayer
- **[Polecenia Live Sync](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/cli/live.md)** - Używaj Live Sync, aby stosować zmiany treści z CMS w czasie rzeczywistym

### CI/CD i Automatyzacja

- **[Polecenie CI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/cli/ci.md)** - Wykonuj polecenia Intlayer z automatycznie wstrzykniętymi danymi uwierzytelniającymi dla potoków CI/CD

### Narzędzia Deweloperskie

- **[CLI SDK](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/cli/sdk.md)** - Używaj Intlayer CLI SDK we własnym kodzie
- **[Polecenie Debugowania Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/cli/debug.md)** - Debuguj i rozwiązuj problemy z Intlayer CLI

## Używaj poleceń intlayer w swoim `package.json`

```json fileName="package.json"
"scripts": {
  "intlayer:init": "npx intlayer init",
  "intlayer:login": "npx intlayer login",
  "intlayer:build": "npx intlayer build",
  "intlayer:watch": "npx intlayer build --watch",
  "intlayer:standalone": "npx intlayer standalone --packages intlayer vanilla-intlayer",
  "intlayer:push": "npx intlayer push",
  "intlayer:pull": "npx intlayer pull",
  "intlayer:fill": "npx intlayer fill",
  "intlayer:list": "npx intlayer content list",
  "intlayer:test": "npx intlayer content test",
  "intlayer:extract": "npx intlayer extract",
  "intlayer:projects": "npx intlayer projects list",
  "intlayer:doc:translate": "npx intlayer doc translate",
  "intlayer:doc:review": "npx intlayer doc review"
}
```

> **Uwaga**: Możesz również użyć krótszych aliasów:
>
> - `npx intlayer list` zamiast `npx intlayer content list`
> - `npx intlayer test` zamiast `npx intlayer content test`
> - `npx intlayer projects-list` lub `npx intlayer pl` zamiast `npx intlayer projects list`
