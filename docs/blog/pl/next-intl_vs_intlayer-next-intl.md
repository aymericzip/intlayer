---
createdAt: 2026-09-13
updatedAt: 2026-09-22
title: "next-intl vs @intlayer/next-intl: Ten sam API, Inny Bundle"
description: Co się zmienia, gdy importy next-intl aplikacji Next.js są obsługiwane przez adapter kompatybilności @intlayer/next-intl. Rozmiar bundle'a, wyciek, rozmiar komponentu i hydratacja zmierzone na tym samym kodzie, plus co adapter zachowuje, ignoruje i nie może zastąpić.
keywords:
  - next-intl
  - use-intl
  - "@intlayer/next-intl"
  - Intlayer
  - Compat adapter
  - Migration
  - Internationalization
  - i18n
  - Benchmark
  - Bundle size
  - Blog
  - Next.js
  - TanStack Start
  - React
slugs:
  - blog
  - next-intl-vs-intlayer-next-intl
author: aymericzip
---

# next-intl VS @intlayer/next-intl | Ten sam API, Inny Bundle

![next-intl VS Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/assets/i18next-next-intl-intlayer.webp?raw=true)

`@intlayer/next-intl` jest adapterem kompatybilności: ekspozuje API `next-intl` (`useTranslations`, `getTranslations`, `useLocale`, `t.rich()`, plurale ICU, `NextIntlClientProvider`...) i serwuje go ze słowników skompilowanych przez Intlayer. Kod aplikacji nie zmienia się. Bundle się zmienia.

Artykuł porównuje oba na tej samej aplikacji Next.js, zbudowanej raz z `next-intl` i raz z adapterem. Liczby pochodzą z [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom), pakietu open-source'owego, który rejestruje to, co przeglądarka faktycznie pobiera. Jeśli chcesz porównania `next-intl` vs Intlayer jako bibliotek, przeczytaj [next-intl vs Intlayer](https://intlayer.org/blog/next-intl-vs-intlayer). Ten artykuł dotyczy tego, co adapter zmienia, gdy zachowujesz komponenty takimi, jakimi są.

<TOC/>

> **tl;dr**: Na tej samej aplikacji Next.js zamiana `next-intl` na `@intlayer/next-intl` zmniejszyła JavaScript na stronę z **153,6 KB do 147,5 KB** gzip, średni komponent z **21,8 KB do 8,1 KB**, wyciek stringów obcych stron z **~90% do 0%** i hydratację z **14,7 ms do 12,8 ms**, bez edycji żadnego komponentu. Na TanStack Start, równoważnik `use-intl` (`@intlayer/use-intl`) zmniejszył komponenty z **76-87 KB do 9-11 KB** i przełączanie lokalizacji z **7-21 ms do 4-9 ms**. Adapter kosztuje **8,0 KB** runtime w porównaniu do **14,7 KB** dla `next-intl` i **5,5 KB** dla natywnego `next-intlayer`. Nawigacja i middleware są ponownie implementowane na konfiguracji routingu Intlayer; zlokalizowane `pathnames` to jedyna funkcja, która nie została przeniesiona.

## Co to jest `@intlayer/next-intl`

`next-intl` to runtime: `getRequestConfig` ładuje `messages/{locale}.json` dla każdego request'u, `NextIntlClientProvider` wysyła go na klienta, a `useTranslations("about")` czyta klucze z tego obiektu w momencie renderowania. Każda optymalizacja (namespaces, `pick(messages, [...])` na stronę, lazy loading) to Twoja odpowiedzialność.

`@intlayer/next-intl` zachowuje pierwszą i ostatnią część tego łańcucha i zastępuje środkową. Twoje komponenty nadal wywołują `useTranslations("about")`; to, co otrzymują, pochodzi ze słownika Intlayer skompilowanego w czasie budowy, ograniczonego do tego komponentu, tylko w aktywnym języku.

Trzy mechanizmy sprawiają, że to działa:

