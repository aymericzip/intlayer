---
createdAt: 2026-09-02
updatedAt: 2026-09-02
title: "Jak wykrywać brakujące tłumaczenia, zanim zrobią to użytkownicy"
description: Brakujące tłumaczenia zawodzą po cichu. Dlaczego mechanizm fallback je ukrywa, jakie cztery warstwy wykrywania naprawdę działają i jak zatrzymać build na nieprzetłumaczonym kluczu.
keywords:
  - znajdź brakujące tłumaczenia
  - brakujące klucze tłumaczeń
  - audyt i18n
  - nieprzetłumaczone ciągi znaków
  - pokrycie tłumaczeń
  - i18n lint
slugs:
  - blog
  - detecting-missing-translations
author: aymericzip
---

# Jak wykrywać brakujące tłumaczenia, zanim zrobią to użytkownicy

Brakujące tłumaczenie prawie nigdy nie rzuca wyjątku. W zależności od konfiguracji wyświetla japońskiemu użytkownikowi tekst po angielsku lub drukuje `checkout.summary.total` wprost na stronie produkcyjnej. Obydwa przypadki trafiają na produkcję, przechodzą code review i zostają zauważone przez klienta, a nie przez Ciebie.

## Spis treści

<TOC/>

## Dotyczy to każdej biblioteki, której używasz

Nic z tego, co tu opisano, nie jest ograniczone do jednego konkretnego stosu technologicznego. Poniższe warstwy detekcji działają identycznie w i18next, react-i18next, next-intl, react-intl, vue-i18n, next-translate czy Lingui, ponieważ wszystkie rozwiązują klucze w ten sam sposób i zawodzą według tego samego schematu.

Narzędzia również są przenośne. Jeśli Twoje teksty znajdują się w katalogach JSON, [wtyczka Sync JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/plugins/sync-json.md) podłącza Intlayer do tych plików, dając Ci dostęp do poleceń audytu, wypełniania i testowania bez przenoszenia treści i bez zmiany choćby jednego importu:

```ts fileName="intlayer.config.ts"
import { syncJSON } from "@intlayer/sync-json-plugin";

const config = {
  plugins: [
    syncJSON({
      source: ({ key, locale }) => `./locales/${locale}/${key}.json`,
      format: "i18next", // lub "icu" dla next-intl / react-intl
    }),
  ],
};

export default config;
```

Jeśli zależy Ci również na zachowaniu dotychczasowego runtime API, [adaptery kompatybilności](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/compat/index.md) tworzą aliasy dla `useTranslation`, `$t` i pokrewnych na poziomie bundlera. W każdym przypadku traktuj poniższe komendy jako praktyczną realizację koncepcji, a nie sztywny wymóg.

## Dlaczego braki są niewidoczne

Każda biblioteka i18n rozwiązuje klucz według tego samego łańcucha: sprawdź aktywny język, sięgnij po język domyślny (fallback), a jeśli to zawiedzie, zwróć sam klucz. To właśnie ten ostatni krok stanowi sedno problemu. Nie ma błędu, nie ma ostrzeżenia na produkcji i żaden test nie zgłasza awarii, ponieważ żaden element potoku nie traktuje brakującego klucza jako anomalii.

Fallback tylko pogarsza sprawę zamiast ją naprawiać. Strona renderująca się po cichu w języku angielskim wygląda całkowicie poprawnie dla anglojęzycznego programisty i dla każdego zautomatyzowanego testu. Błąd jest widoczny wyłącznie dla osoby, która nie rozumie wyświetlonego tekstu.

Pytanie nie brzmi zatem "jak obsługiwać brakujące tłumaczenia w runtime". Brzmi ono: "jak uniemożliwić zmergowanie brakującego tłumaczenia".

## Cztery warstwy, w których możesz je wychwycić

Każda warstwa wyłapuje to, czego inne nie potrafią dostrzec. Najlepiej wdrożyć więcej niż jedną.

| Warstwa            | Co wykrywa                                       | Co pomija                                                |
| :----------------- | :----------------------------------------------- | :------------------------------------------------------- |
| Typy               | Klucze, które w ogóle nie istnieją               | Klucz istnieje, ale nie ma wartości w `ja`               |
| Linter             | Teksty na sztywno, niewysłane do tłumaczenia     | Klucze brakujące w konkretnym katalogu                   |
| Audyt              | Pokrycie językowe każdego zadeklarowanego klucza | Teksty, które nigdy nie zostały oznaczone do tłumaczenia |
| Testy renderowania | Klucze, które się rozwiązują, ale źle renderują  | Wszystko, co nie zostało objęte testem                   |

