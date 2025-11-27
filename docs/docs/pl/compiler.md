---
createdAt: 2025-09-09
updatedAt: 2025-09-09
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
  - version: 7.3.1
    date: 2025-11-27
    changes: Wydanie kompilatora
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

Jako alternatywę, aby zautomatyzować proces i18n przy zachowaniu pełnej kontroli nad treścią, Intlayer zapewnia również polecenie auto-ekstrakcji `intlayer transform` (zobacz [dokumentację CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/cli/transform.md)) lub polecenie `Intlayer: extract content to Dictionary` z rozszerzenia Intlayer VS Code (zobacz [dokumentację rozszerzenia VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/vs_code_extension.md)).

## Użycie

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

### Next.js (Babel)

Dla Next.js lub innych aplikacji opartych na Webpack z użyciem Babel, możesz skonfigurować kompilator za pomocą wtyczki `@intlayer/babel`.

#### Instalacja

```bash
npm install @intlayer/babel
```

#### Konfiguracja

Zaktualizuj swój plik `babel.config.js` (lub `babel.config.json`), aby uwzględnić wtyczkę ekstrakcji. Udostępniamy pomocniczą funkcję `getCompilerOptions`, która automatycznie ładuje Twoją konfigurację Intlayer.

```js fileName="babel.config.js"
const { intlayerExtractBabelPlugin } = require("@intlayer/babel");
const { getCompilerOptions } = require("@intlayer/babel/compiler");

module.exports = {
  presets: ["next/babel"],
  plugins: [
    [
      intlayerExtractBabelPlugin,
      getCompilerOptions(), // Automatycznie ładuje opcje z intlayer.config.ts
    ],
  ],
};
```

Ta konfiguracja zapewnia, że zawartość zadeklarowana w Twoich komponentach jest automatycznie wyodrębniana i używana do generowania słowników podczas procesu budowania.
