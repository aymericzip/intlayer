---
createdAt: 2026-09-13
updatedAt: 2026-09-22
title: "next-intl vs Intlayer: Benchmark i Porównanie 2026"
description: "Szczegółowe porównanie next-intl i Intlayer w Next.js App Router i TanStack Start. Rozmiar paczki, wyciek treści, rozmiar komponentu, hydratacja i doświadczenie programisty."
keywords:
  - next-intl
  - use-intl
  - Intlayer
  - Internationalization
  - i18n
  - Benchmark
  - Bundle size
  - Next.js
  - TanStack Start
  - React
slugs:
  - blog
  - next-intl-vs-intlayer
author: aymericzip
---

# next-intl VS Intlayer | Benchmark internacjonalizacji (i18n) w React i Next.js

![next-intl VS Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/assets/i18next-next-intl-intlayer.webp?raw=true)

`next-intl` jest najpopularniejszą biblioteką i18n dla Next.js. Intlayer to oparta na kompilatorze alternatywa o zasięgu komponentów. Obie lokalizują aplikację App Router. Pytanie brzmi, ile każda z nich kosztuje po zbudowaniu aplikacji.

Ten artykuł nie jest samouczkiem. To porównanie oparte na liczbach z [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom), pakietu testów porównawczych open-source, który buduje tę samą aplikację z każdą biblioteką i mierzy to, co przeglądarka faktycznie pobiera i wykonuje.

<TOC/>

> **W skrócie (tl;dr)**: `next-intl` dodaje co najmniej **+12.6 KB gzip** na każdej stronie wyłącznie ze względu na swój runtime i powoduje wyciek **~90% ciągów z innych stron** w standardowych konfiguracjach (`static` i `dynamic`). Wyeliminowanie tego wycieku wymaga podziału katalogów na przestrzenie nazw i ręcznego ich wybierania per strona. Z kolei kompilator `Intlayer` zapewnia **0% wycieku**, **3x mniejsze komponenty** i narzut rzędu zaledwie **+0.3 KB** ponad bazową aplikację bez żadnej konfiguracji.

## Podsumowanie

- **next-intl** - Standard społeczności Next.js. Scentralizowane pliki JSON per język, pełna obsługa ICU MessageFormat i głęboka integracja z obsługą żądań i routingiem Next.js.
- **Intlayer** - Model zorientowany na komponenty. Słowniki `.content.ts` umieszczane są tuż obok komponentów, kompilator automatycznie wykonuje tree-shaking oraz leniwe ładowanie per komponent i per język, a także generuje ścisłe typy TypeScript.

