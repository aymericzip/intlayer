---
createdAt: 2026-08-12
updatedAt: 2026-08-12
title: Wtyczka ESLint | Reguły lintera dla Intlayer
description: Wykrywaj zahardkodowane ciągi znaków, wywołania dynamiczne, których kompilator Intlayer nie jest w stanie zoptymalizować, oraz nieużywaną zawartość słowników dzięki eslint-plugin-intlayer. Działa z ESLint i oxlint w React, Vue, Svelte, Angular i Astro.
keywords:
  - Intlayer
  - ESLint
  - oxlint
  - Linting
  - i18n
  - Internacjonalizacja
  - no-raw-text
  - Zahardkodowane ciągi znaków
  - Nieużywane tłumaczenia
  - Martwa zawartość
  - React
  - Vue
  - Svelte
  - Angular
slugs:
  - doc
  - eslint
history:
  - version: 9.3.1
    date: 2026-08-12
    changes: "Inicjalna historia"
author: aymericzip
---

# Wtyczka ESLint x OXLint

`eslint-plugin-intlayer` wychwytuje rodzaje błędów i18n, których TypeScript nie jest w stanie wykryć:

1. **Zahardkodowany tekst**, który nigdy nie trafił do słownika.
2. **Dynamiczne wywołania**, które przechodzą sprawdzanie typów i działają, ale których kompilator Intlayer nie potrafi zoptymalizować.
3. **Martwa zawartość (Dead content)** — słowniki i pola, których nic w projekcie nie odczytuje (opcjonalne).

Nieznane klucze słowników, nieznane ścieżki pól oraz brakujące ustawienia regionalne stanowią już błędy kompilacji, więc wtyczka ich nie powiela.

## Instalacja

```bash packageManager="npm"
npm install --save-dev eslint-plugin-intlayer
```

```bash packageManager="pnpm"
pnpm add --save-dev eslint-plugin-intlayer
```

```bash packageManager="yarn"
yarn add --dev eslint-plugin-intlayer
```

Wymaga ESLint w wersji 9 lub nowszej (flat config).

## Użycie

