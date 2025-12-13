---
createdAt: 2025-02-07
updatedAt: 2025-12-13
title: Plik z Treścią
description: Dowiedz się, jak dostosować rozszerzenia dla plików deklaracji treści. Postępuj zgodnie z tą dokumentacją, aby efektywnie wdrażać warunki w swoim projekcie.
keywords:
  - Plik z Treścią
  - Dokumentacja
  - Intlayer
slugs:
  - doc
  - concept
  - content
history:
  - version: 7.5.0
    date: 2025-12-13
    changes: Dodano obsługę formatów ICU i i18next
  - version: 7.0.0
    date: 2025-10-23
    changes: Zmiana nazwy `autoFill` na `fill`
  - version: 6.0.0
    date: 2025-09-20
    changes: Dodano dokumentację pól
  - version: 5.5.10
    date: 2025-06-29
    changes: Inicjalizacja historii
---

# Plik z Treścią

<iframe title="i18n, Markdown, JSON… jedno rozwiązanie do zarządzania wszystkim | Intlayer" class="m-auto aspect-[16/9] w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/1VHgSY_j9_I?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

## Czym jest Plik z Treścią?

Plik z treścią w Intlayer to plik zawierający definicje słowników.
Te pliki deklarują tekstową zawartość Twojej aplikacji, tłumaczenia oraz zasoby.
Pliki z treścią są przetwarzane przez Intlayer w celu wygenerowania słowników.

Słowniki będą ostatecznym wynikiem, który Twoja aplikacja zaimportuje za pomocą hooka `useIntlayer`.

### Kluczowe Pojęcia

#### Słownik

Słownik to uporządkowany zbiór treści zorganizowany według kluczy. Każdy słownik zawiera:

- **Key**: Unikalny identyfikator słownika
- **Content**: Rzeczywiste wartości treści (tekst, liczby, obiekty itp.)
- **Metadata**: Dodatkowe informacje, takie jak tytuł, opis, tagi itp.

#### Plik z Treścią

Przykład pliku z treścią:

```tsx fileName="src/example.content.tsx" contentDeclarationFormat="typescript"
import { type ReactNode } from "react";
import {
  t,
  enu,
  cond,
  nest,
  md,
  insert,
  file,
  type Dictionary,
} from "intlayer";

interface Content {
  imbricatedContent: {
    imbricatedContent2: {
      stringContent: string;
      numberContent: number;
      booleanContent: boolean;
      javaScriptContent: string;
    };
  };
  multilingualContent: string;
  quantityContent: string;
  conditionalContent: string;
  markdownContent: never;
  externalContent: string;
  insertionContent: string;
  nestedContent: string;
  fileContent: string;
  jsxContent: ReactNode;
}

export default {
  key: "page",
  content: {
    imbricatedContent: {
      imbricatedContent2: {
        stringContent: "Hello World",
        numberContent: 123,
        booleanContent: true,
        javaScriptContent: `${process.env.NODE_ENV}`,
      },
    },
    multilingualContent: t({
      en: "English content",
      "en-GB": "English content (UK)",
      fr: "French content",
      es: "Spanish content",
    }),
    quantityContent: enu({
      "<-1": "Mniej niż minus jeden samochód",
      "-1": "Minus jeden samochód",
      "0": "Brak samochodów",
      "1": "Jeden samochód",
      ">5": "Kilka samochodów",
      ">19": "Wiele samochodów",
    }),
    conditionalContent: cond({
      true: "Walidacja jest włączona",
      false: "Walidacja jest wyłączona",
    }),
    insertionContent: insert("Witaj {{name}}!"),
    nestedContent: nest(
      "navbar", // Klucz słownika do zagnieżdżenia
      "login.button" // [Opcjonalnie] Ścieżka do zawartości do zagnieżdżenia
    ),
    fileContent: file("./path/to/file.txt"),
    externalContent: fetch("https://example.com").then((res) => res.json()),
    markdownContent: md("# Przykład Markdown"),

    /*
     * Dostępne tylko przy użyciu `react-intlayer` lub `next-intlayer`
     */
    jsxContent: <h1>Mój tytuł</h1>,
  },
} satisfies Dictionary<Content>; // [opcjonalnie] Dictionary jest generyczny i pozwala na wzmocnienie formatowania słownika
```