Najczęstszą luką w zespołach jest trzeci wiersz: programiści wiedzą, że ich klucze są poprawne pod kątem typów, ale nic nie sprawdza, czy wszystkie osiemnaście języków rzeczywiście posiada przypisaną wartość.

## Warstwa 1: uczyń klucz typem, a nie ciągiem znaków

`t("checkout.summry.total")` to literówka, która bez trudu się kompiluje. Jeśli Twoje klucze są zwykłymi ciągami znaków, każda zmiana nazwy niesie ryzyko na produkcji, a każde usunięcie pozostawia osierocone wpisy.

Typowane klucze zamieniają to w błąd kompilacji. `react-i18next` wspiera to przez declaration merging, `next-intl` wnioskuje typy ze struktury wiadomości, Lingui generuje identyfikatory z tekstu źródłowego, a Intlayer tworzy ścisłe typy z plików deklaracji. Każde z tych rozwiązań działa; różnią się jedynie ilością kodu konfiguracyjnego.

Ta warstwa jest niezbędna, lecz niewystarczająca. Typy opisują kształt Twojego katalogu domyślnego. Nie informują jednak, czy w języku koreańskim istnieje wartość dla danego klucza.

## Warstwa 2: sprawdzaj linterem teksty, które nigdy nie stały się kluczami

Tłumaczenie, którego nie możesz znaleźć, to często to, które nigdy nie zostało wyodrębnione. Etykieta wpisana na sztywno w komponencie jest niewidoczna dla każdego audytu katalogów, ponieważ z perspektywy narzędzi po prostu nie istnieje.

Wtyczka ESLint dla Intlayer rozwiązuje ten problem regułą `no-raw-text`, uzupełnioną o `no-unused-content` dla sytuacji odwrotnej: treści zadeklarowanej, z której nic już nie korzysta.

```js fileName="eslint.config.mjs"
import intlayer from "@intlayer/eslint-plugin";

export default [
  intlayer.configs.recommended,
  {
    rules: {
      "@intlayer/no-raw-text": "error",
      "@intlayer/no-unused-content": "warn",
    },
  },
];
```

`no-unused-content` zapobiega niekontrolowanemu rozrastaniu się katalogów. Martwe klucze nie psują działania aplikacji, ale niepotrzebnie powiększają rachunki za tłumaczenia. Pełna lista reguł znajduje się w [dokumentacji wtyczki ESLint](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/eslint.md).

## Warstwa 3: audyt pokrycia języków

To warstwa, która bezpośrednio odpowiada na właściwe pytanie. Intlayer dostarcza ją jako polecenie CLI:

```bash packageManager="npm"
npx intlayer content test
```

Polecenie odczytuje skonfigurowane języki i zadeklarowane słowniki, po czym zgłasza, którym kluczom brakuje tłumaczeń, w jakich językach i w jakim pliku.

Ważny szczegół przed włączeniem tego do procesów CI: **CLI drukuje raport, ale kończy działanie z kodem wyjścia 0.** Jeśli dodasz je do potoku, oczekując przerwania buildu, otrzymasz zielony build z długim raportem tekstowym, którego nikt nie przeczyta. Do blokowania kompilacji użyj programistycznego API opisanego poniżej.

## Warstwa 4: asercje w zestawie testów

`listMissingTranslations()` zwraca dokładnie ten sam audyt w formie ustrukturyzowanych danych, co idealnie nadaje się do stworzenia bramki kompilacji (build gate).

```ts fileName="i18n.test.ts"
/* @vitest-environment node */
import { listMissingTranslations } from "intlayer/cli";
import { describe, expect, it } from "vitest";

describe("translations", () => {
  it("has no missing required locales", async () => {
    const result = await listMissingTranslations();

    if (result.missingRequiredLocales.length > 0) {
      console.log(result.missingTranslations);
    }

    expect(result.missingRequiredLocales).toHaveLength(0);
  });
});
```

Zwracane są trzy pola o istotnym znaczeniu:

- `missingTranslations`: w rozbiciu na klucze, jakich języków brakuje i w jakim pliku. To właśnie te dane drukujesz w przypadku błędu testu.
- `missingLocales`: suma wszystkich brakujących języków we wszystkich kluczach.
- `missingRequiredLocales`: ograniczone do `requiredLocales` z Twojej konfiguracji (lub wszystkie języki, jeśli opcja nie została zdefiniowana).

