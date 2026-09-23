---
createdAt: 2026-09-13
updatedAt: 2026-09-22
title: "Lingui vs Intlayer: Benchmark i Porównanie 2026"
description: "Dwie biblioteki i18n oparte na kompilatorze zmierzone w Next.js i TanStack Start. Rozmiar paczki, wyciek treści, rozmiar komponentu, hydratacja, reaktywność zmiany języka i wrażenia programisty."
keywords:
  - Lingui
  - Intlayer
  - Internationalization
  - i18n
  - Benchmark
  - Bundle size
  - Compiler
  - Blog
  - Next.js
  - TanStack Start
  - JavaScript
  - React
slugs:
  - blog
  - lingui-vs-intlayer
author: aymericzip
---

# Lingui VS Intlayer | Benchmark internacjonalizacji (i18n) w React i Next.js

![JavaScript i18n library ecosystem](https://github.com/aymericzip/intlayer/blob/main/docs/assets/cloud_i18n_logo.webp?raw=true)

Lingui i Intlayer to dwie biblioteki w tym benchmarku, które opierają się na **kompilatorze**, a nie na czystym środowisku wykonawczym (runtime). Lingui wyodrębnia wiadomości z makr w czasie budowania i kompiluje katalogi per lokalizacja. Intlayer kompiluje słowniki per komponent i przeprowadza tree-shaking per lokalizacja. W teorii powinny dawać zbliżone wyniki. Liczby pokazują jednak, gdzie się różnią.

Dane pochodzą z projektu [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom), zestawu testów open-source, który buduje tę samą aplikację z każdą biblioteką i rejestruje, co przeglądarka faktycznie pobiera i wykonuje.

<TOC/>

> **W skrócie (tl;dr)**: Lingui jest najbliżej Intlayera pod względem surowego kodu JavaScript na stronę: **115-120 KB** vs **118.6 KB** w TanStack Start po skonfigurowaniu leniwego ładowania (lazy loading), **148.6 KB** vs **141.3 KB** w Next.js. Różnica pojawia się w innych miejscach: komponent Lingui skompilowany w izolacji waży **58-153 KB** w porównaniu do **6-8 KB** w Intlayerze, hydratacja trwa **28-34 ms** w porównaniu do **11-14 ms**, fallback języka źródłowego wycieka **3-15%** ciągów `en` na stronach `fr` w każdej zoptymalizowanej konfiguracji, a osiągnięcie tej konfiguracji wymaga ręcznego wyodrębniania, kompilowania i dobierania katalogów per trasa. Intlayer osiąga to bez dodatkowej konfiguracji.

## Podsumowanie

- **Lingui** - Oparte na makrach (`` t`...` ``, `<Trans>`, `msg`), ICU MessageFormat, katalogi `.po` / JSON, przepływ pracy `lingui extract` + `lingui compile`. Kompiluje identyfikatory wiadomości do krótkich haszy, obsługuje dynamiczne ładowanie katalogów per lokalizacja. Ugruntowane, niezależne od frameworka, z bogatym ekosystemem narzędzi dla tłumaczy opartych na formacie `.po`.
- **Intlayer** - Model zawartości zorientowany na komponenty. Słowniki `.content.ts` znajdują się bezpośrednio przy komponencie, kompilator w czasie budowania wykonuje tree-shaking i leniwe ładowanie per komponent oraz per lokalizacja, ścisłe typy TypeScript są generowane automatycznie z treści, a brakujące tłumaczenia powodują błąd budowania. Zawiera middleware, pomocniki SEO, Edytor Wizualny / CMS oraz tłumaczenia wspomagane przez AI.

| Biblioteka            | Gwiazdki na GitHub                                                                                                                                                             | Łączna liczba commitów                                                                                                                                                             | Ostatni commit                                                                                                                                      | Pierwsza wersja | Wersja NPM                                                                                                          | Pobrania NPM                                                                                                                   |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- | ------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `aymericzip/intlayer` | [![GitHub Repo stars](https://img.shields.io/github/stars/aymericzip/intlayer?style=for-the-badge&label=%E2%AD%90%20stars)](https://github.com/aymericzip/intlayer/stargazers) | [![GitHub commit activity](https://img.shields.io/github/commit-activity/t/aymericzip/intlayer?style=for-the-badge&label=commits)](https://github.com/aymericzip/intlayer/commits) | [![Last Commit](https://img.shields.io/github/last-commit/aymericzip/intlayer?style=for-the-badge)](https://github.com/aymericzip/intlayer/commits) | Kwiecień 2024   | [![npm](https://img.shields.io/npm/v/intlayer?style=for-the-badge)](https://www.npmjs.com/package/intlayer)         | [![npm downloads](https://img.shields.io/npm/dm/intlayer?style=for-the-badge)](https://www.npmjs.com/package/intlayer)         |
| `lingui/js-lingui`    | [![GitHub Repo stars](https://img.shields.io/github/stars/lingui/js-lingui?style=for-the-badge&label=%E2%AD%90%20stars)](https://github.com/lingui/js-lingui/stargazers)       | [![GitHub commit activity](https://img.shields.io/github/commit-activity/t/lingui/js-lingui?style=for-the-badge&label=commits)](https://github.com/lingui/js-lingui/commits)       | [![Last Commit](https://img.shields.io/github/last-commit/lingui/js-lingui?style=for-the-badge)](https://github.com/lingui/js-lingui/commits)       | Grudzień 2016   | [![npm](https://img.shields.io/npm/v/@lingui/core?style=for-the-badge)](https://www.npmjs.com/package/@lingui/core) | [![npm downloads](https://img.shields.io/npm/dm/@lingui/core?style=for-the-badge)](https://www.npmjs.com/package/@lingui/core) |

> Odznaki aktualizują się automatycznie. Wartości zmieniają się w czasie.

## Porównanie funkcji

| Funkcja                                         | Intlayer (`react-intlayer` / `next-intlayer`)                                            | Lingui (`@lingui/core` / `@lingui/react`)                                                  |
| ----------------------------------------------- | ---------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| **Tłumaczenia blisko komponentów**              | ✅ Tak, `.content.ts` umieszczony przy każdym komponencie                                | ⚠️ Ciągi źródłowe w JSX przez makra; tłumaczenia w scentralizowanych katalogach `.po`      |
| **Integracja z TypeScriptem**                   | ✅ Ścisłe typy generowane automatycznie z treści                                         | ⚠️ Makra są typowane; identyfikatory wiadomości nie, brakujące wpisy nie są wykrywane      |
| **Wykrywanie brakujących tłumaczeń**            | ✅ Błąd TypeScriptu + błąd/ostrzeżenie w czasie budowania                                | ⚠️ `lingui extract` raportuje statystyki; w runtime następuje powrót do tekstu źródłowego  |
| **Bogata treść (JSX / Markdown / komponenty)**  | ✅ Bezpośrednie wsparcie                                                                 | ✅ `<Trans>` z zagnieżdżonymi komponentami                                                 |
| **Obsługa ICU**                                 | ⚠️ W trakcie prac                                                                        | ✅ Tak (makra `plural`, `select`, `selectOrdinal`)                                         |
| **Formatowanie (daty, liczby, waluty)**         | ✅ `useNumber`, `useDate`, ... (Intl pod maską)                                          | ✅ `i18n.date()`, `i18n.number()`                                                          |
| **Zlokalizowany routing i middleware**          | ✅ Wbudowane proxy/middleware, `getMultilingualUrls`                                     | ❌ Brak w rdzeniu                                                                          |
| **Pomocniki SEO (hreflang, sitemap, robots)**   | ✅ Wbudowane narzędzia                                                                   | ❌ Ręcznie                                                                                 |
| **Synchroniczne komponenty serwerowe**          | ✅ `useIntlayer` z `next-intlayer/server` działa w każdym podrzędnym komponencie serwera | ⚠️ Wymaga instancji `I18n` per żądanie, przekazywanej w dół lub ustawianej przez `setI18n` |
| **Tree-shaking (tylko użyta zawartość)**        | ✅ Per komponent, per lokalizacja, zautomatyzowane przez kompilator                      | ⚠️ Per lokalizacja przez `lingui compile`; podział per trasa wymaga ręcznej pracy          |
| **Leniwe ładowanie (Lazy loading)**             | ✅ `importMode: 'dynamic'` (jedna linijka konfiguracji)                                  | ⚠️ Ręczny `import()` skompilowanych katalogów + `i18n.load()` / `i18n.activate()`          |
| **Usuwanie nieużywanych tłumaczeń**             | ✅ Nieużywane słowniki są odrzucane w czasie budowania                                   | ✅ `lingui extract --clean` usuwa przestarzałe wiadomości                                  |
| **Testowanie brakujących tłumaczeń (CLI / CI)** | ✅ `npx intlayer content test`                                                           | ⚠️ Statystyki `lingui extract` (domyślnie brak błędu kodu wyjścia)                         |
| **Potok budowania (Build pipeline)**            | ✅ Jeden plugin (`@intlayer/swc` / `@intlayer/babel` / `vite-intlayer`)                  | ⚠️ Plugin makr (Babel lub SWC) + kroki `extract` + `compile`                               |
| **Tłumaczenie wspomagane przez AI**             | ✅ Wbudowane, korzysta z własnych kluczy API dostawców                                   | ❌ Brak                                                                                    |
| **Wizualny Edytor / CMS**                       | ✅ Darmowy Edytor Wizualny + opcjonalny CMS                                              | ❌ Brak (`.po` współpracuje z zewnętrznymi systemami TMS)                                  |
| **Serwer MCP i Agent Skills**                   | ✅ Tak                                                                                   | ❌ Brak                                                                                    |
| **Ekosystem / społeczność**                     | ⚠️ Mniejsza, ale dynamicznie rosnąca                                                     | ✅ Ugruntowana, niezależna od frameworka                                                   |

## Benchmark

### Co było mierzone

Zestaw [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom) buduje **dokładnie tę samą aplikację** z każdą biblioteką: **10 stron** (home, about, blog, careers, contact, FAQ, pricing, products, settings, team), **10 lokalizacji** (`en`, `fr`, `es`, `de`, `it`, `pt`, `zh`, `ja`, `ko`, `ru`), identyczne komponenty i identyczną zawartość. Strony są mierzone w językach `en` oraz `fr`. Każda biblioteka została zaimplementowana w maksymalnie czterech **strategiach ładowania**, od najprostszej do optymalnej:

| Strategia          | Opis                                                                                       | Kto to stosuje                                     |
| ------------------ | ------------------------------------------------------------------------------------------ | -------------------------------------------------- |
| **static**         | Skompilowany katalog każdego języka zaimportowany i załadowany na starcie                  | Szybkie prototypy, kod wygenerowany przez AI       |
| **dynamic**        | Tylko katalog aktywnego języka jest importowany przez `import()`, ale zawiera całą witrynę | Większość projektów                                |
| **scoped-static**  | Jeden katalog na trasę, wszystkie spakowane na starcie                                     | Rzadkość                                           |
| **scoped-dynamic** | Jeden katalog na trasę + leniwy `import()`. Tylko bieżąca strona i bieżący język           | Aplikacje z rygorystycznym budżetem wydajnościowym |

Intlayer nie posiada wariantu "scoped": kompilator automatycznie ogranicza zakres treści **per komponent**, więc wiersze `static` i `dynamic` są już zoptymalizowane pod tym kątem.

Dla każdego buildu zestaw rejestruje:

- **Rozmiar biblioteki (Lib size)**: rozmiar gzip pustego komponentu importującego wyłącznie bibliotekę i18n. Stały koszt środowiska uruchomieniowego.
- **JS strony (Page JS)**: JavaScript gzip pobrany na stronę, uśredniony dla wszystkich stron i lokalizacji.
- **% wycieku lokalizacji (Locale leak %)**: odsetek przetłumaczonych ciągów w pobranym JS należących do języka, którego użytkownik **nie** przegląda (badane na `en` i `fr`, więc 50% oznacza pełną obecność drugiego języka; przy 10 zintegrowanych językach rzeczywista strata jest znacznie wyższa).
- **% wycieku strony (Page leak %)**: odsetek przetłumaczonych ciągów w pobranym JS należących do podstrony, na której użytkownik **nie** przebywa.
- **Średnia komponentu (Component avg)**: średni rozmiar gzip każdego komponentu skompilowanego w izolacji. Pokazuje, ile narzutu i katalogów pociąga za sobą pojedynczy komponent.
- **Reaktywność E2E**: czas mierzony od momentu wyboru nowego języka do zaktualizowania atrybutu `html[lang]` w drzewie DOM (Playwright, 5 iteracji).
- **Hydratacja**: czas trwania fazy hydratacji w React.

> Poniższe liczby pochodzą z testu przeprowadzonego **2026-09-12** z użyciem bibliotek `@lingui/react` 6.6.0 oraz `intlayer` 9.5.1. Aplikacja testowa jest celowo niewielka (kilkadziesiąt ciągów na język), dlatego wartości procentowe wycieków opisują **ogólny wzorzec**: rosną one wraz z rozrostem treści, podczas gdy stały koszt runtime pozostaje bez zmian.

### Wyniki w Next.js

Wybierz metryki i biblioteki, które Cię interesują:

<I18nBenchmark framework="nextjs" vertical/>

| Biblioteka          | Strategia      | Rozmiar Lib (gz) | Średni JS strony (gz) | Wyciek języka | Wyciek strony | Śr. komponentu (gz) | Reaktywność E2E | Hydratacja |
| ------------------- | -------------- | ---------------: | --------------------: | ------------: | ------------: | ------------------: | --------------: | ---------: |
| **base** (bez i18n) | -              |           0.0 KB |              141.0 KB |          0.0% |          0.0% |              0.9 KB |         13.4 ms |    11.8 ms |
| Lingui              | static         |          11.9 KB |              207.4 KB |         50.0% |         90.0% |             73.3 KB |         15.3 ms |    15.2 ms |
| Lingui              | dynamic        |          11.9 KB |              145.4 KB |          2.8% |         89.9% |             19.9 KB |         15.7 ms |    12.7 ms |
| Lingui              | scoped-static  |          11.9 KB |              148.2 KB |          2.7% |         89.1% |             20.4 KB |         15.1 ms |    13.1 ms |
| Lingui              | scoped-dynamic |          11.9 KB |              148.6 KB |         14.8% |          0.0% |            152.6 KB |         16.1 ms |    14.8 ms |
| **`next-intlayer`** | static         |       **5.5 KB** |          **141.3 KB** |      **0.0%** |      **0.0%** |          **8.5 KB** |     **15.5 ms** |    16.9 ms |
| **`next-intlayer`** | dynamic        |       **5.5 KB** |          **141.3 KB** |      **0.0%** |      **0.0%** |          **6.9 KB** |     **15.3 ms** |    15.9 ms |

**Jak interpretować wyniki**

- **Koszt środowiska uruchomieniowego.** Pusty komponent to 11.9 KB gzip w przypadku Lingui oraz 5.5 KB w Intlayerze. W ujęciu całej strony najlepsza konfiguracja Lingui dodaje **+7.3 KB** w stosunku do Intlayera (148.6 vs 141.3 KB); Intlayer narzuca zaledwie **+0.3 KB** w porównaniu z bazową aplikacją.
- **Naiwna konfiguracja jest kosztowna.** Załadowanie wszystkich skompilowanych katalogów na starcie daje wynik **207.4 KB na stronę**, czyli +66 KB ponad bazową aplikację. Połowa ciągów należy do niewłaściwego języka, a 90% do niewłaściwej podstrony.
- **Dynamiczne ładowanie naprawia wyciek języka, ale nie strony.** Z jednym katalogiem na język wyciek strony nadal wynosi ~90%: cały katalog `fr` jest przesyłany na każdej francuskiej podstronie. Osiągnięcie 0% wycieku podstron wymaga trybu `scoped-dynamic`: oddzielnego katalogu na każdą trasę, wyodrębnianego i kompilowanego osobno, dołączanego ręcznie w każdej podstronie.
- **Wyciek języka zapasowego (fallback).** Nawet w zoptymalizowanych ustawieniach **3-15% ciągów `en` trafia na podstrony `fr`**. Makra Lingui zachowują tekst źródłowy jako fallback, przez co ląduje on w paczce obok tłumaczenia. Intlayer rozwiązuje fallbacki w czasie budowania i wysyła wyłącznie aktywny język.
- **Gwałtowny wzrost rozmiaru komponentu w `scoped-dynamic`.** Każdy komponent skompilowany w izolacji osiąga średnio **152.6 KB**, ponieważ katalog każdej trasy staje się dostępny z komponentu, który go importuje. Ten sam komponent z `useIntlayer()` waży średnio zaledwie **6.9 KB**.

<ClickToOpenIframe
src="https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-nextjs.md"
width="100%"
height="600px"
style="border:none;"
/>

> Pełna tabela, każda biblioteka i każda strategia, w [raporcie benchmarku Next.js](https://intlayer.org/pl/doc/benchmark/nextjs).

### Wyniki w TanStack Start

| Biblioteka                  | Strategia      | Rozmiar Lib (gz) | Średni JS strony (gz) | Wyciek języka | Wyciek strony | Śr. komponentu (gz) | Reaktywność E2E | Hydratacja |
| --------------------------- | -------------- | ---------------: | --------------------: | ------------: | ------------: | ------------------: | --------------: | ---------: |
| **base** (bez i18n)         | -              |           0.0 KB |              111.0 KB |          0.0% |          0.0% |              0.7 KB |          8.1 ms |    21.6 ms |
| Lingui                      | static         |          11.2 KB |              152.2 KB |         50.0% |         90.0% |             58.0 KB |          3.9 ms |    19.9 ms |
| Lingui                      | dynamic        |          11.2 KB |              115.2 KB |          9.3% |          0.0% |             85.5 KB |          5.9 ms |    28.0 ms |
| Lingui                      | scoped-static  |          11.2 KB |              120.8 KB |          4.0% |          0.0% |            147.9 KB |          7.1 ms |    33.9 ms |
| Lingui                      | scoped-dynamic |          11.2 KB |              120.2 KB |          8.6% |          0.0% |             83.7 KB |         42.1 ms |    32.9 ms |
| **`intlayer`**              | static         |       **5.0 KB** |          **125.8 KB** |         50.0% |      **0.0%** |          **8.1 KB** |      **3.2 ms** |    11.5 ms |
| **`intlayer`**              | dynamic        |       **5.0 KB** |          **118.6 KB** |      **0.0%** |      **0.0%** |          **6.3 KB** |      **3.6 ms** |    14.1 ms |
| `@intlayer/lingui` (kompat) | dynamic        |          10.3 KB |              137.0 KB |          9.9% |          0.0% |             12.8 KB |          2.9 ms |    19.7 ms |

**Jak interpretować wyniki**

- **Pod względem kodu JS na stronę Lingui wygrywa o włos.** Lingui w wersji `dynamic` osiąga **115.2 KB**, o 3.4 KB mniej niż Intlayer (118.6 KB). Skompilowane katalogi Lingui z haszowanymi identyfikatorami są bardzo zwarte, a router TanStack Start dzieli trasy na tyle sprawnie, że wyciek podstron wynosi 0% już w trybie `dynamic`.
- **Wszystkie pozostałe metryki przemawiają na korzyść Intlayera.** Hydratacja w Lingui trwa **28-34 ms** w porównaniu do **11-14 ms** w Intlayerze: wywołania `i18n.load()` + `i18n.activate()` wykonują się po stronie klienta, zanim React zakończy proces hydratacji. Komponenty skompilowane w izolacji ważą **58-148 KB** w porównaniu do **6-8 KB**. Wyciek języka nigdy nie spada do 0% (wynosi 4-9%) ze względu na obecność ciągów źródłowych.
- **Zmiana języka w zoptymalizowanej konfiguracji jest powolna.** `scoped-dynamic` w Lingui potrzebuje **42 ms** na aktualizację `html[lang]`: katalog nowej trasy musi zostać pobrany, załadowany i aktywowany, zanim zmiana stanie się widoczna. Intlayer przełącza język w czasie **3-4 ms** w obu trybach.
- **Wiersz `static` w Intlayerze ma już 0% wycieku stron**, ponieważ dołączane są wyłącznie słowniki importowane przez komponenty danej strony. Jedna linijka konfiguracji (`importMode: 'dynamic'`) usuwa również wyciek językowy.
- **`@intlayer/lingui`** zachowuje składnię makr Lingui, ale zasila je ze słowników Intlayera. Poświęca nieco rozmiaru strony (137 KB ze względu na obecność runtime makr) w zamian za mniejsze komponenty (12.8 KB) i szybszą hydratację niż natywne Lingui. To doskonały krok migracyjny.

<ClickToOpenIframe
src="https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-tanstack.md"
width="100%"
height="600px"
style="border:none;"
/>

> Pełna tabela w [raporcie benchmarku TanStack Start](https://intlayer.org/pl/doc/benchmark/tanstack).

## Skąd ta różnica? Dwa kompilatory, dwie jednostki pracy

![The Intlayer compiler extracts content from components](https://github.com/aymericzip/intlayer/blob/main/docs/assets/compiler.webp?raw=true)

Obie biblioteki korzystają z kompilatora. Różnica polega na tym, **co** kompilują.

**Lingui kompiluje katalogi.** Makra w kodzie źródłowym są wyodrębniane do jednego pliku `.po` na dany język, a następnie kompilowane do modułu JS na język. Podstawową jednostką jest **lokalizacja (język)**. Dalszy podział, per trasa lub per komponent, oznacza tworzenie wielu katalogów, odpowiednie konfigurowanie `lingui.config.ts` i ręczne ładowanie ich na trasach. Instancja `I18n` jest globalna; każde wywołanie `useLingui()` subskrybuje komponent do tej instancji.

```bash
.
├── lingui.config.ts
└── src
    ├── i18n.ts                          # setupI18n(), load(), activate()
    ├── locales
    │   ├── en
    │   │   ├── messages.po
    │   │   └── messages.mjs             # wynik lingui compile
    │   └── fr
    │       ├── messages.po
    │       └── messages.mjs
    ├── components
    │   └── Counter.tsx                  # const { t } = useLingui(); t`Increment`
    └── routes
        └── $locale
            └── about.tsx                # await import(`../locales/${locale}/messages.mjs`)
```

**Intlayer kompiluje słowniki.** Każdy plik `.content.ts` to słownik powiązany z określonym kluczem; kompilator analizuje, który komponent importuje dany klucz i generuje, per słownik i per język, dokładnie ten fragment JSON, którego komponent potrzebuje. Podstawową jednostką jest **komponent**. Ograniczenie zakresu trasy jest naturalną konsekwencją: strona pobiera wyłącznie słowniki komponentów, które faktycznie renderuje.

```bash
.
├── intlayer.config.ts
└── src
    ├── components
    │   └── Counter
    │       ├── index.tsx                # useIntlayer("counter")
    │       └── index.content.ts
    └── routes
        └── $locale
            ├── about.tsx
            └── about.content.ts
```

Dlatego wzorzec `scoped-dynamic` jest dla Intlayera naturalnym efektem budowania, a dla Lingui osobnym i pracochłonnym zadaniem konfiguracyjnym. Różnica powiększa się na dwóch osiach jednocześnie, stron i języków:

![Theoretical content leakage by architecture](https://github.com/aymericzip/intlayer/blob/main/docs/assets/theorical_content_leakage.webp?raw=true)

> Aby uzyskać liczby z wiersza `dynamic`, ustaw `dictionary.importMode: 'dynamic'` w pliku `intlayer.config.ts`. Zobacz [dokumentację optymalizacji paczki](https://intlayer.org/pl/doc/concept/bundle-optimization).

## Doświadczenie programisty

### Konfiguracja

<Tabs defaultTab="intlayer" group="techno">
<Tab label="Lingui" value="lingui">

```ts fileName="lingui.config.ts"
import { defineConfig } from "@lingui/cli";

export default defineConfig({
  sourceLocale: "en",
  locales: ["en", "fr"],
  catalogs: [
    {
      path: "<rootDir>/src/locales/{locale}/messages",
      include: ["src"],
    },
  ],
});
```

```ts fileName="src/i18n.ts"
import { setupI18n } from "@lingui/core";

export const loadCatalog = async (locale: string) => {
  const { messages } = await import(`./locales/${locale}/messages.mjs`);
  const i18n = setupI18n();
  i18n.load(locale, messages);
  i18n.activate(locale);
  return i18n;
};
```

Następnie dodaj `@lingui/babel-plugin-lingui-macro` (lub `@lingui/swc-plugin`) do bundlera, uruchamiaj `lingui extract` po modyfikacji kodu źródłowego, `lingui compile` przed budowaniem aplikacji i owiń drzewo komponentów w `<I18nProvider i18n={i18n}>`.

</Tab>
<Tab label="Intlayer" value="intlayer">

```ts fileName="intlayer.config.ts"
import { type IntlayerConfig, Locales } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

Dodaj `intlayer()` do `vite.config.ts` (lub `withIntlayer()` do `next.config.ts`) i owiń drzewo w `<IntlayerProvider>`. Brak etapów extract czy compile: słowniki budują się samoczynnie podczas pracy bundlera.

</Tab>
</Tabs>
### Komponent

<Tabs defaultTab="intlayer" group="techno">
<Tab label="Lingui" value="lingui">

```tsx fileName="src/components/Counter.tsx"
import { useState } from "react";
import { useLingui } from "@lingui/react/macro";
import { Trans } from "@lingui/react/macro";

export const Counter = () => {
  const { t, i18n } = useLingui();
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>{i18n.number(count)}</p>
      <button aria-label={t`Counter`} onClick={() => setCount((c) => c + 1)}>
        <Trans>Increment</Trans>
      </button>
    </div>
  );
};
```

Angielski tekst znajduje się w komponencie; francuski ląduje w `src/locales/fr/messages.po` pod haszowanym identyfikatorem po uruchomieniu `lingui extract`. Zapomnienie o uruchomieniu komendy lub o `compile` cicho przywraca wersję angielską.

</Tab>
<Tab label="Intlayer" value="intlayer">

```ts fileName="src/components/Counter/index.content.ts"
import { t, type Dictionary } from "intlayer";

const counterContent = {
  key: "counter",
  content: {
    label: t({ en: "Counter", fr: "Compteur" }),
    increment: t({ en: "Increment", fr: "Incrémenter" }),
  },
} satisfies Dictionary;

export default counterContent;
```

```tsx fileName="src/components/Counter/index.tsx"
import { useState } from "react";
import { useIntlayer } from "react-intlayer";
import { useNumber } from "react-intlayer/format";

export const Counter = () => {
  const { label, increment } = useIntlayer("counter");
  const number = useNumber();
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>{number(count)}</p>
      <button aria-label={label} onClick={() => setCount((c) => c + 1)}>
        {increment}
      </button>
    </div>
  );
};
```

Oba języki znajdują się w jednym pliku tuż obok komponentu. Brak tłumaczenia `fr` powoduje błąd budowania, a błędny klucz to natychmiastowy błąd TypeScriptu.

</Tab>
</Tabs>
### Poza komponentami

Metadane, loadery, funkcje serwerowe: dowolne miejsce bez drzewa Reacta.

<Tabs defaultTab="intlayer" group="techno">
<Tab label="Lingui" value="lingui">

```ts fileName="src/routes/$locale/about.tsx"
import { setupI18n } from "@lingui/core";
import { msg } from "@lingui/core/macro";

const title = msg`About us`;

export const loader = async ({ params }: { params: { locale: string } }) => {
  const { messages } = await import(
    `../../locales/${params.locale}/messages.mjs`
  );
  const i18n = setupI18n({
    locale: params.locale,
    messages: { [params.locale]: messages },
  });

  return { title: i18n._(title) };
};
```

Nowa instancja `I18n` per wywołanie, ręczne ładowanie właściwego katalogu oraz użycie `msg` + `i18n._()` zamiast `t`. Jak zauważono w [uwagach do benchmarku](https://github.com/intlayer-org/benchmark-bloom/blob/main/report/NOTE.md), rozróżnienie kiedy użyć `t`, `` t` ` ``, `i18n.t()`, `msg` czy `<Trans>` bywa nieintuicyjne.

</Tab>
<Tab label="Intlayer" value="intlayer">

```ts fileName="src/routes/$locale/about.tsx"
import { getIntlayer } from "intlayer";

export const loader = async ({ params }: { params: { locale: string } }) => {
  const { title } = getIntlayer("about-metadata", params.locale);

  return { title };
};
```

</Tab>
</Tabs>

## Zachowaj makra Lingui, zyskaj słowniki Intlayera

`@intlayer/lingui` to gotowy adapter dla `@lingui/core` i `@lingui/react`. Makra kompilują się tak jak dotychczas; wywołania `i18n._()`, do których prowadzą, są obsługiwane przez słowniki Intlayera, a wtyczki synchronizacji `.po` pozwalają zachować dotychczasowe pliki jako źródło prawdy. Liczba mnoga i konstrukcje ICU renderują się identycznie.

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import { lingui } from "@intlayer/lingui/plugin";

export default defineConfig({
  plugins: [lingui()],
});
```

Zachowaj `@lingui/babel-plugin-lingui-macro` / `@lingui/swc-plugin` w potoku budowania przed kompilatorem Intlayera. Zobacz [dokumentację zgodności z Lingui](https://intlayer.org/pl/doc/compatibility/lingui).

## Kiedy wybrać którą bibliotekę?

<AccordionGroup>
<Accordion header="Wybierz Lingui">

Chcesz **ICU MessageFormat** z typowanymi makrami, Twoi tłumacze pracują w plikach **`.po`** z istniejącym potokiem TMS, wolisz ciągi źródłowe wbudowane w JSX, a Twój zespół bez problemu radzi sobie z przepływem ekstrakcji, kompilacji i podziału katalogów. Jego JS na stronę jest konkurencyjny po skonfigurowaniu leniwego ładowania.

</Accordion>
<Accordion header="Wybierz Intlayer">

Chcesz **treści o zasięgu komponentu**, **ścisłego TypeScriptu**, **błędów brakujących kluczy w czasie budowania**, **bezproblemowego tree-shakingu i leniwego ładowania**, małych komponentów, szybkiej hydratacji, natychmiastowego przełączania języków oraz wbudowanych narzędzi redakcyjnych ([Edytor Wizualny](https://intlayer.org/pl/doc/concept/editor), [CMS](https://intlayer.org/pl/doc/concept/cms), [tłumaczenie AI](https://intlayer.org/pl/doc/concept/auto-fill), [serwer MCP](https://intlayer.org/pl/doc/mcp-server)). Szczególnie istotne dla dużych, modułowych baz kodu i systemów projektowych.

</Accordion>
<Accordion header="Wybierz @intlayer/lingui">

Używasz Lingui i chcesz stopniowo przejść na słowniki Intlayer bez modyfikowania makr. Twoje katalogi `.po` pozostają źródłem prawdy dzięki [wtyczce synchronizacji PO](https://intlayer.org/pl/doc/compatibility/lingui). Zmierzone bezpośrednio w [Lingui vs @intlayer/lingui](https://intlayer.org/pl/blog/lingui-vs-intlayer-lingui).

</Accordion>
</AccordionGroup>

## FAQ

<FAQ>

<Question title="Lingui również kompiluje. Dlaczego wynik jest tak różny?">

Ponieważ jednostka kompilacji jest inna. Lingui kompiluje **jeden katalog na język**: wszystko poniżej (katalogi per trasa, leniwe ładowanie, wykluczenie wartości domyślnej z paczki) to kwestia ręcznej konfiguracji. Intlayer kompiluje **jeden słownik na komponent**, więc podział na trasy wynika bezpośrednio z procesu budowy. Dlatego komponent Lingui skompilowany w izolacji waży 58-153 KB w porównaniu do 6-8 KB w Intlayer.

</Question>

<Question title="Dlaczego wyciek językowy nigdy nie osiąga 0% w Lingui?">

Makra zachowują komunikat źródłowy w czasie wykonywania jako fallback, więc ciąg angielski jest przesyłany obok tłumaczenia. Benchmark mierzy **3-15% ciągów `en` wewnątrz stron `fr`** w każdej zoptymalizowanej konfiguracji. Intlayer rozwiązuje fallbacki w czasie budowy i dostarcza tylko aktywny język.

</Question>

<Question title="Czy kod JavaScript na stronę w Lingui jest naprawdę konkurencyjny?">

Tak, a na TanStack Start wygrywa o włos: 115.2 KB w trybie `dynamic` wobec 118.6 KB w Intlayer. Skompilowane katalogi z haszowanymi identyfikatorami są zwarte. Koszt ujawnia się gdzie indziej: hydratacja w 28-34 ms wobec 11-14 ms oraz zmiana języka trwająca **42 ms** w konfiguracji `scoped-dynamic`.

</Question>

<Question title="Czy muszę rezygnować z makr, aby przeprowadzić migrację?">

Nie. `@intlayer/lingui` zachowuje kompilację `` t`...` ``, `<Trans>`, `msg`, `plural`, `select` i `selectOrdinal` tak jak dotychczas; zmienia się tylko to, względem czego `i18n._()` rozwiązuje tłumaczenia. Zachowaj `@lingui/babel-plugin-lingui-macro` lub `@lingui/swc-plugin` w procesie budowy. Zobacz [dokumentację zgodności z Lingui](https://intlayer.org/pl/doc/compatibility/lingui).

</Question>

<Question title="Co z krokami wyodrębniania i kompilacji?">

Pozostają dla makr, a znikają w przypadku natywnych treści Intlayer. Słowniki `.content.ts` są tworzone podczas działania bundlera, bez osobnego kroku w CLI, a [`intlayer test`](https://intlayer.org/pl/doc/concept/cli) przerywa proces CI w przypadku brakującego klucza.

</Question>

</FAQ>

## Powiązane porównania

Ten sam benchmark, inne biblioteki:

- [next-intl vs Intlayer](https://intlayer.org/pl/blog/next-intl-vs-intlayer)
- [i18next vs Intlayer](https://intlayer.org/pl/blog/i18next-vs-intlayer)
- [vue-i18n vs Intlayer benchmark](https://intlayer.org/pl/blog/vue-i18n-vs-intlayer-benchmark)
- [next-i18next vs next-intl vs Intlayer](https://intlayer.org/pl/blog/next-i18next-vs-next-intl-vs-intlayer)
- [react-i18next vs react-intl vs Intlayer](https://intlayer.org/pl/blog/react-i18next-vs-react-intl-vs-intlayer)

Więcej informacji:

- [Lingui vs @intlayer/lingui](https://intlayer.org/pl/blog/lingui-vs-intlayer-lingui), adapter zmierzony na tej samej aplikacji
- [Compiler-driven vs declarative i18n](https://intlayer.org/pl/blog/compiler-vs-declarative-i18n)
- [Per-component vs centralized i18n](https://intlayer.org/pl/blog/per-component-vs-centralized-i18n)
- [ICU message format explained](https://intlayer.org/pl/blog/icu-message-format)

Dokumentacja referencyjna:

- [Raport benchmarku Next.js](https://intlayer.org/pl/doc/benchmark/nextjs) i [raport benchmarku TanStack Start](https://intlayer.org/pl/doc/benchmark/tanstack)
- [Compat adapter: Lingui](https://intlayer.org/pl/doc/compatibility/lingui)
- [Optymalizacja bundle](https://intlayer.org/pl/doc/concept/bundle-optimization) i [kompilator Intlayer](https://intlayer.org/pl/doc/compiler)

## Gwiazdki na GitHub

Gwiazdki na GitHubie to silny wskaźnik popularności projektu, zaufania społeczności oraz jego długoterminowej perspektywy. Choć nie mierzą bezpośrednio jakości technicznej, pokazują, jak wielu programistów ceni dany projekt i śledzi jego rozwój.

[![Wykres historii gwiazdek](https://api.star-history.com/chart?repos=lingui%2Fjs-lingui%2Caymericzip%2Fintlayer&type=date&legend=top-left)](https://star-history.com/#lingui/js-lingui&aymericzip/intlayer)

## Podsumowanie

Lingui to najsilniejsza biblioteka łącząca runtime i kompilator w tym zestawieniu. Skompilowane katalogi z haszami dają rozmiar JavaScript na stronę bardzo zbliżony do Intlayera, a w TanStack Start nawet nieznacznie mniejszy. Gdyby jedynym kryterium była waga kodu na stronę, mielibyśmy remis.

Tak jednak nie jest. Kompilator Lingui zatrzymuje się na poziomie całego języka; wszystko poniżej (katalogi per trasa, leniwe ładowanie, eliminacja fallbacku z paczki) wymaga żmudnej konfiguracji. Benchmark wyraźnie pokazuje koszt tej granicy: komponenty **10-20x większe**, hydratacja **2-3x wolniejsza**, **3-15% wycieku językowego**, który nigdy nie znika, oraz przełączanie języka trwające **42 ms** w zoptymalizowanej konfiguracji. Kompilator Intlayera działa na poziomie pojedynczego komponentu, dlatego te same wartości wynoszą **6-8 KB**, **11-14 ms**, **0%** i **3-4 ms** bez żadnej ręcznej konfiguracji.

Wszystkie surowe dane, aplikacje testowe i skrypty znajdują się w [repozytorium Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom). Możesz uruchomić je samodzielnie.

Więcej szczegółów znajdziesz w dokumencie ['Dlaczego Intlayer?'](https://intlayer.org/pl/doc/why).
