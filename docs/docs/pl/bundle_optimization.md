---
createdAt: 2025-11-25
updatedAt: 2026-06-07
title: Optymalizacja Rozmiaru Paczki i Wydajności i18n
description: Zmniejsz rozmiar paczki swojej aplikacji, optymalizując treści umiędzynarodowienia (i18n). Dowiedz się, jak wykorzystać tree shaking i leniwe ładowanie (lazy loading) dla słowników dzięki Intlayer.
keywords:
  - Optymalizacja Paczki
  - Automatyzacja Treści
  - Dynamiczne Treści
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - bundle-optimization
history:
  - version: 8.12.0
    date: 2026-06-07
    changes: "Dodano `intlayerPurgeBabelPlugin` i `intlayerMinifyBabelPlugin` dla Babel/Webpack; wyjaśnienie działania przepływu wtyczek (pipeline)"
  - version: 8.7.0
    date: 2026-04-08
    changes: "Dodano opcje `minify` i `purge` do konfiguracji budowania"
author: aymericzip
---

# Optymalizacja Rozmiaru Paczki i Wydajności i18n

Jednym z najczęstszych wyzwań w tradycyjnych rozwiązaniach i18n opartych na plikach JSON jest zarządzanie rozmiarem treści. Jeśli programiści nie rozdzielą treści na przestrzenie nazw (namespaces) ręcznie, użytkownicy często pobierają tłumaczenia dla każdej strony i potencjalnie każdego języka, tylko po to, aby wyświetlić pojedynczą stronę.

Na przykład, aplikacja z 10 stronami przetłumaczonymi na 10 języków może spowodować, że użytkownik pobierze zawartość 100 stron, chociaż potrzebuje tylko **jednej** (bieżącej strony w bieżącym języku). Prowadzi to do marnowania przepustowości i wolniejszego ładowania.

**Intlayer rozwiązuje ten problem poprzez optymalizację w czasie budowania.** Analizuje on Twój kod, aby wykryć, które słowniki są faktycznie używane w poszczególnych komponentach, i wprowadza do paczki (bundle) tylko niezbędne treści.

## Spis Treści

<TOC />

## Przeanalizuj swoją paczkę

Analiza paczki jest pierwszym krokiem do zidentyfikowania "ciężkich" plików JSON i możliwości dzielenia kodu (code-splitting). Narzędzia te generują wizualną mapę drzewa (treemap) skompilowanego kodu aplikacji, co pozwala precyzyjnie zobaczyć, które biblioteki zajmują najwięcej miejsca.

<Tabs>
 <Tab value="vite">

### Vite / Rollup

Vite pod maską korzysta z Rollup. Wtyczka `rollup-plugin-visualizer` generuje interaktywny plik HTML, który pokazuje rozmiar każdego modułu w grafie.

```bash
npm install -D rollup-plugin-visualizer
```

```typescript fileName="vite.config.ts"
import { defineConfig } from "vite";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
  plugins: [
    visualizer({
      open: true, // Automatycznie otwórz raport w przeglądarce
      filename: "stats.html",
      gzipSize: true,
      brotliSize: true,
    }),
  ],
});
```

 </Tab>
 <Tab value="nextjs (turbopack)">

### Next.js (Turbopack)

Dla projektów korzystających z App Routera i Turbopack, Next.js oferuje wbudowany, eksperymentalny analizator, który nie wymaga dodatkowych zależności.

```bash packageManager='npm'
npx next experimental-analyze
```

```bash packageManager='yarn'
yarn next experimental-analyze
```

```bash packageManager='pnpm'
pnpm next experimental-analyze
```

```bash packageManager='bun'
bun next experimental-analyze
```

 </Tab>
 <Tab value="nextjs (Webpack)">

### Next.js (Webpack)

Jeśli w Next.js korzystasz z domyślnego bundlera Webpack, użyj oficjalnego bundle analyzera. Aktywuje się go, ustawiając odpowiednią zmienną środowiskową w trakcie budowania.

```bash packageManager='npm'
npm install -D @next/bundle-analyzer
```

```bash packageManager='yarn'
yarn add -D @next/bundle-analyzer
```

