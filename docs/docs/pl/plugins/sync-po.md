---
createdAt: 2026-05-10
updatedAt: 2026-05-10
title: Plugin Sync PO
description: Synchronizuj słowniki Intlayer z plikami Gettext PO. Zachowaj istniejące i18n, używając Intlayer do zarządzania, tłumaczenia i testowania swoich komunikatów.
keywords:
  - Intlayer
  - Sync PO
  - Gettext
  - i18n
  - tłumaczenia
slugs:
  - doc
  - plugin
  - sync-po
youtubeVideo: https://www.youtube.com/watch?v=MpGMxniDHNg
history:
  - version: 8.9.4
    date: 2026-05-10
    changes: "Początkowa dokumentacja pluginu Sync PO"
author:
  name: Aymeric PINEAU
  github: aymericzip
---

# Sync PO (mosty i18n) - Sync PO ze wsparciem ICU / i18next

Używaj Intlayer jako dodatku do swojego istniejącego stosu i18n. Ten plugin utrzymuje synchronizację komunikatów Gettext PO ze słownikami Intlayer, dzięki czemu możesz:

- Zachować istniejący przepływ pracy tłumaczeń oparty na plikach PO.
- Zarządzać i tłumaczyć swoje komunikaty za pomocą Intlayer (CLI, CI, dostawcy, CMS), bez refaktoryzacji aplikacji.
- Dostarczać samouczki i treści SEO skierowane do każdego ekosystemu, sugerując Intlayer jako warstwę zarządzania plikami PO.

Uwagi i aktualny zakres:

- Externalizacja do CMS działa dla tłumaczeń i klasycznego tekstu.
- Brak jeszcze wsparcia dla wstawek, liczb mnogich/ICU lub zaawansowanych funkcji runtime innych bibliotek wewnątrz samych wpisów PO.
- Edytor wizualny nie jest jeszcze wspierany dla wyjść i18n firm trzecich.

### Kiedy używać tego pluginu

- Używasz już plików Gettext PO do swoich tłumaczeń.
- Chcesz korzystać z wypełniania wspomaganego przez AI, testów w CI i operacji na treści bez zmiany swojego runtime'u renderowania.

## Instalacja

```bash
pnpm add -D @intlayer/sync-po-plugin
# lub
npm i -D @intlayer/sync-po-plugin
```

## Pluginy

Ten pakiet dostarcza dwa pluginy:

- `loadPO`: Ładuje pliki PO do słowników Intlayer.
  - Ten plugin służy do ładowania plików PO ze źródła i zostaną one wczytane do słowników Intlayer. Może on przeszukiwać całą bazę kodu w poszukiwaniu konkretnych plików PO.
    Plugin ten może być używany:
    - jeśli używasz biblioteki i18n, która narzuca określoną lokalizację dla ładowania plików PO, ale chcesz umieścić swoją deklarację treści w dowolnym miejscu w swojej bazie kodu.
    - Może być również używany, jeśli chcesz pobierać komunikaty ze zdalnego źródła (np. CMS, API itp.) i przechowywać je w plikach PO.

  > Pod maską ten plugin przeszuka całą bazę kodu, znajdzie konkretne pliki PO i załaduje je do słowników Intlayer.
  > Pamiętaj, że ten plugin nie będzie zapisywał wyników i tłumaczeń z powrotem do plików PO.

- `syncPO`: Synchronizuje pliki PO ze słownikami Intlayer.
  - Ten plugin służy do synchronizacji plików PO ze słownikami Intlayer. Może on przeszukiwać podaną lokalizację i ładować pliki PO pasujące do wzorca. Plugin ten jest przydatny, jeśli chcesz czerpać korzyści z Intlayer, korzystając jednocześnie z innej biblioteki i18n.

## Używanie obu pluginów

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { loadPO, syncPO } from "@intlayer/sync-po-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },

  // Utrzymuj synchronizację aktualnych plików PO ze słownikami Intlayer
  plugins: [
    /**
     * Załaduje wszystkie pliki PO w src pasujące do wzorca {key}.i18n.po
     */
    loadPO({
      source: ({ key }) => `./src/**/${key}.i18n.po`,
      locale: Locales.ENGLISH,
      priority: 1, // Zapewnia, że te pliki PO mają pierwszeństwo przed plikami w `./locales/en/${key}.po`
    }),
    /**
     * Załaduje i zapisze wyniki oraz tłumaczenia z powrotem do plików PO w katalogu locales
     */
    syncPO({
      source: ({ key, locale }) => `./locales/${locale}/${key}.po`,
      priority: 0,
    }),
  ],
};

