---
createdAt: 2025-11-25
updatedAt: 2026-04-08
title: Optymalizacja rozmiaru i wydajności bundle'a i18n
description: Zmniejsz rozmiar bundle'a aplikacji poprzez optymalizację treści internacjonalizacji (i18n). Dowiedz się, jak wykorzystać tree shaking i lazy loading dla słowników dzięki Intlayer.
keywords:
  - Optymalizacja bundle'a
  - Automatyzacja treści
  - Treść dynamiczna
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - bundle-optimization
history:
  - version: 8.7.0
    date: 2026-04-08
    changes: "Dodano opcje `minify` i `purge` do konfiguracji builda"
---

# Optymalizacja rozmiaru i wydajności bundle'a i18n

Jednym z najczęstszych wyzwań w tradycyjnych rozwiązaniach i18n opartych na plikach JSON jest zarządzanie rozmiarem treści. Jeśli programiści nie rozdzielą ręcznie treści na przestrzenie nazw (namespaces), użytkownicy często pobierają tłumaczenia dla każdej strony, a potencjalnie dla każdego języka, tylko po to, by wyświetlić jedną stronę.

Na przykład aplikacja z 10 stronami przetłumaczonymi na 10 języków może spowodować, że użytkownik pobierze treść 100 stron, mimo że potrzebuje tylko **jednej** (aktualnej strony w aktualnym języku). Prowadzi to do marnowania przepustowości i wolniejszego czasu ładowania.

**Intlayer rozwiązuje ten problem poprzez optymalizację na etapie budowania.** Analizuje on kod, aby wykryć, które słowniki są faktycznie używane w poszczególnych komponentach, i wstrzykuje do bundle'a tylko niezbędną treść.

## Spis treści

<TOC />

## Skanowanie bundle'a

Analiza bundle'a to pierwszy krok do zidentyfikowania "ciężkich" plików JSON i możliwości podziału kodu (code-splitting). Narzędzia te generują wizualną mapę drzewa (treemap) skompilowanego kodu aplikacji, co pozwala dokładnie zobaczyć, które biblioteki zajmują najwięcej miejsca.

<Tabs>
 <Tab value="vite">

### Vite / Rollup

Vite wykorzystuje pod maską Rollup. Wtyczka `rollup-plugin-visualizer` generuje interaktywny plik HTML pokazujący rozmiar każdego modułu w grafie.

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

Dla projektów korzystających z App Router i Turbopack, Next.js udostępnia wbudowany eksperymentalny analizator, który nie wymaga dodatkowych zależności.

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

Jeśli używasz domyślnego bundlera Webpack w Next.js, skorzystaj z oficjalnego analizatora bundle'a. Uruchom go, ustawiając zmienną środowiskową podczas budowania.

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

W przypadku Create React App (ejected), Angulara lub niestandardowych konfiguracji Webpack, użyj standardowego narzędzia `webpack-bundle-analyzer`.

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

## Jak to działa

Intlayer stosuje **podejście oparte na komponentach**. W przeciwieństwie do globalnych plików JSON, treść jest definiowana obok komponentów lub w ichewnątrz. Podczas procesu budowania Intlayer:

1.  **Analizuje** kod w celu znalezienia wywołań `useIntlayer`.
2.  **Buduje** odpowiadającą im treść słownika.
3.  **Zastępuje** wywołanie `useIntlayer` zoptymalizowanym kodem na podstawie Twojej konfiguracji.

Zapewnia to, że:

- Jeśli komponent nie zostanie zaimportowany, jego treść nie zostanie dołączona do bundle'a (Dead Code Elimination).
- Jeśli komponent jest ładowany leniwie (lazy-loaded), jego treść również jest ładowana leniwie.

## Konfiguracja według platformy

<Tabs>
 <Tab value="nextjs">

### Next.js

Next.js wymaga wtyczki `@intlayer/swc` do obsługi transformacji, ponieważ Next.js używa SWC do budowania.

> Ta wtyczka nie jest instalowana domyślnie, ponieważ wtyczki SWC są nadal eksperymentalne w Next.js. Może to ulec zmianie w przyszłości.

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

Po zainstalowaniu Intlayer automatycznie wykryje i użyje wtyczki.

 </Tab>
 <Tab value="vite">

### Vite

Vite używa wtyczki `@intlayer/babel`, która jest dołączona jako zależność `vite-intlayer`. Optymalizacja jest domyślnie włączona. Nie trzeba nic więcej robić.

 </Tab>
 <Tab value="webpack">

