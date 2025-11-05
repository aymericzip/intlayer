---
createdAt: 2025-03-13
updatedAt: 2025-09-20
title: Autouzupełnianie
description: Dowiedz się, jak korzystać z funkcji autouzupełniania w Intlayer, aby automatycznie wypełniać zawartość na podstawie zdefiniowanych wzorców. Postępuj zgodnie z tą dokumentacją, aby efektywnie wdrożyć funkcje autouzupełniania w swoim projekcie.
keywords:
  - Autouzupełnianie
  - Automatyzacja treści
  - Dynamiczna zawartość
  - Intlayer
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - concept
  - auto-fill
history:
  - version: 7.0.0
    date: 2025-10-23
    changes: Zmiana nazwy `autoFill` na `fill` oraz aktualizacja zachowania
  - version: 6.0.0
    date: 2025-09-20
    changes: Dodanie konfiguracji globalnej
  - version: 6.0.0
    date: 2025-09-17
    changes: Dodanie zmiennej `{{fileName}}`
  - version: 5.5.10
    date: 2025-06-29
    changes: Inicjalizacja historii
---

# Tłumaczenia plików deklaracji wypełniania zawartości

**Pliki deklaracji autouzupełniania** w Twoim CI to sposób na przyspieszenie procesu tworzenia oprogramowania.

## Domyślne zachowanie

Domyślnie `fill` jest ustawione globalnie na `true`, co oznacza, że Intlayer automatycznie wypełni wszystkie pliki zawartości i edytuje sam plik. To zachowanie można dostosować na kilka sposobów:

### Globalne opcje konfiguracji

1. **`fill: true` (domyślnie)** - Automatyczne wypełnianie wszystkich lokalizacji i edycja bieżącego pliku
2. **`fill: false`** - Wyłączenie autouzupełniania dla tego pliku zawartości
3. **`fill: "path/to/file"`** - Utworzenie/aktualizacja określonego pliku bez edycji bieżącego
4. **`fill: { [key in Locales]?: string }`** - Utworzenie/aktualizacja określonego pliku dla każdej lokalizacji

### Zmiany zachowania w wersji v7

W wersji 7 zachowanie polecenia `fill` zostało zaktualizowane:

- **`fill: true`** - Nadpisuje bieżący plik wypełnioną zawartością dla wszystkich lokalizacji
- **`fill: "path/to/file"`** - Wypełnia określony plik bez modyfikowania bieżącego pliku
- **`fill: false`** - Całkowicie wyłącza autouzupełnianie

Podczas używania opcji ścieżki do zapisu do innego pliku, mechanizm wypełniania działa na zasadzie relacji _master-slave_ między plikami deklaracji zawartości. Główny (master) plik służy jako źródło prawdy, a gdy zostanie zaktualizowany, Intlayer automatycznie zastosuje te zmiany do pochodnych (wypełnionych) plików deklaracji określonych przez ścieżkę.

### Dostosowanie dla poszczególnych lokalizacji

Możesz również dostosować zachowanie dla każdej lokalizacji, używając obiektu:

```ts fileName="intlayer.config.ts"
const config: IntlayerConfig = {
  content: {
    internationalization: {
      locales: [Locales.ENGLISH, Locales.FRENCH, Locales.POLISH],
      defaultLocale: Locales.ENGLISH,
      requiredLocales: [Locales.ENGLISH], // Zalecane, aby uniknąć błędu Property 'pl' is missing in type '{ en: string; xxx }' w funkcji t
    },
  },
  dictionary: {
    fill: {
      en: true, // Wypełnij i edytuj bieżący plik dla języka angielskiego
      fr: "./translations/fr.json", // Utwórz osobny plik dla języka francuskiego
      es: false, // Wyłącz wypełnianie dla języka hiszpańskiego
    },
  },
};
```

To pozwala na różne zachowania wypełniania dla różnych lokalizacji w ramach tego samego projektu.

```ts fileName="src/components/example/example.content.ts"
import { Locales, type Dictionary } from "intlayer";

const exampleContent = {
  key: "example",
  locale: Locales.ENGLISH,
  fill: "./example.content.json",
  content: {
    contentExample: "To jest przykład zawartości",
  },
} satisfies Dictionary;

export default exampleContent;
```

Oto [plik deklaracji zawartości dla poszczególnych lokalizacji](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/per_locale_file.md) wykorzystujący instrukcję `fill`.

Następnie, gdy uruchomisz następujące polecenie:

```bash
npx intlayer fill --file 'src/components/example/example.content.ts'
```

Intlayer automatycznie wygeneruje pochodny plik deklaracji w `src/components/example/example.content.json`, wypełniając wszystkie lokalizacje, które nie zostały jeszcze zadeklarowane w głównym pliku.

```json5 fileName="src/components/example/example.content.json"
{
  "key": "example",
  "content": {
    "contentExample": {
      "nodeType": "translation",
      "translation": {
        "fr": "Ceci est un exemple de contenu",
        "es": "Este es un ejemplo de contenido",
      },
    },
  },
}
```

