---
createdAt: 2026-09-13
updatedAt: 2026-09-13
title: "Lingui vs @intlayer/lingui: Te same makra, inny runtime"
description: "Co się zmienia, gdy aplikacja React zachowuje swoje makra Lingui, ale serwuje je przez adapter kompatybilności @intlayer/lingui. Rozmiar komponentów, hydratacja, wycieki i ilość JavaScriptu na stronę zmierzone na tym samym kodzie TanStack Start, w tym obszary, w których adapter ustępuje."
keywords:
  - Lingui
  - "@intlayer/lingui"
  - Intlayer
  - Adapter kompatybilności
  - Migracja
  - Internacjonalizacja
  - i18n
  - Benchmark
  - Rozmiar paczki
  - Blog
  - React
  - TanStack Start
  - Vite
slugs:
  - blog
  - lingui-vs-intlayer-lingui
author: aymericzip
---

# Lingui VS @intlayer/lingui | Te same makra, inny runtime

`@intlayer/lingui` to adapter kompatybilności (compat adapter) dla bibliotek `@lingui/core` i `@lingui/react`. Twoje wywołania `` t`...` ``, `<Trans>`, `useLingui()` oraz `i18n._()` pozostają dokładnie takie same; makra nadal kompilują się bez zmian; to, co ulega zmianie, to źródło pochodzenia wiadomości w czasie wykonywania (runtime). Zamiast jednego skompilowanego katalogu przypadającego na język, każde miejsce wywołania zostaje powiązane ze słownikiem Intlayer skompilowanym specjalnie dla niego.

