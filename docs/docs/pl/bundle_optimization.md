---
createdAt: 2025-11-25
updatedAt: 2025-11-25
title: Optymalizacja rozmiaru i wydajności pakietu i18n
description: Zmniejsz rozmiar pakietu aplikacji poprzez optymalizację treści internacjonalizacji (i18n). Dowiedz się, jak wykorzystać tree shaking i lazy loading słowników z Intlayer.
keywords:
  - Optymalizacja pakietu
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
  - version: 6.0.0
    date: 2025-11-25
    changes: Inicjalizacja historii
---

# Optymalizacja rozmiaru i wydajności pakietu i18n

Jednym z najczęstszych wyzwań tradycyjnych rozwiązań i18n opartych na plikach JSON jest zarządzanie rozmiarem treści. Jeśli deweloperzy nie rozdzielą ręcznie treści na przestrzenie nazw, użytkownicy często kończą z pobieraniem tłumaczeń dla każdej strony i potencjalnie każdego języka, tylko po to, aby wyświetlić pojedynczą stronę.

Na przykład aplikacja z 10 stronami przetłumaczonymi na 10 języków może skutkować tym, że użytkownik pobierze zawartość 100 stron, mimo że potrzebuje tylko **jednej** (aktualnej strony w aktualnym języku). Prowadzi to do marnowania przepustowości i wolniejszego ładowania.

> Aby to wykryć, możesz użyć analizatora pakietów takiego jak `rollup-plugin-visualizer` (vite), `@next/bundle-analyzer` (next.js) lub `webpack-bundle-analyzer` (React CRA / Angular / itd).

**Intlayer rozwiązuje ten problem poprzez optymalizację w czasie kompilacji.** Analizuje Twój kod, aby wykryć, które słowniki są faktycznie używane w poszczególnych komponentach i wstrzykuje do pakietu tylko niezbędną zawartość.

## Jak to działa

Intlayer stosuje **podejście per-komponent**. W przeciwieństwie do globalnych plików JSON, Twoja zawartość jest definiowana obok lub wewnątrz komponentów. Podczas procesu budowania Intlayer:

1.  **Analizuje** Twój kod, aby znaleźć wywołania `useIntlayer`.
2.  **Buduje** odpowiadającą zawartość słownika.
3.  **Zastępuje** wywołanie `useIntlayer` zoptymalizowanym kodem na podstawie Twojej konfiguracji.

To zapewnia, że:

- Jeśli komponent nie jest importowany, jego zawartość nie jest dołączana do pakietu (eliminacja martwego kodu).
- Jeśli komponent jest ładowany leniwie, jego zawartość jest również ładowana leniwie.

## Konfiguracja według platformy

### Next.js

Next.js wymaga wtyczki `@intlayer/swc` do obsługi transformacji, ponieważ Next.js używa SWC do budowania.

> Ta wtyczka jest instalowana domyślnie, ponieważ wtyczki SWC są nadal eksperymentalne dla Next.js. Może się to zmienić w przyszłości.

### Vite

Vite używa wtyczki `@intlayer/babel`, która jest dołączona jako zależność `vite-intlayer`. Optymalizacja jest domyślnie włączona.

### Webpack

Aby włączyć optymalizację pakietu z Intlayer na Webpack, musisz zainstalować i skonfigurować odpowiednią wtyczkę Babel (`@intlayer/babel`) lub SWC (`@intlayer/swc`).

### Expo / Lynx

Optymalizacja pakietu jest **jeszcze niedostępna** dla tej platformy. Wsparcie zostanie dodane w przyszłej wersji.

## Konfiguracja

Możesz kontrolować, jak Intlayer optymalizuje Twój pakiet za pomocą właściwości `build` w pliku `intlayer.config.ts`.

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.ENGLISH,
  },
  build: {
    optimize: true,
    importMode: "static", // lub 'dynamic'
    traversePattern: ["**/*.{js,ts,mjs,cjs,jsx,tsx}", "!**/node_modules/**"],
  },
};

export default config;
```

> Zaleca się pozostawienie domyślnej opcji `optimize` w większości przypadków.

> Zobacz dokumentację konfiguracji, aby uzyskać więcej szczegółów: [Konfiguracja](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/configuration.md)

### Opcje budowania

Dostępne są następujące opcje w obiekcie konfiguracyjnym `build`:

| Właściwość            | Typ                                       | Domyślna wartość                | Opis                                                                                                                                                                                                                              |
| :-------------------- | :---------------------------------------- | :------------------------------ | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`optimize`**        | `boolean`                                 | `undefined`                     | Kontroluje, czy optymalizacja builda jest włączona. Jeśli `true`, Intlayer zastępuje wywołania słowników zoptymalizowanymi wstrzyknięciami. Jeśli `false`, optymalizacja jest wyłączona. Najlepiej ustawić na `true` w produkcji. |
| **`importMode`**      | `'static' &#124; 'dynamic' &#124; 'live'` | `'static'`                      | Określa sposób ładowania słowników (szczegóły poniżej).                                                                                                                                                                           |
| **`traversePattern`** | `string[]`                                | `['**/*.{js,ts,jsx,tsx}', ...]` | Wzorce glob określające, które pliki Intlayer powinien skanować pod kątem optymalizacji. Użyj tego, aby wykluczyć niepowiązane pliki i przyspieszyć proces budowania.                                                             |
| **`outputFormat`**    | `'esm' &#124; 'cjs'`                      | `'esm'`                         | Kontroluje format wyjściowy zbudowanych słowników.                                                                                                                                                                                |

