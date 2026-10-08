---
createdAt: 2025-03-13
updatedAt: 2026-10-08
priority: 6
title: "Plugin Sync JSON: zachowaj swoje pliki JSON i18n"
description: "Synchronizuj słowniki Intlayer z plikami JSON i18next, next-intl, react-intl lub vue-i18n i zarządzaj nimi, tłumacz je i testuj w Intlayer."
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

## Kiedy używać tej wtyczki

- Już korzystasz z biblioteki i18n i przechowujesz komunikaty w plikach JSON.
- Chcesz korzystać z wypełniania wspomaganego przez AI, testów w CI oraz operacji na treściach bez zmiany środowiska renderowania.

## Instalacja

```bash
pnpm add -D @intlayer/sync-json-plugin
# lub
npm i -D @intlayer/sync-json-plugin
```

## Wtyczki (Plugins)

Ten pakiet dostarcza dwie wtyczki:

- `loadJSON`: Ładuje pliki JSON do słowników Intlayer.
  - Ta wtyczka służy do wczytywania plików JSON ze źródła do słowników Intlayer. Może przeszukać całą bazę kodu w poszukiwaniu określonych plików JSON.
    Wtyczka ta jest przydatna:
    - gdy używasz biblioteki i18n narzucającej określoną lokalizację dla plików JSON (np. `next-intl`, `i18next`, `react-intl`, `vue-i18n` itp.), ale chcesz umieszczać deklaracje treści w dowolnym miejscu w bazie kodu.
    - gdy chcesz pobierać komunikaty ze zdalnego źródła (np. CMS, API itp.) i przechowywać je w plikach JSON.

  > Pod maską wtyczka przeszukuje całą bazę kodu, odnajduje określone pliki JSON i ładuje je do słowników Intlayer.
  > Pamiętaj, że ta wtyczka nie zapisuje wyników ani tłumaczeń z powrotem do plików JSON.

- `syncJSON`: Synchronizuje pliki JSON ze słownikami Intlayer.
  - Ta wtyczka służy do dwukierunkowej synchronizacji plików JSON ze słownikami Intlayer. Skanuje wskazaną lokalizację i ładuje pliki JSON pasujące do wzorca. Jest idealna, jeśli chcesz korzystać z możliwości Intlayer, zachowując jednocześnie inną bibliotekę i18n.

## Używanie obu wtyczek jednocześnie

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { loadJSON, syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },

  // Synchronizuj obecne pliki JSON ze słownikami Intlayer
  plugins: [
    /**
     * Wczyta wszystkie pliki JSON w katalogu src pasujące do wzorca {key}.i18n.json
     */
    loadJSON({
      source: ({ key }) => `./src/**/${key}.i18n.json`,
      locale: Locales.ENGLISH,
      priority: 1, // Zapewnia pierwszeństwo tym plikom JSON nad plikami w ./locales/en/${key}.json
      format: "intlayer", // Format treści JSON
    }),
    /**
     * Wczyta oraz zapisze wyniki i tłumaczenia z powrotem do plików JSON w katalogu locales
     */
    syncJSON({
      source: ({ key, locale }) => `./locales/${locale}/${key}.json`,
      priority: 0,
      format: "i18next",
    }),
  ],
};

export default config;
```

## Wtyczka `syncJSON`

### Szybki start

Dodaj wtyczkę do pliku `intlayer.config.ts` i wskaż swoją istniejącą strukturę plików JSON:

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },

  // Synchronizuj obecne pliki JSON ze słownikami Intlayer
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
      source: ({ locale }) => `./locales/${locale}.json`,
      format: "i18next",
    }),
  ],
};

export default config;
```

#### Jak to działa

- Odczyt: wtyczka wykrywa pliki JSON zdefiniowane przez funkcję `source` i ładuje je jako słowniki Intlayer.
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

> Należy pamiętać, że użycie formatatora przekształci zawartość JSON na wejściu i wyjściu. W przypadku złożonych reguł JSON, takich jak liczba mnoga ICU, parsowanie może nie zapewnić mapowania 1 do 1 między wejściem a wyjściem.
> Jeśli nie używasz runtime Intlayer, możesz preferować brak ustawienia formatatora.

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

