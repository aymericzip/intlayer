---
createdAt: 2026-09-13
updatedAt: 2026-09-22
title: "i18next vs @intlayer/i18next: To samo API, inny bundle"
description: "Co się zmienia, gdy aplikacja React lub Next.js zachowuje wywołania i18next, react-i18next i next-i18next, ale obsługuje je za pośrednictwem adapterów @intlayer/i18next. JavaScript na stronę, rozmiar komponentów, wycieki i hydratacja zmierzone na tym samym kodzie, a także co adaptery zachowują, ignorują i czego nie mogą zastąpić."
keywords:
  - i18next
  - react-i18next
  - next-i18next
  - "@intlayer/i18next"
  - "@intlayer/react-i18next"
  - "@intlayer/next-i18next"
  - Intlayer
  - Adapter kompatybilności
  - Migracja
  - Internacjonalizacja
  - i18n
  - Benchmark
  - Rozmiar bundle
  - Blog
  - Next.js
  - React
slugs:
  - blog
  - i18next-vs-intlayer-i18next
author: aymericzip
---

# i18next VS @intlayer/i18next | To samo API, inny bundle

![i18next VS Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/assets/i18next-next-intl-intlayer.webp?raw=true)

`@intlayer/i18next`, `@intlayer/react-i18next` i `@intlayer/next-i18next` to adaptery kompatybilności. Udostępniają API `i18next`, którego Twój kod już używa (`useTranslation`, `t()`, `<Trans>`, `i18n.changeLanguage()`, `getFixedT`, `serverSideTranslations`...) i obsługują je ze słowników skompilowanych przez Intlayer. Komponenty się nie zmieniają. Zmienia się runtime pod nimi.

Ten artykuł mierzy tę zamianę na tej samej aplikacji Next.js, zbudowanej raz z `next-i18next`, a raz z `@intlayer/next-i18next`. Liczby pochodzą z [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom). Aby porównać `i18next` i Intlayer jako biblioteki, przeczytaj [i18next vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pl/i18next_vs_intlayer.md). Ten artykuł dotyczy tego, co zmienia adapter, gdy zachowujesz swój kod bez zmian.

<TOC/>

> **tl;dr**: W tej samej aplikacji Next.js zastąpienie `next-i18next` przez `@intlayer/next-i18next` zmniejszyło ilość kodu JavaScript na stronę z **218.5 KB do 150.7 KB** gzip (konfiguracja naiwna) i pokonało w pełni zoptymalizowaną konfigurację `next-i18next` (163.4 KB) o **12.7 KB**. Średni komponent zmniejszył się z **78.5 KB do 9.7 KB**, wyciek ciągów znaków z obcych stron z **~90% do 0%**, hydratacja z **15.6 ms do 11.3 ms**, a runtime z **19.7 KB do 9.4 KB**. Żaden komponent nie był modyfikowany; zmieniono jeden plik dostawcy (provider). Wtyczki `i18next` (backendy, detektory języka) są akceptowane, ale nic nie robią: w środowisku wykonawczym nie ma już nic do załadowania ani wykrycia.

## Czym jest `@intlayer/i18next`

`i18next` to środowisko wykonawcze (runtime). `i18n.init({ resources })` lub wtyczka backendu ładuje `locales/{lng}/{ns}.json` do globalnej instancji; `useTranslation("about")` subskrybuje do niej komponent; `t("title")` wyszukuje klucz podczas renderowania. Przestrzenie nazw (namespaces), leniwe ładowanie (lazy loading), listy przestrzeni nazw na stronę i bezpieczeństwo typów pozostają w Twojej gestii do skonfigurowania i utrzymania.

Adaptery zachowują API i zastępują instancję:

1. **Aliasy importów.** `createNextI18nPlugin()` z `@intlayer/next-i18next/plugin` (lub `withI18next`) opakowuje `withIntlayer` i dodaje aliasy Webpack / Turbopack, dzięki czemu `next-i18next`, `react-i18next` i `i18next` wskazują na ich odpowiedniki `@intlayer/*`. W Vite `reactI18nextVitePlugin()` z `@intlayer/react-i18next/plugin` robi to samo. Żaden import nie jest zmieniany.
2. **JSON jako źródło prawdy.** Wtyczka `syncJSON` odczytuje istniejące pliki `locales/{lng}/{ns}.json` z `format: "i18next"` (dzięki czemu `{{name}}`, zagnieżdżanie `$t()`, sufiksy `_one` / `_other` oraz konteksty są poprawnie parsowane) i zapisuje tłumaczenia z powrotem, gdy CLI lub CMS je zaktualizuje.
3. **Wiązanie w miejscu wywołania (call-site binding).** Krok optymalizacji Intlayer przepisuje `useTranslation("about")` na wywołanie, które otrzymuje słownik `about` bezpośrednio, w aktywnym języku. Komponent przestaje odwoływać się do globalnego magazynu.

