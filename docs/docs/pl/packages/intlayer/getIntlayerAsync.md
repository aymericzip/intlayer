---
createdAt: 2026-08-23
updatedAt: 2026-09-28
priority: 5
title: Dokumentacja funkcji getIntlayerAsync | intlayer
description: "Użyj getIntlayerAsync, aby załadować i odczytać treść słownika tylko dla jednego locale, bez dołączania pozostałych języków."
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
  - version: 9.5.12
    date: 2026-09-28
    changes: "Bez locale oczekuje na locale żądania (nagłówki i cookies Next.js)"
  - version: 9.4.0
    date: 2026-08-23
    changes: "Pierwsza wersja dokumentacji"
author: aymericzip
---

# Dokumentacja: Funkcja `getIntlayerAsync` w `intlayer`

## Opis

Funkcja `getIntlayerAsync` wybiera jeden słownik po jego kluczu i rozwiązuje jego zawartość dla danego locale'a, **ładując tylko ten locale**.

Jest to asynchroniczny odpowiednik [`getIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/intlayer/getIntlayer.md), przeznaczony dla miejsc, gdzie słownik jest odczytywany poza renderowaniem, konstruktory `head` / metadanych tras, loadery, funkcje serwerowe.

- [`getIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/intlayer/getIntlayer.md)

Podczas gdy `getIntlayer` ładuje scalony słownik zawierający każdy locale, [wtyczki budowania](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/bundle_optimization.md) (`@intlayer/babel`, `@intlayer/swc`) przepisują to wywołanie na `getDictionaryAsync(loaderMap, key, locale)`, wskazując na fragmenty poszczególnych locale'ów w `.intlayer/dynamic_dictionaries/`. Bundle w związku z tym zawiera tylko rzeczywiście żądany locale.

- [wtyczki budowania](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/bundle_optimization.md)

Bez tych wtyczek, niezoptymalizowana kompilacja, wywołanie rozwiązuje się zamiast tego poprzez synchroniczny rejestr słownika: ta sama zawartość, bez podziału na locale'a.

**Kluczowe funkcje:**

- Takie same wpisane klucze, selektory i zwracana zawartość co `getIntlayer`
- Ładuje tylko żądany fragment locale'a w zoptymalizowanych kompilacjach
- Współbieżne wywołania dla tego samego fragmentu współdzielą jedno ładowanie
- Bezpieczne do użycia w asynchronicznych konstruktorach metadanych, loaderach i funkcjach serwerowych

## Sygnatura Funkcji

```typescript
getIntlayerAsync(
  key: DictionaryKeys,                        // Wymagane
  localeOrSelector?: LocalesValues | DictionarySelector, // Opcjonalne
  plugins?: Plugins[]                         // Opcjonalne
): Promise<DeepTransformContent<...>>
```

## Parametry

- `key: DictionaryKeys`
  - **Opis**: Klucz słownika do odczytania, zadeklarowany w plikach zawartości.
  - **Typ**: `DictionaryKeys`, unija wszystkich zadeklarowanych kluczy słownika.
  - **Wymagane**: Tak

- `localeOrSelector: LocalesValues | DictionarySelector`
  - **Opis**: Locale do interpretacji zawartości lub obiekt selektora dla [słowników dynamicznych](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dynamic_dictionaries/index.md).
    - `'fr'`: locale
    - `{ item: 2 }`: element [kolekcji](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dynamic_dictionaries/collections.md) (pomiń `item`, aby otrzymać wszystkie elementy jako tablicę)
    - `{ variant: 'black-friday' }`: nazwana [wariant](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dynamic_dictionaries/variants.md) (pomiń dla wariantu `default`)
    - `{ variant: { id: 'prod_abc', userId: '123' } }`: wariant strukturyzowany
    - Każdy selektor może zawierać locale: `{ item: 2, locale: 'fr' }`
  - **Typ**: `LocalesValues | DictionarySelector`
  - **Wymagane**: Nie (opcjonalne). Jeśli pominięte, jest rozwiązywane tak jak w [`getIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/intlayer/getIntlayer.md) (locale żądania, potem zapisane locale, potem `defaultLocale`). Jako funkcja asynchroniczna może też poczekać na locale żądania, gdy da się je odczytać tylko asynchronicznie: w Server Components Next.js, `generateMetadata` i route handlerach odczytuje `headers()` i `cookies()` żądania, jak `getLocale()` z `next-intlayer/server`. Ten odczyt przełącza trasę na renderowanie dynamiczne, dlatego następuje tylko wtedy, gdy `IntlayerProvider` nie dostarczył już locale.

- `plugins: Plugins[]`
  - **Opis**: Niestandardowe transformatory węzłów zastępujące podstawowe pluginy interpretera. Zaawansowane użycie tylko.
  - **Typ**: `Plugins[]`
  - **Wymagane**: Nie (opcjonalne)

### Zwracane

- **Typ**: `Promise<Content>`, promise rozwiązujący się do interpretowanej zawartości słownika, typizowanej z Twojej deklaracji.

## Przykład użycia

### Podstawowe użycie

```typescript codeFormat={["typescript", "esm", "commonjs"]}
import { getIntlayerAsync } from "intlayer";

const { title } = await getIntlayerAsync("app", "fr"); // "Bonjour"
```

## `getIntlayer` vs `getIntlayerAsync`

|                         | [`getIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/intlayer/getIntlayer.md) | `getIntlayerAsync`                               |
| ----------------------- | --------------------------------------------------------------------------------------------------------------- | ------------------------------------------------ |
| Zwraca                  | Zawartość                                                                                                       | Obietnicę zawartości                             |
| Słownik załadowany      | Połączony słownik (wszystkie języki)                                                                            | Chunk tylko żądanego języka                      |
| Najlepiej nadaje się do | Renderowanie, synchroniczne ścieżki kodu                                                                        | Metadane, loadery, funkcje serwerowe             |
| Wymaga pluginu?         | Nie                                                                                                             | Nie, podział na języki wymaga pluginów budowania |

Obie funkcje akceptują te same argumenty i zwracają tę samą zawartość: przełączenie się między nimi zmienia tylko **kiedy** i **ile** jest ładowane.

## Powiązane funkcje

- [`getIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/intlayer/getIntlayer.md)
- [`getDictionaryAsync`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/intlayer/getDictionaryAsync.md)
- [`getLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/intlayer/getLocale.md)

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