```bash packageManager='pnpm'
pnpm add -D @next/bundle-analyzer
```

```bash packageManager='bun'
bun add -d @next/bundle-analyzer
```

```javascript fileName="next.config.js"
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer({
  // Twoja konfiguracja Next.js
});
```

**Użycie:**

```bash
ANALYZE=true npm run build
```

 </Tab>
 <Tab value="Webpack (CRA / Angular / etc)">

### Standardowy Webpack

Dla Create React App (po wykonaniu eject), Angular lub niestandardowych konfiguracji Webpack użyj branżowego standardu `webpack-bundle-analyzer`.

```bash packageManager='npm'
npm install -D webpack-bundle-analyzer
```

```bash packageManager='yarn'
yarn add -D webpack-bundle-analyzer
```

```bash packageManager='pnpm'
pnpm add -D webpack-bundle-analyzer
```

```bash packageManager='bun'
bun add -d webpack-bundle-analyzer
```

```typescript fileName="webpack.config.ts
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";

export default {
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: "static",
      reportFilename: "bundle-analyzer.html",
      openAnalyzer: false,
    }),
  ],
};
```

 </Tab>
</Tabs>

## Jak to Działa

Intlayer wykorzystuje **podejście per-komponent**. W przeciwieństwie do globalnych plików JSON, Twoje treści są definiowane obok komponentów lub wewnątrz nich. Podczas procesu budowania Intlayer wykonuje następujące czynności:

1. **Analizuje** Twój kod w celu znalezienia wywołań funkcji `useIntlayer`.
2. **Buduje** treść odpowiednich słowników.
3. **Zamienia** wywołanie `useIntlayer` na zoptymalizowany kod, zgodnie z Twoją konfiguracją.

Gwarantuje to, że:

- Jeśli komponent nie zostanie zaimportowany, jego treść nie zostanie dołączona do paczki (Dead Code Elimination).
- Jeśli komponent ładuje się leniwie (lazy-loaded), jego zawartość również ładuje się w ten sam sposób.

## Informacje o Wtyczkach

Optymalizacja w trakcie budowania przez Intlayer podzielona jest na kilka niezależnych wtyczek, z których każda odpowiada za jedno zadanie. Zrozumienie roli poszczególnych wtyczek zapobiegnie nieporozumieniom podczas ich konfiguracji.

### Wtyczki Babel (`@intlayer/babel`)

Wtyczki te są wykorzystywane bezpośrednio w `babel.config.js` dla środowisk opartych na Webpacku (Next.js z Babel, CRA, własne konfiguracje Webpack itp.).

| Wtyczka                       | Działanie                                                                                                               |
| :---------------------------- | :---------------------------------------------------------------------------------------------------------------------- |
| `intlayerExtractBabelPlugin`  | Skanuje pliki `.content.ts` i zapisuje skompilowane słowniki w katalogu `.intlayer/`                                    |
| `intlayerOptimizeBabelPlugin` | Przepisuje kod `useIntlayer('key')` → `useDictionary(hash)` i wstrzykuje import pasującego słownika                     |
| `intlayerPurgeBabelPlugin`    | Skanuje wszystkie pliki źródłowe, usuwając **nieużywane pola treści** ze skompilowanych słowników `.intlayer/**/*.json` |
| `intlayerMinifyBabelPlugin`   | **Zmienia nazwy kluczy pól treści** na krótkie, literowe aliasy (np. `title` → `a`) w plikach JSON i kodzie źródłowym   |

> **Kolejność wtyczek ma znaczenie.** W Twoim `babel.config.js` wtyczki purge i minify muszą pojawić się **przed** wtyczką optimize. Krok optymalizacji zastępuje bowiem `useIntlayer('key')` nieprzejrzystym wywołaniem `useDictionary(hash)`, usuwając informację o kluczu słownika. Właśnie tej informacji potrzebują etapy purge i minify, aby móc określić, które pola są wykorzystywane.

Każda z wtyczek dla Babel ma swój dedykowany helper dla opcji, który odczytuje `intlayer.config.ts` tylko raz (podczas wczytywania konfiguracji) i zwraca wstępnie rozwiązane wartości:

