---
createdAt: 2025-03-13
updatedAt: 2026-06-21
title: Wtyczka Sync JSON
description: Synchronizuj słowniki Intlayer z zewnętrznymi plikami JSON i18n (i18next, next-intl, react-intl, vue-i18n i inne). Zachowaj istniejące i18n, korzystając z Intlayer do zarządzania, tłumaczenia i testowania swoich komunikatów.
keywords:
  - Intlayer
  - Sync JSON
  - i18next
  - next-intl
  - react-intl
  - vue-i18n
  - next-translate
  - nuxt-i18n
  - LinguiJS
  - Polyglot.js
  - Solid-i18next
  - svelte-i18n
  - i18n
  - tłumaczenia
slugs:
  - doc
  - plugin
  - sync-json
youtubeVideo: https://www.youtube.com/watch?v=MpGMxniDHNg
history:
  - version: 9.0.0
    date: 2026-06-21
    changes: "Dodano opcję splitKeys (jeden słownik na klucz przestrzeni nazw najwyższego poziomu) dla układów jednoplikowych next-intl / react-intl"
  - version: 6.1.6
    date: 2025-10-05
    changes: "Pierwsza dokumentacja wtyczki Sync JSON"
author: aymericzip
---

# Sync JSON (mosty i18n) - Sync JSON z obsługą ICU / i18next

<iframe title="Jak zachować synchronizację tłumaczeń JSON z Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/MpGMxniDHNg?autoplay=0&amp;origin=https://intlayer.org&amp;controls=0&amp;rel=1"/>

Użyj Intlayer jako dodatku do istniejącego stosu i18n. Ta wtyczka utrzymuje synchronizację Twoich komunikatów JSON ze słownikami Intlayer, dzięki czemu możesz:

- Zachować i18next, next-intl, react-intl, vue-i18n, next-translate, nuxt-i18n, Solid-i18next, svelte-i18n itp.
- Zarządzać i tłumaczyć swoje komunikaty za pomocą Intlayer (CLI, CI, dostawcy, CMS), bez konieczności refaktoryzacji aplikacji.
- Dostarczać samouczki i treści SEO skierowane do każdego ekosystemu, jednocześnie sugerując Intlayer jako warstwę zarządzania JSON.

Uwagi i obecny zakres:

- Eksport do CMS działa dla tłumaczeń i klasycznego tekstu.
- Brak jeszcze wsparcia dla wstawek, liczby mnogiej/ICU lub zaawansowanych funkcji czasu wykonywania innych bibliotek.
- Edytor wizualny nie jest jeszcze obsługiwany dla wyjść i18n zewnętrznych bibliotek.

### Kiedy używać tej wtyczki

- Już korzystasz z biblioteki i18n i przechowujesz komunikaty w plikach JSON.
- Chcesz korzystać z wypełniania wspomaganego przez AI, testów w CI oraz operacji na treściach bez zmiany środowiska renderowania.

## Instalacja

```bash
pnpm add -D @intlayer/sync-json-plugin
# lub
npm i -D @intlayer/sync-json-plugin
```

## Plugins

This package provides two plugins:

- `loadJSON`: Load JSON files into Intlayer dictionaries.
  - This plugin is used to load JSON files from a source and will be loaded into Intlayer dictionaries. It can scan all the codebase and search for specific JSON files.
    This plugin can be used
    - if you use an i18n library that impose a specific location for your JSON to be loaded (ex: `next-intl`, `i18next`, `react-intl`, `vue-i18n`, etc.), but you want to place your content declaration where you want in your code base.
    - It can also be used if you want to fetch your messages from a remote source (ex: a CMS, a API, etc.) and store your messages in JSON files.

  > Under the hood, this plugin will scan all the codebase and search for specific JSON files and load them into Intlayer dictionaries.
  > Note that this plugin will not write the output and translations back to the JSON files.

- `syncJSON`: Synchronize JSON files with Intlayer dictionaries.
  - This plugin is used to synchronize JSON files with Intlayer dictionaries. It can scan the given location and load the JSON that match the pattern for specific JSON files. This plugin is useful if you want to get the benefits of Intlayer while using another i18n library.