Niniejszy artykuł mierzy tę zamianę na tej samej aplikacji TanStack Start, zbudowanej raz z czystym Lingui, a raz z adapterem. Dane liczbowe pochodzą z repozytorium [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom). Bezpośrednie porównanie obu bibliotek znajdziesz w artykule [Lingui vs Intlayer](https://intlayer.org/pl/blog/lingui-vs-intlayer). Ten wpis skupia się na tym, co zmienia adapter i w jakich kwestiach nie przynosi on korzyści.

<TOC/>

> **W skrócie (tl;dr)**: Na tej samej aplikacji TanStack Start `@intlayer/lingui` zmniejszył średni rozmiar komponentu z **85,5 KB do 12,8 KB** gzip, czas hydratacji z **28 ms do 19,7 ms**, a przełączanie języka z **5,9 ms do 2,9 ms**, bez modyfikacji makr. W podstawowej konfiguracji (wszystkie katalogi ładowane na starcie) wyeliminował także **90% wycieku stron** i zaoszczędził 12 KB na stronę. Jednak w konfiguracji z leniwym ładowaniem (lazy loading) przesyła **137 KB na stronę w porównaniu do 115 KB** dla czystego Lingui: adapter interpretuje składnię ICU w czasie wykonywania, podczas gdy Lingui dostarcza wstępnie skompilowane tablice tokenów. Wyciek języka źródłowego (~9-10%) jest identyczny po obu stronach, ponieważ wynika z zapasowego tekstu `message` osadzonego w komponentach, a nie z samego runtime'u. Adapter jest wtyczką do Vite; pomiary przeprowadzono na TanStack Start.

## Czym jest `@intlayer/lingui`

Lingui składa się z kompilatora i środowiska wykonawczego. Makra w kodzie źródłowym są ekstrahowane do katalogu `.po` (lub JSON) dla każdego języka, kompilowane do modułu JS dla danego języka i ładowane do globalnej instancji `I18n` za pomocą `i18n.load()` + `i18n.activate()`. Każde wywołanie `useLingui()` subskrybuje tę instancję; każde wywołanie `_()` odpytuje aktywny katalog o identyfikator.

`@intlayer/lingui` zachowuje makra oraz interfejs API, zastępując mechanizm przeszukiwania katalogów:

1. **Aliasy importów.** Wtyczka `lingui()` z pakietu `@intlayer/lingui/plugin` opakowuje `vite-intlayer` i dodaje wpisy `resolve.alias`, dzięki czemu `@lingui/core` i `@lingui/react` kierują do `@intlayer/lingui`. Twoje importy pozostają nienaruszone.
2. **Katalogi jako jedyne źródło prawdy.** Wtyczka `syncJSON` (lub `syncPO` dla plików `.po`) odczytuje istniejące katalogi i przekształca je w słowniki Intlayer, zapisując tłumaczenia z powrotem w plikach, gdy aktualizacji dokonuje CLI lub CMS. Dzięki opcji `splitKeys: "key-prefix"` płaski katalog z identyfikatorami oddzielonymi kropkami (`footer.github`, `hero.title`) staje się zbiorem małych słowników podzielonych według prefiksów, zamiast jednego pliku o wielkości 244 KB.
3. **Wiązanie w miejscu wywołania.** Krok optymalizacyjny Intlayer zbiera identyfikatory przekazywane do `_`, `t` oraz `<Trans>` w każdym pliku i przekazuje komponentowi wyłącznie pasujące słowniki. `<Trans id="hero.title">` wiąże się autonomicznie; `useLingui()` wiąże się ze wszystkimi prefiksami użytymi w pliku. Identyfikatory pozbawione kropek (identyfikatory hashowane, `mockBanner`) odwołują się do pojedynczego słownika awaryjnego `messages` Lingui.

```tsx fileName="src/components/Hero.tsx"
// Twój kod, bez żadnych zmian
import { useLingui } from "@lingui/react";
import { Trans } from "@lingui/react/macro";

const Hero = () => {
  const { _ } = useLingui();
  return (
    <section>
      <h1>{_({ id: "hero.title", message: "Measure what you ship" })}</h1>
      <Trans id="hero.subtitle">Every byte counts</Trans>
    </section>
  );
};
```

```tsx fileName="Co generuje kompilator (uproszczone)"
import _dicHash_hero from "../.intlayer/dictionaries/hero.mjs";
import {
  useDictionary as useLingui,
  TransDictionary as Trans,
} from "@intlayer/lingui";

const Hero = () => {
  const { _ } = useLingui(_dicHash_hero);
  return (
    <section>
      <h1>{_({ id: "hero.title", message: "Measure what you ship" })}</h1>
      <Trans id="hero.subtitle" dictionary={_dicHash_hero}>
        Every byte counts
      </Trans>
    </section>
  );
};
```

Komponent nie łączy się już z globalną instancją i monolitycznym katalogiem w tle. Korzysta jedynie ze słownika `hero`. To właśnie z tego powodu kolumna rozmiaru komponentów spada w poniższej tabeli aż 7-krotnie.

## Co adapter zachowuje, ignoruje i czego nie zastępuje

| API Lingui                                               | Z `@intlayer/lingui`                                                                                          |
| -------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| Makra `` t`...` ``, `msg`, `plural`, `select`, `<Trans>` | ✅ Zachowane. Pozostaw `@lingui/babel-plugin-lingui-macro` lub `@lingui/swc-plugin` przed fazą Intlayer       |
| `useLingui()` → `{ i18n, _, t }`                         | ✅ Zachowane. Działa także poza providerem (język pobierany z `react-intlayer`)                               |
| `i18n._(id, values)`, `i18n.t()`                         | ✅ Zachowane. Obsługuje identyfikatory jawne i hashowane                                                      |
| Liczba mnoga ICU, `select`, `selectordinal`, `#`         | ✅ Zachowane, obsługiwane przez parser ICU w Intlayer                                                         |
| `i18n.date()`, `i18n.number()`, `formats`                | ✅ Zachowane, oparte na natywnym `Intl`                                                                       |
| `I18nProvider`                                           | ✅ Zachowane. Opakowuje `IntlayerProvider`; nasłuchuje `i18n.on("change")`, aby `activate()` odświeżał widok  |
| `i18n.activate(locale)`                                  | ✅ Zachowane                                                                                                  |
| `i18n.load(locale, messages)` / `loadAndActivate()`      | ⚠️ Akceptowane jako **fallback w runtime**. Słowniki kompilowane mają pierwszeństwo; ostrzeżenie w trybie dev |
| `setupI18n({ messages, missing })`                       | ⚠️ `messages` scalane jako fallback; parametr `missing` jest ignorowany                                       |
| `lingui extract` / `lingui compile`                      | ✅ Twój tradycyjny workflow pozostaje bez zmian. Skieruj `syncPO` / `syncJSON` na wyodrębnione katalogi       |
| `defaultComponent` w `I18nProvider`                      | ⚠️ Przechowywany w kontekście, nie jest stosowany podczas renderowania                                        |
| Next.js                                                  | ❌ Wtyczka opakowuje `vite-intlayer`. Działa tylko z Vite, TanStack Start i React Router                      |

## Porównanie wydajności (Benchmark)

### Co zostało zmierzone

Zestaw testowy [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom) buduje **tę samą aplikację** w każdej konfiguracji: **10 stron** (home, about, blog, careers, contact, FAQ, pricing, products, settings, team), **10 języków** (`en`, `fr`, `es`, `de`, `it`, `pt`, `zh`, `ja`, `ko`, `ru`), identyczne komponenty i identyczną zawartość. Pomiary przeprowadzono na stronach `en` i `fr`.

Lingui przetestowano w czterech strategiach ładowania: od statycznego importu wszystkich katalogów na starcie (`static`) po leniwe ładowanie katalogu dla każdej trasy (`scoped-dynamic`). Adapter przetestowano na **tych samych komponentach**, zmieniając wyłącznie pliki `vite.config.ts` i `intlayer.config.ts`. Wiersz `static` zawiera wszystkie języki; wiersz `dynamic` (`importMode: 'dynamic'`) ładuje aktywny język na żądanie. Wariant "scoped" nie występuje, gdyż faza optymalizacji automatycznie tworzy zakresy na poziomie miejsc wywołań.

Dla każdego wariantu rejestrowane są następujące wskaźniki:

- **Lib size**: rozmiar gzip pustego komponentu importującego wyłącznie bibliotekę i18n.
- **Page JS**: średnia waga gzip kodu JavaScript pobieranego na stronę dla wszystkich podstron i języków.
- **Locale leak %**: odsetek przetłumaczonych ciągów znaków w pobranym JS należących do języków, których użytkownik **nie** przegląda.
- **Page leak %**: odsetek przetłumaczonych ciągów znaków w pobranym JS należących do podstron, na których użytkownik **nie** przebywa.
- **Component avg**: średni rozmiar gzip każdego komponentu kompilowanego w izolacji.
- **E2E reactivity**: rzeczywisty czas pomiędzy wyborem nowego języka a aktualizacją atrybutu `html[lang]` w drzewie DOM (Playwright, 5 powtórzeń).
- **Hydration**: czas trwania fazy hydratacji Reacta.

> Poniższe wyniki pochodzą z testu przeprowadzonego **2026-09-12** z użyciem bibliotek `@lingui/react` 6.6.0 oraz `@intlayer/lingui` 9.5.1. Aplikacja testowa jest celowo niewielka (kilkadziesiąt ciągów znaków na język), więc wskaźniki wycieków opisują **wzorzec strukturalny**: rosną one wraz z rozrostem treści, podczas gdy stały narzut runtime pozostaje niezmienny.

### Wyniki na TanStack Start

| Konfiguracja           | Strategia      | Rozmiar lib (gz) | Śr. JS strony (gz) | Wyciek języka | Wyciek stron | Śr. komponent (gz) | Reaktywność E2E |  Hydratacja |
| ---------------------- | -------------- | ---------------: | -----------------: | ------------: | -----------: | -----------------: | --------------: | ----------: |
| **baza** (bez i18n)    | -              |           0,0 KB |           111,0 KB |          0,0% |         0,0% |             0,7 KB |          8,1 ms |     21,6 ms |
| Lingui                 | static         |          11,2 KB |           152,2 KB |         50,0% |        90,0% |            58,0 KB |          3,9 ms |     19,9 ms |
| Lingui                 | dynamic        |          11,2 KB |       **115,2 KB** |          9,3% |         0,0% |            85,5 KB |          5,9 ms |     28,0 ms |
| Lingui                 | scoped-static  |          11,2 KB |           120,8 KB |          4,0% |         0,0% |           147,9 KB |          7,1 ms |     33,9 ms |
| Lingui                 | scoped-dynamic |          11,2 KB |           120,2 KB |          8,6% |         0,0% |            83,7 KB |         42,1 ms |     32,9 ms |
| **`@intlayer/lingui`** | static         |      **10,3 KB** |           140,5 KB |         50,0% |     **0,0%** |        **14,9 KB** |      **3,3 ms** | **11,3 ms** |
| **`@intlayer/lingui`** | dynamic        |      **10,3 KB** |           137,0 KB |          9,9% |     **0,0%** |        **12,8 KB** |      **2,9 ms** | **19,7 ms** |
| `intlayer` (natywny)   | static         |           5,0 KB |           125,8 KB |         50,0% |         0,0% |             8,1 KB |          3,2 ms |     11,5 ms |
| `intlayer` (natywny)   | dynamic        |           5,0 KB |           118,6 KB |          0,0% |         0,0% |             6,3 KB |          3,6 ms |     14,1 ms |

**Interpretacja danych**

- **Komponenty: 7 razy mniejsze.** To kluczowa zmiana wprowadzana przez adapter. Komponent Lingui kompilowany w izolacji waży średnio **od 58 do 148 KB** w zależności od przyjętej strategii, ponieważ `useLingui()` odwołuje się do globalnej instancji i wszystkich załadowanych katalogów. Ten sam komponent z adapterem waży zaledwie **12,8-14,9 KB**: łączy się tylko ze swoimi słownikami i parserem ICU.
- **Hydratacja: o 8-14 ms szybsza.** `i18n.load()` + `i18n.activate()` wykonują się po stronie klienta zanim React rozpocznie proces hydratacji. Im bardziej leniwe ładowanie w Lingui, tym dłużej trwa ten proces (28-34 ms). W adapterze słowniki docierają jako zwykłe importy, które bundler umieścił w paczce danej strony: **11,3 ms** w trybie `static`, **19,7 ms** w trybie `dynamic`.
- **Przełączanie języka: 2x szybsze i bez opóźnień.** Zoptymalizowana konfiguracja `scoped-dynamic` w Lingui potrzebuje **42 ms** na aktualizację znacznika `html[lang]`, ponieważ katalog trasy musi zostać pobrany, załadowany i aktywowany. Adapter utrzymuje stałe **2,9-3,3 ms** w obu trybach.
- **Podstawowa konfiguracja zostaje automatycznie naprawiona.** Statyczny Lingui przesyła wszystkie katalogi na każdej podstronie: 152,2 KB i 90% wycieku stron. Statyczny adapter: 140,5 KB, 0% wycieku stron, przy dokładnie tych samych komponentach.
- **Waga strony: Lingui wygrywa w trybie `dynamic` o 22 KB.** Należy o tym pamiętać przy analizie kosztów. Lingui na etapie budowania kompiluje wiadomości do tablic tokenów i dołącza jedynie lekki 11-kilobajtowy runtime, który je przetwarza. Adapter dostarcza parser ICU biblioteki Intlayer (około 15 KB więcej kodu `@intlayer/core` niż w kompilacji natywnej), warstwę adaptera (~10 KB) oraz `react-intlayer` (~6 KB). W tej aplikacji oznacza to **137,0 KB w porównaniu do 115,2 KB**. Jeśli jedynym kryterium są minimalne bajty na stronę i masz już skonfigurowane leniwe ładowanie Lingui, adapter nie obniży tej wartości.
- **Wyciek języka źródłowego jest niemal identyczny.** 9,3% dla Lingui i 9,9% dla adaptera w trybie `dynamic`. Wynika to bezpośrednio z kodu komponentów: wywołanie `i18n._({ id: "careers-benefits.pay", message: "Top-of-market compensation" })` zawiera zapasowy tekst angielski, podobnie jak wynik makr, o ile pole message nie zostanie usunięte. Ten angielski tekst trafia do paczki `fr` bez względu na środowisko wykonawcze. Natywny Intlayer (`.content.ts`, bez wbudowanego w kod tekstu) osiąga równe 0%.

## Skąd wynikają te różnice i dlaczego jeden parametr pozostaje stały

Dwa czynniki determinują powyższe wyniki: **z czym powiązany jest komponent** oraz **w jakim formacie przesyłane są wiadomości**.

**Wiązanie.** W Lingui podstawową jednostką podziału jest cały język. Plik `messages.mjs` dla języka `fr` stanowi jeden moduł; każdy komponent importujący instancję ma dostęp do pełnej zawartości, uniemożliwiając bundlerowi podział na mniejsze fragmenty. W adapterze jednostką podziału staje się miejsce wywołania: sekcje `hero` i `footer` to osobne importy dzielone i ładowane na żądanie dla każdego komponentu. Stąd biorą się zyski w wadze komponentów, hydratacji i eliminacji wycieków stron.

```bash
.
├── lingui.config.ts
└── src
    ├── i18n.ts                          # setupI18n(), load(), activate()
    ├── locales
    │   ├── en/messages.mjs              # wynik lingui compile, jeden na język
    │   └── fr/messages.mjs
    └── components
        └── Hero.tsx                     # useLingui(); _("hero.title")
```

```bash
.
├── intlayer.config.ts                   # syncJSON({ splitKeys: "key-prefix" })
├── .intlayer/                           # wygenerowane: słownik na prefiks id dla każdego języka
└── src
    ├── locales
    │   ├── en/messages.json             # bez zmian, wciąż jedyne źródło prawdy
    │   └── fr/messages.json
    └── components
        └── Hero.tsx                     # useLingui(); _("hero.title")  ← bez zmian
```

**Format.** Krok kompilacji w Lingui przekształca `{count, plural, one {# item} other {# items}}` w tablicę tokenów; środowisko wykonawcze nie musi analizować składni ICU. Adapter zachowuje wiadomość jako tekst i analizuje ją za pomocą parsera ICU w Intlayer. Daje to stały narzut rzędu 15 KB płacony raz na stronę, z powodu którego wiersz `dynamic` ustępuje pod względem surowych bajtów, wygrywając we wszystkich pozostałych aspektach. Natywny Intlayer unika tego narzutu, ponieważ słowniki `.content.ts` korzystają z węzłów `enu()` / `insert()` rozwiązywanych z wyprzedzeniem przez kompilator.

## Migracja w trzech krokach

<Steps>
<Step number={1} title="Instalacja">

```bash packageManager="npm"
npx intlayer init --interactive
```

```bash packageManager="pnpm"
pnpm dlx intlayer init --interactive
```

```bash packageManager="yarn"
yarn dlx intlayer init --interactive
```

```bash packageManager="bun"
bunx intlayer init --interactive
```

Polecenie wykrywa Lingui, analizuje plik `lingui.config.ts` w celu wybrania `syncPO` (katalogi `.po`) lub `syncJSON` (katalogi JSON), instaluje pakiety `intlayer`, `react-intlayer`, `@intlayer/lingui` oraz odpowiednią wtyczkę synchronizującą, a także podmienia wtyczkę `@lingui/vite-plugin` na wtyczkę adaptera w pliku `vite.config.ts`. Pakiety `@lingui/core`, `@lingui/react` i wtyczkę makr należy zachować: makra nadal się kompilują, a adapter korzysta z typów Lingui.

</Step>
<Step number={2} title="Powiązanie Intlayer z katalogami">

Dla katalogów JSON (gdy `format: "minimal"` w `lingui.config.ts`):

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  dictionary: {
    importMode: "dynamic",
    format: "icu",
  },
  plugins: [
    syncJSON({
      format: "icu",
      source: ({ locale, key }) => `./src/locales/${locale}/${key}.json`,
      // Grupowanie identyfikatorów po pierwszym segmencie: `footer.github` → słownik `footer`
      splitKeys: "key-prefix",
    }),
  ],
};

