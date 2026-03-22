---
createdAt: 2025-09-09
updatedAt: 2026-03-12
title: Intlayer Compiler | Zautomatyzowane wydobywanie treści dla i18n
description: Zautomatyzuj proces internacjonalizacji za pomocą Intlayer Compiler. Wydobywaj treści bezpośrednio z komponentów dla szybszego i bardziej efektywnego i18n w Vite, Next.js i innych.
keywords:
  - Intlayer
  - Compiler
  - Internacjonalizacja
  - i18n
  - Automatyzacja
  - Wydobywanie
  - Szybkość
  - Vite
  - Next.js
  - React
  - Vue
  - Svelte
slugs:
  - doc
  - compiler
history:
  - version: 8.2.0
    date: 2026-03-09
    changes: "Aktualizacja opcji kompilatora, dodanie wsparcia dla FilePathPattern"
  - version: 8.1.7
    date: 2026-02-25
    changes: "Aktualizacja opcji kompilatora"
  - version: 7.3.1
    date: 2025-11-27
    changes: "Wydanie kompilatora"
---

# Intlayer Compiler | Zautomatyzowane wydobywanie treści dla i18n

## Czym jest Intlayer Compiler?

**Intlayer Compiler** to potężne narzędzie zaprojektowane w celu automatyzacji procesu internacjonalizacji (i18n) w Twoich aplikacjach. Przeszukuje Twój kod źródłowy (JSX, TSX, Vue, Svelte) w poszukiwaniu deklaracji treści, wydobywa je i automatycznie generuje niezbędne pliki słowników. Pozwala to na utrzymanie treści współlokalnie z komponentami, podczas gdy Intlayer zajmuje się zarządzaniem i synchronizacją Twoich słowników.

## Dlaczego warto używać Intlayer Compiler?

- **Automatyzacja**: Eliminuje ręczne kopiowanie i wklejanie treści do słowników.
- **Szybkość**: Optymalizowane wydobywanie treści zapewnia szybki proces budowania.
- **Doświadczenie programisty**: Zachowaj deklaracje treści dokładnie tam, gdzie są używane, co poprawia utrzymanie kodu.
- **Aktualizacje na żywo**: Obsługuje Hot Module Replacement (HMR) dla natychmiastowej informacji zwrotnej podczas tworzenia aplikacji.

Zobacz wpis na blogu [Compiler vs. Declarative i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pl/compiler_vs_declarative_i18n.md) dla głębszego porównania.

## Dlaczego nie używać Intlayer Compiler?

Chociaż kompilator oferuje doskonałe doświadczenie "działa od razu", wprowadza również pewne kompromisy, o których powinieneś wiedzieć:

- **Niejednoznaczność heurystyczna**: Kompilator musi zgadywać, co jest treścią skierowaną do użytkownika, a co logiką aplikacji (np. `className="active"`, kody statusu, ID produktów). W złożonych bazach kodu może to prowadzić do fałszywych pozytywów lub pominiętych ciągów znaków, które wymagają ręcznych adnotacji i wyjątków.
- **Tylko statyczna ekstrakcja**: Ekstrakcja oparta na kompilatorze opiera się na analizie statycznej. Ciągi znaków, które istnieją tylko w czasie wykonywania (kody błędów API, pola CMS itp.), nie mogą być odkryte ani przetłumaczone przez sam kompilator, więc nadal potrzebujesz uzupełniającej strategii i18n czasu wykonywania.