| Helper opcji                 | Zastosowanie z wtyczką        |
| :--------------------------- | :---------------------------- |
| `getExtractPluginOptions()`  | `intlayerExtractBabelPlugin`  |
| `getOptimizePluginOptions()` | `intlayerOptimizeBabelPlugin` |
| `getPurgePluginOptions()`    | `intlayerPurgeBabelPlugin`    |
| `getMinifyPluginOptions()`   | `intlayerMinifyBabelPlugin`   |

### Wtyczki Vite (`vite-intlayer`)

Użytkownicy Vite **nigdy nie konfigurują ich bezpośrednio**. Są one podłączane automatycznie po wywołaniu `withIntlayer()` w pliku `vite.config.ts`. Flagi `build.purge` i `build.minify` umieszczone w `intlayer.config.ts` przełączają ich zachowanie bez potrzeby dodatkowego rejestrowania wtyczek.

| Wewnętrzna wtyczka Vite | Odpowiednik zachowania                                                                           |
| :---------------------- | :----------------------------------------------------------------------------------------------- |
| Usage analyzer          | Działa jak etap skanowania wtyczki `intlayerPurgeBabelPlugin`                                    |
| Dictionary prune        | Działa jak etap zapisu JSON we wtyczce `intlayerPurgeBabelPlugin`                                |
| Dictionary minify       | Działa jak etap zapisu JSON we wtyczce `intlayerMinifyBabelPlugin`                               |
| Babel transform         | Działa jak etap zmiany nazewnictwa z `intlayerMinifyBabelPlugin` + `intlayerOptimizeBabelPlugin` |

## Konfiguracja wg Platformy

<Tabs>
 <Tab value="nextjs">

### Next.js

Next.js wymaga instalacji wtyczki `@intlayer/swc` na etapie optymalizacji (przepisywania importów), ponieważ Next.js wykorzystuje do budowania SWC.

> Ta wtyczka nie jest instalowana domyślnie, ponieważ wtyczki SWC dla Next.js mają wciąż charakter eksperymentalny. Może się to zmienić w przyszłości.

```bash packageManager="npm"
npm install -D @intlayer/swc
```

```bash packageManager="yarn"
yarn add -D @intlayer/swc
```

```bash packageManager="pnpm"
pnpm add -D @intlayer/swc
```

```bash packageManager="bun"
bun add -d @intlayer/swc
```

Po jej zainstalowaniu Intlayer automatycznie wykryje i wykorzysta tę wtyczkę.

Do przejścia etapów **purge i minify** (usuwania i skracania pól), należy zainstalować równolegle `@intlayer/babel` i dodać wtyczki Babel. Choć Next.js do transformacji korzysta z SWC, wciąż interpretuje `babel.config.js` w zakresie konfiguracji wtyczek, co sprawia, że wtyczki dla Babel uruchamiane są jeszcze przed etapem SWC.

```bash packageManager="npm"
npm install -D @intlayer/babel
```

```javascript fileName="babel.config.js"
const {
  intlayerPurgeBabelPlugin,
  intlayerMinifyBabelPlugin,
  getPurgePluginOptions,
  getMinifyPluginOptions,
} = require("@intlayer/babel");

module.exports = {
  presets: ["next/babel"],
  plugins: [
    // Purge: usuwa nieużywane pola ze słowników z .intlayer/**/*.json
    [intlayerPurgeBabelPlugin, getPurgePluginOptions()],
    // Minify: skraca nazwy kluczy w polach w plikach JSON i kodzie źródłowym
    [intlayerMinifyBabelPlugin, getMinifyPluginOptions()],
    // Uwaga: intlayerOptimizeBabelPlugin NIE JEST TUTAJ POTRZEBNY, ponieważ
    // to @intlayer/swc obsługuje zastępowanie useIntlayer → useDictionary.
  ],
};
```

 </Tab>
 <Tab value="vite">

### Vite

Vite wykorzystuje wtyczkę `@intlayer/babel`, która jest dostarczana jako zależność pakietu `vite-intlayer`. Pełen przepływ (pipeline) optymalizacji — przepisywanie importów, purge oraz minify — zostaje domyślnie uaktywniony i nie potrzebuje odrębnej instalacji wtyczek.

