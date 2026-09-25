---
createdAt: 2026-09-13
updatedAt: 2026-09-22
title: "i18next vs Intlayer: Benchmark i porównanie 2026"
description: "react-i18next i next-i18next w porównaniu z Intlayer na Next.js i TanStack Start. Rozmiar bundle, wycieki treści, czas reakcji przy zmianie języka i doświadczenie programisty."
keywords:
  - i18next
  - react-i18next
  - next-i18next
  - Intlayer
  - Internacjonalizacja
  - i18n
  - Benchmark
  - Rozmiar bundle
  - Blog
  - Next.js
  - TanStack Start
  - JavaScript
  - React
slugs:
  - blog
  - i18next-vs-intlayer
author: aymericzip
---

# i18next VS Intlayer | Benchmark internacjonalizacji (i18n) w React i Next.js

![i18next VS Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/assets/i18next-next-intl-intlayer.webp?raw=true)

`i18next` to najczęściej używany framework i18n w ekosystemie JavaScript. Poprzez `react-i18next` i `next-i18next` zasila ogromną część aplikacji React i Next.js. Intlayer to nowoczesna alternatywa oparta na kompilatorze i izolacji na poziomie komponentów.

Ten artykuł porównuje oba rozwiązania na podstawie twardych pomiarów, a nie list funkcji. Liczby pochodzą z [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom), otwartoźródłowego pakietu testów, który buduje tę samą aplikację z każdą biblioteką i rejestruje, co przeglądarka faktycznie pobiera.

<TOC/>

> **tl;dr**: `i18next` to najcięższe środowisko wykonawcze (runtime) w tym benchmarku: **+77 KB gzip na stronę** w Next.js w konfiguracji naiwnej, oraz **+22 KB** po pełnej optymalizacji przestrzeni nazw (namespaces) i leniwego ładowania (lazy-loading). Intlayer dodaje zaledwie **+0.3 KB**. Każda konfiguracja `i18next` z wyjątkiem w pełni wyizolowanej (scoped) wysyła **~90% ciągów z innych stron**; Intlayer domyślnie wysyła **0%**. Zmiana języka z leniwie ładowanym backendem zajęła **123-185 ms** w `react-i18next` wobec **3-4 ms** w Intlayer. Adapter `@intlayer/next-i18next` zachowuje API `i18next` i osiągnął **150.7 KB** na stronę w porównaniu z **218.5 KB** oryginału.

## W skrócie

- **i18next / react-i18next / next-i18next** - Dojrzały, bogaty w pluginy, niezależny od frameworka. Przestrzenie nazw, detektory języka, backendy, ICU przez wtyczki, `<Trans>` dla treści sformatowanych. Zawartość jest scentralizowana w `locales/{lng}/{ns}.json`. Bardzo potężny, ale każda optymalizacja (podział przestrzeni nazw, ładowanie per strona, bezpieczeństwo typów) wymaga ręcznej konfiguracji i ciągłego utrzymania.
- **Intlayer** - Model zorientowany na komponenty. Słowniki `.content.ts` znajdują się bezpośrednio przy komponencie, który obsługują; kompilator w czasie budowania usuwa zbędny kod (tree-shaking) i ładuje treści leniwie per komponent i język. Ścisłe typy TypeScript są generowane automatycznie z treści, a brakujące tłumaczenia powodują błąd budowania. Zawiera middleware, pomocniki SEO, Edytor Wizualny / CMS i tłumaczenie wspomagane AI.

