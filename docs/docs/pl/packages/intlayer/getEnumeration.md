---
createdAt: 2025-08-23
updatedAt: 2025-08-23
title: Dokumentacja funkcji getEnumeration | intlayer
description: Zobacz, jak używać funkcji getEnumeration w pakiecie intlayer
keywords:
  - getEnumeration
  - tłumaczenie
  - Intlayer
  - intlayer
  - Internacjonalizacja
  - Dokumentacja
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - packages
  - intlayer
  - getEnumeration
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: Inicjalizacja historii
---

# Dokumentacja: funkcja `getEnumeration` w `intlayer`

## Opis

Funkcja `getEnumeration` pobiera zawartość odpowiadającą określonej ilości na podstawie zdefiniowanych warunków w obiekcie enumeracji. Warunki są zdefiniowane jako klucze, a ich priorytet jest określany przez kolejność w obiekcie.

## Parametry

- `enumerationContent: QuantityContent<Content>`
  - **Opis**: Obiekt, w którym klucze reprezentują warunki (np. `<=`, `<`, `>=`, `=`), a wartości odpowiadające im treści. Kolejność kluczy definiuje priorytet dopasowania.
  - **Typ**: `QuantityContent<Content>`
    - `Content` może być dowolnym typem.

- `quantity: number`
  - **Opis**: Wartość numeryczna używana do dopasowania do warunków w `enumerationContent`.
  - **Typ**: `number`

## Zwracana wartość

- **Typ**: `Content`
- **Opis**: Zawartość odpowiadająca pierwszemu pasującemu warunkowi w `enumerationContent`. Jeśli nie znaleziono dopasowania, zachowanie zależy od implementacji (np. błąd lub zawartość zapasowa).

## Przykład użycia

### Podstawowe użycie

```typescript codeFormat="typescript"
typescript codeFormat="typescript"
import { getEnumeration } from "intlayer";

const content = getEnumeration(
  {
    "<=-2.3": "Masz mniej niż -2.3",
    "<1": "Masz mniej niż jeden",
    "2": "Masz dwa",
    ">=3": "Masz trzy lub więcej",
  },
  2
);

console.log(content); // Wynik: "Masz dwa"
```

```javascript codeFormat="esm"
import { getEnumeration } from "intlayer";

const content = getEnumeration(
  {
    "<1": "Masz mniej niż jeden",
    "2": "Masz dwa",
    ">=3": "Masz trzy lub więcej",
  },
  2
);

console.log(content); // Wynik: "Masz dwa"
```

```javascript codeFormat="commonjs"
const { getEnumeration } = require("intlayer");

const content = getEnumeration(
  {
    "<1": "Masz mniej niż jeden",
    "2": "Masz dwa",
    ">=3": "Masz trzy lub więcej",
  },
  2
);

console.log(content); // Wynik: "Masz dwa"
```

### Priorytet warunków

```typescript codeFormat="typescript"
import { getEnumeration } from "intlayer";

const content = getEnumeration(
  {
    "<4": "Masz mniej niż cztery",
    "2": "Masz dwa",
  },
  2
);

console.log(content); // Wynik: "Masz mniej niż cztery"
```

```javascript codeFormat="esm"
import { getEnumeration } from "intlayer";

const content = getEnumeration(
  {
    "<4": "Masz mniej niż cztery",
    "2": "Masz dwa",
  },
  2
);

console.log(content); // Wynik: "Masz mniej niż cztery"
```

```javascript codeFormat="commonjs"
const { getEnumeration } = require("intlayer");

const content = getEnumeration(
  {
    "<4": "Masz mniej niż cztery",
    "2": "Masz dwa",
  },
  2
);

console.log(content); // Wynik: "Masz mniej niż cztery"
```

## Przypadki brzegowe

- **Brak pasującego warunku:**
  - Jeśli żaden warunek nie pasuje do podanej ilości, funkcja zwróci `undefined` lub obsłuży domyślny/scenariusz zapasowy w sposób jawny.

- **Niejasne warunki:**
  - Jeśli warunki się nakładają, pierwszeństwo ma pierwszy pasujący warunek (na podstawie kolejności w obiekcie).

- **Nieprawidłowe klucze:**
  - Funkcja zakłada, że wszystkie klucze w `enumerationContent` są poprawne i możliwe do przetworzenia jako warunki. Nieprawidłowe lub źle sformatowane klucze mogą prowadzić do nieoczekiwanego zachowania.

- **Wymuszenie TypeScript:**
  - Funkcja zapewnia, że typ `Content` jest spójny dla wszystkich kluczy, co pozwala na bezpieczeństwo typów w pobieranych treściach.

## Uwagi

- Narzędzie `findMatchingCondition` jest używane do określenia odpowiedniego warunku na podstawie podanej ilości.