Aby uzyskać głębsze porównanie architektoniczne, zobacz wpis na blogu [Compiler vs. Declarative i18n](https://github.com/aymericzip/intlayer/blob/main/docs/blog/pl/compiler_vs_declarative_i18n.md).

Jako alternatywę, aby zautomatyzować proces i18n przy zachowaniu pełnej kontroli nad treścią, Intlayer zapewnia również polecenie auto-ekstrakcji `intlayer extract` (zobacz [dokumentację CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/cli/extract.md)) lub polecenie `Intlayer: extract content to Dictionary` z rozszerzenia Intlayer VS Code (zobacz [dokumentację rozszerzenia VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/vs_code_extension.md)).

## Użycie

<Tabs>
 <Tab value='vite'>

### Vite

Dla aplikacji opartych na Vite (React, Vue, Svelte itp.) najprostszym sposobem użycia kompilatora jest wtyczka `vite-intlayer`.

#### Instalacja

```bash
npm install vite-intlayer
```

#### Konfiguracja

Zaktualizuj swój plik `vite.config.ts`, aby dołączyć wtyczkę `intlayerCompiler`:

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import { intlayer, intlayerCompiler } from "vite-intlayer";

export default defineConfig({
  plugins: [
    intlayer(),
    intlayerCompiler(), // Dodaje wtyczkę kompilatora
  ],
});
```

See complete tutorial: [Intlayer Compiler with Vite+React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_vite+react_compiler.md)

#### Wsparcie dla frameworków

Wtyczka Vite automatycznie wykrywa i obsługuje różne typy plików:

- **React / JSX / TSX**: Obsługiwane natywnie.
- **Vue**: Wymaga `@intlayer/vue-compiler`.
- **Svelte**: Wymaga `@intlayer/svelte-compiler`.

Upewnij się, że zainstalowałeś odpowiedni pakiet kompilatora dla swojego frameworka:

```bash
# Dla Vue
npm install @intlayer/vue-compiler

# Dla Svelte
npm install @intlayer/svelte-compiler
```

 </Tab>
 <Tab value='nextjs'>

### Next.js (Babel)

Dla Next.js lub innych aplikacji opartych na Webpack z użyciem Babel, możesz skonfigurować kompilator za pomocą wtyczki `@intlayer/babel`.

#### Instalacja

```bash
npm install @intlayer/babel
```

#### Konfiguracja

Zaktualizuj swój plik `babel.config.js` (lub `babel.config.json`), aby uwzględnić wtyczkę ekstrakcji. Udostępniamy pomocniczą funkcję `getExtractPluginOptions`, która automatycznie ładuje Twoją konfigurację Intlayer.

```js fileName="babel.config.js"
const {
  intlayerExtractBabelPlugin,
  intlayerOptimizeBabelPlugin,
  getExtractPluginOptions,
  getOptimizePluginOptions,
} = require("@intlayer/babel");

module.exports = {
  presets: ["next/babel"],
  plugins: [
    // Wyodrębnij zawartość z komponentów do słowników
    [intlayerExtractBabelPlugin, getExtractPluginOptions()],
    // Optymalizuj importy, zastępując useIntlayer bezpośrednimi importami słowników
    [intlayerOptimizeBabelPlugin, getOptimizePluginOptions()],
  ],
};
```

Ta konfiguracja zapewnia, że zawartość zadeklarowana w Twoich komponentach jest automatycznie wyodrębniana i używana do generowania słowników podczas procesu budowania.

See complete tutorial: [Intlayer Compiler with Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_nextjs_compiler.md)

 </Tab>
</Tabs>

### Własna konfiguracja

Aby dostosować zachowanie kompilatora, możesz zaktualizować plik `intlayer.config.ts` w katalogu głównym swojego projektu.

````ts fileName="intlayer.config.ts"
import { type IntlayerConfig, Locales } from "intlayer";

const config: IntlayerConfig = {
  compiler: {
    /**
     * Wskazuje, czy kompilator powinien być włączony.
     * Ustaw na 'build-only', aby pominąć kompilator podczas programowania i przyspieszyć czas uruchamiania.
     */
    enabled: true,

    /**
     * Definiuje ścieżkę plików wyjściowych. Zastępuje `outputDir`.
     *
     * - Ścieżki zaczynające się od `./` są rozwiązywane względem katalogu komponentu.
     * - Ścieżki zaczynające się od `/` są rozwiązywane względem katalogu głównego projektu (`baseDir`).
     *
     * - Uwzględnienie zmiennej `{{locale}}` w ścieżce umożliwi generowanie słowników oddzielonych według języka.
     *
     * Przykłady:
     * ```ts
     * {
     *   // Utwórz wielojęzyczne pliki .content.ts obok komponentu
     *   output: ({ fileName, extension }) => `./${fileName}${extension}`,
     *
     *   // output: './{{fileName}}{{extension}}', // Równoważne użycie szablonu ciągu znaków
     * }
     * ```
     *
     * ```ts
     * {
     *   // Utwórz scentralizowane pliki JSON według języka w katalogu głównym projektu
     *   output: ({ key, locale }) => `/locales/${locale}/${key}.content.json`,
     *
     *   // output: '/locales/{{locale}}/{{key}}.content.json', // Równoważne użycie szablonu ciągu znaków
     * }
     * ```
     *
     * Lista zmiennych:
     *   - `fileName`: Nazwa pliku.
     *   - `key`: Klucz zawartości.
     *   - `locale`: Język zawartości.
     *   - `extension`: Rozszerzenie pliku.
     *   - `componentFileName`: Nazwa pliku komponentu.
     *   - `componentExtension`: Rozszerzenie pliku komponentu.
     *   - `format`: Format słownika.
     *   - `componentFormat`: Format słownika komponentu.
     *   - `componentDirPath`: Ścieżka do katalogu komponentu.
     */
    output: ({ fileName, extension }) => `./${fileName}${extension}`,

    /**
     * Wskazuje, czy komponenty powinny być zapisywane po transformacji.
     * W ten sposób kompilator można uruchomić tylko raz, aby przetransformować aplikację, a następnie go usunąć.
     */
    saveComponents: false,

    /**
     * Wstaw tylko zawartość do wygenerowanego pliku. Przydatne dla wyjścia JSON i18next lub ICU MessageFormat na język.
     *
     * - `output: ({ locale, key }) => `./locale/${locale}/${key}.json`,`
     */
    noMetadata: false,

    /**
     * Prefiks klucza słownika
     */
    dictionaryKeyPrefix: "", // Dodaj opcjonalny prefiks dla wyekstrahowanych kluczy słownika
  },
};
````

### Odniesienie do konfiguracji kompilatora

Następujące właściwości można skonfigurować w bloku `compiler` pliku `intlayer.config.ts`:

- **enabled**:
  - _Typ_: `boolean | 'build-only'`
  - _Domyślny_: `true`
  - _Opis_: Wskazuje, czy kompilator powinien być włączony.

- **dictionaryKeyPrefix**:
  - _Typ_: `string`
  - _Domyślny_: `''`
  - _Opis_: Prefiks dla wyekstrahowanych kluczy słownika.

- **transformPattern**:
  - _Typ_: `string | string[]`
  - _Domyślny_: `['**/*.{js,ts,mjs,cjs,jsx,tsx,vue,svelte}', '!**/node_modules/**']`
  - _Opis_: (Zdeprecjonowane: użyj `build.traversePattern` zamiast tego) Wzorce do przeszukiwania kodu w celu optymalizacji.

- **excludePattern**:
  - _Typ_: `string | string[]`
  - _Domyślny_: `['**/node_modules/**']`
  - _Opis_: (Zdeprecjonowane: użyj `build.traversePattern` zamiast tego) Wzorce do wykluczenia z optymalizacji.

- **output**:
  - _Typ_: `FilePathPattern`
  - _Domyślny_: `({ key }) => 'compiler/${key}.content.json'`
  - _Opis_: Definiuje ścieżkę plików wyjściowych. Zastępuje `outputDir`. Obsługuje zmienne dynamiczne, takie jak `{{locale}}`, `{{key}}`, `{{fileName}}`, `{{extension}}`, `{{format}}`, `{{dirPath}}`, `{{componentFileName}}`, `{{componentExtension}}`, `{{componentFormat}}`. Można ustawić jako ciąg znaków w formacie `'my/{{var}}/path'` lub jako funkcję.
  - _Uwaga_: Ścieżki `./**/*` są rozwiązywane względem komponentu. Ścieżki `/**/*` są rozwiązywane względem `baseDir` Intlayer.
  - _Uwaga_: Jeśli język jest zdefiniowany w ścieżce, słowniki będą generowane na język.
  - _Przykład_: `output: ({ locale, key }) => 'compiler/${locale}/${key}.json'`

- **noMetadata**:
  - _Typ_: `boolean`
  - _Domyślny_: `false`
  - _Opis_: Wskazuje, czy metadane powinny być zapisywane w pliku. Jeśli true, kompilator nie będzie zapisywał metadanych słowników (klucza, otoczki zawartości). Przydatne dla wyjść JSON i18next lub ICU MessageFormat na lokalizację.
  - _Uwaga_: Przydatne w przypadku korzystania z wtyczki `loadJSON`.
  - _Przykład_:
    Jeśli `true`:
    ```json
    {
      "key": "value"
    }
    ```
    Jeśli `false`:
    ```json
    {
      "key": "value",
      "content": {
        "key": "value"
      }
    }
    ```

- **saveComponents**:
  - _Typ_: `boolean`
  - _Domyślny_: `false`
  - _Opis_: Wskazuje, czy komponenty powinny być zapisywane po transformacji.

### Uzupełnij brakujące tłumaczenia

Intlayer udostępnia narzędzie CLI, które pomaga uzupełnić brakujące tłumaczenia. Możesz użyć polecenia `intlayer`, aby przetestować i uzupełnić brakujące tłumaczenia w swoim kodzie.

```bash
npx intlayer test         # Sprawdź, czy brakuje tłumaczeń
```

```bash
npx intlayer fill         # Uzupełnij brakujące tłumaczenia
```

### Ekstrakcja

Intlayer udostępnia narzędzie CLI do wyodrębniania treści z Twojego kodu. Możesz użyć polecenia `intlayer extract`, aby wyodrębnić treść ze swojego kodu.

```bash
npx intlayer extract
```

> Więcej szczegółów znajdziesz w [dokumentacji CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/cli/index.md)
