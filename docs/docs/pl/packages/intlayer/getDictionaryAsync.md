---
createdAt: 2026-08-23
updatedAt: 2026-08-23
title: Dokumentacja funkcji getDictionaryAsync | intlayer
description: Sprawdź, jak używać funkcji getDictionaryAsync dla pakietu intlayer
keywords:
  - getDictionaryAsync
  - dictionary
  - dynamic dictionaries
  - loader map
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
  - getDictionaryAsync
history:
  - version: 9.4.0
    date: 2026-08-23
    changes: "Initial documentation"
author: aymericzip
---

# Dokumentacja: funkcja `getDictionaryAsync` w `intlayer`

## Opis

Funkcja `getDictionaryAsync` ładuje **pojedynczy chunk ustawień regionalnych** ze słownika i zwraca jego interpretowaną zawartość.

Jest to odpowiednik [`getDictionary`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/intlayer/getDictionary.md) dla map loaderów na ustawienia regionalne emitowanych w `.intlayer/dynamic_dictionaries/`: zamiast otrzymywać słownik zawierający wszystkie ustawienia regionalne, otrzymuje mapę loadera i czeka tylko na chunk potrzebny dla żądanych ustawień regionalnych.

> W kodzie aplikacji zazwyczaj wywołujesz [`getIntlayerAsync`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/intlayer/getIntlayerAsync.md), a nie tę funkcję. [Pluginy build](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/bundle_optimization.md) przepisują każde wywołanie `getIntlayerAsync('key', locale)` na `getDictionaryAsync(loaderMap, 'key', locale)`. `getDictionaryAsync` jest eksportowana dla niestandardowych loaderów i narzędzi, które budują własne mapy loaderów.

**Kluczowe funkcje:**

- Ładuje tylko żądany chunk ustawień regionalnych
- Obsługuje proste (`locale → loader`) i kwalifikowane (`locale → qualifierId → loader`) mapy loaderów
- Deduplikuje jednoczesne ładowania tego samego chunku i cache'uje rozwiązaną zawartość
- Nieudane ładowania są usuwane z cache'u, aby późniejsze wywołanie ponowiło próbę chunku

---

## Sygnatura funkcji

```typescript
getDictionaryAsync(
  dictionaryLoaders: PlainDynamicLoaderMap | QualifiedDynamicLoaderMap, // Wymagane
  key: string,                                           // Wymagane
  localeOrSelector?: LocalesValues | DictionarySelector, // Opcjonalne
  plugins?: Plugins[]                                    // Opcjonalne
): Promise<DeepTransformContent<...>>
```

---

## Parametry

- `dictionaryLoaders: PlainDynamicLoaderMap | QualifiedDynamicLoaderMap`
  - **Description**: Mapa loaderów dla każdej lokalizacji. Mapy zwykłe powiązują lokalizację z loaderem; mapy kwalifikowane (używane przez kolekcje i warianty) powiązują lokalizację z identyfikatorem kwalifikatora, a następnie z loaderem. Dla mapy kwalifikowanej ładowane są tylko fragmenty, na które wskazuje selektor.
  - **Type**: `PlainDynamicLoaderMap<T> | QualifiedDynamicLoaderMap`
  - **Required**: Yes

- `key: string`
  - **Description**: Klucz słownika, używany do namespacing cache'u fragmentów.
  - **Type**: `string`
  - **Required**: Yes

- `localeOrSelector: LocalesValues | DictionarySelector`
  - **Description**: Lokalizacja do interpretacji zawartości lub obiekt selektora (`{ item }`, `{ variant }`, opcjonalnie z `locale`). Patrz [dynamiczne słowniki](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dynamic_dictionaries/index.md).
  - **Type**: `LocalesValues | DictionarySelector`
  - **Required**: No (Optional) — defaults to the configured `defaultLocale`.

- `plugins: Plugins[]`
  - **Description**: Transformatory węzłów. Domyślnie ustawiony na bazowy zestaw interpretera.
  - **Type**: `Plugins[]`
  - **Required**: No (Optional)

### Returns

- **Type**: `Promise<Content>` — obietnica rozwiązująca się do interpretowanej zawartości załadowanego fragmentu.
- **Description**: Rozwiązuje się do `null`, gdy mapa nie emituje żadnego fragmentu dla żądanej lokalizacji ani żadnych jej fallbacków, odzwierciedlając sposób, w jaki rozwiązuje się brakująca kwalifikowana współrzędna.

---

## Przykładowe użycie

### Z wygenerowaną mapą ładowarki

```typescript codeFormat={["typescript", "esm", "commonjs"]}
import { getDictionaryAsync } from "intlayer";
import appLoaderMap from "../.intlayer/dynamic_dictionaries/app";

const { title } = await getDictionaryAsync(appLoaderMap, "app", "fr");
```

### Z niestandardową mapą loadera

```typescript
import { getDictionaryAsync } from "intlayer";

const loaderMap = {
  en: () => import("./banner.en.json").then((mod) => mod.default),
  fr: () => import("./banner.fr.json").then((mod) => mod.default),
};

const banner = await getDictionaryAsync(loaderMap, "banner", "fr");
```

### Z selectorem na mapie kwalifikowanej

```typescript
import { getDictionaryAsync } from "intlayer";

const promoBanner = await getDictionaryAsync(bannerLoaderMap, "banner", {
  variant: "black-friday",
  locale: "fr",
});
```

---

## Uwagi dotyczące zachowania

### Buforowanie i deduplikacja

Pamięć podręczna przechowuje **promise** każdej trójki `key + locale + selector`, dzięki czemu równoczesne wywołania dla tego samego fragmentu czekają na jedno załadowanie. Odrzucone załadowanie jest usuwane z pamięci podręcznej, więc fragment, który się nie powiedzie, jest ponownie próbowany przy następnym wywołaniu zamiast powtarzania tego samego błędu w nieskończoność.

### Fallback ustawień regionalnych

Zwykła mapa loaderów jest przechodzana wzdłuż tego samego łańcucha fallback co w trybie synchronicznym: najpierw żądane ustawienie regionalne, następnie jego fallbacki, a następnie `null` jeśli żaden nie emitował chunk'u.

---

## Powiązane funkcje

- [`getIntlayerAsync`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/intlayer/getIntlayerAsync.md): Funkcja wywoływana przez aplikacje; wtyczki build przepisują ją na `getDictionaryAsync`.
- [`getDictionary`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/intlayer/getDictionary.md): Synchroniczny odpowiednik przyjmujący pełny słownik.
- [Dynamiczne słowniki](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dynamic_dictionaries/index.md): Kolekcje i warianty, oraz mapy loaderów które generują.

---

## TypeScript

```typescript
function getDictionaryAsync<
  const T extends Dictionary,
  const A extends LocalesValues | DictionarySelector = DeclaredLocales,
>(
  dictionaryLoaders: PlainDynamicLoaderMap<T> | QualifiedDynamicLoaderMap,
  key: string,
  localeOrSelector?: A,
  plugins?: Plugins[]
): Promise<
  DeepTransformContent<
    T["content"],
    IInterpreterPluginState,
    ExtractSelectorLocale<A>
  >
>;
```