```javascript fileName="src/example.content.mjx" contentDeclarationFormat="esm"
import { t, enu, cond, nest, md, insert, file } from "intlayer";

/** @type {import('intlayer').Dictionary} */
export default {
  key: "page",
  content: {
    imbricatedContent: {
      imbricatedContent2: {
        stringContent: "Witaj świecie", // Zawartość tekstowa
        numberContent: 123, // Zawartość liczbowa
        booleanContent: true, // Zawartość logiczna
        javaScriptContent: `${process.env.NODE_ENV}`, // Zawartość JavaScript
      },
      imbricatedArray: [1, 2, 3], // Zagnieżdżona tablica
    },
    multilingualContent: t({
      en: "English content",
      "en-GB": "English content (UK)",
      fr: "French content",
      es: "Spanish content",
    }),
    quantityContent: enu({
      "<-1": "Mniej niż minus jeden samochód",
      "-1": "Minus jeden samochód",
      "0": "Brak samochodów",
      "1": "Jeden samochód",
      ">5": "Kilka samochodów",
      ">19": "Wiele samochodów",
    }),
    conditionalContent: cond({
      true: "Walidacja jest włączona",
      false: "Walidacja jest wyłączona",
    }),
    insertionContent: insert("Witaj {{name}}!"),
    nestedContent: nest(
      "navbar", // Klucz słownika do zagnieżdżenia
      "login.button" // [Opcjonalnie] Ścieżka do zawartości do zagnieżdżenia
    ),
    markdownContent: md("# Przykład Markdown"),
    fileContent: file("./path/to/file.txt"),
    externalContent: fetch("https://example.com").then((res) => res.json())

    // Dostępne tylko przy użyciu `react-intlayer` lub `next-intlayer`
    jsxContent: <h1>Mój tytuł</h1>,
  },
};
```

```javascript fileName="src/example.content.cjx" contentDeclarationFormat="commonjs"
const { t, enu, cond, nest, md, insert, file } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
module.exports = {
  key: "page",
  content: {
    imbricatedContent: {
      imbricatedContent2: {
        stringContent: "Hello World", // Zawartość tekstowa
        numberContent: 123, // Zawartość liczbowa
        booleanContent: true, // Zawartość logiczna
        javaScriptContent: `${process.env.NODE_ENV}`, // Zawartość JavaScript
      },
      imbricatedArray: [1, 2, 3], // Zagnieżdżona tablica
    },
    multilingualContent: t({
      en: "English content",
      "en-GB": "English content (UK)",
      fr: "French content",
      es: "Spanish content",
    }),
    quantityContent: enu({
      "<-1": "Mniej niż minus jeden samochód",
      "-1": "Minus jeden samochód",
      "0": "Brak samochodów",
      "1": "Jeden samochód",
      ">5": "Kilka samochodów",
      ">19": "Wiele samochodów",
    }),
    conditionalContent: cond({
      true: "Walidacja jest włączona",
      false: "Walidacja jest wyłączona",
    }),
    insertionContent: insert("Witaj {{name}}!"),
    nestedContent: nest(
      "navbar", // Klucz słownika do zagnieżdżenia
      "login.button" // [Opcjonalne] Ścieżka do zawartości do zagnieżdżenia
    ),
    markdownContent: md("# Przykład Markdown"),
    fileContent: file("./path/to/file.txt"),
    externalContent: fetch("https://example.com").then((res) => res.json())

    // Dostępne tylko przy użyciu `react-intlayer` lub `next-intlayer`
    jsxContent: <h1>Mój tytuł</h1>,
  },
};
```

```json5 fileName="src/example.content.json"  contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "page",
  "content": {
    "imbricatedContent": {
      "imbricatedContent2": {
        "stringContent": "Witaj świecie",
        "numberContent": 123,
        "booleanContent": true,
      },
      "imbricatedArray": [1, 2, 3],
    },
    "multilingualContent": {
      "nodeType": "translation",
      "translation": {
        "en": "English content",
        "en-GB": "English content (UK)",
        "fr": "French content",
        "es": "Spanish content",
      },
    },
    "quantityContent": {
      "nodeType": "enumeration",
      "enumeration": {
        "0": "Brak samochodów",
        "1": "Jeden samochód",
        "<-1": "Mniej niż minus jeden samochód",
        "-1": "Minus jeden samochód",
        ">5": "Kilka samochodów",
        ">19": "Wiele samochodów",
      },
    },
    "conditionalContent": {
      "nodeType": "condition",
      "condition": {
        "true": "Walidacja jest włączona",
        "false": "Walidacja jest wyłączona",
      },
    },
    "insertionContent": {
      "nodeType": "insertion",
      "insertion": "Witaj {{name}}!",
    },
    "nestedContent": {
      "nodeType": "nested",
      "nested": { "dictionaryKey": "app" },
    },
    "markdownContent": {
      "nodeType": "markdown",
      "markdown": "# Przykład Markdown",
    },
    "fileContent": {
      "nodeType": "file",
      "file": "./path/to/file.txt",
    },
    "jsxContent": {
      "type": "h1",
      "key": null,
      "ref": null,
      "props": {
        "children": ["Mój tytuł"],
      },
    },
  },
}
```

