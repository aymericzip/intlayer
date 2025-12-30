---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: CLI
description: Odkryj, jak używać Intlayer CLI do zarządzania Twoją wielojęzyczną stroną internetową. Postępuj zgodnie z krokami w tej dokumentacji online, aby skonfigurować swój projekt w kilka minut.
keywords:
  - CLI
  - Interfejs wiersza poleceń
  - Internacjonalizacja
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
  - version: 7.2.3
    date: 2025-11-22
    changes: Dodano polecenie transform
  - version: 7.1.0
    date: 2025-11-05
    changes: Dodano opcję skipIfExists do polecenia translate
  - version: 6.1.4
    date: 2025-01-27
    changes: Dodano aliasy dla argumentów i poleceń CLI
  - version: 6.1.3
    date: 2025-10-05
    changes: Dodano opcję build do poleceń
  - version: 6.1.2
    date: 2025-09-26
    changes: Dodano polecenie version
  - version: 6.1.0
    date: 2025-09-26
    changes: Ustawiono domyślnie opcję verbose na true w CLI
  - version: 6.1.0
    date: 2025-09-23
    changes: Dodano polecenie watch oraz opcję with
  - version: 6.0.1
    date: 2025-09-23
    changes: Dodano polecenie editor
  - version: 6.0.0
    date: 2025-09-17
    changes: Dodano polecenia content test oraz list
  - version: 5.5.11
    date: 2025-07-11
    changes: Zaktualizowano dokumentację parametrów poleceń CLI
  - version: 5.5.10
    date: 2025-06-29
    changes: Inicjalizacja historii
---

# Intlayer CLI

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

## Pakiet intlayer-cli

Pakiet `intlayer-cli` służy do transpile'owania Twoich [deklaracji intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/content_file.md) do słowników.

Ten pakiet transpile'uje wszystkie pliki intlayer, takie jak `src/**/*.content.{ts|js|mjs|cjs|json}`. [Zobacz, jak deklarować pliki deklaracji Intlayer](https://github.com/aymericzip/intlayer/blob/main/packages/intlayer/README.md).

Aby interpretować słowniki intlayer, możesz użyć interpreterów, takich jak [react-intlayer](https://www.npmjs.com/package/react-intlayer) lub [next-intlayer](https://www.npmjs.com/package/next-intlayer).

## Obsługa plików konfiguracyjnych

Intlayer obsługuje wiele formatów plików konfiguracyjnych:

- `intlayer.config.ts`
- `intlayer.config.js`
- `intlayer.config.json`
- `intlayer.config.cjs`
- `intlayer.config.mjs`
- `.intlayerrc`

Aby zobaczyć, jak skonfigurować dostępne lokalizacje lub inne parametry, zapoznaj się z [dokumentacją konfiguracji tutaj](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/configuration.md).

## Uruchamianie poleceń intlayer

### Uwierzytelnianie

- **[Logowanie](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/cli/login.md)** - Uwierzytelnij się w Intlayer CMS i uzyskaj dane dostępowe

### Podstawowe polecenia

- **[Build Dictionaries](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/cli/build.md)** - Buduj swoje słowniki z plików deklaracji treści
- **[Watch Dictionaries](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/cli/watch.md)** - Obserwuj zmiany i automatycznie buduj słowniki
- **[Check CLI Version](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/cli/version.md)** - Sprawdź zainstalowaną wersję CLI Intlayer

### Zarządzanie słownikami

- **[Push Dictionaries](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/cli/push.md)** - Wypchnij słowniki do edytora i CMS Intlayer
- **[Pull Dictionaries](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/cli/pull.md)** - Pobierz słowniki z edytora i CMS Intlayer
- **[Fill Dictionaries](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/cli/fill.md)** - Wypełnij, audytuj i tłumacz słowniki za pomocą AI
- **[Test Missing Translations](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/cli/test.md)** - Testuj i identyfikuj brakujące tłumaczenia
- **[List Content Declaration Files](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/cli/list.md)** - Wyświetl listę wszystkich plików deklaracji treści w Twoim projekcie

### Zarządzanie komponentami

- **[Transform Components](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/cli/transform.md)** - Przekształć istniejące komponenty, aby korzystały z Intlayer

### Konfiguracja

- **[Manage Configuration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/cli/configuration.md)** - Pobierz i wyślij swoją konfigurację Intlayer do CMS

### Zarządzanie dokumentacją

- **[Translate Document](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/cli/doc-translate.md)** - Automatycznie tłumacz pliki dokumentacji za pomocą AI
- **[Review Document](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/cli/doc-review.md)** - Przeglądaj pliki dokumentacji pod kątem jakości i spójności

### Edytor i synchronizacja na żywo

- **[Editor Commands](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/cli/editor.md)** - Używaj poleceń edytora Intlayer
- **[Live Sync Commands](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/cli/live.md)** - Używaj Live Sync, aby odzwierciedlać zmiany zawartości CMS w czasie rzeczywistym

### Narzędzia deweloperskie

- **[CLI SDK](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/cli/sdk.md)** - Używaj Intlayer CLI SDK w swoim własnym kodzie
- **[Debug Intlayer Command](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/cli/debug.md)** - Debuguj i rozwiązuj problemy z Intlayer CLI

## Używaj poleceń intlayer w swoim `package.json`

```json fileName="package.json"
"scripts": {
  "intlayer:login": "npx intlayer login",
  "intlayer:build": "npx intlayer build",
  "intlayer:watch": "npx intlayer build --watch",
  "intlayer:push": "npx intlayer push",
  "intlayer:pull": "npx intlayer pull",
  "intlayer:fill": "npx intlayer fill",
  "intlayer:list": "npx intlayer content list",
  "intlayer:test": "npx intlayer content test",
  "intlayer:transform": "npx intlayer transform",
  "intlayer:doc:translate": "npx intlayer doc translate",
  "intlayer:doc:review": "npx intlayer doc review"
}
```

> **Uwaga**: Możesz również używać krótszych aliasów:
>
> - `npx intlayer list` zamiast `npx intlayer content list`
> - `npx intlayer test` zamiast `npx intlayer content test`
