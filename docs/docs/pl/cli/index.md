---
createdAt: 2024-08-11
updatedAt: 2026-09-27
priority: 8
title: "CLI Intlayer: wszystkie polecenia dla aplikacji wielojęzycznych"
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
  - version: 9.5.8
    date: 2026-09-23
    changes: "Dodaj polecenie upgrade"
  - version: 9.5.6
    date: 2026-09-21
    changes: "Dodaj polecenie init infra"
  - version: 9.5.2
    date: 2026-09-12
    changes: "Zastąpienie polecenia `ci` flagą `--ci`"
  - version: 9.0.0
    date: 2026-06-11
    changes: "Dodano polecenie scan"
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
author: aymericzip
---

# Intlayer CLI - Wszystkie polecenia Intlayer CLI dla Twojej wielojęzycznej strony

## Spis treści

<TOC/>

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

Ten pakiet transpiluje wszystkie pliki intlayer, takie jak `src/**/*.content.{ts|js|mjs|cjs|json|tsx|jsx|md|mdx|yaml|yml}`. [Zobacz jak deklarować pliki deklaracji Intlayer](https://github.com/aymericzip/intlayer/blob/main/packages/intlayer/README.md).

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

- **[Zaloguj](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/cli/login.md)** - Uwierzytelnij się w Intlayer CMS i uzyskaj dane dostępu

> `intlayer login` wydaje **klucz dostępu** (`clientId` / `clientSecret`), który jest używany przez każde polecenie wymagające uwierzytelnienia. Sekret jest poświadczeniem po stronie serwera i nigdy nie trafia do Twojego pakietu klienta — zobacz [Keeping the access key safe](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/cli/login.md#keeping-the-access-key-safe).

### Polecenia Podstawowe

- [Buduj Słowniki](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/cli/build.md)
- [Obserwuj Słowniki](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/cli/watch.md)
- [Utwórz Samodzielny Pakiet](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/cli/standalone.md)
- [Sprawdź Wersję CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/cli/version.md)
- [Lista Projektów](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/cli/list_projects.md)

### Zarządzanie Słownikami

- [Wypchnij Słowniki (Push)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/cli/push.md)
- [Pobierz Słowniki (Pull)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/cli/pull.md)
- [Wypełnij Słowniki (Fill)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/cli/fill.md)
- [Testuj Brakujące Tłumaczenia](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/cli/test.md)
- [Lista Plików Deklaracji Treści](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/cli/list.md)

### Zarządzanie Komponentami

- **[Wyodrębnij Ciągi Znaków (Extract)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/cli/extract.md)** - Wyodrębnij ciągi znaków z komponentów do pliku .content w ich pobliżu

### Konfiguracja

- [Zainicjuj Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/cli/init.md)
- [Skonfiguruj infrastrukturę](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/cli/infra.md)
- [Aktualizacja pakietów Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/cli/upgrade.md)
- [Zarządzaj Konfiguracją](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/cli/configuration.md)

### Zarządzanie Dokumentacją

- [Przetłumacz Dokument](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/cli/doc-translate.md)
- [Przejrzyj Dokument](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/cli/doc-review.md)

### Edytor i Live Sync

- [Polecenia Edytora](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/cli/editor.md)
- [Polecenia Live Sync](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/cli/live.md)

### Audyt i Diagnostyka

- **[Skanuj stronę internetową](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/cli/scan.md)** - Zmierz rozmiar strony i przeprowadź audyt zdrowia i18n/SEO dowolnego publicznego adresu URL

### Narzędzia Deweloperskie

- [CLI SDK](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/cli/sdk.md)
- [Polecenie Debugowania Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/cli/debug.md)

## Używaj poleceń intlayer w swoim `package.json`

```json fileName="package.json"
"scripts": {
  "intlayer:init": "npx intlayer init",
  "intlayer:infra": "npx intlayer init infra",
  "intlayer:upgrade": "npx intlayer upgrade",
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
  "intlayer:doc:review": "npx intlayer doc review",
  "intlayer:scan": "npx intlayer scan https://example.com"
}
```

> **Uwaga**: Możesz również użyć krótszych aliasów:
>
> - `npx intlayer list` zamiast `npx intlayer content list`
> - `npx intlayer test` zamiast `npx intlayer content test`
> - `npx intlayer projects-list` lub `npx intlayer pl` zamiast `npx intlayer projects list`
