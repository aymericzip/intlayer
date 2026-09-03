---
createdAt: 2026-09-02
updatedAt: 2026-09-02
title: "Jak testować tłumaczenia bez pisania kruchych testów"
description: Co warto testować w aplikacji i18n, a czego nie. Testy renderowania oparte na providerach, pseudolokalizacja, pokrycie RTL i form liczby mnogiej oraz pułapka snapshotów.
keywords:
  - testowanie tłumaczeń
  - testy i18n
  - testing library i18n
  - pseudolokalizacja
  - test providera locale
  - snapshot test i18n
slugs:
  - blog
  - i18n-testing-strategies
author: aymericzip
---

# Jak testować tłumaczenia bez pisania kruchych testów

Większość zestawów testów i18n zawodzi na jeden z dwóch sposobów. Albo sprawdzają dosłowną treść, przez co każda zmiana sformułowania psuje pięćdziesiąt testów i zespół ostatecznie je usuwa. Albo renderują wszystko w domyślnym języku, nie weryfikując niczego dla pozostałych siedemnastu. Obie ścieżki prowadzą do tego samego: zestawu testów, któremu nikt nie ufa.

## Spis treści

<TOC/>

## Wzorce są niezależne od biblioteki

Każdy poniższy wzorzec działa na dowolnym stosie i18n. Zamień provider na `I18nextProvider`, `NextIntlClientProvider` lub `IntlProvider`, a testy pozostaną identyczne, ponieważ weryfikują wyrenderowany wynik, a nie API konkretnej biblioteki.

Narzędzia pokrycia również można łatwo przenieść: dzięki [wtyczce Sync JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/plugins/sync-json.md) wskazującej na istniejące katalogi lub [adapterowi kompatybilności](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/compat/index.md) tworzącemu aliasy dla bieżących importów, asercja pokrycia działa bezpośrednio na posiadanym pliku JSON.

## Zdecyduj, co tak naprawdę testujesz

Jakość tłumaczenia nie podlega weryfikacji w testach kodu. Żadna asercja nie oceni, czy język niemiecki brzmi naturalnie, a próby takiego testowania kończą się jedynie kodem zaśmieconym zahardkodowanymi ciągami znaków.

To, co mechanicznie warto testować:

| Warto testować                            | Nie warto testować                |
| :---------------------------------------- | :-------------------------------- |
| Każdy wymagany język posiada wartość      | Czy treść brzmi elegancko         |
| Właściwy język trafia do komponentu       | Dokładna treść każdej etykiety    |
| Liczba mnoga działa dla każdej kategorii  | Czy tłumacz wykonał swoje zadanie |
| Języki RTL ustawiają kierunek i lustro    | Każdy ciąg w każdym języku        |
| Sformatowane daty i liczby stosują locale | Wewnętrzna poprawność `Intl`      |

Weryfikacja pokrycia powinna znajdować się w jednym teście opartym na danych, a nie w testach komponentów. Temat ten omawia artykuł [wykrywanie brakujących tłumaczeń](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pl/detecting_missing_translations.md); ten wpis skupia się na pozostałych kwestiach.

## Renderuj wewnątrz providera i wyszukuj po roli

Głównym wzorcem jest montowanie komponentu wewnątrz providera języka i wyszukiwanie po roli lub identyfikatorze testowym, a nie po treści.

```tsx fileName="CartSummary.test.tsx"
import { render, screen } from "@testing-library/react";
import { IntlayerProvider } from "react-intlayer/client";
import { CartSummary } from "./CartSummary";

test("renderuje nagłówek podsumowania po francusku", () => {
  render(
    <IntlayerProvider locale="fr-FR">
      <CartSummary />
    </IntlayerProvider>
  );

  expect(screen.getByRole("heading")).toBeInTheDocument();
});
```

Wyszukiwanie `getByRole("heading")` pozostaje odporne na zmiany w treści. `getByText("Récapitulatif")` psuje się przy pierwszej modyfikacji. Używaj dokładnego tekstu tylko wtedy, gdy sam ciąg znaków jest przedmiotem testu, co zdarza się rzadko.

W przypadku atrybutów takich jak `aria-label` potrzebujesz czystego ciągu znaków, a nie węzła React. W React wpisy `useIntlayer` udostępniają do tego pole `.value`.

## Parametryzuj testy między językami

Jeden zestaw testów wykonywany dla każdego języka daje znacznie większą wartość niż osobny test dla każdego języka z osobna.

```tsx fileName="direction.test.tsx"
import { getHTMLTextDir } from "intlayer";
import { render } from "@testing-library/react";
import { IntlayerProvider } from "react-intlayer/client";

describe.each(["en", "fr", "ja", "ar"])("locale %s", (locale) => {
  it("renderuje bez powrotu do surowego klucza", () => {
    const { container } = render(
      <IntlayerProvider locale={locale}>
        <CartSummary />
      </IntlayerProvider>
    );

    // Wyrenderowany klucz oznacza, że pobranie wartości nie powiodło się.
    expect(container.textContent).not.toMatch(/^[a-z]+(\.[a-z]+)+$/);
  });

  it("ustawia prawidłowy kierunek tekstu", () => {
    expect(getHTMLTextDir(locale)).toBe(locale === "ar" ? "rtl" : "ltr");
  });
});
```

Pierwsza asercja to szybka i tania korzyść: jeśli pobranie wartości zawiedzie i biblioteka wyrenderuje klucz, DOM będzie zawierał strukturę w rodzaju `cart.summary.title`. Wychwytuje to całą klasę błędów bez podawania jakichkolwiek konkretnych fraz.

## Pseudolokalizacja znajduje to, czego nie widzą katalogi