#### Węzły treści

Węzły treści są podstawowymi elementami zawartości słownika. Mogą to być:

- **Wartości prymitywne**: łańcuchy znaków, liczby, wartości logiczne, null, undefined
- **Węzły typowane**: Specjalne typy zawartości, takie jak tłumaczenia, warunki, markdown itp.
- **Funkcje**: Dynamiczna zawartość, która może być oceniana w czasie wykonywania [zobacz Pobieranie funkcji](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/function_fetching.md)
- **Zagnieżdżona zawartość**: Odwołania do innych słowników

#### Typy zawartości

Intlayer obsługuje różne typy zawartości poprzez węzły typowane:

- **Zawartość tłumaczenia**: Wielojęzyczny tekst z wartościami specyficznymi dla lokalizacji [zobacz Zawartość tłumaczenia](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/translation_content.md)
- **Zawartość warunkowa**: Zawartość warunkowa oparta na wyrażeniach logicznych [zobacz Zawartość warunkową](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/condition_content.md)
- **Zawartość enumeracji**: Zawartość zmieniająca się w zależności od wartości enumerowanych [zobacz Zawartość enumeracji](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/enumeration_content.md)
- **Zawartość wstawiania**: Zawartość, którą można wstawić do innej zawartości [zobacz Zawartość wstawiania](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/insertion_content.md)
- **Zawartość Markdown**: Zawartość tekstu sformatowanego w formacie Markdown [zobacz Zawartość Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/markdown_content.md)
- **Zagnieżdżona zawartość**: Odwołania do innych słowników [zobacz Zagnieżdżoną zawartość](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/nested_content.md)
- **Zawartość zależna od płci**: Zawartość zmieniająca się w zależności od płci [zobacz Zawartość zależną od płci](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/gender_content.md)
- **Zawartość plikowa**: Odwołania do plików zewnętrznych [zobacz Zawartość plikową](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/file_content.md)

## Struktura słownika

Słownik w Intlayer jest definiowany przez typ `Dictionary` i zawiera kilka właściwości, które kontrolują jego zachowanie:

### Wymagane właściwości

#### `key` (string)

Identyfikator słownika. Jeśli wiele słowników ma ten sam klucz, Intlayer automatycznie je połączy.

> Używaj konwencji nazewnictwa kebab-case (np. `"about-page-meta"`).

#### Content (string | number | boolean | object | array | function)

Właściwość `content` zawiera rzeczywiste dane słownika i obsługuje:

- **Wartości prymitywne**: łańcuchy znaków, liczby, wartości logiczne, null, undefined
- **Typowane węzły**: Specjalne typy zawartości wykorzystujące funkcje pomocnicze Intlayer
- **Zagnieżdżone obiekty**: Złożone struktury danych
- **Tablice**: Kolekcje zawartości
- **Funkcje**: Dynamiczna ewaluacja zawartości

### Właściwości opcjonalne

#### `title` (string)

Czytelny dla człowieka tytuł słownika, który pomaga go zidentyfikować w edytorach i systemach CMS. Jest to szczególnie przydatne podczas zarządzania dużą liczbą słowników lub pracy z interfejsami do zarządzania treścią.

**Przykład:**

```typescript
{
  key: "about-page-meta",
  title: "Metadane strony O nas",
  content: { /* ... */ }
}
```

#### `description` (string)

Szczegółowy opis wyjaśniający cel słownika, zasady jego użycia oraz wszelkie specjalne uwagi. Ten opis jest również wykorzystywany jako kontekst dla generowania tłumaczeń wspomaganych przez AI, co jest cenne dla utrzymania jakości i spójności tłumaczeń.

**Przykład:**

```typescript
{
  key: "about-page-meta",
  description: [
    "Ten słownik zarządza metadanymi strony O nas",
    "Rozważ dobre praktyki SEO:",
    "- Tytuł powinien mieć od 50 do 60 znaków",
    "- Opis powinien mieć od 150 do 160 znaków",
  ].join('\n'),
  content: { /* ... */ }
}
```

#### `tags` (string[])

Tablica łańcuchów znaków służąca do kategoryzacji i organizacji słowników. Tagi dostarczają dodatkowego kontekstu i mogą być używane do filtrowania, wyszukiwania lub organizowania słowników w edytorach i systemach CMS.

