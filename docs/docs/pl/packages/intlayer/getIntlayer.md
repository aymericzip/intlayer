---
createdAt: 2026-08-23
updatedAt: 2026-08-23
title: Dokumentacja funkcji getIntlayer | intlayer
description: Zobacz jak używać funkcji getIntlayer dla pakietu intlayer
keywords:
  - getIntlayer
  - dictionary
  - content
  - selector
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
  - getIntlayer
history:
  - version: 9.4.0
    date: 2026-08-23
    changes: "Dokumentacja początkowa"
author: aymericzip
---

# Dokumentacja: Funkcja `getIntlayer` w `intlayer`

## Opis

Funkcja `getIntlayer` wybiera jeden słownik po jego kluczu i zwraca jego zawartość zinterpretowaną dla danego ustawienia regionalne. Jest to odpowiednik niezależny od frameworka hooka `useIntlayer`: ta sama zawartość, te same selektory, ale możliwy do użycia wszędzie tam, gdzie kontekst React nie jest dostępny — skrypty Node, funkcje serwera, loadery tras, budowniczy metadanych, handlery Express/Fastify, testy.

Odczytuje słowniki wygenerowane przez Intlayer w `.intlayer/`, więc argument `key` jest typowany i autocomplete'owany z Twoich własnych deklaracji zawartości, a zwrócony obiekt jest w pełni typowany do każdego liścia.

**Kluczowe funkcje:**

- Typowane klucze słownika i typowana zwrócona zawartość
- Interpretuje każdy węzeł zawartości (`t()`, `enu()`, `cond()`, `insert()`, `nest()`, `md()`, `html()`, `file()`, `gender()`)
- Akceptuje ustawienie regionalne lub obiekt selektora (kolekcje, warianty)
- Wyniki są zapamiętywane dla `key + locale + selector`
- Spada do bezpiecznego proxy w trybie development, gdy słownik brakuje, zamiast się wysypać

---

## Sygnatura funkcji

```typescript
getIntlayer(
  key: DictionaryKeys,                        // Wymagane
  localeOrSelector?: LocalesValues | DictionarySelector, // Opcjonalne
  plugins?: Plugins[]                         // Opcjonalne
): DeepTransformContent<...>
```

---

## Parametry

- `key: DictionaryKeys`
  - **Description**: Klucz słownika do odczytania, zadeklarowany w plikach zawartości.
  - **Type**: `DictionaryKeys` — suma wszystkich zadeklarowanych kluczy słownika.
  - **Required**: Yes

- `localeOrSelector: LocalesValues | DictionarySelector`
  - **Description**: Locale do interpretacji zawartości lub obiekt selektora dla [dynamicznych słowników](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dynamic_dictionaries/index.md).
    - `'fr'` — locale
    - `{ item: 2 }` — element [kolekcji](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dynamic_dictionaries/collections.md) (pomiń `item`, aby uzyskać każdy element jako tablicę)
    - `{ variant: 'black-friday' }` — nazwana [wariacja](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dynamic_dictionaries/variants.md) (pomiń dla domyślnej)
    - `{ variant: { id: 'prod_abc', userId: '123' } }` — wariacja strukturalna
    - Każdy selektor może zawierać locale: `{ item: 2, locale: 'fr' }`
  - **Type**: `LocalesValues | DictionarySelector`
  - **Required**: No (Optional) — domyślnie do skonfigurowanego `defaultLocale`.

- `plugins: Plugins[]`
  - **Description**: Niestandardowe transformery węzłów zastępujące bazowe pluginy interpretera. Zaawansowane użycie; pomiń, aby zachować domyślne zachowanie.
  - **Type**: `Plugins[]`
  - **Required**: No (Optional)

### Zwracane wartości

- **Type**: Zinterpretowana zawartość słownika, wpisana na podstawie Twojej deklaracji.
- **Description**: Zwykły obiekt odzwierciedlający pole `content` słownika, gdzie każdy węzeł Intlayer został rozwiązany do jego ostatecznej wartości dla żądanego ustawienia regionalne.