## Using both plugins

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { loadJSON, syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },

  // Keep your current JSON files in sync with Intlayer dictionaries
  plugins: [
    /**
     * Will load all the JSON files in the src that match the pattern {key}.i18n json
     */
    loadJSON({
      source: ({ key }) => `./src/**/${key}.i18n.json`,
      locale: Locales.ENGLISH,
      priority: 1, // Ensures these JSON files take precedence over files at `./locales/en/${key}.json`
      format: "intlayer", // Format of the JSON content
    }),
    /**
     * Will load, and write the output and translations back to the JSON files in the locales directory
     */
    syncJSON({
      format: "i18next",
      source: ({ key, locale }) => `./locales/${locale}/${key}.json`,
      priority: 0,
      format: "i18next",
    }),
  ],
};

export default config;
```

## `syncJSON` plugin

### Quick start

Add the plugin to your `intlayer.config.ts` and point it at your existing JSON structure.

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },

  // Synchronizuj swoje obecne pliki JSON ze słownikami Intlayer
  plugins: [
    syncJSON({
      // Układ per-locale, per-namespace (np. next-intl, i18next z przestrzeniami nazw)
      source: ({ key, locale }) => `./locales/${locale}/${key}.json`,
      format: "icu",
    }),
  ],
};

export default config;
```

Alternatywa: pojedynczy plik na locale (częste w konfiguracjach i18next/react-intl):

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.ENGLISH,
  },
  plugins: [
    syncJSON({
      format: "i18next",
      source: ({ locale }) => `./locales/${locale}.json`,
      format: "i18next",
    }),
  ],
};

export default config;
```

#### How it works

- Odczyt: wtyczka wykrywa pliki JSON zdefiniowane przez twój builder `source` i ładuje je jako słowniki Intlayer.
- Zapis: po budowaniu i wypełnianiu, zapisuje zlokalizowane pliki JSON z powrotem pod te same ścieżki (z końcowym znakiem nowej linii, aby uniknąć problemów z formatowaniem).
- Auto‑uzupełnianie: wtyczka deklaruje ścieżkę `autoFill` dla każdego słownika. Uruchomienie `intlayer fill` domyślnie aktualizuje tylko brakujące tłumaczenia w twoich plikach JSON.

API:

```ts
syncJSON({
  source: ({ key, locale }) => string, // wymagane
  location?: string, // opcjonalna etykieta, domyślnie: "plugin"
  priority?: number, // opcjonalny priorytet do rozstrzygania konfliktów, domyślnie: 0
  format?: 'intlayer' | 'icu' | 'i18next', // opcjonalny formatator, używany dla kompatybilności z runtime Intlayer
  splitKeys?: boolean, // opcjonalnie, dzieli pojedynczy plik na jeden słownik na klucz przestrzeni nazw najwyższego poziomu (automatycznie wykrywane)
});
```

#### `format` ('intlayer' | 'icu' | 'i18next')

Określa formatator, który będzie używany do zawartości słownika podczas synchronizacji plików JSON. Pozwala to na używanie różnych składni formatowania wiadomości zgodnych z runtime Intlayer.

- `undefined`: Żaden formatator nie będzie używany, zawartość JSON będzie używana bez zmian.
- `'intlayer'`: Domyślny formatator Intlayer (domyślnie).
- `'icu'`: Używa formatowania wiadomości ICU (zgodne z bibliotekami takimi jak react-intl, vue-i18n).
- `'i18next'`: Używa formatowania wiadomości i18next (zgodne z i18next, next-i18next, Solid-i18next).

> Należy pamiętać, że użycie formatora przekształci zawartość JSON na wejściu i wyjściu. W przypadku złożonych reguł JSON, takich jak liczba mnoga ICU, parsowanie może nie zapewnić mapowania 1 do 1 między wejściem a wyjściem.
> Jeśli nie używasz runtime Intlayer, możesz preferować nie ustawiać formatora.

**Przykład:**

```ts
syncJSON({
  source: ({ key, locale }) => `./locales/${locale}/${key}.json`,
  format: "i18next", // Użyj formatowania i18next dla zgodności
}),
```

#### `splitKeys` (boolean)

Kontroluje, czy pojedynczy plik JSON, którego **klucze pierwszego poziomu są przestrzeniami nazw**, powinien stać się jednym słownikiem na klucz najwyższego poziomu, zamiast pojedynczego słownika zawierającego cały plik.

Odpowiada to modelowi przestrzeni nazw bibliotek takich jak `next-intl` i `react-intl`, gdzie jeden plik `messages/{locale}.json` grupuje kilka przestrzeni nazw według kluczy pierwszego poziomu, z których każda jest adresowana niezależnie (np. `useTranslations('Hero')` rozwiązuje się do słownika `Hero`).

- `undefined` (domyślnie): **automatycznie wykrywane** — plik jest dzielony, gdy wzorzec `source` nie zawiera segmentu `{key}` (jeden plik zawiera każdą przestrzeń nazw), i zachowywany jako pojedynczy słownik w przeciwnym razie (jeden plik na klucz).
- `true`: zawsze dzieli każdy klucz najwyższego poziomu na własny słownik.
- `false`: nigdy nie dzieli; cały plik staje się pojedynczym słownikiem.

Biorąc pod uwagę pojedynczy plik `messages/{locale}.json`:

```json fileName="messages/en.json"
{
  "Hero": { "title": "Full-stack developer" },
  "Nav": { "work": "Work", "about": "About" },
  "About": { "lead": "I build apps end to end." }
}
```

```ts fileName="intlayer.config.ts"
syncJSON({
  format: "icu",
  source: ({ locale }) => `./messages/${locale}.json`,
  // splitKeys: true, // domyślne, ponieważ wzorzec nie zawiera segmentu `{key}`
}),
```

Tworzy to trzy słowniki — `Hero`, `Nav` i `About` — dzięki czemu `useTranslations('Hero')` (next-intl) rozwiązuje się poprawnie. Podczas zapisu zwrotnego wszystkie przestrzenie nazw są ponownie składane w ten sam plik dla danej lokalizacji.

> Kiedy zachowujesz jawny segment `{key}` w swoim `source` (np. `./locales/${locale}/${key}.json`), każdy plik jest już jedną przestrzenią nazw, więc dzielenie jest domyślnie wyłączone.

### Multiple JSON sources and priority

You can add multiple `syncJSON` plugins to synchronize different JSON sources. This is useful when you have multiple i18n libraries or different JSON structures in your project.

#### System priorytetów

Gdy wiele wtyczek celuje w ten sam klucz słownika, parametr `priority` decyduje, która wtyczka ma pierwszeństwo:

- Wyższe liczby priorytetu mają przewagę nad niższymi
- Domyślny priorytet plików `.content` to `0`
- Domyślny priorytet plików zawartości wtyczek to `-1`
- Wtyczki o tym samym priorytecie są przetwarzane w kolejności, w jakiej pojawiają się w konfiguracji

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.ENGLISH,
  },

  plugins: [
    // Główne źródło JSON (najwyższy priorytet)
    syncJSON({
      format: "i18next",
      source: ({ key, locale }) => `./locales/${locale}/${key}.json`,
      location: "main-translations",
      priority: 10,
    }),

    // Zapasowe źródło JSON (niższy priorytet)
    syncJSON({
      format: "i18next",
      source: ({ locale }) => `./fallback-locales/${locale}.json`,
      location: "fallback-translations",
      priority: 5,
    }),

    // Źródło JSON dziedziczone (najniższy priorytet)
    syncJSON({
      format: "i18next",
      source: ({ locale }) => `/my/other/app/legacy/${locale}/messages.json`,
      location: "legacy-translations",
      priority: 1,
    }),
  ],
};

export default config;
```