1. **Import aliasing.** `createNextIntlPlugin()` z `@intlayer/next-intl/plugin` owija `withIntlayer` i dodaje aliasy Webpack / Turbopack, aby `next-intl`, `next-intl/server`, `next-intl/navigation` i `next-intl/middleware` rezolwowały się do `@intlayer/next-intl`. Żaden import w Twojej codebase nie zostaje przemianowany.
2. **JSON jako źródło prawdy.** Plugin `syncJSON` czyta istniejący plik `messages/{locale}.json`, dzieli jego klucze najwyższego poziomu na jeden słownik na namespace i zapisuje tłumaczenia z powrotem do tych samych plików, gdy CLI lub CMS je aktualizuje. Przepływ pracy tłumaczy pozostaje niezmieniony.
3. **Call-site binding.** Intlayer optimize pass (Babel lub SWC) przepisuje `useTranslations("about")` na wywołanie, które otrzymuje słownik `about` bezpośrednio. Komponent nie sięga już globalnego drzewa wiadomości; sięga własnej zawartości.

```tsx fileName="app/[locale]/about/page.tsx"
// Twój kod, bez zmian
import { useTranslations } from "next-intl";

const AboutPage = () => {
  const t = useTranslations("about");
  return <h1>{t("title")}</h1>;
};
```

```tsx fileName="Co kompilator emituje (uproszczone)"
import _dicHash_about from "../.intlayer/dictionaries/about.mjs";
import { useDictionary as useTranslations } from "@intlayer/next-intl";

const AboutPage = () => {
  const t = useTranslations(_dicHash_about);
  return <h1>{t("title")}</h1>;
};
```

To przepisanie jest powodem, dla którego kolumny rozmiaru komponentu i page-leakage poniżej się przesuwają: strona pobiera tylko słowniki komponentów, które renderuje, i tylko w locale'u, który jest serwowany.

## Co adapter zachowuje, ignoruje i nie zastępuje

| `next-intl` API                                                      | Z `@intlayer/next-intl`                                                                                                               |
| -------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `useTranslations("ns")` / `getTranslations("ns")`                    | ✅ Zachowane. Powiązane ze słownikiem `ns` w czasie budowania. Klucze są typowane względem Twojej zawartości.                         |
| `getTranslations({ locale, namespace })`                             | ✅ Zachowane                                                                                                                          |
| `t("key", { name })`, `t.rich()`, `t.markup()`, `t.raw()`            | ✅ Zachowane. ICU plurals, `select`, `selectordinal`, `#`, `{ts, date, long}` przechodzą przez resolver ICU Intlayera                 |
| `useLocale()` / `getLocale()` / `setRequestLocale()` / `setLocale`   | ✅ Zachowane                                                                                                                          |
| `useFormatter()`                                                     | ✅ Zachowane. `dateTime`, `number`, `relativeTime`, `list`, `dateTimeRange` łączą się z natywnym `Intl`                               |
| `NextIntlClientProvider`                                             | ✅ Zachowane. Właściwości `messages`, `timeZone` i `now` są **akceptowane, ale ignorowane** (ostrzeżenie dev Cię o tym powiadomi)     |
| `getMessages()`                                                      | ✅ Zachowane dla zgodności; już nie potrzebne                                                                                         |
| `getRequestConfig()` w `src/i18n.ts`                                 | ⚠️ Nie potrzebne. Słowniki są kompilowane w czasie budowania; nie ma ładowania wiadomości per-request                                 |
| `defineRouting()`                                                    | ✅ Zachowane. Pominięte pola (`locales`, `defaultLocale`, `localePrefix`) są odczytywane z `intlayer.config.ts`                       |
| `createNavigation()`, `Link`, `redirect`, `usePathname`, `useRouter` | ✅ Zachowane. Ponownie zaimplementowane na konfiguracji routingu Intlayera; argument `routing` jest akceptowany, ale ignorowany       |
| `pathnames` (zlokalizowane nazwy tras)                               | ❌ Akceptowane do typowania, **nie interpolowane**. Zachowaj zwykłe ścieżki lub przenieś to mapowanie do `rewrite` Intlayera          |
| `createMiddleware()`                                                 | ✅ Zachowane. Zwraca proxy Intlayera; ustawia cookie `NEXT_LOCALE`, dzięki czemu `useLocale()` i twój przełącznik działają prawidłowo |
| `NEXT_LOCALE` cookie                                                 | ✅ Odczytywane domyślnie (chyba że sam skonfigurujesz `routing.storage`)                                                              |
| Bare `useTranslations()` z bez namespace'u                           | ⚠️ Działa, ale call site nie jest powiązany: rozwiązuje się przez runtime registry. Przekaż namespace, aby uzyskać bundle gains       |