**Przykład:**

```typescript
{
  key: "about-page-meta",
  tags: ["metadata", "about-page", "seo"],
  content: { /* ... */ }
}
```

#### `format` ('intlayer' | 'icu' | 'i18next')

Określa formatter do użycia dla zawartości słownika. Pozwala to na używanie różnych składni formatowania wiadomości.

- `'intlayer'`: Domyślny formatter Intlayer.
- `'icu'`: Używa formatowania wiadomości ICU.
- `'i18next'`: Używa formatowania wiadomości i18next.

**Przykład:**

```typescript
{
  key: "my-dictionary",
  format: "icu",
  content: {
    message: "Hello {name}, you have {count, plural, one {# message} other {# messages}}"
  }
}
```

#### `locale` (LocalesValues)

Przekształca słownik w słownik per-lokalizacyjny, gdzie każde pole zadeklarowane w zawartości zostanie automatycznie przekształcone w węzeł tłumaczenia. Gdy ta właściwość jest ustawiona:

- Słownik jest traktowany jako słownik dla pojedynczego języka
- Każde pole staje się węzłem tłumaczenia dla tego konkretnego języka
- Nie należy używać węzłów tłumaczenia (`t()`) w zawartości podczas korzystania z tej właściwości
- Jeśli właściwość jest pominięta, słownik będzie traktowany jako wielojęzyczny

> Zobacz [Deklarację zawartości per-locale w Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/per_locale_file.md) po więcej informacji.

**Przykład:**

```json
// Słownik per-locale
{
  "key": "about-page",
  "locale": "en",
  "content": {
    "title": "About Us", // To staje się węzłem tłumaczenia dla 'en'
    "description": "Learn more about our company"
  }
}
```

#### `fill` (Fill)

Instrukcje dotyczące automatycznego wypełniania zawartości słownika z zewnętrznych źródeł. Można to skonfigurować globalnie w `intlayer.config.ts` lub dla poszczególnych słowników. Obsługuje wiele formatów:

- **`true`**: Włącz wypełnianie dla wszystkich lokalizacji
- **`false`**: Wyłącz wypełnianie dla wszystkich lokalizacji
- **`string`**: Ścieżka do pojedynczego pliku lub szablon z zmiennymi
- **`object`**: Ścieżki do plików dla poszczególnych lokalizacji

**Przykłady:**

```json
// Wyłącz wypełnianie
{
  "fill": false
}
// Pojedynczy plik
{
  "fill": "./translations/aboutPage.content.json"
}
// Szablon ze zmiennymi
{
  "fill": "/messages/{{locale}}/{{key}}/{{fileName}}.content.json"
}
// Szczegółowa konfiguracja per-locale
{
  "fill": {
    "en": "./translations/en/aboutPage.content.json",
    "fr": "./translations/fr/aboutPage.content.json",
  "es": "./translations/es/aboutPage.content.json"
  }
}
```

**Dostępne zmienne:**

- `{{locale}}` – Kod lokalizacji (np. `fr`, `es`)
- `{{fileName}}` – Nazwa pliku (np. `example`)
- `{{key}}` – Klucz słownika (np. `example`)

> Zobacz [Konfiguracja automatycznego wypełniania w Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/fill.md) po więcej informacji.

##### `priority` (number)

Wskazuje priorytet słownika do rozwiązywania konfliktów. Gdy wiele słowników zawiera ten sam klucz, słownik z najwyższym numerem priorytetu nadpisze pozostałe. Jest to przydatne do zarządzania hierarchią treści i nadpisaniami.

**Przykład:**

```typescript
// Słownik bazowy
{
  key: "welcome-message",
  priority: 1,
  content: { message: "Welcome!" }
}

// Słownik nadpisujący
{
  key: "welcome-message",
  priority: 10,
  content: { message: "Witamy w naszej usłudze premium!" }
}
// To nadpisze słownik bazowy
```

### Właściwości CMS

##### `version` (string)

Identyfikator wersji dla zdalnych słowników. Pomaga śledzić, która wersja słownika jest aktualnie używana, co jest szczególnie przydatne podczas pracy z zdalnymi systemami zarządzania treścią.

##### `live` (boolean)

Dla zdalnych słowników wskazuje, czy słownik powinien być pobierany na żywo podczas działania aplikacji. Gdy jest włączone:

- Wymaga ustawienia `importMode` na "live" w pliku `intlayer.config.ts`
- Wymaga uruchomionego serwera na żywo
- Słownik będzie pobierany w czasie działania za pomocą API synchronizacji na żywo
- Jeśli tryb live jest włączony, ale pobieranie się nie powiedzie, następuje powrót do wartości dynamicznej
- Jeśli nie jest na żywo, słownik jest przekształcany podczas budowania dla optymalnej wydajności