Aby uaktywnić flagi purge oraz minify, wskaż to za pomocą opcji w swoim `intlayer.config.ts`:

```typescript fileName="intlayer.config.ts"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  build: {
    purge: true, // usuwa ze zgrubnych plików JSON te nieużywane pola treści
    minify: true, // zmienia aliasy kluczy dla tychże pól treści w aliasy skróceniowe
  },
};

export default config;
```

 </Tab>
 <Tab value="webpack">

### Webpack (i Next.js z użyciem Babel)

Zainstaluj `@intlayer/babel`:

```bash packageManager="npm"
npm install -D @intlayer/babel
```

```bash packageManager="yarn"
yarn add -D @intlayer/babel
```

```bash packageManager="pnpm"
pnpm add -D @intlayer/babel
```

```bash packageManager="bun"
bun add -d @intlayer/babel
```

Dopisz całą czwórkę wtyczek dla plików środowiska Webpack do `babel.config.js` w określonym, dobrym porządku:

```javascript fileName="babel.config.js"
const {
  intlayerExtractBabelPlugin,
  intlayerPurgeBabelPlugin,
  intlayerMinifyBabelPlugin,
  intlayerOptimizeBabelPlugin,
  getExtractPluginOptions,
  getPurgePluginOptions,
  getMinifyPluginOptions,
  getOptimizePluginOptions,
} = require("@intlayer/babel");

module.exports = {
  plugins: [
    // Extract: dokonuje kompilacji plików ze zbioru .content.ts → .intlayer/**/*.json
    [intlayerExtractBabelPlugin, getExtractPluginOptions()],

    // Purge: ucina niewykorzystane i zagubione przestrzenie w .intlayer/**/*.json
    //    (wykorzystuje flagi odczytane uprzednio z intlayer.config.ts)
    [intlayerPurgeBabelPlugin, getPurgePluginOptions()],

    // Minify: zastępuje dotychczasowe klucze literowymi ich krótkimi skrótami
    //    (wykorzystuje flagę pobraną pierwotnie z intlayer.config.ts)
    [intlayerMinifyBabelPlugin, getMinifyPluginOptions()],

    // Optimize: nadpisuje strukturę składni formy useIntlayer('key') → useDictionary(hash)
    //    Wymagane jest usytuowanie na samym końcu, bowiem kasuje powiązany oryginalny znak wywoławczy ze słownika.
    [intlayerOptimizeBabelPlugin, getOptimizePluginOptions()],
  ],
};
```

 </Tab>
</Tabs>

## Konfiguracja

Możesz kontrolować, w jaki sposób Intlayer optymalizuje Twoją paczkę poprzez propercję `build` w pliku `intlayer.config.ts`.

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.POLISH],
    defaultLocale: Locales.ENGLISH,
  },
  dictionary: {
    importMode: "dynamic",
  },
  build: {
    // Zamienia wywołania useIntlayer() na bezpośrednie importy ze słowników podczas budowania.
    // undefined = auto (włączone w produkcji), true = zawsze, false = nigdy.
    optimize: undefined,

    // Zmienia długie nazwy kluczy dla pól we wkompilowanych słownikach na ich krótkie,
    // jednoznakowe wersje alfabetyczne (np. title → a). Zmniejsza rozmiar pliku JSON; wymaga optymalizacji.
    minify: true,

    // Usuwa pola treści, do których kod źródłowy nie uzyskał w ogóle bezpośredniego dostępu.
    // Wymaga zdefiniowania optimize w pliku konfiguracyjnym.
    purge: true,
  },
};

