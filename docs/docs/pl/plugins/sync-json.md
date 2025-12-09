---
createdAt: 2025-03-13
updatedAt: 2025-10-05
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
  - version: 6.1.6
    date: 2025-10-05
    changes: Pierwsza dokumentacja wtyczki Sync JSON
---

# Sync JSON (mosty i18n)

<iframe title="Jak zachować synchronizację tłumaczeń JSON z Intlayer" class="m-auto aspect-[16/9] w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/MpGMxniDHNg?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

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

## Szybki start

Dodaj wtyczkę do swojego pliku `intlayer.config.ts` i wskaż ją na istniejącą strukturę JSON.

```ts fileName="intlayer.config.ts"
import { defineConfig, Locales } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

export default defineConfig({
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },

  // Synchronizuj swoje obecne pliki JSON ze słownikami Intlayer
  plugins: [
    syncJSON({
      // Układ per-locale, per-namespace (np. next-intl, i18next z przestrzeniami nazw)
      source: ({ key, locale }) => `./locales/${locale}/${key}.json`,
    }),
  ],
});
```

Alternatywa: pojedynczy plik na locale (częste w konfiguracjach i18next/react-intl):

```ts fileName="intlayer.config.ts"
plugins: [
  syncJSON({
    source: ({ locale }) => `./locales/${locale}.json`,
  }),
];
```

### Jak to działa

- Odczyt: wtyczka wykrywa pliki JSON zdefiniowane przez twój builder `source` i ładuje je jako słowniki Intlayer.
- Zapis: po budowaniu i wypełnianiu, zapisuje zlokalizowane pliki JSON z powrotem pod te same ścieżki (z końcowym znakiem nowej linii, aby uniknąć problemów z formatowaniem).
- Auto‑uzupełnianie: wtyczka deklaruje ścieżkę `autoFill` dla każdego słownika. Uruchomienie `intlayer fill` domyślnie aktualizuje tylko brakujące tłumaczenia w twoich plikach JSON.

API:

```ts
syncJSON({
  source: ({ key, locale }) => string, // wymagane
  location?: string, // opcjonalna etykieta, domyślnie: "plugin"
  priority?: number, // opcjonalny priorytet do rozstrzygania konfliktów, domyślnie: 0
});
```

## Wiele źródeł JSON i priorytet

Możesz dodać wiele wtyczek `syncJSON`, aby synchronizować różne źródła JSON. Jest to przydatne, gdy masz wiele bibliotek i18n lub różne struktury JSON w swoim projekcie.

### System priorytetów

Gdy wiele wtyczek celuje w ten sam klucz słownika, parametr `priority` decyduje, która wtyczka ma pierwszeństwo:

- Wyższe liczby priorytetu mają przewagę nad niższymi
- Domyślny priorytet plików `.content` to `0`
- Domyślny priorytet plików zawartości wtyczek to `-1`
- Wtyczki o tym samym priorytecie są przetwarzane w kolejności, w jakiej pojawiają się w konfiguracji

```ts fileName="intlayer.config.ts"
import { defineConfig, Locales } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

export default defineConfig({
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.ENGLISH,
  },

  plugins: [
    // Główne źródło JSON (najwyższy priorytet)
    syncJSON({
      source: ({ key, locale }) => `./locales/${locale}/${key}.json`,
      location: "main-translations",
      priority: 10,
    }),

    // Zapasowe źródło JSON (niższy priorytet)
    syncJSON({
      source: ({ locale }) => `./fallback-locales/${locale}.json`,
      location: "fallback-translations",
      priority: 5,
    }),

    // Źródło JSON dziedziczone (najniższy priorytet)
    syncJSON({
      source: ({ locale }) => `/my/other/app/legacy/${locale}/messages.json`,
      location: "legacy-translations",
      priority: 1,
    }),
  ],
});
```

### Rozwiązywanie konfliktów

Gdy ten sam klucz tłumaczenia występuje w wielu źródłach JSON:

1. Wtyczka o najwyższym priorytecie decyduje o ostatecznej wartości
2. Źródła o niższym priorytecie są używane jako zapasowe dla brakujących kluczy
3. Pozwala to na utrzymanie tłumaczeń dziedziczonych podczas stopniowej migracji do nowych struktur

## Integracje

Poniżej znajdują się typowe mapowania. Zachowaj swój runtime bez zmian; dodaj tylko wtyczkę.

### i18next

Typowy układ plików: `./public/locales/{locale}/{namespace}.json` lub `./locales/{locale}/{namespace}.json`.

```ts fileName="intlayer.config.ts"
import { syncJSON } from "@intlayer/sync-json-plugin";

export default {
  plugins: [
    syncJSON({
      source: ({ key, locale }) => `./locales/${locale}/${key}.json`,
    }),
  ],
};
```

### next-intl

Wiadomości JSON na locale (często `./messages/{locale}.json`) lub na namespace.

```ts fileName="intlayer.config.ts"
plugins: [
  syncJSON({
    source: ({ locale, key }) => `./messages/${locale}/${key}.json`,
  }),
];
```

Zobacz także: `docs/pl/intlayer_with_next-intl.md`.

### react-intl

Pojedynczy JSON na locale jest powszechny:

```ts fileName="intlayer.config.ts"
plugins: [
  syncJSON({
    source: ({ locale }) => `./locales/${locale}.json`,
  }),
];
```

### vue-i18n

Może to być pojedynczy plik na locale lub na namespace:

```ts fileName="intlayer.config.ts"
plugins: [
  syncJSON({
    source: ({ key, locale }) => `./src/locales/${locale}/${key}.json`,
  }),
];
```

## CLI

Synchronizowane pliki JSON będą traktowane jak inne pliki `.content`. Oznacza to, że wszystkie polecenia intlayer będą dostępne dla synchronizowanych plików JSON. W tym:

- `intlayer content test` do testowania, czy brakuje tłumaczeń
- `intlayer content list` do wyświetlania listy synchronizowanych plików JSON
- `intlayer content fill` do uzupełniania brakujących tłumaczeń
- `intlayer content push` do wysyłania synchronizowanych plików JSON
- `intlayer content pull` do pobierania synchronizowanych plików JSON

Zobacz [Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_cli.md) po więcej szczegółów.

## Ograniczenia (aktualne)

- Brak wsparcia dla wstawek lub liczby mnogiej/ICU przy celowaniu w biblioteki firm trzecich.
- Edytor wizualny nie jest jeszcze dostępny dla środowisk uruchomieniowych innych niż Intlayer.
- Synchronizacja tylko plików JSON; formaty katalogów inne niż JSON nie są obsługiwane.

## Dlaczego to ma znaczenie

- Możemy polecać sprawdzone rozwiązania i18n i pozycjonować Intlayer jako dodatek.
- Wykorzystujemy ich SEO/słowa kluczowe z tutorialami, które kończą się sugestią użycia Intlayer do zarządzania JSON.
- Rozszerza docelową grupę odbiorców z „nowych projektów” na „każdy zespół już korzystający z i18n”.