### Właściwości systemowe (Generowane automatycznie)

Te właściwości są automatycznie generowane przez Intlayer i nie powinny być modyfikowane ręcznie:

##### `$schema` (string)

Schemat JSON używany do walidacji struktury słownika. Automatycznie dodawany przez Intlayer, aby zapewnić integralność słownika.

##### `id` (string)

Dla słowników zdalnych, jest to unikalny identyfikator słownika na zdalnym serwerze. Używany do pobierania i zarządzania zdalną zawartością.

##### `projectIds` (string[])

Dla słowników zdalnych, ta tablica zawiera identyfikatory projektów, które mogą korzystać z tego słownika. Słownik zdalny może być współdzielony między wieloma projektami.

##### `localId` (LocalDictionaryId)

Unikalny identyfikator dla lokalnych słowników. Automatycznie generowany przez Intlayer, aby pomóc zidentyfikować słownik oraz określić, czy jest lokalny czy zdalny, wraz z jego lokalizacją.

##### `localIds` (LocalDictionaryId[])

Dla scalonych słowników, ta tablica zawiera identyfikatory wszystkich słowników, które zostały połączone. Przydatne do śledzenia źródła scalonej zawartości.

##### `filePath` (string)

Ścieżka pliku lokalnego słownika, wskazująca, z którego pliku `.content` słownik został wygenerowany. Pomaga w debugowaniu i śledzeniu źródła.

##### `versions` (string[])

Dla zdalnych słowników, ta tablica zawiera wszystkie dostępne wersje słownika. Pomaga śledzić, które wersje są dostępne do użycia.

##### `filled` (true)

Wskazuje, czy słownik został automatycznie wypełniony z zewnętrznych źródeł. W przypadku konfliktów, słowniki bazowe mają pierwszeństwo nad automatycznie wypełnionymi słownikami.

##### `location` ('distant' | 'locale')

Wskazuje lokalizację słownika:

- `'locale'`: Słownik lokalny (z plików zawartości)
- `'distant'`: Słownik zdalny (z zewnętrznego źródła)

## Typy węzłów zawartości

Intlayer udostępnia kilka specjalizowanych typów węzłów zawartości, które rozszerzają podstawowe wartości prymitywne:

### Zawartość tłumaczenia (`t`)

Wielojęzyczna zawartość zmieniająca się w zależności od lokalizacji:

```typescript
import { t } from "intlayer";

// TypeScript/JavaScript
multilingualContent: t({
  en: "Welcome to our website",
  fr: "Bienvenue sur notre site web",
  es: "Bienvenido a nuestro sitio web",
});
```

### Zawartość warunkowa (`cond`)

Treść, która zmienia się w zależności od warunków logicznych (boolean):

```typescript
import { cond } from "intlayer";

conditionalContent: cond({
  true: "Użytkownik jest zalogowany",
  false: "Proszę się zalogować, aby kontynuować",
});
```

### Treść enumeracyjna (`enu`)

Treść, która zmienia się w zależności od wartości enumeracyjnych:

```typescript
import { enu } from "intlayer";

statusContent: enu({
  pending: "Twoje żądanie jest w toku",
  approved: "Twoje żądanie zostało zatwierdzone",
  rejected: "Twoje żądanie zostało odrzucone",
});
```

### Treść wstawiana (`insert`)

Treść, którą można wstawić do innej treści:

```typescript
import { insert } from "intlayer";

insertionContent: insert("Ten tekst można wstawić w dowolne miejsce");
```

### Treść zagnieżdżona (`nest`)

Odniesienia do innych słowników:

```typescript
import { nest } from "intlayer";

nestedContent: nest("about-page");
```

### Zawartość Markdown (`md`)

Treść sformatowana w Markdown:

```typescript
import { md } from "intlayer";

markdownContent: md(
  "# Witamy\n\nTo jest **pogrubiony** tekst z [linkami](https://example.com)"
);
```

### Zawartość według płci (`gender`)

Treść zmieniająca się w zależności od płci:

```typescript
import { gender } from "intlayer";

genderContent: gender({
  male: "On jest programistą",
  female: "Ona jest programistką",
  other: "Oni są programistami",
});
```

### Zawartość pliku (`file`)

Odniesienia do plików zewnętrznych:

```typescript
import { file } from "intlayer";

fileContent: file("./path/to/content.txt");
```

## Tworzenie plików z zawartością