export default config;
```

> Zaleca się na ogół pozostawienie wartości domyślnej (`undefined`) dla opcji `optimize`.

> Zobacz referencje dotyczące samej konfiguracji po resztę opcji: [Konfiguracja](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/configuration.md)

### Opcje Budowania

| Właściwość     | Typ                   | Domyślnie   | Opis                                                                                                                                                                                                      |
| :------------- | :-------------------- | :---------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`optimize`** | `boolean / undefined` | `undefined` | Włącza przepisanie zajawek importowych. `undefined` = aktywne tylko w trybie produkcyjnym. Tryb `false` obali równomiernie opcje z flagi purge i minify.                                                  |
| **`minify`**   | `boolean`             | `false`     | Ucina klucze pól w zawartych strukturach opartych o plik w formatach JSON ze zwinnym przepisywaniem kodu o te same elementy alfabetyczne. Zyskuje na znaczeniu, kiedy opcja `optimize` gra swoją rolę.    |
| **`purge`**    | `boolean`             | `false`     | Eliminuje statyczne, niespotykane powiązania we wnętrzu w pełni poddanych analizie kodów źródłowych (eliminując fragmentację plików JSON). Zostaje odrzucone w wypadku, w którym `optimize` jest `false`. |

### Minifikacja (Zmienianie Nazw Kluczy)

Opcja `build.minify` **nie zminifikuje** ogólnej zawartości Twojego JavaScript — tym zajmie się odpowiedni silnik bundlera. Jej wiodącym atutem jest to, iż potrafi znacznie skurczyć same przekształcone tablice opatrzone zwięzłym JSON o krótkie litery wygenerowanego alfabetu:

```
// Przed użyciem Minifikacji
{ "title": "Witaj", "subtitle": "Świecie" }

// Po zastosowaniu Minifikacji
{ "a": "Witaj", "b": "Świecie" }
```

Podobnie powiela to swój udział na polu kodu źródłowego, aby w toku procesów budowlanych komenda pokroju `content.title` zamieniła się nieoczekiwanie w formę typu `content.a` zachowując idealny ekosystem bezbłędnej relacyjności.

```typescript fileName="intlayer.config.ts"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  build: {
    minify: true,
  },
};

export default config;
```

> Krok dla minifikacji musi zostać oddalony w odstawkę, gdy Twoja opcja to `optimize` lub jeżeli udostępniasz systemowo `editor.enabled` i ustawiasz na domyślne `true` (wymuszone jest, aby pola trzymały na ten czas swe niezmącone relacje, dla potrzeb odpowiedniego renderowania Wizualnego Edytora).

> Ten sam manewr odłożenia ma miejsce w słownikach przywoływanych jako typ opcji z użyciem `importMode: 'fetch'`, gdzie zawarte odpowiedzi napływają niezwłocznie dzięki połączonemu formatowi JSON. Gdyby zastosowano sztuczne przeinaczenie ze stron zewnętrznych, serwer stałby się bezużyteczny z perspektywy klienta i połącznie zostałoby połamane.

### Purging (Usuwanie Nieużytych Przestrzeni)

Moduł oznaczający się słowem `build.purge` dba za to nad śledzeniem rzeczywistego obłożenia zawartych zmiennych i parametrów w paczkach JSON, ucinając puste lub zbyteczne zapytania.

```typescript fileName="intlayer.config.ts"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  build: {
    purge: true,
  },
};

export default config;
```

**Przykład:** Jeden pospolity słownik wyposażony chociażby o cztery kluczowe pola niepotrzebnego balastu.

```
// Przed aktywacją "purge"
{ "title": "…", "subtitle": "…", "cta": "…", "footer": "…", "badge": "…" }

// Po jej zapoczątkowaniu, ostaną się wyłącznie title oraz np. subtitle, połączone więzami skryptu.
{ "title": "…", "subtitle": "…" }
```

> Mechanizm obalenia Purge opiera się głównie o pominięcia w wypadku kiedy brakuje `optimize` opcjonalnej flagi tudzież podczas zadeklarowania trybu pod system Visual Editor (ustawiając `editor.enabled` na rzecz trybu `true`).

> Co rzadsze zjawiska również tyczą się tego obejścia - dla niemożności sprawdzenia wycinka czy pospolitych struktur dla `useIntlayer` - silnik bezbłędnie zablokuje akcję. Przykładowo dla wywołań w niejednoznacznych tablicach powiązanych metod bez destrukturyzacji by zachować słownikową formę naturalną.

### Tryby Importowania Słownika

Dla zaawansowanych ekosystemów skategoryzowanych opcją mnogości języków i pokaźną objętościowo rzeszą podstron Twoje tablice JSON mogą mocno oddziaływać na bazowy wyciąg i jego rozmiar końcowy. Aplikując `importMode` możemy opanować zapytania pobraniowe by temu zapobiegać.

### Globalne Zarządzanie Opcją

Możesz w zupełności operować trybem importowania globalnym parametrem skrytym pod przykrywką w Twoim nowym `intlayer.config.ts`.

```typescript fileName="intlayer.config.ts"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  dictionary: {
    importMode: "dynamic", // Wybranym trybem domyślnym staje się "static"
  },
};