Dodaj sztuczny język, który modyfikuje każdy ciąg znaków, na przykład przekształcając `Checkout` w `[!!! Çĥéçķöũţ !!!]`. Następnie wyrenderuj stronę w tym języku.

Wszystko, co nadal wyświetla się w standardowym języku angielskim, zostało wpisane na sztywno w kodzie. Żaden audyt katalogów tego nie wykryje, ponieważ z perspektywy narzędzi ten ciąg po prostu nie istnieje. Nawiasy pełnią dodatkową funkcję: wydłużają tekst o około 30 procent, ujawniając błędy układu, zanim pojawią się w języku niemieckim.

Najlepiej przeprowadzać to w formie testów wizualnych lub end-to-end zamiast testów jednostkowych, ponieważ błąd jest widoczny gołym okiem.

## Liczba mnoga wymaga testu dla kategorii, a nie dla języka

Błędy liczby mnogiej łatwo przeoczyć, ponieważ angielski ma tylko dwie formy i większość programistów sprawdza tylko je. Polski ma cztery, a arabski sześć.

```ts fileName="plural.test.ts"
// Arabski sprawdza zero, one, two, few, many, other.
describe.each([0, 1, 2, 3, 11, 100])("liczba %i", (count) => {
  it("tworzy niepusty ciąg znaków w języku arabskim", () => {
    expect(formatItems(count, "ar")).not.toBe("");
  });
});
```

Wybieraj wartości liczbowe odpowiadające każdej kategorii CLDR dla najbardziej złożonego języka, zamiast sprawdzać wszędzie 1 i 2. `Intl.PluralRules` podpowiada, do której kategorii wpada dana liczba, dzięki czemu możesz wyznaczyć próbki bez zgadywania. Więcej szczegółów w [artykule o formacie wiadomości ICU](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pl/icu_message_format.md).

## Pułapka snapshotów

Snapshoty i i18n to złe połączenie. Snapshot zlokalizowanego komponentu utrwala każdy zawarty w nim tekst: gdy tłumacz poprawi literówkę w języku portugalskim, zielony test staje się czerwony, w pliku, którego recenzent nie jest w stanie zrozumieć. Po kilku takich razach ktoś uruchamia `-u` bez czytania diffa, a snapshoty tracą jakiekolwiek znaczenie.

Jeśli chcesz używać snapshotów, wykonuj je tylko w jednym języku i traktuj jako kontrolę strukturalną, a nie treściową. Wszystko, co zależy od języka, powinno być weryfikowane jawnymi asercjami.

## Testuj negocjację języka, a nie tylko renderowanie

Najczęstszym błędem i18n na produkcji nie jest brakujący tekst. Jest nim wybór niewłaściwego języka: URL wskazuje `/fr/`, klient odczytuje `navigator.language` i powstaje konflikt.

Testuj kolejność rozwiązywania języka bezpośrednio jako czystą funkcję, niezależnie od jakichkolwiek komponentów:

```ts fileName="locale-resolution.test.ts"
it("faworyzuje URL ponad zapisaną preferencję", () => {
  expect(resolveLocale({ url: "/fr/about", stored: "de", header: "ja" })).toBe(
    "fr"
  );
});

it("wybiera nagłówek, gdy URL nie zawiera prefiksu", () => {
  expect(resolveLocale({ url: "/about", stored: null, header: "ja" })).toBe(
    "ja"
  );
});
```

To najbardziej wartościowy test i18n, którego brakuje w większości projektów, a nie wymaga on nawet środowiska DOM.

## Co uruchamiać i gdzie

- **Unit**: negocjacja języka, formatowania, kategorie liczby mnogiej. Szybkie, bez DOM.
- **Komponenty**: jeden render w providerze na język, sprawdzający role i brak surowych kluczy.
- **Pokrycie**: test oparty na danych weryfikujący brak brakujących wymaganych języków.
- **Wizualne lub E2E**: przejście z pseudolokalizacją oraz strona RTL, ponieważ te błędy są wizualne.

Utrzymuj pierwsze trzy w procesie CI przy każdym commicie. Ostatni punkt warto uruchamiać w nocnych kompilacjach.

## Częste błędy

- **Asercje na dosłowny tekst w każdym miejscu.** Skazuje zestaw testów na usunięcie w ciągu kilku miesięcy.
- **Tworzenie snapshotów zlokalizowanych komponentów.** Tłumacze psują build, a recenzenci zatwierdzają bez czytania.
- **Testowanie tylko domyślnego języka.** Jedynego, którego na pewno nie zabraknie.
- **Testowanie tylko 1 i 2 dla liczb mnogich.** Pomija kategorie, których nie ma w angielskim.
- **Mockowanie całej biblioteki i18n.** Wtedy testujesz jedynie to, czy twój mock zwraca ciągi znaków.
- **Pomijanie testów negocjacji języka.** Najczęstsza awaria produkcyjna i najprostsza do przetestowania.

## Warto przeczytać

- [Testowanie zawartości: audyt CLI, programistyczne API i asercje UI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/testing.md)
- [Wtyczka ESLint: wykrywanie zahardkodowanego tekstu i nieużywanych treści](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/eslint.md)
- [Formatery i narzędzia językowe, w tym `getHTMLTextDir`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/formatters.md)
- [Raporty wydajnościowe porównujące frameworki](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/benchmark/index.md)
- [Adapter kompatybilności react-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/compat/react-i18next.md)
- [Jak wykrywać brakujące tłumaczenia](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pl/detecting_missing_translations.md)
- [Format wiadomości ICU: liczby mnogie, select i szablony](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pl/icu_message_format.md)
