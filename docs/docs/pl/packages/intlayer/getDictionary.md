---
createdAt: 2026-08-23
updatedAt: 2026-08-23
title: Dokumentacja funkcji getDictionary | intlayer
description: Zobacz, jak używać funkcji getDictionary dla pakietu intlayer
keywords:
  - getDictionary
  - dictionary
  - interpreter
  - content
  - Intlayer
  - intlayer
  - Internationalization
  - Documentation
  - JavaScript
  - TypeScript
slugs:
  - doc
  - packages
  - intlayer
  - getDictionary
history:
  - version: 9.4.0
    date: 2026-08-23
    changes: "Initial documentation"
author: aymericzip
---

# Dokumentacja: Funkcja `getDictionary` w `intlayer`

## Opis

Funkcja `getDictionary` interpretuje obiekt słownika **który sam przekazujesz** i zwraca jego rozwiązaną treść dla danego locale'a. Przechodzi przez treść w jednym przejściu i stosuje każdą wtyczkę interpretera w razie potrzeby, rozwiązując tłumaczenia `t()`, wyliczenia, warunki, wstawienia, zagnieżdżenia, markdown, HTML i węzły plików.

W przeciwieństwie do [`getIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/intlayer/getIntlayer.md), która wyszukuje słownik według klucza w wygenerowanym rejestrze, `getDictionary` przyjmuje sam słownik. To czyni go właściwym narzędziem dla treści zbudowanej w czasie działania, pobieranej z API lub CMS, lub zadeklarowanej inline w teście.

**Kluczowe cechy:**

- Działa z dowolnym obiektem zgodnym ze strukturą słownika (`{ key, content }`)
- Przyjmuje również kwalifikowaną grupę słownika (kolekcje, warianty) wraz z selektorem
- W pełni typizowane: zwrócony obiekt odzwierciedla `content`, który przekazałeś
- Akceptuje niestandardowe wtyczki interpretera

---

## Sygnatura funkcji

```typescript
getDictionary(
  dictionary: Dictionary | QualifiedDictionaryGroup, // Wymagane
  localeOrSelector?: LocalesValues | DictionarySelector, // Opcjonalne
  plugins?: Plugins[]                                // Opcjonalne
): DeepTransformContent<...>
```

---

## Parametry

- `dictionary: Dictionary | QualifiedDictionaryGroup`
  - **Description**: Słownik (lub kvalifikowana grupa słowników) do interpretacji.
  - **Type**: `Dictionary | QualifiedDictionaryGroup`
  - **Required**: Yes

- `localeOrSelector: LocalesValues | DictionarySelector`
  - **Description**: Język (locale) do interpretacji zawartości, lub obiekt selektora (`{ item }`, `{ variant }`, opcjonalnie z `locale`). Zobacz [dynamic dictionaries](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dynamic_dictionaries/index.md).
  - **Type**: `LocalesValues | DictionarySelector`
  - **Required**: No (Optional) — defaults to the configured `defaultLocale`.

- `plugins: Plugins[]`
  - **Description**: Tablica transformatorów węzłów definiująca sposób interpretacji rozpoznanych węzłów. Jeśli zostanie pominięta, używany jest domyślny zestaw wtyczek interpretera.
  - **Type**: `Plugins[]`
  - **Required**: No (Optional)

### Zwraca

- **Typ**: Interpretowana zawartość słownika.
- **Opis**: `content` które przekazałeś, ze wszystkimi węzłami Intlayer rozwiązanymi dla żądanego ustawienia regionu. Dla grupy kolekcji bez selektora `item`, zwracana jest posortowana tablica interpretowanych wpisów; `null` jest zwracane, gdy selektor nie wskazuje na nic.

---

## Przykład użycia

### Podstawowe użycie

```typescript codeFormat={["typescript", "esm", "commonjs"]}
import { getDictionary, t } from "intlayer";

const content = getDictionary(
  {
    key: "my_key",
    content: {
      greeting: t({
        en: "Hello",
        fr: "Bonjour",
      }),
    },
  },
  "fr"
);

console.log(content.greeting); // "Bonjour"
```

### Interpretowanie zawartości pobranej w czasie wykonywania

```typescript
import { getDictionary, type Dictionary } from "intlayer";

const remoteDictionary: Dictionary = await fetch("/api/cms/banner").then(
  (res) => res.json()
);

const banner = getDictionary(remoteDictionary, "fr");
```

### Z selektorem

```typescript
import { getDictionary } from "intlayer";

// Kwalifikowana grupa słownika jest rozwiązywana do pojedynczego wpisu…
const secondItem = getDictionary(blogPostGroup, { item: 2, locale: "fr" });

// …lub do uporządkowanej tablicy, gdy `item` nie jest podany
const allItems = getDictionary(blogPostGroup, { locale: "fr" });
```

---

## Powiązane funkcje

- [`getIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/intlayer/getIntlayer.md): Ta sama interpretacja, ale słownik jest wyszukiwany po kluczu w wygenerowanym rejestrze.
- [`getDictionaryAsync`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/intlayer/getDictionaryAsync.md): Odpowiednik dla map loaderów dla każdej lokalizacji.
- [`useDictionary`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/react-intlayer/useDictionary.md): Odpowiednik React hook, odczytujący lokalizację od dostawcy.

---

## TypeScript

```typescript
function getDictionary<
  const T extends Dictionary | QualifiedDictionaryGroup,
  const A extends LocalesValues | DictionarySelector = DeclaredLocales,
>(
  dictionary: T,
  localeOrSelector?: A,
  plugins?: Plugins[]
): DeepTransformContent<
  ResolveQualifiedDictionaryContent<T, A>,
  IInterpreterPluginState,
  ExtractSelectorLocale<A>
>;
```