```tsx fileName="components/About.tsx"
// Twój kod, bez zmian
import { useTranslation } from "react-i18next";

const About = () => {
  const { t } = useTranslation("about");
  return <h1>{t("title")}</h1>;
};
```

```tsx fileName="Co generuje kompilator (uproszczone)"
import _dicHash_about from "../.intlayer/dictionaries/about.mjs";
import { useDictionary as useTranslation } from "@intlayer/react-i18next";

const About = () => {
  const { t } = useTranslation(_dicHash_about);
  return <h1>{t("title")}</h1>;
};
```

To przepisanie wpływa bezpośrednio na kolumny rozmiaru komponentów i wycieków stron poniżej.

## Co adaptery zachowują, ignorują i czego nie zastępują

| API `i18next`                                                                   | Z `@intlayer/*`                                                                                                  |
| ------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| `useTranslation("ns")`, `useTranslation("ns", { keyPrefix })`                   | ✅ Zachowane. Powiązane ze słownikiem `ns` w czasie budowania; klucze typowane na podstawie zawartości           |
| `t("key", { name })`, `{{interpolation}}`, zagnieżdżanie `$t(key)`              | ✅ Zachowane                                                                                                     |
| Liczba mnoga `key_one` / `key_other`, kontekst `key_male`, `returnObjects`      | ✅ Zachowane. Liczby mnogie ewaluowane za pomocą `Intl.PluralRules`                                              |
| `<Trans>` z `components`, numerowane tagi `<1>...</1>`, `values`                | ✅ Zachowane                                                                                                     |
| `withTranslation`, `Translation`, `I18nContext`                                 | ✅ Zachowane                                                                                                     |
| `i18n.changeLanguage()`, `i18n.language`, `i18n.dir()`, `on("languageChanged")` | ✅ Zachowane. `changeLanguage` steruje językiem Intlayer                                                         |
| `getFixedT(lng, ns, keyPrefix)`, `i18n.exists()`, `hasLoadedNamespace()`        | ✅ Zachowane                                                                                                     |
| `i18n.use(Backend).use(LanguageDetector).init({...})`                           | ⚠️ `use()` wywołuje `init` wtyczki i zwraca wynik; backendy i detektory nie mają nic do załadowania ani wykrycia |
| `init({ resources })`, `addResourceBundle()`                                    | ⚠️ `resources` jest **ignorowane** z ostrzeżeniem dev; usuń importy JSON, aby uzyskać korzyści w bundle          |
| `I18nextProvider i18n={i18n}`                                                   | ⚠️ Renderuje `IntlayerProvider`; właściwość `i18n` jest ignorowana. W App Router przekaż locale (patrz poniżej)  |
| `serverSideTranslations(locale, ["common"])` (next-i18next)                     | ⚠️ Zwraca oczekiwany kształt i niczego nie ładuje. Bezpieczne do pozostawienia lub usunięcia                     |
| `appWithTranslation(App)` (next-i18next)                                        | ✅ Zachowane                                                                                                     |
| `next-i18next.config.js`                                                        | ⚠️ Nieodczytywane. Języki pochodzą z `intlayer.config.ts`                                                        |
| Zwykłe `useTranslation()` bez przestrzeni nazw                                  | ✅ Działa względem słownika `translation` dla całego pliku (`splitKeys: false`)                                  |

## Benchmark

### Co mierzono

Zestaw [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom) buduje **tę samą aplikację** w każdej konfiguracji: **10 stron** (home, about, blog, careers, contact, FAQ, pricing, products, settings, team), **10 języków** (`en`, `fr`, `es`, `de`, `it`, `pt`, `zh`, `ja`, `ko`, `ru`), identyczne komponenty i identyczna zawartość. Strony są mierzone w `en` i `fr`.