### Podstawowa struktura pliku z zawartością

Plik z zawartością eksportuje domyślny obiekt spełniający typ `Dictionary`:

```typescript
// example.content.ts
import { t, cond, nest, md, insert, file } from "intlayer";

export default {
  key: "welcome-page",
  title: "Zawartość strony powitalnej",
  description:
    "Zawartość głównej strony powitalnej, w tym sekcja hero i funkcje",
  tags: ["page", "welcome", "homepage"],
  content: {
    hero: {
      title: t({
        en: "Welcome to Our Platform",
        fr: "Bienvenue sur Notre Plateforme",
        es: "Bienvenido a Nuestra Plataforma",
      }),
      subtitle: t({
        en: "Build amazing applications with ease",
        fr: "Construisez des applications incroyables avec facilité",
        es: "Construye aplicaciones increíbles con facilidad",
      }),
      cta: cond({
        true: t({
          en: "Get Started",
          fr: "Commencer",
          es: "Comenzar",
        }),
        false: t({
          en: "Sign Up",
          fr: "S'inscrire",
          es: "Registrarse",
        }),
      }),
    },
    features: [
      {
        title: t({
          en: "Easy to Use",
          fr: "Facile à Utiliser",
          es: "Fácil de Usar",
        }),
        description: t({
          en: "Intuitive interface for all skill levels",
          fr: "Interface intuitive pour tous les niveaux",
          es: "Interfaz intuitiva para todos los niveles",
        }),
      },
    ],
    documentation: nest("documentation"),
    readme: file("./README.md"),
  },
} satisfies Dictionary;
```

### Plik zawartości JSON

Możesz również tworzyć pliki zawartości w formacie JSON:

```json
{
  "key": "welcome-page",
  "title": "Zawartość strony powitalnej",
  "description": "Zawartość głównej strony powitalnej",
  "tags": ["page", "welcome"],
  "content": {
    "hero": {
      "title": {
        "nodeType": "translation",
        "translation": {
          "en": "Welcome to Our Platform",
          "fr": "Bienvenue sur Notre Plateforme"
        }
      },
      "subtitle": {
        "nodeType": "translation",
        "translation": {
          "en": "Build amazing applications with ease",
          "fr": "Construisez des applications incroyables avec facilité"
        }
      }
    }
  }
}
```

### Pliki zawartości per-locale

Dla słowników per-locale określ właściwość `locale`:

Możesz również tworzyć pliki z zawartością w formacie JSON:

```json
{
  "key": "welcome-page",
  "title": "Zawartość strony powitalnej",
  "description": "Zawartość głównej strony powitalnej",
  "tags": ["strona", "powitanie"],
  "content": {
    "hero": {
      "title": {
        "nodeType": "translation",
        "translation": {
          "en": "Welcome to Our Platform",
          "fr": "Bienvenue sur Notre Plateforme"
        }
      },
      "subtitle": {
        "nodeType": "translation",
        "translation": {
          "en": "Build amazing applications with ease",
          "fr": "Construisez des applications incroyables avec facilité"
        }
      }
    }
  }
}
```

### Pliki zawartości dla poszczególnych lokalizacji

Dla słowników specyficznych dla lokalizacji, określ właściwość `locale`:

```typescript
typescript;
// welcome-page.en.content.ts
export default {
  key: "welcome-page",
  locale: "en",
  content: {
    hero: {
      title: "Welcome to Our Platform",
      subtitle: "Build amazing applications with ease",
    },
  },
} satisfies Dictionary;
```

```typescript
// welcome-page.fr.content.ts
export default {
  key: "welcome-page",
  locale: "fr",
  content: {
    hero: {
      title: "Bienvenue sur Notre Plateforme",
      subtitle: "Construisez des applications incroyables avec facilité",
    },
  },
} satisfies Dictionary;
```

## Rozszerzenia plików z zawartością

Intlayer pozwala na dostosowanie rozszerzeń plików deklarujących zawartość. Ta możliwość daje elastyczność w zarządzaniu dużymi projektami i pomaga unikać konfliktów z innymi modułami.

### Domyślne rozszerzenia

Domyślnie Intlayer monitoruje wszystkie pliki o następujących rozszerzeniach dla deklaracji zawartości:

- `.content.json`
- `.content.ts`
- `.content.tsx`
- `.content.js`
- `.content.jsx`
- `.content.mjs`
- `.content.mjx`
- `.content.cjs`
- `.content.cjx`

