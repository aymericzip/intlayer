---
createdAt: 2026-08-23
updatedAt: 2026-09-28
priority: 5
title: Dokumentacja funkcji getIntlayer | intlayer
description: "Użyj getIntlayer, aby odczytać treść słownika dla locale w dowolnym miejscu, niezależny od frameworka odpowiednik hooka useIntlayer."
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
  - version: 9.5.12
    date: 2026-09-28
    changes: "Bez locale rozwiązywane jest locale żądania lub zapisane locale przed domyślnym locale"
  - version: 9.4.0
    date: 2026-08-23
    changes: "Dokumentacja początkowa"
author: aymericzip
---

# Dokumentacja: Funkcja `getIntlayer` w `intlayer`

## Opis

Funkcja `getIntlayer` wybiera jeden słownik po jego kluczu i zwraca jego zawartość zinterpretowaną dla danego ustawienia regionalne. Jest to odpowiednik niezależny od frameworka hooka `useIntlayer`: ta sama zawartość, te same selektory, ale możliwy do użycia wszędzie tam, gdzie kontekst React nie jest dostępny, skrypty Node, funkcje serwera, loadery tras, budowniczy metadanych, handlery Express/Fastify, testy.

Odczytuje słowniki wygenerowane przez Intlayer w `.intlayer/`, więc argument `key` jest typowany i autocomplete'owany z Twoich własnych deklaracji zawartości, a zwrócony obiekt jest w pełni typowany do każdego liścia.

**Kluczowe funkcje:**

- Typowane klucze słownika i typowana zwrócona zawartość
- Interpretuje każdy węzeł zawartości (`t()`, `enu()`, `cond()`, `insert()`, `nest()`, `md()`, `html()`, `file()`, `gender()`)
- Akceptuje ustawienie regionalne lub obiekt selektora (kolekcje, warianty)
- Wyniki są zapamiętywane dla `key + locale + selector`
- Spada do bezpiecznego proxy w trybie development, gdy słownik brakuje, zamiast się wysypać

## Sygnatura funkcji

```typescript
getIntlayer(
  key: DictionaryKeys,                        // Wymagane
  localeOrSelector?: LocalesValues | DictionarySelector, // Opcjonalne
  plugins?: Plugins[]                         // Opcjonalne
): DeepTransformContent<...>
```

## Parametry

- `key: DictionaryKeys`
  - **Opis**: Klucz słownika do odczytania, zadeklarowany w plikach zawartości.
  - **Typ**: `DictionaryKeys`, suma wszystkich zadeklarowanych kluczy słownika.
  - **Wymagane**: Tak