export default config;
```

## Plugin `syncPO`

### Szybki start

Dodaj plugin do swojego `intlayer.config.ts` i skieruj go na istniejącą strukturę plików PO.

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { syncPO } from "@intlayer/sync-po-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },

  // Utrzymuj synchronizację aktualnych plików PO ze słownikami Intlayer
  plugins: [
    syncPO({
      // Układ według języka i przestrzeni nazw
      source: ({ key, locale }) => `./locales/${locale}/${key}.po`,
    }),
  ],
};

export default config;
```

Alternatywa: pojedynczy plik na język:

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { syncPO } from "@intlayer/sync-po-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.ENGLISH,
  },
  plugins: [
    syncPO({
      source: ({ locale }) => `./locales/${locale}.po`,
    }),
  ],
};

export default config;
```

#### Jak to działa

- Odczyt: plugin wykrywa pliki PO za pomocą konstruktora `source` i ładuje je jako słowniki Intlayer.
- Zapis: po zbudowaniu i wypełnieniu, zapisuje zlokalizowane pliki PO z powrotem pod tymi samymi ścieżkami (z odpowiednimi nagłówkami Gettext).
- Automatyczne wypełnianie: plugin deklaruje ścieżkę `autoFill` dla każdego słownika. Uruchomienie `intlayer fill` domyślnie aktualizuje tylko brakujące tłumaczenia w plikach PO.

API:

```ts
syncPO({
  source: ({ key, locale }) => string, // wymagane
  location?: string, // opcjonalna etykieta, domyślnie: "sync-po::path/to/source"
  priority?: number, // opcjonalny priorytet dla rozwiązywania konfliktów, domyślnie: 0
});
```

### Wiele źródeł PO i priorytet

Możesz dodać wiele pluginów `syncPO`, aby synchronizować różne źródła PO. Jest to przydatne, gdy masz wiele źródeł tłumaczeń lub różne struktury PO w swoim projekcie.

#### System priorytetów

Gdy wiele pluginów celuje w ten sam klucz słownika, parametr `priority` decyduje, który plugin ma pierwszeństwo:

- Wyższe numery priorytetu wygrywają z niższymi
- Domyślny priorytet plików `.content` to `0`
- Domyślny priorytet pluginów to `0`
- Pluginy o tym samym priorytecie są przetwarzane w kolejności, w jakiej pojawiają się w konfiguracji

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { syncPO } from "@intlayer/sync-po-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.ENGLISH,
  },

  plugins: [
    // Główne źródło PO (najwyższy priorytet)
    syncPO({
      source: ({ key, locale }) => `./locales/${locale}/${key}.po`,
      location: "main-translations",
      priority: 10,
    }),

    // Zapasowe źródło PO (niższy priorytet)
    syncPO({
      source: ({ locale }) => `./fallback-locales/${locale}.po`,
      location: "fallback-translations",
      priority: 5,
    }),

    // Starsze źródło PO (najniższy priorytet)
    syncPO({
      source: ({ locale }) => `/my/other/app/legacy/${locale}/messages.po`,
      location: "legacy-translations",
      priority: 1,
    }),
  ],
};

export default config;
```

## Plugin Load PO

### Szybki start

Dodaj plugin do swojego `intlayer.config.ts`, aby wczytać istniejące pliki PO jako słowniki Intlayer. Ten plugin jest tylko do odczytu (brak zapisu na dysku):

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { loadPO } from "@intlayer/sync-po-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },

  plugins: [
    // Wczytaj komunikaty PO znajdujące się w dowolnym miejscu w drzewie źródeł
    loadPO({
      source: ({ key }) => `./src/**/${key}.i18n.po`,
      // Ładuj jeden język na instancję pluginu (domyślnie defaultLocale z konfiguracji)
      locale: Locales.ENGLISH,
      priority: 0,
    }),
  ],
};

