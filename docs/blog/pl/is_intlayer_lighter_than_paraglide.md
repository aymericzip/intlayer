---
createdAt: 2026-09-23
updatedAt: 2026-09-23
priority: 8
title: Czy Intlayer jest lżejszy niż Paraglide?
description: Paraglide wygląda na niemal bezkosztowy w benchmarkach i18n, ponieważ jego kod jest generowany bezpośrednio do Twojego repozytorium. Sprawdź, gdzie naprawdę trafia ta waga, dlaczego odczytywanie locale na każdy węzeł obciąża aplikację i jak dynamiczne ładowanie w Intlayer wysyła tylko jeden język zamiast wszystkich.
keywords:
  - Paraglide
  - Intlayer
  - Internacjonalizacja
  - i18n
  - Bundle size
  - Tree shaking
  - Benchmark
  - Blog
slugs:
  - blog
  - is-intlayer-lighter-than-paraglide
author: aymericzip
---

# Czy Intlayer jest lżejszy niż Paraglide?

Tak.

`Paraglide` cieszy się świetną reputacją najlżejszego rozwiązania i18n na rynku, a na pierwszy rzut oka [benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/benchmark/tanstack.md) zdaje się to potwierdzać: rozmiar jego biblioteki jest bliski zeru. Jednak rozmiar biblioteki równy zero wcale nie oznacza zero wysłanych bajtów. Oznacza to jedynie, że bajty znajdują się w miejscu, którego ten wskaźnik nie bada.

<TOC/>

## Kluczowe wnioski

**Rozmiar biblioteki jest ukryty, a nie usunięty:**

Paraglide generuje swój runtime i funkcje komunikatów bezpośrednio w Twojej bazie kodu. Ten kod trafia do przeglądarki, ale jest liczony jako _Twój_ kod, a nie kod biblioteki.

**Brak providera to pozorny zysk:**

Każde wywołanie `m.my_key()` samodzielnie rozpoznaje locale, odczytując plik cookie lub pamięć podręczną dla każdego renderowanego węzła, zamiast pobrać tę wartość raz z kontekstu.

**Brak dynamicznego ładowania:**

Paraglide importuje wszystkie wersje językowe komunikatu do Twojego bundle klienta. Intlayer z opcją `importMode: 'dynamic'` lub `'fetch'` ładuje wyłącznie aktualnie wyświetlane locale.

**Tree shaking nie jest gwarantowany:**

W niektórych z naszych benchmarków deklarowany przez Paraglide tree shaking nie przyniósł oczekiwanych rezultatów. Warto zweryfikować to we własnym bundle.

## Gdzie podziewa się waga Paraglide?

W raportach benchmarków metryka „rozmiar biblioteki” mierzy wielkość providera i hooków każdej biblioteki i18n w pustym komponencie, zanim dodana zostanie jakakolwiek treść.

| Biblioteka (TanStack Start)   | Rozmiar lib (gz) | Rozmiar lib (min) |
| ----------------------------- | ---------------- | ----------------- |
| `@inlang/paraglide-js@2.15.1` | 1.8 KB           | 4.5 KB            |
| `react-intlayer@9.5.1`        | 5.0 KB           | 15.2 KB           |

W oderwaniu od reszty aplikacji Paraglide wygrywa. Jednak Paraglide jest kompilatorem: odczytuje pliki `messages/*.json` i tworzy w Twoim repozytorium folder `paraglide/`, zawierający plik `runtime.js` (wykrywanie locale, strategie cookies i storage, lokalizacja adresów URL) oraz jedną funkcję JavaScript dla każdego komunikatu.

```bash
src/paraglide/
├── runtime.js      # wykrywanie locale, strategie, pomocniki URL
├── server.js
├── messages.js     # re-eksportuje wszystkie komunikaty
└── messages/
    ├── _index.js
    ├── en.js
    └── fr.js
```