### Webpack

Aby włączyć optymalizację bundle'a za pomocą Intlayer w Webpacku, musisz zainstalować i skonfigurować odpowiednią wtyczkę Babel (`@intlayer/babel`) lub SWC (`@intlayer/swc`).

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

```typescript fileName="babel.config.js"
const {
  getOptimizePluginOptions,
  intlayerOptimizeBabelPlugin,
} = require("@intlayer/babel");

module.exports = {
  plugins: [[intlayerOptimizeBabelPlugin, getOptimizePluginOptions()]],
};
```

 </Tab>
</Tabs>

## Konfiguracja

Możesz kontrolować sposób optymalizacji bundle'a przez Intlayer za pomocą właściwości `build` w pliku `intlayer.config.ts`.

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.ENGLISH,
  },
  dictionary: {
    importMode: "dynamic",
  },
  build: {
    /**
     * Minifikuj słowniki, aby zmniejszyć rozmiar bundle'a.
     */
     minify: true;

    /**
     * Usuwaj nieużywane klucze w słownikach (purge)
     */
     purge: true;

    /**
     * Wskazuje, czy proces budowania powinien sprawdzać typy TypeScript
     */
    checkTypes: false;
  },
};

export default config;
```

> W większości przypadków zaleca się pozostawienie domyślnej opcji dla `optimize`.

> Zobacz dokumentację konfiguracji, aby uzyskać więcej szczegółów: [Konfiguracja](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/configuration.md)

### Opcje budowania

Dostępne są następujące opcje w obiekcie konfiguracji `build`:

| Właściwość     | Typ       | Domyślnie   | Opis                                                                                                                                                                                                                 |
| :------------- | :-------- | :---------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`optimize`** | `boolean` | `undefined` | Kontroluje, czy optymalizacja budowania jest włączona. Jeśli `true`, Intlayer zastępuje wywołania słowników zoptymalizowanymi wstrzyknięciami. Jeśli `false`, optymalizacja jest wyłączona. Idealnie `true` na prod. |
| **`minify`**   | `boolean` | `false`     | Czy minifikować słowniki w celu zmniejszenia rozmiaru bundle'a.                                                                                                                                                      |
| **`purge`**    | `boolean` | `false`     | Czy usuwać nieużywane klucze w słownikach.                                                                                                                                                                           |

### Minifikacja

Minifikacja słowników usuwa niepotrzebne białe znaki, komentarze i zmniejsza rozmiar treści JSON. Jest to szczególnie przydatne w przypadku dużych słowników.

```typescript fileName="intlayer.config.ts"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  build: {
    minify: true,
  },
};

export default config;
```

> Uwaga: Minifikacja jest ignorowana, jeśli `optimize` jest wyłączone lub jeśli włączony jest Edytor Wizualny (ponieważ edytor potrzebuje pełnej treści, aby umożliwić edycję).

### Purging (Czyszczenie)

Purging zapewnia, że tylko klucze faktycznie używane w kodzie zostaną uwzględnione w końcowym bundle'u słowników. Może to znacznie zmniejszyć rozmiar bundle'a, jeśli masz duże słowniki z wieloma kluczami, które nie są używane w każdej części aplikacji.

```typescript fileName="intlayer.config.ts"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  build: {
    purge: true,
  },
};

export default config;
```

> Uwaga: Purging jest ignorowany, jeśli `optimize` jest wyłączone.

### Tryb importu (Import Mode)

W przypadku dużych aplikacji, obejmujących wiele stron i języków, pliki JSON mogą stanowić znaczną część rozmiaru bundle'a. Intlayer pozwala kontrolować sposób ładowania słowników.

Tryb importu można zdefiniować domyślnie globalnie w pliku `intlayer.config.ts`.

```typescript fileName="intlayer.config.ts"
import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  build: {
    minify: true,
  },
};

export default config;
```

Jak również dla każdego słownika w plikach `.content.{{ts|tsx|js|jsx|mjs|cjs|json|jsonc|json5}}`.

```ts
import { type Dictionary, t } from "intlayer";

const appContent: Dictionary = {
  key: "app",
  importMode: "dynamic", // Nadpisz domyślny tryb importu
  content: {
    // ...
  },
};