export default config;
```

Alternatywa: układ według języka, nadal tylko do odczytu (ładowany jest tylko wybrany język):

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { loadPO } from "@intlayer/sync-po-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.ENGLISH,
  },
  plugins: [
    loadPO({
      // Tylko pliki dla Locales.FRENCH zostaną wczytane z tego wzorca
      source: ({ key, locale }) => `./locales/${locale}/${key}.po`,
      locale: Locales.FRENCH,
    }),
  ],
};

export default config;
```

### Jak to działa

- Wykrywanie: buduje glob z konstruktora `source` i zbiera pasujące pliki PO.
- Wczytywanie: ładuje każdy plik PO jako słownik Intlayer z podanym `locale`.
- Tylko do odczytu: nie zapisuje ani nie formatuje plików wynikowych; użyj `syncPO`, jeśli potrzebujesz synchronizacji w obie strony.
- Gotowy do automatycznego wypełniania: definiuje ścieżkę `fill`, aby `intlayer content fill` mógł uzupełnić brakujące klucze.

### API

```ts
loadPO({
  // Buduj ścieżki do plików PO. `locale` jest opcjonalny, jeśli Twoja struktura nie ma segmentu języka
  source: ({ key, locale }) => string,

  // Docelowy język dla słowników ładowanych przez tę instancję pluginu
  // Domyślnie configuration.internationalization.defaultLocale
  locale?: Locale,

  // Opcjonalna etykieta do identyfikacji źródła
  location?: string, // domyślnie: "plugin"

  // Priorytet używany do rozwiązywania konfliktów z innymi źródłami
  priority?: number, // domyślnie: 0
});
```

### Zachowanie i konwencje

- Jeśli maska `source` zawiera symbol zastępczy języka, wczytywane są tylko pliki dla wybranego `locale`.
- Jeśli w masce nie ma segmentu `{key}`, kluczem słownika jest "index".
- Klucze są wyprowadzane ze ścieżek plików poprzez zastąpienie symbolu zastępczego `{key}` w konstruktorze `source`.
- Plugin używa tylko wykrytych plików i nie tworzy brakujących języków ani kluczy.
- Ścieżka `fill` jest wywnioskowana z `source` i używana do aktualizacji brakujących wartości przez CLI, gdy się na to zdecydujesz.

## Rozwiązywanie konfliktów

Gdy ten sam klucz tłumaczenia istnieje w wielu źródłach PO:

1. Plugin o najwyższym priorytecie określa ostateczną wartość
2. Źródła o niższym priorytecie są używane jako rezerwowe dla brakujących kluczy
3. Pozwala to na zachowanie starszych tłumaczeń przy jednoczesnym stopniowym przechodzeniu na nowe struktury

## CLI

Zsynchronizowane pliki PO będą traktowane jak inne pliki `.content`. Oznacza to, że wszystkie polecenia intlayer będą dostępne dla zsynchronizowanych plików PO. W tym:

- `intlayer content test` aby przetestować, czy brakuje tłumaczeń
- `intlayer content list` aby wyświetlić listę zsynchronizowanych plików PO
- `intlayer content fill` aby wypełnić brakujące tłumaczenia
- `intlayer content push` aby wysłać zsynchronizowane pliki PO
- `intlayer content pull` aby pobrać zsynchronizowane pliki PO

Zobacz [Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/cli/index.md) po więcej szczegółów.

## Ograniczenia (aktualne)

- Brak wsparcia dla wstawek lub liczb mnogich/ICU przy celowaniu w biblioteki firm trzecich.
- Edytor wizualny nie jest jeszcze dostępny dla runtime'ów innych niż Intlayer.
- Tylko synchronizacja PO; formaty katalogów inne niż PO nie są wspierane.

## Dlaczego to ważne

- Możemy polecać uznane rozwiązania i18n i pozycjonować Intlayer jako dodatek.
- Wykorzystujemy ich SEO/słowa kluczowe za pomocą samouczków, które kończą się sugestią użycia Intlayer do zarządzania plikami PO.
- Rozszerza grono odbiorców z „nowych projektów” na „każdy zespół korzystający już z i18n”.