Te domyślne rozszerzenia są odpowiednie dla większości aplikacji. Jednak gdy masz specyficzne potrzeby, możesz zdefiniować niestandardowe rozszerzenia, aby usprawnić proces budowania i zmniejszyć ryzyko konfliktów z innymi komponentami.

> Aby dostosować rozszerzenia plików, których Intlayer używa do identyfikacji plików deklaracji zawartości, możesz określić je w pliku konfiguracyjnym Intlayer. To podejście jest korzystne dla projektów na dużą skalę, gdzie ograniczenie zakresu procesu monitorowania poprawia wydajność budowania.

## Zaawansowane Koncepcje

### Scalanie słowników

Gdy wiele słowników ma ten sam klucz, Intlayer automatycznie je łączy. Zachowanie podczas łączenia zależy od kilku czynników:

- **Priorytet**: Słowniki z wyższą wartością `priority` nadpisują te z niższą
- **Auto-fill vs Base**: Słowniki bazowe nadpisują słowniki uzupełniane automatycznie
- **Lokalizacja**: Słowniki lokalne nadpisują słowniki zdalne (gdy priorytety są równe)

### Bezpieczeństwo typów

Intlayer zapewnia pełne wsparcie TypeScript dla plików z zawartością:

```typescript
// Definiuj swój typ zawartości
interface WelcomePageContent {
  hero: {
    title: string;
    subtitle: string;
    cta: string;
  };
  features: Array<{
    title: string;
    description: string;
  }>;
}

// Użyj tego w swoim słowniku
export default {
  key: "welcome-page",
  content: {
    // TypeScript zapewni autouzupełnianie i sprawdzanie typów
    hero: {
      title: "Witamy",
      subtitle: "Twórz niesamowite aplikacje",
      cta: "Zacznij",
    },
  },
} satisfies Dictionary<WelcomePageContent>;
```

### Zagnieżdżanie węzłów

Możesz bez problemu zagnieżdżać funkcje w innych funkcjach.

Przykład:

```javascript fileName="src/example.content.tsx" contentDeclarationFormat="typescript"
import { t, enu, cond, nest, md, type Dictionary } from "intlayer";

const getName = async () => "John Doe";

export default {
  key: "page",
  content: {
    // `getIntlayer('page','en').hiMessage` zwraca `['Hi', ' ', 'John Doe']`
    hiMessage: [
      t({
        en: "Hi",
        fr: "Salut",
        es: "Hola",
      }),
      " ",
      getName(),
    ],
    // Złożona zawartość łącząca warunek, enumerację i treść wielojęzyczną
    // `getIntlayer('page','en').advancedContent(true)(10) zwraca 'Znaleziono wiele elementów'`
    advancedContent: cond({
      true: enu({
        "0": t({
          en: "No items found",
          fr: "Aucun article trouvé",
          es: "No se encontraron artículos",
        }),
        "1": t({
          en: "One item found",
          fr: "Un article trouvé",
          es: "Se encontró un artículo",
        }),
        ">1": t({
          en: "Multiple items found",
          fr: "Plusieurs articles trouvés",
          es: "Se encontraron múltiples artículos",
        }),
      }),
      false: t({
        en: "No valid data available",
        fr: "Aucune donnée valide disponible",
        es: "No hay datos válidos disponibles",
      }),
    }),
  },
} satisfies Dictionary;
```

```javascript fileName="src/example.content.mjx" contentDeclarationFormat="esm"
import { t, enu, cond, nest, md } from "intlayer";

const getName = async () => "John Doe";

/** @type {import('intlayer').Dictionary} */
export default {
  key: "page",
  content: {
    // `getIntlayer('page','pl').hiMessage` zwraca `['Cześć', ' ', 'John Doe']`
    hiMessage: [
      t({
        en: "Hi",
        fr: "Salut",
        es: "Hola",
        pl: "Cześć",
      }),
      " ",
      getName(),
    ],
    // Złożona zawartość łącząca warunek, enumerację i treść wielojęzyczną
    // `getIntlayer('page','pl').advancedContent(true)(10)` zwraca 'Znaleziono wiele elementów'
    advancedContent: cond({
      true: enu({
        "0": t({
          en: "No items found",
          fr: "Aucun article trouvé",
          es: "No se encontraron artículos",
          pl: "Nie znaleziono elementów",
        }),
        "1": t({
          en: "One item found",
          fr: "Un article trouvé",
          es: "Se encontró un artículo",
          pl: "Znaleziono jeden element",
        }),
        ">1": t({
          en: "Multiple items found",
          fr: "Plusieurs articles trouvés",
          es: "Se encontraron múltiples artículos",
          pl: "Znaleziono wiele elementów",
        }),
      }),
      false: t({
        en: "No valid data available",
        fr: "Aucune donnée valide disponible",
        es: "No hay datos válidos disponibles",
        pl: "Brak dostępnych prawidłowych danych",
      }),
    }),
  },
};
```