export default appContent;
```

| Właściwość       | Typ                                | Domyślnie  | Opis                                                                                                                  |
| :--------------- | :--------------------------------- | :--------- | :-------------------------------------------------------------------------------------------------------------------- |
| **`importMode`** | `'static'`, `'dynamic'`, `'fetch'` | `'static'` | **Przestarzałe**: Zamiast tego używaj `dictionary.importMode`. Określa, jak ładowane są słowniki (szczegóły poniżej). |

Ustawienie `importMode` dyktuje, w jaki sposób treść słownika jest wstrzykiwana do komponentu.
Możesz je zdefiniować globalnie w pliku `intlayer.config.ts` w obiekcie `dictionary` lub nadpisać dla konkretnego słownika w jego pliku `.content.ts`.

### 1. Tryb statyczny (`default`)

W trybie statycznym Intlayer zastępuje `useIntlayer` przez `useDictionary` i wstrzykuje słownik bezpośrednio do bundle'a JavaScript.

- **Zalety:** Natychmiastowe renderowanie (synchroniczne), zero dodatkowych żądań sieciowych podczas hydratacji.
- **Wady:** Bundle zawiera tłumaczenia dla **wszystkich** dostępnych języków dla tego konkretnego komponentu.
- **Najlepszy dla:** Single Page Applications (SPA).

**Przykład przetransformowanego kodu:**

```tsx
// Twój kod
const content = useIntlayer("my-key");

// Zoptymalizowany kod (Statyczny)
const content = useDictionary({
  key: "my-key",
  content: {
    nodeType: "translation",
    translation: {
      en: "My title",
      fr: "Mon titre",
    },
  },
});
```

### 2. Tryb dynamiczny

W trybie dynamicznym Intlayer zastępuje `useIntlayer` przez `useDictionaryAsync`. Wykorzystuje to `import()` (mechanizm typu Suspense) do leniwego ładowania pliku JSON konkretnie dla aktualnego języka.

- **Zalety:** **Tree shaking na poziomie języka.** Użytkownik przeglądający wersję angielską pobierze _tylko_ słownik angielski. Słownik francuski nigdy nie zostanie załadowany.
- **Wady:** Wyzwala żądanie sieciowe (pobranie zasobu) dla każdego komponentu podczas hydratacji.
- **Najlepszy dla:** Dużych bloków tekstu, artykułów lub aplikacji obsługujących wiele języków, gdzie rozmiar bundle'a jest krytyczny.

**Przykład przetransformowanego kodu:**

```tsx
// Twój kod
const content = useIntlayer("my-key");

// Zoptymalizowany kod (Dynamiczny)
const content = useDictionaryAsync({
  en: () =>
    import(".intlayer/dynamic_dictionary/my-key/en.json").then(
      (mod) => mod.default
    ),
  fr: () =>
    import(".intlayer/dynamic_dictionary/my-key/fr.json").then(
      (mod) => mod.default
    ),
});
```

> Korzystając z `importMode: 'dynamic'`, jeśli masz 100 komponentów używających `useIntlayer` na jednej stronie, przeglądarka podejmie 100 oddzielnych prób pobrania. Aby uniknąć tego "wodospadu" żądań, grupuj treści w mniejszej liczbie plików `.content` (np. jeden słownik na sekcję strony) zamiast jednego na każdy drobny komponent.

### 3. Tryb Fetch

Zachowuje się podobnie do trybu dynamicznego, ale najpierw próbuje pobrać słowniki z Intlayer Live Sync API. Jeśli wywołanie API nie powiedzie się lub treść nie jest oznaczona do aktualizacji na żywo, powraca do importu dynamicznego.

> Zobacz dokumentację CMS, aby uzyskać więcej szczegółów: [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_CMS.md)

> W trybie fetch nie można używać czyszczenia (purge) ani minifikacji.

## Podsumowanie: Statyczny vs Dynamiczny

| Funkcja                  | Tryb statyczny                                    | Tryb dynamiczny                             |
| :----------------------- | :------------------------------------------------ | :------------------------------------------ |
| **Rozmiar bundle'a JS**  | Większy (zawiera wszystkie języki dla komponentu) | Najmniejszy (tylko kod, brak treści)        |
| **Ładowanie początkowe** | Natychmiastowe (treść jest w bundle'u)            | Lekkie opóźnienie (pobiera JSON)            |
| **Żądania sieciowe**     | 0 dodatkowych żądań                               | 1 żądanie na każdy słownik                  |
| **Tree Shaking**         | Poziom komponentu                                 | Poziom komponentu + Poziom języka           |
| **Najlepszy przypadek**  | Komponenty UI, małe aplikacje                     | Strony z dużą ilością tekstu, wiele języków |