## Load JSON plugin

### Quick start

Add the plugin to your `intlayer.config.ts` to ingest existing JSON files as Intlayer dictionaries. This plugin is read‑only (no writes to disk):

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { loadJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },

  plugins: [
    // Ingest JSON messages located anywhere in your source tree
    loadJSON({
      source: ({ key }) => `./src/**/${key}.i18n.json`,
      // Load a single locale per plugin instance (defaults to the config defaultLocale)
      locale: Locales.ENGLISH,
      priority: 0,
    }),
  ],
};

export default config;
```

Alternative: per‑locale layout, still read‑only (only the selected locale is loaded):

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { loadJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.ENGLISH,
  },
  plugins: [
    loadJSON({
      // Only files for Locales.FRENCH will be loaded from this pattern
      source: ({ key, locale }) => `./locales/${locale}/${key}.json`,
      locale: Locales.FRENCH,
    }),
  ],
};

export default config;
```

### How it works

- Discover: builds a glob from your `source` builder and collects matching JSON files.
- Ingest: loads each JSON file as an Intlayer dictionary with the provided `locale`.
- Read‑only: does not write or format output files; use `syncJSON` if you need round‑trip sync.
- Auto‑fill ready: defines a `fill` pattern so `intlayer content fill` can populate missing keys.

### API