export default config;
```

Dla katalogów `.po` zastąp `syncJSON` wtyczką `syncPO` z pakietu `@intlayer/sync-po-plugin` z tym samym wzorcem `source` i rozszerzeniem `.po`. Szczegóły znajdziesz w [dokumentacji wtyczki Sync PO](https://intlayer.org/pl/doc/plugin/sync-po).

Parametr `splitKeys: "key-prefix"` stanowi klucz do drastycznego zmniejszenia wagi komponentów. Sam plik katalogu zachowuje swoją płaską strukturę; podział istnieje tylko w generowanych słownikach, a mechanizm zapisu zwrotnego automatycznie scala klucze.

</Step>
<Step number={3} title="Dodanie wtyczki">

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { lingui } from "@intlayer/lingui/plugin";

export default defineConfig({
  plugins: [
    tanstackStart(),
    viteReact({
      // Zachowaj wtyczkę makr; musi działać przed optymalizacją Intlayer
      babel: { plugins: ["@lingui/babel-plugin-lingui-macro"] },
    }),
    lingui(),
  ],
});
```

Wtyczka `lingui()` integruje `vite-intlayer` (obserwacja zawartości, kompilacja słowników, faza optymalizacji) oraz tworzy aliasy przekierowujące `@lingui/core` i `@lingui/react` do adaptera. Po zbudowaniu aplikacji zyskujesz pełen zakres wyżej opisanych korzyści.