```javascript fileName="src/example.content.cjx" contentDeclarationFormat="commonjs"
const { t, enu, cond, nest, md } = require("intlayer");

const getName = async () => "John Doe";

/** @type {import('intlayer').Dictionary} */
module.exports = {
  key: "page",
  content: {
    // `getIntlayer('page','en').hiMessage` zwraca `['Hi', ' ', 'John Doe']`
    hiMessage: [
      t({
        en: "Hi",
        fr: "Salut",
        es: "Hola",
      }),
      " ",
      getName(),
    ],
    // Złożona zawartość łącząca warunek, enumerację i wielojęzyczną treść
    // `getIntlayer('page','en').advancedContent(true)(10)` zwraca 'Multiple items found'
    advancedContent: cond({
      true: enu({
        "0": t({
          en: "No items found",
          fr: "Aucun article trouvé",
          es: "No se encontraron artículos",
        }),
        "1": t({
          en: "One item found",
          fr: "Un article trouvé",
          es: "Se encontró un artículo",
        }),
        ">1": t({
          en: "Multiple items found",
          fr: "Plusieurs articles trouvés",
          es: "Se encontraron múltiples artículos",
        }),
      }),
      false: t({
        en: "No valid data available",
        fr: "Aucune donnée valide disponible",
        es: "No hay datos válidos disponibles",
      }),
    }),
  },
};
```

```json5 fileName="src/example.content.json"  contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "page",
  "content": {
    "hiMessage": {
      "nodeType": "composite",
      "composite": [
        {
          "nodeType": "translation",
          "translation": {
            en: "Cześć",
            fr: "Salut",
            es: "Hola",
          },
        },
        " ",
        "John Doe",
      ],
    },
    "advancedContent": {
      "nodeType": "condition",
      "condition": {
        true: {
          "nodeType": "enumeration",
          "enumeration": {
            "0": {
              "nodeType": "translation",
              "translation": {
                en: "Nie znaleziono elementów",
                fr: "Aucun article trouvé",
                es: "No se encontraron artículos",
              },
            },
            "1": {
              "nodeType": "translation",
              "translation": {
                en: "Znaleziono jeden element",
                fr: "Un article trouvé",
                es: "Se encontró un artículo",
              },
            },
            ">1": {
          },
        },
        " ",
        "John Doe",
      ],
    },
    "advancedContent": {
      "nodeType": "condition",
      "condition": {
        "true": {
          "nodeType": "enumeration",
          "enumeration": {
            "0": {
              "nodeType": "translation",
              "translation": {
                en: "No items found", // Brak znalezionych elementów
                fr: "Aucun article trouvé",
                es: "No se encontraron artículos",
              },
            },
            "1": {
              "nodeType": "translation",
              "translation": {
                en: "One item found", // Znaleziono jeden element
                fr: "Un article trouvé",
                es: "Se encontró un artículo",
              },
            },
            ">1": {
              "nodeType": "translation",
              "translation": {
                "en": "Multiple items found",
                "fr": "Plusieurs articles trouvés",
                "es": "Se encontraron múltiples artículos",
              },
            },
          },
        },
        "false": {
          "nodeType": "translation",
          "translation": {
            "en": "No valid data available",
            "fr": "Aucune donnée valide disponible",
            "es": "No hay datos válidos disponibles",
          },
        },
      },
    },
  },
}
```

### Najlepsze praktyki

1. **Konwencje nazewnictwa**:
   - Używaj kebab-case dla kluczy słownika (`"about-page-meta"`)
   - Grupuj powiązane treści pod tym samym prefiksem klucza

2. **Organizacja treści**:
   - Trzymaj powiązane treści razem w tym samym słowniku
   - Używaj zagnieżdżonych obiektów do organizacji złożonych struktur treści
   - Wykorzystuj tagi do kategoryzacji
   - Używaj `fill` do automatycznego uzupełniania brakujących tłumaczeń

3. **Wydajność**:
   - Dostosuj konfigurację treści, aby ograniczyć zakres obserwowanych plików
   - Używaj słowników na żywo tylko wtedy, gdy są potrzebne aktualizacje w czasie rzeczywistym (np. testy A/B itp.)
   - Upewnij się, że wtyczka transformacji podczas budowania (`@intlayer/swc` lub `@intlayer/babel`) jest włączona, aby zoptymalizować słownik podczas kompilacji