Następnie oba pliki deklaracji zostaną scalone w jeden słownik, dostępny za pomocą standardowego hooka `useIntlayer("example")` (react) / composable (vue).

## Konfiguracja globalna

Możesz skonfigurować globalną konfigurację automatycznego wypełniania w pliku `intlayer.config.ts`.

```ts fileName="intlayer.config.ts"
import { type IntlayerConfig, Locales } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
    requiredLocales: [Locales.ENGLISH, Locales.FRENCH],
  },
  dictionary: {
    // Automatyczne generowanie brakujących tłumaczeń dla wszystkich słowników
    fill: "./{{fileName}}Filled.content.ts",
    //
    // fill: "/messages/{{locale}}/{{key}}/{{fileName}}.content.json",
    //
    // fill: true, // automatyczne generowanie brakujących tłumaczeń dla wszystkich słowników, jak przy użyciu "./{{fileName}}.content.json"
    //
    // fill: {
    //   en: "./{{fileName}}.en.content.json",
    //   fr: "./{{fileName}}.fr.content.json",
    //   es: "./{{fileName}}.es.content.json",
    // },
  },
};

export default config;
```

Możesz nadal precyzyjnie dostosować konfigurację dla poszczególnych słowników, używając pola `fill` w plikach z zawartością. Intlayer najpierw uwzględni konfigurację dla konkretnego słownika, a następnie, w razie potrzeby, przejdzie do konfiguracji globalnej.

## Format pliku automatycznie wypełnianego

Zalecanym formatem dla automatycznie wypełnianych plików deklaracji jest **JSON**, co pomaga uniknąć ograniczeń formatowania. Jednak Intlayer obsługuje również formaty `.ts`, `.js`, `.mjs`, `.cjs` oraz inne.

```ts fileName="src/components/example/example.content.ts"
const exampleContent = {
  key: "example",
  fill: "./example.filled.content.ts",
  content: {
    // Twoja zawartość
  },
};
```

To spowoduje wygenerowanie pliku pod ścieżką:

```
src/components/example/example.filled.content.ts
```

> Generowanie plików `.js`, `.ts` i podobnych działa w następujący sposób:
>
> - Jeśli plik już istnieje, Intlayer przeanalizuje go za pomocą AST (Abstract Syntax Tree), aby zlokalizować każde pole i wstawić brakujące tłumaczenia.
> - Jeśli plik nie istnieje, Intlayer wygeneruje go, używając domyślnego szablonu pliku deklaracji zawartości.

## Ścieżki bezwzględne

Pole `fill` obsługuje również ścieżki bezwzględne.

```ts fileName="src/components/example/example.content.ts"
const exampleContent = {
  key: "example",
  fill: "/messages/example.content.json",
  content: {
    // Twoja zawartość
  },
};
```

To wygeneruje plik pod ścieżką:

```
/messages/example.content.json
```

## Automatyczne generowanie plików deklaracji zawartości dla poszczególnych lokalizacji

Pole `fill` obsługuje również generowanie plików deklaracji zawartości **dla poszczególnych lokalizacji**.

```ts fileName="src/components/example/example.content.ts"
const exampleContent = {
  key: "example",
  fill: {
    fr: "./example.fr.content.json",
    es: "./example.es.content.json",
  },
  content: {
    // Twoja zawartość
  },
};
```

To wygeneruje dwa oddzielne pliki:

- `src/components/example/example.fr.content.json`
- `src/components/example/example.es.content.json`

> W tym przypadku, jeśli obiekt nie zawiera wszystkich lokalizacji, Intlayer pomija generowanie pozostałych lokalizacji.

## Filtrowanie automatycznego wypełniania dla konkretnej lokalizacji

Użycie obiektu w polu `fill` pozwala na zastosowanie filtrów i generowanie tylko plików dla określonych lokalizacji.

```ts fileName="src/components/example/example.content.ts"
const exampleContent = {
  key: "example",
  fill: {
    fr: "./example.fr.content.json",
  },
  content: {
    // Twoja zawartość
  },
};
```

To wygeneruje tylko plik z tłumaczeniem na język francuski.

## Zmienne ścieżek

Możesz używać zmiennych w ścieżce `fill`, aby dynamicznie rozwiązywać docelowe ścieżki dla generowanych plików.

**Dostępne zmienne:**

- `{{locale}}` – Kod lokalizacji (np. `fr`, `es`)
- `{{fileName}}` – Nazwa pliku (np. `index`)
- `{{key}}` – Klucz słownika (np. `example`)

```ts fileName="src/components/example/index.content.ts"
const exampleContent = {
  key: "example",
  fill: "/messages/{{locale}}/{{key}}.content.json",
  content: {
    // Twoja zawartość
  },
};
```

To wygeneruje:

- `/messages/fr/example.content.json`
- `/messages/es/example.content.json`

```ts fileName="src/components/example/index.content.ts"
const exampleContent = {
  key: "example",
  fill: "./{{fileName}}.content.json",
  content: {
    // Twoja zawartość
  },
};
```

To wygeneruje:

- `./index.content.json`
- `./index.content.json`
