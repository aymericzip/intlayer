---
createdAt: 2026-08-23
updatedAt: 2026-08-23
title: Dokumentacja funkcji getIntlayerAsync | intlayer
description: Dowiedz się, jak używać funkcji getIntlayerAsync z pakietu intlayer
keywords:
  - getIntlayerAsync
  - dictionary
  - dynamic import
  - metadata
  - bundle optimization
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
  - getIntlayerAsync
history:
  - version: 9.4.0
    date: 2026-08-23
    changes: "Initial documentation"
author: aymericzip
---

# Dokumentacja: Funkcja `getIntlayerAsync` w `intlayer`

## Opis

Funkcja `getIntlayerAsync` wybiera jeden słownik po jego kluczu i rozwiązuje jego zawartość dla danego locale'a, **ładując tylko ten locale**.

Jest to asynchroniczny odpowiednik [`getIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/intlayer/getIntlayer.md), przeznaczony dla miejsc, gdzie słownik jest odczytywany poza renderowaniem — konstruktory `head` / metadanych tras, loadery, funkcje serwerowe.

Podczas gdy `getIntlayer` ładuje scalony słownik zawierający każdy locale, [wtyczki budowania](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/bundle_optimization.md) (`@intlayer/babel`, `@intlayer/swc`) przepisują to wywołanie na `getDictionaryAsync(loaderMap, key, locale)`, wskazując na fragmenty poszczególnych locale'ów w `.intlayer/dynamic_dictionaries/`. Bundle w związku z tym zawiera tylko rzeczywiście żądany locale.

Bez tych wtyczek — niezoptymalizowana kompilacja — wywołanie rozwiązuje się zamiast tego poprzez synchroniczny rejestr słownika: ta sama zawartość, bez podziału na locale'a.

**Kluczowe funkcje:**

- Takie same wpisane klucze, selektory i zwracana zawartość co `getIntlayer`
- Ładuje tylko żądany fragment locale'a w zoptymalizowanych kompilacjach
- Współbieżne wywołania dla tego samego fragmentu współdzielą jedno ładowanie
- Bezpieczne do użycia w asynchronicznych konstruktorach metadanych, loaderach i funkcjach serwerowych

---

## Sygnatura Funkcji

```typescript
getIntlayerAsync(
  key: DictionaryKeys,                        // Wymagane
  localeOrSelector?: LocalesValues | DictionarySelector, // Opcjonalne
  plugins?: Plugins[]                         // Opcjonalne
): Promise<DeepTransformContent<...>>
```

---

## Parametry

- `key: DictionaryKeys`
  - **Description**: Klucz słownika do odczytania, zadeklarowany w plikach zawartości.
  - **Type**: `DictionaryKeys` — unija wszystkich zadeklarowanych kluczy słownika.
  - **Required**: Yes

- `localeOrSelector: LocalesValues | DictionarySelector`
  - **Description**: Locale do interpretacji zawartości lub obiekt selektora dla [słowników dynamicznych](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dynamic_dictionaries/index.md).
    - `'fr'` — locale
    - `{ item: 2 }` — element [kolekcji](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dynamic_dictionaries/collections.md) (pomiń `item`, aby otrzymać wszystkie elementy jako tablicę)
    - `{ variant: 'black-friday' }` — nazwana [wariant](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dynamic_dictionaries/variants.md) (pomiń dla wariantu `default`)
    - `{ variant: { id: 'prod_abc', userId: '123' } }` — wariant strukturyzowany
    - Każdy selektor może zawierać locale: `{ item: 2, locale: 'fr' }`
  - **Type**: `LocalesValues | DictionarySelector`
  - **Required**: No (Optional) — domyślnie skonfigurowany `defaultLocale`.

- `plugins: Plugins[]`
  - **Description**: Niestandardowe transformatory węzłów zastępujące podstawowe pluginy interpretera. Zaawansowane użycie tylko.
  - **Type**: `Plugins[]`
  - **Required**: No (Optional)

### Zwracane

- **Typ**: `Promise<Content>` — promise rozwiązujący się do interpretowanej zawartości słownika, typizowanej z Twojej deklaracji.

---

## Przykład użycia

### Podstawowe użycie

```typescript codeFormat={["typescript", "esm", "commonjs"]}
import { getIntlayerAsync } from "intlayer";

const { title } = await getIntlayerAsync("app", "fr"); // "Bonjour"
```

### W TanStack Start route `head`

Ponieważ chunk ustawień lokalnych jest ładowany na żądanie, `head` staje się `async`:

```tsx fileName="src/routes/{-$locale}/index.tsx"
import { createFileRoute } from "@tanstack/react-router";
import { getIntlayerAsync } from "intlayer";

export const Route = createFileRoute("/{-$locale}/")({
  component: RouteComponent,
  head: async ({ params }) => {
    const { locale } = params;

    const metaContent = await getIntlayerAsync("app", locale);

    return {
      meta: [
        { title: metaContent.title },
        { name: "description", content: metaContent.meta.description },
      ],
    };
  },
});
```

### W Next.js `generateMetadata`

```tsx fileName="src/app/[locale]/page.tsx"
import { getIntlayerAsync } from "intlayer";
import type { Metadata } from "next";

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> => {
  const { locale } = await params;
  const { title, description } = await getIntlayerAsync(
    "page-metadata",
    locale
  );

  return { title, description };
};
```

### W funkcji serwerowej

```tsx fileName="src/routes/{-$locale}/index.tsx"
import { createServerFn } from "@tanstack/react-start";
import { getRequestHeader } from "@tanstack/react-start/server";
import { getCookie, getIntlayerAsync, getLocale } from "intlayer";

export const getLocalizedContent = createServerFn().handler(async () => {
  const locale = await getLocale({
    getCookie: (name) => getCookie(name, getRequestHeader("cookie")),
    getHeader: (name) => getRequestHeader(name),
  });

  const content = await getIntlayerAsync("app", locale);

  return { locale, content };
});
```

---

## `getIntlayer` vs `getIntlayerAsync`

|                         | [`getIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/intlayer/getIntlayer.md) | `getIntlayerAsync`                                |
| ----------------------- | --------------------------------------------------------------------------------------------------------------- | ------------------------------------------------- |
| Zwraca                  | Zawartość                                                                                                       | Obietnicę zawartości                              |
| Słownik załadowany      | Połączony słownik (wszystkie języki)                                                                            | Chunk tylko żądanego języka                       |
| Najlepiej nadaje się do | Renderowanie, synchroniczne ścieżki kodu                                                                        | Metadane, loadery, funkcje serwerowe              |
| Wymaga pluginu?         | Nie                                                                                                             | Nie — podział na języki wymaga pluginów budowania |

Obie funkcje akceptują te same argumenty i zwracają tę samą zawartość: przełączenie się między nimi zmienia tylko **kiedy** i **ile** jest ładowane.

---

## Powiązane funkcje

- [`getIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/intlayer/getIntlayer.md): Synchroniczny odpowiednik odczytujący scalony słownik.
- [`getDictionaryAsync`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/intlayer/getDictionaryAsync.md): Funkcja niskiego poziomu, którą wtyczki kompilacji przepisują do tego wywołania.
- [`getLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/intlayer/getLocale.md): Wykrywa locale przychodzącego żądania.

---

## TypeScript

```typescript
function getIntlayerAsync<
  const T extends DictionaryKeys,
  const A extends LocalesValues | DictionarySelector = DeclaredLocales,
>(
  key: T,
  localeOrSelector?: A,
  plugins?: Plugins[]
): Promise<
  DeepTransformContent<
    DictionaryRegistryResult<T, A>,
    IInterpreterPluginState,
    ExtractSelectorLocale<A>
  >
>;
```