export default config;
```

### Tryby w Indywidualnych Odłamach Słownikowych

Możesz ustrzec się opcji dla ogólnego użycia poprzez dopisywanie warunkowych ułożeń we wkompilowanych od siebie osobnych elementach `.content.{{ts|tsx|js|jsx|mjs|cjs|json|jsonc|json5|md|mdx|yaml|yml}}`.

```ts
import { type Dictionary, t } from "intlayer";

const appContent: Dictionary = {
  key: "app",
  importMode: "dynamic", // Tutaj nadpiszemy dominujący import oparty domyślną strukturą.
  content: {
    // ...
  },
};

export default appContent;
```

| Opcja            | Pula Formatów                      | Podstawowo | Informacja Ogólna                                                                                       |
| :--------------- | :--------------------------------- | :--------- | :------------------------------------------------------------------------------------------------------ |
| **`importMode`** | `'static'`, `'dynamic'`, `'fetch'` | `'static'` | **Przestarzałe**: Przełącz swój ekosystem by móc opierać zapytania stricte pod `dictionary.importMode`. |

Opcja bazująca z formy poleceń pod szyldem `importMode` dyktuje polecenia operujące mechanikami w Twoim powiązanym komponencie. Może to wpłynąć na tryb globalny i wpisy ze zbiorów poszczególnych dla `dictionary`.

### 1. Tryb Zastosowań Statycznych (`default`)

W ramach trybu użytego dla form static Intlayer podmieni i przekształci naturalne skrótowce `useIntlayer` wykończonymi formułami słownymi od `useDictionary`, tym samym ładując bezpośrednio skompilowany ciąg zdarzeniowy.

- **Korzyści:** Ekspresowe podpięcie od zera. Bezpośrednia relacja nie odpytująca ponownych pobrań w asyście przy trybie nawadniania środowiskowego.
- **Mankamenty:** Podłączona pod aplikację końcową baza staje się mocno skondensowana. Pobierasz **wszystkie dostępne klucze pakietów**, ignorując aktualnie wymagane przez dany obszar wytyczne.
- **Kiedy Najlepiej Zastosować:** Systemy powiązane pod wariant tak zwanej Jednej Strony Aplikacji (SpA).

**Przykład Transformacji Skryptowej:**

```tsx
// Skrypt Przykładowy Twórcy
const content = useIntlayer("my-key");

// Tak prezentuje się optymalna struktura oparta pod Tryb (Statyczny)
// Skrypt poglądowy odzwierciedla w pełni model bazowy i może wybiegać ze swoich skrajności
const content = useDictionary({
  key: "my-key",
  content: {
    nodeType: "translation",
    translation: {
      en: "My title",
      pl: "Mój tytuł",
    },
  },
});
```

### 2. Tryb Obiektowo Dynamiczny

Podejmując wyzwania trybu Dynamic, Intlayer operuje na zapleczu poleceń `useDictionaryAsync`, ignorując swego poprzednika by przenieść ciężar zapytania przez typ lazy z mechanizmem przypominającym środowisko `import()` uodparniając specyficznie wymogi dla pliku językowego pod pożądane żądanie lokalne z odpowiednim JSON.

- **Korzyści:** **Skupienie na lokalizacji względem wagi i jej usunięciu (Tree-Shaking).** Typowy entuzjasta spolszczonego wariantu otrzyma spójną i pożądaną wyłącznie tablicę z wgranym językiem. Inne wersje nie zostaną użyte dla odciążeń.
- **Mankamenty:** Aktywuje ułamek żądań na serwer, prosząc sieć o asystę podczas uwadniania strony.
- **Kiedy Najlepiej Zastosować:** Potężne objętości tekstu, opasłe publikacje tudzież platformy łączące setki państw z prężnym budżetem optymalizacyjnym pakietów.

**Przykład Skompresowanego Zastosowania W Wyniku Zdarzeń:**

```tsx
// Przed rozpoczęciem działania
const content = useIntlayer("my-key");