</Step>
</Steps>

### Co możesz usunąć po migracji

| Plik / wzorzec                                       | Powód                                                                                      |
| ---------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| `await import(\`./locales/${locale}/messages.mjs\`)` | Słowniki są importowane bezpośrednio przez komponenty. `i18n.load()` staje się fallbackiem |
| `i18n.load()` / `i18n.loadAndActivate()`             | Zachowaj `i18n.activate(locale)`; usuń ręczne ładowanie katalogów                          |
| `lingui compile` w skryptach budowania               | Tylko wtedy, gdy pliki JSON lub `.po` są źródłem i nie importujesz skompilowanych modułów  |

### Korzyści wykraczające poza oszczędność bajtów

- **Wykrywanie brakujących tłumaczeń.** Polecenie `npx intlayer test` zatrzymuje potok CI, jeśli w danym języku brakuje klucza; `lingui extract` generuje tylko podsumowania statystyczne.
- **Automatyczne uzupełnianie przez `npx intlayer fill`.** Tłumaczy brakujące wpisy z wykorzystaniem wybranego modelu sztucznej inteligencji (OpenAI, Anthropic, Mistral, Gemini...) i zapisuje je bezpośrednio w katalogach.
- **Edytor Wizualny i CMS.** Działają w oparciu o te same słowniki, pozwalając osobom nietechnicznym na wygodną edycję plików `.po` i JSON z poziomu interfejsu graficznego.
- **Stopniowe przejście na `.content.ts`.** Pojedynczy komponent można w dowolnym momencie przepisać z `useLingui()` na `useIntlayer("hero")` z lokalnym plikiem zawartości. Oba typy słowników bez problemu koegzystują.