`next-i18next` zbudowano w czterech strategiach ładowania, od importu JSON każdego języka do `resources` (`static`) po jedną przestrzeń nazw na trasę, ładowaną leniwie przez backend (`scoped-dynamic`). Adapter zbudowano na **tych samych komponentach co konfigurację naiwną**, ze zmienionymi plikami `next.config.ts`, `intlayer.config.ts` oraz plikiem providera. Nie ma wariantu "scoped": kompilator sam ogranicza zasięg zawartości na komponent.

Dla każdego buildu zestaw rejestruje:

- **Lib size**: rozmiar gzip pustego komponentu, który importuje tylko bibliotekę i18n.
- **Page JS**: pobrany JavaScript gzip na stronę, uśredniony dla wszystkich stron i języków.
- **Locale leak %**: udział przetłumaczonych ciągów w pobranym JS należących do języka, którego użytkownik **nie** przegląda.
- **Page leak %**: udział przetłumaczonych ciągów w pobranym JS należących do strony, na której użytkownik **nie** przebywa.
- **Component avg**: średni rozmiar gzip każdego komponentu skompilowanego w izolacji.
- **E2E reactivity**: rzeczywisty czas między wyborem nowego języka a aktualizacją `html[lang]` w DOM (Playwright, 5 iteracji).
- **Hydration**: czas trwania fazy hydratacji React.

> Poniższe liczby pochodzą z uruchomienia z dnia **2026-09-12** z `next-i18next` 16.3.0 (`react-i18next` 17.0.13, `i18next` 26.4.2) oraz `@intlayer/next-i18next` 9.5.1. Aplikacja testowa jest celowo niewielka (kilkadziesiąt ciągów na język), więc wartości procentowe wycieków opisują **wzorzec**: rosną one wraz z zawartością, podczas gdy koszt runtime pozostaje stały.

### Wyniki w Next.js

Wybierz metryki i biblioteki, które Cię interesują:

<I18nBenchmark framework="nextjs" vertical/>

| Konfiguracja                 | Strategia      | Lib size (gz) | Page JS avg (gz) | Locale leak | Page leak | Component avg (gz) | E2E reactivity |   Hydration |
| ---------------------------- | -------------- | ------------: | ---------------: | ----------: | --------: | -----------------: | -------------: | ----------: |
| **base** (brak i18n)         | -              |        0.0 KB |         141.0 KB |        0.0% |      0.0% |             0.9 KB |        13.4 ms |     11.8 ms |
| `next-i18next`               | static         |       19.7 KB |         218.5 KB |        0.0% |     89.8% |            78.5 KB |        16.4 ms |     15.6 ms |
| `next-i18next`               | dynamic        |       19.7 KB |         169.5 KB |       50.0% |     89.8% |            26.1 KB |        15.4 ms |     27.7 ms |
| `next-i18next`               | scoped-static  |       19.7 KB |         220.1 KB |        0.0% |     89.8% |            78.9 KB |        16.4 ms |     14.7 ms |
| `next-i18next`               | scoped-dynamic |       19.7 KB |         163.4 KB |        0.0% |      0.0% |            27.1 KB |        15.9 ms |     15.1 ms |
| **`@intlayer/next-i18next`** | static         |    **9.4 KB** |     **150.7 KB** |    **0.0%** |  **0.0%** |         **9.7 KB** |    **10.7 ms** | **11.3 ms** |
| **`@intlayer/next-i18next`** | dynamic        |    **9.4 KB** |     **150.7 KB** |    **0.0%** |  **0.0%** |         **9.7 KB** |    **11.9 ms** | **10.6 ms** |
| `next-intlayer` (natywny)    | static         |        5.5 KB |         141.3 KB |        0.0% |      0.0% |             8.5 KB |        15.5 ms |     16.9 ms |
| `next-intlayer` (natywny)    | dynamic        |        5.5 KB |         141.3 KB |        0.0% |      0.0% |             6.9 KB |        15.3 ms |     15.9 ms |

**Jak to interpretować**