- `localeOrSelector: LocalesValues | DictionarySelector`
  - **Opis**: Locale do interpretacji zawartości lub obiekt selektora dla [dynamicznych słowników](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dynamic_dictionaries/index.md).
    - `'fr'`: locale
    - `{ item: 2 }`: element [kolekcji](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dynamic_dictionaries/collections.md) (pomiń `item`, aby uzyskać każdy element jako tablicę)
    - `{ variant: 'black-friday' }`: nazwana [wariacja](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dynamic_dictionaries/variants.md) (pomiń dla domyślnej)
    - `{ variant: { id: 'prod_abc', userId: '123' } }`: wariacja strukturalna
    - Każdy selektor może zawierać locale: `{ item: 2, locale: 'fr' }`
  - **Typ**: `LocalesValues | DictionarySelector`
  - **Wymagane**: Nie (opcjonalne). Jeśli pominięte, zobacz [Bez locale](#bez-locale).

- `plugins: Plugins[]`
  - **Opis**: Niestandardowe transformery węzłów zastępujące bazowe pluginy interpretera. Zaawansowane użycie; pomiń, aby zachować domyślne zachowanie.
  - **Typ**: `Plugins[]`
  - **Wymagane**: Nie (opcjonalne)

### Zwracane wartości

- **Typ**: Zinterpretowana zawartość słownika, wpisana na podstawie Twojej deklaracji.
- **Opis**: Zwykły obiekt odzwierciedlający pole `content` słownika, gdzie każdy węzeł Intlayer został rozwiązany do jego ostatecznej wartości dla żądanego ustawienia regionalne.

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

Gdy nie przekazano locale, `getIntlayer` nie przechodzi od razu do domyślnego locale. Rozwiązuje je w tej kolejności:

1. **Locale bieżącego żądania**, na serwerze, gdy obsługuje je integracja Intlayer: middleware `express-intlayer`, `fastify-intlayer`, `hono-intlayer`, `adonis-intlayer` i `elysia-intlayer`, middleware `remix-intlayer` i `astro-intlayer` oraz `IntlayerProvider` / `setLocale` w React Server Components. Każde żądanie jest rozwiązywane na podstawie własnych cookies i nagłówków, więc równocześni użytkownicy nigdy nie współdzielą locale.
2. **Locale zapisane w przeglądarce** (cookie, `localStorage`, `sessionStorage`), które utrwala przełącznik języka.
3. **`defaultLocale`** zadeklarowane w Twojej [konfiguracji](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/configuration.md).

- [konfiguracji](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/configuration.md)

```typescript
import { getIntlayer } from "intlayer";

const { title } = getIntlayer("app"); // Locale żądania, w przeciwnym razie zapisane, w przeciwnym razie domyślne
```

To samo rozwiązywanie dotyczy `getDictionary`, wywołań przepisywanych przez [pluginy builda](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/bundle_optimization.md) oraz `useIntlayer` / `useDictionaryDynamic` renderowanych poza providerem. Jawnie przekazane locale zawsze ma pierwszeństwo.

- [pluginy builda](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/bundle_optimization.md)

> `getIntlayer` nie jest reaktywne: po zmianie locale wywołaj je ponownie, aby odczytać nowe locale. Na stronie renderowanej na serwerze wywołanie poza jakimkolwiek providerem renderuje domyślne locale na serwerze, a zapisane locale w przeglądarce, co może spowodować hydration mismatch. W takim przypadku zamontuj provider swojego frameworka lub przekaż locale.

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

## Notatki dotyczące zachowania

### Buforowanie

Wyniki są zapamiętane w pamięci podręcznej na poziomie modułu, której kluczem jest `key + locale + selector`. Wielokrotne wywołanie `getIntlayer("app", "fr")` interpretuje słownik raz i zwraca ten sam obiekt.

### Brakujące słowniki

W trakcie rozwoju, żądanie klucza, który nie ma wygenerowanego słownika, loguje ostrzeżenie raz i zwraca bezpieczny proxy fallback: odczytanie `content.title` zwraca ciąg `"app.title"` zamiast rzucać błąd. To utrzymuje stronę użyteczną, podczas gdy brakująca deklaracja jest naprawiana. Uruchom kompilację Intlayer (lub serwer dev), aby słownik został wygenerowany.

### Rozmiar pakietu

`getIntlayer` odczytuje scalony słownik zawierający **wszystkie** locale. W pakietach klienckich [wtyczki budowania](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/bundle_optimization.md) przepisują to wywołanie, aby dostarczać wyłącznie wymaganą treść. Gdy odczytujesz treść poza renderowaniem (metadane, loadery, funkcje serwerowe) i chcesz załadować pojedyncze locale na żądanie, użyj zamiast tego [`getIntlayerAsync`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/intlayer/getIntlayerAsync.md).

- [wtyczki budowania](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/bundle_optimization.md)
- [`getIntlayerAsync`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/intlayer/getIntlayerAsync.md)

## Powiązane funkcje

- [`getIntlayerAsync`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/intlayer/getIntlayerAsync.md)
- [`getDictionary`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/intlayer/getDictionary.md)
- [`useIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/react-intlayer/useIntlayer.md)

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