## Benchmark

### Co było mierzone

Suite [Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom) buduje **tę samą aplikację** z każdą konfiguracją: **10 stron** (home, about, blog, careers, contact, FAQ, pricing, products, settings, team), **10 locale'i** (`en`, `fr`, `es`, `de`, `it`, `pt`, `zh`, `ja`, `ko`, `ru`), identyczne komponenty i identyczną zawartość. Strony są mierzone w `en` i `fr`.

`next-intl` został zbudowany w czterech strategiach ładowania, od naiwnego ustawienia (całe `messages/{locale}.json` ładowane) do optymalnego (jedna namespace per route + per-page `pick()`). Adapter został zbudowany na **tych samych komponentach co naiwne ustawienie**, ze zmienionymi tylko `next.config.ts` i `intlayer.config.ts`. Nie ma wariantu "scoped": kompilator scopes content per komponent, więc jego rzędy `static` i `dynamic` są już scoped.

Dla każdego buildu suite rejestruje:

- **Lib size**: gzip rozmiar pustego komponentu, który tylko importuje bibliotekę i18n. Stały koszt runtime.
- **Page JS**: gzip JavaScript pobrany per page, uśredniony na wszystkich stronach i locale'ach.
- **Locale leak %**: udział przetłumaczonych ciągów znalezionych w pobranym JS, które należą do locale'a, które użytkownik **nie** przegląda.
- **Page leak %**: udział przetłumaczonych ciągów znalezionych w pobranym JS, które należą do strony, na której użytkownik **nie** jest.
- **Component avg**: średni rozmiar gzip każdego komponentu skompilowanego w izolacji. Pokazuje, ile i18n runtime i katalogu jeden komponent pociąga za sobą.
- **E2E reactivity**: czas rzeczywisty między wybraniem nowego locale a aktualizacją `html[lang]` w DOM (Playwright, 5 iteracji).
- **Hydration**: czas trwania fazy hydratacji React.

> Liczby poniżej pochodzą z uruchomienia z daty **2026-09-12** z `next-intl` / `use-intl` 4.14.2 i `@intlayer/*` 9.5.1. Aplikacja testowa jest celowo mała (kilkadziesiąt stringów na locale), więc procenty wycieków opisują **wzorzec**: rosną wraz z twoją zawartością, podczas gdy koszt runtime pozostaje stały.

### Wyniki na Next.js

Wybierz metryki i biblioteki, które Cię interesują:

<I18nBenchmark framework="nextjs" vertical/>

| Setup                     | Strategy       | Lib size (gz) | Page JS avg (gz) | Locale leak | Page leak | Component avg (gz) | E2E reactivity |   Hydration |
| ------------------------- | -------------- | ------------: | ---------------: | ----------: | --------: | -----------------: | -------------: | ----------: |
| **base** (no i18n)        | -              |        0.0 KB |         141.0 KB |        0.0% |      0.0% |             0.9 KB |        13.4 ms |     11.8 ms |
| `next-intl`               | static         |       14.7 KB |         153.6 KB |        4.2% |     89.8% |            21.8 KB |        16.0 ms |     14.7 ms |
| `next-intl`               | dynamic        |       14.7 KB |         153.6 KB |        9.7% |     89.9% |            21.8 KB |        15.6 ms |     14.8 ms |
| `next-intl`               | scoped-static  |       14.7 KB |         153.6 KB |        0.0% |      0.0% |            80.1 KB |        17.9 ms |     17.4 ms |
| `next-intl`               | scoped-dynamic |       14.7 KB |         153.6 KB |        0.0% |      0.0% |            22.9 KB |        17.8 ms |     16.8 ms |
| **`@intlayer/next-intl`** | static         |    **8.0 KB** |     **147.5 KB** |    **0.0%** |  **0.0%** |         **8.1 KB** |    **14.5 ms** | **12.8 ms** |
| **`@intlayer/next-intl`** | dynamic        |    **8.0 KB** |     **148.7 KB** |    **0.0%** |  **0.0%** |         **8.1 KB** |    **11.7 ms** | **12.8 ms** |
| `next-intlayer` (native)  | static         |        5.5 KB |         141.3 KB |        0.0% |      0.0% |             8.5 KB |        15.5 ms |     16.9 ms |
| `next-intlayer` (native)  | dynamic        |        5.5 KB |         141.3 KB |        0.0% |      0.0% |             6.9 KB |        15.3 ms |     15.9 ms |

