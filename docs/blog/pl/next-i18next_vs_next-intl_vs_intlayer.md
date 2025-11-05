---
createdAt: 2025-08-23
updatedAt: 2025-09-29
title: next-i18next vs next-intl vs Intlayer
description: Porównanie next-i18next z next-intl i Intlayer pod kątem internacjonalizacji (i18n) aplikacji Next.js
keywords:
  - next-intl
  - next-i18next
  - Intlayer
  - Internacjonalizacja
  - Blog
  - Next.js
  - JavaScript
  - React
slugs:
  - blog
  - next-i18next-vs-next-intl-vs-intlayer
---

# next-i18next VS next-intl VS intlayer | Internacjonalizacja (i18n) Next.js

![next-i18next VS next-intl VS intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/assets/i18next-next-intl-intlayer.png?raw=true)

Przyjrzyjmy się podobieństwom i różnicom między trzema opcjami i18n dla Next.js: next-i18next, next-intl oraz Intlayer.

To nie jest pełny poradnik. To porównanie, które ma pomóc Ci w wyborze.

Skupiamy się na **Next.js 13+ App Router** (z **React Server Components**) i oceniamy:

<TOC/>

> **w skrócie**: Wszystkie trzy rozwiązania mogą lokalizować aplikację Next.js. Jeśli chcesz **zawartość ograniczoną do komponentu**, **ścisłe typy TypeScript**, **sprawdzanie brakujących kluczy podczas kompilacji**, **słowniki poddane tree-shakingowi** oraz **pierwszorzędne wsparcie App Router + SEO**, **Intlayer** jest najbardziej kompletnym i nowoczesnym wyborem.