- **68 KB mniej na stronę względem konfiguracji naiwnej.** `resources: { en, fr, ... }` wysyła każdy język i każdą przestrzeń nazw na każdej stronie: **218.5 KB**. Build adaptera dla tych samych komponentów osiąga **150.7 KB**. Pokonuje również najlepszą konfigurację `next-i18next` (163.4 KB, jedna przestrzeń nazw na trasę, ładowana leniwie) o 12.7 KB, ponieważ sam runtime `i18next` waży 19.7 KB w porównaniu do 9.4 KB.
- **Wyciek spada do 0% bez dotykania jakiegokolwiek komponentu.** Każda konfiguracja `next-i18next` z wyjątkiem w pełni wyizolowanej (scoped) wysyła ~90% ciągów z obcych stron. Wiersz `dynamic` wygląda gorzej niż w teorii: wcale nie eliminuje wycieku stron i dodaje **50% wycieku języków**, ponieważ backend dla danego języka nadal pobiera całą przestrzeń nazw `translation`. Adapter osiąga 0% / 0% z poziomu naiwnego kodu.
- **Komponenty: 8-krotnie mniejsze.** Komponent `useTranslation()` skompilowany w izolacji waży średnio **78.5 KB** przy wbudowanych `resources` oraz **26-27 KB** z backendem, ponieważ `t` jest powiązane z globalnym magazynem. Z adapterem osiąga średnio **9.7 KB**.
- **Hydratacja i przełączanie są szybsze.** Hydratacja przyspiesza z 15.6 ms do **11.3 ms** (oraz z 27.7 ms w konfiguracji `dynamic`, gdzie pobieranie z backendu znajduje się na ścieżce krytycznej). Przełączanie języka przyspiesza z 15-16 ms do **11-12 ms**.
- **Adapter to nie natywny runtime.** `next-intlayer` osiąga **141.3 KB**, czyli +0.3 KB względem bazowej aplikacji. Adapter wnosi powierzchnię API `i18next` (dialekt interpolacji, rozwiązywanie sufiksów liczby mnogiej i kontekstu, parsowanie tagów `<Trans>`) na wierzchu rdzenia Intlayer: 9.4 KB i +9.4 KB na stronę ponad natywną implementację. To pomost, a nie ostateczny cel.

<ClickToOpenIframe
src="https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-nextjs.md"
width="100%"
height="600px"
style="border:none;"
/>

> Pełna tabela, każda biblioteka i każda strategia, w [raporcie benchmarku Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/benchmark/nextjs.md).

> Adapter `react-i18next` w Vite / TanStack Start nie brał udziału w tym uruchomieniu. Wartość bazowa `react-i18next` w TanStack Start znajduje się w [i18next vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pl/i18next_vs_intlayer.md): 127-184 KB na stronę i 123-185 ms przełączania języka przy leniwym backendzie.

## Dlaczego liczby się zmieniają

![The Intlayer compiler extracts content from components](https://github.com/aymericzip/intlayer/blob/main/docs/assets/compiler.webp?raw=true)

W katalogu `components/` nic się nie zmieniło, więc zyski wynikają z tego, z czym powiązane jest `useTranslation`.

**W przypadku `i18next`** powiązaniem jest instancja globalna. Cokolwiek zostało do niej załadowane (wszystkie języki w `static`, cała przestrzeń nazw aktywnego języka w `dynamic`), jest dostępne z każdego komponentu wywołującego `useTranslation()`. Bundler nie może dokonać podziału poniżej tego, co zawiera instancja, a runtime nie może wiedzieć, o które klucze zapyta komponent.

```bash
.
├── next-i18next.config.js
├── public/locales
│   ├── en/translation.json           # ciągi znaków dla każdej strony
│   └── fr/translation.json
├── i18n/i18n.ts                      # i18n.use(initReactI18next).init({ resources })
└── components
    ├── AppProviders.tsx              # <I18nextProvider i18n={i18n}>
    └── About.tsx                     # useTranslation(); t("about.title")
```

Wszystko, co zawiera instancja, jest przesyłane na każdą stronę, a marnotrawstwo rośnie na dwóch osiach, stron i języków:

![Theoretical content leakage by architecture](https://github.com/aymericzip/intlayer/blob/main/docs/assets/theorical_content_leakage.webp?raw=true)

**W przypadku `@intlayer/next-i18next`** powiązaniem jest słownik. `syncJSON` przekształca każdy plik przestrzeni nazw w słownik; krok optymalizacji przekazuje komponentowi słownik, do którego się odwołuje, jako import, który bundler może śledzić i dzielić według stron i języków.

```bash
.
├── intlayer.config.ts                # syncJSON({ format: "i18next", source: ... })
├── public/locales
│   ├── en/translation.json           # bez zmian, nadal źródło prawdy
│   └── fr/translation.json
├── .intlayer/                        # wygenerowane: jeden słownik na przestrzeń nazw, na język
└── components
    ├── AppProviders.tsx              # <IntlayerClientProvider locale={locale}>
    └── About.tsx                     # useTranslation(); t("about.title")  ← bez zmian
```

`i18n/i18n.ts` i jego import `resources` stają się martwym kodem. To właśnie te 68 KB.

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

Polecenie wykrywa `i18next` / `react-i18next` / `next-i18next`, instaluje `intlayer`, pakiet frameworka (`next-intlayer` lub `react-intlayer`), pasujący adapter `@intlayer/*` oraz `@intlayer/sync-json-plugin`, a także wstępnie konfiguruje `intlayer.config.ts`. Zachowaj zainstalowane oryginalne pakiety: są to peer dependencies i dostarczają typy.

</Step>
<Step number={2} title="Wskaż Intlayer pliki językowe">

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
    format: "i18next",
  },
  plugins: [
    syncJSON({
      // Dialekt i18next: {{name}}, $t(key), key_one / key_other, key_male
      format: "i18next",
      // Jeden plik na przestrzeń nazw: `useTranslation("about")` → about.json
      source: ({ locale, key }) => `./public/locales/${locale}/${key}.json`,
      location: "public/locales",
    }),
  ],
};