## `requiredLocales` sprawia, że bramka jest znośna w praktyce

Wydawanie aplikacji w osiemnastu językach nie oznacza, że wszystkie osiemnaście musi być w 100% gotowych, aby móc wdrożyć kod. Większość zespołów posiada poziom krytyczny, który blokuje wydanie, oraz poziom uzupełniany na bieżąco.

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.JAPANESE,
      Locales.POLISH,
    ],
    requiredLocales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

Bez `requiredLocales` każdy zadeklarowany język jest bezwzględnie wymagany, a Twój build pozostanie czerwony, dopóki nie spłynie ostatnie tłumaczenie. W rezultacie zespoły najczęściej całkowicie wyłączają tę weryfikację, co jest gorsze niż brak jakichkolwiek testów.

## Wykrywanie braków, które już trafiły na produkcję

Powyższe warstwy chronią przed nowymi lukami. W przypadku aplikacji, która już działa na produkcji, pomagają dwie techniki.

**Pseudolokalizacja.** Uruchom aplikację ze sztucznym językiem, w którym każdy ciąg znaków jest zmodyfikowany, na przykład `[!!! Ĉĥéçķöũţ !!!]`. Wszystko, co nadal wyświetla się po angielsku, jest zaszyte w kodzie na stałe. Pozwala to w dziesięć minut wykryć to, czego audyt katalogów strukturalnie nie jest w stanie zobaczyć, ponieważ testuje wyrenderowaną stronę, a nie same pliki z danymi.

**Crawlowanie własnej witryny.** Jeśli używasz zlokalizowanych adresów URL, pobierz próbkę podstron dla każdego języka i przeszukaj kod HTML pod kątem ciągów znaków z języka domyślnego. Strona w `/ja/` zawierająca zwrot "Add to cart" to albo brakujące tłumaczenie, albo nieoczekiwany fallback.

```bash
curl -s https://example.com/ja/checkout | grep -c "Add to cart"
```

## Uzupełnianie luk

Gdy wiesz już, czego brakuje, `intlayer fill` uzupełnia puste wpisy, a opcja `autoFill` potrafi generować pliki dla poszczególnych języków bezpośrednio podczas deklarowania zawartości. Zobacz [autoFill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/autoFill.md).

Warto spojrzeć na to trzeźwym okiem: automatyczne uzupełnianie maszynowe zamienia lukę _widoczną_ w lukę _niewidoczną_. Klucz ma teraz wartość, audyt świeci na zielono, ale nikt nie sprawdził sensu sformułowań. Używaj tego do odblokowania release'u, a następnie przekazuj teksty do weryfikacji człowiekowi w przypadku wszystkiego, co klient czyta przed podjęciem decyzji. To rusztowanie pomocnicze, a nie gotowy produkt.

## Częste błędy

- **Traktowanie mechanizmu fallback jako tarczy bezpieczeństwa.** To strategia renderowania awaryjnego, a nie siatka ochronna. Cicho wyświetlana angielska strona to błąd, którego nikt nie zgłasza.
- **Poleganie na raporcie CLI do blokowania CI.** `intlayer content test` kończy się kodem zero. Wymagaj asercji w teście.
- **Wymaganie absolutnie każdego języka.** Kontrola zostaje usunięta przy pierwszym zablokowanym wydaniu.
- **Audytowanie wyłącznie katalogów, a nigdy wyrenderowanego ekranu.** Teksty zaszyte w kodzie są z definicji niewidoczne w katalogach.
- **Testowanie tylko języka domyślnego.** To jedyny język, którego na pewno nigdy nie zabraknie.
- **Kończenie procesu na automatycznym wypełnieniu.** Zielony audyt przy niezweryfikowanych tekstach.

## Warto przeczytać

- [Testowanie treści: audyt CLI, programistyczne API i asercje UI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/testing.md)
- [Reguły wtyczki ESLint, w tym `no-raw-text` i `no-unused-content`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/eslint.md)
- [autoFill: generowanie plików deklaracji dla poszczególnych języków](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/autoFill.md)
- [Dokumentacja konfiguracji: `locales`, `requiredLocales`, `defaultLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/configuration.md)
- [Raporty benchmarkowe porównujące frameworki](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/benchmark/index.md)
- [Adapter kompatybilności i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/compat/i18next.md)
- [Co w rzeczywistości obejmuje internacjonalizacja](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pl/what_is_internationalization.md)
- [i18n na poziomie komponentów a podejście scentralizowane](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pl/per-component_vs_centralized_i18n.md)