**Jak to czytać**

- **Te same komponenty, 6 KB mniej na stronę.** Adapter build naiwnej aplikacji wynosi **147.5 KB**, poniżej każdej konfiguracji `next-intl`, włącznie w pełni zoptymalizowaną (153.6 KB). Samo runtime stanowi różnicę: 8.0 KB versus 14.7 KB, płacone na każdej stronie.
- **Wyciek spada do 0% bez dotykania komponentu.** Naiwna konfiguracja `next-intl` wysyła ~90% stringów obcych stron na każdej stronie. Osiągnięcie 0% z `next-intl` oznacza konfiguracje `scoped-*`: jeden namespace na trasę i `pick(messages, [...])` na każdej stronie. Adapter osiąga 0% z naiwnego kodu, ponieważ pass optymalizacyjny wiąże każdy `useTranslations("ns")` z jego własnym słownikiem.
- **Komponenty się zmniejszają 2,7x.** Komponent skompilowany w izolacji średnio **21,8 KB** z `next-intl` (osiąga dostawcę i drzewo wiadomości) i **8,1 KB** z adapterem. W konfiguracji `scoped-static` `next-intl` ta liczba _wzrasta_ do 80 KB, ponieważ plik namespace każdej trasy staje się osiągalny ze strony, która go wybiera.
- **Hydration jest o 2 ms szybsza** (12.8 vs 14.7 ms): nie ma obiektu komunikatów do deserializacji z payloadu RSC, zanim React będzie mógł się nawodnić.
- **Adapter nie jest natywnym runtime'em.** `next-intlayer` siedzi na **141.3 KB**, +0.3 KB ponad aplikację bazową, z runtime'em 5.5 KB. Adapter nosi API surface `next-intl` (`useFormatter`, `t.rich`, ICU resolver) na szczycie Intlayer'owego core'u, stąd 8.0 KB i +6 KB na stronę. To most, a nie miejsce docelowe.

<ClickToOpenIframe
src="https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-nextjs.md"
width="100%"
height="600px"
style="border:none;"
/>