---

## Przykład użycia

### Podstawowe użycie

```typescript fileName="src/app.content.ts" codeFormat="typescript"
import { t, type Dictionary } from "intlayer";

const appContent = {
  key: "app",
  content: {
    title: t({
      pl: "Cześć",
      en: "Hello",
      fr: "Bonjour",
    }),
  },
} satisfies Dictionary;

export default appContent;
```

```typescript codeFormat={["typescript", "esm", "commonjs"]}
import { getIntlayer } from "intlayer";

const { title } = getIntlayer("app", "pl"); // "Cześć"
```

### Bez locale

Pominięcie locale interpretuje zawartość przy użyciu `defaultLocale` zadeklarowanego w Twojej [konfiguracji](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/configuration.md).

```typescript
import { getIntlayer } from "intlayer";

const { title } = getIntlayer("app"); // Interpretowane przy użyciu domyślnego locale
```

### Wewnątrz handlera serwera

```typescript fileName="src/routes/greeting.ts" codeFormat="typescript"
import { getIntlayer, getLocale } from "intlayer";

export const greetingHandler = async (request: Request) => {
  const locale = await getLocale({
    getHeader: (name) => request.headers.get(name) ?? undefined,
  });

  const { title } = getIntlayer("app", locale);

  return Response.json({ title });
};
```

### Z selektorem (kolekcje i warianty)

```typescript
import { getIntlayer } from "intlayer";

// Pojedynczy element kolekcji
const secondPost = getIntlayer("blog-post", { item: 2, locale: "fr" });

// Każdy element kolekcji jako uporządkowana tablica
const allPosts = getIntlayer("blog-post", { locale: "fr" });

// Nazwany wariant
const banner = getIntlayer("banner", { variant: "black-friday", locale: "fr" });
```

---

## Notatki dotyczące zachowania

### Buforowanie

Wyniki są zapamiętane w pamięci podręcznej na poziomie modułu, której kluczem jest `key + locale + selector`. Wielokrotne wywołanie `getIntlayer("app", "fr")` interpretuje słownik raz i zwraca ten sam obiekt.

### Brakujące słowniki

W trakcie rozwoju, żądanie klucza, który nie ma wygenerowanego słownika, loguje ostrzeżenie raz i zwraca bezpieczny proxy fallback: odczytanie `content.title` zwraca ciąg `"app.title"` zamiast rzucać błąd. To utrzymuje stronę użyteczną, podczas gdy brakująca deklaracja jest naprawiana. Uruchom kompilację Intlayer (lub serwer dev), aby słownik został wygenerowany.

### Rozmiar pakietu

`getIntlayer` reads the merged dictionary, which holds **every** locale. In client bundles, the [build plugins](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/bundle_optimization.md) rewrite the call so only the required content is shipped. When you read content outside of rendering (metadata, loaders, server functions) and want a single locale loaded on demand, use [`getIntlayerAsync`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/intlayer/getIntlayerAsync.md) instead.

---

## Powiązane funkcje

- [`getIntlayerAsync`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/intlayer/getIntlayerAsync.md): Asynchroniczny odpowiednik ładujący pojedynczy chunk lokalizacji.
- [`getDictionary`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/intlayer/getDictionary.md): Interpretuje obiekt słownika, który sam przekazujesz, zamiast szukać go po kluczu.
- [`useIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/react-intlayer/useIntlayer.md): Równoważny hook React'a, odczytujący lokalizację od dostawcy.

---

## TypeScript

```typescript
function getIntlayer<
  const T extends DictionaryKeys,
  const A extends LocalesValues | DictionarySelector = DeclaredLocales,
>(
  key: T,
  localeOrSelector?: A,
  plugins?: Plugins[]
): DeepTransformContent<
  DictionaryRegistryResult<T, A>,
  IInterpreterPluginState,
  ExtractSelectorLocale<A>
>;
```