export default config;
```

Jeśli masz pojedynczy plik `translation.json` na język (domyślna przestrzeń nazw w i18next), ustaw `splitKeys: false`, aby cały plik pozostał jednym słownikiem i zwykłe `useTranslation()` nadal działało.

</Step>
<Step number={3} title="Dodaj wtyczkę">

<Tabs>
<Tab label="Next.js">

```ts fileName="next.config.ts"
import type { NextConfig } from "next";
import { withI18next } from "@intlayer/next-i18next/plugin";

const nextConfig: NextConfig = {};

export default withI18next(nextConfig);
```

W App Router komponenty klienckie pobierają swój język z segmentu `[locale]`. Komponent `I18nextProvider` adaptera nie przyjmuje parametru locale, więc zastąp go raz w pliku providera:

```tsx fileName="components/AppProviders.tsx"
"use client";

import { IntlayerClientProvider } from "next-intlayer";
import type { LocalesValues } from "intlayer";

export const AppProviders = ({
  locale,
  children,
}: {
  locale: LocalesValues;
  children: React.ReactNode;
}) => (
  <IntlayerClientProvider locale={locale}>{children}</IntlayerClientProvider>
);
```

Każdy komponent poniżej nadal wywołuje `useTranslation()`.

</Tab>
<Tab label="Vite / TanStack Start">

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { reactI18nextVitePlugin } from "@intlayer/react-i18next/plugin";

export default defineConfig({
  plugins: [react(), reactI18nextVitePlugin()],
});
```

`reactI18nextVitePlugin()` opakowuje `vite-intlayer` i tworzy aliasy dla `react-i18next` i `i18next`. W projekcie bez React `i18nextVitePlugin()` z `@intlayer/i18next/plugin` tworzy alias dla samego `i18next`.

</Tab>
</Tabs>

</Step>
</Steps>

### Co można potem usunąć

| Plik / wzorzec                                         | Dlaczego                                                                            |
| ------------------------------------------------------ | ----------------------------------------------------------------------------------- |
| `resources: { en, fr, ... }` i importy JSON            | Ignorowane przez adapter. To tutaj znajdowało się 68 KB                             |
| `i18next-http-backend`, `i18next-resources-to-backend` | Brak danych do pobierania w środowisku wykonawczym                                  |
| `i18next-browser-languagedetector`                     | Wykrywanie języka to konfiguracja routingu Intlayer (prefiks URL, cookie, nagłówek) |
| `serverSideTranslations()` w `getStaticProps`          | Zwraca pustą strukturę; nieszkodliwe, ale martwe                                    |
| `next-i18next.config.js`                               | Nieodczytywane. Języki znajdują się w `intlayer.config.ts`                          |
| Listy `ns: [...]` per strona                           | Kompilator dobiera przestrzenie nazw na komponent                                   |