Ponieważ ten kod znajduje się w Twoim folderze `src/` i jest importowany za pomocą ścieżki względnej, bundler przypisuje go do Twojej aplikacji, a nie do pakietu w `node_modules`. W kolumnie rozmiaru biblioteki nie pojawia się niemal nic, podczas gdy dokładnie ta sama logika nadal jest dostarczana w bundle Twojej strony.

Generowanie kodu samo w sobie nie jest złym pomysłem: wygenerowany runtime zawiera wyłącznie logikę wymaganą przez Twoją konfigurację (strategia prefiksów, cookie vs. local storage itp.). Intlayer osiąga ten sam cel w inny sposób: wstrzykując zmienne środowiskowe na etapie budowania, dzięki czemu bundler odrzuca gałęzie kodu, z których nie korzysta Twoja konfiguracja. Oba podejścia okazują się ostatecznie od 3 do 10 razy lżejsze niż `i18next` czy `next-intl`.

Sprawiedliwe porównanie nie dotyczy zatem rozmiaru samej biblioteki. Dotyczy **kodu JavaScript faktycznie przesyłanego na stronę**.

## Rzeczywista waga strony

Aplikacja TanStack Start, 10 stron, pomiar na trasach `en` oraz `fr`, kompresja gzip:

| Konfiguracja                       | Śr. JS strony (gz) | Ponad bazę  | Wyciek locale | Wyciek innych stron |
| ---------------------------------- | ------------------ | ----------- | ------------- | ------------------- |
| Baza (bez i18n)                    | 111.0 KB           | -           | 0.0%          | 0.0%                |
| `paraglide` (dowolna strategia)    | 125.1 KB           | +14.1 KB    | 49.7%         | 0.0%                |
| `intlayer` (`importMode: static`)  | 125.8 KB           | +14.8 KB    | 50.0%         | 0.0%                |
| `intlayer` (`importMode: dynamic`) | **118.6 KB**       | **+7.6 KB** | **0.0%**      | **0.0%**            |

Next.js 16 App Router, ta sama aplikacja:

| Konfiguracja     | Śr. JS strony (gz) | Ponad bazę  |
| ---------------- | ------------------ | ----------- |
| Baza (bez i18n)  | 141.0 KB           | -           |
| `paraglide-next` | 155.3 KB           | +14.3 KB    |
| `next-intlayer`  | **141.3 KB**       | **+0.3 KB** |

<I18nBenchmark framework="tanstack" vertical/>