- `undefined` (domyślnie): **automatycznie wykrywane**, plik jest dzielony, gdy wzorzec `source` nie zawiera segmentu `{key}` (jeden plik zawiera każdą przestrzeń nazw), i zachowywany jako pojedynczy słownik w przeciwnym razie (jeden plik na klucz).
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

Tworzy to trzy słowniki (`Hero`, `Nav` i `About`), dzięki czemu `useTranslations('Hero')` (next-intl) rozwiązuje się poprawnie. Podczas zapisu zwrotnego wszystkie przestrzenie nazw są ponownie składane w ten sam plik dla danej lokalizacji.

> Kiedy zachowujesz jawny segment `{key}` w swoim `source` (np. `./locales/${locale}/${key}.json`), każdy plik jest już jedną przestrzenią nazw, więc dzielenie jest domyślnie wyłączone.

### Wiele źródeł JSON i priorytety

Możesz dodać wiele instancji wtyczki `syncJSON`, aby zsynchronizować różne źródła plików JSON. Jest to przydatne, gdy w projekcie korzystasz z wielu bibliotek i18n lub różnych struktur plików JSON.

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

## Wtyczka `loadJSON`

### Szybki start

Dodaj wtyczkę do pliku `intlayer.config.ts`, aby wczytać istniejące pliki JSON jako słowniki Intlayer. Ta wtyczka działa wyłącznie w trybie do odczytu (nie zapisuje na dysk):

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { loadJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },

  plugins: [
    // Wczytuj komunikaty JSON znajdujące się w dowolnym miejscu w drzewie źródłowym
    loadJSON({
      source: ({ key }) => `./src/**/${key}.i18n.json`,
      // Ładuje pojedyncze locale na instancję wtyczki (domyślnie defaultLocale z konfiguracji)
      locale: Locales.ENGLISH,
      priority: 0,
    }),
  ],
};

export default config;
```

Alternatywa: układ per-locale, wciąż w trybie tylko do odczytu (ładowane jest tylko wybrane locale):

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
      // Z tego wzorca załadowane zostaną tylko pliki dla Locales.FRENCH
      source: ({ key, locale }) => `./locales/${locale}/${key}.json`,
      locale: Locales.FRENCH,
    }),
  ],
};

export default config;
```

### Jak to działa

- Wykrywanie: tworzy wzorzec glob na podstawie funkcji `source` i zbiera pasujące pliki JSON.
- Wczytywanie: ładuje każdy plik JSON jako słownik Intlayer z podanym `locale`.
- Tylko do odczytu: nie modyfikuje ani nie formatuje plików wyjściowych na dysku; użyj `syncJSON`, jeśli potrzebujesz synchronizacji dwukierunkowej.
- Gotowość do auto-uzupełniania: definiuje wzorzec `fill`, dzięki czemu `intlayer content fill` może uzupełniać brakujące klucze.

### API

```ts
loadJSON({
  // Buduj ścieżki do plików JSON. `locale` jest opcjonalne, jeśli struktura nie ma segmentu locale
  source: ({ key, locale }) => string,

  // Docelowe locale dla słowników ładowanych przez tę instancję wtyczki
  // Domyślnie configuration.internationalization.defaultLocale
  locale?: Locale,

  // Opcjonalna etykieta identyfikująca źródło
  location?: string, // domyślnie: "plugin"

  // Priorytet używany do rozwiązywania konfliktów z innymi źródłami
  priority?: number, // domyślnie: 0

  // Opcjonalny formatator zawartości JSON
  format?: 'intlayer' | 'icu' | 'i18next', // domyślnie: 'intlayer'

  // Dzieli pojedynczy plik na jeden słownik na klucz najwyższego poziomu (automatycznie wykrywane)
  splitKeys?: boolean,
});
```

#### `format` ('intlayer' | 'icu' | 'i18next')

Określa formatator używany do zawartości słownika podczas ładowania plików JSON. Pozwala to na obsługę różnych składni formatowania komunikatów zgodnych z różnymi bibliotekami i18n.