## Ograniczenia, o których warto wiedzieć przed startem

- **Narzut na stronę w trybie `dynamic`.** Jak opisano wcześniej: należy liczyć się z narzutem rzędu +20 KB na stronę w małej aplikacji w porównaniu do leniwie ładowanego Lingui. Różnica ta nie rośnie wraz z objętością treści (wynika z parsera, nie z katalogów), ale też nie maleje.
- **Utrzymujący się wyciek języka źródłowego.** Deskryptory wiadomości i makra kompilują angielski tekst jako wartość zapasową. Całkowite wyeliminowanie tego zjawiska wymaga oczyszczenia pola `message` lub migracji komponentu na `.content.ts`.
- **`i18n.load()` jest jedynie rozwiązaniem awaryjnym.** Jeżeli nadal importujesz skompilowane katalogi i wywołujesz `load()`, załadujesz równocześnie stary i nowy pakiet. Usuń te importy.
- **Tylko dla ekosystemu Vite.** Brak wtyczki Next.js w ramach `@intlayer/lingui`. Projekty Next.js oparte na Lingui powinny skierować się bezpośrednio ku [`next-intlayer`](https://intlayer.org/pl/doc/environment/nextjs).
- **Brak obsługi `defaultComponent`.** Jeśli polegasz na automatycznym opakowywaniu każdego `<Trans>`, dodaj kontener bezpośrednio w kodzie komponentów.

## Kiedy wybrać które rozwiązanie?

- **Pozostań przy Lingui**, jeśli wdrożyłeś architekturę `scoped-dynamic`, Twoim jedynym priorytetem jest najmniejsza waga strony w kilobajtach, a czas przełączania języka na poziomie 42 ms oraz 30 ms hydratacji są w pełni akceptowalne.
- **Wybierz `@intlayer/lingui`**, jeśli używasz Lingui i chcesz uzyskać lżejsze komponenty, szybszą hydratację i płynną zmianę języka, 0% wycieku stron w prostej konfiguracji, typowane identyfikatory, testy w CI oraz uzupełnianie tłumaczeń przez AI, bez konieczności modyfikacji makr. To świetny most modernizacyjny dla istniejącego projektu.
- **Przejdź na natywny Intlayer (`react-intlayer`)**, gdy planujesz gruntowną przebudowę komponentów. Jest to jedyne rozwiązanie w tabeli zapewniające **0% wycieku języka**, zaledwie 5 KB narzutu biblioteki i tylko +7,6 KB na stronę względem bazowej aplikacji.

## Powiązane materiały porównawcze

- [Lingui vs Intlayer](https://intlayer.org/pl/blog/lingui-vs-intlayer) (bezpośrednie porównanie bibliotek na tym samym teście)
- [next-intl vs @intlayer/next-intl](https://intlayer.org/pl/blog/next-intl-vs-intlayer-next-intl) (artykuł z serii o adapterach kompatybilności)
- [i18next vs @intlayer/i18next](https://intlayer.org/pl/blog/i18next-vs-intlayer-i18next) (artykuł z serii o adapterach kompatybilności)
- [vue-i18n vs @intlayer/vue-i18n](https://intlayer.org/pl/blog/vue-i18n-vs-intlayer-vue-i18n) (artykuł z serii o adapterach kompatybilności)
- [Przewodnik po adapterze kompatybilności: Lingui](https://intlayer.org/pl/doc/compatibility/lingui)
- [Kompilator vs deklaratywne i18n](https://intlayer.org/pl/blog/compiler-vs-declarative-i18n)

## Podsumowanie

`@intlayer/lingui` zmienia sposób wiązania miejsc wywołań w Lingui: zamiast odwoływać się do globalnej instancji i wielkiego katalogu dla danego języka, każdy komponent otrzymuje słownik przygotowany wyłącznie na jego potrzeby. Na tej samej aplikacji TanStack Start oznacza to **7-krotnie mniejsze komponenty**, **hydratację skróconą o 8-14 ms**, **dwukrotnie szybszą zmianę języka** i likwidację 42-milisekundowego przestoju, bez konieczności edycji ani jednego makra. Nie modyfikuje przy tym wbudowanych tekstów zapasowych (stąd wyciek języka źródłowego pozostaje) i analizuje ICU w czasie działania (co w trybie dynamicznym dodaje ok. 20 KB na stronę względem czystego Lingui). Zdefiniuj priorytety wydajnościowe swojego projektu przed dokonaniem wyboru.

Wszystkie surowe dane pomiarowe, aplikacje demonstracyjne i skrypty znajdziesz w [repozytorium Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom). Możesz uruchomić je samodzielnie.

Więcej szczegółów technicznych znajdziesz w dokumencie ['Dlaczego Intlayer?'](https://intlayer.org/pl/doc/why).