| Biblioteka            | Gwiazdki na GitHub                                                                                                                                                             | Łączna liczba commitów                                                                                                                                                             | Ostatni commit                                                                                                                                      | Pierwsza wersja | Wersja NPM                                                                                                    | Pobrania NPM                                                                                                             |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- | ------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `aymericzip/intlayer` | [![GitHub Repo stars](https://img.shields.io/github/stars/aymericzip/intlayer?style=for-the-badge&label=%E2%AD%90%20stars)](https://github.com/aymericzip/intlayer/stargazers) | [![GitHub commit activity](https://img.shields.io/github/commit-activity/t/aymericzip/intlayer?style=for-the-badge&label=commits)](https://github.com/aymericzip/intlayer/commits) | [![Last Commit](https://img.shields.io/github/last-commit/aymericzip/intlayer?style=for-the-badge)](https://github.com/aymericzip/intlayer/commits) | Kwiecień 2024   | [![npm](https://img.shields.io/npm/v/intlayer?style=for-the-badge)](https://www.npmjs.com/package/intlayer)   | [![npm downloads](https://img.shields.io/npm/dm/intlayer?style=for-the-badge)](https://www.npmjs.com/package/intlayer)   |
| `amannn/next-intl`    | [![GitHub Repo stars](https://img.shields.io/github/stars/amannn/next-intl?style=for-the-badge&label=%E2%AD%90%20stars)](https://github.com/amannn/next-intl/stargazers)       | [![GitHub commit activity](https://img.shields.io/github/commit-activity/t/amannn/next-intl?style=for-the-badge&label=commits)](https://github.com/amannn/next-intl/commits)       | [![Last Commit](https://img.shields.io/github/last-commit/amannn/next-intl?style=for-the-badge)](https://github.com/amannn/next-intl/commits)       | Marzec 2021     | [![npm](https://img.shields.io/npm/v/next-intl?style=for-the-badge)](https://www.npmjs.com/package/next-intl) | [![npm downloads](https://img.shields.io/npm/dm/next-intl?style=for-the-badge)](https://www.npmjs.com/package/next-intl) |

> Odznaki aktualizują się automatycznie.

## Porównanie funkcji

| Funkcja                                        | Intlayer (`react-intlayer` / `next-intlayer`)                                            | next-intl (`next-intl` / `use-intl`)                                       |
| ---------------------------------------------- | ---------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| **Tłumaczenia przy komponentach**              | ✅ Tak, `.content.ts` umieszczony przy każdym komponencie                                | ❌ Scentralizowane pliki JSON w katalogu `messages/`                       |
| **Integracja z TypeScriptem**                  | ✅ Ścisłe typy generowane automatycznie z treści                                         | ⚠️ Wspierane przez ręczną konfigurację `global.d.ts`                       |
| **Wykrywanie brakujących tłumaczeń**           | ✅ Błąd TypeScriptu + błąd/ostrzeżenie podczas budowania                                 | ⚠️ W runtime zwracany jest klucz lub zgłaszany błąd w zależności od opcji  |
| **Bogata treść (JSX / Markdown / komponenty)** | ✅ Bezpośrednie wsparcie                                                                 | ⚠️ Poprzez `t.rich()` z przekazywaniem komponentów mapujących              |
| **Obsługa ICU MessageFormat**                  | ⚠️ W trakcie prac                                                                        | ✅ Tak, pełna obsługa standardu ICU                                        |
| **Synchroniczne komponenty serwerowe**         | ✅ `useIntlayer` z `next-intlayer/server` działa w każdym podrzędnym komponencie serwera | ❌ Wymaga przekazywania tłumaczeń przez propsy z asynchronicznego rodzica  |
| **Tree-shaking**                               | ✅ Automatyczny dla każdego komponentu i języka                                          | ⚠️ Wymaga ręcznego podziału na przestrzenie nazw i użycia funkcji `pick()` |
| **Leniwe ładowanie (Lazy loading)**            | ✅ Jedna linijka konfiguracji (`importMode: 'dynamic'`)                                  | ⚠️ Wymaga ręcznego importu dynamicznego w `getRequestConfig`               |
| **Wizualny Edytor / CMS**                      | ✅ Darmowy Wizualny Edytor + opcjonalny CMS                                              | ❌ Brak                                                                    |
| **Tłumaczenia wspomagane przez AI**            | ✅ Wbudowane, korzysta z Twoich własnych kluczy API dostawców                            | ❌ Brak                                                                    |
| **Serwer MCP i Agent Skills**                  | ✅ Tak                                                                                   | ❌ Brak                                                                    |

## Benchmark

### Co było mierzone

Zestaw testów [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom) buduje **tę samą aplikację** z każdą biblioteką: **10 stron** (home, about, blog, careers, contact, FAQ, pricing, products, settings, team), **10 lokalizacji** (`en`, `fr`, `es`, `de`, `it`, `pt`, `zh`, `ja`, `ko`, `ru`), identyczne komponenty i identyczną zawartość. Pomiary przeprowadzono na stronach w językach `en` i `fr`. Każda biblioteka została przetestowana w maksymalnie czterech **strategiach ładowania**:

| Strategia          | Opis                                                                                   | Kto to stosuje                                     |
| ------------------ | -------------------------------------------------------------------------------------- | -------------------------------------------------- |
| **static**         | Wszystkie języki i strony spakowane razem na starcie                                   | Szybkie prototypy, kod wygenerowany przez AI       |
| **dynamic**        | Ładowany jest tylko aktywny język, ale od razu dla wszystkich stron                    | Większość projektów                                |
| **scoped-static**  | Przestrzenie nazw per trasa, brak leniwego ładowania                                   | Rzadkość                                           |
| **scoped-dynamic** | Przestrzenie nazw per trasa + leniwe ładowanie. Tylko bieżąca strona w bieżącym języku | Aplikacje z rygorystycznym budżetem wydajnościowym |

Intlayer nie wymaga wariantu "scoped": kompilator automatycznie ogranicza zakres treści **per komponent**, więc wiersze `static` i `dynamic` są już zoptymalizowane pod tym kątem.

Dla każdego wariantu rejestrowano:

- **Rozmiar biblioteki (Lib size)**: rozmiar gzip pustego komponentu importującego wyłącznie bibliotekę i18n.
- **JS strony (Page JS)**: ilość JavaScript gzip pobieranego na stronę.
- **% wycieku języka (Locale leak %)**: odsetek ciągów należących do języka, którego użytkownik nie przegląda.
- **% wycieku strony (Page leak %)**: odsetek ciągów należących do innej podstrony.
- **Średnia komponentu (Component avg)**: średni rozmiar gzip każdego komponentu skompilowanego w izolacji.
- **Reaktywność E2E**: czas od wyboru nowego języka do zaktualizowania `html[lang]` w DOM.
- **Hydratacja**: czas trwania fazy hydratacji w React.

> Dane poniżej pochodzą z testu z dnia **2026-09-12** z użyciem bibliotek `next-intl` 4.14.2 i `intlayer` 9.5.1.

### Wyniki w Next.js (App Router)

Wybierz metryki i biblioteki, które Cię interesują:

<I18nBenchmark framework="nextjs" vertical/>

| Biblioteka                     | Strategia      | Rozmiar Lib (gz) | Śr. JS strony (gz) | Wyciek języka | Wyciek strony | Śr. komponentu (gz) | Reaktywność E2E | Hydratacja |
| ------------------------------ | -------------- | ---------------: | -----------------: | ------------: | ------------: | ------------------: | --------------: | ---------: |
| **Baza** (bez i18n)            | -              |           0.0 KB |           141.0 KB |          0.0% |          0.0% |              0.9 KB |         13.4 ms |    11.8 ms |
| `next-intl`                    | static         |          14.7 KB |           153.6 KB |          4.2% |         89.8% |             21.8 KB |         16.0 ms |    14.7 ms |
| `next-intl`                    | dynamic        |          14.7 KB |           153.6 KB |          9.7% |         89.9% |             21.8 KB |         15.6 ms |    14.8 ms |
| `next-intl`                    | scoped-static  |          14.7 KB |           153.6 KB |          0.0% |          0.0% |             80.1 KB |         17.9 ms |    17.4 ms |
| `next-intl`                    | scoped-dynamic |          14.7 KB |           153.6 KB |          0.0% |          0.0% |             22.9 KB |         17.8 ms |    16.8 ms |
| **`next-intlayer`**            | static         |       **5.5 KB** |       **141.3 KB** |      **0.0%** |      **0.0%** |          **8.5 KB** |     **15.5 ms** |    16.9 ms |
| **`next-intlayer`**            | dynamic        |       **5.5 KB** |       **141.3 KB** |      **0.0%** |      **0.0%** |          **6.9 KB** |     **15.3 ms** |    15.9 ms |
| `@intlayer/next-intl` (kompat) | static         |           8.0 KB |           147.5 KB |          0.0% |          0.0% |              8.1 KB |         14.5 ms |    12.8 ms |
| `@intlayer/next-intl` (kompat) | dynamic        |           8.0 KB |           148.7 KB |          0.0% |          0.0% |              8.1 KB |         11.7 ms |    12.8 ms |

**Jak interpretować wyniki**

- **Koszt środowiska uruchomieniowego.** Aplikacja bazowa to 141.0 KB na stronę. `next-intl` zwiększa tę wartość do 153.6 KB (**+12.6 KB gzip na każdej stronie**), podczas gdy Intlayer narzuca zaledwie 141.3 KB (**+0.3 KB**).
- **Wyciek treści.** W najczęstszych konfiguracjach (`static` i `dynamic`) `next-intl` wysyła na każdej stronie **~90% ciągów z innych stron**, ponieważ cały plik `en.json` trafia do dostawcy klienta. Osiągnięcie 0% wymaga ręcznego dzielenia katalogów, podczas gdy Intlayer robi to automatycznie.
- **Rozmiar komponentu.** Komponent wywołujący `useTranslations()` waży średnio 21.8 KB; ten sam komponent z `useIntlayer()` waży jedynie 6.9 KB.

<ClickToOpenIframe
src="https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-nextjs.md"
width="100%"
height="600px"
style="border:none;"
/>

> Pełna tabela, każda biblioteka i każda strategia, w [raporcie benchmarku Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/benchmark/nextjs.md).

### Wyniki w TanStack Start (`use-intl`)

`use-intl` jest niezależnym od frameworka rdzeniem `next-intl`. To samo API, ten sam format wiadomości. Porównanie go z `intlayer` na TanStack Start usuwa z równania specyfikę Next.js.

| Biblioteka                    | Strategia      | Rozmiar Lib (gz) | Śr. JS strony (gz) | Wyciek języka | Wyciek strony | Śr. komponentu (gz) | Reaktywność E2E |
| ----------------------------- | -------------- | ---------------: | -----------------: | ------------: | ------------: | ------------------: | --------------: |
| **Baza** (bez i18n)           | -              |           0.0 KB |           111.0 KB |          0.0% |          0.0% |              0.7 KB |          8.1 ms |
| `use-intl`                    | static         |          14.1 KB |           179.8 KB |         50.0% |         89.8% |             76.0 KB |          6.7 ms |
| `use-intl`                    | dynamic        |          14.1 KB |           119.4 KB |          0.0% |         89.8% |             75.9 KB |          7.0 ms |
| `use-intl`                    | scoped-static  |          14.1 KB |           128.7 KB |          0.0% |          0.0% |             87.1 KB |         20.9 ms |
| `use-intl`                    | scoped-dynamic |          14.1 KB |           128.7 KB |          0.0% |          0.0% |             87.1 KB |         13.3 ms |
| **`intlayer`**                | static         |       **5.0 KB** |       **125.8 KB** |         50.0% |      **0.0%** |          **8.1 KB** |      **3.2 ms** |
| **`intlayer`**                | dynamic        |       **5.0 KB** |       **118.6 KB** |      **0.0%** |      **0.0%** |          **6.3 KB** |      **3.6 ms** |
| `@intlayer/use-intl` (kompat) | dynamic        |           7.3 KB |           129.7 KB |          0.0% |          0.0% |              9.3 KB |          8.7 ms |

**Jak interpretować wyniki**

- Naiwna konfiguracja `use-intl` wysyła **o 68.8 KB więcej kodu JS na stronę** niż aplikacja bazowa.
- W trybie `dynamic` `use-intl` osiąga 119.4 KB, ale nadal generuje **89.8% wycieku stron**.
- Różnica architektoniczna jest widoczna w **rozmiarze komponentów**: 76-87 KB w `use-intl` w porównaniu do 6-8 KB w Intlayerze.
- **Przełączanie języka** jest 2-4x szybsze w Intlayerze (3 ms vs 7-21 ms).

<ClickToOpenIframe
src="https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-tanstack.md"
width="100%"
height="600px"
style="border:none;"
/>

> Pełna tabela w [raporcie benchmarku TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/benchmark/tanstack.md).

## Dlaczego jest taka różnica? Scentralizowane katalogi vs kompilowane słowniki

![Centralized catalogs versus per-component dictionaries](https://github.com/aymericzip/intlayer/blob/main/docs/assets/project_stucture_18n_vs_intlayer.png?raw=true)

`next-intl` podąża za klasycznym wzorcem: jeden plik JSON per język, ładowany w `getRequestConfig`, przekazywany do `NextIntlClientProvider` i odczytywany przez `t("namespace.key")`.

```bash
.
├── messages
│   ├── en.json
│   └── fr.json
└── src
    ├── i18n
    │   ├── request.ts
    │   └── routing.ts
    ├── middleware.ts
    └── app
        └── [locale]
            ├── layout.tsx
            └── about
                └── page.tsx
```

Runtime nie może wiedzieć, jakich kluczy użyje dana strona, dlatego domyślnie wysyła cały katalog.

Koszt nieosiągnięcia tego celu rośnie na dwóch osiach jednocześnie: stron i języków:

![Theoretical content leakage by architecture](https://github.com/aymericzip/intlayer/blob/main/docs/assets/theorical_content_leakage.webp?raw=true)

Intlayer odwraca tę relację. Treść deklarowana jest tuż obok komponentu:

```bash
.
├── intlayer.config.ts
└── src
    ├── middleware.ts
    └── app
        └── [locale]
            ├── layout.tsx
            └── about
                ├── page.tsx
                └── page.content.ts
    └── components
        └── Counter
            ├── index.tsx
            └── index.content.ts
```

Podczas budowania kompilator analizuje, które komponenty importują poszczególne słowniki i dołącza do paczki tylko to, co jest niezbędne dla aktywnego języka.

> Aby uzyskać wyniki z wiersza `dynamic`, ustaw `dictionary.importMode: 'dynamic'` w `intlayer.config.ts`. Zobacz [dokumentację optymalizacji paczki](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/bundle_optimization.md).

## Doświadczenie programisty

### Komponent klienta

<Tabs defaultTab="intlayer" group="techno">
<Tab label="next-intl" value="next-intl">

```json fileName="messages/en.json"
{
  "counter": {
    "label": "Counter",
    "increment": "Increment"
  }
}
```

```tsx fileName="src/components/ClientCounter.tsx"
"use client";

import { useState } from "react";
import { useTranslations, useFormatter } from "next-intl";

export const Counter = () => {
  const t = useTranslations("counter");
  const format = useFormatter();
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>{format.number(count)}</p>
      <button aria-label={t("label")} onClick={() => setCount((c) => c + 1)}>
        {t("increment")}
      </button>
    </div>
  );
};
```

> Pamiętaj o uwzględnieniu przestrzeni nazw `counter` w komunikatach przekazywanych do `NextIntlClientProvider` na każdej stronie renderującej ten komponent.

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

Nie trzeba niczego rejestrować na stronie: komponent dostarcza własną treść.

</Tab>
</Tabs>
### Synchroniczne komponenty serwerowe

Wspólne elementy interfejsu (pasek nawigacji, stopka, karty) są często komponentami serwerowymi renderowanymi wewnątrz komponentów klienckich, więc nie mogą być asynchroniczne (`async`).

<Tabs defaultTab="intlayer" group="techno">
<Tab label="next-intl" value="next-intl">

```tsx fileName="src/components/ServerCounter.tsx"
type ServerCounterProps = {
  t: (key: string) => string;
  formattedCount: string;
};

export const ServerCounter = ({ t, formattedCount }: ServerCounterProps) => (
  <div>
    <p>{formattedCount}</p>
    <button aria-label={t("label")}>{t("increment")}</button>
  </div>
);
```

Strona musi wywołać `await getTranslations("counter")` i `await getFormatter()`, a następnie przekazać wyniki w dół jako propsy. Komponent przestaje być samowystarczalny.

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
### Metadane

<Tabs defaultTab="intlayer" group="techno">
<Tab label="next-intl" value="next-intl">

```tsx fileName="src/app/[locale]/about/page.tsx"
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";

const localizedPath = (locale: string, path: string) =>
  locale === routing.defaultLocale ? path : `/${locale}${path}`;

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> => {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });

  const languages = Object.fromEntries(
    routing.locales.map((l) => [l, localizedPath(l, "/about")])
  );

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: localizedPath(locale, "/about"),
      languages: { ...languages, "x-default": "/about" },
    },
  };
};
```

</Tab>
<Tab label="Intlayer" value="intlayer">

```tsx fileName="src/app/[locale]/about/page.tsx"
import { getIntlayer, getMultilingualUrls } from "intlayer";
import type { Metadata } from "next";
import type { LocalPromiseParams } from "next-intlayer";

export const generateMetadata = async ({
  params,
}: LocalPromiseParams): Promise<Metadata> => {
  const { locale } = await params;
  const metadata = getIntlayer("about-metadata", locale);
  const multilingualUrls = getMultilingualUrls("/about");

  return {
    ...metadata,
    alternates: {
      canonical: multilingualUrls[locale as keyof typeof multilingualUrls],
      languages: { ...multilingualUrls, "x-default": "/about" },
    },
  };
};
```

</Tab>
</Tabs>

## Zachowaj API next-intl, zyskaj lekki bundle z Intlayer

Nie musisz przepisywać komponentów, aby zyskać powyższe wyniki wydajnościowe. `@intlayer/next-intl` to adapter typu drop-in: zachowuje `useTranslations`, `getTranslations`, `useFormatter`, `t.rich()` i formaty ICU, serwując je ze słowników skompilowanych przez Intlayera.

```ts fileName="next.config.ts"
import type { NextConfig } from "next";
import { createNextIntlPlugin } from "@intlayer/next-intl/plugin";

const withIntlayer = createNextIntlPlugin();

const nextConfig: NextConfig = {};

export default withIntlayer(nextConfig);
```

W testach wersja kompatybilna tej samej aplikacji zmniejszyła rozmiar z **153.6 KB do 147.5 KB** na stronę, rozmiar komponentów z **21.8 KB do 8.1 KB**, a wyciek strony spadł z **~90% do 0%**, bez ingerencji w kod źródłowy aplikacji. Dotychczasowe pliki `messages/{locale}.json` mogą pozostać źródłem prawdy dzięki [wtyczce synchronizacji JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/compat/next-intl.md).

Zobacz [przewodnik migracji z next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/migration_from_next-intl_to_intlayer.md), aby poznać szczegóły krok po kroku.

## Kiedy wybrać którą bibliotekę?

<AccordionGroup>
<Accordion header="Wybierz next-intl">

Chcesz standardu ekosystemu Next.js, polegasz na ICU MessageFormat, Twoja aplikacja jest mała lub średnia, lub integrujesz się z platformą tłumaczeń (Crowdin, Phrase, Lokalise...) oczekującą scentralizowanego JSON. Zaplanuj czas na podział katalogów na przestrzenie nazw i wybieranie komunikatów za pomocą `pick()` na stronę, jeśli wydajność ma znaczenie.

</Accordion>
<Accordion header="Wybierz Intlayer">

Chcesz **treści o zasięgu komponentu**, **ścisłego TypeScriptu**, **błędów brakujących kluczy w czasie budowania**, **automatycznego tree-shakingu i leniwego ładowania**, synchronicznych komponentów serwerowych oraz wbudowanych narzędzi redakcyjnych ([Edytor Wizualny](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_visual_editor.md), [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_CMS.md), [tłumaczenie AI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/autoFill.md), [serwer MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/mcp_server.md)). Szczególnie istotne dla dużych, modułowych baz kodu i systemów projektowania.

</Accordion>
<Accordion header="Wybierz @intlayer/next-intl">

Używasz już `next-intl` i chcesz uzyskać korzyści z rozmiaru paczki bez przepisywania aplikacji. [Adapter zgodności](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/compat/next-intl.md) zachowuje Twoje importy i plik `messages/{locale}.json` jako źródło prawdy. Zmierzono obok siebie w [next-intl vs @intlayer/next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pl/next-intl_vs_intlayer-next-intl.md).

</Accordion>
</AccordionGroup>

## FAQ

<FAQ>

<Question title="Czy next-intl jest wolniejszy niż Intlayer?">

Nie w czasie renderowania. Różnica polega na tym, co jest przesyłane do przeglądarki: `next-intl` kosztuje **+12.6 KB gzip** środowiska wykonawczego na każdej stronie i w standardowych konfiguracjach wysyła ~90% ciągów z innych stron wraz z każdą stroną. Przełączanie języka i hydratacja są porównywalne w Next.js (15-18 ms); w TanStack Start `use-intl` zajmuje 7-21 ms w porównaniu do 3-4 ms w Intlayer.

</Question>

<Question title="Czy mogę osiągnąć 0% wycieku z next-intl?">

Tak, dzięki konfiguracji `scoped-dynamic`: podziel `messages/{locale}.json` na jedną przestrzeń nazw na trasę, a następnie użyj `pick(messages, [...])` na każdej stronie i utrzymuj to mapowanie w miarę przesuwania komponentów. Wiersze `scoped-*` w benchmarku odzwierciedlają dokładnie tę pracę. Intlayer osiąga 0% domyślnie, ponieważ kompilator ogranicza treść do poziomu komponentu. Zobacz [optymalizacja paczki](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/bundle_optimization.md).

</Question>

<Question title="Czy muszę przepisywać komponenty, aby przeprowadzić migrację?">

Nie. `@intlayer/next-intl` zachowuje `useTranslations`, `getTranslations`, `useFormatter`, `t.rich()`, liczbę mnogą ICU oraz pomocniki nawigacji, udostępniając je ze skompilowanych słowników. Wystarczy jedna linijka wtyczki w `next.config.ts`. Krok po kroku w [przewodniku migracji next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/migration_from_next-intl_to_intlayer.md).

</Question>

<Question title="Czy Intlayer obsługuje ICU MessageFormat?">

Natywna obsługa ICU jest w trakcie opracowywania. Adaptery zgodności (`@intlayer/next-intl`, `@intlayer/use-intl`) w pełni obsługują ICU: liczba mnoga, `select`, `selectordinal`, `#` i `{ts, date, long}` przechodzą przez mechanizm ICU Intlayera. Szczegóły znajdziesz w [format wiadomości ICU](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en/icu_message_format.md).

</Question>

<Question title="Czy mogę zachować pliki messages/{locale}.json?">

Tak. [Wtyczka synchronizacji JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/compat/next-intl.md) odczytuje je, dzieli klucze najwyższego poziomu na słowniki i zapisuje tłumaczenia z powrotem do tych samych plików, gdy CLI lub CMS je aktualizuje. Przepływ pracy tłumaczy pozostaje bez zmian.

</Question>

</FAQ>

## Powiązane porównania

Ten sam benchmark, inne biblioteki:

- [i18next vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pl/i18next_vs_intlayer.md)
- [Lingui vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pl/lingui_vs_intlayer.md)
- [vue-i18n vs Intlayer benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pl/vue-i18n_vs_intlayer_benchmark.md)
- [next-i18next vs next-intl vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pl/next-i18next_vs_next-intl_vs_intlayer.md)
- [react-i18next vs react-intl vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pl/react-i18next_vs_react-intl_vs_intlayer.md)

Więcej o next-intl:

- [next-intl vs @intlayer/next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pl/next-intl_vs_intlayer-next-intl.md), adapter zmierzony na tej samej aplikacji
- [Is next-intl outdated?](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pl/is_next-intl_outdated.md)
- [Using Intlayer with next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pl/intlayer_with_next-intl.md)
- [How to internationalize a Next.js app with next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pl/i18n_using_next-intl.md)

Dokumentacja referencyjna:

- [Raport benchmarku Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/benchmark/nextjs.md) oraz [raport benchmarku TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/benchmark/tanstack.md)
- [Adapter zgodności: next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/compat/next-intl.md) oraz [przewodnik migracji](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/migration_from_next-intl_to_intlayer.md)
- [Optymalizacja paczki](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/bundle_optimization.md) oraz [kompilator Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/compiler.md)
- [i18n per-komponent vs scentralizowane](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pl/per-component_vs_centralized_i18n.md)
- [i18n oparte na kompilatorze vs deklaratywne](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pl/compiler_vs_declarative_i18n.md)

## Gwiazdki na GitHub

Gwiazdki na GitHub to silny wskaźnik popularności projektu, zaufania społeczności i długoterminowej perspektywy rozwoju.

[![Wykres historii gwiazdek](https://api.star-history.com/chart?repos=amannn%2Fnext-intl%2Caymericzip%2Fintlayer&type=date&legend=top-left)](https://star-history.com/#amannn/next-intl&aymericzip/intlayer)

## Podsumowanie

`next-intl` to solidna, dobrze utrzymywana biblioteka, a testy potwierdzają, że jest rozsądnym wyborem w świecie Next.js. Jednak scentralizowany model katalogów przerzuca całą odpowiedzialność za optymalizację na programistę: podstawowa konfiguracja powoduje wyciek około 90% treści z innych podstron, a sam runtime kosztuje +12.6 KB gzip na każdej stronie.

Intlayer przenosi tę pracę do kompilatora. Słowniki per komponent, leniwe ładowanie per język i usuwanie nieużywanych tłumaczeń to efekty procesu budowania. Rezultat w tej samej aplikacji: **+0.3 KB na stronę**, **0% wycieku**, komponenty **3x mniejsze** i przełączanie języka **2-4x szybsze** w TanStack Start.

Wszystkie surowe dane, aplikacje testowe i skrypty znajdują się w [repozytorium Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom).

Więcej szczegółów znajdziesz w dokumencie ['Dlaczego Intlayer?'](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/interest_of_intlayer.md).