// Wizualizacja form po obrabianiu ze skryptem docelowym (Pamięciowy tryb dynamiczny)
const content = useDictionaryAsync({
  en: () =>
    import(".intlayer/dynamic_dictionary/my-key/en.json").then(
      (mod) => mod.default
    ),
  pl: () =>
    import(".intlayer/dynamic_dictionary/my-key/pl.json").then(
      (mod) => mod.default
    ),
});
```

> Mając na karku włączone systemowe rozwiązanie ukierunkowane opcją pod `importMode: 'dynamic'`, pamiętaj, że na jednej powiązanej karcie strony mającej np. ok 100 powiązanych żądań typu odniesieniowego i wzywających formułę `useIntlayer` strona posiłkująca się wybranym standardem wyleje żale w liczbie dokładnie tych samych 100 wywołań. Reaguj zawczasu. Postaraj się sprytnie redukować poszczególne tablice plikami np. ograniczając je w jedną, spójniejszą formułę typu podzbioru dla np. mniejszych wycinków danej strony. Istnieje opcja dodania atutów w postać nadpisywanych wycinków operujących nad tym samym imieniem, które w późniejszym etapie łączą wywołania w postać i strukturę połączonego spoiwa.

### 3. Zastosowania W Formule Fetch

Kolejny z bliźniaczych w budowie form importowania. Jego nieprzeniknione różnice to typowy pościg powiązany oparty od Live Sync API serwowanym wektorami we wrotach Intlayera, i gdyby napotkał się w trudzie awaryjnym (Błąd Odpowiedzi itd.) by przerzucić resztkę pod standard powiązań od swojego zapasowego formatu dynamicznych form podążających.

**Twór Opracowany W Końcowej Generacji Na Poczet Zapytania Z Sieci:**

```tsx
// Początek skryptowania przed zoptymalizowaniem
const content = useIntlayer("my-key");

// Powołany wynikowy tryb od zoptymalizowania Fetch'em
const content = useDictionaryAsync({
  en: () =>
    fetch("https://intlayer.my-domain.com/dictionary/my-key/en").then((res) =>
      res.json()
    ),
  pl: () =>
    fetch("https://intlayer.my-domain.com/dictionary/my-key/pl").then((res) =>
      res.json()
    ),
});
```

> Zaglądnij do źródeł, jeżeli brakuje Tobie stosownej wiedzy operującej opcjami dla CMS: [Rozwiązania Typu CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_CMS.md)

> W środowisku opartym modelem o formy z API o parametrze fetch całkowicie ominięte obłożone procesy z grupy eliminowania (purge) i ukrywania z modyfikacjami optycznymi (minify) kluczy tablicy ulegają trwałemu przeistoczeniu, z powodem opartym m.in. użyciu zapytania przez wektor o relacje klucza zachowującego swoje parametry oryginału.

## Tabelaryczne Oświadczenie - Statyczny oraz Formuła Dynamiki

| Rodzaj Użytkowej Opcji     | Tryb Zapytania (Statyczny)                      | Typ Zapytania Sieciowego (Dynamiczny)                       |
| :------------------------- | :---------------------------------------------- | :---------------------------------------------------------- |
| **Rozmiary Ekosystemu**    | Rozdmuchane dla opcji wariantów lokalnych.      | Skondensowany format pakietowy na tip-top.                  |
| **Wstępne Skalowanie**     | Momentalny czas reakcyjny z zasobów bundla.     | Posiadający zwłoki ułamka od JSON-ów.                       |
| **Asysty Pobrań z Sieci**  | Wolny od błagania o pobrania w locie z sieci.   | Standard to zawsze stosunek 1 klucza.                       |
| **Warianty Oddzielania**   | Stricte ukierunkowany formą Komponentowych rel. | Łączący wektory z wariantów lokalizacji.                    |
| **Zalety Po Zastosowaniu** | Drobne platformy z lekkim wymogiem na front.    | Giganty publikujące wpisy z tytanicznym formatem językowym. |