> Kompletne dane zawiera [raport benchmarku TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/benchmark/tanstack.md) oraz [raport benchmarku Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/benchmark/nextjs.md). Każdy bundle można szczegółowo przeanalizować w [repozytorium benchmarku](https://github.com/intlayer-org/benchmark-i18n).

Uwagę zwracają dwa fakty:

- W trybie `static` Intlayer przesyła praktycznie taką samą ilość treści jak Paraglide (125.8 KB vs 125.1 KB). Jest to w pełni zrozumiałe: oba rozwiązania dołączają wszystkie wersje językowe komunikatów używanych na stronie.
- Paraglide pozostaje przy wadze 125.1 KB niezależnie od wybranej strategii, ponieważ nie oferuje trybu dynamicznego. Każdy wiersz w powyższej tabeli odpowiada ładowaniu statycznemu.

## Brak Providera: pozorna zaleta o ukrytym koszcie

Paraglide nie wymaga providera. Importujesz komunikat i wywołujesz go:

```tsx fileName="Hero.tsx"
import { m } from "../paraglide/messages.js";

export const Hero = () => (
  <section>
    <h1>{m.hero_title()}</h1>
    <p>{m.hero_description()}</p>
    <button>{m.hero_cta()}</button>
  </section>
);
```

Brak kontekstu, brak komponentu otaczającego, brak hooka. Wydaje się to prostsze. Jednak informacja o wybranym języku i tak musi skądś pochodzić. Każda wygenerowana funkcja komunikatu wygląda mniej więcej tak (postać uproszczona):

```js fileName="paraglide/messages/_index.js"
export const hero_title = (inputs = {}, options = {}) => {
  const locale = options.locale ?? getLocale(); // rozwiązywane przy każdym wywołaniu

  if (locale === "en") return en.hero_title(inputs);
  if (locale === "fr") return fr.hero_title(inputs);
  // ...po jednej gałęzi na każdy język
};
```

Funkcja `getLocale()` sprawdza po kolei skonfigurowane strategie (cookie, local storage, URL, domyślne locale), aby ustalić bieżący język. Oznacza to, że każdy renderowany węzeł tekstowy (`<>{m.my_key()}</>`) uruchamia własny proces rozpoznawania locale, co obejmuje odczyt `document.cookie` w przeglądarce. Strona z 200 przetłumaczonymi ciągami znaków wykonuje tę operację 200 razy podczas jednego renderowania, a następnie powtarza to przy każdym ponownym renderowaniu.

Biblioteka oparta na providerze odczytuje locale **dokładnie raz**, zapisuje je w kontekście (albo w sygnale czy store), a każdy węzeł pobiera wartość gotową już w pamięci. Provider kosztuje zaledwie kilkaset bajtów. Rezygnacja z niego kosztuje cykle procesora przy każdym renderze, co wyraźnie widać w wynikach benchmarku: czasy ładowania strony i przełączania języków w Paraglide na TanStack Start wyraźnie ustępują Intlayerowi (22.1 ms vs 14.6 ms przy ładowaniu strony, 4.3 ms vs 3.2 ms w reaktywności E2E).

## Doświadczenie programisty (DX)

Źródłem prawdy w Paraglide jest format JSON, ale programista nigdy nie importuje plików JSON bezpośrednio. Importuje wygenerowany plik `.js`:

<Tabs defaultTab="intlayer" group="techno">
  <Tab label="Paraglide" value="paraglide">

```json fileName="messages/en.json"
{
  "hero_title": "Ship your app in every language"
}
```

```json fileName="messages/pl.json"
{
  "hero_title": "Publikuj swoją aplikację w każdym języku"
}
```

```tsx fileName="Hero.tsx"
// Dostępne dopiero po ponownym wygenerowaniu przez kompilator z pliku JSON
import { m } from "../paraglide/messages.js";

export const Hero = () => <h1>{m.hero_title()}</h1>;
```

  </Tab>
  <Tab label="Intlayer" value="intlayer">

```ts fileName="Hero.content.ts"
import { t, type Dictionary } from "intlayer";

export default {
  key: "hero",
  content: {
    title: t({
      pl: "Publikuj swoją aplikację w każdym języku",
      en: "Ship your app in every language",
    }),
  },
} satisfies Dictionary;
```

```tsx fileName="Hero.tsx"
import { useIntlayer } from "react-intlayer";

export const Hero = () => {
  const { title } = useIntlayer("hero");

  return <h1>{title}</h1>;
};
```

  </Tab>
</Tabs>

Taki cykl pracy wiąże się z niedogodnościami:

- Każda zmiana w pliku JSON wymaga ponownej generacji, zanim import zostanie rozpoznany lub zaktualizują się typy.
- Wygenerowany folder `paraglide/` musi być zatwierdzany w gicie (co prowadzi do konfliktów scalania w wygenerowanych plikach przy każdym PR zmieniającym teksty) albo ignorowany (co wymaga kroku generowania przed każdym sprawdzaniem typów, testem i zadaniem CI).
- Każdy ciąg znaków staje się wywołaniem funkcji. Stałe zamieniają się w `m.key()` w całym kodzie, nawet tam, gdzie w zupełności wystarczyłaby zwykła wartość tekstowa.

## Tree Shaking: sprawdź swój bundle

Główną zaletą promowaną przez Paraglide jest to, że nieużywane komunikaty są usuwane przez tree shaking, ponieważ każdy komunikat stanowi niezależny eksport. W benchmarku Svelte + Vite rozwiązanie to działa zgodnie z zapowiedziami.

W innych środowiskach tak się jednak nie stało. W naszych testach [Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/benchmark/nextjs.md) strony Paraglide ważyły o 14 KB więcej niż aplikacja bazowa, podczas gdy `next-intlayer` dodał zaledwie 0.3 KB. Wcześniejsze pomiary na TanStack Start wykazały także, że komunikaty z innych podstron trafiały do bundle bieżącej trasy.

Skuteczność tree shakingu zależy od używanego bundlera (Turbopack, Rolldown, Rollup), sposobu importowania komunikatów (`import { m }` vs `import * as m`) oraz analizy efektów ubocznych. Wybierając Paraglide ze względu na rozmiar, warto otworzyć wizualizator bundle i sprawdzić, jak zachowuje się on w Twojej aplikacji.

## Brak dynamicznego ładowania

Oto fundamentalne ograniczenie architektoniczne. Paraglide nie udostępnia mechanizmu ładowania jednego języka na raz: każda funkcja komunikatu statycznie importuje implementację każdego języka, co sprawia, że wszystkie wersje językowe trafiają do bundle klienta.

Przy 2 językach marnuje się połowa przesyłanych danych tłumaczeń, co odpowiada zmierzonemu wyżej ~50% wyciekowi locale. Przy 10 językach marnuje się 90% danych. Przy 30 językach aż 97%.

Przejście na dynamiczne ładowanie również nie rozwiązałoby problemu: przy jednej funkcji na każdy komunikat leniwe ładowanie każdej z nich generowałoby tysiące zapytań sieciowych.

Intlayer pozwala na elastyczny wybór, globalnie lub na poziomie słownika:

```ts fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  dictionary: {
    importMode: "dynamic", // 'static' | 'dynamic' | 'fetch'
  },
};

export default config;
```

| `importMode` | Co jest przesyłane do klienta                          | W porównaniu z Paraglide           |
| ------------ | ------------------------------------------------------ | ---------------------------------- |
| `static`     | Wszystkie języki słowników używanych na stronie        | Teoretycznie identyczna wielkość   |
| `dynamic`    | Tylko bieżące locale, ładowane na żądanie dla słownika | **N razy lżejsze** przy N językach |
| `fetch`      | Tylko bieżące locale, pobierane przez Live Sync API    | **N razy lżejsze** przy N językach |

Dzięki [transformacji w trakcie budowy](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/bundle_optimization.md) oraz trybowi `importMode: 'static'`, Intlayer ładuje w teorii dokładnie tę samą zawartość co Paraglide. Z kolei przy `'dynamic'` lub `'fetch'` ładuje tylko to, czego potrzebuje aktualny język: w aplikacji obsługującej N języków rozmiar danych tłumaczeń jest N razy mniejszy niż w Paraglide.

## Kiedy Paraglide nadal ma sens?

<AccordionGroup>
<Accordion header="Svelte + Vite z niewielką liczbą języków">

Jeśli Twoim stosem technologicznym jest Svelte z Vite i obsługujesz dwa lub trzy języki, tree shaking działa zgodnie z oczekiwaniami, a narzut dodatkowych języków pozostaje niewielki.

</Accordion>
<Accordion header="Istniejący przepływ pracy oparty na inlang">

Jeśli Twój zespół aktywnie korzysta z ekosystemu inlang (Fink, Sherlock, wtyczki formatów komunikatów), Paraglide integruje się z nim natywnie.

</Accordion>
</AccordionGroup>

## Przetestuj na własnej aplikacji

Sprawdź wagę transferu i wycieki locale w swojej działającej aplikacji za pomocą bezpłatnego narzędzia [i18n SEO Scanner](https://intlayer.org/i18n-seo-scanner):

<ClickToOpenIframe src="https://intlayer.org/i18n-seo-scanner" width="100%" height="600px" style="border:none;"/>

Aby skonfigurować Intlayer:

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

## Przydatne materiały

- [Benchmark i18n TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/benchmark/tanstack.md)
- [Benchmark i18n Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/benchmark/nextjs.md)
- [Optymalizacja bundle i `importMode`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/bundle_optimization.md)
- [Jak wybrać bibliotekę i18n dla React](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pl/how_to_pick_react_i18n_library.md)
- [Zalety i wady internacjonalizacji opartej na kompilatorze](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pl/compiler_vs_declarative_i18n.md)