Wtyczka działa zarówno w ESLint, jak i [oxlint](https://oxc.rs) — te same reguły, te same opcje.

<Tabs defaultTab="eslint">
  <Tab label="ESLint" value="eslint">

```javascript fileName="eslint.config.mjs" codeFormat="esm"
import intlayer from "eslint-plugin-intlayer";

export default [...intlayer.configs.recommended];
```

Lub włączaj reguły pojedynczo:

```javascript fileName="eslint.config.mjs" codeFormat="esm"
import intlayer from "eslint-plugin-intlayer";

export default [
  {
    plugins: { intlayer },
    rules: {
      "intlayer/no-raw-text": "warn",
      "intlayer/static-dictionary-key": "error",
      "intlayer/no-dynamic-field-access": "error",
      "intlayer/enforce-adapter-import": "warn",
      "intlayer/no-unused-content": "warn",
    },
  },
];
```

  </Tab>
  <Tab label="oxlint" value="oxlint">

```json fileName=".oxlintrc.json"
{
  "jsPlugins": ["eslint-plugin-intlayer"],
  "rules": {
    "intlayer/no-raw-text": "warn",
    "intlayer/static-dictionary-key": "error",
    "intlayer/no-dynamic-field-access": "error",
    "intlayer/enforce-adapter-import": "warn"
  }
}
```

Dwa zastrzeżenia: obsługa wtyczek JS w oxlint jest w fazie alfa, a oxlint nie obsługuje niestandardowych parserów — pliki `.vue`, `.svelte`, `.astro` oraz szablony Angular nie są tam sprawdzane. Uruchamiaj oxlint na plikach JS/TS/JSX, a ESLint pozostaw dla reszty.

Reguła `no-unused-content` została celowo pominięta powyżej: wymaga ona katalogu roboczego i ścieżki do sprawdzanego pliku z kontekstu reguły, czego mostek wtyczek JS w fazie alfa nie gwarantuje. Uruchamiaj ją pod ESLintem.

  </Tab>
</Tabs>

### Konfiguracje

| Konfiguracja    | `no-raw-text`               | `static-dictionary-key` | `no-dynamic-field-access` | `enforce-adapter-import` | `no-unused-content` |
| --------------- | --------------------------- | ----------------------- | ------------------------- | ------------------------ | ------------------- |
| `recommended`   | warn                        | error                   | error                     | off                      | off                 |
| `strict`        | error (+ literały poza JSX) | error                   | error                     | error                    | off                 |
| `contract-only` | off                         | error                   | error                     | off                      | off                 |

`recommended` celowo utrzymuje `no-raw-text` na poziomie `warn`: uruchomienie jej na istniejącej bazie kodu ujawnia wszystkie nieprzetłumaczone ciągi znaków naraz, co nie powinno blokować procesu budowania od pierwszego dnia.

`enforce-adapter-import` jest domyślnie wyłączona — włącz ją jawnie, jeśli tego potrzebujesz.

`no-unused-content` jest wyłączona w każdej konfiguracji, w tym `strict`. Jest to jedyna reguła, która odczytuje konfigurację Intlayer i przeszukuje pliki źródłowe na dysku, więc jej włączenie powinno być świadomym wyborem, a nie domyślnym zachowaniem zestawu.

## Reguły

### `no-raw-text`

Zgłasza tekst widoczny dla użytkownika, który nie jest zadeklarowany w słowniku. Używa tej samej metody detekcji co `intlayer extract`, dzięki czemu nazwy marek, klasy CSS i identyfikatory techniczne są ignorowane.

```jsx
// ✗ Zgłoszone
<h1>Welcome to our documentation</h1>
<input placeholder="Enter your email address" />

// ✓ Prawidłowo
const { title } = useIntlayer("home");
<h1>{title}</h1>
```

Pliki deklaracji zawartości (`*.content.ts`, …) są pomijane.

Aby naprawić cały plik naraz, uruchom `npx intlayer extract`, a kompilator automatycznie przeniesie ciągi znaków do słownika.

**Opcje**

```javascript fileName="eslint.config.mjs" codeFormat="esm"
{
  "intlayer/no-raw-text": [
    "warn",
    {
      // Atrybuty, których wartością jest tekst widoczny dla użytkownika.
      // Domyślnie: title, placeholder, alt, aria-label, label
      attributes: ["title", "placeholder", "alt", "aria-label", "label"],

      // Elementy, których zawartość nigdy nie jest tekstem widocznym dla użytkownika.
      // Domyślnie: code, pre, script, style
      ignoreElements: ["code", "pre", "script", "style"],

      // Wyrażenia regularne dla tekstu, który nigdy nie powinien być zgłaszany.
      ignorePatterns: ["^Powered by"],

      // Zgłaszaj także literały łańcuchowe poza markupem. Domyślnie: false
      includeStringLiterals: false,
    },
  ],
}
```

### `static-dictionary-key`

Wymaga, aby klucz słownika był literałem łańcuchowym.

Kompilator może wstępnie załadować słownik tylko wtedy, gdy może bezpośrednio odczytać klucz w miejscu wywołania. W przypadku obliczanego klucza optymalizacja jest po cichu pomijana i zamiast tego dołączane są wszystkie słowniki.

```typescript
// ✗ Zgłoszone
useIntlayer(dictionaryKey);
useIntlayer(`home-${suffix}`);
getTranslations({ namespace: page });

// ✗ Zmienna nadal nie jest literałem
const key = "home";
useIntlayer(key);

// ✓ Prawidłowo
useIntlayer("home");
getTranslations({ namespace: "home" });
```

Dotyczy to `useIntlayer`, `getIntlayer` oraz każdego adaptera kompatybilności (`useTranslation`, `useTranslations`, `formatMessage`, `<FormattedMessage id>`, `<Trans i18nKey>`, …).

### `no-dynamic-field-access`

Wymaga, aby pole odczytywane ze słownika było znane statycznie.

Kompilator usuwa pola, których użycia nie zarejestruje. Dostęp dynamiczny jest dla niego niewidoczny, więc odczyt może zwrócić `undefined` w czasie wykonywania.

```typescript
// ✗ Zgłoszone
const content = useIntlayer("home");
content[fieldName];

const t = useTranslations("home");
t(messageKey);

// ✓ Prawidłowo
content.title;
content["title"];
content.items[0];
t("hero.title");
```

### `enforce-adapter-import`

Preferuje adapter kompatybilności `@intlayer/*` zamiast oryginalnego pakietu. Oryginalny pakiet rozwiązuje się do Intlayer tylko wtedy, gdy skonfigurowany jest alias bundlera; adapter działa zawsze. Możliwość automatycznej naprawy za pomocą `--fix`.

```typescript
// ✗ Zgłoszone
import { useTranslation } from "react-i18next";
import { getTranslations } from "next-intl/server";

// ✓ Prawidłowo
import { useTranslation } from "@intlayer/react-i18next";
import { getTranslations } from "@intlayer/next-intl/server";
```

### `no-unused-content`

**Domyślnie wyłączona.** Zgłasza zawartość, której nic w projekcie nie odczytuje, oraz klucze słowników zadeklarowane w więcej niż jednym miejscu.

```typescript fileName="src/home.content.ts"
export default {
  key: "home", // ✗ Zgłaszane, gdy żadne wywołanie w projekcie nie odpytuje o "home"
  content: {
    title: t({ pl: "Tytuł", en: "Title" }),

    // ✗ Zgłaszane, gdy nic nie odczytuje `hero`
    hero: {
      subtitle: t({ pl: "Podtytuł", en: "Subtitle" }),
    },
  },
};
```

W przeciwieństwie do innych reguł, ta nie jest w stanie ocenić sytuacji wyłącznie na podstawie sprawdzanego pliku — pole jest nieużywane tylko w kontekście całego projektu. Przy pierwszej deklaracji zawartości podczas działania lintera wczytuje konfigurację Intlayer, skanuje pliki źródłowe wskazane przez tę konfigurację (`build.traversePattern`, `compiler.transformPattern`) i uruchamia ten sam analizator użycia, który zasila `@intlayer/lsp` oraz przekreślenie „nieużywane” w rozszerzeniu VS Code. Wynik jest buforowany przez `cacheTtl` milisekund, więc skanowanie odbywa się raz na uruchomienie, a nie dla każdego pliku.

**Opcje**

```javascript fileName="eslint.config.mjs" codeFormat="esm"
{
  "intlayer/no-unused-content": [
    "warn",
    {
      // Zgłaszaj klucze słowników, do których nic się nie odwołuje. Domyślnie: true
      reportUnusedDictionaries: true,

      // Zgłaszaj pola zawartości, których nic nie odczytuje. Domyślnie: true
      reportUnusedFields: true,

      // Zgłaszaj klucze zadeklarowane w więcej niż jednym miejscu. Domyślnie: true
      reportDuplicateKeys: true,

      // Wyrażenia regularne dla ścieżek pól, które nigdy nie powinny być zgłaszane.
      ignoreFields: ["^meta"],

      // Katalog główny projektu, od którego zaczyna się skanowanie. Domyślnie: katalog roboczy ESLint
      baseDir: process.cwd(),

      // Czas ponownego użycia skanu projektu (w ms). Domyślnie: 30000
      cacheTtl: 30000,
    },
  ],
}
```

Zmniejsz `cacheTtl`, gdy korzystasz z lintera działającego jako serwer edytora i chcesz szybciej widzieć zmiany; ustaw `baseDir`, gdy jedno uruchomienie lintera obejmuje kilka projektów Intlayer w monorepo.

> **Preferuje brak zgłoszenia w razie wątpliwości.** Fałszywy alarm w tym miejscu mógłby usunąć potrzebne tłumaczenie, dlatego nic nie jest zgłaszane, gdy słownik jest używany w sposób, którego analiza nie potrafi prześledzić: przekazanie całego obiektu zawartości, powiązana z niego funkcja tłumacząca (`const t = useTranslations("home")`), deklaracja dostępna przez bezpośredni import (`useDictionary(myDictionary)`), `nest()` z innego słownika lub lista pól, która stała się niepełna przez operator spread. Komponenty jednoplikowe (`.vue`, `.svelte`, `.astro`) są traktowane jako używające każdego pola wymienionych słowników, ponieważ ich bloki skryptów nie są tu parsowane.

`reportDuplicateKeys` odczytuje niescalone słowniki, które proces budowania zapisuje w `.intlayer/`, więc zachowuje milczenie do momentu, aż projekt zostanie zbudowany przynajmniej raz. Dwie deklaracje dzielące ten sam klucz są scalane, co jest poprawnym wzorcem — raport istnieje, ponieważ pole zdefiniowane po obu stronach po cichu zachowuje tylko jedną z dwóch wartości.

Analizator jest ładowany z `@intlayer/lsp`, który jest dystrybuowany jako ESM. Reguła wymaga zatem wersji Node obsługującej `require()` dla modułów ES — Node 20.19+ lub 22.12+. Na starszych wersjach reguła nic nie zgłasza, zamiast powodować błąd działania lintera.

## Frameworki

Każda reguła działa we wszystkich integracjach Intlayer, w tym wewnątrz szablonów Vue, Svelte i Angular. Wystarczy wskazać ESLintowi, który parser obsługuje dany typ pliku.

| Framework                 | Pliki             | Parser                            |
| ------------------------- | ----------------- | --------------------------------- |
| React, Preact, Solid, Lit | `.jsx` `.tsx`     | `typescript-eslint`               |
| Next.js                   | `.jsx` `.tsx`     | `typescript-eslint`               |
| Vue, Nuxt                 | `.vue`            | `vue-eslint-parser`               |
| Svelte, SvelteKit         | `.svelte`         | `svelte-eslint-parser`            |
| Angular                   | `.ts`             | `typescript-eslint`               |
| Szablony Angular          | `.component.html` | `@angular-eslint/template-parser` |
| Astro                     | `.astro`          | `astro-eslint-parser`             |

```javascript fileName="eslint.config.mjs" codeFormat="esm"
import intlayer from "eslint-plugin-intlayer";
import tseslint from "typescript-eslint";
import vueParser from "vue-eslint-parser";
import svelteParser from "svelte-eslint-parser";
import angularTemplateParser from "@angular-eslint/template-parser";

export default [
  ...intlayer.configs.recommended,

  {
    files: ["**/*.{ts,tsx,jsx}"],
    languageOptions: { parser: tseslint.parser },
  },
  {
    files: ["**/*.vue"],
    languageOptions: {
      parser: vueParser,
      parserOptions: { parser: tseslint.parser },
    },
  },
  {
    files: ["**/*.svelte"],
    languageOptions: {
      parser: svelteParser,
      parserOptions: { parser: tseslint.parser },
    },
  },
  {
    files: ["**/*.component.html"],
    languageOptions: { parser: angularTemplateParser },
  },
];
```

Instaluj tylko te parsery, których wymaga Twój projekt.

> **Znane ograniczenie.** W szablonach Vue i Angular wyrażenie takie jak `{{ content[key] }}` nie jest sprawdzane przez `no-dynamic-field-access`. Odczyty dynamiczne zapisane w bloku script są wykrywane w normalny sposób.