```ts
loadJSON({
  // Build paths to your JSON. `locale` is optional if your structure has no locale segment
  source: ({ key, locale }) => string,

  // Target locale for the dictionaries loaded by this plugin instance
  // Defaults to configuration.internationalization.defaultLocale
  locale?: Locale,

  // Optional label to identify the source
  location?: string, // default: "plugin"

  // Priority used for conflict resolution against other sources
  priority?: number, // default: 0

  // Optional formatter for the JSON content
  format?: 'intlayer' | 'icu' | 'i18next', // default: 'intlayer'

  // Split a single file into one dictionary per top-level key (auto-detected)
  splitKeys?: boolean,
});
```

#### `format` ('intlayer' | 'icu' | 'i18next')

Specifies the formatter to use for the dictionary content when loading JSON files. This allows using different message formatting syntaxes compatible with various i18n libraries.

- `'intlayer'`: The default Intlayer formatter (default).
- `'icu'`: Uses ICU message formatting (compatible with libraries like react-intl, vue-i18n).
- `'i18next'`: Uses i18next message formatting (compatible with i18next, next-i18next, Solid-i18next).

**Example:**

```ts
loadJSON({
  source: ({ key }) => `./src/**/${key}.i18n.json`,
  locale: Locales.ENGLISH,
  format: "icu", // Use ICU formatting for compatibility
}),
```

#### `splitKeys` (boolean)

Takie samo zachowanie jak w [`syncJSON`](#splitkeys-boolean): gdy pojedynczy plik JSON grupuje kilka przestrzeni nazw według kluczy pierwszego poziomu, każdy klucz najwyższego poziomu staje się własnym słownikiem.

- `undefined` (domyślnie): **automatycznie wykrywane** — dzieli, gdy wzorzec `source` nie zawiera segmentu `{key}`, w przeciwnym razie pojedynczy słownik.
- `true` / `false`: wymusza lub wyłącza dzielenie.

```ts
loadJSON({
  source: ({ locale }) => `./messages/${locale}.json`,
  format: "icu",
  // splitKeys auto-enabled: `Hero`, `Nav`, `About`, … each become a dictionary
}),
```

### Behavior and conventions

- If your `source` mask includes a locale placeholder, only files for the selected `locale` are ingested.
- Jeśli w masce nie ma segmentu `{key}`, każdy klucz najwyższego poziomu pliku staje się domyślnie własnym słownikiem (zobacz [`splitKeys`](#splitkeys-boolean)). Ustaw `splitKeys: false`, aby zamiast tego załadować cały plik jako pojedynczy słownik indeksowy.
- Keys are derived from file paths by substituting the `{key}` placeholder in your `source` builder.
- The plugin only uses discovered files and does not fabricate missing locales or keys.
- The `fill` path is inferred from your `source` and used to update missing values via CLI when you opt‑in.

## Conflict resolution

When the same translation key exists in multiple JSON sources:

1. Wtyczka o najwyższym priorytecie decyduje o ostatecznej wartości
2. Źródła o niższym priorytecie są używane jako zapasowe dla brakujących kluczy
3. Pozwala to na utrzymanie tłumaczeń dziedziczonych podczas stopniowej migracji do nowych struktur

## CLI

Synchronizowane pliki JSON będą traktowane jak inne pliki `.content`. Oznacza to, że wszystkie polecenia intlayer będą dostępne dla synchronizowanych plików JSON. W tym:

- `intlayer content test` do testowania, czy brakuje tłumaczeń
- `intlayer content list` do wyświetlania listy synchronizowanych plików JSON
- `intlayer content fill` do uzupełniania brakujących tłumaczeń
- `intlayer content push` do wysyłania synchronizowanych plików JSON
- `intlayer content pull` do pobierania synchronizowanych plików JSON

Zobacz [Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/cli/index.md) po więcej szczegółów.

## Ograniczenia (aktualne)

- Brak wsparcia dla wstawek lub liczby mnogiej/ICU przy celowaniu w biblioteki firm trzecich.
- Edytor wizualny nie jest jeszcze dostępny dla środowisk uruchomieniowych innych niż Intlayer.
- Synchronizacja tylko plików JSON; formaty katalogów inne niż JSON nie są obsługiwane.

## Dlaczego to ma znaczenie

- Możemy polecać sprawdzone rozwiązania i18n i pozycjonować Intlayer jako dodatek.
- Wykorzystujemy ich SEO/słowa kluczowe z tutorialami, które kończą się sugestią użycia Intlayer do zarządzania JSON.
- Rozszerza docelową grupę odbiorców z „nowych projektów” na „każdy zespół już korzystający z i18n”.