| Biblioteka              | Gwiazdki GitHub                                                                                                                                                                    | Łącznie commitów                                                                                                                                                                       | Ostatni commit                                                                                                                                          | Pierwsza wersja | Wersja NPM                                                                                                            | Pobrania NPM (miesięcznie)                                                                                                       |
| ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- | --------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `aymericzip/intlayer`   | [![GitHub Repo stars](https://img.shields.io/github/stars/aymericzip/intlayer?style=for-the-badge&label=%E2%AD%90%20stars)](https://github.com/aymericzip/intlayer/stargazers)     | [![GitHub commit activity](https://img.shields.io/github/commit-activity/t/aymericzip/intlayer?style=for-the-badge&label=commits)](https://github.com/aymericzip/intlayer/commits)     | [![Last Commit](https://img.shields.io/github/last-commit/aymericzip/intlayer?style=for-the-badge)](https://github.com/aymericzip/intlayer/commits)     | Kwiecień 2024   | [![npm](https://img.shields.io/npm/v/intlayer?style=for-the-badge)](https://www.npmjs.com/package/intlayer)           | [![npm downloads](https://img.shields.io/npm/dm/intlayer?style=for-the-badge)](https://www.npmjs.com/package/intlayer)           |
| `i18next/i18next`       | [![GitHub Repo stars](https://img.shields.io/github/stars/i18next/i18next?style=for-the-badge&label=%E2%AD%90%20stars)](https://github.com/i18next/i18next/stargazers)             | [![GitHub commit activity](https://img.shields.io/github/commit-activity/t/i18next/i18next?style=for-the-badge&label=commits)](https://github.com/i18next/i18next/commits)             | [![Last Commit](https://img.shields.io/github/last-commit/i18next/i18next?style=for-the-badge)](https://github.com/i18next/i18next/commits)             | Styczeń 2012    | [![npm](https://img.shields.io/npm/v/i18next?style=for-the-badge)](https://www.npmjs.com/package/i18next)             | [![npm downloads](https://img.shields.io/npm/dm/i18next?style=for-the-badge)](https://www.npmjs.com/package/i18next)             |
| `i18next/react-i18next` | [![GitHub Repo stars](https://img.shields.io/github/stars/i18next/react-i18next?style=for-the-badge&label=%E2%AD%90%20stars)](https://github.com/i18next/react-i18next/stargazers) | [![GitHub commit activity](https://img.shields.io/github/commit-activity/t/i18next/react-i18next?style=for-the-badge&label=commits)](https://github.com/i18next/react-i18next/commits) | [![Last Commit](https://img.shields.io/github/last-commit/i18next/react-i18next?style=for-the-badge)](https://github.com/i18next/react-i18next/commits) | Grudzień 2015   | [![npm](https://img.shields.io/npm/v/react-i18next?style=for-the-badge)](https://www.npmjs.com/package/react-i18next) | [![npm downloads](https://img.shields.io/npm/dm/react-i18next?style=for-the-badge)](https://www.npmjs.com/package/react-i18next) |
| `i18next/next-i18next`  | [![GitHub Repo stars](https://img.shields.io/github/stars/i18next/next-i18next?style=for-the-badge&label=%E2%AD%90%20stars)](https://github.com/i18next/next-i18next/stargazers)   | [![GitHub commit activity](https://img.shields.io/github/commit-activity/t/i18next/next-i18next?style=for-the-badge&label=commits)](https://github.com/i18next/next-i18next/commits)   | [![Last Commit](https://img.shields.io/github/last-commit/i18next/next-i18next?style=for-the-badge)](https://github.com/i18next/next-i18next/commits)   | Listopad 2018   | [![npm](https://img.shields.io/npm/v/next-i18next?style=for-the-badge)](https://www.npmjs.com/package/next-i18next)   | [![npm downloads](https://img.shields.io/npm/dm/next-i18next?style=for-the-badge)](https://www.npmjs.com/package/next-i18next)   |

> Odznaki aktualizują się automatycznie. Wartości zmieniają się w czasie.

## Porównanie funkcji

| Funkcja                                         | Intlayer (`react-intlayer` / `next-intlayer`)                                    | i18next (`react-i18next` / `next-i18next`)                                     |
| ----------------------------------------------- | -------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| **Tłumaczenia przy komponentach**               | ✅ Tak, `.content.ts` umieszczony przy każdym komponencie                        | ❌ Nie, scentralizowane `locales/{lng}/{ns}.json`                              |
| **Integracja z TypeScript**                     | ✅ Ścisłe typy generowane automatycznie z treści                                 | ⚠️ Podstawowa; ścisłe klucze wymagają rozszerzenia `CustomTypeOptions` i typów |
| **Wykrywanie brakujących tłumaczeń**            | ✅ Błąd TypeScript + błąd/ostrzeżenie podczas budowania                          | ⚠️ Fallback w runtime (`saveMissing`, zwrócenie samego klucza)                 |
| **Bogata treść (JSX / Markdown / komponenty)**  | ✅ Bezpośrednie wsparcie                                                         | ⚠️ `<Trans>` z indeksowanymi znacznikami                                       |
| **Wsparcie ICU**                                | ⚠️ W trakcie prac                                                                | ⚠️ Przez wtyczkę (`i18next-icu`)                                               |
| **Liczba mnoga (Pluralization)**                | ✅ Wzorce oparte na wyliczeniach (enum)                                          | ✅ Przyrostki `_one` / `_other` (Intl.PluralRules)                             |
| **Formatowanie (daty, liczby, waluty)**         | ✅ `useNumber`, `useDate`, ... (wbudowane Intl)                                  | ⚠️ Formatery interpolacji lub ręczne wywołania `Intl.*`                        |
| **Zlokalizowany routing i middleware**          | ✅ Wbudowane proxy/middleware, `getMultilingualUrls`                             | ⚠️ Brak w rdzeniu; wymaga własnego middleware lub zewnętrznych bibliotek       |
| **Pomocniki SEO (hreflang, sitemap, robots)**   | ✅ Wbudowane pomocniki                                                           | ❌ Ręcznie                                                                     |
| **Synchroniczne komponenty serwerowe (RSC)**    | ✅ `useIntlayer` z `next-intlayer/server` działa w każdym serwerowym komponencie | ⚠️ `getFixedT` na poziomie strony i przekazywanie `t` przez Props              |
| **Tree-shaking (tylko używane treści)**         | ✅ Na poziomie komponentu i języka, zautomatyzowane przez kompilator             | ⚠️ Ręcznie: przestrzenie nazw + lista `ns` per strona + backend                |
| **Leniwe ładowanie (Lazy loading)**             | ✅ `importMode: 'dynamic'` (jedna linijka konfiguracji)                          | ✅ Poprzez wtyczki backendu (`i18next-resources-to-backend` itp.)              |
| **Czyszczenie nieużywanych treści**             | ✅ Nieodwiedzane słowniki są usuwane w procesie budowania                        | ❌ Brak wbudowanego mechanizmu                                                 |
| **Testowanie brakujących tłumaczeń (CLI / CI)** | ✅ `npx intlayer content test`                                                   | ⚠️ `i18next-parser` / narzędzia firm trzecich                                  |
| **Tłumaczenie wspomagane AI**                   | ✅ Wbudowane, używa Twoich własnych kluczy API                                   | ❌ Nie (Locize to osobna, płatna usługa)                                       |
| **Wizualny Edytor / CMS**                       | ✅ Darmowy Edytor Wizualny + opcjonalny CMS                                      | ❌ Nie (Locize lub platformy zewnętrzne)                                       |
| **Serwer MCP & Agent Skills**                   | ✅ Dostępne                                                                      | ❌ Niedostępne                                                                 |
| **Ekosystem i społeczność**                     | ⚠️ Młodszy, lecz dynamicznie rosnący                                             | ✅ Największy i najbardziej dojrzały                                           |

## Benchmark

### Co było mierzone

Pakiet testowy [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom) buduje **dokładnie tę samą aplikację** z każdą biblioteką: **10 stron** (home, about, blog, careers, contact, FAQ, pricing, products, settings, team), **10 języków** (`en`, `fr`, `es`, `de`, `it`, `pt`, `zh`, `ja`, `ko`, `ru`), identyczne komponenty i identyczną zawartość. Pomiary przeprowadzono dla stron w językach angielskim i francuskim. Każdą bibliotekę wdrożono w maksymalnie czterech **strategiach ładowania**:

| Strategia          | Opis                                                                                    | Kto to stosuje                                 |
| ------------------ | --------------------------------------------------------------------------------------- | ---------------------------------------------- |
| **static**         | Wszystkie języki i strony spakowane razem (`resources` wbudowane w `init()`)            | Szybkie prototypy, kod z generatorów AI        |
| **dynamic**        | Tylko aktywny język jest ładowany przez backend, ale wszystkie przestrzenie nazw na raz | Większość standardowych projektów              |
| **scoped-static**  | Jedna przestrzeń nazw na trasę, wszystkie spakowane na start                            | Rzadko                                         |
| **scoped-dynamic** | Przestrzeń nazw na trasę + leniwe ładowanie przez backend. Tylko bieżąca strona i język | Aplikacje z rygorystycznym budżetem wydajności |

Intlayer nie posiada wariantu "scoped": kompilator automatycznie ogranicza zakres treści **na poziomie komponentu**, dlatego wiersze `static` i `dynamic` są już w pełni zoptymalizowane.

Dla każdego buildu rejestrowane są wskaźniki:

- **Lib size**: rozmiar gzip pustego komponentu importującego tylko bibliotekę i18n (stały koszt runtime).
- **Page JS**: średni pobierany JavaScript gzip na stronę dla wszystkich stron i języków.
- **Locale leak %**: odsetek przetłumaczonych ciągów w pobranym JS należących do języka, którego użytkownik **nie** przegląda.
- **Page leak %**: odsetek przetłumaczonych ciągów w pobranym JS należących do strony, na której użytkownik **nie** przebywa.
- **Component avg**: średni rozmiar gzip każdego komponentu skompilowanego w izolacji.
- **E2E reactivity**: rzeczywisty czas od wyboru nowego języka do zaktualizowania `html[lang]` w DOM (Playwright, 5 prób).
- **Hydration**: czas trwania fazy hydratacji React.

> Poniższe wyniki pochodzą z testów przeprowadzonych **2026-09-12** z wersjami `next-i18next` 16.3.0, `react-i18next` 17.0.13 i `intlayer` 9.5.1. Aplikacja testowa jest celowo zwarta, dlatego procenty wycieków opisują **wzorzec**: rosną one wraz z rozrostem treści, podczas gdy stały koszt środowiska wykonawczego nie ulega zmianie.

### Wyniki w Next.js (`next-i18next`)

Wybierz metryki i biblioteki, które Cię interesują:

<I18nBenchmark framework="nextjs" vertical/>

| Biblioteka                        | Strategia      | Lib size (gz) | Page JS avg (gz) | Wyciek języka | Wyciek strony | Komponent śr. (gz) | Reaktywność E2E | Hydratacja |
| --------------------------------- | -------------- | ------------: | ---------------: | ------------: | ------------: | -----------------: | --------------: | ---------: |
| **base** (bez i18n)               | -              |        0.0 KB |         141.0 KB |          0.0% |          0.0% |             0.9 KB |         13.4 ms |    11.8 ms |
| `next-i18next`                    | static         |       19.7 KB |         218.5 KB |          0.0% |         89.8% |            78.5 KB |         16.4 ms |    15.6 ms |
| `next-i18next`                    | dynamic        |       19.7 KB |         169.5 KB |         50.0% |         89.8% |            26.1 KB |         15.4 ms |    27.7 ms |
| `next-i18next`                    | scoped-static  |       19.7 KB |         220.1 KB |          0.0% |         89.8% |            78.9 KB |         16.4 ms |    14.7 ms |
| `next-i18next`                    | scoped-dynamic |       19.7 KB |         163.4 KB |          0.0% |          0.0% |            27.1 KB |         15.9 ms |    15.1 ms |
| **`next-intlayer`**               | static         |    **5.5 KB** |     **141.3 KB** |      **0.0%** |      **0.0%** |         **8.5 KB** |     **15.5 ms** |    16.9 ms |
| **`next-intlayer`**               | dynamic        |    **5.5 KB** |     **141.3 KB** |      **0.0%** |      **0.0%** |         **6.9 KB** |     **15.3 ms** |    15.9 ms |
| `@intlayer/next-i18next` (compat) | static         |        9.4 KB |         150.7 KB |          0.0% |          0.0% |             9.7 KB |         10.7 ms |    11.3 ms |
| `@intlayer/next-i18next` (compat) | dynamic        |        9.4 KB |         150.7 KB |          0.0% |          0.0% |             9.7 KB |         11.9 ms |    10.6 ms |

**Analiza wyników**

- **Koszt środowiska wykonawczego**: rdzeń `i18next` wraz z `react-i18next` to najcięższy mierzony runtime: **19.7 KB gzip** dla pustego komponentu, wobec 5.5 KB w `next-intlayer`.
- **Naiwna konfiguracja jest kosztowna**: Wstrzyknięcie `resources` w `init()` generuje **218.5 KB na stronę** (+77.5 KB w stosunku do aplikacji bazowej). Każda strona nosi w sobie wszystkie przestrzenie nazw.
- **Optymalizacja wymaga dużych nakładów pracy**: Przejście na backend (`dynamic`) oszczędza 49 KB, lecz wciąż **przepuszcza 90% ciągów z innych stron**, a w tej konfiguracji połowa pobranych ciągów należy do nieaktywnego języka. Dopiero podział na przestrzenie nazw per trasa (`scoped-dynamic`) zatrzymuje wycieki przy rozmiarze **163.4 KB**, co wciąż daje **+22.4 KB na stronę** więcej niż w Intlayer (141.3 KB), który nie wymagał żadnej żmudnej konfiguracji.
- **Wielkość komponentów**: Komponent wywołujący `useTranslation()` kompiluje się do 26-79 KB; ten sam komponent z `useIntlayer()` zajmuje zaledwie 6.9 KB.
- **Czas hydratacji**: w konfiguracji `dynamic` wzrasta do 27.7 ms, ponieważ instancja i18next musi zainicjalizować się i przetworzyć backend po stronie klienta, zanim React ukończy hydratację.

<ClickToOpenIframe
src="https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-nextjs.md"
width="100%"
height="600px"
style="border:none;"
/>

> Pełna tabela, każda biblioteka i każda strategia, w [raporcie benchmarku Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/benchmark/nextjs.md).

### Wyniki w TanStack Start (`react-i18next`)

Ta sama aplikacja na TanStack Start z czystym `react-i18next`, co eliminuje specyfikę Next.js z testu porównawczego.

| Biblioteka          | Strategia      | Lib size (gz) | Page JS avg (gz) | Wyciek języka | Wyciek strony | Komponent śr. (gz) | Reaktywność E2E | Hydratacja |
| ------------------- | -------------- | ------------: | ---------------: | ------------: | ------------: | -----------------: | --------------: | ---------: |
| **base** (bez i18n) | -              |        0.0 KB |         111.0 KB |          0.0% |          0.0% |             0.7 KB |          8.1 ms |    21.6 ms |
| `react-i18next`     | static         |       18.4 KB |         180.3 KB |         50.0% |         89.8% |            24.3 KB |         12.9 ms |    85.1 ms |
| `react-i18next`     | dynamic        |       18.4 KB |         136.4 KB |         23.1% |         89.8% |            24.8 KB |        123.1 ms |    32.9 ms |
| `react-i18next`     | scoped-static  |       18.4 KB |         184.2 KB |         50.7% |         89.8% |            25.3 KB |        185.1 ms |    25.2 ms |
| `react-i18next`     | scoped-dynamic |       18.4 KB |         127.2 KB |          0.0% |          0.0% |            26.7 KB |         17.6 ms |    11.3 ms |
| **`intlayer`**      | static         |    **5.0 KB** |     **125.8 KB** |         50.0% |      **0.0%** |         **8.1 KB** |      **3.2 ms** |    11.5 ms |
| **`intlayer`**      | dynamic        |    **5.0 KB** |     **118.6 KB** |      **0.0%** |      **0.0%** |         **6.3 KB** |      **3.6 ms** |    14.1 ms |

**Analiza wyników**

- Zwykła aplikacja `react-i18next` wysyła **+69 KB na stronę** więcej niż aplikacja bazowa, a hydratacja trwa aż **85 ms** (4-krotnie dłużej), gdyż całe drzewo zasobów musi zostać przetworzone i zarejestrowane na kliencie przed pierwszym wyrenderowaniem.
- **Opóźnienie przy zmianie języka**: Przy leniwym ładowaniu zmiana języka pociąga za sobą żądanie sieciowe zanim nastąpi aktualizacja `html[lang]`: **123 ms** w `dynamic`, **185 ms** w `scoped-static`. Intlayer aktualizuje DOM w **3-4 ms** w obu trybach: przełączenie jest natychmiastowe i niezależne od sieci.
- Zoptymalizowana konfiguracja `scoped-dynamic` osiąga 0% wycieków przy 127.2 KB, co nadal przewyższa Intlayer w trybie `dynamic` o **+8.6 KB**, wymagając mapowania tras i granic Suspense.
- Intlayer w trybie `static` wykazuje **0% wycieku stron** już na starcie, ponieważ pakowane są tylko te słowniki, które zostały zaimportowane przez komponenty danej strony. Włączenie `importMode: 'dynamic'` eliminuje także wyciek języka.
- **Rozmiar komponentu**: 24-27 KB w `react-i18next` wobec 6-8 KB w Intlayer. `useTranslation()` wiąże każdy komponent z globalną instancją i18next.

<ClickToOpenIframe
src="https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-tanstack.md"
width="100%"
height="600px"
style="border:none;"
/>

> Pełna tabela w [raporcie benchmarku TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/benchmark/tanstack.md).

## Skąd ta różnica? Globalna instancja vs skompilowane słowniki

![Centralized catalogs versus per-component dictionaries](https://github.com/aymericzip/intlayer/blob/main/docs/assets/project_stucture_18n_vs_intlayer.png?raw=true)

`i18next` powstał w 2012 roku jako runtime: pojedyncza globalna instancja trzyma repozytorium zasobów, wtyczki je rozszerzają, a `t()` szuka kluczy w czasie renderowania. Daje to wszechstronność, ale generuje narzut:

```bash
.
├── i18n.ts                      # createInstance().use(...).use(...).init({...})
└── src
    ├── locales
    │   ├── en
    │   │   ├── common.json
    │   │   ├── home.json
    │   │   └── about.json
    │   └── fr
    │       ├── common.json
    │       ├── home.json
    │       └── about.json
    ├── components
    │   └── Counter.tsx          # useTranslation("about") + t("counter.label")
    └── app
        └── [locale]
            └── about
                └── page.tsx     # musi wiedzieć, że potrzebuje ["common", "about"]
```

Instancja nie wie z góry, o jakie klucze zapyta komponent, dlatego trzyma wszystkie przestrzenie nazw przekazane do załadowania. Optymalizacja wymaga, aby **programista** dzielił katalogi, wyliczał przestrzenie dla każdej strony i na bieżąco korygował te powiązania.

Koszt rośnie w dwóch wymiarach jednocześnie, stron i języków:

![Theoretical content leakage by architecture](https://github.com/aymericzip/intlayer/blob/main/docs/assets/theorical_content_leakage.webp?raw=true)

Jak zauważono w [notatkach z benchmarku](https://github.com/intlayer-org/benchmark-bloom/blob/main/report/NOTE.md): "Utrzymanie typowania i dokładna wiedza o tym, który namespace dołączyć do danej strony, to koszmar".

Intlayer eliminuje instancję globalną. Treści deklarowane są tuż obok komponentu, a kompilator rozwiązuje graf zależności podczas budowania:

```bash
.
├── intlayer.config.ts
└── src
    ├── components
    │   └── Counter
    │       ├── index.tsx        # useIntlayer("counter")
    │       └── index.content.ts
    └── app
        └── [locale]
            └── about
                ├── page.tsx
                └── page.content.ts
```

`@intlayer/swc` / `@intlayer/babel` rozpoznaje, który komponent importuje dany słownik, dołącza do paczki tylko te niezbędne dla aktywnego języka i usuwa nieużywane. Wzorzec "scoped-dynamic" staje się bezpośrednim efektem buildu, a nie uciążliwą procedurą do ręcznego pilnowania.

> Aby uzyskać liczby z wiersza `dynamic`, ustaw `dictionary.importMode: 'dynamic'` w pliku `intlayer.config.ts`. Szczegóły opisano w [dokumentacji optymalizacji bundle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/bundle_optimization.md).

## Doświadczenie programisty (DX)

### Konfiguracja

<Tabs defaultTab="intlayer" group="techno">
<Tab label="next-i18next" value="i18next">

```ts fileName="src/app/i18n/server.ts"
import { createInstance } from "i18next";
import { initReactI18next } from "react-i18next/initReactI18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { defaultLocale } from "@/i18n.config";

const backend = resourcesToBackend(
  (locale: string, namespace: string) =>
    import(`../../locales/${locale}/${namespace}.json`)
);

export const initI18next = async (
  locale: string,
  namespaces: string[] = ["common"]
) => {
  const i18n = createInstance();
  await i18n
    .use(initReactI18next)
    .use(backend)
    .init({
      lng: locale,
      fallbackLng: defaultLocale,
      ns: namespaces,
      defaultNS: "common",
      interpolation: { escapeValue: false },
      react: { useSuspense: false },
    });
  return i18n;
};
```

Do tego dochodzi kliencki `I18nProvider`, `generateStaticParams` oraz deklarowanie tablicy `namespaces` na każdej podstronie.

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

```tsx fileName="src/app/[locale]/layout.tsx"
import { getHTMLTextDir } from "intlayer";
import { IntlayerClientProvider, type NextLayoutIntlayer } from "next-intlayer";

const LocaleLayout: NextLayoutIntlayer = async ({ children, params }) => {
  const { locale } = await params;

  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <body>
        <IntlayerClientProvider locale={locale}>
          {children}
        </IntlayerClientProvider>
      </body>
    </html>
  );
};

export default LocaleLayout;
```

</Tab>
</Tabs>

### Komponent kliencki

<Tabs defaultTab="intlayer" group="techno">
<Tab label="react-i18next" value="i18next">

```json fileName="src/locales/en/about.json"
{
  "counter": {
    "label": "Counter",
    "increment": "Increment"
  }
}
```

```tsx fileName="src/components/Counter.tsx"
"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";

export const Counter = () => {
  const { t, i18n } = useTranslation("about");
  const [count, setCount] = useState(0);
  const numberFormat = new Intl.NumberFormat(i18n.language);

  return (
    <div>
      <p>{numberFormat.format(count)}</p>
      <button
        aria-label={t("counter.label")}
        onClick={() => setCount((c) => c + 1)}
      >
        {t("counter.increment")}
      </button>
    </div>
  );
};
```

> Strona renderująca ten komponent musi załadować namespace `about`, a `t("counter.label")` pozostaje zwykłym stringiem bez rozszerzenia `CustomTypeOptions`.

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
"use client";

import { useState } from "react";
import { useIntlayer } from "next-intlayer";
import { useNumber } from "next-intlayer/format";

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

Pola `label` oraz `increment` posiadają ścisłe typowanie; każda literówka natychmiast generuje błąd TypeScript, a brak tłumaczenia dla języka francuskiego zablokuje proces budowania.

</Tab>
</Tabs>

### Synchroniczny komponent serwerowy (RSC)

<Tabs defaultTab="intlayer" group="techno">
<Tab label="next-i18next" value="i18next">

```tsx fileName="src/components/ServerCounter.tsx"
type ServerCounterProps = {
  t: (key: string) => string;
  locale: string;
  count: number;
};

export const ServerCounter = ({ t, locale, count }: ServerCounterProps) => (
  <div>
    <p>{new Intl.NumberFormat(locale).format(count)}</p>
    <button aria-label={t("counter.label")}>{t("counter.increment")}</button>
  </div>
);
```

Na poziomie strony wywołuje się `i18n.getFixedT(locale, "about")`, po czym przekazuje `t` i `locale` w dół za pomocą props.

</Tab>
<Tab label="Intlayer" value="intlayer">

```tsx fileName="src/components/ServerCounter.tsx"
import { useIntlayer } from "next-intlayer/server";
import { useNumber } from "next-intlayer/server/format";

export const ServerCounter = ({ count }: { count: number }) => {
  const { label, increment } = useIntlayer("counter");
  const number = useNumber();

  return (
    <div>
      <p>{number(count)}</p>
      <button aria-label={label}>{increment}</button>
    </div>
  );
};
```

</Tab>
</Tabs>

## Zachowaj API i18next, zyskaj wydajność Intlayer

Nie musisz przepisywać istniejących komponentów, aby cieszyć się zyskami z powyższego benchmarku. Adaptery `@intlayer/i18next`, `@intlayer/react-i18next` i `@intlayer/next-i18next` działają bezpośrednio jako zamienniki typu drop-in: wywołania `useTranslation`, `t()`, `<Trans>`, obsługa liczb mnogich i kontekstów działają bez zmian, serwowane przez zoptymalizowane słowniki Intlayer.

```ts fileName="next.config.ts"
import type { NextConfig } from "next";
import { createNextI18nPlugin } from "@intlayer/next-i18next/plugin";

const withIntlayer = createNextI18nPlugin();

const nextConfig: NextConfig = {};

export default withIntlayer(nextConfig);
```

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import { reactI18nextVitePlugin } from "@intlayer/react-i18next/plugin";

export default defineConfig({
  plugins: [reactI18nextVitePlugin()],
});
```

W benchmarku wersja z adapterem dla tej samej aplikacji Next.js zmniejszyła się z **218.5 KB do 150.7 KB** na stronę, z **78.5 KB do 9.7 KB** na komponent, wyciek spadł z **~90% do 0%**, a czas hydratacji skrócił się z 15.6 ms do 11.3 ms - bez modyfikacji kodu komponentów. Twoje dotychczasowe pliki `locales/{lng}/{ns}.json` mogą pozostać źródłem danych dzięki wtyczce do synchronizacji JSON.

Zobacz przewodniki migracji: [i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/migration_from_i18next_to_intlayer.md), [react-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/migration_from_react-i18next_to_intlayer.md), [next-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/migration_from_next-i18next_to_intlayer.md).

## Kiedy wybrać dane rozwiązanie?

<AccordionGroup>
<Accordion header="Wybierz i18next">

Jeśli bezwzględnie wymagasz jego ekosystemu wtyczek (specyficzne detektory, niestandardowe backendy, ICU, Locize), lokalizujesz treści także poza środowiskiem React (serwisy Node, czysty JS, inne frameworki), zespół ma już opanowane narzędzia lub zewnętrzna platforma tłumaczeniowa wymaga struktury `locales/{lng}/{ns}.json`. Zadbaj o czas na ręczną organizację przestrzeni nazw i mapowanie tras.

</Accordion>
<Accordion header="Wybierz Intlayer">

Zależy Ci na **treściach przypisanych do komponentów**, **ścisłym TypeScript**, **błędach brakujących kluczy w czasie kompilacji**, **tree-shakingu i leniwym ładowaniu bez wysiłku**, natychmiastowej zmianie języka, synchronicznych komponentach serwerowych i wbudowanych narzędziach edycyjnych ([Edytor wizualny](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_visual_editor.md), [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_CMS.md), [tłumaczenie AI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/autoFill.md), [serwer MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/mcp_server.md)). Szczególnie istotne w dużych, modułowych bazach kodu i systemach projektowych.

</Accordion>
<Accordion header="Wybierz adaptery @intlayer/*-i18next">

Korzystasz już z i18next i chcesz uzyskać korzyści w wielkości paczki i reaktywności bez przepisywania komponentów. Twoje pliki `locales/{lng}/{ns}.json` pozostają źródłem prawdy. Zmierzone ramię w ramię w [i18next vs @intlayer/i18next](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pl/i18next_vs_intlayer-i18next.md).

</Accordion>
</AccordionGroup>

## FAQ

<FAQ>

<Question title="Dlaczego i18next jest o wiele cięższy niż inne biblioteki?">

Został zaprojektowany jako środowisko uruchomieniowe niezależne od frameworka: globalna instancja, potok wtyczek, magazyn zasobów, mechanizm rozwiązywania kluczy. Ta elastyczność jest kompilowana w każdej paczce. Pusty komponent importujący jedynie bibliotekę waży **19.7 KB gzip** z `next-i18next` wobec **5.5 KB** z `next-intlayer`, a koszt ten ponoszony jest na każdej stronie, niezależnie od objętości treści.

</Question>

<Question title="Czy leniwe ładowanie z backendem rozwiązuje ten problem?">

Rozwiązuje problem bajtów, ale nie opóźnień. Przejście na `i18next-resources-to-backend` oszczędza ~49 KB na stronę, ale dodaje zapytanie sieciowe przy zmianie języka: **123 ms** w konfiguracji `dynamic` oraz **185 ms** w `scoped-static`, w porównaniu do **3-4 ms** w Intlayer. Hydratacja wzrasta do 27.7 ms, ponieważ instancja odpytuje backend przed hydratacją Reacta.

</Question>

<Question title="Czy mogę osiągnąć 0% wycieku z i18next?">

Tak, z konfiguracją `scoped-dynamic`: jeden namespace na trasę, backend zasobów i ręcznie utrzymywana mapa stron do przestrzeni nazw. Daje to 163.4 KB na stronę w Next.js, co nadal jest o **+22 KB** więcej niż 141.3 KB w Intlayer, który nie wymagał żadnej konfiguracji. Zobacz [optymalizację paczki](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/bundle_optimization.md).

</Question>

<Question title="Czy muszę przepisywać komponenty, aby przeprowadzić migrację?">

Nie. `@intlayer/i18next`, `@intlayer/react-i18next` oraz `@intlayer/next-i18next` zachowują `useTranslation`, `t()`, `<Trans>`, `{{interpolation}}`, formy mnogie `_one` / `_other`, sufiksy kontekstowe i `returnObjects`. Wystarczy jedna linijka wtyczki w `next.config.ts` lub `vite.config.ts`. Krok po kroku w [przewodniku migracji next-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/migration_from_next-i18next_to_intlayer.md).

</Question>

<Question title="Co dzieje się z moimi wtyczkami do i18next?">

Backendy i detektory języka są akceptowane, ale pozostają bezczynne: w czasie wykonywania nie ma już nic do załadowania ani wykrycia. Detekcja języka staje się konfiguracją routingu Intlayer (prefiks URL, ciasteczko, nagłówek). Jeśli aplikacja pobiera tłumaczenia z CMS podczas żądania, użyj [Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_CMS.md) lub poleceń `intlayer pull` / `push`.

</Question>

</FAQ>

## Powiązane porównania

Ten sam benchmark, inne biblioteki:

- [next-intl vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pl/next-intl_vs_intlayer.md)
- [Lingui vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pl/lingui_vs_intlayer.md)
- [vue-i18n vs Intlayer benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pl/vue-i18n_vs_intlayer_benchmark.md)
- [next-i18next vs next-intl vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pl/next-i18next_vs_next-intl_vs_intlayer.md)
- [react-i18next vs react-intl vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pl/react-i18next_vs_react-intl_vs_intlayer.md)

Więcej o i18next:

- [i18next vs @intlayer/i18next](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pl/i18next_vs_intlayer-i18next.md), porównanie adapterów na tej samej aplikacji
- [Czy i18next jest przestarzały?](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pl/is_i18next_outdated.md)
- [Używanie Intlayer z i18next](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pl/intlayer_with_i18next.md) oraz [z react-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pl/intlayer_with_react-i18next.md)
- [Jak zinternacjonalizować aplikację Next.js za pomocą next-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pl/i18n_using_next-i18next.md)

Dokumentacja referencyjna:

- [Raport benchmarku Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/benchmark/nextjs.md) oraz [raport benchmarku TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/benchmark/tanstack.md)
- Adaptery kompatybilności: [i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/compat/i18next.md), [react-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/compat/react-i18next.md), [next-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/compat/next-i18next.md)
- Przewodniki migracji: [i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/migration_from_i18next_to_intlayer.md), [react-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/migration_from_react-i18next_to_intlayer.md), [next-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/migration_from_next-i18next_to_intlayer.md)
- [Optymalizacja paczki](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/bundle_optimization.md) oraz [kompilator Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/compiler.md)
- [i18n per-komponent vs scentralizowane](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pl/per-component_vs_centralized_i18n.md)
- [i18n oparte na kompilatorze vs deklaratywne](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pl/compiler_vs_declarative_i18n.md)

## Gwiazdki na GitHub

Gwiazdki na GitHubie to przejrzysty wskaźnik popularności, zaufania społeczności i długoterminowego rozwoju projektu. Choć nie określają bezpośrednio jakości kodu, pokazują, jak wielu inżynierów uważa projekt za wartościowy i decyduje się na jego wdrożenie.

[![Wykres historii gwiazdek](https://api.star-history.com/chart?repos=i18next%2Fi18next%2Ci18next%2Freact-i18next%2Ci18next%2Fnext-i18next%2Caymericzip%2Fintlayer&type=date&legend=top-left)](https://star-history.com/#i18next/i18next&i18next/react-i18next&i18next/next-i18next&aymericzip/intlayer)

## Podsumowanie

`i18next` w pełni zasłużył na swoją pozycję: działa wszędzie, posiada wtyczki do wszystkiego i jest rozwijany od ponad dekady. Benchmark ten ujawnia jednak koszty architektury zorientowanej na runtime. Typowa konfiguracja dodaje **+70-77 KB gzip na stronę**, przesyła **~90% zbędnych tekstów z innych podstron**, a zmiana języka z leniwym ładowaniem trwa **ponad 100 ms**. Osiągnięcie 0% wycieków jest możliwe, lecz wymaga backendów i manualnego mapowania, a i tak pozostaje o **+9-22 KB cięższe** niż Intlayer.

Intlayer przenosi cały ten wysiłek na kompilator. Słowniki przy komponentach, automatyczne leniwe ładowanie per język i usuwanie martwych treści to bezpośrednie efekty procesu budowania. W tej samej aplikacji: **+0.3 KB na stronę**, **0% wycieków**, komponenty **3-10x lżejsze** oraz zmiana języka w **3-4 ms**.

Wszystkie surowe dane, aplikacje testowe i skrypty znajdują się w [repozytorium Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom). Możesz uruchomić je i sprawdzić samodzielnie.

Więcej szczegółów znajdziesz w dokumentacji ['Dlaczego Intlayer?'](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/interest_of_intlayer.md).