- `'intlayer'`: Domyślny formatator Intlayer (domyślnie).
- `'icu'`: Używa formatowania komunikatów ICU (zgodne z bibliotekami takimi jak react-intl, vue-i18n).
- `'i18next'`: Używa formatowania komunikatów i18next (zgodne z i18next, next-i18next, Solid-i18next).

**Przykład:**

```ts
loadJSON({
  source: ({ key }) => `./src/**/${key}.i18n.json`,
  locale: Locales.ENGLISH,
  format: "icu", // Użyj formatowania ICU dla zgodności
}),
```

#### `splitKeys` (boolean)

Takie samo zachowanie jak w [`syncJSON`](#splitkeys-boolean): gdy pojedynczy plik JSON grupuje kilka przestrzeni nazw według kluczy pierwszego poziomu, każdy klucz najwyższego poziomu staje się własnym słownikiem.

- `undefined` (domyślnie): **automatycznie wykrywane**, dzieli, gdy wzorzec `source` nie zawiera segmentu `{key}`, w przeciwnym razie pojedynczy słownik.
- `true` / `false`: wymusza lub wyłącza dzielenie.

```ts
loadJSON({
  source: ({ locale }) => `./messages/${locale}.json`,
  format: "icu",
  // splitKeys automatycznie włączone: `Hero`, `Nav`, `About` stają się osobnymi słownikami
}),
```

### Zachowanie i konwencje

- Jeśli maska `source` zawiera symbol zastępczy locale, ładowane są tylko pliki dla wybranego `locale`.
- Jeśli w masce nie ma segmentu `{key}`, każdy klucz najwyższego poziomu pliku staje się domyślnie własnym słownikiem (zobacz [`splitKeys`](#splitkeys-boolean)). Ustaw `splitKeys: false`, aby zamiast tego załadować cały plik jako pojedynczy słownik indeksowy.
- Klucze są wyprowadzane ze ścieżek plików poprzez podstawienie parametru `{key}` we wzorcu `source`.
- Wtyczka przetwarza wyłącznie wykryte pliki i nie tworzy sztucznie brakujących lokalizacji czy kluczy.
- Ścieżka `fill` jest określana na podstawie `source` i używana do aktualizacji brakujących wartości przez CLI po wywołaniu polecenia.

## Rozwiązywanie konfliktów

Gdy ten sam klucz tłumaczenia istnieje w wielu źródłach JSON:

1. Wtyczka o najwyższym priorytecie decyduje o ostatecznej wartości.
2. Źródła o niższym priorytecie są używane jako zapasowe dla brakujących kluczy.
3. Pozwala to na zachowanie tłumaczeń dziedziczonych podczas stopniowej migracji do nowych struktur.

## CLI

Synchronizowane pliki JSON będą traktowane jak inne pliki `.content`. Oznacza to, że wszystkie polecenia Intlayer CLI będą dostępne dla synchronizowanych plików JSON, w tym:

- `intlayer content test` do testowania, czy brakuje tłumaczeń
- `intlayer content list` do wyświetlania listy synchronizowanych plików JSON
- `intlayer content fill` do uzupełniania brakujących tłumaczeń
- `intlayer content push` do wysyłania synchronizowanych plików JSON
- `intlayer content pull` do pobierania synchronizowanych plików JSON

Zobacz [Dokumentację Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/cli/index.md) po więcej szczegółów.

## Ograniczenia (aktualne)

- Brak wsparcia dla wstawek lub liczby mnogiej/ICU przy kierowaniu do bibliotek firm trzecich.
- Edytor wizualny nie jest jeszcze dostępny dla środowisk uruchomieniowych innych niż Intlayer.
- Synchronizacja tylko plików JSON; formaty katalogów inne niż JSON nie są obsługiwane.

## Dlaczego to ma znaczenie

- Możemy polecać sprawdzone rozwiązania i18n i pozycjonować Intlayer jako dodatek.
- Wykorzystujemy ich SEO/słowa kluczowe z tutorialami, które kończą się sugestią użycia Intlayer do zarządzania JSON.
- Rozszerza docelową grupę odbiorców z „nowych projektów” na „każdy zespół już korzystający z i18n”.