### Co zyskujesz poza zaoszczędzonymi bajtami

- **Typowane klucze.** `useTranslation("about")` jest typowane względem skompilowanego słownika `about`; `t("does.not.exist")` powoduje błąd TypeScript zamiast zwróconego ciągu klucza.
- **`npx intlayer test`** kończy się błędem w CI w przypadku brakującego klucza w dowolnym języku. **`npx intlayer fill`** tłumaczy brakujące klucze za pomocą Twojego klucza dostawcy (OpenAI, Anthropic, Mistral, Gemini...) i zapisuje je z powrotem do `locales/{lng}/{ns}.json`.
- **Wizualny Edytor i CMS** operują na tym samym JSON, dzięki czemu tłumacze edytują treści przez interfejs użytkownika, a pliki są aktualizowane.
- **Stopniowe przejście na `.content.ts`.** Dowolny komponent może przełączyć się z `useTranslation("about")` na `useIntlayer("about")` z plikiem zawartości zlokalizowanym obok komponentu. Słowniki JSON i `.content.ts` współistnieją.

## Ograniczenia, które warto znać przed rozpoczęciem

<AccordionGroup>
<Accordion header="Backendy i detektory są bezczynne">

`i18n.use(HttpBackend)` wywołuje jedynie init wtyczki i nic więcej. Jeśli Twoja aplikacja polegała na pobieraniu tłumaczeń z CMS w czasie wykonywania, ten przepływ znika; użyj zamiast tego [Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_CMS.md) lub poleceń `intlayer pull` / `push`. Wykrywanie języka staje się konfiguracją routingu Intlayer (prefiks URL, cookie, nagłówek).

</Accordion>
<Accordion header="resources jest ignorowane, nie scalane">

W przeciwieństwie do innych adapterów, `@intlayer/i18next` nie używa wbudowanych `resources` jako rozwiązania awaryjnego. Każdy klucz musi istnieć w zsynchronizowanych słownikach, co weryfikuje `intlayer test`.

</Accordion>
<Accordion header="App Router wymaga modyfikacji providera">

Jeden plik, pokazany powyżej. Pages Router z `appWithTranslation` nie wymaga żadnych zmian.

</Accordion>
<Accordion header="next-i18next.config.js nie jest odczytywany">

`localePath`, `fallbackLng`, `reloadOnPrerender` i pokrewne nie mają odpowiedników; języki i wartości domyślne pochodzą z `intlayer.config.ts`.

</Accordion>
<Accordion header="Adapter nie jest darmowy">

9.4 KB runtime i +9.4 KB na stronę w stosunku do `next-intlayer`. Gdy każdy komponent przejdzie na `useIntlayer`, usuń go.

</Accordion>
</AccordionGroup>

## Kiedy używać którego rozwiązania?

<AccordionGroup>
<Accordion header="Pozostań przy i18next">

Twoja aplikacja zależy od backendów w czasie wykonywania (tłumaczenia serwowane przez CMS w momencie żądania), od ekosystemu wtyczek lub od środowiska innego niż React, którego adaptery nie obsługują.

</Accordion>
<Accordion header="Użyj @intlayer/*">

Używasz `react-i18next` / `next-i18next` i chcesz zaoszczędzić 68 KB, mieć 8-krotnie mniejsze komponenty, 0% wycieków, typowane klucze i testy CI bez przepisywania kodu. To punkt wejścia dla istniejącej bazy kodu `i18next`.

</Accordion>
<Accordion header="Przejdź na rozwiązanie natywne (next-intlayer / react-intlayer)">

Dla nowych projektów lub po zakończeniu pracy przez adapter. Ma najlżejszy runtime (5.5 KB, +0.3 KB na stronę) i odblokowuje synchroniczne Server Components oraz pliki `.content.ts` dla każdego komponentu. Zacznij od [Intlayer z Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_with_nextjs_16.md) lub [z Vite i React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_with_vite+react.md).

</Accordion>
</AccordionGroup>

## Często zadawane pytania

<FAQ>

<Question title="Skąd bierze się 68 KB?">

