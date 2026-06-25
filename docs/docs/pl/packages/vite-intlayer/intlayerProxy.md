---
createdAt: 2026-06-25
updatedAt: 2026-06-25
title: Dokumentacja wtyczki Vite intlayerProxy | vite-intlayer
description: Oprogramowanie pośredniczące (middleware) do routingu języków dla serwerów deweloperskich i podglądu Vite oraz produkcyjnego SSR. Obsługuje wykrywanie języka, przekierowania URL i wewnętrzne przepisywanie ścieżek.
keywords:
  - intlayerProxy
  - vite
  - wtyczka
  - middleware
  - język
  - routing
  - umiędzynarodowienie
  - i18n
  - SSR
slugs:
  - doc
  - packages
  - vite-intlayer
  - intlayerProxy
history:
  - version: 9.0.0
    date: 2026-06-25
    changes: "Scalono configOptions w jeden obiekt opcji; proxy jest wbudowane w intlayer()"
author: aymericzip
---

# intlayerProxy

`intlayerProxy` to wtyczka Vite, która rejestruje oprogramowanie pośredniczące (middleware) do routingu języków dla **każdego środowiska**: serwera deweloperskiego, serwera podglądu i produkcyjnego SSR (Nitro / TanStack Start).

> **Od Intlayer v9** `intlayerProxy` jest automatycznie dołączany do głównej wtyczki [`intlayer()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/vite-intlayer/intlayer.md) i domyślnie włączony poprzez `routing.enableProxy: true`. Musisz go zarejestrować osobno tylko wtedy, gdy potrzebujesz kontroli na niższym poziomie lub używasz go poza standardową konfiguracją `intlayer()`.

## Użycie

### Jako część `intlayer()` (zalecane, v9+)

Przekaż opcje `proxy` do głównej wtyczki zamiast rejestrować `intlayerProxy` osobno:

```ts
// vite.config.ts
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [
    intlayer({
      proxy: {
        ignore: (req) => req.url?.startsWith("/api"),
      },
    }),
  ],
});
```

### Samodzielnie (w razie potrzeby)

```ts
// vite.config.ts
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [intlayer()],
});
```

## Opcje

```ts
import type { IntlayerProxyPluginOptions } from "vite-intlayer";
```

Wszystkie opcje są opcjonalne i przekazywane jako pojedynczy obiekt:

| Opcja           | Typ                                 | Opis                                                                                                                                                                     |
| --------------- | ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `ignore`        | `(req: IncomingMessage) => boolean` | Predykat wykluczający żądania z routingu języków. Zwróć `true`, aby pominąć żądanie (np. ścieżki API, testy kondycji/health checki).                                     |
| `configOptions` | `GetConfigurationOptions`           | Nadpisania konfiguracji Intlayer przekazywane do `getConfiguration()`. Użyj, gdy potrzebujesz, aby proxy czytało określony plik konfiguracyjny lub nadpisywało wartości. |

### Przykład

```ts
intlayerProxy({
  ignore: (req) => req.url?.startsWith("/api"),
  configOptions: { configFile: "./config/intlayer.config.ts" },
});
```

## createIntlayerProxyHandler

`createIntlayerProxyHandler` tworzy samodzielne, niezależne od frameworka oprogramowanie pośredniczące Node.js `(req, res, next)`, które zawiera całą logikę routingu języków. Jest przydatne w środowiskach, w których API wtyczek Vite jest niedostępne (np. czysty serwer Node.js lub niestandardowy moduł Nitro).

```ts
import { createIntlayerProxyHandler } from "vite-intlayer";

const handler = createIntlayerProxyHandler({
  ignore: (req) => req.url?.startsWith("/api"),
  configOptions: { configFile: "./config/intlayer.config.ts" },
});

// Express / Connect
app.use(handler);
```

### Produkcyjny SSR (TanStack Start / Nitro przez h3)

```ts
// server/middleware/intlayerProxy.ts
import { fromNodeMiddleware } from "h3";
import { createIntlayerProxyHandler } from "vite-intlayer";