> Częstym nieporozumieniem wśród deweloperów jest myślenie, że `next-intl` to wersja Next.js `react-intl`. Tak nie jest, `next-intl` jest utrzymywany przez [Amann](https://github.com/amannn), podczas gdy `react-intl` jest utrzymywany przez [FormatJS](https://github.com/formatjs/formatjs).

---

## W skrócie

- **next-intl** - Lekki, prosty formatowanie wiadomości z solidnym wsparciem Next.js. Centralizowane katalogi są powszechne; DX jest prosty, ale bezpieczeństwo i utrzymanie na dużą skalę pozostają głównie Twoją odpowiedzialnością.
- **next-i18next** - i18next w oprawie Next.js. Dojrzały ekosystem i funkcje dostępne przez wtyczki (np. ICU), ale konfiguracja może być rozbudowana, a katalogi mają tendencję do centralizacji wraz z rozwojem projektów.
- **Intlayer** - Model zawartości skoncentrowany na komponentach dla Next.js, **ścisłe typowanie TS**, **sprawdzanie podczas kompilacji**, **tree-shaking**, **wbudowane middleware i pomocniki SEO**, opcjonalny **Visual Editor/CMS** oraz **tłumaczenia wspomagane przez AI**.

---

| Library                | GitHub Stars                                                                                                                                                                     | Total Commits                                                                                                                                                                        | Last Commit                                                                                                                                           | First Version | NPM Version                                                                                                         | NPM Downloads                                                                                                                  |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- | ------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `aymericzip/intlayer`  | [![GitHub Repo stars](https://img.shields.io/github/stars/aymericzip/intlayer?style=for-the-badge&label=%E2%AD%90%20stars)](https://github.com/aymericzip/intlayer/stargazers)   | [![GitHub commit activity](https://img.shields.io/github/commit-activity/t/aymericzip/intlayer?style=for-the-badge&label=commits)](https://github.com/aymericzip/intlayer/commits)   | [![Last Commit](https://img.shields.io/github/last-commit/aymericzip/intlayer?style=for-the-badge)](https://github.com/aymericzip/intlayer/commits)   | April 2024    | [![npm](https://img.shields.io/npm/v/intlayer?style=for-the-badge)](https://www.npmjs.com/package/intlayer)         | [![npm downloads](https://img.shields.io/npm/dm/intlayer?style=for-the-badge)](https://www.npmjs.com/package/intlayer)         |
| `amannn/next-intl`     | [![GitHub Repo stars](https://img.shields.io/github/stars/amannn/next-intl?style=for-the-badge&label=%E2%AD%90%20stars)](https://github.com/amannn/next-intl/stargazers)         | [![GitHub commit activity](https://img.shields.io/github/commit-activity/t/amannn/next-intl?style=for-the-badge&label=commits)](https://github.com/amannn/next-intl/commits)         | [![Last Commit](https://img.shields.io/github/last-commit/amannn/next-intl?style=for-the-badge)](https://github.com/amannn/next-intl/commits)         | Nov 2020      | [![npm](https://img.shields.io/npm/v/next-intl?style=for-the-badge)](https://www.npmjs.com/package/next-intl)       | [![npm downloads](https://img.shields.io/npm/dm/next-intl?style=for-the-badge)](https://www.npmjs.com/package/next-intl)       |
| `i18next/i18next`      | [![GitHub Repo stars](https://img.shields.io/github/stars/i18next/i18next?style=for-the-badge&label=%E2%AD%90%20stars)](https://github.com/i18next/i18next/stargazers)           | [![GitHub commit activity](https://img.shields.io/github/commit-activity/t/i18next/i18next?style=for-the-badge&label=commits)](https://github.com/i18next/i18next/commits)           | [![Last Commit](https://img.shields.io/github/last-commit/i18next/i18next?style=for-the-badge)](https://github.com/i18next/i18next/commits)           | Jan 2012      | [![npm](https://img.shields.io/npm/v/i18next?style=for-the-badge)](https://www.npmjs.com/package/i18next)           | [![npm downloads](https://img.shields.io/npm/dm/i18next?style=for-the-badge)](https://www.npmjs.com/package/i18next)           |
| `i18next/next-i18next` | [![GitHub Repo stars](https://img.shields.io/github/stars/i18next/next-i18next?style=for-the-badge&label=%E2%AD%90%20stars)](https://github.com/i18next/next-i18next/stargazers) | [![GitHub commit activity](https://img.shields.io/github/commit-activity/t/i18next/next-i18next?style=for-the-badge&label=commits)](https://github.com/i18next/next-i18next/commits) | [![Last Commit](https://img.shields.io/github/last-commit/i18next/next-i18next?style=for-the-badge)](https://github.com/i18next/next-i18next/commits) | Nov 2018      | [![npm](https://img.shields.io/npm/v/next-i18next?style=for-the-badge)](https://www.npmjs.com/package/next-i18next) | [![npm downloads](https://img.shields.io/npm/dm/next-i18next?style=for-the-badge)](https://www.npmjs.com/package/next-i18next) |

> Odznaki aktualizują się automatycznie. Zrzuty ekranu mogą się zmieniać w czasie.

---

## Porównanie funkcji obok siebie (skoncentrowane na Next.js)

| Funkcja                                                    | `next-intlayer` (Intlayer)                                                                                                   | `next-intl`                                                                                                                    | `next-i18next`                                                                                                                 |
| ---------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------ |
| **Tłumaczenia blisko komponentów**                         | ✅ Tak, zawartość zlokalizowana razem z każdym komponentem                                                                   | ❌ Nie                                                                                                                         | ❌ Nie                                                                                                                         |
| **Integracja z TypeScript**                                | ✅ Zaawansowana, automatycznie generowane ścisłe typy                                                                        | ✅ Dobra                                                                                                                       | ⚠️ Podstawowa                                                                                                                  |
| **Wykrywanie brakujących tłumaczeń**                       | ✅ Podświetlanie błędów TypeScript oraz błędy/ostrzeżenia podczas kompilacji                                                 | ⚠️ Obsługa awaryjna w czasie wykonywania                                                                                       | ⚠️ Obsługa awaryjna w czasie wykonywania                                                                                       |
| **Bogata zawartość (JSX/Markdown/komponenty)**             | ✅ Bezpośrednie wsparcie                                                                                                     | ❌ Nie zaprojektowane dla bogatych węzłów                                                                                      | ⚠️ Ograniczone                                                                                                                 |
| **Tłumaczenie wspomagane AI**                              | ✅ Tak, obsługuje wielu dostawców AI. Można używać własnych kluczy API. Uwzględnia kontekst Twojej aplikacji i zakres treści | ❌ Nie                                                                                                                         | ❌ Nie                                                                                                                         |
| **Edytor wizualny**                                        | ✅ Tak, lokalny Edytor wizualny + opcjonalny CMS; może eksternalizować zawartość codebase; osadzalny                         | ❌ Nie / dostępny przez zewnętrzne platformy lokalizacyjne                                                                     | ❌ Nie / dostępny przez zewnętrzne platformy lokalizacyjne                                                                     |
| **Lokalizowane routingi**                                  | ✅ Tak, obsługuje lokalizowane ścieżki od razu (działa z Next.js i Vite)                                                     | ✅ Wbudowany, App Router obsługuje segment `[locale]`                                                                          | ✅ Wbudowany                                                                                                                   |
| **Generowanie dynamicznych tras**                          | ✅ Tak                                                                                                                       | ✅ Tak                                                                                                                         | ✅ Tak                                                                                                                         |
| **Pluralizacja**                                           | ✅ Wzorce oparte na enumeracji                                                                                               | ✅ Dobre                                                                                                                       | ✅ Dobre                                                                                                                       |
| **Formatowanie (daty, liczby, waluty)**                    | ✅ Zoptymalizowane formatery (Intl w tle)                                                                                    | ✅ Dobre (pomocniki Intl)                                                                                                      | ✅ Dobre (pomocniki Intl)                                                                                                      |
| **Format treści**                                          | ✅ .tsx, .ts, .js, .json, .md, .txt, (.yaml WIP)                                                                             | ✅ .json, .js, .ts                                                                                                             | ⚠️ .json                                                                                                                       |
| **Wsparcie ICU**                                           | ⚠️ W trakcie realizacji                                                                                                      | ✅ Tak                                                                                                                         | ⚠️ Za pomocą wtyczki (`i18next-icu`)                                                                                           |
| **Narzędzia SEO (hreflang, sitemap)**                      | ✅ Wbudowane narzędzia: pomocniki do sitemap, robots.txt, metadanych                                                         | ✅ Dobre                                                                                                                       | ✅ Dobre                                                                                                                       |
| **Ekosystem / Społeczność**                                | ⚠️ Mniejsza, ale szybko rosnąca i reagująca                                                                                  | ✅ Dobra                                                                                                                       | ✅ Dobra                                                                                                                       |
| **Renderowanie po stronie serwera i komponenty serwerowe** | ✅ Tak, zoptymalizowane pod SSR / React Server Components                                                                    | ⚠️ Obsługiwane na poziomie strony, ale wymaga przekazywania funkcji t w drzewie komponentów dla dzieci komponentów serwerowych | ⚠️ Obsługiwane na poziomie strony, ale wymaga przekazywania funkcji t w drzewie komponentów dla dzieci komponentów serwerowych |
| **Tree-shaking (ładowanie tylko używanej zawartości)**     | ✅ Tak, per-komponent podczas budowania za pomocą wtyczek Babel/SWC                                                          | ⚠️ Częściowo                                                                                                                   | ⚠️ Częściowo                                                                                                                   |
| **Lazy loading (leniwe ładowanie)**                        | ✅ Tak, per-lokalizacja / per-słownik                                                                                        | ✅ Tak (per-trasa/per-lokalizacja), wymaga zarządzania przestrzeniami nazw                                                     | ✅ Tak (per-trasa/per-lokalizacja), wymaga zarządzania przestrzeniami nazw                                                     |
| **Usuwanie nieużywanych treści**                           | ✅ Tak, na poziomie słownika podczas budowania                                                                               | ❌ Nie, można zarządzać ręcznie za pomocą zarządzania przestrzenią nazw                                                        | ❌ Nie, można zarządzać ręcznie za pomocą zarządzania przestrzenią nazw                                                        |
| **Zarządzanie dużymi projektami**                          | ✅ Zachęca do modularności, odpowiednie dla systemów projektowych                                                            | ✅ Modularne z konfiguracją                                                                                                    | ✅ Modularne z konfiguracją                                                                                                    |
| **Testowanie brakujących tłumaczeń (CLI/CI)**              | ✅ CLI: `npx intlayer content test` (audyt przyjazny CI)                                                                     | ⚠️ Nie wbudowane; dokumentacja sugeruje `npx @lingual/i18n-check`                                                              | ⚠️ Nie wbudowane; opiera się na narzędziach i18next / runtime `saveMissing`                                                    |

---

## Wprowadzenie

Next.js oferuje wbudowane wsparcie dla internacjonalizowanego routingu (np. segmenty lokalizacji). Jednak ta funkcja sama w sobie nie wykonuje tłumaczeń. Nadal potrzebujesz biblioteki do renderowania zlokalizowanych treści dla użytkowników.

Istnieje wiele bibliotek i18n, ale w świecie Next.js obecnie trzy zyskują na popularności: next-i18next, next-intl oraz Intlayer.

---

## Architektura i skalowalność

- **next-intl / next-i18next**: Domyślnie korzystają z **centralizowanych katalogów** dla każdego locale (oraz **namespaces** w i18next). Działa dobrze na początku, ale często staje się dużą wspólną powierzchnią z rosnącym sprzężeniem i zmianami kluczy.
- **Intlayer**: Zachęca do stosowania słowników **per-komponent** (lub per-funkcjonalność) **współlokowanych** z kodem, który obsługują. Zmniejsza to obciążenie poznawcze, ułatwia duplikację/migrację elementów UI oraz redukuje konflikty między zespołami. Nieużywana zawartość jest naturalnie łatwiejsza do wykrycia i usunięcia.

**Dlaczego to ważne:** W dużych bazach kodu lub systemach designu, **modułowa zawartość** skalują się lepiej niż monolityczne katalogi.

---

## Rozmiary pakietów i zależności

Po zbudowaniu aplikacji, bundle to JavaScript, który przeglądarka załaduje, aby wyrenderować stronę. Rozmiar bundle jest więc istotny dla wydajności aplikacji.

Dwa komponenty są ważne w kontekście bundle aplikacji wielojęzycznej:

- Kod aplikacji
- Zawartość ładowana przez przeglądarkę

## Kod aplikacji

Znaczenie kodu aplikacji jest w tym przypadku minimalne. Wszystkie trzy rozwiązania są tree-shakable, co oznacza, że nieużywane części kodu nie są dołączane do bundle.

Oto porównanie rozmiaru bundle JavaScript ładowanego przez przeglądarkę dla aplikacji wielojęzycznej z trzema rozwiązaniami.

Jeśli w aplikacji nie potrzebujemy żadnego formatera, lista eksportowanych funkcji po tree-shakingu będzie następująca:

- **next-intlayer**: `useIntlayer`, `useLocale`, `NextIntlClientProvider`, (Rozmiar bundla to 180,6 kB -> 78,6 kB (gzip))
- **next-intl**: `useTranslations`, `useLocale`, `NextIntlClientProvider`, (Rozmiar bundla to 101,3 kB -> 31,4 kB (gzip))
- **next-i18next**: `useTranslation`, `useI18n`, `I18nextProvider`, (Rozmiar bundla to 80,7 kB -> 25,5 kB (gzip))

Te funkcje są jedynie wrapperami wokół kontekstu/stanu React, więc całkowity wpływ biblioteki i18n na rozmiar bundla jest minimalny.

> Intlayer jest nieco większy niż `next-intl` i `next-i18next`, ponieważ zawiera więcej logiki w funkcji `useIntlayer`. Jest to związane z integracją markdown i `intlayer-editor`.

## Zawartość i tłumaczenia

Ta część jest często ignorowana przez deweloperów, ale rozważmy przypadek aplikacji składającej się z 10 stron w 10 językach. Załóżmy, że każda strona zawiera w 100% unikalną treść, aby uprościć obliczenia (w rzeczywistości wiele treści jest powtarzalnych między stronami, np. tytuł strony, nagłówek, stopka itp.).

Użytkownik chcący odwiedzić stronę `/fr/about` załaduje zawartość jednej strony w danym języku. Ignorowanie optymalizacji treści oznaczałoby niepotrzebne załadowanie 8 200% `((1 + (((10 stron - 1) × (10 języków - 1)))) × 100)` zawartości aplikacji. Widzisz problem? Nawet jeśli ta zawartość pozostaje tekstem, a Ty prawdopodobnie wolisz myśleć o optymalizacji obrazów na swojej stronie, wysyłasz niepotrzebną treść na cały świat i zmuszasz komputery użytkowników do jej przetwarzania bez powodu.

Dwa ważne zagadnienia:

- **Podział według ścieżki:**

  > Jeśli jestem na stronie `/about`, nie chcę ładować zawartości strony `/home`

- **Podział według lokalizacji:**

  > Jeśli jestem na stronie `/fr/about`, nie chcę ładować zawartości strony `/en/about`

Ponownie, wszystkie trzy rozwiązania zdają sobie sprawę z tych problemów i pozwalają zarządzać tymi optymalizacjami. Różnica między tymi trzema rozwiązaniami to DX (Developer Experience).

`next-intl` i `next-i18next` używają scentralizowanego podejścia do zarządzania tłumaczeniami, pozwalając na podział plików JSON według lokalizacji i podplików. W `next-i18next` nazywamy pliki JSON 'namespaces'; `next-intl` pozwala deklarować wiadomości. W `intlayer` nazywamy pliki JSON 'dictionaries'.

- W przypadku `next-intl`, podobnie jak w `next-i18next`, zawartość jest ładowana na poziomie strony/layoutu, a następnie ta zawartość jest ładowana do providera kontekstu. Oznacza to, że deweloper musi ręcznie zarządzać plikami JSON, które będą ładowane dla każdej strony.

> W praktyce oznacza to, że deweloperzy często pomijają tę optymalizację, woląc dla uproszczenia załadować całą zawartość w providerze kontekstu strony.

- W przypadku `intlayer` cała zawartość jest ładowana w aplikacji. Następnie wtyczka (`@intlayer/babel` / `@intlayer/swc`) zajmuje się optymalizacją bundla, ładując tylko zawartość używaną na stronie. Deweloper nie musi więc ręcznie zarządzać słownikami, które będą ładowane. Pozwala to na lepszą optymalizację, lepszą utrzymywalność oraz skraca czas developmentu.

W miarę rozwoju aplikacji (szczególnie gdy nad aplikacją pracuje wielu programistów), często zdarza się zapomnieć o usunięciu treści, które nie są już używane, z plików JSON.

> Należy zauważyć, że wszystkie pliki JSON są ładowane we wszystkich przypadkach (next-intl, next-i18next, intlayer).

Dlatego podejście Intlayer jest bardziej wydajne: jeśli komponent nie jest już używany, jego słownik nie jest ładowany do bundla.

Równie ważne jest, jak biblioteka obsługuje mechanizm fallbacków. Załóżmy, że aplikacja domyślnie jest w języku angielskim, a użytkownik odwiedza stronę `/fr/about`. Jeśli tłumaczenia we francuskim są niekompletne, zostanie zastosowany fallback na angielski.

W przypadku `next-intl` i `next-i18next` biblioteka wymaga załadowania pliku JSON związanego z bieżącym locale, ale także z locale zapasowym (fallback). W związku z tym, zakładając, że cały content został przetłumaczony, każda strona załaduje 100% niepotrzebnej zawartości. **Dla porównania, `intlayer` przetwarza fallback podczas budowania słownika. W ten sposób każda strona załaduje tylko używaną zawartość.**

> Uwaga: Aby zoptymalizować bundle za pomocą `intlayer`, musisz ustawić opcję `importMode: 'dynamic'` w pliku `intlayer.config.ts`. I upewnić się, że wtyczka `@intlayer/babel` / `@intlayer/swc` jest zainstalowana (domyślnie instalowana przy użyciu `vite-intlayer`).

Oto przykład wpływu optymalizacji rozmiaru bundle za pomocą `intlayer` w aplikacji vite + react:

| Zoptymalizowany pakiet                                                                                      | Pakiet niezoptymalizowany                                                                                                      |
| ----------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| ![zoptymalizowany pakiet](https://github.com/aymericzip/intlayer/blob/main/docs/assets/bundle.png?raw=true) | ![niezoptymalizowany pakiet](https://github.com/aymericzip/intlayer/blob/main/docs/assets/bundle_no_optimization.png?raw=true) |

---

## TypeScript i bezpieczeństwo

<Columns>
  <Column>

**next-i18next**

- Podstawowe typy dla hooków. **ścisłe typowanie kluczy wymaga dodatkowych narzędzi/konfiguracji**.

  </Column>
  <Column>

**next-intl**

- Solidne wsparcie TypeScript, ale **klucze nie są domyślnie ściśle typowane**. Bezpieczeństwo utrzymasz ręcznie.

  </Column>
  <Column>

**intlayer**

- **Generuje ścisłe typy** na podstawie twoich treści. **Autouzupełnianie w IDE** oraz **błędy podczas kompilacji** wychwytują literówki i brakujące klucze przed wdrożeniem.

  </Column>
</Columns>

**Dlaczego to ważne:** Silne typowanie przesuwa błędy na **wcześniejszy etap** (CI/build), zamiast na **późniejszy** (czas działania).

---

## Obsługa brakujących tłumaczeń

<Columns>
  <Column>

**next-i18next**

- Polega na **fallbackach w czasie działania**. Budowanie nie kończy się błędem.

  </Column>
  <Column>

**next-intl**

- Polega na **fallbackach w czasie działania**. Budowanie nie kończy się błędem.

  </Column>
  <Column>

**intlayer**

- **Wykrywanie podczas kompilacji** z **ostrzeżeniami/błędami** dla brakujących lokalizacji lub kluczy.

  </Column>
</Columns>

**Dlaczego to ważne:** Wykrywanie braków podczas kompilacji zapobiega pojawianiu się 'undefined' w produkcji.

---

## Routing, middleware i strategia URL

<Columns>
  <Column>

**next-i18next**

- Umożliwia lokalizowany routing. Jednak middleware nie jest wbudowane.

  </Column>
  <Column>

**next-intl**

- Umożliwia lokalizowany routing.
- Dostarcza middleware.

  </Column>
  <Column>

**intlayer**

- Umożliwia lokalizowany routing.
- Dostarcza middleware.

  </Column>
</Columns>

**Dlaczego to ważne:** Pomaga w SEO i odkrywalności, a także poprawia doświadczenie użytkownika.

---

## Wsparcie dla Server Components (RSC)

<Columns>
  <Column>

**next-i18next**

- Wspiera komponenty serwerowe stron i layoutów.
- Nie zapewnia synchronicznego API dla dziecięcych komponentów serwerowych.

  </Column>
  <Column>

**next-intl**

- Obsługuje komponenty serwerowe stron i układów.
- Nie zapewnia synchronicznego API dla dziecięcych komponentów serwerowych.

  </Column>
  <Column>

**intlayer**

- Obsługuje komponenty serwerowe stron i układów.
- Zapewnia synchroniczne API dla dziecięcych komponentów serwerowych.

  </Column>
</Columns>

**Dlaczego to ważne:** Wsparcie komponentów serwerowych jest kluczową funkcją Next.js 13+, wspomagającą wydajność. Przekazywanie propsów takich jak locale lub funkcji `t` z komponentu nadrzędnego do dziecięcych komponentów serwerowych sprawia, że Twoje komponenty są mniej wielokrotnego użytku.

---

## Integracja z platformami lokalizacyjnymi (TMS)

Duże organizacje często polegają na Systemach Zarządzania Tłumaczeniami (TMS), takich jak **Crowdin**, **Phrase**, **Lokalise**, **Localizely** czy **Localazy**.

- **Dlaczego firmy zwracają na to uwagę**
  - **Współpraca i role**: Zaangażowanych jest wielu uczestników: deweloperzy, menedżerowie produktu, tłumacze, recenzenci, zespoły marketingowe.
  - **Skala i efektywność**: ciągła lokalizacja, przegląd w kontekście.

- **next-intl / next-i18next**
  - Zazwyczaj używają **scentralizowanych katalogów JSON**, więc eksport/import z TMS jest prosty.
  - Dojrzałe ekosystemy oraz przykłady/integracje dla wymienionych platform.

- **Intlayer**
  - Zachęca do **zdecentralizowanych słowników per komponent** i obsługuje zawartość w formatach **TypeScript/TSX/JS/JSON/MD**.
  - Poprawia to modularność w kodzie, ale może utrudniać integrację typu plug-and-play z TMS, gdy narzędzie oczekuje scentralizowanych, płaskich plików JSON.
  - Intlayer oferuje alternatywy: **tłumaczenia wspomagane AI** (z użyciem własnych kluczy dostawcy), **Edytor Wizualny/CMS** oraz workflowy **CLI/CI** do wykrywania i wypełniania luk.

> Uwaga: `next-intl` i `i18next` również akceptują katalogi TypeScript. Jeśli Twój zespół przechowuje wiadomości w plikach `.ts` lub decentralizuje je według funkcji, możesz napotkać podobne problemy z TMS. Jednak wiele konfiguracji `next-intl` pozostaje scentralizowanych w folderze `locales/`, co jest nieco łatwiejsze do przekształcenia na JSON dla TMS.

---

## Doświadczenie dewelopera

Ta część dokonuje dogłębnego porównania trzech rozwiązań. Zamiast rozważać proste przypadki, opisane w dokumentacji „getting started” dla każdego rozwiązania, rozważymy rzeczywisty przypadek użycia, bardziej zbliżony do prawdziwego projektu.

### Struktura aplikacji

Struktura aplikacji jest ważna, aby zapewnić dobrą utrzymywalność Twojej bazy kodu.

<Tab defaultTab="next-intl" group='techno'>

  <TabItem label="next-i18next" value="next-i18next">

```bash
.
├── i18n.config.ts
└── src
    ├── locales
    │   ├── en
    │   │  ├── common.json
    │   │  └── about.json
    │   └── fr
    │      ├── common.json
    │      └── about.json
    ├── app
    │   ├── i18n
    │   │   └── server.ts
    │   └── [locale]
    │       ├── layout.tsx
    │       └── about.tsx
    └── components
        ├── I18nProvider.tsx
        ├── ClientComponent.tsx
        └── ServerComponent.tsx
```

  </TabItem>
  <TabItem label="next-intl" value="next-intl">

```bash
.
├── i18n.ts
├── locales
│   ├── en
│   │  ├── home.json
│   │  └── navbar.json
│   ├── fr
│   │  ├── home.json
│   │  └── navbar.json
│   └── es
│      ├── home.json
│      └── navbar.json
└── src
    ├── middleware.ts
    ├── app
    │   ├── i18n
    │   │   └── server.ts
    │   └── [locale]
    │       └── home.tsx
    └── components
        └── Navbar
            └── index.tsx
```

  </TabItem>
  <TabItem label="intlayer" value="intlayer">

```bash
.
├── intlayer.config.ts
└── src
    ├── middleware.ts
    ├── app
    │   └── [locale]
    │       ├── layout.tsx
    │       └── home
    │           ├── index.tsx
    │           └── index.content.ts
    └── components
        └── Navbar
            ├── index.tsx
            └── index.content.ts
```

  </TabItem>
</Tab>

#### Porównanie

- **next-intl / next-i18next**: Centralizowane katalogi (JSON; przestrzenie nazw/wiadomości). Jasna struktura, dobrze integruje się z platformami tłumaczeniowymi, ale może prowadzić do większej liczby edycji między plikami w miarę rozwoju aplikacji.
- **Intlayer**: Słowniki `.content.{ts|js|json}` przypisane do komponentów i umieszczone razem z nimi. Ułatwia ponowne użycie komponentów i lokalne rozumowanie; dodaje pliki i opiera się na narzędziach działających podczas budowania.

#### Konfiguracja i ładowanie zawartości

Jak wspomniano wcześniej, musisz zoptymalizować sposób importowania każdego pliku JSON do swojego kodu.
Sposób, w jaki biblioteka obsługuje ładowanie zawartości, jest ważny.

<Tab defaultTab="next-intl" group='techno'>
  <TabItem label="next-i18next" value="next-i18next">

```ts fileName="i18n.config.ts"
export const locales = ["en", "fr"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const rtlLocales = ["ar", "he", "fa", "ur"] as const;
export const isRtl = (locale: string) =>
  (rtlLocales as readonly string[]).includes(locale);

// Funkcja zwracająca ścieżkę z uwzględnieniem lokalizacji
export function localizedPath(locale: string, path: string) {
  return locale === defaultLocale ? path : "/" + locale + path;
}

const ORIGIN = "https://example.com";
// Funkcja zwracająca absolutny URL z lokalizacją
export function abs(locale: string, path: string) {
  return ORIGIN + localizedPath(locale, path);
}
```

```ts fileName="src/app/i18n/server.ts"
import { createInstance } from "i18next";
import { initReactI18next } from "react-i18next/initReactI18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { defaultLocale } from "@/i18n.config";

// Ładowanie zasobów JSON z src/locales/<locale>/<namespace>.json
const backend = resourcesToBackend(
  (locale: string, namespace: string) =>
    import(`../../locales/${locale}/${namespace}.json`)
);

export async function initI18next(
  locale: string,
  namespaces: string[] = ["common"]
) {
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
}
```

```tsx fileName="src/components/I18nProvider.tsx"
"use client";

import * as React from "react";
import { I18nextProvider } from "react-i18next";
import { createInstance } from "i18next";
import { initReactI18next } from "react-i18next/initReactI18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { defaultLocale } from "@/i18n.config";

const backend = resourcesToBackend(
  (locale: string, namespace: string) =>
    import(`../../locales/${locale}/${namespace}.json`)
);

type Props = {
  locale: string;
  namespaces?: string[];
  resources?: Record<string, any>; // { ns: pakiet }
  children: React.ReactNode;
};

export default function I18nProvider({
  locale,
  namespaces = ["common"],
  resources,
  children,
}: Props) {
  const [i18n] = React.useState(() => {
    const i = createInstance();

    i.use(initReactI18next)
      .use(backend)
      .init({
        lng: locale,
        fallbackLng: defaultLocale,
        ns: namespaces,
        resources: resources ? { [locale]: resources } : undefined,
        defaultNS: "common",
        interpolation: { escapeValue: false },
        react: { useSuspense: false },
      });

    return i;
  });

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
```

```tsx fileName="src/app/[locale]/layout.tsx"
import type { ReactNode } from "react";
import { locales, defaultLocale, isRtl, type Locale } from "@/i18n.config";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  const locale: Locale = (locales as readonly string[]).includes(params.locale)
    ? (params.locale as any)
    : defaultLocale;

  const dir = isRtl(locale) ? "rtl" : "ltr";

  return (
    <html lang={locale} dir={dir}>
      <body>{children}</body>
    </html>
  );
}
```

```tsx fileName="src/app/[locale]/about.tsx"
import I18nProvider from "@/components/I18nProvider";
import { initI18next } from "@/app/i18n/server";
import type { Locale } from "@/i18n.config";
import ClientComponent from "@/components/ClientComponent";
import ServerComponent from "@/components/ServerComponent";

// Wymuś statyczne renderowanie strony
export const dynamic = "force-static";

export default async function AboutPage({
  params: { locale },
}: {
  params: { locale: Locale };
}) {
  const namespaces = ["common", "about"] as const;

  const i18n = await initI18next(locale, [...namespaces]);
  const tAbout = i18n.getFixedT(locale, "about");

  return (
    <I18nProvider locale={locale} namespaces={[...namespaces]}>
      <main>
        <h1>{tAbout("title")}</h1>

        <ClientComponent />
        <ServerComponent t={tAbout} locale={locale} count={0} />
      </main>
    </I18nProvider>
  );
}
```

  </TabItem>
   <TabItem label="next-intl" value="next-intl">

```tsx fileName="src/i18n.ts"
import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";

export const locales = ["en", "fr", "es"] as const;
export const defaultLocale = "en" as const;

async function loadMessages(locale: string) {
  // Załaduj tylko przestrzenie nazw potrzebne dla twojego layoutu/stron
  const [common, about] = await Promise.all([
    import(`../locales/${locale}/common.json`).then((m) => m.default),
    import(`../locales/${locale}/about.json`).then((m) => m.default),
  ]);

  return { common, about } as const;
}

export default getRequestConfig(async ({ locale }) => {
  if (!locales.includes(locale as any)) notFound();

  return {
    messages: await loadMessages(locale),
  };
});
```

```tsx fileName="src/app/[locale]/layout.tsx"
import type { ReactNode } from "react";
import { locales } from "@/i18n";
import {
  getLocaleDirection,
  unstable_setRequestLocale,
} from "next-intl/server";

export const dynamic = "force-static";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Ustaw aktywny język żądania dla tego renderowania po stronie serwera (RSC)
  unstable_setRequestLocale(locale);

  const dir = getLocaleDirection(locale);

  return (
    <html lang={locale} dir={dir}>
      <body>{children}</body>
    </html>
  );
}
```

```tsx fileName="src/app/[locale]/about/page.tsx"
import { getTranslations, getMessages, getFormatter } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import pick from "lodash/pick";
import ServerComponent from "@/components/ServerComponent";
import ClientComponentExample from "@/components/ClientComponentExample";

export const dynamic = "force-static";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Wiadomości są ładowane po stronie serwera. Przekaż tylko to, co jest potrzebne klientowi.
  const messages = await getMessages();
  const clientMessages = pick(messages, ["common", "about"]);

  // Tłumaczenia/formatowanie wyłącznie po stronie serwera
  const tAbout = await getTranslations("about");
  const tCounter = await getTranslations("about.counter");
  const format = await getFormatter();

  const initialFormattedCount = format.number(0);

  return (
    <NextIntlClientProvider locale={locale} messages={clientMessages}>
      <main>
        <h1>{tAbout("title")}</h1>
        <ClientComponentExample />
        <ServerComponent
          formattedCount={initialFormattedCount}
          label={tCounter("label")}
          increment={tCounter("increment")}
        />
      </main>
    </NextIntlClientProvider>
  );
}
```

  </TabItem>
  <TabItem label="intlayer" value="intlayer">

```tsx fileName="intlayer.config.ts"
import { type IntlayerConfig, Locales } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

```tsx fileName="src/app/[locale]/layout.tsx"
import { getHTMLTextDir } from "intlayer";
import {
  IntlayerClientProvider,
  generateStaticParams,
  type NextLayoutIntlayer,
} from "next-intlayer";

export const dynamic = "force-static";

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

export default LandingLayout;
```

```tsx fileName="src/app/[locale]/about/page.tsx"
import { PageContent } from "@components/PageContent";
import type { NextPageIntlayer } from "next-intlayer";
import { IntlayerServerProvider, useIntlayer } from "next-intlayer/server";
import { ClientComponent, ServerComponent } from "@components";

const LandingPage: NextPageIntlayer = async ({ params }) => {
  const { locale } = await params;
  const { title } = useIntlayer("about", locale);

  return (
    <IntlayerServerProvider locale={locale}>
      <main>
        <h1>{title}</h1>
        <ClientComponent />
        <ServerComponent />
      </main>
    </IntlayerServerProvider>
  );
};

export default LandingPage;
```

  </TabItem>
</Tab>

#### Porównanie

Wszystkie trzy wspierają ładowanie treści i providerów dla poszczególnych lokalizacji.

- W przypadku **next-intl/next-i18next** zazwyczaj ładujesz wybrane wiadomości/przestrzenie nazw na trasę i umieszczasz providery tam, gdzie są potrzebne.

- W przypadku **Intlayer** dodaje analizę w czasie budowania, aby wywnioskować użycie, co może zmniejszyć ręczne łączenie i pozwolić na pojedynczego providera na poziomie root.

Wybierz między kontrolą eksplicytną a automatyzacją w zależności od preferencji zespołu.

### Użycie w komponencie klienckim

Weźmy przykład komponentu klienckiego renderującego licznik.

<Tab defaultTab="next-intl" group='techno'>
  <TabItem label="next-i18next" value="next-i18next">

**Tłumaczenia (po jednym pliku JSON na namespace w `src/locales/...`)**

```json fileName="src/locales/en/about.json"
{
  "title": "About",
  "description": "About page description",
  "counter": {
    "label": "Counter",
    "increment": "Increment"
  }
}
```

```json fileName="src/locales/fr/about.json"
{
  "title": "À propos",
  "description": "Description de la page À propos",
  "counter": {
    "label": "Compteur",
    "increment": "Incrémenter"
  }
}
```

**Komponent kliencki (ładuje tylko wymagany namespace)**

```tsx fileName="src/components/ClientComponent.tsx"
"use client";

import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const ClientComponent = () => {
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

export default ClientComponent;
```

> Upewnij się, że strona/dostawca zawiera tylko potrzebne przestrzenie nazw (np. `about`).
> Jeśli używasz React < 19, zapamiętuj ciężkie formatery, takie jak `Intl.NumberFormat`.

  </TabItem>
  <TabItem label="next-intl" value="next-intl">

**Tłumaczenia (zachowano strukturę; załaduj je do wiadomości next-intl według własnego uznania)**

```json fileName="locales/en/about.json"
{
  "counter": {
    "label": "Counter",
    "increment": "Increment"
  }
}
```

```json fileName="locales/fr/about.json"
{
  "counter": {
    "label": "Compteur",
    "increment": "Incrémenter"
  }
}
```

**Komponent klienta**

```tsx fileName="src/components/ClientComponentExample.tsx"
"use client";

import React, { useState } from "react";
import { useTranslations, useFormatter } from "next-intl";

const ClientComponentExample = () => {
  // Bezpośredni zakres do zagnieżdżonego obiektu
  const t = useTranslations("about.counter");
  const format = useFormatter();
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>{format.number(count)}</p>
      <button
        aria-label={t("label")}
        onClick={() => setCount((count) => count + 1)}
      >
        {t("increment")}
      </button>
    </div>
  );
};
```

> Nie zapomnij dodać komunikatu "about" na stronie klienta

  </TabItem>
  <TabItem label="intlayer" value="intlayer">

**Zawartość**

```ts fileName="src/components/ClientComponentExample/index.content.ts"
import { t, type Dictionary } from "intlayer";

const counterContent = {
  key: "counter",
  content: {
    label: t({ pl: "Licznik", en: "Counter", fr: "Compteur" }),
    increment: t({ pl: "Zwiększ", en: "Increment", fr: "Incrémenter" }),
  },
} satisfies Dictionary;

export default counterContent;
```

**Komponent klienta**

```tsx fileName="src/components/ClientComponentExample/index.tsx"
"use client";

import React, { useState } from "react";
import { useNumber, useIntlayer } from "next-intlayer";

const ClientComponentExample = () => {
  const [count, setCount] = useState(0);
  const { label, increment } = useIntlayer("counter"); // zwraca stringi
  const { number } = useNumber();

  return (
    <div>
      <p>{number(count)}</p>
      <button aria-label={label} onClick={() => setCount((count) => count + 1)}>
        {increment}
      </button>
    </div>
  );
};
```

  </TabItem>
</Tab>

#### Porównanie

- **Formatowanie liczb**
  - **next-i18next**: brak `useNumber`; używa `Intl.NumberFormat` (lub i18next-icu).
  - **next-intl**: `useFormatter().number(value)`.
  - **Intlayer**: wbudowane `useNumber()`.

- **Klucze**
  - Zachowaj zagnieżdżoną strukturę (`about.counter.label`) i odpowiednio ustaw zakres hooka (`useTranslation("about")` + `t("counter.label")` lub `useTranslations("about.counter")` + `t("label")`).

- **Lokalizacje plików**
  - **next-i18next** oczekuje plików JSON w `public/locales/{lng}/{ns}.json`.
  - **next-intl** jest elastyczny; ładuj wiadomości według własnej konfiguracji.
  - **Intlayer** przechowuje zawartość w słownikach TS/JS i rozwiązuje je za pomocą klucza.

---

### Użycie w komponencie serwerowym

Weźmiemy pod uwagę przypadek komponentu UI. Ten komponent jest komponentem serwerowym i powinien mieć możliwość bycia wstawionym jako dziecko komponentu klienta. (strona (komponent serwerowy) -> komponent klienta -> komponent serwerowy). Ponieważ ten komponent może być wstawiony jako dziecko komponentu klienta, nie może być asynchroniczny.

<Tab defaultTab="next-intl" group='techno'>
  <TabItem label="next-i18next" value="next-i18next">

```tsx fileName="src/components/ServerComponent.tsx"
type ServerComponentProps = {
  t: (key: string) => string;
  locale: string;
  count: number;
};

const ServerComponent = ({ t, locale, count }: ServerComponentProps) => {
  const formatted = new Intl.NumberFormat(locale).format(count);

  return (
    <div>
      <p>{formatted}</p>
      <button aria-label={t("counter.label")}>{t("counter.increment")}</button>
    </div>
  );
};

export default ServerComponent;
```

  </TabItem>
  <TabItem label="next-intl" value="next-intl">

```tsx fileName="src/components/ServerComponent.tsx"
type ServerComponentProps = {
  t: (key: string) => string;
  locale: string;
  count: number;
  formatter: Intl.NumberFormat;
};

const ServerComponent = ({
  t,
  locale,
  count,
  formatter,
}: ServerComponentProps) => {
  const formatted = formatter.format(count);

  return (
    <div>
      <p>{formatted}</p>
      <button aria-label={t("counter.label")}>{t("counter.increment")}</button>
    </div>
  );
};

export default ServerComponent;
```

> Ponieważ komponent serwera nie może być asynchroniczny, musisz przekazać tłumaczenia i funkcję formatującą jako propsy.
>
> W twojej stronie / układzie:
>
> - `import { getTranslations, getFormatter } from "next-intl/server";`
> - `const t = await getTranslations("about.counter");`
> - `const formatter = await getFormatter().then((formatter) => formatter.number());`

  </TabItem>
  <TabItem label="intlayer" value="intlayer">

```tsx fileName="src/components/ServerComponent.tsx"
import { useIntlayer, useNumber } from "next-intlayer/server";

type ServerComponentProps = {
  count: number;
};

const ServerComponent = ({ count }: ServerComponentProps) => {
  const { label, increment } = useIntlayer("counter");
  const { number } = useNumber();

  return (
    <div>
      <p>{number(count)}</p>
      <button aria-label={label}>{increment}</button>
    </div>
  );
};
```

  </TabItem>
</Tab>

> Intlayer udostępnia **bezpieczne dla serwera** hooki za pośrednictwem `next-intlayer/server`. Aby działały, `useIntlayer` i `useNumber` używają składni podobnej do hooków klienta, ale pod spodem zależą od kontekstu serwera (`IntlayerServerProvider`).

### Metadane / Sitemap / Robots

Tłumaczenie treści jest świetne. Jednak ludzie często zapominają, że głównym celem internacjonalizacji jest uczynienie Twojej strony bardziej widoczną dla świata. I18n to niesamowita dźwignia do poprawy widoczności Twojej strony.

Oto lista dobrych praktyk dotyczących wielojęzycznego SEO.

- ustaw metatagi hreflang w tagu `<head>`
  > Pomaga to wyszukiwarkom zrozumieć, jakie języki są dostępne na stronie
- wymień wszystkie tłumaczenia stron w pliku sitemap.xml, używając schematu XML `http://www.w3.org/1999/xhtml`
  >
- nie zapomnij wykluczyć stron z prefiksami w pliku robots.txt (np. `/dashboard` oraz `/fr/dashboard`, `/es/dashboard`)
  >
- używaj niestandardowego komponentu Link, aby przekierować do najbardziej zlokalizowanej strony (np. po francusku `<a href="/fr/about">A propos</a>`)
  >

Programiści często zapominają o prawidłowym referencjonowaniu swoich stron w różnych lokalizacjach.

<Tab defaultTab="next-intl" group='techno'>
 
  <TabItem label="next-i18next" value="next-i18next">

```ts fileName="i18n.config.ts"
export const locales = ["en", "fr"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export function localizedPath(locale: string, path: string) {
  return locale === defaultLocale ? path : "/" + locale + path;
}

const ORIGIN = "https://example.com";
export function abs(locale: string, path: string) {
  return ORIGIN + localizedPath(locale, path);
}
```

```tsx fileName="src/app/[locale]/about/layout.tsx"
import type { Metadata } from "next";
import { locales, defaultLocale, localizedPath } from "@/i18n.config";

type GenerateMetadataParams = {
  params: Promise<{
    locale: string;
  }>;
};

export const generateMetadata = async ({
  params,
}: GenerateMetadataParams): Promise<Metadata> => {
  const { locale } = await params;

  // Importuj odpowiedni pakiet JSON z src/locales
  const messages = (await import("@/locales/" + locale + "/about.json"))
    .default;

  const languages = Object.fromEntries(
    locales.map((locale) => [locale, localizedPath(locale, "/about")])
  );

  return {
    title: messages.title,
    description: messages.description,
    alternates: {
      canonical: localizedPath(locale, "/about"),
      languages: { ...languages, "x-default": "/about" },
    },
  };
};

export default async function AboutPage() {
  return <h1>O nas</h1>;
}
```

```ts fileName="src/app/sitemap.ts"
import type { MetadataRoute } from "next";
import { locales, defaultLocale, abs } from "@/i18n.config";

export const sitemap = (): MetadataRoute.Sitemap => {
  const languages = Object.fromEntries(
    locales.map((locale) => [locale, abs(locale, "/about")])
  );
  return [
    {
      url: abs(defaultLocale, "/about"),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: { languages },
    },
  ];
};
```

```ts fileName="src/app/robots.ts"
import type { MetadataRoute } from "next";
import { locales, defaultLocale, localizedPath } from "@/i18n.config";

const ORIGIN = "https://example.com";

const expandAllLocales = (path: string) => [
  localizedPath(defaultLocale, path),
  ...locales
    .filter((locale) => locale !== defaultLocale)
    .map((locale) => localizedPath(locale, path)),
];

export const robots = (): MetadataRoute.Robots => {
  const disallow = [
    ...expandAllLocales("/dashboard"),
    ...expandAllLocales("/admin"),
  ];

  return {
    rules: { userAgent: "*", allow: ["/"], disallow },
    host: ORIGIN,
    sitemap: ORIGIN + "/sitemap.xml",
  };
};
```

  </TabItem>
  <TabItem label="next-intl" value="next-intl">

```tsx fileName="src/app/[locale]/about/layout.tsx"
import type { Metadata } from "next";
import { locales, defaultLocale } from "@/i18n";
import { getTranslations } from "next-intl/server";

const localizedPath = (locale: string, path: string) => {
  // Zwraca ścieżkę lokalizowaną, jeśli locale jest domyślne, zwraca oryginalną ścieżkę
  return locale === defaultLocale ? path : "/" + locale + path;
};

type GenerateMetadataParams = {
  params: Promise<{
    locale: string;
  }>;
};

export const generateMetadata = async ({
  params,
}: GenerateMetadataParams): Promise<Metadata> => {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });

  const url = "/about";
  const languages = Object.fromEntries(
    locales.map((locale) => [locale, localizedPath(locale, url)])
  );

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: localizedPath(locale, url),
      languages: { ...languages, "x-default": url },
    },
  };
};

// ... Reszta kodu strony
```

```tsx fileName="src/app/sitemap.ts"
import type { MetadataRoute } from "next";
import { locales, defaultLocale } from "@/i18n";

const origin = "https://example.com";

const formatterLocalizedPath = (locale: string, path: string) =>
  locale === defaultLocale ? origin + path : origin + "/" + locale + path;

export const sitemap = (): MetadataRoute.Sitemap => {
  const aboutLanguages = Object.fromEntries(
    locales.map((l) => [l, formatterLocalizedPath(l, "/about")])
  );

  return [
    {
      url: formatterLocalizedPath(defaultLocale, "/about"),
      lastModified: new Date(),
      changeFrequency: "monthly", // częstotliwość zmian: miesięcznie
      priority: 0.7, // priorytet strony
      alternates: { languages: aboutLanguages }, // alternatywne wersje językowe
    },
  ];
};
```

```tsx fileName="src/app/robots.ts"
import type { MetadataRoute } from "next";
import { locales, defaultLocale } from "@/i18n";

const origin = "https://example.com";
const withAllLocales = (path: string) => [
  path,
  ...locales
    .filter((locale) => locale !== defaultLocale)
    .map((locale) => "/" + locale + path),
];

export const robots = (): MetadataRoute.Robots => {
  const disallow = [
    ...withAllLocales("/dashboard"),
    ...withAllLocales("/admin"),
  ];

  return {
    rules: { userAgent: "*", allow: ["/"], disallow },
    host: origin,
    sitemap: origin + "/sitemap.xml",
  };
};
```

  </TabItem>
  <TabItem label="intlayer" value="intlayer">

```typescript fileName="src/app/[locale]/about/layout.tsx"
import { getIntlayer, getMultilingualUrls } from "intlayer";
import type { Metadata } from "next";
import type { LocalPromiseParams } from "next-intlayer";

export const generateMetadata = async ({
  params,
}: LocalPromiseParams): Promise<Metadata> => {
  const { locale } = await params;

  const metadata = getIntlayer("page-metadata", locale);

  const multilingualUrls = getMultilingualUrls("/about");

  return {
    ...metadata,
    alternates: {
      canonical: multilingualUrls[locale as keyof typeof multilingualUrls],
      languages: { ...multilingualUrls, "x-default": "/about" },
    },
  };
};

// ... Reszta kodu strony
```

```tsx fileName="src/app/sitemap.ts"
import { getMultilingualUrls } from "intlayer";
import type { MetadataRoute } from "next";

const sitemap = (): MetadataRoute.Sitemap => [
  {
    url: "https://example.com/about",
    alternates: {
      languages: { ...getMultilingualUrls("https://example.com/about") },
    },
  },
];
```

```tsx fileName="src/app/robots.ts"
import { getMultilingualUrls } from "intlayer";
import type { MetadataRoute } from "next";

const getAllMultilingualUrls = (urls: string[]) =>
  urls.flatMap((url) => Object.values(getMultilingualUrls(url)) as string[]);

const robots = (): MetadataRoute.Robots => ({
  rules: {
    userAgent: "*",
    allow: ["/"],
    disallow: getAllMultilingualUrls(["/dashboard"]),
  },
  host: "https://example.com",
  sitemap: "https://example.com/sitemap.xml",
});

export default robots;
```

  </TabItem>
</Tab>

> Intlayer dostarcza funkcję `getMultilingualUrls` do generowania wielojęzycznych adresów URL dla Twojej mapy witryny.

### Middleware do routingu lokalizacji

<Tab defaultTab="next-intl" group='techno'>
  <TabItem label="next-i18next" value="next-i18next">

Dodaj middleware do obsługi wykrywania lokalizacji i routingu:

```ts fileName="src/middleware.ts"
import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, locales } from "@/i18n.config";

const PUBLIC_FILE = /\.[^/]+$/; // wyklucz pliki z rozszerzeniami

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/static") ||
    PUBLIC_FILE.test(pathname)
  ) {
    return;
  }

  const hasLocale = locales.some(
    (l) => pathname === "/" + l || pathname.startsWith("/" + l + "/")
  );
  if (!hasLocale) {
    const locale = defaultLocale;
    const url = request.nextUrl.clone();
    url.pathname = "/" + locale + (pathname === "/" ? "" : pathname);
    return NextResponse.redirect(url);
  }
}

export const config = {
  matcher: [
    // Dopasuj wszystkie ścieżki z wyjątkiem tych zaczynających się od podanych oraz plików z rozszerzeniem
    "/((?!api|_next|static|.*\\..*).*)",
  ],
};
```

  </TabItem>
  <TabItem label="next-intl" value="next-intl">

Dodaj middleware do obsługi wykrywania i routingu lokalizacji:

```ts fileName="src/middleware.ts"
import createMiddleware from "next-intl/middleware";
import { locales, defaultLocale } from "@/i18n";

export default createMiddleware({
  locales: [...locales],
  defaultLocale,
  localeDetection: true,
});

export const config = {
  // Pomijaj API, wewnętrzne elementy Next oraz zasoby statyczne
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
```

  </TabItem>
  <TabItem label="intlayer" value="intlayer">

Intlayer zapewnia wbudowane zarządzanie middleware za pomocą konfiguracji pakietu `next-intlayer`.

```ts fileName="src/middleware.ts"
import { intlayerMiddleware } from "next-intlayer/middleware";

export const middleware = intlayerMiddleware();

// stosuje ten middleware tylko do plików w katalogu app
export const config = {
  matcher: "/((?!api|_next|static|.*\\..*).*)",
};
```

Konfiguracja middleware jest scentralizowana w pliku `intlayer.config.ts`.

  </TabItem>
</Tab>

### Lista kontrolna konfiguracji i dobre praktyki

<Tab defaultTab="next-intl" group='techno'>
  <TabItem label="next-i18next" value="next-i18next">

- Upewnij się, że `lang` i `dir` są ustawione na głównym elemencie `<html>` w `src/app/[locale]/layout.tsx`.
- Podziel tłumaczenia na przestrzenie nazw (na przykład `common.json`, `about.json`) w katalogu `src/locales/<locale>/`.
- Ładuj tylko wymagane przestrzenie nazw w komponentach klienckich, używając `useTranslation('<ns>')` oraz ograniczając `I18nProvider` do tych samych przestrzeni nazw.
- Utrzymuj strony statyczne, gdy to możliwe: eksportuj `export const dynamic = 'force-static'` na stronach; ustaw `dynamicParams = false` i zaimplementuj `generateStaticParams`.
- Używaj synchronicznych komponentów serwerowych zagnieżdżonych pod granicami klienta, przekazując już obliczone ciągi znaków lub funkcję `t` oraz `locale`.
- Dla SEO ustaw `alternates.languages` w metadanych, wymień lokalizowane adresy URL w `sitemap.ts` i zabroń duplikowania lokalizowanych tras w `robots.ts`.
- Preferuj formatery uwzględniające lokalizację (np. `Intl.NumberFormat(locale)`) i zapamiętuj je po stronie klienta, jeśli używasz React < 19.

  </TabItem>
  <TabItem label="next-intl" value="next-intl">

- **Ustaw atrybuty html `lang` i `dir`**: W pliku `src/app/[locale]/layout.tsx` oblicz `dir` za pomocą `getLocaleDirection(locale)` i ustaw `<html lang={locale} dir={dir}>`.
- **Podziel wiadomości na przestrzenie nazw**: Organizuj pliki JSON według lokalizacji i przestrzeni nazw (np. `common.json`, `about.json`).
- **Minimalizuj obciążenie klienta**: Na stronach wysyłaj do `NextIntlClientProvider` tylko wymagane przestrzenie nazw (np. `pick(messages, ['common', 'about'])`).
- **Preferuj strony statyczne**: Eksportuj `export const dynamic = 'force-static'` i generuj statyczne parametry dla wszystkich `locales`.
- **Synchroniczne komponenty serwerowe**: Utrzymuj komponenty serwerowe synchroniczne, przekazując wcześniej obliczone ciągi znaków (przetłumaczone etykiety, sformatowane liczby) zamiast wywołań asynchronicznych lub funkcji nieserializowalnych.

  </TabItem>
  <TabItem label="intlayer" value="intlayer">

- **Modularna zawartość**: Umieszczaj słowniki zawartości razem z komponentami, korzystając z plików `.content.{ts|js|json}`.
- **Bezpieczeństwo typów**: Wykorzystaj integrację z TypeScript do walidacji zawartości na etapie kompilacji.
- **Optymalizacja w czasie budowania**: Używaj narzędzi Intlayer do automatycznego tree-shakingu i optymalizacji pakietu.
- **Zintegrowane narzędzia**: Wykorzystaj wbudowane routowanie, pomocników SEO oraz wsparcie edytora wizualnego.

  </TabItem>
</Tab>

---

## A zwycięzca to…

To nie jest proste. Każda opcja ma swoje kompromisy. Oto jak to widzę:

<Columns>
  <Column>

**next-i18next**

- dojrzały, pełen funkcji, wiele wtyczek społecznościowych, ale wyższy koszt konfiguracji. Jeśli potrzebujesz **ekosystemu wtyczek i18next** (np. zaawansowane reguły ICU przez wtyczki) i Twój zespół już zna i18next, akceptując **więcej konfiguracji** dla elastyczności.

  </Column>
  <Column>

**next-intl**

- najprostszy, lekki, mniej narzuconych decyzji. Jeśli chcesz **minimalne** rozwiązanie, czujesz się komfortowo z centralizowanymi katalogami, a Twoja aplikacja jest **mała do średniej wielkości**.

  </Column>
  <Column>

**Intlayer**

- zbudowany dla nowoczesnego Next.js, z modularną zawartością, bezpieczeństwem typów, narzędziami i mniejszą ilością boilerplate. Jeśli cenisz sobie **zawartość ograniczoną do komponentu**, **ścisły TypeScript**, **gwarancje w czasie kompilacji**, **tree-shaking** oraz **wbudowane** narzędzia do routingu/SEO/edytora – szczególnie dla **Next.js App Router**, systemów projektowych i **dużych, modularnych baz kodu**.

  </Column>
</Columns>

Jeśli wolisz minimalną konfigurację i akceptujesz trochę ręcznego łączenia, next-intl jest dobrym wyborem. Jeśli potrzebujesz wszystkich funkcji i nie przeszkadza Ci złożoność, next-i18next sprawdzi się. Ale jeśli chcesz nowoczesne, skalowalne, modularne rozwiązanie z wbudowanymi narzędziami, Intlayer ma na celu dostarczyć to od razu po wyjęciu z pudełka.

> **Alternatywa dla zespołów korporacyjnych**: Jeśli potrzebujesz sprawdzonego rozwiązania, które działa doskonale z uznanymi platformami lokalizacyjnymi, takimi jak **Crowdin**, **Phrase** lub innymi profesjonalnymi systemami zarządzania tłumaczeniami, rozważ **next-intl** lub **next-i18next** ze względu na ich dojrzały ekosystem i sprawdzone integracje.

> **Przyszła mapa drogowa**: Intlayer planuje również rozwijać wtyczki działające na bazie rozwiązań **i18next** i **next-intl**. Dzięki temu zyskasz zalety Intlayer w zakresie automatyzacji, składni i zarządzania treścią, zachowując jednocześnie bezpieczeństwo i stabilność zapewnianą przez te sprawdzone rozwiązania w kodzie aplikacji.

## Gwiazdki GitHub (GitHub STARs)

Gwiazdy na GitHubie są silnym wskaźnikiem popularności projektu, zaufania społeczności oraz jego długoterminowej istotności. Choć nie są bezpośrednią miarą jakości technicznej, odzwierciedlają, ilu deweloperów uważa projekt za przydatny, śledzi jego rozwój i prawdopodobnie zdecyduje się go używać. Przy szacowaniu wartości projektu, gwiazdy pomagają porównać zainteresowanie różnymi alternatywami oraz dostarczają wglądu w rozwój ekosystemu.

[![Wykres historii gwiazd](https://api.star-history.com/svg?repos=i18next/next-i18next&repos=amannn/next-intl&repos=aymericzip/intlayer&type=Date)](https://www.star-history.com/#i18next/next-i18next&amannn/next-intl&aymericzip/intlayer)

---

## Podsumowanie

Wszystkie trzy biblioteki odnoszą sukces w podstawowej lokalizacji. Różnica polega na tym, **ile pracy musisz włożyć**, aby osiągnąć solidną, skalowalną konfigurację w **nowoczesnym Next.js**:

- W przypadku **Intlayer** **modularna zawartość**, **ścisły TS**, **bezpieczeństwo w czasie kompilacji**, **tree-shaken bundles** oraz **pierwszorzędny App Router i narzędzia SEO** są **domyślne**, a nie obowiązkowe.
- Jeśli Twój zespół ceni **łatwość utrzymania i szybkość** w aplikacji wielojęzycznej, opartej na komponentach, Intlayer oferuje dziś **najpełniejsze** doświadczenie.

Zapoznaj się z dokumentem ['Dlaczego Intlayer?'](https://intlayer.org/doc/why) po więcej szczegółów.