Z `resources: { en, fr, ... }`. Domyślna konfiguracja `next-i18next` importuje JSON każdego języka do `init()`, przez co każda strona przenosi każdy namespace w każdym języku: **218.5 KB** na stronę. Adapter nigdy nie dołącza tego bloku w całości; przekazuje każdemu komponentowi tylko żądany słownik w aktywnym języku.

</Question>

<Question title="Czy moje komponenty <Trans> nadal działają?">

Tak, z `components`, numerowanymi tagami `<1>...</1>` oraz `values`. Podobnie z `{{interpolation}}`, zagnieżdżaniem `$t(key)`, formami mnogimi `key_one` / `key_other` (ocenianymi za pomocą `Intl.PluralRules`), sufiksami kontekstowymi i `returnObjects`.

</Question>

<Question title="Co jeśli używam pojedynczego translation.json na język?">

Ustaw `splitKeys: false` we wtyczce `syncJSON`. Cały plik pozostanie jednym słownikiem, a standardowe wywołanie `useTranslation()` będzie nadal na niego wskazywać.

</Question>

<Question title="Czy to to samo co migracja do Intlayer?">

Nie, to pomost. Adapter zachowuje API `i18next` i kosztuje 9.4 KB runtime; natywny `next-intlayer` kosztuje 5.5 KB i dodaje synchroniczne Server Components oraz pliki `.content.ts` umieszczone obok komponentów. Możesz migrować komponent po komponencie, ponieważ słowniki JSON i `.content.ts` współistnieją.

</Question>

<Question title="Czy tłumacze mogą nadal pracować tak jak dzisiaj?">

Tak. `locales/{lng}/{ns}.json` pozostaje źródłem prawdy: `syncJSON` odczytuje go w dialekcie i18next i zapisuje tłumaczenia z powrotem, gdy CLI lub CMS je zaktualizuje.

</Question>

</FAQ>

## Powiązane porównania

Ta sama seria adapterów:

- [next-intl vs @intlayer/next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pl/next-intl_vs_intlayer-next-intl.md)
- [Lingui vs @intlayer/lingui](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pl/lingui_vs_intlayer-lingui.md)
- [vue-i18n vs @intlayer/vue-i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pl/vue-i18n_vs_intlayer-vue-i18n.md)

Biblioteki w bezpośrednim porównaniu:

- [i18next vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pl/i18next_vs_intlayer.md), same benchmark
- [next-i18next vs next-intl vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pl/next-i18next_vs_next-intl_vs_intlayer.md)
- [react-i18next vs react-intl vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pl/react-i18next_vs_react-intl_vs_intlayer.md)
- [Is i18next outdated?](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pl/is_i18next_outdated.md)

Dokumentacja referencyjna:

- Compat adapters: [i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/compat/i18next.md), [react-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/compat/react-i18next.md), [next-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/compat/next-i18next.md)
- Migration guides: [i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/migration_from_i18next_to_intlayer.md), [react-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/migration_from_react-i18next_to_intlayer.md), [next-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/migration_from_next-i18next_to_intlayer.md)
- [Next.js benchmark report](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/benchmark/nextjs.md) and [TanStack Start benchmark report](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/benchmark/tanstack.md)
- [Bundle optimization](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/bundle_optimization.md) and [the Intlayer compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/compiler.md)
- [Visual Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_visual_editor.md), [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_CMS.md) and [AI translation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/autoFill.md)

## Podsumowanie

`i18next` to najcięższy runtime w tym benchmarku, a adaptery usuwają większość z niego bez konieczności rezygnacji z jego API. Na tej samej aplikacji Next.js oznacza to **68 KB mniej na stronę** niż w konfiguracji naiwnej, **12.7 KB mniej** niż w najlepiej zoptymalizowanej ręcznie, **8x mniejsze komponenty**, **0% wycieków** oraz **4 ms szybszą hydratację**, w zamian za plik konfiguracyjny, jedną linijkę wtyczki i zmianę w jednym providerze. Backendy i detektory stają się operacjami no-op, `resources` jest ignorowane zamiast scalane, a natywny runtime `next-intlayer` pozostaje o kolejne 9 KB lżejszy.

Wszystkie surowe dane, aplikacje testowe i skrypty znajdują się w [repozytorium Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom). Uruchom je samodzielnie.

Więcej szczegółów znajdziesz w dokumentacji [Dlaczego Intlayer?](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/interest_of_intlayer.md).