## Tryby importu

Ustawienie `importMode` określa, jak zawartość słownika jest wstrzykiwana do twojego komponentu.

### 1. Tryb statyczny (`default`)

W trybie statycznym Intlayer zastępuje `useIntlayer` funkcją `useDictionary` i wstrzykuje słownik bezpośrednio do pakietu JavaScript.

- **Zalety:** Natychmiastowe renderowanie (synchroniczne), brak dodatkowych żądań sieciowych podczas hydracji.
- **Wady:** Pakiet zawiera tłumaczenia dla **wszystkich** dostępnych języków dla danego komponentu.
- **Najlepsze zastosowanie:** Aplikacje jednostronicowe (SPA).

**Przykład przekształconego kodu:**

```tsx
// Twój kod
const content = useIntlayer("my-key");

// Kod zoptymalizowany (statyczny)
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

W trybie dynamicznym Intlayer zastępuje `useIntlayer` funkcją `useDictionaryAsync`. Używa to `import()` (mechanizm podobny do Suspense) do leniwego ładowania konkretnie pliku JSON dla bieżącej lokalizacji.

- **Zalety:** **Tree shaking na poziomie lokalizacji.** Użytkownik przeglądający wersję angielską pobierze _tylko_ angielski słownik. Francuski słownik nigdy nie jest ładowany.
- **Wady:** Wywołuje żądanie sieciowe (pobranie zasobu) dla każdego komponentu podczas hydracji.
- **Najlepsze zastosowanie:** Duże bloki tekstu, artykuły lub aplikacje obsługujące wiele języków, gdzie rozmiar pakietu jest krytyczny.

**Przykład przekształconego kodu:**

```tsx
// Twój kod
const content = useIntlayer("my-key");

// Kod zoptymalizowany (Dynamiczny)
const content = useDictionaryAsync({
  en: () =>
    import(".intlayer/dynamic_dictionary/en.json").then((mod) => mod.default),
  fr: () =>
    import(".intlayer/dynamic_dictionary/fr.json").then((mod) => mod.default),
});
```

> Korzystając z `importMode: 'dynamic'`, jeśli na jednej stronie masz 100 komponentów używających `useIntlayer`, przeglądarka spróbuje wykonać 100 osobnych pobrań. Aby uniknąć tego „efektu wodospadu” żądań, grupuj zawartość w mniejszej liczbie plików `.content` (np. jeden słownik na sekcję strony) zamiast po jednym na każdy atomowy komponent.

> Obecnie `importMode: 'dynamic'` nie jest w pełni wspierany dla Vue i Svelte. Zaleca się używanie `importMode: 'static'` dla tych frameworków do czasu kolejnych aktualizacji.

### 3. Tryb na żywo (Live Mode)

Działa podobnie do trybu Dynamic, ale najpierw próbuje pobrać słowniki z Intlayer Live Sync API. Jeśli wywołanie API się nie powiedzie lub zawartość nie jest oznaczona do aktualizacji na żywo, następuje powrót do importu dynamicznego.

> Zobacz dokumentację CMS, aby uzyskać więcej szczegółów: [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_CMS.md)

## Podsumowanie: Static vs Dynamic

| Funkcja                    | Tryb Static                                       | Tryb Dynamic                                |
| :------------------------- | :------------------------------------------------ | :------------------------------------------ |
| **Rozmiar pakietu JS**     | Większy (zawiera wszystkie języki dla komponentu) | Najmniejszy (tylko kod, bez zawartości)     |
| **Początkowe ładowanie**   | Natychmiastowe (zawartość jest w pakiecie)        | Niewielkie opóźnienie (pobiera JSON)        |
| **Żądania sieciowe**       | 0 dodatkowych żądań                               | 1 żądanie na słownik                        |
| **Tree Shaking**           | Na poziomie komponentu                            | Na poziomie komponentu + lokalizacji        |
| **Najlepsze zastosowanie** | Komponenty UI, małe aplikacje                     | Strony z dużą ilością tekstu, wiele języków |