> Pełna tabela, każda biblioteka i każda strategia, w [raporcie benchmarku Next.js](https://intlayer.org/pl/doc/benchmark/nextjs).

### Wyniki na TanStack Start (`use-intl`)

`use-intl` to framework-agnostyczne jądro `next-intl`. Jego adapter, `@intlayer/use-intl`, podąża za tym samym projektem z pluginem Vite (`@intlayer/use-intl/plugin`).

| Konfiguracja             | Strategia      | Rozmiar lib (gz) | Średni JS strony (gz) | Wyciek locale | Wyciek strony | Średni komponent (gz) | Reaktywność E2E |   Hydration |
| ------------------------ | -------------- | ---------------: | --------------------: | ------------: | ------------: | --------------------: | --------------: | ----------: |
| **base** (bez i18n)      | -              |           0.0 KB |              111.0 KB |          0.0% |          0.0% |                0.7 KB |          8.1 ms |     21.6 ms |
| `use-intl`               | static         |          14.1 KB |              179.8 KB |         50.0% |         89.8% |               76.0 KB |          6.7 ms |     15.3 ms |
| `use-intl`               | dynamic        |          14.1 KB |              119.4 KB |          0.0% |         89.8% |               75.9 KB |          7.0 ms |     15.4 ms |
| `use-intl`               | scoped-static  |          14.1 KB |              128.7 KB |          0.0% |          0.0% |               87.1 KB |         20.9 ms |     24.8 ms |
| `use-intl`               | scoped-dynamic |          14.1 KB |              128.7 KB |          0.0% |          0.0% |               87.1 KB |         13.3 ms |     25.9 ms |
| **`@intlayer/use-intl`** | static         |       **7.3 KB** |              135.8 KB |         49.7% |      **0.0%** |           **10.9 KB** |      **4.2 ms** | **10.5 ms** |
| **`@intlayer/use-intl`** | dynamic        |       **7.3 KB** |          **129.7 KB** |      **0.0%** |      **0.0%** |            **9.3 KB** |      **8.7 ms** |     16.1 ms |
| `intlayer` (native)      | static         |           5.0 KB |              125.8 KB |         50.0% |          0.0% |                8.1 KB |          3.2 ms |     11.5 ms |
| `intlayer` (native)      | dynamic        |           5.0 KB |              118.6 KB |          0.0% |          0.0% |                6.3 KB |          3.6 ms |     14.1 ms |

**Jak to czytać**

- **Bajty na stronę są porównywalne z optymalizowanym `use-intl`.** `@intlayer/use-intl` w trybie `dynamic` (129.7 KB) mieści się w 1 KB `use-intl`'s `scoped-dynamic` (128.7 KB) i 10 KB _powyżej_ zwykłego `use-intl`'s `dynamic` (119.4 KB). Ten zwykły wiersz `dynamic` nadal powoduje przeciek 90% ciągów ze stron obcych; liczba bajtów jest niska, ponieważ aplikacja testowa ma małą zawartość. Adapter's 0% to to, co pozostaje stałe wraz ze wzrostem zawartości.
- **Komponenty są 7-9 razy mniejsze.** Komponenty `use-intl` średnio wynoszą **76-87 KB** w każdej strategii, ponieważ `useTranslations` jest powiązany z całym obiektem wiadomości providera. Adapter średnio wynosi **9-11 KB**.
- **Przełączanie lokalizacji jest szybsze.** Zoptymalizowane konfiguracje `use-intl` zajmują **13-21 ms** na aktualizację `html[lang]`; adapter zajmuje **4-9 ms**. Mniej komponentów się re-renderuje i nic nie jest pobierane ponownie z drzewa wiadomości.
- **`static` zachowuje każdą lokalizację.** Wiersz `static` adaptera pokazuje 49,7% wycieków lokalizacji, tak samo jak natywny Intlayer w trybie `static`: wszystkie lokalizacje są pakowane, tylko słowniki strony. Jedna linia konfiguracji (`importMode: 'dynamic'`) ją usuwa.

<ClickToOpenIframe
src="https://intlayer.org/markdown?url=https%3A%2F%2Fraw.githubusercontent.com%2Fintlayer-org%2Fbenchmark-i18n%2Fmain%2Freport%2Fscripts%2Fsummarize-tanstack.md"
width="100%"
height="600px"
style="border:none;"
/>

> Pełna tabela w [raporcie benchmarku TanStack Start](https://intlayer.org/pl/doc/benchmark/tanstack).

## Dlaczego liczby się zmieniają

![The Intlayer compiler extracts content from components](https://github.com/aymericzip/intlayer/blob/main/docs/assets/compiler.webp?raw=true)

Nic w komponencie się nie zmieniło, więc zyski pochodzą całkowicie z tego, do czego `useTranslations` jest powiązany.

**Z `next-intl`**, binding jest dostawcą. `NextIntlClientProvider` otrzymuje cały obiekt `messages` dla locale'a; każdy `useTranslations("about")` czyta z niego. Bundler widzi jeden komponent importujący jeden hook, który czyta jeden context, i nie może wiedzieć, że używana jest tylko gałąź `about`. Trasy poniżej dzielą się tym samym obiektem message'a, więc kolumna page-leak czyta ~90% aż do czasu, gdy samodzielnie podzielisz plik, a narzut rośnie na dwóch osiach jednocześnie, stron i języków:

![Theoretical content leakage by architecture](https://github.com/aymericzip/intlayer/blob/main/docs/assets/theorical_content_leakage.webp?raw=true)

```bash
.
├── messages
│   ├── en.json                       # każda przestrzeń nazw, każda strona
│   └── fr.json
└── src
    ├── i18n.ts                       # getRequestConfig({ messages: await import(...) })
    ├── middleware.ts                 # createMiddleware(routing)
    └── app/[locale]
        ├── layout.tsx                # <NextIntlClientProvider messages={messages}>
        └── about/page.tsx            # useTranslations("about")
```

**Z `@intlayer/next-intl`**, wiązanie to słownik. `syncJSON` zamienia `messages/en.json` w jeden słownik na każdy klucz najwyższego poziomu; kompilator rozpoznaje, który komponent wywołuje `useTranslations("about")` i bezpośrednio przekazuje mu `about` w aktywnym locale, jako import, który bundler może śledzić i dzielić.

```bash
.
├── intlayer.config.ts                # syncJSON({ source: ({ locale }) => `./messages/${locale}.json` })
├── messages
│   ├── en.json                       # unchanged, wciąż źródło prawdy
│   └── fr.json
├── .intlayer/                        # generated: jeden słownik na namespace, na locale
└── src
    ├── middleware.ts                 # createMiddleware() zwraca teraz proxy Intlayera
    └── app/[locale]
        ├── layout.tsx                # <NextIntlClientProvider> (bez props messages)
        └── about/page.tsx            # useTranslations("about")  ← bez zmian
```

`src/i18n.ts` i props `messages` znikają. Wszystko inne pozostaje identyczne.

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

Polecenie wykrywa `next-intl` i instaluje `intlayer`, `next-intlayer`, `@intlayer/next-intl` i `@intlayer/sync-json-plugin`. Zachowaj `next-intl` zainstalowany: jest to peer dependency adaptera i dostarcza typy.

</Step>
<Step number={2} title="Wskaż Intlayer na twoje wiadomości">

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  dictionary: {
    // "static" pakuje każdą locale; "dynamic" ładuje aktywną na żądanie
    importMode: "dynamic",
  },
  plugins: [
    syncJSON({
      // Placeholdery ICU: {name}, {count, plural, one {# item} other {# items}}
      format: "icu",
      source: ({ locale }) => `./messages/${locale}.json`,
      location: "messages",
    }),
  ],
};

export default config;
```

Plik `messages/{locale}.json` pozostaje w swoim miejscu. Każdy klucz na najwyższym poziomie staje się słownikiem; `useTranslations("about")` mapuje do słownika `about`.

</Step>
<Step number={3} title="Otocz next.config.ts">

```ts fileName="next.config.ts"
import type { NextConfig } from "next";
import { createNextIntlPlugin } from "@intlayer/next-intl/plugin";

const withIntlayer = createNextIntlPlugin();

const nextConfig: NextConfig = {};

export default withIntlayer(nextConfig);
```

`createNextIntlPlugin()` komponuje `withIntlayer` (śledzenie zawartości, kompilacja słownika, przebieg optymalizacji) oraz aliasy `next-intl` → `@intlayer/next-intl` dla Webpack i Turbopack. Zbuduj, a liczby w tabelach powyżej będą Twoje.

</Step>
</Steps>

### Co możesz usunąć później

| Plik / wzorzec                               | Dlaczego                                                                                                                       |
| -------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `getRequestConfig` w `src/i18n.ts`           | Brak ładowania wiadomości dla poszczególnych żądań. Zachowaj plik tylko, jeśli eksportuje również pomocniki `createNavigation` |
| `messages={...}` na `NextIntlClientProvider` | Adapter odczytuje skompilowane wyjście; właściwość jest ignorowana i loguje ostrzeżenie w trakcie developmentu                 |
| `await getMessages()` w layoutach            | Z tego samego powodu                                                                                                           |
| Per-page `pick(messages, [...])`             | Compiler dokonuje wyboru, per component                                                                                        |

### Co zyskujesz poza bajtami

- **Typed keys.** `useTranslations("about")` jest typizowany względem skompilowanego słownika `about`. `t("does.not.exist")` to błąd TypeScript, nie fallback w runtime.
- **`npx intlayer test`** nie powiedzie się w CI, gdy w lokalizacji brakuje klucza. **`npx intlayer fill`** tłumaczy brakujące klucze za pomocą wybranego przez Ciebie dostawcy (OpenAI, Anthropic, Mistral, Gemini...) używając Twojego własnego klucza i zapisuje wynik z powrotem do `messages/{locale}.json`.
- **Visual Editor i CMS** pracują na tych samych słownikach, dzięki czemu osoby niebędące developerami mogą edytować `messages/fr.json` przez UI i plik się aktualizuje.
- **Stopniowe przejście do `.content.ts`.** Każdy komponent może przejść z `useTranslations("about")` na `useIntlayer("about")` z towarzyszącym plikiem content, jeden po jednym. Słowniki JSON i `.content.ts` współistnieją i się łączą.

## Ograniczenia, które warto znać przed rozpoczęciem

<AccordionGroup>
<Accordion header="Konfiguracja routingu przenosi się do intlayer.config.ts">

`createNavigation(routing)` i `createMiddleware(routing)` zachowują sygnatury, ale ignorują argument: języki, język domyślny i strategia prefiksów pochodzą z konfiguracji `routing` Intlayer. Jeśli używasz zlokalizowanych `pathnames` z `next-intl` (`/about` na `/a-propos`), adapter ich nie interpoluje; `routing.rewrite` w Intlayer obsługuje ten przypadek, ale jest osobną zmianą.

</Accordion>
<Accordion header="useTranslations() bez przestrzeni nazw nie jest powiązane">

Faza optymalizacji wymaga statycznej przestrzeni nazw, aby wiedzieć, który słownik zaimportować. Wywołanie bez namespace nadal działa poprzez rejestr runtime odwołujący się do każdego słownika, co stanowi dokładnie ten wyciek, który próbowano wyeliminować. Przekaż przestrzeń nazw.

</Accordion>
<Accordion header="Adapter nie jest darmowy">

8.0 KB runtime w porównaniu z 5.5 KB dla `next-intlayer` i +6-7 KB na stronę względem kompilacji natywnej. Płaci za powierzchnię API `next-intl`. Kiedy każdy komponent przejdzie na `useIntlayer`, usuń adapter.

</Accordion>
<Accordion header="messages, timeZone i now w providerze są ignorowane">

Formatery opierają się na natywnym `Intl` i tylko język wpływa na ich wynik. Jeśli polegasz na wymuszonej strefie czasowej lub stałym `now` dla stabilnych dat przy hydratacji, obsłuż to w miejscu wywołania. Zobacz [formatowanie daty, czasu i liczb](https://intlayer.org/pl/blog/date-time-number-formatting-locales).

</Accordion>
</AccordionGroup>

## Kiedy używać którego?

<AccordionGroup>
<Accordion header="Zostań przy next-intl">

Twoja aplikacja jest mała, rozmiar paczki nie stanowi problemu, a zespół bez problemu radzi sobie z zarządzaniem przestrzeniami nazw i `pick()` na stronę.

</Accordion>
<Accordion header="Użyj @intlayer/next-intl">

Używasz dziś `next-intl` i chcesz uzyskać korzyści w rozmiarze bundle, braku wycieków, szybszej hydratacji, typowanych kluczach i narzędziach CLI / CMS bez przepisywania kodu. To zalecany punkt wyjścia dla każdej istniejącej bazy kodu `next-intl`.

</Accordion>
<Accordion header="Przejdź na rozwiązanie natywne (next-intlayer)">

Dla nowych projektów lub po zakończeniu etapu przejściowego z adapterem. Jest najlżejszy z całej trójki (5.5 KB, +0.3 KB na stronę) i odblokowuje synchroniczne komponenty serwerowe, pliki `.content.ts` dla każdego komponentu oraz pełen zestaw funkcji. Zacznij od [Intlayer z Next.js](https://intlayer.org/pl/doc/environment/nextjs).

</Accordion>
</AccordionGroup>

## FAQ

<FAQ>

<Question title="Czy kod mojej aplikacji naprawdę pozostaje nienaruszony?">

W Next.js tak dla komponentów: build benchmarku zmienił tylko `next.config.ts` i `intlayer.config.ts`. `getRequestConfig` w `src/i18n.ts`, prop `messages` w providerze oraz wywołania `pick()` stają się martwym kodem, który można potem usunąć.

</Question>

<Question title="Co dzieje się z komunikatami ICU?">

Nadal działają. `t("key", { count })`, `t.rich()`, `t.markup()`, `select`, `selectordinal`, `#` oraz `{ts, date, long}` są przetwarzane przez mechanizm ICU Intlayer. Zobacz [format wiadomości ICU](https://intlayer.org/pl/blog/icu-message-format).

</Question>

<Question title="Dlaczego adapter jest cięższy niż natywny next-intlayer?">

Niesie ze sobą powierzchnię API `next-intl` na bazie rdzenia Intlayer: `useFormatter`, `t.rich`, resolver ICU, pomocników nawigacji. To 8.0 KB w porównaniu do 5.5 KB i +6 KB na stronę. To most, a nie cel ostateczny.

</Question>

<Question title="Czy mogę migrować komponent po komponencie?">

Tak. Każdy komponent może przejść z `useTranslations("about")` na `useIntlayer("about")` z umieszczonym obok plikiem `.content.ts`. Słowniki JSON i `.content.ts` współistnieją i łączą się.

</Question>

<Question title="Czy działają zlokalizowane ścieżki (pathnames)?">

Nie przez `pathnames` z `next-intl`: adapter akceptuje je do typowania, ale ich nie interpoluje. Zamiast tego użyj `routing.rewrite` z Intlayer.

</Question>

</FAQ>

## Powiązane porównania

Ta sama seria adapterów:

- [i18next vs @intlayer/i18next](https://intlayer.org/pl/blog/i18next-vs-intlayer-i18next)
- [Lingui vs @intlayer/lingui](https://intlayer.org/pl/blog/lingui-vs-intlayer-lingui)
- [vue-i18n vs @intlayer/vue-i18n](https://intlayer.org/pl/blog/vue-i18n-vs-intlayer-vue-i18n)

Bezpośrednie porównanie bibliotek:

- [next-intl vs Intlayer](https://intlayer.org/pl/blog/next-intl-vs-intlayer), ten sam benchmark
- [next-i18next vs next-intl vs Intlayer](https://intlayer.org/pl/blog/next-i18next-vs-next-intl-vs-intlayer)
- [Is next-intl outdated?](https://intlayer.org/pl/blog/is-next-intl-outdated)

Dokumentacja referencyjna:

- [Compat adapter: next-intl](https://intlayer.org/pl/doc/compatibility/next-intl)
- [Przewodnik migracji: z next-intl do Intlayer](https://intlayer.org/pl/doc/migration/next-intl)
- [Raport benchmarku Next.js](https://intlayer.org/pl/doc/benchmark/nextjs) i [raport benchmarku TanStack Start](https://intlayer.org/pl/doc/benchmark/tanstack)
- [Optymalizacja bundle](https://intlayer.org/pl/doc/concept/bundle-optimization) i [kompilator Intlayer](https://intlayer.org/pl/doc/compiler)
- [Edytor Wizualny](https://intlayer.org/pl/doc/concept/editor), [CMS](https://intlayer.org/pl/doc/concept/cms) i [tłumaczenie AI](https://intlayer.org/pl/doc/concept/auto-fill)

## Podsumowanie

`@intlayer/next-intl` robi jedną rzecz: zmienia to, do czego `useTranslations` jest powiązany, z providera zawierającego każdą wiadomość na słownik skompilowany dla tego komponentu. Na tej samej aplikacji Next.js, która wynosi **6 KB na stronę**, **komponenty 2,7x mniejsze**, **0% wycieków** i **2 ms hydratacji**, zanim ktokolwiek otworzy plik komponentu. Nawigacja i middleware zachowują swój API na podstawie konfiguracji routingu Intlayer, a natywny runtime `next-intlayer` pozostaje jeszcze lżejszy.

Wszystkie surowe dane, aplikacje testowe i skrypty znajdują się w [repozytorium Benchmark Bloom](https://github.com/intlayer-org/benchmark-bloom). Uruchom je sam.

Zapoznaj się z dokumentem ['Why Intlayer?'](https://intlayer.org/doc/why) aby uzyskać więcej szczegółów.