export default fromNodeMiddleware(
  createIntlayerProxyHandler({
    ignore: (req) => req.url?.startsWith("/api"),
  })
);
```

## Zachowanie routingu

Oprogramowanie pośredniczące odzwierciedla logikę routingu z middleware `next-intlayer` i obsługuje wszystkie tryby routingu Intlayer.

### Tryby routingu

| Tryb            | Widoczność URL w przeglądarce | Zachowanie                                                                                                                                                          |
| --------------- | ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `prefix`        | `/pl/about`                   | Domyślny. Prefiks języka w adresie URL. Domyślny język przekierowuje do adresu URL bez prefiksu, chyba że włączono `prefix-all`.                                    |
| `prefix-all`    | `/en/about`, `/pl/about`      | Wszystkie języki — w tym domyślny — są zawsze poprzedzone prefiksem.                                                                                                |
| `no-prefix`     | `/about`                      | Brak języka w adresie URL. Język jest przechowywany wyłącznie w plikach cookie; przepisywanie URL odbywa się wewnętrznie.                                           |
| `search-params` | `/about?locale=pl`            | Język przekazywany jako parametr zapytania (query parameter). Przekierowuje w celu dodania/aktualizacji parametru `locale`, jeśli go brakuje lub jest przestarzały. |

### Priorytet wykrywania

1. Prefiks ścieżki URL (np. `/pl/about` → `pl`).
2. Wartość pliku cookie / localStorage (`intlayer-locale`).
3. Nagłówek `Accept-Language`.
4. `defaultLocale` z konfiguracji.

### Automatyczne pomijanie (bypass)

Oprogramowanie pośredniczące zawsze przepuszcza te żądania bezpośrednio, bez obsługi języka:

- Żądania pasujące do predykatu `ignore`.
- `/node_modules/**`
- `/@**` – wewnętrzne zasoby Vite (`@vite/`, `@fs/`, `@id/` itp.).
- `/_**` – wewnętrzne zasoby serwera (`__vite_ping`, `__manifest` itp.).
- Żądania, których ścieżka kończy się rozszerzeniem pliku (zasoby statyczne). Jeśli w ścieżce zasobu statycznego obecny jest prefiks języka (np. `/pl/logo.png`), zostaje on usunięty, aby plik mógł być serwowany poprawnie.

### Routing domenowy

Gdy w konfiguracji Intlayer skonfigurowano `routing.domains`, oprogramowanie pośredniczące obsługuje routing językowy między różnymi domenami:

- Żądanie dla `/zh/about` w domenie `intlayer.org` jest przekierowywane na `https://intlayer.zh/about`, gdy `domains.zh = "intlayer.zh"`.
- Żądanie do `intlayer.zh/about` jest wewnętrznie przepisywane na `/zh/about`, aby parametr trasy `[locale]` został uzupełniony.

### Ochrona przed pętlą przekierowań

Oprogramowanie pośredniczące śledzi liczbę przekierowań dla pary `originalUrl → newUrl` w ruchomym oknie 2 sekund. Więcej niż 10 przekierowań w tym oknie zwraca odpowiedź `500` z opisowym błędem zamiast zapętlania się w nieskończoność.

## Nitro / produkcyjny SSR (automatyczna iniekcja, v9+)

Gdy `intlayerProxy` jest używany jako wtyczka Vite, niesie ze sobą właściwość `.nitro`. Wtyczka budująca `nitro/vite` odczytuje tę właściwość i wstrzykuje ją do `nitroConfig.modules`, dzięki czemu `intlayerNitroHandler` rejestruje się jako serwerowe oprogramowanie pośredniczące Nitro automatycznie — dla produkcyjnego SSR nie jest wymagana żadna ręczna konfiguracja.

Handler Nitro korzysta z modelu zdarzeń Web Fetch API h3 v2 (nie `fromNodeMiddleware`), więc jest kompatybilny ze wszystkimi szablonami (presets) Nitro: Node, Bun, Deno, środowiskami edge.

## Zdeprecjonowane aliasy

| Zdeprecjonowany eksport    | Zamiennik       |
| -------------------------- | --------------- |
| `intlayerMiddleware`       | `intlayerProxy` |
| `intLayerMiddlewarePlugin` | `intlayerProxy` |
